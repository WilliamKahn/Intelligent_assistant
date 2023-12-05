/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/lib/logger.ts
var __extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __spreadArray = undefined && undefined.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};



var FrameCollection = function () {
  function FrameCollection() {
    var frames = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      frames[_i] = arguments[_i];
    }

    this.frames = frames;
  }

  FrameCollection.prototype.clear = function () {
    this.frames.length = 0;
  };

  FrameCollection.prototype.push = function (frame) {
    this.frames.push(frame);
  };

  return FrameCollection;
}();

var TraceCollection = function (_super) {
  __extends(TraceCollection, _super);

  function TraceCollection() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  TraceCollection.prototype.filter = function (callbackFn) {
    var result = new TraceCollection();
    var tempFrame;

    for (var i = 0; i < this.frames.length; i++) {
      tempFrame = this.frames[i];

      if (callbackFn(tempFrame, i, this.frames)) {
        result.push(tempFrame);
      }
    }

    return result;
  };

  TraceCollection.prototype.toStringArray = function (format) {
    var trace = [];

    for (var _i = 0, _a = this.frames; _i < _a.length; _i++) {
      var frame = _a[_i];
      trace.push(frame.toString(format));
    }

    return trace;
  };

  TraceCollection.prototype.toString = function (format) {
    var trace = [];

    for (var _i = 0, _a = this.frames; _i < _a.length; _i++) {
      var frame = _a[_i];
      trace.push(frame.toString(format));
    }

    return trace.join("\n");
  };

  return TraceCollection;
}(FrameCollection);

var LogCollection = function (_super) {
  __extends(LogCollection, _super);

  function LogCollection() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  LogCollection.prototype.filter = function (callbackFn) {
    var result = new LogCollection();
    var tempFrame;

    for (var i = 0; i < this.frames.length; i++) {
      tempFrame = this.frames[i];

      if (callbackFn(tempFrame, i, this.frames)) {
        result.push(tempFrame);
      }
    }

    return result;
  };

  LogCollection.prototype.toHtmlString = function () {
    var stack = ["<div style=\"\n                font-size: 15px;\n                font-family: monospace;\n                word-wrap:break-word;\n            \">"];

    for (var i = 0; i < this.frames.length; i++) {
      stack.push(this.frames[i].toHtmlString());
    }

    stack.push('</div>');
    return stack.join('\n');
  };

  LogCollection.prototype.toStringArray = function () {
    var stack = [];

    for (var i = 0; i < this.frames.length; i++) {
      stack.push(this.frames[i].toString());
    }

    return stack;
  };

  LogCollection.prototype.toString = function () {
    var stack = [];

    for (var i = 0; i < this.frames.length; i++) {
      stack.push(this.frames[i].toString());
    }

    return stack.join('\n');
  };

  return LogCollection;
}(FrameCollection);

var TraceStackFrame = function () {
  function TraceStackFrame(line, callerName) {
    this.line = line;
    this.callerName = callerName;
  }

  TraceStackFrame.prototype.getLine = function () {
    return this.line;
  };

  TraceStackFrame.prototype.getCallerName = function () {
    return this.callerName;
  };

  TraceStackFrame.prototype.setCallerName = function (callerName) {
    this.callerName = callerName;
  };

  TraceStackFrame.prototype.toString = function (format) {
    return (format !== null && format !== void 0 ? format : defaultFormatter)(this.line, this.callerName);
  };

  return TraceStackFrame;
}();

var LogStackFrame = function () {
  function LogStackFrame(data, scheme) {
    this.data = data;
    this.scheme = scheme !== null && scheme !== void 0 ? scheme : LoggerSchemes.log;
  }

  LogStackFrame.prototype.getLevel = function () {
    return this.scheme.level;
  };

  LogStackFrame.prototype.getData = function () {
    return this.data;
  };

  LogStackFrame.prototype.toString = function () {
    return this.data;
  };

  LogStackFrame.prototype.toHtmlString = function () {
    var htmlArray = [];
    var startTag = "<span style='color: ".concat(this.scheme.color, ";'>");
    var endTag = "</span></br>";

    for (var _i = 0, _a = this.data.split('\n'); _i < _a.length; _i++) {
      var line = _a[_i];
      line = line.replace(/[<>&"'`\/]/g, function (c) {
        return {
          '<': '&lt;',
          '>': '&gt;',
          '&': '&amp;',
          '"': '&quot;',
          '\'': '&#39;',
          '`': '&#96',
          '\/': '&#x2F'
        }[c];
      });
      htmlArray.push([startTag, line, endTag].join(''));
    }

    return htmlArray.join('\n');
  };

  return LogStackFrame;
}();

var LogLevel;

(function (LogLevel) {
  LogLevel[LogLevel["Debug"] = 0] = "Debug";
  LogLevel[LogLevel["Log"] = 1] = "Log";
  LogLevel[LogLevel["Info"] = 2] = "Info";
  LogLevel[LogLevel["Warn"] = 3] = "Warn";
  LogLevel[LogLevel["Error"] = 4] = "Error";
})(LogLevel || (LogLevel = {}));

var LoggerSchemes = function () {
  function LoggerSchemes() {}

  LoggerSchemes.trace = {
    'displayName': 'TRACE',
    'logFunction': console.verbose,
    'color': 'lightgrey',
    'level': LogLevel.Debug
  };
  LoggerSchemes.debug = {
    'displayName': 'DEBUG',
    'logFunction': console.verbose,
    'color': 'lightgrey',
    'level': LogLevel.Debug
  };
  LoggerSchemes.log = {
    'displayName': ' LOG ',
    'logFunction': console.log,
    'color': 'black',
    'level': LogLevel.Log
  };
  LoggerSchemes.info = {
    'displayName': 'INFO',
    'logFunction': console.info,
    'color': 'green',
    'level': LogLevel.Info
  };
  LoggerSchemes.warn = {
    'displayName': 'WARN',
    'logFunction': console.warn,
    'color': 'yellow',
    'level': LogLevel.Warn
  };
  LoggerSchemes.error = {
    'displayName': 'ERROR',
    'logFunction': console.error,
    'color': 'red',
    'level': LogLevel.Error
  };
  return LoggerSchemes;
}();


var LOG_STACK = new LogCollection();
var _token = null;
function getCallerName(index) {
  if (index === void 0) {
    index = 0;
  }

  var trace = sliceStackFrames(getRawStackTrace(), 1, 0);
  var stackFrames = parseTrace(trace);
  if (index < 0) index = 0;
  if (index > stackFrames.length - 1) index = stackFrames.length - 1;
  return stackFrames[index].getCallerName();
}
function getRawStackTrace(endFunction) {
  var stackTrace = {
    stack: ''
  };
  Error.captureStackTrace(stackTrace, endFunction);
  return sliceStackFrames(stackTrace.stack, 1, -2);
}
function getStackTrace(endFunction) {
  var trace = sliceStackFrames(getRawStackTrace(endFunction), 1, 0);
  return new (TraceCollection.bind.apply(TraceCollection, __spreadArray([void 0], parseTrace(trace), false)))();
}
var DEFAULT_LOG_RECORD_CONFIG = {
  needPrint: true,
  needRecord: true,
  skipCallerNumber: 1
};

var Record = function () {
  function Record() {}

  Record.setRecordLevel = function (level) {
    Record.RECORD_LEVEL = level;
  };

  Record.setDisplayLevel = function (level) {
    Record.DISPLAY_LEVEL = level;
  };

  Record.log = function (message) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    return Record.recLog(LoggerSchemes.log, DEFAULT_LOG_RECORD_CONFIG, util.format.apply(util, __spreadArray([message], args, false)));
  };

  Record.verbose = function (message) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    return Record.recLog(LoggerSchemes.debug, DEFAULT_LOG_RECORD_CONFIG, util.format.apply(util, __spreadArray([message], args, false)));
  };

  Record.info = function (message) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    return Record.recLog(LoggerSchemes.info, DEFAULT_LOG_RECORD_CONFIG, util.format.apply(util, __spreadArray([message], args, false)));
  };

  Record.warn = function (message) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    return Record.recLog(LoggerSchemes.warn, DEFAULT_LOG_RECORD_CONFIG, util.format.apply(util, __spreadArray([message], args, false)));
  };

  Record.error = function (message) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    return Record.recLog(LoggerSchemes.error, DEFAULT_LOG_RECORD_CONFIG, util.format.apply(util, __spreadArray([message], args, false)));
  };

  Record.trace = function (message) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    var trace = sliceStackFrames(getRawStackTrace(), 1, 0);
    var parsedTrace = new (TraceCollection.bind.apply(TraceCollection, __spreadArray([void 0], parseTrace(trace), false)))();
    message = util.format.apply(util, __spreadArray([message], args, false));
    return Record.recLog(LoggerSchemes.trace, DEFAULT_LOG_RECORD_CONFIG, "".concat(message, "\n").concat(parsedTrace.toString()));
  };

  Record.traceWithCustomFormatter = function (formatter, message) {
    var args = [];

    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }

    var trace = sliceStackFrames(getRawStackTrace(), 1, 0);
    var parsedTrace = new (TraceCollection.bind.apply(TraceCollection, __spreadArray([void 0], parseTrace(trace), false)))();
    message = util.format.apply(util, __spreadArray([message], args, false));
    return Record.recLog(LoggerSchemes.trace, DEFAULT_LOG_RECORD_CONFIG, "".concat(message, "\n").concat(parsedTrace.toString(formatter)));
  };

  Record.customLog = function (scheme, config, message) {
    var args = [];

    for (var _i = 3; _i < arguments.length; _i++) {
      args[_i - 3] = arguments[_i];
    }

    return Record.recLog(scheme, config, util.format.apply(util, __spreadArray([message], args, false)));
  };

  Record.recLog = function (scheme, config, logMessage) {
    var _a, _b, _c, _d;

    var detailMessage = "[".concat(scheme.displayName, "] [").concat(getCallerName(config.skipCallerNumber), "]: ").concat(logMessage);
    var showMessage = APP_ENV === "production" ? "".concat(logMessage) : "[".concat(getCallerName(config.skipCallerNumber), "]: ").concat(logMessage);
    var needRecord = (_b = (_a = config.needRecord) !== null && _a !== void 0 ? _a : scheme.needRecord) !== null && _b !== void 0 ? _b : true;

    if (needRecord && scheme.level >= Record.RECORD_LEVEL) {
      LOG_STACK.push(new LogStackFrame(detailMessage, scheme));
    }

    var needPrint = (_d = (_c = config.needPrint) !== null && _c !== void 0 ? _c : scheme.needPrint) !== null && _d !== void 0 ? _d : true;

    if (needPrint && scheme.level >= Record.DISPLAY_LEVEL) {
      scheme.logFunction(showMessage);
    }

    return detailMessage;
  };

  Record.RECORD_LEVEL = LogLevel.Debug;
  Record.DISPLAY_LEVEL = LogLevel.Debug;
  Record.debug = Record.verbose;
  return Record;
}();


function setToken(token) {
  if (token.length !== 32 || /^\d*$/.test(token)) {
    return false;
  }

  _token = token;
  return true;
}
function sendMessage(title, data) {
  var args = [];

  for (var _i = 2; _i < arguments.length; _i++) {
    args[_i - 2] = arguments[_i];
  }

  data = util.format.apply(util, __spreadArray([data], args, false));
  return sendToRemote(title, data);
}
function sendLog(logs, title, clear) {
  logs = logs !== null && logs !== void 0 ? logs : LOG_STACK;
  title = title !== null && title !== void 0 ? title : 'logger';
  clear = clear !== null && clear !== void 0 ? clear : true;
  var isSend = sendToRemote(title, logs.toHtmlString());

  if (isSend && clear) {
    logs.clear();
  }

  return isSend;
}

function sliceStackFrames(stackTrace, start, end) {
  if (start === void 0) {
    start = 0;
  }

  if (end === void 0) {
    end = 0;
  }

  if (stackTrace === '') return '';
  var temp = stackTrace.split('\n');
  if (end <= 0) end = temp.length + end;

  if (start < 0) {
    start = 0;
  } else if (start > temp.length - 1) {
    start = temp.length - 1;
  }

  if (end > temp.length) {
    end = temp.length;
  } else if (end <= start) {
    return '';
  }

  temp = temp.slice(start, end);
  return temp.join('\n');
}

function parseTrace(originTrace) {
  var _a;

  var stack = [];
  var originStack = originTrace.split('\n');

  for (var _i = 0, originStack_1 = originStack; _i < originStack_1.length; _i++) {
    var item = originStack_1[_i];
    var result = /\:(\d+)(?: \((.*)\))?/.exec(item);
    stack.push(new TraceStackFrame(Number(result[1]) - 3, (_a = result[2]) !== null && _a !== void 0 ? _a : 'Anonymous functions'));
  }

  stack[stack.length - 1].setCallerName("Outer");
  return stack;
}

function sendToRemote(title, message) {
  if (_token === null) {
    return false;
  }

  var res = http.post("http://www.pushplus.plus/send", {
    title: title,
    token: _token,
    content: message,
    template: 'html'
  });
  return res.statusCode === 200;
}

function defaultFormatter(line, callerName) {
  return "  | at line ".concat(line, ", in <").concat(callerName, ">");
}
;// CONCATENATED MODULE: ./src/lib/exception.ts
var exception_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();


var ERROR_EVENTS = events.emitter();
ERROR_EVENTS.on("error", function errorListener(err) {
  Record.customLog(LoggerSchemes.error, {
    needPrint: false,
    needRecord: true,
    skipCallerNumber: 2
  }, err.toString());
});

var BaseException = function (_super) {
  exception_extends(BaseException, _super);

  function BaseException(message) {
    var _this = _super.call(this) || this;

    _this.exceptionType = 'BaseException';
    _this.traceFilter = undefined;
    _this.traceFormatter = undefined;
    _this.message = message;
    var trace = getStackTrace();

    if (_this.traceFilter) {
      trace = trace.filter(_this.traceFilter);
    }

    _this.traceBack = trace.toString(_this.traceFormatter);
    ERROR_EVENTS.emit("error", _this);
    return _this;
  }

  BaseException.prototype.toString = function () {
    return "Traceback (most recent call last):\n" + this.traceBack + "\n" + this.exceptionType + (this.message ? ": " + this.message : "") + "\n";
  };

  return BaseException;
}(Error);



function __isExceptionType(error, targetException) {
  var exceptionType = Object.getOwnPropertyDescriptor(error, "exceptionType");

  if (exceptionType === undefined) {
    return false;
  }

  return exceptionType.value === targetException;
}

function isBaseException(error) {
  return __isExceptionType(error, "BaseException");
}

var PermissionException = function (_super) {
  exception_extends(PermissionException, _super);

  function PermissionException() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.exceptionType = "PermissionException";
    return _this;
  }

  return PermissionException;
}(BaseException);


function isPermissionException(error) {
  return __isExceptionType(error, 'PermissionException');
}

var ServiceNotEnabled = function (_super) {
  exception_extends(ServiceNotEnabled, _super);

  function ServiceNotEnabled() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.exceptionType = "ServiceNotEnabled";
    return _this;
  }

  return ServiceNotEnabled;
}(BaseException);


function isServiceNotEnabled(error) {
  return __isExceptionType(error, 'ServiceNotEnabled');
}

var ValueException = function (_super) {
  exception_extends(ValueException, _super);

  function ValueException() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.exceptionType = "ValueException";
    return _this;
  }

  return ValueException;
}(BaseException);


function isValueException(error) {
  return __isExceptionType(error, 'ValueException');
}

var ExceedMaxNumberOfAttempts = function (_super) {
  exception_extends(ExceedMaxNumberOfAttempts, _super);

  function ExceedMaxNumberOfAttempts() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.exceptionType = "ExceedMaxNumberOfAttempts";
    return _this;
  }

  return ExceedMaxNumberOfAttempts;
}(BaseException);



var CurrentAppBanned = function (_super) {
  exception_extends(CurrentAppBanned, _super);

  function CurrentAppBanned() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.exceptionType = "CurrentAppBanned";
    return _this;
  }

  return CurrentAppBanned;
}(BaseException);


function isCurrentAppBanned(error) {
  return __isExceptionType(error, 'CurrentAppBanned');
}

var WidgetNotFoundException = function (_super) {
  exception_extends(WidgetNotFoundException, _super);

  function WidgetNotFoundException() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.exceptionType = "WidgetNotFoundException";
    return _this;
  }

  return WidgetNotFoundException;
}(BaseException);


function isWidgetNotFoundException(error) {
  return __isExceptionType(error, 'WidgetNotFoundException');
}

var ConfigInvalidException = function (_super) {
  exception_extends(ConfigInvalidException, _super);

  function ConfigInvalidException(fieldName, helpInfo) {
    var _this = _super.call(this, "The '".concat(fieldName, "' field in the configuration is invalid").concat(", " + helpInfo, ". ") + "please check it again !") || this;

    _this.exceptionType = "ConfigInvalidException";
    return _this;
  }

  return ConfigInvalidException;
}(ValueException);


function isConfigInvalidException(error) {
  return __isExceptionType(error, 'ConfigInvalidException');
}
;// CONCATENATED MODULE: ./src/common/enums.ts
var Dialog;

(function (Dialog) {
  Dialog[Dialog["Positive"] = 0] = "Positive";
  Dialog[Dialog["Negative"] = 1] = "Negative";
})(Dialog || (Dialog = {}));
;// CONCATENATED MODULE: ./src/common/search.ts





function scrollTo(component, options, range, prePy, scrollTimes, avoidTimes) {
  if (scrollTimes === void 0) {
    scrollTimes = 0;
  }

  if (avoidTimes === void 0) {
    avoidTimes = 0;
  }

  var top = (options === null || options === void 0 ? void 0 : options.fixed) ? 0 : (range === null || range === void 0 ? void 0 : range.top) || 0;
  var bottom = (options === null || options === void 0 ? void 0 : options.fixed) ? device.height : (range === null || range === void 0 ? void 0 : range.bottom) || device.height;

  if (scrollTimes > 2) {
    throw new ExceedMaxNumberOfAttempts("超过最大限制次数");
  }

  var _a = search(component, options),
      bounds = _a[0],
      text = _a[1];

  if (bounds && !(options === null || options === void 0 ? void 0 : options.fixed)) {
    var tmpTop = bounds.top;
    var tmpBottom = bounds.bottom;
    var pointY = (tmpTop + tmpBottom) / 2;

    if (tmpBottom <= tmpTop) {
      if (tmpBottom > 0) {
        tmpBottom = bottom + 1;
      } else {
        tmpTop = top - 1;
      }
    }

    if (prePy) {
      if (pointY == prePy) {
        closeByImageMatching();
        scrollTimes++;
      }
    }

    if (tmpTop < top) {
      if (tmpTop < top - bottom * 0.5) {
        gesture(1000, [resizeX(random(580, 620)), resizeY(random(950, 1050))], [resizeX(random(780, 820)), resizeY(random(1750, 1850))]);
      } else {
        gesture(1000, [resizeX(random(580, 620)), resizeY(random(1350, 1450))], [resizeX(random(780, 820)), resizeY(random(1750, 1850))]);
      }

      waitRandomTime(1);
      return scrollTo(component, options, range, pointY, scrollTimes, avoidTimes);
    } else if (tmpBottom > bottom) {
      if (tmpBottom > bottom * 1.5) {
        gesture(1000, [resizeX(random(580, 620)), resizeY(random(1750, 1850))], [resizeX(random(780, 820)), resizeY(random(250, 350))]);
      } else {
        gesture(1000, [resizeX(random(580, 620)), resizeY(random(1750, 1850))], [resizeX(random(780, 820)), resizeY(random(1350, 1450))]);
      }

      waitRandomTime(1);
      return scrollTo(component, options, range, pointY, scrollTimes, avoidTimes);
    } else {
      waitRandomTime(1);

      if ((options === null || options === void 0 ? void 0 : options.cover) && text !== "" && ++avoidTimes < 3) {
        Record.debug("滑动遮挡校验");
        Record.debug("text :".concat(text));
        Record.debug("bounds :".concat(bounds));
        var img = getScreenImage(bounds);
        var bigImg = images.scale(img, 3, 3);
        var grayImg = images.cvtColor(bigImg, "BGR2GRAY");
        var str = ocr.recognizeText(grayImg);
        img.recycle();
        bigImg.recycle();
        grayImg.recycle();
        Record.debug("ocr str:".concat(str));

        if (str.search(text) == -1 && !compareStr(text, str)) {
          Record.debug("按钮被遮挡");
          if (!range) range = {};

          if (tmpBottom > device.height / 2) {
            range.bottom = tmpTop;
          } else {
            range.top = tmpBottom;
          }

          return scrollTo(component, options, range, undefined, scrollTimes, avoidTimes);
        }
      }
    }
  }

  return [bounds, text];
}
function search(component, options) {
  var _a;

  var bounds;
  var object;
  var name;

  if (options === null || options === void 0 ? void 0 : options.leftRange) {
    object = searchByLeftRange(component, options);
  } else {
    if (typeof component === "string") {
      object = searchByUiSelect(textMatches(component), options) || searchByUiSelect(descMatches(component), options);

      if (object == null && (options === null || options === void 0 ? void 0 : options.ocrRecognize)) {
        _a = searchByOcrRecognize(component, options), bounds = _a[0], name = _a[1];
      }
    } else {
      object = searchByUiSelect(component, options);
    }
  }

  if (object != null) {
    bounds = object.bounds();
    name = object.text();
  }

  if (bounds === undefined && (options === null || options === void 0 ? void 0 : options.waitFor)) {
    Record.debug(component.toString());
    throw "控件不存在";
  }

  return [bounds, name];
}
function searchByLeftRange(button, options, times) {
  if (times === void 0) {
    times = 0;
  }

  if (times > 3) {
    throw new ExceedMaxNumberOfAttempts("超过最大限制次数");
  }

  var tmp;

  if (options.leftRange) {
    if (typeof options.leftRange === "string") {
      tmp = searchByUiSelect(textMatches(options.leftRange)) || searchByUiSelect(descMatches(options.leftRange));
    } else {
      tmp = searchByUiSelect(options.leftRange);
    }

    if (tmp == null) {
      utils_close(0);
      return searchByLeftRange(button, options, ++times);
    } else {
      var top = tmp.bounds().top - 10;
      var bottom = tmp.bounds().bottom + 80;
      var left = tmp.bounds().right;

      if (bottom <= top) {
        bottom = top + 200;
      }

      if (typeof button === "string") {
        return searchByUiSelect(textMatches(button).boundsInside(left, top, device.width, bottom), options) || searchByUiSelect(descMatches(button).boundsInside(left, top, device.width, bottom));
      } else {
        return searchByUiSelect(button.boundsInside(left, top, device.width, bottom), options);
      }
    }
  }
}
function searchByOcrRecognize(str, options) {
  var img = getScreenImage(options === null || options === void 0 ? void 0 : options.bounds);
  var grayImg = images.cvtColor(img, "BGR2GRAY");
  var res = ocr.recognize(grayImg);
  img.recycle();
  grayImg.recycle();
  var list = [];

  for (var _i = 0, _a = res.results; _i < _a.length; _i++) {
    var item = _a[_i];

    if (RegExp("^" + str + "$").test(item.text)) {
      list.push(item);
    }
  }

  Record.debug("list length: ".concat(list.length));

  if (list.length > 0) {
    var result = null;

    if (options === null || options === void 0 ? void 0 : options.index) {
      result = list[options.index];
    } else {
      result = list[0];
    }

    if (result) {
      if (options === null || options === void 0 ? void 0 : options.bounds) {
        var x = options.bounds.left || 0;
        var y = options.bounds.top || 0;
        result.bounds.left += x;
        result.bounds.right += x;
        result.bounds.top += y;
        result.bounds.bottom += y;
      }

      return [result.bounds, result.text];
    }
  }

  return [undefined, undefined];
}
function searchByUiSelect(component, options) {
  var result = null;

  if (options === null || options === void 0 ? void 0 : options.waitFor) {
    result = component.findOne(10 * 1000);

    if (result == null) {
      for (var i = 0; i < 3; i++) {
        closeByImageMatching();
        clickDialogOption(Dialog.Negative);
        result = component.findOne(5 * 1000);

        if (result) {
          break;
        }
      }
    }

    waitRandomTime(2);
  }

  var list = component.find();

  if (list.nonEmpty()) {
    list = list.filter(function (element) {
      var bounds = element.bounds();
      return bounds.width() > 0;
    });

    if (options === null || options === void 0 ? void 0 : options.bounds) {
      list = list.filter(function (element) {
        var bounds = element.bounds();
        if (options.bounds) return myBoundsContains(options.bounds, bounds);
      });
    }

    if (options === null || options === void 0 ? void 0 : options.index) {
      result = list[options.index];
    } else {
      result = list[0];
    }
  }

  return result;
}
;// CONCATENATED MODULE: ./src/common/click.ts






function fixedClick(text) {
  return findAndClick(text, {
    fixed: true
  });
}
function ocrClick(text) {
  return findAndClick(text, {
    fixed: true,
    ocrRecognize: true
  });
}
function dialogClick(text) {
  return findAndClick(text, {
    fixed: true,
    ocrRecognize: true,
    clickUntilGone: true,
    bounds: {
      bottom: device.height * 4 / 5,
      top: device.height * 1 / 3,
      left: device.width * 1 / 5,
      right: device.width * 4 / 5
    }
  });
}
function readClick(selector, index) {
  return findAndClick(selector, {
    index: index,
    clickUntilGone: true,
    cover: true
  });
}
function scrollClick(text, range) {
  return findAndClick(text, {
    leftRange: range,
    cover: true,
    check: true
  });
}
function selectedClick(text, threshold) {
  return findAndClick(text, {
    fixed: true,
    waitFor: true,
    selectedThreshold: threshold,
    check: true
  });
}
function randomClickChildInList(component, index) {
  var list = component.boundsInside(0, 0, device.width, device.height).findOnce();

  if (list != null) {
    var child = list.child(index);

    if (child != null) {
      randomClick(child.bounds());
    }
  }
}
function clickDialogOption(options) {
  if (options === undefined) {
    options = random(Dialog.Positive, Dialog.Negative);
  }

  if (options === Dialog.Positive) {
    return fixedClick(merge(["继续观看", "抓住奖励机会", "留下看看", "关闭"]));
  } else if (options === Dialog.Negative) {
    return fixedClick(merge(["取消", "关闭", "(以后|下次)再说", "(直接|坚持)?退出(阅读)?", "暂不加入", "离开"]));
  }
}
function findAndClick(component, options, times) {
  if (times === void 0) {
    times = 0;
  }

  if (++times > MAX_CLICK_COUNTS) {
    throw new ExceedMaxNumberOfAttempts("超过最大限制次数");
  } else if (times > MAX_CLICK_COUNTS - 2) {
    utils_close(0);
  } else if (times > MAX_CLICK_COUNTS - 4) {
    closeByImageMatching();
  }

  var _a = scrollTo(component, options),
      bounds = _a[0],
      name = _a[1];

  if (bounds) {
    if (options === null || options === void 0 ? void 0 : options.selectedThreshold) {
      var list = getGrayscaleHistogram(getScreenImage(bounds));
      var mergeList = mergeHistogram(list);
      var index = findLargestIndexes(mergeList, 2);
      Record.debug("selected index = ".concat(index));

      if (Math.abs(index[0] - index[1]) > options.selectedThreshold) {
        return true;
      }
    }

    if (name && name !== "" && !/^[0-9]+$/.test(name)) {
      Record.log(name);
    }

    randomClick(bounds, options);

    if (options === null || options === void 0 ? void 0 : options.clickUntilGone) {
      options.waitFor = false;
      findAndClick(component, options, times);
    }

    return true;
  }

  return false;
}
function randomClick(bounds, options) {
  var sbounds = boundsScaling(bounds, 0.5);
  var randomX = random(sbounds.left, sbounds.right);
  var randomY = random(sbounds.top, sbounds.bottom);
  Record.debug("click(".concat(randomX, ", ").concat(randomY, ")"));

  if (options === null || options === void 0 ? void 0 : options.check) {
    var cycleCounts = 0;

    while (++cycleCounts < 3 && !judgeFuncIsWorkByImg(function () {
      normalClick(randomX, randomY, options);
      randomX = random(sbounds.left, sbounds.right);
      randomY = random(sbounds.top, sbounds.bottom);
    }, sbounds)) {
      closeByImageMatching();
    }
  } else {
    normalClick(randomX, randomY, options);
  }
}
function normalClick(x, y, options) {
  var time = (options === null || options === void 0 ? void 0 : options.waitTimes) || WAIT_TIME_AFTER_CLICK;
  var result = threads.disposable();

  if (options === null || options === void 0 ? void 0 : options.feedback) {
    var thread = threads.start(function () {
      events.observeToast();
      events.on("toast", function (toast) {
        result.setAndNotify(toast.getText());
      });
    });
    thread.waitFor();
  }

  if (SHOW_CONSOLE) {
    console.hide();
    sleep(100);
    click(x, y);
    console.show();
  } else {
    click(x, y);
  }

  if (options === null || options === void 0 ? void 0 : options.feedback) {
    threads.start(function () {
      waitRandomTime(time);
      result.setAndNotify(undefined);
    });
    var str = result.blockedGet();
    Record.debug(str);
    threads.shutDownAll();

    if (str.match("失败|异常|领取过奖励")) {
      throw new CurrentAppBanned(str);
    }
  } else {
    waitRandomTime(time);
  }
}
;// CONCATENATED MODULE: ./src/common/utils.ts



function resizeX(x) {
  return x * device.width / DEVICE_WIDTH;
}
function resizeY(y) {
  return y * device.height / DEVICE_HEIGHT;
}
function boundsScaling(bounds, scaling) {
  var left = bounds.left || 0;
  var right = bounds.right || device.width;
  var top = bounds.top || 0;
  var bottom = bounds.bottom || device.height;
  var width = right - left;
  var height = bottom - top;
  var newHeight = height * scaling;
  var newWidth = width * scaling;
  left = left + (width - newWidth) / 2;
  top = top + (height - newHeight) / 2;
  right = right - (width - newWidth) / 2;
  bottom = bottom - (height - newHeight) / 2;
  return {
    left: left,
    top: top,
    right: right,
    bottom: bottom
  };
}
function getScreenImage(bounds) {
  var x1 = (bounds === null || bounds === void 0 ? void 0 : bounds.left) || 0;
  var y1 = (bounds === null || bounds === void 0 ? void 0 : bounds.top) || 0;
  var x2 = (bounds === null || bounds === void 0 ? void 0 : bounds.right) || device.width;
  var y2 = (bounds === null || bounds === void 0 ? void 0 : bounds.bottom) || device.height;

  if (SHOW_CONSOLE) {
    console.hide();
    sleep(100);
  }

  var img = captureScreen();
  if (SHOW_CONSOLE) console.show();
  waitRandomTime(1);
  return images.clip(img, x1, y1, x2 - x1, y2 - y1);
}
function waitRandomTime(waitTime) {
  var time = waitTime + random(-waitTime * 0.2, waitTime * 0.2);
  sleep(time * 1000);
  return time;
}
function clearBackground() {
  if (home()) {
    waitRandomTime(4);

    if (recents()) {
      waitRandomTime(4);
      findAndClick(idContains("clear"), {
        fixed: true
      });
    }
  }
}
function moveDown(totalTime, interval) {
  var watchTime = 0;

  while (totalTime > watchTime) {
    gesture(200, [resizeX(random(580, 620)), resizeY(random(1750, 1850))], [resizeX(random(780, 820)), resizeY(random(250, 350))]);
    watchTime += waitRandomTime(interval);
  }
}
function merge(buttonNameList) {
  return buttonNameList.join('|');
}
function convertSecondsToMinutes(seconds) {
  var minutes = Math.floor(seconds / 60);
  return minutes;
}
function utils_close(times) {
  if (!closeByImageMatching()) {
    switch (times % 4) {
      case 0:
        if (!findAndClick(className("android.widget.ImageView"), {
          fixed: true,
          bounds: {
            left: device.width * 3 / 5,
            bottom: device.height * 4 / 5
          }
        })) {
          back();
          waitRandomTime(4);
        }

        break;

      case 1:
        if (!findAndClick(className("android.widget.Button"), {
          fixed: true,
          bounds: {
            left: device.width * 3 / 5,
            bottom: device.height * 4 / 5
          }
        })) {
          back();
          waitRandomTime(4);
        }

        break;

      case 2:
        if (!findAndClick(className("android.widget.ImageView"), {
          fixed: true,
          bounds: {
            right: device.width * 1 / 3,
            bottom: device.height * 4 / 5
          }
        })) {
          back();
          waitRandomTime(4);
        }

        break;

      case 3:
        if (!findAndClick(className("android.widget.Button"), {
          fixed: true,
          bounds: {
            right: device.width * 1 / 3,
            bottom: device.height * 4 / 5
          }
        })) {
          back();
          waitRandomTime(4);
        }

        break;
    }
  }
}
function closeByImageMatching() {
  var img = getScreenImage();
  var threshold = 0.7;
  var tmp = images.read('/sdcard/exit.png');

  if (img != null && tmp != null) {
    var grayImg = images.cvtColor(img, "BGR2GRAY");
    var grayTmp = images.cvtColor(tmp, "BGR2GRAY");
    var grayWhiteTmp = images.adaptiveThreshold(grayTmp, 255, "GAUSSIAN_C", "BINARY", 9, 0);
    var grayInvTmp = images.adaptiveThreshold(grayTmp, 255, "GAUSSIAN_C", "BINARY_INV", 9, 0);
    var adaptiveImg = images.adaptiveThreshold(grayImg, 255, "GAUSSIAN_C", "BINARY", 25, 0);
    var list = [];

    try {
      for (var i = 50; i >= 20; i -= 5) {
        var white = images.resize(grayWhiteTmp, i);
        var black = images.resize(grayInvTmp, i);
        var match1 = images.matchTemplate(adaptiveImg, white, {
          threshold: threshold
        });
        var match2 = images.matchTemplate(adaptiveImg, black, {
          threshold: threshold
        });
        var combine = match1.points.concat(match2.points);

        for (var _i = 0, combine_1 = combine; _i < combine_1.length; _i++) {
          var point = combine_1[_i];
          point.x += i / 2;
          point.y += i / 2;
        }

        list.push.apply(list, combine);
        white.recycle();
        black.recycle();
      }
    } finally {
      img.recycle();
      tmp.recycle();
      grayImg.recycle();
      grayTmp.recycle();
      grayInvTmp.recycle();
      adaptiveImg.recycle();
    }

    if (list != null) {
      var point = findPreferredCloseButton(list);

      if (point != null) {
        Record.debug("close(".concat(point.x, ",").concat(point.y, ")"));
        normalClick(point.x, point.y);
        return true;
      }
    }
  }

  img.recycle();
  return false;
}
function findPreferredCloseButton(list) {
  var num = random(0, 1);
  var sortedCoordinates = list.slice().sort(function (a, b) {
    var distanceA = calculateDistance(a, {
      x: 0,
      y: 0
    });
    var distanceB = calculateDistance(b, {
      x: 0,
      y: 0
    });
    return distanceA - distanceB;
  });
  var firstCoordinate = {
    x: 0,
    y: 0
  };

  for (var i = 0; i < sortedCoordinates.length; i++) {
    if (calculateDistance(firstCoordinate, sortedCoordinates[i]) > 3) {
      firstCoordinate = sortedCoordinates[i];

      if (num === 0 && !boundsInside(firstCoordinate.x - 100, firstCoordinate.y - 100, firstCoordinate.x + 100, firstCoordinate.y + 100).findOnce()) {
        sortedCoordinates.splice(i);
        i--;
      }
    } else {
      sortedCoordinates.splice(i);
      i--;
    }
  }

  sortedCoordinates.sort(function (a, b) {
    var _a = calculatePriority(a),
        priorityA = _a.priority,
        distanceA = _a.distance;

    var _b = calculatePriority(b),
        priorityB = _b.priority,
        distanceB = _b.distance;

    if (priorityA === priorityB) {
      return distanceA - distanceB;
    }

    return priorityA - priorityB;
  });
  return sortedCoordinates.length > 0 ? sortedCoordinates[0] : null;
}
function calculateDistance(pointA, pointB) {
  var xDiff = pointA.x - pointB.x;
  var yDiff = pointA.y - pointB.y;
  return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}
function calculatePriority(point) {
  var centerX = device.width / 2;
  var centerY = device.height / 2;

  if (point.x < centerX && point.y < centerY) {
    return {
      priority: 1,
      distance: calculateDistance(point, {
        x: 0,
        y: 0
      })
    };
  } else if (point.x > centerX && point.y < centerY) {
    return {
      priority: 2,
      distance: calculateDistance(point, {
        x: device.width,
        y: 0
      })
    };
  } else {
    return {
      priority: 3,
      distance: Math.abs(point.x - centerX)
    };
  }
}
function doFuncAtGivenTime(totalTime, maxTime, func) {
  while (totalTime >= 0) {
    var startTime = new Date();
    var timeParameter = Math.min(maxTime, totalTime);
    func(timeParameter);
    var endTime = new Date();
    totalTime -= (endTime.getTime() - startTime.getTime()) / 1000;
  }
}
function matchAndJudge(str) {
  Record.debug("".concat(str));

  if (str) {
    str = str.replace(/\d+:\d+/, "x");
    var time = str.match(/[0-9]+[s秒]?/);
    var swipe_1 = str.match(/(滑动)?浏览/);

    if (time) {
      var totalTime = parseInt(time[0], 10);

      if (totalTime > 50 || totalTime < 3) {
        totalTime = 3;
      }

      if (swipe_1) {
        Record.log("滑动浏览广告");
        moveDown(totalTime, 4);
      } else {
        return totalTime;
      }
    }
  }

  return 3;
}
function judgeFuncIsWorkByImg(func, bounds) {
  var before = getScreenImage(bounds);
  func();
  var after = getScreenImage(bounds);
  var compare = findImage(before, after, {
    threshold: 1
  });
  before.recycle();
  after.recycle();

  if (compare) {
    Record.debug("操作失效");
    return false;
  } else {
    Record.debug("操作生效");
    return true;
  }
}
function compareStr(str1, str2) {
  var num = similar(str1, str2, 2);

  if (num > 0.6) {
    return true;
  }

  return false;
}
function randomExecute(methods) {
  var _a;

  for (var i = methods.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    _a = [methods[j], methods[i]], methods[i] = _a[0], methods[j] = _a[1];
  }

  methods.forEach(function (method) {
    method();
  });
}
function similar(s, t, f) {
  if (!s || !t) {
    return 0;
  }

  if (s === t) {
    return 100;
  }

  var l = s.length > t.length ? s.length : t.length;
  var n = s.length;
  var m = t.length;
  var d = [];
  f = f || 2;

  var min = function min(a, b, c) {
    return a < b ? a < c ? a : c : b < c ? b : c;
  };

  var i, j, si, tj, cost;
  if (n === 0) return m;
  if (m === 0) return n;

  for (i = 0; i <= n; i++) {
    d[i] = [];
    d[i][0] = i;
  }

  for (j = 0; j <= m; j++) {
    d[0][j] = j;
  }

  for (i = 1; i <= n; i++) {
    si = s.charAt(i - 1);

    for (j = 1; j <= m; j++) {
      tj = t.charAt(j - 1);

      if (si === tj) {
        cost = 0;
      } else {
        cost = 1;
      }

      d[i][j] = min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
    }
  }

  var res = (1 - d[n][m] / l) * 100;
  return res;
}
function getGrayscaleHistogram(img, rate) {
  if (rate === void 0) {
    rate = 4;
  }

  var grayHistogram = [];

  for (var i = 0; i < 256; i++) {
    grayHistogram[i] = 0;
  }

  for (var y = 0; y < img.getHeight(); y += rate) {
    for (var x = 0; x < img.getWidth(); x += rate) {
      var color = img.pixel(x, y);
      var grayValue = (colors.red(color) + colors.green(color) + colors.blue(color)) / 3;
      grayHistogram[Math.floor(grayValue)]++;
    }
  }

  img.recycle();
  return grayHistogram;
}
function findLargestIndexes(arr, count) {
  if (count <= 0) {
    throw new Error("返回长度必须大于等于1");
  }

  if (count > arr.length) {
    throw new Error("返回长度不能大于数组长度");
  }

  var indexes = [];

  for (var i = 0; i < count; i++) {
    var maxIndex = 0;

    for (var j = 1; j < arr.length; j++) {
      if (arr[j] > arr[maxIndex]) {
        maxIndex = j;
      }
    }

    indexes.push(maxIndex);
    arr[maxIndex] = Number.MIN_SAFE_INTEGER;
  }

  return indexes;
}
function myBoundsContains(mainBounds, testBounds) {
  var _a = mainBounds.left,
      mainLeft = _a === void 0 ? 0 : _a,
      _b = mainBounds.top,
      mainTop = _b === void 0 ? 0 : _b,
      _c = mainBounds.right,
      mainRight = _c === void 0 ? device.width : _c,
      _d = mainBounds.bottom,
      mainBottom = _d === void 0 ? device.height : _d;
  var _e = testBounds.left,
      testLeft = _e === void 0 ? 0 : _e,
      _f = testBounds.top,
      testTop = _f === void 0 ? 0 : _f,
      _g = testBounds.right,
      testRight = _g === void 0 ? device.width : _g,
      _h = testBounds.bottom,
      testBottom = _h === void 0 ? device.height : _h;
  return testLeft >= mainLeft && testTop >= mainTop && testRight <= mainRight && testBottom <= mainBottom;
}
function mergeHistogram(hist) {
  var mergedHistogram = [];

  for (var i = 0; i < hist.length; i += 16) {
    var sum = hist.slice(i, i + 16).reduce(function (acc, val) {
      return acc + val;
    }, 0);

    for (var j = 0; j < 7; j++) {
      mergedHistogram.push(0);
    }

    mergedHistogram.push(sum);

    for (var j = 0; j < 8; j++) {
      mergedHistogram.push(0);
    }
  }

  return mergedHistogram;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
;// CONCATENATED MODULE: ./src/scripts/abstract/Base.ts


var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var Base = function () {
  function Base() {
    this.appName = "";
    this.packageName = "";
    this.initialComponent = text("");
    this.initialNum = -1;
    this.randomTab = text("");
    this.tab = text("");
    this.depth = 0;
    this.preComponent = text("");
    this.preNum = -1;
    this.exitNum = 1;
    this.highEffEstimatedTime = BASE_ASSIMT_TIME;
    this.medEffEstimatedTime = MAX_ASSIMT_TIME;
    this.lowEffEstimatedTime = MAX_ASSIMT_TIME;
    this.lowEffAssmitCount = 1;
  }

  Base.prototype.medEff = function () {};

  Base.prototype.lowEff = function (time) {
    time;
  };

  Base.prototype.start = function (time) {
    if (time > 0 && this.lauchApp()) {
      this.reset();
      Record.info("".concat(this.appName, "\u9884\u8BA1\u6267\u884C").concat(convertSecondsToMinutes(time), "\u5206\u949F"));
      this.reSearchTab();
      var flag = false;

      if (time >= this.highEffEstimatedTime) {
        var processTime = this.highEff();
        time -= processTime;
        flag = true;
      }

      if (time >= this.medEffEstimatedTime) {
        var processTime = this.medEff();
        time -= processTime;
      }

      if (time >= this.lowEffEstimatedTime) {
        var processTime = this.lowEff(time);
        time -= processTime;
      }

      if (flag) {
        Record.info("统计当前app金币");
        this.weight();
      }
    }
  };

  Base.prototype.reSearchTab = function () {
    if (this.randomTab.toString() !== text("").toString()) {
      var tmp = this.backUntilFind(this.randomTab);

      if (tmp != null) {
        this.tab = id(tmp.id());
        this.initialComponent = this.tab;
        Record.debug("".concat(this.tab));
      } else {
        throw "id定位失败";
      }
    }
  };

  Base.prototype.lauchApp = function () {
    Record.log("\u5C1D\u8BD5\u542F\u52A8".concat(this.appName));
    var isLauchApp = launchPackage(this.packageName);

    if (isLauchApp) {
      waitRandomTime(2);
      findAndClick(className("android.widget.Button").textMatches("打开"), {
        fixed: true
      });
      Record.log("".concat(this.appName, "\u5DF2\u542F\u52A8"));
      waitRandomTime(13);
    } else {
      Record.log("".concat(this.appName, "\u5E94\u7528\u672A\u5B89\u88C5"));
    }

    return isLauchApp;
  };

  Base.prototype.read = function (totalTime) {
    var _this = this;

    Record.log("\u51C6\u5907\u770B\u4E66".concat(convertSecondsToMinutes(totalTime), "\u5206\u949F"));
    var readTime = 0;

    if (text("简介").exists()) {
      normalClick(resizeX(1070), resizeY(2330));
    }

    var img = getScreenImage({
      bottom: device.height * 1 / 5
    });
    var grayHistogram = getGrayscaleHistogram(img);
    var index = findLargestIndexes(grayHistogram, 1)[0];
    Record.debug("read index: ".concat(index));
    doFuncAtGivenTime(totalTime, 10, function () {
      readTime += waitRandomTime(10);

      _this.watch(index);

      fixedClick(merge([".*不再提示", "我知道了", "放弃下载"]));
      normalClick(resizeX(random(1070, 1080)), resizeY(random(1900, 2000)));
    });
  };

  Base.prototype.watch = function (exitSign, times) {
    if (times === void 0) {
      times = 0;
    }

    var flag = false;

    if (typeof exitSign === "number") {
      var img = getScreenImage({
        bottom: device.height * 1 / 5
      });
      var grayHistogram = getGrayscaleHistogram(img);
      var index = findLargestIndexes(grayHistogram, 1)[0];
      Record.debug("watch index: ".concat(index));

      if (index < exitSign + 10 && index > exitSign - 10) {
        flag = true;
      }
    } else {
      flag = exitSign.exists();
    }

    if (flag) {
      Record.debug("watch return");
      return;
    }

    if (times > 9) {
      throw new ExceedMaxNumberOfAttempts("watch");
    }

    if (currentPackage() !== this.packageName) {
      this.lauchApp();
    }

    var _a = search(".*[0-9]+[ ]?[s秒]?.*", {
      ocrRecognize: true,
      bounds: {
        bottom: device.height * 1 / 5
      }
    }),
        _ = _a[0],
        name = _a[1];

    var waitTime = matchAndJudge(name);
    Record.debug("watchTimes = ".concat(times, ", waitTime = ").concat(waitTime));

    if (text("该视频提到的内容是").findOne(waitTime * 1000)) {
      back();
      waitRandomTime(1);
      this.watch(exitSign, ++times);
      return;
    }

    waitRandomTime(10);

    if (findAndClick(".*跳过.*", {
      fixed: true,
      bounds: {
        left: device.width,
        bottom: device.height * 1 / 5
      }
    })) {
      if (!clickDialogOption(Dialog.Positive)) {
        waitRandomTime(1);
        this.watch(exitSign, ++times);
        return;
      }
    }

    utils_close(times);

    if (times < 5) {
      clickDialogOption(Dialog.Positive);
    } else {
      clickDialogOption(Dialog.Negative);
    }

    dialogClick("领取奖励");
    this.watch(exitSign, ++times);
  };

  Base.prototype.goTo = function (component, num) {
    if (component.exists() && this.preComponent.toString() == component.toString() && this.preNum == num) {
      return;
    }

    var tmp = this.backUntilFind(component);

    for (var i = 0; i < this.depth; i++) {
      var child = tmp.child(0);

      if (child != null) {
        tmp = child;
      }
    }

    if (tmp != null) {
      if (num !== -1) {
        tmp = tmp.child(num);
      }

      if (this.preComponent.toString() !== component.toString() || this.preNum !== num) {
        randomClick(tmp.bounds(), {
          check: true
        });
      }
    }

    this.preComponent = component;
    this.preNum = num;
    waitRandomTime(4);
  };

  Base.prototype.backUntilFind = function (component, times) {
    if (times === void 0) {
      times = 0;
    }

    if (times >= MAX_BACK_COUNTS) {
      throw new ExceedMaxNumberOfAttempts("backUntilFind");
    }

    var tmp = component.findOnce();

    if (tmp == null) {
      if (times >= MAX_BACK_COUNTS - 2) {
        Record.warn("尝试矫正");
        closeByImageMatching();
      } else {
        back();
        waitRandomTime(4);
      }

      clickDialogOption(Dialog.Negative);

      if (currentPackage() !== this.packageName) {
        this.lauchApp();
      }

      return this.backUntilFind(component, ++times);
    } else {
      return tmp;
    }
  };

  Base.prototype.watchAdsForCoin = function (backSign) {
    var cycleCounts = 0;
    var str = "看.*(视频|内容|广告).*(得|领|赚).*([0-9]+金币|更多)";

    while (++cycleCounts < MAX_CYCLES_COUNTS && dialogClick(str)) {
      this.watch(textMatches(merge([backSign, str])));
    }

    dialogClick(merge(["开心收下", "我知道了"]));
  };

  Base.prototype.reset = function () {
    LOG_STACK.clear();
    this.enablewatchAds();
    this.preComponent = this.initialComponent;
    this.preNum = this.initialNum;
  };

  Base.prototype.store = function (key, value) {
    var object = STORAGE.get(this.constructor.name, {});
    object[key] = value;
    STORAGE.put(this.constructor.name, object);
  };

  Base.prototype.fetch = function (key, defaultValue) {
    var object = STORAGE.get(this.constructor.name, {});

    if (defaultValue != undefined && (object === undefined || object[key] === undefined)) {
      return defaultValue;
    }

    return object[key];
  };

  Base.prototype.beforeRun = function () {};

  Base.prototype.signIn = function () {};

  Base.prototype.openTreasure = function () {};

  Base.prototype.watchAds = function () {};

  Base.prototype.enablewatchAds = function () {};

  Base.prototype.mealSupp = function () {};

  Base.prototype.readBook = function (totalTime) {
    totalTime;
  };

  Base.prototype.swipeVideo = function (totalTime) {
    totalTime;
  };

  Base.prototype.listenBook = function () {};

  Base.prototype.reward = function () {};

  Base.prototype.clickPop = function () {};

  Base.prototype.record = function () {};

  __decorate([startDecorator], Base.prototype, "start", null);

  return Base;
}();


var Base_BaseKey;

(function (BaseKey) {
  BaseKey[BaseKey["Weight"] = 0] = "Weight";
  BaseKey[BaseKey["Executed"] = 1] = "Executed";
  BaseKey[BaseKey["highEffEstimatedTime"] = 2] = "highEffEstimatedTime";
  BaseKey[BaseKey["medEffEstimatedTime"] = 3] = "medEffEstimatedTime";
  BaseKey[BaseKey["lowEffEstimatedTime"] = 4] = "lowEffEstimatedTime";
  BaseKey[BaseKey["Money"] = 5] = "Money";
})(Base_BaseKey || (Base_BaseKey = {}));
;// CONCATENATED MODULE: ./src/lib/decorators.ts






function functionLog(message) {
  return function (target, key, descriptor) {
    var originalMethod = descriptor.value;
    var isEnabled = true;

    descriptor.value = function () {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      var startTime = new Date();

      try {
        if (isEnabled) {
          waitRandomTime(4);
          Record.info("\u6267\u884C\u4E0B\u4E00\u6B65\u4EFB\u52A1\uFF1A".concat(message));
          var result = originalMethod.apply(this, args);

          if (result === false) {
            isEnabled = false;
          }

          return result;
        }
      } catch (error) {
        Record.debug("".concat(error));

        if (isCurrentAppBanned(error)) {
          throw error;
        }

        var instance = this;
        var retries = 1;

        while (retries < MAX_RETRY_COUNTS) {
          if (key === "readBook" || key === "swipeVideo") {
            var terminationTime = new Date();
            args[0] = args[0] - (terminationTime.getTime() - startTime.getTime()) / 1000;

            if (args[0] <= 0) {
              break;
            }
          }

          Record.warn("\u5C1D\u8BD5\u7B2C".concat(retries, "\u6B21\u91CD\u542F"));

          try {
            startTime = new Date();
            clearBackground();

            if (instance.lauchApp()) {
              waitRandomTime(4);
              Record.info("\u6267\u884C\u4E0B\u4E00\u6B65\u4EFB\u52A1\uFF1A".concat(message));
              instance.reset();
              var result = originalMethod.apply(this, args);

              if (result === false) {
                isEnabled = false;
              }

              return result;
            }

            break;
          } catch (error) {
            Record.error("".concat(error));
            sendErrorMessage();
            retries++;
          }
        }

        if (retries >= MAX_RETRY_COUNTS) {
          Record.error("".concat(error));
          throw new ExceedMaxNumberOfAttempts(key);
        }
      }
    };

    if (key === "watchAds") {
      target["enable".concat(key)] = function () {
        isEnabled = true;
      };
    }

    return descriptor;
  };
}
function measureExecutionTime(_, key, descriptor) {
  var originalMethod = descriptor.value;

  descriptor.value = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var startTime = new Date();
    originalMethod.apply(this, args);
    var endTime = new Date();
    var executionTime = (endTime.getTime() - startTime.getTime()) / 1000;
    Record.debug("".concat(key, "\u6267\u884C\u4E86").concat(convertSecondsToMinutes(executionTime), "\u5206\u949F"));
    var instance = this;
    var time = (executionTime / REDUNDANCY_TIME + 1) * REDUNDANCY_TIME;

    if (key === "highEff") {
      Record.debug("highEff\u65F6\u95F4\u8C03\u6574\u4E3A".concat(convertSecondsToMinutes(time), "\u5206\u949F"));
      instance.highEffEstimatedTime = time;
      instance.store(Base_BaseKey.highEffEstimatedTime, time);
    } else if (key === "medEff") {
      Record.debug("medEff\u65F6\u95F4\u8C03\u6574\u4E3A".concat(convertSecondsToMinutes(time), "\u5206\u949F"));
      instance.medEffEstimatedTime = time;
      instance.store(Base_BaseKey.medEffEstimatedTime, time);
    }

    return executionTime;
  };

  return descriptor;
}
function startDecorator(_, __, descriptor) {
  var originalMethod = descriptor.value;

  descriptor.value = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var startTime = new Date();

    try {
      originalMethod.apply(this, args);
    } catch (e) {
      if (isCurrentAppBanned(e)) {
        Record.error("\u8D26\u53F7\u5F02\u5E38");
      } else {
        Record.error("\u5F53\u524Dapp\u53D1\u751F\u5F02\u5E38: ".concat(e));
        sendErrorMessage();
      }
    }

    var endTime = new Date();
    var executionTime = (endTime.getTime() - startTime.getTime()) / 1000;
    Record.info("即将执行下一个app");
    Record.debug("\u5269\u4F59".concat(convertSecondsToMinutes(args[0] - executionTime), "\u5206\u949F"));
    return args[0] - executionTime;
  };

  return descriptor;
}
;// CONCATENATED MODULE: ./src/scripts/DeJian.ts


var DeJian_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var DeJian_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var DeJian = function (_super) {
  DeJian_extends(DeJian, _super);

  function DeJian() {
    var _this = _super.call(this) || this;

    _this.appName = NAME_READ_DEJIAN;
    _this.packageName = PACKAGE_READ_DEJIAN;
    _this.initialComponent = desc("bookstore_button");
    _this.highEffEstimatedTime = _this.fetch(Base_BaseKey.highEffEstimatedTime, BASE_ASSIMT_TIME);
    _this.medEffEstimatedTime = _this.fetch(Base_BaseKey.medEffEstimatedTime, 45 * 60);
    _this.lowEffEstimatedTime = 0;
    return _this;
  }

  DeJian.prototype.highEff = function () {
    var _this = this;

    this.signIn();
    randomExecute([function () {
      _this.openTreasure();
    }, function () {
      _this.watchAds();
    }, function () {
      _this.mealSupp();
    }, function () {
      _this.joinActivity();
    }]);
  };

  DeJian.prototype.medEff = function () {
    var cycleCounts = 0;

    do {
      if (cycleCounts % 3 == 0) {
        this.openTreasure();
      }

      this.readBook(3 * 60);
      this.reward();
    } while (++cycleCounts < MAX_CYCLES_COUNTS && this.watchAds());
  };

  DeJian.prototype.lowEff = function (time) {
    var _this = this;

    doFuncAtGivenTime(time, 10 * 60, function (perTime) {
      _this.readBook(perTime);

      _this.watchAds();

      _this.openTreasure();

      _this.reward();
    });
  };

  DeJian.prototype.weight = function () {
    this.goTo(desc("discovery_button"), -1);
    scrollTo("金币收益");
    var tmp = textEndsWith("币").findOnce();

    if (tmp != null) {
      var weight = parseInt(tmp.text());
      this.store(Base_BaseKey.Weight, weight);
      this.store(Base_BaseKey.Money, (weight / 10000).toFixed(2));
    }
  };

  DeJian.prototype.readBook = function (totalTime) {
    this.goTo(desc("bookstore_button"), -1);
    var tmp = id("com.chaozh.iReader.dj:id/channel_tab").findOnce();

    if (tmp != null && findAndClick("推荐", {
      fixed: true,
      ocrRecognize: true,
      bounds: tmp.bounds(),
      selectedThreshold: 100
    })) {
      if (readClick(id("com.zhangyue.iReader.bookStore:id/iv_book"), random(0, 5))) {
        this.read(totalTime);
      }
    }
  };

  DeJian.prototype.reward = function () {
    this.goTo(desc("discovery_button"), -1);
    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS && scrollClick("领取")) {
      this.watchAdsForCoin("金币收益");

      if (text("恭喜获得").exists()) {
        closeByImageMatching();
      }
    }
  };

  DeJian.prototype.signIn = function () {
    this.goTo(desc("discovery_button"), -1);

    if (textStartsWith("成功签到").exists()) {
      closeByImageMatching();
    } else {
      if (scrollClick("点击签到.+")) {
        closeByImageMatching();
      }
    }
  };

  DeJian.prototype.mealSupp = function () {
    this.goTo(desc("discovery_button"), -1);

    if (scrollClick("点击领取")) {
      this.watchAdsForCoin("金币收益");

      if (text("恭喜获得").exists()) {
        closeByImageMatching();
      }
    }
  };

  DeJian.prototype.watchAds = function () {
    this.goTo(desc("discovery_button"), -1);

    if (scrollClick("去观看", "看视频赚金币与声望")) {
      this.watch(text("金币收益"));

      if (!dialogClick("知道了")) {
        closeByImageMatching();
      }

      return true;
    }

    return false;
  };

  DeJian.prototype.joinActivity = function () {
    this.goTo(desc("discovery_button"), -1);

    if (findAndClick("参与活动赚金币", {
      cover: true
    })) {
      var title = id("com.zhangyue.module.ad:id/tv_reward_video_title").findOnce();

      if (title != null) {
        var regex = /\((\d+)\/(\d+)\)/;
        var match = title.text().match(regex);

        if (match) {
          for (var i = parseInt(match[1]); i < parseInt(match[2]); i++) {
            findAndClick("看视频赚金币", {
              fixed: true,
              clickUntilGone: true
            });
            Record.log("\u53C2\u4E0E\u6D3B\u52A8, \u6B63\u5728\u89C2\u770B".concat(i + 1, "/").concat(match[2], "\u4E2A\u5E7F\u544A"));
            this.watch(text("金币收益"));
          }
        } else {
          Record.log("活动已完成");
        }
      }

      back();
    }
  };

  DeJian.prototype.openTreasure = function () {
    this.goTo(desc("discovery_button"), -1);

    if (fixedClick("开宝箱得金币")) {
      this.watchAdsForCoin("金币收益");

      if (text("恭喜获得").exists()) {
        closeByImageMatching();
      }
    }
  };

  DeJian_decorate([measureExecutionTime], DeJian.prototype, "highEff", null);

  DeJian_decorate([measureExecutionTime], DeJian.prototype, "medEff", null);

  DeJian_decorate([measureExecutionTime], DeJian.prototype, "lowEff", null);

  DeJian_decorate([measureExecutionTime], DeJian.prototype, "weight", null);

  DeJian_decorate([functionLog("阅读")], DeJian.prototype, "readBook", null);

  DeJian_decorate([functionLog("领取奖励")], DeJian.prototype, "reward", null);

  DeJian_decorate([functionLog("签到")], DeJian.prototype, "signIn", null);

  DeJian_decorate([functionLog("领取餐补")], DeJian.prototype, "mealSupp", null);

  DeJian_decorate([functionLog("看广告")], DeJian.prototype, "watchAds", null);

  DeJian_decorate([functionLog("参加活动")], DeJian.prototype, "joinActivity", null);

  DeJian_decorate([functionLog("开宝箱")], DeJian.prototype, "openTreasure", null);

  return DeJian;
}(Base);


;// CONCATENATED MODULE: ./src/scripts/abstract/AbstractFreeNovel.ts


var AbstractFreeNovel_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var AbstractFreeNovel_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var AbstractFreeNovel = function (_super) {
  AbstractFreeNovel_extends(AbstractFreeNovel, _super);

  function AbstractFreeNovel(packageName) {
    var _this = _super.call(this) || this;

    _this.tab = id(packageName + ":id/home_activity_navigation_bar");
    _this.initialComponent = _this.tab;
    _this.initialNum = 1;
    _this.highEffEstimatedTime = _this.fetch(Base_BaseKey.highEffEstimatedTime, 15 * 60);
    _this.lowEffEstimatedTime = 0;
    _this.lowEffAssmitCount = 2;
    return _this;
  }

  AbstractFreeNovel.prototype.highEff = function () {
    var _this = this;

    this.signIn();
    randomExecute([function () {
      _this.openTreasure();
    }, function () {
      _this.watchAds();
    }, function () {
      _this.shopping();
    }, function () {
      _this.luckySpin();
    }]);
  };

  AbstractFreeNovel.prototype.lowEff = function (time) {
    var _this = this;

    doFuncAtGivenTime(time / 2, 30 * 60, function (perTime) {
      _this.readBook(perTime);

      _this.openTreasure();

      return perTime;
    });
    var isFirst = true;
    doFuncAtGivenTime(time / 2, 30 * 60, function (perTime) {
      if (isFirst) {
        _this.listenBook();

        isFirst = false;
      } else {
        _this.continueListen();
      }

      var actualTime = waitRandomTime(perTime);

      _this.openTreasure();

      return actualTime;
    });
  };

  AbstractFreeNovel.prototype.weight = function () {
    this.goTo(this.tab, 2);

    if (scrollClick("我的金币")) {
      var tmp = textStartsWith("今日金币").findOnce();

      if (tmp != null) {
        var match = tmp.text().replace(",", "").match(/[0-9]+/);

        if (match) {
          var weight = parseInt(match[0]);
          Record.debug("".concat(this.constructor.name, ":").concat(parseInt(match[0])));
          this.store(Base_BaseKey.Weight, weight);
          this.store(Base_BaseKey.Money, (weight / 10000).toFixed(2));
        }
      }
    }
  };

  AbstractFreeNovel.prototype.signIn = function () {
    this.goTo(this.tab, 2);
    this.watchAdsForCoin("日常福利");
  };

  AbstractFreeNovel.prototype.openTreasure = function () {
    this.goTo(this.tab, 2);
    this.watchAdsForCoin("日常福利");

    if (ocrClick('开宝箱得金币')) {
      this.watchAdsForCoin("日常福利");
    }
  };

  AbstractFreeNovel.prototype.watchAds = function () {
    this.goTo(this.tab, 2);

    if (scrollClick("去观看", "看小视频赚金币.*")) {
      this.watch(text("日常福利"));
      scrollClick("领金币", "看小视频赚金币.*");
    }
  };

  AbstractFreeNovel.prototype.shopping = function () {
    this.goTo(this.tab, 2);
    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS && scrollClick("去逛逛", "逛街赚金币.*")) {
      this.watch(text("日常福利"));
      scrollClick("领金币", "逛街赚金币.*");
    }
  };

  AbstractFreeNovel.prototype.readBook = function (totalTime) {
    this.openBook();
    this.read(totalTime);
  };

  AbstractFreeNovel.prototype.listenBook = function () {
    this.openBook();

    if (!id(this.packageName + ":id/reader_listen_entry").exists()) {
      normalClick(device.width / 2, device.height / 2);
    }

    if (findAndClick(id(this.packageName + ":id/reader_listen_entry"), {
      fixed: true
    })) {
      if (dialogClick("去看小视频")) {
        this.watch(text("边听边读"));
      }

      fixedClick("边听边读");
    }
  };

  AbstractFreeNovel.prototype.luckySpin = function () {
    this.goTo(this.tab, 2);

    if (scrollClick("去抽奖", "幸运大转盘.*")) {
      var tmp = textStartsWith("今日剩余抽奖次数").findOnce();

      if (tmp != null) {
        var count = tmp.text().match("[0-9]+");

        if (count) {
          Record.debug("".concat(count));

          for (var i = 0; i < parseInt(count[0]); i++) {
            findAndClick("抽奖", {
              fixed: true,
              ocrRecognize: true,
              waitTimes: 10,
              bounds: {
                bottom: 1656
              }
            });
            this.watch(text("幸运大转盘"));
            findAndClick("好的", {
              fixed: true,
              waitFor: true,
              clickUntilGone: true
            });
          }
        }
      }
    }
  };

  AbstractFreeNovel.prototype.continueListen = function () {
    if (!id(this.packageName + ":id/voice_rl").exists()) {
      this.listenBook();
    } else {
      if (findAndClick(id(this.packageName + ":id/voice_rl"))) {
        if (dialogClick("去看小视频")) {
          this.watch(text("边听边读"));
        }

        fixedClick("边听边读");
      }
    }
  };

  AbstractFreeNovel.prototype.openBook = function () {
    this.goTo(this.tab, 1);

    if (selectedClick("推荐", 170)) {
      readClick(id(this.packageName + ":id/tv_book_one_book_title"), random(0, 3));
    }
  };

  AbstractFreeNovel_decorate([measureExecutionTime], AbstractFreeNovel.prototype, "highEff", null);

  AbstractFreeNovel_decorate([measureExecutionTime], AbstractFreeNovel.prototype, "lowEff", null);

  AbstractFreeNovel_decorate([measureExecutionTime], AbstractFreeNovel.prototype, "weight", null);

  AbstractFreeNovel_decorate([functionLog("签到")], AbstractFreeNovel.prototype, "signIn", null);

  AbstractFreeNovel_decorate([functionLog("开宝箱")], AbstractFreeNovel.prototype, "openTreasure", null);

  AbstractFreeNovel_decorate([functionLog("看视频")], AbstractFreeNovel.prototype, "watchAds", null);

  AbstractFreeNovel_decorate([functionLog("逛街")], AbstractFreeNovel.prototype, "shopping", null);

  AbstractFreeNovel_decorate([functionLog("阅读")], AbstractFreeNovel.prototype, "readBook", null);

  AbstractFreeNovel_decorate([functionLog("听书")], AbstractFreeNovel.prototype, "listenBook", null);

  AbstractFreeNovel_decorate([functionLog("幸运大转盘")], AbstractFreeNovel.prototype, "luckySpin", null);

  return AbstractFreeNovel;
}(Base);


;// CONCATENATED MODULE: ./src/scripts/EggplantFree.ts
var EggplantFree_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();




var EggplantFree = function (_super) {
  EggplantFree_extends(EggplantFree, _super);

  function EggplantFree() {
    var _this = _super.call(this, PACKAGE_EGGPLANT_FREE) || this;

    _this.appName = NAME_READ_EGGPLANT_FREE;
    _this.packageName = PACKAGE_EGGPLANT_FREE;
    return _this;
  }

  return EggplantFree;
}(AbstractFreeNovel);


;// CONCATENATED MODULE: ./src/scripts/KuaiShou.ts


var KuaiShou_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var KuaiShou_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var KuaiShou = function (_super) {
  KuaiShou_extends(KuaiShou, _super);

  function KuaiShou() {
    var _this = _super.call(this) || this;

    _this.buttonNameList = ['看内容最高可得[0-9]+金币.*', '看视频最高可得[0-9]+金币.*'];
    _this.appName = NAME_VEDIO_KUAISHOU;
    _this.packageName = PACKAGE_VEDIO_KUAISHOU;
    _this.tab = id(_this.packageName + ":id/tab_layout");
    _this.register = id(_this.packageName + ":id/pendant_mask_bg");
    _this.depth = 1;
    _this.highEffEstimatedTime = _this.fetch(Base_BaseKey.highEffEstimatedTime, BASE_ASSIMT_TIME);
    _this.medEffEstimatedTime = _this.fetch(Base_BaseKey.medEffEstimatedTime, 15 * 60);
    _this.lowEffEstimatedTime = 0;
    return _this;
  }

  KuaiShou.prototype.highEff = function () {
    this.signIn();
    this.openTreasure();
  };

  KuaiShou.prototype.medEff = function () {
    this.watchAds();
    this.openTreasure();
    this.watchlive();
  };

  KuaiShou.prototype.lowEff = function (time) {
    var _this = this;

    doFuncAtGivenTime(time, 10 * 60, function (perTime) {
      _this.swipeVideo(perTime);

      _this.openTreasure();
    });
    this.reward();
  };

  KuaiShou.prototype.weight = function () {
    if (!text("日常任务").exists()) {
      this.goTo(this.register, -1);
    }

    scrollTo("金币收益");
    var tmp = textMatches(/(\d+)/).boundsInside(0, 0, resizeX(549), resizeY(429)).findOnce();

    if (tmp != null) {
      this.store(Base_BaseKey.Weight, parseInt(tmp.text()));
    }
  };

  KuaiShou.prototype.signIn = function () {
    if (!text("日常任务").exists()) {
      this.goTo(this.register, -1);
    }

    if (findAndClick("立即领取")) {
      this.watchAdsForCoin("日常任务");
      closeByImageMatching();
    }
  };

  KuaiShou.prototype.swipeVideo = function (totalTime) {
    this.goTo(this.tab, 1);
    moveDown(totalTime, 10);
  };

  KuaiShou.prototype.openTreasure = function () {
    if (!text("日常任务").exists()) {
      this.goTo(this.register, -1);
    }

    if (findAndClick("立刻领[0-9]+金币")) {
      this.watchAdsForCoin("日常任务");
    }
  };

  KuaiShou.prototype.watchAds = function () {
    if (!text("日常任务").exists()) {
      this.goTo(this.register, -1);
    }

    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS && findAndClick("领福利 赚更多")) {}
  };

  KuaiShou.prototype.watchlive = function () {
    if (!text("日常任务").exists()) {
      this.goTo(this.register, -1);
    }

    if (findAndClick("去观看")) {
      for (var i = 0; i < 6; i++) {
        var tmp = id(this.packageName + ":id/recycler_view").findOnce();

        if (tmp != null) {
          var child = tmp.child(0);

          if (child != null) {
            child.click();
            waitRandomTime(40);
            back();
            waitRandomTime(4);
            findAndClick("退出");
          }

          for (var j = 0; j < 2; j++) {
            tmp.scrollForward();
            waitRandomTime(2);
          }
        }
      }

      this.backUntilFind(text("日常任务"));

      if (findAndClick("领金币 限时领")) {
        findAndClick("知道了");
      }
    }
  };

  KuaiShou.prototype.mealSupp = function () {
    if (!text("日常任务").exists()) {
      this.goTo(this.register, -1);
    }

    if (findAndClick("去领取")) {
      if (findAndClick("领取饭补")) {
        this.watchAdsForCoin("日常任务");
      }

      this.backUntilFind(text("日常任务"));
    }
  };

  KuaiShou.prototype.reward = function () {
    if (!text("日常任务").exists()) {
      this.goTo(this.register, -1);
    }

    findAndClick("领取奖励");
  };

  KuaiShou_decorate([measureExecutionTime], KuaiShou.prototype, "highEff", null);

  KuaiShou_decorate([measureExecutionTime], KuaiShou.prototype, "medEff", null);

  KuaiShou_decorate([measureExecutionTime], KuaiShou.prototype, "lowEff", null);

  KuaiShou_decorate([measureExecutionTime], KuaiShou.prototype, "weight", null);

  KuaiShou_decorate([functionLog("签到")], KuaiShou.prototype, "signIn", null);

  KuaiShou_decorate([functionLog("刷视频")], KuaiShou.prototype, "swipeVideo", null);

  KuaiShou_decorate([functionLog("开宝箱")], KuaiShou.prototype, "openTreasure", null);

  KuaiShou_decorate([functionLog("看视频")], KuaiShou.prototype, "watchAds", null);

  KuaiShou_decorate([functionLog("看直播")], KuaiShou.prototype, "watchlive", null);

  KuaiShou_decorate([functionLog("领饭补")], KuaiShou.prototype, "mealSupp", null);

  KuaiShou_decorate([functionLog("领取奖励")], KuaiShou.prototype, "reward", null);

  return KuaiShou;
}(Base);


;// CONCATENATED MODULE: ./src/scripts/KuaiShouFree.ts


var KuaiShouFree_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var KuaiShouFree_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var KuaiShouFree = function (_super) {
  KuaiShouFree_extends(KuaiShouFree, _super);

  function KuaiShouFree() {
    var _this = _super.call(this) || this;

    _this.buttonNameList = ['看视频赚更多', '看广告赚更多'];
    _this.coin = 0;
    _this.isFirst = true;
    _this.appName = NAME_READ_KUAISHOU_FREE;
    _this.packageName = PACKAGE_READ_KUAISHOU_FREE;
    _this.tab = id(_this.packageName + ":id/home_bottom_bar");
    _this.initialComponent = _this.tab;
    _this.initialNum = 1;
    _this.exitNum = 2;
    _this.highEffEstimatedTime = _this.fetch(Base_BaseKey.highEffEstimatedTime, 20 * 60);
    _this.lowEffEstimatedTime = 0;
    return _this;
  }

  KuaiShouFree.prototype.highEff = function () {
    this.signIn();
    this.coin = this.record();
    this.openTreasure();
    this.watchAds();
  };

  KuaiShouFree.prototype.lowEff = function (time) {
    var _this = this;

    doFuncAtGivenTime(time, 10 * 60, function (perTime) {
      _this.readBook(perTime);

      _this.openTreasure();

      _this.reward();
    });
  };

  KuaiShouFree.prototype.weight = function () {
    var weight = this.record() - this.coin;
    this.store(Base_BaseKey.Weight, weight);
    this.store(Base_BaseKey.Money, (weight / 10000).toFixed(2));
  };

  KuaiShouFree.prototype.signIn = function () {
    this.goTo(this.tab, 2);

    if (dialogClick("立即签到")) {
      closeByImageMatching();
    }
  };

  KuaiShouFree.prototype.watchAds = function () {
    this.goTo(this.tab, 2);
    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS && scrollClick("去赚钱", "看视频赚[0-9]+金币")) {
      this.watch(text("日常任务"));
    }
  };

  KuaiShouFree.prototype.openTreasure = function () {
    this.goTo(this.tab, 2);

    if (fixedClick("点击领[0-9]+金币")) {
      this.watchAdsForCoin("日常任务");
    }
  };

  KuaiShouFree.prototype.readBook = function (totalTime) {
    this.goTo(this.tab, 1);
    fixedClick("领[0-9]+金币");

    if (readClick(id(this.packageName + ":id/book_name"), random(0, 3))) {
      this.read(totalTime);
    }
  };

  KuaiShouFree.prototype.reward = function () {
    this.goTo(this.tab, 2);
    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS && scrollClick("去领取", "认真阅读小说额外奖励")) {
      this.watchAdsForCoin("日常任务");
    }
  };

  KuaiShouFree.prototype.record = function () {
    this.goTo(this.tab, 2);
    var str = ocr.recognizeText(getScreenImage({
      left: resizeX(78),
      top: resizeY(339),
      right: resizeX(360),
      bottom: resizeY(438)
    }));
    var match = str.match("[0-9]+");

    if (match) {
      return parseInt(match[0]);
    }

    return 0;
  };

  KuaiShouFree_decorate([measureExecutionTime], KuaiShouFree.prototype, "highEff", null);

  KuaiShouFree_decorate([measureExecutionTime], KuaiShouFree.prototype, "lowEff", null);

  KuaiShouFree_decorate([measureExecutionTime], KuaiShouFree.prototype, "weight", null);

  KuaiShouFree_decorate([functionLog("签到")], KuaiShouFree.prototype, "signIn", null);

  KuaiShouFree_decorate([functionLog("看视频")], KuaiShouFree.prototype, "watchAds", null);

  KuaiShouFree_decorate([functionLog("开宝箱")], KuaiShouFree.prototype, "openTreasure", null);

  KuaiShouFree_decorate([functionLog("阅读")], KuaiShouFree.prototype, "readBook", null);

  KuaiShouFree_decorate([functionLog("领取奖励")], KuaiShouFree.prototype, "reward", null);

  return KuaiShouFree;
}(Base);


;// CONCATENATED MODULE: ./src/scripts/KuaiShouLite.ts


var KuaiShouLite_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var KuaiShouLite_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var KuaiShouLite = function (_super) {
  KuaiShouLite_extends(KuaiShouLite, _super);

  function KuaiShouLite() {
    var _this = _super.call(this) || this;

    _this.buttonNameList = ['看内容最高可得.+'];
    _this.appName = NAME_VEDIO_KUAISHOU_LITE;
    _this.packageName = PACKAGE_VEDIO_KUAISHOU_LITE;
    _this.tab = id(_this.packageName + ":id/tab_layout");
    _this.depth = 1;
    _this.highEffEstimatedTime = _this.fetch(Base_BaseKey.highEffEstimatedTime, BASE_ASSIMT_TIME);
    _this.medEffEstimatedTime = _this.fetch(Base_BaseKey.medEffEstimatedTime, 30 * 60);
    _this.lowEffEstimatedTime = 0;
    return _this;
  }

  KuaiShouLite.prototype.highEff = function () {
    this.signIn();
    this.openTreasure();
  };

  KuaiShouLite.prototype.medEff = function () {
    this.watchAds();
  };

  KuaiShouLite.prototype.lowEff = function (time) {
    var _this = this;

    doFuncAtGivenTime(time, 10 * 60, function (perTime) {
      _this.swipeVideo(perTime);

      _this.openTreasure();
    });
  };

  KuaiShouLite.prototype.weight = function () {
    this.store(Base_BaseKey.Weight, this.record());
  };

  KuaiShouLite.prototype.swipeVideo = function (totalTime) {
    this.goTo(this.tab, 0);
    moveDown(totalTime, 15);
  };

  KuaiShouLite.prototype.signIn = function () {
    this.goTo(this.tab, 2);

    if (findAndClick(text("立即领取"))) {
      this.watchAdsForCoin("日常福利");
      closeByImageMatching();
    }
  };

  KuaiShouLite.prototype.watchAds = function () {
    this.goTo(this.tab, 2);
    scrollTo("日常任务");
    var cycleCounts = 0;
  };

  KuaiShouLite.prototype.openTreasure = function () {
    this.goTo(this.tab, 2);

    if (text("恭喜你获得").exists()) {
      this.watchAdsForCoin("日常福利");
    }

    if (findAndClick(text("开宝箱得金币"))) {
      if (text("恭喜你获得").exists()) {
        this.watchAdsForCoin("日常福利");
      }
    }
  };

  KuaiShouLite.prototype.record = function () {
    this.goTo(this.tab, 2);

    if (findAndClick(text("我的金币"))) {
      var tmp = textEndsWith("金币").findOnce();

      if (tmp != null) {
        return parseInt(tmp.text());
      }
    }

    return 0;
  };

  KuaiShouLite_decorate([measureExecutionTime], KuaiShouLite.prototype, "highEff", null);

  KuaiShouLite_decorate([measureExecutionTime], KuaiShouLite.prototype, "medEff", null);

  KuaiShouLite_decorate([measureExecutionTime], KuaiShouLite.prototype, "lowEff", null);

  KuaiShouLite_decorate([measureExecutionTime], KuaiShouLite.prototype, "weight", null);

  KuaiShouLite_decorate([functionLog("刷视频")], KuaiShouLite.prototype, "swipeVideo", null);

  KuaiShouLite_decorate([functionLog("签到")], KuaiShouLite.prototype, "signIn", null);

  KuaiShouLite_decorate([functionLog("看广告")], KuaiShouLite.prototype, "watchAds", null);

  KuaiShouLite_decorate([functionLog("开宝箱")], KuaiShouLite.prototype, "openTreasure", null);

  return KuaiShouLite;
}(Base);


;// CONCATENATED MODULE: ./src/scripts/MarvelFree.ts


var MarvelFree_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var MarvelFree_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var MarvelFree = function (_super) {
  MarvelFree_extends(MarvelFree, _super);

  function MarvelFree() {
    var _this = _super.call(this) || this;

    _this.appName = NAME_READ_MARVEL_FREE;
    _this.packageName = PACKAGE_READ_MARVEL_FREE;
    _this.tab = id(_this.packageName + ":id/tab_layout");
    _this.initialComponent = _this.tab;
    _this.initialNum = 0;
    _this.depth = 1;
    _this.exitNum = 0;
    _this.highEffEstimatedTime = _this.fetch(Base_BaseKey.highEffEstimatedTime, 15 * 60);
    _this.lowEffEstimatedTime = 0;
    return _this;
  }

  MarvelFree.prototype.highEff = function () {
    this.signIn();
    this.openTreasure();
    this.watchAds();
  };

  MarvelFree.prototype.lowEff = function (time) {
    var _this = this;

    doFuncAtGivenTime(time, 10 * 60, function (perTime) {
      _this.readBook(perTime);

      _this.openTreasure();

      _this.reward();
    });
  };

  MarvelFree.prototype.weight = function () {
    this.goTo(this.tab, 2);
    scrollTo("金币收益");
    var tmp = textMatches("[0-9]+").boundsInside(0, 0, resizeX(582), resizeY(735)).findOnce();

    if (tmp != null) {
      var weight = parseInt(tmp.text());
      this.store(Base_BaseKey.Weight, weight);
      this.store(Base_BaseKey.Money, (weight / 10000).toFixed(2));
    }
  };

  MarvelFree.prototype.signIn = function () {
    this.goTo(this.tab, 2);

    if (textStartsWith("今日签到").exists()) {
      closeByImageMatching();
    }
  };

  MarvelFree.prototype.openTreasure = function () {
    this.goTo(this.tab, 2);

    if (fixedClick("开宝箱")) {
      this.watchAdsForCoin("日常福利");
    }
  };

  MarvelFree.prototype.watchAds = function () {
    this.goTo(this.tab, 2);
    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS && textMatches("看视频领金币.+").exists() && scrollClick("去领取", "看视频领金币.+")) {
      this.exitNum = 0;
      this.watch(text("日常福利"));
    }
  };

  MarvelFree.prototype.readBook = function (totalTime) {
    this.goTo(this.tab, 0);

    if (selectedClick("推荐", 170)) {
      if (readClick(id(PACKAGE_READ_MARVEL_FREE + ":id/tv_book_name"), random(0, 7))) {
        this.read(totalTime);
      }
    }
  };

  MarvelFree.prototype.reward = function () {
    this.goTo(this.tab, 2);
    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS && findAndClick(text("领金币").depth(24))) {
      this.watchAdsForCoin("日常福利");
    }
  };

  MarvelFree_decorate([measureExecutionTime], MarvelFree.prototype, "highEff", null);

  MarvelFree_decorate([measureExecutionTime], MarvelFree.prototype, "lowEff", null);

  MarvelFree_decorate([measureExecutionTime], MarvelFree.prototype, "weight", null);

  MarvelFree_decorate([functionLog("签到")], MarvelFree.prototype, "signIn", null);

  MarvelFree_decorate([functionLog("开宝箱")], MarvelFree.prototype, "openTreasure", null);

  MarvelFree_decorate([functionLog("看视频")], MarvelFree.prototype, "watchAds", null);

  MarvelFree_decorate([functionLog("阅读")], MarvelFree.prototype, "readBook", null);

  MarvelFree_decorate([functionLog("领取奖励")], MarvelFree.prototype, "reward", null);

  return MarvelFree;
}(Base);


;// CONCATENATED MODULE: ./src/scripts/PandaBrain.ts
var PandaBrain_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();




var PandaBrain = function (_super) {
  PandaBrain_extends(PandaBrain, _super);

  function PandaBrain() {
    var _this = _super.call(this, PACKAGE_READ_PANDA_BRAIN) || this;

    _this.appName = NAME_READ_PANDA_BRAIN;
    _this.packageName = PACKAGE_READ_PANDA_BRAIN;
    return _this;
  }

  return PandaBrain;
}(AbstractFreeNovel);


;// CONCATENATED MODULE: ./src/scripts/abstract/AbstractTomato.ts
var AbstractTomato_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();






var AbstractTomato = function (_super) {
  AbstractTomato_extends(AbstractTomato, _super);

  function AbstractTomato() {
    return _super.call(this) || this;
  }

  AbstractTomato.prototype.sign = function () {
    findAndClick('立即签到.+', {
      fixed: true,
      feedback: true
    });

    if (findAndClick('看视频立即续签|额外领[0-9]+金币', {
      fixed: true
    })) {
      this.watch(textMatches(merge(["日常福利", "看视频立即续签"])));

      if (text("看视频立即续签").exists()) {
        throw new CurrentAppBanned(this.appName);
      }
    }

    this.watchAdsForCoin("日常福利");
  };

  AbstractTomato.prototype.open = function () {
    if (fixedClick("开宝箱得金币")) {
      this.watchAdsForCoin("日常福利");
    }
  };

  return AbstractTomato;
}(Base);


;// CONCATENATED MODULE: ./src/scripts/RedFruits.ts


var RedFruits_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var RedFruits_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var RedFruits = function (_super) {
  RedFruits_extends(RedFruits, _super);

  function RedFruits() {
    var _this = _super.call(this) || this;

    _this.appName = NAME_READ_RED_FRUITS;
    _this.packageName = PACKAGE_READ_RED_FRUITS;
    _this.highEffEstimatedTime = _this.fetch(Base_BaseKey.highEffEstimatedTime, 20 * 60);
    _this.initialComponent = text("首页");
    _this.lowEffEstimatedTime = 0;
    _this.lowEffAssmitCount = 2;
    return _this;
  }

  RedFruits.prototype.highEff = function () {
    this.signIn();
    this.openTreasure();
    this.watchAds();
  };

  RedFruits.prototype.lowEff = function (time) {
    var _this = this;

    doFuncAtGivenTime(time / 2, 10 * 60, function (perTime) {
      _this.swipeVideo(perTime);

      _this.openTreasure();

      _this.reward();
    });
    doFuncAtGivenTime(time / 2, 10 * 60, function (perTime) {
      _this.readBook(perTime);

      _this.openTreasure();

      _this.reward();
    });
  };

  RedFruits.prototype.weight = function () {
    this.goTo(text("福利"), -1);
    scrollTo("金币收益");
    var tmp = textMatches(/(\d+)/).boundsInside(0, 0, resizeX(540), resizeY(442)).findOnce();

    if (tmp != null) {
      var weight = parseInt(tmp.text());
      this.store(Base_BaseKey.Weight, weight);
      this.store(Base_BaseKey.Money, (weight / 33000).toFixed(2));
    }
  };

  RedFruits.prototype.swipeVideo = function (totalTime) {
    this.goTo(text("首页"), -1);

    if (findAndClick(id(this.packageName + ":id/ll_tab_content_layout"), {
      selectedThreshold: 170,
      index: 1
    })) {
      if (readClick(id(this.packageName + ":id/title_tv"), random(0, 7))) {
        Record.log("\u8BA1\u5212\u65F6\u95F4: ".concat(convertSecondsToMinutes(totalTime), "\u5206\u949F"));
        var watchTime = 0;

        while (totalTime > watchTime) {
          if (textMatches(merge(["上滑查看下一集", "上滑继续观看短剧"])).exists()) {
            gesture(1000, [resizeX(random(380, 420)), resizeY(random(1750, 1850))], [resizeX(random(780, 820)), resizeY(random(250, 350))]);
          }

          watchTime += waitRandomTime(30);
        }
      }
    }
  };

  RedFruits.prototype.readBook = function (totalTime) {
    this.goTo(text("首页"), -1);

    if (selectedClick("经典", 170)) {
      if (findAndClick(id(this.packageName + ":id/name_tv"), {
        leftRange: random(1, 8).toString(),
        cover: true
      })) {
        this.read(totalTime);
      }
    }
  };

  RedFruits.prototype.reward = function () {
    this.goTo(text("福利"), -1);
    var cycleCounts = 0;
    var list = ["看短剧赚金币", "阅读赚金币"];

    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
      var range = list_1[_i];

      while (++cycleCounts < MAX_CYCLES_COUNTS && scrollClick("立即领取", range)) {
        this.watchAdsForCoin("日常福利");
      }
    }
  };

  RedFruits.prototype.signIn = function () {
    this.goTo(text("福利"), -1);
    this.sign();

    if (scrollClick("去签到")) {
      this.sign();
    }
  };

  RedFruits.prototype.watchAds = function () {
    this.goTo(text("福利"), -1);
    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS && scrollClick("去观看", "看视频赚海量金币")) {
      this.watch(text("日常福利"));
    }
  };

  RedFruits.prototype.openTreasure = function () {
    this.goTo(text("福利"), -1);
    this.open();
  };

  RedFruits.prototype.mealSupp = function () {
    this.goTo(text("福利"), -1);

    if (scrollClick("去领取", "吃饭补贴")) {
      if (fixedClick("领.*补贴[0-9]+金币")) {
        this.watchAdsForCoin("已按时吃饭[0-9]天");
      }

      var cycleCounts = 0;

      while (++cycleCounts < MAX_CYCLES_COUNTS && fixedClick("看视频补领一次补贴")) {
        this.watch(textMatches("已按时吃饭[0-9]天"));
        this.watchAdsForCoin("已按时吃饭[0-9]天");
      }
    }
  };

  RedFruits_decorate([measureExecutionTime], RedFruits.prototype, "highEff", null);

  RedFruits_decorate([measureExecutionTime], RedFruits.prototype, "lowEff", null);

  RedFruits_decorate([measureExecutionTime], RedFruits.prototype, "weight", null);

  RedFruits_decorate([functionLog("刷短剧")], RedFruits.prototype, "swipeVideo", null);

  RedFruits_decorate([functionLog("阅读")], RedFruits.prototype, "readBook", null);

  RedFruits_decorate([functionLog("领取奖励")], RedFruits.prototype, "reward", null);

  RedFruits_decorate([functionLog("签到")], RedFruits.prototype, "signIn", null);

  RedFruits_decorate([functionLog("看广告")], RedFruits.prototype, "watchAds", null);

  RedFruits_decorate([functionLog("开宝箱")], RedFruits.prototype, "openTreasure", null);

  RedFruits_decorate([functionLog("吃饭补贴")], RedFruits.prototype, "mealSupp", null);

  return RedFruits;
}(AbstractTomato);


;// CONCATENATED MODULE: ./src/scripts/SevenCatsFree.ts


var SevenCatsFree_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var SevenCatsFree_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var SevenCatsFree = function (_super) {
  SevenCatsFree_extends(SevenCatsFree, _super);

  function SevenCatsFree() {
    var _this = _super.call(this, PACKAGE_READ_SEVEN_CATS_FREE) || this;

    _this.appName = NAME_READ_SEVEN_CATS_FREE;
    _this.packageName = PACKAGE_READ_SEVEN_CATS_FREE;
    return _this;
  }

  SevenCatsFree.prototype.weight = function () {
    this.goTo(this.tab, 2);
    var tmp = textMatches(".*今日金币.*").findOnce();

    if (tmp != null) {
      var match = tmp.text().match(/[0-9]+今日金币/);

      if (match) {
        var weight = parseInt(match[0]);
        this.store(Base_BaseKey.Weight, weight);
        this.store(Base_BaseKey.Money, (weight / 10000).toFixed(2));
      }
    }
  };

  SevenCatsFree.prototype.signIn = function () {
    this.goTo(this.tab, 2);
    dialogClick("立即签到.+");
    this.watchAdsForCoin("日常福利");
  };

  SevenCatsFree_decorate([measureExecutionTime], SevenCatsFree.prototype, "weight", null);

  SevenCatsFree_decorate([functionLog("签到")], SevenCatsFree.prototype, "signIn", null);

  return SevenCatsFree;
}(AbstractFreeNovel);


;// CONCATENATED MODULE: ./src/scripts/ShuQi.ts


var ShuQi_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var ShuQi_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var ShuQi = function (_super) {
  ShuQi_extends(ShuQi, _super);

  function ShuQi() {
    var _this = _super.call(this) || this;

    _this.coin = 0;
    _this.appName = NAME_READ_SHUQI;
    _this.packageName = PACKAGE_READ_SHUQI;
    _this.tab = id("android:id/tabs");
    _this.initialComponent = _this.tab;
    _this.initialNum = 1;
    _this.exitNum = 0;
    _this.highEffEstimatedTime = _this.fetch(Base_BaseKey.highEffEstimatedTime, 15 * 60);
    _this.lowEffEstimatedTime = 0;
    return _this;
  }

  ShuQi.prototype.highEff = function () {
    this.signIn();
    this.watchAds();
    this.reward();
  };

  ShuQi.prototype.lowEff = function (time) {
    var _this = this;

    doFuncAtGivenTime(time, 20 * 60, function (perTime) {
      _this.readBook(perTime);

      _this.reward();
    });
  };

  ShuQi.prototype.weight = function () {
    this.goTo(this.tab, 4);
    var tmp = id(this.packageName + ":id/account_worth_money").findOnce();

    if (tmp != null) {
      var weight = parseInt(tmp.text());
      this.store(Base_BaseKey.Weight, weight);
      this.store(Base_BaseKey.Money, (weight / 10000).toFixed(2));
    }
  };

  ShuQi.prototype.signIn = function () {
    this.goTo(this.tab, 2);

    if (dialogClick("立即签到")) {
      closeByImageMatching();
    } else {
      if (scrollClick("去签到", "每日签到")) {
        if (dialogClick("立即签到")) {
          closeByImageMatching();
        }
      }
    }
  };

  ShuQi.prototype.watchAds = function () {
    this.goTo(this.tab, 2);
    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS && scrollClick("去观看", "看视频赚[0-9]+金币")) {
      this.watch(text("做任务 赚金币"));
    }
  };

  ShuQi.prototype.readBook = function (totalTime) {
    this.goTo(this.tab, 1);

    if (selectedClick("推荐", 170)) {
      if (readClick(id(this.packageName + ":id/tpl_book_name"), random(0, 7))) {
        this.read(totalTime);
      }
    }
  };

  ShuQi.prototype.reward = function () {
    this.goTo(this.tab, 2);

    if (scrollClick("(一键|加倍)收取")) {
      this.watchAdsForCoin("做任务 赚金币");
      dialogClick("领取加倍奖励");
      closeByImageMatching();
    }
  };

  ShuQi_decorate([measureExecutionTime], ShuQi.prototype, "highEff", null);

  ShuQi_decorate([measureExecutionTime], ShuQi.prototype, "lowEff", null);

  ShuQi_decorate([measureExecutionTime], ShuQi.prototype, "weight", null);

  ShuQi_decorate([functionLog("签到")], ShuQi.prototype, "signIn", null);

  ShuQi_decorate([functionLog("看视频")], ShuQi.prototype, "watchAds", null);

  ShuQi_decorate([functionLog("阅读")], ShuQi.prototype, "readBook", null);

  ShuQi_decorate([functionLog("领取奖励")], ShuQi.prototype, "reward", null);

  return ShuQi;
}(Base);


;// CONCATENATED MODULE: ./src/scripts/SpeedFree.ts


var SpeedFree_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var SpeedFree_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var SpeedFree = function (_super) {
  SpeedFree_extends(SpeedFree, _super);

  function SpeedFree() {
    var _this = _super.call(this) || this;

    _this.buttonNameList = ['看视频再领[0-9]+金币', '看视频最高领[0-9]+金币'];
    _this.topBar = "";
    _this.appName = NAME_READ_SPEED_FREE;
    _this.packageName = PACKAGE_READ_SPEED_FREE;
    _this.initialComponent = desc("bookstore_button");
    _this.highEffEstimatedTime = _this.fetch(Base_BaseKey.highEffEstimatedTime, 30 * 60);
    _this.lowEffEstimatedTime = 0;
    return _this;
  }

  SpeedFree.prototype.highEff = function () {
    this.signIn();
    this.listenBook();
    this.openTreasure();
    this.watchAds();
    this.reward();
  };

  SpeedFree.prototype.lowEff = function (time) {
    var _this = this;

    doFuncAtGivenTime(time, 10 * 60, function (perTime) {
      _this.readBook(perTime);

      _this.openTreasure();

      _this.reward();
    });
  };

  SpeedFree.prototype.weight = function () {
    this.goTo(desc("discovery_button"), -1);
    scrollTo("金币收益");
    var tmp = textMatches("[0-9]+").boundsInside(0, 0, resizeX(420), resizeY(432)).findOnce();

    if (tmp != null) {
      var weight = parseInt(tmp.text());
      this.store(Base_BaseKey.Weight, weight);
      this.store(Base_BaseKey.Money, (weight / 33000).toFixed(2));
    }
  };

  SpeedFree.prototype.signIn = function () {
    this.goTo(desc("discovery_button"), -1);

    if (dialogClick("立即签到.+")) {
      this.watchAdsForCoin("日常福利");
    }
  };

  SpeedFree.prototype.openTreasure = function () {
    this.goTo(desc("discovery_button"), -1);

    if (fixedClick("开宝箱得金币")) {
      this.watchAdsForCoin("日常福利");
    }
  };

  SpeedFree.prototype.watchAds = function () {
    this.goTo(desc("discovery_button"), -1);
    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS && scrollClick("去观看", "看视频赚金币")) {
      this.watch(text("日常福利"));
      this.watchAdsForCoin("日常福利");
    }
  };

  SpeedFree.prototype.readBook = function (totalTime) {
    this.goTo(desc("bookstore_button"), -1);
    var tmp = id("com.dj.speed:id/channel_tab").findOnce();

    if (tmp != null && findAndClick("推荐", {
      fixed: true,
      ocrRecognize: true,
      bounds: tmp.bounds(),
      selectedThreshold: 100
    })) {
      if (readClick(id("com.zhangyue.iReader.bookStore:id/iv_book"), random(0, 5))) {
        this.read(totalTime);
      }
    }
  };

  SpeedFree.prototype.listenBook = function () {
    this.goTo(desc("bookstore_button"), -1);
    var tmp = id("com.dj.speed:id/channel_tab").findOnce();

    if (tmp != null && findAndClick("听书", {
      fixed: true,
      ocrRecognize: true,
      bounds: tmp.bounds(),
      selectedThreshold: 100
    })) {
      if (findAndClick(id("com.zhangyue.iReader.bookStore:id/id_audition_btn"), {
        index: random(0, 7)
      })) {
        if (dialogClick(merge(["看视频", "看广告加时长"]))) {
          this.watch(desc("bookstore_button"));
        }
      }
    }
  };

  SpeedFree.prototype.mealSupp = function () {
    this.goTo(desc("discovery_button"), -1);

    if (scrollClick("立即领取", "吃饭赚钱")) {
      this.watchAdsForCoin("日常福利");
    }
  };

  SpeedFree.prototype.reward = function () {
    this.goTo(desc("discovery_button"), -1);
    var cycleCounts = 0;
    var list = ["阅读赚海量金币", "听书赚海量金币"];

    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
      var range = list_1[_i];

      while (++cycleCounts < MAX_CYCLES_COUNTS && scrollClick("领取", range)) {
        this.watchAdsForCoin("日常福利");
      }
    }
  };

  SpeedFree_decorate([measureExecutionTime], SpeedFree.prototype, "highEff", null);

  SpeedFree_decorate([measureExecutionTime], SpeedFree.prototype, "lowEff", null);

  SpeedFree_decorate([measureExecutionTime], SpeedFree.prototype, "weight", null);

  SpeedFree_decorate([functionLog("签到")], SpeedFree.prototype, "signIn", null);

  SpeedFree_decorate([functionLog("开宝箱")], SpeedFree.prototype, "openTreasure", null);

  SpeedFree_decorate([functionLog("看广告")], SpeedFree.prototype, "watchAds", null);

  SpeedFree_decorate([functionLog("阅读")], SpeedFree.prototype, "readBook", null);

  SpeedFree_decorate([functionLog("听书")], SpeedFree.prototype, "listenBook", null);

  SpeedFree_decorate([functionLog("领饭补")], SpeedFree.prototype, "mealSupp", null);

  SpeedFree_decorate([functionLog("领取奖励")], SpeedFree.prototype, "reward", null);

  return SpeedFree;
}(Base);


;// CONCATENATED MODULE: ./src/scripts/StarrySky.ts
var StarrySky_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();




var StarrySky = function (_super) {
  StarrySky_extends(StarrySky, _super);

  function StarrySky() {
    var _this = _super.call(this, PACKAGE_READ_STARRY_SKY) || this;

    _this.appName = NAME_READ_STARRY_SKY;
    _this.packageName = PACKAGE_READ_STARRY_SKY;
    return _this;
  }

  return StarrySky;
}(AbstractFreeNovel);


;// CONCATENATED MODULE: ./src/scripts/TikTokLite.ts


var TikTokLite_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var TikTokLite_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var TikTokLite = function (_super) {
  TikTokLite_extends(TikTokLite, _super);

  function TikTokLite() {
    var _this = _super.call(this) || this;

    _this.buttonNameList = ['看广告视频再赚'];
    _this.appName = NAME_VEDIO_TIKTOK_LITE;
    _this.packageName = PACKAGE_VEDIO_TIKTOK_LITE;
    _this.register = className("android.widget.ImageView").depth(19).drawingOrder(1);
    _this.tab = id(_this.packageName + ":id/root_view");
    return _this;
  }

  TikTokLite.prototype.highEff = function () {
    this.signIn();
    this.openTreasure();
  };

  TikTokLite.prototype.medEff = function () {
    this.watchLive();
    this.shopping();
  };

  TikTokLite.prototype.lowEff = function (time) {
    var _this = this;

    doFuncAtGivenTime(time, 10 * 60, function (perTime) {
      _this.swipeVideo(perTime);

      _this.openTreasure();

      _this.watchAds();
    });
  };

  TikTokLite.prototype.weight = function () {
    if (!text("日常任务").exists()) {
      this.goTo(this.register, -1);
    }

    scrollTo("金币收益");
    normalClick(resizeX(random(104, 328)), resizeY(random(389, 493)));
    var tmp = textMatches(/(\d+)/).boundsInside(0, 0, resizeX(328), resizeY(594)).findOnce();

    if (tmp != null) {
      this.store(Base_BaseKey.Weight, parseInt(tmp.text()));
    }
  };

  TikTokLite.prototype.signIn = function () {
    if (!text("日常任务").exists()) {
      this.goTo(this.register, -1);
    }

    findAndClick(text("点击领取"));
    this.watchAdsForCoin("日常福利");
  };

  TikTokLite.prototype.openTreasure = function () {
    if (!text("日常任务").exists()) {
      this.goTo(this.register, -1);
    }

    if (findAndClick(text("开宝箱得金币"))) {}
  };

  TikTokLite.prototype.watchAds = function () {
    if (!text("日常任务").exists()) {
      this.goTo(this.register, -1);
    }

    if (findAndClick(text("去观看"))) {}
  };

  TikTokLite.prototype.watchLive = function () {
    if (!text("日常任务").exists()) {
      this.goTo(this.register, -1);
    }

    if (findAndClick(text("去看看"))) {
      for (var i = 0; i < 10; i++) {
        var tmp = text("开宝箱").findOne(3 * 65 * 1000);

        if (tmp != null) {
          randomClick(tmp.bounds());
          back();
        }
      }

      this.backUntilFind(text("日常任务"));
    }
  };

  TikTokLite.prototype.shopping = function () {
    if (!text("日常任务").exists()) {
      this.goTo(this.register, -1);
    }

    if (findAndClick(text("去逛街"))) {
      moveDown(95, 2);
    }
  };

  TikTokLite.prototype.goodNight = function () {
    if (!text("日常任务").exists()) {
      this.goTo(this.register, -1);
    }

    if (findAndClick(text("去小岛"))) {
      if (findAndClick(text("我睡觉了"))) {
        this.backUntilFind(text("日常任务"));
      }
    }
  };

  TikTokLite.prototype.swipeVideo = function (totalTime) {
    this.goTo(this.tab, 0);
    moveDown(totalTime, 10);
  };

  TikTokLite_decorate([measureExecutionTime], TikTokLite.prototype, "highEff", null);

  TikTokLite_decorate([measureExecutionTime], TikTokLite.prototype, "medEff", null);

  TikTokLite_decorate([measureExecutionTime], TikTokLite.prototype, "lowEff", null);

  TikTokLite_decorate([measureExecutionTime], TikTokLite.prototype, "weight", null);

  TikTokLite_decorate([functionLog("签到")], TikTokLite.prototype, "signIn", null);

  TikTokLite_decorate([functionLog("开宝箱")], TikTokLite.prototype, "openTreasure", null);

  TikTokLite_decorate([functionLog("看视频")], TikTokLite.prototype, "watchAds", null);

  TikTokLite_decorate([functionLog("看直播")], TikTokLite.prototype, "watchLive", null);

  TikTokLite_decorate([functionLog("逛街")], TikTokLite.prototype, "shopping", null);

  TikTokLite_decorate([functionLog("晚安小岛")], TikTokLite.prototype, "goodNight", null);

  TikTokLite_decorate([functionLog("刷视频")], TikTokLite.prototype, "swipeVideo", null);

  return TikTokLite;
}(Base);


;// CONCATENATED MODULE: ./src/scripts/Tomato.ts


var Tomato_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var Tomato_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var Tomato = function (_super) {
  Tomato_extends(Tomato, _super);

  function Tomato() {
    var _this = _super.call(this) || this;

    _this.appName = NAME_READ_TOMATO;
    _this.packageName = PACKAGE_READ_TOMATO;
    _this.randomTab = className("android.widget.RadioGroup").boundsInside(0, device.height - 300, device.width, device.height).boundsContains(0, device.height - 100, device.width, device.height - 50);
    _this.initialNum = 0;
    _this.highEffEstimatedTime = _this.fetch(Base_BaseKey.highEffEstimatedTime, BASE_ASSIMT_TIME);
    _this.medEffEstimatedTime = _this.fetch(Base_BaseKey.medEffEstimatedTime, 90 * 60);
    _this.lowEffEstimatedTime = 0;
    return _this;
  }

  Tomato.prototype.highEff = function () {
    var _this = this;

    this.signIn();
    randomExecute([function () {
      _this.openTreasure();
    }, function () {
      _this.winGoldCoin();
    }, function () {
      _this.listenBook();
    }, function () {
      _this.watchAds();
    }]);
  };

  Tomato.prototype.medEff = function () {
    var cycleCounts = 0;

    do {
      this.readBook(3 * 60);

      if (cycleCounts % 3 == 0) {
        this.openTreasure();
      }
    } while (++cycleCounts < MAX_CYCLES_COUNTS && this.watchAds());

    this.reward();
  };

  Tomato.prototype.lowEff = function (time) {
    var _this = this;

    doFuncAtGivenTime(time, 10 * 60, function (perTime) {
      _this.readBook(perTime);

      _this.watchAds();

      _this.openTreasure();

      _this.reward();
    });
  };

  Tomato.prototype.weight = function () {
    this.goTo(this.tab, 2);
    scrollTo("金币收益");
    var tmp = textMatches(/(\d+)/).boundsInside(0, 0, resizeX(535), resizeY(627)).findOnce();

    if (tmp != null) {
      var weight = parseInt(tmp.text());
      this.store(Base_BaseKey.Weight, weight);
      this.store(Base_BaseKey.Money, (weight / 30000).toFixed(2));
    }
  };

  Tomato.prototype.signIn = function () {
    this.goTo(this.tab, 2);
    this.sign();
    scrollTo("金币献爱心", {
      waitFor: true
    });

    if (scrollClick("立即签到", "(明日)?签到")) {
      this.sign();
    }
  };

  Tomato.prototype.reward = function () {
    this.goTo(this.tab, 2);
    var cycleCounts = 0;
    var list = ["听书赚金币", "阅读赚金币"];

    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
      var range = list_1[_i];

      while (++cycleCounts < MAX_CYCLES_COUNTS && scrollClick("(?:立即|翻倍)领取", range)) {
        this.watchAdsForCoin("日常福利");
      }
    }
  };

  Tomato.prototype.listenBook = function () {
    this.goTo(this.tab, 0);

    if (selectedClick("推荐", 170)) {
      findAndClick(className("android.widget.TextView"), {
        leftRange: random(1, 4).toString(),
        index: 1
      });

      while (!text("阅读电子书").exists()) {
        back();
        waitRandomTime(3);
        gesture(1000, [resizeX(random(580, 620)), resizeY(random(950, 1050))], [resizeX(random(780, 820)), resizeY(random(1750, 1850))]);
        waitRandomTime(3);
        findAndClick(className("android.widget.TextView"), {
          leftRange: random(1, 4).toString(),
          index: 1
        });
      }

      fixedClick(merge(["开始播放", "续播"]));
    }
  };

  Tomato.prototype.readBook = function (totalTime) {
    this.goTo(this.tab, 0);

    if (selectedClick("推荐", 170)) {
      findAndClick(className("android.widget.TextView"), {
        leftRange: random(1, 4).toString(),
        cover: true
      });

      while (!text("阅读电子书").exists()) {
        back();
        waitRandomTime(3);
        gesture(1000, [resizeX(random(580, 620)), resizeY(random(950, 1050))], [resizeX(random(780, 820)), resizeY(random(1750, 1850))]);
        waitRandomTime(3);
        findAndClick(className("android.widget.TextView"), {
          leftRange: random(1, 4).toString(),
          cover: true
        });
      }

      if (fixedClick("阅读电子书")) {
        this.read(totalTime);
      }
    }
  };

  Tomato.prototype.watchAds = function () {
    this.goTo(this.tab, 2);

    if (!text("看视频赚金币").exists()) {
      scrollTo("金币献爱心", {
        waitFor: true
      });
    }

    if (scrollClick("立即观看", "看视频赚金币")) {
      this.watch(text("日常福利"));
      var tmp = text("立即观看").findOne(10 * 1000);

      if (tmp != null) {
        this.watchAds();
      }

      return true;
    }

    return false;
  };

  Tomato.prototype.openTreasure = function () {
    this.goTo(this.tab, 2);
    this.open();
  };

  Tomato.prototype.winGoldCoin = function () {
    this.goTo(this.tab, 2);

    if (scrollClick("去抽奖", "天天抽奖赢金币")) {
      dialogClick("抽奖");
    }
  };

  Tomato_decorate([measureExecutionTime], Tomato.prototype, "highEff", null);

  Tomato_decorate([measureExecutionTime], Tomato.prototype, "medEff", null);

  Tomato_decorate([measureExecutionTime], Tomato.prototype, "lowEff", null);

  Tomato_decorate([measureExecutionTime], Tomato.prototype, "weight", null);

  Tomato_decorate([functionLog("签到")], Tomato.prototype, "signIn", null);

  Tomato_decorate([functionLog("领取奖励")], Tomato.prototype, "reward", null);

  Tomato_decorate([functionLog("听书")], Tomato.prototype, "listenBook", null);

  Tomato_decorate([functionLog("阅读")], Tomato.prototype, "readBook", null);

  Tomato_decorate([functionLog("看广告")], Tomato.prototype, "watchAds", null);

  Tomato_decorate([functionLog("开宝箱")], Tomato.prototype, "openTreasure", null);

  Tomato_decorate([functionLog("抽奖赢金币")], Tomato.prototype, "winGoldCoin", null);

  return Tomato;
}(AbstractTomato);


;// CONCATENATED MODULE: ./src/scripts/TomatoFree.ts


var TomatoFree_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var TomatoFree_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var TomatoFree = function (_super) {
  TomatoFree_extends(TomatoFree, _super);

  function TomatoFree() {
    var _this = _super.call(this) || this;

    _this.appName = NAME_READ_TOMATO_FREE;
    _this.packageName = PACKAGE_READ_TOMATO_FREE;
    _this.randomTab = className("android.view.ViewGroup").boundsInside(0, device.height - 300, device.width, device.height).boundsContains(100, device.height - 100, device.width - 100, device.height - 50);
    _this.initialNum = 0;
    _this.highEffEstimatedTime = _this.fetch(Base_BaseKey.highEffEstimatedTime, 35 * 60);
    _this.lowEffEstimatedTime = 0;
    _this.lowEffAssmitCount = 2;
    return _this;
  }

  TomatoFree.prototype.highEff = function () {
    var _this = this;

    this.signIn();
    randomExecute([function () {
      _this.openTreasure();
    }, function () {
      _this.mealSupp();
    }, function () {
      _this.listenBook();

      _this.watchAds();
    }]);
    this.reward();
  };

  TomatoFree.prototype.lowEff = function (time) {
    var _this = this;

    doFuncAtGivenTime(time / 2, 10 * 60, function (perTime) {
      _this.readBook(perTime);

      _this.openTreasure();

      _this.reward();
    });
    doFuncAtGivenTime(time / 2, 10 * 60, function (perTime) {
      _this.swipeVideo(perTime);

      _this.openTreasure();

      _this.reward();
    });
  };

  TomatoFree.prototype.weight = function () {
    this.goTo(this.tab, 2);
    scrollTo("金币收益");
    var tmp = textMatches(/(\d+)/).boundsInside(0, 0, resizeX(581), resizeY(567)).findOnce();

    if (tmp != null) {
      var weight = parseInt(tmp.text());
      this.store(Base_BaseKey.Weight, weight);
      this.store(Base_BaseKey.Money, (weight / 30000).toFixed(2));
    }
  };

  TomatoFree.prototype.signIn = function () {
    this.goTo(this.tab, 2);

    if (selectedClick("福利中心", 80)) {
      this.sign();
      scrollTo("金币献爱心", {
        waitFor: true
      });

      if (scrollClick("去签到")) {
        this.sign();
      }
    }
  };

  TomatoFree.prototype.listenBook = function () {
    this.goTo(this.tab, 0);

    if (selectedClick("听书", 170)) {
      if (findAndClick(className("android.widget.TextView"), {
        leftRange: random(1, 4).toString(),
        cover: true
      })) {
        fixedClick(merge(["全部播放", "续播"]));
      }
    }
  };

  TomatoFree.prototype.mealSupp = function () {
    this.goTo(this.tab, 2);

    if (scrollClick("去领取", "吃饭补贴")) {
      if (dialogClick("领取.*补贴[0-9]+金币")) {
        this.watchAdsForCoin("日常福利");
      }
    }
  };

  TomatoFree.prototype.readBook = function (totalTime) {
    this.goTo(this.tab, 0);

    if (selectedClick("经典", 170)) {
      if (findAndClick(className("android.widget.TextView"), {
        leftRange: random(1, 3).toString(),
        cover: true
      })) {
        this.read(totalTime);
      }
    }
  };

  TomatoFree.prototype.reward = function () {
    this.goTo(this.tab, 2);
    var cycleCounts = 0;
    var list = ["阅读赚金币", "听书赚金币", "看短剧赚金币"];

    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
      var range = list_1[_i];

      while (++cycleCounts < MAX_CYCLES_COUNTS && scrollClick("立即领取", range)) {
        this.watchAdsForCoin("日常福利");
      }
    }
  };

  TomatoFree.prototype.watchAds = function () {
    this.goTo(this.tab, 2);
    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS && scrollClick("立即领取", "看视频赚金币")) {
      this.watch(text("日常福利"));
    }
  };

  TomatoFree.prototype.swipeVideo = function (totalTime) {
    this.goTo(this.tab, 0);

    if (selectedClick("看剧", 170)) {
      if (findAndClick("[0-9]*\.?[0-9]+万", {
        index: random(0, 8),
        cover: true
      })) {
        Record.log("\u8BA1\u5212\u65F6\u95F4: ".concat(convertSecondsToMinutes(totalTime), "\u5206\u949F"));
        var watchTime = 0;

        while (totalTime > watchTime) {
          if (textMatches(merge(["上滑查看下一集", "上滑继续观看短剧"])).exists()) {
            gesture(1000, [resizeX(random(380, 420)), resizeY(random(1750, 1850))], [resizeX(random(780, 820)), resizeY(random(250, 350))]);
          }

          watchTime += waitRandomTime(30);
        }
      }
    }
  };

  TomatoFree.prototype.openTreasure = function () {
    this.goTo(this.tab, 2);
    this.open();
  };

  TomatoFree_decorate([measureExecutionTime], TomatoFree.prototype, "highEff", null);

  TomatoFree_decorate([measureExecutionTime], TomatoFree.prototype, "lowEff", null);

  TomatoFree_decorate([measureExecutionTime], TomatoFree.prototype, "weight", null);

  TomatoFree_decorate([functionLog("签到")], TomatoFree.prototype, "signIn", null);

  TomatoFree_decorate([functionLog("听书")], TomatoFree.prototype, "listenBook", null);

  TomatoFree_decorate([functionLog("领取餐补")], TomatoFree.prototype, "mealSupp", null);

  TomatoFree_decorate([functionLog("阅读")], TomatoFree.prototype, "readBook", null);

  TomatoFree_decorate([functionLog("领取奖励")], TomatoFree.prototype, "reward", null);

  TomatoFree_decorate([functionLog("看视频")], TomatoFree.prototype, "watchAds", null);

  TomatoFree_decorate([functionLog("看短剧")], TomatoFree.prototype, "swipeVideo", null);

  TomatoFree_decorate([functionLog("开宝箱")], TomatoFree.prototype, "openTreasure", null);

  return TomatoFree;
}(AbstractTomato);


;// CONCATENATED MODULE: ./src/scripts/TomatoLite.ts


var TomatoLite_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var TomatoLite_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var TomatoLite = function (_super) {
  TomatoLite_extends(TomatoLite, _super);

  function TomatoLite() {
    var _this = _super.call(this) || this;

    _this.appName = NAME_READ_TOMATO_LITE;
    _this.packageName = PACKAGE_READ_TOMATO_LITE;
    _this.randomTab = className("android.widget.RadioGroup").boundsInside(0, device.height - 300, device.width, device.height).boundsContains(0, device.height - 100, device.width, device.height - 50);
    _this.initialNum = 0;
    _this.highEffEstimatedTime = _this.fetch(Base_BaseKey.highEffEstimatedTime, 35 * 60);
    return _this;
  }

  TomatoLite.prototype.highEff = function () {
    var _this = this;

    this.signIn();
    randomExecute([function () {
      _this.openTreasure();
    }, function () {
      _this.mealSupp();
    }, function () {
      _this.winGoldCoin();
    }, function () {
      _this.listenBook();

      _this.watchAds();
    }]);
    this.reward();
  };

  TomatoLite.prototype.weight = function () {
    this.goTo(this.tab, 2);
    scrollTo("金币收益");
    var tmp = textMatches(/(\d+)/).boundsInside(0, 0, resizeX(540), resizeY(373)).findOnce();

    if (tmp != null) {
      var weight = parseInt(tmp.text());
      this.store(Base_BaseKey.Weight, weight);
      this.store(Base_BaseKey.Money, (weight / 30000).toFixed(2));
    }
  };

  TomatoLite.prototype.signIn = function () {
    this.goTo(this.tab, 2);
    this.sign();

    if (scrollClick("立即签到")) {
      this.sign();
    }
  };

  TomatoLite.prototype.listenBook = function () {
    this.goTo(this.tab, 0);

    if (selectedClick("音乐", 170)) {
      if (fixedClick("排行榜")) {
        scrollClick(random(1, 8).toString());
      }
    }
  };

  TomatoLite.prototype.reward = function () {
    this.goTo(this.tab, 2);
    var list = ["听音乐赚金币", "每日听歌赚钱"];
    var cycleCounts = 0;

    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
      var range = list_1[_i];

      while (++cycleCounts < MAX_CYCLES_COUNTS && scrollClick("立即领取", range)) {
        this.watchAdsForCoin("日常福利");
      }
    }
  };

  TomatoLite.prototype.mealSupp = function () {
    this.goTo(this.tab, 2);

    if (scrollClick("去领取", "吃饭补贴")) {
      if (dialogClick("领取.*补贴[0-9]金币")) {
        this.watchAdsForCoin("日常福利");
      }
    }
  };

  TomatoLite.prototype.watchAds = function () {
    this.goTo(this.tab, 2);
    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS && scrollClick("立即观看", "看视频赚金币")) {
      Record.log("\u6B63\u5728\u89C2\u770B\u7B2C".concat(cycleCounts, "\u4E2A\u5E7F\u544A"));
      this.watch(text("日常福利"));

      if (cycleCounts % 3 === 0) {
        this.openTreasure();
      }

      text("立即观看").findOne(3 * 60 * 1000);
    }
  };

  TomatoLite.prototype.openTreasure = function () {
    this.goTo(this.tab, 2);
    this.open();
  };

  TomatoLite.prototype.winGoldCoin = function () {
    this.goTo(this.tab, 2);

    if (scrollClick("去抽奖", "天天抽奖赢金币")) {
      var cycleCounts = 0;

      while (++cycleCounts < MAX_CYCLES_COUNTS && findAndClick("抽奖", {
        fixed: true,
        waitTimes: 10
      })) {
        if (!dialogClick("开心收下")) {
          this.watchAdsForCoin("日常福利");
        } else {
          break;
        }
      }
    }
  };

  TomatoLite_decorate([measureExecutionTime], TomatoLite.prototype, "highEff", null);

  TomatoLite_decorate([measureExecutionTime], TomatoLite.prototype, "weight", null);

  TomatoLite_decorate([functionLog("签到")], TomatoLite.prototype, "signIn", null);

  TomatoLite_decorate([functionLog("听书")], TomatoLite.prototype, "listenBook", null);

  TomatoLite_decorate([functionLog("领取奖励")], TomatoLite.prototype, "reward", null);

  TomatoLite_decorate([functionLog("领取餐补")], TomatoLite.prototype, "mealSupp", null);

  TomatoLite_decorate([functionLog("看广告")], TomatoLite.prototype, "watchAds", null);

  TomatoLite_decorate([functionLog("开宝箱")], TomatoLite.prototype, "openTreasure", null);

  TomatoLite_decorate([functionLog("去抽奖")], TomatoLite.prototype, "winGoldCoin", null);

  return TomatoLite;
}(AbstractTomato);


;// CONCATENATED MODULE: ./src/scripts/WanChao.ts


var WanChao_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var WanChao_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var WanChao = function (_super) {
  WanChao_extends(WanChao, _super);

  function WanChao() {
    var _this = _super.call(this) || this;

    _this.appName = NAME_READ_WANCHAO;
    _this.packageName = PACKAGE_READ_WANCHAO;
    _this.highEffEstimatedTime = _this.fetch(Base_BaseKey.highEffEstimatedTime, BASE_ASSIMT_TIME);
    return _this;
  }

  WanChao.prototype.highEff = function () {
    this.readForMoney();
  };

  WanChao.prototype.weight = function () {
    this.store(Base_BaseKey.Weight, 0);
  };

  WanChao.prototype.readForMoney = function () {
    if (findAndClick("阅读有礼")) {
      var cycleCounts = 0;

      while (++cycleCounts < MAX_CYCLES_COUNTS && text("请完成安全验证").exists()) {
        this.overDetection();
        waitRandomTime(4);
      }

      while (++cycleCounts < MAX_CYCLES_COUNTS && findAndClick("待完成", {
        waitTimes: 10,
        cover: true
      })) {
        back();
        waitRandomTime(4);
      }

      if (fixedClick("抽奖")) {
        var box = idContains('nc_1_n1z').findOnce();

        if (box != null) {
          swipe(box.bounds().centerX(), box.bounds().centerY(), device.width, box.bounds().centerY() + random(-25, 0), 100);
          waitRandomTime(3);
        }

        if (findAndClick("抽奖", {
          ocrRecognize: true,
          bounds: {
            top: 200
          }
        })) {
          var money = textMatches("[0-9]+\.[0-9]+元").boundsInside(resizeX(108), resizeY(1140), resizeX(972), resizeY(1323)).findOnce();

          if (money != null) {
            Record.log("\u4E2D\u5956".concat(money.text()));
            this.store(Base_BaseKey.Money, parseFloat(money.text()));
          }
        }
      }
    }
  };

  WanChao.prototype.overDetection = function () {
    var detection = id("tf-verify-canvas").findOnce();
    var from = resizeX(123);
    var end = resizeX(957);
    var top = resizeY(1065);
    var region = 120;
    var relatPicDis = 150;

    if (detection != null) {
      from = detection.bounds().left;
      end = detection.bounds().right;
      top = detection.bounds().top;
    }

    var img = getScreenImage();
    var min = 10000;
    var index = 0;

    for (var x = from; x < end; x++) {
      var t = 0;

      for (var dx = x; dx < x + region; dx++) {
        var color = images.pixel(img, dx, top + relatPicDis);
        var red = colors.red(color);
        var green = colors.green(color);
        var blue = colors.blue(color);
        t += this.isGrayColor(red, green, blue);
      }

      if (t < min) {
        min = t;
        index = x;
      }
    }

    var slideBox = className("android.view.View").depth(14).drawingOrder(0).boundsInside(100, 1400, 300, 1600).findOnce();

    if (slideBox != null) {
      var centerX = (slideBox.bounds().left + slideBox.bounds().right) / 2;
      var centerY = (slideBox.bounds().top + slideBox.bounds().bottom) / 2;
      gesture(2000, [centerX, centerY], [centerX + index - 149, centerY + random(-50, 50)]);
    }

    img.recycle();
  };

  WanChao.prototype.isGrayColor = function (red, green, blue) {
    if (red + green + blue > 200 && red + green + blue < 500) {
      return Math.sqrt((Math.pow(red - green, 2) + Math.pow(red - blue, 2) + Math.pow(green - blue, 2)) / 3);
    } else {
      return 100;
    }
  };

  WanChao_decorate([measureExecutionTime], WanChao.prototype, "highEff", null);

  return WanChao;
}(Base);


;// CONCATENATED MODULE: ./src/scripts/YouShi.ts


var YouShi_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var YouShi_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var YouShi = function (_super) {
  YouShi_extends(YouShi, _super);

  function YouShi() {
    var _this = _super.call(this) || this;

    _this.appName = NAME_VEDIO_YOUSHI;
    _this.packageName = PACKAGE_VEDIO_YOUSHI;
    _this.tab = id("android:id/tabs");
    _this.highEffEstimatedTime = _this.fetch(Base_BaseKey.highEffEstimatedTime, BASE_ASSIMT_TIME);
    _this.medEffEstimatedTime = _this.fetch(Base_BaseKey.medEffEstimatedTime, 110 * 60);
    _this.lowEffEstimatedTime = 0;
    return _this;
  }

  YouShi.prototype.highEff = function () {
    var _this = this;

    this.signIn();
    randomExecute([function () {
      _this.walkEarn();
    }, function () {
      _this.mealSupp();
    }, function () {
      _this.sleepEarn();
    }, function () {
      _this.openTreasure();
    }, function () {
      _this.doubleEarn();
    }, function () {
      _this.watchAds();
    }]);
  };

  YouShi.prototype.medEff = function () {
    var cycleCounts = 0;

    do {
      this.swipeVideo(10 * 60);
      this.openTreasure();
    } while (++cycleCounts < MAX_CYCLES_COUNTS && this.watchAds());

    this.reward();
  };

  YouShi.prototype.lowEff = function (time) {
    var _this = this;

    doFuncAtGivenTime(time, 10 * 60, function (perTime) {
      _this.swipeVideo(perTime);

      _this.openTreasure();

      _this.watchAds();
    });
    this.reward();
  };

  YouShi.prototype.weight = function () {
    this.goTo(this.tab, 3);

    if (scrollClick(".*我的金币.*")) {
      var tmp = textMatches(/(\d+)/).findOnce();

      if (tmp != null) {
        Record.debug("".concat(this.constructor.name, ":").concat(tmp.text()));
        var weight = parseInt(tmp.text());
        this.store(Base_BaseKey.Weight, weight);
        this.store(Base_BaseKey.Money, (weight / 33000).toFixed(2));
      }
    }
  };

  YouShi.prototype.signIn = function () {
    this.goTo(this.tab, 3);

    if (dialogClick("签到领金币")) {
      this.watchAdsForCoin("日常任务");
    } else {
      if (findAndClick("立即签到", {
        feedback: true
      })) {
        this.watchAdsForCoin("日常任务");
      }
    }
  };

  YouShi.prototype.openTreasure = function () {
    this.goTo(this.tab, 3);

    if (fixedClick("开宝箱得金币")) {
      this.watchAdsForCoin("日常任务");
    }
  };

  YouShi.prototype.watchAds = function () {
    this.goTo(this.tab, 3);

    if (scrollClick("领福利")) {
      this.watch(text("日常任务"));
      return true;
    }

    return false;
  };

  YouShi.prototype.swipeVideo = function (totalTime) {
    this.goTo(this.tab, 1);
    Record.log("\u9884\u8BA1\u5237\u89C6\u9891".concat(convertSecondsToMinutes(totalTime), "\u5206\u949F"));
    moveDown(totalTime, 15);
  };

  YouShi.prototype.reward = function () {
    this.goTo(this.tab, 3);
    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS && scrollClick("点击领取")) {
      if (dialogClick("开始抽奖")) {
        normalClick(resizeX(random(395, 689)), resizeY(random(750, 1067)));

        if (dialogClick("点击领取")) {
          break;
        }
      }
    }
  };

  YouShi.prototype.mealSupp = function () {
    this.goTo(this.tab, 3);

    if (scrollClick("吃饭补贴")) {
      if (findAndClick("领取.*补贴[0-9]+金币", {
        fixed: true
      })) {
        this.watchAdsForCoin("日常任务");
      }
    }
  };

  YouShi.prototype.walkEarn = function () {
    this.goTo(this.tab, 3);

    if (scrollClick("走路赚钱")) {
      if (findAndClick("领取[0-9]+金币", {
        fixed: true,
        feedback: true
      })) {
        this.watchAdsForCoin("日常任务");
      }
    }
  };

  YouShi.prototype.sleepEarn = function () {
    this.goTo(this.tab, 3);

    if (scrollClick("睡觉赚钱")) {
      if (fixedClick("我睡醒了")) {
        if (fixedClick("领取[0-9]+金币")) {
          this.watchAdsForCoin("日常任务");
        }
      }

      fixedClick("我要睡了");
    }
  };

  YouShi.prototype.doubleEarn = function () {
    this.goTo(this.tab, 3);

    if (scrollClick("去翻倍")) {
      dialogClick("我知道了");
    }
  };

  YouShi_decorate([measureExecutionTime], YouShi.prototype, "highEff", null);

  YouShi_decorate([measureExecutionTime], YouShi.prototype, "medEff", null);

  YouShi_decorate([measureExecutionTime], YouShi.prototype, "lowEff", null);

  YouShi_decorate([measureExecutionTime], YouShi.prototype, "weight", null);

  YouShi_decorate([functionLog("签到")], YouShi.prototype, "signIn", null);

  YouShi_decorate([functionLog("开宝箱")], YouShi.prototype, "openTreasure", null);

  YouShi_decorate([functionLog("看广告")], YouShi.prototype, "watchAds", null);

  YouShi_decorate([functionLog("刷视频")], YouShi.prototype, "swipeVideo", null);

  YouShi_decorate([functionLog("领取奖励")], YouShi.prototype, "reward", null);

  YouShi_decorate([functionLog("吃饭补贴")], YouShi.prototype, "mealSupp", null);

  YouShi_decorate([functionLog("走路赚钱")], YouShi.prototype, "walkEarn", null);

  YouShi_decorate([functionLog("睡觉赚钱")], YouShi.prototype, "sleepEarn", null);

  return YouShi;
}(Base);


;// CONCATENATED MODULE: ./src/global.ts
var _a;






















var PROJECT_NAME = "智能助手";
var VERSION = "0.3.0";
var WX_PUSHER_URL = "https://wxpusher.zjiecode.com/api/send/message";
var APP_TOKEN = "AT_2vEaUfXFmwMKybX7YeX3yCJFrmc7TFlD";
var MAX_BACK_COUNTS = 10;
var MAX_CLICK_COUNTS = 8;
var MAX_RETRY_COUNTS = 3;
var WAIT_TIME_AFTER_CLICK = 6;
var MAX_CYCLES_COUNTS = 25;
var REDUNDANCY_TIME = 3 * 60;
var BASE_ASSIMT_TIME = 10 * 60;
var WEIGHT_ASSIMT_TIME = (/* unused pure expression or super */ null && (5 * 60));
var MAX_ASSIMT_TIME = 24 * 60 * 60;
var STORAGE_APP = "app";
var STORAGE_DATE = "date";
var STORAGE_NO_RECORD = "noRecord";
var STORAGE_WEIGHT_CONTAINER = "YWfjbEVp31";
var STORAGE = storages.create(STORAGE_WEIGHT_CONTAINER);
var DEVICE_WIDTH = 1080;
var DEVICE_HEIGHT = 2340;
var NAME_READ_TOMATO = "番茄畅听";
var PACKAGE_READ_TOMATO = "com.xs.fm";
var NAME_READ_TOMATO_FREE = "番茄免费小说";
var PACKAGE_READ_TOMATO_FREE = "com.dragon.read";
var NAME_READ_TOMATO_LITE = "番茄畅听音乐版";
var PACKAGE_READ_TOMATO_LITE = "com.xs.fm.lite";
var NAME_READ_RED_FRUITS = "红果免费短剧";
var PACKAGE_READ_RED_FRUITS = "com.phoenix.read";
var NAME_READ_DEJIAN = "得间小说";
var PACKAGE_READ_DEJIAN = "com.chaozh.iReader.dj";
var NAME_READ_EGGPLANT_FREE = "茄子免费小说";
var PACKAGE_EGGPLANT_FREE = "com.qz.freader";
var NAME_READ_PANDA_BRAIN = "熊猫脑洞小说";
var PACKAGE_READ_PANDA_BRAIN = "com.xm.freader";
var NAME_READ_MARVEL_FREE = "奇迹免费小说";
var PACKAGE_READ_MARVEL_FREE = "reader.com.xmly.xmlyreader";
var NAME_READ_SPEED_FREE = "速读免费小说";
var PACKAGE_READ_SPEED_FREE = "com.dj.speed";
var NAME_READ_SHUQI = "书旗小说";
var PACKAGE_READ_SHUQI = "com.shuqi.controller";
var NAME_READ_SEVEN_CATS_FREE = "七猫免费小说";
var PACKAGE_READ_SEVEN_CATS_FREE = "com.kmxs.reader";
var NAME_READ_WANCHAO = "望潮";
var PACKAGE_READ_WANCHAO = "com.shangc.tiennews.taizhou";
var NAME_READ_STARRY_SKY = "星空免费小说";
var PACKAGE_READ_STARRY_SKY = "com.xk.qreader";
var NAME_VEDIO_TIKTOK_LITE = "抖音极速版";
var PACKAGE_VEDIO_TIKTOK_LITE = "com.ss.android.ugc.aweme.lite";
var NAME_VEDIO_KUAISHOU = "快手";
var PACKAGE_VEDIO_KUAISHOU = "com.smile.gifmaker";
var NAME_READ_KUAISHOU_FREE = "快手免费小说";
var PACKAGE_READ_KUAISHOU_FREE = "com.kuaishou.kgx.novel";
var NAME_VEDIO_KUAISHOU_LITE = "快手极速版";
var PACKAGE_VEDIO_KUAISHOU_LITE = "com.kuaishou.nebula";
var NAME_VEDIO_YOUSHI = "有柿";
var PACKAGE_VEDIO_YOUSHI = "com.ss.android.article.search";
var youShi = new YouShi();
var shuQi = new ShuQi();
var starrySky = new StarrySky();
var marvelFree = new MarvelFree();
var eggplantFree = new EggplantFree();
var sevenCatsFree = new SevenCatsFree();
var pandaBrain = new PandaBrain();
var tomato = new Tomato();
var tomatoFree = new TomatoFree();
var tomatoLite = new TomatoLite();
var redFruits = new RedFruits();
var kuaiShouFree = new KuaiShouFree();
var kuaiShou = new KuaiShou();
var kuaiShouLite = new KuaiShouLite();
var tikTokLite = new TikTokLite();
var speedFree = new SpeedFree();
var deJian = new DeJian();
var global_wanChao = new WanChao();
var map = {
  "1": youShi,
  "2": shuQi,
  "3": starrySky,
  "4": marvelFree,
  "5": eggplantFree,
  "6": sevenCatsFree,
  "7": pandaBrain,
  "8": tomato,
  "9": tomatoFree,
  "10": tomatoLite,
  "11": redFruits,
  "12": kuaiShouFree,
  "13": speedFree,
  "14": deJian,
  "15": global_wanChao
};
Record.info("加载配置");
var _TOKEN = (_a = hamibot.env, _a._TOKEN),
    _SHOW_CONSOLE = _a._SHOW_CONSOLE,
    APP_ENV = _a.APP_ENV,
    ROBOT_ID = _a.ROBOT_ID,
    ORDER = _a.ORDER;
var SHOW_CONSOLE = _SHOW_CONSOLE;
var list = [];

if (ORDER != undefined) {
  Record.info("调整执行顺序");
  var orderList = ORDER.split(" ");

  if (orderList.length > 0) {
    orderList = orderList.filter(function (value, index, self) {
      return self.indexOf(value) === index;
    });

    for (var _i = 0, orderList_1 = orderList; _i < orderList_1.length; _i++) {
      var i = orderList_1[_i];
      var app_1 = map[i];
      if (app_1 != undefined) list.push(app_1);
    }
  }
}

if (list.length != 15) {
  for (var key in map) {
    if (list.indexOf(map[key]) == -1) {
      list.push(map[key]);
    }
  }
}

var filteredList = list.filter(function (item) {
  return hamibot.env[item.constructor.name] !== false;
});
Record.info("\u6B63\u5728\u542F\u52A8...\n\n\t\u5F53\u524D\u811A\u672C\u7248\u672C: ".concat(VERSION, "\n"));

if (APP_ENV === 'production') {
  Record.setDisplayLevel(LogLevel.Log);
} else if (APP_ENV === 'development') {
  Record.debug("处于开发环境");
}

events.on("exit", function () {
  threads.shutDownAll();
  Record.info("结束...");
  waitRandomTime(5);
  console.hide();
});

if (_TOKEN && _TOKEN !== "" && setToken(_TOKEN) == false) {
  throw new ConfigInvalidException("pushplus token", "needs to be a 32-bit hexadecimal number");
}

Record.info("开始执行脚本");
;// CONCATENATED MODULE: ./src/common/report.ts




function sendIncomeMessageToWxPuher(str) {
  if (_TOKEN && _TOKEN !== "") {
    var res = http.postJson(WX_PUSHER_URL, {
      "appToken": APP_TOKEN,
      "content": str,
      "summary": "智能助手日收益推送",
      "contentType": 3,
      "uids": [_TOKEN],
      "verifyPay": false
    });
    return res.statusCode === 200;
  }
}
function toShowString(list) {
  var stack = ["id: ".concat(ROBOT_ID, "\n")];
  var sumWeight = 0;
  var sumMoney = 0;

  for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
    var app_1 = list_1[_i];
    var weight = parseInt(app_1.fetch(Base_BaseKey.Weight, 0));
    var money = parseFloat(app_1.fetch(Base_BaseKey.Money, 0));
    Record.debug("".concat(app_1.appName, ": ").concat(weight));
    sumWeight += weight;
    sumMoney += money;
    stack.push("".concat(app_1.appName, ": ").concat(weight, " - - - ").concat(money, "\u5143"));
  }

  stack.push("\n\u4ECA\u65E5\u603B\u6536\u76CA: ".concat(sumWeight, "\u91D1\u5E01 - - - ").concat(sumMoney.toFixed(2), "\u5143"));
  return stack.join('\n');
}
function sendErrorMessage() {
  var collection = LOG_STACK;
  var img = getScreenImage();
  hamibot.postMessage(Date.now().toString(), {
    telemetry: true,
    data: {
      title: 'error',
      attachments: [{
        type: 'text',
        data: collection.toString()
      }, {
        type: 'image',
        data: images.toBase64(img)
      }]
    }
  });
}
;// CONCATENATED MODULE: ./src/lib/init.ts





function init() {
  if (auto.service === null) {
    if (!confirm('Please enable accessibility permission')) {
      throw new PermissionException("Accessibility permission obtaining failure.");
    }

    auto.waitFor();
  } else {
    Record.verbose("已启用无障碍辅助功能权限");
  }

  if (device.height === 0 || device.width === 0) {
    throw new ServiceNotEnabled('Failed to get the screen size. ' + 'Please try restarting the service or re-installing Hamibot');
  } else {
    Record.debug("分辨率: " + device.height + " x " + device.width);
  }

  threads.start(function () {
    Record.debug("子线程启动");
    findAndClick(className("android.widget.Button").textMatches(".?立即开始.?|.?允许.?"), {
      waitFor: true,
      clickUntilGone: true,
      fixed: true
    });
  });

  if (!requestScreenCapture()) {
    throw new PermissionException("Accessibility permission obtaining failure.");
  } else {
    Record.debug("启动视觉识别");
  }

  if (!files.exists("/sdcard/exit.png")) {
    Record.debug("正在加载资源");
    var img = images.load("https://hamibot-1304500632.cos.ap-nanjing.myqcloud.com/exit.png");

    if (img != null) {
      img.saveTo("/sdcard/exit.png");
      img.recycle();
    }
  }

  device.keepScreenOn(3600 * 1000);

  if (SHOW_CONSOLE) {
    console.show();
    waitRandomTime(1);
  }
}
;// CONCATENATED MODULE: ./src/index.ts







init();
main();

function test() {
  wanChao.store(BaseKey.Money, 0.30);
}

function main() {
  while (true) {
    var runList = filteredList;

    if (runList.length == 0) {
      throw new ConfigInvalidException("拿我这测试了?");
    }

    var startTime = new Date();
    var date = startTime.getMonth().toString() + "/" + startTime.getDate().toString();

    if (date === STORAGE.get(STORAGE_DATE)) {
      runList = runList.filter(function (app) {
        return app.fetch(Base_BaseKey.Executed, false) === false;
      });
    } else {
      for (var _i = 0, runList_1 = runList; _i < runList_1.length; _i++) {
        var app_1 = runList_1[_i];
        app_1.store(Base_BaseKey.Executed, false);
      }
    }

    STORAGE.put(STORAGE_DATE, date);
    var endTime = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), 23, 59, 59);
    var timeDifference = endTime.getTime() - startTime.getTime();
    var timePerMethod = timeDifference / 1000;
    var map = {};
    var sortedList = runList.slice().sort(function (a, b) {
      return b.fetch(Base_BaseKey.Money, 0) * 100 - a.fetch(Base_BaseKey.Money, 0) * 100;
    });

    for (var _a = 0, sortedList_1 = sortedList; _a < sortedList_1.length; _a++) {
      var app_2 = sortedList_1[_a];
      map[app_2.constructor.name] = 0;
      Record.debug("".concat(app_2.appName));
    }

    appTimeAllocation(map, timePerMethod, sortedList);

    for (var _b = 0, runList_2 = runList; _b < runList_2.length; _b++) {
      var app_3 = runList_2[_b];
      Record.log("".concat(app_3.appName, ": ").concat(convertSecondsToMinutes(map[app_3.constructor.name]), "\u5206\u949F"));
    }

    var surplus = 0;
    Record.info("进入主流程");

    for (var _c = 0, runList_3 = runList; _c < runList_3.length; _c++) {
      var app_4 = runList_3[_c];
      clearBackground();
      var executeTime = surplus + map[app_4.constructor.name];
      app_4.store(Base_BaseKey.Weight, 0);
      app_4.store(Base_BaseKey.Money, 0);
      map[app_4.constructor.name] = 0;
      STORAGE.put(STORAGE_APP, app_4.constructor.name);
      surplus = app_4.start(executeTime);
      app_4.store(Base_BaseKey.Executed, true);
      Record.debug("surplus: ".concat(surplus));
      var remainingAllocation = 30 * 60;

      for (var _d = 0, sortedList_2 = sortedList; _d < sortedList_2.length; _d++) {
        var tmp = sortedList_2[_d];

        if (surplus <= 0) {
          break;
        }

        var allocation = Math.min(surplus, remainingAllocation);

        if (map[tmp.constructor.name] != 0) {
          map[tmp.constructor.name] += allocation;
          surplus -= allocation;
        }
      }
    }

    clearBackground();
    Record.info("发送今日收益");
    sendIncomeMessageToWxPuher(toShowString(filteredList));
    var doneTime = new Date();

    if (endTime.getTime() > doneTime.getTime()) {
      var waitTime = endTime.getTime() - doneTime.getTime();
      Record.log("\u7B49\u5F85".concat(convertSecondsToMinutes(waitTime / 1000 + 1), "\u5206\u949F\u5F00\u542F\u65B0\u4E00\u5929\u4EFB\u52A1"));
      sleep(waitTime + 60 * 1000);
    }
  }
}

function appTimeAllocation(map, timePerMethod, sortedList) {
  Record.info("分配执行时间");

  for (var _i = 0, sortedList_3 = sortedList; _i < sortedList_3.length; _i++) {
    var app_5 = sortedList_3[_i];
    timePerMethod -= app_5.highEffEstimatedTime;

    if (timePerMethod > 0) {
      map[app_5.constructor.name] = app_5.highEffEstimatedTime;
    } else {
      break;
    }
  }

  for (var _a = 0, sortedList_4 = sortedList; _a < sortedList_4.length; _a++) {
    var app_6 = sortedList_4[_a];

    if (app_6.medEffEstimatedTime != MAX_ASSIMT_TIME) {
      timePerMethod -= app_6.medEffEstimatedTime;

      if (timePerMethod > 0) {
        map[app_6.constructor.name] += app_6.medEffEstimatedTime;
      } else {
        timePerMethod += app_6.medEffEstimatedTime;
      }
    }
  }

  var count = 1;

  if (sortedList.length > 0) {
    while (timePerMethod >= BASE_ASSIMT_TIME) {
      var time = count * BASE_ASSIMT_TIME;

      for (var _b = 0, sortedList_5 = sortedList; _b < sortedList_5.length; _b++) {
        var app_7 = sortedList_5[_b];

        if (app_7.lowEffEstimatedTime != MAX_ASSIMT_TIME) {
          var allocaTime = Math.min(time * app_7.lowEffAssmitCount, timePerMethod);
          var key = app_7.constructor.name;
          map[key] += allocaTime;
          timePerMethod -= allocaTime;
        }
      }

      if (count < 4) {
        count++;
      }
    }
  }
}
/******/ })()
;