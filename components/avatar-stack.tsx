import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function AvatarStack({ className }: { className?: string }) {
    const reviewers = ["Sarah", "Alex", "Marcus", "Elena", "Eshaan"];

    return (
        <div className={cn("flex -space-x-3 hover:space-x-1 transition-all duration-500", className)}>
            {reviewers.map((name, i) => (
                <Avatar key={i} className="h-8 w-8 border-2 border-background shadow-chalk ring-1 ring-border/50">
                    <AvatarImage src={`https://avatar.vercel.sh/${name}.png`} />
                    <AvatarFallback className="text-[10px] font-bold">{name[0]}</AvatarFallback>
                </Avatar>
            ))}
            <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] font-black text-muted-foreground shadow-chalk">
                +12
            </div>
        </div>
    );
}