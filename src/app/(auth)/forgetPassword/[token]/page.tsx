import { User } from '@/models/UserModel';
import { dbConnect } from '@/utility/dbConnect';
import bcrypt from 'bcryptjs';
import { redirect, RedirectType } from 'next/navigation';
import React from 'react';
type Params = Promise<{ token: string }>

export default async function Page({params}:{params: Params}) {
    const {token} = await params;
    await dbConnect();
    if (!token) {
        return <div className="text-red-500">Token not found</div>;
    }
    const user = await User.findOne({ resetPasswordToken: token }).lean() as unknown as { resetPasswordExpires: Date; email: string };
    if (!user) {
        return <div className="text-red-500">Invalid or expired token</div>;
    }
    if (new Date(user.resetPasswordExpires) < new Date()) {
        return <div className="text-red-500">Token has expired</div>;
    }
    const savePassword = async (formData: FormData)=>{
        'use server';
        const newPassword = formData.get('password') as string;
        if (!newPassword) {
            throw new Error("Enter valid password")
        }
        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash the password
            await User.updateOne(
              { email: user.email },
              {
                password: hashedPassword,
                resetPasswordToken: null,
                resetPasswordExpires: null,
              }
            );
        } catch (error) {
            console.log(error)
            throw new Error(`Failed to update password: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
        redirect("/login", RedirectType.replace);
    }
  return (
    <form action={savePassword}>
   
<div className="mb-4">
   <label htmlFor="password" className="block text-gray-700 font-medium mb-2">New Password</label>
   <input type="password" id="password" name="password" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="passwor here" />
</div>
<button  type="submit" id="auth-button" className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out`}>
{"Save Password"}
</button>

</form>
  )
}
