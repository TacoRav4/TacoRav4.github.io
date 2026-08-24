import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const serverEntry = path.join(root, ".static-ssr", "entry-server.js");
const manifestPath = path.join(dist, ".vite", "manifest.json");

const [{ renderPage, staticRoutes }, manifestText] = await Promise.all([
  import(pathToFileURL(serverEntry)),
  readFile(manifestPath, "utf8"),
]);

const manifest = JSON.parse(manifestText);
const clientEntry = Object.values(manifest).find((entry) => entry.isEntry);

if (!clientEntry) {
  throw new Error("Vite client entry missing from build manifest");
}

const rawBasePath = process.env.SITE_BASE_PATH ?? "/";
const basePath =
  rawBasePath === "/"
    ? "/"
    : `/${rawBasePath.replace(/^\/+|\/+$/g, "")}/`;
const assetUrl = (asset) => `${basePath}${asset.replace(/^\/+/, "")}`;
const fontPreloads = [
  "fonts/ibm-plex-sans/IBMPlexSans-Regular.woff2",
  "fonts/ibm-plex-sans/IBMPlexSans-SemiBold.woff2",
  "fonts/ibm-plex-sans/IBMPlexSans-Bold.woff2",
]
  .map(
    (file) =>
      `<link rel="preload" href="${assetUrl(file)}" as="font" type="font/woff2" crossorigin />`,
  )
  .join("\n    ");

for (const route of staticRoutes) {
  const rendered = renderPage(route.pathname);
  const styles = (clientEntry.css ?? [])
    .map((file) => `<link rel="stylesheet" href="${assetUrl(file)}" />`)
    .join("\n    ");
  const document = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${rendered.description}" />
    <title>${rendered.title}</title>
    ${fontPreloads}
    ${styles}
    <script type="module" src="${assetUrl(clientEntry.file)}"></script>
  </head>
  <body>
    <div id="root">${rendered.html}</div>
  </body>
</html>
`;
  const outputDirectory =
    route.pathname === "/"
      ? dist
      : path.join(dist, route.pathname.replace(/^\/+|\/+$/g, ""));
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(path.join(outputDirectory, "index.html"), document);
}

await rm(path.join(root, ".static-ssr"), { recursive: true, force: true });
