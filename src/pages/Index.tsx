import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import AgenticActionsSection from "@/components/AgenticActionsSection";
import AgenticIntelligenceSection from "@/components/AgenticIntelligenceSection";
import BuilderSection from "@/components/BuilderSection";
import DemoSection from "@/components/DemoSection";
import TrustSection from "@/components/TrustSection";
import CTASection from "@/components/CTASection";
import ResidentsSection from "@/components/ResidentsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-cream overflow-x-hidden">
      <Navbar />
      <div className="px-3 md:px-4 lg:px-6 pt-16">
        <HeroSection />
      </div>
      <BenefitsSection />
      <AgenticActionsSection />
      <AgenticIntelligenceSection />
      <BuilderSection />
      <DemoSection />
      <TrustSection />
      <ResidentsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
