# 🎨 MASTER REDESIGN PROMPT — PART 2
# Additional Sections: Experience · AI Projects · Certifications · GitHub · Testimonials · Contact
# Same Design System: Vivid Light — Violet #5B21FF · Coral #FF3D57 · Gold #F5A623
# Apply after Part 1 tokens/fonts/globals are already in place.

---

## 17. EXPERIENCE — "Professional Journey"

Background: `#fff`

### Section title:
```css
/* Already using Syne 800 from Part 1 — keep as-is */
/* Eyebrow: use .section-eyebrow with coral dash + violet text */
```

### Timeline layout:
```css
.timeline {
  position: relative;
  padding-left: 80px;
}
.timeline::before {
  content: '';
  position: absolute;
  left: 32px; top: 0; bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, var(--violet), var(--coral), var(--gold));
  border-radius: 2px;
}
```

### Timeline icon circle:
```css
.timeline-icon {
  position: absolute;
  left: -64px;
  width: 48px; height: 48px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  color: var(--violet);
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
}
.timeline-icon:hover,
.timeline-card:hover .timeline-icon {
  border-color: var(--violet);
  background: var(--violet-pale);
  box-shadow: 0 0 0 4px rgba(91,33,255,0.12);
}
```

### Experience cards:
```css
.timeline-card {
  background: #fff;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 32px 36px;
  margin-bottom: 24px;
  position: relative;
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s var(--ease-spring);
}
.timeline-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, var(--violet), var(--coral));
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.35s ease;
}
.timeline-card:hover {
  border-color: rgba(91,33,255,0.3);
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}
.timeline-card:hover::before { transform: scaleX(1); }
```

### Card internals:
- **Role title**: font-family display, weight 800, size 20px, color `var(--ink)`
- **Company name**: color `var(--violet)`, font-weight 600, size 15px
- **Date / year** (top-right): font-family display, weight 700, color `var(--muted)`, size 14px
- **Location pill** (Virtual / On-site):
  ```css
  .location-pill {
    display: inline-flex; align-items: center; gap: 5px;
    background: var(--bg-off); border: 1px solid var(--border);
    border-radius: var(--radius-pill);
    padding: 3px 10px; font-size: 12px; font-weight: 600; color: var(--muted);
  }
  ```
- **Bullet list items**: replace plain list with styled rows
  ```css
  .exp-item {
    display: flex; align-items: flex-start; gap: 10px;
    padding: 6px 0; font-size: 14px; color: var(--ink-2); line-height: 1.6;
  }
  .exp-item::before {
    content: '';
    flex-shrink: 0;
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--violet);
    margin-top: 8px;
  }
  ```
- **Tech chips** at bottom: same `.tech-chip` from Part 1
- **"View Project →" link**:
  ```css
  color: var(--violet); font-weight: 600; font-size: 14px;
  text-decoration: none;
  transition: gap 0.2s, color 0.2s;
  display: inline-flex; align-items: center; gap: 6px;
  /* Hover: color var(--coral), gap 10px */
  ```

---

## 18. AI ENGINEERING / PROJECT DETAIL PAGES

Background: alternating `var(--bg-off)` header → `#fff` content

### Page header:
- Title: Syne 800, `clamp(44px, 6vw, 72px)`, letter-spacing -0.03em
- Subtitle: `var(--muted)`, max-width 600px, centered, line-height 1.65

### Category filter tabs (LLM Applications · Computer Vision · Data Pipelines · AI Automation):
```css
/* Same .skill-tab / .filter-btn pattern from Part 1 */
/* Active tab uses VIOLET (same as skill tabs) */
.ai-tab.active {
  background: var(--violet);
  color: #fff; border-color: var(--violet);
  box-shadow: 0 4px 16px rgba(91,33,255,0.3);
}
```

### System Architecture box (left panel):
```css
.arch-container {
  background: #fff;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px;
  box-shadow: var(--shadow-sm);
}
.arch-node {
  display: flex; align-items: center; gap: 12px;
  background: var(--bg-off);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-pill);
  padding: 14px 20px;
  font-size: 14px; font-weight: 600; color: var(--ink);
  margin-bottom: 8px;
  transition: border-color 0.2s, background 0.2s, transform 0.2s var(--ease-spring);
  cursor: default;
}
.arch-node:hover {
  border-color: var(--violet);
  background: var(--violet-pale);
  transform: translateX(6px);
}
.arch-node .node-icon { color: var(--violet); }
.arch-arrow {
  text-align: center; color: var(--muted);
  font-size: 18px; margin: 4px 0;
}
```

Tooltip on hover (show description):
```css
.arch-tooltip {
  position: absolute;
  background: var(--ink);
  color: #fff;
  padding: 8px 14px;
  border-radius: var(--radius);
  font-size: 12px; font-weight: 500;
  white-space: nowrap;
  box-shadow: var(--shadow-md);
  pointer-events: none;
  opacity: 0; transform: translateY(4px);
  transition: opacity 0.2s, transform 0.2s;
}
.arch-node:hover .arch-tooltip {
  opacity: 1; transform: translateY(0);
}
```

### Project detail card (right panel):
```css
.project-detail-card {
  background: #fff;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px;
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.25s, border-color 0.25s;
}
.project-detail-card:hover {
  border-color: rgba(91,33,255,0.25);
  box-shadow: var(--shadow-lg);
}
```

### Performance metrics row (Accuracy / Latency / Score):
```css
.metric-row {
  display: flex; gap: 0;
  border-top: 1px solid var(--border);
  margin-top: 16px; padding-top: 16px;
}
.metric-item {
  flex: 1; text-align: center;
  border-right: 1px solid var(--border);
  padding: 0 16px;
}
.metric-item:last-child { border-right: none; }
.metric-val {
  font-family: var(--font-display);
  font-size: 26px; font-weight: 800;
  color: var(--ink);
}
.metric-val.good  { color: var(--violet); }   /* high accuracy */
.metric-val.fast  { color: #22C55E; }         /* fast latency */
.metric-val.score { color: var(--coral); }    /* score */
.metric-label {
  font-size: 11px; font-weight: 600; color: var(--muted);
  text-transform: uppercase; letter-spacing: 0.1em; margin-top: 4px;
}
```

### AI Model Performance Table:
```css
.perf-table {
  width: 100%; border-collapse: collapse;
  font-size: 14px;
}
.perf-table thead th {
  font-family: var(--font-display);
  font-size: 11px; font-weight: 700;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--muted);
  padding: 12px 16px; text-align: left;
  border-bottom: 1.5px solid var(--border);
}
.perf-table tbody tr {
  transition: background 0.15s;
}
.perf-table tbody tr:hover { background: var(--bg-off); }
.perf-table tbody td {
  padding: 16px; color: var(--ink-2);
  border-bottom: 1px solid var(--border);
}
.perf-table tbody td:first-child { font-weight: 600; color: var(--ink); }
/* Accuracy/Score values: colored */
.perf-table .acc-high { color: var(--violet); font-weight: 700; }
.perf-table .acc-mid  { color: var(--coral);  font-weight: 700; }
.perf-table .latency  { color: #22C55E; font-weight: 700; font-family: var(--font-display); }
```

---

## 19. ACHIEVEMENTS & CERTIFICATIONS

Background: `var(--bg-off)`

### Certification cards (3-column grid):
```css
.cert-card {
  background: #fff;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px;
  display: flex; flex-direction: column; gap: 16px;
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s var(--ease-spring);
  position: relative; overflow: hidden;
}
.cert-card::after {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, var(--violet), var(--coral));
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.35s ease;
}
.cert-card:hover {
  border-color: rgba(91,33,255,0.3);
  box-shadow: var(--shadow-lg);
  transform: translateY(-6px);
}
.cert-card:hover::after { transform: scaleX(1); }
```

- **Cert title**: font-family display, weight 800, size 16px, color `var(--ink)`
- **Issuer name**: color `var(--violet)`, weight 600, size 14px
- **Credential ID box**:
  ```css
  .credential-box {
    background: var(--bg-off);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 10px 16px;
  }
  .credential-label { font-size: 10px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted); margin-bottom: 4px; }
  .credential-id { font-family: var(--font-display); font-size: 13px; font-weight: 700; color: var(--ink); letter-spacing: 0.05em; }
  ```
- **Year badge**: 
  ```css
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 12px; font-weight: 600; color: var(--muted);
  ```
- **"Verify Certificate" button**:
  ```css
  display: inline-flex; align-items: center; gap: 6px;
  padding: 9px 18px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-pill);
  font-size: 13px; font-weight: 600; color: var(--ink-2);
  background: var(--bg-off);
  transition: all 0.2s var(--ease-spring);
  /* Hover: background var(--violet), color #fff, border-color var(--violet), 
            box-shadow var(--shadow-violet), translateY(-2px) */
  ```

### 1st Place / Award cards — special treatment:
```css
/* Same cert-card but gradient background instead of white */
.award-card {
  background: linear-gradient(135deg, var(--violet-pale) 0%, var(--coral-pale) 100%);
  border-color: rgba(91,33,255,0.2);
}
.award-card .cert-title { 
  background: linear-gradient(135deg, var(--violet), var(--coral));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## 20. GITHUB ACTIVITY — "Open Source Contributions"

Background: `var(--bg-off)`

### Contribution heatmap card:
```css
.heatmap-card {
  background: #fff;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px;
  box-shadow: var(--shadow-sm);
}
.heatmap-title {
  font-family: var(--font-display);
  font-size: 16px; font-weight: 700; color: var(--ink);
  margin-bottom: 20px;
}
```

Heatmap cells — replace plain grey with violet spectrum:
```css
.heatmap-cell {
  width: 12px; height: 12px; border-radius: 3px;
  background: var(--border);
  transition: transform 0.1s var(--ease-spring);
}
.heatmap-cell:hover { transform: scale(1.4); }

/* Activity levels */
.heatmap-cell[data-level="1"] { background: rgba(91,33,255,0.15); }
.heatmap-cell[data-level="2"] { background: rgba(91,33,255,0.35); }
.heatmap-cell[data-level="3"] { background: rgba(91,33,255,0.6); }
.heatmap-cell[data-level="4"] { background: var(--violet); }

/* Legend */
.heatmap-legend-label { font-size: 11px; color: var(--muted); font-weight: 500; }
```

### Stats row (Total Commits · Streak · Stars · PRs · Issues):
```css
.github-stat-card {
  background: #fff;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px 20px;
  text-align: center;
  flex: 1;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s var(--ease-spring);
}
.github-stat-card:hover {
  border-color: rgba(91,33,255,0.3);
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
}
.github-stat-icon { color: var(--violet); margin-bottom: 10px; font-size: 20px; }
.github-stat-val {
  font-family: var(--font-display);
  font-size: 32px; font-weight: 800; color: var(--ink);
  line-height: 1;
}
/* Alternate accent colors for variety */
.github-stat-card:nth-child(2) .github-stat-val { color: var(--coral); }
.github-stat-card:nth-child(4) .github-stat-val { color: var(--violet); }
.github-stat-card:nth-child(6) .github-stat-val { color: var(--gold); }
.github-stat-label { font-size: 12px; font-weight: 600; color: var(--muted); margin-top: 6px; text-transform: uppercase; letter-spacing: 0.08em; }
```

### Top Repositories card:
```css
.repo-container {
  background: #fff;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
}
.repo-item {
  background: var(--bg-off);
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  padding: 18px 20px;
  transition: border-color 0.2s, background 0.2s, transform 0.2s var(--ease-spring);
}
.repo-item:hover {
  border-color: var(--violet);
  background: var(--violet-pale);
  transform: translateY(-2px);
}
.repo-name { font-family: var(--font-display); font-size: 14px; font-weight: 700; color: var(--violet); }
.repo-desc { font-size: 13px; color: var(--muted); margin-top: 4px; }
.repo-meta { display: flex; gap: 14px; margin-top: 10px; font-size: 12px; color: var(--muted); font-weight: 500; }
.repo-lang-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--violet); }
/* Language-specific dots */
.lang-python     { background: #3776AB; }
.lang-typescript { background: #3178C6; }
.lang-javascript { background: #F7DF1E; }
.lang-go         { background: #00ADD8; }
.lang-nodejs     { background: #339933; }
```

### Language Breakdown donut chart:
- Chart arc colors:
  ```
  TypeScript → var(--violet)    #5B21FF
  Python     → var(--coral)     #FF3D57
  JavaScript → var(--gold)      #F5A623
  Others     → #E8E3F8 (border color)
  ```
- Legend items: colored dot + label + percentage (percentage in font-display, weight 700)

---

## 21. TESTIMONIALS — "What People Say"

Background: `#fff`

### Testimonial cards (3-column):
```css
.testimonial-card {
  background: #fff;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px;
  position: relative;
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s var(--ease-spring);
  overflow: hidden;
}
.testimonial-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, var(--violet), var(--coral));
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.4s ease;
}
.testimonial-card:hover {
  border-color: rgba(91,33,255,0.25);
  box-shadow: var(--shadow-lg);
  transform: translateY(-6px);
}
.testimonial-card:hover::before { transform: scaleX(1); }
```

### Quote mark icon:
```css
.quote-icon {
  color: var(--violet);
  opacity: 0.15;
  font-size: 48px;
  font-family: var(--font-display);
  line-height: 1;
  position: absolute; top: 16px; right: 20px;
  transition: opacity 0.2s, color 0.2s;
}
.testimonial-card:hover .quote-icon { opacity: 0.3; color: var(--coral); }
```

### Quote text:
```css
.quote-text {
  font-size: 15px; color: var(--ink-2); line-height: 1.75;
  font-style: italic;
  margin-bottom: 20px;
  /* Add opening " with violet color */
}
.quote-text::before {
  content: '"';
  color: var(--violet); font-style: normal;
  font-family: var(--font-display); font-size: 20px;
}
```

### Author block:
```css
.author-name { font-family: var(--font-display); font-size: 15px; font-weight: 700; color: var(--ink); }
.author-role { font-size: 13px; color: var(--violet); font-weight: 600; margin-top: 2px; }
.author-company { font-size: 12px; color: var(--muted); margin-top: 2px; }
.author-relation {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 11px; font-weight: 600; color: var(--muted);
  background: var(--bg-off); border: 1px solid var(--border);
  border-radius: var(--radius-pill); padding: 3px 10px;
  margin-top: 8px;
}
```

### Author avatar (initial fallback):
```css
.author-avatar {
  width: 44px; height: 44px; border-radius: 50%;
  background: linear-gradient(135deg, var(--violet), var(--coral));
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display);
  font-size: 16px; font-weight: 800; color: #fff;
  flex-shrink: 0;
}
```

---

## 22. CONTACT — "Get In Touch"

Background: `var(--bg-off)`

### Section title — gradient text:
```css
/* "Get In Touch" title */
.contact-title {
  font-family: var(--font-display);
  font-size: clamp(48px, 7vw, 80px);
  font-weight: 800;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, var(--violet) 0%, var(--coral) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Form labels:
```css
label {
  font-size: 13px; font-weight: 700;
  letter-spacing: 0.05em; text-transform: uppercase;
  color: var(--ink-2); margin-bottom: 8px;
  display: block;
}
```

### Form inputs & textarea:
```css
input, textarea, select {
  background: #fff;
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  padding: 14px 18px;
  font-family: var(--font-body);
  font-size: 15px; color: var(--ink);
  width: 100%;
  transition: border-color var(--duration-fast), box-shadow var(--duration-fast), background var(--duration-fast);
}
input::placeholder, textarea::placeholder { color: var(--muted); }
input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: var(--violet);
  background: #fff;
  box-shadow: 0 0 0 4px rgba(91,33,255,0.1);
}
/* Character counter */
.char-counter { font-size: 12px; color: var(--muted); text-align: right; margin-top: 4px; }
.char-counter.near-limit { color: var(--coral); }
```

### Submit button:
```css
.btn-submit {
  width: 100%;
  background: var(--violet);
  color: #fff;
  padding: 15px 28px;
  border: none;
  border-radius: var(--radius-pill);
  font-family: var(--font-body);
  font-size: 16px; font-weight: 700;
  box-shadow: var(--shadow-violet);
  transition: background 0.2s, transform 0.2s var(--ease-spring), box-shadow 0.2s;
  cursor: none;
}
.btn-submit:hover {
  background: var(--violet-2);
  transform: translateY(-3px) scale(1.01);
  box-shadow: 0 10px 36px rgba(91,33,255,0.5);
}
.btn-submit:active { transform: scale(0.98); }
```

### Right panel — "Available For" card:
```css
.availability-card {
  background: #fff;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px;
  box-shadow: var(--shadow-sm);
}
.availability-title {
  font-family: var(--font-display);
  font-size: 16px; font-weight: 700; color: var(--ink);
  margin-bottom: 16px;
}
/* Availability tags (Full-time / Freelance / Open Source) */
.avail-chip {
  padding: 7px 16px;
  border-radius: var(--radius-pill);
  font-size: 13px; font-weight: 600;
  border: 1.5px solid var(--border);
  background: var(--bg-off); color: var(--ink-2);
  transition: all 0.2s var(--ease-spring);
}
.avail-chip:hover, .avail-chip.active {
  background: var(--violet);
  color: #fff; border-color: var(--violet);
  transform: scale(1.04);
  box-shadow: 0 4px 14px rgba(91,33,255,0.3);
}
```

### Contact info rows (Location / Response Time / Email):
```css
.contact-info-row {
  display: flex; align-items: flex-start; gap: 14px;
  padding: 16px 0;
  border-bottom: 1px solid var(--border);
}
.contact-info-row:last-of-type { border-bottom: none; }
.contact-info-icon {
  width: 36px; height: 36px; border-radius: 10px;
  background: var(--violet-pale);
  display: flex; align-items: center; justify-content: center;
  color: var(--violet); flex-shrink: 0;
  transition: background 0.2s, transform 0.2s var(--ease-spring);
}
.contact-info-row:hover .contact-info-icon {
  background: var(--violet);
  color: #fff;
  transform: scale(1.1) rotate(-5deg);
}
.contact-info-label { font-size: 12px; font-weight: 700; color: var(--muted); letter-spacing: 0.05em; text-transform: uppercase; }
.contact-info-val { font-size: 14px; font-weight: 500; color: var(--ink); margin-top: 2px; }
.contact-info-val a { color: var(--violet); text-decoration: none; }
.contact-info-val a:hover { text-decoration: underline; }
```

### "Connect With Me" social icons:
```css
.social-link {
  width: 48px; height: 48px; border-radius: 50%;
  border: 1.5px solid var(--border); background: #fff;
  display: flex; align-items: center; justify-content: center;
  color: var(--ink-2);
  transition: all 0.2s var(--ease-spring);
}
.social-link:hover {
  background: var(--violet-pale);
  border-color: var(--violet);
  color: var(--violet);
  transform: translateY(-4px) scale(1.12);
  box-shadow: var(--shadow-md);
}
/* GitHub specific hover */
.social-link.github:hover { background: var(--ink); color: #fff; border-color: var(--ink); }
/* LinkedIn specific hover */
.social-link.linkedin:hover { background: #0A66C2; color: #fff; border-color: #0A66C2; }
/* Twitter/X specific hover */
.social-link.twitter:hover { background: var(--ink); color: #fff; border-color: var(--ink); }
```

### Navbar on this page (fully visible at top of contact screenshot):
- Logo: `ESLAVATH <span style="color:var(--violet)">VINEETH</span> NAIK`
- "Contact" nav link — active state: `color: var(--violet); font-weight: 700`
- "Hire Me" button: violet filled, pill, shadow-violet (same as Part 1)

---

## 23. SECTION BACKGROUNDS — Full Page Map

Apply this alternating pattern consistently:

| Section | Background |
|---------|-----------|
| Hero | `#fff` + animated blobs |
| About | `var(--bg-off)` `#F7F6FF` |
| Skills | `#fff` |
| Projects | `var(--bg-off)` |
| AI / Project Detail | `#fff` header → `var(--bg-off)` content |
| Experience | `#fff` |
| Certifications | `var(--bg-off)` |
| GitHub Activity | `#fff` |
| Testimonials | `var(--bg-off)` |
| Contact | `var(--bg-off)` |
| Footer | `var(--ink)` `#0A0812` |

---

## 24. MICRO-INTERACTIONS CHEAT SHEET

Apply these universally to ALL interactive elements:

```css
/* Cards (experience, cert, testimonial, repo, project) */
card:hover → translateY(-4px to -6px), border-color rgba(91,33,255,0.3), box-shadow var(--shadow-lg)

/* All primary buttons */
btn-primary:hover → translateY(-3px) scale(1.02), stronger shadow

/* All secondary/ghost buttons */
btn-ghost:hover → translateY(-2px), border-color var(--violet), bg var(--violet-pale)

/* Icon buttons */
icon-btn:hover → scale(1.1) rotate(±5deg), colored bg

/* Links with arrows */
arrow-link:hover → gap increases from 6px to 12px (arrow moves right)

/* Table rows */
tr:hover → bg var(--bg-off)

/* All tab/filter buttons */
tab:hover → bg var(--violet), color #fff, shadow

/* Input focus */
input:focus → border var(--violet), box-shadow 0 0 0 4px rgba(91,33,255,0.1)
```

---

## 25. ADDITIONAL ANIMATION CLASSES

Add these to your globals:

```css
/* Count-up animation trigger */
.count-up { transition: all 0.3s; }

/* Shimmer loading state */
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, var(--border) 25%, var(--bg-off) 50%, var(--border) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--radius);
}

/* Gradient border (for featured/special cards) */
.gradient-border {
  position: relative;
  border: none !important;
}
.gradient-border::before {
  content: '';
  position: absolute; inset: -1.5px;
  border-radius: calc(var(--radius-lg) + 1.5px);
  background: linear-gradient(135deg, var(--violet), var(--coral));
  z-index: -1;
}

/* Floating animation (use on hero card, floating tags) */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-8px); }
}
.float { animation: float 4s ease-in-out infinite; }
.float-delay-1 { animation-delay: 0.5s; }
.float-delay-2 { animation-delay: 1s; }

/* Spring button press */
.btn-spring:active { transform: scale(0.95); }
```

---

## EXTENDED FINAL CHECKLIST

After applying Part 2, verify:

- [ ] Experience timeline has gradient vertical line (violet → coral → gold)
- [ ] Timeline cards have gradient top-bar sweep on hover
- [ ] Experience bullet dots use violet color
- [ ] "View Project →" links animate arrow on hover
- [ ] Arch nodes slide right on hover with violet border
- [ ] AI model table rows highlight on hover (bg-off background)
- [ ] Performance metric values use violet/green/coral colors
- [ ] Cert cards have gradient top sweep on hover
- [ ] Award/1st-place cards use gradient background + gradient title text
- [ ] "Verify Certificate" buttons turn violet on hover
- [ ] Heatmap cells use violet opacity spectrum (4 levels)
- [ ] GitHub stat cards alternate violet/coral/gold number colors
- [ ] Repo items highlight violet on hover
- [ ] Language breakdown chart uses violet/coral/gold
- [ ] Testimonial cards have gradient top sweep on hover
- [ ] Quote icon turns from violet to coral on hover
- [ ] Contact title is gradient (violet → coral) text
- [ ] Form inputs have violet focus ring (4px)
- [ ] Submit button is full-width violet with spring animation
- [ ] Availability chips turn violet on hover/active
- [ ] Contact info icons spin+color on hover
- [ ] Social links have platform-specific hover colors
- [ ] "Contact" nav link shows active state (violet, weight 700)
- [ ] Section backgrounds follow the alternating #fff / #F7F6FF map
- [ ] All interactive elements have the micro-interaction from Section 24

---

*Part 1 + Part 2 together = complete portfolio redesign*
*Design System: Vivid Light · Syne + Instrument Sans · Spring Easing throughout*
