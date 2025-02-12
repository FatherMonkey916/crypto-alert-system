"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusIcon, Pencil, Trash2 } from "lucide-react"
import { TokenModal } from "@/components/TokenModal"

export default function TokensPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingToken, setEditingToken] = useState<TokenType | null>(null) // Corrected type here!

  interface TokenType {
    id: number;
    name: string;
    symbol: string;
    address: string;
    chain: string;
    buyThreshold: number;
    sellThreshold: number;
  }

  // This data would come from your API in a real application
  const tokens = [
    {
      id: 1,
      name: "Ethereum",
      symbol: "ETH",
      address: "0x366e3D6e3a734e15de6428B0d391C41C0805cbd2",
      chain: "Ethereum",
      buyThreshold: 1900,
      sellThreshold: 2100,
    },
    {
      id: 2,
      name: "Bitcoin",
      symbol: "BTC",
      address: "0x366e3D6e3a734e15de6428B0d391C41C0805cbd2",
      chain: "Bitcoin",
      buyThreshold: 28000,
      sellThreshold: 32000,
    },
    { id: 3,
      name: "Solana", 
      symbol: "SOL", 
      address: "0x366e3D6e3a734e15de6428B0d391C41C0805cbd2", 
      chain: "Solana", 
      buyThreshold: 18, 
      sellThreshold: 22 
    },
  ]

  const openModal = (token: TokenType | null = null) => { // Corrected type here!
    setEditingToken(token)
    setIsModalOpen(true)
  }

  return (
    <div className="flex px-[10vw] py-6">
      <div className="space-y-6 w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Tracked Tokens</h1>
          <Button onClick={() => openModal()} className="p-6">
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Token
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Input placeholder="Search tokens..." className="max-w-sm p-6" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Chain</TableHead>
              <TableHead>Buy Threshold</TableHead>
              <TableHead>Sell Threshold</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tokens.map((token) => (
              <TableRow key={token.id}>
                <TableCell>{token.id}</TableCell>
                <TableCell>{token.name}</TableCell>
                <TableCell>{token.symbol}</TableCell>
                <TableCell className="w-[350px]">{token.address}</TableCell>
                <TableCell>{token.chain}</TableCell>
                <TableCell>${token.buyThreshold}</TableCell>
                <TableCell>${token.sellThreshold}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => openModal(token)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TokenModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} token={editingToken} />
      </div>
    </div>
  )
}
