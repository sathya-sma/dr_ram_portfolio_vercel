import { useState } from "react";
import { Chevron } from "@/lib/icons";

const CloseMini = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="ico" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

type GalleryItem = {
  type: "video";
  src: string;
  thumbnail?: string;
  title: string;
  category: "or";
  desc: string;
};

const ITEMS: GalleryItem[] = [
  {
    type: "video",
    src: "/gallery/robotic-operation-preview.mp4",
    title: "Robotic Operation & OR Setup",
    category: "or",
    desc: "A brief walk-through of the operating theatre showing the advanced DaVinci robotic surgical arms and setup prior to a minimally invasive gastroenterology procedure.",
  },
];

const EASE = { transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" } as const;

export default function Gallery() {
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  return (
    <section className="py-[clamp(1.8rem,3.5vw,2.8rem)] relative bg-bg" id="gallery">
      <div className="w-[min(100%-2.4rem,73.75rem)] mx-auto">
        {/* Section Head */}
        <div className="reveal max-w-[680px] mx-auto mb-[2.4rem] text-center">
          <p className="inline-flex items-center gap-[.6rem] font-bold text-[.78rem] tracking-[.16em] uppercase text-teal justify-center">
            <span className="w-[26px] h-[2px] bg-emerald-2 rounded-sm" />
            Clinical Gallery
            <span className="w-[26px] h-[2px] bg-emerald-2 rounded-sm" />
          </p>
          <h2 className="font-serif font-semibold leading-[1.1] tracking-tight text-[2.9rem] text-navy mt-[.9rem] text-center">
            Surgical &amp; Clinical Gallery
          </h2>
          <p className="mt-4 text-muted text-[1.05rem]">
            A professional clinical insight into advanced robotic surgery setups, console operations, and minimally invasive theatre environments.
          </p>
        </div>

        {/* Gallery Grid - Single Centered Card */}
        <div className="max-w-[480px] mx-auto">
          {ITEMS.map((item) => (
            <article
              key={item.src}
              className="group relative overflow-hidden rounded-[20px] border border-line bg-card shadow-[0_4px_18px_rgba(16,56,98,.07)] hover:shadow-[0_18px_45px_-20px_rgba(16,56,98,.15)] transition-all duration-400 cursor-pointer flex flex-col"
              style={EASE}
              onClick={() => setLightbox(item)}
            >
              {/* Media Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-navy/5 shrink-0">
                <div className="w-full h-full relative">
                  <video
                    src={item.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Text Container */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-[1.12rem] text-navy leading-[1.3] group-hover:text-teal transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-muted text-[0.88rem] line-clamp-3 leading-[1.5]">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-[0.82rem] font-bold text-teal group-hover:translate-x-1 transition-transform duration-300">
                  <span>View Details</span>
                  <Chevron className="ico w-4 h-4 rotate-270" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Lightbox / Details Modal */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-navy/85 backdrop-blur-[4px] p-4 transition-opacity duration-300"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative bg-card rounded-[24px] max-w-[800px] w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-navy/80 hover:bg-navy text-white flex items-center justify-center cursor-pointer transition-colors duration-250 border-0"
              aria-label="Close lightbox"
            >
              <CloseMini className="ico w-5 h-5" />
            </button>

            {/* Modal Media */}
            <div className="w-full bg-black/95 relative aspect-[16/10] flex items-center justify-center">
              <video
                src={lightbox.src}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>

            {/* Modal Details */}
            <div className="p-6 overflow-y-auto">
              <span className="inline-block text-[0.68rem] font-bold tracking-[.06em] uppercase px-2.5 py-1 rounded-full bg-teal/10 text-teal border border-teal/20 mb-2">
                Robotic OR &amp; Setup
              </span>
              <h4 className="font-serif font-bold text-[1.4rem] text-navy leading-[1.3]">
                {lightbox.title}
              </h4>
              <p className="mt-3 text-muted text-[0.95rem] leading-[1.6]">
                {lightbox.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
