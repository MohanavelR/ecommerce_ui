import FadeIn from "../common/FadeIn";

const AboutProgressBar = ({ label, percentage }) => {
    const progressStyle = { width: `${percentage}%` };
    return (
        <FadeIn>     
        <div className="mb-6">
            <div className="flex justify-between items-center mb-1">
                <div className="text-gray-700 font-medium">{label}</div>
                <div className="text-pg-primary font-bold">{percentage}%</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                    className="bg-primary h-2.5 rounded-full transition-all duration-1000 ease-out" 
                    style={progressStyle}
                ></div>
            </div>
        </div>
        </FadeIn>
    );
};
export default AboutProgressBar