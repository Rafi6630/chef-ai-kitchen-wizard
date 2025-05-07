
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import AppLayout from "@/components/layout/AppLayout";

export default function DietaryPreferences() {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState({
    dietType: "omnivore",
    allergies: {
      dairy: false,
      gluten: false,
      nuts: false,
      shellfish: false,
      soy: false,
      eggs: false,
    },
    religious: {
      halal: false,
      kosher: false,
    },
    healthGoals: {
      lowCalorie: false,
      lowCarb: false,
      highProtein: false,
      lowFat: false,
    }
  });

  const handleSave = () => {
    // In a real app, save preferences to backend
    toast({
      title: "Preferences Saved",
      description: "Your dietary preferences have been updated.",
    });
  };

  return (
    <AppLayout>
      <header className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center mb-1">
          <Link to="/profile" className="mr-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Dietary Preferences</h1>
        </div>
        <p className="text-gray-600 text-sm">Customize your recipe recommendations</p>
      </header>

      <main className="p-6 space-y-6">
        {/* Diet Type */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="font-semibold text-lg mb-4">Diet Type</h2>
          <RadioGroup 
            value={preferences.dietType} 
            onValueChange={(value) => setPreferences({...preferences, dietType: value})}
          >
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="omnivore" id="omnivore" />
                <Label htmlFor="omnivore">Omnivore (No Restrictions)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="vegetarian" id="vegetarian" />
                <Label htmlFor="vegetarian">Vegetarian</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="vegan" id="vegan" />
                <Label htmlFor="vegan">Vegan</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pescatarian" id="pescatarian" />
                <Label htmlFor="pescatarian">Pescatarian</Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Allergies */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="font-semibold text-lg mb-4">Food Allergies & Intolerances</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="dairy" 
                checked={preferences.allergies.dairy}
                onCheckedChange={(checked) => 
                  setPreferences({
                    ...preferences, 
                    allergies: {...preferences.allergies, dairy: !!checked}
                  })
                }
              />
              <Label htmlFor="dairy">Dairy</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="gluten" 
                checked={preferences.allergies.gluten}
                onCheckedChange={(checked) => 
                  setPreferences({
                    ...preferences, 
                    allergies: {...preferences.allergies, gluten: !!checked}
                  })
                }
              />
              <Label htmlFor="gluten">Gluten</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="nuts" 
                checked={preferences.allergies.nuts}
                onCheckedChange={(checked) => 
                  setPreferences({
                    ...preferences, 
                    allergies: {...preferences.allergies, nuts: !!checked}
                  })
                }
              />
              <Label htmlFor="nuts">Tree Nuts</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="shellfish" 
                checked={preferences.allergies.shellfish}
                onCheckedChange={(checked) => 
                  setPreferences({
                    ...preferences, 
                    allergies: {...preferences.allergies, shellfish: !!checked}
                  })
                }
              />
              <Label htmlFor="shellfish">Shellfish</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="soy" 
                checked={preferences.allergies.soy}
                onCheckedChange={(checked) => 
                  setPreferences({
                    ...preferences, 
                    allergies: {...preferences.allergies, soy: !!checked}
                  })
                }
              />
              <Label htmlFor="soy">Soy</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="eggs" 
                checked={preferences.allergies.eggs}
                onCheckedChange={(checked) => 
                  setPreferences({
                    ...preferences, 
                    allergies: {...preferences.allergies, eggs: !!checked}
                  })
                }
              />
              <Label htmlFor="eggs">Eggs</Label>
            </div>
          </div>
        </div>

        {/* Religious Restrictions */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="font-semibold text-lg mb-4">Religious Dietary Restrictions</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="halal" 
                checked={preferences.religious.halal}
                onCheckedChange={(checked) => 
                  setPreferences({
                    ...preferences, 
                    religious: {...preferences.religious, halal: !!checked}
                  })
                }
              />
              <Label htmlFor="halal">Halal</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="kosher" 
                checked={preferences.religious.kosher}
                onCheckedChange={(checked) => 
                  setPreferences({
                    ...preferences, 
                    religious: {...preferences.religious, kosher: !!checked}
                  })
                }
              />
              <Label htmlFor="kosher">Kosher</Label>
            </div>
          </div>
        </div>

        {/* Health Goals */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="font-semibold text-lg mb-4">Health Goals</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="lowCalorie" 
                checked={preferences.healthGoals.lowCalorie}
                onCheckedChange={(checked) => 
                  setPreferences({
                    ...preferences, 
                    healthGoals: {...preferences.healthGoals, lowCalorie: !!checked}
                  })
                }
              />
              <Label htmlFor="lowCalorie">Low Calorie</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="lowCarb" 
                checked={preferences.healthGoals.lowCarb}
                onCheckedChange={(checked) => 
                  setPreferences({
                    ...preferences, 
                    healthGoals: {...preferences.healthGoals, lowCarb: !!checked}
                  })
                }
              />
              <Label htmlFor="lowCarb">Low Carb</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="highProtein" 
                checked={preferences.healthGoals.highProtein}
                onCheckedChange={(checked) => 
                  setPreferences({
                    ...preferences, 
                    healthGoals: {...preferences.healthGoals, highProtein: !!checked}
                  })
                }
              />
              <Label htmlFor="highProtein">High Protein</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="lowFat" 
                checked={preferences.healthGoals.lowFat}
                onCheckedChange={(checked) => 
                  setPreferences({
                    ...preferences, 
                    healthGoals: {...preferences.healthGoals, lowFat: !!checked}
                  })
                }
              />
              <Label htmlFor="lowFat">Low Fat</Label>
            </div>
          </div>
        </div>

        <Button className="w-full bg-chef-primary" onClick={handleSave}>
          Save Preferences
        </Button>
      </main>
    </AppLayout>
  );
}
