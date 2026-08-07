"use client";

export default function LinkPage() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-5 py-10">

      <div className="w-full max-w-md text-center">


        {/* Logo */}
        <img
          src="/atom-character.png"
          alt="ATOM"
          className="w-24 h-24 mx-auto rounded-2xl mb-5 object-contain"
        />



        <h1 className="text-4xl font-black text-blue-500">
          ATOM
        </h1>



        <p className="text-gray-400 mt-2 tracking-widest">
          POWER YOUR WORLD
        </p>




        {/* Website */}
        <a
         href="https://atom-world.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-8 bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl font-bold transition shadow-lg shadow-blue-600/20"
        >
          🌐 دخول الموقع
        </a>




        {/* WhatsApp */}
        <a
          href="https://wa.me/201067981310"
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-4 bg-green-600 hover:bg-green-700 py-4 rounded-2xl font-bold transition"
        >
          💬 واتساب الطلبات
        </a>




        {/* Calls */}
        <a
          href="tel:01015401976"
          className="block mt-4 bg-zinc-800 hover:bg-zinc-700 py-4 rounded-2xl font-bold transition"
        >
          ☎️ 01015401976
        </a>



        <a
          href="tel:01099358856"
          className="block mt-4 bg-zinc-800 hover:bg-zinc-700 py-4 rounded-2xl font-bold transition"
        >
          ☎️ 01099358856
        </a>





        {/* Social */}
        <div className="grid grid-cols-3 gap-3 mt-6">


          <a
            href="https://www.instagram.com/atom_stores"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-pink-600 hover:scale-105 transition py-3 rounded-xl font-bold text-sm"
          >
            Instagram
          </a>




          <a
            href="https://www.tiktok.com/@atom_stores"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black border border-zinc-700 hover:scale-105 transition py-3 rounded-xl font-bold text-sm"
          >
            TikTok
          </a>




          <a
            href="https://www.facebook.com/ATOM1STORE"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-700 hover:scale-105 transition py-3 rounded-xl font-bold text-sm"
          >
            Facebook
          </a>



        </div>




        <p className="text-xs text-gray-500 mt-8">
          POWER YOUR WORLD ⚡
        </p>


      </div>


    </main>
  );
}