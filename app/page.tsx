import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import CategoryCard from "../components/CategoryCard";
import { supabase } from "../lib/supabase";
import Hero from "../components/Hero";
import ProductSection from "../components/ProductSection";
import SiteRating from "@/components/SiteRating";

export const revalidate = 0;

export default async function Home() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: false });

  const { count: visitorsCount } = await supabase
    .from("visitors")
    .select("*", { count: "exact", head: true });

  console.log("PRODUCTS:", products);

  if (error) {
    return (
      <main className="min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-500">
            حدث خطأ أثناء تحميل البيانات
          </h1>

          <p className="mt-4 text-gray-400">
            {error.message}
          </p>
        </div>
      </main>
    );
  }

  const games =
    products?.filter((item: any) => item.category === "games") || [];

  const playstation =
    products?.filter((item: any) => item.category === "playstation") || [];

  const accessories =
    products?.filter((item: any) => item.category === "accessories") || [];

  const services =
    products?.filter((item: any) => item.category === "services") || [];

  const offers =
    products?.filter((item: any) => item.category === "offers") || [];

  return (
    <main className="min-h-screen text-white">
      <Header />

      <div className="max-w-7xl mx-auto px-6">
        <Hero />

        <SearchBar />
       <section className="mt-8 mb-10">
  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">

    <div className="flex flex-col lg:flex-row items-center justify-between gap-4">

      <div className="text-center lg:text-right">
        <p className="text-gray-300 text-sm">
          👥 <span className="text-blue-400 font-bold">GAMZO</span> عدد الزائرين
        </p>

        <h2 className="text-3xl font-black text-white">
          {(visitorsCount || 0).toLocaleString()}+
        </h2>
      </div>

      <SiteRating />

    </div>

  </div>
</section>

        <section className="mt-14">
          <h2 className="text-3xl font-bold mb-8">
            الأقسام
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
            <CategoryCard
              title="الألعاب"
              icon="🎮"
              href="/games"
            />

            <CategoryCard
              title="PlayStation"
              icon="🕹️"
              href="/playstation"
            />

            <CategoryCard
              title="الإكسسوارات"
              icon="🎧"
              href="/accessories"
            />

            <CategoryCard
              title="الخدمات"
              icon="🛠️"
              href="/services"
            />

            <CategoryCard
              title="العروض"
              icon="🔥"
              href="/offers"
            />
          </div>
        </section>

        <ProductSection
          title="🎮 أحدث الألعاب"
          products={games}
          href="/games"
        />

        <ProductSection
          title="🕹️ أجهزة PlayStation"
          products={playstation}
          href="/playstation"
        />

        <ProductSection
          title="🎧 أحدث الإكسسوارات"
          products={accessories}
          href="/accessories"
        />

        <ProductSection
          title="🛠️ أحدث الخدمات"
          products={services}
          href="/services"
        />

        <ProductSection
          title="🔥 أحدث العروض"
          products={offers}
          href="/offers"
        />
        

        {/* عداد الزوار */}
        
      </div>
    </main>
  );
}