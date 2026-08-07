export default function Hero() {
  return (
    <section className="relative mt-4 h-[520px] sm:h-[650px] overflow-hidden rounded-[45px] mx-3 sm:mx-6 bg-black border border-zinc-800/60">


      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden rounded-[45px]">

        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 blur-[3px]"
        >
          <source src="/atom-banner.mp4" type="video/mp4" />
        </video>

      </div>



      {/* Soft Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 rounded-[45px]"></div>



      {/* Smooth Edges Glow */}
      <div className="absolute inset-0 rounded-[45px] ring-1 ring-white/10"></div>



      {/* Smooth Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent rounded-b-[45px]"></div>




      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">


        {/* Logo */}
        <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-wide">


          {/* ATOM */}
          <span className="relative -top-8 inline-block overflow-hidden text-blue-500 drop-shadow-[0_0_45px_rgba(37,99,235,1)] animate-[logoShow_1s_ease-out,pulseGlow_3s_infinite]">

            ATOM


            {/* Shine */}
            <span className="absolute top-0 left-[-120%] w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-70 animate-[shine_3s_infinite]"></span>


          </span>



          {/* WORLD */}
          <span className="text-white ml-2">
            WORLD
          </span>


        </h1>




        {/* Slogan */}
        <p className="mt-3 text-lg sm:text-3xl font-black tracking-[8px] text-white">
          POWER YOUR WORLD
        </p>




        {/* Description */}
        <p className="text-gray-300 mt-4 max-w-xl text-sm sm:text-lg">
          نبني عالمك الرقمي بأحدث التكنولوجيا والأجهزة وتجارب الجيمينج
        </p>




        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">


          <a
            href="/games"
            className="bg-blue-600 hover:bg-blue-500 px-8 py-3 rounded-xl font-bold transition shadow-lg"
          >
            ⚡ اكتشف منتجاتنا
          </a>



          <a
            href="/offers"
            className="border border-blue-500 px-8 py-3 rounded-xl font-bold hover:bg-blue-600 transition"
          >
            🔥 أحدث العروض
          </a>


        </div>


      </div>


    </section>
  );
}