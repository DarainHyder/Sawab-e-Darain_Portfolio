// covers: hand-built vector art (`cover`) or a real screenshot of the live deployment (`image`)
import type { CoverKey } from "./Covers";
import projSpace from "@/assets/projects/shot_space.webp";
import projPuzzle from "@/assets/projects/shot_puzzle.webp";
import projKisaanKhata from "@/assets/projects/shot_kisaankhata.webp";
import certHackathon from "@/assets/certs/AI-HackathonCertificate.pdf";
import certGenAI from "@/assets/certs/GenAI_LLMs.pdf";
import certMlops from "@/assets/certs/mlops.pdf";
import certAws from "@/assets/certs/aws.pdf";
import certContainers from "@/assets/certs/containerization.pdf";
import certDeepLearning from "@/assets/certs/dl.pdf";
import certSupervised from "@/assets/certs/supervisedml.pdf";
import certDataScientist from "@/assets/certs/datascience.pdf";
import certDataAnalyst from "@/assets/certs/dataanalyst.pdf";

export const LINKS = {
  github: "https://github.com/DarainHyder",
  linkedin: "https://www.linkedin.com/in/syed-darain-hyder-kazmi",
  fiverr: "https://www.fiverr.com/darainhyder",
  fiverrGig: "https://www.fiverr.com/s/mmmDB7z",
  upwork: "https://www.upwork.com/freelancers/~016542608fe0bf33cf",
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
    "AI/ML engineer in Islamabad, Pakistan, building agentic AI systems and multi-agent LLM applications with LangGraph and LangChain, retrieval and semantic search, and production computer vision models served through FastAPI.",
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
  { id: "hackathon", label: "hackathon" },
  { id: "reviews", label: "reviews" },
  { id: "certs", label: "certs" },
  { id: "contact", label: "contact" },
] as const;

export const ABOUT = {
  intro:
    "I'm an AI engineer in Islamabad building intelligent systems end to end: agentic AI and multi-agent workflows, LLM-powered applications, retrieval and semantic search, and production computer vision. I take ideas from prototype to deployed product, with the evaluation, APIs and infrastructure that keep them reliable for real users. I currently work part-time as an AI Engineer at Syvyo while completing my degree in Computer and Information Sciences at PIEAS.",
  blocks: [
    [
      "what i build",
      "AI agents that reason, call tools and coordinate with each other, orchestrated with LangGraph and LangChain; RAG and hybrid search over large knowledge bases; and deep learning models for vision and language. Recent work includes a five-agent LangGraph tutor driven by its own knowledge-tracing model, a hybrid search engine over 14,693 PubMed studies at 96.7% Recall@1, and an image quality model reaching 0.940 SRCC on KonIQ-10k.",
    ],
    [
      "currently",
      "At Syvyo I own the ML lifecycle for computer vision and predictive models, from data preprocessing and tuning to FastAPI microservices for real-time inference. Before that, at Data Pilot, I built ETL/ELT pipelines for Datatram, a multi-client social media analytics dashboard. Whatever I ship, I optimise for production: honest evaluation, clean data and lean serving with ONNX and Docker.",
    ],
    [
      "outside work",
      "I lead the PIEAS AI Society as President, a role I held for the 2025-26 term and now continue in for a second consecutive term in 2026-27.",
    ],
  ] as [string, string][],
  quote: [
    "The hardest part of AI isn't the model, it's ",
    "engineering the system around it",
    " so it holds up for real users.",
  ],
  meta: [
    ["role", '"AI Engineer @ Syvyo"'],
    ["focus", '["Agentic AI", "LLMs", "Computer Vision"]'],
    ["stack", '["LangGraph", "PyTorch", "FastAPI"]'],
    ["education", '"BCIS @ PIEAS, 2023-2027"'],
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

const KISAANKHATA = {
  live: "https://kisaankhata.vercel.app/",
  code: "https://github.com/DarainHyder/KisaanKhata",
};

export const PROJECTS = [
  {
    slug: "adaptive-e-learning",
    title: "Adaptive Multi-Agent E-Learning System",
    description:
      "A LangGraph multi-agent tutor with five agents and a custom transformer knowledge-tracing model (0.693 AUC, beating DKT and BKT) served via ONNX. A Thompson-sampling bandit adapts teaching strategy and quiz difficulty in real time.",
    tech: ["langgraph", "multi-agent", "transformers", "onnx", "bandits"],
    cover: "elearning",
    code: "https://github.com/DarainHyder",
    live: "https://adaptive-e-learning-system.vercel.app/",
  },
  {
    slug: "biomed-research-helper",
    title: "BioMed Research Helper",
    description:
      "BioAtlas, a hybrid semantic search engine over 14,693 PubMed studies. Fine-tuned bge-small fused with BM25 reaches 96.7% Recall@1, served as int8 ONNX on CPU via FastAPI, with cited evidence briefs and a React topic map.",
    tech: ["semantic-search", "bge-small", "bm25", "onnx", "fastapi", "react"],
    cover: "biomed",
    code: "https://github.com/DarainHyder/BioMed_ResearchHelper",
    live: "https://bio-med-research-helper-yzop.vercel.app/",
  },
  {
    slug: "image-quality-assessment",
    title: "Image Quality Assessment",
    description:
      "Lumina, a no-reference image quality system. A CLIP ConvNeXt-B with multi-scale quality, attention and defect heads reaches 0.940 SRCC on KonIQ-10k (0.830 zero-shot on LIVE-C), served as int8 ONNX via FastAPI with a React app.",
    tech: ["pytorch", "clip", "convnext", "onnx", "fastapi", "react"],
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
    slug: "kisaankhata",
    title: "KisaanKhata",
    description:
      "A digital ledger for Pakistan's smallholder farmers: Urdu voice entry with faster-whisper, live AMIS mandi price checks, SMS for basic phones and a tamper-evident SHA-256 ledger. National Finalist at the Alibaba Cloud AI Hackathon Pakistan 2026.",
    tech: ["fastapi", "faster-whisper", "react", "twilio", "sqlalchemy"],
    image: projKisaanKhata,
    code: KISAANKHATA.code,
    live: KISAANKHATA.live,
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

/** Newest first. `file` is the certificate itself, `url` its public verification page. */
export const CERTS: {
  title: string;
  issuer: string;
  date: string;
  year: string;
  scope: string;
  skills: string[];
  url: string;
  file: string;
}[] = [
  {
    title: "AI Hackathon Pakistan 2026, National Final",
    issuer: "Alibaba Cloud · Cognix",
    date: "Oct 2026",
    year: "2026",
    scope: "national final",
    skills: ["kisaankhata", "smart agriculture", "fastapi", "whisper"],
    url: "https://aihackathon.cognix-pk.com/certificate/TF61-YWVZ-7G1F",
    file: certHackathon,
  },
  {
    title: "Generative AI and LLMs: Architecture and Data Preparation",
    issuer: "IBM · Coursera",
    date: "Jul 2026",
    year: "2026",
    scope: "course",
    skills: ["llms", "transformers", "tokenization", "data preparation"],
    url: "https://coursera.org/verify/SGRUHO5TIXRB",
    file: certGenAI,
  },
  {
    title: "MLOps Concepts",
    issuer: "DataCamp",
    date: "Sep 2025",
    year: "2025",
    scope: "course",
    skills: ["ml lifecycle", "deployment", "monitoring"],
    url: "https://www.datacamp.com/completed/statement-of-accomplishment/course/afe8023debffb6910f37f2a88997db8fb462b7d5",
    file: certMlops,
  },
  {
    title: "AWS Cloud Practitioner (CLF-C02)",
    issuer: "DataCamp",
    date: "Sep 2025",
    year: "2025",
    scope: "track",
    skills: ["cloud concepts", "aws services", "security", "pricing"],
    url: "https://www.datacamp.com/completed/statement-of-accomplishment/track/8ae1160e0da04b0484716fcb64b1a2d96e5f727f",
    file: certAws,
  },
  {
    title: "Containerization and Virtualization Concepts",
    issuer: "DataCamp",
    date: "Aug 2025",
    year: "2025",
    scope: "course",
    skills: ["containers", "virtualization", "docker"],
    url: "https://www.datacamp.com/completed/statement-of-accomplishment/course/59cb66da82da5f05fc609a6f7e04789c6a52ffe4",
    file: certContainers,
  },
  {
    title: "Deep Learning in Python",
    issuer: "DataCamp",
    date: "Aug 2025",
    year: "2025",
    scope: "track",
    skills: ["neural networks", "deep learning", "model training"],
    url: "https://www.datacamp.com/completed/statement-of-accomplishment/track/60d23c4b115258dd770d8e0ca38bac2cec6b59c0",
    file: certDeepLearning,
  },
  {
    title: "Supervised Machine Learning in Python",
    issuer: "DataCamp",
    date: "Jul 2025",
    year: "2025",
    scope: "track",
    skills: ["classification", "regression", "model evaluation", "scikit-learn"],
    url: "https://www.datacamp.com/completed/statement-of-accomplishment/track/2d7a1c36c792f5ed56094e402144ec75db634915",
    file: certSupervised,
  },
  {
    title: "Associate Data Scientist in Python",
    issuer: "DataCamp",
    date: "Jul 2025",
    year: "2025",
    scope: "track",
    skills: ["python", "statistics", "machine learning", "scikit-learn"],
    url: "https://www.datacamp.com/completed/statement-of-accomplishment/track/eed3292c43dbac9595454e76c6dc40ca5654850d",
    file: certDataScientist,
  },
  {
    title: "Data Analyst in Python",
    issuer: "DataCamp",
    date: "Jul 2025",
    year: "2025",
    scope: "track",
    skills: ["pandas", "matplotlib", "seaborn", "analysis"],
    url: "https://www.datacamp.com/completed/statement-of-accomplishment/track/11f12ec4aaaf72c20ccf94725434a9c81569d968",
    file: certDataAnalyst,
  },
];

/** The hackathon write-up shown in its own section. */
export const HACKATHON = {
  event: "Alibaba Cloud AI Hackathon Pakistan 2026",
  result: "National Finalist",
  track: "Smart Agriculture",
  date: "24 Oct 2026",
  venue: "Pakistan-China Friendship Center, Islamabad",
  organisers: "Alibaba Cloud · Cognix · Alkhidmat Foundation · Bano Qabil",
  project: "KisaanKhata",
  tagline:
    "A free digital ledger (khata) for Pakistan's smallholder farmers that checks every sale against the real mandi rate.",
  summary:
    "Farmers record loans and harvest sales by speaking Urdu, on the web or from a basic phone over SMS. KisaanKhata compares each sale with live market prices, tells the farmer in plain Roman Urdu whether they were paid fairly, and seals the record so nobody can quietly rewrite it later.",
  ...KISAANKHATA,
  image: projKisaanKhata,
  certificate: certHackathon,
  verify: "https://aihackathon.cognix-pk.com/certificate/TF61-YWVZ-7G1F",
  features: [
    ["voice-entry", "Urdu speech-to-text with faster-whisper"],
    ["fair-price", "live AMIS mandi rates, refreshed every 6 hours"],
    ["sms", "works from any basic phone over SMS"],
    ["hash-chain", "tamper-evident SHA-256 ledger per farmer"],
    ["i18n", "English, Urdu and Chinese, right-to-left ready"],
  ] as [string, string][],
  stack: ["fastapi", "sqlalchemy", "faster-whisper", "twilio", "apscheduler", "beautifulsoup", "react", "vite"],
  struggle:
    "The model was the easy part. Getting Whisper running on free hosting took an evening of Docker, Gradio and ZeroGPU fixes, and a price scraper that ran without errors turned out to be reading the wrong unit. The last fix shipped the day before the final.",
};
