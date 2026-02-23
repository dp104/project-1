import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag, ArrowRight, Cpu, Trash2 } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'
import { Button } from '../ui/Button'
import { Link } from 'react-router-dom'

export function CartDrawer() {
    const { cartItems, isOpen, closeCart, removeItem, updateQuantity } = useCartStore()

    const subtotal = cartItems.reduce((acc, item) => {
        const price = parseInt(item.price.replace(',', ''))
        return acc + price * item.quantity
    }, 0)

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-cyber-black/60 backdrop-blur-md z-[100]"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-cyber-dark z-[101] shadow-2xl flex flex-col border-l border-cyber-pink/20"
                    >
                        {/* Header */}
                        <div className="p-8 flex justify-between items-center border-b border-white/5 bg-cyber-black">
                            <div className="flex items-center gap-3">
                                <Cpu className="text-cyber-pink" size={18} />
                                <h2 className="text-[10px] font-cyber uppercase tracking-[0.3em]">Cargo_Registry ({cartItems.length})</h2>
                            </div>
                            <button onClick={closeCart} className="text-gray-500 hover:text-cyber-pink transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-8 cyber-grid opacity-90">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                                    <div className="w-20 h-20 bg-white/5 flex items-center justify-center rounded-full border border-dashed border-white/10">
                                        <ShoppingBag size={32} strokeWidth={1} className="text-gray-600" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-cyber text-gray-500 tracking-[0.5em] uppercase text-center">Empty_Database</p>
                                        <p className="text-xs text-gray-600 font-sans">No apparel modules detected in cargo.</p>
                                    </div>
                                    <Button onClick={closeCart} variant="outline" color="cyan" className="px-12">Search Registry</Button>
                                </div>
                            ) : (
                                cartItems.map((item) => (
                                    <motion.div
                                        layout
                                        key={item.id}
                                        className="flex space-x-6 group"
                                    >
                                        <div className="w-24 aspect-[3/4] bg-cyber-grey/20 flex-shrink-0 border border-white/5 relative overflow-hidden">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            {item.custom && (
                                                <div className="absolute inset-0 bg-cyber-pink/20 flex items-center justify-center">
                                                    <span className="text-[6px] font-cyber text-white bg-cyber-pink px-1">CUSTOMIZED</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-[10px] uppercase tracking-wider font-cyber group-hover:text-cyber-pink transition-colors">{item.name}</h3>
                                                    <button onClick={() => removeItem(item.id)} className="text-gray-600 hover:text-cyber-pink transition-colors p-1">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                                <p className="text-[8px] text-gray-500 uppercase tracking-widest font-sans flex items-center gap-2">
                                                    <span className="w-1 h-1 bg-cyber-cyan rounded-full" /> {item.category}
                                                </p>
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <div className="flex items-center border border-white/10 px-3 py-1 bg-black/40">
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 text-cyber-cyan hover:scale-125 transition-transform">
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="mx-4 text-xs font-cyber text-white min-w-[15px] text-center">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 text-cyber-cyan hover:scale-125 transition-transform">
                                                        <Plus size={12} />
                                                    </button>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] font-cyber text-cyber-cyan shadow-neon-cyan/20">₹{item.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="p-8 bg-cyber-black border-t border-white/5 space-y-8">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-[10px] font-cyber uppercase tracking-[0.2em]">
                                        <span className="text-gray-500">Registry Subtotal</span>
                                        <span className="text-white">₹{subtotal.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] font-cyber uppercase tracking-[0.2em]">
                                        <span className="text-gray-500">Uplink Fee</span>
                                        <span className="text-cyber-cyan font-bold">CRYPTO_ZERO</span>
                                    </div>
                                </div>

                                <Link to="/checkout" onClick={closeCart}>
                                    <Button className="w-full flex justify-between items-center px-10 py-5">
                                        <span className="text-xs">INITIATE_UPLINK</span>
                                        <ArrowRight size={18} />
                                    </Button>
                                </Link>

                                <p className="text-[8px] text-gray-600 tracking-[0.4em] uppercase text-center font-cyber">Secure Node Connection Active // 256-bit Encrypted</p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
