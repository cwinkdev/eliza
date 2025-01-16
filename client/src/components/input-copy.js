"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InputCopy;
var jsx_runtime_1 = require("react/jsx-runtime");
var input_1 = require("./ui/input");
var label_1 = require("./ui/label");
function InputCopy(_a) {
    var title = _a.title, value = _a.value;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { children: title }), (0, jsx_runtime_1.jsx)(input_1.Input, { value: value, readOnly: true })] }));
}
