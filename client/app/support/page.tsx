import { Metadata } from 'next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Support & Contact | Platypus',
  description:
    'Get help with Platypus dog walking services. Contact our support team via email, phone, or in-app chat.',
  alternates: {
    canonical: 'https://theplatypus.in/support',
  },
};

const faqs = [
  {
    question: 'How do I book a dog walk?',
    answer:
      'Download the Platypus app, create an account with your phone number, add your pet\'s details, and tap "Book a Walk". Choose your preferred time slot and a certified Guardian will be assigned to your walk.',
  },
  {
    question: 'How are Guardians vetted and trained?',
    answer:
      'All Guardians go through our certification program covering dog handling, safety protocols, first aid, and Mumbai-specific training (monsoon safety, pavement awareness, stray dog management). They are background-verified before being activated on the platform.',
  },
  {
    question: 'Can I track my dog during the walk?',
    answer:
      'Yes. Once the walk begins, you can see your Guardian\'s live GPS location on a map in real-time. After the walk, you\'ll receive a route summary with distance covered and duration.',
  },
  {
    question: 'What happens if I need to cancel a walk?',
    answer:
      'You can cancel a walk from the app. Cancellations more than 12 hours before the walk receive a full refund. Cancellations 4-12 hours before receive a 50% refund. Cancellations less than 4 hours before are non-refundable. See our Refund Policy for full details.',
  },
  {
    question: 'What areas in Mumbai do you cover?',
    answer:
      'We currently operate across major neighborhoods in Mumbai including Bandra, Andheri, Powai, Juhu, Worli, Lower Parel, and more. We are actively expanding to new areas. Check the app for real-time availability in your location.',
  },
  {
    question: 'Is my pet insured during the walk?',
    answer:
      'Guardians are trained in safety protocols and responsible for pet welfare during walks. We are in the process of rolling out pet insurance coverage for walks booked through the platform. Contact support for the latest details.',
  },
];

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <Breadcrumb items={[{ label: 'Support' }]} />

      <main className="pt-[70px] md:pt-[80px]">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-domine text-gray-900">
              How can we help?
            </h1>
            <p className="text-lg text-gray-600">
              Our team is here to assist you with anything related to your Platypus experience.
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 font-domine mb-8 text-center">
              Get in Touch
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Email */}
              <div className="rounded-2xl border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                <a
                  href="mailto:sagar@theplatypus.in"
                  className="text-blue-600 hover:underline"
                >
                  sagar@theplatypus.in
                </a>
                <p className="text-sm text-gray-500 mt-2">We respond within 24 hours</p>
              </div>

              {/* Phone */}
              <div className="rounded-2xl border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
                <a href="tel:+918451880963" className="text-blue-600 hover:underline">
                  +91 84518 80963
                </a>
                <p className="text-sm text-gray-500 mt-2">Mon&ndash;Sat, 9 AM &ndash; 7 PM IST</p>
              </div>

              {/* In-App */}
              <div className="rounded-2xl border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">In-App Support</h3>
                <p className="text-gray-700">Settings &rarr; Support</p>
                <p className="text-sm text-gray-500 mt-2">Available in the Platypus app</p>
              </div>
            </div>

            {/* Office */}
            <div className="mt-8 rounded-2xl border border-gray-200 p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Office</h3>
              <p className="text-gray-700">
                Third Planet Solutions Private Limited
                <br />
                Mumbai, Maharashtra, India
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 font-domine mb-8 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group rounded-xl border border-gray-200 bg-white overflow-hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                    <span>{faq.question}</span>
                    <svg
                      className="w-5 h-5 text-gray-500 shrink-0 ml-4 transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </summary>
                  <div className="px-6 pb-4 text-gray-600 leading-relaxed">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
