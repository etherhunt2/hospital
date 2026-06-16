import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { 
  FaAmbulance, 
  FaMicroscope, 
  FaUserMd, 
  FaPills, 
  FaHeartbeat, 
  FaBed,
  FaXRay,
  FaSyringe,
  FaBaby,
  FaEye,
  FaTooth,
  FaWheelchair
} from "react-icons/fa";

const Services = () => {
  const sectionRef = useRef();

  const servicesData = [
    {
      id: 1,
      icon: <FaAmbulance />,
      title: "24/7 Emergency Care",
      description: "Round-the-clock emergency medical services with rapid response team.",
      features: [
        "Trauma Care",
        "Cardiac Emergency", 
        "Stroke Care",
        "Ambulance Service"
      ],
      color: "#e74c3c",
      stats: "Available 24/7"
    },
    {
      id: 2,
      icon: <FaMicroscope />,
      title: "Advanced Diagnostics",
      description: "State-of-the-art imaging and laboratory services for accurate diagnosis.",
      features: [
        "MRI & CT Scans",
        "Blood Tests",
        "X-Ray Services",
        "Ultrasound"
      ],
      color: "#3498db",
      stats: "Latest Technology"
    },
    {
      id: 3,
      icon: <FaUserMd />,
      title: "Specialist Consultations",
      description: "Expert medical consultation from our team of qualified specialists.",
      features: [
        "Cardiology",
        "Neurology", 
        "Orthopedics",
        "Oncology"
      ],
      color: "#2ecc71",
      stats: "50+ Specialists"
    },
    {
      id: 4,
      icon: <FaBed />,
      title: "Surgical Services",
      description: "Comprehensive surgical procedures with minimally invasive techniques.",
      features: [
        "General Surgery",
        "Cardiac Surgery",
        "Neurosurgery", 
        "Robotic Surgery"
      ],
      color: "#9b59b6",
      stats: "Advanced OR"
    },
    {
      id: 5,
      icon: <FaPills />,
      title: "Pharmacy Services",
      description: "Full-service pharmacy with prescription management and counseling.",
      features: [
        "Prescription Filling",
        "Drug Counseling",
        "Home Delivery",
        "Insurance Support"
      ],
      color: "#f39c12",
      stats: "In-House Pharmacy"
    },
    {
      id: 6,
      icon: <FaWheelchair />,
      title: "Rehabilitation Services",
      description: "Comprehensive rehabilitation and physical therapy programs.",
      features: [
        "Physical Therapy",
        "Occupational Therapy",
        "Speech Therapy",
        "Pain Management"
      ],
      color: "#1abc9c",
      stats: "Recovery Focused"
    },
    {
      id: 7,
      icon: <FaBaby />,
      title: "Maternity & Childcare",
      description: "Complete maternal and pediatric care from pregnancy to childhood.",
      features: [
        "Prenatal Care",
        "Labor & Delivery", 
        "NICU Services",
        "Pediatric Care"
      ],
      color: "#ff6b9d",
      stats: "Family Centered"
    },
    {
      id: 8,
      icon: <FaEye />,
      title: "Specialized Clinics",
      description: "Dedicated clinics for specific medical conditions and treatments.",
      features: [
        "Eye Care",
        "Dental Services",
        "Skin Care",
        "Mental Health"
      ],
      color: "#6c5ce7",
      stats: "Expert Care"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Book Appointment",
      description: "Schedule your visit through our online system or by phone"
    },
    {
      step: "02", 
      title: "Registration",
      description: "Complete registration with our friendly front desk staff"
    },
    {
      step: "03",
      title: "Consultation",
      description: "Meet with our qualified medical professionals"
    },
    {
      step: "04",
      title: "Treatment Plan",
      description: "Receive personalized treatment recommendations"
    },
    {
      step: "05",
      title: "Follow-up Care", 
      description: "Ongoing support and monitoring for your health journey"
    }
  ];

  useGSAP(() => {
    // Title animation
    gsap.from(".services-title", {
      scrollTrigger: {
        trigger: ".services-title",
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    });

    // Services cards animation
    gsap.from(".service-card", {
      scrollTrigger: {
        trigger: ".services-grid",
        start: "top 80%", 
        toggleActions: "play none none reverse"
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out"
    });

    // Process steps animation
    gsap.from(".process-step", {
      scrollTrigger: {
        trigger: ".process-steps",
        start: "top 80%",
        toggleActions: "play none none reverse"  
      },
      x: -50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out"
    });

    // Card hover animations
    const cards = document.querySelectorAll(".service-card");
    cards.forEach(card => {
      const icon = card.querySelector(".service-icon");
      const overlay = card.querySelector(".service-overlay");

      const tl = gsap.timeline({ paused: true });

      tl.to(card, {
        y: -15,
        scale: 1.05,
        duration: 0.4,
        ease: "power2.out"
      })
      .to(icon, {
        scale: 1.2,
        rotation: 10,
        duration: 0.4,
        ease: "back.out(1.7)"
      }, 0)
      .to(overlay, {
        opacity: 0.1,
        duration: 0.4
      }, 0);

      card.addEventListener("mouseenter", () => tl.play());
      card.addEventListener("mouseleave", () => tl.reverse());
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="services-section">
      <div className="container">
        <h2 className="section-title services-title">
          Our Medical Services
          <span className="title-underline"></span>
        </h2>

        <p className="services-intro">
          ZeeCare Medical Institute offers comprehensive healthcare services with 
          state-of-the-art facilities and experienced medical professionals dedicated 
          to providing the highest quality care for you and your family.
        </p>

        <div className="services-grid">
          {servicesData.map((service) => (
            <div key={service.id} className="service-card">
              <div 
                className="service-overlay"
                style={{ backgroundColor: service.color }}
              ></div>
              <div className="service-icon" style={{ color: service.color }}>
                {service.icon}
              </div>
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <div className="service-stats">{service.stats}</div>
              </div>
              <button className="service-btn">Learn More</button>
            </div>
          ))}
        </div>

        <div className="services-process">
          <h3 className="process-title">How We Care For You</h3>
          <p className="process-subtitle">
            Our streamlined process ensures you receive the best care from your first visit to recovery
          </p>

          <div className="process-steps">
            {processSteps.map((step, index) => (
              <div key={index} className="process-step">
                <div className="step-number">{step.step}</div>
                <div className="step-content">
                  <h4 className="step-title">{step.title}</h4>
                  <p className="step-description">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && <div className="step-connector"></div>}
              </div>
            ))}
          </div>
        </div>

        <div className="services-cta">
          <div className="cta-content">
            <h3>Need Medical Assistance?</h3>
            <p>Our team is ready to help you with any health concerns. Contact us to schedule an appointment or learn more about our services.</p>
            <div className="cta-buttons">
              <button className="btn btn-primary">Book Appointment</button>
              <button className="btn btn-secondary">Contact Us</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;