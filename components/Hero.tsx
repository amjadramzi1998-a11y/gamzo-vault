export default function Hero() {
  return (
    <section className="mt-10 rounded-3xl overflow-hidden relative">

      <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-black to-red-950"></div>

      <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center"></div>


      <div className="relative z-10 py-16 sm:py-24 px-6 sm:px-10 text-center">


        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-wider">
          GAMZO VAULT
        </h1>


        <p className="text-blue-500 text-lg sm:text-2xl font-bold mt-4 tracking-[5px] sm:tracking-[8px]">
          PLAY TO WIN
        </p>


        <div className="flex flex-col sm:flex-row justify-center gap-5 mt-12">


          <a
            href="/games"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-bold transition"
          >
            🎮 تصفح الألعاب
          </a>


          <a
            href="/offers"
            className="border border-red-500 hover:bg-red-600 px-8 py-4 rounded-xl font-bold transition"
          >
            🔥 أحدث العروض
          </a>


        </div>


      </div>


    </section>
  );
}