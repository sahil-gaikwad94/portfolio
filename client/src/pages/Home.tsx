import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { ArrowDownRight, ArrowUpRight, Check, Command, Copy, Github, Linkedin, Menu, Minus, Plus, Radio, X } from "lucide-react";
import { getMailtoHref, getVisibleProjects, isQuickNavShortcut, navItems, projects, skillGroups, socialLinks, toggleProjectId, type ProjectCategory } from "@/lib/portfolio";

const categories: Array<"All" | ProjectCategory> = ["All", "AI / ML", "Systems", "Full-stack"];

function SignalMark({ small = false }: { small?: boolean }) {
  return (
    <span className={small ? "signal-mark signal-mark--small" : "signal-mark"} aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

function DataBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="data-block">
      <span className="eyebrow">{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ProjectVisual({ visual, accent }: { visual: string; accent: ProjectCategory | "lime" | "coral" | "blue" | "paper" }) {
  return (
    <div className={`project-visual project-visual--${visual} project-visual--${accent}`} aria-hidden="true">
      <div className="visual-grid" />
      {visual === "uav" && (
        <svg viewBox="0 0 520 340" role="presentation">
          <path className="orbit-line" d="M62 224 C110 85 278 42 440 126 C501 158 472 255 339 271 C197 287 108 262 62 224Z" />
          <path className="orbit-line orbit-line--dashed" d="M92 244 C166 176 236 181 310 135 C375 95 406 94 453 126" />
          <path className="route-line" d="M102 226 L184 136 L281 186 L381 94 L435 140" />
          {[[102,226],[184,136],[281,186],[381,94],[435,140]].map(([cx, cy], index) => <circle key={index} className={`node-dot ${index === 2 ? "node-dot--alert" : ""}`} cx={cx} cy={cy} r={index === 2 ? 9 : 5} />)}
          <text x="164" y="118">WAYPOINT / 04</text>
          <text x="292" y="222">ΔT 00:08:14</text>
        </svg>
      )}
      {visual === "bert" && (
        <div className="bert-stack">
          {["attention", "position", "normalize", "distill"].map((label, index) => (
            <div className="bert-layer" style={{ "--layer-index": index } as CSSProperties} key={label}>
              <span>{label}</span><i /><i /><i />
            </div>
          ))}
          <div className="bert-annotation">teacher → student</div>
        </div>
      )}
      {visual === "vault" && (
        <div className="vault-interface">
          <div className="vault-topline"><span>mindvault.local</span><span>● indexed</span></div>
          <div className="vault-search">ask your knowledge base <span>⌘ K</span></div>
          <div className="vault-cards"><div /><div /><div /></div>
          <div className="vault-query"><span>↳</span> Retrieval path: 04 chunks → answer</div>
        </div>
      )}
      {visual === "aura" && (
        <div className="aura-schematic">
          <div className="aura-glyph">◌</div>
          <div className="aura-wire aura-wire--one" />
          <div className="aura-wire aura-wire--two" />
          <div className="aura-chip"><span>ESP32</span><b>OLED</b></div>
          <div className="aura-caption">listen / think / display</div>
        </div>
      )}
      <span className="visual-index">{visual === "uav" ? "01" : visual === "bert" ? "02" : visual === "vault" ? "03" : "04"}</span>
    </div>
  );
}

function ProjectCard({ project, expanded, onToggle }: { project: (typeof projects)[number]; expanded: boolean; onToggle: () => void }) {
  return (
    <article className={`project-card reveal ${expanded ? "is-expanded" : ""}`} id={`project-${project.id}`}>
      <button className="project-summary" onClick={onToggle} aria-expanded={expanded} aria-controls={`details-${project.id}`}>
        <ProjectVisual visual={project.visual} accent={project.accent} />
        <div className="project-card-copy">
          <div className="project-meta"><span>{project.index}</span><span>{project.category}</span><span>{project.year}</span></div>
          <h3>{project.title}</h3>
          <p className="project-kicker">{project.kicker}</p>
          <p className="project-summary-text">{project.summary}</p>
          <span className="project-open">{expanded ? "Close case study" : "Open case study"}<span className="project-open-icon">{expanded ? <Minus size={15} /> : <Plus size={15} />}</span></span>
        </div>
      </button>
      <div id={`details-${project.id}`} className="project-details" hidden={!expanded}>
        <div className="detail-grid">
          <div><span className="eyebrow">Architecture / flow</span><p>{project.architecture}</p></div>
          <div><span className="eyebrow">What shipped</span><p>{project.outcome}</p></div>
        </div>
        <div className="project-foot">
          <div className="tag-list">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <div className="metric-list">{project.metrics.map((metric) => <DataBlock key={metric.label} label={metric.label} value={metric.value} />)}</div>
        </div>
      </div>
    </article>
  );
}

function AppNav({ onQuickOpen }: { onQuickOpen: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-nav">
      <a className="wordmark" href="#signal" aria-label="Sahil Gaikwad home"><SignalMark /><span>sahil<span className="wordmark-dot">.</span>ai</span></a>
      <nav className={`nav-links ${menuOpen ? "nav-links--open" : ""}`} aria-label="Primary navigation">
        {navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
      </nav>
      <div className="nav-actions">
        <button className="quick-trigger" onClick={onQuickOpen} aria-label="Open quick navigation"><Command size={15} /><span>quick nav</span><kbd>⌘/</kbd></button>
        <a className="status-pill" href="#contact"><span className="status-dot" /> open to signal</a>
        <button className="mobile-menu" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
      </div>
    </header>
  );
}

function SignalField() {
  const [pointer, setPointer] = useState({ x: 50, y: 45 });
  const fieldStyle = { "--pointer-x": `${pointer.x}%`, "--pointer-y": `${pointer.y}%` } as CSSProperties;
  return (
    <div className="signal-field" style={fieldStyle} onMouseMove={(event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      setPointer({ x: ((event.clientX - rect.left) / rect.width) * 100, y: ((event.clientY - rect.top) / rect.height) * 100 });
    }}>
      <div className="signal-glow" />
      <div className="field-label field-label--top">signal / 00.01</div>
      <div className="field-label field-label--bottom">pointer-reactive field</div>
      <div className="signal-crosshair signal-crosshair--one"><span /></div>
      <div className="signal-crosshair signal-crosshair--two"><span /></div>
      <div className="signal-orbit signal-orbit--one" />
      <div className="signal-orbit signal-orbit--two" />
      <div className="signal-orbit signal-orbit--three" />
      <div className="signal-core"><Radio size={24} /><span>BUILD / OBSERVE / ITERATE</span></div>
      <span className="signal-node signal-node--one" />
      <span className="signal-node signal-node--two" />
      <span className="signal-node signal-node--three" />
    </div>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<"All" | ProjectCategory>("All");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [activeSkill, setActiveSkill] = useState("intelligence");
  const [quickOpen, setQuickOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("in-view"); });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
    return () => revealObserver.disconnect();
  }, [activeCategory]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isQuickNavShortcut(event.key, event.metaKey, event.ctrlKey)) {
        event.preventDefault();
        setQuickOpen(true);
      }
      if (event.key === "Escape") setQuickOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const visibleProjects = useMemo(() => getVisibleProjects(activeCategory), [activeCategory]);
  const currentSkillGroup = skillGroups.find((group) => group.id === activeSkill) ?? skillGroups[0];

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("thelifeofsahil@gmail.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = getMailtoHref("thelifeofsahil@gmail.com");
    }
  };

  const jumpTo = (href: string) => {
    setQuickOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="portfolio-shell">
      <AppNav onQuickOpen={() => setQuickOpen(true)} />
      {quickOpen && <div className="quick-overlay" role="dialog" aria-modal="true" aria-label="Quick navigation">
        <button className="quick-backdrop" onClick={() => setQuickOpen(false)} aria-label="Close quick navigation" />
        <div className="quick-panel">
          <div className="quick-panel-head"><span className="eyebrow">jump to / anywhere</span><button onClick={() => setQuickOpen(false)} aria-label="Close"><X size={18} /></button></div>
          <p className="quick-title">What are you looking for?</p>
          <div className="quick-options">{[
            ["signal", "Start here", "#signal"], ["work", "Selected work", "#work"], ["stack", "Technical stack", "#stack"], ["contact", "Make contact", "#contact"],
          ].map(([label, description, href], index) => <button key={label} onClick={() => jumpTo(href)}><span className="quick-number">0{index + 1}</span><span><strong>{label}</strong><small>{description}</small></span><ArrowUpRight size={17} /></button>)}</div>
          <div className="quick-hint"><kbd>esc</kbd> to close <span>·</span> <kbd>⌘/</kbd> anytime</div>
        </div>
      </div>}

      <section className="hero-section" id="signal">
        <div className="hero-copy reveal">
          <div className="eyebrow eyebrow-accent"><span className="eyebrow-line" /> AI / SYSTEMS / IMPACT</div>
          <h1>I build <em>useful</em><br /><span>intelligence.</span></h1>
          <p className="hero-lede">Hey!! I'm Sahil Gaikwad an AI, agentic-systems, and backend engineer turning deep technical ideas into prototypes people can actually feel.</p>
          <div className="hero-actions"><a className="button button--lime" href="#work">Explore the signal <ArrowDownRight size={17} /></a><button className="text-button" onClick={copyEmail}>{copied ? <Check size={15} /> : <Copy size={15} />} {copied ? "email copied" : "copy email"}</button></div>
        </div>
        <div className="hero-field-wrap reveal"><SignalField /></div>
        <div className="hero-footer reveal"><span>01 / 04</span><span className="hero-footer-line" /><span>Scroll to inspect the work <ArrowDownRight size={15} /></span></div>
      </section>

      <section className="manifesto-section section-pad reveal">
        <div className="section-marker">[ 00 ] / transmission</div>
        <div className="manifesto-grid">
          <p className="section-display">The best systems are <span>quietly ambitious.</span></p>
          <div className="manifesto-copy"><p>I like the space between research and reality: where a paper becomes a smaller model, a model becomes a tool, and a tool changes what someone can do next.</p><p>My work moves between machine learning, agentic workflows, backend systems, and hardware — always with a bias toward clarity, privacy, and real-world impact.</p><a className="arrow-link" href="#about">Read the field notes <ArrowUpRight size={16} /></a></div>
        </div>
      </section>

      <section className="experience-section section-pad" id="about">
        <div className="section-marker reveal">[ 01 ] / context</div>
        <div className="experience-grid">
          <div className="experience-intro reveal"><span className="eyebrow">signal origin</span><h2>Research mind.<br /><span>Builder hands.</span></h2><p>Grounded in computer science and AI, shaped by experiments that cross the screen.</p></div>
          <div className="experience-timeline reveal">
            <div className="timeline-item"><div className="timeline-date">2024 — 2025</div><div className="timeline-dot" /><div><h3>Machine Learning Research Intern <span>@ IEEE</span></h3><p>Architected and benchmarked neural-network models with Python and TensorFlow, improving predictive performance across multiple use cases. Contributed findings to five research publications presented at international conferences.</p><div className="tag-list"><span>Research</span><span>TensorFlow</span><span>Python</span><span>Model evaluation</span></div></div></div>
            <div className="timeline-item"><div className="timeline-date">2021 — 2025</div><div className="timeline-dot timeline-dot--muted" /><div><h3>B.Tech Computer Science Engineering <span>@ Sandip University</span></h3><p>AI-focused computer science foundation spanning algorithms, mathematics, operating systems, networks, architecture, and applied machine learning.</p><div className="tag-list"><span>AI specialization</span><span>Systems thinking</span></div></div></div>
            <div className="timeline-item"><div className="timeline-date">community</div><div className="timeline-dot timeline-dot--coral" /><div><h3>IEEE Computer Society + SUAISA</h3><p>Helped drive technical learning through seminars, emerging-AI workshops, internship coordination, and networking events for the AI/ML department.</p><div className="tag-list"><span>Leadership</span><span>Open source</span><span>Community</span></div></div></div>
          </div>
        </div>
      </section>

      <section className="work-section section-pad" id="work">
        <div className="section-marker reveal">[ 02 ] / selected experiments</div>
        <div className="work-heading reveal"><div><span className="eyebrow">field log / 2024—2025</span><h2>Built to be <span>used.</span></h2></div><p>Four experiments across intelligence, systems, and the physical world. Open a file to inspect the architecture.</p></div>
        <div className="filter-bar reveal" role="toolbar" aria-label="Filter projects">{categories.map((category) => <button key={category} onClick={() => { setActiveCategory(category); setExpandedProject(null); }} className={activeCategory === category ? "is-active" : ""}>{category}<span>{category === "All" ? projects.length : projects.filter((project) => project.category === category).length}</span></button>)}</div>
        <div className="project-list">{visibleProjects.map((project) => <ProjectCard key={project.id} project={project} expanded={expandedProject === project.id} onToggle={() => setExpandedProject(toggleProjectId(expandedProject, project.id))} />)}</div>
      </section>

      <section className="stack-section section-pad" id="stack">
        <div className="section-marker reveal">[ 03 ] / instrument panel</div>
        <div className="stack-heading reveal"><span className="eyebrow">the stack, in layers</span><h2>Deep enough to<br /><span>ship the idea.</span></h2><p>Not a list of tools — a working vocabulary for connecting models, interfaces, data, and the people they serve.</p></div>
        <div className="stack-explorer reveal"><div className="stack-tabs" role="tablist" aria-label="Skill categories">{skillGroups.map((group) => <button key={group.id} role="tab" aria-selected={activeSkill === group.id} className={activeSkill === group.id ? "is-active" : ""} onClick={() => setActiveSkill(group.id)}><span>{group.label}</span><ArrowUpRight size={15} /></button>)}</div><div className="stack-detail"><div className="stack-detail-top"><span className="eyebrow">{currentSkillGroup.label}</span><span className="stack-live"><span className="status-dot" /> active vocabulary</span></div><h3>{currentSkillGroup.title}</h3><p>{currentSkillGroup.blurb}</p><div className="skill-cloud">{currentSkillGroup.skills.map((skill, index) => <span key={skill} style={{ "--skill-index": index } as CSSProperties}>{skill}</span>)}</div></div></div>
      </section>

      <section className="principles-section section-pad reveal">
        <div className="principles-card"><div className="principles-index">/ 04</div><div><span className="eyebrow">operating principles</span><h2>Make it <em>legible.</em><br />Make it matter.</h2></div><div className="principles-lines"><p><span>01</span> Research should survive contact with reality.</p><p><span>02</span> Privacy is a feature, not a footnote.</p><p><span>03</span> Good systems leave room for curiosity.</p></div></div>
      </section>

      <section className="contact-section section-pad" id="contact">
        <div className="contact-orbit contact-orbit--one" /><div className="contact-orbit contact-orbit--two" />
        <div className="section-marker reveal">[ 05 ] / open channel</div>
        <div className="contact-grid"><div className="contact-copy reveal"><span className="eyebrow eyebrow-accent"><span className="eyebrow-line" /> OPEN TO SIGNAL</span><h2>Have a hard<br /><span>problem?</span></h2><p>Tell me what you’re building, what’s stuck, or what feels possible. I’m always interested in the signal underneath the brief.</p><a className="contact-email" href="mailto:thelifeofsahil@gmail.com">thelifeofsahil@gmail.com <ArrowUpRight size={18} /></a></div><div className="contact-note reveal"><div className="note-pin" /><div className="note-label">TRANSMISSION NOTE / 001</div><p>“The fun part is not knowing whether the idea belongs in a notebook, a backend, or a pair of glasses — then building enough to find out.”</p><div className="note-signature">— Sahil</div></div></div>
        <div className="contact-footer reveal"><span>India / available globally</span><div className="social-links"><a href={socialLinks.github} target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a>{socialLinks.linkedin ? <a href={socialLinks.linkedin} target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn</a> : <span className="social-placeholder"><Linkedin size={15} /> LinkedIn <small>add URL</small></span>}</div><span>© {new Date().getFullYear()} Sahil Gaikwad</span></div>
      </section>

      <footer className="site-footer"><a className="wordmark" href="#signal"><SignalMark small /><span>sahil<span className="wordmark-dot">.</span>ai</span></a><span>built with curiosity + too much coffee</span><a href="#signal">back to top <ArrowUpRight size={14} /></a></footer>
    </main>
  );
}
