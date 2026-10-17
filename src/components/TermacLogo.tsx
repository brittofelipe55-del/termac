import React from 'react';

interface TermacLogoProps {
  className?: string;
  variant?: 'full' | 'symbol' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Pixel-faithful vector representation of the original Termac Ar-Condicionados logo
 * Preserves the exact circular blue emblem (#078BD0), white split AC unit with 4 airflow streams,
 * classic serif "TERMAC" logotype, and clean geometric sans-serif "AR CONDICIONADOS".
 */
export const TermacLogo: React.FC<TermacLogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md',
}) => {
  const sizeMap = {
    sm: { height: 38, width: 140, symbolSize: 34 },
    md: { height: 48, width: 180, symbolSize: 44 },
    lg: { height: 64, width: 240, symbolSize: 58 },
    xl: { height: 80, width: 300, symbolSize: 74 },
  };

  const currentSize = sizeMap[size];

  if (variant === 'symbol') {
    return (
      <svg
        viewBox="0 0 120 120"
        width={currentSize.symbolSize}
        height={currentSize.symbolSize}
        className={`inline-block shrink-0 ${className}`}
        aria-label="Símbolo Termac Ar-Condicionados"
        role="img"
      >
        <circle cx="60" cy="60" r="58" fill="#078BD0" />
        
        {/* AC Unit Outer Frame */}
        <rect
          x="24"
          y="32"
          width="72"
          height="35"
          rx="7.5"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="4.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Upper recessed display slot */}
        <rect x="33" y="40.5" width="46" height="5.5" rx="2.75" fill="#FFFFFF" />
        {/* Sensor/LED indicator dot */}
        <circle cx="85" cy="43.25" r="2.8" fill="#FFFFFF" />
        
        {/* Lower grille vents */}
        <line x1="33" y1="56" x2="41" y2="56" stroke="#FFFFFF" strokeWidth="3.6" strokeLinecap="round" />
        <line x1="45" y1="56" x2="53" y2="56" stroke="#FFFFFF" strokeWidth="3.6" strokeLinecap="round" />
        <line x1="57" y1="56" x2="65" y2="56" stroke="#FFFFFF" strokeWidth="3.6" strokeLinecap="round" />
        <line x1="69" y1="56" x2="77" y2="56" stroke="#FFFFFF" strokeWidth="3.6" strokeLinecap="round" />
        <line x1="81" y1="56" x2="87" y2="56" stroke="#FFFFFF" strokeWidth="3.6" strokeLinecap="round" />
        
        {/* 4 Airflow streams */}
        {/* Stream 1 (outer left, curved) */}
        <path
          d="M39 74 v9 c0 5 -3.5 8.5 -8 8.5"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="4.8"
          strokeLinecap="round"
        />
        {/* Stream 2 (center left, vertical) */}
        <path
          d="M53 74 v17.5"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="4.8"
          strokeLinecap="round"
        />
        {/* Stream 3 (center right, vertical) */}
        <path
          d="M67 74 v17.5"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="4.8"
          strokeLinecap="round"
        />
        {/* Stream 4 (outer right, curved) */}
        <path
          d="M81 74 v9 c0 5 3.5 8.5 8 8.5"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="4.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Emblem */}
      <svg
        viewBox="0 0 120 120"
        style={{ width: currentSize.symbolSize, height: currentSize.symbolSize }}
        className="shrink-0 drop-shadow-[0_0_15px_rgba(7,139,208,0.4)] transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
      >
        <circle cx="60" cy="60" r="58" fill="#078BD0" />
        <rect
          x="24"
          y="32"
          width="72"
          height="35"
          rx="7.5"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="4.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="33" y="40.5" width="46" height="5.5" rx="2.75" fill="#FFFFFF" />
        <circle cx="85" cy="43.25" r="2.8" fill="#FFFFFF" />
        
        <line x1="33" y1="56" x2="41" y2="56" stroke="#FFFFFF" strokeWidth="3.6" strokeLinecap="round" />
        <line x1="45" y1="56" x2="53" y2="56" stroke="#FFFFFF" strokeWidth="3.6" strokeLinecap="round" />
        <line x1="57" y1="56" x2="65" y2="56" stroke="#FFFFFF" strokeWidth="3.6" strokeLinecap="round" />
        <line x1="69" y1="56" x2="77" y2="56" stroke="#FFFFFF" strokeWidth="3.6" strokeLinecap="round" />
        <line x1="81" y1="56" x2="87" y2="56" stroke="#FFFFFF" strokeWidth="3.6" strokeLinecap="round" />
        
        <path d="M39 74 v9 c0 5 -3.5 8.5 -8 8.5" fill="none" stroke="#FFFFFF" strokeWidth="4.8" strokeLinecap="round" />
        <path d="M53 74 v17.5" fill="none" stroke="#FFFFFF" strokeWidth="4.8" strokeLinecap="round" />
        <path d="M67 74 v17.5" fill="none" stroke="#FFFFFF" strokeWidth="4.8" strokeLinecap="round" />
        <path d="M81 74 v9 c0 5 3.5 8.5 8 8.5" fill="none" stroke="#FFFFFF" strokeWidth="4.8" strokeLinecap="round" />
      </svg>

      {/* Typography */}
      <div className="flex flex-col leading-none">
        <span
          className="text-white font-extrabold tracking-wide drop-shadow-sm font-['Cinzel',serif]"
          style={{
            fontSize: size === 'sm' ? '1.25rem' : size === 'md' ? '1.6rem' : size === 'lg' ? '2.1rem' : '2.6rem',
            letterSpacing: '0.04em',
            fontFamily: "'Cinzel', 'Times New Roman', Georgia, serif",
          }}
        >
          TERMAC
        </span>
        <span
          className="text-white font-semibold tracking-[0.26em] uppercase text-xs"
          style={{
            fontSize: size === 'sm' ? '0.52rem' : size === 'md' ? '0.66rem' : size === 'lg' ? '0.85rem' : '1.05rem',
            marginTop: size === 'sm' ? '1px' : '3px',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          AR CONDICIONADOS
        </span>
      </div>
    </div>
  );
};

/**
 * Animated engineering graphic element inspired by the Termac circular airflow mark
 * Used as architectural accents, section separators, and technical precision markers
 */
export const TermacAirflowBadge: React.FC<{
  title?: string;
  code?: string;
  className?: string;
}> = ({ title = 'ENGENHARIA DO CONFORTO', code = 'TMC-41', className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#078BD0]/30 bg-[#0A111C]/80 backdrop-blur-md text-xs font-mono text-[#A7B4C4] ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#19B8FF] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#078BD0]"></span>
      </span>
      <span className="font-semibold text-white tracking-wider">{title}</span>
      <span className="text-[#078BD0] font-mono text-[10px] bg-[#078BD0]/10 px-1.5 py-0.5 rounded border border-[#078BD0]/20">
        {code}
      </span>
    </div>
  );
};
