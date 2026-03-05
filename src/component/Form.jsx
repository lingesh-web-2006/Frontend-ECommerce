import React, { useState, useEffect } from 'react';
import axios from "react";
function Reac() {
  alert("message sent")
}
function SendEmail() {
  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setmessage] = useState("");
  const HandleSubmit = async () => {
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8085";
      await axios.post(`${apiBaseUrl}/api/email/send`, { toEmail, subject, message });
      alert("Email Sent!");
    }
    catch (e) {
      alert("Error/ Sending Email")
    }
  }
}
const About = () => {

  return (
    <div className="max-w-6xl mx-auto space-y-32 pb-24">
      {/* About Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-50 text-accent-700 text-sm font-black tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-accent-600 animate-pulse"></span>
            Our Journey
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Crafting the Future of <span className="text-accent-600 italic">E-Commerce</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-xl">
            Founded in 2026, ShopEase was born out of a simple vision: to create a seamless bridge between premium technology and the people who use it. We believe that gadgets should not just be tools, but extensions of our digital selves.
          </p>
          <div className="flex gap-12 pt-4">
            <div className="space-y-2">
              <span className="text-4xl font-black text-slate-900 leading-none">10k+</span>
              <p className="text-xs text-slate-400 font-black uppercase tracking-widest">Global Clients</p>
            </div>
            <div className="space-y-2">
              <span className="text-4xl font-black text-slate-900 leading-none">500+</span>
              <p className="text-xs text-slate-400 font-black uppercase tracking-widest">Premium Units</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] rounded-[3.5rem] bg-slate-100 overflow-hidden shadow-2xl relative z-10">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop"
              alt="Design Studio"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>
          <div className="absolute -bottom-10 -left-10 glass p-10 rounded-[2.5rem] shadow-2xl max-w-sm z-20 border border-white/50">
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map(i => (
                <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              ))}
            </div>
            <p className="font-bold text-slate-900 leading-tight text-lg">
              "We don't just sell products; we deliver a promise of quality and innovation."
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200"></div>
              <div>
                <p className="text-sm font-black text-slate-900">Lingesh</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Founder & Lead Dev</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-slate-900 rounded-[4rem] p-12 lg:p-24 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-accent-600/20 rounded-full blur-[120px] -mr-40 -mt-40 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-indigo-600/10 rounded-full blur-[100px] -ml-20 -mb-20"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-5xl font-black tracking-tighter leading-none">Let's connect.</h2>
              <p className="text-slate-400 font-medium text-lg max-w-md leading-relaxed">
                Have a question about our collection or need help with an order? Our dedicated support team is ready to assist you.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-8 items-center group">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-3xl border border-white/10 text-accent-400 group-hover:bg-accent-600 group-hover:text-white transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Email us</h4>
                  <p className="text-lg font-bold text-white group-hover:text-accent-400 transition-colors">llingesh309@gmail.com</p>
                </div>
              </div>
              <div className="flex gap-8 items-center group">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-3xl border border-white/10 text-accent-400 group-hover:bg-accent-600 group-hover:text-white transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Call us</h4>
                  <p className="text-lg font-bold text-white group-hover:text-accent-400 transition-colors">+91 7695925660</p>
                </div>
              </div>
            </div>
          </div>

          <form className="glass-dark p-12 rounded-[3.5rem] border border-white/10 space-y-8 shadow-2xl backdrop-blur-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full bg-white/[0.03] border border-white/10 rounded-[1.25rem] px-8 py-5 text-sm focus:ring-2 focus:ring-accent-600 outline-none transition-all placeholder:text-slate-600 focus:bg-white/[0.05]" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full bg-white/[0.03] border border-white/10 rounded-[1.25rem] px-8 py-5 text-sm focus:ring-2 focus:ring-accent-600 outline-none transition-all placeholder:text-slate-600 focus:bg-white/[0.05]" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">Message</label>
              <textarea placeholder="How can we help you?" rows="5" className="w-full bg-white/[0.03] border border-white/10 rounded-[1.25rem] px-8 py-5 text-sm focus:ring-2 focus:ring-accent-600 outline-none transition-all placeholder:text-slate-600 focus:bg-white/[0.05] resize-none"></textarea>
            </div>
            <button onClick={Reac} className="w-full py-6 bg-accent-600 text-white rounded-[1.25rem] font-black text-xs uppercase tracking-[0.25em] hover:bg-accent-700 transform active:scale-[0.98] transition-all shadow-2xl shadow-accent-600/40">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default About;
