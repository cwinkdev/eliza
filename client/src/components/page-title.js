"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PageTitle;
var jsx_runtime_1 = require("react/jsx-runtime");
function PageTitle(_a) {
    var title = _a.title, subtitle = _a.subtitle;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-0.5", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold tracking-tight", children: title }), subtitle ? ((0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground", children: subtitle })) : null] }));
}
