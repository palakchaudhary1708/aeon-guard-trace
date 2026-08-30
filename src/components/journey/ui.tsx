import { useRef, type ReactNode } from "react";
import { useInView } from "@/hooks/useJourney";
import { NAV_LINKS, type SectionId } from "@/data/platform";
import { cn } from "@/lib/utils";

export function Header({ visible }: { visible: boolean }) {
  return (
    <header
      className={cn(
        "layer-navbar fixed inset-x-0 top-0 isolate transition-all duration-700",
        "bg-[#050505]/78 backdrop-blur-xl backdrop-saturate-150",
        "[mask-image:none] supports-[backdrop-filter:blur(0px)]:bg-[#050505]/62",
        visible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0",
      )}
    >
      <div className="relative mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-12">
        <a href="#overview" className="flex items-center gap-3">
          <span className="block size-1.5 rounded-full bg-cyan shadow-[0_0_12px_var(--cyan)]" />
          <span className="label-xs text-foreground/90">Veritas Ledger</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.target}
              href={`#${l.target}`}
              className="label-xs text-muted-foreground transition-colors hover:text-cyan"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#final"
          className="label-xs hairline rounded-full px-4 py-2 text-foreground/80 transition-colors hover:border-cyan/40 hover:text-cyan"
        >
          Enter
        </a>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </header>
  );
}

export function ProgressRail({ progress }: { progress: number }) {
  return (
    <div className="layer-overlay fixed right-6 top-1/2 hidden h-48 w-px -translate-y-1/2 bg-white/10 lg:block">
      <span
        className="absolute left-1/2 block h-8 w-px -translate-x-1/2 bg-cyan shadow-[0_0_10px_var(--cyan)] transition-[top] duration-200"
        style={{ top: `${progress * 100}%` }}
      />
    </div>
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.2);
  return (
    <div
      ref={ref}
      className={cn("transition-all duration-[900ms] ease-out", className)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(24px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function Eyebrow({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="label-xs text-cyan">{index}</span>
      <span className="h-px w-8 bg-cyan/40" />
      <span className="label-xs text-muted-foreground">{children}</span>
    </div>
  );
}

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "hairline rounded-lg bg-[oklch(0.15_0.006_260_/_72%)] p-5 backdrop-blur-[2px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Row({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string;
  tone?: "neutral" | "cyan" | "verified" | "breach";
}) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-white/5 py-2.5 last:border-0">
      <span className="label-xs text-muted-foreground">{label}</span>
      <span
        className={cn(
          "text-right font-mono text-[13px] tracking-tight",
          tone === "cyan" && "text-cyan",
          tone === "verified" && "text-verified",
          tone === "breach" && "text-breach",
          tone === "neutral" && "text-foreground/85",
        )}
      >
        {value}
      </span>
    </div>
  );
}

export function StatusChip({
  children,
  tone = "cyan",
}: {
  children: ReactNode;
  tone?: "cyan" | "verified" | "breach" | "muted";
}) {
  const map = {
    cyan: "border-cyan/30 text-cyan",
    verified: "border-verified/30 text-verified",
    breach: "border-breach/40 text-breach",
    muted: "border-white/10 text-muted-foreground",
  } as const;
  return (
    <span
      className={cn(
        "label-xs inline-flex items-center gap-2 rounded-full border px-3 py-1.5",
        map[tone],
      )}
    >
      <span className="block size-1 rounded-full bg-current" />
      {children}
    </span>
  );
}

export function CTA({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="label-xs group inline-flex items-center gap-3 rounded-full border border-cyan/40 bg-cyan/5 px-6 py-3.5 text-cyan transition-all duration-300 hover:bg-cyan/12 hover:shadow-[0_0_36px_-8px_var(--cyan)]"
    >
      {children}
      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </a>
  );
}

export function Section({
  id,
  children,
  align = "left",
  tall = false,
}: {
  id: SectionId;
  children: ReactNode;
  align?: "left" | "center" | "right";
  tall?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative flex w-full items-center px-6 md:px-12",
        tall ? "min-h-[220vh] items-start pt-[35vh]" : "min-h-screen",
      )}
    >
      <div
        className={cn(
          "mx-auto grid w-full max-w-[1440px]",
          align === "left" && "justify-items-start",
          align === "center" && "justify-items-center text-center",
          align === "right" && "justify-items-end",
        )}
      >
        <div className={cn("w-full max-w-xl", align === "center" && "max-w-3xl")}>{children}</div>
      </div>
    </section>
  );
}
