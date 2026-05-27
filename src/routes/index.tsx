import { createFileRoute } from "@tanstack/react-router";
import { useLenis } from "@/hooks/use-lenis";
import { Hero } from "@/components/echt/Hero";
import { Proof } from "@/components/echt/Proof";
import { Engine } from "@/components/echt/Engine";
import { Partners } from "@/components/echt/Partners";
import { Clearance } from "@/components/echt/Clearance";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ECHT — Forensic Integrity for Tenant Referencing" },
      { name: "description", content: "ECHT is enterprise-grade AI forensic verification for tenant referencing. Absolute truth in every document." },
      { property: "og:title", content: "ECHT — Forensic Integrity for Tenant Referencing" },
      { property: "og:description", content: "Enterprise AI forensic verification platform. Absolute truth in document analysis." },
    ],
  }),
  component: Index,
});

function Index() {
  useLenis();
  return (
    <main className="bg-background text-foreground">
      <Hero />
      <Proof />
      <Engine />
      <Partners />
      <Clearance />
    </main>
  );
}
