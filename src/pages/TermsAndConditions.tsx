import SeeNewAds from "../components/SeeNewAds.tsx";

export default function TermsAndConditions() {
    return (
        <div className="w-full mx-auto p-6 bg-white">
            {/* Header Button */}
            <SeeNewAds/>
            {/* Title and Date */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Terms and Conditions</h1>
                <p className="text-gray-500 text-sm">July 25, 2023</p>
            </div>

            {/* Content */}
            <div className="space-y-6 text-gray-800 leading-relaxed">
                <p className="text-sm">
                    Terms and Conditions for HotLanka Ads (
                    <a href="#" className="text-blue-600 hover:underline">https://hotlanka.ads</a>
                    )
                </p>

                {/* Section 1 */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">1. Introduction</h2>
                    <p className="text-sm mb-4">
                        By accessing "HotLanka Ads" (the "Website"), at{" "}
                        <a href="#" className="text-blue-600 hover:underline">https://hotlanka.ads</a>
                        /{" "}
                        <a href="#" className="text-blue-600 hover:underline">https://hotlanka.lol</a>, you agree to comply with these terms. If you disagree, discontinue use immediately.
                    </p>
                </div>

                {/* Section 2 */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">2. Cookies</h2>
                    <p className="text-sm mb-2">
                        Required Cookies: Essential for website functionality (e.g., login, security). These cannot be disabled.
                    </p>
                    <p className="text-sm mb-2">
                        Optional Cookies: Used for analytics, personalizations, or third-party services (e.g., embedded videos). You may opt out.
                    </p>
                    <p className="text-sm">
                        By using the Website, you consent to required cookies and third-party cookies as described in our{" "}
                        <a href="#" className="text-blue-600 hover:underline">Cookie Policy</a>.
                    </p>
                </div>

                {/* Section 3 */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">3. Intellectual Property License</h2>
                    <p className="text-sm mb-4">
                        All content (text, graphics, logos) is owned by "HotLanka Ads" or its licensors. You may access content for personal, non-commercial use only.
                    </p>
                    <p className="text-sm mb-2">You must not:</p>
                    <ul className="text-sm space-y-1 ml-4">
                        <li>• Republish, sell, or redistribute content</li>
                    </ul>
                </div>

                {/* Section 4 */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">4. User Comments</h2>
                    <p className="text-sm mb-2">
                        Users may post comments, but "HotLanka Ads" does not pre-screen them. Comments reflect the user's views, not ours.
                    </p>
                    <p className="text-sm mb-2">User Warranties:</p>
                    <p className="text-sm mb-2">You have legal rights to post comments (including licenses/consents).</p>
                    <p className="text-sm mb-2">Comments do not infringe third-party rights (e.g., copyright, privacy).</p>
                    <p className="text-sm mb-2">Comments are not defamatory, unlawful, or promotional.</p>
                    <p className="text-sm mb-4">Comments are not used for unauthorized commercial solicitation.</p>
                    <p className="text-sm">
                        By posting, you grant us a non-exclusive, royalty-free license to use, modify, and share your comments.
                    </p>
                </div>

                {/* Section 5 */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">5. Hyperlinking</h2>
                    <p className="text-sm mb-2">Pre-Approved Links:</p>
                    <p className="text-sm mb-2">
                        Government agencies, search engines, news outlets, and accredited businesses may link to our homepage without prior approval.
                    </p>
                    <p className="text-sm mb-2">Prohibited:</p>
                    <p className="text-sm mb-2">Not misleading or falsely implying endorsement.</p>
                    <p className="text-sm mb-2">Contextually appropriate to the linking site.</p>
                    <p className="text-sm mb-2">Legal Use: Requires written permission via a trademark license.</p>
                    <p className="text-sm">
                        Content Liability: We are not responsible for content on third-party sites linking to us. You indemnify us against claims arising from your use.
                    </p>
                </div>

                {/* Section 6 */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">6. Reservation of Rights</h2>
                    <p className="text-sm mb-2">We may:</p>
                    <p className="text-sm mb-2">Request removal of any/all links to the Website.</p>
                    <p className="text-sm">Amend these terms without notice. Continued linking constitutes acceptance.</p>
                </div>

                {/* Section 7 */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">7. Removal of Links</h2>
                    <p className="text-sm">
                        Report objectionable links via{" "}
                        <a href="#" className="text-blue-600 hover:underline">[Contact Information]</a>. We will review requests but are not obligated to act.
                    </p>
                </div>

                {/* Section 8 */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">8. Disclaimer</h2>
                    <p className="text-sm mb-2">
                        No information Content is provided "as-is" We do not guarantee accuracy, completeness, or availability.
                    </p>
                    <p className="text-sm mb-2">Limitation of Liabilities:</p>
                    <p className="text-sm mb-2">Excludes liability for indirect, incidental, or consequential damages.</p>
                    <p className="text-sm">Does not limit liability for death/personal injury, fraud, or illegal exclusions under Sri Lankan law.</p>
                </div>

                {/* Section 9 */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">9. Governing Law</h2>
                    <p className="text-sm">These terms are governed by the laws of Sri Lanka. Disputes will be resolved in Sri Lankan courts.</p>
                </div>

                {/* Section 10 */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">10. Revisions</h2>
                    <p className="text-sm">
                        We may update these terms. Users are responsible for reviewing them periodically.
                    </p>
                </div>
            </div>
        </div>
    );
}
