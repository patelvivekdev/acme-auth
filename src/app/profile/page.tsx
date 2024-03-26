"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getCurrentUser, resendEmailVerification } from "@/app/actions";
import { useCurrentUserContext } from "@/components/UserContext";

function Loading() {
  return <h2 className="text-center">🌀 Loading...</h2>;
}

export default function ProfilePage() {
  const { currentUser, setCurrentUser } = useCurrentUserContext();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      if (currentUser) {
        return;
      }
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

  const sendEmailHandler = async () => {
    const result = await resendEmailVerification();
    if (result.type === "error") {
      toast.error(result.message!);
    } else {
      toast.success("Verification email sent!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">User Profile</h2>
      </div>
      {/* display message that user have to verify email address */}
      <p className="text-gray-900">
        {currentUser.isEmailVerified
          ? "Email verified"
          : "Please verify your email address"}
      </p>
      {/* Add link to resend email */}
      <Button variant="outline" className="w-full" onClick={sendEmailHandler}>
        Resend Verification Email
      </Button>

      <div className="flex items-center m-4">
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
      <Link href="/profile/change-password">
        <Button variant="outline" className="w-full">
          Change Password
        </Button>
      </Link>
    </div>
  );
}
