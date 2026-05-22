import React from 'react';

export const DashboardMockup: React.FC = () => (
  <svg 
    className="w-full h-full object-cover" 
    viewBox="0 0 800 500" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Enterprise dashboard software environment mockup"
  >
    <rect width="800" height="500" fill="var(--bg-secondary)" />
    <rect x="20" y="20" width="180" height="460" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1" />
    <rect x="220" y="20" width="560" height="60" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1" />
    
    {/* Sidebar Lines */}
    <rect x="40" y="60" width="120" height="8" fill="var(--border)" />
    <rect x="40" y="90" width="90" height="8" fill="var(--border)" />
    <rect x="40" y="120" width="100" height="8" fill="var(--border)" />
    
    {/* Charts Grid */}
    <rect x="220" y="100" width="270" height="180" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1" />
    <rect x="510" y="100" width="270" height="180" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1" />
    <rect x="220" y="300" width="560" height="180" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1" />
    
    {/* Bar Chart Fake */}
    <rect x="240" y="230" width="20" height="30" fill="var(--text-secondary)" opacity="0.5" />
    <rect x="270" y="180" width="20" height="80" fill="var(--accent)" />
    <rect x="300" y="150" width="20" height="110" fill="var(--text-secondary)" opacity="0.5" />
    <rect x="330" y="200" width="20" height="60" fill="var(--text-secondary)" opacity="0.5" />
    <rect x="360" y="120" width="20" height="140" fill="var(--accent)" />
    
    {/* Line Chart Fake */}
    <path d="M530 250 L 580 180 L 630 210 L 680 140 L 740 160" stroke="var(--accent)" strokeWidth="3" fill="none" />
    
    {/* Table Lines */}
    <rect x="240" y="340" width="520" height="1" fill="var(--border)" />
    <rect x="240" y="380" width="520" height="1" fill="var(--border)" />
    <rect x="240" y="420" width="520" height="1" fill="var(--border)" />
  </svg>
);

export const TerminalMockup: React.FC = () => (
  <svg 
    className="w-full h-full object-cover" 
    viewBox="0 0 800 500" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Command line interface media player environment mockup"
  >
    <rect width="800" height="500" fill="var(--bg-secondary)" />
    <rect x="40" y="40" width="720" height="420" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1" />
    <circle cx="60" cy="60" r="4" fill="var(--text-secondary)" />
    <circle cx="75" cy="60" r="4" fill="var(--text-secondary)" />
    <circle cx="90" cy="60" r="4" fill="var(--text-secondary)" />
    <rect x="40" y="80" width="720" height="1" fill="var(--border)" />
    
    {/* Terminal Texts */}
    <text x="60" y="120" fill="var(--text-primary)" fontFamily="monospace" fontSize="14">&gt; player start --playlist ambient_v2</text>
    <text x="60" y="150" fill="var(--text-secondary)" fontFamily="monospace" fontSize="14">[info] Loading index...</text>
    <text x="60" y="180" fill="var(--text-secondary)" fontFamily="monospace" fontSize="14">[info] Resolved 14 tracks.</text>
    <text x="60" y="220" fill="var(--accent)" fontFamily="monospace" fontSize="14">▶ Now Playing: Track 01 - System Architecture</text>
    
    {/* Progress Bar */}
    <rect x="60" y="240" width="300" height="2" fill="var(--text-secondary)" opacity="0.3" />
    <rect x="60" y="240" width="120" height="2" fill="var(--accent)" />
  </svg>
);

export const MobileMockup: React.FC = () => (
  <svg 
    className="w-full h-full object-cover" 
    viewBox="0 0 800 500" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Mobile app ecosystem interface mockup"
  >
    <rect width="800" height="500" fill="var(--bg-secondary)" />
    <rect x="280" y="40" width="240" height="480" rx="20" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="4" />
    
    {/* App Header */}
    <rect x="300" y="80" width="120" height="12" rx="4" fill="var(--text-primary)" />
    <circle cx="480" cy="86" r="12" fill="var(--border)" />
    
    {/* App Card */}
    <rect x="300" y="130" width="200" height="100" rx="8" fill="var(--accent)" opacity="0.1" stroke="var(--accent)" strokeWidth="1" />
    <rect x="320" y="150" width="60" height="8" rx="4" fill="var(--accent)" />
    <rect x="320" y="180" width="120" height="24" rx="4" fill="var(--text-primary)" />
    
    {/* App List */}
    <rect x="300" y="250" width="200" height="60" rx="8" fill="var(--bg-secondary)" />
    <rect x="320" y="270" width="20" height="20" rx="4" fill="var(--border)" />
    <rect x="360" y="276" width="100" height="8" rx="4" fill="var(--text-primary)" />
    
    <rect x="300" y="320" width="200" height="60" rx="8" fill="var(--bg-secondary)" />
    <rect x="320" y="340" width="20" height="20" rx="4" fill="var(--border)" />
    <rect x="360" y="346" width="80" height="8" rx="4" fill="var(--text-primary)" />
  </svg>
);
