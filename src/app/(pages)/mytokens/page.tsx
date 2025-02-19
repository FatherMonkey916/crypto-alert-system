"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusIcon, Pencil, Trash2 } from "lucide-react"
import { TokenModal } from "@/components/TokenModal"
import axios, { AxiosResponse } from "axios"
import { useToast } from "@/hooks/use-toast";
import ConfirmModal from "@/components/ConfirmModal"

export default function TokensPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingToken, setEditingToken] = useState<TokenType | null>(null)
  const [tokens, setTokens] = useState<TokenType[]>([])
  const { toast } = useToast()
  const [remove, setRemove] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [delet, setDelet] = useState<TokenType | null>(null)
  const [add, setAdd] = useState(false);


  interface TokenType {
    tokenId: number;
    _id: number;
    name: string;
    symbol: string;
    address: string;
    chain: string;
    frequency: string;
    buyThreshold: number;
    sellThreshold: number;
  }

  const fetchTokens = async () => {
    try {
      const response: AxiosResponse<TokenType[]> = await axios.get(
        'http://localhost:5000/api/tokens/',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setTokens(response.data); // Set tokens in state
    } catch (error: any) {
      console.error("Error fetching tokens:", error);
    }
  };

  const Delete = async (tokenid: any) => {
    try {
      console.log(tokenid);
      const response: AxiosResponse<TokenType[]> = await axios.delete(
        `http://localhost:5000/api/tokens/${tokenid}`
      )
      toast({
        title: "alert",
        description: "Token is successfully deleted.",
      })
      setRemove(!remove)
    } catch (error: any) {
      console.error("Error fetching tokens:", error);
    }
  }

  useEffect(() => {
    fetchTokens(); // Call fetchTokens on component mount
  }, [remove, add]);

  const openModal = (token: TokenType | null = null) => {
    setEditingToken(token);
    setIsModalOpen(true);
  }
  const openConfirm = (token: TokenType | null = null) => {
    setDelet(token);
    setIsConfirmOpen(true);
  }

  return (
    <div className="flex px-[5vw] py-32">
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
              <TableHead>Frequency</TableHead>
              <TableHead>Buy Threshold</TableHead>
              <TableHead>Sell Threshold</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tokens.map((token, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell><b>{token.name}</b></TableCell>
                <TableCell>{token.symbol}</TableCell>
                <TableCell className="w-[350px]">{token.address}</TableCell>
                <TableCell>{token.chain}</TableCell>
                <TableCell>{token.frequency}</TableCell>
                <TableCell>${token.buyThreshold}</TableCell>
                <TableCell>${token.sellThreshold}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => openModal(token)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => openConfirm(token)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TokenModal type="mytoken" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} token={editingToken} setAdd={() => setAdd(!add)} />
        <ConfirmModal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={() => { Delete(delet?._id), setIsConfirmOpen(false) }} title="Are you sure?" message="Do you really want to delete this message? This action cannot be undone." />
      </div>
    </div>
  )
}