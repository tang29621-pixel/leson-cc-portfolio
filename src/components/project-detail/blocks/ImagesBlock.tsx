"use client";
// ImagesBlock · 图集（grid / masonry / single）+ 原生 <dialog> lightbox
//
// 不引入新依赖：
//   - grid: 2-3 列固定比例（适合横版产品图、剧照）
//   - masonry: 用 CSS columns 实现，无 JS 计算（适合混合尺寸）
//   - single: 单张图（多为竖版海报）· 居中显示 + max-h 640 / max-w 420
//   - lightbox: <dialog> + showModal()，原生 modal 行为
//
// 文件不存在时：图片直接 broken，但外层不影响 Modal 渲染

import Image from "next/image";
import { useRef } from "react";
import { Maximize2 } from "lucide-react";

type Item = { src: string; alt: string; caption?: string };

export function ImagesBlock({
  items,
  layout = "grid",
}: {
  items: Item[];
  layout?: "grid" | "masonry" | "single";
}) {
  return (
    <div>
      {layout === "single" ? (
        <SingleImage item={items[0]} />
      ) : layout === "masonry" ? (
        <MasonryImages items={items} />
      ) : (
        <GridImages items={items} />
      )}
    </div>
  );
}

function GridImages({ items }: { items: Item[] }) {
  // 自适应列：1 / 2 / 3 列（mobile / md / lg）
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      {items.map((item, i) => (
        <ImageCell key={i} item={item} aspect="aspect-[4/3]" />
      ))}
    </div>
  );
}

function SingleImage({ item }: { item: Item }) {
  // 单张图（多为竖版海报）· 居中显示 + 限制最大宽度 + 保留原始宽高比
  const dialogRef = useRef<HTMLDialogElement>(null);
  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <>
      <figure className="group flex flex-col items-center">
        <button
          type="button"
          onClick={open}
          aria-label={`放大查看：${item.alt}`}
          className="relative block overflow-hidden border border-line bg-surface1 cursor-zoom-in"
          // 限制最大高度 ~ 600px / 宽 ~ 360px（海报常见竖版比例）
          style={{ maxHeight: "640px", maxWidth: "420px", width: "auto" }}
        >
          <Image
            src={item.src}
            alt={item.alt}
            width={1080}
            height={1920}
            sizes="(max-width: 768px) 80vw, 420px"
            className="block h-auto max-h-[640px] w-auto max-w-[420px] object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-normal"
          />
          <span className="absolute top-2 right-2 w-7 h-7 inline-flex items-center justify-center bg-black/60 text-text opacity-0 group-hover:opacity-100 transition-opacity">
            <Maximize2 size={12} />
          </span>
        </button>
        {item.caption && (
          <figcaption className="mt-3 text-xs text-text-3 font-heading leading-relaxed text-center max-w-md">
            {item.caption}
          </figcaption>
        )}
      </figure>

      {/* 原生 lightbox */}
      <dialog
        ref={dialogRef}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        className="backdrop:bg-black/85 backdrop:backdrop-blur-md max-w-[92vw] max-h-[92vh] p-0 bg-transparent"
      >
        <div className="relative w-[92vw] h-[92vh] flex items-center justify-center">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="92vw"
            className="object-contain"
          />
          <button
            type="button"
            onClick={close}
            aria-label="关闭"
            className="absolute top-4 right-4 w-10 h-10 inline-flex items-center justify-center bg-black/70 border border-line text-text hover:border-accent hover:text-accent transition-colors"
          >
            ✕
          </button>
        </div>
      </dialog>
    </>
  );
}

function MasonryImages({ items }: { items: Item[] }) {
  // CSS columns：浏览器自动堆叠，无需 JS
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 md:gap-4">
      {items.map((item, i) => (
        <div key={i} className="break-inside-avoid mb-3 md:mb-4">
          <ImageCell item={item} aspect="" />
        </div>
      ))}
    </div>
  );
}

function ImageCell({ item, aspect }: { item: Item; aspect: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <>
      <figure className="group relative">
        <button
          type="button"
          onClick={open}
          aria-label={`放大查看：${item.alt}`}
          className={`relative block w-full ${aspect || "min-h-[120px]"} overflow-hidden border border-line bg-surface1 cursor-zoom-in`}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill={Boolean(aspect)}
            width={aspect ? undefined : 800}
            height={aspect ? undefined : 600}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-normal"
          />
          <span className="absolute top-2 right-2 w-7 h-7 inline-flex items-center justify-center bg-black/60 text-text opacity-0 group-hover:opacity-100 transition-opacity">
            <Maximize2 size={12} />
          </span>
        </button>
        {item.caption && (
          <figcaption className="mt-2 text-xs text-text-3 font-heading leading-relaxed">
            {item.caption}
          </figcaption>
        )}
      </figure>

      {/* 原生 lightbox */}
      <dialog
        ref={dialogRef}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        className="backdrop:bg-black/85 backdrop:backdrop-blur-md max-w-[92vw] max-h-[92vh] p-0 bg-transparent"
      >
        <div className="relative w-[92vw] h-[92vh] flex items-center justify-center">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="92vw"
            className="object-contain"
          />
          <button
            type="button"
            onClick={close}
            aria-label="关闭"
            className="absolute top-4 right-4 w-10 h-10 inline-flex items-center justify-center bg-black/70 border border-line text-text hover:border-accent hover:text-accent transition-colors"
          >
            ✕
          </button>
        </div>
      </dialog>
    </>
  );
}