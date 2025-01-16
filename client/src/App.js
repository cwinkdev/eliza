"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
require("./index.css");
var react_query_1 = require("@tanstack/react-query");
var sidebar_1 = require("@/components/ui/sidebar");
var app_sidebar_1 = require("./components/app-sidebar");
var tooltip_1 = require("./components/ui/tooltip");
var toaster_1 = require("./components/ui/toaster");
var react_router_1 = require("react-router");
var chat_1 = __importDefault(require("./routes/chat"));
var overview_1 = __importDefault(require("./routes/overview"));
var home_1 = __importDefault(require("./routes/home"));
var use_version_1 = __importDefault(require("./hooks/use-version"));
var queryClient = new react_query_1.QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
        },
    },
});
function App() {
    (0, use_version_1.default)();
    return ((0, jsx_runtime_1.jsx)(react_query_1.QueryClientProvider, { client: queryClient, children: (0, jsx_runtime_1.jsx)("div", { className: "dark antialiased", style: {
                colorScheme: "dark",
            }, children: (0, jsx_runtime_1.jsx)(react_router_1.BrowserRouter, { children: (0, jsx_runtime_1.jsxs)(tooltip_1.TooltipProvider, { delayDuration: 0, children: [(0, jsx_runtime_1.jsxs)(sidebar_1.SidebarProvider, { children: [(0, jsx_runtime_1.jsx)(app_sidebar_1.AppSidebar, {}), (0, jsx_runtime_1.jsx)(sidebar_1.SidebarInset, { children: (0, jsx_runtime_1.jsx)("div", { className: "flex flex-1 flex-col gap-4 size-full container", children: (0, jsx_runtime_1.jsxs)(react_router_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(home_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_1.Route, { path: "chat/:agentId", element: (0, jsx_runtime_1.jsx)(chat_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_1.Route, { path: "settings/:agentId", element: (0, jsx_runtime_1.jsx)(overview_1.default, {}) })] }) }) })] }), (0, jsx_runtime_1.jsx)(toaster_1.Toaster, {})] }) }) }) }));
}
exports.default = App;
