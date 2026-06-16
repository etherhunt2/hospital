import React from "react";

const Testimonials = () => {
    const samples = [
        { name: 'John D.', text: 'Great care and friendly staff.' },
        { name: 'Mary S.', text: 'Professional doctors and quick service.' }
    ];

    return (
        <div className="testimonials" style={{ padding: '1.5rem', background: '#fff' }}>
            <h3 style={{ textAlign: 'center' }}>What Patients Say</h3>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                {samples.map((s, i) => (
                    <blockquote key={i} style={{ border: '1px solid #eee', padding: 12, maxWidth: 300 }}>
                        <p>“{s.text}”</p>
                        <footer style={{ textAlign: 'right', fontWeight: '600' }}>- {s.name}</footer>
                    </blockquote>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;
