"use client";

import { useState } from "react";

export default function Home() {
  const [product, setProduct] = useState("");
  // 默认使用最安全的 Professional 语调
  const [tone, setTone] = useState("Professional"); 
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const generateListing = async () => {
    if (!product) return alert("Please describe your product first.");
    
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product, tone }),
      });

      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Request failed");
      
      setResult(data);
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        
        {/* Header Area */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-orange-600 mb-3 tracking-tight">
            Etsy Listing Generator
          </h1>
          <p className="text-gray-500 text-lg">
            Create SEO-optimized titles, descriptions, and tags in seconds.
            <span className="block text-sm text-gray-400 mt-1">(Free Tool • No Signup Required)</span>
          </p>
        </div>

        {/* Input Area */}
        <div className="space-y-6">
          
          {/* 1. Product Input */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">
              1. What are you selling?
            </label>
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition shadow-sm placeholder-gray-400"
              rows={4}
              placeholder="e.g. Handmade ceramic mug, speckled blue glaze, large handle. Perfect gift for coffee lovers, minimalist kitchen decor..."
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
          </div>

          {/* 2. Tone Selector (Simplified) */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">
              2. Select Tone
            </label>
            <div className="relative">
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 outline-none bg-white appearance-none shadow-sm cursor-pointer"
              >
                {/* ⬇️ 精简后的“黄金4项”，不再让用户纠结 */}
                <option value="Professional">Professional (Standard & SEO-Focused)</option>
                <option value="Storytelling">Storytelling (Best for Handmade items)</option>
                <option value="Vintage">Vintage Style (For Retro/Antique items)</option>
                <option value="Enthusiastic">Enthusiastic (High Energy & Salesy)</option>
              </select>
              {/* Custom Arrow Icon */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          {/* 3. Generate Button */}
          <button
            onClick={generateListing}
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-lg transition transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed text-lg shadow-md"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Generating Magic...
              </span>
            ) : (
              "Generate Listing ✨"
            )}
          </button>
        </div>

        {/* Result Area */}
        {result && (
          <div className="mt-10 space-y-8 border-t pt-8 animate-fade-in">
            
            {/* Title Section */}
            <div className="bg-orange-50 p-6 rounded-xl border border-orange-200 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-orange-900 uppercase text-xs tracking-wider">SEO Title</h3>
                <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">Max 140 chars</span>
              </div>
              <p className="text-gray-900 font-medium text-lg leading-snug select-all cursor-pointer hover:bg-orange-100 p-2 -mx-2 rounded transition">
                {result.title}
              </p>
            </div>

            {/* Description Section */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-500 uppercase text-xs tracking-wider mb-3">Product Description</h3>
              <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                {result.description}
              </p>
            </div>

            {/* Tags Section */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-gray-500 uppercase text-xs tracking-wider">13 SEO Tags</h3>
                <span className="text-xs text-gray-400">Copy & Paste</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.tags.split(',').map((tag: string, i: number) => (
                  <span key={i} className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Affiliate / Promo Section */}
        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">
            Trusted Tools for Sellers
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="#" className="group block p-4 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 transition">
              <span className="block font-bold text-blue-900 group-hover:text-blue-700">EverBee 🐝</span>
              <span className="text-sm text-blue-600">Best for Product Research</span>
            </a>
            <a href="#" className="group block p-4 bg-green-50 hover:bg-green-100 rounded-xl border border-green-200 transition">
              <span className="block font-bold text-green-900 group-hover:text-green-700">Printful 👕</span>
              <span className="text-sm text-green-600">Start POD Business</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}