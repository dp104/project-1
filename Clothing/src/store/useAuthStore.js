import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export const useAuthStore = create((set) => ({
    user: null,
    isAdmin: false,
    loading: true,

    setUser: (user) => set({ user, loading: false }),

    initialize: async () => {
        const { data: { session } } = await supabase.auth.getSession()
        const user = session?.user ?? null
        set({ user, loading: false })

        // Fetch admin status on init
        if (user) {
            const { data } = await supabase.from('profiles').select('is_admin').eq('id', user.id).single()
            set({ isAdmin: !!data?.is_admin })
        }

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            const newUser = session?.user ?? null
            set({ user: newUser, isAdmin: false })

            if (newUser) {
                const { data } = await supabase.from('profiles').select('is_admin').eq('id', newUser.id).single()
                set({ isAdmin: !!data?.is_admin })
            }
        })

        return () => subscription.unsubscribe()
    },

    signOut: async () => {
        await supabase.auth.signOut()
        set({ user: null, isAdmin: false })
    },
}))
