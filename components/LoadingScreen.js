import { useEffect } from 'react';

const LoadingScreen = ({ onAnimationEnd }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onAnimationEnd();
        }, 3000); // Duration of the animation
        return () => clearTimeout(timer);
    }, [onAnimationEnd]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
            <div className="text-white text-6xl font-bold animate-fadeInOut" style={{ fontFamily: 'Dancing Script, cursive' }}>
                Sophon
            </div>
        </div>
    );
};

export default LoadingScreen;
