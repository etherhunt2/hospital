import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

// Components
import Hero from "../components/Hero";
import About from "../components/About";
import Departments from "../components/Departments";
import Services from "../components/Services";
import Statistics from "../components/Statistics";
import Testimonials from "../components/Testimonials";
import WhyChooseUs from "../components/WhyChooseUs";
import NewsAndEvents from "../components/NewsAndEvents";
import EmergencyContact from "../components/EmergencyContact";
import FAQ from "../components/FAQ";

const Home = () => {
  const homeRef = useRef();

  useGSAP(() => {
    // Page entrance animation
    gsap.from(homeRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    });

    // Parallax sections
    gsap.utils.toArray(".parallax-section").forEach((section, index) => {
      gsap.fromTo(section,
        { y: index % 2 === 0 ? 50 : -50 },
        {
          y: index % 2 === 0 ? -50 : 50,
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            ease: "none"
          }
        }
      );
    });

    // Section reveals - with proper end state and no reversal
    gsap.utils.toArray(".section-reveal").forEach(section => {
      gsap.from(section, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "top 60%",
          toggleActions: "play complete none none",
          scrub: false,
          markers: false
        }
      });
    });

  }, { scope: homeRef });

  return (
    <div ref={homeRef} className="home-page">
      {/* Hero Section */}
      <Hero />

      {/* Statistics Section */}
      <section className="section-reveal">
        <Statistics />
      </section>

      {/* About Section */}
      <section className="parallax-section section-reveal">
        <About />
      </section>

      {/* Why Choose Us */}
      <section className="section-reveal">
        <WhyChooseUs />
      </section>

      {/* Departments Section */}
      <section className="parallax-section section-reveal">
        <Departments />
      </section>

      {/* Services Section */}
      <section className="section-reveal">
        <Services />
      </section>

      {/* Testimonials */}
      <section className="parallax-section section-reveal">
        <Testimonials />
      </section>

      {/* News and Events */}
      <section className="section-reveal">
        <NewsAndEvents />
      </section>

      {/* FAQ Section */}
      <section className="section-reveal">
        <FAQ />
      </section>

      {/* Emergency Contact */}
      <section className="section-reveal">
        <EmergencyContact />
      </section>
    </div>
  );
};

export default Home;