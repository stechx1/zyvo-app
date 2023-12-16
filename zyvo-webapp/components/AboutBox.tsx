import { poppins } from "@/lib/utils";

export const AboutBox = ({
  heading,
  para,
}: {
  heading: string;
  para: string;
}) => {
  return (
    <div className="flex flex-col p-7 border shadow-sm rounded-lg gap-2 min-h-[320px]">
      <span className={`text-3xl font-[500] ${poppins.className}`}>
        {heading}
      </span>
      <span>{para}</span>
    </div>
  );
};
