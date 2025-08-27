import { Phone, Smartphone } from "lucide-react";

const CallToAction = () => {
  const handleScrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="bg-gradient-to-br from-white to-gray-50 py-4">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main CTA Image */}
      <div className="text-center py-2">
  <img
    src={"/3ind.png"}
    alt="Dog walker with golden retriever"
    className="mx-auto block h-[500px] object-contain"
  />
</div>

{/* Inner White Box */}
<div className="bg-white rounded-3xl px-8 py-6 border-b border-[#397CEF] shadow-[0px_8px_25px_-5px_#397CEF26] max-w-3xl mx-auto -mt-12 mb-4">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Ready to Book */}
            <div className="text-left">
              <h3 className="font-[Funnel_Sans] font-semibold text-[20px] leading-[28px] text-gray-900 mb-2">
                Ready to Book?
              </h3>
              <p className="font-['Segoe_UI_Symbol'] text-[16px] leading-[24px] text-[#686868] mb-3">
                Available 7 days a week, 8 AM - 8 PM
              </p>
              <a
                href="tel:+918451880963"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 underline"
              >
                <img src="/phone icon2.png"  className="w-5 h-5 text-blue-600" />
                <span className="font-['Segoe_UI_Symbol'] text-[16px] leading-[24px] text-[#686868]">
                  Call us: +91 84518 80963
                </span>
              </a>
            </div>

            {/* Get App Early Access */}
            <div className="text-left">
              <h3 className="font-[Funnel_Sans] font-semibold text-[20px] leading-[28px] text-gray-900 mb-2">
                Get App Early Access
              </h3>
              <p className="font-['Segoe_UI_Symbol'] text-[16px] leading-[24px] text-[#686868] mb-3">
                Be first to download in August 2025
              </p>
              <button
                onClick={() => handleScrollTo("#testimonials")}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
              >
                <img src="/phone icon.png" className="w-6 h-6 text-blue-600" />
                <span className="font-['Segoe_UI_Symbol'] text-[16px] leading-[24px] text-[#686868]underline">
                  Join our community today
                </span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
