import React from 'react';

export const AmbientBackground: React.FC = () => {
  return (
    <>
      {/* Subtle Computational Ambience Grid Overlay (Placed at z-0 to avoid blocking clicks) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-15 transition-all duration-300"
        style={{
          backgroundSize: '40px 40px',
          backgroundImage: `
            linear-gradient(to right, var(--border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border) 1px, transparent 1px)
          `,
        }}
      />
      {/* Procedural Film Grain Noise Overlay (Placed at z-0 to avoid blocking clicks) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] transition-all duration-300"
        style={{
          backgroundImage: `url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>')`
        }}
      />
    </>
  );
};
export default AmbientBackground;
