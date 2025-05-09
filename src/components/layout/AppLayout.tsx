
import { ReactNode, useEffect } from "react";
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
  // Apply safe-area-inset for iOS devices
  useEffect(() => {
    // Add viewport meta tag for iOS devices
    const existingMetaTag = document.querySelector('meta[name="viewport"]');
    if (existingMetaTag) {
      existingMetaTag.setAttribute('content', 'width=device-width, initial-scale=1, viewport-fit=cover');
    } else {
      const metaTag = document.createElement('meta');
      metaTag.name = 'viewport';
      metaTag.content = 'width=device-width, initial-scale=1, viewport-fit=cover';
      document.getElementsByTagName('head')[0].appendChild(metaTag);
    }
  }, []);

  return (
    <div className="app-container min-h-screen bg-gray-50 dark:bg-gray-900 border-x border-gray-100 dark:border-gray-800 max-w-lg mx-auto shadow-xl">
      {/* Apply safe area padding top for iPhone notch */}
      <div className={`pb-20 ${className} max-w-full overflow-x-hidden pt-safe`}>
        {children}
      </div>
      {/* Apply safe area padding bottom for iPhone home indicator */}
      {showNavigation && (
        <div className="pb-safe">
          <BottomNavigation />
        </div>
      )}
    </div>
  );
}
