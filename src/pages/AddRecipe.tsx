
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Trash2, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { useToast } from "@/hooks/use-toast";

export default function AddRecipe() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");
  const [ingredients, setIngredients] = useState<{ name: string; quantity: string; unit: string }[]>(
    [{ name: "", quantity: "", unit: "" }]
  );
  const [instructions, setInstructions] = useState<string[]>([""]); 
  const [images, setImages] = useState<File[]>([]);
  const [imageUrl, setImageUrl] = useState<string>("");
  
  const { toast } = useToast();
  
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "", unit: "" }]);
  };
  
  const handleRemoveIngredient = (index: number) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };
  
  const handleIngredientChange = (index: number, field: string, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setIngredients(newIngredients);
  };
  
  const handleAddInstruction = () => {
    setInstructions([...instructions, ""]);
  };
  
  const handleRemoveInstruction = (index: number) => {
    const newInstructions = [...instructions];
    newInstructions.splice(index, 1);
    setInstructions(newInstructions);
  };
  
  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setImages(prevImages => [...prevImages, ...filesArray]);
      
      // Create a preview URL for the first image
      if (imageUrl === "") {
        const fileUrl = URL.createObjectURL(e.target.files[0]);
        setImageUrl(fileUrl);
      }
    }
  };
  
  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    
    // Update preview URL if needed
    if (images.length === 1) {
      setImageUrl("");
    } else if (index === 0 && newImages.length > 0) {
      setImageUrl(URL.createObjectURL(newImages[0]));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!title || !description || !cuisine || !difficulty || !prepTime || !cookTime || !servings) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (ingredients.length === 0 || ingredients.some(i => !i.name)) {
      toast({
        title: "Missing Ingredients",
        description: "Please add at least one ingredient.",
        variant: "destructive"
      });
      return;
    }
    
    if (instructions.length === 0 || instructions.some(i => !i)) {
      toast({
        title: "Missing Instructions",
        description: "Please add at least one instruction step.",
        variant: "destructive"
      });
      return;
    }
    
    if (images.length === 0) {
      toast({
        title: "Missing Image",
        description: "Please upload at least one image.",
        variant: "destructive"
      });
      return;
    }
    
    // Submit recipe
    toast({
      title: "Recipe Submitted",
      description: "Your recipe has been submitted for review.",
    });
    
    // In a real app, we would send the data to the server
    console.log({
      title,
      description,
      cuisine,
      difficulty,
      prepTime,
      cookTime,
      servings,
      ingredients,
      instructions,
      images
    });
    
    // Reset form
    setTitle("");
    setDescription("");
    setCuisine("");
    setDifficulty("");
    setPrepTime("");
    setCookTime("");
    setServings("");
    setIngredients([{ name: "", quantity: "", unit: "" }]);
    setInstructions([""]);
    setImages([]);
    setImageUrl("");
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
          <h1 className="text-2xl font-bold">Add Your Recipe</h1>
        </div>
        <p className="text-gray-600 text-sm">Share your cooking expertise with the community</p>
      </header>

      <main className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Recipe Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Recipe Photos</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
              {imageUrl ? (
                <div className="relative">
                  <img src={imageUrl} alt="Recipe preview" className="mx-auto h-48 object-cover rounded-lg" />
                  <div className="mt-4 flex flex-wrap gap-2">
                    {images.map((img, index) => (
                      <div key={index} className="relative">
                        <div className="w-16 h-16 rounded-md bg-gray-100 flex items-center justify-center">
                          <span className="text-xs">{img.name.substring(0, 10)}</span>
                        </div>
                        <button
                          type="button"
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                    <label className="w-16 h-16 rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer">
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      <Plus size={24} className="text-gray-400" />
                    </label>
                  </div>
                </div>
              ) : (
                <label className="cursor-pointer block">
                  <div className="flex flex-col items-center justify-center">
                    <Upload size={32} className="text-gray-400 mb-2" />
                    <span className="text-gray-600 mb-1">Upload Recipe Photos</span>
                    <span className="text-gray-400 text-xs">Click to browse or drag images here</span>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    className="hidden" 
                    multiple
                  />
                </label>
              )}
            </div>
          </div>
          
          {/* Recipe Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Title</label>
              <Input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Give your recipe a name"
                required 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <Textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Tell us about your recipe"
                rows={3}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cuisine Type</label>
                <Select value={cuisine} onValueChange={setCuisine}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cuisine" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="italian">Italian</SelectItem>
                    <SelectItem value="mexican">Mexican</SelectItem>
                    <SelectItem value="indian">Indian</SelectItem>
                    <SelectItem value="chinese">Chinese</SelectItem>
                    <SelectItem value="middle-eastern">Middle Eastern</SelectItem>
                    <SelectItem value="american">American</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prep Time (mins)</label>
                <Input 
                  value={prepTime} 
                  onChange={(e) => setPrepTime(e.target.value)} 
                  type="number"
                  min="0"
                  placeholder="20"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cook Time (mins)</label>
                <Input 
                  value={cookTime} 
                  onChange={(e) => setCookTime(e.target.value)}
                  type="number" 
                  min="0"
                  placeholder="30"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Servings</label>
                <Input 
                  value={servings} 
                  onChange={(e) => setServings(e.target.value)}
                  type="number"
                  min="1" 
                  placeholder="4"
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Ingredients */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Ingredients</label>
              <Button type="button" variant="outline" size="sm" onClick={handleAddIngredient}>
                <Plus size={16} className="mr-1" />
                Add Ingredient
              </Button>
            </div>
            
            <div className="space-y-3">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-2">
                  <Input 
                    value={ingredient.quantity} 
                    onChange={(e) => handleIngredientChange(index, "quantity", e.target.value)}
                    placeholder="Amount"
                    className="w-20 flex-shrink-0"
                  />
                  <Input 
                    value={ingredient.unit} 
                    onChange={(e) => handleIngredientChange(index, "unit", e.target.value)}
                    placeholder="Unit"
                    className="w-24 flex-shrink-0"
                  />
                  <Input 
                    value={ingredient.name} 
                    onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                    placeholder="Ingredient name"
                    className="flex-grow"
                  />
                  {ingredients.length > 1 && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleRemoveIngredient(index)}
                      className="flex-shrink-0"
                    >
                      <Trash2 size={16} />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Instructions */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Instructions</label>
              <Button type="button" variant="outline" size="sm" onClick={handleAddInstruction}>
                <Plus size={16} className="mr-1" />
                Add Step
              </Button>
            </div>
            
            <div className="space-y-3">
              {instructions.map((instruction, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <div className="w-6 h-6 rounded-full bg-chef-primary text-white flex items-center justify-center flex-shrink-0 mt-2">
                    {index + 1}
                  </div>
                  <Textarea 
                    value={instruction} 
                    onChange={(e) => handleInstructionChange(index, e.target.value)}
                    placeholder="Explain this step..."
                    className="flex-grow"
                    rows={2}
                  />
                  {instructions.length > 1 && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleRemoveInstruction(index)}
                      className="flex-shrink-0 mt-1"
                    >
                      <Trash2 size={16} />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-4">
            <Button type="submit" className="w-full bg-chef-primary">
              Submit Recipe for Review
            </Button>
            <p className="text-xs text-gray-500 text-center mt-2">
              Your recipe will be reviewed by our team before being published.
            </p>
          </div>
        </form>
      </main>
    </AppLayout>
  );
}
