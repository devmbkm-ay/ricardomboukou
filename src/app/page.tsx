// app/page.tsx or pages/index.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/button';

// Defined outside component so it's a stable reference (never changes between renders)
const words = ['scalable', 'beautiful', 'performant', 'user-friendly', 'robust'];

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentWord, setCurrentWord] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Three.js Particle Background
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(3, 7, 18, 0.1)'; // Trail effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        // Mouse interaction
        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          particle.vx -= dx * 0.001;
          particle.vy -= dy * 0.001;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(102, 126, 234, ${particle.opacity})`;
        ctx.fill();

        // Connect nearby particles
        particles.slice(i + 1).forEach((other) => {
          const dx2 = particle.x - other.x;
          const dy2 = particle.y - other.y;
          const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          
          if (distance2 < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(102, 126, 234, ${0.1 * (1 - distance2 / 150)})`;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition]);

  // Typewriter Effect
  useEffect(() => {
    const word = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting && currentWord === word) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentWord === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      } else {
        setCurrentWord(
          isDeleting 
            ? word.substring(0, currentWord.length - 1) 
            : word.substring(0, currentWord.length + 1)
        );
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentWord, isDeleting, wordIndex]); // words is stable (module-level constant)

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950">
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 opacity-40"
      />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Main Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 animate-fade-in-up">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-zinc-300 font-medium">Available for freelance work</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="text-white">Ricardo</span>
            <span className="block mt-2 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x bg-300%">
              Full-Stack Developer
            </span>
          </h1>

          {/* Typewriter Description */}
          <div className="mb-8 max-w-2xl mx-auto space-y-3">
            <p className="text-sm md:text-sm text-zinc-400 leading-relaxed">
              I build{' '}
              <span className="text-white font-semibold whitespace-nowrap">
                <span className="inline-block min-w-[2ch]">{currentWord}</span>
                <span className="inline-block w-0.5 h-5 bg-purple-400 align-middle ml-0.5 animate-[blink_1s_step-end_infinite]" />
              </span>
              {' '}web applications with modern technologies.
            </p>
            <p className="text-sm text-zinc-500">
              Passionate about clean code, great design, and open source.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              href="/projects"
              className="bg-white text-black hover:bg-zinc-200 font-semibold px-8 py-6 text-lg rounded-full transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            >
              View My Work
            </Button>

            <Button
              href="/contact"
              variant="outline"
              className="border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white font-semibold px-8 py-6 text-lg rounded-full transition-all hover:scale-105"
            >
              Get in Touch
            </Button>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-sm font-medium hover:bg-white/10 hover:border-purple-500/50 hover:text-white hover:-translate-y-1 transition-all cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/10 max-w-2xl mx-auto">
            {[
              { num: '50+', label: 'Projects' },
              { num: '5+', label: 'Years Exp.' },
              { num: '30+', label: 'Clients' },
            ].map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                  {stat.num}
                </div>
                <div className="text-sm text-zinc-500 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/40 rounded-full animate-pulse" />
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        .bg-300\\% {
          background-size: 300% 300%;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
    </section>
  );
}