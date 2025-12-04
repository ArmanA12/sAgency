
import React, { useState } from 'react';
import { X, ExternalLink, Plus, ArrowRight } from 'lucide-react';
import { PortfolioItem } from '../types';

// Palette reference:
// #171741 (Navy), #211740 (DeepViolet), #40244B (DarkPurple)
// #FFBDFF (SoftPink), #215BFE (NeonBlue), #1255F1 (DeepBlue)
// #F6A3FE (NeonPink), #5633BE (RoyalPurple)

const projects: PortfolioItem[] = [
  {
    id: '1',
    title: 'Neon DEX',
    category: 'DeFi Platform',
    image: 'bg-gradient-to-br from-[#171741] via-[#215BFE] to-[#1255F1]',
    problem: 'The client needed a high-performance decentralized exchange that could handle high-frequency trading without sacrificing the user experience typically found in centralized exchanges.',
    solution: 'We engineered a custom liquidity aggregator on Solana with a WebGL-powered interface. The design focuses on data visualization and rapid execution speeds.',
    impact: 'Launched with $50M TVL in the first week and reduced trade latency by 40% compared to competitors.'
  },
  {
    id: '2',
    title: 'Aether NFT',
    category: 'Marketplace',
    image: 'bg-gradient-to-bl from-[#40244B] via-[#5633BE] to-[#F6A3FE]',
    problem: 'Existing NFT marketplaces were cluttered and confusing for non-crypto natives. The goal was to build a sleek, gallery-like experience for premium digital art.',
    solution: 'We created a minimal, dark-mode focused marketplace using Next.js and Tailwind. Features include immersive 3D previews and a simplified wallet onboarding process.',
    impact: 'Onboarded 10k+ users in month one, with an average session duration of 12 minutes.'
  },
  {
    id: '3',
    title: 'Void Wallet',
    category: 'Mobile App',
    image: 'bg-gradient-to-tr from-[#030305] via-[#211740] to-[#1255F1]',
    problem: 'Crypto wallets are notoriously difficult to use. Void wanted a mobile-first wallet that felt like a premium fintech app, focusing on security and ease of use.',
    solution: 'Developed a React Native application with biometric security and a "human-readable" transaction parser. The UI utilizes glassmorphism to create depth and hierarchy.',
    impact: 'Featured on the App Store Finance category. 4.8/5 star rating from over 5,000 reviews.'
  },
  {
    id: '4',
    title: 'Pulse DAO',
    category: 'Governance Dashboard',
    image: 'bg-gradient-to-br from-[#171741] via-[#FFBDFF] to-[#F6A3FE]',
    problem: 'DAO members struggled to keep track of proposals and treasury movements across multiple chains.',
    solution: 'Built a unified dashboard integrating data from Snapshot and Gnosis Safe. The interface uses color-coded metrics and real-time graphs to simplify complex governance data.',
    impact: 'Increased proposal voter participation by 65% within the first quarter of deployment.'
  },
  {
    id: '5',
    title: 'Cipher Chat',
    category: 'Encrypted Messaging',
    image: 'bg-gradient-to-tr from-[#171741] via-[#5633BE] to-[#F6A3FE]',
    problem: 'Privacy-conscious users needed a secure communication tool that didn\'t compromise on UI/UX for security.',
    solution: 'Built a blockchain-based messaging app using Waku protocol. Features ephemeral messages, decentralized identity, and a zero-knowledge architecture.',
    impact: 'Reached 50k active daily users and praised by security auditors for its robust encryption implementation.'
  }
];

interface ProjectCardProps {
  project: PortfolioItem;
  heightClass: string;
  onClick: (p: PortfolioItem) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, heightClass, onClick }) => (
    <div 
        onClick={() => onClick(project)}
        className={`group relative border-r border-b border-white/10 cursor-pointer overflow-hidden ${heightClass} w-full`}
    >
        {/* Hover Glow on Borders */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#F6A3FE] to-[#215BFE]"></div>
            <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-[#F6A3FE] to-[#215BFE]"></div>
            <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-[#F6A3FE] to-[#215BFE]"></div>
            <div className="absolute bottom-0 right-0 w-[1px] h-full bg-gradient-to-t from-[#F6A3FE] to-[#215BFE]"></div>
        </div>

        {/* Image Background with Animation */}
        <div className={`absolute inset-0 ${project.image} transition-all duration-700 ease-out group-hover:scale-110 group-hover:hue-rotate-15 group-hover:saturate-150 opacity-60 group-hover:opacity-80`}></div>
        <div className="absolute inset-0 bg-[#030305]/60 group-hover:bg-[#030305]/20 transition-colors duration-500"></div>
        
        {/* Noise Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

        {/* Content Layout */}
        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-10">
            {/* Top: Category & Index */}
            <div className="flex justify-between items-start">
                    <div className="px-3 py-1 rounded-full border border-white/10 bg-black/20 backdrop-blur-md text-xs font-mono uppercase tracking-widest text-gray-300 group-hover:border-[#215BFE]/50 group-hover:text-[#215BFE] transition-colors">
                        {project.category}
                    </div>
                    <span className="font-display text-xl text-white/20 font-bold group-hover:text-white transition-colors">
                        {project.id.padStart(2, '0')}
                    </span>
            </div>

            {/* Center: Action Icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-50 group-hover:scale-100">
                    <div className="w-20 h-20 rounded-full border border-[#F6A3FE]/30 bg-[#F6A3FE]/10 backdrop-blur-md flex items-center justify-center text-white shadow-[0_0_30px_rgba(246,163,254,0.2)]">
                        <Plus size={32} />
                    </div>
            </div>

            {/* Bottom: Title */}
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-2 leading-tight">
                    {project.title}
                </h3>
                <div className="h-[1px] w-0 group-hover:w-24 bg-gradient-to-r from-[#F6A3FE] to-transparent transition-all duration-500"></div>
            </div>
        </div>
    </div>
);

const ViewAllCard: React.FC = () => (
    <div className="group relative border-r border-b border-white/10 cursor-pointer overflow-hidden h-[32rem] w-full bg-[#0A0A0C] flex flex-col items-center justify-center text-center p-12 transition-colors hover:bg-white">
        
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#171741] to-[#211740] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-exclusion"></div>

        <div className="relative z-10 flex flex-col items-center">
            {/* Animated Arrow Circle */}
            <div className="w-24 h-24 rounded-full border-2 border-white/20 group-hover:border-black flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110">
                <ArrowRight size={40} className="text-white group-hover:text-black transition-colors transform group-hover:-rotate-45 duration-500" />
            </div>

            {/* Huge Text */}
            <h3 className="text-6xl font-display font-black text-white group-hover:text-black uppercase tracking-tighter leading-[0.9] transition-colors duration-500">
                View All<br/>
                Projects
            </h3>
            
            <span className="mt-6 text-xs font-mono uppercase tracking-[0.2em] text-gray-500 group-hover:text-black/60 transition-colors">
                Explore Full Archive
            </span>
        </div>
    </div>
);

const Portfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  // Layout: 5 Projects + 1 View All Card
  // Col 1: P1, P3, P5
  const col1 = [projects[0], projects[2], projects[4]];
  // Col 2: P2, P4, ViewAll
  const col2 = [projects[1], projects[3]];

  // Helper to determine height class based on design spec
  const getHeightClass = (index: number, colIndex: number) => {
    // Col 1 pattern: 85% (32rem), 100% (40rem), 85% (32rem)
    if (colIndex === 0) {
        return index % 2 === 0 ? 'h-[32rem]' : 'h-[40rem]';
    }
    // Col 2 pattern: 100% (40rem), 85% (32rem)
    if (colIndex === 1) {
        return index % 2 === 0 ? 'h-[40rem]' : 'h-[32rem]';
    }
    return 'h-[32rem]';
  };

  return (
    <section id="portfolio" className="bg-[#030305] relative pt-32 pb-0 overflow-hidden">
      
      {/* 1. Giant Background Watermark */}
      <div className="absolute top-40 -right-20 text-[15vw] font-display font-bold leading-none text-white opacity-[0.02] select-none pointer-events-none tracking-tighter whitespace-nowrap rotate-90 md:rotate-0 origin-top-right">
        WORKS
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-20">
        {/* 2. Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24 pb-8 border-b border-white/10">
            <div>
                <h2 className="text-6xl md:text-8xl font-display font-bold uppercase tracking-tighter leading-[0.9]">
                    <span className="text-white block">Selected</span>
                    <span 
                        className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FFBDFF] to-[#215BFE]"
                        style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}
                    >
                        Works
                    </span>
                </h2>
            </div>
            <div className="flex items-center gap-4 text-gray-400 font-mono text-xs uppercase tracking-widest pb-2">
                <span className="w-2 h-2 bg-[#F6A3FE] rounded-full animate-pulse"></span>
                <span>Curated Projects</span>
                <span className="text-white/20">/</span>
                <span>2023 — 2024</span>
            </div>
        </div>

        {/* 3. Connected Masonry Grid Layout */}
        <div className="flex flex-col md:flex-row border-t border-l border-white/10">
            
            {/* Column 1 */}
            <div className="flex flex-col w-full md:w-1/2">
                {col1.map((project, idx) => (
                    <ProjectCard 
                        key={project.id} 
                        project={project} 
                        heightClass={getHeightClass(idx, 0)} 
                        onClick={setSelectedProject}
                    />
                ))}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col w-full md:w-1/2">
                {col2.map((project, idx) => (
                    <ProjectCard 
                        key={project.id} 
                        project={project} 
                        heightClass={getHeightClass(idx, 1)} 
                        onClick={setSelectedProject}
                    />
                ))}
                
                {/* 4. Custom View All Card in the 6th Slot */}
                <ViewAllCard />
            </div>

        </div>
      </div>

      {/* 5. Premium Modal */}
      {selectedProject && (
            <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center sm:p-4 md:p-8">
                <div 
                    className="absolute inset-0 bg-[#030305]/95 backdrop-blur-xl transition-opacity"
                    onClick={() => setSelectedProject(null)}
                ></div>

                <div className="relative w-full max-w-6xl bg-[#0A0A0C] border border-white/10 md:rounded-[2.5rem] rounded-t-[2.5rem] overflow-hidden shadow-2xl animate-float flex flex-col md:flex-row max-h-[90vh]">
                    
                    {/* Visual Side (Left) */}
                    <div className={`md:w-1/2 ${selectedProject.image} relative p-8 md:p-12 flex flex-col justify-end min-h-[300px]`}>
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay"></div>
                        
                        <div className="relative z-10">
                            <h2 className="text-5xl md:text-7xl font-display font-bold text-white leading-none mb-4">{selectedProject.title}</h2>
                            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-mono text-white">
                                {selectedProject.category}
                            </span>
                        </div>

                        <button 
                            onClick={() => setSelectedProject(null)}
                            className="absolute top-8 left-8 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 hover:bg-white hover:text-black transition-colors md:hidden"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content Side (Right) */}
                    <div className="md:w-1/2 p-8 md:p-16 overflow-y-auto bg-[#0A0A0C]">
                         <div className="flex justify-between items-center mb-12">
                             <div className="flex items-center gap-2">
                                 <div className="w-2 h-2 rounded-full bg-[#F6A3FE] animate-pulse"></div>
                                 <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Case Study Analysis</span>
                             </div>
                             <button 
                                onClick={() => setSelectedProject(null)}
                                className="hidden md:flex w-12 h-12 border border-white/10 rounded-full items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all hover:rotate-90"
                            >
                                <X size={24} />
                            </button>
                         </div>

                         <div className="space-y-12">
                            {[
                                { label: 'The Challenge', text: selectedProject.problem, color: 'text-[#F6A3FE]' },
                                { label: 'Our Solution', text: selectedProject.solution, color: 'text-[#215BFE]' },
                                { label: 'The Impact', text: selectedProject.impact, color: 'text-[#FFBDFF]' }
                            ].map((section) => (
                                <div key={section.label} className="group">
                                    <h4 className={`text-xl font-display font-medium ${section.color} mb-3 flex items-center gap-3`}>
                                        {section.label}
                                        <span className="h-[1px] flex-grow bg-white/5 group-hover:bg-white/10 transition-colors"></span>
                                    </h4>
                                    <p className="text-gray-400 leading-relaxed font-light text-lg">
                                        {section.text}
                                    </p>
                                </div>
                            ))}
                         </div>

                         <div className="mt-16 pt-8 border-t border-white/5">
                             <button className="w-full py-4 rounded-xl bg-white text-black font-bold uppercase tracking-widest hover:bg-[#F6A3FE] transition-colors flex items-center justify-center gap-2">
                                 View Live Project <ExternalLink size={18} />
                             </button>
                         </div>
                    </div>

                </div>
            </div>
        )}
    </section>
  );
};

export default Portfolio;
