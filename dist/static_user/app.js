"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        value(predicate) {
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
//import * as React from "./react";
function pad(num, size) { let s = num + ""; while (s.length < size)
    s = "0" + s; return s; }
function formatDate(d) { return `${d.getDate()}. ${d.getMonth() + 1}. ${d.getFullYear()} ${d.getHours()}:${pad(d.getMinutes(), 2)}:${pad(d.getSeconds(), 2)} (UTC+${-d.getTimezoneOffset() / 60})`; }
function linInp(x, x1From, x1To, x2From, x2To) { return (x - x1From) / (x1To - x1From) * (x2To - x2From) + x2From; }
function nextDay1(d, step) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + step); }
function setAttr(element, attrs) {
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
function setStyle(element, styles) {
    setAttr(element, { style: styles });
}
function setAttrSvg(element, attrs) {
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
function ac(element, ...children) {
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
function myCreateElement(tag /* | ((props: any) => U)*/, attrs, ...children) {
    //if (typeof tag === "function")
    //	return tag({ ...attrs, children });
    if (["svg", "path", "circle", "rect", "polyline", "text", "g", "clipPath", "defs",].indexOf(tag) >= 0) {
        const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
        if (attrs !== null)
            setAttrSvg(element, attrs);
        return ac(element, ...children);
    }
    else {
        const element = document.createElement(tag);
        if (attrs !== null)
            setAttr(element, attrs);
        return ac(element, ...children);
    }
}
function toDictionary(arr, keySelector, valueSelector) {
    const ret = {};
    arr.forEach(p => ret[keySelector(p)] = valueSelector(p));
    return ret;
}
function range(n) { return Array.from(Array(n).keys()); }
function setTimeoutA(ms) {
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
}
/*
    goals: fisheye projection, config similar to betaflight, scene without borders, low hw requirements, crosshair in osd, draw own horizon in osd, allow control also with keyboard/mouse


    https://github.com/shaunlebron/blinky (?)

    lights, textures, shadows, https://webgl2fundamentals.org, https://developer.download.nvidia.com/CgTutorial/cg_tutorial_chapter07.html, https://google.github.io/filament/Filament.html
        https://www.pixijs.com/, https://unity.com
    fisheye, https://github.com/shaunlebron/blinky, https://pvdz.ee/weblog/340
        https://en.wikipedia.org/wiki/3D_projection, https://en.wikipedia.org/wiki/Curvilinear_perspective, https://en.wikipedia.org/wiki/Fisheye_lens



    repo on github
    2. channel (pitch) is noisy after connectiong my rc with usb (it's ok with FeiYing). can it be corrected with some filter? what filter is in betaflight (if any)?
    map/scene
    collisions
    physics (random gusts of wind; spark chart for position, velocity, inputs)
    gamepad: channel assignments, calibration, selection when multiple gamepads (gamepad.index)
    matrix normalization (how much is it denormalizing with time?)
    icon, own radiobutton (it does not click when mouse moves), save settings in url
    angle, horizon, (acro), 3d
    control with mouse (?)
    load parameters from betaflight export


            vertex									fragment
inputs
            attributes (pulled from buffers)		varyings (interpolated data from vertex shader)
            uniforms (same for all vertices)		uniforms (same for all pixels)
            textures								textures
outputs
            gl_Position								outColor (for frameBuffer or renderBuffer)
            [varyings]
*/
/// <reference path="twgl-full.d.ts" />
/// <reference path="csstype.d.ts" />
/// <reference path="react.d.ts" />
/// <reference path="polyfills.ts" />
/// <reference path="tools.tsx" />
main();
function main() {
    let canvas;
    let osd;
    let divFps;
    let divSticks;
    let inputControlRC;
    let inputControlGamepad;
    let inputControlKb;
    let inputControlDuke;
    let spanCameraAngle;
    let inputCameraAngle;
    let spanFov;
    let inputFov;
    const spanPosition = [];
    const spanVelocity = [];
    const spanLRxy = [];
    ac(document.body, myCreateElement("div", null,
        myCreateElement("div", { style: { position: "relative", } },
            canvas = myCreateElement("canvas", { width: "640", height: "480", style: { border: "1px solid #ccc", } }),
            osd = myCreateElement("canvas", { width: "640", height: "480", style: { border: "1px solid #ccc", position: "absolute", left: "0px", top: "0px", } })),
        myCreateElement("div", { style: { position: "relative", height: "60px", } },
            divFps = myCreateElement("div", { style: { position: "absolute", left: "0px", top: "0px", } }),
            divSticks = myCreateElement("div", { style: { position: "absolute", left: "100px", top: "0px", } })),
        myCreateElement("div", null,
            "control:",
            myCreateElement("label", { style: { marginRight: "5px", } },
                inputControlRC = myCreateElement("input", { type: "radio", name: "control", checked: true }),
                "RC"),
            myCreateElement("label", { style: { marginRight: "5px", } },
                inputControlGamepad = myCreateElement("input", { type: "radio", name: "control" }),
                "Gamepad"),
            myCreateElement("label", { style: { marginRight: "5px", } },
                inputControlKb = myCreateElement("input", { type: "radio", name: "control" }),
                "Keyboard (left stick: wasd, right stick: arrows)"),
            myCreateElement("label", { style: { marginRight: "5px", display: "none", } },
                inputControlDuke = myCreateElement("input", { type: "radio", name: "control" }),
                "Duke (wasd, ctrl, space, arrows)"),
            myCreateElement("br", null),
            myCreateElement("label", { style: { marginLeft: "53px", marginRight: "5px", } },
                myCreateElement("input", { type: "radio", name: "mode", checked: true }),
                "Mode 2")),
        myCreateElement("table", { style: { borderCollapse: "collapse", } },
            myCreateElement("tr", null,
                myCreateElement("td", null, "camera:"),
                myCreateElement("td", null,
                    "angle: ",
                    spanCameraAngle = myCreateElement("span", { style: { display: "inline-block", width: "20px", } }),
                    " ",
                    inputCameraAngle = myCreateElement("input", { type: "range", min: "0", max: "90", value: "30", style: { width: "300px", height: "15px", verticalAlign: "middle", } }))),
            myCreateElement("tr", null,
                myCreateElement("td", null),
                myCreateElement("td", null,
                    "fov: ",
                    spanFov = myCreateElement("span", { style: { display: "inline-block", width: "37px", } }),
                    " ",
                    inputFov = myCreateElement("input", { type: "range", min: "0", max: "360", value: "120", style: { width: "300px", height: "15px", verticalAlign: "middle", } }),
                    myCreateElement("span", { className: "userSelectNone", style: { color: "#888", marginLeft: "10px", cursor: "pointer", }, onclick: () => { inputFov.value = inputFov.max = `${+inputFov.max * 2}`; fillFov(); } }, "(more)")))),
        myCreateElement("div", null,
            "position [m] x: ",
            spanPosition[0] = myCreateElement("span", null),
            ", y: ",
            spanPosition[1] = myCreateElement("span", null),
            ", z: ",
            spanPosition[2] = myCreateElement("span", null)),
        myCreateElement("div", null,
            "velocity [km/h] x: ",
            spanVelocity[0] = myCreateElement("span", null),
            ", y: ",
            spanVelocity[1] = myCreateElement("span", null),
            ", z: ",
            spanVelocity[2] = myCreateElement("span", null)),
        myCreateElement("div", null,
            "lx: ",
            spanLRxy[0] = myCreateElement("span", null),
            ", ly: ",
            spanLRxy[1] = myCreateElement("span", null),
            ", rx: ",
            spanLRxy[2] = myCreateElement("span", null),
            ", ry: ",
            spanLRxy[3] = myCreateElement("span", null))));
    drawOsd(osd);
    const fps = createFps(divFps);
    const stickL = createStick(false);
    const stickR = createStick(true);
    const gamepadMgr = createGamepadManager();
    ac(divSticks, stickL.svg, myCreateElement("span", { style: { display: "inline-block", width: "10px", } }), stickR.svg);
    fillCameraAngle();
    inputCameraAngle.oninput = fillCameraAngle;
    function fillCameraAngle() { spanCameraAngle.innerText = `${Math.round(getCameraAngle())}`; }
    function getCameraAngle() { return +inputCameraAngle.value; }
    fillFov();
    inputFov.oninput = fillFov;
    function fillFov() { spanFov.innerText = `${Math.round(getFov())}`; }
    function getFov() { return +inputFov.value; }
    const helper = createWebGLHelper(canvas);
    const gl = helper.gl;
    const envmapVertexShaderSource = `#version 300 es
				uniform mat4 u_worldViewProjection;
				uniform vec3 u_lightWorldPos;
				uniform mat4 u_world;
				uniform mat4 u_viewInverse;
				uniform mat4 u_worldInverseTranspose;
				in vec4 a_position;
				in vec3 a_normal;
				in vec2 a_texcoord;
				out vec4 v_position;
				out vec2 v_texCoord;
				out vec3 v_normal;
				out vec3 v_surfaceToLight;
				out vec3 v_surfaceToView;
				void main() {
					v_texCoord = a_texcoord;
					v_position = u_worldViewProjection * a_position;
					v_normal = (u_worldInverseTranspose * vec4(a_normal, 0)).xyz;
					v_surfaceToLight = u_lightWorldPos - (u_world * a_position).xyz;
					v_surfaceToView = (u_viewInverse[3] - u_world * a_position).xyz;
					gl_Position = v_position;
				}
			`;
    const envmapFragmentShaderSource = `#version 300 es
				precision highp float;
				in vec4 v_position;
				in vec2 v_texCoord;
				in vec3 v_normal;
				in vec3 v_surfaceToLight;
				in vec3 v_surfaceToView;
				uniform vec4 u_lightColor;
				uniform vec4 u_colorMult;
				uniform sampler2D u_diffuse;
				uniform vec4 u_specular;
				uniform float u_shininess;
				uniform float u_specularFactor;
				out vec4 outColor;
				vec4 lit(float l ,float h, float m) {
					return vec4(1.0, abs(l), l > 0.0 ? pow(max(0.0, h), m) : 0.0, 1.0);
				}
				void main() {
					vec4 diffuseColor = texture(u_diffuse, v_texCoord);
					vec3 a_normal = normalize(v_normal);
					vec3 surfaceToLight = normalize(v_surfaceToLight);
					vec3 surfaceToView = normalize(v_surfaceToView);
					vec3 halfVector = normalize(surfaceToLight + surfaceToView);
					vec4 litR = lit(dot(a_normal, surfaceToLight),
					dot(a_normal, halfVector), u_shininess);
					//outColor = vec4((u_lightColor * (diffuseColor * litR.y * u_colorMult + u_specular * litR.z * u_specularFactor)).rgb, diffuseColor.a);
					vec3 ambientColor = diffuseColor.rgb * 0.2;
					outColor = vec4((u_lightColor * (diffuseColor * litR.y * u_colorMult + u_specular * litR.z * u_specularFactor)).rgb + ambientColor, diffuseColor.a);
				}
			`;
    const envData = twgl.primitives.createSphereVertices(10, 48, 24);
    const auxProgram = helper.createProgram(envmapVertexShaderSource, envmapFragmentShaderSource, [
        { attributeName: "a_position", bufferData: envData.position, indexBufferData: envData.indices, onePointSize: 3, normalize: false, },
        { attributeName: "a_normal", bufferData: envData.normal, onePointSize: 3, normalize: false, },
        { attributeName: "a_texcoord", bufferData: envData.texcoord, onePointSize: 2, normalize: false, },
    ]);
    const u_viewInverse = auxProgram.getUniformLocation("u_viewInverse");
    const u_lightWorldPos = auxProgram.getUniformLocation("u_lightWorldPos");
    const u_lightColor = auxProgram.getUniformLocation("u_lightColor");
    const u_world = auxProgram.getUniformLocation("u_world");
    const u_worldViewProjection = auxProgram.getUniformLocation("u_worldViewProjection");
    const u_worldInverseTranspose = auxProgram.getUniformLocation("u_worldInverseTranspose");
    const u_colorMult = auxProgram.getUniformLocation("u_colorMult");
    const u_diffuse = auxProgram.getUniformLocation("u_diffuse");
    const u_specular = auxProgram.getUniformLocation("u_specular");
    const u_shininess = auxProgram.getUniformLocation("u_shininess");
    const u_specularFactor = auxProgram.getUniformLocation("u_specularFactor");
    const planeData = twgl.primitives.createPlaneVertices(2000, 2000);
    planeData.texcoord.forEach((v, i) => planeData.texcoord[i] *= 1000);
    const planeVAO = auxProgram.createVAO([
        { bufferData: planeData.position, indexBufferData: planeData.indices, onePointSize: 3, normalize: false, },
        { bufferData: planeData.normal, onePointSize: 3, normalize: false, },
        { bufferData: planeData.texcoord, onePointSize: 2, normalize: false, },
    ]);
    // make a 8x8 checkerboard texture
    const checkerboardTexture = helper.createAndBindTexture();
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, 2, 2, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, new Uint8Array([0xFF, 0xCC, 0xCC, 0xFF,]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    function degToRad(d) {
        return d * Math.PI / 180;
    }
    let seed = 1;
    function myRandom() {
        //return Math.random();
        return (Math.sin(seed++) + 1) * 10000 % 1;
    }
    function rand(min, max) {
        if (max === undefined)
            [min, max] = [0, min,];
        return min + myRandom() * (max - min);
    }
    function randInt(range) {
        return Math.floor(myRandom() * range);
    }
    const textures = [
        textureUtils.makeStripeTexture(gl, { color1: "#FFF", color2: "#CCC", }),
        textureUtils.makeCheckerTexture(gl, { color1: "#FFF", color2: "#CCC", }),
        textureUtils.makeCircleTexture(gl, { color1: "#FFF", color2: "#CCC", }),
    ];
    const numObjects = 30;
    const baseColor = rand(240);
    const objects = range(numObjects).map(ii => {
        return {
            radius: rand(150),
            xRotation: rand(Math.PI * 2),
            yRotation: rand(Math.PI),
            materialUniforms: {
                u_colorMult: chroma.hsv(rand(baseColor, baseColor + 120), 0.5, 1).gl(),
                u_diffuse: textures[randInt(textures.length)],
                u_specular: [1, 1, 1, 1],
                u_shininess: rand(500),
                u_specularFactor: rand(1),
            },
        };
    });
    const skyboxVertexShaderSource = `#version 300 es
				in vec4 a_position;
				out vec4 v_position;
				void main() {
					v_position = a_position;
					gl_Position = vec4(a_position.xy, 1, 1);
				}
				`;
    const skyboxFragmentShaderSource = `#version 300 es
				#define PI 3.14159265359
				precision highp float;
				uniform samplerCube u_skybox;
				uniform float u_aspect;
				uniform float u_fov;
				in vec4 v_position;
				out vec4 outColor;	// we need to declare an output for the fragment shader
				void main() {
					vec2 a = vec2(v_position.x, v_position.y / u_aspect);
					//vec2 a = vec2(v_position.x * u_aspect, v_position.y);
					float len = length(a.xy);// + 0.0001;
					float len2 = len * u_fov / 2.;
					float roll = PI / 2. - (a.x > 0. ? asin(a.y / len) : PI - asin(a.y / len));
					outColor = texture(u_skybox, vec3(sin(len2) * sin(roll), sin(len2) * cos(roll), -cos(len2)), 0.);
				}
				`;
    const skyData = twgl.primitives.createXYQuadVertices();
    const auxProgramSky = helper.createProgram(skyboxVertexShaderSource, skyboxFragmentShaderSource, [
        { attributeName: "a_position", bufferData: new Float32Array(skyData.position.data), indexBufferData: new Uint16Array(skyData.indices), onePointSize: 2, normalize: false, },
    ]);
    const u_skybox = auxProgramSky.getUniformLocation("u_skybox");
    const u_aspect = auxProgramSky.getUniformLocation("u_aspect");
    const u_fov = auxProgramSky.getUniformLocation("u_fov");
    // Create a texture to render to
    const targetTextureWH = 1024;
    const targetTexture = helper.createAndBindTexture(gl.TEXTURE_CUBE_MAP);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    range(6).forEach(i => gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl.RGBA, targetTextureWH, targetTextureWH, 0, gl.RGBA, gl.UNSIGNED_BYTE, null));
    const fbs = range(6).map(i => {
        // Create framebuffer
        const inscatterFrameBuffers_i = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, inscatterFrameBuffers_i);
        // Create and attach depth buffer
        const inscatterDepthBuffers_i = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, inscatterDepthBuffers_i);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, targetTextureWH, targetTextureWH);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, inscatterDepthBuffers_i);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        // Attach one face of cube map
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, targetTexture, 0);
        const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        if (status !== gl.FRAMEBUFFER_COMPLETE)
            console.warn("Inscatter frame buffer, " + i + ", is not complete: " + helper.glEnumToString(status));
        return { fb: inscatterFrameBuffers_i, depth: inscatterDepthBuffers_i, };
    });
    //canvas.tabIndex = 0;
    //canvas.classList.add("showFocus");
    //canvas.focus();
    //canvas.addEventListener("focus", () => console.log("got focus"));
    //canvas.addEventListener("blur", () => console.log("lost focus"));
    const keys = { KeyA: false, KeyS: false, KeyD: false, KeyW: false, ArrowLeft: false, ArrowRight: false, ArrowUp: false, ArrowDown: false, ControlLeft: false, Space: false, };
    document.addEventListener("keydown", e => {
        keys[e.code] = true;
        //console.log(e.code);
        if (!(e.ctrlKey && (e.code === "KeyR" || e.code === "Numpad0" || e.code === "NumpadAdd" || e.code === "NumpadSubtract") || e.code === "F12"))
            e.preventDefault();
    });
    document.addEventListener("keyup", e => keys[e.code] = false);
    const droneMatrix = twgl.m4.lookAt([0, 10, 200], [0, 10, 0], [0, 1, 0]);
    const cameraVelocity = twgl.v3.create();
    const worldViewProjection = twgl.m4.identity();
    const worldInverseTranspose = twgl.m4.identity();
    requestAnimationFrame(drawScene);
    // Draw the scene.
    let lastTime = NaN;
    let lastInputControlDuke_checked = false;
    function drawScene(time) {
        fps.inc();
        const timeDelta_s = isNaN(lastTime) ? 0 : (time - lastTime) * 0.001;
        const stepTrans = timeDelta_s * 100;
        const stepRot = timeDelta_s * Math.PI * 0.5;
        lastTime = time;
        if (inputControlDuke.checked) {
            // https://stackoverflow.com/questions/25207293/rotating-a-group-of-vectors/25216549#25216549
            function addToTranslation(m, v) { m[12] += v[0]; m[13] += v[1]; m[14] += v[2]; }
            if (!lastInputControlDuke_checked) {
                const v2 = twgl.m4.getAxis(droneMatrix, 2);
                const v0 = twgl.v3.normalize(twgl.v3.cross([0, 1, 0,], v2));
                twgl.m4.setAxis(droneMatrix, v0, 0, droneMatrix);
                twgl.m4.setAxis(droneMatrix, twgl.v3.cross(v2, v0, v0), 1, droneMatrix);
            }
            if (keys.KeyW)
                twgl.m4.translate(droneMatrix, [0, 0, -stepTrans,], droneMatrix);
            if (keys.KeyS)
                twgl.m4.translate(droneMatrix, [0, 0, stepTrans,], droneMatrix);
            if (keys.KeyA) {
                const v2 = [droneMatrix[0], 0, droneMatrix[2],];
                addToTranslation(droneMatrix, twgl.v3.mulScalar(twgl.v3.normalize(v2, v2), -stepTrans, v2));
            }
            if (keys.KeyD) {
                const v2 = [droneMatrix[0], 0, droneMatrix[2],];
                addToTranslation(droneMatrix, twgl.v3.mulScalar(twgl.v3.normalize(v2, v2), stepTrans, v2));
            }
            if (keys.ControlLeft)
                droneMatrix[13] -= stepTrans * Math.sign(droneMatrix[5]);
            if (keys.Space)
                droneMatrix[13] += stepTrans * Math.sign(droneMatrix[5]);
            if (keys.ArrowLeft) {
                const transl = twgl.m4.getTranslation(droneMatrix);
                twgl.m4.multiply(twgl.m4.axisRotation([0, 1, 0,], stepRot), droneMatrix, droneMatrix);
                twgl.m4.setTranslation(droneMatrix, transl, droneMatrix);
            }
            if (keys.ArrowRight) {
                const transl = twgl.m4.getTranslation(droneMatrix);
                twgl.m4.multiply(twgl.m4.axisRotation([0, 1, 0,], -stepRot), droneMatrix, droneMatrix);
                twgl.m4.setTranslation(droneMatrix, transl, droneMatrix);
            }
            if (keys.ArrowUp)
                twgl.m4.rotateX(droneMatrix, -stepRot, droneMatrix);
            if (keys.ArrowDown)
                twgl.m4.rotateX(droneMatrix, stepRot, droneMatrix);
            [stickL, stickR,].forEach(s => s.off());
        }
        else if (inputControlRC.checked || inputControlGamepad.checked || inputControlKb.checked) {
            let resL = { x: 0, y: 0, };
            let resR = { x: 0, y: 0, };
            const gamepadState = gamepadMgr.updateAndGetState(inputControlRC.checked);
            inputControlRC.disabled = inputControlGamepad.disabled = !gamepadState.connected;
            if (gamepadState.connected && (inputControlRC.checked || inputControlGamepad.checked)) {
                resL = { x: gamepadState.ch4, y: gamepadState.ch3, };
                resR = { x: gamepadState.ch1, y: gamepadState.ch2, };
                stickL.set(resL.x, resL.y);
                stickR.set(resR.x, resR.y);
            }
            else {
                resL = stickL.update(timeDelta_s, keys.KeyA, keys.KeyD, keys.KeyW, keys.KeyS);
                resR = stickR.update(timeDelta_s, keys.ArrowLeft, keys.ArrowRight, keys.ArrowUp, keys.ArrowDown);
            }
            [resL.x, resL.y, resR.x, resR.y,].forEach((n, i) => spanLRxy[i].innerText = n.toFixed(10));
            twgl.m4.rotateZ(droneMatrix, -timeDelta_s * degToRad(getBetaflightRates(resR.x, 0.4, 1.5, 0)), droneMatrix); // roll
            twgl.m4.rotateX(droneMatrix, -timeDelta_s * degToRad(getBetaflightRates(resR.y, 0.4, 1.5, 0)), droneMatrix); // pitch
            twgl.m4.rotateY(droneMatrix, -timeDelta_s * degToRad(getBetaflightRates(resL.x, 0.4, 1.5, 0)), droneMatrix); // yaw
            // http://paulnurkkala.com/nurks-betaflight-4-1-rpm-filtering-pids-and-setup-for-freestyle/
            //twgl.m4.rotateZ(droneMatrix, -timeDelta_s * degToRad(getBetaflightRates(resR.x, 0.83, 0.8, 0)), droneMatrix);	// roll
            //twgl.m4.rotateX(droneMatrix, -timeDelta_s * degToRad(getBetaflightRates(resR.y, 0.83, 0.8, 0)), droneMatrix);	// pitch
            //twgl.m4.rotateY(droneMatrix, -timeDelta_s * degToRad(getBetaflightRates(resL.x, 0.7, 0.8, 0)), droneMatrix);	// yaw
            // engine thrust, https://www.grc.nasa.gov/www/k-12/VirtualAero/BottleRocket/airplane/falling.html
            const g = 9.8;
            const drag = 0.01;
            const thrust = (resL.y + 1) * 31.3; // m/s
            const dv0 = droneMatrix[4] * thrust - cameraVelocity[0];
            const dv1 = droneMatrix[5] * thrust - cameraVelocity[1];
            const dv2 = droneMatrix[6] * thrust - cameraVelocity[2];
            cameraVelocity[0] += drag * dv0 * Math.abs(dv0) * timeDelta_s;
            cameraVelocity[1] += drag * dv1 * Math.abs(dv1) * timeDelta_s - g * timeDelta_s; // -gravity
            cameraVelocity[2] += drag * dv2 * Math.abs(dv2) * timeDelta_s;
            droneMatrix[12] += cameraVelocity[0] * timeDelta_s;
            droneMatrix[13] += cameraVelocity[1] * timeDelta_s;
            droneMatrix[14] += cameraVelocity[2] * timeDelta_s;
            if (droneMatrix[13] < 0.2) {
                cameraVelocity[0] = cameraVelocity[1] = cameraVelocity[2] = 0;
                droneMatrix[13] = 0.2;
                // todo: adjust matrix horizontally
            }
            spanPosition.forEach((span, i) => span.innerText = `${Math.round(droneMatrix[12 + i])}`);
            spanVelocity.forEach((span, i) => span.innerText = `${Math.round(cameraVelocity[i] * 3.6)}`);
            //spanPosition[2].innerText += `,  v1: ${v1}, dv1: ${dv1}`;
        }
        lastInputControlDuke_checked = inputControlDuke.checked;
        time = 5 + time * 0.00001;
        twgl.resizeCanvasToDisplaySize(canvas);
        const projectionMatrix = twgl.m4.perspective(degToRad(90), 1, 0.1, 2000); // Compute the projection matrix
        const cameraMatrix = twgl.m4.rotateX(droneMatrix, degToRad(getCameraAngle()));
        //////////////////
        [{ fbi: 0, rotX: 0, rotY: -Math.PI / 2, rotZ: Math.PI, }, { fbi: 1, rotX: 0, rotY: Math.PI / 2, rotZ: Math.PI, },
            { fbi: 2, rotX: Math.PI / 2, rotY: 0, rotZ: 0, }, { fbi: 3, rotX: -Math.PI / 2, rotY: 0, rotZ: 0, },
            { fbi: 4, rotX: Math.PI, rotY: 0, rotZ: 0, }, { fbi: 5, rotX: 0, rotY: 0, rotZ: Math.PI, },
        ].forEach(i => {
            const cameraMatrix3 = twgl.m4.rotateZ(twgl.m4.rotateY(twgl.m4.rotateX(cameraMatrix, i.rotX), i.rotY), i.rotZ);
            const viewMatrix3 = twgl.m4.inverse(cameraMatrix3);
            const viewProjectionMatrix3 = twgl.m4.multiply(projectionMatrix, viewMatrix3);
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbs[i.fbi].fb); // render to our targetTexture by binding the framebuffer
            gl.viewport(0, 0, targetTextureWH, targetTextureWH); // Tell WebGL how to convert from clip space to pixels
            gl.enable(gl.CULL_FACE);
            gl.enable(gl.DEPTH_TEST);
            gl.clearColor(1, 1, 1, 1);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clear the canvas AND the depth buffer.
            gl.useProgram(auxProgram.program);
            gl.bindVertexArray(auxProgram.vao); // Setup all the needed attributes.
            gl.uniformMatrix4fv(u_viewInverse, false, cameraMatrix3);
            gl.uniform3fv(u_lightWorldPos, [-50, 30, 100]);
            gl.uniform4fv(u_lightColor, [1, 1, 1, 1]);
            // Draw objects
            objects.forEach(object => {
                // Compute a position for this object based on the time.
                const worldMatrix = twgl.m4.identity();
                twgl.m4.translate(worldMatrix, [0, 50, 0,], worldMatrix);
                twgl.m4.rotateY(worldMatrix, object.yRotation * time, worldMatrix);
                twgl.m4.rotateX(worldMatrix, object.xRotation * time, worldMatrix);
                twgl.m4.translate(worldMatrix, [0, 0, object.radius,], worldMatrix);
                // Multiply the matrices.
                twgl.m4.multiply(viewProjectionMatrix3, worldMatrix, worldViewProjection);
                twgl.m4.transpose(twgl.m4.inverse(worldMatrix), worldInverseTranspose);
                // Set the uniforms we just computed
                gl.uniformMatrix4fv(u_world, false, worldMatrix);
                gl.uniformMatrix4fv(u_worldViewProjection, false, worldViewProjection);
                gl.uniformMatrix4fv(u_worldInverseTranspose, false, worldInverseTranspose);
                // Set the uniforms that are specific to the this object.
                gl.uniform4fv(u_colorMult, object.materialUniforms.u_colorMult);
                gl.uniform4fv(u_specular, object.materialUniforms.u_specular);
                gl.uniform1f(u_shininess, object.materialUniforms.u_shininess);
                gl.uniform1f(u_specularFactor, object.materialUniforms.u_specularFactor);
                gl.uniform1i(u_diffuse, 0);
                gl.activeTexture(gl.TEXTURE0 + 0);
                gl.bindTexture(gl.TEXTURE_2D, object.materialUniforms.u_diffuse);
                gl.drawElements(gl.TRIANGLES, envData.indices.length, gl.UNSIGNED_SHORT, 0); // Draw the geometry.
            });
            // ------ Draw the plane --------
            {
                gl.bindVertexArray(planeVAO); // Setup all the needed attributes.
                // Compute a position for this object based on the time.
                let worldMatrix = twgl.m4.identity();
                worldMatrix = twgl.m4.translate(worldMatrix, [0, 0, 100,]);
                worldMatrix = twgl.m4.scale(worldMatrix, [10, 1, 10,]);
                // Multiply the matrices.
                twgl.m4.multiply(viewProjectionMatrix3, worldMatrix, worldViewProjection);
                twgl.m4.transpose(twgl.m4.inverse(worldMatrix), worldInverseTranspose);
                // Set the uniforms we just computed
                gl.uniformMatrix4fv(u_world, false, worldMatrix);
                gl.uniformMatrix4fv(u_worldViewProjection, false, worldViewProjection);
                gl.uniformMatrix4fv(u_worldInverseTranspose, false, worldInverseTranspose);
                // Set the uniforms that are specific to the this object.
                gl.uniform4fv(u_colorMult, [1, 1, 1, 1]);
                gl.uniform4fv(u_specular, [1, 1, 1, 1]);
                gl.uniform1f(u_shininess, 100);
                gl.uniform1f(u_specularFactor, 0.5);
                gl.uniform1i(u_diffuse, 0);
                gl.activeTexture(gl.TEXTURE0 + 0);
                gl.bindTexture(gl.TEXTURE_2D, checkerboardTexture);
                gl.disable(gl.CULL_FACE);
                gl.drawElements(gl.TRIANGLES, planeData.indices.length, gl.UNSIGNED_SHORT, 0); // Draw the geometry.
            }
        });
        //////////////////
        gl.bindFramebuffer(gl.FRAMEBUFFER, null); // render to the canvas
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, targetTexture); // render the cube with the texture we just rendered to
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
        gl.viewport(0, 0, canvas.width, canvas.height); // Tell WebGL how to convert from clip space to pixels
        gl.clearColor(1, 1, 1, 1); // clear to white
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clear the canvas AND the depth buffer.
        // draw the skybox
        gl.depthFunc(gl.LEQUAL); // let our quad pass the depth test at 1.0
        gl.useProgram(auxProgramSky.program);
        gl.bindVertexArray(auxProgramSky.vao);
        gl.uniform1i(u_skybox, 0);
        gl.uniform1f(u_aspect, canvas.clientWidth / canvas.clientHeight); // 4/3, 16/9
        gl.uniform1f(u_fov, degToRad(getFov()));
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
        requestAnimationFrame(drawScene);
    }
}
function createWebGLHelper(canvas) {
    const gl = canvas.getContext("webgl2");
    if (!gl) {
        const message = "Unable to initialize WebGL. Your browser may not support it.";
        alert(message);
        throw new Error(message);
    }
    return { gl, createProgram, createAndBindTexture, createAndBindFramebuffer, glEnumToString, };
    function createProgram(vertexSource, fragmentSource, buffers) {
        const vertexShader = createShader(gl.VERTEX_SHADER, vertexSource);
        const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentSource);
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS))
            throw new Error("Could not compile WebGL program. \n\n" + gl.getProgramInfoLog(program));
        const attribLocations = buffers.map(b => gl.getAttribLocation(program, b.attributeName));
        const vao = createVAO(buffers);
        return { program, vao, getUniformLocation, createVAO, };
        function getUniformLocation(name) { return gl.getUniformLocation(program, name); }
        function createVAO(buffers) {
            const vao = gl.createVertexArray();
            gl.bindVertexArray(vao);
            buffers.forEach((b, i) => {
                gl.enableVertexAttribArray(attribLocations[i]);
                const buffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
                gl.bufferData(gl.ARRAY_BUFFER, b.bufferData, gl.STATIC_DRAW);
                gl.vertexAttribPointer(attribLocations[i], b.onePointSize, gl.FLOAT, b.normalize, 0, 0);
                if (b.indexBufferData) {
                    const indexBuffer = gl.createBuffer();
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
                    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, b.indexBufferData, gl.STATIC_DRAW);
                }
            });
            return vao;
        }
        function createShader(type, source) {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
                throw new Error("Could not compile WebGL program. \n\n" + gl.getShaderInfoLog(shader));
            return shader;
        }
    }
    function createAndBindTexture(target = gl.TEXTURE_2D) {
        const texture = gl.createTexture();
        gl.bindTexture(target, texture);
        return texture;
    }
    function createAndBindFramebuffer() {
        const fb = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
        return fb;
    }
    function glEnumToString(value) {
        for (const key in gl)
            if (gl[key] === value)
                return key;
        return `0x${value.toString(16)}`;
    }
}
function createFps(divFps) {
    let last = 0;
    let frames2 = 0;
    loop();
    return { inc: () => frames2++, };
    function loop() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                divFps.innerText = `fps: ${frames2 - last}`;
                last = frames2;
                yield setTimeoutA(1400 - new Date().getMilliseconds());
            }
        });
    }
}
function createStick(upDownWithSpring) {
    let stick;
    const svg = myCreateElement("svg", { style: { width: "50px", height: "50px", border: "1px solid #ccc", borderRadius: "7px", } }, stick = myCreateElement("path", { style: { fill: "none", stroke: "#888", strokeWidth: "1.5", } }));
    let [x, y,] = [0, 0,];
    return { svg, update, off, set, };
    function update(timeDelta_s, left, right, up, down) {
        const step1 = timeDelta_s * 2;
        const step2 = timeDelta_s * 1;
        x = updateAux(x, left, right, step1, step2, true);
        y = updateAux(y, down, up, step1, step2, upDownWithSpring);
        set(x, y);
        return { x, y, };
    }
    function updateAux(x, left, right, step1, step2, withSpring) {
        if (left && !right) {
            if (x < 0)
                x = Math.max(x - step1, -1);
            else
                x = Math.max(x - step1 - step2, -1);
        }
        else if (!left && right) {
            if (x > 0)
                x = Math.min(x + step1, 1);
            else
                x = Math.min(x + step1 + step2, 1);
        }
        else if (!left && !right && withSpring) {
            if (x < 0)
                x = Math.min(x + step2, 0);
            else if (x > 0)
                x = Math.max(x - step2, 0);
        }
        return x;
    }
    function off() { setAttrSvg(stick, { d: "", }); }
    function set(x, y) {
        const x2 = x * 18 + 25;
        const y2 = -y * 18 + 25;
        setAttrSvg(stick, { d: `M${x2 - 5},${y2} h10 M${x2},${y2 - 5} v10`, });
    }
}
function createGamepadManager() {
    // https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API
    const state = { connected: false, ch1: 0, ch2: 0, ch3: 0, ch4: 0, };
    return { updateAndGetState, };
    function updateAndGetState(rc) {
        const gamepads = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : [];
        state.connected = gamepads.length > 0;
        //const auxxxxx = state.ch4;
        if (rc) {
            // Jumper T8SG & FeiYing, kmita to vzdy mezi -0.8117647058823529 a -0.803921568627451, ale kdyz dam to 0.80..., tak se lip zarovna nulova hodnota
            state.ch1 = linInp(getCh(gamepads, 0), -0.803921568627451, 0.7647058823529411, -1, 1);
            state.ch2 = linInp(getCh(gamepads, 1), -0.803921568627451, 0.7647058823529411, -1, 1);
            state.ch3 = linInp(getCh(gamepads, 2), -0.803921568627451, 0.7647058823529411, -1, 1);
            state.ch4 = linInp(getCh(gamepads, 4), -0.803921568627451, 0.7647058823529411, -1, 1);
            // Jumper T8SG usb direct
            //state.ch1 = linInp(getCh(gamepads, 0), -0.984251968503937, 0.984251968503937, -1, 1);
            //state.ch2 = linInp(getCh(gamepads, 1), -0.7874015748031495, 0.7874015748031495, -1, 1);
            //state.ch3 = linInp(getCh(gamepads, 2), -0.7874015748031495, 0.7874015748031495, -1, 1);
            //state.ch4 = linInp(getCh(gamepads, 3), -0.7874015748031495, 0.7874015748031495, -1, 1);
        }
        else {
            // gamepad, nintendo switch pro controller, nefunguje to ve ff (nektera tlacitka fungovaly, ale osy ne), v chromu slo vsechno. napodruhy mi uz nefungovalo nikde nic. pak pri pripojeni usb kabelem to fungovalo zas jen v chromu
            state.ch1 = deadband(linInp(getCh(gamepads, 2), -1, 1, -1, 1), 0.17);
            state.ch2 = deadband(linInp(getCh(gamepads, 3), 1, -1, -1, 1), 0.17);
            state.ch3 = deadband(linInp(getCh(gamepads, 1), 1, -1, -1, 1), 0.17);
            state.ch4 = deadband(linInp(getCh(gamepads, 0), -1, 1, -1, 1), 0.17);
        }
        //if (state.ch4 !== auxxxxx)
        //	console.log(state.ch4);
        return state;
    }
    function getCh(gamepads, axis) {
        var _a, _b;
        return (_b = (_a = gamepads[0]) === null || _a === void 0 ? void 0 : _a.axes[axis]) !== null && _b !== void 0 ? _b : 0;
    }
    function deadband(value, dead) {
        return Math.max(Math.abs(value) - dead, 0) / (1 - dead) * Math.sign(value);
    }
}
function drawOsd(osd) {
    const c = osd.getContext("2d");
    circle("#fff", 2);
    circle("#000", 1);
    function circle(color, width) {
        c.beginPath();
        c.strokeStyle = color;
        c.lineWidth = width;
        c.arc(640 / 2, 480 / 2, 5, 0, 2 * Math.PI);
        c.stroke();
    }
}
// https://github.com/betaflight/betaflight/blob/master/src/main/fc/rc.c#L155 applyBetaflightRates
// https://github.com/betaflight/betaflight-configurator/blob/master/src/js/RateCurve.js#L81 getBetaflightRates
function getBetaflightRates(rcCommandf, rate, rcRate, rcExpo) {
    const rcCommandfAbs = Math.abs(rcCommandf);
    const limit = 1998;
    let angularVel;
    if (rcRate > 2) {
        rcRate = rcRate + (rcRate - 2) * 14.54;
    }
    const expoPower = 3;
    const rcRateConstant = 200;
    if (rcExpo > 0) {
        rcCommandf = rcCommandf * Math.pow(rcCommandfAbs, expoPower) * rcExpo + rcCommandf * (1 - rcExpo);
    }
    const rcFactor = 1 / constrain(1 - rcCommandfAbs * rate, 0.01, 1);
    angularVel = rcRateConstant * rcRate * rcCommandf;
    angularVel = angularVel * rcFactor;
    angularVel = constrain(angularVel, -1 * limit, limit); // Rate limit from profile
    return angularVel;
}
function constrain(value, min, max) {
    return Math.max(min, Math.min(value, max));
}
//# sourceMappingURL=app.js.map