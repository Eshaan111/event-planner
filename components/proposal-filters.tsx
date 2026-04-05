"use client";

import * as React from "react";
import { Search, User, Calendar, X, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface FilterProps {
    onSearchChange: (val: string) => void;
    onStatusChange: (status: string | null) => void;
    onAuthorChange: (author: string | null) => void;
    onDateChange: (date: string | null) => void;
    activeStatus: string | null;
    activeAuthor: string | null;
    authors: string[];
}

export function ProposalFilters({
    onSearchChange,
    onStatusChange,
    onAuthorChange,
    onDateChange,
    activeStatus,
    activeAuthor,
    authors
}: FilterProps) {
    const statuses = ["Draft", "Under Review", "Approved", "Flagged"];

    return (
        <div className="flex flex-col gap-6 pb-8">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Search */}
                <div className="relative flex-1 max-w-sm group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                    <Input
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search proposals..."
                        className="pl-9 bg-card shadow-chalk border-border/50 focus-visible:ring-primary/20 h-10"
                    />
                </div>

                {/* Author Popover */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="h-10 border-border/50 shadow-chalk px-4 text-[11px] font-bold uppercase tracking-wider gap-2">
                            <User className="h-3.5 w-3.5 opacity-60" />
                            {activeAuthor || "Author"}
                            <ChevronDown className="h-3.5 w-3.5 opacity-30" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-1 bg-card border-border shadow-matte" align="start">
                        <button
                            onClick={() => onAuthorChange(null)}
                            className="w-full text-left px-3 py-2 text-[10px] font-bold uppercase hover:bg-muted rounded-md transition-colors"
                        >
                            All Authors
                        </button>
                        {authors.map((author) => (
                            <button
                                key={author}
                                onClick={() => onAuthorChange(author)}
                                className={cn(
                                    "w-full text-left px-3 py-2 text-[10px] font-bold uppercase rounded-md transition-colors",
                                    activeAuthor === author ? "bg-foreground text-background" : "hover:bg-muted"
                                )}
                            >
                                {author}
                            </button>
                        ))}
                    </PopoverContent>
                </Popover>

                {/* Date Filter */}
                <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                    <Input
                        type="date"
                        onChange={(e) => onDateChange(e.target.value)}
                        className="pl-9 h-10 w-[160px] bg-card border-border/50 shadow-chalk text-[10px] font-bold uppercase"
                    />
                </div>
            </div>

            {/* Status Pills */}
            <div className="flex items-center gap-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Filter Status:</span>
                <div className="flex items-center gap-2 p-1 bg-muted/20 rounded-full border border-border/50">
                    {statuses.map((status) => (
                        <button
                            key={status}
                            onClick={() => onStatusChange(activeStatus === status ? null : status)}
                            className={cn(
                                "px-4 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all",
                                activeStatus === status
                                    ? "bg-foreground text-background shadow-matte"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {status}
                        </button>
                    ))}
                </div>
                {(activeStatus || activeAuthor) && (
                    <Button variant="ghost" size="sm" onClick={() => { onStatusChange(null); onAuthorChange(null); }} className="h-7 text-[9px] font-bold uppercase text-rose-500 hover:bg-rose-500/10">
                        Clear Filters <X className="ml-1 h-3 w-3" />
                    </Button>
                )}
            </div>
        </div>
    );
}