"use client";
import { poppins } from "@/lib/utils";
const PrivacyPage = () => {
  return (
    <div className="flex flex-col my-8  justify-center items-center">
      <h2
        className={`text-center font-bold text-4xl my-4 ${poppins.className}`}
      >
        Privacy Policy
      </h2>
      <div className="flex flex-col gap-6">
        <p>
          At Zyvo, we are committed to protecting your privacy and ensuring the
          security of your personal information. This Privacy Policy outlines
          how we collect, use, and safeguard your data when you use our hourly
          rental platform. By using Zyvo, you consent to the practices described
          in this policy.
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-lg">{`1) Information We Collect:`}</h2>
            <ul className="list-disc ml-6">
              <li>
                <span className="font-bold">Personal Information:</span> When
                you sign up for Zyvo, we collect your name, email address, phone
                number, and payment information.
              </li>
              <li>
                <span className="font-bold">Usage Information: </span>We may
                collect information about how you use our platform, including
                your search queries, rental history, and preferences.
              </li>
              <li>
                <span className="font-bold">Device Information: </span>We may
                collect information about the device you use to access Zyvo,
                such as your IP address, browser type, and operating system
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-lg">{`2) How We Use Your Information:`}</h2>
            <ul className="list-disc ml-6">
              <li>
                <span className="font-bold">Provide Services:</span> We use your
                personal information to facilitate and improve your experience
                on Zyvo, including processing bookings, communicating with you,
                and resolving any issues.
              </li>
              <li>
                <span className="font-bold">Personalization: </span>We may use
                your information to personalize your experience, recommend
                relevant rentals, and send you promotional offers.
              </li>
              <li>
                <span className="font-bold">Analytics: </span>We analyze usage
                patterns and trends to improve our platform, enhance user
                experience, and develop new features.
              </li>
              <li>
                <span className="font-bold">Legal Compliance: </span>We may use
                your information to comply with applicable laws, regulations, or
                legal processes.
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-lg">{`3) Data Sharing:`}</h2>
            <ul className="list-disc ml-6">
              <li>
                <span className="font-bold">Service Providers:</span> We may
                share your information with trusted third-party service
                providers who assist us in operating our platform, processing
                payments, and delivering services.
              </li>
              <li>
                <span className="font-bold">Legal Requirements: </span>We may
                disclose your information if required by law, court order, or
                government request.
              </li>
              <li>
                <span className="font-bold">Business Transfers: </span>In the
                event of a merger, acquisition, or sale of Zyvo, your
                information may be transferred to the new entity.
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-lg">{`4) Data Security:`}</h2>
            <ul className="list-disc ml-6">
              <li>
                We implement industry-standard security measures to protect your
                personal information from unauthorized access, disclosure, or
                alteration.
              </li>
              <li>
                However, no method of transmission over the internet or
                electronic storage is 100% secure, and we cannot guarantee
                absolute security.
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-lg">{`5) Third-Party Links:`}</h2>
            <ul className="list-disc ml-6">
              <li>
                Zyvo may contain links to third-party websites or services. We
                are not responsible for the privacy practices or content of
                these third parties. We encourage you to review their privacy
                policies before providing any personal information.
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-lg">{`6) Children's Privacy:`}</h2>
            <ul className="list-disc ml-6">
              <li>
                Zyvo is not intended for use by individuals under the age of 18.
                We do not knowingly collect personal information from children.
                If we become aware of any such data, we will promptly delete it.
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-lg">{`7) Changes to Privacy Policy:`}</h2>
            <ul className="list-disc ml-6">
              <li>
                We may update this Privacy Policy from time to time. Any changes
                will be posted on Zyvo, and the revised policy will be effective
                immediately upon posting.
              </li>
            </ul>
          </div>
        </div>

        <p>
          If you have any questions or concerns about our Privacy Policy, please
          contact us at <span className="font-bold">support@zyvoapp.com</span>
        </p>
      </div>
    </div>
  );
};
export default PrivacyPage;
