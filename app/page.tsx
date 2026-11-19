// Root page — server component.
// All animation and interactivity lives in Shell (client component).
// Content is server-rendered for SEO/LLM crawlers.

import Shell from "@/app/components/Shell/Shell";

export default function Home() {
  return <Shell />;
}
