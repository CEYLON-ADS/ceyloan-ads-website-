import SeeNewAds from "../components/SeeNewAds.tsx";

const ServicePage = () => {
    return (
        <div className="w-full mx-auto p-6 bg-white">
            {/* Header */}
           <SeeNewAds/>

            {/* Service Title and Date */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Service</h2>
                <p className="text-gray-500 text-sm">July 25, 2025</p>
            </div>

            {/* Welcome Section */}
            <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                    Welcome to Ceylon Ads - Your Ultimate Advertising Platform
                </h3>
                <h4 className="text-lg font-semibold text-gray-700 mb-4">
                    Why Choose Ceylon Ads?
                </h4>
                <p className="text-gray-600 leading-relaxed">
                    At Ceylon Ads, we specialize in connecting businesses and customers across Sri Lanka. Whether you're looking for
                    classified ads, job postings, or exclusive VIP listings, our platform offers it all. Our goal is to help you reach your audience
                    efficiently with tailored advertising solutions.
                </p>
            </div>

            {/* Services We Offer */}
            <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Services We Offer</h3>

                <div className="space-y-6">
                    {/* Classified Ads */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                            <span className="text-gray-500 mr-2">1.</span>
                            Classified Ads (Lanka Ads | Ceylon Ads)
                        </h4>
                        <ul className="ml-6 space-y-1 text-gray-600">
                            <li className="flex items-start">
                                <span className="text-gray-400 mr-2 mt-1">•</span>
                                Post your ads in various categories including real estate, vehicles, electronics, and more.
                            </li>
                            <li className="flex items-start">
                                <span className="text-gray-400 mr-2 mt-1">•</span>
                                Reach thousands of potential buyers and sellers across Sri Lanka.
                            </li>
                        </ul>
                    </div>

                    {/* Premium Listings */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                            <span className="text-gray-500 mr-2">2.</span>
                            Premium Listings (Lanka Ads & VIP Ads)
                        </h4>
                        <ul className="ml-6 space-y-1 text-gray-600">
                            <li className="flex items-start">
                                <span className="text-gray-400 mr-2 mt-1">•</span>
                                Highlight your listings with our premium services.
                            </li>
                            <li className="flex items-start">
                                <span className="text-gray-400 mr-2 mt-1">•</span>
                                Get more visibility and attract high-end clientele with VIP ads.
                            </li>
                        </ul>
                    </div>

                    {/* Targeted Advertising */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                            <span className="text-gray-500 mr-2">3.</span>
                            Targeted Advertising (SL Ads)
                        </h4>
                        <ul className="ml-6 space-y-1 text-gray-600">
                            <li className="flex items-start">
                                <span className="text-gray-400 mr-2 mt-1">•</span>
                                Utilize our targeted ad solutions to reach specific demographics.
                            </li>
                            <li className="flex items-start">
                                <span className="text-gray-400 mr-2 mt-1">•</span>
                                Perfect for businesses aiming to maximize ROI on ad spend.
                            </li>
                        </ul>
                    </div>

                    {/* Spa and Wellness Listings */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                            <span className="text-gray-500 mr-2">4.</span>
                            Spa and Wellness Listings (Spa Ads)
                        </h4>
                        <ul className="ml-6 space-y-1 text-gray-600">
                            <li className="flex items-start">
                                <span className="text-gray-400 mr-2 mt-1">•</span>
                                Advertise your spa and wellness services to a targeted audience.
                            </li>
                            <li className="flex items-start">
                                <span className="text-gray-400 mr-2 mt-1">•</span>
                                Ensure your business stands out in this competitive market.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Why Advertise with Us */}
            <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Why Advertise with Us?</h3>
                <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                        <span className="text-gray-400 mr-2 mt-1">•</span>
                        <div>
                            <span className="font-semibold text-gray-700">User-Friendly Interface:</span> Our platform is designed for ease of use, ensuring that you can post and manage your ads with minimal effort.
                        </div>
                    </li>
                    <li className="flex items-start">
                        <span className="text-gray-400 mr-2 mt-1">•</span>
                        <div>
                            <span className="font-semibold text-gray-700">Wide Reach:</span> With thousands of daily visitors, your ads will get the exposure they need.
                        </div>
                    </li>
                    <li className="flex items-start">
                        <span className="text-gray-400 mr-2 mt-1">•</span>
                        <div>
                            <span className="font-semibold text-gray-700">Cost-Effective:</span> Choose from various pricing options that fit your budget, with packages tailored for small businesses to large enterprises.
                        </div>
                    </li>
                </ul>
            </div>

            {/* Get Started Today */}
            <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Get Started Today!</h3>
                <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                        <span className="text-gray-400 mr-2 mt-1">•</span>
                        Post your first ad in minutes.
                    </li>
                    <li className="flex items-start">
                        <span className="text-gray-400 mr-2 mt-1">•</span>
                        Upgrade to <span className="font-semibold text-gray-700">premium</span> for maximum visibility.
                    </li>
                    <li className="flex items-start">
                        <span className="text-gray-400 mr-2 mt-1">•</span>
                        Contact our support team for any inquiries or assistance.
                    </li>
                </ul>
            </div>

            {/* Contact Us */}
            <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Us</h3>
                <p className="text-gray-600">
                    For more information, reach out to our customer service team at{' '}
                    <a href="mailto:contact@ceylon-ads.com" className="text-blue-600 hover:text-blue-800 underline">
                        contact@ceylon-ads.com
                    </a>
                </p>
            </div>

            {/* Footer spacing */}
            <div className="mt-12"></div>
        </div>
    );
};

export default ServicePage;
