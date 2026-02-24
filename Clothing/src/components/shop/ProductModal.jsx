import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Truck } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';

export function ProductModal({ product, isOpen, onClose }) {
    const addItem = useCartStore((state) => state.addItem);
    const [selectedSize, setSelectedSize] = useState('L');
    const [isMounted, setIsMounted] = useState(false);

    // Initialize portal element correctly on client
    useEffect(() => {
        setIsMounted(true);
        if (isOpen) {
            document.body.classList.add('product-modal-open');
            document.body.style.overflow = 'hidden';
        } else {
            document.body.classList.remove('product-modal-open');
            if (!document.body.classList.contains('cart-drawer-open')) {
                document.body.style.overflow = '';
            }
        }
        return () => {
            document.body.classList.remove('product-modal-open');
            if (!document.body.classList.contains('cart-drawer-open')) {
                document.body.style.overflow = '';
            }
        };
    }, [isOpen]);

    if (!isMounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 shadow-2xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-4xl bg-[#0B0B0F] border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-10 max-h-[90vh]"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-white text-white hover:text-black rounded-full backdrop-blur-md transition-colors"
                        >
                            <X size={16} />
                        </button>

                        <div className="flex flex-col md:flex-row w-full flex-1 overflow-y-auto overflow-x-hidden md:overflow-hidden">
                            {/* Image Section */}
                            <div className="w-full md:w-1/2 h-[350px] sm:h-[400px] md:h-auto relative shrink-0">
                                {/* Inner border container */}
                                <div className="absolute inset-0 bg-neon-gradient sm:p-[2px] p-0 md:border-r-0">
                                    <div className="w-full h-full bg-gray-900 overflow-hidden relative sm:rounded-l-[14px] rounded-none md:rounded-r-none md:rounded-t-none">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                        {/* NEW tag */}
                                        <div className="absolute top-4 left-4 z-20">
                                            <div className="bg-white/90 backdrop-blur-sm px-4 py-1.5 flex items-center shadow-sm rounded-full">
                                                <span className="text-[10px] font-sans text-gray-900 tracking-widest uppercase font-bold">New Arrival</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col shrink-0 md:shrink md:flex-1 md:min-h-0 md:overflow-y-auto">
                                <span className="text-[10px] text-cyan-400 font-sans tracking-widest uppercase mb-2 mt-4 md:mt-0">
                                    {product.category}
                                </span>

                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-sans font-black tracking-tight text-white mb-4 leading-tight uppercase">
                                    {product.name}
                                </h2>

                                <p className="text-2xl font-bold text-white font-sans mb-6">
                                    ₹{product.price}
                                </p>

                                <p className="text-gray-400 text-sm font-sans mb-8 leading-relaxed max-w-md">
                                    Premium quality materials engineered for the modern individual. This piece features a relaxed fit with structurally reinforced seams and a soft, breathable finish. Perfect for luxury streetwear styling.
                                </p>

                                {/* Size Selection */}
                                <div className="mb-8">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-xs uppercase tracking-widest text-gray-300 font-sans font-bold">Select Size</span>
                                        <span className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-white cursor-pointer underline underline-offset-4 transition-colors">Size Guide</span>
                                    </div>
                                    <div className="flex gap-3">
                                        {['S', 'M', 'L', 'XL'].map(size => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`flex-1 py-3 text-sm font-sans font-bold rounded-lg border transition-all duration-200 ${selectedSize === size
                                                    ? 'bg-white border-white text-black'
                                                    : 'bg-transparent border-white/20 text-white hover:border-white/60'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-auto space-y-4">
                                    <button
                                        onClick={() => {
                                            addItem({ ...product, size: selectedSize });
                                            onClose();
                                        }}
                                        className="w-full bg-white text-black py-4 rounded-full font-sans text-[12px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors shadow-lg"
                                    >
                                        Add to Bag
                                    </button>

                                    <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-white/5">
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <Truck size={14} />
                                            <span className="text-[10px] uppercase tracking-widest font-sans">Free Shipping</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <ShieldCheck size={14} />
                                            <span className="text-[10px] uppercase tracking-widest font-sans">Lifetime Warranty</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
