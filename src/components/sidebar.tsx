import Link from "next/link";


export default function Sidebar() {
  return (
    <header className="border-r-black-50 border-r border-solid w-[13%]">
      <div className="flex flex-col gap-6 pl-16 mt-10 text-lg fixed top-20">
        <Link href="dashboard" className="hover:text-blue-500">Dashboard</Link>
        <Link href="mytokens" className="hover:text-blue-500">Tokens List</Link>
        <Link href="received" className="hover:text-blue-500">Alert List</Link>
        <Link href="setting" className="hover:text-blue-500">Settings</Link>
      </div>
    </header>
  )
}


