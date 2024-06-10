import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/auth';

const Dashboard = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (user.role !== 'super_admin') {
      router.push('/');
    }
  }, [user, router]);

  if (!user || user.role !== 'super_admin') {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Super Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Manage Users</h2>
          <p>View and manage all users in the system.</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Manage Tests</h2>
          <p>View and manage all tests.</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">View Results</h2>
          <p>View all test results.</p>
        </div>
        {/* Add more admin tasks as needed */}
      </div>
    </div>
  );
};

export default Dashboard;
