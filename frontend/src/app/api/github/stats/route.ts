import { NextRequest, NextResponse } from 'next/server'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'vineethnaik'

function getDateRange() {
  const to = new Date()
  const from = new Date()
  from.setFullYear(from.getFullYear() - 1)
  return {
    from: from.toISOString().split('T')[0],
    to: to.toISOString().split('T')[0]
  }
}

async function fetchContributions(username: string) {
  const { from, to } = getDateRange()
  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                weekday
              }
              firstDay
            }
          }
          totalCommitContributions
          totalPullRequestContributions
          totalPullRequestReviewContributions
          totalIssueContributions
        }
      }
    }
  `

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v4+json'
    },
    body: JSON.stringify({
      query,
      variables: {
        username,
        from: `${from}T00:00:00Z`,
        to: `${to}T23:59:59Z`
      }
    }),
    next: { revalidate: 3600 }
  })

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('INVALID_TOKEN')
    }
    const text = await res.text()
    throw new Error(`GitHub GraphQL error: ${res.status} ${text}`)
  }

  const json = await res.json()
  if (json.errors?.length) {
    throw new Error(json.errors[0]?.message || 'GraphQL error')
  }
  return json.data?.user?.contributionsCollection
}

async function fetchRepos(username: string) {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=stars&per_page=8&type=owner`,
    {
      headers: {
        'Authorization': GITHUB_TOKEN ? `Bearer ${GITHUB_TOKEN}` : '',
        'Accept': 'application/vnd.github.v3+json'
      },
      next: { revalidate: 3600 }
    }
  )

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('INVALID_TOKEN')
    }
    const text = await res.text()
    throw new Error(`GitHub REST error: ${res.status} ${text}`)
  }

  const repos = await res.json()
  return repos.map((r: {
    name: string
    description: string | null
    language: string | null
    stargazers_count: number
    forks_count: number
    updated_at: string
    html_url: string
  }) => ({
    name: r.name,
    description: r.description || '',
    language: r.language || 'Other',
    languageColor: getLanguageColor(r.language),
    stars: r.stargazers_count,
    forks: r.forks_count,
    lastUpdated: formatRelativeDate(r.updated_at),
    url: r.html_url
  }))
}

function getLanguageColor(lang: string | null): string {
  const colors: Record<string, string> = {
    TypeScript: '#3178C6',
    JavaScript: '#F7DF1E',
    Python: '#3572A5',
    Go: '#00ADD8',
    'Node.js': '#339933',
    Java: '#ED8B00',
    Rust: '#DEA584',
    C: '#555555',
    'C++': '#00599C',
    Ruby: '#CC342D',
    PHP: '#777BB4',
    Swift: '#F05138',
    Kotlin: '#7F52FF',
    Vue: '#4FC08D',
    HTML: '#E34F26',
    CSS: '#1572B6',
    Shell: '#89E051'
  }
  return colors[lang || ''] || 'var(--violet)'
}

function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return '1 day ago'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 14) return '1 week ago'
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 60) return '1 month ago'
  return `${Math.floor(diffDays / 30)} months ago`
}

function computeStreaks(weeks: { contributionDays: { date: string; contributionCount: number }[] }[]) {
  const dayMap = new Map<string, number>()
  for (const week of weeks) {
    for (const day of week.contributionDays) {
      dayMap.set(day.date, day.contributionCount)
    }
  }

  const sortedDates = Array.from(dayMap.keys()).sort()
  const today = new Date().toISOString().split('T')[0]

  let currentStreak = 0
  let d = new Date(today)
  while (true) {
    const key = d.toISOString().split('T')[0]
    if (key < sortedDates[0]) break
    const count = dayMap.get(key) ?? 0
    if (count > 0) {
      currentStreak++
      d.setDate(d.getDate() - 1)
    } else break
  }

  let longestStreak = 0
  let tempStreak = 0
  for (let i = 0; i < sortedDates.length; i++) {
    const count = dayMap.get(sortedDates[i]) ?? 0
    const prev = i > 0 ? sortedDates[i - 1] : null
    const consecutive = !prev || isConsecutive(prev, sortedDates[i])
    if (count > 0 && (tempStreak === 0 || consecutive)) {
      tempStreak++
    } else {
      longestStreak = Math.max(longestStreak, tempStreak)
      tempStreak = count > 0 ? 1 : 0
    }
  }
  longestStreak = Math.max(longestStreak, tempStreak)

  return { currentStreak, longestStreak }
}

function isConsecutive(earlier: string, later: string): boolean {
  const a = new Date(earlier)
  a.setDate(a.getDate() + 1)
  return a.toISOString().split('T')[0] === later
}

export async function GET(request: NextRequest) {
  try {
    const username = request.nextUrl.searchParams.get('username') || GITHUB_USERNAME

    if (!GITHUB_TOKEN) {
      return NextResponse.json(
        { error: 'GITHUB_TOKEN not configured. Add it to .env.local' },
        { status: 503 }
      )
    }

    const [contributions, repos] = await Promise.all([
      fetchContributions(username),
      fetchRepos(username)
    ])

    if (!contributions) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const { contributionCalendar } = contributions
    const weeks = contributionCalendar?.weeks || []
    const { currentStreak, longestStreak } = computeStreaks(weeks)

    const totalStars = repos.reduce((sum: number, r: { stars: number }) => sum + r.stars, 0)

    const flatContributions = weeks.flatMap((w: { contributionDays: { date: string; contributionCount: number }[] }) =>
      w.contributionDays.map((d: { date: string; contributionCount: number }) => ({
        date: d.date,
        contributions: d.contributionCount,
        level: d.contributionCount === 0 ? 0 : d.contributionCount <= 3 ? 1 : d.contributionCount <= 6 ? 2 : 3
      }))
    )

    const languageCount: Record<string, number> = {}
    for (const r of repos) {
      const lang = r.language || 'Other'
      languageCount[lang] = (languageCount[lang] || 0) + 1
    }
    const totalRepos = repos.length
    const languageBreakdown = Object.entries(languageCount).map(([name, count]) => ({
      name,
      value: totalRepos > 0 ? Math.round((count / totalRepos) * 100) : 0,
      color: getLanguageColor(name === 'Other' ? null : name)
    })).sort((a, b) => b.value - a.value).slice(0, 5)

    const totalLangValue = languageBreakdown.reduce((s, l) => s + l.value, 0)
    if (languageBreakdown.length > 0 && totalLangValue !== 100) {
      languageBreakdown[0].value += 100 - totalLangValue
    }

    return NextResponse.json({
      contributions: flatContributions,
      stats: {
        totalCommits: contributions.totalCommitContributions ?? 0,
        currentStreak,
        longestStreak,
        totalStars,
        prsMerged: contributions.totalPullRequestContributions ?? 0,
        issuesClosed: contributions.totalIssueContributions ?? 0
      },
      repos,
      languageBreakdown
    })
  } catch (err) {
    console.error('GitHub stats error:', err)
    const message = err instanceof Error ? err.message : 'Failed to fetch GitHub data'
    const isAuthError = message === 'INVALID_TOKEN'
    return NextResponse.json(
      {
        error: isAuthError
          ? 'Invalid or expired GitHub token. Update GITHUB_TOKEN in .env.local'
          : message
      },
      { status: isAuthError ? 503 : 500 }
    )
  }
}
