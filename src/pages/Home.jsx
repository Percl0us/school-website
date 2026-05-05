import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HeroSection } from "../components/Home/HeroSection";
import { AnnouncementsBar } from "../components/Home/AnnouncementsBar";
import { WhyChooseUs } from "../components/Home/WhyChooseUs";
import { StatsSection } from "../components/Home/StatsSection";
import { TestimonialsSection } from "../components/Home/TestimonialsSection";
import { FacilitiesGrid } from "../components/Home/FacilitiesGrid";
import { FloatingCTA } from "../components/Home/FloatingCTA";
import { DailyChallengeWidget } from "../components/Home/DailyChallengeWidget";
import { FloatingImageField } from "../components/shared/FloatingImageField";
import { homeImageConfig } from "../data/pageImageMosaics";

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
      <div className="relative">
        <HeroSection
          heroLoaded={heroLoaded}
          heroVisible={heroVisible}
          handleNav={handleNav}
          loading={loading}
        />
        <FloatingImageField items={homeImageConfig.hero} />
      </div>

      <div className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_46%,#ffffff_100%)]">
        <AnnouncementsBar />

        <section className="relative z-10 bg-gradient-to-br from-yellow-50 via-white to-blue-50 py-16">
          <FloatingImageField items={homeImageConfig.challenge} />
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <DailyChallengeWidget />
          </div>
        </section>

        <div className="relative">
          <FloatingImageField items={homeImageConfig.whyChooseUs} />
          <WhyChooseUs />
        </div>

        <div className="relative">
          <FloatingImageField items={homeImageConfig.stats} />
          <StatsSection />
        </div>

        <div className="relative">
          <FloatingImageField items={homeImageConfig.testimonials} />
          <TestimonialsSection />
        </div>

        <div className="relative">
          <FloatingImageField items={homeImageConfig.facilities} />
          <FacilitiesGrid />
        </div>
      </div>

      <FloatingCTA handleNav={handleNav} loading={loading} />
    </div>
  );
}
