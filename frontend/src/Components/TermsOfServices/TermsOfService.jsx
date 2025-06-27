import React from 'react';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 text-gray-800">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-primary mb-6 border-b pb-2">
          Terms of Service
        </h1>

        <section className="space-y-4 leading-relaxed">
          <p>
            Welcome to our platform. By accessing or using our services, you agree to comply with and be bound by the following terms and conditions.
          </p>

          <p>
            <strong>User Responsibilities:</strong> You are solely responsible for the content you post and the activity under your account. Ensure that your use complies with all applicable laws and regulations.
          </p>

          <p>
            <strong>Service Usage:</strong> We grant you a non-transferable, non-exclusive, revocable license to access and use our services strictly in accordance with these terms.
          </p>

          <p>
            <strong>Account Termination:</strong> We reserve the right to suspend or terminate your account if you violate any of these terms, without prior notice.
          </p>

          <p>
            <strong>Modifications:</strong> We may update these Terms of Service at any time. Continued use of the service after changes signifies your acceptance of the revised terms.
          </p>
        </section>

        <div className="mt-8 text-sm text-gray-500">
          Last updated: June 27, 2025
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
