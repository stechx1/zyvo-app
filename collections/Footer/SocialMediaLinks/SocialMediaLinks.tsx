import Link from "next/link";
import Image from "next/image";

export const SocialMediaLinks = () => {
  const socialMediaData = [
    {
      name: "Facebook",
      url: "https://www.facebook.com",
      iconSrc: "/icons/facebook-circle-icon.svg",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com",
      iconSrc: "/icons/instagram-circle-icon.svg",
    },
    {
      name: "Twitter",
      url: "https://www.twitter.com",
      iconSrc: "/icons/twitter-circle-icon.svg",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com",
      iconSrc: "/icons/linkedin-circle-icon.svg",
    },
  ];

  return (
    <div className="flex items-center space-x-3">
      {socialMediaData.map((item, index) => (
        <Link key={index} href={item.url} target="_blank">
          <Image
            src={item.iconSrc}
            alt={item.name}
            width={40}
            height={40}
            className="cursor-pointer lg:w-[100px]"
          />
        </Link>
      ))}
    </div>
  );
};
