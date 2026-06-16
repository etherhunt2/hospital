import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaUserMd, FaStar, FaCalendarAlt, FaClock, FaSearch, FaFilter } from "react-icons/fa";

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDept, setSelectedDept] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const sectionRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [docRes, deptRes] = await Promise.all([
                    fetch("/api/v1/doctor"),
                    fetch("/api/v1/department")
                ]);
                const docData = await docRes.json();
                const deptData = await deptRes.json();

                if (docData.success) {
                    setDoctors(docData.doctors);
                    setFilteredDoctors(docData.doctors);
                }
                if (deptData.success) {
                    setDepartments(deptData.departments);
                }
            } catch (error) {
                console.error("Error fetching doctors:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        let result = [...doctors];
        if (selectedDept !== "All") {
            result = result.filter(d => d.department === selectedDept);
        }
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(d =>
                d.firstName.toLowerCase().includes(q) ||
                d.lastName.toLowerCase().includes(q) ||
                d.specialization.toLowerCase().includes(q)
            );
        }
        setFilteredDoctors(result);
    }, [selectedDept, searchQuery, doctors]);

    useGSAP(() => {
        if (loading) return;
        gsap.from(".doctor-card", {
            y: 60,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        });
    }, { scope: sectionRef, dependencies: [loading, filteredDoctors] });

    if (loading) {
        return (
            <div className="doctors-page" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                <div className="loading-spinner" style={{
                    width: 48, height: 48, border: '4px solid #eee',
                    borderTop: '4px solid #2c5aa0', borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite', margin: '2rem auto'
                }} />
                <p style={{ color: '#666' }}>Loading doctors...</p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); }}`}</style>
            </div>
        );
    }

    return (
        <div ref={sectionRef} className="doctors-page" style={{ padding: '2rem', maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.2rem', color: '#1a1a2e', marginBottom: '0.5rem' }}>
                    <FaUserMd style={{ marginRight: 10, color: '#2c5aa0' }} />
                    Meet Our Expert Doctors
                </h1>
                <p style={{ color: '#666', maxWidth: 600, margin: '0 auto' }}>
                    Our team of highly qualified medical professionals is committed to providing exceptional healthcare.
                </p>
            </div>

            {/* Filters */}
            <div style={{
                display: 'flex', gap: 12, marginBottom: '2rem', flexWrap: 'wrap',
                justifyContent: 'center', alignItems: 'center'
            }}>
                <div style={{
                    display: 'flex', alignItems: 'center', background: '#f8f9fa',
                    borderRadius: 8, padding: '8px 14px', border: '1px solid #e0e0e0', flex: '1 1 300px', maxWidth: 400
                }}>
                    <FaSearch style={{ color: '#999', marginRight: 8 }} />
                    <input
                        type="text"
                        placeholder="Search by name or specialization..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            border: 'none', background: 'transparent', outline: 'none',
                            width: '100%', fontSize: '0.95rem'
                        }}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <FaFilter style={{ color: '#2c5aa0' }} />
                    <select
                        value={selectedDept}
                        onChange={(e) => setSelectedDept(e.target.value)}
                        style={{
                            padding: '8px 14px', borderRadius: 8, border: '1px solid #e0e0e0',
                            background: '#f8f9fa', fontSize: '0.95rem', cursor: 'pointer'
                        }}
                    >
                        <option value="All">All Departments</option>
                        {departments.map((dept) => (
                            <option key={dept.id} value={dept.name}>{dept.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <p style={{ textAlign: 'center', color: '#888', marginBottom: '1.5rem' }}>
                Showing {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
            </p>

            {/* Doctor Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
                {filteredDoctors.map((doc) => (
                    <div key={doc.id} className="doctor-card" style={{
                        background: '#fff', borderRadius: 16, overflow: 'hidden',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)', transition: 'transform 0.3s, box-shadow 0.3s',
                        cursor: 'pointer'
                    }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'; }}
                    >
                        {/* Header */}
                        <div style={{
                            background: `linear-gradient(135deg, #2c5aa0, #1a3a6e)`,
                            padding: '1.5rem', display: 'flex', alignItems: 'center', gap: 16
                        }}>
                            <img
                                src={doc.avatar}
                                alt={`Dr. ${doc.firstName} ${doc.lastName}`}
                                style={{
                                    width: 72, height: 72, borderRadius: '50%',
                                    border: '3px solid rgba(255,255,255,0.3)', objectFit: 'cover'
                                }}
                            />
                            <div>
                                <h3 style={{ color: '#fff', margin: 0, fontSize: '1.1rem' }}>
                                    Dr. {doc.firstName} {doc.lastName}
                                </h3>
                                <p style={{ color: 'rgba(255,255,255,0.8)', margin: '4px 0 0', fontSize: '0.85rem' }}>
                                    {doc.specialization}
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                                    <FaStar style={{ color: '#ffc107', fontSize: 14 }} />
                                    <span style={{ color: '#fff', fontSize: '0.85rem' }}>
                                        {doc.rating} ({doc.reviewCount} reviews)
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Body */}
                        <div style={{ padding: '1.2rem' }}>
                            <div style={{
                                display: 'inline-block', padding: '4px 12px', borderRadius: 20,
                                background: '#e8f4fd', color: '#2c5aa0', fontSize: '0.8rem',
                                fontWeight: 600, marginBottom: 10
                            }}>
                                {doc.department}
                            </div>
                            <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: 12 }}>
                                {doc.bio && doc.bio.length > 120 ? doc.bio.substring(0, 120) + '...' : doc.bio}
                            </p>

                            <div style={{ display: 'flex', gap: 16, fontSize: '0.82rem', color: '#777', borderTop: '1px solid #f0f0f0', paddingTop: 12 }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <FaCalendarAlt style={{ color: '#2c5aa0' }} /> {doc.experience}+ years
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <FaClock style={{ color: '#2c5aa0' }} /> {doc.availableTime}
                                </span>
                            </div>

                            {doc.consultationFee && (
                                <div style={{
                                    marginTop: 12, padding: '8px 0', borderTop: '1px solid #f0f0f0',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                }}>
                                    <span style={{ fontSize: '0.85rem', color: '#888' }}>Consultation Fee</span>
                                    <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#2c5aa0' }}>
                                        ${doc.consultationFee}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {filteredDoctors.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>
                    <FaUserMd style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }} />
                    <p>No doctors found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};

export default Doctors;
