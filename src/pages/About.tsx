
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";

export default function About() {
  return (
    <AppLayout>
      <header className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center mb-1">
          <Link to="/profile" className="mr-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">About Chef AI</h1>
        </div>
      </header>

      <main className="p-6 space-y-6">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-chef-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="font-bold text-2xl">CIA</span>
          </div>
          <h2 className="text-xl font-bold">Chef AI</h2>
          <p className="text-gray-500">Version 1.0.0</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold mb-3">What is Chef AI?</h3>
          <p className="text-gray-600 text-sm">
            Chef AI is your personal kitchen wizard that helps you discover and prepare personalized meals and drinks using AI technology. Our app reduces food waste, accommodates dietary needs, and provides step-by-step cooking guidance.
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold mb-3">Our Mission</h3>
          <p className="text-gray-600 text-sm">
            Chef AI aims to make cooking accessible and customized for everyone. We believe in helping people make the most of what they have, reducing food waste, and making healthy eating easier through technology and personalization.
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold mb-3">Key Features</h3>
          <ul className="text-gray-600 text-sm space-y-2">
            <li>• AI-powered recipe suggestions based on available ingredients</li>
            <li>• Dietary preference and restriction management</li>
            <li>• Smart pantry inventory tracking</li>
            <li>• Step-by-step cooking instructions</li>
            <li>• Nutritional information and health insights</li>
            <li>• Recipe discovery from global cuisines</li>
            <li>• Meal planning capabilities</li>
            <li>• Shopping list generation</li>
            <li>• Add your own recipes</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold mb-3">Premium Features</h3>
          <ul className="text-gray-600 text-sm space-y-2">
            <li>• Detailed nutritional analysis</li>
            <li>• Video-guided cooking</li>
            <li>• AI voice and image recognition</li>
            <li>• Advanced meal planning and shopping list generation</li>
            <li>• Ad-free experience</li>
            <li>• Priority support</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold mb-3">Contact Us</h3>
          <p className="text-gray-600 text-sm mb-3">
            We're always looking to improve. If you have questions, feedback, or suggestions, please reach out to us.
          </p>
          <p className="text-gray-600 text-sm">
            <strong>Email:</strong> support@chefai.app<br />
            <strong>Website:</strong> www.chefai.app
          </p>
        </div>

        <div className="text-center text-gray-500 text-sm">
          <p>&copy; 2025 Chef AI Inc. All rights reserved.</p>
        </div>
      </main>
    </AppLayout>
  );
}
