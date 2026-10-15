import { lazy, Suspense, type ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { SideRails } from "@/components/layout/SideRails";
import { SkipLink } from "@/components/layout/SkipLink";
import { HeroSection } from "@/features/hero/HeroSection";
import { useDeferredSections } from "@/app/useDeferredSections";

const ExperienceSection = lazy(
  () => import("@/features/experience/ExperienceSection"),
);
const TechsSection = lazy(() => import("@/features/techs/TechsSection"));
const ProjectsSection = lazy(
  () => import("@/features/projects/ProjectsSection"),
);
const ContactSection = lazy(() => import("@/features/contact/ContactSection"));

/** Reserves room so the page height and scroll position stay plausible while a chunk loads. */
function SectionFallback() {
  return <div className="min-h-[50vh]" aria-hidden />;
}

function DeferredSection({
  ready,
  children,
}: {
  ready: boolean;
  children: ReactNode;
}) {
  return ready ? (
    <Suspense fallback={<SectionFallback />}>{children}</Suspense>
  ) : (
    <SectionFallback />
  );
}

export function App() {
  const ready = useDeferredSections();

  return (
    <>
      <SkipLink targetId="main" />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <HeroSection />
        <DeferredSection ready={ready}>
          <ExperienceSection />
        </DeferredSection>
        <DeferredSection ready={ready}>
          <TechsSection />
        </DeferredSection>
        <DeferredSection ready={ready}>
          <ProjectsSection />
        </DeferredSection>
        <DeferredSection ready={ready}>
          <ContactSection />
        </DeferredSection>
      </main>
      <Footer />
      <SideRails />
      <ScrollToTop />
    </>
  );
}
