//import * as React from "./react";

function pad(num: number | string, size: number) { let s = num + ""; while (s.length < size) s = "0" + s; return s; }
function formatDate(d: Date) { return `${d.getDate()}. ${d.getMonth() + 1}. ${d.getFullYear()} ${d.getHours()}:${pad(d.getMinutes(), 2)}:${pad(d.getSeconds(), 2)} (UTC+${-d.getTimezoneOffset() / 60})`; }
function linInp(x: number, x1From: number, x1To: number, x2From: number, x2To: number) { return (x - x1From) / (x1To - x1From) * (x2To - x2From) + x2From; }
function nextDay1(d: Date, step: number) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + step); }




function setAttr(element: Element, attrs: { [k: string]: string | number | React.CSSProperties }) {
	Object.keys(attrs).forEach(k => {
		const v = attrs[k];
		//if (element.hasAttribute(k) && typeof v === "string")
		//	element.setAttribute(k, v);
		//else
		if (!(k in element))
			console.error(`${k} is not a valid property name, <${element.tagName} ${k}={${v}}>`);
		else if (typeof v === "string")
			element[k] = v;
		else if (typeof v === "number")
			element[k] = v.toString();
		else if (v === null)
			console.error(`${v} is not a valid property value, <${element.tagName} ${k}={${v}}>`);
		else if (typeof v === "object")
			Object.keys(v).forEach(k2 => {
				if (k2 in element[k])
					element[k][k2] = v[k2];
				else
					console.error(`${k2} is not a valid ${k}, <${element.tagName} ${k}={{ ${k2}: ... }}>`);
			});
		else if (typeof v === "boolean" && typeof element[k] === "boolean")
			element[k] = v;
		else if (typeof v === "function" && ["onclick", "onchange", "ontouchstart", "ontouchend", "onkeypress",].indexOf(k) !== -1)
			element[k] = v;
		else
			console.error(`${v} is not a valid property value, <${element.tagName} ${k}={${v}}>`, v);
	});
}
function setStyle(element: HTMLElement, styles: React.CSSProperties) {
	setAttr(element, { style: styles });
}
function setAttrSvg(element: SVGElement, attrs: { [k: string]: string | number | React.CSSProperties }) {
	Object.keys(attrs).forEach(k => {
		const v = attrs[k];
		//if (!(k in element))
		//	console.error(`${k} is not a valid property of a <${element.tagName}>`);
		//else
		if (typeof v === "string")
			element.setAttribute(k, v);
		else if (typeof v === "number")
			element.setAttribute(k, v.toString());
		else if (v === null)
			console.error(`${v} is not a valid property value, <${element.tagName} ${k}={${v}}>`);
		else if (typeof v === "object")
			Object.keys(v).forEach(k2 => {
				if (k2 in element[k])
					element[k][k2] = v[k2];
				else
					console.error(`${k2} is not a valid ${k}, <${element.tagName} ${k}={{ ${k2}: ... }}>`);
			});
		//else if (typeof v === "boolean" && typeof element[k] === "boolean")
		//	element[k] = v;
		//else if (typeof v === "function" && k === "onclick")
		//	element[k] = v;
		else
			console.error(`${v} is not a valid property value, <${element.tagName} ${k}={${v}}>`, v);
	});
}


type TChild = string | number | Node | TChild[];
function ac<T extends Element>(element: T, ...children: TChild[]) {
	children.forEach(c => {
		if (typeof c === "string")
			element.appendChild(document.createTextNode(c));
		else if (typeof c === "number")
			element.appendChild(document.createTextNode(c.toString()));
		else if (c instanceof Node)
			element.appendChild(c);
		else if (c instanceof Array)
			ac(element, ...c);
		else
			console.error(`${c} is not a valid child, <${element.tagName}>{${c}}</${element.tagName}>`, c);
	});
	return element;
}


function myCreateElement<T extends keyof ElementTagNameMap/*, U*/>(tag: T/* | ((props: any) => U)*/, attrs: { [k: string]: string | number | React.CSSProperties } | null, ...children: TChild[]) {
	//if (typeof tag === "function")
	//	return tag({ ...attrs, children });
	if (["svg", "path", "circle", "rect", "polyline", "text", "g", "clipPath", "defs",].indexOf(tag) >= 0) {
		const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
		if (attrs !== null)
			setAttrSvg(element, attrs);
		return ac(element, ...children);
	} else {
		const element = document.createElement(tag);
		if (attrs !== null)
			setAttr(element, attrs);
		return ac(element, ...children);
	}
}





type Func<A1, Ret> = (a: A1) => Ret;
function toDictionary<T, TKey extends keyof any, TValue>(arr: T[], keySelector: Func<T, TKey>, valueSelector: Func<T, TValue>) {
	const ret: Record<TKey, TValue> = {} as Record<TKey, TValue>;
	arr.forEach(p => ret[keySelector(p)] = valueSelector(p));
	return ret;
}


function range(n: number) { return Array.from(Array(n).keys()); }



function setTimeoutA(ms: number): Promise<void> {
	return new Promise((resolve, reject) => setTimeout(resolve, ms));
}
