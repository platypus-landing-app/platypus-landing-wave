'use client';

// src/components/layout/Navigation.tsx

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/contexts/BookingContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { openTrialBooking } = useBooking();
    const [activeSection, setActiveSection] = useState("home");
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const navItems = [
        { name: "GUARDIANS", href: "#home", path: "/" },
        { name: "WHY PLATYPUS", href: "#features", path: "/" },
        { name: "SERVICES", href: "/services", path: "/services", isRoute: true },
        { name: "AREAS WE SERVE", href: "#areas", path: "/" },
        { name: "PROCESS", href: "#process", path: "/" },
        { name: "BLOG", href: "/blog", path: "/blog", isRoute: true },
        { name: "JOIN US", href: "/join", path: "/join", isRoute: true },
    ];

    // Smooth scroll function
    const handleScrollTo = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
        setIsOpen(false);
    };

    // Handle navigation clicks
    const handleNavClick = (item: typeof navItems[0]) => {
        if (item.isRoute) {
            setIsOpen(false);
            return;
        }

        // Try to scroll to the section on current page first
        const element = document.querySelector(item.href);

        if (element) {
            // Section exists on current page, just scroll to it
            handleScrollTo(item.href);
        } else {
            // Section doesn't exist, navigate to homepage with hash
            router.push(`/${item.href}`);
            // Wait for navigation to complete, then scroll
            setTimeout(() => {
                const homeElement = document.querySelector(item.href);
                if (homeElement) {
                    homeElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }
            }, 100);
        }
        setIsOpen(false);
    };

    // Active section detection + scroll state
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);

            const sections = ["home", "features", "areas", "process", "testimonials"];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (
                        scrollPosition >= offsetTop &&
                        scrollPosition < offsetTop + offsetHeight
                    ) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50
  backdrop-blur-md border-b border-border/50
  transition-all duration-300
  ${scrolled
    ? 'bg-background/95 supports-[backdrop-filter]:bg-background/85 shadow-lg'
    : 'bg-background/80 supports-[backdrop-filter]:bg-background/60 shadow-md'
  }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-[70px] md:h-[80px] py-2">
                    {/* Logo */}
                    <div className="flex items-center -ml-5">
                        <Link
                            href="/"
                            className="cursor-pointer"
                            style={{
                                background: "transparent",
                                boxShadow: "none",
                                borderRadius: 0,
                            }}
                        >
                            <img
                                src="/logo.png"
                                alt="Platypus Logo"
                                className="block w-full max-w-[160px] h-auto"
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-0 ml-[60px]">
                        {navItems.map((item) => {
                            if (item.isRoute) {
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`px-4 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap relative hover:text-[#247AFD] ${
                                            pathname.startsWith(item.path)
                                                ? "text-[#247AFD]"
                                                : "text-gray-700"
                                        }`}
                                    >
                                        {item.name}
                                        {pathname.startsWith(item.path) && (
                                            <div className="absolute bottom-0 left-0 right-0 mx-auto w-[80%] h-0.5 bg-[#247AFD]"></div>
                                        )}
                                    </Link>
                                );
                            }

                            return (
                                <button
                                    key={item.name}
                                    onClick={() => handleNavClick(item)}
                                    className={`px-4 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap relative hover:text-[#247AFD] ${
                                        activeSection === item.href.substring(1) && pathname === "/"
                                            ? "text-[#247AFD]"
                                            : "text-gray-700"
                                    }`}
                                >
                                    {item.name}
                                    {activeSection === item.href.substring(1) && pathname === "/" && (
                                        <div className="absolute bottom-0 left-0 right-0 mx-auto w-[80%] h-0.5 bg-[#247AFD]"></div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Right side: Trial Button (desktop) + Hamburger (mobile) */}
                    <div className="flex items-center space-x-4">
                        {/* Trial Button - Desktop only */}
                        <div className="hidden md:block">
                            <Button
                                onClick={openTrialBooking}
                                className="text-white px-6 py-3 rounded font-medium
        bg-[#247AFD] hover:bg-[#1A5BC4] hover:shadow-xl transition-all duration-300 hover:scale-105 animate-subtle-pulse"
                            >
                                BOOK TRIAL NOW
                            </Button>
                        </div>

                        {/* Hamburger - Mobile only */}
                        <div className="lg:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 text-gray-700 hover:text-[#247AFD] focus:outline-none"
                                aria-label={isOpen ? "Close menu" : "Open menu"}
                            >
                                {isOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="lg:hidden absolute top-full left-0 w-full backdrop-blur-xl bg-white/95 border-t border-gray-200/50 shadow-brand-lg z-40"
                    >
                        <div className="px-4 pt-4 pb-6 space-y-1">
                            {navItems.map((item, index) => {
                                const isActive = item.isRoute
                                    ? pathname.startsWith(item.path)
                                    : activeSection === item.href.substring(1) && pathname === "/";

                                const className = `w-full text-left font-medium block px-4 py-3 rounded-lg transition-all duration-200 ${
                                    isActive
                                        ? 'text-[#247AFD] bg-blue-50'
                                        : 'text-gray-700 hover:text-[#247AFD] hover:bg-gray-50'
                                }`;

                                if (item.isRoute) {
                                    return (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.03 }}
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                className={className}
                                            >
                                                {item.name}
                                            </Link>
                                        </motion.div>
                                    );
                                }

                                return (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.03 }}
                                    >
                                        <button
                                            onClick={() => handleNavClick(item)}
                                            className={className}
                                        >
                                            {item.name}
                                        </button>
                                    </motion.div>
                                );
                            })}
                            <motion.div
                                className="pt-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Button
                                    onClick={() => { setIsOpen(false); openTrialBooking(); }}
                                    className="w-full bg-[#247AFD] hover:bg-[#1A5BC4] text-white py-3 rounded-lg font-medium shadow-brand transition-all duration-300"
                                >
                                    BOOK TRIAL NOW
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navigation;
