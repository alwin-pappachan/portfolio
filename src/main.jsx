import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { animate, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import Lenis from "lenis";
import {
  FiArrowRight,
  FiAward,
  FiBarChart2,
  FiBriefcase,
  FiCheck,
  FiCopy,
  FiDatabase,
  FiDownload,
  FiGithub,
  FiGrid,
  FiHome,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiMenu,
  FiPhone,
  FiPlus,
  FiRefreshCcw,
  FiSave,
  FiSend,
  FiStar,
  FiTrash2,
  FiTrendingUp,
  FiUpload,
  FiX,
} from "react-icons/fi";
import {
  SiGoogleanalytics,
  SiJupyter,
  SiMysql,
  SiNumpy,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiR,
} from "react-icons/si";
import "./styles.css";

const STORAGE_KEY = "alwinPortfolioDataV3";
const ADMIN_AUTH_KEY = "alwinPortfolioAdminUnlocked";
const ADMIN_PASSCODE = "alwin2026";

const iconMap = {
  Python: SiPython,
  Pandas: SiPandas,
  NumPy: SiNumpy,
  SQL: FiDatabase,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  "Power BI": FiBarChart2,
  Tableau: FiGrid,
  Excel: FiGrid,
  Jupyter: SiJupyter,
  "Google Analytics": SiGoogleanalytics,
  R: SiR,
  default: FiBarChart2,
};

const defaultPortfolio = {
  name: "ALWIN PAPPACHAN",
  initials: "AP",
  headline: "Data Analyst",
  eyebrow: "Data Analytics Intern / BI Dashboards / SQL, Excel & Power BI",
  intro:
    "Aspiring Data Analyst turning raw business data into dashboards, KPI reports, and decision-ready insights with Excel, SQL, Power BI, Python, Power Query, and DAX.",
  about:
    "MCA student at Federal Institute of Science and Technology and Data Analytics Intern at Camerin Health Technologies Pvt. Ltd. with hands-on experience in data cleaning, transformation, validation, dashboard development, KPI reporting, business analysis, and data visualization.",
  resumeUrl: "/Alwin-Pappachan-Resume.pdf",
  roles: ["Data Analyst", "Data Analytics Intern", "Power BI Developer", "SQL Analyst", "KPI Reporting Analyst"],
  interests: ["Data Cleaning", "Dashboard Development", "Business Intelligence", "KPI Reporting", "Trend Analysis"],
  stats: [
    { value: 5000, suffix: "+", label: "Records Analyzed" },
    { value: 10, suffix: "+", label: "Dashboards & KPI Reports" },
    { value: 15, suffix: "+", label: "DAX Measures Built" },
    { value: 30, suffix: "%", label: "Manual Reporting Time Reduced" },
  ],
  insightCards: [
    {
      title: "Business Dataset Analysis",
      metric: "5,000+",
      detail: "Analyzed business records using Microsoft Excel, SQL, and Power BI to surface performance patterns.",
      tags: ["Excel", "SQL", "Power BI"],
    },
    {
      title: "Dashboard & KPI Reporting",
      metric: "10+",
      detail: "Built interactive dashboards and KPI reports for cross-functional decision making.",
      tags: ["KPI Reports", "Data Visualization", "BI"],
    },
    {
      title: "Data Quality Improvement",
      metric: "20%",
      detail: "Performed cleaning, transformation, and validation workflows that improved data accuracy.",
      tags: ["Power Query", "Validation", "Cleaning"],
    },
    {
      title: "Reporting Automation",
      metric: "30%",
      detail: "Created reports and visualizations that reduced manual reporting time for recurring analysis.",
      tags: ["DAX", "Automation", "Insights"],
    },
  ],
  skillGroups: [
    {
      title: "Analysis",
      skills: [
        { name: "Excel", level: 92 },
        { name: "Power Query", level: 86 },
        { name: "Pandas", level: 86 },
        { name: "Python", level: 84 },
      ],
    },
    {
      title: "Databases",
      skills: [
        { name: "SQL", level: 88 },
        { name: "MySQL", level: 84 },
        { name: "MongoDB", level: 74 },
      ],
    },
    {
      title: "Business Intelligence",
      skills: [
        { name: "Power BI", level: 88 },
        { name: "DAX", level: 82 },
        { name: "Dashboard Development", level: 88 },
        { name: "KPI Reporting", level: 86 },
      ],
    },
  ],
  projects: [
    {
      title: "ContractIQ Analytics",
      description:
        "AI-powered contractor project and expense management system with cost prediction, expense tracking, dashboard analytics, and automated PDF reporting.",
      features: ["85%+ Cost Prediction", "Expense Tracking", "10+ Real-Time Metrics", "PDF Reporting", "Secure Data Storage"],
      tech: ["MERN", "Python ML", "MongoDB", "Dashboard Analytics"],
      link: "https://github.com/",
    },
    {
      title: "WheelDeal",
      description:
        "Vehicle listing web application with role-based dashboards, search and filtering, and machine-learning price prediction for faster listing discovery.",
      features: ["100+ Listings", "3 User Roles", "30% Faster Discovery", "80%+ Price Prediction", "JWT Auth"],
      tech: ["MERN", "Machine Learning", "MongoDB", "Dashboards"],
      link: "https://github.com/",
    },
    {
      title: "TalentConnect",
      description:
        "Authentication and authorization module for a talent platform, built with practical database-backed login and signup workflows.",
      features: ["Authentication", "Authorization", "Signup Flow", "Login Flow", "MySQL Database"],
      tech: ["Java", "MySQL", "HTML", "CSS", "JavaScript"],
      link: "https://github.com/",
    },
  ],
  timeline: [
    {
      type: "Experience",
      title: "Data Analytics Intern",
      place: "Camerin Health Technologies Pvt. Ltd. | May 2026 - Present",
      detail: "Analyzing 5,000+ record business datasets, building 10+ dashboards and KPI reports, creating 15+ DAX measures, and reducing manual reporting time by 30%.",
    },
    {
      type: "Education",
      title: "Master of Computer Applications",
      place: "Federal Institute of Science and Technology (FISAT) | 2024 - 2026",
      detail: "Currently pursuing MCA with a focus on analytics, databases, business intelligence, and data-driven applications.",
    },
    {
      type: "Education",
      title: "Bachelor of Computer Applications",
      place: "Naipunya Institute of Management and Information Technology | 2021 - 2024",
      detail: "Completed BCA with CGPA 6.8 and built a foundation in programming, databases, web technologies, and computing fundamentals.",
    },
    {
      type: "Experience",
      title: "Sales & Billing Assistant",
      place: "Capson Day Mart | 2020 - 2024",
      detail: "Processed 50+ customer transactions daily, maintained purchase and inventory records for 200+ SKUs, and reduced inventory discrepancies by 15%.",
    },
  ],
  certifications: ["Data Analytics Internship - Camerin Health Technologies", "AWS Academy Cloud Foundations", "Full Stack Development in Python - STED Council", "Full Stack Development in Java - STED Council", "MERN Stack Bootcamp - LinkUrCodes"],
  achievements: ["State 2nd Runner-Up - Social Science Working Model", "Cybersecurity Workshop by ISACA", "MPOWER Soft Skills Training at FISAT", "National Conference on Edge AI", "Student Representative - MCA Association", "Event Coordinator - Arangu'25", "NSS Volunteer"],
  contact: [
    { label: "GitHub", href: "https://github.com/alwin-pappachan" },
    { label: "LinkedIn", href: "https://linkedin.com/in/alwin-pappachan" },
    { label: "Email", href: "mailto:alwinpappachan56@gmail.com" },
    { label: "Phone", href: "tel:+918891206428" },
    { label: "Kerala, India", href: "#home" },
  ],
};

const navItems = ["Home", "About", "Skills", "Projects", "Experience", "Education", "Certifications", "Achievements", "Contact"];

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function loadPortfolio() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...defaultPortfolio, ...JSON.parse(stored) } : defaultPortfolio;
  } catch {
    return defaultPortfolio;
  }
}

function savePortfolio(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event("portfolio-data-updated"));
}

function App() {
  const [portfolio, setPortfolio] = useState(loadPortfolio);
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    const sync = () => setPortfolio(loadPortfolio());
    const onRoute = () => setRoute(window.location.pathname);
    window.addEventListener("portfolio-data-updated", sync);
    window.addEventListener("popstate", onRoute);
    return () => {
      window.removeEventListener("portfolio-data-updated", sync);
      window.removeEventListener("popstate", onRoute);
    };
  }, []);

  return route === "/admin" ? (
    <AdminGate>
      <AdminPage portfolio={portfolio} setPortfolio={setPortfolio} />
    </AdminGate>
  ) : (
    <PortfolioPage portfolio={portfolio} />
  );
}

function PortfolioPage({ portfolio }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 130, damping: 28 });

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onPointerMove = (event) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("pointermove", onPointerMove);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [mouseX, mouseY]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <Background mouseX={mouseX} mouseY={mouseY} />
      <Navbar portfolio={portfolio} scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero portfolio={portfolio} />
      <About portfolio={portfolio} />
      <MotionInsights cards={portfolio.insightCards || defaultPortfolio.insightCards} />
      <Skills groups={portfolio.skillGroups} />
      <Projects projects={portfolio.projects} />
      <Timeline timeline={portfolio.timeline} />
      <Certifications certifications={portfolio.certifications} />
      <Achievements achievements={portfolio.achievements} />
      <Contact contact={portfolio.contact} />
      <Footer name={portfolio.name} />
    </main>
  );
}

function useTyping(words) {
  const safeWords = words?.length ? words : ["Data Analyst"];
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = safeWords[wordIndex % safeWords.length];
    const doneTyping = !deleting && text === current;
    const doneDeleting = deleting && text === "";
    const delay = doneTyping ? 1300 : deleting ? 42 : 74;

    const timeout = setTimeout(() => {
      if (doneTyping) setDeleting(true);
      else if (doneDeleting) {
        setDeleting(false);
        setWordIndex((index) => (index + 1) % safeWords.length);
      } else {
        setText(current.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [deleting, safeWords, text, wordIndex]);

  return text;
}

function Background({ mouseX, mouseY }) {
  const spotlightX = useTransform(mouseX, (value) => `${value - 280}px`);
  const spotlightY = useTransform(mouseY, (value) => `${value - 280}px`);
  const particles = useMemo(
    () =>
      Array.from({ length: 42 }, (_, index) => ({
        id: index,
        left: `${(index * 23) % 100}%`,
        top: `${(index * 41) % 100}%`,
        delay: (index % 8) * 0.35,
        size: 2 + (index % 4),
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="cyber-grid" />
      <div className="noise" />
      <div className="aurora aurora-a" />
      <div className="aurora aurora-b" />
      <div className="mesh-wave" />
      <motion.div className="cursor-spotlight" style={{ x: spotlightX, y: spotlightY }} />
      <div className="circuit-lines"><span /><span /><span /><span /></div>
      <div className="geo-shapes"><i /><i /><i /></div>
      {particles.map((particle) => (
        <span className="particle" key={particle.id} style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size, animationDelay: `${particle.delay}s` }} />
      ))}
    </div>
  );
}

function Navbar({ portfolio, scrolled, menuOpen, setMenuOpen }) {
  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <a className="brand magnetic" href="#home" aria-label={`${portfolio.name} home`}>
        <span>{portfolio.initials}</span>
      </a>
      <nav className="hidden lg:flex">
        {navItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>
        ))}
      </nav>
      <button className="icon-button lg:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation">
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>
      <motion.div className="mobile-menu lg:hidden" initial={false} animate={menuOpen ? { opacity: 1, y: 0, pointerEvents: "auto" } : { opacity: 0, y: -16, pointerEvents: "none" }}>
        {navItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>
        ))}
      </motion.div>
    </header>
  );
}

function Hero({ portfolio }) {
  const typed = useTyping(portfolio.roles);
  return (
    <section id="home" className="section hero-section">
      <div className="hero-copy">
        <motion.p variants={fadeUp} initial="hidden" animate="visible" className="eyebrow">{portfolio.eyebrow}</motion.p>
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
          Hello,<span>I'm</span><strong>{portfolio.name}</strong>
        </motion.h1>
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="typing-line"><span>{typed}</span><i /></motion.div>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" className="hero-intro">{portfolio.intro}</motion.p>
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="hero-actions">
          <a className="primary-button magnetic" href={portfolio.resumeUrl} download><FiDownload /> Download Resume</a>
          <a className="secondary-button magnetic" href="#projects"><FiBarChart2 /> View Analytics Work</a>
          <a className="ghost-button magnetic" href="#contact"><FiSend /> Contact Me</a>
        </motion.div>
      </div>
      <AnalystVisual portfolio={portfolio} />
    </section>
  );
}

function AnalystVisual({ portfolio }) {
  const icons = [SiPython, FiDatabase, FiBarChart2, FiGrid, FiTrendingUp, SiPandas];
  return (
    <motion.div className="developer-visual" initial={{ opacity: 0, scale: 0.92, filter: "blur(16px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 1 }}>
      <div className="visual-grid" />
      <div className="ring ring-one" />
      <div className="ring ring-two" />
      <div className="avatar-panel">
        <div className="profile-photo-wrap">
          <img src="/profile.jpeg" alt={`${portfolio.name} profile`} />
        </div>
        <div className="code-window">
          <div className="window-dots"><span /><span /><span /></div>
          <pre>{`portfolio = {
  role: "${portfolio.headline}",
  tools: ["Python", "SQL", "Power BI"],
  focus: "Business insights"
}`}</pre>
        </div>
        <div className="developer-core">
          <FiBarChart2 />
          <span>DATA</span>
        </div>
        <div className="insight-chip insight-chip-one"><FiTrendingUp /> Insights</div>
        <div className="insight-chip insight-chip-two"><FiDatabase /> SQL</div>
        <div className="insight-chip insight-chip-three"><FiBarChart2 /> BI</div>
      </div>
      {icons.map((Icon, index) => (
        <motion.div className="floating-icon" key={index} style={{ "--angle": `${index * 60}deg` }} animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }} transition={{ duration: 4 + index * 0.2, repeat: Infinity, delay: index * 0.3 }}>
          <Icon />
        </motion.div>
      ))}
    </motion.div>
  );
}

function SectionTitle({ eyebrow, title, children }) {
  return (
    <motion.div className="section-title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </motion.div>
  );
}

function About({ portfolio }) {
  return (
    <section id="about" className="section">
      <SectionTitle eyebrow="About" title="Data stories built for decisions">{portfolio.about}</SectionTitle>
      <div className="about-grid">
        <motion.div className="glass-panel about-copy" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p>{portfolio.intro}</p>
          <div className="interest-list">
            {portfolio.interests.map((item) => <span key={item}><FiStar /> {item}</span>)}
          </div>
        </motion.div>
        <div className="stats-grid">
          {portfolio.stats.map((stat) => <CounterCard key={stat.label} {...stat} />)}
        </div>
      </div>
    </section>
  );
}

function MotionInsights({ cards }) {
  const [active, setActive] = useState(0);
  const selected = cards[active] || cards[0];

  return (
    <section className="section motion-insights-section">
      <SectionTitle eyebrow="Analytics Motion Cards" title="Select the proof points that matter">
        Resume-backed analytics outcomes from internship work, BI reporting, data quality, and automation.
      </SectionTitle>
      <div className="motion-insights-grid">
        <motion.div
          className="glass-panel insight-focus"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          layout
        >
          <span className="focus-kicker">Selected insight</span>
          <motion.strong key={selected.metric} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            {selected.metric}
          </motion.strong>
          <motion.h3 key={selected.title} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            {selected.title}
          </motion.h3>
          <motion.p key={selected.detail} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {selected.detail}
          </motion.p>
          <div className="focus-tags">
            {selected.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </motion.div>
        <div className="insight-card-rail" role="list" aria-label="Selectable analytics highlights">
          {cards.map((card, index) => (
            <motion.button
              type="button"
              role="listitem"
              className={`motion-card glass-panel ${active === index ? "active" : ""}`}
              key={card.title}
              onClick={() => setActive(index)}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.45 }}
              whileHover={{ y: -8, rotateX: 4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ delay: index * 0.06 }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{card.metric}</strong>
              <b>{card.title}</b>
              <FiArrowRight />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function CounterCard({ value, suffix, label }) {
  const [visible, setVisible] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (!visible) return undefined;
    const controls = animate(count, Number(value) || 0, { duration: 1.5, ease: "easeOut" });
    return () => controls.stop();
  }, [count, value, visible]);

  return (
    <motion.div className="glass-panel stat-card" onViewportEnter={() => setVisible(true)} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <motion.strong>{rounded}</motion.strong><b>{suffix}</b><span>{label}</span>
    </motion.div>
  );
}

function Skills({ groups }) {
  return (
    <section id="skills" className="section">
      <SectionTitle eyebrow="Skills" title="Analytics toolkit for clean insight" />
      <div className="skills-grid">
        {groups.map((group, groupIndex) => (
          <motion.article className="glass-panel skill-card" key={group.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: groupIndex * 0.08 }}>
            <h3><FiGrid /> {group.title}</h3>
            <div className="skill-list">
              {group.skills.map((skill) => {
                const Icon = iconMap[skill.name] || iconMap.default;
                return (
                  <div className="skill-row" key={skill.name}>
                    <span><Icon /> {skill.name}</span>
                    <div className="skill-track"><motion.i initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }} /></div>
                  </div>
                );
              })}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Projects({ projects }) {
  return (
    <section id="projects" className="section">
      <SectionTitle eyebrow="Projects" title="Analytics projects with measurable thinking" />
      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.article className="glass-panel project-card" key={project.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
            <div className="project-topline"><span>0{index + 1}</span><FiArrowRight /></div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="feature-list">{project.features.map((feature) => <span key={feature}>{feature}</span>)}</div>
            <div className="tech-list">{project.tech.map((tech) => <b key={tech}>{tech}</b>)}</div>
            <div className="project-actions">
              <a href={project.link || "https://github.com/"} target="_blank" rel="noreferrer"><FiGithub /> Project Link</a>
              <a href="#contact"><FiArrowRight /> Discuss</a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Timeline({ timeline }) {
  return (
    <section id="experience" className="section timeline-section">
      <SectionTitle eyebrow="Timeline" title="Education and experience" />
      <div id="education" className="timeline">
        {timeline.map((item, index) => (
          <motion.article className="timeline-item" key={`${item.title}-${item.place}`} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: index * 0.12 }}>
            <span>{item.type}</span>
            <div className="glass-panel"><h3>{item.title}</h3><h4>{item.place}</h4><p>{item.detail}</p></div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Certifications({ certifications }) {
  return (
    <section id="certifications" className="section">
      <SectionTitle eyebrow="Certifications" title="Learning that supports analysis" />
      <div className="cert-grid">
        {certifications.map((cert, index) => (
          <motion.div className="glass-panel cert-card" key={cert} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
            <FiAward /><h3>{cert}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Achievements({ achievements }) {
  return (
    <section id="achievements" className="section">
      <SectionTitle eyebrow="Achievements" title="Initiative beyond coursework" />
      <div className="achievement-grid">
        {achievements.map((achievement, index) => (
          <motion.div className="glass-panel achievement-card" key={achievement} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: index * 0.07 }}>
            <FiStar /><span>{achievement}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Contact({ contact }) {
  const iconForContact = (label) => {
    if (/github/i.test(label)) return FiGithub;
    if (/linkedin/i.test(label)) return FiLinkedin;
    if (/mail|email/i.test(label)) return FiMail;
    if (/phone|mobile/i.test(label)) return FiPhone;
    if (/kerala|india|location/i.test(label)) return FiMapPin;
    return FiSend;
  };

  return (
    <section id="contact" className="section contact-section">
      <SectionTitle eyebrow="Contact" title="Let's turn data into direction" />
      <div className="contact-grid">
        <motion.form className="glass-panel contact-form" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <label><span>Name</span><input type="text" name="name" autoComplete="name" /></label>
          <label><span>Email</span><input type="email" name="email" autoComplete="email" /></label>
          <label><span>Message</span><textarea name="message" rows="5" /></label>
          <button className="primary-button magnetic" type="button"><FiSend /> Send Message</button>
        </motion.form>
        <motion.div className="contact-links" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {contact.map(({ label, href }) => {
            const Icon = iconForContact(label);
            return <a className="glass-panel" key={label} href={href}><Icon /> <span>{label}</span></a>;
          })}
        </motion.div>
      </div>
    </section>
  );
}

function Footer({ name }) {
  return (
    <footer>
      <div className="footer-divider" />
      <p>Made with React</p>
      <p>Designed by {name}</p>
    </footer>
  );
}

function AdminGate({ children }) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(ADMIN_AUTH_KEY) === "true");

  const unlock = (event) => {
    event.preventDefault();
    if (passcode === ADMIN_PASSCODE) {
      sessionStorage.setItem(ADMIN_AUTH_KEY, "true");
      setUnlocked(true);
      setError("");
      return;
    }
    setError("Incorrect passcode.");
  };

  if (unlocked) return children;

  return (
    <main className="admin-page admin-login-page">
      <form className="admin-login-card" onSubmit={unlock}>
        <a className="admin-login-home" href="/"><FiHome /> Portfolio</a>
        <p className="eyebrow">Private Admin</p>
        <h1>Enter passcode</h1>
        <label className="admin-field">
          <span>Passcode</span>
          <input
            type="password"
            value={passcode}
            onChange={(event) => setPasscode(event.target.value)}
            autoFocus
            autoComplete="current-password"
          />
        </label>
        {error && <p className="admin-login-error">{error}</p>}
        <button type="submit" className="admin-save"><FiCheck /> Unlock Admin</button>
      </form>
    </main>
  );
}

function AdminPage({ portfolio, setPortfolio }) {
  const [draft, setDraft] = useState(portfolio);
  const [saved, setSaved] = useState(false);

  const updateField = (field, value) => setDraft((data) => ({ ...data, [field]: value }));
  const save = () => {
    savePortfolio(draft);
    setPortfolio(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };
  const reset = () => {
    setDraft(defaultPortfolio);
    savePortfolio(defaultPortfolio);
    setPortfolio(defaultPortfolio);
  };
  const exportJson = async () => {
    await navigator.clipboard.writeText(JSON.stringify(draft, null, 2));
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };
  const importJson = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        setDraft({ ...defaultPortfolio, ...JSON.parse(reader.result) });
      } catch {
        alert("That JSON file could not be imported.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <main className="admin-page">
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <a className="admin-logo" href="/"><FiHome /> Portfolio</a>
          <a href="#profile">Profile</a>
          <a href="#stats">Stats</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#timeline">Timeline</a>
          <a href="#lists">Lists</a>
          <a href="#contact">Contact</a>
        </aside>

        <section className="admin-content">
          <div className="admin-topbar">
            <div>
              <p className="eyebrow">Admin</p>
              <h1>Update portfolio information</h1>
            </div>
            <div className="admin-actions">
              <button type="button" onClick={exportJson}><FiCopy /> Copy JSON</button>
              <label className="admin-file-button"><FiUpload /> Import JSON<input type="file" accept="application/json" onChange={importJson} /></label>
              <button type="button" onClick={reset}><FiRefreshCcw /> Reset</button>
              <button type="button" className="admin-save" onClick={save}>{saved ? <FiCheck /> : <FiSave />} {saved ? "Saved" : "Save"}</button>
            </div>
          </div>

          <AdminSection id="profile" title="Profile">
            <div className="admin-grid two">
              <Field label="Name" value={draft.name} onChange={(value) => updateField("name", value)} />
              <Field label="Initials" value={draft.initials} onChange={(value) => updateField("initials", value)} />
              <Field label="Headline" value={draft.headline} onChange={(value) => updateField("headline", value)} />
              <Field label="Resume URL" value={draft.resumeUrl} onChange={(value) => updateField("resumeUrl", value)} />
            </div>
            <Field label="Eyebrow" value={draft.eyebrow} onChange={(value) => updateField("eyebrow", value)} />
            <Field label="Intro" value={draft.intro} onChange={(value) => updateField("intro", value)} multiline />
            <Field label="About" value={draft.about} onChange={(value) => updateField("about", value)} multiline />
            <TagEditor label="Typing Roles" value={draft.roles} onChange={(value) => updateField("roles", value)} />
            <TagEditor label="Interests" value={draft.interests} onChange={(value) => updateField("interests", value)} />
          </AdminSection>

          <AdminSection id="stats" title="Stats">
            <ListEditor
              items={draft.stats}
              onChange={(items) => updateField("stats", items)}
              createItem={() => ({ value: 1, suffix: "+", label: "New metric" })}
              renderItem={(item, update) => (
                <div className="admin-grid three">
                  <Field label="Value" value={item.value} onChange={(value) => update("value", Number(value) || 0)} />
                  <Field label="Suffix" value={item.suffix} onChange={(value) => update("suffix", value)} />
                  <Field label="Label" value={item.label} onChange={(value) => update("label", value)} />
                </div>
              )}
            />
          </AdminSection>

          <AdminSection id="skills" title="Skills">
            <ListEditor
              items={draft.skillGroups}
              onChange={(items) => updateField("skillGroups", items)}
              createItem={() => ({ title: "New Skill Group", skills: [{ name: "SQL", level: 75 }] })}
              renderItem={(group, update) => (
                <>
                  <Field label="Group title" value={group.title} onChange={(value) => update("title", value)} />
                  <SkillTagEditor skills={group.skills} onChange={(skills) => update("skills", skills)} />
                </>
              )}
            />
          </AdminSection>

          <AdminSection id="projects" title="Projects">
            <ListEditor
              items={draft.projects}
              onChange={(items) => updateField("projects", items)}
              createItem={() => ({ title: "New Project", description: "Describe the insight or dashboard.", features: [], tech: [], link: "https://github.com/" })}
              renderItem={(project, update) => (
                <>
                  <Field label="Title" value={project.title} onChange={(value) => update("title", value)} />
                  <Field label="Description" value={project.description} onChange={(value) => update("description", value)} multiline />
                  <Field label="Project Link" value={project.link} onChange={(value) => update("link", value)} />
                  <TagEditor label="Features" value={project.features} onChange={(value) => update("features", value)} />
                  <TagEditor label="Tools / Tech" value={project.tech} onChange={(value) => update("tech", value)} />
                </>
              )}
            />
          </AdminSection>

          <AdminSection id="timeline" title="Timeline">
            <ListEditor
              items={draft.timeline}
              onChange={(items) => updateField("timeline", items)}
              createItem={() => ({ type: "Experience", title: "New item", place: "Organization", detail: "Add details here." })}
              renderItem={(item, update) => (
                <div className="admin-grid two">
                  <Field label="Type" value={item.type} onChange={(value) => update("type", value)} />
                  <Field label="Title" value={item.title} onChange={(value) => update("title", value)} />
                  <Field label="Place" value={item.place} onChange={(value) => update("place", value)} />
                  <Field label="Detail" value={item.detail} onChange={(value) => update("detail", value)} multiline />
                </div>
              )}
            />
          </AdminSection>

          <AdminSection id="lists" title="Certifications and achievements">
            <TagEditor label="Certifications" value={draft.certifications} onChange={(value) => updateField("certifications", value)} />
            <TagEditor label="Achievements" value={draft.achievements} onChange={(value) => updateField("achievements", value)} />
          </AdminSection>

          <AdminSection id="contact" title="Contact links">
            <ListEditor
              items={draft.contact}
              onChange={(items) => updateField("contact", items)}
              createItem={() => ({ label: "New Link", href: "https://" })}
              renderItem={(item, update) => (
                <div className="admin-grid two">
                  <Field label="Label" value={item.label} onChange={(value) => update("label", value)} />
                  <Field label="URL" value={item.href} onChange={(value) => update("href", value)} />
                </div>
              )}
            />
          </AdminSection>
        </section>
      </div>
    </main>
  );
}

function AdminSection({ id, title, children }) {
  return (
    <section id={id} className="admin-card">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function Field({ label, value, onChange, multiline = false }) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      {multiline ? <textarea rows="4" value={value || ""} onChange={(event) => onChange(event.target.value)} /> : <input value={value ?? ""} onChange={(event) => onChange(event.target.value)} />}
    </label>
  );
}

function TagEditor({ label, value, onChange }) {
  const [entry, setEntry] = useState("");
  const add = () => {
    if (!entry.trim()) return;
    onChange([...(value || []), entry.trim()]);
    setEntry("");
  };
  const remove = (index) => onChange(value.filter((_, itemIndex) => itemIndex !== index));

  return (
    <div className="tag-editor">
      <span>{label}</span>
      <div className="tag-list">
        {(value || []).map((item, index) => (
          <button type="button" key={`${item}-${index}`} onClick={() => remove(index)}>{item}<FiX /></button>
        ))}
      </div>
      <div className="tag-input-row">
        <input value={entry} onChange={(event) => setEntry(event.target.value)} onKeyDown={(event) => event.key === "Enter" && (event.preventDefault(), add())} />
        <button type="button" onClick={add}><FiPlus /> Add</button>
      </div>
    </div>
  );
}

function SkillTagEditor({ skills, onChange }) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState(75);
  const add = () => {
    if (!name.trim()) return;
    onChange([...(skills || []), { name: name.trim(), level: Number(level) || 75 }]);
    setName("");
    setLevel(75);
  };
  const remove = (index) => onChange(skills.filter((_, itemIndex) => itemIndex !== index));

  return (
    <div className="tag-editor">
      <span>Skills</span>
      <div className="skill-admin-list">
        {(skills || []).map((skill, index) => (
          <div key={`${skill.name}-${index}`}>
            <b>{skill.name}</b>
            <input type="range" min="1" max="100" value={skill.level} onChange={(event) => onChange(skills.map((item, itemIndex) => itemIndex === index ? { ...item, level: Number(event.target.value) } : item))} />
            <em>{skill.level}%</em>
            <button type="button" onClick={() => remove(index)} aria-label={`Remove ${skill.name}`}><FiTrash2 /></button>
          </div>
        ))}
      </div>
      <div className="tag-input-row skill-input-row">
        <input placeholder="Skill name" value={name} onChange={(event) => setName(event.target.value)} />
        <input type="number" min="1" max="100" value={level} onChange={(event) => setLevel(event.target.value)} />
        <button type="button" onClick={add}><FiPlus /> Add</button>
      </div>
    </div>
  );
}

function ListEditor({ items, onChange, createItem, renderItem }) {
  const updateItem = (index, field, value) => onChange(items.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item));
  const removeItem = (index) => onChange(items.filter((_, itemIndex) => itemIndex !== index));
  const addItem = () => onChange([...(items || []), createItem()]);

  return (
    <div className="list-editor">
      {(items || []).map((item, index) => (
        <article className="list-editor-item" key={index}>
          <button type="button" className="delete-item" onClick={() => removeItem(index)}><FiTrash2 /> Remove</button>
          {renderItem(item, (field, value) => updateItem(index, field, value))}
        </article>
      ))}
      <button type="button" className="add-item" onClick={addItem}><FiPlus /> Add item</button>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
