import { DollarSign, Clock, GraduationCap, Shield, Users, TrendingUp } from 'lucide-react';

const benefits = [
  {
    icon: DollarSign,
    title: 'Competitive Earnings',
    description: 'Earn ₹15,000-₹30,000/month with flexible hours. Weekly payouts, no delays.',
    color: 'bg-brand-green/10 text-brand-green',
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    description: 'Choose your own hours. Morning person or evening warrior — you decide.',
    color: 'bg-brand-blue/10 text-brand-blue',
  },
  {
    icon: GraduationCap,
    title: 'Free Training & Certification',
    description: 'Get professionally trained and certified at no cost. Learn dog behavior, safety, and first aid.',
    color: 'bg-brand-purple/10 text-brand-purple',
  },
  {
    icon: Shield,
    title: 'Insurance Coverage',
    description: 'Full liability insurance on every walk. You\'re protected while doing what you love.',
    color: 'bg-brand-orange/10 text-brand-orange',
  },
  {
    icon: Users,
    title: 'Supportive Community',
    description: 'Join a community of passionate pet lovers. Regular meetups, events, and team support.',
    color: 'bg-brand-yellow/15 text-yellow-600',
  },
  {
    icon: TrendingUp,
    title: 'Growth Opportunities',
    description: 'Start as a Walker and grow into Senior Guardian, Area Lead, or Trainer roles.',
    color: 'bg-brand-blue/10 text-brand-blue',
  },
];

export default function JoinBenefits() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Dot grid decoration */}
      <div className="absolute top-10 left-0 w-[180px] h-[180px] bg-dots opacity-40 pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="font-guttery text-brand-blue text-lg sm:text-xl mb-2 block">benefits</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Join Platypus?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We take care of you so you can take care of the dogs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-brand-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${benefit.color} flex items-center justify-center mb-5`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
