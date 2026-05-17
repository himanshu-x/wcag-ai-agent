import { WCAGIssue } from "../types";
import { Severity } from "../constants/severity";

const genericTexts = [
  "click here",
  "read more",
  "learn more",
  "here",
  "link",
];

export function checkGenericLink(
  path: any
): WCAGIssue[] {

  const issues: WCAGIssue[] = [];

  const node = path.node;

  if (
    node.openingElement?.name?.name === "a"
  ) {

    const children = node.children || [];

    const text = children
      .map((child: any) =>
        child.value || ""
      )
      .join("")
      .trim()
      .toLowerCase();

    if (
      genericTexts.includes(text)
    ) {
      issues.push({
        rule: "generic-link",
        severity: Severity.SERIOUS,
        line:
          node.loc?.start.line,
        message:
          "Generic link text is not accessible",
      });
    }
  }

  return issues;
}