import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  localStorage.setItem("authenticated", "false");

  function handleSignin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      localStorage.setItem("authenticated", "true");
      navigate("/home");
    } else {
      alert("Invalid username or password");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">
          Sign In
        </h2>
        <form onSubmit={handleSignin}>
          <div>
            <label
              htmlFor="username"
              className="block mb-2 font-semibold text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block mb-2 font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
            />
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-gray-700 rounded-md hover:bg-gray-800 focus:outline-none focus:shadow-outline-gray"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;