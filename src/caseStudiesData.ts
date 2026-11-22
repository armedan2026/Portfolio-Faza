/* Case studies taken from Faza's own analysis reports (public/projects/*.html). */

export type CaseStudy = {
  id: 'grades' | 'knn' | 'inflation' | 'qris'
  number: string
  tag: string
  title: string
  subtitle: string
  summary: string
  metrics: { value: string; label: string }[]
  methods: { title: string; text: string }[]
  insights: string[]
  stack: string[]
  report: { href: string; label: string }
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'inflation',
    number: '01',
    tag: 'Econometrics · Monetary Policy',
    title: 'Nowcasting CPI Inflation & BI-Rate Transmission',
    subtitle: 'SARIMAX vs XGBoost time-series forecasting of Indonesian inflation',
    summary:
      'Publication lags in macro indicators and supply shocks (volatile food, imported inflation) call for early-warning tools at the central bank. This project models monthly Indonesian macro series — CPI, BI-Rate, USD/IDR and money supply — to nowcast year-on-year inflation and estimate how long a policy-rate change takes to pass through.',
    metrics: [
      { value: '0.14%', label: 'RMSE, YoY inflation (out-of-sample)' },
      { value: '88.5%', label: 'Directional accuracy' },
      { value: '4.12%', label: 'MAPE' },
      { value: '−41.7%', label: 'RMSE vs ARIMA baseline' },
    ],
    methods: [
      { title: 'Stationarity & lags', text: 'Augmented Dickey-Fuller unit-root tests, seasonal differencing, and lag selection via correlograms and Granger causality.' },
      { title: 'Hybrid modelling', text: 'Compared a structural SARIMAX with macro exogenous variables against a non-linear XGBoost time-series model.' },
      { title: 'Rolling validation', text: 'Expanding-window cross-validation to check accuracy stability on 1- to 6-month horizons.' },
    ],
    insights: [
      'SARIMAX with exogenous variables was selected: it keeps structural coefficients interpretable while cutting RMSE by 41.7% versus ARIMA.',
      'BI-Rate adjustments need an optimal transmission lag of 3–4 months to dampen core inflation expectations.',
      'Volatile-food shocks call for supply-side coordination through TPIP/TPID rather than interest rates alone.',
    ],
    stack: ['Python', 'SARIMAX', 'XGBoost', 'ADF Test', 'Granger Causality'],
    report: { href: 'projects/quantitative-policy-research.html', label: 'Open full policy research report' },
  },
  {
    id: 'qris',
    number: '02',
    tag: 'Payment Systems · Spatial Statistics',
    title: 'QRIS Adoption & Financial Inclusion Impact on MSMEs',
    subtitle: 'Spatial-temporal panel analysis of 34 provinces, 2021–2025',
    summary:
      'QRIS and BI-FAST are core pillars of the Indonesia Payment System Blueprint. Using a provincial panel, this study measures regional adoption gaps, tests whether QRIS adoption is linked to MSME outcomes, and segments provinces into digital-maturity clusters with tailored policy recommendations.',
    metrics: [
      { value: '0.64', label: 'Silhouette score · 3 clusters' },
      { value: 'p < 0.001', label: 'Kruskal-Wallis, H = 24.82' },
      { value: '+31.4%', label: 'Median MSME turnover (Wilcoxon)' },
      { value: 'ρ = 0.76', label: 'QRIS adoption vs MSME credit inclusion' },
    ],
    methods: [
      { title: 'Non-parametric tests', text: 'Wilcoxon signed-rank (pre vs post QRIS) and Kruskal-Wallis across regions, since transaction volumes are right-skewed.' },
      { title: 'Spatial autocorrelation', text: "Moran's I to detect spillover of digital-payment adoption between neighbouring provinces." },
      { title: 'K-Means clustering', text: 'Segmented 34 provinces by QRIS transactions per capita, MSME merchant penetration and regional inclusion index.' },
    ],
    insights: [
      'QRIS creates a digital transaction footprint that improves MSME creditworthiness.',
      'Median MSME turnover rose 31.4% after adoption — statistically significant at p < 0.001.',
      'Three maturity clusters emerged, each needing a different regional (KPwBI) policy focus.',
    ],
    stack: ['Python', 'Panel Data', "Moran's I", 'K-Means', 'Wilcoxon / Kruskal-Wallis'],
    report: { href: 'projects/quantitative-policy-research.html', label: 'Open full policy research report' },
  },
  {
    id: 'grades',
    number: '03',
    tag: 'Data Wrangling · EDA',
    title: 'Academic Performance Analysis',
    subtitle: 'Merging 7 relational tables to explain grading patterns',
    summary:
      'Merged, cleaned and aggregated seven relational academic tables — students, lecturers, grades, courses and more — to uncover the patterns behind how grades are given and what drives student achievement.',
    metrics: [
      { value: '7', label: 'Relational datasets merged' },
      { value: '85.75', label: 'Highest lecturer mean grade' },
      { value: '+19.1', label: 'Grade gap, PhD vs Master’s lecturers' },
      { value: '82.82', label: 'Mean grade, vocational (SMK) graduates' },
    ],
    methods: [
      { title: 'Relational merging', text: 'Joined student, lecturer, grade and course tables into one analysis-ready dataset.' },
      { title: 'Cleaning & aggregation', text: 'Handled inconsistencies, then used GroupBy aggregation for mean and standard deviation by dimension.' },
      { title: 'Comparative EDA', text: 'Compared grade level and spread by lecturer, school background, lecturer degree and class.' },
    ],
    insights: [
      'PhD (S3) lecturers give higher average grades (83.27, SD 12.07) than Master’s (S2) lecturers (64.17).',
      'Vocational (SMK) graduates achieve the highest and most consistent grades (82.82, SD 11.77).',
      'Class size does not directly affect average grades.',
    ],
    stack: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
    report: { href: 'projects/data-science-portfolio.html', label: 'Open full data science report' },
  },
  {
    id: 'knn',
    number: '04',
    tag: 'Machine Learning · HPC',
    title: 'k-NN Optimisation & Distance Metric Evaluation',
    subtitle: 'Parallelising 10-fold cross-validation without losing accuracy',
    summary:
      'k-Nearest Neighbours is computationally heavy when distances are computed serially inside 10-fold cross-validation. This project compares four distance metrics for classification and re-engineers the serial loops into parallel processing.',
    metrics: [
      { value: '4', label: 'Distance metrics compared' },
      { value: 'k = 5', label: 'Neighbours' },
      { value: '250 / 250', label: 'Train / test samples (2D)' },
      { value: '10-fold', label: 'Cross-validation' },
    ],
    methods: [
      { title: 'Multi-metric evaluation', text: 'Compared Euclidean (L2), Manhattan (L1), Chebyshev (L∞) and Canberra distances for k = 5 classification.' },
      { title: 'Parallel programming', text: 'Converted slow serial loops into multithreading / multiprocessing to cut 10-fold CV runtime.' },
      { title: 'Benchmarking', text: 'Measured execution time against the serial baseline while keeping accuracy unchanged.' },
    ],
    insights: [
      'The choice of distance metric changes which neighbours are found — and therefore the decision boundary.',
      'Parallelising distance computation speeds up cross-validation without sacrificing accuracy.',
    ],
    stack: ['Python', 'SciPy', 'scikit-learn', 'Multiprocessing'],
    report: { href: 'projects/data-science-portfolio.html', label: 'Open full data science report' },
  },
]

export const gradeData = {
  dosen: {
    label: 'By lecturer',
    note: 'Andri Basuki gives the highest mean (85.75) with the narrowest spread (SD 7.74), versus Annisa Fitria (mean 60.09, SD 16.22).',
    items: [
      { label: 'Andri Basuki', mean: 85.75, std: 7.74 },
      { label: 'Zulfikar', mean: 80.43, std: 15.88 },
      { label: 'Yudi', mean: 70.57, std: 13.01 },
      { label: 'Annisa Fitria', mean: 60.09, std: 16.22 },
    ],
  },
  sekolah: {
    label: 'School background',
    note: 'SMK graduates score highest (82.82) with the smallest SD (11.77). MA graduates show the widest spread (SD 21.11).',
    items: [
      { label: 'SMK', mean: 82.82, std: 11.77 },
      { label: 'MA', mean: 70.78, std: 21.11 },
      { label: 'SMU', mean: 65.85, std: 14.2 },
    ],
  },
  pendidikan: {
    label: 'Lecturer degree',
    note: 'PhD (S3) lecturers give a mean of 83.27, well above Master’s (S2) lecturers at 64.17.',
    items: [
      { label: 'PhD (S3)', mean: 83.27, std: 12.07 },
      { label: 'Master’s (S2)', mean: 64.17, std: 15.56 },
    ],
  },
  matkul: {
    label: 'By class',
    note: 'KAL01 has the most students (15) yet averages 78.67 — class size does not lower grades compared with small classes like KAL02 (4 students).',
    items: [
      { label: 'CS01 (7)', mean: 80.43, std: 15.88 },
      { label: 'KAL01 (15)', mean: 78.67, std: 12.8 },
      { label: 'KAL02 (4)', mean: 63.5, std: 8.1 },
      { label: 'STA02 (7)', mean: 58.14, std: 19.84 },
    ],
  },
} as const

export type GradeKey = keyof typeof gradeData

export const distanceMetrics = {
  euclidean: {
    name: 'Euclidean',
    title: 'Euclidean distance (L2 norm)',
    formula: '√((x₂−x₁)² + (y₂−y₁)²)',
    desc: 'The shortest straight-line distance between two points. Effective for continuous features on a uniform scale.',
    path: 'M 50 130 L 230 40',
  },
  manhattan: {
    name: 'Manhattan',
    title: 'Manhattan distance (L1 / city block)',
    formula: '|x₂−x₁| + |y₂−y₁|',
    desc: 'Distance along horizontal and vertical grid paths, like city blocks. More robust to outliers than Euclidean.',
    path: 'M 50 130 L 230 130 L 230 40',
  },
  chebyshev: {
    name: 'Chebyshev',
    title: 'Chebyshev distance (L∞ norm)',
    formula: 'max(|x₂−x₁|, |y₂−y₁|)',
    desc: 'Takes only the largest difference along a single coordinate — like a king’s move on a chessboard.',
    path: 'M 50 130 L 230 130',
  },
  canberra: {
    name: 'Canberra',
    title: 'Canberra distance (weighted L1)',
    formula: 'Σ |xᵢ−yᵢ| / (|xᵢ|+|yᵢ|)',
    desc: 'A weighted Manhattan distance that is very sensitive to small changes near the origin.',
    path: 'M 50 130 Q 140 130 230 40',
  },
} as const

export type MetricKey = keyof typeof distanceMetrics

export const modelComparison = [
  { model: 'ARIMA (2,1,1) univariate', rmse: 0.24, mape: 6.85, dir: 76.0, interp: 'High (no exogenous)' },
  { model: 'SARIMAX + exogenous', rmse: 0.14, mape: 4.12, dir: 88.5, interp: 'Very high (structural)', best: true },
  { model: 'XGBoost time-series', rmse: 0.16, mape: 4.48, dir: 86.2, interp: 'Moderate (SHAP)' },
]

export const qrisClusters = [
  {
    name: 'Mature digital accelerators',
    short: 'Mature',
    count: 9,
    vol: 'Rp 14.8 T',
    merchant: '+42.6% YoY',
    inclusion: '86.4%',
    scores: { vol: 92, growth: 76, inclusion: 86 },
    provinces: 'DKI Jakarta, West Java, East Java, Banten, Central Java, Bali, North Sumatra, South Sulawesi, DI Yogyakarta',
    policy: 'Deepen high-value transactions (cross-border QRIS, QRIS TUNTAS), link digital transaction data with KUR bank financing, and strengthen cyber-security and consumer protection.',
  },
  {
    name: 'High-growth transition',
    short: 'Transition',
    count: 15,
    vol: 'Rp 4.2 T',
    merchant: '+68.4% YoY',
    inclusion: '74.8%',
    scores: { vol: 54, growth: 95, inclusion: 75 },
    provinces: 'Riau, Riau Islands, South Sumatra, Lampung, East Kalimantan, South Kalimantan, North Sulawesi, West Nusa Tenggara, Jambi, West Sumatra, West Kalimantan, Aceh, Bangka Belitung, Bengkulu, Gorontalo',
    policy: 'Scale the National QRIS Week with local governments, digitise traditional-market levies and transactions, and support digital bookkeeping with BI’s SIAPIK app.',
  },
  {
    name: 'Infrastructure expansion focus',
    short: 'Expansion',
    count: 10,
    vol: 'Rp 1.1 T',
    merchant: '+51.2% YoY',
    inclusion: '61.5%',
    scores: { vol: 24, growth: 82, inclusion: 62 },
    provinces: 'East Nusa Tenggara, Central Kalimantan, North Kalimantan, Central Sulawesi, Southeast Sulawesi, West Sulawesi, Maluku, North Maluku, Papua, West Papua',
    policy: 'Expand telecom infrastructure and regional government transaction digitisation (ETPD), strengthen basic financial literacy, and integrate QRIS into tourism and flagship commodities.',
  },
]
