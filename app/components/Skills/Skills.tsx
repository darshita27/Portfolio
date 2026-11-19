"use client";

import { useState, useRef, useEffect } from "react";
import { skillGroups } from "@/app/lib/content";
import styles from "./Skills.module.scss";

// SVG desk illustration — original line-art, 1.5px stroke
// Objects map to skill groups via data-object attributes
function DeskIllustration({
  activeObject,
  onHover,
  drawn,
}: {
  activeObject: string | null;
  onHover: (id: string | null) => void;
  drawn: boolean;
}) {
  const isActive = (id: string) => activeObject === id;

  return (
    <svg
      className={`${styles.deskSvg} ${drawn ? styles.drawn : ""}`}
      viewBox="0 0 520 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Illustrated desk. Hover or click objects to reveal skill groups."
      role="img"
    >
      {/* ── Desk surface ── */}
      <path
        className={styles.strokePath}
        d="M20 300 H500 V340 H20 Z"
        stroke="#1A1D23"
        strokeWidth="1.5"
        fill="#101216"
      />

      {/* ── Monitor left ── */}
      <g
        className={`${styles.deskObject} ${isActive("monitor-left") ? styles.active : ""}`}
        onClick={() => onHover(isActive("monitor-left") ? null : "monitor-left")}
        onMouseEnter={() => onHover("monitor-left")}
        onMouseLeave={() => onHover(null)}
        role="button"
        tabIndex={0}
        aria-label="Left monitor — Frontend skills"
        onKeyDown={(e) => e.key === "Enter" && onHover(isActive("monitor-left") ? null : "monitor-left")}
      >
        {/* Screen */}
        <rect className={styles.strokePath} x="30" y="140" width="180" height="140" rx="4" stroke="#FFB43B" strokeWidth="1.5" fill="#101216" />
        {/* Code lines */}
        <line className={styles.strokePath} x1="46" y1="162" x2="120" y2="162" stroke="#3D6BFF" strokeWidth="1.5" />
        <line className={styles.strokePath} x1="46" y1="176" x2="100" y2="176" stroke="#8B8F98" strokeWidth="1" />
        <line className={styles.strokePath} x1="46" y1="190" x2="130" y2="190" stroke="#8B8F98" strokeWidth="1" />
        <line className={styles.strokePath} x1="46" y1="204" x2="90"  y2="204" stroke="#3D6BFF" strokeWidth="1.5" />
        <line className={styles.strokePath} x1="46" y1="218" x2="110" y2="218" stroke="#8B8F98" strokeWidth="1" />
        <line className={styles.strokePath} x1="46" y1="232" x2="140" y2="232" stroke="#8B8F98" strokeWidth="1" />
        {/* Stand */}
        <line className={styles.strokePath} x1="120" y1="280" x2="120" y2="300" stroke="#1A1D23" strokeWidth="1.5" />
        <line className={styles.strokePath} x1="90"  y1="300" x2="150" y2="300" stroke="#1A1D23" strokeWidth="1.5" />
      </g>

      {/* ── Monitor right ── */}
      <g
        className={`${styles.deskObject} ${isActive("monitor-right") ? styles.active : ""}`}
        onClick={() => onHover(isActive("monitor-right") ? null : "monitor-right")}
        onMouseEnter={() => onHover("monitor-right")}
        onMouseLeave={() => onHover(null)}
        role="button"
        tabIndex={0}
        aria-label="Right monitor — Backend skills"
        onKeyDown={(e) => e.key === "Enter" && onHover(isActive("monitor-right") ? null : "monitor-right")}
      >
        <rect className={styles.strokePath} x="230" y="130" width="200" height="150" rx="4" stroke="#FFB43B" strokeWidth="1.5" fill="#101216" />
        <line className={styles.strokePath} x1="246" y1="152" x2="340" y2="152" stroke="#3D6BFF" strokeWidth="1.5" />
        <line className={styles.strokePath} x1="246" y1="166" x2="310" y2="166" stroke="#8B8F98" strokeWidth="1" />
        <line className={styles.strokePath} x1="246" y1="180" x2="360" y2="180" stroke="#8B8F98" strokeWidth="1" />
        <line className={styles.strokePath} x1="246" y1="194" x2="290" y2="194" stroke="#FFB43B" strokeWidth="1.5" />
        <line className={styles.strokePath} x1="246" y1="208" x2="320" y2="208" stroke="#8B8F98" strokeWidth="1" />
        <line className={styles.strokePath} x1="246" y1="222" x2="350" y2="222" stroke="#8B8F98" strokeWidth="1" />
        <line className={styles.strokePath} x1="246" y1="236" x2="300" y2="236" stroke="#3D6BFF" strokeWidth="1.5" />
        <line className={styles.strokePath} x1="330" y1="280" x2="330" y2="300" stroke="#1A1D23" strokeWidth="1.5" />
        <line className={styles.strokePath} x1="300" y1="300" x2="360" y2="300" stroke="#1A1D23" strokeWidth="1.5" />
      </g>

      {/* ── Keyboard ── */}
      <g
        className={`${styles.deskObject} ${isActive("keyboard") ? styles.active : ""}`}
        onClick={() => onHover(isActive("keyboard") ? null : "keyboard")}
        onMouseEnter={() => onHover("keyboard")}
        onMouseLeave={() => onHover(null)}
        role="button"
        tabIndex={0}
        aria-label="Keyboard — Languages"
        onKeyDown={(e) => e.key === "Enter" && onHover(isActive("keyboard") ? null : "keyboard")}
      >
        <rect className={styles.strokePath} x="150" y="306" width="220" height="50" rx="4" stroke="#ECE6DA" strokeWidth="1.5" fill="#101216" />
        {[0,1,2,3,4,5,6,7,8].map((i) => (
          <rect key={i} x={160 + i * 22} y="316" width="16" height="10" rx="2" stroke="#1A1D23" strokeWidth="1" fill="#101216" />
        ))}
        {[0,1,2,3,4,5,6,7].map((i) => (
          <rect key={i} x={165 + i * 22} y="332" width="16" height="10" rx="2" stroke="#1A1D23" strokeWidth="1" fill="#101216" />
        ))}
      </g>

      {/* ── Lamp ── */}
      <g
        className={`${styles.deskObject} ${isActive("lamp") ? styles.active : ""}`}
        onClick={() => onHover(isActive("lamp") ? null : "lamp")}
        onMouseEnter={() => onHover("lamp")}
        onMouseLeave={() => onHover(null)}
        role="button"
        tabIndex={0}
        aria-label="Desk lamp — AI & Automation skills"
        onKeyDown={(e) => e.key === "Enter" && onHover(isActive("lamp") ? null : "lamp")}
      >
        {/* Base */}
        <ellipse className={styles.strokePath} cx="460" cy="300" rx="28" ry="6" stroke="#ECE6DA" strokeWidth="1.5" fill="none" />
        {/* Arm */}
        <path className={styles.strokePath} d="M460 294 L452 240 L468 180" stroke="#ECE6DA" strokeWidth="1.5" fill="none" />
        {/* Shade */}
        <path className={styles.strokePath} d="M452 180 L484 174 L476 196 L444 202 Z" stroke="#FFB43B" strokeWidth="1.5" fill="rgba(255,180,59,0.08)" />
        {/* Glow */}
        <ellipse cx="464" cy="210" rx="40" ry="20" fill="rgba(255,180,59,0.06)" />
      </g>

      {/* ── Mug ── */}
      <g
        className={`${styles.deskObject} ${isActive("mug") ? styles.active : ""}`}
        onClick={() => onHover(isActive("mug") ? null : "mug")}
        onMouseEnter={() => onHover("mug")}
        onMouseLeave={() => onHover(null)}
        role="button"
        tabIndex={0}
        aria-label="Coffee mug — Auth & Security skills"
        onKeyDown={(e) => e.key === "Enter" && onHover(isActive("mug") ? null : "mug")}
      >
        <rect className={styles.strokePath} x="62" y="264" width="40" height="36" rx="4" stroke="#ECE6DA" strokeWidth="1.5" fill="#101216" />
        {/* Handle */}
        <path className={styles.strokePath} d="M102 272 Q118 272 118 282 Q118 292 102 292" stroke="#ECE6DA" strokeWidth="1.5" fill="none" />
        {/* Code mark */}
        <text x="69" y="287" fontFamily="monospace" fontSize="10" fill="#FFB43B">&lt;/&gt;</text>
        {/* Steam */}
        <path className={styles.strokePath} d="M76 258 Q78 250 76 242" stroke="#8B8F98" strokeWidth="1" fill="none" />
        <path className={styles.strokePath} d="M86 256 Q88 248 86 240" stroke="#8B8F98" strokeWidth="1" fill="none" />
      </g>

      {/* ── Notebook ── */}
      <g
        className={`${styles.deskObject} ${isActive("notebook") ? styles.active : ""}`}
        onClick={() => onHover(isActive("notebook") ? null : "notebook")}
        onMouseEnter={() => onHover("notebook")}
        onMouseLeave={() => onHover(null)}
        role="button"
        tabIndex={0}
        aria-label="Notebook — Databases"
        onKeyDown={(e) => e.key === "Enter" && onHover(isActive("notebook") ? null : "notebook")}
      >
        <rect className={styles.strokePath} x="390" y="270" width="60" height="30" rx="2" stroke="#ECE6DA" strokeWidth="1.5" fill="#101216" />
        <line className={styles.strokePath} x1="398" y1="278" x2="442" y2="278" stroke="#8B8F98" strokeWidth="0.75" />
        <line className={styles.strokePath} x1="398" y1="284" x2="438" y2="284" stroke="#8B8F98" strokeWidth="0.75" />
        <line className={styles.strokePath} x1="398" y1="290" x2="442" y2="290" stroke="#8B8F98" strokeWidth="0.75" />
      </g>

      {/* ── Small plant ── */}
      <g
        className={`${styles.deskObject} ${isActive("plant") ? styles.active : ""}`}
        onClick={() => onHover(isActive("plant") ? null : "plant")}
        onMouseEnter={() => onHover("plant")}
        onMouseLeave={() => onHover(null)}
        role="button"
        tabIndex={0}
        aria-label="Plant — Tools & Platforms"
        onKeyDown={(e) => e.key === "Enter" && onHover(isActive("plant") ? null : "plant")}
      >
        {/* Pot */}
        <path className={styles.strokePath} d="M478 300 L470 268 H486 Z" stroke="#ECE6DA" strokeWidth="1.5" fill="#101216" />
        {/* Stem */}
        <line className={styles.strokePath} x1="478" y1="268" x2="478" y2="248" stroke="#ECE6DA" strokeWidth="1.5" />
        {/* Leaves */}
        <path className={styles.strokePath} d="M478 260 Q462 252 460 238 Q470 242 478 252" stroke="#ECE6DA" strokeWidth="1.5" fill="rgba(236,230,218,0.05)" />
        <path className={styles.strokePath} d="M478 254 Q494 246 496 232 Q486 236 478 246" stroke="#ECE6DA" strokeWidth="1.5" fill="rgba(236,230,218,0.05)" />
      </g>
    </svg>
  );
}

export default function Skills() {
  const [activeObject, setActiveObject] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef     = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setDrawn(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const activeGroup = skillGroups.find((g) => g.deskObject === activeObject) ?? null;

  return (
    <section
      id="skills"
      className={`chapter ${styles.skills}`}
      ref={sectionRef}
      aria-labelledby="skills-title"
      style={{
        backgroundImage: "url('/images/city-desk.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={styles.bgOverlay} aria-hidden="true" />

      <div className={styles.inner}>
        <p className={styles.chapterLabel}>
          <span>03 / 06</span>
          <span>The Desk</span>
        </p>

        <h2 id="skills-title" className={styles.title}>
          What I work <em>with.</em>
        </h2>

        <div className={styles.deskArea}>
          {/* SVG desk illustration */}
          <div ref={svgRef} data-reveal>
            <DeskIllustration
              activeObject={activeObject}
              onHover={setActiveObject}
              drawn={drawn}
            />
          </div>

          {/* Skill panel */}
          <div className={styles.panelArea} data-reveal>
            {/* Hint text — dims when a group is active */}
            <p className={`${styles.hintText} ${activeGroup ? styles.dimmed : ""}`}>
              {activeGroup ? activeGroup.label : "← Hover an object"}
            </p>

            {/* Panel — slides in/out; content keyed to group id so it re-animates on change */}
            <div className={`${styles.panel} ${activeGroup ? styles.visible : ""}`}>
              {activeGroup && (
                <div key={activeGroup.id} className={styles.panelContent}>
                  <p className={styles.panelLabel}>{activeGroup.label}</p>
                  <div className={styles.tags}>
                    {activeGroup.skills.map((s) => (
                      <span key={s} className={styles.tag}>{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Fallback grid — fades out when panel is active */}
            <div className={`${styles.fallbackGrid} ${activeGroup ? styles.hidden : ""}`}>
              {skillGroups.map((g) => (
                <div key={g.id} className={styles.groupCard}>
                  <p className={styles.groupLabel}>{g.label}</p>
                  <div className={styles.tags}>
                    {g.skills.map((s) => (
                      <span key={s} className={styles.tag}>{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
