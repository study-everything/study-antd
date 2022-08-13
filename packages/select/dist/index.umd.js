(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["@study/select"] = {}));
})(this, (function (exports) { 'use strict';

	const Select = () => `<div>Select</div>`;

	exports.Select = Select;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
