export default function ArchivePage() {
    return (
        <div className="p-8 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight text-primary">Archive</h1>
            <p className="text-sm text-muted-foreground mt-1">
                Historical records and past global proposals.
            </p>
            <div className="mt-8 flex items-center justify-center h-64 border border-dashed rounded-xl border-border bg-muted/10 text-muted-foreground">
                No archived items available.
            </div>
        </div>
    );
}
