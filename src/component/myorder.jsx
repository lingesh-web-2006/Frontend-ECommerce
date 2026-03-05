import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("shopease_cart")) || [];
    setOrders(savedCart);
  }, []);

  const deleteOrder = (indexToDelete) => {
    const updatedOrders = orders.filter((_, index) => index !== indexToDelete);
    setOrders(updatedOrders);
    localStorage.setItem("shopease_cart", JSON.stringify(updatedOrders));
  };

  const clearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      localStorage.removeItem("shopease_cart");
      setOrders([]);
    }
  };

  const handleCheckout = () => {
    navigate("/Order", { state: { cartItems: orders, source: 'cart' } });
  };

  const totalSpent = orders.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);

  return (
    <div className="max-w-7xl mx-auto space-y-16 pb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-100">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black tracking-widest uppercase">
            Your Selection
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Shopping Bag</h1>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-slate-500 font-bold text-lg">{orders.length} Items</span>
          {orders.length > 0 && (
            <button
              onClick={clearCart}
              className="px-6 py-2.5 rounded-xl border border-red-100 text-red-500 hover:bg-red-50 font-black text-[10px] uppercase tracking-widest transition-all"
            >
              Flush Bag
            </button>
          )}
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-40 bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200 space-y-8 animate-in fade-in duration-700">
          <div className="text-8xl filter grayscale opacity-20">🛒</div>
          <div className="space-y-3">
            <h3 className="text-3xl font-black text-slate-900">Your bag is empty.</h3>
            <p className="text-slate-400 font-medium max-w-sm mx-auto text-lg leading-relaxed">It seems you haven't discovered your next upgrade yet. Let's change that.</p>
          </div>
          <Link
            to="/product"
            className="inline-block bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/20"
          >
            Start Exploring
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-8 space-y-6">
            {orders.map((order, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 border border-slate-100 flex flex-col md:flex-row gap-10 group relative overflow-hidden"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden bg-slate-50 flex-shrink-0 border border-slate-100">
                  <img
                    src={order.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={order.productName || order.name}
                  />
                </div>

                <div className="flex-grow flex flex-col justify-between py-2">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">{order.productName || order.name}</h3>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest italic">Inventory Ref: {index + 1}00-{order.id || 'N/A'}</p>
                    </div>
                    <button
                      onClick={() => deleteOrder(index)}
                      className="w-10 h-10 rounded-full bg-slate-50 text-slate-300 hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center border border-slate-100"
                      title="Remove Item"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-12 mt-8 pt-8 border-t border-slate-50">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unit Price</p>
                      <p className="text-lg font-black text-slate-900">₹{order.price}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quantity</p>
                      <p className="text-lg font-black text-slate-900">{order.quantity}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subtotal</p>
                      <p className="text-lg font-black text-accent-600 tracking-tight">₹{order.price * order.quantity}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="glass p-10 rounded-[3.5rem] shadow-2xl space-y-10 sticky top-28 border border-white/50">
              <div className="space-y-2">
                <h3 className="font-black text-slate-900 text-xs tracking-[0.2em] uppercase">Cart Summary</h3>
                <p className="text-sm font-medium text-slate-400 italic">Taxes and shipping calculated at checkout.</p>
              </div>

              <div className="space-y-6 pt-6">
                <div className="flex justify-between items-center bg-white/40 p-6 rounded-3xl border border-white/50">
                  <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Total Value</span>
                  <span className="text-4xl font-black text-slate-900 tracking-tighter">₹{totalSpent}</span>
                </div>

                <div className="space-y-3 px-4">
                  <div className="flex justify-between items-center text-xs font-black text-slate-400 uppercase tracking-widest">
                    <span>Vat / Gst</span>
                    <span className="text-slate-600 italic font-medium lowercase">Included</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-black text-slate-400 uppercase tracking-widest">
                    <span>Shipping</span>
                    <span className="text-emerald-500">Free</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-4">
                <button
                  className="w-full bg-accent-600 text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.25em] hover:bg-accent-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-accent-600/30"
                  onClick={handleCheckout}
                >
                  Confirm & Checkout
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Encrypted SSL Transaction
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
