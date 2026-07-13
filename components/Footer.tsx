import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 bg-zinc-950 border-t border-zinc-800 text-white">

      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-10">


        <div>
          <h2 className="text-3xl font-black text-blue-500">
            GAMZO
          </h2>

          <p className="text-gray-400 mt-2">
            Gaming Store
          </p>

          <p className="text-gray-500 mt-5 leading-8">
            كل ما يخص الألعاب، أجهزة PlayStation،
            الإكسسوارات والخدمات في مكان واحد.
          </p>
        </div>



        <div>
          <h3 className="text-xl font-bold mb-5">
            الأقسام
          </h3>

          <div className="flex flex-col gap-3 text-gray-400">

            <Link href="/games" className="hover:text-blue-500">
              🎮 الألعاب
            </Link>

            <Link href="/playstation" className="hover:text-blue-500">
              🕹️ PlayStation
            </Link>

            <Link href="/accessories" className="hover:text-blue-500">
              🎧 الإكسسوارات
            </Link>

            <Link href="/services" className="hover:text-blue-500">
              🛠️ الخدمات
            </Link>

            <Link href="/offers" className="hover:text-blue-500">
              🔥 العروض
            </Link>

          </div>
        </div>





        <div>

          <h3 className="text-xl font-bold mb-5">
            تواصل معنا
          </h3>


          <a
            href="https://wa.me/201015401976"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl text-center font-bold"
          >
            🟢 واتساب
          </a>



          <div className="flex gap-4 mt-5 text-gray-400">


            <a
              href="https://www.facebook.com/share/1MQ9LsYSk8/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              Facebook
            </a>



            <a
              href="https://www.instagram.com/gamzo_store?igsh=cDdzaDRndXk3Nmts&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
            >
              Instagram
            </a>



            <a
              href="https://www.tiktok.com/@gamzo_store?_r=1&_t=ZS-97z6LKRx7kf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              TikTok
            </a>


          </div>


        </div>


      </div>



      <div className="border-t border-zinc-800 py-5 text-center text-gray-500">
        © 2026 GAMZO - All Rights Reserved
      </div>


    </footer>
  );
}