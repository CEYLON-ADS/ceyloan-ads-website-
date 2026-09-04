import { useNavigate } from 'react-router-dom';
import { isAuthenticated, isAdsAgent, getUserPrimaryRole, logout } from '../interceptor/interceptor';
import { UserCheck, Shield, LogOut } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const authenticated = isAuthenticated();
    const isAgent = isAdsAgent();
    const primaryRole = getUserPrimaryRole();

    const handleBrowseAll = () =>{
        navigate("/girlspersonal");
    }

    const handlePostAd = () =>{
        if (authenticated) {
            navigate("/adDashboard");
        } else {
            navigate("/loginpage");
        }
    }

    return (
        <nav className="bg-teal-600 shadow-md">
            <div className="mx-auto px-4 py-2 flex justify-between items-center">
                {/* Logo / Brand */}
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                    <h1 className="text-white font-semibold italic text-lg sm:text-xl">Queenslanka.com</h1>
                    {authenticated && isAgent && (
                        <span className="inline-flex items-center gap-1 bg-purple-700 text-purple-100 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-purple-400 shadow-sm">
                            <Shield className="w-3 h-3" /> Ads Agent
                        </span>
                    )}
                    {authenticated && !isAgent && primaryRole === 'PUBLIC_USER' && (
                        <span className="inline-flex items-center gap-1 bg-teal-800 text-teal-100 text-xs px-2.5 py-0.5 rounded-full font-medium border border-teal-500">
                            <UserCheck className="w-3 h-3" /> Public User
                        </span>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex gap-2 sm:gap-3 items-center">
                    <button
                        onClick={handleBrowseAll}
                        className="px-2 py-1 sm:px-4 sm:py-1 border border-white text-white rounded-md hover:bg-white hover:text-teal-600 transition text-sm sm:text-base cursor-pointer">
                        Browse All
                    </button>
                    <button
                        onClick={handlePostAd}
                        className="px-2 py-1 sm:px-4 sm:py-1 bg-pink-700 text-white rounded-md hover:bg-pink-800 transition text-sm sm:text-base cursor-pointer">
                        {authenticated ? "Dashboard" : "Post Ad"}
                    </button>
                    {authenticated && (
                        <button
                            onClick={logout}
                            title="Logout"
                            className="p-1.5 text-white hover:bg-teal-700 rounded-md transition cursor-pointer"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;