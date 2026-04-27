import { mkdir, copyFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const routes = ["flights/lisbon-weekend/index.html", "404.html"];

await Promise.all(
  routes.map(async (route) => {
    const target = join("dist", route);
    await mkdir(dirname(target), { recursive: true });
    await copyFile("dist/index.html", target);
  }),
);
