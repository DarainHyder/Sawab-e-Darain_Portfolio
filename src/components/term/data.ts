// covers: hand-built vector art (`cover`) or a real screenshot of the live deployment (`image`)
import type { CoverKey } from "./Covers";
import projSpace from "@/assets/projects/shot_space.webp";
import projHeart from "@/assets/projects/shot_heart.webp";
import projPuzzle from "@/assets/projects/shot_puzzle.webp";

export const LINKS = {
  github: "https://github.com/DarainHyder",
  linkedin: "https://www.linkedin.com/in/syed-darain-hyder-kazmi",
  email: "darainhyder21@gmail.com",
  phone: "+923433055357",
  location: "Islamabad, Pakistan",
  resume: "/DarainHyder_AI-ML_Resume.pdf",
};

/** Who this site is about. Shared by the page, the structured data and llms.txt. */
export const PROFILE = {
  name: "Syed Darain Hyder Kazmi",
  shortName: "Darain Hyder",
  handle: "sawabedarain",
  title: "AI/ML Engineer",
  site: "https://darainhyder.netlify.app",
  summary:
    "AI/ML engineer in Islamabad, Pakistan, building production machine learning systems: computer vision models served as real-time APIs, NLP and LLM applications, and data pipelines for multi-client analytics.",
  employer: "Syvyo",
  education: {
    degree: "Bachelor of Computer and Information Sciences",
    school: "Pakistan Institute of Engineering and Applied Sciences (PIEAS)",
    city: "Islamabad",
    years: "2023-2027",
  },
  languages: ["English", "Urdu"],
  leadership: [
    "President, PIEAS AI Society (2025-26, second term 2026-27)",
    "Outreach Co-Lead, GDGoC PIEAS",
    "General Secretary, PIEAS Blood Society",
    "Graphic Designer, AWS Cloud Club",
  ],
};

export const SECTIONS = [
  { id: "about", label: "about" },
  { id: "stack", label: "stack" },
  { id: "work", label: "work" },
  { id: "projects", label: "projects" },
  { id: "reviews", label: "reviews" },
  { id: "certs", label: "certs" },
  { id: "contact", label: "contact" },
] as const;

export const ABOUT = {
  intro:
    "I'm an AI/ML engineer based in Islamabad. I design, train and deploy machine learning systems, from computer vision models served as real-time APIs to the data pipelines behind multi-client analytics products. I currently work part-time as an AI Engineer at Syvyo while completing my degree in Computer and Information Sciences at PIEAS.",
  blocks: [
    [
      "currently",
      "At Syvyo I own the ML lifecycle for computer vision and predictive models: preprocessing, feature engineering, tuning, evaluation and the FastAPI services that serve them for real-time inference. Before that, at Data Pilot, I built and maintained ETL/ELT pipelines for Datatram, a multi-client social media analytics dashboard, with a focus on data quality and schema validation.",
    ],
    [
      "how i work",
      "I treat a model as one component of a larger system. Training it is only part of the job. The rest is data validation, careful evaluation, packaging and serving, so that it behaves in production the way it did in testing. Most of what I build uses Python, PyTorch and Scikit-Learn, served through FastAPI and packaged with Docker.",
    ],
    [
      "outside work",
      "I lead the PIEAS AI Society as President, a role I held for the 2025-26 term and now continue in for a second consecutive term in 2026-27.",
    ],
  ] as [string, string][],
  quote: [
    "The hardest part of machine learning isn't the math, it's ",
    "writing the infrastructure",
    " to serve those models reliably to real users.",
  ],
  meta: [
    ["role", '"AI Engineer @ Syvyo"'],
    ["education", '"BCIS @ PIEAS, 2023-2027"'],
    ["focus", '["Computer Vision", "NLP", "MLOps"]'],
    ["location", '"Islamabad, PK"'],
    ["status", '"open to opportunities"'],
  ] as [string, string][],
};

export const STACK: { group: string; items: { name: string; level: number }[] }[] = [
  {
    group: "core",
    items: [
      { name: "python", level: 92 },
      { name: "oop-dsa", level: 88 },
      { name: "sql", level: 82 },
    ],
  },
  {
    group: "ml",
    items: [
      { name: "machine-learning", level: 90 },
      { name: "scikit-learn", level: 86 },
      { name: "hugging-face", level: 85 },
      { name: "deep-learning", level: 75 },
      { name: "nlp", level: 75 },
      { name: "pytorch", level: 70 },
      { name: "computer-vision", level: 30 },
    ],
  },
  {
    group: "data",
    items: [
      { name: "pandas-numpy", level: 90 },
      { name: "feature-eng", level: 88 },
      { name: "visualization", level: 85 },
    ],
  },
  {
    group: "ship",
    items: [
      { name: "streamlit", level: 88 },
      { name: "git-github", level: 88 },
      { name: "fastapi", level: 86 },
      { name: "linux", level: 80 },
    ],
  },
];

export const TOOLS = ["docker", "aws", "power-bi", "nltk", "matplotlib", "opencv", "etl/elt"];

export const WORK = [
  {
    role: "AI Engineer (Part-time, Contract)",
    company: "Syvyo",
    location: "Remote",
    period: "Sep 2026 - present",
    duration: "current",
    current: true,
    description:
      "Design, train and deploy production computer vision and predictive ML models in PyTorch, served through FastAPI REST APIs as containerized microservices for real-time inference. Own the ML lifecycle end to end: data preprocessing, feature engineering, tuning and evaluation.",
  },
  {
    role: "AI Engineer Intern",
    company: "Data Pilot",
    location: "Islamabad / Remote",
    period: "Apr 2026 - Jun 2026",
    duration: "~10w",
    description:
      "Built and maintained scalable AI/ML data pipelines for Datatram, a multi-client social media dashboard. Implemented ETL/ELT workflows for real-time processing and owned data quality assurance and schema validation across client environments.",
  },
  {
    role: "ML Trainee (Contract)",
    company: "Syvyo",
    location: "Remote",
    period: "Sep 2025 - Feb 2026",
    duration: "6mo",
    description:
      "Selected for a contract position following a successful internship. Implemented machine learning solutions and contributed to production-grade AI models.",
  },
  {
    role: "Data Science Fellow",
    company: "Buildables",
    location: "Remote",
    period: "Sep 2025 - Nov 2025",
    duration: "3mo",
    description:
      "Intensive fellowship on end-to-end data science workflows, model development and deployment strategies.",
  },
  {
    role: "ML/AI Intern",
    company: "Syvyo",
    location: "Remote",
    period: "Jun 2025 - Sep 2025",
    duration: "4mo",
    description:
      "Developed computer vision models and predictive ML pipelines in PyTorch. Served models through FastAPI REST APIs and improved performance with feature engineering and hyperparameter tuning.",
  },
];

export const PROJECTS = [
  {
    slug: "adaptive-e-learning",
    title: "Adaptive Multi-Agent E-Learning System",
    description:
      "Multi-agent AI system with reinforcement-based feedback loops that personalizes learning paths and adjusts content difficulty dynamically.",
    tech: ["multi-agent", "rl", "nlp", "classification"],
    cover: "elearning",
    code: "https://github.com/DarainHyder",
    live: "https://adaptive-e-learning-system.vercel.app/",
  },
  {
    slug: "biomed-research-helper",
    title: "BioMed Research Helper",
    description:
      "Biomedical research assistant combining PubMed API mining, semantic search and LLM summarization of medical literature.",
    tech: ["python", "fastapi", "streamlit", "llm", "semantic-search"],
    cover: "biomed",
    code: "https://github.com/DarainHyder/BioMed_ResearchHelper",
    live: "https://bio-med-research-helper-yzop.vercel.app/",
  },
  {
    slug: "image-quality-assessment",
    title: "Image Quality Assessment",
    description:
      "PyTorch pipeline for blind image quality scoring using CNN feature extraction, deployed as a FastAPI microservice in Docker.",
    tech: ["pytorch", "fastapi", "docker", "cnn", "cv"],
    cover: "iqa",
    code: "https://github.com/DarainHyder/Image_Quality_Assessment",
    live: "https://lumina-iqa.vercel.app/",
  },
  {
    slug: "nasa-space-app",
    title: "NASA Space App",
    description:
      "Built for the NASA Space Apps Challenge: an ML app that flags likely exoplanet candidates in NASA mission data using XGBoost and decision trees, with batch CSV analysis and single-candidate scoring.",
    tech: ["python", "xgboost", "ml", "data-viz"],
    image: projSpace,
    code: "https://github.com/DarainHyder/NASA-Space-App",
    live: "https://nasa-space-app-nine.vercel.app/",
  },
  {
    slug: "heart-attack-risk",
    title: "Heart Attack Risk Analysis",
    description:
      "Probability & statistics applied to heart attack risk: data cleaning, hypothesis testing and a trained classification model.",
    tech: ["python", "statistics", "ml", "jupyter"],
    image: projHeart,
    code: "https://github.com/DarainHyder/Heart_Attack_risk-analysis-and-Trainig-Model",
    live: "https://myocardial-risk-index.vercel.app/",
  },
  {
    slug: "word-puzzle-solver",
    title: "Word Puzzle Solver",
    description:
      "Solver for a range of word puzzles using pattern recognition and search optimization for fast resolution.",
    tech: ["python", "algorithms", "optimization"],
    image: projPuzzle,
    code: "https://github.com/DarainHyder/Word_Puzzles_Solver",
    live: "https://word-puzzles-solver.vercel.app/",
  },
] as { slug: string; title: string; description: string; tech: string[]; cover?: CoverKey; image?: string; code: string; live: string }[];

export const REVIEWS = [
  {
    name: "Dr. Areeba Nadeem",
    role: "Research Director, BioMed Research Institute",
    project: "biomed-research-helper",
    text: "The BioMed Research Helper genuinely streamlined our entire research workflow. The NLP features work flawlessly, and it actually feels built for real medical teams, not just for show.",
  },
  {
    name: "Hassan Javed",
    role: "Lead Data Scientist, TechVision Analytics",
    project: "image-quality-assessment",
    text: "The Image Quality Assessment tool turned out way better than we expected. Fast, precise, and technically sound. You can tell a lot of time went into optimizing it for real-world use.",
  },
  {
    name: "Uzair Ahmed",
    role: "Healthcare Analytics Manager",
    project: "heart-attack-risk",
    text: "The statistical modeling behind the heart attack prediction system was spot on. From preprocessing to the final probability outputs, it showed real understanding of the domain.",
  },
  {
    name: "Mahnoor Khalid",
    role: "CTO, AI Innovations Lab",
    project: "ai-podcast-generator",
    text: "The AI Podcast Generator felt like something out of a startup pitch deck in the best way. Smooth voice synthesis, great topic flow and a really natural delivery.",
  },
  {
    name: "Fatima Zahra",
    role: "NASA Space Apps Challenge Mentor",
    project: "nasa-space-app",
    text: "One of the most creative entries we saw. The way complex space data was simplified and presented made it stand out instantly. Smart, visually engaging, full of curiosity.",
  },
];

export const CERTS = [
  {
    title: "Associate Data Scientist in Python",
    issuer: "DataCamp",
    year: "2025",
    level: "advanced",
    skills: ["python", "ml", "statistics", "scikit-learn"],
    url: "https://www.datacamp.com/completed/statement-of-accomplishment/track/2d7a1c36c792f5ed56094e402144ec75db634915",
  },
  {
    title: "Data Analyst with Python",
    issuer: "DataCamp",
    year: "2025",
    level: "advanced",
    skills: ["pandas", "matplotlib", "seaborn", "analysis"],
    url: "https://www.datacamp.com/completed/statement-of-accomplishment/track/60d23c4b115258dd770d8e0ca38bac2cec6b59c0",
  },
  {
    title: "Supervised Machine Learning",
    issuer: "DataCamp",
    year: "2025",
    level: "advanced",
    skills: ["supervised", "training", "evaluation"],
    url: "https://www.datacamp.com/completed/statement-of-accomplishment/track/2d7a1c36c792f5ed56094e402144ec75db634915",
  },
  {
    title: "Machine Learning with Tree-Based Models",
    issuer: "DataCamp",
    year: "2025",
    level: "advanced",
    skills: ["random-forest", "boosting", "xgboost"],
  },
  {
    title: "Unsupervised Learning in Python",
    issuer: "DataCamp",
    year: "2025",
    level: "intermediate",
    skills: ["clustering", "pca", "k-means"],
  },
  {
    title: "Hypothesis Testing in Python",
    issuer: "DataCamp",
    year: "2025",
    level: "intermediate",
    skills: ["t-tests", "anova", "inference"],
  },
] as { title: string; issuer: string; year: string; level: string; skills: string[]; url?: string }[];
