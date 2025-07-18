'use client'

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl md:p-12 p-8">
        <div className="mb-8">
          <p className="text-4xl font-bold text-gray-900 mb-4 dark:text-white">Privacy Policy</p>
          <p className="text-lg text-gray-600 dark:text-gray-400">Last updated: December 15, 2024</p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          {/* 1. Introduction */}
          <section className="mb-8">
            <p className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-indigo-500 dark:text-white">
              1. Introduction
            </p>
            <p className="mb-4 leading-relaxed">
              We value your privacy and are committed to protecting your personal data. This policy outlines how we
              collect, use, and safeguard your information.
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section className="mb-8">
            <p className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-indigo-500 dark:text-white">
              2. Information We Collect
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Personal details (name, email, phone number, etc.)</li>
              <li>Usage data (IP address, browser type, visit duration)</li>
              <li>Payment and transaction information</li>
            </ul>
          </section>

          {/* 3. How We Use Your Information */}
          <section className="mb-8">
            <p className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-indigo-500 dark:text-white">
              3. How We Use Your Information
            </p>
            <p className="mb-4">We use your data to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Provide and improve our services</li>
              <li>Send updates, promotions, and important notices</li>
              <li>Maintain security and prevent fraud</li>
            </ul>
          </section>

          {/* 4. Data Protection & Security */}
          <section className="mb-8">
            <p className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-indigo-500 dark:text-white">
              4. Data Protection & Security
            </p>
            <p>
              We implement appropriate technical and organizational security measures to protect your data from
              unauthorized access or disclosure.
            </p>
          </section>

          {/* 5. Your Rights */}
          <section className="mb-8">
            <p className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-indigo-500 dark:text-white">
              5. Your Rights
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Access and update your personal data</li>
              <li>Request deletion of your information</li>
              <li>Withdraw consent for data processing</li>
            </ul>
          </section>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-600">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6">
              <p className="text-lg font-semibold text-indigo-800 mb-3 dark:text-indigo-200">Contact Us</p>
              <p className="text-indigo-700 dark:text-indigo-300">
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:privacy@companyname.com" className="text-blue-600 dark:text-blue-400 underline">
                  privacy@companyname.com
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
