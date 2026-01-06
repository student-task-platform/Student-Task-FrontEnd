"use client";

import { useRouter } from 'next/navigation';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-100 p-3 rounded-xl">
              <Shield className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
              <p className="text-sm text-slate-500 mt-1">Last updated: January 5, 2026</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Introduction</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Welcome to Student Task&apos;s Privacy Policy. We respect your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and safeguard your information when you use our task management application.
              </p>
              <p className="text-slate-600 leading-relaxed">
                By using Student Task, you consent to the data practices described in this policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">2. Information We Collect</h2>
              
              <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-4">2.1 Information You Provide</h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                When you create an account and use Student Task, we collect:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                <li>Full name</li>
                <li>Email address</li>
                <li>Password (encrypted)</li>
                <li>Task content (titles, descriptions, deadlines, categories)</li>
                <li>Task completion status and timestamps</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-4">2.2 Automatically Collected Information</h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                We automatically collect certain information when you use our service:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>Device information (browser type, operating system)</li>
                <li>IP address</li>
                <li>Usage data (features used, time spent)</li>
                <li>Authentication tokens</li>
                <li>Error logs and performance data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">3. How We Use Your Information</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                We use the collected information to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>Provide and maintain the Student Task service</li>
                <li>Authenticate your account and verify your identity</li>
                <li>Store and sync your tasks across devices</li>
                <li>Send email notifications for verification and important updates</li>
                <li>Improve our service and develop new features</li>
                <li>Analyze usage patterns and optimize performance</li>
                <li>Detect and prevent fraud, abuse, and security incidents</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">4. Data Storage and Security</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We take data security seriously and implement industry-standard measures to protect your information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                <li>Passwords are encrypted using Firebase Authentication&apos;s secure hashing</li>
                <li>Data is transmitted over secure HTTPS connections</li>
                <li>Data is stored in Firebase&apos;s secure cloud infrastructure</li>
                <li>Access to user data is restricted to authorized personnel only</li>
                <li>Regular security audits and updates are performed</li>
              </ul>
              <p className="text-slate-600 leading-relaxed">
                However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security of your data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">5. Data Sharing and Disclosure</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                We do not sell your personal information. We may share your data only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                <li><strong>Service Providers:</strong> We use Firebase (Google) for authentication and database services</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
                <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</li>
              </ul>
              <p className="text-slate-600 leading-relaxed">
                Your task content is private and visible only to you unless you choose to share it.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">6. Third-Party Services</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                Student Task integrates with the following third-party services:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                <li><strong>Firebase Authentication:</strong> For secure user authentication and account management</li>
                <li><strong>Firebase Firestore:</strong> For secure data storage and synchronization</li>
              </ul>
              <p className="text-slate-600 leading-relaxed">
                These services have their own privacy policies. We encourage you to review Google&apos;s privacy policy for Firebase services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">7. Your Privacy Rights</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                You have the following rights regarding your personal data:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from non-essential communications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">8. Data Retention</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We retain your personal information for as long as your account is active or as needed to provide services. When you delete your account, we will delete or anonymize your personal data within 30 days, except where we are required to retain it for legal purposes.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Backup copies may persist in our systems for a limited time after deletion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">9. Children&apos;s Privacy</h2>
              <p className="text-slate-600 leading-relaxed">
                Student Task is intended for users aged 13 and above. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately so we can delete it.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">10. Cookies and Tracking</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We use cookies and similar technologies to maintain your session and improve your experience. These technologies help us:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>Keep you logged in</li>
                <li>Remember your preferences</li>
                <li>Analyze how you use our service</li>
                <li>Detect and prevent security issues</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">11. Changes to Privacy Policy</h2>
              <p className="text-slate-600 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of significant changes by email or through a notice on our service. Your continued use of Student Task after changes indicates acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">12. Contact Us</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us through:
              </p>
              <ul className="list-none space-y-2 text-slate-600">
                <li>• The support channels in our application</li>
                <li>• Email: privacy@studenttask.com</li>
              </ul>
            </section>

            <div className="mt-12 p-6 bg-indigo-50 rounded-xl border border-indigo-100">
              <p className="text-sm text-indigo-900 font-medium mb-2">
                Your Privacy Matters
              </p>
              <p className="text-sm text-indigo-800">
                We are committed to protecting your privacy and being transparent about how we handle your data. If you have any concerns, please don&apos;t hesitate to reach out.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
