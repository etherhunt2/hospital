import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";
import { apiGet } from "../utils/api";

const NewsAndEvents = () => {
  const sectionRef = useRef();
  const [newsData, setNewsData] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await apiGet('/stats/news');
        if (res.success) {
          setNewsData(res.news || []);
          setUpcomingEvents(res.upcomingEvents || []);
        }
      } catch (error) {
        console.error("Error fetching news and events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  useGSAP(() => {
    if (loading) return;

    // Title animation
    gsap.from(".news-title", {
      scrollTrigger: {
        trigger: ".news-title",
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    });

    // Simple entrance animation for news cards
    if (newsData.length > 0) {
      gsap.fromTo(".news-card", 
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".news-grid",
            start: "top 85%",
            end: "top 60%",
            toggleActions: "play complete none none"
          },
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out"
        }
      );
    }

    // Enhanced Events list animation with alternating sides
    if (upcomingEvents.length > 0) {
      gsap.utils.toArray(".event-item").forEach((event, i) => {
        gsap.fromTo(event, 
          { x: i % 2 === 0 ? -100 : 100, opacity: 0 },
          {
            scrollTrigger: {
              trigger: event,
              start: "top 85%",
              end: "top 65%",
              toggleActions: "play complete none none",
              markers: false
            },
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
          }
        );
      });
    }

    // Stay Connected section animation
    gsap.from(".events-cta", {
      scrollTrigger: {
        trigger: ".events-cta",
        start: "top 80%",
        toggleActions: "play complete none none"
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.2)"
    });
  }, { scope: sectionRef, dependencies: [loading, newsData, upcomingEvents] });

  const handleNewsClick = () => {
    toast.error("Your Subscription Expired");
  };

  return (
    <section ref={sectionRef} className="news-events">
      <div className="container">
        <h2 className="section-title news-title">
          Latest News & Upcoming Events
          <span className="title-underline"></span>
        </h2>

        {loading ? (
           <div style={{ textAlign: 'center', padding: '4rem', color: '#666' }}>Loading updates...</div>
        ) : (
          <div className="news-events-content">
            <div className="news-section">
              <h3 className="subsection-title">Recent News</h3>
              <div className="news-grid">
                {newsData.length === 0 ? <p>No recent news available.</p> : newsData.map((item, index) => (
                  <article key={item.id} className={`news-card ${item.featured ? 'featured' : ''}`} onClick={handleNewsClick} style={{ cursor: 'pointer' }}>
                    <div className="news-image-container">
                      <div className="news-image" style={{ 
                        backgroundImage: `url(${item.image || '/default-news.jpg'})`,
                        backgroundColor: '#e1e5eb' // Fallback color if image misses
                      }}></div>
                      <div className="news-overlay"></div>
                      <div className="news-category">{item.category}</div>
                    </div>
                    <div className="news-content">
                      <div className="news-meta">
                        <span className="news-date">
                          <FaCalendarAlt /> {new Date(item.date).toLocaleDateString()}
                        </span>
                        {item.location && (
                          <span className="news-location">
                            <FaMapMarkerAlt /> {item.location}
                          </span>
                        )}
                        {item.time && (
                          <span className="news-time">
                            <FaClock /> {item.time}
                          </span>
                        )}
                      </div>
                      <h4 className="news-title-item">{item.title}</h4>
                      <p className="news-excerpt">{item.excerpt}</p>
                      {item.duration && (
                        <div className="news-duration">Duration: {item.duration}</div>
                      )}
                      <button className="read-more-btn" onClick={(e) => { e.stopPropagation(); handleNewsClick(); }}>
                        Read More <FaArrowRight />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="events-section">
              <h3 className="subsection-title">Upcoming Events</h3>
              <div className="upcoming-events">
                {upcomingEvents.length === 0 ? <p>No upcoming events.</p> : upcomingEvents.map((event, index) => (
                  <div key={index} className="event-item">
                    <div className="event-date">
                      <div className="event-day">
                        {new Date(event.date).getDate()}
                      </div>
                      <div className="event-month">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                    </div>
                    <div className="event-details">
                      <h4 className="event-title">{event.title}</h4>
                      <div className="event-meta">
                        <span className="event-time">
                          <FaClock /> {event.time}
                        </span>
                        <span className="event-location">
                          <FaMapMarkerAlt /> {event.location}
                        </span>
                      </div>
                    </div>
                    <button className="event-register-btn">
                      <span>Register</span>
                      <FaArrowRight className="btn-icon" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="events-cta">
                <div className="cta-content">
                  <h4>Stay Connected</h4>
                  <p>Subscribe to our newsletter to receive updates about upcoming events, health tips, and important announcements.</p>
                  <div className="newsletter-signup">
                    <div className="input-group">
                      <input type="email" placeholder="Enter your email address" />
                      <button className="subscribe-btn" onClick={(e) => { e.preventDefault(); toast.success("Subscribed!"); }}>
                        Subscribe
                        <FaArrowRight className="btn-icon" />
                      </button>
                    </div>
                    <p className="privacy-note">We respect your privacy. Unsubscribe at any time.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsAndEvents;