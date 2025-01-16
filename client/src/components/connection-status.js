"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ConnectionStatus;
var jsx_runtime_1 = require("react/jsx-runtime");
var utils_1 = require("@/lib/utils");
var sidebar_1 = require("./ui/sidebar");
var react_query_1 = require("@tanstack/react-query");
var api_1 = require("@/lib/api");
var react_1 = require("react");
var tooltip_1 = require("./ui/tooltip");
var lucide_react_1 = require("lucide-react");
function ConnectionStatus() {
    var _this = this;
    var _a = (0, react_1.useState)(null), queryTime = _a[0], setQueryTime = _a[1];
    var query = (0, react_query_1.useQuery)({
        queryKey: ["status"],
        queryFn: function () { return __awaiter(_this, void 0, void 0, function () {
            var start, data, end;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        start = performance.now();
                        return [4 /*yield*/, api_1.apiClient.getAgents()];
                    case 1:
                        data = _a.sent();
                        end = performance.now();
                        setQueryTime(end - start);
                        return [2 /*return*/, data];
                }
            });
        }); },
        refetchInterval: 5000,
        retry: 1,
        refetchOnWindowFocus: "always",
    });
    var connected = (query === null || query === void 0 ? void 0 : query.isSuccess) && !(query === null || query === void 0 ? void 0 : query.isError);
    var isLoading = (query === null || query === void 0 ? void 0 : query.isRefetching) || (query === null || query === void 0 ? void 0 : query.isPending);
    return ((0, jsx_runtime_1.jsx)(sidebar_1.SidebarMenuItem, { children: (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, { children: [(0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, { asChild: true, children: (0, jsx_runtime_1.jsx)(sidebar_1.SidebarMenuButton, { children: (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-1 select-none transition-all duration-200", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)([
                                            "h-2.5 w-2.5 rounded-full",
                                            isLoading
                                                ? "bg-muted-foreground"
                                                : connected
                                                    ? "bg-green-600"
                                                    : "bg-red-600",
                                        ]) }), (0, jsx_runtime_1.jsx)("span", { className: (0, utils_1.cn)([
                                            "text-xs",
                                            isLoading
                                                ? "text-muted-foreground"
                                                : connected
                                                    ? "text-green-600"
                                                    : "text-red-600",
                                        ]), children: isLoading
                                            ? "Connecting..."
                                            : connected
                                                ? "Connected"
                                                : "Disconnected" })] }) }) }) }), connected ? ((0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, { side: "top", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Activity, { className: "size-4" }), (0, jsx_runtime_1.jsxs)("span", { children: [queryTime === null || queryTime === void 0 ? void 0 : queryTime.toFixed(2), " ms"] })] }) })) : null] }) }));
}
