import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useI18n } from '../i18n';

function getInitials(name: string): string {
  const cleaned = name.replace(/[\[\]_]/g, ' ').trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'VD';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

interface TeamPhotoCardProps {
  name: string;
  role: string;
  photo: string;
}

const TeamPhotoCard: React.FC<TeamPhotoCardProps> = ({ name, role, photo }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const initials = getInitials(name);

  return (
    <div className="relative w-56 h-56 sm:w-60 sm:h-60 lg:w-64 lg:h-64 mb-7 flex items-center justify-center">
      {/* Offset Lime-Green Rounded Backdrop */}
      <div
        className="absolute inset-0 rounded-[32px] sm:rounded-[36px] bg-[#bef264] transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1"
        style={{
          transform: 'translate(10px, -6px) rotate(4deg)',
          boxShadow: '0 12px 30px rgba(190, 242, 100, 0.25)',
        }}
        aria-hidden="true"
      />

      {/* Foreground Card Frame: Clean Initials Placeholder + Optional Real Photo */}
      <div className="relative w-full h-full rounded-[28px] sm:rounded-[32px] overflow-hidden bg-[#121614] border border-white/20 shadow-2xl z-10 transition-transform duration-300 group-hover:-translate-y-1 flex items-center justify-center">
        {/* Clean Initials Placeholder inside the card frame */}
        {(!imageLoaded || imageError) && (
          <div
            className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#192117] via-[#111512] to-[#0a0d0b] select-none"
            aria-label={name}
          >
            <span className="font-geist font-bold text-[52px] sm:text-[60px] tracking-[-0.04em] text-[#9ce607] drop-shadow-[0_0_24px_rgba(156,230,7,0.3)]">
              {initials}
            </span>
          </div>
        )}

        {/* Load photo from /public/team/member1.webp, member2.webp, member3.webp when present */}
        {!imageError && (
          <img
            src={photo}
            alt={`${name} — ${role}`}
            width={512}
            height={512}
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`absolute inset-0 w-full h-full object-cover object-top grayscale contrast-[1.08] transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          />
        )}

        {/* Subtle inner top-edge glass shine */}
        <div className="absolute inset-0 pointer-events-none rounded-[28px] sm:rounded-[32px] ring-1 ring-inset ring-white/25" />
      </div>
    </div>
  );
};

export const TeamLeadershipSection: React.FC = () => {
  const { t } = useI18n();

  return (
    <section
      id="team"
      className="relative w-full bg-[#060709] text-white py-24 sm:py-32 lg:py-36 px-4 sm:px-6 lg:px-8 border-t border-white/[0.07] overflow-hidden select-none"
    >
      {/* Soft atmospheric ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[450px] pointer-events-none -z-0 opacity-15"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(168, 243, 0, 0.22) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20 max-w-2xl mx-auto"
        >
          <h2 className="font-geist font-medium text-[28px] sm:text-[38px] md:text-[44px] lg:text-[48px] text-white tracking-[-0.025em]">
            {t.team.heading}
          </h2>
          <p className="font-geist text-[14px] sm:text-[16px] text-neutral-400 mt-3 leading-relaxed">
            {t.team.subheading}
          </p>
        </motion.div>

        {/* 3 Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-10 lg:gap-14 max-w-5xl mx-auto">
          {t.team.members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.55,
                delay: index * 0.12,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="group flex flex-col items-center text-center"
            >
              <TeamPhotoCard
                name={member.name}
                role={member.role}
                photo={member.photo}
              />

              {/* Name */}
              <h3 className="text-[19px] sm:text-[21px] font-geist font-semibold text-white tracking-tight">
                {member.name}
              </h3>

              {/* Role / Job Title */}
              <p className="text-[13px] sm:text-[14px] text-[#9ce607] font-geist mt-1.5 leading-snug font-medium">
                {member.role}
              </p>

              {/* Short Bio Description */}
              <p className="text-[13px] sm:text-[14px] leading-[1.65] text-neutral-400 font-geist text-center max-w-[300px] mx-auto mt-4">
                {member.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
