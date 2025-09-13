import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
    const [openItems, setOpenItems] = useState<number[]>([]);

    const toggleItem = (index: number) => {
        setOpenItems(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    const faqs = [
        {
            question: "What areas in Mumbai do you serve for dog walking services?",
            answer: "We provide professional dog walking services across major Mumbai areas including Bandra, Andheri, Powai, Worli, Lower Parel, Colaba, Juhu, Versova, Malad, Borivali, Kandivali, Santacruz, Khar, Byculla, Dadar, Matunga, Kurla, Chembur, Ghatkopar, Mulund, Thane, and Navi Mumbai. Our certified Guardians are strategically located to serve these areas with consistent, reliable service."
        },
        {
            question: "How much does professional dog walking cost in Mumbai?",
            answer: "Our dog walking services are affordably priced: Trial walk at ₹199, Experience walks (2 walks) for ₹399, Monthly once-a-day plan at ₹4,680, Monthly twice-a-day plan at ₹7,800, and discounted 3-month plans starting at ₹21,600 for twice-daily service. All packages include live GPS tracking, certified Guardian service, and safety protocols."
        },
        {
            question: "Are your dog walkers certified and professionally trained?",
            answer: "Yes, all our Guardians undergo rigorous certification and training programs. They receive professional uniforms, hygiene kits, safety training, and follow strict protocols. We maintain backup walker availability to ensure your dog's walk is never cancelled. Our training covers pet behavior, safety procedures, emergency protocols, and customer service standards."
        },
        {
            question: "Do you provide live GPS tracking during dog walks?",
            answer: "Absolutely! Every dog walk includes live GPS tracking so you can monitor your pet's location, route, and activity in real-time through our app. You'll receive SOS alerts, digital updates about your dog's behavior, bathroom breaks, and overall walk experience. This transparency gives pet parents complete peace of mind."
        },
        {
            question: "What safety measures do you follow during dog walks?",
            answer: "Safety is our top priority. Our certified Guardians follow strict hygiene protocols, carry sanitization kits, use secure leashing techniques, and are trained in pet first aid. We conduct health checks before each walk, maintain vaccination verification, and have emergency contact protocols. All Guardians are background-verified and insured."
        },
        {
            question: "How do I book a dog walking service with Platypus?",
            answer: "Booking is simple! You can book through our website, WhatsApp (+91 84518 80963), or our upcoming mobile app. We recommend starting with our ₹199 trial walk to experience our service quality. Our team will match you with a local certified Guardian based on your area, preferred timing, and your dog's specific needs."
        }
    ];

    return (
        <section id="faq" className="py-16 lg:py-24 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="font-funnel font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4">
                        Frequently Asked <span className="text-[#f97e57]">Questions</span>
                    </h2>
                    <p className="font-rubik text-lg text-gray-600 max-w-2xl mx-auto">
                        Get answers to common questions about our professional dog walking services in Mumbai
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                            itemScope
                            itemProp="mainEntity"
                            itemType="https://schema.org/Question"
                        >
                            <button
                                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                                onClick={() => toggleItem(index)}
                                aria-expanded={openItems.includes(index)}
                            >
                                <h3
                                    className="font-funnel font-semibold text-lg text-gray-900 pr-4"
                                    itemProp="name"
                                >
                                    {faq.question}
                                </h3>
                                {openItems.includes(index) ? (
                                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                )}
                            </button>

                            {openItems.includes(index) && (
                                <div
                                    className="px-6 pb-4"
                                    itemScope
                                    itemProp="acceptedAnswer"
                                    itemType="https://schema.org/Answer"
                                >
                                    <p
                                        className="font-rubik text-gray-700 leading-relaxed"
                                        itemProp="text"
                                    >
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* CTA at bottom */}
                <div className="mt-12 text-center">
                    <p className="font-rubik text-gray-600 mb-4">
                        Still have questions? We're here to help!
                    </p>
                    <a
                        href="tel:+918451880963"
                        className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200"
                    >
                        Call us: +91 84518 80963
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FAQ;