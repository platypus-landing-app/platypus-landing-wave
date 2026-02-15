import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    q: 'Do I need prior experience with dogs?',
    a: 'No prior professional experience is needed! We provide comprehensive training and certification. However, a genuine love for animals is essential.',
  },
  {
    q: 'How much can I earn?',
    a: 'Guardians typically earn ₹15,000–₹30,000 per month depending on the number of walks and hours committed. Payouts are processed weekly.',
  },
  {
    q: 'What does the training involve?',
    a: 'Our free training covers dog behavior, breed-specific handling, leash techniques, safety protocols, first aid basics, and our GPS tracking system. It takes about 3-5 days.',
  },
  {
    q: 'Can I choose my own schedule?',
    a: 'Yes! You pick your available days and preferred time slots. We match you with dogs in your area based on your availability.',
  },
  {
    q: 'Is there a background verification?',
    a: 'Yes, we conduct a thorough background check including identity verification and address proof. This ensures safety for both pets and pet parents.',
  },
  {
    q: 'What areas do you currently operate in?',
    a: 'We operate across 21+ areas in Mumbai including Bandra, Andheri, Powai, Worli, Juhu, Thane, and more. We\'re always expanding to new neighborhoods.',
  },
  {
    q: 'What if I want to become a groomer or trainer instead?',
    a: 'We have positions for Groomers, Trainers, and Pet Sitters too. Select your preferred role during the application, and we\'ll match you with the right track.',
  },
];

export default function JoinFAQ() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="font-guttery text-brand-blue text-lg sm:text-xl mb-2 block">got questions?</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-white rounded-xl border border-gray-200 px-6 data-[state=open]:border-brand-blue/30 data-[state=open]:border-l-4 data-[state=open]:border-l-brand-blue transition-colors"
            >
              <AccordionTrigger className="text-left font-semibold text-gray-900 py-5 hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
