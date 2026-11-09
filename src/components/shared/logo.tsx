import React from 'react';

type LogoVariant = 'full' | 'mark' | 'line';

interface LogoProps {
    /**
     * - `full` : badge RM + nom + sous-titre (header desktop)
     * - `mark` : badge RM seul (header mobile, icônes)
     * - `line` : monogramme RM’ en trait, apostrophe bleue (footer)
     */
    variant?: LogoVariant;
    /** Sous-titre affiché sous le nom (variant `full`) */
    tagline?: string;
    className?: string;
}

/*
 * Les couleurs passent par les tokens du thème (text-foreground, text-primary…)
 * définis dans globals.css : elles suivent donc la classe `.dark` posée par
 * next-themes, et non le thème de l'OS.
 * Les lettres sont des tracés (pas du <text>) : rendu identique partout,
 * quelle que soit la police installée.
 */

const R_PATH = 'M0,60 V0 H18 a15,15 0 0 1 0,30 H0 M18,30 L36,60';
const M_PATH = 'M0,60 V0 L22,34 L44,0 V60';
const APOSTROPHE_PATH = 'M3,-2 L0,12';

const strokeProps = {
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
};

const LogoMark = ({ className = '' }: { className?: string }) => (
    <svg
        viewBox="0 0 100 100"
        className={`h-10 w-10 shrink-0 ${className}`}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="RM"
    >
        <rect width="100" height="100" rx="22" className="fill-primary" />
        <g transform="translate(18,29) scale(0.66)" {...strokeProps} strokeWidth={11} className="text-white">
            <path d={R_PATH} />
            <path d={M_PATH} transform="translate(54,0)" />
        </g>
    </svg>
);

const LogoLine = ({ className = '' }: { className?: string }) => (
    <svg
        viewBox="0 0 140 80"
        className={`h-10 w-auto ${className}`}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="RM’"
    >
        <g transform="translate(8,10)" {...strokeProps} strokeWidth={9}>
            <path d={R_PATH} className="text-foreground" />
            <path d={M_PATH} transform="translate(50,0)" className="text-foreground" />
            <path d={APOSTROPHE_PATH} transform="translate(106,0)" strokeWidth={10} className="text-primary" />
        </g>
    </svg>
);

const LogoFull = ({ tagline, className = '' }: { tagline?: string; className?: string }) => (
    <span className={`flex items-center gap-3 ${className}`}>
        <LogoMark className="h-11 w-11" />
        <span className="flex flex-col leading-tight">
            <span className="text-lg font-bold tracking-tight text-foreground">
                Ricardo M<span className="text-primary">’</span>Boukou
            </span>
            {tagline && <span className="text-sm font-medium text-muted">{tagline}</span>}
        </span>
    </span>
);

export const Logo: React.FC<LogoProps> = ({ variant = 'full', tagline, className = '' }) => {
    if (variant === 'mark') return <LogoMark className={className} />;
    if (variant === 'line') return <LogoLine className={className} />;
    return <LogoFull tagline={tagline} className={className} />;
};

export default Logo;
