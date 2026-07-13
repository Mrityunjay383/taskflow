import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LegalSectionProps } from "@/components/legal/types";

export default function LegalSection({ id, title, children }: LegalSectionProps) {
    return (
        <Card
            id={id}
            className="scroll-mt-28 border-[#1E293B] bg-[#0F172A]/70 backdrop-blur-xl shadow-xl shadow-black/20"
        >
            <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-semibold tracking-tight text-white">
                    {title}
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6 text-[15px] leading-8 text-[#94A3B8]">
                {children}
            </CardContent>
        </Card>
    );
}
