import React, { useState } from 'react';
import { API_ENDPOINT } from '../../config/constants';
import { useNavigate } from 'react-router-dom';

const SignupForm: React.FC = () => {
    const [organisationName, setOrganisationName] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch(`${API_ENDPOINT}/organisations`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: organisationName, user_name: userName, email: userEmail, password: userPassword }),
            });

            if (!response.ok) {
                throw new Error('Sign-up failed');
            }
            navigate('/dashboard');
            console.log('Sign-up successful');
            
            const data = await response.json();
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userData', JSON.stringify(data.user))
        } catch (error) {
            console.error('Sign-up failed:', error);
        }

    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Organisation Name:</label>
                <input type="text" name="organisationName" id="organisationName" value={organisationName} onChange={(e) => setOrganisationName(e.target.value)} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Your Name:</label>
                <input type="text" name="userName" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Email:</label>
                <input type="email" name="userEmail" id="userEmail" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Password:</label>
                <input type="password" name="userPassword" id="userPassword" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
            </div>
            <button type="submit" className="w-full px-4 py-2 mt-4 font-semibold text-white bg-gray-700 rounded-md hover:bg-gray-800 focus:outline-none focus:shadow-outline-gray">Sign up</button>
        </form>
    );
};

export default SignupForm;