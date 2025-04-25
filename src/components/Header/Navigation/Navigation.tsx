"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { navigationLinks } from "./navigationLinks";

export default function Navigation() {
    const pathname = usePathname();
    const isActive = (href: string) => pathname === href;
    const isActiveClass = (href: string) => (isActive(href) ? "text-lion-orange" : "text-gray-700");

    return (
        <nav className="flex gap-10" role="navigation" aria-label="사이트 내비게이션">
            {navigationLinks.map(({ label, key, href }) => (
                <Link
                    key={key}
                    href={href}
                    aria-current={isActive(href) ? "page" : undefined}
                    className={cn(
                        "text-sm font-semibold transition-colors",
                        isActiveClass(href),
                        "hover:text-lion-orange",
                        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-lion-orange/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    )}
                >
                    {label}
                </Link>
            ))}
        </nav>
    );
}
