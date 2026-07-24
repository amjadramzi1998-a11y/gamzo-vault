"use client";

import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { addToCart } from "@/lib/cart";

type Product = {
  id: number;
  name: string;
  image: string;
  category: string;
  platform?: string;
  size?: number;
  rating_average?: number;
  rating_count?: number;
};

export default function GameCard({ game }: { game: Product }) {
  const link =
    game.category === "games"
      ? `/games/${game.id}`
      : game.category === "playstation"
      ? `/playstation/${game.id}`
      : game.category === "accessories"
      ? `/accessories/${game.id}`
      : game.category === "services"
      ? `/services/${game.id}`
      : `/offers/${game.id}`;

  const buttonText =
    game.category === "games"
      ? "عرض اللعبة"
      : game.category === "playstation"
      ? "عرض الجهاز"
      : game.category === "accessories"
      ? "عرض الإكسسوار"
      : game.category === "services"
      ? "عرض الخدمة"
      : "عرض العرض";

  const categoryText =
    game.category === "games"
      ? "🎮 لعبة"
      : game.category === "playstation"
      ? "🕹️ PlayStation"
      : game.category === "accessories"
      ? "🎧 إكسسوار"
      : game.category === "services"
      ? "🛠️ خدمة"
      : "🔥 عرض";

  function handleAddToCart() {
    addToCart({
      id: game.id,
      name: game.name,
      image: game.image,
      category: game.category,
    });

    toast.success(`تمت إضافة ${game.name} إلى السلة 🛒`);
  }

  return (
    <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-blue-500 transition duration-300 group">

      {game.category === "offers" && (
        <div className="absolute top-3 -right-11 rotate-45 bg-red-600 text-white text-[10px] font-bold py-1 w-32 text-center shadow-lg z-20">
          خصم خاص
        </div>
      )}

      <div className="relative w-full h-60 overflow-hidden">
        <Image
          src={game.image}
          alt={game.name}
          fill
          className="object-cover group-hover:scale-110 transition duration-500"
          unoptimized
        />

        {/* الحجم */}
        {game.category === "games" && game.size && (
          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur px-3 py-1 rounded-full text-xs font-bold border border-zinc-700">
            💾 {game.size} GB
          </div>
        )}

        {/* التقييم */}
        <div className="absolute top-3 right-3 bg-yellow-500/90 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          {Number(game.rating_count) > 0
            ? `⭐ ${Number(game.rating_average).toFixed(1)} (${game.rating_count})`
            : "⭐ جديد"}
        </div>

      </div>

      <div className="p-5">

        <span className="inline-block bg-blue-600 text-xs px-3 py-1 rounded-full mb-3">
          {categoryText}
        </span>

        <h2 className="text-xl font-bold min-h-[56px]">
          {game.name}
        </h2>

        {game.platform && (
          <p className="text-blue-400 font-bold mt-2">
            🎮 {game.platform}
          </p>
        )}

        <button
          onClick={handleAddToCart}
          className="w-full mt-5 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-bold transition active:scale-95"
        >
          🛒 أضف للسلة
        </button>

        <Link
          href={link}
          className="block w-full mt-3 bg-red-600 hover:bg-red-700 py-3 rounded-xl text-center font-bold transition active:scale-95"
        >
          {buttonText}
        </Link>

      </div>

    </div>
  );
}