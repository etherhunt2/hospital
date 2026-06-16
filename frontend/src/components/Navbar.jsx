import React, { useRef, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaBars, FaTimes, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { Context } from "../context/Context";
import { apiGet } from "../utils/api";
import { toast } from "react-toastify";

const Navbar = () => {
    const navRef = useRef(null);
    const logoRef = useRef(null);
    const menuRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { isAuthenticated, setIsAuthenticated, setUser, user } = useContext(Context);

    const handleLogout = async () => {
        try {
            const res = await apiGet("/auth/logout");
            if (res.success) {
                setIsAuthenticated(false);
                setUser({});
                toast.success("Logged out successfully");
                navigate("/login");
            }
        } catch (error) {
            toast.error("Logout failed");
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) {
            gsap.to(menuRef.current, {
                x: "0%",
                duration: 0.5,
                ease: "power3.out"
            });
        } else {
            gsap.to(menuRef.current, {
                x: "100%",
                duration: 0.5,
                ease: "power3.in"
            });
        }
    };

    useGSAP(() => {
        // Nav items entrance animation
        const navItemsTL = gsap.timeline();
        navItemsTL.fromTo('.nav-item', 
            { y: -20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" }
        );

        // Simple pulse animation for the brand logo
        gsap.to('.medical-cross-small', {
            scale: 1.1,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

    }, { scope: navRef, dependencies: [] });

    // Handle nav item hover effect for login button
    const handleNavHover = (e, isEnter) => {
        const target = e.currentTarget;
        gsap.to(target, {
            backgroundColor: isEnter ? 'rgba(0, 255, 255, 0.1)' : 'transparent',
            borderColor: isEnter ? '#0ff' : 'rgba(0, 255, 255, 0.3)',
            duration: 0.3
        });

        gsap.to(target.querySelector('.nav-text'), {
            color: isEnter ? '#0ff' : '#fff',
            textShadow: isEnter ? '0 0 10px #0ff' : 'none',
            duration: 0.3
        });
    };


    return (
        <nav ref={navRef} className="professional-navbar">
            <Link to="/" className="nav-logo" ref={logoRef}>
                <div className="brand-container">
                    <div className="brand-icon">
                        <div className="medical-cross-small">
                            <div className="cross-h"></div>
                            <div className="cross-v"></div>
                        </div>
                    </div>
                    <div className="brand-text">
                        <span className="brand-zee">Zee</span>
                        <span className="brand-care">Care</span>
                    </div>
                </div>
            </Link>            {/* Desktop Navigation */}
            <div className="nav-links desktop-nav">
                <Link
                    to="/"
                    className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
                >
                    <span className="nav-text">Home</span>
                </Link>
                <Link
                    to="/services"
                    className={`nav-item ${location.pathname === '/services' ? 'active' : ''}`}
                >
                    <span className="nav-text">Services</span>
                </Link>
                <Link
                    to="/appointment"
                    className={`nav-item ${location.pathname === '/appointment' ? 'active' : ''}`}
                >
                    <span className="nav-text">Appointment</span>
                </Link>
                <Link
                    to="/about"
                    className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`}
                >
                    <span className="nav-text">About</span>
                </Link>
                <Link
                    to="/contact"
                    className={`nav-item ${location.pathname === '/contact' ? 'active' : ''}`}
                >
                    <span className="nav-text">Contact</span>
                </Link>

                {isAuthenticated ? (
                    <div 
                        className="nav-item user-avatar-dropdown" 
                        style={{ position: 'relative', display: 'flex', alignItems: 'center', cursor: 'pointer', height: '100%', overflow: 'visible' }}
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                        <div 
                            className="avatar-icon" 
                            style={{ 
                                fontSize: '1.8rem', 
                                color: isDropdownOpen ? '#2c5aa0' : '#0ff', 
                                display: 'flex', 
                                alignItems: 'center', 
                                transition: 'all 0.3s', 
                                textShadow: isDropdownOpen ? '0 0 15px rgba(44,90,160,0.5)' : '0 0 10px rgba(0,255,255,0.5)' 
                            }}
                        >
                            <FaUserCircle />
                        </div>
                        <div 
                            className="dropdown-menu"
                            style={{ 
                                position: 'absolute', top: '100%', right: '0', background: 'rgba(10, 10, 20, 0.95)', 
                                border: '1px solid rgba(0, 255, 255, 0.2)', borderRadius: '8px', padding: '10px 0',
                                minWidth: '160px', 
                                visibility: isDropdownOpen ? 'visible' : 'hidden', 
                                opacity: isDropdownOpen ? '1' : '0', 
                                transform: isDropdownOpen ? 'translateY(0)' : 'translateY(-10px)',
                                transition: 'all 0.3s ease', boxShadow: '0 5px 15px rgba(0,0,0,0.5)', zIndex: 1000
                            }}
                        >
                            <Link to="/dashboard" style={{ display: 'block', padding: '10px 20px', color: '#fff', textDecoration: 'none', transition: '0.2s' }} onMouseEnter={e => e.currentTarget.style.background='rgba(0,255,255,0.1)'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                                Dashboard
                            </Link>
                            <button onClick={handleLogout} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 20px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', transition: '0.2s', fontSize: '1rem', outline: 'none' }} onMouseEnter={e => e.currentTarget.style.background='rgba(0,255,255,0.1)'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className={`nav-item login-btn ${location.pathname === '/login' ? 'active' : ''}`}
                        style={{ display: 'flex', alignItems: 'center' }}
                        onMouseEnter={(e) => handleNavHover(e, true)}
                        onMouseLeave={(e) => handleNavHover(e, false)}
                    >
                        <span className="nav-text">Login</span>
                    </Link>
                )}
            </div>

            {/* Mobile Menu Button */}
            <button className="menu-toggle" onClick={toggleMenu}>
                {isMenuOpen ? <FaTimes className="menu-icon" /> : <FaBars className="menu-icon" />}
            </button>

            {/* Mobile Navigation */}
            <div ref={menuRef} className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
                <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`} onClick={toggleMenu}>
                    <span className="nav-text">Home</span>
                </Link>
                <Link to="/services" className={`nav-item ${location.pathname === '/services' ? 'active' : ''}`} onClick={toggleMenu}>
                    <span className="nav-text">Services</span>
                </Link>
                <Link to="/appointment" className={`nav-item ${location.pathname === '/appointment' ? 'active' : ''}`} onClick={toggleMenu}>
                    <span className="nav-text">Appointment</span>
                </Link>
                <Link to="/about" className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`} onClick={toggleMenu}>
                    <span className="nav-text">About</span>
                </Link>
                <Link to="/contact" className={`nav-item ${location.pathname === '/contact' ? 'active' : ''}`} onClick={toggleMenu}>
                    <span className="nav-text">Contact</span>
                </Link>
                {isAuthenticated ? (
                    <>
                        <Link to="/dashboard" className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`} onClick={toggleMenu}>
                            <span className="nav-text" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <FaUserCircle /> Dashboard
                            </span>
                        </Link>
                        <button
                            onClick={() => { toggleMenu(); handleLogout(); }}
                            className="nav-item login-btn"
                            style={{ background: 'transparent', border: 'none', cursor: 'pointer', outline: 'none', textAlign: 'left', padding: '15px 20px', width: '100%', fontFamily: 'inherit', fontSize: 'inherit', color: 'inherit' }}
                        >
                            <span className="nav-text" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <FaSignOutAlt /> Logout
                            </span>
                        </button>
                    </>
                ) : (
                    <Link to="/login" className={`nav-item login-btn ${location.pathname === '/login' ? 'active' : ''}`} onClick={toggleMenu}>
                        <span className="nav-text">Login</span>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
