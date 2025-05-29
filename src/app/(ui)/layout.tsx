'use client';

// Props
import { LayoutProps } from "@/props/LayoutProps";

// Stores
import { GlobalProvider } from "@/stores/GlobalStore";
import { QueryProvider } from "@/stores/QueryStore";

const UILayout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <GlobalProvider>
      <QueryProvider>
        {children}
      </QueryProvider>
    </GlobalProvider>
  );

};

export default UILayout;
