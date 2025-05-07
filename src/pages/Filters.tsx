
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { filterOptions } from "@/data/mockData";
import { FilterType, FilterOption } from "@/types";
import { useToast } from "@/hooks/use-toast";

export default function Filters() {
  const [filters, setFilters] = useState<FilterOption[]>(filterOptions);
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const getFiltersByType = (type: FilterType) => {
    return filters.filter(filter => filter.type === type);
  };
  
  const toggleFilter = (id: string) => {
    setFilters(
      filters.map(filter => 
        filter.id === id 
          ? { ...filter, isSelected: !filter.isSelected } 
          : filter
      )
    );
  };
  
  const selectOneFilter = (type: FilterType, id: string) => {
    setFilters(
      filters.map(filter => 
        filter.type === type
          ? { ...filter, isSelected: filter.id === id }
          : filter
      )
    );
  };
  
  const selectCuisine = (id: string) => {
    setSelectedCuisine(selectedCuisine === id ? null : id);
  };
  
  const resetFilters = () => {
    setFilters(filters.map(filter => ({ ...filter, isSelected: false })));
    setSelectedCuisine(null);
    toast({
      title: "Filters Reset",
      description: "All filters have been cleared.",
    });
  };
  
  const applyFilters = () => {
    const selectedFilters = filters.filter(filter => filter.isSelected);
    toast({
      title: "Filters Applied",
      description: `${selectedFilters.length} filters applied.`,
    });
    navigate('/');
  };
  
  return (
    <AppLayout showNavigation={false}>
      <header className="px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
        <div className="flex items-center">
          <Link to="/" className="mr-4">
            <ArrowLeft />
          </Link>
          <h1 className="text-xl font-bold">Filters</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={resetFilters} className="text-gray-500">
            Reset
          </Button>
          <Button onClick={applyFilters} className="btn-primary">
            Apply
          </Button>
        </div>
      </header>
      
      <div className="p-6 space-y-8">
        {/* Cuisine/Country - Moved to the top and redesigned */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Cuisine / Country</h2>
          <div className="grid grid-cols-2 gap-3">
            {getFiltersByType("cuisine").map(filter => (
              <div 
                key={filter.id} 
                className={`p-3 border rounded-lg flex items-center cursor-pointer ${
                  selectedCuisine === filter.id ? 'border-chef-primary bg-chef-primary/10' : 'border-gray-200'
                }`}
                onClick={() => selectCuisine(filter.id)}
              >
                <Checkbox 
                  id={`cuisine-${filter.id}`} 
                  checked={selectedCuisine === filter.id}
                  className="mr-2"
                />
                <Label htmlFor={`cuisine-${filter.id}`} className="cursor-pointer w-full">
                  {filter.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Healthy/Diet-Friendly */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Healthy & Diet-Friendly</h2>
          <div className="grid grid-cols-2 gap-3">
            {getFiltersByType("healthy").map(filter => (
              <div 
                key={filter.id} 
                className={`p-3 border rounded-lg flex items-center cursor-pointer ${
                  filter.isSelected ? 'border-chef-primary bg-chef-primary/10' : 'border-gray-200'
                }`}
                onClick={() => toggleFilter(filter.id)}
              >
                <Checkbox 
                  id={filter.id} 
                  checked={filter.isSelected}
                  className="mr-2"
                />
                <Label htmlFor={filter.id} className="cursor-pointer w-full">{filter.name}</Label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Dietary/Religious Restrictions */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Dietary & Religious Restrictions</h2>
          <div className="grid grid-cols-2 gap-3">
            {getFiltersByType("dietary").map(filter => (
              <div 
                key={filter.id} 
                className={`p-3 border rounded-lg flex items-center cursor-pointer ${
                  filter.isSelected ? 'border-chef-primary bg-chef-primary/10' : 'border-gray-200'
                }`}
                onClick={() => toggleFilter(filter.id)}
              >
                <Checkbox 
                  id={filter.id} 
                  checked={filter.isSelected}
                  className="mr-2"
                />
                <Label htmlFor={filter.id} className="cursor-pointer w-full">{filter.name}</Label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Cooking Time */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Cooking Time</h2>
          <div className="space-y-2">
            {getFiltersByType("time").map(filter => (
              <div 
                key={filter.id} 
                className={`p-3 border rounded-lg flex items-center cursor-pointer ${
                  filter.isSelected ? 'border-chef-primary bg-chef-primary/10' : 'border-gray-200'
                }`}
                onClick={() => selectOneFilter("time", filter.id)}
              >
                <RadioGroupItem 
                  id={filter.id} 
                  value={filter.id}
                  checked={filter.isSelected}
                  className="mr-2"
                />
                <Label htmlFor={filter.id} className="cursor-pointer w-full">{filter.name}</Label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Difficulty */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Difficulty</h2>
          <div className="space-y-2">
            {getFiltersByType("difficulty").map(filter => (
              <div 
                key={filter.id} 
                className={`p-3 border rounded-lg flex items-center cursor-pointer ${
                  filter.isSelected ? 'border-chef-primary bg-chef-primary/10' : 'border-gray-200'
                }`}
                onClick={() => selectOneFilter("difficulty", filter.id)}
              >
                <RadioGroupItem 
                  id={filter.id} 
                  value={filter.id}
                  checked={filter.isSelected}
                  className="mr-2"
                />
                <Label htmlFor={filter.id} className="cursor-pointer w-full">{filter.name}</Label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Available Tools */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Available Tools</h2>
          <div className="grid grid-cols-2 gap-3">
            {getFiltersByType("tools").map(filter => (
              <div 
                key={filter.id} 
                className={`p-3 border rounded-lg flex items-center cursor-pointer ${
                  filter.isSelected ? 'border-chef-primary bg-chef-primary/10' : 'border-gray-200'
                }`}
                onClick={() => toggleFilter(filter.id)}
              >
                <Checkbox 
                  id={filter.id} 
                  checked={filter.isSelected}
                  className="mr-2"
                />
                <Label htmlFor={filter.id} className="cursor-pointer w-full">{filter.name}</Label>
              </div>
            ))}
          </div>
        </div>
        
        <Button onClick={applyFilters} className="btn-primary w-full my-6">
          Apply Filters
        </Button>
      </div>
    </AppLayout>
  );
}
