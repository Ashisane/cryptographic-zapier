import { sql } from "drizzle-orm";
import {
  boolean,
  json,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

const uuid = sql`uuid_generate_v4()`;

// ============================================================================
// Workflows
// ============================================================================

// Workflows table - stores the workflow definition as JSON
export const workflows = pgTable("workflow", {
  id: text("id").primaryKey().default(uuid).notNull(),
  name: varchar("name").notNull(),
  description: varchar("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at"),
  // Stores the React Flow nodes and edges
  content: json("content").$type<{
    nodes: Array<{
      id: string;
      type: string;
      position: { x: number; y: number };
      data: Record<string, unknown>;
    }>;
    edges: Array<{
      id: string;
      source: string;
      target: string;
    }>;
  }>(),
  userId: varchar("user_id").notNull(),
  // Whether the workflow is active/enabled
  enabled: boolean("enabled").notNull().default(true),
});

// Workflow executions log - stores execution history
export const workflowExecutions = pgTable("workflow_execution", {
  id: text("id").primaryKey().default(uuid).notNull(),
  workflowId: text("workflow_id").notNull(),
  userId: varchar("user_id").notNull(),
  status: varchar("status").notNull().default("pending"), // pending, running, completed, failed
  startedAt: timestamp("started_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
  // Input data from the trigger
  triggerInput: json("trigger_input"),
  // Final output or error
  result: json("result"),
  // Detailed step-by-step execution log
  executionLog: json("execution_log").$type<Array<{
    nodeId: string;
    nodeType: string;
    status: "success" | "error";
    input: unknown;
    output: unknown;
    error?: string;
    timestamp: string;
  }>>(),
});

// ============================================================================
// Credentials (for OAuth and API keys)
// ============================================================================

/**
 * Provider credential types
 */
type ProviderCredentials = 
  | { type: "oauth2"; accessToken: string; refreshToken: string; expiresAt: number; tokenType: string; scope: string[] }
  | { type: "api_key"; apiKey: string }
  | { type: "service_account"; clientEmail: string; privateKey: string; projectId: string };

/**
 * Stores credentials for providers (OAuth, API keys, etc.)
 * Note: In production, credentials should be encrypted at rest
 */
export const credentials = pgTable("credential", {
  id: text("id").primaryKey().default(uuid).notNull(),
  userId: varchar("user_id").notNull(),
  provider: varchar("provider").notNull(), // google, openai, email, etc.
  name: varchar("name").notNull(),
  credentials: json("credentials").$type<ProviderCredentials>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at"),
});

// ============================================================================
// User Profile
// ============================================================================

export const profile = pgTable("profile", {
  id: text("id").primaryKey().notNull(),
  customerId: text("customer_id"),
  subscriptionId: text("subscription_id"),
  productId: text("product_id"),
  onboardedAt: timestamp("onboarded_at"),
});

// ============================================================================
// Legacy Tables (keeping for migration)
// ============================================================================

// Legacy projects table - keeping for migration, will be removed
export const projects = pgTable("project", {
  id: text("id").primaryKey().default(uuid).notNull(),
  name: varchar("name").notNull(),
  transcriptionModel: varchar("transcription_model").notNull(),
  visionModel: varchar("vision_model").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at"),
  content: json("content"),
  userId: varchar("user_id").notNull(),
  image: varchar("image"),
  members: text("members").array(),
  welcomeProject: boolean("demo_project").notNull().default(false),
});
