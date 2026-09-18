// 压缩 p6/p13 两个大视频（默认 H.264 + AAC），输出到 .min.mp4（不覆盖原文件）
// 策略：先尝试 CRF=26（接近原画质）；超过 50MB 升到 28；超过 70MB 升到 30 + 限宽 1280
// 用法: node scripts/compress-videos.js
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const ffmpegPath = require('ffmpeg-static');

const TARGETS = [
  { input: 'public/videos/projects/p6-susheng.mp4',  target: 50 }, // MB
  { input: 'public/videos/projects/p12-aodian.mp4',  target: 50 }, // ← v0.4 后补（部署 100MB 限制）
  { input: 'public/videos/projects/p13-dinoai.mp4', target: 50 },
];

const MB = 1024 * 1024;
const MAX_WIDTH = 1920;          // 大于此宽才缩
const FALLBACK_WIDTH = 1280;     // 极端情况缩到此宽
const CRFS = [26, 28, 30];       // 渐进升 CRF
const AUDIO_BITRATE = '128k';

function fmtMB(b) {
  return (b / MB).toFixed(2) + 'MB';
}

function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(ffmpegPath, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stderr = '';
    child.stderr.on('data', (d) => (stderr += d.toString()));
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve(stderr);
      else reject(new Error(`ffmpeg exit ${code}\n${stderr.split('\n').slice(-5).join('\n')}`));
    });
  });
}

async function probe(input) {
  // 用 ffmpeg -i input -f null - 读取 metadata（比 ffprobe 简单，不依赖额外二进制）
  const out = await runFfmpeg(['-i', input, '-hide_banner', '-f', 'null', '-']);
  const lines = out.split('\n');
  const dur = lines.find((l) => /Duration:/.test(l))?.match(/Duration:\s*(\d+):(\d+):([\d.]+)/);
  const stream = lines.find((l) => /Video:/.test(l))?.match(/(\d{2,5})x(\d{2,5})/);
  return {
    durationSec: dur ? +dur[1] * 3600 + +dur[2] * 60 + +dur[3] : 0,
    width: stream ? +stream[1] : 0,
    height: stream ? +stream[2] : 0,
  };
}

async function compressOne({ input, target }) {
  const filename = path.basename(input, '.mp4');
  const dir = path.dirname(input);
  const output = path.join(dir, `${filename}.min.mp4`);

  const originalSize = fs.statSync(input).size;
  const meta = await probe(input);
  console.log(
    `\n→ ${path.basename(input)}  [${meta.width}×${meta.height}, ${(meta.durationSec / 60).toFixed(1)}min]  ${fmtMB(originalSize)}`
  );

  let best = null;

  for (const crf of CRFS) {
    const widths = [Math.min(meta.width || MAX_WIDTH, MAX_WIDTH)];
    if (meta.width > FALLBACK_WIDTH) widths.push(FALLBACK_WIDTH);

    for (const width of widths) {
      const tmp = output + `.crf${crf}.w${width}.mp4`;
      const args = [
        '-y',
        '-i', input,
        '-c:v', 'libx264',
        '-preset', 'slow',
        '-crf', String(crf),
        '-pix_fmt', 'yuv420p',
        '-vf', `scale=${width}:-2`,
        '-c:a', 'aac',
        '-b:a', AUDIO_BITRATE,
        '-movflags', '+faststart',
        '-threads', '0',
        tmp,
      ];

      console.log(`  try crf=${crf}, w=${width} ...`);
      try {
        await runFfmpeg(args);
        const size = fs.statSync(tmp).size;
        console.log(`    → ${fmtMB(size)}`);

        if (!best || size < best.size) {
          if (best) fs.unlinkSync(best.path);
          best = { path: tmp, size, crf, width };
        } else {
          fs.unlinkSync(tmp);
        }

        if (size <= target * MB) {
          console.log(`  ✓ 达标（≤ ${target}MB），停止尝试`);
          break;
        }
      } catch (e) {
        console.log(`    ✗ ${e.message.split('\n')[0]}`);
      }
    }

    if (best && best.size <= target * MB) break;
  }

  if (!best) throw new Error('所有尝试都失败了');

  // 重命名为最终 .min.mp4
  if (best.path !== output) fs.renameSync(best.path, output);

  const ratio = ((1 - best.size / originalSize) * 100).toFixed(1);
  const ok = best.size <= target * MB ? '✓' : '⚠';
  console.log(
    `${ok} ${path.basename(input)} → ${path.basename(output)}  ` +
      `${fmtMB(originalSize)} → ${fmtMB(best.size)}  (-${ratio}%, crf=${best.crf}, w=${best.width})`
  );

  return { input, output, originalSize, newSize: best.size, crf: best.crf, width: best.width };
}

(async () => {
  console.log('开始压缩 p6 / p13 视频 → H.264 + AAC, 目标 ≤ 50MB\n');
  console.log(`ffmpeg: ${ffmpegPath}\n`);

  const results = [];
  for (const t of TARGETS) {
    try {
      results.push(await compressOne(t));
    } catch (e) {
      console.error(`✗ ${t.input}: ${e.message}`);
    }
  }

  if (results.length) {
    console.log('\n========== 总结 ==========');
    let totalOrig = 0, totalNew = 0;
    for (const r of results) {
      totalOrig += r.originalSize;
      totalNew += r.newSize;
      console.log(`${r.input}  →  ${r.output}  (crf=${r.crf}, w=${r.width})`);
    }
    console.log(`\n合计: ${fmtMB(totalOrig)} → ${fmtMB(totalNew)}  (-${((1 - totalNew / totalOrig) * 100).toFixed(1)}%)`);
    console.log('\n⚠ 原文件未删除。检查 .min.mp4 满意后手动替换：');
    console.log('   1. 备份原文件到 .bak');
    console.log('   2. mv .min.mp4 为原文件名');
    console.log('   3. 删除 .bak');
  }
  console.log('\n完成。');
})();