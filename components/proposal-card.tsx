import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User as UserIcon, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProposalProps {
    id?: number;
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
    return (
        <Card className="hover-lift group p-5 bg-card border-border/40 flex flex-col justify-between h-full">
            <div>
                <div className="flex justify-between items-start mb-4">
                    <Badge className={cn("text-[10px] font-black uppercase tracking-tighter border", statusStyles[status])}>
                        {status}
                    </Badge>
                    <div className="h-8 w-8 rounded-full bg-muted/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                </div>

                <h3 className="text-lg font-bold tracking-tight mb-1 group-hover:text-primary transition-colors">
                    {name}
                </h3>

                <div className="space-y-2 mt-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <UserIcon className="h-3.5 w-3.5" />
                        <span className="text-xs font-medium">{submittedBy}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span className="text-xs font-medium">{date}</span>
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
                <span>Ref: EA-2026-{id || 401}</span>
                <span className="group-hover:text-foreground transition-colors underline cursor-pointer">View Details</span>
            </div>
        </Card>
    );
}