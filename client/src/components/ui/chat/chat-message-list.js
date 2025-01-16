"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessageList = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var React = __importStar(require("react"));
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var useAutoScroll_1 = require("@/components/ui/chat/hooks/useAutoScroll");
var ChatMessageList = React.forwardRef(function (_a, _ref) {
    var className = _a.className, children = _a.children, _b = _a.smooth, smooth = _b === void 0 ? false : _b, props = __rest(_a, ["className", "children", "smooth"]);
    var _c = (0, useAutoScroll_1.useAutoScroll)({
        smooth: smooth,
        content: children,
    }), scrollRef = _c.scrollRef, isAtBottom = _c.isAtBottom, scrollToBottom = _c.scrollToBottom, disableAutoScroll = _c.disableAutoScroll;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative w-full h-full", children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "flex flex-col w-full h-full p-4 overflow-y-auto ".concat(className), ref: scrollRef, onWheel: disableAutoScroll, onTouchMove: disableAutoScroll }, props, { children: (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-6", children: children }) })), !isAtBottom && ((0, jsx_runtime_1.jsx)(button_1.Button, { onClick: function () {
                    scrollToBottom();
                }, size: "icon", variant: "outline", className: "absolute bottom-2 left-1/2 transform -translate-x-1/2 inline-flex rounded-full shadow-md", children: (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowDown, { className: "h-4 w-4" }) }))] }));
});
exports.ChatMessageList = ChatMessageList;
ChatMessageList.displayName = "ChatMessageList";
