import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaUserMd, FaHospital, FaAward, FaClock, FaHeartbeat, FaShieldAlt } from "react-icons/fa";

const WhyChooseUs = () => {
  const sectionRef = useRef();

  const features = [
    {
      icon: <FaUserMd />,
      title: "Expert Medical Team",
      description: "Our team consists of highly qualified doctors and specialists with years of experience in their respective fields.",
      stats: "50+ Specialists"
    },
    {
      icon: <FaHospital />,
      title: "State-of-the-Art Facilities",
      description: "Modern equipment and advanced technology ensure accurate diagnosis and effective treatment for all patients.",
      stats: "Latest Technology"
    },
    {
      icon: <FaAward />,
      title: "Award-Winning Care",
      description: "Recognized for excellence in patient care and medical innovation with multiple healthcare awards.",
      stats: "15+ Awards"
    },
    {
      icon: <FaClock />,
      title: "24/7 Emergency Services",
      description: "Round-the-clock emergency care with rapid response team available for critical situations.",
      stats: "Always Available"
    },
    {
      icon: <FaHeartbeat />,
      title: "Comprehensive Care",
      description: "From preventive care to complex surgeries, we provide complete healthcare solutions under one roof.",
      stats: "All Specialties"
    },
    {
      icon: <FaShieldAlt />,
      title: "Patient Safety First",
      description: "Strict safety protocols and infection control measures ensure the highest standards of patient care.",
      stats: "100% Safe"
    }
  ];

  useGSAP(() => {
    // Title animation
    gsap.from(".why-choose-title", {
      scrollTrigger: {
        trigger: ".why-choose-title",
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    });

    // Cards stagger animation
    gsap.from(".feature-card", {
      scrollTrigger: {
        trigger: ".features-grid",
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      y: 80,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out"
    });

    // Hover animations for cards
    const cards = document.querySelectorAll(".feature-card");
    cards.forEach(card => {
      const icon = card.querySelector(".feature-icon");
      const tl = gsap.timeline({ paused: true });

      tl.to(card, {
        y: -10,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out"
      })
      .to(icon, {
        scale: 1.1,
        rotation: 5,
        duration: 0.3,
        ease: "back.out(1.7)"
      }, 0);

      card.addEventListener("mouseenter", () => tl.play());
      card.addEventListener("mouseleave", () => tl.reverse());
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="why-choose-us">
      <div className="container">
        <h2 className="section-title why-choose-title">
          Why Choose ZeeCare Medical Institute?
          <span className="title-underline"></span>
        </h2>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                {feature.icon}
              </div>
              <div className="feature-content">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-stats">{feature.stats}</div>
              </div>
              <div className="card-overlay"></div>
            </div>
          ))}
        </div>

        <div className="why-choose-bottom">
          <div className="commitment-text">
            <h3>Our Commitment to Excellence</h3>
            <p>
              At ZeeCare Medical Institute, we are committed to providing compassionate, 
              high-quality healthcare services. Our patient-centered approach ensures that 
              every individual receives personalized care tailored to their specific needs. 
              We continuously invest in the latest medical technology and training to 
              deliver the best possible outcomes for our patients.
            </p>
            <div className="commitment-highlights">
              <div className="highlight-item">
                <span className="highlight-number">99%</span>
                <span className="highlight-label">Patient Satisfaction</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-number">25+</span>
                <span className="highlight-label">Years Experience</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-number">15K+</span>
                <span className="highlight-label">Lives Saved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;