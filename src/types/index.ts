
export interface User {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
  isAdmin?: boolean; // Added for admin functionality
}

export type Category = 'food' | 'desserts' | 'drinks';

export interface Subcategory {
  id: string;
  name: string;
  imageUrl: string;
  category: Category;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  cuisine: string;
  imageUrl: string;
  category: Category;
  subcategory: string;
  ingredients: {
    name: string;
    quantity: string;
    unit: string;
  }[];
  instructions: string[];
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  isFavorite: boolean;
  isPremiumOnly: boolean;
}

export type FilterType = 'healthy' | 'dietary' | 'cuisine' | 'time' | 'difficulty' | 'tools';

export interface FilterOption {
  id: string;
  name: string;
  type: FilterType;
  isSelected: boolean;
}

export interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

export interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  expirationDate?: Date;
  addedDate: Date;
  isSelected?: boolean; // Added for selecting ingredients
}

export interface CookingHistoryItem {
  id: string;
  recipeId: string;
  recipeTitle: string;
  recipeImage: string;
  date: Date;
  notes?: string;
}

// Admin panel related types
export interface AdminStats {
  totalUsers: number;
  premiumUsers: number;
  totalRecipes: number;
  activeChats: number;
}
