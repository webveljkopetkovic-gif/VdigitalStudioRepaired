import React, { useEffect, useRef, useState, useCallback } from 'react';

/* =========================================================================
   DATA STRUCTURES (TEAM, P, CARD_POS, SIDE, SCENARIOS, ORBIT_TOOLS, ARCH)
   ========================================================================= */

export type NodeId = 'caller' | 'dev' | 'editor' | 'center';

export interface TeamMemberConfig {
  role: string;
  name: string;
}

export const TEAM: Record<'caller' | 'dev' | 'editor', TeamMemberConfig> = {
  caller: { role: 'Cold Caller', name: 'Vuk' },
  dev: { role: 'Web Developer', name: 'Veljko' },
  editor: { role: 'Video Editor', name: 'Velimir' },
};

// Positions in the 700x700 SVG coordinate space (center shifted down to leave crown clearance)
export const P: Record<NodeId, [number, number]> = {
  caller: [350, 125],
  dev: [566.5, 500],
  editor: [133.5, 500],
  center: [350, 375],
};

// Conflict-free card positions in the 700x700 coordinate space (guaranteed zero overlap with icons, avatars, and bubbles)
export const CARD_POS: Record<NodeId, [number, number]> = {
  caller: [485, 235], // Upper-right open area, far below arch icons (clear of slot 6 & 7) and right of Vuk
  dev: [420, 580],    // Lower clearing, below and to the left of dev
  editor: [280, 580], // Lower clearing, below and to the right of editor
  center: [520, 375], // Clean right clearing next to center node
};

// Which side of each person the task card sits on (-1 left, 1 right, 0 on center)
export const SIDE: Record<NodeId, number> = {
  caller: 1,
  dev: -1,
  editor: 1,
  center: 0,
};

// 9 Arch Slots across the elevated top crown dome (R=368, center=(350, 375), 158° to 22°)
// Slot 4 is the top apex at (350, 7) - distanced 118px above the circle!
export interface ArchSlot {
  x: number;
  y: number;
  angle: number;
}

export const ARCH_SLOTS: ArchSlot[] = [
  { x: 9, y: 237, angle: 158 },
  { x: 64, y: 143, angle: 141 },
  { x: 144, y: 70, angle: 124 },
  { x: 242, y: 23, angle: 107 },
  { x: 350, y: 7, angle: 90 }, // APEX center
  { x: 458, y: 23, angle: 73 },
  { x: 556, y: 70, angle: 56 },
  { x: 636, y: 143, angle: 39 },
  { x: 691, y: 237, angle: 22 },
];

export interface OrbitTool {
  id: string;
  name: string;
  role: string;
  accentColor: string;
  icon: React.ReactNode;
  iconMini: React.ReactNode;
}

export const ORBIT_TOOLS: OrbitTool[] = [
  {
    id: 'tiktok',
    name: 'TikTok',
    role: 'Viral Formats & Short-Form',
    accentColor: '#00f2fe',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-[64%] h-[64%] drop-shadow-[0_0_10px_rgba(0,242,254,0.45)]">
        {/* Cyan chromatic aberration */}
        <path
          d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.3 0 .59.04.86.12V9.41a6.34 6.34 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 10.82 4.49 6.29 6.29 0 0 0 1.86-4.48V8.59a8.2 8.2 0 0 0 4.77 1.52V6.69z"
          fill="#00F2FE"
          transform="translate(-0.8, -0.4)"
          opacity="0.85"
        />
        {/* Red/Magenta chromatic aberration */}
        <path
          d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.3 0 .59.04.86.12V9.41a6.34 6.34 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 10.82 4.49 6.29 6.29 0 0 0 1.86-4.48V8.59a8.2 8.2 0 0 0 4.77 1.52V6.69z"
          fill="#FE2C55"
          transform="translate(0.8, 0.4)"
          opacity="0.85"
        />
        {/* Main white glyph */}
        <path
          d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.3 0 .59.04.86.12V9.41a6.34 6.34 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 10.82 4.49 6.29 6.29 0 0 0 1.86-4.48V8.59a8.2 8.2 0 0 0 4.77 1.52V6.69z"
          fill="#FFFFFF"
        />
      </svg>
    ),
    iconMini: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-white">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.3 0 .59.04.86.12V9.41a6.34 6.34 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 10.82 4.49 6.29 6.29 0 0 0 1.86-4.48V8.59a8.2 8.2 0 0 0 4.77 1.52V6.69z" />
      </svg>
    ),
  },
  {
    id: 'cursor',
    name: 'Cursor',
    role: 'AI-Powered Code Engine',
    accentColor: '#ffffff',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-[62%] h-[62%] drop-shadow-[0_0_10px_rgba(255,255,255,0.35)]">
        <path d="M12 2L20.5 7L12 12L3.5 7L12 2Z" fill="#FFFFFF" opacity="0.95" />
        <path d="M3.5 7V17L12 22V12L3.5 7Z" fill="#A0A0A0" opacity="0.85" />
        <path d="M12 12V22L20.5 17V7L12 12Z" fill="#555555" opacity="0.65" />
      </svg>
    ),
    iconMini: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-white">
        <path d="M12 2L20.5 7L12 12L3.5 7L12 2Z" fill="currentColor" opacity="0.95" />
        <path d="M3.5 7V17L12 22V12L3.5 7Z" fill="currentColor" opacity="0.75" />
      </svg>
    ),
  },
  {
    id: 'claude',
    name: 'Claude',
    role: 'AI Logic & Copy Architect',
    accentColor: '#d97706',
    icon: (
      <svg viewBox="0 0 24 24" fill="#D97706" className="w-[64%] h-[64%] drop-shadow-[0_0_10px_rgba(217,119,6,0.45)]">
        <path d="M13.8 2.5a1.2 1.2 0 0 0-2.3 0l-.6 3.8a1.2 1.2 0 0 1-.8.9l-3.6 1.3a1.2 1.2 0 0 0-.4 2.3l3.5 1.5a1.2 1.2 0 0 1 .7.8l.8 3.8a1.2 1.2 0 0 0 2.3.2l1-3.7a1.2 1.2 0 0 1 .8-.8l3.7-.8a1.2 1.2 0 0 0 .5-2.3l-3.6-1.5a1.2 1.2 0 0 1-.8-.8l-.8-3.9z" />
        <circle cx="5" cy="18" r="1.5" fill="#D97706" opacity="0.7" />
        <circle cx="19" cy="6" r="1.3" fill="#D97706" opacity="0.7" />
      </svg>
    ),
    iconMini: (
      <svg viewBox="0 0 24 24" fill="#D97706" className="w-3.5 h-3.5">
        <path d="M13.8 2.5a1.2 1.2 0 0 0-2.3 0l-.6 3.8a1.2 1.2 0 0 1-.8.9l-3.6 1.3a1.2 1.2 0 0 0-.4 2.3l3.5 1.5a1.2 1.2 0 0 1 .7.8l.8 3.8a1.2 1.2 0 0 0 2.3.2l1-3.7a1.2 1.2 0 0 1 .8-.8l3.7-.8a1.2 1.2 0 0 0 .5-2.3l-3.6-1.5a1.2 1.2 0 0 1-.8-.8l-.8-3.9z" />
      </svg>
    ),
  },
  {
    id: 'ae',
    name: 'After Effects',
    role: 'VFX & Kinetic Motion',
    accentColor: '#9999ff',
    icon: (
      <div className="w-[78%] h-[78%] rounded-[8px] bg-[#00005B] border border-[#9999FF]/80 grid place-items-center font-bold text-[13px] sm:text-[14px] text-[#9999FF] leading-none tracking-tight shadow-[0_0_14px_rgba(153,153,255,0.45)]">
        Ae
      </div>
    ),
    iconMini: (
      <span className="w-3.5 h-3.5 rounded-[2px] bg-[#00005B] border border-[#9999FF]/60 grid place-items-center font-bold text-[8px] text-[#9999FF] leading-none">
        Ae
      </span>
    ),
  },
  {
    id: 'meta',
    name: 'Meta',
    role: 'Paid Acquisition & Audience',
    accentColor: '#0080fb',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[64%] h-[64%] text-[#0080fb] drop-shadow-[0_0_10px_rgba(0,128,251,0.45)]">
        <path d="M6.9 7.2C4.1 7.2 2 9.4 2 12.2c0 2.7 2.1 4.9 4.9 4.9 1.7 0 3.3-.8 4.2-2.2l.9-1.3.9 1.3c1 1.4 2.5 2.2 4.2 2.2 2.8 0 4.9-2.2 4.9-4.9s-2.1-4.9-4.9-4.9c-1.7 0-3.3.8-4.2 2.2l-.9 1.3-.9-1.3c-1-1.4-2.5-2.2-4.2-2.2zm0 2.4c1 0 1.9.5 2.5 1.3l1.8 2.6c-.6.9-1.5 1.4-2.5 1.4-1.5 0-2.6-1.2-2.6-2.6 0-1.5 1.1-2.7 2.6-2.7zm10.2 0c1.5 0 2.6 1.2 2.6 2.7 0 1.5-1.1 2.6-2.6 2.6-1 0-1.9-.5-2.5-1.4l1.8-2.6c.7-.8 1.6-1.3 2.7-1.3z" />
      </svg>
    ),
    iconMini: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#0080fb]">
        <path d="M6.9 7.2C4.1 7.2 2 9.4 2 12.2c0 2.7 2.1 4.9 4.9 4.9 1.7 0 3.3-.8 4.2-2.2l.9-1.3.9 1.3c1 1.4 2.5 2.2 4.2 2.2 2.8 0 4.9-2.2 4.9-4.9s-2.1-4.9-4.9-4.9c-1.7 0-3.3.8-4.2 2.2l-.9 1.3-.9-1.3c-1-1.4-2.5-2.2-4.2-2.2zm0 2.4c1 0 1.9.5 2.5 1.3l1.8 2.6c-.6.9-1.5 1.4-2.5 1.4-1.5 0-2.6-1.2-2.6-2.6 0-1.5 1.1-2.7 2.6-2.7zm10.2 0c1.5 0 2.6 1.2 2.6 2.7 0 1.5-1.1 2.6-2.6 2.6-1 0-1.9-.5-2.5-1.4l1.8-2.6c.7-.8 1.6-1.3 2.7-1.3z" />
      </svg>
    ),
  },
  {
    id: 'weweb',
    name: 'WeWeb',
    role: 'Production Web App Engine',
    accentColor: '#06b6d4',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-[62%] h-[62%] text-[#06B6D4] drop-shadow-[0_0_10px_rgba(6,182,212,0.45)]">
        <path d="M2.5 8L6 17L9.5 8L13 17L16.5 8" />
        <path d="M14.5 8L18 17L21.5 8" opacity="0.65" stroke="#4F46E5" />
      </svg>
    ),
    iconMini: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-[#06B6D4]">
        <path d="M2.5 8L6 17L9.5 8L13 17L16.5 8" />
        <path d="M14.5 8L18 17L21.5 8" opacity="0.7" />
      </svg>
    ),
  },
  {
    id: 'figma',
    name: 'Figma',
    role: 'Design Systems & UI/UX',
    accentColor: '#a259ff',
    icon: (
      <svg viewBox="0 0 38 57" fill="none" className="w-[52%] h-[52%] drop-shadow-[0_0_10px_rgba(162,89,255,0.45)]">
        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38H19V28.5Z" fill="#1ABCFE" />
        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
      </svg>
    ),
    iconMini: (
      <span className="w-3.5 h-3.5 rounded-full bg-[#A259FF]/20 border border-[#A259FF]/60 grid place-items-center font-bold text-[8px] text-[#A259FF] leading-none">
        Fg
      </span>
    ),
  },
  {
    id: 'instagram',
    name: 'Instagram',
    role: 'Visual Growth & Reels',
    accentColor: '#fd1d1d',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-[62%] h-[62%] drop-shadow-[0_0_10px_rgba(253,29,29,0.45)]">
        <defs>
          <linearGradient id="igGlowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f09433" />
            <stop offset="35%" stopColor="#e6683c" />
            <stop offset="65%" stopColor="#dc2743" />
            <stop offset="100%" stopColor="#bc1888" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#igGlowGrad)" strokeWidth="2.2" />
        <circle cx="12" cy="12" r="4" stroke="url(#igGlowGrad)" strokeWidth="2.2" />
        <circle cx="17.5" cy="6.5" r="1.3" fill="url(#igGlowGrad)" />
      </svg>
    ),
    iconMini: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-[#e6683c]">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      </svg>
    ),
  },
  {
    id: 'facebook',
    name: 'Facebook',
    role: 'Community & Scaled Reach',
    accentColor: '#1877f2',
    icon: (
      <svg viewBox="0 0 24 24" fill="#1877F2" className="w-[64%] h-[64%] drop-shadow-[0_0_10px_rgba(24,119,242,0.45)]">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    iconMini: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#1877F2]">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
];

export interface ScenarioStep {
  at: NodeId;
  v: 'n' | 'warn' | 'ok';
  bubble: string;
  say: string;
}

export interface Scenario {
  tab: string;
  sub: string;
  badge: string;
  summary: string;
  tag: string;
  steps: ScenarioStep[];
}

export const SCENARIOS: Scenario[] = [
  {
    tab: 'New client',
    sub: 'Full pipeline kickoff',
    badge: '3 steps',
    summary:
      'A warm lead responds to cold outreach. Vuk qualifies their goals, Veljko builds a high-conversion landing page, and Velimir scripts and produces the launch video.',
    tag: 'Lead',
    steps: [
      {
        at: 'caller',
        v: 'n',
        bubble: 'Call booked: 20 min.',
        say: 'Spoke with Sarah (founder at Kova). Current agency charges $4.5k/mo with zero pipeline visibility. She needs a modern site and 8 reels before end of month.',
      },
      {
        at: 'dev',
        v: 'n',
        bubble: 'Site live in 4 days.',
        say: 'Clean Framer build with CMS, fast load times, and Calendly baked right into the hero. First draft ready for client review.',
      },
      {
        at: 'editor',
        v: 'n',
        bubble: '4 launch reels ready.',
        say: 'Hook-first cut, dynamic captions, and sound design styled after their brand colors. Cut for 9:16 and ready for ad spend.',
      },
      {
        at: 'caller',
        v: 'warn',
        bubble: 'Client: change the hook.',
        say: 'Client loved the video pacing, but requested the hook emphasize their guarantee over the discount. Let us re-cut reel #2.',
      },
      {
        at: 'editor',
        v: 'ok',
        bubble: 'New cut approved.',
        say: 'Swapped hook with b-roll of the founder speaking. Re-rendered in 40 minutes and pushed to Google Drive.',
      },
      {
        at: 'center',
        v: 'ok',
        bubble: 'Pipeline live',
        say: 'First lead landed within 3 hours of campaign launch. Sarah sent an email: "Best onboarding we have ever had."',
      },
    ],
  },
  {
    tab: 'Video outreach',
    sub: 'Cold video campaign',
    badge: '4 steps',
    summary:
      'Velimir crafts a personalized video teardown, Veljko spins up a dynamic video landing page, and Vuk closes the meeting directly on the phone.',
    tag: 'Teardown',
    steps: [
      {
        at: 'editor',
        v: 'n',
        bubble: 'Audit video recorded.',
        say: 'Recorded a 90-second screen teardown showing 3 bottlenecks on the prospect current checkout flow.',
      },
      {
        at: 'dev',
        v: 'n',
        bubble: 'Personalized page live.',
        say: 'Hosted the video on a custom slug with their logo, current metrics, and a 1-click booking button underneath.',
      },
      {
        at: 'caller',
        v: 'n',
        bubble: 'Follow-up call dialed.',
        say: 'Noticed the prospect watched 85% of the video. Called 10 minutes later while the value was top of mind.',
      },
      {
        at: 'caller',
        v: 'warn',
        bubble: 'Prospect: Send case studies.',
        say: 'Decision maker wants proof of ROI in their exact niche (SaaS B2B).',
      },
      {
        at: 'dev',
        v: 'n',
        bubble: 'Case studies added.',
        say: 'Added 2 relevant case studies and an interactive calculator to their personalized landing page.',
      },
      {
        at: 'caller',
        v: 'ok',
        bubble: 'Contract signed.',
        say: 'Prospect reviewed the numbers and signed the kickoff agreement. Initial deposit secured.',
      },
      {
        at: 'center',
        v: 'ok',
        bubble: 'Deal Closed',
        say: 'Onboarding packet dispatched.',
      },
    ],
  },
  {
    tab: 'Monthly retainer',
    sub: 'Ongoing growth loop',
    badge: 'Continuous',
    summary:
      'Continuous weekly cycle: caller brings customer objections and market feedback, developer updates pages and conversion assets, editor ships fresh high-converting creative.',
    tag: 'Sprint',
    steps: [
      {
        at: 'caller',
        v: 'n',
        bubble: 'Feedback from 30 calls.',
        say: 'Conducted 30 customer discovery calls this week. Main takeaway: prospects want faster turnaround and fixed pricing.',
      },
      {
        at: 'dev',
        v: 'n',
        bubble: 'Campaign page live.',
        say: 'Built a landing page for the campaign with a short form and tracking, so we know which reel brings leads.',
      },
      {
        at: 'caller',
        v: 'warn',
        bubble: 'Leads ask for prices.',
        say: '12 leads came in, but almost everyone asks about price first. The page does not answer that.',
      },
      {
        at: 'dev',
        v: 'n',
        bubble: 'Pricing + FAQ added.',
        say: 'Added a pricing block and the 5 questions you hear most on calls.',
      },
      {
        at: 'editor',
        v: 'n',
        bubble: 'Price reel posted.',
        say: 'Made one more reel answering the price question directly. It links to the same page.',
      },
      {
        at: 'caller',
        v: 'ok',
        bubble: '5 new bookings.',
        say: 'Calls are much shorter now. 5 new bookings this month from the campaign.',
      },
      {
        at: 'center',
        v: 'ok',
        bubble: 'Delivered',
        say: 'Monthly report sent to the client.',
      },
    ],
  },
];

// Key helper for connecting lines
const key = (a: string, b: string) => [a, b].sort().join('-');
const NODE_IDS: NodeId[] = ['caller', 'dev', 'editor', 'center'];

// Pairs of all nodes
const PAIRS: [NodeId, NodeId][] = [];
for (let i = 0; i < NODE_IDS.length; i++) {
  for (let j = i + 1; j < NODE_IDS.length; j++) {
    PAIRS.push([NODE_IDS[i], NODE_IDS[j]]);
  }
}

// 24 decorative ticks on the middle ring (r=185, cy=375)
const TICKS = Array.from({ length: 24 }, (_, i) => {
  const angle = (i / 24) * Math.PI * 2;
  return {
    cx: 350 + 185 * Math.cos(angle),
    cy: 375 + 185 * Math.sin(angle),
    r: i % 3 === 0 ? 2 : 1.2,
  };
});

/* =========================================================================
   COMPONENT IMPLEMENTATION
   ========================================================================= */

export const TeamOrbit: React.FC = () => {
  // Playback state
  const [isPaused, setIsPaused] = useState(false);

  // Arch Carousel State: 0-8 step offset
  const [rotationStep, setRotationStep] = useState(0);
  const [isHoveringArch, setIsHoveringArch] = useState(false);

  // DOM element references
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardTagRef = useRef<HTMLDivElement>(null);
  const cardTxtRef = useRef<HTMLParagraphElement>(null);
  const beamRef = useRef<SVGLineElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const dotGlowRef = useRef<SVGCircleElement>(null);
  const centerNodeRef = useRef<HTMLDivElement>(null);
  const centerBubbleRef = useRef<HTMLDivElement>(null);

  // References to dynamic elements
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const bubbleRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const litEdgeRefs = useRef<Record<string, SVGLineElement | null>>({});

  // Engine state references
  const generationRef = useRef(0);
  const userPausedRef = useRef(false);
  const isVisibleRef = useRef(true);
  const activeRafIdRef = useRef<number | null>(null);

  // When clicking any tool on the arch: rotate it to the apex (Slot 4)
  const handleSelectTool = useCallback((toolIndex: number, currentSlot: number) => {
    const delta = (4 - currentSlot + ORBIT_TOOLS.length) % ORBIT_TOOLS.length;
    setRotationStep((prev) => (prev + delta) % ORBIT_TOOLS.length);
  }, []);

  // Automatic gentle rotation of the arch carousel every 5.5s
  useEffect(() => {
    if (isPaused || isHoveringArch) return;
    const interval = setInterval(() => {
      if (isVisibleRef.current) {
        setRotationStep((prev) => (prev + 1) % ORBIT_TOOLS.length);
      }
    }, 5500);

    return () => clearInterval(interval);
  }, [isPaused, isHoveringArch]);

  // Easing helper
  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  // Pausable delay supporting pause/play and cancellation
  const pausableDelay = useCallback((duration: number, gen: number): Promise<boolean> => {
    return new Promise((resolve) => {
      const start = performance.now();
      let elapsed = 0;
      let lastTime = start;

      const tick = (now: number) => {
        if (generationRef.current !== gen) {
          resolve(false);
          return;
        }

        if (!userPausedRef.current && isVisibleRef.current) {
          elapsed += now - lastTime;
        }
        lastTime = now;

        if (elapsed >= duration) {
          resolve(true);
        } else {
          activeRafIdRef.current = requestAnimationFrame(tick);
        }
      };

      activeRafIdRef.current = requestAnimationFrame(tick);
    });
  }, []);

  // Animate traveling beam between nodes
  const animateBeam = useCallback(
    (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      duration: number,
      gen: number
    ): Promise<boolean> => {
      return new Promise((resolve) => {
        const beam = beamRef.current;
        const dot = dotRef.current;
        const dotGlow = dotGlowRef.current;

        if (!beam || !dot || !dotGlow) {
          resolve(true);
          return;
        }

        beam.setAttribute('x1', String(x1));
        beam.setAttribute('y1', String(y1));
        beam.setAttribute('x2', String(x1));
        beam.setAttribute('y2', String(y1));
        beam.style.opacity = '1';

        dot.setAttribute('cx', String(x1));
        dot.setAttribute('cy', String(y1));
        dot.style.opacity = '1';

        dotGlow.setAttribute('cx', String(x1));
        dotGlow.setAttribute('cy', String(y1));
        dotGlow.style.opacity = '0.9';

        let elapsed = 0;
        let lastTime = performance.now();

        const frame = (now: number) => {
          if (generationRef.current !== gen) {
            beam.style.opacity = '0';
            dot.style.opacity = '0';
            dotGlow.style.opacity = '0';
            resolve(false);
            return;
          }

          if (!userPausedRef.current && isVisibleRef.current) {
            elapsed += now - lastTime;
          }
          lastTime = now;

          const p = Math.min(1, elapsed / duration);
          const e = easeInOutCubic(p);

          const cx = x1 + (x2 - x1) * e;
          const cy = y1 + (y2 - y1) * e;

          const tailLen = 0.35;
          const tailP = Math.max(0, (e - tailLen) / (1 - tailLen));
          const tx = x1 + (x2 - x1) * tailP;
          const ty = y1 + (y2 - y1) * tailP;

          beam.setAttribute('x1', String(tx));
          beam.setAttribute('y1', String(ty));
          beam.setAttribute('x2', String(cx));
          beam.setAttribute('y2', String(cy));

          dot.setAttribute('cx', String(cx));
          dot.setAttribute('cy', String(cy));
          dotGlow.setAttribute('cx', String(cx));
          dotGlow.setAttribute('cy', String(cy));

          if (p < 1) {
            activeRafIdRef.current = requestAnimationFrame(frame);
          } else {
            beam.style.opacity = '0';
            dot.style.opacity = '0';
            dotGlow.style.opacity = '0';
            resolve(true);
          }
        };

        activeRafIdRef.current = requestAnimationFrame(frame);
      });
    },
    []
  );

  // Safe position calculator for task card (no overlap with avatars or bubbles)
  const getCardPos = useCallback((at: NodeId) => {
    const coords = CARD_POS[at];
    return {
      left: `${(coords[0] / 700) * 100}%`,
      top: `${(coords[1] / 700) * 100}%`,
    };
  }, []);

  // Update card content and display
  const showCardAt = useCallback(
    (at: NodeId, tag: string, text: string, done: boolean) => {
      const card = cardRef.current;
      const cardTag = cardTagRef.current;
      const cardTxt = cardTxtRef.current;

      if (!card || !cardTag || !cardTxt) return;

      const pos = getCardPos(at);
      card.style.left = pos.left;
      card.style.top = pos.top;

      cardTag.textContent = tag;
      cardTxt.textContent = text;

      if (done) {
        card.classList.add('is-done');
      } else {
        card.classList.remove('is-done');
      }

      card.classList.add('is-show');
    },
    [getCardPos]
  );

  // Hide the task card
  const hideCard = useCallback(() => {
    cardRef.current?.classList.remove('is-show');
  }, []);

  // Clear all visual stage states
  const resetStage = useCallback(() => {
    Object.values(nodeRefs.current).forEach((el: HTMLDivElement | null) => {
      el?.classList.remove('is-active', 'is-semi');
    });

    centerNodeRef.current?.classList.remove('is-glow');

    Object.values(bubbleRefs.current).forEach((b: HTMLDivElement | null) => {
      if (b) {
        b.className = 'team-orbit-bubble';
        b.textContent = '';
      }
    });

    if (centerBubbleRef.current) {
      centerBubbleRef.current.className = 'team-orbit-bubble';
      centerBubbleRef.current.textContent = '';
    }

    Object.values(litEdgeRefs.current).forEach((l: SVGLineElement | null) => {
      if (l) l.classList.remove('is-on');
    });

    hideCard();
  }, [hideCard]);

  // Display status bubble on a node
  const setNodeBubble = useCallback(
    (at: NodeId, text: string, variant: 'n' | 'warn' | 'ok') => {
      let b: HTMLDivElement | null = null;
      if (at === 'center') {
        b = centerBubbleRef.current;
      } else {
        b = bubbleRefs.current[at] || null;
      }

      if (!b) return;

      b.textContent = text;
      b.className = 'team-orbit-bubble is-show';
      if (variant === 'warn') b.classList.add('is-warn');
      if (variant === 'ok') b.classList.add('is-ok');
    },
    []
  );

  // Activate avatar / center node state
  const setActiveNode = useCallback((at: NodeId) => {
    Object.values(nodeRefs.current).forEach((el: HTMLDivElement | null) => {
      el?.classList.remove('is-active', 'is-semi');
    });
    centerNodeRef.current?.classList.remove('is-glow');

    if (at === 'center') {
      centerNodeRef.current?.classList.add('is-glow');
    } else {
      const node = nodeRefs.current[at];
      node?.classList.add('is-active');
    }
  }, []);

  // Illuminate connecting edge between nodes
  const lightEdge = useCallback((from: NodeId, to: NodeId) => {
    const k = key(from, to);
    const line = litEdgeRefs.current[k];
    if (line) {
      line.classList.add('is-on');
    }
  }, []);

  // Run a scenario from start to finish
  const runScenario = useCallback(
    async (sIndex: number, gen: number): Promise<boolean> => {
      const scenario = SCENARIOS[sIndex];
      resetStage();

      const okInit = await pausableDelay(450, gen);
      if (!okInit) return false;

      let prevAt: NodeId | null = null;

      for (let i = 0; i < scenario.steps.length; i++) {
        const step = scenario.steps[i];
        const isDone = i === scenario.steps.length - 1;

        if (prevAt && prevAt !== step.at) {
          const fromPos = P[prevAt];
          const toPos = P[step.at];
          lightEdge(prevAt, step.at);

          const beamOk = await animateBeam(
            fromPos[0],
            fromPos[1],
            toPos[0],
            toPos[1],
            550,
            gen
          );
          if (!beamOk) return false;
        }

        setActiveNode(step.at);
        setNodeBubble(step.at, step.bubble, step.v);
        showCardAt(step.at, scenario.tag, step.say, isDone);

        const stepOk = await pausableDelay(2300, gen);
        if (!stepOk) return false;

        prevAt = step.at;
      }

      const holdOk = await pausableDelay(2800, gen);
      if (!holdOk) return false;

      return true;
    },
    [
      animateBeam,
      lightEdge,
      pausableDelay,
      resetStage,
      setActiveNode,
      setNodeBubble,
      showCardAt,
    ]
  );

  // Core background execution loop across scenarios
  const startEngine = useCallback(
    async (startIndex = 0) => {
      const gen = ++generationRef.current;
      let s = startIndex;

      while (generationRef.current === gen) {
        const completed = await runScenario(s, gen);
        if (!completed) break;
        s = (s + 1) % SCENARIOS.length;
      }
    },
    [runScenario]
  );

  // Monitor visibility in viewport
  useEffect(() => {
    const target = stageRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.2 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  // Initialize engine on mount, clean up on unmount
  useEffect(() => {
    startEngine(0);

    return () => {
      generationRef.current++;
      if (activeRafIdRef.current) {
        cancelAnimationFrame(activeRafIdRef.current);
      }
    };
  }, [startEngine]);

  // Toggle Pause/Play
  const handleTogglePause = () => {
    const nextPaused = !userPausedRef.current;
    userPausedRef.current = nextPaused;
    setIsPaused(nextPaused);
  };

  // Currently active tool at the apex (Slot 4)
  const activeApexToolIdx = (ORBIT_TOOLS.length - rotationStep + 4) % ORBIT_TOOLS.length;
  const activeApexTool = ORBIT_TOOLS[activeApexToolIdx];

  return (
    <section
      id="team-orbit"
      className="relative w-full bg-[#060709] text-white py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/[0.07] overflow-hidden select-none"
    >
      {/* Background Subtle Coordinate Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] -z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1180px] mx-auto flex flex-col items-center">
        {/* Intro Header */}
        <header className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="text-[11px] sm:text-[12px] font-mono tracking-[0.25em] uppercase text-neutral-400 font-semibold mb-3.5 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a8f300] shadow-[0_0_8px_#a8f300]" />
            <span>HOW THE THREE OF US WORK</span>
          </div>
          <h2 className="font-geist font-medium text-[30px] sm:text-[44px] lg:text-[54px] leading-[1.08] tracking-[-0.03em] text-white">
            From the first call to a{' '}
            <span className="font-editorial italic font-normal text-[#a8f300] drop-shadow-[0_0_24px_rgba(168,243,0,0.4)]">
              finished job.
            </span>
          </h2>
          <p className="mt-4 sm:mt-5 text-neutral-400 text-[14.5px] sm:text-[16.5px] leading-[1.65] font-geist font-normal max-w-2xl mx-auto">
            Every project passes through all three of us. The caller brings in the client and their feedback, the developer builds, the editor makes it worth watching. Here is what that looks like in practice.
          </p>
        </header>

        {/* Centerpiece: The Animated Orbit Stage with Arch Carousel & Rotating Circular Arrow */}
        <div className="relative w-full flex flex-col items-center">
          <div
            ref={stageRef}
            id="orbit-stage"
            onMouseEnter={() => setIsHoveringArch(true)}
            onMouseLeave={() => setIsHoveringArch(false)}
            className="relative w-full max-w-[720px] aspect-square select-none overflow-visible mx-auto mt-6 sm:mt-10"
            style={{ containerType: 'inline-size' }}
          >
            <svg viewBox="0 0 700 700" aria-hidden="true" className="absolute inset-0 w-full h-full overflow-visible">
              <defs>
                {/* Radial glow around center */}
                <radialGradient id="orbitGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#a8f300" stopOpacity="0.2" />
                  <stop offset="60%" stopColor="#a8f300" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#a8f300" stopOpacity="0" />
                </radialGradient>
                {/* Blur filter for dot glow */}
                <filter id="orbitBlur" x="-200%" y="-200%" width="500%" height="500%">
                  <feGaussianBlur stdDeviation="4" />
                </filter>
                {/* Arch Gradient */}
                <linearGradient id="archTrackGrad" x1="0%" y1="100%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(168, 243, 0, 0.12)" />
                  <stop offset="50%" stopColor="rgba(168, 243, 0, 0.55)" />
                  <stop offset="100%" stopColor="rgba(168, 243, 0, 0.12)" />
                </linearGradient>
              </defs>

              {/* Ambient glow in center */}
              <circle cx="350" cy="375" r="250" fill="url(#orbitGlow)" />

              {/* 3 Concentric Orbit Rings in site accent / subtle lines */}
              <circle cx="350" cy="375" r="115" fill="none" stroke="rgba(168, 243, 0, 0.16)" strokeWidth="1" />
              <circle cx="350" cy="375" r="185" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
              <circle cx="350" cy="375" r="250" fill="none" stroke="rgba(168, 243, 0, 0.14)" strokeWidth="1" />

              {/* 24 Decorative Ticks on middle ring */}
              <g id="orbit-ticks">
                {TICKS.map((t, idx) => (
                  <circle
                    key={`tick-${idx}`}
                    cx={t.cx}
                    cy={t.cy}
                    r={t.r}
                    fill="rgba(168, 243, 0, 0.35)"
                  />
                ))}
              </g>

              {/* ARCH CAROUSEL TRACK: Curved Arc Path for TikTok, Cursor, Claude, AE, Meta, WeWeb, Figma, Instagram, Facebook */}
              {/* Soft glow halo under the arch */}
              <path
                d="M 9 237 A 368 368 0 0 1 691 237"
                fill="none"
                stroke="rgba(168, 243, 0, 0.12)"
                strokeWidth="10"
                filter="url(#orbitBlur)"
              />
              {/* Primary dashed arch track line */}
              <path
                d="M 9 237 A 368 368 0 0 1 691 237"
                fill="none"
                stroke="url(#archTrackGrad)"
                strokeWidth="2"
                strokeDasharray="5 7"
              />

              {/* Decorative tick dots at each slot along the arch track */}
              {ARCH_SLOTS.map((s, idx) => (
                <circle
                  key={`arch-slot-tick-${idx}`}
                  cx={s.x}
                  cy={s.y}
                  r={idx === 4 ? '4' : '2.2'}
                  fill={idx === 4 ? '#a8f300' : 'rgba(168, 243, 0, 0.45)'}
                />
              ))}

              {/* Background static connecting edges between nodes */}
              <g id="orbit-edges">
                {PAIRS.map(([from, to]) => (
                  <line
                    key={`edge-${from}-${to}`}
                    x1={P[from][0]}
                    y1={P[from][1]}
                    x2={P[to][0]}
                    y2={P[to][1]}
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="1"
                  />
                ))}
              </g>

              {/* Lit edges that illuminate upon message travel */}
              <g id="orbit-lit-edges">
                {PAIRS.map(([from, to]) => {
                  const k = key(from, to);
                  return (
                    <line
                      key={`lit-${k}`}
                      ref={(el) => {
                        litEdgeRefs.current[k] = el;
                      }}
                      x1={P[from][0]}
                      y1={P[from][1]}
                      x2={P[to][0]}
                      y2={P[to][1]}
                      className="transition-opacity duration-700 ease-out"
                      style={{
                        stroke: '#a8f300',
                        strokeWidth: 1.6,
                        opacity: 0,
                      }}
                    />
                  );
                })}
              </g>

              {/* Active traveling beam line */}
              <line
                ref={beamRef}
                style={{
                  stroke: '#a8f300',
                  strokeWidth: 2.2,
                  strokeLinecap: 'round',
                  opacity: 0,
                }}
              />

              {/* Traveling glowing dot pulse */}
              <circle ref={dotGlowRef} r="9" fill="#a8f300" filter="url(#orbitBlur)" opacity="0" />
              <circle ref={dotRef} r="4" fill="#ffffff" opacity="0" />
            </svg>

            {/* 9 TOOL ICONS ON THE ARCH (TikTok, Cursor, Claude, Adobe After Effects, Meta, WeWeb, Figma, Instagram, Facebook) */}
            {ORBIT_TOOLS.map((tool, toolIdx) => {
              // Calculate position along arch based on current rotationStep
              const slotIdx = (toolIdx + rotationStep) % ARCH_SLOTS.length;
              const slot = ARCH_SLOTS[slotIdx];
              const isApex = slotIdx === 4;

              return (
                <div
                  key={tool.id}
                  onClick={() => handleSelectTool(toolIdx, slotIdx)}
                  className={`group absolute -translate-x-1/2 -translate-y-1/2 w-[clamp(44px,7.5cqw,58px)] aspect-square rounded-[16px] bg-[#0c0e17]/95 border backdrop-blur-md grid place-items-center transition-all duration-700 ease-[cubic-bezier(0.34,1.4,0.64,1)] cursor-pointer z-25 ${
                    isApex
                      ? 'border-[#a8f300] shadow-[0_0_28px_rgba(168,243,0,0.5)] scale-115'
                      : 'border-white/18 hover:border-white/50 hover:scale-110 shadow-[0_8px_24px_rgba(0,0,0,0.65)]'
                  }`}
                  style={{
                    left: `${(slot.x / 700) * 100}%`,
                    top: `${(slot.y / 700) * 100}%`,
                  }}
                  title={`${tool.name} • ${tool.role}`}
                >
                  {tool.icon}

                  {/* Apex indicator dot */}
                  {isApex && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#a8f300] shadow-[0_0_10px_#a8f300] border-2 border-[#0c0e17]" />
                  )}

                  {/* Floating tooltip on hover */}
                  <div className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none flex flex-col items-center whitespace-nowrap z-40">
                    <div className="px-2.5 py-1 rounded-[6px] bg-black/95 text-white border border-[#a8f300]/40 text-center shadow-2xl">
                      <div className="text-[11px] font-mono font-bold text-[#a8f300] uppercase tracking-wider">
                        {tool.name}
                      </div>
                      <div className="text-[9.5px] font-geist text-neutral-300">
                        {tool.role}
                      </div>
                    </div>
                    <div className="w-1.5 h-1.5 bg-black rotate-45 border-r border-b border-[#a8f300]/40 -mt-1" />
                  </div>
                </div>
              );
            })}

            {/* Center Node: Stack Icon + "Your business" */}
            <div
              ref={centerNodeRef}
              id="orbit-center"
              className="absolute -translate-x-1/2 -translate-y-1/2 text-center text-[#a8f300] transition-transform duration-500 pointer-events-none"
              style={{
                left: `${(P.center[0] / 700) * 100}%`,
                top: `${(P.center[1] / 700) * 100}%`,
              }}
            >
              {/* Bubble above center */}
              <div
                ref={centerBubbleRef}
                className="team-orbit-bubble"
                style={{ bottom: 'calc(100% + 1cqw)' }}
              />

              {/* Stack Icon */}
              <div className="orbit-center-icon w-[clamp(34px,8cqw,58px)] mx-auto transition-all duration-500">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                  className="w-full h-auto block drop-shadow-[0_4px_16px_rgba(168,243,0,0.3)]"
                >
                  <path d="M12 3 3 8l9 5 9-5-9-5Z" />
                  <path d="m3 12 9 5 9-5" />
                  <path d="m3 16 9 5 9-5" />
                </svg>
              </div>

              {/* Center Label */}
              <div className="font-geist font-medium text-[max(11px,2.1cqw)] text-white mt-[0.6cqw] whitespace-nowrap">
                Your{' '}
                <span className="font-editorial italic font-normal text-[#a8f300]">
                  business
                </span>
              </div>
            </div>

            {/* Three Team Members (caller, dev, editor) */}
            {(['caller', 'dev', 'editor'] as ('caller' | 'dev' | 'editor')[]).map((id) => (
              <div
                key={id}
                ref={(el) => {
                  nodeRefs.current[id] = el;
                }}
                className="team-orbit-node absolute -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-10"
                style={{
                  left: `${(P[id][0] / 700) * 100}%`,
                  top: `${(P[id][1] / 700) * 100}%`,
                }}
              >
                {/* Status bubble floating above avatar */}
                <div
                  ref={(el) => {
                    bubbleRefs.current[id] = el;
                  }}
                  className="team-orbit-bubble"
                />

                {/* Avatar Circle with Team Member Photo */}
                <div className="team-orbit-avatar relative w-[clamp(44px,7.5cqw,62px)] aspect-square rounded-full mx-auto grid place-items-center bg-[#10121a] border-[1.5px] border-white/20 transition-all duration-300 overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
                  {id === 'caller' && (
                    <img
                      src="/src/assets/images/team_vuk_portrait_1790277576497.jpg"
                      alt="Vuk"
                      className="w-full h-full object-cover object-center"
                    />
                  )}
                  {id === 'dev' && (
                    <img
                      src="/src/assets/images/team_veljko_portrait_1790277549066.jpg"
                      alt="Veljko"
                      className="w-full h-full object-cover object-center"
                    />
                  )}
                  {id === 'editor' && (
                    <img
                      src="/src/assets/images/team_velimir_portrait_1790277566113.jpg"
                      alt="Velimir"
                      className="w-full h-full object-cover object-center"
                    />
                  )}
                </div>

                {/* Node Name & Role Caption */}
                <div className="mt-[0.9cqw]">
                  <div className="font-geist font-medium text-[max(11px,1.9cqw)] text-white whitespace-nowrap leading-tight">
                    {TEAM[id].name}
                  </div>
                  <div className="font-mono text-[max(9px,1.4cqw)] text-neutral-400 whitespace-nowrap tracking-wide leading-tight">
                    {TEAM[id].role}
                  </div>
                </div>
              </div>
            ))}

            {/* Task Card (travels between members, positioned safely to avoid covering or being covered by any element or icon) */}
            <div
              ref={cardRef}
              id="orbit-card"
              className="team-orbit-card absolute left-0 top-0 w-[23cqw] min-w-[124px] max-w-[162px] -translate-x-1/2 -translate-y-1/2 bg-white text-neutral-900 rounded-[10px] p-[max(6px,1.1cqw)_max(8.5px,1.4cqw)] shadow-[0_14px_34px_-10px_rgba(0,0,0,0.65)] border-l-[3.5px] border-l-[#a8f300] opacity-0 transition-opacity duration-350 z-40 pointer-events-none"
            >
              {/* Checkbox Icon */}
              <span className="team-orbit-card-check absolute top-[max(6px,1.1cqw)] right-[max(7px,1.2cqw)] w-[max(13px,1.8cqw)] h-[max(13px,1.8cqw)] rounded-full border-[1.5px] border-neutral-300 grid place-items-center transition-all duration-300">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-[70%] h-[70%] opacity-0 text-black transition-opacity duration-300"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>

              {/* Card Tag */}
              <div
                ref={cardTagRef}
                className="text-[max(8px,1.25cqw)] font-mono font-bold tracking-[0.08em] uppercase text-neutral-500 mb-0.5"
              />

              {/* Card Text */}
              <p
                ref={cardTxtRef}
                className="text-[max(9.5px,1.55cqw)] font-geist font-medium text-neutral-800 leading-[1.36] pr-[1.2em]"
              />
            </div>
          </div>

          {/* Integrated Tool Stack Bar below the stage */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto px-4">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500 mr-1.5">
              Active stack:
            </span>
            {ORBIT_TOOLS.map((tool, idx) => {
              const isSelected = tool.id === activeApexTool.id;
              return (
                <button
                  type="button"
                  key={tool.id}
                  onClick={() => {
                    // Find what slot this tool is in and rotate to apex
                    const slotIdx = (idx + rotationStep) % ARCH_SLOTS.length;
                    handleSelectTool(idx, slotIdx);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-geist transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#a8f300]/15 border border-[#a8f300]/60 text-white shadow-[0_0_12px_rgba(168,243,0,0.25)]'
                      : 'bg-white/[0.03] border border-white/[0.08] hover:border-white/30 text-neutral-400 hover:text-white'
                  }`}
                >
                  <span className="flex-none">{tool.iconMini}</span>
                  <span className="font-medium">{tool.name}</span>
                </button>
              );
            })}
          </div>

          {/* Minimal Pause / Play control below the stack */}
          <div className="mt-5 flex items-center justify-center">
            <button
              type="button"
              onClick={handleTogglePause}
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-wider uppercase text-neutral-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.1] hover:border-white/[0.22] rounded-full px-4 py-1.5 cursor-pointer transition-all duration-200"
              aria-label={isPaused ? 'Resume animation' : 'Pause animation'}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  isPaused ? 'bg-amber-400' : 'bg-[#a8f300] shadow-[0_0_6px_#a8f300]'
                }`}
              />
              <span>{isPaused ? 'Play' : 'Pause'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scoped CSS for node states, bubbles, glow, and animations */}
      <style>{`
        /* Status Bubbles */
        .team-orbit-bubble {
          position: absolute;
          bottom: calc(100% + 1.5cqw);
          left: 50%;
          transform: translate(-50%, 6px) scale(0.92);
          opacity: 0;
          white-space: nowrap;
          font-size: max(10px, 1.6cqw);
          font-family: inherit;
          font-weight: 500;
          padding: 0.5em 0.95em;
          border-radius: 999px;
          background: #10121a;
          color: #ededf7;
          border: 1px solid rgba(255, 255, 255, 0.12);
          transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.2, 0.9, 0.3, 1.3);
          pointer-events: none;
          z-index: 35;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
        }
        .team-orbit-bubble.is-show {
          opacity: 1;
          transform: translate(-50%, 0) scale(1);
        }
        .team-orbit-bubble.is-warn {
          background: #2a1c04;
          color: #fbd38d;
          border-color: rgba(245, 158, 11, 0.45);
          box-shadow: 0 0 16px rgba(245, 158, 11, 0.25);
        }
        .team-orbit-bubble.is-ok {
          background: #0e220a;
          color: #a8f300;
          border-color: rgba(168, 243, 0, 0.45);
          box-shadow: 0 0 16px rgba(168, 243, 0, 0.3);
        }

        /* Avatar States */
        .team-orbit-node.is-semi .team-orbit-avatar {
          background: rgba(168, 243, 0, 0.15);
          color: #a8f300;
          border-color: rgba(168, 243, 0, 0.4);
        }
        .team-orbit-node.is-active .team-orbit-avatar {
          background: #a8f300;
          color: #000000;
          border-color: transparent;
          transform: scale(1.08);
          box-shadow: 0 0 0 5px rgba(168, 243, 0, 0.2), 0 0 38px 8px rgba(168, 243, 0, 0.45);
        }

        /* Center Node Glow */
        #orbit-center.is-glow .orbit-center-icon {
          transform: scale(1.15);
          filter: drop-shadow(0 0 18px rgba(168, 243, 0, 0.6));
        }

        /* Lit Edge Persistence */
        line.is-on {
          opacity: 0.65 !important;
        }

        /* Task Card State & Priority */
        .team-orbit-card {
          z-index: 40;
        }
        .team-orbit-card.is-show {
          opacity: 1 !important;
        }
        .team-orbit-card.is-done .team-orbit-card-check {
          background: #a8f300;
          border-color: #a8f300;
        }
        .team-orbit-card.is-done .team-orbit-card-check svg {
          opacity: 1 !important;
        }

        /* Reduced Motion Fallback */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
};
