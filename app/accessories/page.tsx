"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import GameCard from "@/components/GameCard";

export default function AccessoriesPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState("PS4");

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
      setProducts(data || []);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <h1 className="text-4xl font-bold">
            🎧 الإكسسوارات
          </h1>

          <div className="flex gap-3">

            <button
              onClick={() => setSelectedPlatform("PS4")}
              className={`px-6 py-2 rounded-xl font-bold transition ${
                selectedPlatform === "PS4"
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
            >
              PS4
            </button>

            <button
              onClick={() => setSelectedPlatform("PS5")}
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

        {loading ? (
          <p className="text-gray-400">
            جاري تحميل الإكسسوارات...
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {products
              .filter(
                (product) => product.platform === selectedPlatform
              )
              .map((product) => (
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