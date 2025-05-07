
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
    document.documentElement.lang = currentLanguage.code;
    if (currentLanguage.rtl) {
      document.documentElement.dir = "rtl";
      document.body.classList.add("rtl");
    } else {
      document.documentElement.dir = "ltr";
      document.body.classList.remove("rtl");
    }
    localStorage.setItem("preferredLanguage", currentLanguage.code);
    
    // In real app, we would load translated strings here
    // For now we just show a toast notification
    if (currentLanguage.code !== "en") {
      toast({
        title: `Language Changed: ${currentLanguage.name}`,
        description: `The app language has been changed to ${currentLanguage.nativeName}.`,
      });
    }
  }, [currentLanguage, toast]);

  // Load saved language on component mount
  useEffect(() => {
    const savedLang = localStorage.getItem("preferredLanguage");
    if (savedLang) {
      const lang = languages.find(l => l.code === savedLang);
      if (lang) {
        setCurrentLanguage(lang);
      }
    }
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 text-gray-500"
        >
          <Globe size={16} />
          <span>{currentLanguage.nativeName}</span>
          <ChevronDown size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setCurrentLanguage(language)}
            className="flex items-center justify-between"
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
