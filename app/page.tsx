import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import Home from "./(unauthenticated)/home/page";
import UnauthenticatedLayout from "./(unauthenticated)/layout";

export const metadata: Metadata = {
  title: "Workflow Automation | Mini-Zapier",
  description:
    "A minimal Zapier-like automation app. Create workflows with Triggers, OpenAI, Email, and Google Sheets nodes.",
};

const Index = async () => {
  const user = await currentUser();

  if (!user) {
    return (
      <UnauthenticatedLayout>
        <Home />
      </UnauthenticatedLayout>
    );
  }

  redirect("/workflows");
};

export default Index;
