import React, { useState, useEffect, useRef } from 'react';
const useFadeIn = (threshold = 0.1, rootMargin = '0px 0px -50px 0px') => {
    const elementRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Stop observing once visible to prevent re-triggering
                    observer.unobserve(entry.target); 
                }
            },
            { threshold, rootMargin }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(elementRef.current);
            }
        };
    }, [threshold, rootMargin]);

    return [elementRef, isVisible];
};

export default useFadeIn