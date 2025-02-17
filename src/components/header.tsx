import Link from "next/link";


export default function Header() {
  return (
    <header className="fixed top-0 z-40 w-full border-b bg-background">
      <div className="flex py-4 items-center justify-between px-6 pr-20">
        <Link href={"/"} className="text-2xl font-semibold">Crypto Price Notification System</Link>
        <div className="flex items-center space-x-6">
          <Link href="dashboard" className="text-base hover:text-blue-500">Login</Link>
        </div>
      </div>
    </header>
  )
}


