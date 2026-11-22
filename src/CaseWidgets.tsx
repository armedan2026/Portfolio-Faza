import { useState } from 'react'
import { motion } from 'framer-motion'
import { distanceMetrics, gradeData, modelComparison, qrisClusters, type GradeKey, type MetricKey } from './caseStudiesData'
/* ---------- Shared bits ---------- */
function Tabs<T extends string>({ options, value, onChange, label }: { options: { key: T; label: string }[]; value: T; onChange: (k: T) => void; label: string }) {
  return (
    <div className="w-tabs" role="tablist" aria-label={label}>
      {options.map((o) => (
        <button key={o.key} role="tab" aria-selected={value === o.key} className={value === o.key ? 'is-on' : ''} onClick={() => onChange(o.key)}>
          {o.label}
        </button>
      ))}
    </div>
  )
}

/* ---------- 1. Grades: mean ± SD bar chart ---------- */
export function GradesChart({ compact = false }: { compact?: boolean }) {
  const [key, setKey] = useState<GradeKey>('dosen')
  const [hover, setHover] = useState<number | null>(null)
  const ds = gradeData[key]
  const W = 520, H = 240, L = 34, R = 10, T = 14, B = 34
  const w = W - L - R, h = H - T - B
  const n = ds.items.length
  const band = w / n
  const bw = Math.min(64, band * 0.5)
  const y = (v: number) => T + h - (Math.max(0, Math.min(100, v)) / 100) * h

  return (
    <div className="widget">
      {!compact && (
        <Tabs
          label="Analysis dimension"
          value={key}
          onChange={(k) => { setKey(k); setHover(null) }}
          options={(Object.keys(gradeData) as GradeKey[]).map((k) => ({ key: k, label: gradeData[k].label }))}
        />
      )}
      <svg viewBox={`0 0 ${W} ${H}`} className="w-chart" role="img" aria-label={`Mean grade with standard deviation, ${ds.label}`}>
        {[0, 25, 50, 75, 100].map((t) => (
          <g key={t}>
            <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} className="w-grid" />
            <text x={L - 8} y={y(t) + 4} textAnchor="end" className="w-axis">{t}</text>
          </g>
        ))}
        {ds.items.map((d, i) => {
          const cx = L + band * i + band / 2
          const on = hover === i
          return (
            <g key={key + d.label} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(i)} onBlur={() => setHover(null)} tabIndex={compact ? -1 : 0}>
              <rect x={cx - band / 2} y={T} width={band} height={h} fill="transparent" />
              <motion.rect
                x={cx - bw / 2}
                width={bw}
                rx={6}
                initial={{ y: y(0), height: 0 }}
                animate={{ y: y(d.mean), height: y(0) - y(d.mean) }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className={i === 0 ? 'w-bar strong' : 'w-bar'}
                style={{ opacity: hover === null || on ? 1 : 0.45 }}
              />
              <line x1={cx} x2={cx} y1={y(d.mean + d.std)} y2={y(d.mean - d.std)} className="w-err" />
              <line x1={cx - 7} x2={cx + 7} y1={y(d.mean + d.std)} y2={y(d.mean + d.std)} className="w-err" />
              <line x1={cx - 7} x2={cx + 7} y1={y(d.mean - d.std)} y2={y(d.mean - d.std)} className="w-err" />
              <circle cx={cx} cy={y(d.mean)} r={4} className="w-dot" />
              <text x={cx} y={H - 12} textAnchor="middle" className="w-label">{d.label}</text>
              {(on || compact) && (
                <text x={cx} y={y(d.mean + d.std) - 8} textAnchor="middle" className="w-value">{d.mean.toFixed(2)}</text>
              )}
            </g>
          )
        })}
      </svg>
      {!compact && (
        <p className="w-note">
          <strong>{hover !== null ? `${ds.items[hover].label}: mean ${ds.items[hover].mean.toFixed(2)}, SD ±${ds.items[hover].std.toFixed(2)}. ` : 'Reading: '}</strong>
          {ds.note}
        </p>
      )}
    </div>
  )
}

/* ---------- 2. Distance metrics ---------- */
export function DistanceMetrics({ compact = false }: { compact?: boolean }) {
  const [key, setKey] = useState<MetricKey>('euclidean')
  const m = distanceMetrics[key]
  return (
    <div className="widget">
      {!compact && (
        <Tabs label="Distance metric" value={key} onChange={setKey} options={(Object.keys(distanceMetrics) as MetricKey[]).map((k) => ({ key: k, label: distanceMetrics[k].name }))} />
      )}
      <div className="w-metric">
        <div className="w-metric-head">
          <strong>{m.title}</strong>
          <code>{m.formula}</code>
        </div>
        <svg viewBox="0 0 280 170" className="w-chart" role="img" aria-label={`${m.title} between point A and point B`}>
          <defs>
            <pattern id={`grid-${compact ? 'c' : 'f'}`} width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" className="w-gridline" />
            </pattern>
          </defs>
          <rect width="280" height="170" fill={`url(#grid-${compact ? 'c' : 'f'})`} rx="8" />
          <motion.path key={key} d={m.path} className="w-path" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, ease: 'easeInOut' }} />
          <circle cx="50" cy="130" r="6" className="w-pt-a" />
          <text x="36" y="153" className="w-label">A (x₁, y₁)</text>
          <circle cx="230" cy="40" r="6" className="w-pt-b" />
          <text x="198" y="25" className="w-label">B (x₂, y₂)</text>
        </svg>
        {!compact && <p className="w-note">{m.desc}</p>}
      </div>
    </div>
  )
}

/* ---------- 3. Monetary policy simulator ---------- */
function project(bps: number, fx: number, food: number) {
  // Simple structural transmission used in the original report (3-month lag)
  const bi = -(bps / 25) * 0.14
  const fxp = fx * 0.16
  const fd = (food - 2.5) * 0.24
  const t1 = Math.max(0.8, 2.55 + fxp * 0.5 + fd * 0.7 + bi * 0.25)
  const t2 = Math.max(0.8, 2.5 + fxp * 0.8 + fd * 0.9 + bi * 0.65)
  const t3 = Math.max(0.8, 2.45 + fxp + fd + bi)
  return [2.62, 2.58, 2.51, t1, t2, t3]
}

function status(v: number) {
  if (v >= 1.5 && v <= 3.5) return { text: 'Within target (1.5%–3.5%)', tone: 'ok' }
  if (v > 3.5 && v <= 4.1) return { text: 'Upside pressure (> 3.5%)', tone: 'warn' }
  if (v > 4.1) return { text: 'Tightening / TPIP needed', tone: 'alert' }
  return { text: 'Below lower target (< 1.5%)', tone: 'warn' }
}

export function InflationSimulator({ compact = false }: { compact?: boolean }) {
  const [bps, setBps] = useState(25)
  const [fx, setFx] = useState(1.5)
  const [food, setFood] = useState(3.2)
  const s = project(bps, fx, food)
  const st = status(s[5])
  const W = 520, H = 220, L = 40, R = 18, T = 16, B = 30
  const w = W - L - R, h = H - T - B
  const minY = 0.5, maxY = 5
  const x = (i: number) => L + 24 + (i / 5) * (w - 48)
  const y = (v: number) => T + h - ((Math.min(maxY, v) - minY) / (maxY - minY)) * h
  const labels = ['t−2', 't−1', 't (now)', 't+1', 't+2', 't+3']
  const hist = s.slice(0, 3).map((v, i) => `${x(i)},${y(v)}`).join(' ')
  const fore = s.slice(2).map((v, i) => `${x(i + 2)},${y(v)}`).join(' ')

  return (
    <div className="widget">
      {!compact && (
        <div className="w-sim">
          <label>
            <span>BI-Rate adjustment <b>{bps > 0 ? `+${bps}` : bps} bps</b></span>
            <input type="range" min={-75} max={100} step={25} value={bps} onChange={(e) => setBps(+e.target.value)} />
          </label>
          <label>
            <span>USD/IDR volatility <b>{fx.toFixed(1)}%</b></span>
            <input type="range" min={0} max={6} step={0.5} value={fx} onChange={(e) => setFx(+e.target.value)} />
          </label>
          <label>
            <span>Volatile food pressure <b>{food.toFixed(1)}%</b></span>
            <input type="range" min={0.5} max={8} step={0.3} value={food} onChange={(e) => setFood(+e.target.value)} />
          </label>
          <div className={`w-result tone-${st.tone}`} aria-live="polite">
            <span>Projected CPI inflation, t+3 (YoY)</span>
            <strong>{s[5].toFixed(2)}%</strong>
            <em>{st.text}</em>
          </div>
        </div>
      )}
      <svg viewBox={`0 0 ${W} ${H}`} className="w-chart" role="img" aria-label={`Inflation path with projection ${s[5].toFixed(2)} percent at t+3, BI target band 1.5 to 3.5 percent`}>
        <rect x={L} y={y(3.5)} width={w} height={y(1.5) - y(3.5)} className="w-band" />
        {[1, 2, 3, 4, 5].map((t) => (
          <g key={t}>
            <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} className="w-grid" />
            <text x={L - 8} y={y(t) + 4} textAnchor="end" className="w-axis">{t}%</text>
          </g>
        ))}
        <line x1={L} x2={W - R} y1={y(2.5)} y2={y(2.5)} className="w-target" />
        <text x={L + 6} y={y(1.5) - 6} className="w-axis">BI target band 2.5% ± 1%</text>
        <polyline points={hist} className="w-line" />
        <polyline points={fore} className="w-line dashed" />
        {s.map((v, i) => (
          <g key={i}>
            <motion.circle cx={x(i)} animate={{ cy: y(v) }} transition={{ duration: 0.35 }} r={i >= 3 ? 5 : 4} className={i >= 3 ? 'w-dot fore' : 'w-dot'} />
            <motion.text x={x(i)} animate={{ y: y(v) - 10 }} transition={{ duration: 0.35 }} textAnchor="middle" className="w-value">{v.toFixed(2)}</motion.text>
            <text x={x(i)} y={H - 10} textAnchor="middle" className="w-label">{labels[i]}</text>
          </g>
        ))}
      </svg>
      {!compact && (
        <p className="w-note">
          Illustrative scenario tool from the report: a +25 bps hike dampens inflation by ~0.14 pp at peak (3–4 months), while exchange-rate and food shocks pass through to prices.
        </p>
      )}
    </div>
  )
}

export function ModelTable() {
  return (
    <div className="w-table-wrap">
      <table className="w-table">
        <caption>Out-of-sample model comparison</caption>
        <thead>
          <tr>
            <th scope="col">Model</th>
            <th scope="col">RMSE</th>
            <th scope="col">MAPE</th>
            <th scope="col">Dir. acc.</th>
            <th scope="col">Interpretability</th>
          </tr>
        </thead>
        <tbody>
          {modelComparison.map((r) => (
            <tr key={r.model} className={r.best ? 'is-best' : ''}>
              <th scope="row">{r.model}{r.best && <span className="chip">Selected</span>}</th>
              <td>{r.rmse.toFixed(2)}%</td>
              <td>{r.mape.toFixed(2)}%</td>
              <td>{r.dir.toFixed(1)}%</td>
              <td>{r.interp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ---------- 4. QRIS cluster explorer ---------- */
export function ClusterExplorer({ compact = false }: { compact?: boolean }) {
  const [idx, setIdx] = useState(0)
  const c = qrisClusters[idx]
  const W = 520, H = 220, L = 34, R = 10, T = 18, B = 34
  const w = W - L - R, h = H - T - B
  const y = (v: number) => T + h - (v / 100) * h
  const gw = w / 3
  const keys = [
    { k: 'vol', label: 'QRIS volume index', cls: 's1' },
    { k: 'growth', label: 'Merchant growth index', cls: 's2' },
    { k: 'inclusion', label: 'Inclusion ratio (%)', cls: 's3' },
  ] as const

  return (
    <div className="widget">
      {!compact && (
        <Tabs label="Digital maturity cluster" value={String(idx)} onChange={(k) => setIdx(+k)} options={qrisClusters.map((q, i) => ({ key: String(i), label: `${q.short} · ${q.count}` }))} />
      )}
      <svg viewBox={`0 0 ${W} ${H}`} className="w-chart" role="img" aria-label="Standardised indicators by cluster">
        {[0, 50, 100].map((t) => (
          <g key={t}>
            <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} className="w-grid" />
            <text x={L - 8} y={y(t) + 4} textAnchor="end" className="w-axis">{t}</text>
          </g>
        ))}
        {qrisClusters.map((q, i) => {
          const gx = L + gw * i
          const on = i === idx
          const bw = Math.min(34, gw / 5)
          return (
            <g key={q.short} onClick={() => !compact && setIdx(i)} style={{ cursor: compact ? 'default' : 'pointer' }}>
              {on && <rect x={gx + 6} y={T - 8} width={gw - 12} height={h + 8} rx={10} className="w-highlight" />}
              {keys.map((k, j) => {
                const v = q.scores[k.k]
                const bx = gx + gw / 2 - (bw * 3 + 8) / 2 + j * (bw + 4)
                return (
                  <g key={k.k}>
                    <motion.rect x={bx} width={bw} rx={4} initial={{ y: y(0), height: 0 }} animate={{ y: y(v), height: y(0) - y(v), opacity: on || compact ? 1 : 0.5 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className={k.cls} />
                    <text x={bx + bw / 2} y={y(v) - 5} textAnchor="middle" className="w-value small">{v}</text>
                  </g>
                )
              })}
              <text x={gx + gw / 2} y={H - 12} textAnchor="middle" className={`w-label ${on ? 'strong' : ''}`}>{q.short}</text>
            </g>
          )
        })}
      </svg>
      <div className="w-legend">
        {keys.map((k) => (
          <span key={k.k}><i className={k.cls} />{k.label}</span>
        ))}
      </div>
      {!compact && (
        <div className="w-cluster">
          <div className="w-cluster-stats">
            <div><span>Median QRIS value / month</span><strong>{c.vol}</strong></div>
            <div><span>MSME merchant growth</span><strong>{c.merchant}</strong></div>
            <div><span>Financial inclusion ratio</span><strong>{c.inclusion}</strong></div>
          </div>
          <p><b>{c.name} — {c.count} provinces:</b> {c.provinces}.</p>
          <p><b>Policy recommendation:</b> {c.policy}</p>
        </div>
      )}
    </div>
  )
}
