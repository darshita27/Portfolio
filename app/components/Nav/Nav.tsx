"use client";

import { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/app/store/useAppStore";
import { chapters, person } from "@/app/lib/content";
import styles from "./Nav.module.scss";

const NAV_LINKS = [
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Work",       href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact" },
];

export default function Nav() {
  const { activeChapter } = useAppStore();
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [displayTime, setDisplayTime] = useState<string>(chapters[0].time);

  // Interpolate clock time as user scrolls through chapters
  useEffect(() => {
    const ch = chapters[Math.min(activeChapter, chapters.length - 1)];
    setDisplayTime(ch.time);
  }, [activeChapter]);

  // Scrolled state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const chNum = chapters[Math.min(activeChapter, chapters.length - 1)].num;
  const chLabel = chapters[Math.min(activeChapter, chapters.length - 1)].label;

  return (
    <header className={`${styles.nav} ${scrolled ? styles["nav--scrolled"] : ""}`} role="banner">
      <div className={styles.inner}>
        {/* Chapter counter + clock */}
        <div className={styles.meta} aria-live="polite" aria-atomic="true">
          <span className={styles.chapterNum}>{chNum} / {String(chapters.length).padStart(2, "0")}</span>
          <span className={styles.separator}>—</span>
          <span className={styles.clock} aria-label={`Current scene: ${chLabel}, ${displayTime}`}>
            {displayTime}
          </span>
        </div>

        {/* Desktop nav links */}
        <nav className={styles.links} aria-label="Primary navigation">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className={styles.link} onClick={closeMenu}>
              {l.label}
            </a>
          ))}
          <a
            href={person.resumePdf}
            className={styles.resumeLink}
            download="Darshita_Singh_Resume.pdf"
            aria-label="Download Darshita Singh's resume PDF"
          >
            Resume ↓
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className={styles.hamburger}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-drawer"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-drawer"
        className={`${styles.drawer} ${menuOpen ? styles.open : ""}`}
        aria-hidden={!menuOpen}
      >
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} className={styles.link} onClick={closeMenu}>
            {l.label}
          </a>
        ))}
        <a
          href={person.resumePdf}
          className={styles.resumeLink}
          download="Darshita_Singh_Resume.pdf"
          onClick={closeMenu}
        >
          Resume ↓
        </a>
      </div>
    </header>
  );
}
