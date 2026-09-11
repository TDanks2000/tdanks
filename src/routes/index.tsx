import { createFileRoute } from "@tanstack/react-router"
import { About } from "@/components/about"
import { DevTools } from "@/components/devTools"
import { FeaturedProject } from "@/components/featuredProject"
import { Hero } from "@/components/hero"
import { OtherProjects } from "@/components/otherProjects"

export const Route = createFileRoute("/")({
  component: Home,
})

function Home() {
  return (
    <main className="min-h-svh bg-background">
      <Hero />
      <FeaturedProject />
      <DevTools />
      <OtherProjects />
      <About />
    </main>
  )
}
