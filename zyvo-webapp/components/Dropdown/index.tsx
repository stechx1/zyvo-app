import React, { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Dropdown({
  children,
  items,
}: {
  children: ReactNode;
  items: { title: string; onClick?: () => void }[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {items.map((item) => {
          return (
            <DropdownMenuItem
              key={item.title}
              onClick={() => item.onClick && item.onClick()}
            >
              {item.title}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
