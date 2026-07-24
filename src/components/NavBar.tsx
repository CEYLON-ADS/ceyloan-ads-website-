import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const handleBrowseAll = () =>{
        navigate("/girlspersonal");
    }

    const handlePostAd = () =>{
        navigate("/loginpage");
    }
    return (
        <nav className="bg-teal-600 shadow-md">
            <div className="mx-auto px-4 py-2 flex justify-between items-center">
                {/* Logo / Brand */}
                <h1 className="text-white font-semibold italic text-lg sm:text-xl">Ceylon-ad</h1>

                {/* Buttons */}
                <div className="flex gap-2 sm:gap-3 ">
                    <button
                        onClick={handleBrowseAll}
                        className="px-2 py-1 sm:px-4 sm:py-1 border border-white text-white rounded-md hover:bg-white hover:text-teal-600 transition text-sm sm:text-base cursor-pointer">
                        Browse All
                    </button>
                    <button
                        onClick={handlePostAd}
                        className="px-2 py-1 sm:px-4 sm:py-1 bg-pink-700 text-white rounded-md hover:bg-pink-800 transition text-sm sm:text-base cursor-pointer">
                        Post Ad
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;