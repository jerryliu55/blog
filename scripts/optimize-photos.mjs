import sharp from "sharp";
import fs from "fs";
import path from "path";

const INPUT_DIR = "public/photos";
const OUTPUT_DIR = "public/photos/optimized";
const MAX_WIDTH = 1200;
const QUALITY = 80;

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const files = fs
  .readdirSync(INPUT_DIR)
  .filter((f) => /\.(jpe?g|png)$/i.test(f));

console.log(`Found ${files.length} images to optimize\n`);

for (const file of files) {
  const inputPath = path.join(INPUT_DIR, file);
  const outputName = path.parse(file).name + ".webp";
  const outputPath = path.join(OUTPUT_DIR, outputName);

  // Skip if already optimized and newer than source
  if (fs.existsSync(outputPath)) {
    const srcStat = fs.statSync(inputPath);
    const outStat = fs.statSync(outputPath);
    if (outStat.mtimeMs > srcStat.mtimeMs) {
      console.log(`⏭ ${file} (already optimized)`);
      continue;
    }
  }

  const srcSize = fs.statSync(inputPath).size;
  await sharp(inputPath)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(outputPath);

  const outSize = fs.statSync(outputPath).size;
  const savings = ((1 - outSize / srcSize) * 100).toFixed(1);
  console.log(
    `✓ ${file} → ${outputName}  ${(srcSize / 1e6).toFixed(1)}MB → ${(outSize / 1e3).toFixed(0)}KB  (${savings}% smaller)`,
  );
}

console.log("\nDone!");
