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

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$4=globalThis,e$3=t$4.ShadowRoot&&(void 0===t$4.ShadyCSS||t$4.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$1=Symbol(),o$6=new WeakMap;let n$4 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$1)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$3&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$6.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$6.set(s,t));}return t}toString(){return this.cssText}};const r$6=t=>new n$4("string"==typeof t?t:t+"",void 0,s$1),i$5=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1]),t[0]);return new n$4(o,t,s$1)},S$2=(s,o)=>{if(e$3)s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of o){const o=document.createElement("style"),n=t$4.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$3?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$6(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$4,defineProperty:e$2,getOwnPropertyDescriptor:r$5,getOwnPropertyNames:h$1,getOwnPropertySymbols:o$5,getPrototypeOf:n$3}=Object,a$2=globalThis,c$1=a$2.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$2.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$4(t,s),y$1={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$2.litPropertyMetadata??=new WeakMap;let b$1 = class b extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=y$1){if(s.state&&(s.attribute=false),this._$Ei(),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,s);void 0!==r&&e$2(this.prototype,t,r);}}static getPropertyDescriptor(t,s,i){const{get:e,set:h}=r$5(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get(){return e?.call(this)},set(s){const r=e?.call(this);h.call(this,s),this.requestUpdate(t,r,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??y$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$3(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...h$1(t),...o$5(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$2(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach((t=>t.hostConnected?.()));}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()));}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$EC(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==r?this.removeAttribute(e):this.setAttribute(e,r),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e,this[e]=r.fromAttribute(s,t.type),this._$Em=null;}}requestUpdate(t,s,i){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??f$1)(this[t],s))return;this.P(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$ET());}P(t,s,i){this._$AL.has(t)||this._$AL.set(t,s),true===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t);}async _$ET(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t) true!==i.wrapped||this._$AL.has(s)||void 0===this[s]||this.P(s,this[s],i);}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(s)):this._$EU();}catch(s){throw t=false,this._$EU(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EU(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU();}updated(t){}firstUpdated(t){}};b$1.elementStyles=[],b$1.shadowRootOptions={mode:"open"},b$1[d$1("elementProperties")]=new Map,b$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:b$1}),(a$2.reactiveElementVersions??=[]).push("2.0.4");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3=globalThis,i$3=t$3.trustedTypes,s=i$3?i$3.createPolicy("lit-html",{createHTML:t=>t}):void 0,e$1="$lit$",h=`lit$${Math.random().toFixed(9).slice(2)}$`,o$4="?"+h,n$2=`<${o$4}>`,r$4=document,l=()=>r$4.createComment(""),c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a$1=Array.isArray,u=t=>a$1(t)||"function"==typeof t?.[Symbol.iterator],d="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,y=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=y(1),T=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),A=new WeakMap,C=r$4.createTreeWalker(r$4,129);function P(t,i){if(!a$1(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s?s.createHTML(i):i}const V$1=(t,i)=>{const s=t.length-1,o=[];let r,l=2===i?"<svg>":3===i?"<math>":"",c=f;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,y=0;for(;y<s.length&&(c.lastIndex=y,u=c.exec(s),null!==u);)y=c.lastIndex,c===f?"!--"===u[1]?c=v:void 0!==u[1]?c=_:void 0!==u[2]?($.test(u[2])&&(r=RegExp("</"+u[2],"g")),c=m):void 0!==u[3]&&(c=m):c===m?">"===u[0]?(c=r??f,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?m:'"'===u[3]?g:p):c===g||c===p?c=m:c===v||c===_?c=f:(c=m,r=void 0);const x=c===m&&t[i+1].startsWith("/>")?" ":"";l+=c===f?s+n$2:d>=0?(o.push(a),s.slice(0,d)+e$1+s.slice(d)+h+x):s+h+(-2===d?i:x);}return [P(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),o]};class N{constructor({strings:t,_$litType$:s},n){let r;this.parts=[];let c=0,a=0;const u=t.length-1,d=this.parts,[f,v]=V$1(t,s);if(this.el=N.createElement(f,n),C.currentNode=this.el.content,2===s||3===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=C.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(e$1)){const i=v[a++],s=r.getAttribute(t).split(h),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:c,name:e[2],strings:s,ctor:"."===e[1]?H$1:"?"===e[1]?I:"@"===e[1]?L:k}),r.removeAttribute(t);}else t.startsWith(h)&&(d.push({type:6,index:c}),r.removeAttribute(t));if($.test(r.tagName)){const t=r.textContent.split(h),s=t.length-1;if(s>0){r.textContent=i$3?i$3.emptyScript:"";for(let i=0;i<s;i++)r.append(t[i],l()),C.nextNode(),d.push({type:2,index:++c});r.append(t[s],l());}}}else if(8===r.nodeType)if(r.data===o$4)d.push({type:2,index:c});else {let t=-1;for(;-1!==(t=r.data.indexOf(h,t+1));)d.push({type:7,index:c}),t+=h.length-1;}c++;}}static createElement(t,i){const s=r$4.createElement("template");return s.innerHTML=t,s}}function S$1(t,i,s=t,e){if(i===T)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=c(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=S$1(t,h._$AS(t,i.values),h,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??r$4).importNode(i,true);C.currentNode=e;let h=C.nextNode(),o=0,n=0,l=s[0];for(;void 0!==l;){if(o===l.index){let i;2===l.type?i=new R(h,h.nextSibling,this,t):1===l.type?i=new l.ctor(h,l.name,l.strings,this,t):6===l.type&&(i=new z(h,this,t)),this._$AV.push(i),l=s[++n];}o!==l?.index&&(h=C.nextNode(),o++);}return C.currentNode=r$4,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S$1(this,t,i),c(t)?t===E||null==t||""===t?(this._$AH!==E&&this._$AR(),this._$AH=E):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):u(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==E&&c(this._$AH)?this._$AA.nextSibling.data=t:this.T(r$4.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=N.createElement(P(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new M(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=A.get(t.strings);return void 0===i&&A.set(t.strings,i=new N(t)),i}k(t){a$1(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new R(this.O(l()),this.O(l()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(false,true,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class k{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=E,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=E;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=S$1(this,t,i,0),o=!c(t)||t!==this._$AH&&t!==T,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=S$1(this,e[s+n],i,n),r===T&&(r=this._$AH[n]),o||=!c(r)||r!==this._$AH[n],r===E?t=E:t!==E&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}let H$1 = class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===E?void 0:t;}};class I extends k{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==E);}}class L extends k{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=S$1(this,t,i,0)??E)===T)return;const s=this._$AH,e=t===E&&s!==E||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==E&&(s===E||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S$1(this,t);}}const j=t$3.litHtmlPolyfillSupport;j?.(N,R),(t$3.litHtmlVersions??=[]).push("3.2.1");const B$1=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new R(i.insertBefore(l(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let r$3 = class r extends b$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const s=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=B$1(s,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return T}};r$3._$litElement$=true,r$3["finalized"]=true,globalThis.litElementHydrateSupport?.({LitElement:r$3});const i$2=globalThis.litElementPolyfillSupport;i$2?.({LitElement:r$3});(globalThis.litElementVersions??=[]).push("4.1.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=t=>(e,o)=>{ void 0!==o?o.addInitializer((()=>{customElements.define(t,e);})):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$3={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1},r$2=(t=o$3,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t);},init(e){return void 0!==e&&this.P(o,void 0,t),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t);}}throw Error("Unsupported decorator location: "+n)};function n$1(t){return (e,o)=>"object"==typeof o?r$2(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,r?{...t,wrapped:true}:t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r$1(r){return n$1({...r,state:true,attribute:false})}

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$2=o=>o??E;

var t$1,r,a=function(e,t){return o$1(t).format(e)},o$1=function(e){return new Intl.DateTimeFormat(e.language,{year:"numeric",month:"long",day:"numeric"})};!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none";}(t$1||(t$1={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24";}(r||(r={}));var b=function(e){if(e.time_format===r.language||e.time_format===r.system){var t=e.time_format===r.language?e.language:void 0,n=(new Date).toLocaleString(t);return n.includes("AM")||n.includes("PM")}return e.time_format===r.am_pm},D=function(e,t){return S(t).format(e)},S=function(e){return new Intl.DateTimeFormat(e.language,{hour:"numeric",minute:"2-digit",hour12:b(e)})};function O(){return (O=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n]);}return e}).apply(this,arguments)}var U=function(e){switch(e.number_format){case t$1.comma_decimal:return ["en-US","en"];case t$1.decimal_comma:return ["de","es","it"];case t$1.space_comma:return ["fr","sv","cs"];case t$1.system:return;default:return e.language}},B=function(e,t){return void 0===t&&(t=2),Math.round(e*Math.pow(10,t))/Math.pow(10,t)},H=function(e,r,n){var i=r?U(r):void 0;if(Number.isNaN=Number.isNaN||function e(t){return "number"==typeof t&&e(t)},(null==r?void 0:r.number_format)!==t$1.none&&!Number.isNaN(Number(e))&&Intl)try{return new Intl.NumberFormat(i,V(e,n)).format(Number(e))}catch(t){return console.error(t),new Intl.NumberFormat(void 0,V(e,n)).format(Number(e))}return "string"==typeof e?e:B(e,void 0).toString()+("")},V=function(e,t){var r=O({maximumFractionDigits:2},t);if("string"!=typeof e)return r;{var n=e.indexOf(".")>-1?e.split(".")[1].length:0;r.minimumFractionDigits=n,r.maximumFractionDigits=n;}return r},ne=function(e,t,r,n){n=n||{},r=null==r?{}:r;var i=new Event(t,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return i.detail=r,e.dispatchEvent(i),i};function _e(e,t,r){if(t.has("config")||r)return  true;if(e.config.entity){var n=t.get("hass");return !n||n.states[e.config.entity]!==e.hass.states[e.config.entity]}return  false}

/* eslint-disable @typescript-eslint/no-explicit-any */
function deepMerge(...sources) {
    const isObject = (obj) => obj && typeof obj === 'object';
    const target = {};
    sources
        .filter((source) => isObject(source))
        .forEach((source) => {
        Object.keys(source).forEach((key) => {
            const targetValue = target[key];
            const sourceValue = source[key];
            if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
                target[key] = targetValue.concat(sourceValue);
            }
            else if (isObject(targetValue) && isObject(sourceValue)) {
                target[key] = deepMerge(Object.assign({}, targetValue), sourceValue);
            }
            else {
                target[key] = sourceValue;
            }
        });
    });
    return target;
}
function filterByImpedance(data, model) {
    return Object.values(data).filter((item) => model || !item.impedance_required);
}

var common$h = {
	version: "Verze",
	name: "Karta Bodymiscale",
	description: "Karta bodymiscale ukazuje údaje ohledně váhy a tělesných proporcí",
	not_available: "Bodymiscale není dostupná",
	toggle_power: "Více podrobností jako například BMI kCal zobrazit / skrýt"
};
var states$i = {
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
var attributes$h = {
	"weight: ": "Váha: ",
	"impedance: ": "Impedance: ",
	"height: ": "Výška: ",
	"age: ": "Věk: ",
	"gender: ": "Pohlaví: "
};
var attributes_value$h = {
	male: "muž",
	female: "žena",
	unavailable: "nedostupná"
};
var body$h = {
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
	metabolic_age: "Metabolický věk"
};
var body_value$h = {
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
var unit$h = {
	" years": " let"
};
var error$h = {
	missing_entity: "Prosím definujte entitu.",
	missing_entity_bodymiscale: "Prosím definujte entitu bodymiscale."
};
var editor$i = {
	entity: "Prosím definujte účet váhy (povinné) !",
	image: "Obrázek pozadí (volitelné)",
	icons_body: "Cesta k ikonám (např. /local/images/bodyscoreIcon)",
	model: "Máte senzor impedance?",
	model1: "Aktivujte tuto funkci pro přesné měření složení těla.",
	model_aria_label_on: "Aktivovat impedanci",
	model_aria_label_off: "Deaktivovat impedanci",
	unit: "Převést kilogramy na libry",
	unit_aria_label_on: "Zapnout konverzi",
	unit_aria_label_off: "Vypnout konverzi",
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
var editor_body$h = {
	from: "Od",
	height: "Výška lišty",
	icon_position: "Pozice ikony",
	inside: "Uvnitř",
	max: "Max",
	min: "Min",
	minmax_position: "Pozice Min/Max",
	name_position: "Pozice názvu",
	off: "Vypnuto",
	outside: "Vně",
	target: "Cíl",
	to: "Do",
	value_position: "Pozice hodnoty"
};
var color_select$h = {
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
var cs = {
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
	color_select: color_select$h
};

var cs$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    attributes: attributes$h,
    attributes_value: attributes_value$h,
    body: body$h,
    body_value: body_value$h,
    color_select: color_select$h,
    common: common$h,
    default: cs,
    editor: editor$i,
    editor_body: editor_body$h,
    error: error$h,
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
	metabolic_age: "stoffwechselbedingtes Körperalter"
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
	height: "Leistenhöhe",
	icon_position: "Symbolposition",
	inside: "Innen",
	max: "Max",
	min: "Min",
	minmax_position: "Min/Max Position",
	name_position: "Name Position",
	off: "Aus",
	outside: "Außen",
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
	color_select: color_select$g
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
	metabolic_age: "Metabolic age"
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
	height: "Bar height",
	icon_position: "Icon Position",
	inside: "Inside",
	max: "Max",
	min: "Min",
	minmax_position: "Min/Max Position",
	name_position: "Name Position",
	off: "Off",
	outside: "Outside",
	target: "Target",
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
	color_select: color_select$f
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
	metabolic_age: "Edad metabólica"
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
	missing_entity: "Por favor, defina una entidad.",
	missing_entity_bodymiscale: "Por favor, defina una entidad bodymiscale."
};
var editor$f = {
	entity: "Por favor, escoja una cuenta de la bácula (necesario)!",
	image: "Imagen de fondo (opcional)",
	icons_body: "Ruta de los iconos (ej: /local/images/bodyscoreIcon)",
	model: "¿Tiene un sensor de impedancia?",
	model1: "Active esta función para mediciones precisas de la composición corporal.",
	model_aria_label_on: "Activar impedancia",
	model_aria_label_off: "Desactivar impedancia",
	unit: "Convertir kg a lbs",
	unit_aria_label_on: "Activar conversión",
	unit_aria_label_off: "Desactivar conversión",
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
	height: "Altura de la barra",
	icon_position: "Posición del ícono",
	inside: "Dentro",
	max: "Máx",
	min: "Mín",
	minmax_position: "Posición Mín/Máx",
	name_position: "Posición del nombre",
	off: "Apagar",
	outside: "Fuera",
	target: "Objetivo",
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
	color_select: color_select$e
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
    states: states$f,
    unit: unit$e
});

var common$d = {
	version: "Versió",
	name: "Targeta Bodymiscale",
	description: "La targeta Bodymiscale mostra l'estat del teu cos en relació amb el teu pes.",
	not_available: "Bodymiscale no està disponible",
	toggle_power: "Mostra / amaga més detalls com IMC, kCal"
};
var states$e = {
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
var attributes$d = {
	"weight: ": "Pes: ",
	"impedance: ": "Impedància: ",
	"height: ": "Alçada: ",
	"age: ": "Edat: ",
	"gender: ": "Sexe: "
};
var attributes_value$d = {
	male: "masculí",
	female: "femení",
	unavailable: "no disponible"
};
var body$d = {
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
	metabolic_age: "Edat metabòlica"
};
var body_value$d = {
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
var unit$d = {
	" years": " anys"
};
var error$d = {
	invalid_config: "Configuració no vàlida",
	missing_entity: "Si us plau, definiu una entitat.",
	missing_entity_bodymiscale: "Si us plau, definiu una entitat Bodymiscale."
};
var editor$e = {
	configuration: "Configuració",
	customization: "Personalització",
	entity: "Si us plau, trieu un compte de la bàscula (necessari)!",
	image: "Imatge de fons (opcional)",
	icons_body: "Camí de les icones (ex: /local/images/bodyscoreIcon)",
	model: "Teniu un sensor d'impedància?",
	model1: "Activeu aquesta funció per a mesures precises de la composició corporal.",
	model_aria_label_on: "Activar impedància",
	model_aria_label_off: "Desactivar impedància",
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
var editor_body$d = {
	from: "De",
	height: "Alçada de la barra",
	icon_position: "Posició de la icona",
	inside: "Dins",
	max: "Màx",
	min: "Mín",
	minmax_position: "Posició Mín/Màx",
	name_position: "Posició del nom",
	off: "Apagar",
	outside: "Fora",
	target: "Objectiu",
	to: "A",
	value_position: "Posició del valor"
};
var color_select$d = {
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
var ca = {
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
	color_select: color_select$d
};

var ca$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    attributes: attributes$d,
    attributes_value: attributes_value$d,
    body: body$d,
    body_value: body_value$d,
    color_select: color_select$d,
    common: common$d,
    default: ca,
    editor: editor$e,
    editor_body: editor_body$d,
    error: error$d,
    states: states$e,
    unit: unit$d
});

var common$c = {
	version: "Version",
	name: "Carte Bodymiscale",
	description: "La carte bodymiscale corporelle vous indique votre poids et votre état corporel.",
	not_available: "Bodymiscale n'est pas disponible",
	toggle_power: "Plus de détails comme IMC kCal afficher / cacher"
};
var states$d = {
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
var attributes$c = {
	"weight: ": "Poids: ",
	"impedance: ": "Impédance: ",
	"height: ": "Taille: ",
	"age: ": "Age: ",
	"gender: ": "Genre: "
};
var attributes_value$c = {
	male: "homme",
	female: "femme",
	unavailable: "indisponible"
};
var body$c = {
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
	metabolic_age: "Age corporel"
};
var body_value$c = {
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
var unit$c = {
	" years": " ans"
};
var error$c = {
	invalid_config: "Configuration invalide",
	missing_entity: "Veuillez définir une entité.",
	missing_entity_bodymiscale: "Veuillez définir une entité Bodymiscale."
};
var editor$d = {
	configuration: "Configuration",
	customization: "Personnalisation",
	entity: "Veuillez choisir un compte de la balance (obligatoire) !",
	image: "Image de fond (facultatif)",
	icons_body: "Chemin des icônes (ex: /local/images/bodyscoreIcon)",
	model: "Vous avez un capteur d'impédance ?",
	model1: "Activez cette fonctionnalité pour des mesures corporelle précises.",
	model_aria_label_on: "Activez l'impédance",
	model_aria_label_off: "Désactiver l'impédance",
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
var editor_body$c = {
	from: "De",
	height: "Hauteur de la barre",
	icon_position: "Position de l'icône",
	inside: "À l'intérieur",
	max: "Max",
	min: "Min",
	minmax_position: "Position Min/Max",
	name_position: "Position du nom",
	off: "Désactivé",
	outside: "À l'extérieur",
	target: "Cible",
	to: "À",
	value_position: "Position de la valeur"
};
var color_select$c = {
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
var fr = {
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
	color_select: color_select$c
};

var fr$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    attributes: attributes$c,
    attributes_value: attributes_value$c,
    body: body$c,
    body_value: body_value$c,
    color_select: color_select$c,
    common: common$c,
    default: fr,
    editor: editor$d,
    editor_body: editor_body$c,
    error: error$c,
    states: states$d,
    unit: unit$c
});

var common$b = {
	version: "Verzió",
	name: "Bodymiscale Kártya",
	description: "A BodyMiScale kártya megmutatja az ön súlyhoz viszonyított testi állapotát.",
	not_available: "A Bodymiscale nem elérhető",
	toggle_power: "További részletek, például a BMI, kCal megjelenítése / elrejtése"
};
var states$c = {
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
var attributes$b = {
	"weight: ": "Súly: ",
	"impedance: ": "Impedancia: ",
	"height: ": "Magasság: ",
	"age: ": "Kor: ",
	"gender: ": "Nem: "
};
var attributes_value$b = {
	male: "férfi",
	female: "nő",
	unavailable: "nem elérhető"
};
var body$b = {
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
	metabolic_age: "Anyagcsere kor"
};
var body_value$b = {
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
var unit$b = {
	" years": " év"
};
var error$b = {
	missing_entity: "Kérjük, definiáljon egy entitást.",
	missing_entity_bodymiscale: "Kérjük, definiáljon egy BodyMiScale entitást."
};
var editor$c = {
	entity: "Kérjük, válasszon egy fiókot a mérlegen (kötelező)!",
	image: "Háttérkép (opcionális)",
	icons_body: "Ikonok útvonala (pl.: /local/images/bodyscoreIcon)",
	model: "Rendelkezik impedancia érzékelővel?",
	model1: "A pontos testösszetétel mérésekhez aktiválja ezt a funkciót.",
	model_aria_label_on: "Impedancia engedélyezése",
	model_aria_label_off: "Impedancia letiltása",
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
var editor_body$b = {
	from: "Tól",
	height: "Sáv magassága",
	icon_position: "Ikon pozíció",
	inside: "Belső",
	max: "Max",
	min: "Min",
	minmax_position: "Min/Max pozíció",
	name_position: "Név pozíció",
	off: "Kikapcsolva",
	outside: "Külső",
	target: "Cél",
	to: "Tovább",
	value_position: "Érték pozíció"
};
var color_select$b = {
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
var hu = {
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
	color_select: color_select$b
};

var hu$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    attributes: attributes$b,
    attributes_value: attributes_value$b,
    body: body$b,
    body_value: body_value$b,
    color_select: color_select$b,
    common: common$b,
    default: hu,
    editor: editor$c,
    editor_body: editor_body$b,
    error: error$b,
    states: states$c,
    unit: unit$b
});

var common$a = {
	version: "Versione",
	name: "Bodymiscale Card",
	description: "La card bodymiscale ti mostra il tuo peso/stato corporeo relativo.",
	not_available: "Bodymiscale non è disponibile",
	toggle_power: "Più dettagli come BMI kCal mostra / nascondi"
};
var states$b = {
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
var attributes$a = {
	"weight: ": "Peso: ",
	"impedance: ": "Impedenza: ",
	"height: ": "Altezza: ",
	"age: ": "Età: ",
	"gender: ": "Sesso: "
};
var attributes_value$a = {
	male: "uomo",
	female: "donna",
	unavailable: "non disponibile"
};
var body$a = {
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
	metabolic_age: "Età metabolica"
};
var body_value$a = {
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
var unit$a = {
	" years": " anni"
};
var error$a = {
	missing_entity: "Perfavore definisci un'entità.",
	missing_entity_bodymiscale: "Perfavore definisci un'entità di tipo bodymiscale."
};
var editor$b = {
	entity: "Perfavore seleziona un account sulla bilancia (richiesto) !",
	image: "Immagine di sfondo (opzionale)",
	icons_body: "Percorso delle icone (es: /local/images/bodyscoreIcon)",
	model: "Hai un sensore di impedenza?",
	model1: "Attiva questa funzione per misurazioni accurate della composizione corporea.",
	model_aria_label_on: "Abilita impedenza",
	model_aria_label_off: "Disabilita impedenza",
	unit: "Converti da kg a lbs",
	unit_aria_label_on: "Attiva la conversione",
	unit_aria_label_off: "Disattiva la conversione",
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
var editor_body$a = {
	from: "Da",
	height: "Altezza barra",
	icon_position: "Posizione icona",
	inside: "Dentro",
	max: "Max",
	min: "Min",
	minmax_position: "Posizione Min/Max",
	name_position: "Posizione nome",
	off: "Spento",
	outside: "Fuori",
	target: "Destinazione",
	to: "A",
	value_position: "Posizione valore"
};
var color_select$a = {
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
var it = {
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
	color_select: color_select$a
};

var it$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    attributes: attributes$a,
    attributes_value: attributes_value$a,
    body: body$a,
    body_value: body_value$a,
    color_select: color_select$a,
    common: common$a,
    default: it,
    editor: editor$b,
    editor_body: editor_body$a,
    error: error$a,
    states: states$b,
    unit: unit$a
});

var common$9 = {
	version: "Version",
	name: "Bodymiscale Card",
	description: "ボディミスケール カードは、体重や関連する身体の状態を表示します。",
	not_available: "Bodymiscale は利用できません",
	toggle_power: "BMI kCal などの詳細を表示/非表示"
};
var states$a = {
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
var attributes$9 = {
	"weight: ": "体重: ",
	"impedance: ": "インピーダンス: ",
	"height: ": "高さ: ",
	"age: ": "年齢: ",
	"gender: ": "性別: "
};
var attributes_value$9 = {
	male: "男性",
	female: "女性",
	unavailable: "利用不可"
};
var body$9 = {
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
	metabolic_age: "代謝年齢"
};
var body_value$9 = {
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
var unit$9 = {
	" years": " 年齢"
};
var error$9 = {
	invalid_config: "無効な設定です",
	missing_entity: "エンティティを設定して下さい。",
	missing_entity_bodymiscale: "bodymiscale エンティティを定義してください。"
};
var editor$a = {
	entity: "スケール上のアカウントを選択してください (必須)!",
	image: "背景画像（オプション）",
	icons_body: "アイコンのパス (例: /local/images/bodyscoreIcon)",
	model: "インピーダンスセンサーはありますか?",
	model1: "正確な体組成測定のためにこの機能を有効にしてください。",
	model_aria_label_on: "インピーダンスを有効にする",
	model_aria_label_off: "インピーダンスを無効にする",
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
var editor_body$9 = {
	from: "から",
	height: "バーの高さ",
	icon_position: "アイコンの位置",
	inside: "内側",
	max: "最大",
	min: "最小",
	minmax_position: "最小/最大の位置",
	name_position: "名前の位置",
	off: "オフ",
	outside: "外側",
	target: "ターゲット",
	to: "へ",
	value_position: "値の位置"
};
var color_select$9 = {
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
var ja = {
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
	color_select: color_select$9
};

var ja$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    attributes: attributes$9,
    attributes_value: attributes_value$9,
    body: body$9,
    body_value: body_value$9,
    color_select: color_select$9,
    common: common$9,
    default: ja,
    editor: editor$a,
    editor_body: editor_body$9,
    error: error$9,
    states: states$a,
    unit: unit$9
});

var common$8 = {
	version: "Versie",
	name: "Bodymiscale Card",
	description: "De bodymiscale kaart toont u uw gewicht / gerelateerde lichaamsstatus.",
	not_available: "Bodymiscale is niet beschikbaar",
	toggle_power: "Meer details zoals BMI kCal tonen / verbergen"
};
var states$9 = {
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
var attributes$8 = {
	"weight: ": "Gewicht: ",
	"impedance: ": "Impedantie: ",
	"height: ": "Lengte: ",
	"age: ": "Leeftijd: ",
	"gender: ": "Geslacht: "
};
var attributes_value$8 = {
	male: "man",
	female: "vrouw",
	unavailable: "niet beschikbaar"
};
var body$8 = {
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
	metabolic_age: "Metabolistische leeftijd"
};
var body_value$8 = {
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
var unit$8 = {
	" years": " jaren"
};
var error$8 = {
	missing_entity: "Geef een entiteit in.",
	missing_entity_bodymiscale: "Geef een bodymiscale entiteit in."
};
var editor$9 = {
	entity: "Kies een account op de schaal (verplicht) !",
	image: "Achtergrondafbeelding (facultatief)",
	icons_body: "Icoonpad (bijv. /local/images/bodyscoreIcon)",
	model: "Heeft u een impedantie sensor?",
	model1: "Activeer deze functie voor nauwkeurige metingen van de lichaamssamenstelling.",
	model_aria_label_on: "Impedantie inschakelen",
	model_aria_label_off: "Impedantie uitschakelen",
	unit: "Converteer kg naar lbs",
	unit_aria_label_on: "Activeer conversie",
	unit_aria_label_off: "Conversie deactiveren",
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
var editor_body$8 = {
	from: "Van",
	height: "Balkhoogte",
	icon_position: "Pictogrampositie",
	inside: "Binnen",
	max: "Max",
	min: "Min",
	minmax_position: "Min/Max Positie",
	name_position: "Naam Positie",
	off: "Uit",
	outside: "Buiten",
	target: "Doel",
	to: "Naar",
	value_position: "Waarde Positie"
};
var color_select$8 = {
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
var nl = {
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
	color_select: color_select$8
};

var nl$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    attributes: attributes$8,
    attributes_value: attributes_value$8,
    body: body$8,
    body_value: body_value$8,
    color_select: color_select$8,
    common: common$8,
    default: nl,
    editor: editor$9,
    editor_body: editor_body$8,
    error: error$8,
    states: states$9,
    unit: unit$8
});

var common$7 = {
	version: "Wersja",
	name: "Karta Bodymiscale",
	description: "Karta BodyMiScale pokazuje Twoją wagę oraz parametry ciała.",
	not_available: "Bodymiscale jest niedostępna",
	toggle_power: "Więcej szczegółów jak BMI kCal - pokaż / ukryj"
};
var states$8 = {
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
var attributes$7 = {
	"weight: ": "Waga: ",
	"impedance: ": "Impedancja: ",
	"height: ": "Wzrost: ",
	"age: ": "Wiek: ",
	"gender: ": "Płeć: "
};
var attributes_value$7 = {
	male: "męska",
	female: "żeńska",
	unavailable: "niedstępna"
};
var body$7 = {
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
	metabolic_age: "Wiek metaboliczny"
};
var body_value$7 = {
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
var unit$7 = {
	" years": " lat"
};
var error$7 = {
	missing_entity: "Proszę zdefiniuj encje.",
	missing_entity_bodymiscale: "Proszę zdefiniuj encję bodymiscale."
};
var editor$8 = {
	entity: "Proszę wybierz konto na wadze (wymagane)!",
	image: "Obraz tła (opcjonalne)",
	icons_body: "Ścieżka ikon (np. /local/images/bodyscoreIcon)",
	model: "Czy masz czujnik impedancji?",
	model1: "Włącz tę funkcję, aby uzyskać dokładne pomiary składu ciała.",
	model_aria_label_on: "Włącz impedancję",
	model_aria_label_off: "Wyłącz impedancję",
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
var editor_body$7 = {
	from: "Od",
	height: "Wysokość paska",
	icon_position: "Pozycja ikony",
	inside: "Wewnątrz",
	max: "Max",
	min: "Min",
	minmax_position: "Pozycja Min/Max",
	name_position: "Pozycja nazwy",
	off: "Wyłącz",
	outside: "Na zewnątrz",
	target: "Cel",
	to: "Do",
	value_position: "Pozycja wartości"
};
var color_select$7 = {
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
var pl = {
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
	color_select: color_select$7
};

var pl$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    attributes: attributes$7,
    attributes_value: attributes_value$7,
    body: body$7,
    body_value: body_value$7,
    color_select: color_select$7,
    common: common$7,
    default: pl,
    editor: editor$8,
    editor_body: editor_body$7,
    error: error$7,
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
	metabolic_age: "Idade metabólica"
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
	missing_entity: "Por favor, defina uma entidade.",
	missing_entity_bodymiscale: "Por favor, defina uma entidade bodymiscale."
};
var editor$7 = {
	entity: "Por favor, escolha a entidade da balança com o nome da pessoa (obrigatório) !",
	image: "Imagem de fundo (opcional)",
	icons_body: "Caminho dos ícones (ex: /local/images/bodyscoreIcon)",
	model: "Tem um sensor de impedância?",
	model1: "Ative esta função para medições precisas da composição corporal.",
	model_aria_label_on: "Ativar impedância",
	model_aria_label_off: "Desativar impedância",
	unit: "Converter kg em libras",
	unit_aria_label_on: "Ativar a conversão kg para lbs",
	unit_aria_label_off: "Desativar a conversão kg para lbs",
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
	height: "Altura da barra",
	icon_position: "Posição do ícone",
	inside: "Dentro",
	max: "Máximo",
	min: "Mínimo",
	minmax_position: "Posição Min/Max",
	name_position: "Posição do nome",
	off: "Desligado",
	outside: "Fora",
	target: "Alvo",
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
	color_select: color_select$6
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
    states: states$7,
    unit: unit$6
});

var common$5 = {
	version: "Versão",
	name: "Bodymiscale Card",
	description: "O cartão bodymiscale mostra-lhe o estado do seu corpo em relação ao peso.",
	not_available: "Bodymiscale não é avaialável",
	toggle_power: "Mais detalhes como o kCal show / hide da BMI"
};
var states$6 = {
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
var attributes$5 = {
	"weight: ": "Peso: ",
	"impedance: ": "Impedance: ",
	"height: ": "Cintura: ",
	"age: ": "Idade: ",
	"gender: ": "Gênero: "
};
var attributes_value$5 = {
	male: "macho",
	female: "fêmea",
	unavailable: "indisponível"
};
var body$5 = {
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
	metabolic_age: "Idade metabólica"
};
var body_value$5 = {
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
var unit$5 = {
	" years": " Anos"
};
var error$5 = {
	missing_entity: "Por favor, defina uma entidade.",
	missing_entity_bodymiscale: "Por favor, defina uma entidade bodymiscale."
};
var editor$6 = {
	entity: "Por favor, escolha uma conta na escala (obrigatório) !",
	image: "Imagem de fundo (opcional)",
	icons_body: "Caminho dos ícones (ex: /local/images/bodyscoreIcon)",
	model: "Você tem um sensor de impedância?",
	model1: "Ative esta função para medições precisas da composição corporal.",
	model_aria_label_on: "Ativar impedância",
	model_aria_label_off: "Desativar impedância",
	unit: "Converter kg em libras",
	unit_aria_label_on: "Ativar a conversão",
	unit_aria_label_off: "Desativar a conversão",
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
var editor_body$5 = {
	from: "De",
	height: "Altura da barra",
	icon_position: "Posição do ícone",
	inside: "Dentro",
	max: "Máximo",
	min: "Mínimo",
	minmax_position: "Posição Min/Max",
	name_position: "Posição do nome",
	off: "Desligado",
	outside: "Fora",
	target: "Alvo",
	to: "Para",
	value_position: "Posição do valor"
};
var color_select$5 = {
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
var ptBR = {
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
	color_select: color_select$5
};

var pt_BR = /*#__PURE__*/Object.freeze({
    __proto__: null,
    attributes: attributes$5,
    attributes_value: attributes_value$5,
    body: body$5,
    body_value: body_value$5,
    color_select: color_select$5,
    common: common$5,
    default: ptBR,
    editor: editor$6,
    editor_body: editor_body$5,
    error: error$5,
    states: states$6,
    unit: unit$5
});

var common$4 = {
	version: "Versiune",
	name: "Bodymiscale Card",
	description: "Cardul bodymiscale îți arată starea ta în funcție de greutate/corespunzătoare corpului.",
	not_available: "Bodymiscale nu este disponibil",
	toggle_power: "Mai multe detalii precum BMI kCal arată/ascunde"
};
var states$5 = {
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
var attributes$4 = {
	"weight: ": "Greutate: ",
	"impedance: ": "Impedanță: ",
	"height: ": "Înălţime: ",
	"age: ": "Vârstă: ",
	"gender: ": "Gen: "
};
var attributes_value$4 = {
	male: "masculin",
	female: "feminin",
	unavailable: "indisponibil"
};
var body$4 = {
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
	metabolic_age: "Vârsta metabolică"
};
var body_value$4 = {
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
var unit$4 = {
	" years": " ani"
};
var error$4 = {
	missing_entity: "Vă rugăm să definiți o entitate.",
	missing_entity_bodymiscale: "Definiți o entitate bodymiscale."
};
var editor$5 = {
	entity: "Vă rugăm să selectați un cont de cântar (obligatoriu)!",
	image: "Imagine de fundal (opțional)",
	icons_body: "Calea pictogramelor (ex: /local/images/bodyscoreIcon)",
	model: "Aveți un senzor de impedanță?",
	model1: "Activați această funcție pentru măsurători precise ale compoziției corporale.",
	model_aria_label_on: "Activare impedanță",
	model_aria_label_off: "Dezactivare impedanță",
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
var editor_body$4 = {
	from: "De la",
	height: "Înălțimea barei",
	icon_position: "Poziția pictogramei",
	inside: "Interior",
	max: "Maxim",
	min: "Minim",
	minmax_position: "Poziția Min/Max",
	name_position: "Poziția numelui",
	off: "Oprit",
	outside: "Exterior",
	target: "Țintă",
	to: "La",
	value_position: "Poziția valorii"
};
var color_select$4 = {
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
var ro = {
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
	color_select: color_select$4
};

var ro$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    attributes: attributes$4,
    attributes_value: attributes_value$4,
    body: body$4,
    body_value: body_value$4,
    color_select: color_select$4,
    common: common$4,
    default: ro,
    editor: editor$5,
    editor_body: editor_body$4,
    error: error$4,
    states: states$5,
    unit: unit$4
});

var common$3 = {
	version: "Версия",
	name: "Карточка Bodymiscale",
	description: "Карточка BodyMiScale отображает показатели тела, рассчитанные на основе результатов измерения веса и биоимпеданса.",
	not_available: "Компонент Bodymiscale не доступен",
	toggle_power: "Показать/скрыть дополнительные сведения о BMI"
};
var states$4 = {
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
var attributes$3 = {
	"weight: ": "Вес: ",
	"impedance: ": "Импеданс: ",
	"height: ": "Рост: ",
	"age: ": "Возраст: ",
	"gender: ": "Пол: "
};
var attributes_value$3 = {
	male: "мужской",
	female: "женский",
	unavailable: "недоступен"
};
var body$3 = {
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
	metabolic_age: "Метаболический возраст"
};
var body_value$3 = {
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
var unit$3 = {
	" years": " года(лет)"
};
var error$3 = {
	missing_entity: "Определите сущность.",
	missing_entity_bodymiscale: "Определите сущность BodyMiScale."
};
var editor$4 = {
	entity: "Сущность BodyMiScale (обязательно)",
	image: "Фоновое изображение (опционально)",
	icons_body: "Путь к иконкам (например: /local/images/bodyscoreIcon)",
	model: "У вас есть датчик импеданса?",
	model1: "Включите эту функцию для точных измерений состава тела.",
	model_aria_label_on: "Включить импеданс",
	model_aria_label_off: "Выключить импеданс",
	unit: "Преобразование кг в фунты",
	unit_aria_label_on: "Преобразовать кг в фунты",
	unit_aria_label_off: "Не преобразовывать кг в фунты",
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
var editor_body$3 = {
	from: "От",
	height: "Высота панели",
	icon_position: "Позиция иконки",
	inside: "Внутри",
	max: "Макс",
	min: "Мин",
	minmax_position: "Позиция Min/Max",
	name_position: "Позиция имени",
	off: "Выключено",
	outside: "Снаружи",
	target: "Цель",
	to: "К",
	value_position: "Позиция значения"
};
var color_select$3 = {
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
var ru = {
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
	color_select: color_select$3
};

var ru$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    attributes: attributes$3,
    attributes_value: attributes_value$3,
    body: body$3,
    body_value: body_value$3,
    color_select: color_select$3,
    common: common$3,
    default: ru,
    editor: editor$4,
    editor_body: editor_body$3,
    error: error$3,
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
	metabolic_age: "Tuổi chuyển hóa"
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
	missing_entity: "Please define an entity.",
	missing_entity_bodymiscale: "Please define a bodymiscale entity."
};
var editor$3 = {
	entity: "Please select an account on the scale (required)!",
	image: "Background image (optional)",
	icons_body: "Đường dẫn biểu tượng (ví dụ: /local/images/bodyscoreIcon)",
	model: "Do you have an impedance sensor?",
	model1: "Enable this feature for accurate body composition measurements.",
	model_aria_label_on: "Enable impedance",
	model_aria_label_off: "Disable impedance",
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
	height: "Chiều cao thanh",
	icon_position: "Vị trí biểu tượng",
	inside: "Bên trong",
	max: "Tối đa",
	min: "Tối thiểu",
	minmax_position: "Vị trí Min/Max",
	name_position: "Vị trí tên",
	off: "Tắt",
	outside: "Bên ngoài",
	target: "Mục tiêu",
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
	color_select: color_select$2
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
	metabolic_age: "代谢年龄"
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
	missing_entity: "Please define an entity.",
	missing_entity_bodymiscale: "Please define a bodymiscale entity."
};
var editor$2 = {
	entity: "Please select an account on the scale (required) !",
	image: "Background image (optional)",
	icons_body: "图标路径 (例如：/local/images/bodyscoreIcon)",
	model: "Do you have an impedance sensor?",
	model1: "Enable this feature for accurate body composition measurements.",
	model_aria_label_on: "Enable impedance",
	model_aria_label_off: "Disable impedance",
	unit: "Convert kg to lbs",
	unit_aria_label_on: "Toggle the conversion on",
	unit_aria_label_off: "Toggle the conversion off",
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
	height: "条形高度",
	icon_position: "图标位置",
	inside: "内部",
	max: "最大",
	min: "最小",
	minmax_position: "最小/最大位置",
	name_position: "名称位置",
	off: "关闭",
	outside: "外部",
	target: "目标",
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
	color_select: color_select$1
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
	metabolic_age: "代謝年齡"
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
	missing_entity: "Please define an entity.",
	missing_entity_bodymiscale: "Please define a bodymiscale entity."
};
var editor$1 = {
	entity: "Please select an account on the scale (required) !",
	image: "Background image (optional)",
	icons_body: "圖示路徑 (例如：/local/images/bodyscoreIcon)",
	model: "Do you have an impedance sensor?",
	model1: "Enable this feature for accurate body composition measurements.",
	model_aria_label_on: "Enable impedance",
	model_aria_label_off: "Disable impedance",
	unit: "Convert kg to lbs",
	unit_aria_label_on: "Toggle the conversion on",
	unit_aria_label_off: "Toggle the conversion off",
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
	height: "條形高度",
	icon_position: "圖示位置",
	inside: "內部",
	max: "最大",
	min: "最小",
	minmax_position: "最小/最大位置",
	name_position: "名稱位置",
	off: "關閉",
	outside: "外部",
	target: "目標",
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
	color_select: color_select
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
    states: states$1,
    unit: unit
});

const languages = {
    cs: cs$1,
    de: de$1,
    en: en$1,
    es: es$1,
    ca: ca$1,
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
    vi: vi$1,
    zh_Hans: zh_Hans,
    zh_Hant: zh_Hant,
};
const DEFAULT_LANG = 'en';
function localize(str, search, replace) {
    var _a;
    const [section, key] = str.toLowerCase().split('.');
    let langStored = null;
    try {
        langStored = JSON.parse((_a = localStorage.getItem('selectedLanguage')) !== null && _a !== void 0 ? _a : '');
    }
    catch (e) {
        console.warn(e);
        langStored = localStorage.getItem('selectedLanguage');
    }
    const lang = (langStored || navigator.language.split('-')[0] || DEFAULT_LANG)
        .replace(/['"]+/g, '')
        .replace('-', '_');
    let translated;
    try {
        translated = languages[lang][section][key];
    }
    catch (e) {
        console.warn(e);
        translated = languages[DEFAULT_LANG][section][key];
    }
    if (translated === undefined) {
        translated = languages[DEFAULT_LANG][section][key];
    }
    if (translated === undefined) {
        return;
    }
    if (search && replace) {
        translated = translated === null || translated === void 0 ? void 0 : translated.replace(search, replace);
    }
    return translated;
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$1 = i$5`:host {
  --bc-background: var(
    --ha-card-background,
    var(--card-background-color, white)
  );
  --bc-primary-text-color: var(--primary-text-color, #000);
  --bc-secondary-text-color: var(--secondary-text-color, #555);
  --bc-icon-color: var(--secondary-text-color);
  --bc-toolbar-background: var(--bc-background);
  --bc-toolbar-text-color: var(--bc-secondary-text-color);
  --bc-toolbar-icon-color: var(--bc-secondary-text-color);
  --bc-divider-color: var(--entities-divider-color, var(--divider-color, #ccc));
  --bc-spacing: 5px;
  --ha-card-border-radius: 12px;
  --ha-icon-size: 24px;

  /* Couleurs spécifiques pour les éléments */
  --bc-bar-height: 24px;
  --bc-bar-background: #e0e0e0;
  --bc-bar-current: #007bff; /* Couleur de la barre */
  --bc-bar-target: rgba(255, 255, 255, 0.4); /* Couleur pour la cible */
  --bc-bar-remaining: rgb(
    25.5,
    140.7,
    25.5
  ); /* Couleur pour la partie restante */
  --bc-bar-marker: red;
}

ha-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: var(--ha-card-border-radius);
  overflow: hidden;
}

.background {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  height: auto;
  border-radius: var(--ha-card-border-radius);
  overflow: hidden;
}

.pointer {
  cursor: pointer;
}

.preview {
  background: var(--bc-background);
  cursor: pointer;
  position: relative;
}

.preview.not-available {
  filter: grayscale(1);
}

.not-available {
  text-align: center;
  color: #333;
  color: var(--text-primary-color, #333);
  font-size: 16px;
}

.metadata {
  margin: var(--bc-spacing) auto;
}

.bodymiscale-name {
  font-size: 20px;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.grid {
  cursor: pointer;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.grid-left,
.grid-right {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.grid-left {
  text-align: left;
  padding-left: 10px;
  border-left: 2px solid var(--primary-color);
}

.grid-right {
  text-align: right;
  padding-right: 10px;
  border-right: 2px solid var(--primary-color);
}

#items {
  padding: 0;
  margin: 0;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s ease-in-out;
}

#items[open] {
  overflow: hidden;
  max-height: 500px;
}

.toolbar {
  background: var(--bc-toolbar-background);
  min-height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0px;
}

.toolbar ha-icon-button {
  align-items: center;
  justify-content: center;
}

.fill-gap {
  flex-grow: 1;
  gap: 0px;
}

.toolbar ha-icon {
  width: var(--ha-icon-size);
  height: var(--ha-icon-size);
  fill: currentColor;
  margin: 0;
  font-size: 0px; /* Override font-size inheritance to fix icon alignment */
}

.image {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  vertical-align: middle;
  fill: currentColor;
  width: var(--ha-icon-size);
  height: var(--ha-icon-size);
}

.problem {
  color: #f44336;
  color: var(--error-color, #f44336);
  animation: blinker 2s cubic-bezier(0.5, 0, 1, 1) infinite alternate;
}

@keyframes blinker {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.state-div {
  display: grid;
  grid-template-columns: 24px 1fr;
  align-items: start;
}

.state-label {
  padding: 3px 0 0 10px;
}

#score {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 8px;
}

#score > * {
  margin-bottom: 8px;
}

#score > :last-child {
  margin-top: 0px;
  margin-bottom: 0px;
}

#score > :first-child {
  margin-top: 0px;
}
score-card-row {
  display: flex;
  flex-grow: 1;
}

score-card-row > div {
  flex-basis: 100%;
}

score-card-row:empty {
  display: none;
}

score-card-card {
  display: flex;
  flex-basis: 100%;
  flex-direction: row;
  margin-right: 8px;
}

score-card-card:last-child {
  margin-right: 0px;
}

score-card-background {
  cursor: pointer;
  flex-grow: 1;
  position: relative;
}

score-card-iconbar {
  color: var(--icon-color, var(--paper-item-icon-color));
  align-items: center;
  align-self: center;
  display: flex;
  height: 30px;
  justify-content: center;
  position: relative;
  width: 30px;
}

score-card-currentbar,
score-card-backgroundbar,
score-card-contentbar,
score-card-targetbar {
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: var(--score-card-border-radius, var(--ha-card-border-radius));
}

score-card-contentbar {
  align-items: center;
  color: var(--primary-text-color);
  display: flex;
  justify-content: flex-start;
}

.contentbar-direction-right {
  flex-direction: row;
}

score-card-backgroundbar {
  background: var(--bar-color);
  filter: brightness(0.5);
  opacity: 0.25;
}

score-card-currentbar {
  background: linear-gradient(
    to var(--bar-direction),
    var(--bar-color) var(--bar-percent),
    rgba(0,0,0,0) var(--bar-percent),
    rgba(0,0,0,0) var(--bar-percent)
  );
}

score-card-targetbar {
  background: linear-gradient(
    to var(--bar-direction),
    rgba(0,0,0,0) var(--bar-percent),
    var(--bar-color) var(--bar-percent),
    var(--bar-color) var(--bar-target-percent),
    rgba(0,0,0,0) var(--bar-target-percent)
  );
  display: var(--target-display);
  filter: brightness(0.66);
  opacity: 0.33;
}

score-card-markerbar {
  background: var(--bar-color);
  filter: brightness(0.75);
  opacity: 0.5;
  position: absolute;
}

score-card-name {
  align-items: center;
  align-self: center;
  justify-content: center;
  margin: 4px;
  overflow: hidden;
  position: relative;
  text-align: left;
  text-overflow: ellipsis;
}

score-card-value,
score-card-min,
score-card-max,
score-card-divider {
  align-self: center;
  position: relative;
}

score-card-min,
score-card-max,
score-card-divider {
  font-size: 10px;
  margin: 2px;
  opacity: 0.5;
}

.min-direction-right {
  margin-left: auto;
}

score-card-divider {
  margin-left: 0px;
  margin-right: 0px;
}

score-card-value {
  white-space: nowrap;
  margin: 4px;
}

.value-direction-right {
  margin-left: auto;
}
`;
styleInject(css_248z$1);

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
    white: '#FFFFFF',
};
new Set(Object.keys(COLOR_HEX_MAP));
function computeCssColor(color) {
    if (COLOR_HEX_MAP[color]) {
        return COLOR_HEX_MAP[color];
    }
    return COLOR_HEX_MAP.disabled;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
let compute = {
    convertkgtolb: (v) => Math.round(Number(v) * 2.20462 * 10) / 10,
};
const states = {
    status: {
        key: 'state',
        icon: 'mdi:scale-bathroom',
    },
    problem: {
        key: 'problem',
        icon: 'mdi:alert',
    },
    last_measurement_time: {
        key: 'last_measurement_time',
        icon: 'mdi:calendar-clock',
    },
};
const attributes_kg = {
    weight: {
        key: 'weight',
        label: localize(`attributes.${'weight: '}`),
        unit: ' kg',
    },
    impedance: {
        key: 'impedance',
        label: localize(`attributes.${'impedance: '}`),
        unit: ' ohm',
        impedance_required: true,
    },
    height: {
        key: 'height',
        label: localize(`attributes.${'height: '}`),
        unit: ' cm',
    },
    age: {
        key: 'age',
        label: localize(`attributes.${'age: '}`),
        unit: localize(`unit.${' years'}`),
    },
    gender: {
        key: 'gender',
        label: localize(`attributes.${'gender: '}`),
    },
};
const attributes_lb = {
    weight: {
        key: 'weight',
        label: localize(`attributes.${'weight: '}`),
        unit: ' lbs',
        compute: compute.convertkgtolb,
    },
    impedance: {
        key: 'impedance',
        label: localize(`attributes.${'impedance: '}`),
        unit: ' ohm',
        impedance_required: true,
    },
    height: {
        key: 'height',
        label: localize(`attributes.${'height: '}`),
        unit: ' cm',
    },
    age: {
        key: 'age',
        label: localize(`attributes.${'age: '}`),
        unit: localize(`unit.${' years'}`),
    },
    gender: {
        key: 'gender',
        label: localize(`attributes.${'gender: '}`),
    },
};
const body_kg = {
    basal_metabolism: {
        key: 'basal_metabolism',
        label: localize(`body.${'basal_metabolism'}`),
        icon: 'basal_metabolism.png',
        unit: ' kcal',
        min: 0,
        max: 3000,
        color: 'var(--score-card-color, var(--ha-card-background))',
        height: 30,
        positions: {
            icon: 'outside',
            name: 'inside',
            minmax: 'off',
            value: 'inside',
        },
        severity: [
            { from: 0, to: 1530, color: 'orangered' },
            { from: 1530.01, to: 3000, color: 'green' },
        ],
        target: 1530,
        width: '100%',
        impedance_required: false,
    },
    bmi: {
        key: 'bmi',
        label: localize(`body.${'bmi'}`),
        icon: 'bmi.png',
        min: 0,
        max: 40,
        color: 'var(--score-card-color, var(--ha-card-background))',
        height: 30,
        positions: {
            icon: 'outside',
            name: 'inside',
            minmax: 'off',
            value: 'inside',
        },
        severity: [
            { from: 0, to: 18.5, color: 'blue' },
            { from: 18.51, to: 25, color: 'green' },
            { from: 25.01, to: 28, color: 'orange' },
            { from: 28.01, to: 32, color: 'orangered' },
            { from: 32.01, to: 40, color: 'red' },
        ],
        target: 21.75,
        width: '100%',
        impedance_required: false,
    },
    bmi_label: {
        key: 'bmi_label',
        label: localize(`body.${'bmi_label'}`),
        icon: 'body_type.png',
        min: null,
        max: null,
        color: 'var(--score-card-color, var(--ha-card-background))',
        height: null,
        positions: {
            icon: 'outside',
            name: 'inside',
            minmax: 'off',
            value: 'inside',
        },
        severity: null,
        target: null,
        width: '100%',
        impedance_required: false,
    },
    body_fat: {
        key: 'body_fat',
        label: localize(`body.${'body_fat'}`),
        icon: 'body_fat.png',
        unit: ' %',
        min: 0,
        max: 40,
        color: 'var(--score-card-color, var(--ha-card-background))',
        height: 30,
        positions: {
            icon: 'outside',
            name: 'inside',
            minmax: 'off',
            value: 'inside',
        },
        severity: [
            { from: 0, to: 12, color: 'blue' },
            { from: 12.01, to: 18, color: 'royalblue' },
            { from: 18.01, to: 23, color: 'green' },
            { from: 23.01, to: 28, color: 'orange' },
            { from: 28.01, to: 40, color: 'orangered' },
        ],
        target: 20.5,
        width: '100%',
        impedance_required: true,
    },
    body_type: {
        key: 'body_type',
        label: localize(`body.${'body_type'}`),
        icon: 'body_type.png',
        color: 'var(--score-card-color, var(--ha-card-background))',
        min: null,
        max: null,
        height: null,
        positions: {
            icon: 'outside',
            name: 'inside',
            minmax: 'off',
            value: 'inside',
        },
        severity: null,
        target: null,
        width: '100%',
        impedance_required: true,
    },
    bone_mass: {
        key: 'bone_mass',
        label: localize(`body.${'bone_mass'}`),
        icon: 'bone_mass.png',
        unit: ' kg',
        min: 0,
        max: 8,
        color: 'var(--score-card-color, var(--ha-card-background))',
        height: 30,
        positions: {
            icon: 'outside',
            name: 'inside',
            minmax: 'off',
            value: 'inside',
        },
        severity: [
            { from: 0, to: 2, color: 'orangered' },
            { from: 2.01, to: 4.2, color: 'green' },
            { from: 4.21, to: 8, color: 'darkgreen' },
        ],
        target: 3.1,
        width: '100%',
        impedance_required: true,
    },
    ideal: {
        key: 'ideal',
        label: localize(`body.${'ideal'}`),
        icon: 'ideal.png',
        unit: ' kg',
        min: 0,
        max: 130,
        color: 'var(--score-card-color, var(--ha-card-background))',
        height: 30,
        positions: {
            icon: 'outside',
            name: 'inside',
            minmax: 'off',
            value: 'inside',
        },
        severity: [
            { from: 0, to: 57.3, color: 'blue' },
            { from: 57.31, to: 77.4, color: 'green' },
            { from: 77.41, to: 86.7, color: 'orange' },
            { from: 86.71, to: 99, color: 'orangered' },
            { from: 99.1, to: 130, color: 'red' },
        ],
        target: 67.35,
        width: '100%',
        impedance_required: false,
    },
    metabolic_age: {
        key: 'metabolic_age',
        label: localize(`body.${'metabolic_age'}`),
        icon: 'metabolic_age.png',
        unit: localize(`unit.${' years'}`),
        min: null,
        max: null,
        color: 'var(--score-card-color, var(--ha-card-background))',
        height: null,
        positions: {
            icon: 'outside',
            name: 'inside',
            minmax: 'off',
            value: 'inside',
        },
        severity: null,
        target: null,
        width: '100%',
        impedance_required: true,
    },
    muscle_mass: {
        key: 'muscle_mass',
        label: localize(`body.${'muscle_mass'}`),
        icon: 'muscle_mass.png',
        unit: ' kg',
        min: 0,
        max: 100,
        color: 'var(--score-card-color, var(--ha-card-background))',
        height: 30,
        positions: {
            icon: 'outside',
            name: 'inside',
            minmax: 'off',
            value: 'inside',
        },
        severity: [
            { from: 0, to: 49.4, color: 'orangered' },
            { from: 49.41, to: 59.5, color: 'green' },
            { from: 59.51, to: 100, color: 'darkgreen' },
        ],
        target: 54.45,
        width: '100%',
        impedance_required: true,
    },
    protein: {
        key: 'protein',
        label: localize(`body.${'protein'}`),
        icon: 'protein.png',
        unit: ' %',
        min: 0,
        max: 32,
        color: 'var(--score-card-color, var(--ha-card-background))',
        height: 30,
        positions: {
            icon: 'outside',
            name: 'inside',
            minmax: 'off',
            value: 'inside',
        },
        severity: [
            { from: 0, to: 16, color: 'orangered' },
            { from: 16.01, to: 20, color: 'green' },
            { from: 20.01, to: 32, color: 'darkgreen' },
        ],
        target: 18,
        width: '100%',
        impedance_required: true,
    },
    visceral_fat: {
        key: 'visceral_fat',
        label: localize(`body.${'visceral_fat'}`),
        icon: 'visceral_fat.png',
        min: 0,
        max: 20,
        color: 'var(--score-card-color, var(--ha-card-background))',
        height: 30,
        positions: {
            icon: 'outside',
            name: 'inside',
            minmax: 'off',
            value: 'inside',
        },
        severity: [
            { from: 0, to: 10, color: 'green' },
            { from: 10.01, to: 15, color: 'orange' },
            { from: 15.01, to: 20, color: 'orangered' },
        ],
        target: 12.5,
        width: '100%',
        impedance_required: false,
    },
    water: {
        key: 'water',
        label: localize(`body.${'water'}`),
        icon: 'water.png',
        unit: ' %',
        min: 0,
        max: 80,
        color: 'var(--score-card-color, var(--ha-card-background))',
        height: 30,
        positions: {
            icon: 'outside',
            name: 'inside',
            minmax: 'off',
            value: 'inside',
        },
        severity: [
            { from: 0, to: 55, color: 'orangered' },
            { from: 55.01, to: 65.1, color: 'green' },
            { from: 65.11, to: 80, color: 'darkgreen' },
        ],
        target: 60,
        width: '100%',
        impedance_required: true,
    },
    weight: {
        key: 'weight',
        label: localize(`body.${'weight'}`),
        icon: 'ideal.png',
        unit: ' kg',
        min: 0,
        max: 130,
        color: 'var(--score-card-color, var(--ha-card-background))',
        height: 30,
        positions: {
            icon: 'outside',
            name: 'inside',
            minmax: 'off',
            value: 'inside',
        },
        severity: [
            { from: 0, to: 57.3, color: 'blue' },
            { from: 57.31, to: 77.4, color: 'green' },
            { from: 77.41, to: 86.7, color: 'orange' },
            { from: 86.71, to: 99, color: 'orangered' },
            { from: 99.1, to: 130, color: 'red' },
        ],
        target: 67.35,
        width: '100%',
        impedance_required: false,
    },
};
const body_lb = {
    basal_metabolism: {
        key: 'basal_metabolism',
        label: localize(`body.${'basal_metabolism'}`),
        icon: 'basal_metabolism.png',
        unit: ' kcal',
        min: 0,
        max: 3000,
        color: 'var(--score-card-color, var(--ha-card-background))',
        height: 30,
        positions: {
            icon: 'outside',
            name: 'inside',
            minmax: 'off',
            value: 'inside',
        },
        severity: [
            { from: 0, to: 1530, color: 'orangered' },
            { from: 1530.01, to: 3000, color: 'green' },
        ],
        target: 1530,
        width: '100%',
        impedance_required: false,
    },
    bmi: {
        key: 'bmi',
        label: localize(`body.${'bmi'}`),
        icon: 'bmi.png',
        min: 0,
        max: 40,
        color: 'var(--score-card-color, var(--ha-card-background))',
        height: 30,
        positions: {
            icon: 'outside',
            name: 'inside',
            minmax: 'off',
            value: 'inside',
        },
        severity: [
            { from: 0, to: 18.5, color: 'blue' },
            { from: 18.51, to: 25, color: 'green' },
            { from: 25.01, to: 28, color: 'orange' },
            { from: 28.01, to: 32, color: 'orangered' },
            { from: 32.01, to: 40, color: 'red' },
        ],
        target: 21.75,
        width: '100%',
        impedance_required: false,
    },
    bmi_label: {
        key: 'bmi_label',
        label: localize(`body.${'bmi_label'}`),
        icon: 'body_type.png',
        min: null,
        max: null,
        color: 'var(--score-card-color, var(--ha-card-background))',
        height: null,
        positions: {
            icon: 'outside',
            name: 'inside',
            minmax: 'off',
            value: 'inside',
        },
        severity: null,
        target: null,
        width: '100%',
        impedance_required: false,
    },
    body_fat: {
        key: 'body_fat',
        label: localize(`body.${'body_fat'}`),
        icon: 'body_fat.png',
        unit: ' %',
        min: 0,
        max: 40,
        color: 'var(--score-card-color, var(--ha-card-background))',
        height: 30,
        positions: {
            icon: 'outside',
            name: 'inside',
            minmax: 'off',
            value: 'inside',
        },
        severity: [
            { from: 0, to: 12, color: 'blue' },
            { from: 12.01, to: 18, color: 'royalblue' },
            { from: 18.01, to: 23, color: 'green' },
            { from: 23.01, to: 28, color: 'orange' },
            { from: 28.01, to: 40, color: 'orangered' },
        ],
        target: 20.5,
        width: '100%',
        impedance_required: true,
    },
    body_type: {
        key: 'body_type',
        label: localize(`body.${'body_type'}`),
        icon: 'body_type.png',
        color: 'var(--score-card-color, var(--ha-card-background))',
        min: null,
        max: null,
        height: null,
        positions: {
            icon: 'outside',
            name: 'inside',
            minmax: 'off',
            value: 'inside',
        },
        severity: null,
        target: null,
        width: '100%',
        impedance_required: true,
    },
    bone_mass: {
        key: 'bone_mass',
        label: localize(`body.${'bone_mass'}`),
        icon: 'bone_mass.png',
        unit: ' lbs',
        compute: compute.convertkgtolb,
        min: 0,
        max: 17.6,
        color: 'var(--score-card-color, var(--ha-card-background))',
        height: 30,
        positions: {
            icon: 'outside',
            name: 'inside',
            minmax: 'off',
            value: 'inside',
        },
        severity: [
            { from: 0, to: 4.4, color: 'orangered' },
            { from: 4.5, to: 9.3, color: 'green' },
            { from: 9.4, to: 17.6, color: 'darkgreen' },
        ],
        target: 6.9,
        width: '100%',
        impedance_required: true,
    },
    ideal: {
        key: 'ideal',
        label: localize(`body.${'ideal'}`),
        icon: 'ideal.png',
        unit: ' lbs',
        compute: compute.convertkgtolb,
        min: 0,
        max: 286.6,
        color: 'var(--score-card-color, var(--ha-card-background))',
        height: 30,
        positions: {
            icon: 'outside',
            name: 'inside',
            minmax: 'off',
            value: 'inside',
        },
        severity: [
            { from: 0, to: 126.3, color: 'blue' },
            { from: 126.4, to: 170.6, color: 'green' },
            { from: 170.7, to: 191.1, color: 'orange' },
            { from: 191.2, to: 218.5, color: 'orangered' },
            { from: 218.6, to: 286.6, color: 'red' },
        ],
        target: 148.5,
        width: '100%',
        impedance_required: false,
    },
    metabolic_age: {
        key: 'metabolic_age',
        label: localize(`body.${'metabolic_age'}`),
        icon: 'metabolic_age.png',
        unit: localize(`unit.${' years'}`),
        min: null,
        max: null,
        color: 'var(--score-card-color, var(--ha-card-background))',
        height: null,
        positions: {
            icon: 'outside',
            name: 'inside',
            minmax: 'off',
            value: 'inside',
        },
        severity: null,
        target: null,
        width: '100%',
        impedance_required: true,
    },
    muscle_mass: {
        key: 'muscle_mass',
        label: localize(`body.${'muscle_mass'}`),
        icon: 'muscle_mass.png',
        unit: ' lbs',
        compute: compute.convertkgtolb,
        min: 0,
        max: 220.5,
        color: 'var(--score-card-color, var(--ha-card-background))',
        height: 30,
        positions: {
            icon: 'outside',
            name: 'inside',
            minmax: 'off',
            value: 'inside',
        },
        severity: [
            { from: 0, to: 108.9, color: 'orangered' },
            { from: 109, to: 131.2, color: 'green' },
            { from: 131.3, to: 220.5, color: 'darkgreen' },
        ],
        target: 120.1,
        width: '100%',
        impedance_required: true,
    },
    protein: {
        key: 'protein',
        label: localize(`body.${'protein'}`),
        icon: 'protein.png',
        unit: ' %',
        min: 0,
        max: 32,
        color: 'var(--score-card-color, var(--ha-card-background))',
        height: 30,
        positions: {
            icon: 'outside',
            name: 'inside',
            minmax: 'off',
            value: 'inside',
        },
        severity: [
            { from: 0, to: 16, color: 'orangered' },
            { from: 16.01, to: 20, color: 'green' },
            { from: 20.01, to: 32, color: 'darkgreen' },
        ],
        target: 18,
        width: '100%',
        impedance_required: true,
    },
    visceral_fat: {
        key: 'visceral_fat',
        label: localize(`body.${'visceral_fat'}`),
        icon: 'visceral_fat.png',
        min: 0,
        max: 20,
        color: 'var(--score-card-color, var(--ha-card-background))',
        height: 30,
        positions: {
            icon: 'outside',
            name: 'inside',
            minmax: 'off',
            value: 'inside',
        },
        severity: [
            { from: 0, to: 10, color: 'green' },
            { from: 10.01, to: 15, color: 'orange' },
            { from: 15.01, to: 20, color: 'orangered' },
        ],
        target: 12.5,
        width: '100%',
        impedance_required: false,
    },
    water: {
        key: 'water',
        label: localize(`body.${'water'}`),
        icon: 'water.png',
        unit: ' %',
        min: 0,
        max: 80,
        color: 'var(--score-card-color, var(--ha-card-background))',
        height: 30,
        positions: {
            icon: 'outside',
            name: 'inside',
            minmax: 'off',
            value: 'inside',
        },
        severity: [
            { from: 0, to: 55, color: 'orangered' },
            { from: 55.01, to: 65.1, color: 'green' },
            { from: 65.11, to: 80, color: 'darkgreen' },
        ],
        target: 60,
        width: '100%',
        impedance_required: true,
    },
    weight: {
        key: 'weight',
        label: localize(`body.${'weight'}`),
        icon: 'ideal.png',
        unit: ' lbs',
        compute: compute.convertkgtolb,
        min: 0,
        max: 286.6,
        color: 'var(--score-card-color, var(--ha-card-background))',
        height: 30,
        positions: {
            icon: 'outside',
            name: 'inside',
            minmax: 'off',
            value: 'inside',
        },
        severity: [
            { from: 0, to: 126.3, color: 'blue' },
            { from: 126.4, to: 170.6, color: 'green' },
            { from: 170.7, to: 191.1, color: 'orange' },
            { from: 191.2, to: 218.5, color: 'orangered' },
            { from: 218.6, to: 286.6, color: 'red' },
        ],
        target: 148.5,
        width: '100%',
        impedance_required: false,
    },
};
const buttons = {
    user1: {
        show: false,
        label: 'User1',
        icon: 'mdi:alpha-u-circle',
        entity: '',
    },
    user2: {
        show: false,
        label: 'User2',
        icon: 'mdi:alpha-u-circle',
        entity: '',
    },
    user3: {
        show: false,
        label: 'User3',
        icon: 'mdi:alpha-u-circle',
        entity: '',
    },
    user4: {
        show: false,
        label: 'User4',
        icon: 'mdi:alpha-u-circle',
        entity: '',
    },
    user5: {
        show: false,
        label: 'User5',
        icon: 'mdi:alpha-u-circle',
        entity: '',
    },
};
const defaultCardConfig = {
    model: false,
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
        },
    },
    body: {
        basal_metabolism: {
            key: 'basal_metabolism',
            min: 0,
            max: 3000,
            height: 30,
            positions: {
                icon: 'outside',
                name: 'inside',
                minmax: 'off',
                value: 'inside',
            },
            severity: [
                { from: 0, to: 1530, color: 'orangered' },
                { from: 1530.01, to: 3000, color: 'green' },
            ],
            target: 1530,
            width: '100%',
            impedance_required: false,
        },
        bmi: {
            key: 'bmi',
            min: 0,
            max: 40,
            height: 30,
            positions: {
                icon: 'outside',
                name: 'inside',
                minmax: 'off',
                value: 'inside',
            },
            severity: [
                { from: 0, to: 18.5, color: 'blue' },
                { from: 18.51, to: 25, color: 'green' },
                { from: 25.01, to: 28, color: 'orange' },
                { from: 28.01, to: 32, color: 'orangered' },
                { from: 32.01, to: 40, color: 'red' },
            ],
            target: 21.75,
            width: '100%',
            impedance_required: false,
        },
        bmi_label: {
            key: 'bmi_label',
            min: null,
            max: null,
            height: null,
            positions: {
                icon: 'outside',
                name: 'inside',
                minmax: 'off',
                value: 'inside',
            },
            severity: null,
            target: null,
            width: '100%',
            impedance_required: false,
        },
        body_fat: {
            key: 'body_fat',
            min: 0,
            max: 40,
            height: 30,
            positions: {
                icon: 'outside',
                name: 'inside',
                minmax: 'off',
                value: 'inside',
            },
            severity: [
                { from: 0, to: 12, color: 'blue' },
                { from: 12.01, to: 18, color: 'royalblue' },
                { from: 18.01, to: 23, color: 'green' },
                { from: 23.01, to: 28, color: 'orange' },
                { from: 28.01, to: 40, color: 'orangered' },
            ],
            target: 20.5,
            width: '100%',
            impedance_required: true,
        },
        body_type: {
            key: 'body_type',
            min: null,
            max: null,
            height: null,
            positions: {
                icon: 'outside',
                name: 'inside',
                minmax: 'off',
                value: 'inside',
            },
            severity: null,
            target: null,
            width: '100%',
            impedance_required: true,
        },
        bone_mass: {
            key: 'bone_mass',
            min: 0,
            max: 8,
            height: 30,
            positions: {
                icon: 'outside',
                name: 'inside',
                minmax: 'off',
                value: 'inside',
            },
            severity: [
                { from: 0, to: 2, color: 'orangered' },
                { from: 2.01, to: 4.2, color: 'green' },
                { from: 4.21, to: 8, color: 'darkgreen' },
            ],
            target: 3.1,
            width: '100%',
            impedance_required: true,
        },
        ideal: {
            key: 'ideal',
            min: 0,
            max: 130,
            height: 30,
            positions: {
                icon: 'outside',
                name: 'inside',
                minmax: 'off',
                value: 'inside',
            },
            severity: [
                { from: 0, to: 57.3, color: 'blue' },
                { from: 57.31, to: 77.4, color: 'green' },
                { from: 77.41, to: 86.7, color: 'orange' },
                { from: 86.71, to: 99, color: 'orangered' },
                { from: 99.1, to: 130, color: 'red' },
            ],
            target: 67.35,
            width: '100%',
            impedance_required: false,
        },
        metabolic_age: {
            key: 'metabolic_age',
            min: null,
            max: null,
            height: null,
            positions: {
                icon: 'outside',
                name: 'inside',
                minmax: 'off',
                value: 'inside',
            },
            severity: null,
            target: null,
            width: '100%',
            impedance_required: true,
        },
        muscle_mass: {
            key: 'muscle_mass',
            min: 0,
            max: 100,
            height: 30,
            positions: {
                icon: 'outside',
                name: 'inside',
                minmax: 'off',
                value: 'inside',
            },
            severity: [
                { from: 0, to: 49.4, color: 'orangered' },
                { from: 49.41, to: 59.5, color: 'green' },
                { from: 59.51, to: 100, color: 'darkgreen' },
            ],
            target: 54.45,
            width: '100%',
            impedance_required: true,
        },
        protein: {
            key: 'protein',
            min: 0,
            max: 32,
            height: 30,
            positions: {
                icon: 'outside',
                name: 'inside',
                minmax: 'off',
                value: 'inside',
            },
            severity: [
                { from: 0, to: 16, color: 'orangered' },
                { from: 16.01, to: 20, color: 'green' },
                { from: 20.01, to: 32, color: 'darkgreen' },
            ],
            target: 18,
            width: '100%',
            impedance_required: true,
        },
        visceral_fat: {
            key: 'visceral_fat',
            min: 0,
            max: 20,
            height: 30,
            positions: {
                icon: 'outside',
                name: 'inside',
                minmax: 'off',
                value: 'inside',
            },
            severity: [
                { from: 0, to: 10, color: 'green' },
                { from: 10.01, to: 15, color: 'orange' },
                { from: 15.01, to: 20, color: 'orangered' },
            ],
            target: 12.5,
            width: '100%',
            impedance_required: false,
        },
        water: {
            key: 'water',
            min: 0,
            max: 80,
            height: 30,
            positions: {
                icon: 'outside',
                name: 'inside',
                minmax: 'off',
                value: 'inside',
            },
            severity: [
                { from: 0, to: 55, color: 'orangered' },
                { from: 55.01, to: 65.1, color: 'green' },
                { from: 65.11, to: 80, color: 'darkgreen' },
            ],
            target: 60,
            width: '100%',
            impedance_required: true,
        },
        weight: {
            key: 'weight',
            min: 0,
            max: 130,
            height: 30,
            positions: {
                icon: 'outside',
                name: 'inside',
                minmax: 'off',
                value: 'inside',
            },
            severity: [
                { from: 0, to: 57.3, color: 'blue' },
                { from: 57.31, to: 77.4, color: 'green' },
                { from: 77.41, to: 86.7, color: 'orange' },
                { from: 86.71, to: 99, color: 'orangered' },
                { from: 99.1, to: 130, color: 'red' },
            ],
            target: 67.35,
            width: '100%',
            impedance_required: false,
        },
    },
};

function buildStyles(config) {
    const { image, theme, show_toolbar, show_body } = config;
    return {
        background: image
            ? `
          background-image: url('${image}');
          color: white;
          text-shadow: 0 0 10px black;
          min-height: 220px;
          ${show_toolbar
                ? 'border-radius: 0;'
                : show_body
                    ? 'border-radius: 0;'
                    : 'border-radius: var(--ha-card-border-radius, 12px);'}
          overflow: hidden;
        `
            : '',
        icon: `color: ${image ? 'white' : 'var(--paper-item-icon-color)'};`,
        iconbody: `background-color: ${theme !== false ? 'var(--paper-item-icon-color)' : 'white'};`,
    };
}
function buildConfig(config) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
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
        entity: (_a = config.entity) !== null && _a !== void 0 ? _a : '',
        image: (_b = config.image) !== null && _b !== void 0 ? _b : '',
        icons_body: (_c = config.icons_body) !== null && _c !== void 0 ? _c : '',
        model: (_d = config.model) !== null && _d !== void 0 ? _d : false,
        impedance_required: (_e = config.impedance_required) !== null && _e !== void 0 ? _e : false,
        unit: (_f = config.unit) !== null && _f !== void 0 ? _f : false,
        theme: (_g = config.theme) !== null && _g !== void 0 ? _g : true,
        show_name: (_h = config.show_name) !== null && _h !== void 0 ? _h : true,
        show_states: (_j = config.show_states) !== null && _j !== void 0 ? _j : true,
        show_attributes: (_k = config.show_attributes) !== null && _k !== void 0 ? _k : true,
        show_always_details: (_l = config.show_always_details) !== null && _l !== void 0 ? _l : false,
        show_toolbar: (_m = config.show_toolbar) !== null && _m !== void 0 ? _m : true,
        show_body: (_o = config.show_body) !== null && _o !== void 0 ? _o : true,
        show_buttons: (_p = config.show_buttons) !== null && _p !== void 0 ? _p : false,
        states: deepMerge(states, config.states),
        attributes: config.unit
            ? deepMerge(attributes_lb, config.attributes)
            : deepMerge(attributes_kg, config.attributes),
        body: config.unit
            ? deepMerge(body_lb, config.body)
            : deepMerge(body_kg, config.body),
        buttons: config.buttons === true ? {} : deepMerge(buttons, config.buttons),
        styles: buildStyles(config),
        open: (_q = config.open) !== null && _q !== void 0 ? _q : false,
        height: (_r = config.height) !== null && _r !== void 0 ? _r : undefined,
        width: (_s = config.width) !== null && _s !== void 0 ? _s : undefined,
        stats: (_t = config.stats) !== null && _t !== void 0 ? _t : {},
        min: (_u = config.min) !== null && _u !== void 0 ? _u : undefined,
        max: (_v = config.max) !== null && _v !== void 0 ? _v : undefined,
        color: (_w = config.color) !== null && _w !== void 0 ? _w : undefined,
        positions: (_x = config.positions) !== null && _x !== void 0 ? _x : {
            icon: 'outside',
            name: 'inside',
            minmax: 'off',
            value: 'inside',
        },
        severity: (_y = config.severity) !== null && _y !== void 0 ? _y : undefined,
        target: (_z = config.target) !== null && _z !== void 0 ? _z : undefined,
    };
}

// String in the right side will be replaced by Rollup
const PKG_VERSION = 'DEVELOPMENT';
console.info(`%c Body-miscale-card \n%c  ${localize('common.version')} ${PKG_VERSION} `, 'color: cyan; background: black; font-weight: bold;', 'color: darkblue; background: white; font-weight: bold;');
let BodymiscaleCard = class BodymiscaleCard extends r$3 {
    constructor() {
        super(...arguments);
        this.open = false;
    }
    static get styles() {
        return css_248z$1;
    }
    static async getConfigElement() {
        Promise.resolve().then(function () { return editor; });
        return document.createElement('body-miscale-card-editor');
    }
    static getStubConfig(_, entities) {
        const [bodymiscaleEntity] = entities.filter((eid) => eid.startsWith('bodymiscale'));
        return Object.assign(Object.assign({}, defaultCardConfig), { entity: bodymiscaleEntity !== null && bodymiscaleEntity !== void 0 ? bodymiscaleEntity : '' });
    }
    get entity() {
        return this.hass.states[this.config.entity];
    }
    setConfig(config) {
        this.config = buildConfig(config);
    }
    getCardSize() {
        return this.config.show_name && this.config.show_buttons
            ? 4
            : this.config.show_name || this.config.show_buttons
                ? 3
                : 2;
    }
    shouldShowBackground() {
        return !(this.config.image === '' &&
            this.config.show_states === false &&
            this.config.show_attributes === false &&
            this.config.show_always_details === true &&
            this.config.show_body === true);
    }
    shouldUpdate(changedProps) {
        return _e(this, changedProps, false);
    }
    toggle(event) {
        event === null || event === void 0 ? void 0 : event.stopPropagation();
        this.open = !this.open;
    }
    customEvent(event) {
        var _a;
        if ((_a = event.detail) === null || _a === void 0 ? void 0 : _a.fold_row) {
            this.toggle(event);
        }
    }
    toggleMenu(key) {
        var _a;
        const menu = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`#bmc-menu-${key}`);
        if (menu && 'open' in menu) {
            menu.open = !menu.open;
        }
    }
    handleChange(entity) {
        if (!this.hass)
            return;
        // Mise à jour de l'entité principale
        this.config = Object.assign(Object.assign({}, this.config), { entity });
        // Déclencher un événement pour enregistrer le changement
        ne(this, 'config-changed', { config: this.config });
    }
    moreInfo() {
        var _a;
        if (!((_a = this.config) === null || _a === void 0 ? void 0 : _a.entity)) {
            console.warn('No entity defined in the config.');
            return;
        }
        ne(this, 'hass-more-info', {
            entityId: this.config.entity,
        });
    }
    renderName(stateObj) {
        if (!this.config.show_name) {
            return E;
        }
        return x `
      <div class="bodymiscale-name">${stateObj.attributes.friendly_name}</div>
    `;
    }
    renderState(data) {
        var _a, _b, _c, _d, _e;
        if (!this.config.show_states) {
            return E;
        }
        if (!this.hass || !((_a = this.config) === null || _a === void 0 ? void 0 : _a.entity)) {
            return x `<div>${localize('state.default.unavailable')}</div>`;
        }
        const stateObj = (_b = this.hass.states) === null || _b === void 0 ? void 0 : _b[this.config.entity];
        if (!stateObj) {
            return x `<div>
        ${this.hass.localize('state.default.unavailable')}
      </div>`;
        }
        const keyExists = (data === null || data === void 0 ? void 0 : data.key) && stateObj;
        const isValidAttribute = keyExists && ((_c = stateObj.attributes) === null || _c === void 0 ? void 0 : _c[data.key]) !== undefined;
        const isValidEntityData = keyExists && stateObj[data.key] !== undefined;
        let value = isValidAttribute
            ? stateObj.attributes[data.key]
            : isValidEntityData
                ? stateObj[data.key]
                : this.hass.localize('state.default.unavailable');
        if (data.key === 'last_measurement_time' && typeof value === 'string') {
            try {
                const parsedDate = new Date(value.replace(' ', 'T'));
                const formattedDate = a(parsedDate, this.hass.locale);
                const formattedTime = D(parsedDate, this.hass.locale);
                value = `${formattedDate} ${formattedTime}`;
            }
            catch (_f) {
                /* empty */
            }
        }
        const formatValue = typeof value === 'number' ? H(value, this.hass.locale) : value;
        const localizedValue = localize(`states.${value}`) || formatValue;
        const attribute = stateObj.state === 'ok' && data.icon === 'mdi:alert'
            ? E
            : x ` <div class="state-div">
            <div>${data.icon && this.renderIcon(data, 'default')}</div>
            <div class="state-label">
              ${(_d = data.label) !== null && _d !== void 0 ? _d : ''}${localizedValue}${(_e = data.unit) !== null && _e !== void 0 ? _e : ''}
            </div>
          </div>`;
        const hasDropdown = `${data.key}_list` in stateObj.attributes;
        return hasDropdown && (isValidAttribute || isValidEntityData)
            ? this.renderDropdown(attribute, data.key)
            : attribute;
    }
    renderAttribute(data) {
        var _a, _b, _c, _d, _e;
        if (!this.config.show_attributes) {
            return E;
        }
        if (!this.hass || !((_a = this.config) === null || _a === void 0 ? void 0 : _a.entity)) {
            return x `<div>${localize('state.default.unavailable')}</div>`;
        }
        const stateObj = (_b = this.hass.states) === null || _b === void 0 ? void 0 : _b[this.config.entity];
        if (!stateObj) {
            return x `<div>
        ${this.hass.localize('state.default.unavailable')}
      </div>`;
        }
        const computeFunc = typeof data.compute === 'function' ? data.compute : (v) => v;
        const keyExists = (data === null || data === void 0 ? void 0 : data.key) && stateObj;
        const isValidAttribute = keyExists && ((_c = stateObj.attributes) === null || _c === void 0 ? void 0 : _c[data.key]) !== undefined;
        const isValidEntityData = keyExists && stateObj[data.key] !== undefined;
        let value = isValidAttribute
            ? computeFunc(stateObj.attributes[data.key])
            : isValidEntityData
                ? computeFunc(stateObj[data.key])
                : this.hass.localize('state.default.unavailable');
        if (data.key === 'last_measurement_time' && typeof value === 'string') {
            try {
                const parsedDate = new Date(value.replace(' ', 'T'));
                const formattedDate = a(parsedDate, this.hass.locale);
                const formattedTime = D(parsedDate, this.hass.locale);
                value = `${formattedDate} ${formattedTime}`;
            }
            catch (_f) {
                /* empty */
            }
        }
        const formatValue = typeof value === 'number' ? H(value, this.hass.locale) : value;
        const localizedValue = localize(`attributes_value.${value}`) || formatValue;
        const attribute = x `<div>
      ${data.icon && this.renderIcon(data, 'default')}
      ${(_d = data.label) !== null && _d !== void 0 ? _d : ''}${localizedValue}${(_e = data.unit) !== null && _e !== void 0 ? _e : ''}
    </div>`;
        const hasDropdown = `${data.key}_list` in stateObj.attributes;
        return hasDropdown && (isValidAttribute || isValidEntityData)
            ? this.renderDropdown(attribute, data.key)
            : attribute;
    }
    renderBody(data) {
        var _a, _b, _c;
        if (!this.config.show_body) {
            return E;
        }
        if (!this.hass || !((_a = this.config) === null || _a === void 0 ? void 0 : _a.entity)) {
            return x `<div>${localize('state.default.unavailable')}</div>`;
        }
        const stateObj = (_b = this.hass.states) === null || _b === void 0 ? void 0 : _b[this.config.entity];
        if (!stateObj) {
            return x `<div>
        ${this.hass.localize('state.default.unavailable')}
      </div>`;
        }
        const computeFunc = typeof data.compute === 'function' ? data.compute : (v) => v;
        const keyExists = (data === null || data === void 0 ? void 0 : data.key) && stateObj;
        const isValidAttribute = keyExists && ((_c = stateObj.attributes) === null || _c === void 0 ? void 0 : _c[data.key]) !== undefined;
        const isValidEntityData = keyExists && stateObj[data.key] !== undefined;
        let value = isValidAttribute
            ? computeFunc(stateObj.attributes[data.key])
            : isValidEntityData
                ? computeFunc(stateObj[data.key])
                : this.hass.localize('state.default.unavailable');
        if (data.key === 'last_measurement_time' && typeof value === 'string') {
            try {
                const parsedDate = new Date(value.replace(' ', 'T'));
                const formattedDate = a(parsedDate, this.hass.locale);
                const formattedTime = D(parsedDate, this.hass.locale);
                value = `${formattedDate} ${formattedTime}`;
            }
            catch (_d) {
                /* empty */
            }
        }
        const formatValue = typeof value === 'number' ? H(value, this.hass.locale) : value;
        // Forcer la direction à 'right' (horizontale)
        let backgroundMargin = '0px 0px 0px 13px';
        // Définir la hauteur et vérifier la hauteur configurée.
        let barHeight = 30;
        if (data.height)
            barHeight = data.height;
        // Normalisation de barHeight
        const normalizedBarHeight = typeof barHeight === 'number'
            ? `${barHeight}px` // Si c'est un nombre, ajouter 'px'
            : barHeight.toString().includes('px')
                ? barHeight // Si déjà en "px", ne rien changer
                : `${parseInt(barHeight, 10) || 0}px`; // Sinon, convertir en nombre et ajouter 'px'
        // Définir les variables de style pour toujours aller à droite
        let alignItems = 'stretch';
        let barDirection = 'right'; // Toujours 'right'
        let flexDirection = 'row';
        let markerDirection = 'left'; // Le marqueur reste à gauche
        let markerStyle = 'height: 100%; width: 2px;';
        // Récupérer les éléments à l'extérieur et à l'intérieur
        const { outside: iconOutside, inside: iconInside, backgroundMargin: backgroundMarginFromIcon, } = this.renderBarIcon(data);
        const { outside: nameOutside, inside: nameInside, backgroundMargin: backgroundMarginFromName, } = this.renderBarName(data);
        const { outside: minMaxOutside, inside: minMaxInside } = this.renderBarMinMax(data);
        const { outside: valueOutside, inside: valueInside, backgroundMargin: backgroundMarginFromValue, } = this.renderBarValue(data, value, formatValue, localize);
        // Mettre à jour backgroundMargin ici
        backgroundMargin =
            backgroundMarginFromIcon ||
                backgroundMarginFromName ||
                backgroundMarginFromValue ||
                backgroundMargin;
        // Définir la couleur de la barre
        const numberValue = Number(value);
        const barColor = this._computeBarColor(data, numberValue);
        // Définir le pourcentage de la barre et du marqueur en fonction de la différence de valeur.
        const barPercent = this._computePercent(data, Number(value));
        const targetMarkerPercent = this._computePercent(data, data.target);
        let targetStartPercent = barPercent;
        let targetEndPercent = this._computePercent(data, data.target);
        if (targetEndPercent < targetStartPercent) {
            targetStartPercent = targetEndPercent;
            targetEndPercent = barPercent;
        }
        // Définir la largeur de la barre si configurée.
        let barWidth = '';
        if (data.width) {
            alignItems = 'center';
            barWidth = `width: ${data.width}`;
        }
        // Créer le tableau contenant toutes les lignes.
        let rowFlexDirection = 'row';
        const attribute = x `
      <score-card-row style="flex-direction: ${rowFlexDirection};">
        <score-card-card
          style="flex-direction: ${flexDirection}; align-items: ${alignItems};"
        >
          ${iconOutside} ${nameOutside}
          <score-card-background
            style="margin: ${backgroundMargin}; height: ${normalizedBarHeight}; ${barWidth}"
          >
            <score-card-backgroundbar
              style="--bar-color: ${barColor};"
            ></score-card-backgroundbar>
            <score-card-currentbar
              style="--bar-color: ${barColor}; --bar-percent: ${barPercent}%; --bar-direction: ${barDirection}"
            ></score-card-currentbar>
            ${data.target
            ? x `
                  <score-card-targetbar
                    style="--bar-color: ${barColor}; --bar-percent: ${targetStartPercent}%; --bar-target-percent: ${targetEndPercent}%; --bar-direction: ${barDirection};"
                  ></score-card-targetbar>
                  <score-card-markerbar
                    style="--bar-color: ${barColor}; --bar-target-percent: ${targetMarkerPercent}%; ${markerDirection}: calc(${targetMarkerPercent}% - 1px); ${markerStyle}"
                  ></score-card-markerbar>
                `
            : ''}
            <score-card-contentbar class="contentbar-direction-right">
              ${iconInside} ${nameInside} ${minMaxInside} ${valueInside}
            </score-card-contentbar>
          </score-card-background>
          ${minMaxOutside} ${valueOutside}
        </score-card-card>
      </score-card-row>
    `;
        const hasDropdown = `${data.key}_list` in stateObj.attributes;
        return hasDropdown && (isValidAttribute || isValidEntityData)
            ? this.renderDropdown(attribute, data.key)
            : attribute;
    }
    renderBarIcon(data) {
        let iconOutside = E;
        let iconInside = E;
        // Déclaration et mise à jour de backgroundMargin ici
        let backgroundMargin = '0px'; // Définie pour l'initialisation
        switch (data.positions.icon) {
            case 'outside':
                iconOutside = x `
          <score-card-iconbar
            >${data.icon && this.renderIcon(data, 'body')}</score-card-iconbar
          >
        `;
                backgroundMargin = '0px 0px 0px 13px';
                break;
            case 'inside':
                iconInside = x `
          <score-card-iconbar
            >${data.icon && this.renderIcon(data, 'body')}</score-card-iconbar
          >
        `;
                backgroundMargin = '0px'; // Réinitialisation de backgroundMargin pour 'inside'
                break;
            case 'off':
                backgroundMargin = '0px'; // Pas de marge pour 'off'
                break;
        }
        return { outside: iconOutside, inside: iconInside, backgroundMargin };
    }
    renderBarName(data) {
        let nameOutside = E;
        let nameInside = E;
        // Déclaration et mise à jour de backgroundMargin ici
        let backgroundMargin = '0px'; // Définie pour l'initialisation
        if (data.label !== undefined) {
            switch (data.positions.name) {
                case 'outside':
                    nameOutside = x `
            <score-card-name
              style="${data.width ? `width: calc(100% - ${data.width});` : ''}"
              >${data.label || ''}</score-card-name
            >
          `;
                    backgroundMargin = '0px'; // Mise à jour de la marge pour 'outside'
                    break;
                case 'inside':
                    nameInside = x `<score-card-name
            >${data.label || ''}</score-card-name
          >`;
                    break;
            }
        }
        return { outside: nameOutside, inside: nameInside, backgroundMargin };
    }
    renderBarMinMax(data) {
        let minMaxOutside = E;
        let minMaxInside = E;
        if (data.min !== undefined && data.max !== undefined) {
            switch (data.positions.minmax) {
                case 'outside':
                    minMaxOutside = x `
            <score-card-min>${data.min}</score-card-min>
            <score-card-divider>/</score-card-divider>
            <score-card-max>${data.max}</score-card-max>
          `;
                    break;
                case 'inside':
                    minMaxInside = x `
            <score-card-min class="min-direction-right">
              ${data.min}
            </score-card-min>
            <score-card-divider>/</score-card-divider>
            <score-card-max>${data.max}</score-card-max>
          `;
                    break;
            }
        }
        return { outside: minMaxOutside, inside: minMaxInside };
    }
    renderBarValue(data, value, formatValue, localize) {
        let valueOutside = E;
        let valueInside = E;
        // Déclaration et mise à jour de backgroundMargin ici
        let backgroundMargin = '0px'; // Définie pour l'initialisation
        switch (data.positions.value) {
            case 'outside':
                valueOutside = x `
          <score-card-value class="value-direction-right">
            ${(localize(`body_value.${value}`) || formatValue) +
                    (data.unit || '')}
          </score-card-value>
        `;
                break;
            case 'inside':
                valueInside = x `
          <score-card-value
            class="${data.positions.minmax == 'inside'
                    ? ''
                    : 'value-direction-right'}"
          >
            ${(localize(`body_value.${value}`) || formatValue) +
                    (data.unit || '')}
          </score-card-value>
        `;
                break;
        }
        return { outside: valueOutside, inside: valueInside, backgroundMargin };
    }
    _computeSeverityColor(data, numberValue) {
        var _a;
        const sections = data.severity;
        let color;
        if (isNaN(numberValue)) {
            sections.forEach((section) => {
                if (data == section.text && section.color) {
                    color = computeCssColor(section.color) || 'disabled';
                }
            });
        }
        else {
            sections.forEach((section) => {
                if (numberValue >= (section.from || 0) &&
                    numberValue <= (section.to || Infinity) &&
                    section.color) {
                    color = computeCssColor(section.color) || 'disabled';
                }
            });
        }
        return (_a = color !== null && color !== void 0 ? color : computeCssColor(data.color)) !== null && _a !== void 0 ? _a : 'disabled';
    }
    _computeBarColor(data, numberValue) {
        let BarColor;
        if (data.severity) {
            BarColor =
                this._computeSeverityColor(data, numberValue) ||
                    computeCssColor(data.color) ||
                    'disabled';
        }
        else if (data == 'unavailable') {
            BarColor = computeCssColor(data.color) || 'disabled';
        }
        else {
            BarColor = computeCssColor(data.color) || 'disabled';
        }
        return BarColor;
    }
    _computePercent(data, numberValue) {
        if (data == 'unavailable')
            return 0;
        if (isNaN(numberValue))
            return 100;
        return (100 * (numberValue - data.min)) / (data.max - data.min);
    }
    getIconUrl(iconName) {
        var _a, _b;
        const basePath = (_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.icons_body) !== null && _b !== void 0 ? _b : '/local/images/bodyscoreIcon';
        return `${basePath}/${iconName}`;
    }
    renderIcon(data, type = 'default') {
        var _a, _b, _c;
        if (!this.hass || !((_a = this.config) === null || _a === void 0 ? void 0 : _a.entity)) {
            return E;
        }
        const stateObj = this.hass.states[this.config.entity];
        if (!stateObj) {
            return E;
        }
        const icon = data.key.toLowerCase() === 'water' && 'water_icon' in stateObj.attributes
            ? stateObj.attributes.water_icon
            : data.icon;
        if (!icon) {
            return E;
        }
        const iconUrl = this.getIconUrl(data.icon);
        if (type === 'body' && iconUrl) {
            return x `
        <ha-icon
          class="image"
          style="
              -webkit-mask-image: url('${iconUrl}');
              mask-image: url('${iconUrl}');
              -webkit-mask-size: 24px;
              mask-size: 24px;
              ${((_b = this.config.styles) === null || _b === void 0 ? void 0 : _b.iconbody) || ''}"
        ></ha-icon>
      `;
        }
        const isProblem = stateObj.attributes.problem !== 'none' && icon === 'mdi:alert';
        const iconClass = isProblem ? 'problem' : '';
        return x `
      <ha-icon
        class="${iconClass}"
        icon="${icon}"
        style="margin-right: 10px; ${((_c = this.config.styles) === null || _c === void 0 ? void 0 : _c.icon) || ''} ${isProblem
            ? 'color: var(--error-color) !important;'
            : ''}"
      ></ha-icon>
    `;
    }
    renderButton(button) {
        if (!this.config.show_buttons || !button.show) {
            return E;
        }
        return x `
      <ha-button
        @click=${() => this.handleChange(button.entity)}
        title=${o$2(button.label)}
      >
        ${button.icon
            ? x `<ha-icon icon="${button.icon}"></ha-icon>`
            : button.label}
      </ha-button>
    `;
    }
    renderToolbar() {
        var _a;
        if (!this.config.show_toolbar) {
            return E;
        }
        return x `
      <div class="toolbar" @ll-custom=${this.customEvent} ?open=${this.open}>
        <ha-icon-button
          @click=${this.toggle}
          title=${o$2(localize('common.toggle_power') || undefined)}
          style="color: var(--primary-color);"
        >
          <ha-icon
            icon=${this.config.show_always_details
            ? ''
            : this.open
                ? 'mdi:chevron-up'
                : 'mdi:chevron-down'}
          ></ha-icon>
        </ha-icon-button>
        <div class="fill-gap"></div>
        ${Object.values((_a = this.config.buttons) !== null && _a !== void 0 ? _a : {})
            .filter((btn) => btn.show)
            .map((btn) => this.renderButton(btn))}
      </div>
    `;
    }
    renderDropdown(attribute, key) {
        var _a, _b;
        if (!this.hass || !((_a = this.config) === null || _a === void 0 ? void 0 : _a.entity)) {
            return E;
        }
        const stateObj = this.hass.states[this.config.entity];
        if (!(stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes)) {
            return E;
        }
        const list = (_b = stateObj.attributes[`${key}_list`]) !== null && _b !== void 0 ? _b : [];
        if (!Array.isArray(list) || list.length === 0) {
            return E;
        }
        return x ` <div
      style="position: relative"
      @click=${(e) => e.stopPropagation()}
    >
      <ha-button @click=${() => this.toggleMenu(key)}> ${attribute} </ha-button>
      <mwc-menu
        @selected=${(e) => this.handleChange(list[e.detail.index])}
        id=${o$2(`bmc-menu-${key}`)}
        activatable
        corner="BOTTOM_START"
      >
        ${list.map((item) => x `
            <mwc-list-item value=${item}>${item}</mwc-list-item>
          `)}
      </mwc-menu>
    </div>`;
    }
    render() {
        var _a, _b, _c, _d;
        if (!this.hass || !((_a = this.config) === null || _a === void 0 ? void 0 : _a.entity)) {
            return E;
        }
        const stateObj = this.hass.states[this.config.entity];
        if (!stateObj) {
            return x `
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
        const filteredBodyData = filterByImpedance((_b = this.config.body) !== null && _b !== void 0 ? _b : {}, this.config.model);
        const filteredAttributesData = filterByImpedance((_c = this.config.attributes) !== null && _c !== void 0 ? _c : {}, this.config.model);
        return x `
      <ha-card>
        ${this.shouldShowBackground()
            ? x `
              <div
                class="background"
                style="${((_d = this.config.styles) === null || _d === void 0 ? void 0 : _d.background) || ''};"
              >
                ${this.config.show_name
                ? x `<div class="title" style="padding: 12px 16px 8px">
                      ${this.renderName(stateObj)}
                    </div>`
                : ''}
                <div
                  class="grid"
                  style="padding: 12px 16px 8px"
                  @click="${this.moreInfo}"
                  tabindex="0"
                >
                  <div class="grid-left">
                    ${(this.config.states
                ? Object.values(this.config.states)
                : [])
                .filter((v) => v)
                .map(this.renderState.bind(this))}
                  </div>
                  <div class="grid-right">
                    ${filteredAttributesData
                .filter(Boolean)
                .map(this.renderAttribute.bind(this))}
                  </div>
                </div>
              </div>
            `
            : this.config.show_name
                ? x `<div class="title">${this.renderName(stateObj)}</div>`
                : ''}
        ${this.renderToolbar()}

        <div id="items" ?open=${this.open || this.config.show_always_details}>
          <div id="score" class="card-content">
            ${filteredBodyData.filter(Boolean).map(this.renderBody.bind(this))}
          </div>
        </div>
      </ha-card>
    `;
    }
};
__decorate([
    n$1({ attribute: false })
], BodymiscaleCard.prototype, "hass", void 0);
__decorate([
    r$1()
], BodymiscaleCard.prototype, "config", void 0);
__decorate([
    r$1()
], BodymiscaleCard.prototype, "open", void 0);
BodymiscaleCard = __decorate([
    t$2('body-miscale-card')
], BodymiscaleCard);
window.customCards = window.customCards || [];
window.customCards.push({
    preview: true,
    type: 'body-miscale-card',
    name: localize('common.name'),
    description: localize('common.description'),
});

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
 */const n="important",i=" !"+n,o=e(class extends i$1{constructor(t$1){if(super(t$1),t$1.type!==t.ATTRIBUTE||"style"!==t$1.name||t$1.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,r)=>{const s=t[r];return null==s?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`}),"")}update(e,[r]){const{style:s}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(r)),this.render(r);for(const t of this.ft)null==r[t]&&(this.ft.delete(t),t.includes("-")?s.removeProperty(t):s[t]=null);for(const t in r){const e=r[t];if(null!=e){this.ft.add(t);const r="string"==typeof e&&e.endsWith(i);t.includes("-")||r?s.setProperty(t,r?e.slice(0,-11):e,r?n:""):s[t]=e;}}return T}});

let ColorSelect = class ColorSelect extends r$3 {
    constructor() {
        super(...arguments);
        this.configValue = '';
    }
    _selectChanged(event) {
        const value = event.target.value;
        this.dispatchEvent(new CustomEvent('value-changed', {
            detail: {
                value: value || undefined,
            },
        }));
    }
    render() {
        return x `
      <ha-select
        .icon=${Boolean(this.value)}
        .label=${localize('color_select.color')}
        .configValue=${this.configValue}
        @selected=${this._selectChanged}
        @closed=${(e) => e.stopPropagation()}
        .value=${this.value}
        fixedMenuPosition
        naturalMenuWidth
      >
        <span slot="icon">
          ${this._renderColorCircle(this.value || 'grey')}
        </span>

        ${Object.keys(COLOR_HEX_MAP).map(
        // Utiliser les clés de COLOR_HEX_MAP
        (color) => x `
            <ha-list-item .value=${color} graphic="icon">
              ${localize(`color_select.${color}`) || color}
              <span slot="graphic">${this._renderColorCircle(color)}</span>
            </ha-list-item>
          `)}
      </ha-select>
    `;
    }
    _renderColorCircle(color) {
        return x `
      <span
        class="circle-color"
        style=${o({
            '--circle-color': computeCssColor(color),
        })}
      ></span>
    `;
    }
    static get styles() {
        return i$5 `
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
__decorate([
    n$1()
], ColorSelect.prototype, "label", void 0);
__decorate([
    n$1()
], ColorSelect.prototype, "value", void 0);
__decorate([
    n$1()
], ColorSelect.prototype, "configValue", void 0);
ColorSelect = __decorate([
    t$2('color-select')
], ColorSelect);

var css_248z = i$5`.card-config {
  display: block;
}

.option {
  display: flex;
  align-items: center;
}

.option ha-switch {
  --mdc-theme-secondary: var(--switch-checked-color);
}

.option ha-select,
.option ha-textfield {
  width: 100%;
}

.option ha-select.small,
.option ha-textfield.small {
  width: 120px;
}

.option ha-textfield.full,
.option ha-select.full {
  flex-grow: 1;
  width: auto;
}

.option ha-formfield {
  padding-bottom: 8px;
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
  padding: 8px;
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
  grid-gap: 8px;
  gap: 8px;
  margin-top: 8px;
}

.severity-row {
  display: flex;
  align-items: center;
}

.severity-row ha-textfield {
  margin-right: 8px;
}
`;
styleInject(css_248z);

let BodymiscaleCardEditor = class BodymiscaleCardEditor extends r$3 {
    constructor() {
        super(...arguments);
        this.page = 1;
        this.selectedColor = 'white';
        this.config = {};
        this.isInitialized = false;
    }
    setConfig(config) {
        this.config = Object.assign({}, config);
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
            return E;
        }
        const config = Object.assign(Object.assign({}, defaultCardConfig), this.config);
        return x `
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
        const entities = Object.keys(this.hass.states).filter((entity) => entity.startsWith('bodymiscale.'));
        return x `
      <div class="flex-space-between">
        <h2 class="page-title">${localize('editor.Configuration')}</h2>
        <div class="navigation">
          <ha-icon-button
            @click=${this._handleConfigClick}
            .disabled=${this.page === 1}
          >
            <ha-icon icon="mdi:tune"></ha-icon>
          </ha-icon-button>
          <ha-icon-button
            @click=${this._handleCustomClick}
            .disabled=${this.page === 2}
          >
            <ha-icon icon="mdi:palette"></ha-icon>
          </ha-icon-button>
        </div>
      </div>
      <div class="option">
        <ha-select
          .label=${localize('editor.entity')}
          @selected=${this.valueChanged}
          .configValue=${'entity'}
          .value=${config.entity}
          @closed=${(e) => e.stopPropagation()}
          fixedMenuPosition
          naturalMenuWidth
          required
          .validationMessage=${localize('error.missing_entity')}
        >
          ${entities.map((entity) => x `<mwc-list-item .value=${entity}>${entity}</mwc-list-item>`)}
        </ha-select>
      </div>

      <div class="option">
        <ha-textfield
          .label=${localize('editor.image')}
          .value=${config.image || ''}
          .configValue=${'image'}
          @input=${this.valueChanged}
        ></ha-textfield>
      </div>

      <div class="option">
        <ha-textfield
          .label=${localize('editor.icons_body')}
          .value=${config.icons_body || ''}
          .configValue=${'icons_body'}
          @input=${this.valueChanged}
        ></ha-textfield>
      </div>

      ${this.renderSwitch('model', config)} ${this.renderSwitch('unit', config)}
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
        return x `
      <div class="flex-space-between">
        <h2 class="page-title">${localize('editor.Customization')}</h2>
        <div class="navigation">
          <ha-icon-button
            @click=${this._handleConfigClick}
            .disabled=${this.page === 1}
          >
            <ha-icon icon="mdi:tune"></ha-icon>
          </ha-icon-button>
          <ha-icon-button
            @click=${this._handleCustomClick}
            .disabled=${this.page === 2}
          >
            <ha-icon icon="mdi:palette"></ha-icon>
          </ha-icon-button>
        </div>
      </div>
      ${this.renderBodyOptions(config)}
    `;
    }
    renderSwitch(option, config, padded = false) {
        return x `
      <div style="padding: ${padded ? '0 0 0 45px' : '0'}">
        ${localize(`editor.${option}`)}
        <div class="option">
          <ha-formfield
            .label=${localize(config[option]
            ? `editor.${option}_aria_label_off`
            : `editor.${option}_aria_label_on`)}
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
        var _a;
        const bodyData = config.unit === false ? body_kg : body_lb;
        const bodyConfig = (_a = config.body) !== null && _a !== void 0 ? _a : {};
        // Filtrage basé sur impedance_required
        const filteredKeys = Object.keys(bodyData).filter((key) => {
            const item = bodyData[key];
            // Si model est false, n'inclure que ceux avec impedance_required === false
            if (config.model === false) {
                return !item.impedance_required; // Exclure ceux qui ont impedance_required = true
            }
            // Si model est true, inclure tous les éléments
            return true;
        });
        return filteredKeys.map((key) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const item = bodyData[key];
            const positions = ((_a = bodyConfig[key]) === null || _a === void 0 ? void 0 : _a.positions) || item.positions || {};
            const min = ((_b = bodyConfig[key]) === null || _b === void 0 ? void 0 : _b.min) !== undefined ? (_c = bodyConfig[key]) === null || _c === void 0 ? void 0 : _c.min : item.min;
            const max = ((_d = bodyConfig[key]) === null || _d === void 0 ? void 0 : _d.max) !== undefined ? (_e = bodyConfig[key]) === null || _e === void 0 ? void 0 : _e.max : item.max;
            const target = ((_f = bodyConfig[key]) === null || _f === void 0 ? void 0 : _f.target) !== undefined
                ? (_g = bodyConfig[key]) === null || _g === void 0 ? void 0 : _g.target
                : item.target;
            const height = ((_h = bodyConfig[key]) === null || _h === void 0 ? void 0 : _h.height) !== undefined
                ? (_j = bodyConfig[key]) === null || _j === void 0 ? void 0 : _j.height
                : item.height;
            const severity = ((_k = bodyConfig[key]) === null || _k === void 0 ? void 0 : _k.severity) || item.severity;
            const label = localize(`body.${key}`);
            const positionKeys = ['icon', 'name', 'minmax', 'value'];
            return x `
        <div>
          <h3>${label}</h3>
          <ha-form-grid>
            ${positionKeys.map((positionKey) => {
                return this.renderPositionSelect(positionKey, positions[positionKey], key);
            })}
          </ha-form-grid>
          <ha-form-grid>
            ${this.renderMinMaxInputs(min, max, key)}
            ${this.renderTargetInputs(target, key)}
            ${this.renderHeightInputs(height, key)}
          </ha-form-grid>
          <ha-form-grid>
            ${this.renderSeverityInputs(severity, key)}
          </ha-form-grid>
        </div>
      `;
        });
    }
    renderPositionSelect(positionKey, currentValue, sectionKey) {
        const valueToUse = currentValue !== null && currentValue !== void 0 ? currentValue : '';
        return x `
      <div class="option">
        <ha-select
          .label=${localize(`editor_body.${positionKey}_position`)}
          .configValue=${`body.${sectionKey}.positions.${positionKey}`}
          @selected=${this.valueChanged}
          .value=${valueToUse}
          @closed=${(e) => e.stopPropagation()}
          fixedMenuPosition
          naturalMenuWidth
          class="full"
        >
          ${currentValue === undefined
            ? x `<mwc-list-item value="" selected disabled></mwc-list-item>`
            : E}
          <mwc-list-item value="inside"
            >${localize('editor_body.inside')}</mwc-list-item
          >
          <mwc-list-item value="outside"
            >${localize('editor_body.outside')}</mwc-list-item
          >
          <mwc-list-item value="off"
            >${localize('editor_body.off')}</mwc-list-item
          >
        </ha-select>
      </div>
    `;
    }
    renderMinMaxInputs(min, max, sectionKey) {
        if (min == null || max == null) {
            return E;
        }
        return x `
      <div class="option">
        <ha-textfield
          .label=${localize('editor_body.min')}
          .configValue=${`body.${sectionKey}.min`}
          @input=${this.valueChanged}
          .value=${String(min)}
          class="full"
          type="number"
        ></ha-textfield>
      </div>
      <div class="option">
        <ha-textfield
          .label=${localize('editor_body.max')}
          .configValue=${`body.${sectionKey}.max`}
          @input=${this.valueChanged}
          .value=${String(max)}
          class="full"
          type="number"
        ></ha-textfield>
      </div>
    `;
    }
    renderTargetInputs(target, sectionKey) {
        if (target == null) {
            return E;
        }
        return x `
      <div class="option">
        <ha-textfield
          .label=${localize('editor_body.target')}
          .configValue=${`body.${sectionKey}.target`}
          @input=${this.valueChanged}
          .value=${String(target)}
          class="full"
          type="number"
        ></ha-textfield>
      </div>
    `;
    }
    renderHeightInputs(height, sectionKey) {
        if (height == null) {
            return E;
        }
        return x `
      <div class="option">
        <ha-textfield
          .label=${localize('editor_body.height')}
          .configValue=${`body.${sectionKey}.height`}
          @input=${this.valueChanged}
          .value=${String(height)}
          class="full"
          type="number"
        ></ha-textfield>
      </div>
    `;
    }
    renderSeverityInputs(severity, configKey) {
        if (severity == null) {
            return E;
        }
        const severityArray = Array.isArray(severity) ? severity : [];
        // Assurer qu'il y a toujours au moins une ligne vide pour l'édition
        const itemsToRender = severityArray.length > 0
            ? severityArray
            : [{ from: '', to: '', color: '' }];
        return x `
      <div>
        ${itemsToRender.map((item, index) => {
            var _a, _b, _c;
            return x `
              <div class="severity-row">
                <ha-textfield
                  .label=${localize('editor_body.from')}
                  .value=${String((_a = item.from) !== null && _a !== void 0 ? _a : '')}
                  @input=${(ev) => this.updateNumericSeverity(configKey, index, 'from', ev.target.value)}
                  type="number"
                  class="full"
                ></ha-textfield>
                <ha-textfield
                  .label=${localize('editor_body.to')}
                  .value=${String((_b = item.to) !== null && _b !== void 0 ? _b : '')}
                  @input=${(ev) => this.updateNumericSeverity(configKey, index, 'to', ev.target.value)}
                  type="number"
                  class="full"
                ></ha-textfield>
                <div>
                  <color-select
                    .value=${(_c = item.color) !== null && _c !== void 0 ? _c : ''}
                    @value-changed=${(ev) => this.updateNumericSeverity(configKey, index, 'color', ev.detail.value)}
                  ></color-select>
                </div>
                <div style="display: flex; align-items: center; margin: 0px">
                  <ha-icon-button
                    @click=${() => this.removeNumericSeverity(configKey, index)}
                  >
                    <ha-icon icon="mdi:delete"></ha-icon>
                  </ha-icon-button>
                  <ha-icon-button
                    @click=${() => this.addNumericSeverity(configKey)}
                  >
                    <ha-icon icon="mdi:plus"></ha-icon>
                  </ha-icon-button>
                </div>
              </div>
            `;
        })}
      </div>
    `;
    }
    updateNumericSeverity(configKey, index, key, value) {
        var _a;
        if (this.config && this.config.body) {
            if (!Array.isArray((_a = this.config.body[configKey]) === null || _a === void 0 ? void 0 : _a.severity)) {
                this.config.body[configKey].severity = []; // Initialiser si nécessaire
            }
            const severity = [
                ...this.config.body[configKey].severity,
            ];
            if (severity[index]) {
                severity[index] = Object.assign(Object.assign({}, severity[index]), { [key]: value });
                this.updateConfig(configKey, severity);
            }
        }
    }
    addNumericSeverity(configKey) {
        var _a, _b;
        if (this.config && this.config.body) {
            if (!Array.isArray((_a = this.config.body[configKey]) === null || _a === void 0 ? void 0 : _a.severity)) {
                this.config.body[configKey].severity = []; // Initialiser en tant que tableau si nécessaire
            }
            const severity = [
                ...(((_b = this.config.body[configKey]) === null || _b === void 0 ? void 0 : _b.severity) || []),
            ];
            severity.push({ from: 0, to: 0, color: '' });
            this.updateConfig(configKey, severity);
        }
    }
    removeNumericSeverity(configKey, index) {
        var _a, _b, _c;
        const severity = [
            ...(((_c = (_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.body) === null || _b === void 0 ? void 0 : _b[configKey]) === null || _c === void 0 ? void 0 : _c.severity) || []),
        ].filter((_, i) => i !== index);
        // Assurer qu'on a toujours au moins une ligne vide
        if (severity.length === 0) {
            severity.push({ from: 0, to: 0, color: '' });
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
        if (event && event.target) {
            const target = event.target;
            if (target.configValue && typeof target.configValue === 'string') {
                const newValue = target.checked !== undefined
                    ? target.checked
                    : target.value || undefined;
                const path = target.configValue.split('.');
                let currentConfig = Object.assign({}, this.config);
                let currentLevel = currentConfig;
                for (let i = 0; i < path.length - 1; i++) {
                    const key = path[i];
                    if (currentLevel[key] === undefined) {
                        currentLevel[key] = {};
                    }
                    currentLevel = currentLevel[key];
                }
                // Mise à jour de la valeur
                const lastKey = path[path.length - 1];
                currentLevel[lastKey] = newValue;
                this.config = currentConfig;
                ne(this, 'config-changed', { config: this.config });
            }
        }
        else {
            ne(this, 'config-changed', { config: this.config });
        }
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
__decorate([
    n$1({ attribute: false })
], BodymiscaleCardEditor.prototype, "hass", void 0);
__decorate([
    n$1({ type: Number })
], BodymiscaleCardEditor.prototype, "page", void 0);
__decorate([
    n$1()
], BodymiscaleCardEditor.prototype, "selectedColor", void 0);
__decorate([
    r$1()
], BodymiscaleCardEditor.prototype, "config", void 0);
__decorate([
    r$1()
], BodymiscaleCardEditor.prototype, "helpers", void 0);
BodymiscaleCardEditor = __decorate([
    t$2('body-miscale-card-editor')
], BodymiscaleCardEditor);

var editor = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get BodymiscaleCardEditor () { return BodymiscaleCardEditor; }
});

export { BodymiscaleCard };
