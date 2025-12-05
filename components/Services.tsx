
import React from 'react';
import { Layers, Smartphone, Code, Cpu, Globe, Zap, ArrowUpRight, BrainCircuit, Settings } from 'lucide-react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    id: '01',
    title: 'Web3 Development',
    description: 'Smart contracts, dApps, and DeFi protocols engineered with security first.',
    icon: <Code size={32} />,
  },
  {
    id: '02',
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile experiences using Flutter and React Native.',
    icon: <Smartphone size={32} />,
  },
  {
    id: '03',
    title: 'UI/UX Design',
    description: 'User-centric interfaces that blend aesthetics with intuitive functionality.',
    icon: <Layers size={32} />,
  },
  {
    id: '04',
    title: 'AI Solutions',
    description: 'Integrating machine learning and LLMs to automate and enhance business logic.',
    icon: <Cpu size={32} />,
  },
  {
    id: '05',
    title: 'Web Platforms',
    description: 'Scalable full-stack web applications built on Next.js and Cloud architecture.',
    icon: <Globe size={32} />,
  },
  {
    id: '06',
    title: 'Automation',
    description: 'Workflow optimization using custom scripts and no-code tools.',
    icon: <Zap size={32} />,
  },
];

// Custom Background Component for Micro-interactions
const ServiceBackground = ({ id }: { id: string }) => {
  switch (id) {
    case '01': // Web3 - Floating Bitcoin
      return (
        <div className="absolute right-0 bottom-0 w-full h-full overflow-hidden pointer-events-none">
           <div className="absolute -bottom-10 -right-10 transition-all duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-4 group-hover:rotate-12 opacity-20 group-hover:opacity-40">
               {/* Glowing Orb Backdrop */}
               <div className="absolute inset-0 bg-[#F6A3FE] blur-[100px] opacity-0 group-hover:opacity-30 transition-opacity duration-1000"></div>
               
               <svg viewBox="0 0 24 24" className="w-64 h-64 text-[#F6A3FE] animate-[float_6s_ease-in-out_infinite]" fill="none" stroke="currentColor" strokeWidth="0.5">
                 <circle cx="12" cy="12" r="9" className="stroke-[#215BFE]" strokeWidth="1" />
                 <path d="M9 8h4.5a2.5 2.5 0 0 1 0 5H13v-1h.5a1.5 1.5 0 0 0 0-3H10v8h3.5a2.5 2.5 0 0 0 0-5H13" className="fill-[#F6A3FE]/10" strokeWidth="1" />
                 <path d="M10 12h4" stroke="currentColor" />
                 <path d="M11 7V6" stroke="currentColor" />
                 <path d="M13 7V6" stroke="currentColor" />
                 <path d="M11 18v-1" stroke="currentColor" />
                 <path d="M13 18v-1" stroke="currentColor" />
               </svg>
           </div>
        </div>
      );
    case '02': // Mobile - Parallax Phones
      return (
        <div className="absolute right-0 bottom-0 w-full h-full overflow-hidden pointer-events-none">
           <div className="absolute -bottom-4 -right-4 flex gap-4 opacity-20 group-hover:opacity-40 transition-all duration-700">
             <div className="w-24 h-48 border border-[#215BFE] rounded-[1.5rem] transform rotate-12 translate-y-12 group-hover:translate-y-8 group-hover:rotate-[15deg] transition-all duration-700 bg-[#215BFE]/5 backdrop-blur-sm"></div>
             <div className="w-24 h-48 border border-[#F6A3FE] rounded-[1.5rem] transform -rotate-6 translate-y-4 group-hover:translate-y-0 group-hover:-rotate-12 transition-all duration-700 bg-[#F6A3FE]/5 backdrop-blur-md flex flex-col items-center pt-3">
                <div className="w-6 h-1 bg-[#F6A3FE] rounded-full mb-3"></div>
                <div className="w-16 h-28 bg-[#F6A3FE]/10 rounded-lg animate-pulse-slow"></div>
             </div>
           </div>
        </div>
      );
    case '03': // UI/UX - Expanding Layers
      return (
        <div className="absolute right-0 bottom-0 w-full h-full overflow-hidden pointer-events-none perspective-[1000px]">
           <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 opacity-20 group-hover:opacity-50 transition-all duration-700">
             <div className="relative w-40 h-40 transform rotate-x-[60deg] rotate-z-[45deg] preserve-3d">
                <div className="absolute inset-0 border border-[#215BFE] bg-[#215BFE]/10 rounded-xl transform translate-z-0 group-hover:translate-z-[-30px] transition-transform duration-700 ease-out shadow-lg"></div>
                <div className="absolute inset-0 border border-[#F6A3FE] bg-[#F6A3FE]/10 rounded-xl transform translate-z-[20px] group-hover:translate-z-[10px] transition-transform duration-700 ease-out"></div>
                <div className="absolute inset-0 border border-white bg-white/5 rounded-xl transform translate-z-[40px] group-hover:translate-z-[50px] transition-transform duration-700 ease-out backdrop-blur-sm"></div>
             </div>
           </div>
        </div>
      );
    case '04': // AI - Pulsing Brain Network
      return (
        <div className="absolute right-0 bottom-0 w-full h-full overflow-hidden pointer-events-none">
           <div className="absolute -bottom-12 -right-12 opacity-20 group-hover:opacity-50 transition-all duration-700">
             <div className="relative w-56 h-56">
                <BrainCircuit className="w-full h-full text-[#F6A3FE] group-hover:scale-110 transition-transform duration-1000" strokeWidth={0.5} />
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#215BFE] rounded-full animate-ping"></div>
                <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-[#F6A3FE] rounded-full animate-ping delay-300"></div>
                <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-white rounded-full animate-pulse delay-700"></div>
             </div>
           </div>
        </div>
      );
    case '05': // Web - Rotating Globe
      return (
        <div className="absolute right-0 bottom-0 w-full h-full overflow-hidden pointer-events-none">
           <div className="absolute -bottom-20 -right-20 opacity-20 group-hover:opacity-40 transition-all duration-700">
             <Globe className="w-80 h-80 text-[#215BFE] animate-[spin_20s_linear_infinite]" strokeWidth={0.5} />
             <div className="absolute inset-0 bg-gradient-to-t from-[#215BFE]/20 to-transparent mix-blend-overlay"></div>
           </div>
        </div>
      );
    case '06': // Automation - Spinning Gears
      return (
        <div className="absolute right-0 bottom-0 w-full h-full overflow-hidden pointer-events-none">
           <div className="absolute -bottom-12 -right-12 opacity-20 group-hover:opacity-50 transition-all duration-700">
             <div className="relative w-56 h-56">
                <Settings className="absolute top-0 right-0 w-32 h-32 text-[#F6A3FE] animate-[spin_8s_linear_infinite]" strokeWidth={0.5} />
                <Settings className="absolute bottom-4 left-4 w-20 h-20 text-[#215BFE] animate-[spin_6s_linear_infinite_reverse]" strokeWidth={1} />
             </div>
           </div>
        </div>
      );
    default:
      return null;
  }
};

const Services: React.FC = () => {
  return (
    <section id="services" className="bg-[#030305] py-40 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- EDITORIAL HEADER --- */}
        <div className="mb-32 relative">
             {/* Eyebrow */}
             <div className="flex items-center gap-4 mb-8">
                <div className="flex gap-1">
                    <span className="w-1 h-1 bg-[#F6A3FE] rounded-full"></span>
                    <span className="w-1 h-1 bg-[#215BFE] rounded-full"></span>
                    <span className="w-1 h-1 bg-white rounded-full"></span>
                </div>
                <span className="text-[#F6A3FE] font-mono text-xs uppercase tracking-[0.2em]">Our Expertise</span>
             </div>

             {/* Headline */}
             <div className="relative">
                <h2 className="text-6xl md:text-8xl lg:text-[6rem] font-display font-bold text-white leading-[0.85] tracking-tighter uppercase z-10 relative">
                    From Design<br/>
                    <span 
                        className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600"
                        style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0)' }}
                    >To Development</span>
                </h2>
                
                {/* Decorative Blur behind text */}
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#215BFE] blur-[150px] opacity-20 -z-10 rounded-full animate-pulse-slow"></div>
             </div>

             {/* Sub-headline / CTA */}
             <div className="flex flex-col md:flex-row items-end justify-between mt-16 gap-12 border-t border-white/5 pt-12">
                <div className="max-w-xl">
                    <p className="text-2xl font-light text-white leading-tight mb-4">
                        Complete digital solutions.
                    </p>
                    <p className="text-gray-400 text-lg leading-relaxed font-light">
                        We engineer products that <span className="text-white border-b border-[#F6A3FE]">elevate your brand</span> in the Web3 ecosystem.
                    </p>
                </div>
                <button className="hidden md:flex items-center gap-3 px-8 py-4 border border-white/10 rounded-full text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 group">
                    <a href="tel:+917091554628" target="_blank" rel="noopener noreferrer"><span className="uppercase tracking-widest text-xs font-bold">Book a Strategy Call</span></a>
                    <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
             </div>
        </div>

        {/* --- CINEMATIC GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <div 
              key={service.id}
              className="group relative border border-white/5 bg-[#0A0A0C]/40 min-h-[28rem] p-10 flex flex-col justify-between transition-all duration-500 overflow-hidden hover:z-10 hover:border-white/20 hover:shadow-2xl"
            >
              
              {/* --- 1. GIANT BACKGROUND NUMBER --- */}
              <div className="absolute -top-6 -right-6 text-[12rem] font-display font-bold leading-none tracking-tighter text-transparent select-none transition-all duration-700 pointer-events-none group-hover:scale-110 z-0"
                   style={{ WebkitTextStroke: '1px rgba(255,255,255,0.03)' }}>
                  <span className="bg-clip-text bg-gradient-to-br from-[#215BFE]/0 to-[#F6A3FE]/0 group-hover:from-[#215BFE]/10 group-hover:to-[#F6A3FE]/10 transition-colors duration-700">
                    {service.id}
                  </span>
              </div>

              {/* --- 2. MICRO-INTERACTION LAYER --- */}
              <ServiceBackground id={service.id} />
              
              {/* Hover Gradient Spotlight */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#171741]/0 to-[#211740]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"></div>
              
              {/* --- 3. HUD CORNER BRACKETS (Reveal on Hover) --- */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#F6A3FE] opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 translate-x-2 translate-y-2"></div>
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#215BFE] opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:-translate-x-0 group-hover:translate-y-0 -translate-x-2 translate-y-2"></div>
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#215BFE] opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-0 group-hover:-translate-y-0 translate-x-2 -translate-y-2"></div>
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#F6A3FE] opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:-translate-x-0 group-hover:-translate-y-0 -translate-x-2 -translate-y-2"></div>

              {/* --- CONTENT LAYER --- */}
              <div className="relative z-10 flex justify-between items-start mb-auto">
                  {/* Icon Container with Glass Effect */}
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 group-hover:text-white group-hover:bg-[#215BFE]/10 group-hover:border-[#215BFE]/30 transition-all duration-500 shadow-lg backdrop-blur-sm group-hover:shadow-[0_0_30px_rgba(33,91,254,0.15)]">
                    {React.cloneElement(service.icon as React.ReactElement<any>, { size: 28 })}
                  </div>
              </div>

              {/* Text Content */}
              <div className="relative z-10 mt-auto transform transition-transform duration-500 group-hover:-translate-y-2">
                  <h3 className="text-3xl font-display font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#F6A3FE] transition-all duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-500 group-hover:text-gray-300 leading-relaxed max-w-[90%] transition-colors duration-300 font-light">
                    {service.description}
                  </p>
              </div>

              {/* Bottom Loading Bar Effect */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10">
                 <div className="h-full bg-gradient-to-r from-[#F6A3FE] to-[#215BFE] w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
