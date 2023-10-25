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
    <footer className="bg-secondary-gray-700 text-white pt-[130px] pb-[30px]">
      <div className="container mx-auto flex justify-between flex-wrap">
        {/* Column 1 */}
        <div className="">
          <h2 className="text-lg font-semibold mb-8">Join Newsletter</h2>
          <ContactForm />
        </div>

        {/* Column 2, 3, 4 */}
        <NavColumn title="Company" links={companyLinks} />
        <NavColumn title="Account" links={accountLinks} />
        <NavColumn title="Resources" links={resourcesLinks} />

        {/* Column 5 */}
        <div>
          <h2 className="text-lg font-semibold mb-8">Follow Us</h2>
          <SocialMediaLinks />
        </div>
      </div>
      <div className="my-28 flex place-content-center">
        <Image
          src={"/images/payment-cards.png"}
          alt={"payment-cards"}
          width={300}
          height={40}
          className="cursor-pointer"
        />
      </div>
      <div className="container mx-auto flex justify-between items-center mt-4">
        <p>&copy; Copyright 2023</p>
        <div className="mb-2">
          <Image
            src="/images/white-zyvo-logo.png"
            alt="Zyvo Logo"
            width={32}
            height={42}
            className="cursor-pointer"
          />
        </div>
        <div className=" flex space-x-2">
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
