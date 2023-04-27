"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/events/events.js
  var require_events = __commonJS({
    "node_modules/events/events.js"(exports, module) {
      "use strict";
      var R = typeof Reflect === "object" ? Reflect : null;
      var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
        return Function.prototype.apply.call(target, receiver, args);
      };
      var ReflectOwnKeys;
      if (R && typeof R.ownKeys === "function") {
        ReflectOwnKeys = R.ownKeys;
      } else if (Object.getOwnPropertySymbols) {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
        };
      } else {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target);
        };
      }
      function ProcessEmitWarning(warning) {
        if (console && console.warn)
          console.warn(warning);
      }
      var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
        return value !== value;
      };
      function EventEmitter() {
        EventEmitter.init.call(this);
      }
      module.exports = EventEmitter;
      module.exports.once = once;
      EventEmitter.EventEmitter = EventEmitter;
      EventEmitter.prototype._events = void 0;
      EventEmitter.prototype._eventsCount = 0;
      EventEmitter.prototype._maxListeners = void 0;
      var defaultMaxListeners = 10;
      function checkListener(listener) {
        if (typeof listener !== "function") {
          throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
        }
      }
      Object.defineProperty(EventEmitter, "defaultMaxListeners", {
        enumerable: true,
        get: function() {
          return defaultMaxListeners;
        },
        set: function(arg) {
          if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
            throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
          }
          defaultMaxListeners = arg;
        }
      });
      EventEmitter.init = function() {
        if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        }
        this._maxListeners = this._maxListeners || void 0;
      };
      EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
        if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
          throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
        }
        this._maxListeners = n;
        return this;
      };
      function _getMaxListeners(that) {
        if (that._maxListeners === void 0)
          return EventEmitter.defaultMaxListeners;
        return that._maxListeners;
      }
      EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
        return _getMaxListeners(this);
      };
      EventEmitter.prototype.emit = function emit(type) {
        var args = [];
        for (var i = 1; i < arguments.length; i++)
          args.push(arguments[i]);
        var doError = type === "error";
        var events = this._events;
        if (events !== void 0)
          doError = doError && events.error === void 0;
        else if (!doError)
          return false;
        if (doError) {
          var er;
          if (args.length > 0)
            er = args[0];
          if (er instanceof Error) {
            throw er;
          }
          var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
          err.context = er;
          throw err;
        }
        var handler = events[type];
        if (handler === void 0)
          return false;
        if (typeof handler === "function") {
          ReflectApply(handler, this, args);
        } else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            ReflectApply(listeners[i], this, args);
        }
        return true;
      };
      function _addListener(target, type, listener, prepend) {
        var m;
        var events;
        var existing;
        checkListener(listener);
        events = target._events;
        if (events === void 0) {
          events = target._events = /* @__PURE__ */ Object.create(null);
          target._eventsCount = 0;
        } else {
          if (events.newListener !== void 0) {
            target.emit(
              "newListener",
              type,
              listener.listener ? listener.listener : listener
            );
            events = target._events;
          }
          existing = events[type];
        }
        if (existing === void 0) {
          existing = events[type] = listener;
          ++target._eventsCount;
        } else {
          if (typeof existing === "function") {
            existing = events[type] = prepend ? [listener, existing] : [existing, listener];
          } else if (prepend) {
            existing.unshift(listener);
          } else {
            existing.push(listener);
          }
          m = _getMaxListeners(target);
          if (m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true;
            var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            w.name = "MaxListenersExceededWarning";
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            ProcessEmitWarning(w);
          }
        }
        return target;
      }
      EventEmitter.prototype.addListener = function addListener(type, listener) {
        return _addListener(this, type, listener, false);
      };
      EventEmitter.prototype.on = EventEmitter.prototype.addListener;
      EventEmitter.prototype.prependListener = function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };
      function onceWrapper() {
        if (!this.fired) {
          this.target.removeListener(this.type, this.wrapFn);
          this.fired = true;
          if (arguments.length === 0)
            return this.listener.call(this.target);
          return this.listener.apply(this.target, arguments);
        }
      }
      function _onceWrap(target, type, listener) {
        var state = { fired: false, wrapFn: void 0, target, type, listener };
        var wrapped = onceWrapper.bind(state);
        wrapped.listener = listener;
        state.wrapFn = wrapped;
        return wrapped;
      }
      EventEmitter.prototype.once = function once2(type, listener) {
        checkListener(listener);
        this.on(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
        checkListener(listener);
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter.prototype.removeListener = function removeListener(type, listener) {
        var list, events, position, i, originalListener;
        checkListener(listener);
        events = this._events;
        if (events === void 0)
          return this;
        list = events[type];
        if (list === void 0)
          return this;
        if (list === listener || list.listener === listener) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else {
            delete events[type];
            if (events.removeListener)
              this.emit("removeListener", type, list.listener || listener);
          }
        } else if (typeof list !== "function") {
          position = -1;
          for (i = list.length - 1; i >= 0; i--) {
            if (list[i] === listener || list[i].listener === listener) {
              originalListener = list[i].listener;
              position = i;
              break;
            }
          }
          if (position < 0)
            return this;
          if (position === 0)
            list.shift();
          else {
            spliceOne(list, position);
          }
          if (list.length === 1)
            events[type] = list[0];
          if (events.removeListener !== void 0)
            this.emit("removeListener", type, originalListener || listener);
        }
        return this;
      };
      EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
      EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
        var listeners, events, i;
        events = this._events;
        if (events === void 0)
          return this;
        if (events.removeListener === void 0) {
          if (arguments.length === 0) {
            this._events = /* @__PURE__ */ Object.create(null);
            this._eventsCount = 0;
          } else if (events[type] !== void 0) {
            if (--this._eventsCount === 0)
              this._events = /* @__PURE__ */ Object.create(null);
            else
              delete events[type];
          }
          return this;
        }
        if (arguments.length === 0) {
          var keys = Object.keys(events);
          var key;
          for (i = 0; i < keys.length; ++i) {
            key = keys[i];
            if (key === "removeListener")
              continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners("removeListener");
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
          return this;
        }
        listeners = events[type];
        if (typeof listeners === "function") {
          this.removeListener(type, listeners);
        } else if (listeners !== void 0) {
          for (i = listeners.length - 1; i >= 0; i--) {
            this.removeListener(type, listeners[i]);
          }
        }
        return this;
      };
      function _listeners(target, type, unwrap) {
        var events = target._events;
        if (events === void 0)
          return [];
        var evlistener = events[type];
        if (evlistener === void 0)
          return [];
        if (typeof evlistener === "function")
          return unwrap ? [evlistener.listener || evlistener] : [evlistener];
        return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
      }
      EventEmitter.prototype.listeners = function listeners(type) {
        return _listeners(this, type, true);
      };
      EventEmitter.prototype.rawListeners = function rawListeners(type) {
        return _listeners(this, type, false);
      };
      EventEmitter.listenerCount = function(emitter, type) {
        if (typeof emitter.listenerCount === "function") {
          return emitter.listenerCount(type);
        } else {
          return listenerCount.call(emitter, type);
        }
      };
      EventEmitter.prototype.listenerCount = listenerCount;
      function listenerCount(type) {
        var events = this._events;
        if (events !== void 0) {
          var evlistener = events[type];
          if (typeof evlistener === "function") {
            return 1;
          } else if (evlistener !== void 0) {
            return evlistener.length;
          }
        }
        return 0;
      }
      EventEmitter.prototype.eventNames = function eventNames() {
        return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
      };
      function arrayClone(arr, n) {
        var copy = new Array(n);
        for (var i = 0; i < n; ++i)
          copy[i] = arr[i];
        return copy;
      }
      function spliceOne(list, index) {
        for (; index + 1 < list.length; index++)
          list[index] = list[index + 1];
        list.pop();
      }
      function unwrapListeners(arr) {
        var ret = new Array(arr.length);
        for (var i = 0; i < ret.length; ++i) {
          ret[i] = arr[i].listener || arr[i];
        }
        return ret;
      }
      function once(emitter, name) {
        return new Promise(function(resolve, reject) {
          function errorListener(err) {
            emitter.removeListener(name, resolver);
            reject(err);
          }
          function resolver() {
            if (typeof emitter.removeListener === "function") {
              emitter.removeListener("error", errorListener);
            }
            resolve([].slice.call(arguments));
          }
          ;
          eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
          if (name !== "error") {
            addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
          }
        });
      }
      function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
        if (typeof emitter.on === "function") {
          eventTargetAgnosticAddListener(emitter, "error", handler, flags);
        }
      }
      function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
        if (typeof emitter.on === "function") {
          if (flags.once) {
            emitter.once(name, listener);
          } else {
            emitter.on(name, listener);
          }
        } else if (typeof emitter.addEventListener === "function") {
          emitter.addEventListener(name, function wrapListener(arg) {
            if (flags.once) {
              emitter.removeEventListener(name, wrapListener);
            }
            listener(arg);
          });
        } else {
          throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
        }
      }
    }
  });

  // node_modules/centrifuge/build/codes.js
  var require_codes = __commonJS({
    "node_modules/centrifuge/build/codes.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.unsubscribedCodes = exports.subscribingCodes = exports.disconnectedCodes = exports.connectingCodes = exports.errorCodes = void 0;
      exports.errorCodes = {
        timeout: 1,
        transportClosed: 2,
        clientDisconnected: 3,
        clientClosed: 4,
        clientConnectToken: 5,
        clientRefreshToken: 6,
        subscriptionUnsubscribed: 7,
        subscriptionSubscribeToken: 8,
        subscriptionRefreshToken: 9,
        transportWriteError: 10,
        connectionClosed: 11
      };
      exports.connectingCodes = {
        connectCalled: 0,
        transportClosed: 1,
        noPing: 2,
        subscribeTimeout: 3,
        unsubscribeError: 4
      };
      exports.disconnectedCodes = {
        disconnectCalled: 0,
        unauthorized: 1,
        badProtocol: 2,
        messageSizeLimit: 3
      };
      exports.subscribingCodes = {
        subscribeCalled: 0,
        transportClosed: 1
      };
      exports.unsubscribedCodes = {
        unsubscribeCalled: 0,
        unauthorized: 1,
        clientClosed: 2
      };
    }
  });

  // node_modules/centrifuge/build/types.js
  var require_types = __commonJS({
    "node_modules/centrifuge/build/types.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SubscriptionState = exports.State = void 0;
      var State;
      (function(State2) {
        State2["Disconnected"] = "disconnected";
        State2["Connecting"] = "connecting";
        State2["Connected"] = "connected";
      })(State = exports.State || (exports.State = {}));
      var SubscriptionState;
      (function(SubscriptionState2) {
        SubscriptionState2["Unsubscribed"] = "unsubscribed";
        SubscriptionState2["Subscribing"] = "subscribing";
        SubscriptionState2["Subscribed"] = "subscribed";
      })(SubscriptionState = exports.SubscriptionState || (exports.SubscriptionState = {}));
    }
  });

  // node_modules/centrifuge/build/utils.js
  var require_utils = __commonJS({
    "node_modules/centrifuge/build/utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ttlMilliseconds = exports.errorExists = exports.backoff = exports.log = exports.isFunction = exports.startsWith = void 0;
      function startsWith(value, prefix) {
        return value.lastIndexOf(prefix, 0) === 0;
      }
      exports.startsWith = startsWith;
      function isFunction(value) {
        if (value === void 0 || value === null) {
          return false;
        }
        return typeof value === "function";
      }
      exports.isFunction = isFunction;
      function log(level, args) {
        if (globalThis.console) {
          const logger = globalThis.console[level];
          if (isFunction(logger)) {
            logger.apply(globalThis.console, args);
          }
        }
      }
      exports.log = log;
      function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      function backoff(step, min, max) {
        if (step > 31) {
          step = 31;
        }
        const interval2 = randomInt(0, Math.min(max, min * Math.pow(2, step)));
        return Math.min(max, min + interval2);
      }
      exports.backoff = backoff;
      function errorExists(data) {
        return "error" in data && data.error !== null;
      }
      exports.errorExists = errorExists;
      function ttlMilliseconds(ttl) {
        return Math.min(ttl * 1e3, 2147483647);
      }
      exports.ttlMilliseconds = ttlMilliseconds;
    }
  });

  // node_modules/centrifuge/build/subscription.js
  var require_subscription = __commonJS({
    "node_modules/centrifuge/build/subscription.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Subscription = void 0;
      var events_1 = __importDefault(require_events());
      var codes_1 = require_codes();
      var types_1 = require_types();
      var utils_1 = require_utils();
      var Subscription = class extends events_1.default {
        /** Subscription constructor should not be used directly, create subscriptions using Client method. */
        constructor(centrifuge2, channel, options) {
          super();
          this._resubscribeTimeout = null;
          this._refreshTimeout = null;
          this.channel = channel;
          this.state = types_1.SubscriptionState.Unsubscribed;
          this._centrifuge = centrifuge2;
          this._token = null;
          this._getToken = null;
          this._data = null;
          this._recover = false;
          this._offset = null;
          this._epoch = null;
          this._recoverable = false;
          this._positioned = false;
          this._joinLeave = false;
          this._minResubscribeDelay = 500;
          this._maxResubscribeDelay = 2e4;
          this._resubscribeTimeout = null;
          this._resubscribeAttempts = 0;
          this._promises = {};
          this._promiseId = 0;
          this._inflight = false;
          this._refreshTimeout = null;
          this._setOptions(options);
          if (this._centrifuge._debugEnabled) {
            this.on("state", (ctx) => {
              this._centrifuge._debug("subscription state", channel, ctx.oldState, "->", ctx.newState);
            });
            this.on("error", (ctx) => {
              this._centrifuge._debug("subscription error", channel, ctx);
            });
          } else {
            this.on("error", function() {
              Function.prototype();
            });
          }
        }
        /** ready returns a Promise which resolves upon subscription goes to Subscribed
         * state and rejects in case of subscription goes to Unsubscribed state.
         * Optional timeout can be passed.*/
        ready(timeout) {
          if (this.state === types_1.SubscriptionState.Unsubscribed) {
            return Promise.reject({ code: codes_1.errorCodes.subscriptionUnsubscribed, message: this.state });
          }
          if (this.state === types_1.SubscriptionState.Subscribed) {
            return Promise.resolve();
          }
          return new Promise((res, rej) => {
            const ctx = {
              resolve: res,
              reject: rej
            };
            if (timeout) {
              ctx.timeout = setTimeout(function() {
                rej({ code: codes_1.errorCodes.timeout, message: "timeout" });
              }, timeout);
            }
            this._promises[this._nextPromiseId()] = ctx;
          });
        }
        /** subscribe to a channel.*/
        subscribe() {
          if (this._isSubscribed()) {
            return;
          }
          this._resubscribeAttempts = 0;
          this._setSubscribing(codes_1.subscribingCodes.subscribeCalled, "subscribe called");
        }
        /** unsubscribe from a channel, keeping position state.*/
        unsubscribe() {
          this._setUnsubscribed(codes_1.unsubscribedCodes.unsubscribeCalled, "unsubscribe called", true);
        }
        /** publish data to a channel.*/
        publish(data) {
          const self2 = this;
          return this._methodCall().then(function() {
            return self2._centrifuge.publish(self2.channel, data);
          });
        }
        /** get online presence for a channel.*/
        presence() {
          const self2 = this;
          return this._methodCall().then(function() {
            return self2._centrifuge.presence(self2.channel);
          });
        }
        /** presence stats for a channel (num clients and unique users).*/
        presenceStats() {
          const self2 = this;
          return this._methodCall().then(function() {
            return self2._centrifuge.presenceStats(self2.channel);
          });
        }
        /** history for a channel. By default it does not return publications (only current
         *  StreamPosition data) – provide an explicit limit > 0 to load publications.*/
        history(opts) {
          const self2 = this;
          return this._methodCall().then(function() {
            return self2._centrifuge.history(self2.channel, opts);
          });
        }
        _methodCall() {
          if (this._isSubscribed()) {
            return Promise.resolve();
          }
          if (this._isUnsubscribed()) {
            return Promise.reject({ code: codes_1.errorCodes.subscriptionUnsubscribed, message: this.state });
          }
          return new Promise((res, rej) => {
            const timeout = setTimeout(function() {
              rej({ code: codes_1.errorCodes.timeout, message: "timeout" });
            }, this._centrifuge._config.timeout);
            this._promises[this._nextPromiseId()] = {
              timeout,
              resolve: res,
              reject: rej
            };
          });
        }
        _nextPromiseId() {
          return ++this._promiseId;
        }
        _needRecover() {
          return this._recover === true;
        }
        _isUnsubscribed() {
          return this.state === types_1.SubscriptionState.Unsubscribed;
        }
        _isSubscribing() {
          return this.state === types_1.SubscriptionState.Subscribing;
        }
        _isSubscribed() {
          return this.state === types_1.SubscriptionState.Subscribed;
        }
        _setState(newState) {
          if (this.state !== newState) {
            const oldState = this.state;
            this.state = newState;
            this.emit("state", { newState, oldState, channel: this.channel });
            return true;
          }
          return false;
        }
        _usesToken() {
          return this._token !== null || this._getToken !== null;
        }
        _clearSubscribingState() {
          this._resubscribeAttempts = 0;
          this._clearResubscribeTimeout();
        }
        _clearSubscribedState() {
          this._clearRefreshTimeout();
        }
        _setSubscribed(result) {
          if (!this._isSubscribing()) {
            return;
          }
          this._clearSubscribingState();
          if (result.recoverable) {
            this._recover = true;
            this._offset = result.offset || 0;
            this._epoch = result.epoch || "";
          }
          this._setState(types_1.SubscriptionState.Subscribed);
          const ctx = this._centrifuge._getSubscribeContext(this.channel, result);
          this.emit("subscribed", ctx);
          this._resolvePromises();
          const pubs = result.publications;
          if (pubs && pubs.length > 0) {
            for (const i in pubs) {
              if (!pubs.hasOwnProperty(i)) {
                continue;
              }
              this._handlePublication(pubs[i]);
            }
          }
          if (result.expires === true) {
            this._refreshTimeout = setTimeout(() => this._refresh(), (0, utils_1.ttlMilliseconds)(result.ttl));
          }
        }
        _setSubscribing(code, reason) {
          if (this._isSubscribing()) {
            return;
          }
          if (this._isSubscribed()) {
            this._clearSubscribedState();
          }
          if (this._setState(types_1.SubscriptionState.Subscribing)) {
            this.emit("subscribing", { channel: this.channel, code, reason });
          }
          this._subscribe(false, false);
        }
        _subscribe(optimistic, skipSending) {
          this._centrifuge._debug("subscribing on", this.channel);
          if (this._centrifuge.state !== types_1.State.Connected && !optimistic) {
            this._centrifuge._debug("delay subscribe on", this.channel, "till connected");
            return null;
          }
          if (this._usesToken()) {
            if (this._token) {
              return this._sendSubscribe(this._token, skipSending);
            } else {
              if (optimistic) {
                return null;
              }
              const self2 = this;
              this._getSubscriptionToken().then(function(token) {
                if (!self2._isSubscribing()) {
                  return;
                }
                if (!token) {
                  self2._failUnauthorized();
                  return;
                }
                self2._token = token;
                self2._sendSubscribe(token, false);
              }).catch(function(e) {
                if (!self2._isSubscribing()) {
                  return;
                }
                self2.emit("error", {
                  type: "subscribeToken",
                  channel: self2.channel,
                  error: {
                    code: codes_1.errorCodes.subscriptionSubscribeToken,
                    message: e !== void 0 ? e.toString() : ""
                  }
                });
                self2._scheduleResubscribe();
              });
              return null;
            }
          } else {
            return this._sendSubscribe("", skipSending);
          }
        }
        _sendSubscribe(token, skipSending) {
          const channel = this.channel;
          const req = {
            channel
          };
          if (token) {
            req.token = token;
          }
          if (this._data) {
            req.data = this._data;
          }
          if (this._positioned) {
            req.positioned = true;
          }
          if (this._recoverable) {
            req.recoverable = true;
          }
          if (this._joinLeave) {
            req.join_leave = true;
          }
          if (this._needRecover()) {
            req.recover = true;
            const offset = this._getOffset();
            if (offset) {
              req.offset = offset;
            }
            const epoch = this._getEpoch();
            if (epoch) {
              req.epoch = epoch;
            }
          }
          const cmd = { subscribe: req };
          this._inflight = true;
          this._centrifuge._call(cmd, skipSending).then((resolveCtx) => {
            this._inflight = false;
            const result = resolveCtx.reply.subscribe;
            this._handleSubscribeResponse(result);
            if (resolveCtx.next) {
              resolveCtx.next();
            }
          }, (rejectCtx) => {
            this._inflight = false;
            this._handleSubscribeError(rejectCtx.error);
            if (rejectCtx.next) {
              rejectCtx.next();
            }
          });
          return cmd;
        }
        _handleSubscribeError(error) {
          if (!this._isSubscribing()) {
            return;
          }
          if (error.code === codes_1.errorCodes.timeout) {
            this._centrifuge._disconnect(codes_1.connectingCodes.subscribeTimeout, "subscribe timeout", true);
            return;
          }
          this._subscribeError(error);
        }
        _handleSubscribeResponse(result) {
          if (!this._isSubscribing()) {
            return;
          }
          this._setSubscribed(result);
        }
        _setUnsubscribed(code, reason, sendUnsubscribe) {
          if (this._isUnsubscribed()) {
            return;
          }
          if (this._isSubscribed()) {
            if (sendUnsubscribe) {
              this._centrifuge._unsubscribe(this);
            }
            this._clearSubscribedState();
          }
          if (this._isSubscribing()) {
            this._clearSubscribingState();
          }
          if (this._setState(types_1.SubscriptionState.Unsubscribed)) {
            this.emit("unsubscribed", { channel: this.channel, code, reason });
          }
          this._rejectPromises({ code: codes_1.errorCodes.subscriptionUnsubscribed, message: this.state });
        }
        _handlePublication(pub) {
          const ctx = this._centrifuge._getPublicationContext(this.channel, pub);
          this.emit("publication", ctx);
          if (pub.offset) {
            this._offset = pub.offset;
          }
        }
        _handleJoin(join) {
          const info = this._centrifuge._getJoinLeaveContext(join.info);
          this.emit("join", { channel: this.channel, info });
        }
        _handleLeave(leave) {
          const info = this._centrifuge._getJoinLeaveContext(leave.info);
          this.emit("leave", { channel: this.channel, info });
        }
        _resolvePromises() {
          for (const id in this._promises) {
            if (this._promises[id].timeout) {
              clearTimeout(this._promises[id].timeout);
            }
            this._promises[id].resolve();
            delete this._promises[id];
          }
        }
        _rejectPromises(err) {
          for (const id in this._promises) {
            if (this._promises[id].timeout) {
              clearTimeout(this._promises[id].timeout);
            }
            this._promises[id].reject(err);
            delete this._promises[id];
          }
        }
        _scheduleResubscribe() {
          const self2 = this;
          const delay = this._getResubscribeDelay();
          this._resubscribeTimeout = setTimeout(function() {
            if (self2._isSubscribing()) {
              self2._subscribe(false, false);
            }
          }, delay);
        }
        _subscribeError(err) {
          if (!this._isSubscribing()) {
            return;
          }
          if (err.code < 100 || err.code === 109 || err.temporary === true) {
            if (err.code === 109) {
              this._token = null;
            }
            const errContext = {
              channel: this.channel,
              type: "subscribe",
              error: err
            };
            if (this._centrifuge.state === types_1.State.Connected) {
              this.emit("error", errContext);
            }
            this._scheduleResubscribe();
          } else {
            this._setUnsubscribed(err.code, err.message, false);
          }
        }
        _getResubscribeDelay() {
          const delay = (0, utils_1.backoff)(this._resubscribeAttempts, this._minResubscribeDelay, this._maxResubscribeDelay);
          this._resubscribeAttempts++;
          return delay;
        }
        _setOptions(options) {
          if (!options) {
            return;
          }
          if (options.since) {
            this._offset = options.since.offset;
            this._epoch = options.since.epoch;
            this._recover = true;
          }
          if (options.data) {
            this._data = options.data;
          }
          if (options.minResubscribeDelay !== void 0) {
            this._minResubscribeDelay = options.minResubscribeDelay;
          }
          if (options.maxResubscribeDelay !== void 0) {
            this._maxResubscribeDelay = options.maxResubscribeDelay;
          }
          if (options.token) {
            this._token = options.token;
          }
          if (options.getToken) {
            this._getToken = options.getToken;
          }
          if (options.positioned === true) {
            this._positioned = true;
          }
          if (options.recoverable === true) {
            this._recoverable = true;
          }
          if (options.joinLeave === true) {
            this._joinLeave = true;
          }
        }
        _getOffset() {
          const offset = this._offset;
          if (offset !== null) {
            return offset;
          }
          return 0;
        }
        _getEpoch() {
          const epoch = this._epoch;
          if (epoch !== null) {
            return epoch;
          }
          return "";
        }
        _clearRefreshTimeout() {
          if (this._refreshTimeout !== null) {
            clearTimeout(this._refreshTimeout);
            this._refreshTimeout = null;
          }
        }
        _clearResubscribeTimeout() {
          if (this._resubscribeTimeout !== null) {
            clearTimeout(this._resubscribeTimeout);
            this._resubscribeTimeout = null;
          }
        }
        _getSubscriptionToken() {
          this._centrifuge._debug("get subscription token for channel", this.channel);
          const ctx = {
            channel: this.channel
          };
          const getToken = this._getToken;
          if (getToken === null) {
            throw new Error("provide a function to get channel subscription token");
          }
          return getToken(ctx);
        }
        _refresh() {
          this._clearRefreshTimeout();
          const self2 = this;
          this._getSubscriptionToken().then(function(token) {
            if (!self2._isSubscribed()) {
              return;
            }
            if (!token) {
              self2._failUnauthorized();
              return;
            }
            self2._token = token;
            const req = {
              channel: self2.channel,
              token
            };
            const msg = {
              "sub_refresh": req
            };
            self2._centrifuge._call(msg).then((resolveCtx) => {
              const result = resolveCtx.reply.sub_refresh;
              self2._refreshResponse(result);
              if (resolveCtx.next) {
                resolveCtx.next();
              }
            }, (rejectCtx) => {
              self2._refreshError(rejectCtx.error);
              if (rejectCtx.next) {
                rejectCtx.next();
              }
            });
          }).catch(function(e) {
            self2.emit("error", {
              type: "refreshToken",
              channel: self2.channel,
              error: {
                code: codes_1.errorCodes.subscriptionRefreshToken,
                message: e !== void 0 ? e.toString() : ""
              }
            });
            self2._refreshTimeout = setTimeout(() => self2._refresh(), self2._getRefreshRetryDelay());
          });
        }
        _refreshResponse(result) {
          if (!this._isSubscribed()) {
            return;
          }
          this._centrifuge._debug("subscription token refreshed, channel", this.channel);
          this._clearRefreshTimeout();
          if (result.expires === true) {
            this._refreshTimeout = setTimeout(() => this._refresh(), (0, utils_1.ttlMilliseconds)(result.ttl));
          }
        }
        _refreshError(err) {
          if (!this._isSubscribed()) {
            return;
          }
          if (err.code < 100 || err.temporary === true) {
            this.emit("error", {
              type: "refresh",
              channel: this.channel,
              error: err
            });
            this._refreshTimeout = setTimeout(() => this._refresh(), this._getRefreshRetryDelay());
          } else {
            this._setUnsubscribed(err.code, err.message, true);
          }
        }
        _getRefreshRetryDelay() {
          return (0, utils_1.backoff)(0, 1e4, 2e4);
        }
        _failUnauthorized() {
          this._setUnsubscribed(codes_1.unsubscribedCodes.unauthorized, "unauthorized", true);
        }
      };
      exports.Subscription = Subscription;
    }
  });

  // node_modules/centrifuge/build/transport_sockjs.js
  var require_transport_sockjs = __commonJS({
    "node_modules/centrifuge/build/transport_sockjs.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SockjsTransport = void 0;
      var SockjsTransport = class {
        constructor(endpoint, options) {
          this.endpoint = endpoint;
          this.options = options;
          this._transport = null;
        }
        name() {
          return "sockjs";
        }
        subName() {
          return "sockjs-" + this._transport.transport;
        }
        emulation() {
          return false;
        }
        supported() {
          return this.options.sockjs !== null;
        }
        initialize(_protocol, callbacks) {
          this._transport = new this.options.sockjs(this.endpoint, null, this.options.sockjsOptions);
          this._transport.onopen = () => {
            callbacks.onOpen();
          };
          this._transport.onerror = (e) => {
            callbacks.onError(e);
          };
          this._transport.onclose = (closeEvent) => {
            callbacks.onClose(closeEvent);
          };
          this._transport.onmessage = (event) => {
            callbacks.onMessage(event.data);
          };
        }
        close() {
          this._transport.close();
        }
        send(data) {
          this._transport.send(data);
        }
      };
      exports.SockjsTransport = SockjsTransport;
    }
  });

  // node_modules/centrifuge/build/transport_websocket.js
  var require_transport_websocket = __commonJS({
    "node_modules/centrifuge/build/transport_websocket.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.WebsocketTransport = void 0;
      var WebsocketTransport = class {
        constructor(endpoint, options) {
          this.endpoint = endpoint;
          this.options = options;
          this._transport = null;
        }
        name() {
          return "websocket";
        }
        subName() {
          return "websocket";
        }
        emulation() {
          return false;
        }
        supported() {
          return this.options.websocket !== void 0 && this.options.websocket !== null;
        }
        initialize(protocol, callbacks) {
          let subProtocol = "";
          if (protocol === "protobuf") {
            subProtocol = "centrifuge-protobuf";
          }
          if (subProtocol !== "") {
            this._transport = new this.options.websocket(this.endpoint, subProtocol);
          } else {
            this._transport = new this.options.websocket(this.endpoint);
          }
          if (protocol === "protobuf") {
            this._transport.binaryType = "arraybuffer";
          }
          this._transport.onopen = () => {
            callbacks.onOpen();
          };
          this._transport.onerror = (e) => {
            callbacks.onError(e);
          };
          this._transport.onclose = (closeEvent) => {
            callbacks.onClose(closeEvent);
          };
          this._transport.onmessage = (event) => {
            callbacks.onMessage(event.data);
          };
        }
        close() {
          this._transport.close();
        }
        send(data) {
          this._transport.send(data);
        }
      };
      exports.WebsocketTransport = WebsocketTransport;
    }
  });

  // node_modules/centrifuge/build/transport_http_stream.js
  var require_transport_http_stream = __commonJS({
    "node_modules/centrifuge/build/transport_http_stream.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.HttpStreamTransport = void 0;
      var HttpStreamTransport = class {
        constructor(endpoint, options) {
          this.endpoint = endpoint;
          this.options = options;
          this._abortController = null;
          this._utf8decoder = new TextDecoder();
          this._protocol = "json";
        }
        name() {
          return "http_stream";
        }
        subName() {
          return "http_stream";
        }
        emulation() {
          return true;
        }
        _handleErrors(response) {
          if (!response.ok)
            throw new Error(response.status);
          return response;
        }
        _fetchEventTarget(self2, endpoint, options) {
          const eventTarget = new EventTarget();
          const fetchFunc = self2.options.fetch;
          fetchFunc(endpoint, options).then(self2._handleErrors).then((response) => {
            eventTarget.dispatchEvent(new Event("open"));
            let jsonStreamBuf = "";
            let jsonStreamPos = 0;
            let protoStreamBuf = new Uint8Array();
            const reader = response.body.getReader();
            return new self2.options.readableStream({
              start(controller) {
                function pump() {
                  return reader.read().then(({ done, value }) => {
                    if (done) {
                      eventTarget.dispatchEvent(new Event("close"));
                      controller.close();
                      return;
                    }
                    try {
                      if (self2._protocol === "json") {
                        jsonStreamBuf += self2._utf8decoder.decode(value);
                        while (jsonStreamPos < jsonStreamBuf.length) {
                          if (jsonStreamBuf[jsonStreamPos] === "\n") {
                            const line = jsonStreamBuf.substring(0, jsonStreamPos);
                            eventTarget.dispatchEvent(new MessageEvent("message", { data: line }));
                            jsonStreamBuf = jsonStreamBuf.substring(jsonStreamPos + 1);
                            jsonStreamPos = 0;
                          } else {
                            ++jsonStreamPos;
                          }
                        }
                      } else {
                        const mergedArray = new Uint8Array(protoStreamBuf.length + value.length);
                        mergedArray.set(protoStreamBuf);
                        mergedArray.set(value, protoStreamBuf.length);
                        protoStreamBuf = mergedArray;
                        while (true) {
                          const result = self2.options.decoder.decodeReply(protoStreamBuf);
                          if (result.ok) {
                            const data = protoStreamBuf.slice(0, result.pos);
                            eventTarget.dispatchEvent(new MessageEvent("message", { data }));
                            protoStreamBuf = protoStreamBuf.slice(result.pos);
                            continue;
                          }
                          break;
                        }
                      }
                    } catch (error) {
                      eventTarget.dispatchEvent(new Event("error", { detail: error }));
                      eventTarget.dispatchEvent(new Event("close"));
                      controller.close();
                      return;
                    }
                    pump();
                  }).catch(function(e) {
                    eventTarget.dispatchEvent(new Event("error", { detail: e }));
                    eventTarget.dispatchEvent(new Event("close"));
                    controller.close();
                    return;
                  });
                }
                return pump();
              }
            });
          }).catch((error) => {
            eventTarget.dispatchEvent(new Event("error", { detail: error }));
            eventTarget.dispatchEvent(new Event("close"));
          });
          return eventTarget;
        }
        supported() {
          return this.options.fetch !== null && this.options.readableStream !== null && typeof TextDecoder !== "undefined" && typeof AbortController !== "undefined" && typeof EventTarget !== "undefined" && typeof Event !== "undefined" && typeof MessageEvent !== "undefined" && typeof Error !== "undefined";
        }
        initialize(protocol, callbacks, initialData) {
          this._protocol = protocol;
          this._abortController = new AbortController();
          let headers;
          let body;
          if (protocol === "json") {
            headers = {
              "Accept": "application/json",
              "Content-Type": "application/json"
            };
            body = initialData;
          } else {
            headers = {
              "Accept": "application/octet-stream",
              "Content-Type": "application/octet-stream"
            };
            body = initialData;
          }
          const fetchOptions = {
            method: "POST",
            headers,
            body,
            mode: "cors",
            credentials: "same-origin",
            cache: "no-cache",
            signal: this._abortController.signal
          };
          const eventTarget = this._fetchEventTarget(this, this.endpoint, fetchOptions);
          eventTarget.addEventListener("open", () => {
            callbacks.onOpen();
          });
          eventTarget.addEventListener("error", (e) => {
            this._abortController.abort();
            callbacks.onError(e);
          });
          eventTarget.addEventListener("close", () => {
            this._abortController.abort();
            callbacks.onClose({
              code: 4,
              reason: "connection closed"
            });
          });
          eventTarget.addEventListener("message", (e) => {
            callbacks.onMessage(e.data);
          });
        }
        close() {
          this._abortController.abort();
        }
        send(data, session, node) {
          let headers;
          let body;
          const req = {
            session,
            node,
            data
          };
          if (this._protocol === "json") {
            headers = {
              "Content-Type": "application/json"
            };
            body = JSON.stringify(req);
          } else {
            headers = {
              "Content-Type": "application/octet-stream"
            };
            body = this.options.encoder.encodeEmulationRequest(req);
          }
          const fetchFunc = this.options.fetch;
          const fetchOptions = {
            method: "POST",
            headers,
            body,
            mode: "cors",
            credentials: "same-origin",
            cache: "no-cache"
          };
          fetchFunc(this.options.emulationEndpoint, fetchOptions);
        }
      };
      exports.HttpStreamTransport = HttpStreamTransport;
    }
  });

  // node_modules/centrifuge/build/transport_sse.js
  var require_transport_sse = __commonJS({
    "node_modules/centrifuge/build/transport_sse.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SseTransport = void 0;
      var SseTransport = class {
        constructor(endpoint, options) {
          this.endpoint = endpoint;
          this.options = options;
          this._protocol = "json";
          this._transport = null;
          this._onClose = null;
        }
        name() {
          return "sse";
        }
        subName() {
          return "sse";
        }
        emulation() {
          return true;
        }
        supported() {
          return this.options.eventsource !== null && this.options.fetch !== null;
        }
        initialize(_protocol, callbacks, initialData) {
          let url;
          if (globalThis && globalThis.document && globalThis.document.baseURI) {
            url = new URL(this.endpoint, globalThis.document.baseURI);
          } else {
            url = new URL(this.endpoint);
          }
          url.searchParams.append("cf_connect", initialData);
          const eventsourceOptions = {};
          const eventSource = new this.options.eventsource(url.toString(), eventsourceOptions);
          this._transport = eventSource;
          const self2 = this;
          eventSource.onopen = function() {
            callbacks.onOpen();
          };
          eventSource.onerror = function(e) {
            eventSource.close();
            callbacks.onError(e);
            callbacks.onClose({
              code: 4,
              reason: "connection closed"
            });
          };
          eventSource.onmessage = function(e) {
            callbacks.onMessage(e.data);
          };
          self2._onClose = function() {
            callbacks.onClose({
              code: 4,
              reason: "connection closed"
            });
          };
        }
        close() {
          this._transport.close();
          if (this._onClose !== null) {
            this._onClose();
          }
        }
        send(data, session, node) {
          const req = {
            session,
            node,
            data
          };
          const headers = {
            "Content-Type": "application/json"
          };
          const body = JSON.stringify(req);
          const fetchFunc = this.options.fetch;
          const fetchOptions = {
            method: "POST",
            headers,
            body,
            mode: "cors",
            credentials: "same-origin",
            cache: "no-cache"
          };
          fetchFunc(this.options.emulationEndpoint, fetchOptions);
        }
      };
      exports.SseTransport = SseTransport;
    }
  });

  // node_modules/centrifuge/build/transport_webtransport.js
  var require_transport_webtransport = __commonJS({
    "node_modules/centrifuge/build/transport_webtransport.js"(exports) {
      "use strict";
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.WebtransportTransport = void 0;
      var WebtransportTransport = class {
        constructor(endpoint, options) {
          this.endpoint = endpoint;
          this.options = options;
          this._transport = null;
          this._stream = null;
          this._writer = null;
          this._utf8decoder = new TextDecoder();
          this._protocol = "json";
        }
        name() {
          return "webtransport";
        }
        subName() {
          return "webtransport";
        }
        emulation() {
          return false;
        }
        supported() {
          return this.options.webtransport !== void 0 && this.options.webtransport !== null;
        }
        initialize(protocol, callbacks) {
          return __awaiter(this, void 0, void 0, function* () {
            let url;
            if (globalThis && globalThis.document && globalThis.document.baseURI) {
              url = new URL(this.endpoint, globalThis.document.baseURI);
            } else {
              url = new URL(this.endpoint);
            }
            if (protocol === "protobuf") {
              url.searchParams.append("cf_protocol", "protobuf");
            }
            this._protocol = protocol;
            const eventTarget = new EventTarget();
            this._transport = new this.options.webtransport(url.toString());
            this._transport.closed.then(() => {
              callbacks.onClose({
                code: 4,
                reason: "connection closed"
              });
            }).catch(() => {
              callbacks.onClose({
                code: 4,
                reason: "connection closed"
              });
            });
            try {
              yield this._transport.ready;
            } catch (_a) {
              this.close();
              return;
            }
            let stream;
            try {
              stream = yield this._transport.createBidirectionalStream();
            } catch (_b) {
              this.close();
              return;
            }
            this._stream = stream;
            this._writer = this._stream.writable.getWriter();
            eventTarget.addEventListener("close", () => {
              callbacks.onClose({
                code: 4,
                reason: "connection closed"
              });
            });
            eventTarget.addEventListener("message", (e) => {
              callbacks.onMessage(e.data);
            });
            this._startReading(eventTarget);
            callbacks.onOpen();
          });
        }
        _startReading(eventTarget) {
          return __awaiter(this, void 0, void 0, function* () {
            const reader = this._stream.readable.getReader();
            let jsonStreamBuf = "";
            let jsonStreamPos = 0;
            let protoStreamBuf = new Uint8Array();
            try {
              while (true) {
                const { done, value } = yield reader.read();
                if (value.length > 0) {
                  if (this._protocol === "json") {
                    jsonStreamBuf += this._utf8decoder.decode(value);
                    while (jsonStreamPos < jsonStreamBuf.length) {
                      if (jsonStreamBuf[jsonStreamPos] === "\n") {
                        const line = jsonStreamBuf.substring(0, jsonStreamPos);
                        eventTarget.dispatchEvent(new MessageEvent("message", { data: line }));
                        jsonStreamBuf = jsonStreamBuf.substring(jsonStreamPos + 1);
                        jsonStreamPos = 0;
                      } else {
                        ++jsonStreamPos;
                      }
                    }
                  } else {
                    const mergedArray = new Uint8Array(protoStreamBuf.length + value.length);
                    mergedArray.set(protoStreamBuf);
                    mergedArray.set(value, protoStreamBuf.length);
                    protoStreamBuf = mergedArray;
                    while (true) {
                      const result = this.options.decoder.decodeReply(protoStreamBuf);
                      if (result.ok) {
                        const data = protoStreamBuf.slice(0, result.pos);
                        eventTarget.dispatchEvent(new MessageEvent("message", { data }));
                        protoStreamBuf = protoStreamBuf.slice(result.pos);
                        continue;
                      }
                      break;
                    }
                  }
                }
                if (done) {
                  break;
                }
              }
            } catch (_a) {
              eventTarget.dispatchEvent(new Event("close"));
            }
          });
        }
        close() {
          return __awaiter(this, void 0, void 0, function* () {
            try {
              if (this._writer) {
                yield this._writer.close();
              }
              this._transport.close();
            } catch (e) {
            }
          });
        }
        send(data) {
          return __awaiter(this, void 0, void 0, function* () {
            let binary;
            if (this._protocol === "json") {
              binary = new TextEncoder().encode(data + "\n");
            } else {
              binary = data;
            }
            try {
              yield this._writer.write(binary);
            } catch (e) {
              this.close();
            }
          });
        }
      };
      exports.WebtransportTransport = WebtransportTransport;
    }
  });

  // node_modules/centrifuge/build/json.js
  var require_json = __commonJS({
    "node_modules/centrifuge/build/json.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.JsonDecoder = exports.JsonEncoder = void 0;
      var JsonEncoder = class {
        encodeCommands(commands) {
          return commands.map((c) => JSON.stringify(c)).join("\n");
        }
      };
      exports.JsonEncoder = JsonEncoder;
      var JsonDecoder = class {
        decodeReplies(data) {
          return data.trim().split("\n").map((r) => JSON.parse(r));
        }
      };
      exports.JsonDecoder = JsonDecoder;
    }
  });

  // node_modules/centrifuge/build/centrifuge.js
  var require_centrifuge = __commonJS({
    "node_modules/centrifuge/build/centrifuge.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Centrifuge = void 0;
      var subscription_1 = require_subscription();
      var codes_1 = require_codes();
      var transport_sockjs_1 = require_transport_sockjs();
      var transport_websocket_1 = require_transport_websocket();
      var transport_http_stream_1 = require_transport_http_stream();
      var transport_sse_1 = require_transport_sse();
      var transport_webtransport_1 = require_transport_webtransport();
      var json_1 = require_json();
      var utils_1 = require_utils();
      var types_1 = require_types();
      var events_1 = __importDefault(require_events());
      var defaults = {
        protocol: "json",
        token: null,
        getToken: null,
        data: null,
        debug: false,
        name: "js",
        version: "",
        fetch: null,
        readableStream: null,
        websocket: null,
        eventsource: null,
        sockjs: null,
        sockjsOptions: {},
        emulationEndpoint: "/emulation",
        minReconnectDelay: 500,
        maxReconnectDelay: 2e4,
        timeout: 5e3,
        maxServerPingDelay: 1e4,
        networkEventTarget: null
      };
      var Centrifuge2 = class extends events_1.default {
        /** Constructs Centrifuge client. Call connect() method to start connecting. */
        constructor(endpoint, options) {
          super();
          this._reconnectTimeout = null;
          this._refreshTimeout = null;
          this._serverPingTimeout = null;
          this.state = types_1.State.Disconnected;
          this._endpoint = endpoint;
          this._emulation = false;
          this._transports = [];
          this._currentTransportIndex = 0;
          this._triedAllTransports = false;
          this._transportWasOpen = false;
          this._transport = null;
          this._transportClosed = true;
          this._encoder = null;
          this._decoder = null;
          this._reconnecting = false;
          this._reconnectTimeout = null;
          this._reconnectAttempts = 0;
          this._client = null;
          this._session = "";
          this._node = "";
          this._subs = {};
          this._serverSubs = {};
          this._commandId = 0;
          this._commands = [];
          this._batching = false;
          this._refreshRequired = false;
          this._refreshTimeout = null;
          this._callbacks = {};
          this._token = void 0;
          this._dispatchPromise = Promise.resolve();
          this._serverPing = 0;
          this._serverPingTimeout = null;
          this._sendPong = false;
          this._promises = {};
          this._promiseId = 0;
          this._debugEnabled = false;
          this._config = Object.assign(Object.assign({}, defaults), options);
          this._configure();
          if (this._debugEnabled) {
            this.on("state", (ctx) => {
              this._debug("client state", ctx.oldState, "->", ctx.newState);
            });
            this.on("error", (ctx) => {
              this._debug("client error", ctx);
            });
          } else {
            this.on("error", function() {
              Function.prototype();
            });
          }
        }
        /** newSubscription allocates new Subscription to a channel. Since server only allows
         * one subscription per channel per client this method throws if client already has
         * channel subscription in internal registry.
         * */
        newSubscription(channel, options) {
          if (this.getSubscription(channel) !== null) {
            throw new Error("Subscription to the channel " + channel + " already exists");
          }
          const sub = new subscription_1.Subscription(this, channel, options);
          this._subs[channel] = sub;
          return sub;
        }
        /** getSubscription returns Subscription if it's registered in the internal
         * registry or null. */
        getSubscription(channel) {
          return this._getSub(channel);
        }
        /** removeSubscription allows removing Subcription from the internal registry. Subscrption
         * must be in unsubscribed state. */
        removeSubscription(sub) {
          if (!sub) {
            return;
          }
          if (sub.state !== types_1.SubscriptionState.Unsubscribed) {
            sub.unsubscribe();
          }
          this._removeSubscription(sub);
        }
        /** Get a map with all current client-side subscriptions. */
        subscriptions() {
          return this._subs;
        }
        /** ready returns a Promise which resolves upon client goes to Connected
         * state and rejects in case of client goes to Disconnected or Failed state.
         * Users can provide optional timeout in milliseconds. */
        ready(timeout) {
          if (this.state === types_1.State.Disconnected) {
            return Promise.reject({ code: codes_1.errorCodes.clientDisconnected, message: "client disconnected" });
          }
          if (this.state === types_1.State.Connected) {
            return Promise.resolve();
          }
          return new Promise((res, rej) => {
            const ctx = {
              resolve: res,
              reject: rej
            };
            if (timeout) {
              ctx.timeout = setTimeout(function() {
                rej({ code: codes_1.errorCodes.timeout, message: "timeout" });
              }, timeout);
            }
            this._promises[this._nextPromiseId()] = ctx;
          });
        }
        /** connect to a server. */
        connect() {
          if (this._isConnected()) {
            this._debug("connect called when already connected");
            return;
          }
          if (this._isConnecting()) {
            this._debug("connect called when already connecting");
            return;
          }
          this._reconnectAttempts = 0;
          this._startConnecting();
        }
        /** disconnect from a server. */
        disconnect() {
          this._disconnect(codes_1.disconnectedCodes.disconnectCalled, "disconnect called", false);
        }
        /** send asynchronous data to a server (without any response from a server
         * expected, see rpc method if you need response). */
        send(data) {
          const cmd = {
            send: {
              data
            }
          };
          const self2 = this;
          return this._methodCall().then(function() {
            const sent = self2._transportSendCommands([cmd]);
            if (!sent) {
              return Promise.reject(self2._createErrorObject(codes_1.errorCodes.transportWriteError, "transport write error"));
            }
            return Promise.resolve();
          });
        }
        /** rpc to a server - i.e. a call which waits for a response with data. */
        rpc(method, data) {
          const cmd = {
            rpc: {
              method,
              data
            }
          };
          const self2 = this;
          return this._methodCall().then(function() {
            return self2._callPromise(cmd, function(reply) {
              return {
                "data": reply.rpc.data
              };
            });
          });
        }
        /** publish data to a channel. */
        publish(channel, data) {
          const cmd = {
            publish: {
              channel,
              data
            }
          };
          const self2 = this;
          return this._methodCall().then(function() {
            return self2._callPromise(cmd, function() {
              return {};
            });
          });
        }
        /** history for a channel. By default it does not return publications (only current
         *  StreamPosition data) – provide an explicit limit > 0 to load publications.*/
        history(channel, options) {
          const cmd = {
            history: this._getHistoryRequest(channel, options)
          };
          const self2 = this;
          return this._methodCall().then(function() {
            return self2._callPromise(cmd, function(reply) {
              const result = reply.history;
              const publications = [];
              if (result.publications) {
                for (let i = 0; i < result.publications.length; i++) {
                  publications.push(self2._getPublicationContext(channel, result.publications[i]));
                }
              }
              return {
                "publications": publications,
                "epoch": result.epoch || "",
                "offset": result.offset || 0
              };
            });
          });
        }
        /** presence for a channel. */
        presence(channel) {
          const cmd = {
            presence: {
              channel
            }
          };
          const self2 = this;
          return this._methodCall().then(function() {
            return self2._callPromise(cmd, function(reply) {
              const clients = reply.presence.presence;
              for (const clientId in clients) {
                if (clients.hasOwnProperty(clientId)) {
                  const connInfo = clients[clientId]["conn_info"];
                  const chanInfo = clients[clientId]["chan_info"];
                  if (connInfo) {
                    clients[clientId].connInfo = connInfo;
                  }
                  if (chanInfo) {
                    clients[clientId].chanInfo = chanInfo;
                  }
                }
              }
              return {
                "clients": clients
              };
            });
          });
        }
        /** presence stats for a channel. */
        presenceStats(channel) {
          const cmd = {
            "presence_stats": {
              channel
            }
          };
          const self2 = this;
          return this._methodCall().then(function() {
            return self2._callPromise(cmd, function(reply) {
              const result = reply.presence_stats;
              return {
                "numUsers": result.num_users,
                "numClients": result.num_clients
              };
            });
          });
        }
        /** start command batching (collect into temporary buffer without sending to a server)
         * until stopBatching called.*/
        startBatching() {
          this._batching = true;
        }
        /** stop batching commands and flush collected commands to the
         * network (all in one request/frame).*/
        stopBatching() {
          const self2 = this;
          Promise.resolve().then(function() {
            Promise.resolve().then(function() {
              self2._batching = false;
              self2._flush();
            });
          });
        }
        _debug(...args) {
          if (!this._debugEnabled) {
            return;
          }
          (0, utils_1.log)("debug", args);
        }
        /** @internal */
        _setFormat(format) {
          if (this._formatOverride(format)) {
            return;
          }
          if (format === "protobuf") {
            throw new Error("not implemented by JSON-only Centrifuge client, use client with Protobuf support");
          }
          this._encoder = new json_1.JsonEncoder();
          this._decoder = new json_1.JsonDecoder();
        }
        /** @internal */
        _formatOverride(_format) {
          return false;
        }
        _configure() {
          if (!("Promise" in globalThis)) {
            throw new Error("Promise polyfill required");
          }
          if (!this._endpoint) {
            throw new Error("endpoint configuration required");
          }
          if (this._config.protocol !== "json" && this._config.protocol !== "protobuf") {
            throw new Error("unsupported protocol " + this._config.protocol);
          }
          if (this._config.token !== null) {
            this._token = this._config.token;
          }
          this._setFormat("json");
          if (this._config.protocol === "protobuf") {
            this._setFormat("protobuf");
          }
          if (this._config.debug === true || typeof localStorage !== "undefined" && localStorage.getItem("centrifuge.debug")) {
            this._debugEnabled = true;
          }
          this._debug("config", this._config);
          if (typeof this._endpoint === "string") {
          } else if (typeof this._endpoint === "object" && this._endpoint instanceof Array) {
            this._transports = this._endpoint;
            this._emulation = true;
            for (const i in this._transports) {
              const transportConfig = this._transports[i];
              if (!transportConfig.endpoint || !transportConfig.transport) {
                throw new Error("malformed transport configuration");
              }
              const transportName = transportConfig.transport;
              if (["websocket", "http_stream", "sse", "sockjs", "webtransport"].indexOf(transportName) < 0) {
                throw new Error("unsupported transport name: " + transportName);
              }
            }
          } else {
            throw new Error("unsupported url configuration type: only string or array of objects are supported");
          }
        }
        _setState(newState) {
          if (this.state !== newState) {
            this._reconnecting = false;
            const oldState = this.state;
            this.state = newState;
            this.emit("state", { newState, oldState });
            return true;
          }
          return false;
        }
        _isDisconnected() {
          return this.state === types_1.State.Disconnected;
        }
        _isConnecting() {
          return this.state === types_1.State.Connecting;
        }
        _isConnected() {
          return this.state === types_1.State.Connected;
        }
        _nextCommandId() {
          return ++this._commandId;
        }
        _setNetworkEvents() {
          let eventTarget = null;
          if (this._config.networkEventTarget !== null) {
            eventTarget = this._config.networkEventTarget;
          } else if (typeof globalThis.addEventListener !== "undefined") {
            eventTarget = globalThis;
          }
          if (eventTarget) {
            eventTarget.addEventListener("offline", () => {
              this._debug("offline event triggered");
              if (this.state === types_1.State.Connected && this._transport && !this._transportClosed) {
                this._transportClosed = true;
                this._transport.close();
              }
            });
            eventTarget.addEventListener("online", () => {
              this._debug("online event triggered");
              if (this.state === types_1.State.Connecting) {
                this._clearReconnectTimeout();
                this._startReconnecting();
              }
            });
          }
        }
        _getReconnectDelay() {
          const delay = (0, utils_1.backoff)(this._reconnectAttempts, this._config.minReconnectDelay, this._config.maxReconnectDelay);
          this._reconnectAttempts += 1;
          return delay;
        }
        _clearOutgoingRequests() {
          for (const id in this._callbacks) {
            if (this._callbacks.hasOwnProperty(id)) {
              const callbacks = this._callbacks[id];
              clearTimeout(callbacks.timeout);
              const errback = callbacks.errback;
              if (!errback) {
                continue;
              }
              errback({ error: this._createErrorObject(codes_1.errorCodes.connectionClosed, "connection closed") });
            }
          }
          this._callbacks = {};
        }
        _clearConnectedState() {
          this._client = null;
          this._clearServerPingTimeout();
          this._clearRefreshTimeout();
          for (const channel in this._subs) {
            if (!this._subs.hasOwnProperty(channel)) {
              continue;
            }
            const sub = this._subs[channel];
            if (sub.state === types_1.SubscriptionState.Subscribed) {
              sub._setSubscribing(codes_1.subscribingCodes.transportClosed, "transport closed");
            }
          }
          for (const channel in this._serverSubs) {
            if (this._serverSubs.hasOwnProperty(channel)) {
              this.emit("subscribing", { channel });
            }
          }
        }
        _handleWriteError(commands) {
          for (const command of commands) {
            const id = command.id;
            if (!(id in this._callbacks)) {
              continue;
            }
            const callbacks = this._callbacks[id];
            clearTimeout(this._callbacks[id].timeout);
            delete this._callbacks[id];
            const errback = callbacks.errback;
            errback({ error: this._createErrorObject(codes_1.errorCodes.transportWriteError, "transport write error") });
          }
        }
        _transportSendCommands(commands) {
          if (!commands.length) {
            return true;
          }
          if (!this._transport) {
            return false;
          }
          try {
            this._transport.send(this._encoder.encodeCommands(commands), this._session, this._node);
          } catch (e) {
            this._debug("error writing commands", e);
            this._handleWriteError(commands);
            return false;
          }
          return true;
        }
        _initializeTransport() {
          let websocket;
          if (this._config.websocket !== null) {
            websocket = this._config.websocket;
          } else {
            if (!(typeof globalThis.WebSocket !== "function" && typeof globalThis.WebSocket !== "object")) {
              websocket = globalThis.WebSocket;
            }
          }
          let sockjs = null;
          if (this._config.sockjs !== null) {
            sockjs = this._config.sockjs;
          } else {
            if (typeof globalThis.SockJS !== "undefined") {
              sockjs = globalThis.SockJS;
            }
          }
          let eventsource = null;
          if (this._config.eventsource !== null) {
            eventsource = this._config.eventsource;
          } else {
            if (typeof globalThis.EventSource !== "undefined") {
              eventsource = globalThis.EventSource;
            }
          }
          let fetchFunc = null;
          if (this._config.fetch !== null) {
            fetchFunc = this._config.fetch;
          } else {
            if (typeof globalThis.fetch !== "undefined") {
              fetchFunc = globalThis.fetch;
            }
          }
          let readableStream = null;
          if (this._config.readableStream !== null) {
            readableStream = this._config.readableStream;
          } else {
            if (typeof globalThis.ReadableStream !== "undefined") {
              readableStream = globalThis.ReadableStream;
            }
          }
          if (!this._emulation) {
            if ((0, utils_1.startsWith)(this._endpoint, "http")) {
              throw new Error("Provide explicit transport endpoints configuration in case of using HTTP (i.e. using array of TransportEndpoint instead of a single string), or use ws(s):// scheme in an endpoint if you aimed using WebSocket transport");
            } else {
              this._debug("client will use websocket");
              this._transport = new transport_websocket_1.WebsocketTransport(this._endpoint, {
                websocket
              });
              if (!this._transport.supported()) {
                throw new Error("WebSocket not available");
              }
            }
          } else {
            if (this._currentTransportIndex >= this._transports.length) {
              this._triedAllTransports = true;
              this._currentTransportIndex = 0;
            }
            let count = 0;
            while (true) {
              if (count >= this._transports.length) {
                throw new Error("no supported transport found");
              }
              const transportConfig = this._transports[this._currentTransportIndex];
              const transportName2 = transportConfig.transport;
              const transportEndpoint = transportConfig.endpoint;
              if (transportName2 === "websocket") {
                this._debug("trying websocket transport");
                this._transport = new transport_websocket_1.WebsocketTransport(transportEndpoint, {
                  websocket
                });
                if (!this._transport.supported()) {
                  this._debug("websocket transport not available");
                  this._currentTransportIndex++;
                  count++;
                  continue;
                }
              } else if (transportName2 === "webtransport") {
                this._debug("trying webtransport transport");
                this._transport = new transport_webtransport_1.WebtransportTransport(transportEndpoint, {
                  webtransport: globalThis.WebTransport,
                  decoder: this._decoder,
                  encoder: this._encoder
                });
                if (!this._transport.supported()) {
                  this._debug("webtransport transport not available");
                  this._currentTransportIndex++;
                  count++;
                  continue;
                }
              } else if (transportName2 === "http_stream") {
                this._debug("trying http_stream transport");
                this._transport = new transport_http_stream_1.HttpStreamTransport(transportEndpoint, {
                  fetch: fetchFunc,
                  readableStream,
                  emulationEndpoint: this._config.emulationEndpoint,
                  decoder: this._decoder,
                  encoder: this._encoder
                });
                if (!this._transport.supported()) {
                  this._debug("http_stream transport not available");
                  this._currentTransportIndex++;
                  count++;
                  continue;
                }
              } else if (transportName2 === "sse") {
                this._debug("trying sse transport");
                this._transport = new transport_sse_1.SseTransport(transportEndpoint, {
                  eventsource,
                  fetch: fetchFunc,
                  emulationEndpoint: this._config.emulationEndpoint
                });
                if (!this._transport.supported()) {
                  this._debug("sse transport not available");
                  this._currentTransportIndex++;
                  count++;
                  continue;
                }
              } else if (transportName2 === "sockjs") {
                this._debug("trying sockjs");
                this._transport = new transport_sockjs_1.SockjsTransport(transportEndpoint, {
                  sockjs,
                  sockjsOptions: this._config.sockjsOptions
                });
                if (!this._transport.supported()) {
                  this._debug("sockjs transport not available");
                  this._currentTransportIndex++;
                  count++;
                  continue;
                }
              } else {
                throw new Error("unknown transport " + transportName2);
              }
              break;
            }
          }
          const self2 = this;
          let transportName;
          let wasOpen = false;
          let optimistic = true;
          if (this._transport.name() === "sse") {
            optimistic = false;
          }
          const initialCommands = [];
          if (this._transport.emulation()) {
            const connectCommand = self2._sendConnect(true);
            initialCommands.push(connectCommand);
            if (optimistic) {
              const subscribeCommands = self2._sendSubscribeCommands(true, true);
              for (const i in subscribeCommands) {
                initialCommands.push(subscribeCommands[i]);
              }
            }
          }
          const initialData = this._encoder.encodeCommands(initialCommands);
          this._transport.initialize(this._config.protocol, {
            onOpen: function() {
              wasOpen = true;
              transportName = self2._transport.subName();
              self2._debug(transportName, "transport open");
              self2._transportWasOpen = true;
              self2._transportClosed = false;
              if (self2._transport.emulation()) {
                return;
              }
              self2.startBatching();
              self2._sendConnect(false);
              if (optimistic) {
                self2._sendSubscribeCommands(true, false);
              }
              self2.stopBatching();
            },
            onError: function(e) {
              self2._debug("transport level error", e);
            },
            onClose: function(closeEvent) {
              self2._debug(self2._transport.name(), "transport closed");
              self2._transportClosed = true;
              let reason = "connection closed";
              let needReconnect = true;
              let code = 0;
              if (closeEvent && "code" in closeEvent && closeEvent.code) {
                code = closeEvent.code;
              }
              if (closeEvent && closeEvent.reason) {
                try {
                  const advice = JSON.parse(closeEvent.reason);
                  reason = advice.reason;
                  needReconnect = advice.reconnect;
                } catch (e) {
                  reason = closeEvent.reason;
                  if (code >= 3500 && code < 4e3 || code >= 4500 && code < 5e3) {
                    needReconnect = false;
                  }
                }
              }
              if (code < 3e3) {
                if (code === 1009) {
                  code = codes_1.disconnectedCodes.messageSizeLimit;
                  reason = "message size limit exceeded";
                  needReconnect = false;
                } else {
                  code = codes_1.connectingCodes.transportClosed;
                  reason = "transport closed";
                }
                if (self2._emulation && !self2._transportWasOpen) {
                  self2._currentTransportIndex++;
                  if (self2._currentTransportIndex >= self2._transports.length) {
                    self2._triedAllTransports = true;
                    self2._currentTransportIndex = 0;
                  }
                }
              } else {
                self2._transportWasOpen = true;
              }
              let isInitialHandshake = false;
              if (self2._emulation && !self2._transportWasOpen && !self2._triedAllTransports) {
                isInitialHandshake = true;
              }
              if (self2._isConnecting() && !wasOpen) {
                self2.emit("error", {
                  type: "transport",
                  error: {
                    code: codes_1.errorCodes.transportClosed,
                    message: "transport closed"
                  },
                  transport: self2._transport.name()
                });
              }
              self2._disconnect(code, reason, needReconnect);
              if (self2._isConnecting()) {
                let delay = self2._getReconnectDelay();
                if (isInitialHandshake) {
                  delay = 0;
                }
                self2._debug("reconnect after " + delay + " milliseconds");
                self2._reconnecting = false;
                self2._reconnectTimeout = setTimeout(() => {
                  self2._startReconnecting();
                }, delay);
              }
            },
            onMessage: function(data) {
              self2._dataReceived(data);
            }
          }, initialData);
        }
        _sendConnect(skipSending) {
          const connectCommand = this._constructConnectCommand();
          const self2 = this;
          this._call(connectCommand, skipSending).then((resolveCtx) => {
            const result = resolveCtx.reply.connect;
            self2._connectResponse(result);
            if (resolveCtx.next) {
              resolveCtx.next();
            }
          }, (rejectCtx) => {
            self2._connectError(rejectCtx.error);
            if (rejectCtx.next) {
              rejectCtx.next();
            }
          });
          return connectCommand;
        }
        _startReconnecting() {
          if (!this._isConnecting() || this._reconnecting) {
            return;
          }
          this._reconnecting = true;
          const needTokenRefresh = this._refreshRequired || !this._token && this._config.getToken !== null;
          if (!needTokenRefresh) {
            this._initializeTransport();
            return;
          }
          const self2 = this;
          this._getToken().then(function(token) {
            if (!self2._isConnecting()) {
              return;
            }
            if (!token) {
              self2._failUnauthorized();
              return;
            }
            self2._token = token;
            self2._debug("connection token refreshed");
            self2._initializeTransport();
          }).catch(function(e) {
            if (!self2._isConnecting()) {
              return;
            }
            self2.emit("error", {
              "type": "connectToken",
              "error": {
                code: codes_1.errorCodes.clientConnectToken,
                message: e !== void 0 ? e.toString() : ""
              }
            });
            const delay = self2._getReconnectDelay();
            self2._debug("error on connection token refresh, reconnect after " + delay + " milliseconds", e);
            self2._reconnecting = false;
            self2._reconnectTimeout = setTimeout(() => {
              self2._startReconnecting();
            }, delay);
          });
        }
        _connectError(err) {
          if (this.state !== types_1.State.Connecting) {
            return;
          }
          if (err.code === 109) {
            this._refreshRequired = true;
          }
          if (err.code < 100 || err.temporary === true || err.code === 109) {
            this.emit("error", {
              "type": "connect",
              "error": err
            });
            if (this._transport && !this._transportClosed) {
              this._transportClosed = true;
              this._transport.close();
            }
          } else {
            this._disconnect(err.code, err.message, false);
          }
        }
        _constructConnectCommand() {
          const req = {};
          if (this._token) {
            req.token = this._token;
          }
          if (this._config.data) {
            req.data = this._config.data;
          }
          if (this._config.name) {
            req.name = this._config.name;
          }
          if (this._config.version) {
            req.version = this._config.version;
          }
          const subs = {};
          let hasSubs = false;
          for (const channel in this._serverSubs) {
            if (this._serverSubs.hasOwnProperty(channel) && this._serverSubs[channel].recoverable) {
              hasSubs = true;
              const sub = {
                "recover": true
              };
              if (this._serverSubs[channel].offset) {
                sub["offset"] = this._serverSubs[channel].offset;
              }
              if (this._serverSubs[channel].epoch) {
                sub["epoch"] = this._serverSubs[channel].epoch;
              }
              subs[channel] = sub;
            }
          }
          if (hasSubs) {
            req.subs = subs;
          }
          return {
            connect: req
          };
        }
        _getHistoryRequest(channel, options) {
          const req = {
            channel
          };
          if (options !== void 0) {
            if (options.since) {
              req.since = {
                offset: options.since.offset
              };
              if (options.since.epoch) {
                req.since.epoch = options.since.epoch;
              }
            }
            if (options.limit !== void 0) {
              req.limit = options.limit;
            }
            if (options.reverse === true) {
              req.reverse = true;
            }
          }
          return req;
        }
        _methodCall() {
          if (this._isConnected()) {
            return Promise.resolve();
          }
          return new Promise((res, rej) => {
            const timeout = setTimeout(function() {
              rej({ code: codes_1.errorCodes.timeout, message: "timeout" });
            }, this._config.timeout);
            this._promises[this._nextPromiseId()] = {
              timeout,
              resolve: res,
              reject: rej
            };
          });
        }
        _callPromise(cmd, resultCB) {
          return new Promise((resolve, reject) => {
            this._call(cmd, false).then((resolveCtx) => {
              resolve(resultCB(resolveCtx.reply));
              if (resolveCtx.next) {
                resolveCtx.next();
              }
            }, (rejectCtx) => {
              reject(rejectCtx.error);
              if (rejectCtx.next) {
                rejectCtx.next();
              }
            });
          });
        }
        _dataReceived(data) {
          if (this._serverPing > 0) {
            this._waitServerPing();
          }
          const replies = this._decoder.decodeReplies(data);
          this._dispatchPromise = this._dispatchPromise.then(() => {
            let finishDispatch;
            this._dispatchPromise = new Promise((resolve) => {
              finishDispatch = resolve;
            });
            this._dispatchSynchronized(replies, finishDispatch);
          });
        }
        _dispatchSynchronized(replies, finishDispatch) {
          let p = Promise.resolve();
          for (const i in replies) {
            if (replies.hasOwnProperty(i)) {
              p = p.then(() => {
                return this._dispatchReply(replies[i]);
              });
            }
          }
          p = p.then(() => {
            finishDispatch();
          });
        }
        _dispatchReply(reply) {
          let next;
          const p = new Promise((resolve) => {
            next = resolve;
          });
          if (reply === void 0 || reply === null) {
            this._debug("dispatch: got undefined or null reply");
            next();
            return p;
          }
          const id = reply.id;
          if (id && id > 0) {
            this._handleReply(reply, next);
          } else {
            if (!reply.push) {
              this._handleServerPing(next);
            } else {
              this._handlePush(reply.push, next);
            }
          }
          return p;
        }
        _call(cmd, skipSending) {
          return new Promise((resolve, reject) => {
            cmd.id = this._nextCommandId();
            this._registerCall(cmd.id, resolve, reject);
            if (!skipSending) {
              this._addCommand(cmd);
            }
          });
        }
        _startConnecting() {
          this._debug("start connecting");
          if (this._setState(types_1.State.Connecting)) {
            this.emit("connecting", { code: codes_1.connectingCodes.connectCalled, reason: "connect called" });
          }
          this._client = null;
          this._startReconnecting();
        }
        _disconnect(code, reason, reconnect) {
          if (this._isDisconnected()) {
            return;
          }
          const previousState = this.state;
          const ctx = {
            code,
            reason
          };
          let needEvent = false;
          if (reconnect) {
            needEvent = this._setState(types_1.State.Connecting);
          } else {
            needEvent = this._setState(types_1.State.Disconnected);
            this._rejectPromises({ code: codes_1.errorCodes.clientDisconnected, message: "disconnected" });
          }
          this._clearOutgoingRequests();
          if (previousState === types_1.State.Connecting) {
            this._clearReconnectTimeout();
          }
          if (previousState === types_1.State.Connected) {
            this._clearConnectedState();
          }
          if (needEvent) {
            if (this._isConnecting()) {
              this.emit("connecting", ctx);
            } else {
              this.emit("disconnected", ctx);
            }
          }
          if (this._transport && !this._transportClosed) {
            this._transportClosed = true;
            this._transport.close();
          }
        }
        _failUnauthorized() {
          this._disconnect(codes_1.disconnectedCodes.unauthorized, "unauthorized", false);
        }
        _getToken() {
          this._debug("get connection token");
          if (!this._config.getToken) {
            throw new Error("provide a function to get connection token");
          }
          return this._config.getToken({});
        }
        _refresh() {
          const clientId = this._client;
          const self2 = this;
          this._getToken().then(function(token) {
            if (clientId !== self2._client) {
              return;
            }
            if (!token) {
              self2._failUnauthorized();
              return;
            }
            self2._token = token;
            self2._debug("connection token refreshed");
            if (!self2._isConnected()) {
              return;
            }
            const cmd = {
              refresh: { token: self2._token }
            };
            self2._call(cmd, false).then((resolveCtx) => {
              const result = resolveCtx.reply.refresh;
              self2._refreshResponse(result);
              if (resolveCtx.next) {
                resolveCtx.next();
              }
            }, (rejectCtx) => {
              self2._refreshError(rejectCtx.error);
              if (rejectCtx.next) {
                rejectCtx.next();
              }
            });
          }).catch(function(e) {
            self2.emit("error", {
              type: "refreshToken",
              error: {
                code: codes_1.errorCodes.clientRefreshToken,
                message: e !== void 0 ? e.toString() : ""
              }
            });
            self2._refreshTimeout = setTimeout(() => self2._refresh(), self2._getRefreshRetryDelay());
          });
        }
        _refreshError(err) {
          if (err.code < 100 || err.temporary === true) {
            this.emit("error", {
              type: "refresh",
              error: err
            });
            this._refreshTimeout = setTimeout(() => this._refresh(), this._getRefreshRetryDelay());
          } else {
            this._disconnect(err.code, err.message, false);
          }
        }
        _getRefreshRetryDelay() {
          return (0, utils_1.backoff)(0, 5e3, 1e4);
        }
        _refreshResponse(result) {
          if (this._refreshTimeout) {
            clearTimeout(this._refreshTimeout);
            this._refreshTimeout = null;
          }
          if (result.expires) {
            this._client = result.client;
            this._refreshTimeout = setTimeout(() => this._refresh(), (0, utils_1.ttlMilliseconds)(result.ttl));
          }
        }
        _removeSubscription(sub) {
          if (sub === null) {
            return;
          }
          delete this._subs[sub.channel];
        }
        _unsubscribe(sub) {
          if (!this._isConnected()) {
            return;
          }
          const req = {
            channel: sub.channel
          };
          const cmd = { unsubscribe: req };
          const self2 = this;
          this._call(cmd, false).then((resolveCtx) => {
            if (resolveCtx.next) {
              resolveCtx.next();
            }
          }, (rejectCtx) => {
            if (rejectCtx.next) {
              rejectCtx.next();
            }
            self2._disconnect(codes_1.connectingCodes.unsubscribeError, "unsubscribe error", true);
          });
        }
        _getSub(channel) {
          const sub = this._subs[channel];
          if (!sub) {
            return null;
          }
          return sub;
        }
        _isServerSub(channel) {
          return this._serverSubs[channel] !== void 0;
        }
        _sendSubscribeCommands(optimistic, skipSending) {
          const commands = [];
          for (const channel in this._subs) {
            if (!this._subs.hasOwnProperty(channel)) {
              continue;
            }
            const sub = this._subs[channel];
            if (sub._inflight === true) {
              continue;
            }
            if (sub.state === types_1.SubscriptionState.Subscribing) {
              const cmd = sub._subscribe(optimistic, skipSending);
              if (cmd) {
                commands.push(cmd);
              }
            }
          }
          return commands;
        }
        _connectResponse(result) {
          this._transportWasOpen = true;
          this._reconnectAttempts = 0;
          this._refreshRequired = false;
          if (this._isConnected()) {
            return;
          }
          this._client = result.client;
          this._setState(types_1.State.Connected);
          this._setNetworkEvents();
          if (this._refreshTimeout) {
            clearTimeout(this._refreshTimeout);
          }
          if (result.expires) {
            this._refreshTimeout = setTimeout(() => this._refresh(), (0, utils_1.ttlMilliseconds)(result.ttl));
          }
          this._session = result.session;
          this._node = result.node;
          this.startBatching();
          this._sendSubscribeCommands(false, false);
          this.stopBatching();
          const ctx = {
            client: result.client,
            transport: this._transport.subName()
          };
          if (result.data) {
            ctx.data = result.data;
          }
          this.emit("connected", ctx);
          this._resolvePromises();
          this._processServerSubs(result.subs || {});
          if (result.ping && result.ping > 0) {
            this._serverPing = result.ping * 1e3;
            this._sendPong = result.pong === true;
            this._waitServerPing();
          } else {
            this._serverPing = 0;
          }
        }
        _processServerSubs(subs) {
          for (const channel in subs) {
            if (!subs.hasOwnProperty(channel)) {
              continue;
            }
            const sub = subs[channel];
            this._serverSubs[channel] = {
              "offset": sub.offset,
              "epoch": sub.epoch,
              "recoverable": sub.recoverable || false
            };
            const subCtx = this._getSubscribeContext(channel, sub);
            this.emit("subscribed", subCtx);
          }
          for (const channel in subs) {
            if (!subs.hasOwnProperty(channel)) {
              continue;
            }
            const sub = subs[channel];
            if (sub.recovered) {
              const pubs = sub.publications;
              if (pubs && pubs.length > 0) {
                for (const i in pubs) {
                  if (pubs.hasOwnProperty(i)) {
                    this._handlePublication(channel, pubs[i]);
                  }
                }
              }
            }
          }
          for (const channel in this._serverSubs) {
            if (!this._serverSubs.hasOwnProperty(channel)) {
              continue;
            }
            if (!subs[channel]) {
              this.emit("unsubscribed", { channel });
              delete this._serverSubs[channel];
            }
          }
        }
        _clearRefreshTimeout() {
          if (this._refreshTimeout !== null) {
            clearTimeout(this._refreshTimeout);
            this._refreshTimeout = null;
          }
        }
        _clearReconnectTimeout() {
          if (this._reconnectTimeout !== null) {
            clearTimeout(this._reconnectTimeout);
            this._reconnectTimeout = null;
          }
        }
        _clearServerPingTimeout() {
          if (this._serverPingTimeout !== null) {
            clearTimeout(this._serverPingTimeout);
            this._serverPingTimeout = null;
          }
        }
        _waitServerPing() {
          if (this._config.maxServerPingDelay === 0) {
            return;
          }
          if (!this._isConnected()) {
            return;
          }
          this._clearServerPingTimeout();
          this._serverPingTimeout = setTimeout(() => {
            if (!this._isConnected()) {
              return;
            }
            this._disconnect(codes_1.connectingCodes.noPing, "no ping", true);
          }, this._serverPing + this._config.maxServerPingDelay);
        }
        _getSubscribeContext(channel, result) {
          const ctx = {
            channel,
            positioned: false,
            recoverable: false,
            wasRecovering: false,
            recovered: false
          };
          if (result.recovered) {
            ctx.recovered = true;
          }
          if (result.positioned) {
            ctx.positioned = true;
          }
          if (result.recoverable) {
            ctx.recoverable = true;
          }
          if (result.was_recovering) {
            ctx.wasRecovering = true;
          }
          let epoch = "";
          if ("epoch" in result) {
            epoch = result.epoch;
          }
          let offset = 0;
          if ("offset" in result) {
            offset = result.offset;
          }
          if (ctx.positioned || ctx.recoverable) {
            ctx.streamPosition = {
              "offset": offset,
              "epoch": epoch
            };
          }
          if (result.data) {
            ctx.data = result.data;
          }
          return ctx;
        }
        _handleReply(reply, next) {
          const id = reply.id;
          if (!(id in this._callbacks)) {
            next();
            return;
          }
          const callbacks = this._callbacks[id];
          clearTimeout(this._callbacks[id].timeout);
          delete this._callbacks[id];
          if (!(0, utils_1.errorExists)(reply)) {
            const callback = callbacks.callback;
            if (!callback) {
              return;
            }
            callback({ reply, next });
          } else {
            const errback = callbacks.errback;
            if (!errback) {
              next();
              return;
            }
            const error = reply.error;
            errback({ error, next });
          }
        }
        _handleJoin(channel, join) {
          const sub = this._getSub(channel);
          if (!sub) {
            if (this._isServerSub(channel)) {
              const ctx = { channel, info: this._getJoinLeaveContext(join.info) };
              this.emit("join", ctx);
            }
            return;
          }
          sub._handleJoin(join);
        }
        _handleLeave(channel, leave) {
          const sub = this._getSub(channel);
          if (!sub) {
            if (this._isServerSub(channel)) {
              const ctx = { channel, info: this._getJoinLeaveContext(leave.info) };
              this.emit("leave", ctx);
            }
            return;
          }
          sub._handleLeave(leave);
        }
        _handleUnsubscribe(channel, unsubscribe) {
          const sub = this._getSub(channel);
          if (!sub) {
            if (this._isServerSub(channel)) {
              delete this._serverSubs[channel];
              this.emit("unsubscribed", { channel });
            }
            return;
          }
          if (unsubscribe.code < 2500) {
            sub._setUnsubscribed(unsubscribe.code, unsubscribe.reason, false);
          } else {
            sub._setSubscribing(unsubscribe.code, unsubscribe.reason);
          }
        }
        _handleSubscribe(channel, sub) {
          this._serverSubs[channel] = {
            "offset": sub.offset,
            "epoch": sub.epoch,
            "recoverable": sub.recoverable || false
          };
          this.emit("subscribed", this._getSubscribeContext(channel, sub));
        }
        _handleDisconnect(disconnect) {
          const code = disconnect.code;
          let reconnect = true;
          if (code >= 3500 && code < 4e3 || code >= 4500 && code < 5e3) {
            reconnect = false;
          }
          this._disconnect(code, disconnect.reason, reconnect);
        }
        _getPublicationContext(channel, pub) {
          const ctx = {
            channel,
            data: pub.data
          };
          if (pub.offset) {
            ctx.offset = pub.offset;
          }
          if (pub.info) {
            ctx.info = this._getJoinLeaveContext(pub.info);
          }
          if (pub.tags) {
            ctx.tags = pub.tags;
          }
          return ctx;
        }
        _getJoinLeaveContext(clientInfo) {
          const info = {
            client: clientInfo.client,
            user: clientInfo.user
          };
          if (clientInfo.conn_info) {
            info.connInfo = clientInfo.conn_info;
          }
          if (clientInfo.chan_info) {
            info.chanInfo = clientInfo.chan_info;
          }
          return info;
        }
        _handlePublication(channel, pub) {
          const sub = this._getSub(channel);
          if (!sub) {
            if (this._isServerSub(channel)) {
              const ctx = this._getPublicationContext(channel, pub);
              this.emit("publication", ctx);
              if (pub.offset !== void 0) {
                this._serverSubs[channel].offset = pub.offset;
              }
            }
            return;
          }
          sub._handlePublication(pub);
        }
        _handleMessage(message) {
          this.emit("message", { data: message.data });
        }
        _handleServerPing(next) {
          if (this._sendPong) {
            const cmd = {};
            this._transportSendCommands([cmd]);
          }
          next();
        }
        _handlePush(data, next) {
          const channel = data.channel;
          if (data.pub) {
            this._handlePublication(channel, data.pub);
          } else if (data.message) {
            this._handleMessage(data.message);
          } else if (data.join) {
            this._handleJoin(channel, data.join);
          } else if (data.leave) {
            this._handleLeave(channel, data.leave);
          } else if (data.unsubscribe) {
            this._handleUnsubscribe(channel, data.unsubscribe);
          } else if (data.subscribe) {
            this._handleSubscribe(channel, data.subscribe);
          } else if (data.disconnect) {
            this._handleDisconnect(data.disconnect);
          }
          next();
        }
        _flush() {
          const commands = this._commands.slice(0);
          this._commands = [];
          this._transportSendCommands(commands);
        }
        _createErrorObject(code, message, temporary) {
          const errObject = {
            code,
            message
          };
          if (temporary) {
            errObject.temporary = true;
          }
          return errObject;
        }
        _registerCall(id, callback, errback) {
          this._callbacks[id] = {
            callback,
            errback,
            timeout: null
          };
          this._callbacks[id].timeout = setTimeout(() => {
            delete this._callbacks[id];
            if ((0, utils_1.isFunction)(errback)) {
              errback({ error: this._createErrorObject(codes_1.errorCodes.timeout, "timeout") });
            }
          }, this._config.timeout);
        }
        _addCommand(command) {
          if (this._batching) {
            this._commands.push(command);
          } else {
            this._transportSendCommands([command]);
          }
        }
        _nextPromiseId() {
          return ++this._promiseId;
        }
        _resolvePromises() {
          for (const id in this._promises) {
            if (this._promises[id].timeout) {
              clearTimeout(this._promises[id].timeout);
            }
            this._promises[id].resolve();
            delete this._promises[id];
          }
        }
        _rejectPromises(err) {
          for (const id in this._promises) {
            if (this._promises[id].timeout) {
              clearTimeout(this._promises[id].timeout);
            }
            this._promises[id].reject(err);
            delete this._promises[id];
          }
        }
      };
      exports.Centrifuge = Centrifuge2;
      Centrifuge2.SubscriptionState = types_1.SubscriptionState;
      Centrifuge2.State = types_1.State;
    }
  });

  // node_modules/centrifuge/build/index.js
  var require_build = __commonJS({
    "node_modules/centrifuge/build/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Subscription = exports.Centrifuge = void 0;
      var centrifuge_1 = require_centrifuge();
      Object.defineProperty(exports, "Centrifuge", { enumerable: true, get: function() {
        return centrifuge_1.Centrifuge;
      } });
      var subscription_1 = require_subscription();
      Object.defineProperty(exports, "Subscription", { enumerable: true, get: function() {
        return subscription_1.Subscription;
      } });
      __exportStar(require_types(), exports);
    }
  });

  // src/app/utils/prepareOrderBook.ts
  var prepareOrderBook = (orderBook2, market, bids, asks) => {
    return {
      ...orderBook2,
      [market]: {
        bids: {
          ...orderBook2[market]?.bids || {},
          ...bids.reduce((acc, [price, value]) => {
            acc[price] = value;
            return acc;
          }, {})
        },
        asks: {
          ...orderBook2[market]?.asks || {},
          ...asks.reduce((acc, [price, value]) => {
            acc[price] = value;
            return acc;
          }, {})
        }
      }
    };
  };

  // src/app/utils/prepareOrders.ts
  var prepareOrders = (orders, type) => {
    const _orders = Object.keys(orders).map((key) => [+key, +orders[+key]]).filter(([, size]) => size > 0).sort(
      ([priceA], [priceB]) => (type === "bids" ? priceA > priceB : priceA < priceB) ? 1 : -1
    );
    return _orders;
  };

  // src/app/utils/createCentrifuge.ts
  var import_centrifuge = __toESM(require_build());

  // src/app/utils/constants.ts
  var wsURI = "wss://api.prod.rabbitx.io/ws";

  // src/app/utils/createCentrifuge.ts
  var createCentrifuge = (getToken) => {
    return new import_centrifuge.Centrifuge(wsURI, {
      getToken
    });
  };

  // src/web_worker/web_worker.ts
  var centrifuge = createCentrifuge(async () => {
    if (typeof fetch !== "undefined") {
      const response = await fetch("/api/token");
      const data = await response.json();
      return data.token;
    } else {
      return "";
    }
  });
  var orderBook = {};
  var previousAverage = {};
  var tick = () => {
    const data = Object.keys(orderBook).reduce(
      (acc, market) => {
        if (market && orderBook[market]) {
          const bids = prepareOrders(orderBook[market].bids, "bids");
          const asks = prepareOrders(orderBook[market].asks, "asks");
          const minBid = bids[0][0] || 0;
          const maxAsk = asks[0][0] || 0;
          const average = minBid && maxAsk ? +((minBid + maxAsk) / 2).toFixed(8) : minBid || maxAsk || 0;
          const destination = average > previousAverage[market] ? "up" : "down";
          previousAverage[market] = average;
          acc[market] = {
            bids,
            asks,
            destination,
            average
          };
        }
        return acc;
      },
      {}
    );
    self.postMessage({ action: "message", data });
  };
  var interval;
  var setData = (market, bids, asks) => {
    orderBook = prepareOrderBook(orderBook, market, bids, asks);
  };
  self.addEventListener("message", (event) => {
    const { action, data } = event.data;
    const channel = data && data.channel || "";
    const [, market] = channel.split(":");
    const onPublication = (response) => {
      setData(market, response.data.asks, response.data.bids);
    };
    switch (action) {
      case "subscribe":
        if (!centrifuge.getSubscription(channel)) {
          const sub2 = centrifuge.newSubscription(channel);
          sub2.on("subscribed", (response) => {
            setData(market, response.data.asks, response.data.bids);
            sub2.on("publication", onPublication);
          });
          sub2.subscribe();
        }
        break;
      case "unsubscribe":
        const sub = centrifuge.getSubscription(channel);
        if (sub) {
          sub.off("publication", onPublication);
          centrifuge.removeSubscription(sub);
        }
        break;
      case "connect":
        centrifuge.connect();
        interval = setInterval(() => {
          tick();
        }, 1e3);
        break;
      case "disconnect":
        centrifuge.disconnect();
        clearInterval(interval);
        break;
    }
  });
})();
