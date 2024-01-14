import Button from "@/components/Button";
import Input from "@/components/Input";
import { poppins } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function Help() {
  return (
    <div className="px-4 sm:px-14 md:px-20 lg:px-20 xl:px-32 py-4">
      <div className="space-y-5">
        <div className="flex justify-center">
          <p
            className={`text-[18px] sm:text-3xl font-medium ${poppins.className}}`}
          >
            Hi Katelyn, how can we help?
          </p>
        </div>
        <div className="hidden sm:flex justify-center">
          <div className="w-[19rem]">
            <Input type="search" placeholder="Search Question" />
          </div>
        </div>
        <div className="flex items-center space-x-2 justify-center text-[14px]">
          <Button type="gray" text="Guest" roundedfull />
          <Button type="white" text="Host" roundedfull bordered />
          <div className="hidden sm:block w-full ">
            <hr />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-[16px] sm:text-xl font-medium">
              Guides for guests
            </div>
            <div role="button" className="flex items-center space-x-1 text-[14px] text-xs sm:text-sm">
              <div>Browse all topics</div>
              <Image
                width={6}
                height={6}
                alt=""
                src={"/icons/right-arrow-icon.svg"}
                className="w-[5px] sm:w-[6px]"
              />
            </div>
          </div>
          <div className="grid-cols-2 sm:grid-cols-4 grid flex gap-2 flex-wrap w-full">
            <div className="mt-2 space-y-1">
              <Image
                src={
                  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG91c2V8ZW58MHx8MHx8fDA%3D%3D&auto=format&fit=crop&w=500&q=60"
                }
                alt={"host-image"}
                width={300}
                height={300}
                className="rounded-lg w-full"
              />
              <div className="text-[13px] sm:text-sm font-medium">Booking</div>
            </div>
            <div className="mt-2 space-y-1">
              <Image
                src={
                  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG91c2V8ZW58MHx8MHx8fDA%3D%3D&auto=format&fit=crop&w=500&q=60"
                }
                alt={"host-image"}
                width={300}
                height={300}
                className="rounded-lg w-full"
              />
              <div className="text-[13px] sm:text-sm font-medium">Payments</div>
            </div>
            <div className="mt-2 space-y-1">
              <Image
                src={
                  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG91c2V8ZW58MHx8MHx8fDA%3D%3D&auto=format&fit=crop&w=500&q=60"
                }
                alt={"host-image"}
                width={300}
                height={300}
                className="rounded-lg w-full"
              />
              <div className="text-[13px] sm:text-sm font-medium">
                Security & Safety
              </div>
            </div>
            <div className="mt-2 space-y-1">
              <Image
                src={
                  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG91c2V8ZW58MHx8MHx8fDA%3D%3D&auto=format&fit=crop&w=500&q=60"
                }
                alt={"host-image"}
                width={300}
                height={300}
                className="rounded-lg w-full"
              />
              <div className="text-[13px] sm:text-sm font-medium">
                Cancelations & Refunds
              </div>
            </div>
          </div>
          <div className="mt-9 sm:mt-16">
            <div className="hidden sm:flex text-xl mb-8">Top Articles</div>
            <div className="text-[16px] mb-4">Guides for Guests</div>
            <div className="flex flex-wrap">
              <div className="w-[100%] md:w-[29%] me-2 mb-4">
                <div className="text-[15px] sm:text-lg">
                  Article Topic Title
                </div>
                <div className="text-sm text-gray-500 mb-2 ">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has...
                </div>
                <hr />
              </div>
              <div className="w-[100%] md:w-[29%] me-2 mb-4">
                <div className="text-[15px] sm:text-lg">
                  Article Topic Title
                </div>
                <div className="text-sm text-gray-500 mb-2 ">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has...
                </div>
                <hr />
              </div>
              <div className="w-[100%] md:w-[29%] me-2 mb-4">
                <div className="text-[15px] sm:text-lg">
                  Article Topic Title
                </div>
                <div className="text-sm text-gray-500 mb-2 ">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has...
                </div>
                <hr />
              </div>
              <div className="w-[100%] md:w-[29%] me-2 mb-4">
                <div className="text-[15px] sm:text-lg">
                  Article Topic Title
                </div>
                <div className="text-sm text-gray-500 mb-2 ">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has...
                </div>
                <hr />
              </div>
              <div className="w-[100%] md:w-[29%] me-2 mb-4">
                <div className="text-[15px] sm:text-lg">
                  Article Topic Title
                </div>
                <div className="text-sm text-gray-500 mb-2 ">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has...
                </div>
                <hr />
              </div>
              <div className="w-[100%] md:w-[29%] me-2 mb-4">
                <div className="text-[15px] sm:text-lg">
                  Article Topic Title
                </div>
                <div className="text-sm text-gray-500 mb-2 ">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has...
                </div>
                <hr />
              </div>
              <div className="w-[100%] md:w-[29%] me-2 mb-4">
                <div className="text-[15px] sm:text-lg">
                  Article Topic Title
                </div>
                <div className="text-sm text-gray-500 mb-2 ">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has...
                </div>
                <hr />
              </div>
            </div>
          </div>
          <div className="mt-16">
            <div className="flex justify-center">
              <p
                className={`text-[18px] sm:text-3xl font-medium ${poppins.className}}`}
              >
                Need to get in touch?
              </p>
            </div>
            <div className="flex justify-center my-3">
              <p className="text-[16px] sm:text-sm text-center w-9/12 sm:w-full">
                We’ll start with some questions and get you to the right place.
              </p>
            </div>
          </div>
          <div className="flex justify-center my-3">
            <Button type="green" roundedfull text="Contact Us" />
          </div>
        </div>
      </div>
    </div>
  );
}
