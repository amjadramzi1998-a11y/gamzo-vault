"use client";

import Link from "next/link";
import { addToCart } from "@/lib/cart";

type Product = {
  id: number;
  name: string;
  image: string;
  category: string;
  platform?: string;
  description?: string;
};

export default function GameCard({ game }: { game: Product }) {

  const buttonText =
    game.category === "games"
      ? "عرض اللعبة"
      : game.category === "playstation"
      ? "عرض الجهاز"
      : game.category === "accessories"
      ? "عرض الإكسسوار"
      : game.category === "services"
      ? "عرض الخدمة"
      : game.category === "offers"
      ? "عرض العرض"
      : "عرض";


  const link =
    game.category === "games"
      ? `/games/${game.id}`
      : game.category === "playstation"
      ? `/playstation/${game.id}`
      : game.category === "accessories"
      ? `/accessories/${game.id}`
      : game.category === "services"
      ? `/services/${game.id}`
      : game.category === "offers"
      ? `/offers/${game.id}`
      : "#";


  const categoryName =
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

    alert("تمت إضافة المنتج للسلة 🛒");
  }


  return (
    <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-blue-500 transition duration-300 group">


      <div className="overflow-hidden">
        <img
          src={game.image}
          alt={game.name}
          className="w-full h-48 sm:h-60 object-cover group-hover:scale-110 transition duration-500"
        />
      </div>



      <div className="p-4 sm:p-5">


        <span className="inline-block bg-blue-600 px-3 py-1 rounded-full text-xs font-bold mb-3">
          {categoryName}
        </span>



        <h2 className="text-lg sm:text-xl font-bold line-clamp-2 min-h-[56px]">
          {game.name}
        </h2>



        {game.platform && (
          <p className="text-blue-400 mt-2 font-bold">
            {game.platform}
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
          className="block w-full mt-3 bg-red-600 hover:bg-red-700 py-3 rounded-xl font-bold text-center transition active:scale-95"
        >
          {buttonText}
        </Link>


      </div>


    </div>
  );
}