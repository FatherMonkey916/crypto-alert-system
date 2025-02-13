"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusIcon, Pencil, Trash2 } from "lucide-react"
import { TokenInforModal } from "@/components/TokenInforModal"

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingToken, setEditingToken] = useState<TokenType | null>(null) // Corrected type here!
  const [search, setSearch] = useState("")

  interface TokenType {
    id: number
    name: string,
    symbol: string,
    price: number
    hourly: number
    daily: number
    weekly: number
    marketCap: number
    volumes: number
    circulating_Supply: number
  }

  // This data would come from your API in a real application
  const tokens = [
    {
      id: 1,
      name: "Ethereum",
      symbol: "ETH",
      price: 0.66,
      hourly: 100,
      daily: 200,
      weekly: 1900,
      marketCap: 2100,
      volumes: 123,
      circulating_Supply: 234
    },
    {
      id: 2,
      name: "Bitcoin",
      symbol: "BTC",
      price: 0.66,
      hourly: 100,
      daily: 200,
      weekly: 1900,
      marketCap: 2100,
      volumes: 123,
      circulating_Supply: 234
    },
    {
      id: 3,
      name: "Solana",
      symbol: "SOL",
      price: 0.66,
      hourly: 100,
      daily: 200,
      weekly: 1900,
      marketCap: 2100,
      volumes: 123,
      circulating_Supply: 234
    },
  ]

  const openModal = (token: TokenType | null = null) => { // Corrected type here!
    setEditingToken(token)
    setIsModalOpen(true)
  }

  const filter_tokens = []
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].name.includes(search)) filter_tokens.push(tokens[i])
  }


  return (
    <div className="flex px-[10vw] py-6">
      <div className="space-y-6 w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold p-2">Dashboard</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Input placeholder="Search tokens..." className="max-w-sm p-6" onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>1h %</TableHead>
              <TableHead>24h %</TableHead>
              <TableHead>7d %</TableHead>
              <TableHead>MarketCap</TableHead>
              <TableHead>Volumes(24h)</TableHead>
              <TableHead>Circulating Supply</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filter_tokens.map((token) => (
              <TableRow className="h-4" key={token.id} onClick={() => openModal(token)}>
                <TableCell>{token.id}</TableCell>
                <TableCell><b>{token.name}</b>  ({token.symbol})</TableCell>
                <TableCell>{token.price}</TableCell>
                <TableCell>{token.hourly}</TableCell>
                <TableCell>{token.daily}</TableCell>
                <TableCell>{token.weekly}</TableCell>
                <TableCell>{token.marketCap}</TableCell>
                <TableCell>{token.volumes}</TableCell>
                <TableCell>{token.circulating_Supply}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TokenInforModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} token={editingToken} />
      </div>
    </div>
  )
}
