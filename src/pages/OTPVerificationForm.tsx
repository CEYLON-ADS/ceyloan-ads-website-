// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { verifyOTP } from "../services/verifyOTP.ts"; // Adjust path as needed
// import { sendOTP } from "../services/sendOTP.ts"; // Adjust path as needed
//
// const OTPVerificationForm: React.FC = () => {
//     const [verificationCode, setVerificationCode] = useState("");
//     const [phoneNumber, setPhoneNumber] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const [successMessage, setSuccessMessage] = useState("OTP has been sent via SMS.");
//     const [resendLoading, setResendLoading] = useState(false);
//
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         // Get phone number from sessionStorage
//         const storedPhoneNumber = sessionStorage.getItem('phoneNumber');
//         if (storedPhoneNumber) {
//             setPhoneNumber(storedPhoneNumber);
//         } else {
//             // If no phone number found, redirect back to login
//             navigate('/login');
//         }
//     }, [navigate]);
//
//     const handleVerifyCode = async () => {
//         setError("");
//         setLoading(true);
//
//         try {
//             const result = await verifyOTP(phoneNumber, verificationCode);
//
//             if (result.success) {
//                 setSuccessMessage("Login successful! Redirecting...");
//
//                 // Navigate to ad dashboard after success
//                 setTimeout(() => {
//                     navigate(`/adDashboard?phoneNumberSend=${phoneNumber}`)
//                 }, 1500);
//
//             } else {
//                 setError(result.message || "Failed to verify OTP. Please try again.");
//             }
//         } catch (err) {
//             setError("Something went wrong. Please try again.");
//             console.error("Error verifying OTP:", err);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     const handleRequestAgain = async () => {
//         setError("");
//         setResendLoading(true);
//
//         try {
//             const result = await sendOTP(phoneNumber);
//
//             if (result.success) {
//                 setSuccessMessage("OTP has been resent via SMS.");
//                 setVerificationCode(""); // Clear current input
//             } else {
//                 setError("Failed to resend OTP. Please try again.");
//             }
//         } catch (err) {
//             setError("Failed to resend OTP. Please try again.");
//             console.error("Error resending OTP:", err);
//         } finally {
//             setResendLoading(false);
//         }
//     };
//
//     const handleChangeNumber = () => {
//         // Navigate back to login page to change number
//         navigate('/login');
//     };
//
//     const handleSeeAgents = () => {
//         console.log("See agents clicked");
//         // Handle see agents logic here
//     };
//
//     return (
//         <div className="max-w-lg mx-auto bg-white p-6 space-y-6">
//             {/* Success Alert */}
//             {successMessage && (
//                 <div className="bg-green-50 border border-green-200 rounded-md p-3">
//                     <p className="text-green-700 text-sm font-medium">
//                         {successMessage}
//                     </p>
//                 </div>
//             )}
//
//             {/* Error Alert */}
//             {error && (
//                 <div className="bg-red-50 border border-red-200 rounded-md p-3">
//                     <p className="text-red-700 text-sm font-medium">
//                         {error}
//                     </p>
//                 </div>
//             )}
//
//             {/* Header */}
//             <div>
//                 <h1 className="text-2xl font-bold text-gray-800 mb-2">Login/ Register</h1>
//                 <div className="w-8 h-1 bg-red-600 mb-4"></div>
//                 <p className="text-gray-600 text-sm leading-relaxed">
//                     ඔබගේ log වීම සහ ගිණුමක් හැදීම සඳහා කරුණාකර නම්මන්යේ form එක නාවිකා කරන්න.
//                 </p>
//             </div>
//
//             {/* OTP Verification Section */}
//             <div className="space-y-4">
//                 <div>
//                     <h2 className="text-lg font-semibold text-gray-800 mb-2">Enter Verification Code</h2>
//                     <p className="text-gray-600 text-sm mb-4">
//                         ඔබගේ අංකයට අප 6 අංක OTP එකක් ලබන දුරකතන හරහා OTP එකක
//                         ඇලුවත් කර <span className="font-semibold">Verify</span> Click කරන්න.
//                     </p>
//                 </div>
//
//                 {/* OTP Input */}
//                 <div className="space-y-4">
//                     <input
//                         type="text"
//                         value={verificationCode}
//                         onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
//                         placeholder="Verification code"
//                         maxLength={6}
//                         disabled={loading}
//                         className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
//                     />
//
//                     {/* Verify Code Button */}
//                     <button
//                         onClick={handleVerifyCode}
//                         disabled={verificationCode.length !== 6 || loading}
//                         className="w-full bg-red-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center justify-center"
//                     >
//                         {loading ? (
//                             <>
//                                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                 </svg>
//                                 Verifying...
//                             </>
//                         ) : (
//                             "Verify Code"
//                         )}
//                     </button>
//
//                     {/* Request Again Button */}
//                     <div className="flex space-x-2">
//                         <button
//                             onClick={handleRequestAgain}
//                             disabled={resendLoading || loading}
//                             className="flex-1 bg-gray-800 text-white py-3 px-4 rounded-md font-semibold hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center"
//                         >
//                             {resendLoading ? (
//                                 <>
//                                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                     </svg>
//                                     Sending...
//                                 </>
//                             ) : (
//                                 "Request Again"
//                             )}
//                         </button>
//                         <button
//                             onClick={handleChangeNumber}
//                             disabled={loading || resendLoading}
//                             className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                         >
//                             Change Number
//                         </button>
//                     </div>
//                 </div>
//             </div>
//
//             {/* Agent Support Section */}
//             <div className="space-y-4 pt-4">
//                 <div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-2">Agent support to post an ad.</h3>
//                     <p className="text-gray-600 text-sm">
//                         දැන්වීමක් ප්‍රකාශ රැණීමට නියෝජිතයින් සහාය.
//                     </p>
//                 </div>
//
//                 {/* See Agents Button */}
//                 <button
//                     onClick={handleSeeAgents}
//                     disabled={loading || resendLoading}
//                     className="w-full bg-gray-800 text-white py-3 px-4 rounded-md font-semibold hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
//                 >
//                     See Agents
//                 </button>
//             </div>
//         </div>
//     );
// };
//
// export default OTPVerificationForm;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOTP } from "../services/verifyOTP.ts";
import { sendOTP } from "../services/sendOTP.ts";
import { login, verifyUser } from "../interceptor/interceptor.ts"; // Import auth functions

const OTPVerificationForm: React.FC = () => {
    const [verificationCode, setVerificationCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("OTP has been sent via SMS.");
    const [resendLoading, setResendLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Get phone number from sessionStorage
        const storedPhoneNumber = sessionStorage.getItem('phoneNumber');

        if (storedPhoneNumber) {
            setPhoneNumber(storedPhoneNumber);
        } else {
            // If no phone number found, redirect back to login
            navigate('/loginpage');
        }
    }, [navigate, location]);

    const handleVerifyCode = async () => {
        setError("");
        setLoading(true);

        try {
            const result = await verifyOTP(phoneNumber, verificationCode);

            if (result.success) {
                setSuccessMessage("Verification successful! Redirecting...");

                // Store authentication data using the login function
                if (result.data?.token) {
                    login(result.data.token, true); // token and verified status
                }

                // Mark user as verified
                verifyUser();

                // Navigate to ad dashboard after success
                setTimeout(() => {
                    navigate(`/adDashboard?phoneNumberSend=${phoneNumber}`)
                }, 1500);

            } else {
                setError(result.message || "Failed to verify OTP. Please try again.");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
            console.error("Error verifying OTP:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleRequestAgain = async () => {
        setError("");
        setResendLoading(true);

        try {
            const result = await sendOTP(phoneNumber);

            if (result.success) {
                setSuccessMessage("OTP has been resent via SMS.");
                setVerificationCode(""); // Clear current input
            } else {
                setError(result.message || "Failed to resend OTP. Please try again.");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to resend OTP. Please try again.");
            console.error("Error resending OTP:", err);
        } finally {
            setResendLoading(false);
        }
    };

    const handleChangeNumber = () => {
        // Clear any stored phone number
        sessionStorage.removeItem('phoneNumber');

        // Navigate back to login page to change number
        navigate('/loginpage');
    };

    const handleSeeAgents = () => {
        console.log("See agents clicked");
        // Handle see agents logic here
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && verificationCode.length === 6) {
            handleVerifyCode();
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-6">
            {/* Success Alert */}
            {successMessage && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-700 text-sm font-medium">
                        {successMessage}
                    </p>
                </div>
            )}

            {/* Error Alert */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-700 text-sm font-medium">
                        {error}
                    </p>
                </div>
            )}

            {/* Header */}
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Verify OTP</h1>
                <div className="w-12 h-1 bg-red-600 mx-auto mb-4"></div>
                <p className="text-gray-600 text-sm leading-relaxed">
                    ඔබගේ දුරකථන අංකයට යවන ලද OTP කේතය ඇතුළත් කරන්න
                </p>
                {phoneNumber && (
                    <p className="text-gray-700 font-medium mt-2">
                        Phone: {phoneNumber}
                    </p>
                )}
            </div>

            {/* OTP Verification Section */}
            <div className="space-y-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Enter Verification Code</h2>
                    <p className="text-gray-600 text-sm mb-4">
                        6 ඉලක්කම් OTP කේතය ඇතුළත් කර <span className="font-semibold text-red-600">Verify</span> ක්ලික් කරන්න
                    </p>
                </div>

                {/* OTP Input */}
                <div className="space-y-4">
                    <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter 6-digit code"
                        maxLength={6}
                        disabled={loading}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    />

                    {/* Verify Code Button */}
                    <button
                        onClick={handleVerifyCode}
                        disabled={verificationCode.length !== 6 || loading}
                        className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center justify-center"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Verifying...
                            </>
                        ) : (
                            "Verify Code"
                        )}
                    </button>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                        <button
                            onClick={handleRequestAgain}
                            disabled={resendLoading || loading}
                            className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center"
                        >
                            {resendLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending...
                                </>
                            ) : (
                                "Resend OTP"
                            )}
                        </button>
                        <button
                            onClick={handleChangeNumber}
                            disabled={loading || resendLoading}
                            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Change Number
                        </button>
                    </div>
                </div>
            </div>

            {/* Agent Support Section */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Need help posting an ad?</h3>
                    <p className="text-gray-600 text-sm">
                        දැන්වීමක් ප්‍රකාශ රැණීමට නියෝජිතයින් සහාය.
                    </p>
                </div>

                {/* See Agents Button */}
                <button
                    onClick={handleSeeAgents}
                    disabled={loading || resendLoading}
                    className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                    Contact Agents
                </button>
            </div>

            {/* Footer Info */}
            <div className="text-center text-xs text-gray-500 pt-4">
                <p>Didn't receive the code? Check your SMS messages or request again.</p>
            </div>
        </div>
    );
};

export default OTPVerificationForm;