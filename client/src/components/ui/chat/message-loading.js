"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MessageLoading;
var jsx_runtime_1 = require("react/jsx-runtime");
// @hidden
function MessageLoading() {
    return ((0, jsx_runtime_1.jsxs)("svg", { width: "24", height: "24", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", className: "text-foreground", children: [(0, jsx_runtime_1.jsx)("circle", { cx: "4", cy: "12", r: "2", fill: "currentColor", children: (0, jsx_runtime_1.jsx)("animate", { id: "spinner_qFRN", begin: "0;spinner_OcgL.end+0.25s", attributeName: "cy", calcMode: "spline", dur: "0.6s", values: "12;6;12", keySplines: ".33,.66,.66,1;.33,0,.66,.33" }) }), (0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "12", r: "2", fill: "currentColor", children: (0, jsx_runtime_1.jsx)("animate", { begin: "spinner_qFRN.begin+0.1s", attributeName: "cy", calcMode: "spline", dur: "0.6s", values: "12;6;12", keySplines: ".33,.66,.66,1;.33,0,.66,.33" }) }), (0, jsx_runtime_1.jsx)("circle", { cx: "20", cy: "12", r: "2", fill: "currentColor", children: (0, jsx_runtime_1.jsx)("animate", { id: "spinner_OcgL", begin: "spinner_qFRN.begin+0.2s", attributeName: "cy", calcMode: "spline", dur: "0.6s", values: "12;6;12", keySplines: ".33,.66,.66,1;.33,0,.66,.33" }) })] }));
}
