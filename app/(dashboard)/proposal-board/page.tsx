"use client";

import * as React from "react";
import { ProposalFilters } from "@/components/proposal-filters";
import { ProposalCard } from "@/components/proposal-card";

const MOCK_PROPOSALS = [
    { id: 1, name: "Global Tech Summit 2026", submittedBy: "Sarah Chen", date: "2025-10-12", status: "Approved" },
    { id: 2, name: "Quantum Computing Workshop", submittedBy: "Alex Rivers", date: "2025-11-05", status: "Under Review" },
    { id: 3, name: "Annual Gala Dinner", submittedBy: "Eshaan", date: "2025-12-20", status: "Draft" },
    { id: 4, name: "Product Launch: Nexus-9", submittedBy: "Marcus Wright", date: "2026-01-14", status: "Flagged" },
    { id: 5, name: "AI Safety Conference", submittedBy: "Sarah Chen", date: "2026-02-10", status: "Approved" },
];

export default function ProposalsPage() {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [activeStatus, setActiveStatus] = React.useState<string | null>(null);
    const [activeAuthor, setActiveAuthor] = React.useState<string | null>(null);
    const [activeDate, setActiveDate] = React.useState<string | null>(null);

    // Get unique authors for the filter
    const authors = React.useMemo(() =>
        Array.from(new Set(MOCK_PROPOSALS.map(p => p.submittedBy))),
        []);

    const filteredProposals = React.useMemo(() => {
        return MOCK_PROPOSALS.filter((p) => {
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = activeStatus ? p.status === activeStatus : true;
            const matchesAuthor = activeAuthor ? p.submittedBy === activeAuthor : true;
            const matchesDate = activeDate ? p.date === activeDate : true;

            return matchesSearch && matchesStatus && matchesAuthor && matchesDate;
        });
    }, [searchQuery, activeStatus, activeAuthor, activeDate]);

    return (
        <div className="p-8 max-w-7xl mx-auto min-h-screen">
            <header className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight">Proposals</h1>
                <p className="text-sm text-muted-foreground mt-2 font-medium">
                    Reviewing {filteredProposals.length} high-fidelity event archives.
                </p>
            </header>

            <ProposalFilters
                onSearchChange={setSearchQuery}
                onStatusChange={setActiveStatus}
                onAuthorChange={setActiveAuthor}
                onDateChange={setActiveDate}
                activeStatus={activeStatus}
                activeAuthor={activeAuthor}
                authors={authors}
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4 transition-all duration-500 ease-physical">
                {filteredProposals.length > 0 ? (
                    filteredProposals.map((p) => (
                        <div key={p.id} className="animate-in fade-in slide-in-from-bottom-3 duration-500">
                            <ProposalCard {...p as any} />
                        </div>
                    ))
                ) : (
                    <div className="col-span-full h-64 rounded-3xl border border-dashed border-border/60 flex flex-col items-center justify-center bg-muted/5">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40 italic">
                            Zero matching records in local archive
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}