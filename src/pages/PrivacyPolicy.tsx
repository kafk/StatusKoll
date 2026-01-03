import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  const lastUpdated = "January 3, 2026";
  const appName = "Statuskoll";
  const companyName = "Gota Innovation";
  const contactEmail = "support@gotainnovation.se";

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to app
        </Link>

        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
          </div>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              {companyName} ("we", "our", or "us") operates the {appName} mobile application. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your 
              information when you use our application.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Please read this Privacy Policy carefully. By using {appName}, you agree to the 
              collection and use of information in accordance with this policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Information We Collect</h2>
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-foreground">Personal Data</h3>
              <p className="text-muted-foreground leading-relaxed">
                When you use {appName}, we may collect the following types of information:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Booking and reservation information you enter</li>
                <li>Customer names and contact details you provide</li>
                <li>Financial data related to bookings (amounts, dates)</li>
                <li>Usage data and app interaction patterns</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-foreground">Automatically Collected Data</h3>
              <p className="text-muted-foreground leading-relaxed">
                We may automatically collect certain information when you use the app, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Device information (model, operating system)</li>
                <li>App usage statistics</li>
                <li>Crash reports and performance data</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>To provide and maintain our service</li>
              <li>To manage your bookings and reservations</li>
              <li>To improve and optimize the app experience</li>
              <li>To communicate with you about updates or issues</li>
              <li>To detect and prevent technical issues</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Data Storage and Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your data is stored securely using industry-standard encryption and security 
              practices. We use trusted cloud infrastructure to ensure your information is 
              protected against unauthorized access, alteration, or destruction.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              While we strive to use commercially acceptable means to protect your personal 
              data, no method of transmission over the Internet or electronic storage is 
              100% secure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Data Sharing</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. 
              We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>With service providers who assist in operating our app</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and prevent fraud</li>
              <li>With your consent</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Request data portability</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              {appName} is not intended for use by children under the age of 13. We do not 
              knowingly collect personal information from children under 13. If we discover 
              that a child under 13 has provided us with personal data, we will delete such 
              information immediately.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any 
              changes by posting the new Privacy Policy on this page and updating the "Last 
              updated" date. You are advised to review this Privacy Policy periodically for 
              any changes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy or our data practices, 
              please contact us at:
            </p>
            <div className="bg-muted/50 rounded-lg p-4 space-y-1">
              <p className="text-foreground font-medium">{companyName}</p>
              <p className="text-muted-foreground">
                Email: <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">{contactEmail}</a>
              </p>
            </div>
          </section>
        </div>

        <footer className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {companyName}. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
