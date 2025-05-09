
import { ReactNode } from "react";
import BottomNavigation from "./BottomNavigation";

interface AppLayoutProps {
  children: ReactNode;
  showNavigation?: boolean;
  className?: string;
}

export default function AppLayout({ 
  children, 
  showNavigation = true,
  className = ""
}: AppLayoutProps) {
  return (
    <div className="app-container min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className={`pb-20 ${className} max-w-full overflow-x-hidden`}>
        {children}
      </div>
      {showNavigation && <BottomNavigation />}
    </div>
  );
}
