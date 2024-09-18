import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button'; // Your shadcn Button import

const ContactButton: React.FC = () => {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const btn = buttonRef.current;
    const circle = circleRef.current;

    if (btn && circle) {
      gsap.set(circle, {
        scale: 0.2,
        opacity: 0,
      });

      const tl = gsap.timeline({ paused: true });
      tl.to(btn, {
        duration: 0.2,
        scale: 0.95,
        boxShadow: '0px -2px 20px 0px #C5C5C5',
        ease: 'power4.out',
      }).to(circle, {
        scale: 2,
        opacity: 0.2,
      });

      const setPosition = (e: MouseEvent) => {
        const bounds = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;

        gsap.set(circle, {
          left: `${x}px`,
          top: `${y}px`,
        });
      };
      const handleMouseEnter = (e: MouseEvent) => {
        setPosition(e);
        tl.play();
      };

      const handleMouseLeave = (e: MouseEvent) => {
        setPosition(e);
        tl.reverse();
      };

      btn.addEventListener('mouseenter', handleMouseEnter);
      btn.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        btn.removeEventListener('mouseenter', handleMouseEnter);
        btn.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <div className="group relative inline-block w-full overflow-hidden sm:w-auto" ref={buttonRef}>
      <Button className="relative w-full overflow-hidden rounded-[1.25rem] bg-[#836EF9] px-10 py-7 text-base text-white shadow-combinedShadow1 transition-colors duration-300 ease-out">
        <span className="relative z-10">Contact Us</span>
        <span
          ref={circleRef}
          className="circle pointer-events-none absolute h-full w-full rounded-full bg-white opacity-0"
        ></span>
      </Button>
    </div>
  );
};

export default ContactButton;
