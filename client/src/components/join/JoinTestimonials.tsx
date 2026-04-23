import { Quote } from 'lucide-react';

/**
 * Placeholder for real Guardian testimonials.
 * Previous content was fabricated ("Rahul M. / Priya S. / Arjun K.") and removed on 2026-04-23.
 * Real testimonials with names, photos, and consent will replace this block.
 * See docs/audits/2026-04-23-landing-site.md finding #6.
 */
export default function JoinTestimonials() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[#FFFCF0] relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <span className="font-guttery text-brand-blue text-lg sm:text-xl mb-2 block">
          our guardians
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Hear from our Guardians
        </h2>
        <div className="mt-10 bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100 inline-flex flex-col items-center gap-4 w-full">
          <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center">
            <Quote className="w-6 h-6 text-brand-blue" aria-hidden="true" />
          </div>
          <p className="text-gray-700 leading-relaxed max-w-lg">
            Real quotes from our Guardians are coming soon. We are collecting
            consented stories, names, and photos from Guardians currently
            walking with us in Mumbai.
          </p>
          <p className="text-sm text-gray-500">
            Apply below to join the next round.
          </p>
        </div>
      </div>
    </section>
  );
}
