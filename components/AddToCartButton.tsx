"use client";

import { addToCart } from "@/lib/cart";

type Product = {
  id: number;
  name: string;
  image: string;
  category: string;
};

export default function AddToCartButton({
  product,
}: {
  product: Product;
}) {
  function handleAddToCart() {
    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      category: product.category,
    });

    alert("تمت إضافة المنتج إلى السلة 🛒");
  }

  return (
    <button
      onClick={handleAddToCart}
      className="w-full mt-8 bg-blue-600 hover:bg-blue-700 py-4 rounded-xl text-xl font-bold transition"
    >
      🛒 أضف إلى السلة
    </button>
  );
}