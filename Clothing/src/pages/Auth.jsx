import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'
import { Cpu, ShieldCheck, Zap, Lock, Mail, UserPlus, LogIn } from 'lucide-react'

export function Auth() {
    const [isLogin, setIsLogin] = useState(true)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleAuth = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { error } = isLogin
                ? await supabase.auth.signInWithPassword({ email, password })
                : await supabase.auth.signUp({ email, password })
            if (error) throw error
            navigate('/')
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen pt-40 pb-24 px-6 flex items-center justify-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-purple/10 rounded-full blur-[150px] -z-10" />
            <div className="absolute inset-0 cyber-grid opacity-5 -z-10" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md cyber-card p-10 md:p-14 relative"
            >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-cyber-black px-4 py-2 border border-cyber-pink/50">
                    <Cpu className="text-cyber-pink shadow-neon-pink" size={24} />
                </div>

                <div className="text-center mb-12 mt-4">
                    <h2 className="text-[10px] uppercase tracking-[0.5em] text-cyber-cyan mb-4 font-cyber">System Access Protocol</h2>
                    <h1 className="text-4xl font-cyber tracking-tighter uppercase whitespace-nowrap">
                        {isLogin ? 'UPLINK_LOGIN' : 'CREATE_NODE'}
                    </h1>
                </div>

                <form onSubmit={handleAuth} className="space-y-8">
                    <div className="space-y-4">
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-cyber-cyan transition-colors" size={16} />
                            <input
                                type="email"
                                placeholder="IDENTIFIER@MEMORY.X"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="cyber-input pl-12"
                                required
                            />
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-cyber-pink transition-colors" size={16} />
                            <input
                                type="password"
                                placeholder="ENCRYPTION_KEY"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="cyber-input pl-12"
                                required
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 text-xs font-cyber flex items-center justify-center gap-3"
                    >
                        {loading ? 'SYNCING...' : isLogin ? (
                            <><LogIn size={16} /> AUTHORIZE_ENTRY</>
                        ) : (
                            <><UserPlus size={16} /> GENERATE_IDENTITY</>
                        )}
                    </Button>
                </form>

                <div className="mt-12 text-center space-y-8">
                    <div className="flex items-center gap-4 py-2 opacity-50">
                        <div className="h-[1px] flex-1 bg-white/10" />
                        <span className="text-[8px] font-cyber tracking-widest text-gray-500 uppercase">Switch Mode</span>
                        <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-[10px] font-cyber tracking-[0.3em] text-cyber-cyan hover:text-white transition-all uppercase underline underline-offset-8"
                    >
                        {isLogin ? 'NEW_ACCOUNT.EXE' : 'EXISTING_UPLINK.LOG'}
                    </button>

                    <div className="flex items-center justify-center gap-2 text-[8px] font-cyber text-gray-600 tracking-[0.3em] uppercase">
                        <ShieldCheck size={12} /> Secure Auth Protocol Active
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
