import type { Metadata } from "next";
import { ReactNode } from "react";
import Providers from "@/app/providers";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
    title: "Taskflow",
    description: "",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className={cn("font-sans scroll-smooth dark", geist.variable)}>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
