"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatAgentName = exports.moment = void 0;
exports.cn = cn;
var clsx_1 = require("clsx");
var tailwind_merge_1 = require("tailwind-merge");
var dayjs_1 = __importDefault(require("dayjs"));
var localizedFormat_1 = __importDefault(require("dayjs/plugin/localizedFormat"));
function cn() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
}
dayjs_1.default.extend(localizedFormat_1.default);
exports.moment = dayjs_1.default;
var formatAgentName = function (name) {
    return name.substring(0, 2);
};
exports.formatAgentName = formatAgentName;
