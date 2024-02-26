"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useCommonContext } from "@/context/CommonContext";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import {
  createConnectedAccount,
  getAccountInfo,
  getAccountLink,
} from "@/lib/stripeActions";
import addData from "@/firebase/firestore/addData";
import toast from "react-hot-toast";
import { getMyPaymentsSnapshot } from "@/firebase/payments";
import { Payment } from "@/types/payment";
import { formatDate } from "@/lib/utils";
import { User } from "@/types/user";
import { getUserByRef } from "@/firebase/user";
import { DocumentReference } from "firebase/firestore";
import DatePicker from "@/components/DatePicker";

const data = [
  {
    amount: "$65.00",
    status: "Pending",
    user: "Person Name",
    date: "May 10, 2024",
    payment: "Visa",
    paymentNo: 5432,
  },
  {
    amount: "$65.00",
    status: "Pending",
    user: "Person Name",
    date: "May 10, 2024",
    payment: "Visa",
    paymentNo: 5432,
  },
  {
    amount: "$65.00",
    status: "Completed",
    user: "Person Name",
    date: "May 10, 2024",
    payment: "Visa",
    paymentNo: 5432,
  },
  {
    amount: "$65.00",
    status: "Completed",
    user: "Person Name",
    date: "May 10, 2024",
    payment: "Visa",
    paymentNo: 5432,
  },
  {
    amount: "$65.00",
    status: "Completed",
    user: "Person Name",
    date: "May 10, 2024",
    payment: "Visa",
    paymentNo: 5432,
  },
  {
    amount: "$65.00",
    status: "Completed",
    user: "Person Name",
    date: "May 10, 2024",
    payment: "Visa",
    paymentNo: 5432,
  },
  {
    amount: "$65.00",
    status: "Canceled",
    user: "Person Name",
    date: "May 10, 2024",
    payment: "Visa",
    paymentNo: 5432,
  },
];

const PaymentsPage = () => {
  const { user, setUser, mode } = useCommonContext();
  const router = useRouter();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [guests, setGuests] = useState<User[]>([]);
  const [selectedDates, setSelectedDates] = useState<Date[] | undefined>(
    getCurrentWeekDates()
  );

  useEffect(() => {
    if (user == null) {
      router.push("/signin");
      return;
    }
    if (mode === "GUEST") {
      router.push("/");
      return;
    }
    if (user.connectedAccountId) {
      handleGetAccountDetails(user.connectedAccountId);
    }
    const unsubscribe = getMyPaymentsSnapshot(
      user.userId,
      (payments) => {
        setPayments(payments);
      },
      (e) => {
        console.log(e);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [user, mode]);
  useEffect(() => {
    getGuests();
    async function getGuests() {
      if (payments.length > 0) {
        let newGuests: User[] = [];
        for (let index = 0; index < payments.length; index++) {
          if (payments[index].guestRef) {
            const { result } = await getUserByRef(payments[index].guestRef);
            if (result) {
              if (!newGuests.find((g) => g.userId === result.userId)) {
                newGuests = [...newGuests, result];
              }
            }
          }
        }
        setGuests(newGuests);
      }
    }
  }, [payments]);
  const getGuestImage = (guestRef?: DocumentReference) => {
    if (guests) {
      const foundGuest = guests.find((g) => g.userId == guestRef?.id);
      if (foundGuest && foundGuest.photoURL) return foundGuest.photoURL;
    }
    return "/images/no-image.jpg";
  };
  const getGuestName = (guestRef?: DocumentReference) => {
    if (guests) {
      const foundGuest = guests.find((g) => g.userId == guestRef?.id);
      if (foundGuest && foundGuest.photoURL)
        return foundGuest.firstName + " " + foundGuest.lastName;
    }
    return "";
  };
  const handleCreateAccount = async () => {
    try {
      setIsLoading(true);

      if (user) {
        const connectedAccount = await createConnectedAccount(user.email);
        if (connectedAccount) {
          addData("users", user.userId, {
            connectedAccountId: connectedAccount.id,
          })
            .then(({ result, error }) => {
              if (error) {
                toast.error(error?.message);
                return;
              }
              setUser({
                ...user,
                connectedAccountId: connectedAccount.id,
              });
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const handleGetAccountLink = async (accountId: string) => {
    try {
      setIsLoading(true);
      const link = await getAccountLink(accountId);
      if (link?.url) {
        window.open(link.url, "_self");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const handleGetAccountDetails = async (accountId: string) => {
    try {
      const account = await getAccountInfo(accountId);
      console.log(account);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  function getCurrentWeekDates() {
    return Array.from(Array(7).keys()).map((idx) => {
      const d = new Date();
      d.setDate(d.getDate() - d.getDay() + idx);
      return d;
    });
  }
  const filteredPayments = payments.filter((p) =>
    selectedDates?.find((d) => d.getDate() == p.date.getDate())
  );
  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
      <div className="w-full sm:w-[60%] lg:w-[78%] flex flex-col gap-7 sm:order-1">
        <div className="flex items-center justify-between">
          <div className="sm:hidden border border-neutral-200 rounded-full p-2">
            <Image
              src="/icons/back-arrow-icon.svg"
              alt="back-arrow-icon"
              width={15}
              height={15}
            />
          </div>
          <DatePicker
            setSelectedDates={setSelectedDates}
            selectedDates={selectedDates}
          />
          <div className="border border-neutral-200 rounded-full py-2 px-3.5 gap-1 sm:gap-3 w-fit flex items-center justify-between">
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
        <div className="overflow-auto">
          <div className="w-max lg:w-full gap-3">
            <div className="grid grid-cols-5 bg-[#EFF2F5] text-black items-center rounded-lg py-2.5 px-5">
              <div className=" text-[14px] sm:text-lg font-medium font-Poppins">
                Amount
              </div>
              <div className="text-[14px] sm:text-lg font-medium font-Poppins">
                Status
              </div>
              <div className="text-[14px] sm:text-lg font-medium font-Poppins">
                User
              </div>
              <div className="text-[14px] sm:text-lg font-medium font-Poppins">
                Date
              </div>
              <div className="text-[14px] sm:text-lg font-medium font-Poppins">
                Payment
              </div>
            </div>
            {filteredPayments.map((payment, key) => {
              return (
                <div
                  key={key}
                  className="grid grid-cols-5 border border-neutral-200 text-black items-center rounded-lg px-4 py-3 my-3"
                >
                  <div className="text-black text-sm sm:text-[16.5px] font-normal font-Poppins">
                    ${payment.price}
                  </div>
                  <div
                    className={`text-black text-sm sm:text-base font-normal font-Poppins ${
                      payment.status === "PENDING"
                        ? "bg-[#FFF178]"
                        : payment.status === "COMPLETED"
                        ? "bg-[#4AEAB1]"
                        : "bg-[#EFF2F5]"
                    }  w-fit rounded-full px-2 py-0.5 text-[#252849] capitalize`}
                  >
                    {payment.status.toLowerCase()}
                  </div>
                  <div className="flex flex-row items-center">
                    <div className="mr-1.5">
                      <Image
                        src={getGuestImage(payment.guestRef)}
                        alt="profile-pic"
                        width={25}
                        height={25}
                        className="rounded-full md:w-[30px] md:h-[30px] lg:w-[25px] lg:h-[25px]"
                      />
                    </div>

                    <div className="text-black text-sm sm:text-[16.5px] font-normal font-Poppins">
                      {getGuestName(payment.guestRef)}
                    </div>
                  </div>
                  <div className="text-black text-sm sm:text-[16.5px] font-normal font-Poppins">
                    {formatDate(payment.date.toISOString())}
                  </div>
                  {/* <div className="text-black text-sm sm:text-[16.5px] font-normal font-Poppins flex flex-row items-center gap-1 justify-between object-contain">
                    <div className="flex gap-1">
                      {val.payment}
                      <div className="bg-[#EFF2F5] w-fit px-2 rounded-full">
                        {val.paymentNo}
                      </div>
                    </div>
                    <Image
                      src={"/icons/gray-down-icon.svg"}
                      alt="gray-down-icon"
                      width={25}
                      height={25}
                      className=""
                    />
                  </div> */}
                </div>
              );
            })}
            {filteredPayments.length == 0 && !isLoading && (
              <div className="m-5 text-center">No Payments!</div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[23%] flex flex-col gap-7 sm:gap-10 sm:order-2">
        <div className="sm:hidden w-full rounded-xl border border-secondary-neutral-200 p-3 sm:p-3 flex flex-col gap-3">
          <div className="flex-row items-center flex gap-1 justify-between">
            <div className="flex items-center gap-2">
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
            </div>
            <div className="grid flex-col justify-items-end float-right">
              <div className="text-black text-[14px] sm:text-[16px] font-normal font-Poppins">
                On May 15, 2023
              </div>
              <div className="text-black font-normal font-Poppins">
                <div className="border text-[12px] sm:text-[15px] rounded-full px-1.5 sm:px-3 py-0.5 sm:py-1.5 w-max border-gray-600">
                  Manage Payments
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row sm:flex-col gap-2 sm:gap-10">
          {/* <div className="sm:order-2">
            <Image
              src="/images/black-visa-card.svg"
              alt="visa-card"
              width={100}
              height={100}
              className="w-full md:w-[90%] lg:w-full h-full"
            />
          </div> */}
          {user && (
            <div className="sm:order-2">
              <Button
                text="Connect To Stripe"
                type="green"
                roundedfull
                size="sm"
                onClick={() =>
                  user.connectedAccountId
                    ? handleGetAccountLink(user.connectedAccountId)
                    : handleCreateAccount()
                }
                isLoading={isLoading}
              />
            </div>
          )}

          <div className="w-full md:w-[90%] lg:w-full rounded-xl border border-secondary-neutral-200 p-2 space-y-1.5 sm:space-y-0 sm:p-4 flex flex-col justify-center sm:gap-3 sm:order-1">
            <div className="flex-row flex gap-2 items-center">
              <Image
                src="/icons/green-dollar-icon.svg"
                alt="green-dollar-icon"
                width={30}
                height={30}
                className="sm:w-[50px] sm:h-[50px]"
              />
              <div className="flex flex-col sm:space-y-1">
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
              <div className="border rounded-full px-1.5 sm:px-3 py-0.5 sm:py-1.5 w-max border-gray-600">
                Withdraw Funds
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
