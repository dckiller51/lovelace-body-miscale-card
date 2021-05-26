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
const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,t=(e,t,s=null)=>{for(;t!==s;){const s=t.nextSibling;e.removeChild(t),t=s}},s=`{{lit-${String(Math.random()).slice(2)}}}`,i=`\x3c!--${s}--\x3e`,o=new RegExp(`${s}|${i}`);class n{constructor(e,t){this.parts=[],this.element=t;const i=[],n=[],r=document.createTreeWalker(t.content,133,null,!1);let h=0,d=-1,u=0;const{strings:p,values:{length:g}}=e;for(;u<g;){const e=r.nextNode();if(null!==e){if(d++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:s}=t;let i=0;for(let e=0;e<s;e++)a(t[e].name,"$lit$")&&i++;for(;i-- >0;){const t=p[u],s=c.exec(t)[2],i=s.toLowerCase()+"$lit$",n=e.getAttribute(i);e.removeAttribute(i);const a=n.split(o);this.parts.push({type:"attribute",index:d,name:s,strings:a}),u+=a.length-1}}"TEMPLATE"===e.tagName&&(n.push(e),r.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(s)>=0){const s=e.parentNode,n=t.split(o),r=n.length-1;for(let t=0;t<r;t++){let i,o=n[t];if(""===o)i=l();else{const e=c.exec(o);null!==e&&a(e[2],"$lit$")&&(o=o.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),i=document.createTextNode(o)}s.insertBefore(i,e),this.parts.push({type:"node",index:++d})}""===n[r]?(s.insertBefore(l(),e),i.push(e)):e.data=n[r],u+=r}}else if(8===e.nodeType)if(e.data===s){const t=e.parentNode;null!==e.previousSibling&&d!==h||(d++,t.insertBefore(l(),e)),h=d,this.parts.push({type:"node",index:d}),null===e.nextSibling?e.data="":(i.push(e),d--),u++}else{let t=-1;for(;-1!==(t=e.data.indexOf(s,t+1));)this.parts.push({type:"node",index:-1}),u++}}else r.currentNode=n.pop()}for(const e of i)e.parentNode.removeChild(e)}}const a=(e,t)=>{const s=e.length-t.length;return s>=0&&e.slice(s)===t},r=e=>-1!==e.index,l=()=>document.createComment(""),c=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function h(e,t){const{element:{content:s},parts:i}=e,o=document.createTreeWalker(s,133,null,!1);let n=u(i),a=i[n],r=-1,l=0;const c=[];let h=null;for(;o.nextNode();){r++;const e=o.currentNode;for(e.previousSibling===h&&(h=null),t.has(e)&&(c.push(e),null===h&&(h=e)),null!==h&&l++;void 0!==a&&a.index===r;)a.index=null!==h?-1:a.index-l,n=u(i,n),a=i[n]}c.forEach((e=>e.parentNode.removeChild(e)))}const d=e=>{let t=11===e.nodeType?0:1;const s=document.createTreeWalker(e,133,null,!1);for(;s.nextNode();)t++;return t},u=(e,t=-1)=>{for(let s=t+1;s<e.length;s++){const t=e[s];if(r(t))return s}return-1};
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
const p=new WeakMap,g=e=>"function"==typeof e&&p.has(e),_={},f={};
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
class b{constructor(e,t,s){this.__parts=[],this.template=e,this.processor=t,this.options=s}update(e){let t=0;for(const s of this.__parts)void 0!==s&&s.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),s=[],i=this.template.parts,o=document.createTreeWalker(t,133,null,!1);let n,a=0,l=0,c=o.nextNode();for(;a<i.length;)if(n=i[a],r(n)){for(;l<n.index;)l++,"TEMPLATE"===c.nodeName&&(s.push(c),o.currentNode=c.content),null===(c=o.nextNode())&&(o.currentNode=s.pop(),c=o.nextNode());if("node"===n.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(c.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,n.name,n.strings,this.options));a++}else this.__parts.push(void 0),a++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}
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
 */const m=` ${s} `;class y{constructor(e,t,s,i){this.strings=e,this.values=t,this.type=s,this.processor=i}getHTML(){const e=this.strings.length-1;let t="",o=!1;for(let n=0;n<e;n++){const e=this.strings[n],a=e.lastIndexOf("\x3c!--");o=(a>-1||o)&&-1===e.indexOf("--\x3e",a+1);const r=c.exec(e);t+=null===r?e+(o?m:i):e.substr(0,r.index)+r[1]+r[2]+"$lit$"+r[3]+s}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}
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
 */const w=e=>null===e||!("object"==typeof e||"function"==typeof e),v=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class S{constructor(e,t,s){this.dirty=!0,this.element=e,this.name=t,this.strings=s,this.parts=[];for(let e=0;e<s.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new x(this)}_getValue(){const e=this.strings,t=e.length-1;let s="";for(let i=0;i<t;i++){s+=e[i];const t=this.parts[i];if(void 0!==t){const e=t.value;if(w(e)||!v(e))s+="string"==typeof e?e:String(e);else for(const t of e)s+="string"==typeof t?t:String(t)}}return s+=e[t],s}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class x{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===_||w(e)&&e===this.value||(this.value=e,g(e)||(this.committer.dirty=!0))}commit(){for(;g(this.value);){const e=this.value;this.value=_,e(this)}this.value!==_&&this.committer.commit()}}class k{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(l()),this.endNode=e.appendChild(l())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=l()),e.__insert(this.endNode=l())}insertAfterPart(e){e.__insert(this.startNode=l()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;g(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}const e=this.__pendingValue;e!==_&&(w(e)?e!==this.value&&this.__commitText(e):e instanceof y?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):v(e)?this.__commitIterable(e):e===f?(this.value=f,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,s="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=s:this.__commitNode(document.createTextNode(s)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof b&&this.value.template===t)this.value.update(e.values);else{const s=new b(t,e.processor,this.options),i=s._clone();s.update(e.values),this.__commitNode(i),this.value=s}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let s,i=0;for(const o of e)s=t[i],void 0===s&&(s=new k(this.options),t.push(s),0===i?s.appendIntoPart(this):s.insertAfterPart(t[i-1])),s.setValue(o),s.commit(),i++;i<t.length&&(t.length=i,this.clear(s&&s.endNode))}clear(e=this.startNode){t(this.startNode.parentNode,e.nextSibling,this.endNode)}}class P{constructor(e,t,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=s}setValue(e){this.__pendingValue=e}commit(){for(;g(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}if(this.__pendingValue===_)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=_}}class M extends S{constructor(e,t,s){super(e,t,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new C(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class C extends x{}let N=!1;(()=>{try{const e={get capture(){return N=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class ${constructor(e,t,s){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=s,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;g(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}if(this.__pendingValue===_)return;const e=this.__pendingValue,t=this.value,s=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),i=null!=e&&(null==t||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=A(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=_}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const A=e=>e&&(N?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
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
 */;function T(e){let t=O.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},O.set(e.type,t));let i=t.stringsArray.get(e.strings);if(void 0!==i)return i;const o=e.strings.join(s);return i=t.keyString.get(o),void 0===i&&(i=new n(e,e.getTemplateElement()),t.keyString.set(o,i)),t.stringsArray.set(e.strings,i),i}const O=new Map,E=new WeakMap;
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
 */const B=new
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
class{handleAttributeExpressions(e,t,s,i){const o=t[0];if("."===o){return new M(e,t.slice(1),s).parts}if("@"===o)return[new $(e,t.slice(1),i.eventContext)];if("?"===o)return[new P(e,t.slice(1),s)];return new S(e,t,s).parts}handleTextExpression(e){return new k(e)}};
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
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.2.1");const V=(e,...t)=>new y(e,t,"html",B)
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
 */,j=(e,t)=>`${e}--${t}`;let D=!0;void 0===window.ShadyCSS?D=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),D=!1);const I=e=>t=>{const i=j(t.type,e);let o=O.get(i);void 0===o&&(o={stringsArray:new WeakMap,keyString:new Map},O.set(i,o));let a=o.stringsArray.get(t.strings);if(void 0!==a)return a;const r=t.strings.join(s);if(a=o.keyString.get(r),void 0===a){const s=t.getTemplateElement();D&&window.ShadyCSS.prepareTemplateDom(s,e),a=new n(t,s),o.keyString.set(r,a)}return o.stringsArray.set(t.strings,a),a},U=["html","svg"],Y=new Set,H=(e,t,s)=>{Y.add(e);const i=s?s.element:document.createElement("template"),o=t.querySelectorAll("style"),{length:n}=o;if(0===n)return void window.ShadyCSS.prepareTemplateStyles(i,e);const a=document.createElement("style");for(let e=0;e<n;e++){const t=o[e];t.parentNode.removeChild(t),a.textContent+=t.textContent}(e=>{U.forEach((t=>{const s=O.get(j(t,e));void 0!==s&&s.keyString.forEach((e=>{const{element:{content:t}}=e,s=new Set;Array.from(t.querySelectorAll("style")).forEach((e=>{s.add(e)})),h(e,s)}))}))})(e);const r=i.content;s?function(e,t,s=null){const{element:{content:i},parts:o}=e;if(null==s)return void i.appendChild(t);const n=document.createTreeWalker(i,133,null,!1);let a=u(o),r=0,l=-1;for(;n.nextNode();)for(l++,n.currentNode===s&&(r=d(t),s.parentNode.insertBefore(t,s));-1!==a&&o[a].index===l;){if(r>0){for(;-1!==a;)o[a].index+=r,a=u(o,a);return}a=u(o,a)}}(s,a,r.firstChild):r.insertBefore(a,r.firstChild),window.ShadyCSS.prepareTemplateStyles(i,e);const l=r.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)t.insertBefore(l.cloneNode(!0),t.firstChild);else if(s){r.insertBefore(a,r.firstChild);const e=new Set;e.add(a),h(s,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const R={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},z=(e,t)=>t!==e&&(t==t||e==e),W={attribute:!0,type:String,converter:R,reflect:!1,hasChanged:z};class L extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,s)=>{const i=this._attributeNameForProperty(s,t);void 0!==i&&(this._attributeToPropertyMap.set(i,s),e.push(i))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=W){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const s="symbol"==typeof e?Symbol():"__"+e,i=this.getPropertyDescriptor(e,s,t);void 0!==i&&Object.defineProperty(this.prototype,e,i)}static getPropertyDescriptor(e,t,s){return{get(){return this[t]},set(s){const i=this[e];this[t]=s,this._requestUpdate(e,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||W}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const s of t)this.createProperty(s,e[s])}}static _attributeNameForProperty(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,s=z){return s(e,t)}static _propertyValueFromAttribute(e,t){const s=t.type,i=t.converter||R,o="function"==typeof i?i:i.fromAttribute;return o?o(e,s):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const s=t.type,i=t.converter;return(i&&i.toAttribute||R.toAttribute)(e,s)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,s){t!==s&&this._attributeToProperty(e,s)}_propertyToAttribute(e,t,s=W){const i=this.constructor,o=i._attributeNameForProperty(e,s);if(void 0!==o){const e=i._propertyValueToAttribute(t,s);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(o):this.setAttribute(o,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const s=this.constructor,i=s._attributeToPropertyMap.get(e);if(void 0!==i){const e=s.getPropertyOptions(i);this._updateState=16|this._updateState,this[i]=s._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}_requestUpdate(e,t){let s=!0;if(void 0!==e){const i=this.constructor,o=i.getPropertyOptions(e);i._valueHasChanged(this[e],t,o.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==o.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,o))):s=!1}!this._hasRequestedUpdate&&s&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this._requestUpdate(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}L.finalized=!0;
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
const q="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,F=Symbol();class J{constructor(e,t){if(t!==F)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(q?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const Z=(e,...t)=>{const s=t.reduce(((t,s,i)=>t+(e=>{if(e instanceof J)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+e[i+1]),e[0]);return new J(s,F)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.3.1");const G={};class K extends L{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(void 0===e)this._styles=[];else if(Array.isArray(e)){const t=(e,s)=>e.reduceRight(((e,s)=>Array.isArray(s)?t(s,e):(e.add(s),e)),s),s=t(e,new Set),i=[];s.forEach((e=>i.unshift(e))),this._styles=i}else this._styles=[e]}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?q?this.renderRoot.adoptedStyleSheets=e.map((e=>e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==G&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return G}}K.finalized=!0,K.render=(e,s,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const o=i.scopeName,n=E.has(s),a=D&&11===s.nodeType&&!!s.host,r=a&&!Y.has(o),l=r?document.createDocumentFragment():s;if(((e,s,i)=>{let o=E.get(s);void 0===o&&(t(s,s.firstChild),E.set(s,o=new k(Object.assign({templateFactory:T},i))),o.appendInto(s)),o.setValue(e),o.commit()})(e,l,Object.assign({templateFactory:I(o)},i)),r){const e=E.get(l);E.delete(l);const i=e.value instanceof b?e.value.template:void 0;H(o,l,i),t(s,s.firstChild),s.appendChild(l),E.set(s,e)}!n&&a&&window.ShadyCSS.styleElement(s.host)};var Q=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,X="[^\\s]+",ee=/\[([^]*?)\]/gm;function te(e,t){for(var s=[],i=0,o=e.length;i<o;i++)s.push(e[i].substr(0,t));return s}var se=function(e){return function(t,s){var i=s[e].map((function(e){return e.toLowerCase()})).indexOf(t.toLowerCase());return i>-1?i:null}};function ie(e){for(var t=[],s=1;s<arguments.length;s++)t[s-1]=arguments[s];for(var i=0,o=t;i<o.length;i++){var n=o[i];for(var a in n)e[a]=n[a]}return e}var oe=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],ne=["January","February","March","April","May","June","July","August","September","October","November","December"],ae=te(ne,3),re={dayNamesShort:te(oe,3),dayNames:oe,monthNamesShort:ae,monthNames:ne,amPm:["am","pm"],DoFn:function(e){return e+["th","st","nd","rd"][e%10>3?0:(e-e%10!=10?1:0)*e%10]}},le=ie({},re),ce=function(e,t){for(void 0===t&&(t=2),e=String(e);e.length<t;)e="0"+e;return e},he={D:function(e){return String(e.getDate())},DD:function(e){return ce(e.getDate())},Do:function(e,t){return t.DoFn(e.getDate())},d:function(e){return String(e.getDay())},dd:function(e){return ce(e.getDay())},ddd:function(e,t){return t.dayNamesShort[e.getDay()]},dddd:function(e,t){return t.dayNames[e.getDay()]},M:function(e){return String(e.getMonth()+1)},MM:function(e){return ce(e.getMonth()+1)},MMM:function(e,t){return t.monthNamesShort[e.getMonth()]},MMMM:function(e,t){return t.monthNames[e.getMonth()]},YY:function(e){return ce(String(e.getFullYear()),4).substr(2)},YYYY:function(e){return ce(e.getFullYear(),4)},h:function(e){return String(e.getHours()%12||12)},hh:function(e){return ce(e.getHours()%12||12)},H:function(e){return String(e.getHours())},HH:function(e){return ce(e.getHours())},m:function(e){return String(e.getMinutes())},mm:function(e){return ce(e.getMinutes())},s:function(e){return String(e.getSeconds())},ss:function(e){return ce(e.getSeconds())},S:function(e){return String(Math.round(e.getMilliseconds()/100))},SS:function(e){return ce(Math.round(e.getMilliseconds()/10),2)},SSS:function(e){return ce(e.getMilliseconds(),3)},a:function(e,t){return e.getHours()<12?t.amPm[0]:t.amPm[1]},A:function(e,t){return e.getHours()<12?t.amPm[0].toUpperCase():t.amPm[1].toUpperCase()},ZZ:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+ce(100*Math.floor(Math.abs(t)/60)+Math.abs(t)%60,4)},Z:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+ce(Math.floor(Math.abs(t)/60),2)+":"+ce(Math.abs(t)%60,2)}},de=function(e){return+e-1},ue=[null,"[1-9]\\d?"],pe=[null,X],ge=["isPm",X,function(e,t){var s=e.toLowerCase();return s===t.amPm[0]?0:s===t.amPm[1]?1:null}],_e=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(e){var t=(e+"").match(/([+-]|\d\d)/gi);if(t){var s=60*+t[1]+parseInt(t[2],10);return"+"===t[0]?s:-s}return 0}],fe=(se("monthNamesShort"),se("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"});var be=function(e,t,s){if(void 0===t&&(t=fe.default),void 0===s&&(s={}),"number"==typeof e&&(e=new Date(e)),"[object Date]"!==Object.prototype.toString.call(e)||isNaN(e.getTime()))throw new Error("Invalid Date pass to format");var i=[];t=(t=fe[t]||t).replace(ee,(function(e,t){return i.push(t),"@@@"}));var o=ie(ie({},le),s);return(t=t.replace(Q,(function(t){return he[t](e,o)}))).replace(/@@@/g,(function(){return i.shift()}))},me=(function(){try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}}(),function(){try{(new Date).toLocaleString("i")}catch(e){return"RangeError"===e.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}}(),function(e,t,s,i){i=i||{},s=null==s?{}:s;var o=new Event(t,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return o.detail=s,e.dispatchEvent(o),o}),ye={name:"Bodymiscale Card",description:"The bodymiscale card allows you to display your body score.",not_available:"Bodymiscale is not avaialable",toggle_power:"Show score/Hide score"},we={ok:"OK",problem:"Problem",none:"None","weight unavailable":"Weight unavailable","impedance unavailable":"Impedance unavailable","weight unavailable, impedance unavailable":"Weight unavailable, impedance unavailable"},ve={"Weight: ":"Weight: ","Impedance: ":"Impedance: ","Height: ":"Height: ","Age: ":"Age: ","Gender: ":"Gender: "},Se={Water:"Water","Visceral fat":"Visceral fat","Body fat":"Body fat",BMI:"BMI","Muscle mass":"Muscle mass",Protein:"Protein","Basal metabolism":"Basal metabolism","Bone mass":"Bone mass","Metabolic age":"Metabolic age",Ideal:"Ideal","Body type":"Body type"},xe={" years":" years"},ke={missing_entity:"Specifying entity is required!"},Pe={entity:"Entity (Required)",show_name:"Show Name",show_name_aria_label_on:"Toggle display name on",show_name_aria_label_off:"Toggle display name off",show_state:"Show State",show_state_aria_label_on:"Toggle display state on",show_state_aria_label_off:"Toggle display state off",show_attributes:"Show Attributes",show_attributes_aria_label_on:"Toggle display attributes on",show_attributes_aria_label_off:"Toggle display attributes off",show_body:"Show Body Score",show_body_aria_label_on:"Toggle display body score on",show_body_aria_label_off:"Toggle display body score off",show_buttons:"Show Buttons",show_buttons_aria_label_on:"Toggle display buttons on",show_buttons_aria_label_off:"Toggle display buttons off",show_toolbar:"Show Toolbar",show_toolbar_aria_label_on:"Toggle display toolbar on",show_toolbar_aria_label_off:"Toggle display toolbar off",code_only_note:"Note: Setting actions and stats options are available exclusively using Code Editor."},Me={common:ye,state:we,attributes:ve,body:Se,unit:xe,error:ke,editor:Pe},Ce={name:"Carte Bodymiscale",description:"La carte bodymiscale vous permet d'afficher votre score de corps.",not_available:"Bodymiscale n'est pas disponible",toggle_power:"Afficher le score/Cacher le score"},Ne={ok:"OK",problem:"Problème",none:"Aucun","weight unavailable":"Poids indisponible","impedance unavailable":"Impédance indisponible","weight unavailable, impedance unavailable":"Poids indisponible, impédance indisponible"},$e={"Weight: ":"Poids: ","Impedance: ":"Impédance: ","Height: ":"Taille: ","Age: ":"Age: ","Gender: ":"Genre: "},Ae={Water:"Eau","Visceral fat":"Graisse viscérale","Body fat":"Graisse corporelle",BMI:"IMC","Muscle mass":"Muscle",Protein:"Protéine","Basal metabolism":"Métabolisme de base","Bone mass":"Masse osseuse","Metabolic age":"Age corporel",Ideal:"Poids idéal","Body type":"Corpulence"},Te={" years":" ans"},Oe={missing_entity:"Il est obligatoire de spécifier une entité!"},Ee={entity:"Entité (obligatoire)",show_name:"Afficher le nom",show_name_aria_label_on:"Activer affichage du nom",show_name_aria_label_off:"Désactiver affichage du nom",show_state:"Afficher l'état",show_state_aria_label_on:"Activer l'affichage de l'état",show_state_aria_label_off:"Désactiver l'affichage de l'état",show_attributes:"Afficher les attributs",show_attributes_aria_label_on:"Activer l'affichage des attributs",show_attributes_aria_label_off:"Désactiver l'affichage des attributs",show_body:"Afficher le score du corps",show_body_aria_label_on:"Activer l'affichage du score du corps",show_body_aria_label_off:"Désactiver l'affichage du score du corps",show_buttons:"Afficher les bouttons",show_buttons_aria_label_on:"Activer l'affichage des bouttons",show_buttons_aria_label_off:"Désactiver l'affichage des bouttons",show_toolbar:"Afficher la barre d'outils",show_toolbar_aria_label_on:"Activer l'affichage de la barre d'outils",show_toolbar_aria_label_off:"Désactiver l'affichage de la barre d'outils",code_only_note:"Remarque: Les options de réglage des actions et statistiques sont disponibles exclusivement en utilisant l'éditeur de code."},Be={common:Ce,state:Ne,attributes:$e,body:Ae,unit:Te,error:Oe,editor:Ee},Ve={en:Object.freeze({__proto__:null,common:ye,state:we,attributes:ve,body:Se,unit:xe,error:ke,editor:Pe,default:Me}),fr:Object.freeze({__proto__:null,common:Ce,state:Ne,attributes:$e,body:Ae,unit:Te,error:Oe,editor:Ee,default:Be})};function je(e,t,s){const[i,o]=e.split(".");let n;try{n=JSON.parse(localStorage.getItem("selectedLanguage"))}catch(e){n=localStorage.getItem("selectedLanguage")}const a=(n||navigator.language.split("-")[0]||"en").replace(/['"]+/g,"").replace("-","_");let r;try{r=Ve[a][i][o]}catch(e){}if(void 0===r)try{r=Ve.en[i][o]}catch(e){}if(void 0!==r)return""!==t&&""!==s&&(r=r.replace(t,s)),r}customElements.define("body-miscale-card-editor",class extends K{static get properties(){return{hass:Object,_config:Object,_toggle:Boolean}}setConfig(e){this._config=e,this._config.entity||(this._config.entity=this.getEntitiesByType("bodymiscale")[0]||"",me(this,"config-changed",{config:this._config}))}get _entity(){return this._config&&this._config.entity||""}get _show_name(){return this._config&&this._config.show_name||!1}get _show_state(){return this._config&&this._config.show_state||!1}get _show_attributes(){return this._config&&this._config.show_attributes||!1}get _show_body(){return this._config&&this._config.show_body||!1}get _show_buttons(){return this._config&&this._config.show_buttons||!1}get _show_toolbar(){return this._config&&this._config.show_toolbar||!1}getEntitiesByType(e){return Object.keys(this.hass.states).filter((t=>t.substr(0,t.indexOf("."))===e))}render(){if(!this.hass)return V``;const e=this.getEntitiesByType("bodymiscale");return V`
      <div class="card-config">
        <paper-dropdown-menu
          label="${je("editor.entity")}"
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
            aria-label=${je(this._show_name?"editor.show_name_aria_label_off":"editor.show_name_aria_label_on")}
            .checked=${!1!==this._show_name}
            .configValue=${"show_name"}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${je("editor.show_name")}
        </p>

        <p class="option">
          <ha-switch
            aria-label=${je(this._show_state?"editor.show_state_aria_label_off":"editor.show_state_aria_label_on")}
            .checked=${!1!==this._show_state}
            .configValue=${"show_state"}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${je("editor.show_state")}
        </p>

        <p class="option">
          <ha-switch
            aria-label=${je(this._show_attributes?"editor.show_attributes_aria_label_off":"editor.show_attributes_aria_label_on")}
            .checked=${!1!==this._show_attributes}
            .configValue=${"show_attributes"}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${je("editor.show_attributes")}
        </p>

        <p class="option">
          <ha-switch
            aria-label=${je(this._show_body?"editor.show_body_aria_label_off":"editor.show_body_aria_label_on")}
            .checked=${!1!==this._show_body}
            .configValue=${"show_body"}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${je("editor.show_body")}
        </p>

        <p class="option">
          <ha-switch
            aria-label=${je(this._show_buttons?"editor.show_buttons_aria_label_off":"editor.show_buttons_aria_label_on")}
            .checked=${!1!==this._show_buttons}
            .configValue=${"show_buttons"}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${je("editor.show_buttons")}
        </p>

        <p class="option">
          <ha-switch
            aria-label=${je(this._show_name?"editor.show_toolbar_aria_label_off":"editor.show_toolbar_aria_label_on")}
            .checked=${!1!==this._show_toolbar}
            .configValue=${"show_toolbar"}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${je("editor.show_toolbar")}
        </p>

        <strong>
          ${je("editor.code_only_note")}
        </strong>
      </div>
    `}_valueChanged(e){if(!this._config||!this.hass)return;const t=e.target;this["_"+t.configValue]!==t.value&&(t.configValue&&(""===t.value?delete this._config[t.configValue]:this._config={...this._config,[t.configValue]:void 0!==t.checked?t.checked:t.value}),me(this,"config-changed",{config:this._config}))}static get styles(){return Z`
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
    `}});var De=Z`
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
}`;customElements.get("ha-icon-button")||customElements.define("ha-icon-button",class extends(customElements.get("paper-icon-button")){});const Ie={status:{key:"status",icon:"mdi:scale-bathroom"},problem:{key:"problem",icon:"mdi:alert"}},Ue={weight:{key:"weight",label:je("attributes.Weight: "),unit:" kg"},impedance:{key:"impedance",label:je("attributes.Impedance: "),unit:" ohm"},height:{key:"height",label:je("attributes.Height: "),unit:" cm"},age:{key:"age",label:je("attributes.Age: "),unit:je("unit. years")},gender:{key:"gender",label:je("attributes.Gender: ")}},Ye={water:{key:"Water",label:je("body.Water"),icon:"file:water",unit:" %"},visceral_fat:{key:"Visceral fat",label:je("body.Visceral fat"),icon:"file:visceral_fat"},body_fat:{key:"Body fat",label:je("body.Body fat"),icon:"file:body_fat",unit:" %"},bmi:{key:"BMI",label:je("body.BMI"),icon:"file:bmi"},muscle_mass:{key:"Muscle mass",label:je("body.Muscle mass"),icon:"file:muscle_mass",unit:" kg"},protein:{key:"Protein",label:je("body.Protein"),icon:"file:protein",unit:" %"},basal_metabolism:{key:"Basal metabolism",label:je("body.Basal metabolism"),icon:"file:basal_metabolism",unit:" kcal"},bone_mass:{key:"Bone mass",label:je("body.Bone mass"),icon:"file:bone_mass",unit:" kg"},metabolic_age:{key:"Metabolic age",label:je("body.Metabolic age"),icon:"file:metabolic_age",unit:" years"},ideal:{key:"Ideal",label:je("body.Ideal"),icon:"file:ideal",unit:" kg"},body_type:{key:"Body type",label:je("body.Body type"),icon:"file:body_type"}},He={user1:{label:"User1",icon:"mdi:alpha-u-circle"},user2:{show:!1,label:"User2",icon:"mdi:alpha-u-circle"},user3:{show:!1,label:"User3",icon:"mdi:alpha-u-circle"},user4:{show:!1,label:"User4",icon:"mdi:alpha-u-circle"},user5:{show:!1,label:"User5",icon:"mdi:alpha-u-circle"}},Re={miscale:{buttons:{user1:{show:!1}},attributes:{weight:{key:"weight"},impedance:!1,height:{key:"height"},age:{key:"age"},gender:{key:"gender"}}},"181D":{state:{status:{key:"state"}},attributes:{weight:{key:"weight"},impedance:!1,height:{key:"height"},age:{key:"age"},gender:{key:"gender"}},body:{water:!1,visceral_fat:{key:"Visceral fat"},body_fat:!1,bmi:{key:"BMI"},muscle_mass:!1,protein:!1,basal_metabolism:{key:"Basal metabolism"},bone_mass:!1,metabolic_age:!1,ideal:{key:"Ideal"},body_type:{key:"Body type"}}},"181B":{state:{status:{key:"state"}},attributes:{weight:{key:"weight"},impedance:{key:"impedance"},height:{key:"height"},age:{key:"age"},gender:{key:"gender"}},body:{water:{key:"Water"},visceral_fat:{key:"Visceral fat"},body_fat:{key:"Body fat"},bmi:{key:"BMI"},muscle_mass:{key:"Muscle mass"},protein:{key:"Protein"},basal_metabolism:{key:"Basal metabolism"},bone_mass:{key:"Bone mass"},metabolic_age:{key:"Metabolic age"},ideal:{key:"Ideal"},body_type:{key:"Body type"}}}};customElements.define("body-miscale-card",class extends K{static get properties(){return{_hass:{},config:{},stateObj:{}}}static get styles(){return De}static async getConfigElement(){return document.createElement("body-miscale-card-editor")}static getStubConfig(e,t){const[s]=t.filter((e=>"bodymiscale"===e.substr(0,e.indexOf("."))));return{entity:s||""}}get entity(){return this.hass.states[this.config.entity]}get showName(){return void 0===this.config.show.name||this.config.show.name}get showState(){return void 0===this.config.show.state||this.config.show.state}get showAttributes(){return void 0===this.config.show.attributes||this.config.show.attributes}get showBody(){return void 0===this.config.show.body||this.config.show.body}get showButtons(){return void 0===this.config.show.buttons||this.config.show.buttons}get showToolbar(){return void 0===this.config.show_toolbar||this.config.show_toolbar}setConfig(e){if(!e.entity)throw new Error("Please define an entity.");if("bodymiscale"!==e.entity.split(".")[0])throw new Error("Please define a bodymiscale entity.");if(e.model&&!e.model in Re)throw new Error("Please define a valid model.");const t=Re[e.model]||Re.miscale;this.config={name:e.name,entity:e.entity,show:{name:!1!==e.show_name,state:!1!==e.show_state,body:!1!==e.show_body,attributes:!1!==e.show_attributes,buttons:!1!==e.show_buttons},buttons:this.deepMerge(He,t.buttons,e.buttons),state:this.deepMerge(Ie,t.state,e.state),body:this.deepMerge(Ye,t.body,e.body),attributes:this.deepMerge(Ue,t.attributes,e.attributes),styles:{background:e.image?`background-image: url('${e.image}'); color: white; text-shadow: 0 0 10px black;`:"",icon:`color: ${e.image?"white":"var(--paper-item-icon-color)"};`,content:`padding: ${!1!==e.name?"8px":"16px"} 16px ${!1!==e.buttons?"8px":"16px"};`}}}set hass(e){e&&this.config&&(this.stateObj=this.config.entity in e.states?e.states[this.config.entity]:null),this._hass=e}getCardSize(){return this.config.show.name&&this.config.show.buttons?4:this.config.show.name||this.config.show.buttons?3:2}shouldUpdate(e){return e.has("stateObj")}handleChange(e,t){const s=e.target.getAttribute("value");this.callService("bodymiscale.set_"+t,{entity_id:this.stateObj.entity_id,[t]:s})}callService(e,t={entity_id:this.stateObj.entity_id}){const[s,i]=e.split(".");this._hass.callService(s,i,t)}fireEvent(e,t={}){const s=new Event(e,{bubbles:t.bubbles||!0,cancelable:t.cancelable||!0,composed:t.composed||!0});s.detail={entityId:this.stateObj.entity_id},this.dispatchEvent(s)}deepMerge(...e){const t=e=>e&&"object"==typeof e,s={};return e.filter((e=>t(e))).forEach((e=>{Object.keys(e).forEach((i=>{const o=s[i],n=e[i];Array.isArray(o)&&Array.isArray(n)?s[i]=o.concat(n):t(o)&&t(n)?s[i]=this.deepMerge(Object.assign({},o),n):s[i]=n}))})),s}renderName(){return this.showName?V` <div class="title">${this.config.name||this.stateObj.attributes.friendly_name}</div> `:V``}renderState(e){if(!this.showState)return V``;const t=e.compute||(e=>e),s=e&&e.key in this.stateObj.attributes,i=e&&e.key in this.stateObj,o=s?t(this.stateObj.attributes[e.key])+(e.unit||""):i?t(this.stateObj[e.key])+(e.unit||""):this._hass.localize("state.default.unavailable"),n=V`<div>${e.icon&&this.renderIcon(e)}${(e.label||"")+je("state."+o)}</div>`;return e.key+"_list"in this.stateObj.attributes&&(s||i)?this.renderDropdown(n,e.key):n}renderAttribute(e){if(!this.showAttributes)return V``;const t=e.compute||(e=>e),s=e&&e.key in this.stateObj.attributes,i=e&&e.key in this.stateObj,o=s?t(this.stateObj.attributes[e.key])+(e.unit||""):i?t(this.stateObj[e.key])+(e.unit||""):this._hass.localize("state.default.unavailable"),n=V`<div>${e.icon&&this.renderIcon(e)}${(e.label||"")+o}</div>`;return e.key+"_list"in this.stateObj.attributes&&(s||i)?this.renderDropdown(n,e.key):n}renderBody(e){if(!this.showBody)return V``;const t=e.compute||(e=>e),s=e&&e.key in this.stateObj.attributes,i=e&&e.key in this.stateObj,o=s?t(this.stateObj.attributes[e.key])+(e.unit||""):i?t(this.stateObj[e.key])+(e.unit||""):this._hass.localize("state.default.unavailable"),n=V`<div class="score-div">
                               <div class="score-icon">
                                   ${e.icon&&this.renderIcon(e)}
                               </div>
                               <div class="score-label">
                                   ${e.label||""}
                               </div>
                               <div class="score-value">
                                   ${o}
                               </div>
                             </div>`;return e.key+"_list"in this.stateObj.attributes&&(s||i)?this.renderDropdown(n,e.key):n}renderIcon(e){const t="Water"===e.key&&"water_icon"in this.stateObj.attributes?this.stateObj.attributes.water_icon:e.icon;return V`<ha-icon icon="${t}" style="margin-right: 10px; ${this.config.styles.icon}"></ha-icon>`}renderButton(e){return this.showButtons?e&&!1!==e.show?V`<ha-icon-button
        @click="${()=>this.callService(e.service,e.service_data)}"
        icon="${e.icon}"
        title="${e.label||""}"
        style="${this.config.styles.icon}"></ha-icon-button>`:null:V``}renderDropdown(e,t){const s=this.stateObj.attributes[t],i=this.stateObj.attributes[t+"_list"];return V`
      <paper-menu-button slot="dropdown-trigger" @click="${e=>e.stopPropagation()}" style="padding: 0">
        <paper-button slot="dropdown-trigger">${e}</paper-button>
        <paper-listbox slot="dropdown-content" selected="${i.indexOf(s)}" @click="${e=>this.handleChange(e,t)}">
          ${i.map((e=>V`<paper-item value="${e}" style="text-shadow: none;">${e}</paper-item>`))}
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
              ${je("common.not_available")}
            </div>
          </div>
        </div>
      </ha-card>
    `}}),window.customCards=window.customCards||[],window.customCards.push({preview:!0,type:"body-miscale-card",name:je("common.name"),description:je("common.description")});
