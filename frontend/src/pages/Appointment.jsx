import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaUserMd, FaClipboardList, FaCheckCircle, FaArrowRight, FaArrowLeft, FaClock, FaHospital, FaEnvelope, FaPhone, FaUser, FaStethoscope } from "react-icons/fa";
import { Context } from "../context/Context";
import { createSessionAppointment } from "../utils/sessionData";
const STEPS = [
    { label: "Personal Info", icon: <FaUser /> },
    { label: "Appointment Details", icon: <FaClipboardList /> },
    { label: "Review & Confirm", icon: <FaCheckCircle /> }
];

const Appointment = () => {
    const { isAuthenticated, user } = useContext(Context);
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [departments, setDepartments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [animating, setAnimating] = useState(false);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
        doctorId: "",
        doctorName: "",
        appointmentDate: "",
        appointmentTime: "",
        reasonForVisit: "",
        appointmentType: "Consultation"
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [deptRes, docRes] = await Promise.all([
                    fetch("/api/v1/department"),
                    fetch("/api/v1/doctor")
                ]);
                const deptData = await deptRes.json();
                const docData = await docRes.json();

                if (deptData.success) setDepartments(deptData.departments);
                if (docData.success) setDoctors(docData.doctors);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (isAuthenticated && user && user.firstName) {
            setForm(prev => ({
                ...prev,
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.email || "",
                phone: user.phone || ""
            }));
        }
    }, [isAuthenticated, user]);

    useEffect(() => {
        if (form.department) {
            const filtered = doctors.filter(d => d.department === form.department);
            setFilteredDoctors(filtered);
        } else {
            setFilteredDoctors([]);
        }
        setForm(prev => ({ ...prev, doctorId: "", doctorName: "" }));
    }, [form.department, doctors]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "doctorId") {
            const doc = filteredDoctors.find(d => String(d.id) === value);
            setForm({ ...form, doctorId: value, doctorName: doc ? `Dr. ${doc.firstName} ${doc.lastName}` : "" });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const getMinDate = () => {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        return d.toISOString().split("T")[0];
    };

    const animateStep = (direction) => {
        setAnimating(true);
        setTimeout(() => {
            if (direction === "next") setCurrentStep(s => s + 1);
            else setCurrentStep(s => s - 1);
            setTimeout(() => setAnimating(false), 50);
        }, 250);
    };

    const validateStep = () => {
        if (currentStep === 0) {
            if (!form.firstName || !form.lastName || !form.email || !form.phone) {
                toast.error("Please fill in all personal information fields");
                return false;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(form.email)) {
                toast.error("Please enter a valid email address");
                return false;
            }
        }
        if (currentStep === 1) {
            if (!form.department || !form.appointmentDate || !form.appointmentTime || !form.reasonForVisit) {
                toast.error("Please fill in all required appointment details");
                return false;
            }
        }
        return true;
    };

    const handleNext = () => {
        if (!validateStep()) return;
        animateStep("next");
    };

    const handleBack = () => {
        animateStep("back");
    };

    const handleConfirm = () => {
        const savedAppointment = createSessionAppointment({
            patient: {
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                phone: form.phone
            },
            doctor: {
                id: form.doctorId ? Number(form.doctorId) : null,
                name: form.doctorName || "Any Available Doctor",
                department: form.department
            },
            department: form.department,
            appointmentDate: form.appointmentDate,
            appointmentTime: form.appointmentTime,
            reasonForVisit: form.reasonForVisit,
            appointmentType: form.appointmentType,
            consultationFee: filteredDoctors.find(d => String(d.id) === form.doctorId)?.consultationFee || 200
        });

        toast.success("Appointment saved! Please log in to complete your booking.");

        if (isAuthenticated) {
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    };

    // ── Styles ──
    const inputStyle = {
        width: '100%', padding: '14px 16px', borderRadius: 10,
        border: '1.5px solid #e0e4ec', fontSize: '0.95rem', background: '#f8f9fc',
        outline: 'none', transition: 'all 0.3s', boxSizing: 'border-box',
        fontFamily: 'inherit'
    };

    const labelStyle = {
        display: 'block', marginBottom: 6, fontSize: '0.85rem',
        fontWeight: 600, color: '#444', letterSpacing: 0.2
    };

    const stepperDot = (idx) => ({
        width: 44, height: 44, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 18, fontWeight: 700, cursor: 'default',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        background: idx <= currentStep
            ? 'linear-gradient(135deg, #2c5aa0, #1a3a6e)'
            : '#e8ecf4',
        color: idx <= currentStep ? '#fff' : '#999',
        boxShadow: idx === currentStep ? '0 4px 16px rgba(44,90,160,0.35)' : 'none',
        transform: idx === currentStep ? 'scale(1.12)' : 'scale(1)'
    });

    const stepperLine = (idx) => ({
        flex: 1, height: 3, borderRadius: 2,
        transition: 'background 0.5s',
        background: idx < currentStep
            ? 'linear-gradient(90deg, #2c5aa0, #1a3a6e)'
            : '#e0e4ec'
    });

    const reviewRow = (icon, label, value) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #f0f2f5' }}>
            <span style={{ color: '#2c5aa0', fontSize: 16, minWidth: 20 }}>{icon}</span>
            <span style={{ color: '#888', fontSize: '0.82rem', minWidth: 120 }}>{label}</span>
            <span style={{ color: '#1a1a2e', fontSize: '0.95rem', fontWeight: 500 }}>{value || '—'}</span>
        </div>
    );

    return (
        <div style={{
            padding: '2rem', maxWidth: 780, margin: '0 auto', minHeight: '70vh', marginTop: "80px", borderRadius: "10px"
        }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <h1 style={{ fontSize: '2rem', color: '#1a1a2e', marginBottom: 6 }}>
                    <FaCalendarAlt style={{ marginRight: 10, color: '#2c5aa0' }} />
                    Book an Appointment
                </h1>
                <p style={{ color: '#888', fontSize: '0.95rem' }}>
                    Complete the steps below to schedule your visit
                </p>
            </div>

            {/* Stepper */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 0, marginBottom: '2rem', padding: '0 1rem'
            }}>
                {STEPS.map((step, idx) => (
                    <React.Fragment key={idx}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, zIndex: 1 }}>
                            <div style={stepperDot(idx)}>
                                {idx < currentStep ? <FaCheckCircle /> : step.icon}
                            </div>
                            <span style={{
                                fontSize: '0.72rem', fontWeight: idx === currentStep ? 700 : 500,
                                color: idx <= currentStep ? '#2c5aa0' : '#aaa',
                                transition: 'all 0.3s', whiteSpace: 'nowrap'
                            }}>
                                {step.label}
                            </span>
                        </div>
                        {idx < STEPS.length - 1 && <div style={stepperLine(idx)} />}
                    </React.Fragment>
                ))}
            </div>

            {/* Card */}
            <div style={{
                background: '#fff', borderRadius: 20, padding: '2rem 2.2rem',
                boxShadow: '0 8px 36px rgba(0,0,0,0.08)',
                opacity: animating ? 0 : 1,
                transform: animating ? 'translateY(12px)' : 'translateY(0)',
                transition: 'opacity 0.25s, transform 0.25s'
            }}>
                {/* ===== STEP 1: Personal Info ===== */}
                {currentStep === 0 && (
                    <>
                        <h3 style={{ color: '#2c5aa0', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8, fontSize: '1.15rem' }}>
                            <FaUserMd /> Personal Information
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18 }}>
                            <div>
                                <label style={labelStyle}>First Name *</label>
                                <input name="firstName" value={form.firstName} onChange={handleChange}
                                    placeholder="John" style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>Last Name *</label>
                                <input name="lastName" value={form.lastName} onChange={handleChange}
                                    placeholder="Doe" style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>Email *</label>
                                <input name="email" type="email" value={form.email} onChange={handleChange}
                                    placeholder="john@example.com" style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>Phone *</label>
                                <input name="phone" value={form.phone} onChange={handleChange}
                                    placeholder="5551234567" style={inputStyle} />
                            </div>
                        </div>
                    </>
                )}

                {/* ===== STEP 2: Appointment Details ===== */}
                {currentStep === 1 && (
                    <>
                        <h3 style={{ color: '#2c5aa0', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8, fontSize: '1.15rem' }}>
                            <FaClipboardList /> Appointment Details
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18, marginBottom: 18 }}>
                            <div>
                                <label style={labelStyle}>Department *</label>
                                <select name="department" value={form.department} onChange={handleChange} style={inputStyle}>
                                    <option value="">Select Department</option>
                                    {departments.map(d => (
                                        <option key={d.id} value={d.name}>{d.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>Preferred Doctor</label>
                                <select name="doctorId" value={form.doctorId} onChange={handleChange} style={inputStyle}>
                                    <option value="">Any Available Doctor</option>
                                    {filteredDoctors.map(d => (
                                        <option key={d.id} value={d.id}>Dr. {d.firstName} {d.lastName}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>Preferred Date *</label>
                                <input name="appointmentDate" type="date" value={form.appointmentDate}
                                    onChange={handleChange} min={getMinDate()} style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>Preferred Time *</label>
                                <input name="appointmentTime" type="time" value={form.appointmentTime}
                                    onChange={handleChange} style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>Appointment Type</label>
                                <select name="appointmentType" value={form.appointmentType} onChange={handleChange} style={inputStyle}>
                                    <option value="Consultation">Consultation</option>
                                    <option value="Follow-up">Follow-up</option>
                                    <option value="Routine Checkup">Routine Checkup</option>
                                    <option value="Emergency">Emergency</option>
                                    <option value="Procedure">Procedure</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label style={labelStyle}>Reason for Visit *</label>
                            <textarea
                                name="reasonForVisit"
                                value={form.reasonForVisit}
                                onChange={handleChange}
                                placeholder="Please describe your symptoms or reason for the visit..."
                                rows={4}
                                style={{ ...inputStyle, resize: 'vertical' }}
                            />
                        </div>
                    </>
                )}

                {/* ===== STEP 3: Review & Confirm ===== */}
                {currentStep === 2 && (
                    <>
                        <h3 style={{ color: '#2c5aa0', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8, fontSize: '1.15rem' }}>
                            <FaCheckCircle /> Review Your Appointment
                        </h3>
                        <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: 20 }}>
                            Please verify the details below before confirming.
                        </p>

                        {/* Personal Info summary */}
                        <div style={{
                            background: '#f8f9fc', borderRadius: 14, padding: '1.2rem 1.4rem', marginBottom: 16,
                            border: '1px solid #e8ecf4'
                        }}>
                            <h4 style={{ margin: '0 0 8px', color: '#1a1a2e', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                Personal Information
                            </h4>
                            {reviewRow(<FaUser />, "Name", `${form.firstName} ${form.lastName}`)}
                            {reviewRow(<FaEnvelope />, "Email", form.email)}
                            {reviewRow(<FaPhone />, "Phone", form.phone)}
                        </div>

                        {/* Appointment details summary */}
                        <div style={{
                            background: '#f8f9fc', borderRadius: 14, padding: '1.2rem 1.4rem',
                            border: '1px solid #e8ecf4'
                        }}>
                            <h4 style={{ margin: '0 0 8px', color: '#1a1a2e', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                Appointment Details
                            </h4>
                            {reviewRow(<FaHospital />, "Department", form.department)}
                            {reviewRow(<FaStethoscope />, "Doctor", form.doctorName || "Any Available")}
                            {reviewRow(<FaCalendarAlt />, "Date", form.appointmentDate)}
                            {reviewRow(<FaClock />, "Time", form.appointmentTime)}
                            {reviewRow(<FaClipboardList />, "Type", form.appointmentType)}
                            {reviewRow(<FaClipboardList />, "Reason", form.reasonForVisit)}
                        </div>

                        {/* Fee notice */}
                        {form.doctorId && (() => {
                            const doc = filteredDoctors.find(d => String(d.id) === form.doctorId);
                            return doc ? (
                                <div style={{
                                    marginTop: 16, padding: '12px 18px', borderRadius: 10,
                                    background: 'linear-gradient(135deg, #fff8e1, #fff3cd)',
                                    border: '1px solid #f0d68a', display: 'flex', alignItems: 'center', gap: 10
                                }}>
                                    <span style={{ fontSize: '1.2rem' }}>💳</span>
                                    <span style={{ fontSize: '0.88rem', color: '#7a5d00' }}>
                                        Consultation fee: <strong>${doc.consultationFee}</strong> — payable after login
                                    </span>
                                </div>
                            ) : null;
                        })()}
                    </>
                )}

                {/* ===== Navigation Buttons ===== */}
                <div style={{
                    display: 'flex', justifyContent: currentStep === 0 ? 'flex-end' : 'space-between',
                    marginTop: '2rem', gap: 12
                }}>
                    {currentStep > 0 && (
                        <button onClick={handleBack} style={{
                            padding: '13px 28px', borderRadius: 10, border: '2px solid #e0e4ec',
                            background: '#fff', color: '#555', fontSize: '0.95rem', fontWeight: 600,
                            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                            transition: 'all 0.2s'
                        }}>
                            <FaArrowLeft /> Back
                        </button>
                    )}

                    {currentStep < 2 && (
                        <button onClick={handleNext} style={{
                            padding: '13px 32px', borderRadius: 10, border: 'none',
                            background: 'linear-gradient(135deg, #2c5aa0, #1a3a6e)',
                            color: '#fff', fontSize: '0.95rem', fontWeight: 600,
                            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                            transition: 'all 0.3s', boxShadow: '0 4px 16px rgba(44,90,160,0.3)'
                        }}>
                            Next <FaArrowRight />
                        </button>
                    )}

                    {currentStep === 2 && (
                        <button onClick={handleConfirm} style={{
                            padding: '13px 32px', borderRadius: 10, border: 'none',
                            background: 'linear-gradient(135deg, #27ae60, #1e8449)',
                            color: '#fff', fontSize: '0.95rem', fontWeight: 600,
                            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                            transition: 'all 0.3s', boxShadow: '0 4px 16px rgba(39,174,96,0.3)'
                        }}>
                            <FaCheckCircle /> Confirm & Proceed to Login
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Appointment;
