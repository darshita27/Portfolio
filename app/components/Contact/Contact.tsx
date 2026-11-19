"use client";

import { contact, person } from "@/app/lib/content";
import styles from "./Contact.module.scss";

export default function Contact() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <section
      id="contact"
      className={`chapter ${styles.contact}`}
      aria-labelledby="contact-title"
    >
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <p className={styles.chapterLabel}>
          <span>06 / 06</span>
          <span>Morning</span>
        </p>

        {/* Headline above email */}
        <h2 id="contact-title" className={styles.contactHeadline} data-reveal>
          Got something worth building?{" "}
          <em className={styles.contactHeadlineAccent}>Say hello.</em>
        </h2>

        {/* Giant email */}
        <div className={styles.emailWrap} data-reveal>
          <a
            href={`mailto:${person.email}`}
            className={styles.emailLink}
            aria-label={`Send an email to Darshita Singh at ${person.email}`}
          >
            {contact.emailDisplay}
          </a>
        </div>

        {/* Three-step block */}
        <div className={styles.steps} data-reveal aria-label="How to reach me">
          {contact.steps.map((s) => (
            <div key={s.num} className={styles.step}>
              <span className={styles.stepNum}>{s.num}</span>
              <span className={styles.stepLabel}>{s.label}</span>
              <p className={styles.stepDetail}>{s.detail}</p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className={styles.ctas} data-reveal>
          <a href={`mailto:${person.email}`} className="btn btn--amber">
            Write to me
          </a>
          <a
            href={person.resumePdf}
            className="btn btn--ghost"
            download="Darshita_Singh_Resume.pdf"
          >
            Download Resume ↓
          </a>
        </div>

        {/* Social links */}
        <div className={styles.social} data-reveal>
          <a
            href={person.github}
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (opens in new tab)"
          >
            GitHub ↗
          </a>
          <a
            href={person.linkedin}
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile (opens in new tab)"
          >
            LinkedIn ↗
          </a>
          <a
            href={`mailto:${person.email}`}
            className={styles.socialLink}
            aria-label="Send email"
          >
            Email
          </a>
        </div>

        {/* Footer */}
        <footer className={styles.footer}>
          <p className={styles.footerText}>
            Designed &amp; developed by Darshita Singh · © 2026
          </p>
          <button
            className={styles.backTop}
            onClick={scrollToTop}
            aria-label="Scroll back to top"
          >
            Back to top ↑
          </button>
        </footer>
      </div>
    </section>
  );
}
