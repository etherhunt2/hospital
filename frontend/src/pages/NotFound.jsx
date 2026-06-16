import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaHome, FaHeartbeat } from "react-icons/fa";

const NotFound = () => {
    const containerRef = useRef();
    const navigate = useNavigate();

    useGSAP(() => {
        // Entrance animation
        gsap.from(".not-found-content > *", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
        });

        // Floating animation for the 404 text
        gsap.to(".error-code", {
            y: -15,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });

        // Heartbeat animation
        gsap.to(".heart-icon", {
            scale: 1.2,
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            ease: "back.out(1.7)"
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} style={{
            minHeight: '80vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: '#f8f9fc',
            padding: '2rem'
        }}>
            <div className="not-found-content" style={{
                textAlign: 'center',
                maxWidth: '600px',
                padding: '4rem 2rem',
                backgroundColor: '#fff',
                borderRadius: '24px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                borderTop: '6px solid #2c5aa0'
            }}>
                <div style={{ color: '#e74c3c', fontSize: '3rem', marginBottom: '1rem' }}>
                    <FaHeartbeat className="heart-icon" />
                </div>
                
                <h1 className="error-code" style={{ 
                    fontSize: '6rem', 
                    fontWeight: '900', 
                    color: '#2c5aa0', 
                    margin: 0,
                    lineHeight: '1',
                    textShadow: '4px 4px 0px rgba(44, 90, 160, 0.1)'
                }}>
                    404
                </h1>
                
                <h2 style={{ 
                    fontSize: '1.8rem', 
                    color: '#1a1a2e', 
                    marginTop: '1.5rem',
                    marginBottom: '1rem' 
                }}>
                    Page Not Found
                </h2>
                
                <p style={{ 
                    color: '#666', 
                    fontSize: '1.1rem', 
                    lineHeight: '1.6',
                    marginBottom: '2.5rem' 
                }}>
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. 
                    Let's get you back to health.
                </p>
                
                <button 
                    onClick={() => navigate("/")}
                    style={{
                        padding: '12px 30px',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: '#fff',
                        backgroundColor: '#2c5aa0',
                        border: 'none',
                        borderRadius: '30px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        margin: '0 auto',
                        transition: 'transform 0.2s, background-color 0.2s',
                        boxShadow: '0 4px 15px rgba(44, 90, 160, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#1a3a6e';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#2c5aa0';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    <FaHome /> Return Home
                </button>
            </div>
        </div>
    );
};

export default NotFound;
