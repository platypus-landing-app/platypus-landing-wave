import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import IosWaitlistForm from "./IosWaitlistForm";

export const metadata: Metadata = {
    title: "iPhone app coming back soon | Platypus",
    description:
        "We're getting Platypus back on the App Store. Drop your email and we'll send the link the moment iOS is relisted.",
    robots: { index: false, follow: false },
};

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=in.theplatypus.parent";
const PLAY_BADGE_URL =
    "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png";

export default function IosAccessPage() {
    return (
        <main className="min-h-screen bg-[#FFFCF0]">
            {/* Header */}
            <header className="px-6 pt-7 pb-0">
                <div className="mx-auto max-w-2xl">
                    <Link href="/" aria-label="Platypus home">
                        <Image
                            src="/logo.png"
                            alt="Platypus"
                            width={140}
                            height={44}
                            priority
                            className="h-11 w-auto"
                        />
                    </Link>
                </div>
            </header>

            {/* Yellow accent bar */}
            <div className="mt-6 h-1 w-full bg-[#FFE135]" aria-hidden="true" />

            {/* Hero */}
            <section className="px-6 pt-10 pb-2">
                <div className="mx-auto max-w-2xl">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                        iPhone app
                    </p>
                    <h1 className="mt-2 text-3xl md:text-4xl font-bold text-[#1A1A2E] leading-tight">
                        We&apos;re getting Platypus back on the App Store.
                    </h1>
                    <p className="mt-3 text-base md:text-lg text-[#374151] leading-relaxed">
                        Drop your email. The moment iOS is relisted, we&apos;ll send the App Store link
                        straight to your inbox.
                    </p>
                </div>
            </section>

            {/* Form */}
            <section className="px-6 py-8">
                <div className="mx-auto max-w-2xl">
                    <IosWaitlistForm />
                </div>
            </section>

            {/* Reassurance: Android cross-sell */}
            <section className="px-6 pb-10">
                <div className="mx-auto max-w-2xl">
                    <div className="rounded-lg border border-[#E9E5D0] bg-white p-6">
                        <p className="text-sm font-semibold text-[#1A1A2E]">While you wait</p>
                        <p className="mt-1 text-sm text-[#374151] leading-relaxed">
                            Our Android app is live. Track walks in real time, see your Guardian&apos;s
                            profile, and rate every walk.
                        </p>
                        <a
                            href={PLAY_STORE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-block"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={PLAY_BADGE_URL}
                                alt="Get it on Google Play"
                                className="h-[60px] w-auto"
                            />
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer line */}
            <footer className="px-6 pb-12">
                <div className="mx-auto max-w-2xl">
                    <p className="text-sm text-[#6B7280]">
                        Questions? Email{" "}
                        <a href="mailto:support@theplatypus.in" className="text-[#247AFD] hover:underline">
                            support@theplatypus.in
                        </a>
                        .
                    </p>
                </div>
            </footer>
        </main>
    );
}
