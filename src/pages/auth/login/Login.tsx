import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthenticatedContext } from "../../../shared/Authenticated";

const Login = () => {
    const [username, setUsername] = useState(""); // Khai báo state cho username
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // Khai báo state cho lỗi
    const { login } = React.useContext(AuthenticatedContext)!;

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); 
        if (!username || !password) {
            setError("Username and password are required.");
            return;
        }

        try {
            const response = await fetch("https://dummyjson.com/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const loginData = await response.json();
                console.log("Login successful:", loginData);
                if (login) {
                    login({ name: loginData.name, email: loginData.email });
                }
                const userResponse = await fetch(`https://dummyjson.com/user/${loginData.id}`, {
                    method: "GET",
                    headers: {
                      "Authorization": `Bearer ${loginData.token}`, 
                    },
                  });
              
                  if (!userResponse.ok) {
                    throw new Error("Failed to fetch user data");
                  }
                  const userData = await userResponse.json();
              
                  if (userData.role === "user") {
                    navigate(`/pages/user/${loginData.id}/pi`);
                  } else {
                    navigate("/pages/user/kyc-preview");
                  }
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Invalid username or password.");
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">
            <a href="#" className="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white">
                <img src="/logo.png" className="mr-4 h-11" alt="Simple KYC Logo" />
                <span>Simple KYC Authentication</span>
            </a>
            <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Sign in to platform
                </h2>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Your User Name
                        </label>
                        <input
                            name="username"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="name@company.com"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Your password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            required
                        />
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="remember"
                                aria-describedby="remember"
                                name="remember"
                                type="checkbox"
                                className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="font-medium text-gray-900 dark:text-white">
                                Remember me
                            </label>
                        </div>
                        <Link
                            to="/pages/auth/reset-password"
                            className="ml-auto text-sm text-primary-700 hover:underline dark:text-primary-500"
                        >
                            Lost Password?
                        </Link>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full px-5 py-3 text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                        Login to your account
                    </button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Don't have an account?{" "}
                        <Link
                            to="/pages/auth/sign-up"
                            className="text-primary-700 hover:underline dark:text-primary-500"
                        >
                            Sign-up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
