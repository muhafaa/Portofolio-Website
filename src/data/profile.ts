export interface ContactLink {
  label: string
  href: string
  text: string
}

export interface Product {
  id: string
  name: string
  period: string
  summary: string
  highlights: string[]
  stack: string[]
  url?: string
}

export interface Role {
  company: string
  title: string
  location: string
  start: string
  end: string
  summary: string
  points: string[]
}

export interface SkillGroup {
  name: string
  items: string[]
}

export const profile = {
  name: 'Muhammad Fajri',
  role: 'Software Engineer transitioning to Agentic AI Engineer',
  quote: { text: 'Adaptability is the key to success', author: 'Unknown' },
  intro: 'I always looking to grow and giving the best of my effort.',
}

export const contacts: ContactLink[] = [
  { label: 'Email', href: 'mailto:muhafa99@gmail.com', text: 'muhafa99@gmail.com' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/muhammad-fajri-5a0baa157/',
    text: 'linkedin.com/in/muhammad-fajri-5a0baa157',
  },
  { label: 'GitHub', href: 'https://github.com/muhafaa', text: 'github.com/muhafaa' },
  { label: 'WhatsApp', href: 'https://wa.me/6285838440855', text: '+62 858 3844 0855' },
]

export const products: Product[] = [
  {
    id: 'semesta',
    name: 'Semesta assessment platform',
    period: '2025 to now',
    summary:
      'A Nuxt monorepo of five apps where organisations author test items, run psychometric tests and quizzes, grade participants, and publish reports. I own the frontend of two of the five apps.',
    highlights: [
      'Built item authoring, psychometric, quiz, and reflection activities, and grading workflows across 220+ merged merge requests.',
      'Built a configurable report builder and a bulk Excel download whose preview and file share one column-mapping engine, so they always match.',
      'Moved participant exports to background jobs and lazy-loaded a 97 KB zip library out of report page bundles.',
      'Built the mobile and tablet flow for taking psychometric tests.',
    ],
    stack: ['Nuxt', 'Vue 3', 'TypeScript', 'Zod', 'Tailwind CSS', 'Vitest', 'pnpm workspaces'],
  },
  {
    id: 'vac',
    name: 'Virtual Assessment Center',
    period: '2024 to 2025',
    summary:
      'A dashboard where administrators run assessment projects and assessors score candidates. I set up its frontend from an empty repository.',
    highlights: [
      'Set up the app with Vue 3, Vite, Pinia, Vue Router, Bootstrap 5, and vue-i18n, including token-based login and base components.',
      'Built project setup, candidate enrollment, bulk score upload, and report generation.',
      'Built the final-scoring flow where assessors submit narratives and evidence and QC assessors approve or reject them.',
      'Shipped 80 merged merge requests across 6 releases.',
    ],
    stack: ['Vue 3', 'Vite', 'Pinia', 'Bootstrap 5', 'vue-i18n', 'Laravel'],
  },
  {
    id: 'talentics',
    name: 'Talentics dashboard',
    period: '2022 to 2025',
    summary:
      'An HR dashboard companies use to survey employees and run hiring, from job posts and tests to interviews.',
    highlights: [
      'Built the Employee Engagement Survey module: templates, respondent uploads with validation, invitation and reminder emails, bilingual surveys, and eNPS and company-summary charts.',
      'Built applicant-tracking features, including interview management, video interview scorecards, and WhatsApp candidate invitations.',
      'Implemented personal data protection features: versioned privacy policies, account deletion, and data masking.',
      'Migrated legacy jQuery screens to Vue components.',
    ],
    stack: ['Vue', 'Laravel', 'Chart.js', 'SCSS', 'jQuery'],
  },
]

export const personalProjects: Product[] = [
  {
    id: 'wfh-calendar',
    name: 'WFH Calendar',
    period: '2026',
    summary:
      'A calendar that shows who in each office division works from home on Fridays, and lets anyone download the schedule as an Excel file.',
    highlights: [
      'Generates a fair Friday roster for each division, counting past assignments and skipping public holidays.',
      'Locks past Fridays, so roster changes only reshuffle future slots.',
      'Builds the Excel export in a web worker, so the page stays responsive while the file is generated.',
      'Publishes next year’s schedule ahead of time, so the site switches years on 1 January without a new deploy.',
    ],
    stack: ['Nuxt 4', 'Vue 3', 'TypeScript', 'Bun', 'ExcelJS', 'Cloudflare Pages'],
    url: 'https://wfh-calendar.pages.dev',
  },
]

export const roles: Role[] = [
  {
    company: 'PT. Sekolah Integrasi Digital (Sekolahmu)',
    title: 'Software Engineer, Frontend',
    location: 'South Jakarta, remote',
    start: 'Apr 2022',
    end: 'now',
    summary:
      'Frontend engineer for the Semesta, Virtual Assessment Center, and Talentics products described above.',
    points: [
      'Built a Sekolahmu Vue design system with SCSS and Storybook.',
      'Built reusable catalog components and shared composables, covering shared logic with 60+ unit tests.',
    ],
  },
  {
    company: 'TaniFund',
    title: 'Frontend Engineer',
    location: 'South Jakarta',
    start: 'May 2020',
    end: 'Apr 2022',
    summary: 'Built frontends for borrower operations and merchant lending in an Agile team.',
    points: [
      'Built a responsive field-officer progress-reporting app with Nuxt and TypeScript, with image uploads to Google Cloud Storage.',
      'Built a merchant-loan app covering registration, digital signature, and payment.',
      'Maintained an internal web app built with jQuery and Laravel, and wrote unit tests with Jest.',
    ],
  },
  {
    company: 'PT. Pertamina MOR II',
    title: 'IT Staff Intern',
    location: 'Palembang',
    start: 'May 2017',
    end: 'Jul 2017',
    summary:
      'Built an internal PHP app to monitor the International Sustainability Rating System (ISRS).',
    points: [],
  },
]

export const skills: SkillGroup[] = [
  {
    name: 'Languages and frameworks',
    items: ['JavaScript', 'TypeScript', 'Vue 2 and 3', 'Nuxt', 'Pinia', 'Vue Router', 'Laravel'],
  },
  {
    name: 'UI and styling',
    items: ['Tailwind CSS', 'SCSS', 'Bootstrap', 'Storybook', 'Chart.js'],
  },
  {
    name: 'Testing and tooling',
    items: ['Vitest', 'Jest', 'Zod', 'Vite', 'pnpm workspaces', 'ESLint', 'GitLab CI'],
  },
]

export const education = [
  'Associate Degree in Informatics Management, Politeknik Negeri Sriwijaya',
  'Hacktiv8 Fullstack JavaScript Immersive Program, 2019',
]
