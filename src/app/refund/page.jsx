'use client';

export default function RefundPolicyPage() {
  return (
    <main className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl md:p-12 p-8">
        <div className="mb-8">
          <p className="text-4xl font-bold text-gray-900 mb-4 dark:text-white">Refund Policy</p>
          <p className="text-lg text-gray-600 dark:text-gray-400">Last updated: December 15, 2024</p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          {/* 1. Overview */}
          <section className="mb-8">
            <p className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-indigo-500 dark:text-white">
              1. Overview
            </p>
            <p>
              Our refund policy lasts for 14 days. If 14 days have gone by since your purchase, unfortunately, we
              cannot offer you a refund or exchange.
            </p>
          </section>

          {/* 2. Eligibility for Refunds */}
          <section className="mb-8">
            <p className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-indigo-500 dark:text-white">
              2. Eligibility for Refunds
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Item must be unused and in the same condition that you received it</li>
              <li>Item must be in original packaging</li>
              <li>Proof of purchase is required</li>
            </ul>
          </section>

          {/* 3. Non-Refundable Items */}
          <section className="mb-8">
            <p className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-indigo-500 dark:text-white">
              3. Non-Refundable Items
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Gift cards</li>
              <li>Downloadable software products</li>
              <li>Some health and personal care items</li>
            </ul>
          </section>

          {/* 4. Late or Missing Refunds */}
          <section className="mb-8">
            <p className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-indigo-500 dark:text-white">
              4. Late or Missing Refunds
            </p>
            <p>
              If you haven’t received a refund yet, first check your bank account again. Then contact your credit card
              company, it may take some time before your refund is officially posted.
            </p>
          </section>

          {/* 5. Contact Us */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-600">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6">
              <p className="text-lg font-semibold text-indigo-800 mb-3 dark:text-indigo-200">Need Help?</p>
              <p className="text-indigo-700 dark:text-indigo-300">
                If you have questions related to refunds or returns, contact us at{" "}
                <a href="mailto:refunds@companyname.com" className="text-blue-600 dark:text-blue-400 underline">
                  refunds@companyname.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
