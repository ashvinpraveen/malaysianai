import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCcw, Home, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can also log the error to an error reporting service
        console.group("🔴 Application Error Catch");
        console.error("Error:", error);
        console.error("Error Info:", errorInfo);
        console.groupEnd();
    }

    private handleReset = () => {
        this.setState({ hasError: false, error: null });
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6 text-center">
                    <div className="max-w-2xl w-full space-y-8 animate-fade-in">
                        <div className="flex justify-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-destructive/20 blur-2xl rounded-full scale-150" />
                                <div className="relative p-6 bg-card border border-destructive/20 rounded-2xl shadow-xl">
                                    <AlertCircle className="w-12 h-12 text-destructive" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h1 className="text-4xl font-bold tracking-tight text-foreground">Something went wrong</h1>
                            <p className="text-lg text-muted-foreground max-w-md mx-auto font-medium">
                                We've encountered an unexpected error. Developer details are provided below.
                            </p>
                        </div>

                        <div className="group relative overflow-hidden rounded-2xl border border-destructive/10 bg-card p-1 text-left shadow-lg transition-all hover:shadow-xl">
                            <div className="flex items-center gap-2 border-b border-destructive/5 bg-destructive/[0.02] px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-destructive">
                                <span className="flex h-1.5 w-1.5 rounded-full bg-destructive animate-pulse" />
                                Developer Error Report
                            </div>
                            <div className="p-6 bg-card overflow-auto max-h-[400px]">
                                <div className="space-y-4 font-mono">
                                    <div>
                                        <p className="text-xs font-bold text-destructive/80 mb-1">NAME</p>
                                        <p className="text-sm font-semibold text-foreground">{this.state.error?.name || "Error"}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-destructive/80 mb-1">MESSAGE</p>
                                        <p className="text-sm text-foreground/80">{this.state.error?.message || "No message provided"}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-destructive/80 mb-1 leading-none flex items-center gap-1">
                                            STACK TRACE <ChevronRight className="w-3 h-3" />
                                        </p>
                                        <pre className="mt-2 text-[11px] leading-relaxed text-muted-foreground whitespace-pre-wrap break-all bg-muted/50 p-4 rounded-lg border border-border">
                                            {this.state.error?.stack || "No stack trace available"}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Button
                                onClick={this.handleReset}
                                className="min-w-[160px] flex items-center gap-2"
                                size="lg"
                            >
                                <RefreshCcw className="w-4 h-4" />
                                Reload Page
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => window.location.href = '/'}
                                className="min-w-[160px] flex items-center gap-2"
                                size="lg"
                            >
                                <Home className="w-4 h-4" />
                                Return Home
                            </Button>
                        </div>

                        <p className="text-xs text-muted-foreground pt-8">
                            Press <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted font-sans font-medium text-foreground/70">Ctrl+Shift+I</kbd> to open console for more details.
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
