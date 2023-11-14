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
    { href: "/", label: "Register" },
    { href: "/", label: "Login" },
    { href: "/", label: "Gift Vouchers" },
  ];

  const resourcesLinks = [
    { href: "/", label: "Become a Host" },
    { href: "/", label: "Blog Articles" },
    { href: "/", label: "Explore Now" },
  ];
  return (
    <footer className="px-8 sm:px-14 md:px-20 lg:px-20 xl:px-32 bg-secondary-gray-700 text-white pt-[130px] pb-[30px]">
      <div className="gap-4 lg:flex">
        {/* Column 1 - Join Newsletter */}
        <div className="xxs:w-full xxs:p-8 lg:w-[28%] lg:mr-20 lg:p-0">
          <h2 className="text-lg font-semibold mb-8">Join Newsletter</h2>
          <ContactForm />
        </div>

        {/* Column 2, 3, 4 - Company, Account, Resources */}
        <div className="xxs:grid xxs:grid-cols-2 xxs:p-8 xxs:gap-14 sm:flex sm:justify-between sm:gap-16 lg:p-0 ">
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
            <h2 className="text-lg font-semibold mb-8">Follow Us</h2>
            <SocialMediaLinks />
          </div>
        </div>
      </div>

      {/* Payment Cards */}
      <div className="lg:my-24 xxs:mt-8 xxs:mb-24 flex place-content-center">
        <Image
          src="/images/payment-cards.png"
          alt="payment-cards"
          width={300}
          height={40}
          className="cursor-pointer"
        />
      </div>

      {/* Bottom Section */}
      <div className=" flex xxs:p-8 xxs:flex-col xxs:gap-4 sm:flex-row justify-between items-center mt-4">
        <div className="mb-2 xxs:flex sm:hidden">
          <Image
            src="/images/white-zyvo-logo.png"
            alt="Zyvo Logo"
            width={32}
            height={42}
            className="cursor-pointer"
          />
        </div>
        <p>&copy; Copyright 2023</p>
        <div className="mb-2 xxs:hidden sm:flex">
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
            href="/"
            className="text-white text-md hover:underline transition duration-300"
          >
            Privacy Policy
          </Link>
          <p>|</p>
          <Link
            href="/"
            className="text-white text-md hover:underline transition duration-300"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};
