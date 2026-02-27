'use client';

import { Dog, Users, MapPin, ShieldCheck } from 'lucide-react';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import StaggerContainer, { staggerItem } from '@/components/ui/StaggerContainer';
import WaveDivider from '@/components/ui/WaveDivider';
import { motion } from 'framer-motion';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: typeof Dog;
}

const stats: StatItem[] = [
  { value: 5000, suffix: '+', label: 'Dogs Walked', icon: Dog },
  { value: 500, suffix: '+', label: 'Happy Pet Parents', icon: Users },
  { value: 21, suffix: '', label: 'Areas Served', icon: MapPin },
  { value: 50, suffix: '+', label: 'Certified Guardians', icon: ShieldCheck },
];

const StatsCounters = () => {
  return (
    <div className="relative">
      {/* Wave top — blends from the About section's light blue */}
      <WaveDivider color="#1A5BC4" className="relative -mb-1 bg-gradient-to-br from-[#FFFBF0] to-[#FFFCF0]" />

      <section className="py-20 md:py-28 bg-gradient-to-r from-[#1A5BC4] to-[#247AFD] relative overflow-hidden">
        {/* Noise texture */}
        <div className="absolute inset-0 bg-noise" />

        {/* Decorative circles */}
        <div className="absolute top-[-60px] right-[-60px] w-[200px] h-[200px] rounded-full border border-white/10 pointer-events-none" />
        <div className="absolute bottom-[-40px] left-[-40px] w-[160px] h-[160px] rounded-full border border-white/10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <StaggerContainer staggerDelay={0.15} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div key={stat.label} variants={staggerItem} className="text-center">
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-white/80" />
                  </div>
                  <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-brand-yellow mb-3 tracking-tight">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-white/70 font-medium text-sm uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Wave bottom — blends into AreasWeServe's white */}
      <WaveDivider color="#ffffff" flip className="relative -mt-1 bg-gradient-to-r from-[#247AFD] to-[#247AFD]" />
    </div>
  );
};

export default StatsCounters;
