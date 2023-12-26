"use client";
import { AboutBox } from "@/components/AboutBox";
import { AboutSection } from "@/collections/AboutSection";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { useAuthContext } from "@/context/AuthContext";

const AboutPage = () => {
  const router = useRouter();
  const { user } = useAuthContext();

  return (
    <>
      <div className='bg-[url("/images/banner-bg.png")] bg-cover bg-center flex flex-col justify-center items-center '>
        <AboutSection />
      </div>
      <div
        data-aos="fade-up"
        className="container mx-auto grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5"
      >
        <AboutBox
          heading={"Welcome to ZYVO"}
          para={
            "Where the concept of hourly rentals was born from a passion for flexibility and convenience. Our team of like-minded individuals came together to create a platform that caters to the modern lifestyle, offering short-term accommodations for travelers and hosts alike. Whether you need a quick layover spot or want to make the most of your unused space, ZYVO has got you covered."
          }
        />
        <AboutBox
          heading={"Mission"}
          para={
            "At ZYVO, our mission is to empower people to embrace the freedom of renting and booking spaces by the hour. We strive to connect guests with unique, temporary spaces that perfectly match their needs while enabling hosts to unlock the potential of their properties. Our dedication to seamless experiences, affordability, and personalized options drives us to constantly innovate and enhance our services, making every interaction on ZYVO a delightful one."
          }
        />
        <AboutBox
          heading={"Vision"}
          para={
            "We envision ZYVO as the go-to platform for hourly rentals worldwide, revolutionizing how people access and utilize spaces for short-term requirements. Our dream is to create a world where rigid check-ins and long-term commitments are a thing of the past, and where individuals can explore, work, and create with ease. By fostering a community of hosts and guests who share our values, we strive to build a platform that not only facilitates transactions but also fosters meaningful connections and unforgettable moments. "
          }
        />
        <AboutBox
          heading={"Flexibility, Your Way"}
          para={
            "At ZYVO, we believe in empowering our users with choice. Whether you're a traveler with limited time or a host seeking flexible earnings, our platform provides tailored solutions for your short-term needs. Say goodbye to traditional rental constraints and embrace the freedom to create your own schedule."
          }
        />
        <AboutBox
          heading={"A World of Possibilities"}
          para={
            "With ZYVO, you'll find an extensive selection of spaces, each catering to diverse tastes and preferences. From cozy hideaways to vibrant workspaces, our wide variety of options ensures that there's something for everyone, no matter the occasion."
          }
        />
        <AboutBox
          heading={"No Strings Attached"}
          para={
            "We understand that life is unpredictable, which is why we offer stress-free solutions for temporary space. With no long-term obligations, you can book spaces on ZYVO without any ties, making it perfect for spontaneous getaways or last-minute plans."
          }
        />
      </div>
      {!user && (
        <div
          data-aos="fade-up"
          className="flex flex-col gap-4 my-24 justify-center items-center"
        >
          <img src="/icons/icon.png" alt="logo" />
          <span className="text-center font-[400]  max-w-[550px]">
            Join ZYVO today and unlock a world of hourly spaces, where EVERY
            MOMENT IS YOURS
          </span>

          <Button
            type="green"
            roundedfull
            text="Create your ZYVO account"
            onClick={() => router.push("/signup")}
          />
        </div>
      )}
    </>
  );
};

export default AboutPage;
