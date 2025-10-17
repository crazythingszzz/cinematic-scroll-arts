import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseScrollSequenceOptions {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  frameCount: number;
  framePathPattern: string;
  scrollTriggerRef: React.RefObject<HTMLElement>;
  startFrame?: number;
  endFrame?: number;
  onScrollProgress?: (progress: number) => void; // Add callback for scroll progress
}

interface FrameData {
  image: HTMLImageElement;
  loaded: boolean;
}

export function useScrollSequence({
  canvasRef,
  frameCount,
  framePathPattern,
  scrollTriggerRef,
  startFrame = 0,
  endFrame = 100,
  onScrollProgress
}: UseScrollSequenceOptions) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const framesRef = useRef<FrameData[]>([]);
  const animationFrameRef = useRef<number>();
  const isVisibleRef = useRef(false);
  const loadedCountRef = useRef(0);

  // Preload frames progressively
  const preloadFrames = useCallback(async () => {
    const frames: FrameData[] = [];
    let loadedCount = 0;

    // Create frame data structures
    for (let i = 1; i <= frameCount; i++) {
      frames[i - 1] = {
        image: new Image(),
        loaded: false
      };
    }

    // Load frames with progressive loading
    const loadPromises = frames.map((frameData, index) => {
      return new Promise<void>((resolve) => {
        const frameNumber = index + 1;
        const imagePath = framePathPattern.replace('{index}', frameNumber.toString());
        
        frameData.image.onload = () => {
          frameData.loaded = true;
          loadedCount++;
          setLoadingProgress((loadedCount / frameCount) * 100);
          resolve();
        };
        
        frameData.image.onerror = () => {
          console.warn(`Failed to load frame ${frameNumber} from ${imagePath}`);
          // Don't count failed frames, but still resolve to continue
          resolve();
        };
        
        frameData.image.src = imagePath;
      });
    });

    await Promise.all(loadPromises);
    framesRef.current = frames;
    loadedCountRef.current = loadedCount;
    
    // If no frames loaded, keep loading state (fallback to video)
    if (loadedCount === 0) {
      console.warn('No frames loaded, will fall back to video');
      setIsLoading(true); // Keep loading state so video shows
    } else {
      setIsLoading(false);
    }
  }, [frameCount, framePathPattern]);

  // Draw current frame to canvas
  const drawFrame = useCallback((progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !framesRef.current.length) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Calculate current frame index
    const frameIndex = Math.floor(progress * (frameCount - 1));
    const frameData = framesRef.current[frameIndex];
    
    if (!frameData || !frameData.loaded) return;

    // Clear canvas and draw frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate aspect ratio and scaling
    const imageAspect = frameData.image.naturalWidth / frameData.image.naturalHeight;
    const canvasAspect = canvas.width / canvas.height;
    
    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (imageAspect > canvasAspect) {
      // Image is wider than canvas
      drawHeight = canvas.height;
      drawWidth = drawHeight * imageAspect;
      offsetX = (canvas.width - drawWidth) / 2;
    } else {
      // Image is taller than canvas
      drawWidth = canvas.width;
      drawHeight = drawWidth / imageAspect;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx.drawImage(frameData.image, offsetX, offsetY, drawWidth, drawHeight);
  }, [frameCount]);

  // Update canvas size based on container
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = scrollTriggerRef.current;
    
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    // Set canvas size to match container
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    // Set CSS size
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    
    // Scale context for high DPI displays
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }, [canvasRef, scrollTriggerRef]);

  // Intersection observer for visibility
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(canvas);
    return () => observer.disconnect();
  }, [canvasRef]);

  // Main effect
  useEffect(() => {
    const canvas = canvasRef.current;
    const trigger = scrollTriggerRef.current;
    
    if (!canvas || !trigger) return;

    // Initialize canvas size
    updateCanvasSize();
    
    // Preload frames
    preloadFrames();

    // Handle window resize
    const handleResize = () => {
      updateCanvasSize();
    };
    
    window.addEventListener('resize', handleResize);

    // Create scroll trigger animation
    const scrollTrigger = ScrollTrigger.create({
      trigger: trigger,
      start: "top top",
      end: "+=" + (frameCount * 15) + "px", // Dynamic end based on frame count
      scrub: 1,
      pin: true, // Pin the section while frames play
      pinSpacing: true, // Add natural spacing between sections
      onUpdate: (self) => {
        if (!isVisibleRef.current) return;
        
        // Calculate progress based on scroll
        const progress = (self.progress - startFrame / 100) / ((endFrame - startFrame) / 100);
        const clampedProgress = Math.max(0, Math.min(1, progress));
        
        // Emit scroll progress for header visibility
        if (onScrollProgress) {
          onScrollProgress(self.progress);
        }
        
        // Cancel previous animation frame
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        
        // Schedule frame draw
        animationFrameRef.current = requestAnimationFrame(() => {
          drawFrame(clampedProgress);
        });
      }
    });

    return () => {
      scrollTrigger.kill();
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [canvasRef, scrollTriggerRef, preloadFrames, drawFrame, updateCanvasSize, startFrame, endFrame]);

  return {
    isLoading,
    loadingProgress,
    loadedFrames: loadedCountRef.current
  };
}
