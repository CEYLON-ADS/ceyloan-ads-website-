import React, { useState, useEffect, useRef } from 'react';
import { Country, City } from 'country-state-city';

interface CityOption {
    value: string;
    label: string;
}

const SearchBar: React.FC = () => {
    const [cities, setCities] = useState<CityOption[]>([]);
    const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [citySearchQuery, setCitySearchQuery] = useState<string>('');
    const [isCityDropdownOpen, setIsCityDropdownOpen] = useState<boolean>(false);
    const cityDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
            // Load Sri Lankan cities
            const loadSriLankanCities = () => {
                try {
                    // Get Sri Lanka (country code: LK)
                    const sriLanka = Country.getCountryByCode('LK');

                    if (sriLanka) {
                        // Get all cities in Sri Lanka
                        const cityData:any = City.getCitiesOfCountry(sriLanka.isoCode);

                        const cityOptions: CityOption[] = cityData
                            .filter((city: { name: string | any[]; }) => city.name && city.name.length > 2) // Filter valid city names
                            .map((city: { name: string; }) => ({
                                value: city.name.toLowerCase().replace(/\s+/g, '-'),
                                label: city.name
                            }))
                            .sort((a: { label: string; }, b: { label: any; }) => a.label.localeCompare(b.label)) // Sort alphabetically
                            .slice(0, 200); // Limit to 200 cities for performance

                        setCities(cityOptions);
                    }
                } catch (error) {
                    console.error('Error loading cities:', error);
                    // Fallback to popular Sri Lankan cities
                    setCities([
                        {value: 'colombo', label: 'Colombo'},
                        {value: 'kandy', label: 'Kandy'},
                        {value: 'galle', label: 'Galle'},
                        {value: 'negombo', label: 'Negombo'},
                        {value: 'jaffna', label: 'Jaffna'},
                        {value: 'anuradhapura', label: 'Anuradhapura'},
                        {value: 'polonnaruwa', label: 'Polonnaruwa'},
                        {value: 'batticaloa', label: 'Batticaloa'},
                        {value: 'trincomalee', label: 'Trincomalee'},
                        {value: 'matara', label: 'Matara'},
                        {value: 'ratnapura', label: 'Ratnapura'},
                        {value: 'badulla', label: 'Badulla'},
                        {value: 'kegalle', label: 'Kegalle'},
                        {value: 'kurunegala', label: 'Kurunegala'},
                        {value: 'kalutara', label: 'Kalutara'},
                        {value: 'ampara', label: 'Ampara'},
                        {value: 'vavuniya', label: 'Vavuniya'},
                        {value: 'mannar', label: 'Mannar'},
                        {value: 'hambantota', label: 'Hambantota'},
                        {value: 'monaragala', label: 'Monaragala'},
                        {value: 'puttalam', label: 'Puttalam'},
                        {value: 'chilaw', label: 'Chilaw'},
                        {value: 'panadura', label: 'Panadura'},
                        {value: 'moratuwa', label: 'Moratuwa'},
                        {value: 'dehiwala', label: 'Dehiwala'},
                        {value: 'mount-lavinia', label: 'Mount Lavinia'},
                        {value: 'kesbewa', label: 'Kesbewa'},
                        {value: 'maharagama', label: 'Maharagama'},
                        {value: 'kotte', label: 'Sri Jayawardenepura Kotte'},
                        {value: 'kaduwela', label: 'Kaduwela'}
                    ]);
                }
            };

            loadSriLankanCities();
        },
        []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
                setIsCityDropdownOpen(false);
                // If a city is selected, set input to its label; otherwise, clear the search query
                setCitySearchQuery(selectedCity ? selectedCity.label : '');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectedCity]);

    // Filter cities based on search query
    const filteredCities = cities.filter(city =>
        city.label.toLowerCase().includes(citySearchQuery.toLowerCase())
    );

    const handleCitySelect = (city: CityOption) => {
        setSelectedCity(city);
        setCitySearchQuery(city.label); // Set input to selected city name
        setIsCityDropdownOpen(false);
    };

    const handleCityInputClick = () => {
        setIsCityDropdownOpen(true);
        // If a city is selected, initialize input with its label
        if (selectedCity && !citySearchQuery) {
            setCitySearchQuery(selectedCity.label);
        }
    };

    const handleCitySearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setCitySearchQuery(value);
        setIsCityDropdownOpen(true);

        // Only clear selected city if the input doesn't match any city
        if (value && !cities.some(city => city.label.toLowerCase() === value.toLowerCase())) {
            setSelectedCity(null);
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const clearCity = () => {
        setSelectedCity(null);
        setCitySearchQuery('');
        setIsCityDropdownOpen(false);
    };

    const CitySearchSelect = ({ className = "", placeholder = "City" }: { className?: string; placeholder?: string }) => (
        <div className={`relative ${className}`} ref={cityDropdownRef}>
            <div className="relative flex items-center">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={citySearchQuery}
                    onChange={handleCitySearchChange}
                    onClick={handleCityInputClick}
                    className="bg-transparent border-none focus:outline-none text-sm text-gray-700 cursor-pointer pr-8 w-full placeholder-gray-500"
                />

                {selectedCity && (
                    <button
                        type="button"
                        onClick={clearCity}
                        className="absolute right-4 p-0.5 hover:bg-gray-200 rounded-full transition-colors duration-200"
                        title="Clear city"
                    >
                        <span className="material-symbols-outlined text-gray-500 text-xs">
                            close
                        </span>
                    </button>
                )}

                <span className="material-symbols-outlined absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
                    expand_more
                </span>
            </div>

            {isCityDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                    {filteredCities.length > 0 ? (
                        <>
                            <div
                                className="px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 cursor-pointer border-b sticky top-0 bg-white"
                                onClick={clearCity}
                            >
                                <span className="material-symbols-outlined text-xs mr-2">location_on</span>
                                All Cities
                            </div>
                            {filteredCities.map((city, index) => (
                                <div
                                    key={`${city.value}-${index}`}
                                    className={`px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer flex items-center ${
                                        selectedCity?.value === city.value ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                                    }`}
                                    onClick={() => handleCitySelect(city)}
                                >
                                    <span className="material-symbols-outlined text-xs mr-2 text-gray-400">
                                        location_city
                                    </span>
                                    {city.label}
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className="px-3 py-4 text-sm text-gray-500 text-center">
                            <span className="material-symbols-outlined text-gray-300 block mb-2">
                                search_off
                            </span>
                            No cities found for "{citySearchQuery}"
                        </div>
                    )}
                </div>
            )}
        </div>
    );

    return (
        <div className="w-full">
            {/* Mobile Layout (sm and below) */}
            <div className="sm:hidden">
                <div className="flex items-center w-full bg-gray-100 hover:bg-gray-50 transition-colors duration-200 p-2 rounded-[40px] border border-gray-200 shadow-sm mb-2">
                    <span className="material-symbols-outlined text-gray-500 text-lg mr-2">
                        search
                    </span>
                    <input
                        type="text"
                        placeholder="Search ads..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="bg-transparent border-none focus:outline-none flex-1 text-sm text-gray-700 placeholder-gray-500"
                    />
                    <button
                        type="button"
                        className="ml-2 p-1.5 hover:bg-gray-200 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        title="Filter options"
                    >
                        <span className="material-symbols-outlined text-gray-600 text-lg">
                            tune
                        </span>
                    </button>
                </div>
                <div className="flex items-center w-full bg-gray-100 hover:bg-gray-50 transition-colors duration-200 p-2 rounded-[40px] border border-gray-200 shadow-sm">
                    <span className="material-symbols-outlined text-gray-500 text-lg mr-2">
                        location_on
                    </span>
                    <CitySearchSelect className="flex-1" placeholder="Select City" />
                </div>
            </div>

            {/* Tablet Layout (md) */}
            <div className="hidden sm:flex md:hidden items-center w-full bg-gray-100 hover:bg-gray-50 transition-colors duration-200 p-2 rounded-[40px] border border-gray-200 shadow-sm">
                <CitySearchSelect className="min-w-[120px]" placeholder="City" />
                <div className="w-px h-4 bg-gray-300 mx-2"></div>
                <span className="material-symbols-outlined text-gray-500 text-lg mr-2">
                    search
                </span>
                <input
                    type="text"
                    placeholder="Search for ads..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="bg-transparent border-none focus:outline-none flex-1 text-sm text-gray-700 placeholder-gray-500 min-w-0"
                />
                <button
                    type="button"
                    className="ml-2 p-1.5 hover:bg-gray-200 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    title="Filter options"
                >
                    <span className="material-symbols-outlined text-gray-600 text-lg">
                        tune
                    </span>
                </button>
            </div>

            {/* Desktop Layout (lg and above) */}
            <div className="hidden md:flex items-center w-full bg-gray-100 hover:bg-gray-50 transition-colors duration-200 p-2 pl-3 pr-2 rounded-[40px] border border-gray-200 shadow-sm">
                <CitySearchSelect className="min-w-[160px]" placeholder="City" />
                <div className="w-px h-5 bg-gray-300 mx-3"></div>
                <span className="material-symbols-outlined text-gray-500 text-lg mr-3">
                    search
                </span>
                <input
                    type="text"
                    placeholder="Search for ads, services, products..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="bg-transparent border-none focus:outline-none flex-1 text-sm text-gray-700 placeholder-gray-500"
                />
                <button
                    type="button"
                    className="ml-3 p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    title="Filter options"
                >
                    <span className="material-symbols-outlined text-gray-600 text-lg">
                        tune
                    </span>
                </button>
            </div>
        </div>
    );
};

export default SearchBar;