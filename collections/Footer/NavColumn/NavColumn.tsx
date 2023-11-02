import { NavColumnProps } from "@/types";
import Link from "next/link";

export const NavColumn: React.FC<NavColumnProps> = ({ title, links }) => (
  <>
    <h2 className="text-lg font-semibold  xxs:mb-4 lg:mb-8">{title}</h2>
    <ul className="custom-ul">
      {links.map((link, index) => (
        <li
          key={index}
          className="xxs:mb-[20px] lg:mb-[40px] opacity-[0.6] hover:underline hover:text-white hover:opacity-[1] transition duration-300"
        >
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  </>
);
