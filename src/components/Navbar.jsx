import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Selected Works', href: '#gallery' },
        { name: 'Contact', href: '#contact' }
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
        >
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href="#home" className="nav-brand">VS.</a>

                <div className="nav-links">
                    {navLinks.map((link, i) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            className="nav-link"
                            whileHover={{ scale: 1.1, color: '#fff' }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            {link.name}
                        </motion.a>
                    ))}
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
