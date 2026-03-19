import { Metadata } from 'next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Refund Policy | Platypus',
  description:
    'Refund and cancellation policy for Platypus dog walking services. Understand our refund timelines and processes.',
  alternates: {
    canonical: 'https://theplatypus.in/refund',
  },
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <Breadcrumb items={[{ label: 'Refund Policy' }]} />

      <main className="pt-[70px] md:pt-[80px]">
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-domine text-gray-900">
              Refund Policy
            </h1>
            <p className="text-sm text-gray-500 mb-12">Last updated: March 2026</p>

            <div className="prose prose-gray max-w-none space-y-10 text-gray-700 leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  1. Cancellation by Pet Parent
                </h2>
                <p>
                  If you cancel a scheduled dog walking session, the refund amount depends on how
                  far in advance you cancel:
                </p>

                <div className="mt-6 overflow-hidden rounded-xl border border-gray-200">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-sm font-semibold text-gray-900">
                          Cancellation Window
                        </th>
                        <th className="px-6 py-3 text-sm font-semibold text-gray-900">Refund</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4">More than 12 hours before the walk</td>
                        <td className="px-6 py-4 font-medium text-green-700">
                          100% refund to wallet
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">4&ndash;12 hours before the walk</td>
                        <td className="px-6 py-4 font-medium text-yellow-700">
                          50% refund to wallet
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Less than 4 hours before the walk</td>
                        <td className="px-6 py-4 font-medium text-red-700">No refund</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mt-4">
                  Refunds are credited to your Platypus wallet and can be used for future bookings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  2. Guardian No-Show
                </h2>
                <p>
                  If a Guardian fails to show up for a confirmed walk, you will receive:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>A full 100% refund to your wallet.</li>
                  <li>
                    Additional compensation in the form of wallet credits as a goodwill gesture.
                  </li>
                </ul>
                <p className="mt-3">
                  We will also attempt to assign an alternative Guardian for your walk wherever
                  possible.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  3. Walk Quality Issues
                </h2>
                <p>
                  If you are dissatisfied with the quality of a walk (e.g., walk cut short, safety
                  concerns, failure to follow instructions), please report the issue through the app
                  or email us at{' '}
                  <a
                    href="mailto:support@theplatypus.in"
                    className="text-blue-600 hover:underline"
                  >
                    support@theplatypus.in
                  </a>{' '}
                  within 24 hours of the walk.
                </p>
                <p className="mt-3">
                  Walk quality complaints are reviewed on a case-by-case basis. We may issue a
                  partial or full refund depending on the severity of the issue. Our support team
                  will review GPS data, walk duration, and any photo evidence before making a
                  determination.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  4. Subscription Refunds
                </h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <strong>Unused walks:</strong> If you cancel a subscription, unused walk credits
                    are refundable on a pro-rata basis to your wallet.
                  </li>
                  <li>
                    <strong>Used walks:</strong> Walk sessions that have already been completed are
                    non-refundable.
                  </li>
                  <li>
                    Subscription cancellations take effect at the end of the current billing cycle
                    unless an immediate cancellation is requested.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  5. Refund Processing
                </h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <strong>Wallet refunds:</strong> Credited instantly and available for immediate
                    use on future bookings.
                  </li>
                  <li>
                    <strong>Bank/card refunds:</strong> If you request a refund to your original
                    payment method instead of wallet credit, processing takes 5&ndash;7 business
                    days via Razorpay. The exact timeline depends on your bank or card issuer.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  6. How to Request a Refund
                </h2>
                <p>You can request a refund through any of the following channels:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <strong>In-app:</strong> Go to your booking history, select the walk, and tap
                    &ldquo;Request Refund&rdquo;.
                  </li>
                  <li>
                    <strong>Email:</strong>{' '}
                    <a
                      href="mailto:support@theplatypus.in"
                      className="text-blue-600 hover:underline"
                    >
                      support@theplatypus.in
                    </a>{' '}
                    with your booking ID and reason for refund.
                  </li>
                  <li>
                    <strong>Phone:</strong>{' '}
                    <a href="tel:+918451880963" className="text-blue-600 hover:underline">
                      +91 84518 80963
                    </a>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  7. Exceptions
                </h2>
                <p>Refunds will not be issued in the following cases:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>The walk was completed as booked without quality issues.</li>
                  <li>
                    The cancellation was due to inaccurate pet information provided by the parent
                    (e.g., undisclosed aggression issues).
                  </li>
                  <li>
                    The refund request is made more than 7 days after the walk date.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  8. Contact Us
                </h2>
                <p>For any refund-related queries, please reach out to us:</p>
                <ul className="list-none pl-0 space-y-1 mt-3">
                  <li>
                    <strong>Email:</strong>{' '}
                    <a
                      href="mailto:support@theplatypus.in"
                      className="text-blue-600 hover:underline"
                    >
                      support@theplatypus.in
                    </a>
                  </li>
                  <li>
                    <strong>Phone:</strong>{' '}
                    <a href="tel:+918451880963" className="text-blue-600 hover:underline">
                      +91 84518 80963
                    </a>
                  </li>
                  <li>
                    <strong>In-app:</strong> Settings &rarr; Support
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
