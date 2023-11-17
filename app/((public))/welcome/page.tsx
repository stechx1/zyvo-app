"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { poppins } from "@/lib/utils";
import { useAuthContext } from "@/context/AuthContext";
const Home = () => {
  const { user } = useAuthContext();

  useEffect(() => {
    // const sendEmail = async () => {
    //   const email = user?.email;
    //   const response = await axios.post("/api/register", { email });
    //   console.log(response);
    // };

    // // Retrieve the list of emails from local storage
    // const sentEmails =
    //   JSON.parse(localStorage.getItem("sentEmails") ?? "") || [];

    // if (user?.email && !sentEmails.includes(user.email)) {
    //   sendEmail();

    //   // Add the current email to the list and update local storage
    //   sentEmails.push(user.email);
    //   localStorage.setItem("sentEmails", JSON.stringify(sentEmails));
    // }
  }, [user]);

  return (
    <div className="">
      {/* <Modal>
        <p>
          Thank you for signing up with Zyvo! We&apos;re excited to have you on
          board. Our website is coming soon, and we&apos;ll keep you updated on
          our progress. Stay tuned for an amazing experience! Thank you for your
          patience.
        </p>
        <div className='mt-6'>
          <p>Best Regards,</p>
          <p>The Zyvo Team</p>
        </div>
      </Modal> */}

      <div className="container mx-auto flex flex-col my-16  justify-center items-center">
        <p className="text-lg font-bold">Its Official!</p>
        <h2
          className={`text-center font-bold text-4xl my-4 ${poppins.className}`}
        >
          You&apos;re now part of the{" "}
          <span className="text-primary">Zyvo Universe</span>
        </h2>
        <div className="flex flex-col gap-6 justify-center items-center text-center w-[60%]">
          <p>We&apos;re stoked to have you on board!</p>
          <p>
            Thank you for joining our vibrant community of flexible adventurers
            and innovative hosts.
          </p>
          <p>
            Get ready to seize every moment, one hour at a time! Your journey
            with us promises endless possibilities, personalized experiences,
            and smart stays that save you both time and money.
          </p>
          <p>
            Stay tuned for hourly escapades, quick getaways, and tailored
            discoveries that perfectly match your style and needs.
          </p>
          <p>
            Explore now, unleash the fun, and make the most of your ZYVO
            journey.
          </p>
          <p className="font-bold">
            It&apos;s time to <span className="text-primary">ZYVO</span>LVE!
          </p>
        </div>
      </div>
    </div>
  );
};
export default Home;
