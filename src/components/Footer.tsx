import React from 'react';
import { Facebook, Instagram, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
    const navigate = useNavigate();

    const handleLinkClick = (link: string) => {
        switch (link) {
            case 'Terms and Conditions':
                navigate('/term-and-condition');
                break;
            case 'Privacy Policy':
                navigate('/privacy-policy');
                break;
            case 'About Us':
                navigate('/about-us');
                break;
            case 'FAQ':
                navigate('/faq');
                break;
            case 'Service':
                navigate('/servicePage');
                break;
            case 'Refund Policy':
                navigate('/refund-policy');
                break;
            case 'Ceylon Ads':
                navigate('/ceylon-ads');
                break;
            case 'Ad Prices':
                navigate('/adprice');
                break;
            case 'Ads Type':
                navigate('/adstypes');
                break;
            default:
                // Handle default case or do nothing
                break;
        }
    };

    const footerLinks = [
        'Terms and Conditions',
        'Privacy Policy',
        'About Us',
        'FAQ',
        'Service',
        'Refund Policy',
        'Ceylon Ads',
        'Ad Prices',
        'Ads Type'
    ];

    const bottomLinks = [
        'Disclaimer',
        'Adult Content Advisory'
    ];

    const handleBottomLinkClick = (link: string) => {
        switch (link) {
            case 'Disclaimer':
                navigate('/disclaimer');
                break;
            case 'Adult Content Advisory':
                // navigate('/adult-content-advisory');
                break;
            default:
                break;
        }
    };

    return (
        <footer className="bg-gray-800 text-gray-300 py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Main Footer Links */}
                <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mb-6">
                    {footerLinks.map((link, index) => (
                        <React.Fragment key={link}>
                            <button
                                onClick={() => handleLinkClick(link)}
                                className="hover:text-white transition-colors duration-200 text-sm cursor-pointer bg-transparent border-none underline-offset-2 hover:underline"
                            >
                                {link}
                            </button>
                            {index < footerLinks.length - 1 && (
                                <span className="text-gray-500">•</span>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Bottom Links */}
                <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mb-6">
                    {bottomLinks.map((link, index) => (
                        <React.Fragment key={link}>
                            <button
                                onClick={() => handleBottomLinkClick(link)}
                                className="hover:text-white transition-colors duration-200 text-sm cursor-pointer bg-transparent border-none underline-offset-2 hover:underline"
                            >
                                {link}
                            </button>
                            {index < bottomLinks.length - 1 && (
                                <span className="text-gray-500">-</span>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Social Media Icons */}
                <div className="flex justify-center items-center gap-4 mb-4">
                    <a href="#" className="hover:text-white transition-colors duration-200">
                        <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                            <span className="text-white font-bold text-sm">♪</span>
                        </div>
                    </a>
                    <a href="#" className="hover:text-blue-500 transition-colors duration-200">
                        <Facebook className="w-6 h-6" />
                    </a>
                    <a href="#" className="hover:text-pink-500 transition-colors duration-200">
                        <Instagram className="w-6 h-6" />
                    </a>
                </div>

                {/* Google Location */}
                <div className="flex justify-center items-center gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span className="text-sm">Find us on Google : </span>
                    <a
                        href="#"
                        className="text-blue-400 hover:text-blue-300 underline text-sm"
                    >
                        Hela-LankaAds.co on Google
                    </a>
                </div>

                {/* Copyright */}
                <div className="text-center text-sm">
                    <span>© Copyright 2025 </span>
                    <span className="text-red-400">Ceylon-ad</span>
                    <span> All Rights Reserved.</span>
                </div>
            </div>
        </footer>
    );
}
