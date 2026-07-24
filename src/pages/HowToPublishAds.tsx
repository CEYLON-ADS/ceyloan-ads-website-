export default function HowToPublishAds() {
    const steps = [
        {
            sinhala: "ඔබගේ දුරකථන අංක භාවිතා කර ගිණුමක් සාදුරකරන.",
            english: "Create an account with your phone number."
        },
        {
            sinhala: "ගිණුමට ඇතුළු වූ පසු දකුණු පස උඩ ඇති Post Ad කෙටිම තරගන.",
            english: "After logging in, click 'Post Ad' in the top right of the screen."
        },
        {
            sinhala: "දැන්වීම සදහා සියලු විස්තරයන් ගලුලන කර, Submit කෙටිම තරගන.",
            english: "Fill in all the details for your advertisement, and click Submit."
        },
        {
            sinhala: "තෝරාගත් දැන්වීම වර්ගය අනුව, ගණන ක්‍රමයක් භාවිතා කර අදාල මුදල් ගෙවන්න.",
            english: "Use any method to pay the amount based on the selected ad type."
        },
        {
            sinhala: "මුදල් ගෙවූ බවට අදාල receipts/ invoices හමු හිමකම් ගන්නම්, whatsapp හරහා අප මෙතන ඇරියන.",
            english: "Send any receipts/ invoices via WhatsApp, which can confirm the payment."
        },
        {
            sinhala: "තනුදුරු තරයන්ගීරතන් සුදු ගන්ගත් දකුණට, අප මෙබම් සබවීස ඉදල දිසටුප අල.",
            english: "After we verify everything, your advertisement will be displayed on our website."
        }
    ];

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    How to Publish Ads
                </h1>
                <p className="text-gray-600 text-lg">
                    Learn how to publish ads on Lanka Ads.
                </p>
                <hr className="mt-4 border-b border-gray-200" />
            </div>


            {/* Steps List */}
            <div className="space-y-6">
                {steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                        {/* Bullet Point */}
                        <div className="flex-shrink-0 mt-1">
                            <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            {/* Sinhala Text */}
                            <p className="text-gray-800 mb-2 leading-relaxed">
                                {step.sinhala}
                            </p>

                            {/* English Text */}
                            <p className="text-gray-600 leading-relaxed">
                                {step.english}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Note */}
            <div className="mt-12 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 text-center">
                    For any additional questions or support, please contact our admin team.
                </p>
            </div>
        </div>
    );
}