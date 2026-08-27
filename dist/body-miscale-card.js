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
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var NumberFormat;
(function (NumberFormat) {
    NumberFormat["language"] = "language";
    NumberFormat["system"] = "system";
    NumberFormat["comma_decimal"] = "comma_decimal";
    NumberFormat["decimal_comma"] = "decimal_comma";
    NumberFormat["space_comma"] = "space_comma";
    NumberFormat["none"] = "none";
})(NumberFormat || (NumberFormat = {}));
var TimeFormat;
(function (TimeFormat) {
    TimeFormat["language"] = "language";
    TimeFormat["system"] = "system";
    TimeFormat["am_pm"] = "12";
    TimeFormat["twenty_four"] = "24";
})(TimeFormat || (TimeFormat = {}));

// REF: https://github.com/home-assistant/frontend/blob/dev/src/common/datetime/use_am_pm.ts
/**
 * Checking if AM/PM time format is used within the browser.
 * @param locale Homeassistant frontend locale data
 * @returns
 */
const useAmPm = (locale) => {
    if (locale.time_format === TimeFormat.language ||
        locale.time_format === TimeFormat.system) {
        const testLanguage = locale.time_format === TimeFormat.language ? locale.language : undefined;
        const test = new Date().toLocaleString(testLanguage);
        return test.includes("AM") || test.includes("PM");
    }
    return locale.time_format === TimeFormat.am_pm;
};
/**
 * Formatting a Date to the mmmm dd, yyyy format e.g. August 10, 2021
 * @param dateObj The date to convert
 * @param locale The users's locale settings
 * @returns date string like "August 10, 2021"
 */
const formatDate = (dateObj, locale) => formatDateMem(locale).format(dateObj);
const formatDateMem = (locale) => new Intl.DateTimeFormat(locale.language, {
    year: "numeric",
    month: "long",
    day: "numeric",
});

//REF: https://github.com/home-assistant/frontend/blob/dev/src/common/datetime/format_time.ts
/**
 * 9:15 PM or 21:15
 * @param dateObj The time to convert
 * @param locale  The users's locale settings
 * @returns Reformated time in hh:mm
 */
const formatTime = (dateObj, locale) => formatTimeMem(locale).format(dateObj);
const formatTimeMem = (locale) => new Intl.DateTimeFormat(locale.language, {
    hour: "numeric",
    minute: "2-digit",
    hour12: useAmPm(locale),
});
const numberFormatToLocale = (localeOptions) => {
    switch (localeOptions.number_format) {
        case NumberFormat.comma_decimal:
            return ["en-US", "en"]; // Use United States with fallback to English formatting 1,234,567.89
        case NumberFormat.decimal_comma:
            return ["de", "es", "it"]; // Use German with fallback to Spanish then Italian formatting 1.234.567,89
        case NumberFormat.space_comma:
            return ["fr", "sv", "cs"]; // Use French with fallback to Swedish and Czech formatting 1 234 567,89
        case NumberFormat.system:
            return undefined;
        default:
            return localeOptions.language;
    }
};
const round = (value, precision = 2) => Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
/**
 * Formats a number based on the specified language with thousands separator(s) and decimal character for better legibility.
 * @param num The number to format
 * @param locale The user-selected language and number format, from `hass.locale`
 * @param options Intl.NumberFormatOptions to use
 */
const formatNumber = (num, localeOptions, options) => {
    const locale = localeOptions
        ? numberFormatToLocale(localeOptions)
        : undefined;
    // Polyfill for Number.isNaN, which is more reliable than the global isNaN()
    Number.isNaN =
        Number.isNaN ||
            function isNaN(input) {
                return typeof input === "number" && isNaN(input);
            };
    if ((localeOptions === null || localeOptions === void 0 ? void 0 : localeOptions.number_format) !== NumberFormat.none &&
        !Number.isNaN(Number(num)) &&
        Intl) {
        try {
            return new Intl.NumberFormat(locale, getDefaultFormatOptions(num, options)).format(Number(num));
        }
        catch (err) {
            // Don't fail when using "TEST" language
            // eslint-disable-next-line no-console
            console.error(err);
            return new Intl.NumberFormat(undefined, getDefaultFormatOptions(num, options)).format(Number(num));
        }
    }
    if (typeof num === "string") {
        return num;
    }
    return `${round(num, void 0 ).toString()}${""}`;
};
/**
 * Generates default options for Intl.NumberFormat
 * @param num The number to be formatted
 * @param options The Intl.NumberFormatOptions that should be included in the returned options
 */
const getDefaultFormatOptions = (num, options) => {
    const defaultOptions = Object.assign({ maximumFractionDigits: 2 }, options);
    if (typeof num !== "string") {
        return defaultOptions;
    }
    // Keep decimal trailing zeros if they are present in a string numeric value
    {
        const digits = num.indexOf(".") > -1 ? num.split(".")[1].length : 0;
        defaultOptions.minimumFractionDigits = digits;
        defaultOptions.maximumFractionDigits = digits;
    }
    return defaultOptions;
};

// Polymer legacy event helpers used courtesy of the Polymer project.
//
// Copyright (c) 2017 The Polymer Authors. All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//    * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
//    * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
//    * Neither the name of Google Inc. nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
/**
 * Dispatches a custom event with an optional detail value.
 *
 * @param {string} type Name of event type.
 * @param {*=} detail Detail value containing event-specific
 *   payload.
 * @param {{ bubbles: (boolean|undefined),
 *           cancelable: (boolean|undefined),
 *           composed: (boolean|undefined) }=}
 *  options Object specifying options.  These may include:
 *  `bubbles` (boolean, defaults to `true`),
 *  `cancelable` (boolean, defaults to false), and
 *  `node` on which to fire the event (HTMLElement, defaults to `this`).
 * @return {Event} The new event that was fired.
 */
const fireEvent = (node, type, detail, options) => {
    options = options || {};
    // @ts-ignore
    detail = detail === null || detail === undefined ? {} : detail;
    const event = new Event(type, {
        bubbles: options.bubbles === undefined ? true : options.bubbles,
        cancelable: Boolean(options.cancelable),
        composed: options.composed === undefined ? true : options.composed
    });
    event.detail = detail;
    node.dispatchEvent(event);
    return event;
};

// Check if config or Entity changed
function hasConfigOrEntityChanged(element, changedProps, forceUpdate) {
    if (changedProps.has('config') || forceUpdate) {
        return true;
    }
    if (element.config.entity) {
        const oldHass = changedProps.get('hass');
        if (oldHass) {
            return (oldHass.states[element.config.entity]
                !== element.hass.states[element.config.entity]);
        }
        return true;
    }
    else {
        return false;
    }
}

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3=globalThis,e$3=t$3.ShadowRoot&&(void 0===t$3.ShadyCSS||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$6=new WeakMap;let n$4 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$3&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$6.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$6.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new n$4("string"==typeof t?t:t+"",void 0,s$2),i$5=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$4(o,t,s$2)},S$1=(s,o)=>{if(e$3)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$3.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$3?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$4,defineProperty:e$2,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$3,getOwnPropertySymbols:o$5,getPrototypeOf:n$3}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$4(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$2(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$3(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$3(t),...o$5(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,i$3=t=>t,s$1=t$2.trustedTypes,e$1=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$4=`lit$${Math.random().toFixed(9).slice(2)}$`,n$2="?"+o$4,r$2=`<${n$2}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$1?e$1.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r$2:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$4+x):s+o$4+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$4),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$4)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$4),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n$2)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$4,t+1));)d.push({type:7,index:l}),t+=o$4.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$3(t).nextSibling;i$3(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$2.litHtmlPolyfillSupport;B?.(S,k),(t$2.litHtmlVersions??=[]).push("3.3.3");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;let i$2 = class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}};i$2._$litElement$=true,i$2["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i$2});const o$3=s.litElementPolyfillSupport;o$3?.({LitElement:i$2});(s.litElementVersions??=[]).push("4.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=t=>(e,o)=>{ void 0!==o?o.addInitializer(()=>{customElements.define(t,e);}):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$2={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1},r$1=(t=o$2,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=true),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t,true,r);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t,true,r);}}throw Error("Unsupported decorator location: "+n)};function n$1(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(r){return n$1({...r,state:true,attribute:false})}

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$1=o=>o??A;

const COLOR_HEX_MAP = {
  disabled: 'null',
  red: '#f44336',
  pink: '#e91e63',
  purple: '#926bc7',
  'deep-purple': '#6e41ab',
  indigo: '#3f51b5',
  blue: '#2196f3',
  'light-blue': '#03a9f4',
  cyan: '#00bcd4',
  teal: '#009688',
  green: '#4caF50',
  'light-green': '#8bc34a',
  lime: '#cddc39',
  yellow: '#ffeb3b',
  amber: '#ffc107',
  orange: '#ff9800',
  orangered: '#ff4500',
  'deep-orange': '#ff6f22',
  brown: '#795548',
  'light-grey': '#bdbdbd',
  grey: '#9e9e9e',
  'dark-grey': '#606060',
  'blue-grey': '#607d8b',
  darkgreen: '#006400',
  royalblue: '#4169e1',
  black: '#000000',
  white: '#FFFFFF'
};
new Set(Object.keys(COLOR_HEX_MAP));
function computeCssColor(color) {
  if (COLOR_HEX_MAP[color]) {
    return COLOR_HEX_MAP[color];
  }
  return COLOR_HEX_MAP.disabled;
}

var common$j = {
	version: "Versió",
	name: "Targeta Bodymiscale",
	description: "La targeta Bodymiscale mostra l'estat del teu cos en relació amb el teu pes.",
	not_available: "Bodymiscale no està disponible",
	toggle_power: "Mostra / amaga més detalls com IMC, kCal"
};
var states$k = {
	ok: "MESURA: OK",
	unknown: "ESTAT: desconegut",
	problem: "Problema",
	none: "Cap",
	weight_unavailable: "Pes no disponible",
	impedance_unavailable: "Impedància no disponible",
	weight_unavailable_and_impedance_unavailable: "Pes i impedància no disponibles",
	weight_low: "Pes baix",
	impedance_low: "Impedància baixa",
	weight_low_and_impedance_low: "Pes i impedància baixos",
	impedance_low_and_weight_low: "Impedància i pes baixos",
	weight_high: "Pes alt",
	impedance_high: "Impedància alta",
	weight_high_and_impedance_high: "Pes i impedància alts",
	weight_high_and_impedance_low: "Pes alt, impedància baixa",
	weight_low_and_impedance_high: "Pes baix, impedància alta"
};
var attributes$j = {
	"weight: ": "Pes: ",
	"impedance: ": "Impedància: ",
	"impedance_low: ": "Impedància 50 kHz: ",
	"impedance_high: ": "Impedància 250 kHz: ",
	"height: ": "Alçada: ",
	"age: ": "Edat: ",
	"gender: ": "Sexe: "
};
var attributes_value$j = {
	male: "masculí",
	female: "femení",
	unavailable: "no disponible"
};
var body$j = {
	bmi: "IMC",
	bmi_label: "Etiqueta IMC",
	visceral_fat: "Greix visceral",
	body_fat: "Greix corporal",
	protein: "Proteïna",
	water: "Aigua",
	muscle_mass: "Massa muscular",
	bone_mass: "Massa òssia",
	weight: "Pes",
	ideal: "Ideal",
	basal_metabolism: "Metabolisme basal",
	body_type: "Tipus de cos",
	metabolic_age: "Edat metabòlica",
	skeletal_muscle_mass: "Massa muscular esquelètica",
	extracellular_water: "Aigua extracel·lular",
	intracellular_water: "Aigua intracel·lular",
	ecw_tbw_ratio: "Ràtio ECW/TBW",
	bcm: "Massa cel·lular corporal"
};
var body_value$j = {
	skinny: "Prim",
	balanced_skinny: "Prim equilibrat",
	skinny_muscular: "Prim musculós",
	balanced: "Equilibrat",
	balanced_muscular: "Musculós equilibrat",
	lack_exercise: "Manca d'exercici",
	thick_set: "Corpulent",
	obese: "Obès",
	overweight: "Sobrepès",
	underweight: "Per sota del pes normal",
	normal_or_healthy_weight: "Normal",
	slight_overweight: "Lleuger sobrepès",
	moderate_obesity: "Obesitat moderada",
	severe_obesity: "Obesitat severa",
	massive_obesity: "Obesitat massiva",
	unavailable: "no disponible"
};
var unit$j = {
	" years": " anys"
};
var error$j = {
	invalid_config: "Configuració no vàlida",
	missing_entity: "Si us plau, definiu una entitat.",
	missing_entity_bodymiscale: "Si us plau, definiu una entitat Bodymiscale."
};
var editor$k = {
	configuration: "Configuració",
	customization: "Personalització",
	entity: "Si us plau, trieu un compte de la bàscula (necessari)!",
	image: "Imatge de fons (opcional)",
	icons_body: "Camí de les icones (ex: /local/images/bodyscoreIcon)",
	model: "Teniu un sensor d'impedància?",
	model1: "Activeu aquesta funció per a mesures precises de la composició corporal.",
	model_aria_label_on: "Activar impedància",
	model_aria_label_off: "Desactivar impedància",
	dual_impedance: "Balança amb doble impedància (50 kHz + 250 kHz)?",
	dual_impedance_aria_label_on: "Activar doble impedància",
	dual_impedance_aria_label_off: "Desactivar doble impedància",
	unit: "Converteix kg a lbs",
	unit_aria_label_on: "Activar conversió",
	unit_aria_label_off: "Desactivar conversió",
	theme: "Configureu el tema que utilitzeu.",
	theme_aria_label_on: "Activa el tema clar",
	theme_aria_label_off: "Desactiva el tema fosc",
	show_name: "Mostrar el nom del compte com a títol?",
	show_name_aria_label_on: "Mostrar nom com a títol",
	show_name_aria_label_off: "Amagar nom com a títol",
	show_states: "Mostrar l'estat de la bàscula?",
	show_states_aria_label_on: "Mostrar estat de la bàscula",
	show_states_aria_label_off: "Amagar estat de la bàscula",
	show_attributes: "Mostrar dades de perfil personal (cantonada superior dreta)?",
	show_attributes_aria_label_on: "Mostrar atributs",
	show_attributes_aria_label_off: "Amagar atributs",
	show_always_details: "Mostrar sempre els detalls",
	show_always_details_aria_label_on: "Mostrar la vista de detalls predeterminada",
	show_always_details_aria_label_off: "Amagar la vista de detalls predeterminada",
	show_toolbar: "Mostrar opcions avançades?",
	show_toolbar_aria_label_on: "Mostrar opcions avançades",
	show_toolbar_aria_label_off: "Amagar opcions avançades",
	show_body: "Mostrar més detalls de la mesura",
	show_body1: "(part inferior - prémer la data per mostrar)?",
	show_body_aria_label_on: "Mostrar puntuació corporal",
	show_body_aria_label_off: "Amagar puntuació corporal",
	show_buttons: "Permetre canvi de compte?",
	show_buttons_aria_label_on: "Mostrar botons de compte",
	show_buttons_aria_label_off: "Amagar botons de compte",
	header_options: "1. Opcions de capçalera de targeta",
	body_options: "2. Més opcions de targeta",
	code_only_note: "ATENCIÓ: Opcions addicionals només estan disponibles a l'editor de codi."
};
var editor_body$j = {
	from: "De",
	icon_position: "Posició de la icona",
	label_below: "Etiqueta a sota",
	left: "A l'esquerra",
	minmax_position: "Posició Mín/Màx",
	name_position: "Posició del nom",
	off: "Apagar",
	on: "Activat",
	right: "A la dreta",
	severity_generator_help: "Enllaç a l'ajuda de severitat",
	showabovelabels: "Mostrar etiquetes a sobre",
	showbelowlabels: "Mostrar etiquetes a sota",
	to: "A",
	value_position: "Posició del valor"
};
var color_select$j = {
	color: "Color",
	disabled: "Deshabilitat",
	red: "Vermell",
	pink: "Rosa",
	purple: "Porpra",
	"deep-purple": "Porpra fosc",
	indigo: "Índigo",
	blue: "Blau",
	"light-blue": "Blau clar",
	cyan: "Cian",
	teal: "Blau verdós",
	green: "Verd",
	"light-green": "Verd clar",
	lime: "Llimona",
	yellow: "Groc",
	amber: "Ambre",
	orange: "Taronja",
	orangered: "Taronja vermellós",
	"deep-orange": "Taronja fosc",
	brown: "Marró",
	"light-grey": "Gris clar",
	grey: "Gris",
	"dark-grey": "Gris fosc",
	"blue-grey": "Gris blavós",
	darkgreen: "Verd fosc",
	royalblue: "Blau reial",
	black: "Negre",
	white: "Blanc"
};
var label_below$j = {
	balanced: "Equilibrat",
	good: "Bo",
	increased: "Augmentat",
	insufficient: "Insuficient",
	high: "Alt",
	low: "Baix",
	normal: "Normal",
	obese: "Obès",
	objective_achieved: "Objectiu assolit",
	objective_not_achieved: "Objectiu no assolit",
	overweight: "Sobrepès",
	underweight: "Per sota del pes normal",
	very_high: "Molt alt",
	very_low: "Molt baix"
};
var ca = {
	common: common$j,
	states: states$k,
	attributes: attributes$j,
	attributes_value: attributes_value$j,
	body: body$j,
	body_value: body_value$j,
	unit: unit$j,
	error: error$j,
	editor: editor$k,
	editor_body: editor_body$j,
	color_select: color_select$j,
	label_below: label_below$j
};

var ca$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    attributes: attributes$j,
    attributes_value: attributes_value$j,
    body: body$j,
    body_value: body_value$j,
    color_select: color_select$j,
    common: common$j,
    default: ca,
    editor: editor$k,
    editor_body: editor_body$j,
    error: error$j,
    label_below: label_below$j,
    states: states$k,
    unit: unit$j
});

var common$i = {
	version: "Verze",
	name: "Karta Bodymiscale",
	description: "Karta bodymiscale ukazuje údaje ohledně váhy a tělesných proporcí",
	not_available: "Bodymiscale není dostupná",
	toggle_power: "Více podrobností jako například BMI kCal zobrazit / skrýt"
};
var states$j = {
	ok: "MĚŘENÍ: OK",
	unknown: "STAV: neznámý",
	problem: "Problém",
	none: "Žádný",
	weight_unavailable: "Váha není dostupná",
	impedance_unavailable: "Impedance není dostupná",
	weight_unavailable_and_impedance_unavailable: "Váha a impedance není dostupná",
	weight_low: "nízká váha",
	impedance_low: "nízká impedance",
	weight_low_and_impedance_low: "nízká Váha a impedance",
	impedance_low_and_weight_low: "nízká Impedance a váha",
	weight_high: "vysoká váha",
	impedance_high: "vysoká impedance",
	weight_high_and_impedance_high: "vysoká Váha a impedance",
	weight_high_and_impedance_low: "vysoká váha, nízká impedance",
	weight_low_and_impedance_high: "nízká váha, vysoká impedance"
};
var attributes$i = {
	"weight: ": "Váha: ",
	"impedance: ": "Impedance: ",
	"impedance_low: ": "Impedance 50 kHz: ",
	"impedance_high: ": "Impedance 250 kHz: ",
	"height: ": "Výška: ",
	"age: ": "Věk: ",
	"gender: ": "Pohlaví: "
};
var attributes_value$i = {
	male: "muž",
	female: "žena",
	unavailable: "nedostupná"
};
var body$i = {
	bmi: "BMI",
	bmi_label: "BMI popis",
	visceral_fat: "Viscerální tuk",
	body_fat: "Tělesný tuk",
	protein: "Protein",
	water: "Voda",
	muscle_mass: "Svalová hmota",
	bone_mass: "Kostní hmota",
	weight: "Váha",
	ideal: "Ideální",
	basal_metabolism: "Základní metabolismus",
	body_type: "Tělesný typ",
	metabolic_age: "Metabolický věk",
	skeletal_muscle_mass: "Kosterní svalová hmota",
	extracellular_water: "Extracelulární voda",
	intracellular_water: "Intracelulární voda",
	ecw_tbw_ratio: "Poměr ECW/TBW",
	bcm: "Tělesná buněčná hmota"
};
var body_value$i = {
	skinny: "štíhlý",
	balanced_skinny: "štíhlý-vyvážený",
	skinny_muscular: "štíhlý-svalnatý",
	balanced: "vyvážený",
	balanced_muscular: "vyvážený-svalnatý",
	lack_exercise: "nedostatek cvičení",
	thick_set: "pevné",
	obese: "obézní",
	overweight: "nadváha",
	underweight: "podváha",
	normal_or_healthy_weight: "normální či zdravá váha",
	slight_overweight: "lehká nadváha",
	moderate_obesity: "menší obezita",
	severe_obesity: "vážná obezita",
	massive_obesity: "velká obezita",
	unavailable: "nedostupná"
};
var unit$i = {
	" years": " let"
};
var error$i = {
	invalid_config: "Neplatná konfigurace",
	missing_entity: "Prosím definujte entitu.",
	missing_entity_bodymiscale: "Prosím definujte entitu bodymiscale."
};
var editor$j = {
	configuration: "Konfigurace",
	customization: "Přizpůsobení",
	entity: "Prosím definujte účet váhy (povinné) !",
	image: "Obrázek pozadí (volitelné)",
	icons_body: "Cesta k ikonám (např. /local/images/bodyscoreIcon)",
	model: "Máte senzor impedance?",
	model1: "Aktivujte tuto funkci pro přesné měření složení těla.",
	model_aria_label_on: "Aktivovat impedanci",
	model_aria_label_off: "Deaktivovat impedanci",
	dual_impedance: "Váha s dvojitou impedancí (50 kHz + 250 kHz)?",
	dual_impedance_aria_label_on: "Aktivovat dvojitou impedanci",
	dual_impedance_aria_label_off: "Deaktivovat dvojitou impedanci",
	unit: "Převést kilogramy na libry",
	unit_aria_label_on: "Zapnout konverzi",
	unit_aria_label_off: "Vypnout konverzi",
	theme: "Nakonfigurujte téma, které používáte.",
	theme_aria_label_on: "Aktivovat světlé téma",
	theme_aria_label_off: "Deaktivovat tmavé téma",
	show_name: "Zobrazovat jméno účtu jako titulek ?",
	show_name_aria_label_on: "Zapnout zobrazování jména",
	show_name_aria_label_off: "Vypnout zobrazování jména",
	show_states: "Zobrazit stav ?",
	show_states_aria_label_on: "Zapnout zobrazování stavu",
	show_states_aria_label_off: "Vypnout zobrazování stavu",
	show_attributes: "Show hlavní osobní data (vpravo nahoře) ?",
	show_attributes_aria_label_on: "Zapnout zobrazování atributů",
	show_attributes_aria_label_off: "Vypnout zobrazování atributů",
	show_always_details: "Vždy zobrazovat detaily",
	show_always_details_aria_label_on: "Zapnout výchozí zobrazení podrobností",
	show_always_details_aria_label_off: "Vypnout výchozí zobrazení podrobností",
	show_toolbar: "Zobrazit pokročilá nastavení ?",
	show_toolbar_aria_label_on: "Zapnout zobrazení pokročilých nastavení",
	show_toolbar_aria_label_off: "Vypnout zobrazení pokročilých nastavení",
	show_body: "Nabízet další detaily měření",
	show_body1: "(spodní polovina - zobrazí se po klepnutí na ikonu šipky dolů) ?",
	show_body_aria_label_on: "Zapnout zobrazování tělesného skóre",
	show_body_aria_label_off: "Vypnout zobrazování tělesného skóre",
	show_buttons: "Povolit změnu účtu ?",
	show_buttons_aria_label_on: "Zapnout zobrazování tlačítek",
	show_buttons_aria_label_off: "Vypnout zobrazování tlačítek",
	header_options: "1. Možnosti záhlaví karty",
	body_options: "2. Více možností karty",
	code_only_note: "POZOR: Další možnosti jsou dostupné pouze v editor kódu."
};
var editor_body$i = {
	from: "Od",
	icon_position: "Pozice ikony",
	label_below: "Štítek dole",
	left: "Vlevo",
	minmax_position: "Pozice Min/Max",
	name_position: "Pozice názvu",
	off: "Vypnuto",
	on: "Zapnuto",
	right: "Vpravo",
	severity_generator_help: "Odkaz na nápovědu k závažnosti",
	showabovelabels: "Zobrazit štítky nahoře",
	showbelowlabels: "Zobrazit štítky dole",
	to: "Do",
	value_position: "Pozice hodnoty"
};
var color_select$i = {
	color: "Barva",
	disabled: "Zakázáno",
	red: "Červená",
	pink: "Růžová",
	purple: "Fialová",
	"deep-purple": "Tmavě fialová",
	indigo: "Indigo",
	blue: "Modrá",
	"light-blue": "Světle modrá",
	cyan: "Azurová",
	teal: "Tyrkysová",
	green: "Zelená",
	"light-green": "Světle zelená",
	lime: "Limetková",
	yellow: "Žlutá",
	amber: "Jantarová",
	orange: "Oranžová",
	orangered: "Červenooranžová",
	"deep-orange": "Tmavě oranžová",
	brown: "Hnědá",
	"light-grey": "Světle šedá",
	grey: "Šedá",
	"dark-grey": "Tmavě šedá",
	"blue-grey": "Modrošedá",
	darkgreen: "Tmavě zelená",
	royalblue: "Královská modrá",
	black: "Černá",
	white: "Bílá"
};
var label_below$i = {
	balanced: "vyvážený",
	good: "Dobrý",
	increased: "Zvýšený",
	insufficient: "Nedostatečný",
	high: "Vysoký",
	low: "Nízký",
	normal: "Normální",
	obese: "obézní",
	objective_achieved: "Cíl dosažen",
	objective_not_achieved: "Cíl nedosažen",
	overweight: "nadváha",
	underweight: "podváha",
	very_high: "Velmi vysoký",
	very_low: "Velmi nízký"
};
var cs = {
	common: common$i,
	states: states$j,
	attributes: attributes$i,
	attributes_value: attributes_value$i,
	body: body$i,
	body_value: body_value$i,
	unit: unit$i,
	error: error$i,
	editor: editor$j,
	editor_body: editor_body$i,
	color_select: color_select$i,
	label_below: label_below$i
};

var cs$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    attributes: attributes$i,
    attributes_value: attributes_value$i,
    body: body$i,
    body_value: body_value$i,
    color_select: color_select$i,
    common: common$i,
    default: cs,
    editor: editor$j,
    editor_body: editor_body$i,
    error: error$i,
    label_below: label_below$i,
    states: states$j,
    unit: unit$i
});

var common$h = {
	version: "Version",
	name: "Bodymiscale kort",
	description: "Bodymiscale kortet viser dig din vægtrelaterede kropsstatus.",
	not_available: "Bodymiscale er ikke tilgængelig",
	"Slå_power": "Flere detaljer såsom BMI kCal vis / skjul"
};
var states$i = {
	ok: "MÅLING: OK",
	unknown: "STATUS: ukendt",
	problem: "Problem",
	none: "Ingen",
	weight_unavailable: "Vægt ikke tilgængelig",
	impedance_unavailable: "Impedans ikke tilgængelig",
	weight_unavailable_and_impedance_unavailable: "Vægt og impedans ikke tilgængelig",
	weight_low: "Vægt lav",
	impedance_low: "Impedans lav",
	weight_low_and_impedance_low: "Vægt og impedans lav",
	impedance_low_and_weight_low: "Impedans og vægt lav",
	weight_high: "Vægt høj",
	impedance_high: "Impedans høj",
	weight_high_and_impedance_high: "Vægt og impedans høj",
	weight_high_and_impedance_low: "Vægt høj, impedans lav",
	weight_low_and_impedance_high: "Vægt lav, impedans høj"
};
var attributes$h = {
	"weight: ": "Vægt: ",
	"impedance: ": "Impedans: ",
	"impedance_low: ": "Impedans 50 kHz: ",
	"impedance_high: ": "Impedans 250 kHz: ",
	"height: ": "Højde: ",
	"age: ": "Alder: ",
	"gender: ": "Køn: "
};
var attributes_value$h = {
	male: "mand",
	female: "kvinde",
	unavailable: "ikke tilgængelig"
};
var body$h = {
	bmi: "BMI",
	bmi_label: "BMI 'mærke'",
	visceral_fat: "Visceralt fedt",
	body_fat: "Kropsfedt",
	protein: "Protein",
	water: "Vand",
	muscle_mass: "Muskelmasse",
	bone_mass: "Knoglemasse",
	weight: "Vægt",
	ideal: "Ideel",
	basal_metabolism: "Basal stofskifte",
	body_type: "Kropstype",
	metabolic_age: "Metabolisk alder",
	skeletal_muscle_mass: "Skeletmuskelmasse",
	extracellular_water: "Ekstracellulært vand",
	intracellular_water: "Intracellulært vand",
	ecw_tbw_ratio: "ECW/TBW-forhold",
	bcm: "Kropscellemasse"
};
var body_value$h = {
	skinny: "Slank",
	balanced_skinny: "Balanceret slank",
	skinny_muscular: "Muskuløs slank",
	balanced: "Balanceret",
	balanced_muscular: "Balanceret muskuløs",
	lack_exercise: "Mangel på motion",
	thick_set: "Kraftig",
	obese: "Fed",
	overweight: "Overvægtig",
	underweight: "Undervægtig",
	normal_or_healthy_weight: "Normal eller sund vægt",
	slight_overweight: "Let overvægtig",
	moderate_obesity: "Moderat fedme",
	severe_obesity: "Alvorlig fedme",
	massive_obesity: "Massiv fedme",
	unavailable: "ikke tilgængelig"
};
var unit$h = {
	" years": " år"
};
var error$h = {
	invalid_config: "Ugyldig konfiguration",
	missing_entity: "Definer venligst en entitet.",
	missing_entity_bodymiscale: "Definer venligst en bodymiscale entitet."
};
var editor$i = {
	configuration: "Konfiguration",
	customization: "Tilpasning",
	entity: "Vælg venligst en konto på vægten (obligatorisk)!",
	image: "Baggrundsbillede (valgfrit)",
	icons_body: "Ikon sti (f.eks., /local/images/bodyscoreIcon)",
	model: "Har du en impedans sensor?",
	model1: "Aktiver denne funktion for præcise kropssammensætnings målinger.",
	model_aria_label_on: "Aktiver impedans",
	model_aria_label_off: "Deaktiver impedans",
	dual_impedance: "Vægt med dobbelt impedans (50 kHz + 250 kHz)?",
	dual_impedance_aria_label_on: "Aktivér dobbelt impedans",
	dual_impedance_aria_label_off: "Deaktivér dobbelt impedans",
	unit: "Omregn kg til lbs",
	unit_aria_label_on: "Slå konverteringen til",
	unit_aria_label_off: "Slå konverteringen fra",
	theme: "Konfigurer det tema du bruger.",
	theme_aria_label_on: "Slå lyst tema til",
	theme_aria_label_off: "Slå mørkt tema fra",
	show_name: "Vis kontonavn som titel?",
	show_name_aria_label_on: "Slå visning af navn til",
	show_name_aria_label_off: "Slå visning af navn fra",
	show_states: "Vis tilstand?",
	show_states_aria_label_on: "Slå visning af tilstand til",
	show_states_aria_label_off: "Slå visning af tilstand fra",
	show_attributes: "Vis personlige stamdata (øverst til højre)?",
	show_attributes_aria_label_on: "Slå visning af egenskaber til",
	show_attributes_aria_label_off: "Slå visning af egenskaber fra",
	show_always_details: "Vis altid detaljer",
	show_always_details_aria_label_on: "Slå default detail view til",
	show_always_details_aria_label_off: "Slå default detail view fra",
	show_toolbar: "Vis avancerede muligheder?",
	show_toolbar_aria_label_on: "Slå visning af avancerede muligheder til",
	show_toolbar_aria_label_off: "Slå visning af avancerede muligheder fra",
	show_body: "Tilbyd yderligere målingsdetaljer",
	show_body1: "(Nederste halvdel -  vises af pil ned)?",
	show_body_aria_label_on: "Slå visning af Kropsscore til",
	show_body_aria_label_off: "Slå visning af Kropsscore fra",
	show_buttons: "Tillad kontoskift?",
	show_buttons_aria_label_on: "Slå visning af knapper til",
	show_buttons_aria_label_off: "Slå visning af knapper fra",
	header_options: "1. Indstillinger for kortoverskrift",
	body_options: "2. Flere kort indstillinger",
	code_only_note: "OBS! Yderligere muligheder er kun tilgængelig i kode editor."
};
var editor_body$h = {
	from: "Fra",
	icon_position: "Ikon position",
	label_below: "'Mærke' nedenunder",
	left: "Venstre",
	minmax_position: "Min/Max position",
	name_position: "Navneposition",
	off: "fra",
	on: "til",
	right: "Højre",
	severity_generator_help: "Link til hjælp om alvorlighedsgraden",
	showabovelabels: "Vis 'mærke' ovenover",
	showbelowlabels: "Vis 'mærke' underneden",
	to: "To",
	value_position: "Position af værdi"
};
var color_select$h = {
	color: "Farve",
	disabled: "Deaktiveret",
	red: "Rød",
	pink: "Pink",
	purple: "Lilla",
	"deep-purple": "Mørkelilla",
	indigo: "Indigo",
	blue: "Blå",
	"light-blue": "Lyseblå",
	cyan: "Cyan",
	teal: "Blågrøn",
	green: "Grøn",
	"light-green": "Lysegrøn",
	lime: "Lime",
	yellow: "Gul",
	amber: "Ravgul",
	orange: "Orange",
	orangered: "Rødorange",
	"deep-orange": "Dyb orange",
	brown: "Brun",
	"light-grey": "Lysegrå",
	grey: "Grå",
	"dark-grey": "Mørkegrå",
	"blue-grey": "Blågrå",
	darkgreen: "Mørkegrøn",
	royalblue: "Kongeblå",
	black: "Sort",
	white: "Hvid"
};
var label_below$h = {
	balanced: "Balanceret",
	good: "God",
	increased: "Øget",
	insufficient: "Utilstrækkelig",
	high: "Høj",
	low: "Lav",
	normal: "Normal",
	obese: "Fed",
	objective_achieved: "Mål nået",
	objective_not_achieved: "Mål ikke nået",
	overweight: "Overvægtig",
	underweight: "Undervægtig",
	very_high: "Meget høj",
	very_low: "Meget lav"
};
var da = {
	common: common$h,
	states: states$i,
	attributes: attributes$h,
	attributes_value: attributes_value$h,
	body: body$h,
	body_value: body_value$h,
	unit: unit$h,
	error: error$h,
	editor: editor$i,
	editor_body: editor_body$h,
	color_select: color_select$h,
	label_below: label_below$h
};

var da$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    attributes: attributes$h,
    attributes_value: attributes_value$h,
    body: body$h,
    body_value: body_value$h,
    color_select: color_select$h,
    common: common$h,
    default: da,
    editor: editor$i,
    editor_body: editor_body$h,
    error: error$h,
    label_below: label_below$h,
    states: states$i,
    unit: unit$h
});

var common$g = {
	version: "Version",
	name: "Bodymiscale Karte",
	description: "Die bodymiscale Karte zeigt Ihren gewichtsmäßigen Körperstatus an.",
	not_available: "Bodymiscale ist momenatan nicht verfügbar",
	toggle_power: "Weitere Details wie BMI kCal anzeigen / ausblenden"
};
var states$h = {
	ok: "MESSUNG: OK",
	unknown: "STATUS: unbekannt",
	problem: "Problem",
	none: "keine",
	weight_unavailable: "Gewichtsmessung nicht verfügbar",
	impedance_unavailable: "Bioelektrische Impedanzmessung (Körperzusammensetzung) nicht verfügbar",
	weight_unavailable_and_impedance_unavailable: "Gewichts- und bioelektrische Impedanzmessung (Körperzusammensetzung) nicht verfügbar."
};
var attributes$g = {
	"weight: ": "Gewicht: ",
	"impedance: ": "Zusammensetzung: ",
	impedance_high: "Impedanz 250 kHz: ",
	impedance_low: "Impedanz 50 kHz: ",
	"height: ": "Körpergröße: ",
	"age: ": "Alter: ",
	"gender: ": "Geschlecht: "
};
var attributes_value$g = {
	male: "männl.",
	female: "weibl.",
	unavailable: "Nicht verfügbar"
};
var body$g = {
	bmi: "BMI",
	bmi_label: "BMI Klassifikation",
	visceral_fat: "Bauchfett",
	body_fat: "Körperfett",
	protein: "Protein",
	water: "Wasser",
	muscle_mass: "Muskelmasse",
	bone_mass: "Knochenmasse",
	weight: "Gewicht",
	ideal: "Idealgewicht",
	basal_metabolism: "Grundumsatz",
	body_type: "Körperbau",
	metabolic_age: "stoffwechselbedingtes Körperalter",
	skeletal_muscle_mass: "Skelettmuskelmasse",
	extracellular_water: "Extrazelluläres Wasser",
	intracellular_water: "Intrazelluläres Wasser",
	ecw_tbw_ratio: "ECW/TBW-Verhältnis",
	bcm: "Körperzellmasse"
};
var body_value$g = {
	skinny: "schlank",
	balanced_skinny: "ausgeglichen schlank",
	skinny_muscular: "muskulös schlank",
	balanced: "ausgewogen",
	balanced_muscular: "ausgewogen muskulös",
	lack_exercise: "Bewegungsmangel",
	thick_set: "stämmig",
	obese: "fettleibig",
	overweight: "Übergewicht",
	underweight: "Untergewicht",
	normal_or_healthy_weight: "Normal - gesundes Gewicht",
	slight_overweight: "leichtes Übergewicht",
	moderate_obesity: "moderate Fettleibigkeit",
	severe_obesity: "schwere Fettleibigkeit",
	massive_obesity: "massive Fettleibigkeit",
	unavailable: "Nicht verfügbar"
};
var unit$g = {
	" years": " Jahre"
};
var error$g = {
	missing_entity: "Bitte definieren Sie eine Entität in der Konfiguration.",
	missing_entity_bodymiscale: "Bitte definieren Sie \"bodymiscale\" als Entität in der Konfiguration."
};
var editor$h = {
	entity: "Bitte ein Konto auf der Waage wählen (erforderlich)!",
	image: "Hintergrundbild (optional)",
	icons_body: "Pfad zu den Icons (z.B. /local/images/bodyscoreIcon)",
	model: "Haben Sie einen Impedanzsensor?",
	model1: "Aktivieren Sie diese Funktion für genaue Körperzusammensetzungsmessungen.",
	model_aria_label_on: "Impedanz aktivieren",
	model_aria_label_off: "Impedanz deaktivieren",
	dual_impedance: "Waage mit doppelter Impedanz (50 kHz + 250 kHz)?",
	dual_impedance_aria_label_on: "Doppelte Impedanz aktivieren",
	dual_impedance_aria_label_off: "Doppelte Impedanz deaktivieren",
	unit: "kg in lbs umrechnen",
	unit_aria_label_on: "Konvertierung einschalten",
	unit_aria_label_off: "Umwandlung deaktivieren",
	show_name: "Namen des Konto als Titel anzeigen?",
	show_name_aria_label_on: "Namensanzeige einschalten",
	show_name_aria_label_off: "Namesanzeige ausschalten",
	show_states: "Status anzeigen (Symbole links oben)?",
	show_states_aria_label_on: "Statusanzeige einschalten",
	show_states_aria_label_off: "Statusanzeige ausschalten",
	show_attributes: "Persönliche Stammdaten anzeigen (rechts oben)?",
	show_attributes_aria_label_on: "Basis Daten einblenden (rechts oben) einschalten",
	show_attributes_aria_label_off: "Basis Daten einblenden (rechts oben) ausschalten",
	show_always_details: "Details immer anzeigen",
	show_always_details_aria_label_on: "Schalten Sie die standardmäßige Detailansicht ein",
	show_always_details_aria_label_off: "Schaltet die standardmäßige Detailansicht aus",
	show_toolbar: "Fortgeschrittene Optionen anzeigen ?",
	show_toolbar_aria_label_on: "Symbolleiste anzeigen einschalten",
	show_toolbar_aria_label_off: "Symbolleiste anzeigen ausschalten",
	show_body: "Weitere Messergebnisse anbieten",
	show_body1: "(untere Hälfte - per Chevron-Symbol einblenden)?",
	show_body_aria_label_on: "Körperwertanzeige einschalten",
	show_body_aria_label_off: "Körperwertanzeige ausschalten",
	show_buttons: "Kontowechsel erlauben?",
	show_buttons_aria_label_on: "Schaltfläche anzeigen einschalten",
	show_buttons_aria_label_off: "Schaltfläche anzeigen ausschalten",
	header_options: "1. Kartenkopf Optionen",
	body_options: "2. mehr Kartenoptionen",
	code_only_note: "ACHTUNG: Weitere Optionen sind nur im Code Editor verfügbar."
};
var editor_body$g = {
	from: "Von",
	icon_position: "Symbolposition",
	label_below: "Beschriftung darunter",
	left: "Links",
	minmax_position: "Min/Max Position",
	name_position: "Name Position",
	off: "Aus",
	on: "Ein",
	right: "Rechts",
	severity_generator_help: "Link zur Schweregrad-Hilfe",
	showabovelabels: "Labels oben anzeigen",
	showbelowlabels: "Labels unten anzeigen",
	target: "Ziel",
	to: "Zu",
	value_position: "Wert Position"
};
var color_select$g = {
	color: "Farbe",
	disabled: "Deaktiviert",
	red: "Rot",
	pink: "Rosa",
	purple: "Lila",
	"deep-purple": "Dunkellila",
	indigo: "Indigo",
	blue: "Blau",
	"light-blue": "Hellblau",
	cyan: "Cyan",
	teal: "Türkis",
	green: "Grün",
	"light-green": "Hellgrün",
	lime: "Limette",
	yellow: "Gelb",
	amber: "Bernstein",
	orange: "Orange",
	orangered: "Rotorange",
	"deep-orange": "Dunkelorange",
	brown: "Braun",
	"light-grey": "Hellgrau",
	grey: "Grau",
	"dark-grey": "Dunkelgrau",
	"blue-grey": "Blaugrau",
	darkgreen: "Dunkelgrün",
	royalblue: "Königsblau",
	black: "Schwarz",
	white: "Weiß"
};
var label_below$g = {
	balanced: "ausgewogen",
	good: "Gut",
	increased: "Erhöht",
	insufficient: "Unzureichend",
	high: "Hoch",
	low: "Niedrig",
	normal: "Normal",
	obese: "fettleibig",
	objective_achieved: "Ziel erreicht",
	objective_not_achieved: "Ziel nicht erreicht",
	overweight: "Übergewicht",
	underweight: "Untergewicht",
	very_high: "Sehr hoch",
	very_low: "Sehr niedrig"
};
var de = {
	common: common$g,
	states: states$h,
	attributes: attributes$g,
	attributes_value: attributes_value$g,
	body: body$g,
	body_value: body_value$g,
	unit: unit$g,
	error: error$g,
	editor: editor$h,
	editor_body: editor_body$g,
	color_select: color_select$g,
	label_below: label_below$g
};

var de$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    attributes: attributes$g,
    attributes_value: attributes_value$g,
    body: body$g,
    body_value: body_value$g,
    color_select: color_select$g,
    common: common$g,
    default: de,
    editor: editor$h,
    editor_body: editor_body$g,
    error: error$g,
    label_below: label_below$g,
    states: states$h,
    unit: unit$g
});

var common$f = {
	version: "Version",
	name: "Bodymiscale Card",
	description: "The bodymiscale card shows you your weight wise / related body status.",
	not_available: "Bodymiscale is not available",
	toggle_power: "More details like BMI kCal show / hide"
};
var states$g = {
	ok: "MEASUREMENT: OK",
	unknown: "STATE: unknown",
	problem: "Problem",
	none: "None",
	weight_unavailable: "Weight unavailable",
	impedance_unavailable: "Impedance unavailable",
	weight_unavailable_and_impedance_unavailable: "Weight and impedance unavailable",
	weight_low: "Weight low",
	impedance_low: "Impedance low",
	weight_low_and_impedance_low: "Weight and impedance low",
	impedance_low_and_weight_low: "Impedance and weight low",
	weight_high: "Weight high",
	impedance_high: "Impedance high",
	weight_high_and_impedance_high: "Weight and impedance high",
	weight_high_and_impedance_low: "Weight high, impedance low",
	weight_low_and_impedance_high: "Weight low, impedance high"
};
var attributes$f = {
	"weight: ": "Weight: ",
	"impedance: ": "Impedance: ",
	"impedance_low: ": "Impedance 50 kHz: ",
	"impedance_high: ": "Impedance 250 kHz: ",
	"height: ": "Height: ",
	"age: ": "Age: ",
	"gender: ": "Gender: "
};
var attributes_value$f = {
	male: "male",
	female: "female",
	unavailable: "unavailable"
};
var body$f = {
	bmi: "BMI",
	bmi_label: "BMI label",
	visceral_fat: "Visceral fat",
	body_fat: "Body fat",
	protein: "Protein",
	water: "Water",
	muscle_mass: "Muscle mass",
	bone_mass: "Bone mass",
	weight: "Weight",
	ideal: "Ideal",
	basal_metabolism: "Basal metabolism",
	body_type: "Body type",
	metabolic_age: "Metabolic age",
	skeletal_muscle_mass: "Skeletal muscle mass",
	extracellular_water: "Extracellular water",
	intracellular_water: "Intracellular water",
	ecw_tbw_ratio: "Ratio ECW/TBW",
	bcm: "Body cell mass"
};
var body_value$f = {
	skinny: "Skinny",
	balanced_skinny: "Balanced-skinny",
	skinny_muscular: "Skinny-muscular",
	balanced: "Balanced",
	balanced_muscular: "Balanced-muscular",
	lack_exercise: "Lack-exercise",
	thick_set: "Thick-set",
	obese: "Obese",
	overweight: "Overweight",
	underweight: "Underweight",
	normal_or_healthy_weight: "Normal or Healthy Weight",
	slight_overweight: "Slight overweight",
	moderate_obesity: "Moderate obesity",
	severe_obesity: "Severe obesity",
	massive_obesity: "Massive obesity",
	unavailable: "unavailable"
};
var unit$f = {
	" years": " years"
};
var error$f = {
	invalid_config: "Invalid configuration",
	missing_entity: "Please define an entity.",
	missing_entity_bodymiscale: "Please define a bodymiscale entity."
};
var editor$g = {
	configuration: "Configuration",
	customization: "Customization",
	entity: "Please select an account on the scale (required)!",
	image: "Background image (optional)",
	icons_body: "Icons path (e.g., /local/images/bodyscoreIcon)",
	model: "Do you have an impedance sensor?",
	model1: "Enable this feature for accurate body composition measurements.",
	model_aria_label_on: "Enable impedance",
	model_aria_label_off: "Disable impedance",
	dual_impedance: "Scale with dual impedance (50 kHz + 250 kHz)?",
	dual_impedance_aria_label_on: "Enable dual impedance",
	dual_impedance_aria_label_off: "Disable dual impedance",
	unit: "Convert kg to lbs",
	unit_aria_label_on: "Toggle the conversion on",
	unit_aria_label_off: "Toggle the conversion off",
	theme: "Configure the theme you use.",
	theme_aria_label_on: "Toggle theme light on",
	theme_aria_label_off: "Toggle theme dark off",
	show_name: "Show the name of the account as title?",
	show_name_aria_label_on: "Toggle display name on",
	show_name_aria_label_off: "Toggle display name off",
	show_states: "Show State?",
	show_states_aria_label_on: "Toggle display state on",
	show_states_aria_label_off: "Toggle display state off",
	show_attributes: "Show personal master data (top right)?",
	show_attributes_aria_label_on: "Toggle display attributes on",
	show_attributes_aria_label_off: "Toggle display attributes off",
	show_always_details: "Always show details",
	show_always_details_aria_label_on: "Toggle default detail view on",
	show_always_details_aria_label_off: "Toggle default detail view off",
	show_toolbar: "Show advanced options?",
	show_toolbar_aria_label_on: "Toggle display advanced options on",
	show_toolbar_aria_label_off: "Toggle display advanced options off",
	show_body: "Offer further measurement details",
	show_body1: "(lower half - icon chevron down will show those)?",
	show_body_aria_label_on: "Toggle display body score on",
	show_body_aria_label_off: "Toggle display body score off",
	show_buttons: "Allow account switch?",
	show_buttons_aria_label_on: "Toggle display buttons on",
	show_buttons_aria_label_off: "Toggle display buttons off",
	header_options: "1. Card header options",
	body_options: "2. More card options",
	code_only_note: "ATTENTION: Additional options are only available in the code editor."
};
var editor_body$f = {
	from: "From",
	icon_position: "Icon Position",
	label_below: "Label below",
	left: "Left",
	minmax_position: "Min/Max Position",
	name_position: "Name Position",
	off: "Off",
	on: "On",
	right: "Right",
	severity_generator_help: "Link to Severity Help",
	showabovelabels: "Show labels above",
	showbelowlabels: "Show labels below",
	to: "To",
	value_position: "Value Position"
};
var color_select$f = {
	color: "Color",
	disabled: "Disabled",
	red: "Red",
	pink: "Pink",
	purple: "Purple",
	"deep-purple": "Deep purple",
	indigo: "Indigo",
	blue: "Blue",
	"light-blue": "Light blue",
	cyan: "Cyan",
	teal: "Teal",
	green: "Green",
	"light-green": "Light green",
	lime: "Lime",
	yellow: "Yellow",
	amber: "Amber",
	orange: "Orange",
	orangered: "Red orange",
	"deep-orange": "Deep orange",
	brown: "Brown",
	"light-grey": "Light grey",
	grey: "Grey",
	"dark-grey": "Dark grey",
	"blue-grey": "Blue grey",
	darkgreen: "Dark green",
	royalblue: "Royal blue",
	black: "Black",
	white: "White"
};
var label_below$f = {
	balanced: "Balanced",
	good: "Good",
	increased: "Increased",
	insufficient: "Insufficient",
	high: "High",
	low: "Low",
	normal: "Normal",
	obese: "Obese",
	objective_achieved: "Objective achieved",
	objective_not_achieved: "Objective not achieved",
	overweight: "Overweight",
	underweight: "Underweight",
	very_high: "Very high",
	very_low: "Very low"
};
var en = {
	common: common$f,
	states: states$g,
	attributes: attributes$f,
	attributes_value: attributes_value$f,
	body: body$f,
	body_value: body_value$f,
	unit: unit$f,
	error: error$f,
	editor: editor$g,
	editor_body: editor_body$f,
	color_select: color_select$f,
	label_below: label_below$f
};

var en$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    attributes: attributes$f,
    attributes_value: attributes_value$f,
    body: body$f,
    body_value: body_value$f,
    color_select: color_select$f,
    common: common$f,
    default: en,
    editor: editor$g,
    editor_body: editor_body$f,
    error: error$f,
    label_below: label_below$f,
    states: states$g,
    unit: unit$f
});

var common$e = {
	version: "Versión",
	name: "Tarjeta Bodymiscale",
	description: "La tarjeta bodymiscale muestra el estado de tu cuerpo en relación a tu peso.",
	not_available: "Bodymiscale no está disponible",
	toggle_power: "Mostrar / ocultar más detalles como IMC,kCal"
};
var states$f = {
	ok: "MEDICIÓN: OK",
	unknown: "ESTADO: desconocido",
	problem: "Problema",
	none: "Ninguno",
	weight_unavailable: "Peso no disponible",
	impedance_unavailable: "Impedancia no disponible",
	weight_unavailable_and_impedance_unavailable: "Peso e impedancia no disponibles",
	weight_low: "Peso bajo",
	impedance_low: "Impedancia baja",
	weight_low_and_impedance_low: "Peso e impedancia bajos",
	impedance_low_and_weight_low: "Impedancia y peso bajos",
	weight_high: "Peso alto",
	impedance_high: "Impedancia alta",
	weight_high_and_impedance_high: "Peso e impedancia altos",
	weight_high_and_impedance_low: "Peso alto, impedancia baja",
	weight_low_and_impedance_high: "Peso bajo, impedancia alta"
};
var attributes$e = {
	"weight: ": "Peso: ",
	"impedance: ": "Impedancia: ",
	"impedance_low: ": "Impedancia 50 kHz: ",
	"impedance_high: ": "Impedancia 250 kHz: ",
	"height: ": "Altura: ",
	"age: ": "Edad: ",
	"gender: ": "Sexo: "
};
var attributes_value$e = {
	male: "masculino",
	female: "femenino",
	unavailable: "no disponible"
};
var body$e = {
	bmi: "IMC",
	bmi_label: "Etiqueta IMC",
	visceral_fat: "Grasa visceral",
	body_fat: "Grasa corporal",
	protein: "Proteína",
	water: "Agua",
	muscle_mass: "Masa muscular",
	bone_mass: "Masa ósea",
	weight: "Peso",
	ideal: "Ideal",
	basal_metabolism: "Metabolismo basal",
	body_type: "Tipo de cuerpo",
	metabolic_age: "Edad metabólica",
	skeletal_muscle_mass: "Masa muscular esquelética",
	extracellular_water: "Agua extracelular",
	intracellular_water: "Agua intracelular",
	ecw_tbw_ratio: "Relación ECW/TBW",
	bcm: "Masa celular corporal"
};
var body_value$e = {
	skinny: "Flaco",
	balanced_skinny: "Flaco equilibrado",
	skinny_muscular: "Flaco musculoso",
	balanced: "Equilibrado",
	balanced_muscular: "Musculuso equilibrado",
	lack_exercise: "Falto de ejercicio",
	thick_set: "Rechoncho",
	obese: "Obeso",
	overweight: "Sobrepeso",
	underweight: "Por debajo del peso normal",
	normal_or_healthy_weight: "Normal",
	slight_overweight: "Ligero sobrepeso",
	moderate_obesity: "Obesidad moderada",
	severe_obesity: "Obesidad severa",
	massive_obesity: "Obesidad masiva",
	unavailable: "no disponible"
};
var unit$e = {
	" years": " años"
};
var error$e = {
	invalid_config: "Configuración inválida",
	missing_entity: "Por favor, defina una entidad.",
	missing_entity_bodymiscale: "Por favor, defina una entidad bodymiscale."
};
var editor$f = {
	configuration: "Configuración",
	customization: "Personalización",
	entity: "Por favor, escoja una cuenta de la bácula (necesario)!",
	image: "Imagen de fondo (opcional)",
	icons_body: "Ruta de los iconos (ej: /local/images/bodyscoreIcon)",
	model: "¿Tiene un sensor de impedancia?",
	model1: "Active esta función para mediciones precisas de la composición corporal.",
	model_aria_label_on: "Activar impedancia",
	model_aria_label_off: "Desactivar impedancia",
	dual_impedance: "Báscula con doble impedancia (50 kHz + 250 kHz)?",
	dual_impedance_aria_label_on: "Activar doble impedancia",
	dual_impedance_aria_label_off: "Desactivar doble impedancia",
	unit: "Convertir kg a lbs",
	unit_aria_label_on: "Activar conversión",
	unit_aria_label_off: "Desactivar conversión",
	theme: "Configure el tema que utiliza.",
	theme_aria_label_on: "Activar tema claro",
	theme_aria_label_off: "Desactivar tema oscuro",
	show_name: "¿Mostrar el nombre de la cuenta como título?",
	show_name_aria_label_on: "Mostrar nombre como título",
	show_name_aria_label_off: "Ocultar nombre como título",
	show_states: "¿Mostrar estado de la báscula?",
	show_states_aria_label_on: "Mostrar estado de la báscula",
	show_states_aria_label_off: "Ocultar estado de la báscula",
	show_attributes: "¿Mostrar datos de perfil personal (esquina superior derecha)?",
	show_attributes_aria_label_on: "Mostrar atributos",
	show_attributes_aria_label_off: "Ocultar atributos",
	show_always_details: "Mostrar siempre los detalles",
	show_always_details_aria_label_on: "Mostrar la vista de detalles predeterminada",
	show_always_details_aria_label_off: "Ocultar la vista de detalles predeterminada",
	show_toolbar: "¿Mostrar opciones avanzadas?",
	show_toolbar_aria_label_on: "Mostrar opciones avanzadas",
	show_toolbar_aria_label_off: "Ocultar opciones avanzadas",
	show_body: "Mostrar más detalles de la medición",
	show_body1: "¿(parte inferior - pulsar en la fecha para mostrar)?",
	show_body_aria_label_on: "Mostrar puntuación corporal",
	show_body_aria_label_off: "Ocultar puntuación corporal",
	show_buttons: "¿Permitir cambio de cuenta?",
	show_buttons_aria_label_on: "Mostrar botones de cuenta",
	show_buttons_aria_label_off: "Ocultar botones de cuenta",
	header_options: "1. Opciones de cabecera de tarjeta",
	body_options: "2. Más opciones de tarjeta",
	code_only_note: "ATENCIÓN: Opciones adicionales sólo están disponibles en el editor de código."
};
var editor_body$e = {
	from: "De",
	icon_position: "Posición del ícono",
	label_below: "Etiqueta debajo",
	left: "A la izquierda",
	minmax_position: "Posición Mín/Máx",
	name_position: "Posición del nombre",
	off: "Apagar",
	on: "Encendido",
	right: "A la derecha",
	severity_generator_help: "Enlace a la ayuda de severidad",
	showabovelabels: "Mostrar etiquetas arriba",
	showbelowlabels: "Mostrar etiquetas abajo",
	to: "A",
	value_position: "Posición del valor"
};
var color_select$e = {
	color: "Color",
	disabled: "Deshabilitado",
	red: "Rojo",
	pink: "Rosa",
	purple: "Púrpura",
	"deep-purple": "Púrpura oscuro",
	indigo: "Índigo",
	blue: "Azul",
	"light-blue": "Azul claro",
	cyan: "Cian",
	teal: "Azul verdoso",
	green: "Verde",
	"light-green": "Verde claro",
	lime: "Limón",
	yellow: "Amarillo",
	amber: "Ámbar",
	orange: "Naranja",
	orangered: "Naranja rojizo",
	"deep-orange": "Naranja oscuro",
	brown: "Marrón",
	"light-grey": "Gris claro",
	grey: "Gris",
	"dark-grey": "Gris oscuro",
	"blue-grey": "Gris azulado",
	darkgreen: "Verde oscuro",
	royalblue: "Azul real",
	black: "Negro",
	white: "Blanco"
};
var label_below$e = {
	balanced: "Equilibrado",
	good: "Bueno",
	increased: "Aumentado",
	insufficient: "Insuficiente",
	high: "Alto",
	low: "Bajo",
	normal: "Normal",
	obese: "Obeso",
	objective_achieved: "Objetivo alcanzado",
	objective_not_achieved: "Objetivo no alcanzado",
	overweight: "Sobrepeso",
	underweight: "Por debajo del peso normal",
	very_high: "Muy alto",
	very_low: "Muy bajo"
};
var es = {
	common: common$e,
	states: states$f,
	attributes: attributes$e,
	attributes_value: attributes_value$e,
	body: body$e,
	body_value: body_value$e,
	unit: unit$e,
	error: error$e,
	editor: editor$f,
	editor_body: editor_body$e,
	color_select: color_select$e,
	label_below: label_below$e
};

var es$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    attributes: attributes$e,
    attributes_value: attributes_value$e,
    body: body$e,
    body_value: body_value$e,
    color_select: color_select$e,
    common: common$e,
    default: es,
    editor: editor$f,
    editor_body: editor_body$e,
    error: error$e,
    label_below: label_below$e,
    states: states$f,
    unit: unit$e
});

var common$d = {
	version: "Version",
	name: "Carte Bodymiscale",
	description: "La carte bodymiscale corporelle vous indique votre poids et votre état corporel.",
	not_available: "Bodymiscale n'est pas disponible",
	toggle_power: "Plus de détails comme IMC kCal afficher / cacher"
};
var states$e = {
	ok: "MESURE : OK",
	unknown: "ÉTAT : inconnu",
	problem: "Problème",
	none: "Aucun",
	weight_unavailable: "Poids indisponible",
	impedance_unavailable: "Impédance indisponible",
	weight_unavailable_and_impedance_unavailable: "Poids et impédance indisponibles",
	weight_low: "Poids faible",
	impedance_low: "Impédance faible",
	weight_low_and_impedance_low: "Poids et impédance faibles",
	impedance_low_and_weight_low: "Impédance et poids faibles",
	weight_high: "Poids élevé",
	impedance_high: "Impédance élevée",
	weight_high_and_impedance_high: "Poids et impédance élevés",
	weight_high_and_impedance_low: "Poids élevé, impédance faible",
	weight_low_and_impedance_high: "Poids faible, impédance élevée"
};
var attributes$d = {
	"weight: ": "Poids: ",
	"impedance: ": "Impédance: ",
	"impedance_low: ": "Impédance 50 kHz: ",
	"impedance_high: ": "Impédance 250 kHz: ",
	"height: ": "Taille: ",
	"age: ": "Age: ",
	"gender: ": "Genre: "
};
var attributes_value$d = {
	male: "homme",
	female: "femme",
	unavailable: "indisponible"
};
var body$d = {
	bmi: "IMC",
	bmi_label: "Étiquette IMC",
	visceral_fat: "Graisse viscérale",
	body_fat: "Graisse corporelle",
	protein: "Protéine",
	water: "Eau",
	muscle_mass: "Masse musculaire",
	bone_mass: "Masse osseuse",
	weight: "Poids",
	ideal: "Poids idéal",
	basal_metabolism: "Métabolisme de base",
	body_type: "Corpulence",
	metabolic_age: "Age corporel",
	skeletal_muscle_mass: "Masse musculaire squelettique",
	extracellular_water: "Eau extracellulaire",
	intracellular_water: "Eau intracellulaire",
	ecw_tbw_ratio: "Ratio ECW/TBW",
	bcm: "Masse cellulaire corporelle"
};
var body_value$d = {
	skinny: "Maigre",
	balanced_skinny: "Équilibré maigre",
	skinny_muscular: "Maigre musclé",
	balanced: "Équilibré",
	balanced_muscular: "Musclé équilibré",
	lack_exercise: "Manque d'exercice",
	thick_set: "Trapu",
	obese: "Obèse",
	overweight: "Surpoids",
	underweight: "Insuffisance pondérale",
	normal_or_healthy_weight: "Normal - poids de santé",
	slight_overweight: "Léger surpoids",
	moderate_obesity: "Obésité modérée",
	severe_obesity: "Obésité sévère",
	massive_obesity: "Obésité massive",
	unavailable: "indisponible"
};
var unit$d = {
	" years": " ans"
};
var error$d = {
	invalid_config: "Configuration invalide",
	missing_entity: "Veuillez définir une entité.",
	missing_entity_bodymiscale: "Veuillez définir une entité Bodymiscale."
};
var editor$e = {
	configuration: "Configuration",
	customization: "Personnalisation",
	entity: "Veuillez choisir un compte de la balance (obligatoire) !",
	image: "Image de fond (facultatif)",
	icons_body: "Chemin des icônes (ex: /local/images/bodyscoreIcon)",
	model: "Vous avez un capteur d'impédance ?",
	model1: "Activez cette fonctionnalité pour des mesures corporelle précises.",
	model_aria_label_on: "Activez l'impédance",
	model_aria_label_off: "Désactiver l'impédance",
	dual_impedance: "Balance avec double impédance (50 kHz + 250 kHz) ?",
	dual_impedance_aria_label_on: "Activer double impédance",
	dual_impedance_aria_label_off: "Désactiver double impédance",
	unit: "Convertir les kg en lbs",
	unit_aria_label_on: "Activer la conversion",
	unit_aria_label_off: "Désactiver la conversion",
	theme: "Configurer le thème que vous utilisez.",
	theme_aria_label_on: "Activer thème clair",
	theme_aria_label_off: "Désactiver thème sombre",
	show_name: "Afficher le nom du compte comme titre ?",
	show_name_aria_label_on: "Activer affichage du nom",
	show_name_aria_label_off: "Désactiver affichage du nom",
	show_states: "Afficher l'état ?",
	show_states_aria_label_on: "Activer l'affichage de l'état",
	show_states_aria_label_off: "Désactiver l'affichage de l'état",
	show_attributes: "Afficher les données personnelles de base (en haut à droite) ?",
	show_attributes_aria_label_on: "Activer l'affichage des données personnelles de base",
	show_attributes_aria_label_off: "Désactiver l'affichage des données personnelles de base",
	show_always_details: "Toujours afficher les détails",
	show_always_details_aria_label_on: "Activer l'affichage des détails par défaut",
	show_always_details_aria_label_off: "Désactiver l'affichage des détails par défaut",
	show_toolbar: "Afficher les options avancées ?",
	show_toolbar_aria_label_on: "Activer l'affichage des options avancées",
	show_toolbar_aria_label_off: "Désactiver l'affichage des options avancées",
	show_body: "Offrir d'autres détails de mesure",
	show_body1: "(partie inférieure - affichage via l'icone chevron bas) ?",
	show_body_aria_label_on: "Activer l'affichage des autres détails de mesure",
	show_body_aria_label_off: "Désactiver l'affichage des autres détails de mesure",
	show_buttons: "Autoriser le changement de compte ?",
	show_buttons_aria_label_on: "Activer le changement de compte",
	show_buttons_aria_label_off: "Désactiver le changement de compte",
	header_options: "1. Options d'en-tête de la carte",
	body_options: "2. Plus d'options de la cartes",
	code_only_note: "ATTENTION: Les options supplémentaires ne sont disponibles que dans l'éditeur de code."
};
var editor_body$d = {
	from: "De",
	icon_position: "Position de l'icône",
	label_below: "Label en dessous",
	left: "À gauche",
	minmax_position: "Position Min/Max",
	name_position: "Position du nom",
	off: "Désactivé",
	on: "Activé",
	right: "À droite",
	severity_generator_help: "Lien vers l'aide Sévérité",
	showabovelabels: "Afficher les labels au-dessus",
	showbelowlabels: "Afficher les labels en dessous",
	to: "À",
	value_position: "Position de la valeur"
};
var color_select$d = {
	color: "Couleur",
	disabled: "Désactivé",
	red: "Rouge",
	pink: "Rose",
	purple: "Violet",
	"deep-purple": "Violet foncé",
	indigo: "Indigo",
	blue: "Bleu",
	"light-blue": "Bleu clair",
	cyan: "Cyan",
	teal: "Turquoise",
	green: "Vert",
	"light-green": "Vert clair",
	lime: "Vert citron",
	yellow: "Jaune",
	amber: "Ambre",
	orange: "Orange",
	orangered: "Rouge orange",
	"deep-orange": "Orange foncé",
	brown: "Marron",
	"light-grey": "Gris clair",
	grey: "Gris",
	"dark-grey": "Gris foncé",
	"blue-grey": "Bleu gris",
	darkgreen: "Vert foncé",
	royalblue: "Blue roi",
	black: "Noir",
	white: "Blanc"
};
var label_below$d = {
	balanced: "Équilibré",
	good: "Bien",
	increased: "Augmenté",
	insufficient: "Insuffisant",
	high: "Élevé",
	low: "Faible",
	normal: "Normal",
	obese: "Obèse",
	objective_achieved: "Objectif atteint",
	objective_not_achieved: "Objectif non atteint",
	overweight: "Surpoids",
	underweight: "Insuffisance pondérale",
	very_high: "Très élevé",
	very_low: "Très faible"
};
var fr = {
	common: common$d,
	states: states$e,
	attributes: attributes$d,
	attributes_value: attributes_value$d,
	body: body$d,
	body_value: body_value$d,
	unit: unit$d,
	error: error$d,
	editor: editor$e,
	editor_body: editor_body$d,
	color_select: color_select$d,
	label_below: label_below$d
};

var fr$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    attributes: attributes$d,
    attributes_value: attributes_value$d,
    body: body$d,
    body_value: body_value$d,
    color_select: color_select$d,
    common: common$d,
    default: fr,
    editor: editor$e,
    editor_body: editor_body$d,
    error: error$d,
    label_below: label_below$d,
    states: states$e,
    unit: unit$d
});

var common$c = {
	version: "Verzió",
	name: "Bodymiscale Kártya",
	description: "A BodyMiScale kártya megmutatja az ön súlyhoz viszonyított testi állapotát.",
	not_available: "A Bodymiscale nem elérhető",
	toggle_power: "További részletek, például a BMI, kCal megjelenítése / elrejtése"
};
var states$d = {
	ok: "MÉRÉS: RENDBEN",
	unknown: "ÁLLAPOT: ismeretlen",
	problem: "Probléma",
	none: "Nincs",
	weight_unavailable: "Súly nem elérhető",
	impedance_unavailable: "Impedancia nem elérhető",
	weight_unavailable_and_impedance_unavailable: "Súly és impedancia nem elérhető",
	weight_low: "Alacsony súly",
	impedance_low: "Alacsony impedancia",
	weight_low_and_impedance_low: "Alacsony súly és impedancia",
	impedance_low_and_weight_low: "Alacsony impedancia és súly",
	weight_high: "Magas súly",
	impedance_high: "Magas impedancia",
	weight_high_and_impedance_high: "Magas súly és impedancia",
	weight_high_and_impedance_low: "Magas súly, alacsony impedancia",
	weight_low_and_impedance_high: "Alacsony súly, magas impedancia"
};
var attributes$c = {
	"weight: ": "Súly: ",
	"impedance: ": "Impedancia: ",
	"impedance_low: ": "Impedancia 50 kHz: ",
	"impedance_high: ": "Impedancia 250 kHz: ",
	"height: ": "Magasság: ",
	"age: ": "Kor: ",
	"gender: ": "Nem: "
};
var attributes_value$c = {
	male: "férfi",
	female: "nő",
	unavailable: "nem elérhető"
};
var body$c = {
	bmi: "BMI",
	bmi_label: "BMI címke",
	visceral_fat: "Zsigeri zsír",
	body_fat: "Testzsír",
	protein: "Fehérje",
	water: "Víz",
	muscle_mass: "Izomtömeg",
	bone_mass: "Csonttömeg",
	weight: "Súly",
	ideal: "Ideális",
	basal_metabolism: "Alapanyagcsere",
	body_type: "Testtípus",
	metabolic_age: "Anyagcsere kor",
	skeletal_muscle_mass: "Vázizomtömeg",
	extracellular_water: "Extracelluláris víz",
	intracellular_water: "Intracelluláris víz",
	ecw_tbw_ratio: "ECW/TBW arány",
	bcm: "Testsejtszömeg"
};
var body_value$c = {
	skinny: "Sovány",
	balanced_skinny: "Kiegyensúlyozott-sovány",
	skinny_muscular: "Sovány-izmos",
	balanced: "Kiegyensúlyozott",
	balanced_muscular: "Kiegyensúlyozott-izmos",
	lack_exercise: "Mozgáshiányos",
	thick_set: "Közepesen molett",
	obese: "Kórosan elhízott",
	overweight: "Túlsúlyos",
	underweight: "Súlyhiányos",
	normal_or_healthy_weight: "Normál vagy egészséges testsúly",
	slight_overweight: "Enyhe túlsúly",
	moderate_obesity: "Közepes elhízottság",
	severe_obesity: "Súlyos elhízottság",
	massive_obesity: "Masszív elhízottság",
	unavailable: "nem elérhető"
};
var unit$c = {
	" years": " év"
};
var error$c = {
	missing_entity: "Kérjük, definiáljon egy entitást.",
	missing_entity_bodymiscale: "Kérjük, definiáljon egy BodyMiScale entitást."
};
var editor$d = {
	configuration: "Konfiguráció",
	customization: "Testreszabás",
	entity: "Kérjük, válasszon egy fiókot a mérlegen (kötelező)!",
	image: "Háttérkép (opcionális)",
	icons_body: "Ikonok útvonala (pl.: /local/images/bodyscoreIcon)",
	model: "Rendelkezik impedancia érzékelővel?",
	model1: "A pontos testösszetétel mérésekhez aktiválja ezt a funkciót.",
	model_aria_label_on: "Impedancia engedélyezése",
	model_aria_label_off: "Impedancia letiltása",
	dual_impedance: "Mérleg kettős impedanciával (50 kHz + 250 kHz)?",
	dual_impedance_aria_label_on: "Kettős impedancia engedélyezése",
	dual_impedance_aria_label_off: "Kettős impedancia letiltása",
	unit: "Kg átszámítása fonttá",
	unit_aria_label_on: "Átszámítás bekapcsolása",
	unit_aria_label_off: "Átszámítás kikapcsolása",
	theme: "Állítsa be a használt témát.",
	theme_aria_label_on: "Világos téma bekapcsolása",
	theme_aria_label_off: "Sötét téma kikapcsolása",
	show_name: "Mutassa a fiók nevét címként?",
	show_name_aria_label_on: "Név megjelenítésének bekapcsolása",
	show_name_aria_label_off: "Név megjelenítésének kikapcsolása",
	show_states: "Állapot mutatása?",
	show_states_aria_label_on: "Állapot megjelenítésének bekapcsolása",
	show_states_aria_label_off: "Állapot megjelenítésének kikapcsolása",
	show_attributes: "Személyes adatok mutatása (jobb felső sarokban)?",
	show_attributes_aria_label_on: "Személyes adatok megjelenítésének bekapcsolása",
	show_attributes_aria_label_off: "Személyes adatok megjelenítésének kikapcsolása",
	show_always_details: "Mindig mutassa a részleteket",
	show_always_details_aria_label_on: "Alapértelmezett részletes nézet bekapcsolása",
	show_always_details_aria_label_off: "Alapértelmezett részletes nézet kikapcsolása",
	show_toolbar: "Mutassa a haladó beállításokat?",
	show_toolbar_aria_label_on: "Haladó beállítások megjelenítésének bekapcsolása",
	show_toolbar_aria_label_off: "Haladó beállítások megjelenítésének kikapcsolása",
	show_body: "Kínáljon további mérési részleteket",
	show_body1: "(alsó rész - a lefelé mutató nyíl ikonra kattintva megjeleníthető)?",
	show_body_aria_label_on: "Test pontszám megjelenítésének bekapcsolása",
	show_body_aria_label_off: "Test pontszám megjelenítésének kikapcsolása",
	show_buttons: "Fiókváltás engedélyezése?",
	show_buttons_aria_label_on: "Gombok megjelenítésének bekapcsolása",
	show_buttons_aria_label_off: "Gombok megjelenítésének kikapcsolása",
	header_options: "1. Kártya fejléc beállítások",
	body_options: "2. További kártya beállítások",
	code_only_note: "FIGYELEM: További beállítások csak a kód szerkesztőben érhetők el."
};
var editor_body$c = {
	from: "Tól",
	icon_position: "Ikon pozíció",
	label_below: "Címke alul",
	left: "Bal oldalon",
	minmax_position: "Min/Max pozíció",
	name_position: "Név pozíció",
	off: "Kikapcsolva",
	on: "Be",
	right: "Jobb oldalon",
	severity_generator_help: "Link a súlyossági súgóhoz",
	showabovelabels: "Címkék megjelenítése felül",
	showbelowlabels: "Címkék megjelenítése alul",
	target: "Cél",
	to: "Tovább",
	value_position: "Érték pozíció"
};
var color_select$c = {
	color: "Szín",
	disabled: "Letiltva",
	red: "Piros",
	pink: "Rózsaszín",
	purple: "Lila",
	"deep-purple": "Sötét lila",
	indigo: "Indigó",
	blue: "Kék",
	"light-blue": "Világoskék",
	cyan: "Cián",
	teal: "Türkiz",
	green: "Zöld",
	"light-green": "Világoszöld",
	lime: "Lime",
	yellow: "Sárga",
	amber: "Borostyán",
	orange: "Narancs",
	orangered: "Narancsvörös",
	"deep-orange": "Sötét narancs",
	brown: "Barna",
	"light-grey": "Világosszürke",
	grey: "Szürke",
	"dark-grey": "Sötétszürke",
	"blue-grey": "Kékszürke",
	darkgreen: "Sötétzöld",
	royalblue: "Királykék",
	black: "Fekete",
	white: "Fehér"
};
var label_below$c = {
	balanced: "Kiegyensúlyozott",
	good: "Jó",
	increased: "Növekedett",
	insufficient: "Elégtelen",
	high: "Magas",
	low: "Alacsony",
	normal: "Normális",
	obese: "Kórosan elhízott",
	objective_achieved: "Cél elérve",
	objective_not_achieved: "Cél nem elérve",
	overweight: "Túlsúlyos",
	underweight: "Súlyhiányos",
	very_high: "Nagyon magas",
	very_low: "Nagyon alacsony"
};
var hu = {
	common: common$c,
	states: states$d,
	attributes: attributes$c,
	attributes_value: attributes_value$c,
	body: body$c,
	body_value: body_value$c,
	unit: unit$c,
	error: error$c,
	editor: editor$d,
	editor_body: editor_body$c,
	color_select: color_select$c,
	label_below: label_below$c
};

var hu$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    attributes: attributes$c,
    attributes_value: attributes_value$c,
    body: body$c,
    body_value: body_value$c,
    color_select: color_select$c,
    common: common$c,
    default: hu,
    editor: editor$d,
    editor_body: editor_body$c,
    error: error$c,
    label_below: label_below$c,
    states: states$d,
    unit: unit$c
});

var common$b = {
	version: "Versione",
	name: "Bodymiscale Card",
	description: "La card bodymiscale ti mostra il tuo peso/stato corporeo relativo.",
	not_available: "Bodymiscale non è disponibile",
	toggle_power: "Più dettagli come BMI kCal mostra / nascondi"
};
var states$c = {
	ok: "MISURAZIONE: OK",
	unknown: "STATO: sconosciuto",
	problem: "Problema",
	none: "Nessuno",
	weight_unavailable: "Peso non disponibile",
	impedance_unavailable: "Impedenza non disponibile",
	weight_unavailable_and_impedance_unavailable: "Peso e impedenza non disponibili",
	weight_low: "Peso basso",
	impedance_low: "Impedenza bassa",
	weight_low_and_impedance_low: "Peso e impedenza bassi",
	impedance_low_and_weight_low: "Impedenza e peso bassi",
	weight_high: "Peso alto",
	impedance_high: "Impedenza alta",
	weight_high_and_impedance_high: "Peso e impedenza alti",
	weight_high_and_impedance_low: "Peso alto, impedenza bassa",
	weight_low_and_impedance_high: "Peso basso, impedenza alta"
};
var attributes$b = {
	"weight: ": "Peso: ",
	"impedance: ": "Impedenza: ",
	"impedance_low: ": "Impedenza 50 kHz: ",
	"impedance_high: ": "Impedenza 250 kHz: ",
	"height: ": "Altezza: ",
	"age: ": "Età: ",
	"gender: ": "Sesso: "
};
var attributes_value$b = {
	male: "uomo",
	female: "donna",
	unavailable: "non disponibile"
};
var body$b = {
	bmi: "BMI",
	bmi_label: "BMI Categoria",
	visceral_fat: "Grasso viscerale",
	body_fat: "Grasso corporeo",
	protein: "Proteine",
	water: "Acqua",
	muscle_mass: "Massa muscolare",
	bone_mass: "Massa ossea",
	weight: "Peso",
	ideal: "Ideale",
	basal_metabolism: "Metabolismo base",
	body_type: "Tipo di corpo",
	metabolic_age: "Età metabolica",
	skeletal_muscle_mass: "Massa muscolare scheletrica",
	extracellular_water: "Acqua extracellulare",
	intracellular_water: "Acqua intracellulare",
	ecw_tbw_ratio: "Rapporto ECW/TBW",
	bcm: "Massa cellulare corporea"
};
var body_value$b = {
	skinny: "Magro",
	balanced_skinny: "Bilanciato-magro",
	skinny_muscular: "Magro-muscoloso",
	balanced: "Bilanciato",
	balanced_muscular: "Bilanciato-muscoloso",
	lack_exercise: "Manca-esercizio",
	thick_set: "Spesso-impostato",
	obese: "Obeso",
	overweight: "Sovrappeso",
	underweight: "Sottopeso",
	normal_or_healthy_weight: "Normale o Peso Sano",
	slight_overweight: "Leggermente in sovrappeso",
	moderate_obesity: "Obesità Moderata",
	severe_obesity: "Obesità Grave",
	massive_obesity: "Obesità Massiccia",
	unavailable: "non disponibile"
};
var unit$b = {
	" years": " anni"
};
var error$b = {
	invalid_config: "Configurazione non valida",
	missing_entity: "Perfavore definisci un'entità.",
	missing_entity_bodymiscale: "Perfavore definisci un'entità di tipo bodymiscale."
};
var editor$c = {
	configuration: "Configurazione",
	customization: "Personalizzazione",
	entity: "Perfavore seleziona un account sulla bilancia (richiesto) !",
	image: "Immagine di sfondo (opzionale)",
	icons_body: "Percorso delle icone (es: /local/images/bodyscoreIcon)",
	model: "Hai un sensore di impedenza?",
	model1: "Attiva questa funzione per misurazioni accurate della composizione corporea.",
	model_aria_label_on: "Abilita impedenza",
	model_aria_label_off: "Disabilita impedenza",
	dual_impedance: "Bilancia con doppia impedenza (50 kHz + 250 kHz)?",
	dual_impedance_aria_label_on: "Attiva doppia impedenza",
	dual_impedance_aria_label_off: "Disattiva doppia impedenza",
	unit: "Converti da kg a lbs",
	unit_aria_label_on: "Attiva la conversione",
	unit_aria_label_off: "Disattiva la conversione",
	theme: "Configura il tema che utilizzi.",
	theme_aria_label_on: "Attiva tema chiaro",
	theme_aria_label_off: "Disattiva tema oscuro",
	show_name: "Mostrare il nome dell'account come titolo  ?",
	show_name_aria_label_on: "Attiva la visione del nome",
	show_name_aria_label_off: "Disattiva la visione del nome",
	show_states: "Mostrare lo Stato ?",
	show_states_aria_label_on: "Attiva la visione dello stato",
	show_states_aria_label_off: "Disattiva la visione dello stato",
	show_attributes: "Mostrare i dati anagrafici personali (in alto a destra) ?",
	show_attributes_aria_label_on: "Attiva la visione degli attributi",
	show_attributes_aria_label_off: "Disattiva la visione degli attributi",
	show_always_details: "Mostra sempre i dettagli",
	show_always_details_aria_label_on: "Attiva la visualizzazione dettagliata predefinita",
	show_always_details_aria_label_off: "Disattiva la visualizzazione dettagliata predefinita",
	show_toolbar: "Mostrare opzioni avanzate ?",
	show_toolbar_aria_label_on: "Attiva opzioni avanzate",
	show_toolbar_aria_label_off: "Disattiva opzioni avanzate",
	show_body: "Offrire ulteriori dettagli di misurazione",
	show_body1: "(metà inferiore - l'icona con la spunta ve li mostrerà) ?",
	show_body_aria_label_on: "Attiva la visione del punteggio del corpo",
	show_body_aria_label_off: "Disattiva la visione del punteggio del corpo",
	show_buttons: "Consenti il cambio di account ?",
	show_buttons_aria_label_on: "Attiva la visione dei pulsanti",
	show_buttons_aria_label_off: "Disattiva la visione dei pulsanti",
	header_options: "1. Opzioni di intestazione della card",
	body_options: "2. Ulteriori opzioni della card",
	code_only_note: "ATTENZIONE: Le opzioni aggiuntive sono disponibili solo nella modalità editor di codice."
};
var editor_body$b = {
	from: "Da",
	icon_position: "Posizione icona",
	label_below: "Etichetta sotto",
	left: "A sinistra",
	minmax_position: "Posizione Min/Max",
	name_position: "Posizione nome",
	off: "Spento",
	on: "Attivo",
	right: "A destra",
	severity_generator_help: "Link alla guida sulla gravità",
	showabovelabels: "Mostra etichette sopra",
	showbelowlabels: "Mostra etichette sotto",
	to: "A",
	value_position: "Posizione valore"
};
var color_select$b = {
	color: "Colore",
	disabled: "Disabilitato",
	red: "Rosso",
	pink: "Rosa",
	purple: "Viola",
	"deep-purple": "Viola scuro",
	indigo: "Indaco",
	blue: "Blu",
	"light-blue": "Azzurro",
	cyan: "Ciano",
	teal: "Verde acqua",
	green: "Verde",
	"light-green": "Verde chiaro",
	lime: "Lime",
	yellow: "Giallo",
	amber: "Ambra",
	orange: "Arancione",
	orangered: "Arancione rosso",
	"deep-orange": "Arancione scuro",
	brown: "Marrone",
	"light-grey": "Grigio chiaro",
	grey: "Grigio",
	"dark-grey": "Grigio scuro",
	"blue-grey": "Blu grigio",
	darkgreen: "Verde scuro",
	royalblue: "Blu reale",
	black: "Nero",
	white: "Bianco"
};
var label_below$b = {
	balanced: "Bilanciato",
	good: "Buono",
	increased: "Aumentato",
	insufficient: "Insufficiente",
	high: "Alto",
	low: "Basso",
	normal: "Normale",
	obese: "Obeso",
	objective_achieved: "Obiettivo raggiunto",
	objective_not_achieved: "Obiettivo non raggiunto",
	overweight: "Sovrappeso",
	underweight: "Sottopeso",
	very_high: "Molto alto",
	very_low: "Molto basso"
};
var it = {
	common: common$b,
	states: states$c,
	attributes: attributes$b,
	attributes_value: attributes_value$b,
	body: body$b,
	body_value: body_value$b,
	unit: unit$b,
	error: error$b,
	editor: editor$c,
	editor_body: editor_body$b,
	color_select: color_select$b,
	label_below: label_below$b
};

var it$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    attributes: attributes$b,
    attributes_value: attributes_value$b,
    body: body$b,
    body_value: body_value$b,
    color_select: color_select$b,
    common: common$b,
    default: it,
    editor: editor$c,
    editor_body: editor_body$b,
    error: error$b,
    label_below: label_below$b,
    states: states$c,
    unit: unit$b
});

var common$a = {
	version: "Version",
	name: "Bodymiscale Card",
	description: "ボディミスケール カードは、体重や関連する身体の状態を表示します。",
	not_available: "Bodymiscale は利用できません",
	toggle_power: "BMI kCal などの詳細を表示/非表示"
};
var states$b = {
	ok: "測定: OK",
	unknown: "状態: 不明",
	problem: "問題",
	none: "なし",
	weight_unavailable: "体重が利用できません",
	impedance_unavailable: "インピーダンスが利用できません",
	weight_unavailable_and_impedance_unavailable: "体重とインピーダンスが利用できません",
	weight_low: "体重が低い",
	impedance_low: "インピーダンスが低い",
	weight_low_and_impedance_low: "体重とインピーダンスが低い",
	impedance_low_and_weight_low: "インピーダンスと体重が低い",
	weight_high: "体重が高い",
	impedance_high: "インピーダンス高",
	weight_high_and_impedance_high: "体重とインピーダンスが高い",
	weight_high_and_impedance_low: "体重は高いが、インピーダンスは低い",
	weight_low_and_impedance_high: "体重は低く、インピーダンスは高い"
};
var attributes$a = {
	"weight: ": "体重: ",
	"impedance: ": "インピーダンス: ",
	"impedance_low: ": "インピーダンス 50 kHz: ",
	"impedance_high: ": "インピーダンス 250 kHz: ",
	"height: ": "高さ: ",
	"age: ": "年齢: ",
	"gender: ": "性別: "
};
var attributes_value$a = {
	male: "男性",
	female: "女性",
	unavailable: "利用不可"
};
var body$a = {
	bmi: "BMI",
	bmi_label: "BMI ラベル",
	visceral_fat: "内臓脂肪",
	body_fat: "体脂肪",
	protein: "タンパク質",
	water: "水分",
	muscle_mass: "筋肉量",
	bone_mass: "骨量",
	weight: "体重",
	ideal: "理想",
	basal_metabolism: "基礎代謝",
	body_type: "体型",
	metabolic_age: "代謝年齢",
	skeletal_muscle_mass: "骨格筋量",
	extracellular_water: "細胞外水分",
	intracellular_water: "細胞内水分",
	ecw_tbw_ratio: "ECW/TBW 比率",
	bcm: "体細胞量"
};
var body_value$a = {
	skinny: "痩せすぎ",
	balanced_skinny: "バランスの取れた瘦せ型",
	skinny_muscular: "細身筋肉質",
	balanced: "バランスの取れた",
	balanced_muscular: "バランスの取れた筋肉質",
	lack_exercise: "運動不足",
	thick_set: "がっしり体型",
	obese: "肥満",
	overweight: "太りすぎ",
	underweight: "低体重",
	normal_or_healthy_weight: "正常または健康的な体重",
	slight_overweight: "少し太りすぎ",
	moderate_obesity: "中程度の肥満",
	severe_obesity: "重度の肥満",
	massive_obesity: "極度の肥満",
	unavailable: "利用不可"
};
var unit$a = {
	" years": " 年齢"
};
var error$a = {
	invalid_config: "無効な設定です",
	missing_entity: "エンティティを設定して下さい。",
	missing_entity_bodymiscale: "bodymiscale エンティティを定義してください。"
};
var editor$b = {
	configuration: "設定",
	customization: "カスタマイズ",
	entity: "スケール上のアカウントを選択してください (必須)!",
	image: "背景画像（オプション）",
	icons_body: "アイコンのパス (例: /local/images/bodyscoreIcon)",
	model: "インピーダンスセンサーはありますか?",
	model1: "正確な体組成測定のためにこの機能を有効にしてください。",
	model_aria_label_on: "インピーダンスを有効にする",
	model_aria_label_off: "インピーダンスを無効にする",
	dual_impedance: "デュアルインピーダンス対応体重計 (50 kHz + 250 kHz)?",
	dual_impedance_aria_label_on: "デュアルインピーダンスを有効にする",
	dual_impedance_aria_label_off: "デュアルインピーダンスを無効にする",
	unit: "kg を lbs に変換する",
	unit_aria_label_on: "変換をオンに切り替えます",
	unit_aria_label_off: "変換をオフに切り替えます",
	theme: "使用するテーマを設定します。",
	theme_aria_label_on: "テーマライトをオンに切り替えます",
	theme_aria_label_off: "テーマダークをオフに切り替えます",
	show_name: "アカウント名をタイトルとして表示しますか?",
	show_name_aria_label_on: "表示名をオンに切り替えます",
	show_name_aria_label_off: "表示名をオフに切り替えます",
	show_states: "状態を表示しますか?",
	show_states_aria_label_on: "表示状態をオンに切り替えます",
	show_states_aria_label_off: "表示状態をオフに切り替えます",
	show_attributes: "個人マスターデータを表示しますか (右上)?",
	show_attributes_aria_label_on: "表示属性をオンに切り替えます",
	show_attributes_aria_label_off: "表示属性をオフに切り替えます",
	show_always_details: "常に詳細を表示する",
	show_always_details_aria_label_on: "デフォルトの詳細ビューをオンに切り替えます",
	show_always_details_aria_label_off: "デフォルトの詳細ビューをオフに切り替えます",
	show_toolbar: "詳細オプションを表示しますか?",
	show_toolbar_aria_label_on: "詳細オプションの表示をオンに切り替えます",
	show_toolbar_aria_label_off: "詳細オプションの表示をオフに切り替えます",
	show_body: "測定の詳細をさらに表示する",
	show_body1: "(下半分 - 下向きの矢印アイコンが表示されます)?",
	show_body_aria_label_on: "ボディスコアの表示をオンに切り替えます",
	show_body_aria_label_off: "ボディスコアの表示をオフに切り替えます",
	show_buttons: "アカウントの切り替えを許可しますか?",
	show_buttons_aria_label_on: "表示ボタンをオンに切り替えます",
	show_buttons_aria_label_off: "表示ボタンをオフに切り替えます",
	header_options: "1. カード ヘッダー オプション",
	body_options: "2. その他のカードオプション",
	code_only_note: "注意: 追加オプションはコード エディターでのみ使用できます。"
};
var editor_body$a = {
	from: "から",
	icon_position: "アイコンの位置",
	label_below: "下のラベル",
	left: "左",
	minmax_position: "最小/最大の位置",
	name_position: "名前の位置",
	off: "オフ",
	on: "オン",
	right: "右",
	severity_generator_help: "重症度ヘルプへのリンク",
	showabovelabels: "ラベルを上に表示",
	showbelowlabels: "ラベルを下に表示",
	to: "へ",
	value_position: "値の位置"
};
var color_select$a = {
	color: "色",
	disabled: "無効",
	red: "赤",
	pink: "ピンク",
	purple: "紫",
	"deep-purple": "濃い紫",
	indigo: "インディゴ",
	blue: "青",
	"light-blue": "水色",
	cyan: "シアン",
	teal: "ティール",
	green: "緑",
	"light-green": "薄緑",
	lime: "ライム",
	yellow: "黄色",
	amber: "アンバー",
	orange: "オレンジ",
	orangered: "赤橙色",
	"deep-orange": "濃いオレンジ",
	brown: "茶色",
	"light-grey": "ライトグレー",
	grey: "グレー",
	"dark-grey": "ダークグレー",
	"blue-grey": "青灰色",
	darkgreen: "ダークグリーン",
	royalblue: "ロイヤルブルー",
	black: "黒",
	white: "白"
};
var label_below$a = {
	balanced: "バランスの取れた",
	good: "良い",
	increased: "増加",
	insufficient: "不十分",
	high: "高い",
	low: "低い",
	normal: "正常",
	obese: "肥満",
	objective_achieved: "目標達成",
	objective_not_achieved: "目標未達成",
	overweight: "太りすぎ",
	underweight: "低体重",
	very_high: "非常に高い",
	very_low: "非常に低い"
};
var ja = {
	common: common$a,
	states: states$b,
	attributes: attributes$a,
	attributes_value: attributes_value$a,
	body: body$a,
	body_value: body_value$a,
	unit: unit$a,
	error: error$a,
	editor: editor$b,
	editor_body: editor_body$a,
	color_select: color_select$a,
	label_below: label_below$a
};

var ja$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    attributes: attributes$a,
    attributes_value: attributes_value$a,
    body: body$a,
    body_value: body_value$a,
    color_select: color_select$a,
    common: common$a,
    default: ja,
    editor: editor$b,
    editor_body: editor_body$a,
    error: error$a,
    label_below: label_below$a,
    states: states$b,
    unit: unit$a
});

var common$9 = {
	version: "Versie",
	name: "Bodymiscale Card",
	description: "De bodymiscale kaart toont u uw gewicht / gerelateerde lichaamsstatus.",
	not_available: "Bodymiscale is niet beschikbaar",
	toggle_power: "Meer details zoals BMI kCal tonen / verbergen"
};
var states$a = {
	ok: "METING: OK",
	unknown: "STATUS: onbekend",
	problem: "Probleem",
	none: "Geen",
	weight_unavailable: "Gewicht niet beschikbar",
	impedance_unavailable: "Impedantie niet beschikbaar",
	weight_unavailable_and_impedance_unavailable: "Gewicht en impedantie niet beschikbaar",
	weight_low: "Gewicht laag",
	impedance_low: "Impedantie laag",
	weight_low_and_impedance_low: "Laag gewicht en impedantie",
	impedance_low_and_weight_low: "Lage impedantie en gewicht",
	weight_high: "Gewicht hoog",
	impedance_high: "Impedantie hoog",
	weight_high_and_impedance_high: "Hoog gewicht en impedantie",
	weight_high_and_impedance_low: "Gewicht hoog, impedantie laag",
	weight_low_and_impedance_high: "Gewicht laag, impedantie hoog"
};
var attributes$9 = {
	"weight: ": "Gewicht: ",
	"impedance: ": "Impedantie: ",
	"impedance_low: ": "Impedantie 50 kHz: ",
	"impedance_high: ": "Impedantie 250 kHz: ",
	"height: ": "Lengte: ",
	"age: ": "Leeftijd: ",
	"gender: ": "Geslacht: "
};
var attributes_value$9 = {
	male: "man",
	female: "vrouw",
	unavailable: "niet beschikbaar"
};
var body$9 = {
	bmi: "BMI",
	bmi_label: "BMI label",
	visceral_fat: "Visceraal vet",
	body_fat: "Lichaamsvet",
	protein: "Proteine",
	water: "Water",
	muscle_mass: "Spiermassa",
	bone_mass: "Botgewicht",
	weight: "Gewicht",
	ideal: "Ideaal",
	basal_metabolism: "Basaal metabolisme",
	body_type: "Lichaamstype",
	metabolic_age: "Metabolistische leeftijd",
	skeletal_muscle_mass: "Skeletspiermassa",
	extracellular_water: "Extracellulair water",
	intracellular_water: "Intracellulair water",
	ecw_tbw_ratio: "ECW/TBW-ratio",
	bcm: "Lichaamscelmassa"
};
var body_value$9 = {
	skinny: "Mager",
	balanced_skinny: "Gebalanceerd-mager",
	skinny_muscular: "Mager-gespierd",
	balanced: "Gebalanceerd",
	balanced_muscular: "Gebalanceerd-gespierd",
	lack_exercise: "Weinig-beweging",
	thick_set: "Dik",
	obese: "Obesitas",
	overweight: "Overgewicht",
	underweight: "Ondergewicht",
	normal_or_healthy_weight: "Normaal of gezond gewicht",
	slight_overweight: "Licht overgewicht",
	moderate_obesity: "Gemiddeld overgewicht",
	severe_obesity: "Ruim overgewicht",
	massive_obesity: "Enorm overgewicht",
	unavailable: "niet beschikbaar"
};
var unit$9 = {
	" years": " jaren"
};
var error$9 = {
	invalid_config: "Ongeldige configuratie",
	missing_entity: "Geef een entiteit in.",
	missing_entity_bodymiscale: "Geef een bodymiscale entiteit in."
};
var editor$a = {
	configuration: "Configuratie",
	customization: "Aanpassing",
	entity: "Kies een account op de schaal (verplicht) !",
	image: "Achtergrondafbeelding (facultatief)",
	icons_body: "Icoonpad (bijv. /local/images/bodyscoreIcon)",
	model: "Heeft u een impedantie sensor?",
	model1: "Activeer deze functie voor nauwkeurige metingen van de lichaamssamenstelling.",
	model_aria_label_on: "Impedantie inschakelen",
	model_aria_label_off: "Impedantie uitschakelen",
	dual_impedance: "Weegschaal met dubbele impedantie (50 kHz + 250 kHz)?",
	dual_impedance_aria_label_on: "Dubbele impedantie inschakelen",
	dual_impedance_aria_label_off: "Dubbele impedantie uitschakelen",
	unit: "Converteer kg naar lbs",
	unit_aria_label_on: "Activeer conversie",
	unit_aria_label_off: "Conversie deactiveren",
	theme: "Configureer het thema dat u gebruikt.",
	theme_aria_label_on: "Licht thema inschakelen",
	theme_aria_label_off: "Donker thema uitschakelen",
	show_name: "Toon de naam van de rekening als titel ?",
	show_name_aria_label_on: "Zet naam aan",
	show_name_aria_label_off: "Zet naam uit",
	show_states: "Geef status weer ?",
	show_states_aria_label_on: "Zet status aan",
	show_states_aria_label_off: "Zet status uit",
	show_attributes: "Persoonlijke stamgegevens weergeven (rechtsboven) ?",
	show_attributes_aria_label_on: "Zet attributen aan",
	show_attributes_aria_label_off: "Zet attributen uit",
	show_always_details: "Toon altijd details",
	show_always_details_aria_label_on: "Zet standaard detailweergave aan",
	show_always_details_aria_label_off: "Zet standaard detailweergave uit",
	show_toolbar: "Toon geavanceerde opties ?",
	show_toolbar_aria_label_on: "Zet knoppenbalk aan",
	show_toolbar_aria_label_off: "Zet knoppenbalk uit",
	show_body: "Bieden verdere meting details",
	show_body1: "(onderste helft - pictogram chevron naar beneden zal tonen die) ?",
	show_body_aria_label_on: "Zet lichaamsscore aan",
	show_body_aria_label_off: "Zet lichaamsscore uit",
	show_buttons: "Accountwissel toestaan ?",
	show_buttons_aria_label_on: "Zet knoppen aan",
	show_buttons_aria_label_off: "Zet knoppen uit",
	header_options: "1. Kaart koptekst opties",
	body_options: "2. Meer boordopties",
	code_only_note: "LET OP: Extra opties zijn alleen beschikbaar in de code editor."
};
var editor_body$9 = {
	from: "Van",
	icon_position: "Pictogrampositie",
	label_below: "Label eronder",
	left: "Links",
	minmax_position: "Min/Max Positie",
	name_position: "Naam Positie",
	off: "Uit",
	on: "Aan",
	right: "Rechts",
	severity_generator_help: "Link naar de help voor ernst",
	showabovelabels: "Labels boven weergeven",
	showbelowlabels: "Labels onder weergeven",
	to: "Naar",
	value_position: "Waarde Positie"
};
var color_select$9 = {
	color: "Kleur",
	disabled: "Uitgeschakeld",
	red: "Rood",
	pink: "Roze",
	purple: "Paars",
	"deep-purple": "Dieppaars",
	indigo: "Indigo",
	blue: "Blauw",
	"light-blue": "Lichtblauw",
	cyan: "Cyaan",
	teal: "Blauwgroen",
	green: "Groen",
	"light-green": "Lichtgroen",
	lime: "Limoen",
	yellow: "Geel",
	amber: "Amber",
	orange: "Oranje",
	orangered: "Rood-oranje",
	"deep-orange": "Dieporanje",
	brown: "Bruin",
	"light-grey": "Lichtgrijs",
	grey: "Grijs",
	"dark-grey": "Donkergrijs",
	"blue-grey": "Blauwgrijs",
	darkgreen: "Donkergroen",
	royalblue: "Koningsblauw",
	black: "Zwart",
	white: "Wit"
};
var label_below$9 = {
	balanced: "Gebalanceerd",
	good: "Goed",
	increased: "Verhoogd",
	insufficient: "Onvoldoende",
	high: "Hoog",
	low: "Laag",
	normal: "Normaal",
	obese: "Obesitas",
	objective_achieved: "Doel bereikt",
	objective_not_achieved: "Doel niet bereikt",
	overweight: "Overgewicht",
	underweight: "Ondergewicht",
	very_high: "Zeer hoog",
	very_low: "Zeer laag"
};
var nl = {
	common: common$9,
	states: states$a,
	attributes: attributes$9,
	attributes_value: attributes_value$9,
	body: body$9,
	body_value: body_value$9,
	unit: unit$9,
	error: error$9,
	editor: editor$a,
	editor_body: editor_body$9,
	color_select: color_select$9,
	label_below: label_below$9
};

var nl$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    attributes: attributes$9,
    attributes_value: attributes_value$9,
    body: body$9,
    body_value: body_value$9,
    color_select: color_select$9,
    common: common$9,
    default: nl,
    editor: editor$a,
    editor_body: editor_body$9,
    error: error$9,
    label_below: label_below$9,
    states: states$a,
    unit: unit$9
});

var common$8 = {
	version: "Wersja",
	name: "Karta Bodymiscale",
	description: "Karta BodyMiScale pokazuje Twoją wagę oraz parametry ciała.",
	not_available: "Bodymiscale jest niedostępna",
	toggle_power: "Więcej szczegółów jak BMI kCal - pokaż / ukryj"
};
var states$9 = {
	ok: "POMIAR: OK",
	unknown: "STATUS: nieznany",
	problem: "Problem",
	none: "Brak",
	weight_unavailable: "Waga niedostępna",
	impedance_unavailable: "Impedancja niedostępna",
	weight_unavailable_and_impedance_unavailable: "Waga i impedancja niedostępne",
	weight_low: "Niska waga",
	impedance_low: "Niska impedancja",
	weight_low_and_impedance_low: "Niska waga i impedancja",
	impedance_low_and_weight_low: "Niska impedancja i waga",
	weight_high: "Waga wysoka",
	impedance_high: "Impedancja wysoka",
	weight_high_and_impedance_high: "Wysoka waga i impedancja",
	weight_high_and_impedance_low: "Waga wysoka a impedancja niska",
	weight_low_and_impedance_high: "Waga nizska a impedancja wysoka"
};
var attributes$8 = {
	"weight: ": "Waga: ",
	"impedance: ": "Impedancja: ",
	"impedance_low: ": "Impedancja 50 kHz: ",
	"impedance_high: ": "Impedancja 250 kHz: ",
	"height: ": "Wzrost: ",
	"age: ": "Wiek: ",
	"gender: ": "Płeć: "
};
var attributes_value$8 = {
	male: "męska",
	female: "żeńska",
	unavailable: "niedstępna"
};
var body$8 = {
	bmi: "BMI",
	bmi_label: "BMI label",
	visceral_fat: "Tłuszcz brzuszny",
	body_fat: "Tłuszcz Ciała",
	protein: "Białko",
	water: "Woda",
	muscle_mass: "Masa mięśniowa",
	bone_mass: "Masa kostna",
	weight: "Waga",
	ideal: "Idealna",
	basal_metabolism: "Metabolizm podstawowy",
	body_type: "Typ sylwetki",
	metabolic_age: "Wiek metaboliczny",
	skeletal_muscle_mass: "Masa mięśni szkieletowych",
	extracellular_water: "Woda zewnątrzkomórkowa",
	intracellular_water: "Woda wewnątrzkomórkowa",
	ecw_tbw_ratio: "Stosunek ECW/TBW",
	bcm: "Masa komórkowa ciała"
};
var body_value$8 = {
	skinny: "Chudy",
	balanced_skinny: "Umiarkowanie chudy",
	skinny_muscular: "Chudy muskularny",
	balanced: "Zrównoważony",
	balanced_muscular: "Zrównoważony muskularny",
	lack_exercise: "Mało aktywny",
	thick_set: "Gruby",
	obese: "Otyły",
	overweight: "Nadwaga",
	underweight: "Niedowaga",
	normal_or_healthy_weight: "Normalna lub zdrowa waga",
	slight_overweight: "Lekka nadwaga",
	moderate_obesity: "Lekka otyłość",
	severe_obesity: "Średnia otyłość",
	massive_obesity: "Poważna otyłość",
	unavailable: "niedostępny"
};
var unit$8 = {
	" years": " lat"
};
var error$8 = {
	invalid_config: "Nieprawidłowa konfiguracja",
	missing_entity: "Proszę zdefiniuj encje.",
	missing_entity_bodymiscale: "Proszę zdefiniuj encję bodymiscale."
};
var editor$9 = {
	configuration: "Konfiguracja",
	customization: "Personalizacja",
	entity: "Proszę wybierz konto na wadze (wymagane)!",
	image: "Obraz tła (opcjonalne)",
	icons_body: "Ścieżka ikon (np. /local/images/bodyscoreIcon)",
	model: "Czy masz czujnik impedancji?",
	model1: "Włącz tę funkcję, aby uzyskać dokładne pomiary składu ciała.",
	model_aria_label_on: "Włącz impedancję",
	model_aria_label_off: "Wyłącz impedancję",
	dual_impedance: "Waga z podwójną impedancją (50 kHz + 250 kHz)?",
	dual_impedance_aria_label_on: "Włącz podwójną impedancję",
	dual_impedance_aria_label_off: "Wyłącz podwójną impedancję",
	unit: "Zamień kg na lbs",
	unit_aria_label_on: "Włącz opcję konwersji",
	unit_aria_label_off: "Włącz opcję konwersji",
	theme: "Wybierz rodza motywu.",
	theme_aria_label_on: "Włącz jasny motyw",
	theme_aria_label_off: "Włącz ciemny motyw",
	show_name: "Użyć imienia jako tytułu karty?",
	show_name_aria_label_on: "Włącz opcję imienia jako tytułu",
	show_name_aria_label_off: "Wyłącz opcję imienia jako tytułu",
	show_states: "Wyświetlić stan?",
	show_states_aria_label_on: "Włącz wyświetlanie stanu",
	show_states_aria_label_off: "Wyłącz wyświetlanie stanu",
	show_attributes: "Show personal master data (gora po prawej)?",
	show_attributes_aria_label_on: "Toggle display attributes on",
	show_attributes_aria_label_off: "Toggle display attributes off",
	show_always_details: "Zawsze pokazuj szczegóły",
	show_always_details_aria_label_on: "Włącz domyślny widok szczegółów",
	show_always_details_aria_label_off: "Wyłącz domyślny widok szczegółów",
	show_toolbar: "Pokazać zaawansowane opcje?",
	show_toolbar_aria_label_on: "Włącz zaawansowane opcje",
	show_toolbar_aria_label_off: "Wyłącz zaawansowane opcje",
	show_body: "Offer further measurement details",
	show_body1: "(lower half - icon chevron down will show those)?",
	show_body_aria_label_on: "Toggle display body score on",
	show_body_aria_label_off: "Toggle display body score off",
	show_buttons: "Allow account switch?",
	show_buttons_aria_label_on: "Toggle display buttons on",
	show_buttons_aria_label_off: "Toggle display buttons off",
	header_options: "1. Opcje nagłówka",
	body_options: "2. Więcej opcji karty",
	code_only_note: "UWAGA: Dodatkowe opcje dostępne są tylko poprzez edycje kodu."
};
var editor_body$8 = {
	from: "Od",
	icon_position: "Pozycja ikony",
	label_below: "Etykieta poniżej",
	left: "Po lewej",
	minmax_position: "Pozycja Min/Max",
	name_position: "Pozycja nazwy",
	off: "Wyłącz",
	on: "Włączone",
	right: "Po prawej",
	severity_generator_help: "Link do pomocy dotyczącej ważności",
	showabovelabels: "Pokaż etykiety powyżej",
	showbelowlabels: "Pokaż etykiety poniżej",
	to: "Do",
	value_position: "Pozycja wartości"
};
var color_select$8 = {
	color: "Kolor",
	disabled: "Wyłączone",
	red: "Czerwony",
	pink: "Różowy",
	purple: "Fioletowy",
	"deep-purple": "Ciemnofioletowy",
	indigo: "Indygo",
	blue: "Niebieski",
	"light-blue": "Jasnoniebieski",
	cyan: "Błękitny",
	teal: "Nadmorskizielony",
	green: "Zielony",
	"light-green": "Jasnozielony",
	lime: "Limonkowy",
	yellow: "Żółty",
	amber: "Bursztynowy",
	orange: "Pomarańczowy",
	orangered: "Czerwono-pomarańczowy",
	"deep-orange": "Ciemnopomarańczowy",
	brown: "Brązowy",
	"light-grey": "Jasnoszary",
	grey: "Szary",
	"dark-grey": "Ciemnoszary",
	"blue-grey": "Niebieskoszary",
	darkgreen: "Ciemnozielony",
	royalblue: "Królestwo Niebieskie",
	black: "Czarny",
	white: "Biały"
};
var label_below$8 = {
	balanced: "Zrównoważony",
	good: "Dobry",
	increased: "Zwiększony",
	insufficient: "Niewystarczający",
	high: "Wysoki",
	low: "Niski",
	normal: "Normalny",
	obese: "Otyły",
	objective_achieved: "Cel osiągnięty",
	objective_not_achieved: "Cel nieosiągnięty",
	overweight: "Nadwaga",
	underweight: "Niedowaga",
	very_high: "Bardzo wysoki",
	very_low: "Bardzo niski"
};
var pl = {
	common: common$8,
	states: states$9,
	attributes: attributes$8,
	attributes_value: attributes_value$8,
	body: body$8,
	body_value: body_value$8,
	unit: unit$8,
	error: error$8,
	editor: editor$9,
	editor_body: editor_body$8,
	color_select: color_select$8,
	label_below: label_below$8
};

var pl$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    attributes: attributes$8,
    attributes_value: attributes_value$8,
    body: body$8,
    body_value: body_value$8,
    color_select: color_select$8,
    common: common$8,
    default: pl,
    editor: editor$9,
    editor_body: editor_body$8,
    error: error$8,
    label_below: label_below$8,
    states: states$9,
    unit: unit$8
});

var common$7 = {
	version: "Versão",
	name: "Bodymiscale Card",
	description: "O cartão bodymiscale mostra-lhe o estado do seu corpo em relação ao peso.",
	not_available: "Bodymiscale não é avaialável",
	toggle_power: "Mais detalhes como o kCal show / hide da BMI"
};
var states$8 = {
	ok: "MEDIÇÃO: OK",
	unknown: "ESTATUTO: desconhecido",
	problem: "Problema",
	none: "Nenhum",
	weight_unavailable: "Peso indisponível",
	impedance_unavailable: "Impedance indisponível",
	weight_unavailable_and_impedance_unavailable: "Peso e impedância indisponíveis",
	weight_low: "Peso baixo",
	impedance_low: "Impedância baixa",
	weight_low_and_impedance_low: "Peso e impedância baixos",
	impedance_low_and_weight_low: "Impedância e peso baixos",
	weight_high: "Peso alto",
	impedance_high: "Impedância alta",
	weight_high_and_impedance_high: "Peso e impedância altos",
	weight_high_and_impedance_low: "Peso alto, impedância baixa",
	weight_low_and_impedance_high: "Peso baixo, impedância alta"
};
var attributes$7 = {
	"weight: ": "Peso: ",
	"impedance: ": "Impedância: ",
	"impedance_low: ": "Impedância 50 kHz: ",
	"impedance_high: ": "Impedância 250 kHz: ",
	"height: ": "Cintura: ",
	"age: ": "Idade: ",
	"gender: ": "Gênero: "
};
var attributes_value$7 = {
	male: "macho",
	female: "fêmea",
	unavailable: "indisponível"
};
var body$7 = {
	bmi: "IMC",
	bmi_label: "Etiqueta IMC",
	visceral_fat: "Gordura visceral",
	body_fat: "Gordura corporal",
	protein: "Proteína",
	water: "Água",
	muscle_mass: "Massa muscular",
	bone_mass: "Massa óssea",
	weight: "Peso",
	ideal: "Ideal",
	basal_metabolism: "Metabolismo basal",
	body_type: "Tipo de corpo",
	metabolic_age: "Idade metabólica",
	skeletal_muscle_mass: "Massa muscular esquelética",
	extracellular_water: "Água extracelular",
	intracellular_water: "Água intracelular",
	ecw_tbw_ratio: "Razão ECW/TBW",
	bcm: "Massa celular corporal"
};
var body_value$7 = {
	skinny: "Magro",
	balanced_skinny: "Magro equilibrado",
	skinny_muscular: "Magro musculoso",
	balanced: "Equilibrado",
	balanced_muscular: "Musculoso equilibrado",
	lack_exercise: "Falta de exercício",
	thick_set: "Grosso-conjunto",
	obese: "Obeso",
	overweight: "Sobrepeso",
	underweight: "Underweight",
	normal_or_healthy_weight: "Normal",
	slight_overweight: "Ligeiro acima do peso",
	moderate_obesity: "Obesidade moderada",
	severe_obesity: "Obesidade severa",
	massive_obesity: "Obesidade maciça",
	unavailable: "indisponível"
};
var unit$7 = {
	" years": " Anos"
};
var error$7 = {
	invalid_config: "Configuração inválida",
	missing_entity: "Por favor, defina uma entidade.",
	missing_entity_bodymiscale: "Por favor, defina uma entidade bodymiscale."
};
var editor$8 = {
	configuration: "Configuração",
	customization: "Personalização",
	entity: "Por favor, escolha uma conta na escala (obrigatório) !",
	image: "Imagem de fundo (opcional)",
	icons_body: "Caminho dos ícones (ex: /local/images/bodyscoreIcon)",
	model: "Você tem um sensor de impedância?",
	model1: "Ative esta função para medições precisas da composição corporal.",
	model_aria_label_on: "Ativar impedância",
	model_aria_label_off: "Desativar impedância",
	dual_impedance: "Balança com impedância dupla (50 kHz + 250 kHz)?",
	dual_impedance_aria_label_on: "Ativar impedância dupla",
	dual_impedance_aria_label_off: "Desativar impedância dupla",
	unit: "Converter kg em libras",
	unit_aria_label_on: "Ativar a conversão",
	unit_aria_label_off: "Desativar a conversão",
	theme: "Configure o tema que você utiliza.",
	theme_aria_label_on: "Ativar tema claro",
	theme_aria_label_off: "Desativar tema escuro",
	show_name: "Mostrar o nome da conta como título ?",
	show_name_aria_label_on: "Alternar o nome da exibição",
	show_name_aria_label_off: "Alternar o nome da exibição",
	show_states: "Mostrar Estado ?",
	show_states_aria_label_on: "Alternar estado de exibição ligado",
	show_states_aria_label_off: "Alternar estado de exibição fora",
	show_attributes: "Mostrar dados mestres pessoais (canto superior direito) ?",
	show_attributes_aria_label_on: "Alternar atributos de exibição em",
	show_attributes_aria_label_off: "Alternar atributos de exibição fora",
	show_always_details: "Mostrar sempre detalhes",
	show_always_details_aria_label_on: "Alternar a visualização de detalhes padrão em",
	show_always_details_aria_label_off: "Alternar a visualização de detalhes padrão fora",
	show_toolbar: "Mostrar opções avançadas ?",
	show_toolbar_aria_label_on: "Alternar a barra de ferramentas do display em",
	show_toolbar_aria_label_off: "Alternar barra de ferramentas de exibição fora",
	show_body: "Oferecer mais detalhes de medição",
	show_body1: "(parte inferior - ícone chevron down mostrará aqueles) ?",
	show_body_aria_label_on: "Alternar a pontuação do corpo do display em",
	show_body_aria_label_off: "Alternar a pontuação do corpo do display fora",
	show_buttons: "Permitir a troca de conta ?",
	show_buttons_aria_label_on: "Alternar botões de exibição",
	show_buttons_aria_label_off: "Alternar botões de exibição desligados",
	header_options: "1. Opções do cabeçalho do cartão",
	body_options: "2. Mais opções de placas",
	code_only_note: "CUIDADO: Opções adicionais estão disponíveis apenas no editor de código."
};
var editor_body$7 = {
	from: "De",
	icon_position: "Posição do ícone",
	label_below: "Etiqueta abaixo",
	left: "À esquerda",
	minmax_position: "Posição Min/Max",
	name_position: "Posição do nome",
	off: "Desligado",
	on: "Ligado",
	right: "À direita",
	severity_generator_help: "Link para a ajuda de severidade",
	showabovelabels: "Mostrar etiquetas acima",
	showbelowlabels: "Mostrar etiquetas abaixo",
	to: "Para",
	value_position: "Posição do valor"
};
var color_select$7 = {
	color: "Cor",
	disabled: "Desativado",
	red: "Vermelho",
	pink: "Rosa",
	purple: "Roxo",
	"deep-purple": "Roxo escuro",
	indigo: "Índigo",
	blue: "Azul",
	"light-blue": "Azul claro",
	cyan: "Ciano",
	teal: "Azul esverdeado",
	green: "Verde",
	"light-green": "Verde claro",
	lime: "Lima",
	yellow: "Amarelo",
	amber: "Âmbar",
	orange: "Laranja",
	orangered: "Laranja avermelhado",
	"deep-orange": "Laranja escuro",
	brown: "Marrom",
	"light-grey": "Cinza claro",
	grey: "Cinza",
	"dark-grey": "Cinza escuro",
	"blue-grey": "Cinza azulado",
	darkgreen: "Verde escuro",
	royalblue: "Azul real",
	black: "Preto",
	white: "Branco"
};
var label_below$7 = {
	balanced: "Equilibrado",
	good: "Bom",
	increased: "Aumentado",
	insufficient: "Insuficiente",
	high: "Alto",
	low: "Baixo",
	normal: "Normal",
	obese: "Obeso",
	objective_achieved: "Objetivo alcançado",
	objective_not_achieved: "Objetivo não alcançado",
	overweight: "Acima do peso normal",
	underweight: "Abaixo do peso normal",
	very_high: "Muito alto",
	very_low: "Muito baixo"
};
var ptBR = {
	common: common$7,
	states: states$8,
	attributes: attributes$7,
	attributes_value: attributes_value$7,
	body: body$7,
	body_value: body_value$7,
	unit: unit$7,
	error: error$7,
	editor: editor$8,
	editor_body: editor_body$7,
	color_select: color_select$7,
	label_below: label_below$7
};

var pt_BR = /*#__PURE__*/Object.freeze({
    __proto__: null,
    attributes: attributes$7,
    attributes_value: attributes_value$7,
    body: body$7,
    body_value: body_value$7,
    color_select: color_select$7,
    common: common$7,
    default: ptBR,
    editor: editor$8,
    editor_body: editor_body$7,
    error: error$7,
    label_below: label_below$7,
    states: states$8,
    unit: unit$7
});

var common$6 = {
	version: "Versão",
	name: "Bodymiscale Card",
	description: "O cartão bodymiscale mostra-lhe o estado do seu corpo em relação ao peso.",
	not_available: "Bodymiscale não está disponível",
	toggle_power: "Mostrando/escondendo mais detalhes tal como o kCal,IMC"
};
var states$7 = {
	ok: "MEDIÇÃO: OK",
	unknown: "ESTATUTO: desconhecido",
	problem: "Problema",
	none: "Nenhum",
	weight_unavailable: "Peso indisponível",
	impedance_unavailable: "Impedância indisponível",
	weight_unavailable_and_impedance_unavailable: "Peso e impedância indisponíveis",
	weight_low: "Peso baixo",
	impedance_low: "Impedância baixa",
	weight_low_and_impedance_low: "Peso e impedância baixos",
	impedance_low_and_weight_low: "Impedância e peso baixos",
	weight_high: "Peso alto",
	impedance_high: "Impedância alta",
	weight_high_and_impedance_high: "Peso e impedância altos",
	weight_high_and_impedance_low: "Peso alto, impedância baixa",
	weight_low_and_impedance_high: "Peso baixo, impedância alta"
};
var attributes$6 = {
	"weight: ": "Peso: ",
	"impedance: ": "Impedância: ",
	"impedance_low: ": "Impedância 50 kHz: ",
	"impedance_high: ": "Impedância 250 kHz: ",
	"height: ": "Altura: ",
	"age: ": "Idade: ",
	"gender: ": "Gênero: "
};
var attributes_value$6 = {
	male: "masculino",
	female: "femenino",
	unavailable: "indisponível"
};
var body$6 = {
	bmi: "IMC",
	bmi_label: "Etiqueta IMC",
	visceral_fat: "Gordura visceral",
	body_fat: "Gordura corporal",
	protein: "Proteína",
	water: "Água",
	muscle_mass: "Massa muscular",
	bone_mass: "Massa óssea",
	weight: "Peso",
	ideal: "Ideal",
	basal_metabolism: "Metabolismo basal",
	body_type: "Tipo de corpo",
	metabolic_age: "Idade metabólica",
	skeletal_muscle_mass: "Massa muscular esquelética",
	extracellular_water: "Água extracelular",
	intracellular_water: "Água intracelular",
	ecw_tbw_ratio: "Razão ECW/TBW",
	bcm: "Massa celular corporal"
};
var body_value$6 = {
	skinny: "Magro",
	balanced_skinny: "Magro equilibrado",
	skinny_muscular: "Magro musculoso",
	balanced: "Equilibrado",
	balanced_muscular: "Musculoso equilibrado",
	lack_exercise: "Falta de exercício",
	thick_set: "Estatura sólida",
	obese: "Obeso",
	overweight: "Acima do peso normal",
	underweight: "Abaixo do peso normal",
	normal_or_healthy_weight: "Normal",
	slight_overweight: "Ligeiramente acima do peso",
	moderate_obesity: "Obesidade moderada",
	severe_obesity: "Obesidade severa",
	massive_obesity: "Obesidade maciça",
	unavailable: "indisponível"
};
var unit$6 = {
	" years": " Anos"
};
var error$6 = {
	invalid_config: "Configuração inválida",
	missing_entity: "Por favor, defina uma entidade.",
	missing_entity_bodymiscale: "Por favor, defina uma entidade bodymiscale."
};
var editor$7 = {
	configuration: "Configuração",
	customization: "Personalização",
	entity: "Por favor, escolha a entidade da balança com o nome da pessoa (obrigatório) !",
	image: "Imagem de fundo (opcional)",
	icons_body: "Caminho dos ícones (ex: /local/images/bodyscoreIcon)",
	model: "Tem um sensor de impedância?",
	model1: "Ative esta função para medições precisas da composição corporal.",
	model_aria_label_on: "Ativar impedância",
	model_aria_label_off: "Desativar impedância",
	dual_impedance: "Balança com impedância dupla (50 kHz + 250 kHz)?",
	dual_impedance_aria_label_on: "Ativar impedância dupla",
	dual_impedance_aria_label_off: "Desativar impedância dupla",
	unit: "Converter kg em libras",
	unit_aria_label_on: "Ativar a conversão kg para lbs",
	unit_aria_label_off: "Desativar a conversão kg para lbs",
	theme: "Configure o tema que você utiliza.",
	theme_aria_label_on: "Ativar tema claro",
	theme_aria_label_off: "Desativar tema escuro",
	show_name: "Mostrar o nome da conta como título ?",
	show_name_aria_label_on: "Mostrar o nome como título",
	show_name_aria_label_off: "Esconder o nome como título",
	show_states: "Mostrar Estado da balança ?",
	show_states_aria_label_on: "Mostrar o estado da balança",
	show_states_aria_label_off: "Esconder o estado da balança",
	show_attributes: "Mostrar os dados do perfil pessoal (canto superior direito) ?",
	show_attributes_aria_label_on: "Mostrar atributos",
	show_attributes_aria_label_off: "Esconder atributos",
	show_always_details: "Mostrar sempre detalhes",
	show_always_details_aria_label_on: "Alternar a vista de detalhe por defeito em",
	show_always_details_aria_label_off: "Alternar a vista de detalhe por defeito",
	show_toolbar: "Mostrar opções avançadas ?",
	show_toolbar_aria_label_on: "Mostrar a barra de ferramentas",
	show_toolbar_aria_label_off: "Esconder a barra de ferramentas",
	show_body: "Mostrar mais detalhes da medição",
	show_body1: "(parte inferior - clicar na seta para mostrar) ?",
	show_body_aria_label_on: "Mostrar mais detalhes no corpo",
	show_body_aria_label_off: "Esconder mais detalhes no corpo",
	show_buttons: "Permitir a troca de conta ?",
	show_buttons_aria_label_on: "Mostrar botões das contas",
	show_buttons_aria_label_off: "Esconder botões das contas",
	header_options: "1. Opções do cabeçalho do cartão",
	body_options: "2. Mais opções do corpo do cartão",
	code_only_note: "CUIDADO: Opções adicionais estão disponíveis apenas no editor de código."
};
var editor_body$6 = {
	from: "De",
	icon_position: "Posição do ícone",
	label_below: "Etiqueta abaixo",
	left: "À esquerda",
	minmax_position: "Posição Min/Max",
	name_position: "Posição do nome",
	off: "Desligado",
	on: "Ligado",
	right: "À direita",
	severity_generator_help: "Link para a ajuda de severidade",
	showabovelabels: "Mostrar etiquetas acima",
	showbelowlabels: "Mostrar etiquetas abaixo",
	to: "Para",
	value_position: "Posição do valor"
};
var color_select$6 = {
	color: "Cor",
	disabled: "Desativado",
	red: "Vermelho",
	pink: "Rosa",
	purple: "Roxo",
	"deep-purple": "Roxo escuro",
	indigo: "Índigo",
	blue: "Azul",
	"light-blue": "Azul claro",
	cyan: "Ciano",
	teal: "Azul esverdeado",
	green: "Verde",
	"light-green": "Verde claro",
	lime: "Lima",
	yellow: "Amarelo",
	amber: "Âmbar",
	orange: "Laranja",
	orangered: "Laranja avermelhado",
	"deep-orange": "Laranja escuro",
	brown: "Marrom",
	"light-grey": "Cinza claro",
	grey: "Cinza",
	"dark-grey": "Cinza escuro",
	"blue-grey": "Cinza azulado",
	darkgreen: "Verde escuro",
	royalblue: "Azul real",
	black: "Preto",
	white: "Branco"
};
var label_below$6 = {
	balanced: "Equilibrado",
	good: "Bom",
	increased: "Aumentado",
	insufficient: "Insuficiente",
	high: "Alto",
	low: "Baixo",
	normal: "Normal",
	obese: "Obeso",
	objective_achieved: "Objetivo alcançado",
	objective_not_achieved: "Objetivo não alcançado",
	overweight: "Sobrepeso",
	underweight: "Underweight",
	very_high: "Muito alto",
	very_low: "Muito baixo"
};
var pt = {
	common: common$6,
	states: states$7,
	attributes: attributes$6,
	attributes_value: attributes_value$6,
	body: body$6,
	body_value: body_value$6,
	unit: unit$6,
	error: error$6,
	editor: editor$7,
	editor_body: editor_body$6,
	color_select: color_select$6,
	label_below: label_below$6
};

var pt$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    attributes: attributes$6,
    attributes_value: attributes_value$6,
    body: body$6,
    body_value: body_value$6,
    color_select: color_select$6,
    common: common$6,
    default: pt,
    editor: editor$7,
    editor_body: editor_body$6,
    error: error$6,
    label_below: label_below$6,
    states: states$7,
    unit: unit$6
});

var common$5 = {
	version: "Versiune",
	name: "Bodymiscale Card",
	description: "Cardul bodymiscale îți arată starea ta în funcție de greutate/corespunzătoare corpului.",
	not_available: "Bodymiscale nu este disponibil",
	toggle_power: "Mai multe detalii precum BMI kCal arată/ascunde"
};
var states$6 = {
	ok: "MĂSURARE: OK",
	unknown: "Stare: unknown",
	problem: "Problemă",
	none: "Nimic",
	weight_unavailable: "Greutate indisponibilă",
	impedance_unavailable: "Impedanță indisponibilă",
	weight_unavailable_and_impedance_unavailable: "Greutate și impedanță indisponibile",
	weight_low: "Greutate redusă",
	impedance_low: "Impedanță scăzută",
	weight_low_and_impedance_low: "Greutate și impedanță scăzute",
	impedance_low_and_weight_low: "Impedanță și greutate scăzute",
	weight_high: "Greutate mare",
	impedance_high: "Impedanță mare",
	weight_high_and_impedance_high: "Greutate și impedanță ridicate",
	weight_high_and_impedance_low: "Greutate mare, impedanță scăzută",
	weight_low_and_impedance_high: "Greutate redusă, impedanță ridicată"
};
var attributes$5 = {
	"weight: ": "Greutate: ",
	"impedance: ": "Impedanță: ",
	"impedance_low: ": "Impedanță 50 kHz: ",
	"impedance_high: ": "Impedanță 250 kHz: ",
	"height: ": "Înălţime: ",
	"age: ": "Vârstă: ",
	"gender: ": "Gen: "
};
var attributes_value$5 = {
	male: "masculin",
	female: "feminin",
	unavailable: "indisponibil"
};
var body$5 = {
	bmi: "IMC",
	bmi_label: "Eticheta IMC",
	visceral_fat: "Grasime viscerala",
	body_fat: "Grăsime corporală",
	protein: "Proteină",
	water: "Apă",
	muscle_mass: "Masă musculară",
	bone_mass: "Masă osoasă",
	weight: "Greutate",
	ideal: "Ideal",
	basal_metabolism: "Metabolismul bazal",
	body_type: "Tipul corpului",
	metabolic_age: "Vârsta metabolică",
	skeletal_muscle_mass: "Masă musculară scheletică",
	extracellular_water: "Apă extracelulară",
	intracellular_water: "Apă intracelulară",
	ecw_tbw_ratio: "Raport ECW/TBW",
	bcm: "Masă celulară corporală"
};
var body_value$5 = {
	skinny: "Slab",
	balanced_skinny: "Slab-echilibrat",
	skinny_muscular: "Slab-muscular",
	balanced: "Echilibrat",
	balanced_muscular: "Balanced-muscular",
	lack_exercise: "Lipsa-exercițiu",
	thick_set: "Îndesat",
	obese: "Obez",
	overweight: "Supraponderal",
	underweight: "Subponderal",
	normal_or_healthy_weight: "Greutate normală sau sănătoasă",
	slight_overweight: "Ușor supraponderal",
	moderate_obesity: "Obezitate moderată",
	severe_obesity: "Obezitate severă",
	massive_obesity: "Obezitate masivă",
	unavailable: "indisponibil"
};
var unit$5 = {
	" years": " ani"
};
var error$5 = {
	invalid_config: "Configurație invalidă",
	missing_entity: "Vă rugăm să definiți o entitate.",
	missing_entity_bodymiscale: "Definiți o entitate bodymiscale."
};
var editor$6 = {
	configuration: "Configurare",
	customization: "Personalizare",
	entity: "Vă rugăm să selectați un cont de cântar (obligatoriu)!",
	image: "Imagine de fundal (opțional)",
	icons_body: "Calea pictogramelor (ex: /local/images/bodyscoreIcon)",
	model: "Aveți un senzor de impedanță?",
	model1: "Activați această funcție pentru măsurători precise ale compoziției corporale.",
	model_aria_label_on: "Activare impedanță",
	model_aria_label_off: "Dezactivare impedanță",
	dual_impedance: "Cântar cu impedanță dublă (50 kHz + 250 kHz)?",
	dual_impedance_aria_label_on: "Activați impedanța dublă",
	dual_impedance_aria_label_off: "Dezactivați impedanța dublă",
	unit: "Convertiți kg în lbs",
	unit_aria_label_on: "Activați conversia",
	unit_aria_label_off: "Dezactivați conversia",
	theme: "Configurați tema pe care o utilizați.",
	theme_aria_label_on: "Activează lumina temei",
	theme_aria_label_off: "Dezactivați tema întunecată",
	show_name: "Afișați numele contului ca titlu?",
	show_name_aria_label_on: "Activează numele afișat",
	show_name_aria_label_off: "Dezactivați numele afișat",
	show_states: "Arată starea?",
	show_states_aria_label_on: "Comutați starea afișajului",
	show_states_aria_label_off: "Dezactivați starea afișajului",
	show_attributes: "Afișați datele de bază personale (dreapta sus)?",
	show_attributes_aria_label_on: "Activați/dezactivați atributele de afișare",
	show_attributes_aria_label_off: "Dezactivați atributele de afișare",
	show_always_details: "Afișați întotdeauna detalii",
	show_always_details_aria_label_on: "Activați vizualizarea implicită a detaliilor",
	show_always_details_aria_label_off: "Dezactivați vizualizarea implicită a detaliilor",
	show_toolbar: "Arată opțiuni avansate?",
	show_toolbar_aria_label_on: "Comutați afișarea opțiunilor avansate",
	show_toolbar_aria_label_off: "Dezactivați afișarea opțiunilor avansate",
	show_body: "Oferiți detalii suplimentare de măsurare",
	show_body1: "(Jumătatea inferioară - pictograma chevron în jos le va arăta)?",
	show_body_aria_label_on: "Comutați afișarea scorului corporal",
	show_body_aria_label_off: "Dezactivați scorul pentru corpul afișat",
	show_buttons: "Permiteți schimbarea contului?",
	show_buttons_aria_label_on: "Activați butoanele afișajului",
	show_buttons_aria_label_off: "Dezactivați butoanele de afișare",
	header_options: "1. Opțiuni pentru antetul cardului",
	body_options: "2. Mai multe opțiuni de card",
	code_only_note: "ATENŢIE: Opțiuni suplimentare sunt disponibile numai în editorul de cod."
};
var editor_body$5 = {
	from: "De la",
	icon_position: "Poziția pictogramei",
	label_below: "Etichetă dedesubt",
	left: "La stânga",
	minmax_position: "Poziția Min/Max",
	name_position: "Poziția numelui",
	off: "Oprit",
	on: "Pornit",
	right: "La dreapta",
	severity_generator_help: "Link către ajutorul pentru severitate",
	showabovelabels: "Afișează etichetele deasupra",
	showbelowlabels: "Afișează etichetele dedesubt",
	to: "La",
	value_position: "Poziția valorii"
};
var color_select$5 = {
	color: "Culoare",
	disabled: "Dezactivat",
	red: "Roșu",
	pink: "Roz",
	purple: "Violet",
	"deep-purple": "Violet închis",
	indigo: "Indigo",
	blue: "Albastru",
	"light-blue": "Albastru deschis",
	cyan: "Cian",
	teal: "Albastru-verde",
	green: "Verde",
	"light-green": "Verde deschis",
	lime: "Lămâie",
	yellow: "Galben",
	amber: "Chihlimbar",
	orange: "Portocaliu",
	orangered: "Portocaliu-roșu",
	"deep-orange": "Portocaliu închis",
	brown: "Maro",
	"light-grey": "Gri deschis",
	grey: "Gri",
	"dark-grey": "Gri închis",
	"blue-grey": "Gri-albastru",
	darkgreen: "Verde închis",
	royalblue: "Albastru regal",
	black: "Negru",
	white: "Alb"
};
var label_below$5 = {
	balanced: "Echilibrat",
	good: "Bun",
	increased: "Crescut",
	insufficient: "Insuficient",
	high: "Înalt",
	low: "Scăzut",
	normal: "Normal",
	obese: "Obez",
	objective_achieved: "Obiectiv atins",
	objective_not_achieved: "Obiectiv neatins",
	overweight: "Supraponderal",
	underweight: "Subponderal",
	very_high: "Foarte înalt",
	very_low: "Foarte scăzut"
};
var ro = {
	common: common$5,
	states: states$6,
	attributes: attributes$5,
	attributes_value: attributes_value$5,
	body: body$5,
	body_value: body_value$5,
	unit: unit$5,
	error: error$5,
	editor: editor$6,
	editor_body: editor_body$5,
	color_select: color_select$5,
	label_below: label_below$5
};

var ro$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    attributes: attributes$5,
    attributes_value: attributes_value$5,
    body: body$5,
    body_value: body_value$5,
    color_select: color_select$5,
    common: common$5,
    default: ro,
    editor: editor$6,
    editor_body: editor_body$5,
    error: error$5,
    label_below: label_below$5,
    states: states$6,
    unit: unit$5
});

var common$4 = {
	version: "Версия",
	name: "Карточка Bodymiscale",
	description: "Карточка BodyMiScale отображает показатели тела, рассчитанные на основе результатов измерения веса и биоимпеданса.",
	not_available: "Компонент Bodymiscale не доступен",
	toggle_power: "Показать/скрыть дополнительные сведения о BMI"
};
var states$5 = {
	ok: "Измерение: OK",
	unknown: "Состояние: неизвестно",
	problem: "Проблема",
	none: "Нет",
	weight_unavailable: "Вес недоступен",
	impedance_unavailable: "Биоимпеданс недоступен",
	weight_unavailable_and_impedance_unavailable: "Вес и импеданс недоступны",
	weight_low: "Низкий вес",
	impedance_low: "Низкий биоимпеданс",
	weight_low_and_impedance_low: "Низкий вес и импеданс",
	impedance_low_and_weight_low: "Низкий импеданс и вес",
	weight_high: "Высокий вес",
	impedance_high: "Высокий биоимпеданс",
	weight_high_and_impedance_high: "Высокий вес и импеданс",
	weight_high_and_impedance_low: "Высокий вес, низкий биоимпеданс",
	weight_low_and_impedance_high: "Низкий вес, высокий биоимпеданс"
};
var attributes$4 = {
	"weight: ": "Вес: ",
	"impedance: ": "Импеданс: ",
	"impedance_low: ": "Биоимпеданс 50 kHz: ",
	"impedance_high: ": "Биоимпеданс 250 kHz: ",
	"height: ": "Рост: ",
	"age: ": "Возраст: ",
	"gender: ": "Пол: "
};
var attributes_value$4 = {
	male: "мужской",
	female: "женский",
	unavailable: "недоступен"
};
var body$4 = {
	bmi: "Индекс BMI",
	bmi_label: "Интерпретация BMI",
	visceral_fat: "Висцеральный жир",
	body_fat: "Жировая ткань",
	protein: "Белки",
	water: "Вода",
	muscle_mass: "Мышечная масса",
	bone_mass: "Костная масса",
	weight: "Вес",
	ideal: "Идеальный вес",
	basal_metabolism: "Базальный метаболизм",
	body_type: "Тип тела",
	metabolic_age: "Метаболический возраст",
	skeletal_muscle_mass: "Скелетная мышечная масса",
	extracellular_water: "Внеклеточная вода",
	intracellular_water: "Внутриклеточная вода",
	ecw_tbw_ratio: "Соотношение ECW/TBW",
	bcm: "Масса клеток тела"
};
var body_value$4 = {
	skinny: "Тощий",
	balanced_skinny: "Худощавый",
	skinny_muscular: "Подтянуто-мускулистый",
	balanced: "Оптимальный",
	balanced_muscular: "Мускулистый",
	lack_exercise: "Недостаток упражнений",
	thick_set: "Коренастый",
	obese: "Ожирение",
	overweight: "Лишний вес",
	underweight: "Недостаточный вес",
	normal_or_healthy_weight: "Нормальный вес",
	slight_overweight: "Избыточный вес",
	moderate_obesity: "Ожирение 1й степени",
	severe_obesity: "Ожирение 2й степени",
	massive_obesity: "Ожирение 3й степени",
	unavailable: "недоступен"
};
var unit$4 = {
	" years": " года(лет)"
};
var error$4 = {
	invalid_config: "Неверная конфигурация",
	missing_entity: "Определите сущность.",
	missing_entity_bodymiscale: "Определите сущность BodyMiScale."
};
var editor$5 = {
	configuration: "Конфигурация",
	customization: "Настройка",
	entity: "Сущность BodyMiScale (обязательно)",
	image: "Фоновое изображение (опционально)",
	icons_body: "Путь к иконкам (например: /local/images/bodyscoreIcon)",
	model: "У вас есть датчик импеданса?",
	model1: "Включите эту функцию для точных измерений состава тела.",
	model_aria_label_on: "Включить импеданс",
	model_aria_label_off: "Выключить импеданс",
	dual_impedance: "Весы с двойным импедансом (50 кГц + 250 кГц)?",
	dual_impedance_aria_label_on: "Включить двойной импеданс",
	dual_impedance_aria_label_off: "Отключить двойной импеданс",
	unit: "Преобразование кг в фунты",
	unit_aria_label_on: "Преобразовать кг в фунты",
	unit_aria_label_off: "Не преобразовывать кг в фунты",
	theme: "Настройте тему, которую вы используете.",
	theme_aria_label_on: "Включить светлую тему",
	theme_aria_label_off: "Включить темную тему",
	show_name: "Отображение имени пользователя",
	show_name_aria_label_on: "Отображать имя пользователя",
	show_name_aria_label_off: "Не отображать имя пользователя",
	show_states: "Отображение состояния",
	show_states_aria_label_on: "Отображать состояние",
	show_states_aria_label_off: "Не отображать состояние",
	show_attributes: "Отображение персональных данных",
	show_attributes_aria_label_on: "Отображать персональные данные",
	show_attributes_aria_label_off: "Не отображать персональные данные",
	show_always_details: "Всегда показывать детали",
	show_always_details_aria_label_on: "Постоянное отображение деталей",
	show_always_details_aria_label_off: "Не отображайте данные на постоянной основе",
	show_toolbar: "Отображение панели дополнительных параметров",
	show_toolbar_aria_label_on: "Отображать панель дополнительных параметров",
	show_toolbar_aria_label_off: "Не отображать панель дополнительных параметров",
	show_body: "Отображение дополнительных параметров",
	show_body1: "(по нажатию кнопки со стрелкой вниз)",
	show_body_aria_label_on: "Отображать дополнительные параметры",
	show_body_aria_label_off: "Не отображать дополнительные параметры",
	show_buttons: "Переключение аккаунтов",
	show_buttons_aria_label_on: "Отображать кнопки",
	show_buttons_aria_label_off: "Не отображать кнопки",
	header_options: "1. Настройки заголовка карточки",
	body_options: "2. Дополнительные настройки карточки",
	code_only_note: "ВНИМАНИЕ: Дополнительные настройки отображаются только в редакторе кода."
};
var editor_body$4 = {
	from: "От",
	icon_position: "Позиция иконки",
	label_below: "Метка снизу",
	left: "Слева",
	minmax_position: "Позиция Min/Max",
	name_position: "Позиция имени",
	off: "Выключено",
	on: "Вкл.",
	right: "Справа",
	severity_generator_help: "Ссылка на справку по серьезности",
	showabovelabels: "Показать метки сверху",
	showbelowlabels: "Показать метки снизу",
	to: "К",
	value_position: "Позиция значения"
};
var color_select$4 = {
	color: "Цвет",
	disabled: "Отключено",
	red: "Красный",
	pink: "Розовый",
	purple: "Фиолетовый",
	"deep-purple": "Темно-фиолетовый",
	indigo: "Индиго",
	blue: "Синий",
	"light-blue": "Голубой",
	cyan: "Циан",
	teal: "Бирюзовый",
	green: "Зеленый",
	"light-green": "Светло-зеленый",
	lime: "Лайм",
	yellow: "Желтый",
	amber: "Янтарный",
	orange: "Оранжевый",
	orangered: "Красно-оранжевый",
	"deep-orange": "Темно-оранжевый",
	brown: "Коричневый",
	"light-grey": "Светло-серый",
	grey: "Серый",
	"dark-grey": "Темно-серый",
	"blue-grey": "Серый синий",
	darkgreen: "Темно-зеленый",
	royalblue: "Королевский синий",
	black: "Черный",
	white: "Белый"
};
var label_below$4 = {
	balanced: "Оптимальный",
	good: "Хорошо",
	increased: "Повышенный",
	insufficient: "Недостаточно",
	high: "Высокий",
	low: "Низкий",
	normal: "Нормальный",
	obese: "Ожирение",
	objective_achieved: "Цель достигнута",
	objective_not_achieved: "Цель не достигнута",
	overweight: "Лишний вес",
	underweight: "Недостаточный вес",
	very_high: "Очень высокий",
	very_low: "Очень низкий"
};
var ru = {
	common: common$4,
	states: states$5,
	attributes: attributes$4,
	attributes_value: attributes_value$4,
	body: body$4,
	body_value: body_value$4,
	unit: unit$4,
	error: error$4,
	editor: editor$5,
	editor_body: editor_body$4,
	color_select: color_select$4,
	label_below: label_below$4
};

var ru$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    attributes: attributes$4,
    attributes_value: attributes_value$4,
    body: body$4,
    body_value: body_value$4,
    color_select: color_select$4,
    common: common$4,
    default: ru,
    editor: editor$5,
    editor_body: editor_body$4,
    error: error$4,
    label_below: label_below$4,
    states: states$5,
    unit: unit$4
});

var common$3 = {
	version: "Версія",
	name: "Картка Bodymiscale",
	description: "Картка Bodymiscale показує ваш вагу та пов'язані з нею показники тіла.",
	not_available: "Bodymiscale недоступний",
	toggle_power: "Більше деталей, таких як ІМТ, кКал, показати/приховати"
};
var states$4 = {
	ok: "ВИМІРЮВАННЯ: ОК",
	unknown: "СТАН: невідомо",
	problem: "Проблема",
	none: "Немає",
	weight_unavailable: "Вага недоступна",
	impedance_unavailable: "Імпеданс недоступний",
	weight_unavailable_and_impedance_unavailable: "Вага та імпеданс недоступні",
	weight_low: "Низька вага",
	impedance_low: "Низький імпеданс",
	weight_low_and_impedance_low: "Низька вага та імпеданс",
	impedance_low_and_weight_low: "Низький імпеданс та вага",
	weight_high: "Висока вага",
	impedance_high: "Високий імпеданс",
	weight_high_and_impedance_high: "Висока вага та імпеданс",
	weight_high_and_impedance_low: "Висока вага, низький імпеданс",
	weight_low_and_impedance_high: "Низька вага, високий імпеданс"
};
var attributes$3 = {
	"weight: ": "Вага: ",
	"impedance: ": "Імпеданс: ",
	"impedance_low: ": "Імпеданс 50 kHz: ",
	"impedance_high: ": "Імпеданс 250 kHz: ",
	"height: ": "Зріст: ",
	"age: ": "Вік: ",
	"gender: ": "Стать: "
};
var attributes_value$3 = {
	male: "чоловік",
	female: "жінка",
	unavailable: "недоступно"
};
var body$3 = {
	bmi: "ІМТ",
	bmi_label: "Мітка ІМТ",
	visceral_fat: "Вісцеральний жир",
	body_fat: "Жир тіла",
	protein: "Білок",
	water: "Вода",
	muscle_mass: "М'язова маса",
	bone_mass: "Кісткова маса",
	weight: "Вага",
	ideal: "Ідеал",
	basal_metabolism: "Базальний метаболізм",
	body_type: "Тип тіла",
	metabolic_age: "Метаболічний вік",
	skeletal_muscle_mass: "Скелетна м'язова маса",
	extracellular_water: "Позаклітинна вода",
	intracellular_water: "Внутрішньоклітинна вода",
	ecw_tbw_ratio: "Співвідношення ECW/TBW",
	bcm: "Клітинна маса тіла"
};
var body_value$3 = {
	skinny: "Худий",
	balanced_skinny: "Збалансований худий",
	skinny_muscular: "Худий м'язистий",
	balanced: "Збалансований",
	balanced_muscular: "Збалансований м'язистий",
	lack_exercise: "Недостатня активність",
	thick_set: "Кремезний",
	obese: "Ожиріння",
	overweight: "Надмірна вага",
	underweight: "Недостатня вага",
	normal_or_healthy_weight: "Нормальна або здорова вага",
	slight_overweight: "Легка надмірна вага",
	moderate_obesity: "Помірне ожиріння",
	severe_obesity: "Серйозне ожиріння",
	massive_obesity: "Критичне ожиріння",
	unavailable: "недоступно"
};
var unit$3 = {
	" years": " років"
};
var error$3 = {
	invalid_config: "Недійсна конфігурація",
	missing_entity: "Будь ласка, визначте сутність.",
	missing_entity_bodymiscale: "Будь ласка, визначте сутність bodymiscale."
};
var editor$4 = {
	configuration: "Конфігурація",
	customization: "Налаштування",
	entity: "Будь ласка, виберіть обліковий запис на вазі (обов'язково)!",
	image: "Фонове зображення (необов'язково)",
	icons_body: "Шлях до іконок (наприклад, /local/images/bodyscoreIcon)",
	model: "У вас є сенсор імпедансу?",
	model1: "Увімкніть цю функцію для точних вимірювань складу тіла.",
	model_aria_label_on: "Увімкнути імпеданс",
	model_aria_label_off: "Вимкнути імпеданс",
	dual_impedance: "Ваги з подвійним імпедансом (50 кГц + 250 кГц)?",
	dual_impedance_aria_label_on: "Увімкнути подвійний імпеданс",
	dual_impedance_aria_label_off: "Вимкнути подвійний імпеданс",
	unit: "Конвертувати кг у фунти",
	unit_aria_label_on: "Увімкнути конвертацію",
	unit_aria_label_off: "Вимкнути конвертацію",
	theme: "Налаштуйте тему, яку ви використовуєте.",
	theme_aria_label_on: "Увімкнути світлу тему",
	theme_aria_label_off: "Вимкнути темну тему",
	show_name: "Показувати ім'я облікового запису як заголовок?",
	show_name_aria_label_on: "Увімкнути відображення імені",
	show_name_aria_label_off: "Вимкнути відображення імені",
	show_states: "Показувати стан?",
	show_states_aria_label_on: "Увімкнути відображення стану",
	show_states_aria_label_off: "Вимкнути відображення стану",
	show_attributes: "Показувати особисті основні дані (вгорі праворуч)?",
	show_attributes_aria_label_on: "Увімкнути відображення атрибутів",
	show_attributes_aria_label_off: "Вимкнути відображення атрибутів",
	show_always_details: "Завжди показувати деталі",
	show_always_details_aria_label_on: "Увімкнути детальний перегляд за замовчуванням",
	show_always_details_aria_label_off: "Вимкнути детальний перегляд за замовчуванням",
	show_toolbar: "Показувати додаткові опції?",
	show_toolbar_aria_label_on: "Увімкнути відображення додаткових опцій",
	show_toolbar_aria_label_off: "Вимкнути відображення додаткових опцій",
	show_body: "Пропонувати додаткові вимірювання",
	show_body1: "(нижня частина - іконка стрілки вниз покаже їх)?",
	show_body_aria_label_on: "Увімкнути відображення показників тіла",
	show_body_aria_label_off: "Вимкнути відображення показників тіла",
	show_buttons: "Дозволити перемикання облікових записів?",
	show_buttons_aria_label_on: "Увімкнути відображення кнопок",
	show_buttons_aria_label_off: "Вимкнути відображення кнопок",
	header_options: "1. Опції заголовка картки",
	body_options: "2. Додаткові опції картки",
	code_only_note: "УВАГА: Додаткові опції доступні лише в редакторі коду."
};
var editor_body$3 = {
	from: "Від",
	icon_position: "Позиція іконки",
	label_below: "Мітка знизу",
	left: "Ліворуч",
	minmax_position: "Позиція мін/макс",
	name_position: "Позиція імені",
	off: "Вимк.",
	on: "Увімк.",
	right: "Праворуч",
	severity_generator_help: "Посилання на довідку з налаштування серйозності",
	showabovelabels: "Показувати мітки зверху",
	showbelowlabels: "Показувати мітки знизу",
	to: "До",
	value_position: "Позиція значення"
};
var color_select$3 = {
	color: "Колір",
	disabled: "Вимкнено",
	red: "Червоний",
	pink: "Рожевий",
	purple: "Фіолетовий",
	"deep-purple": "Темно-фіолетовий",
	indigo: "Індиго",
	blue: "Синій",
	"light-blue": "Світло-синій",
	cyan: "Блакитний",
	teal: "Синьо-зелений",
	green: "Зелений",
	"light-green": "Світло-зелений",
	lime: "Лайм",
	yellow: "Жовтий",
	amber: "Бурштиновий",
	orange: "Помаранчевий",
	orangered: "Червонувато-помаранчевий",
	"deep-orange": "Темно-помаранчевий",
	brown: "Коричневий",
	"light-grey": "Світло-сірий",
	grey: "Сірий",
	"dark-grey": "Темно-сірий",
	"blue-grey": "Сіро-блакитний",
	darkgreen: "Темно-зелений",
	royalblue: "Королівський синій",
	black: "Чорний",
	white: "Білий"
};
var label_below$3 = {
	balanced: "Збалансовано",
	good: "Добре",
	increased: "Підвищений",
	insufficient: "Недостатньо",
	high: "Високий",
	low: "Низький",
	normal: "Норма",
	obese: "Ожиріння",
	objective_achieved: "Ціль досягнута",
	objective_not_achieved: "Ціль не досягнута",
	overweight: "Надмірна вага",
	underweight: "Недостатня вага",
	very_high: "Дуже високий",
	very_low: "Дуже низький"
};
var uk = {
	common: common$3,
	states: states$4,
	attributes: attributes$3,
	attributes_value: attributes_value$3,
	body: body$3,
	body_value: body_value$3,
	unit: unit$3,
	error: error$3,
	editor: editor$4,
	editor_body: editor_body$3,
	color_select: color_select$3,
	label_below: label_below$3
};

var uk$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    attributes: attributes$3,
    attributes_value: attributes_value$3,
    body: body$3,
    body_value: body_value$3,
    color_select: color_select$3,
    common: common$3,
    default: uk,
    editor: editor$4,
    editor_body: editor_body$3,
    error: error$3,
    label_below: label_below$3,
    states: states$4,
    unit: unit$3
});

var common$2 = {
	version: "Version",
	name: "Bodymiscale Card",
	description: "The bodymiscale card shows you your weight wise / related body status.",
	not_available: "Bodymiscale is not available",
	toggle_power: "More details like BMI kCal show / hide"
};
var states$3 = {
	ok: "MEASUREMENT: OK",
	unknown: "STATE: unknown",
	problem: "Problem",
	none: "None",
	weight_unavailable: "Weight unavailable",
	impedance_unavailable: "Impedance unavailable",
	weight_unavailable_and_impedance_unavailable: "Weight and impedance unavailable",
	weight_low: "Weight low",
	impedance_low: "Impedance low",
	weight_low_and_impedance_low: "Weight and impedance low",
	impedance_low_and_weight_low: "Impedance and weight low",
	weight_high: "Weight high",
	impedance_high: "Impedance high",
	weight_high_and_impedance_high: "Weight and impedance high",
	weight_high_and_impedance_low: "Weight high, impedance low",
	weight_low_and_impedance_high: "Weight low, impedance high"
};
var attributes$2 = {
	"weight: ": "Weight: ",
	"impedance: ": "Impedance: ",
	"impedance_low: ": "Impedance 50 kHz: ",
	"impedance_high: ": "Impedance 250 kHz: ",
	"height: ": "Height: ",
	"age: ": "Age: ",
	"gender: ": "Gender: "
};
var attributes_value$2 = {
	male: "male",
	female: "female",
	unavailable: "unavailable"
};
var body$2 = {
	bmi: "BMI",
	bmi_label: "BMI label",
	visceral_fat: "Mỡ nội tạng",
	body_fat: "Mỡ cơ thể",
	protein: "Chất đạm",
	water: "Nước",
	muscle_mass: "Khối lượng cơ",
	bone_mass: "Khối lượng xương",
	weight: "Cân nặng",
	ideal: "Lý tưởng",
	basal_metabolism: "Trao đổi chất cơ bản",
	body_type: "Kiểu cơ thể",
	metabolic_age: "Tuổi chuyển hóa",
	skeletal_muscle_mass: "Khối lượng cơ xương",
	extracellular_water: "Nước ngoại bào",
	intracellular_water: "Nước nội bào",
	ecw_tbw_ratio: "Tỷ lệ ECW/TBW",
	bcm: "Khối lượng tế bào cơ thể"
};
var body_value$2 = {
	skinny: "Gầy",
	balanced_skinny: "Cân đối - gầy",
	skinny_muscular: "Gầy - cơ bắp",
	balanced: "Cân bằng",
	balanced_muscular: "Cơ bắp cân bằng",
	lack_exercise: "Thiếu tập thể dục",
	thick_set: "Thick-set",
	obese: "Béo phì",
	overweight: "Thừa cân",
	underweight: "Thiếu cân",
	normal_or_healthy_weight: "Cân nặng bình thường hoặc khỏe mạnh",
	slight_overweight: "Hơi thừa cân",
	moderate_obesity: "Béo phì vừa phải",
	severe_obesity: "Béo phì nghiêm trọng",
	massive_obesity: "Massive obesity",
	unavailable: "Không có sẵn"
};
var unit$2 = {
	" years": " years"
};
var error$2 = {
	invalid_config: "Invalid configuration",
	missing_entity: "Please define an entity.",
	missing_entity_bodymiscale: "Please define a bodymiscale entity."
};
var editor$3 = {
	configuration: "Configuration",
	customization: "Customization",
	entity: "Please select an account on the scale (required)!",
	image: "Background image (optional)",
	icons_body: "Đường dẫn biểu tượng (ví dụ: /local/images/bodyscoreIcon)",
	model: "Do you have an impedance sensor?",
	model1: "Enable this feature for accurate body composition measurements.",
	model_aria_label_on: "Enable impedance",
	model_aria_label_off: "Disable impedance",
	dual_impedance: "Cân với trở kháng kép (50 kHz + 250 kHz)?",
	dual_impedance_aria_label_on: "Bật trở kháng kép",
	dual_impedance_aria_label_off: "Tắt trở kháng kép",
	unit: "Convert kg to lbs",
	unit_aria_label_on: "Toggle the conversion on",
	unit_aria_label_off: "Toggle the conversion off",
	theme: "Configure the theme you use.",
	theme_aria_label_on: "Toggle theme light on",
	theme_aria_label_off: "Toggle theme dark off",
	show_name: "Show the name of the account as title?",
	show_name_aria_label_on: "Toggle display name on",
	show_name_aria_label_off: "Toggle display name off",
	show_states: "Show State?",
	show_states_aria_label_on: "Toggle display state on",
	show_states_aria_label_off: "Toggle display state off",
	show_attributes: "Show personal master data (top right)?",
	show_attributes_aria_label_on: "Toggle display attributes on",
	show_attributes_aria_label_off: "Toggle display attributes off",
	show_always_details: "Always show details",
	show_always_details_aria_label_on: "Toggle default detail view on",
	show_always_details_aria_label_off: "Toggle default detail view off",
	show_toolbar: "Show advanced options?",
	show_toolbar_aria_label_on: "Toggle display advanced options on",
	show_toolbar_aria_label_off: "Toggle display advanced options off",
	show_body: "Offer further measurement details",
	show_body1: "(lower half - icon chevron down will show those)?",
	show_body_aria_label_on: "Toggle display body score on",
	show_body_aria_label_off: "Toggle display body score off",
	show_buttons: "Allow account switch?",
	show_buttons_aria_label_on: "Toggle display buttons on",
	show_buttons_aria_label_off: "Toggle display buttons off",
	header_options: "1. Card header options",
	body_options: "2. More card options",
	code_only_note: "ATTENTION: Additional options are only available in the code editor."
};
var editor_body$2 = {
	from: "Từ",
	icon_position: "Vị trí biểu tượng",
	label_below: "Nhãn bên dưới",
	left: "Bên trái",
	minmax_position: "Vị trí Min/Max",
	name_position: "Vị trí tên",
	off: "Tắt",
	on: "Bật",
	right: "Bên phải",
	severity_generator_help: "Liên kết đến Trợ giúp về Mức độ nghiêm trọng",
	showabovelabels: "Hiển thị nhãn phía trên",
	showbelowlabels: "Hiển thị nhãn phía dưới",
	to: "Đến",
	value_position: "Vị trí giá trị"
};
var color_select$2 = {
	color: "Màu sắc",
	disabled: "Tắt",
	red: "Đỏ",
	pink: "Hồng",
	purple: "Tím",
	"deep-purple": "Tím đậm",
	indigo: "Chàm",
	blue: "Xanh dương",
	"light-blue": "Xanh nhạt",
	cyan: "Cyan",
	teal: "Lục lam",
	green: "Xanh lá",
	"light-green": "Xanh lá nhạt",
	lime: "Chanh",
	yellow: "Vàng",
	amber: "Hổ phách",
	orange: "Cam",
	orangered: "Cam đỏ",
	"deep-orange": "Cam đậm",
	brown: "Nâu",
	"light-grey": "Xám nhạt",
	grey: "Xám",
	"dark-grey": "Xám đậm",
	"blue-grey": "Xám xanh dương",
	darkgreen: "Xanh lá đậm",
	royalblue: "Xanh dương hoàng gia",
	black: "Đen",
	white: "Trắng"
};
var label_below$2 = {
	balanced: "Cân bằng",
	good: "Tốt",
	increased: "Tăng",
	insufficient: "Không đủ",
	high: "Cao",
	low: "Thấp",
	normal: "Bình thường",
	obese: "Béo phì",
	objective_achieved: "Mục tiêu đạt được",
	objective_not_achieved: "Mục tiêu chưa đạt",
	overweight: "Thừa cân",
	underweight: "Thiếu cân",
	very_high: "Rất cao",
	very_low: "Rất thấp"
};
var vi = {
	common: common$2,
	states: states$3,
	attributes: attributes$2,
	attributes_value: attributes_value$2,
	body: body$2,
	body_value: body_value$2,
	unit: unit$2,
	error: error$2,
	editor: editor$3,
	editor_body: editor_body$2,
	color_select: color_select$2,
	label_below: label_below$2
};

var vi$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    attributes: attributes$2,
    attributes_value: attributes_value$2,
    body: body$2,
    body_value: body_value$2,
    color_select: color_select$2,
    common: common$2,
    default: vi,
    editor: editor$3,
    editor_body: editor_body$2,
    error: error$2,
    label_below: label_below$2,
    states: states$3,
    unit: unit$2
});

var common$1 = {
	version: "版本",
	name: "米家体脂称卡片",
	description: "米家体脂称卡片会显示你的体重以及相关身体状态",
	not_available: "Bodymiscale 不可用",
	toggle_power: "显示/隐藏更多详情,例如: BMI, kCal"
};
var states$2 = {
	ok: "测量: OK",
	unknown: "状态: 未知",
	problem: "故障",
	none: "无",
	weight_unavailable: "体重不可用",
	impedance_unavailable: "阻抗不可用",
	weight_unavailable_and_impedance_unavailable: "体重和阻抗均不可用",
	weight_low: "体重过轻",
	impedance_low: "阻抗低",
	weight_low_and_impedance_low: "体重和阻抗均偏低",
	impedance_low_and_weight_low: "阻抗和体重均偏低",
	weight_high: "体重过重",
	impedance_high: "阻抗高",
	weight_high_and_impedance_high: "体重和阻抗均偏高",
	weight_high_and_impedance_low: "体重过重, 阻抗低",
	weight_low_and_impedance_high: "体重过轻, 阻抗高"
};
var attributes$1 = {
	"weight: ": "重量: ",
	"impedance: ": "阻抗: ",
	"impedance_low: ": "高频阻抗 50 kHz: ",
	"impedance_high: ": "高频阻抗 250 kHz: ",
	"height: ": "身高: ",
	"age: ": "年龄: ",
	"gender: ": "性别: "
};
var attributes_value$1 = {
	male: "男",
	female: "女",
	unavailable: "不可用"
};
var body$1 = {
	bmi: "BMI",
	bmi_label: "BMI 标签",
	visceral_fat: "内脏脂肪",
	body_fat: "体脂",
	protein: "蛋白质",
	water: "水分",
	muscle_mass: "肌肉量",
	bone_mass: "骨量",
	weight: "体重",
	ideal: "理想体重",
	basal_metabolism: "基本代谢",
	body_type: "身体类型",
	metabolic_age: "代谢年龄",
	skeletal_muscle_mass: "骨骼肌量",
	extracellular_water: "细胞外水分",
	intracellular_water: "细胞内水分",
	ecw_tbw_ratio: "ECW/TBW 比率",
	bcm: "体细胞量"
};
var body_value$1 = {
	skinny: "偏瘦",
	balanced_skinny: "健美型",
	skinny_muscular: "偏瘦肌肉",
	balanced: "标准型",
	balanced_muscular: "标准肌肉",
	lack_exercise: "缺乏运动",
	thick_set: "结实型偏胖",
	obese: "偏胖型",
	overweight: "肥胖型",
	underweight: "过轻",
	normal_or_healthy_weight: "正常或健康",
	slight_overweight: "轻微超重",
	moderate_obesity: "中度肥胖",
	severe_obesity: "过度肥胖",
	massive_obesity: "严重肥胖",
	unavailable: "不可用"
};
var unit$1 = {
	" years": " 岁"
};
var error$1 = {
	invalid_config: "Invalid configuration",
	missing_entity: "Please define an entity.",
	missing_entity_bodymiscale: "Please define a bodymiscale entity."
};
var editor$2 = {
	configuration: "Configuration",
	customization: "Customization",
	entity: "Please select an account on the scale (required) !",
	image: "Background image (optional)",
	icons_body: "图标路径 (例如：/local/images/bodyscoreIcon)",
	model: "Do you have an impedance sensor?",
	model1: "Enable this feature for accurate body composition measurements.",
	model_aria_label_on: "Enable impedance",
	model_aria_label_off: "Disable impedance",
	dual_impedance: "双频阻抗体重秤 (50 kHz + 250 kHz)?",
	dual_impedance_aria_label_on: "启用双频阻抗",
	dual_impedance_aria_label_off: "禁用双频阻抗",
	unit: "Convert kg to lbs",
	unit_aria_label_on: "Toggle the conversion on",
	unit_aria_label_off: "Toggle the conversion off",
	theme: "Configure the theme you use.",
	theme_aria_label_on: "Toggle theme light on",
	theme_aria_label_off: "Toggle theme dark off",
	show_name: "Show the name of the account as title ?",
	show_name_aria_label_on: "Toggle display name on",
	show_name_aria_label_off: "Toggle display name off",
	show_states: "Show State ?",
	show_states_aria_label_on: "Toggle display state on",
	show_states_aria_label_off: "Toggle display state off",
	show_attributes: "Show personal master data (top right) ?",
	show_attributes_aria_label_on: "Toggle display attributes on",
	show_attributes_aria_label_off: "Toggle display attributes off",
	show_always_details: "Always show details",
	show_always_details_aria_label_on: "Toggle default detail view on",
	show_always_details_aria_label_off: "Toggle default detail view off",
	show_toolbar: "Show advanced options ?",
	show_toolbar_aria_label_on: "Toggle display advanced options on",
	show_toolbar_aria_label_off: "Toggle display advanced options off",
	show_body: "Offer further measurement details",
	show_body1: "(lower half - icon chevron down will show those) ?",
	show_body_aria_label_on: "Toggle display body score on",
	show_body_aria_label_off: "Toggle display body score off",
	show_buttons: "Allow account switch ?",
	show_buttons_aria_label_on: "Toggle display buttons on",
	show_buttons_aria_label_off: "Toggle display buttons off",
	header_options: "1. Card header options",
	body_options: "2. More card options",
	code_only_note: "ATTENTION: Additional options are only available in the code editor."
};
var editor_body$1 = {
	from: "从",
	icon_position: "图标位置",
	label_below: "下方标签",
	left: "左侧",
	minmax_position: "最小/最大位置",
	name_position: "名称位置",
	off: "关闭",
	on: "开启",
	right: "右侧",
	severity_generator_help: "链接到严重程度帮助",
	showabovelabels: "显示上方标签",
	showbelowlabels: "显示下方标签",
	to: "到",
	value_position: "值的位置"
};
var color_select$1 = {
	color: "颜色",
	disabled: "禁用",
	red: "红色",
	pink: "粉色",
	purple: "紫色",
	"deep-purple": "深紫色",
	indigo: "靛蓝",
	blue: "蓝色",
	"light-blue": "浅蓝色",
	cyan: "青色",
	teal: "蓝绿色",
	green: "绿色",
	"light-green": "浅绿色",
	lime: "石灰色",
	yellow: "黄色",
	amber: "琥珀色",
	orange: "橙色",
	orangered: "红橙色",
	"deep-orange": "深橙色",
	brown: "棕色",
	"light-grey": "浅灰色",
	grey: "灰色",
	"dark-grey": "深灰色",
	"blue-grey": "蓝灰色",
	darkgreen: "深绿色",
	royalblue: "皇家蓝",
	black: "黑色",
	white: "白色"
};
var label_below$1 = {
	balanced: "标准型",
	good: "好",
	increased: "增加",
	insufficient: "不足",
	high: "高",
	low: "低",
	normal: "正常",
	obese: "偏胖型",
	objective_achieved: "目标达成",
	objective_not_achieved: "目标未达成",
	overweight: "肥胖型",
	underweight: "过轻",
	very_high: "非常高",
	very_low: "非常低"
};
var zhHans = {
	common: common$1,
	states: states$2,
	attributes: attributes$1,
	attributes_value: attributes_value$1,
	body: body$1,
	body_value: body_value$1,
	unit: unit$1,
	error: error$1,
	editor: editor$2,
	editor_body: editor_body$1,
	color_select: color_select$1,
	label_below: label_below$1
};

var zh_Hans = /*#__PURE__*/Object.freeze({
    __proto__: null,
    attributes: attributes$1,
    attributes_value: attributes_value$1,
    body: body$1,
    body_value: body_value$1,
    color_select: color_select$1,
    common: common$1,
    default: zhHans,
    editor: editor$2,
    editor_body: editor_body$1,
    error: error$1,
    label_below: label_below$1,
    states: states$2,
    unit: unit$1
});

var common = {
	version: "版本",
	name: "米家體脂計卡片",
	description: "米家體脂計卡片會顯示你的體重以及相關身體狀態",
	not_available: "Bodymiscale 不可用",
	toggle_power: "顯示/隱藏更多詳情,例如: BMI, kCal"
};
var states$1 = {
	ok: "測量: OK",
	unknown: "狀態: 未知",
	problem: "故障",
	none: "無",
	weight_unavailable: "體重不可用",
	impedance_unavailable: "阻抗不可用",
	weight_unavailable_and_impedance_unavailable: "體重和阻抗均不可用",
	weight_low: "體重過輕",
	impedance_low: "阻抗低",
	weight_low_and_impedance_low: "體重和阻抗均偏低",
	impedance_low_and_weight_low: "阻抗和體重均偏低",
	weight_high: "體重過重",
	impedance_high: "阻抗高",
	weight_high_and_impedance_high: "體重和阻抗均偏高",
	weight_high_and_impedance_low: "體重過重, 阻抗低",
	weight_low_and_impedance_high: "體重過輕, 阻抗高"
};
var attributes = {
	"weight: ": "重量: ",
	"impedance: ": "阻抗: ",
	"impedance_low: ": "高頻阻抗 50 kHz: ",
	"impedance_high: ": "高頻阻抗 250 kHz: ",
	"height: ": "身高: ",
	"age: ": "年齡: ",
	"gender: ": "性別: "
};
var attributes_value = {
	male: "男",
	female: "女",
	unavailable: "不可用"
};
var body = {
	bmi: "BMI",
	bmi_label: "BMI 標籤",
	visceral_fat: "內臟脂肪",
	body_fat: "體脂",
	protein: "蛋白質",
	water: "水分",
	muscle_mass: "肌肉量",
	bone_mass: "骨量",
	weight: "體重",
	ideal: "理想體重",
	basal_metabolism: "基本代謝",
	body_type: "身體類型",
	metabolic_age: "代謝年齡",
	skeletal_muscle_mass: "骨骼肌量",
	extracellular_water: "細胞外水分",
	intracellular_water: "細胞內水分",
	ecw_tbw_ratio: "ECW/TBW 比率",
	bcm: "體細胞量"
};
var body_value = {
	skinny: "偏瘦",
	balanced_skinny: "健美型",
	skinny_muscular: "偏瘦肌肉",
	balanced: "標準型",
	balanced_muscular: "標準肌肉",
	lack_exercise: "缺乏運動",
	thick_set: "結實型偏胖",
	obese: "偏胖型",
	overweight: "肥胖型",
	underweight: "過輕",
	normal_or_healthy_weight: "正常或健康",
	slight_overweight: "輕微超重",
	moderate_obesity: "中度肥胖",
	severe_obesity: "過度肥胖",
	massive_obesity: "嚴重肥胖",
	unavailable: "不可用"
};
var unit = {
	" years": " 歲"
};
var error = {
	invalid_config: "Invalid configuration",
	missing_entity: "Please define an entity.",
	missing_entity_bodymiscale: "Please define a bodymiscale entity."
};
var editor$1 = {
	configuration: "Configuration",
	customization: "Customization",
	entity: "Please select an account on the scale (required) !",
	image: "Background image (optional)",
	icons_body: "圖示路徑 (例如：/local/images/bodyscoreIcon)",
	model: "Do you have an impedance sensor?",
	model1: "Enable this feature for accurate body composition measurements.",
	model_aria_label_on: "Enable impedance",
	model_aria_label_off: "Disable impedance",
	dual_impedance: "雙頻阻抗體重秤 (50 kHz + 250 kHz)?",
	dual_impedance_aria_label_on: "啟用雙頻阻抗",
	dual_impedance_aria_label_off: "停用雙頻阻抗",
	unit: "Convert kg to lbs",
	unit_aria_label_on: "Toggle the conversion on",
	unit_aria_label_off: "Toggle the conversion off",
	theme: "Configure the theme you use.",
	theme_aria_label_on: "Toggle theme light on",
	theme_aria_label_off: "Toggle theme dark off",
	show_name: "Show the name of the account as title ?",
	show_name_aria_label_on: "Toggle display name on",
	show_name_aria_label_off: "Toggle display name off",
	show_states: "Show State ?",
	show_states_aria_label_on: "Toggle display state on",
	show_states_aria_label_off: "Toggle display state off",
	show_attributes: "Show personal master data (top right) ?",
	show_attributes_aria_label_on: "Toggle display attributes on",
	show_attributes_aria_label_off: "Toggle display attributes off",
	show_always_details: "Always show details",
	show_always_details_aria_label_on: "Toggle default detail view on",
	show_always_details_aria_label_off: "Toggle default detail view off",
	show_toolbar: "Show advanced options ?",
	show_toolbar_aria_label_on: "Toggle display advanced options on",
	show_toolbar_aria_label_off: "Toggle display advanced options off",
	show_body: "Offer further measurement details",
	show_body1: "(lower half - icon chevron down will show those) ?",
	show_body_aria_label_on: "Toggle display body score on",
	show_body_aria_label_off: "Toggle display body score off",
	show_buttons: "Allow account switch ?",
	show_buttons_aria_label_on: "Toggle display buttons on",
	show_buttons_aria_label_off: "Toggle display buttons off",
	header_options: "1. Card header options",
	body_options: "2. More card options",
	code_only_note: "ATTENTION: Additional options are only available in the code editor."
};
var editor_body = {
	from: "從",
	icon_position: "圖示位置",
	label_below: "下方標籤",
	left: "左側",
	minmax_position: "最小/最大位置",
	name_position: "名稱位置",
	off: "關閉",
	on: "開啟",
	right: "右側",
	severity_generator_help: "連結至嚴重程度說明",
	showabovelabels: "顯示上方標籤",
	showbelowlabels: "顯示下方標籤",
	to: "到",
	value_position: "數值位置"
};
var color_select = {
	color: "顏色",
	disabled: "禁用",
	red: "紅色",
	pink: "粉色",
	purple: "紫色",
	"deep-purple": "深紫色",
	indigo: "靛藍",
	blue: "藍色",
	"light-blue": "淺藍色",
	cyan: "青色",
	teal: "藍綠色",
	green: "綠色",
	"light-green": "淺綠色",
	lime: "酸橙色",
	yellow: "黃色",
	amber: "琥珀色",
	orange: "橙色",
	orangered: "紅橙色",
	"deep-orange": "深橙色",
	brown: "棕色",
	"light-grey": "淺灰色",
	grey: "灰色",
	"dark-grey": "深灰色",
	"blue-grey": "藍灰色",
	darkgreen: "深綠色",
	royalblue: "皇家藍",
	black: "黑色",
	white: "白色"
};
var label_below = {
	balanced: "標準型",
	good: "好",
	increased: "增加",
	insufficient: "不足",
	high: "高",
	low: "低",
	normal: "正常",
	obese: "偏胖型",
	objective_achieved: "目標達成",
	objective_not_achieved: "目標未達成",
	overweight: "肥胖型",
	underweight: "過輕",
	very_high: "非常高",
	very_low: "非常低"
};
var zhHant = {
	common: common,
	states: states$1,
	attributes: attributes,
	attributes_value: attributes_value,
	body: body,
	body_value: body_value,
	unit: unit,
	error: error,
	editor: editor$1,
	editor_body: editor_body,
	color_select: color_select,
	label_below: label_below
};

var zh_Hant = /*#__PURE__*/Object.freeze({
    __proto__: null,
    attributes: attributes,
    attributes_value: attributes_value,
    body: body,
    body_value: body_value,
    color_select: color_select,
    common: common,
    default: zhHant,
    editor: editor$1,
    editor_body: editor_body,
    error: error,
    label_below: label_below,
    states: states$1,
    unit: unit
});

const languages = {
  ca: ca$1,
  cs: cs$1,
  da: da$1,
  de: de$1,
  en: en$1,
  es: es$1,
  fr: fr$1,
  hu: hu$1,
  it: it$1,
  ja: ja$1,
  nl: nl$1,
  pl: pl$1,
  pt: pt$1,
  pt_BR: pt_BR,
  ro: ro$1,
  ru: ru$1,
  uk: uk$1,
  vi: vi$1,
  zh_Hans: zh_Hans,
  zh_Hant: zh_Hant
};
const DEFAULT_LANG = 'en';
function localize(str, search, replace) {
  const [section, key] = str.toLowerCase().split('.');
  let lang;
  try {
    const stored = JSON.parse(localStorage.getItem('selectedLanguage') ?? '""');
    lang = (stored || navigator.language.split('-')[0] || DEFAULT_LANG).replace(/['"]+/g, '').replace('-', '_');
  } catch (e) {
    console.warn(e);
    const raw = localStorage.getItem('selectedLanguage') || navigator.language.split('-')[0] || DEFAULT_LANG;
    lang = raw.replace(/['"]+/g, '').replace('-', '_');
  }
  if (!languages[lang]) {
    lang = lang.split('_')[0];
  }
  if (!languages[lang]) {
    lang = DEFAULT_LANG;
  }
  let translated;
  try {
    translated = languages[lang][section][key];
  } catch (e) {
    console.warn(e);
    translated = languages[DEFAULT_LANG][section][key];
  }
  if (translated === undefined) {
    translated = languages[DEFAULT_LANG][section][key];
  }
  if (translated === undefined) {
    return;
  }
  return translated;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
let compute = {
  convertkgtolb: v => Math.round(Number(v) * 2.20462 * 10) / 10
};
const states = {
  status: {
    key: 'state',
    icon: 'mdi:scale-bathroom'
  },
  problem: {
    key: 'problem',
    icon: 'mdi:alert'
  },
  last_measurement_time: {
    key: 'last_measurement_time',
    icon: 'mdi:calendar-clock'
  }
};
const attributes_kg = {
  weight: {
    key: 'weight',
    label: localize(`attributes.${'weight: '}`),
    unit: ' kg'
  },
  impedance: {
    key: 'impedance',
    label: localize(`attributes.${'impedance: '}`),
    unit: ' ohm',
    impedance_required: true,
    dual_impedance_required: false
  },
  impedance_low: {
    key: 'impedance_low',
    label: localize(`attributes.${'impedance_low: '}`),
    unit: ' ohm',
    impedance_required: true,
    dual_impedance_required: true
  },
  impedance_high: {
    key: 'impedance_high',
    label: localize(`attributes.${'impedance_high: '}`),
    unit: ' ohm',
    impedance_required: true,
    dual_impedance_required: true
  },
  height: {
    key: 'height',
    label: localize(`attributes.${'height: '}`),
    unit: ' cm'
  },
  age: {
    key: 'age',
    label: localize(`attributes.${'age: '}`),
    unit: localize(`unit.${' years'}`)
  },
  gender: {
    key: 'gender',
    label: localize(`attributes.${'gender: '}`)
  }
};
const attributes_lb = {
  weight: {
    key: 'weight',
    label: localize(`attributes.${'weight: '}`),
    unit: ' lbs',
    compute: compute.convertkgtolb
  },
  impedance: {
    key: 'impedance',
    label: localize(`attributes.${'impedance: '}`),
    unit: ' ohm',
    impedance_required: true
  },
  impedance_low: {
    key: 'impedance_low',
    label: localize(`attributes.${'impedance_low: '}`),
    unit: ' ohm',
    impedance_required: true,
    dual_impedance_required: true
  },
  impedance_high: {
    key: 'impedance_high',
    label: localize(`attributes.${'impedance_high: '}`),
    unit: ' ohm',
    impedance_required: true,
    dual_impedance_required: true
  },
  height: {
    key: 'height',
    label: localize(`attributes.${'height: '}`),
    unit: ' cm'
  },
  age: {
    key: 'age',
    label: localize(`attributes.${'age: '}`),
    unit: localize(`unit.${' years'}`)
  },
  gender: {
    key: 'gender',
    label: localize(`attributes.${'gender: '}`)
  }
};
const body_kg = {
  basal_metabolism: {
    key: 'basal_metabolism',
    label: localize(`body.${'basal_metabolism'}`),
    icon: 'basal_metabolism.png',
    unit: ' kcal',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [{
      from: 0,
      to: 1549,
      color: 'red',
      label: 'objective_not_achieved'
    }, {
      from: 1549,
      to: 3000,
      color: 'green',
      label: 'objective_achieved'
    }],
    impedance_required: false
  },
  bcm: {
    key: 'bcm',
    label: localize(`body.${'bcm'}`),
    icon: 'mdi:cellphone',
    unit: ' kg',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [{
      from: 0,
      to: 25,
      color: 'red',
      label: 'low'
    }, {
      from: 25,
      to: 35,
      color: 'green',
      label: 'normal'
    }, {
      from: 35,
      to: 50,
      color: 'blue',
      label: 'good'
    }],
    impedance_required: true,
    dual_impedance_required: true
  },
  bmi: {
    key: 'bmi',
    label: localize(`body.${'bmi'}`),
    icon: 'bmi.png',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [{
      from: 12,
      to: 18.5,
      color: 'blue',
      label: 'low'
    }, {
      from: 18.5,
      to: 25.0,
      color: 'green',
      label: 'normal'
    }, {
      from: 25.0,
      to: 30.0,
      color: 'orange',
      label: 'high'
    }, {
      from: 30.0,
      to: 36.5,
      color: 'red',
      label: 'very_high'
    }],
    impedance_required: false
  },
  bmi_label: {
    key: 'bmi_label',
    label: localize(`body.${'bmi_label'}`),
    icon: 'body_type.png',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: null,
    showbelowlabels: null,
    severity: null,
    impedance_required: false
  },
  body_fat: {
    key: 'body_fat',
    label: localize(`body.${'body_fat'}`),
    icon: 'body_fat.png',
    unit: ' %',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [{
      from: 5,
      to: 12,
      color: 'royalblue',
      label: 'very_low'
    }, {
      from: 12,
      to: 18,
      color: 'blue',
      label: 'low'
    }, {
      from: 18,
      to: 23,
      color: 'green',
      label: 'normal'
    }, {
      from: 23,
      to: 28,
      color: 'orange',
      label: 'increased'
    }, {
      from: 28,
      to: 35,
      color: 'red',
      label: 'high'
    }],
    impedance_required: true
  },
  body_type: {
    key: 'body_type',
    label: localize(`body.${'body_type'}`),
    icon: 'body_type.png',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: null,
    showbelowlabels: null,
    severity: null,
    impedance_required: true
  },
  bone_mass: {
    key: 'bone_mass',
    label: localize(`body.${'bone_mass'}`),
    icon: 'bone_mass.png',
    unit: ' kg',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [{
      from: 0,
      to: 2.00,
      color: 'red',
      label: 'insufficient'
    }, {
      from: 2.00,
      to: 4.20,
      color: 'green',
      label: 'normal'
    }, {
      from: 4.20,
      to: 6.40,
      color: 'blue',
      label: 'good'
    }],
    impedance_required: true
  },
  ecw_tbw_ratio: {
    key: 'ecw_tbw_ratio',
    label: localize(`body.${'ecw_tbw_ratio'}`),
    icon: 'mdi:chart-pie',
    unit: ' %',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [{
      from: 0,
      to: 36,
      color: 'blue',
      label: 'low'
    }, {
      from: 36,
      to: 41,
      color: 'green',
      label: 'normal'
    }, {
      from: 41,
      to: 45,
      color: 'orange',
      label: 'high'
    }, {
      from: 45,
      to: 60,
      color: 'red',
      label: 'very_high'
    }],
    impedance_required: true,
    dual_impedance_required: true
  },
  extracellular_water: {
    key: 'extracellular_water',
    label: localize(`body.${'extracellular_water'}`),
    icon: 'mdi:water-opacity',
    unit: ' L',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [{
      from: 0,
      to: 14,
      color: 'blue',
      label: 'low'
    }, {
      from: 14,
      to: 22,
      color: 'green',
      label: 'normal'
    }, {
      from: 22,
      to: 28,
      color: 'orange',
      label: 'high'
    }, {
      from: 28,
      to: 50,
      color: 'red',
      label: 'very_high'
    }],
    impedance_required: true,
    dual_impedance_required: true
  },
  ideal: {
    key: 'ideal',
    label: localize(`body.${'ideal'}`),
    icon: 'ideal.png',
    unit: ' kg',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [{
      from: 39.30,
      to: 57.30,
      color: 'blue',
      label: 'underweight'
    }, {
      from: 57.30,
      to: 75.30,
      color: 'green',
      label: 'balanced'
    }, {
      from: 75.30,
      to: 93.30,
      color: 'orange',
      label: 'overweight'
    }, {
      from: 93.30,
      to: 111.30,
      color: 'red',
      label: 'obese'
    }],
    impedance_required: false
  },
  intracellular_water: {
    key: 'intracellular_water',
    label: localize(`body.${'intracellular_water'}`),
    icon: 'mdi:water-circle',
    unit: ' L',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [{
      from: 0,
      to: 18,
      color: 'blue',
      label: 'low'
    }, {
      from: 18,
      to: 27,
      color: 'green',
      label: 'normal'
    }, {
      from: 27,
      to: 33,
      color: 'orange',
      label: 'high'
    }, {
      from: 33,
      to: 60,
      color: 'red',
      label: 'very_high'
    }],
    impedance_required: true,
    dual_impedance_required: true
  },
  metabolic_age: {
    key: 'metabolic_age',
    label: localize(`body.${'metabolic_age'}`),
    icon: 'metabolic_age.png',
    unit: localize(`unit.${' years'}`),
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: null,
    showbelowlabels: null,
    severity: null,
    impedance_required: true
  },
  muscle_mass: {
    key: 'muscle_mass',
    label: localize(`body.${'muscle_mass'}`),
    icon: 'muscle_mass.png',
    unit: ' kg',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [{
      from: 39.30,
      to: 49.40,
      color: 'red',
      label: 'insufficient'
    }, {
      from: 49.40,
      to: 59.50,
      color: 'green',
      label: 'normal'
    }, {
      from: 59.50,
      to: 69.60,
      color: 'blue',
      label: 'good'
    }],
    impedance_required: true
  },
  protein: {
    key: 'protein',
    label: localize(`body.${'protein'}`),
    icon: 'protein.png',
    unit: ' %',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [{
      from: 11,
      to: 16,
      color: 'red',
      label: 'insufficient'
    }, {
      from: 16,
      to: 20,
      color: 'green',
      label: 'normal'
    }, {
      from: 20,
      to: 24,
      color: 'blue',
      label: 'good'
    }],
    impedance_required: true
  },
  skeletal_muscle_mass: {
    key: 'skeletal_muscle_mass',
    label: localize(`body.${'skeletal_muscle_mass'}`),
    icon: 'mdi:arm-flex',
    unit: ' kg',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [{
      from: 0,
      to: 29,
      color: 'red',
      label: 'low'
    }, {
      from: 29,
      to: 35,
      color: 'orange',
      label: 'below_normal'
    }, {
      from: 35,
      to: 44,
      color: 'green',
      label: 'normal'
    }, {
      from: 44,
      to: 55,
      color: 'blue',
      label: 'good'
    }],
    impedance_required: true,
    dual_impedance_required: true
  },
  visceral_fat: {
    key: 'visceral_fat',
    label: localize(`body.${'visceral_fat'}`),
    icon: 'visceral_fat.png',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [{
      from: 5,
      to: 10,
      color: 'green',
      label: 'normal'
    }, {
      from: 10,
      to: 15,
      color: 'orange',
      label: 'high'
    }, {
      from: 15,
      to: 20,
      color: 'red',
      label: 'very_high'
    }],
    impedance_required: false
  },
  water: {
    key: 'water',
    label: localize(`body.${'water'}`),
    icon: 'water.png',
    unit: ' %',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [{
      from: 45,
      to: 55,
      color: 'red',
      label: 'insufficient'
    }, {
      from: 55,
      to: 65.1,
      color: 'green',
      label: 'normal'
    }, {
      from: 65.1,
      to: 75,
      color: 'blue',
      label: 'good'
    }],
    impedance_required: true
  },
  weight: {
    key: 'weight',
    label: localize(`body.${'weight'}`),
    icon: 'ideal.png',
    unit: ' kg',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [{
      from: 39.30,
      to: 57.30,
      color: 'blue',
      label: 'underweight'
    }, {
      from: 57.30,
      to: 75.30,
      color: 'green',
      label: 'balanced'
    }, {
      from: 75.30,
      to: 93.30,
      color: 'orange',
      label: 'overweight'
    }, {
      from: 93.30,
      to: 111.30,
      color: 'red',
      label: 'obese'
    }],
    impedance_required: false
  }
};
const body_lb = {
  basal_metabolism: {
    key: 'basal_metabolism',
    label: localize(`body.${'basal_metabolism'}`),
    icon: 'basal_metabolism.png',
    unit: ' kcal',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [{
      from: 0,
      to: 1549,
      color: 'red',
      label: 'objective_not_achieved'
    }, {
      from: 1549,
      to: 3000,
      color: 'green',
      label: 'objective_achieved'
    }],
    impedance_required: false
  },
  bcm: {
    key: 'bcm',
    label: localize(`body.${'bcm'}`),
    icon: 'mdi:cellphone',
    unit: ' lbs',
    compute: compute.convertkgtolb,
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [{
      from: 0,
      to: 55.11,
      color: 'red',
      label: 'low'
    }, {
      from: 55.11,
      to: 77.11,
      color: 'green',
      label: 'normal'
    }, {
      from: 77.11,
      to: 110.11,
      color: 'blue',
      label: 'good'
    }],
    impedance_required: true,
    dual_impedance_required: true
  },
  bmi: {
    key: 'bmi',
    label: localize(`body.${'bmi'}`),
    icon: 'bmi.png',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [{
      from: 12,
      to: 18.5,
      color: 'blue',
      label: 'low'
    }, {
      from: 18.5,
      to: 25.0,
      color: 'green',
      label: 'normal'
    }, {
      from: 25.0,
      to: 30.0,
      color: 'orange',
      label: 'high'
    }, {
      from: 30.0,
      to: 36.5,
      color: 'red',
      label: 'very_high'
    }],
    impedance_required: false
  },
  bmi_label: {
    key: 'bmi_label',
    label: localize(`body.${'bmi_label'}`),
    icon: 'body_type.png',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: null,
    showbelowlabels: null,
    severity: null,
    impedance_required: false
  },
  body_fat: {
    key: 'body_fat',
    label: localize(`body.${'body_fat'}`),
    icon: 'body_fat.png',
    unit: ' %',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [{
      from: 5,
      to: 12,
      color: 'royalblue',
      label: 'very_low'
    }, {
      from: 12,
      to: 18,
      color: 'blue',
      label: 'low'
    }, {
      from: 18,
      to: 23,
      color: 'green',
      label: 'normal'
    }, {
      from: 23,
      to: 28,
      color: 'orange',
      label: 'increased'
    }, {
      from: 28,
      to: 35,
      color: 'red',
      label: 'high'
    }],
    impedance_required: true
  },
  body_type: {
    key: 'body_type',
    label: localize(`body.${'body_type'}`),
    icon: 'body_type.png',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: null,
    showbelowlabels: null,
    severity: null,
    impedance_required: true
  },
  bone_mass: {
    key: 'bone_mass',
    label: localize(`body.${'bone_mass'}`),
    icon: 'bone_mass.png',
    unit: ' lbs',
    compute: compute.convertkgtolb,
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [{
      from: 0,
      to: 4.41,
      color: 'red',
      label: 'insufficient'
    }, {
      from: 4.41,
      to: 9.26,
      color: 'green',
      label: 'normal'
    }, {
      from: 9.26,
      to: 14.11,
      color: 'blue',
      label: 'good'
    }],
    impedance_required: true
  },
  ecw_tbw_ratio: {
    key: 'ecw_tbw_ratio',
    label: localize(`body.${'ecw_tbw_ratio'}`),
    icon: 'mdi:chart-pie',
    unit: ' %',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [{
      from: 0,
      to: 36,
      color: 'blue',
      label: 'low'
    }, {
      from: 36,
      to: 41,
      color: 'green',
      label: 'normal'
    }, {
      from: 41,
      to: 45,
      color: 'orange',
      label: 'high'
    }, {
      from: 45,
      to: 60,
      color: 'red',
      label: 'very_high'
    }],
    impedance_required: true,
    dual_impedance_required: true
  },
  extracellular_water: {
    key: 'extracellular_water',
    label: localize(`body.${'extracellular_water'}`),
    icon: 'mdi:water-opacity',
    unit: ' L',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [{
      from: 0,
      to: 14,
      color: 'blue',
      label: 'low'
    }, {
      from: 14,
      to: 22,
      color: 'green',
      label: 'normal'
    }, {
      from: 22,
      to: 28,
      color: 'orange',
      label: 'high'
    }, {
      from: 28,
      to: 50,
      color: 'red',
      label: 'very_high'
    }],
    impedance_required: true,
    dual_impedance_required: true
  },
  ideal: {
    key: 'ideal',
    label: localize(`body.${'ideal'}`),
    icon: 'ideal.png',
    unit: ' lbs',
    compute: compute.convertkgtolb,
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [{
      from: 86.64,
      to: 126.34,
      color: 'blue',
      label: 'underweight'
    }, {
      from: 126.34,
      to: 166.04,
      color: 'green',
      label: 'balanced'
    }, {
      from: 166.04,
      to: 205.75,
      color: 'orange',
      label: 'overweight'
    }, {
      from: 205.75,
      to: 245.45,
      color: 'red',
      label: 'obese'
    }],
    impedance_required: false
  },
  intracellular_water: {
    key: 'intracellular_water',
    label: localize(`body.${'intracellular_water'}`),
    icon: 'mdi:water-circle',
    unit: ' L',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [{
      from: 0,
      to: 18,
      color: 'blue',
      label: 'low'
    }, {
      from: 18,
      to: 27,
      color: 'green',
      label: 'normal'
    }, {
      from: 27,
      to: 33,
      color: 'orange',
      label: 'high'
    }, {
      from: 33,
      to: 60,
      color: 'red',
      label: 'very_high'
    }],
    impedance_required: true,
    dual_impedance_required: true
  },
  metabolic_age: {
    key: 'metabolic_age',
    label: localize(`body.${'metabolic_age'}`),
    icon: 'metabolic_age.png',
    unit: localize(`unit.${' years'}`),
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: null,
    showbelowlabels: null,
    severity: null,
    impedance_required: true
  },
  muscle_mass: {
    key: 'muscle_mass',
    label: localize(`body.${'muscle_mass'}`),
    icon: 'muscle_mass.png',
    unit: ' lbs',
    compute: compute.convertkgtolb,
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [{
      from: 86.64,
      to: 108.97,
      color: 'red',
      label: 'insufficient'
    }, {
      from: 108.97,
      to: 131.17,
      color: 'green',
      label: 'normal'
    }, {
      from: 131.17,
      to: 153.38,
      color: 'blue',
      label: 'good'
    }],
    impedance_required: true
  },
  protein: {
    key: 'protein',
    label: localize(`body.${'protein'}`),
    icon: 'protein.png',
    unit: ' %',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [{
      from: 11,
      to: 16,
      color: 'red',
      label: 'insufficient'
    }, {
      from: 16,
      to: 20,
      color: 'green',
      label: 'normal'
    }, {
      from: 20,
      to: 24,
      color: 'blue',
      label: 'good'
    }],
    impedance_required: true
  },
  skeletal_muscle_mass: {
    key: 'skeletal_muscle_mass',
    label: localize(`body.${'skeletal_muscle_mass'}`),
    icon: 'mdi:arm-flex',
    unit: ' lbs',
    compute: compute.convertkgtolb,
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [{
      from: 0,
      to: 63.93,
      color: 'red',
      label: 'low'
    }, {
      from: 63.93,
      to: 77.16,
      color: 'orange',
      label: 'below_normal'
    }, {
      from: 77.16,
      to: 97.70,
      color: 'green',
      label: 'normal'
    }, {
      from: 97.70,
      to: 121.13,
      color: 'blue',
      label: 'good'
    }],
    impedance_required: true,
    dual_impedance_required: true
  },
  visceral_fat: {
    key: 'visceral_fat',
    label: localize(`body.${'visceral_fat'}`),
    icon: 'visceral_fat.png',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [{
      from: 5,
      to: 10,
      color: 'green',
      label: 'normal'
    }, {
      from: 10,
      to: 15,
      color: 'orange',
      label: 'high'
    }, {
      from: 15,
      to: 20,
      color: 'red',
      label: 'very_high'
    }],
    impedance_required: false
  },
  water: {
    key: 'water',
    label: localize(`body.${'water'}`),
    icon: 'water.png',
    unit: ' %',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [{
      from: 45,
      to: 55,
      color: 'red',
      label: 'insufficient'
    }, {
      from: 55,
      to: 65.1,
      color: 'green',
      label: 'normal'
    }, {
      from: 65.1,
      to: 75,
      color: 'blue',
      label: 'good'
    }],
    impedance_required: true
  },
  weight: {
    key: 'weight',
    label: localize(`body.${'weight'}`),
    icon: 'ideal.png',
    unit: ' lbs',
    compute: compute.convertkgtolb,
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [{
      from: 86.64,
      to: 126.34,
      color: 'blue',
      label: 'underweight'
    }, {
      from: 126.34,
      to: 166.04,
      color: 'green',
      label: 'balanced'
    }, {
      from: 166.04,
      to: 205.75,
      color: 'orange',
      label: 'overweight'
    }, {
      from: 205.75,
      to: 245.45,
      color: 'red',
      label: 'obese'
    }],
    impedance_required: false
  }
};
const buttons = {
  user1: {
    show: false,
    label: 'User1',
    icon: 'mdi:alpha-u-circle',
    entity: ''
  },
  user2: {
    show: false,
    label: 'User2',
    icon: 'mdi:alpha-u-circle',
    entity: ''
  },
  user3: {
    show: false,
    label: 'User3',
    icon: 'mdi:alpha-u-circle',
    entity: ''
  },
  user4: {
    show: false,
    label: 'User4',
    icon: 'mdi:alpha-u-circle',
    entity: ''
  },
  user5: {
    show: false,
    label: 'User5',
    icon: 'mdi:alpha-u-circle',
    entity: ''
  }
};
const defaultCardConfig = {
  model: false,
  dual_impedance: false,
  unit: false,
  theme: true,
  show_name: true,
  show_states: true,
  show_attributes: true,
  show_always_details: false,
  show_toolbar: true,
  show_body: true,
  show_buttons: false,
  attributes: {
    impedance: {
      key: 'impedance',
      impedance_required: true,
      dual_impedance_required: false
    },
    impedance_low: {
      key: 'impedance_low',
      impedance_required: true,
      dual_impedance_required: true
    },
    impedance_high: {
      key: 'impedance_high',
      impedance_required: true,
      dual_impedance_required: true
    }
  },
  body: {
    basal_metabolism: {
      key: 'basal_metabolism',
      severity: [{
        from: 0,
        to: 1549,
        color: 'red',
        label: 'objective_not_achieved'
      }, {
        from: 1549,
        to: 3000,
        color: 'green',
        label: 'objective_achieved'
      }],
      impedance_required: false
    },
    bcm: {
      key: 'bcm',
      severity: [{
        from: 0,
        to: 25,
        color: 'red',
        label: 'low'
      }, {
        from: 25,
        to: 35,
        color: 'green',
        label: 'normal'
      }, {
        from: 35,
        to: 50,
        color: 'blue',
        label: 'good'
      }],
      impedance_required: true,
      dual_impedance_required: true
    },
    bmi: {
      key: 'bmi',
      severity: [{
        from: 12,
        to: 18.5,
        color: 'blue',
        label: 'low'
      }, {
        from: 18.5,
        to: 25.0,
        color: 'green',
        label: 'normal'
      }, {
        from: 25.0,
        to: 30.0,
        color: 'orange',
        label: 'high'
      }, {
        from: 30.0,
        to: 36.5,
        color: 'red',
        label: 'very_high'
      }],
      impedance_required: false
    },
    bmi_label: {
      key: 'bmi_label',
      impedance_required: false
    },
    body_fat: {
      key: 'body_fat',
      severity: [{
        from: 5,
        to: 12,
        color: 'royalblue',
        label: 'very_low'
      }, {
        from: 12,
        to: 18,
        color: 'blue',
        label: 'low'
      }, {
        from: 18,
        to: 23,
        color: 'green',
        label: 'normal'
      }, {
        from: 23,
        to: 28,
        color: 'orange',
        label: 'increased'
      }, {
        from: 28,
        to: 35,
        color: 'red',
        label: 'high'
      }],
      impedance_required: true
    },
    body_type: {
      key: 'body_type',
      impedance_required: true
    },
    bone_mass: {
      key: 'bone_mass',
      severity: [{
        from: 0,
        to: 2.00,
        color: 'red',
        label: 'insufficient'
      }, {
        from: 2.00,
        to: 4.20,
        color: 'green',
        label: 'normal'
      }, {
        from: 4.20,
        to: 6.40,
        color: 'blue',
        label: 'good'
      }],
      impedance_required: true
    },
    ecw_tbw_ratio: {
      key: 'ecw_tbw_ratio',
      severity: [{
        from: 0,
        to: 36,
        color: 'blue',
        label: 'low'
      }, {
        from: 36,
        to: 41,
        color: 'green',
        label: 'normal'
      }, {
        from: 41,
        to: 45,
        color: 'orange',
        label: 'high'
      }, {
        from: 45,
        to: 60,
        color: 'red',
        label: 'very_high'
      }],
      impedance_required: true,
      dual_impedance_required: true
    },
    extracellular_water: {
      key: 'extracellular_water',
      severity: [{
        from: 0,
        to: 14,
        color: 'blue',
        label: 'low'
      }, {
        from: 14,
        to: 22,
        color: 'green',
        label: 'normal'
      }, {
        from: 22,
        to: 28,
        color: 'orange',
        label: 'high'
      }, {
        from: 28,
        to: 50,
        color: 'red',
        label: 'very_high'
      }],
      impedance_required: true,
      dual_impedance_required: true
    },
    ideal: {
      key: 'ideal',
      severity: [{
        from: 39.30,
        to: 57.30,
        color: 'blue',
        label: 'underweight'
      }, {
        from: 57.30,
        to: 75.30,
        color: 'green',
        label: 'balanced'
      }, {
        from: 75.30,
        to: 93.30,
        color: 'orange',
        label: 'overweight'
      }, {
        from: 93.30,
        to: 111.30,
        color: 'red',
        label: 'obese'
      }],
      impedance_required: false
    },
    intracellular_water: {
      key: 'intracellular_water',
      severity: [{
        from: 0,
        to: 18,
        color: 'blue',
        label: 'low'
      }, {
        from: 18,
        to: 27,
        color: 'green',
        label: 'normal'
      }, {
        from: 27,
        to: 33,
        color: 'orange',
        label: 'high'
      }, {
        from: 33,
        to: 60,
        color: 'red',
        label: 'very_high'
      }],
      impedance_required: true,
      dual_impedance_required: true
    },
    metabolic_age: {
      key: 'metabolic_age',
      impedance_required: true
    },
    muscle_mass: {
      key: 'muscle_mass',
      severity: [{
        from: 39.30,
        to: 49.40,
        color: 'red',
        label: 'insufficient'
      }, {
        from: 49.40,
        to: 59.50,
        color: 'green',
        label: 'normal'
      }, {
        from: 59.50,
        to: 69.60,
        color: 'blue',
        label: 'good'
      }],
      impedance_required: true
    },
    protein: {
      key: 'protein',
      severity: [{
        from: 11,
        to: 16,
        color: 'red',
        label: 'insufficient'
      }, {
        from: 16,
        to: 20,
        color: 'green',
        label: 'normal'
      }, {
        from: 20,
        to: 24,
        color: 'blue',
        label: 'good'
      }],
      impedance_required: true
    },
    skeletal_muscle_mass: {
      key: 'skeletal_muscle_mass',
      severity: [{
        from: 0,
        to: 29,
        color: 'red',
        label: 'low'
      }, {
        from: 29,
        to: 35,
        color: 'orange',
        label: 'below_normal'
      }, {
        from: 35,
        to: 44,
        color: 'green',
        label: 'normal'
      }, {
        from: 44,
        to: 55,
        color: 'blue',
        label: 'good'
      }],
      impedance_required: true,
      dual_impedance_required: true
    },
    visceral_fat: {
      key: 'visceral_fat',
      severity: [{
        from: 5,
        to: 10,
        color: 'green',
        label: 'normal'
      }, {
        from: 10,
        to: 15,
        color: 'orange',
        label: 'high'
      }, {
        from: 15,
        to: 20,
        color: 'red',
        label: 'very_high'
      }],
      impedance_required: false
    },
    water: {
      key: 'water',
      severity: [{
        from: 45,
        to: 55,
        color: 'red',
        label: 'insufficient'
      }, {
        from: 55,
        to: 65.1,
        color: 'green',
        label: 'normal'
      }, {
        from: 65.1,
        to: 75,
        color: 'blue',
        label: 'good'
      }],
      impedance_required: true
    },
    weight: {
      key: 'weight',
      severity: [{
        from: 39.30,
        to: 57.30,
        color: 'blue',
        label: 'underweight'
      }, {
        from: 57.30,
        to: 75.30,
        color: 'green',
        label: 'balanced'
      }, {
        from: 75.30,
        to: 93.30,
        color: 'orange',
        label: 'overweight'
      }, {
        from: 93.30,
        to: 111.30,
        color: 'red',
        label: 'obese'
      }],
      impedance_required: false
    }
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
function deepMerge(...sources) {
  const overrideArrays = ['severity']; // Clés dont les tableaux doivent être écrasés
  const isObject = obj => obj && typeof obj === 'object';
  const target = {};
  sources.filter(source => isObject(source)).forEach(source => {
    Object.keys(source).forEach(key => {
      const targetValue = target[key];
      const sourceValue = source[key];
      if (Array.isArray(targetValue) && Array.isArray(sourceValue) && overrideArrays.includes(key)) {
        // Remplacer le tableau 'severity' (plutôt que de concaténer)
        target[key] = [...sourceValue];
      } else if (Array.isArray(targetValue) && Array.isArray(sourceValue) && !overrideArrays.includes(key)) {
        // Concaténer d'autres tableaux (si ce n'est pas 'severity')
        target[key] = targetValue.concat(sourceValue);
      } else if (isObject(targetValue) && isObject(sourceValue)) {
        target[key] = deepMerge({
          ...targetValue
        }, sourceValue);
      } else {
        target[key] = sourceValue;
      }
    });
  });
  return target;
}
function filterByImpedance(data, model, dual_impedance) {
  return Object.values(data).filter(item => {
    if (!model) {
      return !item.impedance_required && !item.dual_impedance_required;
    }
    if (!dual_impedance) {
      return item.dual_impedance_required !== true;
    }
    // mode dual
    return item.dual_impedance_required !== false;
  });
}

function buildStyles(config) {
  const {
    image,
    theme,
    show_toolbar,
    show_body
  } = config;
  return {
    background: image ? `
          background-image: url('${image}');
          color: white;
          text-shadow: 0 0 10px black;
          min-height: 220px;
          ${show_toolbar ? 'border-radius: 0;' : show_body ? 'border-radius: 0;' : 'border-radius: var(--ha-card-border-radius, 12px);'}
          overflow: hidden;
        ` : '',
    icon: `color: ${image ? 'white' : 'var(--state-icon-color)'};`,
    iconbody: `background-color: ${theme !== false ? 'var(--state-icon-color)' : 'white'};`
  };
}
function buildConfig(config) {
  if (!config) {
    throw new Error(localize('error.invalid_config'));
  }
  if (!config.entity) {
    throw new Error(localize('error.missing_entity'));
  }
  if (config.entity.split('.')[0] !== 'bodymiscale') {
    throw new Error(localize('error.missing_entity_bodymiscale'));
  }
  // Fusionner les données et préparer les valeurs par défaut
  return {
    type: config.type ?? 'custom:body-miscale-card',
    card_mod: config.card_mod ?? undefined,
    entity: config.entity ?? '',
    image: config.image ?? '',
    icons_body: config.icons_body ?? '',
    model: config.model ?? false,
    dual_impedance: config.dual_impedance ?? false,
    unit: config.unit ?? false,
    theme: config.theme ?? true,
    show_name: config.show_name ?? true,
    show_states: config.show_states ?? true,
    show_attributes: config.show_attributes ?? true,
    show_always_details: config.show_always_details ?? false,
    show_toolbar: config.show_toolbar ?? true,
    show_body: config.show_body ?? true,
    show_buttons: config.show_buttons ?? false,
    states: deepMerge(states, config.states),
    attributes: config.unit ? deepMerge(attributes_lb, config.attributes) : deepMerge(attributes_kg, config.attributes),
    body: config.unit ? deepMerge(body_lb, config.body) : deepMerge(body_kg, config.body),
    buttons: config.buttons === true ? {} : deepMerge(buttons, config.buttons),
    styles: buildStyles(config),
    open: config.open ?? false,
    stats: config.stats ?? {},
    color: config.color ?? undefined,
    positions: config.positions ?? {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right'
    },
    showabovelabels: config.showabovelabels ?? undefined,
    showbelowlabels: config.showbelowlabels ?? undefined,
    severity: config.severity ?? null
  };
}

var styles = ":host {\r\n  --bc-background: var(\r\n    --ha-card-background,\r\n    var(--card-background-color, white)\r\n  );\r\n  --bc-primary-text-color: var(--primary-text-color, #000);\r\n  --bc-secondary-text-color: var(--secondary-text-color, #555);\r\n  --bc-icon-color: var(--secondary-text-color);\r\n  --bc-toolbar-background: var(--bc-background);\r\n  --bc-toolbar-text-color: var(--bc-secondary-text-color);\r\n  --bc-toolbar-icon-color: var(--bc-secondary-text-color);\r\n  --bc-divider-color: var(--entities-divider-color, var(--divider-color, #ccc));\r\n  --bc-spacing: 5px;\r\n  --ha-card-border-radius: 12px;\r\n  --ha-icon-size: 24px;\r\n\r\n  /* Couleurs spécifiques pour les éléments */\r\n  --bc-bar-height: 24px;\r\n  --bc-bar-background: #e0e0e0;\r\n  --bc-bar-current: #007bff; /* Couleur de la barre */\r\n  --bc-bar-target: rgba(255, 255, 255, 0.4); /* Couleur pour la cible */\r\n  --bc-bar-remaining: rgb(\r\n    25.5,\r\n    140.7,\r\n    25.5\r\n  ); /* Couleur pour la partie restante */\r\n  --bc-bar-marker: red;\r\n}\r\n\r\nha-card {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\r\n  border-radius: var(--ha-card-border-radius);\r\n  overflow: hidden;\r\n}\r\n\r\n.background {\r\n  background-repeat: no-repeat;\r\n  background-position: center center;\r\n  background-size: cover;\r\n  height: auto;\r\n  border-radius: var(--ha-card-border-radius);\r\n  overflow: hidden;\r\n}\r\n\r\n.pointer {\r\n  cursor: pointer;\r\n}\r\n\r\n.preview {\r\n  background: var(--bc-background);\r\n  cursor: pointer;\r\n  position: relative;\r\n}\r\n\r\n.preview.not-available {\r\n  filter: grayscale(1);\r\n}\r\n\r\n.not-available {\r\n  text-align: center;\r\n  color: var(--text-primary-color, #333);\r\n  font-size: 16px;\r\n}\r\n\r\n.metadata {\r\n  margin: var(--bc-spacing) auto;\r\n}\r\n\r\n.bodymiscale-name {\r\n  font-size: 20px;\r\n  text-align: center;\r\n  white-space: nowrap;\r\n  text-overflow: ellipsis;\r\n  overflow: hidden;\r\n}\r\n\r\n.flex {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-evenly;\r\n}\r\n\r\n.grid {\r\n  cursor: pointer;\r\n  display: grid;\r\n  grid-template-columns: repeat(2, 1fr);\r\n}\r\n\r\n.grid-left,\r\n.grid-right {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 6px;\r\n}\r\n\r\n.grid-left {\r\n  text-align: left;\r\n  padding-left: 10px;\r\n  border-left: 2px solid var(--primary-color);\r\n}\r\n\r\n.grid-right {\r\n  text-align: right;\r\n  padding-right: 10px;\r\n  border-right: 2px solid var(--primary-color);\r\n}\r\n\r\n#items {\r\n  transform-origin: top;\r\n  transform: scaleY(0);\r\n  opacity: 0;\r\n  transition: transform 0.3s ease, opacity 0.3s ease;\r\n  max-height: 0;\r\n}\r\n\r\n#items[open] {\r\n  transform: scaleY(1);\r\n  opacity: 1;\r\n  max-height: 500px;\r\n}\r\n\r\n.toolbar {\r\n  background: var(--bc-toolbar-background);\r\n  min-height: 30px;\r\n  display: flex;\r\n  flex-direction: row;\r\n  align-items: center;\r\n  gap: 0px;\r\n  padding-inline: 8px;\r\n}\r\n\r\n.toolbar ha-icon-button {\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\n.fill-gap {\r\n  flex-grow: 1;\r\n  gap: 0px;\r\n}\r\n\r\n.toolbar ha-icon {\r\n  width: var(--ha-icon-size);\r\n  height: var(--ha-icon-size);\r\n  fill: currentColor;\r\n  margin: 0;\r\n  font-size: 0px; /* Override font-size inheritance to fix icon alignment */\r\n}\r\n\r\n.image {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  position: relative;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n  width: var(--ha-icon-size);\r\n  height: var(--ha-icon-size);\r\n}\r\n\r\n.problem {\r\n  color: var(--error-color, #f44336);\r\n  animation: blinker 2s cubic-bezier(0.5, 0, 1, 1) infinite alternate;\r\n}\r\n\r\n@keyframes blinker {\r\n  0% {\r\n    opacity: 1;\r\n  }\r\n  100% {\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n.state-div {\r\n  display: grid;\r\n  grid-template-columns: 24px 1fr;\r\n  align-items: start;\r\n}\r\n\r\n.state-label {\r\n  padding: 3px 0 0 10px;\r\n}\r\n\r\n#score {\r\n  display: flex;\r\n  flex-direction: column;\r\n  flex-grow: 1;\r\n  padding: 8px;\r\n}\r\n\r\n#score > * {\r\n  margin-bottom: 8px;\r\n}\r\n\r\n#score > :last-child {\r\n  margin-top: 0px;\r\n  margin-bottom: 0px;\r\n}\r\n\r\n#score > :first-child {\r\n  margin-top: 0px;\r\n}\r\n\r\n.flex-container {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  gap: 1rem;\r\n  width: 100%;\r\n}\r\n\r\n.value-container {\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: flex-start;\r\n  width: 100%;\r\n}\r\n\r\n.name {\r\n  text-align: left;\r\n}\r\n\r\n.minmax {\r\n  font-size: 10px;\r\n  color: var(--secondary-text-color);\r\n}\r\n.minmax .min, .minmax .max {\r\n  color: var(--primary-text-color);\r\n}\r\n\r\n.bar-container {\r\n  width: 100%;\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n\r\n.bar-inner {\r\n  display: flex;\r\n  height: 8px;\r\n  width: 100%;\r\n  background: var(--disabled-color, lightgray);\r\n  position: relative;\r\n  border-radius: 8px;\r\n  overflow: visible;\r\n}\r\n\r\n.bar-marker {\r\n  width: 16px;\r\n  height: 16px;\r\n  border-radius: 50%;\r\n  background: var(--card-background-color, white);\r\n  border: 3px solid var(--primary-color);\r\n}\r\n\r\n.bar-marker-wrapper {\r\n  position: absolute;\r\n  top: 50%;\r\n  transform: translate(-50%, -50%);\r\n}\r\n\r\n.bar-marker-tooltip {\r\n  position: absolute;\r\n  top: 20px; /* en dessous du cercle */\r\n  left: 50%;\r\n  transform: translateX(-50%);\r\n  background-color: var(--card-background-color, #fff);\r\n  color: var(--primary-text-color, #000);\r\n  padding: 2px 6px;\r\n  font-size: 10px;\r\n  border-radius: 4px;\r\n  white-space: nowrap;\r\n  opacity: 0;\r\n  pointer-events: none;\r\n  transition: opacity 0.2s ease;\r\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\r\n}\r\n\r\n.bar-marker-wrapper:hover .bar-marker-tooltip,\r\n.bar-marker-wrapper:focus-within .bar-marker-tooltip,\r\n.bar-marker-wrapper:active .bar-marker-tooltip {\r\n  opacity: 1;\r\n}\r\n\r\n.colorbar-segment {\r\n  height: 100%;\r\n  position: relative;\r\n}\r\n\r\n.segment-label-above {\r\n  font-size: 10px;\r\n  font-weight: bold;\r\n  position: absolute;\r\n  text-align: center;\r\n  white-space: nowrap;\r\n  top: -24px;\r\n  left: 100%;\r\n  transform: translateX(-50%);\r\n}\r\n\r\n.segment-label-below {\r\n  font-size: 10px;\r\n  font-weight: bold;\r\n  position: absolute;\r\n  text-align: center;\r\n  white-space: nowrap;\r\n  bottom: -24px;\r\n  left: 50%;\r\n  transform: translateX(-50%);\r\n}\r\n\r\n.scroll-wrapper {\r\n  max-height: 40vh; ; /* Par défaut pour les petits écrans */\r\n  overflow-y: auto;\r\n  padding-right: 0.5rem; /* espace pour la scrollbar */\r\n  scroll-behavior: smooth;\r\n}\r\n\r\n/* Scrollbar style */\r\n.scroll-wrapper::-webkit-scrollbar {\r\n  width: 6px;\r\n}\r\n.scroll-wrapper::-webkit-scrollbar-thumb {\r\n  background-color: rgba(100, 100, 100, 0.3);\r\n  border-radius: 4px;\r\n}\r\n\r\n/* Pour Firefox */\r\n.scroll-wrapper {\r\n  scrollbar-width: thin;\r\n  scrollbar-color: rgba(100, 100, 100, 0.3) transparent;\r\n}\r\n\r\n/* Styles pour les écrans jusqu'à 600px (téléphones) */\r\n@media (max-width: 600px) {\r\n  .scroll-wrapper {\r\n    max-height: 50vh;\r\n  }\r\n}\r\n\r\n@media (min-height: 600px) { /* Pour les écrans plus hauts que 600px */\r\n  .scroll-wrapper {\r\n    max-height: 300px; /* Utiliser une hauteur fixe sur les écrans plus grands */\r\n  }\r\n}\r\n\r\n/* Dark mode support complémentaire */\r\n@media (prefers-color-scheme: dark) {\r\n  :host {\r\n    --bc-bar-background: #444;\r\n    --bc-divider-color: #555;\r\n  }\r\n}\r\n\r\n/* Mobile optimisation */\r\n@media (max-width: 400px) {\r\n  .bodymiscale-name {\r\n    font-size: 16px;\r\n  }\r\n\r\n  .segment-label {\r\n    font-size: 8px;\r\n  }\r\n}";

// String in the right side will be replaced by Rollup
const PKG_VERSION = 'DEVELOPMENT';
console.info(`%c Body-miscale-card \n%c  ${localize('common.version')} ${PKG_VERSION} `, 'color: cyan; background: black; font-weight: bold;', 'color: darkblue; background: white; font-weight: bold;');
let BodymiscaleCard = class BodymiscaleCard extends i$2 {
  constructor() {
    super(...arguments);
    this.open = false;
  }
  static get styles() {
    return i$5`${r$4(styles)}`;
  }
  static async getConfigElement() {
    Promise.resolve().then(function () { return editor; });
    return document.createElement('body-miscale-card-editor');
  }
  static getStubConfig(_, entities) {
    const [bodymiscaleEntity] = entities.filter(eid => eid.startsWith('bodymiscale'));
    return {
      ...defaultCardConfig,
      entity: bodymiscaleEntity ?? ''
    };
  }
  get entity() {
    return this.hass.states[this.config.entity];
  }
  setConfig(config) {
    this.config = buildConfig(config);
  }
  getCardSize() {
    return this.config.show_name && this.config.show_buttons ? 4 : this.config.show_name || this.config.show_buttons ? 3 : 2;
  }
  shouldShowBackground() {
    return !(this.config.image === '' && this.config.show_states === false && this.config.show_attributes === false && this.config.show_always_details === true && this.config.show_body === true);
  }
  shouldUpdate(changedProps) {
    return hasConfigOrEntityChanged(this, changedProps, false);
  }
  toggle(event) {
    event?.stopPropagation();
    this.open = !this.open;
  }
  customEvent(event) {
    if (event.detail?.fold_row) {
      this.toggle(event);
    }
  }
  toggleMenu(key) {
    const menu = this.shadowRoot?.querySelector(`#bmc-menu-${key}`);
    if (menu && 'open' in menu) {
      menu.open = !menu.open;
    }
  }
  handleChange(entity) {
    if (!this.hass) return;
    // Mise à jour de l'entité principale
    this.config = {
      ...this.config,
      entity
    };
    // Déclencher un événement pour enregistrer le changement
    fireEvent(this, 'config-changed', {
      config: this.config
    });
  }
  moreInfo() {
    if (!this.config?.entity) {
      console.warn('No entity defined in the config.');
      return;
    }
    fireEvent(this, 'hass-more-info', {
      entityId: this.config.entity
    });
  }
  renderName(stateObj) {
    if (!this.config.show_name) {
      return A;
    }
    return b`
      <div class="bodymiscale-name">${stateObj.attributes.friendly_name}</div>
    `;
  }
  renderState(data) {
    if (!this.config.show_states) {
      return A;
    }
    if (!this.hass || !this.config?.entity) {
      return b`<div>${localize('state.default.unavailable')}</div>`;
    }
    const stateObj = this.hass.states?.[this.config.entity];
    if (!stateObj) {
      return b`<div>
        ${this.hass.localize('state.default.unavailable')}
      </div>`;
    }
    const keyExists = data?.key && stateObj;
    const isValidAttribute = keyExists && stateObj.attributes?.[data.key] !== undefined;
    const isValidEntityData = keyExists && stateObj[data.key] !== undefined;
    let value = isValidAttribute ? stateObj.attributes[data.key] : isValidEntityData ? stateObj[data.key] : this.hass.localize('state.default.unavailable');
    if (data.key === 'last_measurement_time' && typeof value === 'string') {
      try {
        const parsedDate = new Date(value.replace(' ', 'T'));
        const formattedDate = formatDate(parsedDate, this.hass.locale);
        const formattedTime = formatTime(parsedDate, this.hass.locale);
        value = `${formattedDate} ${formattedTime}`;
      } catch {
        /* empty */
      }
    }
    const formatValue = typeof value === 'number' ? formatNumber(value, this.hass.locale) : value;
    const localizedValue = localize(`states.${value}`) || formatValue;
    const attribute = stateObj.state === 'ok' && data.icon === 'mdi:alert' ? A : b` <div class="state-div">
            <div>${data.icon && this.renderIcon(data, 'default')}</div>
            <div class="state-label">
              ${data.label ?? ''}${localizedValue}${data.unit ?? ''}
            </div>
          </div>`;
    const hasDropdown = `${data.key}_list` in stateObj.attributes;
    return hasDropdown && (isValidAttribute || isValidEntityData) ? this.renderDropdown(attribute, data.key) : attribute;
  }
  renderAttribute(data) {
    if (!this.config.show_attributes) {
      return A;
    }
    if (!this.hass || !this.config?.entity) {
      return b`<div>${localize('state.default.unavailable')}</div>`;
    }
    const stateObj = this.hass.states?.[this.config.entity];
    if (!stateObj) {
      return b`<div>
        ${this.hass.localize('state.default.unavailable')}
      </div>`;
    }
    const computeFunc = typeof data.compute === 'function' ? data.compute : v => v;
    const keyExists = data?.key && stateObj;
    const isValidAttribute = keyExists && stateObj.attributes?.[data.key] !== undefined;
    const isValidEntityData = keyExists && stateObj[data.key] !== undefined;
    let value = isValidAttribute ? computeFunc(stateObj.attributes[data.key]) : isValidEntityData ? computeFunc(stateObj[data.key]) : this.hass.localize('state.default.unavailable');
    if (data.key === 'last_measurement_time' && typeof value === 'string') {
      try {
        const parsedDate = new Date(value.replace(' ', 'T'));
        const formattedDate = formatDate(parsedDate, this.hass.locale);
        const formattedTime = formatTime(parsedDate, this.hass.locale);
        value = `${formattedDate} ${formattedTime}`;
      } catch {
        /* empty */
      }
    }
    const formatValue = typeof value === 'number' ? formatNumber(value, this.hass.locale) : value;
    const localizedValue = localize(`attributes_value.${value}`) || formatValue;
    const attribute = b`<div>
      ${data.icon && this.renderIcon(data, 'default')}
      ${data.label ?? ''}${localizedValue}${data.unit ?? ''}
    </div>`;
    const hasDropdown = `${data.key}_list` in stateObj.attributes;
    return hasDropdown && (isValidAttribute || isValidEntityData) ? this.renderDropdown(attribute, data.key) : attribute;
  }
  renderBody(data) {
    if (!this.hass || !this.config?.entity) return A;
    const stateObj = this.hass.states?.[this.config.entity];
    if (!stateObj) return b`<div>${this.hass.localize('state.default.unavailable')}</div>`;
    const keyExists = data?.key && stateObj;
    const isValidAttr = keyExists && stateObj.attributes?.[data.key] !== undefined;
    const isValidEntity = keyExists && stateObj[data.key] !== undefined;
    const computeFunc = typeof data.compute === 'function' ? data.compute : v => v;
    const rawValue = isValidAttr ? computeFunc(stateObj.attributes[data.key]) : isValidEntity ? computeFunc(stateObj[data.key]) : this.hass.localize('state.default.unavailable');
    const formattedValue = typeof rawValue === 'number' ? formatNumber(rawValue, this.hass.locale) : rawValue;
    const iconUrl = this.getIconUrl(data.icon);
    const icon = data.icon ? b`
          <ha-icon
            class="image"
            style="
              -webkit-mask-image: url('${iconUrl}');
              mask-image: url('${iconUrl}');
              -webkit-mask-size: 24px;
              mask-size: 24px;
              background-color: currentColor;
              ${this.config.styles?.iconbody || ''}
            "
          ></ha-icon>
        ` : A;
    const name = data.label ? b`<div class="name">${data.label}</div>` : A;
    const segmentBar = typeof rawValue === 'number' ? this.renderColorBarSegments(data, rawValue, false) : A;
    const showBar = segmentBar !== A;
    const barClass = showBar ? 'bar-container' : 'bar-container compact';
    const iconPosition = data.positions.icon;
    const namePosition = data.positions.name;
    const minMaxPosition = data.positions.minmax;
    const valuePosition = data.positions.value;
    const iconBlock = iconPosition !== 'off' ? icon : A;
    const nameBlock = namePosition !== 'off' ? name : A;
    let minMaxBlock = A;
    if (minMaxPosition !== 'off' && data.severity) {
      const {
        min,
        max
      } = this.getMinMaxFromSeverity(data.severity);
      minMaxBlock = b`
        <div class="minmax">
          ${localize('editor_body.minmax_label')}
          <span class="min">${min}</span>/<span class="max">${max}</span>
        </div>`;
    }
    const valueBlock = valuePosition !== 'off' ? b`<div class="value">${localize(`body_value.${rawValue}`) || formattedValue}${data.unit || ''}</div>` : A;
    // Contenu gauche / droite
    const leftItems = [iconPosition === 'left' ? iconBlock : A, namePosition === 'left' ? nameBlock : A, minMaxPosition === 'left' ? minMaxBlock : A, valuePosition === 'left' ? valueBlock : A];
    const rightItems = [iconPosition === 'right' ? iconBlock : A, namePosition === 'right' ? nameBlock : A, minMaxPosition === 'right' ? minMaxBlock : A, valuePosition === 'right' ? valueBlock : A];
    return b`
    <div style="display: flex; flex-direction: column; padding: 0.4rem 0 0.4rem; ${!showBar ? 'justify-content: center; align-items: center;' : ''}">
      <div class="flex-container" style="${!showBar ? 'width: 100%;' : 'justify-content: space-between; width: 100%;'}">
        <div style="display: flex; align-items: center; gap: 1rem;">
          ${leftItems.filter(item => item !== A)}
        </div>
        <div style="display: flex; align-items: center; gap: 1rem; ${!showBar ? 'margin-left: auto;' : ''}">
          ${rightItems.filter(item => item !== A)}
        </div>
      </div>
  
      ${showBar ? b`
        <div class="${barClass}" style="margin-top: 1.5rem; min-height: 2rem;">
          ${segmentBar}
        </div>
      ` : A}
    </div>
  `;
  }
  getMinMaxFromSeverity(severityConfig) {
    let min = Infinity;
    let max = -Infinity;
    if (severityConfig && Array.isArray(severityConfig)) {
      severityConfig.forEach(severityLevel => {
        const fromValue = severityLevel.from;
        const toValue = severityLevel.to;
        let fromNumber;
        let toNumber;
        if (typeof fromValue === 'number') {
          fromNumber = fromValue;
        } else if (typeof fromValue === 'string' && fromValue !== 'min') {
          const parsed = parseFloat(fromValue);
          if (!isNaN(parsed)) {
            fromNumber = parsed;
          } else if (fromValue === 'min') {
            fromNumber = -Infinity;
          }
        } else if (fromValue === 'min') {
          fromNumber = -Infinity;
        }
        if (typeof toValue === 'number') {
          toNumber = toValue;
        } else if (typeof toValue === 'string' && toValue !== 'max') {
          const parsed = parseFloat(toValue);
          if (!isNaN(parsed)) {
            toNumber = parsed;
          } else if (toValue === 'max') {
            toNumber = Infinity;
          }
        } else if (toValue === 'max') {
          toNumber = Infinity;
        }
        if (fromNumber !== undefined && !isNaN(fromNumber)) {
          min = Math.min(min, fromNumber);
        }
        if (toNumber !== undefined && !isNaN(toNumber)) {
          max = Math.max(max, toNumber);
        }
      });
    }
    return {
      min: min === Infinity ? 0 : min,
      max: max === -Infinity ? 100 : max
    };
  }
  _computePercent(rangeData, numberValue) {
    if (!rangeData || typeof numberValue !== 'number') return 0;
    const range = rangeData.max - rangeData.min;
    if (range <= 0) return 0;
    return (numberValue - rangeData.min) / range * 100;
  }
  renderColorBarSegments(data, value, wrap = true) {
    const {
      min: calculatedMin,
      max: calculatedMax
    } = this.getMinMaxFromSeverity(data.severity || []);
    const range = calculatedMax - calculatedMin;
    if (!data.severity || !Array.isArray(data.severity) || range <= 0) {
      return A;
    }
    const filteredSeverity = data.severity.filter(s => s.color !== 'disabled' && s.from !== null && s.to !== null && s.color !== undefined);
    if (filteredSeverity.length === 0) {
      return A;
    }
    const segmentsHtml = filteredSeverity.map((segment, index) => {
      const from = parseFloat(segment.from) || calculatedMin;
      const to = parseFloat(segment.to) || calculatedMax;
      const widthPercent = (to - from) / range * 100;
      const color = computeCssColor(segment.color) || 'gray';
      const showAbove = data.showabovelabels !== "false";
      const showBelow = data.showbelowlabels !== "false";
      const segmentLabelAbove = showAbove && index !== filteredSeverity.length - 1 ? b`<div class="segment-label-above" style="color: ${color};">${formatNumber(to, this.hass.locale)}${data.unit || ''}</div>` : A;
      const segmentLabelBelow = showBelow && segment.label ? b`<div class="segment-label-below" style="color: ${color};">${localize(`label_below.${segment.label}`) || segment.label || ''}</div>` : A;
      return b`
        <div class="colorbar-segment" style="width: ${widthPercent}%; background-color: ${color}; border-radius: ${index === 0 ? '4px 0 0 4px' : index === filteredSeverity.length - 1 ? '0 4px 4px 0' : '0'};">
          ${segmentLabelAbove}
          ${segmentLabelBelow}
        </div>
      `;
    });
    const markerPercent = this._computePercent({
      min: calculatedMin,
      max: calculatedMax
    }, value);
    const activeSegment = filteredSeverity.find(s => value >= (parseFloat(s.from) || calculatedMin) && value <= (parseFloat(s.to) || calculatedMax));
    const markerColor = computeCssColor(activeSegment?.color) || 'var(--primary-color)';
    const barHtml = b`
      <div class="bar-inner">
        ${segmentsHtml}
        <div class="bar-marker-wrapper" style="left: ${markerPercent}%;">
          <div class="bar-marker" style="border-color: ${markerColor};"></div>
          <div class="bar-marker-tooltip">${formatNumber(value, this.hass.locale)}${data.unit || ''}</div>
        </div>
      </div>
    `;
    return wrap ? b`<div class="bar-container">${barHtml}</div>` : barHtml;
  }
  getIconUrl(iconName) {
    const basePath = this.config?.icons_body ?? '/local/images/bodyscoreIcon';
    return `${basePath}/${iconName}`;
  }
  renderIcon(data, type = 'default') {
    if (!this.hass || !this.config?.entity) {
      return A;
    }
    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj) {
      return A;
    }
    const icon = data.key.toLowerCase() === 'water' && 'water_icon' in stateObj.attributes ? stateObj.attributes.water_icon : data.icon;
    if (!icon) {
      return A;
    }
    const iconUrl = this.getIconUrl(data.icon);
    if (type === 'body' && iconUrl) {
      return b`
        <ha-icon
          class="image"
          style="
              -webkit-mask-image: url('${iconUrl}');
              mask-image: url('${iconUrl}');
              -webkit-mask-size: 24px;
              mask-size: 24px;
              ${this.config.styles?.iconbody || ''}"
        ></ha-icon>
      `;
    }
    const isProblem = stateObj.attributes.problem !== 'none' && icon === 'mdi:alert';
    const iconClass = isProblem ? 'problem' : '';
    return b`
      <ha-icon
        class="${iconClass}"
        icon="${icon}"
        style="margin-right: 10px; ${this.config.styles?.icon || ''} ${isProblem ? 'color: var(--error-color) !important;' : ''}"
      ></ha-icon>
    `;
  }
  renderButton(button) {
    if (!this.config.show_buttons || !button.show) {
      return A;
    }
    return b`
      <ha-button
        @click=${() => this.handleChange(button.entity)}
        title=${o$1(button.label)}
      >
        ${button.icon ? b`<ha-icon icon="${button.icon}"></ha-icon>` : button.label}
      </ha-button>
    `;
  }
  renderToolbar() {
    if (!this.config.show_toolbar) {
      return A;
    }
    return b`
      <div class="toolbar" @ll-custom=${this.customEvent} ?open=${this.open}>
        <ha-icon-button
          @click=${this.toggle}
          title=${o$1(localize('common.toggle_power') || undefined)}
          style="color: var(--primary-color);"
        >
          <ha-icon
            icon=${this.config.show_always_details ? '' : this.open ? 'mdi:chevron-up' : 'mdi:chevron-down'}
          ></ha-icon>
        </ha-icon-button>
        <div class="fill-gap"></div>
        ${Object.values(this.config.buttons ?? {}).filter(btn => btn.show).map(btn => this.renderButton(btn))}
      </div>
    `;
  }
  renderDropdown(attribute, key) {
    if (!this.hass || !this.config?.entity) {
      return A;
    }
    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj?.attributes) {
      return A;
    }
    const list = stateObj.attributes[`${key}_list`] ?? [];
    if (!Array.isArray(list) || list.length === 0) {
      return A;
    }
    return b` <div
      style="position: relative"
      @click=${e => e.stopPropagation()}
    >
      <ha-button @click=${() => this.toggleMenu(key)}> ${attribute} </ha-button>
      <mwc-menu
        @selected=${e => this.handleChange(list[e.detail.index])}
        id=${o$1(`bmc-menu-${key}`)}
        activatable
        corner="BOTTOM_START"
      >
        ${list.map(item => b`
            <mwc-list-item value=${item}>${item}</mwc-list-item>
          `)}
      </mwc-menu>
    </div>`;
  }
  render() {
    if (!this.hass || !this.config?.entity) {
      return A;
    }
    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj) {
      return b`
        <ha-card>
          <div class="preview not-available">
            <div class="metadata">
              <div class="not-available">
                ${localize('common.not_available')}
              </div>
            </div>
          </div>
        </ha-card>
      `;
    }
    const filteredBodyData = filterByImpedance(this.config.body ?? {}, this.config.model, this.config.dual_impedance);
    const filteredAttributesData = filterByImpedance(this.config.attributes ?? {}, this.config.model, this.config.dual_impedance);
    return b`
      <ha-card>
        ${this.shouldShowBackground() ? b`
              <div
                class="background"
                style="${this.config.styles?.background || ''};"
              >
                ${this.config.show_name ? b`<div class="title" style="padding: 12px 16px 8px">
                      ${this.renderName(stateObj)}
                    </div>` : ''}
                <div
                  class="grid"
                  style="padding: 12px 16px 8px"
                  @click="${this.moreInfo}"
                  tabindex="0"
                >
                  <div class="grid-left">
                    ${(this.config.states ? Object.values(this.config.states) : []).filter(v => v).map(this.renderState.bind(this))}
                  </div>
                  <div class="grid-right">
                    ${filteredAttributesData.filter(Boolean).map(this.renderAttribute.bind(this))}
                  </div>
                </div>
              </div>
            ` : this.config.show_name ? b`<div class="title">${this.renderName(stateObj)}</div>` : ''}
        ${this.renderToolbar()}

        <div id="items" ?open=${this.open || this.config.show_always_details}>
          <div id="score" class="card-content">
            <div class="scroll-wrapper">
              ${filteredBodyData.filter(Boolean).map(this.renderBody.bind(this))}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
__decorate([n$1({
  attribute: false
})], BodymiscaleCard.prototype, "hass", void 0);
__decorate([r()], BodymiscaleCard.prototype, "config", void 0);
__decorate([r()], BodymiscaleCard.prototype, "open", void 0);
BodymiscaleCard = __decorate([t$1('body-miscale-card')], BodymiscaleCard);
window.customCards = window.customCards || [];
window.customCards.push({
  preview: true,
  type: 'body-miscale-card',
  name: localize('common.name'),
  description: localize('common.description')
});

var css_248z = i$5`.card-config {
  display: block;
}

.option {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.option ha-switch {
  --mdc-theme-secondary: var(--switch-checked-color);
}

.option ha-select,
.option ha-input {
  width: 100%;
}

.option ha-select.small,
.option ha-input.small {
  width: 120px;
}

.option ha-input.full,
.option ha-select.full {
  flex-grow: 1;
  width: auto;
}

.option ha-formfield {
  padding-bottom: 0.5rem;
}

.flex-space-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.page-title {
  font-size: large;
  line-height: 200%;
}

.navigation {
  display: flex;
  justify-content: center;
}

ha-icon-button {
  color: var(--primary-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
}

ha-icon {
  display: inline-flex;
}

ha-form-grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(200px, 1fr)
  );
  grid-template-columns: repeat(
    var(--form-grid-column-count, auto-fit),
    minmax(var(--form-grid-min-width, 200px), 1fr)
  );
  grid-gap: 0.5rem;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.severity-row {
  margin-bottom: 0.5rem; /* Ajoute une marge en dessous de chaque bloc .severity-row */
}

.severity-row ha-input {
  margin-right: 0.5rem;
}

.severity-row .input-line {
  display: flex;
  margin-bottom: 0.5rem; /* Ajustez l'espacement sous la ligne */
}

.severity-row .input-line ha-input {
  flex: 1; /* Permet aux champs de prendre l'espace disponible de manière égale */
}

.severity-row .below-line {
  display: flex;
  align-items: center; /* Aligne verticalement le label et les icônes */
  gap: 1rem; /* Ajustez l'espacement entre le label et les icônes */
  margin-top: 0.5rem; /* Ajoutez un peu d'espace au-dessus de cette ligne */
}

.severity-row .below-line .label-input {
  flex: 1; /* Permet au label de prendre l'espace disponible, poussant les icônes à droite */
  width: auto; /* Réinitialise la largeur à auto pour qu'il ne prenne pas toute la largeur initialement */
}

.severity-icons {
  display: flex;
  align-items: center;
  gap: 4px;
}

.severity-icons .compact-icon {
  --mdc-icon-button-size: 32px;
  --mdc-icon-size: 20px;
  padding: 0 !important;
  margin: 0 !important;
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.severity-icons .compact-icon ha-icon {
  width: 20px;
  height: 20px;
}
`;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1},e=t=>(...e)=>({_$litDirective$:t,values:e});let i$1 = class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const n="important",i=" !"+n,o=e(class extends i$1{constructor(t$1){if(super(t$1),t$1.type!==t.ATTRIBUTE||"style"!==t$1.name||t$1.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,r)=>{const s=t[r];return null==s?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(e,[r]){const{style:s}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(r)),this.render(r);for(const t of this.ft)null==r[t]&&(this.ft.delete(t),t.includes("-")?s.removeProperty(t):s[t]=null);for(const t in r){const e=r[t];if(null!=e){this.ft.add(t);const r="string"==typeof e&&e.endsWith(i);t.includes("-")||r?s.setProperty(t,r?e.slice(0,-11):e,r?n:""):s[t]=e;}}return E}});

let ColorSelect = class ColorSelect extends i$2 {
  constructor() {
    super(...arguments);
    this.configValue = '';
  }
  _selectColor(color) {
    this.dispatchEvent(new CustomEvent('value-changed', {
      detail: {
        value: color || undefined
      }
    }));
  }
  render() {
    return b`
      <ha-select
        .icon=${Boolean(this.value)}
        .label=${localize('color_select.color')}
        .value=${this.value}
        @closed=${e => e.stopPropagation()}
        fixedMenuPosition
        naturalMenuWidth
      >
        <span slot="icon">
          ${this._renderColorCircle(this.value || 'grey')}
        </span>

        ${Object.keys(COLOR_HEX_MAP).map(color => b`
            <ha-list-item 
              .value=${color} 
              graphic="icon"
              @click=${() => this._selectColor(color)}
            >
              ${localize(`color_select.${color}`) || color}
              <span slot="graphic">${this._renderColorCircle(color)}</span>
            </ha-list-item>
          `)}
      </ha-select>
    `;
  }
  _renderColorCircle(color) {
    return b`
      <span
        class="circle-color"
        style=${o({
      '--circle-color': computeCssColor(color)
    })}
      ></span>
    `;
  }
  static get styles() {
    return i$5`
      .circle-color {
        display: block;
        background-color: var(--circle-color, var(--divider-color));
        border: 1px solid var(--outline-color);
        border-radius: 10px;
        width: 20px;
        height: 20px;
        box-sizing: border-box;
      }
      ha-select {
        width: 100%;
      }
    `;
  }
};
__decorate([n$1()], ColorSelect.prototype, "label", void 0);
__decorate([n$1()], ColorSelect.prototype, "value", void 0);
__decorate([n$1()], ColorSelect.prototype, "configValue", void 0);
ColorSelect = __decorate([t$1('color-select')], ColorSelect);

let BodymiscaleCardEditor = class BodymiscaleCardEditor extends i$2 {
  constructor() {
    super(...arguments);
    this.page = 1;
    this.selectedColor = 'white';
    this.config = {};
    this.isInitialized = false;
  }
  setConfig(config) {
    this.config = {
      ...config
    };
  }
  async connectedCallback() {
    super.connectedCallback();
    await this.loadCardHelpers();
  }
  shouldUpdate() {
    if (!this.isInitialized) {
      this.initialize();
    }
    return true;
  }
  render() {
    if (!this.hass || !this.helpers) {
      return A;
    }
    const config = {
      ...defaultCardConfig,
      ...this.config
    };
    return b`
      <div class="card-config">
        ${this.page === 1 ? this.renderPage1(config) : this.renderPage2(config)}
      </div>
    `;
  }
  _handleConfigClick() {
    this.page = 1;
  }
  _handleCustomClick() {
    this.page = 2;
  }
  renderPage1(config) {
    const entities = Object.keys(this.hass.states).filter(entity => entity.startsWith('bodymiscale.'));
    return b`
      <div class="flex-space-between">
        <h2 class="page-title">${localize('editor.configuration')}</h2>
        <div class="navigation">
          <ha-icon-button
            @click=${this._handleConfigClick}
            .disabled=${this.page === 1}
            .label="${localize('editor.configuration')}"
          >
            <ha-icon icon="mdi:tune"></ha-icon>
          </ha-icon-button>
          <ha-icon-button
            @click=${this._handleCustomClick}
            .disabled=${this.page === 2}
            .label="${localize('editor.customization')}"
          >
            <ha-icon icon="mdi:palette"></ha-icon>
          </ha-icon-button>
        </div>
      </div>
      <div class="option">
        <ha-select
          .label=${localize('editor.entity')}
          .value=${config.entity}
          @closed=${e => e.stopPropagation()}
          fixedMenuPosition
          naturalMenuWidth
          required
          .validationMessage=${localize('error.missing_entity')}
        >
          ${entities.map(entity => b`<ha-list-item 
                .value=${entity}
                @click=${() => this._updateValue('entity', entity)}
              >${entity}</ha-list-item>`)}
        </ha-select>
      </div>

      <div class="option">
        <ha-input
          .label=${localize('editor.image')}
          .value=${config.image || ''}
          .configValue=${'image'}
          @input=${this.valueChanged}
        ></ha-input>
      </div>

      <div class="option">
        <ha-input
          .label=${localize('editor.icons_body')}
          .value=${config.icons_body || ''}
          .configValue=${'icons_body'}
          @input=${this.valueChanged}
        ></ha-input>
      </div>

      ${this.renderSwitch('model', config)}
      ${config.model ? this.renderSwitch('dual_impedance', config) : A}
      ${this.renderSwitch('unit', config)}
      ${this.renderSwitch('theme', config)}

      <p class="page-title">
        <u>${localize('editor.header_options')}</u>
      </p>

      ${this.renderSwitch('show_name', config)}
      ${this.renderSwitch('show_states', config)}
      ${this.renderSwitch('show_attributes', config)}

      <p class="page-title">
        <u>${localize('editor.body_options')}</u>
      </p>

      ${this.renderSwitch('show_always_details', config)}
      ${this.renderSwitch('show_toolbar', config)}
      ${this.renderSwitch('show_body', config, true)}
      ${this.renderSwitch('show_buttons', config, true)}

      <strong>${localize('editor.code_only_note')}</strong>
    `;
  }
  renderPage2(config) {
    return b`
      <div class="flex-space-between">
        <h2 class="page-title">${localize('editor.customization')}</h2>
        <div class="navigation">
          <ha-icon-button
            @click=${this._handleConfigClick}
            .disabled=${this.page === 1}
            .label="${localize('editor.configuration')}"
          >
            <ha-icon icon="mdi:tune"></ha-icon>
          </ha-icon-button>
          <ha-icon-button
            @click=${this._handleCustomClick}
            .disabled=${this.page === 2}
            .label="${localize('editor.customization')}"
          >
            <ha-icon icon="mdi:palette"></ha-icon>
          </ha-icon-button>
        </div>
      </div>
      ${this.renderBodyOptions(config)}
    `;
  }
  renderSwitch(option, config, padded = false) {
    return b`
      <div style="padding: ${padded ? '0 0 0 45px' : '0'}">
        ${localize(`editor.${option}`)}
        <div class="option">
          <ha-formfield
            .label=${localize(config[option] ? `editor.${option}_aria_label_off` : `editor.${option}_aria_label_on`)}
          >
            <ha-switch
              .checked=${Boolean(config[option])}
              .configValue=${option}
              @change=${this.valueChanged}
            ></ha-switch>
          </ha-formfield>
        </div>
      </div>
    `;
  }
  renderBodyOptions(config) {
    const bodyData = config.unit === false ? body_kg : body_lb;
    const bodyConfig = config.body ?? {};
    const filteredKeys = Object.keys(bodyData).filter(key => {
      const item = bodyData[key];
      // Pas d'impédance : exclure tout ce qui nécessite une impédance
      if (!config.model) {
        return !item.impedance_required && !item.dual_impedance_required;
      }
      // Impédance simple : exclure ce qui nécessite dual
      if (!config.dual_impedance) {
        return !item.dual_impedance_required;
      }
      // Double impédance : exclure l'impédance simple (remplacée par low/high)
      if (config.dual_impedance) {
        if (item.impedance_required && item.dual_impedance_required === false) return false;
      }
      return true;
    });
    return filteredKeys.map(key => {
      const item = bodyData[key];
      const positions = bodyConfig[key]?.positions || item.positions || {};
      const showabovelabels = bodyConfig[key]?.showabovelabels !== undefined && bodyConfig[key]?.showabovelabels !== null ? bodyConfig[key].showabovelabels : item.showabovelabels;
      const showbelowlabels = bodyConfig[key]?.showbelowlabels !== undefined && bodyConfig[key]?.showbelowlabels !== null ? bodyConfig[key].showbelowlabels : item.showbelowlabels;
      const severity = bodyConfig[key]?.severity || item.severity;
      const label = localize(`body.${key}`);
      const positionKeys = ['icon', 'name', 'minmax', 'value'];
      return b`
        <div>
          <h3>${label}</h3>
          <ha-form-grid>
            ${positionKeys.map(positionKey => {
        return this.renderPositionSelect(positionKey, positions[positionKey], key);
      })}
          </ha-form-grid>
          <ha-form-grid>
            ${this.renderBooleanSelector('showabovelabels', showabovelabels, `body.${key}.showabovelabels`)}
            ${this.renderBooleanSelector('showbelowlabels', showbelowlabels, `body.${key}.showbelowlabels`)}
          </ha-form-grid>
          <ha-form-grid>
            ${this.renderSeverityInputs(severity, key)}
          </ha-form-grid>
        </div>
      `;
    });
  }
  renderPositionSelect(positionKey, currentValue, sectionKey) {
    const valueToUse = currentValue ?? '';
    const configPath = `body.${sectionKey}.positions.${positionKey}`;
    return b`
      <div class="option">
        <ha-select
          .label=${localize(`editor_body.${positionKey}_position`)}
          .value=${valueToUse}
          @closed=${e => e.stopPropagation()}
          fixedMenuPosition
          naturalMenuWidth
          class="full"
        >
          ${currentValue === undefined ? b`<ha-list-item value="" selected disabled></ha-list-item>` : A}
          <ha-list-item 
            .value=${'left'}
            @click=${() => this._updateValue(configPath, 'left')}
          >${localize('editor_body.left')}</ha-list-item>
          <ha-list-item 
            .value=${'right'}
            @click=${() => this._updateValue(configPath, 'right')}
          >${localize('editor_body.right')}</ha-list-item>
          <ha-list-item 
            .value=${'off'}
            @click=${() => this._updateValue(configPath, 'off')}
          >${localize('editor_body.off')}</ha-list-item>
        </ha-select>
      </div>
    `;
  }
  renderBooleanSelector(labelKey, currentValue, configPath) {
    if (currentValue === null || currentValue === undefined) {
      return A;
    }
    const value = String(currentValue);
    return b`
      <div class="option">
        <ha-select
          .label=${localize(`editor_body.${labelKey}`)}
          .value=${value}
          @closed=${e => e.stopPropagation()}
          fixedMenuPosition
          naturalMenuWidth
          class="full"
        >
          <ha-list-item 
            .value=${'true'}
            @click=${() => this._updateValue(configPath, 'true')}
          >${localize('editor_body.on')}</ha-list-item>
          <ha-list-item 
            .value=${'false'}
            @click=${() => this._updateValue(configPath, 'false')}
          >${localize('editor_body.off')}</ha-list-item>
        </ha-select>
      </div>
    `;
  }
  renderSeverityInputs(severity, configKey) {
    if (severity == null) {
      return A;
    }
    const severityArray = Array.isArray(severity) ? severity : [];
    // Assurer qu'il y a toujours au moins une ligne vide pour l'édition
    const itemsToRender = severityArray.length > 0 ? severityArray : [{
      from: '',
      to: '',
      color: '',
      label: ''
    }];
    return b`
      <div>
        ${itemsToRender.map((item, index) => {
      return b`
              <div class="severity-row">
                <div class="input-line">
                  <ha-input
                    .label=${localize('editor_body.from')}
                    .value=${String(item.from ?? '')}
                    @input=${ev => this.updateNumericSeverity(configKey, index, 'from', ev.target.value)}
                    type="number"
                    class="from-input"
                  ></ha-input>
                  <ha-input
                    .label=${localize('editor_body.to')}
                    .value=${String(item.to ?? '')}
                    @input=${ev => this.updateNumericSeverity(configKey, index, 'to', ev.target.value)}
                    type="number"
                    class="to-input"
                  ></ha-input>
                  <div class="color-picker-container">
                    <color-select
                      .value=${item.color ?? ''}
                      @value-changed=${ev => this.updateNumericSeverity(configKey, index, 'color', ev.detail.value)}
                    ></color-select>
                  </div>
                </div>
                <div class="below-line">
                  <ha-input
                    .label=${localize('editor_body.label_below')}
                    .value=${item.label ?? ''}
                    @input=${ev => this.updateNumericSeverity(configKey, index, 'label', ev.target.value)}
                    class="label-input"
                  ></ha-input>
                  <div class="severity-icons">
                    <ha-icon-button
                      class="compact-icon"
                      @click=${() => this.removeNumericSeverity(configKey, index)}
                    >
                      <ha-icon icon="mdi:delete"></ha-icon>
                    </ha-icon-button>
                    <ha-icon-button
                      class="compact-icon"
                      @click=${() => this.addNumericSeverity(configKey)}
                    >
                      <ha-icon icon="mdi:plus"></ha-icon>
                    </ha-icon-button>
                    <ha-icon-button
                      class="compact-icon"
                      @click=${() => window.open('https://dckiller51.github.io/lovelace-body-miscale-card/', '_blank')}
                      .label="${localize('editor_body.severity_generator_help')}"
                    >
                      <ha-icon icon="mdi:information-outline"></ha-icon>
                    </ha-icon-button>
                  </div>
                </div>
              </div>
            `;
    })}
      </div>
    `;
  }
  updateNumericSeverity(configKey, index, key, value) {
    if (this.config && this.config.body) {
      if (!Array.isArray(this.config.body[configKey]?.severity)) {
        this.config.body[configKey].severity = []; // Initialiser si nécessaire
      }
      const severity = [...this.config.body[configKey].severity];
      if (severity[index]) {
        severity[index] = {
          ...severity[index],
          [key]: value
        };
        this.updateConfig(configKey, severity);
      }
    }
  }
  addNumericSeverity(configKey) {
    if (this.config && this.config.body) {
      if (!Array.isArray(this.config.body[configKey]?.severity)) {
        this.config.body[configKey].severity = []; // Initialiser en tant que tableau si nécessaire
      }
      const severity = [...(this.config.body[configKey]?.severity || [])];
      severity.push({
        from: 0,
        to: 0,
        color: '',
        label: ''
      });
      this.updateConfig(configKey, severity);
    }
  }
  removeNumericSeverity(configKey, index) {
    const severity = [...(this.config?.body?.[configKey]?.severity || [])].filter((_, i) => i !== index);
    // Assurer qu'on a toujours au moins une ligne vide
    if (severity.length === 0) {
      severity.push({
        from: 0,
        to: 0,
        color: '',
        label: ''
      });
    }
    this.updateConfig(configKey, severity);
  }
  updateConfig(configKey, severity) {
    if (this.config && this.config.body) {
      this.config.body[configKey].severity = severity;
      this.valueChanged();
    }
  }
  valueChanged(event = null) {
    if (!this.config || !this.hass) {
      return;
    }
    if (event && event.currentTarget) {
      const target = event.currentTarget;
      if (target.configValue && typeof target.configValue === 'string') {
        const newValue = target.checked !== undefined ? target.checked : target.value || undefined;
        this._updateValue(target.configValue, newValue);
      }
    } else {
      fireEvent(this, 'config-changed', {
        config: this.config
      });
    }
  }
  _updateValue(configPath, value) {
    if (!this.config) return;
    const path = configPath.split('.');
    const newConfig = {
      ...this.config
    };
    let current = newConfig;
    for (let i = 0; i < path.length - 1; i++) {
      const key = path[i];
      if (!current[key] || typeof current[key] !== 'object') {
        current[key] = {};
      } else {
        current[key] = {
          ...current[key]
        };
      }
      current = current[key];
    }
    current[path[path.length - 1]] = value;
    this.config = newConfig;
    fireEvent(this, 'config-changed', {
      config: this.config
    });
  }
  initialize() {
    if (this.hass && this.config && this.helpers) {
      this.isInitialized = true;
    }
  }
  async loadCardHelpers() {
    this.helpers = await window.loadCardHelpers();
  }
  static get styles() {
    return css_248z;
  }
};
__decorate([n$1({
  attribute: false
})], BodymiscaleCardEditor.prototype, "hass", void 0);
__decorate([n$1({
  type: Number
})], BodymiscaleCardEditor.prototype, "page", void 0);
__decorate([n$1()], BodymiscaleCardEditor.prototype, "selectedColor", void 0);
__decorate([r()], BodymiscaleCardEditor.prototype, "config", void 0);
__decorate([r()], BodymiscaleCardEditor.prototype, "helpers", void 0);
BodymiscaleCardEditor = __decorate([t$1('body-miscale-card-editor')], BodymiscaleCardEditor);

var editor = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get BodymiscaleCardEditor () { return BodymiscaleCardEditor; }
});

export { BodymiscaleCard };
//# sourceMappingURL=body-miscale-card.js.map
