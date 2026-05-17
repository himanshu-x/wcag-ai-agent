import { WCAGIssue } from "../types";
import { Severity } from "../constants/severity";

const interactiveTags = [
  "button",
  "a",
  "input",
  "select",
  "textarea",
];

export function checkAriaHiddenInteractive(
  node: any
): WCAGIssue[] {

  const issues: WCAGIssue[] = [];

  if (
    node.name?.type ===
    "JSXIdentifier"
  ) {

    const tag =
      node.name.name;

    if (
      interactiveTags.includes(tag)
    ) {

      const hasAriaHidden =
        node.attributes.some(
          (attr: any) =>
            attr.name?.name ===
              "aria-hidden" &&
            attr.value?.value ===
              "true"
        );

      if (hasAriaHidden) {
        issues.push({
          rule:
            "aria-hidden-interactive",

          severity:
            Severity.CRITICAL,

          line:
            node.loc?.start.line,

          message:
            "Interactive element should not be aria-hidden",
        });
      }
    }
  }

  return issues;
}