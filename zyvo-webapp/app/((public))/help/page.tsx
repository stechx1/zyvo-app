import Button from "@/components/Button";
import Input from "@/components/Input";
import { poppins } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function Help() {
  return (
    <div className="m-4 sm:m-8 md:m-12 lg:m-16">
      <div className="space-y-5">
        <div className="flex justify-center">
          <p className={`text-3xl font-medium ${poppins.className}}`}>
            Hi Katelyn, how can we help?
          </p>
        </div>
        <div className="flex justify-center">
          <div className="w-60">
            <Input type="search" placeholder="Search Question" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button type="gray" text="Guest" roundedfull />
          <Button type="white" text="Host" roundedfull bordered />
          <div className="w-full ">
            <hr />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-xl font-medium">Guides for guests</div>
            <div className="text-sm">Browse all topics</div>
          </div>
          <div className="flex flex-wrap ">
            <div className="w-[47%] md:w-[15rem] me-2 mt-2">
              <Image
                src={
                  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG91c2V8ZW58MHx8MHx8fDA%3D%3D&auto=format&fit=crop&w=500&q=60"
                }
                alt={"host-image"}
                width={300}
                height={300}
                className="rounded-lg"
              />
              <div className="text-sm font-medium">Booking</div>
            </div>
            <div className="w-[47%] md:w-[15rem] me-2 mt-2">
              <Image
                src={
                  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG91c2V8ZW58MHx8MHx8fDA%3D%3D&auto=format&fit=crop&w=500&q=60"
                }
                alt={"host-image"}
                width={300}
                height={300}
                className="rounded-lg"
              />
              <div className="text-sm font-medium">Booking</div>
            </div>
            <div className="w-[47%] md:w-[15rem] me-2 mt-2">
              <Image
                src={
                  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG91c2V8ZW58MHx8MHx8fDA%3D%3D&auto=format&fit=crop&w=500&q=60"
                }
                alt={"host-image"}
                width={300}
                height={300}
                className="rounded-lg"
              />
              <div className="text-sm font-medium">Payments</div>
            </div>
            <div className="w-[47%] md:w-[15rem] me-2 mt-2">
              <Image
                src={
                  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG91c2V8ZW58MHx8MHx8fDA%3D%3D&auto=format&fit=crop&w=500&q=60"
                }
                alt={"host-image"}
                width={300}
                height={300}
                className="rounded-lg"
              />
              <div className="text-sm font-medium">Security & Safety</div>
            </div>
            <div className="w-[47%] md:w-[15rem] me-2 mt-2">
              <Image
                src={
                  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG91c2V8ZW58MHx8MHx8fDA%3D%3D&auto=format&fit=crop&w=500&q=60"
                }
                alt={"host-image"}
                width={300}
                height={300}
                className="rounded-lg"
              />
              <div className="text-sm font-medium">Cancelations & Refunds</div>
            </div>
          </div>
          <div className="mt-16">
            <div className="text-xl mb-8">Top Articles</div>
            <div className="flex flex-wrap">
              <div className="w-[100%] md:w-[29%] me-2 mb-4">
                <div className="text-lg">Article Topic Title</div>
                <div className="text-sm text-gray-500 mb-2 ">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has...
                </div>
                <hr />
              </div>
              <div className="w-[100%] md:w-[29%] me-2 mb-4">
                <div className="text-lg">Article Topic Title</div>
                <div className="text-sm text-gray-500 mb-2 ">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has...
                </div>
                <hr />
              </div>
              <div className="w-[100%] md:w-[29%] me-2 mb-4">
                <div className="text-lg">Article Topic Title</div>
                <div className="text-sm text-gray-500 mb-2 ">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has...
                </div>
                <hr />
              </div>
              <div className="w-[100%] md:w-[29%] me-2 mb-4">
                <div className="text-lg">Article Topic Title</div>
                <div className="text-sm text-gray-500 mb-2 ">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has...
                </div>
                <hr />
              </div>
              <div className="w-[100%] md:w-[29%] me-2 mb-4">
                <div className="text-lg">Article Topic Title</div>
                <div className="text-sm text-gray-500 mb-2 ">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has...
                </div>
                <hr />
              </div>
              <div className="w-[100%] md:w-[29%] me-2 mb-4">
                <div className="text-lg">Article Topic Title</div>
                <div className="text-sm text-gray-500 mb-2 ">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has...
                </div>
                <hr />
              </div>
              <div className="w-[100%] md:w-[29%] me-2 mb-4">
                <div className="text-lg">Article Topic Title</div>
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
              <p className={`text-3xl font-medium ${poppins.className}}`}>
                Need to get in touch?
              </p>
            </div>
            <div className="flex justify-center my-3">
              <p className="text-sm text-center">
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
