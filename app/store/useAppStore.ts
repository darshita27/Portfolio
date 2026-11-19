"use client";

import { create } from "zustand";

export type AnimPhase = "loading" | "intro" | "ready";

interface AppState {
  // Animation lifecycle phase
  phase: AnimPhase;
  setPhase: (phase: AnimPhase) => void;

  // Which chapter is currently in view (0-indexed, matches chapters array)
  activeChapter: number;
  setActiveChapter: (idx: number) => void;

  // User prefers reduced motion
  reducedMotion: boolean;
  setReducedMotion: (val: boolean) => void;

  // Pointer position (normalised -1..1)
  pointer: { x: number; y: number };
  setPointer: (x: number, y: number) => void;

  // Loader complete flag
  loaderDone: boolean;
  setLoaderDone: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  phase: "loading",
  setPhase: (phase) => set({ phase }),

  activeChapter: 0,
  setActiveChapter: (idx) => set({ activeChapter: idx }),

  reducedMotion: false,
  setReducedMotion: (val) => set({ reducedMotion: val }),

  pointer: { x: 0, y: 0 },
  setPointer: (x, y) => set({ pointer: { x, y } }),

  loaderDone: false,
  setLoaderDone: () => set({ loaderDone: true, phase: "ready" }),
}));
