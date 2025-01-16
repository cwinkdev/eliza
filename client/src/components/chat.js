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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Page;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var chat_bubble_1 = require("@/components/ui/chat/chat-bubble");
var chat_input_1 = require("@/components/ui/chat/chat-input");
var chat_message_list_1 = require("@/components/ui/chat/chat-message-list");
var web_1 = require("@react-spring/web");
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
var react_query_1 = require("@tanstack/react-query");
var api_1 = require("@/lib/api");
var utils_1 = require("@/lib/utils");
var avatar_1 = require("./ui/avatar");
var copy_button_1 = __importDefault(require("./copy-button"));
var chat_tts_button_1 = __importDefault(require("./ui/chat/chat-tts-button"));
var tooltip_1 = require("./ui/tooltip");
var use_toast_1 = require("@/hooks/use-toast");
var react_aiwriter_1 = __importDefault(require("react-aiwriter"));
var audio_recorder_1 = require("./audio-recorder");
var badge_1 = require("./ui/badge");
function Page(_a) {
    var agentId = _a.agentId;
    var toast = (0, use_toast_1.useToast)().toast;
    var _b = (0, react_1.useState)(null), selectedFile = _b[0], setSelectedFile = _b[1];
    var _c = (0, react_1.useState)(""), input = _c[0], setInput = _c[1];
    var messagesContainerRef = (0, react_1.useRef)(null);
    var inputRef = (0, react_1.useRef)(null);
    var fileInputRef = (0, react_1.useRef)(null);
    var formRef = (0, react_1.useRef)(null);
    var queryClient = (0, react_query_1.useQueryClient)();
    var getMessageVariant = function (role) {
        return role !== "user" ? "received" : "sent";
    };
    var scrollToBottom = function () {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
        }
    };
    (0, react_1.useEffect)(function () {
        scrollToBottom();
    }, [queryClient.getQueryData(["messages", agentId])]);
    (0, react_1.useEffect)(function () {
        scrollToBottom();
    }, []);
    var handleKeyDown = function (e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (e.nativeEvent.isComposing)
                return;
            handleSendMessage(e);
        }
    };
    var handleSendMessage = function (e) {
        var _a;
        e.preventDefault();
        if (!input)
            return;
        var attachments = selectedFile
            ? [
                {
                    url: URL.createObjectURL(selectedFile),
                    contentType: selectedFile.type,
                    title: selectedFile.name,
                },
            ]
            : undefined;
        var newMessages = [
            {
                text: input,
                user: "user",
                createdAt: Date.now(),
                attachments: attachments,
            },
            {
                text: input,
                user: "system",
                isLoading: true,
                createdAt: Date.now(),
            },
        ];
        queryClient.setQueryData(["messages", agentId], function (old) {
            if (old === void 0) { old = []; }
            return __spreadArray(__spreadArray([], old, true), newMessages, true);
        });
        sendMessageMutation.mutate({
            message: input,
            selectedFile: selectedFile ? selectedFile : null,
        });
        setSelectedFile(null);
        setInput("");
        (_a = formRef.current) === null || _a === void 0 ? void 0 : _a.reset();
    };
    (0, react_1.useEffect)(function () {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);
    var sendMessageMutation = (0, react_query_1.useMutation)({
        mutationKey: ["send_message", agentId],
        mutationFn: function (_a) {
            var message = _a.message, selectedFile = _a.selectedFile;
            return api_1.apiClient.sendMessage(agentId, message, selectedFile);
        },
        onSuccess: function (newMessages) {
            queryClient.setQueryData(["messages", agentId], function (old) {
                if (old === void 0) { old = []; }
                return __spreadArray(__spreadArray([], old.filter(function (msg) { return !msg.isLoading; }), true), newMessages.map(function (msg) { return (__assign(__assign({}, msg), { createdAt: Date.now() })); }), true);
            });
        },
        onError: function (e) {
            toast({
                variant: "destructive",
                title: "Unable to send message",
                description: e.message,
            });
        },
    });
    var handleFileChange = function (e) {
        var _a;
        var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file && file.type.startsWith("image/")) {
            setSelectedFile(file);
        }
    };
    var messages = queryClient.getQueryData(["messages", agentId]) ||
        [];
    var transitions = (0, web_1.useTransition)(messages, {
        keys: function (message) {
            return "".concat(message.createdAt, "-").concat(message.user, "-").concat(message.text);
        },
        from: { opacity: 0, transform: "translateY(50px)" },
        enter: { opacity: 1, transform: "translateY(0px)" },
        leave: { opacity: 0, transform: "translateY(10px)" },
    });
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col w-full h-[calc(100dvh)] p-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex-1 overflow-y-auto", children: (0, jsx_runtime_1.jsx)(chat_message_list_1.ChatMessageList, { ref: messagesContainerRef, children: transitions(function (styles, message) {
                        var _a;
                        var variant = getMessageVariant(message === null || message === void 0 ? void 0 : message.user);
                        return (
                        // @ts-expect-error
                        (0, jsx_runtime_1.jsx)(web_1.animated.div, { style: styles, className: "flex flex-col gap-2 p-4", children: (0, jsx_runtime_1.jsxs)(chat_bubble_1.ChatBubble, { variant: variant, className: "flex flex-row items-center gap-2", children: [(message === null || message === void 0 ? void 0 : message.user) !== "user" ? ((0, jsx_runtime_1.jsx)(avatar_1.Avatar, { className: "size-8 p-1 border rounded-full select-none", children: (0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, { src: "/elizaos-icon.png" }) })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", children: [(0, jsx_runtime_1.jsxs)(chat_bubble_1.ChatBubbleMessage, { isLoading: message === null || message === void 0 ? void 0 : message.isLoading, children: [(message === null || message === void 0 ? void 0 : message.user) !== "user" ? ((0, jsx_runtime_1.jsx)(react_aiwriter_1.default, { children: message === null || message === void 0 ? void 0 : message.text })) : (message === null || message === void 0 ? void 0 : message.text), (0, jsx_runtime_1.jsx)("div", { children: (_a = message === null || message === void 0 ? void 0 : message.attachments) === null || _a === void 0 ? void 0 : _a.map(function (attachment, idx) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1 mt-2", children: [(0, jsx_runtime_1.jsx)("img", { src: attachment.url, width: "100%", height: "100%", className: "w-64 rounded-md" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-4", children: [(0, jsx_runtime_1.jsx)("span", {}), (0, jsx_runtime_1.jsx)("span", {})] })] }, idx)); }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4 justify-between w-full mt-1", children: [(message === null || message === void 0 ? void 0 : message.text) &&
                                                        !(message === null || message === void 0 ? void 0 : message.isLoading) ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(copy_button_1.default, { text: message === null || message === void 0 ? void 0 : message.text }), (0, jsx_runtime_1.jsx)(chat_tts_button_1.default, { agentId: agentId, text: message === null || message === void 0 ? void 0 : message.text })] })) : null, (0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)([
                                                            (message === null || message === void 0 ? void 0 : message.isLoading)
                                                                ? "mt-2"
                                                                : "",
                                                            "flex items-center justify-between gap-4 select-none",
                                                        ]), children: [(message === null || message === void 0 ? void 0 : message.source) ? ((0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "outline", children: message.source })) : null, (message === null || message === void 0 ? void 0 : message.action) ? ((0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "outline", children: message.action })) : null, (message === null || message === void 0 ? void 0 : message.createdAt) ? ((0, jsx_runtime_1.jsx)(chat_bubble_1.ChatBubbleTimestamp, { timestamp: (0, utils_1.moment)(message === null || message === void 0 ? void 0 : message.createdAt).format("LT") })) : null] })] })] })] }) }));
                    }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "px-4 pb-4", children: (0, jsx_runtime_1.jsxs)("form", { ref: formRef, onSubmit: handleSendMessage, className: "relative rounded-md border bg-card", children: [selectedFile ? ((0, jsx_runtime_1.jsx)("div", { className: "p-3 flex", children: (0, jsx_runtime_1.jsxs)("div", { className: "relative rounded-md border p-2", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { onClick: function () { return setSelectedFile(null); }, className: "absolute -right-2 -top-2 size-[22px] ring-2 ring-background", variant: "outline", size: "icon", children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, {}) }), (0, jsx_runtime_1.jsx)("img", { src: URL.createObjectURL(selectedFile), height: "100%", width: "100%", className: "aspect-square object-contain w-16" })] }) })) : null, (0, jsx_runtime_1.jsx)(chat_input_1.ChatInput, { ref: inputRef, onKeyDown: handleKeyDown, value: input, onChange: function (_a) {
                                var target = _a.target;
                                return setInput(target.value);
                            }, placeholder: "Type your message here...", className: "min-h-12 resize-none rounded-md bg-card border-0 p-3 shadow-none focus-visible:ring-0" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center p-3 pt-0", children: [(0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, { children: [(0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "ghost", size: "icon", onClick: function () {
                                                            if (fileInputRef.current) {
                                                                fileInputRef.current.click();
                                                            }
                                                        }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Paperclip, { className: "size-4" }), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: "Attach file" })] }), (0, jsx_runtime_1.jsx)("input", { type: "file", ref: fileInputRef, onChange: handleFileChange, accept: "image/*", className: "hidden" })] }) }), (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, { side: "left", children: (0, jsx_runtime_1.jsx)("p", { children: "Attach file" }) })] }), (0, jsx_runtime_1.jsx)(audio_recorder_1.AudioRecorder, { agentId: agentId, onChange: function (newInput) { return setInput(newInput); } }), (0, jsx_runtime_1.jsxs)(button_1.Button, { disabled: !input || (sendMessageMutation === null || sendMessageMutation === void 0 ? void 0 : sendMessageMutation.isPending), type: "submit", size: "sm", className: "ml-auto gap-1.5 h-[30px]", children: [(sendMessageMutation === null || sendMessageMutation === void 0 ? void 0 : sendMessageMutation.isPending)
                                            ? "..."
                                            : "Send Message", (0, jsx_runtime_1.jsx)(lucide_react_1.Send, { className: "size-3.5" })] })] })] }) })] }));
}
