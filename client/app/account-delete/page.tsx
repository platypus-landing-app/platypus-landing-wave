import { Metadata } from 'next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Delete your account | Platypus',
  description:
    'How to delete your Platypus account and the associated data. Two paths: in-app deletion or email request to support.',
  alternates: {
    canonical: 'https://www.theplatypus.in/account-delete',
  },
  robots: { index: true, follow: true },
};

export default function AccountDeletePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <Breadcrumb items={[{ label: 'Delete your account' }]} />

      <main className="pt-[70px] md:pt-[80px]">
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-domine text-gray-900">
              Delete your account
            </h1>
            <p className="text-sm text-gray-500 mb-12">Last updated: May 2026</p>

            <div className="prose prose-gray max-w-none space-y-10 text-gray-700 leading-relaxed">
              <section>
                <p>
                  You can permanently delete your Platypus account and the personal
                  data associated with it at any time. There are two ways to do this.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  Option 1 · In the app
                </h2>
                <p>
                  The fastest path. Account deletion is fully self-serve from inside
                  the Platypus and Platypus Guardian apps.
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Open the Platypus app (or Platypus Guardian, if you are a walker).</li>
                  <li>Tap the profile icon in the top right of the home screen.</li>
                  <li>Open <strong>Settings</strong>.</li>
                  <li>Scroll to <strong>Account</strong> and tap <strong>Delete account</strong>.</li>
                  <li>Confirm the action. We close the account immediately.</li>
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  Option 2 · By email
                </h2>
                <p>
                  If you cannot access the app (lost your phone, uninstalled,
                  changed number), email us and we will close the account on your
                  behalf within 30 days.
                </p>
                <p>
                  Send a request to{' '}
                  <a
                    href="mailto:support@theplatypus.in?subject=Account%20deletion%20request"
                    className="text-blue-600 hover:underline"
                  >
                    support@theplatypus.in
                  </a>{' '}
                  from the email address or phone number registered to your
                  Platypus account. Subject line:{' '}
                  <em>Account deletion request</em>.
                </p>
                <p>
                  Include in the body:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>The phone number registered to the account.</li>
                  <li>Your name as it appears in the app.</li>
                  <li>The app you used (Platypus or Platypus Guardian).</li>
                </ul>
                <p>
                  We respond to deletion requests within 30 days, in line with the
                  Digital Personal Data Protection Act, 2023.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  What gets deleted
                </h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Your account profile (name, phone number, email).</li>
                  <li>Your pets and their care notes.</li>
                  <li>Saved addresses.</li>
                  <li>Chat history with guardians.</li>
                  <li>Notification preferences, weather cache, and any app-local data.</li>
                  <li>Authentication credentials and session tokens.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  What we keep
                </h2>
                <p>
                  We retain a minimum set of records that we are legally or
                  operationally required to keep, even after the account is closed:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <strong>Payment and tax records.</strong> Invoices, refunds,
                    and GST records are retained for the period required by Indian
                    tax law (typically 8 financial years).
                  </li>
                  <li>
                    <strong>Walk safety records.</strong> Walk logs, GPS trails, and
                    incident reports are anonymised and retained for safety
                    auditing.
                  </li>
                  <li>
                    <strong>Anti-fraud signals.</strong> Hashes of phone numbers
                    previously flagged for abuse, to prevent re-registration.
                  </li>
                </ul>
                <p>
                  These records do not contain your name, email, photos, address,
                  or chat content after deletion.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  After deletion
                </h2>
                <p>
                  Account closure is permanent. You will not be able to recover the
                  account or the data linked to it. To use Platypus again you will
                  need to register fresh.
                </p>
                <p>
                  If you have an active booking, complete it or cancel it before
                  initiating deletion. Pending refunds are processed against the
                  payment method on file before the account is closed.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 font-domine mb-4">
                  Questions
                </h2>
                <p>
                  Write to{' '}
                  <a
                    href="mailto:support@theplatypus.in"
                    className="text-blue-600 hover:underline"
                  >
                    support@theplatypus.in
                  </a>{' '}
                  or read the full{' '}
                  <a href="/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>{' '}
                  for the broader data-handling story.
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
