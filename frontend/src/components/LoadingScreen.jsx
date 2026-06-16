import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const LoadingScreen = () => {
  const loaderRef = useRef();
  const crossRef = useRef();
  const textRef = useRef();

  useGSAP(() => {
    // Set initial states
    gsap.set(crossRef.current, { 
      scale: 0, 
      rotation: -180,
      transformOrigin: "center center"
    });
    gsap.set(textRef.current, { opacity: 0, y: 20 });

    // Create loading animation timeline
    const tl = gsap.timeline();

    tl.to(crossRef.current, {
      scale: 1,
      rotation: 0,
      duration: 1,
      ease: "back.out(1.7)"
    })
    .to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3")
    .to(crossRef.current, {
      rotation: 360,
      duration: 1,
      ease: "power2.inOut",
      repeat: 1
    }, "+=0.5")
    .to([crossRef.current, textRef.current], {
      scale: 0.9,
      opacity: 0.9,
      duration: 0.3,
      yoyo: true,
      repeat: 3,
      ease: "power2.inOut"
    })
    .to(loaderRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      ease: "power2.inOut",
      delay: 0.5
    });

  }, { scope: loaderRef });

  return (
    <div ref={loaderRef} className="loader">
      <div className="loader-content">
        <div ref={crossRef} className="medical-cross">
          <div className="cross-horizontal"></div>
          <div className="cross-vertical"></div>
        </div>
        <div ref={textRef} className="loader-text" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
          <div className="brand-text">
             <span className="brand-zee">Zee</span>
             <span className="brand-care">Care</span>
          </div>
          <span>Medical Institute</span>
        </div>
        <div className="loader-subtitle">
          Loading your healthcare experience...
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;