import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";

// Pages
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import AboutUs from "./pages/AboutUs";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Services from "./pages/Services";
import Doctors from "./pages/Doctors";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";

// Components
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import LoadingScreen from "./components/LoadingScreen";

// Dashboards
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";

// Context
import { Context } from "./context/Context";

// Register GSAP plugins
gsap.registerPlugin(useGSAP, ScrollTrigger, TextPlugin);

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser, user } = useContext(Context);
  const [loading, setLoading] = React.useState(true);

  useGSAP(() => {
    // Global GSAP settings
    gsap.defaults({
      duration: 0.6,
      ease: "power2.out"
    });

    // Respect reduced motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.globalTimeline.clear();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      return;
    }

    // Global scroll smoothing
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      ignoreMobileResize: true
    });
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/v1/user/patient/me", {
          credentials: "include"
        });

        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(true);
          setUser(data.user);
        } else {
          setIsAuthenticated(false);
          setUser({});
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setIsAuthenticated(false);
        setUser({});
      }
    };

    // Simulate loading time for smooth experience
    const timer = setTimeout(() => {
      setLoading(false);
      fetchUser();
    }, 2500);

    return () => clearTimeout(timer);
  }, [setIsAuthenticated, setUser]);

  return (
    <div className="app">
      {loading && <LoadingScreen />}

      <Router>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              isAuthenticated ? (
                user?.role === 'Doctor' ? <DoctorDashboard /> : <PatientDashboard />
              ) : (
                <Login />
              )
            } />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer 
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </div>
  );
};

export default App;