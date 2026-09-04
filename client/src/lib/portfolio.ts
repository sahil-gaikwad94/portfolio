export type ProjectCategory = "AI / ML" | "Systems" | "Full-stack";

export type Project = {
  id: string;
  index: string;
  title: string;
  kicker: string;
  category: ProjectCategory;
  year: string;
  summary: string;
  architecture: string;
  outcome: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  accent: "lime" | "coral" | "blue" | "paper";
  visual: "uav" | "bert" | "vault" | "aura";
};

export const socialLinks = {
  github: "https://github.com/sahilgaikwad94",
  // Keep empty until Sahil supplies a verified LinkedIn profile URL.
  linkedin: "",
};

export const projects: Project[] = [
  {
    id: "uav",
    index: "01",
    title: "UAV / strategic deconfliction",
    kicker: "Safety logic for shared airspace",
    category: "Systems",
    year: "2025",
    summary:
      "A mission-safety prototype that checks waypoint routes for spatial proximity and temporal overlap before a UAV ever takes off.",
    architecture:
      "Mission waypoints enter a deterministic validation pipeline. Spatial proximity checks are paired with time-window overlap analysis, then surfaced through Matplotlib views that separate safe, warning, and conflict scenarios.",
    outcome:
      "Delivered a working safety-validation prototype and a clear path toward 3D / 4D deconfliction for more complex airspace planning.",
    stack: ["Python", "Systems design", "Matplotlib", "Algorithms"],
    metrics: [
      { label: "Core function", value: "check_mission_safety" },
      { label: "Expansion path", value: "3D / 4D space-time" },
    ],
    accent: "lime",
    visual: "uav",
  },
  {
    id: "distilbert",
    index: "02",
    title: "DistilBERT / from first principles",
    kicker: "A transformer, made legible",
    category: "AI / ML",
    year: "2025",
    summary:
      "A from-scratch implementation that turns transformer math and knowledge distillation into an inspectable engineering system.",
    architecture:
      "The pipeline composes custom self-attention, positional embeddings, layer normalization, and a distillation objective that combines KL divergence with cross-entropy loss.",
    outcome:
      "Reached 40% model compression while retaining 95%+ performance, making the compact architecture easier to run and reason about.",
    stack: ["Python", "PyTorch", "Transformers", "NLP"],
    metrics: [
      { label: "Compression", value: "40% smaller" },
      { label: "Retention", value: "95%+ performance" },
    ],
    accent: "coral",
    visual: "bert",
  },
  {
    id: "mindvault",
    index: "03",
    title: "MindVault / personal knowledge OS",
    kicker: "Your knowledge, fully yours",
    category: "Full-stack",
    year: "2025",
    summary:
      "A local-first knowledge system that ingests notes, documents, and web clippings, then makes them searchable and useful without shipping private data away.",
    architecture:
      "React and Flask frame an on-device pipeline: ingest text, Markdown, PDFs, or web clips; chunk and index with TF-IDF; enrich with a self-hosted LLM; and retrieve with RAG. SQLite keeps the data local.",
    outcome:
      "Designed a privacy-first workflow with semantic search, concise answers, automated tagging, and spaced repetition — zero external dependencies by default.",
    stack: ["React", "Flask", "SQLite", "TF-IDF", "RAG"],
    metrics: [
      { label: "Data posture", value: "On-device" },
      { label: "Retrieval", value: "TF-IDF + RAG" },
    ],
    accent: "blue",
    visual: "vault",
  },
  {
    id: "aura",
    index: "04",
    title: "AURA / AI smart glasses",
    kicker: "Ambient computing, made tangible",
    category: "Systems",
    year: "2024",
    summary:
      "A wearable prototype that connects local audio, speech recognition, an LLM, and an OLED display into a private voice interface.",
    architecture:
      "Laptop audio is transcribed with Whisper, interpreted by a local Ollama model, then streamed over TCP to an ESP32 and OLED. Modular Python commands can launch apps or open a browser from a voice trigger.",
    outcome:
      "Proved a low-latency, privacy-first interaction loop across embedded hardware and local AI services.",
    stack: ["ESP32", "Whisper", "Ollama", "Python", "TCP sockets"],
    metrics: [
      { label: "Interface", value: "Voice → display" },
      { label: "Transport", value: "TCP streaming" },
    ],
    accent: "paper",
    visual: "aura",
  },
];

export const skillGroups = [
  {
    id: "intelligence",
    label: "01 / intelligence",
    title: "Models that can reason, retrieve, and see.",
    blurb: "From transformer internals to agentic orchestration, the focus is always on making the system understandable enough to trust.",
    skills: ["PyTorch", "TensorFlow", "Hugging Face", "Transformers", "NLP", "RAG", "LangGraph", "CrewAI", "MCPs", "OpenCV", "VLMs", "Quantization"],
  },
  {
    id: "systems",
    label: "02 / systems",
    title: "Backends that stay useful under pressure.",
    blurb: "Typed APIs, event-driven pieces, real-time transport, and the practical engineering glue between a model and a user.",
    skills: ["Node.js", "Express", "FastAPI", "Django", "TypeScript", "REST APIs", "WebSockets", "Socket.io", "gRPC", "Redis", "Kafka", "zod"],
  },
  {
    id: "platform",
    label: "03 / platform",
    title: "Shipping loops, not just notebooks.",
    blurb: "Cloud, containers, data stores, and debugging habits that help ambitious prototypes make it into the world.",
    skills: ["Docker", "AWS EC2", "AWS S3", "SageMaker", "GCP Vertex AI", "MySQL", "MongoDB", "DynamoDB", "ChromaDB", "Pinecone", "Git", "Google Colab"],
  },
  {
    id: "foundations",
    label: "04 / foundations",
    title: "The fundamentals underneath the signal.",
    blurb: "Algorithms, networks, operating systems, architecture, mathematics, and the communication required to bring people with you.",
    skills: ["Python", "JavaScript", "Go", "C", "DSA", "OOP", "Operating systems", "Computer networks", "Systems design", "Leadership", "Communication", "Critical thinking"],
  },
] as const;

export const navItems = [
  { label: "signal", href: "#signal" },
  { label: "work", href: "#work" },
  { label: "stack", href: "#stack" },
  { label: "contact", href: "#contact" },
] as const;

export const getVisibleProjects = (category: "All" | ProjectCategory) =>
  category === "All" ? projects : projects.filter((project) => project.category === category);

export const isQuickNavShortcut = (key: string, metaKey = false, ctrlKey = false) =>
  (key === "/" && (metaKey || ctrlKey)) || (key.toLowerCase() === "k" && (metaKey || ctrlKey));

export const toggleProjectId = (currentId: string | null, nextId: string) =>
  currentId === nextId ? null : nextId;

export const getMailtoHref = (email: string) => `mailto:${email}`;
