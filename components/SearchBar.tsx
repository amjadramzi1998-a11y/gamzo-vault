"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

type Product = {
  id: number;
  name: string;
  image: string;
  category: string;
};

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    async function searchProducts() {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      const { data } = await supabase
        .from("products")
        .select("*")
        .ilike("name", `%${query}%`)
        .limit(8);

      setResults((data as Product[]) || []);
    }

    searchProducts();
  }, [query]);

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
    <div className="my-10 relative">
      <input
        type="text"
        placeholder="🔍 ابحث عن أي منتج..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-white outline-none focus:border-blue-500 transition"
      />

      {results.length > 0 && (
        <div className="absolute w-full mt-2 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl z-50">
          {results.map((product) => (
            <Link
              key={product.id}
              href={getLink(product)}
              onClick={() => {
                setQuery("");
                setResults([]);
              }}
            >
              <div className="flex items-center gap-4 p-4 hover:bg-zinc-800 transition">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={56}
                  height={56}
                  className="rounded-lg object-cover"
                />

                <div>
                  <h3 className="font-bold">{product.name}</h3>

                  <p className="text-sm text-blue-400">
                    {product.category}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}