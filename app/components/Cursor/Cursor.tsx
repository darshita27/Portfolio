"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Cursor.module.scss";

export default function Cursor() {
  const ringRef    = useRef<HTMLDivElement>(null);
  const dotRef     = useRef<HTMLDivElement>(null);
  const wrapRef    = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only run on devices with a mouse
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot: instant
      if (dotRef.current) {
        dotRef.current.style.left = mouseX + "px";
        dotRef.current.style.top  = mouseY + "px";
      }

      setVisible(true);
    };

    // Ring lags behind with lerp
    const loop = () => {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;

      if (ringRef.current) {
        ringRef.current.style.left = ringX + "px";
        ringRef.current.style.top  = ringY + "px";
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", () => setVisible(false));
    window.addEventListener("mouseenter", () => setVisible(true));

    // Hover state on interactive elements
    const interactives = document.querySelectorAll(
      "a, button, [role='button'], [tabindex]"
    );

    const addHover = () => wrapRef.current?.classList.add(styles.hovering);
    const rmHover  = () => wrapRef.current?.classList.remove(styles.hovering);

    interactives.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", rmHover);
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", rmHover);
      });
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`${styles.cursor} ${visible ? "" : styles.hidden}`}
      aria-hidden="true"
    >
      <div ref={ringRef} className={styles.ring} />
      <div ref={dotRef}  className={styles.dot}  />
    </div>
  );
}
