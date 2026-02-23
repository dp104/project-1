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

            {/* ── Hero Section ── */}
            <section className="relative flex flex-col items-center pt-24 pb-0">
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
                        <div className="inline-flex items-center gap-3 px-6 py-2 border border-pink-500/30 rounded-full bg-pink-500/5 mb-6 backdrop-blur-sm">
                            <Zap size={14} className="text-pink-500 animate-pulse" />
                            <span className="text-[10px] uppercase tracking-[0.5em] font-cyber text-pink-500 font-bold">New Collection 2026</span>
                        </div>

                        <h1 className="text-5xl md:text-8xl font-cyber mb-6 leading-[1] font-black tracking-tight mt-2">
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 drop-shadow-[0_0_15px_rgba(236,72,153,0.4)]">WEAR</span><span className="block text-white">YOUR</span><span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">FUTURE</span>
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

            {/* ── Brand Stats Bar ── */}
            <section className="py-10 border-y border-white/5 relative z-10" style={{ background: 'linear-gradient(to right, #0d0d0f, #111116, #0d0d0f)' }}>
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { value: '10,000+', label: 'Happy Customers' },
                            { value: '500+', label: 'Unique Designs' },
                            { value: '4.9★', label: 'Average Rating' },
                            { value: '48hrs', label: 'Custom Delivery' },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col gap-1"
                            >
                                <span className="text-3xl md:text-4xl font-cyber font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400">
                                    {stat.value}
                                </span>
                                <span className="text-xs text-gray-400 uppercase tracking-widest font-sans">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Featured Collection ── */}
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

            {/* ── Category Showcase ── */}
            <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto relative z-10">
                <div className="text-center mb-14">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-pink-500 font-cyber mb-3">Browse by Style</p>
                    <h2 className="text-3xl md:text-5xl font-cyber font-black text-white uppercase">
                        Shop by <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400">Category</span>
                    </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { title: 'Hoodies', tag: 'BESTSELLER', img: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?auto=format&fit=crop&q=80&w=600', link: '/shop', border: 'border-cyan-500/50', shadow: 'shadow-[0_0_15px_rgba(6,182,212,0.15)]', hoverBorder: 'hover:border-cyan-400' },
                        { title: 'T-Shirts', tag: 'NEW', img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=600', link: '/shop', border: 'border-pink-500/50', shadow: 'shadow-[0_0_15px_rgba(236,72,153,0.15)]', hoverBorder: 'hover:border-pink-400' },
                        { title: 'Custom', tag: 'YOUR DESIGN', img: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&q=80&w=600', link: '/customize', border: 'border-purple-500/50', shadow: 'shadow-[0_0_15px_rgba(168,85,247,0.15)]', hoverBorder: 'hover:border-purple-400' },
                        { title: 'Cargos', tag: 'LIMITED', img: 'https://images.unsplash.com/photo-1624378439575-d1ead6bb2d50?auto=format&fit=crop&q=80&w=600', link: '/shop', border: 'border-yellow-500/50', shadow: 'shadow-[0_0_15px_rgba(234,179,8,0.15)]', hoverBorder: 'hover:border-yellow-400' },
                    ].map((cat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            className={`relative overflow-hidden rounded-lg group cursor-pointer border ${cat.border} ${cat.shadow} ${cat.hoverBorder} transition-colors`}
                            style={{ minHeight: 260 }}
                        >
                            <Link to={cat.link} className="block w-full h-full absolute inset-0">
                                <img
                                    src={cat.img}
                                    alt={cat.title}
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-5">
                                    <span className="text-[9px] uppercase tracking-[0.4em] text-pink-500 font-cyber">{cat.tag}</span>
                                    <h3 className="text-xl font-cyber font-black text-white uppercase mt-1">{cat.title}</h3>
                                </div>
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                                        <ArrowRight size={14} className="text-white" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── Why Choose Us ── */}
            <section className="py-20 px-6 md:px-12 relative z-10" style={{ background: 'linear-gradient(to bottom, #0a0a0e, #0d0d12)' }}>
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center mb-14">
                        <p className="text-[10px] uppercase tracking-[0.4em] text-cyan-400 font-cyber mb-3">Why Us</p>
                        <h2 className="text-3xl md:text-5xl font-cyber font-black text-white uppercase">
                            Built Different.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Crafted Different.</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: '⚡', title: 'Ultra-Fast Delivery', desc: 'We ship your order within 48 hours. Custom prints completed in just 3-5 days — no waiting forever.', color: 'from-pink-500/20 to-transparent', border: 'border-pink-500/30' },
                            { icon: '🎨', title: 'Custom Printing', desc: 'Upload your own art, logo, or design. Our DTG print tech brings your vision to life with vibrant precision.', color: 'from-cyan-500/20 to-transparent', border: 'border-cyan-500/30' },
                            { icon: '🧵', title: 'Premium Fabric', desc: 'Every piece uses 280gsm combed cotton. Soft, structured, and built to last wash after wash.', color: 'from-purple-500/20 to-transparent', border: 'border-purple-500/30' },
                            { icon: '🔒', title: 'Secure Payments', desc: 'Shop with confidence. We support UPI, cards & net banking via Razorpay with end-to-end encryption.', color: 'from-pink-500/20 to-transparent', border: 'border-pink-500/30' },
                            { icon: '♻️', title: 'Eco-Conscious', desc: 'Packaging made from recycled materials. We print on demand to reduce overproduction and waste.', color: 'from-green-500/20 to-transparent', border: 'border-green-500/30' },
                            { icon: '🤝', title: 'Easy Returns', desc: '7-day hassle-free returns on all non-custom orders. Your satisfaction is our highest priority.', color: 'from-yellow-500/20 to-transparent', border: 'border-yellow-500/30' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className={`bg-[#0a0a0c] border ${item.border} rounded-xl p-7 relative overflow-hidden hover:scale-[1.02] transition-transform duration-300`}
                            >
                                <div className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${item.color} opacity-40`} />
                                <div className="text-4xl mb-4 relative z-10">{item.icon}</div>
                                <h3 className="font-cyber text-white font-bold text-lg uppercase tracking-wide mb-2 relative z-10">{item.title}</h3>
                                <p className="text-gray-400 text-sm font-sans leading-relaxed relative z-10">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Brand Manifesto Banner ── */}
            <section className="relative py-24 px-6 overflow-hidden z-10">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=2000"
                        alt="Brand Banner"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black" />
                </div>
                <div className="relative z-10 max-w-3xl mx-auto text-center">
                    <p className="text-[10px] uppercase tracking-[0.5em] text-pink-500 font-cyber mb-5">Our Philosophy</p>
                    <h2 className="text-4xl md:text-6xl font-cyber font-black text-white uppercase leading-tight mb-6">
                        Fashion Is Not<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400">Just Clothing.</span><br />
                        It's Identity.
                    </h2>
                    <p className="text-gray-400 font-sans text-base leading-relaxed max-w-xl mx-auto mb-8">
                        We design for those who refuse to blend in. Every stitch, every print, every drop is a statement —
                        crafted for rebels, creators, and dreamers who wear their future on their sleeves.
                    </p>
                    <Link to="/shop">
                        <button className="px-10 py-4 text-sm bg-transparent border border-cyan-400/60 text-cyan-400 font-cyber tracking-widest uppercase hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 flex items-center gap-3 mx-auto group">
                            EXPLORE THE DROP <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </Link>
                </div>
            </section>

            {/* ── Community Reviews ── */}
            <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto relative z-10 w-full">
                <div className="flex justify-center items-center text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-cyber mb-4 tracking-wide font-black uppercase">
                        <span className="text-white">WHAT THE </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400">COMMUNITY</span>
                        <span className="text-white"> SAYS</span>
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-[#0a0a0c] border border-cyan-500/40 rounded-lg p-8 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:border-cyan-400 transition-colors">
                        <div className="flex gap-1 mb-6">
                            {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="#ec4899" className="text-pink-500" />)}
                        </div>
                        <p className="text-gray-400 font-sans tracking-wide leading-relaxed mb-8">
                            "The quality is insane. Wore the Neon Circuit Tee to a tech event and got so many compliments. Truly futuristic fashion."
                        </p>
                        <p className="text-pink-500 font-cyber text-sm tracking-widest uppercase">- Akira M.</p>
                    </div>
                    <div className="bg-[#0a0a0c] border border-pink-500/40 rounded-lg p-8 shadow-[0_0_15px_rgba(236,72,153,0.15)] hover:border-pink-400 transition-colors">
                        <div className="flex gap-1 mb-6">
                            {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="#ec4899" className="text-pink-500" />)}
                        </div>
                        <p className="text-gray-400 font-sans tracking-wide leading-relaxed mb-8">
                            "Custom print feature is a game changer! I uploaded my own glitch art and it came out perfectly on the hoodie."
                        </p>
                        <p className="text-pink-500 font-cyber text-sm tracking-widest uppercase">- Zara K.</p>
                    </div>
                    <div className="bg-[#0a0a0c] border border-purple-500/40 rounded-lg p-8 shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:border-purple-400 transition-colors">
                        <div className="flex gap-1 mb-6">
                            {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="#ec4899" className="text-pink-500" />)}
                        </div>
                        <p className="text-gray-400 font-sans tracking-wide leading-relaxed mb-8">
                            "Best streetwear brand I've found. The cyberpunk aesthetic is authentic, not just surface-level. Amazing materials too."
                        </p>
                        <p className="text-pink-500 font-cyber text-sm tracking-widest uppercase">- Devon R.</p>
                    </div>
                </div>
            </section>

            {/* ── Newsletter CTA ── */}
            <section className="py-20 px-6 relative z-10 border-t border-white/5">
                <div className="max-w-2xl mx-auto text-center">
                    <p className="text-[10px] uppercase tracking-[0.5em] text-pink-500 font-cyber mb-4">Stay Ahead of the Drop</p>
                    <h2 className="text-3xl md:text-5xl font-cyber font-black text-white uppercase mb-4">
                        Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Collective</span>
                    </h2>
                    <p className="text-gray-400 text-sm font-sans mb-8 leading-relaxed">
                        Get early access to new drops, exclusive discounts, and behind-the-scenes looks — straight to your inbox.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="flex-1 px-5 py-4 bg-[#0a0a0c] border border-white/10 text-white text-sm font-sans focus:outline-none focus:border-pink-500/60 placeholder:text-gray-600 transition-colors"
                        />
                        <button className="px-8 py-4 bg-pink-500 text-white text-sm font-cyber tracking-widest uppercase hover:bg-pink-600 shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all duration-300 whitespace-nowrap flex items-center gap-2 justify-center group">
                            JOIN <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </section>

            {/* ── Floating WhatsApp Button ── */}
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
