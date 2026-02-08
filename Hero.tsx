// components/Hero.tsx - RESPONSIVE & DRAMATIC VERSION
import React, { useState, useRef, useEffect } from 'react';

interface HeroProps {
  onAnalyzeClick: () => void;
  onViewSample: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onAnalyzeClick, onViewSample }) => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (textRef.current && isHovering) {
        const rect = textRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovering]);

  return (
    <>
      <style>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        .hero-text-gradient {
          background: linear-gradient(
            135deg,
            #1e40af ${mousePosition.x - 20}%,
            #3b82f6 ${mousePosition.x - 10}%,
            #60a5fa ${mousePosition.x}%,
            #ffffff ${mousePosition.x + 10}%,
            #ffffff ${mousePosition.x + 30}%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          transition: background 0.1s ease-out;
          display: block;
          width: 100%;
          overflow-wrap: break-word;
          hyphens: auto;
        }

        .hero-text-gradient:hover {
          background: radial-gradient(
            circle at ${mousePosition.x}% ${mousePosition.y}%,
            #1e3a8a 0%,
            #2563eb 15%,
            #60a5fa 25%,
            #ffffff 35%,
            #ffffff 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glow-static {
          position: absolute;
          width: 150vw;
          height: 150vw;
          max-width: 800px;
          max-height: 800px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%);
          filter: blur(80px);
          animation: sparkle 4s ease-in-out infinite;
          pointer-events: none;
        }

        .button-primary {
          padding: 16px 32px;
          background: linear-gradient(135deg, #10b981, #34d399);
          color: #000;
          font-weight: 700;
          font-size: 18px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          box-shadow: 0 10px 40px rgba(16, 185, 129, 0.4);
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
          width: 100%;
        }

        .button-primary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 15px 50px rgba(16, 185, 129, 0.6);
        }

        .button-secondary {
          padding: 16px 32px;
          background: transparent;
          border: 2px solid #334155;
          color: #fff;
          font-weight: 700;
          font-size: 18px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          width: 100%;
        }

        .button-secondary:hover {
          border-color: #10b981;
          background: rgba(16, 185, 129, 0.1);
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.3);
        }

        @media (min-width: 640px) {
          .button-primary, .button-secondary {
            width: auto;
          }
          .hero-buttons {
            flex-direction: row;
          }
        }

        @media (max-width: 480px) {
          .hero-text-gradient {
            font-size: 2.25rem !important;
            line-height: 1.2 !important;
          }
        }
      `}</style>

      <section style={{
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 20px 40px 20px',
        overflow: 'hidden',
        textAlign: 'center'
      }}>
        {/* Static Glow - BEHIND EVERYTHING */}
        <div className="glow-static" style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 0
        }} />

        {/* Main Content */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1280px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          alignItems: 'center'
        }}>
          {/* Hero Text - ADAPTIVE SIZING */}
          <h1
            ref={textRef}
            className="hero-text-gradient"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{
              fontSize: 'clamp(2.5rem, 9vw, 6rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              margin: 0,
              cursor: 'default',
              userSelect: 'none'
            }}
          >
            Authenticity Intelligence
            <br className="hidden md:block" />
            <span className="md:hidden"> </span>
            for Modern Contexts
          </h1>

          {/* Secondary Text - ALWAYS WHITE */}
          <p style={{
            fontSize: 'clamp(1rem, 4vw, 1.5rem)',
            color: '#cbd5e1',
            maxWidth: '768px',
            margin: '0 auto',
            lineHeight: 1.5,
            padding: '0 10px'
          }}>
            Evaluate writing patterns through an ethical, transparent lens.
            <br className="hidden sm:block" />
            <span style={{ color: '#34d399', fontWeight: 600 }}>
              Shift from detection to insight with biological precision.
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="hero-buttons" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '24px',
            width: '100%',
            maxWidth: '500px'
          }}>
            <button onClick={onAnalyzeClick} className="button-primary">
              Analyze Now
            </button>
            
            <button onClick={onViewSample} className="button-secondary">
              View Sample Report
            </button>
          </div>

          {/* Credits Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '9999px',
            marginTop: '24px'
          }}>
            <span style={{
              color: '#34d399',
              fontFamily: 'monospace',
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '0.05em',
              whiteSpace: 'nowrap'
            }}>
              30 FREE CREDITS AVAILABLE
            </span>
          </div>
        </div>
      </section>
    </>
  );
};