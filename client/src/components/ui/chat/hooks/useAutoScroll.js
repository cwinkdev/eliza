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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAutoScroll = useAutoScroll;
// @hidden
var react_1 = require("react");
function useAutoScroll(options) {
    if (options === void 0) { options = {}; }
    var _a = options.offset, offset = _a === void 0 ? 20 : _a, _b = options.smooth, smooth = _b === void 0 ? false : _b, content = options.content;
    var scrollRef = (0, react_1.useRef)(null);
    var lastContentHeight = (0, react_1.useRef)(0);
    var userHasScrolled = (0, react_1.useRef)(false);
    var _c = (0, react_1.useState)({
        isAtBottom: true,
        autoScrollEnabled: true,
    }), scrollState = _c[0], setScrollState = _c[1];
    var checkIsAtBottom = (0, react_1.useCallback)(function (element) {
        var scrollTop = element.scrollTop, scrollHeight = element.scrollHeight, clientHeight = element.clientHeight;
        var distanceToBottom = Math.abs(scrollHeight - scrollTop - clientHeight);
        return distanceToBottom <= offset;
    }, [offset]);
    var scrollToBottom = (0, react_1.useCallback)(function (instant) {
        if (!scrollRef.current)
            return;
        var targetScrollTop = scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
        if (instant) {
            scrollRef.current.scrollTop = targetScrollTop;
        }
        else {
            scrollRef.current.scrollTo({
                top: targetScrollTop,
                behavior: smooth ? "smooth" : "auto",
            });
        }
        setScrollState({
            isAtBottom: true,
            autoScrollEnabled: true,
        });
        userHasScrolled.current = false;
    }, [smooth]);
    var handleScroll = (0, react_1.useCallback)(function () {
        if (!scrollRef.current)
            return;
        var atBottom = checkIsAtBottom(scrollRef.current);
        setScrollState(function (prev) { return ({
            isAtBottom: atBottom,
            // Re-enable auto-scroll if at the bottom
            autoScrollEnabled: atBottom ? true : prev.autoScrollEnabled,
        }); });
    }, [checkIsAtBottom]);
    (0, react_1.useEffect)(function () {
        var element = scrollRef.current;
        if (!element)
            return;
        element.addEventListener("scroll", handleScroll, { passive: true });
        return function () { return element.removeEventListener("scroll", handleScroll); };
    }, [handleScroll]);
    (0, react_1.useEffect)(function () {
        var scrollElement = scrollRef.current;
        if (!scrollElement)
            return;
        var currentHeight = scrollElement.scrollHeight;
        var hasNewContent = currentHeight !== lastContentHeight.current;
        if (hasNewContent) {
            if (scrollState.autoScrollEnabled) {
                requestAnimationFrame(function () {
                    scrollToBottom(lastContentHeight.current === 0);
                });
            }
            lastContentHeight.current = currentHeight;
        }
    }, [content, scrollState.autoScrollEnabled, scrollToBottom]);
    (0, react_1.useEffect)(function () {
        var element = scrollRef.current;
        if (!element)
            return;
        var resizeObserver = new ResizeObserver(function () {
            if (scrollState.autoScrollEnabled) {
                scrollToBottom(true);
            }
        });
        resizeObserver.observe(element);
        return function () { return resizeObserver.disconnect(); };
    }, [scrollState.autoScrollEnabled, scrollToBottom]);
    var disableAutoScroll = (0, react_1.useCallback)(function () {
        var atBottom = scrollRef.current
            ? checkIsAtBottom(scrollRef.current)
            : false;
        // Only disable if not at bottom
        if (!atBottom) {
            userHasScrolled.current = true;
            setScrollState(function (prev) { return (__assign(__assign({}, prev), { autoScrollEnabled: false })); });
        }
    }, [checkIsAtBottom]);
    return {
        scrollRef: scrollRef,
        isAtBottom: scrollState.isAtBottom,
        autoScrollEnabled: scrollState.autoScrollEnabled,
        scrollToBottom: function () { return scrollToBottom(false); },
        disableAutoScroll: disableAutoScroll,
    };
}
