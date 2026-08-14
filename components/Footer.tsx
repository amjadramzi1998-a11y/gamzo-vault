import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative mt-16 bg-black/80 backdrop-blur-md border-t border-zinc-800">

      {/* Blue Top Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/70 to-transparent" />


      <div className="max-w-7xl mx-auto px-5 py-14 grid md:grid-cols-3 gap-10">


        {/* Brand */}
        <div>

          <h2
            className="text-3xl sm:text-4xl font-black text-blue-500 tracking-widest drop-shadow-[0_0_20px_rgba(37,99,235,0.35)]"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            ATOM
          </h2>


          <p className="text-gray-400 mt-2 text-sm sm:text-base tracking-[4px]">
            POWER YOUR WORLD
          </p>


          <p className="text-gray-500 mt-6 leading-8 max-w-md">
            منصة متكاملة لعالم التكنولوجيا والجيمينج،
            نوفر أحدث الأجهزة، اللابتوبات، الألعاب والإكسسوارات.
          </p>


        </div>



        {/* Sections */}
        <div>

          <h3 className="text-xl font-bold mb-6 text-white">
            الأقسام
          </h3>


          <div className="flex flex-col gap-3 text-gray-400">


            <Link
              href="/games"
              className="hover:text-blue-400 hover:translate-x-1 transition-all duration-300"
            >
              🎮 الألعاب
            </Link>


            <Link
              href="/playstation"
              className="hover:text-blue-400 hover:translate-x-1 transition-all duration-300"
            >
              🕹️ PlayStation
            </Link>


            <Link
              href="/laptops"
              className="hover:text-blue-400 hover:translate-x-1 transition-all duration-300"
            >
              💻 اللابتوبات
            </Link>


            <Link
              href="/accessories"
              className="hover:text-blue-400 hover:translate-x-1 transition-all duration-300"
            >
              🎧 الإكسسوارات
            </Link>


            <Link
              href="/services"
              className="hover:text-blue-400 hover:translate-x-1 transition-all duration-300"
            >
              🛠️ الخدمات
            </Link>


            <Link
              href="/offers"
              className="hover:text-blue-400 hover:translate-x-1 transition-all duration-300"
            >
              🔥 العروض
            </Link>


          </div>

        </div>




        {/* Contact */}
        <div>

          <h3 className="text-xl font-bold mb-6 text-white">
            تواصل معنا
          </h3>



          {/* WhatsApp */}
          <a
            href="https://wa.me/201067981310"
            target="_blank"
            rel="noopener noreferrer"
            className="
              block
              bg-green-600
              hover:bg-green-500
              px-5
              py-3
              rounded-xl
              text-center
              font-bold
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-[0_0_22px_rgba(34,197,94,0.25)]
            "
          >
            🟢 واتساب الطلبات
          </a>




          {/* Socials */}
          <div className="flex flex-wrap gap-4 mt-6 text-gray-400">


            <a
              href="https://www.facebook.com/ATOM1STORE"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 hover:-translate-y-1 transition-all duration-300"
            >
              Facebook
            </a>


            <a
              href="https://www.instagram.com/atom_stores"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 hover:-translate-y-1 transition-all duration-300"
            >
              Instagram
            </a>


            <a
              href="https://www.tiktok.com/@atom_stores"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:-translate-y-1 transition-all duration-300"
            >
              TikTok
            </a>


          </div>




          {/* Phone Numbers */}
          <div className="mt-6 text-gray-400 leading-8">

            <a
              href="tel:01015401976"
              className="block hover:text-blue-400 transition"
            >
              📞 01015401976
            </a>


            <a
              href="tel:01099358856"
              className="block hover:text-blue-400 transition"
            >
              📞 01099358856
            </a>

          </div>


        </div>


      </div>




      {/* Bottom */}
      <div className="border-t border-zinc-800 py-5 text-center">

        <p className="text-xs sm:text-sm text-gray-500">
          © 2026 ATOM - All Rights Reserved
        </p>

        <p className="text-[10px] sm:text-xs text-blue-500/70 mt-2 tracking-[3px]">
          POWER YOUR WORLD ⚡
        </p>

      </div>



    </footer>
  );
}