import SeeNewAds from "../components/SeeNewAds.tsx";

export default function PrivacyPolicy() {
    return (
        <div className="w-full mx-auto p-6 bg-white">
            {/* Header Button */}
            <SeeNewAds/>

            {/* Title and Date */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
                <p className="text-gray-500 text-sm">July 25, 2023</p>
            </div>

            {/* Content */}
            <div className="space-y-6 text-gray-800 leading-relaxed">

                {/* Introduction */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Ceylon Ads - ලංකා ඇඩ්ස්</h2>
                    <p className="text-sm mb-4">
                        The Ceylon Ads - ලංකා ඇඩ්ස් website is owned by Ceylon Ads, which acts as the data controller for your personal data. This Privacy Policy outlines how we process the information collected by Ceylon Ads - ලංකා ඇඩ්ස් and explains why we collect certain personal data. We are committed to protecting your personal information and ensuring confidentiality and security.
                    </p>
                </div>

                {/* Personal Information We Collect */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Personal Information We Collect</h2>
                    <p className="text-sm mb-4">
                        When you visit our site, Ceylon Ads, we collect or All Lanka Ad, SL Ads, Nay Lanka Personal Ad Personal Ads, Spa Ads, VIP Ads, or Velo Ads, we automatically collect certain information about your device, such as your web browser, IP address, and time zone. As you browse the Ceylon Ads classified pages or provision your site, the referring activities and how you interact with advertisements and other information. We may also collect personal data during registration, such as your name, address, and payment details.
                    </p>
                </div>

                {/* Why Do We Process Your Data */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Why Do We Process Your Data?</h2>
                    <p className="text-sm mb-4">
                        Our priority is the security of customer data. We process minimal user data to maintain the website. Automatically collected information is used to deliver better attention and user experience. This data is not used to identify, contact, or target you specifically.
                    </p>
                    <p className="text-sm mb-4">
                        You can browse Ceylon Ads - ලංකා ඇඩ්ස් without providing identifiable information. However, to use certain features, such as subscribing to newsletters or filling out forms, you may need to provide personal data (e.g., name, email, location). If you're uncertain about what data is required, please contact us at contact@ceylonads.com.
                    </p>
                </div>

                {/* Your Rights */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Your Rights</h2>
                    <p className="text-sm mb-3">If you're a Sri Lankan resident, you have the following rights regarding your personal data:</p>
                    <ol className="text-sm space-y-2 ml-4">
                        <li>1. <strong>Right to be Informed</strong></li>
                        <li>2. <strong>Right of Access</strong></li>
                        <li>3. <strong>Right to Rectification</strong></li>
                        <li>4. <strong>Right to Erasure</strong></li>
                        <li>5. <strong>Right to Restrict Processing</strong></li>
                        <li>6. <strong>Right to Data Portability</strong></li>
                        <li>7. <strong>Right to Object</strong></li>
                        <li>8. <strong>Rights Concerning Automated Decision-Making and Profiling</strong></li>
                    </ol>
                    <p className="text-sm mt-3">
                        To exercise any of these rights, contact us within a month. Any shared information may also be transferred outside of Europe, including to Canada and the U.S.
                    </p>
                </div>

                {/* Links to Other Websites */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Links to Other Websites</h2>
                    <p className="text-sm">
                        Our site may include links to external websites not owned or controlled by Ceylon Ads. We are not responsible for the privacy practices of these websites, and we recommend reviewing their privacy policies when you leave our site.
                    </p>
                </div>

                {/* Information Security */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Information Security</h2>
                    <p className="text-sm">
                        We take measures to secure your information on controlled servers, protected from unauthorized access, use, or disclosure. However, no data transmission over the Internet or wireless networks is fully secure.
                    </p>
                </div>

                {/* Legal Disclosure */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Legal Disclosure</h2>
                    <p className="text-sm">
                        We may disclose information when required by law or when we believe in good faith that it is necessary to protect our rights, property, or safety, investigate fraud, or comply with a legal process.
                    </p>
                </div>

                {/* Contact Information */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h2>
                    <p className="text-sm mb-2">
                        For more information about this Privacy Policy or concerns regarding your personal data, please contact us at:
                    </p>
                    <p className="text-sm">
                        <a href="mailto:hello24@gmail.com" className="text-blue-600 hover:underline">
                            hello24@gmail.com
                        </a>
                    </p>
                </div>

            </div>
        </div>
    );
}
