import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../utils/auth";

const Dashboard = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else if (user.role !== "super_admin") {
      router.push("/");
    }
  }, [user, router]);

  if (!user || user.role !== "super_admin") {
    return <p>Loading...</p>;
  }

  const handleManageUsers = () => {
    router.push("/admin");
  };

  return (
    <div className="container mx-auto p-8 mt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-44">
        <div className="p-4 bg-blue-200 bg-opacity-90 text-slate-800 rounded-lg shadow mb-4">
          <button
            className="text-xl font-bold mb-2 hover:underline"
            onClick={handleManageUsers}>
            Manage Users
          </button>
          <p>View and manage all users in the system.</p>
        </div>
        <div className="p-4 bg-blue-200 bg-opacity-90 rounded-lg text-slate-800 shadow mb-4">
          <h2 className="text-xl font-bold mb-2  hover:underline">Manage Tests</h2>
          <p>View and manage all tests.</p>
        </div>
        <div className="p-4 bg-blue-200 bg-opacity-90 rounded-lg text-slate-800 shadow mb-4">
          <h2 className="text-xl font-bold mb-2  hover:underline">View Results</h2>
          <p>View all test results.</p>
        </div>
        {/* Add more admin tasks as needed */}
      </div>
    </div>
  );
};

export default Dashboard;
