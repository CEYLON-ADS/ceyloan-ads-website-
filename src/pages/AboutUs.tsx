import SeeNewAds from "../components/SeeNewAds.tsx";

export default function AboutUs() {
    return (
        <div className="w-full mx-auto p-6 bg-white">
            {/* Header Button */}

            <SeeNewAds/>
            {/* Title and Date */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">About Us</h1>
                <p className="text-gray-500 text-sm">July 25, 2025</p>
            </div>

            {/* Content */}
            <div className="space-y-8 text-gray-800 leading-relaxed">

                {/* Welcome Section */}
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                        Welcome to Ceylon-ads.co – Your Premier Classified Ad Platform in Sri Lanka!
                    </h2>
                    <p className="text-sm">
                        At Ceylon-ads.com, we are committed to bringing you a dynamic and easy-to-use platform for posting and discovering a wide
                        array of ads. Whether you're searching for a new car, looking for job opportunities, or interested in local services, including
                        <strong> personal ads, spa ads</strong>, and more, we have everything you need!
                    </p>
                </div>

                {/* Our Mission */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Our Mission</h2>
                    <p className="text-sm">
                        Our mission at Ceylon-ads.co is to create an inclusive online marketplace that connects people across Sri Lanka. We aim
                        to simplify the process of finding and posting ads, ensuring that everyone can benefit from the convenience and efficiency of
                        our platform. Whether you're here to find a great deal or to post your CeylonAds ad, we're here to assist you every step of the
                        way.
                    </p>
                </div>

                {/* What We Offer */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">What We Offer</h2>

                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Comprehensive Classifieds:</h3>
                            <p className="text-sm">
                                From <strong>SL ads</strong> for real estate and vehicles to specialized <strong>personal ads</strong> and <strong>spa ads</strong>, our platform
                                covers a broad range of categories to suit your needs.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">User-Friendly Experience:</h3>
                            <p className="text-sm">
                                With a focus on simplicity and functionality, Ceylon-ads.co is designed to make posting and
                                finding ads quick and easy.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Local Focus:</h3>
                            <p className="text-sm">
                                We cater specifically to the Sri Lankan market, ensuring that our services meet the unique needs of our
                                community.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Our Story */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Our Story</h2>
                    <p className="text-sm">
                        Founded with a vision to enhance local connectivity, Ceylon-ads.co serves as a central hub for classified ads across Sri
                        Lanka. Our platform, known for its reliability and user-centric approach, provides a seamless experience for both buyers and
                        sellers. We are passionate about making online transactions simple and accessible, fostering growth and engagement within
                        our communities.
                    </p>
                </div>

                {/* Why Choose */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Why Choose Ceylon-ads.com?</h2>

                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Diverse Ad Categories:</h3>
                            <p className="text-sm">
                                From <strong>Lanka ads</strong> for everyday needs to niche ads like <strong>spa ads</strong>, we offer a comprehensive range of
                                categories to help you find exactly what you're looking for.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Local Expertise:</h3>
                            <p className="text-sm">
                                Our deep understanding of the Sri Lankan market allows us to tailor our services effectively, ensuring relevant
                                and valuable interactions.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Dedicated Support:</h3>
                            <p className="text-sm">
                                Our customer support team is always ready to assist with any questions or concerns, making sure you
                                have a smooth experience with your <strong>Lanka ad</strong>.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Get in Touch */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Get in Touch</h2>
                    <p className="text-sm mb-4">
                        We value your feedback and are eager to assist you. For any inquiries or support, please visit our 'Contact Us' page or connect
                        with us on social media. Your experience with Ceylon-ads.co is our priority.
                    </p>
                    <p className="text-sm mb-2">
                        Thank you for choosing Ceylon-ads.co – where your next opportunity is just a click away.
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                        The Ceylon-ads.co Team
                    </p>
                </div>

            </div>
        </div>
    );
}
