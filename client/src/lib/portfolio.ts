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
  visual: "uav" | "bert" | "vault" | "aura" | "swarm" | "future";
  links?: { label: string; href: string }[];
};

export const socialLinks = {
  github: "https://github.com/sahil-gaikwad94",
  linkedin: "https://www.linkedin.com/in/sahilgaikwad94",
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
  {
    id: "eduswarm",
    index: "05",
    title: "EduSwarm / multi-agent learning platform",
    kicker: "Specialist agents, one learning path",
    category: "AI / ML",
    year: "2026",
    summary:
      "The premise: a curriculum topic shouldn't be a static page someone wrote once — it should be a job a team of specialist agents can execute on demand, and refuse to complete rather than hallucinate through.",
    architecture:
      "Three services, three concerns, no shared runtime. The web app and Express API own auth (Google OAuth, signed HttpOnly sessions), persistence (MongoDB), and everything synchronous. Submitting a topic doesn't block on generation — it enqueues a job and the client subscribes to progress over SSE, fanned out through Redis pub/sub so any API instance can push updates regardless of which one accepted the request. The actual work happens in a separate FastAPI + LangGraph runtime: a checkpointed state graph so a crashed or restarted job resumes instead of re-running from scratch, local embeddings so retrieval doesn't take a second model-API dependency, and Qdrant for the vector store in production. The core constraint driving the design: nothing gets published without evidence. Every generated artifact is checked against what was actually retrieved, and a job that can't produce an approved package fails loudly and inspectably — logged as a failed job, not silently degraded output. Provider config, GATE CSE / full-stack / AI-ML content tracks, and the Render blueprint are all designed to fail the same way: visibly, at request time, never mid-generation.",
    outcome:
      "Shipped vertical slice: learners switch between GATE CSE, full-stack, and AI/ML tracks, run PYQ quizzes filtered by subject/topic/year, and get routed to specialist agents matched to their specific obstacle rather than a generic tutor. Deployed as three independently scalable services behind one Render blueprint, with a regression suite that specifically covers the failure path — a topic request with no provider configured is asserted to persist as a failed job, not crash the request handler.",
    stack: ["React", "TypeScript", "Express", "FastAPI", "LangGraph", "Qdrant", "MongoDB", "Redis"],
    metrics: [
      { label: "Runtime", value: "LangGraph + RAG" },
      { label: "Publishing", value: "Evidence-gated" },
    ],
    accent: "blue",
    visual: "swarm",
    links: [{ label: "GitHub", href: "https://github.com/sahil-gaikwad94/eduswarm" }],
  },
  {
    id: "futureme",
    index: "06",
    title: "FutureMe / five-year self projection",
    kicker: "A transparent observatory for your own trajectory",
    category: "Full-stack",
    year: "2026",
    summary:
      "The premise: a life projection is only worth trusting if you can see the model behind it. So the number on screen always traces back to an explicit, inspectable calculation — never a language model asked to guess what your future looks like.",
    architecture:
      "The LLM is deliberately kept out of the math. A deterministic projection engine owns career, finance, health, and relationship trajectories, producing pessimistic / realistic / optimistic bands from explicit, stated assumptions rather than a single point estimate — closer to a Monte Carlo sensitivity sweep than a forecast. Check-ins feed a Bayesian updater that revises confidence in the existing trajectory instead of discarding it and starting over, so the projection gets more accurate the longer someone uses it without ever losing continuity with where it started. Only after that computation exists does the LLM enter the picture, and its job is narrow by design: narrate the computed state in the user's language, never invent a trajectory fact of its own — the adapter runs through OpenRouter server-side, with a no-AI fallback so the product still functions if the model call fails. Google OAuth with signed sessions and CSRF-protected state gates a persistent PostgreSQL schema (profiles, goals, habits, journal entries, check-ins, scenarios, snapshots, chat) — but the schema is designed to be optional: an in-memory demo workspace runs the full projection and what-if engine with zero login and zero persistence, so the core idea is provable before anyone creates an account.",
    outcome:
      "Delivered a responsive, art-directed dashboard with live what-if adherence simulation — drag an assumption, watch the bands redraw — plus explicit safety framing throughout so projections read as illustrative scenarios, not financial or medical guidance. The no-login demo path turned out to be the more important decision than any individual model choice: it means the product's core value is verifiable in under a minute.",
    stack: ["React", "TypeScript", "PostgreSQL", "Drizzle", "Google OAuth", "OpenRouter"],
    metrics: [
      { label: "Projection", value: "3-band Monte Carlo" },
      { label: "Consistency", value: "Bayesian updates" },
    ],
    accent: "coral",
    visual: "future",
    links: [{ label: "GitHub", href: "https://github.com/sahil-gaikwad94/FutureMe" }],
  },
];

export const skillGroups = [
  {
    id: "intelligence",
    label: "01 / intelligence",
    title: "Models that can reason, retrieve, and see.",
    blurb: "From transformer internals to agentic orchestration, the focus is always on making the system understandable enough to trust.",
    skills: ["PyTorch", "TensorFlow", "Hugging Face", "Transformers", "NLP", "RAG", "LangGraph", "LangChain", "CrewAI", "MCPs", "OpenCV", "VLMs", "Quantization", "OpenRouter", "Ollama"],
  },
  {
    id: "systems",
    label: "02 / systems",
    title: "Backends that stay useful under pressure.",
    blurb: "Typed APIs, event-driven pieces, real-time transport, and the practical engineering glue between a model and a user.",
    skills: ["Node.js", "Express", "FastAPI", "Django", "Flask", "TypeScript", "Next.js", "REST APIs", "WebSockets", "Socket.io", "gRPC", "Redis", "Kafka", "zod", "OAuth 2.0"],
  },
  {
    id: "platform",
    label: "03 / platform",
    title: "Shipping loops, not just notebooks.",
    blurb: "Cloud, containers, data stores, and debugging habits that help ambitious prototypes make it into the world.",
    skills: ["Docker", "AWS EC2", "AWS S3", "SageMaker", "GCP Vertex AI", "MySQL", "PostgreSQL", "MongoDB", "Mongoose", "Drizzle ORM", "DynamoDB", "ChromaDB", "Pinecone", "Qdrant", "Git", "Google Colab"],
  },
  {
    id: "foundations",
    label: "04 / foundations",
    title: "The fundamentals underneath the signal.",
    blurb: "Algorithms, networks, operating systems, architecture, mathematics, and the communication required to bring people with you.",
    skills: ["Python", "JavaScript", "Go", "C", "SQL", "DSA", "OOP", "Statistics", "Operating systems", "Computer networks", "Systems design", "Leadership", "Communication", "Critical thinking"],
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
