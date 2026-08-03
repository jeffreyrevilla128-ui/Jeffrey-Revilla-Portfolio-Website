export interface Skill {
  name: string
  description?: string
  icon?: string
}

export interface SkillCategory {
  id: string
  title: string
  description: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    description:
      'Building responsive, interactive, and user-focused web interfaces.',
    skills: [
      {
        name: 'React',
        description: 'Component-based frontend development',
      },
      {
        name: 'TypeScript',
        description: 'Typed application development',
      },
      {
        name: 'Vue.js',
        description: 'Frontend application development',
      },
      {
        name: 'Tailwind CSS',
        description: 'Utility-first responsive styling',
      },
      {
        name: 'HTML',
        description: 'Semantic web structure',
      },
      {
        name: 'CSS',
        description: 'Custom styling and responsive layouts',
      },
    ],
  },

  {
    id: 'backend',
    title: 'Backend Development',
    description:
      'Developing server-side applications, APIs, and application logic.',
    skills: [
      {
        name: 'Node.js',
        description: 'JavaScript runtime for backend applications',
      },
      {
        name: 'Express.js',
        description: 'REST API and server-side development',
      },
      {
        name: 'REST APIs',
        description: 'API development and integration',
      },
    ],
  },

  {
    id: 'database',
    title: 'Database',
    description:
      'Working with relational databases and application data structures.',
    skills: [
      {
        name: 'PostgreSQL',
        description: 'Relational database development',
      },
      {
        name: 'pgAdmin',
        description: 'PostgreSQL database management',
      },
      {
        name: 'pgvector',
        description: 'Vector similarity search with PostgreSQL',
      },
    ],
  },

  {
    id: 'ai',
    title: 'AI & Computer Vision',
    description:
      'Integrating AI and computer vision technologies into practical applications.',
    skills: [
      {
        name: 'Qwen2-VL',
        description: 'Vision-language model integration',
      },
      {
        name: 'YOLOv8',
        description: 'Object detection and image-based searching',
      },
      {
        name: 'AI Integration',
        description: 'Integrating AI capabilities into web applications',
      },
      {
        name: 'Computer Vision',
        description: 'Image-based application features',
      },
      {
        name: 'Speech-to-Text',
        description: 'Voice-based text input for web applications',
      },
    ],
  },

  {
    id: 'development-tools',
    title: 'Development Tools',
    description:
      'Tools used for development, testing, version control, and application deployment.',
    skills: [
      {
        name: 'Git',
        description: 'Version control',
      },
      {
        name: 'GitHub',
        description: 'Source control and collaboration',
      },
      {
        name: 'Docker',
        description: 'Application containerization',
      },
      {
        name: 'Postman',
        description: 'API testing and development',
      },
      {
        name: 'VS Code',
        description: 'Primary development environment',
      },
    ],
  },
]