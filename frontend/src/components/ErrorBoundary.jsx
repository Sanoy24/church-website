import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Frontend render error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                    <div className="max-w-2xl w-full bg-white border border-red-200 rounded-2xl shadow-lg p-8">
                        <p className="text-sm font-bold uppercase tracking-wider text-red-600 mb-3">
                            Frontend Error
                        </p>
                        <h1 className="text-2xl font-serif font-bold text-secondary mb-4">
                            The page crashed while rendering
                        </h1>
                        <p className="text-gray-600 mb-6">
                            Check the browser console for the full stack trace.
                        </p>
                        <pre className="bg-gray-900 text-red-300 text-sm rounded-lg p-4 overflow-x-auto whitespace-pre-wrap">
                            {this.state.error?.message || "Unknown error"}
                        </pre>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
