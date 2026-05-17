export function fixMissingLabel(code: string) {
  return code.replace(
    /<input([^>]*?)\/>/g,
    '<input$1 aria-label="Input field" />'
  );
}