"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  image: string;
  category: string;
  price?: number | string;
  description?: string;
};

type SearchBarProps = {
  products: Product[];
};

export default function SearchBar({ products }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const filteredProducts =
    query.trim().length > 0
      ? products
          .filter((product) => {
            const searchText = query.toLowerCase().trim();

            return (
              product.name?.toLowerCase().includes(searchText) ||
              product.category?.toLowerCase().includes(searchText) ||
              product.description?.toLowerCase().includes(searchText)
            );
          })
          .slice(0, 8)
      : [];

  function getLink(product: Product) {
    switch (product.category) {
      case "games":
        return `/games/${product.id}`;

      case "playstation":
        return `/playstation/${product.id}`;

      case "accessories":
        return `/accessories/${product.id}`;

      case "services":
        return `/services/${product.id}`;

      case "offers":
        return `/offers/${product.id}`;

      default:
        return "/";
    }
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto mt-6">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="🔍 ابحث عن أي منتج..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 pr-5 text-white placeholder:text-gray-500 outline-none focus:border-blue-500 transition shadow-lg"
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

      {/* Search Results */}
      {filteredProducts.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl z-50">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={getLink(product)}
              onClick={() => setQuery("")}
            >
              <div className="flex items-center gap-4 p-3 sm:p-4 hover:bg-zinc-900 transition border-b border-zinc-800 last:border-b-0">
                {/* Product Image */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="64px"
                    className="rounded-xl object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0 text-right">
                  <h3 className="font-bold text-white truncate">
                    {product.name}
                  </h3>

                  <p className="text-xs text-blue-400 mt-1">
                    {product.category}
                  </p>

                  {product.price && (
                    <p className="text-sm text-gray-300 mt-1">
                      {product.price} جنيه
                    </p>
                  )}
                </div>

                {/* Arrow */}
                <span className="text-gray-500 text-lg">←</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* No Results */}
      {query.trim() && filteredProducts.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-950 border border-zinc-800 rounded-2xl p-5 text-center text-gray-400 shadow-2xl z-50">
          😔 مفيش منتجات مطابقة للبحث
        </div>
      )}
    </div>
  );
}