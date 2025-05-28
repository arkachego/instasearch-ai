'use client';

// Props
import { LayoutProps } from "@/props/LayoutProps";

// Stores
import { GlobalProvider } from "@/stores/GlobalStore";

const UILayout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <GlobalProvider>
      {children}
    </GlobalProvider>
  );

};

export default UILayout;
