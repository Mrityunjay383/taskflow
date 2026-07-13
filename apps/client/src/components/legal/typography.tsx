import { ReactNode } from "react";

export function LegalParagraph({ children }: { children: ReactNode }) {
    return <p className="leading-8 text-[#94A3B8]">{children}</p>;
}

export function LegalList({ children }: { children: ReactNode }) {
    return <ul className="list-disc space-y-3 pl-6 text-[#94A3B8]">{children}</ul>;
}

export function LegalOrderedList({ children }: { children: ReactNode }) {
    return <ol className="list-decimal space-y-3 pl-6 text-[#94A3B8]">{children}</ol>;
}

export function LegalStrong({ children }: { children: ReactNode }) {
    return <strong className="font-semibold text-white">{children}</strong>;
}
