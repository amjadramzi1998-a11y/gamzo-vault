import GameCard from "./GameCard";
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
    <section className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">{title}</h2>

        <Link
          href={href}
          className="text-blue-500 hover:text-blue-400 font-bold"
        >
          عرض الكل →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.slice(0, 4).map((product: any) => (
          <GameCard
            key={product.id}
            game={product}
          />
        ))}
      </div>
    </section>
  );
}