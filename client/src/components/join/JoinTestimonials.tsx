import { Star } from 'lucide-react';

const QuoteIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="currentColor" className={className} aria-hidden="true">
    <path d="M21.66 13.41c-3.6 2.52-6.24 6.06-7.92 10.62-.36.96-.12 1.56.72 1.8.84.24 1.38-.12 1.62-1.08.96-3.96 2.82-7.08 5.58-9.36.48-.36.54-.84.18-1.44-.36-.54-.84-.66-1.38-.36-.24.12-.54.36-.8.48v.34zm14.4 0c-3.6 2.52-6.24 6.06-7.92 10.62-.36.96-.12 1.56.72 1.8.84.24 1.38-.12 1.62-1.08.96-3.96 2.82-7.08 5.58-9.36.48-.36.54-.84.18-1.44-.36-.54-.84-.66-1.38-.36-.24.12-.54.36-.8.48v.34z" />
  </svg>
);

const testimonials = [
  {
    name: 'Rahul M.',
    role: 'Dog Walker, Bandra',
    quote:
      'Joining Platypus was the best decision. The flexible hours let me pursue my studies while earning well. Plus, I get to spend my days with amazing dogs!',
  },
  {
    name: 'Priya S.',
    role: 'Senior Guardian, Andheri',
    quote:
      'I started as a walker 6 months ago and now I\'m a Senior Guardian managing a team. The growth here is real, and the training they provide is world-class.',
  },
  {
    name: 'Arjun K.',
    role: 'Dog Walker, Powai',
    quote:
      'The community at Platypus is incredible. Every Guardian genuinely cares about the dogs. It doesn\'t feel like work — it feels like a calling.',
  },
];

export default function JoinTestimonials() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[#F8FAFF] relative overflow-hidden">
      {/* Decorative circle */}
      <div className="absolute top-10 right-[-40px] w-[120px] h-[120px] rounded-full border border-brand-blue/10 pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="font-guttery text-brand-blue text-lg sm:text-xl mb-2 block">our guardians</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Hear from Our Guardians
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-brand transition-shadow duration-300 relative"
            >
              {/* Decorative quote */}
              <QuoteIcon className="w-12 h-12 text-brand-blue/8 absolute top-4 right-4" />

              {/* Star rating */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#FFE135] fill-[#FFE135]" />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
              <div className="border-t border-gray-100 pt-4">
                <p className="font-bold text-gray-900">{t.name}</p>
                <p className="text-sm text-brand-blue">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
