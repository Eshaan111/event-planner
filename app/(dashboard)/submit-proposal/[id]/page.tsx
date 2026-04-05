"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    ChevronLeft,
    ChevronRight,
    FileEdit,
    X,
    CloudIcon,
    Layers,
    FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function CreateProposalPage() {
    const router = useRouter();
    const [fileUrl, setFileUrl] = React.useState<string | null>(null);
    const [fileName, setFileName] = React.useState("");
    const [proposalName, setProposalName] = React.useState("");
    const inputRef = React.useRef<HTMLInputElement>(null);

    const [numPages, setNumPages] = React.useState<number>(0);
    const [pageNumber, setPageNumber] = React.useState<number>(1);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        setPageNumber(1);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === "application/pdf") {
            if (fileUrl) URL.revokeObjectURL(fileUrl);
            const url = URL.createObjectURL(file);
            setFileUrl(url);
            setFileName(file.name);
        } else if (file) {
            alert("Please upload a PDF file.");
        }
    };

    const clearFile = () => {
        if (fileUrl) URL.revokeObjectURL(fileUrl);
        setFileUrl(null);
        setFileName("");
        setNumPages(0);
        setPageNumber(1);
    };

    const nextPage = () => { if (pageNumber < numPages) setPageNumber(pageNumber + 1); };
    const prevPage = () => { if (pageNumber > 1) setPageNumber(pageNumber - 1); };

    return (
        // Root uses CSS vars via `bg-background text-foreground` — flips automatically in dark mode
        <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">

            {/* ── Header & Title ─────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-6 py-8 lg:py-12 space-y-8">
                <nav className="flex items-center justify-between mb-6">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.back()}
                        className="group text-[10px] font-black uppercase tracking-[0.2em] hover:bg-transparent p-0 h-auto text-foreground"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                        Discard Draft
                    </Button>

                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        <div className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                        </div>
                        Live Session
                    </div>
                </nav>

                {/* Proposal name input */}
                <header className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                    <div className="relative flex-1 group">
                        <input
                            ref={inputRef}
                            type="text"
                            value={proposalName}
                            onChange={(e) => setProposalName(e.target.value)}
                            placeholder="Name your proposal"
                            className={cn(
                                "w-full bg-transparent text-4xl font-black tracking-tighter outline-none border-none focus:ring-0 p-0",
                                "text-foreground transition-all duration-300",
                                "placeholder:text-muted-foreground placeholder:transition-opacity",
                                "focus:placeholder:opacity-0"
                            )}
                        />
                        {/* Underline — uses currentColor so it inherits foreground */}
                        <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-foreground group-focus-within:w-full transition-all duration-500" />
                    </div>
                </header>
            </div>

            {/* Divider */}
            <div className="w-full border-t border-border" />

            {/* ── Workspace ──────────────────────────────────────────── */}
            <section className="relative w-full min-h-[900px] pb-32 overflow-hidden bg-muted/30">

                {/* Background image */}
                <div className="absolute inset-0 z-0">

                    <img
                        src="/banner-ppt-bg-dark.jpg"
                        alt=""
                        className="w-full h-full object-cover scale-105 animate-slow-zoom"
                    />
                    {/* Dark-mode aware overlay: lighter in light mode, heavier in dark */}
                    <div className="absolute inset-0 bg-black/10 dark:bg-black/50 backdrop-blur-[2px]" />
                </div>

                <div className="max-w-[1550px] mx-auto p-6 lg:p-12 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-12 items-stretch min-h-[750px]">

                        {/* ── LEFT: PDF Viewer ─────────────────────────────── */}
                        <div className="flex-[3] flex flex-col space-y-6 group">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-2 text-white drop-shadow-md">
                                    <Layers className="h-4 w-4" /> Live Document Stream
                                </h3>
                                {fileUrl && (
                                    <div className="flex items-center gap-4 bg-black/60 backdrop-blur-md px-5 py-2 rounded-full border border-white/10 text-[11px] font-black text-white uppercase tracking-widest">
                                        <span>Page {pageNumber} of {numPages}</span>
                                    </div>
                                )}
                            </div>

                            {!fileUrl ? (
                                // Upload zone — uses card/border vars so it matches the theme
                                <label className="group relative flex-1 flex flex-col items-center justify-center bg-card/20 dark:bg-card/10 backdrop-blur-3xl border-[4px] border-white/20 rounded-[48px] transition-all duration-700 cursor-pointer shadow-2xl hover:bg-card/30 dark:hover:bg-card/20 hover:-translate-y-2">
                                    <input type="file" className="hidden" accept="application/pdf" onChange={handleFileChange} />
                                    <div className="p-12 bg-white/10 rounded-full border border-white/20 group-hover:scale-110 transition-transform duration-700">
                                        <CloudIcon className="h-16 w-16 text-white" />
                                    </div>
                                    <div className="mt-10 text-center space-y-2">
                                        <p className="text-3xl font-bold tracking-tighter text-white drop-shadow-sm uppercase">Inject PDF Asset</p>
                                        <p className="text-[11px] font-black text-white/70 uppercase tracking-[0.3em]">Classification Protocol Required</p>
                                    </div>
                                </label>
                            ) : (
                                <div className="flex-1 flex flex-col bg-card/10 backdrop-blur-3xl border-[4px] border-white/20 rounded-[48px] overflow-hidden shadow-2xl group/viewer relative animate-in fade-in zoom-in-95 duration-500">

                                    {/* Prev/Next arrows */}
                                    <button
                                        onClick={prevPage}
                                        disabled={pageNumber <= 1}
                                        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-5 rounded-full bg-black/40 hover:bg-black/70 text-white transition-all opacity-0 group-hover/viewer:opacity-100 disabled:hidden backdrop-blur-sm border border-white/10"
                                    >
                                        <ChevronLeft className="h-9 w-9" />
                                    </button>
                                    <button
                                        onClick={nextPage}
                                        disabled={pageNumber >= numPages}
                                        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-5 rounded-full bg-black/40 hover:bg-black/70 text-white transition-all opacity-0 group-hover/viewer:opacity-100 disabled:hidden backdrop-blur-sm border border-white/10"
                                    >
                                        <ChevronRight className="h-9 w-9" />
                                    </button>

                                    {/* PDF canvas area */}
                                    <div className="flex-1 flex items-center justify-center bg-black/60 dark:bg-black/80 p-10 overflow-auto no-scrollbar">
                                        <Document
                                            file={fileUrl}
                                            onLoadSuccess={onDocumentLoadSuccess}
                                            className="shadow-2xl"
                                        >
                                            <Page
                                                pageNumber={pageNumber}
                                                renderTextLayer={true}
                                                renderAnnotationLayer={true}
                                                width={800}
                                                className="border-[4px] border-black dark:border-white/20 rounded-xl overflow-hidden"
                                            />
                                        </Document>
                                    </div>

                                    {/* Top badge & close */}
                                    <div className="absolute top-8 right-8 flex gap-3 z-30">
                                        <div className="px-5 py-2.5 bg-black/80 backdrop-blur-md rounded-full border border-white/10 text-[11px] font-black text-white uppercase tracking-widest flex items-center gap-2.5 shadow-xl">
                                            <FileText className="h-4 w-4 text-emerald-400" /> {fileName}
                                        </div>
                                        <Button
                                            onClick={clearFile}
                                            size="icon"
                                            variant="ghost"
                                            className="rounded-full h-11 w-11 bg-white/10 hover:bg-red-500 text-white transition-colors backdrop-blur-sm border border-white/10"
                                        >
                                            <X className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* ── RIGHT: Metadata Pane ─────────────────────────── */}
                        <div className="flex-[1.8] flex flex-col">
                            {/*
                             * Card background: white in light mode, dark surface in dark mode.
                             * We override shadcn's Card defaults with explicit classes so the
                             * panel always uses the correct semantic tokens.
                             */}
                            <Card className="p-0 flex-1 bg-card border-[2px] border-border shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] rounded-[28px] overflow-hidden flex flex-col max-h-[900px] relative">

                                {/* Card header — black in light mode, dark zinc in dark mode */}
                                <div className="p-4 light :bg-zinc-900 dark:bg-zinc-900 text-white">
                                    <div className="flex items-center gap-6">
                                        <div className="h-16 w-16 bg-white dark:bg-zinc-700 rounded-[20px] flex items-center justify-center shadow-2xl -rotate-1 shrink-0">
                                            <FileEdit className="h-8 w-8 text-zinc-900 dark:text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-black tracking-tight leading-none uppercase">Metadata</h2>
                                            <p className="text-[10px] font-black opacity-50 uppercase tracking-[0.3em] mt-2">Event Classification Protocol</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Scrollable fields */}
                                <div className="flex-1 overflow-y-auto p-8 no-scrollbar bg-muted/40 dark:bg-muted/20">
                                    <div className="flex flex-col gap-y-6">

                                        {/* Official Event Title */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">
                                                Official Event Title
                                            </label>
                                            <Input
                                                placeholder="e.g. GLOBAL TECH EXPO 2026"
                                                className="bg-background border-[2px] border-input h-14 rounded-[14px] px-6 text-base font-bold text-foreground placeholder:text-muted-foreground focus-visible:border-foreground focus-visible:ring-0 transition-all shadow-sm w-full"
                                            />
                                        </div>

                                        {/* Date + Location */}
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Planned Date</label>
                                                <Input
                                                    type="date"
                                                    className="bg-background border-[2px] border-input h-14 rounded-[14px] px-6 text-base font-bold text-foreground focus-visible:border-foreground transition-all uppercase w-full"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Event Location</label>
                                                <Input
                                                    placeholder="City Hall / Virtual"
                                                    className="bg-background border-[2px] border-input h-14 rounded-[14px] px-6 text-base font-bold text-foreground placeholder:text-muted-foreground focus-visible:border-foreground transition-all w-full"
                                                />
                                            </div>
                                        </div>

                                        {/* Lead Organizer + Department */}
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Lead Organizer</label>
                                                <Input
                                                    placeholder="John Doe"
                                                    className="bg-background border-[2px] border-input h-14 rounded-[14px] px-6 text-base font-bold text-foreground placeholder:text-muted-foreground focus-visible:border-foreground transition-all w-full"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Department</label>
                                                <Input
                                                    placeholder="Operations / Marketing"
                                                    className="bg-background border-[2px] border-input h-14 rounded-[14px] px-6 text-base font-bold text-foreground placeholder:text-muted-foreground focus-visible:border-foreground transition-all w-full"
                                                />
                                            </div>
                                        </div>

                                        {/* Attendance + Budget */}
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Target Attendance</label>
                                                <Input
                                                    placeholder="e.g. 500"
                                                    className="bg-background border-[2px] border-input h-14 rounded-[14px] px-6 text-base font-bold text-foreground placeholder:text-muted-foreground focus-visible:border-foreground transition-all w-full"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Estimated Budget ($)</label>
                                                <Input
                                                    placeholder="e.g. 25,000"
                                                    className="bg-background border-[2px] border-input h-14 rounded-[14px] px-6 text-base font-bold text-foreground placeholder:text-muted-foreground focus-visible:border-foreground transition-all w-full"
                                                />
                                            </div>
                                        </div>

                                        {/* Event Type + Security Level */}
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Event Type</label>
                                                <Input
                                                    placeholder="Conference / Workshop"
                                                    className="bg-background border-[2px] border-input h-14 rounded-[14px] px-6 text-base font-bold text-foreground placeholder:text-muted-foreground focus-visible:border-foreground transition-all w-full"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Security Level</label>
                                                <Input
                                                    placeholder="Public / Internal"
                                                    className="bg-background border-[2px] border-input h-14 rounded-[14px] px-6 text-base font-bold text-foreground placeholder:text-muted-foreground focus-visible:border-foreground transition-all w-full"
                                                />
                                            </div>
                                        </div>

                                        {/* Strategic Objective */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Strategic Objective</label>
                                            <textarea
                                                placeholder="Briefly state the core mission..."
                                                className="w-full bg-background border-[2px] border-input p-6 rounded-[18px] text-base font-bold text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-all min-h-[120px] resize-none shadow-sm"
                                            />
                                        </div>

                                    </div>
                                </div>

                                {/* CTA button */}
                                <div className="p-2 bg-zinc-100 dark:bg-zinc-900 border-t-[4px] border-border mt-auto">
                                    <Button className="w-full h-20 text-base font-black uppercase tracking-[0.4em] rounded-[24px] bg-zinc-900 dark:bg-zinc-810 text-white hover:bg-zinc-800 dark:hover:bg-zinc-600 transition-all shadow-[0_15px_30px_-10px_rgba(0,0,0,0.3)] active:scale-[0.98]">
                                        Initialize Event Proposal
                                    </Button>
                                </div>
                            </Card>
                        </div>

                    </div>
                </div>
            </section>

            <style jsx global>{`
                @keyframes slow-zoom {
                    0%, 100% { transform: scale(1.05); }
                    50%       { transform: scale(1.1);  }
                }
                .animate-slow-zoom {
                    animation: slow-zoom 20s infinite ease-in-out;
                }
                .react-pdf__Page__canvas {
                    margin: 0 auto;
                    border-radius: 12px;
                }
            `}</style>
        </div>
    );
}