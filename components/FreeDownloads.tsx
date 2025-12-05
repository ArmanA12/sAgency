
import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Download, Eye, Layers } from 'lucide-react';

interface AssetProject {
  id: number;
  title: string;
  category: string;
  link:string,
  download:string,
  images: string[];
}

// Mock Data with Real Images - Updated Sources
const allProjects: AssetProject[] = [
  {
    id: 1,
    title: 'VENSTYLER : FASHION',
    category: 'Business Platefrom',
    link:'https://www.venstyler.com/',
    download:'https://github.com/ArmanA12/venstyler_v1_a',
    images: [
      'https://res.cloudinary.com/dl2eivpdr/image/upload/v1764914453/Screenshot_2025-12-05_112716_fvwo5f.jpg',
      'https://res.cloudinary.com/dl2eivpdr/image/upload/v1764914453/Screenshot_2025-12-05_112812_wwcvdl.jpg',
      'https://res.cloudinary.com/dl2eivpdr/image/upload/v1764914453/Screenshot_2025-12-05_112853_wlksaa.jpg'
    ]
  },
  {
    id: 2,
    title: 'COMMITTEE MANAGER',
    category: 'MOBILE APP',
    link:'https://github.com/ArmanA12/CommitteeMobileAppFrontEnd',
    download:'https://github.com/ArmanA12/CommitteeMobileAppFrontEnd',
    images: [
      'https://raw.githubusercontent.com/ArmanA12/CommitteeMobileAppFrontEnd/master/Committee.png',
      'https://raw.githubusercontent.com/ArmanA12/CommitteeMobileAppFrontEnd/master/Committee.png',
      'https://raw.githubusercontent.com/ArmanA12/CommitteeMobileAppFrontEnd/master/Committee.png'
    ]
  },
  {
    id: 3,
    title: 'CHATTERNET:SOCIAL',
    category: 'Mobile App',
    link:'https://github.com/ArmanA12/ChatterNetFMobile-App',
    download:'https://github.com/ArmanA12/ChatterNetFMobile-App',
    images: [
      'https://github.com/ArmanA12/ChatterNetFMobile-App/raw/main/Group%201%20(9).png',
      'https://github.com/ArmanA12/ChatterNetFMobile-App/raw/main/Group%201%20(9).png',
      'https://github.com/ArmanA12/ChatterNetFMobile-App/raw/main/Group%201%20(9).png'
    ]
  },
  {
    id: 4,
    title: 'DEVELOPER PORTFOLIO',
    category: 'WEBSITE',
    link:'https://port-a-lac.vercel.app/',
    download:'https://github.com/ArmanA12/Port-A',
    images: [
      'https://res.cloudinary.com/dl2eivpdr/image/upload/v1764914836/Screenshot_2025-12-05_113550_w0tdv1.jpg',
      'https://res.cloudinary.com/dl2eivpdr/image/upload/v1764914835/Screenshot_2025-12-05_113616_kbx46z.jpg',
      'https://res.cloudinary.com/dl2eivpdr/image/upload/v1764914835/Screenshot_2025-12-05_113656_on16nh.jpg',
      
    ]
  },
  {
    id: 5,
    title: 'COLOURED PORTFOLIO',
    category: 'WEBSITE',
    link:'https://port-c-six.vercel.app/',
    download:'https://github.com/finesse-mumbai/PortC',
    images: [
      'https://res.cloudinary.com/dl2eivpdr/image/upload/v1764915123/Screenshot_2025-12-05_114058_sckntp.jpg',
      'https://res.cloudinary.com/dl2eivpdr/image/upload/v1764915123/Screenshot_2025-12-05_114118_kzzh8i.jpg',
      'https://res.cloudinary.com/dl2eivpdr/image/upload/v1764915123/Screenshot_2025-12-05_114138_mj9clj.jpg'
    ]
  }
];

const ProjectRow = ({ project, index }: { project: AssetProject; index: number }) => {
  return (
    <div 
      className="group/row relative border-b border-white/5 bg-[#0A0A0C] transition-all duration-700 hover:bg-[#0E0E12] animate-[fade-up_0.8s_ease-out_forwards]"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Active State Border Highlight */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F6A3FE] to-[#215BFE] opacity-0 group-hover/row:opacity-100 transition-opacity duration-500"></div>

      {/* --- Header Row: Title & Actions --- */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end p-8 md:p-12 gap-8 relative overflow-hidden">
        
        {/* Cinematic Background Glow on Hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#215BFE]/5 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

        {/* Title Section */}
        <div className="relative z-10 w-full lg:w-auto">
          <div className="flex items-center gap-3 mb-4">
             <div className="flex items-center justify-center w-6 h-6 rounded border border-white/10 bg-white/5 text-[#F6A3FE]">
                <Layers size={12} />
             </div>
             <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 group-hover/row:text-[#F6A3FE] transition-colors">
                {project.category}
             </span>
          </div>
          
          <h3 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter leading-none group-hover/row:translate-x-2 transition-transform duration-500">
            {project.title}
          </h3>
        </div>

        {/* Premium Action Buttons */}
        <div className="relative z-10 flex items-center gap-4 w-full lg:w-auto">
          <button className="group/btn relative overflow-hidden px-8 py-4 bg-white/5 border border-white/10 text-white font-mono text-xs uppercase tracking-widest hover:border-white/40 transition-all duration-300 w-full lg:w-auto flex justify-center gap-2">
            <div className="absolute inset-0 bg-white/5 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
            <span className="relative z-10 flex items-center gap-2"><a href={project.link} target="_blank" rel="noopener noreferrer">Live Preview</a> <Eye size={14} /></span>
          </button>
          
          <button className="group/btn relative overflow-hidden px-8 py-4 bg-[#215BFE] border border-[#215BFE] text-white font-mono text-xs uppercase tracking-widest hover:bg-[#1255F1] transition-all duration-300 w-full lg:w-auto flex justify-center gap-2 shadow-[0_0_20px_rgba(33,91,254,0.3)] hover:shadow-[0_0_30px_rgba(33,91,254,0.5)]">
            <span className="relative z-10 flex items-center gap-2"><a href={project.download} target="_blank" rel="noopener noreferrer">Download</a> <Download size={14} /></span>
          </button>
        </div>
      </div>

      {/* --- Content Row: 3 Images Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-white/5 divide-y md:divide-y-0 md:divide-x divide-white/5 h-[320px] md:h-[400px]">
        {project.images.map((imgUrl, i) => (
          <div key={i} className="relative group/image overflow-hidden bg-[#030305] h-full cursor-pointer">
            
            {/* Real Background Image with Interaction */}
            <img 
                src={imgUrl} 
                alt={`${project.title} preview ${i+1}`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out
                           opacity-40 grayscale group-hover/image:opacity-100 group-hover/image:grayscale-0 group-hover/image:scale-110"
            />
            
            {/* Scanline Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20"></div>

            {/* Inner Content (Visible on Hover) */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between z-20 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500">
                <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono text-white/50 border border-white/10 px-2 py-1 rounded bg-black/50 backdrop-blur-md">IMG_0{i+1}</span>
                    <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                        <ArrowUpRight size={16} className="text-white" />
                    </div>
                </div>
                <div>
                   <span className="block w-8 h-[1px] bg-[#F6A3FE] mb-2"></span>
                   <p className="text-xs font-mono text-white uppercase tracking-widest drop-shadow-md">View Detail</p>
                </div>
            </div>

            {/* Inactive Overlay (Darkens when not hovered) */}
            <div className="absolute inset-0 bg-black/50 group-hover/image:bg-transparent transition-colors duration-500 pointer-events-none"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FreeDownloads: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(2);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + 1, allProjects.length));
          }, 800);
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, []);

  return (
    <section className="bg-[#030305] pt-32 pb-20 relative">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-20 flex flex-col md:flex-row items-end justify-between gap-8">
        <div>
            <div className="flex items-center gap-3 mb-6">
                {/* <div className="w-1 h-8 bg-[#215BFE]"></div> */}
                <h2 className="text-6xl md:text-8xl font-display font-bold text-white uppercase tracking-tighter leading-[0.9]">
                    Open Source <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#215BFE] to-[#F6A3FE] opacity-80">Assets</span>
                </h2>
            </div>
        </div>
        <p className="text-gray-400 max-w-sm text-sm font-mono text-right pb-2">
            // FREE_RESOURCES<br/>
            Access our production-ready libraries, UI kits, and 3D scenes.
        </p>
      </div>

      {/* Constrained Grid Container */}
      <div className="max-w-7xl mx-auto px-6">
          <div className="border border-white/10 bg-[#050505] shadow-2xl">
            {allProjects.slice(0, visibleCount).map((project, index) => (
              <ProjectRow key={project.id} project={project} index={index} />
            ))}

            {/* Loading Trigger */}
            <div ref={loaderRef} className="py-24 flex justify-center items-center bg-[#050505] border-t border-white/5">
                {visibleCount < allProjects.length ? (
                <div className="flex flex-col items-center gap-6">
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 border-4 border-white/5 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-t-[#215BFE] border-r-[#F6A3FE] border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-500 animate-pulse">Decrypting Archives...</span>
                </div>
                ) : (
                <div className="text-center">
                    <div className="w-2 h-2 bg-[#215BFE] rounded-full mx-auto mb-4"></div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-600">Archive End</span>
                </div>
                )}
            </div>
          </div>
      </div>
    </section>
  );
};

export default FreeDownloads;
