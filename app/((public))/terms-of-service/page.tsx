"use client";
import { poppins } from "@/lib/utils";
const TermsPage = () => {
  return (
    <div className="container mx-auto flex flex-col my-8  justify-center items-center">
      <h2
        className={`text-center font-bold text-4xl my-4 ${poppins.className}`}
      >
        Terms of Service for Zyvo
      </h2>
      <div className="flex flex-col gap-6">
        <p>
          {`These Terms of Service ("Terms") govern your use of Zyvo's hourly
            rental platform. By accessing or using Zyvo, you agree to be bound
            by these Terms. If you do not agree with any part of these Terms,
            you may not use Zyvo.`}
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-lg">{`1. User Responsibilities:`}</h2>
            <ul className="list-disc ml-6">
              <li>You must be at least 18 years old to use Zyvo.</li>
              <li>
                You are responsible for maintaining the confidentiality of your
                account information and for all activities that occur under your
                account.
              </li>
              <li>
                You agree to provide accurate and up-to-date information when
                using Zyvo.
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-lg">{`2) Rental Listings and Bookings:`}</h2>
            <ul className="list-disc ml-6">
              <li>
                Zyvo allows users to list and book hourly rentals. As a renter,
                you agree to pay the listed rental price and any additional fees
                specified by the host.
              </li>
              <li>
                As a host, you agree to accurately describe your rental and
                provide it in the condition specified in the listing.
              </li>
              <li>
                Zyvo is not responsible for any disputes between renters and
                hosts. We encourage users to communicate and resolve any issues
                directly.
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-lg">{`3) Prohibited Activities:`}</h2>
            <ul className="list-disc ml-6">
              <li>
                You may not use Zyvo for any illegal or unauthorized purpose.
              </li>
              <li>
                You may not violate any laws, regulations, or third-party
                rights.
              </li>
              <li>
                {`You may not engage in any activity that could harm Zyvo's
                  reputation or interfere with its operation.`}
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-lg">{`4) Intellectual Property:`}</h2>
            <ul className="list-disc ml-6">
              <li>
                {`Zyvo and its content are protected by copyright, trademark,
                  and other intellectual property laws. - You may not use,
                  reproduce, modify, or distribute Zyvo's content without prior
                  written permission.`}
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-lg">{`5) Limitation of Liability:`}</h2>
            <ul className="list-disc ml-6">
              <li>
                Zyvo is not responsible for any damages, losses, or liabilities
                arising from your use of the platform or any rental
                transactions.
              </li>
              <li>
                Zyvo does not guarantee the availability, quality, or safety of
                any rentals listed on the platform.
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-lg">{`6) Indemnification:`}</h2>
            <ul className="list-disc ml-6">
              <li>
                You agree to indemnify and hold Zyvo harmless from any claims,
                damages, or losses arising from your use of the platform or any
                violation of these Terms.
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-lg">{`7) Termination:`}</h2>
            <ul className="list-disc ml-6">
              <li>
                Zyvo may terminate or suspend your access to the platform at any
                time, without prior notice or liability, for any reason.
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-lg">{`8) Governing Laws:`}</h2>
            <ul className="list-disc ml-6">
              <li>
                These Terms are governed by and construed in accordance with the
                laws of [Georgia]. Any disputes arising from these Terms shall
                be resolved in the courts of [Georgia].
              </li>
            </ul>
          </div>
        </div>

        <p>
          If you have any questions or concerns about these Terms of Service,
          please contact us at{" "}
          <span className="font-bold">support@zyvoapp.com</span>
        </p>
      </div>
    </div>
  );
};

export default TermsPage;
