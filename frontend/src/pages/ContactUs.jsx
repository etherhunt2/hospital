import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";

const ContactUs = () => {
    const contactRef = useRef();
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
    const [subEmail, setSubEmail] = useState("");

    useGSAP(() => {
        // Entrance animation
        gsap.from(".contact-header", { y: -50, opacity: 0, duration: 0.8, ease: "power3.out" });
        gsap.from(".info-card", {
            y: 50, opacity: 0, duration: 0.6, stagger: 0.15, ease: "power3.out", delay: 0.3
        });
        gsap.from(".contact-form-section", {
            x: 50, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.6
        });
        gsap.from(".newsletter-section", {
            y: 30, opacity: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: {
                trigger: ".newsletter-section",
                start: "top 80%"
            }
        });
    }, { scope: contactRef });

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Thank you! Your message has been sent successfully.");
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (subEmail) {
            toast.success("Subscribed successfully! Welcome to our newsletter.");
            setSubEmail("");
        }
    };

    return (
        <div ref={contactRef} style={{ backgroundColor: '#f9fcff', minHeight: '100vh' }}>
            {/* Header */}
            <header className="contact-header" style={{
                background: 'linear-gradient(45deg, #e7e0a9ff, #1e6042ff)',
                padding: '6rem 2rem 4rem',
                textAlign: 'center',
                color: '#fff',
                marginBottom: '3rem',
                borderBottomLeftRadius: '40px',
                borderBottomRightRadius: '40px'
            }}>
                <h1 style={{ fontSize: '3.5rem', margin: '0 0 1rem', fontWeight: '800' }}>Get In Touch</h1>
                <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', opacity: 0.9, color: '#fff' }}>
                    We're here to help. Contact our team 24/7 for medical emergencies, general inquiries, or appointment scheduling.
                </p>
            </header>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 4rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>

                    {/* Left Column: Info */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="info-card" style={cardStyle}>
                            <div style={iconWrapperStyle('#3498db')}><FaMapMarkerAlt /></div>
                            <div>
                                <h3 style={{ margin: '0 0 5px', color: '#1a1a2e' }}>Our Location</h3>
                                <p style={{ margin: 0, color: '#666', lineHeight: '1.6' }}>
                                    123 Healthcare Avenue,<br />Medical District, NY 10001
                                </p>
                            </div>
                        </div>

                        <div className="info-card" style={cardStyle}>
                            <div style={iconWrapperStyle('#e74c3c')}><FaPhoneAlt /></div>
                            <div>
                                <h3 style={{ margin: '0 0 5px', color: '#1a1a2e' }}>Phone Numbers</h3>
                                <p style={{ margin: 0, color: '#666', lineHeight: '1.6' }}>
                                    <strong>Emergency:</strong> (555) 911-0000<br />
                                    <strong>Reception:</strong> (555) 123-4567
                                </p>
                            </div>
                        </div>

                        <div className="info-card" style={cardStyle}>
                            <div style={iconWrapperStyle('#2ecc71')}><FaEnvelope /></div>
                            <div>
                                <h3 style={{ margin: '0 0 5px', color: '#1a1a2e' }}>Email Address</h3>
                                <p style={{ margin: 0, color: '#666', lineHeight: '1.6' }}>
                                    info@zeecare.com<br />
                                    support@zeecare.com
                                </p>
                            </div>
                        </div>

                        <div className="info-card" style={{ ...cardStyle, flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
                            <h3 style={{ width: '100%', textAlign: 'center', margin: '0 0 10px', color: '#1a1a2e' }}>Follow Us</h3>
                            <a href="#" style={socialIconStyle('#3b5998')}><FaFacebookF /></a>
                            <a href="#" style={socialIconStyle('#1da1f2')}><FaTwitter /></a>
                            <a href="#" style={socialIconStyle('#e1306c')}><FaInstagram /></a>
                            <a href="#" style={socialIconStyle('#0077b5')}><FaLinkedinIn /></a>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="contact-form-section" style={{
                        background: '#fff',
                        padding: '2.5rem',
                        borderRadius: '20px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.06)'
                    }}>
                        <h2 style={{ color: '#1a1a2e', margin: '0 0 1.5rem', fontSize: '2rem' }}>Send a Message</h2>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <input type="text" placeholder="Your Name" required
                                    style={inputStyle} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                <input type="email" placeholder="Your Email" required
                                    style={inputStyle} value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                            </div>
                            <input type="text" placeholder="Subject" required
                                style={inputStyle} value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} />
                            <textarea placeholder="Your Message..." rows="5" required
                                style={{ ...inputStyle, resize: 'vertical' }} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}></textarea>

                            <button type="submit" style={{
                                padding: '14px',
                                background: '#2c5aa0',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '10px',
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '8px',
                                transition: 'all 0.3s',
                                marginTop: '10px'
                            }} onMouseEnter={e => e.currentTarget.style.background = '#1a3a6e'} onMouseLeave={e => e.currentTarget.style.background = '#2c5aa0'}>
                                <FaPaperPlane /> Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Newsletter Subscription Section */}
            <div className="newsletter-section" style={{
                background: '#1a1a2e',
                padding: '4rem 2rem',
                textAlign: 'center',
                color: '#fff',
                marginTop: '2rem'
            }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '2.5rem', margin: '0 0 1rem' }}>Subscribe to Our Newsletter</h2>
                    <p style={{ fontSize: '1.1rem', color: '#aaa', margin: '0 0 2rem' }}>
                        Stay updated with our latest healthcare tips, medical news, and hospital announcements.
                    </p>
                    <form onSubmit={handleSubscribe} style={{
                        display: 'flex',
                        maxWidth: '500px',
                        margin: '0 auto',
                        background: '#fff',
                        borderRadius: '50px',
                        padding: '6px',
                        boxShadow: '0 5px 20px rgba(0,0,0,0.2)'
                    }}>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            required
                            value={subEmail}
                            onChange={(e) => setSubEmail(e.target.value)}
                            style={{
                                flex: 1,
                                border: 'none',
                                padding: '10px 20px',
                                fontSize: '1rem',
                                outline: 'none',
                                borderRadius: '50px',
                                color: '#333'
                            }}
                        />
                        <button type="submit" style={{
                            padding: '12px 30px',
                            background: '#2c5aa0',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '50px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }} onMouseEnter={e => e.currentTarget.style.background = '#1a3a6e'} onMouseLeave={e => e.currentTarget.style.background = '#2c5aa0'}>
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Styles
const cardStyle = {
    background: '#fff',
    padding: '1.5rem',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '1.2rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
    borderLeft: '4px solid #transparent',
    transition: 'transform 0.3s',
};

const iconWrapperStyle = (color) => ({
    width: '60px',
    height: '60px',
    borderRadius: '14px',
    background: `${color}15`,
    color: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.8rem'
});

const inputStyle = {
    width: '100%',
    padding: '14px 18px',
    border: '1px solid #e1e5eb',
    borderRadius: '10px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s',
    background: '#fcfcfc',
    color: '#333'
};

const socialIconStyle = (color) => ({
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    background: '#f4f7f9',
    color: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.3rem',
    textDecoration: 'none',
    transition: 'all 0.3s',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
});

export default ContactUs;
