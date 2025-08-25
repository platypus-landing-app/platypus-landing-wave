
import { Facebook, Linkedin, Instagram, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold text-black mb-2">
                Platypus
              </h3>
              <p className="text-lg text-gray-700 italic">
                India's Dog Walking Experts
              </p>
            </div>
            
            <p className="text-gray-700 leading-relaxed">
              At Platypus, we deliver safe, structured, and joyful walks through our{" "}
              <span className="font-semibold">Trained & Certified Guardians</span>.{" "}
              <span className="font-semibold">With live GPS tracking, real-time updates, and strict safety protocols</span>,{" "}
              every walk is designed to give your dog the exercise, care, and love they deserve — while giving you complete peace of mind.
            </p>
          </div>

          {/* Service */}
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-bold text-black mb-4">
                Service
              </h4>
              <p className="text-gray-700 mb-2">
                Dog walking across most areas of Mumbai with verified Guardians.
              </p>
              <p className="text-blue-600 hover:text-blue-700 cursor-pointer">
                What to Expect →
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
                  <span className="text-gray-700">info@theplatypus.in</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">+91 84518 80963</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-600 mt-1" />
                  <span className="text-gray-700">Maharashtra 400101, India</span>
                </div>
              </div>
              
              <div className="mt-6">
                <p className="text-gray-700 mb-3">Follow us:</p>
                <div className="flex space-x-4">
                  <a href="#" className="w-8 h-8 bg-black rounded-sm flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <Facebook className="w-4 h-4 text-white" />
                  </a>
                  <a href="#" className="w-8 h-8 bg-black rounded-sm flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <Linkedin className="w-4 h-4 text-white" />
                  </a>
                  <a href="#" className="w-8 h-8 bg-black rounded-sm flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <Instagram className="w-4 h-4 text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              © This website is owned by Platypus Pvt. Limited
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;