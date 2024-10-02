// components/SearchAndFilterBar.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

export const SearchAndFilterBar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");
  const [maxPrice, setMaxPrice] = useState(10000000);

  const handleSearch = () => {
    router.push(
      `/?searchTerm=${searchTerm}&sortBy=${sortBy}&sortOrder=${sortOrder}&maxPrice=${maxPrice}`
    );
  };

  return (
    <div className="space-y-4">
      {/* Search input */}
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleSearch} className="flex items-center space-x-2">
          <Search className="w-4 h-4" />
        </Button>
      </div>

      {/* Filter: Sort By */}
      <div className="grid grid-cols-3 gap-4 items-center">
        <div>
          <Label className="block">Sort by:</Label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="category">Category</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Filter: Sort Order */}
        <div>
          <Label className="block">Sort order:</Label>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Filter: Max Price Range Slider */}
        <div>
          <Label className="block mb-2">Max Price: {maxPrice}</Label>

          <Slider
            value={[maxPrice]}
            onValueChange={(value) => setMaxPrice(value[0])}
            min={100}
            max={100000}
            step={100}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};
