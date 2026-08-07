import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black/60 border-t border-zinc-800">


      <div className="max-w-7xl mx-auto px-5 py-12 grid md:grid-cols-3 gap-10">


        {/* Brand */}
        <div>

          <h2 className="text-3xl font-black text-blue-500">
            ATOM
          </h2>


          <p className="text-gray-400 mt-2 tracking-widest">
            POWER YOUR WORLD
          </p>


          <p className="text-gray-500 mt-5 leading-8">
            كل ما يخص الألعاب، أجهزة PlayStation،
            اللابتوبات، الإكسسوارات والخدمات التقنية
            في مكان واحد.
          </p>


        </div>



        {/* Sections */}
        <div>

          <h3 className="text-xl font-bold mb-5">
            الأقسام
          </h3>


          <div className="flex flex-col gap-3 text-gray-400">


            <Link href="/games" className="hover:text-blue-500 transition">
              🎮 الألعاب
            </Link>


            <Link href="/playstation" className="hover:text-blue-500 transition">
              🕹️ PlayStation
            </Link>


            <Link href="/accessories" className="hover:text-blue-500 transition">
              🎧 الإكسسوارات
            </Link>


            <Link href="/services" className="hover:text-blue-500 transition">
              🛠️ الخدمات
            </Link>


            <Link href="/offers" className="hover:text-blue-500 transition">
              🔥 العروض
            </Link>


          </div>

        </div>




        {/* Contact */}
        <div>

          <h3 className="text-xl font-bold mb-5">
            تواصل معنا
          </h3>



          <a
            href="https://wa.me/201067981310"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl text-center font-bold transition"
          >
            🟢 واتساب الطلبات
          </a>




          <div className="flex gap-4 mt-5 text-gray-400">


            <a
              href="https://www.facebook.com/ATOM1STORE"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition"
            >
              Facebook
            </a>



            <a
              href="https://www.instagram.com/atom_stores"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              Instagram
            </a>



            <a
              href="https://www.tiktok.com/@atom_stores"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              TikTok
            </a>


          </div>




          <div className="mt-5 text-gray-400 leading-8">

            📞 01015401976
            <br />
            📞 01099358856

          </div>


        </div>


      </div>




      <div className="border-t border-zinc-800 py-5 text-center text-gray-500">

        © 2026 ATOM - All Rights Reserved

      </div>



    </footer>
  );
}