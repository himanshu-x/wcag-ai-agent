import { fixMissingAlt } from "./fixes/fixMissingAlt";
import { fixMissingLabel } from "./fixes/fixMissingLabel";
import { fixClickableDiv } from "./fixes/fixClickableDiv";
import { fixEmptyButton } from "./fixes/fixEmptyButton";

export function autoFixCode(code: string) {

  function removeComments(code: string) {

    return code

      // Remove JSX comments
      .replace(
        /{\s*\/\*[\s\S]*?\*\/\s*}/g,
        ""
      )

      // Remove single-line comments
      .replace(/\/\/.*/g, "")

      // Remove multi-line comments
      .replace(
        /\/\*[\s\S]*?\*\//g,
        ""
      )

      // Remove extra empty lines
      .replace(/\n\s*\n\s*\n/g, "\n\n")

      // Trim file
      .trim();
  }

  let fixedCode = code;

  fixedCode = fixMissingAlt(fixedCode);
  fixedCode = fixMissingLabel(fixedCode);
  fixedCode = fixClickableDiv(fixedCode);
  fixedCode = fixEmptyButton(fixedCode);  

  return removeComments(fixedCode);
}