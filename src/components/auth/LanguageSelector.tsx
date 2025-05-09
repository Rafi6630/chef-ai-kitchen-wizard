
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  rtl?: boolean;
}

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "ar", name: "Arabic", nativeName: "العربية", rtl: true },
  { code: "tr", name: "Turkish", nativeName: "Türkçe" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "fr", name: "French", nativeName: "Français" },
];

// Translation data for all UI elements
const translations: Record<string, Record<string, string>> = {
  "en": {
    "home": "Home",
    "browse": "Global",
    "pantry": "Pantry",
    "profile": "Profile",
    "findRecipes": "Find Recipes",
    "ingredients": "Ingredients",
    "filters": "Filters",
    "addIngredient": "Add Ingredient",
    "selectCategory": "Select a Category",
    "selectSubcategory": "Select a Subcategory",
    "applyFilters": "Apply Filters",
    "chefAI": "Chef AI",
    "whatCook": "What would you like to cook today?",
    "food": "Food",
    "desserts": "Desserts",
    "drinks": "Drinks",
    "addYourIngredients": "Add Your Ingredients",
    "findRecipesBtn": "Find Recipes",
    "quickFilters": "Quick Filters",
    "savedRecipes": "Saved Recipes",
    "history": "History",
    "globalCuisine": "Global Cuisine",
    "shareCreation": "Share Your Culinary Creation",
    "shareDesc": "Share your recipes, get feedback, and inspire others with your cooking skills.",
    "createShare": "Create and Share Recipe",
    "selectFromPantry": "Select from Pantry",
    "quickAdd": "Quick Add Popular Ingredients",
    "noIngredientsSelected": "No ingredients selected yet",
    "smartPantry": "Smart Pantry",
    "trackManage": "Track and manage your ingredients",
    "searchIngredients": "Search ingredients...",
    "addItem": "Add Item",
    "quickRecipe": "Find Quick Recipe with Pantry Items",
    "globalCuisineDesc": "Browse recipes from around the world",
    "searchRecipes": "Search recipes...",
    "selectCuisine": "Choose Cuisine",
    "mealType": "Meal Type",
    "clearFilters": "Clear Filters",
    "allRecipes": "All Recipes",
    "recipesFound": "recipes found",
    "noRecipesFound": "No recipes found matching your criteria",
    "resetFilters": "Reset Filters"
  },
  "ar": {
    "home": "الرئيسية",
    "browse": "عالمي",
    "pantry": "المخزن",
    "profile": "الملف الشخصي",
    "findRecipes": "ابحث عن الوصفات",
    "ingredients": "المكونات",
    "filters": "التصفية",
    "addIngredient": "أضف مكونا",
    "selectCategory": "اختر فئة",
    "selectSubcategory": "اختر فئة فرعية",
    "applyFilters": "تطبيق التصفية",
    "chefAI": "الشيف الذكي",
    "whatCook": "ماذا تريد أن تطبخ اليوم؟",
    "food": "طعام",
    "desserts": "حلويات",
    "drinks": "مشروبات",
    "addYourIngredients": "أضف المكونات الخاصة بك",
    "findRecipesBtn": "ابحث عن الوصفات",
    "quickFilters": "تصفية سريعة",
    "savedRecipes": "الوصفات المحفوظة",
    "history": "التاريخ",
    "globalCuisine": "المطبخ العالمي",
    "shareCreation": "شارك إبداعك الطهي",
    "shareDesc": "شارك وصفاتك، واحصل على ردود الفعل، وألهم الآخرين بمهاراتك في الطهي.",
    "createShare": "إنشاء ومشاركة الوصفة",
    "selectFromPantry": "اختر من المخزن",
    "quickAdd": "إضافة سريعة للمكونات الشائعة",
    "noIngredientsSelected": "لم يتم اختيار مكونات بعد",
    "smartPantry": "المخزن الذكي",
    "trackManage": "تتبع وإدارة المكونات الخاصة بك",
    "searchIngredients": "ابحث عن المكونات...",
    "addItem": "أضف عنصر",
    "quickRecipe": "ابحث عن وصفة سريعة باستخدام عناصر المخزن",
    "globalCuisineDesc": "تصفح الوصفات من جميع أنحاء العالم",
    "searchRecipes": "ابحث عن الوصفات...",
    "selectCuisine": "اختر المطبخ",
    "mealType": "نوع الوجبة",
    "clearFilters": "مسح التصفية",
    "allRecipes": "جميع الوصفات",
    "recipesFound": "وصفات وجدت",
    "noRecipesFound": "لم يتم العثور على وصفات تطابق معاييرك",
    "resetFilters": "إعادة ضبط التصفية"
  },
  "tr": {
    "home": "Ana Sayfa",
    "browse": "Küresel",
    "pantry": "Kiler",
    "profile": "Profil",
    // ... Additional translations would be added here
  },
  "es": {
    "home": "Inicio",
    "browse": "Global",
    "pantry": "Despensa",
    "profile": "Perfil",
    // ... Additional translations would be added here
  },
  "fr": {
    "home": "Accueil",
    "browse": "Mondial",
    "pantry": "Garde-manger",
    "profile": "Profil",
    // ... Additional translations would be added here
  }
};

export default function LanguageSelector() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);
  const { toast } = useToast();

  // Apply language selection to the document and save to localStorage
  useEffect(() => {
    // Load saved language on component mount
    const savedLang = localStorage.getItem("preferredLanguage");
    if (savedLang) {
      const lang = languages.find(l => l.code === savedLang);
      if (lang) {
        setCurrentLanguage(lang);
        applyLanguageSettings(lang);
      }
    }
  }, []); // Run only on component mount

  const applyLanguageSettings = (language: Language) => {
    document.documentElement.lang = language.code;
    window.localStorage.setItem("currentTranslations", JSON.stringify(translations[language.code]));
    
    // Set text direction for RTL languages
    if (language.rtl) {
      document.documentElement.dir = "rtl";
      document.body.classList.add("rtl");
      
      // Add RTL specific styles
      const rtlStyle = document.getElementById('rtl-styles');
      if (!rtlStyle) {
        const styleTag = document.createElement('style');
        styleTag.id = 'rtl-styles';
        styleTag.innerHTML = `
          .rtl {
            direction: rtl;
            text-align: right;
          }
          .rtl .app-container {
            direction: rtl;
          }
          .rtl input, .rtl textarea {
            text-align: right;
          }
          .rtl .dropdown-menu {
            text-align: right;
          }
          .rtl .flex {
            flex-direction: row-reverse;
          }
          .rtl .ml-2 {
            margin-left: 0;
            margin-right: 0.5rem;
          }
          .rtl .mr-2 {
            margin-right: 0;
            margin-left: 0.5rem;
          }
          .rtl .bottom-nav {
            direction: ltr; /* Keep layout the same */
          }
          .rtl .bottom-nav-item {
            flex-direction: column;
          }
          .rtl .text-left {
            text-align: right;
          }
          .rtl .text-right {
            text-align: left;
          }
        `;
        document.head.appendChild(styleTag);
      }
    } else {
      document.documentElement.dir = "ltr";
      document.body.classList.remove("rtl");
      
      // Remove RTL specific styles
      const rtlStyle = document.getElementById('rtl-styles');
      if (rtlStyle) {
        rtlStyle.remove();
      }
    }
    
    localStorage.setItem("preferredLanguage", language.code);
    
    // Dispatch an event that other components can listen for
    const event = new CustomEvent('languageChanged', { detail: { code: language.code, translations: translations[language.code] } });
    document.dispatchEvent(event);
  };

  const handleLanguageChange = (lang: Language) => {
    setCurrentLanguage(lang);
    applyLanguageSettings(lang);
    
    toast({
      title: `Language Changed: ${lang.name}`,
      description: `The app language has been changed to ${lang.nativeName}.`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md"
        >
          <Globe size={16} />
          <span>{currentLanguage.nativeName}</span>
          <ChevronDown size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 border border-gray-200 dark:border-gray-700">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language)}
            className="flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <span>
              {language.nativeName} {language.name !== language.nativeName && `(${language.name})`}
            </span>
            {currentLanguage.code === language.code && <Check size={16} />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
