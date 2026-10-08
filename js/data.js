/**
 * Personal Portfolio Data Architecture
 * Centralized configuration for candidate profile, skills, projects, education, and optional sections.
 * Easily replace placeholders here without touching HTML or CSS layout markup.
 */

const profileData = {
  name: "Sinchana HS",
  logoText: "Sinchana HS",
  eyebrow: "2026 Information Science & Engineering Graduate",
  title: "Building practical software with Java, SQL & modern web technologies.",
  tagline: "Software Development • Java • SQL • Core CS • Web Technologies",
  heroHeading: "Ready to Build & Grow.",
  heroHighlights: [
    "2026 Information Science & Engineering Graduate",
    "Hands-on experience through 3 development projects",
    "Strong foundation in Java, SQL, OOP, DSA & DBMS",
    "Looking forward to contributing to real-world software solutions"
  ],
  aboutBio: "I am a 2026 Information Science and Engineering graduate with a strong foundation in Java, SQL, database management, and core computer science fundamentals. Passionate about software development, I focus on writing clean, object-oriented code, designing efficient relational databases, and building practical applications that solve real-world problems. I am actively seeking fresher software developer opportunities to apply my technical knowledge, problem-solving skills, and commitment to continuous learning in a professional engineering team.",
  phone: "+91 70195 04730", // [Phone Number] placeholder
  email: "sinchanasinchana675@gmail.com", // [Email] placeholder
  location: "Bengaluru", // [Your Location] placeholder
  githubUrl: "https://github.com/sinchana-14", // [GitHub URL] placeholder
  linkedinUrl: "https://www.linkedin.com/in/sinchana-h-s-128a02301/", // [LinkedIn URL] placeholder
  resumePath: "./resume/SINCHANA'S-RESUME.pdf", // [Resume Path]
  avatarUrl: "./assets/images/IMG-20260730-WA0014.jpg"
};

const skillsData = [
  {
    category: "Programming",
    icon: "code",
    skills: [
      { name: "Java", level: "Core / OOP / Collections" },
      { name: "SQL", level: "Queries / Joins / Optimization" },
      { name: "Python", level: "Basics" }
    ]
  },
  {
    category: "Web Technologies",
    icon: "globe",
    skills: [
      { name: "HTML5", level: "Semantic Markup" },
      { name: "CSS3", level: "Responsive & Modern UI" }
    ]
  },
  {
    category: "Database",
    icon: "database",
    skills: [
      { name: "MySQL", level: "Relational Modeling / Transactions" }
    ]
  },
  {
    category: "Core Computer Science",
    icon: "cpu",
    skills: [
      { name: "Object-Oriented Programming (OOP)" },
      { name: "Data Structures & Algorithms (DSA)" },
      { name: "Database Management Systems (DBMS)" },
      { name: "Operating Systems (OS)" },
      { name: "Computer Networks (CN)" },
      { name: "Software Engineering" }
    ]
  },
  {
    category: "Tools & IDES",
    icon: "wrench",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Postman" },
      { name: "VS Code" },
      { name: "Eclipse" }
    ]
  }
];

const projectsData = [
  {
    id: "fe-1",
    title: "Obys Agency Clone",
    category: "Frontend Development Project",
    description: "A responsive recreation of the Obys Agency website built to explore modern frontend design, smooth scrolling, and interactive web animations.",

    video: "https://res.cloudinary.com/aebugfd3/video/upload/v1787036303/Untitled_2.mov",
    githubUrl: "https://github.com/sinchana-14/Obys_Agency_Clone-.git",
    liveUrl: "https://sinchana-14.github.io/Obys_Agency_Clone-/"
  },
  {
    id: "fe-2",
    title: "Hotel Odisej Website Clone",
    category: "Frontend Development Project",
    description: "A responsive recreation of the Hotel Odisej website featuring modern layouts, smooth scrolling, immersive GSAP animations, and a responsive design optimized for different screen sizes.",

    video: "https://res.cloudinary.com/aebugfd3/video/upload/v1787044660/Untitled0401.mov",
    githubUrl: "https://github.com/sinchana-14/Hotel-Website.git",
    liveUrl: "https://sinchana-14.github.io/Hotel-Website/"
  },
  {
    id: "fe-3",
    title: "Hire Sight",
    category: "AI-Powered Resume Analyzer & Interview Assistant",
    description: "An AI-powered career preparation platform that brings personalized learning, aptitude practice, career guidance, and mock interview experiences together in a single web application.",

    video: "https://res.cloudinary.com/aebugfd3/video/upload/v1787043953/Untitled0301.mp4",
    githubUrl: "https://github.com/sinchana-14/Career_assistance.git",
    liveUrl: ""
  }
];

const educationData = [
  {
    degree: "Bachelor of Engineering (B.E.)",
    branch: "Information Science and Engineering",
    institution: "Adichunchanagiri Institute of Technology, Chikkamagaluru, Karnataka",
    duration: "Aug 2022 – May 2026",
    status: "Graduated",
    cgpa: "CGPA: 8.75 / 10",
    coursework: [
      "Data Structures & Algorithms",
      "Database Management Systems (DBMS)",
      "Object-Oriented Programming (OOP)",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering"
    ]
  }
];

const certificationsData = [
  {
    id: "cert-hackathon",
    title: "Smart India Internal Hackathon 2025 (SMART HACK)",
    issuer: "Ministry of Education / AICTE / AIT Chikkamagaluru",
    date: "September 17, 2025",
    category: "Hackathon Participation",
    badgeColor: "orange",
    description: "Participated in the Smart India Internal Hackathon (SMART HACK-2025) with notable project contribution under the theme 'Fitness & Sports'.",
    skills: ["Hackathon", "Product Innovation", "Team Collaboration", "Problem Solving"],
    fileUrl: "./assets/certificates/Sinchana H S Hackathon - Certificate.pdf"
  },
  {
    id: "cert-ai-cloud",
    title: "AI with Cloud Computing (90-Day Internship)",
    issuer: "SuprMentr Technologies (VTU Belagavi Partner)",
    date: "Feb 1 – May 1, 2026",
    category: "AI & Cloud Internship",
    credentialId: "SM26VAICC0228",
    description: "Completed 90-day internship in Artificial Intelligence with Cloud Computing. Successfully submitted capstone project 'Iris Flower Classification'.",
    skills: ["Artificial Intelligence", "Cloud Computing", "Machine Learning", "Python"],
    fileUrl: "./assets/certificates/SuprMentr Intern Certificate.pdf"
  },
  {
    id: "cert-palle",
    title: "Java Full Stack Developer Internship",
    issuer: "Palle Technologies (Palle Consulting Services)",
    date: "May 2026",
    category: "Industrial Internship",
    credentialId: "PCS-0084",
    description: "Completed industrial internship in Java Full Stack Development under Industry Mentor Ms. Rakshitha R. (VTU Industry Partner), building modular Java backend logic, relational database tables, and responsive web components.",
    skills: ["Java", "SQL", "OOP", "DBMS", "Full Stack Development"],
    fileUrl: "./assets/certificates/Palle-Consulting-Internship-Certificate.jpg"
  },
  {
    id: "cert-google-genai",
    title: "Introduction to Generative AI Studio",
    issuer: "Google Cloud (via Simplilearn SkillUp)",
    date: "June 23, 2026",
    category: "Generative AI",
    credentialId: "10382528",
    description: "Completed Google Cloud training on Generative AI Studio, exploring model prototyping, prompt design, and cloud AI integration.",
    skills: ["Google Cloud", "Generative AI Studio", "Prompt Design", "Cloud AI"],
    fileUrl: "./assets/certificates/Google Certificate .pdf"
  },
  {
    id: "cert-claude-101",
    title: "Claude 101",
    issuer: "Anthropic",
    date: "2025",
    category: "Generative AI",
    description: "Foundational certification on Anthropic's Claude AI model family architecture, prompt crafting techniques, and conversational AI paradigms.",
    skills: ["Claude AI", "Prompt Engineering", "LLMs", "AI Workflows"],
    fileUrl: "./assets/certificates/Claude 101 Certificate .pdf"
  },
  {
    id: "cert-ai-fluency",
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    date: "2025",
    category: "Generative AI",
    description: "Comprehensive grounding in artificial intelligence fluency, cognitive frameworks, ethical AI navigation, and practical literacy.",
    skills: ["AI Literacy", "Cognitive Frameworks", "AI Ethics"],
    fileUrl: "./assets/certificates/Claude Ai Fluency Certificate .pdf"
  },
  {
    id: "cert-deloitte",
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte (via Forage)",
    date: "September 8, 2025",
    category: "Job Simulation",
    credentialId: "NcZqwuCgEZBg2gLhT",
    description: "Completed real-world corporate tasks in data analysis, forensic technology investigations, and enterprise data visualization for Deloitte.",
    skills: ["Data Analytics", "Forensic Tech", "Data Storytelling"],
    fileUrl: "./assets/certificates/Deloitte-Completion-Certificate.pdf"
  },
  {
    id: "cert-codsoft",
    title: "Java Programming Virtual Internship",
    issuer: "CodSoft",
    date: "August 1 – 31, 2025",
    category: "Virtual Internship",
    credentialId: "ad5e811",
    description: "4-week hands-on virtual development program implementing modular Java applications, OOP concepts, and practical problem-solving tasks.",
    skills: ["Java", "OOP", "Software Development", "Problem Solving"],
    fileUrl: "./assets/certificates/CodSoft Certificate.pdf"
  },
  {
    id: "cert-skillcraft",
    title: "Web Development Internship",
    issuer: "SkillCraft Technology",
    date: "September 1 – 30, 2025",
    category: "Virtual Internship",
    credentialId: "SCT/SEP25/1824",
    description: "Completed 1-month internship program in Web Development, creating responsive web interfaces, DOM components, and modern CSS layouts.",
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    fileUrl: "./assets/certificates/SkillCraft Certificate.pdf"
  },
  {
    id: "cert-python-ait",
    title: "Python For Data Science",
    issuer: "Adichunchanagiri Institute of Technology (AIT)",
    date: "February 3 – 7, 2025",
    category: "Academic Add-On Course",
    description: "5-day intensive Add-On course organized by the Dept. of IS&E, covering core Python fundamentals, data structures, and Data Science methodologies.",
    skills: ["Python", "Data Science", "Data Analysis", "Data Manipulation"],
    fileUrl: "./assets/certificates/Python AIT Certificate.pdf"
  }
];

const optionalData = {
  experience: [],
  certifications: [],
  achievements: [],
  codingProfiles: [
    {
      platform: "GitHub",
      username: "sinchana-14",
      url: "https://github.com/sinchana-14",
      icon: "github",
      featured: true
    }
  ]
};

// Export objects to global scope for main.js consumption
window.portfolioConfig = {
  profile: profileData,
  skills: skillsData,
  projects: projectsData,
  education: educationData,
  certifications: certificationsData,
  optional: optionalData
};
