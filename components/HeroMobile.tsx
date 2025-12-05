import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PresentationControls, Environment, ContactShadows, Stars, PerformanceMonitor, Dodecahedron } from '@react-three/drei';
import * as THREE from 'three';

const PALETTE = {
  voidBlack: '#000000', 
  neonCyan: '#00F0FF',  
  neonPink: '#FF0055', 
  neonGold: '#FFD700',
  deepBlue: '#001eff',
};

// --- THE BISMUTH MONOLITH ---
const BismuthCore = ({ scale = 1 }: { scale?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
      const t = state.clock.getElapsedTime();
      if (meshRef.current) {
          // Slow, hypnotic rotation
          // Dodecahedrons look best when rotating on all 3 axes
          meshRef.current.rotation.x = t * 0.15;
          meshRef.current.rotation.y = t * 0.2;
          meshRef.current.rotation.z = Math.sin(t * 0.1) * 0.1;
      }
  });

  return (
    <group scale={scale}>
      {/* THE GEOMETRY: Dodecahedron (12 faces) 
          detail=0 keeps it sharp and faceted.
      */}
      <Dodecahedron ref={meshRef} args={[1, 0]}>
        <meshPhysicalMaterial 
            color={PALETTE.voidBlack} // Base color is jet black
            
            // THE TRICK: High metalness + High Iridescence
            metalness={1} 
            roughness={0.1} // Slight blur to spread the colors
            
            // This creates the "Oil Slick" rainbow effect
            iridescence={1}
            iridescenceIOR={2.2} // High index for strong color separation
            iridescenceThicknessRange={[100, 800]}
            
            // Boosts the reflections of our colored lights
            envMapIntensity={1.5} 
            flatShading={false} // Smooth shading makes the oil slick look liquid
            clearcoat={1}
            clearcoatRoughness={0}
        />
      </Dodecahedron>
      
      {/* Inner light to separate it from the background */}
      <pointLight position={[0,0,0]} intensity={2} color={PALETTE.deepBlue} distance={3} />
    </group>
  );
};

// --- FLOATING SHARDS (Ambiance) ---
const FloatingShards = () => {
    const count = 12;
    // Pre-calculate random positions
    const shards = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            x: (Math.random() - 0.5) * 8,
            y: (Math.random() - 0.5) * 8,
            z: (Math.random() - 0.5) * 4,
            scale: Math.random() * 0.15 + 0.05,
            speed: Math.random() * 0.2 + 0.1
        }));
    }, []);

    const group = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = -state.clock.elapsedTime * 0.05;
        }
    })

    return (
        <group ref={group}>
            {shards.map((item, i) => (
                <mesh key={i} position={[item.x, item.y, item.z]} rotation={[item.x, item.y, 0]}>
                    <octahedronGeometry args={[item.scale, 0]} />
                    {/* These shards pick up the colored lights too */}
                    <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
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
        camera={{ position: [0, 0, 13], fov: 45 }} 
        gl={{ 
            antialias: false, 
            alpha: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.0
        }}
      >
        <PerformanceMonitor onDecline={() => setDpr(0.75)} onIncline={() => setDpr(1.5)} />
        
        <color attach="background" args={['#030305']} />
        
        {/* Environment: Studio (Black background with soft white reflections) */}
        <Environment preset="studio" resolution={256} blur={1} background={false} />
        
        {/* --- LIGHTING PAINTING --- 
            We use 3 spotlights of different colors hitting the object from 
            different sides. As the object rotates, its faces travel through 
            these "color zones", constantly changing colors.
        */}
        
        {/* 1. CYAN Light (Top Left) */}
        <spotLight 
            position={[-10, 10, 10]} 
            angle={0.4} 
            intensity={80} 
            color={PALETTE.neonCyan} 
            penumbra={1} 
        />
        
        {/* 2. MAGENTA Light (Bottom Right) */}
        <spotLight 
            position={[10, -10, 10]} 
            angle={0.4} 
            intensity={80} 
            color={PALETTE.neonPink} 
            penumbra={1} 
        />
        
        {/* 3. GOLD Light (Back Rim) - Adds a premium edge highlight */}
        <spotLight 
            position={[0, 5, -10]} 
            angle={0.5} 
            intensity={100} 
            color={PALETTE.neonGold} 
            penumbra={1} 
        />
        
        <Stars radius={60} depth={40} count={300} factor={3} saturation={0} fade speed={0.5} />
        
        <FloatingShards />

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
               <BismuthCore scale={2.6} /> 
            </group>
          </Float>
        </PresentationControls>

        <ContactShadows resolution={256} position={[0, -4.5, 0]} opacity={0.5} scale={15} blur={2} far={4} color={PALETTE.deepBlue} frames={1} />
      </Canvas>
    </div>
  );
};

export default HeroMobile;