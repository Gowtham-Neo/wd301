// HomePage.tsx
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-4 text-4xl font-bold">Task Manager</h1>
      <p className="text-lg text-gray-600">Welcome to the Task Manager application!</p>
    </div>
  );
};
export default HomePage;