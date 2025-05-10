
import React from "react";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";

export function HomeHeader() {
  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <h1 className="text-3xl font-bold text-chef-dark dark:text-white">Chef AI</h1>
        <p className="text-gray-500 dark:text-gray-400">AI-Powered Recipe Finder</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" className="rounded-full w-10 h-10 p-0 border-gray-200 dark:border-gray-700">
          <Search size={18} />
        </Button>
        <Link to="/filters">
          <Button variant="outline" className="rounded-full w-10 h-10 p-0 border-gray-200 dark:border-gray-700">
            <Filter size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}
