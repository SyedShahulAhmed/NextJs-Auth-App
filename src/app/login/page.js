"use client";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const inLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/login", user);
      console.log("login response:", response.data);
      toast.success("Login successful!");
      router.push("/profile");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed");
    }
    console.log("Login attempt:", user);
  };
  useEffect(() => {
    const isFormFilled = Object.values(user).every(
      (field) => field.trim() !== ""
    );
    setButtonDisabled(!isFormFilled);
  },[user])
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-100 via-teal-100 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white/40 text-gray-800 p-8 rounded-2xl shadow-[0_0_25px_rgba(0,128,128,0.3)] border border-teal-400 backdrop-blur-md transition-all duration-300">
        <h1 className="text-center text-3xl font-bold mb-8 text-teal-700 tracking-wide">
          🌿 Login Portal
        </h1>

        <form className="space-y-6" onSubmit={inLogin}>
          <div>
            <label
              className="block mb-2 text-sm font-semibold text-teal-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-white/60 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-500 text-sm transition-all duration-200"
            />
          </div>

          <div>
            <label
              className="block mb-2 text-sm font-semibold text-teal-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
              className="w-full px-4 py-2 bg-white/60 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-500 text-sm transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            onClick={inLogin}
            className="w-full py-2 bg-teal-500 hover:bg-teal-400 text-white font-bold rounded-lg shadow-md hover:shadow-teal-600 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-teal-700">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="text-teal-600 hover:text-teal-500 font-semibold underline underline-offset-2 transition-colors duration-200"
          >
            Signup here
          </Link>
        </p>
      </div>
    </div>
  );
}
