"use client";

import Image from "next/image";
import { person } from "@/app/lib/content";
import styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <section id="hero" className={styles.hero} aria-labelledby="hero-headline">

      {/* ── Full-bleed 2:47 AM desk photo — blurred, darkened, behind everything ── */}
      <div className={styles.bgPhoto} aria-hidden="true">
        <Image
          src="/images/hero-desk.jpg"
          alt=""
          fill
          priority
          quality={60}
          sizes="100vw"
          className={styles.bgImg}
        />
        {/* Dark overlay so text stays readable */}
        <div className={styles.bgOverlay} />
      </div>

      {/* CSS ambient blobs (amber + blue) on top of the photo */}
      <div className={styles.bgFallback} aria-hidden="true" />

      <div className={styles.inner}>
        {/* ── Text column ── */}
        <div className={styles.text}>
          <p className={styles.chapterLabel}>
            <span>01 / 06</span>
            <span>2:47 AM</span>
          </p>

          <h1 id="hero-headline" className={styles.headline} data-reveal>
            Full-Stack <em className={styles.accent}>Developer</em>
            <br />& Software Engineer.
          </h1>

          <p className={styles.roles} aria-label="Current roles">
            <span>React &amp; Node.js</span>
            <span>Django REST</span>
            <span>AI &amp; Automation</span>
            <span>UI Design</span>
          </p>

          <p className={styles.tagline} data-reveal>
            {person.tagline}
          </p>

          <div className={styles.ctas} data-reveal>
            <a href="#projects" className="btn btn--amber">
              View Work
            </a>
            <a
              href={person.resumePdf}
              className="btn btn--ghost"
              download="Darshita_Singh_Resume.pdf"
              aria-label="Download Darshita Singh's resume PDF"
            >
              Download Resume ↓
            </a>
          </div>

          {/* Quick-facts strip */}
          <dl className={styles.quickFacts} data-reveal>
            {person.quickFacts.map((f) => (
              <div key={f.label} className={styles.fact}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── Portrait column ── */}
        <div className={styles.portrait}>
          <div className={styles.portraitCard} data-reveal>
            <div className={styles.portraitFrame}>
              <Image
                src={person.portrait}
                alt={person.portraitAlt}
                width={680}
                height={850}
                priority
                className={styles.portraitImg}
                sizes="(max-width: 1024px) 220px, 340px"
              />
            </div>

            {/* Availability badge */}
            <div className={styles.badge} aria-label="Availability: open to opportunities">
              <span className={styles.dot} aria-hidden="true" />
              <span>Open to opportunities</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
