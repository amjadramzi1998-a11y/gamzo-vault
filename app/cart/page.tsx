"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { getCart, removeFromCart, clearCart } from "@/lib/cart";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);


  function removeItem(id: number) {
    removeFromCart(id);
    setCart(getCart());
  }


  function sendWhatsApp() {

    const message = `
طلب جديد من GAMZO 🔥

${cart
  .map((item, index) => `${index + 1}- ${item.name}`)
  .join("\n")}


شكراً لكم 🕹️
    `;


    window.open(
      `https://wa.me/201015401976?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  }


  return (
    <main className="min-h-screen bg-black text-white">

      <Header />


      <div className="max-w-5xl mx-auto px-6 py-10">


        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">


          <h1 className="text-4xl font-bold">
            🛒 سلة الطلبات
          </h1>


          {cart.length > 0 && (
            <button
              onClick={() => {
                clearCart();
                setCart([]);
              }}
              className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl font-bold"
            >
              🗑️ تفريغ السلة
            </button>
          )}


        </div>



        {cart.length === 0 ? (

          <p className="text-gray-400 text-xl text-center mt-20">
            السلة فارغة
          </p>


        ) : (


          <>


            <div className="space-y-4">


              {cart.map((item) => (

                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-4"
                >


                  <div className="flex items-center gap-4 w-full">


                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />


                    <h2 className="text-lg sm:text-xl font-bold">
                      {item.name}
                    </h2>


                  </div>



                  <button
                    onClick={() => removeItem(item.id)}
                    className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl font-bold w-full sm:w-auto"
                  >
                    حذف
                  </button>


                </div>

              ))}


            </div>



            <button
              onClick={sendWhatsApp}
              className="w-full mt-8 bg-green-600 hover:bg-green-700 py-4 rounded-xl text-xl font-bold transition"
            >
              🟢 إرسال الطلب عبر واتساب
            </button>


          </>


        )}


      </div>


    </main>
  );
}