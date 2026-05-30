import { motion } from "framer-motion";
import { useState } from "react";

const FIELDS = [
  { k: "ORGANISATION", ph: "Legal entity" },
  { k: "PORTFOLIO SIZE", ph: "Units under management" },
  { k: "JURISDICTION", ph: "GB / EU / US" },
  { k: "CONTACT — SECURE", ph: "Encrypted channel" },
];

export function Clearance() {
  const [step, setStep] = useState(0);

  return (
    <section id="clearance" className="relative border-t border-hairline py-20 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
        <div className="grid grid-cols-12 gap-6 sm:gap-8">
          <div className="col-span-12 md:col-span-3">
            <span className="label-micro text-muted-foreground">05 / 05 — CLEARANCE</span>
          </div>

          <div className="col-span-12 md:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="display-serif max-w-[14ch] text-[clamp(44px,9vw,140px)] text-foreground"
            >
              Request <span className="italic">access</span>.
            </motion.h2>

            <div className="mt-12 border border-foreground bg-background sm:mt-16">
              {/* clearance header */}
              <div className="flex flex-col items-start justify-between gap-2 border-b border-foreground px-4 py-4 sm:flex-row sm:items-center sm:gap-3 sm:px-6">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-verdict-green" />
                  <span className="label-micro">SECURE INTAKE · TLS 1.3</span>
                </div>
                <span className="label-micro text-muted-foreground">CLEARANCE FORM · 01 / 01</span>
              </div>

              <div className="grid grid-cols-1 gap-px bg-hairline md:grid-cols-2">
                {FIELDS.map((f, i) => (
                  <motion.label
                    key={f.k}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.6 }}
                    onFocus={() => setStep(i + 1)}
                    className="group block bg-background p-6 transition-colors focus-within:bg-foreground/[0.02] sm:p-8"
                  >
                    <span className="label-micro text-muted-foreground">{String(i + 1).padStart(2, "0")} · {f.k}</span>
                    <input
                      className="mt-6 w-full border-b border-hairline bg-transparent pb-2 font-sans text-lg text-foreground outline-none transition-colors focus:border-foreground sm:text-2xl"
                      placeholder={f.ph}
                    />
                  </motion.label>
                ))}
              </div>

              {/* footer */}
              <div className="flex flex-col items-start justify-between gap-6 border-t border-foreground px-4 py-6 sm:px-6 md:flex-row md:items-center">
                <div className="flex items-center gap-6">
                  <span className="label-micro text-muted-foreground">CLEARANCE LEVEL</span>
                  <div className="flex items-center gap-2">
                    {[0, 1, 2, 3].map((i) => (
                      <span
                        key={i}
                        className={`h-2 w-8 transition-colors ${
                          i < step ? "bg-verdict-green" : "bg-hairline"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="label-micro text-foreground">{step}/4</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 380, damping: 24 }}
                  className="group inline-flex items-center gap-4 bg-foreground px-8 py-5 text-background"
                >
                  <span className="label-micro">SUBMIT FOR REVIEW</span>
                  <span className="block h-px w-10 bg-background transition-all group-hover:w-16" />
                </motion.button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4 label-micro text-muted-foreground">
              <span>SOC 2 TYPE II</span>
              <span>ISO 27001</span>
              <span>UK GDPR</span>
              <span>ZERO RETENTION OPT-IN</span>
            </div>
          </div>
        </div>
      </div>

      <footer className="mx-auto mt-20 flex max-w-[1600px] flex-col items-start justify-between gap-3 border-t border-hairline px-4 py-8 sm:mt-32 sm:flex-row sm:items-center sm:px-8">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 bg-foreground" />
          <span className="label-micro">ECHT — © 2026</span>
        </div>
        <span className="label-micro text-muted-foreground">FORENSIC INTEGRITY · LONDON</span>
      </footer>
    </section>
  );
}
