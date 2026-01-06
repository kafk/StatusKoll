import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CalendarCheck, 
  Users, 
  DollarSign, 
  BarChart3, 
  CheckCircle2, 
  Smartphone,
  Home,
  Sparkles
} from "lucide-react";

const Landing = () => {
  const features = [
    {
      icon: CalendarCheck,
      title: "Booking Overview",
      description: "See all your bookings at a glance. Never miss a check-in or check-out again."
    },
    {
      icon: Users,
      title: "Guest Management",
      description: "Keep track of your guests, their contact info, and booking history."
    },
    {
      icon: CheckCircle2,
      title: "Status Tracking",
      description: "Track check-in, payment, and cleaning status for every booking."
    },
    {
      icon: DollarSign,
      title: "Economy Overview",
      description: "Monitor your income and expenses. See your finances clearly."
    },
    {
      icon: BarChart3,
      title: "Statistics",
      description: "Get insights into your business with detailed reports and charts."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Invite team members and cleaners to help manage your properties."
    }
  ];

  const perfectFor = [
    "Cabin rentals",
    "Short-term rentals",
    "Airbnb hosts",
    "Bed & Breakfast",
    "Vacation properties",
    "Holiday homes"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="relative max-w-6xl mx-auto px-4 py-20 sm:py-32">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              Rental & Booking Management
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight">
              StatusKoll
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
              The simple way to manage your rentals and bookings. 
              Keep track of guests, payments, and cleaning — all in one app.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                className="gap-2 text-lg px-8 py-6"
                onClick={() => window.open('https://apps.apple.com/app/statuskoll', '_blank')}
              >
                <Smartphone className="h-5 w-5" />
                Download on App Store
              </Button>
            </div>

            {/* App Preview Mockup */}
            <div className="pt-12">
              <div className="relative mx-auto max-w-sm">
                <div className="bg-card rounded-[3rem] p-3 shadow-2xl border border-border">
                  <div className="bg-muted rounded-[2.5rem] aspect-[9/19] flex items-center justify-center">
                    <div className="text-center space-y-4 p-8">
                      <Home className="h-16 w-16 mx-auto text-primary" />
                      <p className="text-muted-foreground text-sm">
                        App screenshot preview
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything you need
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              StatusKoll gives you all the tools to manage your rental business efficiently.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Perfect For Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Perfect for
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {perfectFor.map((item, index) => (
              <div 
                key={index}
                className="px-6 py-3 rounded-full bg-accent/50 text-accent-foreground font-medium"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Start managing your rentals today
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Simple, fast, and reliable – exactly how booking management should be.
          </p>
          <Button 
            size="lg" 
            className="gap-2 text-lg px-8 py-6"
            onClick={() => window.open('https://apps.apple.com/app/statuskoll', '_blank')}
          >
            <Smartphone className="h-5 w-5" />
            Download on App Store
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-lg text-foreground">StatusKoll</h3>
              <p className="text-sm text-muted-foreground">© 2025 Gota Innovation</p>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="/support" className="text-muted-foreground hover:text-foreground transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
