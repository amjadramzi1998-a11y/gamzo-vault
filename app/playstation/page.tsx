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

export default function PlayStationPage() {
  const [devices, setDevices] = useState<Product[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState("PS4");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDevices();
  }, []);

  async function loadDevices() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", "playstation")
      .order("id", { ascending: false });

    if (!error) {
      setDevices((data as Product[]) || []);
    }

    setLoading(false);
  }

  const filteredDevices = devices.filter((device) => {
    const matchesPlatform = device.platform === selectedPlatform;

    const searchText = query.toLowerCase().trim();

    const matchesSearch =
      !searchText ||
      device.name?.toLowerCase().includes(searchText) ||
      device.description?.toLowerCase().includes(searchText) ||
      device.platform?.toLowerCase().includes(searchText);

    return matchesPlatform && matchesSearch;
  });

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <h1 className="text-4xl font-bold">
            🕹️ أجهزة PlayStation
          </h1>

          {/* Platforms */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                setSelectedPlatform("PS4");
                setQuery("");
              }}
              className={`px-6 py-2 rounded-xl font-bold transition ${
                selectedPlatform === "PS4"
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
            >
              PS4
            </button>

            <button
              onClick={() => {
                setSelectedPlatform("PS5");
                setQuery("");
              }}
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
            placeholder={`🔍 ابحث في أجهزة ${selectedPlatform}...`}
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
          <p className="text-gray-400 text-center">
            جاري تحميل الأجهزة...
          </p>
        ) : filteredDevices.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">

            {filteredDevices.map((device) => (
              <GameCard
                key={device.id}
                game={device}
              />
            ))}

          </div>
        ) : (
          <div className="text-center py-16">

            <div className="text-5xl mb-4">
              🔍
            </div>

            <h2 className="text-xl font-bold text-white">
              مفيش أجهزة مطابقة
            </h2>

            <p className="text-gray-400 mt-2">
              جرب كلمة بحث مختلفة
            </p>

          </div>
        )}

      </div>
    </main>
  );
}