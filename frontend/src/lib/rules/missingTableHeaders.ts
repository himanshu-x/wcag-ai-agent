import { WCAGIssue } from "../types";
import { Severity } from "../constants/severity";

export function checkMissingTableHeaders(
  path: any
): WCAGIssue[] {

  const issues: WCAGIssue[] = [];

  const node = path.node;

  if (
    node.openingElement?.name?.name ===
    "table"
  ) {

    const tableString =
      JSON.stringify(node);

    const hasTd =
      tableString.includes(
        '"name":"td"'
      );

    const hasTh =
      tableString.includes(
        '"name":"th"'
      );

    if (hasTd && !hasTh) {
      issues.push({
        rule:
          "missing-table-headers",

        severity:
          Severity.SERIOUS,

        line:
          node.loc?.start.line,

        message:
          "Table missing header cells",
      });
    }
  }

  return issues;
}