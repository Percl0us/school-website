import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HeroSection } from "../components/Home/HeroSection";
import { AnnouncementsBar } from "../components/Home/AnnouncementsBar";
import { WhyChooseUs } from "../components/Home/WhyChooseUs";
import { StatsSection } from "../components/Home/StatsSection";
import { TestimonialsSection } from "../components/Home/TestimonialsSection";
import { FacilitiesGrid } from "../components/Home/FacilitiesGrid";
import { FloatingCTA } from "../components/Home/FloatingCTA";
import { DailyChallenge } from "../components/Home/DailyChallenge";
import { ArtGallery } from "../components/Home/ArtGallery";
import { DailyChallengeWidget } from "../components/home/DailyChallengeWidget";

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    setHeroVisible(true);
    const img = new Image();
    img.src = "/images/hero.jpg";
    img.onload = () => setHeroLoaded(true);
    img.onerror = () => setHeroLoaded(true);
  }, []);

  const handleNav = (path, key) => {
    setLoading(key);
    setTimeout(() => navigate(path), 600);
  };

  return (
    <div className="overflow-x-hidden scroll-smooth bg-white font-indie">
      <HeroSection
        heroLoaded={heroLoaded}
        heroVisible={heroVisible}
        handleNav={handleNav}
        loading={loading}
      />

      <AnnouncementsBar />
      <section className="py-16 bg-gradient-to-br from-yellow-50 to-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <DailyChallengeWidget />
        </div>
      </section>
      <WhyChooseUs />
      <StatsSection />
      <TestimonialsSection />

      <FacilitiesGrid />
      {/* New Interactive Sections
      <section className="py-16 bg-gradient-to-br from-yellow-50 to-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <DailyChallenge />
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-purple-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ArtGallery />
        </div>
      </section> */}

      <FloatingCTA handleNav={handleNav} loading={loading} />
    </div>
  );
}
