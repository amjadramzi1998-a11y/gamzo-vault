"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SystemPage() {
  const [productsCount, setProductsCount] = useState(0);
  const [availableCount, setAvailableCount] = useState(0);
  const [outOfStockCount, setOutOfStockCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);

    const { data: products } = await supabase
      .from("products")
      .select("id, stock");

    const { count: orders } = await supabase
      .from("orders")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "pending");

    if (products) {
      setProductsCount(products.length);

      setAvailableCount(
        products.filter((product) => Number(product.stock) > 0).length
      );

      setOutOfStockCount(
        products.filter((product) => Number(product.stock) <= 0).length
      );
    }

    setOrdersCount(orders || 0);

    setLoading(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-2xl font-bold text-blue-400">
          جاري تحميل النظام...
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">

      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 py-5">

          <h1 className="text-3xl font-black">
            <span className="text-blue-500">ATOM</span>{" "}
            SYSTEM
          </h1>

          <p className="text-gray-400 mt-1">
            نظام إدارة المحل
          </p>

        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Dashboard Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Products */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-gray-400">
              📦 إجمالي المنتجات
            </p>

            <h2 className="text-4xl font-black mt-3 text-blue-400">
              {productsCount}
            </h2>
          </div>

          {/* Available */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-gray-400">
              🟢 منتجات متاحة
            </p>

            <h2 className="text-4xl font-black mt-3 text-green-400">
              {availableCount}
            </h2>
          </div>

          {/* Out of Stock */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-gray-400">
              🔴 نافد من المخزون
            </p>

            <h2 className="text-4xl font-black mt-3 text-red-400">
              {outOfStockCount}
            </h2>
          </div>

          {/* Orders */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-gray-400">
              🛒 طلبات جديدة
            </p>

            <h2 className="text-4xl font-black mt-3 text-yellow-400">
              {ordersCount}
            </h2>
          </div>

        </div>

        {/* Sections */}
        <div className="grid md:grid-cols-2 gap-5 mt-10">

          <button
            className="
              bg-zinc-900
              border border-zinc-800
              hover:border-blue-500
              rounded-2xl
              p-8
              text-right
              transition
            "
          >
            <div className="text-4xl mb-4">
              📦
            </div>

            <h2 className="text-2xl font-bold">
              إدارة المخزون
            </h2>

            <p className="text-gray-400 mt-2">
              متابعة وتعديل كميات المنتجات
            </p>
          </button>

          <button
            className="
              bg-zinc-900
              border border-zinc-800
              hover:border-blue-500
              rounded-2xl
              p-8
              text-right
              transition
            "
          >
            <div className="text-4xl mb-4">
              🛒
            </div>

            <h2 className="text-2xl font-bold">
              طلبات الموقع
            </h2>

            <p className="text-gray-400 mt-2">
              متابعة الطلبات وتأكيد المبيعات
            </p>
          </button>

        </div>

      </div>

    </main>
  );
}