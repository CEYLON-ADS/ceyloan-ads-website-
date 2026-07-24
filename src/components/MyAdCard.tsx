import { useState, useCallback } from "react";

interface MyAdCardProps {
    id: string;
    title: string;
    description: string;
    likes?: number;
    views?: number;
    phone?: string;
    whatsapp?: string;
    image?: string;
    status: string;
    adType: string;
    isActive: boolean;
    isSelected: boolean;
    onSelect: (id: string, checked: boolean) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onInactive: (id: string) => void;
}

function MyAdCard({
                      id,
                      title,
                      description,
                      likes = 0,
                      views = 0,
                      phone = "",
                      whatsapp = "",
                      image = "https://via.placeholder.com/400x300?text=No+Image",
                      status,
                      adType,
                      isActive,
                      isSelected,
                      onSelect,
                      onEdit,
                      onDelete,
                      onInactive
                  }: MyAdCardProps) {
    const [selectedType, setSelectedType] = useState(adType);
    const [selectedOption, setSelectedOption] = useState("Republish");
    const [imageError, setImageError] = useState(false);
console.log("id is", id)
    // Memoized handlers to prevent unnecessary re-renders
    const handleEdit = useCallback(() => {
        onEdit(id);
    }, [id, onEdit]);

    const handleDelete = useCallback(() => {
        onDelete(id);
    }, [id, onDelete]);

    const handleInactive = useCallback(() => {
        onInactive(id);
    }, [id, onInactive]);

    const handleSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        onSelect(id, e.target.checked);
    }, [id, onSelect]);

    const handleImageError = useCallback(() => {
        if (!imageError) {
            setImageError(true);
        }
    }, [imageError]);

    const handleSubmit = useCallback(() => {
        console.log("Submit clicked", {
            id,
            type: selectedType,
            option: selectedOption
        });
        // TODO: Implement submit functionality
        // This could be used for batch operations like republishing, archiving, etc.
        alert(`Submit action: ${selectedOption} for ${selectedType}`);
    }, [id, selectedType, selectedOption]);

    // Status color helper
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'pending approval':
            case 'pending':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'rejected':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'draft':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'expired':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    // Ad type color helper
    const getAdTypeColor = (adType: string) => {
        switch (adType.toLowerCase()) {
            case 'super ad':
                return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold';
            case 'premium ad':
                return 'bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold';
            case 'regular ad':
                return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    // Determine the image source
    const imageSource = imageError ? "https://via.placeholder.com/400x300?text=No+Image" : image;

    // Truncate text helper
    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg border border-gray-200 p-3 sm:p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
            {/* Mobile Layout (< sm) */}
            <div className="block sm:hidden">
                {/* Mobile Header */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1">
                        <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={handleSelect}
                            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <span className={`px-2 py-1 text-xs rounded font-medium ${getAdTypeColor(adType)}`}>
                                    {adType}
                                </span>
                                <span className={`px-2 py-1 text-xs rounded font-medium ${
                                    isActive
                                        ? 'bg-green-100 text-green-800 border border-green-200'
                                        : 'bg-gray-300 text-gray-700 border border-gray-400'
                                }`}>
                                    {isActive ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                            <h3 className="font-semibold text-gray-900 text-sm leading-tight" title={title}>
                                {truncateText(title, 50)}
                            </h3>
                        </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                        </svg>
                    </button>
                </div>

                {/* Mobile Image */}
                <div className="relative mb-3">
                    <img
                        src={imageSource}
                        alt={title}
                        className="w-full h-48 object-cover rounded-md"
                        onError={handleImageError}
                        loading="lazy"
                    />
                    <div className={`absolute top-2 left-2 px-2 py-1 text-xs rounded font-medium border ${getStatusColor(status)}`}>
                        {status}
                    </div>
                </div>

                {/* Mobile Description */}
                <p className="text-gray-600 text-sm mb-3 line-clamp-3" title={description}>
                    {description}
                </p>

                {/* Mobile Stats */}
                <div className="flex items-center gap-4 text-sm mb-3">
                    <span className="text-blue-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                        </svg>
                        {likes.toLocaleString()}
                    </span>
                    <span className="text-gray-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                        </svg>
                        {views.toLocaleString()}
                    </span>
                </div>

                {/* Mobile Contact */}
                {(phone || whatsapp) && (
                    <div className="p-2 bg-blue-50 rounded-md text-xs text-gray-600 mb-3 border border-blue-200">
                        <div className="space-y-1">
                            {phone && (
                                <div className="flex items-center">
                                    <svg className="w-3 h-3 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                                    </svg>
                                    <span>Phone: {phone}</span>
                                </div>
                            )}
                            {whatsapp && (
                                <div className="flex items-center">
                                    <svg className="w-3 h-3 mr-2 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                                        <path d="M.109 24l1.654-6.053c-1.013-1.759-1.548-3.748-1.547-5.795.003-6.398 5.2-11.594 11.602-11.594 3.101.001 6.016 1.21 8.206 3.403 2.19 2.193 3.396 5.111 3.395 8.208-.003 6.399-5.2 11.595-11.601 11.595-1.943-.001-3.853-.486-5.548-1.414l-6.161 1.65zm6.441-3.718c1.636.973 3.194 1.554 5.262 1.555 5.31 0 9.639-4.325 9.642-9.635.002-5.328-4.307-9.644-9.634-9.646-5.317 0-9.641 4.325-9.643 9.633-.001 2.169.633 3.794 1.704 5.498l-.975 3.565 3.644-.97z"/>
                                    </svg>
                                    <span>WhatsApp: {whatsapp}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Mobile Action Buttons */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                    <button
                        onClick={handleEdit}
                        className="py-2 px-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium text-sm"
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className="py-2 px-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 font-medium text-sm"
                    >
                        Delete
                    </button>
                    <button
                        onClick={handleInactive}
                        className={`py-2 px-3 rounded-md transition-colors duration-200 font-medium text-sm ${
                            isActive
                                ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                                : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                    >
                        {isActive ? 'Deactivate' : 'Activate'}
                    </button>
                </div>

                {/* Mobile Selectors */}
                <div className="space-y-3">
                    <div className="grid grid-cols-1 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            >
                                <option value="Super Ad">Super Ad</option>
                                <option value="Premium Ad">Premium Ad</option>
                                <option value="Regular Ad">Regular Ad</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Option</label>
                            <select
                                value={selectedOption}
                                onChange={(e) => setSelectedOption(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            >
                                <option value="Republish">Republish</option>
                                <option value="Archive">Archive</option>
                                <option value="Featured">Featured</option>
                                <option value="Boost">Boost</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full py-3 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors duration-200 font-medium"
                    >
                        Submit
                    </button>
                </div>
            </div>

            {/* Desktop/Tablet Layout (>= sm) */}
            <div className="hidden sm:block">
                <div className="flex items-start gap-4 mb-4">
                    {/* Checkbox */}
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={handleSelect}
                        className="mt-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />

                    {/* Ad Image */}
                    <div className="relative flex-shrink-0">
                        <img
                            src={imageSource}
                            alt={title}
                            className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 object-cover rounded-md"
                            onError={handleImageError}
                            loading="lazy"
                        />
                        <div className={`absolute top-0 left-0 px-2 py-1 text-xs rounded-tl-md rounded-br-md font-medium border ${getStatusColor(status)}`}>
                            {status}
                        </div>
                    </div>

                    {/* Ad Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className={`px-2 py-1 text-xs rounded font-medium ${getAdTypeColor(adType)}`}>
                                    {adType}
                                </span>
                                <span className={`px-2 py-1 text-xs rounded font-medium border ${
                                    isActive
                                        ? 'bg-green-100 text-green-800 border-green-200'
                                        : 'bg-gray-300 text-gray-700 border-gray-400'
                                }`}>
                                    {isActive ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                                </svg>
                            </button>
                        </div>

                        <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base" title={title}>
                            {title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2" title={description}>
                            {description}
                        </p>

                        <div className="flex items-center gap-6 text-sm mb-3">
                            <span className="text-blue-600 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                                </svg>
                                {likes.toLocaleString()} Likes
                            </span>
                            <span className="text-gray-600 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                                </svg>
                                {views.toLocaleString()} Views
                            </span>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                {(phone || whatsapp) && (
                    <div className="p-3 bg-blue-50 rounded-md mb-4 border border-blue-200">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-600">
                            {phone && (
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                                    </svg>
                                    <span>Phone: {phone}</span>
                                </div>
                            )}
                            {whatsapp && (
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                                    </svg>
                                    <span>WhatsApp: {whatsapp}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 mb-4">
                    <button
                        onClick={handleEdit}
                        className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium text-sm"
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className="flex-1 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 font-medium text-sm"
                    >
                        Delete
                    </button>
                    <button
                        onClick={handleInactive}
                        className={`flex-1 py-2 px-4 rounded-md transition-colors duration-200 font-medium text-sm ${
                            isActive
                                ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                                : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                    >
                        {isActive ? 'Make Inactive' : 'Activate'}
                    </button>
                </div>

                {/* Type and Option Selectors */}
                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            >
                                <option value="Super Ad">Super Ad</option>
                                <option value="Premium Ad">Premium Ad</option>
                                <option value="Regular Ad">Regular Ad</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Option</label>
                            <select
                                value={selectedOption}
                                onChange={(e) => setSelectedOption(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            >
                                <option value="Republish">Republish</option>
                                <option value="Archive">Archive</option>
                                <option value="Featured">Featured</option>
                                <option value="Boost">Boost</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full py-3 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors duration-200 font-medium"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MyAdCard;