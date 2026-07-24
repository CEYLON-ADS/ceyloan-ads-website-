// src/components/AdSlot.tsx
import React from 'react';

interface AdSlotProps {
    icon?: string;
    title: string;
    description: string;
    buttonText: string;
    buttonVariant?: 'default' | 'green' | 'purple';
    slotVariant?: 'default' | 'minimal' | 'bold' | 'card' | 'compact';
    onClick?: () => void;
}

const AdSlot: React.FC<AdSlotProps> = ({
                                           icon,
                                           title,
                                           description,
                                           buttonText,
                                           buttonVariant = 'default',
                                           slotVariant = 'default',
                                           onClick,
                                       }) => {
    const baseClasses = 'relative overflow-hidden bg-white rounded-[20px] p-8 text-center shadow-ad transition-all duration-300 hover:-translate-y-[10px] hover:shadow-ad-hover ad-slot';
    const slotVariants = {
        default: '',
        minimal: 'bg-opacity-90 backdrop-blur-lg border border-white/20',
        bold: 'bg-gradient-body text-white',
        card: 'border-l-8 border-red-400',
        compact: 'p-5',
    };
    const buttonBaseClasses = 'relative overflow-hidden text-white font-semibold rounded-full px-6 py-3 uppercase tracking-wide transition-all duration-300 hover:scale-105';
    const buttonVariants = {
        default: `bg-gradient-button hover:shadow-button-hover before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-button-hover before:transition-all before:duration-500 hover:before:left-[100%]`,
        green: `bg-gradient-button-green hover:shadow-button-green-hover before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-button-hover before:transition-all before:duration-500 hover:before:left-[100%]`,
        purple: `bg-gradient-button-purple hover:shadow-button-purple-hover before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-button-hover before:transition-all before:duration-500 hover:before:left-[100%]`,
    };

    return (
        <div
            className={`${baseClasses} ${slotVariants[slotVariant]} before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-ad before:bg-[length:300%_300%] before:animate-gradient`}
        >
            {icon && <div className="text-5xl mb-5 opacity-80">{icon}</div>}
            <h2
                className={`text-2xl mb-4 font-semibold ${
                    slotVariant === 'bold' ? 'text-white' : 'bg-gradient-text bg-clip-text text-transparent'
                } ${slotVariant === 'compact' ? 'text-lg mb-2' : ''}`}
            >
                {title}
            </h2>
            <p
                className={`text-gray-600 text-base mb-6 leading-relaxed ${
                    slotVariant === 'bold' ? 'text-white/90' : ''
                } ${slotVariant === 'compact' ? 'text-sm mb-4' : ''}`}
            >
                {description}
            </p>
            <button
                className={`${buttonBaseClasses} ${buttonVariants[buttonVariant]}`}
                onClick={onClick || (() => alert('Redirect to ad posting form'))}
            >
                {buttonText}
            </button>
        </div>
    );
};

export default AdSlot;