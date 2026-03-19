import { Metadata } from 'next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Terms of Service | Platypus',
  description:
    'Terms of Service for Platypus dog walking platform. Read the terms governing your use of our services.',
  alternates: {
    canonical: 'https://theplatypus.in/terms',
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <Breadcrumb items={[{ label: 'Terms of Service' }]} />

      <main className="pt-[70px] md:pt-[80px]">
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-domine text-gray-900">
              Terms of Service
            </h1>
            <p className="text-sm text-gray-500 mb-12">Last updated: March 2026</p>

            <div className="prose prose-gray max-w-none space-y-10 text-gray-700 leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  1. Introduction
                </h2>
                <p>
                  These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the Platypus
                  platform operated by Third Planet Solutions Private Limited
                  (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or
                  &ldquo;our&rdquo;), including the Platypus mobile application (for pet parents),
                  the Platypus Guardian mobile application (for dog walkers), and the website at
                  theplatypus.in.
                </p>
                <p>
                  By creating an account or using our services, you agree to be bound by these
                  Terms. If you do not agree, please do not use our platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  2. Service Description
                </h2>
                <p>
                  Platypus is an on-demand dog walking platform that connects pet parents with
                  certified dog walking professionals (&ldquo;Guardians&rdquo;). Our platform
                  facilitates:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Booking and scheduling of dog walking sessions</li>
                  <li>Real-time GPS tracking of walks</li>
                  <li>Secure payment processing</li>
                  <li>Walk history, route maps, and photo updates</li>
                  <li>Self-walk tracking for pet parents</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  3. User Accounts
                </h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    Accounts are created using phone-based authentication via Firebase.
                  </li>
                  <li>
                    Each phone number may hold one account per role (Parent or Guardian).
                  </li>
                  <li>
                    You are responsible for maintaining the security of your account and for all
                    activities that occur under your account.
                  </li>
                  <li>
                    You must provide accurate and complete information during registration and keep
                    it updated.
                  </li>
                  <li>
                    We reserve the right to suspend or terminate accounts that violate these Terms.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  4. Bookings and Payments
                </h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    All payments are processed securely through Razorpay. By making a payment, you
                    agree to Razorpay&apos;s terms of service.
                  </li>
                  <li>Prices are displayed in Indian Rupees (INR) and include applicable taxes.</li>
                  <li>
                    Wallet credits may be used for future bookings and are non-transferable.
                  </li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Refund Policy</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <strong>Cancellation more than 12 hours before the walk:</strong> 100% refund to
                    wallet.
                  </li>
                  <li>
                    <strong>Cancellation 4&ndash;12 hours before the walk:</strong> 50% refund to
                    wallet.
                  </li>
                  <li>
                    <strong>Cancellation less than 4 hours before the walk:</strong> No refund.
                  </li>
                </ul>
                <p className="mt-3">
                  For full details, please refer to our{' '}
                  <a href="/refund" className="text-blue-600 hover:underline">
                    Refund Policy
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  5. Guardian Terms
                </h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    Guardians are independent contractors and not employees of Third Planet Solutions
                    Private Limited.
                  </li>
                  <li>
                    Guardians must complete the Platypus Guardian Certification training program
                    before accepting walks.
                  </li>
                  <li>
                    Guardians are responsible for the safety and well-being of pets during walks.
                  </li>
                  <li>
                    Guardians must follow all platform safety protocols, including GPS tracking,
                    photo updates, and route adherence.
                  </li>
                  <li>
                    Payouts are processed per the Guardian payout schedule communicated in the app.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  6. Liability
                </h2>
                <p>
                  Platypus operates as a technology platform that connects pet parents with
                  Guardians. While we vet and train our Guardians, please note:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    Guardians carry primary responsibility for the safety and care of pets during
                    walks.
                  </li>
                  <li>
                    Platypus is not liable for injuries, loss, or damage that may occur during a
                    walk, except as required by applicable law.
                  </li>
                  <li>
                    Pet parents are responsible for providing accurate information about their
                    pet&apos;s health, behavior, and any special requirements.
                  </li>
                  <li>
                    Our total liability to any user shall not exceed the amount paid by that user in
                    the preceding 12 months.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  7. Prohibited Conduct
                </h2>
                <p>Users of the platform must not:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    Exchange personal contact information (phone numbers, email, social media) with
                    the other party to arrange services outside the platform.
                  </li>
                  <li>
                    Bypass the platform for payments or arrange walks directly with Guardians or pet
                    parents.
                  </li>
                  <li>
                    Create multiple accounts to circumvent bans, restrictions, or promotional limits.
                  </li>
                  <li>
                    Use the platform for any unlawful purpose or in violation of any applicable
                    laws.
                  </li>
                  <li>
                    Harass, abuse, or threaten other users, Guardians, or Platypus staff.
                  </li>
                  <li>
                    Provide false or misleading information about pets, including health or
                    behavioral issues.
                  </li>
                </ul>
                <p className="mt-3">
                  Violation of these rules may result in immediate account suspension or termination.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  8. Cancellation
                </h2>
                <p>
                  Either party (pet parent or Guardian) may cancel a booking subject to the refund
                  policy outlined in Section 4. Repeated cancellations by Guardians may result in
                  reduced assignment priority or account suspension. Repeated cancellations by pet
                  parents may result in restrictions on future bookings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  9. Intellectual Property
                </h2>
                <p>
                  The Platypus name, logo, brand identity, app content, website content, and all
                  associated intellectual property are owned by Third Planet Solutions Private
                  Limited. You may not reproduce, distribute, modify, or create derivative works
                  from any of our intellectual property without prior written consent.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  10. Governing Law and Jurisdiction
                </h2>
                <p>
                  These Terms are governed by the laws of India. Any disputes arising from these
                  Terms or your use of the platform shall be subject to the exclusive jurisdiction of
                  the courts in Mumbai, Maharashtra, India.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  11. Changes to These Terms
                </h2>
                <p>
                  We may update these Terms from time to time. Changes will be posted on this page
                  with an updated &ldquo;Last updated&rdquo; date. Continued use of the platform
                  after changes constitutes acceptance of the revised Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  12. Contact Us
                </h2>
                <p>If you have questions about these Terms, please contact us:</p>
                <ul className="list-none pl-0 space-y-1 mt-3">
                  <li>
                    <strong>Company:</strong> Third Planet Solutions Private Limited
                  </li>
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
                    <strong>Location:</strong> Mumbai, Maharashtra, India
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
