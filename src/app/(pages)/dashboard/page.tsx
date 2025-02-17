"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button"; // Importing ShadCN Button
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationEllipsis } from "@/components/ui/pagination";
import axios from "axios";
import { TokenModal } from "@/components/TokenModal"
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

interface AddTokenType {
  id: number;
  name: string;
  symbol: string;
  address: string;
  chain: string;
  frequency: string;
  buyThreshold: number;
  sellThreshold: number;
}

export default function DashboardPage() {
  const [tempQuery, setTempQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [tokens, setTokens] = useState<TokenType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 100; // Number of items per page
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedToken, setSelectedToken] = useState<AddTokenType | null>(null)
  const [isLoading, setIsLoading] = useState(false);
  const [add, setAdd] = useState(false)

  const openModal = (token: TokenType | null = null) => {
    if (token) {
      const newAddToken: AddTokenType = {
        id: token.id,
        name: token.name,
        symbol: token.symbol,
        address: '',
        chain: '',
        frequency: '',
        buyThreshold: 0,
        sellThreshold: 0,
      };
      setSelectedToken(newAddToken);
    } else {
      setSelectedToken(null); // Or potentially a default AddTokenType object if needed
    }
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchTokens = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/data/get_token_page`, {
          params: { page, name: searchQuery },
        });

        if (Array.isArray(response.data.data)) {
          setTokens(response.data.data);
          setTotalPages(response.data.totalPages);
        } else {
          setError("Received data is not an array");
        }
      } catch (error) {
        console.error("Error fetching tokens:", error);
        setError("Failed to fetch tokens. Please try again later.");
      }
      setIsLoading(false);
    };

    fetchTokens();
  }, [page, searchQuery]);


  const formatNumber = (num: number | null = null): string => {
    if (num === null || num === undefined) {
      return "N/A";
    }

    if (num >= 1e9) {
      return (num / 1e9).toFixed(1) + "B";
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(1) + "M";
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(1) + "K";
    }

    return num.toString();
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // Pagination Logic for Modern UI
  const getPaginationItems = () => {
    const pages = [];
    const maxPageButtons = 5; // Number of visible page buttons
    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    if (totalPages > maxPageButtons && endPage === totalPages) {
      startPage = totalPages - maxPageButtons + 1;
    }

    if (startPage > 1) {
      pages.push(
        <PaginationItem key="first">
          <PaginationLink onClick={() => setPage(1)}>1</PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        pages.push(
          <PaginationItem key="start-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink isActive={i === page} onClick={() => setPage(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <PaginationItem key="end-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      pages.push(
        <PaginationItem key="last">
          <PaginationLink onClick={() => setPage(totalPages)}>{totalPages}</PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchQuery(tempQuery);
    }
  };

  return (
    <div className="flex flex-col px-[5vw] py-32">
      <div className="space-y-6 w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold p-2">Dashboard</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search tokens..."
            className="max-w-sm p-6"
            onKeyDown={onKeyDown}
            onChange={(e) => setTempQuery(e.target.value)}
          />
          <Button onClick={() => { setPage(1); setSearchQuery(tempQuery); }}>Search</Button>
        </div>
        {
          !isLoading ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>TokenId</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>1h %</TableHead>
                    <TableHead>24h %</TableHead>
                    <TableHead>7d %</TableHead>
                    <TableHead>MarketCap</TableHead>
                    <TableHead>Volumes(24h)</TableHead>
                    <TableHead>Circulating supply</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tokens.map((token, index) => (
                    <TableRow key={index} className="h-4" onClick={() => openModal(token)}>
                      <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                      <TableCell>{token.id}</TableCell>
                      <TableCell>
                        <b>{token.name}</b> ({token.symbol})
                      </TableCell>
                      <TableCell>{token.price.toFixed(2)}</TableCell>
                      <TableCell>{token.percent_change_1h.toFixed(2)}</TableCell>
                      <TableCell>{token.percent_change_24h.toFixed(2)}</TableCell>
                      <TableCell>{token.percent_change_7d.toFixed(2)}</TableCell>
                      <TableCell>{formatNumber(token.market_cap)}</TableCell>
                      <TableCell>{formatNumber(token.volume_24h)}</TableCell>
                      <TableCell>{formatNumber(token.circulating_supply)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Modern Pagination UI */}
              <div className="flex justify-center mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                      >
                        Previous
                      </Button>
                    </PaginationItem>

                    {getPaginationItems()}

                    <PaginationItem>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                      >
                        Next
                      </Button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div></>
          ) : (
            <>
              <div className='flex h-[70vh] items-center justify-center'>
                <div className='h-16 w-16 animate-spin rounded-full border-b-4 border-t-4 border-[#3a748d]'></div>
              </div>
            </>
          )
        }
        <TokenModal type="home" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} token={selectedToken} setAdd={() => setAdd(true)} />
      </div>
    </div>
  );
}
