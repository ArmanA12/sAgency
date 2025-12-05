import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PresentationControls, Environment, ContactShadows, Stars, PerformanceMonitor, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

const PALETTE = {
  voidBlack: '#080808',
  neonCyan: '#00F0FF',
  neonPurple: '#BD00FF',
  deepBlue: '#001eff',
};

// --- THE HOLOGRAPHIC GEM CORE ---
// A single, solid Octahedron with an iridescent material.
// No wireframes.
const HyperCore = ({ scale = 1 }: { scale?: number }) => {
  const diamondRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
      const t = state.clock.getElapsedTime();
      if (diamondRef.current) {
          // Complex rotation to show off different facets catching the light
          diamondRef.current.rotation.y = t * 0.3;
          diamondRef.current.rotation.x = Math.cos(t * 0.2) * 0.2;
          diamondRef.current.rotation.z = Math.sin(t * 0.1) * 0.1;
      }
  });

  return (
    <group scale={scale}>
      {/* THE GEMSTONE
         We use an Octahedron with flat shading for the jewel look.
      */}
      <Octahedron ref={diamondRef} args={[1, 0]}>
        {/* meshPhysicalMaterial is slightly heavier than standard, 
           but we removed all wireframes, so performance balances out.
           Iridescence creates the colorful look cheaply.
        */}
        <meshPhysicalMaterial 
            color={PALETTE.voidBlack} // A dark base color makes the rainbows pop
            roughness={0.02}     // Extremely glossy, almost perfect mirror
            metalness={0.9}      // Metallic base reflection
            
            iridescence={1}      // Enable the rainbow effect
            iridescenceIOR={1.5} // Index of refraction for the rainbow film (diamond-like)
            iridescenceThicknessRange={[100, 800]} // The range of colors generated
            
            envMapIntensity={2.5} // Boost environmental reflections
            flatShading={true}    // CRITICAL: Ensures each face is a solid color
            clearcoat={1}         // Adds an extra layer of polish
        />
      </Octahedron>
      
      {/* Internal light to give it a subtle glow from within */}
      <pointLight position={[0,0,0]} intensity={5} color={PALETTE.neonPurple} distance={3} />
    </group>
  );
};

// --- PARTICLE FIELD (Kept for ambiance) ---
const DataParticles = () => {
    const count = 20;
    const positions = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            x: (Math.random() - 0.5) * 10,
            y: (Math.random() - 0.5) * 10,
            z: (Math.random() - 0.5) * 5,
            scale: Math.random() * 0.05 + 0.02
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
                    {/* Using simple tetrahedrons for particles now, fits the theme better */}
                    <tetrahedronGeometry args={[pos.scale, 0]} />
                    <meshBasicMaterial color={i % 2 === 0 ? PALETTE.neonCyan : PALETTE.neonPurple} transparent opacity={0.5} />
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
            alpha: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
            // Tone mapping helps manage the bright iridescent colors
            toneMapping: THREE.ACESFilmicToneMapping, 
            toneMappingExposure: 1.2
        }}
      >
        <PerformanceMonitor onDecline={() => setDpr(0.75)} onIncline={() => setDpr(1.5)} />
        
        <color attach="background" args={['#030305']} />
        
        {/* City preset provides sharp contrast for the gem reflections */}
        <Environment preset="city" resolution={256} blur={0.8} background={false} />
        
        {/* Lighting positioned to catch the flat faces as they turn */}
        <spotLight position={[-10, 15, 10]} angle={0.3} intensity={60} color="white" penumbra={1} />
        <spotLight position={[10, -10, 10]} angle={0.3} intensity={60} color="white" penumbra={1} />
        
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
               <HyperCore scale={2.8} /> {/* Slightly larger now that it's alone */}
            </group>
          </Float>
        </PresentationControls>

        <ContactShadows resolution={256} position={[0, -4.5, 0]} opacity={0.5} scale={15} blur={2} far={4} color={PALETTE.deepBlue} frames={1} />
      </Canvas>
    </div>
  );
};

export default HeroMobile;