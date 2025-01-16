"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AgentRoute;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_query_1 = require("@tanstack/react-query");
var api_1 = require("@/lib/api");
var overview_1 = __importDefault(require("@/components/overview"));
var react_router_1 = require("react-router");
function AgentRoute() {
    var _a;
    var agentId = (0, react_router_1.useParams)().agentId;
    if (!agentId)
        return (0, jsx_runtime_1.jsx)("div", { children: "No data." });
    var query = (0, react_query_1.useQuery)({
        queryKey: ["agent", agentId],
        queryFn: function () { return api_1.apiClient.getAgent(agentId); },
        refetchInterval: 5000,
    });
    var character = (_a = query === null || query === void 0 ? void 0 : query.data) === null || _a === void 0 ? void 0 : _a.character;
    if (!character)
        return null;
    return (0, jsx_runtime_1.jsx)(overview_1.default, { character: character });
}
