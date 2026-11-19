"use client";

import { useEffect, useRef } from "react";

// Module-level singleton guard.
// React 18 Strict Mode double-mounts effects. requestIdleCallback is async,
// so both mounts can reach the renderer-creation point before either cleanup
// runs. A module-level flag ensures only one WebGL instance ever initialises
// per page load, eliminating "Canvas has an existing context of a different
// type" across all Strict Mode invocations.
let webglInitialised = false;

export default function BokehCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if ((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData) return;

    // If a previous invocation (Strict Mode mount #1) already started, skip.
    if (webglInitialised) return;
    webglInitialised = true;

    let animId     = 0;
    let ownCanvas: HTMLCanvasElement | null = null;
    let stopped    = false;

    const load = async () => {
      const container = containerRef.current;
      if (!container || stopped) return;

      // Capability check on a throwaway canvas — never the real one
      const test = document.createElement("canvas");
      const ok   = test.getContext("webgl2") || test.getContext("webgl");
      if (!ok) return;

      const THREE = await import("three");
      if (stopped) return;

      // Fresh canvas for this run — appended imperatively, removed on cleanup
      const canvas = document.createElement("canvas");
      canvas.setAttribute("aria-hidden", "true");
      canvas.style.cssText =
        "position:fixed;top:0;left:0;width:100%;height:100vh;pointer-events:none;z-index:0;opacity:0.7;";
      container.appendChild(canvas);
      ownCanvas = canvas;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
      } catch {
        canvas.remove();
        ownCanvas = null;
        return;
      }
      if (stopped) { renderer.dispose(); canvas.remove(); ownCanvas = null; return; }

      const DPR = Math.min(window.devicePixelRatio, 1.5);
      renderer.setPixelRatio(DPR);
      renderer.setSize(window.innerWidth, window.innerHeight);

      const scene  = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.z = 5;

      const COUNT     = 180;
      const positions = new Float32Array(COUNT * 3);
      const sizes     = new Float32Array(COUNT);
      const colors    = new Float32Array(COUNT * 3);

      for (let i = 0; i < COUNT; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
        sizes[i] = Math.random() * 60 + 10;
        if (Math.random() > 0.3) {
          colors[i * 3] = 1; colors[i * 3 + 1] = 0.706; colors[i * 3 + 2] = 0.231;
        } else {
          colors[i * 3] = 0.239; colors[i * 3 + 1] = 0.42; colors[i * 3 + 2] = 1;
        }
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("size",     new THREE.BufferAttribute(sizes, 1));
      geometry.setAttribute("color",    new THREE.BufferAttribute(colors, 3));

      const material = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uPointer: { value: new THREE.Vector2() } },
        vertexShader: `
          attribute float size; attribute vec3 color; varying vec3 vColor;
          uniform float uTime; uniform vec2 uPointer;
          void main() {
            vColor = color;
            vec3 pos = position;
            pos.x += sin(uTime * 0.3 + position.y) * 0.08 + uPointer.x * 0.4;
            pos.y += cos(uTime * 0.2 + position.x) * 0.06 + uPointer.y * 0.4;
            vec4 mv = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * (8.0 / -mv.z);
            gl_Position  = projectionMatrix * mv;
          }`,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            vec2 uv = gl_PointCoord - 0.5;
            float a = exp(-dot(uv,uv) * 14.0) * 0.6;
            if (a < 0.01) discard;
            gl_FragColor = vec4(vColor, a);
          }`,
        transparent: true, depthWrite: false,
        blending: THREE.AdditiveBlending, vertexColors: true,
      });

      scene.add(new THREE.Points(geometry, material));

      const ptr = { x: 0, y: 0, tx: 0, ty: 0 };
      const onMouse  = (e: MouseEvent) => {
        ptr.tx = (e.clientX / window.innerWidth  - 0.5) * 2;
        ptr.ty = (e.clientY / window.innerHeight - 0.5) * -2;
      };
      const onResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      };
      let running = true;
      const onVis = () => { running = !document.hidden; };
      const obs = new IntersectionObserver(([e]) => { running = e.isIntersecting; });
      obs.observe(canvas);

      window.addEventListener("mousemove", onMouse,  { passive: true });
      window.addEventListener("resize",   onResize, { passive: true });
      document.addEventListener("visibilitychange", onVis);

      const tick = (t: number) => {
        animId = requestAnimationFrame(tick);
        if (!running) return;
        ptr.x += (ptr.tx - ptr.x) * 0.05;
        ptr.y += (ptr.ty - ptr.y) * 0.05;
        material.uniforms.uTime.value = t * 0.001;
        material.uniforms.uPointer.value.set(ptr.x, ptr.y);
        renderer.render(scene, camera);
      };
      animId = requestAnimationFrame(tick);

      // Cleanup stored for the effect return
      return () => {
        stopped = true;
        cancelAnimationFrame(animId);
        window.removeEventListener("mousemove", onMouse);
        window.removeEventListener("resize",   onResize);
        document.removeEventListener("visibilitychange", onVis);
        obs.disconnect();
        geometry.dispose();
        material.dispose();
        // Force-lose context before dispose so the browser releases it
        try {
          const ctx = canvas.getContext("webgl2") || canvas.getContext("webgl");
          (ctx as WebGLRenderingContext | null)
            ?.getExtension("WEBGL_lose_context")
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ?.loseContext?.();
        } catch { /* ignore */ }
        renderer.dispose();
        canvas.remove();
        ownCanvas = null;
      };
    };

    let teardown: (() => void) | undefined;
    // Use setTimeout instead of requestIdleCallback to ensure the cleanup
    // from Strict Mode mount #1 fires before mount #2 starts the load.
    const timerId = setTimeout(() => {
      load().then((fn) => { teardown = fn; });
    }, 200);

    return () => {
      stopped = true;
      clearTimeout(timerId);
      teardown?.();
      ownCanvas?.remove();
      // Reset singleton so a full page remount (HMR) works correctly
      webglInitialised = false;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}
    />
  );
}
