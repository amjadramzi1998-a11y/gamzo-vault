"use client";

export default function LinkPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-6 text-center shadow-2xl">

        {/* Logo */}
        <img
          src="/efdeb9c4-4d0c-4653-adbb-ecde5fee0381.png"
          alt="GAMZO"
          className="w-24 h-24 mx-auto rounded-2xl mb-5"
        />

        <h1 className="text-4xl font-black text-blue-500">
          GAMZO
        </h1>

        <p className="text-gray-400 mt-2">
          Gaming Store
        </p>

        {/* Website */}
        <a
          href="https://gamzo-vault.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-8 bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl font-bold transition"
        >
          🎮 دخول الموقع
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/201015401976"
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-4 bg-green-600 hover:bg-green-700 py-4 rounded-2xl font-bold transition"
        >
          💬 واتساب الطلبات
        </a>

        {/* Call */}
        <a
          href="tel:01099358856"
          className="block mt-4 bg-zinc-800 hover:bg-zinc-700 py-4 rounded-2xl font-bold transition"
        >
          ☎️ اتصال مباشر
        </a>

        {/* Social */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <a
            href="https://www.instagram.com/gamzo_store"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-pink-600 hover:scale-105 transition py-3 rounded-xl font-bold text-sm"
          >
            Instagram
          </a>

          <a
            href="https://www.tiktok.com/@gamzo_store"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black border border-zinc-700 hover:scale-105 transition py-3 rounded-xl font-bold text-sm"
          >
            TikTok
          </a>

          <a
            href="https://www.facebook.com/people/GAMZO-STORE/61591464088028/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-700 hover:scale-105 transition py-3 rounded-xl font-bold text-sm"
          >
            Facebook
          </a>
        </div>

        <p className="text-xs text-gray-500 mt-8">
          PLAY TO WIN 🎮
        </p>

      </div>
    </main>
  );
}