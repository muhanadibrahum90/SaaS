// src/app/(with-header)/page.tsx

import HeroSection from "../components/HeroSection";
import HowItWorksSection from "../components/HowItWorksSection";
import FeaturesSection from "../components/FeaturesSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      
      {/* 
        سنضيف الأقسام الأخرى هنا لاحقًا...
      */}
    </main>
  );
}
