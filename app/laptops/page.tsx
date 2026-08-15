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
  stock?: number;
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

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-10">

        {/* Page Header */}
        <div className="mb-8 sm:mb-10">

          <h1
            className="
              text-4xl
              sm:text-5xl
              font-black
              tracking-wide
              text-white
              mb-3
            "
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            <span className="text-blue-500 drop-shadow-[0_0_25px_rgba(37,99,235,0.55)]">
              ATOM
            </span>{" "}
            LAPTOPS
          </h1>

          <p className="text-gray-400 text-sm sm:text-base max-w-2xl">
            اكتشف مجموعة مختارة من اللابتوبات المناسبة للشغل، الدراسة والاستخدام اليومي.
          </p>

        </div>

        {/* Search */}
        <div className="relative max-w-3xl mb-10">

          <div className="absolute inset-0 rounded-2xl bg-blue-500/5 blur-xl pointer-events-none" />

          <input
            type="text"
            placeholder="🔍 ابحث عن لابتوب..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="
              relative
              w-full
              bg-zinc-900/90
              backdrop-blur-md
              border border-zinc-800
              rounded-2xl
              p-4
              pr-5
              text-white
              placeholder:text-gray-500
              outline-none
              focus:border-blue-500/70
              focus:shadow-[0_0_25px_rgba(37,99,235,0.15)]
              transition-all
              duration-300
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