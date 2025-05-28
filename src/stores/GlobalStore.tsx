// Libraries
import { createContext, useEffect, useState } from "react";

// Types
import { ThemeType } from "@/types/ThemeType";

// Props
import { LayoutProps } from "@/props/LayoutProps";

type GlobalStoreType = {
  theme: ThemeType;
  toggleTheme: () => void;
  filter: boolean;
  toggleFilter: () => void;
  keyword: string;
  setKeyword: (keyword: string) => void;
};

export const GlobalStore = createContext<GlobalStoreType>({
  theme: 'dark',
  toggleTheme: () => {},
  filter: true,
  toggleFilter: () => {},
  keyword: '',
  setKeyword: () => {},
});

export const GlobalProvider: React.FC<LayoutProps> = ({ children }) => {

  const [ theme, setTheme ] = useState<ThemeType>('dark');
  const [ filter, setFilter ] = useState<boolean>(true);
  const [ keyword, setKeyword ] = useState<string>('');

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    let stored = localStorage.getItem("theme") as ThemeType | null;
    if (!stored) {
      stored = prefersDark ? 'dark' : 'light';
      localStorage.setItem("theme", stored);
    }
    setTheme(stored);
    document.documentElement.classList.toggle("dark", stored === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const toggleFilter = () => {
    setFilter(!filter);
  };

  return (
    <GlobalStore.Provider value={{ theme, toggleTheme, filter, toggleFilter, keyword, setKeyword }}>
      {children}
    </GlobalStore.Provider>
  );

};
