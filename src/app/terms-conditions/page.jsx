'use client'
export default function TermsPage() {
  return (
    <main className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
      <div className="bg-white dark:bg-gray-800 rounded-lg  md:p-12 p-8">
        <div className="mb-8">
          <p className="text-4xl font-bold text-gray-900 mb-4 dark:text-white">Terms and Conditions</p>
          <p className="text-lg text-gray-600 dark:text-gray-400">Last updated: December 15, 2024</p>
        </div>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          {/* 1. Introduction */}
          <section className="mb-8">
            <p className="text-2xl font-semibold text-gray-900 mb-4 pb-2 dark:text-white border-b-2 border-indigo-500">
              1. Introduction
            </p>
            <p className="mb-4 leading-relaxed">
              Thank you for shopping at <a href="/">Doorbix</a>. We strive to provide a seamless shopping experience and want you completely satisfied with your purchase. This policy explains our guidelines and procedures for processing refunds and replacements. By purchasing on our website, you agree to the terms of this Policy.
            </p>
          </section>

          {/* 2. Definitions */}
          <section className="mb-8">
            <p className="text-2xl font-semibold text-gray-900 mb-4 pb-2 dark:text-white border-b-2 border-indigo-500">
              2. Definitions
            </p>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg mb-4 p-6">
              <ul className="space-y-2">
                <li>
                  <strong className="text-indigo-700 dark:text-indigo-300">Company:</strong> DoorBix.
                </li>
                <li>
                  <strong className="text-indigo-700 dark:text-indigo-300">User:</strong> Any individual who accesses
                  or uses our website or services.
                </li>
                <li>
                  <strong className="text-indigo-700 dark:text-indigo-300">Service:</strong> All Niche Products are available here.
                  provided through our site.
                </li>
                <li>
                  <strong className="text-indigo-700 dark:text-indigo-300">Content:</strong> All text, images, videos,
                  and other materials.
                </li>
              </ul>
            </div>
          </section>

          {/* 3. User Responsibilities */}
          <section className="mb-8">
            <p className="text-2xl font-semibold text-gray-900 mb-4 pb-2 dark:text-white border-b-2 border-indigo-500">
              3. User Responsibilities
            </p>
            <p className="mb-4 leading-relaxed">
              By using our services, you agree to use them responsibly and in accordance with applicable laws...
            </p>

            <div className="md:grid-cols-2 grid gap-6">
              {/* Permitted Uses */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <p className="text-lg font-semibold text-gray-900 mb-3 dark:text-white">Permitted Uses</p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Use services for legitimate purposes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Provide accurate information</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Maintain account security</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Follow all laws and regulations</span>
                  </li>
                </ul>
              </div>

              {/* Prohibited Uses */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <p className="text-lg font-semibold text-gray-900 mb-3 dark:text-white">Prohibited Uses</p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Engage in illegal activities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Violate intellectual property</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Transmit malicious code</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Disrupt or attack our services</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Additional Sections (Privacy Policy, IP, Liability...) */}
          {/* You can repeat the same JSX conversion pattern for each section (4–10) exactly as done above */}



          <section className="mb-8">
           <div className="space-y-4">
  <p className="text-2xl font-semibold text-gray-900 pb-2 dark:text-white border-b-2 border-indigo-500">
    1. Further Details
  </p>

  <h5 className="leading-relaxed font-semibold">Replacement Eligibility:</h5>
  <h6 className="font-medium">Product Eligibility</h6>
  <p>
    As a responsible company Tazah Global wants to ensure that the product is
    received by the customer in its original condition and is not incorrect,
    broken or faulty. If you receive a product that is incorrect, faulty,
    broken or damaged you are eligible for a free replacement.
  </p>

  <h6 className="font-medium">Timeframe</h6>
  <p>
    DoorBix will cater all complaints landed within 30 days of delivery.
    <br />
    Your request of a replacement within 7 days from the date of delivery will
    be done free of cost. After 7 days, there will be certain charges for the
    replacement.
  </p>

  <h6 className="font-medium">Replacement Process</h6>

  <h6 className="font-medium">Initiation</h6>
  <p>
    To initiate a replacement, please share a video of the incorrect, faulty or
    damaged product to our customer support team within the eligible time
    frame. In a lot of cases the issue is with the usage of the product and our
    team can guide you on how the issue you are facing can be fixed. If we
    determine that the product is indeed faulty…
  </p>

  <h6 className="font-medium">Option A</h6>
  <p>
    You need to ship the incorrect, faulty, damaged or broken product in its
    original packing (Original Product Box and All Accessories) to our warehouse
    at the below address:
  </p>
  <p className="italic">
    Tazah Global LLC, Warehouse # 13, Plot # 4488, Al Sajaa Industrial, Sharjah, UAE
  </p>
  <p>
    Within 5 working days of receipt of the product, we will ship the
    replacement for you free of charge.
  </p>

  <h6 className="font-medium">Option B</h6>
  <p>
    We will schedule a replacement for you within 14 working days. Please pack
    the product (Original Product Box and All Accessories) for the courier to
    pick it up and provide you a replacement.
  </p>
  <p className="text-red-600 font-medium">
    Please note that we do not offer a replacement for “change of mind”.
  </p>

  <h6 className="font-medium">Refund</h6>
  <p>We do not have a refund policy.</p>
</div>

          </section>
          {/* Example Footer Section */}
          <div className="mt-12 mb-8 pt-8 border-t border-gray-200 dark:border-gray-600">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6">
              <p className="text-lg font-semibold text-indigo-800 mb-3 dark:text-indigo-200">Acknowledgment</p>
              <p className="text-indigo-700 dark:text-indigo-300">
                By using our services, you acknowledge that you have read, understood, and agree to be bound by these
                terms and conditions...
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
