import SeeNewAds from "../components/SeeNewAds.tsx";

const FAQ = () => {
    const faqData = [
        {
            question: "What is Ceylon Ads?",
            answer: "Ceylon Ads is a classified ads platform where users can post and browse ads for various categories, including spa ads, cars ads, full service ads, massage ads, jobs, services, and more."
        },
        {
            question: "How do I create an account?",
            answer: "To create an account, visit our site and click on the 'Create an account' button on the homepage. Fill in the required information such as your name, email address, and password. Once submitted, you'll receive a confirmation email to verify your account."
        },
        {
            question: "How do I post an ad?",
            answer: "After logging in, click on the 'Post an Ad' button. Choose the appropriate category, fill in the ad details, upload any images if needed, and then submit your ad for review."
        },
        {
            question: "Is there a fee to post an ad?",
            answer: "Basic ad postings are typically free, but there may be charges for premium placements or additional features. Check the pricing section on our website for more details."
        },
        {
            question: "How can I edit or delete my ad?",
            answer: "Log in to your account, go to 'My Ads', and select the ad you want to edit or delete. Make the necessary changes and save, or choose to delete the ad if needed."
        },
        {
            question: "What should I do if I forget my password?",
            answer: "Click on the 'Forgot Password' link on the login page. Follow the instructions to reset your password via the email associated with your account."
        },
        {
            question: "How can I contact customer support?",
            answer: "For any issues or inquiries, visit the 'Contact Us' page on our website. You can fill out the contact form or reach us via the provided email or phone number."
        },
        {
            question: "How can I ensure my ad gets more visibility?",
            answer: "Consider using our premium ad options or featuring your ad at the top of search results. Detailed descriptions and high-quality images also help attract more attention."
        },
        {
            question: "Can I report a suspicious ad or user?",
            answer: "Yes, if you encounter any suspicious ads or users, please use the 'Report' feature available on the ad page or contact our support team directly."
        },
        {
            question: "How do I update my account information?",
            answer: "Log in to your account and go to 'Account Settings' to update your personal information, including email, password, and contact details."
        }
    ];

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white">
            {/* Header */}
            <SeeNewAds/>

            {/* FAQ Title and Date */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">FAQ</h2>
                <p className="text-gray-500 text-sm">July 25, 2025</p>
            </div>

            {/* FAQ Items */}
            <div className="space-y-6">
                {faqData.map((item, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                            {item.question}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            {item.answer}
                        </p>
                    </div>
                ))}
            </div>

            {/* Footer spacing */}
            <div className="mt-12"></div>
        </div>
    );
};

export default FAQ;
