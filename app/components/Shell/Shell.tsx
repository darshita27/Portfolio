"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useAppStore } from "@/app/store/useAppStore";
import Loader from "@/app/components/Loader/Loader";
import Nav from "@/app/components/Nav/Nav";
import Hero from "@/app/components/Hero/Hero";
import About from "@/app/components/About/About";
import Skills from "@/app/components/Skills/Skills";
import Projects from "@/app/components/Projects/Projects";
import Experience from "@/app/components/Experience/Experience";
import Contact from "@/app/components/Contact/Contact";

// Lazy-load heavy client-only components
const BokehCanvas = dynamic(() => import("@/app/components/BokehCanvas/BokehCanvas"), {
  ssr: false,
});
const Cursor = dynamic(() => import("@/app/components/Cursor/Cursor"), {
  ssr: false,
});

export default function Shell() {
  const { loaderDone, setActiveChapter, setReducedMotion } = useAppStore();

  // Detect reduced motion preference once on mount
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [setReducedMotion]);

  // Start GSAP orchestrator after loader finishes
  useEffect(() => {
    if (!loaderDone) return;

    let cleanup: (() => void) | undefined;

    import("@/app/motion/orchestrator").then(({ initAnimations }) => {
      initAnimations(setActiveChapter).then(({ cleanup: c }) => {
        cleanup = c;
      });
    });

    return () => cleanup?.();
  }, [loaderDone, setActiveChapter]);

  return (
    <>
      <Loader />
      <Cursor />
      <BokehCanvas />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
