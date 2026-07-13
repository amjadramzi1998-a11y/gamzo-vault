"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import GameCard from "@/components/GameCard";
import { supabase } from "@/lib/supabase";

export default function GamesPage() {
  const [games, setGames] = useState<any[]>([]);
  const [platform, setPlatform] = useState("PS4");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGames();
  }, [platform]);

  async function loadGames() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", "games")
      .eq("platform", platform);

    console.log("GAMES:", data);
    console.log("ERROR:", error);

    if (!error) {
      setGames(data || []);
    } else {
      setGames([]);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-8">
          الألعاب
        </h1>

        <div className="flex gap-4 mb-8">
          {["PS4", "PS5", "PC"].map((item) => (
            <button
              key={item}
              onClick={() => setPlatform(item)}
              className={`px-6 py-3 rounded-xl font-bold transition ${
                platform === item
                  ? "bg-blue-600"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-gray-400">
            جاري تحميل الألعاب...
          </p>
        ) : games.length === 0 ? (
          <p className="text-gray-400">
            لا توجد ألعاب في قسم {platform}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {games.map((game) => (
              <GameCard
                key={game.id}
                game={game}
              />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
