"""诊断 PDF 内部结构和图像情况"""
import os
import pikepdf

INPUT = 'public/documents/projects/p9/ip-design.pdf'

print(f"File: {INPUT}")
print(f"Size: {os.path.getsize(INPUT) / 1024 / 1024:.2f} MB\n")

with pikepdf.open(INPUT) as pdf:
    print(f"Pages: {len(pdf.pages)}")
    print(f"PDF version: {pdf.pdf_version}\n")

    # 统计每页的图像
    total_images = 0
    image_sizes = []
    for i, page in enumerate(pdf.pages):
        page_imgs = []
        if '/Resources' in page.obj and '/XObject' in page.obj['/Resources']:
            for name, xobj in page.obj['/Resources']['/XObject'].items():
                if xobj.get('/Subtype') == '/Image':
                    w = xobj.get('/Width', '?')
                    h = xobj.get('/Height', '?')
                    filter_ = xobj.get('/Filter', '?')
                    try:
                        size_bytes = len(xobj.read_raw_bytes())
                    except Exception:
                        size_bytes = 0
                    page_imgs.append((name, w, h, filter_, size_bytes))
                    total_images += 1
                    image_sizes.append(size_bytes)
        print(f"  Page {i+1}: {len(page_imgs)} image(s)")
        for n, w, h, f, s in page_imgs:
            print(f"    {n}: {w}x{h} filter={f} bytes={s/1024:.1f}KB")

    print(f"\nTotal images: {total_images}")
    if image_sizes:
        print(f"Image size total: {sum(image_sizes)/1024/1024:.2f} MB")
        print(f"Largest image: {max(image_sizes)/1024/1024:.2f} MB")

    # 看看 PDF 里最大的对象是什么
    print("\n--- Top 5 largest objects ---")
    objs = []
    for obj in pdf.objects:
        try:
            # 估算对象大小
            data = pikepdf.Pdf._get_object(obj, pikepdf.Name('/dummy'))
            # 简化: 跳过
        except Exception:
            pass

    # 直接遍历 image streams 找最大的
    image_streams = []
    for page in pdf.pages:
        if '/Resources' in page.obj and '/XObject' in page.obj['/Resources']:
            for xobj in page.obj['/Resources']['/XObject'].values():
                if xobj.get('/Subtype') == '/Image':
                    try:
                        data = xobj.read_raw_bytes()
                        image_streams.append((len(data), xobj.get('/Width'), xobj.get('/Height')))
                    except Exception:
                        pass

    image_streams.sort(reverse=True)
    for s, w, h in image_streams[:5]:
        print(f"  {s/1024/1024:.2f} MB  {w}x{h}")
