import { ThemeProvider } from "@/components/theme-provider";
import { NavBar } from "@/components/nav-bar";
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <NavBar />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}