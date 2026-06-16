import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FaStethoscope, FaPhoneAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EmergencyContact = () => {
    const ctaRef = useRef();
    const navigate = useNavigate();

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.from(ctaRef.current, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ctaRef.current,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });

    }, { scope: ctaRef });

    return (
        <section ref={ctaRef} className="specialized-care-section">
            <div className="container">
                <div className="specialized-care-content">
                    <h2>Need Specialized Care?</h2>
                    <p>
                        Our team of world-class specialists is ready to provide you 
                        with the advanced medical attention you deserve. 
                        Don't wait—your health is our priority.
                    </p>
                    <div className="hero-cta" style={{ justifyContent: 'center' }}>
                        <button 
                            onClick={() => navigate("/doctors")}
                            className="btn btn-primary"
                        >
                            <FaStethoscope style={{ marginRight: '10px' }} /> Find a Specialist
                        </button>
                        <a 
                            href="tel:+18001234567" 
                            className="btn btn-secondary"
                            style={{ color: 'white', borderColor: 'white' }}
                        >
                            <FaPhoneAlt style={{ marginRight: '10px' }} /> Emergency Call
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EmergencyContact;
