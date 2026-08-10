"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import GameCard from "@/components/GameCard";

type Product = {
  id: number;
  name: string;
  image: string;
  category: string;
  platform: string;
  description?: string;
  price?: number | string;
};

export default function AccessoriesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState("PS4");
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", "accessories")
      .order("id", { ascending: false });

    if (!error) {
      setProducts((data as Product[]) || []);
    } else {
      setProducts([]);
    }

    setLoading(false);
  }

  const filteredProducts = products.filter((product) => {
    const matchesPlatform = product.platform === selectedPlatform;

    const searchText = query.toLowerCase().trim();

    const matchesSearch =
      !searchText ||
      product.name?.toLowerCase().includes(searchText) ||
      product.description?.toLowerCase().includes(searchText);

    return matchesPlatform && matchesSearch;
  });

  function changePlatform(platform: string) {
    setSelectedPlatform(platform);
    setQuery("");
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <h1 className="text-4xl font-bold">
            🎧 الإكسسوارات
          </h1>

          {/* Platforms */}
          <div className="flex gap-3">

            <button
              onClick={() => changePlatform("PS4")}
              className={`px-6 py-2 rounded-xl font-bold transition ${
                selectedPlatform === "PS4"
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
            >
              PS4
            </button>

            <button
              onClick={() => changePlatform("PS5")}
              className={`px-6 py-2 rounded-xl font-bold transition ${
                selectedPlatform === "PS5"
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
            >
              PS5
            </button>

          </div>

        </div>

        {/* Search */}
        <div className="relative max-w-2xl mx-auto mb-10">

          <input
            type="text"
            placeholder={`🔍 ابحث في إكسسوارات ${selectedPlatform}...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-white placeholder:text-gray-500 outline-none focus:border-blue-500 transition shadow-lg"
          />

          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xl"
            >
              ×
            </button>
          )}

        </div>

        {/* Products */}
        {loading ? (
          <p className="text-gray-400">
            جاري تحميل الإكسسوارات...
          </p>
        ) : filteredProducts.length === 0 ? (

          <div className="text-center py-16">

            <div className="text-5xl mb-4">
              🔍
            </div>

            <h2 className="text-xl font-bold text-white">
              {query
                ? "مفيش إكسسوارات مطابقة للبحث"
                : `لا توجد إكسسوارات لـ ${selectedPlatform}`}
            </h2>

            {query && (
              <p className="text-gray-400 mt-2">
                جرب اسم منتج مختلف
              </p>
            )}

          </div>

        ) : (

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">

            {filteredProducts.map((product) => (
              <GameCard
                key={product.id}
                game={product}
              />
            ))}

          </div>

        )}

      </div>
    </main>
  );
}