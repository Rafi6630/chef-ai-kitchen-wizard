
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";

export function ShareRecipeCard() {
  return (
    <div className="mt-8 bg-gradient-to-r from-chef-secondary/10 to-chef-accent/10 dark:from-chef-secondary/30 dark:to-chef-accent/30 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-chef-secondary text-white p-2 rounded-full">
          <Share size={20} />
        </div>
        <h2 className="text-lg font-semibold dark:text-white">Share Your Culinary Creation</h2>
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
        Share your recipes, get feedback, and inspire others with your cooking skills.
      </p>
      <Link to="/add-recipe">
        <Button className="w-full bg-chef-secondary hover:bg-chef-secondary/90 text-white">
          Create and Share Recipe
        </Button>
      </Link>
    </div>
  );
}
