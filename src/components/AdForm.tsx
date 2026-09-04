import {useEffect, useState, useCallback} from "react";
import {Upload, ChevronDown, X, MapPin, AlertCircle} from "lucide-react";
import generalAdvertisementService, {
    type GeneralAdvertisementRequestData
} from "../services/advertisment/createAdvertisement.ts";
import cityService, {type CityResponseDTO} from "../services/city/cityService";
import {useAdvertiseTypes} from "../hooks/useAdvertiseTypes";
import {type AdvertiseTypeResponseDTO} from "../services/adType/adTypeService";
import {getUserId, getUserIdFromToken} from "../services/verifyOTP.ts";

interface AdFormProps {
    phoneNumber: string | null | undefined,
    categoryID: string,
    categoryName?: string
}

const AdForm = ({phoneNumber, categoryID, categoryName}: AdFormProps) => {
    const {advertiseTypes, loading: typesLoading, error: typesError} = useAdvertiseTypes();
    const userId: string | null = getUserId() || getUserIdFromToken();
    console.log('Form props:', {userId, categoryID, phoneNumber});

    const removeCountryCode = (phone: any): any => {
        if (!phone) return "";
        const countryCodes = ["94", "+44", "+91", "+86", "+33", "+49", "+81"];
        let cleanNumber = String(phone).trim();

        for (const code of countryCodes) {
            if (cleanNumber.startsWith(code)) {
                cleanNumber = cleanNumber.substring(code.length);
                break;
            }
        }
        cleanNumber = cleanNumber.replace(/^0+/, "");
        return cleanNumber;
    };

    const [formData, setFormData] = useState({
        title: "",
        location: "",
        type: "",
        price: "",
        phone: removeCountryCode(phoneNumber),
        countryCode: "+94",
        description: "",
        whatsapp: false,
        telegram: false,
        imo: false,
        viber: false,
    });

    const [images, setImages] = useState<File[]>([]);
    const [isPhoneEditable, setIsPhoneEditable] = useState(false);
    const [originalPhone, setOriginalPhone] = useState(formData.phone);
    const [loading, setLoading] = useState(false);

    // City search states
    const [citySearch, setCitySearch] = useState("");
    const [cities, setCities] = useState<CityResponseDTO[]>([]);
    const [selectedCity, setSelectedCity] = useState<CityResponseDTO | null>(null);
    const [showCityDropdown, setShowCityDropdown] = useState(false);
    const [loadingCities, setLoadingCities] = useState(false);
    const [cityError, setCityError] = useState<string>("");

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        if (event.target.files && event.target.files[0]) {
            const newImage = event.target.files[0];
            const newImages = [...images];

            if (index < newImages.length) {
                newImages[index] = newImage;
            } else {
                newImages.push(newImage);
            }

            setImages(newImages);
        }
    };

    const handleUseTemplate = () => {
        console.log("Use template clicked");
    };

    const handleCreateAd = async () => {
        // Basic validation
        if (!formData.title.trim()) {
            alert("Please enter a title");
            return;
        }
        if (!formData.location) {
            alert("Please select a location");
            return;
        }
        if (!formData.type) {
            alert("Please select a type");
            return;
        }
        if (!formData.description.trim()) {
            alert("Please enter a description");
            return;
        }
        if (images.length === 0) {
            alert("Please upload at least one image");
            return;
        }
        if (!userId) {
            alert("User ID is required");
            return;
        }

        setLoading(true);

        try {
            // Prepare advertisement data according to GeneralAdvertisementRequestData interface
            const advertisementData: GeneralAdvertisementRequestData = {
                title: formData.title,
                whatsapp: formData.whatsapp,
                telegram: formData.telegram,
                viber: formData.viber,
                imo: formData.imo,
                categoryID: categoryID,
                cityIds: formData.location ? [formData.location] : [],
                userId: userId,
                adType: formData.type,
                description: formData.description,
                verify: false,
                serviceFee: parseFloat(formData.price) || 0,
                images: images,
            };

            console.log('Sending advertisement data:', advertisementData);

            // Create the advertisement using the correct service method
            const response = await generalAdvertisementService.createAdvertisement(advertisementData);

            console.log('Service response:', response);

            if (response.success) {
                alert("Advertisement created successfully!");

                // Reset form
                setFormData({
                    title: "",
                    location: "",
                    type: "",
                    price: "",
                    phone: removeCountryCode(phoneNumber),
                    countryCode: "+94",
                    description: "",
                    whatsapp: false,
                    telegram: false,
                    imo: false,
                    viber: false,
                });
                setImages([]);
                setSelectedCity(null);
                setCitySearch("");
            } else {
                const errorMessage = response.error || response.message || 'Unknown error occurred';
                alert(`Failed to create advertisement: ${errorMessage}`);
                console.error('Advertisement creation failed:', response);
            }
        } catch (error) {
            console.error("Error creating advertisement:", error);
            const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
            alert(`An unexpected error occurred while creating the advertisement: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleChangePhone = () => {
        if (!isPhoneEditable) {
            setOriginalPhone(formData.phone);
            setIsPhoneEditable(true);
        } else {
            setIsPhoneEditable(false);
            console.log("Phone updated:", formData.phone);
        }
    };

    const handleCancelEdit = () => {
        setFormData((prev) => ({
            ...prev,
            phone: originalPhone,
        }));
        setIsPhoneEditable(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleChangePhone();
        } else if (e.key === "Escape") {
            handleCancelEdit();
        }
    };

    // Improved city search with better error handling
    const searchCities = useCallback(async (searchTerm: string) => {
        if (searchTerm.length < 2) {
            setCities([]);
            setShowCityDropdown(false);
            setCityError("");
            return;
        }

        setLoadingCities(true);
        setCityError("");

        try {
            const response = await cityService.searchCities(searchTerm, 0, 10);

            if (response.code === 200 && response.data?.dataList) {
                setCities(response.data.dataList);
                setShowCityDropdown(true);

                if (response.data.dataList.length === 0) {
                    setCityError("No cities found for your search");
                }
            } else {
                setCities([]);
                setShowCityDropdown(false);
                setCityError(response.message || "Failed to search cities");
            }
        } catch (error) {
            console.error("Error searching cities:", error);
            setCities([]);
            setShowCityDropdown(false);
            setCityError("Unable to search cities. Please try again.");
        } finally {
            setLoadingCities(false);
        }
    }, []);

    // Debounced city search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            searchCities(citySearch);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [citySearch, searchCities]);

    const handleCityInputChange = (value: string) => {
        setCitySearch(value);
        if (selectedCity) {
            setSelectedCity(null);
            handleInputChange("location", "");
        }
        setCityError("");
    };

    const handleCitySelect = (city: CityResponseDTO) => {
        setSelectedCity(city);
        setCitySearch(city.city || "Unknown");
        setShowCityDropdown(false);
        setCityError("");

        // Set the propertyID as the location value for backend
        handleInputChange("location", city.propertyID);
    };

    const clearCitySelection = () => {
        setSelectedCity(null);
        setCitySearch("");
        setShowCityDropdown(false);
        setCityError("");
        handleInputChange("location", "");
    };

    const handleCityInputFocus = () => {
        if (citySearch.length >= 2 && cities.length > 0) {
            setShowCityDropdown(true);
        }
    };

    const handleCityInputBlur = () => {
        setTimeout(() => {
            setShowCityDropdown(false);
        }, 150);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 space-y-6">
            {/* Info Alert */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <p className="text-blue-800 text-sm">
                    <span className="font-semibold">දැන්වීම් approve</span> වනවීම් අත දැර මාස edit ගිණුමක් ගට අංකිතවය
                    වරුන් ප්‍රකාශ නවා හැම submit කරන්න.
                </p>
                <p className="text-blue-700 text-xs mt-1">
                    Ads cannot be edited after the approval. Fill everything correctly and submit.
                </p>
            </div>

            {/* Form Title */}
            <h2 className="text-xl font-semibold text-green-800">{categoryName}</h2>
            <hr className="border-b border-gray-200"/>

            {/* Images Section */}
            <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                    Images <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-4">
                    {[0, 1, 2].map((index) => (
                        <label
                            key={index}
                            className="aspect-square bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, index)}
                                className="hidden"
                            />
                            {images[index] ? (
                                <img
                                    src={URL.createObjectURL(images[index])}
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            ) : (
                                <Upload className="w-8 h-8 text-gray-400"/>
                            )}
                        </label>
                    ))}
                </div>
                <p className="text-sm text-gray-600">
                    Upload up to 3 images. At least 1 image is required.
                </p>
            </div>

            {/* Title */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Title <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100"
                    placeholder="Enter ad title"
                />
            </div>

            {/* Location/City Section */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Location <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <div className="relative">
                        <input
                            type="text"
                            value={citySearch}
                            onChange={(e) => handleCityInputChange(e.target.value)}
                            onFocus={handleCityInputFocus}
                            onBlur={handleCityInputBlur}
                            placeholder="Search for a city..."
                            className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100"
                        />
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500"/>
                        {citySearch && (
                            <button
                                onClick={clearCitySelection}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            >
                                <X className="w-4 h-4 text-gray-500 hover:text-gray-700"/>
                            </button>
                        )}
                    </div>

                    {/* City dropdown results */}
                    {showCityDropdown && (
                        <div
                            className="absolute z-20 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
                            {loadingCities ? (
                                <div className="p-3 text-center text-gray-500">
                                    <div className="flex items-center justify-center space-x-2">
                                        <div
                                            className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                        <span>Searching cities...</span>
                                    </div>
                                </div>
                            ) : cities.length === 0 ? (
                                <div className="p-3 text-center text-gray-500">
                                    {cityError || "No cities found"}
                                </div>
                            ) : (
                                cities.map((city) => (
                                    <div
                                        key={city.propertyID}
                                        onClick={() => handleCitySelect(city)}
                                        className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                                    >
                                        <div className="font-medium text-gray-900">{city.city}</div>
                                        <div className="text-sm text-gray-600">{city.district}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* Error message */}
                    {cityError && !loadingCities && (
                        <div className="mt-1 flex items-center space-x-1 text-red-600">
                            <AlertCircle className="w-4 h-4"/>
                            <span className="text-sm">{cityError}</span>
                        </div>
                    )}
                </div>

                {/* Selected city display */}
                {selectedCity && (
                    <div className="bg-green-50 border border-green-200 rounded-md p-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4 text-green-600"/>
                                <div>
                                    <span className="text-sm font-medium text-green-800">Selected: </span>
                                    <span className="text-green-700">
                                        {selectedCity.city}
                                    </span>
                                    <span className="text-sm text-gray-500 ml-1">
                                        ({selectedCity.district})
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={clearCitySelection}
                                className="text-green-600 hover:text-green-800 text-sm font-medium"
                            >
                                Change
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Type and Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Type <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <select
                            value={formData.type}
                            onChange={(e) => handleInputChange("type", e.target.value)}
                            disabled={typesLoading}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 appearance-none pr-10 disabled:opacity-50"
                        >
                            <option value="">
                                {typesLoading ? "Loading types..." : "Select type"}
                            </option>
                            {advertiseTypes.map((type: AdvertiseTypeResponseDTO) => (
                                <option key={type.propertyId} value={type.propertyId}>
                                    {type.type}
                                </option>
                            ))}
                        </select>
                        <ChevronDown
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"/>
                    </div>
                    {typesError && (
                        <p className="text-sm text-red-600">{typesError}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Service Fee</label>
                    <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100"
                        placeholder="Enter service fee"
                        min="0"
                        step="0.01"
                    />
                </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <div className="flex space-x-2">
                    <select
                        value={formData.countryCode}
                        onChange={(e) => handleInputChange("countryCode", e.target.value)}
                        disabled={!isPhoneEditable}
                        className={`w-20 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            isPhoneEditable ? "bg-white" : "bg-gray-100"
                        }`}
                    >
                        <option value="+94">+94</option>
                        <option value="+91">+91</option>
                        <option value="+1">+1</option>
                    </select>
                    <input
                        type="tel"
                        readOnly={!isPhoneEditable}
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Enter phone number"
                        className={`flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            isPhoneEditable ? "bg-white" : "bg-gray-100"
                        }`}
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                    <button
                        onClick={handleChangePhone}
                        className={`flex-1 py-2 px-4 rounded-md transition-colors text-sm font-medium ${
                            isPhoneEditable
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "text-blue-600 border border-blue-300 hover:bg-blue-50"
                        }`}
                    >
                        {isPhoneEditable ? "Save Phone" : "Change Phone"}
                    </button>

                    {isPhoneEditable && (
                        <button
                            onClick={handleCancelEdit}
                            className="flex-1 text-gray-600 border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>

            {/* Platform Availability */}
            <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={formData.whatsapp}
                        onChange={(e) => handleInputChange("whatsapp", e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Phone Number Available on WhatsApp</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={formData.telegram}
                        onChange={(e) => handleInputChange("telegram", e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Phone Number Available on Telegram</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={formData.imo}
                        onChange={(e) => handleInputChange("imo", e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Phone Number Available on IMO</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={formData.viber}
                        onChange={(e) => handleInputChange("viber", e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Phone Number Available on Viber</span>
                </label>
            </div>

            {/* Description */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Description <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        rows={6}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100"
                        placeholder="Enter ad description"
                    />
                    <div className="absolute bottom-3 right-3 flex space-x-2">
                        <button
                            type="button"
                            onClick={handleUseTemplate}
                            className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-blue-500 hover:text-white transition-colors"
                        >
                            Use Template
                        </button>
                    </div>
                </div>
            </div>

            {/* Create Ad Button */}
            <button
                onClick={handleCreateAd}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
                {loading ? "Creating Advertisement..." : "Create Advertisement"}
            </button>
        </div>
    );
};

export default AdForm;