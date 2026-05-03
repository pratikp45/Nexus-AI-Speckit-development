// Advanced smooth scroll behavior with performance optimizations
import { useEffect, useRef } from "react";

export const useSmoothScroll = () => {
  const rafId = useRef<number | null>(null);
  const isScrolling = useRef(false);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      // Enable smooth scrolling for the entire document
      document.documentElement.style.scrollBehavior = 'smooth';
    }

    // Handle anchor links with performance optimization
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]');
      
      if (link && !isScrolling.current) {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        
        if (targetId) {
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            isScrolling.current = true;
            
            // Cancel any ongoing RAF
            if (rafId.current) {
              cancelAnimationFrame(rafId.current);
            }
            
            // Use requestAnimationFrame for smoother performance
            rafId.current = requestAnimationFrame(() => {
              targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
              });
              
              // Reset scrolling state after animation
              setTimeout(() => {
                isScrolling.current = false;
              }, 1000);
            });
          }
        }
      }
    };

    // Add event listener with passive option for better performance
    document.addEventListener('click', handleAnchorClick, { passive: true });

    // Cleanup
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      document.documentElement.style.scrollBehavior = '';
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);
};

// Section navigation utility
export const scrollToSection = (sectionId: string, offset: number = 0) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// Get section offset for fixed navbar
export const getSectionOffset = () => {
  const navbar = document.querySelector('nav');
  if (navbar) {
    return navbar.offsetHeight + 20;
  }
  return 80; // Default offset
};
