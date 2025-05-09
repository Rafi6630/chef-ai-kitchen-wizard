
import { Home, Search, BookOpen, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

interface Translations {
  home: string;
  browse: string;
  pantry: string;
  profile: string;
  [key: string]: string;
}

const defaultTranslations: Translations = {
  home: "Home",
  browse: "Global",
  pantry: "Pantry",
  profile: "Profile"
};

export default function BottomNavigation() {
  const location = useLocation();
  const [translations, setTranslations] = useState<Translations>(defaultTranslations);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  useEffect(() => {
    // Get initial translations
    const storedTranslations = localStorage.getItem("currentTranslations");
    if (storedTranslations) {
      try {
        const parsedTranslations = JSON.parse(storedTranslations);
        setTranslations({
          home: parsedTranslations.home || defaultTranslations.home,
          browse: parsedTranslations.browse || defaultTranslations.browse,
          pantry: parsedTranslations.pantry || defaultTranslations.pantry,
          profile: parsedTranslations.profile || defaultTranslations.profile
        });
      } catch (e) {
        console.error("Error parsing translations:", e);
      }
    }
    
    // Listen for language changes
    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.translations) {
        const newTranslations = customEvent.detail.translations;
        setTranslations({
          home: newTranslations.home || defaultTranslations.home,
          browse: newTranslations.browse || defaultTranslations.browse,
          pantry: newTranslations.pantry || defaultTranslations.pantry,
          profile: newTranslations.profile || defaultTranslations.profile
        });
      }
    };
    
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);
  
  return (
    <div className="bottom-nav fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg dark:shadow-gray-900/50 h-16 grid grid-cols-4 items-center z-50 max-w-screen-lg mx-auto">
      <Link to="/" className={`bottom-nav-item flex flex-col items-center justify-center h-full ${isActive('/') ? 'text-chef-primary' : 'text-gray-500 dark:text-gray-400'}`}>
        <div className={`p-1.5 rounded-full ${isActive('/') ? 'bg-chef-primary/10' : ''}`}>
          <Home size={20} />
        </div>
        <span className="text-xs mt-1">{translations.home}</span>
      </Link>
      <Link to="/browse" className={`bottom-nav-item flex flex-col items-center justify-center h-full ${isActive('/browse') ? 'text-chef-primary' : 'text-gray-500 dark:text-gray-400'}`}>
        <div className={`p-1.5 rounded-full ${isActive('/browse') ? 'bg-chef-primary/10' : ''}`}>
          <Search size={20} />
        </div>
        <span className="text-xs mt-1">{translations.browse}</span>
      </Link>
      <Link to="/pantry" className={`bottom-nav-item flex flex-col items-center justify-center h-full ${isActive('/pantry') ? 'text-chef-primary' : 'text-gray-500 dark:text-gray-400'}`}>
        <div className={`p-1.5 rounded-full ${isActive('/pantry') ? 'bg-chef-primary/10' : ''}`}>
          <BookOpen size={20} />
        </div>
        <span className="text-xs mt-1">{translations.pantry}</span>
      </Link>
      <Link to="/profile" className={`bottom-nav-item flex flex-col items-center justify-center h-full ${isActive('/profile') ? 'text-chef-primary' : 'text-gray-500 dark:text-gray-400'}`}>
        <div className={`p-1.5 rounded-full ${isActive('/profile') ? 'bg-chef-primary/10' : ''}`}>
          <User size={20} />
        </div>
        <span className="text-xs mt-1">{translations.profile}</span>
      </Link>
    </div>
  );
}
