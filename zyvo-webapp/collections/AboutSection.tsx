import { poppins } from "@/lib/utils";

/* eslint-disable @next/next/no-img-element */
export const AboutSection = () => {
  return (
    <div
      data-aos="fade-up"
      className="max-w-[736px] text-center space-y-6 pt-64 pb-32"
    >
      <h1
        className={`md:text-7xl text-[40px] font-bold md:leading-[84px] ${poppins.className}`}
      >
        Meet ZYVO
      </h1>
      <p className="md:text-2xl text-[20px]">
        The leading platform for hourly rentals
      </p>
    </div>
  );
};
