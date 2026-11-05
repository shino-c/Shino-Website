/*
  ============================================================
  EDIT THIS FILE to update your contact links and projects.
  The page builds itself from the data below.
  ============================================================
*/

// ---------- Contact links ----------
// Leave a value as "" to hide that link.
const PROFILE = {
  email: "chowshino@gmail.com",
  github: "https://github.com/shino-c",
  linkedin: "",                 // TODO: paste your LinkedIn URL, e.g. "https://www.linkedin.com/in/your-name"
  whatsapp: "601159147641"      // digits only, with country code. Set to "" to hide.
};

// ---------- Projects ----------
// categories: "Web", "Mobile", "AI", "Game", "Desktop"  (used by the filter buttons)
// links: leave a link out (or set it to "") to hide it.
const PROJECTS = [
  {
    title: "SmartClass",
    subtitle: "Smart classroom management system",
    type: "Final Year Project",
    period: "Ongoing",
    categories: ["Web", "Mobile", "AI"],
    description:
      "A multi-platform classroom system with a web portal for administrators and web and mobile apps for lecturers and students.",
    points: [
      "Role-based access control across admin, lecturer and student roles.",
      "AI-powered workflows: attendance with facial recognition, online quizzes, classroom interaction, learning analytics and personalised recommendations."
    ],
    tech: ["React", "Vite", "React Native", "Expo", "FastAPI", "PostgreSQL", "InsightFace", "Docker", "OpenAI"],
    links: {
      code: "https://github.com/YewSing/SmartClass"
    }
  },
  {
    title: "Wick",
    subtitle: "Stress & workload manager (mobile app)",
    type: "Hackathon",
    period: "Sept 2026",
    categories: ["Mobile", "AI"],
    description:
      "A cross-platform app that combines calendar and task workload, camera-based physiological signals and self-reported check-ins to give students workload and stress insights.",
    points: [
      "Workload categorisation and capacity scoring, AI-assisted task quick-add and load-balancing recommendations.",
      "Recovery planning and social accountability features, with on-device rPPG signal processing explored."
    ],
    tech: ["React Native", "Expo", "TypeScript", "Supabase", "OpenAI"],
    links: { code: "https://github.com/shino-c/Wick" }
  },
  {
    title: "Echoes of the Chancellery",
    subtitle: "2D platformer game",
    type: "Academic Assignment",
    period: "Jun 2026",
    categories: ["Game"],
    description:
      "A 2D platformer built in Unity 6 and set on the Universiti Malaya campus. I’m the Lead Artist, responsible for the game’s visual direction and pixel art.",
    points: [],
    tech: ["Unity", "C#","Pixel art"],
    links: {code:"https://github.com/Tjxiang1/GameDev"}
  },
  {
    title: "FloodSense",
    subtitle: "AI-powered flood monitoring and emergency response",
    type: "Hackathon",
    period: "Feb 2026",
    categories: ["Mobile", "AI"],
    description:
      "A mobile app that turns rainfall and geographical data into district-level flood alerts, with a shelter finder and AI-prioritised community reporting.",
    points: [
      "My part: the community map that shows flood reports around the user in real time.",
      "Team stack includes BigQuery ML for risk prediction and Gemini for triaging reports."
    ],
    tech: ["Flutter", "Firebase", "BigQuery ML", "Gemini", "Google Maps API"],
    links: { code: "https://github.com/shino-c/KitaHack_BalikKampung" }
  },
  {
    title: "MEXY",
    subtitle: "AI assistant for Grab merchant-partners",
    type: "Hackathon",
    period: "",
    categories: ["Web", "AI"],
    description:
      "A web-based chat assistant that gives Grab merchant-partners business insights and personalised guidance using generative AI.",
    points: [],
    tech: ["JavaScript", "Node.js", "OpenAI", "Figma"],
    links: {
      code: "https://github.com/shino-c/MEX-Assistant"
    }
  },
  {
    title: "FitWell",
    subtitle: "Health and fitness tracking platform",
    type: "Academic assignment",
    period: "July 2025",
    categories: ["Web"],
    description:
      "A full-stack web app for logging workouts, planning meals and tracking progress with charts and personalised reminders.",
    points: [
      "Secure authentication with bcrypt hashing and email-based password reset.",
      "Workout and nutrition dashboards with Chart.js, plus meal suggestions from the Spoonacular API."
    ],
    tech: ["Node.js", "Express.js", "MongoDB", "Bootstrap", "Chart.js"],
    links: { code: "https://github.com/shino-c/FitWell" }
  },
  {
    title: "PathSeeker",
    subtitle: "Job recruitment and well-being platform",
    type: "Academic assignment",
    period: "Jan 2025",
    categories: ["Mobile"],
    description:
      "An Android recruitment app that connects job seekers with recruiters through personalised job discovery and location-aware features.",
    points: [
      "Firebase-backed data management and Google Maps integration for location-based job discovery."
    ],
    tech: ["Android Studio", "Java", "Firebase", "Google Maps API"],
    links: { code: "https://github.com/shino-c/Path-Seeker" }
  },
  {
    title: "Hacking The Future",
    subtitle: "Gamified STEM learning platform",
    type: "Academic assignment",
    period: "July 2024",
    categories: ["Desktop"],
    description:
      "A JavaFX desktop app for students, parents and educators with STEM quizzes, event registration, discussion forums, friendships and leaderboards.",
    points: [
      "Role-based features, event scheduling with clash detection and parent-child accounts.",
      "Reward-point tracking, SHA-3 password hashing and email notifications."
    ],
    tech: ["Java", "JavaFX", "SQLite"],
    links: { code: "https://github.com/shino-c/Hacking-The-Future" }
  },
  {
    title: "Code For Nature",
    subtitle: "Nature awareness and engagement app",
    type: "Academic assignment",
    period: "Jan 2024",
    categories: ["Desktop"],
    description:
      "A JavaFX app that teaches users about environmental issues through daily check-ins, trivia and nature news, with a points shop and donations to environmental NGOs.",
    points: [
      "Email OTP verification and SHA-256 password hashing."
    ],
    tech: ["Java", "JavaFX", "Microsoft Access", "Azure Email API"],
    links: { code: "https://github.com/shino-c/CODE-FOR-NATURE" }
  }
];

// How many projects to show before the "Show all" button
const PROJECTS_VISIBLE = 6;
