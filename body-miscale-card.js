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
const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,t=(e,t,i=null)=>{for(;t!==i;){const i=t.nextSibling;e.removeChild(t),t=i}},i=`{{lit-${String(Math.random()).slice(2)}}}`,a=`\x3c!--${i}--\x3e`,o=new RegExp(`${i}|${a}`);class s{constructor(e,t){this.parts=[],this.element=t;const a=[],s=[],r=document.createTreeWalker(t.content,133,null,!1);let c=0,h=-1,u=0;const{strings:b,values:{length:_}}=e;for(;u<_;){const e=r.nextNode();if(null!==e){if(h++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:i}=t;let a=0;for(let e=0;e<i;e++)n(t[e].name,"$lit$")&&a++;for(;a-- >0;){const t=b[u],i=d.exec(t)[2],a=i.toLowerCase()+"$lit$",s=e.getAttribute(a);e.removeAttribute(a);const n=s.split(o);this.parts.push({type:"attribute",index:h,name:i,strings:n}),u+=n.length-1}}"TEMPLATE"===e.tagName&&(s.push(e),r.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(i)>=0){const i=e.parentNode,s=t.split(o),r=s.length-1;for(let t=0;t<r;t++){let a,o=s[t];if(""===o)a=l();else{const e=d.exec(o);null!==e&&n(e[2],"$lit$")&&(o=o.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),a=document.createTextNode(o)}i.insertBefore(a,e),this.parts.push({type:"node",index:++h})}""===s[r]?(i.insertBefore(l(),e),a.push(e)):e.data=s[r],u+=r}}else if(8===e.nodeType)if(e.data===i){const t=e.parentNode;null!==e.previousSibling&&h!==c||(h++,t.insertBefore(l(),e)),c=h,this.parts.push({type:"node",index:h}),null===e.nextSibling?e.data="":(a.push(e),h--),u++}else{let t=-1;for(;-1!==(t=e.data.indexOf(i,t+1));)this.parts.push({type:"node",index:-1}),u++}}else r.currentNode=s.pop()}for(const e of a)e.parentNode.removeChild(e)}}const n=(e,t)=>{const i=e.length-t.length;return i>=0&&e.slice(i)===t},r=e=>-1!==e.index,l=()=>document.createComment(""),d=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function c(e,t){const{element:{content:i},parts:a}=e,o=document.createTreeWalker(i,133,null,!1);let s=u(a),n=a[s],r=-1,l=0;const d=[];let c=null;for(;o.nextNode();){r++;const e=o.currentNode;for(e.previousSibling===c&&(c=null),t.has(e)&&(d.push(e),null===c&&(c=e)),null!==c&&l++;void 0!==n&&n.index===r;)n.index=null!==c?-1:n.index-l,s=u(a,s),n=a[s]}d.forEach((e=>e.parentNode.removeChild(e)))}const h=e=>{let t=11===e.nodeType?0:1;const i=document.createTreeWalker(e,133,null,!1);for(;i.nextNode();)t++;return t},u=(e,t=-1)=>{for(let i=t+1;i<e.length;i++){const t=e[i];if(r(t))return i}return-1};
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
const b=new WeakMap,_=e=>"function"==typeof e&&b.has(e),m={},p={};
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
class g{constructor(e,t,i){this.__parts=[],this.template=e,this.processor=t,this.options=i}update(e){let t=0;for(const i of this.__parts)void 0!==i&&i.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),i=[],a=this.template.parts,o=document.createTreeWalker(t,133,null,!1);let s,n=0,l=0,d=o.nextNode();for(;n<a.length;)if(s=a[n],r(s)){for(;l<s.index;)l++,"TEMPLATE"===d.nodeName&&(i.push(d),o.currentNode=d.content),null===(d=o.nextNode())&&(o.currentNode=i.pop(),d=o.nextNode());if("node"===s.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(d.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(d,s.name,s.strings,this.options));n++}else this.__parts.push(void 0),n++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}
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
 */const f=` ${i} `;class y{constructor(e,t,i,a){this.strings=e,this.values=t,this.type=i,this.processor=a}getHTML(){const e=this.strings.length-1;let t="",o=!1;for(let s=0;s<e;s++){const e=this.strings[s],n=e.lastIndexOf("\x3c!--");o=(n>-1||o)&&-1===e.indexOf("--\x3e",n+1);const r=d.exec(e);t+=null===r?e+(o?f:a):e.substr(0,r.index)+r[1]+r[2]+"$lit$"+r[3]+i}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}
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
 */const w=e=>null===e||!("object"==typeof e||"function"==typeof e),v=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class S{constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let e=0;e<i.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new k(this)}_getValue(){const e=this.strings,t=e.length-1;let i="";for(let a=0;a<t;a++){i+=e[a];const t=this.parts[a];if(void 0!==t){const e=t.value;if(w(e)||!v(e))i+="string"==typeof e?e:String(e);else for(const t of e)i+="string"==typeof t?t:String(t)}}return i+=e[t],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class k{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===m||w(e)&&e===this.value||(this.value=e,_(e)||(this.committer.dirty=!0))}commit(){for(;_(this.value);){const e=this.value;this.value=m,e(this)}this.value!==m&&this.committer.commit()}}class x{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(l()),this.endNode=e.appendChild(l())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=l()),e.__insert(this.endNode=l())}insertAfterPart(e){e.__insert(this.startNode=l()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;_(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=m,e(this)}const e=this.__pendingValue;e!==m&&(w(e)?e!==this.value&&this.__commitText(e):e instanceof y?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):v(e)?this.__commitIterable(e):e===p?(this.value=p,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,i="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=i:this.__commitNode(document.createTextNode(i)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof g&&this.value.template===t)this.value.update(e.values);else{const i=new g(t,e.processor,this.options),a=i._clone();i.update(e.values),this.__commitNode(a),this.value=i}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i,a=0;for(const o of e)i=t[a],void 0===i&&(i=new x(this.options),t.push(i),0===a?i.appendIntoPart(this):i.insertAfterPart(t[a-1])),i.setValue(o),i.commit(),a++;a<t.length&&(t.length=a,this.clear(i&&i.endNode))}clear(e=this.startNode){t(this.startNode.parentNode,e.nextSibling,this.endNode)}}class M{constructor(e,t,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this.__pendingValue=e}commit(){for(;_(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=m,e(this)}if(this.__pendingValue===m)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=m}}class A extends S{constructor(e,t,i){super(e,t,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new O(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class O extends k{}let N=!1;(()=>{try{const e={get capture(){return N=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class P{constructor(e,t,i){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;_(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=m,e(this)}if(this.__pendingValue===m)return;const e=this.__pendingValue,t=this.value,i=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),a=null!=e&&(null==t||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),a&&(this.__options=T(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=m}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const T=e=>e&&(N?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
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
 */;function E(e){let t=C.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},C.set(e.type,t));let a=t.stringsArray.get(e.strings);if(void 0!==a)return a;const o=e.strings.join(i);return a=t.keyString.get(o),void 0===a&&(a=new s(e,e.getTemplateElement()),t.keyString.set(o,a)),t.stringsArray.set(e.strings,a),a}const C=new Map,$=new WeakMap;
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
 */const I=new
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
class{handleAttributeExpressions(e,t,i,a){const o=t[0];if("."===o){return new A(e,t.slice(1),i).parts}if("@"===o)return[new P(e,t.slice(1),a.eventContext)];if("?"===o)return[new M(e,t.slice(1),i)];return new S(e,t,i).parts}handleTextExpression(e){return new x(e)}};
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
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.2.1");const B=(e,...t)=>new y(e,t,"html",I)
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
 */,D=(e,t)=>`${e}--${t}`;let V=!0;void 0===window.ShadyCSS?V=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),V=!1);const j=e=>t=>{const a=D(t.type,e);let o=C.get(a);void 0===o&&(o={stringsArray:new WeakMap,keyString:new Map},C.set(a,o));let n=o.stringsArray.get(t.strings);if(void 0!==n)return n;const r=t.strings.join(i);if(n=o.keyString.get(r),void 0===n){const i=t.getTemplateElement();V&&window.ShadyCSS.prepareTemplateDom(i,e),n=new s(t,i),o.keyString.set(r,n)}return o.stringsArray.set(t.strings,n),n},U=["html","svg"],z=new Set,R=(e,t,i)=>{z.add(e);const a=i?i.element:document.createElement("template"),o=t.querySelectorAll("style"),{length:s}=o;if(0===s)return void window.ShadyCSS.prepareTemplateStyles(a,e);const n=document.createElement("style");for(let e=0;e<s;e++){const t=o[e];t.parentNode.removeChild(t),n.textContent+=t.textContent}(e=>{U.forEach((t=>{const i=C.get(D(t,e));void 0!==i&&i.keyString.forEach((e=>{const{element:{content:t}}=e,i=new Set;Array.from(t.querySelectorAll("style")).forEach((e=>{i.add(e)})),c(e,i)}))}))})(e);const r=a.content;i?function(e,t,i=null){const{element:{content:a},parts:o}=e;if(null==i)return void a.appendChild(t);const s=document.createTreeWalker(a,133,null,!1);let n=u(o),r=0,l=-1;for(;s.nextNode();)for(l++,s.currentNode===i&&(r=h(t),i.parentNode.insertBefore(t,i));-1!==n&&o[n].index===l;){if(r>0){for(;-1!==n;)o[n].index+=r,n=u(o,n);return}n=u(o,n)}}(i,n,r.firstChild):r.insertBefore(n,r.firstChild),window.ShadyCSS.prepareTemplateStyles(a,e);const l=r.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)t.insertBefore(l.cloneNode(!0),t.firstChild);else if(i){r.insertBefore(n,r.firstChild);const e=new Set;e.add(n),c(i,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const H={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},L=(e,t)=>t!==e&&(t==t||e==e),G={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:L};class Y extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,i)=>{const a=this._attributeNameForProperty(i,t);void 0!==a&&(this._attributeToPropertyMap.set(a,i),e.push(a))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=G){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const i="symbol"==typeof e?Symbol():"__"+e,a=this.getPropertyDescriptor(e,i,t);void 0!==a&&Object.defineProperty(this.prototype,e,a)}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(i){const a=this[e];this[t]=i,this._requestUpdate(e,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||G}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const i of t)this.createProperty(i,e[i])}}static _attributeNameForProperty(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=L){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t.type,a=t.converter||H,o="function"==typeof a?a:a.fromAttribute;return o?o(e,i):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const i=t.type,a=t.converter;return(a&&a.toAttribute||H.toAttribute)(e,i)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=G){const a=this.constructor,o=a._attributeNameForProperty(e,i);if(void 0!==o){const e=a._propertyValueToAttribute(t,i);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(o):this.setAttribute(o,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const i=this.constructor,a=i._attributeToPropertyMap.get(e);if(void 0!==a){const e=i.getPropertyOptions(a);this._updateState=16|this._updateState,this[a]=i._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}_requestUpdate(e,t){let i=!0;if(void 0!==e){const a=this.constructor,o=a.getPropertyOptions(e);a._valueHasChanged(this[e],t,o.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==o.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,o))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this._requestUpdate(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}Y.finalized=!0;
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
const W="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,K=Symbol();class q{constructor(e,t){if(t!==K)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(W?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const F=(e,...t)=>{const i=t.reduce(((t,i,a)=>t+(e=>{if(e instanceof q)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+e[a+1]),e[0]);return new q(i,K)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.3.1");const Z={};class J extends Y{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(void 0===e)this._styles=[];else if(Array.isArray(e)){const t=(e,i)=>e.reduceRight(((e,i)=>Array.isArray(i)?t(i,e):(e.add(i),e)),i),i=t(e,new Set),a=[];i.forEach((e=>a.unshift(e))),this._styles=a}else this._styles=[e]}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?W?this.renderRoot.adoptedStyleSheets=e.map((e=>e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==Z&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return Z}}J.finalized=!0,J.render=(e,i,a)=>{if(!a||"object"!=typeof a||!a.scopeName)throw new Error("The `scopeName` option is required.");const o=a.scopeName,s=$.has(i),n=V&&11===i.nodeType&&!!i.host,r=n&&!z.has(o),l=r?document.createDocumentFragment():i;if(((e,i,a)=>{let o=$.get(i);void 0===o&&(t(i,i.firstChild),$.set(i,o=new x(Object.assign({templateFactory:E},a))),o.appendInto(i)),o.setValue(e),o.commit()})(e,l,Object.assign({templateFactory:j(o)},a)),r){const e=$.get(l);$.delete(l);const a=e.value instanceof g?e.value.template:void 0;R(o,l,a),t(i,i.firstChild),i.appendChild(l),$.set(i,e)}!s&&n&&window.ShadyCSS.styleElement(i.host)};var Q=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,X="[^\\s]+",ee=/\[([^]*?)\]/gm;function te(e,t){for(var i=[],a=0,o=e.length;a<o;a++)i.push(e[a].substr(0,t));return i}var ie=function(e){return function(t,i){var a=i[e].map((function(e){return e.toLowerCase()})).indexOf(t.toLowerCase());return a>-1?a:null}};function ae(e){for(var t=[],i=1;i<arguments.length;i++)t[i-1]=arguments[i];for(var a=0,o=t;a<o.length;a++){var s=o[a];for(var n in s)e[n]=s[n]}return e}var oe=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],se=["January","February","March","April","May","June","July","August","September","October","November","December"],ne=te(se,3),re={dayNamesShort:te(oe,3),dayNames:oe,monthNamesShort:ne,monthNames:se,amPm:["am","pm"],DoFn:function(e){return e+["th","st","nd","rd"][e%10>3?0:(e-e%10!=10?1:0)*e%10]}},le=ae({},re),de=function(e,t){for(void 0===t&&(t=2),e=String(e);e.length<t;)e="0"+e;return e},ce={D:function(e){return String(e.getDate())},DD:function(e){return de(e.getDate())},Do:function(e,t){return t.DoFn(e.getDate())},d:function(e){return String(e.getDay())},dd:function(e){return de(e.getDay())},ddd:function(e,t){return t.dayNamesShort[e.getDay()]},dddd:function(e,t){return t.dayNames[e.getDay()]},M:function(e){return String(e.getMonth()+1)},MM:function(e){return de(e.getMonth()+1)},MMM:function(e,t){return t.monthNamesShort[e.getMonth()]},MMMM:function(e,t){return t.monthNames[e.getMonth()]},YY:function(e){return de(String(e.getFullYear()),4).substr(2)},YYYY:function(e){return de(e.getFullYear(),4)},h:function(e){return String(e.getHours()%12||12)},hh:function(e){return de(e.getHours()%12||12)},H:function(e){return String(e.getHours())},HH:function(e){return de(e.getHours())},m:function(e){return String(e.getMinutes())},mm:function(e){return de(e.getMinutes())},s:function(e){return String(e.getSeconds())},ss:function(e){return de(e.getSeconds())},S:function(e){return String(Math.round(e.getMilliseconds()/100))},SS:function(e){return de(Math.round(e.getMilliseconds()/10),2)},SSS:function(e){return de(e.getMilliseconds(),3)},a:function(e,t){return e.getHours()<12?t.amPm[0]:t.amPm[1]},A:function(e,t){return e.getHours()<12?t.amPm[0].toUpperCase():t.amPm[1].toUpperCase()},ZZ:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+de(100*Math.floor(Math.abs(t)/60)+Math.abs(t)%60,4)},Z:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+de(Math.floor(Math.abs(t)/60),2)+":"+de(Math.abs(t)%60,2)}},he=function(e){return+e-1},ue=[null,"[1-9]\\d?"],be=[null,X],_e=["isPm",X,function(e,t){var i=e.toLowerCase();return i===t.amPm[0]?0:i===t.amPm[1]?1:null}],me=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(e){var t=(e+"").match(/([+-]|\d\d)/gi);if(t){var i=60*+t[1]+parseInt(t[2],10);return"+"===t[0]?i:-i}return 0}],pe=(ie("monthNamesShort"),ie("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"});var ge=function(e,t,i){if(void 0===t&&(t=pe.default),void 0===i&&(i={}),"number"==typeof e&&(e=new Date(e)),"[object Date]"!==Object.prototype.toString.call(e)||isNaN(e.getTime()))throw new Error("Invalid Date pass to format");var a=[];t=(t=pe[t]||t).replace(ee,(function(e,t){return a.push(t),"@@@"}));var o=ae(ae({},le),i);return(t=t.replace(Q,(function(t){return ce[t](e,o)}))).replace(/@@@/g,(function(){return a.shift()}))},fe=(function(){try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}}(),function(){try{(new Date).toLocaleString("i")}catch(e){return"RangeError"===e.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}}(),{name:"BodyMiScale Karte",description:"Die BodyMiScale Karte zeigt Ihren gewichtsmäßigen Körperstatus an.",not_available:"BodyMiScale ist momenatan nicht verfügbar",toggle_power:"Weitere Details wie BMI kCal anzeigen / ausblenden"}),ye={ok:"MESSUNG: OK",unknown:"STATUS: unbekannt",problem:"Problem",none:"keine","weight unavailable":"Gewichts Messung nicht verfügbar","impedance unavailable":"Bioelektrische Impedanz Messung (Körperzusammensetzung) nicht verfügbar","weight unavailable, impedance unavailable":"Gewichts und bioelektrische Impedanz Messung (Körperzusammensetzung) nicht verfügbar."},we={"weight: ":"Gewicht: ","impedance: ":"Zusammensetzung: ","height: ":"Körpergröße: ","age: ":"Alter: ","gender: ":"Geschlecht: "},ve={male:"männl.",female:"weibl.","unavailable kg":"Gewichtsmessung momentan nicht verfügbar","unavailable ohm":"Bio Impedanzmessung momentan nicht verfügbar"},Se={bmi:"BMI",bmi_label:"BMI Klassifikation",visceral_fat:"Bauchfett",body_fat:"Körperfett",protein:"Protein",water:"Wasser",muscle_mass:"Muskelmasse",bone_mass:"Knochenmasse",weight:"Gewicht",ideal:"Idealgewicht",basal_metabolism:"Grundumsatz",body_type:"Körperbau",metabolic_age:"stoffwechselbedingtes Körperalter"},ke={Skinny:"schlank","Balanced-skinny":"ausgeglichen schlank","Skinny-muscular":"muskulös schlank",Balanced:"ausgewogen","Balanced-muscular":"ausgewogen muskulös","Lack-exercise":"Bewegungsmangel","Thick-set":"stämmig",Obese:"fettleibig",Overweight:"übergewicht",Underweight:"Untergewicht","Normal or Healthy Weight":"Normal - gesundes Gewicht","Slight overweight":"leichtes Übergewicht","Moderate obesity":"moderate Fettleibigkeit","Severe obesity":"schwere Fettleibigkeit","Massive obesity":"massive Fettleibigkeit"},xe={" years":" Jahre"},Me={missing_entity:"Bitte definieren Sie einen Waagen Sensor in der Konfiguration.",missing_entity_bodymiscale:"Bitte definieren Sie den Waagen Sensor in der Konfiguration.",missing_model:"Bitte definieren Sie ein gültiges Modell der Waage wie miscale, 181D, 181B in der Konfiguration."},Ae={entity:"Bitte ein Konto auf der Waage wählen (erforderlich) !",model:"AKTIVIEREN, wenn auf der Waage 4 graue, 5 cm Ø Kreise sind",model1:"( = Modell 181B) !",model_aria_label_on:"Umschalten von Modell Impedanzmessung ein",model_aria_label_off:"Modell Impedanzmessung ausschalten",image:"Hintergrundbild (optional)",show_name:"Namen des Konto als Titel anzeigen ?",show_name_aria_label_on:"Namensanzeige einschalten",show_name_aria_label_off:"Namesanzeige ausschalten",show_state:"Status anzeigen (Symbole links oben) ?",show_state_aria_label_on:"Statusanzeige einschalten",show_state_aria_label_off:"Statusanzeige ausschalten",show_attributes:"persönliche Stammdaten anzeigen (rechts oben) ?",show_attributes_aria_label_on:"Basis Daten einblenden (rechts oben) einschalten",show_attributes_aria_label_off:"Basis Daten einblenden (rechts oben) ausschalten",show_toolbar:"Fortgeschrittene Optionen anzeigen ?",show_toolbar_aria_label_on:"Symbolleiste anzeigen einschalten",show_toolbar_aria_label_off:"Symbolleiste anzeigen ausschalten",show_body:"Weitere Messergebnisse anbieten",show_body1:"(untere Hälfte - per Power Button einblenden) ?",show_body_aria_label_on:"Körperwertanzeige einschalten",show_body_aria_label_off:"Körperwertanzeige ausschalten",show_buttons:"Kontowechsel erlauben ?",show_buttons_aria_label_on:"Schaltfläche anzeigen einschalten",show_buttons_aria_label_off:"Schaltfläche anzeigen ausschalten",code_information:"ÄNDERUNGEN WERDEN ERST NACH DEM SPEICHERN SICHTBAR.",header_options:"1. Kartenkopf Optionen",body_options:"2. mehr Kartenoptionen",warning:"ACHTUNG:",code_only_note:"Weitere Optionen sind nur im Code Editor verfügbar. [0627-08]"},Oe={common:fe,state:ye,attributes:we,attributes_value:ve,body:Se,body_value:ke,unit:xe,error:Me,editor:Ae},Ne={name:"BodyMiScale Card",description:"The bodymiscale card shows you your weight wise / related body status.",not_available:"BodyMiScale is not available",toggle_power:"Show score/Hide score"},Pe={ok:"MEASUREMENT: OK",unknown:"STATE: unknown",problem:"Problem",none:"None","weight unavailable":"Weight unavailable","impedance unavailable":"Impedance unavailable","weight unavailable, impedance unavailable":"Weight unavailable, impedance unavailable"},Te={"weight: ":"Weight: ","impedance: ":"Impedance: ","height: ":"Height: ","age: ":"Age: ","gender: ":"Gender: "},Ee={male:"male",female:"female","unavailable kg":"unavailable","unavailable ohm":"unavailable"},Ce={bmi:"BMI",bmi_label:"BMI label",visceral_fat:"Visceral fat",body_fat:"Body fat",protein:"Protein",water:"Water",muscle_mass:"Muscle mass",bone_mass:"Bone mass",weight:"Weight",ideal:"Ideal",basal_metabolism:"Basal metabolism",body_type:"Body type",metabolic_age:"Metabolic age"},$e={Skinny:"Skinny","Balanced-skinny":"Balanced-skinny","Skinny-muscular":"Skinny-muscular",Balanced:"Balanced","Balanced-muscular":"Balanced-muscular","Lack-exercise":"Lack-exercise","Thick-set":"Thick-set",Obese:"Obese",Overweight:"Overweight",Underweight:"Underweight","Normal or Healthy Weight":"Normal or Healthy Weight","Slight overweight":"Slight overweight","Moderate obesity":"Moderate obesity","Severe obesity":"Severe obesity","Massive obesity":"Massive obesity"},Ie={" years":" years"},Be={missing_entity:"Please define an entity.",missing_entity_bodymiscale:"Please define a bodymiscale entity.",missing_model:"Please define a valid scale model."},De={entity:"Please select an account on the scale (required) !",model:"ACTIVATE if the scale has 4 grey circles of 5 cm Ø on top",model1:"( = model 181B) !",model_aria_label_on:"Toggle model impedance on",model_aria_label_off:"Toggle model impedance off",image:"Background image (optional)",show_name:"Show the name of the account as title ?",show_name_aria_label_on:"Toggle display name on",show_name_aria_label_off:"Toggle display name off",show_state:"Show State ?",show_state_aria_label_on:"Toggle display state on",show_state_aria_label_off:"Toggle display state off",show_attributes:"Show personal master data (top right) ?",show_attributes_aria_label_on:"Toggle display attributes on",show_attributes_aria_label_off:"Toggle display attributes off",show_toolbar:"Show advanced options ?",show_toolbar_aria_label_on:"Toggle display advanced options on",show_toolbar_aria_label_off:"Toggle display advanced options off",show_body:"Offer further measurement details",show_body1:"(lower half - power button will show those) ?",show_body_aria_label_on:"Toggle display body score on",show_body_aria_label_off:"Toggle display body score off",show_buttons:"Allow account switch ?",show_buttons_aria_label_on:"Toggle display buttons on",show_buttons_aria_label_off:"Toggle display buttons off",code_information:"CHANGES WILL ONLY APPEAR AFTER THEY HAVE BEEN SAVED.",header_options:"1. Card header options",body_options:"2. More card options",warning:"ATTENTION:",code_only_note:"Additional options are only available in the code editor. [0627-08]"},Ve={common:Ne,state:Pe,attributes:Te,attributes_value:Ee,body:Ce,body_value:$e,unit:Ie,error:Be,editor:De},je={name:"Carte BodyMiScale",description:"La carte bodymiscale corporelle vous indique votre poids et votre état corporel.",not_available:"BodyMiScale n'est pas disponible",toggle_power:"Afficher le score/Cacher le score"},Ue={ok:"MESURE: OK",unknown:"ÉTAT: inconnu",problem:"Problème",none:"Aucun","weight unavailable":"Poids indisponible","impedance unavailable":"Impédance indisponible","weight unavailable, impedance unavailable":"Poids indisponible, impédance indisponible"},ze={"weight: ":"Poids: ","impedance: ":"Impédance: ","height: ":"Taille: ","age: ":"Age: ","gender: ":"Genre: "},Re={male:"homme",female:"femme","unavailable kg":"indisponible","unavailable ohm":"indisponible"},He={bmi:"IMC",bmi_label:"Étiquette IMC",visceral_fat:"Graisse viscérale",body_fat:"Graisse corporelle",protein:"Protéine",water:"Eau",muscle_mass:"Muscle",bone_mass:"Masse osseuse",weight:"Poids",ideal:"Poids idéal",basal_metabolism:"Métabolisme de base",body_type:"Corpulence",metabolic_age:"Age corporel"},Le={Skinny:"Maigre","Balanced-skinny":"Équilibré maigre","Skinny-muscular":"Maigre musclé",Balanced:"Équilibré","Balanced-muscular":"Musclé équilibré","Lack-exercise":"Manque d'exercice","Thick-set":"Trapu",Obese:"Obèse",Overweight:"Surpoids",Underweight:"Insuffisance pondérale","Normal or Healthy Weight":"Normal - poids de santé","Slight overweight":"Léger surpoids","Moderate obesity":"Obésité modérée","Severe obesity":"Obésité sévère","Massive obesity":"Obésité massive"},Ge={" years":" ans"},Ye={missing_entity:"Veuillez définir une entité.",missing_entity_bodymiscale:"Veuillez définir une entité Bodymiscale.",missing_model:"Veuillez définir un modèle de balance valide."},We={entity:"Veuillez choisir un compte de la balance (obligatoire) !",model:"ACTIVER si la balance à 4 cercles gris de 5 cm Ø en haut",model1:"( = modèle 181B) !",model_aria_label_on:"Activer la balance à 4 cercles gris de 5 cm Ø en haut",model_aria_label_off:"Désactiver la balance à 4 cercles gris de 5 cm Ø en haut",image:"Image de fond (facultatif)",show_name:"Afficher le nom du compte comme titre ?",show_name_aria_label_on:"Activer affichage du nom",show_name_aria_label_off:"Désactiver affichage du nom",show_state:"Afficher l'état ?",show_state_aria_label_on:"Activer l'affichage de l'état",show_state_aria_label_off:"Désactiver l'affichage de l'état",show_attributes:"Afficher les données personnelles de base (en haut à droite) ?",show_attributes_aria_label_on:"Activer l'affichage des données personnelles de base",show_attributes_aria_label_off:"Désactiver l'affichage des données personnelles de base",show_toolbar:"Afficher les options avancées ?",show_toolbar_aria_label_on:"Activer l'affichage des options avancées",show_toolbar_aria_label_off:"Désactiver l'affichage des options avancées",show_body:"Offrir d'autres détails de mesure",show_body1:"(partie inférieure - le bouton d'alimentation les affichera) ?",show_body_aria_label_on:"Activer l'affichage des autres détails de mesure",show_body_aria_label_off:"Désactiver l'affichage des autres détails de mesure",show_buttons:"Autoriser le changement de compte ?",show_buttons_aria_label_on:"Activer le changement de compte",show_buttons_aria_label_off:"Désactiver le changement de compte",code_information:"LES MODIFICATIONS N'APPARAÎTRONT QU'APRÈS AVOIR ÉTÉ SAUVEGARDÉES",warning:"ATTENTION:",header_options:"1. Options d'en-tête de la carte",body_options:"2. Plus d'options de la cartes",code_only_note:"Les options supplémentaires ne sont disponibles que dans l'éditeur de code. [0627-08]"},Ke={common:je,state:Ue,attributes:ze,attributes_value:Re,body:He,body_value:Le,unit:Ge,error:Ye,editor:We},qe={name:"BodyMiScale Card",description:"De bodymiscale kaart toont u uw gewicht / gerelateerde lichaamsstatus.",not_available:"Bodymiscale is niet beschikbaar",toggle_power:"Laat score zien/verberg score"},Fe={ok:"METING: OK",unknown:"STATUS: onbekend",problem:"Probleem",none:"Geen","weight unavailable":"Gewicht niet beschikbar","impedance unavailable":"Impedantie niet beschikbaar","weight unavailable, impedance unavailable":"Gewicht niet beschikbaar, impedantie niet beschikbaar"},Ze={"weight: ":"Gewicht: ","impedance: ":"Impedantie: ","height: ":"Lengte: ","age: ":"Leeftijd: ","gender: ":"Geslacht: "},Je={male:"man",female:"vrouw","unavailable kg":"niet beschikbaar","unavailable ohm":"niet beschikbaar"},Qe={bmi:"BMI",bmi_label:"BMI label",visceral_fat:"Visceraal vet",body_fat:"Lichaamsvet",protein:"Proteine",water:"Water",muscle_mass:"Spiermassa",bone_mass:"Botgewicht",weight:"Gewicht",ideal:"Ideaal",basal_metabolism:"Basaal metabolisme",body_type:"Lichaamstype",metabolic_age:"Metabolistische leeftijd"},Xe={Skinny:"Mager","Balanced-skinny":"Gebalanceerd-mager","Skinny-muscular":"Mager-gespierd",Balanced:"Gebalanceerd","Balanced-muscular":"Gebalanceerd-gespierd","Lack-exercise":"Weinig-beweging","Thick-set":"Dik",Obese:"Obesitas",Overweight:"Overgewicht",Underweight:"Ondergewicht","Normal or Healthy Weight":"Normaal of gezond gewicht","Slight overweight":"Licht overgewicht","Moderate obesity":"Gemiddeld overgewicht","Severe obesity":"Ruim overgewicht","Massive obesity":"Enorm overgewicht"},et={" years":" jaren"},tt={missing_entity:"Geef een entiteit in.",missing_entity_bodymiscale:"Geef een bodymiscale entiteit in.",missing_model:"Geef een juist weegschaalmodel in."},it={entity:"Kies een account op de schaal (verplicht) !",model:"ACTIVEREN indien de weegschaal 4 grijze cirkels van 5 cm Ø",model1:"aan de bovenkant heeft ( = model 181B) !",model_aria_label_on:"Model impedantiemeting inschakelen",model_aria_label_off:"Model impedantiemeting uitschakelen",image:"Achtergrondafbeelding (facultatief)",show_name:"Toon de naam van de rekening als titel ?",show_name_aria_label_on:"Zet naam aan",show_name_aria_label_off:"Zet naam uit",show_state:"Geef status weer ?",show_state_aria_label_on:"Zet status aan",show_state_aria_label_off:"Zet status uit",show_attributes:"Persoonlijke stamgegevens weergeven (rechtsboven) ?",show_attributes_aria_label_on:"Zet attributen aan",show_attributes_aria_label_off:"Zet attributen uit",show_toolbar:"Toon geavanceerde opties ?",show_toolbar_aria_label_on:"Zet knoppenbalk aan",show_toolbar_aria_label_off:"Zet knoppenbalk uit",show_body:"Bieden verdere meting details",show_body1:"(onderste helft - aan/uit knop zal die laten zien) ?",show_body_aria_label_on:"Zet lichaamsscore aan",show_body_aria_label_off:"Zet lichaamsscore uit",show_buttons:"Accountwissel toestaan ?",show_buttons_aria_label_on:"Zet knoppen aan",show_buttons_aria_label_off:"Zet knoppen uit",code_information:"WIJZIGINGEN VERSCHIJNEN PAS NADAT ZE ZIJN OPGESLAGEN.",header_options:"1. Kaart koptekst opties",body_options:"2. Meer boordopties",warning:"LET OP:",code_only_note:"Extra opties zijn alleen beschikbaar in de code editor. [0627-08]"},at={common:qe,state:Fe,attributes:Ze,attributes_value:Je,body:Qe,body_value:Xe,unit:et,error:tt,editor:it},ot={name:"BodyMiScale Card",description:"O cartão bodymiscale mostra-lhe o estado do seu corpo em relação ao peso.",not_available:"Bodymiscale não é avaialável",toggle_power:"Pontuação do show/Ocultar pontuação"},st={ok:"MEDIÇÃO: OK",unknown:"ESTATUTO: desconhecido",problem:"Problema",none:"Nenhum","weight unavailable":"Peso indisponível","impedance unavailable":"Impedance indisponível","weight unavailable, impedance unavailable":"Peso indisponível, impedance indisponível"},nt={"weight: ":"Peso: ","impedance: ":"Impedance: ","height: ":"Cintura: ","age: ":"Idade: ","gender: ":"Gênero: "},rt={male:"macho",female:"fêmea","unavailable kg":"indisponível","unavailable ohm":"indisponível"},lt={bmi:"IMC",bmi_label:"Etiqueta IMC",visceral_fat:"Gordura visceral",body_fat:"Gordura corporal",protein:"Proteína",water:"Água",muscle_mass:"Massa muscular",bone_mass:"Massa óssea",weight:"Peso",ideal:"Ideal",basal_metabolism:"Metabolismo basal",body_type:"Tipo de corpo",metabolic_age:"Idade metabólica"},dt={Skinny:"Magro","Balanced-skinny":"Magro equilibrado","Skinny-muscular":"Magro musculoso",Balanced:"Equilibrado","Balanced-muscular":"Musculoso equilibrado","Lack-exercise":"Falta de exercício","Thick-set":"Grosso-conjunto",Obese:"Obeso",Overweight:"Sobrepeso",Underweight:"Underweight","Normal or Healthy Weight":"Normal","Slight overweight":"Ligeiro acima do peso","Moderate obesity":"Obesidade moderada","Severe obesity":"Obesidade severa","Massive obesity":"Obesidade maciça"},ct={" years":" Anos"},ht={missing_entity:"Por favor, defina uma entidade.",missing_entity_bodymiscale:"Por favor, defina uma entidade bodymiscale.",missing_model:"Por favor, defina um modelo de escala válido."},ut={entity:"Por favor, escolha uma conta na escala (obrigatório) !",model:"ATIVAR se a escala tiver 4 círculos cinzentos de 5 cm Ø no topo",model1:"( = modelo 181B) !",model_aria_label_on:"Alternar o modelo impedância em",model_aria_label_off:"Alternar o modelo impedância desligado",image:"Imagem de fundo (opcional)",show_name:"Mostrar o nome da conta como título ?",show_name_aria_label_on:"Alternar o nome da exibição",show_name_aria_label_off:"Alternar o nome da exibição",show_state:"Mostrar Estado ?",show_state_aria_label_on:"Alternar estado de exibição ligado",show_state_aria_label_off:"Alternar estado de exibição fora",show_attributes:"Mostrar dados mestres pessoais (canto superior direito) ?",show_attributes_aria_label_on:"Alternar atributos de exibição em",show_attributes_aria_label_off:"Alternar atributos de exibição fora",show_toolbar:"Mostrar opções avançadas ?",show_toolbar_aria_label_on:"Alternar a barra de ferramentas do display em",show_toolbar_aria_label_off:"Alternar barra de ferramentas de exibição fora",show_body:"Oferecer mais detalhes de medição",show_body1:"(parte inferior - botão de energia mostrará esses) ?",show_body_aria_label_on:"Alternar a pontuação do corpo do display em",show_body_aria_label_off:"Alternar a pontuação do corpo do display fora",show_buttons:"Permitir a troca de conta ?",show_buttons_aria_label_on:"Alternar botões de exibição",show_buttons_aria_label_off:"Alternar botões de exibição desligados",code_information:"AS MUDANÇAS SÓ APARECERÃO DEPOIS DE TEREM SIDO SALVAS.",header_options:"1. Opções do cabeçalho do cartão",body_options:"2. Mais opções de placas",warning:"CUIDADO:",code_only_note:"Opções adicionais estão disponíveis apenas no editor de código. [0627-08]"},bt={common:ot,state:st,attributes:nt,attributes_value:rt,body:lt,body_value:dt,unit:ct,error:ht,editor:ut},_t={de:Object.freeze({__proto__:null,common:fe,state:ye,attributes:we,attributes_value:ve,body:Se,body_value:ke,unit:xe,error:Me,editor:Ae,default:Oe}),en:Object.freeze({__proto__:null,common:Ne,state:Pe,attributes:Te,attributes_value:Ee,body:Ce,body_value:$e,unit:Ie,error:Be,editor:De,default:Ve}),fr:Object.freeze({__proto__:null,common:je,state:Ue,attributes:ze,attributes_value:Re,body:He,body_value:Le,unit:Ge,error:Ye,editor:We,default:Ke}),nl:Object.freeze({__proto__:null,common:qe,state:Fe,attributes:Ze,attributes_value:Je,body:Qe,body_value:Xe,unit:et,error:tt,editor:it,default:at}),pt_BR:Object.freeze({__proto__:null,common:ot,state:st,attributes:nt,attributes_value:rt,body:lt,body_value:dt,unit:ct,error:ht,editor:ut,default:bt})};function mt(e,t,i){const[a,o]=e.split(".");let s;try{s=JSON.parse(localStorage.getItem("selectedLanguage"))}catch(e){s=localStorage.getItem("selectedLanguage")}const n=(s||navigator.language.split("-")[0]||"en").replace(/['"]+/g,"").replace("-","_");let r;try{r=_t[n][a][o]}catch(e){}if(void 0===r)try{r=_t.en[a][o]}catch(e){}if(void 0!==r)return""!==t&&""!==i&&(r=r.replace(t,i)),r}customElements.define("body-miscale-card-editor",class extends J{static get properties(){return{hass:Object,_config:Object,_toggle:Boolean}}setConfig(e){this._config=e}get _entity(){return this._config&&this._config.entity||""}get _image(){return this._config&&this._config.image||""}get _model(){return this._config&&this._config.model||!1}get _show_name(){return!this._config||(this._config.show_name||!1)}get _show_state(){return!this._config||(this._config.show_state||!1)}get _show_attributes(){return!this._config||(this._config.show_attributes||!1)}get _show_body(){return!this._config||(this._config.show_body||!1)}get _show_buttons(){return this._config&&this._config.show_buttons||!1}get _show_toolbar(){return!this._config||(this._config.show_toolbar||!1)}render(){if(!this.hass)return B``;const e=Object.keys(this.hass.states).filter((e=>"bodymiscale"===e.substr(0,e.indexOf("."))));return B`
      <div class="card-config">
        <strong>
          ${mt("editor.code_information")}
        </strong>

        <paper-dropdown-menu
          label="${mt("editor.entity")}"
          @value-changed=${this._valueChanged}
          .configValue=${"entity"}
        >
          <paper-listbox
            slot="dropdown-content"
            .selected=${e.indexOf(this._entity)}
          >
            ${e.map((e=>B` <paper-item>${e}</paper-item> `))}
          </paper-listbox>
        </paper-dropdown-menu>

        <paper-input
          label="${mt("editor.image")}"
          .value=${this._image}
          .configValue=${"image"}
          @value-changed=${this._valueChanged}
        ></paper-input>

        <p class="option">
          <ha-switch
            aria-label=${mt(this._model?"editor.model_aria_label_off":"editor.model_aria_label_on")}
            .checked=${!1!==this._model}
            .configValue=${"model"}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${mt("editor.model")}<br>
          ${mt("editor.model1")}
        </p>

        <strong style="font-size: large; line-height: 200%;">
          <U>${mt("editor.header_options")}</U>
        </strong>

        <p class="option">
          <ha-switch
            aria-label=${mt(this._show_name?"editor.show_name_aria_label_off":"editor.show_name_aria_label_on")}
            .checked=${!1!==this._show_name}
            .configValue=${"show_name"}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${mt("editor.show_name")}
        </p>

        <p class="option">
          <ha-switch
            aria-label=${mt(this._show_state?"editor.show_state_aria_label_off":"editor.show_state_aria_label_on")}
            .checked=${!1!==this._show_state}
            .configValue=${"show_state"}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${mt("editor.show_state")}
        </p>

        <p class="option">
          <ha-switch
            aria-label=${mt(this._show_attributes?"editor.show_attributes_aria_label_off":"editor.show_attributes_aria_label_on")}
            .checked=${!1!==this._show_attributes}
            .configValue=${"show_attributes"}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${mt("editor.show_attributes")}
        </p>

        <strong style="font-size: large; line-height: 200%;">
          <U>${mt("editor.body_options")}</U>
        </strong>

        <p class="option">
          <ha-switch
            aria-label=${mt(this._show_toolbar?"editor.show_toolbar_aria_label_off":"editor.show_toolbar_aria_label_on")}
            .checked=${!1!==this._show_toolbar}
            .configValue=${"show_toolbar"}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${mt("editor.show_toolbar")}
        </p>

        <p class="option" style="padding:0 0 0 45px;">
          <ha-switch
            aria-label=${mt(this._show_body?"editor.show_body_aria_label_off":"editor.show_body_aria_label_on")}
            .checked=${!1!==this._show_body}
            .configValue=${"show_body"}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${mt("editor.show_body")}<br>
          ${mt("editor.show_body1")}
        </p>

        <p class="option" style="padding:0 0 0 45px;">
          <ha-switch
            aria-label=${mt(this._show_buttons?"editor.show_buttons_aria_label_off":"editor.show_buttons_aria_label_on")}
            .checked=${!1!==this._show_buttons}
            .configValue=${"show_buttons"}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${mt("editor.show_buttons")}
        </p>

        <p>
          <U><B>${mt("editor.warning")}</B></U> ${mt("editor.code_only_note")}
        </p>
      </div>
    `}_valueChanged(e){if(!this._config||!this.hass)return;const t=e.target;this["_"+t.configValue]!==t.value&&(t.configValue&&(""===t.value?delete this._config[t.configValue]:this._config={...this._config,[t.configValue]:void 0!==t.checked?t.checked:t.value}),function(e,t,i,a){a=a||{},i=null==i?{}:i;var o=new Event(t,{bubbles:void 0===a.bubbles||a.bubbles,cancelable:Boolean(a.cancelable),composed:void 0===a.composed||a.composed});o.detail=i,e.dispatchEvent(o)}(this,"config-changed",{config:this._config}))}static get styles(){return F`
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
    `}});var pt=F`
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
  margin-bottom: 10px;
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
.fill-gap {
  flex-grow: 1;
}
ha-icon {
  color: #fff;
}
.toolbar {
  min-height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.toolbar ha-icon-button:first-child {
  margin-left: 5px;
}
.toolbar ha-icon-button:last-child {
  margin-right: 5px;
}
label.divcheck {
  color: var(--primary-color);
}
input.divcheck { 
  display:none;
}
input.divcheck~div { 
  display:none;
}
input.divcheck:checked~div {
  display:block;
}
input.divcheck:checked~label.divcheck {
  color: green;
}`;customElements.get("ha-icon-button")||customElements.define("ha-icon-button",class extends(customElements.get("paper-icon-button")){});const gt={status:{key:"status",icon:"mdi:scale-bathroom"},problem:{key:"problem",icon:"mdi:alert"}},ft={weight:{key:"weight",label:mt("attributes.weight: "),unit:" kg"},impedance:{key:"impedance",label:mt("attributes.impedance: "),unit:" ohm"},height:{key:"height",label:mt("attributes.height: "),unit:" cm"},age:{key:"age",label:mt("attributes.age: "),unit:mt("unit. years")},gender:{key:"gender",label:mt("attributes.gender: ")}},yt={bmi:{key:"bmi",label:mt("body.bmi"),icon:"/local/images/bodyscoreIcon/bmi.webp"},bmi_label:{key:"bmi_label",label:mt("body.bmi_label"),icon:"/local/images/bodyscoreIcon/body_type.webp"},visceral_fat:{key:"visceral_fat",label:mt("body.visceral_fat"),icon:"/local/images/bodyscoreIcon/visceral_fat.webp"},body_fat:{key:"body_fat",label:mt("body.body_fat"),icon:"/local/images/bodyscoreIcon/body_fat.webp",unit:" %"},protein:{key:"protein",label:mt("body.protein"),icon:"/local/images/bodyscoreIcon/protein.webp",unit:" %"},water:{key:"water",label:mt("body.water"),icon:"/local/images/bodyscoreIcon/water.webp",unit:" %"},muscle_mass:{key:"muscle_mass",label:mt("body.muscle_mass"),icon:"/local/images/bodyscoreIcon/muscle_mass.webp",unit:" kg"},bone_mass:{key:"bone_mass",label:mt("body.bone_mass"),icon:"/local/images/bodyscoreIcon/bone_mass.webp",unit:" kg"},weight:{key:"weight",label:mt("body.weight"),icon:"/local/images/bodyscoreIcon/ideal.webp",unit:" kg"},ideal:{key:"ideal",label:mt("body.ideal"),icon:"/local/images/bodyscoreIcon/ideal.webp",unit:" kg"},basal_metabolism:{key:"basal_metabolism",label:mt("body.basal_metabolism"),icon:"/local/images/bodyscoreIcon/basal_metabolism.webp",unit:" kcal"},body_type:{key:"body_type",label:mt("body.body_type"),icon:"/local/images/bodyscoreIcon/body_type.webp"},metabolic_age:{key:"metabolic_age",label:mt("body.metabolic_age"),icon:"/local/images/bodyscoreIcon/metabolic_age.webp",unit:mt("unit. years")}},wt={user1:{label:"User1",icon:"mdi:alpha-u-circle"},user2:{show:!1,label:"User2",icon:"mdi:alpha-u-circle"},user3:{show:!1,label:"User3",icon:"mdi:alpha-u-circle"},user4:{show:!1,label:"User4",icon:"mdi:alpha-u-circle"},user5:{show:!1,label:"User5",icon:"mdi:alpha-u-circle"}},vt={false:{state:{status:{key:"state"}},attributes:{weight:{key:"weight"},impedance:!1,height:{key:"height"},age:{key:"age"},gender:{key:"gender"}},body:{bmi:{key:"bmi"},bmi_label:{key:"bmi_label"},visceral_fat:{key:"visceral_fat"},body_fat:!1,protein:!1,water:!1,muscle_mass:!1,bone_mass:!1,weight:{key:"weight"},ideal:{key:"ideal"},basal_metabolism:{key:"basal_metabolism"},body_type:!1,metabolic_age:!1}},true:{state:{status:{key:"state"}},attributes:{weight:{key:"weight"},impedance:{key:"impedance"},height:{key:"height"},age:{key:"age"},gender:{key:"gender"}},body:{bmi:{key:"bmi"},bmi_label:{key:"bmi_label"},visceral_fat:{key:"visceral_fat"},body_fat:{key:"body_fat"},protein:{key:"protein"},water:{key:"water"},muscle_mass:{key:"muscle_mass"},bone_mass:{key:"bone_mass"},weight:{key:"weight"},ideal:{key:"ideal"},basal_metabolism:{key:"basal_metabolism"},body_type:{key:"body_type"},metabolic_age:{key:"metabolic_age"}}}};customElements.define("body-miscale-card",class extends J{static get properties(){return{_hass:{},config:{},stateObj:{}}}static get styles(){return pt}static async getConfigElement(){return document.createElement("body-miscale-card-editor")}static getStubConfig(e,t){const[i]=t.filter((e=>"bodymiscale"===e.substr(0,e.indexOf("."))));return{entity:i||""}}get entity(){return this.hass.states[this.config.entity]}get image(){return void 0===this.config.image?"":this.config.image}get model(){return void 0!==this.config.model&&this.config.model}get showName(){return void 0===this.config.show_name||this.config.show_name}get showState(){return void 0===this.config.show_state||this.config.show_state}get showAttributes(){return void 0===this.config.show_attributes||this.config.show_attributes}get showBody(){return void 0===this.config.show_body||this.config.show_body}get showButtons(){return void 0!==this.config.show_buttons&&this.config.show_buttons}get showToolbar(){return void 0===this.config.show_toolbar||this.config.show_toolbar}setConfig(e){if(!e.entity)throw new Error(mt("error.missing_entity"));if("bodymiscale"!==e.entity.split(".")[0])throw new Error(mt("error.missing_entity_bodymiscale"));if(e.model&&!(e.model in vt))throw new Error(mt("error.missing_model"));const t=vt[e.model]||vt.false;this.config={name:e.name,entity:e.entity,buttons:this.deepMerge(wt,t.buttons,e.buttons),state:this.deepMerge(gt,t.state,e.state),body:this.deepMerge(yt,t.body,e.body),attributes:this.deepMerge(ft,t.attributes,e.attributes),show_name:e.show_name,show_state:e.show_state,show_attributes:e.show_attributes,show_body:e.show_body,show_buttons:e.show_buttons,show_toolbar:e.show_toolbar,styles:{background:e.image?`background-image: url('${e.image}'); color: white; text-shadow: 0 0 10px black;`:"",icon:`color: ${e.image?"white":"var(--paper-item-icon-color)"};`,iconbody:"background-color: white;",content:`padding: ${!1!==e.name?"8px":"16px"} 16px ${!1!==e.buttons?"8px":"16px"};`}}}set hass(e){e&&this.config&&(this.stateObj=this.config.entity in e.states?e.states[this.config.entity]:null),this._hass=e}getCardSize(){return this.config.show_name&&this.config.show_buttons?4:this.config.show_name||this.config.show_buttons?3:2}shouldUpdate(e){return e.has("stateObj")}handleChange(e,t){const i=e.target.getAttribute("value");this.callService("bodymiscale.set_"+t,{entity_id:this.stateObj.entity_id,[t]:i})}callService(e,t={entity_id:this.stateObj.entity_id}){const[i,a]=e.split(".");this._hass.callService(i,a,t)}fireEvent(e,t={}){const i=new Event(e,{bubbles:t.bubbles||!0,cancelable:t.cancelable||!0,composed:t.composed||!0});i.detail={entityId:this.stateObj.entity_id},this.dispatchEvent(i)}deepMerge(...e){const t=e=>e&&"object"==typeof e,i={};return e.filter((e=>t(e))).forEach((e=>{Object.keys(e).forEach((a=>{const o=i[a],s=e[a];Array.isArray(o)&&Array.isArray(s)?i[a]=o.concat(s):t(o)&&t(s)?i[a]=this.deepMerge(Object.assign({},o),s):i[a]=s}))})),i}renderName(){return this.showName?B` <div class="title">${this.config.name||this.stateObj.attributes.friendly_name}</div> `:B``}renderState(e){if(!this.showState)return B``;const t=e.compute||(e=>e),i=e&&e.key in this.stateObj.attributes,a=e&&e.key in this.stateObj,o=i?t(this.stateObj.attributes[e.key])+(e.unit||""):a?t(this.stateObj[e.key])+(e.unit||""):this._hass.localize("state.default.unavailable"),s=B`<div>${e.icon&&this.renderIcon(e)}${e.label||""}${mt("state."+o)||o}</div>`;return e.key+"_list"in this.stateObj.attributes&&(i||a)?this.renderDropdown(s,e.key):s}renderAttribute(e){if(!this.showAttributes)return B``;const t=e.compute||(e=>e),i=e&&e.key in this.stateObj.attributes,a=e&&e.key in this.stateObj,o=i?t(this.stateObj.attributes[e.key])+(e.unit||""):a?t(this.stateObj[e.key])+(e.unit||""):this._hass.localize("state.default.unavailable"),s=B`<div>${e.icon&&this.renderIcon(e)}${e.label||""}${mt("attributes_value."+o)||o}</div>`;return e.key+"_list"in this.stateObj.attributes&&(i||a)?this.renderDropdown(s,e.key):s}renderBody(e){if(!this.showBody)return B``;const t=e.compute||(e=>e),i=e&&e.key in this.stateObj.attributes,a=e&&e.key in this.stateObj,o=i?t(this.stateObj.attributes[e.key])+(e.unit||""):a?t(this.stateObj[e.key])+(e.unit||""):this._hass.localize("state.default.unavailable"),s=B`<div class="score-div">
                               <div class="score-icon">
                                   ${e.icon&&this.renderIconbody(e)}
                               </div>
                               <div class="score-label">
                                   ${e.label||""}
                               </div>
                               <div class="score-value">
                               ${mt("body_value."+o)||o}
                               </div>
                             </div>`;return e.key+"_list"in this.stateObj.attributes&&(i||a)?this.renderDropdown(s,e.key):s}renderIcon(e){const t="water"===e.key&&"water_icon"in this.stateObj.attributes?this.stateObj.attributes.water_icon:e.icon;return B`<ha-icon icon="${t}" style="margin-right: 10px; ${this.config.styles.icon}"></ha-icon>`}renderIconbody(e){const t="Water"===e.key&&"water_icon"in this.stateObj.attributes?this.stateObj.attributes.water_icon:e.icon;return B`<div style="width: 24px; height: 24px; -webkit-mask-box-image: url('${t}'); margin-right: 10px; ${this.config.styles.iconbody}"></div>`}renderButton(e){return this.showButtons?e&&!1!==e.show?B`<ha-icon-button
        @click="${()=>this.callService(e.service,e.service_data)}"
        icon="${e.icon}"
        title="${e.label||""}"
        style="${this.config.styles.icon}"></ha-icon-button>`:null:B``}renderToolbar(){return this.showToolbar?B`
      <div class="toolbar">
        <label class="divcheck" for="hiddenscore">
        <ha-icon-button
          icon="hass:power"
          title="${mt("common.toggle_power")}"
        >
        </ha-icon-button>
        </label>
        <div class="fill-gap"></div>
        ${Object.values(this.config.buttons).filter((e=>e)).map(this.renderButton.bind(this))}
      </div>
    `:B``}renderDropdown(e,t){const i=this.stateObj.attributes[t],a=this.stateObj.attributes[t+"_list"];return B`
      <paper-menu-button slot="dropdown-trigger" @click="${e=>e.stopPropagation()}" style="padding: 0">
        <paper-button slot="dropdown-trigger">${e}</paper-button>
        <paper-listbox slot="dropdown-content" selected="${a.indexOf(i)}" @click="${e=>this.handleChange(e,t)}">
          ${a.map((e=>B`<paper-item value="${e}" style="text-shadow: none;">${e}</paper-item>`))}
        </paper-listbox>
      </paper-menu-button>
    `}render(){return this.stateObj?B`
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
        </ha-scale>
        ${this.renderToolbar()}
        <input type="checkbox" class="divcheck" id="hiddenscore"/>       
        <div>
          <div class="score">
            ${Object.values(this.config.body).filter((e=>e)).map(this.renderBody.bind(this))}
          </div>
        </div>
      </ha-card>`:B`
      <ha-card>
        <div class="preview not-available">
          <div class="metadata">
            <div class="not-available">
              ${mt("common.not_available")}
            </div>
          </div>
        </div>
      </ha-card>
    `}}),window.customCards=window.customCards||[],window.customCards.push({preview:!0,type:"body-miscale-card",name:mt("common.name"),description:mt("common.description")});
