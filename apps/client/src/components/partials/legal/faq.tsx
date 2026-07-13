import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import { Card } from "@/components/ui/card";
import { LegalFAQProps } from "@/components/partials/legal/types";

export default function LegalFAQ({ title = "Frequently Asked Questions", items }: LegalFAQProps) {
    return (
        <Card className="border-[#1E293B] bg-[#0F172A]/70 backdrop-blur-xl">
            <div className="p-6">
                <h2 className="mb-6 text-2xl font-semibold tracking-tight text-white">{title}</h2>

                <Accordion type="single" collapsible className="w-full">
                    {items.map((item, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            className="border-[#1E293B]"
                        >
                            <AccordionTrigger className="text-left text-white hover:no-underline">
                                {item.question}
                            </AccordionTrigger>

                            <AccordionContent className="text-[#94A3B8] leading-7">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </Card>
    );
}
