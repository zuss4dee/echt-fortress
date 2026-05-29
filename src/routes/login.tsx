import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { useLenis } from "@/hooks/use-lenis";
import { BackgroundField } from "@/components/echt/BackgroundField";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "ECHT — Secure Sign In" },
      { name: "description", content: "Authenticate into your ECHT forensic workspace." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  useLenis();
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);

  return (
    <>
      <BackgroundField />
      <main className="relative z-10 min-h-screen text-foreground">
        <div className="border-b border-hairline">
          <div className="mx-auto flex max-w-[1600px] items-center justify-between px-8 py-5">
            <Link to="/" className="flex items-center gap-3">
              <div className="h-2 w-2 bg-verdict-green" />
              <span className="label-micro">ECHT — FORENSIC INTEGRITY</span>
            </Link>
            <span className="label-micro text-muted-foreground">ACCESS · TIER I CLEARANCE</span>
            <Link to="/" className="label-micro text-muted-foreground hover:text-foreground transition">
              ← EXIT
            </Link>
          </div>
        </div>

        <div className="mx-auto grid min-h-[calc(100vh-65px)] max-w-[1600px] grid-cols-12 gap-8 px-8 py-20 md:py-28">
          {/* LEFT — editorial */}
          <aside className="col-span-12 md:col-span-6 md:sticky md:top-28 md:self-start">
            <div className="flex flex-col gap-10">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-foreground" />
                <span className="label-micro text-muted-foreground">SECURE ACCESS · 2026</span>
              </div>
              <h1 className="display-serif text-[clamp(32px,3.2vw,52px)] leading-[1.05]">
                Re-enter the <span className="italic text-foreground/70">vault</span>.
              </h1>
              <p className="max-w-md text-sm text-muted-foreground">
                Every session is signed, sealed, and auditable. No passwords stored in plaintext, no telemetry, zero retention beyond the scan window.
              </p>
              <div className="grid grid-cols-2 gap-px border border-hairline bg-hairline">
                {[
                  { k: "PROTOCOL", v: "TLS 1.3 / mTLS" },
                  { k: "SESSION", v: "HARDWARE BOUND" },
                  { k: "AUDIT", v: "SOC 2 TYPE II" },
                  { k: "REGION", v: "LON · EU-WEST" },
                ].map((m) => (
                  <div key={m.k} className="bg-background p-5">
                    <p className="label-micro text-muted-foreground">{m.k}</p>
                    <p className="mt-2 label-micro text-foreground">{m.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* RIGHT — form */}
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
                  <span className="label-micro">CLEARANCE TERMINAL</span>
                </div>
                <span className="label-micro text-muted-foreground">SIGN IN</span>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setPending(true);
                  setTimeout(() => navigate({ to: "/onboarding" }), 350);
                }}
                className="grid grid-cols-1 gap-px bg-hairline"
              >
                {[
                  { k: "WORK EMAIL", ph: "name@firm.com", type: "email", name: "email" },
                  { k: "PASSWORD", ph: "Min. 12 characters", type: "password", name: "password" },
                ].map((f, i) => (
                  <label key={f.k} className="block bg-background px-6 py-7 transition-colors focus-within:bg-foreground/[0.03]">
                    <span className="label-micro text-muted-foreground">
                      {String(i + 1).padStart(2, "0")} · {f.k}
                    </span>
                    <input
                      required
                      type={f.type}
                      name={f.name}
                      placeholder={f.ph}
                      autoComplete={f.type === "password" ? "current-password" : "email"}
                      className="mt-3 w-full bg-transparent text-lg text-foreground placeholder:text-muted-foreground/40 focus:outline-none"
                    />
                  </label>
                ))}

                <div className="flex items-center justify-between bg-background px-6 py-5">
                  <label className="flex items-center gap-3 label-micro text-muted-foreground">
                    <input type="checkbox" className="h-3 w-3 accent-foreground" />
                    REMEMBER DEVICE
                  </label>
                  <button type="button" className="label-micro text-muted-foreground hover:text-foreground transition">
                    RECOVER ACCESS →
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={pending}
                  className="group flex items-center justify-between bg-foreground px-6 py-6 text-primary-foreground transition-colors hover:bg-foreground/90 disabled:opacity-60"
                >
                  <span className="label-micro">{pending ? "VERIFYING…" : "AUTHENTICATE"}</span>
                  <span className="label-micro text-primary-foreground/60 transition-colors group-hover:text-primary-foreground">→</span>
                </button>
              </form>

              <div className="flex items-center justify-between border-t border-foreground px-6 py-5">
                <span className="label-micro text-muted-foreground">NO CLEARANCE YET?</span>
                <Link to="/signup" className="label-micro text-foreground hover:underline">
                  REQUEST ACCESS →
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
