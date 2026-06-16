import React, { useRef } from "react";
import ServicesComp from "../components/Services";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Services = () => {
    const mainRef = useRef();

    useGSAP(() => {
        // Entrance animation for hero content
        gsap.fromTo(".services-hero-content > *",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power3.out" }
        );
    }, { scope: mainRef });

    return (
        <div ref={mainRef} className="services-page-container">
            <style>{`
                .services-page-container {
                    padding-top: 80px;
                    background: #f9fcff;
                }
                @media (max-width: 768px) {
                    .services-page-container {
                        padding-top: 70px;
                    }
                }
            `}</style>

            {/* HERO SECTION */}
            <section style={{
                position: 'relative',
                minHeight: '40vh',
                backgroundImage: 'url("/services_hero_bg.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                textAlign: 'center',
                padding: '6rem 2rem',
                overflow: 'hidden'
            }}>
                {/* Dark professional overlay for text readability */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(15, 28, 46, 0.55) 0%, rgba(13, 148, 136, 0.7) 100%)',
                    zIndex: 1
                }}></div>

                <div className="services-hero-content" style={{
                    position: 'relative',
                    zIndex: 2,
                    maxWidth: '800px'
                }}>
                    <h1 style={{
                        fontSize: '4rem',
                        fontWeight: 900,
                        margin: '0 0 1rem',
                        color: '#fff',
                        textShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
                    }}>Our Services</h1>
                    <p style={{
                        fontSize: '1.25rem',
                        fontWeight: 400,
                        margin: 0,
                        color: '#e2e8f0',
                        lineHeight: 1.6
                    }}>
                        Providing world-class healthcare solutions tailored to your wellness and medical needs.
                    </p>
                </div>
            </section>

            <ServicesComp />
        </div>
    );
};

export default Services;
