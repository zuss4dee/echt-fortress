import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { useLenis } from "@/hooks/use-lenis";
import { BackgroundField } from "@/components/echt/BackgroundField";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "ECHT — Onboarding / Forensic Clearance" },
      { name: "description", content: "Initialize your ECHT workspace and run your first forensic scan." },
    ],
  }),
  component: OnboardingPage,
});

const SPRING = { type: "spring" as const, stiffness: 520, damping: 38, mass: 0.7 };

function OnboardingPage() {
  useLenis();
  const [step, setStep] = useState<1 | 2>(1);

  return (
    <>
      <BackgroundField />
      <main className="relative z-10 min-h-screen text-foreground">
        {/* top meta bar — mirrors landing */}
        <div className="border-b border-hairline">
          <div className="mx-auto flex max-w-[1600px] items-center justify-between px-8 py-5">
            <Link to="/" className="flex items-center gap-3">
              <div className="h-2 w-2 bg-verdict-green" />
              <span className="label-micro">ECHT — FORENSIC INTEGRITY</span>
            </Link>
            <span className="label-micro text-muted-foreground">
              ONBOARDING · STEP {String(step).padStart(2, "0")} / 02
            </span>
            <Link to="/" className="label-micro text-muted-foreground hover:text-foreground transition">
              ← EXIT
            </Link>
          </div>
        </div>

        <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-8 px-8 py-20 md:py-28">
          {/* LEFT — static editorial */}
          <aside className="col-span-12 md:col-span-6 md:sticky md:top-28 md:self-start">
            <div className="flex flex-col gap-12">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-foreground" />
                <span className="label-micro text-muted-foreground">CLEARANCE PROTOCOL · 2026</span>
              </div>

              <h1 className="display-serif text-[clamp(56px,7vw,112px)] text-foreground">
                Secure your properties.
                <br />
                <span className="italic text-foreground/80">Prevent</span> the next
                <br />
                £10,000 eviction.
              </h1>

              <div className="flex items-end justify-between gap-6 border-t border-hairline pt-8">
                <div>
                  <p className="label-micro text-muted-foreground">LOSSES PREVENTED — LIVE LEDGER</p>
                  <p className="display-serif mt-3 text-[clamp(44px,5vw,76px)] text-foreground">£5M+</p>
                </div>
                <span className="label-micro text-verdict-green">● SIGNAL ACTIVE</span>
              </div>

              <ol className="grid grid-cols-1 gap-px border border-hairline bg-hairline">
                {[
                  { n: "01", t: "AGENCY CLEARANCE", s: "Issue keys, scope your workspace." },
                  { n: "02", t: "THE FORENSIC TEST", s: "Upload one suspicious file. Watch it break." },
                ].map((it, i) => {
                  const active = i + 1 === step;
                  const done = i + 1 < step;
                  return (
                    <li
                      key={it.n}
                      className={`flex items-start gap-6 bg-background p-6 transition-colors ${
                        active ? "bg-foreground/[0.03]" : ""
                      }`}
                    >
                      <span
                        className={`mt-1 inline-flex h-6 w-6 items-center justify-center label-micro ${
                          done
                            ? "bg-verdict-green text-background"
                            : active
                              ? "bg-foreground text-background"
                              : "border border-hairline text-muted-foreground"
                        }`}
                      >
                        {done ? "✓" : it.n}
                      </span>
                      <div>
                        <p className="label-micro text-foreground">{it.t}</p>
                        <p className="mt-2 text-sm text-muted-foreground">{it.s}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </aside>

          {/* RIGHT — interactive */}
          <section className="col-span-12 md:col-span-6">
            <div className="relative border border-foreground bg-background">
              <div className="flex items-center justify-between border-b border-foreground px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-verdict-green" />
                  <span className="label-micro">SECURE INTAKE · TLS 1.3</span>
                </div>
                <span className="label-micro text-muted-foreground">
                  {step === 1 ? "01 · AGENCY CLEARANCE" : "02 · FORENSIC TEST"}
                </span>
              </div>

              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  {step === 1 ? (
                    <motion.div
                      key="s1"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={SPRING}
                    >
                      <StepOne onAdvance={() => setStep(2)} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="s2"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={SPRING}
                    >
                      <StepTwo onBack={() => setStep(1)} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* footer / progress */}
              <div className="flex items-center justify-between border-t border-foreground px-6 py-5">
                <div className="flex items-center gap-3">
                  <span className="label-micro text-muted-foreground">CLEARANCE</span>
                  <div className="flex items-center gap-2">
                    {[1, 2].map((i) => (
                      <span
                        key={i}
                        className={`h-2 w-12 transition-colors ${
                          i <= step ? "bg-verdict-green" : "bg-hairline"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="label-micro">{step}/2</span>
                </div>
                <span className="label-micro text-muted-foreground">ECHT v 4.21 / LON</span>
              </div>
            </div>

            <p className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4 label-micro text-muted-foreground">
              <span>SOC 2 TYPE II</span>
              <span>ISO 27001</span>
              <span>UK GDPR</span>
              <span>ZERO RETENTION</span>
            </p>
          </section>
        </div>
      </main>
    </>
  );
}

/* ───────────── STEP 1 ───────────── */

const FIELDS_1 = [
  { k: "AGENCY NAME", ph: "Legal entity", type: "text", name: "agency" },
  { k: "DIRECTOR NAME", ph: "Full legal name", type: "text", name: "director" },
  { k: "WORK EMAIL", ph: "name@firm.com", type: "email", name: "email" },
  { k: "PASSWORD", ph: "Min. 12 characters", type: "password", name: "password" },
] as const;

function StepOne({ onAdvance }: { onAdvance: () => void }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onAdvance();
      }}
      className="grid grid-cols-1 gap-px bg-hairline"
    >
      {FIELDS_1.map((f, i) => (
        <label key={f.k} className="block bg-background px-6 py-7 transition-colors focus-within:bg-foreground/[0.03]">
          <span className="label-micro text-muted-foreground">
            {String(i + 1).padStart(2, "0")} · {f.k}
          </span>
          <input
            required
            type={f.type}
            name={f.name}
            placeholder={f.ph}
            className="mt-5 w-full border-b border-hairline bg-transparent pb-2 font-sans text-xl text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground"
          />
        </label>
      ))}

      <div className="flex items-center justify-between gap-6 bg-background px-6 py-6">
        <p className="label-micro text-muted-foreground max-w-[28ch]">
          By initializing, you accept ECHT&apos;s data covenant.
        </p>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 480, damping: 26 }}
          className="group inline-flex items-center gap-4 bg-foreground px-8 py-5 text-background"
        >
          <span className="label-micro">INITIALIZE WORKSPACE</span>
          <span className="block h-px w-10 bg-background transition-all group-hover:w-16" />
        </motion.button>
      </div>
    </form>
  );
}

/* ───────────── STEP 2 ───────────── */

function StepTwo({ onBack }: { onBack: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) setFile(f);
  }, []);

  return (
    <div className="px-6 py-8">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative flex min-h-[340px] cursor-pointer flex-col items-center justify-center border border-dashed p-10 text-center transition-colors ${
          dragging ? "border-foreground bg-foreground/[0.04]" : "border-foreground/40 hover:border-foreground/70"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.tiff,.docx"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />

        {/* corner brackets */}
        {["left-2 top-2 border-l border-t", "right-2 top-2 border-r border-t", "left-2 bottom-2 border-l border-b", "right-2 bottom-2 border-r border-b"].map((c) => (
          <span key={c} className={`absolute h-3 w-3 border-foreground ${c}`} />
        ))}

        <span className="label-micro text-muted-foreground">EVIDENCE INTAKE</span>
        <p className="display-serif mt-6 text-4xl text-foreground">
          {file ? file.name : "Drop the suspicious file."}
        </p>
        <p className="mt-4 max-w-md label-micro text-muted-foreground">
          {file
            ? `${(file.size / 1024).toFixed(1)} KB · READY FOR FORENSIC SCAN`
            : "PDF · PNG · JPG · TIFF · DOCX — UP TO 25MB"}
        </p>

        {file && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setFile(null);
            }}
            className="mt-6 label-micro text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            REMOVE
          </button>
        )}
      </div>

      <ul className="mt-8 grid grid-cols-3 gap-px bg-hairline">
        {[
          { k: "FILE DNA", v: "EXIF · HASH" },
          { k: "EXPORT TRAIL", v: "ORIGIN CHAIN" },
          { k: "PIXEL FORENSICS", v: "ELA · CFA" },
        ].map((c) => (
          <li key={c.k} className="bg-background p-5">
            <p className="label-micro text-muted-foreground">{c.k}</p>
            <p className="mt-2 label-micro text-foreground">{c.v}</p>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-between gap-6">
        <button
          type="button"
          onClick={onBack}
          className="label-micro text-muted-foreground transition-colors hover:text-foreground"
        >
          ← BACK
        </button>
        <motion.button
          type="button"
          disabled={!file}
          whileHover={file ? { scale: 1.02 } : undefined}
          whileTap={file ? { scale: 0.97 } : undefined}
          transition={{ type: "spring", stiffness: 480, damping: 26 }}
          className="group inline-flex items-center gap-4 bg-foreground px-8 py-5 text-background disabled:cursor-not-allowed disabled:bg-foreground/30"
        >
          <span className="label-micro">RUN FORENSIC SCAN</span>
          <span className="block h-px w-10 bg-background transition-all group-hover:w-16" />
        </motion.button>
      </div>
    </div>
  );
}
