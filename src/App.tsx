import { Fragment, useEffect, useState } from 'react'
import { motion, MotionConfig, useScroll, useSpring, type Variants } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Download, GraduationCap, Mail, MapPin, Menu, Phone, X } from 'lucide-react'
import {
  achievements,
  education,
  experiences,
  leadership,
  navLinks,
  profile,
  projects,
  skillGroups,
  stats,
  tools,
} from './data'
import { ProjectPreview } from './Previews'
import { CaseStudies } from './CaseStudies'

const ease = [0.22, 1, 0.36, 1] as const

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const inView = { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-80px' } } as const

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

/* Word-by-word reveal for editorial headings */
function Reveal({ text, className, as: Tag = 'h2', delay = 0 }: { text: string; className?: string; as?: 'h1' | 'h2' | 'p'; delay?: number }) {
  const words = text.split(' ')
  const MotionTag = motion[Tag]
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="word-mask" aria-hidden="true">
            <motion.span
              className="word"
              variants={{ hidden: { y: '110%' }, show: { y: '0%', transition: { duration: 0.9, ease } } }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </MotionTag>
  )
}

function SectionHead({ index, label, title, intro }: { index: string; label: string; title: string; intro?: string }) {
  return (
    <div className="section-head">
      <motion.div className="eyebrow" {...inView} variants={fadeUp}>
        <span className="eyebrow-index">{index}</span>
        <span className="eyebrow-rule" />
        <span>{label}</span>
      </motion.div>
      <div className="section-head-row">
        <Reveal text={title} className="section-title" />
        {intro && (
          <motion.p className="section-intro" {...inView} variants={fadeUp}>
            {intro}
          </motion.p>
        )}
      </div>
    </div>
  )
}

function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    navLinks.forEach((l) => {
      const el = document.getElementById(l.id)
      if (el) obs.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      obs.disconnect()
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#top" className="logo" aria-label="Faza — back to top">
          faza<span>.</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          {navLinks.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={active === l.id ? 'is-active' : ''}>
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn btn-small btn-dark nav-cta">
          Let’s talk
        </a>
        <button className="nav-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <motion.div className="mobile-menu" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          {[...navLinks, { id: 'contact', label: 'Contact' }].map((l, i) => (
            <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)}>
              <span>0{i + 1}</span>
              {l.label}
            </a>
          ))}
        </motion.div>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <motion.p className="hero-label" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
            <span className="pulse" /> Hello, I’m Faza
          </motion.p>

          <h1 className="hero-name" aria-label={profile.name}>
            {['Faza', 'Fahimatul', '‘Ilmiyah'].map((w, i) => (
              <span className="word-mask block" key={w} aria-hidden="true">
                <motion.span
                  className={`word ${i === 2 ? 'accent-word' : ''}`}
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1, ease, delay: 0.15 + i * 0.1 }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.55 } } }}>
            <motion.p className="hero-title" variants={fadeUp}>
              <span className="rule" /> Data Analyst &amp; Statistics Graduate
            </motion.p>
            <motion.p className="hero-tagline" variants={fadeUp}>
              Turning data into <mark>insights</mark> that drive <mark>better decisions</mark>.
            </motion.p>
            <motion.p className="hero-desc" variants={fadeUp}>
              With a background in Statistics and experience in data operations and project coordination, I enjoy exploring patterns,
              uncovering insights, and transforming data into meaningful stories.
            </motion.p>
            <motion.div className="hero-actions" variants={fadeUp}>
              <a href="#projects" className="btn btn-dark">
                Explore My Work <ArrowDown size={18} />
              </a>
              <a href={profile.cv} className="btn btn-outline" download>
                Download My CV <Download size={18} />
              </a>
            </motion.div>
          </motion.div>
        </div>

        <div className="hero-visual">
          <motion.div
            className="hero-shape"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease, delay: 0.1 }}
          />
          <motion.div
            className="hero-shape-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
          />
          <motion.figure
            className="portrait"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.3, ease, delay: 0.25 }}
          >
            <img src={profile.photo} alt="Portrait of Faza Fahimatul 'Ilmiyah smiling, wearing a light blue patterned hijab and white shirt" width={1334} height={2000} fetchPriority="high" />
          </motion.figure>

          <motion.div className="float-card fc-top" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease, delay: 1 }}>
            <GraduationCap size={18} />
            <div>
              <strong>B.Stat</strong>
              <span>Universitas Indonesia</span>
            </div>
          </motion.div>
          <motion.div className="float-card fc-bottom" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease, delay: 1.15 }}>
            <svg width="44" height="26" viewBox="0 0 44 26" aria-hidden="true">
              <polyline points="2,22 12,16 20,18 30,8 42,4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <strong>Open to opportunities</strong>
              <span>Data · Analytics · PMO</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container hero-foot">
        <span>
          <MapPin size={14} /> Based in {profile.location}
        </span>
        <span className="hero-foot-rule" />
        <a href="#about">
          Scroll <ArrowDown size={14} />
        </a>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="section bg-white" id="about">
      <div className="container">
        <SectionHead index="01" label="About Me" title="A statistician who loves the story behind the numbers." />
        <div className="about-grid">
          <motion.div className="about-lead" {...inView} variants={fadeUp}>
            <p className="lead">
              I’m a Statistics graduate from <strong>Universitas Indonesia</strong> with hands-on experience across insurance and digital agency
              environments.
            </p>
          </motion.div>
          <motion.div className="about-body" {...inView} variants={stagger}>
            <motion.p variants={fadeUp}>
              My work sits where analysis meets coordination: processing and visualising HR data for monthly reporting at REDCOMM Indonesia,
              and supporting product projects at Prudential Life Assurance — tracking timelines, documenting decisions, and summarising survey
              feedback into insights stakeholders can act on.
            </motion.p>
            <motion.p variants={fadeUp}>
              Outside the spreadsheet, I’ve led multimedia teams, managed organisational budgets, and represented Indonesia at an international
              youth forum. I’m detail-oriented, adaptable, and always sharpening my analytical and problem-solving skills.
            </motion.p>
            <motion.div className="about-meta" variants={fadeUp}>
              <div>
                <span>Based in</span>Depok, West Java
              </div>
              <div>
                <span>Focus</span>Data Analysis · Reporting · Project Coordination
              </div>
              <div>
                <span>Education</span>B.Stat, Universitas Indonesia
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.dl className="stats" {...inView} variants={stagger}>
          {stats.map((s) => (
            <motion.div className="stat" key={s.label} variants={fadeUp}>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section className="section bg-soft" id="skills">
      <div className="container">
        <SectionHead
          index="02"
          label="Expertise & Skills"
          title="Analytical rigour, with a designer’s eye."
          intro="A toolkit built through a Statistics degree, two professional roles, and years of leading creative teams."
        />
        <motion.div className="skills-grid" {...inView} variants={stagger}>
          {skillGroups.map((g) => (
            <motion.article className="skill-card" key={g.title} variants={fadeUp}>
              <span className="skill-index">{g.index}</span>
              <h3>{g.title}</h3>
              <p>{g.summary}</p>
              <ul>
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
        <div className="marquee" aria-label={`Tools: ${tools.join(', ')}`}>
          <div className="marquee-track" aria-hidden="true">
            {[...tools, ...tools].map((t, i) => (
              <span key={i}>
                {t}
                <i>✦</i>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section className="section bg-white" id="projects">
      <div className="container">
        <SectionHead
          index="03"
          label="Featured Projects"
          title="Selected work in data & insight."
          intro="Analytical case studies in econometrics, spatial statistics and machine learning — plus data work from my professional roles and competitions."
        />
        <motion.div className="sub-head" {...inView} variants={fadeUp}>
          <h3 className="sub-title">Analytical case studies</h3>
          <p>Click a project to explore the interactive results.</p>
        </motion.div>
        <CaseStudies />
        <motion.div className="sub-head sub-head-gap" {...inView} variants={fadeUp}>
          <h3 className="sub-title">From professional roles &amp; competitions</h3>
        </motion.div>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <motion.article
              key={p.id}
              className="project-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease, delay: (i % 2) * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <div className="project-visual">
                <ProjectPreview kind={p.preview} />
              </div>
              <div className="project-info">
                <div className="project-meta">
                  <span className="chip">{p.tag}</span>
                  <span>{p.year}</span>
                </div>
                <h3>{p.title}</h3>
                <p className="project-context">{p.context}</p>
                <p className="project-desc">{p.description}</p>
                <ul className="project-highlights">
                  {p.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <div className="project-foot">
                  <span>{p.tools.join(' · ')}</span>
                  <span className="project-arrow" aria-hidden="true">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="section bg-soft" id="experience">
      <div className="container">
        <SectionHead
          index="04"
          label="Professional Experience"
          title="Where data meets delivery."
          intro="Roles that combined analysis, reporting and cross-functional coordination."
        />
        <ol className="timeline">
          {experiences.map((e) => (
            <motion.li className="tl-item" key={e.company} {...inView} variants={fadeUp}>
              <div className="tl-side">
                <span className="tl-period">{e.period}</span>
                <span className="tl-type">{e.type}</span>
              </div>
              <span className="tl-node" aria-hidden="true" />
              <div className="tl-card">
                <h3>{e.role}</h3>
                <p className="tl-company">
                  {e.company} <span>· {e.location}</span>
                </p>
                <ul>
                  {e.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>

        <div className="leadership">
          <motion.h3 className="sub-title" {...inView} variants={fadeUp}>
            Leadership &amp; Organisation
          </motion.h3>
          <motion.div className="leadership-grid" {...inView} variants={stagger}>
            {leadership.map((l) => (
              <motion.div className="lead-item" key={l.org} variants={fadeUp}>
                <span className="lead-period">{l.period}</span>
                <h4>{l.role}</h4>
                <p className="lead-org">{l.org}</p>
                <p className="lead-note">{l.note}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Achievements() {
  const featured = achievements.filter((a) => a.featured)
  const rest = achievements.filter((a) => !a.featured)
  return (
    <section className="section bg-white" id="achievements">
      <div className="container">
        <SectionHead
          index="05"
          label="Achievements"
          title="Recognition along the way."
          intro="Competitions and honours across data, research, innovation and leadership."
        />
        <div className="ach-layout">
          <motion.div className="ach-featured" {...inView} variants={stagger}>
            {featured.map((a, i) => (
              <motion.article className={`ach-feature ${i === 0 ? 'tone-blue' : ''}`} key={a.title} variants={fadeUp}>
                <div className="ach-feature-top">
                  <span className="chip">{a.kind}</span>
                  <span className="ach-year">{a.year}</span>
                </div>
                <h3>{a.title}</h3>
                <p>{a.org}</p>
              </motion.article>
            ))}
          </motion.div>
          <motion.ul className="ach-list" {...inView} variants={stagger}>
            {rest.map((a) => (
              <motion.li key={a.title} variants={fadeUp}>
                <span className="ach-year">{a.year}</span>
                <div>
                  <h4>{a.title}</h4>
                  <p>{a.org}</p>
                </div>
                <span className="ach-kind">{a.kind}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}

function Education() {
  return (
    <section className="section bg-soft" id="education">
      <div className="container">
        <SectionHead index="06" label="Education" title="Grounded in statistics." />
        <motion.article className="edu-card" {...inView} variants={fadeUp}>
          <div className="edu-left">
            <span className="edu-icon">
              <GraduationCap size={26} />
            </span>
            <span className="edu-period">{education.period}</span>
          </div>
          <div className="edu-main">
            <h3>{education.degree}</h3>
            <p className="edu-school">
              {education.school} <span>· {education.location}</span>
            </p>
            <ul>
              {education.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div className="edu-mark" aria-hidden="true">
            UI
          </div>
        </motion.article>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <motion.div className="eyebrow" {...inView} variants={fadeUp}>
          <span className="eyebrow-index">07</span>
          <span className="eyebrow-rule" />
          <span>Contact</span>
        </motion.div>
        <Reveal text="Let’s turn your data into better decisions." className="contact-title" />
        <motion.p className="contact-intro" {...inView} variants={fadeUp}>
          I’m open to Data Analyst, Business Intelligence and Project Coordination roles. Have an opportunity or simply want to connect? My inbox
          is always open.
        </motion.p>
        <motion.a href={`mailto:${profile.email}`} className="contact-email" {...inView} variants={fadeUp}>
          {profile.email}
          <span>
            <ArrowUpRight size={28} />
          </span>
        </motion.a>
        <motion.div className="contact-grid" {...inView} variants={stagger}>
          <motion.a variants={fadeUp} href={`mailto:${profile.email}`} className="contact-item">
            <Mail size={20} />
            <span>Email</span>
            <strong>{profile.email}</strong>
          </motion.a>
          <motion.a variants={fadeUp} href={profile.linkedinHref} target="_blank" rel="noreferrer" className="contact-item">
            <LinkedInIcon size={20} />
            <span>LinkedIn</span>
            <strong>{profile.linkedin}</strong>
          </motion.a>
          <motion.a variants={fadeUp} href={profile.phoneHref} className="contact-item">
            <Phone size={20} />
            <span>Phone</span>
            <strong>{profile.phone}</strong>
          </motion.a>
          <motion.div variants={fadeUp} className="contact-item">
            <MapPin size={20} />
            <span>Location</span>
            <strong>{profile.location}</strong>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <a href="#top" className="logo">
          faza<span>.</span>
        </a>
        <p>© {new Date().getFullYear()} Faza Fahimatul ‘Ilmiyah. Designed with data &amp; care.</p>
        <div className="footer-links">
          <a href={profile.linkedinHref} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedInIcon size={16} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email">
            <Mail size={16} />
          </a>
          <a href="#top" className="back-top">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <MotionConfig reducedMotion="user">
      <a href="#about" className="skip-link">
        Skip to content
      </a>
      <motion.div className="progress" style={{ scaleX: progress }} />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Education />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
