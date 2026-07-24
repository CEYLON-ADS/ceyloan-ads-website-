import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { sendOTP } from "../services/sendOTP.ts";
import { loginWithPassword, registerWithPassword } from "../services/authPassword.ts";
import { login, verifyUser } from "../interceptor/interceptor.ts";

const LoginRegisterForm: React.FC = () => {
    const [loginMode, setLoginMode] = useState<"otp" | "password">("otp");
    const [isSignUp, setIsSignUp] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [countryCode, setCountryCode] = useState("+94");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [signUpMobile, setSignUpMobile] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const navigate = useNavigate();

    const handleSendOTP = async () => {
        setError("");
        setSuccessMessage("");

        if (!phoneNumber.trim()) {
            setError("Please enter your phone number");
            return;
        }

        const phoneRegex = /^[0-9]{7,10}$/;
        if (!phoneRegex.test(phoneNumber.replace(/\s+/g, ''))) {
            setError("Please enter a valid phone number");
            return;
        }

        setLoading(true);

        try {
            const fullPhoneNumber = countryCode + phoneNumber.replace(/\s+/g, '');
            console.log("Sending OTP to:", fullPhoneNumber);

            const result = await sendOTP(fullPhoneNumber);

            if (result.success) {
                setSuccessMessage(result.message);
                sessionStorage.setItem('phoneNumber', fullPhoneNumber);

                setTimeout(() => {
                    navigate('/verification');
                }, 1500);
            } else {
                setError(result.message || "Failed to send OTP. Please try again.");
            }
        } catch (err) {
            console.error("Error sending OTP:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordLogin = async () => {
        setError("");
        setSuccessMessage("");

        if (!username.trim()) {
            setError("Please enter your username");
            return;
        }

        if (!password) {
            setError("Please enter your password");
            return;
        }

        setLoading(true);

        try {
            const result = await loginWithPassword(username.trim(), password);

            if (result.success) {
                setSuccessMessage("Login successful! Redirecting...");

                if (result.data?.token) {
                    login(result.data.token, true);
                }

                verifyUser();

                setTimeout(() => {
                    navigate('/adDashboard');
                }, 1500);
            } else {
                setError(result.message || "Failed to login. Please try again.");
            }
        } catch (err: any) {
            console.error("Error logging in:", err);
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordRegister = async () => {
        setError("");
        setSuccessMessage("");

        if (!username.trim()) {
            setError("Please enter a username");
            return;
        }

        if (!password) {
            setError("Please enter a password");
            return;
        }

        if (!signUpMobile.trim()) {
            setError("Please enter your mobile number");
            return;
        }

        const phoneRegex = /^[0-9]{7,12}$/;
        if (!phoneRegex.test(signUpMobile.replace(/\s+/g, ''))) {
            setError("Please enter a valid mobile number");
            return;
        }

        setLoading(true);

        try {
            const formattedMobile = countryCode + signUpMobile.replace(/\s+/g, '');
            const result = await registerWithPassword(username.trim(), password, formattedMobile);

            if (result.success) {
                setSuccessMessage("Registration successful! You can now log in.");
                setUsername("");
                setPassword("");
                setSignUpMobile("");
                setIsSignUp(false);
            } else {
                setError(result.message || "Registration failed. Please try again.");
            }
        } catch (err: any) {
            console.error("Error signing up:", err);
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Login/ Register</h1>
                <div className="w-8 h-1 bg-red-600 mb-4"></div>
                <p className="text-gray-600 text-sm leading-relaxed">
                    ඔබගේ log වීම සහ ගිණුමක් හැදීම සඳහා කරුණාකර පහත පෝරමය පුරවන්න.
                </p>
            </div>

            {/* Login Tabs */}
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => { setError(""); setSuccessMessage(""); setLoginMode("otp"); setIsSignUp(false); }}
                    className={`flex-1 py-3 text-center font-semibold border-b-2 transition duration-200 ${
                        loginMode === "otp"
                            ? "border-red-600 text-red-600"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                    disabled={loading}
                >
                    WhatsApp OTP
                </button>
                <button
                    onClick={() => { setError(""); setSuccessMessage(""); setLoginMode("password"); setIsSignUp(false); }}
                    className={`flex-1 py-3 text-center font-semibold border-b-2 transition duration-200 ${
                        loginMode === "password"
                            ? "border-red-600 text-red-600"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                    disabled={loading}
                >
                    Username & Password
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                    {error}
                </div>
            )}

            {/* Success Message */}
            {successMessage && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
                    {successMessage}
                </div>
            )}

            {loginMode === "otp" ? (
                /* Phone Number Section */
                <div className="space-y-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Enter Phone Number</h2>
                        <p className="text-gray-600 text-sm mb-4">
                            ඔබගේ දුරකතන අංකය ඇතුලත් කර <span className="font-semibold">Send OTP</span> Click කරන්න.
                        </p>
                    </div>

                    {/* Phone Input */}
                    <div className="flex space-x-2">
                        {/* Country Code Dropdown */}
                        <div className="relative">
                            <select
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                                disabled={loading}
                                className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <option value="+94">+94</option>
                                <option value="+91">+91</option>
                                <option value="+1">+1</option>
                                <option value="+44">+44</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>

                        {/* Phone Number Input */}
                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="XXXXXXX"
                            disabled={loading}
                            className="flex-1 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>

                    {/* Send OTP Button */}
                    <button
                        onClick={handleSendOTP}
                        disabled={loading}
                        className="w-full bg-red-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending OTP...
                            </>
                        ) : (
                            "Send OTP"
                        )}
                    </button>
                </div>
            ) : (
                /* Username & Password Section (Switchable between Login and Sign Up) */
                <div className="space-y-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">
                            {isSignUp ? "Create a New Account" : "Username & Password Login"}
                        </h2>
                        <p className="text-gray-600 text-sm mb-4">
                            {isSignUp 
                                ? "නව ගිණුමක් සෑදීම සඳහා පරිශීලක නාමයක්, මුරපදයක් සහ දුරකතන අංකයක් ඇතුලත් කරන්න." 
                                : "කරුණාකර ඔබගේ පරිශීලක නාමය (Username) සහ මුරපදය (Password) ඇතුලත් කරන්න."}
                        </p>
                    </div>

                    {/* Username Input */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            disabled={loading}
                            className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            disabled={loading}
                            className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50"
                        />
                    </div>

                    {isSignUp && (
                        /* Mobile Number Input (Signup only) */
                        <div className="flex flex-col space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Mobile Number</label>
                            <div className="flex space-x-2">
                                <div className="relative">
                                    <select
                                        value={countryCode}
                                        onChange={(e) => setCountryCode(e.target.value)}
                                        disabled={loading}
                                        className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50"
                                    >
                                        <option value="+94">+94</option>
                                        <option value="+91">+91</option>
                                        <option value="+1">+1</option>
                                        <option value="+44">+44</option>
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                </div>
                                <input
                                    type="tel"
                                    value={signUpMobile}
                                    onChange={(e) => setSignUpMobile(e.target.value)}
                                    placeholder="XXXXXXX"
                                    disabled={loading}
                                    className="flex-1 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50"
                                />
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        onClick={isSignUp ? handlePasswordRegister : handlePasswordLogin}
                        disabled={loading}
                        className="w-full bg-red-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {isSignUp ? "Registering..." : "Logging in..."}
                            </>
                        ) : (
                            isSignUp ? "Register" : "Login"
                        )}
                    </button>

                    {/* Switch between Sign In / Sign Up */}
                    <div className="text-center pt-2">
                        <button
                            type="button"
                            onClick={() => { setError(""); setSuccessMessage(""); setIsSignUp(!isSignUp); }}
                            className="text-sm font-semibold text-red-600 hover:text-red-700 hover:underline focus:outline-none cursor-pointer"
                            disabled={loading}
                        >
                            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                        </button>
                    </div>
                </div>
            )}

            {/* Agent Support Section */}
            <div className="space-y-4 pt-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Agent support to post an ad.</h3>
                    <p className="text-gray-600 text-sm">
                        දැන්වීමක් ප්‍රකාශ කිරීමට නියෝජිතයින් සහාය.
                    </p>
                </div>

                {/* See Agents Button */}
                <button
                    className="w-full bg-gray-800 text-white py-3 px-4 rounded-md font-semibold hover:bg-gray-900 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    disabled={loading}
                >
                    See Agents
                </button>
            </div>
        </div>
    );
};

export default LoginRegisterForm;

// import { useNavigate, useSearchParams } from "react-router-dom";
// import { sendOTP } from "../services/sendOTP.ts";
// import { isAuthenticated, isVerified } from "../interceptor/interceptor.ts";
// import Cookies from 'js-cookie';
//
// const LoginRegisterForm: React.FC = () => {
//     const [phoneNumber, setPhoneNumber] = useState("");
//     const [countryCode, setCountryCode] = useState("+94");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const [successMessage, setSuccessMessage] = useState("");
//
//     const navigate = useNavigate();
//     const [searchParams] = useSearchParams();
//     const returnUrl = searchParams.get('returnUrl');
//
//     // Check if user is already authenticated and redirect if needed
//     useEffect(() => {
//         const checkAuthStatus = () => {
//             const authenticated = isAuthenticated();
//             if (authenticated) {
//                 const verified = isVerified();
//                 const redirectPath = verified ? '/adDashboard' : '/verification';
//
//                 // If there's a return URL, use it, otherwise use default path
//                 const finalPath = returnUrl ? decodeURIComponent(returnUrl) : redirectPath;
//                 navigate(finalPath, { replace: true });
//             }
//         };
//
//         checkAuthStatus();
//     }, [navigate, returnUrl]);
//
//     const handleSendOTP = async () => {
//         // Clear previous messages
//         setError("");
//         setSuccessMessage("");
//
//         // Validation
//         if (!phoneNumber.trim()) {
//             setError("Please enter your phone number");
//             return;
//         }
//
//         // Basic phone number validation
//         const phoneRegex = /^[0-9]{7,10}$/;
//         const cleanPhoneNumber = phoneNumber.replace(/\s+/g, '');
//
//         if (!phoneRegex.test(cleanPhoneNumber)) {
//             setError("Please enter a valid phone number (7-10 digits)");
//             return;
//         }
//
//         setLoading(true);
//
//         try {
//             const fullPhoneNumber = countryCode + cleanPhoneNumber;
//             console.log("Sending OTP to:", fullPhoneNumber);
//
//             const result = await sendOTP(fullPhoneNumber);
//
//             if (result.success) {
//                 setSuccessMessage(result.message || "OTP sent successfully!");
//
//                 // Store phone number in sessionStorage for verification page
//                 sessionStorage.setItem('phoneNumber', fullPhoneNumber);
//
//                 // Store any temporary auth data if provided by sendOTP response
//                 if (result.data?.tempToken) {
//                     // Store temporary token for verification process
//                     sessionStorage.setItem('tempAuthToken', result.data.tempToken);
//                     Cookies.set('tempAuthToken', result.data.tempToken, {
//                         secure: window.location.protocol === 'https:',
//                         sameSite: 'strict',
//                         expires: 0.5 // 12 hours
//                     });
//                 }
//
//                 // Navigate to verification page after short delay
//                 setTimeout(() => {
//                     navigate('/verification', {
//                         state: { phoneNumber: fullPhoneNumber }
//                     });
//                 }, 1500);
//
//             } else {
//                 setError(result.message || "Failed to send OTP. Please try again.");
//             }
//         } catch (err: any) {
//             console.error("Error sending OTP:", err);
//             setError(err.response?.data?.message || "Something went wrong. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     const handleKeyPress = (e: React.KeyboardEvent) => {
//         if (e.key === 'Enter') {
//             handleSendOTP();
//         }
//     };
//
//     return (
//         <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-6">
//             {/* Header */}
//             <div className="text-center">
//                 <h1 className="text-2xl font-bold text-gray-800 mb-2">Login / Register</h1>
//                 <div className="w-12 h-1 bg-red-600 mx-auto mb-4"></div>
//                 <p className="text-gray-600 text-sm leading-relaxed">
//                     ඔබගේ log වීම සහ ගිණුමක් හැදීම සඳහා කරුණාකර නම්මන්යේ form එක නාවිකා කරන්න.
//                 </p>
//             </div>
//
//             {/* Phone Number Section */}
//             <div className="space-y-4">
//                 <div>
//                     <h2 className="text-lg font-semibold text-gray-800 mb-2">Enter Phone Number</h2>
//                     <p className="text-gray-600 text-sm mb-4">
//                         ඔබගේ දුරකතන අංකය ඇලුවත් කර <span className="font-semibold text-red-600">Send OTP</span> Click කරන්න.
//                     </p>
//                 </div>
//
//                 {/* Error Message */}
//                 {error && (
//                     <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
//                         <strong className="font-medium">Error: </strong>
//                         {error}
//                     </div>
//                 )}
//
//                 {/* Success Message */}
//                 {successMessage && (
//                     <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
//                         <strong className="font-medium">Success: </strong>
//                         {successMessage}
//                     </div>
//                 )}
//
//                 {/* Phone Input */}
//                 <div className="flex space-x-3">
//                     {/* Country Code Dropdown */}
//                     <div className="relative flex-shrink-0">
//                         <select
//                             value={countryCode}
//                             onChange={(e) => setCountryCode(e.target.value)}
//                             disabled={loading}
//                             className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed w-24"
//                         >
//                             <option value="+94">+94 (LK)</option>
//                             <option value="+91">+91 (IN)</option>
//                             <option value="+1">+1 (US)</option>
//                             <option value="+44">+44 (UK)</option>
//                         </select>
//                         <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//                     </div>
//
//                     {/* Phone Number Input */}
//                     <div className="flex-1">
//                         <input
//                             type="tel"
//                             value={phoneNumber}
//                             onChange={(e) => {
//                                 const value = e.target.value.replace(/\D/g, ''); // Only allow numbers
//                                 setPhoneNumber(value);
//                             }}
//                             onKeyPress={handleKeyPress}
//                             placeholder="77 123 4567"
//                             disabled={loading}
//                             className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
//                             maxLength={10}
//                         />
//                         <p className="text-xs text-gray-500 mt-1">Enter your phone number without spaces</p>
//                     </div>
//                 </div>
//
//                 {/* Send OTP Button */}
//                 <button
//                     onClick={handleSendOTP}
//                     disabled={loading || !phoneNumber.trim()}
//                     className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                 >
//                     {loading ? (
//                         <>
//                             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                             </svg>
//                             Sending OTP...
//                         </>
//                     ) : (
//                         "Send OTP"
//                     )}
//                 </button>
//             </div>
//
//             {/* Agent Support Section */}
//             <div className="space-y-4 pt-6 border-t border-gray-200">
//                 <div className="text-center">
//                     <h3 className="text-lg font-semibold text-gray-800 mb-2">Agent support to post an ad</h3>
//                     <p className="text-gray-600 text-sm">
//                         දැන්වීමක් ප්‍රකාශ රැණීමට නියෝජිතයින් සහාය.
//                     </p>
//                 </div>
//
//                 {/* See Agents Button */}
//                 <button
//                     className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-900 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
//                     disabled={loading}
//                 >
//                     Contact Agents
//                 </button>
//             </div>
//
//             {/* Footer Info */}
//             <div className="text-center text-xs text-gray-500 pt-4">
//                 <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
//             </div>
//         </div>
//     );
// };
//
// export default LoginRegisterForm;