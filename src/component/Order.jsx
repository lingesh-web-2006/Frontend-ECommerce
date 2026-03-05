import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const InputField = ({ label, type = "text", value, onChange, required = false, rows, placeholder }) => (
  <div className="space-y-2">
    <label className="block text-xs font-black uppercase tracking-widest text-slate-500 ml-1">{label}</label>
    {rows ? (
      <textarea
        required={required}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-accent-600 focus:bg-white outline-none transition-all placeholder:text-slate-400"
        value={value}
        onChange={onChange}
      />
    ) : (
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-accent-600 focus:bg-white outline-none transition-all placeholder:text-slate-400 font-medium"
        value={value}
        onChange={onChange}
      />
    )}
  </div>
);

function Order() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const product = state?.product;
  const cartItems = state?.cartItems;
  const source = state?.source || 'direct';

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!product && (!cartItems || cartItems.length === 0)) {
    return (
      <div className="text-center py-32 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 animate-in fade-in duration-500">
        <div className="text-6xl mb-6">🛒</div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">No items for checkout</h3>
        <p className="text-slate-500 font-medium mb-8 max-w-xs mx-auto">Your checkout list is currently empty. Head back to the store to add some products.</p>
        <button
          onClick={() => navigate("/product")}
          className="bg-accent-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-accent-700 transition-all shadow-xl shadow-accent-600/20"
        >
          Explore Store
        </button>
      </div>
    );
  }

  const displayItems = product ? [{ ...product, quantity: 1 }] : cartItems;
  const grandTotal = displayItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      orderId: Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toISOString(),
      customer: { name, address, notes },
      items: displayItems,
      total: grandTotal,
      status: 'Processing'
    };

    const existingOrders = JSON.parse(localStorage.getItem("shopease_orders")) || [];
    existingOrders.push(orderData);
    localStorage.setItem("shopease_orders", JSON.stringify(existingOrders));

    if (source === 'cart') {
      localStorage.removeItem("shopease_cart");
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto text-center py-24 space-y-12 animate-in fade-in zoom-in-95 duration-700">
        <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto text-5xl shadow-xl shadow-emerald-500/10 border border-emerald-100 rotate-12">
          ✓
        </div>
        <div className="space-y-4">
          <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Order Success!</h2>
          <p className="text-slate-500 text-xl font-medium max-w-sm mx-auto leading-relaxed">Your premium gadgets are on their way. We've sent a confirmation to your email.</p>
        </div>
        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="px-10 py-5 bg-accent-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-accent-700 transform hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-accent-600/30"
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>
          <button
            className="px-10 py-5 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
            onClick={() => navigate("/OrderHistory")}
          >
            View My Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-16 pb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-100">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black tracking-widest uppercase">
            Checkout Process
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Final Review</h1>
        </div>
        <div className="hidden md:flex items-center gap-4 text-sm font-bold text-slate-400">
          <span className="text-accent-600">Items</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          <span className="text-accent-600">Details</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          <span>Payment</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Shipping Form */}
        <div className="lg:col-span-7 space-y-12">
          <section className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-lg shadow-xl">1</div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Shipping Information</h3>
            </div>

            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8 pl-18">
              <div className="space-y-8">
                <InputField
                  label="Full Receiver Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alexander Pierce"
                />
                <InputField
                  label="Shipping Address"
                  required
                  rows={4}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street, Building, City, State, ZIP..."
                />
                <InputField
                  label="Delivery Notes (Optional)"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Anything we should know for the courier?"
                />
              </div>
            </form>
          </section>

          <section className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-lg shadow-xl">2</div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Order Method</h3>
            </div>

            <div className="pl-18">
              <div className="p-8 rounded-[2rem] border-2 border-accent-600 bg-accent-50/30 flex items-center justify-between group">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-accent-200 flex items-center justify-center text-3xl shadow-sm">💳</div>
                  <div>
                    <h4 className="font-black text-slate-900">Standard Delivery</h4>
                    <p className="text-sm font-medium text-slate-500 italic">Expected in 3-5 business days</p>
                  </div>
                </div>
                <div className="text-xl font-black text-accent-700 tracking-tighter uppercase text-xs tracking-widest">Free</div>
              </div>
            </div>
          </section>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5">
          <div className="glass p-10 rounded-[3.5rem] shadow-2xl space-y-10 sticky top-28 border border-white/50">
            <div className="space-y-2">
              <h3 className="font-black text-slate-900 text-xs tracking-[0.2em] uppercase">Order Summary</h3>
              <p className="text-sm font-medium text-slate-400 italic">Review your selections before finalizing.</p>
            </div>

            <div className="space-y-8 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
              {displayItems.map((item, idx) => (
                <div key={idx} className="flex gap-6 items-center group">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white flex-shrink-0 border border-slate-100 shadow-sm transition-transform group-hover:scale-105">
                    <img src={item.imageUrl} className="w-full h-full object-cover" alt={item.name} />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-bold text-slate-900 text-base truncate mb-1">{item.name}</h4>
                    <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Qty: {item.quantity || 1} • <span className="text-slate-600">₹{item.price}</span></p>
                  </div>
                  <div className="text-right font-black text-slate-900 text-lg tracking-tighter">
                    ₹{(item.price * (item.quantity || 1))}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-10 border-t border-slate-100/50">
              <div className="flex justify-between text-base font-medium">
                <span className="text-slate-500">Subtotal</span>
                <span className="text-slate-900">₹{grandTotal}</span>
              </div>
              <div className="flex justify-between text-base font-medium">
                <span className="text-slate-500">Shipment Cost</span>
                <span className="text-emerald-500 font-black uppercase text-xs tracking-widest">Complimentary</span>
              </div>
              <div className="flex justify-between pt-8 border-t border-slate-100/50">
                <span className="font-black text-slate-900 text-3xl tracking-tighter">Grand Total</span>
                <span className="font-black text-accent-600 text-3xl tracking-tighter">₹{grandTotal}</span>
              </div>
            </div>

            <div className="space-y-8 pt-4">
              <button
                form="checkout-form"
                type="submit"
                className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.25em] hover:bg-slate-800 transform active:scale-[0.98] transition-all shadow-2xl shadow-slate-900/20"
              >
                Place Your Order
              </button>

              <div className="flex items-center justify-center gap-10 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="Mastercard" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="Paypal" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
