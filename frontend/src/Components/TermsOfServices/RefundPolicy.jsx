import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 text-gray-800">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-primary mb-6 border-b pb-2">
          Refund Policy
        </h1>

        <section className="space-y-4 leading-relaxed">
          <p>
            We strive to ensure our customers are fully satisfied. If you're not happy with your purchase, you may request a refund within <strong>14 days</strong> of the transaction.
          </p>

          <p>
            <strong>How to Request a Refund:</strong> Please reach out to our support team with your order number and a brief explanation of the issue. Our team will assist you throughout the process.
          </p>

          <p>
            <strong>Processing Time:</strong> Once approved, refunds will be issued to your original payment method within <strong>5–10 business days</strong>.
          </p>

          <p>
            <strong>Exceptions:</strong> Certain items or services may be non-refundable, which will be clearly indicated at the time of purchase.
          </p>
        </section>

        <div className="mt-8 text-sm text-gray-500">
          Last updated: June 27, 2025
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
