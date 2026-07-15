type GalleryItem = {
  type: "image" | "video";
  src: string;
  poster: string;
  title: string;
  desc: string;
};

const ITEMS: GalleryItem[] = [
  {
    type: "video",
    src: "/gallery/robotic-operation-preview.mp4",
    poster: "/gallery/robotic-surgery-console.jpg",
    title: "Robotic Operation & OR Setup",
    desc: "A brief walk-through of the operating theatre showing the advanced DaVinci robotic surgical arms and setup prior to a minimally invasive gastroenterology procedure.",
  },
];

const EASE = { transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" } as const;

export default function Gallery() {
  return (
    <section className="py-[clamp(1.8rem,3.5vw,2.8rem)] relative bg-bg" id="gallery">
      <div className="w-[min(100%-2.4rem,1180px)] mx-auto">
        {/* Section Head */}
        <div className="reveal max-w-[680px] mx-auto mb-[2.4rem] text-center">
          <p className="inline-flex items-center gap-[.6rem] font-bold text-[.78rem] tracking-[.16em] uppercase text-teal justify-center">
            <span className="w-[26px] h-[2px] bg-emerald-2 rounded-sm" />
            Robotic OR Gallery
            <span className="w-[26px] h-[2px] bg-emerald-2 rounded-sm" />
          </p>
          <h2 className="font-serif font-semibold leading-[1.1] tracking-tight text-[clamp(1.9rem,4vw,2.9rem)] text-navy mt-[.9rem] text-center">
            Robotic OR &amp; Surgical Gallery
          </h2>
          <p className="mt-4 text-muted text-[1.05rem]">
            A professional clinical insight into advanced robotic surgical procedures and state-of-the-art operating theatre setup.
          </p>
        </div>

        {/* Gallery Grid (Centered 1 Card View) */}
        <div className="max-w-[480px] mx-auto">
          {ITEMS.map((item) => (
            <article
              key={item.src}
              className="group relative overflow-hidden rounded-[20px] border border-line bg-card shadow-[0_4px_18px_rgba(16,56,98,.07)] hover:shadow-[0_18px_45px_-20px_rgba(16,56,98,.15)] transition-all duration-400 flex flex-col animate-fade-in"
              style={EASE}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-navy/5 shrink-0">
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    poster={item.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={item.poster}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-navy/25 transition-colors duration-400 group-hover:bg-navy/40" />
              </div>

              {/* Text Container */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-[1.12rem] text-navy leading-[1.3]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-muted text-[0.88rem] leading-[1.5]">
                    {item.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
