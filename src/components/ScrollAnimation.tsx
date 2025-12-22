import { ReactNode, useEffect, useRef, useState } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  animationType?: 'fade-in' | 'slide-left' | 'slide-right';
  delay?: number;
}

export const ScrollAnimation = ({ 
  children, 
  className = '', 
  animationType = 'fade-in',
  delay = 0 
}: ScrollAnimationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay]);

  const animationClass = `scroll-animate-${animationType} ${isVisible ? 'visible' : ''}`;

  return (
    <div ref={ref} className={`${animationClass} ${className}`}>
      {children}
    </div>
  );
};









