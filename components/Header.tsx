"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.length);
    };

    updateCart();

    window.addEventListener("storage", updateCart);
    window.addEventListener("cartUpdated", updateCart);

    return () => {
      window.removeEventListener("storage", updateCart);
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);


  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-zinc-800">

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">


        <Link href="/" className="flex items-center gap-3">

          <img
            src="/efdeb9c4-4d0c-4653-adbb-ecde5fee0381.png"
            alt="Gamzo"
            className="w-12 h-12 rounded-xl hover:scale-110 transition"
          />

          <div>
            <h1 className="text-2xl font-extrabold text-blue-500">
              GAMZO
            </h1>

            <p className="text-xs text-gray-400">
              Gaming Store
            </p>
          </div>

        </Link>



        <nav className="hidden md:flex items-center gap-8 font-semibold">

          <Link href="/">الرئيسية</Link>
          <Link href="/games">الألعاب</Link>
          <Link href="/playstation">PlayStation</Link>
          <Link href="/accessories">الإكسسوارات</Link>
          <Link href="/services">الخدمات</Link>
          <Link href="/offers">العروض</Link>

        </nav>



        <div className="flex items-center gap-3">


          <Link
            href="/cart"
            className="relative bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-xl font-bold"
          >
            🛒

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}

          </Link>



          <a
            href="https://wa.me/201015401976"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block bg-green-600 hover:bg-green-700 px-5 py-2 rounded-xl font-bold"
          >
            واتساب
          </a>



          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden bg-zinc-800 px-3 py-2 rounded-xl text-xl"
          >
            ☰
          </button>


        </div>

      </div>



      {menuOpen && (
        <nav className="md:hidden bg-zinc-950 border-t border-zinc-800 px-6 py-5 flex flex-col gap-4 font-bold">

          <Link href="/" onClick={() => setMenuOpen(false)}>
            الرئيسية
          </Link>

          <Link href="/games" onClick={() => setMenuOpen(false)}>
            🎮 الألعاب
          </Link>

          <Link href="/playstation" onClick={() => setMenuOpen(false)}>
            🕹️ PlayStation
          </Link>

          <Link href="/accessories" onClick={() => setMenuOpen(false)}>
            🎧 الإكسسوارات
          </Link>

          <Link href="/services" onClick={() => setMenuOpen(false)}>
            🛠️ الخدمات
          </Link>

          <Link href="/offers" onClick={() => setMenuOpen(false)}>
            🔥 العروض
          </Link>


          <a
            href="https://wa.me/201015401976"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-center py-3 rounded-xl"
          >
            واتساب
          </a>

        </nav>
      )}

    </header>
  );
}