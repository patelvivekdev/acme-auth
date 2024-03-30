"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";

//  Responce type
type Response = {
  statusCode: number;
  data: any;
  message: string;
  success: boolean;
};

// =============================== Register ===============================
const registerSchema = z.object({
  username: z.string().min(3, { message: "Must be 3 or more characters long" }),
  email: z.string().email("Please enter valid message").min(5),
  password: z.string().min(8, { message: "Must be 8 or more characters long" }),
  role: z.enum(["ADMIN", "USER"]),
});

export async function register(prevState: any, formData: FormData) {
  const validatedFields = registerSchema.safeParse({
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      type: "error",
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to register.",
    };
  }

  try {
    const response = await fetch(
      "https://api.freeapi.app/api/v1/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedFields.data),
      }
    );

    const result: Response = await response.json();

    if (result.success === false) {
      return {
        type: "error",
        message: result.message,
      };
    } else {
      return {
        type: "success",
        message: result.message,
      };
    }
  } catch (error: any) {
    console.log("Error", error.message);
    return {
      type: "error",
      message: "Database Error: Failed to register.",
    };
  }
}

// =============================== Login ===============================
const loginSchema = z.object({
  email: z.string().email("Please enter valid email"),
  password: z.string(),
});

export async function login(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      type: "error",
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to login.",
    };
  }

  try {
    const response = await fetch("https://api.freeapi.app/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    });

    const result: Response = await response.json();

    // // Check if success is true, if true set cookie and redirect to /
    if (result.success) {
      // Set cookie
      const oneDay = 24 * 60 * 60 * 1000;
      cookies().set({
        name: "accessToken",
        value: result.data.accessToken,
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + oneDay),
      });
      cookies().set({
        name: "refreshToken",
        value: result.data.refreshToken,
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + oneDay),
      });
      return {
        type: "success",
        message: result.message,
        data: result.data,
      };
    } else {
      return {
        type: "error",
        message: result.message,
      };
    }
  } catch (error: any) {
    console.log("Error", error.message);
    return {
      type: "error",
      message: "Database Error: Failed to login.",
    };
  }
}

// =============================== Logout ===============================
export async function logout() {
  try {
    cookies().delete("accessToken");
    cookies().delete("refreshToken");
  } catch (error: any) {
    console.log("Error", error.message);
  }
}

// =============================== Get Current User ===============================
export async function getCurrentUser() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken");

  if (!accessToken?.value) {
    return {
      type: "redirect",
      message: "Token expried! Please login again",
    };
  }

  try {
    const response = await fetch(
      "https://api.freeapi.app/api/v1/users/current-user",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken?.value}`,
        },
      }
    );

    const result: Response = await response.json();

    // Invalid Token
    if (result.statusCode === 401) {
      return {
        type: "redirect",
        message: "Please login to perform this action",
      };
    }

    if (result.success === false) {
      return {
        type: "error",
        message: result.message,
      };
    }

    return {
      type: "success",
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    console.log("error", error);
    return {
      type: "error",
      message: "Database Error: Failed to get user details.",
    };
  }
}

// =============================== Forget Password ===============================
export async function forgetPassword(formData: FormData) {
  try {
    const email = formData.get("email");

    const response = await fetch(
      "https://api.freeapi.app/api/v1/users/forgot-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }
    );

    const result: Response = await response.json();

    return result;
  } catch (error) {
    console.log("error", error);
  }
}

// =============================== Reset Password ===============================
export async function resendEmailVerification() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken?.value) {
    return {
      type: "redirect",
      message: "Token expried! Please login again",
    };
  }

  try {
    const response = await fetch(
      "https://api.freeapi.app/api/v1/users/resend-email-verification",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken?.value}`,
        },
      }
    );

    const result: Response = await response.json();
    console.log(result)

    // Invalid Token
    if (result.statusCode === 401) {
      return {
        type: "redirect",
        message: "Please login to perform this action",
      };
    }

    if (result.success === false) {
      return {
        type: "error",
        message: result.message,
      };
    }

    return {
      type: "success",
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    console.log("Error", error);
    return {
      type: "error",
      message: "Database Error: Failed to send email.",
    };
  }
}

// =============================== Change Password ===============================
const changePasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z
    .string()
    .min(8, { message: "Must be 8 or more characters long" }),
  newPassword2: z
    .string()
    .min(8, { message: "Must be 8 or more characters long" }),
});

export async function changePassword(prevState: any, formData: FormData) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken");

  const validatedFields = changePasswordSchema.safeParse({
    oldPassword: formData.get("oldPassword"),
    newPassword: formData.get("newPassword"),
    newPassword2: formData.get("newPassword2"),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      type: "error",
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Change the password.",
    };
  }

  if (formData.get("newPassword") !== formData.get("newPassword2")) {
    return {
      type: "error",
      message: "Password does not match",
    };
  }

  try {
    const response = await fetch(
      "https://api.freeapi.app/api/v1/users/change-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken?.value}`,
        },
        body: JSON.stringify(validatedFields.data),
      }
    );

    const result: Response = await response.json();
    if (result.statusCode === 401) {
      return {
        type: "redirect",
        message: "Please login to perform this action",
      };
    }

    if (result.success === false) {
      return {
        type: "error",
        message: result.message,
      };
    }
  } catch (error) {
    console.log("Error", error);
    return {
      type: "error",
      message: "Database Error: Failed to change password.",
    };
  }
  redirect("/profile");
}

// =============================== Change Avatar ===============================
export async function changeAvatar(prevState: any, formData: FormData) {
  const avatar = formData.get("avatar") as File
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken");

  if (!accessToken?.value) {
    return {
      type: "redirect",
      message: "Token expried! Please login again",
    };
  }

  if (!avatar) {
    return {
      type: "error",
      message: "Please select an avatar",
    };
  }

  // Only images are allowed
  if (!avatar.type.includes("image")) {
    return {
      type: "error",
      message: "Only images are allowed",
    };
  }

  // make sure file is less than 2MB
  if (avatar.size > 2 * 1024 * 1024) {
    return {
      type: "error",
      message: "File size must be less than 2MB",
    };
  }

  try {
    const response = await fetch(
      "https://api.freeapi.app/api/v1/users/avatar",
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken?.value}`,
        },
        body: formData
      }
    );

    const result = await response.json();
    // Invalid Token
    if (result.statusCode === 401) {
      return {
        type: "redirect",
        message: "Please login to perform this action",
      };
    }

    if (result.success === false) {
      return {
        type: "error",
        message: result.message,
      };
    }

    return {
      type: "success",
      message: result.message,
      data: result.data,
    };
  } catch (error: any) {
    console.log("error", error);
    return {
      type: "error",
      message: "Database Error: Failed to change avatar.",
    };
  }
}

// =============================== Verify Email ===============================
export async function verifyEmail(formData: FormData) { }
