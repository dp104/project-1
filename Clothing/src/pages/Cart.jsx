import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { ShoppingBag, X, Plus, Minus, ArrowRight, ShieldCheck, Trash2 } from 'lucide-react';

export function Cart() {
    const { cartItems, removeItem, updateQuantity } = useCartStore();

    const subtotal = cartItems.reduce((acc, item) => {
        const price = parseInt(item.price.replace(/,/g, ''));
        return acc + price * item.quantity;
    }, 0);

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-[#050505] pt-40 pb-32 px-6 md:px-12 flex flex-col items-center font-sans">
                <ShoppingBag size={64} className="text-gray-600 mb-8" strokeWidth={1} />
                <h1 className="text-4xl tracking-widest uppercase text-white mb-4">Your Bag is Empty</h1>
                <p className="text-gray-400 text-center max-w-md mb-8">
                    Looks like you haven't added anything yet. Discover our latest arrivals.
                </p>
                <Link to="/shop">
                    <button className="bg-white text-black py-4 px-8 uppercase tracking-[0.2em] text-sm font-bold hover:bg-gray-200 transition-colors flex items-center gap-2">
                        Continue Shopping <ArrowRight size={16} />
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] pt-32 pb-32 px-6 md:px-12 text-white font-sans">
            <div className="max-w-[1200px] mx-auto relative z-10">
                <div className="mb-16 border-b border-white/10 pb-8">
                    <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-2">
                        Your Bag
                    </h1>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <span>{cartItems.length} items</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><ShieldCheck size={14} /> Secure Checkout</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    {/* Cart Items List */}
                    <div className="lg:col-span-8 space-y-4">
                        <div className="hidden md:grid grid-cols-12 gap-6 pb-4 border-b border-white/5 text-xs text-gray-500 uppercase tracking-widest">
                            <div className="col-span-6">Product</div>
                            <div className="col-span-3 text-center">Quantity</div>
                            <div className="col-span-2 text-right">Price</div>
                            <div className="col-span-1"></div>
                        </div>

                        <AnimatePresence>
                            {cartItems.map((item) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    key={item.cartItemId}
                                    className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 group hover:border-white/20 transition-all"
                                >
                                    {/* Mobile Only: Product Name & Delete */}
                                    <div className="md:hidden flex justify-between items-start w-full mb-2">
                                        <h3 className="text-sm tracking-widest text-white uppercase">{item.name}</h3>
                                        <button onClick={() => removeItem(item.cartItemId)} className="text-gray-500 hover:text-white transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                    {/* Product Details Column */}
                                    <div className="col-span-6 flex items-center gap-6">
                                        <div className="w-24 md:w-28 aspect-[4/5] bg-black border border-white/10 relative overflow-hidden flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity group-hover:scale-105 duration-500" />
                                            {item.custom && (
                                                <div className="absolute top-2 left-2 bg-white text-black text-[10px] font-bold px-2 py-1 tracking-widest uppercase">
                                                    Custom
                                                </div>
                                            )}
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="flex gap-3 text-xs text-gray-500 uppercase tracking-widest mb-2">
                                                <span>{item.category.split('|')[0]}</span>
                                                <span className="text-white">Size: {item.size}</span>
                                            </div>
                                            <h3 className="text-lg tracking-widest text-white uppercase">{item.name}</h3>
                                            {item.custom && <p className="text-xs text-gray-400 mt-2 line-clamp-2">"{item.custom.text}"</p>}
                                        </div>
                                    </div>

                                    {/* Mobile Only details */}
                                    <div className="md:hidden w-full flex justify-between items-center mb-4">
                                        <div className="text-xs text-gray-400 uppercase tracking-widest">
                                            Size: <span className="text-white">{item.size}</span>
                                        </div>
                                        <div className="text-lg text-white">₹{item.price}</div>
                                    </div>

                                    {/* Quantity Column */}
                                    <div className="col-span-3 flex justify-start md:justify-center items-center">
                                        <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-2 rounded-full px-4">
                                            <button
                                                onClick={() => updateQuantity(item.cartItemId, Math.max(1, item.quantity - 1))}
                                                className="text-gray-400 hover:text-white transition-colors"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-4 text-center text-sm font-medium text-white">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                                                className="text-gray-400 hover:text-white transition-colors"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Price Column */}
                                    <div className="col-span-2 hidden md:block text-right">
                                        <span className="text-lg text-white">₹{(parseInt(item.price.replace(/,/g, '')) * item.quantity).toLocaleString('en-IN')}</span>
                                    </div>

                                    {/* Remove Column */}
                                    <div className="col-span-1 hidden md:flex justify-end">
                                        <button
                                            onClick={() => removeItem(item.cartItemId)}
                                            className="text-gray-500 hover:text-white transition-colors"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-4 w-full">
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 sticky top-32">
                            <h3 className="text-lg tracking-widest uppercase text-white mb-8 border-b border-white/10 pb-4">
                                Order Summary
                            </h3>

                            <div className="space-y-6 text-sm tracking-wide">
                                <div className="flex justify-between items-center text-gray-400">
                                    <span>Subtotal</span>
                                    <span className="text-white">₹{subtotal.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-400">
                                    <span>Shipping</span>
                                    <span className="text-white">Free</span>
                                </div>

                                <div className="pt-6 mt-6 border-t border-white/10">
                                    <div className="flex justify-between items-end mb-8">
                                        <span className="text-base text-gray-300 uppercase tracking-widest">Total</span>
                                        <span className="text-3xl tracking-tight text-white">
                                            ₹{subtotal.toLocaleString('en-IN')}
                                        </span>
                                    </div>

                                    <Link to="/checkout" className="block w-full">
                                        <button className="w-full py-5 bg-white text-black hover:bg-gray-200 text-sm font-bold uppercase tracking-[0.2em] transition-colors flex justify-center items-center gap-2 group">
                                            <span>Checkout</span>
                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </Link>

                                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-6 tracking-wide">
                                        <ShieldCheck size={14} /> Secure Encrypted Payment
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
