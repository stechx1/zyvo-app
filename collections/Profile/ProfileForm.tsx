import React from "react";
import Image from "next/image";
import { profileState } from "@/types";

export default function ProfileForm({
  state,
  setState,
}: {
  state: profileState[];
  setState: React.Dispatch<React.SetStateAction<profileState[]>>;
}) {
  return state.map((data, di) => {
    return (
      <div className="flex flex-col gap-3" key={di}>
        <div className="text-black text-[18px] sm:text-2xl font-normal font-Poppins">
          {data.title}
        </div>
        <div className="flex gap-3 flex-wrap">
          {data.values.map((value, vi) => (
            <div
              className={`border rounded-full py-3 px-5 gap-3  flex items-center`}
              key={vi}
            >
              {data.icon && (
                <Image src={data.icon} alt={"icon"} width={20} height={20} />
              )}

              <input
                style={{ width: value.length * 10 + 25 + "px" }}
                className={`text-black text-[14px] sm:text-lg font-normal focus:outline-none `}
                value={value}
                onChange={(e) => {
                  setState(
                    state.map((d, i) => {
                      if (i === di) {
                        return {
                          ...d,
                          values: d.values.map((v, ii) =>
                            ii === vi ? e.target.value : v
                          ),
                        };
                      }
                      return d;
                    })
                  );
                }}
              />

              {true && (
                <Image
                  src="/icons/close-icon-grey-background.svg"
                  alt="close-icon"
                  width={25}
                  height={25}
                  className="cursor-pointer"
                  onClick={() => {
                    setState(
                      state.map((d, i) => {
                        if (i === di) {
                          return {
                            ...d,
                            values: d.values.filter((v, ii) => ii !== vi),
                          };
                        }
                        return d;
                      })
                    );
                  }}
                />
              )}
            </div>
          ))}
          <div className="border border-neutral-200 rounded-full py-3 px-5 gap-3 w-fit flex items-center">
            <div className="text-black text-[14px] sm:text-lg font-normal">Add New</div>
            <div
              className="w-[24px] h-[24px] rounded-full bg-secondary-green flex items-center justify-center"
              role="button"
              onClick={() => {
                setState(
                  state.map((d, i) => {
                    if (i === di) {
                      return {
                        ...d,
                        values: [...d.values, ""],
                      };
                    }
                    return d;
                  })
                );
              }}
            >
              <Image
                src="/icons/plus-icon.svg"
                alt="plus-icon"
                width={13}
                height={13}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="h-[0.5px] mt-[40px] opacity-[0.20] bg-secondary-gray-700"></div>
      </div>
    );
  });
}
