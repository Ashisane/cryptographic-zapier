import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BrainCircuitIcon,
  MailIcon,
  TableIcon,
  WebhookIcon,
  ArrowRightIcon,
  ZapIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Mini-Zapier | Workflow Automation",
  description:
    "A minimal Zapier-like automation app. Create workflows with Triggers, OpenAI, Email, and Google Sheets nodes.",
};

const features = [
  {
    icon: WebhookIcon,
    title: "Webhook Triggers",
    description: "Start workflows with HTTP POST requests to your unique webhook URL",
  },
  {
    icon: BrainCircuitIcon,
    title: "OpenAI Integration",
    description: "Process data with GPT-4o-mini or other OpenAI models",
  },
  {
    icon: MailIcon,
    title: "Email Notifications",
    description: "Send emails via SMTP with variable interpolation",
  },
  {
    icon: TableIcon,
    title: "Google Sheets",
    description: "Append data to spreadsheets automatically",
  },
];

const Home = () => (
  <div className="min-h-screen bg-gradient-to-b from-background to-muted">
    {/* Hero Section */}
    <div className="container mx-auto px-4 pt-20 pb-16">
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
          <ZapIcon className="h-4 w-4" />
          <span className="text-sm font-medium">Hackathon-Grade Automation</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Mini-Zapier
          <span className="text-primary"> Workflow Automation</span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Create simple automation workflows with just 4 nodes: Webhook Triggers, 
          OpenAI, Email, and Google Sheets. No complexity, just results.
        </p>
        
        <div className="flex items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/auth/sign-up">
              Get Started Free
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/auth/login">
              Sign In
            </Link>
          </Button>
        </div>
      </div>
    </div>

    {/* Features Grid */}
    <div className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="p-6 rounded-xl border bg-card hover:border-primary transition-colors"
          >
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <feature.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
            <p className="text-muted-foreground text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>

    {/* How It Works */}
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
      
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="font-semibold mb-2">Create a Workflow</h3>
            <p className="text-muted-foreground text-sm">
              Add nodes to your canvas and connect them to define your automation flow
            </p>
          </div>
          
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="font-semibold mb-2">Configure Each Node</h3>
            <p className="text-muted-foreground text-sm">
              Set up prompts, email templates, and spreadsheet targets with variable interpolation
            </p>
          </div>
          
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="font-semibold mb-2">Trigger via Webhook</h3>
            <p className="text-muted-foreground text-sm">
              POST JSON to your webhook URL and watch your workflow execute end-to-end
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* CTA Section */}
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center p-8 rounded-2xl bg-primary/5 border">
        <h2 className="text-2xl font-bold mb-4">Ready to Automate?</h2>
        <p className="text-muted-foreground mb-6">
          Start building your first workflow in minutes. No credit card required.
        </p>
        <Button asChild size="lg">
          <Link href="/auth/sign-up">
            Create Your First Workflow
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>

    {/* Footer */}
    <footer className="border-t py-8">
      <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
        <p>Mini-Zapier - A hackathon-grade automation platform</p>
      </div>
    </footer>
  </div>
);

export default Home;
