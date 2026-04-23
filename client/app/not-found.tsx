import Link from 'next/link';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBF0]">
      <Navigation />

      <main
        id="main-content"
        className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24"
      >
        <div className="w-full max-w-2xl text-center">
          <img
            src="/logo.png"
            alt="Platypus"
            className="h-[72px] w-auto mx-auto mb-8"
          />

          <p className="font-guttery text-brand-blue text-xl sm:text-2xl mb-2">
            we don&apos;t have this one
          </p>
          <h1 className="font-domine font-bold text-gray-900 text-[36px] sm:text-[44px] md:text-[52px] leading-[1.15] mb-4">
            Page not found
          </h1>
          <p className="text-[16px] sm:text-[17px] text-gray-700 leading-relaxed max-w-lg mx-auto mb-10">
            Let&apos;s get you back to what you came for. Our live routes are below.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <Link
              href="/"
              className="inline-flex items-center justify-center h-[52px] px-8 rounded-full bg-brand-blue text-white font-medium text-[16px] hover:bg-brand-blue-dark transition-colors"
            >
              Home
            </Link>
            <Link
              href="/services/dog-walking"
              className="inline-flex items-center justify-center h-[52px] px-8 rounded-full bg-white border border-gray-200 text-gray-900 font-medium text-[16px] hover:bg-gray-50 transition-colors"
            >
              Dog walking
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-left max-w-xl mx-auto">
            <Link
              href="/blog"
              className="block p-4 rounded-xl bg-white border border-gray-100 hover:border-brand-blue/30 transition-colors"
            >
              <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                Read
              </div>
              <div className="text-sm font-medium text-gray-900">Blog</div>
            </Link>
            <Link
              href="/services"
              className="block p-4 rounded-xl bg-white border border-gray-100 hover:border-brand-blue/30 transition-colors"
            >
              <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                Browse
              </div>
              <div className="text-sm font-medium text-gray-900">Services</div>
            </Link>
            <Link
              href="/support"
              className="block p-4 rounded-xl bg-white border border-gray-100 hover:border-brand-blue/30 transition-colors"
            >
              <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                Talk to us
              </div>
              <div className="text-sm font-medium text-gray-900">Support</div>
            </Link>
            <Link
              href="/join"
              className="block p-4 rounded-xl bg-white border border-gray-100 hover:border-brand-blue/30 transition-colors"
            >
              <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                Work with us
              </div>
              <div className="text-sm font-medium text-gray-900">Join the team</div>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
