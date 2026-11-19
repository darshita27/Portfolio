"use client";

import { useRef, useEffect } from "react";
import { experience, education } from "@/app/lib/content";
import styles from "./Experience.module.scss";

export default function Experience() {
  const lineRef    = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null;

    if (mq?.matches) {
      if (lineRef.current) lineRef.current.style.transform = "scaleY(1)";
      sectionRef.current
        ?.querySelectorAll("[data-timeline-item]")
        .forEach((el) => ((el as HTMLElement).style.opacity = "1"));
      return;
    }

    const init = async () => {
      const { gsap }          = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 55%",
          end: "bottom 65%",
          scrub: 1,
        },
      });

      sectionRef.current!
        .querySelectorAll("[data-timeline-item]")
        .forEach((el, i) => {
          gsap.fromTo(
            el,
            { opacity: 0, x: -16 },
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              ease: "power3.out",
              delay: i * 0.12,
              scrollTrigger: { trigger: el, start: "top 82%" },
            }
          );
        });
    };

    init();
  }, []);

  return (
    <section
      id="experience"
      className={`chapter ${styles.experience}`}
      ref={sectionRef}
      aria-labelledby="exp-title"
    >
      <div className={styles.inner}>
        <p className={styles.chapterLabel}>
          <span>05 / 06</span>
          <span>The Room</span>
        </p>

        <h2 id="exp-title" className={styles.title}>
          Where I've <em>worked.</em>
        </h2>

        <div className={styles.grid}>

          {/* ── Experience timeline (left) ── */}
          <div className={styles.timeline}>
            <div ref={lineRef} className={styles.timelineLine} aria-hidden="true" />

            {experience.map((exp) => (
              <article key={exp.id} className={styles.item} data-timeline-item>
                <div className={styles.dot} aria-hidden="true" />
                <span className={styles.index} aria-hidden="true">{exp.index}</span>

                <div className={styles.topRow}>
                  <h3 className={styles.company}>{exp.company}</h3>
                  <span className={styles.period}>{exp.period}</span>
                </div>

                <div className={styles.roleRow}>
                  <span className={styles.role}>{exp.role}</span>
                  <span className={styles.type}>{exp.type}</span>
                </div>

                <span className={styles.domain}>{exp.domain}</span>
                <p className={styles.summary}>{exp.summary}</p>

                <div className={styles.highlight}>
                  <span className={styles.highlightDot} aria-hidden="true" />
                  {exp.highlight}
                </div>

                {exp.tech.length > 0 && (
                  <div className={styles.techRow} aria-label={`Technologies: ${exp.tech.join(", ")}`}>
                    {exp.tech.map((t) => (
                      <span key={t} className={styles.techTag}>{t}</span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* ── Education sidebar (right) ── */}
          <aside className={styles.sidebar} aria-labelledby="edu-heading">
            <h3 id="edu-heading" className={styles.sidebarLabel}>Education</h3>
            {education.map((edu, i) => (
              <div key={i} className={styles.eduItem} data-reveal>
                <p className={styles.eduDegree}>{edu.degree}</p>
                <p className={styles.eduMeta}>{edu.institution} · {edu.period}</p>
                {"cgpa"  in edu && <p className={styles.eduScore}>{edu.cgpa}</p>}
                {"score" in edu && <p className={styles.eduScore}>{(edu as { score: string }).score}</p>}
              </div>
            ))}
          </aside>

        </div>
      </div>
    </section>
  );
}
