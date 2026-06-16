import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { 
  FaHeartbeat, 
  FaBrain, 
  FaBaby, 
  FaBone, 
  FaAmbulance, 
  FaRibbon,
  FaArrowRight,
  FaUserMd,
  FaClock,
  FaMapMarkerAlt
} from "react-icons/fa";

const Departments = () => {
  const sectionRef = useRef();
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const departmentsData = [
    {
      id: 1,
      name: "Cardiology",
      shortName: "Cardiology",
      icon: <FaHeartbeat />,
      description: "Comprehensive heart care with advanced diagnostic and treatment options for all cardiac conditions.",
      detailedDescription: "Our Cardiology department is equipped with state-of-the-art technology including cardiac catheterization labs, echocardiography, and stress testing facilities. We provide comprehensive care for heart disease, hypertension, and cardiovascular emergencies.",
      specialists: 12,
      services: [
        "Cardiac Catheterization",
        "Echocardiography", 
        "Stress Testing",
        "Pacemaker Implantation",
        "Heart Surgery",
        "Cardiac Rehabilitation"
      ],
      headOfDepartment: "Dr. Michael Rodriguez, MD",
      location: "3rd Floor, East Wing",
      consultationHours: "Mon-Fri: 8:00 AM - 6:00 PM",
      emergencyAvailable: true,
      image: "/dept-cardiology.jpg",
      color: "#e74c3c"
    },
    {
      id: 2,
      name: "Neurology",
      shortName: "Neurology", 
      icon: <FaBrain />,
      description: "Expert care for neurological conditions and brain health with advanced neurosurgical capabilities.",
      detailedDescription: "Our Neurology department specializes in the diagnosis and treatment of disorders of the nervous system, including the brain, spinal cord, and peripheral nerves. We offer comprehensive neurological evaluations and cutting-edge treatments.",
      specialists: 8,
      services: [
        "Brain Surgery",
        "Spinal Surgery",
        "Stroke Treatment", 
        "Epilepsy Care",
        "Movement Disorders",
        "Neurological Rehabilitation"
      ],
      headOfDepartment: "Dr. Sarah Chen, MD, PhD",
      location: "4th Floor, West Wing",
      consultationHours: "Mon-Fri: 9:00 AM - 5:00 PM",
      emergencyAvailable: true,
      image: "/dept-neurology.jpg",
      color: "#9b59b6"
    },
    {
      id: 3,
      name: "Pediatrics",
      shortName: "Pediatrics",
      icon: <FaBaby />,
      description: "Specialized healthcare for infants, children, and adolescents with family-centered approach.",
      detailedDescription: "Our Pediatrics department provides comprehensive healthcare for children from birth to 18 years. We focus on preventive care, growth monitoring, immunizations, and treatment of childhood illnesses in a child-friendly environment.",
      specialists: 15,
      services: [
        "Newborn Care",
        "Pediatric Surgery",
        "Vaccination Programs",
        "Growth & Development",
        "Pediatric Emergency",
        "Child Psychology"
      ],
      headOfDepartment: "Dr. Emily Johnson, MD",
      location: "2nd Floor, South Wing", 
      consultationHours: "Mon-Sat: 8:00 AM - 7:00 PM",
      emergencyAvailable: true,
      image: "/dept-pediatrics.jpg",
      color: "#3498db"
    },
    {
      id: 4,
      name: "Orthopedics",
      shortName: "Orthopedics",
      icon: <FaBone />,
      description: "Advanced treatment for bones, joints, and musculoskeletal system with minimally invasive techniques.",
      detailedDescription: "Our Orthopedic department specializes in the diagnosis and treatment of musculoskeletal disorders. We offer both surgical and non-surgical treatments for bones, joints, muscles, ligaments, and tendons.",
      specialists: 10,
      services: [
        "Joint Replacement",
        "Sports Medicine",
        "Spine Surgery", 
        "Trauma Care",
        "Arthroscopy",
        "Physical Therapy"
      ],
      headOfDepartment: "Dr. James Wilson, MD",
      location: "1st Floor, North Wing",
      consultationHours: "Mon-Fri: 7:00 AM - 6:00 PM",
      emergencyAvailable: true,
      image: "/dept-orthopedics.jpg", 
      color: "#2ecc71"
    },
    {
      id: 5,
      name: "Emergency Medicine",
      shortName: "Emergency",
      icon: <FaAmbulance />,
      description: "24/7 emergency medical services with rapid response team for critical situations.",
      detailedDescription: "Our Emergency Department operates 24/7 with board-certified emergency physicians, trauma surgeons, and specialized nursing staff. We are equipped to handle all types of medical emergencies and critical care situations.",
      specialists: 20,
      services: [
        "Trauma Care",
        "Cardiac Emergency",
        "Stroke Response",
        "Pediatric Emergency",
        "Critical Care",
        "Ambulance Services"
      ],
      headOfDepartment: "Dr. Robert Martinez, MD",
      location: "Ground Floor, Main Entrance",
      consultationHours: "24/7 Emergency Services",
      emergencyAvailable: true,
      image: "/dept-emergency.jpg",
      color: "#f39c12"
    },
    {
      id: 6,
      name: "Oncology", 
      shortName: "Oncology",
      icon: <FaRibbon />,
      description: "Comprehensive cancer care with latest treatment technologies and multidisciplinary approach.",
      detailedDescription: "Our Oncology department provides comprehensive cancer care including medical, surgical, and radiation oncology. We offer the latest in cancer treatment technology with a multidisciplinary team approach to patient care.",
      specialists: 7,
      services: [
        "Chemotherapy",
        "Radiation Therapy",
        "Surgical Oncology",
        "Immunotherapy",
        "Cancer Screening",
        "Palliative Care"
      ],
      headOfDepartment: "Dr. Lisa Thompson, MD, PhD",
      location: "5th Floor, Central Wing",
      consultationHours: "Mon-Fri: 8:00 AM - 5:00 PM",
      emergencyAvailable: false,
      image: "/dept-oncology.jpg",
      color: "#e67e22"
    }
  ];

  useGSAP(() => {
    // Title animation
    gsap.from(".departments-title", {
      scrollTrigger: {
        trigger: ".departments-title",
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    });

    // Department cards stagger animation
    gsap.from(".department-card", {
      scrollTrigger: {
        trigger: ".departments-grid",
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out"
    });

    // Individual card hover animations
    const cards = document.querySelectorAll(".department-card");
    cards.forEach(card => {
      const icon = card.querySelector(".dept-icon");
      const overlay = card.querySelector(".dept-overlay");
      const content = card.querySelector(".dept-content");

      const tl = gsap.timeline({ paused: true });

      tl.to(card, {
        y: -10,
        scale: 1.03,
        duration: 0.4,
        ease: "power2.out"
      })
      .to(icon, {
        scale: 1.15,
        rotation: 5,
        duration: 0.4,
        ease: "back.out(1.7)"
      }, 0)
      .to(overlay, {
        opacity: 0.9,
        duration: 0.4
      }, 0)
      .to(content, {
        y: -5,
        duration: 0.4,
        ease: "power2.out"
      }, 0);

      card.addEventListener("mouseenter", () => tl.play());
      card.addEventListener("mouseleave", () => tl.reverse());
    });

  }, { scope: sectionRef });

  const openDepartmentModal = (dept) => {
    setSelectedDepartment(dept);
    // Animate modal entrance
    gsap.fromTo(".department-modal", 
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
    );
  };

  const closeDepartmentModal = () => {
    // Animate modal exit
    gsap.to(".department-modal", {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => setSelectedDepartment(null)
    });
  };

  return (
    <section ref={sectionRef} className="departments-section">
      <div className="container">
        <h2 className="section-title departments-title">
          Our Medical Departments
          <span className="title-underline"></span>
        </h2>

        <p className="departments-intro">
          ZeeCare Medical Institute houses specialized departments staffed by experienced 
          medical professionals committed to providing exceptional healthcare services 
          across all medical specialties.
        </p>

        <div className="departments-grid">
          {departmentsData.map((dept) => (
            <div key={dept.id} className="department-card">
              <div 
                className="dept-overlay"
                style={{ backgroundColor: dept.color }}
              ></div>

              <div className="dept-header">
                <div className="dept-icon" style={{ color: dept.color }}>
                  {dept.icon}
                </div>
                <div className="dept-basic-info">
                  <h3 className="dept-name">{dept.name}</h3>
                  <div className="dept-specialists">
                    <FaUserMd /> {dept.specialists} Specialists
                  </div>
                </div>
              </div>

              <div className="dept-content">
                <p className="dept-description">{dept.description}</p>

                <div className="dept-quick-info">
                  <div className="dept-location">
                    <FaMapMarkerAlt /> {dept.location}
                  </div>
                  <div className="dept-hours">
                    <FaClock /> {dept.consultationHours}
                  </div>
                  {dept.emergencyAvailable && (
                    <div className="dept-emergency">
                      <FaAmbulance /> 24/7 Emergency Available
                    </div>
                  )}
                </div>

                <div className="dept-services-preview">
                  <h4>Key Services:</h4>
                  <ul>
                    {dept.services.slice(0, 3).map((service, index) => (
                      <li key={index}>{service}</li>
                    ))}
                    {dept.services.length > 3 && (
                      <li className="more-services">
                        +{dept.services.length - 3} more services
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="dept-footer">
                <button 
                  className="dept-btn"
                  onClick={() => openDepartmentModal(dept)}
                >
                  Learn More <FaArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="departments-cta">
          <h3>Need Specialized Care?</h3>
          <p>
            Our multidisciplinary team of specialists works together to provide 
            comprehensive care tailored to your specific health needs.
          </p>
          <div className="cta-buttons">
            <button className="btn btn-primary">Schedule Consultation</button>
            <button className="btn btn-secondary">View All Doctors</button>
          </div>
        </div>
      </div>

      {/* Department Detail Modal */}
      {selectedDepartment && (
        <div className="modal-overlay" onClick={closeDepartmentModal}>
          <div className="department-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeDepartmentModal}>×</button>

            <div className="modal-header">
              <div className="modal-icon" style={{ color: selectedDepartment.color }}>
                {selectedDepartment.icon}
              </div>
              <h2>{selectedDepartment.name} Department</h2>
            </div>

            <div className="modal-content">
              <div className="modal-description">
                <p>{selectedDepartment.detailedDescription}</p>
              </div>

              <div className="modal-info-grid">
                <div className="modal-info-item">
                  <h4>Head of Department</h4>
                  <p>{selectedDepartment.headOfDepartment}</p>
                </div>
                <div className="modal-info-item">
                  <h4>Location</h4>
                  <p>{selectedDepartment.location}</p>
                </div>
                <div className="modal-info-item">
                  <h4>Consultation Hours</h4>
                  <p>{selectedDepartment.consultationHours}</p>
                </div>
                <div className="modal-info-item">
                  <h4>Medical Staff</h4>
                  <p>{selectedDepartment.specialists} Qualified Specialists</p>
                </div>
              </div>

              <div className="modal-services">
                <h4>Our Services</h4>
                <div className="services-grid">
                  {selectedDepartment.services.map((service, index) => (
                    <div key={index} className="service-item">
                      {service}
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-actions">
                <button className="btn btn-primary">Book Appointment</button>
                <button className="btn btn-secondary">View Doctors</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Departments;