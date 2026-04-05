"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return (
        <NextThemesProvider
            {...props}
            // This ensures the script is handled by the browser 
            // rather than React's reconciliation engine
            enableSystem={true}
            attribute="class"
            defaultTheme="system"
        >
            {children}
        </NextThemesProvider>
    );
}