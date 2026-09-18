"""
压缩 p9 的 PDF
原因: 8 页里有 2 张 5940x8400 (50MP) 的 FlateDecode 大图, 占了 50MB
策略: 渐进降采样大图 (1800 -> 1400 -> 1100), 目标 <= 10MB
实现: 手动 zlib 解压 + PIL frombytes (FlateDecode raw pixels)
"""
import os
import sys
import io
import time
import zlib
import shutil
import pikepdf
from PIL import Image

INPUT = 'public/documents/projects/p9/ip-design.pdf'
BACKUP = 'public/documents/projects/p9/ip-design.original.pdf'
TARGET_MB = 10


def fmt(b):
    return f"{b / 1024 / 1024:.2f}MB"


def decode_image(xobj, w, h):
    """解码 PDF 图像为 PIL Image, 支持 DCTDecode (JPEG) 和 FlateDecode (raw)."""
    filt = xobj.get('/Filter')
    filt_str = str(filt) if filt else 'None'

    # 拿 raw bytes
    raw = xobj.read_raw_bytes()

    if 'DCTDecode' in filt_str:
        # JPEG - PIL 直接吃
        pil = Image.open(io.BytesIO(raw))
        pil.load()
        return pil

    if 'FlateDecode' in filt_str:
        # Raw pixels + zlib
        try:
            data = zlib.decompress(raw)
        except zlib.error as e:
            raise RuntimeError(f"zlib decompress failed: {e}")

        cs = xobj.get('/ColorSpace', pikepdf.Name('/DeviceGray'))
        cs_str = str(cs) if cs else 'DeviceGray'
        bpc = xobj.get('/BitsPerComponent', 8)

        if 'DeviceRGB' in cs_str and bpc == 8:
            mode = 'RGB'
            channels = 3
        elif 'DeviceGray' in cs_str and bpc == 8:
            mode = 'L'
            channels = 1
        elif 'DeviceCMYK' in cs_str and bpc == 8:
            mode = 'CMYK'
            channels = 4
        else:
            raise RuntimeError(f"unsupported cs={cs_str} bpc={bpc}")

        row_bytes = w * channels
        # PDF 每行 padding 到 4 字节边界
        padded = (row_bytes + 3) // 4 * 4
        expected = padded * h

        if len(data) < expected:
            # 不带 padding 试试
            if len(data) >= row_bytes * h:
                data = data[:row_bytes * h]
                return Image.frombytes(mode, (w, h), data)
            raise RuntimeError(f"data short: got {len(data)} need {expected} (padded) or {row_bytes*h} (raw)")

        # 去掉每行 padding
        if padded == row_bytes:
            img_data = data
        else:
            img_data = bytes().join(data[i*padded:i*padded+row_bytes] for i in range(h))

        return Image.frombytes(mode, (w, h), img_data)

    raise RuntimeError(f"unsupported filter: {filt_str}")


def downsample_images(src, dst, max_dim=1800, jpeg_quality=82):
    n_changed = 0
    with pikepdf.open(src) as pdf:
        for page_num, page in enumerate(pdf.pages):
            if '/Resources' not in page.obj:
                continue
            resources = page.obj['/Resources']
            if '/XObject' not in resources:
                continue
            for name, xobj in list(resources['/XObject'].items()):
                if xobj.get('/Subtype') != '/Image':
                    continue
                w = xobj.get('/Width')
                h = xobj.get('/Height')
                if not w or not h or max(w, h) <= max_dim:
                    continue

                try:
                    pil = decode_image(xobj, w, h)
                except Exception as e:
                    print(f"    p{page_num+1} {name}: decode FAILED ({e})")
                    continue

                orig_size = (pil.width, pil.height)
                scale = max_dim / max(pil.width, pil.height)
                new_w, new_h = int(pil.width * scale), int(pil.height * scale)
                pil = pil.resize((new_w, new_h), Image.LANCZOS)

                if pil.mode != 'RGB':
                    pil = pil.convert('RGB')
                buf = io.BytesIO()
                pil.save(buf, format='JPEG', quality=jpeg_quality, optimize=True)
                new_bytes = buf.getvalue()
                pil.close()

                new_stream = pikepdf.Stream(pdf, new_bytes)
                new_stream.Type = pikepdf.Name('/XObject')
                new_stream.Subtype = pikepdf.Name('/Image')
                new_stream.Width = new_w
                new_stream.Height = new_h
                new_stream.ColorSpace = pikepdf.Name('/DeviceRGB')
                new_stream.BitsPerComponent = 8
                new_stream.Filter = pikepdf.Name('/DCTDecode')
                resources['/XObject'][name] = new_stream

                n_changed += 1
                print(f"    p{page_num+1} {name}: {orig_size[0]}x{orig_size[1]} -> {new_w}x{new_h}")

        if n_changed == 0:
            print(f"    (no images > {max_dim}px found)")

        pdf.save(dst, compress_streams=True, normalize_content=True)
        return n_changed


def replace_with_retry(tmp, target, retries=5, delay=0.5):
    for i in range(retries):
        try:
            if os.path.exists(target):
                os.remove(target)
            shutil.move(tmp, target)
            return True
        except PermissionError as e:
            if i < retries - 1:
                time.sleep(delay)
            else:
                print(f"    [ERR] {e}")
                return False


def main():
    if not os.path.exists(INPUT):
        print(f"[ERR] 找不到 {INPUT}")
        sys.exit(1)

    orig_size = os.path.getsize(INPUT)
    print(f"原 PDF: {fmt(orig_size)}\n")

    if not os.path.exists(BACKUP):
        shutil.copy2(INPUT, BACKUP)
        print(f"[OK] 备份 -> {BACKUP}\n")

    tmp = INPUT + '.tmp'
    if os.path.exists(tmp):
        os.remove(tmp)

    target_bytes = TARGET_MB * 1024 * 1024

    for max_dim in [1800, 1400, 1100]:
        print(f"[降采样 max {max_dim}px]")
        n = downsample_images(INPUT, tmp, max_dim=max_dim)
        time.sleep(0.3)
        if not os.path.exists(tmp):
            print("    [ERR] tmp 未生成")
            sys.exit(1)
        sz = os.path.getsize(tmp)
        print(f"  changed={n}  -> {fmt(sz)}\n")
        if not replace_with_retry(tmp, INPUT):
            print(f"[ERR] 替换失败, 留 {tmp} 给你")
            sys.exit(1)
        if sz <= target_bytes:
            ratio = (1 - sz / orig_size) * 100
            print(f"[OK] 已达标: {fmt(orig_size)} -> {fmt(sz)} (-{ratio:.1f}%)")
            return

    final = os.path.getsize(INPUT)
    ratio = (1 - final / orig_size) * 100
    print(f"[DONE] {fmt(orig_size)} -> {fmt(final)} (-{ratio:.1f}%)")
    if final > target_bytes:
        print(f"[WARN] 仍 > {TARGET_MB}MB")


if __name__ == '__main__':
    main()

