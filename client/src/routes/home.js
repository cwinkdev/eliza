"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_query_1 = require("@tanstack/react-query");
var lucide_react_1 = require("lucide-react");
var page_title_1 = __importDefault(require("@/components/page-title"));
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var api_1 = require("@/lib/api");
var react_router_1 = require("react-router");
var utils_1 = require("@/lib/utils");
function Home() {
    var _a;
    var query = (0, react_query_1.useQuery)({
        queryKey: ["agents"],
        queryFn: function () { return api_1.apiClient.getAgents(); },
        refetchInterval: 5000
    });
    var agents = (_a = query === null || query === void 0 ? void 0 : query.data) === null || _a === void 0 ? void 0 : _a.agents;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-4 h-full p-4", children: [(0, jsx_runtime_1.jsx)(page_title_1.default, { title: "Agents" }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: agents === null || agents === void 0 ? void 0 : agents.map(function (agent) { return ((0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: agent === null || agent === void 0 ? void 0 : agent.name }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)("div", { className: "rounded-md bg-muted aspect-square w-full grid place-items-center", children: (0, jsx_runtime_1.jsx)("div", { className: "text-6xl font-bold uppercase", children: (0, utils_1.formatAgentName)(agent === null || agent === void 0 ? void 0 : agent.name) }) }) }), (0, jsx_runtime_1.jsx)(card_1.CardFooter, { children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4 w-full", children: [(0, jsx_runtime_1.jsx)(react_router_1.NavLink, { to: "/chat/".concat(agent.id), className: "w-full grow", children: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", className: "w-full grow", children: "Chat" }) }), (0, jsx_runtime_1.jsx)(react_router_1.NavLink, { to: "/settings/".concat(agent.id), children: (0, jsx_runtime_1.jsx)(button_1.Button, { size: "icon", variant: "outline", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Cog, {}) }) }, agent.id)] }) })] }, agent.id)); }) })] }));
}
