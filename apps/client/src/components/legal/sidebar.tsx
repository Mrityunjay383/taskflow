import Link from "next/link";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { LegalSidebarProps } from "@/components/legal/types";

export default function LegalSidebar({ title, items }: LegalSidebarProps) {
    return (
        <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-8">
                <Card className="border-[#1E293B] bg-[#0F172A]/80 backdrop-blur-xl">
                    <div className="p-5">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                            {title}
                        </h3>

                        <p className="mt-2 text-xs text-[#64748B]">Jump to any section</p>

                        <div className="my-5 h-px bg-[#1E293B]" />

                        <ScrollArea className="h-[420px] pr-2">
                            <nav className="space-y-1">
                                {items.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex rounded-lg px-3 py-2 text-sm transition-all ${
                                            item.active
                                                ? "bg-indigo-500/15 text-indigo-300"
                                                : "text-[#94A3B8] hover:bg-[#172033] hover:text-white"
                                        }`}
                                    >
                                        <span className="text-[#94A3B8] group-hover:text-white transition-colors">
                                            {item.title}
                                        </span>
                                    </Link>
                                ))}
                            </nav>
                        </ScrollArea>
                    </div>
                </Card>
            </div>
        </aside>
    );
}
