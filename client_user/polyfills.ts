
// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!(Array.prototype as any).find) {
	Object.defineProperty(Array.prototype, 'find', {
		value(predicate: any) {
			// 1. Let O be ? ToObject(this value).
			if (this == null) {
				throw new TypeError('"this" is null or not defined');
			}

			const o = Object(this);

			// 2. Let len be ? ToLength(? Get(O, "length")).
			const len = o.length >>> 0;

			// 3. If IsCallable(predicate) is false, throw a TypeError exception.
			if (typeof predicate !== 'function') {
				throw new TypeError('predicate must be a function');
			}

			// 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
			const thisArg = arguments[1];

			// 5. Let k be 0.
			let k = 0;

			// 6. Repeat, while k < len
			while (k < len) {
				// a. Let Pk be ! ToString(k).
				// b. Let kValue be ? Get(O, Pk).
				// c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
				// d. If testResult is true, return kValue.
				const kValue = o[k];
				if (predicate.call(thisArg, kValue, k, o)) {
					return kValue;
				}
				// e. Increase k by 1.
				k++;
			}

			// 7. Return undefined.
			return undefined;
		},
		configurable: true,
		writable: true
	});
}


// from:https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md
[Element.prototype, CharacterData.prototype, DocumentType.prototype].forEach(item => {
	if (item.hasOwnProperty('remove')) {
		return;
	}
	Object.defineProperty(item, 'remove', {
		configurable: true,
		enumerable: true,
		writable: true,
		value: function remove() {
			if (this.parentNode)
				this.parentNode.removeChild(this);
		}
	});
});


if (!Math.trunc) {
	Math.trunc = v => {
		v = +v;
		return !isFinite(v) ? v :
			(v - v % 1) || (v < 0 ? -0 : v === 0 ? v : 0);
	};
}


if (!Math.log10)
	Math.log10 = x => Math.log(x) * Math.LOG10E;
