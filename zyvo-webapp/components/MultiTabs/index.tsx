export const MultiTabs = ({
  options,
  selected,
  onSelect,
}: {
  options: { name: string; value: number | string }[];
  selected: string[] | number[];
  onSelect?: (values: (string | number)[]) => void;
}) => {
  return (
    <div className="flex justify-between text-center bg-gray-200 px-2 py-2 rounded-full">
      {options.map((item, i) => {
        return (
          <div
            key={i}
            role="button"
            onClick={() => {
              if (onSelect) {
                if (!!selected.find((s) => s === item.value)) {
                  onSelect(selected.filter((s) => s !== item.value));
                } else {
                  onSelect([...selected, item.value]);
                }
              }
            }}
            className={`w-[45%] py-1 rounded-full ${
              selected.find((d) => d === item.value) ? "bg-white" : ""
            }`}
          >
            {item.name}
          </div>
        );
      })}
    </div>
  );
};
