export function fixClickableDiv(code: string) {
  return code.replace(
    /<div([^>]*?)onClick=/g,
    '<button$1onClick='
  ).replace(/<\/div>/g, "</button>");
}