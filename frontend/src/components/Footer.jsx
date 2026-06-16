import React from "react";
import { Link } from "react-router-dom";
import { 
    FaFacebookF, 
    FaTwitter, 
    FaLinkedinIn, 
    FaInstagram, 
    FaMapMarkerAlt, 
    FaPhoneAlt, 
    FaEnvelope 
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="professional-footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand Column */}
                    <div className="footer-brand">
                        <div className="brand-container" style={{ marginBottom: "var(--space-4)" }}>
                            <div className="brand-icon" style={{ background: "var(--secondary-color)" }}>
                                <div className="medical-cross-small">
                                    <div className="cross-h"></div>
                                    <div className="cross-v"></div>
                                </div>
                            </div>
                            <div className="brand-text">
                                <span className="brand-zee" style={{ color: "var(--white)" }}>Zee</span>
                                <span className="brand-care" style={{ color: "var(--secondary-color)" }}>Care</span>
                            </div>
                        </div>
                        <p>
                            ZeeCare Medical Institute is committed to providing 
                            world-class healthcare services through innovative 
                            medical technology and compassionate patient care.
                        </p>
                        <div className="footer-socials">
                            <a href="#" className="social-link"><FaFacebookF /></a>
                            <a href="#" className="social-link"><FaTwitter /></a>
                            <a href="#" className="social-link"><FaLinkedinIn /></a>
                            <a href="#" className="social-link"><FaInstagram /></a>
                        </div>
                    </div>

                    {/* Quick Links Column */}
                    <div className="footer-column">
                        <h4 className="footer-heading">Quick Links</h4>
                        <ul className="footer-links">
                            <li><Link to="/services">Our Services</Link></li>
                            <li><Link to="/doctors">Find Doctors</Link></li>
                            <li><Link to="/appointment">Book Appointment</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div className="footer-column">
                        <h4 className="footer-heading">Support</h4>
                        <ul className="footer-links">
                            <li><Link to="/contact">Contact Support</Link></li>
                            <li><Link to="/faq">FAQs</Link></li>
                            <li><Link to="/privacy">Privacy Policy</Link></li>
                            <li><Link to="/terms">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info Column */}
                    <div className="footer-column">
                        <h4 className="footer-heading">Contact Info</h4>
                        <ul className="footer-contact">
                            <li>
                                <FaMapMarkerAlt className="contact-icon" />
                                <span>123 Medical Avenue, <br />Health City, HC 54321</span>
                            </li>
                            <li>
                                <FaPhoneAlt className="contact-icon" />
                                <span>+1 (800) 123-4567</span>
                            </li>
                            <li>
                                <FaEnvelope className="contact-icon" />
                                <span>contact@zeecare.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} ZeeCare Medical Institute — Excellence in Healthcare. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
