export interface Project {
  id: string
  title: string
  shortDescription: string
  description: string
  role: string
  technologies: string[]
  category: string
  image: string
  github?: string
  liveDemo?: string
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 'csu-digital-lost-and-found',
    title: 'CSU Digital Lost-and-Found System',
    shortDescription:
      'An AI-assisted digital lost-and-found system designed to improve how lost and found items are reported, searched, matched, and verified.',
    description:
      'A web-based campus lost-and-found system developed for Caraga State University. The system provides structured reporting, image-assisted metadata extraction, item searching, QR-based student ID verification, and semi-automated matching to help improve the lost-and-found process.',
    role: 'Lead Developer',
    technologies: [
      'Vue.js',
      'Tailwind CSS',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Qwen2-VL',
      'YOLOv8',
      'pgvector',
      'QR Code',
    ],
    category: 'Full-Stack / AI Integration',
    image: '/images/projects/lost-and-found.png',
    github: '',
    liveDemo: '',
    featured: true,
  },

  {
    id: 'internship-management-system',
    title: 'Internship Management System',
    shortDescription:
      'A web-based platform for managing internship activities, attendance, required hours, and daily internship records.',
    description:
      'A web application designed to organize internship-related activities such as attendance tracking, rendered hours, remaining hours, diary records, and internship configuration. The system provides a structured interface for managing and monitoring internship progress.',
    role: 'Full-Stack Developer',
    technologies: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Node.js',
      'Express.js',
      'PostgreSQL',
    ],
    category: 'Full-Stack Web Application',
    image: '/images/projects/internship-management.png',
    github: '',
    liveDemo: '',
    featured: true,
  },

  {
    id: 'ojt-time-tracker',
    title: 'OJT Time Tracker',
    shortDescription:
      'A personal internship time-tracking application with attendance monitoring, rendered-hour tracking, diary management, and speech-to-text functionality.',
    description:
      'A personal web application developed to manage internship attendance, rendered hours, remaining hours, daily records, and overall internship progress. The system also includes speech-to-text functionality that allows users to dictate diary entries directly into the application, making daily documentation faster and more convenient.',
    role: 'Full-Stack Developer',
    technologies: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Speech-to-Text',
    ],
    category: 'Full-Stack Web Application',
    image: '/images/projects/ojt-time-tracker.png',
    github: '',
    liveDemo: '',
    featured: true,
  },
]