
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
};

export default function LaptopCard({ laptop }: { laptop: Laptop }) {
  function handleAddToCart() {
    addToCart({
      id: laptop.id,
      name: laptop.name,
      image: laptop.image,
      category: laptop.category,
    });

    toast.success(`تمت إضافة ${laptop.name} إلى السلة 🛒`);
  }

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden group">

      <Link href={`/laptops/${laptop.id}`}>
        <div className="relative w-full h-60 overflow-hidden bg-zinc-900">
          <Image
            src={laptop.image}
            alt={laptop.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        </div>
      </Link>

      <div className="p-5">
        <h2 className="text-xl font-bold min-h-[56px]">
          {laptop.name}
        </h2>

        <p className="text-green-400 text-xl font-bold mt-3">
          💰 {laptop.price} جنيه
        </p>

        <button
          onClick={handleAddToCart}
          className="w-full mt-5 bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold transition-all active:scale-95"
        >
          🛒 أضف للسلة
        </button>

        <Link
          href={`/laptops/${laptop.id}`}
          className="block w-full mt-3 bg-red-600 hover:bg-red-700 py-3 rounded-xl text-center font-bold transition-all active:scale-95"
        >
          💻 عرض اللابتوب
        </Link>
      </div>

    </div>
  );
}

