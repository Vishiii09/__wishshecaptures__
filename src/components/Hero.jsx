import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Tube, TorusKnot } from '@react-three/drei';
import { motion } from 'framer-motion';

function FloatingCamera() {
    const group = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        group.current.rotation.y = Math.sin(t / 4) / 4;
        group.current.position.y = Math.sin(t / 2) / 2;
        group.current.rotation.x = Math.sin(t / 3) / 8;
    });

    return (
        <group ref={group}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
                <group scale={1.2}>
                    {/* Main Body */}
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[1.6, 1, 0.6]} />
                        <meshStandardMaterial color="#333333" roughness={0.5} metalness={0.2} />
                    </mesh>

                    {/* Top Flash/Viewfinder Box */}
                    <mesh position={[0, 0.6, -0.1]}>
                        <boxGeometry args={[0.5, 0.4, 0.4]} />
                        <meshStandardMaterial color="#444444" roughness={0.5} />
                    </mesh>

                    {/* Grip */}
                    <mesh position={[0.7, 0, 0.1]}>
                        <boxGeometry args={[0.3, 0.9, 0.7]} />
                        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
                    </mesh>

                    {/* Shutter Button */}
                    <mesh position={[0.6, 0.52, 0.15]}>
                        <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} />
                        <meshStandardMaterial color="#ff5555" roughness={0.3} metalness={0.5} />
                    </mesh>

                    {/* Lens Base Mount */}
                    <mesh position={[0, 0, 0.35]} rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.45, 0.45, 0.1, 32]} />
                        <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
                    </mesh>

                    {/* Main Lens Barrel */}
                    <mesh position={[0, 0, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.4, 0.4, 0.4, 32]} />
                        <meshStandardMaterial color="#2a2a2a" roughness={0.4} />
                    </mesh>

                    {/* Lens Outer Ring */}
                    <mesh position={[0, 0, 0.8]} rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.42, 0.42, 0.1, 32]} />
                        <meshStandardMaterial color="#555555" roughness={0.3} metalness={0.5} />
                    </mesh>

                    {/* Glass Element */}
                    <mesh position={[0, 0, 0.85]} rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.36, 0.36, 0.05, 32]} />
                        <meshStandardMaterial color="#88cbd1" metalness={1} roughness={0.05} transparent opacity={0.9} />
                    </mesh>

                    {/* Inner Glass Element (Depth reflection) */}
                    <mesh position={[0, 0, 0.7]} rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.3, 0.3, 0.02, 32]} />
                        <meshStandardMaterial color="#ad66ff" metalness={1} roughness={0.1} transparent opacity={0.6} />
                    </mesh>
                </group>
            </Float>
        </group>
    );
}

const Hero = () => {
    return (
        <section className="hero-section" id="home">
            <div className="canvas-container">
                <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[10, 10, 5]} intensity={2.5} color="#ffffff" />
                    <spotLight position={[-10, 10, 10]} intensity={3} color="#ad66ff" />
                    <spotLight position={[10, -10, 5]} intensity={2} color="#88cbd1" angle={0.5} />

                    <Stars radius={100} depth={50} count={6000} factor={5} saturation={0.5} fade speed={1.5} />

                    <FloatingCamera />
                </Canvas>
            </div>

            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <h1 className="hero-title" style={{ fontFamily: '"Outfit", sans-serif', fontWeight: 300, letterSpacing: '4px', textTransform: 'lowercase', fontSize: 'clamp(3rem, 8vw, 6rem)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span style={{ fontFamily: '"Great Vibes", cursive', fontSize: 'clamp(5rem, 15vw, 10rem)', letterSpacing: '2px', textTransform: 'none', color: '#ffffff', marginBottom: '-20px', fontWeight: 400 }}>Wishshe</span>
                        <span style={{ fontWeight: 600, background: 'linear-gradient(45deg, #ff9900, #ffcc00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '8px', textTransform: 'uppercase' }}>CAPTURES</span>
                    </h1>
                    <p className="hero-subtitle">
                        Through the lens of Vishi Sharma.
                        Scroll down to explore.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
