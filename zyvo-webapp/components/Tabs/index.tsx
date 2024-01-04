export const Tabs = ({
  options,
  selected,
  onSelect,
}: {
  options: { name: string; value: number | string }[];
  selected: string | number;
  onSelect?: (option: { name: string; value: number | string }) => void;
}) => {
  return (
    <div className="flex justify-between text-center bg-gray-200 xl:px-2 lg:px-2 md:px-2 sm:px-2 px-1 xl:py-2 lg:py-2 md:py-2 sm:py-2 py-1 rounded-full">
      {options.map((item, i) => {
        return (
          <div
            key={i}
            onClick={() => {
              onSelect && onSelect(item);
            }}
            className={`w-[45%] py-2 xl:py-1 lg:py-1 md:py-1 sm:py-1 rounded-full text-xs md:text-base sm:text-base lg:text-base xl:text-base ${
              item.value === selected
                ? "bg-white pointer-events-none"
                : "cursor-pointer"
            }`}
          >
            {item.name}
          </div>
        );
      })}
    </div>
  );
};
