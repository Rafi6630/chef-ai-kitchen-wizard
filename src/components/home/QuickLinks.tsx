
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, Clock, Globe } from "lucide-react";

export function QuickLinks() {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold dark:text-white">Quick Links</h2>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <Link to="/saved-recipes" className="flex-shrink-0">
          <Button variant="outline" size="sm" className="border-gray-200 dark:border-gray-700 rounded-full flex items-center gap-1">
            <Star size={15} />
            <span>Saved Recipes</span>
          </Button>
        </Link>
        <Link to="/cooking-history" className="flex-shrink-0">
          <Button variant="outline" size="sm" className="border-gray-200 dark:border-gray-700 rounded-full flex items-center gap-1">
            <Clock size={15} />
            <span>History</span>
          </Button>
        </Link>
        <Link to="/browse" className="flex-shrink-0">
          <Button variant="outline" size="sm" className="border-gray-200 dark:border-gray-700 rounded-full flex items-center gap-1">
            <Globe size={15} />
            <span>Global Cuisine</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
