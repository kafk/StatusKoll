import { ArrowLeft, Mail, MessageCircle, HelpCircle, BookOpen, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Support = () => {
  const appName = "StatusKoll";
  const companyName = "Gota Innovation";
  const contactEmail = "support@gotainnovation.se";

  const faqs = [
    {
      question: "How do I add a new booking?",
      answer: "Tap the + button on the home screen, fill in the guest details, check-in/check-out dates, and amount. The booking will appear in your timeline."
    },
    {
      question: "How do I mark a cleaning as complete?",
      answer: "Open the customer detail page by tapping on a booking, then toggle the 'Cleaning Done' switch to mark it as complete."
    },
    {
      question: "Can I track payments from different platforms?",
      answer: "Yes! When creating a booking, you can select the platform (Airbnb, Booking, VRBO, or Direct). This helps you track revenue by source in the Statistics section."
    },
    {
      question: "How do I add expenses?",
      answer: "Go to the Economy section and tap 'Add Cost'. Enter the expense details including name, amount, date, and category."
    },
    {
      question: "Can I invite team members?",
      answer: "Yes! Go to Settings > Team to invite co-owners, partners, or cleaners. Each role has different access levels."
    },
    {
      question: "How do I export my data?",
      answer: "Currently, you can view all your data within the app. Export functionality is coming in a future update."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, your data is stored securely using industry-standard encryption. We never share your personal or business data with third parties."
    },
    {
      question: "How do I delete my account?",
      answer: "Contact us at support@gotainnovation.se and we will process your account deletion request within 48 hours."
    }
  ];

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
            <h1 className="text-3xl font-bold text-foreground mb-2">Support</h1>
            <p className="text-muted-foreground">
              Get help with {appName}. Find answers to common questions or contact us directly.
            </p>
          </div>

          {/* Contact Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Contact Us
            </h2>
            <div className="bg-muted/50 rounded-lg p-6 space-y-4">
              <p className="text-muted-foreground">
                Have a question or need help? We're here for you.
              </p>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <a 
                  href={`mailto:${contactEmail}`} 
                  className="text-primary hover:underline font-medium"
                >
                  {contactEmail}
                </a>
              </div>
              <p className="text-sm text-muted-foreground">
                We typically respond within 24-48 hours.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Quick Links */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Quick Links
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link 
                to="/privacy" 
                className="bg-muted/50 rounded-lg p-4 hover:bg-muted transition-colors"
              >
                <h3 className="font-medium text-foreground">Privacy Policy</h3>
                <p className="text-sm text-muted-foreground">
                  Learn how we protect your data
                </p>
              </Link>
              <Link 
                to="/changelog" 
                className="bg-muted/50 rounded-lg p-4 hover:bg-muted transition-colors"
              >
                <h3 className="font-medium text-foreground">Changelog</h3>
                <p className="text-sm text-muted-foreground">
                  See what's new in the latest version
                </p>
              </Link>
            </div>
          </section>

          {/* App Info */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">App Information</h2>
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">App Name</span>
                <span className="text-foreground font-medium">{appName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Version</span>
                <span className="text-foreground font-medium">1.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Developer</span>
                <span className="text-foreground font-medium">{companyName}</span>
              </div>
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

export default Support;
