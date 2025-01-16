"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var tooltip_1 = require("./ui/tooltip");
var CopyButton = function (_a) {
    var text = _a.text;
    var _b = (0, react_1.useState)(false), copied = _b[0], setCopied = _b[1];
    var handleCopy = function () {
        navigator.clipboard.writeText(text).then(function () {
            setCopied(true);
            setTimeout(function () { return setCopied(false); }, 2000); // Reset after 2 seconds
        });
    };
    return ((0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, { children: [(0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, { asChild: true, children: (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: handleCopy, variant: "ghost", size: "icon", className: "flex items-center space-x-2 text-muted-foreground", children: copied ? ((0, jsx_runtime_1.jsx)(lucide_react_1.Check, { className: "size-4" })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.Copy, { className: "size-4" })) }) }), (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, { side: "bottom", children: (0, jsx_runtime_1.jsx)("p", { children: "Copy" }) })] }));
};
exports.default = CopyButton;
