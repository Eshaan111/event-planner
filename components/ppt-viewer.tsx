
"use client";

import * as React from "react";
import { Maximize2, ChevronLeft, ChevronRight, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PPTViewer() {
    return (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted/10 shadow-chalk group">
            {/* Mock Slide Content */}
            <div className="flex h-full items-center justify-center bg-white dark:bg-zinc-900">
                <div className="text-center space-y-4">
                    <h3 className="text-4xl font-bold tracking-tighter opacity-20">SLIDE 01</h3>
                    <p className="text-sm text-muted-foreground uppercase tracking-widest">Market Analysis Overview</p>
                </div>
            </div>

            {/* FLOATING HUD (Layer 2) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1.5 rounded-full bg-popover/80 backdrop-blur-md border border-border/50 shadow-matte transition-all duration-500 group-hover:bottom-8">

                <div className="flex items-center gap-1 px-2 border-r border-border/50">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-[10px] font-bold tabular-nums px-2">01 / 12</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex items-center gap-1 px-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover-lift">
                        <Maximize2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover-lift">
                        <Share2 className="h-3.5 w-3.5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}