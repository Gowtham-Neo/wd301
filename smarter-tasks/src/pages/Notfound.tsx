
const NotFound: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="mb-4 text-4xl font-bold text-red-500">404 - Not Found</h1>
                <a href="/home" className="text-blue-500 hover:underline">Go to Home Page</a>
            </div>
        </div>
    );
};

export default NotFound;
