"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";
import { addToCart } from "@/lib/cart";
import toast from "react-hot-toast";

type Laptop = {
  id: number;
  name: string;
  image: string;
  category: string;
  description?: string;
  price?: number | string;
  video_url?: string;
};

export default function LaptopDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [laptop, setLaptop] = useState<Laptop | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadLaptop();
    }
  }, [id]);

  async function loadLaptop() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", Number(id))
      .eq("category", "laptops")
      .single();

    console.log("LAPTOP DATA:", data);
    console.log("LAPTOP ERROR:", error);

    if (error || !data) {
      setLaptop(null);
    } else {
      setLaptop(data as Laptop);
    }

    setLoading(false);
  }

  function handleAddToCart() {
    if (!laptop) return;

    addToCart({
      id: laptop.id,
      name: laptop.name,
      image: laptop.image,
      category: laptop.category,
    });

    toast.success(`تمت إضافة ${laptop.name} إلى السلة 🛒`);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Header />

        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <p className="text-gray-400 text-lg">
            جاري تحميل بيانات اللابتوب...
          </p>
        </div>
      </main>
    );
  }

  if (!laptop) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Header />

        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-6">💻</div>

          <h1 className="text-3xl font-bold mb-4">
            اللابتوب غير موجود
          </h1>

          <p className="text-gray-400 mb-8">
            اللابتوب المطلوب غير موجود في قاعدة البيانات.
          </p>

          <Link
            href="/laptops"
            className="inline-block bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-bold transition"
          >
            العودة إلى Laptop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-10">

        <Link
          href="/laptops"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition"
        >
          ← العودة إلى Laptop
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 bg-zinc-950 border border-zinc-800 rounded-3xl p-5 sm:p-8">

          <div className="relative w-full h-[350px] sm:h-[500px] rounded-2xl overflow-hidden bg-zinc-900">
            <Image
              src={laptop.image}
              alt={laptop.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="flex flex-col justify-center">

            <span className="inline-block w-fit bg-blue-600/20 text-blue-400 border border-blue-500/30 px-4 py-2 rounded-full text-sm font-bold mb-5">
              💻 Laptop
            </span>

            <h1 className="text-3xl sm:text-5xl font-black mb-6">
              {laptop.name}
            </h1>

            <div className="mb-8">
              <p className="text-gray-400 text-sm mb-1">
                السعر
              </p>

              <p className="text-3xl sm:text-4xl font-black text-green-400">
                {laptop.price} جنيه
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-3">
                المواصفات
              </h2>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-gray-300 leading-8 whitespace-pre-line">
                {laptop.description || "لا توجد مواصفات مضافة حاليًا."}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-bold text-lg transition active:scale-95"
            >
              🛒 أضف اللابتوب للسلة
            </button>

            {laptop.video_url && (
              <a
                href={laptop.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-3 bg-red-600 hover:bg-red-700 py-4 rounded-xl font-bold text-lg transition active:scale-95 text-center"
              >
                🎥 مراجعة اللابتوب
              </a>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}