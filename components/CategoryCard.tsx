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
        bg-zinc-900 
        border border-zinc-800 
        rounded-xl sm:rounded-2xl 
        p-4 sm:p-8 
        flex flex-col items-center justify-center 
        hover:border-blue-500 
        hover:scale-105 
        transition-all 
        duration-300
        min-h-[120px] sm:min-h-[170px]
      "
    >

      <div className="text-3xl sm:text-5xl mb-2 sm:mb-4">
        {icon}
      </div>


      <h2 className="text-sm sm:text-xl font-bold text-white text-center">
        {title}
      </h2>


    </Link>
  );
}