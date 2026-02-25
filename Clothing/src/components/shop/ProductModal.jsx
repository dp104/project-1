import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Truck, Zap, Tag } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { supabase } from '../../lib/supabase';

const LABEL_STYLES = {
    NEW: 'bg-emerald-500 text-white',
    HOT: 'bg-red-500 text-white',
    SALE: 'bg-pink-500 text-white',
    LIMITED: 'bg-amber-500 text-white',
    BESTSELLER: 'bg-violet-600 text-white',
}

const fmtInr = (paise) => Math.floor(paise / 100).toLocaleString('en-IN')

export function ProductModal({ product, isOpen, onClose }) {
    const addItem = useCartStore((state) => state.addItem);
    const sizes = Array.isArray(product.sizes) && product.sizes.length > 0 ? product.sizes : [];
    const [selectedSize, setSelectedSize] = useState(sizes[0] || '');
    const [isMounted, setIsMounted] = useState(false);
    const [shipping, setShipping] = useState(null);

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

    // Fetch shipping settings once
    useEffect(() => {
        if (!shipping) {
            supabase.from('shipping_settings').select('*').eq('id', 1).single()
                .then(({ data }) => { if (data) setShipping(data) })
        }
    }, []);

    // ── Price logic ──────────────────────────────────────────────────
    // product.price - always the selling/offer price (in paise from DB)
    // product.mrp   - original price (in paise), optional
    // Only show crossed-out MRP when BOTH are present AND mrp > price
    const offerPrice = typeof product.price === 'number' ? product.price : null
    const mrp = product.mrp && typeof product.mrp === 'number' ? product.mrp : null
    const hasDiscount = offerPrice && mrp && mrp > offerPrice
    const discountPct = hasDiscount ? Math.round((1 - offerPrice / mrp) * 100) : 0

    const displayPrice = offerPrice != null
        ? `₹${fmtInr(offerPrice)}`
        : `₹${product.price}`   // fallback for string-formatted price

    // ── Shipping display ─────────────────────────────────────────────
    const shippingLines = []
    if (shipping) {
        if (shipping.free_shipping_enabled) {
            const threshold = shipping.free_shipping_threshold
            if (!threshold || threshold === 0) {
                shippingLines.push({ icon: Truck, text: 'Free Shipping', color: 'text-emerald-400' })
            } else {
                const thresholdStr = fmtInr(threshold)
                const qualifies = offerPrice && offerPrice >= threshold
                shippingLines.push({
                    icon: Truck,
                    text: qualifies
                        ? 'Free Shipping Applied!'
                        : `Free Shipping on orders above ₹${thresholdStr}`,
                    color: qualifies ? 'text-emerald-400' : 'text-gray-300',
                })
            }
        } else {
            shippingLines.push({ icon: Truck, text: `Standard Delivery ₹${fmtInr(shipping.standard_charge)}`, color: 'text-gray-300' })
        }
        if (shipping.express_enabled) {
            shippingLines.push({ icon: Zap, text: `Express Delivery ₹${fmtInr(shipping.express_charge)}`, color: 'text-amber-400' })
        }
    } else {
        // fallback while loading
        shippingLines.push({ icon: Truck, text: 'Shipping calculated at checkout', color: 'text-gray-400' })
    }

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
                        {/* Close */}
                        <button onClick={onClose}
                            className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-white text-white hover:text-black rounded-full backdrop-blur-md transition-colors">
                            <X size={16} />
                        </button>

                        <div className="flex flex-col md:flex-row w-full flex-1 overflow-y-auto overflow-x-hidden md:overflow-hidden">
                            {/* Image */}
                            <div className="w-full md:w-1/2 h-[350px] sm:h-[400px] md:h-auto relative shrink-0">
                                <div className="absolute inset-0 bg-neon-gradient sm:p-[2px] p-0 md:border-r-0">
                                    <div className="w-full h-full bg-gray-900 overflow-hidden relative sm:rounded-l-[14px] rounded-none md:rounded-r-none md:rounded-t-none">
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />

                                        {/* Label badge — only if set */}
                                        {product.label && (
                                            <div className="absolute top-4 left-4 z-20">
                                                <span className={`text-[12px] font-bold px-3 py-1.5 rounded-full shadow tracking-widest uppercase ${LABEL_STYLES[product.label] || 'bg-white/90 text-gray-900'}`}>
                                                    {product.label}
                                                </span>
                                            </div>
                                        )}

                                        {/* Discount badge — top-right only if discount exists */}
                                        {hasDiscount && (
                                            <div className="absolute top-4 right-4 z-20">
                                                <span className="text-[12px] font-bold px-3 py-1.5 rounded-full bg-black/80 text-pink-400 shadow tracking-wider">
                                                    -{discountPct}%
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col shrink-0 md:shrink md:flex-1 md:min-h-0 md:overflow-y-auto">
                                <span className="text-[12px] text-cyan-400 font-sans font-bold tracking-widest uppercase mb-2 mt-4 md:mt-0">
                                    {product.category}
                                </span>

                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-sans font-black tracking-tight text-white mb-4 leading-tight uppercase">
                                    {product.name}
                                </h2>

                                {/* Price — only show MRP crossed if hasDiscount */}
                                <div className="flex items-baseline gap-3 mb-6">
                                    <p className="text-2xl font-bold text-white font-sans">{displayPrice}</p>
                                    {hasDiscount && (
                                        <>
                                            <p className="text-base text-gray-400 font-bold line-through font-sans">₹{fmtInr(mrp)}</p>
                                            <span className="text-[11px] font-bold text-pink-400 bg-pink-400/10 px-2 py-1 rounded-full">
                                                {discountPct}% OFF
                                            </span>
                                        </>
                                    )}
                                </div>

                                <p className="text-gray-300 text-[15px] font-sans mb-6 leading-relaxed max-w-md">
                                    {product.description || 'Premium quality materials engineered for the modern individual. Features a relaxed fit with structurally reinforced seams and a soft, breathable finish.'}
                                </p>

                                {/* Sizes */}
                                {sizes.length > 0 && (
                                    <div className="mb-6">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-[11px] uppercase tracking-widest text-gray-200 font-sans font-bold">Select Size</span>
                                            <span className="text-[11px] uppercase tracking-widest text-gray-400 hover:text-white cursor-pointer underline underline-offset-4 transition-colors font-sans">Size Guide</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {sizes.map(size => (
                                                <button key={size} onClick={() => setSelectedSize(size)}
                                                    className={`px-4 py-3 text-sm font-sans font-bold rounded-lg border transition-all duration-200 min-w-[52px] ${selectedSize === size
                                                        ? 'bg-white border-white text-black'
                                                        : 'bg-transparent border-white/20 text-white hover:border-white/60'
                                                        }`}>
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="mt-auto space-y-4">
                                    <button
                                        onClick={() => { addItem({ ...product, size: selectedSize }); onClose(); }}
                                        className="w-full bg-white text-black py-4 rounded-full font-sans text-[13px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors shadow-lg">
                                        Add to Bag
                                    </button>

                                    {/* Shipping info from Supabase settings */}
                                    <div className="pt-4 border-t border-white/5 space-y-2">
                                        {shippingLines.map((line, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <line.icon size={15} className={line.color} />
                                                <span className={`text-[11px] font-bold uppercase tracking-widest font-sans ${line.color}`}>
                                                    {line.text}
                                                </span>
                                            </div>
                                        ))}
                                        <div className="flex items-center gap-2">
                                            <ShieldCheck size={15} className="text-gray-400" />
                                            <span className="text-[11px] font-bold uppercase tracking-widest font-sans text-gray-400">Authentic Product Guarantee</span>
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
