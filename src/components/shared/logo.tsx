'use client';

import React from 'react';

interface LogoProps {
    variant?: 'full' | 'mark';
    className?: string;
    animated?: boolean;
    theme?: 'light' | 'dark' | 'auto';
}

export const Logo: React.FC<LogoProps> = ({
    variant = 'full',
    className = '',
    animated = false,
    theme = 'auto',
}) => {
    if (variant === 'mark') {
        return <LogoMark className={className} animated={animated} theme={theme} />;
    }

    return <LogoFull className={className} animated={animated} theme={theme} />;
};

const LogoMark: React.FC<Omit<LogoProps, 'variant'>> = ({
    className = '',
    animated = false,
    theme = 'auto',
}) => {
    return (
        <svg
            viewBox="0 0 120 120"
            className={`h-10 w-auto sm:h-14 ${className}`}
            xmlns="http://www.w3.org/2000/svg"
            aria-label="M3K"
            role="img"
        >
            <style>{`
        .logo-dark { fill: #020617; }
        .logo-light { fill: #f8fafc; }
        .logo-blue { fill: #0052ff; }
        .logo-accent { fill: #0052ff; }
        
        ${animated
                    ? `
          @keyframes float-3 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-4px); }
          }
          .logo-animate-3 {
            animation: float-3 3s ease-in-out infinite;
            transform-origin: center;
          }
        `
                    : ''
                }

        @media (prefers-color-scheme: dark) {
          .logo-dark { fill: #f8fafc; }
          .logo-light { fill: #020617; }
        }
      `}</style>

            {/* M */}
            <text
                x="12"
                y="85"
                fontSize="72"
                fontWeight="700"
                fontFamily="system-ui, -apple-system, sans-serif"
                className="logo-dark"
                letterSpacing="-6"
            >
                M
            </text>

            {/* 3 */}
            <text
                x="52"
                y="85"
                fontSize="72"
                fontWeight="700"
                fontFamily="system-ui, -apple-system, sans-serif"
                className={`logo-blue ${animated ? 'logo-animate-3' : ''}`}
                letterSpacing="-6"
            >
                3
            </text>

            {/* K */}
            <text
                x="92"
                y="85"
                fontSize="72"
                fontWeight="700"
                fontFamily="system-ui, -apple-system, sans-serif"
                className="logo-dark"
                letterSpacing="-6"
            >
                K
            </text>
        </svg>
    );
};

const LogoFull: React.FC<Omit<LogoProps, 'variant'>> = ({
    className = '',
    animated = false,
    theme = 'auto',
}) => {
    return (
        <svg
            viewBox="0 0 120 120"
            className={`h-14 w-auto sm:h-16 ${className}`}
            xmlns="http://www.w3.org/2000/svg"
            aria-label="M3K"
            role="img"
        >
            <style>{`
        .logo-dark { fill: #020617; }
        .logo-light { fill: #f8fafc; }
        .logo-blue { fill: #0052ff; }
        .logo-text { fill: #666; }

        ${animated
                    ? `
          @keyframes float-3 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-3px); }
          }
          .logo-animate-3 {
            animation: float-3 3s ease-in-out infinite;
            transform-origin: center;
          }
        `
                    : ''
                }

        @media (prefers-color-scheme: dark) {
          .logo-dark { fill: #f8fafc; }
          .logo-light { fill: #020617; }
          .logo-text { fill: #999; }
        }
      `}</style>

            {/* M */}
            <text
                x="12"
                y="85"
                fontSize="72"
                fontWeight="700"
                fontFamily="system-ui, -apple-system, sans-serif"
                className="logo-dark"
                letterSpacing="-6"
            >
                M
            </text>

            {/* 3 */}
            <text
                x="52"
                y="85"
                fontSize="72"
                fontWeight="700"
                fontFamily="system-ui, -apple-system, sans-serif"
                className={`logo-blue ${animated ? 'logo-animate-3' : ''}`}
                letterSpacing="-6"
            >
                3
            </text>

            {/* K */}
            <text
                x="92"
                y="85"
                fontSize="72"
                fontWeight="700"
                fontFamily="system-ui, -apple-system, sans-serif"
                className="logo-dark"
                letterSpacing="-6"
            >
                K
            </text>
        </svg>
    );
};

export default Logo;
