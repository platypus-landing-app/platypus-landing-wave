'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Shield,
  Smartphone,
  Clock,
  Gift,
  ChevronRight,
  Download,
  Star,
  Navigation,
  Radio,
  PawPrint,
  Phone,
  Sparkles,
} from 'lucide-react';

type Platform = 'ios' | 'android' | 'unknown';

const PLAY_STORE = 'https://play.google.com/store/apps/details?id=in.theplatypus.parent';
const APP_STORE = 'https://apps.apple.com/app/platypus/id6740020498';
const DEEP_LINK = 'platypus://petfed';

function detectPlatform(): Platform {
  if (typeof navigator === 'undefined') return 'unknown';
  const ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) return 'ios';
  if (/android/.test(ua)) return 'android';
  return 'unknown';
}

function getStoreUrl(platform: Platform): string {
  if (platform === 'ios') return APP_STORE;
  return PLAY_STORE;
}

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function PetfedLanding() {
  const [platform, setPlatform] = useState<Platform>('unknown');

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const handleDownload = () => {
    window.open(getStoreUrl(platform), '_blank', 'noopener');
  };

  const handleDeepLink = () => {
    window.location.href = DEEP_LINK;
  };

  return (
    <div className="min-h-screen bg-[#FFF8F3] overflow-x-hidden" style={{ fontFamily: 'var(--font-funnel), system-ui, sans-serif' }}>

      {/* ═══ HERO ═══ */}
      <section className="relative px-5 pt-12 pb-16 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-16 w-56 h-56 rounded-full bg-[#FF6B35]/[0.07] blur-3xl" />
        <div className="absolute top-40 -left-20 w-40 h-40 rounded-full bg-[#FFE135]/[0.12] blur-2xl" />
        <div className="absolute bottom-0 right-10 w-32 h-32 rounded-full bg-[#1B2845]/[0.04] blur-2xl" />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-lg mx-auto"
        >
          {/* Co-branding */}
          <motion.div variants={fadeUp} className="flex items-center gap-2.5 mb-8">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#FF6B35] text-white text-[13px] font-bold tracking-wide shadow-lg shadow-[#FF6B35]/20">
              <PawPrint className="w-3.5 h-3.5" />
              PetFed
            </span>
            <span className="text-[#1B2845]/30 text-lg font-light">&times;</span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#FFE135] text-[#1B2845] text-[13px] font-bold tracking-wide shadow-lg shadow-[#FFE135]/20">
              <Sparkles className="w-3.5 h-3.5" />
              Platypus
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-[40px] leading-[1.08] font-bold text-[#1B2845] mb-4"
            style={{ fontFamily: 'var(--font-domine), Georgia, serif' }}
          >
            Your Pup&rsquo;s Best Day at{' '}
            <span className="relative inline-block">
              PetFed
              <span className="absolute -bottom-1 left-0 right-0 h-3 bg-[#FFE135]/40 -z-10 rounded-sm" />
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-[#1B2845]/60 text-[17px] leading-relaxed mb-3">
            March 21&ndash;22, 2026 &middot; NESCO, Goregaon East
          </motion.p>
          <motion.p variants={fadeUp} className="text-[#1B2845]/50 text-[15px] leading-relaxed mb-8">
            Book a Buddy to watch your pup while you explore, or grab 5 walks at an unbeatable price.
          </motion.p>

          {/* Primary CTA */}
          <motion.button
            variants={fadeUp}
            onClick={handleDownload}
            className="group w-full flex items-center justify-center gap-3 px-8 py-4.5 bg-[#FF6B35] hover:bg-[#E85A28] active:scale-[0.98] text-white text-[17px] font-bold rounded-2xl shadow-xl shadow-[#FF6B35]/25 transition-all duration-200"
          >
            <Download className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
            Download &amp; Book a Buddy
            <ChevronRight className="w-5 h-5 opacity-60 transition-transform group-hover:translate-x-1" />
          </motion.button>

          <motion.button
            variants={fadeUp}
            onClick={handleDeepLink}
            className="w-full mt-3 py-2.5 text-[#FF6B35] text-[14px] font-semibold hover:underline transition-colors"
          >
            Already have the app? Open directly &rarr;
          </motion.button>
        </motion.div>
      </section>

      {/* ═══ OFFERINGS ═══ */}
      <section className="px-5 pb-14">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="max-w-lg mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* Buddy Service */}
          <motion.div
            variants={scaleIn}
            className="relative rounded-3xl p-6 overflow-hidden"
            style={{ background: 'linear-gradient(145deg, #FF6B35, #FF8F5E)' }}
          >
            <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/[0.08]" />
            <div className="absolute bottom-4 -left-4 w-16 h-16 rounded-full bg-white/[0.06]" />

            <div className="relative z-10">
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                <PawPrint className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-white text-[22px] font-bold mb-1" style={{ fontFamily: 'var(--font-domine), Georgia, serif' }}>
                Book a Buddy
              </h3>
              <div className="inline-flex items-baseline gap-1 mb-3">
                <span className="text-white/90 text-[28px] font-bold">&rupee;399</span>
                <span className="text-white/60 text-[14px]">/ 30 min</span>
              </div>
              <p className="text-white/75 text-[14px] leading-relaxed">
                A certified Platypus Guardian watches your pup while you enjoy the event.
              </p>
            </div>
          </motion.div>

          {/* Welcome Pack */}
          <motion.div
            variants={scaleIn}
            className="relative rounded-3xl p-6 bg-[#1B2845] overflow-hidden"
          >
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#FFE135]/[0.06]" />
            <div className="absolute bottom-6 -left-6 w-20 h-20 rounded-full bg-[#FF6B35]/[0.06]" />

            <div className="relative z-10">
              <div className="w-11 h-11 rounded-xl bg-[#FFE135]/20 flex items-center justify-center mb-4">
                <Gift className="w-5 h-5 text-[#FFE135]" />
              </div>
              <h3 className="text-white text-[22px] font-bold mb-1" style={{ fontFamily: 'var(--font-domine), Georgia, serif' }}>
                5 Walks at &rupee;499
              </h3>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 rounded-md bg-[#FFE135]/20 text-[#FFE135] text-[12px] font-bold tracking-wide">
                  60% OFF
                </span>
              </div>
              <p className="text-white/60 text-[14px] leading-relaxed">
                Use anytime. No expiry. The best way to try Platypus.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="px-5 py-14 bg-white">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="max-w-lg mx-auto"
        >
          <motion.h2
            variants={fadeUp}
            className="text-[26px] font-bold text-[#1B2845] mb-10 text-center"
            style={{ fontFamily: 'var(--font-domine), Georgia, serif' }}
          >
            How It Works
          </motion.h2>

          <div className="space-y-6">
            {[
              {
                step: '1',
                icon: <Smartphone className="w-5 h-5" />,
                title: 'Download Platypus App',
                desc: 'Free on App Store & Play Store',
                color: 'bg-[#FF6B35]',
                glow: 'shadow-[#FF6B35]/15',
              },
              {
                step: '2',
                icon: <Navigation className="w-5 h-5" />,
                title: 'Tap \'PetFed\' on home screen',
                desc: 'The banner shows up when you\'re at the event',
                color: 'bg-[#1B2845]',
                glow: 'shadow-[#1B2845]/15',
              },
              {
                step: '3',
                icon: <Sparkles className="w-5 h-5" />,
                title: 'Pick your pet, pay & enjoy!',
                desc: 'Your buddy is assigned instantly',
                color: 'bg-[#FFE135]',
                glow: 'shadow-[#FFE135]/20',
                iconColor: 'text-[#1B2845]',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-start gap-4"
              >
                <div className={`relative flex-shrink-0 w-12 h-12 rounded-2xl ${item.color} shadow-lg ${item.glow} flex items-center justify-center`}>
                  <span className={item.iconColor || 'text-white'}>{item.icon}</span>
                  {i < 2 && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-6 bg-[#1B2845]/10" />
                  )}
                </div>
                <div className="pt-0.5">
                  <h4 className="text-[#1B2845] text-[16px] font-bold mb-0.5">{item.title}</h4>
                  <p className="text-[#1B2845]/50 text-[14px]">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══ TRUST ═══ */}
      <section className="px-5 py-14">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="max-w-lg mx-auto"
        >
          <motion.h2
            variants={fadeUp}
            className="text-[26px] font-bold text-[#1B2845] mb-8 text-center"
            style={{ fontFamily: 'var(--font-domine), Georgia, serif' }}
          >
            Why Platypus?
          </motion.h2>

          <div className="grid grid-cols-2 gap-3">
            {[
              {
                icon: <MapPin className="w-5 h-5" />,
                title: 'GPS-Tracked',
                desc: 'Watch every step live',
                accent: '#FF6B35',
              },
              {
                icon: <Shield className="w-5 h-5" />,
                title: 'Certified Guardians',
                desc: 'Trained & verified',
                accent: '#1B2845',
              },
              {
                icon: <Radio className="w-5 h-5" />,
                title: 'Real-Time Updates',
                desc: 'Photos, poop alerts & more',
                accent: '#FFE135',
                iconDark: true,
              },
              {
                icon: <Star className="w-5 h-5" />,
                title: '1000+ Walks',
                desc: 'Mumbai trusts us',
                accent: '#FF6B35',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                className="rounded-2xl bg-white p-5 shadow-sm border border-[#1B2845]/[0.06]"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${item.accent}15` }}
                >
                  <span style={{ color: item.iconDark ? '#1B2845' : item.accent }}>{item.icon}</span>
                </div>
                <h4 className="text-[#1B2845] text-[15px] font-bold mb-0.5">{item.title}</h4>
                <p className="text-[#1B2845]/45 text-[13px] leading-snug">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══ DOWNLOAD CTA ═══ */}
      <section className="px-5 py-16 bg-[#1B2845] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6B35]/30 to-transparent" />
        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[#FF6B35]/[0.08] blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-[#FFE135]/[0.06] blur-3xl" />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="relative z-10 max-w-lg mx-auto text-center"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] text-white/60 text-[13px] font-medium mb-6">
            <Clock className="w-3.5 h-3.5" />
            March 21&ndash;22 only
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-white text-[28px] font-bold mb-3"
            style={{ fontFamily: 'var(--font-domine), Georgia, serif' }}
          >
            Don&rsquo;t miss out
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 text-[15px] mb-8 max-w-xs mx-auto">
            Download now and book a buddy the moment you arrive at PetFed.
          </motion.p>

          <motion.button
            variants={fadeUp}
            onClick={handleDownload}
            className="group w-full flex items-center justify-center gap-3 px-8 py-4.5 bg-[#FFE135] hover:bg-[#F5D82F] active:scale-[0.98] text-[#1B2845] text-[17px] font-bold rounded-2xl shadow-xl shadow-[#FFE135]/20 transition-all duration-200 mb-4"
          >
            <Download className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
            {platform === 'ios' ? 'Download on App Store' : platform === 'android' ? 'Get it on Play Store' : 'Download the App'}
            <ChevronRight className="w-5 h-5 opacity-50 transition-transform group-hover:translate-x-1" />
          </motion.button>

          <motion.button
            variants={fadeUp}
            onClick={handleDeepLink}
            className="text-white/40 text-[14px] font-medium hover:text-white/60 transition-colors"
          >
            Already have the app? Open directly &rarr;
          </motion.button>
        </motion.div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="px-5 py-10 bg-[#1B2845] border-t border-white/[0.06]">
        <div className="max-w-lg mx-auto text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-white/50 text-[14px]">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span>Find us at Hall 3, NESCO Exhibition Centre</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-white/40 text-[13px]">
            <Phone className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Questions? Visit our booth or call</span>
            <a href="tel:+918451880963" className="text-[#FFE135]/70 hover:text-[#FFE135] transition-colors font-medium">
              +91 84518 80963
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-[#FF6B35]/20 text-[#FF6B35] text-[11px] font-bold tracking-wider">PetFed</span>
            <span className="text-white/20 text-sm">&times;</span>
            <span className="px-2.5 py-1 rounded-md bg-[#FFE135]/15 text-[#FFE135] text-[11px] font-bold tracking-wider">Platypus</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
