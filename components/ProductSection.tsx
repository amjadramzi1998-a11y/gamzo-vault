import GameCard from "./GameCard";
import LaptopCard from "./LaptopCard";
import Link from "next/link";

interface ProductSectionProps {
  title: string;
  products: any[];
  href: string;
}

export default function ProductSection({
  title,
  products,
  href,
}: ProductSectionProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold">
          {title}
        </h2>

        <Link
          href={href}
          className="group inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold transition"
        >
          المزيد
          <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {products.slice(0, 4).map((product: any) =>
          product.category === "laptops" ? (
            <LaptopCard
              key={product.id}
              laptop={product}
            />
          ) : (
            <GameCard
              key={product.id}
              game={product}
            />
          )
        )}
      </div>
    </section>
  );
}