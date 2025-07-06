//Not in use since we are using next auth as complete setup

"use server"
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { apiUrl } from "@/utility/constants";
import { Errors, FormState } from "@/types/commonTypes";



export async function LoginAction(prevState: FormState, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const errors: Errors = {};

  if (!email) {
    errors.email = "Email is required";
  }

  if (!password) {
    errors.password = "Password is required";
  }


  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const res = await fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });





  if (res.ok) {
    const { token } = await res.json();
    console.log('Login successful:', token);

    (await cookies()).set({
      name: 'token',
      value: token,
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    // Redirect to the home page
    redirect('/');





  } else {
    const { error } = await res.json();
    errors.global = "Login Failed"

    if (Object.keys(errors).length > 0) {
      return { errors };
    }
    return error
  }
}
