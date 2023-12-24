"use client";
import CustomSelect from "@/components/SelectDropDown";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Chart, { ChartConfiguration, DoughnutController } from "chart.js/auto";
import PluginServiceGlobalRegistration from "chart.js/auto";
import { useScreenDimensions } from "@/hooks/useScreenDimension";

export default function AdminDashboard() {
  const [width] = useScreenDimensions();
  interface BarChartProps {
    data: {
      labels: string[];
      values: number[];
    };
  }
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    values: [10, 20, 15, 30, 32, 40, 50, 32, 10],
  };
  function getStatusColor(status?: string) {
    switch (status) {
      case "Finished":
        return "bg-[#4AEAB1]";
      case "pending":
        return "bg-[#fff178]";
      default:
        return "bg-[#d7ebfa]";
    }
  }
  const TotalCountsBox = (
    title: string,
    value: string | number,
    imageUrl: string,
    iconBg: string
  ) => {
    return (
      <div className="py-3 mb-2 px-2 flex border rounded-xl space-x-3 w-[49%] lg:w-[23.5%]">
        <div
          className={`${iconBg} flex   rounded-xl justify-center items-center text-center py-3 px-3`}
        >
          <Image src={imageUrl} height={25} width={25} alt="dollar-icon" />
        </div>
        <div>
          <div className="text-xs sm:text-sm md:text-base lg:text-lg">
            {title}
          </div>
          <div className="text-sm sm:text-sm md:text-base lg:text-lg font-semibold font-medium">
            {value}
          </div>
        </div>
      </div>
    );
  };

  const UserDetailBar = (
    name: string,
    image: string,
    tagtext?: string,
    status?: string,
    userType?: string
  ) => {
    return (
      <div className="flex justify-between w-full border px-3 py-1.5 rounded-xl">
        <div className="flex items-center space-x-2">
          <Image
            src={image}
            height={30}
            width={30}
            alt="dollar-icon"
            className="rounded-full"
          />
          <div className="text-sm lg:text-lg md:text-md sm:text-sm">{name}</div>
        </div>
        <div>
          <span
            className={`inline-block mt-0.5 text-black px-2.5 py-2 text-xs sm:text-sm md:text-md lg:text-md leading-none ${getStatusColor(
              status
            )} rounded-full`}
          >
            {tagtext}
          </span>
        </div>
      </div>
    );
  };

  const BarChart: React.FC<BarChartProps> = ({ data }) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);
    useEffect(() => {
      if (chartRef.current) {
        const ctx = chartRef.current.getContext("2d");

        if (ctx) {
          if (chartInstance.current) {
            chartInstance.current.destroy();
          }

          const config: ChartConfiguration = {
            type: "bar",
            data: {
              labels: data.labels,
              datasets: [
                {
                  label: "Bookings",
                  data: [65, 59, 80, 81, 56, 55, 40, 50, 27, 48, 41, 55],
                  backgroundColor: ["#389CE5"],
                  barPercentage: 0.5,
                  categoryPercentage: 1.0,
                  borderRadius: 50,
                },
              ],
            },
            options: {
              responsive: true,
              scales: {
                y: {
                  grid: {
                    display: true,
                    lineWidth: 0.5,
                  },
                },
                x: {
                  grid: {
                    display: false,
                  },
                },
              },
            },
          };
          chartInstance.current = new Chart(ctx, config);
        }
      }
      return () => {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
      };
    }, [data]);

    return <canvas ref={chartRef} />;
  };

  const DoughnutChart: React.FC = () => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);
    useEffect(() => {
      if (chartRef.current) {
        const ctx = chartRef.current.getContext("2d");

        if (ctx) {
          if (chartInstance.current) {
            chartInstance.current.destroy();
          }
          Chart.register(DoughnutController);
          const config: ChartConfiguration = {
            type: "doughnut",
            data: {
              datasets: [
                {
                  data: [300, 50],
                  spacing: 1,
                  backgroundColor: ["#64CCC1", "#CFEFEC"],
                  hoverOffset: 4,
                },
              ],
            },
            options: {
              responsive: true,
              cutout: "75%",
              radius: width > 768 ? 80 : 70,
            },
          };
          chartInstance.current = new Chart(ctx, config);
        }
      }
      return () => {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
      };
    }, []);

    return <canvas ref={chartRef} />;
  };

  return (
    <div>
      <div className="flex justify-between flex-wrap">
        {TotalCountsBox(
          "Total Revenue",
          "$125,000.00",
          "/icons/admin/white-dollar-icon.svg",
          "bg-[#64CCC1]"
        )}
        {TotalCountsBox(
          "Total Bookings",
          1235,
          "/icons/admin/white-calendar-icon.svg",
          "bg-[#389CE5]"
        )}
        {TotalCountsBox(
          "Daily Customers",
          1568,
          "/icons/admin/white-profile-icon.svg",
          "bg-[#F5A43D]"
        )}
        {TotalCountsBox(
          "Daily Host",
          "06",
          "/icons/admin/white-daily-host-icon.svg",
          "bg-[#DB72D6]"
        )}
      </div>
      <div className="flex justify-between my-6 flex-wrap">
        <div className="lg:px-6 px-3 py-2 lg:py-3 border rounded-xl lg:w-[48.82%] w-[100%] md:w-[49%] mb-8 lg:mb-0 md:mb-0">
          <div className="flex justify-between items-center text-md lg:text-lg md:text-lg sm:text-md">
            Recent Bookings
            <div className="lg:min-w-[20%] min-w-[30%] sm:min-w-[25%] md:min-w-[25%]">
              <CustomSelect
                roundedFull
                options={[
                  { label: "This week", value: "This week" },
                  { label: "This month", value: "This month" },
                ]}
              />
            </div>
          </div>
          <div className="my-2">
            {UserDetailBar(
              "Person Name",
              "/icons/profile-icon.png",
              "Today - 10:05AM"
            )}
          </div>
          <div className="my-2">
            {UserDetailBar(
              "Person Name",
              "/icons/profile-icon.png",
              "Today - 10:05AM"
            )}
          </div>
          <div className="my-2">
            {UserDetailBar(
              "Person Name",
              "/icons/profile-icon.png",
              "Tomorrow - 10:05AM"
            )}
          </div>
          <div className="my-2">
            {UserDetailBar(
              "Person Name",
              "/icons/profile-icon.png",
              "Wednesday - 10:05AM"
            )}
          </div>
        </div>
        <div className="px-3 py-3 border rounded-xl lg:w-[48.82%] w-[100%] md:w-[49%]">
          <div className="flex justify-between items-center">
            <div className="text-md lg:text-lg md:text-lg sm:text-md">
              Bookings
            </div>
            <div className="lg:min-w-[20%] min-w-[30%] sm:min-w-[25%] md:min-w-[25%]">
              <CustomSelect
                roundedFull
                options={[
                  { label: "This week", value: "This week" },
                  { label: "This month", value: "This month" },
                ]}
              />
            </div>
          </div>
          <div>
            <BarChart data={chartData} />
          </div>
        </div>
      </div>

      <div className="flex justify-between flex-wrap">
        <div className="lg:px-6 py-2 px-3 md:px-5 lg:py-3 border rounded-xl lg:w-[48.82%] w-[100%] mb-7 lg:mb-0">
          <div className="flex justify-between items-center text-md lg:text-lg md:text-lg sm:text-md">
            Recent Reports
            <div className="lg:min-w-[20%] min-w-[30%] sm:min-w-[25%] md:min-w-[25%]">
              <CustomSelect
                roundedFull
                options={[
                  { label: "This week", value: "This week" },
                  { label: "This month", value: "This month" },
                ]}
              />
            </div>
          </div>
          <div className="my-2">
            {UserDetailBar(
              "Person Name",
              "/icons/profile-icon.png",
              "Solved",
              "Finished"
            )}
          </div>
          <div className="my-2">
            {UserDetailBar(
              "Person Name",
              "/icons/profile-icon.png",
              "Solved",
              "Finished"
            )}
          </div>
          <div className="my-2">
            {UserDetailBar(
              "Person Name",
              "/icons/profile-icon.png",
              "Pending",
              "pending"
            )}
          </div>
          <div className="my-2">
            {UserDetailBar(
              "Person Name",
              "/icons/profile-icon.png",
              "Pending",
              "pending"
            )}
          </div>
        </div>
        <div className="flex lg:w-[48.82%] w-[100%] justify-between flex-wrap">
          <div className="border lg:w-[49%] md:w-[49%] w-[100%] px-6 py-3 items-center rounded-xl space-y-2 mb-8 sm:mb-0 md:mb-0 lg:m-0">
            <div className="flex justify-between items-center">
              Users
              <div className="min-w-[40%]">
                <CustomSelect
                  roundedFull
                  options={[
                    { label: "This week", value: "This week" },
                    { label: "This month", value: "This month" },
                  ]}
                />
              </div>
            </div>
            <div className="flex lg:block justify-between">
              <div className="h-40 lg:h-full">
                <DoughnutChart />
              </div>
              <div className="flex items-center flex-col justify-center">
                <div className="flex items-center justify-center w-full">
                  <div className="w-3 mr-1 h-3 bg-[#CFEFEC] rounded-full"></div>
                  <div className="text-sm sm:text-sm md:text-md lg:text-md">
                    Active users (365)
                  </div>
                </div>
                <div className="flex items-center justify-center w-full">
                  <div className="w-3 mr-1 h-3 bg-[#64CCC1] rounded-full"></div>
                  <div className="text-sm sm:text-sm md:text-md lg:text-md">
                    Incative users (115)
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border lg:w-[49%] md:w-[49%] w-[100%] px-6 py-3 items-center rounded-xl space-y-2">
            <div className="flex justify-between items-center">
              Cash Flow
              <div className="min-w-[40%]">
                <CustomSelect
                  roundedFull
                  options={[
                    { label: "This week", value: "This week" },
                    { label: "This month", value: "This month" },
                  ]}
                />
              </div>
            </div>
            <div className="flex lg:block justify-between">
              <div className="h-40 lg:h-full">
                <DoughnutChart />
              </div>
              <div className="flex items-center flex-col justify-center">
                <div className="flex items-center justify-center w-full">
                  <div className="w-3 mr-1 h-3 bg-[#CFEFEC] rounded-full"></div>
                  <div className="text-sm sm:text-sm md:text-md lg:text-md">
                    Active users (3654)
                  </div>
                </div>
                <div className="flex items-center justify-center w-full">
                  <div className="w-3 mr-1 h-3 bg-[#64CCC1] rounded-full"></div>
                  <div className="text-sm sm:text-sm md:text-md lg:text-md">
                    Incative users (212)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
