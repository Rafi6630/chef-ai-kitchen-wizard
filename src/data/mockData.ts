
import { Subcategory, Recipe, FilterOption } from "@/types";

export const subcategories: Subcategory[] = [
  {
    id: "main-dishes",
    name: "Main Dishes",
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1470&auto=format&fit=crop",
    category: "food"
  },
  {
    id: "appetizers",
    name: "Appetizers",
    imageUrl: "https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=1374&auto=format&fit=crop",
    category: "food"
  },
  {
    id: "pickles",
    name: "Pickles",
    imageUrl: "https://images.unsplash.com/photo-1589135233689-8215dedbe116?q=80&w=1374&auto=format&fit=crop",
    category: "food"
  },
  {
    id: "sauces",
    name: "Sauces",
    imageUrl: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?q=80&w=1470&auto=format&fit=crop",
    category: "food"
  },
  {
    id: "traditional",
    name: "Traditional",
    imageUrl: "https://images.unsplash.com/photo-1464349095431-e9a21285b19f?q=80&w=1436&auto=format&fit=crop",
    category: "desserts"
  },
  {
    id: "western",
    name: "Western",
    imageUrl: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=1374&auto=format&fit=crop",
    category: "desserts"
  },
  {
    id: "pastries",
    name: "Pastries",
    imageUrl: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=1632&auto=format&fit=crop",
    category: "desserts"
  },
  {
    id: "ice-cream",
    name: "Ice Cream",
    imageUrl: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=1374&auto=format&fit=crop",
    category: "desserts"
  },
  {
    id: "detox",
    name: "Detox",
    imageUrl: "https://images.unsplash.com/photo-1622597467836-f3e6407416e5?q=80&w=1374&auto=format&fit=crop",
    category: "drinks"
  },
  {
    id: "cocktails",
    name: "Cocktails",
    imageUrl: "https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=1372&auto=format&fit=crop",
    category: "drinks"
  },
  {
    id: "alcoholic",
    name: "Alcoholic Drinks",
    imageUrl: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1469&auto=format&fit=crop",
    category: "drinks"
  }
];

export const recipes: Recipe[] = [
  {
    id: "pasta-primavera",
    title: "Pasta Primavera",
    description: "A light and delicious pasta dish loaded with fresh seasonal vegetables.",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: "easy",
    cuisine: "Italian",
    imageUrl: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=1470&auto=format&fit=crop",
    category: "food",
    subcategory: "main-dishes",
    ingredients: [
      { name: "fettuccine pasta", quantity: "8", unit: "oz" },
      { name: "olive oil", quantity: "2", unit: "tbsp" },
      { name: "garlic", quantity: "3", unit: "cloves" },
      { name: "cherry tomatoes", quantity: "1", unit: "cup" },
      { name: "zucchini", quantity: "1", unit: "medium" },
      { name: "yellow squash", quantity: "1", unit: "medium" },
      { name: "red bell pepper", quantity: "1", unit: "medium" },
      { name: "broccoli florets", quantity: "1", unit: "cup" },
      { name: "parmesan cheese", quantity: "1/2", unit: "cup" },
      { name: "fresh basil", quantity: "1/4", unit: "cup" },
      { name: "salt", quantity: "", unit: "to taste" },
      { name: "black pepper", quantity: "", unit: "to taste" }
    ],
    instructions: [
      "Cook pasta according to package directions. Drain and set aside.",
      "Heat olive oil in a large skillet over medium heat.",
      "Add garlic and cook until fragrant, about 30 seconds.",
      "Add vegetables and cook until tender-crisp, about 5-7 minutes.",
      "Add cooked pasta to the skillet and toss to combine.",
      "Remove from heat and stir in parmesan cheese.",
      "Season with salt and pepper to taste.",
      "Garnish with fresh basil before serving."
    ],
    nutritionalInfo: {
      calories: 320,
      protein: 12,
      carbs: 45,
      fat: 10
    },
    isFavorite: false,
    isPremiumOnly: false
  },
  {
    id: "chocolate-lava-cake",
    title: "Chocolate Lava Cake",
    description: "Decadent chocolate cake with a molten chocolate center.",
    prepTime: 15,
    cookTime: 14,
    servings: 4,
    difficulty: "medium",
    cuisine: "French",
    imageUrl: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=1470&auto=format&fit=crop",
    category: "desserts",
    subcategory: "western",
    ingredients: [
      { name: "butter", quantity: "1/2", unit: "cup" },
      { name: "dark chocolate", quantity: "4", unit: "oz" },
      { name: "eggs", quantity: "2", unit: "whole" },
      { name: "egg yolks", quantity: "2", unit: "" },
      { name: "sugar", quantity: "1/4", unit: "cup" },
      { name: "all-purpose flour", quantity: "2", unit: "tbsp" },
      { name: "salt", quantity: "1/4", unit: "tsp" },
      { name: "vanilla extract", quantity: "1/2", unit: "tsp" },
      { name: "powdered sugar", quantity: "", unit: "for dusting" }
    ],
    instructions: [
      "Preheat oven to 425°F (220°C). Butter and lightly flour four 6-ounce ramekins.",
      "Melt butter and chocolate together in a microwave or double boiler.",
      "In a separate bowl, whisk together eggs, egg yolks, sugar, and vanilla.",
      "Slowly add chocolate mixture to egg mixture, whisking continuously.",
      "Fold in flour and salt until just combined.",
      "Divide batter evenly among prepared ramekins.",
      "Bake for 12-14 minutes until edges are firm but center is soft.",
      "Let cool for 1 minute, then invert onto plates and dust with powdered sugar."
    ],
    nutritionalInfo: {
      calories: 385,
      protein: 6,
      carbs: 30,
      fat: 28
    },
    isFavorite: true,
    isPremiumOnly: false
  },
  {
    id: "strawberry-mojito",
    title: "Strawberry Mojito",
    description: "A refreshing cocktail with fresh strawberries, lime, and mint.",
    prepTime: 10,
    cookTime: 0,
    servings: 1,
    difficulty: "easy",
    cuisine: "Cuban",
    imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1374&auto=format&fit=crop",
    category: "drinks",
    subcategory: "cocktails",
    ingredients: [
      { name: "fresh strawberries", quantity: "3", unit: "large" },
      { name: "mint leaves", quantity: "8", unit: "leaves" },
      { name: "lime", quantity: "1", unit: "whole" },
      { name: "sugar", quantity: "2", unit: "tsp" },
      { name: "white rum", quantity: "2", unit: "oz" },
      { name: "club soda", quantity: "4", unit: "oz" },
      { name: "ice cubes", quantity: "", unit: "as needed" }
    ],
    instructions: [
      "Muddle strawberries, mint leaves, lime juice, and sugar in a glass.",
      "Fill glass with ice cubes.",
      "Add rum and stir well.",
      "Top with club soda and gently stir.",
      "Garnish with a strawberry slice and mint sprig."
    ],
    nutritionalInfo: {
      calories: 215,
      protein: 1,
      carbs: 18,
      fat: 0
    },
    isFavorite: false,
    isPremiumOnly: true
  }
];

export const filterOptions: FilterOption[] = [
  // Healthy/Diet-Friendly
  { id: "low-calorie", name: "Low Calorie", type: "healthy", isSelected: false },
  { id: "low-carb", name: "Low Carb", type: "healthy", isSelected: false },
  { id: "keto", name: "Keto", type: "healthy", isSelected: false },
  { id: "paleo", name: "Paleo", type: "healthy", isSelected: false },
  
  // Dietary/Religious Restrictions
  { id: "vegan", name: "Vegan", type: "dietary", isSelected: false },
  { id: "vegetarian", name: "Vegetarian", type: "dietary", isSelected: false },
  { id: "gluten-free", name: "Gluten-Free", type: "dietary", isSelected: false },
  { id: "halal", name: "Halal", type: "dietary", isSelected: false },
  { id: "kosher", name: "Kosher", type: "dietary", isSelected: false },
  
  // Cuisine/Country
  { id: "italian", name: "Italian", type: "cuisine", isSelected: false },
  { id: "indian", name: "Indian", type: "cuisine", isSelected: false },
  { id: "mexican", name: "Mexican", type: "cuisine", isSelected: false },
  { id: "chinese", name: "Chinese", type: "cuisine", isSelected: false },
  { id: "general", name: "General", type: "cuisine", isSelected: false },
  
  // Cooking Time
  { id: "short", name: "Short (<30 min)", type: "time", isSelected: false },
  { id: "medium", name: "Medium (30-60 min)", type: "time", isSelected: false },
  { id: "long", name: "Long (>60 min)", type: "time", isSelected: false },
  
  // Difficulty
  { id: "easy", name: "Easy", type: "difficulty", isSelected: false },
  { id: "medium", name: "Medium", type: "difficulty", isSelected: false },
  { id: "hard", name: "Hard", type: "difficulty", isSelected: false },
  
  // Available Tools
  { id: "blender", name: "Blender", type: "tools", isSelected: false },
  { id: "oven", name: "Oven", type: "tools", isSelected: false },
  { id: "stovetop", name: "Stovetop", type: "tools", isSelected: false },
  { id: "microwave", name: "Microwave", type: "tools", isSelected: false }
];
