"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // Sync with client
    React.useEffect(() => setMounted(true), []);

    // Use a placeholder with the same dimensions to prevent layout shift
    if (!mounted) {
        return <div className="h-9 w-9" aria-hidden="true" />;
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full transition-all active:scale-90 shadow-chalk border border-border/20 bg-background/50"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
            {resolvedTheme === "dark" ? (
                <Moon className="h-4 w-4 text-foreground" />
            ) : (
                <Sun className="h-4 w-4 text-foreground" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}