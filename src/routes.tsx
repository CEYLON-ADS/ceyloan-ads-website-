import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CeylonAdMainPage from "./layout/ceylonAdMainPage";
import MainPage from "./pages/MainPage.tsx";
import ServiceListingCard from "./pages/ServiceListingPage.tsx";
import LoginRegisterForm from "./pages/Login.tsx";
import OTPVerificationForm from "./pages/OTPVerificationForm.tsx";
import AdTypeSelection from "./pages/AdDashboard.tsx";
import HowToPublishAds from "./pages/HowToPublishAds.tsx";
import TermsAndConditions from "./pages/TermsAndConditions.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import FAQ from "./pages/FAQ.tsx";
import ServicePage from "./pages/ServicePage.tsx";
import RefundPolicy from "./pages/RefundPolicy.tsx";
import CeylonAdsHome from "./pages/CeylonAdsHome.tsx";
import AdPricesPage from "./pages/AdPricesPage.tsx";
import AdsTypePage from "./pages/AdsTypePage.tsx";
import DisclaimerPage from "./pages/DisclaimerPage.tsx";
import GirlsPersonal from "./pages/girlspersonal/GirlsPersonal.tsx";
import ServicesCategory from "./pages/servicesCategory/ServicesCategory.tsx";
import LiveCam from "./pages/livecam/LiveCam.tsx";
import Spa from "./pages/Spa/Spa.tsx";
import BoysPersonal from "./pages/BoysPersonal/BoysPersonal.tsx";
import Shemale from "./pages/Shemale/Shemale.tsx";
import Rent from "./pages/Rent/Rent.tsx";
import Sale from "./pages/Sale/Sale.tsx";
import ToysAccessories from "./pages/ToysAccessories/ToysAccessories.tsx";
import Medicine from "./pages/Medicine/Medicine.tsx";
import Rooms from "./pages/Rooms/Rooms.tsx";
import LankanJobs from "./pages/LankanJobs/LankanJobs.tsx";
import Chat from "./pages/chat/Chat.tsx";
import AuthGuard from "./interceptor/AuthGuard.tsx";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CeylonAdMainPage/>}>
                    {/* Child pages that will render inside <Outlet /> */}
                    <Route path="/loginpage" element={<LoginRegisterForm />} />
                    <Route path="/verification" element={<OTPVerificationForm />} />

                    {/* Protected route - only adDashboard needs AuthGuard */}
                    <Route
                        path="/adDashboard"
                        element={
                            <AuthGuard>
                                <AdTypeSelection />
                            </AuthGuard>
                        }
                    />
                    <Route path="/mainPage" element={<MainPage/>} />
                    <Route path="/service/:id" element={<ServiceListingCard />} />
                    {/*<Route path="/login" element={<LoginRegisterForm />} />*/}

                    <Route path="/howtopublishads" element={<HowToPublishAds />} />
                    <Route path="/term-and-condition" element={<TermsAndConditions />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/faq" element={<FAQ/>} />
                    <Route path="/servicePage" element={<ServicePage/>} />
                    <Route path="/refund-policy" element={<RefundPolicy/>} />
                    <Route path="/ceylon-ads" element={<CeylonAdsHome/>} />
                    <Route path="/adprice" element={<AdPricesPage/>} />
                    <Route path="/adstypes" element={<AdsTypePage/>} />
                    <Route path="/disclaimer" element={<DisclaimerPage/>} />

                    {/*side-bar navigation*/}
                    <Route path="/" element={<GirlsPersonal/>} />
                    <Route path="/girlsPersonal" element={<GirlsPersonal/>} />
                    <Route path="/servicesCategory" element={<ServicesCategory/>} />
                    <Route path="/livecam" element={<LiveCam/>} />
                    <Route path="/spa" element={<Spa/>} />
                    <Route path="/chat" element={<Chat/>} />
                    <Route path="/boyspersonal" element={<BoysPersonal/>} />
                    <Route path="/shemale" element={<Shemale/>} />
                    <Route path="/rent" element={<Rent/>} />
                    <Route path="/sale" element={<Sale/>} />
                    <Route path="/toysaccessories" element={<ToysAccessories/>} />
                    <Route path="/medicine" element={<Medicine/>} />
                    <Route path="/rooms" element={<Rooms/>} />
                    <Route path="/lankanjobs" element={<LankanJobs/>} />



                </Route>
            </Routes>
        </Router>
    );
}

