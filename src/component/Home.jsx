import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const categories = [
    { name: "Phones", icon: "📱", description: "Latest smartphones & accessories", color: "bg-blue-500" },
    { name: "Laptops", icon: "💻", description: "Powerful machines for work & play", color: "bg-purple-500" },
    { name: "Accessories", icon: "🎧", description: "Enhance your tech experience", color: "bg-amber-500" },
    { name: "Wearables", icon: "⌚", description: "Smart watches & fitness trackers", color: "bg-emerald-500" }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 text-white shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-tr from-accent-700 via-accent-600 to-indigo-900 opacity-90"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-5xl mx-auto px-8 py-24 text-center space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-sm font-bold tracking-wide uppercase animate-in fade-in slide-in-from-bottom-2 duration-700">
            <span className="flex h-2 w-2 rounded-full bg-accent-400 animate-pulse"></span>
            New Spring Collection 2026
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 text-balance">
            Elevate Your <span className="text-accent-300">Digital Lifestyle</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 leading-relaxed font-medium">
            Discover a curated collection of cutting-edge gadgets and premium tech accessories designed for the modern explorer.
          </p>

          <div className="pt-6 flex flex-wrap justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <button
              onClick={() => navigate("/product")}
              className="px-10 py-5 bg-white text-slate-900 font-black rounded-2xl hover:bg-slate-50 transform hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10"
            >
              Shop Collection
            </button>
            <button
              onClick={() => navigate("/Contact")}
              className="px-10 py-5 bg-white/10 text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 backdrop-blur-md transform hover:scale-105 active:scale-95 transition-all"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Shop by Category</h2>
            <p className="text-slate-500 font-medium">Precision-engineered tech for every lifestyle.</p>
          </div>
          <button onClick={() => navigate("/product")} className="text-accent-600 font-bold flex items-center gap-2 group hover:gap-3 transition-all">
            View All Products
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="group relative p-10 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 cursor-pointer overflow-hidden"
              onClick={() => navigate("/product")}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${cat.color}`}></div>

              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-4xl group-hover:scale-110 group-hover:bg-white group-hover:shadow-xl transition-all duration-500">
                  {cat.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 truncate">{cat.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{cat.description}</p>
                </div>
                <div className="flex items-center text-accent-600 font-bold text-sm tracking-wide uppercase">
                  Explore
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 border-t border-slate-100">
        <div className="flex flex-col items-center text-center gap-4 p-8 rounded-3xl bg-slate-50 border border-slate-100/50">
          <div className="w-16 h-16 flex items-center justify-center bg-white rounded-2xl shadow-sm text-3xl">🚚</div>
          <div>
            <h4 className="font-bold text-slate-900 text-lg">Express Delivery</h4>
            <p className="text-sm text-slate-500 font-medium pt-1">Free shipping on all premium orders over $50</p>
          </div>
        </div>
        <div className="flex flex-col items-center text-center gap-4 p-8 rounded-3xl bg-slate-50 border border-slate-100/50">
          <div className="w-16 h-16 flex items-center justify-center bg-white rounded-2xl shadow-sm text-3xl">🛡️</div>
          <div>
            <h4 className="font-bold text-slate-900 text-lg">Secure Encryption</h4>
            <p className="text-sm text-slate-500 font-medium pt-1">Your data is protected by bank-level security</p>
          </div>
        </div>
        <div className="flex flex-col items-center text-center gap-4 p-8 rounded-3xl bg-slate-50 border border-slate-100/50">
          <div className="w-16 h-16 flex items-center justify-center bg-white rounded-2xl shadow-sm text-3xl">🔄</div>
          <div>
            <h4 className="font-bold text-slate-900 text-lg">Hassle-free Returns</h4>
            <p className="text-sm text-slate-500 font-medium pt-1">30-day window for easy exchanges or refunds</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
