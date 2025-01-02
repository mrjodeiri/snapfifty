"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[133],{2854:function(e,t,n){n.d(t,{Dx:function(){return en},VY:function(){return et},aV:function(){return ee},dk:function(){return ei},fC:function(){return Y},h_:function(){return Q},x8:function(){return ea},xz:function(){return Z}});var i=n(7294),a=n(6206),r=n(8771),o=n(5360),s=n(1276),l=n(7342),u=n(6063),c=n(5420),d=n(2651),f=n(9115),p=n(5320),g=n(7552),w=n(1930),h=n(3541),m=n(8426),b=n(5893),y="Dialog",[v,k]=(0,o.b)(y),[I,T]=v(y),S=e=>{let{__scopeDialog:t,children:n,open:a,defaultOpen:r,onOpenChange:o,modal:u=!0}=e,c=i.useRef(null),d=i.useRef(null),[f=!1,p]=(0,l.T)({prop:a,defaultProp:r,onChange:o});return(0,b.jsx)(I,{scope:t,triggerRef:c,contentRef:d,contentId:(0,s.M)(),titleId:(0,s.M)(),descriptionId:(0,s.M)(),open:f,onOpenChange:p,onOpenToggle:i.useCallback(()=>p(e=>!e),[p]),modal:u,children:n})};S.displayName=y;var C="DialogTrigger",j=i.forwardRef((e,t)=>{let{__scopeDialog:n,...i}=e,o=T(C,n),s=(0,r.e)(t,o.triggerRef);return(0,b.jsx)(p.WV.button,{type:"button","aria-haspopup":"dialog","aria-expanded":o.open,"aria-controls":o.contentId,"data-state":B(o.open),...i,ref:s,onClick:(0,a.M)(e.onClick,o.onOpenToggle)})});j.displayName=C;var D="DialogPortal",[O,_]=v(D,{forceMount:void 0}),A=e=>{let{__scopeDialog:t,forceMount:n,children:a,container:r}=e,o=T(D,t);return(0,b.jsx)(O,{scope:t,forceMount:n,children:i.Children.map(a,e=>(0,b.jsx)(f.z,{present:n||o.open,children:(0,b.jsx)(d.h,{asChild:!0,container:r,children:e})}))})};A.displayName=D;var N="DialogOverlay",x=i.forwardRef((e,t)=>{let n=_(N,e.__scopeDialog),{forceMount:i=n.forceMount,...a}=e,r=T(N,e.__scopeDialog);return r.modal?(0,b.jsx)(f.z,{present:i||r.open,children:(0,b.jsx)(M,{...a,ref:t})}):null});x.displayName=N;var M=i.forwardRef((e,t)=>{let{__scopeDialog:n,...i}=e,a=T(N,n);return(0,b.jsx)(w.Z,{as:m.g7,allowPinchZoom:!0,shards:[a.contentRef],children:(0,b.jsx)(p.WV.div,{"data-state":B(a.open),...i,ref:t,style:{pointerEvents:"auto",...i.style}})})}),E="DialogContent",P=i.forwardRef((e,t)=>{let n=_(E,e.__scopeDialog),{forceMount:i=n.forceMount,...a}=e,r=T(E,e.__scopeDialog);return(0,b.jsx)(f.z,{present:i||r.open,children:r.modal?(0,b.jsx)(R,{...a,ref:t}):(0,b.jsx)(K,{...a,ref:t})})});P.displayName=E;var R=i.forwardRef((e,t)=>{let n=T(E,e.__scopeDialog),o=i.useRef(null),s=(0,r.e)(t,n.contentRef,o);return i.useEffect(()=>{let e=o.current;if(e)return(0,h.Ry)(e)},[]),(0,b.jsx)(F,{...e,ref:s,trapFocus:n.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:(0,a.M)(e.onCloseAutoFocus,e=>{e.preventDefault(),n.triggerRef.current?.focus()}),onPointerDownOutside:(0,a.M)(e.onPointerDownOutside,e=>{let t=e.detail.originalEvent,n=0===t.button&&!0===t.ctrlKey;(2===t.button||n)&&e.preventDefault()}),onFocusOutside:(0,a.M)(e.onFocusOutside,e=>e.preventDefault())})}),K=i.forwardRef((e,t)=>{let n=T(E,e.__scopeDialog),a=i.useRef(!1),r=i.useRef(!1);return(0,b.jsx)(F,{...e,ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:t=>{e.onCloseAutoFocus?.(t),t.defaultPrevented||(a.current||n.triggerRef.current?.focus(),t.preventDefault()),a.current=!1,r.current=!1},onInteractOutside:t=>{e.onInteractOutside?.(t),t.defaultPrevented||(a.current=!0,"pointerdown"!==t.detail.originalEvent.type||(r.current=!0));let i=t.target;n.triggerRef.current?.contains(i)&&t.preventDefault(),"focusin"===t.detail.originalEvent.type&&r.current&&t.preventDefault()}})}),F=i.forwardRef((e,t)=>{let{__scopeDialog:n,trapFocus:a,onOpenAutoFocus:o,onCloseAutoFocus:s,...l}=e,d=T(E,n),f=i.useRef(null),p=(0,r.e)(t,f);return(0,g.EW)(),(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(c.M,{asChild:!0,loop:!0,trapped:a,onMountAutoFocus:o,onUnmountAutoFocus:s,children:(0,b.jsx)(u.XB,{role:"dialog",id:d.contentId,"aria-describedby":d.descriptionId,"aria-labelledby":d.titleId,"data-state":B(d.open),...l,ref:p,onDismiss:()=>d.onOpenChange(!1)})}),(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(G,{titleId:d.titleId}),(0,b.jsx)(J,{contentRef:f,descriptionId:d.descriptionId})]})]})}),$="DialogTitle",q=i.forwardRef((e,t)=>{let{__scopeDialog:n,...i}=e,a=T($,n);return(0,b.jsx)(p.WV.h2,{id:a.titleId,...i,ref:t})});q.displayName=$;var V="DialogDescription",L=i.forwardRef((e,t)=>{let{__scopeDialog:n,...i}=e,a=T(V,n);return(0,b.jsx)(p.WV.p,{id:a.descriptionId,...i,ref:t})});L.displayName=V;var W="DialogClose",H=i.forwardRef((e,t)=>{let{__scopeDialog:n,...i}=e,r=T(W,n);return(0,b.jsx)(p.WV.button,{type:"button",...i,ref:t,onClick:(0,a.M)(e.onClick,()=>r.onOpenChange(!1))})});function B(e){return e?"open":"closed"}H.displayName=W;var X="DialogTitleWarning",[U,z]=(0,o.k)(X,{contentName:E,titleName:$,docsSlug:"dialog"}),G=({titleId:e})=>{let t=z(X),n=`\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;return i.useEffect(()=>{e&&!document.getElementById(e)&&console.error(n)},[n,e]),null},J=({contentRef:e,descriptionId:t})=>{let n=z("DialogDescriptionWarning"),a=`Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${n.contentName}}.`;return i.useEffect(()=>{let n=e.current?.getAttribute("aria-describedby");t&&n&&!document.getElementById(t)&&console.warn(a)},[a,e,t]),null},Y=S,Z=j,Q=A,ee=x,et=P,en=q,ei=L,ea=H},9102:function(e,t,n){n.d(t,{f:function(){return s}});var i=n(7294),a=n(5320),r=n(5893),o=i.forwardRef((e,t)=>(0,r.jsx)(a.WV.label,{...e,ref:t,onMouseDown:t=>{t.target.closest("button, input, select, textarea")||(e.onMouseDown?.(t),!t.defaultPrevented&&t.detail>1&&t.preventDefault())}}));o.displayName="Label";var s=o},2003:function(e,t,n){n.d(t,{j:function(){return o}});var i=n(512);let a=e=>"boolean"==typeof e?`${e}`:0===e?"0":e,r=i.W,o=(e,t)=>n=>{var i;if((null==t?void 0:t.variants)==null)return r(e,null==n?void 0:n.class,null==n?void 0:n.className);let{variants:o,defaultVariants:s}=t,l=Object.keys(o).map(e=>{let t=null==n?void 0:n[e],i=null==s?void 0:s[e];if(null===t)return null;let r=a(t)||a(i);return o[e][r]}),u=n&&Object.entries(n).reduce((e,t)=>{let[n,i]=t;return void 0===i||(e[n]=i),e},{});return r(e,l,null==t?void 0:null===(i=t.compoundVariants)||void 0===i?void 0:i.reduce((e,t)=>{let{class:n,className:i,...a}=t;return Object.entries(a).every(e=>{let[t,n]=e;return Array.isArray(n)?n.includes({...s,...u}[t]):({...s,...u})[t]===n})?[...e,n,i]:e},[]),null==n?void 0:n.class,null==n?void 0:n.className)}},61:function(e,t,n){var i,a,r,o,s=n(2238),l=n(8463),u=n(4444),c=n(6531);let d="@firebase/installations",f="0.6.9",p=`w:${f}`,g="FIS_v2",w=new u.LL("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function h(e){return e instanceof u.ZR&&e.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function m({projectId:e}){return`https://firebaseinstallations.googleapis.com/v1/projects/${e}/installations`}function b(e){return{token:e.token,requestStatus:2,expiresIn:Number(e.expiresIn.replace("s","000")),creationTime:Date.now()}}async function y(e,t){let n=(await t.json()).error;return w.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function v({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}async function k(e){let t=await e();return t.status>=500&&t.status<600?e():t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function I({appConfig:e,heartbeatServiceProvider:t},{fid:n}){let i=m(e),a=v(e),r=t.getImmediate({optional:!0});if(r){let e=await r.getHeartbeatsHeader();e&&a.append("x-firebase-client",e)}let o={method:"POST",headers:a,body:JSON.stringify({fid:n,authVersion:g,appId:e.appId,sdkVersion:p})},s=await k(()=>fetch(i,o));if(s.ok){let e=await s.json();return{fid:e.fid||n,registrationStatus:2,refreshToken:e.refreshToken,authToken:b(e.authToken)}}throw await y("Create Installation",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function T(e){return new Promise(t=>{setTimeout(t,e)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let S=/^[cdef][\w-]{21}$/;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function C(e){return`${e.appName}!${e.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let j=new Map;function D(e,t){let n=C(e);O(n,t),function(e,t){let n=(!_&&"BroadcastChannel"in self&&((_=new BroadcastChannel("[Firebase] FID Change")).onmessage=e=>{O(e.data.key,e.data.fid)}),_);n&&n.postMessage({key:e,fid:t}),0===j.size&&_&&(_.close(),_=null)}(n,t)}function O(e,t){let n=j.get(e);if(n)for(let e of n)e(t)}let _=null,A="firebase-installations-store",N=null;function x(){return N||(N=(0,c.X3)("firebase-installations-database",1,{upgrade:(e,t)=>{0===t&&e.createObjectStore(A)}})),N}async function M(e,t){let n=C(e),i=(await x()).transaction(A,"readwrite"),a=i.objectStore(A),r=await a.get(n);return await a.put(t,n),await i.done,r&&r.fid===t.fid||D(e,t.fid),t}async function E(e){let t=C(e),n=(await x()).transaction(A,"readwrite");await n.objectStore(A).delete(t),await n.done}async function P(e,t){let n=C(e),i=(await x()).transaction(A,"readwrite"),a=i.objectStore(A),r=await a.get(n),o=t(r);return void 0===o?await a.delete(n):await a.put(o,n),await i.done,o&&(!r||r.fid!==o.fid)&&D(e,o.fid),o}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function R(e){let t;let n=await P(e.appConfig,n=>{let i=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine)return{installationEntry:t,registrationPromise:Promise.reject(w.create("app-offline"))};let n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},i=K(e,n);return{installationEntry:n,registrationPromise:i}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:F(e)}:{installationEntry:t}}(e,q(n||{fid:function(){try{let e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;let t=btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_").substr(0,22);return S.test(t)?t:""}catch(e){return""}}(),registrationStatus:0}));return t=i.registrationPromise,i.installationEntry});return""===n.fid?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}async function K(e,t){try{let n=await I(e,t);return M(e.appConfig,n)}catch(n){throw h(n)&&409===n.customData.serverCode?await E(e.appConfig):await M(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}async function F(e){let t=await $(e.appConfig);for(;1===t.registrationStatus;)await T(100),t=await $(e.appConfig);if(0===t.registrationStatus){let{installationEntry:t,registrationPromise:n}=await R(e);return n||t}return t}function $(e){return P(e,e=>{if(!e)throw w.create("installation-not-found");return q(e)})}function q(e){return 1===e.registrationStatus&&e.registrationTime+1e4<Date.now()?{fid:e.fid,registrationStatus:0}:e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function V({appConfig:e,heartbeatServiceProvider:t},n){let i=function(e,{fid:t}){return`${m(e)}/${t}/authTokens:generate`}(e,n),a=function(e,{refreshToken:t}){let n=v(e);return n.append("Authorization",`${g} ${t}`),n}(e,n),r=t.getImmediate({optional:!0});if(r){let e=await r.getHeartbeatsHeader();e&&a.append("x-firebase-client",e)}let o={method:"POST",headers:a,body:JSON.stringify({installation:{sdkVersion:p,appId:e.appId}})},s=await k(()=>fetch(i,o));if(s.ok)return b(await s.json());throw await y("Generate Auth Token",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function L(e,t=!1){let n;let i=await P(e.appConfig,i=>{var a;if(!X(i))throw w.create("not-registered");let r=i.authToken;if(!t&&2===(a=r).requestStatus&&!function(e){let t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+36e5}(a))return i;if(1===r.requestStatus)return n=W(e,t),i;{if(!navigator.onLine)throw w.create("app-offline");let t=function(e){let t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}(i);return n=B(e,t),t}});return n?await n:i.authToken}async function W(e,t){let n=await H(e.appConfig);for(;1===n.authToken.requestStatus;)await T(100),n=await H(e.appConfig);let i=n.authToken;return 0===i.requestStatus?L(e,t):i}function H(e){return P(e,e=>{var t;if(!X(e))throw w.create("not-registered");return 1===(t=e.authToken).requestStatus&&t.requestTime+1e4<Date.now()?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function B(e,t){try{let n=await V(e,t),i=Object.assign(Object.assign({},t),{authToken:n});return await M(e.appConfig,i),n}catch(n){if(h(n)&&(401===n.customData.serverCode||404===n.customData.serverCode))await E(e.appConfig);else{let n=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await M(e.appConfig,n)}throw n}}function X(e){return void 0!==e&&2===e.registrationStatus}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function U(e){let{installationEntry:t,registrationPromise:n}=await R(e);return n?n.catch(console.error):L(e).catch(console.error),t.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function z(e,t=!1){return await G(e),(await L(e,t)).token}async function G(e){let{registrationPromise:t}=await R(e);t&&await t}function J(e){return w.create("missing-app-config-values",{valueName:e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Y="installations";(0,s.Xd)(new l.wA(Y,e=>{let t=e.getProvider("app").getImmediate(),n=/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){if(!e||!e.options)throw J("App Configuration");if(!e.name)throw J("App Name");for(let t of["projectId","apiKey","appId"])if(!e.options[t])throw J(t);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t),i=(0,s.qX)(t,"heartbeat");return{app:t,appConfig:n,heartbeatServiceProvider:i,_delete:()=>Promise.resolve()}},"PUBLIC")),(0,s.Xd)(new l.wA("installations-internal",e=>{let t=e.getProvider("app").getImmediate(),n=(0,s.qX)(t,Y).getImmediate();return{getId:()=>U(n),getToken:e=>z(n,e)}},"PRIVATE")),(0,s.KN)(d,f),(0,s.KN)(d,f,"esm2017");let Z="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",Q="google.c.a.c_id";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ee(e){return btoa(String.fromCharCode(...new Uint8Array(e))).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}(i=r||(r={}))[i.DATA_MESSAGE=1]="DATA_MESSAGE",i[i.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION",(a=o||(o={})).PUSH_RECEIVED="push-received",a.NOTIFICATION_CLICKED="notification-clicked";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let et="fcm_token_details_db",en="fcm_token_object_Store";async function ei(e){if("databases"in indexedDB&&!(await indexedDB.databases()).map(e=>e.name).includes(et))return null;let t=null;return(await (0,c.X3)(et,5,{upgrade:async(n,i,a,r)=>{var o;if(i<2||!n.objectStoreNames.contains(en))return;let s=r.objectStore(en),l=await s.index("fcmSenderId").get(e);if(await s.clear(),l){if(2===i){if(!l.auth||!l.p256dh||!l.endpoint)return;t={token:l.fcmToken,createTime:null!==(o=l.createTime)&&void 0!==o?o:Date.now(),subscriptionOptions:{auth:l.auth,p256dh:l.p256dh,endpoint:l.endpoint,swScope:l.swScope,vapidKey:"string"==typeof l.vapidKey?l.vapidKey:ee(l.vapidKey)}}}else 3===i?t={token:l.fcmToken,createTime:l.createTime,subscriptionOptions:{auth:ee(l.auth),p256dh:ee(l.p256dh),endpoint:l.endpoint,swScope:l.swScope,vapidKey:ee(l.vapidKey)}}:4===i&&(t={token:l.fcmToken,createTime:l.createTime,subscriptionOptions:{auth:ee(l.auth),p256dh:ee(l.p256dh),endpoint:l.endpoint,swScope:l.swScope,vapidKey:ee(l.vapidKey)}})}}})).close(),await (0,c.Lj)(et),await (0,c.Lj)("fcm_vapid_details_db"),await (0,c.Lj)("undefined"),!function(e){if(!e||!e.subscriptionOptions)return!1;let{subscriptionOptions:t}=e;return"number"==typeof e.createTime&&e.createTime>0&&"string"==typeof e.token&&e.token.length>0&&"string"==typeof t.auth&&t.auth.length>0&&"string"==typeof t.p256dh&&t.p256dh.length>0&&"string"==typeof t.endpoint&&t.endpoint.length>0&&"string"==typeof t.swScope&&t.swScope.length>0&&"string"==typeof t.vapidKey&&t.vapidKey.length>0}(t)?null:t}let ea="firebase-messaging-store",er=null;function eo(){return er||(er=(0,c.X3)("firebase-messaging-database",1,{upgrade:(e,t)=>{0===t&&e.createObjectStore(ea)}})),er}async function es(e){let t=function({appConfig:e}){return e.appId}(e),n=await eo(),i=await n.transaction(ea).objectStore(ea).get(t);if(i)return i;{let t=await ei(e.appConfig.senderId);if(t)return await el(e,t),t}}async function el(e,t){let n=function({appConfig:e}){return e.appId}(e),i=(await eo()).transaction(ea,"readwrite");return await i.objectStore(ea).put(t,n),await i.done,t}let eu=new u.LL("messaging","Messaging",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."});/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ec(e,t){let n;let i={method:"POST",headers:await eg(e),body:JSON.stringify(ew(t))};try{let t=await fetch(ep(e.appConfig),i);n=await t.json()}catch(e){throw eu.create("token-subscribe-failed",{errorInfo:null==e?void 0:e.toString()})}if(n.error){let e=n.error.message;throw eu.create("token-subscribe-failed",{errorInfo:e})}if(!n.token)throw eu.create("token-subscribe-no-token");return n.token}async function ed(e,t){let n;let i={method:"PATCH",headers:await eg(e),body:JSON.stringify(ew(t.subscriptionOptions))};try{let a=await fetch(`${ep(e.appConfig)}/${t.token}`,i);n=await a.json()}catch(e){throw eu.create("token-update-failed",{errorInfo:null==e?void 0:e.toString()})}if(n.error){let e=n.error.message;throw eu.create("token-update-failed",{errorInfo:e})}if(!n.token)throw eu.create("token-update-no-token");return n.token}async function ef(e,t){let n=await eg(e);try{let i=await fetch(`${ep(e.appConfig)}/${t}`,{method:"DELETE",headers:n}),a=await i.json();if(a.error){let e=a.error.message;throw eu.create("token-unsubscribe-failed",{errorInfo:e})}}catch(e){throw eu.create("token-unsubscribe-failed",{errorInfo:null==e?void 0:e.toString()})}}function ep({projectId:e}){return`https://fcmregistrations.googleapis.com/v1/projects/${e}/registrations`}async function eg({appConfig:e,installations:t}){let n=await t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function ew({p256dh:e,auth:t,endpoint:n,vapidKey:i}){let a={web:{endpoint:n,auth:t,p256dh:e}};return i!==Z&&(a.web.applicationPubKey=i),a}async function eh(e){let t=await ey(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:ee(t.getKey("auth")),p256dh:ee(t.getKey("p256dh"))},i=await es(e.firebaseDependencies);if(!i)return eb(e.firebaseDependencies,n);if(function(e,t){let n=t.vapidKey===e.vapidKey,i=t.endpoint===e.endpoint,a=t.auth===e.auth,r=t.p256dh===e.p256dh;return n&&i&&a&&r}(i.subscriptionOptions,n))return Date.now()>=i.createTime+6048e5?em(e,{token:i.token,createTime:Date.now(),subscriptionOptions:n}):i.token;try{await ef(e.firebaseDependencies,i.token)}catch(e){console.warn(e)}return eb(e.firebaseDependencies,n)}async function em(e,t){try{let n=await ed(e.firebaseDependencies,t),i=Object.assign(Object.assign({},t),{token:n,createTime:Date.now()});return await el(e.firebaseDependencies,i),n}catch(e){throw e}}async function eb(e,t){let n={token:await ec(e,t),createTime:Date.now(),subscriptionOptions:t};return await el(e,n),n.token}async function ey(e,t){return await e.pushManager.getSubscription()||e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:function(e){let t="=".repeat((4-e.length%4)%4),n=atob((e+t).replace(/\-/g,"+").replace(/_/g,"/")),i=new Uint8Array(n.length);for(let e=0;e<n.length;++e)i[e]=n.charCodeAt(e);return i}(t)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ev(e){let t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return function(e,t){if(!t.notification)return;e.notification={};let n=t.notification.title;n&&(e.notification.title=n);let i=t.notification.body;i&&(e.notification.body=i);let a=t.notification.image;a&&(e.notification.image=a);let r=t.notification.icon;r&&(e.notification.icon=r)}(t,e),e.data&&(t.data=e.data),function(e,t){var n,i,a,r,o;if(!t.fcmOptions&&!(null===(n=t.notification)||void 0===n?void 0:n.click_action))return;e.fcmOptions={};let s=null!==(a=null===(i=t.fcmOptions)||void 0===i?void 0:i.link)&&void 0!==a?a:null===(r=t.notification)||void 0===r?void 0:r.click_action;s&&(e.fcmOptions.link=s);let l=null===(o=t.fcmOptions)||void 0===o?void 0:o.analytics_label;l&&(e.fcmOptions.analyticsLabel=l)}(t,e),t}function ek(e){return eu.create("missing-app-config-values",{valueName:e})}!/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e,t){let n=[];for(let i=0;i<e.length;i++)n.push(e.charAt(i)),i<t.length&&n.push(t.charAt(i));n.join("")}("AzSCbw63g1R0nCw85jG8","Iaya3yLKwmgvh7cF0q4");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eI{constructor(e,t,n){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;let i=/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){if(!e||!e.options)throw ek("App Configuration Object");if(!e.name)throw ek("App Name");let{options:t}=e;for(let e of["projectId","apiKey","appId","messagingSenderId"])if(!t[e])throw ek(e);return{appName:e.name,projectId:t.projectId,apiKey:t.apiKey,appId:t.appId,senderId:t.messagingSenderId}}(e);this.firebaseDependencies={app:e,appConfig:i,installations:t,analyticsProvider:n}}_delete(){return Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eT(e){try{e.swRegistration=await navigator.serviceWorker.register("/firebase-messaging-sw.js",{scope:"/firebase-cloud-messaging-push-scope"}),e.swRegistration.update().catch(()=>{})}catch(e){throw eu.create("failed-service-worker-registration",{browserErrorMessage:null==e?void 0:e.message})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eS(e,t){if(t||e.swRegistration||await eT(e),t||!e.swRegistration){if(!(t instanceof ServiceWorkerRegistration))throw eu.create("invalid-sw-registration");e.swRegistration=t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eC(e,t){t?e.vapidKey=t:e.vapidKey||(e.vapidKey=Z)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ej(e,t){if(!navigator)throw eu.create("only-available-in-window");if("default"===Notification.permission&&await Notification.requestPermission(),"granted"!==Notification.permission)throw eu.create("permission-blocked");return await eC(e,null==t?void 0:t.vapidKey),await eS(e,null==t?void 0:t.serviceWorkerRegistration),eh(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eD(e,t,n){let i=function(e){switch(e){case o.NOTIFICATION_CLICKED:return"notification_open";case o.PUSH_RECEIVED:return"notification_foreground";default:throw Error()}}(t);(await e.firebaseDependencies.analyticsProvider.get()).logEvent(i,{message_id:n[Q],message_name:n["google.c.a.c_l"],message_time:n["google.c.a.ts"],message_device_time:Math.floor(Date.now()/1e3)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eO(e,t){let n=t.data;if(!n.isFirebaseMessaging)return;e.onMessageHandler&&n.messageType===o.PUSH_RECEIVED&&("function"==typeof e.onMessageHandler?e.onMessageHandler(ev(n)):e.onMessageHandler.next(ev(n)));let i=n.data;"object"==typeof i&&i&&Q in i&&"1"===i["google.c.a.e"]&&await eD(e,n.messageType,i)}let e_="@firebase/messaging",eA="0.12.12";(0,s.Xd)(new l.wA("messaging",e=>{let t=new eI(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",e=>eO(t,e)),t},"PUBLIC")),(0,s.Xd)(new l.wA("messaging-internal",e=>{let t=e.getProvider("messaging").getImmediate();return{getToken:e=>ej(t,e)}},"PRIVATE")),(0,s.KN)(e_,eA),(0,s.KN)(e_,eA,"esm2017")}}]);