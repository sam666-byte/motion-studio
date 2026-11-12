"use client";

import { useMemo, useState } from "react";

const starter = `@keyframes float {
  from { transform: translateY(0) rotate(-5deg); }
  to   { transform: translateY(-28px) rotate(5deg); }
}

.orb {
  animation: float 2.4s ease-in-out infinite alternate;
}`;

function durationFromCss(css: string) {
  const match = css.match(/animation\s*:[^;]*?([\d.]+)\s*(ms|s)/i);
  if (!match) return 2.4;
  const value = Number(match[1]) * (match[2].toLowerCase() === "ms" ? 0.001 : 1);
  return Math.min(20, Math.max(0.2, Number.isFinite(value) ? value : 2.4));
}

export default function Home() {
  const [code, setCode] = useState(starter);
  const [playing, setPlaying] = useState(true);
  const duration = durationFromCss(code);
  const preview = useMemo(() => `<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><style>
    *{box-sizing:border-box}body{margin:0;height:100vh;display:grid;place-items:center;background:#101116;color:white;font:14px system-ui;overflow:hidden}
    .stage{width:100%;height:100%;display:grid;place-items:center;background-image:radial-gradient(#ffffff12 1px,transparent 1px);background-size:22px 22px}
    .orb{width:100px;height:100px;border-radius:32px;background:linear-gradient(135deg,#a78bfa,#5b5ce2);box-shadow:0 24px 70px #7064ff55;animation:float ${duration}s ease-in-out infinite alternate;animation-play-state:${playing ? "running" : "paused"}}
    @keyframes float{from{transform:translateY(0) rotate(-5deg)}to{transform:translateY(-28px) rotate(5deg)}}
  </style></head><body><main class="stage"><div class="orb" aria-label="Animated preview"></div></main></body></html>`, [duration, playing]);

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Motion Studio home"><span className="brand-mark">m</span><span>motion<span className="brand-light">studio</span></span></a>
        <div className="project-name"><span className="status-dot" />Untitled project <span className="muted">/</span> <span className="muted">Autosaved</span></div>
        <div className="top-actions"><button className="quiet-button">Share</button><button className="publish-button">Export <span aria-hidden="true">↗</span></button><button className="avatar" aria-label="Account">S</button></div>
      </header>
      <div className="workspace">
        <aside className="sidebar">
          <button className="side-item active"><span>▧</span>Workspace</button>
          <button className="side-item"><span>◷</span>Assets</button>
          <div className="side-label">PROJECT</div>
          <button className="file-item"><span className="file-icon">◈</span>Untitled animation</button>
          <div className="sidebar-bottom"><div className="plan-card"><span className="plan-icon">✳</span><div><strong>Make it move</strong><small>Your animation starts here.</small></div></div><div className="user-row"><span className="avatar small">S</span><div><strong>Sam</strong><small>Free workspace</small></div><span className="more">···</span></div></div>
        </aside>
        <section className="main-area">
          <div className="document-bar"><div className="breadcrumbs">Workspace <span>/</span> <strong>Untitled animation</strong></div><div className="canvas-tools"><button aria-label="Zoom out">−</button><span>100%</span><button aria-label="Zoom in">+</button><i /><button aria-label="Fit canvas">⤢</button></div></div>
          <div className="canvas"><div className="canvas-caption"><span className="live-dot" />LIVE PREVIEW</div><iframe title="Animation preview" sandbox="" srcDoc={preview} /><div className="canvas-footer"><span><i className="keyboard-icon">⌘</i> Preview is isolated</span><span>960 × 540</span></div></div>
          <div className="editor-panel"><div className="editor-heading"><div className="tab"><span className="css-icon">{`{ }`}</span> animation.css <span className="unsaved-dot" /></div><div className="editor-controls"><span>CSS</span><button onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause preview" : "Play preview"}>{playing ? "Ⅱ" : "▶"}</button></div></div><div className="editor-body"><div className="line-numbers" aria-hidden="true">{code.split("\n").map((_, i) => <span key={i}>{i + 1}</span>)}</div><label className="sr-only" htmlFor="animation-code">Animation CSS</label><textarea id="animation-code" spellCheck={false} value={code} onChange={(event) => setCode(event.target.value)} aria-describedby="editor-note" /></div><div id="editor-note" className="editor-note">Starter CSS is shown for editing. Preview runs in a sandbox and only applies a bounded animation duration.</div></div>
        </section>
        <aside className="inspector"><div className="inspector-title">Properties <button aria-label="More properties">···</button></div><div className="empty-selection"><div className="selection-art">✦</div><strong>Nothing selected</strong><p>Select an element on the canvas to edit its properties.</p></div><div className="inspector-section"><span>ANIMATION</span><div className="property-row"><span>Duration</span><strong>{duration.toFixed(1)}s</strong></div><div className="duration-track"><i /></div><div className="property-row"><span>Loop</span><strong>Infinite⌄</strong></div></div><div className="inspector-section easing"><span>PREVIEW SAFETY</span><p>Code is not executed in the preview. Only the animation duration is read and clamped.</p></div></aside>
      </div>
    </main>
  );
}
