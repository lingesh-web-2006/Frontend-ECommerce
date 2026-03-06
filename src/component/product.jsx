import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    // Use VITE_API_BASE_URL from .env file
    const apiBaseUrl =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"; // fallback to local backend

    fetch(`${apiBaseUrl}/products`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Received data is not an array:", data);
          setProducts([]);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setProducts([]);
        setIsLoading(false);
      });
  }, []);

  const handleBuy = (product) => {
    navigate("/Order", { state: { product, source: "direct" } });
  };

  const addToCart = (p) => {
    const cart = JSON.parse(localStorage.getItem("shopease_cart")) || [];
    const existingItem = cart.find((item) => item.id === p.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...p, quantity: 1, addedAt: new Date().toISOString() });
    }

    localStorage.setItem("shopease_cart", JSON.stringify(cart));
    alert(`${p.name} added to cart!`);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-96 gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-slate-100 border-t-accent-600 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-accent-600/10"></div>
          </div>
        </div>
        <p className="text-slate-500 font-bold animate-pulse">
          Curating products for you...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-100">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Our Collection
          </h1>
          <p className="text-slate-500 font-medium">
            Discover {products.length} handpicked premium products.
          </p>
        </div>
        <div className="flex gap-2">
          <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-600 focus:ring-2 focus:ring-accent-600 outline-none cursor-pointer">
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-slate-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {products.map((p) => (
            <div
              className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 border border-slate-100 flex flex-col"
              key={p.id}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                <img
                  src={
                    p.imageUrl ||
                    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop"
                  }
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <span className="glass px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase text-slate-900 shadow-xl border border-white/50">
                    Premium
                  </span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1 gap-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-accent-600 transition-colors leading-snug">
                    {p.name}
                  </h3>
                  <p className="text-slate-500 text-sm font-medium line-clamp-2 leading-relaxed">
                    Designed for perfection. Experience the pinnacle of performance
                    and style.
                  </p>
                </div>

                <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50">
                  <span className="text-3xl font-black text-slate-900 tracking-tighter">
                    ₹{p.price}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(p)}
                      className="p-3 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-all"
                      title="Add to Cart"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleBuy(p)}
                      className="px-6 py-3 bg-accent-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-accent-700 transform active:scale-95 transition-all shadow-lg shadow-accent-600/25"
                    >
                      Order
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

export default Product;
