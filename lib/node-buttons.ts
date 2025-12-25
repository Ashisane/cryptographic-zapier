import {
  BrainCircuitIcon,
  GlobeIcon,
  GitBranchIcon,
  MailIcon,
  MailOpenIcon,
  TableIcon,
  WebhookIcon,
  WrenchIcon,
} from "lucide-react";

export const nodeButtons = [
  {
    id: "trigger",
    label: "Trigger (Webhook)",
    icon: WebhookIcon,
  },
  {
    id: "openai",
    label: "OpenAI Chat",
    icon: BrainCircuitIcon,
    data: {
      model: "gpt-4o-mini",
    },
  },
  {
    id: "gmail",
    label: "Gmail",
    icon: MailOpenIcon,
    data: {
      operation: "gmail.send",
    },
  },
  {
    id: "googleSheets",
    label: "Google Sheets",
    icon: TableIcon,
    data: {
      operation: "sheets.appendRow",
    },
  },
  {
    id: "httpRequest",
    label: "HTTP Request",
    icon: GlobeIcon,
    data: {
      method: "GET",
    },
  },
  {
    id: "transform",
    label: "Transform",
    icon: WrenchIcon,
    data: {
      operation: "transform.jsonParse",
    },
  },
  {
    id: "flow",
    label: "Flow Control",
    icon: GitBranchIcon,
    data: {
      mode: "iterator",
    },
  },
  {
    id: "email",
    label: "Email (Resend)",
    icon: MailIcon,
  },
];
