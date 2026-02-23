import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Minus, ArrowLeft, Zap, ShieldCheck, Cpu, Share2, Heart, ExternalLink } from 'lucide-react'
import { useCartStore } from '../store/useCartStore'
import { Button } from '../components/ui/Button'

const ALL_PRODUCTS = [
    { id: 1, name: "NEON GLITCH HOODIE", price: "4,999", category: "HOODIES", sub: "UNISEX | V2.0", image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&q=80&w=800", description: "Infused with neural-sync fibers and reactive neon pigments. This piece features a glitch-weave pattern that shifts under differing light conditions. Designed for high-performance urban movement." },
    { id: 2, name: "CYBER-STRIKE TEE", price: "2,499", category: "T-SHIRTS", sub: "UNISEX | SYSTEM", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800", description: "Standard issue tactical wear for the digital operative. Durable, breathable, and equipped with stealth-core technology. A essential base layer for every kit." },
]

export function ProductDetails() {
    const { id } = useParams()
    const addItem = useCartStore((state) => state.addItem)
    const [quantity, setQuantity] = useState(1)
    const [selectedSize, setSelectedSize] = useState('M')

    const product = ALL_PRODUCTS.find(p => p.id === parseInt(id)) || ALL_PRODUCTS[0]
    const sizes = ['S', 'M', 'L', 'XL']

    return (
        <div className="pt-40 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto">
            <Link to="/shop" className="inline-flex items-center text-[10px] uppercase tracking-[0.4em] text-gray-500 hover:text-cyber-pink transition-colors mb-16 font-cyber group">
                <ArrowLeft size={14} className="mr-3 group-hover:-translate-x-2 transition-transform" />
                Return to Registry
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
                {/* Image Gallery */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="aspect-[3/4] overflow-hidden cyber-card bg-cyber-grey/20 relative group"
                    >
                        <div className="absolute inset-0 bg-cyber-pink/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                        <div className="absolute top-6 left-6 flex items-center gap-2">
                            <div className="w-2 h-2 bg-cyber-pink animate-pulse rounded-full" />
                            <span className="text-[8px] font-cyber tracking-widest text-white uppercase bg-black/50 px-2 py-1 backdrop-blur-md">Uplink Stable</span>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="aspect-[3/4] cyber-card bg-gray-900 cursor-pointer opacity-50 hover:opacity-100 transition-opacity border-none">
                                <img src={product.image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                    <div className="mb-10">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <Cpu className="text-cyber-pink" size={16} />
                                <p className="text-[10px] uppercase tracking-[0.5em] text-cyber-pink font-bold">{product.sub}</p>
                            </div>
                            <div className="flex space-x-6 text-gray-500">
                                <button className="hover:text-cyber-pink transition-colors"><Heart size={20} /></button>
                                <button className="hover:text-cyber-cyan transition-colors"><Share2 size={20} /></button>
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-cyber mb-10 tracking-tighter uppercase leading-none">{product.name}</h1>
                        <div className="flex items-baseline gap-4">
                            <p className="text-4xl font-cyber text-cyber-cyan">₹{product.price}</p>
                            <span className="text-[10px] text-gray-500 font-cyber tracking-widest uppercase mb-1">Tax Included</span>
                        </div>
                    </div>

                    <div className="space-y-12 mb-16">
                        <div className="p-6 bg-white/5 border border-white/5 space-y-4">
                            <h3 className="text-[10px] uppercase tracking-[0.3em] font-cyber text-cyber-purple flex items-center gap-2">
                                <ShieldCheck size={14} /> Spec Sheet
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed font-sans">
                                {product.description}
                            </p>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-[10px] uppercase tracking-[0.4em] font-cyber">Select Module Size</h3>
                                <button className="text-[8px] uppercase tracking-widest text-cyber-cyan hover:underline">Size Guide.pdf</button>
                            </div>
                            <div className="flex gap-4">
                                {sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-14 h-14 flex items-center justify-center font-cyber text-sm transition-all duration-300 border ${selectedSize === size
                                            ? 'bg-cyber-pink text-white border-cyber-pink shadow-neon-pink'
                                            : 'border-white/10 text-gray-400 hover:border-cyber-cyan hover:text-cyber-cyan'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-8">
                            <div className="flex items-center border border-white/10 px-8 py-4 bg-white/5">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-cyber-pink hover:scale-125 transition-transform">
                                    <Minus size={20} />
                                </button>
                                <span className="mx-10 text-sm font-cyber min-w-[20px] text-center">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="text-cyber-pink hover:scale-125 transition-transform">
                                    <Plus size={20} />
                                </button>
                            </div>
                            <Button
                                onClick={() => addItem({ ...product, quantity })}
                                className="flex-1 py-5 text-sm"
                            >
                                INJECT TO CARGO.X
                            </Button>
                        </div>
                    </div>

                    <div className="border-t border-white/5 pt-12 grid grid-cols-2 gap-8">
                        <div className="flex flex-col gap-2">
                            <span className="text-[8px] uppercase tracking-[0.5em] text-gray-500 font-cyber">Material Composition</span>
                            <span className="text-white text-xs font-cyber tracking-widest">80% NEURAL COTTON // 20% SYNTH</span>
                        </div>
                        <div className="flex flex-col gap-2 text-right">
                            <span className="text-[8px] uppercase tracking-[0.5em] text-gray-500 font-cyber">Delivery Proxy</span>
                            <span className="text-white text-xs font-cyber tracking-widest uppercase flex items-center justify-end gap-2">
                                Sector 7 Express <ExternalLink size={10} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
