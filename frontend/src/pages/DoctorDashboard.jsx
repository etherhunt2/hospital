import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { Context } from "../context/Context";
import { FaUsers, FaCalendarAlt, FaFileAlt, FaCalendarCheck, FaClock, FaUserInjured, FaHospital, FaPills, FaEdit, FaTrash, FaPlus, FaTimes, FaSave, FaFlask, FaStethoscope, FaCheckCircle, FaStar } from "react-icons/fa";
import { getSessionAppointments, updateSessionAppointment, getSessionPayments } from "../utils/sessionData";
import { apiGet, apiPut, apiPost, apiDelete } from "../utils/api";

const docTabs = ["My Patients", "Appointments", "Medical Reports"];

const DoctorDashboard = () => {
    const { user } = useContext(Context);
    const [activeTab, setActiveTab] = useState("My Patients");
    const [dashboard, setDashboard] = useState(null);
    const [patients, setPatients] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal state
    const [editingApt, setEditingApt] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [showReportModal, setShowReportModal] = useState(false);
    const [editingReport, setEditingReport] = useState(null);
    const [reportForm, setReportForm] = useState({ patientId: '', appointmentId: '', title: '', type: 'Diagnostic', diagnosis: '', findings: '', prescription: '', recommendations: '' });

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        try {
            const [dashRes, patRes, aptRes, rptRes] = await Promise.all([
                apiGet("/dashboard/doctor"),
                apiGet("/dashboard/doctor/patients"),
                apiGet("/dashboard/doctor/appointments"),
                apiGet("/dashboard/doctor/reports")
            ]);
            if (dashRes.success) setDashboard(dashRes.dashboard);
            if (patRes.success) setPatients(patRes.patients);
            if (aptRes.success) {
                const sessionApts = getSessionAppointments();
                setAppointments([...sessionApts, ...aptRes.appointments]);
            }
            if (rptRes.success) setReports(rptRes.reports);
        } catch (err) {
            console.error("Doctor dashboard error:", err);
        } finally {
            setLoading(false);
        }
    };

    // ─── Appointment update ─────────────────
    const openEditApt = (apt) => {
        setEditingApt(apt.id);
        setEditForm({ status: apt.status, notes: apt.notes || '', prescription: apt.prescription || '' });
    };

    const saveApt = async () => {
        if (String(editingApt).startsWith('apt_')) {
            updateSessionAppointment(editingApt, editForm);

            if (editForm.status === 'Cancelled') {
                const sessionApts = getSessionAppointments();
                const targetApt = sessionApts.find(a => a.id === editingApt);
                if (targetApt && targetApt.paymentStatus === 'Paid') {
                    const sessionPays = getSessionPayments();
                    const newPays = sessionPays.map(p => {
                        if (p.appointmentId === editingApt) return { ...p, status: 'Refund Initiated' };
                        return p;
                    });
                    sessionStorage.setItem('sessionPayments', JSON.stringify(newPays));
                }
            }

            toast.success("Appointment updated!");
            setEditingApt(null);
            fetchAll();
            return;
        }

        try {
            const data = await apiPut(`/dashboard/doctor/appointment/${editingApt}`, editForm);
            if (data.success) {
                toast.success("Appointment updated!");
                setEditingApt(null);
                fetchAll();
            } else toast.error(data.message);
        } catch { toast.error("Failed to update"); }
    };

    // ─── Report CRUD ────────────────────────
    const openNewReport = (patientId = '') => {
        setEditingReport(null);
        setReportForm({ patientId, appointmentId: '', title: '', type: 'Diagnostic', diagnosis: '', findings: '', prescription: '', recommendations: '' });
        setShowReportModal(true);
    };

    const openEditReport = (rpt) => {
        setEditingReport(rpt.id);
        setReportForm({ patientId: rpt.patientId, appointmentId: rpt.appointmentId || '', title: rpt.title, type: rpt.type, diagnosis: rpt.diagnosis, findings: rpt.findings, prescription: rpt.prescription, recommendations: rpt.recommendations });
        setShowReportModal(true);
    };

    const saveReport = async () => {
        if (!reportForm.patientId || !reportForm.title || !reportForm.diagnosis) {
            toast.error("Patient, title, and diagnosis are required");
            return;
        }
        try {
            let data;
            if (editingReport) {
                data = await apiPut(`/dashboard/doctor/report/${editingReport}`, reportForm);
            } else {
                data = await apiPost("/dashboard/doctor/report", reportForm);
            }
            if (data.success) {
                toast.success(editingReport ? "Report updated!" : "Report created!");
                setShowReportModal(false);
                fetchAll();
            } else toast.error(data.message);
        } catch { toast.error("Failed to save report"); }
    };

    const deleteReport = async (id) => {
        if (!confirm("Are you sure you want to delete this report?")) return;
        try {
            const data = await apiDelete(`/dashboard/doctor/report/${id}`);
            if (data.success) { toast.success("Report deleted"); fetchAll(); }
            else toast.error(data.message);
        } catch { toast.error("Failed to delete report"); }
    };

    const statusColor = (s) => {
        const map = { Completed: '#2ecc71', Upcoming: '#3498db', Pending: '#f39c12', Cancelled: '#e74c3c', Finalized: '#2ecc71', Draft: '#f39c12' };
        return map[s] || '#999';
    };

    if (loading) return <div style={{ padding: '4rem', textAlign: 'center', color: '#666' }}>Loading dashboard...</div>;

    const card = (icon, label, value, color) => (
        <div style={{
            background: '#fff', borderRadius: 14, padding: '1.2rem 1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            display: 'flex', alignItems: 'center', gap: 16, borderLeft: `4px solid ${color}`
        }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', color, fontSize: 20 }}>{icon}</div>
            <div>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</p>
                <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e' }}>{value}</p>
            </div>
        </div>
    );

    const inputSm = { width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #ddd', fontSize: '0.9rem', boxSizing: 'border-box' };

    return (
        <div style={{ padding: '2rem', maxWidth: 1200, margin: '0 auto', paddingTop: "100px" }}>
            {/* Header */}
            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', color: '#1a1a2e', margin: 0 }}>
                        <FaStethoscope style={{ marginRight: 8, color: '#e74c3c' }} />
                        Dr. {user?.firstName} {user?.lastName}
                    </h1>
                    <p style={{ color: '#888', margin: '4px 0 0' }}>{dashboard?.doctorProfile?.specialization || 'Doctor Dashboard'} • {dashboard?.doctorProfile?.department}</p>
                </div>
            </div>

            {/* Summary Cards */}
            {dashboard && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: '2rem' }}>
                    {card(<FaUsers />, "Total Patients", dashboard.totalPatients, '#3498db')}
                    {card(<FaCalendarAlt />, "Total Appointments", dashboard.totalAppointments, '#2ecc71')}
                    {card(<FaCalendarCheck />, "Upcoming", dashboard.upcomingAppointments, '#f39c12')}
                    {card(<FaFileAlt />, "Reports Written", dashboard.totalReports, '#9b59b6')}
                </div>
            )}

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 4, marginBottom: '1.5rem', borderBottom: '2px solid #eee' }}>
                {docTabs.map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} style={{
                        padding: '10px 20px', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600,
                        background: 'none', color: activeTab === tab ? '#e74c3c' : '#888',
                        borderBottom: activeTab === tab ? '3px solid #e74c3c' : '3px solid transparent',
                        transition: 'all 0.2s'
                    }}>{tab}</button>
                ))}
            </div>

            {/* My Patients Tab */}
            {activeTab === "My Patients" && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
                    {patients.length === 0 ? <p style={{ color: '#999', textAlign: 'center', padding: '2rem' }}>No patients yet</p> :
                        patients.map(pt => (
                            <div key={pt.id} style={{
                                background: '#fff', borderRadius: 12, padding: '1.2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                                borderTop: '3px solid #2c5aa0'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                                    <div style={{
                                        width: 44, height: 44, borderRadius: '50%', background: '#e8f4fd',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2c5aa0', fontSize: 18
                                    }}><FaUserInjured /></div>
                                    <div>
                                        <h4 style={{ margin: 0, color: '#1a1a2e' }}>{pt.firstName} {pt.lastName}</h4>
                                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#888' }}>{pt.email}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: 8, fontSize: '0.8rem', color: '#666', flexWrap: 'wrap' }}>
                                    <span><strong>Visits:</strong> {pt.totalVisits}</span>
                                    <span>•</span>
                                    <span><strong>Last:</strong> {pt.lastVisit}</span>
                                </div>
                                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
                                    {pt.departments.map((d, i) => (
                                        <span key={i} style={{ padding: '2px 10px', borderRadius: 12, background: '#e8f4fd', color: '#2c5aa0', fontSize: '0.72rem', fontWeight: 600 }}>{d}</span>
                                    ))}
                                </div>
                                <button onClick={() => openNewReport(pt.id)} style={{
                                    marginTop: 10, padding: '6px 14px', background: '#2c5aa0', color: '#fff',
                                    border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4
                                }}><FaPlus /> Write Report</button>
                            </div>
                        ))
                    }
                </div>
            )}

            {/* Appointments Tab */}
            {activeTab === "Appointments" && (
                <div style={{ display: 'grid', gap: 12 }}>
                    {appointments.map(apt => (
                        <div key={apt.id} style={{
                            background: '#fff', borderRadius: 12, padding: '1.2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                            borderLeft: `4px solid ${statusColor(apt.status)}`,
                            position: 'relative'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                                <div>
                                    {apt.isSessionTarget && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                                            <FaStar style={{ color: '#f39c12', fontSize: 12 }} />
                                            <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#f39c12', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                                Session Data
                                            </span>
                                        </div>
                                    )}
                                    <h4 style={{ margin: 0, color: '#1a1a2e' }}>
                                        <FaUserInjured style={{ marginRight: 6, color: '#3498db' }} />
                                        {apt.patient.firstName} {apt.patient.lastName}
                                    </h4>
                                    <p style={{ margin: '4px 0', fontSize: '0.85rem', color: '#666' }}>
                                        <FaClock style={{ marginRight: 4 }} /> {apt.appointmentDate} at {apt.appointmentTime} — {apt.appointmentType}
                                    </p>
                                    <p style={{ margin: '2px 0', fontSize: '0.82rem', color: '#888' }}>Reason: {apt.reasonForVisit}</p>
                                </div>
                                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                    <span style={{
                                        padding: '4px 14px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 600,
                                        background: statusColor(apt.status) + '18', color: statusColor(apt.status)
                                    }}>{apt.status}</span>
                                    <button onClick={() => openEditApt(apt)} style={{
                                        padding: '4px 10px', background: '#f0f0f0', border: 'none', borderRadius: 6,
                                        cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4
                                    }}><FaEdit /> Edit</button>
                                </div>
                            </div>

                            {/* Inline Edit Panel */}
                            {editingApt === apt.id && (
                                <div style={{
                                    marginTop: 12, padding: 12, background: '#f8f9fc', borderRadius: 8,
                                    display: 'grid', gap: 10
                                }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                        <div>
                                            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#555' }}>Status</label>
                                            <select value={editForm.status} onChange={e => setEditForm({ ...editForm, status: e.target.value })} style={inputSm}>
                                                <option value="Upcoming">Upcoming</option>
                                                <option value="Completed">Completed</option>
                                                <option value="Pending">Pending</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#555' }}>Prescription</label>
                                            <input value={editForm.prescription} onChange={e => setEditForm({ ...editForm, prescription: e.target.value })} placeholder="Medications..." style={inputSm} />
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#555' }}>Notes</label>
                                        <textarea value={editForm.notes} onChange={e => setEditForm({ ...editForm, notes: e.target.value })} rows={3} style={{ ...inputSm, resize: 'vertical' }} />
                                    </div>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <button onClick={saveApt} style={{ padding: '6px 16px', background: '#2ecc71', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 4 }}><FaSave /> Save</button>
                                        <button onClick={() => setEditingApt(null)} style={{ padding: '6px 16px', background: '#ddd', color: '#555', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: '0.82rem' }}>Cancel</button>
                                    </div>
                                </div>
                            )}

                            {apt.notes && editingApt !== apt.id && <p style={{ margin: '8px 0 0', fontSize: '0.82rem', color: '#555' }}><strong>Notes:</strong> {apt.notes}</p>}
                            {apt.prescription && editingApt !== apt.id && <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#2c5aa0' }}><FaPills style={{ marginRight: 4 }} /><strong>Rx:</strong> {apt.prescription}</p>}
                        </div>
                    ))}
                </div>
            )}

            {/* Medical Reports Tab */}
            {activeTab === "Medical Reports" && (
                <div>
                    <button onClick={() => openNewReport('')} style={{
                        marginBottom: 16, padding: '8px 20px', background: '#e74c3c', color: '#fff',
                        border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: '0.9rem',
                        display: 'flex', alignItems: 'center', gap: 6
                    }}><FaPlus /> New Report</button>

                    <div style={{ display: 'grid', gap: 12 }}>
                        {reports.map(rpt => (
                            <div key={rpt.id} style={{
                                background: '#fff', borderRadius: 12, padding: '1.2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                                borderLeft: `4px solid ${statusColor(rpt.status)}`
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                                    <div>
                                        <h4 style={{ margin: 0, color: '#1a1a2e' }}><FaFileAlt style={{ marginRight: 6, color: '#9b59b6' }} />{rpt.title}</h4>
                                        <p style={{ margin: '4px 0', fontSize: '0.82rem', color: '#666' }}>
                                            Patient: {rpt.patientId} • {rpt.type} • {new Date(rpt.createdAt).toLocaleDateString()}
                                        </p>
                                        <p style={{ margin: '2px 0', fontSize: '0.82rem', color: '#555' }}><strong>Diagnosis:</strong> {rpt.diagnosis}</p>
                                        {rpt.prescription && <p style={{ margin: '2px 0', fontSize: '0.82rem', color: '#2c5aa0' }}><FaPills style={{ marginRight: 4 }} /> {rpt.prescription}</p>}
                                    </div>
                                    <div style={{ display: 'flex', gap: 6 }}>
                                        <span style={{
                                            padding: '4px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600,
                                            background: statusColor(rpt.status) + '18', color: statusColor(rpt.status)
                                        }}>{rpt.status}</span>
                                        <button onClick={() => openEditReport(rpt)} style={{ padding: '4px 8px', background: '#f0f0f0', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: '0.75rem' }}><FaEdit /></button>
                                        <button onClick={() => deleteReport(rpt.id)} style={{ padding: '4px 8px', background: '#fce4e4', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: '0.75rem', color: '#e74c3c' }}><FaTrash /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Report Modal */}
            {showReportModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', zIndex: 1000, padding: 16
                }}>
                    <div style={{
                        background: '#fff', borderRadius: 16, padding: '2rem', width: '100%',
                        maxWidth: 560, maxHeight: '90vh', overflowY: 'auto', position: 'relative'
                    }}>
                        <button onClick={() => setShowReportModal(false)} style={{
                            position: 'absolute', top: 12, right: 12, background: 'none',
                            border: 'none', fontSize: 18, cursor: 'pointer', color: '#999'
                        }}><FaTimes /></button>

                        <h3 style={{ margin: '0 0 16px', color: '#1a1a2e' }}>
                            <FaFileAlt style={{ marginRight: 8, color: '#9b59b6' }} />
                            {editingReport ? 'Edit Report' : 'New Medical Report'}
                        </h3>

                        <div style={{ display: 'grid', gap: 12 }}>
                            {!editingReport && (
                                <div>
                                    <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#555' }}>Patient *</label>
                                    <select value={reportForm.patientId} onChange={e => setReportForm({ ...reportForm, patientId: e.target.value })} style={inputSm}>
                                        <option value="">Select Patient</option>
                                        {patients.map(p => <option key={p.id} value={p.id}>{p.firstName} {p.lastName}</option>)}
                                    </select>
                                </div>
                            )}
                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 10 }}>
                                <div>
                                    <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#555' }}>Title *</label>
                                    <input value={reportForm.title} onChange={e => setReportForm({ ...reportForm, title: e.target.value })} style={inputSm} placeholder="Report title..." />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#555' }}>Type</label>
                                    <select value={reportForm.type} onChange={e => setReportForm({ ...reportForm, type: e.target.value })} style={inputSm}>
                                        <option>Diagnostic</option>
                                        <option>Follow-up</option>
                                        <option>Lab Report</option>
                                        <option>Prescription</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#555' }}>Diagnosis *</label>
                                <textarea value={reportForm.diagnosis} onChange={e => setReportForm({ ...reportForm, diagnosis: e.target.value })} rows={2} style={{ ...inputSm, resize: 'vertical' }} />
                            </div>
                            <div>
                                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#555' }}>Findings</label>
                                <textarea value={reportForm.findings} onChange={e => setReportForm({ ...reportForm, findings: e.target.value })} rows={2} style={{ ...inputSm, resize: 'vertical' }} />
                            </div>
                            <div>
                                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#555' }}>Prescription</label>
                                <input value={reportForm.prescription} onChange={e => setReportForm({ ...reportForm, prescription: e.target.value })} style={inputSm} />
                            </div>
                            <div>
                                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#555' }}>Recommendations</label>
                                <textarea value={reportForm.recommendations} onChange={e => setReportForm({ ...reportForm, recommendations: e.target.value })} rows={2} style={{ ...inputSm, resize: 'vertical' }} />
                            </div>
                            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                                <button onClick={saveReport} style={{
                                    padding: '10px 24px', background: '#2c5aa0', color: '#fff', border: 'none',
                                    borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem',
                                    display: 'flex', alignItems: 'center', gap: 6
                                }}><FaSave /> {editingReport ? 'Update' : 'Create'} Report</button>
                                <button onClick={() => setShowReportModal(false)} style={{
                                    padding: '10px 24px', background: '#f0f0f0', color: '#555', border: 'none',
                                    borderRadius: 8, cursor: 'pointer', fontSize: '0.9rem'
                                }}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorDashboard;
