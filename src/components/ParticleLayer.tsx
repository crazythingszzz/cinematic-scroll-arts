import { useEffect, useRef, useCallback } from 'react';
import { getOptimalParticleCount, shouldUseReducedMotion } from '@/utils/deviceDetection';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

interface ParticleLayerProps {
  scrollProgress: number;
  isVisible: boolean;
  intensity?: number; // 0-1, affects particle count and movement
}

export default function ParticleLayer({ 
  scrollProgress, 
  isVisible, 
  intensity = 1 
}: ParticleLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const baseParticleCount = getOptimalParticleCount(50);
  const reducedMotion = shouldUseReducedMotion();

  // Initialize particles
  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const particles: Particle[] = [];
    const count = Math.floor(baseParticleCount * intensity);
    
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        color: `hsl(${200 + Math.random() * 60}, 70%, ${60 + Math.random() * 30}%)`,
        life: Math.random() * 100,
        maxLife: 100
      });
    }
    
    particlesRef.current = particles;
  }, [baseParticleCount, intensity]);

  // Update canvas size
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }, []);

  // Update particles
  const updateParticles = useCallback((deltaTime: number, scrollVelocity: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    particlesRef.current.forEach((particle) => {
      // Update position
      particle.x += particle.vx * deltaTime * (1 + scrollVelocity * 2);
      particle.y += particle.vy * deltaTime * (1 + scrollVelocity * 2);
      
      // Add scroll-based drift
      particle.x += scrollVelocity * 20 * deltaTime;
      
      // Wrap around screen
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;
      
      // Update life
      particle.life -= deltaTime * 0.5;
      if (particle.life <= 0) {
        particle.life = particle.maxLife;
        particle.x = Math.random() * canvas.width;
        particle.y = Math.random() * canvas.height;
      }
      
      // Update opacity based on life
      particle.opacity = (particle.life / particle.maxLife) * 0.8;
    });
  }, []);

  // Render particles
  const renderParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particlesRef.current.forEach((particle) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity * scrollProgress;
      ctx.fillStyle = particle.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = particle.color;
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    });
  }, [scrollProgress]);

  // Animation loop
  const animate = useCallback((time: number) => {
    if (!isVisible || reducedMotion) {
      animationFrameRef.current = requestAnimationFrame(animate);
      return;
    }

    const deltaTime = (time - lastTimeRef.current) / 1000;
    lastTimeRef.current = time;
    
    // Calculate scroll velocity (simplified)
    const scrollVelocity = Math.abs(scrollProgress - 0.5) * 2;
    
    updateParticles(deltaTime, scrollVelocity);
    renderParticles();
    
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [isVisible, reducedMotion, scrollProgress, updateParticles, renderParticles]);

  // Effect for initialization and cleanup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    updateCanvasSize();
    initParticles();
    
    const handleResize = () => {
      updateCanvasSize();
      initParticles();
    };
    
    window.addEventListener('resize', handleResize);
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateCanvasSize, initParticles, animate]);

  if (reducedMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity: scrollProgress * 0.8,
        mixBlendMode: 'screen'
      }}
    />
  );
}
