import { cn } from '@/lib/utils';

type DividerProps = {
  orientation?: 'default' | 'vertical';
  className?: string;
};

export const Divider: React.FC<DividerProps> = ({ orientation, className }) => {

  if (orientation === "vertical") {
    return (
      <div className={cn(
        "w-[1px] h-full bg-gradient-to-b from-transparent via-neutral-700 to-transparent dark:via-neutral-300",
        className,
      )} />
    );
  }
  return (
    <div className={cn(
      "h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent dark:via-neutral-300",
      className,
    )} />
  );

};
