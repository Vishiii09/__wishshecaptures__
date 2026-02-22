import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Gallery = () => {
    // Structure: { categoryName: { locationName: [ { src, path, filename } ] } }
    const [allImages, setAllImages] = useState({});

    // Navigation state
    const [activeCategory, setActiveCategory] = useState(null);
    const [activeLocation, setActiveLocation] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const categories = [
        { id: 'street', title: "Street", coverPath: "city.png" },
        { id: 'portrait', title: "Portrait", coverPath: "portrait.png" },
        { id: 'cafe', title: "Cafe & Hospitality", coverPath: "sample1.jpg" },
        { id: 'nature', title: "Nature", coverPath: "car.png" }
    ];

    useEffect(() => {
        // Import all images natively
        const importAll = async () => {
            try {
                // Glob all images recursively from the gallery folder
                const imageModules = import.meta.glob('../assets/gallery/**/*.{png,jpg,jpeg,webp}');
                const loadedImages = {};

                for (const path in imageModules) {
                    const mod = await imageModules[path]();

                    // clean path e.g., '../assets/gallery/street/indore/city.png' -> 'street/indore/city.png'
                    const cleanPath = path.replace('../assets/gallery/', '');
                    const parts = cleanPath.split('/');

                    const filename = parts.pop();
                    let location = 'Other';
                    let category = 'uncategorized';

                    if (parts.length >= 2) {
                        category = parts[0];
                        location = parts[1];
                    } else if (parts.length === 1) {
                        category = parts[0];
                    }

                    if (!loadedImages[category]) loadedImages[category] = {};
                    if (!loadedImages[category][location]) loadedImages[category][location] = [];

                    loadedImages[category][location].push({
                        src: mod.default,
                        path: path,
                        filename: filename
                    });
                }

                setAllImages(loadedImages);
            } catch (error) {
                console.error("Error loading images:", error);
            }
        };

        importAll();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        },
        exit: { opacity: 0, scale: 0.95 }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 30 },
        show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 50 } }
    };

    // Helper to get a cover image for a main category
    const getCategoryCover = (catId) => {
        if (!allImages[catId]) return '';

        // Priority 1: User explicitly names file like 'first_street.jpg' or 'cover'
        for (const loc in allImages[catId]) {
            const specificCover = allImages[catId][loc].find(img =>
                img.filename.toLowerCase().includes(`first_${catId.toLowerCase()}`) ||
                img.filename.toLowerCase().includes('cover')
            );
            if (specificCover) return specificCover.src;
        }

        // Priority 2: User explicitly names file like 'first_...'
        for (const loc in allImages[catId]) {
            const specificCover = allImages[catId][loc].find(img => img.filename.toLowerCase().includes('first_'));
            if (specificCover) return specificCover.src;
        }

        // Fallback to first image of first location
        const firstLoc = Object.keys(allImages[catId])[0];
        if (firstLoc && allImages[catId][firstLoc].length > 0) {
            return allImages[catId][firstLoc][0].src;
        }

        return '';
    };

    // Helper to get a cover image for a specific location
    const getLocationCover = (catId, locId) => {
        if (!allImages[catId] || !allImages[catId][locId]) return '';

        // Priority 1: explicitly named first_locationname or first_locationpic
        let specificCover = allImages[catId][locId].find(img =>
            img.filename.toLowerCase().includes(`first_${locId.toLowerCase()}`) ||
            img.filename.toLowerCase().includes('first_locationpic') ||
            img.filename.toLowerCase().includes('cover')
        );
        if (specificCover) return specificCover.src;

        // Priority 2: named first_...
        specificCover = allImages[catId][locId].find(img => img.filename.toLowerCase().includes('first_'));
        if (specificCover) return specificCover.src;

        // Fallback
        return allImages[catId][locId][0]?.src || '';
    };

    const handleBack = () => {
        if (activeLocation) {
            setActiveLocation(null);
        } else if (activeCategory) {
            setActiveCategory(null);
        }
    };

    const getTitle = () => {
        if (activeLocation) return activeLocation.charAt(0).toUpperCase() + activeLocation.slice(1);
        if (activeCategory) return categories.find(c => c.id === activeCategory)?.title;
        return "Selected Works";
    };

    return (
        <section className="section" id="gallery" style={{ zIndex: 10, minHeight: '100vh' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <h2 className="section-title" style={{ marginBottom: 0 }}>
                        {getTitle()}
                    </h2>

                    <AnimatePresence>
                        {(activeCategory || activeLocation) && (
                            <motion.button
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                onClick={handleBack}
                                style={{
                                    background: 'transparent',
                                    border: '1px solid var(--text-secondary)',
                                    color: 'var(--text-primary)',
                                    padding: '0.8rem 1.5rem',
                                    borderRadius: '30px',
                                    cursor: 'pointer',
                                    fontFamily: 'inherit',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    fontSize: '0.8rem',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                                onMouseOut={(e) => e.target.style.background = 'transparent'}
                            >
                                ← Back
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>

                <AnimatePresence mode="wait">
                    {/* TIER 1: CATEGORY LIST VIEW */}
                    {!activeCategory && !activeLocation && (
                        <motion.div
                            key="categories"
                            className="gallery-grid"
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                        >
                            {categories.map((cat) => {
                                const coverSrc = getCategoryCover(cat.id);
                                return (
                                    <motion.div
                                        key={cat.id}
                                        className="gallery-item"
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.02, zIndex: 20 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        onClick={() => setActiveCategory(cat.id)}
                                    >
                                        {coverSrc && <img src={coverSrc} alt={cat.title} className="gallery-image" loading="lazy" />}
                                        <div className="gallery-overlay" style={{ opacity: 1, background: 'linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.7) 100%)' }}>
                                            <span className="gallery-title">{cat.title}</span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    )}

                    {/* TIER 2: LOCATION FOLDERS INSIDE A CATEGORY */}
                    {activeCategory && !activeLocation && (
                        <motion.div
                            key="locations"
                            className="gallery-grid"
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                        >
                            {allImages[activeCategory] && Object.keys(allImages[activeCategory]).filter(loc => loc.toLowerCase() !== 'other').length > 0 ? (
                                Object.keys(allImages[activeCategory]).filter(loc => loc.toLowerCase() !== 'other').map((loc, index) => {
                                    const coverSrc = getLocationCover(activeCategory, loc);
                                    const formattedLoc = loc.charAt(0).toUpperCase() + loc.slice(1);

                                    return (
                                        <motion.div
                                            key={loc}
                                            className="gallery-item"
                                            variants={itemVariants}
                                            whileHover={{ scale: 1.02, zIndex: 20 }}
                                            transition={{ duration: 0.4, ease: "easeOut" }}
                                            onClick={() => setActiveLocation(loc)}
                                        >
                                            {coverSrc && <img src={coverSrc} alt={loc} className="gallery-image" loading="lazy" />}
                                            <div
                                                className="gallery-overlay"
                                                style={{
                                                    opacity: 1,
                                                    background: 'linear-gradient(0deg, rgba(0,0,0,0.85) 0%, transparent 40%)',
                                                    justifyContent: 'flex-end',
                                                    alignItems: 'flex-end',
                                                    padding: '1.5rem'
                                                }}
                                            >
                                                <span
                                                    className="gallery-title"
                                                    style={{
                                                        fontSize: '1.5rem',
                                                        transform: 'none',
                                                        textAlign: 'right',
                                                        margin: 0,
                                                        textShadow: '0 2px 10px rgba(0,0,0,0.9)'
                                                    }}
                                                >
                                                    {formattedLoc}
                                                </span>
                                            </div>
                                        </motion.div>
                                    )
                                })
                            ) : (
                                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)', gridColumn: '1 / -1' }}>
                                    <p>No location folders found in <b>{activeCategory}</b>.</p>
                                    <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
                                        Add folders like <code style={{ color: 'var(--text-primary)' }}>src/assets/gallery/{activeCategory}/my-location/</code>
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* TIER 3: IMAGES INSIDE A SPECIFIC LOCATION */}
                    {activeCategory && activeLocation && (
                        <motion.div
                            key="images"
                            className="gallery-grid"
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                        >
                            {allImages[activeCategory][activeLocation] && allImages[activeCategory][activeLocation].length > 0 ? (
                                allImages[activeCategory][activeLocation].map((img, index) => (
                                    <motion.div
                                        key={index}
                                        className="gallery-item"
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.02, zIndex: 20 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        onClick={() => setSelectedImage(img.src)}
                                    >
                                        <img src={img.src} alt={`${activeLocation} ${index + 1}`} className="gallery-image" loading="lazy" />
                                    </motion.div>
                                ))
                            ) : (
                                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)', gridColumn: '1 / -1' }}>
                                    <p>No images found in <b>{activeLocation}</b>.</p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* LIGHTBOX POPUP OVERLAY */}
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedImage(null)}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100vw',
                                height: '100vh',
                                backgroundColor: 'rgba(0, 0, 0, 0.95)',
                                zIndex: 9999,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'zoom-out',
                                padding: '2rem'
                            }}
                        >
                            <button
                                onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                                style={{
                                    position: 'absolute',
                                    top: '2rem',
                                    right: '2rem',
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#ffffff',
                                    cursor: 'pointer',
                                    padding: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    zIndex: 10000
                                }}
                            >
                                <X size={32} />
                            </button>

                            <motion.img
                                src={selectedImage}
                                alt="Expanded view"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'contain',
                                    borderRadius: '8px',
                                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                                }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Gallery;
