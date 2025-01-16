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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatBubbleActionWrapper = exports.ChatBubbleAction = exports.chatBubbleMessageVariants = exports.chatBubbleVariant = exports.ChatBubbleTimestamp = exports.ChatBubbleMessage = exports.ChatBubbleAvatar = exports.ChatBubble = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var React = __importStar(require("react"));
var class_variance_authority_1 = require("class-variance-authority");
var utils_1 = require("@/lib/utils");
var avatar_1 = require("@/components/ui/avatar");
var message_loading_1 = __importDefault(require("./message-loading"));
var button_1 = require("../button");
// ChatBubble
var chatBubbleVariant = (0, class_variance_authority_1.cva)("flex gap-2 max-w-[60%] items-end relative group", {
    variants: {
        variant: {
            received: "self-start",
            sent: "self-end flex-row-reverse",
        },
        layout: {
            default: "",
            ai: "max-w-full w-full items-center",
        },
    },
    defaultVariants: {
        variant: "received",
        layout: "default",
    },
});
exports.chatBubbleVariant = chatBubbleVariant;
var ChatBubble = React.forwardRef(function (_a, ref) {
    var className = _a.className, variant = _a.variant, layout = _a.layout, children = _a.children, props = __rest(_a, ["className", "variant", "layout", "children"]);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: (0, utils_1.cn)(chatBubbleVariant({ variant: variant, layout: layout, className: className }), "relative group"), ref: ref }, props, { children: React.Children.map(children, function (child) {
            return React.isValidElement(child) && typeof child.type !== "string"
                ? React.cloneElement(child, {
                    variant: variant,
                    layout: layout,
                })
                : child;
        }) })));
});
exports.ChatBubble = ChatBubble;
ChatBubble.displayName = "ChatBubble";
var ChatBubbleAvatar = function (_a) {
    var src = _a.src, fallback = _a.fallback, className = _a.className;
    return ((0, jsx_runtime_1.jsxs)(avatar_1.Avatar, { className: className, children: [(0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, { src: src, alt: "Avatar" }), (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, { children: fallback })] }));
};
exports.ChatBubbleAvatar = ChatBubbleAvatar;
// ChatBubbleMessage
var chatBubbleMessageVariants = (0, class_variance_authority_1.cva)("p-4", {
    variants: {
        variant: {
            received: "bg-secondary text-secondary-foreground rounded-r-lg rounded-tl-lg",
            sent: "bg-primary text-primary-foreground rounded-l-lg rounded-tr-lg",
        },
        layout: {
            default: "",
            ai: "border-t w-full rounded-none bg-transparent",
        },
    },
    defaultVariants: {
        variant: "received",
        layout: "default",
    },
});
exports.chatBubbleMessageVariants = chatBubbleMessageVariants;
var ChatBubbleMessage = React.forwardRef(function (_a, ref) {
    var className = _a.className, variant = _a.variant, layout = _a.layout, _b = _a.isLoading, isLoading = _b === void 0 ? false : _b, children = _a.children, props = __rest(_a, ["className", "variant", "layout", "isLoading", "children"]);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: (0, utils_1.cn)(chatBubbleMessageVariants({ variant: variant, layout: layout, className: className }), "break-words max-w-full whitespace-pre-wrap"), ref: ref }, props, { children: isLoading ? ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center space-x-2", children: (0, jsx_runtime_1.jsx)(message_loading_1.default, {}) })) : (children) })));
});
exports.ChatBubbleMessage = ChatBubbleMessage;
ChatBubbleMessage.displayName = "ChatBubbleMessage";
var ChatBubbleTimestamp = function (_a) {
    var timestamp = _a.timestamp, className = _a.className, props = __rest(_a, ["timestamp", "className"]);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: (0, utils_1.cn)("text-xs text-right select-none", className) }, props, { children: timestamp })));
};
exports.ChatBubbleTimestamp = ChatBubbleTimestamp;
var ChatBubbleAction = function (_a) {
    var icon = _a.icon, onClick = _a.onClick, className = _a.className, _b = _a.variant, variant = _b === void 0 ? "ghost" : _b, _c = _a.size, size = _c === void 0 ? "icon" : _c, props = __rest(_a, ["icon", "onClick", "className", "variant", "size"]);
    return ((0, jsx_runtime_1.jsx)(button_1.Button, __assign({ variant: variant, size: size, className: className, onClick: onClick }, props, { children: icon })));
};
exports.ChatBubbleAction = ChatBubbleAction;
var ChatBubbleActionWrapper = React.forwardRef(function (_a, ref) {
    var variant = _a.variant, className = _a.className, children = _a.children, props = __rest(_a, ["variant", "className", "children"]);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ ref: ref, className: (0, utils_1.cn)("absolute top-1/2 -translate-y-1/2 flex opacity-0 group-hover:opacity-100 transition-opacity duration-200", variant === "sent"
            ? "-left-1 -translate-x-full flex-row-reverse"
            : "-right-1 translate-x-full", className) }, props, { children: children })));
});
exports.ChatBubbleActionWrapper = ChatBubbleActionWrapper;
ChatBubbleActionWrapper.displayName = "ChatBubbleActionWrapper";
