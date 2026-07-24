import AdCard from "../../components/AdCard.tsx";
import {useEffect, useState} from "react";
import {Plus, Target} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { searchAdvertisementsByCategory, type Advertisement, type PaginatedAdvertisementResponse } from "../../services/advertisment/getAllAdvertisements.ts";

const GirlsPersonal = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [hasImages, setHasImages] = useState<boolean>(false);
    const [images, setImages] = useState<string[]>([]);
    const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get('categoryId');

    // Fetch advertisements by category using the service
    const fetchAdvertisementsByCategory = async () => {
        if (!categoryId) {
            setError('Category ID is required');
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError('');

            const response: PaginatedAdvertisementResponse = await searchAdvertisementsByCategory(categoryId, '', 0, 10);

            // Check if response has dataList property (the actual ads array)
            const adsArray = response.dataList || [];
            setAdvertisements(adsArray);

            // Extract images from advertisements for the slider
            // const adImages = adsArray
            //     .filter(ad => ad.imageUrls && ad.imageUrls.length > 0)
            //     .flatMap(ad => ad.imageUrls.map(img => img.url))
            //     .slice(0, 3); // Take first 3 images for the slider
            //
            // if (adImages.length > 0) {
            //     setImages(adImages);
            //     setHasImages(true);
            // }

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load advertisements';
            setError(errorMessage);
            console.error('Error fetching advertisements:', err);

            // Fallback to sample images if API fails
            const sampleImages = [
                "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            ];
            setImages(sampleImages);
            setHasImages(true);
        } finally {
            setLoading(false);
        }
    };

    const handlePostAd = () => {
        console.log('Navigate to post ad page');
        // You can implement navigation logic here
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

    // Fetch data on component mount or when categoryId changes
    useEffect(() => {
        if (categoryId) {
            fetchAdvertisementsByCategory();
        }
    }, [categoryId]);

    // Refresh data function
    const handleRefresh = () => {
        fetchAdvertisementsByCategory();
    };

    if (!categoryId) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-red-500 text-center">
                    <p className="text-lg font-semibold">Category ID is missing</p>
                    <p className="text-sm text-gray-600 mt-2">Please navigate from the sidebar to view category ads</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-gray-600">Loading advertisements...</span>
            </div>
        );
    }

    if (error && advertisements.length === 0) {
        return (
            <div className="flex justify-center items-center h-64 flex-col">
                <div className="text-red-500 text-center">
                    <p className="text-lg font-semibold">Error loading advertisements</p>
                    <p className="text-sm text-gray-600 mt-2">{error}</p>
                    <button
                        onClick={handleRefresh}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

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
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    // Fallback if image fails to load
                                                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
                                                }}
                                            />
                                            {/* Gradient overlay for better text visibility */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                                            {/* Advertisement info overlay */}
                                            <div className="absolute bottom-4 left-4 text-white">
                                                <h3 className="text-lg font-semibold">
                                                    {advertisements[index]?.title || 'Featured Advertisement'}
                                                </h3>
                                                <p className="text-sm opacity-90">
                                                    {advertisements[index]?.price ? `$${advertisements[index]?.price}` : 'Check it out!'}
                                                </p>
                                            </div>
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
                        /* No ads state */
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center p-4 sm:p-8">
                                <div className="mb-4 p-3 bg-white rounded-full shadow-sm mx-auto w-fit">
                                    <Target className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Premium Banner Space</h3>
                                <p className="text-gray-600 mb-4 max-w-xs mx-auto text-sm sm:text-base">
                                    Post your ads here and reach thousands of customers
                                </p>

                                <div className="space-y-4">
                                    <button
                                        onClick={handlePostAd}
                                        className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                    >
                                        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                                        Post Your Ad Here
                                    </button>
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
                        {advertisements.length > 0 ? (
                            <div className="text-center p-2">
                                <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-1 line-clamp-1">
                                    {advertisements[0].title}
                                </h4>
                                <p className="text-green-600 font-semibold text-sm mb-1">
                                    {advertisements[0].price ? `$${advertisements[0].price}` : 'Price not set'}
                                </p>
                                <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                                    {advertisements[0].cities && advertisements[0].cities.length > 0
                                        ? advertisements[0].cities.join(', ')
                                        : 'No location specified'
                                    }
                                </p>
                                <button
                                    onClick={handlePostAd}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer"
                                >
                                    View Details
                                </button>
                            </div>
                        ) : (
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
                        )}
                    </div>

                    {/* Bottom right banner */}
                    <div
                        className="bg-gradient-to-br from-purple-50 to-violet-100 border-2 border-dashed border-purple-300 hover:border-purple-400 rounded-lg h-40 sm:h-40 lg:h-46 flex items-center justify-center transition-all duration-300 hover:shadow-lg group cursor-pointer"
                    >
                        {advertisements.length > 1 ? (
                            <div className="text-center p-2">
                                <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-1 line-clamp-1">
                                    {advertisements[1].title}
                                </h4>
                                <p className="text-purple-600 font-semibold text-sm mb-1">
                                    {advertisements[1].price ? `$${advertisements[1].price}` : 'Price not set'}
                                </p>
                                <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                                    {advertisements[1].cities && advertisements[1].cities.length > 0
                                        ? advertisements[1].cities.join(', ')
                                        : 'No location specified'
                                    }
                                </p>
                                <button
                                    onClick={handlePostAd}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-500 hover:bg-purple-600 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer"
                                >
                                    View Details
                                </button>
                            </div>
                        ) : (
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
                        )}
                    </div>
                </div>
            </div>

            {/* Display all advertisements in AdCard component */}
            <AdCard advertisements={advertisements} />

            {/* Error banner (only shows if there are ads but also an error) */}
            {error && advertisements.length > 0 && (
                <div className="mx-4 mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="text-yellow-600 text-sm">
                                Partial data loaded. Some features might not work correctly.
                            </span>
                        </div>
                        <button
                            onClick={handleRefresh}
                            className="text-yellow-700 hover:text-yellow-800 text-sm font-medium"
                        >
                            Refresh
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default GirlsPersonal;