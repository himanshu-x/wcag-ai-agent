import { Severity } from "../constants/severity";
import { WCAGIssue } from "../types";

export function checkMissingAlt(
  node: any
): WCAGIssue[] {
  const issues: WCAGIssue[] = [];

  if (
    node.name.type === "JSXIdentifier" &&
    node.name.name === "img"
  ) {
    const hasAlt = node.attributes.some(
      (attr: any) =>
        attr.type === "JSXAttribute" &&
        attr.name?.name === "alt"
    );

    if (!hasAlt) {
      issues.push({
        rule: "missing-alt",
        severity: Severity.CRITICAL,
        line: node.loc?.start.line,
        message:
          "Image missing alt attribute",
      });
    }
  }

  return issues;
}