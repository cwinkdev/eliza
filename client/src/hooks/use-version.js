"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useVersion;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var use_toast_1 = require("./use-toast");
var info_json_1 = __importDefault(require("@/lib/info.json"));
var semver_1 = __importDefault(require("semver"));
var toast_1 = require("@/components/ui/toast");
var react_router_1 = require("react-router");
function useVersion() {
    var _this = this;
    var toast = (0, use_toast_1.useToast)().toast;
    function getLatestRelease(repo) {
        return __awaiter(this, void 0, void 0, function () {
            var apiUrl, response, data, latestVersion, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apiUrl = "https://api.github.com/repos/".concat(repo, "/releases/latest");
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(apiUrl, {
                                headers: {
                                    Accept: "application/vnd.github.v3+json",
                                    "User-Agent": "fetch-latest-release",
                                },
                            })];
                    case 2:
                        response = _b.sent();
                        if (!response.ok) {
                            throw new Error("Failed to fetch latest release: ".concat(response.status, " ").concat(response.statusText));
                        }
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _b.sent();
                        latestVersion = data.tag_name;
                        return [2 /*return*/, latestVersion];
                    case 4:
                        _a = _b.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    var compareVersion = function () { return __awaiter(_this, void 0, void 0, function () {
        var latestVersion, thisVersion, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getLatestRelease("elizaos/eliza")];
                case 1:
                    latestVersion = _a.sent();
                    thisVersion = info_json_1.default === null || info_json_1.default === void 0 ? void 0 : info_json_1.default.version;
                    if (latestVersion && thisVersion) {
                        if (semver_1.default.gt(latestVersion.replace("v", ""), thisVersion.replace("v", ""))) {
                            toast({
                                variant: "default",
                                title: "New version ".concat(latestVersion, " is available."),
                                description: "Visit GitHub for more information.",
                                action: ((0, jsx_runtime_1.jsx)(react_router_1.NavLink, { to: "https://github.com/elizaos/eliza/releases", target: "_blank", children: (0, jsx_runtime_1.jsx)(toast_1.ToastAction, { altText: "Update", children: "Update" }) })),
                            });
                        }
                    }
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    console.error("Unable to retrieve latest version from GitHub");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        compareVersion();
    }, []);
    return null;
}
