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
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiClient = void 0;
var BASE_URL = "http://localhost:3000";
var fetcher = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var options;
    var url = _b.url, method = _b.method, body = _b.body, headers = _b.headers;
    return __generator(this, function (_c) {
        options = {
            method: method !== null && method !== void 0 ? method : "GET",
            headers: headers
                ? headers
                : {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
        };
        if (method === "POST") {
            if (body instanceof FormData) {
                // @ts-expect-error - Supressing potentially undefined options header
                delete options.headers["Content-Type"];
                options.body = body;
            }
            else {
                options.body = JSON.stringify(body);
            }
        }
        return [2 /*return*/, fetch("".concat(BASE_URL).concat(url), options).then(function (resp) { return __awaiter(void 0, void 0, void 0, function () {
                var contentType, errorText, errorMessage, errorObj;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!resp.ok) return [3 /*break*/, 3];
                            contentType = resp.headers.get("Content-Type");
                            if (!(contentType === "audio/mpeg")) return [3 /*break*/, 2];
                            return [4 /*yield*/, resp.blob()];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2: return [2 /*return*/, resp.json()];
                        case 3: return [4 /*yield*/, resp.text()];
                        case 4:
                            errorText = _a.sent();
                            console.error("Error: ", errorText);
                            errorMessage = "An error occurred.";
                            try {
                                errorObj = JSON.parse(errorText);
                                errorMessage = errorObj.message || errorMessage;
                            }
                            catch (_b) {
                                errorMessage = errorText || errorMessage;
                            }
                            throw new Error(errorMessage);
                    }
                });
            }); })];
    });
}); };
exports.apiClient = {
    sendMessage: function (agentId, message, selectedFile) {
        var formData = new FormData();
        formData.append("text", message);
        formData.append("user", "user");
        if (selectedFile) {
            formData.append("file", selectedFile);
        }
        return fetcher({
            url: "/".concat(agentId, "/message"),
            method: "POST",
            body: formData,
        });
    },
    getAgents: function () { return fetcher({ url: "/agents" }); },
    getAgent: function (agentId) {
        return fetcher({ url: "/agents/".concat(agentId) });
    },
    tts: function (agentId, text) {
        return fetcher({
            url: "/".concat(agentId, "/tts"),
            method: "POST",
            body: {
                text: text,
            },
            headers: {
                "Content-Type": "application/json",
                Accept: "audio/mpeg",
                "Transfer-Encoding": "chunked",
            },
        });
    },
    whisper: function (agentId, audioBlob) { return __awaiter(void 0, void 0, void 0, function () {
        var formData;
        return __generator(this, function (_a) {
            formData = new FormData();
            formData.append("file", audioBlob, "recording.wav");
            return [2 /*return*/, fetcher({
                    url: "/".concat(agentId, "/whisper"),
                    method: "POST",
                    body: formData,
                })];
        });
    }); },
};
