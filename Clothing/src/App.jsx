import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { CartDrawer } from './components/cart/CartDrawer'
import { ScrollToTop } from './components/utils/ScrollToTop'
import { Home } from './pages/Home'
import { Shop } from './pages/Shop'
import { ProductDetails } from './pages/ProductDetails'
import { Auth } from './pages/Auth'
import { Checkout } from './pages/Checkout'
import { CustomDesigner } from './pages/CustomDesigner'

function App() {
    return (
        <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-cyber-black">
                <Navbar />
                <CartDrawer />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/product/:id" element={<ProductDetails />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/customize" element={<CustomDesigner />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    )
}

export default App
