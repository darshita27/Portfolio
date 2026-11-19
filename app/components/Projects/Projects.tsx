"use client";

import { useRef, useEffect } from "react";
import { projects } from "@/app/lib/content";
import styles from "./Projects.module.scss";

function MetricCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const numericMatch = value.match(/^[\d,]+/);
    if (!numericMatch || !ref.current) return;

    const target = parseInt(numericMatch[0].replace(/,/g, ""), 10);
    if (isNaN(target)) return;

    const obs = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        const { gsap } = await import("gsap");
        const obj = { n: 0 };
        gsap.to(obj, {
          n: target,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: () => {
            if (ref.current) {
              ref.current.textContent = value.replace(/^[\d,]+/, String(Math.round(obj.n)));
            }
          },
        });
      },
      { threshold: 0.5 }
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div className={styles.metric}>
      <span ref={ref} className={styles.metricValue}>{value}</span>
      <span className={styles.metricLabel}>{label}</span>
    </div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className={`chapter ${styles.projects}`}
      aria-labelledby="projects-title"
      // Decorative background via CSS — avoids Next.js Image fill layout artefacts
      style={{
        backgroundImage: "url('/images/matrix-monitors.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay keeps the photo from distracting from content */}
      <div className={styles.bgOverlay} aria-hidden="true" />

      <div className={styles.inner}>
        <p className={styles.chapterLabel}>
          <span>04 / 06</span>
          <span>The Build</span>
        </p>

        <h2 id="projects-title" className={styles.title}>
          What I've <em>shipped.</em>
        </h2>

        <div className={styles.list}>
          {projects.map((p) => (
            <article key={p.id} className={styles.card} data-reveal>
              <div className={styles.cardIndex} aria-hidden="true">{p.index}</div>

              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                  <span className={styles.cardCategory}>{p.category}</span>
                </div>

                <div className={styles.cols}>
                  <div className={styles.col}>
                    <span className={styles.colLabel}>Problem</span>
                    <p className={styles.colText}>{p.problem}</p>
                  </div>
                  <div className={styles.col}>
                    <span className={styles.colLabel}>Approach</span>
                    <p className={styles.colText}>{p.approach}</p>
                  </div>
                  <div className={styles.col}>
                    <span className={styles.colLabel}>Outcome</span>
                    <p className={styles.colText}>{p.outcome}</p>
                  </div>
                </div>

                <MetricCounter value={p.metric.value} label={p.metric.label} />

                <div className={styles.stack} aria-label={`Stack: ${p.stack.join(", ")}`}>
                  {p.stack.map((t) => (
                    <span key={t} className={styles.stackTag}>{t}</span>
                  ))}
                </div>

                <div className={styles.links}>
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      className={`${styles.linkBtn} ${styles["linkBtn--primary"]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${p.title} live (opens in new tab)`}
                    >
                      Live ↗
                    </a>
                  )}
                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      className={styles.linkBtn}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${p.title} source on GitHub (opens in new tab)`}
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
