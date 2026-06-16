import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FaUserPlus, FaUserMd, FaHospital } from "react-icons/fa";

const Statistics = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const stats = [
        {
            icon: <FaUserPlus />,
            value: 10000,
            label: "Patients Treated",
            suffix: "+",
        },
        {
            icon: <FaUserMd />,
            value: 150,
            label: "Qualified Staff",
            suffix: "+",
        },
        {
            icon: <FaHospital />,
            value: 50,
            label: "Departments",
            suffix: "+",
        },
    ];

    return (
        <div ref={ref} className="statistics-section">
            <div className="container">
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-item">
                            <div className="stat-icon">
                                {stat.icon}
                            </div>
                            <div className="stat-number">
                                {inView ? (
                                    <CountUp 
                                        end={stat.value} 
                                        duration={3} 
                                        suffix={stat.suffix}
                                    />
                                ) : (
                                    "0" + stat.suffix
                                )}
                            </div>
                            <p className="stat-label">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Statistics;
