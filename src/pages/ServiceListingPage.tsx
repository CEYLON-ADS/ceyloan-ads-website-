import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Phone, MapPin, Eye, ArrowLeft, ShieldCheck, Share2, Bookmark } from 'lucide-react';
import ContactInfoCard from "../components/ContactInfoCard.tsx";
import { getAdvertisementById, type Advertisement } from "../services/advertisment/getAllAdvertisements.ts";

export default function ServiceListingCard() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [ad, setAd] = useState<Advertisement | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const fetchAdDetails = async (adId: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAdvertisementById(adId);
            setAd(data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch advertisement details';
            setError(errorMessage);
            console.error('Error in ServiceListingCard:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchAdDetails(id);
        } else {
            setError('Advertisement ID is missing');
            setLoading(false);
        }
    }, [id]);

    const images = ad?.imageUrls && ad.imageUrls.length > 0
        ? ad.imageUrls.map(img => img.url)
        : ['../../public/image1.png'];

    const getSlidePosition = (index: number) => {
        const diff = index - currentImageIndex;
        const totalSlides = images.length;

        let normalizedDiff = diff;
        if (diff > totalSlides / 2) normalizedDiff -= totalSlides;
        if (diff < -totalSlides / 2) normalizedDiff += totalSlides;

        if (normalizedDiff === 0) {
            return {
                transform: 'translateX(-50%) scale(1)',
                zIndex: 30,
                opacity: 1,
                left: '50%'
            };
        } else if (normalizedDiff === 1) {
            return {
                transform: 'translateX(-30%) scale(0.8)',
                zIndex: 20,
                opacity: 0.7,
                left: '70%'
            };
        } else if (normalizedDiff === -1) {
            return {
                transform: 'translateX(-70%) scale(0.8)',
                zIndex: 20,
                opacity: 0.7,
                left: '30%'
            };
        } else if (normalizedDiff === 2) {
            return {
                transform: 'translateX(-10%) scale(0.6)',
                zIndex: 10,
                opacity: 0.4,
                left: '85%'
            };
        } else if (normalizedDiff === -2) {
            return {
                transform: 'translateX(-90%) scale(0.6)',
                zIndex: 10,
                opacity: 0.4,
                left: '15%'
            };
        } else {
            return {
                transform: normalizedDiff > 0 ? 'translateX(50%) scale(0.5)' : 'translateX(-150%) scale(0.5)',
                zIndex: 1,
                opacity: 0,
                left: normalizedDiff > 0 ? '100%' : '0%'
            };
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mb-4"></div>
                <p className="text-gray-600 font-medium">Loading advertisement details...</p>
            </div>
        );
    }

    if (error || !ad) {
        return (
            <div className="flex flex-col justify-center items-center h-96 p-4">
                <div className="text-red-500 text-center mb-4">
                    <p className="text-xl font-semibold">Error Loading Advertisement</p>
                    <p className="text-sm text-gray-600 mt-2">{error || 'Advertisement not found'}</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Go Back
                    </button>
                    {id && (
                        <button
                            onClick={() => fetchAdDetails(id)}
                            className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                        >
                            Try Again
                        </button>
                    )}
                </div>
            </div>
        );
    }

    const formattedPrice = ad.price
        ? `Rs. ${ad.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
        : 'Price on request';

    const locationText = ad.cities && ad.cities.length > 0
        ? ad.cities.join(', ')
        : 'Location not specified';

    return (
        <div className="w-full mx-auto bg-white overflow-hidden pb-8">
            {/* Back Button */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-pink-600 transition-colors cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Listings
                </button>
                {ad.categoryName && (
                    <span className="px-3 py-1 bg-pink-100 text-pink-700 text-xs font-semibold rounded-full">
                        {ad.categoryName}
                    </span>
                )}
            </div>

            {/* Image Carousel */}
            <div className="relative w-full h-96 sm:h-120 overflow-hidden mb-8 bg-gray-900">
                <div className="relative w-full h-full">
                    {images.map((src, index) => {
                        const slideStyle = getSlidePosition(index);

                        return (
                            <div
                                key={index}
                                className="absolute top-1/2 w-80 sm:w-120 h-full cursor-pointer transition-all duration-500 ease-out"
                                style={{
                                    ...slideStyle,
                                    transform: `${slideStyle.transform} translateY(-50%)`
                                }}
                                onClick={() => setCurrentImageIndex(index)}
                            >
                                <div className="w-full h-full rounded-lg overflow-hidden shadow-2xl relative">
                                    <img
                                        src={src}
                                        alt={`${ad.title} image ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
                                        }}
                                    />
                                    {index !== currentImageIndex && (
                                        <div className="absolute inset-0 bg-black/40"></div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Navigation arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 text-gray-800 p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 z-40 cursor-pointer"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 text-gray-800 p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 z-40 cursor-pointer"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-40">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                        index === currentImageIndex
                                            ? 'bg-white scale-125 shadow-lg'
                                            : 'bg-white/50 hover:bg-white/70'
                                    }`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Content Container */}
            <div className="max-w-4xl mx-auto px-4">
                {/* Header Stats */}
                <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 mb-4 pb-3 border-b border-gray-100 gap-2">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                            <Heart className={`w-4 h-4 ${isLiked ? 'text-pink-600 fill-pink-600' : 'text-gray-400'}`} />
                            <span>{ad.allLikes || 0} Likes</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4 text-gray-400" />
                            <span>{ad.allViews || 0} Views</span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        {ad.isFake ? (
                            <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded">
                                Reported Fake ({ad.fakeCount || 1})
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                                <ShieldCheck className="w-3.5 h-3.5" /> Verified Listing
                            </span>
                        )}
                    </div>
                </div>

                {/* Price Display */}
                <div className="text-center mb-4">
                    <span className="text-3xl sm:text-4xl font-bold text-pink-600">{formattedPrice}</span>
                </div>

                {/* Advertisement Title */}
                <h1 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-3 leading-snug">
                    {ad.title}
                </h1>

                {/* Location */}
                <div className="flex items-center justify-center text-gray-600 text-sm mb-6">
                    <MapPin className="w-4 h-4 mr-1 text-pink-600" />
                    <span className="font-medium">Location: {locationText}</span>
                </div>

                {/* Contact Actions */}
                {ad.userMobileNumber && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                        {ad.whatsapp && (
                            <a
                                href={`https://wa.me/${ad.userMobileNumber.replace(/\+/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-emerald-600 text-white py-3 px-4 rounded-xl flex items-center justify-center font-semibold hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg"
                            >
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.687"/>
                                </svg>
                                WhatsApp: {ad.userMobileNumber}
                            </a>
                        )}
                        <a
                            href={`tel:${ad.userMobileNumber}`}
                            className="bg-green-700 text-white py-3 px-4 rounded-xl flex items-center justify-center font-semibold hover:bg-green-800 transition-colors shadow-md hover:shadow-lg"
                        >
                            <Phone className="w-5 h-5 mr-2" />
                            Call: {ad.userMobileNumber}
                        </a>
                    </div>
                )}

                {/* Additional Available Messaging Channels */}
                <div className="flex flex-wrap gap-2 mb-6 justify-center">
                    {ad.telegram && (
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold">
                            ✈️ Telegram Available
                        </span>
                    )}
                    {ad.viber && (
                        <span className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg text-xs font-semibold">
                            📱 Viber Available
                        </span>
                    )}
                    {ad.imo && (
                        <span className="px-3 py-1 bg-sky-50 text-sky-700 border border-sky-200 rounded-lg text-xs font-semibold">
                            💬 IMO Available
                        </span>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mb-6">
                    <button
                        onClick={() => setIsLiked(!isLiked)}
                        className={`flex-1 py-2.5 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 cursor-pointer ${
                            isLiked
                                ? 'bg-pink-600 text-white shadow-md'
                                : 'bg-pink-50 text-pink-700 border border-pink-200 hover:bg-pink-100'
                        }`}
                    >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
                        {isLiked ? 'Liked' : 'Like'}
                    </button>

                    <button
                        onClick={() => setIsSaved(!isSaved)}
                        className={`flex-1 py-2.5 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 cursor-pointer ${
                            isSaved
                                ? 'bg-purple-600 text-white shadow-md'
                                : 'bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100'
                        }`}
                    >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                        {isSaved ? 'Saved' : 'Save'}
                    </button>

                    <button
                        onClick={() => {
                            if (navigator.share) {
                                navigator.share({
                                    title: ad.title,
                                    url: window.location.href
                                }).catch(() => {});
                            } else {
                                navigator.clipboard.writeText(window.location.href);
                                alert('Link copied to clipboard!');
                            }
                        }}
                        className="flex-1 py-2.5 px-4 bg-gray-100 text-gray-700 border border-gray-200 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <Share2 className="w-4 h-4" />
                        Share
                    </button>
                </div>

                {/* Description Box */}
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                        Description & Details
                    </h3>
                    <div className="text-gray-700 text-sm whitespace-pre-line leading-relaxed">
                        {ad.description || 'No detailed description provided for this advertisement.'}
                    </div>
                </div>

                {/* Listing Metadata */}
                <div className="bg-pink-50/50 border border-pink-100 rounded-xl p-4 text-xs text-gray-600 space-y-1">
                    <p><span className="font-semibold text-gray-700">Listing ID:</span> {ad.propertyId}</p>
                    <p><span className="font-semibold text-gray-700">Category:</span> {ad.categoryName || 'General'}</p>
                    <p><span className="font-semibold text-gray-700">Publisher Contact:</span> {ad.userMobileNumber || 'Protected'}</p>
                </div>
            </div>

            <div className="mt-8">
                <ContactInfoCard />
            </div>
        </div>
    );
}