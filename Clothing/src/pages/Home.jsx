import React from 'react'
import { motion } from 'framer-motion'
import { ProductCard } from '../components/shop/ProductCard'
import { FeaturedCarousel } from '../components/shop/FeaturedCarousel'
import { Button } from '../components/ui/Button'
import { Link } from 'react-router-dom'
import { Zap, Cpu, Sparkles, ArrowRight, MessageCircle, Star } from 'lucide-react'

const featuredProducts = [
    { id: 1, name: "NEON GLITCH HOODIE", price: "4,999", category: "HOODIE | V2.0", image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&q=80&w=800" },
    { id: 2, name: "CYBER-STRIKE TEE", price: "2,499", category: "T-SHIRT | SYSTEM", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800" },
    { id: 3, name: "HOLOGRAPHIC TEE", price: "2,999", category: "T-SHIRT | CORE", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800" },
    { id: 4, name: "CUSTOM NEON PRINT", price: "3,499", category: "CUSTOM | ALPHA", image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&q=80&w=800" },
    { id: 5, name: "SYNTHWEAVE SHIRT", price: "3,899", category: "SHIRT | SYSTEM", image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=800" },
    { id: 6, name: "NIGHT-CITY CARGOS", price: "5,499", category: "PANTS | SYSTEM", image: "https://images.unsplash.com/photo-1624378439575-d1ead6bb2d50?auto=format&fit=crop&q=80&w=800" }
]

export function Home() {
    return (
        <div className="overflow-hidden bg-black min-h-screen">
            {/* Hero Section */}
            <section className="relative flex flex-col items-center pt-24 pb-0">
                {/* Background Image with Dark Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1627163439134-7a8c47ee8020?auto=format&fit=crop&q=100&w=2000"
                        alt="Cyberpunk Background"
                        className="w-full h-full object-cover opacity-60 grayscale-[0.5]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pb-0">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* New Collection Badge */}
                        <div className="inline-flex items-center gap-3 px-6 py-2 border border-pink-500/30 rounded-full bg-pink-500/5 mb-6 backdrop-blur-sm">
                            <Zap size={14} className="text-pink-500 animate-pulse" />
                            <span className="text-[10px] uppercase tracking-[0.5em] font-cyber text-pink-500 font-bold">New Collection 2026</span>
                        </div>

                        <h1 className="text-5xl md:text-8xl font-cyber mb-6 leading-[1] font-black tracking-tight mt-2">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 drop-shadow-[0_0_15px_rgba(236,72,153,0.4)]">WEAR</span><br />
                            <span className="text-white">YOUR</span><br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">FUTURE</span>
                        </h1>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pb-0 mt-10">
                            <Link to="/shop">
                                <button className="min-w-[240px] py-4 text-sm bg-pink-500 text-white font-cyber tracking-widest uppercase hover:bg-pink-600 hover:scale-105 shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all duration-300 flex items-center justify-center gap-3 group">
                                    SHOP NOW <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                                </button>
                            </Link>
                            <Link to="/customize">
                                <button className="min-w-[240px] py-4 text-sm border border-pink-500/50 text-pink-500 font-cyber tracking-widest uppercase hover:bg-pink-500/10 hover:border-pink-500 transition-all duration-300 flex items-center justify-center gap-3 group">
                                    CUSTOMIZE NOW <Zap size={18} className="group-hover:rotate-12 transition-transform" />
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Collection Section */}
            <section className="py-24 relative z-10 w-full overflow-hidden" style={{ background: 'linear-gradient(to bottom, #0B0B0F, #111111)' }}>
                <div className="flex flex-col justify-center items-center text-center mb-6 md:mb-12 relative z-20 px-4">
                    <h3 className="text-3xl md:text-5xl font-sans mb-3 tracking-wide font-light text-white">
                        Featured Collections
                    </h3>
                    <p className="text-sm text-gray-400 font-sans tracking-wide max-w-md mx-auto">
                        Discover piece-unique luxury streetwear crafted for the modern individual.
                    </p>
                </div>

                <FeaturedCarousel products={featuredProducts} />
            </section>

            {/* Community Reviews Section */}
            <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto relative z-10 w-full">
                <div className="flex justify-center items-center text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-cyber mb-4 tracking-wide font-black uppercase">
                        <span className="text-white">WHAT THE </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400">COMMUNITY</span>
                        <span className="text-white"> SAYS</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Review 1 */}
                    <div className="bg-[#0a0a0c] border border-cyan-500/40 rounded-lg p-8 shadow-[0_0_15px_rgba(6,182,212,0.15)] relative group hover:border-cyan-400 transition-colors">
                        <div className="flex gap-1 mb-6">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} size={16} fill="#ec4899" className="text-pink-500" />
                            ))}
                        </div>
                        <p className="text-gray-400 font-sans tracking-wide leading-relaxed mb-8">
                            "The quality is insane. Wore the Neon Circuit Tee to a tech event and got so many compliments. Truly futuristic fashion."
                        </p>
                        <p className="text-pink-500 font-cyber text-sm tracking-widest uppercase">
                            - Akira M.
                        </p>
                    </div>

                    {/* Review 2 */}
                    <div className="bg-[#0a0a0c] border border-pink-500/40 rounded-lg p-8 shadow-[0_0_15px_rgba(236,72,153,0.15)] hover:border-pink-400 transition-colors group">
                        <div className="flex gap-1 mb-6">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} size={16} fill="#ec4899" className="text-pink-500" />
                            ))}
                        </div>
                        <p className="text-gray-400 font-sans tracking-wide leading-relaxed mb-8">
                            "Custom print feature is a game changer! I uploaded my own glitch art and it came out perfectly on the hoodie."
                        </p>
                        <p className="text-pink-500 font-cyber text-sm tracking-widest uppercase">
                            - Zara K.
                        </p>
                    </div>

                    {/* Review 3 */}
                    <div className="bg-[#0a0a0c] border border-purple-500/40 rounded-lg p-8 shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:border-purple-400 transition-colors group">
                        <div className="flex gap-1 mb-6">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} size={16} fill="#ec4899" className="text-pink-500" />
                            ))}
                        </div>
                        <p className="text-gray-400 font-sans tracking-wide leading-relaxed mb-8">
                            "Best streetwear brand I've found. The cyberpunk aesthetic is authentic, not just surface-level. Amazing materials too."
                        </p>
                        <p className="text-pink-500 font-cyber text-sm tracking-widest uppercase">
                            - Devon R.
                        </p>
                    </div>
                </div>
            </section>

            {/* Floating Action Button */}
            <div className="fixed bottom-8 right-8 z-[60]">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl text-white hover:shadow-[#25D366]/40 transition-shadow"
                >
                    <MessageCircle size={32} />
                </motion.button>
            </div>
        </div>
    )
}
