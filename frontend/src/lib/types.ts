import { Severity } from "./constants/severity";

export interface WCAGIssue {
  rule: string;
  severity: Severity;
  line?: number;
  message: string;
  originalSnippet?: string;
  fixedSnippet?: string;
}