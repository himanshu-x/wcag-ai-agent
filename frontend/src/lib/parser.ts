import { parse } from "@babel/parser";
import traverse from "@babel/traverse";

import { checkMissingLabel } from "./rules/missingLabel";
import { checkMissingAlt } from "./rules/missingAlt";
import { checkClickableDiv } from "./rules/clickableDiv";
import { checkEmptyButton } from "./rules/emptyButton";
import { checkGenericLink } from "./rules/genericLink";
import { checkKeyboardTrap } from "./rules/keyboardTrap";
import { checkAriaHiddenInteractive } from "./rules/ariaHiddenInteractive";
import { checkMissingTableHeaders } from "./rules/missingTableHeaders";
import { checkMissingFocus } from "./rules/missingFocus";

import { WCAGIssue } from "./types";

export function scanWCAG(code: string) {
  const issues: WCAGIssue[] = [];

  const ast = parse(code, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  traverse(ast, {
    JSXOpeningElement(path) {
      const node = path.node;

      issues.push(...checkMissingLabel(node));
      issues.push(...checkMissingAlt(node));
      issues.push(...checkClickableDiv(node));
      issues.push(...checkAriaHiddenInteractive(node));
      issues.push(...checkMissingFocus(node));
    },

    JSXElement(path) {
      issues.push(...checkEmptyButton(path));
      issues.push(...checkGenericLink(path));
      issues.push(...checkKeyboardTrap(path));
      issues.push(...checkMissingTableHeaders(path));
    },
  });

  return issues;
}