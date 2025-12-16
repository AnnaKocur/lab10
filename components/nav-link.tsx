"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
    const pathname = usePathname();
    const isActive = pathname.startsWith(href);

    return (
        <Link
            href={href}
            className={
                isActive
                    ? "text-white underline font-medium"
                    : "text-white no-underline font-medium hover:underline"
            }
        >
            {children}
        </Link>
    );
}
