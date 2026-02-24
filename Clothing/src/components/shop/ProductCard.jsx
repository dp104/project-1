import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Zap, ShieldCheck } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'
import { ProductModal } from './ProductModal'

export function ProductCard({ product }) {
    const addItem = useCartStore((state) => state.addItem)
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="group relative flex flex-col w-full bg-neon-gradient rounded-[18px] p-[2px] transition-all duration-300 hover:shadow-[0_15px_40px_rgba(255,255,255,0.06)]"
        >
            <div className="w-full h-full bg-[#FAFAFA] rounded-[16px] p-4 flex flex-col">
                <div
                    className="relative aspect-[4/5] mb-5 bg-gray-100 rounded-xl overflow-hidden shadow-inner cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                >
                    {/* Clean Image */}
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 xl:group-hover:scale-[1.03]"
                    />

                    {/* Minimal NEW Tag */}
                    <div className="absolute top-3 left-3 z-20">
                        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 flex items-center shadow-sm rounded-full">
                            <span className="text-[9px] font-sans text-gray-800 tracking-widest uppercase font-bold">NEW</span>
                        </div>
                    </div>

                    {/* Bottom Overlay for Button Visibility */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Add to Bag Button - Slides up cleanly on hover (Visible by default on mobile) */}
                    <div className="absolute bottom-4 left-4 right-4 z-20 translate-y-0 lg:translate-y-4 opacity-100 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-300">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsModalOpen(true);
                            }}
                            className="w-full bg-[#111111] text-white py-3 rounded-full font-sans text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-colors shadow-lg"
                        >
                            Add to Bag
                        </button>
                    </div>
                </div>

                {/* Product Details - Clean Typography */}
                <div className="flex flex-col space-y-1.5 px-2">
                    <div className="flex justify-between items-start gap-3">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-400 font-sans tracking-widest uppercase mb-1">{product.category.split('|')[0]}</span>
                            <h3 className="text-sm font-sans font-semibold tracking-tight text-gray-900 leading-tight">
                                {product.name}
                            </h3>
                        </div>
                        {/* Increased Price Visibility */}
                        <p className="text-lg font-bold text-gray-900 whitespace-nowrap font-sans">₹{product.price}</p>
                    </div>

                    <div className="flex items-center gap-3 text-[9px] text-gray-500 uppercase tracking-widest font-sans mt-2">
                        <span className="flex items-center gap-1"><ShieldCheck size={12} className="text-gray-400" /> Authenticated</span>
                    </div>
                </div>

            </div>
            <ProductModal
                product={product}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </motion.div>
    )
}
