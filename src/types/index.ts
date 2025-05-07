
export interface User {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
  isAdmin?: boolean;
  preferredLanguage?: string;
  phoneNumber?: string;
  healthInfo?: HealthInformation;
  dietaryPreferences?: DietaryPreferences;
}

export interface HealthInformation {
  height?: number;
  weight?: number;
  age?: number;
  gender?: string;
  activityLevel?: string;
  calorieGoal?: number;
  proteinGoal?: number;
  carbGoal?: number;
  fatGoal?: number;
  fiberGoal?: number;
}

export interface DietaryPreferences {
  dietType: 'omnivore' | 'vegetarian' | 'vegan' | 'pescatarian';
  allergies: {
    dairy: boolean;
    gluten: boolean;
    nuts: boolean;
    shellfish: boolean;
    soy: boolean;
    eggs: boolean;
  };
  religious: {
    halal: boolean;
    kosher: boolean;
  };
  healthGoals: {
    lowCalorie: boolean;
    lowCarb: boolean;
    highProtein: boolean;
    lowFat: boolean;
  };
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
    fiber?: number;
    sugar?: number;
    sodium?: number;
    cholesterol?: number;
    vitamins?: {
      a?: number;
      c?: number;
      d?: number;
      e?: number;
      k?: number;
    };
    minerals?: {
      calcium?: number;
      iron?: number;
      potassium?: number;
      magnesium?: number;
      zinc?: number;
    };
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
  isSelected?: boolean;
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

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'apple' | 'google';
  details: string;
  isDefault: boolean;
  expiryDate?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: 'month' | 'year' | 'forever';
  description: string;
  features: string[];
}

export interface MealPlan {
  id: string;
  userId: string;
  date: Date;
  breakfast?: Recipe;
  lunch?: Recipe;
  dinner?: Recipe;
  snacks?: Recipe[];
}

export interface ShoppingList {
  id: string;
  userId: string;
  name: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    unit: string;
    checked: boolean;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
