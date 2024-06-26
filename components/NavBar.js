import Link from "next/link";
import { useAuth, logout } from "../utils/auth";

const NavBar = () => {
  const { user, logout} = useAuth();
  return (
    <nav className="absolute top-0 w-full z-10 flex justify-between items-center p-4 text-shadow animate-slideUp">
      <div className="flex-grow text-center">
        <div
          className="text-white text-5xl font-bold"
          style={{ fontFamily: "Allura, cursive" }}>
          Sophon
        </div>
      </div>
      <div className="flex space-x-4">
        <Link href="/" className="text-white hover:underline">
          Home
        </Link>
        {user && user.role === "super_admin" && (
          <>
            <Link href="/assessments" className="text-white hover:underline ">
              Tests
            </Link>
            <Link href="/results" className="text-white hover:underline ">
              Results
            </Link>
          </>
        )}
        {user ? (
          <button onClick={logout} className="text-white hover:underline text-shadow">
            Logout
          </button>
        ) : (
          console.log("not logged in")
        )}
      </div>
    </nav>
  );
};

export default NavBar;
