import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaUserPlus, FaCalendarAlt } from "react-icons/fa";

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        dateOfBirth: "",
        gender: "Male"
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.password) {
            toast.error("Please fill in all required fields");
            return;
        }

        if (form.password !== form.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (form.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/v1/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: form.firstName,
                    lastName: form.lastName,
                    email: form.email,
                    phone: form.phone,
                    password: form.password,
                    dateOfBirth: form.dateOfBirth,
                    gender: form.gender
                })
            });
            const data = await res.json();

            if (data.success) {
                toast.success("Account created successfully! Please log in.");
                navigate("/login");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%', padding: '12px 16px 12px 42px', borderRadius: 8,
        border: '1px solid #e0e0e0', fontSize: '0.95rem', background: '#f8f9fa',
        outline: 'none', boxSizing: 'border-box'
    };

    const labelStyle = {
        display: 'block', marginBottom: 4, fontSize: '0.82rem',
        fontWeight: 600, color: '#555'
    };

    return (
        <div style={{
            minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '2rem'
        }}>
            <div style={{
                width: '100%', maxWidth: 540, background: '#fff', borderRadius: 20,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)', padding: '2.5rem'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: 56, height: 56, borderRadius: '50%', background: '#e8f4fd',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 12px'
                    }}>
                        <FaUserPlus style={{ fontSize: 24, color: '#2c5aa0' }} />
                    </div>
                    <h2 style={{ color: '#1a1a2e', margin: 0 }}>Create an Account</h2>
                    <p style={{ color: '#888', fontSize: '0.9rem' }}>Join ZeeCare for personalized healthcare</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                        <div>
                            <label style={labelStyle}>First Name *</label>
                            <div style={{ position: 'relative' }}>
                                <FaUser style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#999', fontSize: 14 }} />
                                <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="John" style={inputStyle} required />
                            </div>
                        </div>
                        <div>
                            <label style={labelStyle}>Last Name *</label>
                            <div style={{ position: 'relative' }}>
                                <FaUser style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#999', fontSize: 14 }} />
                                <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Doe" style={inputStyle} required />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>Email *</label>
                        <div style={{ position: 'relative' }}>
                            <FaEnvelope style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#999', fontSize: 14 }} />
                            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" style={inputStyle} required />
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>Phone *</label>
                        <div style={{ position: 'relative' }}>
                            <FaPhone style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#999', fontSize: 14 }} />
                            <input name="phone" value={form.phone} onChange={handleChange} placeholder="5551234567" style={inputStyle} required />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                        <div>
                            <label style={labelStyle}>Date of Birth</label>
                            <div style={{ position: 'relative' }}>
                                <FaCalendarAlt style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#999', fontSize: 14 }} />
                                <input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} style={inputStyle} />
                            </div>
                        </div>
                        <div>
                            <label style={labelStyle}>Gender</label>
                            <select name="gender" value={form.gender} onChange={handleChange} style={{ ...inputStyle, paddingLeft: 16 }}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>Password *</label>
                        <div style={{ position: 'relative' }}>
                            <FaLock style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#999', fontSize: 14 }} />
                            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Min. 6 characters" style={inputStyle} required />
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>Confirm Password *</label>
                        <div style={{ position: 'relative' }}>
                            <FaLock style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#999', fontSize: 14 }} />
                            <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm your password" style={inputStyle} required />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            marginTop: 8, padding: '14px', background: loading ? '#999' : 'linear-gradient(135deg, #2c5aa0, #1a3a6e)',
                            color: '#fff', border: 'none', borderRadius: 8, fontSize: '1rem',
                            fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#888', fontSize: '0.9rem' }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: '#2c5aa0', fontWeight: 600, textDecoration: 'none' }}>
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
