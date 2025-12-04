import React from 'react';
import { FileText, Zap, FolderOpen } from 'lucide-react';
import { ProcessStep } from '../types';

const steps: ProcessStep[] = [
  {
    id: '01',
    number: '01',
    title: 'Product Requirements',
    description: 'We start every project by gathering and clarifying your product requirements. This ensures we build exactly what you need.',
    icon: <FileText size={28} className="text-white relative z-10" />
  },
  {
    id: '02',
    number: '02',
    title: '2-Week Sprint',
    description: 'Our development runs in focused 2-week sprints. Each sprint starts with planning and ends with a demo — so you see real progress.',
    icon: <Zap size={28} className="text-white relative z-10" />
  },
  {
    id: '03',
    number: '03',
    title: 'Weekly Reports',
    description: 'We keep you in the loop with clear, concise weekly updates. You\'ll always know what\'s been done, what\'s in progress, and what\'s coming.',
    icon: <FolderOpen size={28} className="text-white relative z-10" />
  }
];

const Process: React.FC = () => {
  return (
    <section id="processes" className="py-40 bg-brand-black relative border-t border-white/5 overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute left-0 top-1/4 w-[500px] h-[500px] bg-brand-deepBlue/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-32 gap-16 border-b border-white/10 pb-12">
            <div>
                <h2 className="text-4xl md:text-6xl font-display font-medium text-white tracking-[-0.02em] uppercase leading-none">
                    Processes &<br/>
                    <span className="text-gray-500">Management</span>
                </h2>
            </div>
            
            <p className="text-gray-400 text-lg leading-relaxed max-w-lg text-left font-light pt-2">
                Our process turns vision into results. With clear planning and transparent communication, we manage every step to deliver exactly what your product needs to succeed.
            </p>
        </div>

        {/* Vertical Steps */}
        <div className="flex flex-col">
          {steps.map((step, idx) => (
            <div key={step.id} className="group border-b border-white/5 py-16 transition-all duration-500 hover:bg-white/[0.01]">
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* 1. Number - Monospace Stark */}
                <div className="md:col-span-2 pt-2">
                    <span className="text-sm font-mono text-gray-600 group-hover:text-brand-neonPink transition-colors border border-white/10 px-3 py-1 rounded-full">
                        [{step.number}]
                    </span>
                </div>

                {/* 2. Frosted Glass Icon Box */}
                <div className="md:col-span-2">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
                        {/* Gradient Background */}
                        <div className={`absolute inset-0 opacity-80 transition-opacity duration-500
                            ${idx === 0 ? 'bg-gradient-to-br from-brand-softPink to-brand-royalPurple' : ''} 
                            ${idx === 1 ? 'bg-gradient-to-br from-brand-neonBlue to-brand-deepBlue' : ''} 
                            ${idx === 2 ? 'bg-gradient-to-br from-brand-darkPurple to-brand-deepViolet' : ''}
                        `}></div>
                        
                        {/* Glass Overlay */}
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/20"></div>
                        
                        {/* Icon Center */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            {step.icon}
                        </div>
                    </div>
                </div>

                {/* 3. Text Content */}
                <div className="md:col-span-8 lg:col-span-6">
                    <h3 className="text-3xl font-display font-medium text-white mb-4 tracking-tight group-hover:translate-x-2 transition-transform duration-300">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-lg font-light">{step.description}</p>
                </div>

                {/* 4. Arrow Indicator (Hidden by default, shows on hover) */}
                <div className="hidden lg:flex md:col-span-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-4">
                     <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                        <div className="w-2 h-2 bg-brand-neonPink rounded-full"></div>
                     </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;