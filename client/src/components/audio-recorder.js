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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioRecorder = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var tooltip_1 = require("@/components/ui/tooltip");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("@/lib/utils");
var use_toast_1 = require("@/hooks/use-toast");
var react_query_1 = require("@tanstack/react-query");
var api_1 = require("@/lib/api");
var recorder;
var recordingChunks = [];
var timerTimeout;
// Utility function to pad a number with leading zeros
var padWithLeadingZeros = function (num, length) {
    return String(num).padStart(length, "0");
};
var AudioRecorder = function (_a) {
    var className = _a.className, timerClassName = _a.timerClassName, agentId = _a.agentId, onChange = _a.onChange;
    var toast = (0, use_toast_1.useToast)().toast;
    // States
    var _b = (0, react_1.useState)(false), isRecording = _b[0], setIsRecording = _b[1];
    // @ts-expect-error - isRecordingFinished is unused, but would break the 2D array if removed
    var _c = (0, react_1.useState)(false), isRecordingFinished = _c[0], setIsRecordingFinished = _c[1];
    var _d = (0, react_1.useState)(0), timer = _d[0], setTimer = _d[1];
    var _e = (0, react_1.useState)({
        id: -1,
        name: "",
        file: null,
    }), currentRecord = _e[0], setCurrentRecord = _e[1];
    // Calculate the hours, minutes, and seconds from the timer
    var minutes = Math.floor((timer % 3600) / 60);
    var seconds = timer % 60;
    var _f = (0, react_1.useMemo)(function () { return padWithLeadingZeros(minutes, 2).split(""); }, [minutes]), minuteLeft = _f[0], minuteRight = _f[1];
    var _g = (0, react_1.useMemo)(function () { return padWithLeadingZeros(seconds, 2).split(""); }, [seconds]), secondLeft = _g[0], secondRight = _g[1];
    // Refs
    var mediaRecorderRef = (0, react_1.useRef)({
        stream: null,
        analyser: null,
        mediaRecorder: null,
        audioContext: null,
    });
    var mutation = (0, react_query_1.useMutation)({
        mutationKey: ["whisper"],
        mutationFn: function (file) { return api_1.apiClient.whisper(agentId, file); },
        onSuccess: function (data) {
            if (data === null || data === void 0 ? void 0 : data.text) {
                onChange(data.text);
            }
        },
        onError: function (e) {
            toast({
                variant: "destructive",
                title: "Unable to start recording",
                description: e.message,
            });
            console.log(e);
        },
    });
    function startRecording() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({
                audio: true,
            })
                .then(function (stream) {
                setIsRecording(true);
                // ============ Analyzing ============
                var AudioContext = window.AudioContext;
                var audioCtx = new AudioContext();
                var analyser = audioCtx.createAnalyser();
                var source = audioCtx.createMediaStreamSource(stream);
                source.connect(analyser);
                mediaRecorderRef.current = {
                    stream: stream,
                    analyser: analyser,
                    mediaRecorder: null,
                    audioContext: audioCtx,
                };
                var mimeType = MediaRecorder.isTypeSupported("audio/mpeg")
                    ? "audio/mpeg"
                    : MediaRecorder.isTypeSupported("audio/webm")
                        ? "audio/webm"
                        : "audio/wav";
                var options = { mimeType: mimeType };
                mediaRecorderRef.current.mediaRecorder = new MediaRecorder(stream, options);
                mediaRecorderRef.current.mediaRecorder.start();
                recordingChunks = [];
                // ============ Recording ============
                recorder = new MediaRecorder(stream);
                recorder.start();
                recorder.ondataavailable = function (e) {
                    recordingChunks.push(e.data);
                };
            })
                .catch(function (e) {
                toast({
                    variant: "destructive",
                    title: "Unable to start recording",
                    description: e.message,
                });
                console.log(e);
            });
        }
    }
    function stopRecording() {
        recorder.onstop = function () {
            var recordBlob = new Blob(recordingChunks, {
                type: "audio/wav",
            });
            mutation.mutate(recordBlob);
            setCurrentRecord(__assign(__assign({}, currentRecord), { file: window.URL.createObjectURL(recordBlob) }));
            recordingChunks = [];
        };
        recorder.stop();
        setIsRecording(false);
        setIsRecordingFinished(true);
        setTimer(0);
        clearTimeout(timerTimeout);
    }
    function resetRecording() {
        var _a = mediaRecorderRef.current, mediaRecorder = _a.mediaRecorder, stream = _a.stream, analyser = _a.analyser, audioContext = _a.audioContext;
        if (mediaRecorder) {
            mediaRecorder.onstop = function () {
                recordingChunks = [];
            };
            mediaRecorder.stop();
        }
        // Stop the web audio context and the analyser node
        if (analyser) {
            analyser.disconnect();
        }
        if (stream) {
            stream.getTracks().forEach(function (track) { return track.stop(); });
        }
        if (audioContext) {
            audioContext.close();
        }
        setIsRecording(false);
        setIsRecordingFinished(true);
        setTimer(0);
        clearTimeout(timerTimeout);
    }
    var handleSubmit = function () {
        stopRecording();
    };
    // Effect to update the timer every second
    (0, react_1.useEffect)(function () {
        if (isRecording) {
            timerTimeout = setTimeout(function () {
                setTimer(timer + 1);
            }, 1000);
        }
        return function () { return clearTimeout(timerTimeout); };
    }, [isRecording, timer]);
    if (mutation === null || mutation === void 0 ? void 0 : mutation.isPending) {
        return ((0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", disabled: true, size: "icon", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Ellipsis, { className: "size-4" }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)("flex items-center justify-center gap-2 border-l border-l-transparent border-opacity-0 transition-all duration-300", {
            "border-opacity-100 border-l-border pl-2": isRecording,
        }, className), children: [isRecording ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-1 items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "bg-red-500 rounded-full h-2.5 w-2.5 animate-pulse" }), (0, jsx_runtime_1.jsx)(Timer, { minuteLeft: minuteLeft, minuteRight: minuteRight, secondLeft: secondLeft, secondRight: secondRight, timerClassName: timerClassName })] })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [isRecording ? ((0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, { children: [(0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, { asChild: true, children: (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: resetRecording, size: "icon", variant: "ghost", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash, { className: "size-4" }) }) }), (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, { className: "m-2", children: (0, jsx_runtime_1.jsx)("span", { children: " Reset recording" }) })] })) : null, (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, { children: [(0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, { asChild: true, children: !isRecording ? ((0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "ghost", size: "icon", onClick: function () { return startRecording(); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Mic, { className: "size-4" }), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: "Use Microphone" })] })) : ((0, jsx_runtime_1.jsx)(button_1.Button, { onClick: handleSubmit, variant: "ghost", size: "icon", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Send, { className: "size-4" }) })) }), (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, { side: "right", children: (0, jsx_runtime_1.jsxs)("span", { children: [!isRecording ? "Start" : "Send", " "] }) })] })] })] }));
};
exports.AudioRecorder = AudioRecorder;
var Timer = react_1.default.memo(function (_a) {
    var minuteLeft = _a.minuteLeft, minuteRight = _a.minuteRight, secondLeft = _a.secondLeft, secondRight = _a.secondRight, timerClassName = _a.timerClassName;
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)("text-sm animate-in duration-1000 fade-in-0 select-none", timerClassName), children: (0, jsx_runtime_1.jsxs)("p", { children: [minuteLeft, minuteRight, ":", secondLeft, secondRight] }) }));
});
Timer.displayName = "Timer";
