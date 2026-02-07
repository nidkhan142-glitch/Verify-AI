import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Manifesto } from './components/Manifesto';
import { HowItWorks } from './components/HowItWorks';
import { TeamsSection } from './components/TeamsSection';
import { StatsSection } from './components/StatsSection';
import { AnalysisTool } from './components/AnalysisTool';
import { History } from './components/History';
import { AuthModals } from './components/AuthModals';
import { LimitReachedModal } from './components/LimitReachedModal';
import { supabase } from './supabase';

export enum AuthMode {
  NONE = 'NONE',
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  LIMIT_REACHED = 'LIMIT_REACHED'
}

const BackgroundParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    interface Particle {
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
    }

    let particles: Particle[] = [];
    // Reduced count for better performance on lower-end devices
    const count = window.innerWidth < 768 ? 15 : 25;

    const init = () => {
      // Use devicePixelRatio for sharpness but cap it for performance
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 1.2 + 0.4,
        speed: Math.random() * 0.15 + 0.05,
        opacity: Math.random() * 0.4
      }));
    };

    let animationFrameId: number;
    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      // Batch drawing for performance
      ctx.fillStyle = '#10b981';
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y -= p.speed;
        if (p.y < -10) p.y = window.innerHeight + 10;
        
        ctx.globalAlpha = p.opacity * 0.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      animationFrameId = requestAnimationFrame(render);
    };

    init();
    render();
    
    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(init, 250);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none -z-10 opacity-70" />;
};

const App: React.FC = () => {
  const [authMode, setAuthMode] = useState<AuthMode>(AuthMode.NONE);
  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState(0);
  const analysisToolRef = useRef<{ runSample: () => void } | null>(null);
  const [guestCredits, setGuestCredits] = useState(() => {
    const saved = localStorage.getItem('verify_guest_credits');
    return saved !== null ? parseInt(saved, 10) : 30;
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        fetchCredits(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchCredits(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem('verify_guest_credits', guestCredits.toString());
  }, [guestCredits]);

  const fetchCredits = async (userId: string) => {
    const { data } = await supabase
      .from('user_credits')
      .select('credits')
      .eq('user_id', userId)
      .single();
    if (data) setCredits(data.credits);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCredits(0);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewSample = () => {
    scrollToSection('analysis-section');
    setTimeout(() => analysisToolRef.current?.runSample(), 600);
  };

  const currentDisplayCredits = user ? credits : guestCredits;

  return (
    <div className="min-h-screen selection:bg-emerald-500/30 bg-[#020617] text-white flex flex-col">
      <BackgroundParticles />
      <Header 
        scrollToSection={scrollToSection}
        setAuthMode={setAuthMode} 
        isLoggedIn={!!user}
        userName={user?.user_metadata?.full_name || user?.email?.split('@')[0] || ''}
        credits={currentDisplayCredits}
        onLogout={handleLogout}
      />
      
      <main className="flex-1 flex flex-col pt-8">
        <Hero onAnalyzeClick={() => scrollToSection('analysis-section')} onViewSample={handleViewSample} />
        
        <div className="space-y-40 pb-32">
          <HowItWorks />
          <Manifesto />
          <TeamsSection />
          <StatsSection />
          
          <div id="analysis-section" className="px-6 lg:px-16 max-w-7xl mx-auto scroll-mt-32">
            <AnalysisTool 
              ref={analysisToolRef}
              user={user} 
              credits={currentDisplayCredits} 
              onUpdateCredits={() => user ? fetchCredits(user.id) : null}
              guestCredits={guestCredits}
              onUpdateGuestCredits={setGuestCredits}
              showLimitModal={() => setAuthMode(AuthMode.LIMIT_REACHED)}
            />
          </div>

          <div id="history-section" className="px-6 lg:px-16 max-w-7xl mx-auto scroll-mt-32">
            <History />
          </div>
        </div>
      </main>

      {(authMode === AuthMode.LOGIN || authMode === AuthMode.SIGNUP) && (
        <AuthModals mode={authMode as AuthMode.LOGIN | AuthMode.SIGNUP} setMode={setAuthMode} />
      )}
      {authMode === AuthMode.LIMIT_REACHED && (
        <LimitReachedModal onContinue={() => setAuthMode(AuthMode.SIGNUP)} onClose={() => setAuthMode(AuthMode.NONE)} />
      )}
    </div>
  );
};

export default App;