import { Outlet } from 'react-router-dom';
import Navbar from "../components/NavBar.tsx";
import Sidebar from "../components/Sidebar.tsx";
import Footer from "../components/Footer.tsx";
import SearchBar from "../components/SearchBar.tsx";

export default function ceylonAdMainPage() {
    return (
        <div className="dashboard-layout h-screen flex flex-col">
            {/* Fixed Navbar */}
            <div className="w-full border-gray-200 bg-white z-30 pr-2.5 sticky top-0 flex-shrink-0">
                <Navbar />
            </div>

            {/* Main content area with sidebar */}
            <div className="flex flex-1 min-h-0">
                {/* Responsive Sidebar - hidden on mobile, visible on desktop */}
                <div className="hidden md:block flex-shrink-0">
                    <Sidebar />
                </div>

                {/* Mobile Sidebar Component (handles its own overlay) */}
                <div className="md:hidden">
                    <Sidebar />
                </div>

                {/* Main content wrapper */}
                <div className="flex flex-col flex-1 min-w-0 ml-0 md:ml-2">
                    {/* Scrollable content area */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="p-1 pt-16 md:pt-1 h-full">
                            <div className="p-3">
                                <SearchBar/>
                            </div>

                            <Outlet />
                            <Footer />
                        </div>
                    </div>

                    {/* Fixed Footer at bottom */}
                    <div className="flex-shrink-0 border-t border-gray-200">

                    </div>
                </div>
            </div>
        </div>
    );
}
