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
    <header className="relative z-50 bg-black border-b border-zinc-900 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">

      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">


        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3">

          <img
            src="/atom-character.png"
            alt="ATOM"
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain hover:scale-110 transition"
          />


          <div>

           <h1
  className="text-xl sm:text-2xl font-black text-blue-500 tracking-widest"
  style={{ fontFamily: "var(--font-orbitron)" }}
>
  ATOM
</h1>
            <p className="text-[10px] sm:text-xs text-gray-400">
              POWER YOUR WORLD
            </p>

          </div>


        </Link>



        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 font-semibold">

          <Link href="/" className="hover:text-blue-500 transition">
            الرئيسية
          </Link>

          <Link href="/games" className="hover:text-blue-500 transition">
            الألعاب
          </Link>

          <Link href="/playstation" className="hover:text-blue-500 transition">
            PlayStation
          </Link>

          <Link href="/accessories" className="hover:text-blue-500 transition">
            الإكسسوارات
          </Link>

          <Link href="/services" className="hover:text-blue-500 transition">
            الخدمات
          </Link>

          <Link href="/offers" className="hover:text-blue-500 transition">
            العروض
          </Link>

        </nav>



        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">


          <Link
            href="/cart"
            className="relative bg-zinc-800 hover:bg-zinc-700 px-3 sm:px-4 py-2 rounded-xl font-bold transition"
          >

            🛒

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}

          </Link>



          <a
            href="https://wa.me/201067981310"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block bg-green-600 hover:bg-green-700 px-5 py-2 rounded-xl font-bold transition"
          >
            واتساب
          </a>



          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden bg-zinc-800 px-3 py-2 rounded-xl text-lg"
          >
            ☰
          </button>


        </div>


      </div>



      {/* Mobile Menu */}
      {menuOpen && (

        <nav className="md:hidden bg-zinc-950 border-t border-zinc-800 px-5 py-5 flex flex-col gap-4 font-bold">


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
            href="https://wa.me/201067981310"
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