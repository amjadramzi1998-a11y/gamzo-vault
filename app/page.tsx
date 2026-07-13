import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import CategoryCard from "../components/CategoryCard";
import { supabase } from "../lib/supabase";
import Hero from "../components/Hero";
import ProductSection from "../components/ProductSection";

export default async function Home() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
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
    <main className="min-h-screen bg-black text-white">

      <Header />

      <div className="max-w-7xl mx-auto px-6">

        <Hero />

        <SearchBar />


        {/* Categories */}

        <section className="mt-14">

          <h2 className="text-3xl font-bold mb-8">
            الأقسام
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">

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

      </div>

    </main>
  );
}