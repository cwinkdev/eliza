"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ArrayInput;
var jsx_runtime_1 = require("react/jsx-runtime");
var input_1 = require("./ui/input");
var label_1 = require("./ui/label");
function ArrayInput(_a) {
    var title = _a.title, data = _a.data;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { children: title }), (0, jsx_runtime_1.jsx)("div", { className: "p-2 bg-card rounded-md border", children: (0, jsx_runtime_1.jsx)("div", { className: "space-y-2", children: data === null || data === void 0 ? void 0 : data.map(function (b, idx) { return ((0, jsx_runtime_1.jsx)(input_1.Input, { value: b, className: "bg-background" }, idx)); }) }) })] }));
}
