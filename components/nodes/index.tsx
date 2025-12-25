import { DropNode } from "./drop";
import { EmailNode } from "./email";
import { FlowNode } from "./flow";
import { GmailNode } from "./gmail";
import { GoogleSheetsNode } from "./google-sheets";
import { HttpRequestNode } from "./http-request";
import { OpenAINode } from "./openai";
import { TransformNode } from "./transform";
import { TriggerNode } from "./trigger";

export const nodeTypes = {
  trigger: TriggerNode,
  email: EmailNode,
  gmail: GmailNode,
  openai: OpenAINode,
  googleSheets: GoogleSheetsNode,
  httpRequest: HttpRequestNode,
  transform: TransformNode,
  flow: FlowNode,
  drop: DropNode,
};
