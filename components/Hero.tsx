export default function Hero() {
  return (
    <section className="mt-6 sm:mt-10 mx-2 sm:mx-0 rounded-3xl overflow-hidden relative h-[420px] sm:h-[600px]">

      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-110 blur-[2px] z-0"
      >
        <source src="/gamzo-banner.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/35 z-10"></div>

      {/* Black Glow */}
      <div className="absolute inset-0 bg-black/35 z-10"></div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 sm:px-10 py-8">

        {/* Logo */}
        <h1 className="text-3xl sm:text-6xl md:text-8xl font-black tracking-wide animate-[logoShow_1s_ease-out]">

          <span className="relative inline-block overflow-hidden text-blue-500 drop-shadow-[0_0_45px_rgba(37,99,235,1)]">
            GAMZO

            <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-60 animate-[shine_6s_infinite]"></span>
          </span>

          <span className="text-white ml-2 sm:ml-3 drop-shadow-[0_0_35px_rgba(255,255,255,0.8)]">
            VAULT
          </span>

        </h1>

        {/* Slogan */}
        <p className="mt-3 sm:mt-6 text-lg sm:text-3xl md:text-4xl font-black tracking-[6px] sm:tracking-[12px] uppercase text-red-500 drop-shadow-[0_0_35px_rgba(239,68,68,1)] animate-[sloganShow_1.3s_ease-out]">
          PLAY TO WIN
        </p>

        {/* Description */}
        <p className="text-gray-300 mt-3 sm:mt-5 max-w-xl text-xs sm:text-lg">
          مكتبة الألعاب والخدمات وكل جديد في عالم الجيمينج
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row w-full sm:w-auto justify-center gap-3 sm:gap-5 mt-6 sm:mt-12">

          <a
            href="/games"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 px-8 py-3 sm:py-4 rounded-xl font-bold transition duration-300 shadow-[0_0_25px_rgba(37,99,235,0.7)] hover:shadow-[0_0_45px_rgba(37,99,235,1)] hover:scale-105"
          >
            🎮 تصفح الألعاب
          </a>

          <a
            href="/offers"
            className="w-full sm:w-auto border border-red-500 text-white hover:bg-red-600 px-8 py-3 sm:py-4 rounded-xl font-bold transition duration-300 shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:shadow-[0_0_40px_rgba(239,68,68,1)] hover:scale-105"
          >
            🔥 أحدث العروض
          </a>

        </div>

      </div>

    </section>
  );
}