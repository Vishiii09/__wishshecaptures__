import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Mail, MapPin } from 'lucide-react';

const ContactFooter = () => {
    return (
        <footer className="footer" id="contact">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="section-title" style={{ marginBottom: '1rem' }}>Let's Work Together</h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 3rem' }}>
                        Available for freelance opportunities. Reach out if you have a project in mind,
                        or just want to say hello.
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <a href="mailto:vishishr4040@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'inherit', textDecoration: 'none' }}>
                                <Mail className="social-icon" size={20} />
                                <span>vishishr4040@gmail.com</span>
                            </a>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <MapPin className="social-icon" size={20} />
                            <span>Bangalore, India</span>
                        </div>
                    </div>

                    <div className="social-links">
                        <motion.a
                            href="https://www.instagram.com/__wishshecaptures__/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Instagram"
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            style={{ display: 'inline-block' }}
                        >
                            <Instagram className="social-icon" size={36} />
                        </motion.a>
                    </div>

                    <p style={{ marginTop: '4rem', color: '#555', fontSize: '0.9rem' }}>
                        © {new Date().getFullYear()} Vishi Sharma Portfolio. All rights reserved.
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};

export default ContactFooter;
