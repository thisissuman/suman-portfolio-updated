import type { StaticImageData } from 'next/image';
import mangalya from '@/public/projects/mangalya.webp';
import vivaha from '@/public/projects/vivaha.png';
import movies from '@/public/KiraMovie.png';

export const profile = {
  name: 'Suman Kumar Maharana',
  shortName: 'Suman',
  role: 'Senior Frontend Developer',
  email: 'sumanmaharana222888@gmail.com',
  description:
    'Suman Kumar Maharana is an Associate Staff Engineer at Nagarro, building web experiences with React, Next.js and JavaScript. Explore his projects and career history.',
  introduction:
    'I’m Suman, a senior frontend developer and Associate Staff Engineer at Nagarro. I build consumer-facing web applications with React, Next.js and JavaScript.',
  resume: '/Suman_Resume.pdf',
  socials: [
    { label: 'GitHub', url: 'https://github.com/thisissuman' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/sumanmaharana222888/' },
  ],
  about: [
    'From banking systems and fraud-monitoring dashboards to consumer-facing web applications, my work connects thoughtful interfaces with the systems behind them. I’m currently an Associate Staff Engineer at Nagarro in Bengaluru.',
    'My focus is modern JavaScript, React and Next.js, with attention to reusable components, cross-browser compatibility and automated testing. My personal projects explore movie discovery, wedding planning and digital invitations.',
  ],
} as const;

export const navigation = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const;

export type Project = {
  title: string;
  category: string;
  description: string;
  tags: readonly string[];
  image: StaticImageData;
  imageAlt: string;
  source: string;
  demo: string;
  status: string;
  demoAvailable: boolean;
};
export const projects = [
  {
    title: 'Kira Movie',
    category: 'Movie discovery',
    description:
      'A movie-browsing experience for discovering titles and exploring what to watch next.',
    tags: ['React', 'Redux', 'Tailwind CSS'],
    image: movies,
    imageAlt: 'Kira Movie interface with movie artwork and a search field',
    source: 'https://github.com/thisissuman/KiraMovix',
    demo: 'https://kira-movix.vercel.app/',
    status: 'Personal project',
    demoAvailable: true,
  },
  {
    title: 'Mangalya',
    category: 'Wedding planning · wed-master',
    description:
      'An Android-first wedding planner for Indian couples and families. Organize ceremonies, tasks, expenses and guest households in a private, device-local workspace, with backup and CSV export.',
    tags: ['React Native', 'Expo', 'TypeScript', 'Zustand'],
    image: mangalya,
    imageAlt: 'Mangalya onboarding illustration of a couple planning their wedding together',
    source: 'https://github.com/thisissuman/wed-master',
    demo: '',
    status: 'Private beta',
    demoAvailable: false,
  },
  {
    title: 'Vivaha Studio',
    category: 'Digital invitations · wed-pro',
    description:
      'A digital wedding invitation builder with customizable templates, live editing, personal photos and music. Publish a shareable invitation with event details, maps and WhatsApp RSVP.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    image: vivaha,
    imageAlt: 'Floral wedding invitation template artwork from Vivaha Studio',
    source: 'https://github.com/thisissuman/wed-pro',
    demo: 'https://wed-pro.vercel.app/',
    status: 'Open beta',
    demoAvailable: true,
  },
] as const satisfies readonly Project[];

export const experience = [
  {
    company: 'Nagarro',
    logo: '/companies/nagarro.jpg',
    role: 'Associate Staff Engineer',
    period: 'May 2025 — Present',
    summary:
      'Associate Staff Engineer in Bengaluru, working in a hybrid role. My profile combines a senior frontend focus with Node.js experience.',
    technologies: ['Node.js'],
    current: true,
  },
  {
    company: 'Tata Consultancy Services',
    logo: '/companies/tcs.jpg',
    role: 'Senior Frontend Developer',
    period: 'Aug 2024 — May 2025',
    summary:
      'Led UI development for the MetLife Turkey project using React, Node.js and Remix. Built insurance-claim hooks, supported Docker-to-OpenShift migrations and implemented Azure DevOps CI/CD pipelines.',
    technologies: ['React', 'Node.js', 'Remix', 'Azure DevOps'],
    current: false,
  },
  {
    company: 'Clari5 (CustomerXPs)',
    logo: '/companies/clari5.jpg',
    role: 'Senior Frontend Developer',
    period: 'May 2021 — Aug 2024',
    summary:
      'Built real-time banking fraud-monitoring interfaces, case-management dashboards and transaction-tagging tools. Integrated REST APIs, localized interfaces, data visualizations and automated tests.',
    technologies: ['JavaScript', 'REST APIs', 'MySQL', 'Automated testing'],
    current: false,
  },
  {
    company: 'CustomerXPs',
    logo: '/companies/clari5.jpg',
    role: 'Project Engineer',
    period: 'Jun 2019 — Apr 2021',
    summary:
      'Supported data-center migrations and banking-data operations. Wrote shell scripts and MySQL procedures to connect core banking systems with fraud-risk management systems, and automated Unix workflows.',
    technologies: ['MySQL', 'Unix', 'Shell scripting'],
    current: false,
  },
] as const;

export const education = {
  qualification: 'Bachelor of Technology',
  institution: 'Roland Institute of Technology, Berhampur',
  year: '2019',
};
export const skillGroups = [
  {
    name: 'Interfaces',
    description: 'The foundations of my frontend work.',
    items: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'React', 'Next.js', 'Remix'],
  },
  {
    name: 'State & styling',
    description: 'Managing data and shaping the interface.',
    items: ['Redux', 'React Query', 'Tailwind CSS', 'Material UI'],
  },
  {
    name: 'Behind the UI',
    description: 'APIs, services and persistent data.',
    items: ['Node.js', 'Express', 'MongoDB', 'MySQL', 'Prisma', 'Firebase', 'Oracle'],
  },
  {
    name: 'Tools & workflow',
    description: 'From exploring an idea to working with code.',
    items: ['Git', 'GitHub', 'Jest', 'React Testing Library', 'Webpack', 'UNIX'],
  },
] as const;
