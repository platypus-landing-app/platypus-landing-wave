import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const JoinTeamCTA = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1A5BC4] to-[#247AFD] p-10 md:p-14 shadow-xl">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Love Dogs? Join Our Team!</h2>
              <p className="text-white/90 text-lg">
                Become a Platypus Guardian — flexible hours, great pay, and the best coworkers
                (they&apos;re all dogs).
              </p>
            </div>
            <Link
              href="/join"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFE135] hover:bg-[#E6CA2F] text-gray-900 font-bold rounded-lg transition-colors text-lg whitespace-nowrap"
            >
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinTeamCTA;
