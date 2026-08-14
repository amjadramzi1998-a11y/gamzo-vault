"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";
import { addToCart } from "@/lib/cart";

type Product = {
  id: number;
  name: string;
  image: string;
  category: string;
  platform?: string;
  description?: string;
  price?: number | string;
  old_price?: number | string;
};

export default function OffersPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", "offers")
      .order("id", { ascending: false });

    if (!error) {
      setProducts((data as Product[]) || []);
    } else {
      setProducts([]);
    }

    setLoading(false);
  }

  const filteredProducts = products.filter((product) => {
    const searchText = query.toLowerCase().trim();

    return (
      !searchText ||
      product.name?.toLowerCase().includes(searchText) ||
      product.description?.toLowerCase().includes(searchText)
    );
  });

 function getProductLink(product: Product) {
  return `/offers/${product.id}`;
}

  function handleAddToCart(product: Product) {
    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      category: product.category,
    });

    toast.success(`تمت إضافة ${product.name} إلى السلة 🛒`);
  }

  function calculateDiscount(
    price?: number | string,
    oldPrice?: number | string
  ) {
    const current = Number(price);
    const old = Number(oldPrice);

    if (!current || !old || old <= current) {
      return null;
    }

    return Math.round(((old - current) / old) * 100);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-10 sm:py-12">

        {/* Page Header */}
        <div className="mb-8 sm:mb-10">

          <h1
            className="text-4xl sm:text-5xl font-black tracking-wide text-white mb-3"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            <span className="text-blue-500 drop-shadow-[0_0_25px_rgba(37,99,235,0.55)]">
              ATOM
            </span>{" "}
            OFFERS
          </h1>

          <p className="text-gray-400 text-sm sm:text-base max-w-2xl">
            أقوى العروض والخصومات المتاحة على منتجات ATOM.
          </p>

        </div>

        {/* Search */}
        <div className="relative max-w-2xl mx-auto mb-10">

          <input
            type="text"
            placeholder="🔍 ابحث في العروض..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="
              w-full
              bg-zinc-900
              border
              border-zinc-800
              rounded-2xl
              p-4
              text-white
              placeholder:text-gray-500
              outline-none
              focus:border-blue-500
              transition
              shadow-lg
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

        {/* Products */}
        {loading ? (

          <div className="text-center py-16">
            <p className="text-gray-400">
              جاري تحميل العروض...
            </p>
          </div>

        ) : filteredProducts.length === 0 ? (

          <div className="text-center py-16">

            <div className="text-5xl mb-4">
              🔍
            </div>

            <h2 className="text-xl font-bold text-white">
              {query
                ? "مفيش عروض مطابقة للبحث"
                : "مفيش عروض متاحة حاليًا"}
            </h2>

            {query && (
              <p className="text-gray-400 mt-2">
                جرب اسم منتج مختلف
              </p>
            )}

          </div>

        ) : (

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">

            {filteredProducts.map((product) => {

              const discount = calculateDiscount(
                product.price,
                product.old_price
              );

              const currentPrice = Number(product.price);
              const oldPrice = Number(product.old_price);

              return (
                <div
                  key={product.id}
                  className="
                    relative
                    group
                    bg-zinc-950
                    border
                    border-zinc-800
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
<div
  className="
    absolute
    top-3
    -right-11
    rotate-45
    bg-red-600
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
                  {/* Image */}
                  <div className="relative w-full h-60 overflow-hidden bg-zinc-900">

                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="
                        object-contain
                        p-4
                        group-hover:scale-105
                        transition-transform
                        duration-500
                      "
                      unoptimized
                    />

                  </div>

                  {/* Content */}
                  <div className="p-5">

                    <span className="
                      inline-block
                      bg-blue-600/15
                      text-blue-400
                      border
                      border-blue-500/20
                      text-xs
                      px-3
                      py-1
                      rounded-full
                      mb-3
                    ">
                      🔥 عرض خاص
                    </span>

                    <h2 className="
                      text-lg
                      sm:text-xl
                      font-bold
                      min-h-[56px]
                    ">
                      {product.name}
                    </h2>

                    {/* Price */}
                    <div className="mt-4">

                      {oldPrice > currentPrice && (
                        <p className="text-gray-500 text-sm line-through">
                          {oldPrice.toLocaleString("en-US")} جنيه
                        </p>
                      )}

                      <p className="
                        text-2xl
                        font-black
                        text-blue-400
                        mt-1
                      ">
                        {currentPrice.toLocaleString("en-US")} جنيه
                      </p>
                      {discount && (
  <p className="text-red-500 text-sm font-bold mt-2">
    🔥 خصم {discount}%
  </p>
)}

                    </div>

                    {/* Cart */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="
                        w-full
                        mt-5
                        bg-blue-600
                        hover:bg-blue-700
                        py-3
                        rounded-xl
                        font-bold
                        transition
                        active:scale-95
                      "
                    >
                      🛒 أضف للسلة
                    </button>

                    {/* Details */}
                    <Link
                      href={getProductLink(product)}
                      className="
                        block
                        w-full
                        mt-3
                        border
                        border-blue-500/50
                        text-blue-400
                        hover:bg-blue-600
                        hover:text-white
                        py-3
                        rounded-xl
                        text-center
                        font-bold
                        transition
                        active:scale-95
                      "
                    >
                      عرض التفاصيل
                    </Link>

                  </div>

                </div>
              );
            })}

          </div>

        )}

      </div>
    </main>
  );
}