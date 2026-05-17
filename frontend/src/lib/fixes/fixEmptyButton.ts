export function fixEmptyButton(
  code: string
) {

  return code.replace(
    /<button>\s*<\/button>/g,

    '<button aria-label="Button"></button>'
  );
}