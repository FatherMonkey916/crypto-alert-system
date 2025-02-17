"use client";

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
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
} from "./ui/dropdown-menu";
import axios, { AxiosResponse } from "axios";
import { useToast } from "@/hooks/use-toast";



interface TokenModalProps {
  type: string
  isOpen: boolean
  onClose: () => void
  setAdd: () => void;
  token?: {
    tokenid: number;
    name: string;
    symbol: string;
    address: string;
    chain: string;
    frequency: string;
    buyThreshold: number;
    sellThreshold: number;
  } | null;
}

interface FormData {
  tokenid: number;
  name: string;
  symbol: string;
  address: string;
  chain: string;
  frequency: string;
  buyThreshold: number;
  sellThreshold: number;
}

export const TokenModal: React.FC<TokenModalProps> = ({
  type,
  isOpen,
  onClose,
  setAdd,
  token,
}) => {
  const [formData, setFormData] = useState<FormData>({
    tokenid: 0,
    name: "",
    symbol: "",
    address: "",
    chain: "",
    frequency: "",
    buyThreshold: 0,
    sellThreshold: 0,
  })
  const { toast } = useToast()

  useEffect(() => {
    if (token) {
      setFormData({
        tokenid: token.tokenid,
        name: token.name,
        symbol: token.symbol,
        address: token.address,
        chain: token.chain,
        frequency: token.frequency,
        buyThreshold: token.buyThreshold,
        sellThreshold: token.sellThreshold,
      });
    } else {
      setFormData({
        tokenid: 0,
        name: "",
        symbol: "",
        address: "",
        chain: "",
        frequency: "",
        buyThreshold: 0,
        sellThreshold: 0,
      });
    }
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const postData = async (e: React.FormEvent) => {
    console.log("hello postdata");
    e.preventDefault();
    try {
      console.log("Data being sent:", formData); // Crucial: Inspect the data

      const response: AxiosResponse<any> = await axios.post(
        'http://localhost:5000/api/tokens/', // Add http://
        formData,
        {
          headers: {
            'Content-Type': 'application/json', // Explicitly set the content type
          },
        }
      );

      console.log("Response:", response.data); // Inspect the response

      setAdd();
      toast({
        title: "alert",
        description: `${response.data.message}`,
      })

      onClose();
    } catch (error: any) {
      console.error("Error sending data:", error);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
      }
      console.error("Error config:", error.config); // Log the configuration
    } finally {
      onClose(); // Ensure onClose is always called
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{type == "home" ? "Add New Token" : (token ? "Edit Token" : "Add New Token")}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {type === "home" ? "Fill in the details to add a new token." : "Edit the token details below."}
        </DialogDescription>
        <form onSubmit={postData} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Token Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="symbol">Symbol</Label>
              <Input
                id="symbol"
                name="symbol"
                value={formData.symbol}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="address">Contract Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="chain">Chain</Label>
              <Input
                id="chain"
                name="chain"
                value={formData.chain}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="frequency">Frequency</Label>
              <br></br>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">{formData.frequency}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuRadioGroup
                    value={formData.frequency}
                    onValueChange={(value) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        frequency: value,
                      }))
                    }
                  >
                    <DropdownMenuRadioItem value="hourly">
                      hourly
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="daily">daily</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="weekly">
                      weekly
                    </DropdownMenuRadioItem>
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
            <Button type="submit">{type == "home" ? "Add Token" : (token ? "Update Token" : "Add Token")}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};