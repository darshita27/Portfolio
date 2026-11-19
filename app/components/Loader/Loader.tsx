"use client";

import { useEffect, useRef } from "react";
import { useAppStore } from "@/app/store/useAppStore";
import styles from "./Loader.module.scss";

// Terminal lines shown during loading — written in Darshita's voice
const TERMINAL_LINES = [
  { prompt: "→", text: "waking the desk lamp…" },
  { prompt: "→", text: "loading the story…" },
  { prompt: "→", text: "compiling 3 years of builds…" },
  { prompt: "→", text: "brewing the late-night coffee…" },
  { prompt: "✓", text: "ready.", done: true },
];

export default function Loader() {
  const loaderRef   = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef  = useRef<HTMLSpanElement>(null);
  const lineRefs    = useRef<(HTMLDivElement | null)[]>([]);
  // A ref-based cancelled guard so each effect invocation owns its own flag.
  // This survives React 18 Strict Mode double-invoke correctly.
  const cancelledRef = useRef(false);

  const { setLoaderDone, setPhase, reducedMotion } = useAppStore();

  useEffect(() => {
    // Reset for this invocation
    cancelledRef.current = false;

    // Skip loader if already seen this session, or reduced motion
    const alreadySeen = sessionStorage.getItem("loaderSeen") === "true";
    if (alreadySeen || reducedMotion) {
      if (loaderRef.current) loaderRef.current.style.display = "none";
      setLoaderDone();
      return;
    }

    setPhase("loading");

    const run = async () => {
      // Lazy-load GSAP
      const { gsap } = await import("gsap");

      // If the effect was cleaned up while we awaited the import, bail out immediately
      if (cancelledRef.current) return;

      const bar     = progressRef.current;
      const counter = counterRef.current;
      if (!bar || !counter || !loaderRef.current) return;

      // Animate counter 0 → 100 and progress bar
      gsap.to({ val: 0 }, {
        val: 100,
        duration: 1.6,
        ease: "power2.inOut",
        onUpdate: function (this: gsap.core.Tween) {
          if (cancelledRef.current) return;
          const v = Math.round((this.targets()[0] as { val: number }).val);
          if (counter) counter.textContent = String(v).padStart(3, "0");
          if (bar)     bar.style.width = v + "%";
        },
      });

      const MIN_SHOW = 900; // ms minimum loader visibility
      const start    = Date.now();

      // Type each terminal line sequentially
      for (let i = 0; i < TERMINAL_LINES.length; i++) {
        if (cancelledRef.current) return;

        const lineEl = lineRefs.current[i];
        if (!lineEl) continue;
        const textEl = lineEl.querySelector<HTMLElement>(`.${styles.text}`);
        if (!textEl) continue;

        const fullText = TERMINAL_LINES[i].text;

        gsap.set(lineEl, { opacity: 1 });

        // Typewriter via setInterval
        await new Promise<void>((resolve) => {
          let idx = 0;
          const interval = setInterval(() => {
            if (cancelledRef.current) {
              clearInterval(interval);
              resolve();
              return;
            }
            idx++;
            textEl.textContent = fullText.slice(0, idx);
            if (idx >= fullText.length) {
              clearInterval(interval);
              resolve();
            }
          }, 40);
        });

        if (cancelledRef.current) return;
        await new Promise<void>((r) => setTimeout(r, 160));
      }

      if (cancelledRef.current) return;

      // Ensure minimum visible time
      const elapsed = Date.now() - start;
      const remaining = MIN_SHOW - elapsed;
      if (remaining > 0) {
        await new Promise<void>((r) => setTimeout(r, remaining));
      }

      if (cancelledRef.current) return;

      // Exit: clip-path curtain lifts
      await gsap.to(loaderRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.8,
        ease: "power3.inOut",
      });

      if (cancelledRef.current) return;

      if (loaderRef.current) loaderRef.current.style.display = "none";
      sessionStorage.setItem("loaderSeen", "true");
      setLoaderDone();
    };

    run();

    // Cleanup: mark as cancelled so any in-flight async steps stop
    return () => {
      cancelledRef.current = true;
    };
  }, [reducedMotion, setLoaderDone, setPhase]);

  return (
    <div ref={loaderRef} className={styles.loader} aria-hidden="true" role="presentation">
      {/* Oversized outlined counter */}
      <span ref={counterRef} className={styles.counter} aria-hidden="true">000</span>

      {/* Terminal lines */}
      <div className={styles.terminal}>
        {TERMINAL_LINES.map((line, i) => (
          <div
            key={i}
            ref={(el) => { lineRefs.current[i] = el; }}
            className={`${styles.line} ${line.done ? styles["line--done"] : ""}`}
            style={{ opacity: 0 }}
          >
            <span className={styles.prompt}>{line.prompt}</span>
            <span className={styles.text}></span>
          </div>
        ))}
      </div>

      {/* Progress hairline */}
      <div className={styles.progress} role="progressbar" aria-valuemin={0} aria-valuemax={100}>
        <div ref={progressRef} className={styles.progressBar} />
      </div>
    </div>
  );
}
