import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUserProfile, currentUser } from "@/lib/auth";
import { database } from "@/lib/database";
import { workflows } from "@/schema";
import { CreateWorkflowButton } from "./create-workflow-button";

export const metadata: Metadata = {
  title: "My Workflows - Veriflow",
  description: "Manage your automation workflows",
};

const WorkflowsPage = async () => {
  const profile = await currentUserProfile();
  const user = await currentUser();

  if (!profile || !user) {
    return redirect("/auth/login");
  }

  if (!profile.onboardedAt) {
    return redirect("/welcome");
  }

  const userWorkflows = await database.query.workflows.findMany({
    where: eq(workflows.userId, user.id),
    orderBy: (workflows, { desc }) => [desc(workflows.createdAt)],
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Workflows</h1>
            <p className="text-muted-foreground mt-1">
              Create and manage your automation workflows
            </p>
          </div>
          <CreateWorkflowButton />
        </div>

        {userWorkflows.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <h2 className="text-xl font-semibold mb-2">No workflows yet</h2>
            <p className="text-muted-foreground mb-4">
              Create your first workflow to start automating
            </p>
            <CreateWorkflowButton />
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {userWorkflows.map((workflow) => (
              <Link
                key={workflow.id}
                href={`/workflows/${workflow.id}`}
                className="block p-6 rounded-lg border bg-card hover:border-primary transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{workflow.name}</h3>
                    {workflow.description && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {workflow.description}
                      </p>
                    )}
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                      workflow.enabled
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        workflow.enabled ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                    {workflow.enabled ? "Active" : "Disabled"}
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span>
                    Created {new Date(workflow.createdAt).toLocaleDateString()}
                  </span>
                  {workflow.updatedAt && (
                    <span>
                      Updated {new Date(workflow.updatedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowsPage;
