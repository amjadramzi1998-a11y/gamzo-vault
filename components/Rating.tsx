"use client";

import { useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { supabase } from "@/lib/supabase";

type Props = {
  productId: number;
  average: number;
  count: number;
};

export default function Rating({
  productId,
  average,
  count,
}: Props) {
  const [selected, setSelected] = useState(0);
  const [visitorId, setVisitorId] = useState("");
  const [avg, setAvg] = useState(average);
  const [total, setTotal] = useState(count);
  const [loading, setLoading] = useState(false);
  const [rated, setRated] = useState(false);

  useEffect(() => {
    async function init() {
      const fp = await FingerprintJS.load();
      const result = await fp.get();

      setVisitorId(result.visitorId);

      const { data } = await supabase
        .from("ratings")
        .select("rating")
        .eq("product_id", productId)
        .eq("visitor_id", result.visitorId)
        .maybeSingle();

      if (data) {
        setRated(true);
        setSelected(data.rating);
      }
    }

    init();
  }, [productId]);

  async function submitRating(value: number) {
    if (loading || rated) return;

    setLoading(true);

    const { error } = await supabase.from("ratings").insert({
      product_id: productId,
      rating: value,
      visitor_id: visitorId,
    });

    if (error) {
      console.error(error);
      alert("لقد قمت بتقييم هذه اللعبة من قبل ⭐");
      setLoading(false);
      return;
    }

    setSelected(value);
    setRated(true);

    const { data: product } = await supabase
      .from("products")
      .select("rating_average,rating_count")
      .eq("id", productId)
      .single();

    if (product) {
      setAvg(product.rating_average);
      setTotal(product.rating_count);
    }

    alert("شكراً لتقييمك ⭐");
    setLoading(false);
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mt-8">
      <h3 className="text-xl font-bold mb-4">تقييم اللعبة</h3>

      <div className="flex gap-2 text-3xl">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => submitRating(star)}
            disabled={rated || loading}
            className={`transition ${
              rated
                ? "cursor-not-allowed opacity-70"
                : "hover:scale-125"
            }`}
          >
            {selected >= star ? "⭐" : "☆"}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-2">
        <p className="text-yellow-400 font-bold text-lg">
          ⭐ {avg || 0} من 5
        </p>

        <p className="text-gray-400">
          👥 {total || 0} تقييم
        </p>

        {rated && (
          <p className="text-green-400 font-bold">
            ✅ تم تسجيل تقييمك
          </p>
        )}
      </div>
    </div>
  );
}