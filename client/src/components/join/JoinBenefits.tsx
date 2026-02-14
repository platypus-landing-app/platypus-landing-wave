import { DollarSign, Clock, GraduationCap, Shield, Users, TrendingUp } from 'lucide-react';

const benefits = [
  {
    icon: DollarSign,
    title: 'Competitive Earnings',
    description: 'Earn ₹15,000-₹30,000/month with flexible hours. Weekly payouts, no delays.',
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    description: 'Choose your own hours. Morning person or evening warrior — you decide.',
  },
  {
    icon: GraduationCap,
    title: 'Free Training & Certification',
    description: 'Get professionally trained and certified at no cost. Learn dog behavior, safety, and first aid.',
  },
  {
    icon: Shield,
    title: 'Insurance Coverage',
    description: 'Full liability insurance on every walk. You\'re protected while doing what you love.',
  },
  {
    icon: Users,
    title: 'Supportive Community',
    description: 'Join a community of passionate pet lovers. Regular meetups, events, and team support.',
  },
  {
    icon: TrendingUp,
    title: 'Growth Opportunities',
    description: 'Start as a Walker and grow into Senior Guardian, Area Lead, or Trainer roles.',
  },
];

export default function JoinBenefits() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
          Why Join Platypus?
        </h2>
        <p className="text-gray-600 text-lg text-center mb-12 max-w-2xl mx-auto">
          We take care of you so you can take care of the dogs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-[#0088FF]" />
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
