import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Send, ArrowRight } from 'lucide-react';
import * as THREE from 'three';
import { Float, Stars, MeshTransmissionMaterial, Sparkles, Environment } from '@react-three/drei';

// --- 3D CRYSTAL SINGULARITY ---
const CrystalGlobe = () => {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Rotate Outer Glass (Slow)
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.1;
      outerRef.current.rotation.z = Math.sin(t * 0.2) * 0.1;
    }

    // Rotate Inner Core (Fast & Chaotic)
    if (innerRef.current) {
       innerRef.current.rotation.x = t * 0.4;
       innerRef.current.rotation.y = t * 0.5;
       innerRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.05); // Heartbeat pulse
    }

    // Orbit Rings
    if (ring1Ref.current) {
        ring1Ref.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.2) * 0.2;
        ring1Ref.current.rotation.y = t * 0.2;
    }
    if (ring2Ref.current) {
        ring2Ref.current.rotation.x = Math.PI / 3 + Math.cos(t * 0.2) * 0.2;
        ring2Ref.current.rotation.y = -t * 0.15;
    }
  });

  return (
    <group scale={[2, 2, 2]}>
        
        {/* 1. OUTER GLASS SHELL */}
        <mesh ref={outerRef}>
            <sphereGeometry args={[2.5, 32, 32]} />
            <MeshTransmissionMaterial 
                backside
                samples={8}
                resolution={1024}
                thickness={3}
                roughness={0.05}
                transmission={1}
                ior={2.2} // Diamond-like
                chromaticAberration={1} // Heavy prism effect
                anisotropy={0.5}
                distortion={0.6}
                distortionScale={0.5}
                temporalDistortion={0.2}
                color="#a0c0ff"
                background={new THREE.Color('#030305')}
            />
        </mesh>

        {/* 2. INNER GLOWING CORE */}
        <group ref={innerRef}>
            {/* Structural Frame */}
            <mesh>
                <icosahedronGeometry args={[1.5, 1]} />
                <meshBasicMaterial color="#215BFE" wireframe transparent opacity={0.3} />
            </mesh>
            
            {/* Glowing Nucleus */}
            <mesh>
                <icosahedronGeometry args={[0.8, 0]} />
                <meshBasicMaterial color="#F6A3FE" wireframe transparent opacity={0.8} />
            </mesh>
            
            {/* Core Light */}
            <pointLight distance={10} intensity={8} color="#F6A3FE" />
        </group>

        {/* 3. ORBITAL RINGS */}
        <mesh ref={ring1Ref}>
            <torusGeometry args={[3.5, 0.02, 16, 48]} />
            <meshBasicMaterial color="#215BFE" transparent opacity={0.4} />
        </mesh>
        
        <mesh ref={ring2Ref}>
            <torusGeometry args={[4.2, 0.01, 16, 48]} />
            <meshBasicMaterial color="#F6A3FE" transparent opacity={0.2} />
        </mesh>
    </group>
  );
};

const Contact: React.FC = () => {
  return (
    <section id="contact" className="relative min-h-screen bg-[#030305] overflow-hidden flex items-center justify-center py-20">
      
      {/* --- BACKGROUND LAYER --- */}
      {/* <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 14], fov: 35 }} dpr={[1, 2]}>
          <fog attach="fog" args={['#030305', 5, 30]} />
          
          <Environment preset="city" blur={0.8} />
          
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={20} color="#215BFE" />
          <spotLight position={[-10, -10, -10]} angle={0.5} penumbra={1} intensity={20} color="#F6A3FE" />
          
          <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
             <CrystalGlobe />
          </Float>
          
          <Stars radius={100} depth={50} count={2500} factor={4} saturation={0} fade speed={0.5} />
          <Sparkles count={50} scale={10} size={4} speed={0.4} opacity={0.5} color="#F6A3FE" />
        </Canvas>
      </div> */}

      {/* Vignette Overlay for focus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030305_80%)] z-0 pointer-events-none"></div>

      {/* --- MAIN CONTENT CARD --- */}
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        
        {/* Holographic Panel */}
        <div className="relative bg-[#0A0A0C]/60 backdrop-blur-md border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
            
            {/* Top Bar Decor */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#215BFE] via-[#F6A3FE] to-[#215BFE] opacity-50"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2">
                
                {/* --- LEFT: INFO HUD --- */}
                <div className="p-10 md:p-16 flex flex-col justify-between relative bg-gradient-to-br from-[#171741]/50 to-transparent">
                    {/* Tech Decor */}
                    <div className="absolute top-8 left-8 w-2 h-2 bg-[#F6A3FE] rounded-full animate-pulse"></div>
                    <div className="absolute bottom-8 right-8 text-[10px] font-mono text-gray-600 tracking-widest uppercase">
                        Secure_Link: Active
                    </div>

                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#F6A3FE] font-mono text-xs uppercase tracking-widest mb-8">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F6A3FE] opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F6A3FE]"></span>
                            </span>
                            Transmission Open
                        </div>

                        <h2 className="text-5xl md:text-7xl font-display font-bold text-white leading-[0.9] mb-8">
                            Let's Build <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F6A3FE] to-[#215BFE]">The Future.</span>
                        </h2>

                        <p className="text-gray-400 text-lg leading-relaxed max-w-md font-light">
                            Ready to upgrade your digital infrastructure? 
                            Initialize a connection with our engineering team. 
                        </p>
                    </div>

                    <div className="space-y-8 mt-16">
                        <div className="group cursor-pointer">
                            <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2 group-hover:text-[#215BFE] transition-colors">Coordinates</p>
                            <a href="mailto:hello@xmethod.de" className="text-2xl font-display font-medium text-white flex items-center gap-4 hover:translate-x-2 transition-transform duration-300">
                                hello@xmethod.de <ArrowRight size={20} className="text-[#215BFE] opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </div>
                        <div className="flex gap-8">
                             <div>
                                <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Timezone</p>
                                <p className="text-white font-mono">CET (Berlin)</p>
                             </div>
                             <div>
                                <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Response</p>
                                <p className="text-white font-mono">&lt; 24 Hours</p>
                             </div>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT: INPUT TERMINAL --- */}
                <div className="p-10 md:p-16 bg-[#030305]/50 relative border-l border-white/5">
                    
                    {/* Corner Brackets */}
                    <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-white/10 rounded-tr-[2rem]"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-white/10 rounded-bl-[2rem]"></div>

                    <form className="space-y-8 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="group relative">
                                <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-2 block group-focus-within:text-[#215BFE] transition-colors">
                                    01 // Identity
                                </label>
                                <input 
                                    type="text" 
                                    className="w-full bg-white/5 border-b border-white/10 px-4 py-4 text-white font-sans placeholder:text-white/20 focus:outline-none focus:bg-white/10 transition-all"
                                    placeholder="John Doe"
                                />
                                {/* Focus Line Animation */}
                                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#215BFE] group-focus-within:w-full transition-all duration-500"></div>
                            </div>
                            <div className="group relative">
                                <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-2 block group-focus-within:text-[#215BFE] transition-colors">
                                    02 // Signal
                                </label>
                                <input 
                                    type="email" 
                                    className="w-full bg-white/5 border-b border-white/10 px-4 py-4 text-white font-sans placeholder:text-white/20 focus:outline-none focus:bg-white/10 transition-all"
                                    placeholder="john@example.com"
                                />
                                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#215BFE] group-focus-within:w-full transition-all duration-500"></div>
                            </div>
                        </div>

                        <div className="group relative">
                            <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-2 block group-focus-within:text-[#215BFE] transition-colors">
                                03 // Payload Data
                            </label>
                            <textarea 
                                rows={4}
                                className="w-full bg-white/5 border-b border-white/10 px-4 py-4 text-white font-sans placeholder:text-white/20 focus:outline-none focus:bg-white/10 transition-all resize-none"
                                placeholder="Describe your project requirements..."
                            ></textarea>
                            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#215BFE] group-focus-within:w-full transition-all duration-500"></div>
                        </div>

                        <div className="pt-4">
                            <button type="button" className="group w-full relative overflow-hidden bg-white text-black py-5 px-8 font-bold uppercase tracking-widest hover:bg-[#215BFE] hover:text-white transition-colors duration-500">
                                <span className="relative z-10 flex justify-between items-center">
                                    <span>Initialize Sequence</span>
                                    <Send size={18} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                </span>
                                {/* Hover Gradient BG */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#215BFE] to-[#F6A3FE] translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-0"></div>
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
