
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import AppLayout from "@/components/layout/AppLayout";

export default function HealthInfo() {
  const { toast } = useToast();
  const [healthInfo, setHealthInfo] = useState({
    height: "",
    weight: "",
    age: "",
    gender: "prefer-not-to-say",
    activityLevel: "moderate",
    calorieGoal: "",
    proteinGoal: "",
    carbGoal: "",
    fatGoal: "",
    fiberGoal: "",
  });

  const handleChange = (field: string, value: string) => {
    setHealthInfo({
      ...healthInfo,
      [field]: value
    });
  };

  const handleSave = () => {
    // In a real app, save health info to backend
    toast({
      title: "Health Information Saved",
      description: "Your health information has been updated successfully.",
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
          <h1 className="text-2xl font-bold">Health Information</h1>
        </div>
        <p className="text-gray-600 text-sm">Set your nutrition goals and health details</p>
      </header>

      <main className="p-6 space-y-6">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="font-semibold text-lg mb-4">Physical Information</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input 
                  id="height" 
                  type="number" 
                  value={healthInfo.height}
                  onChange={(e) => handleChange('height', e.target.value)}
                  placeholder="175"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input 
                  id="weight" 
                  type="number" 
                  value={healthInfo.weight}
                  onChange={(e) => handleChange('weight', e.target.value)}
                  placeholder="70"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input 
                  id="age" 
                  type="number" 
                  value={healthInfo.age}
                  onChange={(e) => handleChange('age', e.target.value)}
                  placeholder="30"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select 
                  value={healthInfo.gender}
                  onValueChange={(value) => handleChange('gender', value)}
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="non-binary">Non-binary</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="activityLevel">Activity Level</Label>
              <Select 
                value={healthInfo.activityLevel}
                onValueChange={(value) => handleChange('activityLevel', value)}
              >
                <SelectTrigger id="activityLevel">
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                  <SelectItem value="light">Lightly active (light exercise 1-3 days/week)</SelectItem>
                  <SelectItem value="moderate">Moderately active (moderate exercise 3-5 days/week)</SelectItem>
                  <SelectItem value="active">Active (hard exercise 6-7 days/week)</SelectItem>
                  <SelectItem value="very-active">Very active (very hard exercise & physical job)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="font-semibold text-lg mb-4">Nutritional Goals</h2>
          <p className="text-gray-500 text-sm mb-4">Set your daily targets for recipe recommendations</p>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="calorieGoal">Daily Calorie Goal (kcal)</Label>
              <Input 
                id="calorieGoal" 
                type="number" 
                value={healthInfo.calorieGoal}
                onChange={(e) => handleChange('calorieGoal', e.target.value)}
                placeholder="2000"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="proteinGoal">Protein Goal (g)</Label>
                <Input 
                  id="proteinGoal" 
                  type="number" 
                  value={healthInfo.proteinGoal}
                  onChange={(e) => handleChange('proteinGoal', e.target.value)}
                  placeholder="120"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="carbGoal">Carbohydrate Goal (g)</Label>
                <Input 
                  id="carbGoal" 
                  type="number" 
                  value={healthInfo.carbGoal}
                  onChange={(e) => handleChange('carbGoal', e.target.value)}
                  placeholder="250"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fatGoal">Fat Goal (g)</Label>
                <Input 
                  id="fatGoal" 
                  type="number" 
                  value={healthInfo.fatGoal}
                  onChange={(e) => handleChange('fatGoal', e.target.value)}
                  placeholder="65"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fiberGoal">Fiber Goal (g)</Label>
                <Input 
                  id="fiberGoal" 
                  type="number" 
                  value={healthInfo.fiberGoal}
                  onChange={(e) => handleChange('fiberGoal', e.target.value)}
                  placeholder="30"
                />
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm">
          This information is used to personalize your recipe recommendations and nutritional insights.
          It is stored securely and not shared with third parties.
        </p>
        
        <Button onClick={handleSave} className="w-full bg-chef-primary">
          Save Health Information
        </Button>
      </main>
    </AppLayout>
  );
}
