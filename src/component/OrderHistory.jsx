import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function OrderHistory() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const savedOrders = JSON.parse(localStorage.getItem("shopease_orders")) || [];
        setOrders(savedOrders.sort((a, b) => new Date(b.date) - new Date(a.date)));
    }, []);

    return (
        <div className="max-w-7xl mx-auto space-y-16 pb-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-100">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black tracking-widest uppercase">
                        Account Overview
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Your Orders</h1>
                </div>
                <Link
                    to="/product"
                    className="group flex items-center gap-3 px-6 py-3 bg-slate-50 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-accent-600 hover:text-white transition-all shadow-sm"
                >
                    Continue Exploration
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>

            {orders.length === 0 ? (
                <div className="text-center py-40 bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200 animate-in fade-in duration-700">
                    <div className="text-8xl filter opacity-10 mb-8">📦</div>
                    <div className="space-y-3">
                        <h3 className="text-3xl font-black text-slate-900">No purchase record.</h3>
                        <p className="text-slate-400 font-medium max-w-sm mx-auto text-lg leading-relaxed">When you acquire your first premium product, your records will be meticulously archived here.</p>
                    </div>
                    <Link
                        to="/product"
                        className="inline-block mt-8 bg-accent-600 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-accent-700 transition-all shadow-2xl shadow-accent-600/30"
                    >
                        Browse Collections
                    </Link>
                </div>
            ) : (
                <div className="space-y-8">
                    {orders.map((order) => (
                        <div key={order.orderId} className="bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 border border-slate-100 overflow-hidden group">
                            <div className="bg-slate-50/50 px-10 py-8 border-b border-slate-100/50 flex flex-wrap justify-between items-center gap-10">
                                <div className="flex gap-12">
                                    <div className="space-y-1">
                                        <p className="text-slate-400 uppercase font-black text-[10px] tracking-widest">Captured On</p>
                                        <p className="font-black text-slate-700">{new Date(order.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-slate-400 uppercase font-black text-[10px] tracking-widest">Total Transaction</p>
                                        <p className="font-black text-accent-600 text-lg tracking-tight">₹{order.total}</p>
                                    </div>
                                    <div className="space-y-1 hidden sm:block">
                                        <p className="text-slate-400 uppercase font-black text-[10px] tracking-widest">Receiver</p>
                                        <p className="font-black text-slate-700 truncate max-w-[150px]">{order.customer.name}</p>
                                    </div>
                                </div>
                                <div className="text-right space-y-1">
                                    <p className="text-slate-400 uppercase font-black text-[10px] tracking-widest">Tracking Reference</p>
                                    <p className="font-black text-slate-900 tracking-tighter uppercase text-sm">#{order.orderId}</p>
                                </div>
                            </div>

                            <div className="p-10">
                                <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
                                    <div className="flex-grow space-y-8 w-full">
                                        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-accent-50 text-accent-700 font-black uppercase tracking-widest text-[10px] w-fit shadow-sm border border-accent-100">
                                            <span className="w-2 h-2 rounded-full bg-accent-600 animate-pulse"></span>
                                            {order.status}
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex gap-6 items-center group/item">
                                                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-50 flex-shrink-0 border border-slate-100 shadow-sm transition-transform group-hover/item:scale-105">
                                                        <img src={item.imageUrl} className="w-full h-full object-cover" alt={item.name} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-black text-slate-800 text-base leading-tight mb-1">{item.name}</h4>
                                                        <p className="text-slate-400 text-xs font-black uppercase tracking-[0.15em]">Qty: {item.quantity || 1} • <span className="text-slate-900">₹{item.price}</span></p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-4">
                                        <button className="flex-1 bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/20 whitespace-nowrap">
                                            Track Package
                                        </button>
                                        <button className="flex-1 bg-slate-50 text-slate-600 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-100 transition-all border border-slate-100 whitespace-nowrap">
                                            View Archive
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default OrderHistory;
