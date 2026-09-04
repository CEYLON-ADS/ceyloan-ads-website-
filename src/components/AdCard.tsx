import {Heart, ThumbsUp, ChevronLeft, ChevronRight} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import type {Advertisement} from "../services/advertisment/getAllAdvertisements.ts";
import {stripHtml} from "../utils/htmlUtils.ts";

interface AdCardProps {
    advertisements?: Advertisement[]
}

// Helper functions moved outside the component
const getBadgeType = (ad: Advertisement): string => {
    // You can customize this logic based on your ad properties
    if (ad.price && ad.price > 1000) return 'VIP Ad';
    if (ad.categoryName?.toLowerCase().includes('premium')) return 'Super Ad';
    return 'Standard Ad';
};

const getBadgeColor = (ad: Advertisement): string => {
    // You can customize this logic based on your ad properties
    if (ad.price && ad.price > 1000) return 'bg-purple-600';
    if (ad.categoryName?.toLowerCase().includes('premium')) return 'bg-orange-500';
    return 'bg-green-600';
};

// Get border color based on ad type
const getBorderColor = (ad: Advertisement): string => {
    if (ad.price && ad.price > 1000) return 'border-purple-500 hover:border-purple-600'; // VIP - Purple
    if (ad.categoryName?.toLowerCase().includes('premium')) return 'border-orange-400 hover:border-orange-500'; // Super - Orange
    return 'border-green-500 hover:border-green-600'; // Standard - Green
};

// Format price with currency symbol
const formatPrice = (price: number): string => {
    return `$${price.toLocaleString()}`;
};

// Calculate time ago from created date
const getTimeAgo = (dateString: string): string => {
    const createdDate = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
};

export default function AdCard({advertisements = []}: AdCardProps) {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 6; // Number of cards to show per page

    // Use the actual advertisements data passed as props
    const allCards = advertisements.map((ad, index) => ({
        id: ad.propertyId || `ad-${index}`,
        badge: getBadgeType(ad),
        badgeColor: getBadgeColor(ad),
        borderColor: getBorderColor(ad),
        imageUrl: ad.imageUrls && ad.imageUrls.length > 0 ? ad.imageUrls[0].url : '../../public/image1.png',
        advertisement: ad // Store the full ad object for reference
    }));

    // Calculate pagination values
    const totalPages = Math.ceil(allCards.length / cardsPerPage);
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const currentCards = allCards.slice(startIndex, endIndex);

    const handleCardClick = (cardId: string) => {
        navigate(`/service/${cardId}`);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to top when page changes
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <div className="bg-white min-h-screen p-4">
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto mb-8">
                {currentCards.length > 0 ? (
                    currentCards.map((card) => (
                        <div
                            key={card.id}
                            className={`bg-white rounded-lg border-2 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 ${card.borderColor}`}
                            onClick={() => handleCardClick(card.id)}
                        >
                            <div className="flex">
                                {/* Image */}
                                <div className="w-32 h-full bg-gray-300 flex-shrink-0 overflow-hidden">
                                    <img
                                        src={card.imageUrl}
                                        alt={`${card.advertisement.title} image`}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                                        onError={(e) => {
                                            // Fallback if image fails to load
                                            (e.target as HTMLImageElement).src = '../../public/image1.png';
                                        }}
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-3">
                                    <div className="flex items-start mb-2">
                                        <Heart className="w-4 h-4 text-red-500 mr-1 flex-shrink-0 mt-0.5"
                                               fill="currentColor"/>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-semibold text-gray-800 leading-tight hover:text-blue-600 transition-colors">
                                                {card.advertisement.cities && card.advertisement.cities.length > 0
                                                    ? `${card.advertisement.cities.join(', ')} / `
                                                    : ''
                                                }
                                                {card.advertisement.price ? `${formatPrice(card.advertisement.price)} ` : ''}
                                                {card.advertisement.title}
                                            </h3>
                                            <p className="text-xs text-gray-600 mt-1">
                                                {card.advertisement.userMobileNumber || 'Unknown number'}
                                                {card.advertisement.userId ? ` (${card.advertisement.userId.slice(0, 8)})` : ''} 🌹
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-xs text-gray-600 mb-3 leading-relaxed line-clamp-2">
                                        {stripHtml(card.advertisement.description) || 'No description available'}
                                    </p>

                                    <div className="flex gap-2 mb-3 flex-wrap">
                                        <span className="px-2 py-1 bg-green-700 text-white text-xs rounded font-medium">
                                            Cash Back Guaranteed
                                        </span>
                                        <span
                                            className={`px-2 py-1 text-white text-xs rounded font-medium ${card.badgeColor}`}>
                                            {card.badge}
                                        </span>
                                        {card.advertisement.categoryName && (
                                            <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded font-medium">
                                                {card.advertisement.categoryName}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <div className="flex items-center gap-4 flex-wrap">
                                            <div className="flex items-center gap-1">
                                                <ThumbsUp className="w-3 h-3"/>
                                                <span>{card.advertisement.allLikes || 0} Likes</span>
                                            </div>
                                            <span>{card.advertisement.allViews || 0} Views</span>
                                            {card.advertisement.markedFakedAt && (
                                                <span>{getTimeAgo(card.advertisement.markedFakedAt)}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-2 text-center py-8">
                        <p className="text-gray-500 text-lg">No advertisements found</p>
                        <p className="text-gray-400 text-sm">Check back later for new listings</p>
                    </div>
                )}
            </div>

            {/* Pagination - Only show if there are multiple pages */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2 mt-8">
                    {/* Previous Button */}
                    <button
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                            currentPage === 1
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                        }`}
                    >
                        <ChevronLeft className="w-4 h-4 mr-1"/>
                        Previous
                    </button>

                    {/* Page Numbers */}
                    <div className="flex space-x-1">
                        {getPageNumbers().map((page, index) => (
                            <button
                                key={index}
                                onClick={() => typeof page === 'number' && handlePageChange(page)}
                                disabled={page === '...'}
                                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                                    page === currentPage
                                        ? 'bg-red-500 text-white'
                                        : page === '...'
                                            ? 'text-gray-400 cursor-default'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                            currentPage === totalPages
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                        }`}
                    >
                        Next
                        <ChevronRight className="w-4 h-4 ml-1"/>
                    </button>
                </div>
            )}

            {/* Results Info */}
            {allCards.length > 0 && (
                <div className="text-center mt-4 text-sm text-gray-600">
                    Showing {startIndex + 1} to {Math.min(endIndex, allCards.length)} of {allCards.length} results
                </div>
            )}
        </div>
    );
}