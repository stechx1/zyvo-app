"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { useAuthContext } from "@/context/AuthContext";

export default function Messages() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) router.push("/signin");
  }, [user]);

  return (
    <div className="px-4 py-8 ">
      <div className="container flex justify-between space-x-4">
        {/*========================================= conversations ===================================== */}
        <div className="sm:w-[40%] lg:w-[25%] h-[80vh] space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="text-lg">All Conversations</div>
              <Image
                src={"/icons/down.svg"}
                alt="down"
                width={13}
                height={13}
              />
            </div>
            <div className="me-1">
              <Image
                src={"/icons/search.svg"}
                alt="search"
                width={18}
                height={18}
              />
            </div>
          </div>
          <div className="h-[75vh] overflow-auto space-y-3">
            {[1, 2, 3, 4, 5, 6, 7].map((a) => {
              return (
                <div className="flex justify-between items-center border hover:border-gray-600 p-4 rounded-xl space-x-4 me-1">
                  <div className="flex items-center space-x-2">
                    <div className="rounded-full border-2 border-gray-200 p-1 min-w-[40px]">
                      <Image
                        src={"/icons/profile-icon.png"}
                        alt="profile-pic"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className=" flex-col">
                      <div>Host By Mia</div>
                      <div className="text-gray-400">3 minutes ago</div>
                      <div className="line-clamp-1">
                        Hellow, can we Hellow, can we Hellow, can we Hellow, can
                        we
                      </div>
                    </div>
                  </div>
                  <div className="mb-auto min-w-[4px]">
                    <Image
                      src={"/icons/dots.svg"}
                      alt="dots"
                      width={4}
                      height={4}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* ========================================== messages =========================================*/}
        <div className="sm:w-[60%] lg:w-[50%] h-[80vh] border rounded-lg">
          <div className="flex justify-between items-center px-4 py-3">
            <div className="flex space-x-2 items-center">
              <div className="rounded-full border-2 border-gray-200 p-1">
                <Image
                  src={"/icons/profile-icon.png"}
                  alt="profile-pic"
                  width={35}
                  height={35}
                  className="rounded-full"
                />
              </div>
              <div>
                <div>Host by Mia</div>
                <div className="text-green-500">online</div>
              </div>
            </div>
            <div className="flex justify-between items-center space-x-2">
              <div className=" w-[35px] h-[35px] flex items-center justify-center rounded-full border border-gray-300 ">
                <Image
                  src={"/icons/star.svg"}
                  alt="star"
                  width={20}
                  height={20}
                />
              </div>
              <div className=" w-[35px] h-[35px] flex items-center justify-center rounded-full border border-gray-300 ">
                <Image
                  src={"/icons/dots-vertical.svg"}
                  alt="dots"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="flex flex-col justify-between">
            <div className="h-[60vh] overflow-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((value) => {
                return (
                  <div className="px-4 py-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex space-x-2 items-center">
                          <div className="rounded-full border border-gray-200">
                            <Image
                              src={"/icons/profile-icon.png"}
                              alt="profile-pic"
                              width={35}
                              height={35}
                              className="rounded-full"
                            />
                          </div>
                          <div>
                            <div>Host by Mia</div>
                          </div>
                        </div>
                        <div>Hi welcome to our house!</div>
                      </div>
                      <div className="mb-auto mt-1">Jul 20, 2023, 11:32 AM</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center space-x-2 px-4 py-3">
              <div className="w-[100%] relative">
                <input
                  className={`px-4 py-2 border focus:border-gray-400 rounded-full focus:outline-none text-gray-600 w-full sm:text-sm bg-gray-100 `}
                  type={"text"}
                  placeholder={"Type a message..."}
                />
                <div className="absolute right-3 top-[30%]">
                  <Image
                    src={"/icons/file.svg"}
                    alt="file"
                    width={15}
                    height={15}
                  />
                </div>
              </div>
              <div className=" w-[35px] h-[35px] flex items-center justify-center rounded-full  bg-secondary-green ">
                <Image
                  src={"/icons/send.svg"}
                  alt="send"
                  width={15}
                  height={15}
                />
              </div>
            </div>
          </div>
        </div>
        {/* =========================================== side ============================================= */}
        <div className="hidden lg:block lg:w-[25%] space-y-4">
          <div className="border rounded-lg p-4 text-center space-y-2">
            <div>Hosted By</div>
            <div className="flex items-center justify-center space-x-2">
              <div>
                <div className="rounded-full border-2 border-gray-200 p-1">
                  <Image
                    src={"/icons/profile-icon.png"}
                    alt="profile-pic"
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                </div>
              </div>
              <div className="text-lg">Mia J.</div>
              <div>
                <Image
                  src={"/icons/green-tick.svg"}
                  alt="tick"
                  width={15}
                  height={15}
                />
              </div>
            </div>
            <hr />
            <Button
              type="white"
              text="Host Properties"
              bordered
              rounded
              full
              className="border-gray-700"
            />
            <div className="flex items-center justify-center space-x-2">
              <Image
                src={"/icons/time.svg"}
                alt="time"
                width={15}
                height={15}
              />
              <div>Typically responds within 1 hr</div>
            </div>
          </div>
          <div className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <div>From</div>
              <div className="font-bold">United States</div>
            </div>
            <div className="flex justify-between items-center">
              <div>Member Since</div>
              <div>1992</div>
            </div>
            <div className="flex justify-between items-center">
              <div>English</div>
              <div>Native</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
