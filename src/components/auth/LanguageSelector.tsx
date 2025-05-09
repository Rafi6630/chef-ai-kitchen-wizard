
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
