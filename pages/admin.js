import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../utils/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
  const { user, logout } = useAuth(); // Authentication hook
  const [users, setUsers] = useState([]); // State to hold user data, initialized as an empty array
  const [editingUser, setEditingUser] = useState(null); // State to track which user is being edited
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    role: '',
    password: '',
  }); // State to hold new user data
  const [showPasswords, setShowPasswords] = useState({}); // State to control password visibility

  // Fetch users from the backend when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/users/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Check if the response is an array or a single object
        const data = Array.isArray(response.data) ? response.data : [response.data];
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  // Handle deleting a user
  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:8000/user/delete/${userId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user.user_id !== userId));
    } catch (error) {
      console.error(error);
    }
  };

  // Handle updating a user
  const handleUpdateUser = async (updatedUser) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://127.0.0.1:8000/user/update/${updatedUser.user_id}/`,
        updatedUser,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(
        users.map((user) => (user.user_id === updatedUser.user_id ? updatedUser : user))
      );
      setEditingUser(null); // Exit edit mode after updating
    } catch (error) {
      console.error(error);
    }
  };

  // Handle creating a new user
  const handleCreateUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://127.0.0.1:8000/user/',
        newUser,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers([...users, response.data]);
      setNewUser({
        username: '',
        email: '',
        role: '',
        password: '',
      }); // Reset new user form
    } catch (error) {
      console.error(error);
    }
  };

  // Handle input change for new user form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle input change for editing user
  const handleEditInputChange = (event, userId) => {
    const { name, value } = event.target;
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.user_id === userId ? { ...user, [name]: value } : user
      )
    );
  };

  // Toggle password visibility
  const handlePasswordVisibility = async (userId) => {
    setShowPasswords((prevPasswords) => ({
      ...prevPasswords,
      [userId]: !prevPasswords[userId],
    }));

    // Fetch and display the password if it is not already revealed
    if (!showPasswords[userId]) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:8000/users/password/${userId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.user_id === userId ? { ...user, password: response.data.password } : user
          )
        );
      } catch (error) {
        console.error('Error revealing password:', error);
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ marginTop: '150px' }}>
        <table className="bg-blue-200 bg-opacity-90 p-8 rounded-lg shadow-md text-center max-w-md w-full">
          <thead className="text-slate-800 mb-3">
            <tr>
              <th>Username</th>
              <th>Password</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.map((user) => (
              <tr key={user.user_id}>
                <td>
                  {editingUser === user.user_id ? (
                    <input
                      type="text"
                      name="username"
                      value={user.username}
                      onChange={(e) => handleEditInputChange(e, user.user_id)}
                    />
                  ) : (
                    user.username
                  )}
                </td>
                <td>
                  {editingUser === user.user_id ? (
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={(e) => handleEditInputChange(e, user.user_id)}
                    />
                  ) : (
                    '******'
                  )}
                </td>
                <td>
                  {editingUser === user.user_id ? (
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={(e) => handleEditInputChange(e, user.user_id)}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editingUser === user.user_id ? (
                    <input
                      type="text"
                      name="role"
                      value={user.role}
                      onChange={(e) => handleEditInputChange(e, user.user_id)}
                    />
                  ) : (
                    user.role
                  )}
                </td>
                <td>
                  {editingUser === user.user_id ? (
                    <button onClick={() => handleUpdateUser(user)}>Save</button>
                  ) : (
                    <button onClick={() => setEditingUser(user.user_id)}>Edit</button>
                  )}
                  <button onClick={() => handleDeleteUser(user.user_id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <input
                  type="text"
                  name="username"
                  value={newUser.username}
                  onChange={handleInputChange}
                  placeholder="Username"
                />
              </td>
              <td>
                <input
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="role"
                  value={newUser.role}
                  onChange={handleInputChange}
                  placeholder="Role"
                />
              </td>
              <td>
                <button onClick={handleCreateUser}>Create</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
