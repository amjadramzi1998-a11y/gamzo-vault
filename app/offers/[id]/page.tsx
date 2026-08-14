import { supabase } from "@/lib/supabase";
import AddToCartButton from "@/components/AddToCartButton";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OffersDetailsPage({ params }: Props) {
  const { id } = await params;

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", Number(id))
    .eq("category", "offers")
    .single();

  if (error || !product) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          العرض غير موجود
        </h1>
      </main>
    );
  }

  const currentPrice = Number(product.price);
  const oldPrice = Number(product.old_price);

  const hasDiscount =
    oldPrice > 0 &&
    currentPrice > 0 &&
    oldPrice > currentPrice;

  const discount = hasDiscount
    ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100)
    : 0;

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Product Image */}
        <div className="rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-950">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-h-[550px] object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="mt-8">

          {/* Offer Badge */}
          <span className="inline-block bg-red-600 px-4 py-2 rounded-full font-bold">
            🔥 عرض خاص
          </span>

          {/* Product Name */}
          <h1 className="text-4xl sm:text-5xl font-black mt-6">
            {product.name}
          </h1>

          {/* Description */}
          {product.description && (
            <p className="text-gray-300 mt-6 text-lg leading-9">
              {product.description}
            </p>
          )}

          {/* Price */}
          <div className="mt-8">

            {/* Old Price */}
            {hasDiscount && (
              <p className="text-gray-500 text-lg sm:text-xl line-through">
                {oldPrice.toLocaleString("en-US")} جنيه
              </p>
            )}

            {/* Current Price */}
            {product.price != null && (
              <p className="text-4xl sm:text-5xl font-black text-blue-400 mt-1">
                {currentPrice.toLocaleString("en-US")} جنيه
              </p>
            )}

            {/* Discount */}
            {hasDiscount && (
              <div className="flex items-center gap-3 mt-3">

                <span className="inline-block bg-red-600/15 border border-red-500/30 text-red-500 px-3 py-1 rounded-lg font-bold">
                  🔥 خصم {discount}%
                </span>

                <span className="text-gray-400 text-sm">
                  وفر{" "}
                  {(oldPrice - currentPrice).toLocaleString("en-US")} جنيه
                </span>

              </div>
            )}

          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-col gap-4">

            <AddToCartButton product={product} />

            <a
              href={`https://wa.me/201015401976?text=${encodeURIComponent(
                `مرحبًا، أريد طلب العرض: ${product.name} - السعر ${currentPrice} جنيه`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-xl text-center text-xl font-bold transition"
            >
              🟢 اطلب العرض عبر واتساب
            </a>

          </div>

        </div>
      </div>
    </main>
  );
}