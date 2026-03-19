import { Metadata } from 'next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Privacy Policy | Platypus',
  description:
    'Privacy Policy for Platypus dog walking platform. Learn how we collect, use, and protect your personal data.',
  alternates: {
    canonical: 'https://theplatypus.in/privacy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <Breadcrumb items={[{ label: 'Privacy Policy' }]} />

      <main className="pt-[70px] md:pt-[80px]">
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-domine text-gray-900">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-500 mb-12">Last updated: March 2026</p>

            <div className="prose prose-gray max-w-none space-y-10 text-gray-700 leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  1. Introduction
                </h2>
                <p>
                  Third Planet Solutions Private Limited (&ldquo;Platypus&rdquo;, &ldquo;we&rdquo;,
                  &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates the Platypus mobile application
                  (for pet parents) and the Platypus Guardian mobile application (for dog walkers),
                  along with the website at theplatypus.in. This Privacy Policy explains how we
                  collect, use, disclose, and safeguard your information when you use our platform.
                </p>
                <p>
                  By using our services, you agree to the collection and use of information in
                  accordance with this policy. If you do not agree with our policies, please do not
                  use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  2. Information We Collect
                </h2>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Personal Information
                </h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <strong>Account details:</strong> Name, phone number, and email address provided
                    during registration.
                  </li>
                  <li>
                    <strong>Location data:</strong> Real-time GPS coordinates collected during active
                    walks for safety and tracking purposes.
                  </li>
                  <li>
                    <strong>Pet information:</strong> Pet name, breed, age, weight, medical history,
                    and behavioral notes.
                  </li>
                  <li>
                    <strong>Payment information:</strong> Payment method details processed securely
                    through Razorpay. We do not store your full card or bank details on our servers.
                  </li>
                  <li>
                    <strong>Device information:</strong> Device type, operating system, app version,
                    and push notification tokens.
                  </li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
                  Automatically Collected Information
                </h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>App usage data and analytics</li>
                  <li>IP address and general location</li>
                  <li>Crash reports and performance logs</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  3. How We Use Your Information
                </h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <strong>Service delivery:</strong> To match pet parents with Guardians, manage
                    bookings, and facilitate dog walking sessions.
                  </li>
                  <li>
                    <strong>Safety and tracking:</strong> GPS data is used to provide live walk
                    tracking, route history, and ensure the safety of pets during walks.
                  </li>
                  <li>
                    <strong>Payments:</strong> To process payments, issue refunds, and manage wallet
                    balances.
                  </li>
                  <li>
                    <strong>Notifications:</strong> To send walk updates, booking confirmations,
                    promotional offers, and service alerts.
                  </li>
                  <li>
                    <strong>Improvement:</strong> To analyze usage patterns and improve our platform,
                    features, and user experience.
                  </li>
                  <li>
                    <strong>Legal compliance:</strong> To comply with applicable laws, regulations,
                    and legal processes.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  4. Third-Party Services
                </h2>
                <p>We share data with the following trusted third-party services:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <strong>Firebase (Google):</strong> Phone authentication and push notifications.
                  </li>
                  <li>
                    <strong>Razorpay:</strong> Payment processing and transaction management.
                  </li>
                  <li>
                    <strong>Google Maps:</strong> Map rendering, route display, and location services.
                  </li>
                </ul>
                <p className="mt-3">
                  These services have their own privacy policies governing the use of your data. We
                  only share the minimum data necessary for each service to function.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  5. Data Retention
                </h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <strong>Account data:</strong> Retained as long as your account is active. Deleted
                    upon account deletion request, subject to legal retention requirements.
                  </li>
                  <li>
                    <strong>GPS and walk data:</strong> Retained for 90 days after the walk, then
                    permanently deleted.
                  </li>
                  <li>
                    <strong>Payment records:</strong> Retained as required by applicable tax and
                    financial regulations (typically 7 years under Indian law).
                  </li>
                  <li>
                    <strong>Analytics data:</strong> Aggregated and anonymized data may be retained
                    indefinitely for service improvement.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  6. Your Rights
                </h2>
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <strong>Access:</strong> Request a copy of the personal data we hold about you.
                  </li>
                  <li>
                    <strong>Correction:</strong> Request correction of inaccurate or incomplete data.
                  </li>
                  <li>
                    <strong>Deletion:</strong> Request deletion of your personal data, subject to
                    legal retention requirements.
                  </li>
                  <li>
                    <strong>Portability:</strong> Request your data in a commonly used, machine-readable format.
                  </li>
                </ul>
                <p className="mt-3">
                  To exercise any of these rights, please email us at{' '}
                  <a
                    href="mailto:sagar@theplatypus.in"
                    className="text-blue-600 hover:underline"
                  >
                    sagar@theplatypus.in
                  </a>
                  . We will respond to your request within 30 days.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  7. Children&apos;s Privacy
                </h2>
                <p>
                  Our services are not directed at children under the age of 13. We do not knowingly
                  collect personal information from children under 13. If we become aware that we
                  have collected personal data from a child under 13, we will take steps to delete
                  that information promptly.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  8. Compliance with Indian Law
                </h2>
                <p>
                  This Privacy Policy is compliant with the Information Technology Act, 2000, the
                  Information Technology (Reasonable Security Practices and Procedures and Sensitive
                  Personal Data or Information) Rules, 2011, and the Digital Personal Data
                  Protection Act, 2023 (DPDP Act). We implement reasonable security practices and
                  procedures to protect your personal data as required under these laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  9. Cookies
                </h2>
                <p>
                  Our website uses minimal, session-based cookies necessary for the functioning of
                  the site. We do not use third-party advertising cookies. Analytics cookies (Google
                  Analytics) are used to understand website traffic and usage patterns.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  10. Data Security
                </h2>
                <p>
                  We implement industry-standard security measures including encrypted data
                  transmission (TLS/SSL), secure server infrastructure, access controls, and regular
                  security audits. However, no method of electronic storage or transmission is 100%
                  secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  11. Changes to This Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time. Changes will be posted on
                  this page with an updated &ldquo;Last updated&rdquo; date. Continued use of the
                  platform after changes constitutes acceptance of the revised policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  12. Contact Us
                </h2>
                <p>
                  If you have questions or concerns about this Privacy Policy, please contact us:
                </p>
                <ul className="list-none pl-0 space-y-1 mt-3">
                  <li>
                    <strong>Company:</strong> Third Planet Solutions Private Limited
                  </li>
                  <li>
                    <strong>Email:</strong>{' '}
                    <a
                      href="mailto:sagar@theplatypus.in"
                      className="text-blue-600 hover:underline"
                    >
                      sagar@theplatypus.in
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
