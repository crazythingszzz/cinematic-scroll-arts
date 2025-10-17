// Device capability detection utilities

export interface DeviceCapabilities {
  isMobile: boolean;
  isLowEnd: boolean;
  supportsHighDPI: boolean;
  hardwareConcurrency: number;
  memoryEstimate: number;
}

export function getDeviceCapabilities(): DeviceCapabilities {
  const isMobile = window.matchMedia('(max-width: 768px)').matches || 
                   /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  const isLowEnd = hardwareConcurrency <= 2;
  
  const supportsHighDPI = window.devicePixelRatio > 1;
  
  // Estimate memory (not available in all browsers)
  const memoryEstimate = (navigator as any).deviceMemory || 4;

  return {
    isMobile,
    isLowEnd,
    supportsHighDPI,
    hardwareConcurrency,
    memoryEstimate
  };
}

export function getOptimalFrameCount(baseFrameCount: number): number {
  const capabilities = getDeviceCapabilities();
  
  if (capabilities.isLowEnd || capabilities.memoryEstimate < 4) {
    return Math.floor(baseFrameCount * 0.6); // 60% of frames
  }
  
  if (capabilities.isMobile) {
    return Math.floor(baseFrameCount * 0.8); // 80% of frames
  }
  
  return baseFrameCount;
}

export function getOptimalParticleCount(baseParticleCount: number): number {
  const capabilities = getDeviceCapabilities();
  
  if (capabilities.isLowEnd) {
    return Math.floor(baseParticleCount * 0.3); // 30% of particles
  }
  
  if (capabilities.isMobile) {
    return Math.floor(baseParticleCount * 0.6); // 60% of particles
  }
  
  return baseParticleCount;
}

export function shouldUseReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
