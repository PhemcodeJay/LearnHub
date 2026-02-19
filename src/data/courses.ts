export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'quiz' | 'reading';
  completed: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  enrolled: number;
  rating: number;
  reviews: number;
  price: number;
  instructor: {
    name: string;
    avatar: string;
    title: string;
  };
  tags: string[];
  modules: Module[];
  isEnrolled?: boolean;
  progress?: number;
}

export const categories = [
  'All',
  'Business',
  'Technology',
  'Design',
  'Marketing',
  'Science',
  'Languages',
  'Arts',
  'Personal Development',
];

export const courses: Course[] = [
  {
    id: '1',
    title: 'Business Analytics & Data-Driven Decisions',
    description: 'Master the art of using data to drive business strategy. Learn statistical analysis, data visualization, and predictive modeling to make informed decisions that propel organizations forward.',
    shortDescription: 'Learn to leverage data for strategic business decisions.',
    thumbnail: 'https://d64gsuwffb70l.cloudfront.net/6994de172e0794b70155a75a_1771364002578_3eef68ee.png',
    category: 'Business',
    difficulty: 'Intermediate',
    duration: '8 weeks',
    lessons: 42,
    enrolled: 3847,
    rating: 4.8,
    reviews: 892,
    price: 79.99,
    instructor: {
      name: 'Dr. James Mitchell',
      avatar: 'https://d64gsuwffb70l.cloudfront.net/6994de172e0794b70155a75a_1771364100556_c77d932c.png',
      title: 'Data Science Director',
    },
    tags: ['Analytics', 'Strategy', 'Excel', 'SQL'],
    modules: [
      {
        id: 'm1',
        title: 'Introduction to Business Analytics',
        lessons: [
          { id: 'l1', title: 'What is Business Analytics?', duration: '12:30', type: 'video', completed: false },
          { id: 'l2', title: 'The Analytics Framework', duration: '18:45', type: 'video', completed: false },
          { id: 'l3', title: 'Setting Up Your Environment', duration: '15:20', type: 'video', completed: false },
          { id: 'l4', title: 'Module 1 Quiz', duration: '10:00', type: 'quiz', completed: false },
        ],
      },
      {
        id: 'm2',
        title: 'Data Collection & Cleaning',
        lessons: [
          { id: 'l5', title: 'Data Sources & Types', duration: '20:15', type: 'video', completed: false },
          { id: 'l6', title: 'Cleaning Messy Data', duration: '25:30', type: 'video', completed: false },
          { id: 'l7', title: 'Data Validation Techniques', duration: '16:40', type: 'video', completed: false },
        ],
      },
      {
        id: 'm3',
        title: 'Statistical Analysis',
        lessons: [
          { id: 'l8', title: 'Descriptive Statistics', duration: '22:10', type: 'video', completed: false },
          { id: 'l9', title: 'Inferential Statistics', duration: '28:00', type: 'video', completed: false },
          { id: 'l10', title: 'Regression Analysis', duration: '30:15', type: 'video', completed: false },
        ],
      },
    ],
    isEnrolled: false,
    progress: 0,
  },
  {
    id: '2',
    title: 'Full-Stack Web Development Bootcamp',
    description: 'Build modern web applications from scratch. Cover HTML, CSS, JavaScript, React, Node.js, and databases in this comprehensive bootcamp designed for aspiring developers.',
    shortDescription: 'Complete web development from frontend to backend.',
    thumbnail: 'https://d64gsuwffb70l.cloudfront.net/6994de172e0794b70155a75a_1771364032687_31d034fb.png',
    category: 'Technology',
    difficulty: 'Beginner',
    duration: '12 weeks',
    lessons: 96,
    enrolled: 12453,
    rating: 4.9,
    reviews: 3241,
    price: 129.99,
    instructor: {
      name: 'Sarah Chen',
      avatar: 'https://d64gsuwffb70l.cloudfront.net/6994de172e0794b70155a75a_1771364123803_f375b60e.png',
      title: 'Senior Software Engineer',
    },
    tags: ['React', 'Node.js', 'JavaScript', 'MongoDB'],
    modules: [
      {
        id: 'm1',
        title: 'HTML & CSS Fundamentals',
        lessons: [
          { id: 'l1', title: 'Introduction to HTML', duration: '15:00', type: 'video', completed: false },
          { id: 'l2', title: 'CSS Styling Basics', duration: '20:30', type: 'video', completed: false },
          { id: 'l3', title: 'Responsive Design', duration: '25:15', type: 'video', completed: false },
          { id: 'l4', title: 'Flexbox & Grid', duration: '30:00', type: 'video', completed: false },
        ],
      },
      {
        id: 'm2',
        title: 'JavaScript Essentials',
        lessons: [
          { id: 'l5', title: 'Variables & Data Types', duration: '18:20', type: 'video', completed: false },
          { id: 'l6', title: 'Functions & Scope', duration: '22:45', type: 'video', completed: false },
          { id: 'l7', title: 'DOM Manipulation', duration: '28:10', type: 'video', completed: false },
        ],
      },
      {
        id: 'm3',
        title: 'React Framework',
        lessons: [
          { id: 'l8', title: 'React Components', duration: '20:00', type: 'video', completed: false },
          { id: 'l9', title: 'State & Props', duration: '25:30', type: 'video', completed: false },
          { id: 'l10', title: 'Hooks Deep Dive', duration: '35:00', type: 'video', completed: false },
        ],
      },
    ],
    isEnrolled: false,
    progress: 0,
  },
  {
    id: '3',
    title: 'UX/UI Design Masterclass',
    description: 'Create stunning user experiences from research to high-fidelity prototypes. Master Figma, user research, wireframing, and design systems used by top companies.',
    shortDescription: 'Design beautiful, user-centered digital products.',
    thumbnail: 'https://d64gsuwffb70l.cloudfront.net/6994de172e0794b70155a75a_1771364060667_2aa13694.jpg',
    category: 'Design',
    difficulty: 'Intermediate',
    duration: '10 weeks',
    lessons: 64,
    enrolled: 5621,
    rating: 4.7,
    reviews: 1456,
    price: 89.99,
    instructor: {
      name: 'Emily Rodriguez',
      avatar: 'https://d64gsuwffb70l.cloudfront.net/6994de172e0794b70155a75a_1771364117815_dbf6a3ce.jpg',
      title: 'Lead UX Designer',
    },
    tags: ['Figma', 'UX Research', 'Prototyping', 'Design Systems'],
    modules: [
      {
        id: 'm1',
        title: 'UX Research Foundations',
        lessons: [
          { id: 'l1', title: 'User Research Methods', duration: '20:00', type: 'video', completed: false },
          { id: 'l2', title: 'Creating User Personas', duration: '18:30', type: 'video', completed: false },
          { id: 'l3', title: 'Journey Mapping', duration: '22:15', type: 'video', completed: false },
        ],
      },
      {
        id: 'm2',
        title: 'Visual Design Principles',
        lessons: [
          { id: 'l4', title: 'Color Theory', duration: '16:40', type: 'video', completed: false },
          { id: 'l5', title: 'Typography in UI', duration: '14:20', type: 'video', completed: false },
          { id: 'l6', title: 'Layout & Composition', duration: '20:10', type: 'video', completed: false },
        ],
      },
    ],
    isEnrolled: false,
    progress: 0,
  },
  {
    id: '4',
    title: 'Digital Marketing Strategy',
    description: 'Develop comprehensive digital marketing strategies. From SEO and content marketing to social media and paid advertising, learn to grow brands in the digital age.',
    shortDescription: 'Master modern digital marketing channels.',
    thumbnail: 'https://d64gsuwffb70l.cloudfront.net/6994de172e0794b70155a75a_1771363984082_67322355.jpg',
    category: 'Marketing',
    difficulty: 'Beginner',
    duration: '6 weeks',
    lessons: 38,
    enrolled: 7832,
    rating: 4.6,
    reviews: 2103,
    price: 59.99,
    instructor: {
      name: 'Michael Torres',
      avatar: 'https://d64gsuwffb70l.cloudfront.net/6994de172e0794b70155a75a_1771364090880_07486258.png',
      title: 'Marketing Director',
    },
    tags: ['SEO', 'Social Media', 'Content', 'PPC'],
    modules: [
      {
        id: 'm1',
        title: 'Marketing Fundamentals',
        lessons: [
          { id: 'l1', title: 'Digital Marketing Landscape', duration: '15:30', type: 'video', completed: false },
          { id: 'l2', title: 'Building Your Strategy', duration: '20:00', type: 'video', completed: false },
          { id: 'l3', title: 'Understanding Your Audience', duration: '18:45', type: 'video', completed: false },
        ],
      },
    ],
    isEnrolled: false,
    progress: 0,
  },
  {
    id: '5',
    title: 'Machine Learning & AI Fundamentals',
    description: 'Dive into the world of artificial intelligence. Learn machine learning algorithms, neural networks, and practical AI applications using Python and TensorFlow.',
    shortDescription: 'Build intelligent systems with ML and AI.',
    thumbnail: 'https://d64gsuwffb70l.cloudfront.net/6994de172e0794b70155a75a_1771364022153_b60bb5a4.jpg',
    category: 'Technology',
    difficulty: 'Advanced',
    duration: '14 weeks',
    lessons: 78,
    enrolled: 4215,
    rating: 4.9,
    reviews: 987,
    price: 149.99,
    instructor: {
      name: 'Dr. Aisha Patel',
      avatar: 'https://d64gsuwffb70l.cloudfront.net/6994de172e0794b70155a75a_1771364119119_ead4d6de.jpg',
      title: 'AI Research Scientist',
    },
    tags: ['Python', 'TensorFlow', 'Neural Networks', 'Deep Learning'],
    modules: [
      {
        id: 'm1',
        title: 'Introduction to ML',
        lessons: [
          { id: 'l1', title: 'What is Machine Learning?', duration: '18:00', type: 'video', completed: false },
          { id: 'l2', title: 'Types of Learning', duration: '22:30', type: 'video', completed: false },
          { id: 'l3', title: 'Python for ML Setup', duration: '25:15', type: 'video', completed: false },
        ],
      },
    ],
    isEnrolled: false,
    progress: 0,
  },
  {
    id: '6',
    title: 'Spanish for Beginners: Complete Course',
    description: 'Start speaking Spanish from day one. Interactive lessons cover vocabulary, grammar, pronunciation, and cultural insights for real-world conversation skills.',
    shortDescription: 'Learn conversational Spanish from scratch.',
    thumbnail: 'https://d64gsuwffb70l.cloudfront.net/6994de172e0794b70155a75a_1771363985060_d5e9d03a.jpg',
    category: 'Languages',
    difficulty: 'Beginner',
    duration: '8 weeks',
    lessons: 52,
    enrolled: 9156,
    rating: 4.7,
    reviews: 2876,
    price: 49.99,
    instructor: {
      name: 'Carlos Mendez',
      avatar: 'https://d64gsuwffb70l.cloudfront.net/6994de172e0794b70155a75a_1771364079300_f2dd486d.jpg',
      title: 'Language Educator',
    },
    tags: ['Spanish', 'Vocabulary', 'Grammar', 'Conversation'],
    modules: [
      {
        id: 'm1',
        title: 'Getting Started with Spanish',
        lessons: [
          { id: 'l1', title: 'Basic Greetings', duration: '12:00', type: 'video', completed: false },
          { id: 'l2', title: 'Numbers & Colors', duration: '15:30', type: 'video', completed: false },
          { id: 'l3', title: 'Common Phrases', duration: '18:00', type: 'video', completed: false },
        ],
      },
    ],
    isEnrolled: false,
    progress: 0,
  },
  {
    id: '7',
    title: 'Data Science with Python',
    description: 'Become a data scientist using Python. Cover pandas, NumPy, matplotlib, scikit-learn, and real-world projects to build a professional data science portfolio.',
    shortDescription: 'Master data science tools and techniques.',
    thumbnail: 'https://d64gsuwffb70l.cloudfront.net/6994de172e0794b70155a75a_1771364043201_7c6d898d.png',
    category: 'Science',
    difficulty: 'Intermediate',
    duration: '10 weeks',
    lessons: 68,
    enrolled: 6789,
    rating: 4.8,
    reviews: 1654,
    price: 99.99,
    instructor: {
      name: 'Dr. Robert Kim',
      avatar: 'https://d64gsuwffb70l.cloudfront.net/6994de172e0794b70155a75a_1771364080110_09f0d3f0.jpg',
      title: 'Data Scientist',
    },
    tags: ['Python', 'Pandas', 'Visualization', 'Statistics'],
    modules: [
      {
        id: 'm1',
        title: 'Python for Data Science',
        lessons: [
          { id: 'l1', title: 'Python Refresher', duration: '20:00', type: 'video', completed: false },
          { id: 'l2', title: 'NumPy Fundamentals', duration: '25:30', type: 'video', completed: false },
          { id: 'l3', title: 'Pandas DataFrames', duration: '30:00', type: 'video', completed: false },
        ],
      },
    ],
    isEnrolled: false,
    progress: 0,
  },
  {
    id: '8',
    title: 'Creative Photography & Visual Storytelling',
    description: 'Transform your photography skills. Learn composition, lighting, editing, and storytelling techniques to create compelling visual narratives that captivate audiences.',
    shortDescription: 'Capture stunning photos that tell stories.',
    thumbnail: 'https://d64gsuwffb70l.cloudfront.net/6994de172e0794b70155a75a_1771364057259_8820c199.jpg',
    category: 'Arts',
    difficulty: 'Beginner',
    duration: '6 weeks',
    lessons: 36,
    enrolled: 4532,
    rating: 4.6,
    reviews: 1123,
    price: 69.99,
    instructor: {
      name: 'Lisa Park',
      avatar: 'https://d64gsuwffb70l.cloudfront.net/6994de172e0794b70155a75a_1771364118665_7d7591e7.jpg',
      title: 'Professional Photographer',
    },
    tags: ['Photography', 'Lightroom', 'Composition', 'Editing'],
    modules: [
      {
        id: 'm1',
        title: 'Camera Basics',
        lessons: [
          { id: 'l1', title: 'Understanding Your Camera', duration: '18:00', type: 'video', completed: false },
          { id: 'l2', title: 'Exposure Triangle', duration: '22:30', type: 'video', completed: false },
          { id: 'l3', title: 'Composition Rules', duration: '20:15', type: 'video', completed: false },
        ],
      },
    ],
    isEnrolled: false,
    progress: 0,
  },
  {
    id: '9',
    title: 'Leadership & Management Excellence',
    description: 'Develop essential leadership skills for the modern workplace. Cover team management, communication, conflict resolution, and strategic thinking.',
    shortDescription: 'Lead teams and organizations effectively.',
    thumbnail: 'https://d64gsuwffb70l.cloudfront.net/6994de172e0794b70155a75a_1771363993697_966d34fd.png',
    category: 'Personal Development',
    difficulty: 'Intermediate',
    duration: '8 weeks',
    lessons: 44,
    enrolled: 5678,
    rating: 4.7,
    reviews: 1432,
    price: 74.99,
    instructor: {
      name: 'David Williams',
      avatar: 'https://d64gsuwffb70l.cloudfront.net/6994de172e0794b70155a75a_1771364081877_c512c5df.jpg',
      title: 'Executive Coach',
    },
    tags: ['Leadership', 'Management', 'Communication', 'Strategy'],
    modules: [
      {
        id: 'm1',
        title: 'Leadership Foundations',
        lessons: [
          { id: 'l1', title: 'What Makes a Great Leader?', duration: '16:00', type: 'video', completed: false },
          { id: 'l2', title: 'Leadership Styles', duration: '20:30', type: 'video', completed: false },
          { id: 'l3', title: 'Building Trust', duration: '18:45', type: 'video', completed: false },
        ],
      },
    ],
    isEnrolled: false,
    progress: 0,
  },
  {
    id: '10',
    title: 'Cybersecurity Essentials',
    description: 'Protect digital assets and infrastructure. Learn network security, ethical hacking, cryptography, and incident response in this hands-on cybersecurity course.',
    shortDescription: 'Defend against modern cyber threats.',
    thumbnail: 'https://d64gsuwffb70l.cloudfront.net/6994de172e0794b70155a75a_1771364025104_8e423b71.jpg',
    category: 'Technology',
    difficulty: 'Advanced',
    duration: '12 weeks',
    lessons: 72,
    enrolled: 3456,
    rating: 4.8,
    reviews: 876,
    price: 119.99,
    instructor: {
      name: 'Alex Thompson',
      avatar: 'https://d64gsuwffb70l.cloudfront.net/6994de172e0794b70155a75a_1771364093337_b4f7fb7d.png',
      title: 'Security Architect',
    },
    tags: ['Security', 'Ethical Hacking', 'Networks', 'Cryptography'],
    modules: [
      {
        id: 'm1',
        title: 'Security Fundamentals',
        lessons: [
          { id: 'l1', title: 'Cybersecurity Landscape', duration: '15:00', type: 'video', completed: false },
          { id: 'l2', title: 'Threat Modeling', duration: '22:00', type: 'video', completed: false },
          { id: 'l3', title: 'Security Frameworks', duration: '20:30', type: 'video', completed: false },
        ],
      },
    ],
    isEnrolled: false,
    progress: 0,
  },
  {
    id: '11',
    title: 'Graphic Design with Adobe Creative Suite',
    description: 'Master Photoshop, Illustrator, and InDesign. Create professional logos, branding materials, social media graphics, and print designs.',
    shortDescription: 'Create professional designs with Adobe tools.',
    thumbnail: 'https://d64gsuwffb70l.cloudfront.net/6994de172e0794b70155a75a_1771364059523_2d437630.jpg',
    category: 'Design',
    difficulty: 'Beginner',
    duration: '8 weeks',
    lessons: 56,
    enrolled: 6234,
    rating: 4.5,
    reviews: 1876,
    price: 84.99,
    instructor: {
      name: 'Nina Kowalski',
      avatar: 'https://d64gsuwffb70l.cloudfront.net/6994de172e0794b70155a75a_1771364134232_7bec914b.png',
      title: 'Creative Director',
    },
    tags: ['Photoshop', 'Illustrator', 'Branding', 'Print'],
    modules: [
      {
        id: 'm1',
        title: 'Photoshop Essentials',
        lessons: [
          { id: 'l1', title: 'Interface Overview', duration: '14:00', type: 'video', completed: false },
          { id: 'l2', title: 'Layers & Masks', duration: '22:30', type: 'video', completed: false },
          { id: 'l3', title: 'Photo Retouching', duration: '28:00', type: 'video', completed: false },
        ],
      },
    ],
    isEnrolled: false,
    progress: 0,
  },
  {
    id: '12',
    title: 'Content Marketing & Copywriting',
    description: 'Write compelling content that converts. Master copywriting formulas, content strategy, blogging, email marketing, and SEO writing techniques.',
    shortDescription: 'Write content that engages and converts.',
    thumbnail: 'https://d64gsuwffb70l.cloudfront.net/6994de172e0794b70155a75a_1771364060389_b329c937.jpg',
    category: 'Marketing',
    difficulty: 'Intermediate',
    duration: '6 weeks',
    lessons: 34,
    enrolled: 4123,
    rating: 4.6,
    reviews: 987,
    price: 64.99,
    instructor: {
      name: 'Rachel Green',
      avatar: 'https://d64gsuwffb70l.cloudfront.net/6994de172e0794b70155a75a_1771364184324_7b742658.png',
      title: 'Content Strategist',
    },
    tags: ['Copywriting', 'SEO', 'Blogging', 'Email Marketing'],
    modules: [
      {
        id: 'm1',
        title: 'Copywriting Fundamentals',
        lessons: [
          { id: 'l1', title: 'The Art of Persuasion', duration: '16:00', type: 'video', completed: false },
          { id: 'l2', title: 'Headlines That Hook', duration: '14:30', type: 'video', completed: false },
          { id: 'l3', title: 'Writing for the Web', duration: '20:00', type: 'video', completed: false },
        ],
      },
    ],
    isEnrolled: false,
    progress: 0,
  },
];
