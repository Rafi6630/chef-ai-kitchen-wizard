
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define units for dropdown
const units = [
  "piece", "pieces",
  "gram", "grams", "g",
  "kilogram", "kilograms", "kg",
  "milliliter", "milliliters", "ml",
  "liter", "liters", "l",
  "cup", "cups",
  "tablespoon", "tablespoons", "tbsp",
  "teaspoon", "teaspoons", "tsp",
  "ounce", "ounces", "oz",
  "pound", "pounds", "lb",
  "pinch", "pinches"
];

// Form schema
const formSchema = z.object({
  name: z.string().min(1, { message: "Ingredient name is required" }),
  quantity: z.coerce.number().positive().optional(),
  unit: z.string().optional(),
});

interface IngredientInputFormProps {
  onAddIngredient: (ingredient: { name: string; quantity?: number; unit?: string }) => void;
  onClose?: () => void;
}

export default function IngredientInputForm({ onAddIngredient, onClose }: IngredientInputFormProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { toast } = useToast();
  
  // Common ingredients for suggestions
  const commonIngredients = [
    "Chicken", "Beef", "Rice", "Pasta", "Tomatoes", "Onions", "Garlic",
    "Olive Oil", "Salt", "Pepper", "Eggs", "Milk", "Cheese", "Flour",
    "Sugar", "Potatoes", "Carrots", "Lettuce", "Lemon", "Butter"
  ];
  
  // Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      quantity: undefined,
      unit: "pieces",
    },
  });
  
  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onAddIngredient({
      name: values.name,
      quantity: values.quantity,
      unit: values.unit,
    });
    
    toast({
      title: "Ingredient Added",
      description: `${values.name} has been added to your list.`,
    });
    
    form.reset();
  };
  
  // Handle input change for ingredient name with suggestions
  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    form.setValue("name", value);
    
    if (value.trim()) {
      const filtered = commonIngredients.filter(item => 
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5)); // Show at most 5 suggestions
    } else {
      setSuggestions([]);
    }
  };
  
  // Select suggestion
  const selectSuggestion = (suggestion: string) => {
    form.setValue("name", suggestion);
    setSuggestions([]);
  };
  
  // Quick add ingredient with just the name
  const quickAddIngredient = (name: string) => {
    onAddIngredient({ name });
    
    toast({
      title: "Ingredient Added",
      description: `${name} has been added to your list.`,
    });
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Add Ingredient</h3>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose} className="p-1">
            <X size={18} />
          </Button>
        )}
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Ingredient Name</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="e.g. Tomatoes"
                      onChange={handleNameInputChange}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => selectSuggestion(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Quantity (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      type="number"
                      placeholder="e.g. 2"
                      step="0.1"
                      value={field.value || ''}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Unit (Optional)</FormLabel>
                  <FormControl>
                    <select 
                      {...field}
                      className="w-full rounded-md border border-gray-200 dark:border-gray-700 h-10 px-3 py-2 text-sm"
                    >
                      {units.map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="pt-2">
            <Button type="submit" className="w-full bg-chef-primary">
              <Save size={16} className="mr-2" />
              Add Ingredient
            </Button>
          </div>
        </form>
      </Form>
      
      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2">Quick Add Common Ingredients</h4>
        <div className="flex flex-wrap gap-2">
          {commonIngredients.slice(0, 6).map((ingredient) => (
            <Button
              key={ingredient}
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => quickAddIngredient(ingredient)}
            >
              <Plus size={14} className="mr-1" />
              {ingredient}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
