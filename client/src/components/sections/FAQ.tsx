'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StaggerContainer, { staggerItem } from '@/components/ui/StaggerContainer';
import { motion, AnimatePresence } from 'framer-motion';

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
            answer: "We provide professional dog walking services across 16 Mumbai areas including Mira Road, Borivali, Kandivali, Malad, Goregaon, Andheri, Juhu, Bandra, Khar, Dadar, Wadala, Prabhadevi, Lower Parel, Grant Road, Kurla, and Chembur. Our certified Guardians are strategically located to serve these areas with consistent, reliable service."
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
        <section id="faq" className="py-16 lg:py-24 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <ScrollReveal variant="fadeUp">
                    <div className="text-center mb-16">
                        <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4">
                            Frequently Asked <span className="text-[#FF5B00]">Questions</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Get answers to common questions about our professional dog walking services in Mumbai
                        </p>
                    </div>
                </ScrollReveal>

                {/* FAQ Items */}
                <StaggerContainer staggerDelay={0.08} className="space-y-4" >
                    <div itemScope itemType="https://schema.org/FAQPage">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            variants={staggerItem}
                            className={`bg-[#F8FAFF] rounded-lg overflow-hidden border transition-colors duration-200 mb-4
                                ${openItems.includes(index)
                                    ? 'border-brand-blue/30 border-l-4 border-l-brand-blue'
                                    : 'border-brand-blue/10 hover:border-brand-blue/30'
                                }`}
                            itemScope
                            itemProp="mainEntity"
                            itemType="https://schema.org/Question"
                        >
                            <button
                                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[#F0F4FF] transition-colors duration-200"
                                onClick={() => toggleItem(index)}
                                aria-expanded={openItems.includes(index)}
                            >
                                <h3
                                    className="font-semibold text-lg text-gray-900 pr-4"
                                    itemProp="name"
                                >
                                    {faq.question}
                                </h3>
                                <motion.div
                                    animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ChevronDown className={`w-5 h-5 flex-shrink-0 ${openItems.includes(index) ? 'text-brand-blue' : 'text-gray-500'}`} />
                                </motion.div>
                            </button>

                            <AnimatePresence initial={false}>
                                {openItems.includes(index) && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                        itemScope
                                        itemProp="acceptedAnswer"
                                        itemType="https://schema.org/Answer"
                                    >
                                        <p
                                            className="px-6 pb-4 text-gray-700 leading-relaxed"
                                            itemProp="text"
                                        >
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Hidden structured data for SEO when closed */}
                            {!openItems.includes(index) && (
                                <div
                                    className="hidden"
                                    itemScope
                                    itemProp="acceptedAnswer"
                                    itemType="https://schema.org/Answer"
                                >
                                    <span itemProp="text">{faq.answer}</span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                    </div>
                </StaggerContainer>

                {/* CTA at bottom */}
                <div className="mt-12 text-center">
                    <p className="text-gray-600 mb-4">
                        Still have questions? We&apos;re here to help!
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
