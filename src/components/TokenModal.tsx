"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"


interface TokenModalProps {
  isOpen: boolean
  onClose: () => void
  token?: {
    id?: number
    name: string
    symbol: string
    address: string
    chain: string
    frequency: string
    buyThreshold: number
    sellThreshold: number
  } | null
}


export const TokenModal: React.FC<TokenModalProps> = ({ isOpen, onClose, token }) => {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    address: "",
    chain: "",
    frequency: "",
    buyThreshold: "",
    sellThreshold: "",
  })
  const [position, setPosition] = useState("bottom")
  // const [frequency2, setFrequency2] = useState(token?.frequency)
  // const [frequency3, setFrequency3] = useState(token?.frequency)
  useEffect(() => {
    if (token) {
      setFormData({
        name: token.name,
        symbol: token.symbol,
        address: token.address,
        chain: token.chain,
        frequency: token.frequency,
        buyThreshold: token.buyThreshold.toString(),
        sellThreshold: token.sellThreshold.toString(),
      })
    } else {
      setFormData({
        name: "",
        symbol: "",
        address: "",
        chain: "",
        frequency: "",
        buyThreshold: "",
        sellThreshold: "",
      })
    }
  }, [token])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log(formData)
    onClose()
  }


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{token ? "Edit Token" : "Add New Token"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Token Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="symbol">Symbol</Label>
              <Input id="symbol" name="symbol" value={formData.symbol} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="address">Contract Address</Label>
              <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="chain">Chain</Label>
              <Input id="chain" name="chain" value={formData.chain} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="frequency">Frequency</Label>
              <br></br>
              {/* <Input id="frequency" name="frequency" value={formData.frequency} onChange={handleChange} required /> */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">{formData.frequency}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuRadioGroup value={formData.frequency} onValueChange={(value) => setFormData(prevState => ({
                    ...prevState,
                    frequency: value
                  }))}>
                    <DropdownMenuRadioItem value="Hourly">Hourly</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Daily">Daily</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Weekly">Weekly</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>

                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              <Label htmlFor="buyThreshold">Buy Threshold</Label>
              <Input
                id="buyThreshold"
                name="buyThreshold"
                type="number"
                value={formData.buyThreshold}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="sellThreshold">Sell Threshold</Label>
              <Input
                id="sellThreshold"
                name="sellThreshold"
                type="number"
                value={formData.sellThreshold}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button type="submit">{token ? "Update Token" : "Add Token"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

