import Link from "next/link"; // Import Link
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProposalProps {
    id: string | number; // Added ID for routing
    name: string;
    submittedBy: string;
    date: string;
    status: "Draft" | "Under Review" | "Approved" | "Flagged";
}

const statusStyles = {
    Draft: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
    "Under Review": "bg-blue-500/10 text-blue-500 border-blue-500/20",
    Approved: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Flagged: "bg-rose-500/10 text-rose-500 border-rose-500/20",
};

export function ProposalCard({ id, name, submittedBy, date, status }: ProposalProps) {
    const initials = submittedBy
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

    return (
        <Link href={`/proposal/${id}`} className="block h-full group">
            <Card className="hover-lift p-6 bg-card border-border/40 flex flex-col justify-between h-full relative overflow-hidden cursor-pointer">
                {/* Top Section: Status & Action */}
                <div className="flex justify-between items-start mb-6">
                    <Badge className={cn("text-[9px] font-black uppercase tracking-widest border px-2 py-0.5 transition-colors", statusStyles[status])}>
                        {status}
                    </Badge>
                    <div className="h-7 w-7 rounded-full bg-muted/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:translate-x-1 group-hover:-translate-y-1">
                        <ArrowRight className="h-3.5 w-3.5 -rotate-45" />
                    </div>
                </div>

                {/* Middle Section: Title */}
                <div className="space-y-1 mb-8">
                    <h3 className="text-lg font-bold tracking-tight leading-tight group-hover:text-primary transition-colors">
                        {name}
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground/60">
                        <Clock className="h-3 w-3" />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">{date}</span>
                    </div>
                </div>

                {/* Bottom Section: Author Avatar & Metadata */}
                <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 border border-border/50 shadow-chalk ring-2 ring-background transition-transform group-hover:scale-110">
                            <AvatarImage src={`https://avatar.vercel.sh/${submittedBy}.png`} alt={submittedBy} />
                            <AvatarFallback className="bg-muted text-[10px] font-bold">{initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-foreground leading-none">{submittedBy}</span>
                            <span className="text-[9px] font-medium text-muted-foreground mt-1 tracking-tight">Author</span>
                        </div>
                    </div>

                    <span className="text-[9px] font-mono text-muted-foreground/30 hidden sm:block">
                        #EA-{String(id).padStart(4, '0')}
                    </span>
                </div>
            </Card>
        </Link>
    );
}