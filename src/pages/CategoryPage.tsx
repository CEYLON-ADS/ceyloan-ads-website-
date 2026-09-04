import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import AdCard from '../components/AdCard.tsx';
import { Plus, Target } from 'lucide-react';
import { searchAdvertisementsByCategory, type Advertisement, type PaginatedAdvertisementResponse } from '../services/advertisment/getAllAdvertisements.ts';
import categoryService, { type CategoryResponseDTO } from '../services/category/CategoryService.ts';

const CategoryPage: React.FC = () => {
    const { categoryName } = useParams<{ categoryName?: string }>();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [resolvedCategoryId, setResolvedCategoryId] = useState<string | null>(null);
    const [displayTitle, setDisplayTitle] = useState<string>('');
    const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [images, setImages] = useState<string[]>([]);
    const [hasImages, setHasImages] = useState<boolean>(false);

    // Resolve Category ID and Title
    useEffect(() => {
        const resolveCategory = async () => {
            setLoading(true);
            setError('');

            const paramCatId = searchParams.get('categoryId');

            if (paramCatId) {
                setResolvedCategoryId(paramCatId);
                setDisplayTitle(categoryName ? decodeURIComponent(categoryName) : 'Category');
                return;
            }

            if (!categoryName) {
                setError('Category not specified');
                setLoading(false);
                return;
            }

            const rawName = decodeURIComponent(categoryName).trim();
            setDisplayTitle(rawName);

            // UUID regex pattern check
            const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            if (uuidPattern.test(rawName)) {
                setResolvedCategoryId(rawName);
                return;
            }

            // Look up category by name from API
            try {
                const response = await categoryService.getAllCategories(0, 100);
                const categories: CategoryResponseDTO[] = response?.data?.dataList || [];

                const matchedCategory = categories.find(cat =>
                    cat.categoryName.toLowerCase() === rawName.toLowerCase() ||
                    cat.categoryName.toLowerCase().replace(/\s+/g, '') === rawName.toLowerCase().replace(/\s+/g, '') ||
                    cat.propertyId === rawName
                );

                if (matchedCategory) {
                    setResolvedCategoryId(matchedCategory.propertyId);
                    setDisplayTitle(matchedCategory.categoryName);
                } else {
                    // Try to search categories with rawName if exact match not found
                    console.warn(`Category "${rawName}" not found in initial category list.`);
                    setResolvedCategoryId(null);
                }
            } catch (err) {
                console.error('Failed to resolve category:', err);
                // If API fails, check if rawName itself might be usable or show notice
            }
        };

        resolveCategory();
    }, [categoryName, searchParams]);

    // Fetch advertisements once resolvedCategoryId is available
    const fetchAdvertisements = async (catId: string) => {
        try {
            setLoading(true);
            setError('');

            const response: PaginatedAdvertisementResponse = await searchAdvertisementsByCategory(catId, '', 0, 20);
            const adsArray = response?.dataList || [];
            setAdvertisements(adsArray);

            const adImages = adsArray
                .filter(ad => ad.imageUrls && ad.imageUrls.length > 0)
                .flatMap(ad => ad.imageUrls.map(img => img.url))
                .slice(0, 3);

            if (adImages.length > 0) {
                setImages(adImages);
                setHasImages(true);
            } else {
                setHasImages(false);
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load advertisements';
            console.error('Error fetching advertisements for category:', err);
            setError(errorMessage);
            setAdvertisements([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (resolvedCategoryId) {
            fetchAdvertisements(resolvedCategoryId);
        } else if (!loading && !resolvedCategoryId && categoryName) {
            // Category couldn't be resolved into a categoryId
            setLoading(false);
        }
    }, [resolvedCategoryId]);

    // Auto slide images if any
    useEffect(() => {
        if (hasImages && images.length > 1) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % images.length);
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [hasImages, images.length]);

    const handlePostAd = () => {
        navigate('/adDashboard');
    };

    const handleRefresh = () => {
        if (resolvedCategoryId) {
            fetchAdvertisements(resolvedCategoryId);
        }
    };

    const capitalizedTitle = displayTitle ? displayTitle.charAt(0).toUpperCase() + displayTitle.slice(1) : 'Category Advertisements';

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
                <span className="ml-3 text-gray-600 font-medium">Loading advertisements for {capitalizedTitle}...</span>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Category Header */}
            <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center mx-4 mt-2">
                <div>
                    <h1 className="text-2xl font-bold">{capitalizedTitle}</h1>
                    <p className="text-sm opacity-90">Find the latest ads under {capitalizedTitle}</p>
                </div>
                <button
                    onClick={handlePostAd}
                    className="flex items-center gap-2 bg-white text-pink-700 px-4 py-2 rounded-lg font-semibold shadow hover:bg-pink-50 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Post Ad in {capitalizedTitle}
                </button>
            </div>

            {/* Banner Section */}
            <div className="flex flex-col lg:flex-row gap-4 p-4">
                {/* Main large banner with slider */}
                <div className="w-full lg:w-3/4 h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-pink-50 to-purple-100 border-2 border-dashed border-pink-300 hover:border-pink-400 rounded-lg relative overflow-hidden transition-all duration-300 hover:shadow-lg group">
                    {hasImages && images.length > 0 ? (
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
                                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
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

                            <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3">
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-2 h-2 sm:w-4 sm:h-4 rounded-full transition-all duration-300 cursor-pointer ${
                                            index === currentSlide
                                                ? 'bg-white shadow-lg scale-110'
                                                : 'bg-white/60 hover:bg-white/80 hover:scale-105'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center p-4 sm:p-8">
                                <div className="mb-4 p-3 bg-white rounded-full shadow-sm mx-auto w-fit">
                                    <Target className="w-6 h-6 sm:w-8 sm:h-8 text-pink-500" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Premium Banner Space</h3>
                                <p className="text-gray-600 mb-4 max-w-xs mx-auto text-sm sm:text-base">
                                    Post your ads in {capitalizedTitle} and reach thousands of customers
                                </p>
                                <button
                                    onClick={handlePostAd}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                                >
                                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                                    Post Your Ad Here
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right column with two stacked banners */}
                <div className="flex flex-col gap-4 w-full lg:w-1/4">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-dashed border-green-300 hover:border-green-400 rounded-lg h-40 sm:h-40 lg:h-46 flex items-center justify-center transition-all duration-300 hover:shadow-lg group cursor-pointer">
                        {advertisements.length > 0 ? (
                            <div className="text-center p-2">
                                <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-1 line-clamp-1">
                                    {advertisements[0].title}
                                </h4>
                                <p className="text-green-600 font-semibold text-sm mb-1">
                                    {advertisements[0].price ? `$${advertisements[0].price}` : 'Price not set'}
                                </p>
                                <button
                                    onClick={() => navigate(`/service/${advertisements[0].propertyId}`)}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
                                >
                                    View Details
                                </button>
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="mb-2 p-2 bg-white rounded-full shadow-sm mx-auto w-fit">
                                    <Target className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                                </div>
                                <h4 className="text-base font-medium text-gray-800 mb-1">Featured Spot</h4>
                                <p className="text-gray-600 text-xs mb-2">Post your ad here</p>
                                <button
                                    onClick={handlePostAd}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
                                >
                                    <Plus className="w-3 h-3" />
                                    Post Ad
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-violet-100 border-2 border-dashed border-purple-300 hover:border-purple-400 rounded-lg h-40 sm:h-40 lg:h-46 flex items-center justify-center transition-all duration-300 hover:shadow-lg group cursor-pointer">
                        {advertisements.length > 1 ? (
                            <div className="text-center p-2">
                                <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-1 line-clamp-1">
                                    {advertisements[1].title}
                                </h4>
                                <p className="text-purple-600 font-semibold text-sm mb-1">
                                    {advertisements[1].price ? `$${advertisements[1].price}` : 'Price not set'}
                                </p>
                                <button
                                    onClick={() => navigate(`/service/${advertisements[1].propertyId}`)}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-500 hover:bg-purple-600 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
                                >
                                    View Details
                                </button>
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="mb-2 p-2 bg-white rounded-full shadow-sm mx-auto w-fit">
                                    <Target className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
                                </div>
                                <h4 className="text-base font-medium text-gray-800 mb-1">Ad Space</h4>
                                <p className="text-gray-600 text-xs mb-2">Post your ad here</p>
                                <button
                                    onClick={handlePostAd}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-500 hover:bg-purple-600 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
                                >
                                    <Plus className="w-3 h-3" />
                                    Post Ad
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Error state alert if error occurred */}
            {error && (
                <div className="mx-4 mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
                    <span className="text-red-600 text-sm">{error}</span>
                    <button
                        onClick={handleRefresh}
                        className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            )}

            {/* Display Advertisements */}
            <AdCard advertisements={advertisements} />
        </div>
    );
};

export default CategoryPage;
