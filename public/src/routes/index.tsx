import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Folio } from "@/components/site/Folio";
import { Capabilities } from "@/components/site/Capabilities";
import { FeatureFlashcards } from "@/components/site/FeatureFlashcards";
import { DeepDive } from "@/components/site/DeepDive";
import { Privacy } from "@/components/site/Privacy";
import { Closing } from "@/components/site/Closing";
import { TopBlob } from "@/components/site/TopBlob";
import { Cursor } from "@/components/site/Cursor";
import { WaitlistDialog } from "@/components/site/WaitlistDialog";
import { Toaster } from "@/components/ui/sonner";
import { initSound } from "@/lib/sound";

const title = "Substrate — the layer software grows on";
const description =
  "Substrate is a research and product studio for ambient computing, and the parent company of Folio, a personal AI assistant and agent dashboard.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: "/og-image.png" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    initSound();
  }, []);

  return (
    <main className="relative min-h-screen bg-background">
      <Cursor />
      <TopBlob />
      <Nav />
      <Hero />
      <Folio />
      <Capabilities />
      <FeatureFlashcards />
      <DeepDive />
      <Privacy />
      <Closing />
      <WaitlistDialog />
      <Toaster />
    </main>
  );
}
