function ArcTileImageryProvider(t) {
	if (!Cesium.defined(t)) throw new DeveloperError("options is required.");
	if (!Cesium.defined(t.url)) throw new DeveloperError("options.url is required.");
	if (this._url = t.url + "/_alllayers/", this._isUpper = Cesium.defaultValue(t.isUpper, !0), this._imgType = Cesium.defaultValue(t.imgType, ".jpg"), this._subdomains = t.subdomains, Cesium.isArray(this._subdomains) ? this._subdomains = this._subdomains.slice() : Cesium.defined(this._subdomains) && this._subdomains.length > 0 ? this._subdomains = this._subdomains.split("") : this._subdomains = ["a", "b", "c"], this._tileWidth = Cesium.defaultValue(t.tileWidth, 256), this._tileHeight = Cesium.defaultValue(t.tileHeight, 256), this._minimumLevel = Cesium.defaultValue(t.minimumLevel, 0), this._maximumLevel = t.maximumLevel, t.rectangle && t.rectangle.xmin && t.rectangle.xmax && t.rectangle.ymin && t.rectangle.ymax) {
		var e = t.rectangle.xmin,
			i = t.rectangle.xmax,
			n = t.rectangle.ymin,
			r = t.rectangle.ymax;
		t.rectangle = Cesium.Rectangle.fromDegrees(e, n, i, r)
	}
	this._tilingScheme = Cesium.defaultValue(t.tilingScheme, new Cesium.WebMercatorTilingScheme({
		ellipsoid: t.ellipsoid
	})), this._rectangle = Cesium.defaultValue(t.rectangle, this._tilingScheme.rectangle), this._rectangle = Cesium.Rectangle.intersection(this._rectangle, this._tilingScheme.rectangle), this._hasAlphaChannel = Cesium.defaultValue(t.hasAlphaChannel, !0), this._credit = void 0, this._ready = !0
}!
function(t, e) {
	"use strict";
	"function" == typeof define && define.amd && define([], e), Cesium.viewerCesiumNavigationMixin = e()
}("undefined" != typeof window ? window : "undefined" != typeof self ? self : this, function() {
	var t, e, i;
	return function(n) {
		function r(t, e) {
			return b.call(t, e)
		}
		function o(t, e) {
			var i, n, r, o, a, s, l, u, c, h, d, p, f = e && e.split("/"),
				m = _.map,
				g = m && m["*"] || {};
			if (t) {
				for (t = t.split("/"), a = t.length - 1, _.nodeIdCompat && C.test(t[a]) && (t[a] = t[a].replace(C, "")), "." === t[0].charAt(0) && f && (p = f.slice(0, f.length - 1), t = p.concat(t)), c = 0; c < t.length; c++) if (d = t[c], "." === d) t.splice(c, 1), c -= 1;
				else if (".." === d) {
					if (0 === c || 1 === c && ".." === t[2] || ".." === t[c - 1]) continue;
					c > 0 && (t.splice(c - 1, 2), c -= 2)
				}
				t = t.join("/")
			}
			if ((f || g) && m) {
				for (i = t.split("/"), c = i.length; c > 0; c -= 1) {
					if (n = i.slice(0, c).join("/"), f) for (h = f.length; h > 0; h -= 1) if (r = m[f.slice(0, h).join("/")], r && (r = r[n])) {
						o = r, s = c;
						break
					}
					if (o) break;
					!l && g && g[n] && (l = g[n], u = c)
				}!o && l && (o = l, s = u), o && (i.splice(0, s, o), t = i.join("/"))
			}
			return t
		}
		function a(t, e) {
			return function() {
				var i = w.call(arguments, 0);
				return "string" != typeof i[0] && 1 === i.length && i.push(null), p.apply(n, i.concat([t, e]))
			}
		}
		function s(t) {
			return function(e) {
				return o(e, t)
			}
		}
		function l(t) {
			return function(e) {
				g[t] = e
			}
		}
		function u(t) {
			if (r(v, t)) {
				var e = v[t];
				delete v[t], y[t] = !0, d.apply(n, e)
			}
			if (!r(g, t) && !r(y, t)) throw new Error("No " + t);
			return g[t]
		}
		function c(t) {
			var e, i = t ? t.indexOf("!") : -1;
			return i > -1 && (e = t.substring(0, i), t = t.substring(i + 1, t.length)), [e, t]
		}
		function h(t) {
			return function() {
				return _ && _.config && _.config[t] || {}
			}
		}
		var d, p, f, m, g = {},
			v = {},
			_ = {},
			y = {},
			b = Object.prototype.hasOwnProperty,
			w = [].slice,
			C = /\.js$/;
		f = function(t, e) {
			var i, n = c(t),
				r = n[0];
			return t = n[1], r && (r = o(r, e), i = u(r)), r ? t = i && i.normalize ? i.normalize(t, s(e)) : o(t, e) : (t = o(t, e), n = c(t), r = n[0], t = n[1], r && (i = u(r))), {
				f: r ? r + "!" + t : t,
				n: t,
				pr: r,
				p: i
			}
		}, m = {
			require: function(t) {
				return a(t)
			},
			exports: function(t) {
				var e = g[t];
				return "undefined" != typeof e ? e : g[t] = {}
			},
			module: function(t) {
				return {
					id: t,
					uri: "",
					exports: g[t],
					config: h(t)
				}
			}
		}, d = function(t, e, i, o) {
			var s, c, h, d, p, _, b = [],
				w = typeof i;
			if (o = o || t, "undefined" === w || "function" === w) {
				for (e = !e.length && i.length ? ["require", "exports", "module"] : e, p = 0; p < e.length; p += 1) if (d = f(e[p], o), c = d.f, "require" === c) b[p] = m.require(t);
				else if ("exports" === c) b[p] = m.exports(t), _ = !0;
				else if ("module" === c) s = b[p] = m.module(t);
				else if (r(g, c) || r(v, c) || r(y, c)) b[p] = u(c);
				else {
					if (!d.p) throw new Error(t + " missing " + c);
					d.p.load(d.n, a(o, !0), l(c), {}), b[p] = g[c]
				}
				h = i ? i.apply(g[t], b) : void 0, t && (s && s.exports !== n && s.exports !== g[t] ? g[t] = s.exports : h === n && _ || (g[t] = h))
			} else t && (g[t] = i)
		}, t = e = p = function(t, e, i, r, o) {
			if ("string" == typeof t) return m[t] ? m[t](e) : u(f(t, e).f);
			if (!t.splice) {
				if (_ = t, _.deps && p(_.deps, _.callback), !e) return;
				e.splice ? (t = e, e = i, i = null) : t = n
			}
			return e = e ||
			function() {}, "function" == typeof i && (i = r, r = o), r ? d(n, t, e, i) : setTimeout(function() {
				d(n, t, e, i)
			}, 4), p
		}, p.config = function(t) {
			return p(t)
		}, t._defined = g, i = function(t, e, i) {
			if ("string" != typeof t) throw new Error("See almond README: incorrect module build, no module name");
			e.splice || (i = e, e = []), r(g, t) || r(v, t) || (v[t] = [t, e, i])
		}, i.amd = {
			jQuery: !0
		}
	}(), i("almond", function() {}), function() {
		!
		function(t) {
			var e = this || (0, eval)("this"),
				n = e.document,
				r = e.navigator,
				o = e.jQuery,
				a = e.JSON;
			!
			function(t) {
				"function" == typeof i && i.amd ? i("knockout", ["exports", "require"], t) : t("object" == typeof exports && "object" == typeof module ? module.exports || exports : e.ko = {})
			}(function(i, s) {
				function l(t, e) {
					return (null === t || typeof t in g) && t === e
				}
				function u(e, i) {
					var n;
					return function() {
						n || (n = m.a.setTimeout(function() {
							n = t, e()
						}, i))
					}
				}
				function c(t, e) {
					var i;
					return function() {
						clearTimeout(i), i = m.a.setTimeout(t, e)
					}
				}
				function h(t, e) {
					e && e !== v ? "beforeChange" === e ? this.Kb(t) : this.Ha(t, e) : this.Lb(t)
				}
				function d(t, e) {
					null !== e && e.k && e.k()
				}
				function p(t, e) {
					var i = this.Hc,
						n = i[C];
					n.R || (this.lb && this.Ma[e] ? (i.Pb(e, t, this.Ma[e]), this.Ma[e] = null, --this.lb) : n.r[e] || i.Pb(e, t, n.s ? {
						ia: t
					} : i.uc(t)))
				}
				function f(t, e, i, n) {
					m.d[t] = {
						init: function(t, r, o, a, s) {
							var l, u;
							return m.m(function() {
								var o = m.a.c(r()),
									a = !i != !o,
									c = !u;
								(c || e || a !== l) && (c && m.va.Aa() && (u = m.a.ua(m.f.childNodes(t), !0)), a ? (c || m.f.da(t, m.a.ua(u)), m.eb(n ? n(s, o) : s, t)) : m.f.xa(t), l = a)
							}, null, {
								i: t
							}), {
								controlsDescendantBindings: !0
							}
						}
					}, m.h.ta[t] = !1, m.f.Z[t] = !0
				}
				var m = "undefined" != typeof i ? i : {};
				m.b = function(t, e) {
					for (var i = t.split("."), n = m, r = 0; r < i.length - 1; r++) n = n[i[r]];
					n[i[i.length - 1]] = e
				}, m.G = function(t, e, i) {
					t[e] = i
				}, m.version = "3.4.0", m.b("version", m.version), m.options = {
					deferUpdates: !1,
					useOnlyNativeEvents: !1
				}, m.a = function() {
					function i(t, e) {
						for (var i in t) t.hasOwnProperty(i) && e(i, t[i])
					}
					function s(t, e) {
						if (e) for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
						return t
					}
					function l(t, e) {
						return t.__proto__ = e, t
					}
					function u(t, e, i, n) {
						var r = t[e].match(v) || [];
						m.a.q(i.match(v), function(t) {
							m.a.pa(r, t, n)
						}), t[e] = r.join(" ")
					}
					var c = {
						__proto__: []
					}
					instanceof Array, h = "function" == typeof Symbol, d = {}, p = {};
					d[r && /Firefox\/2/i.test(r.userAgent) ? "KeyboardEvent" : "UIEvents"] = ["keyup", "keydown", "keypress"], d.MouseEvents = "click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave".split(" "), i(d, function(t, e) {
						if (e.length) for (var i = 0, n = e.length; i < n; i++) p[e[i]] = t
					});
					var f = {
						propertychange: !0
					},
						g = n &&
					function() {
						for (var e = 3, i = n.createElement("div"), r = i.getElementsByTagName("i"); i.innerHTML = "<!--[if gt IE " + ++e + "]><i></i><![endif]-->", r[0];);
						return 4 < e ? e : t
					}(), v = /\S+/g;
					return {
						cc: ["authenticity_token", /^__RequestVerificationToken(_.*)?$/],
						q: function(t, e) {
							for (var i = 0, n = t.length; i < n; i++) e(t[i], i)
						},
						o: function(t, e) {
							if ("function" == typeof Array.prototype.indexOf) return Array.prototype.indexOf.call(t, e);
							for (var i = 0, n = t.length; i < n; i++) if (t[i] === e) return i;
							return -1
						},
						Sb: function(t, e, i) {
							for (var n = 0, r = t.length; n < r; n++) if (e.call(i, t[n], n)) return t[n];
							return null
						},
						La: function(t, e) {
							var i = m.a.o(t, e);
							0 < i ? t.splice(i, 1) : 0 === i && t.shift()
						},
						Tb: function(t) {
							t = t || [];
							for (var e = [], i = 0, n = t.length; i < n; i++) 0 > m.a.o(e, t[i]) && e.push(t[i]);
							return e
						},
						fb: function(t, e) {
							t = t || [];
							for (var i = [], n = 0, r = t.length; n < r; n++) i.push(e(t[n], n));
							return i
						},
						Ka: function(t, e) {
							t = t || [];
							for (var i = [], n = 0, r = t.length; n < r; n++) e(t[n], n) && i.push(t[n]);
							return i
						},
						ra: function(t, e) {
							if (e instanceof Array) t.push.apply(t, e);
							else for (var i = 0, n = e.length; i < n; i++) t.push(e[i]);
							return t
						},
						pa: function(t, e, i) {
							var n = m.a.o(m.a.zb(t), e);
							0 > n ? i && t.push(e) : i || t.splice(n, 1)
						},
						ka: c,
						extend: s,
						Xa: l,
						Ya: c ? l : s,
						D: i,
						Ca: function(t, e) {
							if (!t) return t;
							var i, n = {};
							for (i in t) t.hasOwnProperty(i) && (n[i] = e(t[i], i, t));
							return n
						},
						ob: function(t) {
							for (; t.firstChild;) m.removeNode(t.firstChild)
						},
						jc: function(t) {
							t = m.a.V(t);
							for (var e = (t[0] && t[0].ownerDocument || n).createElement("div"), i = 0, r = t.length; i < r; i++) e.appendChild(m.$(t[i]));
							return e
						},
						ua: function(t, e) {
							for (var i = 0, n = t.length, r = []; i < n; i++) {
								var o = t[i].cloneNode(!0);
								r.push(e ? m.$(o) : o)
							}
							return r
						},
						da: function(t, e) {
							if (m.a.ob(t), e) for (var i = 0, n = e.length; i < n; i++) t.appendChild(e[i])
						},
						qc: function(t, e) {
							var i = t.nodeType ? [t] : t;
							if (0 < i.length) {
								for (var n = i[0], r = n.parentNode, o = 0, a = e.length; o < a; o++) r.insertBefore(e[o], n);
								for (o = 0, a = i.length; o < a; o++) m.removeNode(i[o])
							}
						},
						za: function(t, e) {
							if (t.length) {
								for (e = 8 === e.nodeType && e.parentNode || e; t.length && t[0].parentNode !== e;) t.splice(0, 1);
								for (; 1 < t.length && t[t.length - 1].parentNode !== e;) t.length--;
								if (1 < t.length) {
									var i = t[0],
										n = t[t.length - 1];
									for (t.length = 0; i !== n;) t.push(i), i = i.nextSibling;
									t.push(n)
								}
							}
							return t
						},
						sc: function(t, e) {
							7 > g ? t.setAttribute("selected", e) : t.selected = e
						},
						$a: function(e) {
							return null === e || e === t ? "" : e.trim ? e.trim() : e.toString().replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
						},
						nd: function(t, e) {
							return t = t || "", !(e.length > t.length) && t.substring(0, e.length) === e
						},
						Mc: function(t, e) {
							if (t === e) return !0;
							if (11 === t.nodeType) return !1;
							if (e.contains) return e.contains(3 === t.nodeType ? t.parentNode : t);
							if (e.compareDocumentPosition) return 16 == (16 & e.compareDocumentPosition(t));
							for (; t && t != e;) t = t.parentNode;
							return !!t
						},
						nb: function(t) {
							return m.a.Mc(t, t.ownerDocument.documentElement)
						},
						Qb: function(t) {
							return !!m.a.Sb(t, m.a.nb)
						},
						A: function(t) {
							return t && t.tagName && t.tagName.toLowerCase()
						},
						Wb: function(t) {
							return m.onError ?
							function() {
								try {
									return t.apply(this, arguments)
								} catch (e) {
									throw m.onError && m.onError(e), e
								}
							} : t
						},
						setTimeout: function(t, e) {
							return setTimeout(m.a.Wb(t), e)
						},
						$b: function(t) {
							setTimeout(function() {
								throw m.onError && m.onError(t), t
							}, 0)
						},
						p: function(t, e, i) {
							var n = m.a.Wb(i);
							if (i = g && f[e], m.options.useOnlyNativeEvents || i || !o) if (i || "function" != typeof t.addEventListener) {
								if ("undefined" == typeof t.attachEvent) throw Error("Browser doesn't support addEventListener or attachEvent");
								var r = function(e) {
										n.call(t, e)
									},
									a = "on" + e;
								t.attachEvent(a, r), m.a.F.oa(t, function() {
									t.detachEvent(a, r)
								})
							} else t.addEventListener(e, n, !1);
							else o(t).bind(e, n)
						},
						Da: function(t, i) {
							if (!t || !t.nodeType) throw Error("element must be a DOM node when calling triggerEvent");
							var r;
							if ("input" === m.a.A(t) && t.type && "click" == i.toLowerCase() ? (r = t.type, r = "checkbox" == r || "radio" == r) : r = !1, m.options.useOnlyNativeEvents || !o || r) if ("function" == typeof n.createEvent) {
								if ("function" != typeof t.dispatchEvent) throw Error("The supplied element doesn't support dispatchEvent");
								r = n.createEvent(p[i] || "HTMLEvents"), r.initEvent(i, !0, !0, e, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, t), t.dispatchEvent(r)
							} else if (r && t.click) t.click();
							else {
								if ("undefined" == typeof t.fireEvent) throw Error("Browser doesn't support triggering events");
								t.fireEvent("on" + i)
							} else o(t).trigger(i)
						},
						c: function(t) {
							return m.H(t) ? t() : t
						},
						zb: function(t) {
							return m.H(t) ? t.t() : t
						},
						bb: function(t, e, i) {
							var n;
							e && ("object" == typeof t.classList ? (n = t.classList[i ? "add" : "remove"], m.a.q(e.match(v), function(e) {
								n.call(t.classList, e)
							})) : "string" == typeof t.className.baseVal ? u(t.className, "baseVal", e, i) : u(t, "className", e, i))
						},
						Za: function(e, i) {
							var n = m.a.c(i);
							null !== n && n !== t || (n = "");
							var r = m.f.firstChild(e);
							!r || 3 != r.nodeType || m.f.nextSibling(r) ? m.f.da(e, [e.ownerDocument.createTextNode(n)]) : r.data = n, m.a.Rc(e)
						},
						rc: function(t, e) {
							if (t.name = e, 7 >= g) try {
								t.mergeAttributes(n.createElement("<input name='" + t.name + "'/>"), !1)
							} catch (i) {}
						},
						Rc: function(t) {
							9 <= g && (t = 1 == t.nodeType ? t : t.parentNode, t.style && (t.style.zoom = t.style.zoom))
						},
						Nc: function(t) {
							if (g) {
								var e = t.style.width;
								t.style.width = 0, t.style.width = e
							}
						},
						hd: function(t, e) {
							t = m.a.c(t), e = m.a.c(e);
							for (var i = [], n = t; n <= e; n++) i.push(n);
							return i
						},
						V: function(t) {
							for (var e = [], i = 0, n = t.length; i < n; i++) e.push(t[i]);
							return e
						},
						Yb: function(t) {
							return h ? Symbol(t) : t
						},
						rd: 6 === g,
						sd: 7 === g,
						C: g,
						ec: function(t, e) {
							for (var i = m.a.V(t.getElementsByTagName("input")).concat(m.a.V(t.getElementsByTagName("textarea"))), n = "string" == typeof e ?
							function(t) {
								return t.name === e
							} : function(t) {
								return e.test(t.name)
							}, r = [], o = i.length - 1; 0 <= o; o--) n(i[o]) && r.push(i[o]);
							return r
						},
						ed: function(t) {
							return "string" == typeof t && (t = m.a.$a(t)) ? a && a.parse ? a.parse(t) : new Function("return " + t)() : null
						},
						Eb: function(t, e, i) {
							if (!a || !a.stringify) throw Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js");
							return a.stringify(m.a.c(t), e, i)
						},
						fd: function(t, e, r) {
							r = r || {};
							var o = r.params || {},
								a = r.includeFields || this.cc,
								s = t;
							if ("object" == typeof t && "form" === m.a.A(t)) for (var s = t.action, l = a.length - 1; 0 <= l; l--) for (var u = m.a.ec(t, a[l]), c = u.length - 1; 0 <= c; c--) o[u[c].name] = u[c].value;
							e = m.a.c(e);
							var h = n.createElement("form");
							h.style.display = "none", h.action = s, h.method = "post";
							for (var d in e) t = n.createElement("input"), t.type = "hidden", t.name = d, t.value = m.a.Eb(m.a.c(e[d])), h.appendChild(t);
							i(o, function(t, e) {
								var i = n.createElement("input");
								i.type = "hidden", i.name = t, i.value = e, h.appendChild(i)
							}), n.body.appendChild(h), r.submitter ? r.submitter(h) : h.submit(), setTimeout(function() {
								h.parentNode.removeChild(h)
							}, 0)
						}
					}
				}(), m.b("utils", m.a), m.b("utils.arrayForEach", m.a.q), m.b("utils.arrayFirst", m.a.Sb), m.b("utils.arrayFilter", m.a.Ka), m.b("utils.arrayGetDistinctValues", m.a.Tb), m.b("utils.arrayIndexOf", m.a.o), m.b("utils.arrayMap", m.a.fb), m.b("utils.arrayPushAll", m.a.ra), m.b("utils.arrayRemoveItem", m.a.La), m.b("utils.extend", m.a.extend), m.b("utils.fieldsIncludedWithJsonPost", m.a.cc), m.b("utils.getFormFields", m.a.ec), m.b("utils.peekObservable", m.a.zb), m.b("utils.postJson", m.a.fd), m.b("utils.parseJson", m.a.ed), m.b("utils.registerEventHandler", m.a.p), m.b("utils.stringifyJson", m.a.Eb), m.b("utils.range", m.a.hd), m.b("utils.toggleDomNodeCssClass", m.a.bb), m.b("utils.triggerEvent", m.a.Da), m.b("utils.unwrapObservable", m.a.c), m.b("utils.objectForEach", m.a.D), m.b("utils.addOrRemoveItem", m.a.pa), m.b("utils.setTextContent", m.a.Za), m.b("unwrap", m.a.c), Function.prototype.bind || (Function.prototype.bind = function(t) {
					var e = this;
					if (1 === arguments.length) return function() {
						return e.apply(t, arguments)
					};
					var i = Array.prototype.slice.call(arguments, 1);
					return function() {
						var n = i.slice(0);
						return n.push.apply(n, arguments), e.apply(t, n)
					}
				}), m.a.e = new function() {
					function e(e, o) {
						var a = e[n];
						if (!a || "null" === a || !r[a]) {
							if (!o) return t;
							a = e[n] = "ko" + i++, r[a] = {}
						}
						return r[a]
					}
					var i = 0,
						n = "__ko__" + (new Date).getTime(),
						r = {};
					return {
						get: function(i, n) {
							var r = e(i, !1);
							return r === t ? t : r[n]
						},
						set: function(i, n, r) {
							r === t && e(i, !1) === t || (e(i, !0)[n] = r)
						},
						clear: function(t) {
							var e = t[n];
							return !!e && (delete r[e], t[n] = null, !0)
						},
						I: function() {
							return i+++n
						}
					}
				}, m.b("utils.domData", m.a.e), m.b("utils.domData.clear", m.a.e.clear), m.a.F = new function() {
					function e(e, i) {
						var r = m.a.e.get(e, n);
						return r === t && i && (r = [], m.a.e.set(e, n, r)), r
					}
					function i(t) {
						var n = e(t, !1);
						if (n) for (var n = n.slice(0), r = 0; r < n.length; r++) n[r](t);
						if (m.a.e.clear(t), m.a.F.cleanExternalData(t), a[t.nodeType]) for (n = t.firstChild; t = n;) n = t.nextSibling, 8 === t.nodeType && i(t)
					}
					var n = m.a.e.I(),
						r = {
							1: !0,
							8: !0,
							9: !0
						},
						a = {
							1: !0,
							9: !0
						};
					return {
						oa: function(t, i) {
							if ("function" != typeof i) throw Error("Callback must be a function");
							e(t, !0).push(i)
						},
						pc: function(i, r) {
							var o = e(i, !1);
							o && (m.a.La(o, r), 0 == o.length && m.a.e.set(i, n, t))
						},
						$: function(t) {
							if (r[t.nodeType] && (i(t), a[t.nodeType])) {
								var e = [];
								m.a.ra(e, t.getElementsByTagName("*"));
								for (var n = 0, o = e.length; n < o; n++) i(e[n])
							}
							return t
						},
						removeNode: function(t) {
							m.$(t), t.parentNode && t.parentNode.removeChild(t)
						},
						cleanExternalData: function(t) {
							o && "function" == typeof o.cleanData && o.cleanData([t])
						}
					}
				}, m.$ = m.a.F.$, m.removeNode = m.a.F.removeNode, m.b("cleanNode", m.$), m.b("removeNode", m.removeNode), m.b("utils.domNodeDisposal", m.a.F), m.b("utils.domNodeDisposal.addDisposeCallback", m.a.F.oa), m.b("utils.domNodeDisposal.removeDisposeCallback", m.a.F.pc), function() {
					var i = [0, "", ""],
						r = [1, "<table>", "</table>"],
						a = [3, "<table><tbody><tr>", "</tr></tbody></table>"],
						s = [1, "<select multiple='multiple'>", "</select>"],
						l = {
							thead: r,
							tbody: r,
							tfoot: r,
							tr: [2, "<table><tbody>", "</tbody></table>"],
							td: a,
							th: a,
							option: s,
							optgroup: s
						},
						u = 8 >= m.a.C;
					m.a.ma = function(t, r) {
						var a;
						if (o) {
							if (o.parseHTML) a = o.parseHTML(t, r) || [];
							else if ((a = o.clean([t], r)) && a[0]) {
								for (var s = a[0]; s.parentNode && 11 !== s.parentNode.nodeType;) s = s.parentNode;
								s.parentNode && s.parentNode.removeChild(s)
							}
						} else {
							(a = r) || (a = n);
							var c, s = a.parentWindow || a.defaultView || e,
								h = m.a.$a(t).toLowerCase(),
								d = a.createElement("div");
							for (c = (h = h.match(/^<([a-z]+)[ >]/)) && l[h[1]] || i, h = c[0], c = "ignored<div>" + c[1] + t + c[2] + "</div>", "function" == typeof s.innerShiv ? d.appendChild(s.innerShiv(c)) : (u && a.appendChild(d), d.innerHTML = c, u && d.parentNode.removeChild(d)); h--;) d = d.lastChild;
							a = m.a.V(d.lastChild.childNodes)
						}
						return a
					}, m.a.Cb = function(e, i) {
						if (m.a.ob(e), i = m.a.c(i), null !== i && i !== t) if ("string" != typeof i && (i = i.toString()), o) o(e).html(i);
						else for (var n = m.a.ma(i, e.ownerDocument), r = 0; r < n.length; r++) e.appendChild(n[r])
					}
				}(), m.b("utils.parseHtmlFragment", m.a.ma), m.b("utils.setHtml", m.a.Cb), m.M = function() {
					function e(t, i) {
						if (t) if (8 == t.nodeType) {
							var n = m.M.lc(t.nodeValue);
							null != n && i.push({
								Lc: t,
								cd: n
							})
						} else if (1 == t.nodeType) for (var n = 0, r = t.childNodes, o = r.length; n < o; n++) e(r[n], i)
					}
					var i = {};
					return {
						wb: function(t) {
							if ("function" != typeof t) throw Error("You can only pass a function to ko.memoization.memoize()");
							var e = (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1) + (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1);
							return i[e] = t, "<!--[ko_memo:" + e + "]-->"
						},
						xc: function(e, n) {
							var r = i[e];
							if (r === t) throw Error("Couldn't find any memo with ID " + e + ". Perhaps it's already been unmemoized.");
							try {
								return r.apply(null, n || []), !0
							} finally {
								delete i[e]
							}
						},
						yc: function(t, i) {
							var n = [];
							e(t, n);
							for (var r = 0, o = n.length; r < o; r++) {
								var a = n[r].Lc,
									s = [a];
								i && m.a.ra(s, i), m.M.xc(n[r].cd, s), a.nodeValue = "", a.parentNode && a.parentNode.removeChild(a)
							}
						},
						lc: function(t) {
							return (t = t.match(/^\[ko_memo\:(.*?)\]$/)) ? t[1] : null
						}
					}
				}(), m.b("memoization", m.M), m.b("memoization.memoize", m.M.wb), m.b("memoization.unmemoize", m.M.xc), m.b("memoization.parseMemoText", m.M.lc), m.b("memoization.unmemoizeDomNodeAndDescendants", m.M.yc), m.Y = function() {
					function t() {
						if (o) for (var t, e = o, i = 0; s < o;) if (t = r[s++]) {
							if (s > e) {
								if (5e3 <= ++i) {
									s = o, m.a.$b(Error("'Too much recursion' after processing " + i + " task groups."));
									break
								}
								e = o
							}
							try {
								t()
							} catch (n) {
								m.a.$b(n)
							}
						}
					}
					function i() {
						t(), s = o = r.length = 0
					}
					var r = [],
						o = 0,
						a = 1,
						s = 0;
					return {
						scheduler: e.MutationObserver ?
						function(t) {
							var e = n.createElement("div");
							return new MutationObserver(t).observe(e, {
								attributes: !0
							}), function() {
								e.classList.toggle("foo")
							}
						}(i) : n && "onreadystatechange" in n.createElement("script") ?
						function(t) {
							var e = n.createElement("script");
							e.onreadystatechange = function() {
								e.onreadystatechange = null, n.documentElement.removeChild(e), e = null, t()
							}, n.documentElement.appendChild(e)
						} : function(t) {
							setTimeout(t, 0)
						},
						Wa: function(t) {
							return o || m.Y.scheduler(i), r[o++] = t, a++
						},
						cancel: function(t) {
							t -= a - o, t >= s && t < o && (r[t] = null)
						},
						resetForTesting: function() {
							var t = o - s;
							return s = o = r.length = 0, t
						},
						md: t
					}
				}(), m.b("tasks", m.Y), m.b("tasks.schedule", m.Y.Wa), m.b("tasks.runEarly", m.Y.md), m.ya = {
					throttle: function(t, e) {
						t.throttleEvaluation = e;
						var i = null;
						return m.B({
							read: t,
							write: function(n) {
								clearTimeout(i), i = m.a.setTimeout(function() {
									t(n)
								}, e)
							}
						})
					},
					rateLimit: function(t, e) {
						var i, n, r;
						"number" == typeof e ? i = e : (i = e.timeout, n = e.method), t.cb = !1, r = "notifyWhenChangesStop" == n ? c : u, t.Ta(function(t) {
							return r(t, i)
						})
					},
					deferred: function(e, i) {
						if (!0 !== i) throw Error("The 'deferred' extender only accepts the value 'true', because it is not supported to turn deferral off once enabled.");
						e.cb || (e.cb = !0, e.Ta(function(i) {
							var n;
							return function() {
								m.Y.cancel(n), n = m.Y.Wa(i), e.notifySubscribers(t, "dirty")
							}
						}))
					},
					notify: function(t, e) {
						t.equalityComparer = "always" == e ? null : l
					}
				};
				var g = {
					undefined: 1,
					"boolean": 1,
					number: 1,
					string: 1
				};
				m.b("extenders", m.ya), m.vc = function(t, e, i) {
					this.ia = t, this.gb = e, this.Kc = i, this.R = !1, m.G(this, "dispose", this.k)
				}, m.vc.prototype.k = function() {
					this.R = !0, this.Kc()
				}, m.J = function() {
					m.a.Ya(this, _), _.rb(this)
				};
				var v = "change",
					_ = {
						rb: function(t) {
							t.K = {}, t.Nb = 1
						},
						X: function(t, e, i) {
							var n = this;
							i = i || v;
							var r = new m.vc(n, e ? t.bind(e) : t, function() {
								m.a.La(n.K[i], r), n.Ia && n.Ia(i)
							});
							return n.sa && n.sa(i), n.K[i] || (n.K[i] = []), n.K[i].push(r), r
						},
						notifySubscribers: function(t, e) {
							if (e = e || v, e === v && this.zc(), this.Pa(e)) try {
								m.l.Ub();
								for (var i, n = this.K[e].slice(0), r = 0; i = n[r]; ++r) i.R || i.gb(t)
							} finally {
								m.l.end()
							}
						},
						Na: function() {
							return this.Nb
						},
						Uc: function(t) {
							return this.Na() !== t
						},
						zc: function() {
							++this.Nb
						},
						Ta: function(t) {
							var e, i, n, r = this,
								o = m.H(r);
							r.Ha || (r.Ha = r.notifySubscribers, r.notifySubscribers = h);
							var a = t(function() {
								r.Mb = !1, o && n === r && (n = r()), e = !1, r.tb(i, n) && r.Ha(i = n)
							});
							r.Lb = function(t) {
								r.Mb = e = !0, n = t, a()
							}, r.Kb = function(t) {
								e || (i = t, r.Ha(t, "beforeChange"))
							}
						},
						Pa: function(t) {
							return this.K[t] && this.K[t].length
						},
						Sc: function(t) {
							if (t) return this.K[t] && this.K[t].length || 0;
							var e = 0;
							return m.a.D(this.K, function(t, i) {
								"dirty" !== t && (e += i.length)
							}), e
						},
						tb: function(t, e) {
							return !this.equalityComparer || !this.equalityComparer(t, e)
						},
						extend: function(t) {
							var e = this;
							return t && m.a.D(t, function(t, i) {
								var n = m.ya[t];
								"function" == typeof n && (e = n(e, i) || e)
							}), e
						}
					};
				m.G(_, "subscribe", _.X), m.G(_, "extend", _.extend), m.G(_, "getSubscriptionsCount", _.Sc), m.a.ka && m.a.Xa(_, Function.prototype), m.J.fn = _, m.hc = function(t) {
					return null != t && "function" == typeof t.X && "function" == typeof t.notifySubscribers
				}, m.b("subscribable", m.J), m.b("isSubscribable", m.hc), m.va = m.l = function() {
					function t(t) {
						n.push(i), i = t
					}
					function e() {
						i = n.pop()
					}
					var i, n = [],
						r = 0;
					return {
						Ub: t,
						end: e,
						oc: function(t) {
							if (i) {
								if (!m.hc(t)) throw Error("Only subscribable things can act as dependencies");
								i.gb.call(i.Gc, t, t.Cc || (t.Cc = ++r))
							}
						},
						w: function(i, n, r) {
							try {
								return t(), i.apply(n, r || [])
							} finally {
								e()
							}
						},
						Aa: function() {
							if (i) return i.m.Aa()
						},
						Sa: function() {
							if (i) return i.Sa
						}
					}
				}(), m.b("computedContext", m.va), m.b("computedContext.getDependenciesCount", m.va.Aa), m.b("computedContext.isInitial", m.va.Sa), m.b("ignoreDependencies", m.qd = m.l.w);
				var y = m.a.Yb("_latestValue");
				m.N = function(t) {
					function e() {
						return 0 < arguments.length ? (e.tb(e[y], arguments[0]) && (e.ga(), e[y] = arguments[0], e.fa()), this) : (m.l.oc(e), e[y])
					}
					return e[y] = t, m.a.ka || m.a.extend(e, m.J.fn), m.J.fn.rb(e), m.a.Ya(e, b), m.options.deferUpdates && m.ya.deferred(e, !0), e
				};
				var b = {
					equalityComparer: l,
					t: function() {
						return this[y]
					},
					fa: function() {
						this.notifySubscribers(this[y])
					},
					ga: function() {
						this.notifySubscribers(this[y], "beforeChange")
					}
				};
				m.a.ka && m.a.Xa(b, m.J.fn);
				var w = m.N.gd = "__ko_proto__";
				b[w] = m.N, m.Oa = function(e, i) {
					return null !== e && e !== t && e[w] !== t && (e[w] === i || m.Oa(e[w], i))
				}, m.H = function(t) {
					return m.Oa(t, m.N)
				}, m.Ba = function(t) {
					return !!("function" == typeof t && t[w] === m.N || "function" == typeof t && t[w] === m.B && t.Vc)
				}, m.b("observable", m.N), m.b("isObservable", m.H), m.b("isWriteableObservable", m.Ba), m.b("isWritableObservable", m.Ba), m.b("observable.fn", b), m.G(b, "peek", b.t), m.G(b, "valueHasMutated", b.fa), m.G(b, "valueWillMutate", b.ga), m.la = function(t) {
					if (t = t || [], "object" != typeof t || !("length" in t)) throw Error("The argument passed when initializing an observable array must be an array, or null, or undefined.");
					return t = m.N(t), m.a.Ya(t, m.la.fn), t.extend({
						trackArrayChanges: !0
					})
				}, m.la.fn = {
					remove: function(t) {
						for (var e = this.t(), i = [], n = "function" != typeof t || m.H(t) ?
						function(e) {
							return e === t
						} : t, r = 0; r < e.length; r++) {
							var o = e[r];
							n(o) && (0 === i.length && this.ga(), i.push(o), e.splice(r, 1), r--)
						}
						return i.length && this.fa(), i
					},
					removeAll: function(e) {
						if (e === t) {
							var i = this.t(),
								n = i.slice(0);
							return this.ga(), i.splice(0, i.length), this.fa(), n
						}
						return e ? this.remove(function(t) {
							return 0 <= m.a.o(e, t)
						}) : []
					},
					destroy: function(t) {
						var e = this.t(),
							i = "function" != typeof t || m.H(t) ?
						function(e) {
							return e === t
						} : t;
						this.ga();
						for (var n = e.length - 1; 0 <= n; n--) i(e[n]) && (e[n]._destroy = !0);
						this.fa()
					},
					destroyAll: function(e) {
						return e === t ? this.destroy(function() {
							return !0
						}) : e ? this.destroy(function(t) {
							return 0 <= m.a.o(e, t)
						}) : []
					},
					indexOf: function(t) {
						var e = this();
						return m.a.o(e, t)
					},
					replace: function(t, e) {
						var i = this.indexOf(t);
						0 <= i && (this.ga(), this.t()[i] = e, this.fa())
					}
				}, m.a.ka && m.a.Xa(m.la.fn, m.N.fn), m.a.q("pop push reverse shift sort splice unshift".split(" "), function(t) {
					m.la.fn[t] = function() {
						var e = this.t();
						this.ga(), this.Vb(e, t, arguments);
						var i = e[t].apply(e, arguments);
						return this.fa(), i === e ? this : i
					}
				}), m.a.q(["slice"], function(t) {
					m.la.fn[t] = function() {
						var e = this();
						return e[t].apply(e, arguments)
					}
				}), m.b("observableArray", m.la), m.ya.trackArrayChanges = function(t, e) {
					function i() {
						if (!r) {
							r = !0;
							var e = t.notifySubscribers;
							t.notifySubscribers = function(t, i) {
								return i && i !== v || ++a, e.apply(this, arguments)
							};
							var i = [].concat(t.t() || []);
							o = null, n = t.X(function(e) {
								if (e = [].concat(e || []), t.Pa("arrayChange")) {
									var n;
									(!o || 1 < a) && (o = m.a.ib(i, e, t.hb)), n = o
								}
								i = e, o = null, a = 0, n && n.length && t.notifySubscribers(n, "arrayChange")
							})
						}
					}
					if (t.hb = {}, e && "object" == typeof e && m.a.extend(t.hb, e), t.hb.sparse = !0, !t.Vb) {
						var n, r = !1,
							o = null,
							a = 0,
							s = t.sa,
							l = t.Ia;
						t.sa = function(e) {
							s && s.call(t, e), "arrayChange" === e && i()
						}, t.Ia = function(e) {
							l && l.call(t, e), "arrayChange" !== e || t.Pa("arrayChange") || (n.k(), r = !1)
						}, t.Vb = function(t, e, i) {
							function n(t, e, i) {
								return s[s.length] = {
									status: t,
									value: e,
									index: i
								}
							}
							if (r && !a) {
								var s = [],
									l = t.length,
									u = i.length,
									c = 0;
								switch (e) {
								case "push":
									c = l;
								case "unshift":
									for (e = 0; e < u; e++) n("added", i[e], c + e);
									break;
								case "pop":
									c = l - 1;
								case "shift":
									l && n("deleted", t[c], c);
									break;
								case "splice":
									e = Math.min(Math.max(0, 0 > i[0] ? l + i[0] : i[0]), l);
									for (var l = 1 === u ? l : Math.min(e + (i[1] || 0), l), u = e + u - 2, c = Math.max(l, u), h = [], d = [], p = 2; e < c; ++e, ++p) e < l && d.push(n("deleted", t[e], e)), e < u && h.push(n("added", i[p], e));
									m.a.dc(d, h);
									break;
								default:
									return
								}
								o = s
							}
						}
					}
				};
				var C = m.a.Yb("_state");
				m.m = m.B = function(e, i, n) {
					function r() {
						if (0 < arguments.length) {
							if ("function" != typeof o) throw Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.");
							return o.apply(a.pb, arguments), this
						}
						return m.l.oc(r), (a.S || a.s && r.Qa()) && r.aa(), a.T
					}
					if ("object" == typeof e ? n = e : (n = n || {}, e && (n.read = e)), "function" != typeof n.read) throw Error("Pass a function that returns the value of the ko.computed");
					var o = n.write,
						a = {
							T: t,
							S: !0,
							Ra: !1,
							Fb: !1,
							R: !1,
							Va: !1,
							s: !1,
							jd: n.read,
							pb: i || n.owner,
							i: n.disposeWhenNodeIsRemoved || n.i || null,
							wa: n.disposeWhen || n.wa,
							mb: null,
							r: {},
							L: 0,
							bc: null
						};
					return r[C] = a, r.Vc = "function" == typeof o, m.a.ka || m.a.extend(r, m.J.fn), m.J.fn.rb(r), m.a.Ya(r, x), n.pure ? (a.Va = !0, a.s = !0, m.a.extend(r, E)) : n.deferEvaluation && m.a.extend(r, k), m.options.deferUpdates && m.ya.deferred(r, !0), a.i && (a.Fb = !0, a.i.nodeType || (a.i = null)), a.s || n.deferEvaluation || r.aa(), a.i && r.ba() && m.a.F.oa(a.i, a.mb = function() {
						r.k()
					}), r
				};
				var x = {
					equalityComparer: l,
					Aa: function() {
						return this[C].L
					},
					Pb: function(t, e, i) {
						if (this[C].Va && e === this) throw Error("A 'pure' computed must not be called recursively");
						this[C].r[t] = i, i.Ga = this[C].L++, i.na = e.Na()
					},
					Qa: function() {
						var t, e, i = this[C].r;
						for (t in i) if (i.hasOwnProperty(t) && (e = i[t], e.ia.Uc(e.na))) return !0
					},
					bd: function() {
						this.Fa && !this[C].Ra && this.Fa()
					},
					ba: function() {
						return this[C].S || 0 < this[C].L
					},
					ld: function() {
						this.Mb || this.ac()
					},
					uc: function(t) {
						if (t.cb && !this[C].i) {
							var e = t.X(this.bd, this, "dirty"),
								i = t.X(this.ld, this);
							return {
								ia: t,
								k: function() {
									e.k(), i.k()
								}
							}
						}
						return t.X(this.ac, this)
					},
					ac: function() {
						var t = this,
							e = t.throttleEvaluation;
						e && 0 <= e ? (clearTimeout(this[C].bc), this[C].bc = m.a.setTimeout(function() {
							t.aa(!0)
						}, e)) : t.Fa ? t.Fa() : t.aa(!0)
					},
					aa: function(t) {
						var e = this[C],
							i = e.wa;
						if (!e.Ra && !e.R) {
							if (e.i && !m.a.nb(e.i) || i && i()) {
								if (!e.Fb) return void this.k()
							} else e.Fb = !1;
							e.Ra = !0;
							try {
								this.Qc(t)
							} finally {
								e.Ra = !1
							}
							e.L || this.k()
						}
					},
					Qc: function(e) {
						var i = this[C],
							n = i.Va ? t : !i.L,
							r = {
								Hc: this,
								Ma: i.r,
								lb: i.L
							};
						m.l.Ub({
							Gc: r,
							gb: p,
							m: this,
							Sa: n
						}), i.r = {}, i.L = 0, r = this.Pc(i, r), this.tb(i.T, r) && (i.s || this.notifySubscribers(i.T, "beforeChange"), i.T = r, i.s ? this.zc() : e && this.notifySubscribers(i.T)), n && this.notifySubscribers(i.T, "awake")
					},
					Pc: function(t, e) {
						try {
							var i = t.jd;
							return t.pb ? i.call(t.pb) : i()
						} finally {
							m.l.end(), e.lb && !t.s && m.a.D(e.Ma, d), t.S = !1
						}
					},
					t: function() {
						var t = this[C];
						return (t.S && !t.L || t.s && this.Qa()) && this.aa(), t.T
					},
					Ta: function(t) {
						m.J.fn.Ta.call(this, t), this.Fa = function() {
							this.Kb(this[C].T), this[C].S = !0, this.Lb(this)
						}
					},
					k: function() {
						var t = this[C];
						!t.s && t.r && m.a.D(t.r, function(t, e) {
							e.k && e.k()
						}), t.i && t.mb && m.a.F.pc(t.i, t.mb), t.r = null, t.L = 0, t.R = !0, t.S = !1, t.s = !1, t.i = null
					}
				},
					E = {
						sa: function(t) {
							var e = this,
								i = e[C];
							if (!i.R && i.s && "change" == t) {
								if (i.s = !1, i.S || e.Qa()) i.r = null, i.L = 0, i.S = !0, e.aa();
								else {
									var n = [];
									m.a.D(i.r, function(t, e) {
										n[e.Ga] = t
									}), m.a.q(n, function(t, n) {
										var r = i.r[t],
											o = e.uc(r.ia);
										o.Ga = n, o.na = r.na, i.r[t] = o
									})
								}
								i.R || e.notifySubscribers(i.T, "awake")
							}
						},
						Ia: function(e) {
							var i = this[C];
							i.R || "change" != e || this.Pa("change") || (m.a.D(i.r, function(t, e) {
								e.k && (i.r[t] = {
									ia: e.ia,
									Ga: e.Ga,
									na: e.na
								}, e.k())
							}), i.s = !0, this.notifySubscribers(t, "asleep"))
						},
						Na: function() {
							var t = this[C];
							return t.s && (t.S || this.Qa()) && this.aa(), m.J.fn.Na.call(this)
						}
					},
					k = {
						sa: function(t) {
							"change" != t && "beforeChange" != t || this.t()
						}
					};
				m.a.ka && m.a.Xa(x, m.J.fn);
				var L = m.N.gd;
				m.m[L] = m.N, x[L] = m.m, m.Xc = function(t) {
					return m.Oa(t, m.m)
				}, m.Yc = function(t) {
					return m.Oa(t, m.m) && t[C] && t[C].Va
				}, m.b("computed", m.m), m.b("dependentObservable", m.m), m.b("isComputed", m.Xc), m.b("isPureComputed", m.Yc), m.b("computed.fn", x), m.G(x, "peek", x.t), m.G(x, "dispose", x.k), m.G(x, "isActive", x.ba), m.G(x, "getDependenciesCount", x.Aa), m.nc = function(t, e) {
					return "function" == typeof t ? m.m(t, e, {
						pure: !0
					}) : (t = m.a.extend({}, t), t.pure = !0, m.m(t, e))
				}, m.b("pureComputed", m.nc), function() {
					function e(r, o, a) {
						if (a = a || new n, r = o(r), "object" != typeof r || null === r || r === t || r instanceof RegExp || r instanceof Date || r instanceof String || r instanceof Number || r instanceof Boolean) return r;
						var s = r instanceof Array ? [] : {};
						return a.save(r, s), i(r, function(i) {
							var n = o(r[i]);
							switch (typeof n) {
							case "boolean":
							case "number":
							case "string":
							case "function":
								s[i] = n;
								break;
							case "object":
							case "undefined":
								var l = a.get(n);
								s[i] = l !== t ? l : e(n, o, a)
							}
						}), s
					}
					function i(t, e) {
						if (t instanceof Array) {
							for (var i = 0; i < t.length; i++) e(i);
							"function" == typeof t.toJSON && e("toJSON")
						} else for (i in t) e(i)
					}
					function n() {
						this.keys = [], this.Ib = []
					}
					m.wc = function(t) {
						if (0 == arguments.length) throw Error("When calling ko.toJS, pass the object you want to convert.");
						return e(t, function(t) {
							for (var e = 0; m.H(t) && 10 > e; e++) t = t();
							return t
						})
					}, m.toJSON = function(t, e, i) {
						return t = m.wc(t), m.a.Eb(t, e, i)
					}, n.prototype = {
						save: function(t, e) {
							var i = m.a.o(this.keys, t);
							0 <= i ? this.Ib[i] = e : (this.keys.push(t), this.Ib.push(e))
						},
						get: function(e) {
							return e = m.a.o(this.keys, e), 0 <= e ? this.Ib[e] : t
						}
					}
				}(), m.b("toJS", m.wc), m.b("toJSON", m.toJSON), function() {
					m.j = {
						u: function(e) {
							switch (m.a.A(e)) {
							case "option":
								return !0 === e.__ko__hasDomDataOptionValue__ ? m.a.e.get(e, m.d.options.xb) : 7 >= m.a.C ? e.getAttributeNode("value") && e.getAttributeNode("value").specified ? e.value : e.text : e.value;
							case "select":
								return 0 <= e.selectedIndex ? m.j.u(e.options[e.selectedIndex]) : t;
							default:
								return e.value
							}
						},
						ha: function(e, i, n) {
							switch (m.a.A(e)) {
							case "option":
								switch (typeof i) {
								case "string":
									m.a.e.set(e, m.d.options.xb, t), "__ko__hasDomDataOptionValue__" in e && delete e.__ko__hasDomDataOptionValue__, e.value = i;
									break;
								default:
									m.a.e.set(e, m.d.options.xb, i), e.__ko__hasDomDataOptionValue__ = !0, e.value = "number" == typeof i ? i : ""
								}
								break;
							case "select":
								"" !== i && null !== i || (i = t);
								for (var r, o = -1, a = 0, s = e.options.length; a < s; ++a) if (r = m.j.u(e.options[a]), r == i || "" == r && i === t) {
									o = a;
									break
								}(n || 0 <= o || i === t && 1 < e.size) && (e.selectedIndex = o);
								break;
							default:
								null !== i && i !== t || (i = ""), e.value = i
							}
						}
					}
				}(), m.b("selectExtensions", m.j), m.b("selectExtensions.readValue", m.j.u), m.b("selectExtensions.writeValue", m.j.ha), m.h = function() {
					function t(t) {
						t = m.a.$a(t), 123 === t.charCodeAt(0) && (t = t.slice(1, -1));
						var e, i = [],
							a = t.match(n),
							s = [],
							l = 0;
						if (a) {
							a.push(",");
							for (var u, c = 0; u = a[c]; ++c) {
								var h = u.charCodeAt(0);
								if (44 === h) {
									if (0 >= l) {
										i.push(e && s.length ? {
											key: e,
											value: s.join("")
										} : {
											unknown: e || s.join("")
										}), e = l = 0, s = [];
										continue
									}
								} else if (58 === h) {
									if (!l && !e && 1 === s.length) {
										e = s.pop();
										continue
									}
								} else 47 === h && c && 1 < u.length ? (h = a[c - 1].match(r)) && !o[h[0]] && (t = t.substr(t.indexOf(u) + 1), a = t.match(n), a.push(","), c = -1, u = "/") : 40 === h || 123 === h || 91 === h ? ++l : 41 === h || 125 === h || 93 === h ? --l : e || s.length || 34 !== h && 39 !== h || (u = u.slice(1, -1));
								s.push(u)
							}
						}
						return i
					}
					var e = ["true", "false", "null", "undefined"],
						i = /^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i,
						n = RegExp("\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*'|/(?:[^/\\\\]|\\\\.)*/w*|[^\\s:,/][^,\"'{}()/:[\\]]*[^\\s,\"'{}()/:[\\]]|[^\\s]", "g"),
						r = /[\])"'A-Za-z0-9_$]+$/,
						o = {
							"in": 1,
							"return": 1,
							"typeof": 1
						},
						a = {};
					return {
						ta: [],
						ea: a,
						yb: t,
						Ua: function(n, r) {
							function o(t, n) {
								var r;
								if (!c) {
									var h = m.getBindingHandler(t);
									if (h && h.preprocess && !(n = h.preprocess(n, t, o))) return;
									(h = a[t]) && (r = n, 0 <= m.a.o(e, r) ? r = !1 : (h = r.match(i), r = null !== h && (h[1] ? "Object(" + h[1] + ")" + h[2] : r)), h = r), h && l.push("'" + t + "':function(_z){" + r + "=_z}");
								}
								u && (n = "function(){return " + n + " }"), s.push("'" + t + "':" + n)
							}
							r = r || {};
							var s = [],
								l = [],
								u = r.valueAccessors,
								c = r.bindingParams,
								h = "string" == typeof n ? t(n) : n;
							return m.a.q(h, function(t) {
								o(t.key || t.unknown, t.value)
							}), l.length && o("_ko_property_writers", "{" + l.join(",") + " }"), s.join(",")
						},
						ad: function(t, e) {
							for (var i = 0; i < t.length; i++) if (t[i].key == e) return !0;
							return !1
						},
						Ea: function(t, e, i, n, r) {
							t && m.H(t) ? !m.Ba(t) || r && t.t() === n || t(n) : (t = e.get("_ko_property_writers")) && t[i] && t[i](n)
						}
					}
				}(), m.b("expressionRewriting", m.h), m.b("expressionRewriting.bindingRewriteValidators", m.h.ta), m.b("expressionRewriting.parseObjectLiteral", m.h.yb), m.b("expressionRewriting.preProcessBindings", m.h.Ua), m.b("expressionRewriting._twoWayBindings", m.h.ea), m.b("jsonExpressionRewriting", m.h), m.b("jsonExpressionRewriting.insertPropertyAccessorsIntoJson", m.h.Ua), function() {
					function t(t) {
						return 8 == t.nodeType && a.test(o ? t.text : t.nodeValue)
					}
					function e(t) {
						return 8 == t.nodeType && s.test(o ? t.text : t.nodeValue)
					}
					function i(i, n) {
						for (var r = i, o = 1, a = []; r = r.nextSibling;) {
							if (e(r) && (o--, 0 === o)) return a;
							a.push(r), t(r) && o++
						}
						if (!n) throw Error("Cannot find closing comment tag to match: " + i.nodeValue);
						return null
					}
					function r(t, e) {
						var n = i(t, e);
						return n ? 0 < n.length ? n[n.length - 1].nextSibling : t.nextSibling : null
					}
					var o = n && "<!--test-->" === n.createComment("test").text,
						a = o ? /^\x3c!--\s*ko(?:\s+([\s\S]+))?\s*--\x3e$/ : /^\s*ko(?:\s+([\s\S]+))?\s*$/,
						s = o ? /^\x3c!--\s*\/ko\s*--\x3e$/ : /^\s*\/ko\s*$/,
						l = {
							ul: !0,
							ol: !0
						};
					m.f = {
						Z: {},
						childNodes: function(e) {
							return t(e) ? i(e) : e.childNodes
						},
						xa: function(e) {
							if (t(e)) {
								e = m.f.childNodes(e);
								for (var i = 0, n = e.length; i < n; i++) m.removeNode(e[i])
							} else m.a.ob(e)
						},
						da: function(e, i) {
							if (t(e)) {
								m.f.xa(e);
								for (var n = e.nextSibling, r = 0, o = i.length; r < o; r++) n.parentNode.insertBefore(i[r], n)
							} else m.a.da(e, i)
						},
						mc: function(e, i) {
							t(e) ? e.parentNode.insertBefore(i, e.nextSibling) : e.firstChild ? e.insertBefore(i, e.firstChild) : e.appendChild(i)
						},
						gc: function(e, i, n) {
							n ? t(e) ? e.parentNode.insertBefore(i, n.nextSibling) : n.nextSibling ? e.insertBefore(i, n.nextSibling) : e.appendChild(i) : m.f.mc(e, i)
						},
						firstChild: function(i) {
							return t(i) ? !i.nextSibling || e(i.nextSibling) ? null : i.nextSibling : i.firstChild
						},
						nextSibling: function(i) {
							return t(i) && (i = r(i)), i.nextSibling && e(i.nextSibling) ? null : i.nextSibling
						},
						Tc: t,
						pd: function(t) {
							return (t = (o ? t.text : t.nodeValue).match(a)) ? t[1] : null
						},
						kc: function(i) {
							if (l[m.a.A(i)]) {
								var n = i.firstChild;
								if (n) do
								if (1 === n.nodeType) {
									var o;
									o = n.firstChild;
									var a = null;
									if (o) do
									if (a) a.push(o);
									else if (t(o)) {
										var s = r(o, !0);
										s ? o = s : a = [o]
									} else e(o) && (a = [o]);
									while (o = o.nextSibling);
									if (o = a) for (a = n.nextSibling, s = 0; s < o.length; s++) a ? i.insertBefore(o[s], a) : i.appendChild(o[s])
								}
								while (n = n.nextSibling)
							}
						}
					}
				}(), m.b("virtualElements", m.f), m.b("virtualElements.allowedBindings", m.f.Z), m.b("virtualElements.emptyNode", m.f.xa), m.b("virtualElements.insertAfter", m.f.gc), m.b("virtualElements.prepend", m.f.mc), m.b("virtualElements.setDomNodeChildren", m.f.da), function() {
					m.Q = function() {
						this.Fc = {}
					}, m.a.extend(m.Q.prototype, {
						nodeHasBindings: function(t) {
							switch (t.nodeType) {
							case 1:
								return null != t.getAttribute("data-bind") || m.g.getComponentNameForNode(t);
							case 8:
								return m.f.Tc(t);
							default:
								return !1
							}
						},
						getBindings: function(t, e) {
							var i = this.getBindingsString(t, e),
								i = i ? this.parseBindingsString(i, e, t) : null;
							return m.g.Ob(i, t, e, !1)
						},
						getBindingAccessors: function(t, e) {
							var i = this.getBindingsString(t, e),
								i = i ? this.parseBindingsString(i, e, t, {
									valueAccessors: !0
								}) : null;
							return m.g.Ob(i, t, e, !0)
						},
						getBindingsString: function(t) {
							switch (t.nodeType) {
							case 1:
								return t.getAttribute("data-bind");
							case 8:
								return m.f.pd(t);
							default:
								return null
							}
						},
						parseBindingsString: function(t, e, i, n) {
							try {
								var r, o = this.Fc,
									a = t + (n && n.valueAccessors || "");
								if (!(r = o[a])) {
									var s, l = "with($context){with($data||{}){return{" + m.h.Ua(t, n) + "}}}";
									s = new Function("$context", "$element", l), r = o[a] = s
								}
								return r(e, i)
							} catch (u) {
								throw u.message = "Unable to parse bindings.\nBindings value: " + t + "\nMessage: " + u.message, u
							}
						}
					}), m.Q.instance = new m.Q
				}(), m.b("bindingProvider", m.Q), function() {
					function i(t) {
						return function() {
							return t
						}
					}
					function n(t) {
						return t()
					}
					function r(t) {
						return m.a.Ca(m.l.w(t), function(e, i) {
							return function() {
								return t()[i]
							}
						})
					}
					function a(t, e, n) {
						return "function" == typeof t ? r(t.bind(null, e, n)) : m.a.Ca(t, i)
					}
					function s(t, e) {
						return r(this.getBindings.bind(this, t, e))
					}
					function l(t, e, i) {
						var n, r = m.f.firstChild(e),
							o = m.Q.instance,
							a = o.preprocessNode;
						if (a) {
							for (; n = r;) r = m.f.nextSibling(n), a.call(o, n);
							r = m.f.firstChild(e)
						}
						for (; n = r;) r = m.f.nextSibling(n), u(t, n, i)
					}
					function u(t, e, i) {
						var n = !0,
							r = 1 === e.nodeType;
						r && m.f.kc(e), (r && i || m.Q.instance.nodeHasBindings(e)) && (n = h(e, null, t, i).shouldBindDescendants), n && !p[m.a.A(e)] && l(t, e, !r)
					}
					function c(t) {
						var e = [],
							i = {},
							n = [];
						return m.a.D(t, function r(o) {
							if (!i[o]) {
								var a = m.getBindingHandler(o);
								a && (a.after && (n.push(o), m.a.q(a.after, function(e) {
									if (t[e]) {
										if (-1 !== m.a.o(n, e)) throw Error("Cannot combine the following bindings, because they have a cyclic dependency: " + n.join(", "));
										r(e)
									}
								}), n.length--), e.push({
									key: o,
									fc: a
								})), i[o] = !0
							}
						}), e
					}
					function h(e, i, r, o) {
						var a = m.a.e.get(e, f);
						if (!i) {
							if (a) throw Error("You cannot apply bindings multiple times to the same element.");
							m.a.e.set(e, f, !0)
						}!a && o && m.tc(e, r);
						var l;
						if (i && "function" != typeof i) l = i;
						else {
							var u = m.Q.instance,
								h = u.getBindingAccessors || s,
								d = m.B(function() {
									return (l = i ? i(r, e) : h.call(u, e, r)) && r.P && r.P(), l
								}, null, {
									i: e
								});
							l && d.ba() || (d = null)
						}
						var p;
						if (l) {
							var g = d ?
							function(t) {
								return function() {
									return n(d()[t])
								}
							} : function(t) {
								return l[t]
							}, v = function() {
								return m.a.Ca(d ? d() : l, n)
							};
							v.get = function(t) {
								return l[t] && n(g(t))
							}, v.has = function(t) {
								return t in l
							}, o = c(l), m.a.q(o, function(i) {
								var n = i.fc.init,
									o = i.fc.update,
									a = i.key;
								if (8 === e.nodeType && !m.f.Z[a]) throw Error("The binding '" + a + "' cannot be used with virtual elements");
								try {
									"function" == typeof n && m.l.w(function() {
										var i = n(e, g(a), v, r.$data, r);
										if (i && i.controlsDescendantBindings) {
											if (p !== t) throw Error("Multiple bindings (" + p + " and " + a + ") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.");
											p = a
										}
									}), "function" == typeof o && m.B(function() {
										o(e, g(a), v, r.$data, r)
									}, null, {
										i: e
									})
								} catch (s) {
									throw s.message = 'Unable to process binding "' + a + ": " + l[a] + '"\nMessage: ' + s.message, s
								}
							})
						}
						return {
							shouldBindDescendants: p === t
						}
					}
					function d(t) {
						return t && t instanceof m.U ? t : new m.U(t)
					}
					m.d = {};
					var p = {
						script: !0,
						textarea: !0,
						template: !0
					};
					m.getBindingHandler = function(t) {
						return m.d[t]
					}, m.U = function(e, i, n, r) {
						var o, a = this,
							s = "function" == typeof e && !m.H(e),
							l = m.B(function() {
								var t = s ? e() : e,
									o = m.a.c(t);
								return i ? (i.P && i.P(), m.a.extend(a, i), l && (a.P = l)) : (a.$parents = [], a.$root = o, a.ko = m), a.$rawData = t, a.$data = o, n && (a[n] = o), r && r(a, i, o), a.$data
							}, null, {
								wa: function() {
									return o && !m.a.Qb(o)
								},
								i: !0
							});
						l.ba() && (a.P = l, l.equalityComparer = null, o = [], l.Ac = function(e) {
							o.push(e), m.a.F.oa(e, function(e) {
								m.a.La(o, e), o.length || (l.k(), a.P = l = t)
							})
						})
					}, m.U.prototype.createChildContext = function(t, e, i) {
						return new m.U(t, this, e, function(t, e) {
							t.$parentContext = e, t.$parent = e.$data, t.$parents = (e.$parents || []).slice(0), t.$parents.unshift(t.$parent), i && i(t)
						})
					}, m.U.prototype.extend = function(t) {
						return new m.U(this.P || this.$data, this, null, function(e, i) {
							e.$rawData = i.$rawData, m.a.extend(e, "function" == typeof t ? t() : t)
						})
					};
					var f = m.a.e.I(),
						g = m.a.e.I();
					m.tc = function(t, e) {
						return 2 != arguments.length ? m.a.e.get(t, g) : (m.a.e.set(t, g, e), void(e.P && e.P.Ac(t)))
					}, m.Ja = function(t, e, i) {
						return 1 === t.nodeType && m.f.kc(t), h(t, e, d(i), !0)
					}, m.Dc = function(t, e, i) {
						return i = d(i), m.Ja(t, a(e, i, t), i)
					}, m.eb = function(t, e) {
						1 !== e.nodeType && 8 !== e.nodeType || l(d(t), e, !0)
					}, m.Rb = function(t, i) {
						if (!o && e.jQuery && (o = e.jQuery), i && 1 !== i.nodeType && 8 !== i.nodeType) throw Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node");
						i = i || e.document.body, u(d(t), i, !0)
					}, m.kb = function(e) {
						switch (e.nodeType) {
						case 1:
						case 8:
							var i = m.tc(e);
							if (i) return i;
							if (e.parentNode) return m.kb(e.parentNode)
						}
						return t
					}, m.Jc = function(e) {
						return (e = m.kb(e)) ? e.$data : t
					}, m.b("bindingHandlers", m.d), m.b("applyBindings", m.Rb), m.b("applyBindingsToDescendants", m.eb), m.b("applyBindingAccessorsToNode", m.Ja), m.b("applyBindingsToNode", m.Dc), m.b("contextFor", m.kb), m.b("dataFor", m.Jc)
				}(), function(t) {
					function e(e, n) {
						var a, s = r.hasOwnProperty(e) ? r[e] : t;
						s ? s.X(n) : (s = r[e] = new m.J, s.X(n), i(e, function(t, i) {
							var n = !(!i || !i.synchronous);
							o[e] = {
								definition: t,
								Zc: n
							}, delete r[e], a || n ? s.notifySubscribers(t) : m.Y.Wa(function() {
								s.notifySubscribers(t)
							})
						}), a = !0)
					}
					function i(t, e) {
						n("getConfig", [t], function(i) {
							i ? n("loadComponent", [t, i], function(t) {
								e(t, i)
							}) : e(null, null)
						})
					}
					function n(e, i, r, o) {
						o || (o = m.g.loaders.slice(0));
						var a = o.shift();
						if (a) {
							var s = a[e];
							if (s) {
								var l = !1;
								if (s.apply(a, i.concat(function(t) {
									l ? r(null) : null !== t ? r(t) : n(e, i, r, o)
								})) !== t && (l = !0, !a.suppressLoaderExceptions)) throw Error("Component loaders must supply values by invoking the callback, not by returning values synchronously.")
							} else n(e, i, r, o)
						} else r(null)
					}
					var r = {},
						o = {};
					m.g = {
						get: function(i, n) {
							var r = o.hasOwnProperty(i) ? o[i] : t;
							r ? r.Zc ? m.l.w(function() {
								n(r.definition)
							}) : m.Y.Wa(function() {
								n(r.definition)
							}) : e(i, n)
						},
						Xb: function(t) {
							delete o[t]
						},
						Jb: n
					}, m.g.loaders = [], m.b("components", m.g), m.b("components.get", m.g.get), m.b("components.clearCachedDefinition", m.g.Xb)
				}(), function() {
					function t(t, e, i, n) {
						function r() {
							0 === --s && n(o)
						}
						var o = {},
							s = 2,
							l = i.template;
						i = i.viewModel, l ? a(e, l, function(e) {
							m.g.Jb("loadTemplate", [t, e], function(t) {
								o.template = t, r()
							})
						}) : r(), i ? a(e, i, function(e) {
							m.g.Jb("loadViewModel", [t, e], function(t) {
								o[c] = t, r()
							})
						}) : r()
					}
					function i(t, e, n) {
						if ("function" == typeof e) n(function(t) {
							return new e(t)
						});
						else if ("function" == typeof e[c]) n(e[c]);
						else if ("instance" in e) {
							var r = e.instance;
							n(function() {
								return r
							})
						} else "viewModel" in e ? i(t, e.viewModel, n) : t("Unknown viewModel value: " + e)
					}
					function r(t) {
						switch (m.a.A(t)) {
						case "script":
							return m.a.ma(t.text);
						case "textarea":
							return m.a.ma(t.value);
						case "template":
							if (o(t.content)) return m.a.ua(t.content.childNodes)
						}
						return m.a.ua(t.childNodes)
					}
					function o(t) {
						return e.DocumentFragment ? t instanceof DocumentFragment : t && 11 === t.nodeType
					}
					function a(t, i, n) {
						"string" == typeof i.require ? s || e.require ? (s || e.require)([i.require], n) : t("Uses require, but no AMD loader is present") : n(i)
					}
					function l(t) {
						return function(e) {
							throw Error("Component '" + t + "': " + e)
						}
					}
					var u = {};
					m.g.register = function(t, e) {
						if (!e) throw Error("Invalid configuration for " + t);
						if (m.g.ub(t)) throw Error("Component " + t + " is already registered");
						u[t] = e
					}, m.g.ub = function(t) {
						return u.hasOwnProperty(t)
					}, m.g.od = function(t) {
						delete u[t], m.g.Xb(t)
					}, m.g.Zb = {
						getConfig: function(t, e) {
							e(u.hasOwnProperty(t) ? u[t] : null)
						},
						loadComponent: function(e, i, n) {
							var r = l(e);
							a(r, i, function(i) {
								t(e, r, i, n)
							})
						},
						loadTemplate: function(t, i, a) {
							if (t = l(t), "string" == typeof i) a(m.a.ma(i));
							else if (i instanceof Array) a(i);
							else if (o(i)) a(m.a.V(i.childNodes));
							else if (i.element) if (i = i.element, e.HTMLElement ? i instanceof HTMLElement : i && i.tagName && 1 === i.nodeType) a(r(i));
							else if ("string" == typeof i) {
								var s = n.getElementById(i);
								s ? a(r(s)) : t("Cannot find element with ID " + i)
							} else t("Unknown element type: " + i);
							else t("Unknown template value: " + i)
						},
						loadViewModel: function(t, e, n) {
							i(l(t), e, n)
						}
					};
					var c = "createViewModel";
					m.b("components.register", m.g.register), m.b("components.isRegistered", m.g.ub), m.b("components.unregister", m.g.od), m.b("components.defaultLoader", m.g.Zb), m.g.loaders.push(m.g.Zb), m.g.Bc = u
				}(), function() {
					function t(t, i) {
						var n = t.getAttribute("params");
						if (n) {
							var n = e.parseBindingsString(n, i, t, {
								valueAccessors: !0,
								bindingParams: !0
							}),
								n = m.a.Ca(n, function(e) {
									return m.m(e, null, {
										i: t
									})
								}),
								r = m.a.Ca(n, function(e) {
									var i = e.t();
									return e.ba() ? m.m({
										read: function() {
											return m.a.c(e())
										},
										write: m.Ba(i) &&
										function(t) {
											e()(t)
										},
										i: t
									}) : i
								});
							return r.hasOwnProperty("$raw") || (r.$raw = n), r
						}
						return {
							$raw: {}
						}
					}
					m.g.getComponentNameForNode = function(t) {
						var e = m.a.A(t);
						if (m.g.ub(e) && (-1 != e.indexOf("-") || "[object HTMLUnknownElement]" == "" + t || 8 >= m.a.C && t.tagName === e)) return e
					}, m.g.Ob = function(e, i, n, r) {
						if (1 === i.nodeType) {
							var o = m.g.getComponentNameForNode(i);
							if (o) {
								if (e = e || {}, e.component) throw Error('Cannot use the "component" binding on a custom element matching a component');
								var a = {
									name: o,
									params: t(i, n)
								};
								e.component = r ?
								function() {
									return a
								} : a
							}
						}
						return e
					};
					var e = new m.Q;
					9 > m.a.C && (m.g.register = function(t) {
						return function(e) {
							return n.createElement(e), t.apply(this, arguments)
						}
					}(m.g.register), n.createDocumentFragment = function(t) {
						return function() {
							var e, i = t(),
								n = m.g.Bc;
							for (e in n) n.hasOwnProperty(e) && i.createElement(e);
							return i
						}
					}(n.createDocumentFragment))
				}(), function(t) {
					function e(t, e, i) {
						if (e = e.template, !e) throw Error("Component '" + t + "' has no template");
						t = m.a.ua(e), m.f.da(i, t)
					}
					function i(t, e, i, n) {
						var r = t.createViewModel;
						return r ? r.call(t, n, {
							element: e,
							templateNodes: i
						}) : n
					}
					var n = 0;
					m.d.component = {
						init: function(r, o, a, s, l) {
							function u() {
								var t = c && c.dispose;
								"function" == typeof t && t.call(c), h = c = null
							}
							var c, h, d = m.a.V(m.f.childNodes(r));
							return m.a.F.oa(r, u), m.m(function() {
								var a, s, p = m.a.c(o());
								if ("string" == typeof p ? a = p : (a = m.a.c(p.name), s = m.a.c(p.params)), !a) throw Error("No component name specified");
								var f = h = ++n;
								m.g.get(a, function(n) {
									if (h === f) {
										if (u(), !n) throw Error("Unknown component '" + a + "'");
										e(a, n, r);
										var o = i(n, r, d, s);
										n = l.createChildContext(o, t, function(t) {
											t.$component = o, t.$componentTemplateNodes = d
										}), c = o, m.eb(n, r)
									}
								})
							}, null, {
								i: r
							}), {
								controlsDescendantBindings: !0
							}
						}
					}, m.f.Z.component = !0
				}();
				var P = {
					"class": "className",
					"for": "htmlFor"
				};
				m.d.attr = {
					update: function(e, i) {
						var n = m.a.c(i()) || {};
						m.a.D(n, function(i, n) {
							n = m.a.c(n);
							var r = !1 === n || null === n || n === t;
							r && e.removeAttribute(i), 8 >= m.a.C && i in P ? (i = P[i], r ? e.removeAttribute(i) : e[i] = n) : r || e.setAttribute(i, n.toString()), "name" === i && m.a.rc(e, r ? "" : n.toString())
						})
					}
				}, function() {
					m.d.checked = {
						after: ["value", "attr"],
						init: function(e, i, n) {
							function r() {
								var t = e.checked,
									r = p ? a() : t;
								if (!m.va.Sa() && (!l || t)) {
									var o = m.l.w(i);
									if (c) {
										var s = h ? o.t() : o;
										d !== r ? (t && (m.a.pa(s, r, !0), m.a.pa(s, d, !1)), d = r) : m.a.pa(s, r, t), h && m.Ba(o) && o(s)
									} else m.h.Ea(o, n, "checked", r, !0)
								}
							}
							function o() {
								var t = m.a.c(i());
								e.checked = c ? 0 <= m.a.o(t, a()) : s ? t : a() === t
							}
							var a = m.nc(function() {
								return n.has("checkedValue") ? m.a.c(n.get("checkedValue")) : n.has("value") ? m.a.c(n.get("value")) : e.value
							}),
								s = "checkbox" == e.type,
								l = "radio" == e.type;
							if (s || l) {
								var u = i(),
									c = s && m.a.c(u) instanceof Array,
									h = !(c && u.push && u.splice),
									d = c ? a() : t,
									p = l || c;
								l && !e.name && m.d.uniqueName.init(e, function() {
									return !0
								}), m.m(r, null, {
									i: e
								}), m.a.p(e, "click", r), m.m(o, null, {
									i: e
								}), u = t
							}
						}
					}, m.h.ea.checked = !0, m.d.checkedValue = {
						update: function(t, e) {
							t.value = m.a.c(e())
						}
					}
				}(), m.d.css = {
					update: function(t, e) {
						var i = m.a.c(e());
						null !== i && "object" == typeof i ? m.a.D(i, function(e, i) {
							i = m.a.c(i), m.a.bb(t, e, i)
						}) : (i = m.a.$a(String(i || "")), m.a.bb(t, t.__ko__cssValue, !1), t.__ko__cssValue = i, m.a.bb(t, i, !0))
					}
				}, m.d.enable = {
					update: function(t, e) {
						var i = m.a.c(e());
						i && t.disabled ? t.removeAttribute("disabled") : i || t.disabled || (t.disabled = !0)
					}
				}, m.d.disable = {
					update: function(t, e) {
						m.d.enable.update(t, function() {
							return !m.a.c(e())
						})
					}
				}, m.d.event = {
					init: function(t, e, i, n, r) {
						var o = e() || {};
						m.a.D(o, function(o) {
							"string" == typeof o && m.a.p(t, o, function(t) {
								var a, s = e()[o];
								if (s) {
									try {
										var l = m.a.V(arguments);
										n = r.$data, l.unshift(n), a = s.apply(n, l)
									} finally {
										!0 !== a && (t.preventDefault ? t.preventDefault() : t.returnValue = !1)
									}!1 === i.get(o + "Bubble") && (t.cancelBubble = !0, t.stopPropagation && t.stopPropagation())
								}
							})
						})
					}
				}, m.d.foreach = {
					ic: function(t) {
						return function() {
							var e = t(),
								i = m.a.zb(e);
							return i && "number" != typeof i.length ? (m.a.c(e), {
								foreach: i.data,
								as: i.as,
								includeDestroyed: i.includeDestroyed,
								afterAdd: i.afterAdd,
								beforeRemove: i.beforeRemove,
								afterRender: i.afterRender,
								beforeMove: i.beforeMove,
								afterMove: i.afterMove,
								templateEngine: m.W.sb
							}) : {
								foreach: e,
								templateEngine: m.W.sb
							}
						}
					},
					init: function(t, e) {
						return m.d.template.init(t, m.d.foreach.ic(e))
					},
					update: function(t, e, i, n, r) {
						return m.d.template.update(t, m.d.foreach.ic(e), i, n, r)
					}
				}, m.h.ta.foreach = !1, m.f.Z.foreach = !0, m.d.hasfocus = {
					init: function(t, e, i) {
						function n(n) {
							t.__ko_hasfocusUpdating = !0;
							var r = t.ownerDocument;
							if ("activeElement" in r) {
								var o;
								try {
									o = r.activeElement
								} catch (a) {
									o = r.body
								}
								n = o === t
							}
							r = e(), m.h.Ea(r, i, "hasfocus", n, !0), t.__ko_hasfocusLastValue = n, t.__ko_hasfocusUpdating = !1
						}
						var r = n.bind(null, !0),
							o = n.bind(null, !1);
						m.a.p(t, "focus", r), m.a.p(t, "focusin", r), m.a.p(t, "blur", o), m.a.p(t, "focusout", o)
					},
					update: function(t, e) {
						var i = !! m.a.c(e());
						t.__ko_hasfocusUpdating || t.__ko_hasfocusLastValue === i || (i ? t.focus() : t.blur(), !i && t.__ko_hasfocusLastValue && t.ownerDocument.body.focus(), m.l.w(m.a.Da, null, [t, i ? "focusin" : "focusout"]))
					}
				}, m.h.ea.hasfocus = !0, m.d.hasFocus = m.d.hasfocus, m.h.ea.hasFocus = !0, m.d.html = {
					init: function() {
						return {
							controlsDescendantBindings: !0
						}
					},
					update: function(t, e) {
						m.a.Cb(t, e())
					}
				}, f("if"), f("ifnot", !1, !0), f("with", !0, !1, function(t, e) {
					return t.createChildContext(e)
				});
				var D = {};
				m.d.options = {
					init: function(t) {
						if ("select" !== m.a.A(t)) throw Error("options binding applies only to SELECT elements");
						for (; 0 < t.length;) t.remove(0);
						return {
							controlsDescendantBindings: !0
						}
					},
					update: function(e, i, n) {
						function r() {
							return m.a.Ka(e.options, function(t) {
								return t.selected
							})
						}
						function o(t, e, i) {
							var n = typeof e;
							return "function" == n ? e(t) : "string" == n ? t[e] : i
						}
						function a(t, i) {
							if (f && c) m.j.ha(e, m.a.c(n.get("value")), !0);
							else if (p.length) {
								var r = 0 <= m.a.o(p, m.j.u(i[0]));
								m.a.sc(i[0], r), f && !r && m.l.w(m.a.Da, null, [e, "change"])
							}
						}
						var s = e.multiple,
							l = 0 != e.length && s ? e.scrollTop : null,
							u = m.a.c(i()),
							c = n.get("valueAllowUnset") && n.has("value"),
							h = n.get("optionsIncludeDestroyed");
						i = {};
						var d, p = [];
						c || (s ? p = m.a.fb(r(), m.j.u) : 0 <= e.selectedIndex && p.push(m.j.u(e.options[e.selectedIndex]))), u && ("undefined" == typeof u.length && (u = [u]), d = m.a.Ka(u, function(e) {
							return h || e === t || null === e || !m.a.c(e._destroy)
						}), n.has("optionsCaption") && (u = m.a.c(n.get("optionsCaption")), null !== u && u !== t && d.unshift(D)));
						var f = !1;
						i.beforeRemove = function(t) {
							e.removeChild(t)
						}, u = a, n.has("optionsAfterRender") && "function" == typeof n.get("optionsAfterRender") && (u = function(e, i) {
							a(0, i), m.l.w(n.get("optionsAfterRender"), null, [i[0], e !== D ? e : t])
						}), m.a.Bb(e, d, function(i, r, a) {
							return a.length && (p = !c && a[0].selected ? [m.j.u(a[0])] : [], f = !0), r = e.ownerDocument.createElement("option"), i === D ? (m.a.Za(r, n.get("optionsCaption")), m.j.ha(r, t)) : (a = o(i, n.get("optionsValue"), i), m.j.ha(r, m.a.c(a)), i = o(i, n.get("optionsText"), a), m.a.Za(r, i)), [r]
						}, i, u), m.l.w(function() {
							c ? m.j.ha(e, m.a.c(n.get("value")), !0) : (s ? p.length && r().length < p.length : p.length && 0 <= e.selectedIndex ? m.j.u(e.options[e.selectedIndex]) !== p[0] : p.length || 0 <= e.selectedIndex) && m.a.Da(e, "change")
						}), m.a.Nc(e), l && 20 < Math.abs(l - e.scrollTop) && (e.scrollTop = l)
					}
				}, m.d.options.xb = m.a.e.I(), m.d.selectedOptions = {
					after: ["options", "foreach"],
					init: function(t, e, i) {
						m.a.p(t, "change", function() {
							var n = e(),
								r = [];
							m.a.q(t.getElementsByTagName("option"), function(t) {
								t.selected && r.push(m.j.u(t))
							}), m.h.Ea(n, i, "selectedOptions", r)
						})
					},
					update: function(t, e) {
						if ("select" != m.a.A(t)) throw Error("values binding applies only to SELECT elements");
						var i = m.a.c(e()),
							n = t.scrollTop;
						i && "number" == typeof i.length && m.a.q(t.getElementsByTagName("option"), function(t) {
							var e = 0 <= m.a.o(i, m.j.u(t));
							t.selected != e && m.a.sc(t, e)
						}), t.scrollTop = n
					}
				}, m.h.ea.selectedOptions = !0, m.d.style = {
					update: function(e, i) {
						var n = m.a.c(i() || {});
						m.a.D(n, function(i, n) {
							n = m.a.c(n), null !== n && n !== t && !1 !== n || (n = ""), e.style[i] = n
						})
					}
				}, m.d.submit = {
					init: function(t, e, i, n, r) {
						if ("function" != typeof e()) throw Error("The value for a submit binding must be a function");
						m.a.p(t, "submit", function(i) {
							var n, o = e();
							try {
								n = o.call(r.$data, t)
							} finally {
								!0 !== n && (i.preventDefault ? i.preventDefault() : i.returnValue = !1)
							}
						})
					}
				}, m.d.text = {
					init: function() {
						return {
							controlsDescendantBindings: !0
						}
					},
					update: function(t, e) {
						m.a.Za(t, e())
					}
				}, m.f.Z.text = !0, function() {
					if (e && e.navigator) var i = function(t) {
							if (t) return parseFloat(t[1])
						},
						n = e.opera && e.opera.version && parseInt(e.opera.version()),
						r = e.navigator.userAgent,
						o = i(r.match(/^(?:(?!chrome).)*version\/([^ ]*) safari/i)),
						a = i(r.match(/Firefox\/([^ ]*)/));
					if (10 > m.a.C) var s = m.a.e.I(),
						l = m.a.e.I(),
						u = function(t) {
							var e = this.activeElement;
							(e = e && m.a.e.get(e, l)) && e(t)
						},
						c = function(t, e) {
							var i = t.ownerDocument;
							m.a.e.get(i, s) || (m.a.e.set(i, s, !0), m.a.p(i, "selectionchange", u)), m.a.e.set(t, l, e)
						};
					m.d.textInput = {
						init: function(e, i, r) {
							function s(t, i) {
								m.a.p(e, t, i)
							}
							function l() {
								var n = m.a.c(i());
								null !== n && n !== t || (n = ""), p !== t && n === p ? m.a.setTimeout(l, 4) : e.value !== n && (f = n, e.value = n)
							}
							function u() {
								d || (p = e.value, d = m.a.setTimeout(h, 4))
							}
							function h() {
								clearTimeout(d), p = d = t;
								var n = e.value;
								f !== n && (f = n, m.h.Ea(i(), r, "textInput", n))
							}
							var d, p, f = e.value,
								g = 9 == m.a.C ? u : h;
							10 > m.a.C ? (s("propertychange", function(t) {
								"value" === t.propertyName && g(t)
							}), 8 == m.a.C && (s("keyup", h), s("keydown", h)), 8 <= m.a.C && (c(e, g), s("dragend", u))) : (s("input", h), 5 > o && "textarea" === m.a.A(e) ? (s("keydown", u), s("paste", u), s("cut", u)) : 11 > n ? s("keydown", u) : 4 > a && (s("DOMAutoComplete", h), s("dragdrop", h), s("drop", h))), s("change", h), m.m(l, null, {
								i: e
							})
						}
					}, m.h.ea.textInput = !0, m.d.textinput = {
						preprocess: function(t, e, i) {
							i("textInput", t)
						}
					}
				}(), m.d.uniqueName = {
					init: function(t, e) {
						if (e()) {
							var i = "ko_unique_" + ++m.d.uniqueName.Ic;
							m.a.rc(t, i)
						}
					}
				}, m.d.uniqueName.Ic = 0, m.d.value = {
					after: ["options", "foreach"],
					init: function(t, e, i) {
						if ("input" != t.tagName.toLowerCase() || "checkbox" != t.type && "radio" != t.type) {
							var n = ["change"],
								r = i.get("valueUpdate"),
								o = !1,
								a = null;
							r && ("string" == typeof r && (r = [r]), m.a.ra(n, r), n = m.a.Tb(n));
							var s = function() {
									a = null, o = !1;
									var n = e(),
										r = m.j.u(t);
									m.h.Ea(n, i, "value", r)
								};
							!m.a.C || "input" != t.tagName.toLowerCase() || "text" != t.type || "off" == t.autocomplete || t.form && "off" == t.form.autocomplete || -1 != m.a.o(n, "propertychange") || (m.a.p(t, "propertychange", function() {
								o = !0
							}), m.a.p(t, "focus", function() {
								o = !1
							}), m.a.p(t, "blur", function() {
								o && s()
							})), m.a.q(n, function(e) {
								var i = s;
								m.a.nd(e, "after") && (i = function() {
									a = m.j.u(t), m.a.setTimeout(s, 0)
								}, e = e.substring(5)), m.a.p(t, e, i)
							});
							var l = function() {
									var n = m.a.c(e()),
										r = m.j.u(t);
									if (null !== a && n === a) m.a.setTimeout(l, 0);
									else if (n !== r) if ("select" === m.a.A(t)) {
										var o = i.get("valueAllowUnset"),
											r = function() {
												m.j.ha(t, n, o)
											};
										r(), o || n === m.j.u(t) ? m.a.setTimeout(r, 0) : m.l.w(m.a.Da, null, [t, "change"])
									} else m.j.ha(t, n)
								};
							m.m(l, null, {
								i: t
							})
						} else m.Ja(t, {
							checkedValue: e
						})
					},
					update: function() {}
				}, m.h.ea.value = !0, m.d.visible = {
					update: function(t, e) {
						var i = m.a.c(e()),
							n = "none" != t.style.display;
						i && !n ? t.style.display = "" : !i && n && (t.style.display = "none")
					}
				}, function(t) {
					m.d[t] = {
						init: function(e, i, n, r, o) {
							return m.d.event.init.call(this, e, function() {
								var e = {};
								return e[t] = i(), e
							}, n, r, o)
						}
					}
				}("click"), m.O = function() {}, m.O.prototype.renderTemplateSource = function() {
					throw Error("Override renderTemplateSource")
				}, m.O.prototype.createJavaScriptEvaluatorBlock = function() {
					throw Error("Override createJavaScriptEvaluatorBlock")
				}, m.O.prototype.makeTemplateSource = function(t, e) {
					if ("string" == typeof t) {
						e = e || n;
						var i = e.getElementById(t);
						if (!i) throw Error("Cannot find template with ID " + t);
						return new m.v.n(i)
					}
					if (1 == t.nodeType || 8 == t.nodeType) return new m.v.qa(t);
					throw Error("Unknown template type: " + t)
				}, m.O.prototype.renderTemplate = function(t, e, i, n) {
					return t = this.makeTemplateSource(t, n), this.renderTemplateSource(t, e, i, n)
				}, m.O.prototype.isTemplateRewritten = function(t, e) {
					return !1 === this.allowTemplateRewriting || this.makeTemplateSource(t, e).data("isRewritten")
				}, m.O.prototype.rewriteTemplate = function(t, e, i) {
					t = this.makeTemplateSource(t, i), e = e(t.text()), t.text(e), t.data("isRewritten", !0)
				}, m.b("templateEngine", m.O), m.Gb = function() {
					function t(t, e, i, n) {
						t = m.h.yb(t);
						for (var r = m.h.ta, o = 0; o < t.length; o++) {
							var a = t[o].key;
							if (r.hasOwnProperty(a)) {
								var s = r[a];
								if ("function" == typeof s) {
									if (a = s(t[o].value)) throw Error(a)
								} else if (!s) throw Error("This template engine does not support the '" + a + "' binding within its templates")
							}
						}
						return i = "ko.__tr_ambtns(function($context,$element){return(function(){return{ " + m.h.Ua(t, {
							valueAccessors: !0
						}) + " } })()},'" + i.toLowerCase() + "')", n.createJavaScriptEvaluatorBlock(i) + e
					}
					var e = /(<([a-z]+\d*)(?:\s+(?!data-bind\s*=\s*)[a-z0-9\-]+(?:=(?:\"[^\"]*\"|\'[^\']*\'|[^>]*))?)*\s+)data-bind\s*=\s*(["'])([\s\S]*?)\3/gi,
						i = /\x3c!--\s*ko\b\s*([\s\S]*?)\s*--\x3e/g;
					return {
						Oc: function(t, e, i) {
							e.isTemplateRewritten(t, i) || e.rewriteTemplate(t, function(t) {
								return m.Gb.dd(t, e)
							}, i)
						},
						dd: function(n, r) {
							return n.replace(e, function(e, i, n, o, a) {
								return t(a, i, n, r)
							}).replace(i, function(e, i) {
								return t(i, "<!-- ko -->", "#comment", r)
							})
						},
						Ec: function(t, e) {
							return m.M.wb(function(i, n) {
								var r = i.nextSibling;
								r && r.nodeName.toLowerCase() === e && m.Ja(r, t, n)
							})
						}
					}
				}(), m.b("__tr_ambtns", m.Gb.Ec), function() {
					m.v = {}, m.v.n = function(t) {
						if (this.n = t) {
							var e = m.a.A(t);
							this.ab = "script" === e ? 1 : "textarea" === e ? 2 : "template" == e && t.content && 11 === t.content.nodeType ? 3 : 4
						}
					}, m.v.n.prototype.text = function() {
						var t = 1 === this.ab ? "text" : 2 === this.ab ? "value" : "innerHTML";
						if (0 == arguments.length) return this.n[t];
						var e = arguments[0];
						"innerHTML" === t ? m.a.Cb(this.n, e) : this.n[t] = e
					};
					var e = m.a.e.I() + "_";
					m.v.n.prototype.data = function(t) {
						return 1 === arguments.length ? m.a.e.get(this.n, e + t) : void m.a.e.set(this.n, e + t, arguments[1])
					};
					var i = m.a.e.I();
					m.v.n.prototype.nodes = function() {
						var e = this.n;
						return 0 == arguments.length ? (m.a.e.get(e, i) || {}).jb || (3 === this.ab ? e.content : 4 === this.ab ? e : t) : void m.a.e.set(e, i, {
							jb: arguments[0]
						})
					}, m.v.qa = function(t) {
						this.n = t
					}, m.v.qa.prototype = new m.v.n, m.v.qa.prototype.text = function() {
						if (0 == arguments.length) {
							var e = m.a.e.get(this.n, i) || {};
							return e.Hb === t && e.jb && (e.Hb = e.jb.innerHTML), e.Hb
						}
						m.a.e.set(this.n, i, {
							Hb: arguments[0]
						})
					}, m.b("templateSources", m.v), m.b("templateSources.domElement", m.v.n), m.b("templateSources.anonymousTemplate", m.v.qa)
				}(), function() {
					function e(t, e, i) {
						var n;
						for (e = m.f.nextSibling(e); t && (n = t) !== e;) t = m.f.nextSibling(n), i(n, t)
					}
					function i(t, i) {
						if (t.length) {
							var n = t[0],
								r = t[t.length - 1],
								o = n.parentNode,
								a = m.Q.instance,
								s = a.preprocessNode;
							if (s) {
								if (e(n, r, function(t, e) {
									var i = t.previousSibling,
										o = s.call(a, t);
									o && (t === n && (n = o[0] || e), t === r && (r = o[o.length - 1] || i))
								}), t.length = 0, !n) return;
								n === r ? t.push(n) : (t.push(n, r), m.a.za(t, o))
							}
							e(n, r, function(t) {
								1 !== t.nodeType && 8 !== t.nodeType || m.Rb(i, t)
							}), e(n, r, function(t) {
								1 !== t.nodeType && 8 !== t.nodeType || m.M.yc(t, [i])
							}), m.a.za(t, o)
						}
					}
					function n(t) {
						return t.nodeType ? t : 0 < t.length ? t[0] : null
					}
					function r(t, e, r, o, s) {
						s = s || {};
						var l = (t && n(t) || r || {}).ownerDocument,
							u = s.templateEngine || a;
						if (m.Gb.Oc(r, u, l), r = u.renderTemplate(r, o, s, l), "number" != typeof r.length || 0 < r.length && "number" != typeof r[0].nodeType) throw Error("Template engine must return an array of DOM nodes");
						switch (l = !1, e) {
						case "replaceChildren":
							m.f.da(t, r), l = !0;
							break;
						case "replaceNode":
							m.a.qc(t, r), l = !0;
							break;
						case "ignoreTargetNode":
							break;
						default:
							throw Error("Unknown renderMode: " + e)
						}
						return l && (i(r, o), s.afterRender && m.l.w(s.afterRender, null, [r, o.$data])), r
					}
					function o(t, e, i) {
						return m.H(t) ? t() : "function" == typeof t ? t(e, i) : t
					}
					var a;
					m.Db = function(e) {
						if (e != t && !(e instanceof m.O)) throw Error("templateEngine must inherit from ko.templateEngine");
						a = e
					}, m.Ab = function(e, i, s, l, u) {
						if (s = s || {}, (s.templateEngine || a) == t) throw Error("Set a template engine before calling renderTemplate");
						if (u = u || "replaceChildren", l) {
							var c = n(l);
							return m.B(function() {
								var t = i && i instanceof m.U ? i : new m.U(m.a.c(i)),
									a = o(e, t.$data, t),
									t = r(l, u, a, t, s);
								"replaceNode" == u && (l = t, c = n(l))
							}, null, {
								wa: function() {
									return !c || !m.a.nb(c)
								},
								i: c && "replaceNode" == u ? c.parentNode : c
							})
						}
						return m.M.wb(function(t) {
							m.Ab(e, i, s, t, "replaceNode")
						})
					}, m.kd = function(e, n, a, s, l) {
						function u(t, e) {
							i(e, h), a.afterRender && a.afterRender(e, t), h = null
						}
						function c(t, i) {
							h = l.createChildContext(t, a.as, function(t) {
								t.$index = i
							});
							var n = o(e, t, h);
							return r(null, "ignoreTargetNode", n, h, a)
						}
						var h;
						return m.B(function() {
							var e = m.a.c(n) || [];
							"undefined" == typeof e.length && (e = [e]), e = m.a.Ka(e, function(e) {
								return a.includeDestroyed || e === t || null === e || !m.a.c(e._destroy)
							}), m.l.w(m.a.Bb, null, [s, e, c, a, u])
						}, null, {
							i: s
						})
					};
					var s = m.a.e.I();
					m.d.template = {
						init: function(t, e) {
							var i = m.a.c(e());
							if ("string" == typeof i || i.name) m.f.xa(t);
							else {
								if ("nodes" in i) {
									if (i = i.nodes || [], m.H(i)) throw Error('The "nodes" option must be a plain, non-observable array.')
								} else i = m.f.childNodes(t);
								i = m.a.jc(i), new m.v.qa(t).nodes(i)
							}
							return {
								controlsDescendantBindings: !0
							}
						},
						update: function(e, i, n, r, o) {
							var a, l = i();
							i = m.a.c(l), n = !0, r = null, "string" == typeof i ? i = {} : (l = i.name, "if" in i && (n = m.a.c(i["if"])), n && "ifnot" in i && (n = !m.a.c(i.ifnot)), a = m.a.c(i.data)), "foreach" in i ? r = m.kd(l || e, n && i.foreach || [], i, e, o) : n ? (o = "data" in i ? o.createChildContext(a, i.as) : o, r = m.Ab(l || e, o, i, e)) : m.f.xa(e), o = r, (a = m.a.e.get(e, s)) && "function" == typeof a.k && a.k(), m.a.e.set(e, s, o && o.ba() ? o : t)
						}
					}, m.h.ta.template = function(t) {
						return t = m.h.yb(t), 1 == t.length && t[0].unknown || m.h.ad(t, "name") ? null : "This template engine does not support anonymous templates nested within its templates"
					}, m.f.Z.template = !0
				}(), m.b("setTemplateEngine", m.Db), m.b("renderTemplate", m.Ab), m.a.dc = function(t, e, i) {
					if (t.length && e.length) {
						var n, r, o, a, s;
						for (n = r = 0;
						(!i || n < i) && (a = t[r]); ++r) {
							for (o = 0; s = e[o]; ++o) if (a.value === s.value) {
								a.moved = s.index, s.moved = a.index, e.splice(o, 1), n = o = 0;
								break
							}
							n += o
						}
					}
				}, m.a.ib = function() {
					function t(t, e, i, n, r) {
						var o, a, s, l, u, c = Math.min,
							h = Math.max,
							d = [],
							p = t.length,
							f = e.length,
							g = f - p || 1,
							v = p + f + 1;
						for (o = 0; o <= p; o++) for (l = s, d.push(s = []), u = c(f, o + g), a = h(0, o - 1); a <= u; a++) s[a] = a ? o ? t[o - 1] === e[a - 1] ? l[a - 1] : c(l[a] || v, s[a - 1] || v) + 1 : a + 1 : o + 1;
						for (c = [], h = [], g = [], o = p, a = f; o || a;) f = d[o][a] - 1, a && f === d[o][a - 1] ? h.push(c[c.length] = {
							status: i,
							value: e[--a],
							index: a
						}) : o && f === d[o - 1][a] ? g.push(c[c.length] = {
							status: n,
							value: t[--o],
							index: o
						}) : (--a, --o, r.sparse || c.push({
							status: "retained",
							value: e[a]
						}));
						return m.a.dc(g, h, !r.dontLimitMoves && 10 * p), c.reverse()
					}
					return function(e, i, n) {
						return n = "boolean" == typeof n ? {
							dontLimitMoves: n
						} : n || {}, e = e || [], i = i || [], e.length < i.length ? t(e, i, "added", "deleted", n) : t(i, e, "deleted", "added", n)
					}
				}(), m.b("utils.compareArrays", m.a.ib), function() {
					function e(e, i, n, r, o) {
						var a = [],
							s = m.B(function() {
								var t = i(n, o, m.a.za(a, e)) || [];
								0 < a.length && (m.a.qc(a, t), r && m.l.w(r, null, [n, t, o])), a.length = 0, m.a.ra(a, t)
							}, null, {
								i: e,
								wa: function() {
									return !m.a.Qb(a)
								}
							});
						return {
							ca: a,
							B: s.ba() ? s : t
						}
					}
					var i = m.a.e.I(),
						n = m.a.e.I();
					m.a.Bb = function(r, o, a, s, l) {
						function u(t, e) {
							w = d[e], _ !== e && (E[t] = w), w.qb(_++), m.a.za(w.ca, r), g.push(w), b.push(w)
						}
						function c(t, e) {
							if (t) for (var i = 0, n = e.length; i < n; i++) e[i] && m.a.q(e[i].ca, function(n) {
								t(n, i, e[i].ja)
							})
						}
						o = o || [], s = s || {};
						var h = m.a.e.get(r, i) === t,
							d = m.a.e.get(r, i) || [],
							p = m.a.fb(d, function(t) {
								return t.ja
							}),
							f = m.a.ib(p, o, s.dontLimitMoves),
							g = [],
							v = 0,
							_ = 0,
							y = [],
							b = [];
						o = [];
						for (var w, C, x, E = [], p = [], k = 0; C = f[k]; k++) switch (x = C.moved, C.status) {
						case "deleted":
							x === t && (w = d[v], w.B && (w.B.k(), w.B = t), m.a.za(w.ca, r).length && (s.beforeRemove && (g.push(w), b.push(w), w.ja === n ? w = null : o[k] = w), w && y.push.apply(y, w.ca))), v++;
							break;
						case "retained":
							u(k, v++);
							break;
						case "added":
							x !== t ? u(k, x) : (w = {
								ja: C.value,
								qb: m.N(_++)
							}, g.push(w), b.push(w), h || (p[k] = w))
						}
						m.a.e.set(r, i, g), c(s.beforeMove, E), m.a.q(y, s.beforeRemove ? m.$ : m.removeNode);
						for (var L, k = 0, h = m.f.firstChild(r); w = b[k]; k++) {
							for (w.ca || m.a.extend(w, e(r, a, w.ja, l, w.qb)), v = 0; f = w.ca[v]; h = f.nextSibling, L = f, v++) f !== h && m.f.gc(r, f, L);
							!w.Wc && l && (l(w.ja, w.ca, w.qb), w.Wc = !0)
						}
						for (c(s.beforeRemove, o), k = 0; k < o.length; ++k) o[k] && (o[k].ja = n);
						c(s.afterMove, E), c(s.afterAdd, p)
					}
				}(), m.b("utils.setDomNodeChildrenFromArrayMapping", m.a.Bb), m.W = function() {
					this.allowTemplateRewriting = !1
				}, m.W.prototype = new m.O, m.W.prototype.renderTemplateSource = function(t, e, i, n) {
					return (e = (9 > m.a.C ? 0 : t.nodes) ? t.nodes() : null) ? m.a.V(e.cloneNode(!0).childNodes) : (t = t.text(), m.a.ma(t, n))
				}, m.W.sb = new m.W, m.Db(m.W.sb), m.b("nativeTemplateEngine", m.W), function() {
					m.vb = function() {
						var t = this.$c = function() {
								if (!o || !o.tmpl) return 0;
								try {
									if (0 <= o.tmpl.tag.tmpl.open.toString().indexOf("__")) return 2
								} catch (t) {}
								return 1
							}();
						this.renderTemplateSource = function(e, i, r, a) {
							if (a = a || n, r = r || {}, 2 > t) throw Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later.");
							var s = e.data("precompiled");
							return s || (s = e.text() || "", s = o.template(null, "{{ko_with $item.koBindingContext}}" + s + "{{/ko_with}}"), e.data("precompiled", s)), e = [i.$data], i = o.extend({
								koBindingContext: i
							}, r.templateOptions), i = o.tmpl(s, e, i), i.appendTo(a.createElement("div")), o.fragments = {}, i
						}, this.createJavaScriptEvaluatorBlock = function(t) {
							return "{{ko_code ((function() { return " + t + " })()) }}"
						}, this.addTemplate = function(t, e) {
							n.write("<script type='text/html' id='" + t + "'>" + e + "</script>")
						}, 0 < t && (o.tmpl.tag.ko_code = {
							open: "__.push($1 || '');"
						}, o.tmpl.tag.ko_with = {
							open: "with($1) {",
							close: "} "
						})
					}, m.vb.prototype = new m.O;
					var t = new m.vb;
					0 < t.$c && m.Db(t), m.b("jqueryTmplTemplateEngine", m.vb)
				}()
			})
		}()
	}(), !
	function(t, n) {
		"use strict";

		function r(t, e) {
			if (!t || "object" != typeof t) throw new Error("When calling ko.track, you must pass an object as the first parameter.");
			var i;
			return c(e) ? (e.deep = e.deep || !1, e.fields = e.fields || Object.getOwnPropertyNames(t), e.lazy = e.lazy || !1, u(t, e.fields, e)) : (i = e || Object.getOwnPropertyNames(t), u(t, i, {})), t
		}
		function o(t) {
			return t.name ? t.name : (t.toString().trim().match(D) || [])[1]
		}
		function a(t) {
			return t && "object" == typeof t && "Object" === o(t.constructor)
		}
		function s(t, e, i) {
			var r = E.isObservable(t),
				o = !r && Array.isArray(t),
				a = r ? t : o ? E.observableArray(t) : E.observable(t);
			return i[e] = function() {
				return a
			}, (o || r && "push" in a) && f(E, a), {
				configurable: !0,
				enumerable: !0,
				get: a,
				set: E.isWriteableObservable(a) ? a : n
			}
		}
		function l(t, e, i) {
			function n(t, e) {
				return r ? e ? r(t) : r : Array.isArray(t) ? (r = E.observableArray(t), f(E, r), r) : r = E.observable(t)
			}
			if (E.isObservable(t)) return s(t, e, i);
			var r;
			return i[e] = function() {
				return n(t)
			}, {
				configurable: !0,
				enumerable: !0,
				get: function() {
					return n(t)()
				},
				set: function(t) {
					n(t, !0)
				}
			}
		}
		function u(t, e, i) {
			if (e.length) {
				var n = h(t, !0),
					r = {};
				e.forEach(function(e) {
					if (!(e in n) && Object.getOwnPropertyDescriptor(t, e).configurable !== !1) {
						var o = t[e];
						r[e] = (i.lazy ? l : s)(o, e, n), i.deep && a(o) && u(o, Object.keys(o), i)
					}
				}), Object.defineProperties(t, r)
			}
		}
		function c(t) {
			return !!t && "object" == typeof t && t.constructor === Object
		}
		function h(t, e) {
			k || (k = P());
			var i = k.get(t);
			return !i && e && (i = {}, k.set(t, i)), i
		}
		function d(t, e) {
			if (k) if (1 === arguments.length) k["delete"](t);
			else {
				var i = h(t, !1);
				i && e.forEach(function(t) {
					delete i[t]
				})
			}
		}
		function p(t, e, i) {
			var n = this,
				o = {
					owner: t,
					deferEvaluation: !0
				};
			if ("function" == typeof i) o.read = i;
			else {
				if ("value" in i) throw new Error('For ko.defineProperty, you must not specify a "value" for the property. You must provide a "get" function.');
				if ("function" != typeof i.get) throw new Error('For ko.defineProperty, the third parameter must be either an evaluator function, or an options object containing a function called "get".');
				o.read = i.get, o.write = i.set
			}
			return t[e] = n.computed(o), r.call(n, t, [e]), t
		}
		function f(t, e) {
			var i = null;
			t.computed(function() {
				i && (i.dispose(), i = null);
				var n = e();
				n instanceof Array && (i = m(t, e, n))
			})
		}
		function m(t, e, i) {
			var n = g(t, i);
			return n.subscribe(e)
		}
		function g(t, e) {
			L || (L = P());
			var i = L.get(e);
			if (!i) {
				i = new t.subscribable, L.set(e, i);
				var n = {};
				v(e, i, n), _(t, e, i, n)
			}
			return i
		}
		function v(t, e, i) {
			["pop", "push", "reverse", "shift", "sort", "splice", "unshift"].forEach(function(n) {
				var r = t[n];
				t[n] = function() {
					var t = r.apply(this, arguments);
					return i.pause !== !0 && e.notifySubscribers(this), t
				}
			})
		}
		function _(t, e, i, n) {
			["remove", "removeAll", "destroy", "destroyAll", "replace"].forEach(function(r) {
				Object.defineProperty(e, r, {
					enumerable: !1,
					value: function() {
						var o;
						n.pause = !0;
						try {
							o = t.observableArray.fn[r].apply(t.observableArray(e), arguments)
						} finally {
							n.pause = !1
						}
						return i.notifySubscribers(e), o
					}
				})
			})
		}
		function y(t, e) {
			if (!t || "object" != typeof t) return null;
			var i = h(t, !1);
			return i && e in i ? i[e]() : null
		}
		function b(t, e) {
			if (!t || "object" != typeof t) return !1;
			var i = h(t, !1);
			return !!i && e in i
		}
		function w(t, e) {
			var i = y(t, e);
			i && i.valueHasMutated()
		}
		function C(t) {
			t.track = r, t.untrack = d, t.getObservable = y, t.valueHasMutated = w, t.defineProperty = p, t.es5 = {
				getAllObservablesForObject: h,
				notifyWhenPresentOrFutureArrayValuesMutate: f,
				isTracked: b
			}
		}
		function x() {
			if ("object" == typeof exports && "object" == typeof module) {
				E = e("knockout");
				var n = e("../lib/weakmap");
				C(E), P = function() {
					return new n
				}, module.exports = E
			} else "function" == typeof i && i.amd ? i("KnockoutES5", ["knockout"], function(e) {
				return E = e, C(e), P = function() {
					return new t.WeakMap
				}, e
			}) : "ko" in t && (E = t.ko, C(t.ko), P = function() {
				return new t.WeakMap
			})
		}
		var E, k, L, P, D = /^function\s*([^\s(]+)/;
		x()
	}(this), void
	function(t, e, i) {
		function n(t, e, i) {
			return "function" == typeof e && (i = e, e = r(i).replace(/_$/, "")), u(t, e, {
				configurable: !0,
				writable: !0,
				value: i
			})
		}
		function r(t) {
			return "function" != typeof t ? "" : "_name" in t ? t._name : "name" in t ? t.name : c.call(t).match(p)[1]
		}
		function o(t, e) {
			return e._name = t, e
		}
		function a(t) {
			function e(e, r) {
				return r || 2 === arguments.length ? n.set(e, r) : (r = n.get(e), r === i && (r = t(e), n.set(e, r))), r
			}
			var n = new m;
			return t || (t = g), e
		}
		var s = Object.getOwnPropertyNames,
			l = "object" == typeof window ? Object.getOwnPropertyNames(window) : [],
			u = Object.defineProperty,
			c = Function.prototype.toString,
			h = Object.create,
			d = Object.prototype.hasOwnProperty,
			p = /^\n?function\s?(\w*)?_?\(/,
			f = function() {
				function t() {
					var t = a(),
						i = {};
					this.unlock = function(n) {
						var r = p(n);
						if (d.call(r, t)) return r[t](i);
						var o = h(null, e);
						return u(r, t, {
							value: function(t) {
								return t === i ? o : void 0
							}
						}), o
					}
				}
				var e = {
					value: {
						writable: !0,
						value: i
					}
				},
					r = h(null),
					a = function() {
						var t = Math.random().toString(36).slice(2);
						return t in r ? a() : r[t] = t
					},
					c = a(),
					p = function(t) {
						if (d.call(t, c)) return t[c];
						if (!Object.isExtensible(t)) throw new TypeError("Object must be extensible");
						var e = h(null);
						return u(t, c, {
							value: e
						}), e
					};
				return n(Object, o("getOwnPropertyNames", function(t) {
					var e, i = Object(t);
					if (i !== Window.prototype && "toString" in i && "[object Window]" === i.toString()) try {
						e = s(t)
					} catch (n) {
						e = l
					} else e = s(t);
					return d.call(t, c) && e.splice(e.indexOf(c), 1), e
				})), n(t.prototype, o("get", function(t) {
					return this.unlock(t).value
				})), n(t.prototype, o("set", function(t, e) {
					this.unlock(t).value = e
				})), t
			}(),
			m = function(a) {
				function s(e) {
					return this === t || null == this || this === s.prototype ? new s(e) : (m(this, new f), void v(this, e))
				}
				function l(t) {
					p(t);
					var n = g(this).get(t);
					return n === e ? i : n
				}
				function u(t, n) {
					p(t), g(this).set(t, n === i ? e : n)
				}
				function c(t) {
					return p(t), g(this).get(t) !== i
				}
				function h(t) {
					p(t);
					var e = g(this),
						n = e.get(t) !== i;
					return e.set(t, i), n
				}
				function d() {
					return g(this), "[object WeakMap]"
				}
				var p = function(t) {
						if (null == t || "object" != typeof t && "function" != typeof t) throw new TypeError("Invalid WeakMap key")
					},
					m = function(t, e) {
						var i = a.unlock(t);
						if (i.value) throw new TypeError("Object is already a WeakMap");
						i.value = e
					},
					g = function(t) {
						var e = a.unlock(t).value;
						if (!e) throw new TypeError("WeakMap is not generic");
						return e
					},
					v = function(t, e) {
						null !== e && "object" == typeof e && "function" == typeof e.forEach && e.forEach(function(i, n) {
							i instanceof Array && 2 === i.length && u.call(t, e[n][0], e[n][1])
						})
					};
				l._name = "get", u._name = "set", c._name = "has", d._name = "toString";
				var _ = ("" + Object).split("Object"),
					y = o("toString", function() {
						return _[0] + r(this) + _[1]
					});
				n(y, y);
				var b = {
					__proto__: []
				}
				instanceof Array ?
				function(t) {
					t.__proto__ = y
				} : function(t) {
					n(t, y)
				};
				return b(s), [d, l, u, c, h].forEach(function(t) {
					n(s.prototype, t), b(t)
				}), s
			}(new f),
			g = Object.create ?
		function() {
			return Object.create(null)
		} : function() {
			return {}
		};
		"undefined" != typeof module ? module.exports = m : "undefined" != typeof exports ? exports.WeakMap = m : "WeakMap" in t || (t.WeakMap = m), m.createStorage = a, t.WeakMap && (t.WeakMap.createStorage = a)
	}(function() {
		return this
	}()), !
	function(t) {
		if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
		else if ("function" == typeof i && i.amd) i("markdown-it-sanitizer", [], t);
		else {
			var e;
			e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.markdownitSanitizer = t()
		}
	}(function() {
		return function t(i, n, r) {
			function o(s, l) {
				if (!n[s]) {
					if (!i[s]) {
						var u = "function" == typeof e && e;
						if (!l && u) return u(s, !0);
						if (a) return a(s, !0);
						var c = new Error("Cannot find module '" + s + "'");
						throw c.code = "MODULE_NOT_FOUND", c
					}
					var h = n[s] = {
						exports: {}
					};
					i[s][0].call(h.exports, function(t) {
						var e = i[s][1][t];
						return o(e ? e : t)
					}, h, h.exports, t, i, n, r)
				}
				return n[s].exports
			}
			for (var a = "function" == typeof e && e, s = 0; s < r.length; s++) o(r[s]);
			return o
		}({
			1: [function(t, e, i) {
				"use strict";
				e.exports = function(t, e) {
					function i(t) {
						var e = a.match(t);
						return e && 1 === e.length && 0 === e[0].index && e[0].lastIndex === t.length ? e[0].url : null
					}
					function n(t) {
						var e = '<a\\shref="([^"<>]*)"(?:\\stitle="([^"<>]*)")?>',
							n = RegExp(e, "i"),
							r = '<img\\s([^<>]*src="[^"<>]*"[^<>]*)\\s?\\/?>',
							o = RegExp(r, "i");
						return t = t.replace(/<[^<>]*>?/gi, function(t) {
							var e, r, a, l, c;
							if (/(^<->|^<-\s|^<3\s)/.test(t)) return t;
							if (e = t.match(o)) {
								var g = e[1];
								if (r = i(g.match(/src="([^"<>]*)"/i)[1]), a = g.match(/alt="([^"<>]*)"/i), a = a && "undefined" != typeof a[1] ? a[1] : "", l = g.match(/title="([^"<>]*)"/i), l = l && "undefined" != typeof l[1] ? l[1] : "", r && /^https?:\/\//i.test(r)) return "" !== h ? '<img src="' + r + '" alt="' + a + '" title="' + l + '" class="' + h + '">' : '<img src="' + r + '" alt="' + a + '" title="' + l + '">'
							}
							return c = p.indexOf("a"), e = t.match(n), e && (l = "undefined" != typeof e[2] ? e[2] : "", r = i(e[1]), r && /^(?:https?:\/\/|ftp:\/\/|mailto:|xmpp:)/i.test(r)) ? (d = !0, f[c] += 1, '<a href="' + r + '" title="' + l + '" target="_blank">') : (e = /<\/a>/i.test(t)) ? (d = !0, f[c] -= 1, f[c] < 0 && (m[c] = !0), "</a>") : (e = t.match(/<(br|hr)\s?\/?>/i)) ? "<" + e[1].toLowerCase() + ">" : (e = t.match(/<(\/?)(b|blockquote|code|em|h[1-6]|li|ol(?: start="\d+")?|p|pre|s|sub|sup|strong|ul)>/i), e && !/<\/ol start="\d+"/i.test(t) ? (d = !0, c = p.indexOf(e[2].toLowerCase().split(" ")[0]), "/" === e[1] ? f[c] -= 1 : f[c] += 1, f[c] < 0 && (m[c] = !0), "<" + e[1] + e[2].toLowerCase() + ">") : u === !0 ? "" : s(t))
						})
					}
					function r(t) {
						var e, i, r;
						for (l = 0; l < p.length; l++) f[l] = 0;
						for (l = 0; l < p.length; l++) m[l] = !1;
						for (d = !1, i = 0; i < t.tokens.length; i++) if ("html_block" === t.tokens[i].type && (t.tokens[i].content = n(t.tokens[i].content)), "inline" === t.tokens[i].type) for (r = t.tokens[i].children, e = 0; e < r.length; e++)"html_inline" === r[e].type && (r[e].content = n(r[e].content))
					}
					function o(t) {
						function e(t, e) {
							var i, n;
							return i = "a" === e ? RegExp('<a href="[^"<>]*" title="[^"<>]*" target="_blank">', "g") : "ol" === e ? /<ol(?: start="\d+")?>/g : RegExp("<" + e + ">", "g"), n = RegExp("</" + e + ">", "g"), c === !0 ? (t = t.replace(i, ""), t = t.replace(n, "")) : (t = t.replace(i, function(t) {
								return s(t)
							}), t = t.replace(n, function(t) {
								return s(t)
							})), t
						}
						function i(t) {
							var i;
							for (i = 0; i < p.length; i++) m[i] === !0 && (t = e(t, p[i]));
							return t
						}
						if (d !== !1) {
							var n, r;
							for (l = 0; l < p.length; l++) 0 !== f[l] && (m[l] = !0);
							for (n = 0; n < t.tokens.length; n++) if ("html_block" !== t.tokens[n].type) {
								if ("inline" === t.tokens[n].type) for (r = t.tokens[n].children, l = 0; l < r.length; l++)"html_inline" === r[l].type && (r[l].content = i(r[l].content))
							} else t.tokens[n].content = i(t.tokens[n].content)
						}
					}
					var a = t.linkify,
						s = t.utils.escapeHtml;
					e = e ? e : {};
					var l, u = "undefined" != typeof e.removeUnknown && e.removeUnknown,
						c = "undefined" != typeof e.removeUnbalanced && e.removeUnbalanced,
						h = "undefined" != typeof e.imageClass ? e.imageClass : "",
						d = !1,
						p = ["a", "b", "blockquote", "code", "em", "h1", "h2", "h3", "h4", "h5", "h6", "li", "ol", "p", "pre", "s", "sub", "sup", "strong", "ul"],
						f = new Array(p.length),
						m = new Array(p.length);
					for (l = 0; l < p.length; l++) f[l] = 0;
					for (l = 0; l < p.length; l++) m[l] = !1;
					t.core.ruler.after("linkify", "sanitize_inline", r), t.core.ruler.after("sanitize_inline", "sanitize_balance", o)
				}
			}, {}]
		}, {}, [1])(1)
	}), !
	function(t) {
		if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
		else if ("function" == typeof i && i.amd) i("markdown-it", [], t);
		else {
			var e;
			e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.markdownit = t()
		}
	}(function() {
		var t;
		return function i(t, n, r) {
			function o(s, l) {
				if (!n[s]) {
					if (!t[s]) {
						var u = "function" == typeof e && e;
						if (!l && u) return u(s, !0);
						if (a) return a(s, !0);
						var c = new Error("Cannot find module '" + s + "'");
						throw c.code = "MODULE_NOT_FOUND", c
					}
					var h = n[s] = {
						exports: {}
					};
					t[s][0].call(h.exports, function(e) {
						var i = t[s][1][e];
						return o(i ? i : e)
					}, h, h.exports, i, t, n, r)
				}
				return n[s].exports
			}
			for (var a = "function" == typeof e && e, s = 0; s < r.length; s++) o(r[s]);
			return o
		}({
			1: [function(t, e, i) {
				"use strict";
				e.exports = t("entities/maps/entities.json")
			}, {
				"entities/maps/entities.json": 53
			}],
			2: [function(t, e, i) {
				"use strict";
				e.exports = ["address", "article", "aside", "base", "basefont", "blockquote", "body", "caption", "center", "col", "colgroup", "dd", "details", "dialog", "dir", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "head", "header", "hr", "html", "iframe", "legend", "li", "link", "main", "menu", "menuitem", "meta", "nav", "noframes", "ol", "optgroup", "option", "p", "param", "pre", "section", "source", "title", "summary", "table", "tbody", "td", "tfoot", "th", "thead", "title", "tr", "track", "ul"]
			}, {}],
			3: [function(t, e, i) {
				"use strict";
				var n = "[a-zA-Z_:][a-zA-Z0-9:._-]*",
					r = "[^\"'=<>`\\x00-\\x20]+",
					o = "'[^']*'",
					a = '"[^"]*"',
					s = "(?:" + r + "|" + o + "|" + a + ")",
					l = "(?:\\s+" + n + "(?:\\s*=\\s*" + s + ")?)",
					u = "<[A-Za-z][A-Za-z0-9\\-]*" + l + "*\\s*\\/?>",
					c = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",
					h = "<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->",
					d = "<[?].*?[?]>",
					p = "<![A-Z]+\\s+[^>]*>",
					f = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
					m = new RegExp("^(?:" + u + "|" + c + "|" + h + "|" + d + "|" + p + "|" + f + ")"),
					g = new RegExp("^(?:" + u + "|" + c + ")");
				e.exports.HTML_TAG_RE = m, e.exports.HTML_OPEN_CLOSE_TAG_RE = g
			}, {}],
			4: [function(t, e, i) {
				"use strict";

				function n(t) {
					return Object.prototype.toString.call(t)
				}
				function r(t) {
					return "[object String]" === n(t)
				}
				function o(t, e) {
					return w.call(t, e)
				}
				function a(t) {
					var e = Array.prototype.slice.call(arguments, 1);
					return e.forEach(function(e) {
						if (e) {
							if ("object" != typeof e) throw new TypeError(e + "must be object");
							Object.keys(e).forEach(function(i) {
								t[i] = e[i]
							})
						}
					}), t
				}
				function s(t, e, i) {
					return [].concat(t.slice(0, e), i, t.slice(e + 1))
				}
				function l(t) {
					return !(t >= 55296 && t <= 57343 || t >= 64976 && t <= 65007 || 65535 === (65535 & t) || 65534 === (65535 & t) || t >= 0 && t <= 8 || 11 === t || t >= 14 && t <= 31 || t >= 127 && t <= 159 || t > 1114111)
				}
				function u(t) {
					if (t > 65535) {
						t -= 65536;
						var e = 55296 + (t >> 10),
							i = 56320 + (1023 & t);
						return String.fromCharCode(e, i)
					}
					return String.fromCharCode(t)
				}
				function c(t, e) {
					var i = 0;
					return o(L, e) ? L[e] : 35 === e.charCodeAt(0) && k.test(e) && (i = "x" === e[1].toLowerCase() ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10), l(i)) ? u(i) : t
				}
				function h(t) {
					return t.indexOf("\\") < 0 ? t : t.replace(C, "$1")
				}
				function d(t) {
					return t.indexOf("\\") < 0 && t.indexOf("&") < 0 ? t : t.replace(E, function(t, e, i) {
						return e ? e : c(t, i)
					})
				}
				function p(t) {
					return T[t]
				}
				function f(t) {
					return P.test(t) ? t.replace(D, p) : t
				}
				function m(t) {
					return t.replace(S, "\\$&")
				}
				function g(t) {
					switch (t) {
					case 9:
					case 32:
						return !0
					}
					return !1
				}
				function v(t) {
					if (t >= 8192 && t <= 8202) return !0;
					switch (t) {
					case 9:
					case 10:
					case 11:
					case 12:
					case 13:
					case 32:
					case 160:
					case 5760:
					case 8239:
					case 8287:
					case 12288:
						return !0
					}
					return !1
				}
				function _(t) {
					return M.test(t)
				}
				function y(t) {
					switch (t) {
					case 33:
					case 34:
					case 35:
					case 36:
					case 37:
					case 38:
					case 39:
					case 40:
					case 41:
					case 42:
					case 43:
					case 44:
					case 45:
					case 46:
					case 47:
					case 58:
					case 59:
					case 60:
					case 61:
					case 62:
					case 63:
					case 64:
					case 91:
					case 92:
					case 93:
					case 94:
					case 95:
					case 96:
					case 123:
					case 124:
					case 125:
					case 126:
						return !0;
					default:
						return !1
					}
				}
				function b(t) {
					return t.trim().replace(/\s+/g, " ").toUpperCase()
				}
				var w = Object.prototype.hasOwnProperty,
					C = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g,
					x = /&([a-z#][a-z0-9]{1,31});/gi,
					E = new RegExp(C.source + "|" + x.source, "gi"),
					k = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i,
					L = t("./entities"),
					P = /[&<>"]/,
					D = /[&<>"]/g,
					T = {
						"&": "&amp;",
						"<": "&lt;",
						">": "&gt;",
						'"': "&quot;"
					},
					S = /[.?*+^$[\]\\(){}|-]/g,
					M = t("uc.micro/categories/P/regex");
				i.lib = {}, i.lib.mdurl = t("mdurl"), i.lib.ucmicro = t("uc.micro"), i.assign = a, i.isString = r, i.has = o, i.unescapeMd = h, i.unescapeAll = d, i.isValidEntityCode = l, i.fromCodePoint = u, i.escapeHtml = f, i.arrayReplaceAt = s, i.isSpace = g, i.isWhiteSpace = v, i.isMdAsciiPunct = y, i.isPunctChar = _, i.escapeRE = m, i.normalizeReference = b
			}, {
				"./entities": 1,
				mdurl: 59,
				"uc.micro": 65,
				"uc.micro/categories/P/regex": 63
			}],
			5: [function(t, e, i) {
				"use strict";
				i.parseLinkLabel = t("./parse_link_label"), i.parseLinkDestination = t("./parse_link_destination"), i.parseLinkTitle = t("./parse_link_title")
			}, {
				"./parse_link_destination": 6,
				"./parse_link_label": 7,
				"./parse_link_title": 8
			}],
			6: [function(t, e, i) {
				"use strict";
				var n = t("../common/utils").isSpace,
					r = t("../common/utils").unescapeAll;
				e.exports = function(t, e, i) {
					var o, a, s = 0,
						l = e,
						u = {
							ok: !1,
							pos: 0,
							lines: 0,
							str: ""
						};
					if (60 === t.charCodeAt(e)) {
						for (e++; e < i;) {
							if (o = t.charCodeAt(e), 10 === o || n(o)) return u;
							if (62 === o) return u.pos = e + 1, u.str = r(t.slice(l + 1, e)), u.ok = !0, u;
							92 === o && e + 1 < i ? e += 2 : e++
						}
						return u
					}
					for (a = 0; e < i && (o = t.charCodeAt(e), 32 !== o) && !(o < 32 || 127 === o);) if (92 === o && e + 1 < i) e += 2;
					else {
						if (40 === o && (a++, a > 1)) break;
						if (41 === o && (a--, a < 0)) break;
						e++
					}
					return l === e ? u : (u.str = r(t.slice(l, e)), u.lines = s, u.pos = e, u.ok = !0, u)
				}
			}, {
				"../common/utils": 4
			}],
			7: [function(t, e, i) {
				"use strict";
				e.exports = function(t, e, i) {
					var n, r, o, a, s = -1,
						l = t.posMax,
						u = t.pos;
					for (t.pos = e + 1, n = 1; t.pos < l;) {
						if (o = t.src.charCodeAt(t.pos), 93 === o && (n--, 0 === n)) {
							r = !0;
							break
						}
						if (a = t.pos, t.md.inline.skipToken(t), 91 === o) if (a === t.pos - 1) n++;
						else if (i) return t.pos = u, -1
					}
					return r && (s = t.pos), t.pos = u, s
				}
			}, {}],
			8: [function(t, e, i) {
				"use strict";
				var n = t("../common/utils").unescapeAll;
				e.exports = function(t, e, i) {
					var r, o, a = 0,
						s = e,
						l = {
							ok: !1,
							pos: 0,
							lines: 0,
							str: ""
						};
					if (e >= i) return l;
					if (o = t.charCodeAt(e), 34 !== o && 39 !== o && 40 !== o) return l;
					for (e++, 40 === o && (o = 41); e < i;) {
						if (r = t.charCodeAt(e), r === o) return l.pos = e + 1, l.lines = a, l.str = n(t.slice(s + 1, e)), l.ok = !0, l;
						10 === r ? a++ : 92 === r && e + 1 < i && (e++, 10 === t.charCodeAt(e) && a++), e++
					}
					return l
				}
			}, {
				"../common/utils": 4
			}],
			9: [function(t, e, i) {
				"use strict";

				function n(t) {
					var e = t.trim().toLowerCase();
					return !v.test(e) || !! _.test(e)
				}
				function r(t) {
					var e = f.parse(t, !0);
					if (e.hostname && (!e.protocol || y.indexOf(e.protocol) >= 0)) try {
						e.hostname = m.toASCII(e.hostname)
					} catch (i) {}
					return f.encode(f.format(e))
				}
				function o(t) {
					var e = f.parse(t, !0);
					if (e.hostname && (!e.protocol || y.indexOf(e.protocol) >= 0)) try {
						e.hostname = m.toUnicode(e.hostname)
					} catch (i) {}
					return f.decode(f.format(e))
				}
				function a(t, e) {
					return this instanceof a ? (e || s.isString(t) || (e = t || {}, t = "default"), this.inline = new d, this.block = new h, this.core = new c, this.renderer = new u, this.linkify = new p, this.validateLink = n, this.normalizeLink = r, this.normalizeLinkText = o, this.utils = s, this.helpers = l, this.options = {}, this.configure(t), void(e && this.set(e))) : new a(t, e)
				}
				var s = t("./common/utils"),
					l = t("./helpers"),
					u = t("./renderer"),
					c = t("./parser_core"),
					h = t("./parser_block"),
					d = t("./parser_inline"),
					p = t("linkify-it"),
					f = t("mdurl"),
					m = t("punycode"),
					g = {
						"default": t("./presets/default"),
						zero: t("./presets/zero"),
						commonmark: t("./presets/commonmark")
					},
					v = /^(vbscript|javascript|file|data):/,
					_ = /^data:image\/(gif|png|jpeg|webp);/,
					y = ["http:", "https:", "mailto:"];
				a.prototype.set = function(t) {
					return s.assign(this.options, t), this
				}, a.prototype.configure = function(t) {
					var e, i = this;
					if (s.isString(t) && (e = t, t = g[e], !t)) throw new Error('Wrong `markdown-it` preset "' + e + '", check name');
					if (!t) throw new Error("Wrong `markdown-it` preset, can't be empty");
					return t.options && i.set(t.options), t.components && Object.keys(t.components).forEach(function(e) {
						t.components[e].rules && i[e].ruler.enableOnly(t.components[e].rules), t.components[e].rules2 && i[e].ruler2.enableOnly(t.components[e].rules2)
					}), this
				}, a.prototype.enable = function(t, e) {
					var i = [];
					Array.isArray(t) || (t = [t]), ["core", "block", "inline"].forEach(function(e) {
						i = i.concat(this[e].ruler.enable(t, !0))
					}, this), i = i.concat(this.inline.ruler2.enable(t, !0));
					var n = t.filter(function(t) {
						return i.indexOf(t) < 0
					});
					if (n.length && !e) throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + n);
					return this
				}, a.prototype.disable = function(t, e) {
					var i = [];
					Array.isArray(t) || (t = [t]), ["core", "block", "inline"].forEach(function(e) {
						i = i.concat(this[e].ruler.disable(t, !0))
					}, this), i = i.concat(this.inline.ruler2.disable(t, !0));
					var n = t.filter(function(t) {
						return i.indexOf(t) < 0
					});
					if (n.length && !e) throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + n);
					return this
				}, a.prototype.use = function(t) {
					var e = [this].concat(Array.prototype.slice.call(arguments, 1));
					return t.apply(t, e), this
				}, a.prototype.parse = function(t, e) {
					var i = new this.core.State(t, this, e);
					return this.core.process(i), i.tokens
				}, a.prototype.render = function(t, e) {
					return e = e || {}, this.renderer.render(this.parse(t, e), this.options, e)
				}, a.prototype.parseInline = function(t, e) {
					var i = new this.core.State(t, this, e);
					return i.inlineMode = !0, this.core.process(i), i.tokens
				}, a.prototype.renderInline = function(t, e) {
					return e = e || {}, this.renderer.render(this.parseInline(t, e), this.options, e)
				}, e.exports = a
			}, {
				"./common/utils": 4,
				"./helpers": 5,
				"./parser_block": 10,
				"./parser_core": 11,
				"./parser_inline": 12,
				"./presets/commonmark": 13,
				"./presets/default": 14,
				"./presets/zero": 15,
				"./renderer": 16,
				"linkify-it": 54,
				mdurl: 59,
				punycode: 52
			}],
			10: [function(t, e, i) {
				"use strict";

				function n() {
					this.ruler = new r;
					for (var t = 0; t < o.length; t++) this.ruler.push(o[t][0], o[t][1], {
						alt: (o[t][2] || []).slice()
					})
				}
				var r = t("./ruler"),
					o = [
						["table", t("./rules_block/table"), ["paragraph", "reference"]],
						["code", t("./rules_block/code")],
						["fence", t("./rules_block/fence"), ["paragraph", "reference", "blockquote", "list"]],
						["blockquote", t("./rules_block/blockquote"), ["paragraph", "reference", "list"]],
						["hr", t("./rules_block/hr"), ["paragraph", "reference", "blockquote", "list"]],
						["list", t("./rules_block/list"), ["paragraph", "reference", "blockquote"]],
						["reference", t("./rules_block/reference")],
						["heading", t("./rules_block/heading"), ["paragraph", "reference", "blockquote"]],
						["lheading", t("./rules_block/lheading")],
						["html_block", t("./rules_block/html_block"), ["paragraph", "reference", "blockquote"]],
						["paragraph", t("./rules_block/paragraph")]
					];
				n.prototype.tokenize = function(t, e, i) {
					for (var n, r, o = this.ruler.getRules(""), a = o.length, s = e, l = !1, u = t.md.options.maxNesting; s < i && (t.line = s = t.skipEmptyLines(s), !(s >= i)) && !(t.sCount[s] < t.blkIndent);) {
						if (t.level >= u) {
							t.line = i;
							break
						}
						for (r = 0; r < a && !(n = o[r](t, s, i, !1)); r++);
						if (t.tight = !l, t.isEmpty(t.line - 1) && (l = !0), s = t.line, s < i && t.isEmpty(s)) {
							if (l = !0, s++, s < i && "list" === t.parentType && t.isEmpty(s)) break;
							t.line = s
						}
					}
				}, n.prototype.parse = function(t, e, i, n) {
					var r;
					t && (r = new this.State(t, e, i, n), this.tokenize(r, r.line, r.lineMax))
				}, n.prototype.State = t("./rules_block/state_block"), e.exports = n
			}, {
				"./ruler": 17,
				"./rules_block/blockquote": 18,
				"./rules_block/code": 19,
				"./rules_block/fence": 20,
				"./rules_block/heading": 21,
				"./rules_block/hr": 22,
				"./rules_block/html_block": 23,
				"./rules_block/lheading": 24,
				"./rules_block/list": 25,
				"./rules_block/paragraph": 26,
				"./rules_block/reference": 27,
				"./rules_block/state_block": 28,
				"./rules_block/table": 29
			}],
			11: [function(t, e, i) {
				"use strict";

				function n() {
					this.ruler = new r;
					for (var t = 0; t < o.length; t++) this.ruler.push(o[t][0], o[t][1])
				}
				var r = t("./ruler"),
					o = [
						["normalize", t("./rules_core/normalize")],
						["block", t("./rules_core/block")],
						["inline", t("./rules_core/inline")],
						["linkify", t("./rules_core/linkify")],
						["replacements", t("./rules_core/replacements")],
						["smartquotes", t("./rules_core/smartquotes")]
					];
				n.prototype.process = function(t) {
					var e, i, n;
					for (n = this.ruler.getRules(""), e = 0, i = n.length; e < i; e++) n[e](t)
				}, n.prototype.State = t("./rules_core/state_core"), e.exports = n
			}, {
				"./ruler": 17,
				"./rules_core/block": 30,
				"./rules_core/inline": 31,
				"./rules_core/linkify": 32,
				"./rules_core/normalize": 33,
				"./rules_core/replacements": 34,
				"./rules_core/smartquotes": 35,
				"./rules_core/state_core": 36
			}],
			12: [function(t, e, i) {
				"use strict";

				function n() {
					var t;
					for (this.ruler = new r, t = 0; t < o.length; t++) this.ruler.push(o[t][0], o[t][1]);
					for (this.ruler2 = new r, t = 0; t < a.length; t++) this.ruler2.push(a[t][0], a[t][1])
				}
				var r = t("./ruler"),
					o = [
						["text", t("./rules_inline/text")],
						["newline", t("./rules_inline/newline")],
						["escape", t("./rules_inline/escape")],
						["backticks", t("./rules_inline/backticks")],
						["strikethrough", t("./rules_inline/strikethrough").tokenize],
						["emphasis", t("./rules_inline/emphasis").tokenize],
						["link", t("./rules_inline/link")],
						["image", t("./rules_inline/image")],
						["autolink", t("./rules_inline/autolink")],
						["html_inline", t("./rules_inline/html_inline")],
						["entity", t("./rules_inline/entity")]
					],
					a = [
						["balance_pairs", t("./rules_inline/balance_pairs")],
						["strikethrough", t("./rules_inline/strikethrough").postProcess],
						["emphasis", t("./rules_inline/emphasis").postProcess],
						["text_collapse", t("./rules_inline/text_collapse")]
					];
				n.prototype.skipToken = function(t) {
					var e, i, n = t.pos,
						r = this.ruler.getRules(""),
						o = r.length,
						a = t.md.options.maxNesting,
						s = t.cache;
					if ("undefined" != typeof s[n]) return void(t.pos = s[n]);
					if (t.level < a) for (i = 0; i < o && (t.level++, e = r[i](t, !0), t.level--, !e); i++);
					else t.pos = t.posMax;
					e || t.pos++, s[n] = t.pos
				}, n.prototype.tokenize = function(t) {
					for (var e, i, n = this.ruler.getRules(""), r = n.length, o = t.posMax, a = t.md.options.maxNesting; t.pos < o;) {
						if (t.level < a) for (i = 0; i < r && !(e = n[i](t, !1)); i++);
						if (e) {
							if (t.pos >= o) break
						} else t.pending += t.src[t.pos++]
					}
					t.pending && t.pushPending()
				}, n.prototype.parse = function(t, e, i, n) {
					var r, o, a, s = new this.State(t, e, i, n);
					for (this.tokenize(s), o = this.ruler2.getRules(""), a = o.length, r = 0; r < a; r++) o[r](s)
				}, n.prototype.State = t("./rules_inline/state_inline"), e.exports = n
			}, {
				"./ruler": 17,
				"./rules_inline/autolink": 37,
				"./rules_inline/backticks": 38,
				"./rules_inline/balance_pairs": 39,
				"./rules_inline/emphasis": 40,
				"./rules_inline/entity": 41,
				"./rules_inline/escape": 42,
				"./rules_inline/html_inline": 43,
				"./rules_inline/image": 44,
				"./rules_inline/link": 45,
				"./rules_inline/newline": 46,
				"./rules_inline/state_inline": 47,
				"./rules_inline/strikethrough": 48,
				"./rules_inline/text": 49,
				"./rules_inline/text_collapse": 50
			}],
			13: [function(t, e, i) {
				"use strict";
				e.exports = {
					options: {
						html: !0,
						xhtmlOut: !0,
						breaks: !1,
						langPrefix: "language-",
						linkify: !1,
						typographer: !1,
						quotes: "“”‘’",
						highlight: null,
						maxNesting: 20
					},
					components: {
						core: {
							rules: ["normalize", "block", "inline"]
						},
						block: {
							rules: ["blockquote", "code", "fence", "heading", "hr", "html_block", "lheading", "list", "reference", "paragraph"]
						},
						inline: {
							rules: ["autolink", "backticks", "emphasis", "entity", "escape", "html_inline", "image", "link", "newline", "text"],
							rules2: ["balance_pairs", "emphasis", "text_collapse"]
						}
					}
				}
			}, {}],
			14: [function(t, e, i) {
				"use strict";
				e.exports = {
					options: {
						html: !1,
						xhtmlOut: !1,
						breaks: !1,
						langPrefix: "language-",
						linkify: !1,
						typographer: !1,
						quotes: "“”‘’",
						highlight: null,
						maxNesting: 100
					},
					components: {
						core: {},
						block: {},
						inline: {}
					}
				}
			}, {}],
			15: [function(t, e, i) {
				"use strict";
				e.exports = {
					options: {
						html: !1,
						xhtmlOut: !1,
						breaks: !1,
						langPrefix: "language-",
						linkify: !1,
						typographer: !1,
						quotes: "“”‘’",
						highlight: null,
						maxNesting: 20
					},
					components: {
						core: {
							rules: ["normalize", "block", "inline"]
						},
						block: {
							rules: ["paragraph"]
						},
						inline: {
							rules: ["text"],
							rules2: ["balance_pairs", "text_collapse"]
						}
					}
				}
			}, {}],
			16: [function(t, e, i) {
				"use strict";

				function n() {
					this.rules = r({}, s)
				}
				var r = t("./common/utils").assign,
					o = t("./common/utils").unescapeAll,
					a = t("./common/utils").escapeHtml,
					s = {};
				s.code_inline = function(t, e, i, n, r) {
					var o = t[e],
						s = r.renderAttrs(o);
					return "<code" + (s ? " " + s : "") + ">" + a(t[e].content) + "</code>"
				}, s.code_block = function(t, e, i, n, r) {
					var o = t[e],
						s = r.renderAttrs(o);
					return "<pre" + (s ? " " + s : "") + "><code>" + a(t[e].content) + "</code></pre>\n"
				}, s.fence = function(t, e, i, n, r) {
					var s, l, u, c, h = t[e],
						d = h.info ? o(h.info).trim() : "",
						p = "";
					return d && (p = d.split(/\s+/g)[0]), s = i.highlight ? i.highlight(h.content, p) || a(h.content) : a(h.content), 0 === s.indexOf("<pre") ? s + "\n" : d ? (l = h.attrIndex("class"), u = h.attrs ? h.attrs.slice() : [], l < 0 ? u.push(["class", i.langPrefix + p]) : u[l] += " " + i.langPrefix + p, c = {
						attrs: u
					}, "<pre><code" + r.renderAttrs(c) + ">" + s + "</code></pre>\n") : "<pre><code" + r.renderAttrs(h) + ">" + s + "</code></pre>\n"
				}, s.image = function(t, e, i, n, r) {
					var o = t[e];
					return o.attrs[o.attrIndex("alt")][1] = r.renderInlineAsText(o.children, i, n), r.renderToken(t, e, i)
				}, s.hardbreak = function(t, e, i) {
					return i.xhtmlOut ? "<br />\n" : "<br>\n"
				}, s.softbreak = function(t, e, i) {
					return i.breaks ? i.xhtmlOut ? "<br />\n" : "<br>\n" : "\n"
				}, s.text = function(t, e) {
					return a(t[e].content)
				}, s.html_block = function(t, e) {
					return t[e].content
				}, s.html_inline = function(t, e) {
					return t[e].content
				}, n.prototype.renderAttrs = function(t) {
					var e, i, n;
					if (!t.attrs) return "";
					for (n = "", e = 0, i = t.attrs.length; e < i; e++) n += " " + a(t.attrs[e][0]) + '="' + a(t.attrs[e][1]) + '"';
					return n
				}, n.prototype.renderToken = function(t, e, i) {
					var n, r = "",
						o = !1,
						a = t[e];
					return a.hidden ? "" : (a.block && a.nesting !== -1 && e && t[e - 1].hidden && (r += "\n"), r += (a.nesting === -1 ? "</" : "<") + a.tag, r += this.renderAttrs(a), 0 === a.nesting && i.xhtmlOut && (r += " /"), a.block && (o = !0, 1 === a.nesting && e + 1 < t.length && (n = t[e + 1], "inline" === n.type || n.hidden ? o = !1 : n.nesting === -1 && n.tag === a.tag && (o = !1))), r += o ? ">\n" : ">")
				}, n.prototype.renderInline = function(t, e, i) {
					for (var n, r = "", o = this.rules, a = 0, s = t.length; a < s; a++) n = t[a].type, r += "undefined" != typeof o[n] ? o[n](t, a, e, i, this) : this.renderToken(t, a, e);
					return r
				}, n.prototype.renderInlineAsText = function(t, e, i) {
					for (var n = "", r = 0, o = t.length; r < o; r++)"text" === t[r].type ? n += t[r].content : "image" === t[r].type && (n += this.renderInlineAsText(t[r].children, e, i));
					return n
				}, n.prototype.render = function(t, e, i) {
					var n, r, o, a = "",
						s = this.rules;
					for (n = 0, r = t.length; n < r; n++) o = t[n].type, a += "inline" === o ? this.renderInline(t[n].children, e, i) : "undefined" != typeof s[o] ? s[t[n].type](t, n, e, i, this) : this.renderToken(t, n, e, i);
					return a
				}, e.exports = n
			}, {
				"./common/utils": 4
			}],
			17: [function(t, e, i) {
				"use strict";

				function n() {
					this.__rules__ = [], this.__cache__ = null
				}
				n.prototype.__find__ = function(t) {
					for (var e = 0; e < this.__rules__.length; e++) if (this.__rules__[e].name === t) return e;
					return -1
				}, n.prototype.__compile__ = function() {
					var t = this,
						e = [""];
					t.__rules__.forEach(function(t) {
						t.enabled && t.alt.forEach(function(t) {
							e.indexOf(t) < 0 && e.push(t)
						})
					}), t.__cache__ = {}, e.forEach(function(e) {
						t.__cache__[e] = [], t.__rules__.forEach(function(i) {
							i.enabled && (e && i.alt.indexOf(e) < 0 || t.__cache__[e].push(i.fn))
						})
					})
				}, n.prototype.at = function(t, e, i) {
					var n = this.__find__(t),
						r = i || {};
					if (n === -1) throw new Error("Parser rule not found: " + t);
					this.__rules__[n].fn = e, this.__rules__[n].alt = r.alt || [], this.__cache__ = null
				}, n.prototype.before = function(t, e, i, n) {
					var r = this.__find__(t),
						o = n || {};
					if (r === -1) throw new Error("Parser rule not found: " + t);
					this.__rules__.splice(r, 0, {
						name: e,
						enabled: !0,
						fn: i,
						alt: o.alt || []
					}), this.__cache__ = null
				}, n.prototype.after = function(t, e, i, n) {
					var r = this.__find__(t),
						o = n || {};
					if (r === -1) throw new Error("Parser rule not found: " + t);
					this.__rules__.splice(r + 1, 0, {
						name: e,
						enabled: !0,
						fn: i,
						alt: o.alt || []
					}), this.__cache__ = null
				}, n.prototype.push = function(t, e, i) {
					var n = i || {};
					this.__rules__.push({
						name: t,
						enabled: !0,
						fn: e,
						alt: n.alt || []
					}), this.__cache__ = null
				}, n.prototype.enable = function(t, e) {
					Array.isArray(t) || (t = [t]);
					var i = [];
					return t.forEach(function(t) {
						var n = this.__find__(t);
						if (n < 0) {
							if (e) return;
							throw new Error("Rules manager: invalid rule name " + t)
						}
						this.__rules__[n].enabled = !0, i.push(t)
					}, this), this.__cache__ = null, i
				}, n.prototype.enableOnly = function(t, e) {
					Array.isArray(t) || (t = [t]), this.__rules__.forEach(function(t) {
						t.enabled = !1
					}), this.enable(t, e)
				}, n.prototype.disable = function(t, e) {
					Array.isArray(t) || (t = [t]);
					var i = [];
					return t.forEach(function(t) {
						var n = this.__find__(t);
						if (n < 0) {
							if (e) return;
							throw new Error("Rules manager: invalid rule name " + t)
						}
						this.__rules__[n].enabled = !1, i.push(t)
					}, this), this.__cache__ = null, i
				}, n.prototype.getRules = function(t) {
					return null === this.__cache__ && this.__compile__(), this.__cache__[t] || []
				}, e.exports = n
			}, {}],
			18: [function(t, e, i) {
				"use strict";
				var n = t("../common/utils").isSpace;
				e.exports = function(t, e, i, r) {
					var o, a, s, l, u, c, h, d, p, f, m, g, v, _, y, b, w = t.bMarks[e] + t.tShift[e],
						C = t.eMarks[e];
					if (62 !== t.src.charCodeAt(w++)) return !1;
					if (r) return !0;
					for (32 === t.src.charCodeAt(w) && w++, c = t.blkIndent, t.blkIndent = 0, p = f = t.sCount[e] + w - (t.bMarks[e] + t.tShift[e]), u = [t.bMarks[e]], t.bMarks[e] = w; w < C && (m = t.src.charCodeAt(w), n(m));) 9 === m ? f += 4 - f % 4 : f++, w++;
					for (a = w >= C, l = [t.sCount[e]], t.sCount[e] = f - p, s = [t.tShift[e]], t.tShift[e] = w - t.bMarks[e], g = t.md.block.ruler.getRules("blockquote"), o = e + 1; o < i && !(t.sCount[o] < c) && (w = t.bMarks[o] + t.tShift[o], C = t.eMarks[o], !(w >= C)); o++) if (62 !== t.src.charCodeAt(w++)) {
						if (a) break;
						for (b = !1, _ = 0, y = g.length; _ < y; _++) if (g[_](t, o, i, !0)) {
							b = !0;
							break
						}
						if (b) break;
						u.push(t.bMarks[o]), s.push(t.tShift[o]), l.push(t.sCount[o]), t.sCount[o] = -1
					} else {
						for (32 === t.src.charCodeAt(w) && w++, p = f = t.sCount[o] + w - (t.bMarks[o] + t.tShift[o]), u.push(t.bMarks[o]), t.bMarks[o] = w; w < C && (m = t.src.charCodeAt(w), n(m));) 9 === m ? f += 4 - f % 4 : f++, w++;
						a = w >= C, l.push(t.sCount[o]), t.sCount[o] = f - p, s.push(t.tShift[o]), t.tShift[o] = w - t.bMarks[o]
					}
					for (h = t.parentType, t.parentType = "blockquote", v = t.push("blockquote_open", "blockquote", 1), v.markup = ">", v.map = d = [e, 0], t.md.block.tokenize(t, e, o), v = t.push("blockquote_close", "blockquote", -1), v.markup = ">", t.parentType = h, d[1] = t.line, _ = 0; _ < s.length; _++) t.bMarks[_ + e] = u[_], t.tShift[_ + e] = s[_], t.sCount[_ + e] = l[_];
					return t.blkIndent = c, !0
				}
			}, {
				"../common/utils": 4
			}],
			19: [function(t, e, i) {
				"use strict";
				e.exports = function(t, e, i) {
					var n, r, o, a = 0;
					if (t.sCount[e] - t.blkIndent < 4) return !1;
					for (r = n = e + 1; n < i;) if (t.isEmpty(n)) {
						if (a++, a >= 2 && "list" === t.parentType) break;
						n++
					} else {
						if (a = 0, !(t.sCount[n] - t.blkIndent >= 4)) break;
						n++, r = n
					}
					return t.line = r, o = t.push("code_block", "code", 0), o.content = t.getLines(e, r, 4 + t.blkIndent, !0), o.map = [e, t.line], !0
				}
			}, {}],
			20: [function(t, e, i) {
				"use strict";
				e.exports = function(t, e, i, n) {
					var r, o, a, s, l, u, c, h = !1,
						d = t.bMarks[e] + t.tShift[e],
						p = t.eMarks[e];
					if (d + 3 > p) return !1;
					if (r = t.src.charCodeAt(d), 126 !== r && 96 !== r) return !1;
					if (l = d, d = t.skipChars(d, r), o = d - l, o < 3) return !1;
					if (c = t.src.slice(l, d), a = t.src.slice(d, p), a.indexOf("`") >= 0) return !1;
					if (n) return !0;
					for (s = e; s++, !(s >= i || (d = l = t.bMarks[s] + t.tShift[s], p = t.eMarks[s], d < p && t.sCount[s] < t.blkIndent));) if (t.src.charCodeAt(d) === r && !(t.sCount[s] - t.blkIndent >= 4 || (d = t.skipChars(d, r), d - l < o || (d = t.skipSpaces(d), d < p)))) {
						h = !0;
						break
					}
					return o = t.sCount[e], t.line = s + (h ? 1 : 0), u = t.push("fence", "code", 0), u.info = a, u.content = t.getLines(e + 1, s, o, !0), u.markup = c, u.map = [e, t.line], !0
				}
			}, {}],
			21: [function(t, e, i) {
				"use strict";
				var n = t("../common/utils").isSpace;
				e.exports = function(t, e, i, r) {
					var o, a, s, l, u = t.bMarks[e] + t.tShift[e],
						c = t.eMarks[e];
					if (o = t.src.charCodeAt(u), 35 !== o || u >= c) return !1;
					for (a = 1, o = t.src.charCodeAt(++u); 35 === o && u < c && a <= 6;) a++, o = t.src.charCodeAt(++u);
					return !(a > 6 || u < c && 32 !== o || !r && (c = t.skipSpacesBack(c, u), s = t.skipCharsBack(c, 35, u), s > u && n(t.src.charCodeAt(s - 1)) && (c = s), t.line = e + 1, l = t.push("heading_open", "h" + String(a), 1), l.markup = "########".slice(0, a), l.map = [e, t.line], l = t.push("inline", "", 0), l.content = t.src.slice(u, c).trim(), l.map = [e, t.line], l.children = [], l = t.push("heading_close", "h" + String(a), -1), l.markup = "########".slice(0, a), 0))
				}
			}, {
				"../common/utils": 4
			}],
			22: [function(t, e, i) {
				"use strict";
				var n = t("../common/utils").isSpace;
				e.exports = function(t, e, i, r) {
					var o, a, s, l, u = t.bMarks[e] + t.tShift[e],
						c = t.eMarks[e];
					if (o = t.src.charCodeAt(u++), 42 !== o && 45 !== o && 95 !== o) return !1;
					for (a = 1; u < c;) {
						if (s = t.src.charCodeAt(u++), s !== o && !n(s)) return !1;
						s === o && a++
					}
					return !(a < 3 || !r && (t.line = e + 1, l = t.push("hr", "hr", 0), l.map = [e, t.line], l.markup = Array(a + 1).join(String.fromCharCode(o)), 0))
				}
			}, {
				"../common/utils": 4
			}],
			23: [function(t, e, i) {
				"use strict";
				var n = t("../common/html_blocks"),
					r = t("../common/html_re").HTML_OPEN_CLOSE_TAG_RE,
					o = [
						[/^<(script|pre|style)(?=(\s|>|$))/i, /<\/(script|pre|style)>/i, !0],
						[/^<!--/, /-->/, !0],
						[/^<\?/, /\?>/, !0],
						[/^<![A-Z]/, />/, !0],
						[/^<!\[CDATA\[/, /\]\]>/, !0],
						[new RegExp("^</?(" + n.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, !0],
						[new RegExp(r.source + "\\s*$"), /^$/, !1]
					];
				e.exports = function(t, e, i, n) {
					var r, a, s, l, u = t.bMarks[e] + t.tShift[e],
						c = t.eMarks[e];
					if (!t.md.options.html) return !1;
					if (60 !== t.src.charCodeAt(u)) return !1;
					for (l = t.src.slice(u, c), r = 0; r < o.length && !o[r][0].test(l); r++);
					if (r === o.length) return !1;
					if (n) return o[r][2];
					if (a = e + 1, !o[r][1].test(l)) for (; a < i && !(t.sCount[a] < t.blkIndent); a++) if (u = t.bMarks[a] + t.tShift[a], c = t.eMarks[a], l = t.src.slice(u, c), o[r][1].test(l)) {
						0 !== l.length && a++;
						break
					}
					return t.line = a, s = t.push("html_block", "", 0), s.map = [e, a], s.content = t.getLines(e, a, t.blkIndent, !0), !0
				}
			}, {
				"../common/html_blocks": 2,
				"../common/html_re": 3
			}],
			24: [function(t, e, i) {
				"use strict";
				e.exports = function(t, e, i) {
					for (var n, r, o, a, s, l, u, c, h, d = e + 1, p = t.md.block.ruler.getRules("paragraph"); d < i && !t.isEmpty(d); d++) if (!(t.sCount[d] - t.blkIndent > 3)) {
						if (t.sCount[d] >= t.blkIndent && (l = t.bMarks[d] + t.tShift[d], u = t.eMarks[d], l < u && (h = t.src.charCodeAt(l), (45 === h || 61 === h) && (l = t.skipChars(l, h), l = t.skipSpaces(l), l >= u)))) {
							c = 61 === h ? 1 : 2;
							break
						}
						if (!(t.sCount[d] < 0)) {
							for (r = !1, o = 0, a = p.length; o < a; o++) if (p[o](t, d, i, !0)) {
								r = !0;
								break
							}
							if (r) break
						}
					}
					return !!c && (n = t.getLines(e, d, t.blkIndent, !1).trim(), t.line = d + 1, s = t.push("heading_open", "h" + String(c), 1), s.markup = String.fromCharCode(h), s.map = [e, t.line], s = t.push("inline", "", 0), s.content = n, s.map = [e, t.line - 1], s.children = [], s = t.push("heading_close", "h" + String(c), -1), s.markup = String.fromCharCode(h), !0)
				}
			}, {}],
			25: [function(t, e, i) {
				"use strict";

				function n(t, e) {
					var i, n, r, o;
					return n = t.bMarks[e] + t.tShift[e], r = t.eMarks[e], i = t.src.charCodeAt(n++), 42 !== i && 45 !== i && 43 !== i ? -1 : n < r && (o = t.src.charCodeAt(n), !a(o)) ? -1 : n
				}
				function r(t, e) {
					var i, n = t.bMarks[e] + t.tShift[e],
						r = n,
						o = t.eMarks[e];
					if (r + 1 >= o) return -1;
					if (i = t.src.charCodeAt(r++), i < 48 || i > 57) return -1;
					for (;;) {
						if (r >= o) return -1;
						if (i = t.src.charCodeAt(r++), !(i >= 48 && i <= 57)) {
							if (41 === i || 46 === i) break;
							return -1
						}
						if (r - n >= 10) return -1
					}
					return r < o && (i = t.src.charCodeAt(r), !a(i)) ? -1 : r
				}
				function o(t, e) {
					var i, n, r = t.level + 2;
					for (i = e + 2, n = t.tokens.length - 2; i < n; i++) t.tokens[i].level === r && "paragraph_open" === t.tokens[i].type && (t.tokens[i + 2].hidden = !0, t.tokens[i].hidden = !0, i += 2)
				}
				var a = t("../common/utils").isSpace;
				e.exports = function(t, e, i, s) {
					var l, u, c, h, d, p, f, m, g, v, _, y, b, w, C, x, E, k, L, P, D, T, S, M, A, O, N, I, R = !0;
					if ((_ = r(t, e)) >= 0) k = !0;
					else {
						if (!((_ = n(t, e)) >= 0)) return !1;
						k = !1
					}
					if (E = t.src.charCodeAt(_ - 1), s) return !0;
					for (P = t.tokens.length, k ? (v = t.bMarks[e] + t.tShift[e], x = Number(t.src.substr(v, _ - v - 1)), A = t.push("ordered_list_open", "ol", 1), 1 !== x && (A.attrs = [
						["start", x]
					])) : A = t.push("bullet_list_open", "ul", 1), A.map = T = [e, 0], A.markup = String.fromCharCode(E), l = e, D = !1, M = t.md.block.ruler.getRules("list"); l < i;) {
						for (b = _, w = t.eMarks[l], u = c = t.sCount[l] + _ - (t.bMarks[e] + t.tShift[e]); b < w && (y = t.src.charCodeAt(b), a(y));) 9 === y ? c += 4 - c % 4 : c++, b++;
						if (L = b, C = L >= w ? 1 : c - u, C > 4 && (C = 1), h = u + C, A = t.push("list_item_open", "li", 1), A.markup = String.fromCharCode(E), A.map = S = [e, 0], p = t.blkIndent, m = t.tight, d = t.tShift[e], f = t.sCount[e], g = t.parentType, t.blkIndent = h, t.tight = !0, t.parentType = "list", t.tShift[e] = L - t.bMarks[e], t.sCount[e] = c, L >= w && t.isEmpty(e + 1) ? t.line = Math.min(t.line + 2, i) : t.md.block.tokenize(t, e, i, !0), t.tight && !D || (R = !1), D = t.line - e > 1 && t.isEmpty(t.line - 1), t.blkIndent = p, t.tShift[e] = d, t.sCount[e] = f, t.tight = m, t.parentType = g, A = t.push("list_item_close", "li", -1), A.markup = String.fromCharCode(E), l = e = t.line, S[1] = l, L = t.bMarks[e], l >= i) break;
						if (t.isEmpty(l)) break;
						if (t.sCount[l] < t.blkIndent) break;
						for (I = !1, O = 0, N = M.length; O < N; O++) if (M[O](t, l, i, !0)) {
							I = !0;
							break
						}
						if (I) break;
						if (k) {
							if (_ = r(t, l), _ < 0) break
						} else if (_ = n(t, l), _ < 0) break;
						if (E !== t.src.charCodeAt(_ - 1)) break
					}
					return A = k ? t.push("ordered_list_close", "ol", -1) : t.push("bullet_list_close", "ul", -1), A.markup = String.fromCharCode(E), T[1] = l, t.line = l, R && o(t, P), !0
				}
			}, {
				"../common/utils": 4
			}],
			26: [function(t, e, i) {
				"use strict";
				e.exports = function(t, e) {
					for (var i, n, r, o, a, s = e + 1, l = t.md.block.ruler.getRules("paragraph"), u = t.lineMax; s < u && !t.isEmpty(s); s++) if (!(t.sCount[s] - t.blkIndent > 3 || t.sCount[s] < 0)) {
						for (n = !1, r = 0, o = l.length; r < o; r++) if (l[r](t, s, u, !0)) {
							n = !0;
							break
						}
						if (n) break
					}
					return i = t.getLines(e, s, t.blkIndent, !1).trim(), t.line = s, a = t.push("paragraph_open", "p", 1), a.map = [e, t.line], a = t.push("inline", "", 0), a.content = i, a.map = [e, t.line], a.children = [], a = t.push("paragraph_close", "p", -1), !0
				}
			}, {}],
			27: [function(t, e, i) {
				"use strict";
				var n = t("../helpers/parse_link_destination"),
					r = t("../helpers/parse_link_title"),
					o = t("../common/utils").normalizeReference,
					a = t("../common/utils").isSpace;
				e.exports = function(t, e, i, s) {
					var l, u, c, h, d, p, f, m, g, v, _, y, b, w, C, x = 0,
						E = t.bMarks[e] + t.tShift[e],
						k = t.eMarks[e],
						L = e + 1;
					if (91 !== t.src.charCodeAt(E)) return !1;
					for (; ++E < k;) if (93 === t.src.charCodeAt(E) && 92 !== t.src.charCodeAt(E - 1)) {
						if (E + 1 === k) return !1;
						if (58 !== t.src.charCodeAt(E + 1)) return !1;
						break
					}
					for (h = t.lineMax, w = t.md.block.ruler.getRules("reference"); L < h && !t.isEmpty(L); L++) if (!(t.sCount[L] - t.blkIndent > 3 || t.sCount[L] < 0)) {
						for (b = !1, p = 0, f = w.length; p < f; p++) if (w[p](t, L, h, !0)) {
							b = !0;
							break
						}
						if (b) break
					}
					for (y = t.getLines(e, L, t.blkIndent, !1).trim(), k = y.length, E = 1; E < k; E++) {
						if (l = y.charCodeAt(E), 91 === l) return !1;
						if (93 === l) {
							g = E;
							break
						}
						10 === l ? x++ : 92 === l && (E++, E < k && 10 === y.charCodeAt(E) && x++)
					}
					if (g < 0 || 58 !== y.charCodeAt(g + 1)) return !1;
					for (E = g + 2; E < k; E++) if (l = y.charCodeAt(E), 10 === l) x++;
					else if (!a(l)) break;
					if (v = n(y, E, k), !v.ok) return !1;
					if (d = t.md.normalizeLink(v.str), !t.md.validateLink(d)) return !1;
					for (E = v.pos, x += v.lines, u = E, c = x, _ = E; E < k; E++) if (l = y.charCodeAt(E), 10 === l) x++;
					else if (!a(l)) break;
					for (v = r(y, E, k), E < k && _ !== E && v.ok ? (C = v.str, E = v.pos, x += v.lines) : (C = "", E = u, x = c); E < k && (l = y.charCodeAt(E), a(l));) E++;
					if (E < k && 10 !== y.charCodeAt(E) && C) for (C = "", E = u, x = c; E < k && (l = y.charCodeAt(E), a(l));) E++;
					return !(E < k && 10 !== y.charCodeAt(E) || !(m = o(y.slice(1, g))) || !s && ("undefined" == typeof t.env.references && (t.env.references = {}), "undefined" == typeof t.env.references[m] && (t.env.references[m] = {
						title: C,
						href: d
					}), t.line = e + x + 1, 0))
				}
			}, {
				"../common/utils": 4,
				"../helpers/parse_link_destination": 6,
				"../helpers/parse_link_title": 8
			}],
			28: [function(t, e, i) {
				"use strict";

				function n(t, e, i, n) {
					var r, a, s, l, u, c, h, d;
					for (this.src = t, this.md = e, this.env = i, this.tokens = n, this.bMarks = [], this.eMarks = [], this.tShift = [], this.sCount = [], this.blkIndent = 0, this.line = 0, this.lineMax = 0, this.tight = !1, this.parentType = "root", this.ddIndent = -1, this.level = 0, this.result = "", a = this.src, d = !1, s = l = c = h = 0, u = a.length; l < u; l++) {
						if (r = a.charCodeAt(l), !d) {
							if (o(r)) {
								c++, 9 === r ? h += 4 - h % 4 : h++;
								continue
							}
							d = !0
						}
						10 !== r && l !== u - 1 || (10 !== r && l++, this.bMarks.push(s), this.eMarks.push(l), this.tShift.push(c), this.sCount.push(h), d = !1, c = 0, h = 0, s = l + 1)
					}
					this.bMarks.push(a.length), this.eMarks.push(a.length), this.tShift.push(0), this.sCount.push(0), this.lineMax = this.bMarks.length - 1
				}
				var r = t("../token"),
					o = t("../common/utils").isSpace;
				n.prototype.push = function(t, e, i) {
					var n = new r(t, e, i);
					return n.block = !0, i < 0 && this.level--, n.level = this.level, i > 0 && this.level++, this.tokens.push(n), n
				}, n.prototype.isEmpty = function(t) {
					return this.bMarks[t] + this.tShift[t] >= this.eMarks[t]
				}, n.prototype.skipEmptyLines = function(t) {
					for (var e = this.lineMax; t < e && !(this.bMarks[t] + this.tShift[t] < this.eMarks[t]); t++);
					return t
				}, n.prototype.skipSpaces = function(t) {
					for (var e, i = this.src.length; t < i && (e = this.src.charCodeAt(t), o(e)); t++);
					return t
				}, n.prototype.skipSpacesBack = function(t, e) {
					if (t <= e) return t;
					for (; t > e;) if (!o(this.src.charCodeAt(--t))) return t + 1;
					return t
				}, n.prototype.skipChars = function(t, e) {
					for (var i = this.src.length; t < i && this.src.charCodeAt(t) === e; t++);
					return t
				}, n.prototype.skipCharsBack = function(t, e, i) {
					if (t <= i) return t;
					for (; t > i;) if (e !== this.src.charCodeAt(--t)) return t + 1;
					return t
				}, n.prototype.getLines = function(t, e, i, n) {
					var r, a, s, l, u, c, h, d = t;
					if (t >= e) return "";
					for (c = new Array(e - t), r = 0; d < e; d++, r++) {
						for (a = 0, h = l = this.bMarks[d], u = d + 1 < e || n ? this.eMarks[d] + 1 : this.eMarks[d]; l < u && a < i;) {
							if (s = this.src.charCodeAt(l), o(s)) 9 === s ? a += 4 - a % 4 : a++;
							else {
								if (!(l - h < this.tShift[d])) break;
								a++
							}
							l++
						}
						c[r] = this.src.slice(l, u)
					}
					return c.join("")
				}, n.prototype.Token = r, e.exports = n
			}, {
				"../common/utils": 4,
				"../token": 51
			}],
			29: [function(t, e, i) {
				"use strict";

				function n(t, e) {
					var i = t.bMarks[e] + t.blkIndent,
						n = t.eMarks[e];
					return t.src.substr(i, n - i)
				}
				function r(t) {
					var e, i = [],
						n = 0,
						r = t.length,
						o = 0,
						a = 0,
						s = !1,
						l = 0;
					for (e = t.charCodeAt(n); n < r;) 96 === e && o % 2 === 0 ? (s = !s, l = n) : 124 !== e || o % 2 !== 0 || s ? 92 === e ? o++ : o = 0 : (i.push(t.substring(a, n)), a = n + 1), n++, n === r && s && (s = !1, n = l + 1), e = t.charCodeAt(n);
					return i.push(t.substring(a)), i
				}
				e.exports = function(t, e, i, o) {
					var a, s, l, u, c, h, d, p, f, m, g, v;
					if (e + 2 > i) return !1;
					if (c = e + 1, t.sCount[c] < t.blkIndent) return !1;
					if (l = t.bMarks[c] + t.tShift[c], l >= t.eMarks[c]) return !1;
					if (a = t.src.charCodeAt(l), 124 !== a && 45 !== a && 58 !== a) return !1;
					if (s = n(t, e + 1), !/^[-:| ]+$/.test(s)) return !1;
					for (h = s.split("|"), f = [], u = 0; u < h.length; u++) {
						if (m = h[u].trim(), !m) {
							if (0 === u || u === h.length - 1) continue;
							return !1
						}
						if (!/^:?-+:?$/.test(m)) return !1;
						58 === m.charCodeAt(m.length - 1) ? f.push(58 === m.charCodeAt(0) ? "center" : "right") : 58 === m.charCodeAt(0) ? f.push("left") : f.push("")
					}
					if (s = n(t, e).trim(), s.indexOf("|") === -1) return !1;
					if (h = r(s.replace(/^\||\|$/g, "")), d = h.length, d > f.length) return !1;
					if (o) return !0;
					for (p = t.push("table_open", "table", 1), p.map = g = [e, 0], p = t.push("thead_open", "thead", 1), p.map = [e, e + 1], p = t.push("tr_open", "tr", 1), p.map = [e, e + 1], u = 0; u < h.length; u++) p = t.push("th_open", "th", 1), p.map = [e, e + 1], f[u] && (p.attrs = [
						["style", "text-align:" + f[u]]
					]), p = t.push("inline", "", 0), p.content = h[u].trim(), p.map = [e, e + 1], p.children = [], p = t.push("th_close", "th", -1);
					for (p = t.push("tr_close", "tr", -1), p = t.push("thead_close", "thead", -1), p = t.push("tbody_open", "tbody", 1), p.map = v = [e + 2, 0], c = e + 2; c < i && !(t.sCount[c] < t.blkIndent) && (s = n(t, c), s.indexOf("|") !== -1); c++) {
						for (h = r(s.replace(/^\||\|\s*$/g, "")), p = t.push("tr_open", "tr", 1), u = 0; u < d; u++) p = t.push("td_open", "td", 1), f[u] && (p.attrs = [
							["style", "text-align:" + f[u]]
						]), p = t.push("inline", "", 0), p.content = h[u] ? h[u].trim() : "", p.children = [], p = t.push("td_close", "td", -1);
						p = t.push("tr_close", "tr", -1)
					}
					return p = t.push("tbody_close", "tbody", -1), p = t.push("table_close", "table", -1), g[1] = v[1] = c, t.line = c, !0
				}
			}, {}],
			30: [function(t, e, i) {
				"use strict";
				e.exports = function(t) {
					var e;
					t.inlineMode ? (e = new t.Token("inline", "", 0), e.content = t.src, e.map = [0, 1], e.children = [], t.tokens.push(e)) : t.md.block.parse(t.src, t.md, t.env, t.tokens)
				}
			}, {}],
			31: [function(t, e, i) {
				"use strict";
				e.exports = function(t) {
					var e, i, n, r = t.tokens;
					for (i = 0, n = r.length; i < n; i++) e = r[i], "inline" === e.type && t.md.inline.parse(e.content, t.md, t.env, e.children)
				}
			}, {}],
			32: [function(t, e, i) {
				"use strict";

				function n(t) {
					return /^<a[>\s]/i.test(t)
				}
				function r(t) {
					return /^<\/a\s*>/i.test(t)
				}
				var o = t("../common/utils").arrayReplaceAt;
				e.exports = function(t) {
					var e, i, a, s, l, u, c, h, d, p, f, m, g, v, _, y, b, w = t.tokens;
					if (t.md.options.linkify) for (i = 0, a = w.length; i < a; i++) if ("inline" === w[i].type && t.md.linkify.pretest(w[i].content)) for (s = w[i].children, g = 0, e = s.length - 1; e >= 0; e--) if (u = s[e], "link_close" !== u.type) {
						if ("html_inline" === u.type && (n(u.content) && g > 0 && g--, r(u.content) && g++), !(g > 0) && "text" === u.type && t.md.linkify.test(u.content)) {
							for (d = u.content, b = t.md.linkify.match(d), c = [], m = u.level, f = 0, h = 0; h < b.length; h++) v = b[h].url, _ = t.md.normalizeLink(v), t.md.validateLink(_) && (y = b[h].text, y = b[h].schema ? "mailto:" !== b[h].schema || /^mailto:/i.test(y) ? t.md.normalizeLinkText(y) : t.md.normalizeLinkText("mailto:" + y).replace(/^mailto:/, "") : t.md.normalizeLinkText("http://" + y).replace(/^http:\/\//, ""), p = b[h].index, p > f && (l = new t.Token("text", "", 0), l.content = d.slice(f, p), l.level = m, c.push(l)), l = new t.Token("link_open", "a", 1), l.attrs = [
								["href", _]
							], l.level = m++, l.markup = "linkify", l.info = "auto", c.push(l), l = new t.Token("text", "", 0), l.content = y, l.level = m, c.push(l), l = new t.Token("link_close", "a", (-1)), l.level = --m, l.markup = "linkify", l.info = "auto", c.push(l), f = b[h].lastIndex);
							f < d.length && (l = new t.Token("text", "", 0), l.content = d.slice(f), l.level = m, c.push(l)), w[i].children = s = o(s, e, c)
						}
					} else for (e--; s[e].level !== u.level && "link_open" !== s[e].type;) e--
				}
			}, {
				"../common/utils": 4
			}],
			33: [function(t, e, i) {
				"use strict";
				var n = /\r[\n\u0085]?|[\u2424\u2028\u0085]/g,
					r = /\u0000/g;
				e.exports = function(t) {
					var e;
					e = t.src.replace(n, "\n"), e = e.replace(r, "�"), t.src = e
				}
			}, {}],
			34: [function(t, e, i) {
				"use strict";

				function n(t, e) {
					return u[e.toLowerCase()]
				}
				function r(t) {
					var e, i;
					for (e = t.length - 1; e >= 0; e--) i = t[e], "text" === i.type && (i.content = i.content.replace(l, n))
				}
				function o(t) {
					var e, i;
					for (e = t.length - 1; e >= 0; e--) i = t[e], "text" === i.type && a.test(i.content) && (i.content = i.content.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])\u2026/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---([^-]|$)/gm, "$1—$2").replace(/(^|\s)--(\s|$)/gm, "$1–$2").replace(/(^|[^-\s])--([^-\s]|$)/gm, "$1–$2"))
				}
				var a = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/,
					s = /\((c|tm|r|p)\)/i,
					l = /\((c|tm|r|p)\)/gi,
					u = {
						c: "©",
						r: "®",
						p: "§",
						tm: "™"
					};
				e.exports = function(t) {
					var e;
					if (t.md.options.typographer) for (e = t.tokens.length - 1; e >= 0; e--)"inline" === t.tokens[e].type && (s.test(t.tokens[e].content) && r(t.tokens[e].children), a.test(t.tokens[e].content) && o(t.tokens[e].children))
				}
			}, {}],
			35: [function(t, e, i) {
				"use strict";

				function n(t, e, i) {
					return t.substr(0, e) + i + t.substr(e + 1)
				}
				function r(t, e) {
					var i, r, l, h, d, p, f, m, g, v, _, y, b, w, C, x, E, k, L, P, D;
					for (L = [], i = 0; i < t.length; i++) {
						for (r = t[i], f = t[i].level, E = L.length - 1; E >= 0 && !(L[E].level <= f); E--);
						if (L.length = E + 1, "text" === r.type) {
							l = r.content, d = 0, p = l.length;
							t: for (; d < p && (u.lastIndex = d, h = u.exec(l));) {
								if (C = x = !0, d = h.index + 1, k = "'" === h[0], g = 32, h.index - 1 >= 0) g = l.charCodeAt(h.index - 1);
								else for (E = i - 1; E >= 0; E--) if ("text" === t[E].type) {
									g = t[E].content.charCodeAt(t[E].content.length - 1);
									break
								}
								if (v = 32, d < p) v = l.charCodeAt(d);
								else for (E = i + 1; E < t.length; E++) if ("text" === t[E].type) {
									v = t[E].content.charCodeAt(0);
									break
								}
								if (_ = s(g) || a(String.fromCharCode(g)), y = s(v) || a(String.fromCharCode(v)), b = o(g), w = o(v), w ? C = !1 : y && (b || _ || (C = !1)), b ? x = !1 : _ && (w || y || (x = !1)), 34 === v && '"' === h[0] && g >= 48 && g <= 57 && (x = C = !1), C && x && (C = !1, x = y), C || x) {
									if (x) for (E = L.length - 1; E >= 0 && (m = L[E], !(L[E].level < f)); E--) if (m.single === k && L[E].level === f) {
										m = L[E], k ? (P = e.md.options.quotes[2], D = e.md.options.quotes[3]) : (P = e.md.options.quotes[0], D = e.md.options.quotes[1]), r.content = n(r.content, h.index, D), t[m.token].content = n(t[m.token].content, m.pos, P), d += D.length - 1, m.token === i && (d += P.length - 1), l = r.content, p = l.length, L.length = E;
										continue t
									}
									C ? L.push({
										token: i,
										pos: h.index,
										single: k,
										level: f
									}) : x && k && (r.content = n(r.content, h.index, c))
								} else k && (r.content = n(r.content, h.index, c))
							}
						}
					}
				}
				var o = t("../common/utils").isWhiteSpace,
					a = t("../common/utils").isPunctChar,
					s = t("../common/utils").isMdAsciiPunct,
					l = /['"]/,
					u = /['"]/g,
					c = "’";
				e.exports = function(t) {
					var e;
					if (t.md.options.typographer) for (e = t.tokens.length - 1; e >= 0; e--)"inline" === t.tokens[e].type && l.test(t.tokens[e].content) && r(t.tokens[e].children, t)
				}
			}, {
				"../common/utils": 4
			}],
			36: [function(t, e, i) {
				"use strict";

				function n(t, e, i) {
					this.src = t, this.env = i, this.tokens = [], this.inlineMode = !1, this.md = e
				}
				var r = t("../token");
				n.prototype.Token = r, e.exports = n
			}, {
				"../token": 51
			}],
			37: [function(t, e, i) {
				"use strict";
				var n = /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/,
					r = /^<([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)>/;
				e.exports = function(t, e) {
					var i, o, a, s, l, u, c = t.pos;
					return 60 === t.src.charCodeAt(c) && (i = t.src.slice(c), !(i.indexOf(">") < 0 || (r.test(i) ? (o = i.match(r), s = o[0].slice(1, -1), l = t.md.normalizeLink(s), !t.md.validateLink(l) || (e || (u = t.push("link_open", "a", 1), u.attrs = [
						["href", l]
					], u.markup = "autolink", u.info = "auto", u = t.push("text", "", 0), u.content = t.md.normalizeLinkText(s), u = t.push("link_close", "a", -1), u.markup = "autolink", u.info = "auto"), t.pos += o[0].length, 0)) : !n.test(i) || (a = i.match(n), s = a[0].slice(1, -1), l = t.md.normalizeLink("mailto:" + s), !t.md.validateLink(l) || (e || (u = t.push("link_open", "a", 1), u.attrs = [
						["href", l]
					], u.markup = "autolink", u.info = "auto", u = t.push("text", "", 0), u.content = t.md.normalizeLinkText(s), u = t.push("link_close", "a", -1), u.markup = "autolink", u.info = "auto"), t.pos += a[0].length, 0)))))
				}
			}, {}],
			38: [function(t, e, i) {
				"use strict";
				e.exports = function(t, e) {
					var i, n, r, o, a, s, l = t.pos,
						u = t.src.charCodeAt(l);
					if (96 !== u) return !1;
					for (i = l, l++, n = t.posMax; l < n && 96 === t.src.charCodeAt(l);) l++;
					for (r = t.src.slice(i, l), o = a = l;
					(o = t.src.indexOf("`", a)) !== -1;) {
						for (a = o + 1; a < n && 96 === t.src.charCodeAt(a);) a++;
						if (a - o === r.length) return e || (s = t.push("code_inline", "code", 0), s.markup = r, s.content = t.src.slice(l, o).replace(/[ \n]+/g, " ").trim()), t.pos = a, !0
					}
					return e || (t.pending += r), t.pos += r.length, !0
				}
			}, {}],
			39: [function(t, e, i) {
				"use strict";
				e.exports = function(t) {
					var e, i, n, r, o = t.delimiters,
						a = t.delimiters.length;
					for (e = 0; e < a; e++) if (n = o[e], n.close) for (i = e - n.jump - 1; i >= 0;) {
						if (r = o[i], r.open && r.marker === n.marker && r.end < 0 && r.level === n.level) {
							n.jump = e - i, n.open = !1, r.end = e, r.jump = 0;
							break
						}
						i -= r.jump + 1
					}
				}
			}, {}],
			40: [function(t, e, i) {
				"use strict";
				e.exports.tokenize = function(t, e) {
					var i, n, r, o = t.pos,
						a = t.src.charCodeAt(o);
					if (e) return !1;
					if (95 !== a && 42 !== a) return !1;
					for (n = t.scanDelims(t.pos, 42 === a), i = 0; i < n.length; i++) r = t.push("text", "", 0), r.content = String.fromCharCode(a), t.delimiters.push({
						marker: a,
						jump: i,
						token: t.tokens.length - 1,
						level: t.level,
						end: -1,
						open: n.can_open,
						close: n.can_close
					});
					return t.pos += n.length, !0
				}, e.exports.postProcess = function(t) {
					var e, i, n, r, o, a, s = t.delimiters,
						l = t.delimiters.length;
					for (e = 0; e < l; e++) i = s[e], 95 !== i.marker && 42 !== i.marker || i.end !== -1 && (n = s[i.end], a = e + 1 < l && s[e + 1].end === i.end - 1 && s[e + 1].token === i.token + 1 && s[i.end - 1].token === n.token - 1 && s[e + 1].marker === i.marker, o = String.fromCharCode(i.marker), r = t.tokens[i.token], r.type = a ? "strong_open" : "em_open", r.tag = a ? "strong" : "em", r.nesting = 1, r.markup = a ? o + o : o, r.content = "", r = t.tokens[n.token], r.type = a ? "strong_close" : "em_close", r.tag = a ? "strong" : "em", r.nesting = -1, r.markup = a ? o + o : o, r.content = "", a && (t.tokens[s[e + 1].token].content = "", t.tokens[s[i.end - 1].token].content = "", e++))
				}
			}, {}],
			41: [function(t, e, i) {
				"use strict";
				var n = t("../common/entities"),
					r = t("../common/utils").has,
					o = t("../common/utils").isValidEntityCode,
					a = t("../common/utils").fromCodePoint,
					s = /^&#((?:x[a-f0-9]{1,8}|[0-9]{1,8}));/i,
					l = /^&([a-z][a-z0-9]{1,31});/i;
				e.exports = function(t, e) {
					var i, u, c, h = t.pos,
						d = t.posMax;
					if (38 !== t.src.charCodeAt(h)) return !1;
					if (h + 1 < d) if (i = t.src.charCodeAt(h + 1), 35 === i) {
						if (c = t.src.slice(h).match(s)) return e || (u = "x" === c[1][0].toLowerCase() ? parseInt(c[1].slice(1), 16) : parseInt(c[1], 10), t.pending += a(o(u) ? u : 65533)), t.pos += c[0].length, !0
					} else if (c = t.src.slice(h).match(l), c && r(n, c[1])) return e || (t.pending += n[c[1]]), t.pos += c[0].length, !0;
					return e || (t.pending += "&"), t.pos++, !0
				}
			}, {
				"../common/entities": 1,
				"../common/utils": 4
			}],
			42: [function(t, e, i) {
				"use strict";
				for (var n = t("../common/utils").isSpace, r = [], o = 0; o < 256; o++) r.push(0);
				"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(t) {
					r[t.charCodeAt(0)] = 1
				}), e.exports = function(t, e) {
					var i, o = t.pos,
						a = t.posMax;
					if (92 !== t.src.charCodeAt(o)) return !1;
					if (o++, o < a) {
						if (i = t.src.charCodeAt(o), i < 256 && 0 !== r[i]) return e || (t.pending += t.src[o]), t.pos += 2, !0;
						if (10 === i) {
							for (e || t.push("hardbreak", "br", 0), o++; o < a && (i = t.src.charCodeAt(o), n(i));) o++;
							return t.pos = o, !0
						}
					}
					return e || (t.pending += "\\"), t.pos++, !0
				}
			}, {
				"../common/utils": 4
			}],
			43: [function(t, e, i) {
				"use strict";

				function n(t) {
					var e = 32 | t;
					return e >= 97 && e <= 122
				}
				var r = t("../common/html_re").HTML_TAG_RE;
				e.exports = function(t, e) {
					var i, o, a, s, l = t.pos;
					return !(!t.md.options.html || (a = t.posMax, 60 !== t.src.charCodeAt(l) || l + 2 >= a || (i = t.src.charCodeAt(l + 1), 33 !== i && 63 !== i && 47 !== i && !n(i) || !(o = t.src.slice(l).match(r)) || (e || (s = t.push("html_inline", "", 0), s.content = t.src.slice(l, l + o[0].length)), t.pos += o[0].length, 0))))
				}
			}, {
				"../common/html_re": 3
			}],
			44: [function(t, e, i) {
				"use strict";
				var n = t("../helpers/parse_link_label"),
					r = t("../helpers/parse_link_destination"),
					o = t("../helpers/parse_link_title"),
					a = t("../common/utils").normalizeReference,
					s = t("../common/utils").isSpace;
				e.exports = function(t, e) {
					var i, l, u, c, h, d, p, f, m, g, v, _, y, b = "",
						w = t.pos,
						C = t.posMax;
					if (33 !== t.src.charCodeAt(t.pos)) return !1;
					if (91 !== t.src.charCodeAt(t.pos + 1)) return !1;
					if (d = t.pos + 2, h = n(t, t.pos + 1, !1), h < 0) return !1;
					if (p = h + 1, p < C && 40 === t.src.charCodeAt(p)) {
						for (p++; p < C && (l = t.src.charCodeAt(p), s(l) || 10 === l); p++);
						if (p >= C) return !1;
						for (y = p, m = r(t.src, p, t.posMax), m.ok && (b = t.md.normalizeLink(m.str), t.md.validateLink(b) ? p = m.pos : b = ""), y = p; p < C && (l = t.src.charCodeAt(p), s(l) || 10 === l); p++);
						if (m = o(t.src, p, t.posMax), p < C && y !== p && m.ok) for (g = m.str, p = m.pos; p < C && (l = t.src.charCodeAt(p), s(l) || 10 === l); p++);
						else g = "";
						if (p >= C || 41 !== t.src.charCodeAt(p)) return t.pos = w, !1;
						p++
					} else {
						if ("undefined" == typeof t.env.references) return !1;
						if (p < C && 91 === t.src.charCodeAt(p) ? (y = p + 1, p = n(t, p), p >= 0 ? c = t.src.slice(y, p++) : p = h + 1) : p = h + 1, c || (c = t.src.slice(d, h)), f = t.env.references[a(c)], !f) return t.pos = w, !1;
						b = f.href, g = f.title
					}
					return e || (u = t.src.slice(d, h), t.md.inline.parse(u, t.md, t.env, _ = []), v = t.push("image", "img", 0), v.attrs = i = [
						["src", b],
						["alt", ""]
					], v.children = _, v.content = u, g && i.push(["title", g])), t.pos = p, t.posMax = C, !0
				}
			}, {
				"../common/utils": 4,
				"../helpers/parse_link_destination": 6,
				"../helpers/parse_link_label": 7,
				"../helpers/parse_link_title": 8
			}],
			45: [function(t, e, i) {
				"use strict";
				var n = t("../helpers/parse_link_label"),
					r = t("../helpers/parse_link_destination"),
					o = t("../helpers/parse_link_title"),
					a = t("../common/utils").normalizeReference,
					s = t("../common/utils").isSpace;
				e.exports = function(t, e) {
					var i, l, u, c, h, d, p, f, m, g, v = "",
						_ = t.pos,
						y = t.posMax,
						b = t.pos;
					if (91 !== t.src.charCodeAt(t.pos)) return !1;
					if (h = t.pos + 1, c = n(t, t.pos, !0), c < 0) return !1;
					if (d = c + 1, d < y && 40 === t.src.charCodeAt(d)) {
						for (d++; d < y && (l = t.src.charCodeAt(d), s(l) || 10 === l); d++);
						if (d >= y) return !1;
						for (b = d, p = r(t.src, d, t.posMax), p.ok && (v = t.md.normalizeLink(p.str), t.md.validateLink(v) ? d = p.pos : v = ""), b = d; d < y && (l = t.src.charCodeAt(d), s(l) || 10 === l); d++);
						if (p = o(t.src, d, t.posMax), d < y && b !== d && p.ok) for (m = p.str, d = p.pos; d < y && (l = t.src.charCodeAt(d), s(l) || 10 === l); d++);
						else m = "";
						if (d >= y || 41 !== t.src.charCodeAt(d)) return t.pos = _, !1;
						d++
					} else {
						if ("undefined" == typeof t.env.references) return !1;
						if (d < y && 91 === t.src.charCodeAt(d) ? (b = d + 1, d = n(t, d), d >= 0 ? u = t.src.slice(b, d++) : d = c + 1) : d = c + 1, u || (u = t.src.slice(h, c)), f = t.env.references[a(u)], !f) return t.pos = _, !1;
						v = f.href, m = f.title
					}
					return e || (t.pos = h, t.posMax = c, g = t.push("link_open", "a", 1), g.attrs = i = [
						["href", v]
					], m && i.push(["title", m]), t.md.inline.tokenize(t), g = t.push("link_close", "a", -1)), t.pos = d, t.posMax = y, !0
				}
			}, {
				"../common/utils": 4,
				"../helpers/parse_link_destination": 6,
				"../helpers/parse_link_label": 7,
				"../helpers/parse_link_title": 8
			}],
			46: [function(t, e, i) {
				"use strict";
				e.exports = function(t, e) {
					var i, n, r = t.pos;
					if (10 !== t.src.charCodeAt(r)) return !1;
					for (i = t.pending.length - 1, n = t.posMax, e || (i >= 0 && 32 === t.pending.charCodeAt(i) ? i >= 1 && 32 === t.pending.charCodeAt(i - 1) ? (t.pending = t.pending.replace(/ +$/, ""), t.push("hardbreak", "br", 0)) : (t.pending = t.pending.slice(0, -1), t.push("softbreak", "br", 0)) : t.push("softbreak", "br", 0)), r++; r < n && 32 === t.src.charCodeAt(r);) r++;
					return t.pos = r, !0
				}
			}, {}],
			47: [function(t, e, i) {
				"use strict";

				function n(t, e, i, n) {
					this.src = t, this.env = i, this.md = e, this.tokens = n, this.pos = 0, this.posMax = this.src.length, this.level = 0, this.pending = "", this.pendingLevel = 0, this.cache = {}, this.delimiters = []
				}
				var r = t("../token"),
					o = t("../common/utils").isWhiteSpace,
					a = t("../common/utils").isPunctChar,
					s = t("../common/utils").isMdAsciiPunct;
				n.prototype.pushPending = function() {
					var t = new r("text", "", 0);
					return t.content = this.pending, t.level = this.pendingLevel, this.tokens.push(t), this.pending = "", t
				}, n.prototype.push = function(t, e, i) {
					this.pending && this.pushPending();
					var n = new r(t, e, i);
					return i < 0 && this.level--, n.level = this.level, i > 0 && this.level++, this.pendingLevel = this.level, this.tokens.push(n), n
				}, n.prototype.scanDelims = function(t, e) {
					var i, n, r, l, u, c, h, d, p, f = t,
						m = !0,
						g = !0,
						v = this.posMax,
						_ = this.src.charCodeAt(t);
					for (i = t > 0 ? this.src.charCodeAt(t - 1) : 32; f < v && this.src.charCodeAt(f) === _;) f++;
					return r = f - t, n = f < v ? this.src.charCodeAt(f) : 32, h = s(i) || a(String.fromCharCode(i)), p = s(n) || a(String.fromCharCode(n)), c = o(i), d = o(n), d ? m = !1 : p && (c || h || (m = !1)), c ? g = !1 : h && (d || p || (g = !1)), e ? (l = m, u = g) : (l = m && (!g || h), u = g && (!m || p)), {
						can_open: l,
						can_close: u,
						length: r
					}
				}, n.prototype.Token = r, e.exports = n
			}, {
				"../common/utils": 4,
				"../token": 51
			}],
			48: [function(t, e, i) {
				"use strict";
				e.exports.tokenize = function(t, e) {
					var i, n, r, o, a, s = t.pos,
						l = t.src.charCodeAt(s);
					if (e) return !1;
					if (126 !== l) return !1;
					if (n = t.scanDelims(t.pos, !0), o = n.length, a = String.fromCharCode(l), o < 2) return !1;
					for (o % 2 && (r = t.push("text", "", 0), r.content = a, o--), i = 0; i < o; i += 2) r = t.push("text", "", 0), r.content = a + a, t.delimiters.push({
						marker: l,
						jump: i,
						token: t.tokens.length - 1,
						level: t.level,
						end: -1,
						open: n.can_open,
						close: n.can_close
					});
					return t.pos += n.length, !0
				}, e.exports.postProcess = function(t) {
					var e, i, n, r, o, a = [],
						s = t.delimiters,
						l = t.delimiters.length;
					for (e = 0; e < l; e++) n = s[e], 126 === n.marker && n.end !== -1 && (r = s[n.end], o = t.tokens[n.token], o.type = "s_open", o.tag = "s", o.nesting = 1, o.markup = "~~", o.content = "", o = t.tokens[r.token], o.type = "s_close", o.tag = "s", o.nesting = -1, o.markup = "~~", o.content = "", "text" === t.tokens[r.token - 1].type && "~" === t.tokens[r.token - 1].content && a.push(r.token - 1));
					for (; a.length;) {
						for (e = a.pop(), i = e + 1; i < t.tokens.length && "s_close" === t.tokens[i].type;) i++;
						i--, e !== i && (o = t.tokens[i], t.tokens[i] = t.tokens[e], t.tokens[e] = o)
					}
				}
			}, {}],
			49: [function(t, e, i) {
				"use strict";

				function n(t) {
					switch (t) {
					case 10:
					case 33:
					case 35:
					case 36:
					case 37:
					case 38:
					case 42:
					case 43:
					case 45:
					case 58:
					case 60:
					case 61:
					case 62:
					case 64:
					case 91:
					case 92:
					case 93:
					case 94:
					case 95:
					case 96:
					case 123:
					case 125:
					case 126:
						return !0;
					default:
						return !1
					}
				}
				e.exports = function(t, e) {
					for (var i = t.pos; i < t.posMax && !n(t.src.charCodeAt(i));) i++;
					return i !== t.pos && (e || (t.pending += t.src.slice(t.pos, i)), t.pos = i, !0)
				}
			}, {}],
			50: [function(t, e, i) {
				"use strict";
				e.exports = function(t) {
					var e, i, n = 0,
						r = t.tokens,
						o = t.tokens.length;
					for (e = i = 0; e < o; e++) n += r[e].nesting, r[e].level = n, "text" === r[e].type && e + 1 < o && "text" === r[e + 1].type ? r[e + 1].content = r[e].content + r[e + 1].content : (e !== i && (r[i] = r[e]), i++);
					e !== i && (r.length = i)
				}
			}, {}],
			51: [function(t, e, i) {
				"use strict";

				function n(t, e, i) {
					this.type = t, this.tag = e, this.attrs = null, this.map = null, this.nesting = i, this.level = 0, this.children = null, this.content = "", this.markup = "", this.info = "", this.meta = null, this.block = !1, this.hidden = !1
				}
				n.prototype.attrIndex = function(t) {
					var e, i, n;
					if (!this.attrs) return -1;
					for (e = this.attrs, i = 0, n = e.length; i < n; i++) if (e[i][0] === t) return i;
					return -1
				}, n.prototype.attrPush = function(t) {
					this.attrs ? this.attrs.push(t) : this.attrs = [t]
				}, n.prototype.attrSet = function(t, e) {
					var i = this.attrIndex(t),
						n = [t, e];
					i < 0 ? this.attrPush(n) : this.attrs[i] = n
				}, n.prototype.attrGet = function(t) {
					var e = this.attrIndex(t),
						i = null;
					return e >= 0 && (i = this.attrs[e][1]), i
				}, n.prototype.attrJoin = function(t, e) {
					var i = this.attrIndex(t);
					i < 0 ? this.attrPush([t, e]) : this.attrs[i][1] = this.attrs[i][1] + " " + e
				}, e.exports = n
			}, {}],
			52: [function(e, i, n) {
				(function(e) {
					!
					function(r) {
						function o(t) {
							throw new RangeError(N[t])
						}
						function a(t, e) {
							for (var i = t.length, n = []; i--;) n[i] = e(t[i]);
							return n
						}
						function s(t, e) {
							var i = t.split("@"),
								n = "";
							i.length > 1 && (n = i[0] + "@", t = i[1]), t = t.replace(O, ".");
							var r = t.split("."),
								o = a(r, e).join(".");
							return n + o
						}
						function l(t) {
							for (var e, i, n = [], r = 0, o = t.length; r < o;) e = t.charCodeAt(r++), e >= 55296 && e <= 56319 && r < o ? (i = t.charCodeAt(r++), 56320 == (64512 & i) ? n.push(((1023 & e) << 10) + (1023 & i) + 65536) : (n.push(e), r--)) : n.push(e);
							return n
						}
						function u(t) {
							return a(t, function(t) {
								var e = "";
								return t > 65535 && (t -= 65536, e += F(t >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), e += F(t)
							}).join("")
						}
						function c(t) {
							return t - 48 < 10 ? t - 22 : t - 65 < 26 ? t - 65 : t - 97 < 26 ? t - 97 : x
						}
						function h(t, e) {
							return t + 22 + 75 * (t < 26) - ((0 != e) << 5)
						}
						function d(t, e, i) {
							var n = 0;
							for (t = i ? R(t / P) : t >> 1, t += R(t / e); t > I * k >> 1; n += x) t = R(t / I);
							return R(n + (I + 1) * t / (t + L))
						}
						function p(t) {
							var e, i, n, r, a, s, l, h, p, f, m = [],
								g = t.length,
								v = 0,
								_ = T,
								y = D;
							for (i = t.lastIndexOf(S), i < 0 && (i = 0), n = 0; n < i; ++n) t.charCodeAt(n) >= 128 && o("not-basic"), m.push(t.charCodeAt(n));
							for (r = i > 0 ? i + 1 : 0; r < g;) {
								for (a = v, s = 1, l = x; r >= g && o("invalid-input"), h = c(t.charCodeAt(r++)), (h >= x || h > R((C - v) / s)) && o("overflow"), v += h * s, p = l <= y ? E : l >= y + k ? k : l - y, !(h < p); l += x) f = x - p, s > R(C / f) && o("overflow"), s *= f;
								e = m.length + 1, y = d(v - a, e, 0 == a), R(v / e) > C - _ && o("overflow"), _ += R(v / e), v %= e, m.splice(v++, 0, _)
							}
							return u(m)
						}
						function f(t) {
							var e, i, n, r, a, s, u, c, p, f, m, g, v, _, y, b = [];
							for (t = l(t), g = t.length, e = T, i = 0, a = D, s = 0; s < g; ++s) m = t[s], m < 128 && b.push(F(m));
							for (n = r = b.length, r && b.push(S); n < g;) {
								for (u = C, s = 0; s < g; ++s) m = t[s], m >= e && m < u && (u = m);
								for (v = n + 1, u - e > R((C - i) / v) && o("overflow"), i += (u - e) * v, e = u, s = 0; s < g; ++s) if (m = t[s], m < e && ++i > C && o("overflow"), m == e) {
									for (c = i, p = x; f = p <= a ? E : p >= a + k ? k : p - a, !(c < f); p += x) y = c - f, _ = x - f, b.push(F(h(f + y % _, 0))), c = R(y / _);
									b.push(F(h(c, 0))), a = d(i, v, n == r), i = 0, ++n
								}++i, ++e
							}
							return b.join("")
						}
						function m(t) {
							return s(t, function(t) {
								return M.test(t) ? p(t.slice(4).toLowerCase()) : t
							})
						}
						function g(t) {
							return s(t, function(t) {
								return A.test(t) ? "xn--" + f(t) : t
							})
						}
						var v = "object" == typeof n && n && !n.nodeType && n,
							_ = "object" == typeof i && i && !i.nodeType && i,
							y = "object" == typeof e && e;
						y.global !== y && y.window !== y && y.self !== y || (r = y);
						var b, w, C = 2147483647,
							x = 36,
							E = 1,
							k = 26,
							L = 38,
							P = 700,
							D = 72,
							T = 128,
							S = "-",
							M = /^xn--/,
							A = /[^\x20-\x7E]/,
							O = /[\x2E\u3002\uFF0E\uFF61]/g,
							N = {
								overflow: "Overflow: input needs wider integers to process",
								"not-basic": "Illegal input >= 0x80 (not a basic code point)",
								"invalid-input": "Invalid input"
							},
							I = x - E,
							R = Math.floor,
							F = String.fromCharCode;
						if (b = {
							version: "1.4.1",
							ucs2: {
								decode: l,
								encode: u
							},
							decode: p,
							encode: f,
							toASCII: g,
							toUnicode: m
						}, "function" == typeof t && "object" == typeof t.amd && t.amd) t("punycode", function() {
							return b
						});
						else if (v && _) if (i.exports == v) _.exports = b;
						else for (w in b) b.hasOwnProperty(w) && (v[w] = b[w]);
						else r.punycode = b
					}(this)
				}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
			}, {}],
			53: [function(t, e, i) {
				e.exports = {
					Aacute: "Á",
					aacute: "á",
					Abreve: "Ă",
					abreve: "ă",
					ac: "∾",
					acd: "∿",
					acE: "∾̳",
					Acirc: "Â",
					acirc: "â",
					acute: "´",
					Acy: "А",
					acy: "а",
					AElig: "Æ",
					aelig: "æ",
					af: "⁡",
					Afr: "𝔄",
					afr: "𝔞",
					Agrave: "À",
					agrave: "à",
					alefsym: "ℵ",
					aleph: "ℵ",
					Alpha: "Α",
					alpha: "α",
					Amacr: "Ā",
					amacr: "ā",
					amalg: "⨿",
					amp: "&",
					AMP: "&",
					andand: "⩕",
					And: "⩓",
					and: "∧",
					andd: "⩜",
					andslope: "⩘",
					andv: "⩚",
					ang: "∠",
					ange: "⦤",
					angle: "∠",
					angmsdaa: "⦨",
					angmsdab: "⦩",
					angmsdac: "⦪",
					angmsdad: "⦫",
					angmsdae: "⦬",
					angmsdaf: "⦭",
					angmsdag: "⦮",
					angmsdah: "⦯",
					angmsd: "∡",
					angrt: "∟",
					angrtvb: "⊾",
					angrtvbd: "⦝",
					angsph: "∢",
					angst: "Å",
					angzarr: "⍼",
					Aogon: "Ą",
					aogon: "ą",
					Aopf: "𝔸",
					aopf: "𝕒",
					apacir: "⩯",
					ap: "≈",
					apE: "⩰",
					ape: "≊",
					apid: "≋",
					apos: "'",
					ApplyFunction: "⁡",
					approx: "≈",
					approxeq: "≊",
					Aring: "Å",
					aring: "å",
					Ascr: "𝒜",
					ascr: "𝒶",
					Assign: "≔",
					ast: "*",
					asymp: "≈",
					asympeq: "≍",
					Atilde: "Ã",
					atilde: "ã",
					Auml: "Ä",
					auml: "ä",
					awconint: "∳",
					awint: "⨑",
					backcong: "≌",
					backepsilon: "϶",
					backprime: "‵",
					backsim: "∽",
					backsimeq: "⋍",
					Backslash: "∖",
					Barv: "⫧",
					barvee: "⊽",
					barwed: "⌅",
					Barwed: "⌆",
					barwedge: "⌅",
					bbrk: "⎵",
					bbrktbrk: "⎶",
					bcong: "≌",
					Bcy: "Б",
					bcy: "б",
					bdquo: "„",
					becaus: "∵",
					because: "∵",
					Because: "∵",
					bemptyv: "⦰",
					bepsi: "϶",
					bernou: "ℬ",
					Bernoullis: "ℬ",
					Beta: "Β",
					beta: "β",
					beth: "ℶ",
					between: "≬",
					Bfr: "𝔅",
					bfr: "𝔟",
					bigcap: "⋂",
					bigcirc: "◯",
					bigcup: "⋃",
					bigodot: "⨀",
					bigoplus: "⨁",
					bigotimes: "⨂",
					bigsqcup: "⨆",
					bigstar: "★",
					bigtriangledown: "▽",
					bigtriangleup: "△",
					biguplus: "⨄",
					bigvee: "⋁",
					bigwedge: "⋀",
					bkarow: "⤍",
					blacklozenge: "⧫",
					blacksquare: "▪",
					blacktriangle: "▴",
					blacktriangledown: "▾",
					blacktriangleleft: "◂",
					blacktriangleright: "▸",
					blank: "␣",
					blk12: "▒",
					blk14: "░",
					blk34: "▓",
					block: "█",
					bne: "=⃥",
					bnequiv: "≡⃥",
					bNot: "⫭",
					bnot: "⌐",
					Bopf: "𝔹",
					bopf: "𝕓",
					bot: "⊥",
					bottom: "⊥",
					bowtie: "⋈",
					boxbox: "⧉",
					boxdl: "┐",
					boxdL: "╕",
					boxDl: "╖",
					boxDL: "╗",
					boxdr: "┌",
					boxdR: "╒",
					boxDr: "╓",
					boxDR: "╔",
					boxh: "─",
					boxH: "═",
					boxhd: "┬",
					boxHd: "╤",
					boxhD: "╥",
					boxHD: "╦",
					boxhu: "┴",
					boxHu: "╧",
					boxhU: "╨",
					boxHU: "╩",
					boxminus: "⊟",
					boxplus: "⊞",
					boxtimes: "⊠",
					boxul: "┘",
					boxuL: "╛",
					boxUl: "╜",
					boxUL: "╝",
					boxur: "└",
					boxuR: "╘",
					boxUr: "╙",
					boxUR: "╚",
					boxv: "│",
					boxV: "║",
					boxvh: "┼",
					boxvH: "╪",
					boxVh: "╫",
					boxVH: "╬",
					boxvl: "┤",
					boxvL: "╡",
					boxVl: "╢",
					boxVL: "╣",
					boxvr: "├",
					boxvR: "╞",
					boxVr: "╟",
					boxVR: "╠",
					bprime: "‵",
					breve: "˘",
					Breve: "˘",
					brvbar: "¦",
					bscr: "𝒷",
					Bscr: "ℬ",
					bsemi: "⁏",
					bsim: "∽",
					bsime: "⋍",
					bsolb: "⧅",
					bsol: "\\",
					bsolhsub: "⟈",
					bull: "•",
					bullet: "•",
					bump: "≎",
					bumpE: "⪮",
					bumpe: "≏",
					Bumpeq: "≎",
					bumpeq: "≏",
					Cacute: "Ć",
					cacute: "ć",
					capand: "⩄",
					capbrcup: "⩉",
					capcap: "⩋",
					cap: "∩",
					Cap: "⋒",
					capcup: "⩇",
					capdot: "⩀",
					CapitalDifferentialD: "ⅅ",
					caps: "∩︀",
					caret: "⁁",
					caron: "ˇ",
					Cayleys: "ℭ",
					ccaps: "⩍",
					Ccaron: "Č",
					ccaron: "č",
					Ccedil: "Ç",
					ccedil: "ç",
					Ccirc: "Ĉ",
					ccirc: "ĉ",
					Cconint: "∰",
					ccups: "⩌",
					ccupssm: "⩐",
					Cdot: "Ċ",
					cdot: "ċ",
					cedil: "¸",
					Cedilla: "¸",
					cemptyv: "⦲",
					cent: "¢",
					centerdot: "·",
					CenterDot: "·",
					cfr: "𝔠",
					Cfr: "ℭ",
					CHcy: "Ч",
					chcy: "ч",
					check: "✓",
					checkmark: "✓",
					Chi: "Χ",
					chi: "χ",
					circ: "ˆ",
					circeq: "≗",
					circlearrowleft: "↺",
					circlearrowright: "↻",
					circledast: "⊛",
					circledcirc: "⊚",
					circleddash: "⊝",
					CircleDot: "⊙",
					circledR: "®",
					circledS: "Ⓢ",
					CircleMinus: "⊖",
					CirclePlus: "⊕",
					CircleTimes: "⊗",
					cir: "○",
					cirE: "⧃",
					cire: "≗",
					cirfnint: "⨐",
					cirmid: "⫯",
					cirscir: "⧂",
					ClockwiseContourIntegral: "∲",
					CloseCurlyDoubleQuote: "”",
					CloseCurlyQuote: "’",
					clubs: "♣",
					clubsuit: "♣",
					colon: ":",
					Colon: "∷",
					Colone: "⩴",
					colone: "≔",
					coloneq: "≔",
					comma: ",",
					commat: "@",
					comp: "∁",
					compfn: "∘",
					complement: "∁",
					complexes: "ℂ",
					cong: "≅",
					congdot: "⩭",
					Congruent: "≡",
					conint: "∮",
					Conint: "∯",
					ContourIntegral: "∮",
					copf: "𝕔",
					Copf: "ℂ",
					coprod: "∐",
					Coproduct: "∐",
					copy: "©",
					COPY: "©",
					copysr: "℗",
					CounterClockwiseContourIntegral: "∳",
					crarr: "↵",
					cross: "✗",
					Cross: "⨯",
					Cscr: "𝒞",
					cscr: "𝒸",
					csub: "⫏",
					csube: "⫑",
					csup: "⫐",
					csupe: "⫒",
					ctdot: "⋯",
					cudarrl: "⤸",
					cudarrr: "⤵",
					cuepr: "⋞",
					cuesc: "⋟",
					cularr: "↶",
					cularrp: "⤽",
					cupbrcap: "⩈",
					cupcap: "⩆",
					CupCap: "≍",
					cup: "∪",
					Cup: "⋓",
					cupcup: "⩊",
					cupdot: "⊍",
					cupor: "⩅",
					cups: "∪︀",
					curarr: "↷",
					curarrm: "⤼",
					curlyeqprec: "⋞",
					curlyeqsucc: "⋟",
					curlyvee: "⋎",
					curlywedge: "⋏",
					curren: "¤",
					curvearrowleft: "↶",
					curvearrowright: "↷",
					cuvee: "⋎",
					cuwed: "⋏",
					cwconint: "∲",
					cwint: "∱",
					cylcty: "⌭",
					dagger: "†",
					Dagger: "‡",
					daleth: "ℸ",
					darr: "↓",
					Darr: "↡",
					dArr: "⇓",
					dash: "‐",
					Dashv: "⫤",
					dashv: "⊣",
					dbkarow: "⤏",
					dblac: "˝",
					Dcaron: "Ď",
					dcaron: "ď",
					Dcy: "Д",
					dcy: "д",
					ddagger: "‡",
					ddarr: "⇊",
					DD: "ⅅ",
					dd: "ⅆ",
					DDotrahd: "⤑",
					ddotseq: "⩷",
					deg: "°",
					Del: "∇",
					Delta: "Δ",
					delta: "δ",
					demptyv: "⦱",
					dfisht: "⥿",
					Dfr: "𝔇",
					dfr: "𝔡",
					dHar: "⥥",
					dharl: "⇃",
					dharr: "⇂",
					DiacriticalAcute: "´",
					DiacriticalDot: "˙",
					DiacriticalDoubleAcute: "˝",
					DiacriticalGrave: "`",
					DiacriticalTilde: "˜",
					diam: "⋄",
					diamond: "⋄",
					Diamond: "⋄",
					diamondsuit: "♦",
					diams: "♦",
					die: "¨",
					DifferentialD: "ⅆ",
					digamma: "ϝ",
					disin: "⋲",
					div: "÷",
					divide: "÷",
					divideontimes: "⋇",
					divonx: "⋇",
					DJcy: "Ђ",
					djcy: "ђ",
					dlcorn: "⌞",
					dlcrop: "⌍",
					dollar: "$",
					Dopf: "𝔻",
					dopf: "𝕕",
					Dot: "¨",
					dot: "˙",
					DotDot: "⃜",
					doteq: "≐",
					doteqdot: "≑",
					DotEqual: "≐",
					dotminus: "∸",
					dotplus: "∔",
					dotsquare: "⊡",
					doublebarwedge: "⌆",
					DoubleContourIntegral: "∯",
					DoubleDot: "¨",
					DoubleDownArrow: "⇓",
					DoubleLeftArrow: "⇐",
					DoubleLeftRightArrow: "⇔",
					DoubleLeftTee: "⫤",
					DoubleLongLeftArrow: "⟸",
					DoubleLongLeftRightArrow: "⟺",
					DoubleLongRightArrow: "⟹",
					DoubleRightArrow: "⇒",
					DoubleRightTee: "⊨",
					DoubleUpArrow: "⇑",
					DoubleUpDownArrow: "⇕",
					DoubleVerticalBar: "∥",
					DownArrowBar: "⤓",
					downarrow: "↓",
					DownArrow: "↓",
					Downarrow: "⇓",
					DownArrowUpArrow: "⇵",
					DownBreve: "̑",
					downdownarrows: "⇊",
					downharpoonleft: "⇃",
					downharpoonright: "⇂",
					DownLeftRightVector: "⥐",
					DownLeftTeeVector: "⥞",
					DownLeftVectorBar: "⥖",
					DownLeftVector: "↽",
					DownRightTeeVector: "⥟",
					DownRightVectorBar: "⥗",
					DownRightVector: "⇁",
					DownTeeArrow: "↧",
					DownTee: "⊤",
					drbkarow: "⤐",
					drcorn: "⌟",
					drcrop: "⌌",
					Dscr: "𝒟",
					dscr: "𝒹",
					DScy: "Ѕ",
					dscy: "ѕ",
					dsol: "⧶",
					Dstrok: "Đ",
					dstrok: "đ",
					dtdot: "⋱",
					dtri: "▿",
					dtrif: "▾",
					duarr: "⇵",
					duhar: "⥯",
					dwangle: "⦦",
					DZcy: "Џ",
					dzcy: "џ",
					dzigrarr: "⟿",
					Eacute: "É",
					eacute: "é",
					easter: "⩮",
					Ecaron: "Ě",
					ecaron: "ě",
					Ecirc: "Ê",
					ecirc: "ê",
					ecir: "≖",
					ecolon: "≕",
					Ecy: "Э",
					ecy: "э",
					eDDot: "⩷",
					Edot: "Ė",
					edot: "ė",
					eDot: "≑",
					ee: "ⅇ",
					efDot: "≒",
					Efr: "𝔈",
					efr: "𝔢",
					eg: "⪚",
					Egrave: "È",
					egrave: "è",
					egs: "⪖",
					egsdot: "⪘",
					el: "⪙",
					Element: "∈",
					elinters: "⏧",
					ell: "ℓ",
					els: "⪕",
					elsdot: "⪗",
					Emacr: "Ē",
					emacr: "ē",
					empty: "∅",
					emptyset: "∅",
					EmptySmallSquare: "◻",
					emptyv: "∅",
					EmptyVerySmallSquare: "▫",
					emsp13: " ",
					emsp14: " ",
					emsp: " ",
					ENG: "Ŋ",
					eng: "ŋ",
					ensp: " ",
					Eogon: "Ę",
					eogon: "ę",
					Eopf: "𝔼",
					eopf: "𝕖",
					epar: "⋕",
					eparsl: "⧣",
					eplus: "⩱",
					epsi: "ε",
					Epsilon: "Ε",
					epsilon: "ε",
					epsiv: "ϵ",
					eqcirc: "≖",
					eqcolon: "≕",
					eqsim: "≂",
					eqslantgtr: "⪖",
					eqslantless: "⪕",
					Equal: "⩵",
					equals: "=",
					EqualTilde: "≂",
					equest: "≟",
					Equilibrium: "⇌",
					equiv: "≡",
					equivDD: "⩸",
					eqvparsl: "⧥",
					erarr: "⥱",
					erDot: "≓",
					escr: "ℯ",
					Escr: "ℰ",
					esdot: "≐",
					Esim: "⩳",
					esim: "≂",
					Eta: "Η",
					eta: "η",
					ETH: "Ð",
					eth: "ð",
					Euml: "Ë",
					euml: "ë",
					euro: "€",
					excl: "!",
					exist: "∃",
					Exists: "∃",
					expectation: "ℰ",
					exponentiale: "ⅇ",
					ExponentialE: "ⅇ",
					fallingdotseq: "≒",
					Fcy: "Ф",
					fcy: "ф",
					female: "♀",
					ffilig: "ﬃ",
					fflig: "ﬀ",
					ffllig: "ﬄ",
					Ffr: "𝔉",
					ffr: "𝔣",
					filig: "ﬁ",
					FilledSmallSquare: "◼",
					FilledVerySmallSquare: "▪",
					fjlig: "fj",
					flat: "♭",
					fllig: "ﬂ",
					fltns: "▱",
					fnof: "ƒ",
					Fopf: "𝔽",
					fopf: "𝕗",
					forall: "∀",
					ForAll: "∀",
					fork: "⋔",
					forkv: "⫙",
					Fouriertrf: "ℱ",
					fpartint: "⨍",
					frac12: "½",
					frac13: "⅓",
					frac14: "¼",
					frac15: "⅕",
					frac16: "⅙",
					frac18: "⅛",
					frac23: "⅔",
					frac25: "⅖",
					frac34: "¾",
					frac35: "⅗",
					frac38: "⅜",
					frac45: "⅘",
					frac56: "⅚",
					frac58: "⅝",
					frac78: "⅞",
					frasl: "⁄",
					frown: "⌢",
					fscr: "𝒻",
					Fscr: "ℱ",
					gacute: "ǵ",
					Gamma: "Γ",
					gamma: "γ",
					Gammad: "Ϝ",
					gammad: "ϝ",
					gap: "⪆",
					Gbreve: "Ğ",
					gbreve: "ğ",
					Gcedil: "Ģ",
					Gcirc: "Ĝ",
					gcirc: "ĝ",
					Gcy: "Г",
					gcy: "г",
					Gdot: "Ġ",
					gdot: "ġ",
					ge: "≥",
					gE: "≧",
					gEl: "⪌",
					gel: "⋛",
					geq: "≥",
					geqq: "≧",
					geqslant: "⩾",
					gescc: "⪩",
					ges: "⩾",
					gesdot: "⪀",
					gesdoto: "⪂",
					gesdotol: "⪄",
					gesl: "⋛︀",
					gesles: "⪔",
					Gfr: "𝔊",
					gfr: "𝔤",
					gg: "≫",
					Gg: "⋙",
					ggg: "⋙",
					gimel: "ℷ",
					GJcy: "Ѓ",
					gjcy: "ѓ",
					gla: "⪥",
					gl: "≷",
					glE: "⪒",
					glj: "⪤",
					gnap: "⪊",
					gnapprox: "⪊",
					gne: "⪈",
					gnE: "≩",
					gneq: "⪈",
					gneqq: "≩",
					gnsim: "⋧",
					Gopf: "𝔾",
					gopf: "𝕘",
					grave: "`",
					GreaterEqual: "≥",
					GreaterEqualLess: "⋛",
					GreaterFullEqual: "≧",
					GreaterGreater: "⪢",
					GreaterLess: "≷",
					GreaterSlantEqual: "⩾",
					GreaterTilde: "≳",
					Gscr: "𝒢",
					gscr: "ℊ",
					gsim: "≳",
					gsime: "⪎",
					gsiml: "⪐",
					gtcc: "⪧",
					gtcir: "⩺",
					gt: ">",
					GT: ">",
					Gt: "≫",
					gtdot: "⋗",
					gtlPar: "⦕",
					gtquest: "⩼",
					gtrapprox: "⪆",
					gtrarr: "⥸",
					gtrdot: "⋗",
					gtreqless: "⋛",
					gtreqqless: "⪌",
					gtrless: "≷",
					gtrsim: "≳",
					gvertneqq: "≩︀",
					gvnE: "≩︀",
					Hacek: "ˇ",
					hairsp: " ",
					half: "½",
					hamilt: "ℋ",
					HARDcy: "Ъ",
					hardcy: "ъ",
					harrcir: "⥈",
					harr: "↔",
					hArr: "⇔",
					harrw: "↭",
					Hat: "^",
					hbar: "ℏ",
					Hcirc: "Ĥ",
					hcirc: "ĥ",
					hearts: "♥",
					heartsuit: "♥",
					hellip: "…",
					hercon: "⊹",
					hfr: "𝔥",
					Hfr: "ℌ",
					HilbertSpace: "ℋ",
					hksearow: "⤥",
					hkswarow: "⤦",
					hoarr: "⇿",
					homtht: "∻",
					hookleftarrow: "↩",
					hookrightarrow: "↪",
					hopf: "𝕙",
					Hopf: "ℍ",
					horbar: "―",
					HorizontalLine: "─",
					hscr: "𝒽",
					Hscr: "ℋ",
					hslash: "ℏ",
					Hstrok: "Ħ",
					hstrok: "ħ",
					HumpDownHump: "≎",
					HumpEqual: "≏",
					hybull: "⁃",
					hyphen: "‐",
					Iacute: "Í",
					iacute: "í",
					ic: "⁣",
					Icirc: "Î",
					icirc: "î",
					Icy: "И",
					icy: "и",
					Idot: "İ",
					IEcy: "Е",
					iecy: "е",
					iexcl: "¡",
					iff: "⇔",
					ifr: "𝔦",
					Ifr: "ℑ",
					Igrave: "Ì",
					igrave: "ì",
					ii: "ⅈ",
					iiiint: "⨌",
					iiint: "∭",
					iinfin: "⧜",
					iiota: "℩",
					IJlig: "Ĳ",
					ijlig: "ĳ",
					Imacr: "Ī",
					imacr: "ī",
					image: "ℑ",
					ImaginaryI: "ⅈ",
					imagline: "ℐ",
					imagpart: "ℑ",
					imath: "ı",
					Im: "ℑ",
					imof: "⊷",
					imped: "Ƶ",
					Implies: "⇒",
					incare: "℅",
					"in": "∈",
					infin: "∞",
					infintie: "⧝",
					inodot: "ı",
					intcal: "⊺",
					"int": "∫",
					Int: "∬",
					integers: "ℤ",
					Integral: "∫",
					intercal: "⊺",
					Intersection: "⋂",
					intlarhk: "⨗",
					intprod: "⨼",
					InvisibleComma: "⁣",
					InvisibleTimes: "⁢",
					IOcy: "Ё",
					iocy: "ё",
					Iogon: "Į",
					iogon: "į",
					Iopf: "𝕀",
					iopf: "𝕚",
					Iota: "Ι",
					iota: "ι",
					iprod: "⨼",
					iquest: "¿",
					iscr: "𝒾",
					Iscr: "ℐ",
					isin: "∈",
					isindot: "⋵",
					isinE: "⋹",
					isins: "⋴",
					isinsv: "⋳",
					isinv: "∈",
					it: "⁢",
					Itilde: "Ĩ",
					itilde: "ĩ",
					Iukcy: "І",
					iukcy: "і",
					Iuml: "Ï",
					iuml: "ï",
					Jcirc: "Ĵ",
					jcirc: "ĵ",
					Jcy: "Й",
					jcy: "й",
					Jfr: "𝔍",
					jfr: "𝔧",
					jmath: "ȷ",
					Jopf: "𝕁",
					jopf: "𝕛",
					Jscr: "𝒥",
					jscr: "𝒿",
					Jsercy: "Ј",
					jsercy: "ј",
					Jukcy: "Є",
					jukcy: "є",
					Kappa: "Κ",
					kappa: "κ",
					kappav: "ϰ",
					Kcedil: "Ķ",
					kcedil: "ķ",
					Kcy: "К",
					kcy: "к",
					Kfr: "𝔎",
					kfr: "𝔨",
					kgreen: "ĸ",
					KHcy: "Х",
					khcy: "х",
					KJcy: "Ќ",
					kjcy: "ќ",
					Kopf: "𝕂",
					kopf: "𝕜",
					Kscr: "𝒦",
					kscr: "𝓀",
					lAarr: "⇚",
					Lacute: "Ĺ",
					lacute: "ĺ",
					laemptyv: "⦴",
					lagran: "ℒ",
					Lambda: "Λ",
					lambda: "λ",
					lang: "⟨",
					Lang: "⟪",
					langd: "⦑",
					langle: "⟨",
					lap: "⪅",
					Laplacetrf: "ℒ",
					laquo: "«",
					larrb: "⇤",
					larrbfs: "⤟",
					larr: "←",
					Larr: "↞",
					lArr: "⇐",
					larrfs: "⤝",
					larrhk: "↩",
					larrlp: "↫",
					larrpl: "⤹",
					larrsim: "⥳",
					larrtl: "↢",
					latail: "⤙",
					lAtail: "⤛",
					lat: "⪫",
					late: "⪭",
					lates: "⪭︀",
					lbarr: "⤌",
					lBarr: "⤎",
					lbbrk: "❲",
					lbrace: "{",
					lbrack: "[",
					lbrke: "⦋",
					lbrksld: "⦏",
					lbrkslu: "⦍",
					Lcaron: "Ľ",
					lcaron: "ľ",
					Lcedil: "Ļ",
					lcedil: "ļ",
					lceil: "⌈",
					lcub: "{",
					Lcy: "Л",
					lcy: "л",
					ldca: "⤶",
					ldquo: "“",
					ldquor: "„",
					ldrdhar: "⥧",
					ldrushar: "⥋",
					ldsh: "↲",
					le: "≤",
					lE: "≦",
					LeftAngleBracket: "⟨",
					LeftArrowBar: "⇤",
					leftarrow: "←",
					LeftArrow: "←",
					Leftarrow: "⇐",
					LeftArrowRightArrow: "⇆",
					leftarrowtail: "↢",
					LeftCeiling: "⌈",
					LeftDoubleBracket: "⟦",
					LeftDownTeeVector: "⥡",
					LeftDownVectorBar: "⥙",
					LeftDownVector: "⇃",
					LeftFloor: "⌊",
					leftharpoondown: "↽",
					leftharpoonup: "↼",
					leftleftarrows: "⇇",
					leftrightarrow: "↔",
					LeftRightArrow: "↔",
					Leftrightarrow: "⇔",
					leftrightarrows: "⇆",
					leftrightharpoons: "⇋",
					leftrightsquigarrow: "↭",
					LeftRightVector: "⥎",
					LeftTeeArrow: "↤",
					LeftTee: "⊣",
					LeftTeeVector: "⥚",
					leftthreetimes: "⋋",
					LeftTriangleBar: "⧏",
					LeftTriangle: "⊲",
					LeftTriangleEqual: "⊴",
					LeftUpDownVector: "⥑",
					LeftUpTeeVector: "⥠",
					LeftUpVectorBar: "⥘",
					LeftUpVector: "↿",
					LeftVectorBar: "⥒",
					LeftVector: "↼",
					lEg: "⪋",
					leg: "⋚",
					leq: "≤",
					leqq: "≦",
					leqslant: "⩽",
					lescc: "⪨",
					les: "⩽",
					lesdot: "⩿",
					lesdoto: "⪁",
					lesdotor: "⪃",
					lesg: "⋚︀",
					lesges: "⪓",
					lessapprox: "⪅",
					lessdot: "⋖",
					lesseqgtr: "⋚",
					lesseqqgtr: "⪋",
					LessEqualGreater: "⋚",
					LessFullEqual: "≦",
					LessGreater: "≶",
					lessgtr: "≶",
					LessLess: "⪡",
					lesssim: "≲",
					LessSlantEqual: "⩽",
					LessTilde: "≲",
					lfisht: "⥼",
					lfloor: "⌊",
					Lfr: "𝔏",
					lfr: "𝔩",
					lg: "≶",
					lgE: "⪑",
					lHar: "⥢",
					lhard: "↽",
					lharu: "↼",
					lharul: "⥪",
					lhblk: "▄",
					LJcy: "Љ",
					ljcy: "љ",
					llarr: "⇇",
					ll: "≪",
					Ll: "⋘",
					llcorner: "⌞",
					Lleftarrow: "⇚",
					llhard: "⥫",
					lltri: "◺",
					Lmidot: "Ŀ",
					lmidot: "ŀ",
					lmoustache: "⎰",
					lmoust: "⎰",
					lnap: "⪉",
					lnapprox: "⪉",
					lne: "⪇",
					lnE: "≨",
					lneq: "⪇",
					lneqq: "≨",
					lnsim: "⋦",
					loang: "⟬",
					loarr: "⇽",
					lobrk: "⟦",
					longleftarrow: "⟵",
					LongLeftArrow: "⟵",
					Longleftarrow: "⟸",
					longleftrightarrow: "⟷",
					LongLeftRightArrow: "⟷",
					Longleftrightarrow: "⟺",
					longmapsto: "⟼",
					longrightarrow: "⟶",
					LongRightArrow: "⟶",
					Longrightarrow: "⟹",
					looparrowleft: "↫",
					looparrowright: "↬",
					lopar: "⦅",
					Lopf: "𝕃",
					lopf: "𝕝",
					loplus: "⨭",
					lotimes: "⨴",
					lowast: "∗",
					lowbar: "_",
					LowerLeftArrow: "↙",
					LowerRightArrow: "↘",
					loz: "◊",
					lozenge: "◊",
					lozf: "⧫",
					lpar: "(",
					lparlt: "⦓",
					lrarr: "⇆",
					lrcorner: "⌟",
					lrhar: "⇋",
					lrhard: "⥭",
					lrm: "‎",
					lrtri: "⊿",
					lsaquo: "‹",
					lscr: "𝓁",
					Lscr: "ℒ",
					lsh: "↰",
					Lsh: "↰",
					lsim: "≲",
					lsime: "⪍",
					lsimg: "⪏",
					lsqb: "[",
					lsquo: "‘",
					lsquor: "‚",
					Lstrok: "Ł",
					lstrok: "ł",
					ltcc: "⪦",
					ltcir: "⩹",
					lt: "<",
					LT: "<",
					Lt: "≪",
					ltdot: "⋖",
					lthree: "⋋",
					ltimes: "⋉",
					ltlarr: "⥶",
					ltquest: "⩻",
					ltri: "◃",
					ltrie: "⊴",
					ltrif: "◂",
					ltrPar: "⦖",
					lurdshar: "⥊",
					luruhar: "⥦",
					lvertneqq: "≨︀",
					lvnE: "≨︀",
					macr: "¯",
					male: "♂",
					malt: "✠",
					maltese: "✠",
					Map: "⤅",
					map: "↦",
					mapsto: "↦",
					mapstodown: "↧",
					mapstoleft: "↤",
					mapstoup: "↥",
					marker: "▮",
					mcomma: "⨩",
					Mcy: "М",
					mcy: "м",
					mdash: "—",
					mDDot: "∺",
					measuredangle: "∡",
					MediumSpace: " ",
					Mellintrf: "ℳ",
					Mfr: "𝔐",
					mfr: "𝔪",
					mho: "℧",
					micro: "µ",
					midast: "*",
					midcir: "⫰",
					mid: "∣",
					middot: "·",
					minusb: "⊟",
					minus: "−",
					minusd: "∸",
					minusdu: "⨪",
					MinusPlus: "∓",
					mlcp: "⫛",
					mldr: "…",
					mnplus: "∓",
					models: "⊧",
					Mopf: "𝕄",
					mopf: "𝕞",
					mp: "∓",
					mscr: "𝓂",
					Mscr: "ℳ",
					mstpos: "∾",
					Mu: "Μ",
					mu: "μ",
					multimap: "⊸",
					mumap: "⊸",
					nabla: "∇",
					Nacute: "Ń",
					nacute: "ń",
					nang: "∠⃒",
					nap: "≉",
					napE: "⩰̸",
					napid: "≋̸",
					napos: "ŉ",
					napprox: "≉",
					natural: "♮",
					naturals: "ℕ",
					natur: "♮",
					nbsp: " ",
					nbump: "≎̸",
					nbumpe: "≏̸",
					ncap: "⩃",
					Ncaron: "Ň",
					ncaron: "ň",
					Ncedil: "Ņ",
					ncedil: "ņ",
					ncong: "≇",
					ncongdot: "⩭̸",
					ncup: "⩂",
					Ncy: "Н",
					ncy: "н",
					ndash: "–",
					nearhk: "⤤",
					nearr: "↗",
					neArr: "⇗",
					nearrow: "↗",
					ne: "≠",
					nedot: "≐̸",
					NegativeMediumSpace: "​",
					NegativeThickSpace: "​",
					NegativeThinSpace: "​",
					NegativeVeryThinSpace: "​",
					nequiv: "≢",
					nesear: "⤨",
					nesim: "≂̸",
					NestedGreaterGreater: "≫",
					NestedLessLess: "≪",
					NewLine: "\n",
					nexist: "∄",
					nexists: "∄",
					Nfr: "𝔑",
					nfr: "𝔫",
					ngE: "≧̸",
					nge: "≱",
					ngeq: "≱",
					ngeqq: "≧̸",
					ngeqslant: "⩾̸",
					nges: "⩾̸",
					nGg: "⋙̸",
					ngsim: "≵",
					nGt: "≫⃒",
					ngt: "≯",
					ngtr: "≯",
					nGtv: "≫̸",
					nharr: "↮",
					nhArr: "⇎",
					nhpar: "⫲",
					ni: "∋",
					nis: "⋼",
					nisd: "⋺",
					niv: "∋",
					NJcy: "Њ",
					njcy: "њ",
					nlarr: "↚",
					nlArr: "⇍",
					nldr: "‥",
					nlE: "≦̸",
					nle: "≰",
					nleftarrow: "↚",
					nLeftarrow: "⇍",
					nleftrightarrow: "↮",
					nLeftrightarrow: "⇎",
					nleq: "≰",
					nleqq: "≦̸",
					nleqslant: "⩽̸",
					nles: "⩽̸",
					nless: "≮",
					nLl: "⋘̸",
					nlsim: "≴",
					nLt: "≪⃒",
					nlt: "≮",
					nltri: "⋪",
					nltrie: "⋬",
					nLtv: "≪̸",
					nmid: "∤",
					NoBreak: "⁠",
					NonBreakingSpace: " ",
					nopf: "𝕟",
					Nopf: "ℕ",
					Not: "⫬",
					not: "¬",
					NotCongruent: "≢",
					NotCupCap: "≭",
					NotDoubleVerticalBar: "∦",
					NotElement: "∉",
					NotEqual: "≠",
					NotEqualTilde: "≂̸",
					NotExists: "∄",
					NotGreater: "≯",
					NotGreaterEqual: "≱",
					NotGreaterFullEqual: "≧̸",
					NotGreaterGreater: "≫̸",
					NotGreaterLess: "≹",
					NotGreaterSlantEqual: "⩾̸",
					NotGreaterTilde: "≵",
					NotHumpDownHump: "≎̸",
					NotHumpEqual: "≏̸",
					notin: "∉",
					notindot: "⋵̸",
					notinE: "⋹̸",
					notinva: "∉",
					notinvb: "⋷",
					notinvc: "⋶",
					NotLeftTriangleBar: "⧏̸",
					NotLeftTriangle: "⋪",
					NotLeftTriangleEqual: "⋬",
					NotLess: "≮",
					NotLessEqual: "≰",
					NotLessGreater: "≸",
					NotLessLess: "≪̸",
					NotLessSlantEqual: "⩽̸",
					NotLessTilde: "≴",
					NotNestedGreaterGreater: "⪢̸",
					NotNestedLessLess: "⪡̸",
					notni: "∌",
					notniva: "∌",
					notnivb: "⋾",
					notnivc: "⋽",
					NotPrecedes: "⊀",
					NotPrecedesEqual: "⪯̸",
					NotPrecedesSlantEqual: "⋠",
					NotReverseElement: "∌",
					NotRightTriangleBar: "⧐̸",
					NotRightTriangle: "⋫",
					NotRightTriangleEqual: "⋭",
					NotSquareSubset: "⊏̸",
					NotSquareSubsetEqual: "⋢",
					NotSquareSuperset: "⊐̸",
					NotSquareSupersetEqual: "⋣",
					NotSubset: "⊂⃒",
					NotSubsetEqual: "⊈",
					NotSucceeds: "⊁",
					NotSucceedsEqual: "⪰̸",
					NotSucceedsSlantEqual: "⋡",
					NotSucceedsTilde: "≿̸",
					NotSuperset: "⊃⃒",
					NotSupersetEqual: "⊉",
					NotTilde: "≁",
					NotTildeEqual: "≄",
					NotTildeFullEqual: "≇",
					NotTildeTilde: "≉",
					NotVerticalBar: "∤",
					nparallel: "∦",
					npar: "∦",
					nparsl: "⫽⃥",
					npart: "∂̸",
					npolint: "⨔",
					npr: "⊀",
					nprcue: "⋠",
					nprec: "⊀",
					npreceq: "⪯̸",
					npre: "⪯̸",
					nrarrc: "⤳̸",
					nrarr: "↛",
					nrArr: "⇏",
					nrarrw: "↝̸",
					nrightarrow: "↛",
					nRightarrow: "⇏",
					nrtri: "⋫",
					nrtrie: "⋭",
					nsc: "⊁",
					nsccue: "⋡",
					nsce: "⪰̸",
					Nscr: "𝒩",
					nscr: "𝓃",
					nshortmid: "∤",
					nshortparallel: "∦",
					nsim: "≁",
					nsime: "≄",
					nsimeq: "≄",
					nsmid: "∤",
					nspar: "∦",
					nsqsube: "⋢",
					nsqsupe: "⋣",
					nsub: "⊄",
					nsubE: "⫅̸",
					nsube: "⊈",
					nsubset: "⊂⃒",
					nsubseteq: "⊈",
					nsubseteqq: "⫅̸",
					nsucc: "⊁",
					nsucceq: "⪰̸",
					nsup: "⊅",
					nsupE: "⫆̸",
					nsupe: "⊉",
					nsupset: "⊃⃒",
					nsupseteq: "⊉",
					nsupseteqq: "⫆̸",
					ntgl: "≹",
					Ntilde: "Ñ",
					ntilde: "ñ",
					ntlg: "≸",
					ntriangleleft: "⋪",
					ntrianglelefteq: "⋬",
					ntriangleright: "⋫",
					ntrianglerighteq: "⋭",
					Nu: "Ν",
					nu: "ν",
					num: "#",
					numero: "№",
					numsp: " ",
					nvap: "≍⃒",
					nvdash: "⊬",
					nvDash: "⊭",
					nVdash: "⊮",
					nVDash: "⊯",
					nvge: "≥⃒",
					nvgt: ">⃒",
					nvHarr: "⤄",
					nvinfin: "⧞",
					nvlArr: "⤂",
					nvle: "≤⃒",
					nvlt: "<⃒",
					nvltrie: "⊴⃒",
					nvrArr: "⤃",
					nvrtrie: "⊵⃒",
					nvsim: "∼⃒",
					nwarhk: "⤣",
					nwarr: "↖",
					nwArr: "⇖",
					nwarrow: "↖",
					nwnear: "⤧",
					Oacute: "Ó",
					oacute: "ó",
					oast: "⊛",
					Ocirc: "Ô",
					ocirc: "ô",
					ocir: "⊚",
					Ocy: "О",
					ocy: "о",
					odash: "⊝",
					Odblac: "Ő",
					odblac: "ő",
					odiv: "⨸",
					odot: "⊙",
					odsold: "⦼",
					OElig: "Œ",
					oelig: "œ",
					ofcir: "⦿",
					Ofr: "𝔒",
					ofr: "𝔬",
					ogon: "˛",
					Ograve: "Ò",
					ograve: "ò",
					ogt: "⧁",
					ohbar: "⦵",
					ohm: "Ω",
					oint: "∮",
					olarr: "↺",
					olcir: "⦾",
					olcross: "⦻",
					oline: "‾",
					olt: "⧀",
					Omacr: "Ō",
					omacr: "ō",
					Omega: "Ω",
					omega: "ω",
					Omicron: "Ο",
					omicron: "ο",
					omid: "⦶",
					ominus: "⊖",
					Oopf: "𝕆",
					oopf: "𝕠",
					opar: "⦷",
					OpenCurlyDoubleQuote: "“",
					OpenCurlyQuote: "‘",
					operp: "⦹",
					oplus: "⊕",
					orarr: "↻",
					Or: "⩔",
					or: "∨",
					ord: "⩝",
					order: "ℴ",
					orderof: "ℴ",
					ordf: "ª",
					ordm: "º",
					origof: "⊶",
					oror: "⩖",
					orslope: "⩗",
					orv: "⩛",
					oS: "Ⓢ",
					Oscr: "𝒪",
					oscr: "ℴ",
					Oslash: "Ø",
					oslash: "ø",
					osol: "⊘",
					Otilde: "Õ",
					otilde: "õ",
					otimesas: "⨶",
					Otimes: "⨷",
					otimes: "⊗",
					Ouml: "Ö",
					ouml: "ö",
					ovbar: "⌽",
					OverBar: "‾",
					OverBrace: "⏞",
					OverBracket: "⎴",
					OverParenthesis: "⏜",
					para: "¶",
					parallel: "∥",
					par: "∥",
					parsim: "⫳",
					parsl: "⫽",
					part: "∂",
					PartialD: "∂",
					Pcy: "П",
					pcy: "п",
					percnt: "%",
					period: ".",
					permil: "‰",
					perp: "⊥",
					pertenk: "‱",
					Pfr: "𝔓",
					pfr: "𝔭",
					Phi: "Φ",
					phi: "φ",
					phiv: "ϕ",
					phmmat: "ℳ",
					phone: "☎",
					Pi: "Π",
					pi: "π",
					pitchfork: "⋔",
					piv: "ϖ",
					planck: "ℏ",
					planckh: "ℎ",
					plankv: "ℏ",
					plusacir: "⨣",
					plusb: "⊞",
					pluscir: "⨢",
					plus: "+",
					plusdo: "∔",
					plusdu: "⨥",
					pluse: "⩲",
					PlusMinus: "±",
					plusmn: "±",
					plussim: "⨦",
					plustwo: "⨧",
					pm: "±",
					Poincareplane: "ℌ",
					pointint: "⨕",
					popf: "𝕡",
					Popf: "ℙ",
					pound: "£",
					prap: "⪷",
					Pr: "⪻",
					pr: "≺",
					prcue: "≼",
					precapprox: "⪷",
					prec: "≺",
					preccurlyeq: "≼",
					Precedes: "≺",
					PrecedesEqual: "⪯",
					PrecedesSlantEqual: "≼",
					PrecedesTilde: "≾",
					preceq: "⪯",
					precnapprox: "⪹",
					precneqq: "⪵",
					precnsim: "⋨",
					pre: "⪯",
					prE: "⪳",
					precsim: "≾",
					prime: "′",
					Prime: "″",
					primes: "ℙ",
					prnap: "⪹",
					prnE: "⪵",
					prnsim: "⋨",
					prod: "∏",
					Product: "∏",
					profalar: "⌮",
					profline: "⌒",
					profsurf: "⌓",
					prop: "∝",
					Proportional: "∝",
					Proportion: "∷",
					propto: "∝",
					prsim: "≾",
					prurel: "⊰",
					Pscr: "𝒫",
					pscr: "𝓅",
					Psi: "Ψ",
					psi: "ψ",
					puncsp: " ",
					Qfr: "𝔔",
					qfr: "𝔮",
					qint: "⨌",
					qopf: "𝕢",
					Qopf: "ℚ",
					qprime: "⁗",
					Qscr: "𝒬",
					qscr: "𝓆",
					quaternions: "ℍ",
					quatint: "⨖",
					quest: "?",
					questeq: "≟",
					quot: '"',
					QUOT: '"',
					rAarr: "⇛",
					race: "∽̱",
					Racute: "Ŕ",
					racute: "ŕ",
					radic: "√",
					raemptyv: "⦳",
					rang: "⟩",
					Rang: "⟫",
					rangd: "⦒",
					range: "⦥",
					rangle: "⟩",
					raquo: "»",
					rarrap: "⥵",
					rarrb: "⇥",
					rarrbfs: "⤠",
					rarrc: "⤳",
					rarr: "→",
					Rarr: "↠",
					rArr: "⇒",
					rarrfs: "⤞",
					rarrhk: "↪",
					rarrlp: "↬",
					rarrpl: "⥅",
					rarrsim: "⥴",
					Rarrtl: "⤖",
					rarrtl: "↣",
					rarrw: "↝",
					ratail: "⤚",
					rAtail: "⤜",
					ratio: "∶",
					rationals: "ℚ",
					rbarr: "⤍",
					rBarr: "⤏",
					RBarr: "⤐",
					rbbrk: "❳",
					rbrace: "}",
					rbrack: "]",
					rbrke: "⦌",
					rbrksld: "⦎",
					rbrkslu: "⦐",
					Rcaron: "Ř",
					rcaron: "ř",
					Rcedil: "Ŗ",
					rcedil: "ŗ",
					rceil: "⌉",
					rcub: "}",
					Rcy: "Р",
					rcy: "р",
					rdca: "⤷",
					rdldhar: "⥩",
					rdquo: "”",
					rdquor: "”",
					rdsh: "↳",
					real: "ℜ",
					realine: "ℛ",
					realpart: "ℜ",
					reals: "ℝ",
					Re: "ℜ",
					rect: "▭",
					reg: "®",
					REG: "®",
					ReverseElement: "∋",
					ReverseEquilibrium: "⇋",
					ReverseUpEquilibrium: "⥯",
					rfisht: "⥽",
					rfloor: "⌋",
					rfr: "𝔯",
					Rfr: "ℜ",
					rHar: "⥤",
					rhard: "⇁",
					rharu: "⇀",
					rharul: "⥬",
					Rho: "Ρ",
					rho: "ρ",
					rhov: "ϱ",
					RightAngleBracket: "⟩",
					RightArrowBar: "⇥",
					rightarrow: "→",
					RightArrow: "→",
					Rightarrow: "⇒",
					RightArrowLeftArrow: "⇄",
					rightarrowtail: "↣",
					RightCeiling: "⌉",
					RightDoubleBracket: "⟧",
					RightDownTeeVector: "⥝",
					RightDownVectorBar: "⥕",
					RightDownVector: "⇂",
					RightFloor: "⌋",
					rightharpoondown: "⇁",
					rightharpoonup: "⇀",
					rightleftarrows: "⇄",
					rightleftharpoons: "⇌",
					rightrightarrows: "⇉",
					rightsquigarrow: "↝",
					RightTeeArrow: "↦",
					RightTee: "⊢",
					RightTeeVector: "⥛",
					rightthreetimes: "⋌",
					RightTriangleBar: "⧐",
					RightTriangle: "⊳",
					RightTriangleEqual: "⊵",
					RightUpDownVector: "⥏",
					RightUpTeeVector: "⥜",
					RightUpVectorBar: "⥔",
					RightUpVector: "↾",
					RightVectorBar: "⥓",
					RightVector: "⇀",
					ring: "˚",
					risingdotseq: "≓",
					rlarr: "⇄",
					rlhar: "⇌",
					rlm: "‏",
					rmoustache: "⎱",
					rmoust: "⎱",
					rnmid: "⫮",
					roang: "⟭",
					roarr: "⇾",
					robrk: "⟧",
					ropar: "⦆",
					ropf: "𝕣",
					Ropf: "ℝ",
					roplus: "⨮",
					rotimes: "⨵",
					RoundImplies: "⥰",
					rpar: ")",
					rpargt: "⦔",
					rppolint: "⨒",
					rrarr: "⇉",
					Rrightarrow: "⇛",
					rsaquo: "›",
					rscr: "𝓇",
					Rscr: "ℛ",
					rsh: "↱",
					Rsh: "↱",
					rsqb: "]",
					rsquo: "’",
					rsquor: "’",
					rthree: "⋌",
					rtimes: "⋊",
					rtri: "▹",
					rtrie: "⊵",
					rtrif: "▸",
					rtriltri: "⧎",
					RuleDelayed: "⧴",
					ruluhar: "⥨",
					rx: "℞",
					Sacute: "Ś",
					sacute: "ś",
					sbquo: "‚",
					scap: "⪸",
					Scaron: "Š",
					scaron: "š",
					Sc: "⪼",
					sc: "≻",
					sccue: "≽",
					sce: "⪰",
					scE: "⪴",
					Scedil: "Ş",
					scedil: "ş",
					Scirc: "Ŝ",
					scirc: "ŝ",
					scnap: "⪺",
					scnE: "⪶",
					scnsim: "⋩",
					scpolint: "⨓",
					scsim: "≿",
					Scy: "С",
					scy: "с",
					sdotb: "⊡",
					sdot: "⋅",
					sdote: "⩦",
					searhk: "⤥",
					searr: "↘",
					seArr: "⇘",
					searrow: "↘",
					sect: "§",
					semi: ";",
					seswar: "⤩",
					setminus: "∖",
					setmn: "∖",
					sext: "✶",
					Sfr: "𝔖",
					sfr: "𝔰",
					sfrown: "⌢",
					sharp: "♯",
					SHCHcy: "Щ",
					shchcy: "щ",
					SHcy: "Ш",
					shcy: "ш",
					ShortDownArrow: "↓",
					ShortLeftArrow: "←",
					shortmid: "∣",
					shortparallel: "∥",
					ShortRightArrow: "→",
					ShortUpArrow: "↑",
					shy: "­",
					Sigma: "Σ",
					sigma: "σ",
					sigmaf: "ς",
					sigmav: "ς",
					sim: "∼",
					simdot: "⩪",
					sime: "≃",
					simeq: "≃",
					simg: "⪞",
					simgE: "⪠",
					siml: "⪝",
					simlE: "⪟",
					simne: "≆",
					simplus: "⨤",
					simrarr: "⥲",
					slarr: "←",
					SmallCircle: "∘",
					smallsetminus: "∖",
					smashp: "⨳",
					smeparsl: "⧤",
					smid: "∣",
					smile: "⌣",
					smt: "⪪",
					smte: "⪬",
					smtes: "⪬︀",
					SOFTcy: "Ь",
					softcy: "ь",
					solbar: "⌿",
					solb: "⧄",
					sol: "/",
					Sopf: "𝕊",
					sopf: "𝕤",
					spades: "♠",
					spadesuit: "♠",
					spar: "∥",
					sqcap: "⊓",
					sqcaps: "⊓︀",
					sqcup: "⊔",
					sqcups: "⊔︀",
					Sqrt: "√",
					sqsub: "⊏",
					sqsube: "⊑",
					sqsubset: "⊏",
					sqsubseteq: "⊑",
					sqsup: "⊐",
					sqsupe: "⊒",
					sqsupset: "⊐",
					sqsupseteq: "⊒",
					square: "□",
					Square: "□",
					SquareIntersection: "⊓",
					SquareSubset: "⊏",
					SquareSubsetEqual: "⊑",
					SquareSuperset: "⊐",
					SquareSupersetEqual: "⊒",
					SquareUnion: "⊔",
					squarf: "▪",
					squ: "□",
					squf: "▪",
					srarr: "→",
					Sscr: "𝒮",
					sscr: "𝓈",
					ssetmn: "∖",
					ssmile: "⌣",
					sstarf: "⋆",
					Star: "⋆",
					star: "☆",
					starf: "★",
					straightepsilon: "ϵ",
					straightphi: "ϕ",
					strns: "¯",
					sub: "⊂",
					Sub: "⋐",
					subdot: "⪽",
					subE: "⫅",
					sube: "⊆",
					subedot: "⫃",
					submult: "⫁",
					subnE: "⫋",
					subne: "⊊",
					subplus: "⪿",
					subrarr: "⥹",
					subset: "⊂",
					Subset: "⋐",
					subseteq: "⊆",
					subseteqq: "⫅",
					SubsetEqual: "⊆",
					subsetneq: "⊊",
					subsetneqq: "⫋",
					subsim: "⫇",
					subsub: "⫕",
					subsup: "⫓",
					succapprox: "⪸",
					succ: "≻",
					succcurlyeq: "≽",
					Succeeds: "≻",
					SucceedsEqual: "⪰",
					SucceedsSlantEqual: "≽",
					SucceedsTilde: "≿",
					succeq: "⪰",
					succnapprox: "⪺",
					succneqq: "⪶",
					succnsim: "⋩",
					succsim: "≿",
					SuchThat: "∋",
					sum: "∑",
					Sum: "∑",
					sung: "♪",
					sup1: "¹",
					sup2: "²",
					sup3: "³",
					sup: "⊃",
					Sup: "⋑",
					supdot: "⪾",
					supdsub: "⫘",
					supE: "⫆",
					supe: "⊇",
					supedot: "⫄",
					Superset: "⊃",
					SupersetEqual: "⊇",
					suphsol: "⟉",
					suphsub: "⫗",
					suplarr: "⥻",
					supmult: "⫂",
					supnE: "⫌",
					supne: "⊋",
					supplus: "⫀",
					supset: "⊃",
					Supset: "⋑",
					supseteq: "⊇",
					supseteqq: "⫆",
					supsetneq: "⊋",
					supsetneqq: "⫌",
					supsim: "⫈",
					supsub: "⫔",
					supsup: "⫖",
					swarhk: "⤦",
					swarr: "↙",
					swArr: "⇙",
					swarrow: "↙",
					swnwar: "⤪",
					szlig: "ß",
					Tab: "\t",
					target: "⌖",
					Tau: "Τ",
					tau: "τ",
					tbrk: "⎴",
					Tcaron: "Ť",
					tcaron: "ť",
					Tcedil: "Ţ",
					tcedil: "ţ",
					Tcy: "Т",
					tcy: "т",
					tdot: "⃛",
					telrec: "⌕",
					Tfr: "𝔗",
					tfr: "𝔱",
					there4: "∴",
					therefore: "∴",
					Therefore: "∴",
					Theta: "Θ",
					theta: "θ",
					thetasym: "ϑ",
					thetav: "ϑ",
					thickapprox: "≈",
					thicksim: "∼",
					ThickSpace: "  ",
					ThinSpace: " ",
					thinsp: " ",
					thkap: "≈",
					thksim: "∼",
					THORN: "Þ",
					thorn: "þ",
					tilde: "˜",
					Tilde: "∼",
					TildeEqual: "≃",
					TildeFullEqual: "≅",
					TildeTilde: "≈",
					timesbar: "⨱",
					timesb: "⊠",
					times: "×",
					timesd: "⨰",
					tint: "∭",
					toea: "⤨",
					topbot: "⌶",
					topcir: "⫱",
					top: "⊤",
					Topf: "𝕋",
					topf: "𝕥",
					topfork: "⫚",
					tosa: "⤩",
					tprime: "‴",
					trade: "™",
					TRADE: "™",
					triangle: "▵",
					triangledown: "▿",
					triangleleft: "◃",
					trianglelefteq: "⊴",
					triangleq: "≜",
					triangleright: "▹",
					trianglerighteq: "⊵",
					tridot: "◬",
					trie: "≜",
					triminus: "⨺",
					TripleDot: "⃛",
					triplus: "⨹",
					trisb: "⧍",
					tritime: "⨻",
					trpezium: "⏢",
					Tscr: "𝒯",
					tscr: "𝓉",
					TScy: "Ц",
					tscy: "ц",
					TSHcy: "Ћ",
					tshcy: "ћ",
					Tstrok: "Ŧ",
					tstrok: "ŧ",
					twixt: "≬",
					twoheadleftarrow: "↞",
					twoheadrightarrow: "↠",
					Uacute: "Ú",
					uacute: "ú",
					uarr: "↑",
					Uarr: "↟",
					uArr: "⇑",
					Uarrocir: "⥉",
					Ubrcy: "Ў",
					ubrcy: "ў",
					Ubreve: "Ŭ",
					ubreve: "ŭ",
					Ucirc: "Û",
					ucirc: "û",
					Ucy: "У",
					ucy: "у",
					udarr: "⇅",
					Udblac: "Ű",
					udblac: "ű",
					udhar: "⥮",
					ufisht: "⥾",
					Ufr: "𝔘",
					ufr: "𝔲",
					Ugrave: "Ù",
					ugrave: "ù",
					uHar: "⥣",
					uharl: "↿",
					uharr: "↾",
					uhblk: "▀",
					ulcorn: "⌜",
					ulcorner: "⌜",
					ulcrop: "⌏",
					ultri: "◸",
					Umacr: "Ū",
					umacr: "ū",
					uml: "¨",
					UnderBar: "_",
					UnderBrace: "⏟",
					UnderBracket: "⎵",
					UnderParenthesis: "⏝",
					Union: "⋃",
					UnionPlus: "⊎",
					Uogon: "Ų",
					uogon: "ų",
					Uopf: "𝕌",
					uopf: "𝕦",
					UpArrowBar: "⤒",
					uparrow: "↑",
					UpArrow: "↑",
					Uparrow: "⇑",
					UpArrowDownArrow: "⇅",
					updownarrow: "↕",
					UpDownArrow: "↕",
					Updownarrow: "⇕",
					UpEquilibrium: "⥮",
					upharpoonleft: "↿",
					upharpoonright: "↾",
					uplus: "⊎",
					UpperLeftArrow: "↖",
					UpperRightArrow: "↗",
					upsi: "υ",
					Upsi: "ϒ",
					upsih: "ϒ",
					Upsilon: "Υ",
					upsilon: "υ",
					UpTeeArrow: "↥",
					UpTee: "⊥",
					upuparrows: "⇈",
					urcorn: "⌝",
					urcorner: "⌝",
					urcrop: "⌎",
					Uring: "Ů",
					uring: "ů",
					urtri: "◹",
					Uscr: "𝒰",
					uscr: "𝓊",
					utdot: "⋰",
					Utilde: "Ũ",
					utilde: "ũ",
					utri: "▵",
					utrif: "▴",
					uuarr: "⇈",
					Uuml: "Ü",
					uuml: "ü",
					uwangle: "⦧",
					vangrt: "⦜",
					varepsilon: "ϵ",
					varkappa: "ϰ",
					varnothing: "∅",
					varphi: "ϕ",
					varpi: "ϖ",
					varpropto: "∝",
					varr: "↕",
					vArr: "⇕",
					varrho: "ϱ",
					varsigma: "ς",
					varsubsetneq: "⊊︀",
					varsubsetneqq: "⫋︀",
					varsupsetneq: "⊋︀",
					varsupsetneqq: "⫌︀",
					vartheta: "ϑ",
					vartriangleleft: "⊲",
					vartriangleright: "⊳",
					vBar: "⫨",
					Vbar: "⫫",
					vBarv: "⫩",
					Vcy: "В",
					vcy: "в",
					vdash: "⊢",
					vDash: "⊨",
					Vdash: "⊩",
					VDash: "⊫",
					Vdashl: "⫦",
					veebar: "⊻",
					vee: "∨",
					Vee: "⋁",
					veeeq: "≚",
					vellip: "⋮",
					verbar: "|",
					Verbar: "‖",
					vert: "|",
					Vert: "‖",
					VerticalBar: "∣",
					VerticalLine: "|",
					VerticalSeparator: "❘",
					VerticalTilde: "≀",
					VeryThinSpace: " ",
					Vfr: "𝔙",
					vfr: "𝔳",
					vltri: "⊲",
					vnsub: "⊂⃒",
					vnsup: "⊃⃒",
					Vopf: "𝕍",
					vopf: "𝕧",
					vprop: "∝",
					vrtri: "⊳",
					Vscr: "𝒱",
					vscr: "𝓋",
					vsubnE: "⫋︀",
					vsubne: "⊊︀",
					vsupnE: "⫌︀",
					vsupne: "⊋︀",
					Vvdash: "⊪",
					vzigzag: "⦚",
					Wcirc: "Ŵ",
					wcirc: "ŵ",
					wedbar: "⩟",
					wedge: "∧",
					Wedge: "⋀",
					wedgeq: "≙",
					weierp: "℘",
					Wfr: "𝔚",
					wfr: "𝔴",
					Wopf: "𝕎",
					wopf: "𝕨",
					wp: "℘",
					wr: "≀",
					wreath: "≀",
					Wscr: "𝒲",
					wscr: "𝓌",
					xcap: "⋂",
					xcirc: "◯",
					xcup: "⋃",
					xdtri: "▽",
					Xfr: "𝔛",
					xfr: "𝔵",
					xharr: "⟷",
					xhArr: "⟺",
					Xi: "Ξ",
					xi: "ξ",
					xlarr: "⟵",
					xlArr: "⟸",
					xmap: "⟼",
					xnis: "⋻",
					xodot: "⨀",
					Xopf: "𝕏",
					xopf: "𝕩",
					xoplus: "⨁",
					xotime: "⨂",
					xrarr: "⟶",
					xrArr: "⟹",
					Xscr: "𝒳",
					xscr: "𝓍",
					xsqcup: "⨆",
					xuplus: "⨄",
					xutri: "△",
					xvee: "⋁",
					xwedge: "⋀",
					Yacute: "Ý",
					yacute: "ý",
					YAcy: "Я",
					yacy: "я",
					Ycirc: "Ŷ",
					ycirc: "ŷ",
					Ycy: "Ы",
					ycy: "ы",
					yen: "¥",
					Yfr: "𝔜",
					yfr: "𝔶",
					YIcy: "Ї",
					yicy: "ї",
					Yopf: "𝕐",
					yopf: "𝕪",
					Yscr: "𝒴",
					yscr: "𝓎",
					YUcy: "Ю",
					yucy: "ю",
					yuml: "ÿ",
					Yuml: "Ÿ",
					Zacute: "Ź",
					zacute: "ź",
					Zcaron: "Ž",
					zcaron: "ž",
					Zcy: "З",
					zcy: "з",
					Zdot: "Ż",
					zdot: "ż",
					zeetrf: "ℨ",
					ZeroWidthSpace: "​",
					Zeta: "Ζ",
					zeta: "ζ",
					zfr: "𝔷",
					Zfr: "ℨ",
					ZHcy: "Ж",
					zhcy: "ж",
					zigrarr: "⇝",
					zopf: "𝕫",
					Zopf: "ℤ",
					Zscr: "𝒵",
					zscr: "𝓏",
					zwj: "‍",
					zwnj: "‌"
				}
			}, {}],
			54: [function(t, e, i) {
				"use strict";

				function n(t) {
					var e = Array.prototype.slice.call(arguments, 1);
					return e.forEach(function(e) {
						e && Object.keys(e).forEach(function(i) {
							t[i] = e[i]
						})
					}), t
				}
				function r(t) {
					return Object.prototype.toString.call(t)
				}
				function o(t) {
					return "[object String]" === r(t)
				}
				function a(t) {
					return "[object Object]" === r(t)
				}
				function s(t) {
					return "[object RegExp]" === r(t)
				}
				function l(t) {
					return "[object Function]" === r(t)
				}
				function u(t) {
					return t.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")
				}
				function c(t) {
					return Object.keys(t || {}).reduce(function(t, e) {
						return t || _.hasOwnProperty(e)
					}, !1)
				}
				function h(t) {
					t.__index__ = -1, t.__text_cache__ = ""
				}
				function d(t) {
					return function(e, i) {
						var n = e.slice(i);
						return t.test(n) ? n.match(t)[0].length : 0
					}
				}
				function p() {
					return function(t, e) {
						e.normalize(t)
					}
				}
				function f(e) {
					function i(t) {
						return t.replace("%TLDS%", r.src_tlds)
					}
					function n(t, e) {
						throw new Error('(LinkifyIt) Invalid schema "' + t + '": ' + e)
					}
					var r = e.re = t("./lib/re")(e.__opts__),
						c = e.__tlds__.slice();
					e.onCompile(), e.__tlds_replaced__ || c.push(b), c.push(r.src_xn), r.src_tlds = c.join("|"), r.email_fuzzy = RegExp(i(r.tpl_email_fuzzy), "i"), r.link_fuzzy = RegExp(i(r.tpl_link_fuzzy), "i"), r.link_no_ip_fuzzy = RegExp(i(r.tpl_link_no_ip_fuzzy), "i"), r.host_fuzzy_test = RegExp(i(r.tpl_host_fuzzy_test), "i");
					var f = [];
					e.__compiled__ = {}, Object.keys(e.__schemas__).forEach(function(t) {
						var i = e.__schemas__[t];
						if (null !== i) {
							var r = {
								validate: null,
								link: null
							};
							return e.__compiled__[t] = r, a(i) ? (s(i.validate) ? r.validate = d(i.validate) : l(i.validate) ? r.validate = i.validate : n(t, i), void(l(i.normalize) ? r.normalize = i.normalize : i.normalize ? n(t, i) : r.normalize = p())) : o(i) ? void f.push(t) : void n(t, i)
						}
					}), f.forEach(function(t) {
						e.__compiled__[e.__schemas__[t]] && (e.__compiled__[t].validate = e.__compiled__[e.__schemas__[t]].validate, e.__compiled__[t].normalize = e.__compiled__[e.__schemas__[t]].normalize)
					}), e.__compiled__[""] = {
						validate: null,
						normalize: p()
					};
					var m = Object.keys(e.__compiled__).filter(function(t) {
						return t.length > 0 && e.__compiled__[t]
					}).map(u).join("|");
					e.re.schema_test = RegExp("(^|(?!_)(?:[><]|" + r.src_ZPCc + "))(" + m + ")", "i"), e.re.schema_search = RegExp("(^|(?!_)(?:[><]|" + r.src_ZPCc + "))(" + m + ")", "ig"), e.re.pretest = RegExp("(" + e.re.schema_test.source + ")|(" + e.re.host_fuzzy_test.source + ")|@", "i"), h(e)
				}
				function m(t, e) {
					var i = t.__index__,
						n = t.__last_index__,
						r = t.__text_cache__.slice(i, n);
					this.schema = t.__schema__.toLowerCase(), this.index = i + e, this.lastIndex = n + e, this.raw = r, this.text = r, this.url = r
				}
				function g(t, e) {
					var i = new m(t, e);
					return t.__compiled__[i.schema].normalize(i, t), i
				}
				function v(t, e) {
					return this instanceof v ? (e || c(t) && (e = t, t = {}), this.__opts__ = n({}, _, e), this.__index__ = -1, this.__last_index__ = -1, this.__schema__ = "", this.__text_cache__ = "", this.__schemas__ = n({}, y, t), this.__compiled__ = {}, this.__tlds__ = w, this.__tlds_replaced__ = !1, this.re = {}, void f(this)) : new v(t, e)
				}
				var _ = {
					fuzzyLink: !0,
					fuzzyEmail: !0,
					fuzzyIP: !1
				},
					y = {
						"http:": {
							validate: function(t, e, i) {
								var n = t.slice(e);
								return i.re.http || (i.re.http = new RegExp("^\\/\\/" + i.re.src_auth + i.re.src_host_port_strict + i.re.src_path, "i")), i.re.http.test(n) ? n.match(i.re.http)[0].length : 0
							}
						},
						"https:": "http:",
						"ftp:": "http:",
						"//": {
							validate: function(t, e, i) {
								var n = t.slice(e);
								return i.re.no_http || (i.re.no_http = new RegExp("^" + i.re.src_auth + "(?:localhost|(?:(?:" + i.re.src_domain + ")\\.)+" + i.re.src_domain_root + ")" + i.re.src_port + i.re.src_host_terminator + i.re.src_path, "i")), i.re.no_http.test(n) ? e >= 3 && ":" === t[e - 3] ? 0 : e >= 3 && "/" === t[e - 3] ? 0 : n.match(i.re.no_http)[0].length : 0
							}
						},
						"mailto:": {
							validate: function(t, e, i) {
								var n = t.slice(e);
								return i.re.mailto || (i.re.mailto = new RegExp("^" + i.re.src_email_name + "@" + i.re.src_host_strict, "i")), i.re.mailto.test(n) ? n.match(i.re.mailto)[0].length : 0
							}
						}
					},
					b = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",
					w = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");
				v.prototype.add = function(t, e) {
					return this.__schemas__[t] = e, f(this), this
				}, v.prototype.set = function(t) {
					return this.__opts__ = n(this.__opts__, t), this
				}, v.prototype.test = function(t) {
					if (this.__text_cache__ = t, this.__index__ = -1, !t.length) return !1;
					var e, i, n, r, o, a, s, l, u;
					if (this.re.schema_test.test(t)) for (s = this.re.schema_search, s.lastIndex = 0; null !== (e = s.exec(t));) if (r = this.testSchemaAt(t, e[2], s.lastIndex)) {
						this.__schema__ = e[2], this.__index__ = e.index + e[1].length, this.__last_index__ = e.index + e[0].length + r;
						break
					}
					return this.__opts__.fuzzyLink && this.__compiled__["http:"] && (l = t.search(this.re.host_fuzzy_test), l >= 0 && (this.__index__ < 0 || l < this.__index__) && null !== (i = t.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) && (o = i.index + i[1].length, (this.__index__ < 0 || o < this.__index__) && (this.__schema__ = "", this.__index__ = o, this.__last_index__ = i.index + i[0].length))), this.__opts__.fuzzyEmail && this.__compiled__["mailto:"] && (u = t.indexOf("@"), u >= 0 && null !== (n = t.match(this.re.email_fuzzy)) && (o = n.index + n[1].length, a = n.index + n[0].length, (this.__index__ < 0 || o < this.__index__ || o === this.__index__ && a > this.__last_index__) && (this.__schema__ = "mailto:", this.__index__ = o, this.__last_index__ = a))), this.__index__ >= 0
				}, v.prototype.pretest = function(t) {
					return this.re.pretest.test(t)
				}, v.prototype.testSchemaAt = function(t, e, i) {
					return this.__compiled__[e.toLowerCase()] ? this.__compiled__[e.toLowerCase()].validate(t, i, this) : 0
				}, v.prototype.match = function(t) {
					var e = 0,
						i = [];
					this.__index__ >= 0 && this.__text_cache__ === t && (i.push(g(this, e)), e = this.__last_index__);
					for (var n = e ? t.slice(e) : t; this.test(n);) i.push(g(this, e)), n = n.slice(this.__last_index__), e += this.__last_index__;
					return i.length ? i : null
				}, v.prototype.tlds = function(t, e) {
					return t = Array.isArray(t) ? t : [t], e ? (this.__tlds__ = this.__tlds__.concat(t).sort().filter(function(t, e, i) {
						return t !== i[e - 1]
					}).reverse(), f(this), this) : (this.__tlds__ = t.slice(), this.__tlds_replaced__ = !0, f(this), this)
				}, v.prototype.normalize = function(t) {
					t.schema || (t.url = "http://" + t.url), "mailto:" !== t.schema || /^mailto:/i.test(t.url) || (t.url = "mailto:" + t.url)
				}, v.prototype.onCompile = function() {}, e.exports = v
			}, {
				"./lib/re": 55
			}],
			55: [function(t, e, i) {
				"use strict";
				e.exports = function(e) {
					var i = {};
					return i.src_Any = t("uc.micro/properties/Any/regex").source, i.src_Cc = t("uc.micro/categories/Cc/regex").source, i.src_Z = t("uc.micro/categories/Z/regex").source, i.src_P = t("uc.micro/categories/P/regex").source, i.src_ZPCc = [i.src_Z, i.src_P, i.src_Cc].join("|"), i.src_ZCc = [i.src_Z, i.src_Cc].join("|"), i.src_pseudo_letter = "(?:(?!>|<|" + i.src_ZPCc + ")" + i.src_Any + ")", i.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)", i.src_auth = "(?:(?:(?!" + i.src_ZCc + "|[@/]).)+@)?", i.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?", i.src_host_terminator = "(?=$|>|<|" + i.src_ZPCc + ")(?!-|_|:\\d|\\.-|\\.(?!$|" + i.src_ZPCc + "))", i.src_path = "(?:[/?#](?:(?!" + i.src_ZCc + "|[()[\\]{}.,\"'?!\\-<>]).|\\[(?:(?!" + i.src_ZCc + "|\\]).)*\\]|\\((?:(?!" + i.src_ZCc + "|[)]).)*\\)|\\{(?:(?!" + i.src_ZCc + '|[}]).)*\\}|\\"(?:(?!' + i.src_ZCc + '|["]).)+\\"|\\\'(?:(?!' + i.src_ZCc + "|[']).)+\\'|\\'(?=" + i.src_pseudo_letter + "|[-]).|\\.{2,3}[a-zA-Z0-9%/]|\\.(?!" + i.src_ZCc + "|[.]).|" + (e && e["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + "\\,(?!" + i.src_ZCc + ").|\\!(?!" + i.src_ZCc + "|[!]).|\\?(?!" + i.src_ZCc + "|[?]).)+|\\/)?", i.src_email_name = '[\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]+', i.src_xn = "xn--[a-z0-9\\-]{1,59}", i.src_domain_root = "(?:" + i.src_xn + "|" + i.src_pseudo_letter + "{1,63})", i.src_domain = "(?:" + i.src_xn + "|(?:" + i.src_pseudo_letter + ")|(?:" + i.src_pseudo_letter + "(?:-(?!-)|" + i.src_pseudo_letter + "){0,61}" + i.src_pseudo_letter + "))", i.src_host = "(?:(?:(?:(?:" + i.src_domain + ")\\.)*" + i.src_domain_root + "))", i.tpl_host_fuzzy = "(?:" + i.src_ip4 + "|(?:(?:(?:" + i.src_domain + ")\\.)+(?:%TLDS%)))", i.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + i.src_domain + ")\\.)+(?:%TLDS%))", i.src_host_strict = i.src_host + i.src_host_terminator, i.tpl_host_fuzzy_strict = i.tpl_host_fuzzy + i.src_host_terminator, i.src_host_port_strict = i.src_host + i.src_port + i.src_host_terminator, i.tpl_host_port_fuzzy_strict = i.tpl_host_fuzzy + i.src_port + i.src_host_terminator, i.tpl_host_port_no_ip_fuzzy_strict = i.tpl_host_no_ip_fuzzy + i.src_port + i.src_host_terminator, i.tpl_host_fuzzy_test = "localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + i.src_ZPCc + "|>|$))", i.tpl_email_fuzzy = "(^|<|>|\\(|" + i.src_ZCc + ")(" + i.src_email_name + "@" + i.tpl_host_fuzzy_strict + ")", i.tpl_link_fuzzy = "(^|(?![.:/\\-_@])(?:[$+<=>^`|]|" + i.src_ZPCc + "))((?![$+<=>^`|])" + i.tpl_host_port_fuzzy_strict + i.src_path + ")", i.tpl_link_no_ip_fuzzy = "(^|(?![.:/\\-_@])(?:[$+<=>^`|]|" + i.src_ZPCc + "))((?![$+<=>^`|])" + i.tpl_host_port_no_ip_fuzzy_strict + i.src_path + ")", i
				}
			}, {
				"uc.micro/categories/Cc/regex": 61,
				"uc.micro/categories/P/regex": 63,
				"uc.micro/categories/Z/regex": 64,
				"uc.micro/properties/Any/regex": 66
			}],
			56: [function(t, e, i) {
				"use strict";

				function n(t) {
					var e, i, n = o[t];
					if (n) return n;
					for (n = o[t] = [], e = 0; e < 128; e++) i = String.fromCharCode(e), n.push(i);
					for (e = 0; e < t.length; e++) i = t.charCodeAt(e), n[i] = "%" + ("0" + i.toString(16).toUpperCase()).slice(-2);
					return n
				}
				function r(t, e) {
					var i;
					return "string" != typeof e && (e = r.defaultChars), i = n(e), t.replace(/(%[a-f0-9]{2})+/gi, function(t) {
						var e, n, r, o, a, s, l, u = "";
						for (e = 0, n = t.length; e < n; e += 3) r = parseInt(t.slice(e + 1, e + 3), 16), r < 128 ? u += i[r] : 192 === (224 & r) && e + 3 < n && (o = parseInt(t.slice(e + 4, e + 6), 16), 128 === (192 & o)) ? (l = r << 6 & 1984 | 63 & o, u += l < 128 ? "��" : String.fromCharCode(l), e += 3) : 224 === (240 & r) && e + 6 < n && (o = parseInt(t.slice(e + 4, e + 6), 16), a = parseInt(t.slice(e + 7, e + 9), 16), 128 === (192 & o) && 128 === (192 & a)) ? (l = r << 12 & 61440 | o << 6 & 4032 | 63 & a, u += l < 2048 || l >= 55296 && l <= 57343 ? "���" : String.fromCharCode(l), e += 6) : 240 === (248 & r) && e + 9 < n && (o = parseInt(t.slice(e + 4, e + 6), 16), a = parseInt(t.slice(e + 7, e + 9), 16), s = parseInt(t.slice(e + 10, e + 12), 16), 128 === (192 & o) && 128 === (192 & a) && 128 === (192 & s)) ? (l = r << 18 & 1835008 | o << 12 & 258048 | a << 6 & 4032 | 63 & s, l < 65536 || l > 1114111 ? u += "����" : (l -= 65536, u += String.fromCharCode(55296 + (l >> 10), 56320 + (1023 & l))), e += 9) : u += "�";
						return u
					})
				}
				var o = {};
				r.defaultChars = ";/?:@&=+$,#", r.componentChars = "", e.exports = r
			}, {}],
			57: [function(t, e, i) {
				"use strict";

				function n(t) {
					var e, i, n = o[t];
					if (n) return n;
					for (n = o[t] = [], e = 0; e < 128; e++) i = String.fromCharCode(e), /^[0-9a-z]$/i.test(i) ? n.push(i) : n.push("%" + ("0" + e.toString(16).toUpperCase()).slice(-2));
					for (e = 0; e < t.length; e++) n[t.charCodeAt(e)] = t[e];
					return n
				}
				function r(t, e, i) {
					var o, a, s, l, u, c = "";
					for ("string" != typeof e && (i = e, e = r.defaultChars), "undefined" == typeof i && (i = !0), u = n(e), o = 0, a = t.length; o < a; o++) if (s = t.charCodeAt(o), i && 37 === s && o + 2 < a && /^[0-9a-f]{2}$/i.test(t.slice(o + 1, o + 3))) c += t.slice(o, o + 3), o += 2;
					else if (s < 128) c += u[s];
					else if (s >= 55296 && s <= 57343) {
						if (s >= 55296 && s <= 56319 && o + 1 < a && (l = t.charCodeAt(o + 1), l >= 56320 && l <= 57343)) {
							c += encodeURIComponent(t[o] + t[o + 1]), o++;
							continue
						}
						c += "%EF%BF%BD"
					} else c += encodeURIComponent(t[o]);
					return c
				}
				var o = {};
				r.defaultChars = ";/?:@&=+$,-_.!~*'()#", r.componentChars = "-_.!~*'()", e.exports = r
			}, {}],
			58: [function(t, e, i) {
				"use strict";
				e.exports = function(t) {
					var e = "";
					return e += t.protocol || "", e += t.slashes ? "//" : "", e += t.auth ? t.auth + "@" : "", e += t.hostname && t.hostname.indexOf(":") !== -1 ? "[" + t.hostname + "]" : t.hostname || "", e += t.port ? ":" + t.port : "", e += t.pathname || "", e += t.search || "", e += t.hash || ""
				}
			}, {}],
			59: [function(t, e, i) {
				"use strict";
				e.exports.encode = t("./encode"), e.exports.decode = t("./decode"), e.exports.format = t("./format"), e.exports.parse = t("./parse")
			}, {
				"./decode": 56,
				"./encode": 57,
				"./format": 58,
				"./parse": 60
			}],
			60: [function(t, e, i) {
				"use strict";

				function n() {
					this.protocol = null, this.slashes = null, this.auth = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.pathname = null
				}
				function r(t, e) {
					if (t && t instanceof n) return t;
					var i = new n;
					return i.parse(t, e), i
				}
				var o = /^([a-z0-9.+-]+:)/i,
					a = /:[0-9]*$/,
					s = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
					l = ["<", ">", '"', "`", " ", "\r", "\n", "\t"],
					u = ["{", "}", "|", "\\", "^", "`"].concat(l),
					c = ["'"].concat(u),
					h = ["%", "/", "?", ";", "#"].concat(c),
					d = ["/", "?", "#"],
					p = 255,
					f = /^[+a-z0-9A-Z_-]{0,63}$/,
					m = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
					g = {
						javascript: !0,
						"javascript:": !0
					},
					v = {
						http: !0,
						https: !0,
						ftp: !0,
						gopher: !0,
						file: !0,
						"http:": !0,
						"https:": !0,
						"ftp:": !0,
						"gopher:": !0,
						"file:": !0
					};
				n.prototype.parse = function(t, e) {
					var i, n, r, a, l, u = t;
					if (u = u.trim(), !e && 1 === t.split("#").length) {
						var c = s.exec(u);
						if (c) return this.pathname = c[1], c[2] && (this.search = c[2]), this
					}
					var _ = o.exec(u);
					if (_ && (_ = _[0], r = _.toLowerCase(), this.protocol = _, u = u.substr(_.length)), (e || _ || u.match(/^\/\/[^@\/]+@[^@\/]+/)) && (l = "//" === u.substr(0, 2), !l || _ && g[_] || (u = u.substr(2), this.slashes = !0)), !g[_] && (l || _ && !v[_])) {
						var y = -1;
						for (i = 0; i < d.length; i++) a = u.indexOf(d[i]), a !== -1 && (y === -1 || a < y) && (y = a);
						var b, w;
						for (w = y === -1 ? u.lastIndexOf("@") : u.lastIndexOf("@", y), w !== -1 && (b = u.slice(0, w), u = u.slice(w + 1), this.auth = b), y = -1, i = 0; i < h.length; i++) a = u.indexOf(h[i]), a !== -1 && (y === -1 || a < y) && (y = a);
						y === -1 && (y = u.length), ":" === u[y - 1] && y--;
						var C = u.slice(0, y);
						u = u.slice(y), this.parseHost(C), this.hostname = this.hostname || "";
						var x = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
						if (!x) {
							var E = this.hostname.split(/\./);
							for (i = 0, n = E.length; i < n; i++) {
								var k = E[i];
								if (k && !k.match(f)) {
									for (var L = "", P = 0, D = k.length; P < D; P++) L += k.charCodeAt(P) > 127 ? "x" : k[P];
									if (!L.match(f)) {
										var T = E.slice(0, i),
											S = E.slice(i + 1),
											M = k.match(m);
										M && (T.push(M[1]), S.unshift(M[2])), S.length && (u = S.join(".") + u), this.hostname = T.join(".");
										break
									}
								}
							}
						}
						this.hostname.length > p && (this.hostname = ""), x && (this.hostname = this.hostname.substr(1, this.hostname.length - 2))
					}
					var A = u.indexOf("#");
					A !== -1 && (this.hash = u.substr(A), u = u.slice(0, A));
					var O = u.indexOf("?");
					return O !== -1 && (this.search = u.substr(O), u = u.slice(0, O)), u && (this.pathname = u), v[r] && this.hostname && !this.pathname && (this.pathname = ""), this
				}, n.prototype.parseHost = function(t) {
					var e = a.exec(t);
					e && (e = e[0], ":" !== e && (this.port = e.substr(1)), t = t.substr(0, t.length - e.length)), t && (this.hostname = t)
				}, e.exports = r
			}, {}],
			61: [function(t, e, i) {
				e.exports = /[\0-\x1F\x7F-\x9F]/
			}, {}],
			62: [function(t, e, i) {
				e.exports = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804\uDCBD|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/
			}, {}],
			63: [function(t, e, i) {
				e.exports = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]/
			}, {}],
			64: [function(t, e, i) {
				e.exports = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/
			}, {}],
			65: [function(t, e, i) {
				e.exports.Any = t("./properties/Any/regex"), e.exports.Cc = t("./categories/Cc/regex"), e.exports.Cf = t("./categories/Cf/regex"), e.exports.P = t("./categories/P/regex"), e.exports.Z = t("./categories/Z/regex")
			}, {
				"./categories/Cc/regex": 61,
				"./categories/Cf/regex": 62,
				"./categories/P/regex": 63,
				"./categories/Z/regex": 64,
				"./properties/Any/regex": 66
			}],
			66: [function(t, e, i) {
				e.exports = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/
			}, {}],
			67: [function(t, e, i) {
				"use strict";
				e.exports = t("./lib/")
			}, {
				"./lib/": 9
			}]
		}, {}, [67])(67)
	}), i("Core/KnockoutMarkdownBinding", ["markdown-it-sanitizer", "markdown-it"], function(t, e) {
		"use strict";

		function i(t) {
			if (t instanceof HTMLAnchorElement && (t.target = "_blank"), t.childNodes && t.childNodes.length > 0) for (var e = 0; e < t.childNodes.length; ++e) i(t.childNodes[e])
		}
		var n = /<html(.|\s)*>(.|\s)*<\/html>/im,
			r = new e({
				html: !0,
				linkify: !0
			});
		r.use(t, {
			imageClass: "",
			removeUnbalanced: !1,
			removeUnknown: !1
		});
		var o = {
			register: function(t) {
				t.bindingHandlers.markdown = {
					init: function() {
						return {
							controlsDescendantBindings: !0
						}
					},
					update: function(e, o) {
						for (; e.firstChild;) t.removeNode(e.firstChild);
						var a, s = t.unwrap(o());
						a = n.test(s) ? s : r.render(s);
						var l = t.utils.parseHtmlFragment(a, e);
						e.className = e.className + " markdown";
						for (var u = 0; u < l.length; ++u) {
							var c = l[u];
							i(c), e.appendChild(c)
						}
					}
				}
			}
		};
		return o
	}), !
	function(t, e, n, r) {
		"use strict";

		function o(t, e, i) {
			return setTimeout(c(t, i), e)
		}
		function a(t, e, i) {
			return !!Array.isArray(t) && (s(t, i[e], i), !0)
		}
		function s(t, e, i) {
			var n;
			if (t) if (t.forEach) t.forEach(e, i);
			else if (t.length !== r) for (n = 0; n < t.length;) e.call(i, t[n], n, t), n++;
			else for (n in t) t.hasOwnProperty(n) && e.call(i, t[n], n, t)
		}
		function l(e, i, n) {
			var r = "DEPRECATED METHOD: " + i + "\n" + n + " AT \n";
			return function() {
				var i = new Error("get-stack-trace"),
					n = i && i.stack ? i.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace",
					o = t.console && (t.console.warn || t.console.log);
				return o && o.call(t.console, r, n), e.apply(this, arguments)
			}
		}
		function u(t, e, i) {
			var n, r = e.prototype;
			n = t.prototype = Object.create(r), n.constructor = t, n._super = r, i && dt(n, i)
		}
		function c(t, e) {
			return function() {
				return t.apply(e, arguments)
			}
		}
		function h(t, e) {
			return typeof t == mt ? t.apply(e ? e[0] || r : r, e) : t
		}
		function d(t, e) {
			return t === r ? e : t
		}
		function p(t, e, i) {
			s(v(e), function(e) {
				t.addEventListener(e, i, !1)
			})
		}
		function f(t, e, i) {
			s(v(e), function(e) {
				t.removeEventListener(e, i, !1)
			})
		}
		function m(t, e) {
			for (; t;) {
				if (t == e) return !0;
				t = t.parentNode
			}
			return !1
		}
		function g(t, e) {
			return t.indexOf(e) > -1
		}
		function v(t) {
			return t.trim().split(/\s+/g)
		}
		function _(t, e, i) {
			if (t.indexOf && !i) return t.indexOf(e);
			for (var n = 0; n < t.length;) {
				if (i && t[n][i] == e || !i && t[n] === e) return n;
				n++
			}
			return -1
		}
		function y(t) {
			return Array.prototype.slice.call(t, 0)
		}
		function b(t, e, i) {
			for (var n = [], r = [], o = 0; o < t.length;) {
				var a = e ? t[o][e] : t[o];
				_(r, a) < 0 && n.push(t[o]), r[o] = a, o++
			}
			return i && (n = e ? n.sort(function(t, i) {
				return t[e] > i[e]
			}) : n.sort()), n
		}
		function w(t, e) {
			for (var i, n, o = e[0].toUpperCase() + e.slice(1), a = 0; a < pt.length;) {
				if (i = pt[a], n = i ? i + o : e, n in t) return n;
				a++
			}
			return r
		}
		function C() {
			return wt++
		}
		function x(e) {
			var i = e.ownerDocument || e;
			return i.defaultView || i.parentWindow || t
		}
		function E(t, e) {
			var i = this;
			this.manager = t, this.callback = e, this.element = t.element, this.target = t.options.inputTarget, this.domHandler = function(e) {
				h(t.options.enable, [t]) && i.handler(e)
			}, this.init()
		}
		function k(t) {
			var e, i = t.options.inputClass;
			return new(e = i ? i : Et ? B : kt ? q : xt ? V : z)(t, L)
		}
		function L(t, e, i) {
			var n = i.pointers.length,
				r = i.changedPointers.length,
				o = e & Mt && n - r === 0,
				a = e & (Ot | Nt) && n - r === 0;
			i.isFirst = !! o, i.isFinal = !! a, o && (t.session = {}), i.eventType = e, P(t, i), t.emit("hammer.input", i), t.recognize(i), t.session.prevInput = i
		}
		function P(t, e) {
			var i = t.session,
				n = e.pointers,
				r = n.length;
			i.firstInput || (i.firstInput = S(e)), r > 1 && !i.firstMultiple ? i.firstMultiple = S(e) : 1 === r && (i.firstMultiple = !1);
			var o = i.firstInput,
				a = i.firstMultiple,
				s = a ? a.center : o.center,
				l = e.center = M(n);
			e.timeStamp = _t(), e.deltaTime = e.timeStamp - o.timeStamp, e.angle = I(s, l), e.distance = N(s, l), D(i, e), e.offsetDirection = O(e.deltaX, e.deltaY);
			var u = A(e.deltaTime, e.deltaX, e.deltaY);
			e.overallVelocityX = u.x, e.overallVelocityY = u.y, e.overallVelocity = vt(u.x) > vt(u.y) ? u.x : u.y, e.scale = a ? F(a.pointers, n) : 1, e.rotation = a ? R(a.pointers, n) : 0, e.maxPointers = i.prevInput ? e.pointers.length > i.prevInput.maxPointers ? e.pointers.length : i.prevInput.maxPointers : e.pointers.length, T(i, e);
			var c = t.element;
			m(e.srcEvent.target, c) && (c = e.srcEvent.target), e.target = c
		}
		function D(t, e) {
			var i = e.center,
				n = t.offsetDelta || {},
				r = t.prevDelta || {},
				o = t.prevInput || {};
			e.eventType !== Mt && o.eventType !== Ot || (r = t.prevDelta = {
				x: o.deltaX || 0,
				y: o.deltaY || 0
			}, n = t.offsetDelta = {
				x: i.x,
				y: i.y
			}), e.deltaX = r.x + (i.x - n.x), e.deltaY = r.y + (i.y - n.y)
		}
		function T(t, e) {
			var i, n, o, a, s = t.lastInterval || e,
				l = e.timeStamp - s.timeStamp;
			if (e.eventType != Nt && (l > St || s.velocity === r)) {
				var u = e.deltaX - s.deltaX,
					c = e.deltaY - s.deltaY,
					h = A(l, u, c);
				n = h.x, o = h.y, i = vt(h.x) > vt(h.y) ? h.x : h.y, a = O(u, c), t.lastInterval = e
			} else i = s.velocity, n = s.velocityX, o = s.velocityY, a = s.direction;
			e.velocity = i, e.velocityX = n, e.velocityY = o, e.direction = a
		}
		function S(t) {
			for (var e = [], i = 0; i < t.pointers.length;) e[i] = {
				clientX: gt(t.pointers[i].clientX),
				clientY: gt(t.pointers[i].clientY)
			}, i++;
			return {
				timeStamp: _t(),
				pointers: e,
				center: M(e),
				deltaX: t.deltaX,
				deltaY: t.deltaY
			}
		}
		function M(t) {
			var e = t.length;
			if (1 === e) return {
				x: gt(t[0].clientX),
				y: gt(t[0].clientY)
			};
			for (var i = 0, n = 0, r = 0; e > r;) i += t[r].clientX, n += t[r].clientY, r++;
			return {
				x: gt(i / e),
				y: gt(n / e)
			}
		}
		function A(t, e, i) {
			return {
				x: e / t || 0,
				y: i / t || 0
			}
		}
		function O(t, e) {
			return t === e ? It : vt(t) >= vt(e) ? 0 > t ? Rt : Ft : 0 > e ? zt : Bt
		}
		function N(t, e, i) {
			i || (i = jt);
			var n = e[i[0]] - t[i[0]],
				r = e[i[1]] - t[i[1]];
			return Math.sqrt(n * n + r * r)
		}
		function I(t, e, i) {
			i || (i = jt);
			var n = e[i[0]] - t[i[0]],
				r = e[i[1]] - t[i[1]];
			return 180 * Math.atan2(r, n) / Math.PI
		}
		function R(t, e) {
			return I(e[1], e[0], Vt) + I(t[1], t[0], Vt)
		}
		function F(t, e) {
			return N(e[0], e[1], Vt) / N(t[0], t[1], Vt)
		}
		function z() {
			this.evEl = Zt, this.evWin = Gt, this.pressed = !1, E.apply(this, arguments)
		}
		function B() {
			this.evEl = Kt, this.evWin = Yt, E.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
		}
		function U() {
			this.evTarget = Qt, this.evWin = te, this.started = !1, E.apply(this, arguments)
		}
		function H(t, e) {
			var i = y(t.touches),
				n = y(t.changedTouches);
			return e & (Ot | Nt) && (i = b(i.concat(n), "identifier", !0)), [i, n]
		}
		function q() {
			this.evTarget = ie, this.targetIds = {}, E.apply(this, arguments)
		}
		function j(t, e) {
			var i = y(t.touches),
				n = this.targetIds;
			if (e & (Mt | At) && 1 === i.length) return n[i[0].identifier] = !0, [i, i];
			var r, o, a = y(t.changedTouches),
				s = [],
				l = this.target;
			if (o = i.filter(function(t) {
				return m(t.target, l)
			}), e === Mt) for (r = 0; r < o.length;) n[o[r].identifier] = !0, r++;
			for (r = 0; r < a.length;) n[a[r].identifier] && s.push(a[r]), e & (Ot | Nt) && delete n[a[r].identifier], r++;
			return s.length ? [b(o.concat(s), "identifier", !0), s] : void 0
		}
		function V() {
			E.apply(this, arguments);
			var t = c(this.handler, this);
			this.touch = new q(this.manager, t), this.mouse = new z(this.manager, t), this.primaryTouch = null, this.lastTouches = []
		}
		function W(t, e) {
			t & Mt ? (this.primaryTouch = e.changedPointers[0].identifier, Z.call(this, e)) : t & (Ot | Nt) && Z.call(this, e)
		}
		function Z(t) {
			var e = t.changedPointers[0];
			if (e.identifier === this.primaryTouch) {
				var i = {
					x: e.clientX,
					y: e.clientY
				};
				this.lastTouches.push(i);
				var n = this.lastTouches,
					r = function() {
						var t = n.indexOf(i);
						t > -1 && n.splice(t, 1)
					};
				setTimeout(r, ne)
			}
		}
		function G(t) {
			for (var e = t.srcEvent.clientX, i = t.srcEvent.clientY, n = 0; n < this.lastTouches.length; n++) {
				var r = this.lastTouches[n],
					o = Math.abs(e - r.x),
					a = Math.abs(i - r.y);
				if (re >= o && re >= a) return !0
			}
			return !1
		}
		function $(t, e) {
			this.manager = t, this.set(e)
		}
		function J(t) {
			if (g(t, ce)) return ce;
			var e = g(t, he),
				i = g(t, de);
			return e && i ? ce : e || i ? e ? he : de : g(t, ue) ? ue : le
		}
		function K() {
			if (!ae) return !1;
			var e = {},
				i = t.CSS && t.CSS.supports;
			return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function(n) {
				e[n] = !i || t.CSS.supports("touch-action", n)
			}), e
		}
		function Y(t) {
			this.options = dt({}, this.defaults, t || {}), this.id = C(), this.manager = null, this.options.enable = d(this.options.enable, !0), this.state = fe, this.simultaneous = {}, this.requireFail = []
		}
		function X(t) {
			return t & ye ? "cancel" : t & ve ? "end" : t & ge ? "move" : t & me ? "start" : ""
		}
		function Q(t) {
			return t == Bt ? "down" : t == zt ? "up" : t == Rt ? "left" : t == Ft ? "right" : ""
		}
		function tt(t, e) {
			var i = e.manager;
			return i ? i.get(t) : t
		}
		function et() {
			Y.apply(this, arguments)
		}
		function it() {
			et.apply(this, arguments), this.pX = null, this.pY = null
		}
		function nt() {
			et.apply(this, arguments)
		}
		function rt() {
			Y.apply(this, arguments), this._timer = null, this._input = null
		}
		function ot() {
			et.apply(this, arguments)
		}
		function at() {
			et.apply(this, arguments)
		}
		function st() {
			Y.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0
		}
		function lt(t, e) {
			return e = e || {}, e.recognizers = d(e.recognizers, lt.defaults.preset), new ut(t, e)
		}
		function ut(t, e) {
			this.options = dt({}, lt.defaults, e || {}), this.options.inputTarget = this.options.inputTarget || t, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = t, this.input = k(this), this.touchAction = new $(this, this.options.touchAction), ct(this, !0), s(this.options.recognizers, function(t) {
				var e = this.add(new t[0](t[1]));
				t[2] && e.recognizeWith(t[2]), t[3] && e.requireFailure(t[3])
			}, this)
		}
		function ct(t, e) {
			var i = t.element;
			if (i.style) {
				var n;
				s(t.options.cssProps, function(r, o) {
					n = w(i.style, o), e ? (t.oldCssProps[n] = i.style[n], i.style[n] = r) : i.style[n] = t.oldCssProps[n] || ""
				}), e || (t.oldCssProps = {})
			}
		}
		function ht(t, i) {
			var n = e.createEvent("Event");
			n.initEvent(t, !0, !0), n.gesture = i, i.target.dispatchEvent(n)
		}
		var dt, pt = ["", "webkit", "Moz", "MS", "ms", "o"],
			ft = e.createElement("div"),
			mt = "function",
			gt = Math.round,
			vt = Math.abs,
			_t = Date.now;
		dt = "function" != typeof Object.assign ?
		function(t) {
			if (t === r || null === t) throw new TypeError("Cannot convert undefined or null to object");
			for (var e = Object(t), i = 1; i < arguments.length; i++) {
				var n = arguments[i];
				if (n !== r && null !== n) for (var o in n) n.hasOwnProperty(o) && (e[o] = n[o])
			}
			return e
		} : Object.assign;
		var yt = l(function(t, e, i) {
			for (var n = Object.keys(e), o = 0; o < n.length;)(!i || i && t[n[o]] === r) && (t[n[o]] = e[n[o]]), o++;
			return t
		}, "extend", "Use `assign`."),
			bt = l(function(t, e) {
				return yt(t, e, !0)
			}, "merge", "Use `assign`."),
			wt = 1,
			Ct = /mobile|tablet|ip(ad|hone|od)|android/i,
			xt = "ontouchstart" in t,
			Et = w(t, "PointerEvent") !== r,
			kt = xt && Ct.test(navigator.userAgent),
			Lt = "touch",
			Pt = "pen",
			Dt = "mouse",
			Tt = "kinect",
			St = 25,
			Mt = 1,
			At = 2,
			Ot = 4,
			Nt = 8,
			It = 1,
			Rt = 2,
			Ft = 4,
			zt = 8,
			Bt = 16,
			Ut = Rt | Ft,
			Ht = zt | Bt,
			qt = Ut | Ht,
			jt = ["x", "y"],
			Vt = ["clientX", "clientY"];
		E.prototype = {
			handler: function() {},
			init: function() {
				this.evEl && p(this.element, this.evEl, this.domHandler), this.evTarget && p(this.target, this.evTarget, this.domHandler), this.evWin && p(x(this.element), this.evWin, this.domHandler)
			},
			destroy: function() {
				this.evEl && f(this.element, this.evEl, this.domHandler), this.evTarget && f(this.target, this.evTarget, this.domHandler), this.evWin && f(x(this.element), this.evWin, this.domHandler)
			}
		};
		var Wt = {
			mousedown: Mt,
			mousemove: At,
			mouseup: Ot
		},
			Zt = "mousedown",
			Gt = "mousemove mouseup";
		u(z, E, {
			handler: function(t) {
				var e = Wt[t.type];
				e & Mt && 0 === t.button && (this.pressed = !0), e & At && 1 !== t.which && (e = Ot), this.pressed && (e & Ot && (this.pressed = !1), this.callback(this.manager, e, {
					pointers: [t],
					changedPointers: [t],
					pointerType: Dt,
					srcEvent: t
				}))
			}
		});
		var $t = {
			pointerdown: Mt,
			pointermove: At,
			pointerup: Ot,
			pointercancel: Nt,
			pointerout: Nt
		},
			Jt = {
				2: Lt,
				3: Pt,
				4: Dt,
				5: Tt
			},
			Kt = "pointerdown",
			Yt = "pointermove pointerup pointercancel";
		t.MSPointerEvent && !t.PointerEvent && (Kt = "MSPointerDown", Yt = "MSPointerMove MSPointerUp MSPointerCancel"), u(B, E, {
			handler: function(t) {
				var e = this.store,
					i = !1,
					n = t.type.toLowerCase().replace("ms", ""),
					r = $t[n],
					o = Jt[t.pointerType] || t.pointerType,
					a = o == Lt,
					s = _(e, t.pointerId, "pointerId");
				r & Mt && (0 === t.button || a) ? 0 > s && (e.push(t), s = e.length - 1) : r & (Ot | Nt) && (i = !0), 0 > s || (e[s] = t, this.callback(this.manager, r, {
					pointers: e,
					changedPointers: [t],
					pointerType: o,
					srcEvent: t
				}), i && e.splice(s, 1))
			}
		});
		var Xt = {
			touchstart: Mt,
			touchmove: At,
			touchend: Ot,
			touchcancel: Nt
		},
			Qt = "touchstart",
			te = "touchstart touchmove touchend touchcancel";
		u(U, E, {
			handler: function(t) {
				var e = Xt[t.type];
				if (e === Mt && (this.started = !0), this.started) {
					var i = H.call(this, t, e);
					e & (Ot | Nt) && i[0].length - i[1].length === 0 && (this.started = !1), this.callback(this.manager, e, {
						pointers: i[0],
						changedPointers: i[1],
						pointerType: Lt,
						srcEvent: t
					})
				}
			}
		});
		var ee = {
			touchstart: Mt,
			touchmove: At,
			touchend: Ot,
			touchcancel: Nt
		},
			ie = "touchstart touchmove touchend touchcancel";
		u(q, E, {
			handler: function(t) {
				var e = ee[t.type],
					i = j.call(this, t, e);
				i && this.callback(this.manager, e, {
					pointers: i[0],
					changedPointers: i[1],
					pointerType: Lt,
					srcEvent: t
				})
			}
		});
		var ne = 2500,
			re = 25;
		u(V, E, {
			handler: function(t, e, i) {
				var n = i.pointerType == Lt,
					r = i.pointerType == Dt;
				if (!(r && i.sourceCapabilities && i.sourceCapabilities.firesTouchEvents)) {
					if (n) W.call(this, e, i);
					else if (r && G.call(this, i)) return;
					this.callback(t, e, i)
				}
			},
			destroy: function() {
				this.touch.destroy(), this.mouse.destroy()
			}
		});
		var oe = w(ft.style, "touchAction"),
			ae = oe !== r,
			se = "compute",
			le = "auto",
			ue = "manipulation",
			ce = "none",
			he = "pan-x",
			de = "pan-y",
			pe = K();
		$.prototype = {
			set: function(t) {
				t == se && (t = this.compute()), ae && this.manager.element.style && pe[t] && (this.manager.element.style[oe] = t), this.actions = t.toLowerCase().trim()
			},
			update: function() {
				this.set(this.manager.options.touchAction)
			},
			compute: function() {
				var t = [];
				return s(this.manager.recognizers, function(e) {
					h(e.options.enable, [e]) && (t = t.concat(e.getTouchAction()))
				}), J(t.join(" "))
			},
			preventDefaults: function(t) {
				var e = t.srcEvent,
					i = t.offsetDirection;
				if (this.manager.session.prevented) return void e.preventDefault();
				var n = this.actions,
					r = g(n, ce) && !pe[ce],
					o = g(n, de) && !pe[de],
					a = g(n, he) && !pe[he];
				if (r) {
					var s = 1 === t.pointers.length,
						l = t.distance < 2,
						u = t.deltaTime < 250;
					if (s && l && u) return
				}
				return a && o ? void 0 : r || o && i & Ut || a && i & Ht ? this.preventSrc(e) : void 0
			},
			preventSrc: function(t) {
				this.manager.session.prevented = !0, t.preventDefault()
			}
		};
		var fe = 1,
			me = 2,
			ge = 4,
			ve = 8,
			_e = ve,
			ye = 16,
			be = 32;
		Y.prototype = {
			defaults: {},
			set: function(t) {
				return dt(this.options, t), this.manager && this.manager.touchAction.update(), this
			},
			recognizeWith: function(t) {
				if (a(t, "recognizeWith", this)) return this;
				var e = this.simultaneous;
				return t = tt(t, this), e[t.id] || (e[t.id] = t, t.recognizeWith(this)), this
			},
			dropRecognizeWith: function(t) {
				return a(t, "dropRecognizeWith", this) ? this : (t = tt(t, this), delete this.simultaneous[t.id], this)
			},
			requireFailure: function(t) {
				if (a(t, "requireFailure", this)) return this;
				var e = this.requireFail;
				return t = tt(t, this), -1 === _(e, t) && (e.push(t), t.requireFailure(this)), this
			},
			dropRequireFailure: function(t) {
				if (a(t, "dropRequireFailure", this)) return this;
				t = tt(t, this);
				var e = _(this.requireFail, t);
				return e > -1 && this.requireFail.splice(e, 1), this
			},
			hasRequireFailures: function() {
				return this.requireFail.length > 0
			},
			canRecognizeWith: function(t) {
				return !!this.simultaneous[t.id]
			},
			emit: function(t) {
				function e(e) {
					i.manager.emit(e, t)
				}
				var i = this,
					n = this.state;
				ve > n && e(i.options.event + X(n)), e(i.options.event), t.additionalEvent && e(t.additionalEvent), n >= ve && e(i.options.event + X(n))
			},
			tryEmit: function(t) {
				return this.canEmit() ? this.emit(t) : void(this.state = be)
			},
			canEmit: function() {
				for (var t = 0; t < this.requireFail.length;) {
					if (!(this.requireFail[t].state & (be | fe))) return !1;
					t++
				}
				return !0
			},
			recognize: function(t) {
				var e = dt({}, t);
				return h(this.options.enable, [this, e]) ? (this.state & (_e | ye | be) && (this.state = fe), this.state = this.process(e), void(this.state & (me | ge | ve | ye) && this.tryEmit(e))) : (this.reset(), void(this.state = be))
			},
			process: function(t) {},
			getTouchAction: function() {},
			reset: function() {}
		}, u(et, Y, {
			defaults: {
				pointers: 1
			},
			attrTest: function(t) {
				var e = this.options.pointers;
				return 0 === e || t.pointers.length === e
			},
			process: function(t) {
				var e = this.state,
					i = t.eventType,
					n = e & (me | ge),
					r = this.attrTest(t);
				return n && (i & Nt || !r) ? e | ye : n || r ? i & Ot ? e | ve : e & me ? e | ge : me : be
			}
		}), u(it, et, {
			defaults: {
				event: "pan",
				threshold: 10,
				pointers: 1,
				direction: qt
			},
			getTouchAction: function() {
				var t = this.options.direction,
					e = [];
				return t & Ut && e.push(de), t & Ht && e.push(he), e
			},
			directionTest: function(t) {
				var e = this.options,
					i = !0,
					n = t.distance,
					r = t.direction,
					o = t.deltaX,
					a = t.deltaY;
				return r & e.direction || (e.direction & Ut ? (r = 0 === o ? It : 0 > o ? Rt : Ft, i = o != this.pX, n = Math.abs(t.deltaX)) : (r = 0 === a ? It : 0 > a ? zt : Bt, i = a != this.pY, n = Math.abs(t.deltaY))), t.direction = r, i && n > e.threshold && r & e.direction
			},
			attrTest: function(t) {
				return et.prototype.attrTest.call(this, t) && (this.state & me || !(this.state & me) && this.directionTest(t))
			},
			emit: function(t) {
				this.pX = t.deltaX, this.pY = t.deltaY;
				var e = Q(t.direction);
				e && (t.additionalEvent = this.options.event + e), this._super.emit.call(this, t)
			}
		}), u(nt, et, {
			defaults: {
				event: "pinch",
				threshold: 0,
				pointers: 2
			},
			getTouchAction: function() {
				return [ce]
			},
			attrTest: function(t) {
				return this._super.attrTest.call(this, t) && (Math.abs(t.scale - 1) > this.options.threshold || this.state & me)
			},
			emit: function(t) {
				if (1 !== t.scale) {
					var e = t.scale < 1 ? "in" : "out";
					t.additionalEvent = this.options.event + e
				}
				this._super.emit.call(this, t)
			}
		}), u(rt, Y, {
			defaults: {
				event: "press",
				pointers: 1,
				time: 251,
				threshold: 9
			},
			getTouchAction: function() {
				return [le]
			},
			process: function(t) {
				var e = this.options,
					i = t.pointers.length === e.pointers,
					n = t.distance < e.threshold,
					r = t.deltaTime > e.time;
				if (this._input = t, !n || !i || t.eventType & (Ot | Nt) && !r) this.reset();
				else if (t.eventType & Mt) this.reset(), this._timer = o(function() {
					this.state = _e, this.tryEmit()
				}, e.time, this);
				else if (t.eventType & Ot) return _e;
				return be
			},
			reset: function() {
				clearTimeout(this._timer)
			},
			emit: function(t) {
				this.state === _e && (t && t.eventType & Ot ? this.manager.emit(this.options.event + "up", t) : (this._input.timeStamp = _t(), this.manager.emit(this.options.event, this._input)))
			}
		}), u(ot, et, {
			defaults: {
				event: "rotate",
				threshold: 0,
				pointers: 2
			},
			getTouchAction: function() {
				return [ce]
			},
			attrTest: function(t) {
				return this._super.attrTest.call(this, t) && (Math.abs(t.rotation) > this.options.threshold || this.state & me)
			}
		}), u(at, et, {
			defaults: {
				event: "swipe",
				threshold: 10,
				velocity: .3,
				direction: Ut | Ht,
				pointers: 1
			},
			getTouchAction: function() {
				return it.prototype.getTouchAction.call(this)
			},
			attrTest: function(t) {
				var e, i = this.options.direction;
				return i & (Ut | Ht) ? e = t.overallVelocity : i & Ut ? e = t.overallVelocityX : i & Ht && (e = t.overallVelocityY), this._super.attrTest.call(this, t) && i & t.offsetDirection && t.distance > this.options.threshold && t.maxPointers == this.options.pointers && vt(e) > this.options.velocity && t.eventType & Ot
			},
			emit: function(t) {
				var e = Q(t.offsetDirection);
				e && this.manager.emit(this.options.event + e, t), this.manager.emit(this.options.event, t)
			}
		}), u(st, Y, {
			defaults: {
				event: "tap",
				pointers: 1,
				taps: 1,
				interval: 300,
				time: 250,
				threshold: 9,
				posThreshold: 10
			},
			getTouchAction: function() {
				return [ue]
			},
			process: function(t) {
				var e = this.options,
					i = t.pointers.length === e.pointers,
					n = t.distance < e.threshold,
					r = t.deltaTime < e.time;
				if (this.reset(), t.eventType & Mt && 0 === this.count) return this.failTimeout();
				if (n && r && i) {
					if (t.eventType != Ot) return this.failTimeout();
					var a = !this.pTime || t.timeStamp - this.pTime < e.interval,
						s = !this.pCenter || N(this.pCenter, t.center) < e.posThreshold;
					this.pTime = t.timeStamp, this.pCenter = t.center, s && a ? this.count += 1 : this.count = 1, this._input = t;
					var l = this.count % e.taps;
					if (0 === l) return this.hasRequireFailures() ? (this._timer = o(function() {
						this.state = _e, this.tryEmit()
					}, e.interval, this), me) : _e
				}
				return be
			},
			failTimeout: function() {
				return this._timer = o(function() {
					this.state = be
				}, this.options.interval, this), be
			},
			reset: function() {
				clearTimeout(this._timer)
			},
			emit: function() {
				this.state == _e && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
			}
		}), lt.VERSION = "2.0.7", lt.defaults = {
			domEvents: !1,
			touchAction: se,
			enable: !0,
			inputTarget: null,
			inputClass: null,
			preset: [
				[ot,
				{
					enable: !1
				}],
				[nt,
				{
					enable: !1
				}, ["rotate"]],
				[at,
				{
					direction: Ut
				}],
				[it,
				{
					direction: Ut
				}, ["swipe"]],
				[st],
				[st,
				{
					event: "doubletap",
					taps: 2
				}, ["tap"]],
				[rt]
			],
			cssProps: {
				userSelect: "none",
				touchSelect: "none",
				touchCallout: "none",
				contentZooming: "none",
				userDrag: "none",
				tapHighlightColor: "rgba(0,0,0,0)"
			}
		};
		var we = 1,
			Ce = 2;
		ut.prototype = {
			set: function(t) {
				return dt(this.options, t), t.touchAction && this.touchAction.update(), t.inputTarget && (this.input.destroy(), this.input.target = t.inputTarget, this.input.init()), this
			},
			stop: function(t) {
				this.session.stopped = t ? Ce : we
			},
			recognize: function(t) {
				var e = this.session;
				if (!e.stopped) {
					this.touchAction.preventDefaults(t);
					var i, n = this.recognizers,
						r = e.curRecognizer;
					(!r || r && r.state & _e) && (r = e.curRecognizer = null);
					for (var o = 0; o < n.length;) i = n[o], e.stopped === Ce || r && i != r && !i.canRecognizeWith(r) ? i.reset() : i.recognize(t), !r && i.state & (me | ge | ve) && (r = e.curRecognizer = i), o++
				}
			},
			get: function(t) {
				if (t instanceof Y) return t;
				for (var e = this.recognizers, i = 0; i < e.length; i++) if (e[i].options.event == t) return e[i];
				return null
			},
			add: function(t) {
				if (a(t, "add", this)) return this;
				var e = this.get(t.options.event);
				return e && this.remove(e), this.recognizers.push(t), t.manager = this, this.touchAction.update(), t
			},
			remove: function(t) {
				if (a(t, "remove", this)) return this;
				if (t = this.get(t)) {
					var e = this.recognizers,
						i = _(e, t); - 1 !== i && (e.splice(i, 1), this.touchAction.update())
				}
				return this
			},
			on: function(t, e) {
				if (t !== r && e !== r) {
					var i = this.handlers;
					return s(v(t), function(t) {
						i[t] = i[t] || [], i[t].push(e)
					}), this
				}
			},
			off: function(t, e) {
				if (t !== r) {
					var i = this.handlers;
					return s(v(t), function(t) {
						e ? i[t] && i[t].splice(_(i[t], e), 1) : delete i[t]
					}), this
				}
			},
			emit: function(t, e) {
				this.options.domEvents && ht(t, e);
				var i = this.handlers[t] && this.handlers[t].slice();
				if (i && i.length) {
					e.type = t, e.preventDefault = function() {
						e.srcEvent.preventDefault()
					};
					for (var n = 0; n < i.length;) i[n](e), n++
				}
			},
			destroy: function() {
				this.element && ct(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
			}
		}, dt(lt, {
			INPUT_START: Mt,
			INPUT_MOVE: At,
			INPUT_END: Ot,
			INPUT_CANCEL: Nt,
			STATE_POSSIBLE: fe,
			STATE_BEGAN: me,
			STATE_CHANGED: ge,
			STATE_ENDED: ve,
			STATE_RECOGNIZED: _e,
			STATE_CANCELLED: ye,
			STATE_FAILED: be,
			DIRECTION_NONE: It,
			DIRECTION_LEFT: Rt,
			DIRECTION_RIGHT: Ft,
			DIRECTION_UP: zt,
			DIRECTION_DOWN: Bt,
			DIRECTION_HORIZONTAL: Ut,
			DIRECTION_VERTICAL: Ht,
			DIRECTION_ALL: qt,
			Manager: ut,
			Input: E,
			TouchAction: $,
			TouchInput: q,
			MouseInput: z,
			PointerEventInput: B,
			TouchMouseInput: V,
			SingleTouchInput: U,
			Recognizer: Y,
			AttrRecognizer: et,
			Tap: st,
			Pan: it,
			Swipe: at,
			Pinch: nt,
			Rotate: ot,
			Press: rt,
			on: p,
			off: f,
			each: s,
			merge: bt,
			extend: yt,
			assign: dt,
			inherit: u,
			bindFn: c,
			prefixed: w
		});
		var xe = "undefined" != typeof t ? t : "undefined" != typeof self ? self : {};
		xe.Hammer = lt, "function" == typeof i && i.amd ? i("Hammer", [], function() {
			return lt
		}) : "undefined" != typeof module && module.exports ? module.exports = lt : t[n] = lt
	}(window, document, "Hammer"), i("Core/KnockoutHammerBinding", ["KnockoutES5", "Hammer"], function(t, e) {
		"use strict";
		var i = {
			register: function(t) {
				t.bindingHandlers.swipeLeft = {
					init: function(i, n, r, o, a) {
						var s = t.unwrap(n());
						new e(i).on("swipeleft", function(t) {
							var e = a.$data;
							s.apply(e, arguments)
						})
					}
				}, t.bindingHandlers.swipeRight = {
					init: function(i, n, r, o, a) {
						var s = t.unwrap(n());
						new e(i).on("swiperight", function(t) {
							var e = a.$data;
							s.apply(e, arguments)
						})
					}
				}
			}
		};
		return i
	}), i("Core/registerKnockoutBindings", ["Cesium/Widgets/SvgPathBindingHandler", "KnockoutES5", "Core/KnockoutMarkdownBinding", "Core/KnockoutHammerBinding"], function(t, e, i, n) {
		"use strict";
		var r = function() {
				t.register(e), i.register(e), n.register(e), e.bindingHandlers.embeddedComponent = {
					init: function(t, i, n, r, o) {
						var a = e.unwrap(i());
						return a.show(t), {
							controlsDescendantBindings: !0
						}
					},
					update: function(t, e, i, n, r) {}
				}
			};
		return r
	}), i("Core/createFragmentFromTemplate", [], function() {
		"use strict";
		var t = function(t) {
				var e = document.createElement("div");
				e.innerHTML = t;
				for (var i = document.createDocumentFragment(); e.firstChild;) i.appendChild(e.firstChild);
				return i
			};
		return t
	}), i("Core/loadView", ["Cesium/Widgets/getElement", "KnockoutES5", "Core/createFragmentFromTemplate"], function(t, e, i) {
		"use strict";
		var n = function(n, r, o) {
				r = t(r);
				var a, s = i(n),
					l = [];
				for (a = 0; a < s.childNodes.length; ++a) l.push(s.childNodes[a]);
				for (r.appendChild(s), a = 0; a < l.length; ++a) {
					var u = l[a];
					1 !== u.nodeType && 8 !== u.nodeType || e.applyBindings(o, u)
				}
				return l
			};
		return n
	}), !
	function(t, e, n) {
		var r = t.L,
			o = {};
		o.version = "0.7.7", "object" == typeof module && "object" == typeof module.exports ? module.exports = o : "function" == typeof i && i.amd && i("leaflet", o), o.noConflict = function() {
			return t.L = r, this
		}, t.L = o, o.Util = {
			extend: function(t) {
				var e, i, n, r, o = Array.prototype.slice.call(arguments, 1);
				for (i = 0, n = o.length; n > i; i++) {
					r = o[i] || {};
					for (e in r) r.hasOwnProperty(e) && (t[e] = r[e])
				}
				return t
			},
			bind: function(t, e) {
				var i = arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : null;
				return function() {
					return t.apply(e, i || arguments)
				}
			},
			stamp: function() {
				var t = 0,
					e = "_leaflet_id";
				return function(i) {
					return i[e] = i[e] || ++t, i[e]
				}
			}(),
			invokeEach: function(t, e, i) {
				var n, r;
				if ("object" == typeof t) {
					r = Array.prototype.slice.call(arguments, 3);
					for (n in t) e.apply(i, [n, t[n]].concat(r));
					return !0
				}
				return !1
			},
			limitExecByInterval: function(t, e, i) {
				var n, r;
				return function o() {
					var a = arguments;
					return n ? void(r = !0) : (n = !0, setTimeout(function() {
						n = !1, r && (o.apply(i, a), r = !1)
					}, e), void t.apply(i, a))
				}
			},
			falseFn: function() {
				return !1
			},
			formatNum: function(t, e) {
				var i = Math.pow(10, e || 5);
				return Math.round(t * i) / i
			},
			trim: function(t) {
				return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
			},
			splitWords: function(t) {
				return o.Util.trim(t).split(/\s+/)
			},
			setOptions: function(t, e) {
				return t.options = o.extend({}, t.options, e), t.options
			},
			getParamString: function(t, e, i) {
				var n = [];
				for (var r in t) n.push(encodeURIComponent(i ? r.toUpperCase() : r) + "=" + encodeURIComponent(t[r]));
				return (e && -1 !== e.indexOf("?") ? "&" : "?") + n.join("&")
			},
			template: function(t, e) {
				return t.replace(/\{ *([\w_]+) *\}/g, function(t, i) {
					var r = e[i];
					if (r === n) throw new Error("No value provided for variable " + t);
					return "function" == typeof r && (r = r(e)), r
				})
			},
			isArray: Array.isArray ||
			function(t) {
				return "[object Array]" === Object.prototype.toString.call(t)
			},
			emptyImageUrl: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
		}, function() {
			function e(e) {
				var i, n, r = ["webkit", "moz", "o", "ms"];
				for (i = 0; i < r.length && !n; i++) n = t[r[i] + e];
				return n
			}
			function i(e) {
				var i = +new Date,
					r = Math.max(0, 16 - (i - n));
				return n = i + r, t.setTimeout(e, r)
			}
			var n = 0,
				r = t.requestAnimationFrame || e("RequestAnimationFrame") || i,
				a = t.cancelAnimationFrame || e("CancelAnimationFrame") || e("CancelRequestAnimationFrame") ||
			function(e) {
				t.clearTimeout(e)
			};
			o.Util.requestAnimFrame = function(e, n, a, s) {
				return e = o.bind(e, n), a && r === i ? void e() : r.call(t, e, s)
			}, o.Util.cancelAnimFrame = function(e) {
				e && a.call(t, e)
			}
		}(), o.extend = o.Util.extend, o.bind = o.Util.bind, o.stamp = o.Util.stamp, o.setOptions = o.Util.setOptions, o.Class = function() {}, o.Class.extend = function(t) {
			var e = function() {
					this.initialize && this.initialize.apply(this, arguments), this._initHooks && this.callInitHooks()
				},
				i = function() {};
			i.prototype = this.prototype;
			var n = new i;
			n.constructor = e, e.prototype = n;
			for (var r in this) this.hasOwnProperty(r) && "prototype" !== r && (e[r] = this[r]);
			t.statics && (o.extend(e, t.statics), delete t.statics), t.includes && (o.Util.extend.apply(null, [n].concat(t.includes)), delete t.includes), t.options && n.options && (t.options = o.extend({}, n.options, t.options)), o.extend(n, t), n._initHooks = [];
			var a = this;
			return e.__super__ = a.prototype, n.callInitHooks = function() {
				if (!this._initHooksCalled) {
					a.prototype.callInitHooks && a.prototype.callInitHooks.call(this), this._initHooksCalled = !0;
					for (var t = 0, e = n._initHooks.length; e > t; t++) n._initHooks[t].call(this)
				}
			}, e
		}, o.Class.include = function(t) {
			o.extend(this.prototype, t)
		}, o.Class.mergeOptions = function(t) {
			o.extend(this.prototype.options, t)
		}, o.Class.addInitHook = function(t) {
			var e = Array.prototype.slice.call(arguments, 1),
				i = "function" == typeof t ? t : function() {
					this[t].apply(this, e)
				};
			this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(i)
		};
		var a = "_leaflet_events";
		o.Mixin = {}, o.Mixin.Events = {
			addEventListener: function(t, e, i) {
				if (o.Util.invokeEach(t, this.addEventListener, this, e, i)) return this;
				var n, r, s, l, u, c, h, d = this[a] = this[a] || {},
					p = i && i !== this && o.stamp(i);
				for (t = o.Util.splitWords(t), n = 0, r = t.length; r > n; n++) s = {
					action: e,
					context: i || this
				}, l = t[n], p ? (u = l + "_idx", c = u + "_len", h = d[u] = d[u] || {}, h[p] || (h[p] = [], d[c] = (d[c] || 0) + 1), h[p].push(s)) : (d[l] = d[l] || [], d[l].push(s));
				return this
			},
			hasEventListeners: function(t) {
				var e = this[a];
				return !!e && (t in e && e[t].length > 0 || t + "_idx" in e && e[t + "_idx_len"] > 0)
			},
			removeEventListener: function(t, e, i) {
				if (!this[a]) return this;
				if (!t) return this.clearAllEventListeners();
				if (o.Util.invokeEach(t, this.removeEventListener, this, e, i)) return this;
				var n, r, s, l, u, c, h, d, p, f = this[a],
					m = i && i !== this && o.stamp(i);
				for (t = o.Util.splitWords(t), n = 0, r = t.length; r > n; n++) if (s = t[n], c = s + "_idx", h = c + "_len", d = f[c], e) {
					if (l = m && d ? d[m] : f[s]) {
						for (u = l.length - 1; u >= 0; u--) l[u].action !== e || i && l[u].context !== i || (p = l.splice(u, 1), p[0].action = o.Util.falseFn);
						i && d && 0 === l.length && (delete d[m], f[h]--)
					}
				} else delete f[s], delete f[c], delete f[h];
				return this
			},
			clearAllEventListeners: function() {
				return delete this[a], this
			},
			fireEvent: function(t, e) {
				if (!this.hasEventListeners(t)) return this;
				var i, n, r, s, l, u = o.Util.extend({}, e, {
					type: t,
					target: this
				}),
					c = this[a];
				if (c[t]) for (i = c[t].slice(), n = 0, r = i.length; r > n; n++) i[n].action.call(i[n].context, u);
				s = c[t + "_idx"];
				for (l in s) if (i = s[l].slice()) for (n = 0, r = i.length; r > n; n++) i[n].action.call(i[n].context, u);
				return this
			},
			addOneTimeEventListener: function(t, e, i) {
				if (o.Util.invokeEach(t, this.addOneTimeEventListener, this, e, i)) return this;
				var n = o.bind(function() {
					this.removeEventListener(t, e, i).removeEventListener(t, n, i)
				}, this);
				return this.addEventListener(t, e, i).addEventListener(t, n, i)
			}
		}, o.Mixin.Events.on = o.Mixin.Events.addEventListener, o.Mixin.Events.off = o.Mixin.Events.removeEventListener, o.Mixin.Events.once = o.Mixin.Events.addOneTimeEventListener, o.Mixin.Events.fire = o.Mixin.Events.fireEvent, function() {
			var i = "ActiveXObject" in t,
				r = i && !e.addEventListener,
				a = navigator.userAgent.toLowerCase(),
				s = -1 !== a.indexOf("webkit"),
				l = -1 !== a.indexOf("chrome"),
				u = -1 !== a.indexOf("phantom"),
				c = -1 !== a.indexOf("android"),
				h = -1 !== a.search("android [23]"),
				d = -1 !== a.indexOf("gecko"),
				p = typeof orientation != n + "",
				f = !t.PointerEvent && t.MSPointerEvent,
				m = t.PointerEvent && t.navigator.pointerEnabled || f,
				g = "devicePixelRatio" in t && t.devicePixelRatio > 1 || "matchMedia" in t && t.matchMedia("(min-resolution:144dpi)") && t.matchMedia("(min-resolution:144dpi)").matches,
				v = e.documentElement,
				_ = i && "transition" in v.style,
				y = "WebKitCSSMatrix" in t && "m11" in new t.WebKitCSSMatrix && !h,
				b = "MozPerspective" in v.style,
				w = "OTransition" in v.style,
				C = !t.L_DISABLE_3D && (_ || y || b || w) && !u,
				x = !t.L_NO_TOUCH && !u && (m || "ontouchstart" in t || t.DocumentTouch && e instanceof t.DocumentTouch);
			o.Browser = {
				ie: i,
				ielt9: r,
				webkit: s,
				gecko: d && !s && !t.opera && !i,
				android: c,
				android23: h,
				chrome: l,
				ie3d: _,
				webkit3d: y,
				gecko3d: b,
				opera3d: w,
				any3d: C,
				mobile: p,
				mobileWebkit: p && s,
				mobileWebkit3d: p && y,
				mobileOpera: p && t.opera,
				touch: x,
				msPointer: f,
				pointer: m,
				retina: g
			}
		}(), o.Point = function(t, e, i) {
			this.x = i ? Math.round(t) : t, this.y = i ? Math.round(e) : e
		}, o.Point.prototype = {
			clone: function() {
				return new o.Point(this.x, this.y)
			},
			add: function(t) {
				return this.clone()._add(o.point(t))
			},
			_add: function(t) {
				return this.x += t.x, this.y += t.y, this
			},
			subtract: function(t) {
				return this.clone()._subtract(o.point(t))
			},
			_subtract: function(t) {
				return this.x -= t.x, this.y -= t.y, this
			},
			divideBy: function(t) {
				return this.clone()._divideBy(t)
			},
			_divideBy: function(t) {
				return this.x /= t, this.y /= t, this
			},
			multiplyBy: function(t) {
				return this.clone()._multiplyBy(t)
			},
			_multiplyBy: function(t) {
				return this.x *= t, this.y *= t, this
			},
			round: function() {
				return this.clone()._round()
			},
			_round: function() {
				return this.x = Math.round(this.x), this.y = Math.round(this.y), this
			},
			floor: function() {
				return this.clone()._floor()
			},
			_floor: function() {
				return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
			},
			distanceTo: function(t) {
				t = o.point(t);
				var e = t.x - this.x,
					i = t.y - this.y;
				return Math.sqrt(e * e + i * i)
			},
			equals: function(t) {
				return t = o.point(t), t.x === this.x && t.y === this.y
			},
			contains: function(t) {
				return t = o.point(t), Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y)
			},
			toString: function() {
				return "Point(" + o.Util.formatNum(this.x) + ", " + o.Util.formatNum(this.y) + ")"
			}
		}, o.point = function(t, e, i) {
			return t instanceof o.Point ? t : o.Util.isArray(t) ? new o.Point(t[0], t[1]) : t === n || null === t ? t : new o.Point(t, e, i)
		}, o.Bounds = function(t, e) {
			if (t) for (var i = e ? [t, e] : t, n = 0, r = i.length; r > n; n++) this.extend(i[n])
		}, o.Bounds.prototype = {
			extend: function(t) {
				return t = o.point(t), this.min || this.max ? (this.min.x = Math.min(t.x, this.min.x), this.max.x = Math.max(t.x, this.max.x), this.min.y = Math.min(t.y, this.min.y), this.max.y = Math.max(t.y, this.max.y)) : (this.min = t.clone(), this.max = t.clone()), this
			},
			getCenter: function(t) {
				return new o.Point((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, t)
			},
			getBottomLeft: function() {
				return new o.Point(this.min.x, this.max.y)
			},
			getTopRight: function() {
				return new o.Point(this.max.x, this.min.y)
			},
			getSize: function() {
				return this.max.subtract(this.min)
			},
			contains: function(t) {
				var e, i;
				return t = "number" == typeof t[0] || t instanceof o.Point ? o.point(t) : o.bounds(t), t instanceof o.Bounds ? (e = t.min, i = t.max) : e = i = t, e.x >= this.min.x && i.x <= this.max.x && e.y >= this.min.y && i.y <= this.max.y
			},
			intersects: function(t) {
				t = o.bounds(t);
				var e = this.min,
					i = this.max,
					n = t.min,
					r = t.max,
					a = r.x >= e.x && n.x <= i.x,
					s = r.y >= e.y && n.y <= i.y;
				return a && s
			},
			isValid: function() {
				return !(!this.min || !this.max)
			}
		}, o.bounds = function(t, e) {
			return !t || t instanceof o.Bounds ? t : new o.Bounds(t, e)
		}, o.Transformation = function(t, e, i, n) {
			this._a = t, this._b = e, this._c = i, this._d = n
		}, o.Transformation.prototype = {
			transform: function(t, e) {
				return this._transform(t.clone(), e)
			},
			_transform: function(t, e) {
				return e = e || 1, t.x = e * (this._a * t.x + this._b), t.y = e * (this._c * t.y + this._d), t
			},
			untransform: function(t, e) {
				return e = e || 1, new o.Point((t.x / e - this._b) / this._a, (t.y / e - this._d) / this._c)
			}
		}, o.DomUtil = {
			get: function(t) {
				return "string" == typeof t ? e.getElementById(t) : t
			},
			getStyle: function(t, i) {
				var n = t.style[i];
				if (!n && t.currentStyle && (n = t.currentStyle[i]), (!n || "auto" === n) && e.defaultView) {
					var r = e.defaultView.getComputedStyle(t, null);
					n = r ? r[i] : null
				}
				return "auto" === n ? null : n
			},
			getViewportOffset: function(t) {
				var i, n = 0,
					r = 0,
					a = t,
					s = e.body,
					l = e.documentElement;
				do {
					if (n += a.offsetTop || 0, r += a.offsetLeft || 0, n += parseInt(o.DomUtil.getStyle(a, "borderTopWidth"), 10) || 0, r += parseInt(o.DomUtil.getStyle(a, "borderLeftWidth"), 10) || 0, i = o.DomUtil.getStyle(a, "position"), a.offsetParent === s && "absolute" === i) break;
					if ("fixed" === i) {
						n += s.scrollTop || l.scrollTop || 0, r += s.scrollLeft || l.scrollLeft || 0;
						break
					}
					if ("relative" === i && !a.offsetLeft) {
						var u = o.DomUtil.getStyle(a, "width"),
							c = o.DomUtil.getStyle(a, "max-width"),
							h = a.getBoundingClientRect();
						("none" !== u || "none" !== c) && (r += h.left + a.clientLeft), n += h.top + (s.scrollTop || l.scrollTop || 0);
						break
					}
					a = a.offsetParent
				} while (a);
				a = t;
				do {
					if (a === s) break;
					n -= a.scrollTop || 0, r -= a.scrollLeft || 0, a = a.parentNode
				} while (a);
				return new o.Point(r, n)
			},
			documentIsLtr: function() {
				return o.DomUtil._docIsLtrCached || (o.DomUtil._docIsLtrCached = !0, o.DomUtil._docIsLtr = "ltr" === o.DomUtil.getStyle(e.body, "direction")), o.DomUtil._docIsLtr
			},
			create: function(t, i, n) {
				var r = e.createElement(t);
				return r.className = i, n && n.appendChild(r), r
			},
			hasClass: function(t, e) {
				if (t.classList !== n) return t.classList.contains(e);
				var i = o.DomUtil._getClass(t);
				return i.length > 0 && new RegExp("(^|\\s)" + e + "(\\s|$)").test(i)
			},
			addClass: function(t, e) {
				if (t.classList !== n) for (var i = o.Util.splitWords(e), r = 0, a = i.length; a > r; r++) t.classList.add(i[r]);
				else if (!o.DomUtil.hasClass(t, e)) {
					var s = o.DomUtil._getClass(t);
					o.DomUtil._setClass(t, (s ? s + " " : "") + e)
				}
			},
			removeClass: function(t, e) {
				t.classList !== n ? t.classList.remove(e) : o.DomUtil._setClass(t, o.Util.trim((" " + o.DomUtil._getClass(t) + " ").replace(" " + e + " ", " ")))
			},
			_setClass: function(t, e) {
				t.className.baseVal === n ? t.className = e : t.className.baseVal = e
			},
			_getClass: function(t) {
				return t.className.baseVal === n ? t.className : t.className.baseVal
			},
			setOpacity: function(t, e) {
				if ("opacity" in t.style) t.style.opacity = e;
				else if ("filter" in t.style) {
					var i = !1,
						n = "DXImageTransform.Microsoft.Alpha";
					try {
						i = t.filters.item(n)
					} catch (r) {
						if (1 === e) return
					}
					e = Math.round(100 * e), i ? (i.Enabled = 100 !== e, i.Opacity = e) : t.style.filter += " progid:" + n + "(opacity=" + e + ")"
				}
			},
			testProp: function(t) {
				for (var i = e.documentElement.style, n = 0; n < t.length; n++) if (t[n] in i) return t[n];
				return !1
			},
			getTranslateString: function(t) {
				var e = o.Browser.webkit3d,
					i = "translate" + (e ? "3d" : "") + "(",
					n = (e ? ",0" : "") + ")";
				return i + t.x + "px," + t.y + "px" + n
			},
			getScaleString: function(t, e) {
				var i = o.DomUtil.getTranslateString(e.add(e.multiplyBy(-1 * t))),
					n = " scale(" + t + ") ";
				return i + n
			},
			setPosition: function(t, e, i) {
				t._leaflet_pos = e, !i && o.Browser.any3d ? t.style[o.DomUtil.TRANSFORM] = o.DomUtil.getTranslateString(e) : (t.style.left = e.x + "px", t.style.top = e.y + "px")
			},
			getPosition: function(t) {
				return t._leaflet_pos
			}
		}, o.DomUtil.TRANSFORM = o.DomUtil.testProp(["transform", "WebkitTransform", "OTransform", "MozTransform", "msTransform"]), o.DomUtil.TRANSITION = o.DomUtil.testProp(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]), o.DomUtil.TRANSITION_END = "webkitTransition" === o.DomUtil.TRANSITION || "OTransition" === o.DomUtil.TRANSITION ? o.DomUtil.TRANSITION + "End" : "transitionend", function() {
			if ("onselectstart" in e) o.extend(o.DomUtil, {
				disableTextSelection: function() {
					o.DomEvent.on(t, "selectstart", o.DomEvent.preventDefault)
				},
				enableTextSelection: function() {
					o.DomEvent.off(t, "selectstart", o.DomEvent.preventDefault)
				}
			});
			else {
				var i = o.DomUtil.testProp(["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]);
				o.extend(o.DomUtil, {
					disableTextSelection: function() {
						if (i) {
							var t = e.documentElement.style;
							this._userSelect = t[i], t[i] = "none"
						}
					},
					enableTextSelection: function() {
						i && (e.documentElement.style[i] = this._userSelect, delete this._userSelect)
					}
				})
			}
			o.extend(o.DomUtil, {
				disableImageDrag: function() {
					o.DomEvent.on(t, "dragstart", o.DomEvent.preventDefault)
				},
				enableImageDrag: function() {
					o.DomEvent.off(t, "dragstart", o.DomEvent.preventDefault)
				}
			})
		}(), o.LatLng = function(t, e, i) {
			if (t = parseFloat(t), e = parseFloat(e), isNaN(t) || isNaN(e)) throw new Error("Invalid LatLng object: (" + t + ", " + e + ")");
			this.lat = t, this.lng = e, i !== n && (this.alt = parseFloat(i))
		}, o.extend(o.LatLng, {
			DEG_TO_RAD: Math.PI / 180,
			RAD_TO_DEG: 180 / Math.PI,
			MAX_MARGIN: 1e-9
		}), o.LatLng.prototype = {
			equals: function(t) {
				if (!t) return !1;
				t = o.latLng(t);
				var e = Math.max(Math.abs(this.lat - t.lat), Math.abs(this.lng - t.lng));
				return e <= o.LatLng.MAX_MARGIN
			},
			toString: function(t) {
				return "LatLng(" + o.Util.formatNum(this.lat, t) + ", " + o.Util.formatNum(this.lng, t) + ")"
			},
			distanceTo: function(t) {
				t = o.latLng(t);
				var e = 6378137,
					i = o.LatLng.DEG_TO_RAD,
					n = (t.lat - this.lat) * i,
					r = (t.lng - this.lng) * i,
					a = this.lat * i,
					s = t.lat * i,
					l = Math.sin(n / 2),
					u = Math.sin(r / 2),
					c = l * l + u * u * Math.cos(a) * Math.cos(s);
				return 2 * e * Math.atan2(Math.sqrt(c), Math.sqrt(1 - c))
			},
			wrap: function(t, e) {
				var i = this.lng;
				return t = t || -180, e = e || 180, i = (i + e) % (e - t) + (t > i || i === e ? e : t), new o.LatLng(this.lat, i)
			}
		}, o.latLng = function(t, e) {
			return t instanceof o.LatLng ? t : o.Util.isArray(t) ? "number" == typeof t[0] || "string" == typeof t[0] ? new o.LatLng(t[0], t[1], t[2]) : null : t === n || null === t ? t : "object" == typeof t && "lat" in t ? new o.LatLng(t.lat, "lng" in t ? t.lng : t.lon) : e === n ? null : new o.LatLng(t, e)
		}, o.LatLngBounds = function(t, e) {
			if (t) for (var i = e ? [t, e] : t, n = 0, r = i.length; r > n; n++) this.extend(i[n])
		}, o.LatLngBounds.prototype = {
			extend: function(t) {
				if (!t) return this;
				var e = o.latLng(t);
				return t = null !== e ? e : o.latLngBounds(t), t instanceof o.LatLng ? this._southWest || this._northEast ? (this._southWest.lat = Math.min(t.lat, this._southWest.lat), this._southWest.lng = Math.min(t.lng, this._southWest.lng), this._northEast.lat = Math.max(t.lat, this._northEast.lat), this._northEast.lng = Math.max(t.lng, this._northEast.lng)) : (this._southWest = new o.LatLng(t.lat, t.lng), this._northEast = new o.LatLng(t.lat, t.lng)) : t instanceof o.LatLngBounds && (this.extend(t._southWest), this.extend(t._northEast)), this
			},
			pad: function(t) {
				var e = this._southWest,
					i = this._northEast,
					n = Math.abs(e.lat - i.lat) * t,
					r = Math.abs(e.lng - i.lng) * t;
				return new o.LatLngBounds(new o.LatLng(e.lat - n, e.lng - r), new o.LatLng(i.lat + n, i.lng + r))
			},
			getCenter: function() {
				return new o.LatLng((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2)
			},
			getSouthWest: function() {
				return this._southWest
			},
			getNorthEast: function() {
				return this._northEast
			},
			getNorthWest: function() {
				return new o.LatLng(this.getNorth(), this.getWest())
			},
			getSouthEast: function() {
				return new o.LatLng(this.getSouth(), this.getEast())
			},
			getWest: function() {
				return this._southWest.lng
			},
			getSouth: function() {
				return this._southWest.lat
			},
			getEast: function() {
				return this._northEast.lng
			},
			getNorth: function() {
				return this._northEast.lat
			},
			contains: function(t) {
				t = "number" == typeof t[0] || t instanceof o.LatLng ? o.latLng(t) : o.latLngBounds(t);
				var e, i, n = this._southWest,
					r = this._northEast;
				return t instanceof o.LatLngBounds ? (e = t.getSouthWest(), i = t.getNorthEast()) : e = i = t, e.lat >= n.lat && i.lat <= r.lat && e.lng >= n.lng && i.lng <= r.lng
			},
			intersects: function(t) {
				t = o.latLngBounds(t);
				var e = this._southWest,
					i = this._northEast,
					n = t.getSouthWest(),
					r = t.getNorthEast(),
					a = r.lat >= e.lat && n.lat <= i.lat,
					s = r.lng >= e.lng && n.lng <= i.lng;
				return a && s
			},
			toBBoxString: function() {
				return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",")
			},
			equals: function(t) {
				return !!t && (t = o.latLngBounds(t), this._southWest.equals(t.getSouthWest()) && this._northEast.equals(t.getNorthEast()))
			},
			isValid: function() {
				return !(!this._southWest || !this._northEast)
			}
		}, o.latLngBounds = function(t, e) {
			return !t || t instanceof o.LatLngBounds ? t : new o.LatLngBounds(t, e)
		}, o.Projection = {}, o.Projection.SphericalMercator = {
			MAX_LATITUDE: 85.0511287798,
			project: function(t) {
				var e = o.LatLng.DEG_TO_RAD,
					i = this.MAX_LATITUDE,
					n = Math.max(Math.min(i, t.lat), -i),
					r = t.lng * e,
					a = n * e;
				return a = Math.log(Math.tan(Math.PI / 4 + a / 2)), new o.Point(r, a)
			},
			unproject: function(t) {
				var e = o.LatLng.RAD_TO_DEG,
					i = t.x * e,
					n = (2 * Math.atan(Math.exp(t.y)) - Math.PI / 2) * e;
				return new o.LatLng(n, i)
			}
		}, o.Projection.LonLat = {
			project: function(t) {
				return new o.Point(t.lng, t.lat)
			},
			unproject: function(t) {
				return new o.LatLng(t.y, t.x)
			}
		}, o.CRS = {
			latLngToPoint: function(t, e) {
				var i = this.projection.project(t),
					n = this.scale(e);
				return this.transformation._transform(i, n)
			},
			pointToLatLng: function(t, e) {
				var i = this.scale(e),
					n = this.transformation.untransform(t, i);
				return this.projection.unproject(n)
			},
			project: function(t) {
				return this.projection.project(t)
			},
			scale: function(t) {
				return 256 * Math.pow(2, t)
			},
			getSize: function(t) {
				var e = this.scale(t);
				return o.point(e, e)
			}
		}, o.CRS.Simple = o.extend({}, o.CRS, {
			projection: o.Projection.LonLat,
			transformation: new o.Transformation(1, 0, (-1), 0),
			scale: function(t) {
				return Math.pow(2, t)
			}
		}), o.CRS.EPSG3857 = o.extend({}, o.CRS, {
			code: "EPSG:3857",
			projection: o.Projection.SphericalMercator,
			transformation: new o.Transformation(.5 / Math.PI, .5, -.5 / Math.PI, .5),
			project: function(t) {
				var e = this.projection.project(t),
					i = 6378137;
				return e.multiplyBy(i)
			}
		}), o.CRS.EPSG900913 = o.extend({}, o.CRS.EPSG3857, {
			code: "EPSG:900913"
		}), o.CRS.EPSG4326 = o.extend({}, o.CRS, {
			code: "EPSG:4326",
			projection: o.Projection.LonLat,
			transformation: new o.Transformation(1 / 360, .5, -1 / 360, .5)
		}), o.Map = o.Class.extend({
			includes: o.Mixin.Events,
			options: {
				crs: o.CRS.EPSG3857,
				fadeAnimation: o.DomUtil.TRANSITION && !o.Browser.android23,
				trackResize: !0,
				markerZoomAnimation: o.DomUtil.TRANSITION && o.Browser.any3d
			},
			initialize: function(t, e) {
				e = o.setOptions(this, e), this._initContainer(t), this._initLayout(), this._onResize = o.bind(this._onResize, this), this._initEvents(), e.maxBounds && this.setMaxBounds(e.maxBounds), e.center && e.zoom !== n && this.setView(o.latLng(e.center), e.zoom, {
					reset: !0
				}), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._tileLayersNum = 0, this.callInitHooks(), this._addLayers(e.layers)
			},
			setView: function(t, e) {
				return e = e === n ? this.getZoom() : e, this._resetView(o.latLng(t), this._limitZoom(e)), this
			},
			setZoom: function(t, e) {
				return this._loaded ? this.setView(this.getCenter(), t, {
					zoom: e
				}) : (this._zoom = this._limitZoom(t), this)
			},
			zoomIn: function(t, e) {
				return this.setZoom(this._zoom + (t || 1), e)
			},
			zoomOut: function(t, e) {
				return this.setZoom(this._zoom - (t || 1), e)
			},
			setZoomAround: function(t, e, i) {
				var n = this.getZoomScale(e),
					r = this.getSize().divideBy(2),
					a = t instanceof o.Point ? t : this.latLngToContainerPoint(t),
					s = a.subtract(r).multiplyBy(1 - 1 / n),
					l = this.containerPointToLatLng(r.add(s));
				return this.setView(l, e, {
					zoom: i
				})
			},
			fitBounds: function(t, e) {
				e = e || {}, t = t.getBounds ? t.getBounds() : o.latLngBounds(t);
				var i = o.point(e.paddingTopLeft || e.padding || [0, 0]),
					n = o.point(e.paddingBottomRight || e.padding || [0, 0]),
					r = this.getBoundsZoom(t, !1, i.add(n));
				r = e.maxZoom ? Math.min(e.maxZoom, r) : r;
				var a = n.subtract(i).divideBy(2),
					s = this.project(t.getSouthWest(), r),
					l = this.project(t.getNorthEast(), r),
					u = this.unproject(s.add(l).divideBy(2).add(a), r);
				return this.setView(u, r, e)
			},
			fitWorld: function(t) {
				return this.fitBounds([
					[-90, -180],
					[90, 180]
				], t)
			},
			panTo: function(t, e) {
				return this.setView(t, this._zoom, {
					pan: e
				})
			},
			panBy: function(t) {
				return this.fire("movestart"), this._rawPanBy(o.point(t)), this.fire("move"), this.fire("moveend")
			},
			setMaxBounds: function(t) {
				return t = o.latLngBounds(t), this.options.maxBounds = t, t ? (this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds, this)) : this.off("moveend", this._panInsideMaxBounds, this)
			},
			panInsideBounds: function(t, e) {
				var i = this.getCenter(),
					n = this._limitCenter(i, this._zoom, t);
				return i.equals(n) ? this : this.panTo(n, e)
			},
			addLayer: function(t) {
				var e = o.stamp(t);
				return this._layers[e] ? this : (this._layers[e] = t, !t.options || isNaN(t.options.maxZoom) && isNaN(t.options.minZoom) || (this._zoomBoundLayers[e] = t, this._updateZoomLevels()), this.options.zoomAnimation && o.TileLayer && t instanceof o.TileLayer && (this._tileLayersNum++, this._tileLayersToLoad++, t.on("load", this._onTileLayerLoad, this)), this._loaded && this._layerAdd(t), this)
			},
			removeLayer: function(t) {
				var e = o.stamp(t);
				return this._layers[e] ? (this._loaded && t.onRemove(this), delete this._layers[e], this._loaded && this.fire("layerremove", {
					layer: t
				}), this._zoomBoundLayers[e] && (delete this._zoomBoundLayers[e], this._updateZoomLevels()), this.options.zoomAnimation && o.TileLayer && t instanceof o.TileLayer && (this._tileLayersNum--, this._tileLayersToLoad--, t.off("load", this._onTileLayerLoad, this)), this) : this
			},
			hasLayer: function(t) {
				return !!t && o.stamp(t) in this._layers
			},
			eachLayer: function(t, e) {
				for (var i in this._layers) t.call(e, this._layers[i]);
				return this
			},
			invalidateSize: function(t) {
				if (!this._loaded) return this;
				t = o.extend({
					animate: !1,
					pan: !0
				}, t === !0 ? {
					animate: !0
				} : t);
				var e = this.getSize();
				this._sizeChanged = !0, this._initialCenter = null;
				var i = this.getSize(),
					n = e.divideBy(2).round(),
					r = i.divideBy(2).round(),
					a = n.subtract(r);
				return a.x || a.y ? (t.animate && t.pan ? this.panBy(a) : (t.pan && this._rawPanBy(a), this.fire("move"), t.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(o.bind(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
					oldSize: e,
					newSize: i
				})) : this
			},
			addHandler: function(t, e) {
				if (!e) return this;
				var i = this[t] = new e(this);
				return this._handlers.push(i), this.options[t] && i.enable(), this
			},
			remove: function() {
				this._loaded && this.fire("unload"), this._initEvents("off");
				try {
					delete this._container._leaflet
				} catch (t) {
					this._container._leaflet = n
				}
				return this._clearPanes(), this._clearControlPos && this._clearControlPos(), this._clearHandlers(), this
			},
			getCenter: function() {
				return this._checkIfLoaded(), this._initialCenter && !this._moved() ? this._initialCenter : this.layerPointToLatLng(this._getCenterLayerPoint())
			},
			getZoom: function() {
				return this._zoom
			},
			getBounds: function() {
				var t = this.getPixelBounds(),
					e = this.unproject(t.getBottomLeft()),
					i = this.unproject(t.getTopRight());
				return new o.LatLngBounds(e, i)
			},
			getMinZoom: function() {
				return this.options.minZoom === n ? this._layersMinZoom === n ? 0 : this._layersMinZoom : this.options.minZoom
			},
			getMaxZoom: function() {
				return this.options.maxZoom === n ? this._layersMaxZoom === n ? 1 / 0 : this._layersMaxZoom : this.options.maxZoom
			},
			getBoundsZoom: function(t, e, i) {
				t = o.latLngBounds(t);
				var n, r = this.getMinZoom() - (e ? 1 : 0),
					a = this.getMaxZoom(),
					s = this.getSize(),
					l = t.getNorthWest(),
					u = t.getSouthEast(),
					c = !0;
				i = o.point(i || [0, 0]);
				do r++, n = this.project(u, r).subtract(this.project(l, r)).add(i), c = e ? n.x < s.x || n.y < s.y : s.contains(n);
				while (c && a >= r);
				return c && e ? null : e ? r : r - 1
			},
			getSize: function() {
				return (!this._size || this._sizeChanged) && (this._size = new o.Point(this._container.clientWidth, this._container.clientHeight), this._sizeChanged = !1), this._size.clone()
			},
			getPixelBounds: function() {
				var t = this._getTopLeftPoint();
				return new o.Bounds(t, t.add(this.getSize()))
			},
			getPixelOrigin: function() {
				return this._checkIfLoaded(), this._initialTopLeftPoint
			},
			getPanes: function() {
				return this._panes
			},
			getContainer: function() {
				return this._container
			},
			getZoomScale: function(t) {
				var e = this.options.crs;
				return e.scale(t) / e.scale(this._zoom)
			},
			getScaleZoom: function(t) {
				return this._zoom + Math.log(t) / Math.LN2
			},
			project: function(t, e) {
				return e = e === n ? this._zoom : e, this.options.crs.latLngToPoint(o.latLng(t), e)
			},
			unproject: function(t, e) {
				return e = e === n ? this._zoom : e, this.options.crs.pointToLatLng(o.point(t), e)
			},
			layerPointToLatLng: function(t) {
				var e = o.point(t).add(this.getPixelOrigin());
				return this.unproject(e)
			},
			latLngToLayerPoint: function(t) {
				var e = this.project(o.latLng(t))._round();
				return e._subtract(this.getPixelOrigin())
			},
			containerPointToLayerPoint: function(t) {
				return o.point(t).subtract(this._getMapPanePos())
			},
			layerPointToContainerPoint: function(t) {
				return o.point(t).add(this._getMapPanePos())
			},
			containerPointToLatLng: function(t) {
				var e = this.containerPointToLayerPoint(o.point(t));
				return this.layerPointToLatLng(e)
			},
			latLngToContainerPoint: function(t) {
				return this.layerPointToContainerPoint(this.latLngToLayerPoint(o.latLng(t)))
			},
			mouseEventToContainerPoint: function(t) {
				return o.DomEvent.getMousePosition(t, this._container)
			},
			mouseEventToLayerPoint: function(t) {
				return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))
			},
			mouseEventToLatLng: function(t) {
				return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))
			},
			_initContainer: function(t) {
				var e = this._container = o.DomUtil.get(t);
				if (!e) throw new Error("Map container not found.");
				if (e._leaflet) throw new Error("Map container is already initialized.");
				e._leaflet = !0
			},
			_initLayout: function() {
				var t = this._container;
				o.DomUtil.addClass(t, "leaflet-container" + (o.Browser.touch ? " leaflet-touch" : "") + (o.Browser.retina ? " leaflet-retina" : "") + (o.Browser.ielt9 ? " leaflet-oldie" : "") + (this.options.fadeAnimation ? " leaflet-fade-anim" : ""));
				var e = o.DomUtil.getStyle(t, "position");
				"absolute" !== e && "relative" !== e && "fixed" !== e && (t.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos()
			},
			_initPanes: function() {
				var t = this._panes = {};
				this._mapPane = t.mapPane = this._createPane("leaflet-map-pane", this._container), this._tilePane = t.tilePane = this._createPane("leaflet-tile-pane", this._mapPane), t.objectsPane = this._createPane("leaflet-objects-pane", this._mapPane), t.shadowPane = this._createPane("leaflet-shadow-pane"), t.overlayPane = this._createPane("leaflet-overlay-pane"), t.markerPane = this._createPane("leaflet-marker-pane"), t.popupPane = this._createPane("leaflet-popup-pane");
				var e = " leaflet-zoom-hide";
				this.options.markerZoomAnimation || (o.DomUtil.addClass(t.markerPane, e), o.DomUtil.addClass(t.shadowPane, e), o.DomUtil.addClass(t.popupPane, e))
			},
			_createPane: function(t, e) {
				return o.DomUtil.create("div", t, e || this._panes.objectsPane)
			},
			_clearPanes: function() {
				this._container.removeChild(this._mapPane)
			},
			_addLayers: function(t) {
				t = t ? o.Util.isArray(t) ? t : [t] : [];
				for (var e = 0, i = t.length; i > e; e++) this.addLayer(t[e])
			},
			_resetView: function(t, e, i, n) {
				var r = this._zoom !== e;
				n || (this.fire("movestart"), r && this.fire("zoomstart")), this._zoom = e, this._initialCenter = t, this._initialTopLeftPoint = this._getNewTopLeftPoint(t), i ? this._initialTopLeftPoint._add(this._getMapPanePos()) : o.DomUtil.setPosition(this._mapPane, new o.Point(0, 0)), this._tileLayersToLoad = this._tileLayersNum;
				var a = !this._loaded;
				this._loaded = !0, this.fire("viewreset", {
					hard: !i
				}), a && (this.fire("load"), this.eachLayer(this._layerAdd, this)), this.fire("move"), (r || n) && this.fire("zoomend"), this.fire("moveend", {
					hard: !i
				})
			},
			_rawPanBy: function(t) {
				o.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(t))
			},
			_getZoomSpan: function() {
				return this.getMaxZoom() - this.getMinZoom()
			},
			_updateZoomLevels: function() {
				var t, e = 1 / 0,
					i = -(1 / 0),
					r = this._getZoomSpan();
				for (t in this._zoomBoundLayers) {
					var o = this._zoomBoundLayers[t];
					isNaN(o.options.minZoom) || (e = Math.min(e, o.options.minZoom)), isNaN(o.options.maxZoom) || (i = Math.max(i, o.options.maxZoom))
				}
				t === n ? this._layersMaxZoom = this._layersMinZoom = n : (this._layersMaxZoom = i, this._layersMinZoom = e), r !== this._getZoomSpan() && this.fire("zoomlevelschange")
			},
			_panInsideMaxBounds: function() {
				this.panInsideBounds(this.options.maxBounds)
			},
			_checkIfLoaded: function() {
				if (!this._loaded) throw new Error("Set map center and zoom first.")
			},
			_initEvents: function(e) {
				if (o.DomEvent) {
					e = e || "on", o.DomEvent[e](this._container, "click", this._onMouseClick, this);
					var i, n, r = ["dblclick", "mousedown", "mouseup", "mouseenter", "mouseleave", "mousemove", "contextmenu"];
					for (i = 0, n = r.length; n > i; i++) o.DomEvent[e](this._container, r[i], this._fireMouseEvent, this);
					this.options.trackResize && o.DomEvent[e](t, "resize", this._onResize, this)
				}
			},
			_onResize: function() {
				o.Util.cancelAnimFrame(this._resizeRequest), this._resizeRequest = o.Util.requestAnimFrame(function() {
					this.invalidateSize({
						debounceMoveend: !0
					})
				}, this, !1, this._container)
			},
			_onMouseClick: function(t) {
				!this._loaded || !t._simulated && (this.dragging && this.dragging.moved() || this.boxZoom && this.boxZoom.moved()) || o.DomEvent._skipped(t) || (this.fire("preclick"), this._fireMouseEvent(t))
			},
			_fireMouseEvent: function(t) {
				if (this._loaded && !o.DomEvent._skipped(t)) {
					var e = t.type;
					if (e = "mouseenter" === e ? "mouseover" : "mouseleave" === e ? "mouseout" : e, this.hasEventListeners(e)) {
						"contextmenu" === e && o.DomEvent.preventDefault(t);
						var i = this.mouseEventToContainerPoint(t),
							n = this.containerPointToLayerPoint(i),
							r = this.layerPointToLatLng(n);
						this.fire(e, {
							latlng: r,
							layerPoint: n,
							containerPoint: i,
							originalEvent: t
						})
					}
				}
			},
			_onTileLayerLoad: function() {
				this._tileLayersToLoad--, this._tileLayersNum && !this._tileLayersToLoad && this.fire("tilelayersload")
			},
			_clearHandlers: function() {
				for (var t = 0, e = this._handlers.length; e > t; t++) this._handlers[t].disable()
			},
			whenReady: function(t, e) {
				return this._loaded ? t.call(e || this, this) : this.on("load", t, e), this
			},
			_layerAdd: function(t) {
				t.onAdd(this), this.fire("layeradd", {
					layer: t
				})
			},
			_getMapPanePos: function() {
				return o.DomUtil.getPosition(this._mapPane)
			},
			_moved: function() {
				var t = this._getMapPanePos();
				return t && !t.equals([0, 0])
			},
			_getTopLeftPoint: function() {
				return this.getPixelOrigin().subtract(this._getMapPanePos())
			},
			_getNewTopLeftPoint: function(t, e) {
				var i = this.getSize()._divideBy(2);
				return this.project(t, e)._subtract(i)._round()
			},
			_latLngToNewLayerPoint: function(t, e, i) {
				var n = this._getNewTopLeftPoint(i, e).add(this._getMapPanePos());
				return this.project(t, e)._subtract(n)
			},
			_getCenterLayerPoint: function() {
				return this.containerPointToLayerPoint(this.getSize()._divideBy(2))
			},
			_getCenterOffset: function(t) {
				return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())
			},
			_limitCenter: function(t, e, i) {
				if (!i) return t;
				var n = this.project(t, e),
					r = this.getSize().divideBy(2),
					a = new o.Bounds(n.subtract(r), n.add(r)),
					s = this._getBoundsOffset(a, i, e);
				return this.unproject(n.add(s), e)
			},
			_limitOffset: function(t, e) {
				if (!e) return t;
				var i = this.getPixelBounds(),
					n = new o.Bounds(i.min.add(t), i.max.add(t));
				return t.add(this._getBoundsOffset(n, e))
			},
			_getBoundsOffset: function(t, e, i) {
				var n = this.project(e.getNorthWest(), i).subtract(t.min),
					r = this.project(e.getSouthEast(), i).subtract(t.max),
					a = this._rebound(n.x, -r.x),
					s = this._rebound(n.y, -r.y);
				return new o.Point(a, s)
			},
			_rebound: function(t, e) {
				return t + e > 0 ? Math.round(t - e) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(e))
			},
			_limitZoom: function(t) {
				var e = this.getMinZoom(),
					i = this.getMaxZoom();
				return Math.max(e, Math.min(i, t))
			}
		}), o.map = function(t, e) {
			return new o.Map(t, e)
		}, o.Projection.Mercator = {
			MAX_LATITUDE: 85.0840591556,
			R_MINOR: 6356752.314245179,
			R_MAJOR: 6378137,
			project: function(t) {
				var e = o.LatLng.DEG_TO_RAD,
					i = this.MAX_LATITUDE,
					n = Math.max(Math.min(i, t.lat), -i),
					r = this.R_MAJOR,
					a = this.R_MINOR,
					s = t.lng * e * r,
					l = n * e,
					u = a / r,
					c = Math.sqrt(1 - u * u),
					h = c * Math.sin(l);
				h = Math.pow((1 - h) / (1 + h), .5 * c);
				var d = Math.tan(.5 * (.5 * Math.PI - l)) / h;
				return l = -r * Math.log(d), new o.Point(s, l)
			},
			unproject: function(t) {
				for (var e, i = o.LatLng.RAD_TO_DEG, n = this.R_MAJOR, r = this.R_MINOR, a = t.x * i / n, s = r / n, l = Math.sqrt(1 - s * s), u = Math.exp(-t.y / n), c = Math.PI / 2 - 2 * Math.atan(u), h = 15, d = 1e-7, p = h, f = .1; Math.abs(f) > d && --p > 0;) e = l * Math.sin(c), f = Math.PI / 2 - 2 * Math.atan(u * Math.pow((1 - e) / (1 + e), .5 * l)) - c, c += f;
				return new o.LatLng(c * i, a)
			}
		}, o.CRS.EPSG3395 = o.extend({}, o.CRS, {
			code: "EPSG:3395",
			projection: o.Projection.Mercator,
			transformation: function() {
				var t = o.Projection.Mercator,
					e = t.R_MAJOR,
					i = .5 / (Math.PI * e);
				return new o.Transformation(i, .5, (-i), .5)
			}()
		}), o.TileLayer = o.Class.extend({
			includes: o.Mixin.Events,
			options: {
				minZoom: 0,
				maxZoom: 18,
				tileSize: 256,
				subdomains: "abc",
				errorTileUrl: "",
				attribution: "",
				zoomOffset: 0,
				opacity: 1,
				unloadInvisibleTiles: o.Browser.mobile,
				updateWhenIdle: o.Browser.mobile
			},
			initialize: function(t, e) {
				e = o.setOptions(this, e), e.detectRetina && o.Browser.retina && e.maxZoom > 0 && (e.tileSize = Math.floor(e.tileSize / 2), e.zoomOffset++, e.minZoom > 0 && e.minZoom--, this.options.maxZoom--), e.bounds && (e.bounds = o.latLngBounds(e.bounds)), this._url = t;
				var i = this.options.subdomains;
				"string" == typeof i && (this.options.subdomains = i.split(""))
			},
			onAdd: function(t) {
				this._map = t, this._animated = t._zoomAnimated, this._initContainer(), t.on({
					viewreset: this._reset,
					moveend: this._update
				}, this), this._animated && t.on({
					zoomanim: this._animateZoom,
					zoomend: this._endZoomAnim
				}, this), this.options.updateWhenIdle || (this._limitedUpdate = o.Util.limitExecByInterval(this._update, 150, this), t.on("move", this._limitedUpdate, this)), this._reset(), this._update()
			},
			addTo: function(t) {
				return t.addLayer(this), this
			},
			onRemove: function(t) {
				this._container.parentNode.removeChild(this._container), t.off({
					viewreset: this._reset,
					moveend: this._update
				}, this), this._animated && t.off({
					zoomanim: this._animateZoom,
					zoomend: this._endZoomAnim
				}, this), this.options.updateWhenIdle || t.off("move", this._limitedUpdate, this), this._container = null, this._map = null
			},
			bringToFront: function() {
				var t = this._map._panes.tilePane;
				return this._container && (t.appendChild(this._container), this._setAutoZIndex(t, Math.max)), this
			},
			bringToBack: function() {
				var t = this._map._panes.tilePane;
				return this._container && (t.insertBefore(this._container, t.firstChild), this._setAutoZIndex(t, Math.min)), this
			},
			getAttribution: function() {
				return this.options.attribution
			},
			getContainer: function() {
				return this._container
			},
			setOpacity: function(t) {
				return this.options.opacity = t, this._map && this._updateOpacity(), this
			},
			setZIndex: function(t) {
				return this.options.zIndex = t, this._updateZIndex(), this
			},
			setUrl: function(t, e) {
				return this._url = t, e || this.redraw(), this
			},
			redraw: function() {
				return this._map && (this._reset({
					hard: !0
				}), this._update()), this
			},
			_updateZIndex: function() {
				this._container && this.options.zIndex !== n && (this._container.style.zIndex = this.options.zIndex)
			},
			_setAutoZIndex: function(t, e) {
				var i, n, r, o = t.children,
					a = -e(1 / 0, -(1 / 0));
				for (n = 0, r = o.length; r > n; n++) o[n] !== this._container && (i = parseInt(o[n].style.zIndex, 10), isNaN(i) || (a = e(a, i)));
				this.options.zIndex = this._container.style.zIndex = (isFinite(a) ? a : 0) + e(1, -1)
			},
			_updateOpacity: function() {
				var t, e = this._tiles;
				if (o.Browser.ielt9) for (t in e) o.DomUtil.setOpacity(e[t], this.options.opacity);
				else o.DomUtil.setOpacity(this._container, this.options.opacity)
			},
			_initContainer: function() {
				var t = this._map._panes.tilePane;
				if (!this._container) {
					if (this._container = o.DomUtil.create("div", "leaflet-layer"), this._updateZIndex(), this._animated) {
						var e = "leaflet-tile-container";
						this._bgBuffer = o.DomUtil.create("div", e, this._container), this._tileContainer = o.DomUtil.create("div", e, this._container)
					} else this._tileContainer = this._container;
					t.appendChild(this._container), this.options.opacity < 1 && this._updateOpacity()
				}
			},
			_reset: function(t) {
				for (var e in this._tiles) this.fire("tileunload", {
					tile: this._tiles[e]
				});
				this._tiles = {}, this._tilesToLoad = 0, this.options.reuseTiles && (this._unusedTiles = []), this._tileContainer.innerHTML = "", this._animated && t && t.hard && this._clearBgBuffer(), this._initContainer()
			},
			_getTileSize: function() {
				var t = this._map,
					e = t.getZoom() + this.options.zoomOffset,
					i = this.options.maxNativeZoom,
					n = this.options.tileSize;
				return i && e > i && (n = Math.round(t.getZoomScale(e) / t.getZoomScale(i) * n)), n
			},
			_update: function() {
				if (this._map) {
					var t = this._map,
						e = t.getPixelBounds(),
						i = t.getZoom(),
						n = this._getTileSize();
					if (!(i > this.options.maxZoom || i < this.options.minZoom)) {
						var r = o.bounds(e.min.divideBy(n)._floor(), e.max.divideBy(n)._floor());
						this._addTilesFromCenterOut(r), (this.options.unloadInvisibleTiles || this.options.reuseTiles) && this._removeOtherTiles(r)
					}
				}
			},
			_addTilesFromCenterOut: function(t) {
				var i, n, r, a = [],
					s = t.getCenter();
				for (i = t.min.y; i <= t.max.y; i++) for (n = t.min.x; n <= t.max.x; n++) r = new o.Point(n, i), this._tileShouldBeLoaded(r) && a.push(r);
				var l = a.length;
				if (0 !== l) {
					a.sort(function(t, e) {
						return t.distanceTo(s) - e.distanceTo(s)
					});
					var u = e.createDocumentFragment();
					for (this._tilesToLoad || this.fire("loading"), this._tilesToLoad += l, n = 0; l > n; n++) this._addTile(a[n], u);
					this._tileContainer.appendChild(u)
				}
			},
			_tileShouldBeLoaded: function(t) {
				if (t.x + ":" + t.y in this._tiles) return !1;
				var e = this.options;
				if (!e.continuousWorld) {
					var i = this._getWrapTileNum();
					if (e.noWrap && (t.x < 0 || t.x >= i.x) || t.y < 0 || t.y >= i.y) return !1
				}
				if (e.bounds) {
					var n = this._getTileSize(),
						r = t.multiplyBy(n),
						o = r.add([n, n]),
						a = this._map.unproject(r),
						s = this._map.unproject(o);
					if (e.continuousWorld || e.noWrap || (a = a.wrap(), s = s.wrap()), !e.bounds.intersects([a, s])) return !1
				}
				return !0
			},
			_removeOtherTiles: function(t) {
				var e, i, n, r;
				for (r in this._tiles) e = r.split(":"), i = parseInt(e[0], 10), n = parseInt(e[1], 10), (i < t.min.x || i > t.max.x || n < t.min.y || n > t.max.y) && this._removeTile(r)
			},
			_removeTile: function(t) {
				var e = this._tiles[t];
				this.fire("tileunload", {
					tile: e,
					url: e.src
				}), this.options.reuseTiles ? (o.DomUtil.removeClass(e, "leaflet-tile-loaded"), this._unusedTiles.push(e)) : e.parentNode === this._tileContainer && this._tileContainer.removeChild(e), o.Browser.android || (e.onload = null, e.src = o.Util.emptyImageUrl), delete this._tiles[t]
			},
			_addTile: function(t, e) {
				var i = this._getTilePos(t),
					n = this._getTile();
				o.DomUtil.setPosition(n, i, o.Browser.chrome), this._tiles[t.x + ":" + t.y] = n, this._loadTile(n, t), n.parentNode !== this._tileContainer && e.appendChild(n)
			},
			_getZoomForUrl: function() {
				var t = this.options,
					e = this._map.getZoom();
				return t.zoomReverse && (e = t.maxZoom - e), e += t.zoomOffset, t.maxNativeZoom ? Math.min(e, t.maxNativeZoom) : e
			},
			_getTilePos: function(t) {
				var e = this._map.getPixelOrigin(),
					i = this._getTileSize();
				return t.multiplyBy(i).subtract(e)
			},
			getTileUrl: function(t) {
				return o.Util.template(this._url, o.extend({
					s: this._getSubdomain(t),
					z: t.z,
					x: t.x,
					y: t.y
				}, this.options))
			},
			_getWrapTileNum: function() {
				var t = this._map.options.crs,
					e = t.getSize(this._map.getZoom());
				return e.divideBy(this._getTileSize())._floor()
			},
			_adjustTilePoint: function(t) {
				var e = this._getWrapTileNum();
				this.options.continuousWorld || this.options.noWrap || (t.x = (t.x % e.x + e.x) % e.x), this.options.tms && (t.y = e.y - t.y - 1), t.z = this._getZoomForUrl()
			},
			_getSubdomain: function(t) {
				var e = Math.abs(t.x + t.y) % this.options.subdomains.length;
				return this.options.subdomains[e]
			},
			_getTile: function() {
				if (this.options.reuseTiles && this._unusedTiles.length > 0) {
					var t = this._unusedTiles.pop();
					return this._resetTile(t), t
				}
				return this._createTile()
			},
			_resetTile: function() {},
			_createTile: function() {
				var t = o.DomUtil.create("img", "leaflet-tile");
				return t.style.width = t.style.height = this._getTileSize() + "px", t.galleryimg = "no", t.onselectstart = t.onmousemove = o.Util.falseFn, o.Browser.ielt9 && this.options.opacity !== n && o.DomUtil.setOpacity(t, this.options.opacity), o.Browser.mobileWebkit3d && (t.style.WebkitBackfaceVisibility = "hidden"), t
			},
			_loadTile: function(t, e) {
				t._layer = this, t.onload = this._tileOnLoad, t.onerror = this._tileOnError, this._adjustTilePoint(e), t.src = this.getTileUrl(e), this.fire("tileloadstart", {
					tile: t,
					url: t.src
				})
			},
			_tileLoaded: function() {
				this._tilesToLoad--, this._animated && o.DomUtil.addClass(this._tileContainer, "leaflet-zoom-animated"), this._tilesToLoad || (this.fire("load"), this._animated && (clearTimeout(this._clearBgBufferTimer), this._clearBgBufferTimer = setTimeout(o.bind(this._clearBgBuffer, this), 500)))
			},
			_tileOnLoad: function() {
				var t = this._layer;
				this.src !== o.Util.emptyImageUrl && (o.DomUtil.addClass(this, "leaflet-tile-loaded"), t.fire("tileload", {
					tile: this,
					url: this.src
				})), t._tileLoaded()
			},
			_tileOnError: function() {
				var t = this._layer;
				t.fire("tileerror", {
					tile: this,
					url: this.src
				});
				var e = t.options.errorTileUrl;
				e && (this.src = e), t._tileLoaded()
			}
		}), o.tileLayer = function(t, e) {
			return new o.TileLayer(t, e)
		}, o.TileLayer.WMS = o.TileLayer.extend({
			defaultWmsParams: {
				service: "WMS",
				request: "GetMap",
				version: "1.1.1",
				layers: "",
				styles: "",
				format: "image/jpeg",
				transparent: !1
			},
			initialize: function(t, e) {
				this._url = t;
				var i = o.extend({}, this.defaultWmsParams),
					n = e.tileSize || this.options.tileSize;
				e.detectRetina && o.Browser.retina ? i.width = i.height = 2 * n : i.width = i.height = n;
				for (var r in e) this.options.hasOwnProperty(r) || "crs" === r || (i[r] = e[r]);
				this.wmsParams = i, o.setOptions(this, e)
			},
			onAdd: function(t) {
				this._crs = this.options.crs || t.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
				var e = this._wmsVersion >= 1.3 ? "crs" : "srs";
				this.wmsParams[e] = this._crs.code, o.TileLayer.prototype.onAdd.call(this, t)
			},
			getTileUrl: function(t) {
				var e = this._map,
					i = this.options.tileSize,
					n = t.multiplyBy(i),
					r = n.add([i, i]),
					a = this._crs.project(e.unproject(n, t.z)),
					s = this._crs.project(e.unproject(r, t.z)),
					l = this._wmsVersion >= 1.3 && this._crs === o.CRS.EPSG4326 ? [s.y, a.x, a.y, s.x].join(",") : [a.x, s.y, s.x, a.y].join(","),
					u = o.Util.template(this._url, {
						s: this._getSubdomain(t)
					});
				return u + o.Util.getParamString(this.wmsParams, u, !0) + "&BBOX=" + l
			},
			setParams: function(t, e) {
				return o.extend(this.wmsParams, t), e || this.redraw(), this
			}
		}), o.tileLayer.wms = function(t, e) {
			return new o.TileLayer.WMS(t, e)
		}, o.TileLayer.Canvas = o.TileLayer.extend({
			options: {
				async: !1
			},
			initialize: function(t) {
				o.setOptions(this, t)
			},
			redraw: function() {
				this._map && (this._reset({
					hard: !0
				}), this._update());
				for (var t in this._tiles) this._redrawTile(this._tiles[t]);
				return this
			},
			_redrawTile: function(t) {
				this.drawTile(t, t._tilePoint, this._map._zoom)
			},
			_createTile: function() {
				var t = o.DomUtil.create("canvas", "leaflet-tile");
				return t.width = t.height = this.options.tileSize, t.onselectstart = t.onmousemove = o.Util.falseFn, t
			},
			_loadTile: function(t, e) {
				t._layer = this, t._tilePoint = e, this._redrawTile(t), this.options.async || this.tileDrawn(t)
			},
			drawTile: function() {},
			tileDrawn: function(t) {
				this._tileOnLoad.call(t)
			}
		}), o.tileLayer.canvas = function(t) {
			return new o.TileLayer.Canvas(t)
		}, o.ImageOverlay = o.Class.extend({
			includes: o.Mixin.Events,
			options: {
				opacity: 1
			},
			initialize: function(t, e, i) {
				this._url = t, this._bounds = o.latLngBounds(e), o.setOptions(this, i)
			},
			onAdd: function(t) {
				this._map = t, this._image || this._initImage(), t._panes.overlayPane.appendChild(this._image), t.on("viewreset", this._reset, this), t.options.zoomAnimation && o.Browser.any3d && t.on("zoomanim", this._animateZoom, this), this._reset()
			},
			onRemove: function(t) {
				t.getPanes().overlayPane.removeChild(this._image), t.off("viewreset", this._reset, this), t.options.zoomAnimation && t.off("zoomanim", this._animateZoom, this)
			},
			addTo: function(t) {
				return t.addLayer(this), this
			},
			setOpacity: function(t) {
				return this.options.opacity = t, this._updateOpacity(), this
			},
			bringToFront: function() {
				return this._image && this._map._panes.overlayPane.appendChild(this._image), this
			},
			bringToBack: function() {
				var t = this._map._panes.overlayPane;
				return this._image && t.insertBefore(this._image, t.firstChild), this
			},
			setUrl: function(t) {
				this._url = t, this._image.src = this._url
			},
			getAttribution: function() {
				return this.options.attribution
			},
			_initImage: function() {
				this._image = o.DomUtil.create("img", "leaflet-image-layer"), this._map.options.zoomAnimation && o.Browser.any3d ? o.DomUtil.addClass(this._image, "leaflet-zoom-animated") : o.DomUtil.addClass(this._image, "leaflet-zoom-hide"), this._updateOpacity(), o.extend(this._image, {
					galleryimg: "no",
					onselectstart: o.Util.falseFn,
					onmousemove: o.Util.falseFn,
					onload: o.bind(this._onImageLoad, this),
					src: this._url
				})
			},
			_animateZoom: function(t) {
				var e = this._map,
					i = this._image,
					n = e.getZoomScale(t.zoom),
					r = this._bounds.getNorthWest(),
					a = this._bounds.getSouthEast(),
					s = e._latLngToNewLayerPoint(r, t.zoom, t.center),
					l = e._latLngToNewLayerPoint(a, t.zoom, t.center)._subtract(s),
					u = s._add(l._multiplyBy(.5 * (1 - 1 / n)));
				i.style[o.DomUtil.TRANSFORM] = o.DomUtil.getTranslateString(u) + " scale(" + n + ") "
			},
			_reset: function() {
				var t = this._image,
					e = this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
					i = this._map.latLngToLayerPoint(this._bounds.getSouthEast())._subtract(e);
				o.DomUtil.setPosition(t, e), t.style.width = i.x + "px", t.style.height = i.y + "px"
			},
			_onImageLoad: function() {
				this.fire("load")
			},
			_updateOpacity: function() {
				o.DomUtil.setOpacity(this._image, this.options.opacity)
			}
		}), o.imageOverlay = function(t, e, i) {
			return new o.ImageOverlay(t, e, i)
		}, o.Icon = o.Class.extend({
			options: {
				className: ""
			},
			initialize: function(t) {
				o.setOptions(this, t)
			},
			createIcon: function(t) {
				return this._createIcon("icon", t)
			},
			createShadow: function(t) {
				return this._createIcon("shadow", t)
			},
			_createIcon: function(t, e) {
				var i = this._getIconUrl(t);
				if (!i) {
					if ("icon" === t) throw new Error("iconUrl not set in Icon options (see the docs).");
					return null
				}
				var n;
				return n = e && "IMG" === e.tagName ? this._createImg(i, e) : this._createImg(i), this._setIconStyles(n, t), n
			},
			_setIconStyles: function(t, e) {
				var i, n = this.options,
					r = o.point(n[e + "Size"]);
				i = "shadow" === e ? o.point(n.shadowAnchor || n.iconAnchor) : o.point(n.iconAnchor), !i && r && (i = r.divideBy(2, !0)), t.className = "leaflet-marker-" + e + " " + n.className, i && (t.style.marginLeft = -i.x + "px", t.style.marginTop = -i.y + "px"), r && (t.style.width = r.x + "px", t.style.height = r.y + "px")
			},
			_createImg: function(t, i) {
				return i = i || e.createElement("img"), i.src = t, i
			},
			_getIconUrl: function(t) {
				return o.Browser.retina && this.options[t + "RetinaUrl"] ? this.options[t + "RetinaUrl"] : this.options[t + "Url"]
			}
		}), o.icon = function(t) {
			return new o.Icon(t)
		}, o.Icon.Default = o.Icon.extend({
			options: {
				iconSize: [25, 41],
				iconAnchor: [12, 41],
				popupAnchor: [1, -34],
				shadowSize: [41, 41]
			},
			_getIconUrl: function(t) {
				var e = t + "Url";
				if (this.options[e]) return this.options[e];
				o.Browser.retina && "icon" === t && (t += "-2x");
				var i = o.Icon.Default.imagePath;
				if (!i) throw new Error("Couldn't autodetect L.Icon.Default.imagePath, set it manually.");
				return i + "/marker-" + t + ".png"
			}
		}), o.Icon.Default.imagePath = function() {
			var t, i, n, r, o, a = e.getElementsByTagName("script"),
				s = /[\/^]leaflet[\-\._]?([\w\-\._]*)\.js\??/;
			for (t = 0, i = a.length; i > t; t++) if (n = a[t].src, r = n.match(s)) return o = n.split(s)[0], (o ? o + "/" : "") + "images"
		}(), o.Marker = o.Class.extend({
			includes: o.Mixin.Events,
			options: {
				icon: new o.Icon.Default,
				title: "",
				alt: "",
				clickable: !0,
				draggable: !1,
				keyboard: !0,
				zIndexOffset: 0,
				opacity: 1,
				riseOnHover: !1,
				riseOffset: 250
			},
			initialize: function(t, e) {
				o.setOptions(this, e), this._latlng = o.latLng(t)
			},
			onAdd: function(t) {
				this._map = t, t.on("viewreset", this.update, this), this._initIcon(), this.update(), this.fire("add"), t.options.zoomAnimation && t.options.markerZoomAnimation && t.on("zoomanim", this._animateZoom, this)
			},
			addTo: function(t) {
				return t.addLayer(this), this
			},
			onRemove: function(t) {
				this.dragging && this.dragging.disable(), this._removeIcon(), this._removeShadow(), this.fire("remove"), t.off({
					viewreset: this.update,
					zoomanim: this._animateZoom
				}, this), this._map = null
			},
			getLatLng: function() {
				return this._latlng
			},
			setLatLng: function(t) {
				return this._latlng = o.latLng(t), this.update(), this.fire("move", {
					latlng: this._latlng
				})
			},
			setZIndexOffset: function(t) {
				return this.options.zIndexOffset = t, this.update(), this
			},
			setIcon: function(t) {
				return this.options.icon = t, this._map && (this._initIcon(), this.update()), this._popup && this.bindPopup(this._popup), this
			},
			update: function() {
				return this._icon && this._setPos(this._map.latLngToLayerPoint(this._latlng).round()), this
			},
			_initIcon: function() {
				var t = this.options,
					e = this._map,
					i = e.options.zoomAnimation && e.options.markerZoomAnimation,
					n = i ? "leaflet-zoom-animated" : "leaflet-zoom-hide",
					r = t.icon.createIcon(this._icon),
					a = !1;
				r !== this._icon && (this._icon && this._removeIcon(), a = !0, t.title && (r.title = t.title), t.alt && (r.alt = t.alt)), o.DomUtil.addClass(r, n), t.keyboard && (r.tabIndex = "0"), this._icon = r, this._initInteraction(), t.riseOnHover && o.DomEvent.on(r, "mouseover", this._bringToFront, this).on(r, "mouseout", this._resetZIndex, this);
				var s = t.icon.createShadow(this._shadow),
					l = !1;
				s !== this._shadow && (this._removeShadow(), l = !0), s && o.DomUtil.addClass(s, n), this._shadow = s, t.opacity < 1 && this._updateOpacity();
				var u = this._map._panes;
				a && u.markerPane.appendChild(this._icon), s && l && u.shadowPane.appendChild(this._shadow)
			},
			_removeIcon: function() {
				this.options.riseOnHover && o.DomEvent.off(this._icon, "mouseover", this._bringToFront).off(this._icon, "mouseout", this._resetZIndex), this._map._panes.markerPane.removeChild(this._icon), this._icon = null
			},
			_removeShadow: function() {
				this._shadow && this._map._panes.shadowPane.removeChild(this._shadow), this._shadow = null
			},
			_setPos: function(t) {
				o.DomUtil.setPosition(this._icon, t), this._shadow && o.DomUtil.setPosition(this._shadow, t), this._zIndex = t.y + this.options.zIndexOffset, this._resetZIndex()
			},
			_updateZIndex: function(t) {
				this._icon.style.zIndex = this._zIndex + t
			},
			_animateZoom: function(t) {
				var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center).round();
				this._setPos(e)
			},
			_initInteraction: function() {
				if (this.options.clickable) {
					var t = this._icon,
						e = ["dblclick", "mousedown", "mouseover", "mouseout", "contextmenu"];
					o.DomUtil.addClass(t, "leaflet-clickable"), o.DomEvent.on(t, "click", this._onMouseClick, this), o.DomEvent.on(t, "keypress", this._onKeyPress, this);
					for (var i = 0; i < e.length; i++) o.DomEvent.on(t, e[i], this._fireMouseEvent, this);
					o.Handler.MarkerDrag && (this.dragging = new o.Handler.MarkerDrag(this), this.options.draggable && this.dragging.enable())
				}
			},
			_onMouseClick: function(t) {
				var e = this.dragging && this.dragging.moved();
				(this.hasEventListeners(t.type) || e) && o.DomEvent.stopPropagation(t), e || (this.dragging && this.dragging._enabled || !this._map.dragging || !this._map.dragging.moved()) && this.fire(t.type, {
					originalEvent: t,
					latlng: this._latlng
				})
			},
			_onKeyPress: function(t) {
				13 === t.keyCode && this.fire("click", {
					originalEvent: t,
					latlng: this._latlng
				})
			},
			_fireMouseEvent: function(t) {
				this.fire(t.type, {
					originalEvent: t,
					latlng: this._latlng
				}), "contextmenu" === t.type && this.hasEventListeners(t.type) && o.DomEvent.preventDefault(t), "mousedown" !== t.type ? o.DomEvent.stopPropagation(t) : o.DomEvent.preventDefault(t)
			},
			setOpacity: function(t) {
				return this.options.opacity = t, this._map && this._updateOpacity(), this
			},
			_updateOpacity: function() {
				o.DomUtil.setOpacity(this._icon, this.options.opacity), this._shadow && o.DomUtil.setOpacity(this._shadow, this.options.opacity)
			},
			_bringToFront: function() {
				this._updateZIndex(this.options.riseOffset)
			},
			_resetZIndex: function() {
				this._updateZIndex(0)
			}
		}), o.marker = function(t, e) {
			return new o.Marker(t, e)
		}, o.DivIcon = o.Icon.extend({
			options: {
				iconSize: [12, 12],
				className: "leaflet-div-icon",
				html: !1
			},
			createIcon: function(t) {
				var i = t && "DIV" === t.tagName ? t : e.createElement("div"),
					n = this.options;
				return n.html !== !1 ? i.innerHTML = n.html : i.innerHTML = "", n.bgPos && (i.style.backgroundPosition = -n.bgPos.x + "px " + -n.bgPos.y + "px"), this._setIconStyles(i, "icon"), i
			},
			createShadow: function() {
				return null
			}
		}), o.divIcon = function(t) {
			return new o.DivIcon(t)
		}, o.Map.mergeOptions({
			closePopupOnClick: !0
		}), o.Popup = o.Class.extend({
			includes: o.Mixin.Events,
			options: {
				minWidth: 50,
				maxWidth: 300,
				autoPan: !0,
				closeButton: !0,
				offset: [0, 7],
				autoPanPadding: [5, 5],
				keepInView: !1,
				className: "",
				zoomAnimation: !0
			},
			initialize: function(t, e) {
				o.setOptions(this, t), this._source = e, this._animated = o.Browser.any3d && this.options.zoomAnimation, this._isOpen = !1
			},
			onAdd: function(t) {
				this._map = t, this._container || this._initLayout();
				var e = t.options.fadeAnimation;
				e && o.DomUtil.setOpacity(this._container, 0), t._panes.popupPane.appendChild(this._container), t.on(this._getEvents(), this), this.update(), e && o.DomUtil.setOpacity(this._container, 1), this.fire("open"), t.fire("popupopen", {
					popup: this
				}), this._source && this._source.fire("popupopen", {
					popup: this
				})
			},
			addTo: function(t) {
				return t.addLayer(this), this
			},
			openOn: function(t) {
				return t.openPopup(this), this
			},
			onRemove: function(t) {
				t._panes.popupPane.removeChild(this._container), o.Util.falseFn(this._container.offsetWidth), t.off(this._getEvents(), this), t.options.fadeAnimation && o.DomUtil.setOpacity(this._container, 0), this._map = null, this.fire("close"), t.fire("popupclose", {
					popup: this
				}), this._source && this._source.fire("popupclose", {
					popup: this
				})
			},
			getLatLng: function() {
				return this._latlng
			},
			setLatLng: function(t) {
				return this._latlng = o.latLng(t), this._map && (this._updatePosition(), this._adjustPan()), this
			},
			getContent: function() {
				return this._content
			},
			setContent: function(t) {
				return this._content = t, this.update(), this
			},
			update: function() {
				this._map && (this._container.style.visibility = "hidden", this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan())
			},
			_getEvents: function() {
				var t = {
					viewreset: this._updatePosition
				};
				return this._animated && (t.zoomanim = this._zoomAnimation), ("closeOnClick" in this.options ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (t.preclick = this._close), this.options.keepInView && (t.moveend = this._adjustPan), t
			},
			_close: function() {
				this._map && this._map.closePopup(this)
			},
			_initLayout: function() {
				var t, e = "leaflet-popup",
					i = e + " " + this.options.className + " leaflet-zoom-" + (this._animated ? "animated" : "hide"),
					n = this._container = o.DomUtil.create("div", i);
				this.options.closeButton && (t = this._closeButton = o.DomUtil.create("a", e + "-close-button", n), t.href = "#close", t.innerHTML = "&#215;", o.DomEvent.disableClickPropagation(t), o.DomEvent.on(t, "click", this._onCloseButtonClick, this));
				var r = this._wrapper = o.DomUtil.create("div", e + "-content-wrapper", n);
				o.DomEvent.disableClickPropagation(r), this._contentNode = o.DomUtil.create("div", e + "-content", r), o.DomEvent.disableScrollPropagation(this._contentNode), o.DomEvent.on(r, "contextmenu", o.DomEvent.stopPropagation), this._tipContainer = o.DomUtil.create("div", e + "-tip-container", n), this._tip = o.DomUtil.create("div", e + "-tip", this._tipContainer)
			},
			_updateContent: function() {
				if (this._content) {
					if ("string" == typeof this._content) this._contentNode.innerHTML = this._content;
					else {
						for (; this._contentNode.hasChildNodes();) this._contentNode.removeChild(this._contentNode.firstChild);
						this._contentNode.appendChild(this._content)
					}
					this.fire("contentupdate")
				}
			},
			_updateLayout: function() {
				var t = this._contentNode,
					e = t.style;
				e.width = "", e.whiteSpace = "nowrap";
				var i = t.offsetWidth;
				i = Math.min(i, this.options.maxWidth), i = Math.max(i, this.options.minWidth), e.width = i + 1 + "px", e.whiteSpace = "", e.height = "";
				var n = t.offsetHeight,
					r = this.options.maxHeight,
					a = "leaflet-popup-scrolled";
				r && n > r ? (e.height = r + "px", o.DomUtil.addClass(t, a)) : o.DomUtil.removeClass(t, a), this._containerWidth = this._container.offsetWidth
			},
			_updatePosition: function() {
				if (this._map) {
					var t = this._map.latLngToLayerPoint(this._latlng),
						e = this._animated,
						i = o.point(this.options.offset);
					e && o.DomUtil.setPosition(this._container, t), this._containerBottom = -i.y - (e ? 0 : t.y), this._containerLeft = -Math.round(this._containerWidth / 2) + i.x + (e ? 0 : t.x), this._container.style.bottom = this._containerBottom + "px", this._container.style.left = this._containerLeft + "px"
				}
			},
			_zoomAnimation: function(t) {
				var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center);
				o.DomUtil.setPosition(this._container, e)
			},
			_adjustPan: function() {
				if (this.options.autoPan) {
					var t = this._map,
						e = this._container.offsetHeight,
						i = this._containerWidth,
						n = new o.Point(this._containerLeft, -e - this._containerBottom);
					this._animated && n._add(o.DomUtil.getPosition(this._container));
					var r = t.layerPointToContainerPoint(n),
						a = o.point(this.options.autoPanPadding),
						s = o.point(this.options.autoPanPaddingTopLeft || a),
						l = o.point(this.options.autoPanPaddingBottomRight || a),
						u = t.getSize(),
						c = 0,
						h = 0;
					r.x + i + l.x > u.x && (c = r.x + i - u.x + l.x), r.x - c - s.x < 0 && (c = r.x - s.x), r.y + e + l.y > u.y && (h = r.y + e - u.y + l.y), r.y - h - s.y < 0 && (h = r.y - s.y), (c || h) && t.fire("autopanstart").panBy([c, h])
				}
			},
			_onCloseButtonClick: function(t) {
				this._close(), o.DomEvent.stop(t)
			}
		}), o.popup = function(t, e) {
			return new o.Popup(t, e)
		}, o.Map.include({
			openPopup: function(t, e, i) {
				if (this.closePopup(), !(t instanceof o.Popup)) {
					var n = t;
					t = new o.Popup(i).setLatLng(e).setContent(n)
				}
				return t._isOpen = !0, this._popup = t, this.addLayer(t)
			},
			closePopup: function(t) {
				return t && t !== this._popup || (t = this._popup, this._popup = null), t && (this.removeLayer(t), t._isOpen = !1), this
			}
		}), o.Marker.include({
			openPopup: function() {
				return this._popup && this._map && !this._map.hasLayer(this._popup) && (this._popup.setLatLng(this._latlng), this._map.openPopup(this._popup)), this
			},
			closePopup: function() {
				return this._popup && this._popup._close(), this
			},
			togglePopup: function() {
				return this._popup && (this._popup._isOpen ? this.closePopup() : this.openPopup()), this
			},
			bindPopup: function(t, e) {
				var i = o.point(this.options.icon.options.popupAnchor || [0, 0]);
				return i = i.add(o.Popup.prototype.options.offset), e && e.offset && (i = i.add(e.offset)), e = o.extend({
					offset: i
				}, e), this._popupHandlersAdded || (this.on("click", this.togglePopup, this).on("remove", this.closePopup, this).on("move", this._movePopup, this), this._popupHandlersAdded = !0), t instanceof o.Popup ? (o.setOptions(t, e), this._popup = t, t._source = this) : this._popup = new o.Popup(e, this).setContent(t), this
			},
			setPopupContent: function(t) {
				return this._popup && this._popup.setContent(t), this
			},
			unbindPopup: function() {
				return this._popup && (this._popup = null, this.off("click", this.togglePopup, this).off("remove", this.closePopup, this).off("move", this._movePopup, this), this._popupHandlersAdded = !1), this
			},
			getPopup: function() {
				return this._popup
			},
			_movePopup: function(t) {
				this._popup.setLatLng(t.latlng)
			}
		}), o.LayerGroup = o.Class.extend({
			initialize: function(t) {
				this._layers = {};
				var e, i;
				if (t) for (e = 0, i = t.length; i > e; e++) this.addLayer(t[e])
			},
			addLayer: function(t) {
				var e = this.getLayerId(t);
				return this._layers[e] = t, this._map && this._map.addLayer(t), this
			},
			removeLayer: function(t) {
				var e = t in this._layers ? t : this.getLayerId(t);
				return this._map && this._layers[e] && this._map.removeLayer(this._layers[e]), delete this._layers[e], this
			},
			hasLayer: function(t) {
				return !!t && (t in this._layers || this.getLayerId(t) in this._layers)
			},
			clearLayers: function() {
				return this.eachLayer(this.removeLayer, this), this
			},
			invoke: function(t) {
				var e, i, n = Array.prototype.slice.call(arguments, 1);
				for (e in this._layers) i = this._layers[e], i[t] && i[t].apply(i, n);
				return this
			},
			onAdd: function(t) {
				this._map = t, this.eachLayer(t.addLayer, t)
			},
			onRemove: function(t) {
				this.eachLayer(t.removeLayer, t), this._map = null
			},
			addTo: function(t) {
				return t.addLayer(this), this
			},
			eachLayer: function(t, e) {
				for (var i in this._layers) t.call(e, this._layers[i]);
				return this
			},
			getLayer: function(t) {
				return this._layers[t]
			},
			getLayers: function() {
				var t = [];
				for (var e in this._layers) t.push(this._layers[e]);
				return t
			},
			setZIndex: function(t) {
				return this.invoke("setZIndex", t)
			},
			getLayerId: function(t) {
				return o.stamp(t)
			}
		}), o.layerGroup = function(t) {
			return new o.LayerGroup(t)
		}, o.FeatureGroup = o.LayerGroup.extend({
			includes: o.Mixin.Events,
			statics: {
				EVENTS: "click dblclick mouseover mouseout mousemove contextmenu popupopen popupclose"
			},
			addLayer: function(t) {
				return this.hasLayer(t) ? this : ("on" in t && t.on(o.FeatureGroup.EVENTS, this._propagateEvent, this), o.LayerGroup.prototype.addLayer.call(this, t), this._popupContent && t.bindPopup && t.bindPopup(this._popupContent, this._popupOptions), this.fire("layeradd", {
					layer: t
				}))
			},
			removeLayer: function(t) {
				return this.hasLayer(t) ? (t in this._layers && (t = this._layers[t]), "off" in t && t.off(o.FeatureGroup.EVENTS, this._propagateEvent, this), o.LayerGroup.prototype.removeLayer.call(this, t), this._popupContent && this.invoke("unbindPopup"), this.fire("layerremove", {
					layer: t
				})) : this
			},
			bindPopup: function(t, e) {
				return this._popupContent = t, this._popupOptions = e, this.invoke("bindPopup", t, e)
			},
			openPopup: function(t) {
				for (var e in this._layers) {
					this._layers[e].openPopup(t);
					break
				}
				return this
			},
			setStyle: function(t) {
				return this.invoke("setStyle", t)
			},
			bringToFront: function() {
				return this.invoke("bringToFront")
			},
			bringToBack: function() {
				return this.invoke("bringToBack")
			},
			getBounds: function() {
				var t = new o.LatLngBounds;
				return this.eachLayer(function(e) {
					t.extend(e instanceof o.Marker ? e.getLatLng() : e.getBounds())
				}), t
			},
			_propagateEvent: function(t) {
				t = o.extend({
					layer: t.target,
					target: this
				}, t), this.fire(t.type, t)
			}
		}), o.featureGroup = function(t) {
			return new o.FeatureGroup(t)
		}, o.Path = o.Class.extend({
			includes: [o.Mixin.Events],
			statics: {
				CLIP_PADDING: function() {
					var e = o.Browser.mobile ? 1280 : 2e3,
						i = (e / Math.max(t.outerWidth, t.outerHeight) - 1) / 2;
					return Math.max(0, Math.min(.5, i))
				}()
			},
			options: {
				stroke: !0,
				color: "#0033ff",
				dashArray: null,
				lineCap: null,
				lineJoin: null,
				weight: 5,
				opacity: .5,
				fill: !1,
				fillColor: null,
				fillOpacity: .2,
				clickable: !0
			},
			initialize: function(t) {
				o.setOptions(this, t)
			},
			onAdd: function(t) {
				this._map = t, this._container || (this._initElements(), this._initEvents()), this.projectLatlngs(), this._updatePath(), this._container && this._map._pathRoot.appendChild(this._container), this.fire("add"), t.on({
					viewreset: this.projectLatlngs,
					moveend: this._updatePath
				}, this)
			},
			addTo: function(t) {
				return t.addLayer(this), this
			},
			onRemove: function(t) {
				t._pathRoot.removeChild(this._container), this.fire("remove"), this._map = null, o.Browser.vml && (this._container = null, this._stroke = null, this._fill = null), t.off({
					viewreset: this.projectLatlngs,
					moveend: this._updatePath
				}, this)
			},
			projectLatlngs: function() {},
			setStyle: function(t) {
				return o.setOptions(this, t), this._container && this._updateStyle(), this
			},
			redraw: function() {
				return this._map && (this.projectLatlngs(), this._updatePath()), this
			}
		}), o.Map.include({
			_updatePathViewport: function() {
				var t = o.Path.CLIP_PADDING,
					e = this.getSize(),
					i = o.DomUtil.getPosition(this._mapPane),
					n = i.multiplyBy(-1)._subtract(e.multiplyBy(t)._round()),
					r = n.add(e.multiplyBy(1 + 2 * t)._round());
				this._pathViewport = new o.Bounds(n, r)
			}
		}), o.Path.SVG_NS = "http://www.w3.org/2000/svg", o.Browser.svg = !(!e.createElementNS || !e.createElementNS(o.Path.SVG_NS, "svg").createSVGRect), o.Path = o.Path.extend({
			statics: {
				SVG: o.Browser.svg
			},
			bringToFront: function() {
				var t = this._map._pathRoot,
					e = this._container;
				return e && t.lastChild !== e && t.appendChild(e), this
			},
			bringToBack: function() {
				var t = this._map._pathRoot,
					e = this._container,
					i = t.firstChild;
				return e && i !== e && t.insertBefore(e, i), this
			},
			getPathString: function() {},
			_createElement: function(t) {
				return e.createElementNS(o.Path.SVG_NS, t)
			},
			_initElements: function() {
				this._map._initPathRoot(), this._initPath(), this._initStyle()
			},
			_initPath: function() {
				this._container = this._createElement("g"), this._path = this._createElement("path"), this.options.className && o.DomUtil.addClass(this._path, this.options.className), this._container.appendChild(this._path)
			},
			_initStyle: function() {
				this.options.stroke && (this._path.setAttribute("stroke-linejoin", "round"), this._path.setAttribute("stroke-linecap", "round")), this.options.fill && this._path.setAttribute("fill-rule", "evenodd"), this.options.pointerEvents && this._path.setAttribute("pointer-events", this.options.pointerEvents), this.options.clickable || this.options.pointerEvents || this._path.setAttribute("pointer-events", "none"), this._updateStyle()
			},
			_updateStyle: function() {
				this.options.stroke ? (this._path.setAttribute("stroke", this.options.color), this._path.setAttribute("stroke-opacity", this.options.opacity), this._path.setAttribute("stroke-width", this.options.weight), this.options.dashArray ? this._path.setAttribute("stroke-dasharray", this.options.dashArray) : this._path.removeAttribute("stroke-dasharray"), this.options.lineCap && this._path.setAttribute("stroke-linecap", this.options.lineCap), this.options.lineJoin && this._path.setAttribute("stroke-linejoin", this.options.lineJoin)) : this._path.setAttribute("stroke", "none"), this.options.fill ? (this._path.setAttribute("fill", this.options.fillColor || this.options.color), this._path.setAttribute("fill-opacity", this.options.fillOpacity)) : this._path.setAttribute("fill", "none")
			},
			_updatePath: function() {
				var t = this.getPathString();
				t || (t = "M0 0"), this._path.setAttribute("d", t)
			},
			_initEvents: function() {
				if (this.options.clickable) {
					(o.Browser.svg || !o.Browser.vml) && o.DomUtil.addClass(this._path, "leaflet-clickable"), o.DomEvent.on(this._container, "click", this._onMouseClick, this);
					for (var t = ["dblclick", "mousedown", "mouseover", "mouseout", "mousemove", "contextmenu"], e = 0; e < t.length; e++) o.DomEvent.on(this._container, t[e], this._fireMouseEvent, this)
				}
			},
			_onMouseClick: function(t) {
				this._map.dragging && this._map.dragging.moved() || this._fireMouseEvent(t)
			},
			_fireMouseEvent: function(t) {
				if (this._map && this.hasEventListeners(t.type)) {
					var e = this._map,
						i = e.mouseEventToContainerPoint(t),
						n = e.containerPointToLayerPoint(i),
						r = e.layerPointToLatLng(n);
					this.fire(t.type, {
						latlng: r,
						layerPoint: n,
						containerPoint: i,
						originalEvent: t
					}), "contextmenu" === t.type && o.DomEvent.preventDefault(t), "mousemove" !== t.type && o.DomEvent.stopPropagation(t)
				}
			}
		}), o.Map.include({
			_initPathRoot: function() {
				this._pathRoot || (this._pathRoot = o.Path.prototype._createElement("svg"), this._panes.overlayPane.appendChild(this._pathRoot), this.options.zoomAnimation && o.Browser.any3d ? (o.DomUtil.addClass(this._pathRoot, "leaflet-zoom-animated"), this.on({
					zoomanim: this._animatePathZoom,
					zoomend: this._endPathZoom
				})) : o.DomUtil.addClass(this._pathRoot, "leaflet-zoom-hide"), this.on("moveend", this._updateSvgViewport), this._updateSvgViewport())
			},
			_animatePathZoom: function(t) {
				var e = this.getZoomScale(t.zoom),
					i = this._getCenterOffset(t.center)._multiplyBy(-e)._add(this._pathViewport.min);
				this._pathRoot.style[o.DomUtil.TRANSFORM] = o.DomUtil.getTranslateString(i) + " scale(" + e + ") ", this._pathZooming = !0
			},
			_endPathZoom: function() {
				this._pathZooming = !1
			},
			_updateSvgViewport: function() {
				if (!this._pathZooming) {
					this._updatePathViewport();
					var t = this._pathViewport,
						e = t.min,
						i = t.max,
						n = i.x - e.x,
						r = i.y - e.y,
						a = this._pathRoot,
						s = this._panes.overlayPane;
					o.Browser.mobileWebkit && s.removeChild(a), o.DomUtil.setPosition(a, e), a.setAttribute("width", n), a.setAttribute("height", r), a.setAttribute("viewBox", [e.x, e.y, n, r].join(" ")), o.Browser.mobileWebkit && s.appendChild(a)
				}
			}
		}), o.Path.include({
			bindPopup: function(t, e) {
				return t instanceof o.Popup ? this._popup = t : ((!this._popup || e) && (this._popup = new o.Popup(e, this)), this._popup.setContent(t)), this._popupHandlersAdded || (this.on("click", this._openPopup, this).on("remove", this.closePopup, this), this._popupHandlersAdded = !0), this
			},
			unbindPopup: function() {
				return this._popup && (this._popup = null, this.off("click", this._openPopup).off("remove", this.closePopup), this._popupHandlersAdded = !1), this
			},
			openPopup: function(t) {
				return this._popup && (t = t || this._latlng || this._latlngs[Math.floor(this._latlngs.length / 2)], this._openPopup({
					latlng: t
				})), this
			},
			closePopup: function() {
				return this._popup && this._popup._close(), this
			},
			_openPopup: function(t) {
				this._popup.setLatLng(t.latlng), this._map.openPopup(this._popup);
			}
		}), o.Browser.vml = !o.Browser.svg &&
		function() {
			try {
				var t = e.createElement("div");
				t.innerHTML = '<v:shape adj="1"/>';
				var i = t.firstChild;
				return i.style.behavior = "url(#default#VML)", i && "object" == typeof i.adj
			} catch (n) {
				return !1
			}
		}(), o.Path = o.Browser.svg || !o.Browser.vml ? o.Path : o.Path.extend({
			statics: {
				VML: !0,
				CLIP_PADDING: .02
			},
			_createElement: function() {
				try {
					return e.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function(t) {
						return e.createElement("<lvml:" + t + ' class="lvml">')
					}
				} catch (t) {
					return function(t) {
						return e.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')
					}
				}
			}(),
			_initPath: function() {
				var t = this._container = this._createElement("shape");
				o.DomUtil.addClass(t, "leaflet-vml-shape" + (this.options.className ? " " + this.options.className : "")), this.options.clickable && o.DomUtil.addClass(t, "leaflet-clickable"), t.coordsize = "1 1", this._path = this._createElement("path"), t.appendChild(this._path), this._map._pathRoot.appendChild(t)
			},
			_initStyle: function() {
				this._updateStyle()
			},
			_updateStyle: function() {
				var t = this._stroke,
					e = this._fill,
					i = this.options,
					n = this._container;
				n.stroked = i.stroke, n.filled = i.fill, i.stroke ? (t || (t = this._stroke = this._createElement("stroke"), t.endcap = "round", n.appendChild(t)), t.weight = i.weight + "px", t.color = i.color, t.opacity = i.opacity, i.dashArray ? t.dashStyle = o.Util.isArray(i.dashArray) ? i.dashArray.join(" ") : i.dashArray.replace(/( *, *)/g, " ") : t.dashStyle = "", i.lineCap && (t.endcap = i.lineCap.replace("butt", "flat")), i.lineJoin && (t.joinstyle = i.lineJoin)) : t && (n.removeChild(t), this._stroke = null), i.fill ? (e || (e = this._fill = this._createElement("fill"), n.appendChild(e)), e.color = i.fillColor || i.color, e.opacity = i.fillOpacity) : e && (n.removeChild(e), this._fill = null)
			},
			_updatePath: function() {
				var t = this._container.style;
				t.display = "none", this._path.v = this.getPathString() + " ", t.display = ""
			}
		}), o.Map.include(o.Browser.svg || !o.Browser.vml ? {} : {
			_initPathRoot: function() {
				if (!this._pathRoot) {
					var t = this._pathRoot = e.createElement("div");
					t.className = "leaflet-vml-container", this._panes.overlayPane.appendChild(t), this.on("moveend", this._updatePathViewport), this._updatePathViewport()
				}
			}
		}), o.Browser.canvas = function() {
			return !!e.createElement("canvas").getContext
		}(), o.Path = o.Path.SVG && !t.L_PREFER_CANVAS || !o.Browser.canvas ? o.Path : o.Path.extend({
			statics: {
				CANVAS: !0,
				SVG: !1
			},
			redraw: function() {
				return this._map && (this.projectLatlngs(), this._requestUpdate()), this
			},
			setStyle: function(t) {
				return o.setOptions(this, t), this._map && (this._updateStyle(), this._requestUpdate()), this
			},
			onRemove: function(t) {
				t.off("viewreset", this.projectLatlngs, this).off("moveend", this._updatePath, this), this.options.clickable && (this._map.off("click", this._onClick, this), this._map.off("mousemove", this._onMouseMove, this)), this._requestUpdate(), this.fire("remove"), this._map = null
			},
			_requestUpdate: function() {
				this._map && !o.Path._updateRequest && (o.Path._updateRequest = o.Util.requestAnimFrame(this._fireMapMoveEnd, this._map))
			},
			_fireMapMoveEnd: function() {
				o.Path._updateRequest = null, this.fire("moveend")
			},
			_initElements: function() {
				this._map._initPathRoot(), this._ctx = this._map._canvasCtx
			},
			_updateStyle: function() {
				var t = this.options;
				t.stroke && (this._ctx.lineWidth = t.weight, this._ctx.strokeStyle = t.color), t.fill && (this._ctx.fillStyle = t.fillColor || t.color), t.lineCap && (this._ctx.lineCap = t.lineCap), t.lineJoin && (this._ctx.lineJoin = t.lineJoin)
			},
			_drawPath: function() {
				var t, e, i, n, r, a;
				for (this._ctx.beginPath(), t = 0, i = this._parts.length; i > t; t++) {
					for (e = 0, n = this._parts[t].length; n > e; e++) r = this._parts[t][e], a = (0 === e ? "move" : "line") + "To", this._ctx[a](r.x, r.y);
					this instanceof o.Polygon && this._ctx.closePath()
				}
			},
			_checkIfEmpty: function() {
				return !this._parts.length
			},
			_updatePath: function() {
				if (!this._checkIfEmpty()) {
					var t = this._ctx,
						e = this.options;
					this._drawPath(), t.save(), this._updateStyle(), e.fill && (t.globalAlpha = e.fillOpacity, t.fill(e.fillRule || "evenodd")), e.stroke && (t.globalAlpha = e.opacity, t.stroke()), t.restore()
				}
			},
			_initEvents: function() {
				this.options.clickable && (this._map.on("mousemove", this._onMouseMove, this), this._map.on("click dblclick contextmenu", this._fireMouseEvent, this))
			},
			_fireMouseEvent: function(t) {
				this._containsPoint(t.layerPoint) && this.fire(t.type, t)
			},
			_onMouseMove: function(t) {
				this._map && !this._map._animatingZoom && (this._containsPoint(t.layerPoint) ? (this._ctx.canvas.style.cursor = "pointer", this._mouseInside = !0, this.fire("mouseover", t)) : this._mouseInside && (this._ctx.canvas.style.cursor = "", this._mouseInside = !1, this.fire("mouseout", t)))
			}
		}), o.Map.include(o.Path.SVG && !t.L_PREFER_CANVAS || !o.Browser.canvas ? {} : {
			_initPathRoot: function() {
				var t, i = this._pathRoot;
				i || (i = this._pathRoot = e.createElement("canvas"), i.style.position = "absolute", t = this._canvasCtx = i.getContext("2d"), t.lineCap = "round", t.lineJoin = "round", this._panes.overlayPane.appendChild(i), this.options.zoomAnimation && (this._pathRoot.className = "leaflet-zoom-animated", this.on("zoomanim", this._animatePathZoom), this.on("zoomend", this._endPathZoom)), this.on("moveend", this._updateCanvasViewport), this._updateCanvasViewport())
			},
			_updateCanvasViewport: function() {
				if (!this._pathZooming) {
					this._updatePathViewport();
					var t = this._pathViewport,
						e = t.min,
						i = t.max.subtract(e),
						n = this._pathRoot;
					o.DomUtil.setPosition(n, e), n.width = i.x, n.height = i.y, n.getContext("2d").translate(-e.x, -e.y)
				}
			}
		}), o.LineUtil = {
			simplify: function(t, e) {
				if (!e || !t.length) return t.slice();
				var i = e * e;
				return t = this._reducePoints(t, i), t = this._simplifyDP(t, i)
			},
			pointToSegmentDistance: function(t, e, i) {
				return Math.sqrt(this._sqClosestPointOnSegment(t, e, i, !0))
			},
			closestPointOnSegment: function(t, e, i) {
				return this._sqClosestPointOnSegment(t, e, i)
			},
			_simplifyDP: function(t, e) {
				var i = t.length,
					r = typeof Uint8Array != n + "" ? Uint8Array : Array,
					o = new r(i);
				o[0] = o[i - 1] = 1, this._simplifyDPStep(t, o, e, 0, i - 1);
				var a, s = [];
				for (a = 0; i > a; a++) o[a] && s.push(t[a]);
				return s
			},
			_simplifyDPStep: function(t, e, i, n, r) {
				var o, a, s, l = 0;
				for (a = n + 1; r - 1 >= a; a++) s = this._sqClosestPointOnSegment(t[a], t[n], t[r], !0), s > l && (o = a, l = s);
				l > i && (e[o] = 1, this._simplifyDPStep(t, e, i, n, o), this._simplifyDPStep(t, e, i, o, r))
			},
			_reducePoints: function(t, e) {
				for (var i = [t[0]], n = 1, r = 0, o = t.length; o > n; n++) this._sqDist(t[n], t[r]) > e && (i.push(t[n]), r = n);
				return o - 1 > r && i.push(t[o - 1]), i
			},
			clipSegment: function(t, e, i, n) {
				var r, o, a, s = n ? this._lastCode : this._getBitCode(t, i),
					l = this._getBitCode(e, i);
				for (this._lastCode = l;;) {
					if (!(s | l)) return [t, e];
					if (s & l) return !1;
					r = s || l, o = this._getEdgeIntersection(t, e, r, i), a = this._getBitCode(o, i), r === s ? (t = o, s = a) : (e = o, l = a)
				}
			},
			_getEdgeIntersection: function(t, e, i, n) {
				var r = e.x - t.x,
					a = e.y - t.y,
					s = n.min,
					l = n.max;
				return 8 & i ? new o.Point(t.x + r * (l.y - t.y) / a, l.y) : 4 & i ? new o.Point(t.x + r * (s.y - t.y) / a, s.y) : 2 & i ? new o.Point(l.x, t.y + a * (l.x - t.x) / r) : 1 & i ? new o.Point(s.x, t.y + a * (s.x - t.x) / r) : void 0
			},
			_getBitCode: function(t, e) {
				var i = 0;
				return t.x < e.min.x ? i |= 1 : t.x > e.max.x && (i |= 2), t.y < e.min.y ? i |= 4 : t.y > e.max.y && (i |= 8), i
			},
			_sqDist: function(t, e) {
				var i = e.x - t.x,
					n = e.y - t.y;
				return i * i + n * n
			},
			_sqClosestPointOnSegment: function(t, e, i, n) {
				var r, a = e.x,
					s = e.y,
					l = i.x - a,
					u = i.y - s,
					c = l * l + u * u;
				return c > 0 && (r = ((t.x - a) * l + (t.y - s) * u) / c, r > 1 ? (a = i.x, s = i.y) : r > 0 && (a += l * r, s += u * r)), l = t.x - a, u = t.y - s, n ? l * l + u * u : new o.Point(a, s)
			}
		}, o.Polyline = o.Path.extend({
			initialize: function(t, e) {
				o.Path.prototype.initialize.call(this, e), this._latlngs = this._convertLatLngs(t)
			},
			options: {
				smoothFactor: 1,
				noClip: !1
			},
			projectLatlngs: function() {
				this._originalPoints = [];
				for (var t = 0, e = this._latlngs.length; e > t; t++) this._originalPoints[t] = this._map.latLngToLayerPoint(this._latlngs[t])
			},
			getPathString: function() {
				for (var t = 0, e = this._parts.length, i = ""; e > t; t++) i += this._getPathPartStr(this._parts[t]);
				return i
			},
			getLatLngs: function() {
				return this._latlngs
			},
			setLatLngs: function(t) {
				return this._latlngs = this._convertLatLngs(t), this.redraw()
			},
			addLatLng: function(t) {
				return this._latlngs.push(o.latLng(t)), this.redraw()
			},
			spliceLatLngs: function() {
				var t = [].splice.apply(this._latlngs, arguments);
				return this._convertLatLngs(this._latlngs, !0), this.redraw(), t
			},
			closestLayerPoint: function(t) {
				for (var e, i, n = 1 / 0, r = this._parts, a = null, s = 0, l = r.length; l > s; s++) for (var u = r[s], c = 1, h = u.length; h > c; c++) {
					e = u[c - 1], i = u[c];
					var d = o.LineUtil._sqClosestPointOnSegment(t, e, i, !0);
					n > d && (n = d, a = o.LineUtil._sqClosestPointOnSegment(t, e, i))
				}
				return a && (a.distance = Math.sqrt(n)), a
			},
			getBounds: function() {
				return new o.LatLngBounds(this.getLatLngs())
			},
			_convertLatLngs: function(t, e) {
				var i, n, r = e ? t : [];
				for (i = 0, n = t.length; n > i; i++) {
					if (o.Util.isArray(t[i]) && "number" != typeof t[i][0]) return;
					r[i] = o.latLng(t[i])
				}
				return r
			},
			_initEvents: function() {
				o.Path.prototype._initEvents.call(this)
			},
			_getPathPartStr: function(t) {
				for (var e, i = o.Path.VML, n = 0, r = t.length, a = ""; r > n; n++) e = t[n], i && e._round(), a += (n ? "L" : "M") + e.x + " " + e.y;
				return a
			},
			_clipPoints: function() {
				var t, e, i, n = this._originalPoints,
					r = n.length;
				if (this.options.noClip) return void(this._parts = [n]);
				this._parts = [];
				var a = this._parts,
					s = this._map._pathViewport,
					l = o.LineUtil;
				for (t = 0, e = 0; r - 1 > t; t++) i = l.clipSegment(n[t], n[t + 1], s, t), i && (a[e] = a[e] || [], a[e].push(i[0]), (i[1] !== n[t + 1] || t === r - 2) && (a[e].push(i[1]), e++))
			},
			_simplifyPoints: function() {
				for (var t = this._parts, e = o.LineUtil, i = 0, n = t.length; n > i; i++) t[i] = e.simplify(t[i], this.options.smoothFactor)
			},
			_updatePath: function() {
				this._map && (this._clipPoints(), this._simplifyPoints(), o.Path.prototype._updatePath.call(this))
			}
		}), o.polyline = function(t, e) {
			return new o.Polyline(t, e)
		}, o.PolyUtil = {}, o.PolyUtil.clipPolygon = function(t, e) {
			var i, n, r, a, s, l, u, c, h, d = [1, 4, 2, 8],
				p = o.LineUtil;
			for (n = 0, u = t.length; u > n; n++) t[n]._code = p._getBitCode(t[n], e);
			for (a = 0; 4 > a; a++) {
				for (c = d[a], i = [], n = 0, u = t.length, r = u - 1; u > n; r = n++) s = t[n], l = t[r], s._code & c ? l._code & c || (h = p._getEdgeIntersection(l, s, c, e), h._code = p._getBitCode(h, e), i.push(h)) : (l._code & c && (h = p._getEdgeIntersection(l, s, c, e), h._code = p._getBitCode(h, e), i.push(h)), i.push(s));
				t = i
			}
			return t
		}, o.Polygon = o.Polyline.extend({
			options: {
				fill: !0
			},
			initialize: function(t, e) {
				o.Polyline.prototype.initialize.call(this, t, e), this._initWithHoles(t)
			},
			_initWithHoles: function(t) {
				var e, i, n;
				if (t && o.Util.isArray(t[0]) && "number" != typeof t[0][0]) for (this._latlngs = this._convertLatLngs(t[0]), this._holes = t.slice(1), e = 0, i = this._holes.length; i > e; e++) n = this._holes[e] = this._convertLatLngs(this._holes[e]), n[0].equals(n[n.length - 1]) && n.pop();
				t = this._latlngs, t.length >= 2 && t[0].equals(t[t.length - 1]) && t.pop()
			},
			projectLatlngs: function() {
				if (o.Polyline.prototype.projectLatlngs.call(this), this._holePoints = [], this._holes) {
					var t, e, i, n;
					for (t = 0, i = this._holes.length; i > t; t++) for (this._holePoints[t] = [], e = 0, n = this._holes[t].length; n > e; e++) this._holePoints[t][e] = this._map.latLngToLayerPoint(this._holes[t][e])
				}
			},
			setLatLngs: function(t) {
				return t && o.Util.isArray(t[0]) && "number" != typeof t[0][0] ? (this._initWithHoles(t), this.redraw()) : o.Polyline.prototype.setLatLngs.call(this, t)
			},
			_clipPoints: function() {
				var t = this._originalPoints,
					e = [];
				if (this._parts = [t].concat(this._holePoints), !this.options.noClip) {
					for (var i = 0, n = this._parts.length; n > i; i++) {
						var r = o.PolyUtil.clipPolygon(this._parts[i], this._map._pathViewport);
						r.length && e.push(r)
					}
					this._parts = e
				}
			},
			_getPathPartStr: function(t) {
				var e = o.Polyline.prototype._getPathPartStr.call(this, t);
				return e + (o.Browser.svg ? "z" : "x")
			}
		}), o.polygon = function(t, e) {
			return new o.Polygon(t, e)
		}, function() {
			function t(t) {
				return o.FeatureGroup.extend({
					initialize: function(t, e) {
						this._layers = {}, this._options = e, this.setLatLngs(t)
					},
					setLatLngs: function(e) {
						var i = 0,
							n = e.length;
						for (this.eachLayer(function(t) {
							n > i ? t.setLatLngs(e[i++]) : this.removeLayer(t)
						}, this); n > i;) this.addLayer(new t(e[i++], this._options));
						return this
					},
					getLatLngs: function() {
						var t = [];
						return this.eachLayer(function(e) {
							t.push(e.getLatLngs())
						}), t
					}
				})
			}
			o.MultiPolyline = t(o.Polyline), o.MultiPolygon = t(o.Polygon), o.multiPolyline = function(t, e) {
				return new o.MultiPolyline(t, e)
			}, o.multiPolygon = function(t, e) {
				return new o.MultiPolygon(t, e)
			}
		}(), o.Rectangle = o.Polygon.extend({
			initialize: function(t, e) {
				o.Polygon.prototype.initialize.call(this, this._boundsToLatLngs(t), e)
			},
			setBounds: function(t) {
				this.setLatLngs(this._boundsToLatLngs(t))
			},
			_boundsToLatLngs: function(t) {
				return t = o.latLngBounds(t), [t.getSouthWest(), t.getNorthWest(), t.getNorthEast(), t.getSouthEast()]
			}
		}), o.rectangle = function(t, e) {
			return new o.Rectangle(t, e)
		}, o.Circle = o.Path.extend({
			initialize: function(t, e, i) {
				o.Path.prototype.initialize.call(this, i), this._latlng = o.latLng(t), this._mRadius = e
			},
			options: {
				fill: !0
			},
			setLatLng: function(t) {
				return this._latlng = o.latLng(t), this.redraw()
			},
			setRadius: function(t) {
				return this._mRadius = t, this.redraw()
			},
			projectLatlngs: function() {
				var t = this._getLngRadius(),
					e = this._latlng,
					i = this._map.latLngToLayerPoint([e.lat, e.lng - t]);
				this._point = this._map.latLngToLayerPoint(e), this._radius = Math.max(this._point.x - i.x, 1)
			},
			getBounds: function() {
				var t = this._getLngRadius(),
					e = this._mRadius / 40075017 * 360,
					i = this._latlng;
				return new o.LatLngBounds([i.lat - e, i.lng - t], [i.lat + e, i.lng + t])
			},
			getLatLng: function() {
				return this._latlng
			},
			getPathString: function() {
				var t = this._point,
					e = this._radius;
				return this._checkIfEmpty() ? "" : o.Browser.svg ? "M" + t.x + "," + (t.y - e) + "A" + e + "," + e + ",0,1,1," + (t.x - .1) + "," + (t.y - e) + " z" : (t._round(), e = Math.round(e), "AL " + t.x + "," + t.y + " " + e + "," + e + " 0,23592600")
			},
			getRadius: function() {
				return this._mRadius
			},
			_getLatRadius: function() {
				return this._mRadius / 40075017 * 360
			},
			_getLngRadius: function() {
				return this._getLatRadius() / Math.cos(o.LatLng.DEG_TO_RAD * this._latlng.lat)
			},
			_checkIfEmpty: function() {
				if (!this._map) return !1;
				var t = this._map._pathViewport,
					e = this._radius,
					i = this._point;
				return i.x - e > t.max.x || i.y - e > t.max.y || i.x + e < t.min.x || i.y + e < t.min.y
			}
		}), o.circle = function(t, e, i) {
			return new o.Circle(t, e, i)
		}, o.CircleMarker = o.Circle.extend({
			options: {
				radius: 10,
				weight: 2
			},
			initialize: function(t, e) {
				o.Circle.prototype.initialize.call(this, t, null, e), this._radius = this.options.radius
			},
			projectLatlngs: function() {
				this._point = this._map.latLngToLayerPoint(this._latlng)
			},
			_updateStyle: function() {
				o.Circle.prototype._updateStyle.call(this), this.setRadius(this.options.radius)
			},
			setLatLng: function(t) {
				return o.Circle.prototype.setLatLng.call(this, t), this._popup && this._popup._isOpen && this._popup.setLatLng(t), this
			},
			setRadius: function(t) {
				return this.options.radius = this._radius = t, this.redraw()
			},
			getRadius: function() {
				return this._radius
			}
		}), o.circleMarker = function(t, e) {
			return new o.CircleMarker(t, e)
		}, o.Polyline.include(o.Path.CANVAS ? {
			_containsPoint: function(t, e) {
				var i, n, r, a, s, l, u, c = this.options.weight / 2;
				for (o.Browser.touch && (c += 10), i = 0, a = this._parts.length; a > i; i++) for (u = this._parts[i], n = 0, s = u.length, r = s - 1; s > n; r = n++) if ((e || 0 !== n) && (l = o.LineUtil.pointToSegmentDistance(t, u[r], u[n]), c >= l)) return !0;
				return !1
			}
		} : {}), o.Polygon.include(o.Path.CANVAS ? {
			_containsPoint: function(t) {
				var e, i, n, r, a, s, l, u, c = !1;
				if (o.Polyline.prototype._containsPoint.call(this, t, !0)) return !0;
				for (r = 0, l = this._parts.length; l > r; r++) for (e = this._parts[r], a = 0, u = e.length, s = u - 1; u > a; s = a++) i = e[a], n = e[s], i.y > t.y != n.y > t.y && t.x < (n.x - i.x) * (t.y - i.y) / (n.y - i.y) + i.x && (c = !c);
				return c
			}
		} : {}), o.Circle.include(o.Path.CANVAS ? {
			_drawPath: function() {
				var t = this._point;
				this._ctx.beginPath(), this._ctx.arc(t.x, t.y, this._radius, 0, 2 * Math.PI, !1)
			},
			_containsPoint: function(t) {
				var e = this._point,
					i = this.options.stroke ? this.options.weight / 2 : 0;
				return t.distanceTo(e) <= this._radius + i
			}
		} : {}), o.CircleMarker.include(o.Path.CANVAS ? {
			_updateStyle: function() {
				o.Path.prototype._updateStyle.call(this)
			}
		} : {}), o.GeoJSON = o.FeatureGroup.extend({
			initialize: function(t, e) {
				o.setOptions(this, e), this._layers = {}, t && this.addData(t)
			},
			addData: function(t) {
				var e, i, n, r = o.Util.isArray(t) ? t : t.features;
				if (r) {
					for (e = 0, i = r.length; i > e; e++) n = r[e], (n.geometries || n.geometry || n.features || n.coordinates) && this.addData(r[e]);
					return this
				}
				var a = this.options;
				if (!a.filter || a.filter(t)) {
					var s = o.GeoJSON.geometryToLayer(t, a.pointToLayer, a.coordsToLatLng, a);
					return s.feature = o.GeoJSON.asFeature(t), s.defaultOptions = s.options, this.resetStyle(s), a.onEachFeature && a.onEachFeature(t, s), this.addLayer(s)
				}
			},
			resetStyle: function(t) {
				var e = this.options.style;
				e && (o.Util.extend(t.options, t.defaultOptions), this._setLayerStyle(t, e))
			},
			setStyle: function(t) {
				this.eachLayer(function(e) {
					this._setLayerStyle(e, t)
				}, this)
			},
			_setLayerStyle: function(t, e) {
				"function" == typeof e && (e = e(t.feature)), t.setStyle && t.setStyle(e)
			}
		}), o.extend(o.GeoJSON, {
			geometryToLayer: function(t, e, i, n) {
				var r, a, s, l, u = "Feature" === t.type ? t.geometry : t,
					c = u.coordinates,
					h = [];
				switch (i = i || this.coordsToLatLng, u.type) {
				case "Point":
					return r = i(c), e ? e(t, r) : new o.Marker(r);
				case "MultiPoint":
					for (s = 0, l = c.length; l > s; s++) r = i(c[s]), h.push(e ? e(t, r) : new o.Marker(r));
					return new o.FeatureGroup(h);
				case "LineString":
					return a = this.coordsToLatLngs(c, 0, i), new o.Polyline(a, n);
				case "Polygon":
					if (2 === c.length && !c[1].length) throw new Error("Invalid GeoJSON object.");
					return a = this.coordsToLatLngs(c, 1, i), new o.Polygon(a, n);
				case "MultiLineString":
					return a = this.coordsToLatLngs(c, 1, i), new o.MultiPolyline(a, n);
				case "MultiPolygon":
					return a = this.coordsToLatLngs(c, 2, i), new o.MultiPolygon(a, n);
				case "GeometryCollection":
					for (s = 0, l = u.geometries.length; l > s; s++) h.push(this.geometryToLayer({
						geometry: u.geometries[s],
						type: "Feature",
						properties: t.properties
					}, e, i, n));
					return new o.FeatureGroup(h);
				default:
					throw new Error("Invalid GeoJSON object.")
				}
			},
			coordsToLatLng: function(t) {
				return new o.LatLng(t[1], t[0], t[2])
			},
			coordsToLatLngs: function(t, e, i) {
				var n, r, o, a = [];
				for (r = 0, o = t.length; o > r; r++) n = e ? this.coordsToLatLngs(t[r], e - 1, i) : (i || this.coordsToLatLng)(t[r]), a.push(n);
				return a
			},
			latLngToCoords: function(t) {
				var e = [t.lng, t.lat];
				return t.alt !== n && e.push(t.alt), e
			},
			latLngsToCoords: function(t) {
				for (var e = [], i = 0, n = t.length; n > i; i++) e.push(o.GeoJSON.latLngToCoords(t[i]));
				return e
			},
			getFeature: function(t, e) {
				return t.feature ? o.extend({}, t.feature, {
					geometry: e
				}) : o.GeoJSON.asFeature(e)
			},
			asFeature: function(t) {
				return "Feature" === t.type ? t : {
					type: "Feature",
					properties: {},
					geometry: t
				}
			}
		});
		var s = {
			toGeoJSON: function() {
				return o.GeoJSON.getFeature(this, {
					type: "Point",
					coordinates: o.GeoJSON.latLngToCoords(this.getLatLng())
				})
			}
		};
		o.Marker.include(s), o.Circle.include(s), o.CircleMarker.include(s), o.Polyline.include({
			toGeoJSON: function() {
				return o.GeoJSON.getFeature(this, {
					type: "LineString",
					coordinates: o.GeoJSON.latLngsToCoords(this.getLatLngs())
				})
			}
		}), o.Polygon.include({
			toGeoJSON: function() {
				var t, e, i, n = [o.GeoJSON.latLngsToCoords(this.getLatLngs())];
				if (n[0].push(n[0][0]), this._holes) for (t = 0, e = this._holes.length; e > t; t++) i = o.GeoJSON.latLngsToCoords(this._holes[t]), i.push(i[0]), n.push(i);
				return o.GeoJSON.getFeature(this, {
					type: "Polygon",
					coordinates: n
				})
			}
		}), function() {
			function t(t) {
				return function() {
					var e = [];
					return this.eachLayer(function(t) {
						e.push(t.toGeoJSON().geometry.coordinates)
					}), o.GeoJSON.getFeature(this, {
						type: t,
						coordinates: e
					})
				}
			}
			o.MultiPolyline.include({
				toGeoJSON: t("MultiLineString")
			}), o.MultiPolygon.include({
				toGeoJSON: t("MultiPolygon")
			}), o.LayerGroup.include({
				toGeoJSON: function() {
					var e, i = this.feature && this.feature.geometry,
						n = [];
					if (i && "MultiPoint" === i.type) return t("MultiPoint").call(this);
					var r = i && "GeometryCollection" === i.type;
					return this.eachLayer(function(t) {
						t.toGeoJSON && (e = t.toGeoJSON(), n.push(r ? e.geometry : o.GeoJSON.asFeature(e)))
					}), r ? o.GeoJSON.getFeature(this, {
						geometries: n,
						type: "GeometryCollection"
					}) : {
						type: "FeatureCollection",
						features: n
					}
				}
			})
		}(), o.geoJson = function(t, e) {
			return new o.GeoJSON(t, e)
		}, o.DomEvent = {
			addListener: function(t, e, i, n) {
				var r, a, s, l = o.stamp(i),
					u = "_leaflet_" + e + l;
				return t[u] ? this : (r = function(e) {
					return i.call(n || t, e || o.DomEvent._getEvent())
				}, o.Browser.pointer && 0 === e.indexOf("touch") ? this.addPointerListener(t, e, r, l) : (o.Browser.touch && "dblclick" === e && this.addDoubleTapListener && this.addDoubleTapListener(t, r, l), "addEventListener" in t ? "mousewheel" === e ? (t.addEventListener("DOMMouseScroll", r, !1), t.addEventListener(e, r, !1)) : "mouseenter" === e || "mouseleave" === e ? (a = r, s = "mouseenter" === e ? "mouseover" : "mouseout", r = function(e) {
					return o.DomEvent._checkMouse(t, e) ? a(e) : void 0
				}, t.addEventListener(s, r, !1)) : "click" === e && o.Browser.android ? (a = r, r = function(t) {
					return o.DomEvent._filterClick(t, a)
				}, t.addEventListener(e, r, !1)) : t.addEventListener(e, r, !1) : "attachEvent" in t && t.attachEvent("on" + e, r), t[u] = r, this))
			},
			removeListener: function(t, e, i) {
				var n = o.stamp(i),
					r = "_leaflet_" + e + n,
					a = t[r];
				return a ? (o.Browser.pointer && 0 === e.indexOf("touch") ? this.removePointerListener(t, e, n) : o.Browser.touch && "dblclick" === e && this.removeDoubleTapListener ? this.removeDoubleTapListener(t, n) : "removeEventListener" in t ? "mousewheel" === e ? (t.removeEventListener("DOMMouseScroll", a, !1), t.removeEventListener(e, a, !1)) : "mouseenter" === e || "mouseleave" === e ? t.removeEventListener("mouseenter" === e ? "mouseover" : "mouseout", a, !1) : t.removeEventListener(e, a, !1) : "detachEvent" in t && t.detachEvent("on" + e, a), t[r] = null, this) : this
			},
			stopPropagation: function(t) {
				return t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0, o.DomEvent._skipped(t), this
			},
			disableScrollPropagation: function(t) {
				var e = o.DomEvent.stopPropagation;
				return o.DomEvent.on(t, "mousewheel", e).on(t, "MozMousePixelScroll", e)
			},
			disableClickPropagation: function(t) {
				for (var e = o.DomEvent.stopPropagation, i = o.Draggable.START.length - 1; i >= 0; i--) o.DomEvent.on(t, o.Draggable.START[i], e);
				return o.DomEvent.on(t, "click", o.DomEvent._fakeStop).on(t, "dblclick", e)
			},
			preventDefault: function(t) {
				return t.preventDefault ? t.preventDefault() : t.returnValue = !1, this
			},
			stop: function(t) {
				return o.DomEvent.preventDefault(t).stopPropagation(t)
			},
			getMousePosition: function(t, e) {
				if (!e) return new o.Point(t.clientX, t.clientY);
				var i = e.getBoundingClientRect();
				return new o.Point(t.clientX - i.left - e.clientLeft, t.clientY - i.top - e.clientTop)
			},
			getWheelDelta: function(t) {
				var e = 0;
				return t.wheelDelta && (e = t.wheelDelta / 120), t.detail && (e = -t.detail / 3), e
			},
			_skipEvents: {},
			_fakeStop: function(t) {
				o.DomEvent._skipEvents[t.type] = !0
			},
			_skipped: function(t) {
				var e = this._skipEvents[t.type];
				return this._skipEvents[t.type] = !1, e
			},
			_checkMouse: function(t, e) {
				var i = e.relatedTarget;
				if (!i) return !0;
				try {
					for (; i && i !== t;) i = i.parentNode
				} catch (n) {
					return !1
				}
				return i !== t
			},
			_getEvent: function() {
				var e = t.event;
				if (!e) for (var i = arguments.callee.caller; i && (e = i.arguments[0], !e || t.Event !== e.constructor);) i = i.caller;
				return e
			},
			_filterClick: function(t, e) {
				var i = t.timeStamp || t.originalEvent.timeStamp,
					n = o.DomEvent._lastClick && i - o.DomEvent._lastClick;
				return n && n > 100 && 500 > n || t.target._simulatedClick && !t._simulated ? void o.DomEvent.stop(t) : (o.DomEvent._lastClick = i, e(t))
			}
		}, o.DomEvent.on = o.DomEvent.addListener, o.DomEvent.off = o.DomEvent.removeListener, o.Draggable = o.Class.extend({
			includes: o.Mixin.Events,
			statics: {
				START: o.Browser.touch ? ["touchstart", "mousedown"] : ["mousedown"],
				END: {
					mousedown: "mouseup",
					touchstart: "touchend",
					pointerdown: "touchend",
					MSPointerDown: "touchend"
				},
				MOVE: {
					mousedown: "mousemove",
					touchstart: "touchmove",
					pointerdown: "touchmove",
					MSPointerDown: "touchmove"
				}
			},
			initialize: function(t, e) {
				this._element = t, this._dragStartTarget = e || t
			},
			enable: function() {
				if (!this._enabled) {
					for (var t = o.Draggable.START.length - 1; t >= 0; t--) o.DomEvent.on(this._dragStartTarget, o.Draggable.START[t], this._onDown, this);
					this._enabled = !0
				}
			},
			disable: function() {
				if (this._enabled) {
					for (var t = o.Draggable.START.length - 1; t >= 0; t--) o.DomEvent.off(this._dragStartTarget, o.Draggable.START[t], this._onDown, this);
					this._enabled = !1, this._moved = !1
				}
			},
			_onDown: function(t) {
				if (this._moved = !1, !t.shiftKey && (1 === t.which || 1 === t.button || t.touches) && (o.DomEvent.stopPropagation(t), !o.Draggable._disabled && (o.DomUtil.disableImageDrag(), o.DomUtil.disableTextSelection(), !this._moving))) {
					var i = t.touches ? t.touches[0] : t;
					this._startPoint = new o.Point(i.clientX, i.clientY), this._startPos = this._newPos = o.DomUtil.getPosition(this._element), o.DomEvent.on(e, o.Draggable.MOVE[t.type], this._onMove, this).on(e, o.Draggable.END[t.type], this._onUp, this)
				}
			},
			_onMove: function(t) {
				if (t.touches && t.touches.length > 1) return void(this._moved = !0);
				var i = t.touches && 1 === t.touches.length ? t.touches[0] : t,
					n = new o.Point(i.clientX, i.clientY),
					r = n.subtract(this._startPoint);
				(r.x || r.y) && (o.Browser.touch && Math.abs(r.x) + Math.abs(r.y) < 3 || (o.DomEvent.preventDefault(t), this._moved || (this.fire("dragstart"), this._moved = !0, this._startPos = o.DomUtil.getPosition(this._element).subtract(r), o.DomUtil.addClass(e.body, "leaflet-dragging"), this._lastTarget = t.target || t.srcElement, o.DomUtil.addClass(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(r), this._moving = !0, o.Util.cancelAnimFrame(this._animRequest), this._animRequest = o.Util.requestAnimFrame(this._updatePosition, this, !0, this._dragStartTarget)))
			},
			_updatePosition: function() {
				this.fire("predrag"), o.DomUtil.setPosition(this._element, this._newPos), this.fire("drag")
			},
			_onUp: function() {
				o.DomUtil.removeClass(e.body, "leaflet-dragging"), this._lastTarget && (o.DomUtil.removeClass(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null);
				for (var t in o.Draggable.MOVE) o.DomEvent.off(e, o.Draggable.MOVE[t], this._onMove).off(e, o.Draggable.END[t], this._onUp);
				o.DomUtil.enableImageDrag(), o.DomUtil.enableTextSelection(), this._moved && this._moving && (o.Util.cancelAnimFrame(this._animRequest), this.fire("dragend", {
					distance: this._newPos.distanceTo(this._startPos)
				})), this._moving = !1
			}
		}), o.Handler = o.Class.extend({
			initialize: function(t) {
				this._map = t
			},
			enable: function() {
				this._enabled || (this._enabled = !0, this.addHooks())
			},
			disable: function() {
				this._enabled && (this._enabled = !1, this.removeHooks())
			},
			enabled: function() {
				return !!this._enabled
			}
		}), o.Map.mergeOptions({
			dragging: !0,
			inertia: !o.Browser.android23,
			inertiaDeceleration: 3400,
			inertiaMaxSpeed: 1 / 0,
			inertiaThreshold: o.Browser.touch ? 32 : 18,
			easeLinearity: .25,
			worldCopyJump: !1
		}), o.Map.Drag = o.Handler.extend({
			addHooks: function() {
				if (!this._draggable) {
					var t = this._map;
					this._draggable = new o.Draggable(t._mapPane, t._container), this._draggable.on({
						dragstart: this._onDragStart,
						drag: this._onDrag,
						dragend: this._onDragEnd
					}, this), t.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDrag, this), t.on("viewreset", this._onViewReset, this), t.whenReady(this._onViewReset, this))
				}
				this._draggable.enable()
			},
			removeHooks: function() {
				this._draggable.disable()
			},
			moved: function() {
				return this._draggable && this._draggable._moved
			},
			_onDragStart: function() {
				var t = this._map;
				t._panAnim && t._panAnim.stop(), t.fire("movestart").fire("dragstart"), t.options.inertia && (this._positions = [], this._times = [])
			},
			_onDrag: function() {
				if (this._map.options.inertia) {
					var t = this._lastTime = +new Date,
						e = this._lastPos = this._draggable._newPos;
					this._positions.push(e), this._times.push(t), t - this._times[0] > 200 && (this._positions.shift(), this._times.shift())
				}
				this._map.fire("move").fire("drag")
			},
			_onViewReset: function() {
				var t = this._map.getSize()._divideBy(2),
					e = this._map.latLngToLayerPoint([0, 0]);
				this._initialWorldOffset = e.subtract(t).x, this._worldWidth = this._map.project([0, 180]).x
			},
			_onPreDrag: function() {
				var t = this._worldWidth,
					e = Math.round(t / 2),
					i = this._initialWorldOffset,
					n = this._draggable._newPos.x,
					r = (n - e + i) % t + e - i,
					o = (n + e + i) % t - e - i,
					a = Math.abs(r + i) < Math.abs(o + i) ? r : o;
				this._draggable._newPos.x = a
			},
			_onDragEnd: function(t) {
				var e = this._map,
					i = e.options,
					n = +new Date - this._lastTime,
					r = !i.inertia || n > i.inertiaThreshold || !this._positions[0];
				if (e.fire("dragend", t), r) e.fire("moveend");
				else {
					var a = this._lastPos.subtract(this._positions[0]),
						s = (this._lastTime + n - this._times[0]) / 1e3,
						l = i.easeLinearity,
						u = a.multiplyBy(l / s),
						c = u.distanceTo([0, 0]),
						h = Math.min(i.inertiaMaxSpeed, c),
						d = u.multiplyBy(h / c),
						p = h / (i.inertiaDeceleration * l),
						f = d.multiplyBy(-p / 2).round();
					f.x && f.y ? (f = e._limitOffset(f, e.options.maxBounds), o.Util.requestAnimFrame(function() {
						e.panBy(f, {
							duration: p,
							easeLinearity: l,
							noMoveStart: !0
						})
					})) : e.fire("moveend")
				}
			}
		}), o.Map.addInitHook("addHandler", "dragging", o.Map.Drag), o.Map.mergeOptions({
			doubleClickZoom: !0
		}), o.Map.DoubleClickZoom = o.Handler.extend({
			addHooks: function() {
				this._map.on("dblclick", this._onDoubleClick, this)
			},
			removeHooks: function() {
				this._map.off("dblclick", this._onDoubleClick, this)
			},
			_onDoubleClick: function(t) {
				var e = this._map,
					i = e.getZoom() + (t.originalEvent.shiftKey ? -1 : 1);
				"center" === e.options.doubleClickZoom ? e.setZoom(i) : e.setZoomAround(t.containerPoint, i)
			}
		}), o.Map.addInitHook("addHandler", "doubleClickZoom", o.Map.DoubleClickZoom), o.Map.mergeOptions({
			scrollWheelZoom: !0
		}), o.Map.ScrollWheelZoom = o.Handler.extend({
			addHooks: function() {
				o.DomEvent.on(this._map._container, "mousewheel", this._onWheelScroll, this), o.DomEvent.on(this._map._container, "MozMousePixelScroll", o.DomEvent.preventDefault), this._delta = 0
			},
			removeHooks: function() {
				o.DomEvent.off(this._map._container, "mousewheel", this._onWheelScroll), o.DomEvent.off(this._map._container, "MozMousePixelScroll", o.DomEvent.preventDefault)
			},
			_onWheelScroll: function(t) {
				var e = o.DomEvent.getWheelDelta(t);
				this._delta += e, this._lastMousePos = this._map.mouseEventToContainerPoint(t), this._startTime || (this._startTime = +new Date);
				var i = Math.max(40 - (+new Date - this._startTime), 0);
				clearTimeout(this._timer), this._timer = setTimeout(o.bind(this._performZoom, this), i), o.DomEvent.preventDefault(t), o.DomEvent.stopPropagation(t)
			},
			_performZoom: function() {
				var t = this._map,
					e = this._delta,
					i = t.getZoom();
				e = e > 0 ? Math.ceil(e) : Math.floor(e), e = Math.max(Math.min(e, 4), -4), e = t._limitZoom(i + e) - i, this._delta = 0, this._startTime = null, e && ("center" === t.options.scrollWheelZoom ? t.setZoom(i + e) : t.setZoomAround(this._lastMousePos, i + e))
			}
		}), o.Map.addInitHook("addHandler", "scrollWheelZoom", o.Map.ScrollWheelZoom), o.extend(o.DomEvent, {
			_touchstart: o.Browser.msPointer ? "MSPointerDown" : o.Browser.pointer ? "pointerdown" : "touchstart",
			_touchend: o.Browser.msPointer ? "MSPointerUp" : o.Browser.pointer ? "pointerup" : "touchend",
			addDoubleTapListener: function(t, i, n) {
				function r(t) {
					var e;
					if (o.Browser.pointer ? (f.push(t.pointerId), e = f.length) : e = t.touches.length, !(e > 1)) {
						var i = Date.now(),
							n = i - (s || i);
						l = t.touches ? t.touches[0] : t, u = n > 0 && c >= n, s = i
					}
				}
				function a(t) {
					if (o.Browser.pointer) {
						var e = f.indexOf(t.pointerId);
						if (-1 === e) return;
						f.splice(e, 1)
					}
					if (u) {
						if (o.Browser.pointer) {
							var n, r = {};
							for (var a in l) n = l[a], "function" == typeof n ? r[a] = n.bind(l) : r[a] = n;
							l = r
						}
						l.type = "dblclick", i(l), s = null
					}
				}
				var s, l, u = !1,
					c = 250,
					h = "_leaflet_",
					d = this._touchstart,
					p = this._touchend,
					f = [];
				t[h + d + n] = r, t[h + p + n] = a;
				var m = o.Browser.pointer ? e.documentElement : t;
				return t.addEventListener(d, r, !1), m.addEventListener(p, a, !1), o.Browser.pointer && m.addEventListener(o.DomEvent.POINTER_CANCEL, a, !1), this
			},
			removeDoubleTapListener: function(t, i) {
				var n = "_leaflet_";
				return t.removeEventListener(this._touchstart, t[n + this._touchstart + i], !1), (o.Browser.pointer ? e.documentElement : t).removeEventListener(this._touchend, t[n + this._touchend + i], !1), o.Browser.pointer && e.documentElement.removeEventListener(o.DomEvent.POINTER_CANCEL, t[n + this._touchend + i], !1), this
			}
		}), o.extend(o.DomEvent, {
			POINTER_DOWN: o.Browser.msPointer ? "MSPointerDown" : "pointerdown",
			POINTER_MOVE: o.Browser.msPointer ? "MSPointerMove" : "pointermove",
			POINTER_UP: o.Browser.msPointer ? "MSPointerUp" : "pointerup",
			POINTER_CANCEL: o.Browser.msPointer ? "MSPointerCancel" : "pointercancel",
			_pointers: [],
			_pointerDocumentListener: !1,
			addPointerListener: function(t, e, i, n) {
				switch (e) {
				case "touchstart":
					return this.addPointerListenerStart(t, e, i, n);
				case "touchend":
					return this.addPointerListenerEnd(t, e, i, n);
				case "touchmove":
					return this.addPointerListenerMove(t, e, i, n);
				default:
					throw "Unknown touch event type"
				}
			},
			addPointerListenerStart: function(t, i, n, r) {
				var a = "_leaflet_",
					s = this._pointers,
					l = function(t) {
						"mouse" !== t.pointerType && t.pointerType !== t.MSPOINTER_TYPE_MOUSE && o.DomEvent.preventDefault(t);
						for (var e = !1, i = 0; i < s.length; i++) if (s[i].pointerId === t.pointerId) {
							e = !0;
							break
						}
						e || s.push(t), t.touches = s.slice(), t.changedTouches = [t], n(t)
					};
				if (t[a + "touchstart" + r] = l, t.addEventListener(this.POINTER_DOWN, l, !1), !this._pointerDocumentListener) {
					var u = function(t) {
							for (var e = 0; e < s.length; e++) if (s[e].pointerId === t.pointerId) {
								s.splice(e, 1);
								break
							}
						};
					e.documentElement.addEventListener(this.POINTER_UP, u, !1), e.documentElement.addEventListener(this.POINTER_CANCEL, u, !1), this._pointerDocumentListener = !0
				}
				return this
			},
			addPointerListenerMove: function(t, e, i, n) {
				function r(t) {
					if (t.pointerType !== t.MSPOINTER_TYPE_MOUSE && "mouse" !== t.pointerType || 0 !== t.buttons) {
						for (var e = 0; e < a.length; e++) if (a[e].pointerId === t.pointerId) {
							a[e] = t;
							break
						}
						t.touches = a.slice(), t.changedTouches = [t], i(t)
					}
				}
				var o = "_leaflet_",
					a = this._pointers;
				return t[o + "touchmove" + n] = r, t.addEventListener(this.POINTER_MOVE, r, !1), this
			},
			addPointerListenerEnd: function(t, e, i, n) {
				var r = "_leaflet_",
					o = this._pointers,
					a = function(t) {
						for (var e = 0; e < o.length; e++) if (o[e].pointerId === t.pointerId) {
							o.splice(e, 1);
							break
						}
						t.touches = o.slice(), t.changedTouches = [t], i(t)
					};
				return t[r + "touchend" + n] = a, t.addEventListener(this.POINTER_UP, a, !1), t.addEventListener(this.POINTER_CANCEL, a, !1), this
			},
			removePointerListener: function(t, e, i) {
				var n = "_leaflet_",
					r = t[n + e + i];
				switch (e) {
				case "touchstart":
					t.removeEventListener(this.POINTER_DOWN, r, !1);
					break;
				case "touchmove":
					t.removeEventListener(this.POINTER_MOVE, r, !1);
					break;
				case "touchend":
					t.removeEventListener(this.POINTER_UP, r, !1), t.removeEventListener(this.POINTER_CANCEL, r, !1)
				}
				return this
			}
		}), o.Map.mergeOptions({
			touchZoom: o.Browser.touch && !o.Browser.android23,
			bounceAtZoomLimits: !0
		}), o.Map.TouchZoom = o.Handler.extend({
			addHooks: function() {
				o.DomEvent.on(this._map._container, "touchstart", this._onTouchStart, this)
			},
			removeHooks: function() {
				o.DomEvent.off(this._map._container, "touchstart", this._onTouchStart, this)
			},
			_onTouchStart: function(t) {
				var i = this._map;
				if (t.touches && 2 === t.touches.length && !i._animatingZoom && !this._zooming) {
					var n = i.mouseEventToLayerPoint(t.touches[0]),
						r = i.mouseEventToLayerPoint(t.touches[1]),
						a = i._getCenterLayerPoint();
					this._startCenter = n.add(r)._divideBy(2), this._startDist = n.distanceTo(r), this._moved = !1, this._zooming = !0, this._centerOffset = a.subtract(this._startCenter), i._panAnim && i._panAnim.stop(), o.DomEvent.on(e, "touchmove", this._onTouchMove, this).on(e, "touchend", this._onTouchEnd, this), o.DomEvent.preventDefault(t)
				}
			},
			_onTouchMove: function(t) {
				var e = this._map;
				if (t.touches && 2 === t.touches.length && this._zooming) {
					var i = e.mouseEventToLayerPoint(t.touches[0]),
						n = e.mouseEventToLayerPoint(t.touches[1]);
					this._scale = i.distanceTo(n) / this._startDist, this._delta = i._add(n)._divideBy(2)._subtract(this._startCenter), 1 !== this._scale && (e.options.bounceAtZoomLimits || !(e.getZoom() === e.getMinZoom() && this._scale < 1 || e.getZoom() === e.getMaxZoom() && this._scale > 1)) && (this._moved || (o.DomUtil.addClass(e._mapPane, "leaflet-touching"), e.fire("movestart").fire("zoomstart"), this._moved = !0), o.Util.cancelAnimFrame(this._animRequest), this._animRequest = o.Util.requestAnimFrame(this._updateOnMove, this, !0, this._map._container), o.DomEvent.preventDefault(t))
				}
			},
			_updateOnMove: function() {
				var t = this._map,
					e = this._getScaleOrigin(),
					i = t.layerPointToLatLng(e),
					n = t.getScaleZoom(this._scale);
				t._animateZoom(i, n, this._startCenter, this._scale, this._delta, !1, !0)
			},
			_onTouchEnd: function() {
				if (!this._moved || !this._zooming) return void(this._zooming = !1);
				var t = this._map;
				this._zooming = !1, o.DomUtil.removeClass(t._mapPane, "leaflet-touching"), o.Util.cancelAnimFrame(this._animRequest), o.DomEvent.off(e, "touchmove", this._onTouchMove).off(e, "touchend", this._onTouchEnd);
				var i = this._getScaleOrigin(),
					n = t.layerPointToLatLng(i),
					r = t.getZoom(),
					a = t.getScaleZoom(this._scale) - r,
					s = a > 0 ? Math.ceil(a) : Math.floor(a),
					l = t._limitZoom(r + s),
					u = t.getZoomScale(l) / this._scale;
				t._animateZoom(n, l, i, u)
			},
			_getScaleOrigin: function() {
				var t = this._centerOffset.subtract(this._delta).divideBy(this._scale);
				return this._startCenter.add(t)
			}
		}), o.Map.addInitHook("addHandler", "touchZoom", o.Map.TouchZoom), o.Map.mergeOptions({
			tap: !0,
			tapTolerance: 15
		}), o.Map.Tap = o.Handler.extend({
			addHooks: function() {
				o.DomEvent.on(this._map._container, "touchstart", this._onDown, this)
			},
			removeHooks: function() {
				o.DomEvent.off(this._map._container, "touchstart", this._onDown, this)
			},
			_onDown: function(t) {
				if (t.touches) {
					if (o.DomEvent.preventDefault(t), this._fireClick = !0, t.touches.length > 1) return this._fireClick = !1, void clearTimeout(this._holdTimeout);
					var i = t.touches[0],
						n = i.target;
					this._startPos = this._newPos = new o.Point(i.clientX, i.clientY), n.tagName && "a" === n.tagName.toLowerCase() && o.DomUtil.addClass(n, "leaflet-active"), this._holdTimeout = setTimeout(o.bind(function() {
						this._isTapValid() && (this._fireClick = !1, this._onUp(), this._simulateEvent("contextmenu", i))
					}, this), 1e3), o.DomEvent.on(e, "touchmove", this._onMove, this).on(e, "touchend", this._onUp, this)
				}
			},
			_onUp: function(t) {
				if (clearTimeout(this._holdTimeout), o.DomEvent.off(e, "touchmove", this._onMove, this).off(e, "touchend", this._onUp, this), this._fireClick && t && t.changedTouches) {
					var i = t.changedTouches[0],
						n = i.target;
					n && n.tagName && "a" === n.tagName.toLowerCase() && o.DomUtil.removeClass(n, "leaflet-active"), this._isTapValid() && this._simulateEvent("click", i)
				}
			},
			_isTapValid: function() {
				return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance
			},
			_onMove: function(t) {
				var e = t.touches[0];
				this._newPos = new o.Point(e.clientX, e.clientY)
			},
			_simulateEvent: function(i, n) {
				var r = e.createEvent("MouseEvents");
				r._simulated = !0, n.target._simulatedClick = !0, r.initMouseEvent(i, !0, !0, t, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null), n.target.dispatchEvent(r)
			}
		}), o.Browser.touch && !o.Browser.pointer && o.Map.addInitHook("addHandler", "tap", o.Map.Tap), o.Map.mergeOptions({
			boxZoom: !0
		}), o.Map.BoxZoom = o.Handler.extend({
			initialize: function(t) {
				this._map = t, this._container = t._container, this._pane = t._panes.overlayPane, this._moved = !1
			},
			addHooks: function() {
				o.DomEvent.on(this._container, "mousedown", this._onMouseDown, this)
			},
			removeHooks: function() {
				o.DomEvent.off(this._container, "mousedown", this._onMouseDown), this._moved = !1
			},
			moved: function() {
				return this._moved
			},
			_onMouseDown: function(t) {
				return this._moved = !1, !(!t.shiftKey || 1 !== t.which && 1 !== t.button) && (o.DomUtil.disableTextSelection(), o.DomUtil.disableImageDrag(), this._startLayerPoint = this._map.mouseEventToLayerPoint(t), void o.DomEvent.on(e, "mousemove", this._onMouseMove, this).on(e, "mouseup", this._onMouseUp, this).on(e, "keydown", this._onKeyDown, this))
			},
			_onMouseMove: function(t) {
				this._moved || (this._box = o.DomUtil.create("div", "leaflet-zoom-box", this._pane), o.DomUtil.setPosition(this._box, this._startLayerPoint), this._container.style.cursor = "crosshair", this._map.fire("boxzoomstart"));
				var e = this._startLayerPoint,
					i = this._box,
					n = this._map.mouseEventToLayerPoint(t),
					r = n.subtract(e),
					a = new o.Point(Math.min(n.x, e.x), Math.min(n.y, e.y));
				o.DomUtil.setPosition(i, a), this._moved = !0, i.style.width = Math.max(0, Math.abs(r.x) - 4) + "px", i.style.height = Math.max(0, Math.abs(r.y) - 4) + "px"
			},
			_finish: function() {
				this._moved && (this._pane.removeChild(this._box), this._container.style.cursor = ""), o.DomUtil.enableTextSelection(), o.DomUtil.enableImageDrag(), o.DomEvent.off(e, "mousemove", this._onMouseMove).off(e, "mouseup", this._onMouseUp).off(e, "keydown", this._onKeyDown)
			},
			_onMouseUp: function(t) {
				this._finish();
				var e = this._map,
					i = e.mouseEventToLayerPoint(t);
				if (!this._startLayerPoint.equals(i)) {
					var n = new o.LatLngBounds(e.layerPointToLatLng(this._startLayerPoint), e.layerPointToLatLng(i));
					e.fitBounds(n), e.fire("boxzoomend", {
						boxZoomBounds: n
					})
				}
			},
			_onKeyDown: function(t) {
				27 === t.keyCode && this._finish()
			}
		}), o.Map.addInitHook("addHandler", "boxZoom", o.Map.BoxZoom), o.Map.mergeOptions({
			keyboard: !0,
			keyboardPanOffset: 80,
			keyboardZoomOffset: 1
		}), o.Map.Keyboard = o.Handler.extend({
			keyCodes: {
				left: [37],
				right: [39],
				down: [40],
				up: [38],
				zoomIn: [187, 107, 61, 171],
				zoomOut: [189, 109, 173]
			},
			initialize: function(t) {
				this._map = t, this._setPanOffset(t.options.keyboardPanOffset), this._setZoomOffset(t.options.keyboardZoomOffset)
			},
			addHooks: function() {
				var t = this._map._container; - 1 === t.tabIndex && (t.tabIndex = "0"), o.DomEvent.on(t, "focus", this._onFocus, this).on(t, "blur", this._onBlur, this).on(t, "mousedown", this._onMouseDown, this), this._map.on("focus", this._addHooks, this).on("blur", this._removeHooks, this)
			},
			removeHooks: function() {
				this._removeHooks();
				var t = this._map._container;
				o.DomEvent.off(t, "focus", this._onFocus, this).off(t, "blur", this._onBlur, this).off(t, "mousedown", this._onMouseDown, this), this._map.off("focus", this._addHooks, this).off("blur", this._removeHooks, this)
			},
			_onMouseDown: function() {
				if (!this._focused) {
					var i = e.body,
						n = e.documentElement,
						r = i.scrollTop || n.scrollTop,
						o = i.scrollLeft || n.scrollLeft;
					this._map._container.focus(), t.scrollTo(o, r)
				}
			},
			_onFocus: function() {
				this._focused = !0, this._map.fire("focus")
			},
			_onBlur: function() {
				this._focused = !1, this._map.fire("blur")
			},
			_setPanOffset: function(t) {
				var e, i, n = this._panKeys = {},
					r = this.keyCodes;
				for (e = 0, i = r.left.length; i > e; e++) n[r.left[e]] = [-1 * t, 0];
				for (e = 0, i = r.right.length; i > e; e++) n[r.right[e]] = [t, 0];
				for (e = 0, i = r.down.length; i > e; e++) n[r.down[e]] = [0, t];
				for (e = 0, i = r.up.length; i > e; e++) n[r.up[e]] = [0, -1 * t]
			},
			_setZoomOffset: function(t) {
				var e, i, n = this._zoomKeys = {},
					r = this.keyCodes;
				for (e = 0, i = r.zoomIn.length; i > e; e++) n[r.zoomIn[e]] = t;
				for (e = 0, i = r.zoomOut.length; i > e; e++) n[r.zoomOut[e]] = -t
			},
			_addHooks: function() {
				o.DomEvent.on(e, "keydown", this._onKeyDown, this)
			},
			_removeHooks: function() {
				o.DomEvent.off(e, "keydown", this._onKeyDown, this)
			},
			_onKeyDown: function(t) {
				var e = t.keyCode,
					i = this._map;
				if (e in this._panKeys) {
					if (i._panAnim && i._panAnim._inProgress) return;
					i.panBy(this._panKeys[e]), i.options.maxBounds && i.panInsideBounds(i.options.maxBounds)
				} else {
					if (!(e in this._zoomKeys)) return;
					i.setZoom(i.getZoom() + this._zoomKeys[e])
				}
				o.DomEvent.stop(t)
			}
		}), o.Map.addInitHook("addHandler", "keyboard", o.Map.Keyboard), o.Handler.MarkerDrag = o.Handler.extend({
			initialize: function(t) {
				this._marker = t
			},
			addHooks: function() {
				var t = this._marker._icon;
				this._draggable || (this._draggable = new o.Draggable(t, t)), this._draggable.on("dragstart", this._onDragStart, this).on("drag", this._onDrag, this).on("dragend", this._onDragEnd, this), this._draggable.enable(), o.DomUtil.addClass(this._marker._icon, "leaflet-marker-draggable")
			},
			removeHooks: function() {
				this._draggable.off("dragstart", this._onDragStart, this).off("drag", this._onDrag, this).off("dragend", this._onDragEnd, this), this._draggable.disable(), o.DomUtil.removeClass(this._marker._icon, "leaflet-marker-draggable")
			},
			moved: function() {
				return this._draggable && this._draggable._moved
			},
			_onDragStart: function() {
				this._marker.closePopup().fire("movestart").fire("dragstart")
			},
			_onDrag: function() {
				var t = this._marker,
					e = t._shadow,
					i = o.DomUtil.getPosition(t._icon),
					n = t._map.layerPointToLatLng(i);
				e && o.DomUtil.setPosition(e, i), t._latlng = n, t.fire("move", {
					latlng: n
				}).fire("drag")
			},
			_onDragEnd: function(t) {
				this._marker.fire("moveend").fire("dragend", t)
			}
		}), o.Control = o.Class.extend({
			options: {
				position: "topright"
			},
			initialize: function(t) {
				o.setOptions(this, t)
			},
			getPosition: function() {
				return this.options.position
			},
			setPosition: function(t) {
				var e = this._map;
				return e && e.removeControl(this), this.options.position = t, e && e.addControl(this), this
			},
			getContainer: function() {
				return this._container
			},
			addTo: function(t) {
				this._map = t;
				var e = this._container = this.onAdd(t),
					i = this.getPosition(),
					n = t._controlCorners[i];
				return o.DomUtil.addClass(e, "leaflet-control"), -1 !== i.indexOf("bottom") ? n.insertBefore(e, n.firstChild) : n.appendChild(e), this
			},
			removeFrom: function(t) {
				var e = this.getPosition(),
					i = t._controlCorners[e];
				return i.removeChild(this._container), this._map = null, this.onRemove && this.onRemove(t), this
			},
			_refocusOnMap: function() {
				this._map && this._map.getContainer().focus()
			}
		}), o.control = function(t) {
			return new o.Control(t)
		}, o.Map.include({
			addControl: function(t) {
				return t.addTo(this), this
			},
			removeControl: function(t) {
				return t.removeFrom(this), this
			},
			_initControlPos: function() {
				function t(t, r) {
					var a = i + t + " " + i + r;
					e[t + r] = o.DomUtil.create("div", a, n)
				}
				var e = this._controlCorners = {},
					i = "leaflet-",
					n = this._controlContainer = o.DomUtil.create("div", i + "control-container", this._container);
				t("top", "left"), t("top", "right"), t("bottom", "left"), t("bottom", "right")
			},
			_clearControlPos: function() {
				this._container.removeChild(this._controlContainer)
			}
		}), o.Control.Zoom = o.Control.extend({
			options: {
				position: "topleft",
				zoomInText: "+",
				zoomInTitle: "Zoom in",
				zoomOutText: "-",
				zoomOutTitle: "Zoom out"
			},
			onAdd: function(t) {
				var e = "leaflet-control-zoom",
					i = o.DomUtil.create("div", e + " leaflet-bar");
				return this._map = t, this._zoomInButton = this._createButton(this.options.zoomInText, this.options.zoomInTitle, e + "-in", i, this._zoomIn, this), this._zoomOutButton = this._createButton(this.options.zoomOutText, this.options.zoomOutTitle, e + "-out", i, this._zoomOut, this), this._updateDisabled(), t.on("zoomend zoomlevelschange", this._updateDisabled, this), i
			},
			onRemove: function(t) {
				t.off("zoomend zoomlevelschange", this._updateDisabled, this)
			},
			_zoomIn: function(t) {
				this._map.zoomIn(t.shiftKey ? 3 : 1)
			},
			_zoomOut: function(t) {
				this._map.zoomOut(t.shiftKey ? 3 : 1)
			},
			_createButton: function(t, e, i, n, r, a) {
				var s = o.DomUtil.create("a", i, n);
				s.innerHTML = t, s.href = "#", s.title = e;
				var l = o.DomEvent.stopPropagation;
				return o.DomEvent.on(s, "click", l).on(s, "mousedown", l).on(s, "dblclick", l).on(s, "click", o.DomEvent.preventDefault).on(s, "click", r, a).on(s, "click", this._refocusOnMap, a), s
			},
			_updateDisabled: function() {
				var t = this._map,
					e = "leaflet-disabled";
				o.DomUtil.removeClass(this._zoomInButton, e), o.DomUtil.removeClass(this._zoomOutButton, e), t._zoom === t.getMinZoom() && o.DomUtil.addClass(this._zoomOutButton, e), t._zoom === t.getMaxZoom() && o.DomUtil.addClass(this._zoomInButton, e)
			}
		}), o.Map.mergeOptions({
			zoomControl: !0
		}), o.Map.addInitHook(function() {
			this.options.zoomControl && (this.zoomControl = new o.Control.Zoom, this.addControl(this.zoomControl))
		}), o.control.zoom = function(t) {
			return new o.Control.Zoom(t)
		}, o.Control.Attribution = o.Control.extend({
			options: {
				position: "bottomright",
				prefix: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
			},
			initialize: function(t) {
				o.setOptions(this, t), this._attributions = {}
			},
			onAdd: function(t) {
				this._container = o.DomUtil.create("div", "leaflet-control-attribution"), o.DomEvent.disableClickPropagation(this._container);
				for (var e in t._layers) t._layers[e].getAttribution && this.addAttribution(t._layers[e].getAttribution());
				return t.on("layeradd", this._onLayerAdd, this).on("layerremove", this._onLayerRemove, this), this._update(), this._container
			},
			onRemove: function(t) {
				t.off("layeradd", this._onLayerAdd).off("layerremove", this._onLayerRemove)
			},
			setPrefix: function(t) {
				return this.options.prefix = t, this._update(), this
			},
			addAttribution: function(t) {
				return t ? (this._attributions[t] || (this._attributions[t] = 0), this._attributions[t]++, this._update(), this) : void 0
			},
			removeAttribution: function(t) {
				return t ? (this._attributions[t] && (this._attributions[t]--, this._update()), this) : void 0
			},
			_update: function() {
				if (this._map) {
					var t = [];
					for (var e in this._attributions) this._attributions[e] && t.push(e);
					var i = [];
					this.options.prefix && i.push(this.options.prefix), t.length && i.push(t.join(", ")), this._container.innerHTML = i.join(" | ")
				}
			},
			_onLayerAdd: function(t) {
				t.layer.getAttribution && this.addAttribution(t.layer.getAttribution())
			},
			_onLayerRemove: function(t) {
				t.layer.getAttribution && this.removeAttribution(t.layer.getAttribution())
			}
		}), o.Map.mergeOptions({
			attributionControl: !0
		}), o.Map.addInitHook(function() {
			this.options.attributionControl && (this.attributionControl = (new o.Control.Attribution).addTo(this))
		}), o.control.attribution = function(t) {
			return new o.Control.Attribution(t)
		}, o.Control.Scale = o.Control.extend({
			options: {
				position: "bottomleft",
				maxWidth: 100,
				metric: !0,
				imperial: !0,
				updateWhenIdle: !1
			},
			onAdd: function(t) {
				this._map = t;
				var e = "leaflet-control-scale",
					i = o.DomUtil.create("div", e),
					n = this.options;
				return this._addScales(n, e, i), t.on(n.updateWhenIdle ? "moveend" : "move", this._update, this), t.whenReady(this._update, this), i
			},
			onRemove: function(t) {
				t.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this)
			},
			_addScales: function(t, e, i) {
				t.metric && (this._mScale = o.DomUtil.create("div", e + "-line", i)), t.imperial && (this._iScale = o.DomUtil.create("div", e + "-line", i))
			},
			_update: function() {
				var t = this._map.getBounds(),
					e = t.getCenter().lat,
					i = 6378137 * Math.PI * Math.cos(e * Math.PI / 180),
					n = i * (t.getNorthEast().lng - t.getSouthWest().lng) / 180,
					r = this._map.getSize(),
					o = this.options,
					a = 0;
				r.x > 0 && (a = n * (o.maxWidth / r.x)), this._updateScales(o, a)
			},
			_updateScales: function(t, e) {
				t.metric && e && this._updateMetric(e), t.imperial && e && this._updateImperial(e)
			},
			_updateMetric: function(t) {
				var e = this._getRoundNum(t);
				this._mScale.style.width = this._getScaleWidth(e / t) + "px", this._mScale.innerHTML = 1e3 > e ? e + " m" : e / 1e3 + " km"
			},
			_updateImperial: function(t) {
				var e, i, n, r = 3.2808399 * t,
					o = this._iScale;
				r > 5280 ? (e = r / 5280, i = this._getRoundNum(e), o.style.width = this._getScaleWidth(i / e) + "px", o.innerHTML = i + " mi") : (n = this._getRoundNum(r), o.style.width = this._getScaleWidth(n / r) + "px", o.innerHTML = n + " ft")
			},
			_getScaleWidth: function(t) {
				return Math.round(this.options.maxWidth * t) - 10
			},
			_getRoundNum: function(t) {
				var e = Math.pow(10, (Math.floor(t) + "").length - 1),
					i = t / e;
				return i = i >= 10 ? 10 : i >= 5 ? 5 : i >= 3 ? 3 : i >= 2 ? 2 : 1, e * i
			}
		}), o.control.scale = function(t) {
			return new o.Control.Scale(t)
		}, o.Control.Layers = o.Control.extend({
			options: {
				collapsed: !0,
				position: "topright",
				autoZIndex: !0
			},
			initialize: function(t, e, i) {
				o.setOptions(this, i), this._layers = {}, this._lastZIndex = 0, this._handlingClick = !1;
				for (var n in t) this._addLayer(t[n], n);
				for (n in e) this._addLayer(e[n], n, !0)
			},
			onAdd: function(t) {
				return this._initLayout(), this._update(), t.on("layeradd", this._onLayerChange, this).on("layerremove", this._onLayerChange, this), this._container
			},
			onRemove: function(t) {
				t.off("layeradd", this._onLayerChange, this).off("layerremove", this._onLayerChange, this)
			},
			addBaseLayer: function(t, e) {
				return this._addLayer(t, e), this._update(), this
			},
			addOverlay: function(t, e) {
				return this._addLayer(t, e, !0), this._update(), this
			},
			removeLayer: function(t) {
				var e = o.stamp(t);
				return delete this._layers[e], this._update(), this
			},
			_initLayout: function() {
				var t = "leaflet-control-layers",
					e = this._container = o.DomUtil.create("div", t);
				e.setAttribute("aria-haspopup", !0), o.Browser.touch ? o.DomEvent.on(e, "click", o.DomEvent.stopPropagation) : o.DomEvent.disableClickPropagation(e).disableScrollPropagation(e);
				var i = this._form = o.DomUtil.create("form", t + "-list");
				if (this.options.collapsed) {
					o.Browser.android || o.DomEvent.on(e, "mouseover", this._expand, this).on(e, "mouseout", this._collapse, this);
					var n = this._layersLink = o.DomUtil.create("a", t + "-toggle", e);
					n.href = "#", n.title = "Layers", o.Browser.touch ? o.DomEvent.on(n, "click", o.DomEvent.stop).on(n, "click", this._expand, this) : o.DomEvent.on(n, "focus", this._expand, this), o.DomEvent.on(i, "click", function() {
						setTimeout(o.bind(this._onInputClick, this), 0)
					}, this), this._map.on("click", this._collapse, this)
				} else this._expand();
				this._baseLayersList = o.DomUtil.create("div", t + "-base", i), this._separator = o.DomUtil.create("div", t + "-separator", i), this._overlaysList = o.DomUtil.create("div", t + "-overlays", i), e.appendChild(i)
			},
			_addLayer: function(t, e, i) {
				var n = o.stamp(t);
				this._layers[n] = {
					layer: t,
					name: e,
					overlay: i
				}, this.options.autoZIndex && t.setZIndex && (this._lastZIndex++, t.setZIndex(this._lastZIndex))
			},
			_update: function() {
				if (this._container) {
					this._baseLayersList.innerHTML = "", this._overlaysList.innerHTML = "";
					var t, e, i = !1,
						n = !1;
					for (t in this._layers) e = this._layers[t], this._addItem(e), n = n || e.overlay, i = i || !e.overlay;
					this._separator.style.display = n && i ? "" : "none"
				}
			},
			_onLayerChange: function(t) {
				var e = this._layers[o.stamp(t.layer)];
				if (e) {
					this._handlingClick || this._update();
					var i = e.overlay ? "layeradd" === t.type ? "overlayadd" : "overlayremove" : "layeradd" === t.type ? "baselayerchange" : null;
					i && this._map.fire(i, e)
				}
			},
			_createRadioElement: function(t, i) {
				var n = '<input type="radio" class="leaflet-control-layers-selector" name="' + t + '"';
				i && (n += ' checked="checked"'), n += "/>";
				var r = e.createElement("div");
				return r.innerHTML = n, r.firstChild
			},
			_addItem: function(t) {
				var i, n = e.createElement("label"),
					r = this._map.hasLayer(t.layer);
				t.overlay ? (i = e.createElement("input"), i.type = "checkbox", i.className = "leaflet-control-layers-selector", i.defaultChecked = r) : i = this._createRadioElement("leaflet-base-layers", r), i.layerId = o.stamp(t.layer), o.DomEvent.on(i, "click", this._onInputClick, this);
				var a = e.createElement("span");
				a.innerHTML = " " + t.name, n.appendChild(i), n.appendChild(a);
				var s = t.overlay ? this._overlaysList : this._baseLayersList;
				return s.appendChild(n), n
			},
			_onInputClick: function() {
				var t, e, i, n = this._form.getElementsByTagName("input"),
					r = n.length;
				for (this._handlingClick = !0, t = 0; r > t; t++) e = n[t], i = this._layers[e.layerId], e.checked && !this._map.hasLayer(i.layer) ? this._map.addLayer(i.layer) : !e.checked && this._map.hasLayer(i.layer) && this._map.removeLayer(i.layer);
				this._handlingClick = !1, this._refocusOnMap()
			},
			_expand: function() {
				o.DomUtil.addClass(this._container, "leaflet-control-layers-expanded")
			},
			_collapse: function() {
				this._container.className = this._container.className.replace(" leaflet-control-layers-expanded", "")
			}
		}), o.control.layers = function(t, e, i) {
			return new o.Control.Layers(t, e, i)
		}, o.PosAnimation = o.Class.extend({
			includes: o.Mixin.Events,
			run: function(t, e, i, n) {
				this.stop(), this._el = t, this._inProgress = !0, this._newPos = e, this.fire("start"), t.style[o.DomUtil.TRANSITION] = "all " + (i || .25) + "s cubic-bezier(0,0," + (n || .5) + ",1)", o.DomEvent.on(t, o.DomUtil.TRANSITION_END, this._onTransitionEnd, this), o.DomUtil.setPosition(t, e), o.Util.falseFn(t.offsetWidth), this._stepTimer = setInterval(o.bind(this._onStep, this), 50)
			},
			stop: function() {
				this._inProgress && (o.DomUtil.setPosition(this._el, this._getPos()), this._onTransitionEnd(), o.Util.falseFn(this._el.offsetWidth))
			},
			_onStep: function() {
				var t = this._getPos();
				return t ? (this._el._leaflet_pos = t, void this.fire("step")) : void this._onTransitionEnd()
			},
			_transformRe: /([-+]?(?:\d*\.)?\d+)\D*, ([-+]?(?:\d*\.)?\d+)\D*\)/,
			_getPos: function() {
				var e, i, n, r = this._el,
					a = t.getComputedStyle(r);
				if (o.Browser.any3d) {
					if (n = a[o.DomUtil.TRANSFORM].match(this._transformRe), !n) return;
					e = parseFloat(n[1]), i = parseFloat(n[2])
				} else e = parseFloat(a.left), i = parseFloat(a.top);
				return new o.Point(e, i, (!0))
			},
			_onTransitionEnd: function() {
				o.DomEvent.off(this._el, o.DomUtil.TRANSITION_END, this._onTransitionEnd, this), this._inProgress && (this._inProgress = !1, this._el.style[o.DomUtil.TRANSITION] = "", this._el._leaflet_pos = this._newPos, clearInterval(this._stepTimer), this.fire("step").fire("end"))
			}
		}), o.Map.include({
			setView: function(t, e, i) {
				if (e = e === n ? this._zoom : this._limitZoom(e), t = this._limitCenter(o.latLng(t), e, this.options.maxBounds), i = i || {}, this._panAnim && this._panAnim.stop(), this._loaded && !i.reset && i !== !0) {
					i.animate !== n && (i.zoom = o.extend({
						animate: i.animate
					}, i.zoom), i.pan = o.extend({
						animate: i.animate
					}, i.pan));
					var r = this._zoom !== e ? this._tryAnimatedZoom && this._tryAnimatedZoom(t, e, i.zoom) : this._tryAnimatedPan(t, i.pan);
					if (r) return clearTimeout(this._sizeTimer), this
				}
				return this._resetView(t, e), this
			},
			panBy: function(t, e) {
				if (t = o.point(t).round(), e = e || {}, !t.x && !t.y) return this;
				if (this._panAnim || (this._panAnim = new o.PosAnimation, this._panAnim.on({
					step: this._onPanTransitionStep,
					end: this._onPanTransitionEnd
				}, this)), e.noMoveStart || this.fire("movestart"), e.animate !== !1) {
					o.DomUtil.addClass(this._mapPane, "leaflet-pan-anim");
					var i = this._getMapPanePos().subtract(t);
					this._panAnim.run(this._mapPane, i, e.duration || .25, e.easeLinearity)
				} else this._rawPanBy(t), this.fire("move").fire("moveend");
				return this
			},
			_onPanTransitionStep: function() {
				this.fire("move")
			},
			_onPanTransitionEnd: function() {
				o.DomUtil.removeClass(this._mapPane, "leaflet-pan-anim"), this.fire("moveend")
			},
			_tryAnimatedPan: function(t, e) {
				var i = this._getCenterOffset(t)._floor();
				return !((e && e.animate) !== !0 && !this.getSize().contains(i)) && (this.panBy(i, e), !0)
			}
		}), o.PosAnimation = o.DomUtil.TRANSITION ? o.PosAnimation : o.PosAnimation.extend({
			run: function(t, e, i, n) {
				this.stop(), this._el = t, this._inProgress = !0, this._duration = i || .25, this._easeOutPower = 1 / Math.max(n || .5, .2), this._startPos = o.DomUtil.getPosition(t), this._offset = e.subtract(this._startPos), this._startTime = +new Date, this.fire("start"), this._animate()
			},
			stop: function() {
				this._inProgress && (this._step(), this._complete())
			},
			_animate: function() {
				this._animId = o.Util.requestAnimFrame(this._animate, this), this._step()
			},
			_step: function() {
				var t = +new Date - this._startTime,
					e = 1e3 * this._duration;
				e > t ? this._runFrame(this._easeOut(t / e)) : (this._runFrame(1), this._complete())
			},
			_runFrame: function(t) {
				var e = this._startPos.add(this._offset.multiplyBy(t));
				o.DomUtil.setPosition(this._el, e), this.fire("step")
			},
			_complete: function() {
				o.Util.cancelAnimFrame(this._animId), this._inProgress = !1, this.fire("end")
			},
			_easeOut: function(t) {
				return 1 - Math.pow(1 - t, this._easeOutPower)
			}
		}), o.Map.mergeOptions({
			zoomAnimation: !0,
			zoomAnimationThreshold: 4
		}), o.DomUtil.TRANSITION && o.Map.addInitHook(function() {
			this._zoomAnimated = this.options.zoomAnimation && o.DomUtil.TRANSITION && o.Browser.any3d && !o.Browser.android23 && !o.Browser.mobileOpera, this._zoomAnimated && o.DomEvent.on(this._mapPane, o.DomUtil.TRANSITION_END, this._catchTransitionEnd, this)
		}), o.Map.include(o.DomUtil.TRANSITION ? {
			_catchTransitionEnd: function(t) {
				this._animatingZoom && t.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd()
			},
			_nothingToAnimate: function() {
				return !this._container.getElementsByClassName("leaflet-zoom-animated").length
			},
			_tryAnimatedZoom: function(t, e, i) {
				if (this._animatingZoom) return !0;
				if (i = i || {}, !this._zoomAnimated || i.animate === !1 || this._nothingToAnimate() || Math.abs(e - this._zoom) > this.options.zoomAnimationThreshold) return !1;
				var n = this.getZoomScale(e),
					r = this._getCenterOffset(t)._divideBy(1 - 1 / n),
					o = this._getCenterLayerPoint()._add(r);
				return !(i.animate !== !0 && !this.getSize().contains(r)) && (this.fire("movestart").fire("zoomstart"), this._animateZoom(t, e, o, n, null, !0), !0)
			},
			_animateZoom: function(t, e, i, n, r, a, s) {
				s || (this._animatingZoom = !0), o.DomUtil.addClass(this._mapPane, "leaflet-zoom-anim"), this._animateToCenter = t, this._animateToZoom = e, o.Draggable && (o.Draggable._disabled = !0), o.Util.requestAnimFrame(function() {
					this.fire("zoomanim", {
						center: t,
						zoom: e,
						origin: i,
						scale: n,
						delta: r,
						backwards: a
					}), setTimeout(o.bind(this._onZoomTransitionEnd, this), 250)
				}, this)
			},
			_onZoomTransitionEnd: function() {
				this._animatingZoom && (this._animatingZoom = !1, o.DomUtil.removeClass(this._mapPane, "leaflet-zoom-anim"), o.Util.requestAnimFrame(function() {
					this._resetView(this._animateToCenter, this._animateToZoom, !0, !0), o.Draggable && (o.Draggable._disabled = !1)
				}, this))
			}
		} : {}), o.TileLayer.include({
			_animateZoom: function(t) {
				this._animating || (this._animating = !0, this._prepareBgBuffer());
				var e = this._bgBuffer,
					i = o.DomUtil.TRANSFORM,
					n = t.delta ? o.DomUtil.getTranslateString(t.delta) : e.style[i],
					r = o.DomUtil.getScaleString(t.scale, t.origin);
				e.style[i] = t.backwards ? r + " " + n : n + " " + r
			},
			_endZoomAnim: function() {
				var t = this._tileContainer,
					e = this._bgBuffer;
				t.style.visibility = "", t.parentNode.appendChild(t), o.Util.falseFn(e.offsetWidth);
				var i = this._map.getZoom();
				(i > this.options.maxZoom || i < this.options.minZoom) && this._clearBgBuffer(), this._animating = !1
			},
			_clearBgBuffer: function() {
				var t = this._map;
				!t || t._animatingZoom || t.touchZoom._zooming || (this._bgBuffer.innerHTML = "", this._bgBuffer.style[o.DomUtil.TRANSFORM] = "")
			},
			_prepareBgBuffer: function() {
				var t = this._tileContainer,
					e = this._bgBuffer,
					i = this._getLoadedTilesPercentage(e),
					n = this._getLoadedTilesPercentage(t);
				return e && i > .5 && .5 > n ? (t.style.visibility = "hidden", void this._stopLoadingImages(t)) : (e.style.visibility = "hidden", e.style[o.DomUtil.TRANSFORM] = "", this._tileContainer = e, e = this._bgBuffer = t, this._stopLoadingImages(e), void clearTimeout(this._clearBgBufferTimer))
			},
			_getLoadedTilesPercentage: function(t) {
				var e, i, n = t.getElementsByTagName("img"),
					r = 0;
				for (e = 0, i = n.length; i > e; e++) n[e].complete && r++;
				return r / i
			},
			_stopLoadingImages: function(t) {
				var e, i, n, r = Array.prototype.slice.call(t.getElementsByTagName("img"));
				for (e = 0, i = r.length; i > e; e++) n = r[e], n.complete || (n.onload = o.Util.falseFn, n.onerror = o.Util.falseFn, n.src = o.Util.emptyImageUrl, n.parentNode.removeChild(n))
			}
		}), o.Map.include({
			_defaultLocateOptions: {
				watch: !1,
				setView: !1,
				maxZoom: 1 / 0,
				timeout: 1e4,
				maximumAge: 0,
				enableHighAccuracy: !1
			},
			locate: function(t) {
				if (t = this._locateOptions = o.extend(this._defaultLocateOptions, t), !navigator.geolocation) return this._handleGeolocationError({
					code: 0,
					message: "Geolocation not supported."
				}), this;
				var e = o.bind(this._handleGeolocationResponse, this),
					i = o.bind(this._handleGeolocationError, this);
				return t.watch ? this._locationWatchId = navigator.geolocation.watchPosition(e, i, t) : navigator.geolocation.getCurrentPosition(e, i, t), this
			},
			stopLocate: function() {
				return navigator.geolocation && navigator.geolocation.clearWatch(this._locationWatchId), this._locateOptions && (this._locateOptions.setView = !1), this
			},
			_handleGeolocationError: function(t) {
				var e = t.code,
					i = t.message || (1 === e ? "permission denied" : 2 === e ? "position unavailable" : "timeout");
				this._locateOptions.setView && !this._loaded && this.fitWorld(), this.fire("locationerror", {
					code: e,
					message: "Geolocation error: " + i + "."
				})
			},
			_handleGeolocationResponse: function(t) {
				var e = t.coords.latitude,
					i = t.coords.longitude,
					n = new o.LatLng(e, i),
					r = 180 * t.coords.accuracy / 40075017,
					a = r / Math.cos(o.LatLng.DEG_TO_RAD * e),
					s = o.latLngBounds([e - r, i - a], [e + r, i + a]),
					l = this._locateOptions;
				if (l.setView) {
					var u = Math.min(this.getBoundsZoom(s), l.maxZoom);
					this.setView(n, u)
				}
				var c = {
					latlng: n,
					bounds: s,
					timestamp: t.timestamp
				};
				for (var h in t.coords)"number" == typeof t.coords[h] && (c[h] = t.coords[h]);
				this.fire("locationfound", c)
			}
		})
	}(window, document), i("ViewModels/DistanceLegendViewModel", ["Cesium/Core/defined", "Cesium/Core/DeveloperError", "Cesium/Core/EllipsoidGeodesic", "Cesium/Core/Cartesian2", "Cesium/Core/getTimestamp", "Cesium/Core/EventHelper", "KnockoutES5", "Core/loadView", "leaflet"], function(t, e, i, n, r, o, a, s, l) {
		"use strict";

		function u(e, i) {
			var o = r();
			if (!(o < e._lastLegendUpdate + 250)) {
				e._lastLegendUpdate = o;
				var a = i.canvas.clientWidth,
					s = i.canvas.clientHeight,
					l = i.camera.getPickRay(new n(a / 2 | 0, s - 1)),
					u = i.camera.getPickRay(new n(1 + a / 2 | 0, s - 1)),
					c = i.globe,
					h = c.pick(l, i),
					f = c.pick(u, i);
				if (!t(h) || !t(f)) return e.barWidth = void 0, void(e.distanceLabel = void 0);
				var m = c.ellipsoid.cartesianToCartographic(h),
					g = c.ellipsoid.cartesianToCartographic(f);
				d.setEndPoints(m, g);
				for (var v, _ = d.surfaceDistance, y = 100, b = p.length - 1; !t(v) && b >= 0; --b) p[b] / _ < y && (v = p[b]);
				if (t(v)) {
					var w;
					w = v >= 1e3 ? (v / 1e3).toString() + " km" : v.toString() + " m", e.barWidth = v / _ | 0, e.distanceLabel = w
				} else e.barWidth = void 0, e.distanceLabel = void 0
			}
		}
		function c(t, e) {
			var i = e.getSize().y / 2,
				n = 100,
				r = e.containerPointToLatLng([0, i]).distanceTo(e.containerPointToLatLng([n, i])),
				o = l.control.scale()._getRoundNum(r),
				a = o < 1e3 ? o + " m" : o / 1e3 + " km";
			t.barWidth = o / r * n, t.distanceLabel = a
		}
		var h = function(i) {
				function n() {
					if (t(r.terria)) {
						var e = r.terria.scene;
						r._removeSubscription = e.postRender.addEventListener(function() {
							u(this, e)
						}, r)
					} else if (t(r.terria.leaflet)) {
						var i = r.terria.leaflet.map,
							n = function() {
								c(r, i)
							};
						r._removeSubscription = function() {
							i.off("zoomend", n), i.off("moveend", n)
						}, i.on("zoomend", n), i.on("moveend", n), c(r, i)
					}
				}
				if (!t(i) || !t(i.terria)) throw new e("options.terria is required.");
				this.terria = i.terria, this._removeSubscription = void 0, this._lastLegendUpdate = void 0, this.eventHelper = new o, this.distanceLabel = void 0, this.barWidth = void 0, a.track(this, ["distanceLabel", "barWidth"]), this.eventHelper.add(this.terria.afterWidgetChanged, function() {
					t(this._removeSubscription) && (this._removeSubscription(), this._removeSubscription = void 0)
				}, this);
				var r = this;
				n(), this.eventHelper.add(this.terria.afterWidgetChanged, function() {
					n()
				}, this)
			};
		h.prototype.destroy = function() {
			this.eventHelper.removeAll()
		}, h.prototype.show = function(t) {
			var e = '<div class="distance-legend" data-bind="visible: distanceLabel && barWidth"><div class="distance-legend-label" data-bind="text: distanceLabel"></div><div class="distance-legend-scale-bar" data-bind="style: { width: barWidth + \'px\', left: (5 + (125 - barWidth) / 2) + \'px\' }"></div></div>';
			s(e, t, this)
		}, h.create = function(t) {
			var e = new h(t);
			return e.show(t.container), e
		};
		var d = new i,
			p = [1, 2, 3, 5, 10, 20, 30, 50, 100, 200, 300, 500, 1e3, 2e3, 3e3, 5e3, 1e4, 2e4, 3e4, 5e4, 1e5, 2e5, 3e5, 5e5, 1e6, 2e6, 3e6, 5e6, 1e7, 2e7, 3e7, 5e7];
		return h
	}), i("ViewModels/UserInterfaceControl", ["Cesium/Core/defined", "Cesium/Core/defineProperties", "Cesium/Core/DeveloperError", "KnockoutES5"], function(t, e, i, n) {
		"use strict";
		var r = function(e) {
				if (!t(e)) throw new i("terria is required");
				this._terria = e, this.name = "Unnamed Control", this.text = void 0, this.svgIcon = void 0, this.svgHeight = void 0, this.svgWidth = void 0, this.cssClass = void 0, this.isActive = !1, n.track(this, ["name", "svgIcon", "svgHeight", "svgWidth", "cssClass", "isActive"])
			};
		return e(r.prototype, {
			terria: {
				get: function() {
					return this._terria
				}
			},
			hasText: {
				get: function() {
					return t(this.text) && "string" == typeof this.text
				}
			}
		}), r.prototype.activate = function() {
			throw new i("activate must be implemented in the derived class.")
		}, r
	}), i("ViewModels/NavigationControl", ["ViewModels/UserInterfaceControl"], function(t) {
		"use strict";
		var e = function(e) {
				t.apply(this, arguments)
			};
		return e.prototype = Object.create(t.prototype), e
	}), i("SvgPaths/svgReset", [], function() {
		"use strict";
		return "M 7.5,0 C 3.375,0 0,3.375 0,7.5 0,11.625 3.375,15 7.5,15 c 3.46875,0 6.375,-2.4375 7.21875,-5.625 l -1.96875,0 C 12,11.53125 9.9375,13.125 7.5,13.125 4.40625,13.125 1.875,10.59375 1.875,7.5 1.875,4.40625 4.40625,1.875 7.5,1.875 c 1.59375,0 2.90625,0.65625 3.9375,1.6875 l -3,3 6.5625,0 L 15,0 12.75,2.25 C 11.4375,0.84375 9.5625,0 7.5,0 z"
	}), i("ViewModels/ResetViewNavigationControl", ["Cesium/Core/defined", "Cesium/Scene/Camera", "Cesium/Core/Rectangle", "Cesium/Core/Cartographic", "ViewModels/NavigationControl", "SvgPaths/svgReset"], function(t, e, i, n, r, o) {
		"use strict";
		var a = function(t) {
				r.apply(this, arguments), this.name = "Reset View", this.svgIcon = o, this.svgHeight = 15, this.svgWidth = 15, this.cssClass = "navigation-control-icon-reset"
			};
		return a.prototype = Object.create(r.prototype), a.prototype.resetView = function() {
			var r = this.terria.scene,
				o = r.screenSpaceCameraController;
			if (o.enableInputs) {
				this.isActive = !0;
				var a = r.camera;
				if (t(this.terria.trackedEntity)) {
					var s = this.terria.trackedEntity;
					this.terria.trackedEntity = void 0, this.terria.trackedEntity = s
				} else if (this.terria.options.defaultResetView) {
					if (this.terria.options.defaultResetView && this.terria.options.defaultResetView instanceof n) a.flyTo({
						destination: r.globe.ellipsoid.cartographicToCartesian(this.terria.options.defaultResetView)
					});
					else if (this.terria.options.defaultResetView && this.terria.options.defaultResetView instanceof i) try {
						i.validate(this.terria.options.defaultResetView), a.flyTo({
							destination: this.terria.options.defaultResetView
						})
					} catch (l) {
						console.log("Cesium-navigation/ResetViewNavigationControl:   options.defaultResetView Cesium rectangle is  invalid!")
					}
				} else "function" == typeof a.flyHome ? a.flyHome(1) : a.flyTo({
					destination: e.DEFAULT_VIEW_RECTANGLE,
					duration: 1
				});
				this.isActive = !1
			}
		}, a.prototype.activate = function() {
			this.resetView()
		}, a
	}), i("Core/Utils", ["Cesium/Core/defined", "Cesium/Core/Ray", "Cesium/Core/Cartesian3", "Cesium/Core/Cartographic", "Cesium/Core/ReferenceFrame", "Cesium/Scene/SceneMode"], function(t, e, i, n, r, o) {
		"use strict";
		var a = {},
			s = new n,
			l = new e;
		return a.getCameraFocus = function(e, n, r) {
			var a = e.scene,
				u = a.camera;
			if (a.mode != o.MORPHING && (t(r) || (r = new i), t(e.trackedEntity) ? r = e.trackedEntity.position.getValue(e.clock.currentTime, r) : (l.origin = u.positionWC, l.direction = u.directionWC, r = a.globe.pick(l, a, r)), t(r))) return a.mode == o.SCENE2D || a.mode == o.COLUMBUS_VIEW ? (r = u.worldToCameraCoordinatesPoint(r, r), n && (r = a.globe.ellipsoid.cartographicToCartesian(a.mapProjection.unproject(r, s), r))) : n || (r = u.worldToCameraCoordinatesPoint(r, r)), r
		}, a
	}), i("ViewModels/ZoomNavigationControl", ["Cesium/Core/defined", "Cesium/Core/Ray", "Cesium/Core/IntersectionTests", "Cesium/Core/Cartesian3", "Cesium/Scene/SceneMode", "ViewModels/NavigationControl", "Core/Utils"], function(t, e, i, n, r, o, a) {
		"use strict";
		var s = function(t, e) {
				o.apply(this, arguments), this.name = "Zoom " + (e ? "In" : "Out"), this.text = e ? "+" : "-", this.cssClass = "navigation-control-icon-zoom-" + (e ? "in" : "out"), this.relativeAmount = 2, e && (this.relativeAmount = 1 / this.relativeAmount)
			};
		s.prototype.relativeAmount = 1, s.prototype = Object.create(o.prototype), s.prototype.activate = function() {
			this.zoom(this.relativeAmount)
		};
		var l = new n;
		return s.prototype.zoom = function(o) {
			if (this.isActive = !0, t(this.terria)) {
				var s = this.terria.scene,
					u = s.screenSpaceCameraController;
				if (!u.enableInputs || !u.enableZoom) return;
				var c, h = s.camera;
				switch (s.mode) {
				case r.MORPHING:
					break;
				case r.SCENE2D:
					h.zoomIn(h.positionCartographic.height * (1 - this.relativeAmount));
					break;
				default:
					var d;
					if (d = t(this.terria.trackedEntity) ? new n : a.getCameraFocus(this.terria, !1), t(d)) c = {
						direction: h.direction,
						up: h.up
					};
					else {
						var p = new e(h.worldToCameraCoordinatesPoint(s.globe.ellipsoid.cartographicToCartesian(h.positionCartographic)), h.directionWC);
						d = i.grazingAltitudeLocation(p, s.globe.ellipsoid), c = {
							heading: h.heading,
							pitch: h.pitch,
							roll: h.roll
						}
					}
					var f = n.subtract(h.position, d, l),
						m = n.multiplyByScalar(f, o, f),
						g = n.add(d, m, d);
					t(this.terria.trackedEntity) || s.mode == r.COLUMBUS_VIEW ? h.position = g : h.flyTo({
						destination: g,
						orientation: c,
						duration: .5,
						convert: !1
					})
				}
			}
			this.isActive = !1
		}, s
	}), i("SvgPaths/svgCompassOuterRing", [], function() {
		"use strict";
		return "m 66.5625,0 0,15.15625 3.71875,0 0,-10.40625 5.5,10.40625 4.375,0 0,-15.15625 -3.71875,0 0,10.40625 L 70.9375,0 66.5625,0 z M 72.5,20.21875 c -28.867432,0 -52.28125,23.407738 -52.28125,52.28125 0,28.87351 23.413818,52.3125 52.28125,52.3125 28.86743,0 52.28125,-23.43899 52.28125,-52.3125 0,-28.873512 -23.41382,-52.28125 -52.28125,-52.28125 z m 0,1.75 c 13.842515,0 26.368948,5.558092 35.5,14.5625 l -11.03125,11 0.625,0.625 11.03125,-11 c 8.9199,9.108762 14.4375,21.579143 14.4375,35.34375 0,13.764606 -5.5176,26.22729 -14.4375,35.34375 l -11.03125,-11 -0.625,0.625 11.03125,11 c -9.130866,9.01087 -21.658601,14.59375 -35.5,14.59375 -13.801622,0 -26.321058,-5.53481 -35.4375,-14.5 l 11.125,-11.09375 c 6.277989,6.12179 14.857796,9.90625 24.3125,9.90625 19.241896,0 34.875,-15.629154 34.875,-34.875 0,-19.245847 -15.633104,-34.84375 -34.875,-34.84375 -9.454704,0 -18.034511,3.760884 -24.3125,9.875 L 37.0625,36.4375 C 46.179178,27.478444 58.696991,21.96875 72.5,21.96875 z m -0.875,0.84375 0,13.9375 1.75,0 0,-13.9375 -1.75,0 z M 36.46875,37.0625 47.5625,48.15625 C 41.429794,54.436565 37.65625,63.027539 37.65625,72.5 c 0,9.472461 3.773544,18.055746 9.90625,24.34375 L 36.46875,107.9375 c -8.96721,-9.1247 -14.5,-21.624886 -14.5,-35.4375 0,-13.812615 5.53279,-26.320526 14.5,-35.4375 z M 72.5,39.40625 c 18.297686,0 33.125,14.791695 33.125,33.09375 0,18.302054 -14.827314,33.125 -33.125,33.125 -18.297687,0 -33.09375,-14.822946 -33.09375,-33.125 0,-18.302056 14.796063,-33.09375 33.09375,-33.09375 z M 22.84375,71.625 l 0,1.75 13.96875,0 0,-1.75 -13.96875,0 z m 85.5625,0 0,1.75 14,0 0,-1.75 -14,0 z M 71.75,108.25 l 0,13.9375 1.71875,0 0,-13.9375 -1.71875,0 z"
	}), i("SvgPaths/svgCompassGyro", [], function() {
		"use strict";
		return "m 72.71875,54.375 c -0.476702,0 -0.908208,0.245402 -1.21875,0.5625 -0.310542,0.317098 -0.551189,0.701933 -0.78125,1.1875 -0.172018,0.363062 -0.319101,0.791709 -0.46875,1.25 -6.91615,1.075544 -12.313231,6.656514 -13,13.625 -0.327516,0.117495 -0.661877,0.244642 -0.9375,0.375 -0.485434,0.22959 -0.901634,0.471239 -1.21875,0.78125 -0.317116,0.310011 -0.5625,0.742111 -0.5625,1.21875 l 0.03125,0 c 0,0.476639 0.245384,0.877489 0.5625,1.1875 0.317116,0.310011 0.702066,0.58291 1.1875,0.8125 0.35554,0.168155 0.771616,0.32165 1.21875,0.46875 1.370803,6.10004 6.420817,10.834127 12.71875,11.8125 0.146999,0.447079 0.30025,0.863113 0.46875,1.21875 0.230061,0.485567 0.470708,0.870402 0.78125,1.1875 0.310542,0.317098 0.742048,0.5625 1.21875,0.5625 0.476702,0 0.876958,-0.245402 1.1875,-0.5625 0.310542,-0.317098 0.582439,-0.701933 0.8125,-1.1875 0.172018,-0.363062 0.319101,-0.791709 0.46875,-1.25 6.249045,-1.017063 11.256351,-5.7184 12.625,-11.78125 0.447134,-0.1471 0.86321,-0.300595 1.21875,-0.46875 0.485434,-0.22959 0.901633,-0.502489 1.21875,-0.8125 0.317117,-0.310011 0.5625,-0.710861 0.5625,-1.1875 l -0.03125,0 c 0,-0.476639 -0.245383,-0.908739 -0.5625,-1.21875 C 89.901633,71.846239 89.516684,71.60459 89.03125,71.375 88.755626,71.244642 88.456123,71.117495 88.125,71 87.439949,64.078341 82.072807,58.503735 75.21875,57.375 c -0.15044,-0.461669 -0.326927,-0.884711 -0.5,-1.25 -0.230061,-0.485567 -0.501958,-0.870402 -0.8125,-1.1875 -0.310542,-0.317098 -0.710798,-0.5625 -1.1875,-0.5625 z m -0.0625,1.40625 c 0.03595,-0.01283 0.05968,0 0.0625,0 0.0056,0 0.04321,-0.02233 0.1875,0.125 0.144288,0.147334 0.34336,0.447188 0.53125,0.84375 0.06385,0.134761 0.123901,0.309578 0.1875,0.46875 -0.320353,-0.01957 -0.643524,-0.0625 -0.96875,-0.0625 -0.289073,0 -0.558569,0.04702 -0.84375,0.0625 C 71.8761,57.059578 71.936151,56.884761 72,56.75 c 0.18789,-0.396562 0.355712,-0.696416 0.5,-0.84375 0.07214,-0.07367 0.120304,-0.112167 0.15625,-0.125 z m 0,2.40625 c 0.448007,0 0.906196,0.05436 1.34375,0.09375 0.177011,0.592256 0.347655,1.271044 0.5,2.03125 0.475097,2.370753 0.807525,5.463852 0.9375,8.9375 -0.906869,-0.02852 -1.834463,-0.0625 -2.78125,-0.0625 -0.92298,0 -1.802327,0.03537 -2.6875,0.0625 0.138529,-3.473648 0.493653,-6.566747 0.96875,-8.9375 0.154684,-0.771878 0.320019,-1.463985 0.5,-2.0625 0.405568,-0.03377 0.804291,-0.0625 1.21875,-0.0625 z m -2.71875,0.28125 c -0.129732,0.498888 -0.259782,0.987558 -0.375,1.5625 -0.498513,2.487595 -0.838088,5.693299 -0.96875,9.25 -3.21363,0.15162 -6.119596,0.480068 -8.40625,0.9375 -0.682394,0.136509 -1.275579,0.279657 -1.84375,0.4375 0.799068,-6.135482 5.504716,-11.036454 11.59375,-12.1875 z M 75.5,58.5 c 6.043169,1.18408 10.705093,6.052712 11.5,12.15625 -0.569435,-0.155806 -1.200273,-0.302525 -1.875,-0.4375 -2.262525,-0.452605 -5.108535,-0.783809 -8.28125,-0.9375 -0.130662,-3.556701 -0.470237,-6.762405 -0.96875,-9.25 C 75.761959,59.467174 75.626981,58.990925 75.5,58.5 z m -2.84375,12.09375 c 0.959338,0 1.895843,0.03282 2.8125,0.0625 C 75.48165,71.267751 75.5,71.871028 75.5,72.5 c 0,1.228616 -0.01449,2.438313 -0.0625,3.59375 -0.897358,0.0284 -1.811972,0.0625 -2.75,0.0625 -0.927373,0 -1.831062,-0.03473 -2.71875,-0.0625 -0.05109,-1.155437 -0.0625,-2.365134 -0.0625,-3.59375 0,-0.628972 0.01741,-1.232249 0.03125,-1.84375 0.895269,-0.02827 1.783025,-0.0625 2.71875,-0.0625 z M 68.5625,70.6875 c -0.01243,0.60601 -0.03125,1.189946 -0.03125,1.8125 0,1.22431 0.01541,2.407837 0.0625,3.5625 -3.125243,-0.150329 -5.92077,-0.471558 -8.09375,-0.90625 -0.784983,-0.157031 -1.511491,-0.316471 -2.125,-0.5 -0.107878,-0.704096 -0.1875,-1.422089 -0.1875,-2.15625 0,-0.115714 0.02849,-0.228688 0.03125,-0.34375 0.643106,-0.20284 1.389577,-0.390377 2.25,-0.5625 2.166953,-0.433487 4.97905,-0.75541 8.09375,-0.90625 z m 8.3125,0.03125 c 3.075121,0.15271 5.824455,0.446046 7.96875,0.875 0.857478,0.171534 1.630962,0.360416 2.28125,0.5625 0.0027,0.114659 0,0.228443 0,0.34375 0,0.735827 -0.07914,1.450633 -0.1875,2.15625 -0.598568,0.180148 -1.29077,0.34562 -2.0625,0.5 -2.158064,0.431708 -4.932088,0.754666 -8.03125,0.90625 0.04709,-1.154663 0.0625,-2.33819 0.0625,-3.5625 0,-0.611824 -0.01924,-1.185379 -0.03125,-1.78125 z M 57.15625,72.5625 c 0.0023,0.572772 0.06082,1.131112 0.125,1.6875 -0.125327,-0.05123 -0.266577,-0.10497 -0.375,-0.15625 -0.396499,-0.187528 -0.665288,-0.387337 -0.8125,-0.53125 -0.147212,-0.143913 -0.15625,-0.182756 -0.15625,-0.1875 0,-0.0047 -0.02221,-0.07484 0.125,-0.21875 0.147212,-0.143913 0.447251,-0.312472 0.84375,-0.5 0.07123,-0.03369 0.171867,-0.06006 0.25,-0.09375 z m 31.03125,0 c 0.08201,0.03503 0.175941,0.05872 0.25,0.09375 0.396499,0.187528 0.665288,0.356087 0.8125,0.5 0.14725,0.14391 0.15625,0.21405 0.15625,0.21875 0,0.0047 -0.009,0.04359 -0.15625,0.1875 -0.147212,0.143913 -0.416001,0.343722 -0.8125,0.53125 -0.09755,0.04613 -0.233314,0.07889 -0.34375,0.125 0.06214,-0.546289 0.09144,-1.094215 0.09375,-1.65625 z m -29.5,3.625 c 0.479308,0.123125 0.983064,0.234089 1.53125,0.34375 2.301781,0.460458 5.229421,0.787224 8.46875,0.9375 0.167006,2.84339 0.46081,5.433176 0.875,7.5 0.115218,0.574942 0.245268,1.063612 0.375,1.5625 -5.463677,-1.028179 -9.833074,-5.091831 -11.25,-10.34375 z m 27.96875,0 C 85.247546,81.408945 80.919274,85.442932 75.5,86.5 c 0.126981,-0.490925 0.261959,-0.967174 0.375,-1.53125 0.41419,-2.066824 0.707994,-4.65661 0.875,-7.5 3.204493,-0.15162 6.088346,-0.480068 8.375,-0.9375 0.548186,-0.109661 1.051942,-0.220625 1.53125,-0.34375 z M 70.0625,77.53125 c 0.865391,0.02589 1.723666,0.03125 2.625,0.03125 0.912062,0 1.782843,-0.0048 2.65625,-0.03125 -0.165173,2.736408 -0.453252,5.207651 -0.84375,7.15625 -0.152345,0.760206 -0.322989,1.438994 -0.5,2.03125 -0.437447,0.03919 -0.895856,0.0625 -1.34375,0.0625 -0.414943,0 -0.812719,-0.02881 -1.21875,-0.0625 -0.177011,-0.592256 -0.347655,-1.271044 -0.5,-2.03125 -0.390498,-1.948599 -0.700644,-4.419842 -0.875,-7.15625 z m 1.75,10.28125 c 0.284911,0.01545 0.554954,0.03125 0.84375,0.03125 0.325029,0 0.648588,-0.01171 0.96875,-0.03125 -0.05999,0.148763 -0.127309,0.31046 -0.1875,0.4375 -0.18789,0.396562 -0.386962,0.696416 -0.53125,0.84375 -0.144288,0.147334 -0.181857,0.125 -0.1875,0.125 -0.0056,0 -0.07446,0.02233 -0.21875,-0.125 C 72.355712,88.946416 72.18789,88.646562 72,88.25 71.939809,88.12296 71.872486,87.961263 71.8125,87.8125 z"
	}), i("SvgPaths/svgCompassRotationMarker", [], function() {
		"use strict";
		return "M 72.46875,22.03125 C 59.505873,22.050338 46.521615,27.004287 36.6875,36.875 L 47.84375,47.96875 C 61.521556,34.240041 83.442603,34.227389 97.125,47.90625 l 11.125,-11.125 C 98.401629,26.935424 85.431627,22.012162 72.46875,22.03125 z"
	}), i("ViewModels/NavigationViewModel", ["Cesium/Core/defined", "Cesium/Core/Math", "Cesium/Core/getTimestamp", "Cesium/Core/EventHelper", "Cesium/Core/Transforms", "Cesium/Scene/SceneMode", "Cesium/Core/Cartesian2", "Cesium/Core/Cartesian3", "Cesium/Core/Matrix4", "Cesium/Core/BoundingSphere", "Cesium/Core/HeadingPitchRange", "KnockoutES5", "Core/loadView", "ViewModels/ResetViewNavigationControl", "ViewModels/ZoomNavigationControl", "SvgPaths/svgCompassOuterRing", "SvgPaths/svgCompassGyro", "SvgPaths/svgCompassRotationMarker", "Core/Utils"], function(t, e, i, n, r, o, a, s, l, u, c, h, d, p, f, m, g, v, _) {
		"use strict";

		function y(n, u, c) {
			function h(t, i) {
				var r = Math.atan2(-t.y, t.x);
				n.orbitCursorAngle = e.zeroToTwoPi(r - e.PI_OVER_TWO);
				var o = a.magnitude(t),
					s = i / 2,
					l = Math.min(o / s, 1),
					u = .5 * l * l + .5;
				n.orbitCursorOpacity = u
			}
			var d = n.terria.scene,
				p = d.screenSpaceCameraController;
			if (d.mode != o.MORPHING && p.enableInputs) {
				switch (d.mode) {
				case o.COLUMBUS_VIEW:
					if (p.enableLook) break;
					if (!p.enableTranslate || !p.enableTilt) return;
					break;
				case o.SCENE3D:
					if (p.enableLook) break;
					if (!p.enableTilt || !p.enableRotate) return;
					break;
				case o.SCENE2D:
					if (!p.enableTranslate) return
				}
				document.removeEventListener("mousemove", n.orbitMouseMoveFunction, !1), document.removeEventListener("mouseup", n.orbitMouseUpFunction, !1), t(n.orbitTickFunction) && n.terria.clock.onTick.removeEventListener(n.orbitTickFunction), n.orbitMouseMoveFunction = void 0, n.orbitMouseUpFunction = void 0, n.orbitTickFunction = void 0, n.isOrbiting = !0, n.orbitLastTimestamp = i();
				var f = d.camera;
				if (t(n.terria.trackedEntity)) n.orbitFrame = void 0, n.orbitIsLook = !1;
				else {
					var m = _.getCameraFocus(n.terria, !0, k);
					t(m) ? (n.orbitFrame = r.eastNorthUpToFixedFrame(m, d.globe.ellipsoid, E), n.orbitIsLook = !1) : (n.orbitFrame = r.eastNorthUpToFixedFrame(f.positionWC, d.globe.ellipsoid, E), n.orbitIsLook = !0)
				}
				n.orbitTickFunction = function(r) {
					var a, u = i(),
						c = u - n.orbitLastTimestamp,
						h = 2.5 * (n.orbitCursorOpacity - .5) / 1e3,
						p = c * h,
						m = n.orbitCursorAngle + e.PI_OVER_TWO,
						g = Math.cos(m) * p,
						v = Math.sin(m) * p;
					t(n.orbitFrame) && (a = l.clone(f.transform, x), f.lookAtTransform(n.orbitFrame)), d.mode == o.SCENE2D ? f.move(new s(g, v, 0), Math.max(d.canvas.clientWidth, d.canvas.clientHeight) / 100 * f.positionCartographic.height * p) : n.orbitIsLook ? (f.look(s.UNIT_Z, -g), f.look(f.right, -v)) : (f.rotateLeft(g), f.rotateUp(v)), t(n.orbitFrame) && f.lookAtTransform(a), n.orbitLastTimestamp = u
				}, n.orbitMouseMoveFunction = function(t) {
					var e = u.getBoundingClientRect(),
						i = new a((e.right - e.left) / 2, (e.bottom - e.top) / 2),
						n = new a(t.clientX - e.left, t.clientY - e.top),
						r = a.subtract(n, i, C);
					h(r, e.width)
				}, n.orbitMouseUpFunction = function(e) {
					n.isOrbiting = !1, document.removeEventListener("mousemove", n.orbitMouseMoveFunction, !1), document.removeEventListener("mouseup", n.orbitMouseUpFunction, !1), t(n.orbitTickFunction) && n.terria.clock.onTick.removeEventListener(n.orbitTickFunction), n.orbitMouseMoveFunction = void 0, n.orbitMouseUpFunction = void 0, n.orbitTickFunction = void 0
				}, document.addEventListener("mousemove", n.orbitMouseMoveFunction, !1), document.addEventListener("mouseup", n.orbitMouseUpFunction, !1), n.terria.clock.onTick.addEventListener(n.orbitTickFunction), h(c, u.getBoundingClientRect().width)
			}
		}
		function b(i, n, s) {
			var u = i.terria.scene,
				c = u.camera,
				h = u.screenSpaceCameraController;
			if (u.mode != o.MORPHING && u.mode != o.SCENE2D && h.enableInputs && (h.enableLook || u.mode != o.COLUMBUS_VIEW && (u.mode != o.SCENE3D || h.enableRotate))) {
				if (document.removeEventListener("mousemove", i.rotateMouseMoveFunction, !1), document.removeEventListener("mouseup", i.rotateMouseUpFunction, !1), i.rotateMouseMoveFunction = void 0, i.rotateMouseUpFunction = void 0, i.isRotating = !0, i.rotateInitialCursorAngle = Math.atan2(-s.y, s.x), t(i.terria.trackedEntity)) i.rotateFrame = void 0, i.rotateIsLook = !1;
				else {
					var d = _.getCameraFocus(i.terria, !0, k);
					t(d) && (u.mode != o.COLUMBUS_VIEW || h.enableLook || h.enableTranslate) ? (i.rotateFrame = r.eastNorthUpToFixedFrame(d, u.globe.ellipsoid, E), i.rotateIsLook = !1) : (i.rotateFrame = r.eastNorthUpToFixedFrame(c.positionWC, u.globe.ellipsoid, E), i.rotateIsLook = !0)
				}
				var p;
				t(i.rotateFrame) && (p = l.clone(c.transform, x), c.lookAtTransform(i.rotateFrame)), i.rotateInitialCameraAngle = -c.heading, t(i.rotateFrame) && c.lookAtTransform(p), i.rotateMouseMoveFunction = function(r) {
					var o, s = n.getBoundingClientRect(),
						u = new a((s.right - s.left) / 2, (s.bottom - s.top) / 2),
						c = new a(r.clientX - s.left, r.clientY - s.top),
						h = a.subtract(c, u, C),
						d = Math.atan2(-h.y, h.x),
						p = d - i.rotateInitialCursorAngle,
						f = e.zeroToTwoPi(i.rotateInitialCameraAngle - p),
						m = i.terria.scene.camera;
					t(i.rotateFrame) && (o = l.clone(m.transform, x), m.lookAtTransform(i.rotateFrame));
					var g = -m.heading;
					m.rotateRight(f - g), t(i.rotateFrame) && m.lookAtTransform(o)
				}, i.rotateMouseUpFunction = function(t) {
					i.isRotating = !1, document.removeEventListener("mousemove", i.rotateMouseMoveFunction, !1), document.removeEventListener("mouseup", i.rotateMouseUpFunction, !1), i.rotateMouseMoveFunction = void 0, i.rotateMouseUpFunction = void 0
				}, document.addEventListener("mousemove", i.rotateMouseMoveFunction, !1), document.addEventListener("mouseup", i.rotateMouseUpFunction, !1)
			}
		}
		var w = function(e) {
				function i() {
					t(r.terria) ? (r._unsubcribeFromPostRender && (r._unsubcribeFromPostRender(), r._unsubcribeFromPostRender = void 0), r.showCompass = !0, r._unsubcribeFromPostRender = r.terria.scene.postRender.addEventListener(function() {
						r.heading = r.terria.scene.camera.heading
					})) : (r._unsubcribeFromPostRender && (r._unsubcribeFromPostRender(), r._unsubcribeFromPostRender = void 0), r.showCompass = !1)
				}
				this.terria = e.terria, this.eventHelper = new n, this.controls = e.controls, t(this.controls) || (this.controls = [new f(this.terria, (!0)), new p(this.terria), new f(this.terria, (!1))]), this.svgCompassOuterRing = m, this.svgCompassGyro = g, this.svgCompassRotationMarker = v, this.showCompass = t(this.terria), this.heading = this.showCompass ? this.terria.scene.camera.heading : 0, this.isOrbiting = !1, this.orbitCursorAngle = 0, this.orbitCursorOpacity = 0, this.orbitLastTimestamp = 0, this.orbitFrame = void 0, this.orbitIsLook = !1, this.orbitMouseMoveFunction = void 0, this.orbitMouseUpFunction = void 0, this.isRotating = !1, this.rotateInitialCursorAngle = void 0, this.rotateFrame = void 0, this.rotateIsLook = !1, this.rotateMouseMoveFunction = void 0, this.rotateMouseUpFunction = void 0, this._unsubcribeFromPostRender = void 0, h.track(this, ["controls", "showCompass", "heading", "isOrbiting", "orbitCursorAngle", "isRotating"]);
				var r = this;
				this.eventHelper.add(this.terria.afterWidgetChanged, i, this), i()
			};
		w.prototype.destroy = function() {
			this.eventHelper.removeAll()
		}, w.prototype.show = function(t) {
			var e = '<div class="compass" title="Drag outer ring: rotate view. Drag inner gyroscope: free orbit.Double-click: reset view.TIP: You can also free orbit by holding the CTRL key and dragging the map." data-bind="visible: showCompass, event: { mousedown: handleMouseDown, dblclick: handleDoubleClick }"><div class="compass-outer-ring-background"></div>' + " <div class=\"compass-rotation-marker\" data-bind=\"visible: isOrbiting, style: { transform: 'rotate(-' + orbitCursorAngle + 'rad)', '-webkit-transform': 'rotate(-' + orbitCursorAngle + 'rad)', opacity: orbitCursorOpacity }, cesiumSvgPath: { path: svgCompassRotationMarker, width: 145, height: 145 }\"></div> <div class=\"compass-outer-ring\" title=\"Click and drag to rotate the camera\" data-bind=\"style: { transform: 'rotate(-' + heading + 'rad)', '-webkit-transform': 'rotate(-' + heading + 'rad)' }, cesiumSvgPath: { path: svgCompassOuterRing, width: 145, height: 145 }\"></div> <div class=\"compass-gyro-background\"></div> <div class=\"compass-gyro\" data-bind=\"cesiumSvgPath: { path: svgCompassGyro, width: 145, height: 145 }, css: { 'compass-gyro-active': isOrbiting }\"></div></div><div class=\"navigation-controls\"><!-- ko foreach: controls --><div data-bind=\"click: activate, attr: { title: $data.name }, css: $root.isLastControl($data) ? 'navigation-control-last' : 'navigation-control' \">   <!-- ko if: $data.hasText -->   <div data-bind=\"text: $data.text, css: $data.isActive ?  'navigation-control-icon-active ' + $data.cssClass : $data.cssClass\"></div>   <!-- /ko -->  <!-- ko ifnot: $data.hasText -->  <div data-bind=\"cesiumSvgPath: { path: $data.svgIcon, width: $data.svgWidth, height: $data.svgHeight }, css: $data.isActive ?  'navigation-control-icon-active ' + $data.cssClass : $data.cssClass\"></div>  <!-- /ko --> </div> <!-- /ko --></div>";
			d(e, t, this)
		}, w.prototype.add = function(t) {
			this.controls.push(t)
		}, w.prototype.remove = function(t) {
			this.controls.remove(t)
		}, w.prototype.isLastControl = function(t) {
			return t === this.controls[this.controls.length - 1]
		};
		var C = new a;
		w.prototype.handleMouseDown = function(t, e) {
			var i = this.terria.scene;
			if (i.mode == o.MORPHING) return !0;
			var n = e.currentTarget,
				r = e.currentTarget.getBoundingClientRect(),
				s = r.width / 2,
				l = new a((r.right - r.left) / 2, (r.bottom - r.top) / 2),
				u = new a(e.clientX - r.left, e.clientY - r.top),
				c = a.subtract(u, l, C),
				h = a.magnitude(c),
				d = h / s,
				p = 145,
				f = 50;
			if (d < f / p) y(this, n, c);
			else {
				if (!(d < 1)) return !0;
				b(this, n, c)
			}
		};
		var x = new l,
			E = new l,
			k = new s;
		return w.prototype.handleDoubleClick = function(i, n) {
			var r = i.terria.scene,
				a = r.camera,
				l = r.screenSpaceCameraController;
			if (r.mode == o.MORPHING || !l.enableInputs) return !0;
			if (r.mode != o.COLUMBUS_VIEW || l.enableTranslate) {
				if (r.mode == o.SCENE3D || r.mode == o.COLUMBUS_VIEW) {
					if (!l.enableLook) return;
					if (r.mode == o.SCENE3D && !l.enableRotate) return
				}
				var h = _.getCameraFocus(i.terria, !0, k);
				if (!t(h)) return void this.controls[1].resetView();
				var d = r.globe.ellipsoid.cartographicToCartesian(a.positionCartographic, new s),
					p = r.globe.ellipsoid.geodeticSurfaceNormal(h),
					f = new u(h, 0);
				a.flyToBoundingSphere(f, {
					offset: new c(0, e.PI_OVER_TWO - s.angleBetween(p, a.directionWC), s.distance(d, h)),
					duration: 1.5
				})
			}
		}, w.create = function(t) {
			var e = new w(t);
			return e.show(t.container), e
		}, w
	}), i("CesiumNavigation", ["Cesium/Core/defined", "Cesium/Core/defineProperties", "Cesium/Core/Event", "KnockoutES5", "Core/registerKnockoutBindings", "ViewModels/DistanceLegendViewModel", "ViewModels/NavigationViewModel"], function(t, e, i, n, r, o, a) {
		"use strict";

		function s(e, n) {
			if (!t(e)) throw new DeveloperError("CesiumWidget or Viewer is required.");
			var s = t(e.cesiumWidget) ? e.cesiumWidget : e,
				l = document.createElement("div");
			l.className = "cesium-widget-cesiumNavigationContainer", s.container.appendChild(l), this.terria = e, this.terria.options = n, this.terria.afterWidgetChanged = new i, this.terria.beforeWidgetChanged = new i, this.container = l, this.navigationDiv = document.createElement("div"), this.navigationDiv.setAttribute("id", "navigationDiv"), this.distanceLegendDiv = document.createElement("div"), this.navigationDiv.setAttribute("id", "distanceLegendDiv"), l.appendChild(this.navigationDiv), l.appendChild(this.distanceLegendDiv), r(), this.distanceLegendViewModel = o.create({
				container: this.distanceLegendDiv,
				terria: this.terria,
				mapElement: l
			}), this.navigationViewModel = a.create({
				container: this.navigationDiv,
				terria: this.terria
			})
		}
		var l = function(t) {
				s.apply(this, arguments), this._onDestroyListeners = []
			};
		return l.prototype.distanceLegendViewModel = void 0, l.prototype.navigationViewModel = void 0, l.prototype.navigationDiv = void 0, l.prototype.distanceLegendDiv = void 0, l.prototype.terria = void 0, l.prototype.container = void 0, l.prototype._onDestroyListeners = void 0, l.prototype.destroy = function() {
			t(this.navigationViewModel) && this.navigationViewModel.destroy(), t(this.distanceLegendViewModel) && this.distanceLegendViewModel.destroy(), t(this.navigationDiv) && this.navigationDiv.parentNode.removeChild(this.navigationDiv), delete this.navigationDiv, t(this.distanceLegendDiv) && this.distanceLegendDiv.parentNode.removeChild(this.distanceLegendDiv), delete this.distanceLegendDiv, t(this.container) && this.container.parentNode.removeChild(this.container), delete this.container;
			for (var e = 0; e < this._onDestroyListeners.length; e++) this._onDestroyListeners[e]()
		}, l.prototype.addOnDestroyListener = function(t) {
			"function" == typeof t && this._onDestroyListeners.push(t)
		}, l
	}), i("dummy/require-less/less/dummy", [], function() {}), i("viewerCesiumNavigationMixin", ["Cesium/Core/defined", "Cesium/Core/defineProperties", "Cesium/Core/DeveloperError", "CesiumNavigation", "dummy/require-less/less/dummy"], function(t, e, i, n) {
		"use strict";

		function r(n, r) {
			if (!t(n)) throw new i("viewer is required.");
			var a = o(n, r);
			a.addOnDestroyListener(function(t) {
				return function() {
					delete t.cesiumNavigation
				}
			}(n)), e(n, {
				cesiumNavigation: {
					configurable: !0,
					get: function() {
						return n.cesiumWidget.cesiumNavigation
					}
				}
			})
		}
		r.mixinWidget = function(t, e) {
			return o.apply(void 0, arguments)
		};
		var o = function(i, r) {
				var o = new n(i, r),
					a = t(i.cesiumWidget) ? i.cesiumWidget : i;
				return e(a, {
					cesiumNavigation: {
						configurable: !0,
						get: function() {
							return o
						}
					}
				}), o.addOnDestroyListener(function(t) {
					return function() {
						delete t.cesiumNavigation
					}
				}(a)), o
			};
		return r
	}), function(t) {
		var e = document,
			i = "appendChild",
			n = "styleSheet",
			r = e.createElement("style");
		r.type = "text/css", e.getElementsByTagName("head")[0][i](r), r[n] ? r[n].cssText = t : r[i](e.createTextNode(t))
	}(".full-window{position:absolute;top:0;left:0;right:0;bottom:0;margin:0;overflow:hidden;padding:0;-webkit-transition:left .25s ease-out;-moz-transition:left .25s ease-out;-ms-transition:left .25s ease-out;-o-transition:left .25s ease-out;transition:left .25s ease-out}.transparent-to-input{pointer-events:none}.opaque-to-input{pointer-events:auto}.clickable{cursor:pointer}.markdown a:hover,.markdown u,a:hover{text-decoration:underline}.modal,.modal-background{top:0;left:0;bottom:0;right:0}.modal-background{pointer-events:auto;background-color:rgba(0,0,0,.5);z-index:1000;position:fixed}.modal{position:absolute;margin:auto;background-color:#2f353c;max-height:100%;max-width:100%;font-family:'Roboto',sans-serif;color:#fff}.modal-header{background-color:rgba(0,0,0,.2);border-bottom:1px solid rgba(100,100,100,.6);font-size:15px;line-height:40px;margin:0}.modal-header h1{font-size:15px;color:#fff;margin-left:15px}.modal-content{margin-left:15px;margin-right:15px;margin-bottom:15px;padding-top:15px;overflow:auto}.modal-close-button{position:absolute;right:15px;cursor:pointer;font-size:18px;color:#fff}#ui{z-index:2100}@media print{.full-window{position:initial}}.markdown img{max-width:100%}.markdown svg{max-height:100%}.markdown fieldset,.markdown input,.markdown select,.markdown textarea{font-family:inherit;font-size:1rem;box-sizing:border-box;margin-top:0;margin-bottom:0}.markdown label{vertical-align:middle}.markdown h1,.markdown h2,.markdown h3,.markdown h4,.markdown h5,.markdown h6{font-family:inherit;font-weight:700;line-height:1.25;margin-top:1em;margin-bottom:.5em}.markdown h1{font-size:2rem}.markdown h2{font-size:1.5rem}.markdown h3{font-size:1.25rem}.markdown h4{font-size:1rem}.markdown h5{font-size:.875rem}.markdown h6{font-size:.75rem}.markdown dl,.markdown ol,.markdown p,.markdown ul{margin-top:0;margin-bottom:1rem}.markdown strong{font-weight:700}.markdown em{font-style:italic}.markdown small{font-size:80%}.markdown mark{color:#000;background:#ff0}.markdown s{text-decoration:line-through}.markdown ol{list-style:decimal inside}.markdown ul{list-style:disc inside}.markdown code,.markdown pre,.markdown samp{font-family:monospace;font-size:inherit}.markdown pre{margin-top:0;margin-bottom:1rem;overflow-x:scroll}.markdown a{color:#68adfe;text-decoration:none}.markdown code,.markdown pre{background-color:transparent;border-radius:3px}.markdown hr{border:0;border-bottom-style:solid;border-bottom-width:1px;border-bottom-color:rgba(0,0,0,.125)}.markdown .left-align{text-align:left}.markdown .center{text-align:center}.markdown .right-align{text-align:right}.markdown .justify{text-align:justify}.markdown .truncate{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.markdown ol.upper-roman{list-style-type:upper-roman}.markdown ol.lower-alpha{list-style-type:lower-alpha}.markdown ul.circle{list-style-type:circle}.markdown ul.square{list-style-type:square}.markdown .list-reset{list-style:none;padding-left:0}.floating,.floating-horizontal,.floating-vertical{pointer-events:auto;position:absolute;border-radius:15px;background-color:rgba(47,53,60,.8)}.floating-horizontal{padding-left:5px;padding-right:5px}.floating-vertical{padding-top:5px;padding-bottom:5px}@media print{.floating{display:none}}.distance-legend{pointer-events:auto;position:absolute;border-radius:15px;background-color:rgba(47,53,60,.8);padding-left:5px;padding-right:5px;right:25px;bottom:30px;height:30px;width:125px;border:1px solid rgba(255,255,255,.1);box-sizing:content-box}.distance-legend-label{display:inline-block;font-size:13px;font-weight:lighter;line-height:30px;color:#ffffff;text-shadow: 5px 2px 6px #000;width:125px;text-align:center}.distance-legend-scale-bar{border-left:1px solid #fff;border-right:1px solid #fff;border-bottom:1px solid #fff;position:absolute;height:10px;top:15px}@media print{.distance-legend{display:none}}@media screen and (max-width:700px),screen and (max-height:420px){.distance-legend{display:none}}.navigation-controls{position:absolute;right:30px;top:210px;width:30px;border:1px solid rgba(255,255,255,.1);font-weight:300;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.navigation-control{cursor:pointer;border-bottom:1px solid #555}.naviagation-control:active{color:#fff}.navigation-control-last{cursor:pointer;border-bottom:0}.navigation-control-icon-zoom-in{padding-bottom:4px}.navigation-control-icon-zoom-in,.navigation-control-icon-zoom-out{position:relative;text-align:center;font-size:20px;color:#fff}.navigation-control-icon-reset{position:relative;left:10px;width:10px;height:10px;fill:rgba(255,255,255,.8);padding-top:6px;padding-bottom:6px;box-sizing:content-box}.compass,.compass-outer-ring{position:absolute;width:95px;height:95px}.compass{pointer-events:auto;right:0;overflow:hidden;top:100px}.compass-outer-ring{top:0;fill:rgba(255,255,255,.5)}.compass-outer-ring-background{position:absolute;top:14px;left:14px;width:44px;height:44px;border-radius:44px;border:12px solid rgba(47,53,60,.8);box-sizing:content-box}.compass-gyro{pointer-events:none;position:absolute;top:0;width:95px;height:95px;fill:#ccc}.compass-gyro-active,.compass-gyro-background:hover+.compass-gyro{fill:#68adfe}.compass-gyro-background{position:absolute;top:30px;left:30px;width:33px;height:33px;border-radius:33px;background-color:rgba(47,53,60,.8);border:1px solid rgba(255,255,255,.2);box-sizing:content-box}.compass-rotation-marker{position:absolute;top:0;width:95px;height:95px;fill:#68adfe}@media screen and (max-width:700px),screen and (max-height:420px){.compass,.navigation-controls{display:none}}@media print{.compass,.navigation-controls{display:none}}"), i("Cesium/Core/defined", function() {
		return Cesium.defined
	}), i("Cesium/Core/defineProperties", function() {
		return Cesium.defineProperties
	}), i("Cesium/Core/defaultValue", function() {
		return Cesium.defaultValue
	}), i("Cesium/Core/Event", function() {
		return Cesium.Event
	}), i("Cesium/Widgets/getElement", function() {
		return Cesium.getElement
	}), i("Cesium/Widgets/SvgPathBindingHandler", function() {
		return Cesium.SvgPathBindingHandler
	}), i("Cesium/Core/Ray", function() {
		return Cesium.Ray
	}), i("Cesium/Core/Cartesian3", function() {
		return Cesium.Cartesian3
	}), i("Cesium/Core/Cartographic", function() {
		return Cesium.Cartographic
	}), i("Cesium/Core/ReferenceFrame", function() {
		return Cesium.ReferenceFrame
	}), i("Cesium/Scene/SceneMode", function() {
		return Cesium.SceneMode
	}), i("Cesium/Core/DeveloperError", function() {
		return Cesium.DeveloperError
	}), i("Cesium/Core/EllipsoidGeodesic", function() {
		return Cesium.EllipsoidGeodesic
	}), i("Cesium/Core/Cartesian2", function() {
		return Cesium.Cartesian2
	}), i("Cesium/Core/getTimestamp", function() {
		return Cesium.getTimestamp
	}), i("Cesium/Core/EventHelper", function() {
		return Cesium.EventHelper
	}), i("Cesium/Core/Math", function() {
		return Cesium.Math
	}), i("Cesium/Core/Transforms", function() {
		return Cesium.Transforms
	}), i("Cesium/Core/Matrix4", function() {
		return Cesium.Matrix4
	}), i("Cesium/Core/BoundingSphere", function() {
		return Cesium.BoundingSphere
	}), i("Cesium/Core/HeadingPitchRange", function() {
		return Cesium.HeadingPitchRange
	}), i("Cesium/Scene/Camera", function() {
		return Cesium.Camera
	}), i("Cesium/Core/Rectangle", function() {
		return Cesium.Rectangle
	}), i("Cesium/Core/IntersectionTests", function() {
		return Cesium.IntersectionTests
	}), e("viewerCesiumNavigationMixin")
}), function(t, e) {
	"function" == typeof define && define.amd ? define([], e) : "object" == typeof module && module.exports ? module.exports = e() : t.pointconvert = e();
}(this, function() {
	var t = 52.35987755982988,
		e = 3.141592653589793,
		i = 6378245,
		n = .006693421622965943,
		r = function(t) {
			var e = Number(t[0]),
				i = Number(t[1]),
				n = 52.35987755982988,
				r = e - .0065,
				o = i - .006,
				a = Math.sqrt(r * r + o * o) - 2e-5 * Math.sin(o * n),
				s = Math.atan2(o, r) - 3e-6 * Math.cos(r * n),
				l = a * Math.cos(s),
				u = a * Math.sin(s);
			return l = Number(l.toFixed(6)), u = Number(u.toFixed(6)), [l, u]
		},
		o = function(e) {
			var i = Number(e[0]),
				n = Number(e[1]),
				r = Math.sqrt(i * i + n * n) + 2e-5 * Math.sin(n * t),
				o = Math.atan2(n, i) + 3e-6 * Math.cos(i * t),
				a = r * Math.cos(o) + .0065,
				s = r * Math.sin(o) + .006;
			return a = Number(a.toFixed(6)), s = Number(s.toFixed(6)), [a, s]
		},
		a = function(t) {
			var r = Number(t[0]),
				o = Number(t[1]);
			if (d(r, o)) return [r, o];
			var a = c(r - 105, o - 35),
				s = h(r - 105, o - 35),
				l = o / 180 * e,
				u = Math.sin(l);
			u = 1 - n * u * u;
			var p = Math.sqrt(u);
			a = 180 * a / (i * (1 - n) / (u * p) * e), s = 180 * s / (i / p * Math.cos(l) * e);
			var f = o + a,
				m = r + s;
			return m = Number(m.toFixed(6)), f = Number(f.toFixed(6)), [m, f]
		},
		s = function(t) {
			var r = Number(t[0]),
				o = Number(t[1]);
			if (d(r, o)) return [r, o];
			var a = c(r - 105, o - 35),
				s = h(r - 105, o - 35),
				l = o / 180 * e,
				u = Math.sin(l);
			u = 1 - n * u * u;
			var p = Math.sqrt(u);
			a = 180 * a / (i * (1 - n) / (u * p) * e), s = 180 * s / (i / p * Math.cos(l) * e), mglat = o + a, mglng = r + s;
			var f = 2 * r - mglng,
				m = 2 * o - mglat;
			return f = Number(f.toFixed(6)), m = Number(m.toFixed(6)), [f, m]
		},
		l = function(t) {
			return s(r(t))
		},
		u = function(t) {
			return o(a(t))
		},
		c = function(t, i) {
			var n = -100 + 2 * t + 3 * i + .2 * i * i + .1 * t * i + .2 * Math.sqrt(Math.abs(t));
			return n += 2 * (20 * Math.sin(6 * t * e) + 20 * Math.sin(2 * t * e)) / 3, n += 2 * (20 * Math.sin(i * e) + 40 * Math.sin(i / 3 * e)) / 3, n += 2 * (160 * Math.sin(i / 12 * e) + 320 * Math.sin(i * e / 30)) / 3
		},
		h = function(t, i) {
			var n = 300 + t + 2 * i + .1 * t * t + .1 * t * i + .1 * Math.sqrt(Math.abs(t));
			return n += 2 * (20 * Math.sin(6 * t * e) + 20 * Math.sin(2 * t * e)) / 3, n += 2 * (20 * Math.sin(t * e) + 40 * Math.sin(t / 3 * e)) / 3, n += 2 * (150 * Math.sin(t / 12 * e) + 300 * Math.sin(t / 30 * e)) / 3
		},
		d = function(t, e) {
			return t < 72.004 || t > 137.8347 || e < .8293 || e > 55.8271 || !1
		},
		p = function(t) {
			var i = Number(t[0]),
				n = Number(t[1]),
				r = 20037508.34 * i / 180,
				o = Math.log(Math.tan((90 + n) * e / 360)) / (e / 180);
			return o = 20037508.34 * o / 180, r = Number(r.toFixed(2)), o = Number(o.toFixed(2)), [r, o]
		},
		f = function(t) {
			var i = Number(t[0]),
				n = Number(t[1]),
				r = i / 20037508.34 * 180,
				o = n / 20037508.34 * 180;
			return o = 180 / e * (2 * Math.atan(Math.exp(o * e / 180)) - e / 2), r = Number(r.toFixed(6)), o = Number(o.toFixed(6)), [r, o]
		};
	return {
		jwd2mct: p,
		mct2jwd: f,
		bd2gcj: r,
		gcj2bd: o,
		bd2wgs: l,
		wgs2bd: u,
		wgs2gcj: a,
		gcj2wgs: s
	}
}), function(t, e) {
	"object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e(t.L = {})
}(this, function(t) {
	"use strict";

	function e(t) {
		var e, i, n, r;
		for (i = 1, n = arguments.length; i < n; i++) {
			r = arguments[i];
			for (e in r) t[e] = r[e]
		}
		return t
	}
	function i(t, e) {
		var i = Array.prototype.slice;
		if (t.bind) return t.bind.apply(t, i.call(arguments, 1));
		var n = i.call(arguments, 2);
		return function() {
			return t.apply(e, n.length ? n.concat(i.call(arguments)) : arguments)
		}
	}
	function n(t) {
		return t._leaflet_id = t._leaflet_id || ++Wt, t._leaflet_id
	}
	function r(t, e, i) {
		var n, r, o, a;
		return a = function() {
			n = !1, r && (o.apply(i, r), r = !1)
		}, o = function() {
			n ? r = arguments : (t.apply(i, arguments), setTimeout(a, e), n = !0)
		}
	}
	function o(t, e, i) {
		var n = e[1],
			r = e[0],
			o = n - r;
		return t === n && i ? t : ((t - r) % o + o) % o + r
	}
	function a() {
		return !1
	}
	function s(t, e) {
		var i = Math.pow(10, e || 5);
		return Math.round(t * i) / i
	}
	function l(t) {
		return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
	}
	function u(t) {
		return l(t).split(/\s+/)
	}
	function c(t, e) {
		t.hasOwnProperty("options") || (t.options = t.options ? Vt(t.options) : {});
		for (var i in e) t.options[i] = e[i];
		return t.options
	}
	function h(t, e, i) {
		var n = [];
		for (var r in t) n.push(encodeURIComponent(i ? r.toUpperCase() : r) + "=" + encodeURIComponent(t[r]));
		return (e && e.indexOf("?") !== -1 ? "&" : "?") + n.join("&")
	}
	function d(t, e) {
		if (null != t && null != e) return t.replace(Zt, function(t, i) {
			var n = e[i];
			if (void 0 === n) throw new Error("No value provided for variable " + t);
			return "function" == typeof n && (n = n(e)), n
		})
	}
	function p(t, e) {
		for (var i = 0; i < t.length; i++) if (t[i] === e) return i;
		return -1
	}
	function f(t) {
		return window["webkit" + t] || window["moz" + t] || window["ms" + t]
	}
	function m(t) {
		var e = +new Date,
			i = Math.max(0, 16 - (e - Jt));
		return Jt = e + i, window.setTimeout(t, i)
	}
	function g(t, e, n) {
		return n && Kt === m ? void t.call(e) : Kt.call(window, i(t, e))
	}
	function v(t) {
		t && Yt.call(window, t)
	}
	function _() {}
	function y(t) {
		if (L && L.Mixin) {
			t = Gt(t) ? t : [t];
			for (var e = 0; e < t.length; e++) t[e] === L.Mixin.Events && console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", (new Error).stack)
		}
	}
	function b(t, e, i) {
		this.x = i ? Math.round(t) : t, this.y = i ? Math.round(e) : e
	}
	function w(t, e, i) {
		return t instanceof b ? t : Gt(t) ? new b(t[0], t[1]) : void 0 === t || null === t ? t : "object" == typeof t && "x" in t && "y" in t ? new b(t.x, t.y) : new b(t, e, i)
	}
	function C(t, e) {
		if (t) for (var i = e ? [t, e] : t, n = 0, r = i.length; n < r; n++) this.extend(i[n])
	}
	function x(t, e) {
		return !t || t instanceof C ? t : new C(t, e)
	}
	function E(t, e) {
		if (t) for (var i = e ? [t, e] : t, n = 0, r = i.length; n < r; n++) this.extend(i[n])
	}
	function k(t, e) {
		return t instanceof E ? t : new E(t, e)
	}
	function P(t, e, i) {
		if (isNaN(t) || isNaN(e)) throw new Error("Invalid LatLng object: (" + t + ", " + e + ")");
		this.lat = +t, this.lng = +e, void 0 !== i && (this.alt = +i)
	}
	function D(t, e, i) {
		return t instanceof P ? t : Gt(t) && "object" != typeof t[0] ? 3 === t.length ? new P(t[0], t[1], t[2]) : 2 === t.length ? new P(t[0], t[1]) : null : void 0 === t || null === t ? t : "object" == typeof t && "lat" in t ? new P(t.lat, "lng" in t ? t.lng : t.lon, t.alt) : void 0 === e ? null : new P(t, e, i)
	}
	function T(t, e, i, n) {
		return Gt(t) ? (this._a = t[0], this._b = t[1], this._c = t[2], void(this._d = t[3])) : (this._a = t, this._b = e, this._c = i, void(this._d = n))
	}
	function S(t, e, i, n) {
		return new T(t, e, i, n)
	}
	function M(t) {
		return document.createElementNS("http://www.w3.org/2000/svg", t)
	}
	function A(t) {
		return navigator.userAgent.toLowerCase().indexOf(t) >= 0
	}
	function O(t, e, i, n) {
		return "touchstart" === e ? I(t, i, n) : "touchmove" === e ? U(t, i, n) : "touchend" === e && H(t, i, n), this
	}
	function N(t, e, i) {
		var n = t["_leaflet_" + e + i];
		return "touchstart" === e ? t.removeEventListener(He, n, !1) : "touchmove" === e ? t.removeEventListener(qe, n, !1) : "touchend" === e && (t.removeEventListener(je, n, !1), t.removeEventListener(Ve, n, !1)), this
	}
	function I(t, e, n) {
		var r = i(function(t) {
			if ("mouse" !== t.pointerType && t.pointerType !== t.MSPOINTER_TYPE_MOUSE && t.pointerType !== t.MSPOINTER_TYPE_MOUSE) {
				if (!(We.indexOf(t.target.tagName) < 0)) return;
				Y(t)
			}
			B(t, e)
		});
		t["_leaflet_touchstart" + n] = r, t.addEventListener(He, r, !1), Ge || (document.documentElement.addEventListener(He, R, !0), document.documentElement.addEventListener(qe, F, !0), document.documentElement.addEventListener(je, z, !0), document.documentElement.addEventListener(Ve, z, !0), Ge = !0)
	}
	function R(t) {
		Ze[t.pointerId] = t, $e++
	}
	function F(t) {
		Ze[t.pointerId] && (Ze[t.pointerId] = t)
	}
	function z(t) {
		delete Ze[t.pointerId], $e--
	}
	function B(t, e) {
		t.touches = [];
		for (var i in Ze) t.touches.push(Ze[i]);
		t.changedTouches = [t], e(t)
	}
	function U(t, e, i) {
		var n = function(t) {
				(t.pointerType !== t.MSPOINTER_TYPE_MOUSE && "mouse" !== t.pointerType || 0 !== t.buttons) && B(t, e)
			};
		t["_leaflet_touchmove" + i] = n, t.addEventListener(qe, n, !1)
	}
	function H(t, e, i) {
		var n = function(t) {
				B(t, e)
			};
		t["_leaflet_touchend" + i] = n, t.addEventListener(je, n, !1), t.addEventListener(Ve, n, !1)
	}
	function q(t, e, i) {
		function n(t) {
			var e;
			if (Ae) {
				if (!pe || "mouse" === t.pointerType) return;
				e = $e
			} else e = t.touches.length;
			if (!(e > 1)) {
				var i = Date.now(),
					n = i - (o || i);
				a = t.touches ? t.touches[0] : t, s = n > 0 && n <= l, o = i
			}
		}
		function r(t) {
			if (s && !a.cancelBubble) {
				if (Ae) {
					if (!pe || "mouse" === t.pointerType) return;
					var i, n, r = {};
					for (n in a) i = a[n], r[n] = i && i.bind ? i.bind(a) : i;
					a = r
				}
				a.type = "dblclick", e(a), o = null
			}
		}
		var o, a, s = !1,
			l = 250;
		return t[Ye + Je + i] = n, t[Ye + Ke + i] = r, t[Ye + "dblclick" + i] = e, t.addEventListener(Je, n, !1), t.addEventListener(Ke, r, !1), t.addEventListener("dblclick", e, !1), this
	}
	function j(t, e) {
		var i = t[Ye + Je + e],
			n = t[Ye + Ke + e],
			r = t[Ye + "dblclick" + e];
		return t.removeEventListener(Je, i, !1), t.removeEventListener(Ke, n, !1), pe || t.removeEventListener("dblclick", r, !1), this
	}
	function V(t, e, i, n) {
		if ("object" == typeof e) for (var r in e) Z(t, r, e[r], i);
		else {
			e = u(e);
			for (var o = 0, a = e.length; o < a; o++) Z(t, e[o], i, n)
		}
		return this
	}
	function W(t, e, i, n) {
		if ("object" == typeof e) for (var r in e) G(t, r, e[r], i);
		else if (e) {
			e = u(e);
			for (var o = 0, a = e.length; o < a; o++) G(t, e[o], i, n)
		} else {
			for (var s in t[Xe]) G(t, s, t[Xe][s]);
			delete t[Xe]
		}
		return this
	}
	function Z(t, e, i, r) {
		var o = e + n(i) + (r ? "_" + n(r) : "");
		if (t[Xe] && t[Xe][o]) return this;
		var a = function(e) {
				return i.call(r || t, e || window.event)
			},
			s = a;
		Ae && 0 === e.indexOf("touch") ? O(t, e, a, o) : !Oe || "dblclick" !== e || !q || Ae && _e ? "addEventListener" in t ? "mousewheel" === e ? t.addEventListener("onwheel" in t ? "wheel" : "mousewheel", a, !1) : "mouseenter" === e || "mouseleave" === e ? (a = function(e) {
			e = e || window.event, nt(t, e) && s(e)
		}, t.addEventListener("mouseenter" === e ? "mouseover" : "mouseout", a, !1)) : ("click" === e && me && (a = function(t) {
			rt(t, s)
		}), t.addEventListener(e, a, !1)) : "attachEvent" in t && t.attachEvent("on" + e, a) : q(t, a, o), t[Xe] = t[Xe] || {}, t[Xe][o] = a
	}
	function G(t, e, i, r) {
		var o = e + n(i) + (r ? "_" + n(r) : ""),
			a = t[Xe] && t[Xe][o];
		return a ? (Ae && 0 === e.indexOf("touch") ? N(t, e, o) : Oe && "dblclick" === e && j ? j(t, o) : "removeEventListener" in t ? "mousewheel" === e ? t.removeEventListener("onwheel" in t ? "wheel" : "mousewheel", a, !1) : t.removeEventListener("mouseenter" === e ? "mouseover" : "mouseleave" === e ? "mouseout" : e, a, !1) : "detachEvent" in t && t.detachEvent("on" + e, a), void(t[Xe][o] = null)) : this
	}
	function $(t) {
		return t.stopPropagation ? t.stopPropagation() : t.originalEvent ? t.originalEvent._stopped = !0 : t.cancelBubble = !0, it(t), this
	}
	function J(t) {
		return Z(t, "mousewheel", $), this
	}
	function K(t) {
		return V(t, "mousedown touchstart dblclick", $), Z(t, "click", et), this
	}
	function Y(t) {
		return t.preventDefault ? t.preventDefault() : t.returnValue = !1, this
	}
	function X(t) {
		return Y(t), $(t), this
	}
	function Q(t, e) {
		if (!e) return new b(t.clientX, t.clientY);
		var i = e.getBoundingClientRect();
		return new b(t.clientX - i.left - e.clientLeft, t.clientY - i.top - e.clientTop)
	}
	function tt(t) {
		return pe ? t.wheelDeltaY / 2 : t.deltaY && 0 === t.deltaMode ? -t.deltaY / Qe : t.deltaY && 1 === t.deltaMode ? 20 * -t.deltaY : t.deltaY && 2 === t.deltaMode ? 60 * -t.deltaY : t.deltaX || t.deltaZ ? 0 : t.wheelDelta ? (t.wheelDeltaY || t.wheelDelta) / 2 : t.detail && Math.abs(t.detail) < 32765 ? 20 * -t.detail : t.detail ? t.detail / -32765 * 60 : 0
	}
	function et(t) {
		ti[t.type] = !0
	}
	function it(t) {
		var e = ti[t.type];
		return ti[t.type] = !1, e
	}
	function nt(t, e) {
		var i = e.relatedTarget;
		if (!i) return !0;
		try {
			for (; i && i !== t;) i = i.parentNode
		} catch (n) {
			return !1
		}
		return i !== t
	}
	function rt(t, e) {
		var i = t.timeStamp || t.originalEvent && t.originalEvent.timeStamp,
			n = re && i - re;
		return n && n > 100 && n < 500 || t.target._simulatedClick && !t._simulated ? void X(t) : (re = i, void e(t))
	}
	function ot(t) {
		return "string" == typeof t ? document.getElementById(t) : t
	}
	function at(t, e) {
		var i = t.style[e] || t.currentStyle && t.currentStyle[e];
		if ((!i || "auto" === i) && document.defaultView) {
			var n = document.defaultView.getComputedStyle(t, null);
			i = n ? n[e] : null
		}
		return "auto" === i ? null : i
	}
	function st(t, e, i) {
		var n = document.createElement(t);
		return n.className = e || "", i && i.appendChild(n), n
	}
	function lt(t) {
		var e = t.parentNode;
		e && e.removeChild(t)
	}
	function ut(t) {
		for (; t.firstChild;) t.removeChild(t.firstChild)
	}
	function ct(t) {
		var e = t.parentNode;
		e.lastChild !== t && e.appendChild(t)
	}
	function ht(t) {
		var e = t.parentNode;
		e.firstChild !== t && e.insertBefore(t, e.firstChild)
	}
	function dt(t, e) {
		if (void 0 !== t.classList) return t.classList.contains(e);
		var i = gt(t);
		return i.length > 0 && new RegExp("(^|\\s)" + e + "(\\s|$)").test(i)
	}
	function pt(t, e) {
		if (void 0 !== t.classList) for (var i = u(e), n = 0, r = i.length; n < r; n++) t.classList.add(i[n]);
		else if (!dt(t, e)) {
			var o = gt(t);
			mt(t, (o ? o + " " : "") + e)
		}
	}
	function ft(t, e) {
		void 0 !== t.classList ? t.classList.remove(e) : mt(t, l((" " + gt(t) + " ").replace(" " + e + " ", " ")))
	}
	function mt(t, e) {
		void 0 === t.className.baseVal ? t.className = e : t.className.baseVal = e
	}
	function gt(t) {
		return void 0 === t.className.baseVal ? t.className : t.className.baseVal
	}
	function vt(t, e) {
		"opacity" in t.style ? t.style.opacity = e : "filter" in t.style && _t(t, e)
	}
	function _t(t, e) {
		var i = !1,
			n = "DXImageTransform.Microsoft.Alpha";
		try {
			i = t.filters.item(n)
		} catch (r) {
			if (1 === e) return
		}
		e = Math.round(100 * e), i ? (i.Enabled = 100 !== e, i.Opacity = e) : t.style.filter += " progid:" + n + "(opacity=" + e + ")"
	}
	function yt(t) {
		for (var e = document.documentElement.style, i = 0; i < t.length; i++) if (t[i] in e) return t[i];
		return !1
	}
	function bt(t, e, i) {
		var n = e || new b(0, 0);
		t.style[ii] = (Ee ? "translate(" + n.x + "px," + n.y + "px)" : "translate3d(" + n.x + "px," + n.y + "px,0)") + (i ? " scale(" + i + ")" : "")
	}
	function wt(t, e) {
		t._leaflet_pos = e, Pe ? bt(t, e) : (t.style.left = e.x + "px", t.style.top = e.y + "px")
	}
	function Ct(t) {
		return t._leaflet_pos || new b(0, 0)
	}
	function xt() {
		V(window, "dragstart", Y)
	}
	function Et() {
		W(window, "dragstart", Y)
	}
	function kt(t) {
		for (; t.tabIndex === -1;) t = t.parentNode;
		t.style && (Lt(), ai = t, si = t.style.outline, t.style.outline = "none", V(window, "keydown", Lt))
	}
	function Lt() {
		ai && (ai.style.outline = si, ai = void 0, si = void 0, W(window, "keydown", Lt))
	}
	function Pt(t, e) {
		if (!e || !t.length) return t.slice();
		var i = e * e;
		return t = At(t, i), t = St(t, i)
	}
	function Dt(t, e, i) {
		return Math.sqrt(Ft(t, e, i, !0))
	}
	function Tt(t, e, i) {
		return Ft(t, e, i)
	}
	function St(t, e) {
		var i = t.length,
			n = typeof Uint8Array != void 0 + "" ? Uint8Array : Array,
			r = new n(i);
		r[0] = r[i - 1] = 1, Mt(t, r, e, 0, i - 1);
		var o, a = [];
		for (o = 0; o < i; o++) r[o] && a.push(t[o]);
		return a
	}
	function Mt(t, e, i, n, r) {
		var o, a, s, l = 0;
		for (a = n + 1; a <= r - 1; a++) s = Ft(t[a], t[n], t[r], !0), s > l && (o = a, l = s);
		l > i && (e[o] = 1, Mt(t, e, i, n, o), Mt(t, e, i, o, r))
	}
	function At(t, e) {
		for (var i = [t[0]], n = 1, r = 0, o = t.length; n < o; n++) Rt(t[n], t[r]) > e && (i.push(t[n]), r = n);
		return r < o - 1 && i.push(t[o - 1]), i
	}
	function Ot(t, e, i, n, r) {
		var o, a, s, l = n ? li : It(t, i),
			u = It(e, i);
		for (li = u;;) {
			if (!(l | u)) return [t, e];
			if (l & u) return !1;
			o = l || u, a = Nt(t, e, o, i, r), s = It(a, i), o === l ? (t = a, l = s) : (e = a, u = s)
		}
	}
	function Nt(t, e, i, n, r) {
		var o, a, s = e.x - t.x,
			l = e.y - t.y,
			u = n.min,
			c = n.max;
		return 8 & i ? (o = t.x + s * (c.y - t.y) / l, a = c.y) : 4 & i ? (o = t.x + s * (u.y - t.y) / l, a = u.y) : 2 & i ? (o = c.x, a = t.y + l * (c.x - t.x) / s) : 1 & i && (o = u.x, a = t.y + l * (u.x - t.x) / s), new b(o, a, r)
	}
	function It(t, e) {
		var i = 0;
		return t.x < e.min.x ? i |= 1 : t.x > e.max.x && (i |= 2), t.y < e.min.y ? i |= 4 : t.y > e.max.y && (i |= 8), i
	}
	function Rt(t, e) {
		var i = e.x - t.x,
			n = e.y - t.y;
		return i * i + n * n
	}
	function Ft(t, e, i, n) {
		var r, o = e.x,
			a = e.y,
			s = i.x - o,
			l = i.y - a,
			u = s * s + l * l;
		return u > 0 && (r = ((t.x - o) * s + (t.y - a) * l) / u, r > 1 ? (o = i.x, a = i.y) : r > 0 && (o += s * r, a += l * r)), s = t.x - o, l = t.y - a, n ? s * s + l * l : new b(o, a)
	}
	function zt(t) {
		return !Gt(t[0]) || "object" != typeof t[0][0] && "undefined" != typeof t[0][0]
	}
	function Bt(t) {
		return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."), zt(t)
	}
	function Ut(t, e, i) {
		var n, r, o, a, s, l, u, c, h, d = [1, 4, 2, 8];
		for (r = 0, u = t.length; r < u; r++) t[r]._code = It(t[r], e);
		for (a = 0; a < 4; a++) {
			for (c = d[a], n = [], r = 0, u = t.length, o = u - 1; r < u; o = r++) s = t[r], l = t[o], s._code & c ? l._code & c || (h = Nt(l, s, c, e, i), h._code = It(h, e), n.push(h)) : (l._code & c && (h = Nt(l, s, c, e, i), h._code = It(h, e), n.push(h)), n.push(s));
			t = n
		}
		return t
	}
	function Ht() {
		return window.L = gi, this
	}
	var qt = "1.2.0+HEAD.1ac320b",
		jt = Object.freeze;
	Object.freeze = function(t) {
		return t
	};
	var Vt = Object.create ||
	function() {
		function t() {}
		return function(e) {
			return t.prototype = e, new t
		}
	}(), Wt = 0, Zt = /\{ *([\w_\-]+) *\}/g, Gt = Array.isArray ||
	function(t) {
		return "[object Array]" === Object.prototype.toString.call(t)
	}, $t = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=", Jt = 0, Kt = window.requestAnimationFrame || f("RequestAnimationFrame") || m, Yt = window.cancelAnimationFrame || f("CancelAnimationFrame") || f("CancelRequestAnimationFrame") ||
	function(t) {
		window.clearTimeout(t)
	}, Xt = (Object.freeze || Object)({
		freeze: jt,
		extend: e,
		create: Vt,
		bind: i,
		lastId: Wt,
		stamp: n,
		throttle: r,
		wrapNum: o,
		falseFn: a,
		formatNum: s,
		trim: l,
		splitWords: u,
		setOptions: c,
		getParamString: h,
		template: d,
		isArray: Gt,
		indexOf: p,
		emptyImageUrl: $t,
		requestFn: Kt,
		cancelFn: Yt,
		requestAnimFrame: g,
		cancelAnimFrame: v
	});
	_.extend = function(t) {
		var i = function() {
				this.initialize && this.initialize.apply(this, arguments), this.callInitHooks()
			},
			n = i.__super__ = this.prototype,
			r = Vt(n);
		r.constructor = i, i.prototype = r;
		for (var o in this) this.hasOwnProperty(o) && "prototype" !== o && "__super__" !== o && (i[o] = this[o]);
		return t.statics && (e(i, t.statics), delete t.statics), t.includes && (y(t.includes), e.apply(null, [r].concat(t.includes)), delete t.includes), r.options && (t.options = e(Vt(r.options), t.options)), e(r, t), r._initHooks = [], r.callInitHooks = function() {
			if (!this._initHooksCalled) {
				n.callInitHooks && n.callInitHooks.call(this), this._initHooksCalled = !0;
				for (var t = 0, e = r._initHooks.length; t < e; t++) r._initHooks[t].call(this)
			}
		}, i
	}, _.include = function(t) {
		return e(this.prototype, t), this
	}, _.mergeOptions = function(t) {
		return e(this.prototype.options, t), this
	}, _.addInitHook = function(t) {
		var e = Array.prototype.slice.call(arguments, 1),
			i = "function" == typeof t ? t : function() {
				this[t].apply(this, e)
			};
		return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(i), this
	};
	var Qt = {
		on: function(t, e, i) {
			if ("object" == typeof t) for (var n in t) this._on(n, t[n], e);
			else {
				t = u(t);
				for (var r = 0, o = t.length; r < o; r++) this._on(t[r], e, i)
			}
			return this
		},
		off: function(t, e, i) {
			if (t) if ("object" == typeof t) for (var n in t) this._off(n, t[n], e);
			else {
				t = u(t);
				for (var r = 0, o = t.length; r < o; r++) this._off(t[r], e, i)
			} else delete this._events;
			return this
		},
		_on: function(t, e, i) {
			this._events = this._events || {};
			var n = this._events[t];
			n || (n = [], this._events[t] = n), i === this && (i = void 0);
			for (var r = {
				fn: e,
				ctx: i
			}, o = n, a = 0, s = o.length; a < s; a++) if (o[a].fn === e && o[a].ctx === i) return;
			o.push(r)
		},
		_off: function(t, e, i) {
			var n, r, o;
			if (this._events && (n = this._events[t])) {
				if (!e) {
					for (r = 0, o = n.length; r < o; r++) n[r].fn = a;
					return void delete this._events[t]
				}
				if (i === this && (i = void 0), n) for (r = 0, o = n.length; r < o; r++) {
					var s = n[r];
					if (s.ctx === i && s.fn === e) return s.fn = a, this._firingCount && (this._events[t] = n = n.slice()), void n.splice(r, 1)
				}
			}
		},
		fire: function(t, i, n) {
			if (!this.listens(t, n)) return this;
			var r = e({}, i, {
				type: t,
				target: this
			});
			if (this._events) {
				var o = this._events[t];
				if (o) {
					this._firingCount = this._firingCount + 1 || 1;
					for (var a = 0, s = o.length; a < s; a++) {
						var l = o[a];
						l.fn.call(l.ctx || this, r)
					}
					this._firingCount--
				}
			}
			return n && this._propagateEvent(r), this
		},
		listens: function(t, e) {
			var i = this._events && this._events[t];
			if (i && i.length) return !0;
			if (e) for (var n in this._eventParents) if (this._eventParents[n].listens(t, e)) return !0;
			return !1
		},
		once: function(t, e, n) {
			if ("object" == typeof t) {
				for (var r in t) this.once(r, t[r], e);
				return this
			}
			var o = i(function() {
				this.off(t, e, n).off(t, o, n)
			}, this);
			return this.on(t, e, n).on(t, o, n)
		},
		addEventParent: function(t) {
			return this._eventParents = this._eventParents || {}, this._eventParents[n(t)] = t, this
		},
		removeEventParent: function(t) {
			return this._eventParents && delete this._eventParents[n(t)], this
		},
		_propagateEvent: function(t) {
			for (var i in this._eventParents) this._eventParents[i].fire(t.type, e({
				layer: t.target
			}, t), !0)
		}
	};
	Qt.addEventListener = Qt.on, Qt.removeEventListener = Qt.clearAllEventListeners = Qt.off, Qt.addOneTimeEventListener = Qt.once, Qt.fireEvent = Qt.fire, Qt.hasEventListeners = Qt.listens;
	var te = _.extend(Qt);
	b.prototype = {
		clone: function() {
			return new b(this.x, this.y)
		},
		add: function(t) {
			return this.clone()._add(w(t))
		},
		_add: function(t) {
			return this.x += t.x, this.y += t.y, this
		},
		subtract: function(t) {
			return this.clone()._subtract(w(t))
		},
		_subtract: function(t) {
			return this.x -= t.x, this.y -= t.y, this
		},
		divideBy: function(t) {
			return this.clone()._divideBy(t)
		},
		_divideBy: function(t) {
			return this.x /= t, this.y /= t, this
		},
		multiplyBy: function(t) {
			return this.clone()._multiplyBy(t)
		},
		_multiplyBy: function(t) {
			return this.x *= t, this.y *= t, this
		},
		scaleBy: function(t) {
			return new b(this.x * t.x, this.y * t.y)
		},
		unscaleBy: function(t) {
			return new b(this.x / t.x, this.y / t.y)
		},
		round: function() {
			return this.clone()._round()
		},
		_round: function() {
			return this.x = Math.round(this.x), this.y = Math.round(this.y), this
		},
		floor: function() {
			return this.clone()._floor()
		},
		_floor: function() {
			return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
		},
		ceil: function() {
			return this.clone()._ceil()
		},
		_ceil: function() {
			return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this
		},
		distanceTo: function(t) {
			t = w(t);
			var e = t.x - this.x,
				i = t.y - this.y;
			return Math.sqrt(e * e + i * i)
		},
		equals: function(t) {
			return t = w(t), t.x === this.x && t.y === this.y
		},
		contains: function(t) {
			return t = w(t), Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y)
		},
		toString: function() {
			return "Point(" + s(this.x) + ", " + s(this.y) + ")"
		}
	}, C.prototype = {
		extend: function(t) {
			return t = w(t), this.min || this.max ? (this.min.x = Math.min(t.x, this.min.x), this.max.x = Math.max(t.x, this.max.x), this.min.y = Math.min(t.y, this.min.y), this.max.y = Math.max(t.y, this.max.y)) : (this.min = t.clone(), this.max = t.clone()), this
		},
		getCenter: function(t) {
			return new b((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, t)
		},
		getBottomLeft: function() {
			return new b(this.min.x, this.max.y)
		},
		getTopRight: function() {
			return new b(this.max.x, this.min.y)
		},
		getTopLeft: function() {
			return this.min
		},
		getBottomRight: function() {
			return this.max
		},
		getSize: function() {
			return this.max.subtract(this.min)
		},
		contains: function(t) {
			var e, i;
			return t = "number" == typeof t[0] || t instanceof b ? w(t) : x(t), t instanceof C ? (e = t.min, i = t.max) : e = i = t, e.x >= this.min.x && i.x <= this.max.x && e.y >= this.min.y && i.y <= this.max.y
		},
		intersects: function(t) {
			t = x(t);
			var e = this.min,
				i = this.max,
				n = t.min,
				r = t.max,
				o = r.x >= e.x && n.x <= i.x,
				a = r.y >= e.y && n.y <= i.y;
			return o && a
		},
		overlaps: function(t) {
			t = x(t);
			var e = this.min,
				i = this.max,
				n = t.min,
				r = t.max,
				o = r.x > e.x && n.x < i.x,
				a = r.y > e.y && n.y < i.y;
			return o && a
		},
		isValid: function() {
			return !(!this.min || !this.max)
		}
	}, E.prototype = {
		extend: function(t) {
			var e, i, n = this._southWest,
				r = this._northEast;
			if (t instanceof P) e = t, i = t;
			else {
				if (!(t instanceof E)) return t ? this.extend(D(t) || k(t)) : this;
				if (e = t._southWest, i = t._northEast, !e || !i) return this
			}
			return n || r ? (n.lat = Math.min(e.lat, n.lat), n.lng = Math.min(e.lng, n.lng), r.lat = Math.max(i.lat, r.lat), r.lng = Math.max(i.lng, r.lng)) : (this._southWest = new P(e.lat, e.lng), this._northEast = new P(i.lat, i.lng)), this
		},
		pad: function(t) {
			var e = this._southWest,
				i = this._northEast,
				n = Math.abs(e.lat - i.lat) * t,
				r = Math.abs(e.lng - i.lng) * t;
			return new E(new P(e.lat - n, e.lng - r), new P(i.lat + n, i.lng + r))
		},
		getCenter: function() {
			return new P((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2)
		},
		getSouthWest: function() {
			return this._southWest
		},
		getNorthEast: function() {
			return this._northEast
		},
		getNorthWest: function() {
			return new P(this.getNorth(), this.getWest())
		},
		getSouthEast: function() {
			return new P(this.getSouth(), this.getEast())
		},
		getWest: function() {
			return this._southWest.lng
		},
		getSouth: function() {
			return this._southWest.lat
		},
		getEast: function() {
			return this._northEast.lng
		},
		getNorth: function() {
			return this._northEast.lat
		},
		contains: function(t) {
			t = "number" == typeof t[0] || t instanceof P || "lat" in t ? D(t) : k(t);
			var e, i, n = this._southWest,
				r = this._northEast;
			return t instanceof E ? (e = t.getSouthWest(), i = t.getNorthEast()) : e = i = t, e.lat >= n.lat && i.lat <= r.lat && e.lng >= n.lng && i.lng <= r.lng
		},
		intersects: function(t) {
			t = k(t);
			var e = this._southWest,
				i = this._northEast,
				n = t.getSouthWest(),
				r = t.getNorthEast(),
				o = r.lat >= e.lat && n.lat <= i.lat,
				a = r.lng >= e.lng && n.lng <= i.lng;
			return o && a
		},
		overlaps: function(t) {
			t = k(t);
			var e = this._southWest,
				i = this._northEast,
				n = t.getSouthWest(),
				r = t.getNorthEast(),
				o = r.lat > e.lat && n.lat < i.lat,
				a = r.lng > e.lng && n.lng < i.lng;
			return o && a
		},
		toBBoxString: function() {
			return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",")
		},
		equals: function(t, e) {
			return !!t && (t = k(t), this._southWest.equals(t.getSouthWest(), e) && this._northEast.equals(t.getNorthEast(), e))
		},
		isValid: function() {
			return !(!this._southWest || !this._northEast)
		}
	}, P.prototype = {
		equals: function(t, e) {
			if (!t) return !1;
			t = D(t);
			var i = Math.max(Math.abs(this.lat - t.lat), Math.abs(this.lng - t.lng));
			return i <= (void 0 === e ? 1e-9 : e)
		},
		toString: function(t) {
			return "LatLng(" + s(this.lat, t) + ", " + s(this.lng, t) + ")"
		},
		distanceTo: function(t) {
			return ie.distance(this, D(t))
		},
		wrap: function() {
			return ie.wrapLatLng(this)
		},
		toBounds: function(t) {
			var e = 180 * t / 40075017,
				i = e / Math.cos(Math.PI / 180 * this.lat);
			return k([this.lat - e, this.lng - i], [this.lat + e, this.lng + i])
		},
		clone: function() {
			return new P(this.lat, this.lng, this.alt)
		}
	};
	var ee = {
		latLngToPoint: function(t, e) {
			var i = this.projection.project(t),
				n = this.scale(e);
			return this.transformation._transform(i, n)
		},
		pointToLatLng: function(t, e) {
			var i = this.scale(e),
				n = this.transformation.untransform(t, i);
			return this.projection.unproject(n)
		},
		project: function(t) {
			return this.projection.project(t)
		},
		unproject: function(t) {
			return this.projection.unproject(t)
		},
		scale: function(t) {
			return 256 * Math.pow(2, t)
		},
		zoom: function(t) {
			return Math.log(t / 256) / Math.LN2
		},
		getProjectedBounds: function(t) {
			if (this.infinite) return null;
			var e = this.projection.bounds,
				i = this.scale(t),
				n = this.transformation.transform(e.min, i),
				r = this.transformation.transform(e.max, i);
			return new C(n, r)
		},
		infinite: !1,
		wrapLatLng: function(t) {
			var e = this.wrapLng ? o(t.lng, this.wrapLng, !0) : t.lng,
				i = this.wrapLat ? o(t.lat, this.wrapLat, !0) : t.lat,
				n = t.alt;
			return new P(i, e, n)
		},
		wrapLatLngBounds: function(t) {
			var e = t.getCenter(),
				i = this.wrapLatLng(e),
				n = e.lat - i.lat,
				r = e.lng - i.lng;
			if (0 === n && 0 === r) return t;
			var o = t.getSouthWest(),
				a = t.getNorthEast(),
				s = new P(o.lat - n, o.lng - r),
				l = new P(a.lat - n, a.lng - r);
			return new E(s, l)
		}
	},
		ie = e({}, ee, {
			wrapLng: [-180, 180],
			R: 6371e3,
			distance: function(t, e) {
				var i = Math.PI / 180,
					n = t.lat * i,
					r = e.lat * i,
					o = Math.sin(n) * Math.sin(r) + Math.cos(n) * Math.cos(r) * Math.cos((e.lng - t.lng) * i);
				return this.R * Math.acos(Math.min(o, 1))
			}
		}),
		ne = {
			R: 6378137,
			MAX_LATITUDE: 85.0511287798,
			project: function(t) {
				var e = Math.PI / 180,
					i = this.MAX_LATITUDE,
					n = Math.max(Math.min(i, t.lat), -i),
					r = Math.sin(n * e);
				return new b(this.R * t.lng * e, this.R * Math.log((1 + r) / (1 - r)) / 2)
			},
			unproject: function(t) {
				var e = 180 / Math.PI;
				return new P((2 * Math.atan(Math.exp(t.y / this.R)) - Math.PI / 2) * e, t.x * e / this.R)
			},
			bounds: function() {
				var t = 6378137 * Math.PI;
				return new C([-t, -t], [t, t])
			}()
		};
	T.prototype = {
		transform: function(t, e) {
			return this._transform(t.clone(), e)
		},
		_transform: function(t, e) {
			return e = e || 1, t.x = e * (this._a * t.x + this._b), t.y = e * (this._c * t.y + this._d), t
		},
		untransform: function(t, e) {
			return e = e || 1, new b((t.x / e - this._b) / this._a, (t.y / e - this._d) / this._c)
		}
	};
	var re, oe, ae, se, le = e({}, ie, {
		code: "EPSG:3857",
		projection: ne,
		transformation: function() {
			var t = .5 / (Math.PI * ne.R);
			return S(t, .5, -t, .5)
		}()
	}),
		ue = e({}, le, {
			code: "EPSG:900913"
		}),
		ce = document.documentElement.style,
		he = "ActiveXObject" in window,
		de = he && !document.addEventListener,
		pe = "msLaunchUri" in navigator && !("documentMode" in document),
		fe = A("webkit"),
		me = A("android"),
		ge = A("android 2") || A("android 3"),
		ve = !! window.opera,
		_e = A("chrome"),
		ye = A("gecko") && !fe && !ve && !he,
		be = !_e && A("safari"),
		we = A("phantom"),
		Ce = "OTransition" in ce,
		xe = 0 === navigator.platform.indexOf("Win"),
		Ee = he && "transition" in ce,
		ke = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix && !ge,
		Le = "MozPerspective" in ce,
		Pe = !window.L_DISABLE_3D && (Ee || ke || Le) && !Ce && !we,
		De = "undefined" != typeof orientation || A("mobile"),
		Te = De && fe,
		Se = De && ke,
		Me = !window.PointerEvent && window.MSPointerEvent,
		Ae = !(!window.PointerEvent && !Me),
		Oe = !window.L_NO_TOUCH && (Ae || "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch),
		Ne = De && ve,
		Ie = De && ye,
		Re = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1,
		Fe = function() {
			return !!document.createElement("canvas").getContext
		}(),
		ze = !(!document.createElementNS || !M("svg").createSVGRect),
		Be = !ze &&
	function() {
		try {
			var t = document.createElement("div");
			t.innerHTML = '<v:shape adj="1"/>';
			var e = t.firstChild;
			return e.style.behavior = "url(#default#VML)", e && "object" == typeof e.adj
		} catch (i) {
			return !1
		}
	}(), Ue = (Object.freeze || Object)({
		ie: he,
		ielt9: de,
		edge: pe,
		webkit: fe,
		android: me,
		android23: ge,
		opera: ve,
		chrome: _e,
		gecko: ye,
		safari: be,
		phantom: we,
		opera12: Ce,
		win: xe,
		ie3d: Ee,
		webkit3d: ke,
		gecko3d: Le,
		any3d: Pe,
		mobile: De,
		mobileWebkit: Te,
		mobileWebkit3d: Se,
		msPointer: Me,
		pointer: Ae,
		touch: Oe,
		mobileOpera: Ne,
		mobileGecko: Ie,
		retina: Re,
		canvas: Fe,
		svg: ze,
		vml: Be
	}), He = Me ? "MSPointerDown" : "pointerdown", qe = Me ? "MSPointerMove" : "pointermove", je = Me ? "MSPointerUp" : "pointerup", Ve = Me ? "MSPointerCancel" : "pointercancel", We = ["INPUT", "SELECT", "OPTION"], Ze = {}, Ge = !1, $e = 0, Je = Me ? "MSPointerDown" : Ae ? "pointerdown" : "touchstart", Ke = Me ? "MSPointerUp" : Ae ? "pointerup" : "touchend", Ye = "_leaflet_", Xe = "_leaflet_events", Qe = xe && _e ? 2 * window.devicePixelRatio : ye ? window.devicePixelRatio : 1, ti = {}, ei = (Object.freeze || Object)({
		on: V,
		off: W,
		stopPropagation: $,
		disableScrollPropagation: J,
		disableClickPropagation: K,
		preventDefault: Y,
		stop: X,
		getMousePosition: Q,
		getWheelDelta: tt,
		fakeStop: et,
		skipped: it,
		isExternalTarget: nt,
		addListener: V,
		removeListener: W
	}), ii = yt(["transform", "WebkitTransform", "OTransform", "MozTransform", "msTransform"]), ni = yt(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]), ri = "webkitTransition" === ni || "OTransition" === ni ? ni + "End" : "transitionend";
	if ("onselectstart" in document) oe = function() {
		V(window, "selectstart", Y)
	}, ae = function() {
		W(window, "selectstart", Y)
	};
	else {
		var oi = yt(["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]);
		oe = function() {
			if (oi) {
				var t = document.documentElement.style;
				se = t[oi], t[oi] = "none"
			}
		}, ae = function() {
			oi && (document.documentElement.style[oi] = se, se = void 0)
		}
	}
	var ai, si, li, ui = (Object.freeze || Object)({
		TRANSFORM: ii,
		TRANSITION: ni,
		TRANSITION_END: ri,
		get: ot,
		getStyle: at,
		create: st,
		remove: lt,
		empty: ut,
		toFront: ct,
		toBack: ht,
		hasClass: dt,
		addClass: pt,
		removeClass: ft,
		setClass: mt,
		getClass: gt,
		setOpacity: vt,
		testProp: yt,
		setTransform: bt,
		setPosition: wt,
		getPosition: Ct,
		disableTextSelection: oe,
		enableTextSelection: ae,
		disableImageDrag: xt,
		enableImageDrag: Et,
		preventOutline: kt,
		restoreOutline: Lt
	}),
		ci = te.extend({
			run: function(t, e, i, n) {
				this.stop(), this._el = t, this._inProgress = !0, this._duration = i || .25, this._easeOutPower = 1 / Math.max(n || .5, .2), this._startPos = Ct(t), this._offset = e.subtract(this._startPos), this._startTime = +new Date, this.fire("start"), this._animate()
			},
			stop: function() {
				this._inProgress && (this._step(!0), this._complete())
			},
			_animate: function() {
				this._animId = g(this._animate, this), this._step()
			},
			_step: function(t) {
				var e = +new Date - this._startTime,
					i = 1e3 * this._duration;
				e < i ? this._runFrame(this._easeOut(e / i), t) : (this._runFrame(1), this._complete())
			},
			_runFrame: function(t, e) {
				var i = this._startPos.add(this._offset.multiplyBy(t));
				e && i._round(), wt(this._el, i), this.fire("step")
			},
			_complete: function() {
				v(this._animId), this._inProgress = !1, this.fire("end")
			},
			_easeOut: function(t) {
				return 1 - Math.pow(1 - t, this._easeOutPower)
			}
		}),
		hi = ((Object.freeze || Object)({
			simplify: Pt,
			pointToSegmentDistance: Dt,
			closestPointOnSegment: Tt,
			clipSegment: Ot,
			_getEdgeIntersection: Nt,
			_getBitCode: It,
			_sqClosestPointOnSegment: Ft,
			isFlat: zt,
			_flat: Bt
		}), (Object.freeze || Object)({
			clipPolygon: Ut
		}), {
			project: function(t) {
				return new b(t.lng, t.lat)
			},
			unproject: function(t) {
				return new P(t.y, t.x)
			},
			bounds: new C([-180, -90], [180, 90])
		}),
		di = {
			R: 6378137,
			R_MINOR: 6356752.314245179,
			bounds: new C([-20037508.34279, -15496570.73972], [20037508.34279, 18764656.23138]),
			project: function(t) {
				var e = Math.PI / 180,
					i = this.R,
					n = t.lat * e,
					r = this.R_MINOR / i,
					o = Math.sqrt(1 - r * r),
					a = o * Math.sin(n),
					s = Math.tan(Math.PI / 4 - n / 2) / Math.pow((1 - a) / (1 + a), o / 2);
				return n = -i * Math.log(Math.max(s, 1e-10)), new b(t.lng * e * i, n)
			},
			unproject: function(t) {
				for (var e, i = 180 / Math.PI, n = this.R, r = this.R_MINOR / n, o = Math.sqrt(1 - r * r), a = Math.exp(-t.y / n), s = Math.PI / 2 - 2 * Math.atan(a), l = 0, u = .1; l < 15 && Math.abs(u) > 1e-7; l++) e = o * Math.sin(s), e = Math.pow((1 - e) / (1 + e), o / 2), u = Math.PI / 2 - 2 * Math.atan(a * e) - s, s += u;
				return new P(s * i, t.x * i / n)
			}
		},
		pi = ((Object.freeze || Object)({
			LonLat: hi,
			Mercator: di,
			SphericalMercator: ne
		}), e({}, ie, {
			code: "EPSG:3395",
			projection: di,
			transformation: function() {
				var t = .5 / (Math.PI * di.R);
				return S(t, .5, -t, .5)
			}()
		})),
		fi = e({}, ie, {
			code: "EPSG:4326",
			projection: hi,
			transformation: S(1 / 180, 1, -1 / 180, .5)
		}),
		mi = e({}, ee, {
			projection: hi,
			transformation: S(1, 0, -1, 0),
			scale: function(t) {
				return Math.pow(2, t)
			},
			zoom: function(t) {
				return Math.log(t) / Math.LN2
			},
			distance: function(t, e) {
				var i = e.lng - t.lng,
					n = e.lat - t.lat;
				return Math.sqrt(i * i + n * n)
			},
			infinite: !0
		});
	ee.Earth = ie, ee.EPSG3395 = pi, ee.EPSG3857 = le, ee.EPSG900913 = ue, ee.EPSG4326 = fi, ee.Simple = mi;
	var gi = window.L;
	window.L = t, Object.freeze = jt, t.version = qt, t.noConflict = Ht, t.Browser = Ue, t.Evented = te, t.Util = Xt, t.Class = _, t.extend = e, t.bind = i, t.stamp = n, t.setOptions = c, t.DomEvent = ei, t.DomUtil = ui, t.PosAnimation = ci, t.Point = b, t.point = w, t.Bounds = C, t.bounds = x, t.Transformation = T, t.transformation = S, t.LatLng = P, t.latLng = D, t.LatLngBounds = E, t.latLngBounds = k, t.CRS = ee
}), function(t, e) {
	"object" == typeof exports && "undefined" != typeof module ? e(exports, require("leaflet")) : "function" == typeof define && define.amd ? define(["exports", "leaflet"], e) : e((t.L = t.L || {}, t.L.esri = t.L.esri || {}), t.L)
}(this, function(t, e) {
	"use strict";

	function i(t) {
		var e = "";
		t.f = t.f || "json";
		for (var i in t) if (t.hasOwnProperty(i)) {
			var n, r = t[i],
				o = Object.prototype.toString.call(r);
			e.length && (e += "&"), n = "[object Array]" === o ? "[object Object]" === Object.prototype.toString.call(r[0]) ? JSON.stringify(r) : r.join(",") : "[object Object]" === o ? JSON.stringify(r) : "[object Date]" === o ? r.valueOf() : r, e += encodeURIComponent(i) + "=" + encodeURIComponent(n)
		}
		return e
	}
	function n(t, i) {
		var n = new window.XMLHttpRequest;
		return n.onerror = function(r) {
			n.onreadystatechange = e.Util.falseFn, t.call(i, {
				error: {
					code: 500,
					message: "XMLHttpRequest error"
				}
			}, null)
		}, n.onreadystatechange = function() {
			var r, o;
			if (4 === n.readyState) {
				try {
					r = JSON.parse(n.responseText)
				} catch (a) {
					r = null, o = {
						code: 500,
						message: "Could not parse response as JSON. This could also be caused by a CORS or XMLHttpRequest error."
					}
				}!o && r.error && (o = r.error, r = null), n.onerror = e.Util.falseFn, t.call(i, o, r)
			}
		}, n.ontimeout = function() {
			this.onerror()
		}, n
	}
	function r(t, e, r, o) {
		var a = n(r, o);
		return a.open("POST", t), "undefined" != typeof o && null !== o && "undefined" != typeof o.options && (a.timeout = o.options.timeout), a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), a.send(i(e)), a
	}
	function o(t, e, r, o) {
		var a = n(r, o);
		return a.open("GET", t + "?" + i(e), !0), "undefined" != typeof o && null !== o && "undefined" != typeof o.options && (a.timeout = o.options.timeout), a.send(null), a
	}
	function a(t, e, r, o) {
		var a = i(e),
			l = n(r, o),
			u = (t + "?" + a).length;
		if (u <= 2e3 && q.cors ? l.open("GET", t + "?" + a) : u > 2e3 && q.cors && (l.open("POST", t), l.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")), "undefined" != typeof o && null !== o && "undefined" != typeof o.options && (l.timeout = o.options.timeout), u <= 2e3 && q.cors) l.send(null);
		else {
			if (!(u > 2e3 && q.cors)) return u <= 2e3 && !q.cors ? s(t, e, r, o) : void S("a request to " + t + " was longer then 2000 characters and this browser cannot make a cross-domain post request. Please use a proxy http://esri.github.io/esri-leaflet/api-reference/request.html");
			l.send(a)
		}
		return l
	}
	function s(t, n, r, o) {
		window._EsriLeafletCallbacks = window._EsriLeafletCallbacks || {};
		var a = "c" + V;
		n.callback = "window._EsriLeafletCallbacks." + a, window._EsriLeafletCallbacks[a] = function(t) {
			if (window._EsriLeafletCallbacks[a] !== !0) {
				var e, i = Object.prototype.toString.call(t);
				"[object Object]" !== i && "[object Array]" !== i && (e = {
					error: {
						code: 500,
						message: "Expected array or object as JSONP response"
					}
				}, t = null), !e && t.error && (e = t, t = null), r.call(o, e, t), window._EsriLeafletCallbacks[a] = !0
			}
		};
		var s = e.DomUtil.create("script", null, document.body);
		return s.type = "text/javascript", s.src = t + "?" + i(n), s.id = a, V++, {
			id: a,
			url: s.src,
			abort: function() {
				window._EsriLeafletCallbacks._callback[a]({
					code: 0,
					message: "Request aborted."
				})
			}
		}
	}
	function l(t, e) {
		for (var i = 0; i < t.length; i++) if (t[i] !== e[i]) return !1;
		return !0
	}
	function u(t) {
		return l(t[0], t[t.length - 1]) || t.push(t[0]), t
	}
	function c(t) {
		var e, i = 0,
			n = 0,
			r = t.length,
			o = t[n];
		for (n; n < r - 1; n++) e = t[n + 1], i += (e[0] - o[0]) * (e[1] + o[1]), o = e;
		return i >= 0
	}
	function h(t, e, i, n) {
		var r = (n[0] - i[0]) * (t[1] - i[1]) - (n[1] - i[1]) * (t[0] - i[0]),
			o = (e[0] - t[0]) * (t[1] - i[1]) - (e[1] - t[1]) * (t[0] - i[0]),
			a = (n[1] - i[1]) * (e[0] - t[0]) - (n[0] - i[0]) * (e[1] - t[1]);
		if (0 !== a) {
			var s = r / a,
				l = o / a;
			if (s >= 0 && s <= 1 && l >= 0 && l <= 1) return !0
		}
		return !1
	}
	function d(t, e) {
		for (var i = 0; i < t.length - 1; i++) for (var n = 0; n < e.length - 1; n++) if (h(t[i], t[i + 1], e[n], e[n + 1])) return !0;
		return !1
	}
	function p(t, e) {
		for (var i = !1, n = -1, r = t.length, o = r - 1; ++n < r; o = n)(t[n][1] <= e[1] && e[1] < t[o][1] || t[o][1] <= e[1] && e[1] < t[n][1]) && e[0] < (t[o][0] - t[n][0]) * (e[1] - t[n][1]) / (t[o][1] - t[n][1]) + t[n][0] && (i = !i);
		return i
	}
	function f(t, e) {
		var i = d(t, e),
			n = p(t, e[0]);
		return !(i || !n)
	}
	function m(t) {
		for (var e, i, n, r = [], o = [], a = 0; a < t.length; a++) {
			var s = u(t[a].slice(0));
			if (!(s.length < 4)) if (c(s)) {
				var l = [s];
				r.push(l)
			} else o.push(s)
		}
		for (var h = []; o.length;) {
			n = o.pop();
			var p = !1;
			for (e = r.length - 1; e >= 0; e--) if (i = r[e][0], f(i, n)) {
				r[e].push(n), p = !0;
				break
			}
			p || h.push(n)
		}
		for (; h.length;) {
			n = h.pop();
			var m = !1;
			for (e = r.length - 1; e >= 0; e--) if (i = r[e][0], d(i, n)) {
				r[e].push(n), m = !0;
				break
			}
			m || r.push([n.reverse()])
		}
		return 1 === r.length ? {
			type: "Polygon",
			coordinates: r[0]
		} : {
			type: "MultiPolygon",
			coordinates: r
		}
	}
	function g(t) {
		var e = [],
			i = t.slice(0),
			n = u(i.shift().slice(0));
		if (n.length >= 4) {
			c(n) || n.reverse(), e.push(n);
			for (var r = 0; r < i.length; r++) {
				var o = u(i[r].slice(0));
				o.length >= 4 && (c(o) && o.reverse(), e.push(o))
			}
		}
		return e
	}
	function v(t) {
		for (var e = [], i = 0; i < t.length; i++) for (var n = g(t[i]), r = n.length - 1; r >= 0; r--) {
			var o = n[r].slice(0);
			e.push(o)
		}
		return e
	}
	function _(t) {
		var e = {};
		for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
		return e
	}
	function y(t, e) {
		var i = {};
		return "number" == typeof t.x && "number" == typeof t.y && (i.type = "Point", i.coordinates = [t.x, t.y]), t.points && (i.type = "MultiPoint", i.coordinates = t.points.slice(0)), t.paths && (1 === t.paths.length ? (i.type = "LineString", i.coordinates = t.paths[0].slice(0)) : (i.type = "MultiLineString", i.coordinates = t.paths.slice(0))), t.rings && (i = m(t.rings.slice(0))), (t.geometry || t.attributes) && (i.type = "Feature", i.geometry = t.geometry ? y(t.geometry) : null, i.properties = t.attributes ? _(t.attributes) : null, t.attributes && (i.id = t.attributes[e] || t.attributes.OBJECTID || t.attributes.FID)), i
	}
	function b(t, e) {
		e = e || "OBJECTID";
		var i, n = {
			wkid: 4326
		},
			r = {};
		switch (t.type) {
		case "Point":
			r.x = t.coordinates[0], r.y = t.coordinates[1], r.spatialReference = n;
			break;
		case "MultiPoint":
			r.points = t.coordinates.slice(0), r.spatialReference = n;
			break;
		case "LineString":
			r.paths = [t.coordinates.slice(0)], r.spatialReference = n;
			break;
		case "MultiLineString":
			r.paths = t.coordinates.slice(0), r.spatialReference = n;
			break;
		case "Polygon":
			r.rings = g(t.coordinates.slice(0)), r.spatialReference = n;
			break;
		case "MultiPolygon":
			r.rings = v(t.coordinates.slice(0)), r.spatialReference = n;
			break;
		case "Feature":
			t.geometry && (r.geometry = b(t.geometry, e)), r.attributes = t.properties ? _(t.properties) : {}, t.id && (r.attributes[e] = t.id);
			break;
		case "FeatureCollection":
			for (r = [], i = 0; i < t.features.length; i++) r.push(b(t.features[i], e));
			break;
		case "GeometryCollection":
			for (r = [], i = 0; i < t.geometries.length; i++) r.push(b(t.geometries[i], e))
		}
		return r
	}
	function w(t, e) {
		return b(t, e)
	}
	function C(t, e) {
		return y(t, e)
	}
	function x(t) {
		var e = {};
		for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
		return e
	}
	function E(t) {
		if ("NaN" !== t.xmin && "NaN" !== t.ymin && "NaN" !== t.xmax && "NaN" !== t.ymax) {
			var i = e.latLng(t.ymin, t.xmin),
				n = e.latLng(t.ymax, t.xmax);
			return e.latLngBounds(i, n)
		}
		return null
	}
	function k(t) {
		return t = e.latLngBounds(t), {
			xmin: t.getSouthWest().lng,
			ymin: t.getSouthWest().lat,
			xmax: t.getNorthEast().lng,
			ymax: t.getNorthEast().lat,
			spatialReference: {
				wkid: 4326
			}
		}
	}
	function L(t, e) {
		var i, n = t.features || t.results,
			r = n.length;
		if (e) i = e;
		else if (t.objectIdFieldName) i = t.objectIdFieldName;
		else if (t.fields) {
			for (var o = 0; o <= t.fields.length - 1; o++) if ("esriFieldTypeOID" === t.fields[o].type) {
				i = t.fields[o].name;
				break
			}
		} else if (r) for (var a in n[0].attributes) if (a.match(/^(OBJECTID|FID|OID|ID)$/i)) {
			i = a;
			break
		}
		var s = {
			type: "FeatureCollection",
			features: []
		};
		if (r) for (var l = n.length - 1; l >= 0; l--) {
			var u = C(n[l], i);
			s.features.push(u)
		}
		return s
	}
	function P(t) {
		return t = e.Util.trim(t), "/" !== t[t.length - 1] && (t += "/"), t
	}
	function D(t) {
		return /^(?!.*utility\.arcgis\.com).*\.arcgis\.com.*FeatureServer/i.test(t)
	}
	function T(t) {
		var e;
		switch (t) {
		case "Point":
			e = "esriGeometryPoint";
			break;
		case "MultiPoint":
			e = "esriGeometryMultipoint";
			break;
		case "LineString":
			e = "esriGeometryPolyline";
			break;
		case "MultiLineString":
			e = "esriGeometryPolyline";
			break;
		case "Polygon":
			e = "esriGeometryPolygon";
			break;
		case "MultiPolygon":
			e = "esriGeometryPolygon"
		}
		return e
	}
	function S() {
		console && console.warn && console.warn.apply(console, arguments)
	}
	function M(t) {
		return t.getSize().x - j.attributionWidthOffset + "px"
	}
	function A(t) {
		if (t.attributionControl && !t.attributionControl._esriAttributionAdded) {
			t.attributionControl.setPrefix('<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> | Powered by <a href="https://www.esri.com">Esri</a>');
			var i = document.createElement("style");
			i.type = "text/css", i.innerHTML = ".esri-truncated-attribution:hover {white-space: normal;}", document.getElementsByTagName("head")[0].appendChild(i), e.DomUtil.addClass(t.attributionControl._container, "esri-truncated-attribution:hover");
			var n = document.createElement("style");
			n.type = "text/css", n.innerHTML = ".esri-truncated-attribution {vertical-align: -3px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;display: inline-block;transition: 0s white-space;transition-delay: 1s;max-width: " + M(t) + ";}", document.getElementsByTagName("head")[0].appendChild(n), e.DomUtil.addClass(t.attributionControl._container, "esri-truncated-attribution"), t.on("resize", function(e) {
				t.attributionControl._container.style.maxWidth = M(e.target)
			}), t.attributionControl._esriAttributionAdded = !0
		}
	}
	function O(t, i) {
		s(t, {}, e.Util.bind(function(t, n) {
			if (!t) {
				i._esriAttributions = [];
				for (var r = 0; r < n.contributors.length; r++) for (var o = n.contributors[r], a = 0; a < o.coverageAreas.length; a++) {
					var s = o.coverageAreas[a],
						l = e.latLng(s.bbox[0], s.bbox[1]),
						u = e.latLng(s.bbox[2], s.bbox[3]);
					i._esriAttributions.push({
						attribution: o.attribution,
						score: s.score,
						bounds: e.latLngBounds(l, u),
						minZoom: s.zoomMin,
						maxZoom: s.zoomMax
					})
				}
				i._esriAttributions.sort(function(t, e) {
					return e.score - t.score
				});
				var c = {
					target: i
				};
				N(c)
			}
		}, this))
	}
	function N(t) {
		var i = t.target,
			n = i._esriAttributions;
		if (i && i.attributionControl && n) {
			for (var r = "", o = i.getBounds(), a = e.latLngBounds(o.getSouthWest().wrap(), o.getNorthEast().wrap()), s = i.getZoom(), l = 0; l < n.length; l++) {
				var u = n[l],
					c = u.attribution;
				!r.match(c) && u.bounds.intersects(a) && s >= u.minZoom && s <= u.maxZoom && (r += ", " + c)
			}
			r = r.substr(2);
			var h = i.attributionControl._container.querySelector(".esri-dynamic-attribution");
			h.innerHTML = r, h.style.maxWidth = M(i), i.fire("attributionupdated", {
				attribution: r
			})
		}
	}
	function I(t) {
		return new $(t)
	}
	function R(t) {
		return new J(t)
	}
	function F(t) {
		return new K(t)
	}
	function z(t) {
		return new Y(t)
	}
	var B = ("default" in e ? e["default"] : e, "2.0.8"),
		U = window.XMLHttpRequest && "withCredentials" in new window.XMLHttpRequest,
		H = "" === document.documentElement.style.pointerEvents,
		q = {
			cors: U,
			pointerEvents: H
		},
		j = {
			attributionWidthOffset: 55
		},
		V = 0,
		W = q.cors ? o : s;
	W.CORS = o, W.JSONP = s;
	var Z = {
		request: a,
		get: W,
		post: r
	},
		G = {
			shallowClone: x,
			warn: S,
			cleanUrl: P,
			isArcgisOnline: D,
			geojsonTypeToArcGIS: T,
			responseToFeatureCollection: L,
			geojsonToArcGIS: w,
			arcgisToGeoJSON: C,
			boundsToExtent: k,
			extentToBounds: E,
			calcAttributionWidth: M,
			setEsriAttribution: A,
			_getAttributionData: O,
			_updateMapAttribution: N
		},
		$ = e.Class.extend({
			options: {
				proxy: !1,
				useCors: U
			},
			generateSetter: function(t, i) {
				return e.Util.bind(function(e) {
					return this.params[t] = e, this
				}, i)
			},
			initialize: function(t) {
				if (t.request && t.options ? (this._service = t, e.Util.setOptions(this, t.options)) : (e.Util.setOptions(this, t), this.options.url = P(t.url)), this.params = e.Util.extend({}, this.params || {}), this.setters) for (var i in this.setters) {
					var n = this.setters[i];
					this[i] = this.generateSetter(n, this)
				}
			},
			token: function(t) {
				return this._service ? this._service.authenticate(t) : this.params.token = t, this
			},
			request: function(t, e) {
				return this._service ? this._service.request(this.path, this.params, t, e) : this._request("request", this.path, this.params, t, e)
			},
			_request: function(t, e, i, n, r) {
				var o = this.options.proxy ? this.options.proxy + "?" + this.options.url + e : this.options.url + e;
				return "get" !== t && "request" !== t || this.options.useCors ? Z[t](o, i, n, r) : Z.get.JSONP(o, i, n, r)
			}
		}),
		J = $.extend({
			setters: {
				offset: "resultOffset",
				limit: "resultRecordCount",
				fields: "outFields",
				precision: "geometryPrecision",
				featureIds: "objectIds",
				returnGeometry: "returnGeometry",
				token: "token"
			},
			path: "query",
			params: {
				returnGeometry: !0,
				where: "1=1",
				outSr: 4326,
				outFields: "*"
			},
			within: function(t) {
				return this._setGeometry(t), this.params.spatialRel = "esriSpatialRelContains", this
			},
			intersects: function(t) {
				return this._setGeometry(t), this.params.spatialRel = "esriSpatialRelIntersects", this
			},
			contains: function(t) {
				return this._setGeometry(t), this.params.spatialRel = "esriSpatialRelWithin", this
			},
			crosses: function(t) {
				return this._setGeometry(t), this.params.spatialRel = "esriSpatialRelCrosses", this
			},
			touches: function(t) {
				return this._setGeometry(t), this.params.spatialRel = "esriSpatialRelTouches", this
			},
			overlaps: function(t) {
				return this._setGeometry(t), this.params.spatialRel = "esriSpatialRelOverlaps", this
			},
			bboxIntersects: function(t) {
				return this._setGeometry(t), this.params.spatialRel = "esriSpatialRelEnvelopeIntersects", this
			},
			indexIntersects: function(t) {
				return this._setGeometry(t), this.params.spatialRel = "esriSpatialRelIndexIntersects", this
			},
			nearby: function(t, i) {
				return t = e.latLng(t), this.params.geometry = [t.lng, t.lat], this.params.geometryType = "esriGeometryPoint", this.params.spatialRel = "esriSpatialRelIntersects", this.params.units = "esriSRUnit_Meter", this.params.distance = i, this.params.inSr = 4326, this
			},
			where: function(t) {
				return this.params.where = t, this
			},
			between: function(t, e) {
				return this.params.time = [t.valueOf(), e.valueOf()], this
			},
			simplify: function(t, e) {
				var i = Math.abs(t.getBounds().getWest() - t.getBounds().getEast());
				return this.params.maxAllowableOffset = i / t.getSize().y * e, this
			},
			orderBy: function(t, e) {
				return e = e || "ASC", this.params.orderByFields = this.params.orderByFields ? this.params.orderByFields + "," : "", this.params.orderByFields += [t, e].join(" "), this
			},
			run: function(t, e) {
				return this._cleanParams(), this.options.isModern || D(this.options.url) ? (this.params.f = "geojson", this.request(function(i, n) {
					this._trapSQLerrors(i), t.call(e, i, n, n)
				}, this)) : this.request(function(i, n) {
					this._trapSQLerrors(i), t.call(e, i, n && L(n), n)
				}, this)
			},
			count: function(t, e) {
				return this._cleanParams(), this.params.returnCountOnly = !0, this.request(function(e, i) {
					t.call(this, e, i && i.count, i)
				}, e)
			},
			ids: function(t, e) {
				return this._cleanParams(), this.params.returnIdsOnly = !0, this.request(function(e, i) {
					t.call(this, e, i && i.objectIds, i)
				}, e)
			},
			bounds: function(t, e) {
				return this._cleanParams(), this.params.returnExtentOnly = !0, this.request(function(i, n) {
					n && n.extent && E(n.extent) ? t.call(e, i, E(n.extent), n) : (i = {
						message: "Invalid Bounds"
					}, t.call(e, i, null, n))
				}, e)
			},
			pixelSize: function(t) {
				var i = e.point(t);
				return this.params.pixelSize = [i.x, i.y], this
			},
			layer: function(t) {
				return this.path = t + "/query", this
			},
			_trapSQLerrors: function(t) {
				t && "400" === t.code && S("one common syntax error in query requests is encasing string values in double quotes instead of single quotes")
			},
			_cleanParams: function() {
				delete this.params.returnIdsOnly, delete this.params.returnExtentOnly, delete this.params.returnCountOnly
			},
			_setGeometry: function(t) {
				return this.params.inSr = 4326, t instanceof e.LatLngBounds ? (this.params.geometry = k(t), void(this.params.geometryType = "esriGeometryEnvelope")) : (t.getLatLng && (t = t.getLatLng()), t instanceof e.LatLng && (t = {
					type: "Point",
					coordinates: [t.lng, t.lat]
				}), t instanceof e.GeoJSON && (t = t.getLayers()[0].feature.geometry, this.params.geometry = w(t), this.params.geometryType = T(t.type)), t.toGeoJSON && (t = t.toGeoJSON()), "Feature" === t.type && (t = t.geometry), "Point" === t.type || "LineString" === t.type || "Polygon" === t.type || "MultiPolygon" === t.type ? (this.params.geometry = w(t), void(this.params.geometryType = T(t.type))) : void S("invalid geometry passed to spatial query. Should be L.LatLng, L.LatLngBounds, L.Marker or a GeoJSON Point, Line, Polygon or MultiPolygon object"))
			}
		}),
		K = $.extend({
			setters: {
				contains: "contains",
				text: "searchText",
				fields: "searchFields",
				spatialReference: "sr",
				sr: "sr",
				layers: "layers",
				returnGeometry: "returnGeometry",
				maxAllowableOffset: "maxAllowableOffset",
				precision: "geometryPrecision",
				dynamicLayers: "dynamicLayers",
				returnZ: "returnZ",
				returnM: "returnM",
				gdbVersion: "gdbVersion",
				token: "token"
			},
			path: "find",
			params: {
				sr: 4326,
				contains: !0,
				returnGeometry: !0,
				returnZ: !0,
				returnM: !1
			},
			layerDefs: function(t, e) {
				return this.params.layerDefs = this.params.layerDefs ? this.params.layerDefs + ";" : "", this.params.layerDefs += [t, e].join(":"), this
			},
			simplify: function(t, e) {
				var i = Math.abs(t.getBounds().getWest() - t.getBounds().getEast());
				return this.params.maxAllowableOffset = i / t.getSize().y * e, this
			},
			run: function(t, e) {
				return this.request(function(i, n) {
					t.call(e, i, n && L(n), n)
				}, e)
			}
		}),
		Y = $.extend({
			path: "identify",
			between: function(t, e) {
				return this.params.time = [t.valueOf(), e.valueOf()], this
			}
		});
	t.VERSION = B, t.Support = q, t.options = j, t.Util = G, t.get = W, t.post = r, t.request = a, t.Task = $, t.task = I, t.Query = J, t.query = R, t.Find = K, t.find = F, t.Identify = Y, t.identify = z
});
var mars3d = {
	version: "1.1",
	name: "Cesium三维地图框架",
	author: "木遥（QQ：346819890）"
},
	scope = "undefined" != typeof window ? window : "undefined" != typeof self ? self : {};
scope.mars3d = mars3d, function(t, e) {
	"use strict";

	function i(t) {
		return "complete" === t.readyState || "loaded" === t.readyState
	}
	function n(t, i, n) {
		var r = e.createElement("link");
		r.rel = "stylesheet", a(r, n, "css"), r.async = !0, r.href = t, h.appendChild(r)
	}
	function r(t, i, n) {
		var r = e.createElement("script");
		r.charset = "utf-8", a(r, n, "js"), r.async = !i.sync, r.src = t, h.appendChild(r)
	}
	function o(t, e) {
		var i;
		t.sheet && (i = !0), setTimeout(function() {
			i ? e() : o(t, e)
		}, 20)
	}
	function a(t, e, n) {
		function r() {
			t.onload = t.onreadystatechange = null, t = null, e()
		}
		var a = "onload" in t,
			s = "css" === n;
		return !s || !d && a ? void(a ? (t.onload = r, t.onerror = function() {
			t.onerror = null, "css" == n ? console.error("该css文件不存在：" + t.href) : console.error("该js文件不存在：" + t.src), r()
		}) : t.onreadystatechange = function() {
			i(t) && r()
		}) : void setTimeout(function() {
			o(t, e)
		}, 1)
	}
	function s(t, e, i, o) {
		function a() {
			var i = e.indexOf(t);
			i > -1 && e.splice(i, 1), 0 === e.length && o()
		}
		return t ? void(c.test(t) ? n(t, i, a) : r(t, i, a)) : void setTimeout(function() {
			a()
		})
	}
	function l(t, e, i) {
		var n = function() {
				i && i()
			};
		if (t = Array.prototype.slice.call(t || []), 0 === t.length) return void n();
		for (var r = 0, o = t.length; r < o; r++) s(t[r], t, e, n)
	}
	function u(e, n) {
		if (i(e)) n();
		else {
			var r = 1500,
				o = !1;
			t.addEventListener("load", function() {
				o || (n(), o = !0)
			}), setTimeout(function() {
				o || (n(), o = !0)
			}, r)
		}
	}
	var c = new RegExp("\\.css"),
		h = e.head || e.getElementsByTagName("head")[0],
		d = +navigator.userAgent.replace(/.*(?:AppleWebKit|AndroidWebKit)\/?(\d+).*/i, "$1") < 536,
		p = {
			async: function(t, i) {
				u(e, function() {
					l(t, {}, i)
				})
			},
			sync: function(t, i) {
				u(e, function() {
					l(t, {
						sync: !0
					}, i)
				})
			}
		};
	return t.Loader = p, p
}(window, document), mars3d.widget = function() {
	function t(t, e, i) {
		y = t, e = e || {}, x = i || "", C = [], _ = e.defaultOptions || {
			windowOptions: {
				position: "rt",
				maxmin: !1,
				resize: !0
			},
			autoDisable: !0,
			disableOhter: !0
		}, v = e.version, "time" == v && (v = (new Date).getTime());
		var r = e.widgetsAtStart;
		if (r && r.length > 0) for (var o = 0; o < r.length; o++) {
			var a = r[o];
			a.hasOwnProperty("uri") && "" != a.uri ? a.hasOwnProperty("visible") && !a.visible || (a.autoDisable = !1, a.openAtStart = !0, a._nodebug = !0, n(a), C.push(a)) : console.log("widget未配置uri：" + JSON.stringify(a))
		}
		var s = e["debugger"];
		if (s) {
			var l = '<div id="widget-testbar" class="widgetbar no-print-view" >      <div style="height: 30px; line-height:30px;"><b style="color: #4db3ff;">widget测试栏</b>&nbsp;&nbsp;<button type="button" onclick="mars3d.widget.removeDebugeBar();" class="btn btn-link btn-xs">关闭</button> </div>     <button type="button" class="btn btn-info"  onclick="mars3d.widget.disableAll()" ><i class="fa fa-globe"></i>漫游</button></div>';
			$("body").append(l)
		}
		if (r = e.widgets, r && r.length > 0) for (var o = 0; o < r.length; o++) {
			var a = r[o];
			if ("group" == a.type) {
				for (var l = ' <div class="btn-group dropup">  <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-align-justify"></i>' + a.name + ' <span class="caret"></span></button> <ul class="dropdown-menu">', u = 0; u < a.children.length; u++) {
					var h = a.children[u];
					n(h), l += " <li onclick=\"mars3d.widget.activate('" + h.uri + "'," + !h.disableOhter + ')" ><a href="#"><i class="fa fa-star"></i>' + h.name + "</a></li>", h.hasOwnProperty("uri") && "" != h.uri ? C.push(h) : console.log("widget未配置uri：" + JSON.stringify(h))
				}
				l += "</ul></div>", s && !a._nodebug && $("#widget-testbar").append(l)
			} else {
				if (n(a), s && !a._nodebug) {
					var l = '   <button type="button" class="btn btn-primary" onclick="mars3d.widget.activate(\'' + a.uri + "'," + !a.disableOhter + ')"  > <i class="fa fa-globe"></i>' + a.name + " </button>";
					$("#widget-testbar").append(l)
				}
				if (!a.hasOwnProperty("uri") || "" == a.uri) {
					console.log("widget未配置uri：" + JSON.stringify(a));
					continue
				}
				C.push(a)
			}
		}
		for (var o = 0; o < C.length; o++) {
			var a = C[o];
			a.openAtStart && E.push(a)
		}
		$(window).resize(function() {
			for (var t = 0; t < C.length; t++) {
				var e = C[t];
				e._class && e._class.indexResize()
			}
		}), c()
	}
	function e() {
		return i(_.windowOptions)
	}
	function i(t, e) {
		if (null == t || "object" != typeof t) return t;
		if (t.constructor != Object && t.constructor != Array) return t;
		if (t.constructor == Date || t.constructor == RegExp || t.constructor == Function || t.constructor == String || t.constructor == Number || t.constructor == Boolean) return new t.constructor(t);
		e = e || new t.constructor;
		for (var n in t) e[n] = "undefined" == typeof e[n] ? i(t[n], null) : e[n];
		return e
	}
	function n(t) {
		if (_) for (var e in _)"windowOptions" == e || t.hasOwnProperty(e) || (t[e] = _[e]);
		t.path = p(x + t.uri), t.name = t.name || t.label
	}
	function r(e, i) {
		null == y && e.viewer && t(e.viewer), "string" == typeof e && (e = {
			uri: e
		}, null != i && (e.disableOhter = !i));
		for (var r, o = 0; o < C.length; o++) {
			var a = C[o];
			if (e.uri == a.uri || a.id && e.uri == a.id) {
				r = a;
				for (var s in e)"uri" != s && (r[s] = e[s]);
				break
			}
		}
		return null == r && (n(e), r = e, C.push(e)), r.disableOhter && (r.reStart ? u() : u(r.uri)), r._class ? r._class.activateBase() : (E.push(r), 1 == E.length && c()), r
	}
	function o(t) {
		for (var e = 0; e < C.length; e++) {
			var i = C[e];
			if (t == i.uri || t == i.id) return i
		}
	}
	function a(t) {
		var e = o(t);
		return e ? e._class : null
	}
	function s(t) {
		var e = a(t);
		return null != e && e.isActivate
	}
	function l(t) {
		for (var e = 0; e < C.length; e++) {
			var i = C[e];
			if (i._class && (t == i.uri || t == i.id)) {
				i._class.disableBase();
				break
			}
		}
	}
	function u(t) {
		for (var e = 0; e < C.length; e++) {
			var i = C[e];
			i.autoDisable && (!t || t != i.uri && t != i.id) && i._class && i._class.disableBase()
		}
	}
	function c() {
		if (0 != E.length) {
			if (w) return void setTimeout(c, 500);
			w = !0, b = E[0];
			var t = b.uri;
			v && (t += t.indexOf("?") == -1 ? "?time=" + v : "&time=" + v), Loader.async([x + t], function() {
				w = !1, E.shift(), c()
			})
		}
	}
	function h(t) {
		if (null != b) return b._class = new t(b, y), b._class.activateBase(), b._class;
		for (var e = d(), i = 0; i < C.length; i++) {
			var n = C[i];
			if (e.endsWith(n.uri)) return n._class = new t(n, y), n._class.activateBase(), n._class
		}
	}
	function d() {
		for (var t, e = document.scripts, i = e.length - 1; i >= 0; i--) if (t = e[i].src, null != t && "" != t && t.indexOf("widgets") != -1) return t;
		return ""
	}
	function p(t) {
		var e = t.lastIndexOf("/");
		return t.substring(0, e + 1)
	}
	function f() {
		$("#widget-testbar").remove()
	}
	function m() {
		return v
	}
	function g() {
		return x
	}
	var v, _, y, b, w, C = [],
		x = "",
		E = [];
	return {
		init: t,
		isActivate: s,
		activate: r,
		disable: l,
		disableAll: u,
		getWidget: o,
		getClass: a,
		removeDebugeBar: f,
		bindClass: h,
		getDefWindowOptions: e,
		getCacheVersion: m,
		getBasePath: g
	}
}(), mars3d.BaseWidget = L.Class.extend({
	viewer: null,
	options: {},
	config: {},
	path: "",
	isActivate: !1,
	isCreate: !1,
	initialize: function(t, e) {
		this.viewer = e, this.config = t, this.path = t.path || ""
	},
	addCacheVersion: function(t) {
		if (null == t) return t;
		var e = mars3d.widget.getCacheVersion();
		return e && (t.indexOf("?") == -1 ? t += "?time=" + e : t.indexOf("time=" + e) == -1 && (t += "&time=" + e)), t
	},
	activateBase: function() {
		var t = this;
		if (this.isActivate) return this.changeWidgetView(function(t) {
			t._dom && ($(".layui-layer").each(function() {
				$(this).css("z-index", 19891e3)
			}), $(t._dom).css("z-index", 19891014))
		}), this.disable(), void this._startActivate();
		if (this.isActivate = !0, !this.isCreate) {
			if (this.options.resources && this.options.resources.length > 0) {
				for (var e = [], i = ((new Date).getTime(), 0); i < this.options.resources.length; i++) {
					var n = this.options.resources[i];
					n = this._getUrl(n), e.push(n)
				}
				return void Loader.async(e, function() {
					var e = t.create(function() {
						t._createWidgetView(), t.isCreate = !0
					});
					e || (t._createWidgetView(), t.isCreate = !0)
				})
			}
			var r = this.create(function() {
				t._createWidgetView(), this.isCreate = !0
			});
			if (r) return;
			this.isCreate = !0
		}
		return this._createWidgetView(), this
	},
	_createWidgetView: function() {
		var t = this.options.view;
		if (void 0 === t || null === t) this._startActivate();
		else if (L.Util.isArray(t)) {
			this._viewcreate_allcount = t.length, this._viewcreate_okcount = 0;
			for (var e = 0; e < t.length; e++) this.createItemView(t[e])
		} else this._viewcreate_allcount = 1, this._viewcreate_okcount = 0, this.createItemView(t)
	},
	changeWidgetView: function(t) {
		var e = this.options.view;
		if (void 0 === e || null === e) return !1;
		if (L.Util.isArray(e)) {
			for (var i = !1, n = 0; n < e.length; n++) i = i || t(e[n]);
			return i
		}
		return t(e)
	},
	createItemView: function(t) {
		switch (t.type) {
		default:
		case "window":
			this._openWindow(t);
			break;
		case "divwindow":
			this._openDivWindow(t);
			break;
		case "append":
			this._appendView(t);
			break;
		case "custom":
			var e = this._getUrl(t.url),
				i = this;
			t.open(e, function(e) {
				i.winCreateOK(t, e), i._viewcreate_okcount++, i._viewcreate_okcount >= i._viewcreate_allcount && i._startActivate(e)
			}, this)
		}
	},
	_viewcreate_allcount: 0,
	_viewcreate_okcount: 0,
	_openWindow: function(t) {
		var e = this,
			i = this._getUrl(t.url),
			n = {
				type: 2,
				content: [i, "no"],
				success: function(n) {
					t._dom = n;
					var r = window[n.find("iframe")[0].name];
					e.config.hasOwnProperty("visible") && !e.config.visible && $(n).hide(), layer.setTop(n), e.winCreateOK(t, r), e._viewcreate_okcount++, e._viewcreate_okcount >= e._viewcreate_allcount && e._startActivate(n), r && r.initWidgetView ? r.initWidgetView(e) : console.error("" + i + "页面没有定义function initWidgetView(widget)方法，无法初始化widget页面!")
				}
			};
		t._layerIdx = layer.open(this._getWinOpt(t, n))
	},
	_openDivWindow: function(t) {
		var e = this._getUrl(t.url),
			i = this;
		this.getHtml(e, function(e) {
			var n = {
				type: 1,
				content: e,
				success: function(e) {
					t._dom = e, i.config.hasOwnProperty("visible") && !i.config.visible && $(e).hide(), layer.setTop(e), i.winCreateOK(t, e), i._viewcreate_okcount++, i._viewcreate_okcount >= i._viewcreate_allcount && i._startActivate(e)
				}
			};
			t._layerIdx = layer.open(i._getWinOpt(t, n))
		})
	},
	_getUrl: function(t) {
		return t = this.addCacheVersion(t), t.startsWith("/") || t.startsWith(".") || t.startsWith("http") ? t : this.path + t
	},
	_getWinOpt: function(t, e) {
		var i = mars3d.widget.getDefWindowOptions(),
			n = $.extend(i, t.windowOptions);
		n = $.extend(n, this.config.windowOptions), t.windowOptions = n;
		var r = this,
			o = this._getWinSize(n),
			a = {
				title: !n.noTitle && (this.config.name || " "),
				area: o.area,
				offset: o.offset,
				shade: 0,
				maxmin: !1,
				zIndex: layer.zIndex,
				end: function() {
					t._layerIdx = -1, r.disableBase()
				},
				full: function(t) {
					r.winFull(t)
				},
				min: function(t) {
					r.winMin(t)
				},
				restore: function(t) {
					r.winRestore(t)
				}
			},
			s = $.extend(a, n);
		return $.extend(s, e || {})
	},
	_getWinSize: function(t) {
		var e = t.width,
			i = t.height,
			n = "",
			r = t.position;
		if (r) if ("string" == typeof r) n = r;
		else if ("object" == typeof r) {
			var o, a;
			r.hasOwnProperty("top") && null != r.top && (o = r.top), r.hasOwnProperty("bottom") && null != r.bottom && (t._hasresize = !0, o = document.documentElement.clientHeight - i - r.bottom, r.hasOwnProperty("top") && (o = r.top, i = document.documentElement.clientHeight - o - r.bottom)), r.hasOwnProperty("left") && null != r.left && (a = r.left), r.hasOwnProperty("right") && null != r.right && (t._hasresize = !0, a = document.documentElement.clientWidth - e - r.right, r.hasOwnProperty("left") && (a = r.left, e = document.documentElement.clientWidth - a - r.right)), null == o && (o = (document.documentElement.clientHeight - i) / 2), null == a && (a = (document.documentElement.clientWidth - e) / 2), n = [o + "px", a + "px"]
		}
		var s = [e + "px", i + "px"];
		return {
			area: s,
			offset: n
		}
	},
	_appendView: function(t) {
		if (this.isCreate && t._dom) $(t._dom).show(), this._startActivate(t._dom);
		else {
			var e = this._getUrl(t.url),
				i = this;
			i.getHtml(e, function(e) {
				t._dom = $(e).appendTo(t.parent || "body"), i.winCreateOK(t, e), i._viewcreate_okcount++, i._viewcreate_okcount >= i._viewcreate_allcount && i._startActivate(e)
			})
		}
	},
	disableBase: function() {
		if (this.isActivate) {
			var t = this.changeWidgetView(function(t) {
				return null != t._layerIdx && t._layerIdx != -1 ? (layer.close(t._layerIdx), t._layerIdx = -1, !0) : ("append" == t.type && t._dom && $(t._dom).hide(), "custom" == t.type && t.close && t.close(), !1)
			});
			t || (this.disable(), this.isActivate = !1)
		}
	},
	indexResize: function() {
		var t = this;
		this.changeWidgetView(function(e) {
			if (null != e._layerIdx && e._layerIdx != -1 && null != e.windowOptions && e.windowOptions._hasresize) {
				var i = t._getWinSize(e.windowOptions),
					n = {
						width: i.area[0],
						height: i.area[1],
						top: i.offset[0],
						left: i.offset[1]
					};
				$(e._dom).attr("myTopLeft", !0), layer.style(e._layerIdx, n), "divwindow" == e.type && layer.iframeAuto(e._layerIdx)
			}
		})
	},
	_startActivate: function(t) {
		this.activate(t), this.config.success && this.config.success(this)
	},
	create: function() {},
	activate: function(t) {},
	disable: function() {},
	winCreateOK: function(t, e) {},
	winFull: function() {},
	winMin: function() {},
	winRestore: function() {},
	getHtml: function(t, e) {
		$.ajax({
			url: t,
			type: "GET",
			dataType: "html",
			timeout: 0,
			success: function(t) {
				e(t)
			}
		})
	}
}), mars3d.BaseLayer = L.Class.extend({
	config: {},
	viewer: null,
	initialize: function(t, e) {
		this.viewer = e, this.config = t, this.name = t.name, this._visible = t.visible, this.config.alpha && (this._opacity = this.config.alpha), this.create(), t.visible && this.setVisible(!0), t.flyTo && this.centerAt(0)
	},
	create: function() {},
	showError: function(t, e) {
		e || (e = "未知错误"), this.viewer && this.viewer.cesiumWidget.showErrorPanel(t, void 0, e), console.log("layer错误:" + t + e)
	},
	_visible: !1,
	getVisible: function() {
		return this._visible
	},
	setVisible: function(t) {
		this._visible = t, t ? this.add() : this.remove()
	},
	add: function() {
		this._visible = !0, this.config.onAdd && this.config.onAdd()
	},
	remove: function() {
		this._visible = !1, this.config.onRemove && this.config.onRemove()
	},
	centerAt: function(t) {
		this.config.extent || this.config.center ? mars3d.map.centerAt(this.config.extent || this.config.center, {
			duration: t,
			isWgs84: !0
		}) : this.config.onCenterAt && this.config.onCenterAt(t)
	},
	hasOpacity: !1,
	setOpacity: function(t) {
		this.config.onSetOpacity && this.config.onSetOpacity(t)
	},
	hasZIndex: !1,
	setZIndex: function(t) {
		this.config.onSetZIndex && this.config.onSetZIndex(t)
	}
}), mars3d.GroupLayer = mars3d.BaseLayer.extend({
	create: function() {
		for (var t = this.config._layers, e = 0; e < t.length; e++) this.hasOpacity = t[e].hasOpacity, this.hasZIndex = t[e].hasZIndex
	},
	setVisible: function(t) {
		for (var e = this.config._layers, i = 0; i < e.length; i++) e[i].setVisible(t)
	},
	add: function() {
		for (var t = this.config._layers, e = 0; e < t.length; e++) t[e].setVisible(!0)
	},
	remove: function() {
		for (var t = this.config._layers, e = 0; e < t.length; e++) t[e].setVisible(!1)
	},
	centerAt: function(t) {
		for (var e = this.config._layers, i = 0; i < e.length; i++) e[i].centerAt(t)
	},
	setOpacity: function(t) {
		for (var e = this.config._layers, i = 0; i < e.length; i++) e[i].setOpacity(t)
	}
}), Cesium.defineProperties(ArcTileImageryProvider.prototype, {
	url: {
		get: function() {
			return this._url
		}
	},
	token: {
		get: function() {
			return this._token
		}
	},
	proxy: {
		get: function() {
			return this._proxy
		}
	},
	tileWidth: {
		get: function() {
			if (!this._ready) throw new DeveloperError("tileWidth must not be called before the imagery provider is ready.");
			return this._tileWidth
		}
	},
	tileHeight: {
		get: function() {
			if (!this._ready) throw new DeveloperError("tileHeight must not be called before the imagery provider is ready.");
			return this._tileHeight
		}
	},
	maximumLevel: {
		get: function() {
			if (!this._ready) throw new DeveloperError("maximumLevel must not be called before the imagery provider is ready.");
			return this._maximumLevel
		}
	},
	minimumLevel: {
		get: function() {
			if (!this._ready) throw new DeveloperError("minimumLevel must not be called before the imagery provider is ready.");
			return 0
		}
	},
	tilingScheme: {
		get: function() {
			if (!this._ready) throw new DeveloperError("tilingScheme must not be called before the imagery provider is ready.");
			return this._tilingScheme
		}
	},
	rectangle: {
		get: function() {
			if (!this._ready) throw new DeveloperError("rectangle must not be called before the imagery provider is ready.");
			return this._rectangle
		}
	},
	tileDiscardPolicy: {
		get: function() {
			if (!this._ready) throw new DeveloperError("tileDiscardPolicy must not be called before the imagery provider is ready.");
			return this._tileDiscardPolicy
		}
	},
	errorEvent: {
		get: function() {
			return this._errorEvent
		}
	},
	ready: {
		get: function() {
			return this._ready
		}
	},
	readyPromise: {
		get: function() {
			return this._readyPromise.promise
		}
	},
	credit: {
		get: function() {
			return this._credit
		}
	},
	usingPrecachedTiles: {
		get: function() {
			return this._useTiles
		}
	},
	hasAlphaChannel: {
		get: function() {
			return !0
		}
	},
	layers: {
		get: function() {
			return this._layers
		}
	}
}), ArcTileImageryProvider.prototype.getTileCredits = function(t, e, i) {}, ArcTileImageryProvider.prototype.padLeft0 = function(t, e) {
	t = String(t);
	for (var i = t.length; i < e;) t = "0" + t, i++;
	return t
}, ArcTileImageryProvider.prototype.requestImage = function(t, e, i) {
	if (!this._ready) throw new DeveloperError("requestImage must not be called before the imagery provider is ready.");
	var n = "L" + this.padLeft0(i.toString(), 2),
		r = "R" + this.padLeft0(e.toString(16), 8),
		o = "C" + this.padLeft0(t.toString(16), 8);
	this._isUpper && (n = n.toUpperCase(), r = r.toUpperCase(), o = o.toUpperCase());
	var a = this._url + n + "/" + r + "/" + o + this._imgType;
	return Cesium.ImageryProvider.loadImage(this, a)
}, mars3d.GraticuleLayer = mars3d.BaseLayer.extend({
	model: null,
	add: function() {
		null == this.model && this.initData(), this.model.setVisible(!0)
	},
	remove: function() {
		null != this.model && this.model.setVisible(!1)
	},
	initData: function() {
		function t(t, e) {
			t = t || {}, this._tilingScheme = t.tilingScheme || new Cesium.GeographicTilingScheme, this._color = t.color || new Cesium.Color(1, 1, 1, .4), this._tileWidth = t.tileWidth || 256, this._tileHeight = t.tileHeight || 256, this._ready = !0, this._sexagesimal = t.sexagesimal || !1, this._numLines = t.numLines || 50, this._scene = e, this._labels = new Cesium.LabelCollection, e.primitives.add(this._labels), this._polylines = new Cesium.PolylineCollection, e.primitives.add(this._polylines), this._ellipsoid = e.globe.ellipsoid;
			var i = document.createElement("canvas");
			i.width = 256, i.height = 256, this._canvas = i;
			var n = this;
			e.camera.moveEnd.addEventListener(function() {
				n._show && (n._polylines.removeAll(), n._labels.removeAll(), n._currentExtent = null, n._drawGrid(n._getExtentView()))
			}), e.imageryLayers.addImageryProvider(this)
		}
		function e(t) {
			return t < .01 ? 2 : t < .1 ? 1 : 0
		}
		var i = function() {
				try {
					return "x" in Object.defineProperty({}, "x", {})
				} catch (t) {
					return !1
				}
			}(),
			n = Object.defineProperties;
		i && n || (n = function(t) {
			return t
		}), n(t.prototype, {
			url: {
				get: function() {}
			},
			proxy: {
				get: function() {}
			},
			tileWidth: {
				get: function() {
					return this._tileWidth
				}
			},
			tileHeight: {
				get: function() {
					return this._tileHeight
				}
			},
			maximumLevel: {
				get: function() {
					return 18
				}
			},
			minimumLevel: {
				get: function() {
					return 0
				}
			},
			tilingScheme: {
				get: function() {
					return this._tilingScheme
				}
			},
			rectangle: {
				get: function() {
					return this._tilingScheme.rectangle
				}
			},
			tileDiscardPolicy: {
				get: function() {}
			},
			errorEvent: {
				get: function() {
					return this._errorEvent
				}
			},
			ready: {
				get: function() {
					return this._ready
				}
			},
			credit: {
				get: function() {
					return this._credit
				}
			},
			hasAlphaChannel: {
				get: function() {
					return !0
				}
			}
		}), t.prototype.makeLabel = function(t, e, i, n, r) {
			this._labels.add({
				position: this._ellipsoid.cartographicToCartesian(new Cesium.Cartographic(t, e, 10)),
				text: i,
				font: "16px Helvetica",
				style: Cesium.LabelStyle.FILL_AND_OUTLINE,
				fillColor: Cesium.Color.AZURE,
				outlineColor: Cesium.Color.BLACK,
				outlineWidth: 2,
				pixelOffset: new Cesium.Cartesian2(5, n ? 5 : -5),
				eyeOffset: Cesium.Cartesian3.ZERO,
				horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
				verticalOrigin: n ? Cesium.VerticalOrigin.BOTTOM : Cesium.VerticalOrigin.TOP,
				scale: 1
			})
		}, t.prototype._drawGrid = function(t) {
			if (!this._currentExtent || !this._currentExtent.equals(t)) {
				this._currentExtent = t, this._polylines.removeAll(), this._labels.removeAll();
				var i, n = (this._canvasSize, 0),
					o = 0;
				for (i = 0; i < r.length && n < (t.north - t.south) / 10; i++) n = r[i];
				for (i = 0; i < r.length && o < (t.east - t.west) / 10; i++) o = r[i];
				var a = (t.west < 0 ? Math.ceil(t.west / o) : Math.floor(t.west / o)) * o,
					s = (t.south < 0 ? Math.ceil(t.south / n) : Math.floor(t.south / n)) * n,
					l = (t.east < 0 ? Math.ceil(t.east / n) : Math.floor(t.east / n)) * n,
					u = (t.north < 0 ? Math.ceil(t.north / o) : Math.floor(t.north / o)) * o;
				a = Math.max(a - 2 * o, -Math.PI), l = Math.min(l + 2 * o, Math.PI), s = Math.max(s - 2 * n, -Math.PI / 2), u = Math.min(u + 2 * o, Math.PI / 2);
				var c, h, d = this._ellipsoid,
					p = Cesium.Math.toRadians(1),
					f = s + Math.floor((u - s) / n / 2) * n;
				for (h = a; h < l; h += o) {
					var m = [];
					for (c = s; c < u; c += p) m.push(new Cesium.Cartographic(h, c));
					m.push(new Cesium.Cartographic(h, u)), this._polylines.add({
						positions: d.cartographicArrayToCartesianArray(m),
						width: 1
					});
					var g = Cesium.Math.toDegrees(h);
					this.makeLabel(h, f, this._sexagesimal ? this._decToSex(g) : g.toFixed(e(o)), !1)
				}
				var v = a + Math.floor((l - a) / o / 2) * o;
				for (c = s; c < u; c += n) {
					var m = [];
					for (h = a; h < l; h += p) m.push(new Cesium.Cartographic(h, c));
					m.push(new Cesium.Cartographic(l, c)), this._polylines.add({
						positions: d.cartographicArrayToCartesianArray(m),
						width: 1
					});
					var _ = Cesium.Math.toDegrees(c);
					this.makeLabel(v, c, this._sexagesimal ? this._decToSex(_) : _.toFixed(e(n)), !0)
				}
			}
		}, t.prototype.requestImage = function(t, e, i) {
			return this._show && this._drawGrid(this._getExtentView()), this._canvas
		}, t.prototype.setVisible = function(t) {
			this._show = t, t ? (this._currentExtent = null, this._drawGrid(this._getExtentView())) : (this._polylines.removeAll(), this._labels.removeAll())
		}, t.prototype.isVisible = function() {
			return this._show
		}, t.prototype._decToSex = function(t) {
			var e = Math.floor(t),
				i = (60 * (Math.abs(t) - e)).toFixed(2);
			return "60.00" == i && (e += 1, i = "0.00"), [e, ":", i].join("")
		}, t.prototype._getExtentView = function() {
			for (var t = this._scene.camera, e = this._scene.canvas, i = [t.pickEllipsoid(new Cesium.Cartesian2(0, 0), this._ellipsoid), t.pickEllipsoid(new Cesium.Cartesian2(e.width, 0), this._ellipsoid), t.pickEllipsoid(new Cesium.Cartesian2(0, e.height), this._ellipsoid), t.pickEllipsoid(new Cesium.Cartesian2(e.width, e.height), this._ellipsoid)], n = 0; n < 4; n++) if (void 0 === i[n]) return Cesium.Rectangle.MAX_VALUE;
			return Cesium.Rectangle.fromCartographicArray(this._ellipsoid.cartesianArrayToCartographicArray(i))
		};
		var r = [Cesium.Math.toRadians(.05), Cesium.Math.toRadians(.1), Cesium.Math.toRadians(.2), Cesium.Math.toRadians(.5), Cesium.Math.toRadians(1), Cesium.Math.toRadians(2), Cesium.Math.toRadians(5), Cesium.Math.toRadians(10)];
		this.model = new t({
			numLines: 10
		}, this.viewer.scene)
	}
}), mars3d.TileLayer = mars3d.BaseLayer.extend({
	layer: null,
	add: function() {
		null != this.layer && this.remove();
		var t = mars3d.layer.createImageryProvider(this.config);
		if (null != t) {
			var e = this.config,
				i = {
					show: !0,
					alpha: this._opacity
				};
			if (e.rectangle && e.rectangle.xmin && e.rectangle.xmax && e.rectangle.ymin && e.rectangle.ymax) {
				var n = e.rectangle.xmin,
					r = e.rectangle.xmax,
					o = e.rectangle.ymin,
					a = e.rectangle.ymax;
				i.rectangle = Cesium.Rectangle.fromDegrees(n, o, r, a)
			}
			e.brightness && (i.brightness = e.brightness), e.contrast && (i.contrast = e.contrast), e.hue && (i.hue = e.hue), e.saturation && (i.saturation = e.saturation), e.gamma && (i.gamma = e.gamma), e.maximumAnisotropy && (i.maximumAnisotropy = e.maximumAnisotropy), e.minimumTerrainLevel && (i.minimumTerrainLevel = e.minimumTerrainLevel), e.maximumTerrainLevel && (i.maximumTerrainLevel = e.maximumTerrainLevel), this.layer = new Cesium.ImageryLayer(t, i), this.layer.config = this.config, this.viewer.imageryLayers.add(this.layer), this.setZIndex(this.config.order)
		}
	},
	remove: function() {
		null != this.layer && (this.viewer.imageryLayers.remove(this.layer, !0), this.layer = null)
	},
	hasOpacity: !0,
	_opacity: 1,
	setOpacity: function(t) {
		this._opacity = t, null != this.layer && (this.layer.alpha = t)
	},
	hasZIndex: !0,
	setZIndex: function(t) {
		if (null != this.layer && null != t) {
			this.viewer.imageryLayers.raiseToTop(this.layer);
			for (var e = this.viewer.imageryLayers._layers, i = e.length - 1; i >= 0; i--) if (e[i] != this.layer) {
				var n = e[i].config;
				n && n.order && t < n.order && this.viewer.imageryLayers.lower(this.layer)
			}
		}
	}
}), mars3d.GeoJsonLayer = mars3d.BaseLayer.extend({
	dataSource: null,
	add: function() {
		this.dataSource ? this.viewer.dataSources.add(this.dataSource) : this.queryData()
	},
	remove: function() {
		this.viewer.dataSources.remove(this.dataSource)
	},
	centerAt: function(t) {
		if (this.config.extent || this.config.center) mars3d.map.centerAt(this.config.extent || this.config.center, {
			duration: t,
			isWgs84: !0
		});
		else {
			if (null == this.dataSource) return;
			this.viewer.flyTo(this.dataSource.entities.values, {
				duration: t
			})
		}
	},
	hasOpacity: !0,
	_opacity: .9,
	setOpacity: function(t) {
		if (this._opacity = t, null != this.dataSource) for (var e = this.dataSource.entities.values, i = 0; i < e.length; i++) {
			var n = e[i];
			n.polygon && n.polygon.material && n.polygon.material.color ? (this._updatEntityAlpha(n.polygon.material.color, this._opacity), n.polygon.outlineColor && this._updatEntityAlpha(n.polygon.outlineColor, this._opacity)) : n.polyline && n.polyline.material && n.polyline.material.color ? this._updatEntityAlpha(n.polyline.material.color, this._opacity) : n.billboard && (n.billboard.color = new Cesium.Color.fromCssColorString("#FFFFFF").withAlpha(this._opacity), n.label && (n.label.fillColor && this._updatEntityAlpha(n.label.fillColor, this._opacity), n.label.outlineColor && this._updatEntityAlpha(n.label.outlineColor, this._opacity), n.label.backgroundColor && this._updatEntityAlpha(n.label.backgroundColor, this._opacity)))
		}
	},
	_updatEntityAlpha: function(t, e) {
		var i = t.getValue().withAlpha(e);
		t.setValue(i)
	},
	queryData: function() {
		var t = this;
		$.ajax({
			type: "get",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			url: this.config.url,
			timeout: 0,
			success: function(e) {
				if (void 0 == e || null == e) return void haoutil.msg(t.config.url + "数据为空！");
				if ("Feature" == e.type && (e = {
					type: "FeatureCollection",
					features: [e]
				}), 0 == e.features.length) return void haoutil.msg(t.config.url + "无要素数据！");
				var n = [];
				for (i = 0; i < e.features.length; i++) {
					var r = e.features[i];
					null != r && null != r.geometry && (r.geometry.coordinates && 0 == r.geometry.coordinates.length || n.push(r))
				}
				e.features = n;
				var o = Cesium.GeoJsonDataSource.load(e);
				o.then(function(e) {
					t.showResult(e)
				}).otherwise(function(e) {
					t.showError("服务出错", e)
				})
			},
			error: function(e, i, n) {
				console.log("Json文件" + t.config.url + "加载失败！"), haoutil.alert("Json文件" + t.config.url + "加载失败！")
			}
		})
	},
	showResult: function(t) {
		this.dataSource = t, this.viewer.dataSources.add(t), this.config.flyTo && this.centerAt();
		for (var e = t.entities.values, i = 0; i < e.length; i++) {
			var n = e[i];
			this.config.symbol ? this.setConfigSymbol(n, this.config.symbol) : this.setDefSymbol(n), (this.config.columns || this.config.popup) && (n.popup = this.getPopupByConfig(this.config, n.properties)), this.config.tooltip && (n.tooltip = this.getPopupByConfig({
				popup: this.config.tooltip
			}, n.properties))
		}
	},
	colorHash: {},
	setDefSymbol: function(t) {
		if (t.polygon) {
			var e = t.properties.OBJECTID,
				i = this.colorHash[e];
			i || (i = Cesium.Color.fromRandom({
				minimumGreen: .75,
				maximumBlue: .75,
				alpha: this._opacity
			}), this.colorHash[e] = i), t.polygon.material = i, t.polygon.outline = !0, t.polygon.outlineColor = Cesium.Color.WHITE
		} else if (t.polyline) {
			var e = t.properties.OBJECTID,
				i = this.colorHash[e];
			i || (i = Cesium.Color.fromRandom({
				minimumGreen: .75,
				maximumBlue: .75,
				alpha: this._opacity
			}), this.colorHash[e] = i), t.polyline.material = i, t.polyline.width = 2
		} else t.billboard && (t.billboard.scale = .5, t.billboard.horizontalOrigin = Cesium.HorizontalOrigin.CENTER, t.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM)
	},
	setConfigSymbol: function(t, e) {
		var i = t.properties,
			n = e.styleOptions;
		if (e.styleField) {
			var r = i[e.styleField],
				o = e.styleFieldOptions[r];
			null != o && (n = haoutil.system.clone(n), n = $.extend(n, o))
		}
		if (n = n || {}, this._opacity = n.opacity || 1, t.polygon) {
			if (mars3d.drawing.PolygonControl.attribute2Entity({
				style: n
			}, t.polygon), n.outlineWidth && n.outlineWidth > 1) {
				t.polygon.outline = !1;
				var a = {
					color: n.outlineColor,
					width: n.outlineWidth,
					opacity: n.outlineOpacity,
					lineType: "solid",
					outline: !1
				},
					s = mars3d.drawing.PolylineControl.attribute2Entity({
						style: a
					});
				s.positions = t.polygon.hierarchy._value.positions, this.dataSource._entityCollection.add({
					polyline: s
				})
			}
		} else t.polyline ? mars3d.drawing.PolylineControl.attribute2Entity({
			style: n
		}, t.polyline) : t.billboard && (t.billboard.heightReference = Cesium.HeightReference.RELATIVE_TO_GROUND, mars3d.drawing.BillboardControl.attribute2Entity({
			style: n
		}, t.billboard), n.label && n.label.field && (n.label.heightReference = Cesium.HeightReference.RELATIVE_TO_GROUND, t.label = mars3d.drawing.LabelControl.attribute2Entity({
			style: n.label
		}), t.label.text = i[n.label.field], t.label.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(0, n.label.distanceDisplayConditionFar || 25e3)));
		t.attribute = n
	},
	getPopupByConfig: function(t, e) {
		if (t.popup) {
			if ("object" != typeof t.popup) {
				if ("all" == t.popup) {
					var i = "<table>";
					for (var n in e) {
						var r = $.trim(e[n]);
						null != r && "" != r && "Null" != r && "Unknown" != r && "0" != r && 0 != r.length && (i += '<tr>  <td  style="text-align: right;min-width: 80px;">' + n + "：</td> <td>" + r + "</td>   </tr>")
					}
					return i += "</table>", "<table></table>" != i && "<b>" + t.name + "</b><br/>" + i
				}
				return L.Util.template(t.popup, e)
			}
			if ("iframe" == t.popup.type) {
				var o = L.Util.template(t.popup.url, e),
					i = '<iframe id="ifarm" src="' + o + '"  style="width:' + (t.popup.width || "300") + "px;height:" + (t.popup.height || "300") + 'px;overflow:hidden;margin:0;" scrolling="no" frameborder="0" ></iframe>';
				return i
			}
		} else if (t.columns) {
			for (var a = {}, s = 0; s < t.columns.length; s++) {
				var l = t.columns[s];
				a[l.field] = l.name
			}
			var i = "<table>";
			for (var n in e) {
				var r = $.trim(e[n]);
				if (null != r && "" != r && "Null" != r && "Unknown" != r && "0" != r && 0 != r.length) {
					var u = a[n];
					null != u && (i += '<tr>  <td  style="text-align: right;min-width: 80px;">' + u + "：</td> <td>" + r + "</td>   </tr>")
				}
			}
			return i += "</table>", "<table></table>" != i && i
		}
		return !1
	}
}), mars3d.ArcFeatureLayer = mars3d.GeoJsonLayer.extend({
	queryData: function() {
		var t = this,
			e = L.esri.query({
				url: this.config.url
			});
		this.config.where && e.where(this.config.where), e.run(function(e, n, r) {
			if (null != e && e.code > 0) return void haoutil.alert(e.message, "服务访问出错");
			if (void 0 == n || null == n || 0 == n.features.length) return void haoutil.msg("未找到符合查询条件的要素！");
			var o = [];
			for (i = 0; i < n.features.length; i++) {
				var a = n.features[i];
				null != a && null != a.geometry && (a.geometry.coordinates && 0 == a.geometry.coordinates.length || o.push(a))
			}
			n.features = o;
			var s = Cesium.GeoJsonDataSource.load(n);
			s.then(function(e) {
				t.showResult(e)
			}).otherwise(function(e) {
				t.showError("服务出错", e)
			})
		})
	}
}), mars3d.GltfLayer = mars3d.BaseLayer.extend({
	model: null,
	add: function() {
		this.model ? this.viewer.entities.add(this.model) : this.initData()
	},
	remove: function() {
		this.viewer.entities.remove(this.model)
	},
	centerAt: function(t) {
		if (null != this.model) if (this.config.extent || this.config.center) mars3d.map.centerAt(this.config.extent || this.config.center, {
			duration: t,
			isWgs84: !0
		});
		else {
			var e = this.config.position;
			mars3d.map.centerAt(e, {
				duration: t,
				isWgs84: !0
			})
		}
	},
	initData: function() {
		var t = this.config.position;
		t = mars3d.map.point2map(t);
		var e = Cesium.Cartesian3.fromDegrees(t.x, t.y, t.z || 0),
			i = Cesium.Math.toRadians(t.heading || 0),
			n = Cesium.Math.toRadians(t.pitch || 0),
			r = Cesium.Math.toRadians(t.roll || 0),
			o = new Cesium.HeadingPitchRoll(i, n, r),
			a = Cesium.Transforms.headingPitchRollQuaternion(e, o);
		this.model = this.viewer.entities.add({
			name: this.config.name,
			position: e,
			orientation: a,
			model: {
				uri: this.config.url,
				scale: this.config.scale || 1
			}
		})
	}
}), mars3d.Tiles3dLayer = mars3d.BaseLayer.extend({
	model: null,
	originalCenter: null,
	boundingSphere: null,
	add: function() {
		this.model ? this.viewer.scene.primitives.add(this.model) : this.initData()
	},
	remove: function() {
		this.viewer.scene.primitives.remove(this.model), this.model = null
	},
	centerAt: function(t) {
		this.config.extent || this.config.center ? mars3d.map.centerAt(this.config.extent || this.config.center, {
			duration: t,
			isWgs84: !0
		}) : this.boundingSphere && this.viewer.camera.flyToBoundingSphere(this.boundingSphere, {
			offset: new Cesium.HeadingPitchRange(0, (-.5), 2 * this.boundingSphere.radius),
			duration: t
		})
	},
    initData: function () {
        //初始化加载模型
		this.config.maximumScreenSpaceError = this.config.maximumScreenSpaceError || 1, this.model = this.viewer.scene.primitives.add(new Cesium.Cesium3DTileset(this.config));
		var t = this;
		this.model.readyPromise.then(function(e) {
			var i = e.boundingSphere;
			t.boundingSphere = i;
			var n = Cesium.Cartographic.fromCartesian(i.center),
				r = Number(n.height.toFixed(2)),
				o = Number(Cesium.Math.toDegrees(n.longitude).toFixed(6)),
				a = Number(Cesium.Math.toDegrees(n.latitude).toFixed(6));
			t.originalCenter = {
				x: o,
				y: a,
				z: r
            },
                console.log((t.config.name || "") + " 模型原始位置:" + JSON.stringify(t.originalCenter));
			var s = mars3d.map.point2map(t.originalCenter);
			if (s.x != t.originalCenter.x || s.y != t.originalCenter.y || null != t.config.offset) {
				t.config.offset = t.config.offset || {};
				var l = {
					x: t.config.offset.x || s.x,
					y: t.config.offset.y || s.y,
					z: t.config.offset.z || 0
				};
				t.updateMatrix(l)
			}!mars3d.map.isFlyAnimation() && t.config.flyTo && t.centerAt(0)
		})
	},
	updateMatrix: function(t) {
		if (null != this.model) {
			console.log(" 模型修改后位置:" + JSON.stringify(t));
			var e = this.model.boundingSphere,
				i = Cesium.Cartographic.fromCartesian(e.center),
				n = Cesium.Cartesian3.fromRadians(i.longitude, i.latitude, 0),
				r = Cesium.Cartesian3.fromDegrees(t.x, t.y, t.z),
				o = Cesium.Cartesian3.subtract(r, n, new Cesium.Cartesian3);
			this.model.modelMatrix = Cesium.Matrix4.fromTranslation(o)
		}
	}
}), mars3d.latlng = function() {
	function t(t, e) {
		var i, n = t.pick(e);
		if (t.pickPositionSupported && Cesium.defined(n) && (i = t.pickPosition(e))) {
			var r = t.globe.ellipsoid.cartesianToCartographic(i);
			if (r.height > 0) return i
		}
		var o = t.camera.getPickRay(e);
		return i = t.globe.pick(o, t)
	}
	function e(t, e) {
		var n = t.scene,
			r = i(n),
			o = r;
		if (!o) {
			var a = n.globe,
				s = n.camera.positionCartographic.clone(),
				l = a.getHeight(s);
			s.height = l || 0, o = Cesium.Ellipsoid.WGS84.cartographicToCartesian(s)
		}
		var u = Cesium.Cartographic.fromCartesian(o),
			c = {};
		return c.y = Number(Cesium.Math.toDegrees(u.latitude).toFixed(6)), c.x = Number(Cesium.Math.toDegrees(u.longitude).toFixed(6)), c.z = Number(u.height.toFixed(1)), e && (c = mars3d.map.point2wgs(c)), c
	}
	function i(t) {
		const e = t.canvas, i = new Cesium.Cartesian2(e.clientWidth / 2, e.clientHeight / 2), n = t.camera.getPickRay(i), r = t.globe.pick(n, t);
		return r || t.camera.pickEllipsoid(i)
	}
	function n(t, e) {
		var i = {
			xmin: 70,
			xmax: 140,
			ymin: 0,
			ymax: 55
		},
			n = t.scene,
			r = n.globe.ellipsoid,
			o = n.canvas,
			a = t.camera.pickEllipsoid(new Cesium.Cartesian2(0, 0), r);
		if (a) {
			var s = r.cartesianToCartographic(a);
			i.xmin = Cesium.Math.toDegrees(s.longitude), i.ymax = Cesium.Math.toDegrees(s.latitude)
		} else {
			for (var l, u = o.width / 2, c = o.height / 2, h = 0; h <= c; h += 10) {
				var d = h <= u ? h : u;
				if (l = t.camera.pickEllipsoid(new Cesium.Cartesian2(d, h), r)) break
			}
			if (l) {
				var s = r.cartesianToCartographic(l);
				i.xmin = Cesium.Math.toDegrees(s.longitude), i.ymax = Cesium.Math.toDegrees(s.latitude)
			}
		}
		var p = t.camera.pickEllipsoid(new Cesium.Cartesian2(o.width, o.height), r);
		if (p) {
			var f = r.cartesianToCartographic(p);
			i.xmax = Cesium.Math.toDegrees(f.longitude), i.ymin = Cesium.Math.toDegrees(f.latitude)
		} else {
			for (var m, u = o.width / 2, c = o.height / 2, h = o.height; h >= c; h -= 10) {
				var d = h >= u ? h : u;
				if (m = t.camera.pickEllipsoid(new Cesium.Cartesian2(d, h), r)) break
			}
			if (m) {
				var f = r.cartesianToCartographic(m);
				i.xmax = Cesium.Math.toDegrees(f.longitude), i.ymin = Cesium.Math.toDegrees(f.latitude)
			}
		}
		if (e) {
			var g = mars3d.map.point2wgs({
				x: i.xmin,
				y: i.ymin
			});
			i.xmin = g.x, i.ymin = g.y;
			var v = mars3d.map.point2wgs({
				x: i.xmax,
				y: i.ymax
			});
			i.xmax = v.x, i.ymax = v.y
		}
		return i
	}
	function r(t, e) {
		var i = t.camera,
			n = i.positionCartographic,
			r = {};
		return r.y = Number(Cesium.Math.toDegrees(n.latitude).toFixed(6)), r.x = Number(Cesium.Math.toDegrees(n.longitude).toFixed(6)), r.z = Number(n.height.toFixed(1)), r.heading = Number(Cesium.Math.toDegrees(i.heading).toFixed(1)), r.pitch = Number(Cesium.Math.toDegrees(i.pitch).toFixed(1)), r.roll = Number(Cesium.Math.toDegrees(i.roll).toFixed(1)), e && (r = mars3d.map.point2wgs(r)), r
	}
	return {
		getCurrentMousePosition: t,
		getCenter: e,
		getExtent: n,
		getCameraView: r
	}
}(), mars3d.layer = function() {
	function t(e, i, n, r) {
		var o;
		switch (e.url && (n && (e.url = e.url.replace("$serverURL$", n)), e.url = e.url.replace("$hostname$", location.hostname).replace("$host$", location.host)), e.type) {
		case "group":
			if (e.layers && e.layers.length > 0) {
				for (var a = [], s = 0; s < e.layers.length; s++) {
					var l = t(e.layers[s], i, n);
					null != l && a.push(l)
				}
				e._layers = a, o = new mars3d.GroupLayer(e, i)
			}
			break;
		case "www_bing":
		case "www_osm":
		case "www_google":
		case "www_gaode":
		case "www_tdt":
		case "arcgis_cache":
		case "arcgis":
		case "arcgis_tile":
		case "wmts":
		case "tms":
		case "wms":
		case "xyz":
		case "tile":
		case "single":
		case "image":
		case "custom_tilecoord":
		case "custom_grid":
			o = new mars3d.TileLayer(e, i);
			break;
		case "custom_graticule":
			o = new mars3d.GraticuleLayer(e, i);
			break;
		case "3dtiles":
			o = new mars3d.Tiles3dLayer(e, i);
			break;
		case "gltf":
			o = new mars3d.GltfLayer(e, i);
			break;
		case "arcgis_dynamic":
			o = new mars3d.ArcFeatureLayer(e, i);
			break;
		case "geojson":
			o = new mars3d.GeoJsonLayer(e, i)
		}
		if (r) {
			var u = r(e, i, o);
			u && (o = u)
		}
		return null == o ? "group" != e.type && console.log("配置中的图层未处理：" + JSON.stringify(e)) : e._layer = o, o
	}
	function e(t, e) {
		t.url && (e && (t.url = t.url.replace("$serverURL$", e)), t.url = t.url.replace("$hostname$", location.hostname).replace("$host$", location.host));
		var i = {};
		for (var n in t) {
			var r = t[n];
			if (null != r) switch (n) {
			default:
				i[n] = r;
				break;
			case "crs":
				"4326" == r || "EPSG4326" == r.toUpperCase() ? i.tilingScheme = new Cesium.GeographicTilingScheme({
					numberOfLevelZeroTilesX: t.numberOfLevelZeroTilesX || 2,
					numberOfLevelZeroTilesY: t.numberOfLevelZeroTilesY || 1
				}) : i.tilingScheme = new Cesium.WebMercatorTilingScheme({
					numberOfLevelZeroTilesX: t.numberOfLevelZeroTilesX || 1,
					numberOfLevelZeroTilesY: t.numberOfLevelZeroTilesY || 1
				});
				break;
			case "proxy":
				i.proxy = new Cesium.DefaultProxy(r);
				break;
			case "rectangle":
				i.rectangle = Cesium.Rectangle.fromDegrees(r.xmin, r.ymin, r.xmax, r.ymax)
			}
		}
		var o;
		switch (i.type) {
		case "single":
		case "image":
			o = new Cesium.SingleTileImageryProvider(i);
			break;
		case "xyz":
		case "tile":
			o = new Cesium.UrlTemplateImageryProvider(i);
			break;
		case "wms":
			o = new Cesium.WebMapServiceImageryProvider(i);
			break;
		case "tms":
			i.url || (i.url = Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII")), o = new Cesium.createTileMapServiceImageryProvider(i);
			break;
		case "wmts":
			o = new Cesium.WebMapTileServiceImageryProvider(i);
			break;
		case "arcgis":
		case "arcgis_tile":
			o = new Cesium.ArcGisMapServerImageryProvider(i);
			break;
		case "arcgis_cache":
			o = new ArcTileImageryProvider(i);
			break;
		case "www_tdt":
			var a;
			switch (i.layer) {
			default:
			case "vec_d":
				a = "vec";
				break;
			case "vec_z":
				a = "cva";
				break;
			case "img_d":
				a = "img";
				break;
			case "img_z":
				a = "cia";
				break;
			case "ter_d":
				a = "ter";
				break;
			case "ter_z":
				a = "cta"
			}
			var s = 18;
			if ("4326" == t.crs) {
				for (var l = new Array(s), u = 0; u <= s; u++) l[u] = (u + 1).toString();
				o = new Cesium.WebMapTileServiceImageryProvider({
					url: "http://t{s}.tianditu.com/" + a + "_c/wmts?service=WMTS&version=1.0.0&request=GetTile&tilematrix={TileMatrix}&layer=" + a + "&style={style}&tilerow={TileRow}&tilecol={TileCol}&tilematrixset={TileMatrixSet}&format=tiles",
					layer: a,
					style: "default",
					format: "tiles",
					tileMatrixSetID: "c",
					subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
					tileMatrixLabels: l,
					tilingScheme: new Cesium.GeographicTilingScheme,
					maximumLevel: s,
					proxy: i.proxy
				})
			} else {
				for (var l = new Array(s), u = 0; u <= s; u++) l[u] = u.toString();
				o = new Cesium.WebMapTileServiceImageryProvider({
					url: "http://t{s}.tianditu.com/" + a + "_w/wmts?service=WMTS&version=1.0.0&request=GetTile&tilematrix={TileMatrix}&layer=" + a + "&style={style}&tilerow={TileRow}&tilecol={TileCol}&tilematrixset={TileMatrixSet}&format=tiles",
					layer: a,
					style: "default",
					format: "tiles",
					tileMatrixSetID: "w",
					subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
					tileMatrixLabels: l,
					tilingScheme: new Cesium.WebMercatorTilingScheme,
					maximumLevel: s,
					proxy: i.proxy
				})
			}
			break;
		case "www_gaode":
			var c;
			switch (i.layer) {
			case "vec":
			default:
				c = "http://" + (i.bigfont ? "wprd" : "webrd") + "0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}";
				break;
			case "img_d":
				c = "http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}";
				break;
			case "img_z":
				c = "http://webst0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8";
				break;
			case "time":
				var h = (new Date).getTime();
				c = "http://tm.amap.com/trafficengine/mapabc/traffictile?v=1.0&;t=1&x={x}&y={y}&z={z}&&t=" + h
			}
			o = new Cesium.UrlTemplateImageryProvider({
				url: c,
				subdomains: ["1", "2", "3", "4"],
				maximumLevel: 18,
				proxy: i.proxy
			});
			break;
		case "www_google":
			var c;
			switch (i.layer) {
			case "vec":
			default:
				c = "http://mt{s}.google.cn/vt/lyrs=m@207000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=Galile";
				break;
			case "img_d":
				c = "http://mt{s}.google.cn/vt/lyrs=s&hl=zh-CN&gl=CN&x={x}&y={y}&z={z}&s=Gali";
				break;
			case "img_z":
				c = "http://mt{s}.google.cn/vt/imgtp=png32&lyrs=h@207000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil";
				break;
			case "ter":
				c = "http://mt{s}.google.cn/vt/lyrs=t@131,r@227000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galile"
			}
			o = new Cesium.UrlTemplateImageryProvider({
				url: c,
				subdomains: ["1", "2", "3"],
				maximumLevel: 20,
				proxy: i.proxy
			});
			break;
		case "www_osm":
			o = new Cesium.createOpenStreetMapImageryProvider({
				url: "https://{s}.tile.openstreetmap.org/",
				subdomains: ["a", "b", "c"],
				maximumLevel: 18,
				proxy: i.proxy
			});
			break;
		case "www_bing":
			var d = i.layer || Cesium.BingMapsStyle.Aerial;
			o = new Cesium.BingMapsImageryProvider({
				url: "https://dev.virtualearth.net",
				key: "AtkX3zhnRe5fyGuLU30uZw8r3sxdBDnpQly7KfFTCB2rGlDgXBG3yr-qEiQEicEc",
				mapStyle: d,
				proxy: i.proxy
			});
			break;
		case "custom_grid":
			o = new Cesium.GridImageryProvider;
			break;
		case "custom_tilecoord":
			o = new Cesium.TileCoordinatesImageryProvider;
			break;
		default:
			console.log("config配置图层未处理:" + t)
		}
		return o
	}
	return {
		createLayer: t,
		createImageryProvider: e
	}
}(), mars3d.popup = function() {
	function t(t) {
		s = t;
		var i = '<div id="pupup-all-view" ></div>';
		$("#" + s._container.id).append(i);
		var n = new Cesium.ScreenSpaceEventHandler(s.scene.canvas);
		n.setInputAction(e, Cesium.ScreenSpaceEventType.LEFT_CLICK), s.scene.postRender.addEventListener(r)
	}
	function e(t) {
		var e = t.position,
			n = s.scene.pick(e);
		if (n && Cesium.defined(n.id)) {
			var r = n.id;
			if (!r.popup) return;
			var a;
			a = r.billboard || r.label || r.point ? n.primitive.position : mars3d.latlng.getCurrentMousePosition(s.scene, e), i(r, a)
		} else o()
	}
	function i(t, e) {
		if (null != t && null != t.popup) {
			var i = "popup-" + t.id;
			o(i), l[i] = {
				popup: t.popup,
				cartesian: e
			};
			var r;
			r = "object" == typeof t.popup ? t.popup.html : t.popup, r = '<div id="' + i + '" class="cesium-popup">            <a class="cesium-popup-close-button cesium-popup-color" href="javascript:mars3d.popup.hide(\'' + i + '\')">×</a>            <div class="cesium-popup-content-wrapper cesium-popup-background">                <div class="cesium-popup-content cesium-popup-color">' + r + '</div>            </div>            <div class="cesium-popup-tip-container"><div class="cesium-popup-tip cesium-popup-background"></div></div>        </div>', $("#pupup-all-view").append(r);
			var a = n(i, e, t.popup);
			return a ? void 0 : void o(i)
		}
	}
	function n(t, e, i) {
		var n = Cesium.SceneTransforms.wgs84ToWindowCoordinates(s.scene, e);
		if (null == n) return !1;
		var r = $("#" + t),
			o = n.x - r.width() / 2,
			a = n.y - r.height();
		return i && "object" == typeof i && i.anchor && (o += i.anchor[0], a += i.anchor[1]), r.css("transform", "translate3d(" + o + "px," + a + "px, 0)"), !0
	}
	function r() {
		for (var t in l) {
			var e = l[t];
			n(t, e.cartesian, e.popup)
		}
	}
	function o(t) {
		!u && t ? ($("#" + t).remove(), delete l[t]) : ($("#pupup-all-view").empty(), l = {})
	}
	function a(t) {
		u = t
	}
	var s, l = {},
		u = !0;
	return {
		isOnly: a,
		init: t,
		show: i,
		hide: o,
		close: o
	}
}(), mars3d.tooltip = function() {
	function t(t) {
		r = t;
		var i = '<div id="tooltip-view" class="cesium-popup" style="display:none;">     <div class="cesium-popup-content-wrapper  cesium-popup-background">         <div id="tooltip-content" class="cesium-popup-content cesium-popup-color"></div>     </div>     <div class="cesium-popup-tip-container"><div class="cesium-popup-tip  cesium-popup-background"></div></div></div> ';
		$("#" + r._container.id).append(i);
		var n = new Cesium.ScreenSpaceEventHandler(r.scene.canvas);
		n.setInputAction(e, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
	}
	function e(t) {
		var e = t.endPosition,
			a = r.scene.pick(e);
		if (a && Cesium.defined(a.id)) {
			var s = a.id;
			if (!s.tooltip) return void n();
			if (s.billboard || s.label || s.point) {
				if (o == s) return;
				o = s
			}
			var l = mars3d.latlng.getCurrentMousePosition(r.scene, e);
			i(s, l, e)
		} else n()
	}
	function i(t, e, i) {
		if (null != t && null != t.tooltip) {
			if (null == i && (i = Cesium.SceneTransforms.wgs84ToWindowCoordinates(r.scene, e)), null == i) return void n();
			var o, a = $("#tooltip-view");
			o = "object" == typeof t.tooltip ? t.tooltip.html : t.tooltip, $("#tooltip-content").html(o), a.show();
			var s = i.x - a.width() / 2,
				l = i.y - a.height(),
				u = t.tooltip;
			u && "object" == typeof u && u.anchor && (s += u.anchor[0], l += u.anchor[1]), a.css("transform", "translate3d(" + s + "px," + l + "px, 0)")
		}
	}
	function n() {
		$("#tooltip-content").empty(), $("#tooltip-view").hide(), o = null
	}
	var r, o;
	return {
		init: t,
		show: i,
		hide: n,
		close: n
	}
}(), mars3d.geocoder = function() {
	function t(t, i) {
		o = t, l = i.citycode || "", $(".cesium-geocoder-input").attr("placeholder", "输入地名、坐标后按回车键查询"), a = o.geocoder.viewModel, a._searchCommand = Cesium.createCommand(function() {
			n(), a.isSearchInProgress ? e() : r()
		})
	}
	function e() {
		a._isSearchInProgress = !1, Cesium.defined(a._geocodeInProgress) && (a._geocodeInProgress.cancel = !0, a._geocodeInProgress = void 0)
	}
	function i(t) {
		a._scene.camera.flyTo({
			destination: t,
			complete: function() {
				a._complete.raiseEvent()
			},
			duration: a._flightDuration,
			endTransform: Cesium.Matrix4.IDENTITY
		})
	}
	function n() {
		if (Cesium.defined(a.entities)) for (var t = 0; t < a.entities.length; t++) o.entities.remove(a.entities[t]);
		a.entities = []
	}
	function r() {
		var t = a.searchText;
		if (!/^\s*$/.test(t)) {
			var e = t.match(/[^\s,\n]+/g);
			if (2 === e.length || 3 === e.length) {
				var r = +e[0],
					s = +e[1],
					u = 3 === e.length ? +e[2] : 300;
				if (!isNaN(r) && !isNaN(s) && !isNaN(u)) return void i(Cesium.Cartesian3.fromDegrees(r, s, u))
			}
			a._isSearchInProgress = !0;
			var c = "http://restapi.amap.com/v3/place/text?city=" + l + "&citylimit=true&key=57f8ebe12797a73fc5b87f5d4ef859b1&keywords=" + t,
				h = Cesium.loadJson(c),
				d = a._geocodeInProgress = Cesium.when(h, function(e) {
					if (n(), a._searchText = t, !d.cancel) {
						if (a._isSearchInProgress = !1, 0 == e.status) return void alert("请求失败(" + e.infocode + ")：" + e.info);
						if (0 === e.pois.length) return void alert("未查询到相关数据！");
						for (var i, r = 0; r < e.pois.length; r++) {
							var s = e.pois[r],
								l = "<div>名称：" + s.name + "</div><div>地址：" + s.address + "</div><div>区域：" + s.pname + s.cityname + s.adname + "</div><div>类别：" + s.type + "</div>";
							i = s.location.split(","), i = pointconvert.gcj2wgs(i);
							var u = mars3d.map.point2map({
								x: i[0],
								y: i[1]
							}),
								c = o.entities.add({
									id: r + "." + s.name,
									position: Cesium.Cartesian3.fromDegrees(u.x, u.y),
									point: {
										color: new Cesium.Color.fromCssColorString("#3388ff"),
										pixelSize: 10,
										outlineColor: new Cesium.Color.fromCssColorString("#ffffff"),
										outlineWidth: 2,
										heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
									},
									label: {
										text: s.name,
										font: "16px Helvetica",
										style: Cesium.LabelStyle.FILL_AND_OUTLINE,
										fillColor: Cesium.Color.AZURE,
										outlineColor: Cesium.Color.BLACK,
										outlineWidth: 2,
										horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
										verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
										pixelOffset: new Cesium.Cartesian2(0, (-10)),
										heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
									},
									data: s,
									tooltip: {
										html: l,
										anchor: [0, -20]
									}
								});
							a.entities.push(c)
						}
						o.flyTo(a.entities, {
							duration: 3
						})
					}
				}, function() {
					return d.cancel ? void n() : (a._isSearchInProgress = !1, void(a.searchText = a._searchText + " (error)"))
				})
		}
	}
	var o, a, s = "cesium地图 查询POI工具栏",
		l = "";
	return {
		name: s,
		init: t
	}
}(), mars3d.map = function() {
	function t() {
		return b
	}
	function e(t, e, i) {
		w = t, C = e;
		var r = {
			animation: !1,
			timeline: !1,
			fullscreenButton: !0,
			vrButton: !1,
			geocoder: !1,
			sceneModePicker: !1,
			homeButton: !0,
			navigationHelpButton: !0,
			navigationInstructionsInitiallyVisible: !1,
			infoBox: !0,
			selectionIndicator: !1,
			baseLayerPicker: !1
		};
		null == i && (i = {});
		for (var o in r) i.hasOwnProperty(o) || (i[o] = r[o]);
		Cesium.BingMapsApi.defaultKey = "AtkX3zhnRe5fyGuLU30uZw8r3sxdBDnpQly7KfFTCB2rGlDgXBG3yr-qEiQEicEc", C.crs = C.crs || "3857", x = C.crs;
		var a = !1,
			l = C.controls;
		if (l) for (var o = 0; o < l.length; o++) {
			var u = l[o];
			if (!u.hasOwnProperty("visible") || u.visible) switch (u.type) {
			case "geocoder":
				i.geocoder = !0;
				break;
			case "mousezoom":
				a = !0
			}
		}
		C.terrain && C.terrain.visible && (i.terrainProvider = n()), null == i.imageryProvider && (i.imageryProvider = Cesium.createTileMapServiceImageryProvider({
			url: Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII")
		})), b = new Cesium.Viewer(t, i), b.cesiumWidget.creditContainer.style.display = "none";
		var f = C.basemaps;
		if (f && f.length > 0) {
			for (var m = b.imageryLayers, g = m.length, o = 0; o < g; o++) {
				var v = m.get(0);
				m.remove(v, !0)
			}
			for (var o = 0; o < f.length; o++) {
				var u = f[o];
				u.visible && u.crs && (x = u.crs), mars3d.layer.createLayer(u, b, e.serverURL, i.layerToMap)
			}
		}
		b.homeButton && b.homeButton.viewModel.command.beforeExecute.addEventListener(function(t) {
			s(), t.cancel = !0
		}), s(null, {
			duration: 0
		});
		var _;
		b.scene.morphStart.addEventListener(function(t) {
			_ = mars3d.latlng.getCameraView(b)
		}), b.scene.morphComplete.addEventListener(function(t) {
			setTimeout(function() {
				s(_)
			}, 100)
		});
		var f = C.operationallayers;
		if (f && f.length > 0) for (var o = 0; o < f.length; o++) {
			var u = f[o];
			mars3d.layer.createLayer(u, b, e.serverURL, i.layerToMap)
		}
		var l = C.controls;
		if (l) for (var o = 0; o < l.length; o++) {
			var u = l[o];
			if (!u.hasOwnProperty("visible") || u.visible) switch (u.type) {
			case "location":
				c(u);
				break;
			case "navigation":
				d(u);
				break;
			case "geocoder":
				mars3d.geocoder.init(b, u);
				break;
			case "msgbar":
				h(u)
			}
		}
		mars3d.popup.init(b), mars3d.tooltip.init(b);
		var y = b.scene;
		if (y.globe.baseColor = Cesium.Color.SILVER, C.style && (y.globe.depthTestAgainstTerrain = C.style.testTerrain, y.globe.enableLighting = C.style.lighting, y.skyAtmosphere && (y.skyAtmosphere.show = C.style.atmosphere), y.fog && (y.fog.enabled = C.style.fog)), y.screenSpaceCameraController.maximumZoomDistance = C.maxzoom || 2e7, y.screenSpaceCameraController.minimumZoomDistance = C.minzoom || 1, a && p()) {
			$("#" + w).append('<div class="cesium-mousezoom"><div class="zoomimg"/></div>');
			var E = new Cesium.ScreenSpaceEventHandler(y.canvas);
			E.setInputAction(function(t) {
				$(".cesium-mousezoom").addClass("cesium-mousezoom-visible"), setTimeout(function() {
					$(".cesium-mousezoom").removeClass("cesium-mousezoom-visible")
				}, 200)
			}, Cesium.ScreenSpaceEventType.WHEEL), E.setInputAction(function(t) {
				$(".cesium-mousezoom").css({
					top: t.endPosition.y + "px",
					left: t.endPosition.x + "px"
				})
			}, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
		}
		if (b.navigationHelpButton) {
			var k = $(".cesium-click-navigation-help .cesium-navigation-help-pan");
			k.html("平移视图"), k.next().html("左键点击+拖动");
			var L = $(".cesium-click-navigation-help .cesium-navigation-help-zoom");
			L.html("缩放视图"), L.next().html("右键点击+拖动，"), L.next().next().html("或鼠标滚轮缩放");
			var P = $(".cesium-click-navigation-help .cesium-navigation-help-rotate");
			P.html("旋转视图"), P.next().html("中键点击+拖动，"), P.next().next().html("或按Ctrl键+左右键点击+拖动");
			var k = $(".cesium-touch-navigation-help .cesium-navigation-help-pan");
			k.html("平移视图"), k.next().html("一个手指拖动");
			var L = $(".cesium-touch-navigation-help .cesium-navigation-help-zoom");
			L.html("缩放视图"), L.next().html("两个手指拖动");
			var P = $(".cesium-touch-navigation-help .cesium-navigation-help-rotate");
			P.html("倾斜角度"), P.next().html("两指拖曳，同方向");
			var D = $(".cesium-touch-navigation-help .cesium-navigation-help-tilt");
			D.html("旋转视图"), D.next().html("两手指拖动，方向相反")
		}
		return b
	}
	function i(t, e) {
		null == e && (e = "name");
		var i = C.basemaps;
		if (i && i.length > 0) for (var n = 0; n < i.length; n++) {
			var r = i[n];
			if (null != r && r[e] == t) return r._layer
		}
		if (i = C.operationallayers, i && i.length > 0) for (var n = 0; n < i.length; n++) {
			var r = i[n];
			if (null != r && r[e] == t) return r._layer
		}
		return null
	}
	function n() {
		if (null == E) {
			var t = C.terrain || {};
			t.hasOwnProperty("requestWaterMask") || (t.requestWaterMask = !0), t.hasOwnProperty("requestVertexNormals") || (t.requestVertexNormals = !0), t.url ? (C.serverURL && (t.url = t.url.replace("$serverURL$", C.serverURL)), t.url = t.url.replace("$hostname$", location.hostname).replace("$host$", location.host)) : t.url = "http://assets.agi.com/stk-terrain/world", E = new Cesium.CesiumTerrainProvider(t)
		}
		return E
	}
	function r() {
		return null != E && b.terrainProvider == E
	}
	function o(t) {
		t ? b.terrainProvider = n() : b.terrainProvider = new Cesium.EllipsoidTerrainProvider({
			ellipsoid: Cesium.Ellipsoid.WGS84
		})
	}
	function a(t) {
		return "number" == typeof t && t.constructor == Number
	}
	function s(t, e, i) {
		if (null == e ? e = {} : a(e) && (e = {
			duration: e
		}), i && (e.complete = i), null == t && (e.isWgs84 = !0, t = C.extent || C.center), t.xmin && t.xmax && t.ymin && t.ymax) {
			var n = t.xmin,
				r = t.xmax,
				o = t.ymin,
				s = t.ymax;
			if (e.isWgs84) {
				var l = mars3d.map.point2map({
					x: n,
					y: o
				});
				n = l.x, o = l.y;
				var u = mars3d.map.point2map({
					x: r,
					y: s
				});
				r = u.x, s = u.y
			}
			var c = Cesium.Rectangle.fromDegrees(n, o, r, s);
			b.camera.flyTo({
				destination: c,
				duration: e.duration,
				complete: e.complete
			})
		} else {
			e.isWgs84 && (t = mars3d.map.point2map(t));
			var h = e.minz || 2500;
			b.camera.positionCartographic.height < h && (h = b.camera.positionCartographic.height), null != t.z && 0 != t.z && (h = t.z), b.camera.flyTo({
				destination: Cesium.Cartesian3.fromDegrees(t.x, t.y, h),
				orientation: {
					heading: Cesium.Math.toRadians(t.heading || 0),
					pitch: Cesium.Math.toRadians(t.pitch || -90),
					roll: Cesium.Math.toRadians(t.roll || 0)
				},
				duration: e.duration,
				complete: e.complete
			})
		}
	}
	function l() {
		return L
	}
	function u(t, e) {
		var i = e || mars3d.latlng.getCameraView(b);
		L = !0, b.camera.setView({
			destination: Cesium.Cartesian3.fromDegrees(-85.16, 13.71, 23e6)
		}), b.camera.flyTo({
			destination: Cesium.Cartesian3.fromDegrees(i.x, i.y, 23e6),
			duration: 2,
			easingFunction: Cesium.EasingFunction.LINEAR_NONE,
			complete: function() {
				var e = 1.2 * (i.z || 9e4) + 8e3;
				e > 23e6 && (e = 23e6), b.camera.flyTo({
					destination: Cesium.Cartesian3.fromDegrees(i.x, i.y, e),
					complete: function() {
						s(i, {
							duration: 2,
							complete: function() {
								L = !1, t && t()
							}
						})
					}
				})
			}
		})
	}
	function c(t) {
		document.getElementById("location_mars_jwd") || $("#" + w).prepend('<div id="location_mars_jwd" class="location-bar no-print" ></div>'), t.style ? $("#location_mars_jwd").css(t.style) : $("#location_mars_jwd").css({
			left: "5px",
			bottom: "2px"
		});
		var e = new Cesium.ScreenSpaceEventHandler(b.scene.canvas);
		e.setInputAction(function(e) {
			var i = mars3d.latlng.getCurrentMousePosition(b.scene, e.endPosition);
			if (i) {
				var n = Cesium.Cartographic.fromCartesian(i),
					r = Cesium.Math.toDegrees(n.longitude),
					o = Cesium.Math.toDegrees(n.latitude),
					a = n.height;
				if (t.coordinate && "wgs" == t.coordinate) {
					var s = mars3d.map.point2wgs({
						x: r,
						y: o
					});
					r = s.x, o = s.y
				}
				var l = "经度：" + r.toFixed(6) + " 纬度：" + o.toFixed(6);
				a > 0 && (l += " 高程：" + a.toFixed(1) + "米"), $("#location_mars_jwd").html(l)
			} else $("#location_mars_jwd").html("")
		}, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
	}
	function h(t) {
		function e() {
			var e = mars3d.latlng.getCenter(b);
			if (e) {
				var i = !1;
				for (var n in t.data) {
					var r = t.data[n];
					if (e.x >= r.xmin && e.x <= r.xmax && e.y >= r.ymin && e.y <= r.ymax) {
						$("#mars_msgbar").html(r.msg), i = !0;
						break
					}
				}
			}
			i || $("#mars_msgbar").html("")
		}
		null != t.data && 0 != t.data.length && (document.getElementById("mars_msgbar") || $("#" + w).prepend('<div id="mars_msgbar" class="location-bar no-print" ></div>'), t.style ? $("#mars_msgbar").css(t.style) : $("#mars_msgbar").css({
			right: "30px",
			bottom: "1px"
		}), b.scene.camera.moveEnd.addEventListener(e))
	}
	function d(t) {
		b.extend(Cesium.viewerCesiumNavigationMixin, {
			defaultResetView: Cesium.Rectangle.fromDegrees(110, 20, 120, 30),
			enableZoomControls: !0
		}), $(".distance-legend").css("left", "-10px"), $(".distance-legend").css("bottom", "25px"), $(".distance-legend").css("border", "none"), $(".distance-legend").css("background", "rgba(0, 0, 0, 0)"), $(".navigation-controls").hide(), t.style ? $(".compass").css(t.style) : $(".compass").css({
			top: "10px",
			left: "10px"
		})
	}
	function p() {
		var t = navigator.userAgent.toLowerCase(),
			e = "ipad" == t.match(/ipad/i),
			i = "iphone" == t.match(/iphone/i),
			n = "midp" == t.match(/midp/i),
			r = "rv:1.2.3.4" == t.match(/rv:1.2.3.4/i),
			o = "ucweb" == t.match(/ucweb/i),
			a = "android" == t.match(/android/i),
			s = "windows ce" == t.match(/windows ce/i),
			l = "windows mobile" == t.match(/windows mobile/i);
		return !(e || i || n || r || o || a || s || l)
	}
	function f() {
		return x
	}
	function m(t) {
		if ("gcj" == x) {
			var e = pointconvert.wgs2gcj([t.x, t.y]),
				i = v(t);
			return i.x = e[0], i.y = e[1], i
		}
		return t
	}
	function g(t) {
		if ("gcj" == x) {
			var e = pointconvert.gcj2wgs([t.x, t.y]),
				i = v(t);
			return i.x = e[0], i.y = e[1], i
		}
		return t
	}
	function v(t, e) {
		if (null == t || "object" != typeof t) return t;
		if (t.constructor != Object && t.constructor != Array) return t;
		if (t.constructor == Date || t.constructor == RegExp || t.constructor == Function || t.constructor == String || t.constructor == Number || t.constructor == Boolean) return new t.constructor(t);
		e = e || new t.constructor;
		for (var i in t) e[i] = "undefined" == typeof e[i] ? v(t[i], null) : e[i];
		return e
	}
	function _(t, i, n) {
		if (null == i) return void console.log("配置信息不能为空！");
		var r = e(t.id, i, t),
			o = {};
		return o.config = i, r.gisdata = o, t.success && t.success(r, o, n), r
	}
	function y() {
		var t = haoutil.system.getExplorerInfo();
		if ("IE" == t.type && t.version < 11) return !1;
		try {
			var e, i = document.createElement("canvas"),
				n = "undefined" != typeof WebGL2RenderingContext;
			if (n && (e = i.getContext("webgl2") || i.getContext("experimental-webgl2") || void 0), null == e && (e = i.getContext("webgl") || i.getContext("experimental-webgl") || void 0), null == e) return !1
		} catch (r) {
			return !1
		}
		return !0
	}
	var b, w, C, x, E, k = "cesium地图 操作类",
		L = !1;
	return {
		name: k,
		init: e,
		getMap: t,
		getLayer: i,
		centerAt: s,
		openFlyAnimation: u,
		isFlyAnimation: l,
		hasTerrain: r,
		updateTerrainProvider: o,
		getCrs: f,
		point2map: m,
		point2wgs: g,
		createMapByData: _,
		webglreport: y
	}
}(), mars3d.createMap = function(t) {
	return t.url ? ($.ajax({
		type: "get",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		url: t.url,
		timeout: 0,
		success: function(e) {
			var i = e.map3d;
			e.serverURL && (i.serverURL = e.serverURL), t.serverURL && (i.serverURL = t.serverURL), mars3d.map.createMapByData(t, i, e)
		},
		error: function(e, i, n) {
			console.log("Json文件" + t.url + "加载失败！"), haoutil.alert("Json文件" + t.url + "加载失败！")
		}
	}), null) : (t.serverURL && t.data && (t.data.serverURL = t.serverURL), mars3d.map.createMapByData(t, t.data))
}, mars3d.drawing = {}, mars3d.drawing.utils = {
	createDragger: function(t, e) {
		var i;
		if (e.dragger) i = e.dragger;
		else {
			var n = Cesium.defaultValue(e.position, Cesium.Cartesian3.ZERO),
				r = Cesium.defaultValue(e.dragIcon, "dragIcon.png");
			i = t.entities.add({
				position: n,
				billboard: {
					scale: 1,
					heightReference: e.heightReference ? Cesium.HeightReference.CLAMP_TO_GROUND : Cesium.HeightReference.NONE,
					image: r
				}
			})
		}
		return i._isDragger = !0, i.onDrag = Cesium.defaultValue(e.onDrag, null), i.horizontal = Cesium.defaultValue(e.horizontal, !0), i.vertical = Cesium.defaultValue(e.vertical, !1), i.verticalCtrl = Cesium.defaultValue(e.vertical, !1), i
	},
	getCoordinates: function(t) {
		for (var e = [], i = 0; i < t.length; i++) {
			var n = Cesium.Cartographic.fromCartesian(t[i]),
				r = Number(Cesium.Math.toDegrees(n.longitude).toFixed(6)),
				o = Number(Cesium.Math.toDegrees(n.latitude).toFixed(6)),
				a = Number(n.height.toFixed(1));
			e.push([r, o, a])
		}
		return e
	},
	getMaxHeightForPositions: function(t, e) {
		null == e && (e = 0);
		var i = e;
		if (null == t || 0 == t.length) return i;
		for (var n = (t[0], 0); n < t.length; n++) {
			var r = Cesium.Cartographic.fromCartesian(t[n]);
			r.height > i && (i = r.height)
		}
		return i
	},
	getPositionsWithHeight: function(t, e) {
		if (t instanceof Array) {
			for (var i = [], n = 0; n < t.length; n++) {
				var r = Cesium.Ellipsoid.WGS84.cartesianToCartographic(t[n]),
					o = {
						lon: Cesium.Math.toDegrees(r.longitude),
						lat: Cesium.Math.toDegrees(r.latitude),
						hgt: Math.ceil(Number(r.height) + Number(e))
					},
					a = [Number(o.lon), Number(o.lat), Number(o.hgt)];
				i = i.concat(a)
			}
			return Cesium.Cartesian3.fromDegreesArrayHeights(i)
		}
		var r = Cesium.Ellipsoid.WGS84.cartesianToCartographic(t),
			s = Number(Cesium.Math.toDegrees(r.longitude).toFixed(6)),
			l = Number(Cesium.Math.toDegrees(r.latitude).toFixed(6));
		return Cesium.Cartesian3.fromDegrees(s, l, Number(r.height) + Number(e))
	},
	getZHeightPosition: function(t, e) {
		var i = Cesium.Cartographic.fromCartesian(t),
			n = Number(Cesium.Math.toDegrees(i.longitude)),
			r = Number(Cesium.Math.toDegrees(i.latitude)),
			o = Number(i.height.toFixed(2)),
			a = Cesium.Cartographic.fromCartesian(e),
			s = Number(Cesium.Math.toDegrees(a.longitude)),
			l = Number(Cesium.Math.toDegrees(a.latitude)),
			u = Number(a.height.toFixed(2));
		return o > u ? Cesium.Cartesian3.fromDegrees(s, l, o) : Cesium.Cartesian3.fromDegrees(n, r, u)
	},
	getHDistance: function(t, e) {
		var i = this.getZHeightPosition(t, e),
			n = Cesium.Cartographic.fromCartesian(e),
			r = Cesium.Cartographic.fromCartesian(i),
			o = Cesium.Cartesian3.distance(t, i);
		return Math.abs(Number(r.height) - Number(n.height)) < .01 && (o = Cesium.Cartesian3.distance(e, i)), o
	},
	getMidPosition: function(t, e) {
		var i = Cesium.Cartographic.fromCartesian(t),
			n = Number(Cesium.Math.toDegrees(i.longitude)),
			r = Number(Cesium.Math.toDegrees(i.latitude)),
			o = Number(i.height.toFixed(2)),
			a = Cesium.Cartographic.fromCartesian(e),
			s = Number(Cesium.Math.toDegrees(a.longitude)),
			l = Number(Cesium.Math.toDegrees(a.latitude)),
			u = Number(a.height.toFixed(2)),
			c = (n + s) / 2,
			h = (r + l) / 2,
			d = (o + u) / 2;
		return Cesium.Cartesian3.fromDegrees(c, h, d)
	},
	getPositionsFromJson: function(t) {
		if (!t) return null;
		switch (t.type) {
		case "Point":
			return this.lonLatToCartesian(t.coordinates[0]);
		case "LineString":
			return this.lonLatsToCartesians(t.coordinates);
		case "Polygon":
			return this.lonLatsToCartesians(t.coordinates[0]);
		case "MultiPoint":
			return this.lonLatsToCartesians(t.coordinates);
		default:
			throw new Error("Invalid GeoJSON object.")
		}
	},
	lonLatToCartesian: function(t) {
		return Cesium.Cartesian3.fromDegrees(Number(t[0]), Number(t[1]), Number(t[2] || 0))
	},
	lonLatsToCartesians: function(t) {
		for (var e = [], i = 0; i < t.length; i++) {
			var n = [Number(t[i][0]), Number(t[i][1]), Number(t[i][2] || 0)];
			e = e.concat(n)
		}
		return Cesium.Cartesian3.fromDegreesArrayHeights(e)
	},
	normalizeJsonData: function(t) {
		var e = {};
		e.type = "FeatureCollection", e.features = [];
		var i;
		if (i = "string" == typeof t ? JSON.parse(t) : t, i instanceof Array) {
			for (var n = 0; n < i.length; n++) {
				var r = {
					type: "Feature"
				};
				r.properties = i[n].properties || i[n].PROPERTIES, r.geometry = i[n].geometry || i[n].GEOMETRY, e.features.push(r)
			}
			return JSON.stringify(e)
		}
		if (t.features && t.features instanceof Array) return t
	},
	normalizeBusinessData: function(t) {
		var e = {};
		try {
			e = JSON.parse(t)
		} catch (i) {
			return void haoutil.alert(i.name + ": " + i.message + " \n请确认json文件格式正确!!!")
		}
		for (var n = e.features, r = [], o = 0; o < n.length; o++) {
			var a = n[o],
				s = {
					dataID: a.properties.attr.id,
					dataType: a.properties.attr.type,
					properties: a.properties,
					geometry: a.geometry
				};
			r.push(s)
		}
		return JSON.stringify(r)
	},
	terrainPolyline: function(t) {
		var e = t.viewer,
			i = t.positions;
		if (null == i || 0 == i.length) return void(t.calback && t.calback(i));
		for (var n = Cesium.PolylinePipeline.generateArc({
			positions: i,
			granularity: t.granularity || 1e-5
		}), r = [], o = e.scene.globe.ellipsoid, a = 0; a < n.length; a += 3) {
			var s = Cesium.Cartesian3.unpack(n, a);
			r.push(o.cartesianToCartographic(s))
		}
		var l = Cesium.Cartographic.fromCartesian(i[0]).height;
		Cesium.when(Cesium.sampleTerrainMostDetailed(e.terrainProvider, r), function(e) {
			for (var n = !1, r = t.offset || 2, a = 0; a < e.length; ++a) null == e[a].height ? n = !0 : l = e[a].height || 0, e[a].height = r + (e[a].height || l);
			var s = o.cartographicArrayToCartesianArray(e);
			t.calback ? t.calback(s, n) : i.setValue && i.setValue(s)
		})
	}
}, mars3d.drawing.DynamicProperty = function(t) {
	this._value = void 0, this._hasClone = !1, this._hasEquals = !1, this._definitionChanged = new Cesium.Event, this._constant = !1, this.setValue(t)
}, Cesium.defineProperties(mars3d.drawing.DynamicProperty.prototype, {
	isConstant: {
		get: function() {
			return this._constant
		},
		set: function(t) {
			this._constant !== t && (this._constant = t, this._definitionChanged.raiseEvent(this))
		}
	},
	definitionChanged: {
		get: function() {
			return this._definitionChanged
		}
	}
}), mars3d.drawing.DynamicProperty.prototype.getValue = function(t, e) {
	return this._hasClone ? this._value.clone(e) : this._value
}, mars3d.drawing.DynamicProperty.prototype.setValue = function(t) {
	var e = this._value;
	if (e !== t) {
		var i = Cesium.defined(t),
			n = i && "function" == typeof t.clone,
			r = i && "function" == typeof t.equals;
		this._hasClone = n, this._hasEquals = r;
		var o = !r || !t.equals(e);
		o && (this._value = n ? t.clone() : t, this._definitionChanged.raiseEvent(this))
	}
}, mars3d.drawing.DynamicProperty.prototype.equals = function(t) {
	return this === t || t instanceof mars3d.drawing.DynamicProperty && (!this._hasEquals && this._value === t._value || this._hasEquals && this._value.equals(t._value))
}, mars3d.drawing.DynamicProperty.prototype.valueOf = function(t) {
	return this._value
}, mars3d.drawing.DynamicProperty.prototype.toString = function(t) {
	return String(this._value)
}, mars3d.drawing.EllipseEditor = function(t, e, i) {
	this.viewer = t, this.entity = e, this.options = i, this.draggers = [], this.heightDraggers = [], this.initDraggers()
}, mars3d.drawing.EllipseEditor.prototype.initDraggers = function() {
	var t = this,
		e = mars3d.drawing.utils.createDragger(this.viewer, {
			dragIcon: this.options.dragIcon,
			position: this.entity.position._value,
			onDrag: function(e, i) {
				var n = new Cesium.Cartesian3;
				Cesium.Cartesian3.subtract(i, t.entity.position._value, n);
				var r = Cesium.Cartographic.fromCartesian(i),
					o = Number(r.height).toFixed(2);
				t.entity.ellipse.height = new Cesium.ConstantProperty(r.height), t.entity.attribute.style.height = o, t.entity.position._value = i;
				var a = new Cesium.Cartesian3;
				Cesium.Cartesian3.add(e.majorDragger.position._value, n, a), e.majorDragger.position = new Cesium.ConstantProperty(a), Cesium.Cartesian3.add(e.minorDragger.position._value, n, a), e.minorDragger.position = new Cesium.ConstantProperty(a), void 0 != t.entity.attribute.style.extrudedHeight && t.updateHeightDraggers(), t.entity.changeEditing()
			}
		});
	this.draggers.push(e);
	var i = Cesium.EllipseGeometryLibrary.computeEllipsePositions({
		center: this.entity.position._value,
		semiMinorAxis: this.entity.ellipse.semiMinorAxis._value,
		semiMajorAxis: this.entity.ellipse.semiMajorAxis._value,
		rotation: Cesium.Math.toRadians(Number(this.entity.attribute.style.rotation || 0)),
		granularity: 2
	}, !0, !1),
		n = new Cesium.Cartesian3(i.positions[0], i.positions[1], i.positions[2]),
		r = mars3d.drawing.utils.createDragger(this.viewer, {
			dragIcon: this.options.dragIcon,
			position: n,
			onDrag: function(e, i) {
				var n = Cesium.Cartesian3.distance(t.entity.position._value, i);
				t.entity.ellipse.semiMajorAxis = new Cesium.ConstantProperty(n), t.entity.attribute.style.semiMajorAxis = Number(n).toFixed(2), void 0 != t.entity.attribute.style.extrudedHeight && t.updateHeightDraggers(), t.entity.changeEditing()
			}
		});
	e.majorDragger = r, this.draggers.push(r);
	var o = new Cesium.Cartesian3(i.positions[3], i.positions[4], i.positions[5]),
		a = mars3d.drawing.utils.createDragger(this.viewer, {
			dragIcon: this.options.dragIcon,
			position: o,
			onDrag: function(e, i) {
				var n = Cesium.Cartesian3.distance(t.entity.position._value, i);
				t.entity.ellipse.semiMinorAxis = new Cesium.ConstantProperty(n), t.entity.attribute.style.semiMinorAxis = Number(n).toFixed(2), void 0 != t.entity.attribute.style.extrudedHeight && t.updateHeightDraggers(), t.entity.changeEditing()
			}
		});
	e.minorDragger = a, this.draggers.push(a), void 0 != this.entity.attribute.style.extrudedHeight && this.initHeightDraggers()
}, mars3d.drawing.EllipseEditor.prototype.initHeightDraggers = function() {
	var t = this,
		e = Number(this.entity.attribute.style.extrudedHeight) - Number(this.entity.attribute.style.height),
		i = mars3d.drawing.utils.createDragger(this.viewer, {
			dragIcon: this.options.dragIcon,
			position: mars3d.drawing.utils.getPositionsWithHeight(this.entity.position._value, e),
			onDrag: function(i, n) {
				var r = new Cesium.Cartesian3;
				Cesium.Cartesian3.subtract(n, t.entity.position._value, r);
				var o = Cesium.Cartographic.fromCartesian(n),
					a = Number(o.height).toFixed(2);
				t.entity.position._value = n, t.entity.ellipse.extrudedHeight = new Cesium.ConstantProperty(Number(a) + Number(e)), t.entity.ellipse.height = new Cesium.ConstantProperty(o.height), t.entity.attribute.style.extrudedHeight = Number(a) + Number(e), t.entity.attribute.style.height = a, t.updateDraggers(), t.entity.changeEditing()
			}
		});
	this.heightDraggers.push(i);
	var n = Cesium.EllipseGeometryLibrary.computeEllipsePositions({
		center: this.entity.position._value,
		semiMinorAxis: this.entity.ellipse.semiMinorAxis._value,
		semiMajorAxis: this.entity.ellipse.semiMajorAxis._value,
		rotation: Cesium.Math.toRadians(Number(this.entity.attribute.style.rotation || 0)),
		granularity: 2
	}, !0, !1),
		r = new Cesium.Cartesian3(n.positions[0], n.positions[1], n.positions[2]),
		o = mars3d.drawing.utils.createDragger(this.viewer, {
			dragIcon: this.options.dragIcon,
			position: mars3d.drawing.utils.getPositionsWithHeight(r, e),
			onDrag: function(e, i) {
				var n = Cesium.Cartographic.fromCartesian(i);
				t.entity.ellipse.extrudedHeight = new Cesium.ConstantProperty(n.height), t.entity.attribute.style.extrudedHeight = Number(n.height).toFixed(2), t.updateHeightDraggers(), t.entity.changeEditing()
			},
			vertical: !0,
			horizontal: !1
		});
	this.heightDraggers.push(o);
	var a = new Cesium.Cartesian3(n.positions[3], n.positions[4], n.positions[5]),
		s = mars3d.drawing.utils.createDragger(this.viewer, {
			dragIcon: this.options.dragIcon,
			position: mars3d.drawing.utils.getPositionsWithHeight(a, e),
			onDrag: function(e, i) {
				var n = Cesium.Cartographic.fromCartesian(i);
				t.entity.ellipse.extrudedHeight = new Cesium.ConstantProperty(n.height), t.entity.attribute.style.extrudedHeight = Number(n.height).toFixed(2), t.updateHeightDraggers(), t.entity.changeEditing()
			},
			vertical: !0,
			horizontal: !1
		});
	this.heightDraggers.push(s)
}, mars3d.drawing.EllipseEditor.prototype.updateDraggers = function() {
	this.destroy(), this.initDraggers()
}, mars3d.drawing.EllipseEditor.prototype.updateHeightDraggers = function() {
	for (i = 0; i < this.heightDraggers.length; i++) this.viewer.entities.remove(this.heightDraggers[i]);
	this.heightDraggers = [], this.initHeightDraggers()
}, mars3d.drawing.EllipseEditor.prototype.destroy = function() {
	var t = 0;
	for (t = 0; t < this.draggers.length; t++) this.viewer.entities.remove(this.draggers[t]);
	if (this.draggers = [], void 0 != this.entity.attribute.style.extrudedHeight) {
		for (t = 0; t < this.heightDraggers.length; t++) this.viewer.entities.remove(this.heightDraggers[t]);
		this.heightDraggers = []
	}
}, mars3d.drawing.EllipsoidEditor = function(t, e, i) {
	this.viewer = t, this.entity = e, this.options = i, this.draggers = [], this.initDraggers()
}, mars3d.drawing.EllipsoidEditor.prototype.initDraggers = function() {
	var t = this,
		e = this.entity.position._value,
		i = Number(this.entity.attribute.style.heightRadii) || 0,
		n = Cesium.Cartographic.fromCartesian(e);
	n.height += i;
	var r = Cesium.Cartesian3.fromRadians(n.longitude, n.latitude, n.height),
		o = mars3d.drawing.utils.createDragger(this.viewer, {
			dragIcon: this.options.dragIcon,
			position: r,
			onDrag: function(e, i) {
				var n = new Cesium.Cartesian3;
				Cesium.Cartesian3.subtract(i, t.entity.position._value, n);
				var r = Cesium.Cartographic.fromCartesian(i),
					o = Number(t.entity.attribute.style.heightRadii) || 0;
				r.height -= o;
				var a = Cesium.Cartesian3.fromRadians(r.longitude, r.latitude, r.height);
				t.entity.position._value = a, t.entity.changeEditing()
			}
		});
	this.draggers.push(o)
}, mars3d.drawing.EllipsoidEditor.prototype.updateDraggers = function() {
	this.destroy(), this.initDraggers()
}, mars3d.drawing.EllipsoidEditor.prototype.destroy = function() {
	var t = 0;
	for (t = 0; t < this.draggers.length; t++) this.viewer.entities.remove(this.draggers[t]);
	this.draggers = []
}, mars3d.drawing.ExtrudedPolygonEditor = function(t, e, i) {
	this.viewer = t, this.entity = e, this.draggers = [], this.heightDraggers = [];
	var n = this,
		r = 0,
		o = e.polygon.hierarchy._value;
	for (e.polygon.hierarchy.isConstant = !1, r = 0; r < o.length; r++) {
		var a = o[r];
		if (void 0 != e.polygon.height) {
			var s = Cesium.Cartographic.fromCartesian(a);
			s.height += e.polygon.height._value, a = Cesium.Cartesian3.fromRadians(s.longitude, s.latitude, s.height)
		}
		var l = mars3d.drawing.utils.createDragger(this.viewer, {
			dragIcon: i.dragIcon,
			position: a,
			onDrag: function(t, i) {
				t.positions[t.index] = i;
				for (var r = e.polygon.hierarchy._value, o = r[0], a = 1; a < r.length; a++) {
					var s = Cesium.Cartographic.fromCartesian(o),
						l = Cesium.Cartographic.fromCartesian(r[a]);
					Number(l.height) > Number(s.height) && (o = r[a])
				}
				var u = Number(e.polygon.extrudedHeight) - Number(Cesium.Cartographic.fromCartesian(o).height);
				e.attribute.style.extrudedHeight = Number(u).toFixed(2), n.updateDraggers(), e.changeEditing()
			}
		});
		l.index = r, l.positions = o, this.draggers.push(l)
	}
	if (e.polygon.extrudedHeight) for (r = 0; r < o.length; r++) {
		var u = o[r],
			c = Cesium.Cartographic.fromCartesian(u);
		c.height = e.polygon.extrudedHeight._value;
		var h = Cesium.Cartesian3.fromRadians(c.longitude, c.latitude, c.height),
			l = mars3d.drawing.utils.createDragger(this.viewer, {
				dragIcon: i.dragIcon,
				position: h,
				onDrag: function(t, i) {
					for (var r = n.entity.polygon.hierarchy._value, o = r[0], a = 1; a < r.length; a++) {
						var s = Cesium.Cartographic.fromCartesian(o),
							l = Cesium.Cartographic.fromCartesian(r[a]);
						Number(l.height) > Number(s.height) && (o = r[a])
					}
					var u = Cesium.Cartographic.fromCartesian(i);
					e.polygon.extrudedHeight = new Cesium.ConstantProperty(Number(u.height));
					var c = Number(u.height) - Number(Cesium.Cartographic.fromCartesian(o).height);
					e.attribute.style.extrudedHeight = Number(c).toFixed(2), n.updateDraggers(), e.changeEditing()
				},
				vertical: !0,
				horizontal: !1
			});
		l.index = r, this.heightDraggers.push(l)
	}
}, mars3d.drawing.ExtrudedPolygonEditor.prototype.updateDraggers = function() {
	var t = this.entity.polygon.hierarchy._value,
		e = this.entity.polygon.extrudedHeight._value,
		i = 0;
	void 0 != this.entity.polygon.height && (i = this.entity.polygon.height._value);
	for (var n = 0; n < this.heightDraggers.length; n++) {
		var r = t[n],
			o = this.heightDraggers[n],
			a = Cesium.Cartographic.fromCartesian(r);
		a.height = e;
		var s = Cesium.Cartesian3.fromRadians(a.longitude, a.latitude, a.height);
		o.position = s;
		var l = this.draggers[n],
			u = Cesium.Cartographic.fromCartesian(r);
		u.height += i, s = Cesium.Cartesian3.fromRadians(u.longitude, u.latitude, u.height), l.position = s
	}
}, mars3d.drawing.ExtrudedPolygonEditor.prototype.destroy = function() {
	var t = 0;
	for (t = 0; t < this.draggers.length; t++) this.viewer.entities.remove(this.draggers[t]);
	for (this.draggers = [], t = 0; t < this.heightDraggers.length; t++) this.viewer.entities.remove(this.heightDraggers[t]);
	this.heightDraggers = []
}, mars3d.drawing.PointEditor = function(t, e, i) {
	this.viewer = t, this.entity = e, this.draggers = [];
	mars3d.drawing.utils.createDragger(this.viewer, {
		dragger: e,
		onDrag: function(t, i) {
			var n = new Cesium.Cartesian3;
			Cesium.Cartesian3.subtract(i, e.position._value, n), e.position._value = i, e.changeEditing()
		}
	})
}, mars3d.drawing.PointEditor.prototype.updateDraggers = function() {}, mars3d.drawing.PointEditor.prototype.destroy = function() {
	this.draggers = []
}, mars3d.drawing.PolygonEditor = function(t, e, i) {
	this.viewer = t, this.entity = e, this.draggers = [];
	var n = e.polygon.hierarchy._value;
	e.polygon.hierarchy.isConstant = !1;
	for (var r = 0; r < n.length; r++) {
		var o = n[r],
			a = mars3d.drawing.utils.createDragger(this.viewer, {
				dragIcon: i.dragIcon,
				position: o,
				heightReference: !e.attribute.style.perPositionHeight,
				onDrag: function(t, i) {
					t.positions[t.index] = i, e.changeEditing()
				}
			});
		a.index = r, a.positions = n, this.draggers.push(a)
	}
}, mars3d.drawing.PolygonEditor.prototype.updateDraggers = function() {
	for (var t = this.entity.polygon.hierarchy._value, e = 0; e < this.draggers.length; e++) {
		var i = t[e];
		this.draggers[e].position = i
	}
}, mars3d.drawing.PolygonEditor.prototype.destroy = function() {
	this.entity.polygon.hierarchy.isConstant = !0;
	for (var t = 0; t < this.draggers.length; t++) this.viewer.entities.remove(this.draggers[t]);
	this.draggers = []
}, mars3d.drawing.PolylineEditor = function(t, e, i) {
	this.viewer = t, this.entity = e, this.draggers = [];
	var n = e.polyline.positions._value;
	e.polyline.positions.isConstant = !1;
	for (var r = 0; r < n.length; r++) {
		var o = n[r],
			a = mars3d.drawing.utils.createDragger(this.viewer, {
				dragIcon: i.dragIcon,
				position: o,
				onDrag: function(t, i) {
					n[t.index] = i, e.polyline.positions = n, e.changeEditing()
				}
			});
		a.index = r, this.draggers.push(a)
	}
}, mars3d.drawing.PolylineEditor.prototype.updateDraggers = function() {
	for (var t = this.entity.polyline.positions.getValue(), e = 0; e < this.draggers.length; e++) {
		var i = t[e];
		this.draggers[e].position = i
	}
}, mars3d.drawing.PolylineEditor.prototype.destroy = function() {
	this.entity.polyline.positions.isConstant = !0;
	for (var t = 0; t < this.draggers.length; t++) this.viewer.entities.remove(this.draggers[t]);
	this.draggers = []
}, mars3d.drawing.PolylineVolumeEditor = function(t, e, i) {
	this.viewer = t, this.entity = e, this.draggers = [];
	var n = e.polylineVolume.positions.getValue();
	e.polylineVolume.positions.isConstant = !1;
	for (var r = 0; r < n.length; r++) {
		var o = n[r],
			a = mars3d.drawing.utils.createDragger(this.viewer, {
				dragIcon: i.dragIcon,
				position: o,
				onDrag: function(t, i) {
					n[t.index] = i, e.polylineVolume.positions = n, e.changeEditing()
				}
			});
		a.index = r, this.draggers.push(a)
	}
}, mars3d.drawing.PolylineVolumeEditor.prototype.updateDraggers = function() {
	for (var t = this.entity.polylineVolume.positions.getValue(), e = 0; e < this.draggers.length; e++) {
		var i = t[e];
		this.draggers[e].position = i
	}
}, mars3d.drawing.PolylineVolumeEditor.prototype.destroy = function() {
	this.entity.polylineVolume.positions.isConstant = !0;
	for (var t = 0; t < this.draggers.length; t++) this.viewer.entities.remove(this.draggers[t]);
	this.draggers = []
}, mars3d.drawing.RectangleEditor = function(t, e, i) {
	this.viewer = t, this.entity = e, this.draggers = [];
	var n = this.getDraggersPositions();
	e.rectangle.coordinates.isConstant = !1;
	for (var r = 0; r < n.length; r++) {
		var o = n[r],
			a = mars3d.drawing.utils.createDragger(this.viewer, {
				dragIcon: i.dragIcon,
				position: o,
				heightReference: !e.attribute.style.perPositionHeight,
				onDrag: function(t, i) {
					t.positions[t.index] = i;
					var n;
					n = 0 == t.index ? Cesium.Rectangle.fromCartesianArray([i, t.positions[1]]) : Cesium.Rectangle.fromCartesianArray([i, t.positions[0]]), e.rectangle.coordinates.setValue(n), e.changeEditing()
				}
			});
		a.index = r, a.positions = n, this.draggers.push(a)
	}
}, mars3d.drawing.RectangleEditor.prototype.updateDraggers = function() {
	for (var t = this.getDraggersPositions(), e = 0; e < this.draggers.length; e++) {
		var i = t[e];
		this.draggers[e].position = i
	}
}, mars3d.drawing.RectangleEditor.prototype.getDraggersPositions = function() {
	var t = this.entity.rectangle.coordinates._value,
		e = Cesium.Rectangle.northwest(t),
		i = Cesium.Rectangle.southeast(t);
	return Cesium.Cartesian3.fromRadiansArray([e.longitude, e.latitude, i.longitude, i.latitude])
}, mars3d.drawing.RectangleEditor.prototype.destroy = function() {
	this.entity.rectangle.coordinates.isConstant = !0;
	for (var t = 0; t < this.draggers.length; t++) this.viewer.entities.remove(this.draggers[t]);
	this.draggers = []
}, mars3d.drawing.RectangleExtrudedEditor = function(t, e, i) {
	this.viewer = t, this.entity = e, this.draggers = [], this.heightDraggers = [];
	var n = this,
		r = 0,
		o = this.getDraggersPositions();
	for (e.rectangle.coordinates.isConstant = !1, r = 0; r < o.length; r++) {
		var a = o[r];
		if (void 0 != e.rectangle.height) {
			var s = Cesium.Cartographic.fromCartesian(a);
			s.height += e.rectangle.height._value, a = Cesium.Cartesian3.fromRadians(s.longitude, s.latitude, s.height)
		}
		var l = mars3d.drawing.utils.createDragger(this.viewer, {
			dragIcon: i.dragIcon,
			position: a,
			onDrag: function(t, i) {
				t.positions[t.index] = i;
				var r;
				r = 0 == t.index ? Cesium.Rectangle.fromCartesianArray([i, t.positions[1]]) : Cesium.Rectangle.fromCartesianArray([i, t.positions[0]]), e.rectangle.coordinates.setValue(r), n.updateDraggers(), e.changeEditing()
			}
		});
		l.index = r, l.positions = o, this.draggers.push(l)
	}
	if (e.rectangle.extrudedHeight) for (r = 0; r < o.length; r++) {
		var u = o[r],
			s = Cesium.Cartographic.fromCartesian(u);
		s.height += e.rectangle.extrudedHeight._value;
		var a = Cesium.Cartesian3.fromRadians(s.longitude, s.latitude, s.height),
			l = mars3d.drawing.utils.createDragger(this.viewer, {
				dragIcon: i.dragIcon,
				position: a,
				onDrag: function(t, i) {
					var r = Cesium.Cartographic.fromCartesian(i);
					e.rectangle.extrudedHeight = new Cesium.ConstantProperty(r.height);
					var o = Number(r.height) - Number(e.rectangle.height);
					e.attribute.style.extrudedHeight = Number(o).toFixed(2), n.updateDraggers(), e.changeEditing()
				},
				vertical: !0,
				horizontal: !1
			});
		l.index = r, this.heightDraggers.push(l)
	}
}, mars3d.drawing.RectangleExtrudedEditor.prototype.getDraggersPositions = function() {
	var t = this.entity.rectangle.coordinates._value,
		e = Cesium.Rectangle.northwest(t),
		i = Cesium.Rectangle.southeast(t);
	return Cesium.Cartesian3.fromRadiansArray([e.longitude, e.latitude, i.longitude, i.latitude])
}, mars3d.drawing.RectangleExtrudedEditor.prototype.updateDraggers = function() {
	var t = this.getDraggersPositions(),
		e = this.entity.rectangle.extrudedHeight._value,
		i = 0;
	void 0 != this.entity.rectangle.height && (i = this.entity.rectangle.height._value);
	for (var n = 0; n < this.heightDraggers.length; n++) {
		var r = t[n],
			o = this.heightDraggers[n],
			a = Cesium.Cartographic.fromCartesian(r);
		a.height += e;
		var s = Cesium.Cartesian3.fromRadians(a.longitude, a.latitude, a.height);
		o.position = s;
		var l = this.draggers[n],
			u = Cesium.Cartographic.fromCartesian(r);
		u.height += i, s = Cesium.Cartesian3.fromRadians(u.longitude, u.latitude, u.height), l.position = s
	}
}, mars3d.drawing.RectangleExtrudedEditor.prototype.destroy = function() {
	var t = 0;
	for (t = 0; t < this.draggers.length; t++) this.viewer.entities.remove(this.draggers[t]);
	for (this.draggers = [], t = 0; t < this.heightDraggers.length; t++) this.viewer.entities.remove(this.heightDraggers[t]);
	this.heightDraggers = []
}, mars3d.drawing.WallEditor = function(t, e, i) {
	this.viewer = t, this.entity = e, this.draggers = [], this.heightDraggers = [];
	var n = this,
		r = 0,
		o = e.wall.positions._value;
	for (e.wall.positions.isConstant = !1, r = 0; r < o.length; r++) {
		var a = o[r],
			s = mars3d.drawing.utils.createDragger(this.viewer, {
				dragIcon: i.dragIcon,
				position: a,
				onDrag: function(t, i) {
					t.positions[t.index] = i, n.updateDraggers(), e.changeEditing()
				}
			});
		s.index = r, s.positions = o, this.draggers.push(s)
	}
	if (e.wall.maximumHeights) for (r = 0; r < o.length; r++) {
		var l = o[r],
			u = Cesium.Cartographic.fromCartesian(l.clone());
		u.height = e.wall.maximumHeights._value[r];
		var a = Cesium.Cartesian3.fromRadians(u.longitude, u.latitude, u.height),
			s = mars3d.drawing.utils.createDragger(this.viewer, {
				dragIcon: i.dragIcon,
				position: a,
				onDrag: function(t, i) {
					var r = Cesium.Cartographic.fromCartesian(i),
						o = n.entity.wall.minimumHeights._value,
						a = Number(r.height) - Number(o[t.index]);
					e.attribute.style.extrudedHeight = a.toFixed(2), n.updateDraggers(), e.changeEditing()
				},
				vertical: !0,
				horizontal: !1
			});
		s.index = r, this.heightDraggers.push(s)
	}
}, mars3d.drawing.WallEditor.prototype.updateDraggers = function() {
	for (var t = this.entity.wall.positions._value, e = this.entity.wall.minimumHeights._value, i = this.entity.wall.maximumHeights._value, n = 0; n < this.heightDraggers.length; n++) {
		var r = t[n].clone(),
			o = this.heightDraggers[n],
			a = Cesium.Cartographic.fromCartesian(r);
		e[n] = a.height, i[n] = Number(a.height) + Number(this.entity.attribute.style.extrudedHeight), o.position = mars3d.drawing.utils.getPositionsWithHeight(r, this.entity.attribute.style.extrudedHeight), this.draggers[n].position = r
	}
}, mars3d.drawing.WallEditor.prototype.destroy = function() {
	var t = 0;
	for (t = 0; t < this.draggers.length; t++) this.viewer.entities.remove(this.draggers[t]);
	for (this.draggers = [], t = 0; t < this.heightDraggers.length; t++) this.viewer.entities.remove(this.heightDraggers[t]);
	this.heightDraggers = []
}, mars3d.drawing.BillboardControl = {
	typename: "billboard",
	startDraw: function(t, e) {
		var i = this.attribute2Entity(e),
			n = t.entities.add({
				billboard: i,
				attribute: e
			});
		return n
	},
	attribute2Entity: function(t, e) {
		null == e && (e = {
			scale: 1,
			horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
			verticalOrigin: Cesium.VerticalOrigin.BOTTOM
		});
		for (var i in t.style) {
			var n = t.style[i];
			switch (i) {
			default:
				e[i] = n;
				break;
			case "opacity":
				e.color = new Cesium.Color.fromCssColorString("#FFFFFF").withAlpha(Number(n || 1));
				break;
			case "rotation":
				e.rotation = Cesium.Math.toRadians(n)
			}
		}
		return e
	},
	getEditor: function(t, e, i) {
		return new mars3d.drawing.PointEditor(t, e, i)
	},
	setPositions: function(t, e) {
		t.position = new mars3d.drawing.DynamicProperty(e)
	},
	getPositions: function(t) {
		return [t.position._value]
	},
	getCoordinates: function(t) {
		var e = this.getPositions(t),
			i = mars3d.drawing.utils.getCoordinates(e);
		return i
	},
	toGeoJSON: function(t) {
		var e = this.getCoordinates(t);
		return {
			type: "Feature",
			properties: t.attribute,
			geometry: {
				type: "Point",
				coordinates: e
			}
		}
	}
}, mars3d.drawing.EllipseControl = {
	typename: "ellipse",
	startDraw: function(t, e) {
		var i = this.attribute2Entity(e),
			n = t.entities.add({
				ellipse: i,
				attribute: e
			});
		return n
	},
	attribute2Entity: function(t, e) {
		null == e && (e = {
			show: !0,
			fill: !0
		});
		for (var i in t.style) {
			var n = t.style[i];
			switch (i) {
			default:
				e[i] = n;
				break;
			case "opacity":
			case "outlineOpacity":
				break;
			case "outlineColor":
				e.outlineColor = new Cesium.Color.fromCssColorString(n || "#FFFF00").withAlpha(t.style.outlineOpacity || t.style.opacity || 1);
				break;
			case "color":
				e.material = new Cesium.Color.fromCssColorString(n || "#FFFF00").withAlpha(Number(t.style.opacity || 1));
				break;
			case "rotation":
				e.rotation = Cesium.Math.toRadians(n)
			}
		}
		return e
	},
	getEditor: function(t, e, i) {
		return new mars3d.drawing.EllipseEditor(t, e, i)
	},
	setPositions: function(t, e) {
		t.position = new mars3d.drawing.DynamicProperty(e)
	},
	getPositions: function(t) {
		return [t.position._value]
	},
	getCoordinates: function(t) {
		var e = this.getPositions(t),
			i = mars3d.drawing.utils.getCoordinates(e);
		return i
	},
	toGeoJSON: function(t) {
		var e = this.getCoordinates(t);
		return {
			type: "Feature",
			properties: t.attribute,
			geometry: {
				type: "Point",
				coordinates: e
			}
		}
	}
}, mars3d.drawing.EllipsoidControl = {
	typename: "ellipsoid",
	startDraw: function(t, e) {
		var i = this.attribute2Entity(e),
			n = t.entities.add({
				ellipsoid: i,
				attribute: e
			});
		return n
	},
	attribute2Entity: function(t, e) {
		null == e && (e = {
			show: !0,
			fill: !0
		});
		for (var i in t.style) {
			var n = t.style[i];
			switch (i) {
			default:
				e[i] = n;
				break;
			case "opacity":
			case "outlineOpacity":
			case "widthRadii":
			case "heightRadii":
				break;
			case "outlineColor":
				e.outlineColor = new Cesium.Color.fromCssColorString(n || "#FFFF00").withAlpha(t.style.outlineOpacity || t.style.opacity || 1);
				break;
			case "color":
				e.material = new Cesium.Color.fromCssColorString(n || "#FFFF00").withAlpha(Number(t.style.opacity || 1));
				break;
			case "extentRadii":
				var r = t.style.extentRadii || 100,
					o = t.style.widthRadii || 100,
					a = t.style.heightRadii || 100;
				e.radii = new Cesium.Cartesian3(r, o, a)
			}
		}
		return e
	},
	getEditor: function(t, e, i) {
		return new mars3d.drawing.EllipsoidEditor(t, e, i)
	},
	setPositions: function(t, e) {
		t.position = new mars3d.drawing.DynamicProperty(e)
	},
	getPositions: function(t) {
		return [t.position._value]
	},
	getCoordinates: function(t) {
		var e = this.getPositions(t),
			i = mars3d.drawing.utils.getCoordinates(e);
		return i
	},
	toGeoJSON: function(t) {
		var e = this.getCoordinates(t);
		return {
			type: "Feature",
			properties: t.attribute,
			geometry: {
				type: "Point",
				coordinates: e
			}
		}
	}
}, mars3d.drawing.LabelControl = {
	typename: "label",
	startDraw: function(t, e) {
		var i = this.attribute2Entity(e),
			n = t.entities.add({
				label: i,
				attribute: e
			});
		return n
	},
	attribute2Entity: function(t, e) {
		null == e && (e = {
			show: !0,
			scale: 1,
			horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
			verticalOrigin: Cesium.VerticalOrigin.BOTTOM
		});
		for (var i in t.style) {
			var n = t.style[i];
			switch (i) {
			default:
				e[i] = n;
				break;
			case "font_style":
			case "font_weight":
			case "font_size":
			case "font_family":
			case "text":
				break;
			case "color":
				e.fillColor = new Cesium.Color.fromCssColorString(n || "#FFFF00").withAlpha(Number(t.style.opacity || 1));
				break;
			case "border":
				e.style = n ? Cesium.LabelStyle.FILL_AND_OUTLINE : Cesium.LabelStyle.FILL;
				break;
			case "border_color":
				e.outlineColor = new Cesium.Color.fromCssColorString(n || "#FFFF00").withAlpha(Number(t.style.opacity || 1));
				break;
			case "border_width":
				e.outlineWidth = n;
				break;
			case "background":
				e.showBackground = n;
				break;
			case "background_color":
				e.backgroundColor = new Cesium.Color.fromCssColorString(n || "#FFFF00").withAlpha(Number(t.style.opacity || 1));
				break;
			case "pixelOffset":
				e.pixelOffset = new Cesium.Cartesian2(t.style.pixelOffset[0], t.style.pixelOffset[1])
			}
		}
		e.text = (t.style.text || "文字").replace(new RegExp("<br />", "gm"), "\n");
		var r = (t.style.font_style || "normal") + " small-caps " + (t.style.font_weight || "normal") + " " + (t.style.font_size || "30") + "px " + (t.style.font_family || "黑体");
		return e.font = r, e
	},
	getEditor: function(t, e, i) {
		return new mars3d.drawing.PointEditor(t, e, i)
	},
	setPositions: function(t, e) {
		t.position = new mars3d.drawing.DynamicProperty(e)
	},
	getPositions: function(t) {
		return [t.position._value]
	},
	getCoordinates: function(t) {
		var e = this.getPositions(t),
			i = mars3d.drawing.utils.getCoordinates(e);
		return i
	},
	toGeoJSON: function(t) {
		var e = this.getCoordinates(t);
		return {
			type: "Feature",
			properties: t.attribute,
			geometry: {
				type: "Point",
				coordinates: e
			}
		}
	}
}, mars3d.drawing.ModelControl = {
	typename: "model",
	startDraw: function(t, e) {
		var i = this.attribute2Entity(e),
			n = t.entities.add({
				model: i,
				attribute: e
			});
		return n
	},
	attribute2Entity: function(t, e) {
		null == e && (e = {
			show: !0
		});
		for (var i in t.style) {
			var n = t.style[i];
			switch (i) {
			default:
				e[i] = n;
				break;
			case "silhouette":
			case "silhouetteColor":
			case "silhouetteAlpha":
			case "silhouetteSize":
			case "fill":
			case "color":
			case "opacity":
				break;
			case "modelUrl":
				e.uri = n
			}
		}
		return t.style.silhouette ? (e.silhouetteColor = new Cesium.Color.fromCssColorString(t.style.silhouetteColor || "#FFFFFF").withAlpha(Number(t.style.silhouetteAlpha || 1)), e.silhouetteSize = Number(t.style.silhouetteSize || 1)) : e.silhouetteSize = 0, t.style.fill ? e.color = new Cesium.Color.fromCssColorString(t.style.color || "#FFFFFF").withAlpha(Number(t.style.opacity || 1)) : e.color = new Cesium.Color.fromCssColorString("#FFFFFF").withAlpha(Number(t.style.opacity || 1)), e
	},
	attribute2Model: function(t, e) {
		var i = Cesium.Math.toRadians(Number(e.attribute.style.heading || 0)),
			n = Cesium.Math.toRadians(Number(e.attribute.style.pitch || 0)),
			r = Cesium.Math.toRadians(Number(e.attribute.style.roll || 0)),
			o = new Cesium.HeadingPitchRoll(i, n, r);
		e.orientation && (e.orientation = Cesium.Transforms.headingPitchRollQuaternion(e.position._value, o))
	},
	getEditor: function(t, e, i) {
		return new mars3d.drawing.PointEditor(t, e, i)
	},
	setPositions: function(t, e) {
		t.position = new mars3d.drawing.DynamicProperty(e);
		var i = Cesium.Math.toRadians(Number(t.attribute.style.heading || 0)),
			n = Cesium.Math.toRadians(Number(t.attribute.style.pitch || 0)),
			r = Cesium.Math.toRadians(Number(t.attribute.style.roll || 0)),
			o = new Cesium.HeadingPitchRoll(i, n, r);
		t.orientation = Cesium.Transforms.headingPitchRollQuaternion(t.position._value, o)
	},
	getPositions: function(t) {
		return [t.position._value]
	},
	getCoordinates: function(t) {
		var e = this.getPositions(t),
			i = mars3d.drawing.utils.getCoordinates(e);
		return i
	},
	toGeoJSON: function(t) {
		var e = this.getCoordinates(t);
		return {
			type: "Feature",
			properties: t.attribute,
			geometry: {
				type: "Point",
				coordinates: e
			}
		}
	}
}, mars3d.drawing.PointControl = {
	typename: "point",
	startDraw: function(t, e) {
		var i = this.attribute2Entity(e),
			n = t.entities.add({
				point: i,
				attribute: e
			});
		return n
	},
	attribute2Entity: function(t, e) {
		null == e && (e = {
			show: !0
		});
		for (var i in t.style) {
			var n = t.style[i];
			switch (i) {
			default:
				e[i] = n;
				break;
			case "opacity":
			case "outlineOpacity":
				break;
			case "outlineColor":
				e.outlineColor = new Cesium.Color.fromCssColorString(n || "#FFFF00").withAlpha(t.style.outlineOpacity || t.style.opacity || 1);
				break;
			case "color":
				e.color = new Cesium.Color.fromCssColorString(n || "#FFFF00").withAlpha(Number(t.style.opacity || 1))
			}
		}
		return t.style.outline || (e.outlineWidth = 0), e
	},
	getEditor: function(t, e, i) {
		return new mars3d.drawing.PointEditor(t, e, i)
	},
	setPositions: function(t, e) {
		t.position = new mars3d.drawing.DynamicProperty(e)
	},
	getPositions: function(t) {
		return [t.position._value]
	},
	getCoordinates: function(t) {
		var e = this.getPositions(t),
			i = mars3d.drawing.utils.getCoordinates(e);
		return i
	},
	toGeoJSON: function(t) {
		var e = this.getCoordinates(t);
		return {
			type: "Feature",
			properties: t.attribute,
			geometry: {
				type: "Point",
				coordinates: e
			}
		}
	}
}, mars3d.drawing.PolygonControl = {
	typename: "polygon",
	startDraw: function(t, e) {
		var i = this.attribute2Entity(e),
			n = t.entities.add({
				polygon: i,
				attribute: e
			});
		return n
	},
	attribute2Entity: function(t, e) {
		null == e && (e = {
			show: !0,
			fill: !0,
			hierarchy: new mars3d.drawing.DynamicProperty([])
		});
		for (var i in t.style) {
			var n = t.style[i];
			switch (i) {
			default:
				e[i] = n;
				break;
			case "opacity":
			case "outlineOpacity":
				break;
			case "outlineColor":
				e.outlineColor = new Cesium.Color.fromCssColorString(n || "#FFFF00").withAlpha(t.style.outlineOpacity || t.style.opacity || 1);
				break;
			case "color":
				e.material = new Cesium.Color.fromCssColorString(n || "#FFFF00").withAlpha(Number(t.style.opacity || 1));
				break;
			case "extrudedHeight":
				var r = mars3d.drawing.utils.getMaxHeightForPositions(e.hierarchy._value);
				e.extrudedHeight = Number(n) + r
			}
		}
		return null == t.style.color && (e.material = Cesium.Color.fromRandom({
			minimumGreen: .75,
			maximumBlue: .75,
			alpha: Number(t.style.opacity || 1)
		})), e
	},
	getEditor: function(t, e, i) {
		return e.polygon.extrudedHeight ? new mars3d.drawing.ExtrudedPolygonEditor(t, e, i) : new mars3d.drawing.PolygonEditor(t, e, i)
	},
	setPositions: function(t, e) {
		if (t.polygon.hierarchy = new mars3d.drawing.DynamicProperty(e), t.attribute.style.extrudedHeight) {
			var i = mars3d.drawing.utils.getMaxHeightForPositions(e);
			t.polygon.extrudedHeight = i + Number(t.attribute.style.extrudedHeight)
		}
	},
	getPositions: function(t) {
		return t.polygon.hierarchy._value
	},
	getCoordinates: function(t) {
		var e = this.getPositions(t),
			i = mars3d.drawing.utils.getCoordinates(e);
		return i
	},
	toGeoJSON: function(t) {
		var e = this.getCoordinates(t),
			i = e[0],
			n = e[e.length - 1];
		return i[0] == n[0] && i[1] == n[1] && i[2] == n[2] || e.push(i), {
			type: "Feature",
			properties: t.attribute,
			geometry: {
				type: "Polygon",
				coordinates: [e]
			}
		}
	}
}, mars3d.drawing.PolylineControl = {
	typename: "polyline",
	startDraw: function(t, e) {
		var i = this.attribute2Entity(e),
			n = t.entities.add({
				polyline: i,
				attribute: e
			});
		return n
	},
	attribute2Entity: function(t, e) {
		null == e && (e = {
			followSurface: !0,
			positions: new mars3d.drawing.DynamicProperty([])
		});
		for (var i in t.style) {
			var n = t.style[i];
			switch (i) {
			default:
				e[i] = n;
				break;
			case "lineType":
			case "color":
			case "opacity":
			case "outline":
			case "outlineWidth":
			case "outlineColor":
			case "outlineOpacity":
			}
		}
		var r = new Cesium.Color.fromCssColorString(t.style.color || "#FFFF00").withAlpha(Number(t.style.opacity || 1));
		switch (t.style.lineType) {
		default:
		case "solid":
			t.style.outline ? e.material = new Cesium.PolylineOutlineMaterialProperty({
				color: r,
				outlineWidth: Number(t.style.outlineWidth || 1),
				outlineColor: new Cesium.Color.fromCssColorString(t.style.outlineColor || "#FFFF00").withAlpha(Number(t.style.outlineOpacity || t.style.opacity || 1))
			}) : e.material = r;
			break;
		case "dash":
			e.material = new Cesium.PolylineDashMaterialProperty({
				color: r
			})
		}
		return e
	},
	getEditor: function(t, e, i) {
		return new mars3d.drawing.PolylineEditor(t, e, i)
	},
	setPositions: function(t, e) {
		t.polyline.positions.setValue(e)
	},
	getPositions: function(t) {
		return t.polyline.positions._value
	},
	getCoordinates: function(t) {
		var e = this.getPositions(t),
			i = mars3d.drawing.utils.getCoordinates(e);
		return i
	},
	toGeoJSON: function(t) {
		var e = this.getCoordinates(t);
		return {
			type: "Feature",
			properties: t.attribute,
			geometry: {
				type: "LineString",
				coordinates: e
			}
		}
	}
}, mars3d.drawing.PolylineVolumeControl = {
	typename: "polylineVolume",
	startDraw: function(t, e) {
		var i = this.attribute2Entity(e),
			n = t.entities.add({
				polylineVolume: i,
				attribute: e
			});
		return n
	},
	attribute2Entity: function(t, e) {
		null == e && (e = {
			positions: new mars3d.drawing.DynamicProperty([])
		});
		for (var i in t.style) {
			var n = t.style[i];
			switch (i) {
			default:
				e[i] = n;
				break;
			case "opacity":
			case "outlineOpacity":
			case "radius":
			case "shape":
				break;
			case "outlineColor":
				e.outlineColor = new Cesium.Color.fromCssColorString(n || "#FFFF00").withAlpha(t.style.outlineOpacity || t.style.opacity || 1);
				break;
			case "color":
				e.material = new Cesium.Color.fromCssColorString(n || "#FFFF00").withAlpha(Number(t.style.opacity || 1))
			}
		}
		switch (t.style.radius = t.style.radius || 10, t.style.shape) {
		default:
		case "pipeline":
			e.shape = this._getCorridorShape1(t.style.radius);
			break;
		case "circle":
			e.shape = this._getCorridorShape2(t.style.radius);
			break;
		case "star":
			e.shape = this._getCorridorShape3(t.style.radius)
		}
		return e
	},
	_getCorridorShape1: function(t) {
		for (var e = t / 3, i = 0, n = 360, r = [], o = i; o <= n; o++) {
			var a = Cesium.Math.toRadians(o);
			r.push(new Cesium.Cartesian2(t * Math.cos(a), t * Math.sin(a)))
		}
		for (var o = n; o >= i; o--) {
			var a = Cesium.Math.toRadians(o);
			r.push(new Cesium.Cartesian2((t - e) * Math.cos(a), (t - e) * Math.sin(a)))
		}
		return r
	},
	_getCorridorShape2: function(t) {
		for (var e = 0, i = 360, n = [], r = e; r <= i; r++) {
			var o = Cesium.Math.toRadians(r);
			n.push(new Cesium.Cartesian2(t * Math.cos(o), t * Math.sin(o)))
		}
		return n
	},
	_getCorridorShape3: function(t, e) {
		for (var e = e || 6, i = Math.PI / e, n = 2 * e, r = new Array(n), o = 0; o < n; o++) {
			var a = o % 2 === 0 ? t : t / 3;
			r[o] = new Cesium.Cartesian2(Math.cos(o * i) * a, Math.sin(o * i) * a)
		}
		return r
	},
	getEditor: function(t, e, i) {
		return new mars3d.drawing.PolylineVolumeEditor(t, e, i)
	},
	setPositions: function(t, e) {
		t.polylineVolume.positions = e
	},
	getPositions: function(t) {
		return t.polylineVolume.positions._value
	},
	getCoordinates: function(t) {
		var e = this.getPositions(t),
			i = mars3d.drawing.utils.getCoordinates(e);
		return i
	},
	toGeoJSON: function(t) {
		var e = this.getCoordinates(t);
		return {
			type: "Feature",
			properties: t.attribute,
			geometry: {
				type: "LineString",
				coordinates: e
			}
		}
	}
}, mars3d.drawing.RectangleControl = {
	typename: "rectangle",
	startDraw: function(t, e) {
		var i = this.attribute2Entity(e),
			n = t.entities.add({
				rectangle: i,
				attribute: e
			});
		return n
	},
	attribute2Entity: function(t, e) {
		if (!e) {
			var i = Cesium.Rectangle.fromDegrees(78.654473, 34.878143, 78.654673, 34.878316);
			e = {
				show: !0,
				fill: !0,
				closeTop: !0,
				closeBottom: !0,
				coordinates: i
			}
		}
		for (var n in t.style) {
			var r = t.style[n];
			switch (n) {
			default:
				e[n] = r;
				break;
			case "opacity":
			case "outlineOpacity":
				break;
			case "outlineColor":
				e.outlineColor = new Cesium.Color.fromCssColorString(r || "#FFFF00").withAlpha(t.style.outlineOpacity || t.style.opacity || 1);
				break;
			case "height":
				e.height = Number(r), e.extrudedHeight = Number(t.style.extrudedHeight) + Number(r);
				break;
			case "extrudedHeight":
				e.extrudedHeight = Number(e.height) + Number(r);
				break;
			case "color":
				e.material = new Cesium.Color.fromCssColorString(r || "#FFFF00").withAlpha(Number(t.style.opacity || 1));
				break;
			case "image":
				e.material = t.style.image;
				break;
			case "rotation":
				e.rotation = Cesium.Math.toRadians(r), t.style.stRotation || (e.stRotation = Cesium.Math.toRadians(r));
				break;
			case "stRotation":
				e.stRotation = Cesium.Math.toRadians(r)
			}
		}
		return null == e.material && (e.material = Cesium.Color.fromRandom({
			minimumGreen: .75,
			maximumBlue: .75,
			alpha: Number(t.style.opacity || 1)
		})), e
	},
	getEditor: function(t, e, i) {
		return e.rectangle.extrudedHeight ? new mars3d.drawing.RectangleExtrudedEditor(t, e, i) : new mars3d.drawing.RectangleEditor(t, e, i)
	},
	setPositions: function(t, e) {
		e instanceof Array && (e = Cesium.Rectangle.fromCartesianArray(e)), t.rectangle.coordinates.setValue(e)
	},
	getPositions: function(t) {
		return t.rectangle.coordinates
	},
	getCoordinates: function(t) {
		var e = this.getDiagonalPositions(t),
			i = mars3d.drawing.utils.getCoordinates(e);
		return i
	},
	getDiagonalPositions: function(t) {
		var e = t.rectangle.coordinates._value,
			i = Cesium.Rectangle.northwest(e),
			n = Cesium.Rectangle.southeast(e);
		return Cesium.Cartesian3.fromRadiansArray([i.longitude, i.latitude, n.longitude, n.latitude])
	},
	toGeoJSON: function(t) {
		var e = this.getCoordinates(t);
		return {
			type: "Feature",
			properties: t.attribute,
			geometry: {
				type: "MultiPoint",
				coordinates: e
			}
		}
	}
}, mars3d.drawing.WallControl = {
	typename: "wall",
	startDraw: function(t, e) {
		var i = this.attribute2Entity(e),
			n = t.entities.add({
				wall: i,
				attribute: e
			});
		return n
	},
	attribute2Entity: function(t, e) {
		e || (e = {
			show: !0,
			fill: !0,
			minimumHeights: [],
			maximumHeights: [],
			positions: new mars3d.drawing.DynamicProperty([])
		});
		for (var i in t.style) {
			var n = t.style[i];
			switch (i) {
			default:
				e[i] = n;
				break;
			case "opacity":
			case "outlineOpacity":
				break;
			case "outlineColor":
				e.outlineColor = new Cesium.Color.fromCssColorString(n || "#FFFF00").withAlpha(t.style.outlineOpacity || t.style.opacity || 1);
				break;
			case "color":
				e.material = new Cesium.Color.fromCssColorString(n || "#FFFF00").withAlpha(Number(t.style.opacity || 1))
			}
		}
		return null == e.material && (e.material = Cesium.Color.fromRandom({
			minimumGreen: .75,
			maximumBlue: .75,
			alpha: Number(t.style.opacity || 1)
		})), e
	},
	getEditor: function(t, e, i) {
		return new mars3d.drawing.WallEditor(t, e, i)
	},
	setPositions: function(t, e) {
		if (t.wall.positions = new mars3d.drawing.DynamicProperty(e), t.wall.maximumHeights && t.wall.minimumHeights) for (var i = 0; i < e.length; i++) {
			var n = Cesium.Cartographic.fromCartesian(e[i]);
			t.wall.minimumHeights._value[i] = Number(n.height), t.wall.maximumHeights._value[i] = Number(n.height) + Number(t.attribute.style.extrudedHeight)
		}
	},
	getPositions: function(t) {
		return t.wall.positions._value
	},
	setMaximumHeights: function(t, e) {
		t.wall.maximumHeights = new mars3d.drawing.DynamicProperty(e)
	},
	getMaximumHeights: function(t) {
		return t.wall.maximumHeights._value
	},
	setMinimumHeights: function(t, e) {
		t.wall.minimumHeights = new mars3d.drawing.DynamicProperty(e)
	},
	getMinimumHeights: function(t) {
		return t.wall.minimumHeights._value
	},
	getCoordinates: function(t) {
		var e = this.getPositions(t),
			i = mars3d.drawing.utils.getCoordinates(e);
		return i
	},
	toGeoJSON: function(t) {
		var e = this.getCoordinates(t);
		return {
			type: "Feature",
			properties: t.attribute,
			geometry: {
				type: "LineString",
				coordinates: e
			}
		}
	}
}, mars3d.drawing.EventControl = function(t) {
	this.viewer = t, t.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK), t.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
}, mars3d.drawing.EventControl.prototype.createDrawPointHandler = function(t) {
	var e = this;
	t.inProgress = !0;
	var i = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
	return i.setInputAction(function(n) {
		var r = mars3d.latlng.getCurrentMousePosition(e.viewer.scene, n.position);
		r && (t.updatePositions(r), t.inProgress = !1, t.stopDrawing(), t.startEditing(), i.destroy(), e.drawHandler = null)
	}, Cesium.ScreenSpaceEventType.LEFT_CLICK), this.drawHandler = i, i
}, mars3d.drawing.EventControl.prototype.createDrawPolylineHandler = function(t, e) {
	var i = this;
	t.inProgress = !0;
	var n = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
	return n.lastPointTemporary = !1, n.setInputAction(function(r) {
		var o = mars3d.latlng.getCurrentMousePosition(i.viewer.scene, r.position);
		o && (n.lastPointTemporary && e.pop(), e.push(o), n.lastPointTemporary = !1, t.attribute && t.attribute.minMaxPoints && (e.length == t.attribute.minMaxPoints.min && e.length == t.attribute.minMaxPoints.max || t.attribute.minMaxPoints.isSuper && 4 == e.length) && (t.inProgress = !1, n.destroy(), i.drawHandler = null, t.stopDrawing(), t.startEditing()), t.changeDrawing())
	}, Cesium.ScreenSpaceEventType.LEFT_CLICK), n.setInputAction(function(r) {
		if (r.endPosition) {
			var o = mars3d.latlng.getCurrentMousePosition(i.viewer.scene, r.endPosition);
			o && (n.lastPointTemporary && e.pop(), e.push(o), n.lastPointTemporary = !0, t.moveDrawing())
		}
	}, Cesium.ScreenSpaceEventType.MOUSE_MOVE), n.setInputAction(function(r) {
		t.inProgress = !1, n.destroy(), i.drawHandler = null, e.pop(), t.stopDrawing(), t.startEditing()
	}, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK), this.drawHandler = n, n
}, mars3d.drawing.EventControl.prototype.createDrawPolygonHandler = function(t, e) {
	var i = this;
	t.inProgress = !0;
	var n = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
	return n.lastPointTemporary = !1, n.setInputAction(function(r) {
		var o = mars3d.latlng.getCurrentMousePosition(i.viewer.scene, r.position);
		if (o) {
			if (n.lastPointTemporary && e.pop(), e.push(o), t.attribute.style.extrudedHeight) {
				var a = mars3d.drawing.utils.getMaxHeightForPositions(e);
				t.polygon.extrudedHeight = a + Number(t.attribute.style.extrudedHeight)
			}
			n.lastPointTemporary = !1, t.changeDrawing()
		}
	}, Cesium.ScreenSpaceEventType.LEFT_CLICK), n.setInputAction(function(r) {
		if (r.endPosition) {
			var o = mars3d.latlng.getCurrentMousePosition(i.viewer.scene, r.endPosition);
			if (o) {
				if (n.lastPointTemporary && e.pop(), e.push(o), t.attribute.style.extrudedHeight) {
					var a = mars3d.drawing.utils.getMaxHeightForPositions(e);
					t.polygon.extrudedHeight = a + Number(t.attribute.style.extrudedHeight)
				}
				n.lastPointTemporary = !0, t.moveDrawing()
			}
		}
	}, Cesium.ScreenSpaceEventType.MOUSE_MOVE), n.setInputAction(function(r) {
		t.inProgress = !1, n.destroy(), i.drawHandler = null, e.pop(), t.stopDrawing(), t.startEditing()
	}, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK), this.drawHandler = n, n
}, mars3d.drawing.EventControl.prototype.createTwoPointsModelHandler = function(t, e) {
	var i = this;
	t.inProgress = !0;
	var n = [],
		r = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
	return r.lastPointTemporary = !1, r.setInputAction(function(o) {
		var a = mars3d.latlng.getCurrentMousePosition(i.viewer.scene, o.position);
		if (a) {
			if (r.lastPointTemporary && n.pop(), n.push(a), 1 == n.length && t.attribute.style.extrudedHeight) {
				var s = Number(Cesium.Cartographic.fromCartesian(a).height).toFixed(2);
				t.rectangle.height = Number(s), t.rectangle.extrudedHeight = Number(s) + Number(t.attribute.style.extrudedHeight), t.attribute.style.height = Number(s)
			}
			if (2 == n.length) {
				var l = Cesium.Rectangle.fromCartesianArray(n);
				e.setValue(l)
			}
			r.lastPointTemporary = !1, t.changeDrawing(), 2 == n.length && (t.inProgress = !1, r.destroy(), i.drawHandler = null, t.stopDrawing(), t.startEditing())
		}
	}, Cesium.ScreenSpaceEventType.LEFT_CLICK), r.setInputAction(function(o) {
		if (o.endPosition) {
			var a = mars3d.latlng.getCurrentMousePosition(i.viewer.scene, o.endPosition);
			if (a) {
				if (r.lastPointTemporary && n.pop(), n.push(a), 2 == n.length) {
					var s = Cesium.Rectangle.fromCartesianArray(n);
					e.setValue(s)
				}
				r.lastPointTemporary = !0, t.moveDrawing()
			}
		}
	}, Cesium.ScreenSpaceEventType.MOUSE_MOVE), this.drawHandler = r, r
}, mars3d.drawing.EventControl.prototype.createDrawWallHandler = function(t, e, i, n) {
	var r = this;
	t.inProgress = !0;
	var o = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
	return o.lastPointTemporary = !1, o.setInputAction(function(a) {
		var s = mars3d.latlng.getCurrentMousePosition(r.viewer.scene, a.position);
		if (s) {
			o.lastPointTemporary && (e.pop(), i.pop(), n.pop()), e.push(s);
			var l = Cesium.Cartographic.fromCartesian(s),
				u = Number(l.height).toFixed(2),
				c = Number(u) + Number(t.attribute.style.extrudedHeight);
			i.push(u), n.push(c), o.lastPointTemporary = !1, t.changeDrawing()
		}
	}, Cesium.ScreenSpaceEventType.LEFT_CLICK), o.setInputAction(function(a) {
		if (a.endPosition) {
			var s = mars3d.latlng.getCurrentMousePosition(r.viewer.scene, a.endPosition);
			if (s) {
				o.lastPointTemporary && (e.pop(), i.pop(), n.pop()), e.push(s);
				var l = Cesium.Cartographic.fromCartesian(s),
					u = Number(l.height).toFixed(2),
					c = Number(u) + Number(t.attribute.style.extrudedHeight);
				i.push(u), n.push(c), o.lastPointTemporary = !0, t.moveDrawing()
			}
		}
	}, Cesium.ScreenSpaceEventType.MOUSE_MOVE), o.setInputAction(function(a) {
		t.inProgress = !1, o.destroy(), r.drawHandler = null, e.pop(), i.pop(), n.pop(), t.stopDrawing(), t.startEditing()
	}, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK), this.drawHandler = o, o
}, mars3d.drawing.EventControl.prototype.destroyDrawHandler = function() {
	this.drawHandler && (this.drawHandler.destroy(), this.drawHandler = null)
}, mars3d.drawing.EventControl.prototype.createEditSelectHandler = function(t) {
	var e = this,
		i = new Cesium.ScreenSpaceEventHandler(this.viewer.canvas);
	i.setInputAction(function(i) {
		var n = e.viewer.scene.pick(i.position),
			r = null;
		if (Cesium.defined(n)) {
			var o = Cesium.defaultValue(n.id, n.primitive.id);
			if (o instanceof Cesium.Entity) {
				var a = Cesium.defaultValue(o.inProgress, !1);
				a || (r = o)
			}
		}
		t(r)
	}, Cesium.ScreenSpaceEventType.LEFT_CLICK), this.selectHandler = i
}, mars3d.drawing.EventControl.prototype.createEditDraggerHandler = function() {
	var t = new Cesium.ScreenSpaceEventHandler(this.viewer.canvas);
	t.dragger = null;
	var e = this;
	t.setInputAction(function(i) {
		var n = e.viewer.scene.pick(i.position);
		if (Cesium.defined(n)) {
			var r = n.id;
			r && Cesium.defaultValue(r._isDragger, !1) && (r.billboard && (r.billboard.scale_src = r.billboard.scale._value, r.billboard.scale._value = 1.2 * r.billboard.scale_src), t.dragger = r, e.viewer.scene.screenSpaceCameraController.enableRotate = !1, e.viewer.scene.screenSpaceCameraController.enableTilt = !1, e.viewer.scene.screenSpaceCameraController.enableTranslate = !1)
		}
	}, Cesium.ScreenSpaceEventType.LEFT_DOWN), t.setInputAction(function(i) {
		var n = e.viewer.scene.pick(i.position);
		if (Cesium.defined(n)) {
			var r = n.id;
			r && Cesium.defaultValue(r._isDragger, !1) && (r.billboard && (r.billboard.scale_src = r.billboard.scale._value, r.billboard.scale._value = 1.2 * r.billboard.scale_src), t.dragger = r, e.viewer.scene.screenSpaceCameraController.enableRotate = !1, e.viewer.scene.screenSpaceCameraController.enableTilt = !1, e.viewer.scene.screenSpaceCameraController.enableTranslate = !1)
		}
	}, Cesium.ScreenSpaceEventType.LEFT_DOWN, Cesium.KeyboardEventModifier.CTRL), t.setInputAction(function(n) {
		if (t.dragger) {
			if (t.dragger.horizontal) {
				var r;
				if (t.dragger.model) {
					var o = e.viewer.scene,
						a = o.pick(n.endPosition);
					if (Cesium.defined(a) && a.id == t.dragger) {
						var s = o.camera.getPickRay(n.endPosition);
						r = o.globe.pick(s, o)
					}
				}
				null == r && (r = mars3d.latlng.getCurrentMousePosition(e.viewer.scene, n.endPosition)), r && (t.dragger.position = r, t.dragger.onDrag && t.dragger.onDrag(t.dragger, r))
			}
			if (t.dragger.vertical) {
				var l = n.endPosition.y - n.startPosition.y,
					u = t.dragger.position._value,
					c = new Cesium.EllipsoidTangentPlane(u);
				i.center = u, i.radius = 1;
				var h = e.viewer.scene.frameState.camera.getPixelSize(i, e.viewer.scene.frameState.context.drawingBufferWidth, e.viewer.scene.frameState.context.drawingBufferHeight),
					d = new Cesium.Cartesian3;
				Cesium.Cartesian3.multiplyByScalar(c.zAxis, -l * h, d);
				var p = Cesium.Cartesian3.clone(u);
				Cesium.Cartesian3.add(u, d, p), t.dragger.position = p, t.dragger.onDrag && t.dragger.onDrag(t.dragger, p)
			}
		}
	}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
	var i = new Cesium.BoundingSphere;
	t.setInputAction(function(n) {
		if (t.dragger && t.dragger.verticalCtrl) {
			var r = n.endPosition.y - n.startPosition.y,
				o = t.dragger.position._value,
				a = new Cesium.EllipsoidTangentPlane(o);
			i.center = o, i.radius = 1;
			var s = e.viewer.scene.frameState.camera.getPixelSize(i, e.viewer.scene.frameState.context.drawingBufferWidth, e.viewer.scene.frameState.context.drawingBufferHeight),
				l = new Cesium.Cartesian3;
			Cesium.Cartesian3.multiplyByScalar(a.zAxis, -r * s, l);
			var u = Cesium.Cartesian3.clone(o);
			Cesium.Cartesian3.add(o, l, u), t.dragger.position = u, t.dragger.onDrag && t.dragger.onDrag(t.dragger, u)
		}
	}, Cesium.ScreenSpaceEventType.MOUSE_MOVE, Cesium.KeyboardEventModifier.CTRL), t.setInputAction(function() {
		t.dragger && (t.dragger.billboard && (t.dragger.billboard.scale._value = t.dragger.billboard.scale_src), t.dragger = null, e.viewer.scene.screenSpaceCameraController.enableRotate = !0, e.viewer.scene.screenSpaceCameraController.enableTilt = !0, e.viewer.scene.screenSpaceCameraController.enableTranslate = !0)
	}, Cesium.ScreenSpaceEventType.LEFT_UP), t.setInputAction(function() {
		t.dragger && (t.dragger.billboard && (t.dragger.billboard.scale._value = t.dragger.billboard.scale_src), t.dragger = null, e.viewer.scene.screenSpaceCameraController.enableRotate = !0, e.viewer.scene.screenSpaceCameraController.enableTilt = !0, e.viewer.scene.screenSpaceCameraController.enableTranslate = !0)
	}, Cesium.ScreenSpaceEventType.LEFT_UP, Cesium.KeyboardEventModifier.CTRL), this.draggerHandler = t
}, mars3d.drawing.EventControl.prototype.destroyEditHandler = function() {
	this.selectHandler && (this.selectHandler.destroy(), this.selectHandler = null), this.draggerHandler && (this.draggerHandler.destroy(), this.draggerHandler = null)
}, mars3d.Draw = function(t) {
	function e(e) {
		L = e, e ? (k.createEditSelectHandler(function(e) {
			x && x.inProgress || (e !== x ? (x && x.stopEditing && (x.stopEditing(), x = null), x = e, x && x.startEditing && x.startEditing()) : t.onStopEditing && "function" == typeof t.onStopEditing && t.onStopEditing())
		}), k.createEditDraggerHandler()) : (n(), k.destroyEditHandler())
	}
	function i(t) {
		if (n(), null == t || null == t.type) throw "请传入需要绘制的类型参数";
		t.style = t.style || {}, t.attr = t.attr || {};
		var e = t.type;
		if (null == b[e]) throw "传入的[" + e + "]类型参数有误";
		var i = b[e].startDraw(w, t);
		switch (e) {
		case "label":
		case "point":
		case "billboard":
		case "model":
		case "ellipse":
		case "ellipsoid":
			k.createDrawPointHandler(i);
			break;
		case "polyline":
		case "polylineVolume":
			k.createDrawPolylineHandler(i, b[e].getPositions(i));
			break;
		case "polygon":
			k.createDrawPolygonHandler(i, b[e].getPositions(i));
			break;
		case "rectangle":
		case "extrudedRectangle":
		case "measureHeight":
			k.createTwoPointsModelHandler(i, b[e].getPositions(i));
			break;
		case "wall":
			var r = b[e].getPositions(i),
				o = b[e].getMinimumHeights(i),
				s = b[e].getMaximumHeights(i);
			k.createDrawWallHandler(i, r, o, s)
		}
		return a(i), E.push(i), i.startDrawing(), x = i, i
	}
	function n() {
		return k.destroyDrawHandler(), x && x.inProgress && (x.stopDrawing(), w.entities.remove(x), y(E, x)), x && (x.stopEditing(), x = null), this
	}
	function r(t) {
		if (null != x && null != t) {
			t.style = t.style || {}, t.attr = t.attr || {};
			var e = x.attribute.type;
			return b[e].attribute2Entity(t, x[e]), "model" == e && b[e].attribute2Model(t, x), x.attribute = t, "ellipse" != e && "polygon" != e && "wall" != e && "rectangle" != e || x.editor.updateDraggers(), x
		}
	}
	function o(t) {
		if (null != x && null != t) {
			var e = x.attribute.type;
			return b[e].setPositions(x, t), x.editor.updateDraggers(), x
		}
	}
	function a(e) {
		e.startDrawing = function() {
			$(".cesium-viewer").css("cursor", "crosshair");
			var e = this;
			t.onStartDrawing && "function" == typeof t.onStartDrawing && t.onStartDrawing(e)
		}, e.changeDrawing = function() {
			var e = this;
			t.onChangeDrawing && "function" == typeof t.onChangeDrawing && t.onChangeDrawing(e)
		}, e.moveDrawing = function() {
			var e = this;
			t.onMoveDrawing && "function" == typeof t.onMoveDrawing && t.onMoveDrawing(e)
		}, e.stopDrawing = function() {
			$(".cesium-viewer").css("cursor", "");
			var e = this;
			t.onStopDrawing && "function" == typeof t.onStopDrawing && t.onStopDrawing(e)
		}, e.startEditing = function() {
			if (L) {
				var e = this;
				if (null == e.editor) {
					var i = e.attribute.type;
					e.editor = b[i].getEditor(w, e, {
						dragIcon: C
					})
				}
				t.onStartEditing && "function" == typeof t.onStartEditing && t.onStartEditing(e)
			}
		}, e.stopEditing = function() {
			var e = this;
			e.editor && (e.editor.destroy(), e.editor = null), t.onStopEditing && "function" == typeof t.onStopEditing && t.onStopEditing()
		}, e.changeEditing = function() {
			var e = this;
			t.onChangeEditing && "function" == typeof t.onChangeEditing && t.onChangeEditing(e)
		}, e.updatePositions = function(t) {
			var e = this,
				i = e.attribute.type;
			if ("ellipse" == i) {
				var n = Cesium.Cartographic.fromCartesian(t).height;
				if (e.attribute.style.height = Number(Number(n).toFixed(2)), e.ellipse.height._value = Number(Number(n).toFixed(2)), e.attribute.style.extrudedHeight) {
					var r = Number(n) + Number(e.attribute.style.extrudedHeight);
					e.ellipse.extrudedHeight._value = Number(r.toFixed(2)), e.attribute.style.extrudedHeight = Number(r.toFixed(2))
				}
			}
			b[i].setPositions(x, t)
		}
	}
	function s(t) {
		null != t && (t.stopEditing(), y(E, t), w.entities.remove(t))
	}
	function l() {
		x && (x.stopEditing(), y(E, x), w.entities.remove(x), x = null)
	}
	function u() {
		n();
		for (var t = 0; t < E.length; t++) {
			var e = E[t];
			e.stopEditing(), w.entities.remove(e)
		}
		E = []
	}
	function c(t) {
		var e = t.attribute.type,
			i = b[e].getCoordinates(t);
		return i
	}
	function h(t) {
		var e = t.attribute.type,
			i = b[e].getPositions(t);
		return i
	}
	function d(t, e) {
		var i = t.attribute.type,
			e = b[i].setPositions(t, e)
	}
	function p() {
		return E.length > 0
	}
	function f() {
		return E
	}
	function m() {
		if (0 == E.length) return "";
		for (var t = [], e = 0; e < E.length; e++) {
			var i = E[e],
				n = i.attribute.type,
				r = b[n].toGeoJSON(i);
			t.push(r)
		}
		var r = {
			type: "FeatureCollection",
			features: t
		};
		return JSON.stringify(r)
	}
	function g(t, e, i) {
		var n = t;
		try {
			v(t) && (n = JSON.parse(t))
		} catch (r) {
			return void haoutil.alert(r.name + ": " + r.message + " \n请确认json文件格式正确!!!")
		}
		e && u();
		for (var o = n.features, s = 0; s < o.length; s++) {
			var l = o[s],
				c = l.properties.type,
				h = b[c].startDraw(w, l.properties),
				d = mars3d.drawing.utils.getPositionsFromJson(l.geometry);
			b[c].setPositions(h, d), a(h), E.push(h)
		}
		return i && w.flyTo(E, {
			duration: 3
		}), E
	}
	function v(t) {
		return "string" == typeof t && t.constructor == String
	}
	function _(t, e, i) {
		var n = t;
		try {
			v(t) && (n = JSON.parse(t))
		} catch (r) {
			return void haoutil.alert(r.name + ": " + r.message + " \n请确认json文件格式正确!!!")
		}
		if (!(n instanceof Array)) return void haoutil.alert("请确认json文件格式正确!!!");
		i && u();
		for (var o = 0; o < n.length; o++) {
			var s = n[o];
			if (!s.x || !s.y) return void haoutil.alert(r.name + ": " + r.message + " \n请确认json文件格式正确!!!");
			var l = {
				id: s.id || s.ID || "",
				name: s.name || s.NAME || "",
				remark: s.remark || s.REMA || ""
			},
				c = {
					type: e.type || "billboard",
					attr: l,
					style: e.style
				},
				h = Cesium.Cartesian3.fromDegrees(s.x, s.y, s.z || 0),
				d = b[c.type].startDraw(w, c);
			b[c.type].setPositions(d, h), a(d), E.push(d)
		}
		return E
	}
	function y(t, e) {
		for (var i = 0; i < t.length; i++) if (t[i] == e) {
			t.splice(i, 1);
			break
		}
	}
	var b = {
		billboard: mars3d.drawing.BillboardControl,
		label: mars3d.drawing.LabelControl,
		ellipse: mars3d.drawing.EllipseControl,
		polyline: mars3d.drawing.PolylineControl,
		polylineVolume: mars3d.drawing.PolylineVolumeControl,
		polygon: mars3d.drawing.PolygonControl,
		ellipsoid: mars3d.drawing.EllipsoidControl,
		wall: mars3d.drawing.WallControl,
		point: mars3d.drawing.PointControl,
		rectangle: mars3d.drawing.RectangleControl,
		model: mars3d.drawing.ModelControl
	},
		w = t.viewer,
		C = (w.scene, t.dragIcon),
		x = null,
		E = [],
		k = new mars3d.drawing.EventControl(w),
		L = t.hasEdit;
	return e(t.hasEdit), {
		startDraw: i,
		stopDraw: n,
		updateAttribute: r,
		updateGeometry: o,
		toGeoJSON: m,
		jsonToEntity: g,
		markersInfoToEntity: _,
		deleteEntity: s,
		deleteCurrentEntity: l,
		deleteAll: u,
		hasDraw: p,
		hasEdit: e,
		getEntitys: f,
		getCoordinates: c,
		getPositions: h,
		setPositions: d
	}
}, mars3d.Measure = function(t) {
	function e(t) {
		r(), h = "length", t = t || {}, t.type = h, t.hasOwnProperty("terrain") || (t.terrain = !0), p.start(t)
	}
	function i(t) {
		r(), h = "area", t = t || {}, t.type = h, f.start(t)
	}
	function n(t) {
		r(), t = t || {}, t.hasOwnProperty("isSuper") && !t.isSuper ? (h = "height", t.type = h, m.start(t)) : (h = "super_height", t.type = h, g.start(t))
	}
	function r() {
		p.clearLastNoEnd(), f.clearLastNoEnd(), m.clearLastNoEnd(), g.clearLastNoEnd(), d.stopDraw()
	}
	function o() {
		h = "", r();
		for (var t = d.getEntitys(), e = 0; e < t.length; e++) {
			var i = t[e];
			if (i._totalLable && (u.entities.remove(i._totalLable), delete i._totalLable), i._arrLables) {
				var n = i._arrLables;
				if (n && n.length > 0) for (var e in n) u.entities.remove(n[e]);
				delete i._arrLables
			}
		}
		t = [];
		var o = u.entities.values;
		for (var e in o) {
			var i = o[e];
			i.label && i.isMarsMeasureLabel && t.push(i)
		}
		for (var e = 0; e < t.length; e++) {
			var i = t[e];
			u.entities.remove(i)
		}
		d.deleteAll()
	}
	function a(t, e) {
		var i = u.entities.values;
		for (var n in i) {
			var r = i[n];
			if (r.label && r.isMarsMeasureLabel && r.attribute && r.attribute.value) {
				if (r.attribute.type != t) continue;
				"area" == t ? r.label.text._value = (r.attribute.textEx || "") + s(r.attribute.value, e) : r._label.text._value = (r.attribute.textEx || "") + l(r.attribute.value, e)
			}
		}
	}
	function s(t, e) {
		if (null == t) return "";
		null != e && "auto" != e || (e = t < 1e6 ? "m" : "km");
		var i = "";
		switch (e) {
		default:
		case "m":
			i = t.toFixed(2) + " 平方米";
			break;
		case "km":
			i = (t / 1e6).toFixed(2) + " 平方公里";
			break;
		case "mu":
			i = (.0015 * t).toFixed(2) + " 亩";
			break;
		case "ha":
			i = (1e-4 * t).toFixed(2) + " 公顷"
		}
		return i
	}
	function l(t, e) {
		if (null == t) return "";
		null != e && "auto" != e || (e = t < 1e3 ? "m" : "km");
		var i = "";
		switch (e) {
		default:
		case "m":
			i = t.toFixed(2) + " 米";
			break;
		case "km":
			i = (.001 * t).toFixed(2) + " 公里";
			break;
		case "mile":
			i = (54e-5 * t).toFixed(2) + " 海里";
			break;
		case "zhang":
			i = (.3 * t).toFixed(2) + " 丈"
		}
		return i
	}
	var u = t.viewer,
		c = t.font || "16px SimHei",
		h = "",
		d = new mars3d.Draw({
			viewer: u,
			hasEdit: !1,
			onChangeDrawing: function(t) {
				switch (h) {
				case "length":
					p.showAddPointLength(t);
					break;
				case "area":
					f.showAddPointLength(t);
					break;
				case "height":
					m.showAddPointLength(t);
					break;
				case "super_height":
					g.showAddPointLength(t)
				}
			},
			onMoveDrawing: function(t) {
				switch (h) {
				case "length":
					p.showMoveDrawing(t);
					break;
				case "area":
					f.showMoveDrawing(t);
					break;
				case "height":
					m.showMoveDrawing(t);
					break;
				case "super_height":
					g.showMoveDrawing(t)
				}
			},
			onStopDrawing: function(t) {
				switch (h) {
				case "length":
					p.showDrawEnd(t);
					break;
				case "area":
					f.showDrawEnd(t);
					break;
				case "height":
					m.showDrawEnd(t);
					break;
				case "super_height":
					g.showDrawEnd(t)
				}
			}
		}),
		p = {
			options: null,
			arrLables: [],
			totalLable: null,
			clearLastNoEnd: function() {
				if (null != this.totalLable && u.entities.remove(this.totalLable), this.arrLables && this.arrLables.length > 0) {
					var t = this.arrLables;
					if (t && t.length > 0) for (var e in t) u.entities.remove(t[e])
				}
				this.totalLable = null, this.arrLables = []
			},
			start: function(t) {
				this.options = t, this.totalLable = u.entities.add({
					label: {
						style: Cesium.LabelStyle.FILL_AND_OUTLINE,
						fillColor: Cesium.Color.AZURE,
						verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
						eyeOffset: new Cesium.Cartesian3(0, 0, (-20)),
						outlineColor: Cesium.Color.BLACK,
						outlineWidth: 3,
						font: c,
						show: !1
					},
					isMarsMeasureLabel: !0,
					attribute: {
						unit: this.options.unit,
						type: this.options.type
					}
				}), this.arrLables = [], d.startDraw({
					type: "polyline",
					style: {
						color: "#ffff00",
						width: 3
					}
				})
			},
			showAddPointLength: function(t) {
				var e = d.getPositions(t),
					i = u.entities.add({
						position: e[e.length - 1],
						label: {
							style: Cesium.LabelStyle.FILL_AND_OUTLINE,
							fillColor: Cesium.Color.AZURE,
							outlineColor: Cesium.Color.BLACK,
							outlineWidth: 3,
							verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
							eyeOffset: new Cesium.Cartesian3(0, 0, (-20)),
							font: c,
							show: !0
						},
						isMarsMeasureLabel: !0,
						attribute: {
							unit: this.options.unit,
							type: this.options.type
						}
					});
				if (1 == e.length) i.label.text = "起点";
				else {
					var n = this.getLength(e),
						r = l(n, this.options.unit);
					i.label.text = r, i.attribute.value = n, this.getLength([e[e.length - 2], e[e.length - 1]]) < 5 && (i.show = !1)
				}
				this.arrLables.push(i)
			},
			showMoveDrawing: function(t) {
				var e = d.getPositions(t);
				if (!(e.length < 2)) {
					var i = this.getLength(e),
						n = l(i, this.options.unit);
					this.totalLable.position = e[e.length - 1], this.totalLable.label.text = "全长:" + n, this.totalLable.label.show = !0, this.totalLable.attribute.value = i, this.totalLable.attribute.textEx = "全长:", this.options.calback && this.options.calback(n, i)
				}
			},
			showDrawEnd: function(t) {
				var e = d.getPositions(t),
					i = this.arrLables.length - e.length;
				if (i >= 0) {
					for (var n = this.arrLables.length - 1; n >= e.length - 1; n--) u.entities.remove(this.arrLables[n]);
					this.arrLables.splice(e.length - 1, i + 1)
				}
				t._totalLable = this.totalLable, t._arrLables = this.arrLables, this.totalLable = null, this.arrLables = [], this.updateLengthForTerrain(t)
			},
			updateLengthForTerrain: function(t) {
				function e() {
					s++;
					var h = [n[s - 1], n[s]];
					mars3d.drawing.utils.terrainPolyline({
						viewer: u,
						positions: h,
						calback: function(u, d) {
							if (c = d ? 1 == s ? c.concat(h) : c.concat([n[s]]) : c.concat(u), s >= n.length - 1) {
								if (t.polyline.positions.setValue(c), o) {
									var p = i.getLength(c),
										f = l(p, a);
									o.label.text = "全长:" + f, o.attribute.value = p, i.options.calback && i.options.calback(f, p)
								}
							} else {
								var p = i.getLength(u),
									f = l(p, a),
									m = r[s];
								m.label.text = f, m.attribute.value = p, e()
							}
						}
					})
				}
				if (this.options.terrain && null != t.polyline) {
					var i = this,
						n = t.polyline.positions.getValue(),
						r = t._arrLables,
						o = t._totalLable,
						a = o && o.unit,
						s = 0,
						c = [];
					e()
				}
			},
			getLength: function(t) {
				for (var e = 0, i = 0, n = t.length - 1; i < n; i++) e += Cesium.Cartesian3.distance(t[i], t[i + 1]);
				return e
			}
		},
		f = {
			options: null,
			totalLable: null,
			clearLastNoEnd: function() {
				null != this.totalLable && u.entities.remove(this.totalLable), this.totalLable = null
			},
			start: function(t) {
				this.options = t, this.totalLable = u.entities.add({
					label: {
						style: Cesium.LabelStyle.FILL_AND_OUTLINE,
						fillColor: Cesium.Color.AZURE,
						outlineColor: Cesium.Color.BLACK,
						heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
						outlineWidth: 3,
						verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
						eyeOffset: new Cesium.Cartesian3(0, 0, (-20)),
						font: c,
						show: !1
					},
					isMarsMeasureLabel: !0,
					attribute: {
						unit: this.options.unit,
						type: this.options.type
					}
				}), d.startDraw({
					type: "polygon",
					style: {
						color: "#ffff00",
						outline: !0,
						outlineColor: "#ffff00",
						outlineWidth: 4,
						opacity: .4
					}
				})
			},
			showAddPointLength: function(t) {},
			showMoveDrawing: function(t) {
				var e = d.getPositions(t);
				if (!(e.length < 3)) {
					var i = mars3d.drawing.PolygonControl.toGeoJSON(t),
						n = turf.area(i),
						r = s(n, this.options.unit),
						o = turf.centerOfMass(i),
						a = mars3d.drawing.utils.getMaxHeightForPositions(e),
						l = Cesium.Cartesian3.fromDegrees(o.geometry.coordinates[0], o.geometry.coordinates[1], a + 1);
					this.totalLable.position = l, this.totalLable.label.text = "面积:" + r, this.totalLable.label.show = !0, this.totalLable.attribute.value = n, this.totalLable.attribute.textEx = "面积:", this.options.calback && this.options.calback(r, n)
				}
			},
			showDrawEnd: function(t) {
				if (null != t.polygon) {
					var e = t.polygon.hierarchy.getValue();
					$.each(e, function(t, e) {
						e.z = e.z + 1
					}), t._totalLable = this.totalLable, this.totalLable = null
				}
			}
		},
		m = {
			options: null,
			totalLable: null,
			clearLastNoEnd: function() {
				null != this.totalLable && u.entities.remove(this.totalLable), this.totalLable = null
			},
			start: function(t) {
				this.options = t, this.totalLable = u.entities.add({
					label: {
						style: Cesium.LabelStyle.FILL_AND_OUTLINE,
						fillColor: Cesium.Color.AZURE,
						outlineColor: Cesium.Color.BLACK,
						outlineWidth: 3,
						font: c,
						show: !1
					},
					isMarsMeasureLabel: !0,
					attribute: {
						unit: this.options.unit,
						type: this.options.type
					}
				}), d.startDraw({
					type: "polyline",
					minMaxPoints: {
						min: 2,
						max: 2,
						isSuper: !1
					},
					style: {
						color: "#ffff00",
						width: 3
					}
				})
			},
			showAddPointLength: function(t) {},
			showMoveDrawing: function(t) {
				var e = d.getPositions(t);
				if (!(e.length < 2)) {
					var i = Cesium.Cartographic.fromCartesian(e[0]),
						n = Cesium.Cartographic.fromCartesian(e[1]),
						r = Math.abs(n.height - i.height),
						o = l(r, this.options.unit);
					this.totalLable.position = mars3d.drawing.utils.getMidPosition(e[0], e[1]), this.totalLable.label.text = "高度差:" + o, this.totalLable.label.show = !0, this.totalLable.attribute.value = r, this.totalLable.attribute.textEx = "高度差:", this.options.calback && this.options.calback(o, r)
				}
			},
			showDrawEnd: function(t) {
				t._totalLable = this.totalLable, this.totalLable = null
			}
		},
		g = {
			options: null,
			totalLable: null,
			xLable: null,
			hLable: null,
			clearLastNoEnd: function() {
				null != this.totalLable && u.entities.remove(this.totalLable), null != this.xLable && u.entities.remove(this.xLable), null != this.hLable && u.entities.remove(this.hLable), this.totalLable = null, this.xLable = null, this.hLable = null
			},
			start: function(t) {
				this.options = t, this.totalLable = u.entities.add({
					label: {
						style: Cesium.LabelStyle.FILL_AND_OUTLINE,
						fillColor: Cesium.Color.AZURE,
						outlineColor: Cesium.Color.BLACK,
						outlineWidth: 3,
						font: c,
						show: !1,
						pixelOffset: new Cesium.Cartesian2((-40), 0)
					},
					isMarsMeasureLabel: !0,
					attribute: {
						unit: this.options.unit,
						type: this.options.type
					}
				}), this.xLable = u.entities.add({
					label: {
						style: Cesium.LabelStyle.FILL_AND_OUTLINE,
						fillColor: Cesium.Color.AZURE,
						outlineColor: Cesium.Color.BLACK,
						outlineWidth: 3,
						font: c,
						show: !1,
						pixelOffset: new Cesium.Cartesian2((-40), 0)
					},
					isMarsMeasureLabel: !0,
					attribute: {
						unit: this.options.unit,
						type: this.options.type
					}
				}), this.hLable = u.entities.add({
					label: {
						style: Cesium.LabelStyle.FILL_AND_OUTLINE,
						fillColor: Cesium.Color.AZURE,
						outlineColor: Cesium.Color.BLACK,
						outlineWidth: 3,
						font: c,
						show: !1,
						pixelOffset: new Cesium.Cartesian2((-40), 0)
					},
					isMarsMeasureLabel: !0,
					attribute: {
						unit: this.options.unit,
						type: this.options.type
					}
				}), d.startDraw({
					type: "polyline",
					minMaxPoints: {
						min: 2,
						max: 2,
						isSuper: !0
					},
					style: {
						color: "#ffff00",
						width: 3
					}
				})
			},
			showAddPointLength: function(t) {
				var e = d.getPositions(t);
				if (4 == e.length) {
					var i = e[3].clone();
					e.pop(), e.pop(), e.pop(), e.push(i)
				}
				if (2 == e.length) {
					var n = mars3d.drawing.utils.getZHeightPosition(e[0], e[1]),
						r = mars3d.drawing.utils.getHDistance(e[0], e[1]);
					r > 3 && (e.push(n), e.push(e[0]))
				}
				this.showSuperHeight(e)
			},
			showMoveDrawing: function(t) {
				var e = d.getPositions(t);
				if (4 == e.length) {
					var i = e[3].clone();
					e.pop(), e.pop(), e.pop(), e.push(i)
				}
				if (2 == e.length) {
					var n = mars3d.drawing.utils.getZHeightPosition(e[0], e[1]),
						r = mars3d.drawing.utils.getHDistance(e[0], e[1]);
					r > 3 && (e.push(n), e.push(e[0]))
				}
				this.showSuperHeight(e)
			},
			showDrawEnd: function(t) {
				t._arrLables = [this.totalLable, this.hLable, this.xLable], this.totalLable = null, this.hLable = null, this.xLable = null
			},
			showSuperHeight: function(t) {
				var e, i, n, r;
				if (4 == t.length) {
					var o, a, s = mars3d.drawing.utils.getMidPosition(t[0], t[1]),
						u = Cesium.Cartographic.fromCartesian(t[0]),
						c = Cesium.Cartographic.fromCartesian(t[1]),
						h = Cesium.Cartographic.fromCartesian(t[2]);
					tempHeight = c.height - h.height, r = c.height - u.height, n = Cesium.Cartesian3.distance(t[0], t[1]), r > -1 && r < 1 ? (a = t[1], this.updateSuperHeightLabel(this.totalLable, a, "高度差", r), this.updateSuperHeightLabel(this.hLable, s, "长度", n)) : (tempHeight > -.1 && tempHeight < .1 ? (o = mars3d.drawing.utils.getMidPosition(t[2], t[1]), a = mars3d.drawing.utils.getMidPosition(t[2], t[3]), i = Cesium.Cartesian3.distance(t[1], t[2]), e = Cesium.Cartesian3.distance(t[3], t[2])) : (a = mars3d.drawing.utils.getMidPosition(t[2], t[1]), o = mars3d.drawing.utils.getMidPosition(t[2], t[3]), i = Cesium.Cartesian3.distance(t[3], t[2]), e = Cesium.Cartesian3.distance(t[1], t[2])), this.updateSuperHeightLabel(this.totalLable, a, "高度差", e), this.updateSuperHeightLabel(this.xLable, o, "水平距离", i), this.updateSuperHeightLabel(this.hLable, s, "长度", n))
				} else if (2 == t.length) {
					e = Cesium.Cartesian3.distance(t[1], t[0]);
					var a = mars3d.drawing.utils.getMidPosition(t[0], t[1]);
					xLable.label.show && (xLable.label.show = !1, hLable.label.show = !1), this.updateSuperHeightLabel(this.totalLable, a, "高度差", e)
				}
				var d = l(e, this.options.unit);
				this.options.calback && this.options.calback(d, e)
			},
			updateSuperHeightLabel: function(t, e, i, n) {
				null != t && (t.position = e, t.label.text = i + ":" + l(n, this.options.unit), t.label.show = !0, t.attribute.value = n, t.attribute.textEx = i + ":")
			}
		};
	return {
		measuerLength: e,
		measureHeight: n,
		measureArea: i,
		updateUnit: a,
		clearMeasure: o,
		formatArea: s,
		formatLength: l
	}
};