import { LucideIcon } from "lucide-react";

interface CategoryButtonProps {
  Props: {
    Icon: LucideIcon;
    label: string;
  };

  categorySearch: (label: string) => void;
}

export function CategoryButton({ Props, categorySearch }: CategoryButtonProps) {
  return (
    <button
      onClick={() => categorySearch(Props.label)}
      className="bg-white rounded-lg shadow-sm w-28 md:w-44 h-12 flex flex-row justify-center items-center cursor-pointer hover:bg-orange-400 hover:text-white"
    >
      <Props.Icon />
      <span className="font-semibold text-md ml-2">{Props.label}</span>
    </button>
  );
}
