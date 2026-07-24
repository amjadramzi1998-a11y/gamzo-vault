"use client";

import { useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { supabase } from "@/lib/supabase";

export default function SiteRating() {
  const [average, setAverage] = useState(0);
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState(0);
  const [visitorId, setVisitorId] = useState("");

  useEffect(() => {
    loadData();

    async function loadFingerprint() {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setVisitorId(result.visitorId);
    }

    loadFingerprint();
  }, []);

  async function loadData() {
    const { data } = await supabase
      .from("site_ratings")
      .select("rating");

    if (!data) return;

    const total = data.reduce((sum, item) => sum + item.rating, 0);

    setCount(data.length);
    setAverage(data.length ? total / data.length : 0);
  }

  async function rate(value: number) {
    if (!visitorId) return;

    const { data: oldVote } = await supabase
      .from("site_ratings")
      .select("id")
      .eq("visitor_id", visitorId)
      .maybeSingle();

    if (oldVote) {
      alert("لقد قمت بتقييم الموقع من قبل ⭐");
      return;
    }

    const { error } = await supabase
      .from("site_ratings")
      .insert({
        visitor_id: visitorId,
        rating: value,
      });

    if (error) {
      console.error(error);
      alert("حدث خطأ");
      return;
    }

    setSelected(value);
    await loadData();

    alert("شكراً لتقييم GAMZO ❤️");
  }

  return (
    <div className="flex flex-col items-center gap-2">

      <div className="flex text-2xl gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => rate(star)}
            className="hover:scale-125 transition"
          >
            {selected >= star ? "⭐" : "☆"}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-300">
        ⭐ {average.toFixed(1)} / 5 ({count} تقييم)
      </p>

    </div>
  );
}