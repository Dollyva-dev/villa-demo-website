import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import ContactSection from '@/components/sections/ContactSection';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="relative w-full flex flex-col items-center justify-center">
      {/* We can make the header absolute/fixed inside the Header component later */}
      <Header /> 
      
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <ContactSection />
      
      <Footer />
    </main>
  );
}