"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChatTtsButton;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var button_1 = require("../button");
var react_query_1 = require("@tanstack/react-query");
var react_1 = require("react");
var api_1 = require("@/lib/api");
var tooltip_1 = require("../tooltip");
var use_toast_1 = require("@/hooks/use-toast");
function ChatTtsButton(_a) {
    var agentId = _a.agentId, text = _a.text;
    var toast = (0, use_toast_1.useToast)().toast;
    var _b = (0, react_1.useState)(false), playing = _b[0], setPlaying = _b[1];
    var _c = (0, react_1.useState)(null), audioBlob = _c[0], setAudioBlob = _c[1];
    var audioRef = (0, react_1.useRef)(null);
    var mutation = (0, react_query_1.useMutation)({
        mutationKey: ["tts", text],
        mutationFn: function () { return api_1.apiClient.tts(agentId, text); },
        onSuccess: function (data) {
            setAudioBlob(data);
            play();
        },
        onError: function (e) {
            toast({
                variant: "destructive",
                title: "Unable to read message aloud",
                description: e.message,
            });
        },
    });
    var play = function () {
        if (audioRef.current) {
            audioRef.current.play().catch(function (err) {
                console.error("Error playing audio:", err);
            });
        }
        setPlaying(true);
    };
    var stop = function () {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setPlaying(false);
    };
    var execute = function () {
        if (mutation === null || mutation === void 0 ? void 0 : mutation.isPending)
            return;
        if (playing) {
            stop();
            return;
        }
        if (audioBlob) {
            play();
            return;
        }
        else {
            mutation.mutate();
        }
    };
    var iconClass = "text-muted-foreground size-4";
    return ((0, jsx_runtime_1.jsxs)("div", { children: [audioBlob ? ((0, jsx_runtime_1.jsxs)("audio", { ref: audioRef, onEnded: function () {
                    setPlaying(false);
                }, autoPlay: true, children: [(0, jsx_runtime_1.jsx)("source", { src: URL.createObjectURL(audioBlob), type: "audio/mpeg" }), "Your browser does not support the audio element."] })) : null, (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, { children: [(0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, { asChild: true, children: (0, jsx_runtime_1.jsx)(button_1.Button, { size: "icon", variant: "ghost", type: "button", onClick: function () { return execute(); }, disabled: mutation === null || mutation === void 0 ? void 0 : mutation.isPending, children: (mutation === null || mutation === void 0 ? void 0 : mutation.isPending) ? ((0, jsx_runtime_1.jsx)(lucide_react_1.Ellipsis, { className: iconClass })) : playing ? ((0, jsx_runtime_1.jsx)(lucide_react_1.StopCircle, { className: iconClass })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.Volume2, { className: iconClass })) }) }), (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, { side: "bottom", children: (0, jsx_runtime_1.jsx)("p", { children: playing ? "Stop" : "Read aloud" }) })] })] }));
}
