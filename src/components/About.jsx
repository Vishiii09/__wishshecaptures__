import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Torus, MeshDistortMaterial, Environment, Icosahedron } from '@react-three/drei';

const AnimatedShapes = () => {
    const group = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (group.current) {
            group.current.rotation.y = t * 0.1;
            group.current.rotation.x = t * 0.05;
        }
    });

    return (
        <group ref={group}>
            {/* Center Distorted Core */}
            <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
                <Sphere args={[1.2, 64, 64]} position={[2, 0, -2]}>
                    <MeshDistortMaterial
                        color="#88cbd1"
                        attach="material"
                        distort={0.4}
                        speed={2}
                        roughness={0.2}
                        metalness={0.8}
                        transparent
                        opacity={0.4}
                    />
                </Sphere>
            </Float>

            {/* Orbiting Rings */}
            <Float speed={2} rotationIntensity={2} floatIntensity={1}>
                <Torus args={[2.5, 0.02, 16, 100]} position={[2, 0, -2]} rotation={[Math.PI / 4, 0, 0]}>
                    <meshStandardMaterial color="#ad66ff" emissive="#ad66ff" emissiveIntensity={0.5} roughness={0.1} />
                </Torus>
            </Float>
            <Float speed={2.5} rotationIntensity={1.5} floatIntensity={0.5}>
                <Torus args={[1.8, 0.015, 16, 100]} position={[2, 0, -2]} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
                    <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} roughness={0.1} />
                </Torus>
            </Float>

            {/* Floating Geometric Fragments */}
            <Float speed={3} rotationIntensity={3} floatIntensity={2}>
                <Icosahedron args={[0.3, 0]} position={[4, 2, -1]}>
                    <meshStandardMaterial color="#ff3333" wireframe opacity={0.5} transparent />
                </Icosahedron>
            </Float>
            <Float speed={2.2} rotationIntensity={4} floatIntensity={3}>
                <Icosahedron args={[0.2, 0]} position={[0, -2, -3]}>
                    <meshStandardMaterial color="#4444ff" wireframe opacity={0.3} transparent />
                </Icosahedron>
            </Float>
        </group>
    );
};

const About = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section className="section about-section" id="about" ref={containerRef}>
            {/* Enhanced 3D Background Element for About section */}
            <div className="canvas-container about-canvas">
                <Canvas camera={{ position: [0, 0, 6] }}>
                    <ambientLight intensity={0.4} />
                    <directionalLight position={[5, 5, 5]} intensity={1.5} />
                    <Environment preset="city" />
                    <AnimatedShapes />
                </Canvas>
            </div>

            <div className="container about-container">
                <motion.div
                    className="about-content"
                    style={{ y, opacity }}
                >
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        About Me
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="about-text-wrapper"
                    >
                        <h3 className="about-name">Hi, I'm Vishi Sharma</h3>
                        <p className="about-location">Based in <b>Bangalore, India</b></p>

                        <p className="about-description">
                            I am a passionate photographer dedicated to capturing the raw, authentic moments of life.
                            From the bustling streets of Bangalore to the serene landscapes of nature, my work explores the
                            intricate relationships between light, shadow, and human emotion.
                        </p>
                        <p className="about-description">
                            Whether working on portraiture, dynamic street photography, or capturing the lively essence of
                            cafes and hospitality, I approach every project with a cinematic eye and a commitment to storytelling.
                        </p>

                        <motion.a
                            href="#contact"
                            className="about-cta"
                            whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#000000" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Let's Connect
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
