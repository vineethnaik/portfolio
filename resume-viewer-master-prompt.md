# 🎬 MASTER PROMPT — Glossy Resume Typewriter Viewer
# Implement this EXACTLY as described. Do NOT simplify or change any behaviour.
# This is a React component that opens a full-screen modal with a glossy 3D card
# that typewriter-animates the resume content, then scrolls back to top and stops.

---

## STEP 1 — Create the file

Create `src/components/ResumeViewer.jsx`

---

## STEP 2 — Paste this COMPLETE component exactly as written

```jsx
import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────────────────────
   RESUME TOKENS
   t:'html'  → inject as HTML immediately (styled element)
   t:'type'  → type character by character
───────────────────────────────────────────────────────────── */
const TOKENS = [
  {t:'html', c:'<span class="tw-name">Eslavath Vineeth Naik</span>'},
  {t:'type', c:'Vijayawada, Andhra Pradesh  ·  '},
  {t:'html', c:'<a class="tw-link" href="https://github.com/vineethnaik" target="_blank" rel="noopener">github.com/vineethnaik</a>'},
  {t:'type', c:'  ·  '},
  {t:'html', c:'<a class="tw-link" href="https://linkedin.com/in/eslavath-vineeth-naik-a8ab16285" target="_blank" rel="noopener">linkedin.com/in/eslavath-vineeth-naik</a>'},
  {t:'type', c:'  ·  '},
  {t:'html', c:'<a class="tw-link" href="mailto:vineethnaikeslavath@gmail.com">vineethnaikeslavath@gmail.com</a>'},
  {t:'html', c:'<span class="tw-divider"></span>'},

  {t:'html', c:'<span class="tw-section">Objective</span>'},
  {t:'type', c:'Computer Science undergraduate specializing in Machine Learning\nand Data Analytics with hands-on experience building Random\nForest models, performing statistical analysis, and deploying\nreal-time ML inference APIs. '},
  {t:'html', c:'<b style="color:#5B21FF">Seeking Data Science / AI-ML internship roles.</b>'},
  {t:'html', c:'\n\n'},

  {t:'html', c:'<span class="tw-section">Education</span>'},
  {t:'html', c:'<span class="tw-title">B.Tech in Computer Science and Engineering</span>'},
  {t:'html', c:'<span class="tw-org">KL University</span>  '},
  {t:'html', c:'<span class="tw-muted">2023 – Present</span>\n'},
  {t:'type', c:'Coursework: Data Structures · DBMS · Machine Learning\n            Artificial Intelligence · Cloud Computing\n\n'},

  {t:'html', c:'<span class="tw-section">Technical Skills</span>'},
  {t:'html', c:'<b style="color:#9b8fc0;font-size:12px">Programming     </b>'},
  {t:'html', c:'<span class="tw-chip-v">Python</span><span class="tw-chip-v">Java</span><span class="tw-chip-v">SQL</span>\n'},
  {t:'html', c:'<b style="color:#9b8fc0;font-size:12px">ML & Analytics  </b>'},
  {t:'html', c:'<span class="tw-chip-c">Random Forest</span><span class="tw-chip-c">Classification</span><span class="tw-chip-c">Regression</span><span class="tw-chip-c">ROC-AUC</span><span class="tw-chip-c">F1-Score</span>\n'},
  {t:'html', c:'<b style="color:#9b8fc0;font-size:12px">Data Tools      </b>'},
  {t:'html', c:'<span class="tw-chip-n">Pandas</span><span class="tw-chip-n">NumPy</span><span class="tw-chip-n">Scikit-learn</span><span class="tw-chip-n">ETL</span>\n'},
  {t:'html', c:'<b style="color:#9b8fc0;font-size:12px">Cloud & DevOps  </b>'},
  {t:'html', c:'<span class="tw-chip-g">AWS</span><span class="tw-chip-g">Docker</span><span class="tw-chip-g">Kubernetes</span><span class="tw-chip-g">REST APIs</span><span class="tw-chip-g">Git</span>\n'},
  {t:'html', c:'<b style="color:#9b8fc0;font-size:12px">Databases       </b>'},
  {t:'html', c:'<span class="tw-chip-v">MySQL</span><span class="tw-chip-v">MongoDB</span>\n'},
  {t:'html', c:'<b style="color:#9b8fc0;font-size:12px">Visualization   </b>'},
  {t:'html', c:'<span class="tw-chip-c">Matplotlib</span><span class="tw-chip-c">Seaborn</span><span class="tw-chip-c">Power BI</span>\n\n'},

  {t:'html', c:'<span class="tw-section">Projects</span>'},
  {t:'html', c:'<span class="tw-title">AI-Based Healthcare Revenue Cycle Prediction System</span>'},
  {t:'type', c:'▸ Built Random Forest models to predict claim denials\n  (400 claims), payment delays (350 invoices), and\n  no-shows (250 appointments).\n'},
  {t:'html', c:'<span class="tw-impact">↑ 85% accuracy · 0.88 ROC-AUC · 20% over manual baseline</span>\n'},
  {t:'type', c:'▸ Deployed real-time REST APIs — React + Spring Boot + MySQL.\n  RMSE reduced to 0.38–0.43 range.\n'},
  {t:'html', c:'<span class="tw-impact">↑ 99% claim validation speed · $2.6M–$3.7M est. annual savings</span>\n\n'},

  {t:'html', c:'<span class="tw-title">LLM Benchmarking for Automated Cloud Deployment</span>'},
  {t:'type', c:'▸ Built evaluation framework for LLM-generated IaC using\n  Docker and Kubernetes. Measured deployment accuracy,\n  execution time, and cost efficiency.\n'},
  {t:'html', c:'<span class="tw-impact">↑ 18% improvement in configuration success rate</span>\n\n'},

  {t:'html', c:'<span class="tw-section">Internship</span>'},
  {t:'html', c:'<span class="tw-title">Networking Virtual Internship</span>'},
  {t:'html', c:'<span class="tw-org">Juniper Networks (JNCIA-Junos)</span>  '},
  {t:'html', c:'<span class="tw-muted">2024 · Remote</span>\n'},
  {t:'type', c:'▸ Configured routing, switching, and network security\n  in cloud lab environments. Strengthened distributed\n  systems and cloud deployment fundamentals.\n\n'},

  {t:'html', c:'<span class="tw-section">Certifications</span>'},
  {t:'type', c:'▸ AWS Certified Cloud Practitioner — Amazon Web Services (2025)\n'},
  {t:'type', c:'▸ Salesforce Certified AI Associate — Salesforce (2025)\n'},
  {t:'type', c:'▸ MongoDB Certified Developer Associate — MongoDB\n\n'},

  {t:'html', c:'<span class="tw-section">Leadership & Activities</span>'},
  {t:'html', c:'<span class="tw-award">🏆 1st Place</span>'},
  {t:'type', c:' — Design Thinking & Innovation Competition, KL University.\nLed a cross-functional team through structured problem-solving\nand data-backed analytical decision-making.\n'},
];

/* ─── TIMING CONSTANTS — do NOT change these ─── */
const CHAR_DELAY  = 28;    // ms per character
const HTML_DELAY  = 60;    // ms pause after html token
const LINE_PAUSE  = 140;   // extra ms on newline character
const RESET_DELAY = 1800;  // ms pause at bottom before scrolling back

export default function ResumeViewer() {
  const [isOpen, setIsOpen]       = useState(false);
  const [status, setStatus]       = useState('idle'); // idle | typing | done | resetting
  const [progress, setProgress]   = useState(0);
  const [dlVisible, setDlVisible] = useState(false);
  const [barLabel, setBarLabel]   = useState('Writing resume...');

  const overlayRef  = useRef(null);
  const cardRef     = useRef(null);
  const bodyRef     = useRef(null);
  const outputRef   = useRef(null);
  const cursorRef   = useRef(null);
  const rafIdRef    = useRef(null);
  const isRunRef    = useRef(false);
  const tokenIdxRef = useRef(0);
  const charIdxRef  = useRef(0);
  const doneRef     = useRef(0);
  const totalRef    = useRef(0);

  /* ── count typeable chars ── */
  function countTotal() {
    return TOKENS.reduce((n, tk) => tk.t === 'type' ? n + tk.c.length : n, 0);
  }

  /* ── open / close ── */
  function openModal() {
    setIsOpen(true);
    setTimeout(startTypewriter, 600);
  }
  function closeModal() {
    setIsOpen(false);
    stopTypewriter();
    setDlVisible(false);
    setProgress(0);
    setStatus('idle');
    setBarLabel('Writing resume...');
  }

  /* ── Escape key ── */
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  /* ── 3D corner tilt ── */
  function handleMouseMove(e) {
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transition = 'transform 0.06s ease, box-shadow 0.06s ease';
    card.style.transform  = `perspective(900px) rotateX(${y * -14}deg) rotateY(${x * 18}deg) scale(1.015)`;
    card.style.boxShadow  = `${x * -20}px ${y * -20 + 60}px 120px rgba(0,0,0,0.45),
      0 24px 48px rgba(91,33,255,0.18),
      0 0 0 1px rgba(255,255,255,0.95),
      inset 0 1px 0 #fff`;
  }
  function handleMouseLeave() {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = 'transform 0.55s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease';
    card.style.transform  = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
    card.style.boxShadow  = '0 60px 120px rgba(0,0,0,0.5), 0 24px 48px rgba(91,33,255,0.15), 0 0 0 1px rgba(255,255,255,0.9), inset 0 1px 0 #fff';
  }

  /* ── typewriter engine ── */
  function startTypewriter() {
    stopTypewriter();
    const output = outputRef.current;
    const cursor = cursorRef.current;
    if (!output || !cursor) return;
    output.innerHTML = '';
    output.appendChild(cursor);
    cursor.style.display = 'inline-block';
    tokenIdxRef.current = 0;
    charIdxRef.current  = 0;
    doneRef.current     = 0;
    totalRef.current    = countTotal();
    isRunRef.current    = true;
    setStatus('typing');
    setBarLabel('Writing resume...');
    setProgress(0);
    setDlVisible(false);
    scheduleNext(300);
  }

  function stopTypewriter() {
    isRunRef.current = false;
    if (rafIdRef.current) { clearTimeout(rafIdRef.current); rafIdRef.current = null; }
  }

  function scheduleNext(delay) {
    if (!isRunRef.current) return;
    rafIdRef.current = setTimeout(processNext, delay);
  }

  function processNext() {
    if (!isRunRef.current) return;
    const output = outputRef.current;
    const cursor = cursorRef.current;
    if (!output || !cursor) return;

    if (tokenIdxRef.current >= TOKENS.length) {
      onComplete();
      return;
    }

    const tk = TOKENS[tokenIdxRef.current];

    if (tk.t === 'html') {
      const temp = document.createElement('span');
      temp.innerHTML = tk.c;
      while (temp.firstChild) output.insertBefore(temp.firstChild, cursor);
      tokenIdxRef.current++;
      charIdxRef.current = 0;
      autoScroll();
      scheduleNext(HTML_DELAY);
      return;
    }

    // type mode
    const ch = tk.c[charIdxRef.current];
    output.insertBefore(document.createTextNode(ch), cursor);
    charIdxRef.current++;
    doneRef.current++;
    const pct = Math.min(100, Math.round((doneRef.current / totalRef.current) * 100));
    setProgress(pct);
    autoScroll();

    if (charIdxRef.current >= tk.c.length) {
      tokenIdxRef.current++;
      charIdxRef.current = 0;
      scheduleNext(HTML_DELAY);
    } else {
      scheduleNext(CHAR_DELAY + (ch === '\n' ? LINE_PAUSE : 0));
    }
  }

  function autoScroll() {
    const b = bodyRef.current;
    if (b) b.scrollTop = b.scrollHeight;
  }

  function onComplete() {
    isRunRef.current = false;
    const cursor = cursorRef.current;
    if (cursor) cursor.style.display = 'none';
    setStatus('done');
    setBarLabel('Complete ✓');
    setProgress(100);
    setDlVisible(true);

    rafIdRef.current = setTimeout(() => {
      setStatus('resetting');
      setBarLabel('Scrolling back...');
      const b = bodyRef.current;
      if (!b) return;
      const scrollDuration = 1400;
      const startScroll = b.scrollTop;
      const startTime   = performance.now();

      function scrollStep(now) {
        const t    = Math.min((now - startTime) / scrollDuration, 1);
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        b.scrollTop = startScroll * (1 - ease);
        if (t < 1) {
          requestAnimationFrame(scrollStep);
        } else {
          b.scrollTop = 0;
          setStatus('done');
          setBarLabel('Ready to read ↑');
          // ── STOP. No restart. ──
        }
      }
      requestAnimationFrame(scrollStep);
    }, RESET_DELAY);
  }

  /* ─── STYLES ─── */
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Instrument+Sans:wght@400;500;600&display=swap');

    .rv-overlay {
      position: fixed; inset: 0; z-index: 9990;
      display: flex; align-items: center; justify-content: center;
      opacity: 0; pointer-events: none;
      transition: opacity 0.45s ease;
    }
    .rv-overlay.open { opacity: 1; pointer-events: all; }

    .rv-bg {
      position: absolute; inset: 0;
      background: rgba(8,4,20,0.75);
      backdrop-filter: blur(28px) saturate(1.8) brightness(0.7);
      -webkit-backdrop-filter: blur(28px) saturate(1.8) brightness(0.7);
    }

    .rv-card {
      position: relative; z-index: 1;
      width: min(660px, 92vw);
      max-height: 86vh;
      border-radius: 28px;
      overflow: hidden;
      background: rgba(255,255,255,0.93);
      box-shadow:
        0 60px 120px rgba(0,0,0,0.5),
        0 24px 48px rgba(91,33,255,0.15),
        0 0 0 1px rgba(255,255,255,0.9),
        inset 0 1px 0 #fff;
      transform: perspective(1000px) translateY(50px) scale(0.93);
      transition: transform 0.65s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease;
      opacity: 0;
      transform-style: preserve-3d;
      display: flex; flex-direction: column;
    }
    .rv-overlay.open .rv-card {
      transform: perspective(1000px) translateY(0) scale(1);
      opacity: 1;
    }

    /* gloss sheen */
    .rv-card::before {
      content: ''; position: absolute; top:0; left:0; right:0; height:52%;
      background: linear-gradient(180deg,rgba(255,255,255,0.88) 0%,rgba(255,255,255,0.3) 50%,transparent 100%);
      border-radius: 28px 28px 0 0; pointer-events: none; z-index: 20;
    }
    /* animated gradient border */
    .rv-card::after {
      content: ''; position: absolute; inset: 0; border-radius: 28px;
      border: 1.5px solid transparent;
      background:
        linear-gradient(white,white) padding-box,
        linear-gradient(135deg,
          rgba(91,33,255,0.7),
          rgba(255,255,255,0.2) 30%,
          rgba(255,61,87,0.5) 60%,
          rgba(245,166,35,0.4),
          rgba(91,33,255,0.7)
        ) border-box;
      background-size: 300% 300%;
      animation: rvBorderMove 5s linear infinite;
      pointer-events: none; z-index: 21;
    }
    @keyframes rvBorderMove {
      0%  { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100%{ background-position: 0% 50%; }
    }

    /* header */
    .rv-header {
      padding: 18px 24px 16px;
      background: linear-gradient(135deg,rgba(91,33,255,0.07),rgba(255,61,87,0.04));
      border-bottom: 1px solid rgba(91,33,255,0.1);
      display: flex; align-items: center; justify-content: space-between;
      position: relative; z-index: 22; flex-shrink: 0;
    }
    .rv-wdots { display: flex; gap: 5px; }
    .rv-wd { width:12px; height:12px; border-radius:50%; }
    .rv-wd-r { background:#ff5f57; box-shadow:0 0 6px rgba(255,95,87,0.5); }
    .rv-wd-y { background:#ffbd2e; box-shadow:0 0 6px rgba(255,189,46,0.5); }
    .rv-wd-g { background:#28ca41; box-shadow:0 0 6px rgba(40,202,65,0.5); }
    .rv-header-label {
      font-family:'Syne',sans-serif; font-size:12px; font-weight:700;
      color:#6b5fa0; letter-spacing:0.1em; text-transform:uppercase;
    }
    .rv-ai-pill {
      display:flex; align-items:center; gap:6px;
      background:rgba(91,33,255,0.08); border:1.5px solid rgba(91,33,255,0.2);
      border-radius:999px; padding:5px 14px;
      font-size:11px; font-weight:700; color:#5B21FF;
    }
    .rv-pulse { width:6px; height:6px; border-radius:50%; background:#22c55e; animation:rvPdot 2s infinite; }
    @keyframes rvPdot { 0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,0.5);} 50%{box-shadow:0 0 0 5px rgba(34,197,94,0);} }
    .rv-close {
      width:30px; height:30px; border-radius:50%;
      background:rgba(91,33,255,0.06); border:none; cursor:pointer;
      display:flex; align-items:center; justify-content:center;
      font-size:14px; font-weight:700; color:#6b5fa0;
      transition:all 0.2s cubic-bezier(0.34,1.56,0.64,1);
    }
    .rv-close:hover { background:rgba(255,61,87,0.1); color:#FF3D57; transform:scale(1.1) rotate(90deg); }

    /* body */
    .rv-body {
      padding: 24px 28px 20px;
      overflow-y: auto;
      max-height: calc(86vh - 68px);
      position: relative; z-index: 22;
      display: flex; flex-direction: column;
    }
    .rv-body::-webkit-scrollbar { width:4px; }
    .rv-body::-webkit-scrollbar-track { background:transparent; }
    .rv-body::-webkit-scrollbar-thumb { background:rgba(91,33,255,0.2); border-radius:2px; }

    /* status bar */
    .rv-status {
      display:flex; align-items:center; justify-content:space-between;
      margin-bottom:18px; padding:8px 14px;
      background:rgba(91,33,255,0.05); border:1px solid rgba(91,33,255,0.12);
      border-radius:10px; flex-shrink:0;
    }
    .rv-status-left { display:flex; align-items:center; gap:8px; font-size:11px; font-weight:700; color:#5B21FF; }
    .rv-sdot { width:7px; height:7px; border-radius:50%; }
    .rv-sdot.typing { background:#5B21FF; animation:rvSdot 0.8s ease-in-out infinite alternate; }
    .rv-sdot.done   { background:#22c55e; }
    .rv-sdot.resetting { background:#F5A623; animation:rvSdot 0.4s ease-in-out infinite alternate; }
    @keyframes rvSdot { from{opacity:1;transform:scale(1);} to{opacity:0.4;transform:scale(0.7);} }
    .rv-prog { font-size:11px; font-weight:700; color:#9b8fc0; font-family:'Syne',sans-serif; }

    /* output */
    .rv-output {
      flex:1; font-family:'Instrument Sans',sans-serif;
      font-size:13.5px; line-height:1.75; color:#1a1040;
      white-space:pre-wrap; word-break:break-word;
    }

    /* blinking cursor */
    .rv-cursor {
      display:inline-block; width:2px; height:1.1em; background:#5B21FF;
      margin-left:1px; vertical-align:text-bottom;
      animation:rvBlink 0.7s step-end infinite;
    }
    @keyframes rvBlink { 0%,100%{opacity:1;} 50%{opacity:0;} }

    /* resume typography classes */
    .tw-name {
      font-family:'Syne',sans-serif; font-size:22px; font-weight:800;
      background:linear-gradient(135deg,#5B21FF,#FF3D57);
      -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
      letter-spacing:-0.02em; display:block; margin-bottom:4px;
    }
    .tw-section {
      font-family:'Syne',sans-serif; font-size:10px; font-weight:800;
      letter-spacing:0.2em; text-transform:uppercase;
      background:linear-gradient(90deg,#5B21FF,#FF3D57);
      -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
      display:block; margin:16px 0 8px;
    }
    .tw-title { font-family:'Syne',sans-serif; font-size:14px; font-weight:700; color:#1a1040; display:block; margin-bottom:2px; }
    .tw-org   { color:#5B21FF; font-weight:600; font-size:13px; }
    .tw-muted { color:#9b8fc0; font-size:12px; }
    .tw-impact {
      display:inline-block; background:rgba(91,33,255,0.07);
      border:1px solid rgba(91,33,255,0.18); border-radius:6px;
      padding:4px 10px; color:#5B21FF; font-weight:700; font-size:12px; margin:3px 0;
    }
    .tw-award { color:#b87100; font-weight:700; }
    .tw-divider {
      display:block; height:1px;
      background:linear-gradient(90deg,rgba(91,33,255,0.2),rgba(255,61,87,0.15),transparent);
      margin:10px 0;
    }
    .tw-link { color:#5B21FF; font-weight:500; text-decoration:none; cursor:pointer; }
    .tw-link:hover { text-decoration:underline; color:#7C4FFF; }

    /* skill chips */
    .tw-chip-v { display:inline-block; background:rgba(91,33,255,0.08);  color:#5B21FF; border:1px solid rgba(91,33,255,0.2);  border-radius:5px; padding:1px 8px; font-size:11px; font-weight:600; margin:1px 2px; }
    .tw-chip-c { display:inline-block; background:rgba(255,61,87,0.07);  color:#cc2040; border:1px solid rgba(255,61,87,0.2);  border-radius:5px; padding:1px 8px; font-size:11px; font-weight:600; margin:1px 2px; }
    .tw-chip-g { display:inline-block; background:rgba(245,166,35,0.1);  color:#b87100; border:1px solid rgba(245,166,35,0.3); border-radius:5px; padding:1px 8px; font-size:11px; font-weight:600; margin:1px 2px; }
    .tw-chip-n { display:inline-block; background:rgba(61,45,112,0.07);  color:#3d2d70; border:1px solid rgba(61,45,112,0.15); border-radius:5px; padding:1px 8px; font-size:11px; font-weight:600; margin:1px 2px; }

    /* download row */
    .rv-dl-row { display:flex; gap:10px; margin-top:16px; padding-top:14px; border-top:1px solid rgba(91,33,255,0.1); }
    .rv-dl-btn {
      display:inline-flex; align-items:center; gap:7px;
      padding:9px 20px; border-radius:999px;
      font-family:'Syne',sans-serif; font-size:12px; font-weight:700;
      cursor:pointer; border:none;
      transition:all 0.2s cubic-bezier(0.34,1.56,0.64,1);
    }
    .rv-dl-primary {
      background:linear-gradient(135deg,#5B21FF,#7C4FFF); color:#fff;
      box-shadow:0 4px 16px rgba(91,33,255,0.35);
    }
    .rv-dl-primary:hover { transform:translateY(-3px) scale(1.04); }
    .rv-dl-ghost { background:transparent; color:#5B21FF; border:1.5px solid rgba(91,33,255,0.25)!important; }
    .rv-dl-ghost:hover { background:rgba(91,33,255,0.06); transform:translateY(-2px); }
  `;

  const dotClass  = status === 'typing' ? 'typing' : status === 'resetting' ? 'resetting' : 'done';
  const pillText  = status === 'typing' ? 'Typing...' : status === 'resetting' ? 'Rewinding' : 'Done';

  return (
    <>
      <style>{styles}</style>

      {/* ── TRIGGER BUTTON — drop this wherever "View Resume" lives ── */}
      <button
        onClick={openModal}
        style={{
          display:'inline-flex', alignItems:'center', gap:10,
          background:'linear-gradient(135deg,#5B21FF,#7C4FFF)',
          color:'#fff', border:'none', borderRadius:999,
          padding:'13px 28px',
          fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:700,
          cursor:'pointer',
          boxShadow:'0 6px 28px rgba(91,33,255,0.4)',
          transition:'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px) scale(1.04)'; e.currentTarget.style.boxShadow='0 10px 36px rgba(91,33,255,0.55)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 6px 28px rgba(91,33,255,0.4)'; }}
      >
        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
        View Résumé
      </button>

      {/* ── MODAL ── */}
      <div
        ref={overlayRef}
        className={`rv-overlay${isOpen ? ' open' : ''}`}
        onClick={e => { if (e.target === overlayRef.current || e.target.classList.contains('rv-bg')) closeModal(); }}
      >
        <div className="rv-bg" />

        <div
          ref={cardRef}
          className="rv-card"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Header */}
          <div className="rv-header">
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div className="rv-wdots">
                <div className="rv-wd rv-wd-r"/><div className="rv-wd rv-wd-y"/><div className="rv-wd rv-wd-g"/>
              </div>
              <div className="rv-header-label">resume.pdf</div>
            </div>
            <div className="rv-ai-pill">
              <div className="rv-pulse"/>
              <span>{pillText}</span>
            </div>
            <button className="rv-close" onClick={closeModal}>✕</button>
          </div>

          {/* Body */}
          <div className="rv-body" ref={bodyRef}>

            {/* Status bar */}
            <div className="rv-status">
              <div className="rv-status-left">
                <div className={`rv-sdot ${dotClass}`}/>
                <span>{barLabel}</span>
              </div>
              <div className="rv-prog">{progress}%</div>
            </div>

            {/* Typewriter output */}
            <div className="rv-output" ref={outputRef}>
              <span className="rv-cursor" ref={cursorRef}/>
            </div>

            {/* Download row — appears after complete */}
            {dlVisible && (
              <div className="rv-dl-row">
                <a href="/Eslavath_Vineeth_Naik_Resume.pdf" download className="rv-dl-btn rv-dl-primary">
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download PDF
                </a>
                <a href="https://linkedin.com/in/eslavath-vineeth-naik-a8ab16285" target="_blank" rel="noopener" className="rv-dl-btn rv-dl-ghost">
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  View on LinkedIn
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
```

---

## STEP 3 — Place the PDF file

Put your resume PDF at:
```
public/Eslavath_Vineeth_Naik_Resume.pdf
```

The Download button links to `/Eslavath_Vineeth_Naik_Resume.pdf` — this resolves from your public folder automatically in React/Next.js.

---

## STEP 4 — Use the component

In any page where your "View Résumé" / "Download Resume" button currently lives, import and drop in the component:

```jsx
import ResumeViewer from '../components/ResumeViewer';

// Replace your existing button with:
<ResumeViewer />
```

Or if you want your existing button to trigger it, wrap with state:

```jsx
import { useState } from 'react';
import ResumeViewer from '../components/ResumeViewer';

// In your hero section:
const [resumeOpen, setResumeOpen] = useState(false);

// Your existing button:
<button onClick={() => setResumeOpen(true)}>View Résumé</button>

// Add component anywhere in JSX (it self-manages visibility via prop):
// OR just drop <ResumeViewer /> directly — it renders its own trigger button
```

The simplest approach: just replace your existing "View Résumé" / "Download Resume" button with `<ResumeViewer />`. The component renders its own styled button.

---

## STEP 5 — If using Next.js App Router (layout.tsx / page.tsx)

Add `'use client'` at the top of the file if you get a server component error:

```jsx
'use client';
import ResumeViewer from '../components/ResumeViewer';
```

---

## BEHAVIOUR — Do NOT change this logic

| Event | What happens |
|-------|-------------|
| Click "View Résumé" | Modal opens with blur overlay, card springs up |
| After 600ms | Typewriter starts automatically |
| Typing | 28ms per char, 140ms pause on newlines, chips/headers inject instantly |
| Progress bar | Live % counter updates as chars are typed |
| Complete | Cursor hides, green ✓ status, Download buttons appear |
| After 1800ms | Card scrolls smoothly back to top (1.4s ease-in-out) |
| After scroll | Status shows "Ready to read ↑" — **animation stops forever** |
| Click overlay / press Esc | Modal closes, state fully resets |
| Re-open modal | Everything starts fresh from the beginning |
| Mouse on card | 3D corner tilt (rotateX/Y up to 14°/18°), shadow shifts |
| Mouse off card | Card springs back to flat with bounce easing |

---

## TIMING CONSTANTS — adjust only if needed

```js
const CHAR_DELAY  = 28;    // ms per character — increase for slower typing
const HTML_DELAY  = 60;    // ms pause after styled element injection
const LINE_PAUSE  = 140;   // extra ms when typing a newline (dramatic pause)
const RESET_DELAY = 1800;  // ms to wait at bottom before scrolling back to top
```

---

*Vivid Light design system · Syne + Instrument Sans · Spring easing throughout*
