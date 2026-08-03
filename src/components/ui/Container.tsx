import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ElementType } from "react";

type ContainerProps<E extends ElementType> = {
  as?: E;
  size?: "default" | "wide" | "narrow";
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<E>, "as" | "className" | "size" | "children">;

const sizes = {
  default: "max-w-content",
  wide: "max-w-page",
  narrow: "max-w-3xl",
};

export function Container<E extends ElementType = "div">({
  className,
  children,
  as,
  size = "default",
  ...rest
}: ContainerProps<E>) {
  const As = (as ?? "div") as ElementType;
  return (
    <As
      className={cn(
        "mx-auto w-full px-6 md:px-10 lg:px-16",
        sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
    </As>
  );
}
