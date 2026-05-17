import { Severity } from "../constants/severity";
import { WCAGIssue } from "../types";

export function checkMissingLabel(
  node: any
): WCAGIssue[] {
  const issues: WCAGIssue[] = [];

  if (
    node.name.type === "JSXIdentifier" &&
    node.name.name === "input"
  ) {
    const hasAriaLabel = node.attributes.some(
      (attr: any) =>
        attr.type === "JSXAttribute" &&
        attr.name?.name === "aria-label"
    );

    if (!hasAriaLabel) {
      issues.push({
        rule: "missing-label",
        severity: Severity.CRITICAL,
        line: node.loc?.start.line,
        message:
          "Input field missing aria-label",
      });
    }
  }

  return issues;
}