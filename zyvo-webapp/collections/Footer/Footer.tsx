import React from "react";
import Link from "next/link";
import { ContactForm } from "./ContactForm/ContactForm";
import "../../styles/footer.css";
import Image from "next/image";
import { SocialMediaLinks } from "./SocialMediaLinks/SocialMediaLinks";
import { NavColumn } from "./NavColumn/NavColumn";

export const Footer = () => {
  const companyLinks = [
    { href: "/", label: "Our Story" },
    { href: "/", label: "Faq" },
    { href: "/", label: "Why Us" },
    { href: "/", label: "Contact Us" },
  ];

  const accountLinks = [
    { href: "/signup", label: "Register" },
    { href: "/signin", label: "Login" },
    { href: "/", label: "Gift Vouchers" },
  ];

  const resourcesLinks = [
    { href: "/", label: "Become a Host" },
    { href: "/", label: "Blog Articles" },
    { href: "/", label: "Explore Now" },
  ];
  return (
    <footer className="px-2 sm:px-8 sm:px-14 md:px-20 lg:px-20 xl:px-32 bg-secondary-gray-700 rounded-xl text-white pt-10 xxs:pt-2 sm:pt-[130px] pb-[30px]">
      <div className="gap-4 lg:flex">
        {/* Column 1 - Join Newsletter */}
        <div className="xxs:w-full p-2 xxs:p-8 lg:w-[28%] lg:mr-20 lg:p-0">
          <h2 className="text-sm md:text-lg font-semibold mb-2 sm:mb-8">Join Newsletter</h2>
          <ContactForm />
        </div>

        {/* Column 2, 3, 4 - Company, Account, Resources */}
        <div className="grid grid-cols-2 px-4 py-8 xxs:p-8 xxs:pt-5 gap-x-14 gap-y-7 xxs:gap-y-10 sm:flex sm:justify-between sm:gap-16 lg:p-0 ">
          <div className="lg:w-[25%]">
            <NavColumn title="Company" links={companyLinks} />
          </div>
          <div className="lg:w-[25%]">
            <NavColumn title="Account" links={accountLinks} />
          </div>
          <div className="lg:w-[25%]">
            <NavColumn title="Resources" links={resourcesLinks} />
          </div>

          {/* Column 5 - Follow Us */}
          <div className="lg:w-[25%]">
            <h2 className="text-sm sm:text-lg font-semibold mb-8">Follow Us</h2>
            <SocialMediaLinks />
          </div>
        </div>
      </div>

      {/* Payment Cards */}
      <div className="lg:my-24 mb-5 sm:mb-24 flex px-4 xxs:px-8 sm:place-content-center">
        <Image
          src="/images/payment-cards.png"
          alt="payment-cards"
          width={300}
          height={40}
          className="cursor-pointer w-[240px] sm:w-[300px]"
        />
      </div>

      {/* Bottom Section */}
      <div className="space-y-1 flex px-4 xxs:p-8 flex-col sm:gap-4 sm:flex-row justify-between sm:items-center mt-12 xxs:mt-4 mb-12 xxs:mb-5 sm:mb-0">
        <div className="mb-1 flex sm:hidden">
          <Image
            src="/images/white-zyvo-logo.png"
            alt="Zyvo Logo"
            width={32}
            height={42}
            className="cursor-pointer w-[20px] sm:w-[32px]"
          />
        </div>
        <p className="text-xs sm:text-base" >Zyvo &copy; Copyright {new Date().getFullYear()}</p>
        <div className="mb-2 hidden sm:flex">
          <Image
            src="/images/white-zyvo-logo.png"
            alt="Zyvo Logo"
            width={32}
            height={42}
            className="cursor-pointer"
          />
        </div>
        <div className="flex space-x-2">
          <Link
            href="/privacy"
            className="text-white text-xs sm:text-md hover:underline transition duration-300"
          >
            Privacy Policy
          </Link>
          <p className="text-xs sm:text-md">|</p>
          <Link
            href="/terms-of-service"
            className="text-white text-xs sm:text-md hover:underline transition duration-300"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};
