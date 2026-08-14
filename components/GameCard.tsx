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
  stock?: number;
  price?: number | string;
  old_price?: number | string;
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

  const stock = Number(game.stock ?? 0);
  const isOutOfStock = stock <= 0;
  const isLastItem = stock === 1;

  const currentPrice = Number(game.price ?? 0);
  const oldPrice = Number(game.old_price ?? 0);

  const hasDiscount =
    game.category === "offers" &&
    oldPrice > 0 &&
    currentPrice > 0 &&
    oldPrice > currentPrice;

  const discount = hasDiscount
    ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100)
    : 0;

  function handleAddToCart() {
    if (isOutOfStock) {
      toast.error("المنتج غير متاح حاليًا ❌");
      return;
    }

   addToCart({
  id: game.id,
  name: game.name,
  image: game.image,
  category: game.category,
});

    toast.success(`تمت إضافة ${game.name} إلى السلة 🛒`);
  }

  return (
    <div
      className="
        relative
        group
        bg-zinc-950
        border border-zinc-800
        rounded-2xl
        overflow-hidden
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-blue-500/50
        hover:shadow-[0_15px_40px_rgba(37,99,235,0.15)]
      "
    >
      {/* Special Offer Ribbon */}
      {game.category === "offers" && (
        <div
          className="
            absolute
            top-3
            -right-11
            rotate-45
            bg-blue-600
            text-white
            text-[10px]
            font-bold
            py-1
            w-32
            text-center
            shadow-lg
            z-20
          "
        >
          خصم خاص
        </div>
      )}

      {/* Stock Badge */}
      {isOutOfStock ? (
        <div
          className="
            absolute
            top-3
            left-3
            z-30
            bg-red-600
            text-white
            text-xs
            font-black
            px-3
            py-2
            rounded-xl
            shadow-lg
          "
        >
          ❌ غير متاح
        </div>
      ) : isLastItem ? (
        <div
          className="
            absolute
            top-3
            left-3
            z-30
            bg-orange-500
            text-white
            text-xs
            font-black
            px-3
            py-2
            rounded-xl
            shadow-lg
          "
        >
          ⚡ آخر قطعة
        </div>
      ) : (
        <div
          className="
            absolute
            top-3
            left-3
            z-30
            bg-green-600
            text-white
            text-xs
            font-black
            px-3
            py-2
            rounded-xl
            shadow-lg
          "
        >
          ✅ متاح
        </div>
      )}

      {/* Discount Badge */}
      {hasDiscount && (
        <div
          className="
            absolute
            top-16
            right-3
            z-30
            bg-red-600
            text-white
            text-xs
            font-black
            px-3
            py-2
            rounded-xl
            shadow-lg
          "
        >
          خصم {discount}%
        </div>
      )}

      {/* Product Image */}
      <Link href={link}>
        <div className="relative w-full h-64 overflow-hidden bg-zinc-900">
          <Image
            src={game.image}
            alt={game.name}
            fill
            className="
              object-contain
              p-2
              transition-transform
              duration-700
              group-hover:scale-110
            "
            unoptimized
          />

          {/* Bottom Gradient */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/45
              via-transparent
              to-transparent
              pointer-events-none
            "
          />

          {/* Blue Edge Glow */}
          <div
            className="
              absolute
              inset-0
              ring-1
              ring-inset
              ring-white/5
              group-hover:ring-blue-500/30
              transition-all
              duration-300
              pointer-events-none
            "
          />

          {/* Size - Games Only */}
          {game.category === "games" && game.size && (
            <div
              className="
                absolute
                top-3
                left-3
                bg-black/70
                backdrop-blur-md
                px-3
                py-1
                rounded-full
                text-xs
                font-bold
                border border-zinc-700
              "
            >
              💾 {game.size} GB
            </div>
          )}

          {/* Rating - Games Only */}
          {game.category === "games" && (
            <div
              className="
                absolute
                top-3
                right-3
                bg-black/75
                backdrop-blur-md
                px-3
                py-2
                rounded-xl
                border border-blue-500/40
                shadow-[0_0_15px_rgba(37,99,235,0.12)]
              "
            >
              {Number(game.rating_count) > 0 ? (
                <>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">⭐</span>

                    <span className="text-white font-bold">
                      {Number(game.rating_average).toFixed(1)}
                    </span>
                  </div>

                  <p className="text-[10px] text-gray-300 text-center mt-1">
                    ({game.rating_count} تقييم)
                  </p>
                </>
              ) : (
                <p className="text-xs text-white">
                  ⭐ كن أول من يقيم
                </p>
              )}
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">

        {/* Category */}
        <span
          className="
            inline-block
            bg-blue-600/10
            text-blue-400
            border border-blue-500/30
            text-xs
            px-3
            py-1
            rounded-full
            mb-3
            font-bold
          "
        >
          {categoryText}
        </span>

        {/* Product Name */}
        <h2
          className="
            text-xl
            font-bold
            min-h-[56px]
            text-white
            group-hover:text-blue-400
            transition-colors
            duration-300
          "
        >
          {game.name}
        </h2>

        {/* Platform */}
        {game.platform && (
          <p className="text-blue-400 font-bold mt-2">
            🎮 {game.platform}
          </p>
        )}

        {/* Price */}
        {game.price != null && (
          <div className="mt-3">

            {hasDiscount && (
              <p className="text-gray-500 text-sm line-through">
                {oldPrice.toLocaleString("en-US")} جنيه
              </p>
            )}

            <p className="text-2xl font-black text-blue-400">
              {currentPrice.toLocaleString("en-US")} جنيه
            </p>

            {hasDiscount && (
              <p className="text-green-400 text-xs font-bold mt-1">
                وفر {(oldPrice - currentPrice).toLocaleString("en-US")} جنيه
              </p>
            )}

          </div>
        )}

        {/* Add To Cart */}
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`
            w-full
            mt-5
            py-3
            rounded-xl
            font-bold
            transition-all
            duration-300
            ${
              isOutOfStock
                ? "bg-zinc-800 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.35)] active:scale-95"
            }
          `}
        >
          {isOutOfStock
            ? "❌ غير متاح حاليًا"
            : "🛒 أضف للسلة"}
        </button>

        {/* View Product */}
        <Link
          href={link}
          className="
            block
            w-full
            mt-3
            border
            border-blue-500/70
            text-white
            hover:bg-blue-600/15
            hover:border-blue-400
            hover:shadow-[0_0_18px_rgba(37,99,235,0.2)]
            py-3
            rounded-xl
            text-center
            font-bold
            transition-all
            duration-300
            active:scale-95
          "
        >
          {buttonText}
        </Link>

      </div>
    </div>
  );
}