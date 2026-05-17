import { Severity } from "../constants/severity";
import { WCAGIssue } from "../types";

export function checkClickableDiv(
  node: any
): WCAGIssue[] {
  const issues: WCAGIssue[] = [];

  if (
    node.name.type === "JSXIdentifier" &&
    node.name.name === "div"
  ) {
    const hasOnClick = node.attributes.some(
      (attr: any) =>
        attr.type === "JSXAttribute" &&
        attr.name?.name === "onClick"
    );

    if (hasOnClick) {
      issues.push({
        rule: "clickable-div",
        severity: Severity.SERIOUS,
        line: node.loc?.start.line,
        message:
          "Avoid clickable div. Use button instead.",
      });
    }
  }

  return issues;
}