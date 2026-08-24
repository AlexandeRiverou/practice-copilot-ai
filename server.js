const { createServer } = require("node:http");
const { readFile } = require("node:fs/promises");
const { extname, join, normalize } = require("node:path");

const root = __dirname;
const port = process.env.PORT || 3000;
const contentTypes = {
  ".css": "text/css",
  ".html": "text/html",
  ".js": "text/javascript",
};

const server = createServer(async (request, response) => {
  const requestedPath = request.url === "/" ? "/index.html" : request.url;
  const filePath = normalize(join(root, requestedPath));

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const file = await readFile(filePath);
    response.writeHead(200, {
      "Content-Type": contentTypes[extname(filePath)] || "application/octet-stream",
    });
    response.end(file);
  } catch (error) {
    if (error.code === "ENOENT") {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(500);
    response.end("Internal server error");
  }
});

server.listen(port, () => {
  console.log(`Christmas countdown running at http://localhost:${port}`);
});
