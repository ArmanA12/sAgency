
import React, { Suspense, useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import FreeDownloads from './components/FreeDownloads';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ArrowUpRight, Code2, Database, Globe, Smartphone, PenTool, LayoutTemplate, Zap, FileJson, Activity, MousePointer2, ShieldCheck, Rocket, Search } from 'lucide-react';

const CanvasLoader = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-[#050505] text-white/20 text-xs font-mono tracking-widest">
    INITIALIZING 3D ENV...
  </div>
);

// --- Custom Hooks for Animation ---
function useOnScreen(ref: React.RefObject<HTMLElement>) {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return isIntersecting;
}

const AnimatedNumber = ({ value }: { value: string }) => {
    const numericValue = parseInt(value.replace(/\D/g, ''));
    const suffix = value.replace(/[0-9]/g, '');
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const onScreen = useOnScreen(ref);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (onScreen && !hasAnimated.current) {
            hasAnimated.current = true;
            let start = 0;
            const end = numericValue;
            const duration = 2000;
            const incrementTime = Math.max(duration / end, 10);
            
            const timer = setInterval(() => {
                start += 1;
                setCount(start);
                if (start >= end) clearInterval(timer);
            }, incrementTime);
        }
    }, [onScreen, numericValue]);

    return <div ref={ref} className="tabular-nums">{count}{suffix}</div>;
};

const App: React.FC = () => {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolledPastHero(window.scrollY > window.innerHeight - 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030305] text-white font-sans overflow-x-hidden selection:bg-[#F6A3FE] selection:text-black">
      
      {/* Sticky Navbar (appears only after scroll) */}
      <div className={`transition-all duration-700 z-50 fixed top-0 w-full ${scrolledPastHero ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <Navbar />
      </div>

      {/* --- HERO SECTION WRAPPER --- */}
      <div className="p-4 md:p-6 pb-0 max-w-[1920px] mx-auto min-h-screen flex flex-col mb-12">
        
        {/* THE MAIN CARD */}
        <div className="relative w-full flex-grow min-h-[85vh] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl flex flex-col group">
            
            {/* 3D Background */}
            <div className="absolute inset-0 z-0 bg-[#050505]">
                <Suspense fallback={<CanvasLoader />}>
                    <Hero3D />
                </Suspense>
            </div>
            
            {/* Premium Vignette */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030305_90%)] opacity-60 pointer-events-none"></div>

            {/* --- PREMIUM HUD CORNERS --- */}
            <div className="absolute top-8 left-8 w-6 h-6 border-t border-l border-white/30 rounded-tl-lg z-20"></div>
            <div className="absolute top-8 right-8 w-6 h-6 border-t border-r border-white/30 rounded-tr-lg z-20"></div>
            <div className="absolute bottom-8 left-8 w-6 h-6 border-b border-l border-white/30 rounded-bl-lg z-20"></div>
            <div className="absolute bottom-8 right-8 w-6 h-6 border-b border-r border-white/30 rounded-br-lg z-20"></div>
            
            {/* System Status Indicators */}
            <div className="absolute top-10 right-10 z-20 hidden md:flex items-center gap-3">
                <div className="flex flex-col items-end">
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">System</span>
                    <span className="text-[10px] font-mono text-[#F6A3FE] uppercase tracking-widest animate-pulse">Online</span>
                </div>
                <div className="w-1 h-8 bg-gradient-to-b from-[#215BFE] to-[#F6A3FE]"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 w-full h-full flex flex-col p-8 md:p-12 lg:p-16 flex-grow">
                
                {/* Top Section: Heading & Portal */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-12 mt-8 md:mt-0">
                    
                    {/* Main Headline with Glow Effect */}
                    <div className="lg:w-2/3 relative">
                        {/* Glow Backdrop */}
                        <div className="absolute -inset-10 bg-black/40 blur-3xl rounded-full pointer-events-none"></div>
                        
                        <h1 className="relative text-5xl md:text-7xl lg:text-[6rem] font-display font-semibold leading-[1.05] tracking-tight text-white animate-[fade-up_1s_ease-out_forwards]">
                            UX/UI DESIGN & SOFTWARE DEVELOPMENT<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFBDFF] via-[#F6A3FE] to-[#215BFE] drop-shadow-lg">
                                FOR BUSINESS
                            </span>
                        </h1>
                    </div>

                    {/* Right Side: Feature Portal (CYBERNETIC NEURAL NODE REDESIGN) */}
                    <div className="lg:w-1/3 relative flex justify-center lg:justify-end animate-[fade-up_1s_ease-out_0.3s_forwards] opacity-0 z-[50]">
                         <div className="relative w-80 h-80 flex items-center justify-center">
                            
                            {/* Central Tesseract Core */}

                            {/* Node 1: Security (Top Right) */}
                            <div className="absolute -top-6 -right-4 flex items-center gap-4 animate-[float_6s_ease-in-out_infinite] z-20">
                                 {/* Connection Line */}
                                 <div className="w-12 h-[1px] bg-gradient-to-l from-[#F6A3FE]/50 to-transparent"></div>
                                 {/* Widget */}
                                 <div className="bg-[#0A0A0C]/90 backdrop-blur-xl border border-white/10 p-3 rounded-lg flex items-center gap-3 shadow-[0_0_30px_rgba(246,163,254,0.15)] hover:border-[#F6A3FE]/50 transition-colors group/node cursor-default">
                                      <div className="p-2 bg-[#F6A3FE]/10 rounded-md text-[#F6A3FE] group-hover/node:bg-[#F6A3FE] group-hover/node:text-black transition-colors">
                                          <ShieldCheck size={16} />
                                      </div>
                                      <div className="flex flex-col">
                                          <span className="text-[9px] font-mono text-gray-500 uppercase">Module_01</span>
                                          <span className="text-xs font-bold text-white uppercase tracking-wider">Secure Core</span>
                                      </div>
                                 </div>
                            </div>

                            {/* Node 2: Speed (Left) */}
                            <div className="absolute top-1/2 -left-12 transform -translate-y-1/2 flex items-center gap-4 flex-row-reverse animate-[float_5s_ease-in-out_infinite_reverse] delay-700 z-20">
                                 <div className="w-12 h-[1px] bg-gradient-to-r from-[#215BFE]/50 to-transparent"></div>
                                 <div className="bg-[#0A0A0C]/90 backdrop-blur-xl border border-white/10 p-3 rounded-lg flex items-center gap-3 shadow-[0_0_30px_rgba(33,91,254,0.15)] hover:border-[#215BFE]/50 transition-colors group/node cursor-default">
                                      <div className="p-2 bg-[#215BFE]/10 rounded-md text-[#215BFE] group-hover/node:bg-[#215BFE] group-hover/node:text-white transition-colors">
                                          <Rocket size={16} />
                                      </div>
                                      <div className="flex flex-col">
                                          <span className="text-[9px] font-mono text-gray-500 uppercase">Latency</span>
                                          <span className="text-xs font-bold text-white uppercase tracking-wider">&lt; 10ms</span>
                                      </div>
                                 </div>
                            </div>

                            {/* Node 3: SEO (Bottom Right) */}
                            <div className="absolute -bottom-2 right-0 flex items-center gap-4 animate-[float_7s_ease-in-out_infinite] delay-300 z-20">
                                 <div className="w-8 h-[1px] bg-gradient-to-l from-white/50 to-transparent rotate-45 origin-right"></div>
                                 <div className="bg-[#0A0A0C]/90 backdrop-blur-xl border border-white/10 p-3 rounded-lg flex items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:border-white/50 transition-colors group/node cursor-default">
                                      <div className="p-2 bg-white/10 rounded-md text-white group-hover/node:bg-white group-hover/node:text-black transition-colors">
                                          <Search size={16} />
                                      </div>
                                      <div className="flex flex-col">
                                          <span className="text-[9px] font-mono text-gray-500 uppercase">Index.Bot</span>
                                          <span className="text-xs font-bold text-white uppercase tracking-wider">Optimized</span>
                                      </div>
                                 </div>
                            </div>

                         </div>
                    </div>
                </div>

                {/* Middle Spacer */}
                <div className="flex-grow flex items-center justify-center">
                    {/* Optional Center Scroll Hint */}
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col gap-6 animate-[fade-up_1s_ease-out_0.6s_forwards] opacity-0">
                    
                    {/* Scroll Indicator */}
                    <div className="flex justify-center mb-4 opacity-50">
                        <div className="flex flex-col items-center gap-2">
                             <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white to-transparent"></div>
                             <MousePointer2 size={16} className="text-white animate-bounce" />
                        </div>
                    </div>

                    {/* Bottom Dock Navigation - Strictly at the bottom */}
                    <div className="w-full bg-[#0A0A0C]/60 backdrop-blur-xl border border-white/10 rounded-full px-4 py-3 md:px-8 md:py-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl">
                        
                        {/* Left: Logo & Nav Links */}
                        <div className="flex items-center gap-8 md:gap-12 w-full md:w-auto justify-between md:justify-start">
                            {/* Logo */}
                            <div className="flex items-center gap-3">
                                <div className="bg-white text-black font-extrabold px-2 py-0.5 text-xl rounded-sm">X</div>
                                <span className="font-bold tracking-[0.2em] text-white text-sm">A2TECH</span>
                            </div>

                            {/* Links */}
                            <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-gray-400 uppercase tracking-widest">
                                {['About us', 'Portfolio', 'Templates'].map((link) => (
                                    <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} className="hover:text-white hover:text-[#F6A3FE] transition-colors relative group">
                                        {link}
                                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#F6A3FE] group-hover:w-full transition-all duration-300"></span>
                                    </a>
                                ))}
                            </nav>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-6">
                            <div className="text-[10px] font-bold text-gray-500 flex flex-col items-end leading-tight tracking-widest">
                                <span className="text-white">EN ▲</span>
                                <span className="hover:text-white cursor-pointer transition-colors">DE</span>
                            </div>
                            
                            <button className="group flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#215BFE] hover:text-white transition-all duration-300">
                                <span>Contact us</span>
                                <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        {/* TICKER SECTION (Outside the card) */}
        <div className="w-full mt-2 overflow-hidden relative">
            {/* Gradient Fade Edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030305] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030305] to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex animate-marquee whitespace-nowrap py-6 opacity-60 hover:opacity-100 transition-opacity duration-500">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center">
                        {[
                            { icon: Zap, label: 'Zapier' },
                            { icon: Globe, label: 'Wordpress' },
                            { icon: LayoutTemplate, label: 'Webflow' },
                            { icon: Code2, label: 'ReactJS' },
                            { icon: Database, label: 'Python' },
                            { icon: FileJson, label: 'Make' },
                            { icon: Smartphone, label: 'Flutterflow' },
                            { icon: Smartphone, label: 'Flutter' },
                            { icon: PenTool, label: 'Figma' },
                        ].map((tech, idx) => (
                            <div key={idx} className="flex items-center space-x-3 mx-10 text-gray-500 hover:text-[#F6A3FE] transition-colors cursor-default group">
                                <tech.icon size={18} className="text-white group-hover:text-[#215BFE] transition-colors" />
                                <span className="font-mono font-medium text-sm tracking-widest uppercase">{tech.label}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* --- STATS SECTION (Premium Tech Grid) --- */}
      <section id="our-stats" className="relative z-10 max-w-7xl mx-auto px-6 mb-40 mt-32">
          
          {/* Section Header (Optional/Hidden in Grid, used for SEO/Structure) */}
          <div className="sr-only">Our Impact By The Numbers</div>

          {/* Main Grid Container */}
          <div className="relative border border-white/10 bg-[#0A0A0C] backdrop-blur-sm shadow-[0_0_50px_rgba(33,91,254,0.05)]">
              
              {/* --- PREMIUM DETAILING --- */}
              {/* Corner Brackets */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-[#F6A3FE]"></div>
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-[#215BFE]"></div>
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-[#215BFE]"></div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-[#F6A3FE]"></div>

              {/* Center Crosshair Decoration */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 opacity-20 pointer-events-none">
                  <div className="absolute inset-0 border border-white"></div>
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white"></div>
                  <div className="absolute top-0 left-1/2 h-full w-[1px] bg-white"></div>
              </div>

              {/* Animated Scanner Line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#F6A3FE] to-transparent z-20 animate-[pulse_4s_ease-in-out_infinite]"></div>
              
              {/* Top Tech Label */}
              <div className="absolute -top-8 right-0 text-[10px] font-mono text-[#215BFE] tracking-widest flex items-center gap-2">
                 <span className="w-1 h-1 bg-[#215BFE] rounded-full animate-ping"></span>
                 SYS.METRICS_LIVE
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/5">
                  {[
                      { label: 'Years Experience', value: '04', gradient: 'from-[#FFBDFF] to-[#F6A3FE]', icon: Activity },
                      { label: 'Projects Delivered', value: '15+', gradient: 'from-[#F6A3FE] to-[#215BFE]', icon: Database },
                      { label: 'Team Members', value: '4', gradient: 'from-[#215BFE] to-[#1255F1]', icon: Code2 },
                      { label: 'Global Clients', value: '11+', gradient: 'from-[#1255F1] to-[#5633BE]', icon: Globe },
                  ].map((stat, idx) => (
                      <div key={idx} className="group relative p-8 md:p-12 lg:p-16 flex flex-col items-center justify-center overflow-hidden transition-all duration-500 hover:bg-[#171741]/20">
                          
                          {/* Inner Corner Accents (Visible on Hover) */}
                          <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                          {/* Hover Background Glow */}
                          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          
                          {/* Top Highlight Line */}
                          <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${stat.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left`}></div>

                          {/* Animated Value */}
                          <div className="relative z-10 text-6xl md:text-7xl lg:text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 group-hover:to-white transition-all duration-500 mb-6 tracking-tighter group-hover:scale-105 group-hover:-translate-y-1">
                              <AnimatedNumber value={stat.value} />
                          </div>
                          
                          {/* Label & Indicator */}
                          <div className="relative z-10 flex flex-col items-center gap-2">
                              <div className={`w-12 h-[2px] bg-gradient-to-r ${stat.gradient} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                              <span className="text-xs font-mono text-gray-500 uppercase tracking-[0.2em] group-hover:text-white transition-colors mt-2">
                                  {stat.label}
                              </span>
                          </div>

                          {/* Decorative Background Icon */}
                          <stat.icon 
                            size={120} 
                            className="absolute -bottom-10 -right-10 text-white/[0.02] group-hover:text-white/[0.04] transition-colors duration-700 pointer-events-none" 
                            strokeWidth={1}
                          />
                      </div>
                  ))}
              </div>
          </div>
      </section>

      <Services />

      <Portfolio />
      
      <FreeDownloads />

      <Contact />

      <Footer />
    </div>
  );
};

export default App;
