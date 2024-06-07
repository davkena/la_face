import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../utils/auth';

const LoginPage = () => {
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value; 
    const password = e.target.elements.password.value; 
    login(username, password);
  };

  return (
    <>
      <Head>
        <title>Login Page</title>
      </Head>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="login-container bg-blue-200 bg-opacity-90 p-8 rounded-lg shadow-md text-center max-w-md w-full">
          <div className="flex flex-col items-center mb-5">
            <FontAwesomeIcon icon={faBookOpen} size="4x" className="text-slate-800 mb-3" style={{ color: '#1E3A8A' }} />
            <h1 className="text-2xl font-bold text-slate-800">Your Assessment Hub</h1>
          </div>
          <form onSubmit={handleSubmit}> {/* Changed: Added <form> tag */}
            <input
              type="text"
              name="username" // Changed: Added name attribute
              placeholder="Username/Email"
              className="w-full p-3 mb-4 border font-bold text-slate-800 border-gray-300 rounded"
            />
            <input
              type="password"
              name="password" // Changed: Added name attribute
              placeholder="Password"
              className="w-full p-3 mb-4 border font-bold text-slate-800 border-gray-300 rounded"
            />
            <label className="block mb-4 text-gray-700">
              <input type="checkbox" className="mr-2" /> Remember Me
            </label>
            <button className="w-full p-3 bg-blue-900 font-bold text-white rounded hover:bg-blue-700" type="submit"> {/* Changed: Added type="submit" */}
              Login
            </button>
            <Link href="#" className="block mt-3 font-bold text-slate-800 hover:underline">Forgot Password?</Link>
          </form> {/* Changed: Added closing </form> tag */}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
