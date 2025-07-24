"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState(null);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("You have successfully logged out.");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const getUserData = async () => {
    try {
      const res = await axios.get("/api/users/user");
      setData(res.data.data._id);
    } catch (error) {
      toast.error("Failed to fetch user data");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 text-center">
        <h1 className="text-4xl font-bold text-purple-700 mb-6">
          Welcome to Your Profile
        </h1>
        <p className="text-gray-600 mb-8">
          This is your personal space. Explore and manage your account here.
        </p>

        <button
          onClick={logout}
          className="w-full mb-4 px-6 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-full font-semibold shadow-md hover:shadow-lg transition duration-300 ease-in-out hover:scale-105"
        >
          Logout
        </button>

        <button
          onClick={getUserData}
          className="w-full px-6 py-2 bg-gradient-to-r from-blue-400 to-teal-400 text-white rounded-full font-semibold shadow-md hover:shadow-lg transition duration-300 ease-in-out hover:scale-105"
        >
          Get User ID
        </button>

        {data && (
          <div className="mt-6">
            <p className="text-gray-700 mb-2">User ID:</p>
            <Link href={`/profile/${data}`}>
              <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 font-medium rounded-lg shadow hover:bg-purple-200 transition">
                {data}
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
