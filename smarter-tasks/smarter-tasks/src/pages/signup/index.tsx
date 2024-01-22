import React from 'react';
import SignupForm from "./SignupForm"


const Signup: React.FC = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-md">
          <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">Sign up</h1>
          <SignupForm />
        </div>
      </div>
    );
  }

export default Signup;