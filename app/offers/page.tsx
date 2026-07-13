import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function OffersPage() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", "offers");

  if (error) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-2xl">
          حصل خطأ في تحميل العروض
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">

        <h1 className="text-5xl font-bold mb-10 text-center">
          العروض 🔥
        </h1>

        <div className="grid md:grid-cols-3 gap-8">

          {products?.map((product) => (
            <div
              key={product.id}
              className="bg-zinc-900 rounded-2xl overflow-hidden"
            >

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />

              <div className="p-5">

                <h2 className="text-2xl font-bold">
                  {product.name}
                </h2>

                <Link
                  href={`/offers/${product.id}`}
                  className="inline-block mt-5 bg-blue-600 px-5 py-3 rounded-xl font-bold"
                >
                  عرض التفاصيل
                </Link>

              </div>

            </div>
          ))}

        </div>

      </div>
    </main>
  );
}