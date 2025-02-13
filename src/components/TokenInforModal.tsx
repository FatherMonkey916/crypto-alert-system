"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface TokenModalProps {
  isOpen: boolean
  onClose: () => void
  token?: {
    id?: number
    name: string,
    symbol: string,
    price: number
    hourly: number
    daily: number
    weekly: number
    marketCap: number
    volumes: number
    circulating_Supply: number
  } | null
}

export const TokenInforModal: React.FC<TokenModalProps> = ({ isOpen, onClose, token }) => {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    price: 0,
    hourly: 0,
    daily: 0,
    weekly: 0,
    marketCap: 0,
    volumes: 0,
    circulating_Supply: 0,
  })

  useEffect(() => {
    if (token) {
      setFormData({
        name: token.name,
        symbol: token.symbol,
        price: token.price,
        hourly: token.hourly,
        daily: token.daily,
        weekly: token.weekly,
        marketCap: token.marketCap,
        volumes: token.volumes,
        circulating_Supply: token.circulating_Supply,
      })
    } else {
      setFormData({
        name: "",
        symbol: "",
        price: 0,
        hourly: 0,
        daily: 0,
        weekly: 0,
        marketCap: 0,
        volumes: 0,
        circulating_Supply: 0,
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
          <DialogTitle>Token Information</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Token Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required readOnly />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" value={formData.price} onChange={handleChange} required readOnly />
            </div>
            <div>
              <Label htmlFor="1h">1h</Label>
              <Input id="hourly" name="hourly" value={formData.hourly} onChange={handleChange} required readOnly />
            </div>
            <div>
              <Label htmlFor="1d">24h</Label>
              <Input id="daily" name="daily" value={formData.daily} onChange={handleChange} required readOnly />
            </div>
            <div>
              <Label htmlFor="1h">7d</Label>
              <Input id="weekly" name="weekly" value={formData.weekly} onChange={handleChange} required readOnly />
            </div>
            <div>
              <Label htmlFor="MarketCap">MarketCap</Label>
              <Input id="MarketCap" name="MarketCap" value={formData.marketCap} onChange={handleChange} required readOnly />
            </div>
            <div>
              <Label htmlFor="Volumes">Volumes</Label>
              <Input id="Volumes" name="Volumes" value={formData.volumes} onChange={handleChange} required readOnly />
            </div>
            <div>
              <Label htmlFor="Circulating_Supply">Circulating Supply</Label>
              <Input id="Circulatin_supply" name="Circulating_Supply" value={formData.circulating_Supply} onChange={handleChange} required readOnly />
            </div>
          </div>
          <div className="flex justify-center gap-6">
            <Button type="submit">{token ? "Save Token" : "Add Token"}</Button>
            <Button type="submit">Cancel</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

