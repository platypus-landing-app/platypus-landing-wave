import { Facebook, Linkedin, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import '@/App.css'

const Footer = () => {
  const handleScrollTo = (href: string) => {
    const element = document.querySelector(href) as HTMLElement;
    if (element) {
      const navbarHeight = 80; // change based on your nav height
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
      <>
        <footer
            className="bg-gray-200 py-16"
            itemScope
            itemType="https://schema.org/Organization"
        >
          {/* Hidden structured data for SEO */}
          <div style={{ display: 'none' }}>
            <span itemProp="name">Platypus - India's Dog Walking Experts</span>
            <span itemProp="description">Professional certified dog walking service with trained Guardians and live GPS tracking</span>
            <span itemProp="url">https://theplatypus.in</span>
            <span itemProp="telephone">+918451880963</span>
            <span itemProp="email">info@theplatypus.in</span>
            <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <span itemProp="addressLocality">Mumbai</span>
              <span itemProp="addressRegion">Maharashtra</span>
              <span itemProp="postalCode">400101</span>
              <span itemProp="addressCountry">India</span>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 lg:gap-[200px]">
              {/* Company Info */}
              <div className="space-y-6 flex flex-col items-start relative top-[-15px]">
                <div className="flex flex-col items-center gap-0">
                  <img
                      src="/footer.png"
                      alt="Platypus Logo - Professional Dog Walking Service Mumbai"
                      className="h-[100px]"
                      itemProp="logo"
                  />
                </div>

                <p className="font-['Funnel_Sans'] relative font-normal text-[16px] leading-[30px] text-gray-700 w-[300px] top-[-30px]">
                  At <strong>Platypus</strong>, we deliver safe, structured, and joyful walks through our{" "}
                  <span className="font-['Funnel_Sans'] font-bold text-[16px] leading-[30px]">
                  Trained & Certified Guardians
                </span>.{" "}
                  <span className="font-['Funnel_Sans'] font-bold text-[16px] leading-[30px]">
                  With live GPS tracking, real-time updates, and strict safety protocols
                </span>,{" "}
                  every walk is designed to give your dog the exercise, care, and love they deserve while giving you complete peace of mind.
                </p>
              </div>

              {/* Service */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-black mb-4">
                    Service Areas
                  </h4>
                  <p className="font-['Funnel_Sans'] font-normal text-[15.88px] leading-[24px] text-gray-700 mb-2">
                    <strong>Professional dog walking service</strong> across most areas of <strong>Mumbai</strong> with verified Guardians.
                  </p>
                  <p className="font-['Funnel_Sans'] font-normal text-[14px] leading-[22px] text-gray-600 mb-4">
                    <strong>Areas:</strong> Bandra, Andheri, Powai, Worli, Juhu, Colaba, Malad, Borivali, Thane, Navi Mumbai & more
                  </p>

                  <p
                      onClick={() => handleScrollTo("#process")}
                      className="group inline-flex items-center text-blue-500 cursor-pointer
                             transition-all duration-300 hover:text-blue-400 hover:scale-105 hover:drop-shadow-md"
                  >
                    <span className="text-[16px]">What to Expect</span>
                    <span className="ml-2 text-[16px] font-extrabold animate-arrow-move relative top-[-2px]">
                    →
                  </span>
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-black mb-4">
                    Contact
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-600" />
                      <a
                          href="mailto:info@theplatypus.in"
                          className="text-gray-700 hover:text-blue-600 transition-colors"
                          itemProp="email"
                      >
                        info@theplatypus.in
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-600" />
                      <a
                          href="tel:+918451880963"
                          className="text-gray-700 hover:text-blue-600 transition-colors"
                          itemProp="telephone"
                      >
                        +91 84518 80963
                      </a>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-gray-600 mt-1" />
                      <span className="text-gray-700">Mumbai, Maharashtra 400101, India</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-gray-700 mb-3">Follow us:</p>
                    <div className="flex space-x-4">
                      <a
                          href="https://www.facebook.com/share/17DXgXPyAf/?mibextid=wwXIfr"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                          aria-label="Follow Platypus on Facebook"
                          itemProp="sameAs"
                      >
                        <Facebook className="w-4 h-4 text-white" />
                      </a>
                      <a
                          href="https://www.linkedin.com/company/platypus-be-their-human/posts/?feedView=all"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                          aria-label="Follow Platypus on LinkedIn"
                          itemProp="sameAs"
                      >
                        <Linkedin className="w-4 h-4 text-white" />
                      </a>
                      <a
                          href="https://www.instagram.com/platypus_bth/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                          aria-label="Follow Platypus on Instagram"
                          itemProp="sameAs"
                      >
                        <Instagram className="w-4 h-4 text-white" />
                      </a>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="mt-6">
                    <h5 className="font-semibold text-gray-900 mb-2">Service Hours:</h5>
                    <p className="text-gray-700 text-sm">
                      7 days a week, 6 AM - 10 PM<br />
                      <span className="text-green-600 font-medium">Available for booking 24/7</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* SEO-rich bottom section */}
            <div className="mt-12 pt-8 border-t border-gray-300">
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">
                  <strong>Professional Dog Walking Service in Mumbai</strong> | Certified Guardians | Live GPS Tracking | Safety First
                </p>
                <p className="text-gray-500 text-xs">
                  Trusted by 500+ pet parents across Bandra, Andheri, Powai, Worli, Juhu, and other Mumbai areas
                </p>
              </div>
            </div>
          </div>
        </footer>

        {/* Bottom Bar */}
        <div
            className="w-full h-[50px] flex items-center justify-center"
            style={{
              background:
                  "linear-gradient(98.82deg, #7E650B -13.7%, #F5F5F4 -13.69%, #FFE135 15.19%, #FFE135 40.43%, #FFE135 71.72%)",
            }}
        >
          <p className="text-gray-900 text-sm font-[Funnel_Sans]">
            © Third Planet Solutions Private Limited
          </p>
        </div>
      </>
  )
};

export default Footer;