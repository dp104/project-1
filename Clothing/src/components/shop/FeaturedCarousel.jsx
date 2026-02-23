import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';

export function FeaturedCarousel({ products }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const addItem = useCartStore((state) => state.addItem);
    const navigate = useNavigate();

    // To prevent rapid sliding
    const [isDragging, setIsDragging] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getOffset = (index, current, total) => {
        let offset = index - current;
        if (offset > Math.floor(total / 2)) offset -= total;
        if (offset < -Math.floor(total / 2)) offset += total;
        return offset;
    };

    const handleDragEnd = (event, info) => {
        setIsDragging(false);
        if (info.offset.x < -40) {
            handleNext();
        } else if (info.offset.x > 40) {
            handlePrev();
        }
    };

    const handleNext = () => setCurrentIndex((prev) => (prev + 1) % products.length);
    const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);

    // Calculate x offset for smooth responsive sliding
    const getXOffset = (offset) => {
        // More offset for desktop, less for mobile to fit items
        const baseOffset = windowWidth < 640 ? 160 : windowWidth < 1024 ? 240 : 280;
        return offset * baseOffset;
    };

    return (
        <div className="relative w-full h-[550px] md:h-[600px] flex justify-center items-center overflow-hidden">
            {/* Soft Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative w-full max-w-[1400px] h-full flex justify-center items-center">
                <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={handleDragEnd}
                    className="absolute w-full h-full flex justify-center items-center z-20 cursor-grab active:cursor-grabbing"
                    style={{ touchAction: 'none' }}
                >
                    <AnimatePresence>
                        {products.map((product, i) => {
                            const offset = getOffset(i, currentIndex, products.length);
                            const isCenter = offset === 0;
                            const isVisible = Math.abs(offset) <= 2;

                            if (!isVisible) return null;

                            // Responsive scaling matching instructions
                            const scale = isCenter ? 1 : Math.max(0.65, 0.85 - (Math.abs(offset) - 1) * 0.15); // Side cards 0.85
                            const zIndex = 50 - Math.abs(offset);
                            // Side cards maintain opacity to show design, outer cards fade out clearly
                            const opacity = isCenter ? 1 : Math.abs(offset) === 1 ? 0.9 : 0.4;
                            const blur = isCenter ? 0 : Math.abs(offset) * 4;

                            return (
                                <motion.div
                                    key={product.id}
                                    initial={false}
                                    animate={{
                                        x: getXOffset(offset),
                                        scale: scale,
                                        zIndex: zIndex,
                                        opacity: opacity,
                                        filter: `blur(${blur}px)`,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 250,
                                        damping: 25,
                                        mass: 0.8
                                    }}
                                    onClick={() => {
                                        if (!isCenter && !isDragging) setCurrentIndex(i);
                                        else if (isCenter && !isDragging) navigate('/shop');
                                    }}
                                    className={`absolute bg-neon-gradient rounded-[24px] p-[2px] shadow-[0_20px_40px_rgba(0,0,0,0.15)] flex flex-col select-none transition-all duration-300 ${isCenter ? 'hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(255,255,255,0.08)]' : ''}`}
                                    style={{
                                        width: windowWidth < 640 ? '260px' : '320px',
                                        height: windowWidth < 640 ? '400px' : '460px',
                                        pointerEvents: isCenter || Math.abs(offset) === 1 ? 'auto' : 'none'
                                    }}
                                >
                                    <div className="bg-[#FAFAFA] w-full h-full rounded-[22px] flex flex-col p-5 md:p-6 overflow-hidden">
                                        {/* Minimal Image Layout */}
                                        <div className="w-full h-[55%] relative mb-5 overflow-hidden rounded-[16px] bg-gray-100 flex items-center justify-center">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                                draggable={false}
                                            />
                                            {/* Simple NEW Tag */}
                                            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm shadow-sm text-gray-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest z-10">
                                                NEW
                                            </div>
                                        </div>

                                        {/* Clean Typography */}
                                        <div className="flex flex-col flex-1 pb-1 text-left">
                                            <span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-1.5">{product.category.split('|')[0]}</span>
                                            <h3 className="text-lg md:text-xl font-semibold text-gray-900 tracking-tight leading-tight mb-auto font-sans">
                                                {product.name}
                                            </h3>

                                            <div className="flex justify-between items-end mt-4">
                                                <p className="text-lg md:text-xl font-bold text-gray-900 font-sans">₹{product.price}</p>

                                                <motion.button
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        addItem(product);
                                                    }}
                                                    className={`bg-[#050505] text-white px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest shadow-[0_4px_15px_rgba(0,0,0,0.2)] transition-all hover:bg-gray-800 ${isCenter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                                                >
                                                    Add to Bag
                                                </motion.button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Pagination Controls */}
            <div className="absolute bottom-4 flex gap-3 z-30 pointer-events-auto">
                {products.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`transition-all duration-300 rounded-full ${i === currentIndex ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/30 hover:bg-white/50'}`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
