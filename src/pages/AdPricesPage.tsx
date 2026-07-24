
import SeeNewAds from "../components/SeeNewAds.tsx";

const AdPricesPage = () => {
    const pricingData = [
        { type: "VIP Ad", price: "Rs 12,000.00" },
        { type: "Super Ad", price: "Rs. 1,700.00" },
        { type: "Normal Ad", price: "Rs. 800.00" },
        { type: "NRA Ad", price: "Rs. 15,000.00" }
    ];

    return (
        <div className="w-full mx-auto p-6 bg-white">
            {/* Header */}
            <SeeNewAds/>

            {/* Ad Prices Title and Date */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Ad Prices</h2>
                <p className="text-gray-500 text-sm">January 28, 2025</p>
            </div>

            {/* Advertisement Rates Notice */}
            <div className="mb-6">
                <p className="text-gray-600 mb-2">Advertisement rates effective from February 1, 2025</p>
                <p className="text-gray-600 text-sm">දැන්වීම් ගාස්තු 2025 පෙබරවාරි 1 වනදා සිට ක්‍රියාත්මකයි</p>
            </div>

            {/* Pricing List */}
            <div className="space-y-3">
                {pricingData.map((item, index) => (
                    <div key={index} className="text-gray-600">
                        <span className="font-medium">{item.type}</span> - <span>{item.price}</span>
                    </div>
                ))}
            </div>

            {/* Footer spacing */}
            <div className="mt-12"></div>
        </div>
    );
};

export default AdPricesPage;
