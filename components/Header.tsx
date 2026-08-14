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
    <header className="relative z-50 bg-black/75 backdrop-blur-md border-b border-blue-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">

      {/* Blue Bottom Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/80 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-3"
        >
          <img
            src="/atom-character.png"
            alt="ATOM"
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain hover:scale-110 transition-transform duration-300"
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

          <Link
            href="/"
            className="relative text-white/90 hover:text-blue-400 transition-all duration-300 hover:-translate-y-[1px]"
          >
            الرئيسية
          </Link>

          <Link
            href="/games"
            className="relative text-white/90 hover:text-blue-400 transition-all duration-300 hover:-translate-y-[1px]"
          >
            الألعاب
          </Link>

          <Link
            href="/playstation"
            className="relative text-white/90 hover:text-blue-400 transition-all duration-300 hover:-translate-y-[1px]"
          >
            PlayStation
          </Link>

          <Link
            href="/laptops"
            className="relative text-white/90 hover:text-blue-400 transition-all duration-300 hover:-translate-y-[1px]"
          >
            اللابتوبات
          </Link>

          <Link
            href="/accessories"
            className="relative text-white/90 hover:text-blue-400 transition-all duration-300 hover:-translate-y-[1px]"
          >
            الإكسسوارات
          </Link>

          <Link
            href="/services"
            className="relative text-white/90 hover:text-blue-400 transition-all duration-300 hover:-translate-y-[1px]"
          >
            الخدمات
          </Link>

          <Link
            href="/offers"
            className="relative text-white/90 hover:text-blue-400 transition-all duration-300 hover:-translate-y-[1px]"
          >
            العروض
          </Link>

        </nav>


        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Cart */}
          <Link
            href="/cart"
            className="relative bg-zinc-800/90 hover:bg-zinc-700 px-3 sm:px-4 py-2 rounded-xl font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_18px_rgba(37,99,235,0.25)]"
          >
            🛒

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>


          {/* WhatsApp */}
          <a
            href="https://wa.me/201067981310"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block bg-green-600 hover:bg-green-500 px-5 py-2 rounded-xl font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_18px_rgba(34,197,94,0.3)]"
          >
            واتساب
          </a>


          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden bg-zinc-800 hover:bg-zinc-700 px-3 py-2 rounded-xl text-lg transition-all duration-300"
          >
            ☰
          </button>

        </div>

      </div>


      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-zinc-950/95 backdrop-blur-md border-t border-blue-500/20 px-5 py-5 flex flex-col gap-4 font-bold">

          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-400 transition-colors duration-300"
          >
            الرئيسية
          </Link>

          <Link
            href="/games"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-400 transition-colors duration-300"
          >
            🎮 الألعاب
          </Link>

          <Link
            href="/playstation"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-400 transition-colors duration-300"
          >
            🕹️ PlayStation
          </Link>

          <Link
            href="/laptops"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-400 transition-colors duration-300"
          >
            💻 اللابتوبات
          </Link>

          <Link
            href="/accessories"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-400 transition-colors duration-300"
          >
            🎧 الإكسسوارات
          </Link>

          <Link
            href="/services"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-400 transition-colors duration-300"
          >
            🛠️ الخدمات
          </Link>

          <Link
            href="/offers"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-400 transition-colors duration-300"
          >
            🔥 العروض
          </Link>


          {/* WhatsApp */}
          <a
            href="https://wa.me/201067981310"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-500 text-center py-3 rounded-xl transition-all duration-300 hover:-translate-y-1"
          >
            واتساب
          </a>

        </nav>
      )}

    </header>
  );
}