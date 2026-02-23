import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Type, Move, Trash2, Cpu, Sparkles, ShoppingBag, Layers, Maximize, RotateCcw } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { useCartStore } from '../store/useCartStore'

export function CustomDesigner() {
    const addItem = useCartStore((state) => state.addItem)
    const [selectedProduct, setSelectedProduct] = useState('HOODIE')
    const [uploadedImage, setUploadedImage] = useState(null)
    const [customText, setCustomText] = useState('')
    const [textColor, setTextColor] = useState('#FFFFFF')
    const [textPosition, setTextPosition] = useState({ x: 0, y: 0 })
    const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
    const fileInputRef = useRef(null)

    const products = {
        HOODIE: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=100&w=1000",
        TEE: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=100&w=1000"
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (event) => setUploadedImage(event.target.result)
            reader.readAsDataURL(file)
        }
    }

    const handleAddToCart = () => {
        addItem({
            id: Date.now(), // Generate unique ID
            name: `CUSTOM ${selectedProduct}`,
            price: selectedProduct === 'HOODIE' ? "5,999" : "3,499",
            category: "CUSTOM_DESIGN",
            image: products[selectedProduct],
            custom: {
                image: uploadedImage,
                text: customText,
                textColor
            }
        })
    }

    return (
        <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

                {/* Left Side: Designer Canvas */}
                <div className="flex-1 space-y-10">
                    <div className="relative aspect-square md:aspect-[4/5] cyber-card bg-cyber-grey/20 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 cyber-grid opacity-10" />

                        {/* THE PRODUCT MOCKUP */}
                        <img
                            src={products[selectedProduct]}
                            alt="Mockup"
                            className="w-full h-full object-cover opacity-80"
                        />

                        {/* DESIGN AREA (Limited Overlay) */}
                        <div className="absolute top-[25%] left-[25%] right-[25%] bottom-[35%] border border-dashed border-cyber-cyan/30 flex items-center justify-center pointer-events-none">
                            <span className="absolute -top-6 left-0 text-[8px] font-cyber text-cyber-cyan tracking-widest uppercase">Print_Area.v1</span>
                        </div>

                        {/* CUSTOM IMAGE OVERLAY */}
                        <AnimatePresence>
                            {uploadedImage && (
                                <motion.div
                                    drag
                                    dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                                    className="absolute inset-x-0 inset-y-0 flex items-center justify-center cursor-move"
                                >
                                    <div className="relative w-40 h-40">
                                        <img src={uploadedImage} className="w-full h-full object-contain drop-shadow-2xl" alt="Custom Graphic" />
                                        <button
                                            onClick={() => setUploadedImage(null)}
                                            className="absolute -top-2 -right-2 bg-cyber-pink text-white p-1 rounded-full shadow-neon-pink"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* CUSTOM TEXT OVERLAY */}
                        {customText && (
                            <motion.div
                                drag
                                className="absolute inset-x-0 inset-y-0 flex items-center justify-center cursor-move pointer-events-none"
                            >
                                <h3
                                    className="text-2xl font-cyber drop-shadow-lg pointer-events-auto"
                                    style={{ color: textColor }}
                                >
                                    {customText}
                                </h3>
                            </motion.div>
                        )}

                        <div className="absolute bottom-8 left-8 flex gap-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-[8px] font-cyber text-gray-500 uppercase tracking-widest">Render Output</span>
                                <span className="text-xs font-cyber text-cyber-pink tracking-widest uppercase">HD // NEURAL_PRESS</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button onClick={() => setSelectedProduct('HOODIE')} className={`flex-1 py-4 font-cyber text-[10px] tracking-widest border transition-all ${selectedProduct === 'HOODIE' ? 'bg-cyber-purple border-cyber-purple shadow-neon-purple text-white' : 'border-white/10 text-gray-400 hover:border-cyber-purple'}`}>
                            HOODIE_SHELL
                        </button>
                        <button onClick={() => setSelectedProduct('TEE')} className={`flex-1 py-4 font-cyber text-[10px] tracking-widest border transition-all ${selectedProduct === 'TEE' ? 'bg-cyber-cyan border-cyber-cyan shadow-neon-cyan text-black' : 'border-white/10 text-gray-400 hover:border-cyber-cyan'}`}>
                            CORE_TEE
                        </button>
                    </div>
                </div>

                {/* Right Side: Controls */}
                <div className="w-full lg:w-[450px] space-y-12">
                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <Cpu className="text-cyber-cyan" size={16} />
                            <h2 className="text-[10px] uppercase tracking-[0.5em] text-cyber-cyan font-bold">Design Terminal v0.8</h2>
                        </div>
                        <h1 className="text-5xl font-cyber tracking-tighter uppercase whitespace-nowrap">CUSTOMIZE<br /><span className="text-cyber-pink">SYSTEM</span></h1>
                    </div>

                    {/* Step 1: Upload */}
                    <div className="space-y-6">
                        <h3 className="text-xs font-cyber tracking-[0.3em] uppercase flex items-center gap-3">
                            <Layers size={14} className="text-cyber-pink" /> 01. Graphic_Input
                        </h3>
                        <div
                            onClick={() => fileInputRef.current.click()}
                            className="w-full aspect-[16/6] border-2 border-dashed border-white/10 hover:border-cyber-pink transition-all flex flex-col items-center justify-center cursor-pointer group"
                        >
                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                            <Upload className="text-gray-500 group-hover:text-cyber-pink transition-colors mb-4" size={32} />
                            <p className="text-[10px] font-cyber tracking-widest text-gray-500 uppercase group-hover:text-white transition-colors">UPLOAD_ASSET.PNG / JPG</p>
                        </div>
                    </div>

                    {/* Step 2: Text */}
                    <div className="space-y-6">
                        <h3 className="text-xs font-cyber tracking-[0.3em] uppercase flex items-center gap-3">
                            <Type size={14} className="text-cyber-cyan" /> 02. Neural_Text
                        </h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="ENTER_PHRASE"
                                value={customText}
                                onChange={(e) => setCustomText(e.target.value)}
                                className="cyber-input"
                            />
                            <div className="flex gap-4">
                                {['#FFFFFF', '#FF00FF', '#00FFFF', '#9D00FF', '#000000'].map(color => (
                                    <button
                                        key={color}
                                        onClick={() => setTextColor(color)}
                                        className={`w-10 h-10 border-2 ${textColor === color ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-60'}`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Step 3: Summary & Action */}
                    <div className="p-8 bg-white/5 border border-white/5 space-y-8">
                        <div className="flex justify-between items-center text-[10px] font-cyber tracking-widest uppercase">
                            <span className="text-gray-500">Processing Fee</span>
                            <span className="text-cyber-cyan">FREE_ACCESS</span>
                        </div>
                        <div className="flex justify-between items-center font-cyber">
                            <span className="text-xs tracking-widest uppercase">Protocol Total</span>
                            <span className="text-2xl text-cyber-pink">₹{selectedProduct === 'HOODIE' ? "5,999" : "3,499"}</span>
                        </div>

                        <div className="space-y-4">
                            <Button className="w-full py-5 text-sm" onClick={handleAddToCart}>
                                INITIALIZE_PURCHASE
                            </Button>
                            <div className="flex items-center justify-center gap-2 text-[8px] font-cyber text-gray-500 tracking-[0.3em] uppercase">
                                <ShieldCheck size={12} /> Secure Uplink Verified
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ShieldCheck({ size }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></svg>
    )
}
