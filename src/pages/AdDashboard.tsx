import React, {useEffect, useState} from "react";
import AdForm from "../components/AdForm.tsx";
import AdPaymentSuccess from "../components/AdPayment.tsx";
import SearchInterface from "../components/SearchInterface.tsx";
import AdminInterface from "../components/AdminInterface.tsx";
import categoryService, {type CategoryResponseDTO} from "../services/category/CategoryService.ts";
import {useSearchParams} from "react-router-dom";



const AdTypeSelection: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("New Ad");
    const [selectedAdType, setSelectedAdType] = useState<string>("");
    const [showAdForm, setShowAdForm] = useState<boolean>(false);
    const [currentAdType, setCurrentAdType] = useState<string>("");
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>(""); // Add this state
    const [categories, setCategories] = useState<CategoryResponseDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [selectedCategoryName, setSelectedCategoryName] = useState<string>("");

    const [searchParams] = useSearchParams();
    const phoneNumberSend: string = searchParams.get('phoneNumberSend') as string;



    // Load categories on component mount
    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await categoryService.getAllCategories(0, 100); // Get first 100 categories

            // Handle the correct response structure based on your backend
            if (response?.data?.dataList && Array.isArray(response.data.dataList)) {
                // Use dataList from PaginateCategoryDTO
                setCategories(response.data.dataList);
            } else if (response?.data && Array.isArray(response.data)) {
                // Fallback if response.data is directly an array
                setCategories(response.data);
            } else {
                console.warn('Unexpected response format:', response);
                throw new Error('Invalid response format');
            }
        } catch (err: any) {
            console.error('Error loading categories:', err);
            setError(err.message || 'Failed to load categories');
            // Fallback to default categories if API fails
            setCategories([
                {propertyId: "1", categoryName: "Girls Personal", activeStatus: true},
                {propertyId: "2", categoryName: "Services", activeStatus: true},
                {propertyId: "3", categoryName: "Live Cam", activeStatus: true},
            ]);
        } finally {
            setLoading(false);
        }
    };


    const handleAdTypeSelect = (category: CategoryResponseDTO) => {

        setSelectedAdType(category.propertyId);
        setCurrentAdType(category.categoryName);
        setSelectedCategoryId(category.propertyId);
        setSelectedCategoryName(category.categoryName)// Store the category ID
        console.log("Selected ad type:", category);

        // Show form for Girls Personal, others can be handled later
        if (category.categoryName === "Girls Personal") {
            setShowAdForm(true);
        }
        else if (category.categoryName === "Live Cam") {
            setShowAdForm(true);
        }

    };

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        // Reset form state when switching tabs
        if (tab !== "New Ad") {
            setShowAdForm(false);
            setSelectedAdType("");
            setCurrentAdType("");
            setSelectedCategoryId("");

        }
        console.log("Tab clicked:", tab);
    };

    const handleBackToAdTypes = () => {
        setShowAdForm(false);
        setSelectedAdType("");
        setCurrentAdType("");
        setSelectedCategoryId(""); // Reset category ID
    };

    const renderCategoryGrid = () => {
        if (loading) {
            return (
                <div className="flex justify-center items-center py-8">
                    <div className="flex items-center space-x-2">
                        <svg className="animate-spin h-5 w-5 text-pink-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-gray-600">Loading categories...</span>
                    </div>
                </div>
            );
        }

        if (error && (!categories || categories.length === 0)) {
            return (
                <div className="text-center py-8">
                    <div className="text-red-600 mb-4">{error}</div>
                    <button
                        onClick={loadCategories}
                        className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            );
        }

        // Ensure categories is an array before filtering
        if (!Array.isArray(categories)) {
            console.error('Categories is not an array:', categories);
            return (
                <div className="text-center py-8 text-gray-600">
                    Invalid category data format
                </div>
            );
        }

        // Only show active categories
        const activeCategories = categories.filter(category =>
            category && typeof category === 'object' && category.activeStatus
        );

        if (activeCategories.length === 0) {
            return (
                <div className="text-center py-8 text-gray-600">
                    No active categories available
                </div>
            );
        }

        return (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {activeCategories.map((category) => (
                    <button
                        key={category.propertyId}
                        onClick={() => handleAdTypeSelect(category)}
                        className={`p-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
                            selectedAdType === category.propertyId
                                ? "bg-pink-600 text-white shadow-md transform scale-105"
                                : "bg-gray-300 text-gray-800 hover:bg-pink-500 hover:text-white"
                        }`}
                    >
                        {category.categoryName}
                    </button>
                ))}
            </div>
        );
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case "My Ads":
                return (
                    <div className="p-6">
                        <AdminInterface />
                    </div>
                );
            case "New Ad":
                // Show form if ad type is selected and it's Girls Personal
                if (showAdForm && currentAdType === "Girls Personal" || currentAdType === "Live Cam") {
                    return (
                        <div className="p-6">
                            <div className="mb-4">
                                <button
                                    onClick={handleBackToAdTypes}
                                    className="text-pink-600 hover:text-pink-700 font-medium flex items-center space-x-1"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    <span>Back to Ad Types</span>
                                </button>
                            </div>
                            <AdForm
                                categoryName={selectedCategoryName}
                                phoneNumber={phoneNumberSend}
                                categoryID={selectedCategoryId} // Pass the correct category ID
                            />

                        </div>
                    );
                }

                // Otherwise show ad type selection
                return (
                    <div className="space-y-4 p-6">
                        <h2 className="text-xl font-semibold text-pink-600 mb-4">Select Your Ad Type</h2>

                        {/* Category Grid */}
                        {renderCategoryGrid()}

                        {/* Selected Ad Type Display */}
                        {selectedAdType && !showAdForm && (
                            <div className="mt-6 p-4 bg-pink-50 border border-pink-200 rounded-lg">
                                <p className="text-pink-800 font-medium">
                                    Selected Ad Type: <span className="font-bold">{currentAdType}</span>
                                </p>
                                <p className="text-pink-600 text-sm mt-1">
                                    Category ID: <span className="font-mono">{selectedCategoryId}</span>
                                </p>
                                {currentAdType !== "Girls Personal" && (
                                    <p className="text-pink-600 text-sm mt-2">
                                        Form for this ad type is coming soon!
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                );
            case "Recover":
                return (
                    <div className="p-6">
                        <SearchInterface />
                    </div>
                );
            case "Top up":
                return (
                    <div className="p-6">
                        <AdPaymentSuccess />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-8xl mx-auto bg-white p-4 sm:p-6 space-y-6">
            {/* Account Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="text-xs text-gray-600 font-medium mb-1">Account ID</h3>
                    <p className="text-lg font-bold text-gray-800">#35243</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="text-xs text-gray-600 font-medium mb-1">Account Type</h3>
                    <p className="text-lg font-bold text-gray-800">User</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="text-xs text-gray-600 font-medium mb-1">All Ads</h3>
                    <p className="text-lg font-bold text-gray-800">0</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="text-xs text-gray-600 font-medium mb-1">Credits</h3>
                    <p className="text-lg font-bold text-gray-800">Rs. 0.00</p>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
                <div className="flex space-x-0">
                    {["My Ads", "New Ad", "Recover", "Top up"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabClick(tab)}
                            className={`px-6 py-3 font-medium text-sm border-2 transition-all duration-200 ${
                                activeTab === tab
                                    ? "bg-white border-gray-300 text-gray-800 -mb-px border-b-white z-10"
                                    : "bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-50 border-b-gray-200"
                            } ${tab === "My Ads" ? "rounded-tl-lg" : ""} ${tab === "Top up" ? "rounded-tr-lg" : ""}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white border border-gray-200 rounded-b-lg">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default AdTypeSelection;