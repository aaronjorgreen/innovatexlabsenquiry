import React, { useEffect, useRef, ReactNode } from 'react';

// Types for the motion component
interface MotionProps {
  children: ReactNode;
  initial?: Record<string, any>;
  animate?: Record<string, any>;
  whileInView?: Record<string, any>;
  transition?: Record<string, any>;
  viewport?: {
    once?: boolean;
    margin?: string;
  };
  className?: string;
}

// Simple implementation of framer-motion-like functionality
export const motion = {
  div: ({ 
    children, 
    initial, 
    animate, 
    whileInView, 
    transition = { duration: 0.5 },
    viewport = { once: true },
    className = '',
    ...props 
  }: MotionProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const animatedProps = whileInView || animate || {};
    
    useEffect(() => {
      if (!ref.current) return;
      
      const element = ref.current;
      let observer: IntersectionObserver | null = null;
      
      // Apply initial styles
      if (initial) {
        Object.entries(initial).forEach(([key, value]) => {
          if (key === 'opacity') {
            element.style.opacity = String(value);
          } else if (key === 'y') {
            element.style.transform = `translateY(${value}px)`;
          } else if (key === 'x') {
            element.style.transform = `translateX(${value}px)`;
          } else if (key === 'scale') {
            element.style.transform = element.style.transform 
              ? `${element.style.transform} scale(${value})`
              : `scale(${value})`;
          }
        });
      }
      
      // Set transition
      element.style.transition = Object.entries(transition)
        .map(([key, value]) => {
          if (key === 'duration') {
            return `all ${value}s`;
          } else if (key === 'delay') {
            return `delay ${value}s`;
          }
          return '';
        })
        .filter(Boolean)
        .join(' ');
      
      const applyAnimation = () => {
        if (!element) return;
        
        // Animate to final values
        Object.entries(animatedProps).forEach(([key, value]) => {
          if (key === 'opacity') {
            element.style.opacity = String(value);
          } else if (key === 'y') {
            element.style.transform = `translateY(${value}px)`;
          } else if (key === 'x') {
            element.style.transform = `translateX(${value}px)`;
          } else if (key === 'scale') {
            element.style.transform = element.style.transform 
              ? `${element.style.transform.replace(/scale\([^)]*\)/, '')} scale(${value})`
              : `scale(${value})`;
          }
        });
      };
      
      // If whileInView is provided, use IntersectionObserver
      if (whileInView) {
        observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              applyAnimation();
              if (viewport?.once) {
                observer?.disconnect();
              }
            }
          },
          { 
            rootMargin: viewport?.margin || '0px',
            threshold: 0.1 
          }
        );
        
        observer.observe(element);
      } else if (animate) {
        // If just animate is provided, apply animation immediately
        applyAnimation();
      }
      
      return () => {
        if (observer) {
          observer.disconnect();
        }
      };
    }, []);
    
    return (
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    );
  },
  span: ({ 
    children, 
    initial, 
    animate, 
    whileInView, 
    transition = { duration: 0.5 },
    viewport = { once: true },
    className = '',
    ...props 
  }: MotionProps) => {
    const ref = useRef<HTMLSpanElement>(null);
    const animatedProps = whileInView || animate || {};
    
    useEffect(() => {
      if (!ref.current) return;
      
      const element = ref.current;
      let observer: IntersectionObserver | null = null;
      
      // Apply initial styles
      if (initial) {
        Object.entries(initial).forEach(([key, value]) => {
          if (key === 'opacity') {
            element.style.opacity = String(value);
          } else if (key === 'y') {
            element.style.transform = `translateY(${value}px)`;
          } else if (key === 'x') {
            element.style.transform = `translateX(${value}px)`;
          } else if (key === 'scale') {
            element.style.transform = element.style.transform 
              ? `${element.style.transform} scale(${value})`
              : `scale(${value})`;
          }
        });
      }
      
      // Set transition
      element.style.transition = Object.entries(transition)
        .map(([key, value]) => {
          if (key === 'duration') {
            return `all ${value}s`;
          } else if (key === 'delay') {
            return `delay ${value}s`;
          }
          return '';
        })
        .filter(Boolean)
        .join(' ');
      
      const applyAnimation = () => {
        if (!element) return;
        
        // Animate to final values
        Object.entries(animatedProps).forEach(([key, value]) => {
          if (key === 'opacity') {
            element.style.opacity = String(value);
          } else if (key === 'y') {
            element.style.transform = `translateY(${value}px)`;
          } else if (key === 'x') {
            element.style.transform = `translateX(${value}px)`;
          } else if (key === 'scale') {
            element.style.transform = element.style.transform 
              ? `${element.style.transform.replace(/scale\([^)]*\)/, '')} scale(${value})`
              : `scale(${value})`;
          }
        });
      };
      
      // If whileInView is provided, use IntersectionObserver
      if (whileInView) {
        observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              applyAnimation();
              if (viewport?.once) {
                observer?.disconnect();
              }
            }
          },
          { 
            rootMargin: viewport?.margin || '0px',
            threshold: 0.1 
          }
        );
        
        observer.observe(element);
      } else if (animate) {
        // If just animate is provided, apply animation immediately
        applyAnimation();
      }
      
      return () => {
        if (observer) {
          observer.disconnect();
        }
      };
    }, []);
    
    return (
      <span ref={ref} className={className} {...props}>
        {children}
      </span>
    );
  },
  p: ({ 
    children, 
    initial, 
    animate, 
    whileInView, 
    transition = { duration: 0.5 },
    viewport = { once: true },
    className = '',
    ...props 
  }: MotionProps) => {
    const ref = useRef<HTMLParagraphElement>(null);
    const animatedProps = whileInView || animate || {};
    
    useEffect(() => {
      if (!ref.current) return;
      
      const element = ref.current;
      let observer: IntersectionObserver | null = null;
      
      // Apply initial styles
      if (initial) {
        Object.entries(initial).forEach(([key, value]) => {
          if (key === 'opacity') {
            element.style.opacity = String(value);
          } else if (key === 'y') {
            element.style.transform = `translateY(${value}px)`;
          } else if (key === 'x') {
            element.style.transform = `translateX(${value}px)`;
          } else if (key === 'scale') {
            element.style.transform = element.style.transform 
              ? `${element.style.transform} scale(${value})`
              : `scale(${value})`;
          }
        });
      }
      
      // Set transition
      element.style.transition = Object.entries(transition)
        .map(([key, value]) => {
          if (key === 'duration') {
            return `all ${value}s`;
          } else if (key === 'delay') {
            return `delay ${value}s`;
          }
          return '';
        })
        .filter(Boolean)
        .join(' ');
      
      const applyAnimation = () => {
        if (!element) return;
        
        // Animate to final values
        Object.entries(animatedProps).forEach(([key, value]) => {
          if (key === 'opacity') {
            element.style.opacity = String(value);
          } else if (key === 'y') {
            element.style.transform = `translateY(${value}px)`;
          } else if (key === 'x') {
            element.style.transform = `translateX(${value}px)`;
          } else if (key === 'scale') {
            element.style.transform = element.style.transform 
              ? `${element.style.transform.replace(/scale\([^)]*\)/, '')} scale(${value})`
              : `scale(${value})`;
          }
        });
      };
      
      // If whileInView is provided, use IntersectionObserver
      if (whileInView) {
        observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              applyAnimation();
              if (viewport?.once) {
                observer?.disconnect();
              }
            }
          },
          { 
            rootMargin: viewport?.margin || '0px',
            threshold: 0.1 
          }
        );
        
        observer.observe(element);
      } else if (animate) {
        // If just animate is provided, apply animation immediately
        applyAnimation();
      }
      
      return () => {
        if (observer) {
          observer.disconnect();
        }
      };
    }, []);
    
    return (
      <p ref={ref} className={className} {...props}>
        {children}
      </p>
    );
  },
  h2: ({ 
    children, 
    initial, 
    animate, 
    whileInView, 
    transition = { duration: 0.5 },
    viewport = { once: true },
    className = '',
    ...props 
  }: MotionProps) => {
    const ref = useRef<HTMLHeadingElement>(null);
    const animatedProps = whileInView || animate || {};
    
    useEffect(() => {
      if (!ref.current) return;
      
      const element = ref.current;
      let observer: IntersectionObserver | null = null;
      
      // Apply initial styles
      if (initial) {
        Object.entries(initial).forEach(([key, value]) => {
          if (key === 'opacity') {
            element.style.opacity = String(value);
          } else if (key === 'y') {
            element.style.transform = `translateY(${value}px)`;
          } else if (key === 'x') {
            element.style.transform = `translateX(${value}px)`;
          } else if (key === 'scale') {
            element.style.transform = element.style.transform 
              ? `${element.style.transform} scale(${value})`
              : `scale(${value})`;
          }
        });
      }
      
      // Set transition
      element.style.transition = Object.entries(transition)
        .map(([key, value]) => {
          if (key === 'duration') {
            return `all ${value}s`;
          } else if (key === 'delay') {
            return `delay ${value}s`;
          }
          return '';
        })
        .filter(Boolean)
        .join(' ');
      
      const applyAnimation = () => {
        if (!element) return;
        
        // Animate to final values
        Object.entries(animatedProps).forEach(([key, value]) => {
          if (key === 'opacity') {
            element.style.opacity = String(value);
          } else if (key === 'y') {
            element.style.transform = `translateY(${value}px)`;
          } else if (key === 'x') {
            element.style.transform = `translateX(${value}px)`;
          } else if (key === 'scale') {
            element.style.transform = element.style.transform 
              ? `${element.style.transform.replace(/scale\([^)]*\)/, '')} scale(${value})`
              : `scale(${value})`;
          }
        });
      };
      
      // If whileInView is provided, use IntersectionObserver
      if (whileInView) {
        observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              applyAnimation();
              if (viewport?.once) {
                observer?.disconnect();
              }
            }
          },
          { 
            rootMargin: viewport?.margin || '0px',
            threshold: 0.1 
          }
        );
        
        observer.observe(element);
      } else if (animate) {
        // If just animate is provided, apply animation immediately
        applyAnimation();
      }
      
      return () => {
        if (observer) {
          observer.disconnect();
        }
      };
    }, []);
    
    return (
      <h2 ref={ref} className={className} {...props}>
        {children}
      </h2>
    );
  }
};