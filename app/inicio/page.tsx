"use client";

import { ClientOnly } from "@/lib/components/ClientOnly";
import {
  LandingHeader,
  LandingFooter,
  HeroSection,
  BenefitsSection,
  PlatformSection,
  TestimonialSection,
  CTASection,
} from "@/components";

// Main Page Component
export default function InicioPage() {
  return (
    <div className="bg-white min-h-screen" suppressHydrationWarning={true}>
      <ClientOnly>
        <LandingHeader />
      </ClientOnly>

      <HeroSection />
      <BenefitsSection />
      <PlatformSection />
      {/* <TestimonialSection /> */}
      {/* <CTASection /> */}
      <LandingFooter />
    </div>
  );
}
