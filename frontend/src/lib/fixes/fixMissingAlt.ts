export function fixMissingAlt(code: string) {
  return code.replace(
    /<img([^>]*?)\/>/g,
    '<img$1 alt="Image description" />'
  );
}