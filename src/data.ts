export const profile = {
  firstName: 'Faza',
  name: "Faza Fahimatul 'Ilmiyah",
  title: 'Data Analyst & Statistics Graduate',
  email: 'fazailmiyah@gmail.com',
  phone: '0814-6117-1185',
  phoneHref: 'tel:+6281461171185',
  linkedin: 'linkedin.com/in/fazafahimatul',
  linkedinHref: 'https://www.linkedin.com/in/fazafahimatul',
  location: 'Depok, West Java, Indonesia',
  photo: 'images/faza-profile.jpeg',
  cv: 'files/CV-Faza_Fahimatul_Ilmiyah.pdf',
}

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Expertise' },
  { id: 'projects', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'education', label: 'Education' },
]

export const stats = [
  { value: '150+', label: 'Employee records processed & maintained' },
  { value: '6', label: 'Business units analysed for monthly HR reports' },
  { value: '8', label: 'Awards & competition achievements' },
  { value: '10+', label: 'Campus events, trainings & volunteer programs' },
]

export type SkillGroup = { index: string; title: string; summary: string; items: string[] }

export const skillGroups: SkillGroup[] = [
  {
    index: '01',
    title: 'Data Analysis & Statistics',
    summary: 'Cleaning, merging and testing data to find the patterns that matter.',
    items: ['Python (Pandas, NumPy, SciPy)', 'R / RStudio', 'SQL', 'Microsoft Excel', 'Hypothesis Testing', 'Data Wrangling & EDA'],
  },
  {
    index: '02',
    title: 'Modelling & Machine Learning',
    summary: 'Forecasting, classifying and segmenting with models I can explain.',
    items: ['SARIMAX', 'XGBoost', 'k-NN', 'K-Means Clustering', 'Cross-Validation', 'Parallel Computing'],
  },
  {
    index: '03',
    title: 'Visualisation & Reporting',
    summary: 'Turning numbers into clear charts, reports and stories people can act on.',
    items: ['Matplotlib & Seaborn', 'Interactive Dashboards', 'Monthly Reporting', 'Infographics', 'Canva', 'Adobe Illustrator'],
  },
  {
    index: '04',
    title: 'Project Coordination',
    summary: 'Keeping cross-functional work aligned, documented and on schedule.',
    items: ['Timeline Tracking', 'Project Documentation', 'Minutes of Meeting', 'Stakeholder Updates', 'Survey Design'],
  },
]

export const tools = ['Python', 'Pandas', 'SciPy', 'scikit-learn', 'R', 'SQL', 'SARIMAX', 'XGBoost', 'Excel', 'LaTeX', 'Canva', 'Illustrator']

export type Project = {
  id: string
  tag: string
  year: string
  title: string
  context: string
  description: string
  highlights: string[]
  tools: string[]
  preview: 'hr' | 'survey' | 'stats' | 'science'
}

export const projects: Project[] = [
  {
    id: 'hr-analytics',
    tag: 'People Analytics',
    year: '2025',
    title: 'HR Workforce Data & Monthly Reporting',
    context: 'REDCOMM Indonesia · HR Data Operation',
    description:
      'Processed and maintained HR data for more than 150 employees, then analysed and visualised workforce trends across six business units to power the monthly HR report.',
    highlights: ['150+ employee records', '6 business units', 'Monthly trend reports'],
    tools: ['Microsoft Excel', 'Data Visualisation', 'Reporting'],
    preview: 'hr',
  },
  {
    id: 'pir-survey',
    tag: 'Survey Analytics',
    year: '2025 – 2026',
    title: 'Post-Implementation Review Insights',
    context: 'Prudential Life Assurance · Product Projects',
    description:
      'Developed, collected and summarised post-implementation surveys to capture stakeholder feedback and key insights for product project reviews.',
    highlights: ['Survey design', 'Feedback synthesis', 'Stakeholder reporting'],
    tools: ['Survey Design', 'Excel', 'PowerPoint'],
    preview: 'survey',
  },
  {
    id: 'nsc-2023',
    tag: 'Competition · Data Analyst',
    year: '2023',
    title: 'National Statistics Challenge 2023',
    context: 'Universitas Brawijaya · 6th Place',
    description:
      'Competed in the Data Analyst category of a national statistics challenge hosted by Universitas Brawijaya, placing 6th.',
    highlights: ['6th place nationally', 'Data analyst track'],
    tools: ['Data Analysis', 'Statistics', 'Visualisation'],
    preview: 'stats',
  },
  {
    id: 'rasio-7',
    tag: 'Competition · Data Science',
    year: '2023',
    title: 'RASIO 7.0 Data Science Competition',
    context: 'Finalist',
    description:
      'Reached the final round of the RASIO 7.0 data science competition, applying statistical and programming skills to a data-driven problem.',
    highlights: ['Finalist', 'Data science'],
    tools: ['Data Science', 'Statistics', 'Programming'],
    preview: 'science',
  },
]

export type Experience = {
  period: string
  role: string
  company: string
  location: string
  type: string
  points: string[]
}

export const experiences: Experience[] = [
  {
    period: 'Nov 2025 — May 2026',
    role: 'Product Project Manager',
    company: 'Prudential Life Assurance',
    location: 'South Jakarta',
    type: 'Apprenticeship',
    points: [
      'Supported the management of multiple product projects by tracking timelines, deliverables and maintaining project documentation.',
      'Prepared project updates, reports and meeting materials to support stakeholder communication and alignment.',
      'Coordinated cross-functional meetings, documented discussions through structured MoM, and followed up on action items while escalating risks or issues.',
      'Assisted post-implementation reviews by developing, collecting and summarising surveys to capture feedback and key insights.',
    ],
  },
  {
    period: 'Jan 2025 — Mar 2025',
    role: 'HR Data Operation Intern',
    company: 'REDCOMM Indonesia',
    location: 'Central Jakarta',
    type: 'Internship',
    points: [
      'Processed and maintained HR data of over 150 employees using Microsoft Excel.',
      'Analysed and visualised employee data trends across 6 business units for monthly HR reports.',
      'Supported recruitment and onboarding documentation for more than 20 new hires.',
    ],
  },
]

export const leadership = [
  { period: '2022 — Present', role: 'Treasurer', org: 'Universitas Indonesia Scout Rovers', note: 'Annual budget planning; supervising incoming and outgoing funds.' },
  { period: '2022 — 2024', role: 'Head of Multimedia Department', org: 'DPM UI 2023', note: 'Led social media, content planning and department projects.' },
  { period: '2022', role: 'Second Deputy, Multimedia & Design', org: 'HMD Matematika FMIPA UI', note: 'Led EIGEN Vol.8 e-magazine. Named best deputy of the year.' },
  { period: '2023', role: 'Secretary', org: 'Depok Kita 2023', note: 'Administration and liaison with government and public stakeholders.' },
  { period: '2022 — 2023', role: 'Head of Documentation & Design', org: 'Math Cup 2023', note: 'Coordinated publication timetable and event documentation.' },
  { period: '2022', role: 'Chief', org: 'Ticket to Life · Kalpavriksha Mengabdi', note: 'Led community programs in Pandeglang and Buleleng, Bali.' },
]

export type Achievement = { year: string; title: string; org: string; kind: string; featured?: boolean }

export const achievements: Achievement[] = [
  { year: '2023', title: '6th Place — Data Analyst', org: 'National Statistics Challenge, Universitas Brawijaya', kind: 'Data', featured: true },
  { year: '2024', title: 'Bronze Medal', org: 'IPITEx — Thailand Inventors’ Day 2024', kind: 'Innovation', featured: true },
  { year: '2024', title: 'Duta Bahasa Terfavorit', org: 'Provinsi DKI Jakarta 2024', kind: 'Recognition' },
  { year: '2024', title: 'Finalist, Infographic Competition', org: 'Universitas Padjadjaran', kind: 'Visualisation' },
  { year: '2023', title: 'Finalist, Data Science Competition', org: 'RASIO 7.0', kind: 'Data' },
  { year: '2022', title: 'Indonesia Scout Movement Representative', org: 'Hong Kong International Scout Youth Forum', kind: 'International' },
  { year: '2022', title: 'Best Deputy', org: 'HMD Matematika FMIPA UI 2022', kind: 'Leadership' },
  { year: '2021', title: '1st Place, Scientific Poster', org: 'OIM MATEK 2021 — Mathematics Student Scientific Olympiad', kind: 'Research' },
]

export const education = {
  school: 'Universitas Indonesia',
  location: 'Depok, Indonesia',
  degree: 'Bachelor of Statistics',
  period: 'Aug 2021 — Dec 2025',
  points: [
    'Active participant in 10+ campus events — webinars, volunteering and skills-training workshops.',
    'Head of Media Division for more than 3 events.',
    'Treasurer of Universitas Indonesia Scout Rovers 2023.',
  ],
}
