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
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          Hear from Our Guardians
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
            >
              <p className="text-gray-700 leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="font-bold text-gray-900">{t.name}</p>
                <p className="text-sm text-[#0088FF]">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
