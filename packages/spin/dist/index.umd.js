(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["@study/spin"] = {}, global.React));
})(this, (function (exports, React) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var construct$4 = {exports: {}};

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$w =
	  // eslint-disable-next-line es-x/no-global-this -- safe
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || Function('return this')();

	var fails$i = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$h = fails$i;

	var functionBindNative = !fails$h(function () {
	  // eslint-disable-next-line es-x/no-function-prototype-bind -- safe
	  var test = (function () { /* empty */ }).bind();
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return typeof test != 'function' || test.hasOwnProperty('prototype');
	});

	var NATIVE_BIND$4 = functionBindNative;

	var FunctionPrototype$3 = Function.prototype;
	var apply$3 = FunctionPrototype$3.apply;
	var call$a = FunctionPrototype$3.call;

	// eslint-disable-next-line es-x/no-reflect -- safe
	var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND$4 ? call$a.bind(apply$3) : function () {
	  return call$a.apply(apply$3, arguments);
	});

	var NATIVE_BIND$3 = functionBindNative;

	var FunctionPrototype$2 = Function.prototype;
	var bind$c = FunctionPrototype$2.bind;
	var call$9 = FunctionPrototype$2.call;
	var uncurryThis$j = NATIVE_BIND$3 && bind$c.bind(call$9, call$9);

	var functionUncurryThis = NATIVE_BIND$3 ? function (fn) {
	  return fn && uncurryThis$j(fn);
	} : function (fn) {
	  return fn && function () {
	    return call$9.apply(fn, arguments);
	  };
	};

	// `IsCallable` abstract operation
	// https://tc39.es/ecma262/#sec-iscallable
	var isCallable$f = function (argument) {
	  return typeof argument == 'function';
	};

	var objectGetOwnPropertyDescriptor = {};

	var fails$g = fails$i;

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails$g(function () {
	  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var NATIVE_BIND$2 = functionBindNative;

	var call$8 = Function.prototype.call;

	var functionCall = NATIVE_BIND$2 ? call$8.bind(call$8) : function () {
	  return call$8.apply(call$8, arguments);
	};

	var objectPropertyIsEnumerable = {};

	var $propertyIsEnumerable$1 = {}.propertyIsEnumerable;
	// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable$1.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$1(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable$1;

	var createPropertyDescriptor$5 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var uncurryThis$i = functionUncurryThis;

	var toString$6 = uncurryThis$i({}.toString);
	var stringSlice$1 = uncurryThis$i(''.slice);

	var classofRaw$1 = function (it) {
	  return stringSlice$1(toString$6(it), 8, -1);
	};

	var global$v = global$w;
	var uncurryThis$h = functionUncurryThis;
	var fails$f = fails$i;
	var classof$7 = classofRaw$1;

	var Object$7 = global$v.Object;
	var split = uncurryThis$h(''.split);

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails$f(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !Object$7('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$7(it) == 'String' ? split(it, '') : Object$7(it);
	} : Object$7;

	var global$u = global$w;

	var TypeError$b = global$u.TypeError;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$3 = function (it) {
	  if (it == undefined) throw TypeError$b("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject$2 = indexedObject;
	var requireObjectCoercible$2 = requireObjectCoercible$3;

	var toIndexedObject$7 = function (it) {
	  return IndexedObject$2(requireObjectCoercible$2(it));
	};

	var isCallable$e = isCallable$f;

	var isObject$d = function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$e(it);
	};

	var path$b = {};

	var path$a = path$b;
	var global$t = global$w;
	var isCallable$d = isCallable$f;

	var aFunction = function (variable) {
	  return isCallable$d(variable) ? variable : undefined;
	};

	var getBuiltIn$9 = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path$a[namespace]) || aFunction(global$t[namespace])
	    : path$a[namespace] && path$a[namespace][method] || global$t[namespace] && global$t[namespace][method];
	};

	var uncurryThis$g = functionUncurryThis;

	var objectIsPrototypeOf = uncurryThis$g({}.isPrototypeOf);

	var getBuiltIn$8 = getBuiltIn$9;

	var engineUserAgent = getBuiltIn$8('navigator', 'userAgent') || '';

	var global$s = global$w;
	var userAgent = engineUserAgent;

	var process = global$s.process;
	var Deno = global$s.Deno;
	var versions = process && process.versions || Deno && Deno.version;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
	  // but their correct versions are not interesting for us
	  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
	}

	// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
	// so check `userAgent` even if `.v8` exists, but 0
	if (!version && userAgent) {
	  match = userAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent.match(/Chrome\/(\d+)/);
	    if (match) version = +match[1];
	  }
	}

	var engineV8Version = version;

	/* eslint-disable es-x/no-symbol -- required for testing */

	var V8_VERSION$2 = engineV8Version;
	var fails$e = fails$i;

	// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- required for testing
	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$e(function () {
	  var symbol = Symbol();
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && V8_VERSION$2 && V8_VERSION$2 < 41;
	});

	/* eslint-disable es-x/no-symbol -- required for testing */

	var NATIVE_SYMBOL$5 = nativeSymbol;

	var useSymbolAsUid = NATIVE_SYMBOL$5
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	var global$r = global$w;
	var getBuiltIn$7 = getBuiltIn$9;
	var isCallable$c = isCallable$f;
	var isPrototypeOf$2 = objectIsPrototypeOf;
	var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

	var Object$6 = global$r.Object;

	var isSymbol$6 = USE_SYMBOL_AS_UID$1 ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  var $Symbol = getBuiltIn$7('Symbol');
	  return isCallable$c($Symbol) && isPrototypeOf$2($Symbol.prototype, Object$6(it));
	};

	var global$q = global$w;

	var String$4 = global$q.String;

	var tryToString$3 = function (argument) {
	  try {
	    return String$4(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};

	var global$p = global$w;
	var isCallable$b = isCallable$f;
	var tryToString$2 = tryToString$3;

	var TypeError$a = global$p.TypeError;

	// `Assert: IsCallable(argument) is true`
	var aCallable$3 = function (argument) {
	  if (isCallable$b(argument)) return argument;
	  throw TypeError$a(tryToString$2(argument) + ' is not a function');
	};

	var aCallable$2 = aCallable$3;

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	var getMethod$1 = function (V, P) {
	  var func = V[P];
	  return func == null ? undefined : aCallable$2(func);
	};

	var global$o = global$w;
	var call$7 = functionCall;
	var isCallable$a = isCallable$f;
	var isObject$c = isObject$d;

	var TypeError$9 = global$o.TypeError;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	var ordinaryToPrimitive$1 = function (input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable$a(fn = input.toString) && !isObject$c(val = call$7(fn, input))) return val;
	  if (isCallable$a(fn = input.valueOf) && !isObject$c(val = call$7(fn, input))) return val;
	  if (pref !== 'string' && isCallable$a(fn = input.toString) && !isObject$c(val = call$7(fn, input))) return val;
	  throw TypeError$9("Can't convert object to primitive value");
	};

	var shared$6 = {exports: {}};

	var global$n = global$w;

	// eslint-disable-next-line es-x/no-object-defineproperty -- safe
	var defineProperty$c = Object.defineProperty;

	var defineGlobalProperty$1 = function (key, value) {
	  try {
	    defineProperty$c(global$n, key, { value: value, configurable: true, writable: true });
	  } catch (error) {
	    global$n[key] = value;
	  } return value;
	};

	var global$m = global$w;
	var defineGlobalProperty = defineGlobalProperty$1;

	var SHARED = '__core-js_shared__';
	var store$3 = global$m[SHARED] || defineGlobalProperty(SHARED, {});

	var sharedStore = store$3;

	var store$2 = sharedStore;

	(shared$6.exports = function (key, value) {
	  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.22.7',
	  mode: 'pure' ,
	  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
	  license: 'https://github.com/zloirock/core-js/blob/v3.22.7/LICENSE',
	  source: 'https://github.com/zloirock/core-js'
	});

	var global$l = global$w;
	var requireObjectCoercible$1 = requireObjectCoercible$3;

	var Object$5 = global$l.Object;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$7 = function (argument) {
	  return Object$5(requireObjectCoercible$1(argument));
	};

	var uncurryThis$f = functionUncurryThis;
	var toObject$6 = toObject$7;

	var hasOwnProperty$1 = uncurryThis$f({}.hasOwnProperty);

	// `HasOwnProperty` abstract operation
	// https://tc39.es/ecma262/#sec-hasownproperty
	// eslint-disable-next-line es-x/no-object-hasown -- safe
	var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty$1(toObject$6(it), key);
	};

	var uncurryThis$e = functionUncurryThis;

	var id = 0;
	var postfix = Math.random();
	var toString$5 = uncurryThis$e(1.0.toString);

	var uid$3 = function (key) {
	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$5(++id + postfix, 36);
	};

	var global$k = global$w;
	var shared$5 = shared$6.exports;
	var hasOwn$c = hasOwnProperty_1;
	var uid$2 = uid$3;
	var NATIVE_SYMBOL$4 = nativeSymbol;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;

	var WellKnownSymbolsStore$1 = shared$5('wks');
	var Symbol$4 = global$k.Symbol;
	var symbolFor = Symbol$4 && Symbol$4['for'];
	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$4 : Symbol$4 && Symbol$4.withoutSetter || uid$2;

	var wellKnownSymbol$d = function (name) {
	  if (!hasOwn$c(WellKnownSymbolsStore$1, name) || !(NATIVE_SYMBOL$4 || typeof WellKnownSymbolsStore$1[name] == 'string')) {
	    var description = 'Symbol.' + name;
	    if (NATIVE_SYMBOL$4 && hasOwn$c(Symbol$4, name)) {
	      WellKnownSymbolsStore$1[name] = Symbol$4[name];
	    } else if (USE_SYMBOL_AS_UID && symbolFor) {
	      WellKnownSymbolsStore$1[name] = symbolFor(description);
	    } else {
	      WellKnownSymbolsStore$1[name] = createWellKnownSymbol(description);
	    }
	  } return WellKnownSymbolsStore$1[name];
	};

	var global$j = global$w;
	var call$6 = functionCall;
	var isObject$b = isObject$d;
	var isSymbol$5 = isSymbol$6;
	var getMethod = getMethod$1;
	var ordinaryToPrimitive = ordinaryToPrimitive$1;
	var wellKnownSymbol$c = wellKnownSymbol$d;

	var TypeError$8 = global$j.TypeError;
	var TO_PRIMITIVE = wellKnownSymbol$c('toPrimitive');

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	var toPrimitive$1 = function (input, pref) {
	  if (!isObject$b(input) || isSymbol$5(input)) return input;
	  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
	  var result;
	  if (exoticToPrim) {
	    if (pref === undefined) pref = 'default';
	    result = call$6(exoticToPrim, input, pref);
	    if (!isObject$b(result) || isSymbol$5(result)) return result;
	    throw TypeError$8("Can't convert object to primitive value");
	  }
	  if (pref === undefined) pref = 'number';
	  return ordinaryToPrimitive(input, pref);
	};

	var toPrimitive = toPrimitive$1;
	var isSymbol$4 = isSymbol$6;

	// `ToPropertyKey` abstract operation
	// https://tc39.es/ecma262/#sec-topropertykey
	var toPropertyKey$4 = function (argument) {
	  var key = toPrimitive(argument, 'string');
	  return isSymbol$4(key) ? key : key + '';
	};

	var global$i = global$w;
	var isObject$a = isObject$d;

	var document$1 = global$i.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS$1 = isObject$a(document$1) && isObject$a(document$1.createElement);

	var documentCreateElement$1 = function (it) {
	  return EXISTS$1 ? document$1.createElement(it) : {};
	};

	var DESCRIPTORS$a = descriptors;
	var fails$d = fails$i;
	var createElement = documentCreateElement$1;

	// Thanks to IE8 for its funny defineProperty
	var ie8DomDefine = !DESCRIPTORS$a && !fails$d(function () {
	  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
	  return Object.defineProperty(createElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var DESCRIPTORS$9 = descriptors;
	var call$5 = functionCall;
	var propertyIsEnumerableModule$2 = objectPropertyIsEnumerable;
	var createPropertyDescriptor$4 = createPropertyDescriptor$5;
	var toIndexedObject$6 = toIndexedObject$7;
	var toPropertyKey$3 = toPropertyKey$4;
	var hasOwn$b = hasOwnProperty_1;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;

	// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$9 ? $getOwnPropertyDescriptor$2 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$6(O);
	  P = toPropertyKey$3(P);
	  if (IE8_DOM_DEFINE$1) try {
	    return $getOwnPropertyDescriptor$2(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwn$b(O, P)) return createPropertyDescriptor$4(!call$5(propertyIsEnumerableModule$2.f, O, P), O[P]);
	};

	var fails$c = fails$i;
	var isCallable$9 = isCallable$f;

	var replacement = /#|\.prototype\./;

	var isForced$1 = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : isCallable$9(detection) ? fails$c(detection)
	    : !!detection;
	};

	var normalize = isForced$1.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced$1.data = {};
	var NATIVE = isForced$1.NATIVE = 'N';
	var POLYFILL = isForced$1.POLYFILL = 'P';

	var isForced_1 = isForced$1;

	var uncurryThis$d = functionUncurryThis;
	var aCallable$1 = aCallable$3;
	var NATIVE_BIND$1 = functionBindNative;

	var bind$b = uncurryThis$d(uncurryThis$d.bind);

	// optional / simple context binding
	var functionBindContext = function (fn, that) {
	  aCallable$1(fn);
	  return that === undefined ? fn : NATIVE_BIND$1 ? bind$b(fn, that) : function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var objectDefineProperty = {};

	var DESCRIPTORS$8 = descriptors;
	var fails$b = fails$i;

	// V8 ~ Chrome 36-
	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
	var v8PrototypeDefineBug = DESCRIPTORS$8 && fails$b(function () {
	  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
	    value: 42,
	    writable: false
	  }).prototype != 42;
	});

	var global$h = global$w;
	var isObject$9 = isObject$d;

	var String$3 = global$h.String;
	var TypeError$7 = global$h.TypeError;

	// `Assert: Type(argument) is Object`
	var anObject$6 = function (argument) {
	  if (isObject$9(argument)) return argument;
	  throw TypeError$7(String$3(argument) + ' is not an object');
	};

	var global$g = global$w;
	var DESCRIPTORS$7 = descriptors;
	var IE8_DOM_DEFINE = ie8DomDefine;
	var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
	var anObject$5 = anObject$6;
	var toPropertyKey$2 = toPropertyKey$4;

	var TypeError$6 = global$g.TypeError;
	// eslint-disable-next-line es-x/no-object-defineproperty -- safe
	var $defineProperty$1 = Object.defineProperty;
	// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
	var ENUMERABLE = 'enumerable';
	var CONFIGURABLE$1 = 'configurable';
	var WRITABLE = 'writable';

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty.f = DESCRIPTORS$7 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
	  anObject$5(O);
	  P = toPropertyKey$2(P);
	  anObject$5(Attributes);
	  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
	    var current = $getOwnPropertyDescriptor$1(O, P);
	    if (current && current[WRITABLE]) {
	      O[P] = Attributes.value;
	      Attributes = {
	        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
	        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
	        writable: false
	      };
	    }
	  } return $defineProperty$1(O, P, Attributes);
	} : $defineProperty$1 : function defineProperty(O, P, Attributes) {
	  anObject$5(O);
	  P = toPropertyKey$2(P);
	  anObject$5(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return $defineProperty$1(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError$6('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var DESCRIPTORS$6 = descriptors;
	var definePropertyModule$3 = objectDefineProperty;
	var createPropertyDescriptor$3 = createPropertyDescriptor$5;

	var createNonEnumerableProperty$5 = DESCRIPTORS$6 ? function (object, key, value) {
	  return definePropertyModule$3.f(object, key, createPropertyDescriptor$3(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var global$f = global$w;
	var apply$2 = functionApply;
	var uncurryThis$c = functionUncurryThis;
	var isCallable$8 = isCallable$f;
	var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	var isForced = isForced_1;
	var path$9 = path$b;
	var bind$a = functionBindContext;
	var createNonEnumerableProperty$4 = createNonEnumerableProperty$5;
	var hasOwn$a = hasOwnProperty_1;

	var wrapConstructor = function (NativeConstructor) {
	  var Wrapper = function (a, b, c) {
	    if (this instanceof Wrapper) {
	      switch (arguments.length) {
	        case 0: return new NativeConstructor();
	        case 1: return new NativeConstructor(a);
	        case 2: return new NativeConstructor(a, b);
	      } return new NativeConstructor(a, b, c);
	    } return apply$2(NativeConstructor, this, arguments);
	  };
	  Wrapper.prototype = NativeConstructor.prototype;
	  return Wrapper;
	};

	/*
	  options.target         - name of the target object
	  options.global         - target is the global object
	  options.stat           - export as static methods of target
	  options.proto          - export as prototype methods of target
	  options.real           - real prototype method for the `pure` version
	  options.forced         - export even if the native feature is available
	  options.bind           - bind methods to the target, required for the `pure` version
	  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
	  options.sham           - add a flag to not completely full polyfills
	  options.enumerable     - export as enumerable property
	  options.dontCallGetSet - prevent calling a getter on target
	  options.name           - the .name of the function if it does not match the key
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var PROTO = options.proto;

	  var nativeSource = GLOBAL ? global$f : STATIC ? global$f[TARGET] : (global$f[TARGET] || {}).prototype;

	  var target = GLOBAL ? path$9 : path$9[TARGET] || createNonEnumerableProperty$4(path$9, TARGET, {})[TARGET];
	  var targetPrototype = target.prototype;

	  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
	  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

	  for (key in source) {
	    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contains in native
	    USE_NATIVE = !FORCED && nativeSource && hasOwn$a(nativeSource, key);

	    targetProperty = target[key];

	    if (USE_NATIVE) if (options.dontCallGetSet) {
	      descriptor = getOwnPropertyDescriptor(nativeSource, key);
	      nativeProperty = descriptor && descriptor.value;
	    } else nativeProperty = nativeSource[key];

	    // export native or implementation
	    sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

	    if (USE_NATIVE && typeof targetProperty == typeof sourceProperty) continue;

	    // bind timers to global for call from export context
	    if (options.bind && USE_NATIVE) resultProperty = bind$a(sourceProperty, global$f);
	    // wrap global constructors for prevent changs in this version
	    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
	    // make static versions for prototype methods
	    else if (PROTO && isCallable$8(sourceProperty)) resultProperty = uncurryThis$c(sourceProperty);
	    // default case
	    else resultProperty = sourceProperty;

	    // add a flag to not completely full polyfills
	    if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty$4(resultProperty, 'sham', true);
	    }

	    createNonEnumerableProperty$4(target, key, resultProperty);

	    if (PROTO) {
	      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
	      if (!hasOwn$a(path$9, VIRTUAL_PROTOTYPE)) {
	        createNonEnumerableProperty$4(path$9, VIRTUAL_PROTOTYPE, {});
	      }
	      // export virtual prototype methods
	      createNonEnumerableProperty$4(path$9[VIRTUAL_PROTOTYPE], key, sourceProperty);
	      // export real prototype methods
	      if (options.real && targetPrototype && !targetPrototype[key]) {
	        createNonEnumerableProperty$4(targetPrototype, key, sourceProperty);
	      }
	    }
	  }
	};

	var uncurryThis$b = functionUncurryThis;

	var arraySlice$3 = uncurryThis$b([].slice);

	var global$e = global$w;
	var uncurryThis$a = functionUncurryThis;
	var aCallable = aCallable$3;
	var isObject$8 = isObject$d;
	var hasOwn$9 = hasOwnProperty_1;
	var arraySlice$2 = arraySlice$3;
	var NATIVE_BIND = functionBindNative;

	var Function$1 = global$e.Function;
	var concat$1 = uncurryThis$a([].concat);
	var join = uncurryThis$a([].join);
	var factories = {};

	var construct$3 = function (C, argsLength, args) {
	  if (!hasOwn$9(factories, argsLength)) {
	    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
	    factories[argsLength] = Function$1('C,a', 'return new C(' + join(list, ',') + ')');
	  } return factories[argsLength](C, args);
	};

	// `Function.prototype.bind` method implementation
	// https://tc39.es/ecma262/#sec-function.prototype.bind
	var functionBind = NATIVE_BIND ? Function$1.bind : function bind(that /* , ...args */) {
	  var F = aCallable(this);
	  var Prototype = F.prototype;
	  var partArgs = arraySlice$2(arguments, 1);
	  var boundFunction = function bound(/* args... */) {
	    var args = concat$1(partArgs, arraySlice$2(arguments));
	    return this instanceof boundFunction ? construct$3(F, args.length, args) : F.apply(that, args);
	  };
	  if (isObject$8(Prototype)) boundFunction.prototype = Prototype;
	  return boundFunction;
	};

	var wellKnownSymbol$b = wellKnownSymbol$d;

	var TO_STRING_TAG$3 = wellKnownSymbol$b('toStringTag');
	var test = {};

	test[TO_STRING_TAG$3] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var global$d = global$w;
	var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
	var isCallable$7 = isCallable$f;
	var classofRaw = classofRaw$1;
	var wellKnownSymbol$a = wellKnownSymbol$d;

	var TO_STRING_TAG$2 = wellKnownSymbol$a('toStringTag');
	var Object$4 = global$d.Object;

	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof$6 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = Object$4(it), TO_STRING_TAG$2)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && isCallable$7(O.callee) ? 'Arguments' : result;
	};

	var uncurryThis$9 = functionUncurryThis;
	var isCallable$6 = isCallable$f;
	var store$1 = sharedStore;

	var functionToString = uncurryThis$9(Function.toString);

	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
	if (!isCallable$6(store$1.inspectSource)) {
	  store$1.inspectSource = function (it) {
	    return functionToString(it);
	  };
	}

	var inspectSource$2 = store$1.inspectSource;

	var uncurryThis$8 = functionUncurryThis;
	var fails$a = fails$i;
	var isCallable$5 = isCallable$f;
	var classof$5 = classof$6;
	var getBuiltIn$6 = getBuiltIn$9;
	var inspectSource$1 = inspectSource$2;

	var noop = function () { /* empty */ };
	var empty = [];
	var construct$2 = getBuiltIn$6('Reflect', 'construct');
	var constructorRegExp = /^\s*(?:class|function)\b/;
	var exec$1 = uncurryThis$8(constructorRegExp.exec);
	var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

	var isConstructorModern = function isConstructor(argument) {
	  if (!isCallable$5(argument)) return false;
	  try {
	    construct$2(noop, empty, argument);
	    return true;
	  } catch (error) {
	    return false;
	  }
	};

	var isConstructorLegacy = function isConstructor(argument) {
	  if (!isCallable$5(argument)) return false;
	  switch (classof$5(argument)) {
	    case 'AsyncFunction':
	    case 'GeneratorFunction':
	    case 'AsyncGeneratorFunction': return false;
	  }
	  try {
	    // we can't check .prototype since constructors produced by .bind haven't it
	    // `Function#toString` throws on some built-it function in some legacy engines
	    // (for example, `DOMQuad` and similar in FF41-)
	    return INCORRECT_TO_STRING || !!exec$1(constructorRegExp, inspectSource$1(argument));
	  } catch (error) {
	    return true;
	  }
	};

	isConstructorLegacy.sham = true;

	// `IsConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-isconstructor
	var isConstructor$2 = !construct$2 || fails$a(function () {
	  var called;
	  return isConstructorModern(isConstructorModern.call)
	    || !isConstructorModern(Object)
	    || !isConstructorModern(function () { called = true; })
	    || called;
	}) ? isConstructorLegacy : isConstructorModern;

	var global$c = global$w;
	var isConstructor$1 = isConstructor$2;
	var tryToString$1 = tryToString$3;

	var TypeError$5 = global$c.TypeError;

	// `Assert: IsConstructor(argument) is true`
	var aConstructor$1 = function (argument) {
	  if (isConstructor$1(argument)) return argument;
	  throw TypeError$5(tryToString$1(argument) + ' is not a constructor');
	};

	var objectDefineProperties = {};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `Math.trunc` method
	// https://tc39.es/ecma262/#sec-math.trunc
	// eslint-disable-next-line es-x/no-math-trunc -- safe
	var mathTrunc = Math.trunc || function trunc(x) {
	  var n = +x;
	  return (n > 0 ? floor : ceil)(n);
	};

	var trunc = mathTrunc;

	// `ToIntegerOrInfinity` abstract operation
	// https://tc39.es/ecma262/#sec-tointegerorinfinity
	var toIntegerOrInfinity$3 = function (argument) {
	  var number = +argument;
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return number !== number || number === 0 ? 0 : trunc(number);
	};

	var toIntegerOrInfinity$2 = toIntegerOrInfinity$3;

	var max$1 = Math.max;
	var min$1 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$2 = function (index, length) {
	  var integer = toIntegerOrInfinity$2(index);
	  return integer < 0 ? max$1(integer + length, 0) : min$1(integer, length);
	};

	var toIntegerOrInfinity$1 = toIntegerOrInfinity$3;

	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$1 = function (argument) {
	  return argument > 0 ? min(toIntegerOrInfinity$1(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toLength = toLength$1;

	// `LengthOfArrayLike` abstract operation
	// https://tc39.es/ecma262/#sec-lengthofarraylike
	var lengthOfArrayLike$4 = function (obj) {
	  return toLength(obj.length);
	};

	var toIndexedObject$5 = toIndexedObject$7;
	var toAbsoluteIndex$1 = toAbsoluteIndex$2;
	var lengthOfArrayLike$3 = lengthOfArrayLike$4;

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$2 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$5($this);
	    var length = lengthOfArrayLike$3(O);
	    var index = toAbsoluteIndex$1(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare -- NaN check
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.es/ecma262/#sec-array.prototype.includes
	  includes: createMethod$2(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$2(false)
	};

	var hiddenKeys$5 = {};

	var uncurryThis$7 = functionUncurryThis;
	var hasOwn$8 = hasOwnProperty_1;
	var toIndexedObject$4 = toIndexedObject$7;
	var indexOf = arrayIncludes.indexOf;
	var hiddenKeys$4 = hiddenKeys$5;

	var push$3 = uncurryThis$7([].push);

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject$4(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !hasOwn$8(hiddenKeys$4, key) && hasOwn$8(O, key) && push$3(result, key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (hasOwn$8(O, key = names[i++])) {
	    ~indexOf(result, key) || push$3(result, key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys$3 = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var internalObjectKeys$1 = objectKeysInternal;
	var enumBugKeys$2 = enumBugKeys$3;

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es-x/no-object-keys -- safe
	var objectKeys$3 = Object.keys || function keys(O) {
	  return internalObjectKeys$1(O, enumBugKeys$2);
	};

	var DESCRIPTORS$5 = descriptors;
	var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
	var definePropertyModule$2 = objectDefineProperty;
	var anObject$4 = anObject$6;
	var toIndexedObject$3 = toIndexedObject$7;
	var objectKeys$2 = objectKeys$3;

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es-x/no-object-defineproperties -- safe
	objectDefineProperties.f = DESCRIPTORS$5 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject$4(O);
	  var props = toIndexedObject$3(Properties);
	  var keys = objectKeys$2(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule$2.f(O, key = keys[index++], props[key]);
	  return O;
	};

	var getBuiltIn$5 = getBuiltIn$9;

	var html$1 = getBuiltIn$5('document', 'documentElement');

	var shared$4 = shared$6.exports;
	var uid$1 = uid$3;

	var keys = shared$4('keys');

	var sharedKey$4 = function (key) {
	  return keys[key] || (keys[key] = uid$1(key));
	};

	/* global ActiveXObject -- old IE, WSH */

	var anObject$3 = anObject$6;
	var definePropertiesModule$1 = objectDefineProperties;
	var enumBugKeys$1 = enumBugKeys$3;
	var hiddenKeys$3 = hiddenKeys$5;
	var html = html$1;
	var documentCreateElement = documentCreateElement$1;
	var sharedKey$3 = sharedKey$4;

	var GT = '>';
	var LT = '<';
	var PROTOTYPE$1 = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO$1 = sharedKey$3('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    activeXDocument = new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = typeof document != 'undefined'
	    ? document.domain && activeXDocument
	      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
	      : NullProtoObjectViaIFrame()
	    : NullProtoObjectViaActiveX(activeXDocument); // WSH
	  var length = enumBugKeys$1.length;
	  while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys$1[length]];
	  return NullProtoObject();
	};

	hiddenKeys$3[IE_PROTO$1] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	// eslint-disable-next-line es-x/no-object-create -- safe
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE$1] = anObject$3(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : definePropertiesModule$1.f(result, Properties);
	};

	var $$d = _export;
	var getBuiltIn$4 = getBuiltIn$9;
	var apply$1 = functionApply;
	var bind$9 = functionBind;
	var aConstructor = aConstructor$1;
	var anObject$2 = anObject$6;
	var isObject$7 = isObject$d;
	var create$9 = objectCreate;
	var fails$9 = fails$i;

	var nativeConstruct = getBuiltIn$4('Reflect', 'construct');
	var ObjectPrototype$2 = Object.prototype;
	var push$2 = [].push;

	// `Reflect.construct` method
	// https://tc39.es/ecma262/#sec-reflect.construct
	// MS Edge supports only 2 arguments and argumentsList argument is optional
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	var NEW_TARGET_BUG = fails$9(function () {
	  function F() { /* empty */ }
	  return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
	});

	var ARGS_BUG = !fails$9(function () {
	  nativeConstruct(function () { /* empty */ });
	});

	var FORCED$2 = NEW_TARGET_BUG || ARGS_BUG;

	$$d({ target: 'Reflect', stat: true, forced: FORCED$2, sham: FORCED$2 }, {
	  construct: function construct(Target, args /* , newTarget */) {
	    aConstructor(Target);
	    anObject$2(args);
	    var newTarget = arguments.length < 3 ? Target : aConstructor(arguments[2]);
	    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
	    if (Target == newTarget) {
	      // w/o altered newTarget, optimization for 0-4 arguments
	      switch (args.length) {
	        case 0: return new Target();
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      apply$1(push$2, $args, args);
	      return new (apply$1(bind$9, Target, $args))();
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto = newTarget.prototype;
	    var instance = create$9(isObject$7(proto) ? proto : ObjectPrototype$2);
	    var result = apply$1(Target, instance, args);
	    return isObject$7(result) ? result : instance;
	  }
	});

	var path$8 = path$b;

	var construct$1 = path$8.Reflect.construct;

	var parent$m = construct$1;

	var construct = parent$m;

	(function (module) {
		module.exports = construct;
	} (construct$4));

	var _Reflect$construct = /*@__PURE__*/getDefaultExportFromCjs(construct$4.exports);

	var defineProperty$b = {exports: {}};

	var defineProperty$a = {exports: {}};

	var defineProperty$9 = {exports: {}};

	var $$c = _export;
	var DESCRIPTORS$4 = descriptors;
	var defineProperty$8 = objectDefineProperty.f;

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	// eslint-disable-next-line es-x/no-object-defineproperty -- safe
	$$c({ target: 'Object', stat: true, forced: Object.defineProperty !== defineProperty$8, sham: !DESCRIPTORS$4 }, {
	  defineProperty: defineProperty$8
	});

	var path$7 = path$b;

	var Object$3 = path$7.Object;

	var defineProperty$7 = defineProperty$9.exports = function defineProperty(it, key, desc) {
	  return Object$3.defineProperty(it, key, desc);
	};

	if (Object$3.defineProperty.sham) defineProperty$7.sham = true;

	var parent$l = defineProperty$9.exports;

	var defineProperty$6 = parent$l;

	var parent$k = defineProperty$6;

	var defineProperty$5 = parent$k;

	var parent$j = defineProperty$5;

	var defineProperty$4 = parent$j;

	(function (module) {
		module.exports = defineProperty$4;
	} (defineProperty$a));

	(function (module) {
		module.exports = defineProperty$a.exports;
	} (defineProperty$b));

	var _Object$defineProperty = /*@__PURE__*/getDefaultExportFromCjs(defineProperty$b.exports);

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    _Object$defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;

	    _Object$defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);

	  _Object$defineProperty(Constructor, "prototype", {
	    writable: false
	  });

	  return Constructor;
	}

	var create$8 = {exports: {}};

	var create$7 = {exports: {}};

	// TODO: Remove from `core-js@4`
	var $$b = _export;
	var DESCRIPTORS$3 = descriptors;
	var create$6 = objectCreate;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	$$b({ target: 'Object', stat: true, sham: !DESCRIPTORS$3 }, {
	  create: create$6
	});

	var path$6 = path$b;

	var Object$2 = path$6.Object;

	var create$5 = function create(P, D) {
	  return Object$2.create(P, D);
	};

	var parent$i = create$5;

	var create$4 = parent$i;

	var parent$h = create$4;

	var create$3 = parent$h;

	var parent$g = create$3;

	var create$2 = parent$g;

	(function (module) {
		module.exports = create$2;
	} (create$7));

	(function (module) {
		module.exports = create$7.exports;
	} (create$8));

	var _Object$create = /*@__PURE__*/getDefaultExportFromCjs(create$8.exports);

	var setPrototypeOf$6 = {exports: {}};

	var setPrototypeOf$5 = {exports: {}};

	var global$b = global$w;
	var isCallable$4 = isCallable$f;

	var String$2 = global$b.String;
	var TypeError$4 = global$b.TypeError;

	var aPossiblePrototype$1 = function (argument) {
	  if (typeof argument == 'object' || isCallable$4(argument)) return argument;
	  throw TypeError$4("Can't set " + String$2(argument) + ' as a prototype');
	};

	/* eslint-disable no-proto -- safe */

	var uncurryThis$6 = functionUncurryThis;
	var anObject$1 = anObject$6;
	var aPossiblePrototype = aPossiblePrototype$1;

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	// eslint-disable-next-line es-x/no-object-setprototypeof -- safe
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
	    setter = uncurryThis$6(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
	    setter(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject$1(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var $$a = _export;
	var setPrototypeOf$4 = objectSetPrototypeOf;

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	$$a({ target: 'Object', stat: true }, {
	  setPrototypeOf: setPrototypeOf$4
	});

	var path$5 = path$b;

	var setPrototypeOf$3 = path$5.Object.setPrototypeOf;

	var parent$f = setPrototypeOf$3;

	var setPrototypeOf$2 = parent$f;

	var parent$e = setPrototypeOf$2;

	var setPrototypeOf$1 = parent$e;

	var parent$d = setPrototypeOf$1;

	var setPrototypeOf = parent$d;

	(function (module) {
		module.exports = setPrototypeOf;
	} (setPrototypeOf$5));

	(function (module) {
		module.exports = setPrototypeOf$5.exports;
	} (setPrototypeOf$6));

	var _Object$setPrototypeOf = /*@__PURE__*/getDefaultExportFromCjs(setPrototypeOf$6.exports);

	var bind$8 = {exports: {}};

	var bind$7 = {exports: {}};

	// TODO: Remove from `core-js@4`
	var $$9 = _export;
	var bind$6 = functionBind;

	// `Function.prototype.bind` method
	// https://tc39.es/ecma262/#sec-function.prototype.bind
	$$9({ target: 'Function', proto: true, forced: Function.bind !== bind$6 }, {
	  bind: bind$6
	});

	var path$4 = path$b;

	var entryVirtual$1 = function (CONSTRUCTOR) {
	  return path$4[CONSTRUCTOR + 'Prototype'];
	};

	var entryVirtual = entryVirtual$1;

	var bind$5 = entryVirtual('Function').bind;

	var isPrototypeOf$1 = objectIsPrototypeOf;
	var method = bind$5;

	var FunctionPrototype$1 = Function.prototype;

	var bind$4 = function (it) {
	  var own = it.bind;
	  return it === FunctionPrototype$1 || (isPrototypeOf$1(FunctionPrototype$1, it) && own === FunctionPrototype$1.bind) ? method : own;
	};

	var parent$c = bind$4;

	var bind$3 = parent$c;

	var parent$b = bind$3;

	var bind$2 = parent$b;

	var parent$a = bind$2;

	var bind$1 = parent$a;

	(function (module) {
		module.exports = bind$1;
	} (bind$7));

	(function (module) {
		module.exports = bind$7.exports;
	} (bind$8));

	var _bindInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(bind$8.exports);

	function _setPrototypeOf(o, p) {
	  var _context;

	  _setPrototypeOf = _Object$setPrototypeOf ? _bindInstanceProperty(_context = _Object$setPrototypeOf).call(_context) : function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };
	  return _setPrototypeOf(o, p);
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = _Object$create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });

	  _Object$defineProperty(subClass, "prototype", {
	    writable: false
	  });

	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	var symbol$5 = {exports: {}};

	var symbol$4 = {exports: {}};

	var classof$4 = classofRaw$1;

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es-x/no-array-isarray -- safe
	var isArray$3 = Array.isArray || function isArray(argument) {
	  return classof$4(argument) == 'Array';
	};

	var toPropertyKey$1 = toPropertyKey$4;
	var definePropertyModule$1 = objectDefineProperty;
	var createPropertyDescriptor$2 = createPropertyDescriptor$5;

	var createProperty$2 = function (object, key, value) {
	  var propertyKey = toPropertyKey$1(key);
	  if (propertyKey in object) definePropertyModule$1.f(object, propertyKey, createPropertyDescriptor$2(0, value));
	  else object[propertyKey] = value;
	};

	var global$a = global$w;
	var isArray$2 = isArray$3;
	var isConstructor = isConstructor$2;
	var isObject$6 = isObject$d;
	var wellKnownSymbol$9 = wellKnownSymbol$d;

	var SPECIES$1 = wellKnownSymbol$9('species');
	var Array$2 = global$a.Array;

	// a part of `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesConstructor$1 = function (originalArray) {
	  var C;
	  if (isArray$2(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (isConstructor(C) && (C === Array$2 || isArray$2(C.prototype))) C = undefined;
	    else if (isObject$6(C)) {
	      C = C[SPECIES$1];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? Array$2 : C;
	};

	var arraySpeciesConstructor = arraySpeciesConstructor$1;

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate$2 = function (originalArray, length) {
	  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
	};

	var fails$8 = fails$i;
	var wellKnownSymbol$8 = wellKnownSymbol$d;
	var V8_VERSION$1 = engineV8Version;

	var SPECIES = wellKnownSymbol$8('species');

	var arrayMethodHasSpeciesSupport$1 = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return V8_VERSION$1 >= 51 || !fails$8(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var $$8 = _export;
	var global$9 = global$w;
	var fails$7 = fails$i;
	var isArray$1 = isArray$3;
	var isObject$5 = isObject$d;
	var toObject$5 = toObject$7;
	var lengthOfArrayLike$2 = lengthOfArrayLike$4;
	var createProperty$1 = createProperty$2;
	var arraySpeciesCreate$1 = arraySpeciesCreate$2;
	var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$1;
	var wellKnownSymbol$7 = wellKnownSymbol$d;
	var V8_VERSION = engineV8Version;

	var IS_CONCAT_SPREADABLE = wellKnownSymbol$7('isConcatSpreadable');
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
	var TypeError$3 = global$9.TypeError;

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails$7(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject$5(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray$1(O);
	};

	var FORCED$1 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.es/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	$$8({ target: 'Array', proto: true, arity: 1, forced: FORCED$1 }, {
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  concat: function concat(arg) {
	    var O = toObject$5(this);
	    var A = arraySpeciesCreate$1(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = lengthOfArrayLike$2(E);
	        if (n + len > MAX_SAFE_INTEGER) throw TypeError$3(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty$1(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER) throw TypeError$3(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty$1(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	var global$8 = global$w;
	var classof$3 = classof$6;

	var String$1 = global$8.String;

	var toString$4 = function (argument) {
	  if (classof$3(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
	  return String$1(argument);
	};

	var objectGetOwnPropertyNames = {};

	var internalObjectKeys = objectKeysInternal;
	var enumBugKeys = enumBugKeys$3;

	var hiddenKeys$2 = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	// eslint-disable-next-line es-x/no-object-getownpropertynames -- safe
	objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return internalObjectKeys(O, hiddenKeys$2);
	};

	var objectGetOwnPropertyNamesExternal = {};

	var global$7 = global$w;
	var toAbsoluteIndex = toAbsoluteIndex$2;
	var lengthOfArrayLike$1 = lengthOfArrayLike$4;
	var createProperty = createProperty$2;

	var Array$1 = global$7.Array;
	var max = Math.max;

	var arraySliceSimple = function (O, start, end) {
	  var length = lengthOfArrayLike$1(O);
	  var k = toAbsoluteIndex(start, length);
	  var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	  var result = Array$1(max(fin - k, 0));
	  for (var n = 0; k < fin; k++, n++) createProperty(result, n, O[k]);
	  result.length = n;
	  return result;
	};

	/* eslint-disable es-x/no-object-getownpropertynames -- safe */

	var classof$2 = classofRaw$1;
	var toIndexedObject$2 = toIndexedObject$7;
	var $getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
	var arraySlice$1 = arraySliceSimple;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return $getOwnPropertyNames$1(it);
	  } catch (error) {
	    return arraySlice$1(windowNames);
	  }
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
	  return windowNames && classof$2(it) == 'Window'
	    ? getWindowNames(it)
	    : $getOwnPropertyNames$1(toIndexedObject$2(it));
	};

	var objectGetOwnPropertySymbols = {};

	// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- safe
	objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

	var createNonEnumerableProperty$3 = createNonEnumerableProperty$5;

	var defineBuiltIn$4 = function (target, key, value, options) {
	  if (options && options.enumerable) target[key] = value;
	  else createNonEnumerableProperty$3(target, key, value);
	  return target;
	};

	var wellKnownSymbolWrapped = {};

	var wellKnownSymbol$6 = wellKnownSymbol$d;

	wellKnownSymbolWrapped.f = wellKnownSymbol$6;

	var path$3 = path$b;
	var hasOwn$7 = hasOwnProperty_1;
	var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
	var defineProperty$3 = objectDefineProperty.f;

	var defineWellKnownSymbol$l = function (NAME) {
	  var Symbol = path$3.Symbol || (path$3.Symbol = {});
	  if (!hasOwn$7(Symbol, NAME)) defineProperty$3(Symbol, NAME, {
	    value: wrappedWellKnownSymbolModule$1.f(NAME)
	  });
	};

	var call$4 = functionCall;
	var getBuiltIn$3 = getBuiltIn$9;
	var wellKnownSymbol$5 = wellKnownSymbol$d;
	var defineBuiltIn$3 = defineBuiltIn$4;

	var symbolDefineToPrimitive = function () {
	  var Symbol = getBuiltIn$3('Symbol');
	  var SymbolPrototype = Symbol && Symbol.prototype;
	  var valueOf = SymbolPrototype && SymbolPrototype.valueOf;
	  var TO_PRIMITIVE = wellKnownSymbol$5('toPrimitive');

	  if (SymbolPrototype && !SymbolPrototype[TO_PRIMITIVE]) {
	    // `Symbol.prototype[@@toPrimitive]` method
	    // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
	    // eslint-disable-next-line no-unused-vars -- required for .length
	    defineBuiltIn$3(SymbolPrototype, TO_PRIMITIVE, function (hint) {
	      return call$4(valueOf, this);
	    }, { arity: 1 });
	  }
	};

	var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
	var classof$1 = classof$6;

	// `Object.prototype.toString` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	var objectToString$2 = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
	  return '[object ' + classof$1(this) + ']';
	};

	var TO_STRING_TAG_SUPPORT = toStringTagSupport;
	var defineProperty$2 = objectDefineProperty.f;
	var createNonEnumerableProperty$2 = createNonEnumerableProperty$5;
	var hasOwn$6 = hasOwnProperty_1;
	var toString$3 = objectToString$2;
	var wellKnownSymbol$4 = wellKnownSymbol$d;

	var TO_STRING_TAG$1 = wellKnownSymbol$4('toStringTag');

	var setToStringTag$5 = function (it, TAG, STATIC, SET_METHOD) {
	  if (it) {
	    var target = STATIC ? it : it.prototype;
	    if (!hasOwn$6(target, TO_STRING_TAG$1)) {
	      defineProperty$2(target, TO_STRING_TAG$1, { configurable: true, value: TAG });
	    }
	    if (SET_METHOD && !TO_STRING_TAG_SUPPORT) {
	      createNonEnumerableProperty$2(target, 'toString', toString$3);
	    }
	  }
	};

	var global$6 = global$w;
	var isCallable$3 = isCallable$f;
	var inspectSource = inspectSource$2;

	var WeakMap$1 = global$6.WeakMap;

	var nativeWeakMap = isCallable$3(WeakMap$1) && /native code/.test(inspectSource(WeakMap$1));

	var NATIVE_WEAK_MAP = nativeWeakMap;
	var global$5 = global$w;
	var uncurryThis$5 = functionUncurryThis;
	var isObject$4 = isObject$d;
	var createNonEnumerableProperty$1 = createNonEnumerableProperty$5;
	var hasOwn$5 = hasOwnProperty_1;
	var shared$3 = sharedStore;
	var sharedKey$2 = sharedKey$4;
	var hiddenKeys$1 = hiddenKeys$5;

	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var TypeError$2 = global$5.TypeError;
	var WeakMap = global$5.WeakMap;
	var set, get, has;

	var enforce = function (it) {
	  return has(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject$4(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError$2('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (NATIVE_WEAK_MAP || shared$3.state) {
	  var store = shared$3.state || (shared$3.state = new WeakMap());
	  var wmget = uncurryThis$5(store.get);
	  var wmhas = uncurryThis$5(store.has);
	  var wmset = uncurryThis$5(store.set);
	  set = function (it, metadata) {
	    if (wmhas(store, it)) throw new TypeError$2(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    wmset(store, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget(store, it) || {};
	  };
	  has = function (it) {
	    return wmhas(store, it);
	  };
	} else {
	  var STATE = sharedKey$2('state');
	  hiddenKeys$1[STATE] = true;
	  set = function (it, metadata) {
	    if (hasOwn$5(it, STATE)) throw new TypeError$2(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty$1(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return hasOwn$5(it, STATE) ? it[STATE] : {};
	  };
	  has = function (it) {
	    return hasOwn$5(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var bind = functionBindContext;
	var uncurryThis$4 = functionUncurryThis;
	var IndexedObject$1 = indexedObject;
	var toObject$4 = toObject$7;
	var lengthOfArrayLike = lengthOfArrayLike$4;
	var arraySpeciesCreate = arraySpeciesCreate$2;

	var push$1 = uncurryThis$4([].push);

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
	var createMethod$1 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var IS_FILTER_REJECT = TYPE == 7;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject$4($this);
	    var self = IndexedObject$1(O);
	    var boundFunction = bind(callbackfn, that);
	    var length = lengthOfArrayLike(self);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push$1(target, value);      // filter
	        } else switch (TYPE) {
	          case 4: return false;             // every
	          case 7: push$1(target, value);      // filterReject
	        }
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.es/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$1(0),
	  // `Array.prototype.map` method
	  // https://tc39.es/ecma262/#sec-array.prototype.map
	  map: createMethod$1(1),
	  // `Array.prototype.filter` method
	  // https://tc39.es/ecma262/#sec-array.prototype.filter
	  filter: createMethod$1(2),
	  // `Array.prototype.some` method
	  // https://tc39.es/ecma262/#sec-array.prototype.some
	  some: createMethod$1(3),
	  // `Array.prototype.every` method
	  // https://tc39.es/ecma262/#sec-array.prototype.every
	  every: createMethod$1(4),
	  // `Array.prototype.find` method
	  // https://tc39.es/ecma262/#sec-array.prototype.find
	  find: createMethod$1(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$1(6),
	  // `Array.prototype.filterReject` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterReject: createMethod$1(7)
	};

	var $$7 = _export;
	var global$4 = global$w;
	var call$3 = functionCall;
	var uncurryThis$3 = functionUncurryThis;
	var DESCRIPTORS$2 = descriptors;
	var NATIVE_SYMBOL$3 = nativeSymbol;
	var fails$6 = fails$i;
	var hasOwn$4 = hasOwnProperty_1;
	var isPrototypeOf = objectIsPrototypeOf;
	var anObject = anObject$6;
	var toIndexedObject$1 = toIndexedObject$7;
	var toPropertyKey = toPropertyKey$4;
	var $toString = toString$4;
	var createPropertyDescriptor$1 = createPropertyDescriptor$5;
	var nativeObjectCreate = objectCreate;
	var objectKeys$1 = objectKeys$3;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
	var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
	var getOwnPropertySymbolsModule$2 = objectGetOwnPropertySymbols;
	var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
	var definePropertyModule = objectDefineProperty;
	var definePropertiesModule = objectDefineProperties;
	var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
	var defineBuiltIn$2 = defineBuiltIn$4;
	var shared$2 = shared$6.exports;
	var sharedKey$1 = sharedKey$4;
	var hiddenKeys = hiddenKeys$5;
	var uid = uid$3;
	var wellKnownSymbol$3 = wellKnownSymbol$d;
	var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
	var defineWellKnownSymbol$k = defineWellKnownSymbol$l;
	var defineSymbolToPrimitive$1 = symbolDefineToPrimitive;
	var setToStringTag$4 = setToStringTag$5;
	var InternalStateModule$2 = internalState;
	var $forEach = arrayIteration.forEach;

	var HIDDEN = sharedKey$1('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE = 'prototype';

	var setInternalState$2 = InternalStateModule$2.set;
	var getInternalState$2 = InternalStateModule$2.getterFor(SYMBOL);

	var ObjectPrototype$1 = Object[PROTOTYPE];
	var $Symbol = global$4.Symbol;
	var SymbolPrototype = $Symbol && $Symbol[PROTOTYPE];
	var TypeError$1 = global$4.TypeError;
	var QObject = global$4.QObject;
	var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	var nativeDefineProperty = definePropertyModule.f;
	var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable = propertyIsEnumerableModule$1.f;
	var push = uncurryThis$3([].push);

	var AllSymbols = shared$2('symbols');
	var ObjectPrototypeSymbols = shared$2('op-symbols');
	var WellKnownSymbolsStore = shared$2('wks');

	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDescriptor = DESCRIPTORS$2 && fails$6(function () {
	  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
	    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype$1, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype$1[P];
	  nativeDefineProperty(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype$1) {
	    nativeDefineProperty(ObjectPrototype$1, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty;

	var wrap = function (tag, description) {
	  var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype);
	  setInternalState$2(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!DESCRIPTORS$2) symbol.description = description;
	  return symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype$1) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject(O);
	  var key = toPropertyKey(P);
	  anObject(Attributes);
	  if (hasOwn$4(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!hasOwn$4(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor$1(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (hasOwn$4(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor$1(0, false) });
	    } return setSymbolDescriptor(O, key, Attributes);
	  } return nativeDefineProperty(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject(O);
	  var properties = toIndexedObject$1(Properties);
	  var keys = objectKeys$1(properties).concat($getOwnPropertySymbols(properties));
	  $forEach(keys, function (key) {
	    if (!DESCRIPTORS$2 || call$3($propertyIsEnumerable, properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
	};

	var $propertyIsEnumerable = function propertyIsEnumerable(V) {
	  var P = toPropertyKey(V);
	  var enumerable = call$3(nativePropertyIsEnumerable, this, P);
	  if (this === ObjectPrototype$1 && hasOwn$4(AllSymbols, P) && !hasOwn$4(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !hasOwn$4(this, P) || !hasOwn$4(AllSymbols, P) || hasOwn$4(this, HIDDEN) && this[HIDDEN][P]
	    ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject$1(O);
	  var key = toPropertyKey(P);
	  if (it === ObjectPrototype$1 && hasOwn$4(AllSymbols, key) && !hasOwn$4(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
	  if (descriptor && hasOwn$4(AllSymbols, key) && !(hasOwn$4(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }
	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames(toIndexedObject$1(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (!hasOwn$4(AllSymbols, key) && !hasOwn$4(hiddenKeys, key)) push(result, key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function (O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$1;
	  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$1(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (hasOwn$4(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn$4(ObjectPrototype$1, key))) {
	      push(result, AllSymbols[key]);
	    }
	  });
	  return result;
	};

	// `Symbol` constructor
	// https://tc39.es/ecma262/#sec-symbol-constructor
	if (!NATIVE_SYMBOL$3) {
	  $Symbol = function Symbol() {
	    if (isPrototypeOf(SymbolPrototype, this)) throw TypeError$1('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
	    var tag = uid(description);
	    var setter = function (value) {
	      if (this === ObjectPrototype$1) call$3(setter, ObjectPrototypeSymbols, value);
	      if (hasOwn$4(this, HIDDEN) && hasOwn$4(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor$1(1, value));
	    };
	    if (DESCRIPTORS$2 && USE_SETTER) setSymbolDescriptor(ObjectPrototype$1, tag, { configurable: true, set: setter });
	    return wrap(tag, description);
	  };

	  SymbolPrototype = $Symbol[PROTOTYPE];

	  defineBuiltIn$2(SymbolPrototype, 'toString', function toString() {
	    return getInternalState$2(this).tag;
	  });

	  defineBuiltIn$2($Symbol, 'withoutSetter', function (description) {
	    return wrap(uid(description), description);
	  });

	  propertyIsEnumerableModule$1.f = $propertyIsEnumerable;
	  definePropertyModule.f = $defineProperty;
	  definePropertiesModule.f = $defineProperties;
	  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
	  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  getOwnPropertySymbolsModule$2.f = $getOwnPropertySymbols;

	  wrappedWellKnownSymbolModule.f = function (name) {
	    return wrap(wellKnownSymbol$3(name), name);
	  };

	  if (DESCRIPTORS$2) {
	    // https://github.com/tc39/proposal-Symbol-description
	    nativeDefineProperty(SymbolPrototype, 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState$2(this).description;
	      }
	    });
	  }
	}

	$$7({ global: true, constructor: true, wrap: true, forced: !NATIVE_SYMBOL$3, sham: !NATIVE_SYMBOL$3 }, {
	  Symbol: $Symbol
	});

	$forEach(objectKeys$1(WellKnownSymbolsStore), function (name) {
	  defineWellKnownSymbol$k(name);
	});

	$$7({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL$3 }, {
	  useSetter: function () { USE_SETTER = true; },
	  useSimple: function () { USE_SETTER = false; }
	});

	$$7({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL$3, sham: !DESCRIPTORS$2 }, {
	  // `Object.create` method
	  // https://tc39.es/ecma262/#sec-object.create
	  create: $create,
	  // `Object.defineProperty` method
	  // https://tc39.es/ecma262/#sec-object.defineproperty
	  defineProperty: $defineProperty,
	  // `Object.defineProperties` method
	  // https://tc39.es/ecma262/#sec-object.defineproperties
	  defineProperties: $defineProperties,
	  // `Object.getOwnPropertyDescriptor` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
	});

	$$7({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL$3 }, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames
	});

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
	defineSymbolToPrimitive$1();

	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag$4($Symbol, SYMBOL);

	hiddenKeys[HIDDEN] = true;

	var NATIVE_SYMBOL$2 = nativeSymbol;

	/* eslint-disable es-x/no-symbol -- safe */
	var nativeSymbolRegistry = NATIVE_SYMBOL$2 && !!Symbol['for'] && !!Symbol.keyFor;

	var $$6 = _export;
	var getBuiltIn$2 = getBuiltIn$9;
	var hasOwn$3 = hasOwnProperty_1;
	var toString$2 = toString$4;
	var shared$1 = shared$6.exports;
	var NATIVE_SYMBOL_REGISTRY$1 = nativeSymbolRegistry;

	var StringToSymbolRegistry = shared$1('string-to-symbol-registry');
	var SymbolToStringRegistry$1 = shared$1('symbol-to-string-registry');

	// `Symbol.for` method
	// https://tc39.es/ecma262/#sec-symbol.for
	$$6({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY$1 }, {
	  'for': function (key) {
	    var string = toString$2(key);
	    if (hasOwn$3(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = getBuiltIn$2('Symbol')(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry$1[symbol] = string;
	    return symbol;
	  }
	});

	var $$5 = _export;
	var hasOwn$2 = hasOwnProperty_1;
	var isSymbol$3 = isSymbol$6;
	var tryToString = tryToString$3;
	var shared = shared$6.exports;
	var NATIVE_SYMBOL_REGISTRY = nativeSymbolRegistry;

	var SymbolToStringRegistry = shared('symbol-to-string-registry');

	// `Symbol.keyFor` method
	// https://tc39.es/ecma262/#sec-symbol.keyfor
	$$5({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY }, {
	  keyFor: function keyFor(sym) {
	    if (!isSymbol$3(sym)) throw TypeError(tryToString(sym) + ' is not a symbol');
	    if (hasOwn$2(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  }
	});

	var $$4 = _export;
	var getBuiltIn$1 = getBuiltIn$9;
	var apply = functionApply;
	var call$2 = functionCall;
	var uncurryThis$2 = functionUncurryThis;
	var fails$5 = fails$i;
	var isArray = isArray$3;
	var isCallable$2 = isCallable$f;
	var isObject$3 = isObject$d;
	var isSymbol$2 = isSymbol$6;
	var arraySlice = arraySlice$3;
	var NATIVE_SYMBOL$1 = nativeSymbol;

	var $stringify = getBuiltIn$1('JSON', 'stringify');
	var exec = uncurryThis$2(/./.exec);
	var charAt$2 = uncurryThis$2(''.charAt);
	var charCodeAt$1 = uncurryThis$2(''.charCodeAt);
	var replace = uncurryThis$2(''.replace);
	var numberToString = uncurryThis$2(1.0.toString);

	var tester = /[\uD800-\uDFFF]/g;
	var low = /^[\uD800-\uDBFF]$/;
	var hi = /^[\uDC00-\uDFFF]$/;

	var WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL$1 || fails$5(function () {
	  var symbol = getBuiltIn$1('Symbol')();
	  // MS Edge converts symbol values to JSON as {}
	  return $stringify([symbol]) != '[null]'
	    // WebKit converts symbol values to JSON as null
	    || $stringify({ a: symbol }) != '{}'
	    // V8 throws on boxed symbols
	    || $stringify(Object(symbol)) != '{}';
	});

	// https://github.com/tc39/proposal-well-formed-stringify
	var ILL_FORMED_UNICODE = fails$5(function () {
	  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
	    || $stringify('\uDEAD') !== '"\\udead"';
	});

	var stringifyWithSymbolsFix = function (it, replacer) {
	  var args = arraySlice(arguments);
	  var $replacer = replacer;
	  if (!isObject$3(replacer) && it === undefined || isSymbol$2(it)) return; // IE8 returns string on undefined
	  if (!isArray(replacer)) replacer = function (key, value) {
	    if (isCallable$2($replacer)) value = call$2($replacer, this, key, value);
	    if (!isSymbol$2(value)) return value;
	  };
	  args[1] = replacer;
	  return apply($stringify, null, args);
	};

	var fixIllFormed = function (match, offset, string) {
	  var prev = charAt$2(string, offset - 1);
	  var next = charAt$2(string, offset + 1);
	  if ((exec(low, match) && !exec(hi, next)) || (exec(hi, match) && !exec(low, prev))) {
	    return '\\u' + numberToString(charCodeAt$1(match, 0), 16);
	  } return match;
	};

	if ($stringify) {
	  // `JSON.stringify` method
	  // https://tc39.es/ecma262/#sec-json.stringify
	  $$4({ target: 'JSON', stat: true, arity: 3, forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE }, {
	    // eslint-disable-next-line no-unused-vars -- required for `.length`
	    stringify: function stringify(it, replacer, space) {
	      var args = arraySlice(arguments);
	      var result = apply(WRONG_SYMBOLS_CONVERSION ? stringifyWithSymbolsFix : $stringify, null, args);
	      return ILL_FORMED_UNICODE && typeof result == 'string' ? replace(result, tester, fixIllFormed) : result;
	    }
	  });
	}

	var $$3 = _export;
	var NATIVE_SYMBOL = nativeSymbol;
	var fails$4 = fails$i;
	var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
	var toObject$3 = toObject$7;

	// V8 ~ Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	var FORCED = !NATIVE_SYMBOL || fails$4(function () { getOwnPropertySymbolsModule$1.f(1); });

	// `Object.getOwnPropertySymbols` method
	// https://tc39.es/ecma262/#sec-object.getownpropertysymbols
	$$3({ target: 'Object', stat: true, forced: FORCED }, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    var $getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
	    return $getOwnPropertySymbols ? $getOwnPropertySymbols(toObject$3(it)) : [];
	  }
	});

	var defineWellKnownSymbol$j = defineWellKnownSymbol$l;

	// `Symbol.asyncIterator` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.asynciterator
	defineWellKnownSymbol$j('asyncIterator');

	var defineWellKnownSymbol$i = defineWellKnownSymbol$l;

	// `Symbol.hasInstance` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.hasinstance
	defineWellKnownSymbol$i('hasInstance');

	var defineWellKnownSymbol$h = defineWellKnownSymbol$l;

	// `Symbol.isConcatSpreadable` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.isconcatspreadable
	defineWellKnownSymbol$h('isConcatSpreadable');

	var defineWellKnownSymbol$g = defineWellKnownSymbol$l;

	// `Symbol.iterator` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.iterator
	defineWellKnownSymbol$g('iterator');

	var defineWellKnownSymbol$f = defineWellKnownSymbol$l;

	// `Symbol.match` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.match
	defineWellKnownSymbol$f('match');

	var defineWellKnownSymbol$e = defineWellKnownSymbol$l;

	// `Symbol.matchAll` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.matchall
	defineWellKnownSymbol$e('matchAll');

	var defineWellKnownSymbol$d = defineWellKnownSymbol$l;

	// `Symbol.replace` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.replace
	defineWellKnownSymbol$d('replace');

	var defineWellKnownSymbol$c = defineWellKnownSymbol$l;

	// `Symbol.search` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.search
	defineWellKnownSymbol$c('search');

	var defineWellKnownSymbol$b = defineWellKnownSymbol$l;

	// `Symbol.species` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.species
	defineWellKnownSymbol$b('species');

	var defineWellKnownSymbol$a = defineWellKnownSymbol$l;

	// `Symbol.split` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.split
	defineWellKnownSymbol$a('split');

	var defineWellKnownSymbol$9 = defineWellKnownSymbol$l;
	var defineSymbolToPrimitive = symbolDefineToPrimitive;

	// `Symbol.toPrimitive` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.toprimitive
	defineWellKnownSymbol$9('toPrimitive');

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
	defineSymbolToPrimitive();

	var getBuiltIn = getBuiltIn$9;
	var defineWellKnownSymbol$8 = defineWellKnownSymbol$l;
	var setToStringTag$3 = setToStringTag$5;

	// `Symbol.toStringTag` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.tostringtag
	defineWellKnownSymbol$8('toStringTag');

	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag$3(getBuiltIn('Symbol'), 'Symbol');

	var defineWellKnownSymbol$7 = defineWellKnownSymbol$l;

	// `Symbol.unscopables` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.unscopables
	defineWellKnownSymbol$7('unscopables');

	var global$3 = global$w;
	var setToStringTag$2 = setToStringTag$5;

	// JSON[@@toStringTag] property
	// https://tc39.es/ecma262/#sec-json-@@tostringtag
	setToStringTag$2(global$3.JSON, 'JSON', true);

	var path$2 = path$b;

	var symbol$3 = path$2.Symbol;

	var iterators = {};

	var DESCRIPTORS$1 = descriptors;
	var hasOwn$1 = hasOwnProperty_1;

	var FunctionPrototype = Function.prototype;
	// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
	var getDescriptor = DESCRIPTORS$1 && Object.getOwnPropertyDescriptor;

	var EXISTS = hasOwn$1(FunctionPrototype, 'name');
	// additional protection from minified / mangled / dropped function names
	var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
	var CONFIGURABLE = EXISTS && (!DESCRIPTORS$1 || (DESCRIPTORS$1 && getDescriptor(FunctionPrototype, 'name').configurable));

	var functionName = {
	  EXISTS: EXISTS,
	  PROPER: PROPER,
	  CONFIGURABLE: CONFIGURABLE
	};

	var fails$3 = fails$i;

	var correctPrototypeGetter = !fails$3(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  // eslint-disable-next-line es-x/no-object-getprototypeof -- required for testing
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var global$2 = global$w;
	var hasOwn = hasOwnProperty_1;
	var isCallable$1 = isCallable$f;
	var toObject$2 = toObject$7;
	var sharedKey = sharedKey$4;
	var CORRECT_PROTOTYPE_GETTER$1 = correctPrototypeGetter;

	var IE_PROTO = sharedKey('IE_PROTO');
	var Object$1 = global$2.Object;
	var ObjectPrototype = Object$1.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER$1 ? Object$1.getPrototypeOf : function (O) {
	  var object = toObject$2(O);
	  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
	  var constructor = object.constructor;
	  if (isCallable$1(constructor) && object instanceof constructor) {
	    return constructor.prototype;
	  } return object instanceof Object$1 ? ObjectPrototype : null;
	};

	var fails$2 = fails$i;
	var isCallable = isCallable$f;
	var create$1 = objectCreate;
	var getPrototypeOf$7 = objectGetPrototypeOf;
	var defineBuiltIn$1 = defineBuiltIn$4;
	var wellKnownSymbol$2 = wellKnownSymbol$d;

	var ITERATOR$1 = wellKnownSymbol$2('iterator');
	var BUGGY_SAFARI_ITERATORS$1 = false;

	// `%IteratorPrototype%` object
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype$1, PrototypeOfArrayIteratorPrototype, arrayIterator;

	/* eslint-disable es-x/no-array-prototype-keys -- safe */
	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = getPrototypeOf$7(getPrototypeOf$7(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$1 = PrototypeOfArrayIteratorPrototype;
	  }
	}

	var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$1 == undefined || fails$2(function () {
	  var test = {};
	  // FF44- legacy iterators case
	  return IteratorPrototype$1[ITERATOR$1].call(test) !== test;
	});

	if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$1 = {};
	else IteratorPrototype$1 = create$1(IteratorPrototype$1);

	// `%IteratorPrototype%[@@iterator]()` method
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
	if (!isCallable(IteratorPrototype$1[ITERATOR$1])) {
	  defineBuiltIn$1(IteratorPrototype$1, ITERATOR$1, function () {
	    return this;
	  });
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype$1,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
	};

	var IteratorPrototype = iteratorsCore.IteratorPrototype;
	var create = objectCreate;
	var createPropertyDescriptor = createPropertyDescriptor$5;
	var setToStringTag$1 = setToStringTag$5;
	var Iterators$3 = iterators;

	var returnThis$1 = function () { return this; };

	var createIteratorConstructor$1 = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
	  setToStringTag$1(IteratorConstructor, TO_STRING_TAG, false, true);
	  Iterators$3[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var $$2 = _export;
	var call$1 = functionCall;
	var FunctionName = functionName;
	var createIteratorConstructor = createIteratorConstructor$1;
	var getPrototypeOf$6 = objectGetPrototypeOf;
	var setToStringTag = setToStringTag$5;
	var defineBuiltIn = defineBuiltIn$4;
	var wellKnownSymbol$1 = wellKnownSymbol$d;
	var Iterators$2 = iterators;
	var IteratorsCore = iteratorsCore;

	var PROPER_FUNCTION_NAME = FunctionName.PROPER;
	var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR = wellKnownSymbol$1('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis = function () { return this; };

	var defineIterator$2 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
	    switch (KIND) {
	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
	    } return function () { return new IteratorConstructor(this); };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = getPrototypeOf$6(anyNativeIterator.call(new Iterable()));
	    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
	      Iterators$2[TO_STRING_TAG] = returnThis;
	    }
	  }

	  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
	  if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    {
	      INCORRECT_VALUES_NAME = true;
	      defaultIterator = function values() { return call$1(nativeIterator, this); };
	    }
	  }

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else $$2({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
	  }

	  // define iterator
	  if ((FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
	    defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
	  }
	  Iterators$2[NAME] = defaultIterator;

	  return methods;
	};

	var toIndexedObject = toIndexedObject$7;
	var Iterators$1 = iterators;
	var InternalStateModule$1 = internalState;
	objectDefineProperty.f;
	var defineIterator$1 = defineIterator$2;

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$1 = InternalStateModule$1.set;
	var getInternalState$1 = InternalStateModule$1.getterFor(ARRAY_ITERATOR);

	// `Array.prototype.entries` method
	// https://tc39.es/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.es/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.es/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.es/ecma262/#sec-createarrayiterator
	defineIterator$1(Array, 'Array', function (iterated, kind) {
	  setInternalState$1(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState$1(this);
	  var target = state.target;
	  var kind = state.kind;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return { value: undefined, done: true };
	  }
	  if (kind == 'keys') return { value: index, done: false };
	  if (kind == 'values') return { value: target[index], done: false };
	  return { value: [index, target[index]], done: false };
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values%
	// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.es/ecma262/#sec-createmappedargumentsobject
	Iterators$1.Arguments = Iterators$1.Array;

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	var DOMIterables = domIterables;
	var global$1 = global$w;
	var classof = classof$6;
	var createNonEnumerableProperty = createNonEnumerableProperty$5;
	var Iterators = iterators;
	var wellKnownSymbol = wellKnownSymbol$d;

	var TO_STRING_TAG = wellKnownSymbol('toStringTag');

	for (var COLLECTION_NAME in DOMIterables) {
	  var Collection = global$1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  if (CollectionPrototype && classof(CollectionPrototype) !== TO_STRING_TAG) {
	    createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
	  }
	  Iterators[COLLECTION_NAME] = Iterators.Array;
	}

	var parent$9 = symbol$3;


	var symbol$2 = parent$9;

	var parent$8 = symbol$2;

	var symbol$1 = parent$8;

	var defineWellKnownSymbol$6 = defineWellKnownSymbol$l;

	// `Symbol.asyncDispose` well-known symbol
	// https://github.com/tc39/proposal-using-statement
	defineWellKnownSymbol$6('asyncDispose');

	var defineWellKnownSymbol$5 = defineWellKnownSymbol$l;

	// `Symbol.dispose` well-known symbol
	// https://github.com/tc39/proposal-using-statement
	defineWellKnownSymbol$5('dispose');

	var defineWellKnownSymbol$4 = defineWellKnownSymbol$l;

	// `Symbol.matcher` well-known symbol
	// https://github.com/tc39/proposal-pattern-matching
	defineWellKnownSymbol$4('matcher');

	var defineWellKnownSymbol$3 = defineWellKnownSymbol$l;

	// `Symbol.metadata` well-known symbol
	// https://github.com/tc39/proposal-decorators
	defineWellKnownSymbol$3('metadata');

	var defineWellKnownSymbol$2 = defineWellKnownSymbol$l;

	// `Symbol.observable` well-known symbol
	// https://github.com/tc39/proposal-observable
	defineWellKnownSymbol$2('observable');

	// TODO: remove from `core-js@4`
	var defineWellKnownSymbol$1 = defineWellKnownSymbol$l;

	// `Symbol.patternMatch` well-known symbol
	// https://github.com/tc39/proposal-pattern-matching
	defineWellKnownSymbol$1('patternMatch');

	// TODO: remove from `core-js@4`
	var defineWellKnownSymbol = defineWellKnownSymbol$l;

	defineWellKnownSymbol('replaceAll');

	var parent$7 = symbol$1;





	// TODO: Remove from `core-js@4`

	// TODO: Remove from `core-js@4`


	var symbol = parent$7;

	(function (module) {
		module.exports = symbol;
	} (symbol$4));

	(function (module) {
		module.exports = symbol$4.exports;
	} (symbol$5));

	var _Symbol$1 = /*@__PURE__*/getDefaultExportFromCjs(symbol$5.exports);

	var iterator$5 = {exports: {}};

	var iterator$4 = {exports: {}};

	var uncurryThis$1 = functionUncurryThis;
	var toIntegerOrInfinity = toIntegerOrInfinity$3;
	var toString$1 = toString$4;
	var requireObjectCoercible = requireObjectCoercible$3;

	var charAt$1 = uncurryThis$1(''.charAt);
	var charCodeAt = uncurryThis$1(''.charCodeAt);
	var stringSlice = uncurryThis$1(''.slice);

	var createMethod = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = toString$1(requireObjectCoercible($this));
	    var position = toIntegerOrInfinity(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = charCodeAt(S, position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING
	          ? charAt$1(S, position)
	          : first
	        : CONVERT_TO_STRING
	          ? stringSlice(S, position, position + 2)
	          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod(true)
	};

	var charAt = stringMultibyte.charAt;
	var toString = toString$4;
	var InternalStateModule = internalState;
	var defineIterator = defineIterator$2;

	var STRING_ITERATOR = 'String Iterator';
	var setInternalState = InternalStateModule.set;
	var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
	defineIterator(String, 'String', function (iterated) {
	  setInternalState(this, {
	    type: STRING_ITERATOR,
	    string: toString(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return { value: undefined, done: true };
	  point = charAt(string, index);
	  state.index += point.length;
	  return { value: point, done: false };
	});

	var WrappedWellKnownSymbolModule = wellKnownSymbolWrapped;

	var iterator$3 = WrappedWellKnownSymbolModule.f('iterator');

	var parent$6 = iterator$3;


	var iterator$2 = parent$6;

	var parent$5 = iterator$2;

	var iterator$1 = parent$5;

	var parent$4 = iterator$1;

	var iterator = parent$4;

	(function (module) {
		module.exports = iterator;
	} (iterator$4));

	(function (module) {
		module.exports = iterator$4.exports;
	} (iterator$5));

	var _Symbol$iterator = /*@__PURE__*/getDefaultExportFromCjs(iterator$5.exports);

	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  return _typeof = "function" == typeof _Symbol$1 && "symbol" == typeof _Symbol$iterator ? function (obj) {
	    return typeof obj;
	  } : function (obj) {
	    return obj && "function" == typeof _Symbol$1 && obj.constructor === _Symbol$1 && obj !== _Symbol$1.prototype ? "symbol" : typeof obj;
	  }, _typeof(obj);
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (_typeof(call) === "object" || typeof call === "function")) {
	    return call;
	  } else if (call !== void 0) {
	    throw new TypeError("Derived constructors may only return object or undefined");
	  }

	  return _assertThisInitialized(self);
	}

	var getPrototypeOf$5 = {exports: {}};

	var getPrototypeOf$4 = {exports: {}};

	var $$1 = _export;
	var fails$1 = fails$i;
	var toObject$1 = toObject$7;
	var nativeGetPrototypeOf = objectGetPrototypeOf;
	var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

	var FAILS_ON_PRIMITIVES = fails$1(function () { nativeGetPrototypeOf(1); });

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	$$1({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !CORRECT_PROTOTYPE_GETTER }, {
	  getPrototypeOf: function getPrototypeOf(it) {
	    return nativeGetPrototypeOf(toObject$1(it));
	  }
	});

	var path$1 = path$b;

	var getPrototypeOf$3 = path$1.Object.getPrototypeOf;

	var parent$3 = getPrototypeOf$3;

	var getPrototypeOf$2 = parent$3;

	var parent$2 = getPrototypeOf$2;

	var getPrototypeOf$1 = parent$2;

	var parent$1 = getPrototypeOf$1;

	var getPrototypeOf = parent$1;

	(function (module) {
		module.exports = getPrototypeOf;
	} (getPrototypeOf$4));

	(function (module) {
		module.exports = getPrototypeOf$4.exports;
	} (getPrototypeOf$5));

	var _Object$getPrototypeOf = /*@__PURE__*/getDefaultExportFromCjs(getPrototypeOf$5.exports);

	function _getPrototypeOf(o) {
	  var _context;

	  _getPrototypeOf = _Object$setPrototypeOf ? _bindInstanceProperty(_context = _Object$getPrototypeOf).call(_context) : function _getPrototypeOf(o) {
	    return o.__proto__ || _Object$getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	var assign$3 = {exports: {}};

	var DESCRIPTORS = descriptors;
	var uncurryThis = functionUncurryThis;
	var call = functionCall;
	var fails = fails$i;
	var objectKeys = objectKeys$3;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable;
	var toObject = toObject$7;
	var IndexedObject = indexedObject;

	// eslint-disable-next-line es-x/no-object-assign -- safe
	var $assign = Object.assign;
	// eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
	var defineProperty$1 = Object.defineProperty;
	var concat = uncurryThis([].concat);

	// `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	var objectAssign = !$assign || fails(function () {
	  // should have correct order of operations (Edge bug)
	  if (DESCRIPTORS && $assign({ b: 1 }, $assign(defineProperty$1({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty$1(this, 'b', {
	        value: 3,
	        enumerable: false
	      });
	    }
	  }), { b: 2 })).b !== 1) return true;
	  // should work with symbols and should have deterministic property order (V8 bug)
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line es-x/no-symbol -- safe
	  var symbol = Symbol();
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
	  return $assign({}, A)[symbol] != 7 || objectKeys($assign({}, B)).join('') != alphabet;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
	  var T = toObject(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
	  var propertyIsEnumerable = propertyIsEnumerableModule.f;
	  while (argumentsLength > index) {
	    var S = IndexedObject(arguments[index++]);
	    var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!DESCRIPTORS || call(propertyIsEnumerable, S, key)) T[key] = S[key];
	    }
	  } return T;
	} : $assign;

	var $ = _export;
	var assign$2 = objectAssign;

	// `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	// eslint-disable-next-line es-x/no-object-assign -- required for testing
	$({ target: 'Object', stat: true, arity: 2, forced: Object.assign !== assign$2 }, {
	  assign: assign$2
	});

	var path = path$b;

	var assign$1 = path.Object.assign;

	var parent = assign$1;

	var assign = parent;

	(function (module) {
		module.exports = assign;
	} (assign$3));

	var _Object$assign = /*@__PURE__*/getDefaultExportFromCjs(assign$3.exports);

	/******************************************************************************
	Copyright (c) Microsoft Corporation.

	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.

	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */

	function __rest(s, e) {
	    var t = {};
	    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
	        t[p] = s[p];
	    if (s != null && typeof Object.getOwnPropertySymbols === "function")
	        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
	            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
	                t[p[i]] = s[p[i]];
	        }
	    return t;
	}

	var classnames = {exports: {}};

	/*!
	  Copyright (c) 2018 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/

	(function (module) {
		/* global define */

		(function () {

			var hasOwn = {}.hasOwnProperty;

			function classNames() {
				var classes = [];

				for (var i = 0; i < arguments.length; i++) {
					var arg = arguments[i];
					if (!arg) continue;

					var argType = typeof arg;

					if (argType === 'string' || argType === 'number') {
						classes.push(arg);
					} else if (Array.isArray(arg)) {
						if (arg.length) {
							var inner = classNames.apply(null, arg);
							if (inner) {
								classes.push(inner);
							}
						}
					} else if (argType === 'object') {
						if (arg.toString === Object.prototype.toString) {
							for (var key in arg) {
								if (hasOwn.call(arg, key) && arg[key]) {
									classes.push(key);
								}
							}
						} else {
							classes.push(arg.toString());
						}
					}
				}

				return classes.join(' ');
			}

			if (module.exports) {
				classNames.default = classNames;
				module.exports = classNames;
			} else {
				window.classNames = classNames;
			}
		}());
	} (classnames));

	var classNames = classnames.exports;

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */

	function isObject$2(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	var isObject_1 = isObject$2;

	/** Detect free variable `global` from Node.js. */

	var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

	var _freeGlobal = freeGlobal$1;

	var freeGlobal = _freeGlobal;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root$2 = freeGlobal || freeSelf || Function('return this')();

	var _root = root$2;

	var root$1 = _root;

	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	var now$1 = function() {
	  return root$1.Date.now();
	};

	var now_1 = now$1;

	/** Used to match a single whitespace character. */

	var reWhitespace = /\s/;

	/**
	 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
	 * character of `string`.
	 *
	 * @private
	 * @param {string} string The string to inspect.
	 * @returns {number} Returns the index of the last non-whitespace character.
	 */
	function trimmedEndIndex$1(string) {
	  var index = string.length;

	  while (index-- && reWhitespace.test(string.charAt(index))) {}
	  return index;
	}

	var _trimmedEndIndex = trimmedEndIndex$1;

	var trimmedEndIndex = _trimmedEndIndex;

	/** Used to match leading whitespace. */
	var reTrimStart = /^\s+/;

	/**
	 * The base implementation of `_.trim`.
	 *
	 * @private
	 * @param {string} string The string to trim.
	 * @returns {string} Returns the trimmed string.
	 */
	function baseTrim$1(string) {
	  return string
	    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
	    : string;
	}

	var _baseTrim = baseTrim$1;

	var root = _root;

	/** Built-in value references. */
	var Symbol$3 = root.Symbol;

	var _Symbol = Symbol$3;

	var Symbol$2 = _Symbol;

	/** Used for built-in method references. */
	var objectProto$1 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto$1.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString$1 = objectProto$1.toString;

	/** Built-in value references. */
	var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag$1(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag$1),
	      tag = value[symToStringTag$1];

	  try {
	    value[symToStringTag$1] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString$1.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag$1] = tag;
	    } else {
	      delete value[symToStringTag$1];
	    }
	  }
	  return result;
	}

	var _getRawTag = getRawTag$1;

	/** Used for built-in method references. */

	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString$1(value) {
	  return nativeObjectToString.call(value);
	}

	var _objectToString = objectToString$1;

	var Symbol$1 = _Symbol,
	    getRawTag = _getRawTag,
	    objectToString = _objectToString;

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag$1(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag && symToStringTag in Object(value))
	    ? getRawTag(value)
	    : objectToString(value);
	}

	var _baseGetTag = baseGetTag$1;

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */

	function isObjectLike$1(value) {
	  return value != null && typeof value == 'object';
	}

	var isObjectLike_1 = isObjectLike$1;

	var baseGetTag = _baseGetTag,
	    isObjectLike = isObjectLike_1;

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol$1(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && baseGetTag(value) == symbolTag);
	}

	var isSymbol_1 = isSymbol$1;

	var baseTrim = _baseTrim,
	    isObject$1 = isObject_1,
	    isSymbol = isSymbol_1;

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber$1(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject$1(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject$1(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = baseTrim(value);
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	var toNumber_1 = toNumber$1;

	var isObject = isObject_1,
	    now = now_1,
	    toNumber = toNumber_1;

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;

	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = toNumber(wait) || 0;
	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }

	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;

	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }

	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }

	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        timeWaiting = wait - timeSinceLastCall;

	    return maxing
	      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
	      : timeWaiting;
	  }

	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;

	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	  }

	  function timerExpired() {
	    var time = now();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }

	  function trailingEdge(time) {
	    timerId = undefined;

	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }

	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }
	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }

	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }

	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);

	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;

	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        clearTimeout(timerId);
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}

	var debounce_1 = debounce;

	var omit$1 = {};

	var interopRequireDefault = {exports: {}};

	(function (module) {
		function _interopRequireDefault(obj) {
		  return obj && obj.__esModule ? obj : {
		    "default": obj
		  };
		}

		module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
	} (interopRequireDefault));

	var objectSpread2 = {exports: {}};

	var defineProperty = {exports: {}};

	var hasRequiredDefineProperty;

	function requireDefineProperty () {
		if (hasRequiredDefineProperty) return defineProperty.exports;
		hasRequiredDefineProperty = 1;
		(function (module) {
			function _defineProperty(obj, key, value) {
			  if (key in obj) {
			    Object.defineProperty(obj, key, {
			      value: value,
			      enumerable: true,
			      configurable: true,
			      writable: true
			    });
			  } else {
			    obj[key] = value;
			  }

			  return obj;
			}

			module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;
	} (defineProperty));
		return defineProperty.exports;
	}

	var hasRequiredObjectSpread2;

	function requireObjectSpread2 () {
		if (hasRequiredObjectSpread2) return objectSpread2.exports;
		hasRequiredObjectSpread2 = 1;
		(function (module) {
			var defineProperty = requireDefineProperty();

			function ownKeys(object, enumerableOnly) {
			  var keys = Object.keys(object);

			  if (Object.getOwnPropertySymbols) {
			    var symbols = Object.getOwnPropertySymbols(object);
			    enumerableOnly && (symbols = symbols.filter(function (sym) {
			      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
			    })), keys.push.apply(keys, symbols);
			  }

			  return keys;
			}

			function _objectSpread2(target) {
			  for (var i = 1; i < arguments.length; i++) {
			    var source = null != arguments[i] ? arguments[i] : {};
			    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
			      defineProperty(target, key, source[key]);
			    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
			      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
			    });
			  }

			  return target;
			}

			module.exports = _objectSpread2, module.exports.__esModule = true, module.exports["default"] = module.exports;
	} (objectSpread2));
		return objectSpread2.exports;
	}

	var _interopRequireDefault = interopRequireDefault.exports;

	Object.defineProperty(omit$1, "__esModule", {
	  value: true
	});
	var _default = omit$1.default = omit;

	var _objectSpread2 = _interopRequireDefault(requireObjectSpread2());

	function omit(obj, fields) {
	  var clone = (0, _objectSpread2.default)({}, obj);

	  if (Array.isArray(fields)) {
	    fields.forEach(function (key) {
	      delete clone[key];
	    });
	  }

	  return clone;
	}

	var tuple = function tuple() {
	  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return args;
	};
	var isValidElement = React__default["default"].isValidElement;
	function replaceElement(element, replacement, props) {
	  if (!isValidElement(element)) return replacement;
	  return /*#__PURE__*/React__default["default"].cloneElement(element, typeof props === 'function' ? props(element.props || {}) : props);
	}
	function cloneElement(element, props) {
	  return replaceElement(element, element, props);
	}

	function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
	var SpinPrefixCls = 'ant-spin';
	tuple('small', 'default', 'large'); // Render indicator

	var defaultIndicator = null;

	function renderIndicator(prefixCls, props) {
	  var indicator = props.indicator;
	  var dotClassName = "".concat(prefixCls, "-dot"); // 如果indicator为空，则不渲染

	  if (indicator === null) {
	    return null;
	  } // 给自定义指示器添加类名，如果自定义indicator合法则使用


	  if (isValidElement(indicator)) {
	    return cloneElement(indicator, {
	      className: classNames(indicator.props.className, dotClassName)
	    });
	  } // 如果自定义indicator不合法，则用默认的


	  if (isValidElement(defaultIndicator)) {
	    return cloneElement(defaultIndicator, {
	      className: classNames(defaultIndicator.props.className, dotClassName)
	    });
	  }

	  return /*#__PURE__*/React__default["default"].createElement("span", {
	    className: classNames(dotClassName, "".concat(prefixCls, "-dot-spin"))
	  }, /*#__PURE__*/React__default["default"].createElement("i", {
	    className: "".concat(prefixCls, "-dot-item")
	  }), /*#__PURE__*/React__default["default"].createElement("i", {
	    className: "".concat(prefixCls, "-dot-item")
	  }), /*#__PURE__*/React__default["default"].createElement("i", {
	    className: "".concat(prefixCls, "-dot-item")
	  }), /*#__PURE__*/React__default["default"].createElement("i", {
	    className: "".concat(prefixCls, "-dot-item")
	  }));
	}

	function shouldDelay(spinning, delay) {
	  return !!spinning && !!delay && !isNaN(Number(delay));
	}

	var SpinCC = /*#__PURE__*/function (_React$Component) {
	  _inherits(SpinCC, _React$Component);

	  var _super = _createSuper(SpinCC);

	  function SpinCC(props) {
	    var _this;

	    _classCallCheck(this, SpinCC);

	    _this = _super.call(this, props);

	    _this.debouncifyUpdateSpinning = function (props) {
	      var _ref = props || _this.props,
	          delay = _ref.delay;

	      if (delay) {
	        _this.cancelExistingSpin();

	        _this.updateSpinning = debounce_1(_this.originalUpdateSpinning, delay);
	      }
	    };

	    _this.updateSpinning = function () {
	      var spinning = _this.props.spinning;
	      var currentSpinning = _this.state.spinning;

	      if (currentSpinning !== spinning) {
	        _this.setState({
	          spinning: spinning
	        });
	      }
	    };

	    _this.renderSpin = function (prefixCls) {
	      var _classNames;

	      var _a = _this.props,
	          className = _a.className,
	          size = _a.size,
	          tip = _a.tip,
	          wrapperClassName = _a.wrapperClassName,
	          style = _a.style,
	          direction = _a.direction,
	          restProps = __rest(_a, ["className", "size", "tip", "wrapperClassName", "style", "direction"]);

	      var spinning = _this.state.spinning;
	      var spinClassName = classNames(prefixCls, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-sm"), size === 'small'), _defineProperty(_classNames, "".concat(prefixCls, "-lg"), size === 'large'), _defineProperty(_classNames, "".concat(prefixCls, "-spinning"), spinning), _defineProperty(_classNames, "".concat(prefixCls, "-show-text"), !!tip), _defineProperty(_classNames, "".concat(prefixCls, "-rtl"), direction === 'rtl'), _classNames), className); // fix https://fb.me/react-unknown-prop

	      var divProps = _default(restProps, ['spinning', 'delay', 'indicator']);
	      var spinElement = /*#__PURE__*/React__default["default"].createElement("div", _Object$assign({}, divProps, {
	        style: style,
	        className: spinClassName,
	        "aria-live": "polite",
	        "aria-busy": spinning
	      }), renderIndicator(prefixCls, _this.props), tip ? /*#__PURE__*/React__default["default"].createElement("div", {
	        className: "".concat(prefixCls, "-text")
	      }, tip) : null);

	      if (_this.isNestedPattern()) {
	        var containerClassName = classNames("".concat(prefixCls, "-container"), _defineProperty({}, "".concat(prefixCls, "-blur"), spinning));
	        return /*#__PURE__*/React__default["default"].createElement("div", _Object$assign({}, divProps, {
	          className: classNames("".concat(prefixCls, "-nested-loading"), wrapperClassName)
	        }), spinning && /*#__PURE__*/React__default["default"].createElement("div", {
	          key: "loading"
	        }, spinElement), /*#__PURE__*/React__default["default"].createElement("div", {
	          className: containerClassName,
	          key: "container"
	        }, _this.props.children));
	      }

	      return spinElement;
	    };

	    var spinning = props.spinning,
	        delay = props.delay;
	    var shouldBeDelayed = shouldDelay(spinning, delay);
	    _this.state = {
	      spinning: spinning && !shouldBeDelayed
	    };
	    _this.originalUpdateSpinning = _this.updateSpinning;

	    _this.debouncifyUpdateSpinning(props);

	    return _this;
	  }

	  _createClass(SpinCC, [{
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      this.updateSpinning();
	    }
	  }, {
	    key: "componentDidUpdate",
	    value: function componentDidUpdate() {
	      this.debouncifyUpdateSpinning();
	      this.updateSpinning();
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      this.cancelExistingSpin();
	    }
	  }, {
	    key: "cancelExistingSpin",
	    value: function cancelExistingSpin() {
	      var updateSpinning = this.updateSpinning;

	      if (updateSpinning && updateSpinning.cancel) {
	        updateSpinning.cancel();
	      }
	    }
	  }, {
	    key: "isNestedPattern",
	    value: function isNestedPattern() {
	      return !!(this.props && typeof this.props.children !== 'undefined');
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return this.renderSpin(SpinPrefixCls);
	    }
	  }]);

	  return SpinCC;
	}(React__default["default"].Component);

	SpinCC.setDefaultIndicator = function (indicator) {
	  defaultIndicator = indicator;
	};

	var Spin = function Spin(props) {
	  return /*#__PURE__*/React__default["default"].createElement(SpinCC, _Object$assign({}, props));
	};

	Spin.setDefaultIndicator = function (indicator) {
	  defaultIndicator = indicator;
	};

	exports.Spin = Spin;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
