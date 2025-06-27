import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 text-gray-800">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-primary mb-6 border-b pb-2">
          Privacy Policy
        </h1>

        <section className="space-y-4 leading-relaxed">
          <p>
            Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information.
          </p>

          <p>
            <strong>Information Collection:</strong> We only collect data that is necessary to provide and improve our services, such as your name, email address, and usage behavior.
          </p>

          <p>
            <strong>Use of Information:</strong> We use your information solely to deliver our services, communicate with you, and improve user experience.
          </p>

          <p>
            <strong>Data Sharing:</strong> We do not sell or share your personal information with third parties without your consent, except as required by law.
          </p>

          <p>
            <strong>Your Rights:</strong> You can access, update, or request deletion of your personal data by contacting our support team at any time.
          </p>

          <p>
            <strong>Security:</strong> We implement industry-standard security measures to protect your data against unauthorized access or disclosure.
          </p>
        </section>

        <div className="mt-8 text-sm text-gray-500">
          Last updated: June 27, 2025
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
