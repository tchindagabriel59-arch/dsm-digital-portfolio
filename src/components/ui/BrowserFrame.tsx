import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  url: string;
  children: ReactNode;
  className?: string;
};

/** Fenêtre navigateur macOS stylisée qui encadre les mockups projets. */
export default function BrowserFrame({ url, children, className }: Props) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-line bg-surface shadow-[0_30px_90px_-40px_rgba(0,0,0,0.9)]",
        className,
      )}
    >
      {/* Barre de titre */}
      <div className="flex h-9 items-center gap-3 border-b border-line bg-[#141414] px-4">
        <div className="flex items-center gap-[6px]">
          <span className="h-[9px] w-[9px] rounded-full bg-[#FF5F57]" />
          <span className="h-[9px] w-[9px] rounded-full bg-[#FEBC2E]" />
          <span className="h-[9px] w-[9px] rounded-full bg-[#28C840]" />
        </div>
        <div className="mx-auto hidden max-w-[60%] truncate rounded-md bg-void/70 px-3 py-1 font-mono text-[10px] text-ash-dim sm:block">
          {url}
        </div>
        <div className="hidden w-[42px] sm:block" />
      </div>

      {/* Contenu */}
      <div className="relative">{children}</div>
    </div>
  );
}
