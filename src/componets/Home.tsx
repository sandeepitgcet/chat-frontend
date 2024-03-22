// src/pages/Home.tsx

import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
interface LoginInfoInterface {
  email?: string;
  userName?: string;
  accessToken?: string;
  refreshToken?: string;
}
const Home: React.FC = () => {
  const [loginInput, setLoginInput] = useState({
    email: "sandeep@test.com",
    password: "sandeep123",
  });

  const [loginInfo, setLoginInfo] = useLocalStorage<LoginInfoInterface>(
    "userInfo",
    {}
  );
  const navigate = useNavigate();

  const loginHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("loginHandler", loginInput);
    const response = await fetch("http://localhost:3000/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInput),
    });
    console.log("response", response);
    const loginData = await response.json();
    if (response.status) {
      console.log("succeess loginData", loginData);
      setLoginInfo(loginData.data.userInfo);
      //navigate("/dashboard");
    } else {
      console.log(loginData, "loginFailed");
    }
  };

  if (loginInfo.userName && loginInfo.userName) {
    navigate("/dashboard");
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex w-full max-w-screen-xl">
        {/* Sign In */}
        <div className="w-1/2 p-4">
          <h2 className="text-xl font-semibold mb-4">Sign In</h2>
          <form className="space-y-4" onSubmit={loginHandler}>
            <div>
              <label htmlFor="email" className="block mb-1">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={loginInput.email}
                onChange={(e) =>
                  setLoginInput({ ...loginInput, email: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={loginInput.password}
                onChange={(e) =>
                  setLoginInput({ ...loginInput, password: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Sign In
            </button>
          </form>
        </div>

        {/* Sign Up */}
        <div className="w-1/2 p-4">
          <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block mb-1">
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block mb-1">
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block mb-1">
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
