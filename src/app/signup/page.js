"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    number: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    const isFormFilled = Object.values(user).every(
      (field) => field.trim() !== ""
    );
    setButtonDisabled(!isFormFilled);
  }, [user]);

  const onSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      toast.success("Signup successful!");
      router.push("/login"); // Redirect to login
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 px-4">
      <form
        onSubmit={onSignup}
        className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 space-y-4"
      >
        <h1 className="text-3xl font-semibold text-center text-purple-700 mb-4">
          Signup Page
        </h1>

        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-500 text-black"
        />

        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-500 text-black"
        />

        <input
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-500 text-black"
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={user.number}
          onChange={(e) => setUser({ ...user, number: e.target.value })}
          className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-500 text-black"
        />

        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-purple-400 placeholder-gray-500"
        />

        <button
          type="submit"
          disabled={buttonDisabled}
          className={`w-full py-2 font-semibold rounded-lg transition duration-300 
    ${
      buttonDisabled
        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
        : "bg-purple-300 hover:bg-purple-400 text-purple-900"
    }
  `}
        >
          {buttonDisabled ? "Fill All Fields" : "Signup"}
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-purple-600 font-medium hover:underline"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
