export async function urlToFile(url: string, filename: string, mimeType: string) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const file = new File([buffer], filename, { type: mimeType });
  return file;
}
