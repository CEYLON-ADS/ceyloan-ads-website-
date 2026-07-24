import SeeNewAds from "../components/SeeNewAds.tsx";


const RefundPolicy = () => {
    return (
        <div className="w-full mx-auto p-6 bg-white">
            {/* Header */}
            <SeeNewAds/>

            {/* Refund Policy Title and Date */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Refund Policy</h2>
                <p className="text-gray-500 text-sm">September 6, 2024</p>
            </div>

            {/* Main Heading */}
            <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Refund Policy</h3>
                <h4 className="text-lg font-semibold text-gray-700">100% Cashback Guarantee</h4>
            </div>

            {/* Introduction */}
            <div className="mb-6">
                <p className="text-gray-600">
                    We offer a <span className="font-semibold text-gray-700">100% Cashback Guarantee</span> on selected ads, with the following terms and conditions.
                </p>
            </div>

            {/* Service Responsibility */}
            <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Service Responsibility</h4>
                <p className="text-gray-600">
                    We are responsible only for the delivery of the <span className="font-semibold text-gray-700">relevant service</span> advertised. However, we are <span className="font-semibold text-gray-700">not responsible</span> for the photos associated with the ad. Some photos may be real, while others could be filtered or misleading.
                </p>
            </div>

            {/* Photo Disclaimer */}
            <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Photo Disclaimer</h4>
                <ul className="space-y-2 text-gray-600 ml-4">
                    <li className="flex items-start">
                        <span className="text-gray-400 mr-2 mt-1">•</span>
                        <span><span className="font-semibold text-gray-700">Photos</span> included in the ads are not covered under our cashback guarantee as their authenticity cannot always be verified.</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-gray-400 mr-2 mt-1">•</span>
                        <span>Some images may represent the actual service provider or product, while others may be generic or stock photos.</span>
                    </li>
                </ul>
            </div>

            {/* Cashback Eligibility */}
            <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Cashback Eligibility</h4>
                <p className="text-gray-600">
                    You are eligible for a <span className="font-semibold text-gray-700">100% refund</span> only if the <span className="font-semibold text-gray-700">service</span> advertised is not received after payment. The photos used in the ad, whether real or fake, do not affect your eligibility for a refund.
                </p>
            </div>

            {/* Required Documentation for Refund */}
            <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Required Documentation for Refund</h4>
                <p className="text-gray-600 mb-3">To claim your refund, please provide the following:</p>
                <ul className="space-y-2 text-gray-600 ml-4">
                    <li className="flex items-start">
                        <span className="text-gray-400 mr-2 mt-1">•</span>
                        <span><span className="font-semibold text-gray-700">A link or screenshot:</span> Clearly showing the ad in question.</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-gray-400 mr-2 mt-1">•</span>
                        <span><span className="font-semibold text-gray-700">Cash transfer slip:</span> Proof of payment (e.g., transfer receipt or bank slip).</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-gray-400 mr-2 mt-1">•</span>
                        <span><span className="font-semibold text-gray-700">Chat history:</span> Communication logs between you and the service provider discussing the service and payment.</span>
                    </li>
                </ul>
            </div>

            {/* Refund Timeframe */}
            <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Refund Timeframe</h4>
                <p className="text-gray-600">
                    Refunds will be processed within <span className="font-semibold text-gray-700">7 business days</span> after receiving the necessary documentation and confirming the service was not delivered.
                </p>
            </div>

            {/* Limitations */}
            <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Limitations</h4>
                <ul className="space-y-2 text-gray-600 ml-4">
                    <li className="flex items-start">
                        <span className="text-gray-400 mr-2 mt-1">•</span>
                        <span>Refunds apply <span className="font-semibold text-gray-700">only</span> to services not rendered, not to disputes over the authenticity of ad photos.</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-gray-400 mr-2 mt-1">•</span>
                        <span>Refund claims made beyond <span className="font-semibold text-gray-700">48 hours</span> after the payment will not be considered.</span>
                    </li>
                </ul>
            </div>

            {/* Contact Us */}
            <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Contact Us</h4>
                <p className="text-gray-600">
                    If you have any questions or need assistance with your refund request, please reach out to our support team.
                </p>
            </div>

            {/* Footer spacing */}
            <div className="mt-12"></div>
        </div>
    );
};

export default RefundPolicy;
