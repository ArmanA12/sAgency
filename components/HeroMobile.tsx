import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PresentationControls, Environment, ContactShadows, Sparkles, Stars, PerformanceMonitor, Icosahedron } from '@react-three/drei';
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
  electricCyan: '#00FFFF'
};

// --- NEW CENTRAL OBJECT: Geometric Data Artifact ---
// Premium look achieved via layering metal and glowing wireframes. very low poly.
const GeometricArtifact = ({ scale = 1 }: { scale?: number }) => {
  const coreRef = useRef<THREE.Mesh>(null);
  const cageRef = useRef<THREE.Mesh>(null);
  const innerLightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
      const t = state.clock.getElapsedTime();
      if (coreRef.current && cageRef.current && innerLightRef.current) {
          // Core rotates slowly on multiple axes
          coreRef.current.rotation.x = t * 0.2;
          coreRef.current.rotation.y = t * 0.15;
          
          // Cage rotates faster and slightly off-axis for dynamic effect
          cageRef.current.rotation.x = t * 0.25;
          cageRef.current.rotation.z = -t * 0.1;
          
          // Subtle pulsing light
          innerLightRef.current.intensity = 15 + Math.sin(t * 2) * 5;
      }
  });

  return (
    <group scale={scale}>
      {/* 1. The Solid Core: Dark, highly reflective faceted metal */}
      {/* args=[radius, detail] -> detail=0 gives a sharp faceted jewel look */}
      <Icosahedron ref={coreRef} args={[1, 0]}>
        <meshStandardMaterial 
            color={PALETTE.deepBlue}
            roughness={0.05} // Almost mirror-like finish
            metalness={0.95} // Very metallic to catch environment reflections
            envMapIntensity={1.5} // Boost reflections
            flatShading={true} // Emphasize the facets
        />
      </Icosahedron>

      {/* 2. The Outer Cage: Glowing Neon Wireframe overlay */}
      <Icosahedron ref={cageRef} args={[1.05, 1]} scale={1.1}>
        <meshBasicMaterial 
            color={PALETTE.neonPink}
            wireframe={true}
            transparent
            opacity={0.6}
            toneMapped={false} // Ensures color is sear-bright neon
        />
      </Icosahedron>
      
      {/* 3. Inner Core Light to make it radiate from within */}
      <pointLight ref={innerLightRef} position={[0,0,0]} intensity={20} color={PALETTE.electricCyan} distance={4} decay={2} />
    </group>
  );
};

// --- Optimized Background ---
const SimpleBackgroundMesh = () => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if(ref.current) {
           ref.current.rotation.z = state.clock.elapsedTime * 0.02;
           ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
        }
    });
    // Using a torus knot wireframe in the far background looks more complex/premium than a sphere
    return (
        <mesh ref={ref} position={[0, 0, -20]} scale={[5, 5, 5]}>
            <torusKnotGeometry args={[3, 0.1, 64, 8, 2, 3]} />
            <meshBasicMaterial color={PALETTE.deepViolet} wireframe transparent opacity={0.05} />
        </mesh>
    );
}


// --- MAIN MOBILE COMPONENT ---

const HeroMobile: React.FC = () => {
  const [dpr, setDpr] = useState(1); 

  return (
    <div className="absolute inset-0 z-0 bg-[#030305]">
      <Canvas 
        dpr={dpr} 
        // Wider FOV makes the central object feel more imposing
        camera={{ position: [0, 0, 15], fov: 50 }} 
        gl={{ 
            antialias: false, 
            alpha: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
        }}
      >
        <PerformanceMonitor onDecline={() => setDpr(0.75)} onIncline={() => setDpr(1.5)} />
        
        <color attach="background" args={['#030305']} />
        {/* City preset gives great urban reflections on the metal core */}
        <Environment preset="city" blur={1} background={false} />
        
        {/* Dramatic Rim Lighting defines the edges of the facets */}
        <spotLight position={[-12, 15, 10]} angle={0.3} intensity={100} color={PALETTE.neonBlue} penumbra={1} />
        <spotLight position={[12, -10, 10]} angle={0.3} intensity={100} color={PALETTE.neonPink} penumbra={1} />
        <pointLight position={[0, 5, -5]} intensity={10} color={PALETTE.royalPurple} />

        <Stars radius={80} depth={50} count={500} factor={4} saturation={0} fade speed={0.3} />
        <Sparkles count={30} scale={15} size={4} speed={0.2} opacity={0.4} color={PALETTE.neonBlue} />
        <Sparkles count={20} scale={15} size={2} speed={0.3} opacity={0.3} color={PALETTE.neonPink} />
        
        <SimpleBackgroundMesh />

        <PresentationControls
          global
          zoom={0.7}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 6, Math.PI / 6]}
          azimuth={[-Math.PI / 6, Math.PI / 6]}
          config={{ mass: 1, tension: 200, friction: 30 }}
          snap={true}
        >
          <Float speed={2.5} rotationIntensity={0.5} floatIntensity={0.8} floatingRange={[-0.2, 0.2]}>
            <group position={[0, 0.5, 0]}>
               {/* THE NEW GEOMETRIC ARTIFACT */}
               <GeometricArtifact scale={2.5} />
            </group>
          </Float>
        </PresentationControls>

        <ContactShadows position={[0, -4, 0]} opacity={0.7} scale={18} blur={2.5} far={5} color={PALETTE.deepBlue} frames={1} />
      </Canvas>
    </div>
  );
};

export default HeroMobile;