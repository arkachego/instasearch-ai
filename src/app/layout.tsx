// Libraries
import type { Metadata } from "next";
import { Maven_Pro } from "next/font/google";

// Types
import type { LayoutProps } from "@/props/LayoutProps";

// Styles
import './globals.css';

const mavenPro = Maven_Pro({
  variable: "--font-maven-pro",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InstaSearch AI",
  description: "A simple search engine for listed products",
};

const AppLayout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <html lang="en">
      <body className={mavenPro.className}>
        {children}
      </body>
    </html>
  );

};

export default AppLayout;
