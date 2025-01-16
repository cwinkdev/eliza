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
exports.ExpandableChatFooter = exports.ExpandableChatBody = exports.ExpandableChatHeader = exports.ExpandableChat = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("@/lib/utils");
var button_1 = require("@/components/ui/button");
var chatConfig = {
    dimensions: {
        sm: "sm:max-w-sm sm:max-h-[500px]",
        md: "sm:max-w-md sm:max-h-[600px]",
        lg: "sm:max-w-lg sm:max-h-[700px]",
        xl: "sm:max-w-xl sm:max-h-[800px]",
        full: "sm:w-full sm:h-full",
    },
    positions: {
        "bottom-right": "bottom-5 right-5",
        "bottom-left": "bottom-5 left-5",
    },
    chatPositions: {
        "bottom-right": "sm:bottom-[calc(100%+10px)] sm:right-0",
        "bottom-left": "sm:bottom-[calc(100%+10px)] sm:left-0",
    },
    states: {
        open: "pointer-events-auto opacity-100 visible scale-100 translate-y-0",
        closed: "pointer-events-none opacity-0 invisible scale-100 sm:translate-y-5",
    },
};
var ExpandableChat = function (_a) {
    var className = _a.className, _b = _a.position, position = _b === void 0 ? "bottom-right" : _b, _c = _a.size, size = _c === void 0 ? "md" : _c, icon = _a.icon, children = _a.children, props = __rest(_a, ["className", "position", "size", "icon", "children"]);
    var _d = (0, react_1.useState)(false), isOpen = _d[0], setIsOpen = _d[1];
    var chatRef = (0, react_1.useRef)(null);
    var toggleChat = function () { return setIsOpen(!isOpen); };
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: (0, utils_1.cn)("fixed ".concat(chatConfig.positions[position], " z-50"), className) }, props, { children: [(0, jsx_runtime_1.jsxs)("div", { ref: chatRef, className: (0, utils_1.cn)("flex flex-col bg-background border sm:rounded-md shadow-md overflow-hidden transition-all duration-250 ease-out sm:absolute sm:w-[90vw] sm:h-[80vh] fixed inset-0 w-full h-full sm:inset-auto", chatConfig.chatPositions[position], chatConfig.dimensions[size], isOpen ? chatConfig.states.open : chatConfig.states.closed, className), children: [children, (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "icon", className: "absolute top-2 right-2 sm:hidden", onClick: toggleChat, children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "h-4 w-4" }) })] }), (0, jsx_runtime_1.jsx)(ExpandableChatToggle, { icon: icon, isOpen: isOpen, toggleChat: toggleChat })] })));
};
exports.ExpandableChat = ExpandableChat;
ExpandableChat.displayName = "ExpandableChat";
var ExpandableChatHeader = function (_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: (0, utils_1.cn)("flex items-center justify-between p-4 border-b", className) }, props)));
};
exports.ExpandableChatHeader = ExpandableChatHeader;
ExpandableChatHeader.displayName = "ExpandableChatHeader";
var ExpandableChatBody = function (_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (0, jsx_runtime_1.jsx)("div", __assign({ className: (0, utils_1.cn)("flex-grow overflow-y-auto", className) }, props));
};
exports.ExpandableChatBody = ExpandableChatBody;
ExpandableChatBody.displayName = "ExpandableChatBody";
var ExpandableChatFooter = function (_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (0, jsx_runtime_1.jsx)("div", __assign({ className: (0, utils_1.cn)("border-t p-4", className) }, props));
};
exports.ExpandableChatFooter = ExpandableChatFooter;
ExpandableChatFooter.displayName = "ExpandableChatFooter";
var ExpandableChatToggle = function (_a) {
    var className = _a.className, icon = _a.icon, isOpen = _a.isOpen, toggleChat = _a.toggleChat, props = __rest(_a, ["className", "icon", "isOpen", "toggleChat"]);
    return ((0, jsx_runtime_1.jsx)(button_1.Button, __assign({ variant: "default", onClick: toggleChat, className: (0, utils_1.cn)("w-14 h-14 rounded-full shadow-md flex items-center justify-center hover:shadow-lg hover:shadow-black/30 transition-all duration-300", className) }, props, { children: isOpen ? ((0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "h-6 w-6" })) : (icon || (0, jsx_runtime_1.jsx)(lucide_react_1.MessageCircle, { className: "h-6 w-6" })) })));
};
ExpandableChatToggle.displayName = "ExpandableChatToggle";
