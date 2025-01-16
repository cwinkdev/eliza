"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AgentRoute;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_1 = require("react-router");
var chat_1 = __importDefault(require("@/components/chat"));
function AgentRoute() {
    var agentId = (0, react_router_1.useParams)().agentId;
    if (!agentId)
        return (0, jsx_runtime_1.jsx)("div", { children: "No data." });
    return (0, jsx_runtime_1.jsx)(chat_1.default, { agentId: agentId });
}
