import React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Breadcrumb({ children, className }: { children: React.ReactNode; className?: string }) {
  return <nav aria-label="breadcrumb" className={cn("flex items-center text-sm", className)}>{children}</nav>;
}

export function BreadcrumbList({ children, className }: { children: React.ReactNode; className?: string }) {
  return <ol className={cn("flex items-center gap-1.5 text-muted-foreground", className)}>{children}</ol>;
}

export function BreadcrumbItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <li className={cn("inline-flex items-center gap-1.5", className)}>{children}</li>;
}

export function BreadcrumbLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} className={cn("hover:text-foreground transition-colors", className)}>
      {children}
    </a>
  );
}

export function BreadcrumbPage({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("font-medium text-foreground", className)}>{children}</span>;
}

export function BreadcrumbSeparator({ className }: { className?: string }) {
  return <ChevronRight className={cn("h-4 w-4 text-muted-foreground", className)} />;
}
