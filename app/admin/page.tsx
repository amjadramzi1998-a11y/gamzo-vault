"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const router = useRouter();

  const [checking, setChecking] = useState(true);

  const [name, setName] = useState("");
  const [platform, setPlatform] = useState("PS4");
  const [category, setCategory] = useState("games");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [games, setGames] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    router.replace("/login");
    return;
  }

  setChecking(false);
  loadGames();
}async function deleteGame(id: number) {
  const ok = confirm("هل تريد حذف اللعبة؟");

  if (!ok) return;

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    alert("حدث خطأ أثناء الحذف");
    return;
  }

  loadGames();
}
  function editGame(game: any) {
  setEditingId(game.id);

  setName(game.name);
  setCategory(game.category);
  setPlatform(game.platform);
  setDescription(game.description || "");

  // حفظ رابط الصورة الحالية
  setCurrentImage(game.image);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }
async function loadGames() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: false });

  if (!error) {
    setGames(data || []);
  }
}
  async function saveGame() {
  if (!name) {
    alert("اكتب اسم اللعبة");
    return;
  }

  setLoading(true);

  const {
  data: { session },
} = await supabase.auth.getSession();

console.log("SESSION:", session);
    try {
      if (!image && !editingId) {
  alert("اختر صورة");
  setLoading(false);
  return;
}

let imageUrl = currentImage;

if (image) {
  const fileName = `${Date.now()}-${image.name}`;

      const { error: uploadError } = await supabase.storage
        .from("game-images")
        .upload(fileName, image);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("game-images")
        .getPublicUrl(fileName);

      imageUrl = urlData.publicUrl;
}
      if (editingId) {
  const { error } = await supabase
    .from("products")
    .update({
  name,
  image: imageUrl,
  category,
  platform,
  description,
})
    .eq("id", editingId);

  if (error) throw error;

  alert("تم تعديل اللعبة بنجاح ✅");

  setEditingId(null);
} else {
  const { error } = await supabase
    .from("products")
    .insert({
  name,
  image: imageUrl,
  category,
  platform,
  description,
});

  if (error) throw error;

  alert("تم إضافة اللعبة بنجاح 🎮");
}


      loadGames();

setName("");
setPlatform("PS4");
setDescription("");
setImage(null);
setCurrentImage("");
setEditingId(null);
    } catch (error: any) {
  console.error("SAVE ERROR:", error);

  alert(
    error?.message ||
    JSON.stringify(error) ||
    "حدث خطأ أثناء الإضافة"
  );
}

    setLoading(false);
  }

  if (checking) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-2xl">جاري التحقق...</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
  {category === "games"
    ? "إضافة لعبة"
    : category === "playstation"
    ? "إضافة جهاز PlayStation"
    : category === "accessories"
    ? "إضافة إكسسوار"
    : category === "services"
    ? "إضافة خدمة"
    : "إضافة عرض"}
</h1>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl"
          >
            تسجيل الخروج
          </button>
        </div>

        <div className="space-y-5">
          <input
            type="text"
            placeholder={
  category === "games"
    ? "اسم اللعبة"
    : category === "playstation"
    ? "اسم الجهاز"
    : category === "accessories"
    ? "اسم الإكسسوار"
    : category === "services"
    ? "اسم الخدمة"
    : "اسم العرض"
}

            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4"
          />
         <select
  value={category}
  onChange={(e) => {
    const value = e.target.value;

    setCategory(value);
    setPlatform("PS4");
  }}
  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4"
>
  <option value="games">🎮 ألعاب</option>
  <option value="playstation">🕹️ أجهزة PlayStation</option>
  <option value="accessories">🎧 إكسسوارات</option>
  <option value="services">🛠️ خدمات</option>
  <option value="offers">🔥 عروض</option>
</select>
          <select
  value={platform}
  onChange={(e) => setPlatform(e.target.value)}
  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4"
>
  {category === "games" ? (
    <>
      <option value="PS4">PS4</option>
      <option value="PS5">PS5</option>
      <option value="PC">PC</option>
    </>
  ) : (
    <>
      <option value="PS4">PS4</option>
      <option value="PS5">PS5</option>
    </>
  )}
</select>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4"
          />

          <textarea
            placeholder="الوصف"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4 h-32"
          />

          <button
  onClick={saveGame}
  disabled={loading}
  className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-bold"
>
  {loading
    ? "جاري الحفظ..."
    : editingId
    ? "حفظ التعديلات"
    : category === "games"
    ? "إضافة لعبة"
    : category === "playstation"
    ? "إضافة جهاز"
    : category === "accessories"
    ? "إضافة إكسسوار"
    : category === "services"
? "إضافة خدمة"
: "إضافة عرض"}
</button>

    </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">
           جميع المنتجات
          </h2>
          <input
  type="text"
  placeholder="🔍 ابحث عن منتج..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4 mb-6"
 />

          <div className="space-y-4">
            {games
  .filter((game) =>
    game.name.toLowerCase().includes(search.toLowerCase())
  )
  .map((game) => (
              <div
                key={game.id}
                className="flex items-center justify-between bg-zinc-900 border border-zinc-700 rounded-xl p-4"
              >
                <div className="flex items-center gap-4">
  <img
    src={game.image}
    alt={game.name}
    className="w-20 h-20 object-cover rounded-lg"
  />

  <div>

<h3 className="text-xl font-bold">
  {game.name}
</h3>

<div className="flex gap-2 mt-2">

  {game.category === "games" && (
    <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
      🎮 لعبة
    </span>
  )}

  {game.category === "playstation" && (
    <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
      🕹️ PlayStation
    </span>
  )}

  {game.category === "accessories" && (
    <span className="bg-yellow-600 px-3 py-1 rounded-full text-sm">
      🎧 إكسسوار
    </span>
  )}

  {game.category === "offers" && (
    <span className="bg-red-600 px-3 py-1 rounded-full text-sm">
      🔥 عرض
    </span>
  )}

</div>

{game.platform && (
  <p className="text-blue-400 mt-2">
    {game.platform}
  </p>
)}
  </div>
</div>

<div className="flex gap-2">

  <button
    onClick={() => editGame(game)}
    className="bg-yellow-500 hover:bg-yellow-600 px-5 py-2 rounded-lg font-bold"
  >
    تعديل
  </button>

  <button
    onClick={() => deleteGame(game.id)}
    className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-bold"
  >
    حذف
  </button>

</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
      );
}