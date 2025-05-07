
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";

export default function Privacy() {
  return (
    <AppLayout>
      <header className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center mb-1">
          <Link to="/profile" className="mr-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Privacy Policy</h1>
        </div>
        <p className="text-gray-600 text-sm">Last updated: May 7, 2025</p>
      </header>

      <main className="p-6 space-y-6">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold mb-3">1. Introduction</h3>
          <p className="text-gray-600 text-sm">
            Chef AI is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information about you when you use our mobile application and related services. Please read this policy carefully to understand our practices regarding your personal data.
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold mb-3">2. Information We Collect</h3>
          <div className="text-gray-600 text-sm space-y-2">
            <p><strong>a) Information You Provide:</strong> We collect information you provide directly, including:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Account information (name, email address, password)</li>
              <li>Profile information (dietary preferences, allergies, health goals)</li>
              <li>User-generated content (saved recipes, pantry items, cooking history)</li>
              <li>Payment information (for premium subscriptions)</li>
              <li>Communications with our support team</li>
            </ul>
            
            <p className="mt-2"><strong>b) Automatically Collected Information:</strong> When you use Chef AI, we automatically collect:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Device information (device type, operating system, unique device identifiers)</li>
              <li>Log information (interactions with the app, usage statistics, errors)</li>
              <li>Location information (with your permission)</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold mb-3">3. How We Use Your Information</h3>
          <p className="text-gray-600 text-sm">
            We use the information we collect to:
          </p>
          <ul className="text-gray-600 text-sm list-disc pl-5 space-y-1 mt-2">
            <li>Provide, maintain, and improve Chef AI</li>
            <li>Process transactions and manage your account</li>
            <li>Personalize your experience and deliver content tailored to your preferences</li>
            <li>Send you technical notices, updates, security alerts, and support messages</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Monitor and analyze trends, usage, and activities</li>
            <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
            <li>Comply with legal obligations</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold mb-3">4. Data Sharing and Disclosure</h3>
          <p className="text-gray-600 text-sm">
            We may share your information with:
          </p>
          <ul className="text-gray-600 text-sm list-disc pl-5 space-y-1 mt-2">
            <li>Service providers who perform services on our behalf</li>
            <li>Partners with whom we offer co-branded services or products</li>
            <li>Law enforcement agencies or government bodies when required by law</li>
            <li>In connection with a merger, sale, or acquisition</li>
          </ul>
          <p className="text-gray-600 text-sm mt-2">
            We do not sell your personal information to third parties for advertising purposes.
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold mb-3">5. Data Security</h3>
          <p className="text-gray-600 text-sm">
            We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold mb-3">6. Your Rights and Choices</h3>
          <p className="text-gray-600 text-sm">
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul className="text-gray-600 text-sm list-disc pl-5 space-y-1 mt-2">
            <li>Accessing, correcting, or deleting your information</li>
            <li>Objecting to our processing of your information</li>
            <li>Requesting portability of your information</li>
            <li>Withdrawing consent at any time (where processing is based on consent)</li>
          </ul>
          <p className="text-gray-600 text-sm mt-2">
            You can exercise these rights by contacting us through the app or via email at privacy@chefai.app.
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold mb-3">7. Children's Privacy</h3>
          <p className="text-gray-600 text-sm">
            Chef AI is not directed to children under the age of 16. We do not knowingly collect personal information from children under 16. If you believe we have inadvertently collected information from a child under 16, please contact us to have it removed.
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold mb-3">8. Changes to This Privacy Policy</h3>
          <p className="text-gray-600 text-sm">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </div>

        <div className="text-center text-gray-500 text-sm mt-8">
          <p>By using Chef AI, you acknowledge that you have read and understand this Privacy Policy.</p>
          <p className="mt-2">&copy; 2025 Chef AI Inc. All rights reserved.</p>
          <p className="mt-2">Questions about this policy? Contact us at privacy@chefai.app</p>
        </div>
      </main>
    </AppLayout>
  );
}
