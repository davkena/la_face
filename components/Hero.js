import Image from 'next/image';

const Hero = () => {
    return (
        <div className="bg-blue-500 text-white flex flex-col items-center justify-center h-screen relative overflow-hidden bg-cover bg-center animate-slideUp" style={{ backgroundImage: "url('/background.png')" }}>
            <h1 className="text-5xl font-bold mb-4 text-shadow">Your Assessment Hub</h1>
            <p className="text-xl mb-8 text-shadow">Please login to continue</p>
            <button className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-gray-200 transition">
                LOGIN
            </button>
        </div>
    );
};

export default Hero;
