import React, { useState } from 'react';
import { motion } from 'motion/react';
import veljkoPortrait from '../assets/images/team_veljko_portrait_1790277549066.jpg';
import velimirPortrait from '../assets/images/team_velimir_portrait_1790277566113.jpg';
import vukPortrait from '../assets/images/team_vuk_portrait_1790277576497.jpg';

interface TeamMemberNode {
  id: string;
  name: string;
  role: string;
  image: string;
  isLeader?: boolean;
}

const THREE_FOUNDERS: TeamMemberNode[] = [
  {
    id: 'veljko',
    name: 'Veljko',
    role: 'CEO & Creative Lead',
    image: veljkoPortrait,
    isLeader: true,
  },
  {
    id: 'velimir',
    name: 'Velimir',
    role: 'CTO & AI Architect',
    image: velimirPortrait,
  },
  {
    id: 'vuk',
    name: 'Vuk',
    role: 'Head of Growth',
    image: vukPortrait,
  },
];

export const DirectPartnershipSection: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <section
      id="direct-partnership-section"
      className="relative w-full bg-[#050608] text-white py-24 sm:py-32 lg:py-36 px-4 sm:px-6 lg:px-8 border-t border-white/[0.07] overflow-hidden select-none"
    >
      {/* Atmospheric Central Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[600px] sm:h-[850px] pointer-events-none -z-0 opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(168, 243, 0, 0.1) 45%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        
        {/* Top Eyebrow: EXACT MATCH */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[11px] sm:text-[12px] font-mono tracking-[0.25em] uppercase text-neutral-400 font-semibold mb-6"
        >
          DIRECT COLLABORATION
        </motion.div>

        {/* Main Headline: Matching typography exactly */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-geist font-medium text-[34px] sm:text-[50px] md:text-[60px] lg:text-[66px] leading-[1.08] tracking-[-0.03em] text-white max-w-4xl"
        >
          A development partner,{' '}
          <span className="font-editorial italic font-normal text-white">not</span>
          <br />
          <span className="font-editorial italic font-normal text-white">
            another layer of management.
          </span>
        </motion.h2>

        {/* Sub-paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-[14px] sm:text-[16px] leading-[1.7] text-neutral-400 font-geist font-normal max-w-2xl"
        >
          Every request goes straight to the people who build it. No bloated account tiers, no telephone games—specialists pick up the work, QA runs before anything ships, and the same team stays with your product afterwards.
        </motion.p>

        {/* ========================================================================= */}
        {/* CONSTELLATION ORBITAL DIAGRAM                                            */}
        {/* ========================================================================= */}
        <div className="relative w-full max-w-[650px] sm:max-w-[740px] aspect-square mx-auto mt-12 sm:mt-16 flex items-center justify-center">
          
          {/* Concentric Thin Orbit Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Ring 1 (Innermost) */}
            <div className="w-[32%] aspect-square rounded-full border border-indigo-500/20" />
            {/* Ring 2 */}
            <div className="w-[54%] aspect-square rounded-full border border-indigo-500/20" />
            {/* Ring 3 */}
            <div className="w-[78%] aspect-square rounded-full border border-indigo-500/15" />
            {/* Ring 4 (Outermost) */}
            <div className="w-[98%] aspect-square rounded-full border border-indigo-500/10" />
          </div>

          {/* SVG Network Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {/* Lines connecting the 3 founders to each other */}
            <line x1="50%" y1="16%" x2="24%" y2="76%" stroke="rgba(99, 102, 241, 0.22)" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="50%" y1="16%" x2="76%" y2="76%" stroke="rgba(99, 102, 241, 0.22)" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="24%" y1="76%" x2="76%" y2="76%" stroke="rgba(99, 102, 241, 0.22)" strokeWidth="1" strokeDasharray="3 3" />

            {/* Direct lines from each founder to the center "Your Product" */}
            <line x1="50%" y1="16%" x2="50%" y2="50%" stroke="rgba(168, 243, 0, 0.35)" strokeWidth="1.2" />
            <line x1="24%" y1="76%" x2="50%" y2="50%" stroke="rgba(99, 102, 241, 0.25)" strokeWidth="1" />
            <line x1="76%" y1="76%" x2="50%" y2="50%" stroke="rgba(99, 102, 241, 0.25)" strokeWidth="1" />

            {/* Line connecting to the Floating Task Card */}
            <line x1="50%" y1="22%" x2="50%" y2="35%" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
          </svg>

          {/* ======================================================================= */}
          {/* CENTERPIECE: Isometric Stack + "Your Product" + Question Pill           */}
          {/* ======================================================================= */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            
            {/* Floating Question Pill: "Will this scale long term?" */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-4 inline-flex items-center px-4 py-1.5 rounded-full bg-[#071317]/90 border border-teal-500/50 text-teal-300 text-[11px] sm:text-[12px] font-mono shadow-[0_0_20px_rgba(20,184,166,0.3)] backdrop-blur-md"
            >
              Will this scale long term?
            </motion.div>

            {/* Isometric Layered Stack Icon */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center cursor-pointer group"
            >
              {/* Diffuse aura under stack */}
              <div className="absolute inset-0 rounded-2xl bg-indigo-500/30 blur-xl group-hover:bg-[#a8f300]/25 transition-all" />

              <svg viewBox="0 0 64 64" className="w-14 h-14 sm:w-16 sm:h-16 relative z-10 drop-shadow-[0_8px_20px_rgba(99,102,241,0.5)]" fill="none">
                {/* Top Layer */}
                <path
                  d="M32 10L52 20L32 30L12 20L32 10Z"
                  stroke="#818cf8"
                  strokeWidth="2"
                  fill="rgba(99, 102, 241, 0.25)"
                />
                {/* Middle Layer */}
                <path
                  d="M12 28L32 38L52 28"
                  stroke="#a5b4fc"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Bottom Layer */}
                <path
                  d="M12 36L32 46L52 36"
                  stroke="#c7d2fe"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>

            {/* Center Text: "Your Product" */}
            <div className="mt-2 font-geist font-medium text-[16px] sm:text-[18px] text-white tracking-tight">
              Your{' '}
              <span className="font-editorial italic font-normal text-neutral-200">
                Product
              </span>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* FLOATING TASK CARD: "NEW FEATURE" (Directly above the center stack)    */}
          {/* ======================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="absolute top-[28%] sm:top-[29%] left-1/2 -translate-x-1/2 z-20 w-52 sm:w-60 p-3 sm:p-3.5 rounded-2xl bg-white text-neutral-900 shadow-[0_16px_40px_rgba(0,0,0,0.6)] border border-neutral-200 text-left"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono font-bold tracking-wider text-neutral-500 uppercase">
                NEW FEATURE
              </span>
              <span className="w-3.5 h-3.5 rounded-full border-2 border-neutral-300" />
            </div>
            <p className="text-[11px] sm:text-[12px] font-geist font-medium text-neutral-800 leading-snug">
              Integrate an AI-powered RAG assistant into our website and app.
            </p>
          </motion.div>

          {/* ======================================================================= */}
          {/* THREE FOUNDERS (NODES): Veljko, Velimir, Vuk                            */}
          {/* ======================================================================= */}

          {/* 1. TOP NODE: VELJKO (With Blue / Electric Glowing Halo matching screenshot) */}
          <div className="absolute top-[3%] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              onClick={() => setActiveNode('veljko')}
              className="relative cursor-pointer group"
            >
              {/* Electric Blue Luminous Aura behind leader avatar */}
              <div className="absolute -inset-2.5 rounded-full bg-blue-500/80 blur-md group-hover:bg-blue-400 transition-all animate-pulse" />
              
              {/* Avatar Frame */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white shadow-2xl bg-neutral-800">
                <img
                  src={THREE_FOUNDERS[0].image}
                  alt={THREE_FOUNDERS[0].name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale contrast-110"
                />
              </div>
            </motion.div>

            {/* Name & Role Label */}
            <div className="mt-2 text-center">
              <div className="text-[13px] sm:text-[14px] font-geist font-medium text-white">
                {THREE_FOUNDERS[0].name}
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono text-neutral-400">
                {THREE_FOUNDERS[0].role}
              </div>
            </div>
          </div>

          {/* 2. BOTTOM-LEFT NODE: VELIMIR */}
          <div className="absolute bottom-[8%] left-[12%] sm:left-[16%] z-30 flex flex-col items-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              onClick={() => setActiveNode('velimir')}
              className="relative cursor-pointer group"
            >
              {/* Subtle halo */}
              <div className="absolute -inset-1.5 rounded-full bg-indigo-500/30 blur-sm group-hover:bg-indigo-400/50 transition-all" />
              
              {/* Avatar Frame */}
              <div className="relative w-14 h-14 sm:w-18 sm:h-18 rounded-full overflow-hidden border border-white/40 shadow-xl bg-neutral-800">
                <img
                  src={THREE_FOUNDERS[1].image}
                  alt={THREE_FOUNDERS[1].name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale contrast-110"
                />
              </div>
            </motion.div>

            {/* Name & Role Label */}
            <div className="mt-2 text-center">
              <div className="text-[13px] sm:text-[14px] font-geist font-medium text-white">
                {THREE_FOUNDERS[1].name}
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono text-neutral-400">
                {THREE_FOUNDERS[1].role}
              </div>
            </div>
          </div>

          {/* 3. BOTTOM-RIGHT NODE: VUK */}
          <div className="absolute bottom-[8%] right-[12%] sm:right-[16%] z-30 flex flex-col items-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              onClick={() => setActiveNode('vuk')}
              className="relative cursor-pointer group"
            >
              {/* Subtle halo */}
              <div className="absolute -inset-1.5 rounded-full bg-indigo-500/30 blur-sm group-hover:bg-indigo-400/50 transition-all" />
              
              {/* Avatar Frame */}
              <div className="relative w-14 h-14 sm:w-18 sm:h-18 rounded-full overflow-hidden border border-white/40 shadow-xl bg-neutral-800">
                <img
                  src={THREE_FOUNDERS[2].image}
                  alt={THREE_FOUNDERS[2].name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale contrast-110"
                />
              </div>
            </motion.div>

            {/* Name & Role Label */}
            <div className="mt-2 text-center">
              <div className="text-[13px] sm:text-[14px] font-geist font-medium text-white">
                {THREE_FOUNDERS[2].name}
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono text-neutral-400">
                {THREE_FOUNDERS[2].role}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
