import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PresentationControls, Environment, ContactShadows, Sparkles, Stars, PerformanceMonitor, TorusKnot } from '@react-three/drei';
import * as THREE from 'three';

const PALETTE = {
  deepViolet: '#211740',
  neonPink: '#F6A3FE',
  royalPurple: '#5633BE',
  softPink: '#FFBDFF',
  neonBlue: '#215BFE',
  navy: '#171741',
  darkPurple: '#40244B',
  deepBlue: '#1255F1',
};

// --- NEW: The "Neon Artifact" (Replaces the heavy glass cube) ---
// This uses cheap standard materials but looks premium due to lighting and wireframe overlay.
const NeonArtifact = ({ scale = 1 }: { scale?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
      const t = state.clock.getElapsedTime();
      if (meshRef.current && wireframeRef.current) {
          // Slow, complex rotation
          meshRef.current.rotation.x = t * 0.15;
          meshRef.current.rotation.y = t * 0.1;
          // Wireframe rotates slightly differently for a dynamic effect
          wireframeRef.current.rotation.x = t * 0.15;
          wireframeRef.current.rotation.y = t * 0.1;
          wireframeRef.current.rotation.z = Math.sin(t * 0.5) * 0.1;
      }
  });

  return (
    <group scale={scale}>
      {/* 1. The Solid Core: Dark reflective metal */}
      <TorusKnot ref={meshRef} args={[1, 0.3, 128, 16]}>
         {/* MeshStandardMaterial is much cheaper than Transmission */}
        <meshStandardMaterial 
            color={PALETTE.deepViolet}
            roughness={0.1} // Very smooth
            metalness={0.8} // Highly metallic to reflect the neon lights
            envMapIntensity={1}
        />
      </TorusKnot>

      {/* 2. The Glowing Wireframe Overlay */}
      <TorusKnot ref={wireframeRef} args={[1.02, 0.32, 128, 16]}>
        <meshBasicMaterial 
            color={PALETTE.neonPink} // The main glow color
            wireframe={true}
            transparent
            opacity={0.4}
            toneMapped={false} // Makes the color sear bright
        />
      </TorusKnot>
      
      {/* Inner light to make the center pop */}
      <pointLight position={[0,0,0]} intensity={15} color={PALETTE.neonBlue} distance={3} />
    </group>
  );
};

// --- Optimized Background ---
const SimpleBackgroundMesh = () => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if(ref.current) ref.current.rotation.z = state.clock.elapsedTime * 0.01;
    });
    return (
        <mesh ref={ref} position={[0, 0, -15]} scale={[2, 2, 2]}>
            {/* Lowest detail geometry (detail = 0) */}
            <icosahedronGeometry args={[10, 0]} /> 
            <meshBasicMaterial color={PALETTE.deepBlue} wireframe transparent opacity={0.03} />
        </mesh>
    );
}


// --- MAIN MOBILE COMPONENT ---

const HeroMobile: React.FC = () => {
  // Start at a lower DPR for mobile by default
  const [dpr, setDpr] = useState(1); 

  return (
    <div className="absolute inset-0 z-0 bg-[#030305]">
      <Canvas 
        dpr={dpr} 
        // Wider FOV to make the object look grander on small screens
        camera={{ position: [0, 0, 16], fov: 45 }} 
        gl={{ 
            antialias: false, // Disable AA for performance
            alpha: false,
            powerPreference: "high-performance",
            stencil: false, // Disable stencil buffer
            depth: true, // Keep depth buffer
        }}
      >
        {/* Aggressive performance monitoring for mobile */}
        <PerformanceMonitor onDecline={() => setDpr(0.75)} onIncline={() => setDpr(1.5)} />
        
        <color attach="background" args={['#030305']} />
        {/* Use a cheaper, blurry environment map for reflections */}
        <Environment preset="city" blur={1} background={false} />
        
        {/* Strong Rim Lights to hit the metallic surface */}
        <spotLight position={[-10, 15, 10]} angle={0.5} intensity={80} color={PALETTE.neonBlue} />
        <spotLight position={[10, -10, 10]} angle={0.5} intensity={80} color={PALETTE.neonPink} />
        {/* Fill light */}
        <pointLight position={[0, 5, -5]} intensity={20} color={PALETTE.royalPurple} />

        {/* Significantly reduced particle counts */}
        <Stars radius={80} depth={50} count={400} factor={4} saturation={0} fade speed={0.3} />
        <Sparkles count={25} scale={10} size={4} speed={0.2} opacity={0.4} color={PALETTE.neonBlue} />
        
        <SimpleBackgroundMesh />

        <PresentationControls
          global
          zoom={0.7}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 8, Math.PI / 8]} // Limit vertical drag
          azimuth={[-Math.PI / 8, Math.PI / 8]} // Limit horizontal drag
          config={{ mass: 1, tension: 170, friction: 26 }} // Snappier feel
          snap={true}
        >
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group position={[0, -0.5, 0]}>
               {/* THE NEW OBJECT */}
               <NeonArtifact scale={2.2} />
            </group>
          </Float>
        </PresentationControls>

        {/* Cheaper fake shadow */}
        <ContactShadows position={[0, -4.5, 0]} opacity={0.6} scale={15} blur={2.5} far={4} color={PALETTE.deepBlue} frames={1} />
      </Canvas>
    </div>
  );
};

export default HeroMobile;