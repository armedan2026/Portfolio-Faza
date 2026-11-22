import type { Project } from './data'

/* Abstract dashboard previews — decorative, no real figures shown. */

function Frame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="dash" aria-hidden="true">
      <div className="dash-bar">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
        <span className="dash-title">{title}</span>
      </div>
      <div className="dash-body">{children}</div>
    </div>
  )
}

function Kpis({ n = 3 }: { n?: number }) {
  return (
    <div className="dash-kpis" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} className="kpi">
          <span className="kpi-line short" />
          <span className="kpi-val" style={{ width: `${55 + ((i * 17) % 35)}%` }} />
        </div>
      ))}
    </div>
  )
}

function HrPreview() {
  const bars = [62, 80, 48, 92, 70, 56]
  return (
    <Frame title="workforce_overview">
      <Kpis n={3} />
      <div className="dash-grid two">
        <div className="panel">
          <span className="kpi-line" />
          <svg viewBox="0 0 220 110" className="chart">
            {[25, 50, 75].map((y) => (
              <line key={y} x1="0" x2="220" y1={y} y2={y} className="grid" />
            ))}
            {bars.map((h, i) => (
              <rect key={i} x={10 + i * 35} y={105 - h} width="22" height={h} rx="3" className={i === 3 ? 'bar strong' : 'bar'} />
            ))}
          </svg>
        </div>
        <div className="panel">
          <span className="kpi-line" />
          <svg viewBox="0 0 120 110" className="chart">
            <circle cx="60" cy="55" r="38" className="ring-bg" />
            <circle cx="60" cy="55" r="38" className="ring" strokeDasharray="160 240" transform="rotate(-90 60 55)" />
            <circle cx="60" cy="55" r="38" className="ring alt" strokeDasharray="60 240" strokeDashoffset="-164" transform="rotate(-90 60 55)" />
          </svg>
        </div>
      </div>
    </Frame>
  )
}

function SurveyPreview() {
  const rows = [86, 72, 64, 48, 34]
  return (
    <Frame title="post_implementation_survey">
      <div className="dash-grid two">
        <div className="panel">
          <span className="kpi-line" />
          <div className="hbars">
            {rows.map((w, i) => (
              <div key={i} className="hbar-row">
                <span className="hbar-label" />
                <span className="hbar-track">
                  <span className={i === 0 ? 'hbar strong' : 'hbar'} style={{ width: `${w}%` }} />
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="panel">
          <span className="kpi-line" />
          <div className="stack">
            {[
              [40, 35, 25],
              [55, 30, 15],
              [30, 45, 25],
            ].map((seg, i) => (
              <div className="stack-row" key={i}>
                <span style={{ flex: seg[0] }} className="s1" />
                <span style={{ flex: seg[1] }} className="s2" />
                <span style={{ flex: seg[2] }} className="s3" />
              </div>
            ))}
          </div>
          <div className="notes">
            <span className="kpi-line" />
            <span className="kpi-line short" />
          </div>
        </div>
      </div>
    </Frame>
  )
}

function StatsPreview() {
  const pts = [80, 70, 74, 58, 62, 44, 50, 34, 38, 24]
  const d = pts.map((y, i) => `${i === 0 ? 'M' : 'L'} ${8 + i * 23} ${y}`).join(' ')
  return (
    <Frame title="trend_analysis.R">
      <Kpis n={2} />
      <div className="panel">
        <svg viewBox="0 0 225 100" className="chart">
          {[25, 50, 75].map((y) => (
            <line key={y} x1="0" x2="225" y1={y} y2={y} className="grid" />
          ))}
          <path d={`${d} L 215 100 L 8 100 Z`} className="area" />
          <path d={d} className="line" />
          {pts.map((y, i) => (
            <circle key={i} cx={8 + i * 23} cy={y} r="2.6" className="pt" />
          ))}
        </svg>
      </div>
    </Frame>
  )
}

function SciencePreview() {
  const pts = [
    [20, 80], [32, 70], [40, 74], [52, 60], [60, 64], [70, 52], [82, 48], [90, 40], [104, 36], [112, 28], [126, 30], [138, 20],
    [28, 62], [48, 82], [76, 66], [98, 52], [120, 44],
  ]
  return (
    <Frame title="model_notebook.ipynb">
      <div className="dash-grid two">
        <div className="panel">
          <svg viewBox="0 0 150 100" className="chart">
            <line x1="10" y1="90" x2="145" y2="90" className="axis" />
            <line x1="10" y1="5" x2="10" y2="90" className="axis" />
            <line x1="14" y1="84" x2="144" y2="18" className="fit" />
            {pts.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="3" className={i > 11 ? 'pt soft' : 'pt'} />
            ))}
          </svg>
        </div>
        <div className="panel heat">
          {Array.from({ length: 25 }).map((_, i) => (
            <span key={i} style={{ opacity: 0.25 + (((i * 7) % 11) / 11) * 0.75 }} />
          ))}
        </div>
      </div>
    </Frame>
  )
}

export function ProjectPreview({ kind }: { kind: Project['preview'] }) {
  switch (kind) {
    case 'hr':
      return <HrPreview />
    case 'survey':
      return <SurveyPreview />
    case 'stats':
      return <StatsPreview />
    default:
      return <SciencePreview />
  }
}
