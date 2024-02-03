"use client";
import React, { useEffect, useState } from "react";
import { useCommonContext } from "@/context/CommonContext";
import { User } from "@/types/user";
import Input from "@/components/Input";
import { InputSectionProps } from "@/types";
import Button from "@/components/Button";
import { ProfileContactSection } from "@/collections/Profile/RightProfileSection/ProfileContactSection";
import Image from "next/image";
import { getAuth } from "firebase/auth";
import addData from "@/firebase/firestore/addData";
import toast from "react-hot-toast";
import Link from "next/link";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import firebase_app from "@/config";
import { Rows } from "lucide-react";

const storage = getStorage(firebase_app);

const data = [
    { amount: "$65.00", status: "Pending", user: "Person Name", date: "May 10, 2024", payment: "Visa", paymentNo: 5432 },
    { amount: "$65.00", status: "Pending", user: "Person Name", date: "May 10, 2024", payment: "Visa", paymentNo: 5432 },
    { amount: "$65.00", status: "Completed", user: "Person Name", date: "May 10, 2024", payment: "Visa", paymentNo: 5432 },
    { amount: "$65.00", status: "Completed", user: "Person Name", date: "May 10, 2024", payment: "Visa", paymentNo: 5432 },
    { amount: "$65.00", status: "Completed", user: "Person Name", date: "May 10, 2024", payment: "Visa", paymentNo: 5432 },
    { amount: "$65.00", status: "Completed", user: "Person Name", date: "May 10, 2024", payment: "Visa", paymentNo: 5432 },
    { amount: "$65.00", status: "Canceled", user: "Person Name", date: "May 10, 2024", payment: "Visa", paymentNo: 5432 },
]

const PaymentsPage = () => {

    return (
        <div className="flex flex-col sm:container sm:flex-row gap-6 sm:gap-10">
            <div className="w-full sm:w-[80%] flex flex-col gap-7 sm:order-1">
                <div className="flex items-center justify-between">
                    <div className="sm:hidden border border-neutral-200 rounded-full p-2">
                        <Image
                            src="/icons/back-arrow-icon.svg"
                            alt="back-arrow-icon"
                            width={15}
                            height={15}
                        />
                    </div>
                    <div className="border border-neutral-200 rounded-full py-2 px-3 w-[200px] sm:w-[300px] flex items-center justify-between">
                        <div className="flex flex-row gap-1 sm:gap-3">
                            <Image
                                src="/icons/gray-calendar-icon.svg"
                                alt="gray-calendar-icon"
                                width={30}
                                height={30}
                                className="sm:w-[30px] w-[20px]"
                            />
                            <div className="text-black text-[15px] sm:text-lg font-normal font-Poppins">
                                Mar 11 - 17 2023
                            </div>
                        </div>
                        <div className="mr-0">

                            <Image src={"/icons/down.svg"} alt="down" width={13} height={13} />
                        </div>

                    </div>
                    <div className="border border-neutral-200 rounded-full py-2 px-3 gap-1 sm:gap-3 w-fit flex items-center justify-between">
                        <Image
                            src={"/icons/filter-icon.svg"}
                            alt="filter-icon"
                            width={20}
                            height={20}
                            className="sm:w-[20px] w-[15px]"
                        />
                        <div className="text-black text-[15px] sm:text-lg font-normal font-Poppins">
                            Filter
                        </div>

                    </div>
                </div>
                <div className="sm:hidden h-[0.5px] opacity-[0.20] bg-secondary-gray-700"></div>
                <div>
                    <div className="w-full gap-3">
                        <div className="grid grid-cols-5 bg-[#EFF2F5] text-black items-center rounded-xl p-2">
                            <div className=" text-[14px] sm:text-lg font-normal font-Poppins">Amount</div>
                            <div className="text-[14px] sm:text-lg font-normal font-Poppins">Status</div>
                            <div className="text-[14px] sm:text-lg font-normal font-Poppins">User</div>
                            <div className="text-[14px] sm:text-lg font-normal font-Poppins">Date</div>
                            <div className="text-[14px] sm:text-lg font-normal font-Poppins">Payment</div>
                        </div>
                        {data.map((val, key) => {
                            return (
                                <div key={key} className="grid grid-cols-5 border border-neutral-200 text-black items-center rounded-xl px-3 py-2 my-3">
                                    <div className="text-black text-[10px] sm:text-base font-normal font-Poppins">{val.amount}</div>
                                    <div className={`text-black text-[10px] sm:text-base font-normal font-Poppins ${val.status === "Pending" ? "bg-[#FFF178]" : val.status === "Completed" ? "bg-[#4AEAB1]" : "bg-[#EFF2F5]"}  w-fit rounded-full px-2`}>{val.status}</div>
                                    <div className="flex flex-row items-center">
                                        <div className="mr-1">
                                            <Image
                                                src={"/icons/profile-icon.png"}
                                                alt="profile-pic"
                                                width={20}
                                                height={20}
                                                className="rounded-full"
                                            />
                                        </div>

                                        <div className="text-black text-[10px] sm:text-base font-normal font-Poppins">
                                            {val.user}
                                        </div>
                                    </div>
                                    <div className="text-black text-[10px] sm:text-base font-normal font-Poppins">{val.date}</div>
                                    <div className="text-black text-[10px] sm:text-base font-normal font-Poppins flex flex-row items-center gap-1 justify-start sm:justify-between object-contain">{val.payment}
                                        <div className="bg-[#EFF2F5] w-fit px-2 rounded-full">{val.paymentNo}</div>
                                        <Image src={"/icons/gray-down-icon.svg"} alt="gray-down-icon" width={20} height={20} className="hidden sm:block" />
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="w-full sm:w-[20%] flex flex-col gap-7 sm:gap-10 sm:order-2">
                <div className="sm:hidden w-full rounded-xl border border-secondary-neutral-200 p-2 sm:p-3 flex flex-col gap-3">
                    <div className="flex-row flex gap-1">
                        <div className="bg-[#64CCC1] rounded-xl w-[40px] h-[40px] items-center justify-center justify-items-center flex">
                            <Image
                                src="/icons/blue-dollar-icon.svg"
                                alt="blue-dollar-icon"
                                width={20}
                                height={20}
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="text-black text-[14px] sm:text-[15px] font-normal font-Poppins">
                                Next Payment
                            </div>
                            <div className="text-black text-[14px] sm:text-[15px] font-bold font-Poppins">
                                $50.00
                            </div>
                        </div>
                        <div className="grid flex-col justify-items-end float-right">
                            <div className="text-black text-[14px] sm:text-[16px] font-normal font-Poppins">
                                On May 15, 2023
                            </div>
                            <div className="text-black text-[12px] sm:text-[15px] font-normal font-Poppins">
                                <Button
                                    roundedfull
                                    className="border-gray-700"
                                    bordered
                                    type="white"
                                    text="Manage Payments"
                                />
                            </div>

                        </div>
                    </div>

                </div>       
                <div className="flex flex-row sm:flex-col gap-2 sm:gap-10">
                <div className="sm:order-2">
                    <Image
                        src="/icons/visa-card.svg"
                        alt="visa-card"
                        width={100}
                        height={100}
                        className="w-full"
                    />
                </div>
                <div className="w-full rounded-xl border border-secondary-neutral-200 p-2 sm:p-3 flex flex-col gap-1 sm:gap-3 sm:order-1">
                    <div className="flex-row flex gap-1 items-center">
                        <Image
                            src="/icons/green-dollar-icon.svg"
                            alt="green-dollar-icon"
                            width={30}
                            height={30}
                            className="sm:w-[50px] sm:h-[50px]"
                        />
                        <div className="flex flex-col">
                            <div className="text-black text-[12px] sm:text-[15px] font-normal font-Poppins">
                                Next Payment
                            </div>
                            <div className="text-black text-[12px] sm:text-[15px] font-bold font-Poppins">
                                $2350.00
                            </div>
                        </div>
                    </div>
                    <div className="text-black text-[12px] sm:text-[16px] font-normal font-Poppins">
                        On May 15, 2023
                    </div>
                    <div className="text-black text-[12px] sm:text-[15px] font-normal font-Poppins">
                        <Button
                            roundedfull
                            className="border-gray-700"
                            bordered
                            type="white"
                            text="Withdraw Funds"
                        />
                    </div>
                </div>
                </div>         
            </div>
        </div>
    );
};

export default PaymentsPage;
