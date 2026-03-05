import { useState, useEffect } from 'react';
import Home from './component/Home.jsx';
import Product from './component/product.jsx';
import Contact from './component/Form.jsx';
import Order from './component/Order.jsx';
import Orders from './component/myorder.jsx';
import OrderHistory from './component/OrderHistory.jsx';
import { BrowserRouter, Routes, Route, Link, Navigate, NavLink } from "react-router-dom"
import axios from 'axios';

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${isActive
        ? 'bg-accent-600/10 text-accent-700 shadow-sm'
        : 'text-slate-600 hover:text-accent-600 hover:bg-slate-50'
      }`
    }
  >
    {children}
  </NavLink>
);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-accent-600/10 selection:text-accent-700">
      <BrowserRouter>
        <nav className="glass sticky top-0 z-50 py-3 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-10">
                <Link to="/" className="flex items-center gap-2 group">
                  <div className="w-10 h-10 bg-accent-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-accent-600/30 group-hover:scale-110 transition-transform">
                    S
                  </div>
                  <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase group-hover:text-accent-600 transition-colors">
                    Shopease
                  </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-1">
                  <NavItem to="/">Home</NavItem>
                  <NavItem to="/product">Products</NavItem>
                  <NavItem to="/Orders">My Cart</NavItem>
                  <NavItem to="/OrderHistory">Order History</NavItem>
                  <NavItem to="/Contact">About</NavItem>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Search/User Actions Placeholder */}
                <div className="hidden sm:flex items-center bg-slate-100 rounded-full px-4 py-1.5 border border-slate-200">
                  <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input type="text" placeholder="Search products..." className="bg-transparent border-none text-sm focus:ring-0 ml-2 w-32 lg:w-48" />
                </div>

                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  {isMenuOpen ? (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden glass border-t border-slate-200/50 py-4 px-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 mx-4 mt-2 rounded-2xl">
              <div className="flex flex-col gap-1">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 rounded-xl font-semibold text-slate-700 hover:text-accent-600 hover:bg-slate-100/50 transition-colors">Home</Link>
                <Link to="/product" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 rounded-xl font-semibold text-slate-700 hover:text-accent-600 hover:bg-slate-100/50 transition-colors">Products</Link>
                <Link to="/Orders" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 rounded-xl font-semibold text-slate-700 hover:text-accent-600 hover:bg-slate-100/50 transition-colors">My Cart</Link>
                <Link to="/OrderHistory" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 rounded-xl font-semibold text-slate-700 hover:text-accent-600 hover:bg-slate-100/50 transition-colors">Order History</Link>
                <Link to="/Contact" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 rounded-xl font-semibold text-slate-700 hover:text-accent-600 hover:bg-slate-100/50 transition-colors">About</Link>
              </div>
            </div>
          )}
        </nav>

        <main className="flex-grow max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/Order" element={<Order />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/OrderHistory" element={<OrderHistory />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <footer className="bg-slate-900 text-slate-400 pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
              <div className="md:col-span-5 space-y-6">
                <Link to="/" className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-accent-600 rounded-lg flex items-center justify-center text-white font-black text-lg">S</div>
                  <span className="text-2xl font-black text-white tracking-tighter uppercase">Shopease</span>
                </Link>
                <p className="text-slate-500 max-w-sm leading-relaxed">
                  Your premium destination for the latest gadgets and electronics. We provide quality products, secure payments, and worldwide delivery.
                </p>
                <div className="flex gap-4">
                  {[1, 2, 3,].map(idx => (
                    <div key={idx} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-accent-600 hover:text-white transition-all cursor-pointer">
                      <div className="w-4 h-4 bg-current" style={{ WebkitMask: 'url(https://unpkg.com/lucide-static@latest/icons/facebook.svg) no-repeat center', mask: 'url(https://unpkg.com/lucide-static@latest/icons/facebook.svg) no-repeat center' }}></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 space-y-6">
                <h4 className="text-sm font-bold text-white uppercase tracking-widest">Shop</h4>
                <ul className="space-y-4 text-sm">
                  <li><Link to="/product" className="hover:text-accent-500 transition-colors">All Products</Link></li>
                  <li><Link to="/product" className="hover:text-accent-500 transition-colors">New Arrivals</Link></li>
                  <li><Link to="/product" className="hover:text-accent-500 transition-colors">Best Sellers</Link></li>
                </ul>
              </div>

              <div className="md:col-span-2 space-y-6">
                <h4 className="text-sm font-bold text-white uppercase tracking-widest">Support</h4>
                <ul className="space-y-4 text-sm">
                  <li><a href="#" className="hover:text-accent-500 transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-accent-500 transition-colors">Shipping</a></li>
                  <li><a href="#" className="hover:text-accent-500 transition-colors">Returns</a></li>
                </ul>
              </div>

              <div className="md:col-span-3 space-y-6">
                <h4 className="text-sm font-bold text-white uppercase tracking-widest">Newsletter</h4>
                <p className="text-sm text-slate-500">Subscribe for the latest updates and exclusive offers.</p>
                <div className="flex gap-2">
                  <input type="email" placeholder="Email" className="bg-slate-800 border-none rounded-lg px-4 py-2 text-sm w-full focus:ring-1 focus:ring-accent-600" />
                  <button className="bg-accent-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-accent-700 transition-colors">Join</button>
                </div>
              </div>
            
</div>
            <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-slate-600">
                &copy; {new Date().getFullYear()} ShopEase Global Ltd. All rights reserved. Developed by Lingesh.
              </p>
              <div className="flex gap-6 text-xs text-slate-600">
                <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App
