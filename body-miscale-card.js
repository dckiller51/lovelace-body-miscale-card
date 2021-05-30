/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,t=(e,t,i=null)=>{for(;t!==i;){const i=t.nextSibling;e.removeChild(t),t=i}},i=`{{lit-${String(Math.random()).slice(2)}}}`,s=`\x3c!--${i}--\x3e`,a=new RegExp(`${i}|${s}`);class o{constructor(e,t){this.parts=[],this.element=t;const s=[],o=[],r=document.createTreeWalker(t.content,133,null,!1);let d=0,h=-1,u=0;const{strings:p,values:{length:_}}=e;for(;u<_;){const e=r.nextNode();if(null!==e){if(h++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:i}=t;let s=0;for(let e=0;e<i;e++)n(t[e].name,"$lit$")&&s++;for(;s-- >0;){const t=p[u],i=c.exec(t)[2],s=i.toLowerCase()+"$lit$",o=e.getAttribute(s);e.removeAttribute(s);const n=o.split(a);this.parts.push({type:"attribute",index:h,name:i,strings:n}),u+=n.length-1}}"TEMPLATE"===e.tagName&&(o.push(e),r.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(i)>=0){const i=e.parentNode,o=t.split(a),r=o.length-1;for(let t=0;t<r;t++){let s,a=o[t];if(""===a)s=l();else{const e=c.exec(a);null!==e&&n(e[2],"$lit$")&&(a=a.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),s=document.createTextNode(a)}i.insertBefore(s,e),this.parts.push({type:"node",index:++h})}""===o[r]?(i.insertBefore(l(),e),s.push(e)):e.data=o[r],u+=r}}else if(8===e.nodeType)if(e.data===i){const t=e.parentNode;null!==e.previousSibling&&h!==d||(h++,t.insertBefore(l(),e)),d=h,this.parts.push({type:"node",index:h}),null===e.nextSibling?e.data="":(s.push(e),h--),u++}else{let t=-1;for(;-1!==(t=e.data.indexOf(i,t+1));)this.parts.push({type:"node",index:-1}),u++}}else r.currentNode=o.pop()}for(const e of s)e.parentNode.removeChild(e)}}const n=(e,t)=>{const i=e.length-t.length;return i>=0&&e.slice(i)===t},r=e=>-1!==e.index,l=()=>document.createComment(""),c=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function d(e,t){const{element:{content:i},parts:s}=e,a=document.createTreeWalker(i,133,null,!1);let o=u(s),n=s[o],r=-1,l=0;const c=[];let d=null;for(;a.nextNode();){r++;const e=a.currentNode;for(e.previousSibling===d&&(d=null),t.has(e)&&(c.push(e),null===d&&(d=e)),null!==d&&l++;void 0!==n&&n.index===r;)n.index=null!==d?-1:n.index-l,o=u(s,o),n=s[o]}c.forEach((e=>e.parentNode.removeChild(e)))}const h=e=>{let t=11===e.nodeType?0:1;const i=document.createTreeWalker(e,133,null,!1);for(;i.nextNode();)t++;return t},u=(e,t=-1)=>{for(let i=t+1;i<e.length;i++){const t=e[i];if(r(t))return i}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const p=new WeakMap,_=e=>"function"==typeof e&&p.has(e),b={},m={};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class g{constructor(e,t,i){this.__parts=[],this.template=e,this.processor=t,this.options=i}update(e){let t=0;for(const i of this.__parts)void 0!==i&&i.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),i=[],s=this.template.parts,a=document.createTreeWalker(t,133,null,!1);let o,n=0,l=0,c=a.nextNode();for(;n<s.length;)if(o=s[n],r(o)){for(;l<o.index;)l++,"TEMPLATE"===c.nodeName&&(i.push(c),a.currentNode=c.content),null===(c=a.nextNode())&&(a.currentNode=i.pop(),c=a.nextNode());if("node"===o.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(c.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,o.name,o.strings,this.options));n++}else this.__parts.push(void 0),n++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const f=` ${i} `;class y{constructor(e,t,i,s){this.strings=e,this.values=t,this.type=i,this.processor=s}getHTML(){const e=this.strings.length-1;let t="",a=!1;for(let o=0;o<e;o++){const e=this.strings[o],n=e.lastIndexOf("\x3c!--");a=(n>-1||a)&&-1===e.indexOf("--\x3e",n+1);const r=c.exec(e);t+=null===r?e+(a?f:s):e.substr(0,r.index)+r[1]+r[2]+"$lit$"+r[3]+i}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const w=e=>null===e||!("object"==typeof e||"function"==typeof e),v=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class S{constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let e=0;e<i.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new x(this)}_getValue(){const e=this.strings,t=e.length-1;let i="";for(let s=0;s<t;s++){i+=e[s];const t=this.parts[s];if(void 0!==t){const e=t.value;if(w(e)||!v(e))i+="string"==typeof e?e:String(e);else for(const t of e)i+="string"==typeof t?t:String(t)}}return i+=e[t],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class x{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===b||w(e)&&e===this.value||(this.value=e,_(e)||(this.committer.dirty=!0))}commit(){for(;_(this.value);){const e=this.value;this.value=b,e(this)}this.value!==b&&this.committer.commit()}}class k{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(l()),this.endNode=e.appendChild(l())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=l()),e.__insert(this.endNode=l())}insertAfterPart(e){e.__insert(this.startNode=l()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;_(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=b,e(this)}const e=this.__pendingValue;e!==b&&(w(e)?e!==this.value&&this.__commitText(e):e instanceof y?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):v(e)?this.__commitIterable(e):e===m?(this.value=m,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,i="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=i:this.__commitNode(document.createTextNode(i)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof g&&this.value.template===t)this.value.update(e.values);else{const i=new g(t,e.processor,this.options),s=i._clone();i.update(e.values),this.__commitNode(s),this.value=i}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i,s=0;for(const a of e)i=t[s],void 0===i&&(i=new k(this.options),t.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(t[s-1])),i.setValue(a),i.commit(),s++;s<t.length&&(t.length=s,this.clear(i&&i.endNode))}clear(e=this.startNode){t(this.startNode.parentNode,e.nextSibling,this.endNode)}}class M{constructor(e,t,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this.__pendingValue=e}commit(){for(;_(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=b,e(this)}if(this.__pendingValue===b)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=b}}class P extends S{constructor(e,t,i){super(e,t,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new A(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class A extends x{}let C=!1;(()=>{try{const e={get capture(){return C=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class N{constructor(e,t,i){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;_(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=b,e(this)}if(this.__pendingValue===b)return;const e=this.__pendingValue,t=this.value,i=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),s=null!=e&&(null==t||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),s&&(this.__options=O(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=b}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const O=e=>e&&(C?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */;function $(e){let t=T.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},T.set(e.type,t));let s=t.stringsArray.get(e.strings);if(void 0!==s)return s;const a=e.strings.join(i);return s=t.keyString.get(a),void 0===s&&(s=new o(e,e.getTemplateElement()),t.keyString.set(a,s)),t.stringsArray.set(e.strings,s),s}const T=new Map,B=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const E=new
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class{handleAttributeExpressions(e,t,i,s){const a=t[0];if("."===a){return new P(e,t.slice(1),i).parts}if("@"===a)return[new N(e,t.slice(1),s.eventContext)];if("?"===a)return[new M(e,t.slice(1),i)];return new S(e,t,i).parts}handleTextExpression(e){return new k(e)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.2.1");const V=(e,...t)=>new y(e,t,"html",E)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */,j=(e,t)=>`${e}--${t}`;let D=!0;void 0===window.ShadyCSS?D=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),D=!1);const I=e=>t=>{const s=j(t.type,e);let a=T.get(s);void 0===a&&(a={stringsArray:new WeakMap,keyString:new Map},T.set(s,a));let n=a.stringsArray.get(t.strings);if(void 0!==n)return n;const r=t.strings.join(i);if(n=a.keyString.get(r),void 0===n){const i=t.getTemplateElement();D&&window.ShadyCSS.prepareTemplateDom(i,e),n=new o(t,i),a.keyString.set(r,n)}return a.stringsArray.set(t.strings,n),n},U=["html","svg"],Y=new Set,H=(e,t,i)=>{Y.add(e);const s=i?i.element:document.createElement("template"),a=t.querySelectorAll("style"),{length:o}=a;if(0===o)return void window.ShadyCSS.prepareTemplateStyles(s,e);const n=document.createElement("style");for(let e=0;e<o;e++){const t=a[e];t.parentNode.removeChild(t),n.textContent+=t.textContent}(e=>{U.forEach((t=>{const i=T.get(j(t,e));void 0!==i&&i.keyString.forEach((e=>{const{element:{content:t}}=e,i=new Set;Array.from(t.querySelectorAll("style")).forEach((e=>{i.add(e)})),d(e,i)}))}))})(e);const r=s.content;i?function(e,t,i=null){const{element:{content:s},parts:a}=e;if(null==i)return void s.appendChild(t);const o=document.createTreeWalker(s,133,null,!1);let n=u(a),r=0,l=-1;for(;o.nextNode();)for(l++,o.currentNode===i&&(r=h(t),i.parentNode.insertBefore(t,i));-1!==n&&a[n].index===l;){if(r>0){for(;-1!==n;)a[n].index+=r,n=u(a,n);return}n=u(a,n)}}(i,n,r.firstChild):r.insertBefore(n,r.firstChild),window.ShadyCSS.prepareTemplateStyles(s,e);const l=r.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)t.insertBefore(l.cloneNode(!0),t.firstChild);else if(i){r.insertBefore(n,r.firstChild);const e=new Set;e.add(n),d(i,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const R={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},q=(e,t)=>t!==e&&(t==t||e==e),z={attribute:!0,type:String,converter:R,reflect:!1,hasChanged:q};class L extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,i)=>{const s=this._attributeNameForProperty(i,t);void 0!==s&&(this._attributeToPropertyMap.set(s,i),e.push(s))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=z){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const i="symbol"==typeof e?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);void 0!==s&&Object.defineProperty(this.prototype,e,s)}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(i){const s=this[e];this[t]=i,this._requestUpdate(e,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||z}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const i of t)this.createProperty(i,e[i])}}static _attributeNameForProperty(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=q){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t.type,s=t.converter||R,a="function"==typeof s?s:s.fromAttribute;return a?a(e,i):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const i=t.type,s=t.converter;return(s&&s.toAttribute||R.toAttribute)(e,i)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=z){const s=this.constructor,a=s._attributeNameForProperty(e,i);if(void 0!==a){const e=s._propertyValueToAttribute(t,i);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(a):this.setAttribute(a,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const i=this.constructor,s=i._attributeToPropertyMap.get(e);if(void 0!==s){const e=i.getPropertyOptions(s);this._updateState=16|this._updateState,this[s]=i._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}_requestUpdate(e,t){let i=!0;if(void 0!==e){const s=this.constructor,a=s.getPropertyOptions(e);s._valueHasChanged(this[e],t,a.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==a.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,a))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this._requestUpdate(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}L.finalized=!0;
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const W="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,F=Symbol();class G{constructor(e,t){if(t!==F)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(W?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const J=(e,...t)=>{const i=t.reduce(((t,i,s)=>t+(e=>{if(e instanceof G)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+e[s+1]),e[0]);return new G(i,F)};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions||(window.litElementVersions=[])).push("2.3.1");const Z={};class K extends L{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(void 0===e)this._styles=[];else if(Array.isArray(e)){const t=(e,i)=>e.reduceRight(((e,i)=>Array.isArray(i)?t(i,e):(e.add(i),e)),i),i=t(e,new Set),s=[];i.forEach((e=>s.unshift(e))),this._styles=s}else this._styles=[e]}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?W?this.renderRoot.adoptedStyleSheets=e.map((e=>e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==Z&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return Z}}K.finalized=!0,K.render=(e,i,s)=>{if(!s||"object"!=typeof s||!s.scopeName)throw new Error("The `scopeName` option is required.");const a=s.scopeName,o=B.has(i),n=D&&11===i.nodeType&&!!i.host,r=n&&!Y.has(a),l=r?document.createDocumentFragment():i;if(((e,i,s)=>{let a=B.get(i);void 0===a&&(t(i,i.firstChild),B.set(i,a=new k(Object.assign({templateFactory:$},s))),a.appendInto(i)),a.setValue(e),a.commit()})(e,l,Object.assign({templateFactory:I(a)},s)),r){const e=B.get(l);B.delete(l);const s=e.value instanceof g?e.value.template:void 0;H(a,l,s),t(i,i.firstChild),i.appendChild(l),B.set(i,e)}!o&&n&&window.ShadyCSS.styleElement(i.host)};var Q=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,X="[^\\s]+",ee=/\[([^]*?)\]/gm;function te(e,t){for(var i=[],s=0,a=e.length;s<a;s++)i.push(e[s].substr(0,t));return i}var ie=function(e){return function(t,i){var s=i[e].map((function(e){return e.toLowerCase()})).indexOf(t.toLowerCase());return s>-1?s:null}};function se(e){for(var t=[],i=1;i<arguments.length;i++)t[i-1]=arguments[i];for(var s=0,a=t;s<a.length;s++){var o=a[s];for(var n in o)e[n]=o[n]}return e}var ae=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],oe=["January","February","March","April","May","June","July","August","September","October","November","December"],ne=te(oe,3),re={dayNamesShort:te(ae,3),dayNames:ae,monthNamesShort:ne,monthNames:oe,amPm:["am","pm"],DoFn:function(e){return e+["th","st","nd","rd"][e%10>3?0:(e-e%10!=10?1:0)*e%10]}},le=se({},re),ce=function(e,t){for(void 0===t&&(t=2),e=String(e);e.length<t;)e="0"+e;return e},de={D:function(e){return String(e.getDate())},DD:function(e){return ce(e.getDate())},Do:function(e,t){return t.DoFn(e.getDate())},d:function(e){return String(e.getDay())},dd:function(e){return ce(e.getDay())},ddd:function(e,t){return t.dayNamesShort[e.getDay()]},dddd:function(e,t){return t.dayNames[e.getDay()]},M:function(e){return String(e.getMonth()+1)},MM:function(e){return ce(e.getMonth()+1)},MMM:function(e,t){return t.monthNamesShort[e.getMonth()]},MMMM:function(e,t){return t.monthNames[e.getMonth()]},YY:function(e){return ce(String(e.getFullYear()),4).substr(2)},YYYY:function(e){return ce(e.getFullYear(),4)},h:function(e){return String(e.getHours()%12||12)},hh:function(e){return ce(e.getHours()%12||12)},H:function(e){return String(e.getHours())},HH:function(e){return ce(e.getHours())},m:function(e){return String(e.getMinutes())},mm:function(e){return ce(e.getMinutes())},s:function(e){return String(e.getSeconds())},ss:function(e){return ce(e.getSeconds())},S:function(e){return String(Math.round(e.getMilliseconds()/100))},SS:function(e){return ce(Math.round(e.getMilliseconds()/10),2)},SSS:function(e){return ce(e.getMilliseconds(),3)},a:function(e,t){return e.getHours()<12?t.amPm[0]:t.amPm[1]},A:function(e,t){return e.getHours()<12?t.amPm[0].toUpperCase():t.amPm[1].toUpperCase()},ZZ:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+ce(100*Math.floor(Math.abs(t)/60)+Math.abs(t)%60,4)},Z:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+ce(Math.floor(Math.abs(t)/60),2)+":"+ce(Math.abs(t)%60,2)}},he=function(e){return+e-1},ue=[null,"[1-9]\\d?"],pe=[null,X],_e=["isPm",X,function(e,t){var i=e.toLowerCase();return i===t.amPm[0]?0:i===t.amPm[1]?1:null}],be=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(e){var t=(e+"").match(/([+-]|\d\d)/gi);if(t){var i=60*+t[1]+parseInt(t[2],10);return"+"===t[0]?i:-i}return 0}],me=(ie("monthNamesShort"),ie("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"});var ge=function(e,t,i){if(void 0===t&&(t=me.default),void 0===i&&(i={}),"number"==typeof e&&(e=new Date(e)),"[object Date]"!==Object.prototype.toString.call(e)||isNaN(e.getTime()))throw new Error("Invalid Date pass to format");var s=[];t=(t=me[t]||t).replace(ee,(function(e,t){return s.push(t),"@@@"}));var a=se(se({},le),i);return(t=t.replace(Q,(function(t){return de[t](e,a)}))).replace(/@@@/g,(function(){return s.shift()}))},fe=(function(){try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}}(),function(){try{(new Date).toLocaleString("i")}catch(e){return"RangeError"===e.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}}(),function(e,t,i,s){s=s||{},i=null==i?{}:i;var a=new Event(t,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return a.detail=i,e.dispatchEvent(a),a}),ye={name:"Bodymiscale Card",description:"The bodymiscale card allows you to display your body score.",not_available:"Bodymiscale is not avaialable",toggle_power:"Show score/Hide score"},we={ok:"OK",problem:"Problem",none:"None","weight unavailable":"Weight unavailable","impedance unavailable":"Impedance unavailable","weight unavailable, impedance unavailable":"Weight unavailable, impedance unavailable"},ve={"Weight: ":"Weight: ","Impedance: ":"Impedance: ","Height: ":"Height: ","Age: ":"Age: ","Gender: ":"Gender: "},Se={male:"male",female:"female","unavailable kg":"unavailable","unavailable ohm":"unavailable"},xe={Water:"Water","Visceral fat":"Visceral fat","Body fat":"Body fat",BMI:"BMI","Muscle mass":"Muscle mass",Protein:"Protein","Basal metabolism":"Basal metabolism","Bone mass":"Bone mass","Metabolic age":"Metabolic age",Ideal:"Ideal","Body type":"Body type"},ke={Skinny:"Skinny","Balanced-skinny":"Balanced-skinny","Skinny-muscular":"Skinny-muscular",Balanced:"Balanced","Balanced-muscular":"Balanced-muscular","Lack-exerscise":"Lack-exerscise","Thick-set":"Thick-set",Obese:"Obese",Overweight:"Overweight"},Me={" years":" years"},Pe={missing_entity:"Specifying entity is required!"},Ae={entity:"Entity (Required)",show_name:"Show Name",show_name_aria_label_on:"Toggle display name on",show_name_aria_label_off:"Toggle display name off",show_state:"Show State",show_state_aria_label_on:"Toggle display state on",show_state_aria_label_off:"Toggle display state off",show_attributes:"Show Attributes",show_attributes_aria_label_on:"Toggle display attributes on",show_attributes_aria_label_off:"Toggle display attributes off",show_body:"Show Body Score",show_body_aria_label_on:"Toggle display body score on",show_body_aria_label_off:"Toggle display body score off",show_buttons:"Show Buttons",show_buttons_aria_label_on:"Toggle display buttons on",show_buttons_aria_label_off:"Toggle display buttons off",show_toolbar:"Show Toolbar",show_toolbar_aria_label_on:"Toggle display toolbar on",show_toolbar_aria_label_off:"Toggle display toolbar off",code_only_note:"Note: Setting actions and stats options are available exclusively using Code Editor."},Ce={common:ye,state:we,attributes:ve,attributes_value:Se,body:xe,body_value:ke,unit:Me,error:Pe,editor:Ae},Ne={name:"Carte Bodymiscale",description:"La carte bodymiscale vous permet d'afficher votre score de corps.",not_available:"Bodymiscale n'est pas disponible",toggle_power:"Afficher le score/Cacher le score"},Oe={ok:"OK",problem:"Problème",none:"Aucun","weight unavailable":"Poids indisponible","impedance unavailable":"Impédance indisponible","weight unavailable, impedance unavailable":"Poids indisponible, impédance indisponible"},$e={"Weight: ":"Poids: ","Impedance: ":"Impédance: ","Height: ":"Taille: ","Age: ":"Age: ","Gender: ":"Genre: "},Te={male:"homme",female:"femme","unavailable kg":"indisponible","unavailable ohm":"indisponible"},Be={Water:"Eau","Visceral fat":"Graisse viscérale","Body fat":"Graisse corporelle",BMI:"IMC","Muscle mass":"Muscle",Protein:"Protéine","Basal metabolism":"Métabolisme de base","Bone mass":"Masse osseuse","Metabolic age":"Age corporel",Ideal:"Poids idéal","Body type":"Corpulence"},Ee={Skinny:"Maigre","Balanced-skinny":"Équilibré maigre","Skinny-muscular":"Maigre musclé",Balanced:"Équilibré","Balanced-muscular":"Musclé équilibré","Lack-exerscise":"Manque d'exercice","Thick-set":"Trapu",Obese:"Obèse",Overweight:"Surpoids"},Ve={" years":" ans"},je={missing_entity:"Il est obligatoire de spécifier une entité!"},De={entity:"Entité (obligatoire)",show_name:"Afficher le nom",show_name_aria_label_on:"Activer affichage du nom",show_name_aria_label_off:"Désactiver affichage du nom",show_state:"Afficher l'état",show_state_aria_label_on:"Activer l'affichage de l'état",show_state_aria_label_off:"Désactiver l'affichage de l'état",show_attributes:"Afficher les attributs",show_attributes_aria_label_on:"Activer l'affichage des attributs",show_attributes_aria_label_off:"Désactiver l'affichage des attributs",show_body:"Afficher le score du corps",show_body_aria_label_on:"Activer l'affichage du score du corps",show_body_aria_label_off:"Désactiver l'affichage du score du corps",show_buttons:"Afficher les bouttons",show_buttons_aria_label_on:"Activer l'affichage des bouttons",show_buttons_aria_label_off:"Désactiver l'affichage des bouttons",show_toolbar:"Afficher la barre d'outils",show_toolbar_aria_label_on:"Activer l'affichage de la barre d'outils",show_toolbar_aria_label_off:"Désactiver l'affichage de la barre d'outils",code_only_note:"Remarque: Les options de réglage des actions et statistiques sont disponibles exclusivement en utilisant l'éditeur de code."},Ie={common:Ne,state:Oe,attributes:$e,attributes_value:Te,body:Be,body_value:Ee,unit:Ve,error:je,editor:De},Ue={name:"Bodymiscale Card",description:"O cartão bodymiscale permite que você exiba a pontuação do seu corpo.",not_available:"Bodymiscale não é avaialável",toggle_power:"Pontuação do show/Ocultar pontuação"},Ye={ok:"OK",problem:"Problema",none:"Nenhum","weight unavailable":"Peso indisponível","impedance unavailable":"Impedance indisponível","weight unavailable, impedance unavailable":"Peso indisponível, impedance indisponível"},He={"Weight: ":"Peso: ","Impedance: ":"Impedance: ","Height: ":"Cintura: ","Age: ":"Idade: ","Gender: ":"Gênero: "},Re={male:"macho",female:"fêmea","unavailable kg":"indisponível","unavailable ohm":"indisponível"},qe={Water:"Água","Visceral fat":"Gordura visceral","Body fat":"Gordura corporal",BMI:"IMC","Muscle mass":"Massa muscular",Protein:"Proteína","Basal metabolism":"Metabolismo basal","Bone mass":"Massa óssea","Metabolic age":"Idade metabólica",Ideal:"Ideal","Body type":"Tipo de corpo"},ze={Skinny:"Magro","Balanced-skinny":"Magro equilibrado","Skinny-muscular":"Magro musculoso",Balanced:"Equilibrado","Balanced-muscular":"Musculoso equilibrado","Lack-exerscise":"Falta de exercício","Thick-set":"Grosso-conjunto",Obese:"Obeso",Overweight:"Sobrepeso"},Le={" years":" Anos"},We={missing_entity:"Especificar entidade é necessário!"},Fe={entity:"Entidade (Obrigatório)",show_name:"Nome do show",show_name_aria_label_on:"Alternar o nome da exibição",show_name_aria_label_off:"Alternar o nome da exibição",show_state:"Mostrar Estado",show_state_aria_label_on:"Alternar estado de exibição ligado",show_state_aria_label_off:"Alternar estado de exibição fora",show_attributes:"Atributos do show",show_attributes_aria_label_on:"Alternar atributos de exibição em",show_attributes_aria_label_off:"Alternar atributos de exibição fora",show_body:"Mostrar pontuação corporal",show_body_aria_label_on:"Alternar a pontuação do corpo do display em",show_body_aria_label_off:"Alternar a pontuação do corpo do display fora",show_buttons:"Mostrar botões",show_buttons_aria_label_on:"Alternar botões de exibição",show_buttons_aria_label_off:"Alternar botões de exibição desligados",show_toolbar:"Mostrar barra de ferramentas",show_toolbar_aria_label_on:"Alternar a barra de ferramentas do display em",show_toolbar_aria_label_off:"Alternar barra de ferramentas de exibição fora",code_only_note:"Nota: As opções de configuração de ações e estatísticas estão disponíveis exclusivamente usando o Editor de Código."},Ge={common:Ue,state:Ye,attributes:He,attributes_value:Re,body:qe,body_value:ze,unit:Le,error:We,editor:Fe},Je={en:Object.freeze({__proto__:null,common:ye,state:we,attributes:ve,attributes_value:Se,body:xe,body_value:ke,unit:Me,error:Pe,editor:Ae,default:Ce}),fr:Object.freeze({__proto__:null,common:Ne,state:Oe,attributes:$e,attributes_value:Te,body:Be,body_value:Ee,unit:Ve,error:je,editor:De,default:Ie}),pt_BR:Object.freeze({__proto__:null,common:Ue,state:Ye,attributes:He,attributes_value:Re,body:qe,body_value:ze,unit:Le,error:We,editor:Fe,default:Ge})};function Ze(e,t,i){const[s,a]=e.split(".");let o;try{o=JSON.parse(localStorage.getItem("selectedLanguage"))}catch(e){o=localStorage.getItem("selectedLanguage")}const n=(o||navigator.language.split("-")[0]||"en").replace(/['"]+/g,"").replace("-","_");let r;try{r=Je[n][s][a]}catch(e){}if(void 0===r)try{r=Je.en[s][a]}catch(e){}if(void 0!==r)return""!==t&&""!==i&&(r=r.replace(t,i)),r}customElements.define("body-miscale-card-editor",class extends K{static get properties(){return{hass:Object,_config:Object,_toggle:Boolean}}setConfig(e){this._config=e,this._config.entity||(this._config.entity=this.getEntitiesByType("bodymiscale")[0]||"",fe(this,"config-changed",{config:this._config}))}get _entity(){return this._config&&this._config.entity||""}get _show_name(){return this._config&&this._config.show_name||!1}get _show_state(){return this._config&&this._config.show_state||!1}get _show_attributes(){return this._config&&this._config.show_attributes||!1}get _show_body(){return this._config&&this._config.show_body||!1}get _show_buttons(){return this._config&&this._config.show_buttons||!1}get _show_toolbar(){return this._config&&this._config.show_toolbar||!1}getEntitiesByType(e){return Object.keys(this.hass.states).filter((t=>t.substr(0,t.indexOf("."))===e))}render(){if(!this.hass)return V``;const e=this.getEntitiesByType("bodymiscale");return V`
      <div class="card-config">
        <paper-dropdown-menu
          label="${Ze("editor.entity")}"
          @value-changed=${this._valueChanged}
          .configValue=${"entity"}
        >
          <paper-listbox
            slot="dropdown-content"
            .selected=${e.indexOf(this._entity)}
          >
            ${e.map((e=>V` <paper-item>${e}</paper-item> `))}
          </paper-listbox>
        </paper-dropdown-menu>

        <p class="option">
          <ha-switch
            aria-label=${Ze(this._show_name?"editor.show_name_aria_label_off":"editor.show_name_aria_label_on")}
            .checked=${!1!==this._show_name}
            .configValue=${"show_name"}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${Ze("editor.show_name")}
        </p>

        <p class="option">
          <ha-switch
            aria-label=${Ze(this._show_state?"editor.show_state_aria_label_off":"editor.show_state_aria_label_on")}
            .checked=${!1!==this._show_state}
            .configValue=${"show_state"}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${Ze("editor.show_state")}
        </p>

        <p class="option">
          <ha-switch
            aria-label=${Ze(this._show_attributes?"editor.show_attributes_aria_label_off":"editor.show_attributes_aria_label_on")}
            .checked=${!1!==this._show_attributes}
            .configValue=${"show_attributes"}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${Ze("editor.show_attributes")}
        </p>

        <p class="option">
          <ha-switch
            aria-label=${Ze(this._show_body?"editor.show_body_aria_label_off":"editor.show_body_aria_label_on")}
            .checked=${!1!==this._show_body}
            .configValue=${"show_body"}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${Ze("editor.show_body")}
        </p>

        <p class="option">
          <ha-switch
            aria-label=${Ze(this._show_buttons?"editor.show_buttons_aria_label_off":"editor.show_buttons_aria_label_on")}
            .checked=${!1!==this._show_buttons}
            .configValue=${"show_buttons"}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${Ze("editor.show_buttons")}
        </p>

        <p class="option">
          <ha-switch
            aria-label=${Ze(this._show_name?"editor.show_toolbar_aria_label_off":"editor.show_toolbar_aria_label_on")}
            .checked=${!1!==this._show_toolbar}
            .configValue=${"show_toolbar"}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${Ze("editor.show_toolbar")}
        </p>

        <strong>
          ${Ze("editor.code_only_note")}
        </strong>
      </div>
    `}_valueChanged(e){if(!this._config||!this.hass)return;const t=e.target;this["_"+t.configValue]!==t.value&&(t.configValue&&(""===t.value?delete this._config[t.configValue]:this._config={...this._config,[t.configValue]:void 0!==t.checked?t.checked:t.value}),fe(this,"config-changed",{config:this._config}))}static get styles(){return J`
      .card-config paper-dropdown-menu {
        width: 100%;
      }

      .option {
        display: flex;
        align-items: center;
      }

      .option ha-switch {
        margin-right: 10px;
      }
    `}});var Ke=J`
ha-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.background {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  height: 220px;
}
.preview {
  background-color: var(--primary-color);
  cursor: pointer;
  overflow: hidden;
  position: relative;
}
.preview.not-available {
  filter: grayscale(1);
}
.not-available {
  text-align: center;
  color: var(--text-primary-color);
  font-size: 16px;
}
.metadata {
  margin: 10px auto;
}
.title {
  font-size: 20px;
  padding: 12px 16px 8px;
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
  display: grid;
  grid-template-columns: repeat(2, auto);
  cursor: pointer;
}
.grid-content {
  display: grid;
  align-content: flex-start;
  grid-row-gap: 6px;
}
.grid-left {
  text-align: left;
  font-size: 110%;
  padding-left: 10px;
  border-left: 2px solid var(--primary-color);
}
.grid-right {
  text-align: right;
  padding-right: 10px;
  border-right: 2px solid var(--primary-color);
}
.score {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
}
.score-div {
  display: flex;
  align-items: center;
  flex-direction: row;
}
.score-icon {
  margin-left: 24px;
  flex-basis: 40px;
  flex-shrink: 0;
  flex-grow: 0;
}
.score-label {
  flex-basis: 30%;
  flex-shrink: 1;
  flex-grow: 1;
  margin-right: 8px;
}
.score-value {
  margin-right: 24px;
  flex-direction: row;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
}
input.divcheck { 
  display:none;
}
input.divcheck + div { 
  display:none;
}
input.divcheck:checked + div {
  display:block;
}`;customElements.get("ha-icon-button")||customElements.define("ha-icon-button",class extends(customElements.get("paper-icon-button")){});const Qe={status:{key:"status",icon:"mdi:scale-bathroom"},problem:{key:"problem",icon:"mdi:alert"}},Xe={weight:{key:"weight",label:Ze("attributes.Weight: "),unit:" kg"},impedance:{key:"impedance",label:Ze("attributes.Impedance: "),unit:" ohm"},height:{key:"height",label:Ze("attributes.Height: "),unit:" cm"},age:{key:"age",label:Ze("attributes.Age: "),unit:Ze("unit. years")},gender:{key:"gender",label:Ze("attributes.Gender: ")}},et={water:{key:"Water",label:Ze("body.Water"),icon:"file:water",unit:" %"},visceral_fat:{key:"Visceral fat",label:Ze("body.Visceral fat"),icon:"file:visceral_fat"},body_fat:{key:"Body fat",label:Ze("body.Body fat"),icon:"file:body_fat",unit:" %"},bmi:{key:"BMI",label:Ze("body.BMI"),icon:"file:bmi"},muscle_mass:{key:"Muscle mass",label:Ze("body.Muscle mass"),icon:"file:muscle_mass",unit:" kg"},protein:{key:"Protein",label:Ze("body.Protein"),icon:"file:protein",unit:" %"},basal_metabolism:{key:"Basal metabolism",label:Ze("body.Basal metabolism"),icon:"file:basal_metabolism",unit:" kcal"},bone_mass:{key:"Bone mass",label:Ze("body.Bone mass"),icon:"file:bone_mass",unit:" kg"},metabolic_age:{key:"Metabolic age",label:Ze("body.Metabolic age"),icon:"file:metabolic_age",unit:Ze("unit. years")},ideal:{key:"Ideal",label:Ze("body.Ideal"),icon:"file:ideal",unit:" kg"},body_type:{key:"Body type",label:Ze("body.Body type"),icon:"file:body_type"}},tt={user1:{label:"User1",icon:"mdi:alpha-u-circle"},user2:{show:!1,label:"User2",icon:"mdi:alpha-u-circle"},user3:{show:!1,label:"User3",icon:"mdi:alpha-u-circle"},user4:{show:!1,label:"User4",icon:"mdi:alpha-u-circle"},user5:{show:!1,label:"User5",icon:"mdi:alpha-u-circle"}},it={miscale:{buttons:{user1:{show:!1}},attributes:{weight:{key:"weight"},impedance:!1,height:{key:"height"},age:{key:"age"},gender:{key:"gender"}}},"181D":{state:{status:{key:"state"}},attributes:{weight:{key:"weight"},impedance:!1,height:{key:"height"},age:{key:"age"},gender:{key:"gender"}},body:{water:!1,visceral_fat:{key:"Visceral fat"},body_fat:!1,bmi:{key:"BMI"},muscle_mass:!1,protein:!1,basal_metabolism:{key:"Basal metabolism"},bone_mass:!1,metabolic_age:!1,ideal:{key:"Ideal"},body_type:{key:"Body type"}}},"181B":{state:{status:{key:"state"}},attributes:{weight:{key:"weight"},impedance:{key:"impedance"},height:{key:"height"},age:{key:"age"},gender:{key:"gender"}},body:{water:{key:"Water"},visceral_fat:{key:"Visceral fat"},body_fat:{key:"Body fat"},bmi:{key:"BMI"},muscle_mass:{key:"Muscle mass"},protein:{key:"Protein"},basal_metabolism:{key:"Basal metabolism"},bone_mass:{key:"Bone mass"},metabolic_age:{key:"Metabolic age"},ideal:{key:"Ideal"},body_type:{key:"Body type"}}}};customElements.define("body-miscale-card",class extends K{static get properties(){return{_hass:{},config:{},stateObj:{}}}static get styles(){return Ke}static async getConfigElement(){return document.createElement("body-miscale-card-editor")}static getStubConfig(e,t){const[i]=t.filter((e=>"bodymiscale"===e.substr(0,e.indexOf("."))));return{entity:i||""}}get entity(){return this.hass.states[this.config.entity]}get showName(){return void 0===this.config.show.name||this.config.show.name}get showState(){return void 0===this.config.show.state||this.config.show.state}get showAttributes(){return void 0===this.config.show.attributes||this.config.show.attributes}get showBody(){return void 0===this.config.show.body||this.config.show.body}get showButtons(){return void 0===this.config.show.buttons||this.config.show.buttons}get showToolbar(){return void 0===this.config.show_toolbar||this.config.show_toolbar}setConfig(e){if(!e.entity)throw new Error("Please define an entity.");if("bodymiscale"!==e.entity.split(".")[0])throw new Error("Please define a bodymiscale entity.");if(e.model&&!e.model in it)throw new Error("Please define a valid model.");const t=it[e.model]||it.miscale;this.config={name:e.name,entity:e.entity,show:{name:!1!==e.show_name,state:!1!==e.show_state,body:!1!==e.show_body,attributes:!1!==e.show_attributes,buttons:!1!==e.show_buttons},buttons:this.deepMerge(tt,t.buttons,e.buttons),state:this.deepMerge(Qe,t.state,e.state),body:this.deepMerge(et,t.body,e.body),attributes:this.deepMerge(Xe,t.attributes,e.attributes),styles:{background:e.image?`background-image: url('${e.image}'); color: white; text-shadow: 0 0 10px black;`:"",icon:`color: ${e.image?"white":"var(--paper-item-icon-color)"};`,content:`padding: ${!1!==e.name?"8px":"16px"} 16px ${!1!==e.buttons?"8px":"16px"};`}}}set hass(e){e&&this.config&&(this.stateObj=this.config.entity in e.states?e.states[this.config.entity]:null),this._hass=e}getCardSize(){return this.config.show.name&&this.config.show.buttons?4:this.config.show.name||this.config.show.buttons?3:2}shouldUpdate(e){return e.has("stateObj")}handleChange(e,t){const i=e.target.getAttribute("value");this.callService("bodymiscale.set_"+t,{entity_id:this.stateObj.entity_id,[t]:i})}callService(e,t={entity_id:this.stateObj.entity_id}){const[i,s]=e.split(".");this._hass.callService(i,s,t)}fireEvent(e,t={}){const i=new Event(e,{bubbles:t.bubbles||!0,cancelable:t.cancelable||!0,composed:t.composed||!0});i.detail={entityId:this.stateObj.entity_id},this.dispatchEvent(i)}deepMerge(...e){const t=e=>e&&"object"==typeof e,i={};return e.filter((e=>t(e))).forEach((e=>{Object.keys(e).forEach((s=>{const a=i[s],o=e[s];Array.isArray(a)&&Array.isArray(o)?i[s]=a.concat(o):t(a)&&t(o)?i[s]=this.deepMerge(Object.assign({},a),o):i[s]=o}))})),i}renderName(){return this.showName?V` <div class="title">${this.config.name||this.stateObj.attributes.friendly_name}</div> `:V``}renderState(e){if(!this.showState)return V``;const t=e.compute||(e=>e),i=e&&e.key in this.stateObj.attributes,s=e&&e.key in this.stateObj,a=i?t(this.stateObj.attributes[e.key])+(e.unit||""):s?t(this.stateObj[e.key])+(e.unit||""):this._hass.localize("state.default.unavailable"),o=V`<div>${e.icon&&this.renderIcon(e)}${e.label||""}${Ze("state."+a)||a}</div>`;return e.key+"_list"in this.stateObj.attributes&&(i||s)?this.renderDropdown(o,e.key):o}renderAttribute(e){if(!this.showAttributes)return V``;const t=e.compute||(e=>e),i=e&&e.key in this.stateObj.attributes,s=e&&e.key in this.stateObj,a=i?t(this.stateObj.attributes[e.key])+(e.unit||""):s?t(this.stateObj[e.key])+(e.unit||""):this._hass.localize("state.default.unavailable"),o=V`<div>${e.icon&&this.renderIcon(e)}${e.label||""}${Ze("attributes_value."+a)||a}</div>`;return e.key+"_list"in this.stateObj.attributes&&(i||s)?this.renderDropdown(o,e.key):o}renderBody(e){if(!this.showBody)return V``;const t=e.compute||(e=>e),i=e&&e.key in this.stateObj.attributes,s=e&&e.key in this.stateObj,a=i?t(this.stateObj.attributes[e.key])+(e.unit||""):s?t(this.stateObj[e.key])+(e.unit||""):this._hass.localize("state.default.unavailable"),o=V`<div class="score-div">
                               <div class="score-icon">
                                   ${e.icon&&this.renderIcon(e)}
                               </div>
                               <div class="score-label">
                                   ${e.label||""}
                               </div>
                               <div class="score-value">
                               ${Ze("body_value."+a)||a}
                               </div>
                             </div>`;return e.key+"_list"in this.stateObj.attributes&&(i||s)?this.renderDropdown(o,e.key):o}renderIcon(e){const t="Water"===e.key&&"water_icon"in this.stateObj.attributes?this.stateObj.attributes.water_icon:e.icon;return V`<ha-icon icon="${t}" style="margin-right: 10px; ${this.config.styles.icon}"></ha-icon>`}renderButton(e){return this.showButtons?e&&!1!==e.show?V`<ha-icon-button
        @click="${()=>this.callService(e.service,e.service_data)}"
        icon="${e.icon}"
        title="${e.label||""}"
        style="${this.config.styles.icon}"></ha-icon-button>`:null:V``}renderDropdown(e,t){const i=this.stateObj.attributes[t],s=this.stateObj.attributes[t+"_list"];return V`
      <paper-menu-button slot="dropdown-trigger" @click="${e=>e.stopPropagation()}" style="padding: 0">
        <paper-button slot="dropdown-trigger">${e}</paper-button>
        <paper-listbox slot="dropdown-content" selected="${s.indexOf(i)}" @click="${e=>this.handleChange(e,t)}">
          ${s.map((e=>V`<paper-item value="${e}" style="text-shadow: none;">${e}</paper-item>`))}
        </paper-listbox>
      </paper-menu-button>
    `}render(){return this.stateObj?V`
      <ha-card>
        <ha-scale class="background" style="${this.config.styles.background}">
          <div>${this.renderName()}</div>
          <div class="grid" style="${this.config.styles.content}" @click="${()=>this.fireEvent("hass-more-info")}">
            <div class="grid-content grid-left">
              ${Object.values(this.config.state).filter((e=>e)).map(this.renderState.bind(this))}
            </div>
            <div class="grid-content grid-right">
              ${Object.values(this.config.attributes).filter((e=>e)).map(this.renderAttribute.bind(this))}
            </div>
          </div>
          <label class="flex divcheck" for="hiddenscore">
            ${Object.values(this.config.buttons).filter((e=>e)).map(this.renderButton.bind(this))}
          </label>
        </ha-scale>
        <input type="checkbox" class="divcheck" id="hiddenscore"/>
        <div class="hiddenscore">
          <div class="score">
            ${Object.values(this.config.body).filter((e=>e)).map(this.renderBody.bind(this))}
          </div>
        </div>
      </ha-card>`:V`
      <ha-card>
        <div class="preview not-available">
          <div class="metadata">
            <div class="not-available">
              ${Ze("common.not_available")}
            </div>
          </div>
        </div>
      </ha-card>
    `}}),window.customCards=window.customCards||[],window.customCards.push({preview:!0,type:"body-miscale-card",name:Ze("common.name"),description:Ze("common.description")});
