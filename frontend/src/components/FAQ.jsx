import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaPlus, FaMinus, FaQuestionCircle } from "react-icons/fa";

const FAQ = () => {
  const sectionRef = useRef();
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "What are your visiting hours?",
      answer: "Our general visiting hours are from 10:00 AM to 8:00 PM daily. ICU and special care units have restricted hours from 4:00 PM to 6:00 PM. We recommend calling ahead to confirm visiting hours for specific departments."
    },
    {
      question: "How do I schedule an appointment?",
      answer: "You can schedule an appointment through our online booking system, by calling our appointment hotline at (555) 123-4567, or by visiting our reception desk. We recommend booking in advance, especially for specialist consultations."
    },
    {
      question: "Do you accept insurance?",
      answer: "Yes, we accept most major insurance plans including Blue Cross, Aetna, Cigna, and Medicare. Our billing department can help verify your coverage and explain any out-of-pocket costs before your visit."
    },
    {
      question: "What should I bring to my first appointment?",
      answer: "Please bring a valid ID, insurance cards, list of current medications, any previous medical records or test results, and a list of questions you'd like to discuss with your doctor."
    },
    {
      question: "Do you provide emergency services?",
      answer: "Yes, we have a fully equipped emergency department that operates 24/7. Our emergency team includes board-certified emergency physicians, trauma specialists, and support staff ready to handle all types of medical emergencies."
    },
    {
      question: "Can I get my test results online?",
      answer: "Yes, through our patient portal you can access your lab results, imaging reports, appointment schedules, and communicate with your healthcare team. Registration for the portal can be done at reception or online."
    },
    {
      question: "What specialties are available at your hospital?",
      answer: "We offer comprehensive medical services including Cardiology, Neurology, Orthopedics, Pediatrics, Oncology, Emergency Medicine, Surgery, Radiology, Laboratory Services, and many more specialized departments."
    },
    {
      question: "Is parking available?",
      answer: "Yes, we provide free parking for patients and visitors. Our parking garage has over 500 spaces and is located adjacent to the main hospital building. Valet parking is also available at the main entrance."
    }
  ];

  useGSAP(() => {
    // Title animation
    gsap.from(".faq-title", {
      scrollTrigger: {
        trigger: ".faq-title", 
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    });

    // FAQ items stagger animation
    gsap.from(".faq-item", {
      scrollTrigger: {
        trigger: ".faq-list",
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    });
  }, { scope: sectionRef });

  const toggleFAQ = (index) => {
    const newActiveIndex = activeIndex === index ? null : index;
    setActiveIndex(newActiveIndex);

    // Animate the answer
    const answer = document.querySelector(`[data-answer="${index}"]`);
    const icon = document.querySelector(`[data-icon="${index}"]`);

    if (newActiveIndex === index) {
      gsap.to(answer, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      });
      gsap.to(icon, {
        rotation: 45,
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(answer, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      });
      gsap.to(icon, {
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <section ref={sectionRef} className="faq-section">
      <div className="container">
        <div className="faq-header">
          <h2 className="section-title faq-title">
            <FaQuestionCircle className="title-icon" />
            Frequently Asked Questions
            <span className="title-underline"></span>
          </h2>
          <p className="faq-subtitle">
            Find answers to common questions about our services, facilities, and procedures. 
            If you don't find what you're looking for, feel free to contact us directly.
          </p>
        </div>

        <div className="faq-content">
          <div className="faq-list">
            {faqData.map((item, index) => (
              <div key={index} className="faq-item">
                <div 
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3>{item.question}</h3>
                  <div 
                    className="faq-icon"
                    data-icon={index}
                  >
                    <FaPlus />
                  </div>
                </div>
                <div 
                  className="faq-answer"
                  data-answer={index}
                  style={{ 
                    height: activeIndex === index ? 'auto' : '0',
                    opacity: activeIndex === index ? '1' : '0'
                  }}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-contact">
            <div className="contact-card">
              <h3>Still Have Questions?</h3>
              <p>Our patient care team is here to help you with any additional questions or concerns.</p>
              <div className="contact-options">
                <div className="contact-option">
                  <h4>Call Us</h4>
                  <p>(555) 123-4567</p>
                </div>
                <div className="contact-option">
                  <h4>Email Us</h4>
                  <p>info@zeecare.com</p>
                </div>
                <div className="contact-option">
                  <h4>Visit Us</h4>
                  <p>123 Healthcare Drive<br />Medical District</p>
                </div>
              </div>
              <button className="contact-cta-btn">Contact Patient Services</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;