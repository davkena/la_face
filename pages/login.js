import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Login Page</title>
      </Head>
      <div className="flex flex-col items-center justify-center h-screen">
      <div className="login-container bg-blue-200 bg-opacity-90 p-8 rounded-lg shadow-md text-center max-w-md w-full">
        <div className="flex flex-col items-center mb-5 ">
          <FontAwesomeIcon icon={faBookOpen} size="4x" className="text-slate-800 mb-3" style={{ color: '#1E3A8A' }} />
          <h1 className="text-2xl font-bold text-slate-800">Your Assessment Hub</h1>
        </div>
        <input
          type="text"
          placeholder="Username/Email"
          className="w-full p-3 mb-4 border font-bold text-slate-800 border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border font-bold text-slate-800 border-gray-300 rounded"
        />
        <label className="block mb-4 text-gray-700">
          <input type="checkbox" className="mr-2" /> Remember Me
        </label>
        <button className="w-full p-3 bg-blue-900 font-bold text-white rounded hover:bg-blue-700">
          Login
        </button>
        <Link href="#" className="block mt-3 font-bold text-slate-800 hover:underline">Forgot Password?</Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
