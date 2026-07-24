import React from "react";

const AdPaymentSuccess: React.FC = () => {
    const handleContactWhatsapp = () => {
        window.open("https://wa.me/your-whatsapp-number", "_blank");
    };

    const handleBankTransfer = () => {
        console.log("Bank transfer clicked");
        // Handle bank transfer logic
    };

    const handlePaymentOption = (type: 'vip' | 'super' | 'normal') => {
        console.log(`Payment option clicked: ${type}`);
        // Handle payment logic for specific ad type
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 space-y-6">
            {/* Success Alert */}
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <p className="text-green-700 font-semibold text-center">
                    Ad Created Successfully!
                </p>
            </div>

            {/* Payment Instructions */}
            <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                    Please pay the applicable amount and send the receipt along with the ad's phone number via WhatsApp to get your ad live.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                    කරුණාකර අදාළ මුදලක් ගෙවා ලොතරන්ගි නකාර්ගය සහ රහල් නම් WhatsApp ක්රමේ යොමුනකන හා ක්ගමිර දකනන ඔ සුර පරිකන.
                </p>
            </div>

            {/* Pricing List */}
            <div className="space-y-3">
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    <span className="text-gray-700">
                        Vip Ad: <span className="font-semibold">Rs. 12,000.00</span>
                    </span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    <span className="text-gray-700">
                        Super Ad: <span className="font-semibold">Rs. 1,700.00</span>
                    </span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    <span className="text-gray-700">
                        Normal Ad: <span className="font-semibold">Rs. 800.00</span>
                    </span>
                </div>
            </div>

            {/* Contact WhatsApp Button */}
            <button
                onClick={handleContactWhatsapp}
                className="w-full bg-gray-800 text-white py-3 px-4 rounded-md font-semibold hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.687"/>
                </svg>
                <span>Contact on Whatsapp</span>
            </button>

            {/* Bank Transfer Button */}
            <button
                onClick={handleBankTransfer}
                className="w-full bg-white border-2 border-green-500 text-green-600 py-3 px-4 rounded-md font-semibold hover:bg-green-50 transition-colors flex items-center justify-center space-x-2"
            >
                <span className="material-symbols-outlined text-green-500">
                    payments
                </span>
                <span>Bank Transfer</span>
            </button>

            {/* EZ Cash Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <div className="space-y-2">
                    <p className="text-blue-800 font-semibold">Ez Cash: 0767716442</p>
                    <p className="text-blue-700 text-sm">
                        යමුන හණ මගන අරදු මරිදින අඳර නම් ගශ නරිමන කරන්න.
                    </p>
                </div>
            </div>

            {/* Agent Payment Section */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 text-center">
                    Pay through an Agent / Get Agent support
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <button
                        onClick={() => handlePaymentOption('vip')}
                        className="bg-red-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-red-700 transition-colors"
                    >
                        Vip Ads | Pay Now
                    </button>
                    <button
                        onClick={() => handlePaymentOption('super')}
                        className="bg-yellow-500 text-white py-3 px-4 rounded-md font-semibold hover:bg-yellow-600 transition-colors"
                    >
                        Super Ads | Pay Now
                    </button>
                    <button
                        onClick={() => handlePaymentOption('normal')}
                        className="bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 transition-colors"
                    >
                        Normal Ads | Pay Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdPaymentSuccess;