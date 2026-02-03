import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LandingHeroSection from "@/components/LandingHeroSection";
import LandingBenefitsSection from "@/components/LandingBenefitsSection";
import LandingSupportSection from "@/components/LandingSupportSection";
import LandingNetworkSection from "@/components/LandingNetworkSection";
import LandingResidentsTickerSection from "@/components/LandingResidentsTickerSection";
import LandingCTASection from "@/components/LandingCTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <div className="px-3 md:px-4 lg:px-6 pt-16">
        <LandingHeroSection />
      </div>
      <LandingBenefitsSection />
      <LandingSupportSection />
      <LandingNetworkSection />
      <LandingResidentsTickerSection />
      <LandingCTASection />
      <Footer />
    </div>
  );
};

export default Index;
