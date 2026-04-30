import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function () {
  const photosDir = path.resolve(__dirname, "../content/photos");
  const files = fs.readdirSync(photosDir).filter((f) => f.endsWith(".yaml"));

  const photos = files.map((file) => {
    const content = fs.readFileSync(path.join(photosDir, file), "utf-8");
    return yaml.load(content);
  });

  photos.sort((a, b) => new Date(b.date) - new Date(a.date));
  return photos;
}
