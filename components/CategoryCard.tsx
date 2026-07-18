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
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border border-zinc-800
        bg-gradient-to-b from-zinc-900 to-black
        p-6
        flex flex-col items-center justify-center
        min-h-[140px] sm:min-h-[180px]
        transition-all duration-300
        hover:-translate-y-2
        hover:border-blue-500
        hover:shadow-[0_0_30px_rgba(37,99,235,0.35)]
      "
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-all duration-300" />

      {/* Icon */}
      <div className="relative text-5xl sm:text-6xl mb-4 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6">
        {icon}
      </div>

      {/* Title */}
      <h2 className="relative text-base sm:text-xl font-bold text-white text-center">
        {title}
      </h2>
    </Link>
  );
}