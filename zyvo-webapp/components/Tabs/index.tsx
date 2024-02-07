export const Tabs = ({
  options,
  selected,
  onSelect,
  size
}: {
  options: { name: string; value: number | string }[];
  selected: string | number;
  onSelect?: (option: { name: string; value: number | string }) => void;
  size:"sm" | "lg"
}) => {
  return (
    <div className="flex justify-between text-center bg-gray-200 xl:px-[0.35rem] lg:px-[0.35rem] md:px-[0.3rem] sm:px-2 px-1 xl:py-1 lg:py-1 md:py-2 sm:py-2 py-1 rounded-full">
      {options.map((item, i) => {
        return (
          <div
            key={i}
            onClick={() => {
              onSelect && onSelect(item);
            }}
            className={`${size==="lg" && "h-[40px] xl:text-[18px] "} xl:w-[50%] lg:w-[48%] w-[46%] items-center text-center justify-center flex py-2 xl:py-1 lg:py-1 md:py-1 sm:py-1 rounded-full text-sm md:text-base sm:text-base lg:text-md ${
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
