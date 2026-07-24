import SeeNewAds from "../components/SeeNewAds.tsx";

const CeylonAdsHome = () => {
    return (
        <div className="w-full mx-auto p-6 bg-white">
            {/* Header */}
          <SeeNewAds/>
            {/* Main Title and Date */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Ceylon Ads</h2>
                <p className="text-gray-500 text-sm">July 25, 2025</p>
            </div>

            {/* Main Description */}
            <div className="mb-6">
                <p className="text-gray-600 leading-relaxed">
                    Discover ads across Ceylon, Sri Lanka ads, Lanka Ads, SL ads, personal ads, VIP ads, and spa ads. Browse local classifieds for
                    exclusive services and listings across Sri Lanka.
                </p>
            </div>

            {/* Partnership Notice */}
            <div className="mb-8">
                <p className="text-gray-600">
                    We are partner with lankanads.org
                </p>
            </div>

            {/* Footer spacing */}
            <div className="mt-12"></div>
        </div>
    );
};

export default CeylonAdsHome;
