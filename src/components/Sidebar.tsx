import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import categoryService, {type CategoryResponseDTO } from '../services/category/CategoryService.ts';

const Sidebar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [categories, setCategories] = useState<CategoryResponseDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await categoryService.getAllCategories(0, 100);
                if (response.data && response.data.dataList) {
                    setCategories(response.data.dataList);
                }
            } catch (err) {
                console.error("Failed to fetch categories:", err);
                setError("Failed to load categories");
                // Fallback to default categories if API fails
                setCategories(getDefaultCategories());
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Function to map category names to routes
    const getCategoryRoute = (categoryName: string, propertyId:string): string => {
        const routeMap: Record<string, string> = {
            'Girls Personal': `/girlspersonal?categoryId=${propertyId}`,
            'GirlsPersonal': `/girlspersonal?categoryId=${propertyId}`,
            'Services': `/servicescategory?categoryId=${propertyId}`,
            'Live Cam': `/livecam?categoryId=${propertyId}`,
            'LiveCam': `/livecam?categoryId=${propertyId}`,
            'Spa': `/spa?categoryId=${propertyId}`,
            'Chat': `/chat?categoryId=${propertyId}`,
            'BoysPersonal': `/boyspersonal?categoryId=${propertyId}`,
            'Boys Personal': `/boyspersonal?categoryId=${propertyId}`,
            'Shemale': `/shemale?categoryId=${propertyId}`,
            'Rent': `/rent?categoryId=${propertyId}`,
            'Sale': `/sale?categoryId=${propertyId}`,
            'ToysAccessories': `/toysaccessories?categoryId=${propertyId}`,
            'Medicine': `/medicine?categoryId=${propertyId}`,
            'Rooms': `/rooms?categoryId=${propertyId}`,
            'LankanJobs': `/lankanjobs?categoryId=${propertyId}`
        };

        // Find the matching route or use generic category route with categoryId
        return routeMap[categoryName] || `/category/${encodeURIComponent(categoryName.toLowerCase())}?categoryId=${propertyId}`;
    };

    // Default categories in case API fails
    const getDefaultCategories = (): CategoryResponseDTO[] => {
        return [
            { propertyId: '1', categoryName: 'GirlsPersonal', activeStatus: true },
            { propertyId: '2', categoryName: 'Services', activeStatus: true },
            { propertyId: '3', categoryName: 'LiveCam', activeStatus: true },
            { propertyId: '4', categoryName: 'Spa', activeStatus: true },
            { propertyId: '5', categoryName: 'Chat', activeStatus: true },
            { propertyId: '6', categoryName: 'BoysPersonal', activeStatus: true },
            { propertyId: '7', categoryName: 'Shemale', activeStatus: true },
            { propertyId: '8', categoryName: 'Rent', activeStatus: true },
            { propertyId: '9', categoryName: 'Sale', activeStatus: true },
            { propertyId: '10', categoryName: 'ToysAccessories', activeStatus: true },
            { propertyId: '11', categoryName: 'Medicine', activeStatus: true },
            { propertyId: '12', categoryName: 'Rooms', activeStatus: true },
            { propertyId: '13', categoryName: 'LankanJobs', activeStatus: true }
        ];
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleCategorySelect = (category: CategoryResponseDTO) => {
        setSelectedCategory(category.propertyId);
        const route = getCategoryRoute(category.categoryName, category.propertyId);
        navigate(route);
        setIsMobileMenuOpen(false);
    };

    const handleHowToPublishAds = () => {
        navigate('/howtopublishads');
        setIsMobileMenuOpen(false);
    };

    const SidebarContent = () => (
        <div className="w-full p-2 bg-white text-sm h-full overflow-y-auto">
            <button
                onClick={handleHowToPublishAds}
                className="relative w-full rounded-md text-white bg-gradient-to-r from-pink-400 via-pink-600 to-pink-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
                <span className="relative z-10">How to Publish Ads</span>

            </button>

            <div className="mb-5">
                <h3 className="text-base font-semibold text-pink-700 border-b border-pink-200 pb-2">Categories</h3>
                {loading ? (
                    <div className="mt-2 text-center">Loading categories...</div>
                ) : error ? (
                    <div className="mt-2 text-center text-red-500">{error}</div>
                ) : (
                    <ul className="mt-2 space-y-1">
                        {categories
                            .filter(category => category.activeStatus)
                            .map((category) => (
                                <li key={category.propertyId}>
                                    <button
                                        onClick={() => handleCategorySelect(category)}
                                        className={`flex items-center w-full text-left p-1 rounded transition-all duration-200 cursor-pointer ${
                                            selectedCategory === category.propertyId
                                                ? 'bg-pink-100 text-pink-700 shadow-sm'
                                                : 'hover:bg-pink-50 text-gray-700'
                                        }`}
                                    >
                                        <div className="relative mr-3">
                                            <input
                                                type="radio"
                                                name="category"
                                                checked={selectedCategory === category.propertyId}
                                                onChange={() => {
                                                }} // Controlled by button click
                                                className="appearance-none w-4 h-4 border-2 border-gray-400 rounded-full cursor-pointer"
                                            />
                                            {selectedCategory === category.propertyId && (
                                                <div
                                                    className="absolute inset-0 w-4 h-4 border-2 border-pink-500 rounded-full">
                                                    <div className="absolute inset-1 bg-pink-500 rounded-full"></div>
                                                </div>
                                            )}
                                        </div>
                                        <span className={`font-medium ${
                                            selectedCategory === category.propertyId ? 'text-pink-700' : 'text-gray-700'
                                        }`}>
                                            {category.categoryName}
                                        </span>
                                    </button>
                                </li>
                            ))}
                    </ul>
                )}
            </div>

            <div className="flex flex-wrap gap-2">
                <button
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-3 py-1.5 text-center cursor-pointer me-2 mb-2">
                    <span className="text-xs">Agents</span>
                </button>
                <button
                    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-3 py-1.5 text-center cursor-pointer me-2 mb-2">
                    <span className="text-xs">Fake Ads</span>
                </button>
                <button
                    className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-2 py-1.5 text-center cursor-pointer me-2 mb-2">
                    <span className="text-xs">My Saved Ads</span>
                </button>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row gap-2">
                <button
                    className="flex-1 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg cursor-pointer text-sm px-4 py-1.5 text-center me-2 mb-2">
                    <span className="text-sm">📞 Subscribe</span>
                </button>
                <button
                    className="flex-1 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg cursor-pointer text-sm px-4 py-1.5 text-center me-2 mb-2">
                    <span className="text-sm">📧 Subscribe</span>
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Hamburger Button */}
            <button
                onClick={toggleMobileMenu}
                className="md:hidden fixed top-14 left-4 z-50 p-2 bg-white rounded-md shadow-lg border border-gray-300 cursor-pointer"
            >
                {isMobileMenuOpen ? (
                    <X className="w-6 h-6 text-gray-600"/>
                ) : (
                    <Menu className="w-6 h-6 text-gray-600"/>
                )}
            </button>

            {/* Desktop Sidebar */}
            <div className="hidden md:block w-72 border-r border-gray-300">
                <SidebarContent/>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-40">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50"
                        onClick={toggleMobileMenu}
                    />

                    {/* Sidebar */}
                    <div className="fixed top-10 left-0 w-80 h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
                        {/* Close button inside sidebar */}
                        <div className="flex justify-end p-4">
                            <button
                                onClick={toggleMobileMenu}
                                className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"
                            >
                                <X className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                        <SidebarContent/>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;