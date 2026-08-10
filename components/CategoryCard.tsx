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
      className="group relative shrink-0 w-40 sm:w-44 min-h-[150px] rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 flex flex-col items-center justify-center overflow-hidden transition-all duration-300 hover:border-blue-500/60 hover:bg-zinc-900 hover:-translate-y-1 hover:shadow-[0_10px_35px_rgba(37,99,235,0.15)]"
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition duration-300" />

      {/* Icon */}
      <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 text-4xl mb-4 group-hover:border-blue-500/50 group-hover:scale-105 transition-all duration-300">
        {icon}
      </div>

      {/* Title */}
      <h2 className="relative text-base sm:text-lg font-bold text-white text-center whitespace-nowrap group-hover:text-blue-400 transition-colors duration-300">
        {title}
      </h2>
    </Link>
  );
}