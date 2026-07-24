
import SeeNewAds from "../components/SeeNewAds.tsx";

const AdsTypePage = () => {
    const adTypes = [
        {
            type: "VIP ads",
            color: "red",
            colorClass: "text-red-500",
            bulletClass: "bg-red-500",
            description: "VIP ads වර්ගයේ දැන්වීම් වලට 5,000k+ VIP ads සඳහා වරම් ඇත. ප්‍රදර්ශනය VIP ads වලට ප්‍රමුඛතාවය ලබා දේ සහ ඒවා 24 දින නමයන් දක්වා ක්‍රියාත්මකය."
        },
        {
            type: "NORMAL ads",
            color: "green",
            colorClass: "text-green-600",
            bulletClass: "bg-green-600",
            description: "සාමාන්‍ය දැන්වීම් COLA වල වගේ නැතිවේ. NORMAL ads සඳහා මිල ගණන් VIP ads වලට වඩා SUPER ads සහ වඩා අඩුයි. එහෙත් NORMAL දැන්වීම් ද ගේම මල් දාන ක්‍රමයකි.",
            extraNote: "⚠️ සටහන ⚠️\n\nමෙම 48 පහත සෑම දින ප්‍රමුඛ ads සෙවීම් නම් ( Search bar ) එකෙන් සමඟපන්න අතේ. ඒ සඳහබේ නවතින්නම් පෑන්සලේ සාකිට සයින් මලන විජිත්නුත් පිලබදම සෑකට ගිනිව එකෙන් විස්තරව සයන්ට ගිනිව ( Page by Page )"
        },
        {
            type: "SUPER ads",
            color: "orange",
            colorClass: "text-yellow-500",
            bulletClass: "bg-yellow-500",
            description: "වෙබ් අඩවියේ දෙවන කොටසේ ප්‍රදර්ශනය VIP ads පමණක් වේ. SUPER ads අනුව VIP ads සහ NORMAL ads අතර SUPER ads සඳහා මිල ගණන් ද VIP ads වලට වඩා අඩුයි. NORMAL ads සඳහා මිල ගණන් ද VIP ads සඳහා මිල ගණන් ද අතර ය."
        },
        {
            type: "NORMAL ads",
            color: "green",
            colorClass: "text-green-600",
            bulletClass: "bg-green-600",
            description: "සාමාන්‍ය දැන්වීම් VIP ads වලට SUPER ads වල ප්‍රමුඛතාව නැතිව නිසයන නම් NORMAL ads සහ NORMAL ads වලට වැඩි දුර සිට අවම මිලක්."
        },
        {
            type: "Search",
            color: "orange",
            colorClass: "text-yellow-500",
            bulletClass: "bg-yellow-500",
            description: "ලියන අයුරින් ප්‍රබන්ධන ads පරිගණකගත ( Search bar ) වල ප්‍රදර්ශන වෙන්නේ ප්‍රධාන විභාගයකින් පසුව සොයන තනි නම්වර ප්‍රදර්ශනයකින් දිස්වයන."
        }
    ];

    return (
        <div className="w-full mx-auto p-6 bg-white">
            {/* Header */}
            <SeeNewAds/>

            {/* Ads Type Title and Date */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Ads Type</h2>
                <p className="text-gray-500 text-sm">February 3, 2025</p>
            </div>

            {/* Ad Types List */}
            <div className="space-y-6">
                {adTypes.map((ad, index) => (
                    <div key={index} className="flex items-start">
                        <div className={`w-3 h-3 rounded-full ${ad.bulletClass} mt-1.5 mr-3 flex-shrink-0`}></div>
                        <div>
                            <h3 className={`font-semibold ${ad.colorClass} mb-2`}>{ad.type}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{ad.description}</p>
                            {ad.extraNote && (
                                <div className="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r">
                                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{ad.extraNote}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Additional Information Sections */}
            <div className="mt-8 space-y-6">
                {/* VIP Ads Section */}
                <div className="flex items-start">
                    <div className="w-3 h-3 rounded-full bg-red-500 mt-1.5 mr-3 flex-shrink-0"></div>
                    <div>
                        <h3 className="font-semibold text-red-500 mb-2">VIP Ads</h3>
                        <div className="text-gray-600 text-sm space-y-1">
                            <p>Displayed at the very top of the website for 24 hours.</p>
                            <p>After 24 hours, they are automatically downgraded to NORMAL Ads and moved to the bottom section of the website.</p>
                            <p>NORMAL Ads remain visible for 30 days in total.</p>
                        </div>
                    </div>
                </div>

                {/* SUPER Ads Section */}
                <div className="flex items-start">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mt-1.5 mr-3 flex-shrink-0"></div>
                    <div>
                        <h3 className="font-semibold text-yellow-500 mb-2">SUPER Ads</h3>
                        <div className="text-gray-600 text-sm space-y-1">
                            <p>Displayed below VIP Ads but above NORMAL Ads on the website.</p>
                            <p>After 24 hours, they are downgraded to NORMAL Ads and moved to the bottom section of the website.</p>
                            <p>Like VIP Ads, SUPER Ads also remain visible as NORMAL Ads for 30 days in total.</p>
                        </div>
                    </div>
                </div>

                {/* NORMAL Ads Section */}
                <div className="flex items-start">
                    <div className="w-3 h-3 rounded-full bg-green-600 mt-1.5 mr-3 flex-shrink-0"></div>
                    <div>
                        <h3 className="font-semibold text-green-600 mb-2">NORMAL Ads</h3>
                        <div className="text-gray-600 text-sm space-y-1">
                            <p>Always displayed at the bottom section of the website, below both VIP and SUPER Ads.</p>
                            <p>Remain active for 30 days from the posting time.</p>
                        </div>
                    </div>
                </div>

                {/* Additional Features */}
                <div className="mt-8 space-y-4">
                    <h3 className="font-semibold text-gray-700">Additional Features:</h3>

                    <div className="text-gray-600 text-sm space-y-2">
                        <p><span className="font-semibold">1. Search Bar Visibility:</span></p>
                        <p>Ads disappear from search results after 48 hours.</p>
                        <p>To view these ads after 48 hours, users must manually browse through website pages (page by page).</p>

                        <p><span className="font-semibold">2. Ad Hierarchy:</span></p>
                        <p>Active Ads: VIP (top) + SUPER (middle) + NORMAL (bottom)</p>
                        <p>Expired VIP/SUPER Ads: Join the NORMAL Ads section at the bottom.</p>

                        <p><span className="font-semibold">3. Duration Summary:</span></p>
                        <p>VIP/SUPER Ads: 24 hours (premium placement) + 30 days (as NORMAL Ads)</p>
                        <p>Direct NORMAL Ads: 30 days (bottom placement)</p>
                    </div>
                </div>
            </div>

            {/* Footer spacing */}
            <div className="mt-12"></div>
        </div>
    );
};

export default AdsTypePage;
