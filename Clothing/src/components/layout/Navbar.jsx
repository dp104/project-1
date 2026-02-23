import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '../../store/useCartStore'
import brandLogo from '../../assets/logo.jpeg'

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { cartItems, openCart } = useCartStore()

    const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const location = useLocation()

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-xl py-4 border-b border-white/5' : 'bg-transparent py-4'
            }`}>
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-3 items-center text-white">
                {/* Logo - Left Part */}
                <div className="flex justify-start">
                    <Link to="/" className="group flex items-center">
                        <img src={brandLogo} alt="Vybe Threads" className="h-10 md:h-14 w-auto object-contain mix-blend-screen" />
                    </Link>
                </div>

                {/* Nav Links - Exact Center */}
                <div className="hidden md:flex justify-center space-x-10 text-[11px] uppercase tracking-[0.4em] font-cyber font-medium">
                    <Link
                        to="/"
                        className={`transition-colors ${location.pathname === '/' ? 'text-pink-500' : 'hover:text-pink-500'}`}
                    >
                        HOME
                    </Link>
                    <Link
                        to="/shop"
                        className={`transition-colors ${location.pathname === '/shop' ? 'text-cyan-400' : 'hover:text-cyan-400'}`}
                    >
                        SHOP
                    </Link>
                    <Link
                        to="/customize"
                        className={`transition-colors ${location.pathname === '/customize' ? 'text-pink-500' : 'hover:text-pink-500'}`}
                    >
                        CUSTOMIZE
                    </Link>
                </div>

                {/* Actions - Right Part */}
                <div className="flex justify-end items-center gap-6">
                    <button onClick={openCart} className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 transition-all group relative">
                        <ShoppingBag size={20} strokeWidth={1.5} className="group-hover:text-pink-500 transition-all" />
                        {cartItemCount > 0 && (
                            <div className="absolute -top-1 -right-1 bg-pink-500 text-white text-[8px] w-4 h-4 flex items-center justify-center font-bold">
                                {cartItemCount}
                            </div>
                        )}
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(true)}>
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        className="fixed inset-0 bg-black z-[100] flex flex-col p-8"
                    >
                        <div className="flex justify-between items-center mb-20">
                            <div className="flex items-center gap-2">
                                <img src={brandLogo} alt="Vybe Threads" className="h-10 w-auto object-contain mix-blend-screen" />
                            </div>
                            <button className="text-pink-500" onClick={() => setIsMobileMenuOpen(false)}>
                                <X size={32} />
                            </button>
                        </div>
                        <div className="flex flex-col space-y-10 text-3xl font-cyber">
                            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>HOME</Link>
                            <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>SHOP</Link>
                            <Link to="/customize" onClick={() => setIsMobileMenuOpen(false)}>CUSTOMIZE</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
