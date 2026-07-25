"use client";

import { useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { supabase } from "@/lib/supabase";

export default function SiteComments() {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [visitorId, setVisitorId] = useState("");
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    loadComments();
    loadFingerprint();
  }, []);

  async function loadFingerprint() {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    setVisitorId(result.visitorId);
  }

  async function loadComments() {
    const { data } = await supabase
      .from("site_comments")
      .select("*")
      .eq("approved", true)
      .order("pinned", { ascending: false })
      .order("created_at", { ascending: false });

    setComments(data || []);
  }

  async function sendComment() {
    if (!name || !comment) {
      alert("اكتب الاسم والتعليق");
      return;
      const { data: oldComment } = await supabase
  .from("site_comments")
  .select("id")
  .eq("visitor_id", visitorId)
  .maybeSingle();

if (oldComment) {
  alert("لقد قمت بإضافة تعليق من قبل 💬");
  return;
}
    }

    const { error } = await supabase
      .from("site_comments")
      .insert({
        visitor_id: visitorId,
        name,
        comment,
      });

    if (error) {
      alert("حدث خطأ");
      return;
    }

    setName("");
    setComment("");

    loadComments();
  }

  return (
    <section className="mt-20">

      <h2 className="text-3xl font-bold mb-6">
        💬 آراء العملاء
      </h2>

      <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">

        <input
          placeholder="اسمك"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-black border border-zinc-700 rounded-xl p-3 mb-4"
        />

        <textarea
          placeholder="اكتب رأيك..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full bg-black border border-zinc-700 rounded-xl p-3 h-28"
        />

        <button
          onClick={sendComment}
          className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-bold"
        >
          إرسال التعليق
        </button>

      </div>

      <div className="mt-8 space-y-4">

        {comments.map((item) => (

          <div
            key={item.id}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"
          >
            <h3 className="font-bold text-blue-400">
              {item.name}
            </h3>

            <p className="text-gray-300 mt-2">
              {item.comment}
            </p>
          </div>

        ))}

      </div>

    </section>
  );
}