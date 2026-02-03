import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import CommunityPartners from "@/components/CommunityPartners";
import Sponsor from "@/components/Sponsor";
import Location from "@/components/Location";
import Residents from "@/components/Residents";
import CTA from "@/components/CTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <div className="px-3 md:px-4 lg:px-6 pt-16">
        <Hero />
      </div>
      <Benefits />
      <Sponsor />
      <Location />
      <Residents />
      <CommunityPartners />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
