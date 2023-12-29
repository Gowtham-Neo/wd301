import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const userDataString = localStorage.getItem('userData');

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        navigate('/signin');
    };

    let userData = null;
    if (userDataString) {
        try {
            userData = JSON.parse(userDataString);
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-white">
            <div className="p-8 border border-black rounded-xl bg-slate-50">
                <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="absolute px-4 py-2 font-semibold bg-red-700 rounded t4ext-white right-4 top-4 hover:bg-red-800 focus:shadow-outline-gray"
                >
                    Logout
                </button>
                <div className="mb-4 text-xl text-center text-gray-800">
                    <h2 className="mb-2">Name: {userData?.name}</h2>
                    <h1>Email: {userData?.email}</h1>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
