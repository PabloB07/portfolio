'use client';

import React, { useEffect, useRef } from 'react';

// Cool -> hot character ramp (last char = hottest)
const FIRE = ' .:-=+*#%@';
const W = 60;
const H = 34;
const WORD = 'DOOMY';

/**
 * Animated "DOOM fire" rendered purely as ASCII characters, with the word
 * DOOM punched through the flames as cold (dark) letters.
 *
 * The fire-propagation algorithm is a classic technique (not game assets):
 * the bottom row is the heat source and intensity decays upward with jitter.
 * A text mask (rendered via an offscreen canvas) marks which cells form the
 * letters; those cells are drawn as blank holes so the word reads as a cold
 * silhouette over the fire.
 */
const DoomAscii: React.FC<{ className?: string }> = ({ className }) => {
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const max = FIRE.length - 1;
    const px = new Uint8Array(W * H);
    const mask = new Uint8Array(W * H);

    // Heat source: bottom row at max intensity
    for (let x = 0; x < W; x++) px[(H - 1) * W + x] = max;

    // Build the letter mask by rasterizing the word at grid resolution
    try {
      const canvas = document.createElement('canvas');
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        let fontSize = 20;
        ctx.font = `bold ${fontSize}px Arial, sans-serif`;
        while (fontSize > 6 && ctx.measureText(WORD).width > W - 4) {
          fontSize -= 1;
          ctx.font = `bold ${fontSize}px Arial, sans-serif`;
        }
        // Place the word in the hot lower-middle band of the fire
        ctx.fillText(WORD, W / 2, H * 0.6);
        const data = ctx.getImageData(0, 0, W, H).data;
        for (let i = 0; i < W * H; i++) mask[i] = data[i * 4] > 128 ? 1 : 0;
      }
    } catch {
      /* mask stays empty -> plain fire */
    }

    const spread = (from: number) => {
      const rand = Math.round(Math.random() * 3) & 3;
      const to = from - rand + 1;
      const dest = to - W;
      if (dest < 0 || dest >= W * H) return;
      const v = px[from] - (rand & 1);
      px[dest] = v < 0 ? 0 : v;
    };

    let raf = 0;
    let last = 0;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (t - last < 55) return; // ~18fps — fire reads better a touch slower
      last = t;

      for (let x = 0; x < W; x++) {
        for (let y = 1; y < H; y++) spread(y * W + x);
      }

      let out = '';
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const i = y * W + x;
          out += mask[i] ? ' ' : FIRE[px[i]]; // letters = cold holes
        }
        out += '\n';
      }
      if (preRef.current) preRef.current.textContent = out;
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <pre
      ref={preRef}
      aria-hidden
      className={className}
      style={{
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        fontSize: '10px',
        lineHeight: '10px',
        letterSpacing: '0px',
        whiteSpace: 'pre',
        margin: 0,
        // Fire coloring: hot (white/yellow) at the bottom, fading to dark red on top
        backgroundImage:
          'linear-gradient(to top, #fff7d6 0%, #ffd24a 14%, #ff7a18 38%, #d4232b 62%, #5a0b0b 82%, rgba(90,11,11,0) 100%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
      }}
    />
  );
};

export default DoomAscii;
