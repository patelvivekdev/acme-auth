"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { getCurrentUser } from "@/app/actions";
import { useCurrentUserContext } from "@/components/UserContext";

function Loading() {
  return <h2 className="text-center">🌀 Loading...</h2>;
}

export default function ProfilePage() {
  const { currentUser, setCurrentUser } = useCurrentUserContext();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const result = await getCurrentUser();
      if (result.type === "error") {
        toast.error(result.message!);
      } else if (result.type === "redirect") {
        toast.error(result.message);
        router.push("/login");
      } else {
        setCurrentUser(result?.data);
      }
    };
    fetchUser();
  }, [setCurrentUser]);

  if (!currentUser) {
    return <Loading />;
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">User Profile</h2>
      </div>
      <div className="flex items-center mb-4">
        <img
          src={currentUser?.avatar?.url}
          alt="Avatar"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {currentUser?.username}
          </h3>
          <p className="text-sm text-gray-600">{currentUser?.email}</p>
        </div>
      </div>
    </div>
  );
}
