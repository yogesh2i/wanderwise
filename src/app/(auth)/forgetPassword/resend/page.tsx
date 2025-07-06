import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center mt-5 p-2">
      <h1 className="text-2xl font-bold text-gray-800 mb-5">Password Reset Email Sent</h1>
      <p className="text-gray-600 text-center mb-8">
        Please check your email for instructions to reset your password. If you didn&apos;t receive the email, you can resend it below.
      </p>
      <Link href="/forgetPassword"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
      >
        Resend Email
      </Link>
    </div>
  )
}
