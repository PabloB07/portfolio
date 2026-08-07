'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Simple frame-based ASCII parrot that "turns its head" by cycling
 * small pre-made frames. Uses a text gradient so it reads on light
 * and dark themes.
 */
const FRAMES = [
`      __
     (  \\
      \  \\
       \  \\
        )  )   __
       /  /  _(  )
      /  /  (  (  \\
     /  /    \  \  )
    /__/      )__)'
,
`       __
      (  \\
       \  \\
        \  \\
         )  )   __
        /  /  _(  )
       /  /  (  (  \\
      /  /    \  \  )
     /__/      )__)'
,
`        __
       (  \\
        \  \\
         \  \\
          )  )   __
         /  /  _(  )
        /  /  (  (  \\
       /  /    \  \  )
      /__/      )__)'
];

const ParrotAscii: React.FC<{ className?: string }> = ({ className }) => {
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    let idx = 0;
    const update = () => {
      if (preRef.current) preRef.current.textContent = FRAMES[idx % FRAMES.length];
      idx += 1;
    };

    update();
    const iv = setInterval(update, 400);
    return () => clearInterval(iv);
  }, []);

  return (
    <pre
      ref={preRef}
      aria-hidden
      className={className}
      style={{
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        fontSize: '12px',
        lineHeight: '12px',
        whiteSpace: 'pre',
        margin: 0,
        // Parrot gradient: green -> teal -> yellow. Works on light/dark because
        // text is clipped to background gradient and filled transparent.
        backgroundImage: 'linear-gradient(90deg, #16A34A 0%, #06B6D4 50%, #F59E0B 100%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
        textAlign: 'center',
      }}
    />
  );
};

export default ParrotAscii;
