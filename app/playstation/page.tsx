"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import GameCard from "@/components/GameCard";
import { supabase } from "@/lib/supabase";

export default function PlayStationPage() {
  const [devices, setDevices] = useState<any[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState("PS4");
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
      setDevices(data || []);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

  <h1 className="text-4xl font-bold">
    🕹️ أجهزة PlayStation
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
            جاري تحميل الأجهزة...
          </p>
        ) : devices.length === 0 ? (
          <p className="text-gray-400">
            لا توجد أجهزة حالياً.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {devices
  .filter((device) => device.platform === selectedPlatform)
  .map((device) => (
              <GameCard
                key={device.id}
                game={device}
              />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}