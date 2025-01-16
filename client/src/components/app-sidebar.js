"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppSidebar = AppSidebar;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_query_1 = require("@tanstack/react-query");
var info_json_1 = __importDefault(require("@/lib/info.json"));
var sidebar_1 = require("@/components/ui/sidebar");
var api_1 = require("@/lib/api");
var react_router_1 = require("react-router");
var lucide_react_1 = require("lucide-react");
var connection_status_1 = __importDefault(require("./connection-status"));
function AppSidebar() {
    var _a;
    var location = (0, react_router_1.useLocation)();
    var query = (0, react_query_1.useQuery)({
        queryKey: ["agents"],
        queryFn: function () { return api_1.apiClient.getAgents(); },
        refetchInterval: 5000,
    });
    var agents = (_a = query === null || query === void 0 ? void 0 : query.data) === null || _a === void 0 ? void 0 : _a.agents;
    return ((0, jsx_runtime_1.jsxs)(sidebar_1.Sidebar, { children: [(0, jsx_runtime_1.jsx)(sidebar_1.SidebarHeader, { children: (0, jsx_runtime_1.jsx)(sidebar_1.SidebarMenu, { children: (0, jsx_runtime_1.jsx)(sidebar_1.SidebarMenuItem, { children: (0, jsx_runtime_1.jsx)(sidebar_1.SidebarMenuButton, { size: "lg", asChild: true, children: (0, jsx_runtime_1.jsxs)(react_router_1.NavLink, { to: "/", children: [(0, jsx_runtime_1.jsx)("img", { src: "/elizaos-icon.png", width: "100%", height: "100%", className: "size-7" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5 leading-none", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-semibold", children: "ElizaOS" }), (0, jsx_runtime_1.jsxs)("span", { className: "", children: ["v", info_json_1.default === null || info_json_1.default === void 0 ? void 0 : info_json_1.default.version] })] })] }) }) }) }) }), (0, jsx_runtime_1.jsx)(sidebar_1.SidebarContent, { children: (0, jsx_runtime_1.jsxs)(sidebar_1.SidebarGroup, { children: [(0, jsx_runtime_1.jsx)(sidebar_1.SidebarGroupLabel, { children: "Agents" }), (0, jsx_runtime_1.jsx)(sidebar_1.SidebarGroupContent, { children: (0, jsx_runtime_1.jsx)(sidebar_1.SidebarMenu, { children: (query === null || query === void 0 ? void 0 : query.isPending) ? ((0, jsx_runtime_1.jsx)("div", { children: Array.from({ length: 5 }).map(function (_, index) { return ((0, jsx_runtime_1.jsx)(sidebar_1.SidebarMenuItem, { children: (0, jsx_runtime_1.jsx)(sidebar_1.SidebarMenuSkeleton, {}) }, index)); }) })) : ((0, jsx_runtime_1.jsx)("div", { children: agents === null || agents === void 0 ? void 0 : agents.map(function (agent) { return ((0, jsx_runtime_1.jsx)(sidebar_1.SidebarMenuItem, { children: (0, jsx_runtime_1.jsx)(react_router_1.NavLink, { to: "/chat/".concat(agent.id), children: (0, jsx_runtime_1.jsxs)(sidebar_1.SidebarMenuButton, { isActive: location.pathname.includes(agent.id), children: [(0, jsx_runtime_1.jsx)(lucide_react_1.User, {}), (0, jsx_runtime_1.jsx)("span", { children: agent.name })] }) }) }, agent.id)); }) })) }) })] }) }), (0, jsx_runtime_1.jsx)(sidebar_1.SidebarFooter, { children: (0, jsx_runtime_1.jsxs)(sidebar_1.SidebarMenu, { children: [(0, jsx_runtime_1.jsx)(sidebar_1.SidebarMenuItem, { children: (0, jsx_runtime_1.jsx)(react_router_1.NavLink, { to: "https://elizaos.github.io/eliza/docs/intro/", target: "_blank", children: (0, jsx_runtime_1.jsxs)(sidebar_1.SidebarMenuButton, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Book, {}), " Documentation"] }) }) }), (0, jsx_runtime_1.jsx)(sidebar_1.SidebarMenuItem, { children: (0, jsx_runtime_1.jsxs)(sidebar_1.SidebarMenuButton, { disabled: true, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Cog, {}), " Settings"] }) }), (0, jsx_runtime_1.jsx)(connection_status_1.default, {})] }) })] }));
}
