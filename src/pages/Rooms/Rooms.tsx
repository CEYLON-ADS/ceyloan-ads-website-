
import AdCard from "../../components/AdCard.tsx";
import {useEffect, useState} from "react";
import {Plus, Target} from "lucide-react";


const Rooms = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [hasImages, setHasImages] = useState<boolean>(false);
    const [images, setImages] = useState<string[]>([]);

    // Sample images - replace with your actual images
    const sampleImages = [
        "../../public/1.jpg",
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ];

    const handlePostAd = () => {
        console.log('Navigate to post ad page');
    };

    const handleAddImages = () => {
        // Simulate adding images
        setImages(sampleImages);
        setHasImages(true);
        setCurrentSlide(0);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    // Auto-slide functionality
    useEffect(() => {
        if (hasImages && images.length > 1) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % images.length);
            }, 4000); // Change slide every 4 seconds

            return () => clearInterval(interval);
        }
    }, [hasImages, images.length]);

    return (
        <>
            <div className="flex flex-col lg:flex-row gap-4 p-4">
                {/* Main large banner with slider */}
                <div
                    className="w-full lg:w-3/4 h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-dashed border-blue-300 hover:border-blue-400 rounded-lg relative overflow-hidden transition-all duration-300 hover:shadow-lg group"
                >
                    {hasImages && images.length > 0 ? (
                        <>
                            {/* Image Slider */}
                            <div className="relative w-full h-full">
                                <div
                                    className="flex transition-transform duration-700 ease-in-out h-full"
                                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                >
                                    {images.map((image, index) => (
                                        <div key={index} className="w-full h-full flex-shrink-0 relative">
                                            <img
                                                src={image}
                                                alt={`Advertisement ${index + 1}`}
                                                className="w-full h-full object-contain"
                                            />
                                            {/* Gradient overlay for better text visibility */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                                        </div>
                                    ))}
                                </div>

                                {/* Dot Navigation */}
                                <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3">
                                    {images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goToSlide(index)}
                                            className={`w-2 h-2 sm:w-4 sm:h-4 rounded-full transition-all duration-300 cursor-pointer ${
                                                index === currentSlide
                                                    ? 'bg-white shadow-lg scale-110'
                                                    : 'bg-white/60 hover:bg-white/80 hover:scale-105'
                                            }`}
                                            aria-label={`Go to slide ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        /* No ads state - beautiful empty state */
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center p-4 sm:p-8">
                                {/* Icon with animation */}
                                <div className="mb-4 p-3 bg-white rounded-full shadow-sm mx-auto w-fit">
                                    <Target className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Premium Banner Space</h3>
                                <p className="text-gray-600 mb-4 max-w-xs mx-auto text-sm sm:text-base">
                                    Post your ads here and reach thousands of customers
                                </p>

                                {/* Call to action */}
                                <div className="space-y-4">
                                    <button
                                        onClick={handlePostAd}
                                        className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                    >
                                        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                                        Post Your Ad Here
                                    </button>

                                    {/* Demo button */}
                                    <div className="pt-2">
                                        <button
                                            onClick={handleAddImages}
                                            className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 underline underline-offset-2 transition-colors duration-200"
                                        >
                                            View Demo with Sample Ads
                                        </button>
                                    </div>
                                </div>

                                {/* Placeholder dots */}
                                <div className="flex justify-center space-x-2 sm:space-x-3 mt-6 sm:mt-8">
                                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 rounded-full opacity-60"></div>
                                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 rounded-full opacity-60"></div>
                                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 rounded-full opacity-60"></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right column with two stacked banners */}
                <div className="flex flex-col gap-4 w-full lg:w-1/4">
                    {/* Top right banner */}
                    <div
                        className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-dashed border-green-300 hover:border-green-400 rounded-lg h-40 sm:h-40 lg:h-46 flex items-center justify-center transition-all duration-300 hover:shadow-lg group cursor-pointer"
                    >
                        <div className="text-center">
                            <div className="mb-2 p-2 bg-white rounded-full shadow-sm mx-auto w-fit">
                                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                            </div>
                            <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-1">Featured Spot</h4>
                            <p className="text-gray-600 text-xs sm:text-sm mb-3">Post your ad here</p>
                            <button
                                onClick={handlePostAd}
                                className="inline-flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer"
                            >
                                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                                Post Ad
                            </button>
                        </div>
                    </div>

                    {/* Bottom right banner */}
                    <div
                        className="bg-gradient-to-br from-purple-50 to-violet-100 border-2 border-dashed border-purple-300 hover:border-purple-400 rounded-lg h-40 sm:h-40 lg:h-46 flex items-center justify-center transition-all duration-300 hover:shadow-lg group cursor-pointer"
                    >
                        <div className="text-center">
                            <div className="mb-2 p-2 bg-white rounded-full shadow-sm mx-auto w-fit">
                                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
                            </div>
                            <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-1">Ad Space</h4>
                            <p className="text-gray-600 text-xs sm:text-sm mb-3">Post your ad here</p>
                            <button
                                onClick={handlePostAd}
                                className="inline-flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-500 hover:bg-purple-600 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer"
                            >
                                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                                Post Ad
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <AdCard />
        </>
    );
};
export default Rooms;