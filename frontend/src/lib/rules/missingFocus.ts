import { WCAGIssue } from "../types";
import { Severity } from "../constants/severity";

export function checkMissingFocus(
  node: any
): WCAGIssue[] {

  const issues: WCAGIssue[] = [];

  if (
    !node ||
    !node.attributes
  ) {
    return issues;
  }

  const styleAttr =
    node.attributes.find(
      (attr: any) =>
        attr.type ===
          "JSXAttribute" &&
        attr.name?.name ===
          "style"
    );

  if (!styleAttr) {
    return issues;
  }

  const styleString =
    JSON.stringify(styleAttr);

  if (
    styleString.includes(
      "outline"
    ) &&
    styleString.includes("none")
  ) {
    issues.push({
      rule: "missing-focus",

      severity:
        Severity.SERIOUS,

      line:
        node.loc?.start.line,

      message:
        "Focus outline removed",
    });
  }

  return issues;
}