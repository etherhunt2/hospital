import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
import { apiPost } from "../utils/api";
import { FaEnvelope, FaLock, FaSignInAlt, FaUserInjured, FaUserMd } from "react-icons/fa";

const Login = () => {
    const { setIsAuthenticated, setUser } = useContext(Context);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const fillDemo = (email, password) => {
        setForm({ email, password });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            toast.error("Please enter email and password");
            return;
        }

        setLoading(true);
        try {
            const data = await apiPost("/auth/login", form);

            if (data.success) {
                setIsAuthenticated(true);
                setUser(data.user);

                // Check for pending appointment in sessionStorage
                const pendingAppointment = sessionStorage.getItem("pendingAppointment");
                if (pendingAppointment) {
                    toast.success("Login successful! Your pending appointment is ready for payment.");
                } else {
                    toast.success(data.message);
                }

                navigate("/dashboard");
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
        width: '100%', padding: '14px 16px 14px 44px', borderRadius: 8,
        border: '1px solid #e0e0e0', fontSize: '0.95rem', background: '#f8f9fa',
        outline: 'none', boxSizing: 'border-box'
    };

    return (
        <div style={{
            minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '2rem', background: 'linear-gradient(135deg, #f0f4ff 0%, #e8edf5 100%)'
        }}>
            <div className="login-card" style={{
                width: '100%', maxWidth: 480, background: '#fff', borderRadius: 20,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)', padding: '2.5rem', overflow: 'hidden',
                marginTop: "6rem"
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: 56, height: 56, borderRadius: '50%', background: '#e8f4fd',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 12px'
                    }}>
                        <FaSignInAlt style={{ fontSize: 24, color: '#2c5aa0' }} />
                    </div>
                    <h2 style={{ color: '#1a1a2e', margin: 0 }}>Welcome Back</h2>
                    <p style={{ color: '#888', fontSize: '0.9rem' }}>Sign in to your ZeeCare account</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 18 }}>
                    <div style={{ position: 'relative' }}>
                        <FaEnvelope style={{
                            position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                            color: '#999', fontSize: 16
                        }} />
                        <input
                            name="email" type="email" value={form.email}
                            onChange={handleChange} placeholder="Email address" style={inputStyle}
                        />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <FaLock style={{
                            position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                            color: '#999', fontSize: 16
                        }} />
                        <input
                            name="password" type="password" value={form.password}
                            onChange={handleChange} placeholder="Password" style={inputStyle}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: '14px', background: loading ? '#999' : 'linear-gradient(135deg, #2c5aa0, #1a3a6e)',
                            color: '#fff', border: 'none', borderRadius: 8, fontSize: '1rem',
                            fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'opacity 0.3s'
                        }}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#888', fontSize: '0.9rem' }}>
                    Don't have an account?{' '}
                    <Link to="/register" style={{ color: '#2c5aa0', fontWeight: 600, textDecoration: 'none' }}>
                        Create one
                    </Link>
                </p>

                {/* Demo Credentials Table */}
                <div style={{
                    marginTop: '1.5rem', padding: '1.2rem', background: '#f8f9fc',
                    borderRadius: 12, border: '1px solid #e8ecf4'
                }}>
                    <h4 style={{ margin: '0 0 10px 0', fontSize: '0.85rem', color: '#555', textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1 }}>
                        Demo Credentials
                    </h4>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #e0e4ec' }}>
                                <th style={{ padding: '6px 8px', textAlign: 'left', color: '#666' }}>Role</th>
                                <th style={{ padding: '6px 8px', textAlign: 'left', color: '#666' }}>Email</th>
                                <th style={{ padding: '6px 8px', textAlign: 'left', color: '#666' }}>Password</th>
                                <th style={{ padding: '6px 8px', textAlign: 'center', color: '#666' }}>Use</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '8px', display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <FaUserInjured style={{ color: '#2c5aa0' }} /> Patient
                                </td>
                                <td style={{ padding: '8px', fontFamily: 'monospace', fontSize: '0.78rem' }}>patient@zeecare.com</td>
                                <td style={{ padding: '8px', fontFamily: 'monospace', fontSize: '0.78rem' }}>Patient@123</td>
                                <td style={{ padding: '8px', textAlign: 'center' }}>
                                    <button
                                        type="button"
                                        onClick={() => fillDemo('patient@zeecare.com', 'Patient@123')}
                                        style={{
                                            padding: '4px 12px', background: '#2c5aa0', color: '#fff',
                                            border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: '0.75rem'
                                        }}
                                    >Fill</button>
                                </td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '8px', display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <FaUserMd style={{ color: '#e74c3c' }} /> Doctor
                                </td>
                                <td style={{ padding: '8px', fontFamily: 'monospace', fontSize: '0.78rem' }}>doctor@zeecare.com</td>
                                <td style={{ padding: '8px', fontFamily: 'monospace', fontSize: '0.78rem' }}>Doctor@123</td>
                                <td style={{ padding: '8px', textAlign: 'center' }}>
                                    <button
                                        type="button"
                                        onClick={() => fillDemo('doctor@zeecare.com', 'Doctor@123')}
                                        style={{
                                            padding: '4px 12px', background: '#e74c3c', color: '#fff',
                                            border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: '0.75rem'
                                        }}
                                    >Fill</button>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '8px', display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <FaSignInAlt style={{ color: '#27ae60' }} /> Admin
                                </td>
                                <td style={{ padding: '8px', fontFamily: 'monospace', fontSize: '0.78rem' }}>admin@zeecare.com</td>
                                <td style={{ padding: '8px', fontFamily: 'monospace', fontSize: '0.78rem' }}>Admin@123</td>
                                <td style={{ padding: '8px', textAlign: 'center' }}>
                                    <button
                                        type="button"
                                        onClick={() => fillDemo('admin@zeecare.com', 'Admin@123')}
                                        style={{
                                            padding: '4px 12px', background: '#27ae60', color: '#fff',
                                            border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: '0.75rem'
                                        }}
                                    >Fill</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p style={{ margin: '8px 0 0', fontSize: '0.72rem', color: '#999', textAlign: 'center' }}>
                        Seeded data — run <code>node src/seed.js</code> to reset
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
