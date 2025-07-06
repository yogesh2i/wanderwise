// import { cookies } from "next/headers"
import NavLinks from "./NavLinks"

export default async function Navbar() {
  // const token = (await cookies()).get('token')?.value || '';

  return (
    <nav className="w-full max-w-6xl bg-white shadow-lg rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between mb-8">
      <NavLinks />
    </nav>
  )
}
