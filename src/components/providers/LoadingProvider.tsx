"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import Preloader from "@/components/ui/Preloader";
import { lockScroll } from "@/components/providers/SmoothScroll";

type LoadingContextValue = { ready: boolean };

const LoadingContext = createContext<LoadingContextValue>({ ready: false });

/** Permet aux sections de déclencher leurs animations après l'écran de chargement. */
export function useAppReady() {
  return useContext(LoadingContext).ready;
}

const STORAGE_KEY = "dsm:visited";

export default function LoadingProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  // Deuxième visite dans la session : on saute l'intro
  // (décalé d'une frame pour ne pas déclencher de rendu en cascade)
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const seen = window.sessionStorage.getItem(STORAGE_KEY) === "1";
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches;

      if (seen || reduced) {
        setShowPreloader(false);
        setReady(true);
        return;
      }
      lockScroll(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  const handleComplete = useCallback(() => {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
    setShowPreloader(false);
    setReady(true);
    lockScroll(false);
    window.scrollTo({ top: 0 });
  }, []);

  const value = useMemo(() => ({ ready }), [ready]);

  return (
    <LoadingContext.Provider value={value}>
      <Preloader active={showPreloader} onComplete={handleComplete} />
      {children}
    </LoadingContext.Provider>
  );
}
