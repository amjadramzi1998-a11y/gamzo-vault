"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import LaptopCard from "@/components/LaptopCard";
import { supabase } from "@/lib/supabase";

type Laptop = {
  id: number;
  name: string;
  image: string;
  category: string;
  description?: string;
  price?: number | string;
};

export default function LaptopsPage() {
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLaptops();
  }, []);

  async function loadLaptops() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", "laptops")
      .order("id", { ascending: false });

    console.log("LAPTOPS:", data);
    console.log("ERROR:", error);

    if (!error) {
      setLaptops((data as Laptop[]) || []);
    } else {
      setLaptops([]);
    }

    setLoading(false);
  }

  const filteredLaptops = laptops.filter((laptop) => {
    const searchText = query.toLowerCase().trim();

    if (!searchText) return true;

    return (
      laptop.name?.toLowerCase().includes(searchText) ||
      laptop.description?.toLowerCase().includes(searchText)
    );
  });

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Title */}
        <h1 className="text-4xl font-bold mb-8">
          Laptop
        </h1>

        {/* Search */}
        <div className="relative max-w-2xl mb-10">
          <input
            type="text"
            placeholder="🔍 ابحث عن لابتوب..."
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

        {/* Loading */}
        {loading ? (
          <p className="text-gray-400">
            جاري تحميل اللابتوبات...
          </p>
        ) : filteredLaptops.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">
              💻
            </div>

            <h2 className="text-xl font-bold text-white">
              {query
                ? "مفيش لابتوبات مطابقة للبحث"
                : "لا توجد لابتوبات حاليًا"}
            </h2>

            {query && (
              <p className="text-gray-400 mt-2">
                جرب اسم لابتوب مختلف
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredLaptops.map((laptop) => (
              <LaptopCard
                key={laptop.id}
                laptop={laptop}
              />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}