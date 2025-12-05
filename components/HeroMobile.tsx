import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PresentationControls, Environment, RoundedBox, MeshTransmissionMaterial, ContactShadows, Sparkles, Stars, PerformanceMonitor } from '@react-three/drei';
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

// --- LOCAL COMPONENTS (Optimized for Mobile) ---

const BackgroundWireframe = () => {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (mesh.current) {
        mesh.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        mesh.current.rotation.z = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, -10]} scale={[1.5, 1.5, 1.5]}>
        {/* Lowest detail geometry for mobile background */}
        <icosahedronGeometry args={[10, 0]} />
        <meshBasicMaterial color={PALETTE.navy} wireframe transparent opacity={0.05} />
    </mesh>
  )
}

const CrystalCube = ({ position, rotation, coreColor, glassColor, rimColor, scale = 1 }: { position: [number, number, number], rotation: [number, number, number], coreColor: string, glassColor: string, rimColor: string, scale?: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  
  // Memoize args to prevent garbage collection on every render
  const boxArgs: [number, number, number] = useMemo(() => [2.5, 2.5, 2.5], []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
       groupRef.current.rotation.x = rotation[0] + Math.sin(t * 0.2) * 0.05;
       groupRef.current.rotation.y = rotation[1] + t * 0.08;
    }
  });

  return (
    <group position={position} ref={groupRef} scale={scale}>
      <RoundedBox 
        args={boxArgs} 
        radius={0.05} 
        smoothness={2} // Mobile Optimization: Low smoothness (4 -> 2)
      >
        <MeshTransmissionMaterial
            backside
            samples={3} // Mobile Optimization: Very low samples (4 -> 3)
            resolution={256} // Mobile Optimization: Low resolution buffer (512 -> 256)
            thickness={2}
            chromaticAberration={0.5} // Reduced for performance
            anisotropy={0} // Disabled for mobile
            distortion={0.4}
            distortionScale={0.4}
            temporalDistortion={0.1}
            iridescence={1}
            iridescenceIOR={1.4}
            iridescenceThicknessRange={[0, 1400]}
            clearcoat={1}
            roughness={0.05}
            metalness={0.2}
            color={glassColor}
            attenuationDistance={3}
            attenuationColor={coreColor}
            background={new THREE.Color('#030305')}
            ior={2.4}
        />
      </RoundedBox>
      
      {/* Wireframe overlay */}
      <mesh scale={[0.99, 0.99, 0.99]}>
         <boxGeometry args={boxArgs} />
         <meshBasicMaterial ref={materialRef} color={rimColor} wireframe transparent opacity={0.2} />
      </mesh>
      
      {/* Inner Glow */}
      <pointLight ref={lightRef} position={[0, 0, 0]} intensity={40} color={coreColor} distance={5} decay={2} />
    </group>
  );
};

// --- MAIN MOBILE COMPONENT ---

const HeroMobile: React.FC = () => {
  // Mobile usually needs lower DPR to save battery
  const [dpr, setDpr] = useState(1); 

  return (
    <div className="absolute inset-0 z-0 bg-[#030305]">
      <Canvas 
        dpr={dpr} 
        camera={{ position: [0, 0, 18], fov: 35 }} // Slightly wider FOV for vertical screens
        gl={{ 
            toneMapping: THREE.ACESFilmicToneMapping, 
            toneMappingExposure: 1.8,
            antialias: false,
            alpha: false,
            powerPreference: "high-performance"
        }}
      >
        <PerformanceMonitor onDecline={() => setDpr(0.7)} onIncline={() => setDpr(1.2)} />
        
        <color attach="background" args={['#030305']} />
        <Environment preset="night" blur={0.8} />
        
        {/* Lights (Keep simple for mobile) */}
        <spotLight position={[-15, 15, 10]} angle={0.4} penumbra={1} intensity={50} color={PALETTE.neonBlue} />
        <spotLight position={[15, -10, 10]} angle={0.4} penumbra={1} intensity={50} color={PALETTE.neonPink} />
        <pointLight position={[0, 10, 5]} intensity={10} color="white" />

        {/* Reduced particle count for mobile CPU */}
        <Stars radius={100} depth={50} count={800} factor={4} saturation={0} fade speed={0.5} />
        <Sparkles count={40} scale={12} size={3} speed={0.4} opacity={0.5} color={PALETTE.softPink} />
        
        <BackgroundWireframe />

        <PresentationControls
          global
          zoom={0.8}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 16, Math.PI / 16]}
          azimuth={[-Math.PI / 16, Math.PI / 16]}
          config={{ mass: 2, tension: 400 }}
          snap={true}
        >
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <group position={[0, -1, 0]}>
               {/* ONLY ONE CUBE - Centered and slightly larger */}
               <CrystalCube
                  position={[0, 0, 0]}
                  rotation={[Math.PI / 8, Math.PI / 4, 0]}
                  coreColor={PALETTE.royalPurple}
                  glassColor="#e0c0ff"
                  rimColor={PALETTE.neonPink}
                  scale={1.3} // Increased scale for mobile visibility
               />
            </group>
          </Float>
        </PresentationControls>

        <ContactShadows position={[0, -4, 0]} opacity={0.5} scale={20} blur={3} far={4} color={PALETTE.navy} frames={1} />
      </Canvas>
    </div>
  );
};

export default HeroMobile;