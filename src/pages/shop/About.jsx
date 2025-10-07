import React from 'react';
import BreadcrumbBanner from '../../components/layout/shop/common/BreadcrumbBanner';
import AboutSection from '../../components/layout/shop/about/AboutSection';
import WhoWAreWe from '../../components/layout/shop/about/WhoAreWe';
import WhyChooseUs from '../../components/layout/shop/about/WhyChooseUs';

const About = () => {
  return (
    <>
      <BreadcrumbBanner />
      <main className="bg-white">
        {/* Page Heading */}
        <section className="text-center py-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-1">About Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn more about our mission, values, and what makes us stand out from the rest.
          </p>
        </section>

        <AboutSection />
        <WhoWAreWe />
        <WhyChooseUs />
      </main>
    </>
  );
};

export default About;
