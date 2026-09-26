import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS_DATA, ProjectItem } from '../data/projects';

interface ProjectsSectionProps {
  onExploreClick?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onExploreClick }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [headerOffset, setHeaderOffset] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);

  const categories = [
    'All',
    'Branding',
    'Photography',
    'Application',
    'Packaging',
    'Architecture',
    'Product',
    'Apparel',
  ];

  const filteredProjects =
    activeCategory === 'All'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  // Parallax translation from left to right as the user scrolls through this section
  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        if (sectionRef.current) {
          const rect = sectionRef.current.getBoundingClientRect();
          const winH = window.innerHeight;

          // Check if section is currently visible in or near viewport
          if (rect.bottom > 0 && rect.top < winH) {
            const totalTravel = winH + rect.height;
            const currentDistance = winH - rect.top;
            const progress = Math.min(Math.max(currentDistance / totalTravel, 0), 1);

            // Moves smoothly from left to right as you scroll down
            // Starts with a slight offset on the left and moves towards the right
            const maxTranslation = window.innerWidth < 768 ? 140 : 280;
            const offset = (progress * (maxTranslation + 40)) - 30;
            setHeaderOffset(offset);
          }
        }
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full bg-[#060709] text-white pt-16 sm:pt-24 lg:pt-32 pb-24 sm:pb-32 lg:pb-40 px-4 sm:px-6 lg:px-8 xl:px-12 overflow-hidden border-t border-white/[0.08]"
    >
      <div className="relative z-10 max-w-[1720px] mx-auto">
        {/* HEADER ROW ALIGNED TO 4-COLUMN GRID:
            Col 1-2: Giant lowercase 'projects' that translates from left to right as scrolled
            Col 3-4: Counter / metadata aligned to right
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-5 lg:gap-x-6 items-end mb-10 sm:mb-14 lg:mb-16">
          {/* Columns 1 & 2: 'projects' headline moving from left to right on scroll */}
          <div className="sm:col-span-2 relative pr-4 overflow-visible">
            <div
              className="relative inline-block select-none"
              style={{
                transform: `translate3d(${headerOffset}px, 0, 0)`,
                willChange: 'transform',
                transition: 'transform 0.08s ease-out',
              }}
            >
              <h2 className="font-geist font-black lowercase text-[#a8f300] leading-[0.8] tracking-[-0.05em] text-[clamp(4.5rem,14vw,14rem)] drop-shadow-[0_0_35px_rgba(168,243,0,0.22)]">
                projects
              </h2>
            </div>
          </div>

          {/* Column 3: Empty spacer in grid */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Column 4: Counter / category active badge */}
          <div className="hidden lg:flex lg:col-span-1 justify-end items-center pb-4 lg:pb-8">
            <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
              {filteredProjects.length} Selected Works / 2024–2025
            </span>
          </div>
        </div>

        {/* Mobile/Tablet Counter indicator */}
        <div className="lg:hidden flex items-center justify-end mb-6 pt-1">
          <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            {filteredProjects.length} Selected Works
          </span>
        </div>

        {/* Interactive Category Filter Bar */}
        {isFilterOpen && (
          <div className="mb-10 flex flex-wrap items-center gap-2 p-3 bg-[#0d0f18]/90 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl animate-fadeIn">
            <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-neutral-400 mr-2 ml-1">
              Filter:
            </span>
            {categories.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-full text-[12px] font-geist font-medium transition-all cursor-pointer ${
                    active
                      ? 'bg-[#a8f300] text-black font-semibold shadow-[0_0_14px_rgba(168,243,0,0.35)]'
                      : 'bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* 4-COLUMN EDITORIAL PROJECTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-5 lg:gap-x-6 gap-y-10 sm:gap-y-14 lg:gap-y-16">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group flex flex-col cursor-pointer"
            >
              {/* Image Container with precise aspect ratio and flat editorial framing */}
              <div className="relative aspect-[1.32/1] w-full overflow-hidden bg-[#0c0e15] border border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.65)]">
                <img
                  src={project.image}
                  alt={project.alt}
                  width={project.width}
                  height={project.height}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale contrast-[1.08] brightness-[0.95] group-hover:brightness-105 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />

                {/* Subtle Hover Action Badge */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none backdrop-blur-[1px]">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#a8f300] text-black text-[11px] font-mono font-semibold uppercase tracking-wider shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    View Project ↗
                  </span>
                </div>
              </div>

              {/* Exact Caption Centered Below: [Title] — [Category] */}
              <div className="mt-3.5 text-center">
                <h3 className="inline font-geist font-medium text-white group-hover:text-[#a8f300] transition-colors text-[13px] sm:text-[14px] tracking-tight">
                  {project.title}
                </h3>
                <span className="text-neutral-600 mx-2 font-normal select-none" aria-hidden="true">
                  —
                </span>
                <span className="font-geist text-neutral-400 text-[13px] sm:text-[14px] tracking-tight">
                  {project.category}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Case Study Detail Modal when clicking any project */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#0c0e14] text-white border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8 lg:p-10 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center transition-colors cursor-pointer"
              aria-label="Close project modal"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-neutral-900 border border-white/10">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.alt}
                  width={selectedProject.width}
                  height={selectedProject.height}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale contrast-105"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-2 text-[#a8f300] font-mono text-[11px] tracking-widest uppercase">
                  <span>{selectedProject.category}</span>
                  <span>•</span>
                  <span>{selectedProject.year}</span>
                </div>

                <h3 className="font-geist font-bold text-2xl sm:text-3xl text-white mb-2">
                  {selectedProject.title}
                </h3>
                <div className="text-neutral-400 font-geist text-sm mb-4">
                  Client: <span className="text-white font-medium">{selectedProject.client}</span>
                </div>

                <p className="text-neutral-300 font-geist text-sm leading-relaxed mb-6">
                  {selectedProject.summary}
                </p>

                <div className="mb-6">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-2">
                    Deliverables:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.deliverables.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 rounded bg-white/[0.06] border border-white/[0.1] text-[11px] text-neutral-300 font-geist"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="px-5 py-2.5 rounded-full bg-[#a8f300] text-black font-semibold text-xs font-mono tracking-wider uppercase hover:opacity-90 transition-opacity cursor-pointer shadow-[0_0_16px_rgba(168,243,0,0.35)]"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
