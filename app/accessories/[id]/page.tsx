import { supabase } from "@/lib/supabase";
import AddToCartButton from "@/components/AddToCartButton";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AccessoriesDetailsPage({ params }: Props) {
  const { id } = await params;

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", Number(id))
    .eq("category", "accessories")
    .single();


  if (error || !product) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          الإكسسوار غير موجود
        </h1>
      </main>
    );
  }


  return (
    <main className="min-h-screen bg-black text-white">

      <div className="max-w-5xl mx-auto px-6 py-10">


        <div className="rounded-3xl overflow-hidden border border-zinc-800">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-h-[550px] object-cover"
          />
        </div>


        <div className="mt-8">


          <span className="inline-block bg-yellow-600 px-4 py-2 rounded-full font-bold">
            🎧 إكسسوار
          </span>


          <h1 className="text-5xl font-black mt-6">
            {product.name}
          </h1>


          {product.description && (
            <p className="text-gray-300 mt-6 text-lg leading-9">
              {product.description}
            </p>
          )}



          <div className="mt-10 flex flex-col gap-4">


            <AddToCartButton product={product} />


            <a
              href={`https://wa.me/201015401976?text=${encodeURIComponent(
                product.name
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-xl text-center text-xl font-bold transition"
            >
              🟢 اطلب الإكسسوار عبر واتساب
            </a>


          </div>


        </div>


      </div>

    </main>
  );
}