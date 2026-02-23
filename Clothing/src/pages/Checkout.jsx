import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/useCartStore'
import { ShoppingBag, ChevronRight, CreditCard, Truck, ShieldCheck, Cpu, Zap, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/Button'

export function Checkout() {
    const { cartItems } = useCartStore()
    const navigate = useNavigate()
    const [step, setStep] = useState(1)

    const subtotal = cartItems.reduce((acc, item) => {
        const price = parseInt(item.price.replace(',', ''))
        return acc + price * item.quantity
    }, 0)

    const handlePayment = () => {
        // Razorpay placeholder logic
        alert("Initializing Secure Cyber-Payment Gateway...")
        navigate('/')
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen pt-48 px-6 text-center space-y-10">
                <div className="relative inline-block">
                    <ShoppingBag size={64} className="mx-auto text-gray-800" />
                    <Zap className="absolute -top-2 -right-2 text-cyber-pink animate-pulse" size={24} />
                </div>
                <h1 className="text-3xl font-cyber tracking-widest uppercase">Cargo_Bay Empty</h1>
                <p className="text-gray-500 text-sm font-sans tracking-widest uppercase mb-12">Search for Apparel Modules in Registry</p>
                <Link to="/shop">
                    <Button variant="outline" className="px-12">RETURN_TO_BASE</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="pt-40 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
                <Cpu className="text-cyber-cyan" size={16} />
                <h2 className="text-[10px] uppercase tracking-[0.5em] text-cyber-cyan font-bold">Checkout Sequence</h2>
            </div>
            <h1 className="text-5xl md:text-7xl font-cyber mb-16 tracking-tighter uppercase">INITIATE_<br className="md:hidden" /><span className="text-cyber-pink">UPLINK</span></h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                {/* Left: Forms */}
                <div className="lg:col-span-7 space-y-16">
                    {/* Progress */}
                    <div className="flex items-center gap-8 mb-20 overflow-x-auto pb-4">
                        {[
                            { n: 1, label: 'SHIPPING_HUB' },
                            { n: 2, label: 'PAYMENT_GATEWAY' },
                            { n: 3, label: 'CONFIRM_UPLINK' }
                        ].map((s) => (
                            <div key={s.n} className={`flex items-center gap-4 whitespace-nowrap ${step >= s.n ? 'text-cyber-cyan' : 'text-gray-600'}`}>
                                <span className={`w-8 h-8 rounded-none flex items-center justify-center font-cyber text-[10px] border transition-all ${step >= s.n ? 'border-cyber-cyan shadow-neon-cyan bg-cyber-cyan/10' : 'border-white/10'}`}>
                                    0{s.n}
                                </span>
                                <span className={`text-[10px] font-cyber tracking-widest uppercase transition-all ${step === s.n ? 'opacity-100' : 'opacity-40'}`}>{s.label}</span>
                                {s.n < 3 && <ChevronRight size={14} className="text-gray-800" />}
                            </div>
                        ))}
                    </div>

                    <div className="space-y-12">
                        {step === 1 && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                                <h3 className="text-lg font-cyber tracking-widest uppercase border-l-2 border-cyber-cyan pl-6">01. RECEIVER_INFO</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <input type="text" placeholder="FULL_NAME.X" className="cyber-input" />
                                    <input type="email" placeholder="CONTACT_UPLINK@MAIL" className="cyber-input" />
                                    <div className="md:col-span-2">
                                        <input type="text" placeholder="DESTINATION_ADDRESS" className="cyber-input" />
                                    </div>
                                    <input type="text" placeholder="SECTOR_CODE" className="cyber-input" />
                                    <input type="text" placeholder="CITY_GRID" className="cyber-input" />
                                </div>
                                <Button className="w-full sm:w-auto px-16 py-5 text-xs" onClick={() => setStep(2)}>
                                    VALIDATE_COORDINATES
                                </Button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                                <h3 className="text-lg font-cyber tracking-widest uppercase border-l-2 border-cyber-pink pl-6">02. TRANSFER_METHOD</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <button className="flex items-center gap-4 p-6 border border-cyber-cyan bg-cyber-cyan/5 group hover:bg-cyber-cyan/10 transition-all text-left relative overflow-hidden">
                                        <CreditCard className="text-cyber-cyan" size={24} />
                                        <div>
                                            <p className="text-[10px] font-cyber tracking-widest uppercase text-white mb-1">Razor_Vault</p>
                                            <p className="text-[8px] text-gray-500 uppercase tracking-widest">Cards // UPI // Netbanking</p>
                                        </div>
                                        <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <CreditCard size={100} />
                                        </div>
                                    </button>
                                    <button className="flex items-center gap-4 p-6 border border-white/10 bg-white/5 hover:border-gray-500 transition-all text-left opacity-50 cursor-not-allowed">
                                        <Truck className="text-gray-500" size={24} />
                                        <div>
                                            <p className="text-[10px] font-cyber tracking-widest uppercase text-gray-500 mb-1">Transfer_On_Drop</p>
                                            <p className="text-[8px] text-gray-600 uppercase tracking-widest">Currently Offline</p>
                                        </div>
                                    </button>
                                </div>
                                <div className="flex gap-4">
                                    <Button variant="outline" className="px-10 py-5" onClick={() => setStep(1)}>BACK</Button>
                                    <Button className="flex-1 py-5 text-xs" onClick={handlePayment}>AUTHORIZE_PAYMENT</Button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Right: Summary */}
                <div className="lg:col-span-5">
                    <div className="cyber-card p-10 space-y-10 sticky top-32">
                        <div className="flex items-center gap-3">
                            <span className="w-1 h-1 bg-cyber-pink rounded-full shadow-neon-pink" />
                            <h3 className="text-[10px] font-cyber tracking-[0.4em] uppercase">Uplink_Summary</h3>
                        </div>

                        <div className="space-y-8 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-6">
                                    <div className="w-20 h-24 bg-white/5 border border-white/5 flex-shrink-0">
                                        <img src={item.image} className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 transition-all" alt="" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between py-1">
                                        <div>
                                            <h4 className="text-[10px] font-cyber tracking-wider uppercase mb-1">{item.name}</h4>
                                            <p className="text-[8px] text-gray-600 uppercase tracking-widest flex items-center gap-2">
                                                Qty: {item.quantity} <span className="w-1 h-1 bg-gray-800 rounded-full" /> Size: M
                                            </p>
                                        </div>
                                        <p className="text-xs font-cyber text-cyber-cyan">₹{item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-white/5 pt-10 space-y-4">
                            <div className="flex justify-between items-center text-[10px] font-cyber tracking-widest uppercase text-gray-500">
                                <span>Registry Subtotal</span>
                                <span>₹{subtotal.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-cyber tracking-widest uppercase text-gray-500">
                                <span>Uplink Fee</span>
                                <span className="text-cyber-cyan">CRYPTO_ZERO</span>
                            </div>
                            <div className="flex justify-between items-center text-lg font-cyber border-t border-white/5 pt-8">
                                <span className="uppercase tracking-widest">Total</span>
                                <span className="text-cyber-pink neon-text-pink">₹{subtotal.toLocaleString('en-IN')}</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-[8px] font-cyber text-gray-600 tracking-[0.3em] uppercase pt-4">
                            <ShieldCheck size={12} /> Quantum Encryption Active
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
