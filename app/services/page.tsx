"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import GameCard from "@/components/GameCard";
import { supabase } from "@/lib/supabase";

type Product = {
  id: number;
  name: string;
  image: string;
  category: string;
  platform: string;
  description?: string;
  price?: number | string;
};

export default function ServicesPage() {
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
      .eq("category", "services")
      .order("id", { ascending: false });

    if (!error) {
      setProducts((data as Product[]) || []);
    } else {
      setProducts([]);
    }

    setLoading(false);
  }

  function changePlatform(platform: string) {
    setSelectedPlatform(platform);
    setQuery("");
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

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-10 sm:py-12">

        {/* Page Header */}
        <div className="mb-8 sm:mb-10">

          <h1
            className="text-4xl sm:text-5xl font-black tracking-wide text-white mb-3"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            <span className="text-blue-500 drop-shadow-[0_0_25px_rgba(37,99,235,0.55)]">
              ATOM
            </span>{" "}
            SERVICES
          </h1>

          <p className="text-gray-400 text-sm sm:text-base max-w-2xl">
            خدمات احترافية لتجهيز وصيانة وتطوير أجهزة الجيمينج الخاصة بك.
          </p>

        </div>

        {/* Platforms */}
        <div className="flex flex-wrap gap-3 sm:gap-4 mb-6">

          <button
            onClick={() => changePlatform("PS4")}
            className={`
              px-6
              py-3
              rounded-xl
              font-bold
              transition-all
              duration-300
              border
              ${
                selectedPlatform === "PS4"
                  ? "bg-blue-600 text-white border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.25)]"
                  : "bg-zinc-900 text-gray-300 border-zinc-800 hover:bg-zinc-800 hover:border-blue-500/40 hover:text-white"
              }
            `}
          >
            PS4
          </button>

          <button
            onClick={() => changePlatform("PS5")}
            className={`
              px-6
              py-3
              rounded-xl
              font-bold
              transition-all
              duration-300
              border
              ${
                selectedPlatform === "PS5"
                  ? "bg-blue-600 text-white border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.25)]"
                  : "bg-zinc-900 text-gray-300 border-zinc-800 hover:bg-zinc-800 hover:border-blue-500/40 hover:text-white"
              }
            `}
          >
            PS5
          </button>

        </div>

        {/* Search */}
        <div className="relative max-w-2xl mx-auto mb-10">

          <input
            type="text"
            placeholder={`🔍 ابحث في خدمات ${selectedPlatform}...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="
              w-full
              bg-zinc-900
              border
              border-zinc-800
              rounded-2xl
              p-4
              text-white
              placeholder:text-gray-500
              outline-none
              focus:border-blue-500
              transition
              shadow-lg
            "
          />

          {query && (
            <button
              onClick={() => setQuery("")}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-400
                hover:text-white
                text-xl
                transition
              "
            >
              ×
            </button>
          )}

        </div>

        {/* Products */}
        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-400">
              جاري تحميل الخدمات...
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (

          <div className="text-center py-16">

            <div className="text-5xl mb-4">
              🔍
            </div>

            <h2 className="text-xl font-bold text-white">
              {query
                ? "مفيش خدمات مطابقة للبحث"
                : `لا توجد خدمات لـ ${selectedPlatform}`}
            </h2>

            {query && (
              <p className="text-gray-400 mt-2">
                جرب اسم خدمة مختلف
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