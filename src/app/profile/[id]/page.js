'use client';

import { useEffect, useState } from "react";
import axios from "axios";

export default function UserProfilePage({ params }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${params.id}`);
        setUser(response.data.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-blue-50 to-teal-100">
        <p className="text-xl text-blue-600 font-medium animate-pulse">Loading user profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-blue-50 to-teal-100">
        <p className="text-xl text-red-600 font-medium">User not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-blue-50 to-teal-100 px-4">
      <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-full max-w-xl border border-blue-200">
        <h1 className="text-4xl font-extrabold text-teal-700 mb-8 text-center drop-shadow">User Profile</h1>

        <div className="space-y-6">
          <Info label="User ID" value={user._id} />
          <Info label="Name" value={user.name} />
          <Info label="Email" value={user.email} />
          <Info label="Username" value={user.username} />
          <Info label="Phone" value={user.number} />
          
        </div>
      </div>
    </div>
  );
}

const Info = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
    <span className="font-semibold text-gray-700">{label}:</span>
    <p className="text-gray-600 text-right">{value}</p>
  </div>
);
