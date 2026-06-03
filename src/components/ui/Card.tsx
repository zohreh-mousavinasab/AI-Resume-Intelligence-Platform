import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  muted?: boolean;
}

export function Card({ children, className = "", muted = false, ...props }: CardProps) {
  return (
    <section className={`${muted ? "surface-muted" : "surface-panel"} ${className}`} {...props}>
      {children}
    </section>
  );
}
