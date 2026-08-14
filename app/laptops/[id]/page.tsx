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
            className="
              inline-block
              border border-blue-500/70
              text-white
              hover:bg-blue-600/15
              hover:border-blue-400
              px-8
              py-3
              rounded-xl
              font-bold
              transition-all
            "
          >
            العودة إلى اللابتوبات
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-10">

        {/* Back */}
        <Link
          href="/laptops"
          className="
            inline-flex
            items-center
            gap-2
            text-gray-400
            hover:text-blue-400
            mb-6
            transition-colors
            duration-300
          "
        >
          ← العودة إلى اللابتوبات
        </Link>


        {/* Main Product Box */}
        <div
          className="
            grid
            lg:grid-cols-2
            gap-8
            lg:gap-10
            bg-zinc-950
            border border-zinc-800
            rounded-3xl
            p-4
            sm:p-6
            lg:p-8
            shadow-[0_15px_50px_rgba(0,0,0,0.35)]
          "
        >

          {/* Product Image */}
          <div
            className="
              relative
              w-full
              h-[330px]
              sm:h-[450px]
              lg:h-[520px]
              rounded-2xl
              overflow-hidden
              bg-zinc-900
              border border-zinc-800
              group
            "
          >
            <Image
              src={laptop.image}
              alt={laptop.name}
              fill
              className="
                object-contain
                p-3
                sm:p-5
                transition-transform
                duration-700
                group-hover:scale-105
              "
              unoptimized
            />

            {/* Image Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

            {/* Blue Edge Glow */}
            <div
              className="
                absolute
                inset-0
                ring-1
                ring-inset
                ring-white/5
                group-hover:ring-blue-500/30
                transition-all
                duration-300
                pointer-events-none
              "
            />
          </div>


          {/* Details */}
          <div className="flex flex-col justify-center">

            {/* Category */}
            <span
              className="
                inline-flex
                w-fit
                items-center
                bg-blue-600/10
                text-blue-400
                border border-blue-500/30
                px-4
                py-2
                rounded-full
                text-sm
                font-bold
                mb-5
              "
            >
              💻 Laptop
            </span>


            {/* Product Name */}
            <h1 className="text-3xl sm:text-5xl font-black leading-tight mb-6">
              {laptop.name}
            </h1>


            {/* Price */}
            <div className="mb-8">

              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-blue-400 tracking-tight">
                  {laptop.price}
                </span>

                <span className="text-base sm:text-lg font-semibold text-gray-400">
                  جنيه
                </span>
              </div>

            </div>


            {/* Description */}
            <div className="mb-8">

              <h2 className="text-xl font-bold mb-3">
                المواصفات
              </h2>

              <div
                className="
                  bg-zinc-900
                  border border-zinc-800
                  rounded-2xl
                  p-5
                  text-gray-300
                  leading-8
                  whitespace-pre-line
                "
              >
                {laptop.description || "لا توجد مواصفات مضافة حاليًا."}
              </div>

            </div>


            {/* Add To Cart */}
            <button
              onClick={handleAddToCart}
              className="
                group
                relative
                overflow-hidden
                w-full
                bg-blue-600
                hover:bg-blue-500
                py-4
                rounded-xl
                font-bold
                text-lg
                transition-all
                duration-300
                shadow-[0_0_20px_rgba(37,99,235,0.25)]
                hover:shadow-[0_0_30px_rgba(37,99,235,0.45)]
                hover:-translate-y-1
                active:scale-95
              "
            >
              <span className="relative z-10">
                🛒 أضف اللابتوب للسلة
              </span>

              <span
                className="
                  absolute
                  inset-0
                  -translate-x-full
                  group-hover:translate-x-full
                  transition-transform
                  duration-700
                  bg-gradient-to-r
                  from-transparent
                  via-white/20
                  to-transparent
                "
              />
            </button>


            {/* Video Review */}
            {laptop.video_url && (
              <a
                href={laptop.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-full
                  mt-3
                  border border-blue-500/70
                  text-white
                  hover:bg-blue-600/15
                  hover:border-blue-400
                  hover:shadow-[0_0_18px_rgba(37,99,235,0.2)]
                  py-4
                  rounded-xl
                  font-bold
                  text-lg
                  transition-all
                  duration-300
                  active:scale-95
                  text-center
                "
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