import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { useLenis } from "@/hooks/use-lenis";
import { BackgroundField } from "@/components/echt/BackgroundField";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "ECHT — Request Clearance" },
      { name: "description", content: "Provision a new ECHT forensic workspace for your agency." },
    ],
  }),
  component: SignupPage,
});

const FIELDS = [
  { k: "FULL LEGAL NAME", ph: "Director / signatory", type: "text", name: "name", auto: "name" },
  { k: "WORK EMAIL", ph: "name@firm.com", type: "email", name: "email", auto: "email" },
  { k: "AGENCY", ph: "Registered entity", type: "text", name: "agency", auto: "organization" },
  { k: "PASSWORD", ph: "Min. 12 characters", type: "password", name: "password", auto: "new-password" },
] as const;

function SignupPage() {
  useLenis();
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);

  return (
    <>
      <BackgroundField />
      <main className="relative z-10 min-h-screen text-foreground">
        <div className="border-b border-hairline">
          <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-8 sm:py-5">
            <Link to="/" className="flex items-center gap-3">
              <div className="h-2 w-2 bg-verdict-green" />
              <span className="label-micro">ECHT<span className="hidden sm:inline"> — FORENSIC INTEGRITY</span></span>
            </Link>
            <span className="hidden label-micro text-muted-foreground md:inline">PROVISIONING · TIER I</span>
            <Link to="/" className="label-micro text-muted-foreground hover:text-foreground transition">
              ← EXIT
            </Link>
          </div>
        </div>

        <div className="mx-auto grid min-h-[calc(100vh-65px)] max-w-[1600px] grid-cols-12 gap-6 px-4 py-12 sm:gap-8 sm:px-8 sm:py-20 md:py-28">
          <aside className="col-span-12 md:col-span-6 md:sticky md:top-28 md:self-start">
            <div className="flex flex-col gap-10">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-foreground" />
                <span className="label-micro text-muted-foreground">FOUNDING PARTNERS · LIMITED</span>
              </div>
              <h1 className="display-serif text-[clamp(32px,3.2vw,52px)] leading-[1.05]">
                Provision your <span className="italic text-foreground/70">vault</span>.
              </h1>
              <p className="max-w-md text-sm text-muted-foreground">
                Workspaces are issued under chain-of-custody. Each agency receives a sealed key set, an isolated forensic engine, and a private audit ledger.
              </p>
              <ol className="grid grid-cols-1 gap-px border border-hairline bg-hairline">
                {[
                  { n: "01", t: "REQUEST CLEARANCE", s: "Submit your credentials for verification." },
                  { n: "02", t: "AGENCY INITIALIZATION", s: "Workspace, keys, and audit ledger issued." },
                  { n: "03", t: "RUN YOUR FIRST SCAN", s: "Drop one suspicious file. Watch it break." },
                ].map((it) => (
                  <li key={it.n} className="flex items-start gap-6 bg-background p-6">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center border border-hairline label-micro text-muted-foreground">
                      {it.n}
                    </span>
                    <div>
                      <p className="label-micro text-foreground">{it.t}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{it.s}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          <section className="col-span-12 md:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative border border-foreground bg-background"
            >
              <div className="flex items-center justify-between border-b border-foreground px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-verdict-green" />
                  <span className="label-micro">PROVISIONING TERMINAL</span>
                </div>
                <span className="label-micro text-muted-foreground">REQUEST ACCESS</span>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setPending(true);
                  setTimeout(() => navigate({ to: "/onboarding" }), 350);
                }}
                className="grid grid-cols-1 gap-px bg-hairline"
              >
                {FIELDS.map((f, i) => (
                  <label key={f.k} className="block bg-background px-6 py-7 transition-colors focus-within:bg-foreground/[0.03]">
                    <span className="label-micro text-muted-foreground">
                      {String(i + 1).padStart(2, "0")} · {f.k}
                    </span>
                    <input
                      required
                      type={f.type}
                      name={f.name}
                      placeholder={f.ph}
                      autoComplete={f.auto}
                      className="mt-3 w-full bg-transparent text-lg text-foreground placeholder:text-muted-foreground/40 focus:outline-none"
                    />
                  </label>
                ))}

                <label className="flex items-start gap-3 bg-background px-6 py-5 label-micro text-muted-foreground">
                  <input required type="checkbox" className="mt-[2px] h-3 w-3 accent-foreground" />
                  <span>
                    I ACCEPT THE FORENSIC HANDLING TERMS, DATA PROCESSING ADDENDUM, AND CHAIN-OF-CUSTODY PROTOCOL.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={pending}
                  className="group flex items-center justify-between bg-foreground px-6 py-6 text-primary-foreground transition-colors hover:bg-foreground/90 disabled:opacity-60"
                >
                  <span className="label-micro">{pending ? "ISSUING KEYS…" : "REQUEST CLEARANCE"}</span>
                  <span className="label-micro text-primary-foreground/60 transition-colors group-hover:text-primary-foreground">→</span>
                </button>
              </form>

              <div className="flex items-center justify-between border-t border-foreground px-6 py-5">
                <span className="label-micro text-muted-foreground">ALREADY CLEARED?</span>
                <Link to="/login" className="label-micro text-foreground hover:underline">
                  SIGN IN →
                </Link>
              </div>
            </motion.div>

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
