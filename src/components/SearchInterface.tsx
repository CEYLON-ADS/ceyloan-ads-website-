import { useState } from "react";

export default function SearchInterface() {
    const [searchQuery, setSearchQuery] = useState("");
    const [hasSearched, setHasSearched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setIsLoading(true);
        setHasSearched(false);

        // Simulate search delay
        setTimeout(() => {
            setHasSearched(true);
            setIsLoading(false);
            console.log("Searching for:", searchQuery);
        }, 1000);
    };

    const handleReset = () => {
        setSearchQuery("");
        setHasSearched(false);
        setIsLoading(false);
    };

    const handleKeyPress = (e: { key: string; }) => {
        if (e.key === "Enter" && !isLoading) {
            handleSearch();
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-3 sm:p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-4 sm:mb-6">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Search Deleted Ads
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                    Search through deleted advertisements and manage your content
                </p>
            </div>

            {/* Search Bar */}
            <div className="mb-4 sm:mb-6">
                {/* Mobile Layout */}
                <div className="block sm:hidden space-y-3">
                    <input
                        type="text"
                        placeholder="Enter search terms..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isLoading}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={handleSearch}
                            disabled={isLoading || !searchQuery.trim()}
                            className="flex-1 px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium text-base flex items-center justify-center"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Searching...
                                </>
                            ) : (
                                "Search"
                            )}
                        </button>
                        <button
                            onClick={handleReset}
                            disabled={isLoading}
                            className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium text-base"
                        >
                            Reset
                        </button>
                    </div>
                </div>

                {/* Desktop/Tablet Layout */}
                <div className="hidden sm:flex gap-3">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Search for deleted ads..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isLoading}
                            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        )}
                    </div>
                    <button
                        onClick={handleSearch}
                        disabled={isLoading || !searchQuery.trim()}
                        className="px-6 sm:px-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium flex items-center justify-center min-w-[100px]"
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            "Search"
                        )}
                    </button>
                    <button
                        onClick={handleReset}
                        disabled={isLoading}
                        className="px-6 sm:px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                    >
                        Reset
                    </button>
                </div>
            </div>

            {/* Search Stats */}
            {searchQuery && (
                <div className="mb-4 text-sm text-gray-600">
                    <span className="bg-gray-100 px-2 py-1 rounded-md">
                        Searching for: "{searchQuery}"
                    </span>
                </div>
            )}

            {/* Loading State */}
            {isLoading && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 mb-6">
                    <div className="flex items-center justify-center">
                        <svg className="animate-spin h-6 w-6 text-blue-600 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-blue-600 font-medium">Searching deleted ads...</span>
                    </div>
                </div>
            )}

            {/* Results Area */}
            {hasSearched && !isLoading && (
                <div className="space-y-4">
                    {/* No Results Message */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 text-center">
                        <div className="flex flex-col items-center">
                            <svg className="w-12 h-12 text-blue-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0118 12c0-4.418-3.582-8-8-8s-8 3.582-8 8c0 2.027.754 3.887 2 5.291"></path>
                            </svg>
                            <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2">
                                No Deleted Ads Found!
                            </h3>
                            <p className="text-blue-600 text-sm sm:text-base mb-4">
                                We couldn't find any deleted ads matching your search criteria.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors duration-200 text-sm font-medium"
                                >
                                    Clear Search
                                </button>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-4 py-2 bg-white border border-blue-300 text-blue-700 rounded-md hover:bg-blue-50 transition-colors duration-200 text-sm font-medium"
                                >
                                    Refresh Page
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Search Tips */}
                    {/*<div className="bg-gray-100 rounded-lg p-3 sm:p-4">*/}
                    {/*    <h4 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">Search Tips:</h4>*/}
                    {/*    <ul className="text-xs sm:text-sm text-gray-600 space-y-1">*/}
                    {/*        <li>• Try using different keywords or phrases</li>*/}
                    {/*        <li>• Check your spelling and try again</li>*/}
                    {/*        <li>• Use broader search terms</li>*/}
                    {/*        <li className="sm:hidden">• Tap "Reset" to clear all filters</li>*/}
                    {/*        <li className="hidden sm:list-item">• Click "Reset" to clear all filters and start over</li>*/}
                    {/*    </ul>*/}
                    {/*</div>*/}
                </div>
            )}

            {/* Quick Actions - Mobile Only */}
            {/*<div className="block sm:hidden mt-6 bg-white rounded-lg border border-gray-200 p-4">*/}
            {/*    <h4 className="font-medium text-gray-800 mb-3">Quick Actions</h4>*/}
            {/*    <div className="grid grid-cols-2 gap-2">*/}
            {/*        <button className="p-3 bg-gray-50 rounded-lg text-center text-sm text-gray-700 hover:bg-gray-100 transition-colors">*/}
            {/*            <div className="text-lg mb-1">🗑️</div>*/}
            {/*            View All Deleted*/}
            {/*        </button>*/}
            {/*        <button className="p-3 bg-gray-50 rounded-lg text-center text-sm text-gray-700 hover:bg-gray-100 transition-colors">*/}
            {/*            <div className="text-lg mb-1">📊</div>*/}
            {/*            Analytics*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/* Footer */}
            {/*<div className="mt-8 pt-6 border-t border-gray-200 text-center text-xs sm:text-sm text-gray-500">*/}
            {/*    <p>Search through your deleted advertisements • Last updated: Just now</p>*/}
            {/*</div>*/}
        </div>
    );
}