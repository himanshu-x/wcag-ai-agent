import { WCAGIssue } from "../types";
import { Severity } from "../constants/severity";

export function checkKeyboardTrap(
  path: any
): WCAGIssue[] {

  const issues: WCAGIssue[] = [];

  const node = path.node;

  const attributes =
    node.openingElement?.attributes || [];

  const hasKeyDown =
    attributes.some(
      (attr: any) =>
        attr.name?.name ===
        "onKeyDown"
    );

  const hasPreventDefault =
    JSON.stringify(node).includes(
      "preventDefault"
    );

  if (
    hasKeyDown &&
    hasPreventDefault
  ) {
    issues.push({
      rule: "keyboard-trap",
      severity: Severity.CRITICAL,
      line:
        node.loc?.start.line,
      message:
        "Potential keyboard trap detected",
    });
  }

  return issues;
}