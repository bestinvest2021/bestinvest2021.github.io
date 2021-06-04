/**
 * This software contains code from open-source projects:
 * MurmurHash3 by Karan Lyons (https://github.com/karanlyons/murmurHash3.js)
 */

!function (e, t) {
  "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).FP = {})
}(this, (function (e) {
  "use strict";
  var t = window, n = navigator, r = document, o = function (e, t) {
    if (Array.prototype.forEach && e.forEach === Array.prototype.forEach) e.forEach(t); else if (e.length === +e.length) for (var n = 0, r = e.length; n < r; n++) t(e[n], n); else for (var o in e) e.hasOwnProperty(o) && t(e[o], o)
  }, i = function (e, t) {
    var n = [];
    return null == e ? n : Array.prototype.map && e.map === Array.prototype.map ? e.map(t) : (o(e, (function (e, r) {
      n.push(t(e, r))
    })), n)
  }, a = function (e) {
    t.console && console.log && console.log(e)
  }, c = function (e, t) {
    if (0 == t.length || t.length > e.length) return -1;
    for (var n = 0; n < e.length; n++) {
      for (var r = 0, o = 0; o < t.length; o++) {
        if (e[n + o] != t[o]) {
          r = 0;
          break
        }
        r++
      }
      if (r == t.length) return n
    }
    return -1
  };

  function u(e) {
    return e.reduce((function (e, t) {
      return e + (t ? 1 : 0)
    }), 0)
  }

  function s() {
    return u(["webkitPersistentStorage" in n, "webkitTemporaryStorage" in n, 0 === n.vendor.indexOf("Google"), "webkitResolveLocalFileSystemURL" in t, "BatteryManager" in t, "webkitMediaStream" in t, "webkitSpeechGrammar" in t]) >= 5
  }

  function f() {
    return u(["ApplePayError" in t, "CSSPrimitiveValue" in t, "Counter" in t, 0 === n.vendor.indexOf("Apple"), "getStorageUpdates" in n, "WebKitMediaKeys" in t]) >= 4
  }

  function l() {
    return u(["safari" in t, !("DeviceMotionEvent" in t), !("ongestureend" in t), !("standalone" in n)]) >= 3
  }

  function d(e, t) {
    return new Promise((function (n) {
      var o = function () {
        return r.hidden ? c() : a()
      }, i = function (e, t, n) {
        var r, o = !1, i = e, a = 0, c = function () {
          o || void 0 !== r || (a = Date.now(), r = setTimeout((function () {
            o = !0, n()
          }), i))
        };
        return t && c(), {
          start: c, stop: function () {
            o || void 0 === r || (clearTimeout(r), r = void 0, i -= Date.now() - a)
          }
        }
      }(e, !r.hidden, (function () {
        r.removeEventListener("visibilitychange", o), n(t)
      })), a = i.start, c = i.stop;
      r.addEventListener("visibilitychange", o)
    }))
  }

  function p(e) {
    for (var t = e + "=", n = document.cookie.split(";"), r = 0; r < n.length; r++) {
      for (var o = n[r]; " " == o.charAt(0);) o = o.substring(1, o.length);
      if (0 == o.indexOf(t)) return o.substring(t.length, o.length)
    }
  }

  function h(e, t, n) {
    return "n/a" !== e && (!function (e, t, n, r) {
      var o = e + "=" + t, i = new Date;
      i.setTime(i.getTime() + 24 * n * 60 * 60 * 1e3);
      var a = "expires=" + i.toUTCString(), c = "";
      r && r.length > 0 && (c = "domain=" + r), document.cookie = [o, "path=/", a, c].join("; ")
    }(n || "_vid", e, 365, t), y("_vid", e)), e
  }

  var g, m = function (e) {
    try {
      if (localStorage && localStorage.getItem) return localStorage.getItem(e)
    } catch (e) {
    }
    return null
  }, y = function (e, t) {
    try {
      localStorage && localStorage.setItem && localStorage.setItem(e, t)
    } catch (e) {
    }
  };
  !function (e) {
    e[e.unset = -1] = "unset", e[e.city = 1] = "city", e[e.full = 2] = "full"
  }(g || (g = {}));
  var v = function () {
    function e(e, t, n, r) {
      this._tls = null, this._tlsError = null, this.requestId = function (e) {
        for (var t = "", n = 0; n < e; n++) t += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62 * Math.random()));
        return t
      }(20), this.sendOptions = e, this.config = t, this.duration = n, this.components = r
    }

    return Object.defineProperty(e.prototype, "tls", {
      set: function (e) {
        this._tls = e
      }, enumerable: !1, configurable: !0
    }), Object.defineProperty(e.prototype, "tlsError", {
      set: function (e) {
        this._tlsError = e
      }, enumerable: !1, configurable: !0
    }), e.prototype.rawIPResolution = function () {
      return this.sendOptions.ip ? "full" == this.sendOptions.ip ? g.full : g.city : g.unset
    }, e.prototype.buildRaw = function (e) {
      var t = function (e) {
        return {cookies: p(e || "_vid"), localStorage: m("_vid")}
      }(e), n = {
        rid: this.requestId,
        cv: "2.8.2",
        c: this.config.client,
        url: location.href,
        d: this.duration,
        vid: t.cookies || t.localStorage || void 0,
        ls: t.localStorage ? 1 : void 0,
        i: this.rawIPResolution()
      };
      return this._tls && this._tls.length > 0 && (n.j = this._tls), this._tlsError && (n.je = this._tlsError), this.sendOptions.tag && (n.t = this.sendOptions.tag), this.sendOptions.callbackData && (n.cbd = 1), this.sendOptions.linkedId && (n.lid = this.sendOptions.linkedId.toString()), document.referrer && (n.cr = document.referrer), o(this.components, (function (e) {
        n[e.key] = e.value
      })), n
    }, e
  }();

  function k(e) {
    var t = this.constructor;
    return this.then((function (n) {
      return t.resolve(e()).then((function () {
        return n
      }))
    }), (function (n) {
      return t.resolve(e()).then((function () {
        return t.reject(n)
      }))
    }))
  }

  var b = setTimeout;

  function w(e) {
    return Boolean(e && void 0 !== e.length)
  }

  function S() {
  }

  function P(e) {
    if (!(this instanceof P)) throw new TypeError("Promises must be constructed via new");
    if ("function" != typeof e) throw new TypeError("not a function");
    this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], O(e, this)
  }

  function _(e, t) {
    for (; 3 === e._state;) e = e._value;
    0 !== e._state ? (e._handled = !0, P._immediateFn((function () {
      var n = 1 === e._state ? t.onFulfilled : t.onRejected;
      if (null !== n) {
        var r;
        try {
          r = n(e._value)
        } catch (e) {
          return void A(t.promise, e)
        }
        C(t.promise, r)
      } else (1 === e._state ? C : A)(t.promise, e._value)
    }))) : e._deferreds.push(t)
  }

  function C(e, t) {
    try {
      if (t === e) throw new TypeError("A promise cannot be resolved with itself.");
      if (t && ("object" == typeof t || "function" == typeof t)) {
        var n = t.then;
        if (t instanceof P) return e._state = 3, e._value = t, void T(e);
        if ("function" == typeof n) return void O((r = n, o = t, function () {
          r.apply(o, arguments)
        }), e)
      }
      e._state = 1, e._value = t, T(e)
    } catch (t) {
      A(e, t)
    }
    var r, o
  }

  function A(e, t) {
    e._state = 2, e._value = t, T(e)
  }

  function T(e) {
    2 === e._state && 0 === e._deferreds.length && P._immediateFn((function () {
      e._handled || P._unhandledRejectionFn(e._value)
    }));
    for (var t = 0, n = e._deferreds.length; t < n; t++) _(e, e._deferreds[t]);
    e._deferreds = null
  }

  function E(e, t, n) {
    this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.promise = n
  }

  function O(e, t) {
    var n = !1;
    try {
      e((function (e) {
        n || (n = !0, C(t, e))
      }), (function (e) {
        n || (n = !0, A(t, e))
      }))
    } catch (e) {
      if (n) return;
      n = !0, A(t, e)
    }
  }

  P.prototype.catch = function (e) {
    return this.then(null, e)
  }, P.prototype.then = function (e, t) {
    var n = new this.constructor(S);
    return _(this, new E(e, t, n)), n
  }, P.prototype.finally = k, P.all = function (e) {
    return new P((function (t, n) {
      if (!w(e)) return n(new TypeError("Promise.all accepts an array"));
      var r = Array.prototype.slice.call(e);
      if (0 === r.length) return t([]);
      var o = r.length;

      function i(e, a) {
        try {
          if (a && ("object" == typeof a || "function" == typeof a)) {
            var c = a.then;
            if ("function" == typeof c) return void c.call(a, (function (t) {
              i(e, t)
            }), n)
          }
          r[e] = a, 0 == --o && t(r)
        } catch (e) {
          n(e)
        }
      }

      for (var a = 0; a < r.length; a++) i(a, r[a])
    }))
  }, P.resolve = function (e) {
    return e && "object" == typeof e && e.constructor === P ? e : new P((function (t) {
      t(e)
    }))
  }, P.reject = function (e) {
    return new P((function (t, n) {
      n(e)
    }))
  }, P.race = function (e) {
    return new P((function (t, n) {
      if (!w(e)) return n(new TypeError("Promise.race accepts an array"));
      for (var r = 0, o = e.length; r < o; r++) P.resolve(e[r]).then(t, n)
    }))
  }, P._immediateFn = "function" == typeof setImmediate && function (e) {
    setImmediate(e)
  } || function (e) {
    b(e, 0)
  }, P._unhandledRejectionFn = function (e) {
    "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e)
  };
  var x = function () {
    if ("undefined" != typeof self) return self;
    if ("undefined" != typeof window) return window;
    if ("undefined" != typeof global) return global;
    throw new Error("unable to locate global object")
  }();
  "Promise" in x ? x.Promise.prototype.finally || (x.Promise.prototype.finally = k) : x.Promise = P;
  var I, M, j = function (e, t) {
      e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]], t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]];
      var n = [0, 0, 0, 0];
      return n[3] += e[3] + t[3], n[2] += n[3] >>> 16, n[3] &= 65535, n[2] += e[2] + t[2], n[1] += n[2] >>> 16, n[2] &= 65535, n[1] += e[1] + t[1], n[0] += n[1] >>> 16, n[1] &= 65535, n[0] += e[0] + t[0], n[0] &= 65535, [n[0] << 16 | n[1], n[2] << 16 | n[3]]
    }, D = function (e, t) {
      e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]], t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]];
      var n = [0, 0, 0, 0];
      return n[3] += e[3] * t[3], n[2] += n[3] >>> 16, n[3] &= 65535, n[2] += e[2] * t[3], n[1] += n[2] >>> 16, n[2] &= 65535, n[2] += e[3] * t[2], n[1] += n[2] >>> 16, n[2] &= 65535, n[1] += e[1] * t[3], n[0] += n[1] >>> 16, n[1] &= 65535, n[1] += e[2] * t[2], n[0] += n[1] >>> 16, n[1] &= 65535, n[1] += e[3] * t[1], n[0] += n[1] >>> 16, n[1] &= 65535, n[0] += e[0] * t[3] + e[1] * t[2] + e[2] * t[1] + e[3] * t[0], n[0] &= 65535, [n[0] << 16 | n[1], n[2] << 16 | n[3]]
    }, R = function (e, t) {
      return 32 === (t %= 64) ? [e[1], e[0]] : t < 32 ? [e[0] << t | e[1] >>> 32 - t, e[1] << t | e[0] >>> 32 - t] : (t -= 32, [e[1] << t | e[0] >>> 32 - t, e[0] << t | e[1] >>> 32 - t])
    }, L = function (e, t) {
      return 0 === (t %= 64) ? e : t < 32 ? [e[0] << t | e[1] >>> 32 - t, e[1] << t] : [e[1] << t - 32, 0]
    }, F = function (e, t) {
      return [e[0] ^ t[0], e[1] ^ t[1]]
    }, B = function (e) {
      return e = F(e, [0, e[0] >>> 1]), e = D(e, [4283543511, 3981806797]), e = F(e, [0, e[0] >>> 1]), e = D(e, [3301882366, 444984403]), e = F(e, [0, e[0] >>> 1])
    }, N = function () {
      return function (e, t) {
        t = t || 0;
        for (var n = (e = e || "").length % 16, r = e.length - n, o = [0, t], i = [0, t], a = [0, 0], c = [0, 0], u = [2277735313, 289559509], s = [1291169091, 658871167], f = 0; f < r; f += 16) a = [255 & e.charCodeAt(f + 4) | (255 & e.charCodeAt(f + 5)) << 8 | (255 & e.charCodeAt(f + 6)) << 16 | (255 & e.charCodeAt(f + 7)) << 24, 255 & e.charCodeAt(f) | (255 & e.charCodeAt(f + 1)) << 8 | (255 & e.charCodeAt(f + 2)) << 16 | (255 & e.charCodeAt(f + 3)) << 24], c = [255 & e.charCodeAt(f + 12) | (255 & e.charCodeAt(f + 13)) << 8 | (255 & e.charCodeAt(f + 14)) << 16 | (255 & e.charCodeAt(f + 15)) << 24, 255 & e.charCodeAt(f + 8) | (255 & e.charCodeAt(f + 9)) << 8 | (255 & e.charCodeAt(f + 10)) << 16 | (255 & e.charCodeAt(f + 11)) << 24], a = D(a, u), a = R(a, 31), a = D(a, s), o = F(o, a), o = R(o, 27), o = j(o, i), o = j(D(o, [0, 5]), [0, 1390208809]), c = D(c, s), c = R(c, 33), c = D(c, u), i = F(i, c), i = R(i, 31), i = j(i, o), i = j(D(i, [0, 5]), [0, 944331445]);
        switch (a = [0, 0], c = [0, 0], n) {
          case 15:
            c = F(c, L([0, e.charCodeAt(f + 14)], 48));
          case 14:
            c = F(c, L([0, e.charCodeAt(f + 13)], 40));
          case 13:
            c = F(c, L([0, e.charCodeAt(f + 12)], 32));
          case 12:
            c = F(c, L([0, e.charCodeAt(f + 11)], 24));
          case 11:
            c = F(c, L([0, e.charCodeAt(f + 10)], 16));
          case 10:
            c = F(c, L([0, e.charCodeAt(f + 9)], 8));
          case 9:
            c = F(c, [0, e.charCodeAt(f + 8)]), c = D(c, s), c = R(c, 33), c = D(c, u), i = F(i, c);
          case 8:
            a = F(a, L([0, e.charCodeAt(f + 7)], 56));
          case 7:
            a = F(a, L([0, e.charCodeAt(f + 6)], 48));
          case 6:
            a = F(a, L([0, e.charCodeAt(f + 5)], 40));
          case 5:
            a = F(a, L([0, e.charCodeAt(f + 4)], 32));
          case 4:
            a = F(a, L([0, e.charCodeAt(f + 3)], 24));
          case 3:
            a = F(a, L([0, e.charCodeAt(f + 2)], 16));
          case 2:
            a = F(a, L([0, e.charCodeAt(f + 1)], 8));
          case 1:
            a = F(a, [0, e.charCodeAt(f)]), a = D(a, u), a = R(a, 31), a = D(a, s), o = F(o, a)
        }
        return o = F(o, [0, e.length]), i = F(i, [0, e.length]), o = j(o, i), i = j(i, o), o = B(o), i = B(i), o = j(o, i), i = j(i, o), ("00000000" + (o[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (o[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (i[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (i[1] >>> 0).toString(16)).slice(-8)
      }(I.toDataURL())
    }, H = function () {
      !function () {
        (I = document.createElement("canvas")).width = 240, I.height = 140, I.style.display = "inline";
        var e = I.getContext("2d");
        null != e && (M = e)
      }();
      var e = {winding: !1, data: ""};
      return M && I.toDataURL ? (M.rect(0, 0, 10, 10), M.rect(2, 2, 6, 6), e.winding = !1 === M.isPointInPath(5, 5, "evenodd"), M.textBaseline = "alphabetic", M.fillStyle = "#f60", M.fillRect(125, 1, 62, 20), M.fillStyle = "#069", M.font = "11pt no-real-font-123", M.fillText("Cwm fjordbank 😃 gly", 2, 15), M.fillStyle = "rgba(102, 204, 0, 0.2)", M.font = "18pt Arial", M.fillText("Cwm fjordbank 😃 gly", 4, 45), M.globalCompositeOperation = "multiply", M.fillStyle = "rgb(255,0,255)", M.beginPath(), M.arc(50, 50, 50, 0, 2 * Math.PI, !0), M.closePath(), M.fill(), M.fillStyle = "rgb(0,255,255)", M.beginPath(), M.arc(100, 50, 50, 0, 2 * Math.PI, !0), M.closePath(), M.fill(), M.fillStyle = "rgb(255,255,0)", M.beginPath(), M.arc(75, 100, 50, 0, 2 * Math.PI, !0), M.closePath(), M.fill(), M.fillStyle = "rgb(255,0,255)", M.arc(75, 75, 75, 0, 2 * Math.PI, !0), M.arc(75, 75, 25, 0, 2 * Math.PI, !0), M.fill("evenodd"), e.data = N(), e) : e
    }, U = function () {
      if ("Microsoft Internet Explorer" === navigator.appName || "Netscape" === navigator.appName && /Trident/.test(navigator.userAgent)) return [];
      if (null != navigator.plugins) {
        for (var e = [], t = 0, n = navigator.plugins.length; t < n; t++) navigator.plugins[t] && e.push(navigator.plugins[t]);
        return i(e, (function (e) {
          var t = i(e, (function (e) {
            return {type: e.type, suffixes: e.suffixes}
          }));
          return {name: e.name, description: e.description, mimeTypes: t}
        }))
      }
    }, q = navigator, G = window, W = window, V = document, J = function () {
      return f() && !l() && !(u(["DOMRectList" in t, "RTCPeerConnectionIceEvent" in t, "SVGGeometryElement" in t, "ontransitioncancel" in t]) >= 3)
    }, K = function (e, t, n) {
      (function (e) {
        return e && "function" == typeof e.setValueAtTime
      })(t) && t.setValueAtTime(n, e.currentTime)
    }, z = function (e) {
      return new Promise((function (t, n) {
        e.oncomplete = function (e) {
          return t(e.renderedBuffer)
        };
        var r = 3, o = function () {
          switch (e.startRendering(), e.state) {
            case"running":
              setTimeout((function () {
                return n(Y("timeout"))
              }), 1e3);
              break;
            case"suspended":
              V.hidden || r--, r > 0 ? setTimeout(o, 500) : n(Y("suspended"))
          }
        };
        o()
      }))
    }, X = function (e) {
      for (var t = 0, n = 4500; n < 5e3; ++n) t += Math.abs(e[n]);
      return t
    }, Y = function (e) {
      var t = new Error(e);
      return t.name = e, t
    }, Z = function () {
      var e = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
      if (!e) throw"UserAgent is not Google Chrome";
      return parseInt(e[2], 10)
    }, Q = function () {
      return new Promise((function (e) {
        "storage" in navigator && "estimate" in navigator.storage ? navigator.storage.estimate().then((function (t) {
          var n = t.quota;
          n && n < function () {
            var e = navigator,
              t = e.userAgent && e.userAgent.indexOf("Mac OS") > 0 && -1 == e.userAgent.indexOf("iPhone"),
              n = e.userAgent && e.userAgent.indexOf("CrOS") > 0;
            return t || n ? 3221225472 : 1073741824
          }() ? e(!0) : e(!1)
        })) : e(!1)
      }))
    }, $ = window, ee = function () {
      return l() ? te() : ne()
    }, te = function () {
      return new Promise((function (e) {
        if (!$.safari) return e(!1);
        try {
          $.safari.pushNotification.requestPermission("https://example.com", "private", {}, (function () {
          }))
        } catch (t) {
          ie(t) ? e(!1) : e(!0)
        }
      }))
    }, ne = function () {
      var e, t = document.createElement("iframe");
      return Promise.race([new Promise((function (e) {
        t.style.display = "none", document.body.appendChild(t), t.contentWindow ? t.contentWindow.applicationCache.addEventListener("error", (function () {
          return e(!0)
        })) : e(!1)
      })), (e = 20, new Promise((function (t) {
        setTimeout((function () {
          return t(!1)
        }), e)
      })))]).then((function (e) {
        return t.remove(), e
      }))
    }, re = function () {
      return new Promise((function (e) {
        try {
          $.openDatabase(null, null, null, null)
        } catch (t) {
          return e(!0)
        }
        try {
          return $.localStorage.setItem("test", "1"), $.localStorage.removeItem("test"), e(!1)
        } catch (t) {
          return e(!0)
        }
      }))
    }, oe = function () {
      var e = navigator.userAgent.match(/Version\/([0-9._]+).*Safari/);
      if (!e) throw"UserAgent is not Safari";
      var t = e[1].split(".").map((function (e) {
        return isNaN(parseInt(e)) ? 0 : parseInt(e)
      }));
      return {major: t[0], minor: t[1], patch: t[2]}
    }, ie = function (e) {
      return new RegExp([103, 101, 115, 116, 117, 114, 101].map((function (e) {
        return String.fromCharCode(e)
      })).join("")).test(e)
    }, ae = function () {
      try {
        return s() ? new Promise((function (e) {
          Z() >= 76 ? Q().then((function (t) {
            return e(t)
          })) : window.webkitRequestFileSystem(0, 1, (function () {
            e(!1)
          }), (function () {
            e(!0)
          }))
        })) : f() ? oe().major < 13 ? re() : ee() : "MozAppearance" in document.documentElement.style ? new Promise((function (e) {
          try {
            var t = window.indexedDB.open("test");
            t.onerror = function () {
              return e(!0)
            }, t.onsuccess = function () {
              return e(!1)
            }
          } catch (t) {
            return e(!0)
          }
        })) : function () {
          var e = navigator.userAgent.toLowerCase();
          if (0 === e.indexOf("msie") && 0 === e.indexOf("trident")) return !1;
          var t = /(?:msie|rv:)\s?([\d.]+)/.exec(e);
          if (t && parseInt(t[1], 10) >= 10) return !0;
          var n = /edge/.exec(e);
          return !(!n || "edge" != n[0])
        }() ? new Promise((function (e) {
          try {
            if (!window.indexedDB) return e(!0)
          } catch (t) {
            return e(!0)
          }
          return e(!1)
        })) : Promise.resolve(!1)
      } catch (e) {
        return Promise.reject(e)
      }
    }, ce = function (e) {
      try {
        localStorage.setItem("_inc", e)
      } catch (e) {
      }
    }, ue = function () {
      try {
        var e = localStorage.getItem("_inc");
        return e ? !(!e || "1" != e) : null
      } catch (e) {
        return null
      }
    }, se = navigator, fe = function () {
      var e = [[se.language || se.userLanguage || se.browserLanguage || se.systemLanguage]];
      if (Array.isArray(se.languages)) s() && u([!("MediaSettingsRange" in t), "RTCEncodedAudioFrame" in t, "" + t.Intl == "[object Intl]", "" + t.Reflect == "[object Reflect]"]) >= 3 || e.push(se.languages); else if ("string" == typeof se.languages) {
        var n = se.languages;
        n.length > 0 && e.push(n.split(","))
      }
      return e
    }, le = navigator, de = window, pe = window, he = document, ge = navigator,
    me = [{key: "k1"}, {key: "k2"}, {key: "k3"}, {key: "k4"}, {key: "k5"}, {key: "k6"}, {key: "k7"}, {key: "k8"}, {key: "k9"}, {key: "k10"}, {key: "k11"}, {key: "k12"}, {key: "k13"}, {key: "k14"}, {key: "k15"}, {
      key: "k16",
      default: []
    }, {key: "k17"}, {key: "k18"}, {key: "k19"}, {key: "k20", default: []}, {
      key: "k21",
      default: -4
    }, {key: "k22"}, {key: "k23"}, {key: "k24"}, {key: "k25"}, {key: "k26"}, {key: "k27"}, {key: "k28"}, {key: "k29"}, {key: "k30"}, {key: "k31"}, {key: "k32"}, {key: "k33"}],
    ye = {
      k1: function (e) {
        e(ge.oscpu)
      }, k2: function (e) {
        return e(fe())
      }, k3: function (e) {
        e(pe.screen.colorDepth)
      }, k4: function (e) {
        e(ge.deviceMemory)
      }, k5: function (e) {
        e([parseInt(pe.screen.width.toString()), parseInt(pe.screen.height.toString())].sort().reverse())
      }, k6: function (e) {
        pe.screen.availWidth && pe.screen.availHeight ? e([parseInt(pe.screen.availHeight.toString()), parseInt(pe.screen.availWidth.toString())].sort().reverse()) : e([])
      }, k7: function (e) {
        try {
          var t = parseInt(ge.hardwareConcurrency.toString());
          e(isNaN(t) ? 1 : t)
        } catch (t) {
          e(1)
        }
      }, k8: function (e) {
        var t;
        e((t = (new Date).getFullYear(), Math.max(parseFloat(new Date(t, 0, 1).getTimezoneOffset().toString()), parseFloat(new Date(t, 6, 1).getTimezoneOffset().toString()))))
      }, k9: function (e) {
        e(function () {
          if (de.Intl && de.Intl.DateTimeFormat) return (new de.Intl.DateTimeFormat).resolvedOptions().timeZone
        }())
      }, k10: function (e) {
        var t = 1;
        try {
          t = pe.sessionStorage ? 1 : 0
        } catch (e) {
        }
        e(t)
      }, k11: function (e) {
        var t = 1;
        try {
          t = pe.localStorage ? 1 : 0
        } catch (e) {
        }
        e(t)
      }, k12: function (e) {
        var t = 1;
        try {
          t = pe.indexedDB ? 1 : 0
        } catch (e) {
        }
        e(t)
      }, k13: function (e) {
        e(pe.openDatabase ? 1 : 0)
      }, k14: function (e) {
        e(ge.cpuClass)
      }, k15: function (e) {
        e(ge.platform)
      }, k16: function (e) {
        e(U())
      }, k17: function (e) {
        e(H())
      }, k18: function (e) {
        e(function () {
          var e = document.createElement("div");
          e.innerHTML = "&nbsp;", e.className = "adsbox";
          var t = !1;
          try {
            document.body.appendChild(e), t = 0 == document.getElementsByClassName("adsbox")[0].offsetHeight, document.body.removeChild(e)
          } catch (e) {
            t = !1
          }
          return t ? 1 : 0
        }())
      }, k19: function (e) {
        e(function () {
          var e, t = 0;
          void 0 !== q.maxTouchPoints ? t = parseInt(q.maxTouchPoints) : void 0 !== q.msMaxTouchPoints && (t = q.msMaxTouchPoints);
          try {
            document.createEvent("TouchEvent"), e = !0
          } catch (t) {
            e = !1
          }
          return {maxTouchPoints: t, touchEvent: e, touchStart: "ontouchstart" in G}
        }())
      }, k20: function (e) {
        !function (e) {
          var t = ["monospace", "sans-serif", "serif"],
            n = ["sans-serif-thin", "ARNO PRO", "Agency FB", "Arabic Typesetting", "Arial Unicode MS", "AvantGarde Bk BT", "BankGothic Md BT", "Batang", "Bitstream Vera Sans Mono", "Calibri", "Century", "Century Gothic", "Clarendon", "EUROSTILE", "Franklin Gothic", "Futura Bk BT", "Futura Md BT", "GOTHAM", "Gill Sans", "HELV", "Haettenschweiler", "Helvetica Neue", "Humanst521 BT", "Leelawadee", "Letter Gothic", "Levenim MT", "Lucida Bright", "Lucida Sans", "Menlo", "MS Mincho", "MS Outlook", "MS Reference Specialty", "MS UI Gothic", "MT Extra", "MYRIAD PRO", "Marlett", "Meiryo UI", "Microsoft Uighur", "Minion Pro", "Monotype Corsiva", "PMingLiU", "Pristina", "SCRIPTINA", "Segoe UI Light", "Serifa", "SimHei", "Small Fonts", "Staccato222 BT", "TRAJAN PRO", "Univers CE 55 Medium", "Vrinda", "ZWAdobeF"],
            r = document.getElementsByTagName("body")[0], o = document.createElement("div"),
            i = document.createElement("div"), a = {}, c = {}, u = function () {
              var e = document.createElement("span");
              return e.style.position = "absolute", e.style.left = "-9999px", e.style.fontSize = "48px", e.style.fontStyle = "normal", e.style.fontWeight = "normal", e.style.letterSpacing = "normal", e.style.lineBreak = "auto", e.style.lineHeight = "normal", e.style.textTransform = "none", e.style.textAlign = "left", e.style.textDecoration = "none", e.style.textShadow = "none", e.style.whiteSpace = "normal", e.style.wordBreak = "normal", e.style.wordSpacing = "normal", e.innerHTML = "mmMwWLliI0O&1", e
            }, s = function (e, t) {
              var n = u();
              return n.style.fontFamily = "'" + e + "'," + t, n
            }, f = function (e) {
              for (var n = !1, r = 0; r < t.length; r++) if (n = e[r].offsetWidth !== a[t[r]] || e[r].offsetHeight !== c[t[r]]) return n;
              return n
            }, l = function () {
              for (var e = [], n = 0, r = t.length; n < r; n++) {
                var i = u();
                i.style.fontFamily = t[n], o.appendChild(i), e.push(i)
              }
              return e
            }();
          r.appendChild(o);
          for (var d = 0, p = t.length; d < p; d++) a[t[d]] = l[d].offsetWidth, c[t[d]] = l[d].offsetHeight;
          var h = function () {
            for (var e = {}, r = 0, o = n.length; r < o; r++) {
              for (var a = [], c = 0, u = t.length; c < u; c++) {
                var f = s(n[r], t[c]);
                i.appendChild(f), a.push(f)
              }
              e[n[r]] = a
            }
            return e
          }();
          r.appendChild(i);
          for (var g = [], m = 0, y = n.length; m < y; m++) f(h[n[m]]) && g.push(n[m]);
          r.removeChild(i), r.removeChild(o), e(g)
        }(e)
      }, k21: function (e) {
        !function (e) {
          var t = W.OfflineAudioContext || W.webkitOfflineAudioContext;
          if (!t) return e(-2);
          if (J()) return e(-1);
          var n = new t(1, 44100, 44100), r = n.createOscillator();
          r.type = "triangle", K(n, r.frequency, 1e4);
          var o = n.createDynamicsCompressor();
          K(n, o.threshold, -50), K(n, o.knee, 40), K(n, o.ratio, 12), K(n, o.reduction, -20), K(n, o.attack, 0), K(n, o.release, .25), r.connect(o), o.connect(n.destination), r.start(0), z(n).then((function (t) {
            var n = X(t.getChannelData(0));
            e(n)
          })).catch((function (t) {
            "timeout" === t.name || "suspended" === t.name ? e(-3) : e(-4)
          })).then((function () {
            r.disconnect(), o.disconnect()
          }))
        }(e)
      }, k22: function (e) {
        e(void 0 !== ge.plugins ? 1 : 0)
      }, k23: function (e) {
        e(ge.productSub)
      }, k24: function (e) {
        e(eval.toString().length)
      }, k25: function (e) {
        var t;
        try {
          throw"a"
        } catch (e) {
          try {
            e.toSource(), t = !0
          } catch (e) {
            t = !1
          }
        }
        e(t ? 1 : 0)
      }, k26: function (e) {
        e(void 0 !== ge.webdriver ? 1 : 0)
      }, k27: function (e) {
        e(navigator.vendor)
      }, k28: function (e) {
        e(void 0 !== pe.chrome ? 1 : 0)
      }, k29: function (e) {
        !function (e) {
          if (!le.permissions) return e(void 0);
          le.permissions.query({name: "notifications"}).then((function (t) {
            "undefined" == typeof Notification ? e(void 0) : "denied" === Notification.permission && "prompt" === t.state ? e(!0) : e(!1)
          }))
        }((function (t) {
          e(void 0 === t ? t : t ? 1 : 0)
        }))
      }, k30: function (e) {
        var t = ["webdriver" in pe, "_Selenium_IDE_Recorder" in pe, "callSelenium" in pe, "_selenium" in pe, "__webdriver_script_fn" in he, "__driver_evaluate" in he, "__webdriver_evaluate" in he, "__selenium_evaluate" in he, "__fxdriver_evaluate" in he, "__driver_unwrapped" in he, "__webdriver_unwrapped" in he, "__selenium_unwrapped" in he, "__fxdriver_unwrapped" in he, "__webdriver_script_func" in he, null !== he.documentElement.getAttribute("selenium"), null !== he.documentElement.getAttribute("webdriver"), null !== he.documentElement.getAttribute("driver")];
        o(t, (function (t) {
          t && e(1)
        })), e(0)
      }, k31: function (e) {
        new Promise((function (e) {
          var t = ue();
          null === t ? ae().then((function (t) {
            ce(t ? "1" : "0"), e(t)
          })).catch((function () {
            e(!1)
          })) : e(t)
        })).then((function (t) {
          e(t ? 1 : 0)
        })).catch((function () {
          e(0)
        }))
      }, k32: function (e) {
        try {
          document.cookie = "cookietest=1";
          var t = -1 !== document.cookie.indexOf("cookietest=");
          document.cookie = "cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT", e(t ? 1 : 0)
        } catch (t) {
          e(0)
        }
      }, k33: function (e) {
        e(function () {
          if (!s()) return !1;
          try {
            if ([66, 114, 97, 118, 101].map((function (e) {
              return String.fromCharCode(e)
            })).join("") in t) return !0;
            var e = r.createElement("canvas");
            e.width = 4, e.height = 4, e.style.display = "inline";
            var n = e.toDataURL();
            if ("" == n) return !0;
            for (var o = t.atob(n.split(",")[1]), i = o.length, a = new Uint8Array(i), u = 0; u < i; u++) a[u] = o.charCodeAt(u);
            var f = c(a, [73, 68, 65, 84, 24]);
            if (-1 == f) return !1;
            var l = c(a, [73, 69, 78, 68]);
            return -1 != f && 1321 != a.slice(f + 5, l).reduce((function (e, t) {
              return e + t
            }), 0)
          } catch (e) {
            return !1
          }
        }() ? 1 : 0)
      }
    };

  function ve(e, t) {
    return new Promise((function (n, r) {
      !function (e, t, n) {
        var r = new XMLHttpRequest;
        r.withCredentials = !0, r.open("POST", e, !0), r.setRequestHeader("Content-Type", "text/plain");
        var o = function (e, t) {
          n(e, t)
        };
        r.addEventListener("error", (function () {
          o('{"error":"Connection error"}')
        })), r.addEventListener("timeout", (function () {
          o('{"error":"Timeout"}')
        })), r.addEventListener("abort", (function () {
          o('{"error":"Request aborted"}')
        })), r.onreadystatechange = function () {
          r.readyState == XMLHttpRequest.DONE && (r.status >= 200 && r.status < 300 ? o(void 0, r.responseText) : 404 === r.status || r.status >= 500 ? o(r.statusText) : r.status > 300 && o(r.responseText))
        };
        try {
          r.send(JSON.stringify(t))
        } catch (e) {
          o(e.message)
        }
      }(e, t, (function (e, t) {
        if (e) {
          var o = {};
          try {
            o = JSON.parse(e)
          } catch (t) {
            o.error = e
          }
          return r(o)
        }
        try {
          var i = JSON.parse(t);
          n(i)
        } catch (e) {
          r({error: "Failed to parse the response as a valid JSON"})
        }
      }))
    }))
  }

  var ke = {us: "https://api.sjpf.io", eu: "https://tls-eun1.fpapi.io"}, be = function (e, t) {
    return void 0 === e && (e = "us"), t || ke[e]
  }, we = function () {
    function e(e) {
      this.options = e || {}
    }

    return Object.defineProperty(e.prototype, "ip", {
      get: function () {
        return this.options.ip || "city"
      }, enumerable: !1, configurable: !0
    }), Object.defineProperty(e.prototype, "debug", {
      get: function () {
        return this.options.debug || !1
      }, enumerable: !1, configurable: !0
    }), Object.defineProperty(e.prototype, "timeout", {
      get: function () {
        return this.options.timeout || 1e4
      }, enumerable: !1, configurable: !0
    }), Object.defineProperty(e.prototype, "tag", {
      get: function () {
        if (this.options.tag) return "object" == typeof this.options.tag ? this.options.tag : {tag: this.options.tag}
      }, enumerable: !1, configurable: !0
    }), Object.defineProperty(e.prototype, "linkedId", {
      get: function () {
        return this.options.linkedId
      }, enumerable: !1, configurable: !0
    }), Object.defineProperty(e.prototype, "disableTls", {
      get: function () {
        return this.options.disableTls || !1
      }, enumerable: !1, configurable: !0
    }), Object.defineProperty(e.prototype, "callbackData", {
      get: function () {
        return !!this.options.callbackData
      }, enumerable: !1, configurable: !0
    }), e
  }(), Se = function () {
    function e(e) {
      Pe(e), this.config = e, this.config.timeoutDelay = e.timeoutDelay || 50
    }

    return e.load = function (t) {
      return new Promise((function (n, r) {
        try {
          Pe(t)
        } catch (e) {
          return r(e)
        }
        var o = new e(t);
        window.requestIdleCallback ? window.requestIdleCallback((function () {
          n(o)
        })) : setTimeout((function () {
          n(o)
        }), o.config.timeoutDelay)
      }))
    }, e.prototype.send = function (e) {
      var t = this, n = new we(e);
      return new Promise((function (r, o) {
        d(n.timeout).then((function () {
          var e = {error: "Timeout", reason: n.timeout + "ms elapsed"};
          return o(e)
        }));
        var i, a,
          c = (i = t.config.region, a = t.config.tlsEndpoint, (null == e ? void 0 : e.disableTls) ? Promise.resolve("") : new Promise((function (e, t) {
            var n = new XMLHttpRequest, r = setTimeout((function () {
              t("Timeout"), n.abort()
            }), 5e3);
            n.open("GET", be(i, a)), n.addEventListener("error", (function () {
              return t("Connection error")
            })), n.addEventListener("timeout", (function () {
              return t("Timeout")
            })), n.addEventListener("abort", (function () {
              return t("Abort")
            })), n.onreadystatechange = function () {
              n.readyState == XMLHttpRequest.DONE && (clearTimeout(r), 200 == n.status ? e(n.responseText) : n.status >= 300 && t(n.responseText))
            };
            try {
              n.send()
            } catch (e) {
              clearTimeout(r);
              try {
                var o = e.message.slice(0, 255);
                return t(o)
              } catch (e) {
              }
            }
          }))), u = Date.now();
        !function (e) {
          var t = Date.now(), n = [], r = -1, o = function () {
            if ((r += 1) >= me.length) e(n); else {
              var i = me[r];
              try {
                ye[i.key]((function (e) {
                  var r = Date.now() - t;
                  n.push({key: i.key, value: e, duration: r}), t = Date.now(), o()
                }))
              } catch (e) {
                n.push({key: i.key, value: i.default}), o()
              }
            }
          };
          o()
        }((function (e) {
          var i = Date.now() - u, a = new v(n, t.config, i, e);
          c.then((function (e) {
            return a.tls = e
          })).catch((function (e) {
            return a.tlsError = e
          })).finally((function () {
            ve(Ce(t.config), a.buildRaw(t.config.cookieKey)).then((function (e) {
              if (e.error) return o(e);
              h(e.visitorId, t.config.cookieDomain, t.config.cookieKey), r(_e(e, n.tag))
            })).catch((function (e) {
              o(_e(e, n.tag))
            }))
          }))
        }))
      }))
    }, e
  }(), Pe = function (e) {
    if (!e) throw new Error("config cannot be empty");
    if (!e.client) throw new Error("config.client cannot be empty");
    if ("" == e.client) throw new Error("config.client cannot be empty")
  }, _e = function (e, t) {
    return t && (e.tag = t), e
  }, Ce = function (e) {
    if (e.endpoint) return e.endpoint;
    var t = "api.fpjs.io";
    return e.region && "us" != e.region && (t = e.region + "." + t), "https://" + t
  }, Ae = function () {
    function e(e) {
      this.properties = e
    }

    return Object.defineProperty(e.prototype, "client", {
      get: function () {
        return this.properties.client
      }, enumerable: !1, configurable: !0
    }), Object.defineProperty(e.prototype, "autoSend", {
      get: function () {
        return this.properties.autoSend
      }, enumerable: !1, configurable: !0
    }), Object.defineProperty(e.prototype, "loaded", {
      get: function () {
        return (e = this.properties.loaded) && e.constructor && e.call && e.apply ? this.properties.loaded : function (e) {
        };
        var e
      }, enumerable: !1, configurable: !0
    }), Object.defineProperty(e.prototype, "region", {
      get: function () {
        return this.properties.region
      }, enumerable: !1, configurable: !0
    }), Object.defineProperty(e.prototype, "endpoint", {
      get: function () {
        return this.properties.endpoint
      }, enumerable: !1, configurable: !0
    }), Object.defineProperty(e.prototype, "tlsEndpoint", {
      get: function () {
        return this.properties.tlsEndpoint
      }, enumerable: !1, configurable: !0
    }), Object.defineProperty(e.prototype, "cookieDomain", {
      get: function () {
        return this.properties.cookieDomain
      }, enumerable: !1, configurable: !0
    }), Object.defineProperty(e.prototype, "cookieKey", {
      get: function () {
        return this.properties.cookieKey
      }, enumerable: !1, configurable: !0
    }), e.prototype.isValid = function () {
      return this.client && this.client.toString().length >= 8
    }, e
  }(), Te = function () {
    var e = {};
    if (window.fpLayer && window.fpLayer.length) for (var t = 0; t < window.fpLayer.length; t++) {
      var n = window.fpLayer[t];
      if ("config" === n[0]) {
        var r = n[1], o = n[2];
        e[r] = o
      }
    }
    return new Ae(e)
  }(), Ee = Se.load(Te);
  Ee.then((function (e) {
    Te.loaded(e), Te.autoSend && e.send()
  })).catch((function (e) {
    Te.autoSend && (a("Configuration snippet is missing or invalid"), a(e))
  })), e.NotAvailable = "n/a", e.TimeoutError = "Timeout", e.send = function (e) {
    return e && e.debug && a("Using the global FP object is deprecated and will be removed in v3 of the agent."), new Promise((function (t, n) {
      Ee.then((function (r) {
        r.send(e).then((function (e) {
          return t(e)
        })).catch((function (e) {
          return n(e)
        }))
      })).catch((function (e) {
        return n(e)
      }))
    }))
  }, Object.defineProperty(e, "__esModule", {value: !0})
}));
