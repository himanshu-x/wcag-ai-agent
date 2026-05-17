import { Severity } from "../constants/severity";
import { WCAGIssue } from "../types";

export function checkEmptyButton(
  path: any
): WCAGIssue[] {
  const issues: WCAGIssue[] = [];

  const opening = path.node.openingElement;

  if (
    opening.name.type === "JSXIdentifier" &&
    opening.name.name === "button"
  ) {
    const children = path.node.children.filter(
      (child: any) =>
        child.type === "JSXText" &&
        child.value.trim() !== ""
    );

    if (children.length === 0) {
      issues.push({
        rule: "empty-button",
        severity: Severity.CRITICAL,
        line: opening.loc?.start.line,
        message:
          "Button missing accessible text",
      });
    }
  }

  return issues;
}