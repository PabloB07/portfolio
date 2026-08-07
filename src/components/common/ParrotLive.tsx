'use client';

import React from 'react';

/**
 * ParrotLive - lightweight inline SVG parrot with subtle head-turn animation
 * inspired by parrot.live. Works on light/dark via currentColor usage and
 * Tailwind-friendly sizing.
 */
const ParrotLive: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 220 }) => {
  const sz = Number(size);
  return (
    <div className={className} style={{ width: sz, height: 'auto', margin: '0 auto' }}>
      <svg
        viewBox="0 0 220 220"
        width={sz}
        height={(sz * 220) / 220}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Animated parrot"
      >
        <defs>
          <linearGradient id="bodyGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="#16A34A" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="wingGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>

        {/* body */}
        <g transform="translate(20,20)">
          <ellipse cx="90" cy="100" rx="70" ry="80" fill="url(#bodyGrad)" />

          {/* wing */}
          <g className="wing" transform="translate(60,80)">
            <path d="M0 0 C30 -20, 80 -10, 90 30 C80 10, 30 40, 0 20 Z" fill="url(#wingGrad)" />
          </g>

          {/* tail */}
          <g transform="translate(10,140)">
            <path d="M0 0 C-10 -10, -30 -10, -40 -2 C-25 -6, -8 8, 0 0 Z" fill="#0ea5a4" opacity="0.95" />
          </g>

          {/* eye + beak group (head) — animate this group's rotation */}
          <g className="head" transform="translate(150,70)">
            <circle cx="0" cy="0" r="28" fill="#ffffff" opacity="0.98" />
            <circle cx="-6" cy="-4" r="6" fill="#111827" />
            <path d="M10 -4 C22 -2, 26 6, 12 12 C20 8, 16 18, 2 10 Z" fill="#f59e0b" />
            <path d="M12 8 C14 10, 10 18, 2 10" fill="#d97706" opacity="0.6" />
          </g>

          {/* subtle highlight */}
          <ellipse cx="60" cy="60" rx="14" ry="8" fill="rgba(255,255,255,0.12)" />
        </g>

        <style>{`
          /* Animations similar to parrot.live: slow head turns and wing bob */
          @keyframes parrot-head-turn { 0% { transform: rotate(0deg); } 25% { transform: rotate(-14deg); } 50% { transform: rotate(4deg); } 75% { transform: rotate(-8deg); } 100% { transform: rotate(0deg); } }
          @keyframes parrot-wing-bob { 0% { transform: translateY(0px); } 50% { transform: translateY(-6px); } 100% { transform: translateY(0px); } }

          .head {
            transform-origin: 0px 0px;
            animation: parrot-head-turn 2200ms ease-in-out infinite;
          }

          .wing {
            transform-origin: 30px 10px;
            animation: parrot-wing-bob 1200ms ease-in-out infinite;
          }

          /* Respect reduced motion */
          @media (prefers-reduced-motion: reduce) {
            .head, .wing { animation: none; }
          }
        `}</style>
      </svg>
    </div>
  );
};

export default ParrotLive;
