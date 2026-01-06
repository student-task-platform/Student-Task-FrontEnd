"use client";

import { useRouter } from 'next/navigation';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function TermsPage() {
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
              <BookOpen className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Terms of Service</h1>
              <p className="text-sm text-slate-500 mt-1">Last updated: January 5, 2026</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Acceptance of Terms</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Welcome to Student Task. By accessing or using our task management application, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">2. Service Description</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Student Task is a web-based task management platform designed specifically for students to organize, track, and manage their academic assignments, projects, exams, and study tasks.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We provide features including task creation, deadline tracking, completion status management, and task categorization to help students stay organized and productive.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">3. User Accounts</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                To use Student Task, you must:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                <li>Create an account with accurate and complete information</li>
                <li>Maintain the security of your password and account</li>
                <li>Be at least 13 years of age or have parental consent</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
                <li>Be responsible for all activities that occur under your account</li>
              </ul>
              <p className="text-slate-600 leading-relaxed">
                You may not share your account credentials or allow others to access your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">4. Acceptable Use</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                You agree not to use Student Task to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>Violate any laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Upload malicious code or viruses</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Use automated systems to access the service</li>
                <li>Impersonate others or misrepresent your affiliation</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">5. User Content</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                You retain all rights to the content you create and store in Student Task (your tasks, descriptions, and related data). By using our service, you grant us permission to store, process, and display your content solely for the purpose of providing the service.
              </p>
              <p className="text-slate-600 leading-relaxed">
                You are responsible for ensuring your content does not violate any laws or third-party rights. We reserve the right to remove content that violates these terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">6. Service Availability</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                While we strive to provide reliable service, we do not guarantee that Student Task will be available 100% of the time. The service may be temporarily unavailable due to maintenance, updates, or circumstances beyond our control.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We recommend regularly backing up important information and not relying solely on our service for critical deadline tracking.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">7. Intellectual Property</h2>
              <p className="text-slate-600 leading-relaxed">
                The Student Task application, including its design, features, and code, is owned by us and protected by copyright and intellectual property laws. You may not copy, modify, distribute, or reverse engineer any part of our service without explicit permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">8. Limitation of Liability</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Student Task is provided &quot;as is&quot; without warranties of any kind. We are not liable for any damages arising from your use of the service, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>Lost data or missed deadlines</li>
                <li>Service interruptions or errors</li>
                <li>Academic consequences from using or not using the service</li>
                <li>Unauthorized access to your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">9. Termination</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                You may delete your account at any time. We reserve the right to suspend or terminate your account if you violate these terms or engage in harmful behavior.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Upon termination, your right to use the service ceases immediately. We may retain certain data as required by law or for legitimate business purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">10. Changes to Service</h2>
              <p className="text-slate-600 leading-relaxed">
                We reserve the right to modify, suspend, or discontinue any part of Student Task at any time. We will make reasonable efforts to notify users of significant changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">11. Contact Information</h2>
              <p className="text-slate-600 leading-relaxed">
                If you have questions about these Terms of Service, please contact us through the support channels provided in the application.
              </p>
            </section>

            <div className="mt-12 p-6 bg-indigo-50 rounded-xl border border-indigo-100">
              <p className="text-sm text-indigo-900 font-medium">
                By using Student Task, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
