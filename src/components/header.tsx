import Link from "next/link";


export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-6">
        <Link href={"/"} className="text-lg font-semibold">Crypto Alert System</Link>
        <div className="flex items-center space-x-6">
          <Link href="dashboard" className="text-base hover:text-blue-500">Dashboard</Link>
          <Link href="mytokens" className="text-base hover:text-blue-500">Tokens List</Link>
          <Link href="received" className="text-base hover:text-blue-500">Alert List</Link>
          <Link href="setting" className="text-base hover:text-blue-500">Settings</Link>
        </div>
      </div>
    </header>
  )
}


