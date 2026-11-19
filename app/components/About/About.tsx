"use client";

import { useEffect, useRef } from "react";
import { about, person } from "@/app/lib/content";
import styles from "./About.module.scss";

function WordSplit({ text }: { text: string }) {
  const words = text.trim().split(/\s+/);
  return (
    <>
      {words.map((word, i) => (
        <span key={i} className={styles.word} data-word>
          {word}{" "}
        </span>
      ))}
    </>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert?: () => void } | null = null;

    const init = async () => {
      const { gsap }          = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const words = sectionRef.current!.querySelectorAll("[data-word]");
        const count = words.length;

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 40%",
          scrub: 0.8,
          onUpdate: (self) => {
            const progress = self.progress;
            words.forEach((w, i) => {
              if (progress >= i / count) w.classList.add(styles.lit);
              else w.classList.remove(styles.lit);
            });
          },
        });

        // Note: quoteBlock is in the sticky left column (always in viewport).
        // A scroll trigger on it never fires, so we skip the GSAP animation
        // and let it render at full opacity via CSS instead.
      }, sectionRef);
    };

    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (!mq.matches) init();
      else sectionRef.current?.querySelectorAll("[data-word]").forEach((w) => w.classList.add(styles.lit));
    }

    return () => { ctx?.revert?.(); };
  }, []);

  return (
    <section
      id="about"
      className={`chapter ${styles.about}`}
      ref={sectionRef}
      aria-labelledby="about-title"
    >
      <span className={styles.sectionNum} aria-hidden="true">02</span>

      <div className={styles.inner}>
        <p className={styles.chapterLabel}>
          <span>02 / 06</span>
          <span>Obsession</span>
        </p>

        <div className={styles.grid}>
          {/* ── Left: title + quote ── */}
          <div className={styles.titleCol}>
            <h2 id="about-title" className={styles.title}>
              Why I <em>build.</em>
            </h2>
            <p className={styles.location}>{person.location}</p>

            {/* Inspirational quote — sits below the heading in the left column */}
            <blockquote className={styles.quoteBlock}>
              <p className={styles.quote}>"{about.philosophy.text}"</p>
              <footer className={styles.attribution}>
                — {about.philosophy.attribution}
              </footer>
            </blockquote>
          </div>

          {/* ── Right: scroll-lit story only ── */}
          <div className={styles.storyCol}>
            <p className={styles.story}>
              <WordSplit text={about.story} />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
