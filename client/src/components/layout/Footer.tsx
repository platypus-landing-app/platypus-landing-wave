'use client';

import { Facebook, Linkedin, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import WaveDivider from '@/components/ui/WaveDivider';

const Footer = () => {
  const handleScrollTo = (href: string) => {
    const element = document.querySelector(href) as HTMLElement;
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const footerLinks = [
    { label: 'All Services', href: '/services', isRoute: true },
    { label: 'Blog', href: '/blog', isRoute: true },
    { label: 'Join Our Team', href: '/join', isRoute: true },
    { label: 'What to Expect', href: '#process', isRoute: false },
  ];

  const socialLinks = [
    { label: 'Facebook', href: 'https://www.facebook.com/share/17DXgXPyAf/?mibextid=wwXIfr', icon: Facebook },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/platypus-be-their-human/posts/?feedView=all', icon: Linkedin },
    { label: 'Instagram', href: 'https://www.instagram.com/platypus_bth/', icon: Instagram },
  ];

  return (
    <>
      {/* Wave transition from white FAQ section to dark footer */}
      <WaveDivider color="#111827" className="relative -mb-1 bg-white" />

      <footer className="bg-gray-900 pt-16 pb-12 relative overflow-hidden">
        {/* Noise texture */}
        <div className="absolute inset-0 bg-noise opacity-30" />

        {/* Decorative circles */}
        <div className="absolute top-[-40px] right-[-40px] w-[160px] h-[160px] rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute bottom-20 left-[-30px] w-[100px] h-[100px] rounded-full border border-white/5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
            {/* Company Info */}
            <div className="space-y-4">
              <img
                src="/footer.png"
                alt="Platypus - India's Dog Walking Experts"
                loading="lazy"
                decoding="async"
                className="h-[80px] brightness-0 invert"
              />
              <p className="text-base leading-relaxed text-gray-400 max-w-sm">
                At Platypus, we deliver safe, structured, and joyful walks through our{" "}
                <span className="font-bold text-gray-300">Trained & Certified Guardians</span>.{" "}
                <span className="font-bold text-gray-300">With live GPS tracking, real-time updates, and strict safety protocols</span>,{" "}
                every walk is designed to give your dog the exercise, care, and love they deserve while giving you complete peace of mind.
              </p>
            </div>

            {/* Service */}
            <div>
              <h4 className="text-xl font-bold text-white mb-4">Service</h4>
              <p className="text-base leading-relaxed text-gray-400 mb-4">
                Dog walking across most areas of Mumbai with verified Guardians.
              </p>
              <div className="flex flex-col space-y-2">
                {footerLinks.map((link) =>
                  link.isRoute ? (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="group inline-flex items-center text-[#5A9AFE] transition-all duration-300 hover:text-brand-blue"
                    >
                      <span>{link.label}</span>
                      <span className="ml-2 font-extrabold group-hover:translate-x-1 transition-transform inline-block">&rarr;</span>
                    </Link>
                  ) : (
                    <button
                      key={link.label}
                      onClick={() => handleScrollTo(link.href)}
                      className="group inline-flex items-center text-[#5A9AFE] transition-all duration-300 hover:text-brand-blue text-left"
                    >
                      <span>{link.label}</span>
                      <span className="ml-2 font-extrabold animate-arrow-move inline-block">&rarr;</span>
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xl font-bold text-white mb-4">Contact</h4>
              <div className="space-y-3 mb-6">
                <a href="mailto:info@theplatypus.in" className="flex items-center space-x-3 text-gray-400 hover:text-gray-300 transition-colors">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <span>info@theplatypus.in</span>
                </a>
                <a href="tel:+918451880963" className="flex items-center space-x-3 text-gray-400 hover:text-gray-300 transition-colors">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <span>+91 84518 80963</span>
                </a>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                  <span className="text-gray-400">Maharashtra 400101, India</span>
                </div>
              </div>

              <p className="text-gray-400 mb-3">Follow us:</p>
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit Platypus on ${social.label}`}
                      className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-blue transition-colors duration-300"
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Bar */}
      <div
        className="w-full h-[50px] flex items-center justify-center"
        style={{
          background: "linear-gradient(98.82deg, #7E650B -13.7%, #F5F5F4 -13.69%, #FFE135 15.19%, #FFE135 40.43%, #FFE135 71.72%)",
        }}
      >
        <p className="text-gray-900 text-sm">&copy; Third Planet Solutions Private Limited</p>
      </div>
    </>
  );
};

export default Footer;
