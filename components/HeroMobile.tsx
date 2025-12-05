import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PresentationControls, Environment, ContactShadows, Stars, PerformanceMonitor, Octahedron, Box } from '@react-three/drei';
import * as THREE from 'three';

const PALETTE = {
  voidBlack: '#080808', // Darker black for better contrast
  neonCyan: '#00F0FF',  // Cyberpunk Cyan
  neonPurple: '#BD00FF', // Cyberpunk Purple
  deepBlue: '#001eff',
  white: '#ffffff'
};

// --- THE DIAMOND HYPER-CORE ---
// A diamond shape (Octahedron) inside a spinning containment cube.
// Simple geometry, complex motion.
const HyperCore = ({ scale = 1 }: { scale?: number }) => {
  const diamondRef = useRef<THREE.Mesh>(null);
  const cubeRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
      const t = state.clock.getElapsedTime();
      if (diamondRef.current && cubeRef.current && ringRef.current) {
          // 1. Diamond floats slowly, feels heavy
          diamondRef.current.rotation.y = t * 0.2;
          diamondRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;

          // 2. Cube cage spins fast and dynamic
          cubeRef.current.rotation.x = t * 0.3;
          cubeRef.current.rotation.y = t * 0.4;
          cubeRef.current.rotation.z = Math.sin(t * 0.2) * 0.2;

          // 3. Outer ring acts as a gyroscope
          ringRef.current.rotation.x = -t * 0.2;
          ringRef.current.rotation.z = t * 0.1;
      }
  });

  return (
    <group scale={scale}>
      {/* A. THE CORE: Octahedron (Diamond) 
         Using flatShading + high metalness creates the "Premium Jewel" look 
      */}
      <Octahedron ref={diamondRef} args={[1, 0]}>
        <meshStandardMaterial 
            color="#1a1a1a"
            roughness={0.1}
            metalness={1} // Full chrome
            envMapIntensity={2} // Maximize reflections
            flatShading={true} // Essential for the diamond look
        />
      </Octahedron>

      {/* B. THE CAGE: Wireframe Box 
         toneMapped={false} makes the color glow without bloom
      */}
      <Box ref={cubeRef} args={[1.5, 1.5, 1.5]}>
        <meshBasicMaterial 
            color={PALETTE.neonCyan}
            wireframe
            transparent
            opacity={0.15} // Subtle cage
            toneMapped={false} 
        />
      </Box>

      {/* C. THE HIGHLIGHT: Outer Glowing Edges 
         A second, slightly larger Octahedron just for the neon edges
      */}
      <Octahedron args={[1.02, 0]}>
         <meshBasicMaterial 
            color={PALETTE.neonPurple} 
            wireframe 
            transparent 
            opacity={0.8}
            toneMapped={false} 
         />
      </Octahedron>
      
      {/* Internal light to simulate energy core */}
      <pointLight position={[0,0,0]} intensity={10} color={PALETTE.deepBlue} distance={3} />
    </group>
  );
};

// --- PARTICLE FIELD ---
// Replaces heavy Sparkles with simple low-poly geometry
const DataParticles = () => {
    const count = 20;
    // Memoize random positions so they don't recalculate on render
    const positions = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            x: (Math.random() - 0.5) * 10,
            y: (Math.random() - 0.5) * 10,
            z: (Math.random() - 0.5) * 5,
            scale: Math.random() * 0.05
        }));
    }, []);

    const group = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
    })

    return (
        <group ref={group}>
            {positions.map((pos, i) => (
                <mesh key={i} position={[pos.x, pos.y, pos.z]}>
                    <octahedronGeometry args={[pos.scale, 0]} />
                    <meshBasicMaterial color={PALETTE.neonCyan} transparent opacity={0.4} />
                </mesh>
            ))}
        </group>
    )
}


// --- MAIN MOBILE COMPONENT ---

const HeroMobile: React.FC = () => {
  const [dpr, setDpr] = useState(1); 

  return (
    <div className="absolute inset-0 z-0 bg-[#030305]">
      <Canvas 
        dpr={dpr} 
        camera={{ position: [0, 0, 14], fov: 45 }} 
        gl={{ 
            antialias: false, 
            alpha: false, // Opaque background is faster
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
        }}
      >
        <PerformanceMonitor onDecline={() => setDpr(0.75)} onIncline={() => setDpr(1.5)} />
        
        <color attach="background" args={['#030305']} />
        
        {/* OPTIMIZATION: Low resolution environment map. 
            256x256 is plenty for abstract reflections and saves MBs of memory. */}
        <Environment preset="city" resolution={256} blur={0.8} background={false} />
        
        {/* Cinematic Lighting Setup */}
        <spotLight position={[-10, 15, 10]} angle={0.3} intensity={80} color={PALETTE.neonCyan} penumbra={1} />
        <spotLight position={[10, -10, 10]} angle={0.3} intensity={80} color={PALETTE.neonPurple} penumbra={1} />
        
        {/* Minimal Stars (Reduced count for mobile) */}
        <Stars radius={60} depth={40} count={400} factor={3} saturation={0} fade speed={0.5} />
        
        <DataParticles />

        <PresentationControls
          global
          zoom={0.7}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
          config={{ mass: 1, tension: 200, friction: 30 }}
          snap={true}
        >
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} floatingRange={[-0.2, 0.2]}>
            <group position={[0, 0, 0]}>
               <HyperCore scale={2.5} />
            </group>
          </Float>
        </PresentationControls>

        {/* OPTIMIZATION: resolution=256 reduces shadow map size significantly */}
        <ContactShadows resolution={256} position={[0, -4.5, 0]} opacity={0.6} scale={15} blur={2} far={4} color={PALETTE.neonPurple} frames={1} />
      </Canvas>
    </div>
  );
};

export default HeroMobile;