import { useState } from "react";
import { Chevron } from "@/lib/icons";

const Play = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="ico" fill="currentColor" {...p}>
    <path d="M8 5v14l11-7z" />
  </svg>
);

const CloseMini = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="ico" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

type GalleryItem = {
  type: "image" | "video";
  src: string;
  thumbnail?: string;
  title: string;
  category: "or" | "cases";
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
  {
    type: "image",
    src: "/gallery/robotic-surgery-console.jpg",
    title: "Robotic Surgery Console",
    category: "or",
    desc: "Dr. T. Ramkumar at the controls of the DaVinci robotic console, enabling highly precise, minimally invasive surgery with 3D high-definition visualization.",
  },
  {
    type: "image",
    src: "/gallery/whipple-surgery-diagram.jpg",
    title: "Pancreaticoduodenectomy (Whipple) Diagram",
    category: "cases",
    desc: "Anatomical schematic showing the reconstruction stages after a Whipple procedure, involving the removal and reconnection of parts of the stomach, pancreas, gallbladder, and duodenum.",
  },
  {
    type: "image",
    src: "/gallery/specimen-hepatectomy.jpg",
    title: "Right Hemi-hepatectomy Specimen",
    category: "cases",
    desc: "A resected clinical liver specimen following a complex major hepatectomy for a liver tumor, demonstrating clean, negative surgical margins.",
  },
  {
    type: "image",
    src: "/gallery/surgical-anatomy-dissection.jpg",
    title: "Surgical Anatomy & Dissection",
    category: "cases",
    desc: "Close-up clinical view highlighting detailed anatomical dissection during an advanced hepatobiliary and pancreatic (HPB) surgery.",
  },
  {
    type: "image",
    src: "/gallery/specimen-1.jpg",
    title: "Resected GI Specimen — Case 1",
    category: "cases",
    desc: "Clinical specimen of a resected segment showing gastrointestinal pathology, removed successfully via advanced laparoscopic surgery.",
  },
  {
    type: "image",
    src: "/gallery/specimen-2.jpg",
    title: "Resected HPB Specimen — Case 2",
    category: "cases",
    desc: "Resected tumor specimen showing gallbladder and bile duct pathology, cleared with strict surgical precision.",
  },
  {
    type: "image",
    src: "/gallery/specimen-3.jpg",
    title: "Resected Specimen — Case 3",
    category: "cases",
    desc: "Pathological surgical specimen of a resected abdominal tumor, demonstrating complete clearance.",
  },
  {
    type: "image",
    src: "/gallery/specimen-4.jpg",
    title: "Resected Specimen — Case 4",
    category: "cases",
    desc: "Resected gastrointestinal segment demonstrating precise margins achieved during laparoscopic colorectal resection.",
  },
];

const EASE = { transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" } as const;

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<"or" | "cases">("or");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filteredItems = ITEMS.filter((item) => item.category === activeTab);

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
            A professional clinical insight into advanced surgical procedures, minimally invasive setups, and complex gastroenterology specimens.
          </p>
        </div>

        {/* Custom Tab Filters */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveTab("or")}
            className={`px-6 py-2.5 rounded-full font-bold text-[0.9rem] transition-all duration-300 cursor-pointer border ${
              activeTab === "or"
                ? "bg-navy text-white border-transparent shadow-md"
                : "bg-card text-muted border-line hover:border-teal/30 hover:text-navy"
            }`}
            style={EASE}
          >
            Robotic OR &amp; Setup
          </button>
          <button
            onClick={() => setActiveTab("cases")}
            className={`px-6 py-2.5 rounded-full font-bold text-[0.9rem] transition-all duration-300 cursor-pointer border ${
              activeTab === "cases"
                ? "bg-navy text-white border-transparent shadow-md"
                : "bg-card text-muted border-line hover:border-teal/30 hover:text-navy"
            }`}
            style={EASE}
          >
            Clinical Cases &amp; Specimens
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <article
              key={item.src}
              className="group relative overflow-hidden rounded-[20px] border border-line bg-card shadow-[0_4px_18px_rgba(16,56,98,.07)] hover:shadow-[0_18px_45px_-20px_rgba(16,56,98,.15)] transition-all duration-400 cursor-pointer flex flex-col"
              style={EASE}
              onClick={() => setLightbox(item)}
            >
              {/* Media Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-navy/5 shrink-0">
                {item.type === "video" ? (
                  <div className="w-full h-full relative">
                    <video
                      src={item.src}
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-navy/30 flex items-center justify-center transition-colors duration-400 group-hover:bg-navy/40">
                      <span className="w-[clamp(44px,8vw,56px)] h-[clamp(44px,8vw,56px)] rounded-full bg-white/90 text-navy flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Play className="ico w-6 h-6 ml-0.5" />
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full relative">
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-navy/0 transition-colors duration-400 group-hover:bg-navy/20" />
                  </div>
                )}
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
              {lightbox.type === "video" ? (
                <video
                  src={lightbox.src}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={lightbox.src}
                  alt={lightbox.title}
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* Modal Details */}
            <div className="p-6 overflow-y-auto">
              <span className="inline-block text-[0.68rem] font-bold tracking-[.06em] uppercase px-2.5 py-1 rounded-full bg-teal/10 text-teal border border-teal/20 mb-2">
                {lightbox.category === "or" ? "Robotic OR & Setup" : "Clinical Cases & Specimen"}
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
