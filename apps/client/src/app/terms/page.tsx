import LegalLayout from "@/components/legal/layout";
import LegalSidebar from "@/components/legal/sidebar";
import LegalSection from "@/components/legal/section";
import LegalFAQ from "@/components/legal/faq";

import { LegalList, LegalParagraph, LegalStrong } from "@/components/legal/typography";

const sections = [
    {
        title: "Acceptance",
        href: "#acceptance",
    },
    {
        title: "Accounts",
        href: "#accounts",
    },
    {
        title: "Acceptable Use",
        href: "#acceptable-use",
    },
    {
        title: "Content Ownership",
        href: "#content",
    },
    {
        title: "Subscriptions",
        href: "#subscriptions",
    },
    {
        title: "Termination",
        href: "#termination",
    },
    {
        title: "Disclaimer",
        href: "#disclaimer",
    },
    {
        title: "Limitation of Liability",
        href: "#liability",
    },
    {
        title: "Changes",
        href: "#changes",
    },
];

const faq = [
    {
        question: "Can my account be suspended?",
        answer: "Yes. Accounts violating these Terms or abusing the platform may be suspended or permanently terminated.",
    },
    {
        question: "Who owns the content I create?",
        answer: "You retain ownership of your content. By using TaskFlow you grant us the rights necessary to provide and improve the service.",
    },
    {
        question: "Can these Terms change?",
        answer: "Yes. We may update these Terms periodically. Continued use of TaskFlow after updates means you accept the revised Terms.",
    },
];

export default function TermsPage() {
    return (
        <LegalLayout
            title="Terms of Service"
            description="These Terms govern your access to and use of TaskFlow. Please read them carefully before using our services."
            lastUpdated="July 13, 2026"
        >
            <LegalSidebar title="Terms" items={sections} />

            <div className="flex-1 space-y-8">
                <LegalSection id="acceptance" title="Acceptance of Terms">
                    <LegalParagraph>
                        By accessing or using <LegalStrong>TaskFlow</LegalStrong>, you agree to be
                        bound by these Terms of Service and all applicable laws and regulations.
                    </LegalParagraph>

                    <LegalParagraph>
                        If you do not agree with these Terms, you should not use the platform.
                    </LegalParagraph>
                </LegalSection>

                <LegalSection id="accounts" title="Accounts">
                    <LegalParagraph>
                        You are responsible for maintaining the confidentiality of your account
                        credentials and all activities performed through your account.
                    </LegalParagraph>

                    <LegalList>
                        <li>Provide accurate information.</li>
                        <li>Keep your password secure.</li>
                        <li>Notify us of unauthorized access.</li>
                        <li>Maintain updated account information.</li>
                    </LegalList>
                </LegalSection>

                <LegalSection id="acceptable-use" title="Acceptable Use">
                    <LegalParagraph>
                        You agree not to misuse TaskFlow or attempt to interfere with its operation.
                    </LegalParagraph>

                    <LegalList>
                        <li>No unlawful activity.</li>
                        <li>No reverse engineering.</li>
                        <li>No unauthorized access attempts.</li>
                        <li>No malware or harmful code.</li>
                        <li>No abuse of APIs or infrastructure.</li>
                    </LegalList>
                </LegalSection>

                <LegalSection id="content" title="Content Ownership">
                    <LegalParagraph>
                        You retain ownership of the tasks, files, and content you create within
                        TaskFlow.
                    </LegalParagraph>

                    <LegalParagraph>
                        You grant TaskFlow a limited license to process and store this content
                        solely to provide the service.
                    </LegalParagraph>
                </LegalSection>

                <LegalSection id="subscriptions" title="Subscriptions & Billing">
                    <LegalParagraph>
                        Some features may require a paid subscription. Billing terms, renewals, and
                        cancellation policies will be provided before purchase.
                    </LegalParagraph>
                </LegalSection>

                <LegalSection id="termination" title="Termination">
                    <LegalParagraph>
                        We may suspend or terminate access if these Terms are violated or if
                        continued use threatens the security or integrity of the platform.
                    </LegalParagraph>
                </LegalSection>

                <LegalSection id="disclaimer" title="Disclaimer">
                    <LegalParagraph>
                        TaskFlow is provided on an &#34;as is&#34; and &#34;as available&#34; basis
                        without warranties of any kind, except where prohibited by law.
                    </LegalParagraph>
                </LegalSection>

                <LegalSection id="liability" title="Limitation of Liability">
                    <LegalParagraph>
                        To the maximum extent permitted by law, TaskFlow and its affiliates shall
                        not be liable for indirect, incidental, or consequential damages arising
                        from the use of the service.
                    </LegalParagraph>
                </LegalSection>

                <LegalSection id="changes" title="Changes to These Terms">
                    <LegalParagraph>
                        We may update these Terms from time to time. Material changes will be
                        communicated through the platform or by email where appropriate.
                    </LegalParagraph>
                </LegalSection>

                <LegalFAQ title="Terms FAQ" items={faq} />
            </div>
        </LegalLayout>
    );
}
