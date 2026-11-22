import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { caseStudies, type CaseStudy } from './caseStudiesData'
import { ClusterExplorer, DistanceMetrics, GradesChart, InflationSimulator, ModelTable } from './CaseWidgets'

const ease = [0.22, 1, 0.36, 1] as const

function Widget({ id, compact }: { id: CaseStudy['id']; compact?: boolean }) {
  switch (id) {
    case 'grades':
      return <GradesChart compact={compact} />
    case 'knn':
      return <DistanceMetrics compact={compact} />
    case 'inflation':
      return <InflationSimulator compact={compact} />
    default:
      return <ClusterExplorer compact={compact} />
  }
}

function CaseModal({ cs, onClose }: { cs: CaseStudy; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      prev?.focus()
    }
  }, [onClose])

  return (
    <motion.div className="cs-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        className="cs-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`cs-title-${cs.id}`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.45, ease }}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="cs-modal-head">
          <div>
            <span className="cs-kicker">Case study {cs.number} · {cs.tag}</span>
            <h3 id={`cs-title-${cs.id}`}>{cs.title}</h3>
            <p>{cs.subtitle}</p>
          </div>
          <button ref={closeRef} className="cs-close" onClick={onClose} aria-label="Close case study">
            <X size={20} />
          </button>
        </header>

        <div className="cs-modal-body">
          <p className="cs-summary">{cs.summary}</p>

          <dl className="cs-metrics">
            {cs.metrics.map((m) => (
              <div key={m.label}>
                <dd>{m.value}</dd>
                <dt>{m.label}</dt>
              </div>
            ))}
          </dl>

          <div className="cs-panel">
            <h4>Interactive results</h4>
            <Widget id={cs.id} />
          </div>

          {cs.id === 'inflation' && (
            <div className="cs-panel">
              <h4>Model diagnostics</h4>
              <ModelTable />
            </div>
          )}

          <div className="cs-two">
            <div>
              <h4>Methodology</h4>
              <ol className="cs-methods">
                {cs.methods.map((m, i) => (
                  <li key={m.title}>
                    <span>0{i + 1}</span>
                    <div>
                      <strong>{m.title}</strong>
                      <p>{m.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h4>Key insights</h4>
              <ul className="cs-insights">
                {cs.insights.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <div className="cs-stack">
                {cs.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <footer className="cs-modal-foot">
          <span>Individual analysis project</span>
          <a href={cs.report.href} target="_blank" rel="noreferrer" className="btn btn-dark btn-small">
            {cs.report.label} <ArrowUpRight size={16} />
          </a>
        </footer>
      </motion.div>
    </motion.div>
  )
}

export function CaseStudies() {
  const [open, setOpen] = useState<CaseStudy | null>(null)
  return (
    <>
      <div className="cs-grid">
        {caseStudies.map((cs, i) => (
          <motion.article
            key={cs.id}
            className="cs-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease, delay: (i % 2) * 0.08 }}
            whileHover={{ y: -6 }}
          >
            <div className="cs-visual" aria-hidden="true">
              <Widget id={cs.id} compact />
            </div>
            <div className="cs-info">
              <div className="project-meta">
                <span className="chip">{cs.tag}</span>
                <span>Case {cs.number}</span>
              </div>
              <h3>{cs.title}</h3>
              <p className="project-desc">{cs.subtitle}</p>
              <dl className="cs-mini-metrics">
                {cs.metrics.slice(0, 3).map((m) => (
                  <div key={m.label}>
                    <dd>{m.value}</dd>
                    <dt>{m.label}</dt>
                  </div>
                ))}
              </dl>
              <button className="cs-open" onClick={() => setOpen(cs)}>
                View case study
                <span className="project-arrow" aria-hidden="true">
                  <ArrowUpRight size={18} />
                </span>
              </button>
            </div>
          </motion.article>
        ))}
      </div>
      <AnimatePresence>{open && <CaseModal key={open.id} cs={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </>
  )
}
