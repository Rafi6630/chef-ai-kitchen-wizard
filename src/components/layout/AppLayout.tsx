
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
    <div className="app-container">
      <div className={`pb-20 ${className}`}>
        {children}
      </div>
      {showNavigation && <BottomNavigation />}
    </div>
  );
}
