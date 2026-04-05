import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle2, Clock, AlertCircle, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <header className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Overview</h1>
                <p className="text-sm text-muted-foreground font-medium">
                    System-wide proposal metrics and active flows.
                </p>
            </header>

            {/* 4-Column Metric Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Proposals" value="128" icon={FileText} trend="+12%" />
                <StatCard title="Approved" value="84" icon={CheckCircle2} trend="+4%" color="text-emerald-500" />
                <StatCard title="Pending" value="32" icon={Clock} trend="-2%" color="text-amber-500" />
                <StatCard title="Flagged" value="12" icon={AlertCircle} trend="0%" color="text-rose-500" />
            </div>

            {/* Main Interactive Visual Layer */}
            <div className="relative group overflow-hidden rounded-2xl border border-border bg-card shadow-chalk transition-all duration-500 hover:shadow-matte">
                {/* Subtle Gradient Glow */}
                <div className="absolute -inset-px bg-gradient-to-tr from-muted/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative h-[450px] flex flex-col items-center justify-center p-8 text-center">
                    <div className="h-16 w-16 rounded-full bg-muted/30 flex items-center justify-center mb-4 shadow-inner">
                        <div className="h-2 w-2 rounded-full bg-foreground animate-pulse" />
                    </div>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">
                        Activity Visualization Layer
                    </span>
                    <p className="mt-2 text-sm text-muted-foreground/60 max-w-xs">
                        Real-time data synchronization with global event archives.
                    </p>
                </div>
            </div>
        </div>
    );
}

interface StatCardProps {
    title: string;
    value: string;
    icon: any;
    trend: string;
    color?: string;
}

function StatCard({ title, value, icon: Icon, trend, color = "text-muted-foreground" }: StatCardProps) {
    return (
        <Card className="group relative overflow-hidden border-border bg-card shadow-chalk transition-all duration-300 ease-physical hover:shadow-matte hover:-translate-y-1 active:scale-[0.98]">
            {/* Subtle Top "Glint" - Adds physical edge definition */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
                    {title}
                </CardTitle>
                <div className={cn("transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3", color)}>
                    <Icon className="h-4 w-4 opacity-80" />
                </div>
            </CardHeader>

            <CardContent>
                <div className="flex items-baseline justify-between">
                    <div className="text-3xl font-bold tracking-tighter text-foreground tabular-nums">
                        {value}
                    </div>
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-muted/50 border border-border/50 shadow-sm transition-colors group-hover:bg-foreground group-hover:text-background">
                        <span className="text-[10px] font-bold">{trend}</span>
                        <ArrowUpRight className="h-2.5 w-2.5" />
                    </div>
                </div>
                <p className="text-[10px] text-muted-foreground/60 mt-2 font-medium">
                    Since last billing cycle
                </p>
            </CardContent>
        </Card>
    );
}