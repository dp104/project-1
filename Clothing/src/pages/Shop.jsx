import React, { useState, useMemo } from 'react'
import { ProductCard } from '../components/shop/ProductCard'
import { Search, ChevronDown, Filter, Zap, Cpu, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const ALL_PRODUCTS = [
    { id: 1, name: "NEON GLITCH HOODIE", price: "4,999", category: "HOODIE | V2.0", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800" },
    { id: 2, name: "CYBER-STRIKE TEE", price: "2,499", category: "T-SHIRT | SYSTEM", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800" },
    { id: 3, name: "VIRTUAL OVERLAY JACKET", price: "9,299", category: "OUTERWEAR | CORE", image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=800" },
    { id: 4, name: "NIGHT-CITY CARGOS", price: "6,499", category: "PANTS | ALPHA", image: "https://images.unsplash.com/photo-1584865288642-42078afe6942?auto=format&fit=crop&q=80&w=800" },
    { id: 5, name: "DATA-STREAM BOMBER", price: "12,999", category: "OUTERWEAR | PREMIUM", image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800" },
    { id: 6, name: "NEURAL NETWORK KNIT", price: "5,499", category: "KNITWEAR | NEW", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800" },
    { id: 7, name: "GRID-RUNNER SHIRT", price: "7,999", category: "SHIRT | LUXURY", image: "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?auto=format&fit=crop&q=80&w=800" },
    { id: 8, name: "SYNTHETIC SHELL JACKET", price: "6,999", category: "OUTERWEAR | ICONIC", image: "https://images.unsplash.com/photo-1520975954732-57ddb7d40cb6?auto=format&fit=crop&q=80&w=800" },
    { id: 9, name: "HOLOGRAPHIC TEE", price: "2,999", category: "T-SHIRT | CORE", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800" },
    { id: 10, name: "CUSTOM NEON PRINT", price: "3,499", category: "CUSTOM | ALPHA", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800" },
    { id: 11, name: "SYNTHWEAVE SHIRT", price: "3,899", category: "SHIRT | SYSTEM", image: "https://images.unsplash.com/photo-1603252109303-2751441dd15e?auto=format&fit=crop&q=80&w=800" },
    { id: 12, name: "LUMINOUS JOGGERS", price: "4,499", category: "PANTS | SYSTEM", image: "https://images.unsplash.com/photo-1624378439575-d1ead6bb2d50?auto=format&fit=crop&q=80&w=800" }
]

const CATEGORIES = ["ALL", "SHIRTS", "HOODIES", "PANTS", "T-SHIRTS", "OUTERWEAR", "KNITWEAR", "CUSTOM"]

export function Shop() {
    const [selectedCategory, setSelectedCategory] = useState("ALL")
    const [searchQuery, setSearchQuery] = useState("")
    const [sortOrder, setSortOrder] = useState("newest")
    const [isSortOpen, setIsSortOpen] = useState(false)

    const sortOptions = [
        { id: 'newest', label: 'NEWEST' },
        { id: 'price-low', label: 'LOW PRICE' },
        { id: 'price-high', label: 'HIGH PRICE' },
    ]

    const filteredProducts = useMemo(() => {
        return ALL_PRODUCTS
            .filter(p => {
                if (selectedCategory === "ALL") return true;
                const cat = p.category.split(' | ')[0];
                return cat.includes(selectedCategory.replace(/S$/, '')) || selectedCategory.includes(cat.replace(/S$/, ''));
            })
            .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .sort((a, b) => {
                const priceA = parseInt(a.price.replace(/,/g, ''))
                const priceB = parseInt(b.price.replace(/,/g, ''))
                if (sortOrder === "price-low") return priceA - priceB
                if (sortOrder === "price-high") return priceB - priceA
                return 0
            })
    }, [selectedCategory, searchQuery, sortOrder])

    return (
        <div className="pt-32 pb-24 px-6 md:px-8 max-w-[1400px] mx-auto min-h-screen relative overflow-hidden bg-black text-white">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[150px] -z-10" />

            {/* Page Header */}
            <div className="mb-12 flex flex-col items-center text-center px-4">
                <div className="flex items-center gap-2 mb-4">
                    <Zap className="text-cyan-400" size={16} />
                    <h2 className="text-[10px] uppercase tracking-[0.5em] text-cyan-400 font-bold">Latest Drops</h2>
                </div>
                <h1 className="text-4xl md:text-6xl font-cyber mb-6 tracking-wide font-black uppercase">
                    <span className="text-white">THE </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400">COLLECTION</span>
                </h1>
                <p className="text-gray-400 text-sm tracking-widest max-w-xl mx-auto font-sans leading-relaxed">
                    Discover piece-unique luxury streetwear crafted for the modern individual. Curated essentials designed to elevate your everyday syntax.
                </p>
            </div>

            {/* Filters & Tools */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 mb-16 border-b border-white/10 pb-6 sticky top-20 z-30 bg-black/80 backdrop-blur-xl px-4 py-4 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <div className="flex flex-wrap gap-4 md:gap-8 w-full xl:w-auto">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`text-[11px] uppercase tracking-widest font-cyber transition-all relative pb-2 whitespace-nowrap ${selectedCategory === cat ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                                }`}
                        >
                            {cat}
                            {selectedCategory === cat && (
                                <motion.div layoutId="activeCat" className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto shrink-0">
                    <div className="relative w-full sm:w-64 group bg-white/5 rounded-full px-4 py-2 border border-white/10 focus-within:border-cyan-500/50 transition-colors">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-cyan-400 transition-colors" size={14} />
                        <input
                            type="text"
                            placeholder="SEARCH..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-transparent border-none pl-6 outline-none text-[10px] uppercase tracking-widest font-cyber text-white placeholder-gray-600"
                        />
                    </div>

                    {/* Custom Sort Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsSortOpen(!isSortOpen)}
                            className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-gray-400 font-sans bg-[#111111] rounded-full px-4 py-3 border border-white/10 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors"
                        >
                            <span>Sort:</span>
                            <span className="text-white font-bold w-[80px] text-left">
                                {sortOptions.find(opt => opt.id === sortOrder)?.label}
                            </span>
                            <ChevronDown
                                size={14}
                                className={`transition-transform duration-300 ${isSortOpen ? 'rotate-180 text-cyan-400' : 'text-gray-400'}`}
                            />
                        </button>

                        <AnimatePresence>
                            {isSortOpen && (
                                <>
                                    {/* Invisible backdrop to detect outside clicks */}
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setIsSortOpen(false)}
                                    />

                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 top-full mt-2 w-full min-w-[160px] bg-[#111111] border border-white/10 rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-50 py-2"
                                    >
                                        {sortOptions.map((option) => (
                                            <button
                                                key={option.id}
                                                onClick={() => {
                                                    setSortOrder(option.id);
                                                    setIsSortOpen(false);
                                                }}
                                                className={`w-full text-left px-5 py-2.5 text-[10px] uppercase tracking-widest font-sans font-bold transition-colors ${sortOrder === option.id
                                                    ? 'text-cyan-400 bg-white/5'
                                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                                    }`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-12 pb-12">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="py-32 text-center rounded-2xl border border-white/5 bg-white/5 space-y-6 mx-4">
                    <Sparkles size={48} className="mx-auto text-cyan-500/20" />
                    <p className="text-gray-400 tracking-[0.2em] uppercase text-sm font-sans">No items matched your search.</p>
                    <button
                        onClick={() => { setSelectedCategory("ALL"); setSearchQuery("") }}
                        className="text-white text-xs uppercase tracking-widest font-cyber hover:text-cyan-400 transition-colors border-b border-cyan-400/30 pb-1"
                    >
                        Reset Filters
                    </button>
                </div>
            )}
        </div>
    )
}
