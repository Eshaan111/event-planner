"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Archive,
    FileText,
    Settings,
    Bell,
    Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";


export function NavBar() {
    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
            <div className="flex h-14 items-center px-6">

                {/* LOGO SECTION */}
                <Link href="/dashboard" className="flex items-center gap-2 mr-8 transition-opacity hover:opacity-80">
                    <div className="h-6 w-6 rounded bg-foreground flex items-center justify-center shadow-matte">
                        <Archive className="h-3.5 w-3.5 text-background" strokeWidth={3} />
                    </div>
                    <span className="text-sm font-bold tracking-tight uppercase">
                        Event.Archive
                    </span>
                </Link>

                {/* MAIN NAVIGATION */}
                <div className="flex items-center gap-1">
                    <NavButton
                        href="/dashboard"
                        icon={LayoutDashboard}
                        label="Dashboard"
                        active={pathname === "/dashboard"}
                    />
                    <NavButton
                        href="/proposal-board"
                        icon={FileText}
                        label="Proposals"
                        active={pathname.startsWith("/proposal")}
                    />
                    <NavButton
                        href="/archive"
                        icon={Archive}
                        label="Archive"
                        active={pathname === "/archive"}
                    />
                </div>

                <div className="ml-auto flex items-center gap-2">
                    <ModeToggle /> {/* Added here */}
                    <Separator orientation="vertical" className="h-4 mx-1" />

                    <Button
                        variant="ghost"
                        className="h-9 w-9 p-0 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-all active:scale-90"
                    >
                        <Search className="h-4 w-4" />
                    </Button>



                    <Separator orientation="vertical" className="h-4 mx-1" />

                    <Button
                        variant="ghost"
                        className="relative h-9 w-9 p-0 rounded-full text-muted-foreground hover:text-foreground active:scale-95"
                    >
                        <Bell className="h-4 w-4" />
                        <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-foreground shadow-[0_0_0_2px_white]" />
                    </Button>

                    <Button
                        variant="outline"
                        className="ml-2 h-8 px-3 gap-2 border-border/60 bg-card shadow-chalk hover:shadow-matte transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                    >
                        <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
                            ES
                        </div>
                        <span className="text-xs font-medium">Eshaan</span>
                    </Button>
                </div>
            </div>
        </nav>
    );
}

/* Updated NavButton with dynamic routing */
function NavButton({
    href,
    icon: Icon,
    label,
    active = false
}: {
    href: string,
    icon: any,
    label: string,
    active?: boolean
}) {
    return (
        <Link href={href}>
            <Button
                variant="ghost"
                className={cn(
                    "h-9 px-4 gap-2 text-xs font-medium transition-all duration-200",
                    "hover:bg-accent hover:text-foreground active:scale-95",
                    active
                        ? "text-foreground bg-accent/50 shadow-chalk ring-1 ring-border/50"
                        : "text-muted-foreground"
                )}
            >
                <Icon className={cn("h-4 w-4", active ? "opacity-100" : "opacity-60")} />
                {label}
            </Button>
        </Link>
    );
}