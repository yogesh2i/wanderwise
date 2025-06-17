"use server"
import { redirect } from "next/navigation";
export type Errors = {
    email?: string;
    password?: string;
  };
  
export type FormState = {
    errors: Errors;
  };

export async function SignupAction(prevState: FormState, formData: FormData) {
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

    const res = await fetch(`http://localhost:3000/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
   
    if (!res.ok) {
        const { error } = await res.json();
        errors.email = error;
        if (Object.keys(errors).length > 0) {
            return { errors };
          }
    }
    redirect('/login');
 }
