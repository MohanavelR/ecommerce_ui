import useFadeIn from "./useFadeIn";

const FadeIn = ({ children, className = '' }) => {
    const [ref, isVisible] = useFadeIn();
    const animationClass = isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5';
    return (
        <div 
            ref={ref} 
            // Applying transition directly here
            className={`${className} transition-all duration-600 ease-in-out ${animationClass}`}
        >
            {children}
        </div>
    );
};

export default FadeIn