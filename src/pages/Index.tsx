
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { SearchFilterSection } from "@/components/SearchFilterSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { RecentCarsSection } from "@/components/RecentCarsSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CallToActionSection } from "@/components/CallToActionSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <SearchFilterSection />
      <WhyChooseUsSection />
      <RecentCarsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CallToActionSection />
      <Footer />
    </div>
  );
};

export default Index;
