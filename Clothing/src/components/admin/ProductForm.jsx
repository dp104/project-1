import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import { X, Check, Upload, Link, ChevronDown, AlertCircle } from 'lucide-react'

const PRESET_DESCRIPTIONS = [
    { label: 'Streetwear Hoodie', text: 'Premium quality heavyweight hoodie crafted for the urban explorer. Features a relaxed fit, kangaroo pocket, and bold graphic print. Perfect for layering.' },
    { label: 'Graphic Tee', text: 'Ultra-soft 100% cotton tee with a vibrant signature print. Lightweight, breathable fabric designed for everyday wear and maximum comfort.' },
    { label: 'Cargo Pants', text: 'Multi-pocket cargo pants built for style and utility. Relaxed tapered fit with adjustable drawstring waist. Durable ripstop fabric.' },
    { label: 'Bomber Jacket', text: 'Sleek satin-finish bomber with ribbed cuffs and hem. A versatile outerwear staple that transitions seamlessly from day to night.' },
    { label: 'Knitwear', text: 'Cozy knit construction with a modern relaxed silhouette. Soft yarn blend that keeps you warm without the bulk. Ideal for layering.' },
    { label: 'Custom', text: '' },
]

const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size']
const LABEL_OPTIONS = [
    { value: '', label: 'None' },
    { value: 'NEW', label: '🆕 NEW' },
    { value: 'HOT', label: '🔥 HOT' },
    { value: 'SALE', label: '🏷️ SALE' },
    { value: 'LIMITED', label: '⚡ LIMITED' },
    { value: 'BESTSELLER', label: '⭐ BESTSELLER' },
]

const LABEL_COLORS = {
    NEW: 'bg-emerald-100 text-emerald-700',
    HOT: 'bg-red-100 text-red-700',
    SALE: 'bg-pink-100 text-pink-700',
    LIMITED: 'bg-amber-100 text-amber-700',
    BESTSELLER: 'bg-violet-100 text-violet-700',
}

const INPUT = 'w-full bg-slate-50 border-[1.5px] border-slate-200 text-slate-800 px-3.5 py-2.5 rounded-xl text-sm outline-none transition focus:border-pink-400 focus:bg-white placeholder:text-slate-400'
const LABEL = 'block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5'

export function ProductForm({ editing, onClose, onSaved }) {
    const EMPTY = { name: '', price: '', mrp: '', category: '', image: '', description: '', is_active: true, is_featured: false, sizes: [], label: '', track_stock: false, stock_quantity: '' }
    const initial = editing ? {
        name: editing.name,
        price: String(Math.floor(editing.price / 100)),
        mrp: editing.mrp ? String(Math.floor(editing.mrp / 100)) : '',
        category: editing.category,
        image: editing.image,
        description: editing.description || '',
        is_active: editing.is_active,
        is_featured: editing.is_featured,
        sizes: editing.sizes || [],
        label: editing.label || '',
        track_stock: editing.track_stock || false,
        stock_quantity: editing.stock_quantity != null ? String(editing.stock_quantity) : '',
    } : EMPTY

    const [form, setForm] = useState(initial)
    const [imageMode, setImageMode] = useState('url')
    const [uploading, setUploading] = useState(false)
    const [uploadPreview, setUploadPreview] = useState(editing?.image || '')
    const [descPreset, setDescPreset] = useState('Custom')
    const [saving, setSaving] = useState(false)
    const [saveError, setSaveError] = useState('')
    const fileRef = useRef()

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

    const toggleSize = (size) => {
        set('sizes', form.sizes.includes(size)
            ? form.sizes.filter(s => s !== size)
            : [...form.sizes, size])
    }

    async function handleFileUpload(e) {
        const file = e.target.files[0]
        if (!file) return
        setUploading(true)
        const ext = file.name.split('.').pop()
        const path = `products/${Date.now()}.${ext}`
        const { error } = await supabase.storage.from('product-images').upload(path, file, { upsert: true })
        if (error) { setSaveError('Image upload failed: ' + error.message); setUploading(false); return }
        const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(path)
        setUploadPreview(publicUrl)
        set('image', publicUrl)
        setUploading(false)
    }

    function handlePreset(lbl) {
        setDescPreset(lbl)
        const found = PRESET_DESCRIPTIONS.find(d => d.label === lbl)
        if (found && lbl !== 'Custom') set('description', found.text)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setSaving(true)
        setSaveError('')

        // Core payload (columns that definitely exist)
        const corePayload = {
            name: form.name.trim(),
            price: Math.round(parseFloat(form.price) * 100),
            mrp: form.mrp ? Math.round(parseFloat(form.mrp) * 100) : null,
            category: form.category.trim(),
            image: form.image.trim(),
            description: form.description.trim(),
            is_active: form.is_active,
            is_featured: form.is_featured,
            sizes: form.sizes,
            label: form.label || null,
        }

        let error, savedId
        if (editing) {
            ; ({ error } = await supabase.from('products').update(corePayload).eq('id', editing.id))
            savedId = editing.id
        } else {
            const { data, error: insertErr } = await supabase.from('products').insert(corePayload).select('id').single()
            error = insertErr
            savedId = data?.id
        }

        if (error) { setSaving(false); setSaveError(error.message || 'Save failed — check Supabase RLS policies.'); return }

        // Try to save stock fields separately (requires stock_quantity + track_stock columns in Supabase)
        if (savedId) {
            const stockPayload = {
                track_stock: form.track_stock,
                stock_quantity: form.track_stock && form.stock_quantity !== '' ? parseInt(form.stock_quantity) : null,
            }
            const { error: stockErr } = await supabase.from('products').update(stockPayload).eq('id', savedId)
            if (stockErr && stockErr.message?.includes('stock')) {
                // Columns not yet created — show a soft warning but still close successfully
                setSaving(false)
                setSaveError('⚠️ Product saved! To enable stock tracking, add track_stock (bool) and stock_quantity (int4) columns to your Supabase products table, then re-save.')
                return
            }
        }

        setSaving(false)
        onSaved()
    }

    const previewUrl = imageMode === 'upload' ? uploadPreview : form.image

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={onClose}>
            <motion.div initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }}
                className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col"
                onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className="flex items-center justify-between px-7 py-4 border-b border-slate-100 bg-gradient-to-r from-pink-50 to-violet-50 shrink-0">
                    <h3 className="font-bold text-slate-800">{editing ? 'Edit Product' : 'Add New Product'}</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-white rounded-lg transition-colors"><X size={18} /></button>
                </div>

                {/* Error */}
                {saveError && (
                    <div className="mx-6 mt-4 shrink-0 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                        <AlertCircle size={16} className="shrink-0 mt-0.5" /><span>{saveError}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="overflow-y-auto flex-1">
                    <div className="p-6 space-y-5">

                        {/* Name + Category */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={LABEL}>Product Name *</label>
                                <input required value={form.name} onChange={e => set('name', e.target.value)} className={INPUT} placeholder="NEON GLITCH HOODIE" />
                            </div>
                            <div>
                                <label className={LABEL}>Category *</label>
                                <input required value={form.category} onChange={e => set('category', e.target.value)} className={INPUT} placeholder="HOODIE | V2.0" />
                            </div>
                        </div>

                        {/* MRP + Offer Price + Label */}
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className={LABEL}>MRP / Original (₹)</label>
                                <input type="number" min="1" value={form.mrp} onChange={e => set('mrp', e.target.value)} className={INPUT} placeholder="5999 (optional)" />
                                <p className="text-[10px] text-slate-400 mt-1">Shown ~~crossed out~~ on card</p>
                            </div>
                            <div>
                                <label className={LABEL}>Offer Price (₹) *</label>
                                <input required type="number" min="1" value={form.price} onChange={e => set('price', e.target.value)} className={INPUT} placeholder="4999" />
                                <p className="text-[10px] text-slate-400 mt-1">Final selling price</p>
                            </div>
                            <div>
                                <label className={LABEL}>Badge / Label</label>
                                <select value={form.label} onChange={e => set('label', e.target.value)} className={INPUT}>
                                    {LABEL_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                </select>
                                {form.label && (
                                    <span className={`mt-1 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${LABEL_COLORS[form.label] || 'bg-slate-100 text-slate-600'}`}>
                                        {form.label}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Sizes */}
                        <div>
                            <label className={LABEL}>Available Sizes</label>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {SIZE_OPTIONS.map(size => (
                                    <button key={size} type="button" onClick={() => toggleSize(size)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${form.sizes.includes(size)
                                            ? 'bg-pink-500 border-pink-500 text-white shadow-sm'
                                            : 'bg-white border-slate-200 text-slate-500 hover:border-pink-300 hover:text-pink-500'
                                            }`}>
                                        {size}
                                    </button>
                                ))}
                            </div>
                            {form.sizes.length === 0 && (
                                <p className="text-[10px] text-slate-400 mt-1.5">No sizes selected — product will show without size picker</p>
                            )}
                        </div>

                        {/* Image */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className={LABEL}>Product Image *</label>
                                <div className="flex rounded-lg overflow-hidden border border-slate-200 text-xs font-semibold">
                                    {['url', 'upload'].map(m => (
                                        <button key={m} type="button" onClick={() => setImageMode(m)}
                                            className={`px-3 py-1.5 flex items-center gap-1 transition-colors ${imageMode === m ? 'bg-pink-500 text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}>
                                            {m === 'url' ? <Link size={12} /> : <Upload size={12} />}
                                            {m === 'url' ? 'URL' : 'Upload'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {imageMode === 'url' ? (
                                <input required={imageMode === 'url'} value={form.image} onChange={e => set('image', e.target.value)} className={INPUT} placeholder="https://…" />
                            ) : (
                                <div>
                                    <input type="file" ref={fileRef} accept="image/*" onChange={handleFileUpload} className="hidden" />
                                    <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
                                        className="w-full border-2 border-dashed border-slate-200 rounded-xl py-7 flex flex-col items-center gap-2 text-sm text-slate-400 hover:border-pink-300 hover:text-pink-500 hover:bg-pink-50 transition-all disabled:opacity-50">
                                        {uploading
                                            ? <><div className="w-5 h-5 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />Uploading…</>
                                            : <><Upload size={20} />Click to upload<span className="text-xs">PNG, JPG, WEBP</span></>}
                                    </button>
                                    {uploadPreview && <p className="text-xs text-emerald-600 mt-1.5 font-medium">✓ Uploaded</p>}
                                </div>
                            )}
                            {previewUrl && (
                                <img src={previewUrl} alt="preview" className="w-full h-36 object-cover rounded-xl border border-slate-200 mt-3" onError={e => e.target.style.display = 'none'} />
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className={LABEL}>Description</label>
                                <div className="relative">
                                    <select value={descPreset} onChange={e => handlePreset(e.target.value)}
                                        className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-600 outline-none cursor-pointer appearance-none pr-7">
                                        {PRESET_DESCRIPTIONS.map(d => <option key={d.label} value={d.label}>{d.label}</option>)}
                                    </select>
                                    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                            <textarea rows={2} value={form.description} onChange={e => { set('description', e.target.value); setDescPreset('Custom') }}
                                className={INPUT + ' resize-none'} placeholder="Select a preset or write your own…" />
                        </div>

                        {/* Stock Management */}
                        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/70">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <p className="text-sm font-semibold text-slate-700">Stock Management</p>
                                    <p className="text-xs text-slate-400 mt-0.5">Track inventory for this product</p>
                                </div>
                                <div onClick={() => set('track_stock', !form.track_stock)} className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${form.track_stock ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${form.track_stock ? 'left-6' : 'left-1'}`} />
                                </div>
                            </div>
                            {form.track_stock && (
                                <div className="grid grid-cols-2 gap-3 mt-3">
                                    <div>
                                        <label className={LABEL}>Quantity in Stock</label>
                                        <input type="number" min="0" value={form.stock_quantity}
                                            onChange={e => set('stock_quantity', e.target.value)}
                                            className={INPUT} placeholder="e.g. 50" />
                                    </div>
                                    <div className="flex flex-col justify-end pb-0.5">
                                        {form.stock_quantity !== '' && (
                                            <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-lg border w-fit ${parseInt(form.stock_quantity) === 0
                                                ? 'bg-red-50 text-red-600 border-red-200'
                                                : parseInt(form.stock_quantity) <= 5
                                                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                                                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                }`}>
                                                {parseInt(form.stock_quantity) === 0 ? '⛔ Out of Stock' : parseInt(form.stock_quantity) <= 5 ? `⚠️ Low — ${form.stock_quantity} left` : `✓ ${form.stock_quantity} in stock`}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Toggles */}
                        <div className="flex gap-8 pt-1">
                            {[
                                { key: 'is_featured', label: 'Featured in Carousel', desc: 'Show on home page', on: 'bg-amber-400' },
                                { key: 'is_active', label: 'Active / Visible', desc: 'Visible in shop', on: 'bg-emerald-500' },
                            ].map(t => (
                                <div key={t.key} className="flex items-center gap-3">
                                    <div onClick={() => set(t.key, !form[t.key])} className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${form[t.key] ? t.on : 'bg-slate-200'}`}>
                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${form[t.key] ? 'left-6' : 'left-1'}`} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-700">{t.label}</p>
                                        <p className="text-xs text-slate-400">{t.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 pb-6">
                        <button type="submit" disabled={saving}
                            className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-violet-600 text-white font-semibold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-md shadow-pink-100 disabled:opacity-50 flex items-center justify-center gap-2">
                            {saving
                                ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving…</>
                                : <><Check size={16} />{editing ? 'Update Product' : 'Add Product'}</>}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    )
}
