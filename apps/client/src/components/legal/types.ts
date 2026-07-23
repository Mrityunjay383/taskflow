import { ReactNode } from "react";

export interface LegalLayoutProps {
    title: string;
    description: string;
    lastUpdated: string;
    children: ReactNode;
}

export interface LegalSectionProps {
    id?: string;
    title: string;
    children: ReactNode;
}

interface SidebarItem {
    title: string;
    href: string;
    active?: boolean;
}

export interface LegalSidebarProps {
    title: string;
    items: SidebarItem[];
}

interface FAQItem {
    question: string;
    answer: string;
}

export interface LegalFAQProps {
    title?: string;
    items: FAQItem[];
}
