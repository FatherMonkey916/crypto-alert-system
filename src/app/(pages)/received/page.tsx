"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import ConfirmModal from "@/components/ConfirmModal";
import axios, { AxiosResponse } from "axios";


export default function Received() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<string>("");
  const [tokens, setTokens] = useState<TokenType[]>([])

  interface TokenType {
    _id: number;
    name: string;
    symbol: string;
    address: string;
    chain: string;
    frequency: string;
    buyThreshold: number;
    sellThreshold: number;
  }

  const handleDelete = () => {
    console.log(`Message ID ${selectedMessage} deleted!`);
    setIsModalOpen(false);
  };

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

  useEffect(() => {
    fetchTokens();
  }, []);


  const messages = [
    { id: 1, name: "Ethereum", symbol: "ETH", currentPrice: "1800", chain: "Ethereum", buyThreshold: 1900, sellThreshold: 2100, createdData: "2025.05.12" },
    { id: 2, name: "Bitcoin", symbol: "BTC", currentPrice: "33000", chain: "Bitcoin", buyThreshold: 28000, sellThreshold: 32000, createdData: "2025.05.12" },
    { id: 3, name: "Solana", symbol: "SOL", currentPrice: "17", chain: "Solana", buyThreshold: 18, sellThreshold: 22, createdData: "2025.05.12" },
  ];

  return (
    <div className="flex px-[5vw] py-32">
      <div className="space-y-6 w-full">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Message List</h1>
          <Button onClick={() => setIsModalOpen(true)} className="p-6">All Clear</Button>
        </div>

        {/* Search Input */}
        <div className="flex items-center space-x-2">
          <Input placeholder="Search message..." className="max-w-sm p-6" />
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>Chain</TableHead>
              <TableHead>Current Price</TableHead>
              <TableHead>Buy Threshold</TableHead>
              <TableHead>Sell Threshold</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message.id}>
                <TableCell>{message.id}</TableCell>
                <TableCell>{message.name}</TableCell>
                <TableCell>{message.symbol}</TableCell>
                <TableCell>{message.chain}</TableCell>
                <TableCell>{message.currentPrice}</TableCell>
                <TableCell>${message.buyThreshold}</TableCell>
                <TableCell>${message.sellThreshold}</TableCell>
                <TableCell>{message.createdData}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedMessage(message.id.toString());
                      setIsModalOpen(true);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Modal */}
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
}
