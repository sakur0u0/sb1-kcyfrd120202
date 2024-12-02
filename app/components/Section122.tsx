"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Section122() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ネオンテキストのアニメーション
      gsap.to(textRef.current, {
        textShadow: "0 0 30px rgba(72, 255, 167, 0.8), 0 0 60px rgba(72, 255, 167, 0.4), 0 0 90px rgba(72, 255, 167, 0.2)",
        repeat: -1,
        yoyo: true,
        duration: 1.5,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      });

      // メインのアニメーション
      tl.from(textRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
      })
      .to(textRef.current, {
        scale: 1.1,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      }, "+=0.3");

      // 背景のグラデーション遷移
      tl.fromTo(overlayRef.current, 
        {
          opacity: 0,
          y: "100%",
        },
        {
          opacity: 1,
          y: "0%",
          duration: 1,
          ease: "power2.inOut",
        },
        "<"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative flex h-screen items-center justify-center overflow-hidden bg-black"
    >
      {/* グラデーション背景オーバーレイ */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-t from-white via-gray-100/90 to-transparent"
        style={{ transform: 'translateY(100%)', opacity: 0 }}
      />
      
      {/* ネオンテキスト */}
      <h2
        ref={textRef}
        className="relative z-10 text-[15vw] font-black tracking-tighter"
        style={{ 
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#4FFFA7",
          textShadow: "0 0 30px rgba(72, 255, 167, 0.8)",
        }}
      >
        NEXT
      </h2>
    </div>
  );
}