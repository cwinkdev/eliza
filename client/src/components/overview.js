"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Overview;
var jsx_runtime_1 = require("react/jsx-runtime");
var array_input_1 = __importDefault(require("@/components/array-input"));
var input_copy_1 = __importDefault(require("@/components/input-copy"));
var page_title_1 = __importDefault(require("./page-title"));
function Overview(_a) {
    var _b, _c;
    var character = _a.character;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "p-4", children: [(0, jsx_runtime_1.jsx)(page_title_1.default, { title: "Overview", subtitle: "An overview of your selected AI Agent." }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsx)(input_copy_1.default, { title: "Name", value: character === null || character === void 0 ? void 0 : character.name }), (0, jsx_runtime_1.jsx)(input_copy_1.default, { title: "Username", value: character === null || character === void 0 ? void 0 : character.username }), (0, jsx_runtime_1.jsx)(input_copy_1.default, { title: "System", value: character === null || character === void 0 ? void 0 : character.system }), (0, jsx_runtime_1.jsx)(input_copy_1.default, { title: "Model", value: character === null || character === void 0 ? void 0 : character.modelProvider }), (0, jsx_runtime_1.jsx)(input_copy_1.default, { title: "Voice Model", value: (_c = (_b = character === null || character === void 0 ? void 0 : character.settings) === null || _b === void 0 ? void 0 : _b.voice) === null || _c === void 0 ? void 0 : _c.model }), (0, jsx_runtime_1.jsx)(array_input_1.default, { title: "Bio", data: typeof (character === null || character === void 0 ? void 0 : character.bio) === "object" ? character === null || character === void 0 ? void 0 : character.bio : [] }), (0, jsx_runtime_1.jsx)(array_input_1.default, { title: "Lore", data: typeof (character === null || character === void 0 ? void 0 : character.lore) === "object"
                            ? character === null || character === void 0 ? void 0 : character.lore
                            : [] })] })] }));
}
