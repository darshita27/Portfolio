// =============================================================================
// GSAP animation orchestrator
// Manages:
//   - Lenis smooth scroll (driven by gsap.ticker)
//   - Master intro timeline (loader exit → hero reveal)
//   - Per-chapter ScrollTrigger timelines
//   - Chapter tracking for the nav clock
//   - Reduced-motion guard (via gsap.matchMedia)
// =============================================================================

// Lazy-load heavy imports — called only after loader exits
export async function initAnimations(
  onChapterChange: (idx: number) => void
) {
  const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
    import("lenis"),
  ]);

  gsap.registerPlugin(ScrollTrigger);

  // ── Lenis smooth scroll ────────────────────────────────────────────────────
  const lenis = new Lenis({ autoRaf: false });

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  lenis.on("scroll", () => {
    ScrollTrigger.update();
  });

  // ── Easing tokens (reused throughout) ─────────────────────────────────────
  const EXPO_OUT = "expo.out";

  // ── gsap.matchMedia — desktop vs mobile vs reduced-motion ─────────────────
  const mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop:     "(min-width: 769px) and (prefers-reduced-motion: no-preference)",
      isMobile:      "(max-width: 768px) and (prefers-reduced-motion: no-preference)",
      reducedMotion: "(prefers-reduced-motion: reduce)",
    },
    (ctx) => {
      const { reducedMotion } = ctx.conditions!;

      if (reducedMotion) {
        // Ensure everything is fully visible — nothing to animate
        gsap.set("[data-reveal]", { opacity: 1, y: 0, clearProps: "all" });
        return;
      }

      // ── Step 1: Set ALL [data-reveal] elements to their hidden start state.
      // We do this in JS (not CSS) so elements are never invisible before GSAP loads.
      // CSS has [data-reveal] { opacity:1; transform:none } as the safe default.
      gsap.set("[data-reveal]", { opacity: 0, y: 32 });

      // ── Step 2: Immediately reveal hero elements (above the fold).
      // These cannot use a scroll trigger because they are already in the viewport.
      const heroTl = gsap.timeline({ delay: 0.05 });
      heroTl.to("#hero [data-reveal]", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: EXPO_OUT,
        stagger: 0.12,
        clearProps: "transform,opacity",
      });

      // ── Step 3: Scroll-reveal for all OTHER [data-reveal] elements.
      // Use ScrollTrigger.batch with onEnter + onEnterBack so elements
      // that are already in the viewport on init are also revealed.
      ScrollTrigger.batch("[data-reveal]:not(#hero [data-reveal])", {
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: EXPO_OUT,
            stagger: 0.08,
            clearProps: "transform,opacity",
            overwrite: true,
          });
        },
        // Also handle elements already in view when ScrollTrigger initialises
        onEnterBack: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: EXPO_OUT,
            stagger: 0.05,
            clearProps: "transform,opacity",
            overwrite: true,
          });
        },
        start: "top 90%",
        once: true,
      });

      // ── Chapter tracking ──────────────────────────────────────────────────
      const sections = ["#hero", "#about", "#skills", "#projects", "#experience", "#contact"];
      sections.forEach((id, i) => {
        const el = document.querySelector(id);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 50%",
          end: "bottom 50%",
          onEnter:     () => onChapterChange(i),
          onEnterBack: () => onChapterChange(i),
        });
      });
    }
  );

  // Refresh once fonts are loaded so ScrollTrigger recalculates positions
  if (document.fonts) {
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
      // After refresh, force-reveal any [data-reveal] still at opacity:0
      // (safety net in case a scroll trigger missed an element)
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: EXPO_OUT,
            clearProps: "transform,opacity",
            overwrite: true,
          });
        }
      });
    });
  }

  return { lenis, cleanup: () => { mm.revert(); lenis.destroy(); } };
}
