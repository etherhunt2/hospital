import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FaCalendarPlus, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const heroRef = useRef();
  const taglineRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const ctaRef = useRef();
  const navigate = useNavigate();

  useGSAP(() => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline();

    tl.from(taglineRef.current, {
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power4.out"
    }, "-=0.4")
    .from(subtitleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6")
    .from(ctaRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4");

    // Subtle parallax for background
    gsap.to(".hero-bg-image", {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

  }, { scope: heroRef });

  return (
    <section ref={heroRef} className="hero" id="hero">
      <div className="hero-bg-image"></div>
      <div className="hero-overlay"></div>
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <span ref={taglineRef} className="hero-tagline">
              Excellence in Healthcare
            </span>
            <h1 ref={titleRef} className="hero-title">
              Your Health, Our <br />
              <span style={{ color: "var(--secondary-color)" }}>First Priority.</span>
              <span className="title-highlight">Professional Care with a Personal Touch</span>
            </h1>
            <p ref={subtitleRef} className="hero-subtitle">
              ZeeCare Medical Institute combines advanced medical technology with 
              compassionate expertise to deliver world-class healthcare. Our 
              dedicated specialists are here to support your journey to wellness.
            </p>
            <div ref={ctaRef} className="hero-cta">
              <button 
                onClick={() => navigate("/appointment")}
                className="btn btn-primary"
              >
                <FaCalendarPlus style={{ marginRight: '10px' }} /> Book Appointment
              </button>
              <button 
                onClick={() => navigate("/about")}
                className="btn btn-secondary"
                style={{ color: "white", borderColor: "white" }}
              >
                Learn More <FaArrowRight style={{ marginLeft: '10px' }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;