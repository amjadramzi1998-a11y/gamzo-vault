import Link from "next/link";

type Props = {
  title: string;
  icon: string;
  href: string;
};

export default function CategoryCard({
  title,
  icon,
  href,
}: Props) {
  return (
    <Link
      href={href}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center hover:border-blue-500 hover:scale-105 transition-all duration-300"
    >
      <div className="text-5xl mb-4">
        {icon}
      </div>

      <h2 className="text-xl font-bold text-white">
        {title}
      </h2>
    </Link>
  );
}