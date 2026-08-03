export interface Experience {
  id: string
  title: string
  organization: string
  period: string
  type: string
  role: string
  description: string
  responsibilities: string[]
  technologies: string[]
}

export const experiences: Experience[] = [
  {
    id: 'csu-lost-and-found',
    title: 'CSU Digital Lost-and-Found System',
    organization: 'Caraga State University',
    period: '2025 – 2026',
    type: 'Capstone / Thesis Project',
    role: 'Lead Developer',
    description:
      'Led the development of a full-stack campus lost-and-found system, taking responsibility for major application features, system integration, and technical implementation throughout the project.',
    responsibilities: [
      'Led the development of the overall web application and coordinated the implementation of major system features.',
      'Designed and implemented responsive frontend interfaces and user workflows.',
      'Developed backend APIs and server-side application logic using Node.js and Express.js.',
      'Designed and integrated PostgreSQL database structures for system records.',
      'Integrated an image-assisted metadata extraction workflow using a locally executed vision-language model.',
      'Implemented image-based searching and semi-automated item matching.',
      'Implemented QR-based student ID verification for item-related workflows.',
      'Integrated frontend, backend, database, AI, and image-processing components into the system.',
      'Performed system testing, debugging, and feature refinement throughout development.',
      'Contributed to technical and thesis documentation.',
    ],
    technologies: [
      'Vue.js',
      'Tailwind CSS',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Qwen2-VL',
      'YOLOv8',
      'pgvector',
    ],
  },

  {
    id: 'internship-management-system',
    title: 'Internship Management System',
    organization: 'Personal Development Project',
    period: '2026',
    type: 'Web Application',
    role: 'Full-Stack Developer',
    description:
      'Developed a web-based internship management system focused on organizing internship activities and providing a structured workflow for monitoring attendance, required hours, and daily records.',
    responsibilities: [
      'Designed and developed the frontend using React and TypeScript.',
      'Implemented responsive interfaces and reusable UI components using Tailwind CSS.',
      'Developed backend APIs using Node.js and Express.js.',
      'Designed PostgreSQL database structures for internship-related information.',
      'Implemented attendance recording and rendered-hour tracking.',
      'Developed internship configuration and progress-monitoring workflows.',
      'Implemented diary and daily activity management features.',
      'Structured the application using reusable React components and TypeScript.',
      'Integrated frontend, backend, and database functionality into the application.',
    ],
    technologies: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Node.js',
      'Express.js',
      'PostgreSQL',
    ],
  },

  {
    id: 'ojt-time-tracker',
    title: 'OJT Time Tracker',
    organization: 'Personal Development Project',
    period: '2026',
    type: 'Web Application',
    role: 'Full-Stack Developer',
    description:
      'Designed and developed a focused internship time-tracking application that streamlined attendance monitoring, hour calculations, and daily documentation, including a speech-to-text feature for diary entries.',
    responsibilities: [
      'Designed and developed the application interface using React and TypeScript.',
      'Implemented responsive layouts and custom UI components using Tailwind CSS.',
      'Developed backend APIs using Node.js and Express.js.',
      'Designed PostgreSQL database structures for attendance and internship records.',
      'Implemented separate morning and afternoon attendance tracking.',
      'Developed rendered-hour and remaining-hour calculations based on internship configuration.',
      'Implemented internship configuration, start-date, and required-hour workflows.',
      'Developed diary and daily activity recording features.',
      'Integrated speech-to-text functionality to allow faster diary entry input through voice.',
      'Implemented reusable components and structured the application for maintainability.',
      'Refined the user interface and interaction flow based on practical usage.',
    ],
    technologies: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Speech-to-Text',
    ],
  },
]