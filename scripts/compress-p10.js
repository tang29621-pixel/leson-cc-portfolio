// 压缩 p10 的 4 张巨图，每张 < 5MB，输出 webp 到同目录
// 用法: node scripts/compress-p10.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const TARGETS = [
  'public/images/projects/p10/x2展板2.png',
  'public/images/projects/p10/x2展板3.png',
  'public/images/projects/p10/皮影海报4.png',
  'public/images/projects/p10/皮影海报5.png',
  'public/images/projects/p10/皮影海报6.png',
];

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const OUTPUT_DIR = 'public/images/projects/p10';

function fmtMB(b) {
  return (b / 1024 / 1024).toFixed(2) + 'MB';
}

async function compressOne(inputPath) {
  const filename = path.basename(inputPath, '.png');
  const outputPath = path.join(OUTPUT_DIR, `${filename}.webp`);
  const originalSize = fs.statSync(inputPath).size;

  const meta = await sharp(inputPath).metadata();
  const origDim = `${meta.width}×${meta.height}`;

  // 第一次尝试: 宽 2400, webp q=82
  let buffer = await sharp(inputPath)
    .resize({ width: 2400, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();

  let quality = 82;
  let widthUsed = 2400;

  // 渐进降质量
  while (buffer.length > MAX_SIZE && quality > 40) {
    quality -= 8;
    buffer = await sharp(inputPath)
      .resize({ width: widthUsed, withoutEnlargement: true })
      .webp({ quality })
      .toBuffer();
  }

  // 还是太大 → 缩到 1600
  if (buffer.length > MAX_SIZE) {
    widthUsed = 1600;
    quality = 70;
    buffer = await sharp(inputPath)
      .resize({ width: 1600 })
      .webp({ quality: 70 })
      .toBuffer();
  }

  // 还大 → 缩到 1200
  if (buffer.length > MAX_SIZE) {
    widthUsed = 1200;
    quality = 60;
    buffer = await sharp(inputPath)
      .resize({ width: 1200 })
      .webp({ quality: 60 })
      .toBuffer();
  }

  fs.writeFileSync(outputPath, buffer);
  return {
    input: path.basename(inputPath),
    output: path.basename(outputPath),
    origDim,
    widthUsed,
    quality,
    originalSize,
    newSize: buffer.length,
  };
}

(async () => {
  console.log('开始压缩 p10 的 4 张图 → webp，目标 < 5MB\n');
  for (const t of TARGETS) {
    try {
      const r = await compressOne(t);
      const ratio = ((1 - r.newSize / r.originalSize) * 100).toFixed(1);
      const ok = r.newSize <= MAX_SIZE ? '✓' : '⚠';
      console.log(
        `${ok} ${r.input}  [${r.origDim}]  ${fmtMB(r.originalSize)} → ${fmtMB(r.newSize)}  ` +
          `(w=${r.widthUsed}, q=${r.quality}, -${ratio}%)`
      );
    } catch (e) {
      console.error(`✗ ${t}: ${e.message}`);
    }
  }
  console.log('\n完成。');
})();
