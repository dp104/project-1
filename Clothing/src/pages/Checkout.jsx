import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, CreditCard, Wallet, HelpCircle, AlertCircle } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export function Checkout() {
    const { cartItems } = useCartStore();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        phone: ''
    });

    const subtotal = cartItems.reduce((acc, item) => {
        const price = parseInt(item.price.replace(/,/g, ''));
        return acc + price * item.quantity;
    }, 0);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (
        <div className="min-h-screen bg-[#050505] pt-40 pb-32 px-6 md:px-12 font-sans text-white">
            <div className="max-w-[1200px] mx-auto">
                <div className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-2">Checkout</h1>
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                        <button
                            onClick={() => setStep(1)}
                            className={`transition-colors hover:text-white ${step >= 1 ? "text-white" : ""}`}
                        >
                            Information
                        </button>
                        <ChevronRight size={14} />
                        <button
                            onClick={() => step >= 2 && setStep(2)}
                            className={`transition-colors ${step >= 2 ? "text-white hover:text-gray-300" : "cursor-not-allowed opacity-50"}`}
                            disabled={step < 2}
                        >
                            Shipping
                        </button>
                        <ChevronRight size={14} />
                        <button
                            onClick={() => step >= 3 && setStep(3)}
                            className={`transition-colors ${step >= 3 ? "text-white hover:text-gray-300" : "cursor-not-allowed opacity-50"}`}
                            disabled={step < 3}
                        >
                            Payment
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left Column: Forms */}
                    <div className="lg:col-span-7">
                        <div className="bg-[#0a0a0f] border border-indigo-500/20 rounded-[2rem] p-6 md:p-10 shadow-[0_0_30px_rgba(79,70,229,0.15)] relative overflow-hidden group">
                            {/* Subtle glow effect behind forms */}
                            <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors duration-500 pointer-events-none" />
                            <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl group-hover:bg-pink-500/20 transition-colors duration-500 pointer-events-none" />
                            <div className="absolute inset-0 border-[2px] border-transparent bg-gradient-to-br from-indigo-500/20 via-purple-500/0 to-pink-500/20 rounded-[2rem] [mask-image:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] pointer-events-none opacity-50" />

                            <div className="relative z-10">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={step}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        {step === 1 && (
                                            <>
                                                <div>
                                                    <h2 className="text-xl tracking-wide mb-6">Contact Information</h2>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        placeholder="Email Address"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:border-indigo-500/50 focus:bg-white/5 focus:outline-none transition-all placeholder:text-gray-500 focus:shadow-[0_0_15px_rgba(79,70,229,0.1)]"
                                                    />
                                                </div>

                                                <div>
                                                    <h2 className="text-xl tracking-wide mb-6">Shipping Address</h2>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                        <input
                                                            type="text"
                                                            name="firstName"
                                                            placeholder="First Name"
                                                            value={formData.firstName}
                                                            onChange={handleInputChange}
                                                            className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:border-indigo-500/50 focus:bg-white/5 focus:outline-none transition-all placeholder:text-gray-500 focus:shadow-[0_0_15px_rgba(79,70,229,0.1)]"
                                                        />
                                                        <input
                                                            type="text"
                                                            name="lastName"
                                                            placeholder="Last Name"
                                                            value={formData.lastName}
                                                            onChange={handleInputChange}
                                                            className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:border-indigo-500/50 focus:bg-white/5 focus:outline-none transition-all placeholder:text-gray-500 focus:shadow-[0_0_15px_rgba(79,70,229,0.1)]"
                                                        />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        name="address"
                                                        placeholder="Address"
                                                        value={formData.address}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-black/50 border border-white/10 p-4 rounded-xl mb-4 text-white focus:border-indigo-500/50 focus:bg-white/5 focus:outline-none transition-all placeholder:text-gray-500 focus:shadow-[0_0_15px_rgba(79,70,229,0.1)]"
                                                    />
                                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                                                        <input
                                                            type="text"
                                                            name="city"
                                                            placeholder="City"
                                                            value={formData.city}
                                                            onChange={handleInputChange}
                                                            className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:border-indigo-500/50 focus:bg-white/5 focus:outline-none transition-all placeholder:text-gray-500 focus:shadow-[0_0_15px_rgba(79,70,229,0.1)]"
                                                        />
                                                        <input
                                                            type="text"
                                                            name="state"
                                                            placeholder="State"
                                                            value={formData.state}
                                                            onChange={handleInputChange}
                                                            className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:border-indigo-500/50 focus:bg-white/5 focus:outline-none transition-all placeholder:text-gray-500 focus:shadow-[0_0_15px_rgba(79,70,229,0.1)]"
                                                        />
                                                        <input
                                                            type="text"
                                                            name="pincode"
                                                            placeholder="PIN Code"
                                                            value={formData.pincode}
                                                            onChange={handleInputChange}
                                                            className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:border-indigo-500/50 focus:bg-white/5 focus:outline-none transition-all placeholder:text-gray-500 focus:shadow-[0_0_15px_rgba(79,70,229,0.1)]"
                                                        />
                                                    </div>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        placeholder="Phone Number"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:border-indigo-500/50 focus:bg-white/5 focus:outline-none transition-all placeholder:text-gray-500 focus:shadow-[0_0_15px_rgba(79,70,229,0.1)]"
                                                    />
                                                </div>

                                                <button
                                                    onClick={nextStep}
                                                    className="w-full py-4 bg-white text-black font-semibold hover:bg-gray-200 transition-colors rounded-full uppercase tracking-widest text-sm mt-8 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                                                >
                                                    Continue to Shipping
                                                </button>
                                            </>
                                        )}

                                        {step === 2 && (
                                            <>
                                                <div className="bg-black/30 border border-white/10 p-6 rounded-2xl text-sm text-gray-300 space-y-4">
                                                    <div className="flex justify-between pb-4 border-b border-white/10">
                                                        <span className="text-gray-500">Contact</span>
                                                        <span className="text-white">{formData.email || 'N/A'}</span>
                                                        <button onClick={prevStep} className="text-xs uppercase hover:text-indigo-400 transition-colors">Edit</button>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">Ship to</span>
                                                        <span className="text-white text-right max-w-[200px] truncate">{formData.address || 'N/A'}</span>
                                                        <button onClick={prevStep} className="text-xs uppercase hover:text-indigo-400 transition-colors">Edit</button>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h2 className="text-xl tracking-wide mb-6 mt-12">Shipping Method</h2>
                                                    <label className="flex items-center justify-between p-6 rounded-2xl border border-indigo-500/50 bg-indigo-500/5 cursor-pointer shadow-[0_0_15px_rgba(79,70,229,0.1)]">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-4 h-4 rounded-full border-[5px] border-indigo-500 bg-white"></div>
                                                            <span>Standard Shipping</span>
                                                        </div>
                                                        <span className="font-bold text-indigo-400">Free</span>
                                                    </label>
                                                </div>

                                                <div className="flex flex-col-reverse sm:flex-row gap-4 mt-8">
                                                    <button
                                                        onClick={prevStep}
                                                        className="flex-1 py-4 border border-white/20 text-white hover:bg-white/5 rounded-full uppercase tracking-widest text-xs font-bold transition-colors"
                                                    >
                                                        Return to Info
                                                    </button>
                                                    <button
                                                        onClick={nextStep}
                                                        className="flex-[2] py-4 bg-white text-black hover:bg-gray-200 rounded-full uppercase tracking-widest text-sm font-bold transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                                                    >
                                                        Continue to Payment
                                                    </button>
                                                </div>
                                            </>
                                        )}

                                        {step === 3 && (
                                            <>
                                                <div className="bg-black/30 border border-white/10 p-6 rounded-2xl text-sm text-gray-300 space-y-4">
                                                    <div className="flex justify-between pb-4 border-b border-white/10">
                                                        <span className="text-gray-500">Contact</span>
                                                        <span className="text-white">{formData.email || 'N/A'}</span>
                                                    </div>
                                                    <div className="flex justify-between pb-4 border-b border-white/10">
                                                        <span className="text-gray-500">Ship to</span>
                                                        <span className="text-white text-right max-w-[200px] truncate">{formData.address || 'N/A'}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">Method</span>
                                                        <span className="text-white">Standard Shipping - Free</span>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h2 className="text-xl tracking-wide mb-2 mt-12">Payment</h2>
                                                    <p className="text-gray-500 text-sm mb-6 flex items-center gap-2">
                                                        <ShieldCheck size={14} className="text-indigo-400" /> All transactions are secure and encrypted.
                                                    </p>

                                                    <div className="space-y-4">
                                                        <label className="flex items-center justify-between p-6 rounded-t-2xl border border-indigo-500/50 bg-indigo-500/5 cursor-pointer shadow-[0_0_15px_rgba(79,70,229,0.1)]">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-4 h-4 rounded-full border-[5px] border-indigo-500 bg-white"></div>
                                                                <span className="flex items-center gap-2"><CreditCard size={18} className="text-indigo-400" /> Credit Card</span>
                                                            </div>
                                                        </label>

                                                        {/* Expanded Card Form */}
                                                        <div className="p-6 bg-black/40 border border-t-0 border-indigo-500/20 rounded-b-2xl -mt-4 space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                                                            <input
                                                                type="text"
                                                                placeholder="Card number"
                                                                className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:border-indigo-500/50 focus:bg-white/5 focus:outline-none transition-all placeholder:text-gray-500"
                                                            />
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Expiration date (MM / YY)"
                                                                    className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:border-indigo-500/50 focus:bg-white/5 focus:outline-none transition-all placeholder:text-gray-500"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    placeholder="Security code"
                                                                    className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:border-indigo-500/50 focus:bg-white/5 focus:outline-none transition-all placeholder:text-gray-500"
                                                                />
                                                            </div>
                                                            <input
                                                                type="text"
                                                                placeholder="Name on card"
                                                                className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:border-indigo-500/50 focus:bg-white/5 focus:outline-none transition-all placeholder:text-gray-500"
                                                            />
                                                        </div>

                                                        <label className="flex items-center justify-between p-6 rounded-2xl border border-white/10 bg-white/5 cursor-pointer opacity-50 hover:opacity-100 transition-opacity mt-4">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-4 h-4 rounded-full border border-gray-500"></div>
                                                                <span className="flex items-center gap-2"><Wallet size={18} /> UPI / Netbanking</span>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col-reverse sm:flex-row gap-4 mt-8">
                                                    <button
                                                        onClick={prevStep}
                                                        className="flex-1 py-4 border border-white/20 text-white hover:bg-white/5 rounded-full uppercase tracking-widest text-xs font-bold transition-colors"
                                                    >
                                                        Return to Shipping
                                                    </button>
                                                    <button
                                                        className="flex-[2] py-4 bg-white text-black hover:bg-gray-200 rounded-full uppercase tracking-widest text-sm font-bold transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                                                    >
                                                        Pay Now
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-5">
                        <div className="bg-[#0a0a0f] border border-indigo-500/20 rounded-[2rem] p-8 pb-6 shadow-[0_0_30px_rgba(79,70,229,0.15)] sticky top-32 overflow-hidden group">
                            {/* Subtle glow effect behind summary */}
                            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/30 transition-colors duration-500 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl group-hover:bg-pink-500/30 transition-colors duration-500 pointer-events-none" />
                            <div className="absolute inset-0 border-[2px] border-transparent bg-gradient-to-br from-indigo-500/30 via-purple-500/0 to-pink-500/30 rounded-[2rem] [mask-image:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] pointer-events-none opacity-50" />

                            <h3 className="text-lg tracking-widest uppercase mb-8 pb-4 border-b border-white/10 relative z-10">Order Summary</h3>

                            {/* Items List */}
                            <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-[#444] relative z-10">
                                {cartItems.map((item) => (
                                    <div key={item.cartItemId} className="flex gap-4 relative">
                                        <div className="w-16 h-20 bg-black flex-shrink-0 relative rounded-lg border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] overflow-hidden">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <h4 className="text-sm font-medium uppercase tracking-wide">{item.name}</h4>
                                            <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">SIZE: {item.size}</p>
                                        </div>
                                        <div className="text-sm font-medium flex items-center">
                                            ₹{(parseInt(item.price.replace(/,/g, '')) * item.quantity).toLocaleString('en-IN')}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 text-sm pt-6 border-t border-white/10 relative z-10">
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal</span>
                                    <span className="text-white font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Shipping</span>
                                    <span className="text-emerald-400 font-medium">Complimentary</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-end mt-6 pt-6 border-t border-white/10 relative z-10 mb-2">
                                <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">Estimated Total</span>
                                <span className="text-3xl font-bold tracking-tight">
                                    <span className="text-sm text-gray-500 mr-1 font-normal">INR</span>
                                    ₹{subtotal.toLocaleString('en-IN')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
