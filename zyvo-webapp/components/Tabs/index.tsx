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
    <div className="flex justify-between text-center bg-gray-200 px-2 py-2 rounded-full">
      {options.map((item, i) => {
        return (
          <div
            key={i}
            onClick={() => {
              onSelect && onSelect(item);
            }}
            className={`w-[45%] py-1 rounded-full ${
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
