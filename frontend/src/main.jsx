import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const renderImportError = (error) => {
    console.error("Frontend bootstrap error:", error);
    root.render(
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="max-w-2xl w-full bg-white border border-red-200 rounded-2xl shadow-lg p-8">
                <p className="text-sm font-bold uppercase tracking-wider text-red-600 mb-3">
                    Frontend Bootstrap Error
                </p>
                <h1 className="text-2xl font-serif font-bold text-secondary mb-4">
                    The app failed before React could mount
                </h1>
                <p className="text-gray-600 mb-6">
                    This usually means one imported module threw an error while
                    loading.
                </p>
                <pre className="bg-gray-900 text-red-300 text-sm rounded-lg p-4 overflow-x-auto whitespace-pre-wrap">
                    {error?.message || "Unknown import error"}
                </pre>
            </div>
        </div>,
    );
};

root.render(
    <div className="min-h-screen flex items-center justify-center bg-white text-gray-700">
        Loading app...
    </div>,
);

import("./App.jsx")
    .then(({ default: App }) => {
        root.render(
            <StrictMode>
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
            </StrictMode>,
        );
    })
    .catch(renderImportError);
