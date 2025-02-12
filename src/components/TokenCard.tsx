import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"
import type React from "react" // Added import for React

interface TokenCardProps {
  token: {
    name: string
    symbol: string
    price: number
    change: number
  }
}

export const TokenCard: React.FC<TokenCardProps> = ({ token }) => {
  const { name, symbol, price, change } = token

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
        <span className="text-xs text-muted-foreground">{symbol}</span>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${price.toFixed(2)}</div>
        <div className={`flex items-center ${change >= 0 ? "text-green-500" : "text-red-500"}`}>
          {change >= 0 ? <ArrowUpIcon className="w-4 h-4 mr-1" /> : <ArrowDownIcon className="w-4 h-4 mr-1" />}
          <span>{Math.abs(change).toFixed(2)}%</span>
        </div>
      </CardContent>
    </Card>
  )
}

