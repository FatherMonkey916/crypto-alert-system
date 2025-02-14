"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TokenInforModal } from "@/components/TokenInforModal"
import axios from "axios"
interface TokenType {
    id: number;
    name: string;
    symbol: string;
    price: number;
    percent_change_1h: number;
    percent_change_24h: number;
    percent_change_7d: number;
    market_cap: number;
    volume_24h: number;
    circulating_supply: number;
}

export default function DashboardPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingToken, setEditingToken] = useState<TokenType | null>(null)
    const [search, setSearch] = useState("")
    const [tokens, setTokens] = useState<TokenType[]>([]); // State to hold the fetched tokens

    useEffect(() => {
        const fetchTokens = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/data/get_token_page'); // Assuming your API endpoint is /api/get_token_page
                setTokens(response.data);
            } catch (error) {
                console.error("Error fetching tokens:", error);
                // Handle error appropriately (e.g., display an error message to the user)
            }
        };

        fetchTokens();
    }, []); // Empty dependency array ensures this effect runs only once on component mount


    const openModal = (token: TokenType | null = null) => {
        setEditingToken(token)
        setIsModalOpen(true)
    }

    const filter_tokens = tokens.filter(token => token.name.toLowerCase().includes(search.toLowerCase()));


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
                            <TableHead>Symbol</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>1h %</TableHead>
                            <TableHead>24h %</TableHead>
                            <TableHead>7d %</TableHead>
                            <TableHead>MarketCap</TableHead>
                            <TableHead>Volumes(24h)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filter_tokens.map((token) => (
                            <TableRow className="h-4" key={token.id} onClick={() => openModal(token)}>
                                <TableCell>{token.id}</TableCell>
                                <TableCell><b>{token.name}</b>  ({token.symbol})</TableCell>
                                <TableCell>{token.price}</TableCell>
                                <TableCell>{token.percent_change_1h}</TableCell>
                                <TableCell>{token.percent_change_24h}</TableCell>
                                <TableCell>{token.percent_change_7d}</TableCell>
                                <TableCell>{token.market_cap}</TableCell>
                                <TableCell>{token.volume_24h}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {/* <TokenInforModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} token={editingToken} /> */}
            </div>
        </div>
    )
}
