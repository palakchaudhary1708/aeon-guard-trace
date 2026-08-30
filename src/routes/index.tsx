import { Suspense, lazy, useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  AI_EXTRACTION,
  ARCHIVE_STATES,
  AUDIT_EVENTS,
  CASE_FILES,
  COLLABORATION,
  FOCUS_DOCUMENT,
  INGESTION_CHECKS,
  ROLES,
  SECTIONS,
  SECURITY_LAYERS,
} from "@/data/platform";
import { useIsMobile, useMounted, useReducedMotion, useScrollProgress } from "@/hooks/useJourney";
import {
  CTA,
  Eyebrow,
  Header,
  Panel,
  ProgressRail,
  Reveal,
  Row,
  Section,
  StatusChip,
} from "@/components/journey/ui";

const JourneyCanvas = lazy(() => import("@/components/scene/JourneyCanvas"));

const TITLE = "Veritas Ledger — Secure Legal Document Intelligence";
const DESC =
  "A cinematic, verifiable custody system for legal evidence: ingestion, AI intelligence, SHA-256 fingerprinting, layered encryption, role-based access and a complete audit trail.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Journey,
});

function s(i: number) {
  return SECTIONS[i] as (typeof SECTIONS)[number];
}

function Journey() {
  const progress = useScrollProgress();
  const progressRef = useRef(0);
  progressRef.current = progress;
  const mounted = useMounted();
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const show3d = mounted && !reduced;

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <main className="relative bg-[#050505] text-foreground">
      {/* 3D layer */}
      <div className="layer-scene pointer-events-none fixed inset-0">
        {show3d ? (
          <Suspense fallback={null}>
            <JourneyCanvas progressRef={progressRef} quality={mobile ? "low" : "high"} />
          </Suspense>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,oklch(0.82_0.14_205_/_12%),transparent_60%)]" />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#050505_92%)]" />
      </div>

      <Header visible={progress > 0.02} />
      <ProgressRail progress={progress} />

      <div className="layer-content relative">
        {/* 00 — Opening */}
        <Section id="overview" align="center">
          <Reveal>
            <div className="flex flex-col items-center gap-8">
              <StatusChip tone="muted">Secure gateway · session pending</StatusChip>
              <h1 className="text-glow-cyan text-[13vw] font-semibold leading-[0.95] tracking-[-0.045em] md:text-[5.4rem]">
                TRUST IS VERIFIED.
              </h1>
              <p className="max-w-lg text-balance text-sm leading-relaxed text-muted-foreground md:text-base">
                {s(0).body}
              </p>
              <CTA href="#entry">ENTER</CTA>
              <span className="label-xs mt-10 animate-pulse text-muted-foreground/60">
                Scroll to enter the system
              </span>
            </div>
          </Reveal>
        </Section>

        {/* 01 — Secure entry */}
        <Section id="entry">
          <Reveal>
            <Eyebrow index={s(1).index}>{s(1).eyebrow}</Eyebrow>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.035em] md:text-5xl">
              {s(1).title}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">{s(1).body}</p>
          </Reveal>
          <Reveal delay={180}>
            <Panel className="mt-10 max-w-md">
              {s(1).stats?.map((st) => (
                <Row key={st.label} label={st.label} value={st.value} tone="cyan" />
              ))}
            </Panel>
          </Reveal>
        </Section>

        {/* 02 — Case space */}
        <Section id="cases" align="right">
          <Reveal>
            <Eyebrow index={s(2).index}>{s(2).eyebrow}</Eyebrow>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.035em] md:text-5xl">
              {s(2).title}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{s(2).body}</p>
          </Reveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {CASE_FILES.map((c, i) => (
              <Reveal key={c.id} delay={120 * i}>
                <Panel className="transition-colors duration-300 hover:border-cyan/30">
                  <p className="font-mono text-[13px] text-cyan">{c.id}</p>
                  <p className="mt-2 text-sm text-foreground/85">{c.type}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{c.jurisdiction}</p>
                  <p className="label-xs mt-4 text-muted-foreground/70">{c.items} artefacts</p>
                </Panel>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* 03 — Document */}
        <Section id="documents">
          <Reveal>
            <Eyebrow index={s(3).index}>{s(3).eyebrow}</Eyebrow>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.035em] md:text-5xl">
              {s(3).title}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">{s(3).body}</p>
          </Reveal>
          <Reveal delay={160}>
            <Panel className="mt-10 max-w-lg">
              <p className="font-mono text-[13px] text-foreground/90">{FOCUS_DOCUMENT.name}</p>
              <div className="mt-4">
                <Row label="Source" value={FOCUS_DOCUMENT.source} />
                <Row label="Timestamp" value={FOCUS_DOCUMENT.timestamp} />
                <Row label="Type" value={FOCUS_DOCUMENT.docType} />
                <Row label="Authenticity" value={FOCUS_DOCUMENT.authenticity} tone="verified" />
                <Row label="Payload" value={FOCUS_DOCUMENT.size} />
              </div>
            </Panel>
          </Reveal>
        </Section>

        {/* 04 — Ingestion */}
        <Section id="ingestion" align="right">
          <Reveal>
            <Eyebrow index={s(4).index}>{s(4).eyebrow}</Eyebrow>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.035em] md:text-5xl">
              {s(4).title}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{s(4).body}</p>
          </Reveal>
          <Reveal delay={160}>
            <Panel className="mt-10">
              {INGESTION_CHECKS.map((c) => (
                <Row key={c.label} label={c.label} value={`${c.value}  ✓`} tone="cyan" />
              ))}
            </Panel>
          </Reveal>
        </Section>

        {/* 05 — AI intelligence */}
        <Section id="intelligence">
          <Reveal>
            <Eyebrow index={s(5).index}>{s(5).eyebrow}</Eyebrow>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.035em] md:text-5xl">
              {s(5).title}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">{s(5).body}</p>
          </Reveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              { t: "Entities", v: AI_EXTRACTION.entities },
              { t: "Dates", v: AI_EXTRACTION.dates },
              { t: "Locations", v: AI_EXTRACTION.locations },
            ].map((g, i) => (
              <Reveal key={g.t} delay={i * 140}>
                <Panel className="h-full">
                  <p className="label-xs text-cyan">{g.t}</p>
                  <ul className="mt-3 space-y-2">
                    {g.v.map((x) => (
                      <li key={x} className="text-xs leading-relaxed text-muted-foreground">
                        {x}
                      </li>
                    ))}
                  </ul>
                </Panel>
              </Reveal>
            ))}
          </div>
          <Reveal delay={420}>
            <Panel className="mt-3">
              <p className="label-xs text-cyan">AI summary</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                {AI_EXTRACTION.summary}
              </p>
            </Panel>
          </Reveal>
        </Section>

        {/* 06 — Fingerprint */}
        <Section id="fingerprint" align="right">
          <Reveal>
            <Eyebrow index={s(6).index}>{s(6).eyebrow}</Eyebrow>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.035em] md:text-5xl">
              {s(6).title}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{s(6).body}</p>
          </Reveal>
          <Reveal delay={180}>
            <Panel className="mt-10">
              <p className="label-xs text-muted-foreground">SHA-256</p>
              <p className="mt-3 break-all font-mono text-[12px] leading-relaxed text-cyan">
                {FOCUS_DOCUMENT.hash}
              </p>
              <div className="mt-4">
                <Row label="Sealed at" value={FOCUS_DOCUMENT.timestamp} />
                <Row label="Document ID" value="VL-DOC-2291-0001" />
              </div>
            </Panel>
          </Reveal>
        </Section>

        {/* 07 — Security vault */}
        <Section id="security">
          <Reveal>
            <Eyebrow index={s(7).index}>{s(7).eyebrow}</Eyebrow>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.035em] md:text-5xl">
              {s(7).title}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">{s(7).body}</p>
          </Reveal>
          <div className="mt-10 space-y-3">
            {SECURITY_LAYERS.map((l, i) => (
              <Reveal key={l.label} delay={i * 120}>
                <Panel className="flex items-center justify-between gap-6">
                  <div>
                    <p className="text-sm text-foreground/90">{l.label}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{l.detail}</p>
                  </div>
                  <span className="label-xs shrink-0 text-cyan">Layer 0{i + 1}</span>
                </Panel>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* 08 — Role-based access */}
        <Section id="access" align="right">
          <Reveal>
            <Eyebrow index={s(8).index}>{s(8).eyebrow}</Eyebrow>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.035em] md:text-5xl">
              {s(8).title}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{s(8).body}</p>
          </Reveal>
          <Reveal delay={180}>
            <Panel className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[420px] border-collapse">
                <thead>
                  <tr>
                    {["Role", "View", "Download", "Modify", "Share"].map((h) => (
                      <th key={h} className="label-xs pb-3 text-left text-muted-foreground">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROLES.map((r) => (
                    <tr key={r.role} className="border-t border-white/5">
                      <td className="py-3 text-sm text-foreground/85">{r.role}</td>
                      {[r.view, r.download, r.modify, r.share].map((ok, i) => (
                        <td
                          key={i}
                          className={`py-3 font-mono text-xs ${ok ? "text-cyan" : "text-breach"}`}
                        >
                          {ok ? "GRANTED" : "BLOCKED"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Panel>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-4">
              <StatusChip tone="breach">Unauthorised request refused · logged</StatusChip>
            </div>
          </Reveal>
        </Section>

        {/* 09 — Collaboration */}
        <Section id="workspace">
          <Reveal>
            <Eyebrow index={s(9).index}>{s(9).eyebrow}</Eyebrow>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.035em] md:text-5xl">
              {s(9).title}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">{s(9).body}</p>
          </Reveal>
          <div className="mt-10 space-y-3">
            {COLLABORATION.map((c, i) => (
              <Reveal key={c.actor} delay={i * 120}>
                <Panel className="flex items-center justify-between gap-6">
                  <div>
                    <p className="text-sm text-foreground/90">{c.actor}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{c.action}</p>
                  </div>
                  <span className="font-mono text-xs text-cyan">{c.time}</span>
                </Panel>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* 10 — Audit trail (long scroll) */}
        <Section id="audit" tall>
          <Reveal>
            <Eyebrow index={s(10).index}>{s(10).eyebrow}</Eyebrow>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.035em] md:text-5xl">
              {s(10).title}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              {s(10).body}
            </p>
          </Reveal>
          <div className="mt-16 space-y-[22vh]">
            {AUDIT_EVENTS.map((e, i) => (
              <Reveal key={e.action + i} delay={60}>
                <Panel className="max-w-md">
                  <div className="flex items-center justify-between">
                    <span className="label-xs text-cyan">{e.action}</span>
                    <span className="font-mono text-xs text-muted-foreground">{e.version}</span>
                  </div>
                  <div className="mt-3">
                    <Row label="User" value={e.user} />
                    <Row label="Time" value={e.time} />
                    <Row label="Device" value={e.device} />
                  </div>
                </Panel>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* 11 — Integrity check */}
        <Section id="integrity" align="center">
          <Reveal>
            <StatusChip tone="verified">Integrity check complete</StatusChip>
            <h2 className="mt-8 text-5xl font-semibold tracking-[-0.04em] text-verified md:text-6xl">
              HASH MATCH
            </h2>
            <p className="label-xs mt-5 text-foreground/80">DOCUMENT VERIFIED</p>
            <p className="mt-3 text-sm text-muted-foreground">
              No unauthorized changes detected.
            </p>
            <Panel className="mx-auto mt-10 max-w-lg text-left">
              <Row label="Original hash" value={`${FOCUS_DOCUMENT.hash.slice(0, 28)}…`} tone="cyan" />
              <Row label="Current hash" value={`${FOCUS_DOCUMENT.hash.slice(0, 28)}…`} tone="cyan" />
            </Panel>
          </Reveal>
        </Section>

        {/* 12 — Tampering */}
        <Section id="tampering" align="center">
          <Reveal>
            <StatusChip tone="breach">Alternate state · simulated</StatusChip>
            <h2 className="mt-8 text-4xl font-semibold tracking-[-0.04em] text-breach md:text-5xl">
              INTEGRITY BREACH DETECTED
            </h2>
            <p className="label-xs mt-5 text-foreground/80">DOCUMENT MODIFICATION IDENTIFIED</p>
            <p className="mt-3 text-sm text-muted-foreground">Audit investigation required.</p>
            <Panel className="mx-auto mt-10 max-w-lg text-left">
              <Row label="Original hash" value={`${FOCUS_DOCUMENT.hash.slice(0, 28)}…`} tone="cyan" />
              <Row label="Current hash" value="41ba07e9c5d3128fbb64a0e2…" tone="breach" />
              <Row label="Delta" value="Page 4 · signature block" tone="breach" />
            </Panel>
          </Reveal>
        </Section>

        {/* 13 — Archive */}
        <Section id="archive">
          <Reveal>
            <Eyebrow index={s(13).index}>{s(13).eyebrow}</Eyebrow>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.035em] md:text-5xl">
              {s(13).title}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              {s(13).body}
            </p>
          </Reveal>
          <div className="mt-10 flex flex-wrap gap-3">
            {ARCHIVE_STATES.map((a, i) => (
              <Reveal key={a} delay={i * 140}>
                <StatusChip tone="verified">{a}</StatusChip>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* 14 — Final reveal */}
        <Section id="final" align="center">
          <Reveal>
            <div className="flex flex-col items-center gap-8">
              <div className="flex flex-wrap justify-center gap-2">
                {["Identity", "Source", "SHA-256", "AES-256", "Access", "Audit"].map((t) => (
                  <StatusChip key={t} tone="cyan">
                    {t}
                  </StatusChip>
                ))}
              </div>
              <h2 className="text-glow-cyan whitespace-pre-line text-4xl font-semibold leading-[1.05] tracking-[-0.04em] md:text-6xl">
                {"Trust is not assumed.\nIt is verified."}
              </h2>
              <p className="max-w-lg text-balance text-sm leading-relaxed text-muted-foreground">
                {s(14).body}
              </p>
              <CTA href="#overview">ENTER SECURE WORKSPACE</CTA>
            </div>
          </Reveal>
        </Section>

        <footer className="border-t border-white/5 px-6 py-10 md:px-12">
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4">
            <span className="label-xs text-muted-foreground/70">
              Veritas Ledger · Legal Document Intelligence
            </span>
            <span className="label-xs text-muted-foreground/50">
              Demonstration environment · placeholder records
            </span>
          </div>
        </footer>
      </div>
    </main>
  );
}
