import LegalLayout from "@/components/partials/legal/layout";
import LegalSidebar from "@/components/partials/legal/sidebar";
import LegalSection from "@/components/partials/legal/section";
import LegalFAQ from "@/components/partials/legal/faq";

import { LegalList, LegalParagraph, LegalStrong } from "@/components/partials/legal/typography";

const sections = [
    {
        title: "Overview",
        href: "#overview",
    },
    {
        title: "Information We Collect",
        href: "#information",
    },
    {
        title: "How We Use Information",
        href: "#usage",
    },
    {
        title: "Cookies",
        href: "#cookies",
    },
    {
        title: "Data Security",
        href: "#security",
    },
    {
        title: "Data Retention",
        href: "#retention",
    },
    {
        title: "Third Parties",
        href: "#third-party",
    },
    {
        title: "Your Rights",
        href: "#rights",
    },
    {
        title: "Contact",
        href: "#contact",
    },
];

const faq = [
    {
        question: "Do you sell my personal information?",
        answer: "No. TaskFlow never sells your personal information to advertisers or third parties.",
    },
    {
        question: "Can I delete my account?",
        answer: "Yes. You can request permanent deletion of your account and associated data.",
    },
    {
        question: "How is my information protected?",
        answer: "We use encrypted connections, secure authentication, and industry-standard infrastructure to safeguard your data.",
    },
];

export default function PrivacyPage() {
    return (
        <LegalLayout
            title="Privacy Policy"
            description="Your privacy matters to us. This policy explains what information we collect, how we use it, and the choices you have regarding your data."
            lastUpdated="July 13, 2026"
        >
            <LegalSidebar title="Privacy Policy" items={sections} />

            <div className="flex-1 space-y-8">
                <LegalSection id="overview" title="Overview">
                    <LegalParagraph>
                        Welcome to <LegalStrong>TaskFlow</LegalStrong>. We are committed to
                        protecting your personal information and being transparent about how we
                        collect, use, and secure it.
                    </LegalParagraph>

                    <LegalParagraph>
                        By using TaskFlow you agree to the practices described in this Privacy
                        Policy.
                    </LegalParagraph>
                </LegalSection>

                <LegalSection id="information" title="Information We Collect">
                    <LegalParagraph>
                        We collect information that you provide directly while using our platform.
                    </LegalParagraph>

                    <LegalList>
                        <li>Name and username</li>
                        <li>Email address</li>
                        <li>Encrypted password</li>
                        <li>Workspace information</li>
                        <li>Tasks and projects you create</li>
                        <li>Device and browser information</li>
                    </LegalList>
                </LegalSection>

                <LegalSection id="usage" title="How We Use Information">
                    <LegalParagraph>
                        Your information helps us provide and improve TaskFlow.
                    </LegalParagraph>

                    <LegalList>
                        <li>Create and manage your account</li>
                        <li>Authenticate users securely</li>
                        <li>Sync tasks across devices</li>
                        <li>Improve product performance</li>
                        <li>Provide customer support</li>
                        <li>Prevent fraud and abuse</li>
                    </LegalList>
                </LegalSection>

                <LegalSection id="cookies" title="Cookies">
                    <LegalParagraph>
                        TaskFlow uses secure cookies for authentication, maintaining sessions, and
                        remembering user preferences.
                    </LegalParagraph>

                    <LegalParagraph>
                        We do not use cookies to sell your browsing behavior to advertisers.
                    </LegalParagraph>
                </LegalSection>

                <LegalSection id="security" title="Data Security">
                    <LegalParagraph>
                        Protecting your information is one of our highest priorities.
                    </LegalParagraph>

                    <LegalList>
                        <li>HTTPS encryption</li>
                        <li>Secure password hashing</li>
                        <li>Secure authentication tokens</li>
                        <li>Role-based authorization</li>
                        <li>Infrastructure monitoring</li>
                    </LegalList>
                </LegalSection>

                <LegalSection id="retention" title="Data Retention">
                    <LegalParagraph>
                        We retain information only as long as necessary to provide our services,
                        comply with legal obligations, and resolve disputes.
                    </LegalParagraph>
                </LegalSection>

                <LegalSection id="third-party" title="Third-party Services">
                    <LegalParagraph>
                        TaskFlow relies on trusted third-party providers for cloud infrastructure,
                        analytics, authentication, and other operational services.
                    </LegalParagraph>

                    <LegalParagraph>
                        These providers only receive the minimum information necessary to perform
                        their services.
                    </LegalParagraph>
                </LegalSection>

                <LegalSection id="rights" title="Your Rights">
                    <LegalParagraph>
                        Depending on your location, you may have the right to:
                    </LegalParagraph>

                    <LegalList>
                        <li>Access your data</li>
                        <li>Correct inaccurate information</li>
                        <li>Delete your account</li>
                        <li>Export your information</li>
                        <li>Withdraw consent where applicable</li>
                    </LegalList>
                </LegalSection>

                <LegalSection id="contact" title="Contact Us">
                    <LegalParagraph>
                        Questions about this Privacy Policy can be sent to our support team.
                        We&#39;ll do our best to respond promptly.
                    </LegalParagraph>
                </LegalSection>

                <LegalFAQ items={faq} />
            </div>
        </LegalLayout>
    );
}
