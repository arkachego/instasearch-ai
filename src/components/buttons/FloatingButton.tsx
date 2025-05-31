'use client'

// Libraries
import { IconMenu, IconMenu2, IconPlus } from "@tabler/icons-react";

// Components
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type FloatingButtonProps = {
  children: React.ReactNode;
  opened: boolean;
  setOpened: (opened: boolean) => void;
};

const FloatingButton: React.FC<FloatingButtonProps> = ({ children, opened, setOpened }) => {
  
  return (
    <div className="md:hidden fixed bottom-21 right-4 z-50">
      <Popover open={opened} onOpenChange={(open: boolean) => setOpened(open)}>
        <PopoverTrigger asChild>
          <Button className="rounded-full w-10 h-10 p-0 shadow-lg" variant="default">
            <IconMenu2 className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent side="top" align="end" className="w-auto p-2 flex flex-col gap-2">
          {children}
        </PopoverContent>
      </Popover>
    </div>
  );

};

export default FloatingButton;
