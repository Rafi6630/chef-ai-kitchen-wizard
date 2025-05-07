
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";

export default function Terms() {
  return (
    <AppLayout>
      <header className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center mb-1">
          <Link to="/profile" className="mr-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Terms of Service</h1>
        </div>
        <p className="text-gray-600 text-sm">Last updated: May 7, 2025</p>
      </header>

      <main className="p-6 space-y-6">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold mb-3">1. Acceptance of Terms</h3>
          <p className="text-gray-600 text-sm">
            By accessing or using Chef AI, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the application.
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold mb-3">2. User Accounts</h3>
          <p className="text-gray-600 text-sm">
            To use certain features of the application, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold mb-3">3. Subscription and Payments</h3>
          <p className="text-gray-600 text-sm">
            Chef AI offers both free and premium subscription options. By subscribing to our premium services, you agree to pay all fees associated with your chosen subscription plan. Payments are processed securely through our payment providers. Subscriptions will automatically renew unless cancelled before the renewal date. Refunds are issued in accordance with our Refund Policy.
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold mb-3">4. User Content</h3>
          <p className="text-gray-600 text-sm">
            You retain ownership of content you create or upload to Chef AI. By submitting content, you grant Chef AI a worldwide, non-exclusive license to use, reproduce, modify, and display the content in connection with providing services to you and other users.
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold mb-3">5. Service Modifications</h3>
          <p className="text-gray-600 text-sm">
            We reserve the right to modify, suspend, or discontinue any part of Chef AI at any time with or without notice. We will not be liable to you or any third party for any modification, suspension, or discontinuation of the service.
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold mb-3">6. Disclaimer of Warranties</h3>
          <p className="text-gray-600 text-sm">
            Chef AI is provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not guarantee that the service will be uninterrupted, secure, or error-free.
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold mb-3">7. Health Information Disclaimer</h3>
          <p className="text-gray-600 text-sm">
            Nutritional information and health recommendations provided by Chef AI are for general informational purposes only and are not intended as medical advice. Always consult with a qualified healthcare professional regarding dietary changes or restrictions.
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold mb-3">8. Limitation of Liability</h3>
          <p className="text-gray-600 text-sm">
            In no event shall Chef AI, its affiliates, or their respective officers, directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the application.
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold mb-3">9. Governing Law</h3>
          <p className="text-gray-600 text-sm">
            These Terms of Service shall be governed by the laws of the jurisdiction in which Chef AI operates, without regard to its conflict of law provisions.
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold mb-3">10. Changes to Terms</h3>
          <p className="text-gray-600 text-sm">
            We reserve the right to modify these Terms of Service at any time. If we make material changes to these terms, we will notify you through the application or by other means. Your continued use of Chef AI after such modifications constitutes your acceptance of the revised Terms of Service.
          </p>
        </div>

        <div className="text-center text-gray-500 text-sm mt-8">
          <p>By using Chef AI, you acknowledge that you have read, understood, and agree to these Terms of Service.</p>
          <p className="mt-2">&copy; 2025 Chef AI Inc. All rights reserved.</p>
        </div>
      </main>
    </AppLayout>
  );
}
