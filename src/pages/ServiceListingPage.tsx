import  { useState } from 'react';
import { Heart, Phone, MapPin, Eye, Clock } from 'lucide-react';
import ContactInfoCard from "../components/ContactInfoCard.tsx";

export default function ServiceListingCard() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    const images = [
        '../../public/image1.png',
        'https://images6.alphacoders.com/462/thumb-1920-462371.jpg',
        'https://wallpaperaccess.com/full/1154341.jpg',
        'https://wallpapercave.com/wp/wp2634222.jpg',
        'https://images5.alphacoders.com/343/thumb-1920-343645.jpg'
    ];

    const serviceFeatures = [
        '🌟 PROFESSIONAL SERVICE',
        '🛡️ SAFE & SECURE',
        '🎯 EXPERIENCED PROVIDER',
        '🏠 HOME VISITS AVAILABLE',
        '📞 24/7 SUPPORT',
        '💎 PREMIUM QUALITY',
        '🚀 QUICK RESPONSE',
        '💼 BUSINESS CERTIFIED',
        '🎨 CUSTOM SOLUTIONS',
        '🔒 CONFIDENTIAL',
        '⚡ FAST DELIVERY',
        '📍 MULTIPLE LOCATIONS',
        '🎪 EVENT SERVICES',
        '🤝 CONSULTATION INCLUDED',
        '💯 SATISFACTION GUARANTEED'
    ];

    const getSlidePosition = (index: number) => {
        const diff = index - currentImageIndex;
        const totalSlides = images.length;

        // Normalize difference to handle wrap-around
        let normalizedDiff = diff;
        if (diff > totalSlides / 2) normalizedDiff -= totalSlides;
        if (diff < -totalSlides / 2) normalizedDiff += totalSlides;

        if (normalizedDiff === 0) {
            // Current/focused image
            return {
                transform: 'translateX(-50%) scale(1)',
                zIndex: 30,
                opacity: 1,
                left: '50%'
            };
        } else if (normalizedDiff === 1) {
            // Next image (right side)
            return {
                transform: 'translateX(-30%) scale(0.8)',
                zIndex: 20,
                opacity: 0.7,
                left: '70%'
            };
        } else if (normalizedDiff === -1) {
            // Previous image (left side)
            return {
                transform: 'translateX(-70%) scale(0.8)',
                zIndex: 20,
                opacity: 0.7,
                left: '30%'
            };
        } else if (normalizedDiff === 2) {
            // Next to next (far right)
            return {
                transform: 'translateX(-10%) scale(0.6)',
                zIndex: 10,
                opacity: 0.4,
                left: '85%'
            };
        } else if (normalizedDiff === -2) {
            // Previous to previous (far left)
            return {
                transform: 'translateX(-90%) scale(0.6)',
                zIndex: 10,
                opacity: 0.4,
                left: '15%'
            };
        } else {
            // Hidden slides
            return {
                transform: normalizedDiff > 0 ? 'translateX(50%) scale(0.5)' : 'translateX(-150%) scale(0.5)',
                zIndex: 1,
                opacity: 0,
                left: normalizedDiff > 0 ? '100%' : '0%'
            };
        }
    };

    return (
        <div className="w-full mx-auto bg-white overflow-hidden">
            {/* Swiper-style Image Carousel */}
            <div className="relative w-full h-120 overflow-hidden mb-8">
                <div className="relative w-full h-full">
                    {images.map((src, index) => {
                        const slideStyle = getSlidePosition(index);

                        return (
                            <div
                                key={index}
                                className="absolute top-1/2 w-120 h-full cursor-pointer transition-all duration-500 ease-out"
                                style={{
                                    ...slideStyle,
                                    transform: `${slideStyle.transform} translateY(-50%)`
                                }}
                                onClick={() => setCurrentImageIndex(index)}
                            >
                                <div className="w-full h-full rounded-lg overflow-hidden shadow-xl">
                                    <img
                                        src={src}
                                        alt={`Service image ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Overlay for non-focused images */}
                                    {index !== currentImageIndex && (
                                        <div className="absolute inset-0 bg-black/30"></div>
                                    )}
                                </div>

                                {/* Optional slide number indicator */}
                                {/*<div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">*/}
                                {/*    {index + 1}*/}
                                {/*</div>*/}
                            </div>
                        );
                    })}
                </div>

                {/* Navigation arrows */}
                <button
                    onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 text-gray-800 p-2 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 z-40"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 text-gray-800 p-2 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 z-40"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Dot indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === currentImageIndex
                                    ? 'bg-white scale-125'
                                    : 'bg-white/50 hover:bg-white/70'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>0 Likes</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>4500 Views</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>4h ago</span>
                        </div>
                    </div>
                </div>

                {/* Price */}
                <div className="text-center mb-4">
                    <span className="text-3xl font-bold text-purple-600">Rs. 6,000.00</span>
                </div>

                {/* Title */}
                <h3 className="text-center text-gray-800 mb-2">
                    💎 Professional Service Provider 💎 0770567870 📱 (23 y) • 💎 Premium Service 6000/= 💎 Verified Provider 📸
                </h3>

                {/* Location */}
                <div className="flex items-center justify-center text-gray-600 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>Location: Dehiwala, Wellawatta</span>
                </div>

                {/* Contact Buttons */}
                <div className="flex space-x-2 mb-4">
                    <button
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded flex items-center justify-center hover:bg-green-700 transition-colors">
                        <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.687"/>
                        </svg>Message +94 76 100 4555
                    </button>
                    <button
                        className="flex-1 bg-green-700 text-white py-2 px-4 rounded flex items-center justify-center hover:bg-green-800 transition-colors">
                        <Phone className="w-4 h-4 mr-2"/>
                        Call +94 76 100 4555
                    </button>
                </div>


                {/* Action Buttons */}
                <div className="flex space-x-2 mb-4">
                    <button
                        onClick={() => setIsLiked(!isLiked)}
                        className={`flex-1 py-2 px-4 rounded font-medium transition-colors ${
                            isLiked
                                ? 'bg-pink-600 text-white'
                                : 'bg-pink-500 text-white hover:bg-pink-600'
                        }`}
                    >
                        Like
                    </button>
                    <button className="flex-1 py-2 px-4 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors">
                        Save
                    </button>
                    <button className="flex-1 py-2 px-4 bg-gray-600 text-white rounded font-medium hover:bg-gray-700 transition-colors">
                        Share
                    </button>
                </div>


                {/* Verification Badge */}
                <div className="bg-green-100 border border-green-300 rounded p-2 mb-4">
                    <span className="text-green-800 text-sm">✅ 100% Real Provider 100% Real Service 100% Verified</span>
                </div>

                {/* Description */}
                <div className="text-gray-700 text-sm mb-4">
                    <p className="mb-2">Hi Gentlemen!</p>
                    <p className="mb-2">I am professional and very experienced service provider. We can meet in my
                        place.</p>
                    <p>For more info WhatsApp please for all information.. 🌹 +94761107621</p>
                    <div className="mt-2">
                        <span className="text-orange-500">😍</span>
                        <span className="text-red-500">❤️</span>
                    </div>
                </div>

                {/* Service Features */}
                <div className="space-y-1">
                    {serviceFeatures.map((feature, index) => (
                        <div key={index} className="text-xs text-gray-600 flex items-center">
                            <span className="mr-2">•</span>
                            <span>{feature}</span>
                        </div>
                    ))}
                </div>

                {/* Additional Info */}
                <div className="mt-4 text-xs text-gray-500 border-t pt-3">
                    <p>💫 Experience on Body = YES</p>
                </div>
            </div>
            <ContactInfoCard/>
        </div>
    );
}