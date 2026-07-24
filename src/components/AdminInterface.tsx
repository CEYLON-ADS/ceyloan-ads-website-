import { useState, useEffect, useCallback } from "react";
import MyAdCard from "./MyAdCard.tsx";
import advertisementByUserService, { type GeneralAdvertisement, type GeneralAdvertisementRequestDTO } from "../services/advertisment/adGedByUser.ts";
import { getUserId } from "../services/verifyOTP.ts";

// Loading states enum for better state management
const LoadingState = {
    IDLE: 'idle',
    LOADING: 'loading',
    SEARCHING: 'searching',
    DELETING: 'deleting',
    UPDATING: 'updating'
} as const;

type LoadingState = typeof LoadingState[keyof typeof LoadingState];

interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalElements: number;
    pageSize: number;
    isLastPage: boolean;
    isFirstPage: boolean;
}

// Pagination component
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalElements: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
    isLoading: boolean;
}

const Pagination = ({
                        currentPage,
                        totalPages,
                        totalElements,
                        pageSize,
                        onPageChange,
                        onPageSizeChange,
                        isLoading
                    }: PaginationProps) => {
    const generatePageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            // Show all pages if total pages is small
            for (let i = 0; i < totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Show smart pagination
            if (currentPage <= 2) {
                // Show first few pages
                for (let i = 0; i < 4; i++) {
                    pages.push(i);
                }
                if (totalPages > 4) {
                    pages.push('...');
                    pages.push(totalPages - 1);
                }
            } else if (currentPage >= totalPages - 3) {
                // Show last few pages
                pages.push(0);
                if (totalPages > 4) {
                    pages.push('...');
                }
                for (let i = totalPages - 4; i < totalPages; i++) {
                    if (i > 0) pages.push(i);
                }
            } else {
                // Show pages around current page
                pages.push(0);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages - 1);
            }
        }

        return pages;
    };

    const pageNumbers = generatePageNumbers();
    const startResult = currentPage * pageSize + 1;
    const endResult = Math.min((currentPage + 1) * pageSize, totalElements);

    return (
        <div className="bg-white px-4 py-3 border border-gray-200 rounded-md">
            {/* Mobile Pagination */}
            <div className="flex items-center justify-between sm:hidden">
                <div className="text-sm text-gray-700">
                    Showing {startResult} to {endResult} of {totalElements}
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 0 || isLoading}
                        className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages - 1 || isLoading}
                        className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Desktop Pagination */}
            <div className="hidden sm:flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-700">
                        Showing <span className="font-medium">{startResult}</span> to{' '}
                        <span className="font-medium">{endResult}</span> of{' '}
                        <span className="font-medium">{totalElements}</span> results
                    </div>

                    {/* Page Size Selector */}
                    <div className="flex items-center space-x-2">
                        <label className="text-sm text-gray-700">Show:</label>
                        <select
                            value={pageSize}
                            onChange={(e) => onPageSizeChange(Number(e.target.value))}
                            disabled={isLoading}
                            className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    {/* First Page */}
                    <button
                        onClick={() => onPageChange(0)}
                        disabled={currentPage === 0 || isLoading}
                        className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                        First
                    </button>

                    {/* Previous Page */}
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 0 || isLoading}
                        className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Page Numbers */}
                    <div className="flex space-x-1">
                        {pageNumbers.map((page, index) => (
                            <button
                                key={index}
                                onClick={() => typeof page === 'number' ? onPageChange(page) : undefined}
                                disabled={page === '...' || page === currentPage || isLoading}
                                className={`px-3 py-2 text-sm rounded-md ${
                                    page === currentPage
                                        ? 'bg-blue-600 text-white border border-blue-600'
                                        : page === '...'
                                            ? 'bg-white text-gray-400 cursor-default'
                                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed'
                                }`}
                            >
                                {typeof page === 'number' ? page + 1 : page}
                            </button>
                        ))}
                    </div>

                    {/* Next Page */}
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages - 1 || isLoading}
                        className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Last Page */}
                    <button
                        onClick={() => onPageChange(totalPages - 1)}
                        disabled={currentPage === totalPages - 1 || isLoading}
                        className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                        Last
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function AdminInterface() {
    // Search and filter states
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

    // Selection states
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

    // Data states - Initialize as empty array to prevent undefined error
    const [advertisements, setAdvertisements] = useState<GeneralAdvertisement[]>([]);
    const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
    const [error, setError] = useState<string | null>(null);

    // Pagination states
    const [pagination, setPagination] = useState<PaginationInfo>({
        currentPage: 0,
        totalPages: 0,
        totalElements: 0,
        pageSize: 10,
        isLastPage: true,
        isFirstPage: true
    });

    // New state for pagination mode
    const [paginationMode, setPaginationMode] = useState<'pagination' | 'loadMore'>('pagination');

    // Get user ID
    const userId = getUserId();

    // Debounce search query
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    // Fetch advertisements function
    const fetchAdvertisements = useCallback(async (
        page = 0,
        size = pagination.pageSize,
        reset = false,
        search = debouncedSearchQuery
    ) => {
        if (!userId) {
            setError("User ID is required. Please log in again.");
            return;
        }

        const isInitialLoad = page === 0;
        setLoadingState(isInitialLoad ? LoadingState.LOADING : LoadingState.SEARCHING);
        setError(null);

        try {
            const response = await advertisementByUserService.getAdvertisementsByUserId(
                userId,
                page,
                size,
                search || undefined
            );

            if (response.success && response.data) {
                const {
                    content,
                    totalElements,
                    totalPages,
                    number: currentPage,
                    first: isFirstPage,
                    last: isLastPage
                } = response.data;

                // Ensure content is an array before setting it
                const advertisementContent = Array.isArray(content) ? content : [];

                // Update advertisements based on pagination mode
                if (reset || page === 0 || paginationMode === 'pagination') {
                    setAdvertisements(advertisementContent);
                } else {
                    // For "Load More" functionality - ensure prev is an array
                    setAdvertisements(prev => {
                        const prevArray = Array.isArray(prev) ? prev : [];
                        return [...prevArray, ...advertisementContent];
                    });
                }

                // Update pagination info
                setPagination({
                    currentPage,
                    totalPages,
                    totalElements,
                    pageSize: size,
                    isLastPage,
                    isFirstPage
                });

                // Reset selections if this is a new search or reset
                if (reset || page === 0) {
                    setSelectedItems(new Set());
                    setSelectAll(false);
                }

            } else {
                setError(response.message || "Failed to fetch advertisements");
                if (page === 0) {
                    setAdvertisements([]);
                    setPagination(prev => ({ ...prev, totalElements: 0, totalPages: 0 }));
                }
            }
        } catch (err: any) {
            console.error("Fetch error:", err);
            setError(err.message || "An unexpected error occurred while fetching data");
            if (page === 0) {
                setAdvertisements([]);
                setPagination(prev => ({ ...prev, totalElements: 0, totalPages: 0 }));
            }
        } finally {
            setLoadingState(LoadingState.IDLE);
        }
    }, [userId, pagination.pageSize, debouncedSearchQuery, paginationMode]);

    // Load initial data and when search changes
    useEffect(() => {
        fetchAdvertisements(0, pagination.pageSize, true, debouncedSearchQuery);
    }, [debouncedSearchQuery]);

    // Initial load
    useEffect(() => {
        if (userId) {
            fetchAdvertisements(0, pagination.pageSize, true);
        }
    }, [userId]);

    // Search handlers
    const handleSearch = useCallback(() => {
        if (searchQuery.trim() !== debouncedSearchQuery.trim()) {
            setDebouncedSearchQuery(searchQuery.trim());
        } else {
            fetchAdvertisements(0, pagination.pageSize, true, searchQuery.trim());
        }
    }, [searchQuery, debouncedSearchQuery, pagination.pageSize, fetchAdvertisements]);

    const handleReset = useCallback(() => {
        setSearchQuery("");
        setDebouncedSearchQuery("");
        setSelectedItems(new Set());
        setSelectAll(false);
        setError(null);
        fetchAdvertisements(0, pagination.pageSize, true, "");
    }, [pagination.pageSize, fetchAdvertisements]);

    const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
        }
    }, [handleSearch]);

    // Pagination handlers
    const handlePageChange = useCallback((page: number) => {
        if (page >= 0 && page < pagination.totalPages && loadingState === LoadingState.IDLE) {
            fetchAdvertisements(page, pagination.pageSize, false);
            // Scroll to top when changing pages
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [pagination.totalPages, pagination.pageSize, loadingState, fetchAdvertisements]);

    const handlePageSizeChange = useCallback((size: number) => {
        setPagination(prev => ({ ...prev, pageSize: size }));
        fetchAdvertisements(0, size, true);
    }, [fetchAdvertisements]);

    const handlePaginationModeChange = useCallback((mode: 'pagination' | 'loadMore') => {
        setPaginationMode(mode);
        if (mode === 'pagination') {
            // When switching to pagination mode, reload current page
            fetchAdvertisements(pagination.currentPage, pagination.pageSize, false);
        }
    }, [pagination.currentPage, pagination.pageSize, fetchAdvertisements]);

    // Selection handlers
    const handleSelectAll = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);

        // Ensure advertisements is an array before mapping
        const advertisementsArray = Array.isArray(advertisements) ? advertisements : [];

        if (isChecked) {
            const allIds = new Set(advertisementsArray.map(ad => ad.id));
            setSelectedItems(allIds);
        } else {
            setSelectedItems(new Set());
        }
    }, [advertisements]);

    const handleSelectItem = useCallback((id: string, checked: boolean) => {
        setSelectedItems(prev => {
            const newSelected = new Set(prev);
            if (checked) {
                newSelected.add(id);
            } else {
                newSelected.delete(id);
            }

            // Ensure advertisements is an array before checking length
            const advertisementsArray = Array.isArray(advertisements) ? advertisements : [];
            // Update select all state
            setSelectAll(newSelected.size === advertisementsArray.length && advertisementsArray.length > 0);

            return newSelected;
        });
    }, [advertisements]);

    // Action handlers
    const handleDeleteSelected = useCallback(async () => {
        if (selectedItems.size === 0) return;

        const confirmed = window.confirm(
            `Are you sure you want to delete ${selectedItems.size} advertisement(s)? This action cannot be undone.`
        );

        if (!confirmed) return;

        setLoadingState(LoadingState.DELETING);
        setError(null);

        try {
            // Delete each selected item individually
            const deletePromises = Array.from(selectedItems).map(id =>
                advertisementByUserService.deleteAdvertisement(id)
            );

            await Promise.all(deletePromises);

            // Remove deleted items from local state - ensure prev is an array
            setAdvertisements(prev => {
                const prevArray = Array.isArray(prev) ? prev : [];
                return prevArray.filter(ad => !selectedItems.has(ad.id));
            });
            setSelectedItems(new Set());
            setSelectAll(false);

            // Update pagination info
            setPagination(prev => ({
                ...prev,
                totalElements: Math.max(0, prev.totalElements - selectedItems.size)
            }));

            // Show success message temporarily
            setError("Selected advertisements deleted successfully");

        } catch (err: any) {
            setError(err.message || "An error occurred while deleting advertisements");
        } finally {
            setLoadingState(LoadingState.IDLE);
        }
    }, [selectedItems]);

    const handleEdit = useCallback((id: string) => {
        console.log("Edit ad:", id);
        // TODO: Navigate to edit page or open edit modal
        // For now, just show an alert
        alert(`Edit functionality for ad ${id} would be implemented here`);
    }, []);

    const handleDeleteSingle = useCallback(async (id: string) => {
        // Ensure advertisements is an array before finding
        const advertisementsArray = Array.isArray(advertisements) ? advertisements : [];
        const adToDelete = advertisementsArray.find(ad => ad.id === id);

        const confirmed = window.confirm(
            `Are you sure you want to delete "${adToDelete?.title}"? This action cannot be undone.`
        );

        if (!confirmed) return;

        setLoadingState(LoadingState.DELETING);
        setError(null);

        try {
            await advertisementByUserService.deleteAdvertisement(id);

            // Remove deleted item from local state - ensure prev is an array
            setAdvertisements(prev => {
                const prevArray = Array.isArray(prev) ? prev : [];
                return prevArray.filter(ad => ad.id !== id);
            });
            setSelectedItems(prev => {
                const newSelected = new Set(prev);
                newSelected.delete(id);
                return newSelected;
            });

            // Update pagination info
            setPagination(prev => ({
                ...prev,
                totalElements: Math.max(0, prev.totalElements - 1)
            }));

            setSelectAll(false);
            setError("Advertisement deleted successfully");

        } catch (err: any) {
            setError(err.message || "An error occurred while deleting the advertisement");
        } finally {
            setLoadingState(LoadingState.IDLE);
        }
    }, [advertisements]);

    const handleToggleStatus = useCallback(async (id: string) => {
        // Ensure advertisements is an array before finding
        const advertisementsArray = Array.isArray(advertisements) ? advertisements : [];
        const adToUpdate = advertisementsArray.find(ad => ad.id === id);
        if (!adToUpdate) return;

        setLoadingState(LoadingState.UPDATING);
        setError(null);

        try {
            const newStatus = !adToUpdate.activeStatus;

            // Create update data - you'll need to adjust this based on your actual DTO structure
            const updateData: GeneralAdvertisementRequestDTO = {
                // Add the properties you want to update
                // For example, if you want to update the status:
                // activeStatus: newStatus
                // You'll need to check what properties your backend expects
            };

            await advertisementByUserService.updateAdvertisement(id, updateData);

            // Update local state - ensure prev is an array
            setAdvertisements(prev => {
                const prevArray = Array.isArray(prev) ? prev : [];
                return prevArray.map(ad =>
                    ad.id === id ? { ...ad, activeStatus: newStatus } : ad
                );
            });

            setError(`Advertisement ${newStatus ? 'activated' : 'deactivated'} successfully`);

        } catch (err: any) {
            setError(err.message || "An error occurred while updating the advertisement");
        } finally {
            setLoadingState(LoadingState.IDLE);
        }
    }, [advertisements]);

    const handleContactAdmin = useCallback(() => {
        // TODO: Implement contact admin functionality
        // This could open a modal, navigate to contact page, or open email client
        console.log("Contacting admin...");
        alert("Contact admin functionality would be implemented here");
    }, []);

    const handleLoadMore = useCallback(() => {
        if (!pagination.isLastPage && loadingState === LoadingState.IDLE) {
            fetchAdvertisements(pagination.currentPage + 1, pagination.pageSize, false);
        }
    }, [pagination.isLastPage, pagination.currentPage, pagination.pageSize, loadingState, fetchAdvertisements]);

    // Computed values - ensure advertisements is always an array
    const advertisementsArray = Array.isArray(advertisements) ? advertisements : [];
    const isLoading = loadingState === LoadingState.LOADING;
    const isSearching = loadingState === LoadingState.SEARCHING;
    const isDeleting = loadingState === LoadingState.DELETING;
    const isUpdating = loadingState === LoadingState.UPDATING;
    const hasData = advertisementsArray.length > 0;
    const showLoadMore = hasData && !pagination.isLastPage && loadingState === LoadingState.IDLE && paginationMode === 'loadMore';

    return (
        <div className="w-full max-w-7xl mx-auto p-3 sm:p-4 md:p-6 bg-gray-50 min-h-screen">
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6">
                <input
                    type="text"
                    placeholder="Search advertisements..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md text-sm sm:text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading || isDeleting || isUpdating}
                />
                <div className="flex gap-2 sm:gap-3">
                    <button
                        onClick={handleSearch}
                        disabled={isLoading || isDeleting || isUpdating}
                        className="flex-1 sm:flex-none px-4 sm:px-8 py-2 sm:py-3 bg-gray-800 text-white rounded-md hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium text-sm sm:text-base"
                    >
                        {isSearching ? "Searching..." : "Search"}
                    </button>
                    <button
                        onClick={handleReset}
                        disabled={isLoading || isDeleting || isUpdating}
                        className="flex-1 sm:flex-none px-4 sm:px-8 py-2 sm:py-3 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium text-sm sm:text-base"
                    >
                        Reset
                    </button>
                </div>
            </div>

            {/* Pagination Mode Toggle */}
            {!isLoading && hasData && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 bg-white p-3 sm:p-4 rounded-md border border-gray-200">
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-700 font-medium">View Mode:</span>
                        <div className="flex rounded-md border border-gray-300 overflow-hidden">
                            <button
                                onClick={() => handlePaginationModeChange('pagination')}
                                className={`px-3 py-1 text-sm font-medium transition-colors ${
                                    paginationMode === 'pagination'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                Pagination
                            </button>
                            <button
                                onClick={() => handlePaginationModeChange('loadMore')}
                                className={`px-3 py-1 text-sm font-medium transition-colors border-l border-gray-300 ${
                                    paginationMode === 'loadMore'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                Load More
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Admin Contact Notice */}
            <div className="bg-green-50 border border-green-200 rounded-md p-3 sm:p-4 mb-4 sm:mb-6 text-center">
                <p className="text-green-700 mb-2 text-sm sm:text-base">
                    ඔබගේ ප්‍රකාශනය සදහා Admin සහය ලබාගන්න.
                </p>
                <p className="text-green-600 mb-3 text-sm sm:text-base">For any question, please contact Admin.</p>
                <button
                    onClick={handleContactAdmin}
                    className="inline-flex items-center px-3 sm:px-4 py-2 bg-white border border-green-300 rounded-md text-green-600 hover:bg-green-50 transition-colors duration-200 text-sm sm:text-base"
                >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                    </svg>
                    <span className="hidden sm:inline">Contact Admin</span>
                    <span className="sm:hidden">Contact</span>
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3 sm:p-4 mb-4 sm:mb-6">
                    <div className="flex items-start">
                        <svg className="w-5 h-5 text-red-400 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                        </svg>
                        <div>
                            <h3 className="text-sm font-medium text-red-800">Error</h3>
                            <p className="text-red-700 text-sm mt-1">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* User ID Missing Warning */}
            {!userId && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 sm:p-4 mb-4 sm:mb-6">
                    <div className="flex items-start">
                        <svg className="w-5 h-5 text-yellow-400 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                        </svg>
                        <div>
                            <h3 className="text-sm font-medium text-yellow-800">Authentication Required</h3>
                            <p className="text-yellow-700 text-sm mt-1">Please log in to view your advertisements.</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Loading Indicator */}
            {isLoading && (
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
                    <p className="mt-3 text-gray-600 text-sm sm:text-base">Loading advertisements...</p>
                </div>
            )}

            {/* Select All and Delete */}
            {!isLoading && hasData && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6 bg-white p-3 sm:p-4 rounded-md border border-gray-200">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAll}
                            disabled={isDeleting || isUpdating}
                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-gray-700 text-sm sm:text-base">Select All</span>
                    </label>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <button
                            onClick={handleDeleteSelected}
                            className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed transition-colors duration-200 text-sm sm:text-base font-medium inline-flex items-center justify-center"
                            disabled={selectedItems.size === 0 || isDeleting || isUpdating}
                        >
                            {isDeleting ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    Delete Selected
                                    {selectedItems.size > 0 && (
                                        <span className="ml-1 bg-red-600 px-1.5 py-0.5 rounded-full text-xs">
                                            {selectedItems.size}
                                        </span>
                                    )}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* Results Counter - Mobile */}
            {!isLoading && hasData && (
                <div className="block sm:hidden mb-3">
                    <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>Results: {pagination.totalElements}</span>
                        {selectedItems.size > 0 && (
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                {selectedItems.size} selected
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Ad Listings Header - Desktop */}
            {!isLoading && hasData && (
                <div className="hidden sm:flex justify-between items-center mb-4 text-sm text-gray-600">
                    <span>
                        Showing {advertisementsArray.length} of {pagination.totalElements} results
                        {debouncedSearchQuery && (
                            <span className="ml-2 text-blue-600">
                                for "{debouncedSearchQuery}"
                            </span>
                        )}
                    </span>
                    {selectedItems.size > 0 && (
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                            {selectedItems.size} item(s) selected
                        </span>
                    )}
                </div>
            )}

            {/* No Results */}
            {!isLoading && !hasData && !error && userId && (
                <div className="text-center py-12 bg-white rounded-md border border-gray-200">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No advertisements found</h3>
                    <p className="text-gray-500 text-sm sm:text-base mb-4">
                        {debouncedSearchQuery
                            ? `No results found for "${debouncedSearchQuery}". Try adjusting your search terms.`
                            : "You haven't created any advertisements yet."
                        }
                    </p>
                    {debouncedSearchQuery && (
                        <button
                            onClick={handleReset}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                        >
                            Clear search
                        </button>
                    )}
                </div>
            )}

            {/* Ad Listings */}
            {!isLoading && hasData && (
                <div className="space-y-3 sm:space-y-4">
                    {advertisementsArray.map((ad) => (
                        <MyAdCard
                            key={ad.id}
                            id={ad.id}
                            title={ad.title}
                            description={""} // Not available in API response
                            likes={ad.allLikes || 0}
                            views={ad.allViews || 0}
                            phone={ad.userMobileNumber || ""}
                            whatsapp={ad.whatsapp ? "Available" : "Not Available"}
                            image={ad.imageUrls && ad.imageUrls.length > 0 ? ad.imageUrls[0].url : ""}
                            status={"active"} // Not available in API response
                            adType={ad.categoryName}
                            isActive={ad.activeStatus}
                            isSelected={selectedItems.has(ad.id)}
                            onSelect={handleSelectItem}
                            onEdit={handleEdit}
                            onDelete={handleDeleteSingle}
                            onInactive={handleToggleStatus}
                        />
                    ))}
                </div>
            )}

            {/* Loading more indicator */}
            {isSearching && pagination.currentPage > 0 && (
                <div className="text-center mt-6 py-4">
                    <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-gray-800"></div>
                    <p className="mt-2 text-gray-600 text-sm">Loading more...</p>
                </div>
            )}

            {/* Pagination Controls */}
            {!isLoading && hasData && paginationMode === 'pagination' && pagination.totalPages > 1 && (
                <div className="mt-6 sm:mt-8">
                    <Pagination
                        currentPage={pagination.currentPage}
                        totalPages={pagination.totalPages}
                        totalElements={pagination.totalElements}
                        pageSize={pagination.pageSize}
                        onPageChange={handlePageChange}
                        onPageSizeChange={handlePageSizeChange}
                        isLoading={isSearching}
                    />
                </div>
            )}

            {/* Load More Button */}
            {showLoadMore && (
                <div className="text-center mt-6 sm:mt-8">
                    <button
                        onClick={handleLoadMore}
                        className="px-6 sm:px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 text-sm sm:text-base font-medium inline-flex items-center"
                    >
                        Load More Results
                        <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <p className="mt-2 text-xs text-gray-500">
                        Showing {advertisementsArray.length} of {pagination.totalElements}
                    </p>
                </div>
            )}

            {/* Footer Info - Mobile */}
            {!isLoading && hasData && (
                <div className="block sm:hidden mt-6 p-3 bg-white rounded-md border border-gray-200">
                    <div className="text-center text-xs text-gray-500 space-y-1">
                        <p>Total: {pagination.totalElements} ads</p>
                        <p>Page {pagination.currentPage + 1} of {pagination.totalPages}</p>
                        <p>Last updated: Just now</p>
                    </div>
                </div>
            )}

            {/* Footer Info - Desktop */}
            {!isLoading && hasData && (
                <div className="hidden sm:block mt-8 text-center text-sm text-gray-500">
                    <p>
                        Total: {pagination.totalElements} ads •
                        Page {pagination.currentPage + 1} of {pagination.totalPages} •
                        Last updated: Just now
                    </p>
                </div>
            )}
        </div>
    );
}