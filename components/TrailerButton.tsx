"use client";

import { useMemo, useState } from "react";

type Props = {
  videoUrl?: string | null;
};

export default function TrailerButton({ videoUrl }: Props) {
  const [open, setOpen] = useState(false);

  const embedUrl = useMemo(() => {
    if (!videoUrl) return "";

    try {
      const url = new URL(videoUrl);

      if (url.hostname.includes("youtu.be")) {
        const id = url.pathname.replace("/", "");
        return `https://www.youtube.com/embed/${id}?autoplay=1`;
      }

      if (url.hostname.includes("youtube.com")) {
        const id = url.searchParams.get("v");
        if (id) {
          return `https://www.youtube.com/embed/${id}?autoplay=1`;
        }
      }

      return videoUrl;
    } catch {
      return videoUrl;
    }
  }, [videoUrl]);

  if (!videoUrl) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-xl text-xl font-bold transition"
      >
        ▶️ مشاهدة التريلر
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 z-10 bg-red-600 hover:bg-red-700 w-10 h-10 rounded-full text-white font-bold"
            >
              ✕
            </button>

            <iframe
              src={embedUrl}
              className="w-full h-full"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}