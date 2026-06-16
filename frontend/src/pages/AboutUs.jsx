import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { apiGet } from "../utils/api";
import { FaHeartbeat, FaUserMd, FaAmbulance, FaAward } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const FALLBACK_ABOUT_DATA = {
    aboutInfo: {
        heroImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop',
        doctorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1740&auto=format&fit=crop',
        missionVisionGraphic: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop'
    },
    team: [
        {
            id: 1,
            name: 'Dr. John Smith',
            role: 'Chairman',
            bio: 'Over 30 years of experience in healthcare management.',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        {
            id: 2,
            name: 'Dr. Jane Doe',
            role: 'Medical Director',
            bio: 'Leading our medical staff to excellence.',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
        }
    ],
    specialists: [
        {
            id: 1,
            firstName: 'Michael',
            lastName: 'Rodriguez',
            specialization: 'Cardiology',
            department: 'Cardiology',
            qualifications: ['MD', 'FACC'],
            avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
        },
        {
            id: 2,
            firstName: 'Sarah',
            lastName: 'Chen',
            specialization: 'Neurology',
            department: 'Neurology',
            qualifications: ['MD', 'PhD'],
            avatar: 'https://randomuser.me/api/portraits/women/23.jpg'
        }
    ]
};

const AboutUs = () => {
    const mainRef = useRef();
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const res = await apiGet('/stats/about');
                if (res && res.success) {
                    setAboutData(res);
                } else {
                    console.warn("API succeeded but returned failure state, using fallback data.");
                    setAboutData(FALLBACK_ABOUT_DATA);
                }
            } catch (error) {
                console.error("Error fetching about data, using fallback data:", error);
                setAboutData(FALLBACK_ABOUT_DATA);
            } finally {
                setLoading(false);
            }
        };
        fetchAboutData();
    }, []);

    useGSAP(() => {
        if (loading || !aboutData) return;

        // Hero entrance
        gsap.fromTo(".hero-content > *",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
        );

        // 2-Column section
        gsap.fromTo(".doc-image-col",
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: ".info-grid-section", start: "top 80%" } }
        );
        gsap.fromTo(".info-text-col > *",
            { x: 50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: ".info-grid-section", start: "top 80%" } }
        );

        // Team and Specialists
        gsap.utils.toArray(".team-card").forEach((card, i) => {
            gsap.fromTo(card,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, delay: i * 0.1, ease: "power2.out", scrollTrigger: { trigger: ".team-section", start: "top 85%" } }
            );
        });

        gsap.utils.toArray(".doc-card").forEach((card, i) => {
            gsap.fromTo(card,
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, delay: (i % 4) * 0.1, ease: "back.out(1.5)", scrollTrigger: { trigger: ".specialist-section", start: "top 80%" } }
            );
        });

        // Mission/Vision section
        gsap.fromTo(".mission-graphic",
            { scale: 0.8, rotation: 5, opacity: 0 },
            { scale: 1, rotation: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".mission-vision-section", start: "top 75%" } }
        );
        gsap.fromTo(".mission-text",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.3, scrollTrigger: { trigger: ".mission-vision-section", start: "top 75%" } }
        );

        // Refresh ScrollTrigger to recalculate trigger positions correctly
        ScrollTrigger.refresh();

    }, { scope: mainRef, dependencies: [loading, aboutData] });

    if (loading) {
        return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
    }

    if (!aboutData) {
        return <div style={{ padding: '4rem', textAlign: 'center' }}>Error loading data.</div>;
    }

    const { team, aboutInfo, specialists } = aboutData;

    return (
        <div ref={mainRef} style={{ background: '#f9fcff', minHeight: '100vh', paddingTop: '80px' }}>
            {/* HERO SECTION */}
            <section style={{
                position: 'relative',
                minHeight: '40vh',
                backgroundImage: `url(${aboutInfo.heroImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                textAlign: 'center',
                padding: '6rem 2rem'
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(110, 26, 78, 0.7)' }}></div>
                <div className="hero-content" style={{ position: 'relative', zIndex: 1, maxWidth: '800px', padding: '0 2rem' }}>
                    <h1 style={{ fontSize: '4rem', fontWeight: 800, margin: '0 0 1rem', textShadow: '0 4px 15px rgba(252, 252, 252, 1)' }}>About Us</h1>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 400, margin: 0, opacity: 0.9, lineHeight: 1.6, color: '#fff' }}>
                        Pioneering the future of the healthcare industry with compassion, innovation, and an unwavering commitment to human life.
                    </h2>
                </div>
            </section>

            {/* HOSPITAL INFO 2-COLUMN GRID */}
            <section className="info-grid-section" style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
                    {/* First Column: 35% */}
                    <div className="doc-image-col" style={{ flex: '1 1 300px', maxWidth: '400px', textAlign: 'center' }}>
                        <img src={aboutInfo.doctorImage} alt="Beautiful Lady Doctor" style={{
                            width: '100%',
                            height: 'auto',
                            filter: 'drop-shadow(0 20px 30px rgba(44, 90, 160, 0.15))'
                        }} />
                    </div>

                    {/* Second Column: 65% */}
                    <div className="info-text-col" style={{ flex: '2 1 500px' }}>
                        <h3 style={{ color: '#2c5aa0', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 10px' }}>Excellence in Care</h3>
                        <h2 style={{ color: '#1a1a2e', fontSize: '2.5rem', margin: '0 0 1.5rem', lineHeight: 1.2 }}>We Are Committed To Your Health & Wellness</h2>
                        <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                            ZeeCare Medical Institute has been a beacon of hope and healing for over two decades. Our facilities
                            incorporate the latest in medical technology, while our staff delivers the compassionate care you deserve.
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                            <div style={iconBoxStyle}>
                                <div style={iconStyle('#e74c3c')}><FaAmbulance /></div>
                                <div>
                                    <h4 style={{ margin: '0 0 4px', color: '#1a1a2e' }}>24/7 Emergency</h4>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Immediate response</p>
                                </div>
                            </div>
                            <div style={iconBoxStyle}>
                                <div style={iconStyle('#3498db')}><FaUserMd /></div>
                                <div>
                                    <h4 style={{ margin: '0 0 4px', color: '#1a1a2e' }}>Expert Doctors</h4>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Top verified specialists</p>
                                </div>
                            </div>
                            <div style={iconBoxStyle}>
                                <div style={iconStyle('#2ecc71')}><FaHeartbeat /></div>
                                <div>
                                    <h4 style={{ margin: '0 0 4px', color: '#1a1a2e' }}>Modern Tech</h4>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Advanced diagnostics</p>
                                </div>
                            </div>
                            <div style={iconBoxStyle}>
                                <div style={iconStyle('#f39c12')}><FaAward /></div>
                                <div>
                                    <h4 style={{ margin: '0 0 4px', color: '#1a1a2e' }}>Award Winning</h4>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Recognized globally</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TEAM SECTION (Chairman, MD) */}
            <section className="team-section" style={{ background: '#fff', padding: '5rem 2rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', color: '#1a1a2e', margin: '0 0 1rem' }}>Our Leadership</h2>
                        <div style={{ width: '60px', height: '4px', background: '#2c5aa0', margin: '0 auto' }}></div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {team.map((member) => (
                            <div key={member.id} className="team-card" style={{
                                background: '#f8f9fc',
                                borderRadius: '20px',
                                padding: '2rem',
                                textAlign: 'center',
                                transition: 'all 0.3s',
                                border: '1px solid #e1e5eb'
                            }}>
                                <img src={member.avatar} alt={member.name} style={{
                                    width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover',
                                    border: '4px solid #fff', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', marginBottom: '1.5rem'
                                }} />
                                <h3 style={{ margin: '0 0 5px', color: '#1a1a2e', fontSize: '1.3rem' }}>{member.name}</h3>
                                <p style={{ margin: '0 0 1rem', color: '#2c5aa0', fontWeight: '600', fontSize: '0.9rem' }}>{member.role}</p>
                                <p style={{ margin: 0, color: '#666', fontSize: '0.95rem', lineHeight: 1.6 }}>{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SPECIALIST SECTION (Doctors) */}
            <section className="specialist-section" style={{ padding: '5rem 2rem', background: '#f9fcff' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', color: '#1a1a2e', margin: '0 0 1rem' }}>Our Specialists</h2>
                        <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto' }}>Meet our team of experienced and dedicated medical professionals across various departments.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2rem' }}>
                        {specialists.map((doc) => (
                            <div key={doc.id} className="doc-card" style={{
                                background: '#fff',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <div style={{ background: '#ecf0f5', padding: '1.5rem', textAlign: 'center' }}>
                                    <img src={doc.avatar} alt={doc.lastName} style={{
                                        width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover',
                                        border: '3px solid #fff', boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                                    }} />
                                </div>
                                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                    <span style={{ background: '#e1e5eb', color: '#555', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700', marginBottom: '10px' }}>
                                        {doc.department}
                                    </span>
                                    <h3 style={{ margin: '0 0 5px', color: '#1a1a2e', fontSize: '1.1rem' }}>Dr. {doc.firstName} {doc.lastName}</h3>
                                    <p style={{ margin: '0 0 15px', color: '#666', fontSize: '0.85rem' }}>{doc.specialization}</p>
                                    <div style={{ marginTop: 'auto', display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'center' }}>
                                        {doc.qualifications.map((q, idx) => (
                                            <span key={idx} style={{ background: '#f0f4f8', color: '#2c5aa0', padding: '3px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '600' }}>
                                                {q}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MISSION & VISION SECTION */}
            <section className="mission-vision-section" style={{ background: '#1a1a2e', padding: '6rem 2rem', color: '#fff', overflow: 'hidden' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem' }}>
                    <div className="mission-text" style={{ flex: '1 1 400px' }}>
                        <h2 style={{ fontSize: '2.5rem', margin: '0 0 2rem', color: '#0ff', textShadow: '0 0 20px rgba(0,255,255,0.4)' }}>Mission & Vision</h2>

                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.5rem', margin: '0 0 10px', color: '#fff' }}>Our Mission</h3>
                            <p style={{ color: '#aaa', fontSize: '1.1rem', lineHeight: '1.7' }}>
                                To provide unparalleled healthcare services that prioritize patient well-being, leveraging advanced medical
                                technologies, ethical practices, and compassionate care to heal, teach, and discover.
                            </p>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '1.5rem', margin: '0 0 10px', color: '#fff' }}>Our Vision</h3>
                            <p style={{ color: '#aaa', fontSize: '1.1rem', lineHeight: '1.7' }}>
                                To be the global leader in medical excellence and innovation, creating a healthier future for communities
                                worldwide through sustainable and accessible healthcare solutions.
                            </p>
                        </div>
                    </div>

                    <div className="mission-graphic" style={{ flex: '1 1 400px', textAlign: 'center' }}>
                        <img src={aboutInfo.missionVisionGraphic} alt="Mission and Vision" style={{
                            maxWidth: '100%',
                            height: 'auto',
                            filter: 'drop-shadow(0 0 40px rgba(0, 255, 255, 0.2))',
                            borderRadius: '20px'
                        }} />
                    </div>
                </div>
            </section>

        </div>
    );
};

// Styles
const iconBoxStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: '#fff',
    padding: '12px 16px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
};

const iconStyle = (color) => ({
    width: '45px',
    height: '45px',
    borderRadius: '10px',
    background: `${color}15`,
    color: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.4rem'
});

export default AboutUs;
