import { useEffect, useRef } from "react";

export function CustomDropdown({
  children,
  isOpen,
  setIsOpen,
  parent,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  parent?: React.ReactNode;
}) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const stopPropagation = (event: any) => {
    event.stopPropagation();
  };
  useEffect(() => {
    if (isOpen) document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isOpen]);

  const handleClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  return isOpen || parent ? (
    <div className="relative cursor-pointer" ref={dropdownRef}>
      {parent}
      {isOpen && (
        <div
          className="absolute bg-white rounded-xl shadow-lg mt-[8px] z-10  left-[-42px] sm:left-0"
          onClick={stopPropagation}
        >
          {children}
        </div>
      )}
    </div>
  ) : null;
}
