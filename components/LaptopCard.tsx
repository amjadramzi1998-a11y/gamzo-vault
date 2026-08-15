"use client";

import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { addToCart } from "@/lib/cart";

type Laptop = {
  id: number;
  name: string;
  image: string;
  category: string;
  price?: number | string;
  stock?: number | null;
};

export default function LaptopCard({ laptop }: { laptop: Laptop }) {
  const stock = Number(laptop.stock ?? 0);

  const isOutOfStock = stock <= 0;
  const isLastItem = stock === 1;

  function handleAddToCart() {
    if (isOutOfStock) {
      toast.error("اللابتوب غير متاح حاليًا ❌");
      return;
    }

    addToCart({
      id: laptop.id,
      name: laptop.name,
      image: laptop.image,
      category: laptop.category,
    });

    toast.success(`تمت إضافة ${laptop.name} إلى السلة 🛒`);
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
      {/* Laptop Image */}
      <Link href={`/laptops/${laptop.id}`}>
        <div className="relative w-full h-64 overflow-hidden bg-zinc-900">

          <Image
            src={laptop.image}
            alt={laptop.name}
            fill
            className="
              object-contain
              p-1
              transition-transform
              duration-700
              group-hover:scale-110
            "
            unoptimized
          />

          {/* Image Overlay */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/40
              via-transparent
              to-transparent
              pointer-events-none
            "
          />

          {/* Blue Glow */}
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

        </div>
      </Link>

      {/* Content */}
      <div className="p-5">

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
          {laptop.name}
        </h2>

        {/* Price */}
        <div className="mt-4 flex items-baseline gap-2">

          <span className="text-3xl font-black text-blue-400 tracking-tight">
            {Number(laptop.price ?? 0).toLocaleString("en-US")}
          </span>

          <span className="text-sm font-semibold text-gray-400">
            جنيه
          </span>

        </div>

        {/* Stock Status */}
        <p
          className={`
            text-sm
            font-bold
            mt-2
            ${
              isOutOfStock
                ? "text-red-400"
                : isLastItem
                ? "text-orange-400"
                : "text-green-400"
            }
          `}
        >
          {isOutOfStock
            ? "🔴 غير متاح حاليًا"
            : isLastItem
            ? "⚡ آخر قطعة"
            : "🟢 متاح الآن"}
        </p>

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

        {/* View Laptop */}
        <Link
          href={`/laptops/${laptop.id}`}
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
          💻 عرض اللابتوب
        </Link>

      </div>
    </div>
  );
}