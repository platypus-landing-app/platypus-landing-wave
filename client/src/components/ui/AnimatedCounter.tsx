'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, animate } from 'framer-motion';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

const AnimatedCounter = ({ target, suffix = '', duration = 2, className }: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    const unsubscribe = motionValue.on('change', (v) => {
      setDisplay(Math.floor(v).toLocaleString());
    });
    return () => unsubscribe();
  }, [motionValue]);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionValue, target, {
      duration,
      ease: 'easeOut',
    });
    return () => controls.stop();
  }, [isInView, motionValue, target, duration]);

  return (
    <span ref={ref} className={className}>
      {display}{suffix}
    </span>
  );
};

export default AnimatedCounter;
