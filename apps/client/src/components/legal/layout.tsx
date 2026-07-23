"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LegalLayoutProps } from "@/components/legal/types";
import Wordmark from "@/components/common/Wordmark";

export default function LegalLayout({
    title,
    description,
    lastUpdated,
    children,
}: LegalLayoutProps) {
    const pathname = usePathname();

    return (
        <main className="relative min-h-screen bg-[#080B14]">
            {/* Ambient Background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-48 -top-48 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-3xl" />

                <div className="absolute -bottom-56 -right-56 h-[550px] w-[550px] rounded-full bg-indigo-500/10 blur-3xl" />
            </div>

            <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-12">
                {/* Navbar */}
                <header className="mb-14 flex items-center justify-between">
                    <Link
                        href="/"
                        className="group flex items-center gap-3 transition-opacity hover:opacity-90"
                    >
                        <Wordmark />
                    </Link>

                    <Button
                        asChild
                        variant="outline"
                        className="border-[#293548] bg-[#101827] text-white hover:bg-[#172033]"
                    >
                        <Link href="/">Back to App</Link>
                    </Button>
                </header>

                {/* Hero */}
                <section className="mb-12">
                    <Badge className="mb-5 border border-indigo-500/20 bg-indigo-500/15 px-3 py-1 text-indigo-300 hover:bg-indigo-500/15">
                        Last Updated • {lastUpdated}
                    </Badge>

                    <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-white">
                        {title}
                    </h1>

                    <p className="mt-5 max-w-2xl text-lg leading-8 text-[#94A3B8]">{description}</p>
                </section>

                <Separator className="mb-10 bg-[#1E293B]" />

                {/* Content */}
                <div className="flex gap-10">{children}</div>

                <Separator className="my-12 bg-[#1E293B]" />

                {/* Footer */}
                <footer className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h3 className="font-semibold text-white">
                            Questions about these policies?
                        </h3>

                        <p className="mt-1 text-sm text-[#94A3B8]">
                            Contact us anytime. We&#39;ll be happy to help.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <Button
                            asChild
                            variant={pathname === "/privacy" ? "default" : "outline"}
                            className={
                                pathname === "/privacy"
                                    ? "bg-indigo-500 hover:bg-indigo-600"
                                    : "border-[#293548] bg-[#101827] text-white hover:text-gray-200 hover:bg-[#172033]"
                            }
                        >
                            <Link href="/privacy">Privacy Policy</Link>
                        </Button>

                        <Button
                            asChild
                            variant={pathname === "/terms" ? "default" : "outline"}
                            className={
                                pathname === "/terms"
                                    ? "bg-indigo-500 hover:bg-indigo-600"
                                    : "border-[#293548] bg-[#101827] text-white hover:text-gray-200 hover:bg-[#172033]"
                            }
                        >
                            <Link href="/terms">Terms of Service</Link>
                        </Button>
                    </div>
                </footer>
            </div>
        </main>
    );
}
