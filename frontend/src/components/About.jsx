import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FaShieldAlt, FaUserMd, FaMicroscope, FaAward } from "react-icons/fa";

const About = () => {
    const sectionRef = useRef();

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });

        tl.from(".commitment-image-container", {
            x: -100,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        })
            .from(".commitment-content h2, .commitment-content p", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
            }, "-=0.6")
            .from(".commitment-feature", {
                scale: 0.8,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "back.out(1.7)"
            }, "-=0.4");

    }, { scope: sectionRef });

    const features = [
        {
            icon: <FaShieldAlt />,
            title: "Safe & Secure",
            desc: "Patient safety is our top priority."
        },
        {
            icon: <FaUserMd />,
            title: "Expert Doctors",
            desc: "World-class medical professionals."
        },
        {
            icon: <FaMicroscope />,
            title: "Advanced Tech",
            desc: "State-of-the-art diagnostic tools."
        },
        {
            icon: <FaAward />,
            title: "Quality Care",
            desc: "Certified excellence in healthcare."
        }
    ];

    return (
        <section ref={sectionRef} className="commitment-section" id="about">
            <div className="container">
                <div className="commitment-grid">
                    <div className="commitment-image-container">
                        <img
                            src="/commitment_excellence.png"
                            alt="Our Medical Team"
                            className="commitment-image"
                        />
                        <div className="commitment-badge">
                            <div className="commitment-badge-icon">
                                <FaAward />
                            </div>
                            <div className="commitment-badge-text">
                                25+ Years of <br /> Excellence
                            </div>
                        </div>
                    </div>

                    <div className="commitment-content">
                        <h2>Our Commitment to Excellence</h2>
                        <p>
                            At ZeeCare Medical Institute, we strive for perfection in everything we do.
                            From the moment you walk through our doors, you are treated with the
                            highest level of professionalism and compassion.
                        </p>

                        <div className="commitment-features">
                            {features.map((feature, index) => (
                                <div key={index} className="commitment-feature">
                                    <div className="feature-icon-wrapper">
                                        {feature.icon}
                                    </div>
                                    <div className="feature-text">
                                        <h4>{feature.title}</h4>
                                        <p>{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
