(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[46],{1163:function(e,t,n){e.exports=n(2937)},952:function(e,t,n){"use strict";n.d(t,{Ee:function(){return y},NY:function(){return I},fC:function(){return b}});var r=n(7294),a=n(5360),i=n(9698),o=n(9981),s=n(5320),l=n(5893),u="Avatar",[c,d]=(0,a.b)(u),[f,p]=c(u),g=r.forwardRef((e,t)=>{let{__scopeAvatar:n,...a}=e,[i,o]=r.useState("idle");return(0,l.jsx)(f,{scope:n,imageLoadingStatus:i,onImageLoadingStatusChange:o,children:(0,l.jsx)(s.WV.span,{...a,ref:t})})});g.displayName=u;var w="AvatarImage",m=r.forwardRef((e,t)=>{let{__scopeAvatar:n,src:a,onLoadingStatusChange:u=()=>{},...c}=e,d=p(w,n),f=function(e,t){let[n,a]=r.useState("idle");return(0,o.b)(()=>{if(!e){a("error");return}let n=!0,r=new window.Image,i=e=>()=>{n&&a(e)};return a("loading"),r.onload=i("loaded"),r.onerror=i("error"),r.src=e,t&&(r.referrerPolicy=t),()=>{n=!1}},[e,t]),n}(a,c.referrerPolicy),g=(0,i.W)(e=>{u(e),d.onImageLoadingStatusChange(e)});return(0,o.b)(()=>{"idle"!==f&&g(f)},[f,g]),"loaded"===f?(0,l.jsx)(s.WV.img,{...c,ref:t,src:a}):null});m.displayName=w;var h="AvatarFallback",v=r.forwardRef((e,t)=>{let{__scopeAvatar:n,delayMs:a,...i}=e,o=p(h,n),[u,c]=r.useState(void 0===a);return r.useEffect(()=>{if(void 0!==a){let e=window.setTimeout(()=>c(!0),a);return()=>window.clearTimeout(e)}},[a]),u&&"loaded"!==o.imageLoadingStatus?(0,l.jsx)(s.WV.span,{...i,ref:t}):null});v.displayName=h;var b=g,y=m,I=v},2854:function(e,t,n){"use strict";n.d(t,{Dx:function(){return en},VY:function(){return et},aV:function(){return ee},dk:function(){return er},fC:function(){return J},h_:function(){return Q},x8:function(){return ea},xz:function(){return Z}});var r=n(7294),a=n(6206),i=n(8771),o=n(5360),s=n(1276),l=n(7342),u=n(6063),c=n(5420),d=n(2651),f=n(9115),p=n(5320),g=n(7552),w=n(1930),m=n(3541),h=n(8426),v=n(5893),b="Dialog",[y,I]=(0,o.b)(b),[k,C]=y(b),T=e=>{let{__scopeDialog:t,children:n,open:a,defaultOpen:i,onOpenChange:o,modal:u=!0}=e,c=r.useRef(null),d=r.useRef(null),[f=!1,p]=(0,l.T)({prop:a,defaultProp:i,onChange:o});return(0,v.jsx)(k,{scope:t,triggerRef:c,contentRef:d,contentId:(0,s.M)(),titleId:(0,s.M)(),descriptionId:(0,s.M)(),open:f,onOpenChange:p,onOpenToggle:r.useCallback(()=>p(e=>!e),[p]),modal:u,children:n})};T.displayName=b;var j="DialogTrigger",S=r.forwardRef((e,t)=>{let{__scopeDialog:n,...r}=e,o=C(j,n),s=(0,i.e)(t,o.triggerRef);return(0,v.jsx)(p.WV.button,{type:"button","aria-haspopup":"dialog","aria-expanded":o.open,"aria-controls":o.contentId,"data-state":B(o.open),...r,ref:s,onClick:(0,a.M)(e.onClick,o.onOpenToggle)})});S.displayName=j;var D="DialogPortal",[x,A]=y(D,{forceMount:void 0}),R=e=>{let{__scopeDialog:t,forceMount:n,children:a,container:i}=e,o=C(D,t);return(0,v.jsx)(x,{scope:t,forceMount:n,children:r.Children.map(a,e=>(0,v.jsx)(f.z,{present:n||o.open,children:(0,v.jsx)(d.h,{asChild:!0,container:i,children:e})}))})};R.displayName=D;var M="DialogOverlay",N=r.forwardRef((e,t)=>{let n=A(M,e.__scopeDialog),{forceMount:r=n.forceMount,...a}=e,i=C(M,e.__scopeDialog);return i.modal?(0,v.jsx)(f.z,{present:r||i.open,children:(0,v.jsx)(O,{...a,ref:t})}):null});N.displayName=M;var O=r.forwardRef((e,t)=>{let{__scopeDialog:n,...r}=e,a=C(M,n);return(0,v.jsx)(w.Z,{as:h.g7,allowPinchZoom:!0,shards:[a.contentRef],children:(0,v.jsx)(p.WV.div,{"data-state":B(a.open),...r,ref:t,style:{pointerEvents:"auto",...r.style}})})}),E="DialogContent",_=r.forwardRef((e,t)=>{let n=A(E,e.__scopeDialog),{forceMount:r=n.forceMount,...a}=e,i=C(E,e.__scopeDialog);return(0,v.jsx)(f.z,{present:r||i.open,children:i.modal?(0,v.jsx)(P,{...a,ref:t}):(0,v.jsx)(F,{...a,ref:t})})});_.displayName=E;var P=r.forwardRef((e,t)=>{let n=C(E,e.__scopeDialog),o=r.useRef(null),s=(0,i.e)(t,n.contentRef,o);return r.useEffect(()=>{let e=o.current;if(e)return(0,m.Ry)(e)},[]),(0,v.jsx)(K,{...e,ref:s,trapFocus:n.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:(0,a.M)(e.onCloseAutoFocus,e=>{e.preventDefault(),n.triggerRef.current?.focus()}),onPointerDownOutside:(0,a.M)(e.onPointerDownOutside,e=>{let t=e.detail.originalEvent,n=0===t.button&&!0===t.ctrlKey;(2===t.button||n)&&e.preventDefault()}),onFocusOutside:(0,a.M)(e.onFocusOutside,e=>e.preventDefault())})}),F=r.forwardRef((e,t)=>{let n=C(E,e.__scopeDialog),a=r.useRef(!1),i=r.useRef(!1);return(0,v.jsx)(K,{...e,ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:t=>{e.onCloseAutoFocus?.(t),t.defaultPrevented||(a.current||n.triggerRef.current?.focus(),t.preventDefault()),a.current=!1,i.current=!1},onInteractOutside:t=>{e.onInteractOutside?.(t),t.defaultPrevented||(a.current=!0,"pointerdown"!==t.detail.originalEvent.type||(i.current=!0));let r=t.target;n.triggerRef.current?.contains(r)&&t.preventDefault(),"focusin"===t.detail.originalEvent.type&&i.current&&t.preventDefault()}})}),K=r.forwardRef((e,t)=>{let{__scopeDialog:n,trapFocus:a,onOpenAutoFocus:o,onCloseAutoFocus:s,...l}=e,d=C(E,n),f=r.useRef(null),p=(0,i.e)(t,f);return(0,g.EW)(),(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(c.M,{asChild:!0,loop:!0,trapped:a,onMountAutoFocus:o,onUnmountAutoFocus:s,children:(0,v.jsx)(u.XB,{role:"dialog",id:d.contentId,"aria-describedby":d.descriptionId,"aria-labelledby":d.titleId,"data-state":B(d.open),...l,ref:p,onDismiss:()=>d.onOpenChange(!1)})}),(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(X,{titleId:d.titleId}),(0,v.jsx)(Y,{contentRef:f,descriptionId:d.descriptionId})]})]})}),V="DialogTitle",$=r.forwardRef((e,t)=>{let{__scopeDialog:n,...r}=e,a=C(V,n);return(0,v.jsx)(p.WV.h2,{id:a.titleId,...r,ref:t})});$.displayName=V;var W="DialogDescription",L=r.forwardRef((e,t)=>{let{__scopeDialog:n,...r}=e,a=C(W,n);return(0,v.jsx)(p.WV.p,{id:a.descriptionId,...r,ref:t})});L.displayName=W;var q="DialogClose",H=r.forwardRef((e,t)=>{let{__scopeDialog:n,...r}=e,i=C(q,n);return(0,v.jsx)(p.WV.button,{type:"button",...r,ref:t,onClick:(0,a.M)(e.onClick,()=>i.onOpenChange(!1))})});function B(e){return e?"open":"closed"}H.displayName=q;var z="DialogTitleWarning",[U,G]=(0,o.k)(z,{contentName:E,titleName:V,docsSlug:"dialog"}),X=({titleId:e})=>{let t=G(z),n=`\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;return r.useEffect(()=>{e&&!document.getElementById(e)&&console.error(n)},[n,e]),null},Y=({contentRef:e,descriptionId:t})=>{let n=G("DialogDescriptionWarning"),a=`Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${n.contentName}}.`;return r.useEffect(()=>{let n=e.current?.getAttribute("aria-describedby");t&&n&&!document.getElementById(t)&&console.warn(a)},[a,e,t]),null},J=T,Z=S,Q=R,ee=N,et=_,en=$,er=L,ea=H},9102:function(e,t,n){"use strict";n.d(t,{f:function(){return s}});var r=n(7294),a=n(5320),i=n(5893),o=r.forwardRef((e,t)=>(0,i.jsx)(a.WV.label,{...e,ref:t,onMouseDown:t=>{t.target.closest("button, input, select, textarea")||(e.onMouseDown?.(t),!t.defaultPrevented&&t.detail>1&&t.preventDefault())}}));o.displayName="Label";var s=o},681:function(e,t,n){"use strict";n.d(t,{VY:function(){return X},aV:function(){return U},fC:function(){return z},xz:function(){return G}});var r=n(7294),a=n(6206),i=n(5360),o=n(8771),s=n(8426),l=n(5893),u=n(1276),c=n(5320),d=n(9698),f=n(7342),p=n(8990),g="rovingFocusGroup.onEntryFocus",w={bubbles:!1,cancelable:!0},m="RovingFocusGroup",[h,v,b]=function(e){let t=e+"CollectionProvider",[n,a]=(0,i.b)(t),[u,c]=n(t,{collectionRef:{current:null},itemMap:new Map}),d=e=>{let{scope:t,children:n}=e,a=r.useRef(null),i=r.useRef(new Map).current;return(0,l.jsx)(u,{scope:t,itemMap:i,collectionRef:a,children:n})};d.displayName=t;let f=e+"CollectionSlot",p=r.forwardRef((e,t)=>{let{scope:n,children:r}=e,a=c(f,n),i=(0,o.e)(t,a.collectionRef);return(0,l.jsx)(s.g7,{ref:i,children:r})});p.displayName=f;let g=e+"CollectionItemSlot",w="data-radix-collection-item",m=r.forwardRef((e,t)=>{let{scope:n,children:a,...i}=e,u=r.useRef(null),d=(0,o.e)(t,u),f=c(g,n);return r.useEffect(()=>(f.itemMap.set(u,{ref:u,...i}),()=>void f.itemMap.delete(u))),(0,l.jsx)(s.g7,{[w]:"",ref:d,children:a})});return m.displayName=g,[{Provider:d,Slot:p,ItemSlot:m},function(t){let n=c(e+"CollectionConsumer",t);return r.useCallback(()=>{let e=n.collectionRef.current;if(!e)return[];let t=Array.from(e.querySelectorAll(`[${w}]`));return Array.from(n.itemMap.values()).sort((e,n)=>t.indexOf(e.ref.current)-t.indexOf(n.ref.current))},[n.collectionRef,n.itemMap])},a]}(m),[y,I]=(0,i.b)(m,[b]),[k,C]=y(m),T=r.forwardRef((e,t)=>(0,l.jsx)(h.Provider,{scope:e.__scopeRovingFocusGroup,children:(0,l.jsx)(h.Slot,{scope:e.__scopeRovingFocusGroup,children:(0,l.jsx)(j,{...e,ref:t})})}));T.displayName=m;var j=r.forwardRef((e,t)=>{let{__scopeRovingFocusGroup:n,orientation:i,loop:s=!1,dir:u,currentTabStopId:m,defaultCurrentTabStopId:h,onCurrentTabStopIdChange:b,onEntryFocus:y,preventScrollOnEntryFocus:I=!1,...C}=e,T=r.useRef(null),j=(0,o.e)(t,T),S=(0,p.gm)(u),[D=null,x]=(0,f.T)({prop:m,defaultProp:h,onChange:b}),[R,M]=r.useState(!1),N=(0,d.W)(y),O=v(n),E=r.useRef(!1),[_,P]=r.useState(0);return r.useEffect(()=>{let e=T.current;if(e)return e.addEventListener(g,N),()=>e.removeEventListener(g,N)},[N]),(0,l.jsx)(k,{scope:n,orientation:i,dir:S,loop:s,currentTabStopId:D,onItemFocus:r.useCallback(e=>x(e),[x]),onItemShiftTab:r.useCallback(()=>M(!0),[]),onFocusableItemAdd:r.useCallback(()=>P(e=>e+1),[]),onFocusableItemRemove:r.useCallback(()=>P(e=>e-1),[]),children:(0,l.jsx)(c.WV.div,{tabIndex:R||0===_?-1:0,"data-orientation":i,...C,ref:j,style:{outline:"none",...e.style},onMouseDown:(0,a.M)(e.onMouseDown,()=>{E.current=!0}),onFocus:(0,a.M)(e.onFocus,e=>{let t=!E.current;if(e.target===e.currentTarget&&t&&!R){let t=new CustomEvent(g,w);if(e.currentTarget.dispatchEvent(t),!t.defaultPrevented){let e=O().filter(e=>e.focusable);A([e.find(e=>e.active),e.find(e=>e.id===D),...e].filter(Boolean).map(e=>e.ref.current),I)}}E.current=!1}),onBlur:(0,a.M)(e.onBlur,()=>M(!1))})})}),S="RovingFocusGroupItem",D=r.forwardRef((e,t)=>{let{__scopeRovingFocusGroup:n,focusable:i=!0,active:o=!1,tabStopId:s,...d}=e,f=(0,u.M)(),p=s||f,g=C(S,n),w=g.currentTabStopId===p,m=v(n),{onFocusableItemAdd:b,onFocusableItemRemove:y}=g;return r.useEffect(()=>{if(i)return b(),()=>y()},[i,b,y]),(0,l.jsx)(h.ItemSlot,{scope:n,id:p,focusable:i,active:o,children:(0,l.jsx)(c.WV.span,{tabIndex:w?0:-1,"data-orientation":g.orientation,...d,ref:t,onMouseDown:(0,a.M)(e.onMouseDown,e=>{i?g.onItemFocus(p):e.preventDefault()}),onFocus:(0,a.M)(e.onFocus,()=>g.onItemFocus(p)),onKeyDown:(0,a.M)(e.onKeyDown,e=>{if("Tab"===e.key&&e.shiftKey){g.onItemShiftTab();return}if(e.target!==e.currentTarget)return;let t=function(e,t,n){var r;let a=(r=e.key,"rtl"!==n?r:"ArrowLeft"===r?"ArrowRight":"ArrowRight"===r?"ArrowLeft":r);if(!("vertical"===t&&["ArrowLeft","ArrowRight"].includes(a))&&!("horizontal"===t&&["ArrowUp","ArrowDown"].includes(a)))return x[a]}(e,g.orientation,g.dir);if(void 0!==t){if(e.metaKey||e.ctrlKey||e.altKey||e.shiftKey)return;e.preventDefault();let a=m().filter(e=>e.focusable).map(e=>e.ref.current);if("last"===t)a.reverse();else if("prev"===t||"next"===t){var n,r;"prev"===t&&a.reverse();let i=a.indexOf(e.currentTarget);a=g.loop?(n=a,r=i+1,n.map((e,t)=>n[(r+t)%n.length])):a.slice(i+1)}setTimeout(()=>A(a))}})})})});D.displayName=S;var x={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function A(e,t=!1){let n=document.activeElement;for(let r of e)if(r===n||(r.focus({preventScroll:t}),document.activeElement!==n))return}var R=n(9115),M="Tabs",[N,O]=(0,i.b)(M,[I]),E=I(),[_,P]=N(M),F=r.forwardRef((e,t)=>{let{__scopeTabs:n,value:r,onValueChange:a,defaultValue:i,orientation:o="horizontal",dir:s,activationMode:d="automatic",...g}=e,w=(0,p.gm)(s),[m,h]=(0,f.T)({prop:r,onChange:a,defaultProp:i});return(0,l.jsx)(_,{scope:n,baseId:(0,u.M)(),value:m,onValueChange:h,orientation:o,dir:w,activationMode:d,children:(0,l.jsx)(c.WV.div,{dir:w,"data-orientation":o,...g,ref:t})})});F.displayName=M;var K="TabsList",V=r.forwardRef((e,t)=>{let{__scopeTabs:n,loop:r=!0,...a}=e,i=P(K,n),o=E(n);return(0,l.jsx)(T,{asChild:!0,...o,orientation:i.orientation,dir:i.dir,loop:r,children:(0,l.jsx)(c.WV.div,{role:"tablist","aria-orientation":i.orientation,...a,ref:t})})});V.displayName=K;var $="TabsTrigger",W=r.forwardRef((e,t)=>{let{__scopeTabs:n,value:r,disabled:i=!1,...o}=e,s=P($,n),u=E(n),d=H(s.baseId,r),f=B(s.baseId,r),p=r===s.value;return(0,l.jsx)(D,{asChild:!0,...u,focusable:!i,active:p,children:(0,l.jsx)(c.WV.button,{type:"button",role:"tab","aria-selected":p,"aria-controls":f,"data-state":p?"active":"inactive","data-disabled":i?"":void 0,disabled:i,id:d,...o,ref:t,onMouseDown:(0,a.M)(e.onMouseDown,e=>{i||0!==e.button||!1!==e.ctrlKey?e.preventDefault():s.onValueChange(r)}),onKeyDown:(0,a.M)(e.onKeyDown,e=>{[" ","Enter"].includes(e.key)&&s.onValueChange(r)}),onFocus:(0,a.M)(e.onFocus,()=>{let e="manual"!==s.activationMode;p||i||!e||s.onValueChange(r)})})})});W.displayName=$;var L="TabsContent",q=r.forwardRef((e,t)=>{let{__scopeTabs:n,value:a,forceMount:i,children:o,...s}=e,u=P(L,n),d=H(u.baseId,a),f=B(u.baseId,a),p=a===u.value,g=r.useRef(p);return r.useEffect(()=>{let e=requestAnimationFrame(()=>g.current=!1);return()=>cancelAnimationFrame(e)},[]),(0,l.jsx)(R.z,{present:i||p,children:({present:n})=>(0,l.jsx)(c.WV.div,{"data-state":p?"active":"inactive","data-orientation":u.orientation,role:"tabpanel","aria-labelledby":d,hidden:!n,id:f,tabIndex:0,...s,ref:t,style:{...e.style,animationDuration:g.current?"0s":void 0},children:n&&o})})});function H(e,t){return`${e}-trigger-${t}`}function B(e,t){return`${e}-content-${t}`}q.displayName=L;var z=F,U=V,G=W,X=q},2003:function(e,t,n){"use strict";n.d(t,{j:function(){return o}});var r=n(512);let a=e=>"boolean"==typeof e?`${e}`:0===e?"0":e,i=r.W,o=(e,t)=>n=>{var r;if((null==t?void 0:t.variants)==null)return i(e,null==n?void 0:n.class,null==n?void 0:n.className);let{variants:o,defaultVariants:s}=t,l=Object.keys(o).map(e=>{let t=null==n?void 0:n[e],r=null==s?void 0:s[e];if(null===t)return null;let i=a(t)||a(r);return o[e][i]}),u=n&&Object.entries(n).reduce((e,t)=>{let[n,r]=t;return void 0===r||(e[n]=r),e},{});return i(e,l,null==t?void 0:null===(r=t.compoundVariants)||void 0===r?void 0:r.reduce((e,t)=>{let{class:n,className:r,...a}=t;return Object.entries(a).every(e=>{let[t,n]=e;return Array.isArray(n)?n.includes({...s,...u}[t]):({...s,...u})[t]===n})?[...e,n,r]:e},[]),null==n?void 0:n.class,null==n?void 0:n.className)}},61:function(e,t,n){"use strict";var r,a,i,o,s=n(2238),l=n(8463),u=n(4444),c=n(6531);let d="@firebase/installations",f="0.6.9",p=`w:${f}`,g="FIS_v2",w=new u.LL("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function m(e){return e instanceof u.ZR&&e.code.includes("request-failed")}/**
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
 */function h({projectId:e}){return`https://firebaseinstallations.googleapis.com/v1/projects/${e}/installations`}function v(e){return{token:e.token,requestStatus:2,expiresIn:Number(e.expiresIn.replace("s","000")),creationTime:Date.now()}}async function b(e,t){let n=(await t.json()).error;return w.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function y({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}async function I(e){let t=await e();return t.status>=500&&t.status<600?e():t}/**
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
 */async function k({appConfig:e,heartbeatServiceProvider:t},{fid:n}){let r=h(e),a=y(e),i=t.getImmediate({optional:!0});if(i){let e=await i.getHeartbeatsHeader();e&&a.append("x-firebase-client",e)}let o={method:"POST",headers:a,body:JSON.stringify({fid:n,authVersion:g,appId:e.appId,sdkVersion:p})},s=await I(()=>fetch(r,o));if(s.ok){let e=await s.json();return{fid:e.fid||n,registrationStatus:2,refreshToken:e.refreshToken,authToken:v(e.authToken)}}throw await b("Create Installation",s)}/**
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
 */function C(e){return new Promise(t=>{setTimeout(t,e)})}/**
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
 */let T=/^[cdef][\w-]{21}$/;/**
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
 */function j(e){return`${e.appName}!${e.appId}`}/**
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
 */let S=new Map;function D(e,t){let n=j(e);x(n,t),function(e,t){let n=(!A&&"BroadcastChannel"in self&&((A=new BroadcastChannel("[Firebase] FID Change")).onmessage=e=>{x(e.data.key,e.data.fid)}),A);n&&n.postMessage({key:e,fid:t}),0===S.size&&A&&(A.close(),A=null)}(n,t)}function x(e,t){let n=S.get(e);if(n)for(let e of n)e(t)}let A=null,R="firebase-installations-store",M=null;function N(){return M||(M=(0,c.X3)("firebase-installations-database",1,{upgrade:(e,t)=>{0===t&&e.createObjectStore(R)}})),M}async function O(e,t){let n=j(e),r=(await N()).transaction(R,"readwrite"),a=r.objectStore(R),i=await a.get(n);return await a.put(t,n),await r.done,i&&i.fid===t.fid||D(e,t.fid),t}async function E(e){let t=j(e),n=(await N()).transaction(R,"readwrite");await n.objectStore(R).delete(t),await n.done}async function _(e,t){let n=j(e),r=(await N()).transaction(R,"readwrite"),a=r.objectStore(R),i=await a.get(n),o=t(i);return void 0===o?await a.delete(n):await a.put(o,n),await r.done,o&&(!i||i.fid!==o.fid)&&D(e,o.fid),o}/**
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
 */async function P(e){let t;let n=await _(e.appConfig,n=>{let r=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine)return{installationEntry:t,registrationPromise:Promise.reject(w.create("app-offline"))};let n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=F(e,n);return{installationEntry:n,registrationPromise:r}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:K(e)}:{installationEntry:t}}(e,$(n||{fid:function(){try{let e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;let t=btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_").substr(0,22);return T.test(t)?t:""}catch(e){return""}}(),registrationStatus:0}));return t=r.registrationPromise,r.installationEntry});return""===n.fid?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}async function F(e,t){try{let n=await k(e,t);return O(e.appConfig,n)}catch(n){throw m(n)&&409===n.customData.serverCode?await E(e.appConfig):await O(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}async function K(e){let t=await V(e.appConfig);for(;1===t.registrationStatus;)await C(100),t=await V(e.appConfig);if(0===t.registrationStatus){let{installationEntry:t,registrationPromise:n}=await P(e);return n||t}return t}function V(e){return _(e,e=>{if(!e)throw w.create("installation-not-found");return $(e)})}function $(e){return 1===e.registrationStatus&&e.registrationTime+1e4<Date.now()?{fid:e.fid,registrationStatus:0}:e}/**
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
 */async function W({appConfig:e,heartbeatServiceProvider:t},n){let r=function(e,{fid:t}){return`${h(e)}/${t}/authTokens:generate`}(e,n),a=function(e,{refreshToken:t}){let n=y(e);return n.append("Authorization",`${g} ${t}`),n}(e,n),i=t.getImmediate({optional:!0});if(i){let e=await i.getHeartbeatsHeader();e&&a.append("x-firebase-client",e)}let o={method:"POST",headers:a,body:JSON.stringify({installation:{sdkVersion:p,appId:e.appId}})},s=await I(()=>fetch(r,o));if(s.ok)return v(await s.json());throw await b("Generate Auth Token",s)}/**
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
 */async function L(e,t=!1){let n;let r=await _(e.appConfig,r=>{var a;if(!z(r))throw w.create("not-registered");let i=r.authToken;if(!t&&2===(a=i).requestStatus&&!function(e){let t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+36e5}(a))return r;if(1===i.requestStatus)return n=q(e,t),r;{if(!navigator.onLine)throw w.create("app-offline");let t=function(e){let t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}(r);return n=B(e,t),t}});return n?await n:r.authToken}async function q(e,t){let n=await H(e.appConfig);for(;1===n.authToken.requestStatus;)await C(100),n=await H(e.appConfig);let r=n.authToken;return 0===r.requestStatus?L(e,t):r}function H(e){return _(e,e=>{var t;if(!z(e))throw w.create("not-registered");return 1===(t=e.authToken).requestStatus&&t.requestTime+1e4<Date.now()?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function B(e,t){try{let n=await W(e,t),r=Object.assign(Object.assign({},t),{authToken:n});return await O(e.appConfig,r),n}catch(n){if(m(n)&&(401===n.customData.serverCode||404===n.customData.serverCode))await E(e.appConfig);else{let n=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await O(e.appConfig,n)}throw n}}function z(e){return void 0!==e&&2===e.registrationStatus}/**
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
 */async function U(e){let{installationEntry:t,registrationPromise:n}=await P(e);return n?n.catch(console.error):L(e).catch(console.error),t.fid}/**
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
 */async function G(e,t=!1){return await X(e),(await L(e,t)).token}async function X(e){let{registrationPromise:t}=await P(e);t&&await t}function Y(e){return w.create("missing-app-config-values",{valueName:e})}/**
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
 */let J="installations";(0,s.Xd)(new l.wA(J,e=>{let t=e.getProvider("app").getImmediate(),n=/**
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
 */function(e){if(!e||!e.options)throw Y("App Configuration");if(!e.name)throw Y("App Name");for(let t of["projectId","apiKey","appId"])if(!e.options[t])throw Y(t);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t),r=(0,s.qX)(t,"heartbeat");return{app:t,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},"PUBLIC")),(0,s.Xd)(new l.wA("installations-internal",e=>{let t=e.getProvider("app").getImmediate(),n=(0,s.qX)(t,J).getImmediate();return{getId:()=>U(n),getToken:e=>G(n,e)}},"PRIVATE")),(0,s.KN)(d,f),(0,s.KN)(d,f,"esm2017");let Z="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",Q="google.c.a.c_id";/**
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
 */function ee(e){return btoa(String.fromCharCode(...new Uint8Array(e))).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}(r=i||(i={}))[r.DATA_MESSAGE=1]="DATA_MESSAGE",r[r.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION",(a=o||(o={})).PUSH_RECEIVED="push-received",a.NOTIFICATION_CLICKED="notification-clicked";/**
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
 */let et="fcm_token_details_db",en="fcm_token_object_Store";async function er(e){if("databases"in indexedDB&&!(await indexedDB.databases()).map(e=>e.name).includes(et))return null;let t=null;return(await (0,c.X3)(et,5,{upgrade:async(n,r,a,i)=>{var o;if(r<2||!n.objectStoreNames.contains(en))return;let s=i.objectStore(en),l=await s.index("fcmSenderId").get(e);if(await s.clear(),l){if(2===r){if(!l.auth||!l.p256dh||!l.endpoint)return;t={token:l.fcmToken,createTime:null!==(o=l.createTime)&&void 0!==o?o:Date.now(),subscriptionOptions:{auth:l.auth,p256dh:l.p256dh,endpoint:l.endpoint,swScope:l.swScope,vapidKey:"string"==typeof l.vapidKey?l.vapidKey:ee(l.vapidKey)}}}else 3===r?t={token:l.fcmToken,createTime:l.createTime,subscriptionOptions:{auth:ee(l.auth),p256dh:ee(l.p256dh),endpoint:l.endpoint,swScope:l.swScope,vapidKey:ee(l.vapidKey)}}:4===r&&(t={token:l.fcmToken,createTime:l.createTime,subscriptionOptions:{auth:ee(l.auth),p256dh:ee(l.p256dh),endpoint:l.endpoint,swScope:l.swScope,vapidKey:ee(l.vapidKey)}})}}})).close(),await (0,c.Lj)(et),await (0,c.Lj)("fcm_vapid_details_db"),await (0,c.Lj)("undefined"),!function(e){if(!e||!e.subscriptionOptions)return!1;let{subscriptionOptions:t}=e;return"number"==typeof e.createTime&&e.createTime>0&&"string"==typeof e.token&&e.token.length>0&&"string"==typeof t.auth&&t.auth.length>0&&"string"==typeof t.p256dh&&t.p256dh.length>0&&"string"==typeof t.endpoint&&t.endpoint.length>0&&"string"==typeof t.swScope&&t.swScope.length>0&&"string"==typeof t.vapidKey&&t.vapidKey.length>0}(t)?null:t}let ea="firebase-messaging-store",ei=null;function eo(){return ei||(ei=(0,c.X3)("firebase-messaging-database",1,{upgrade:(e,t)=>{0===t&&e.createObjectStore(ea)}})),ei}async function es(e){let t=function({appConfig:e}){return e.appId}(e),n=await eo(),r=await n.transaction(ea).objectStore(ea).get(t);if(r)return r;{let t=await er(e.appConfig.senderId);if(t)return await el(e,t),t}}async function el(e,t){let n=function({appConfig:e}){return e.appId}(e),r=(await eo()).transaction(ea,"readwrite");return await r.objectStore(ea).put(t,n),await r.done,t}let eu=new u.LL("messaging","Messaging",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."});/**
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
 */async function ec(e,t){let n;let r={method:"POST",headers:await eg(e),body:JSON.stringify(ew(t))};try{let t=await fetch(ep(e.appConfig),r);n=await t.json()}catch(e){throw eu.create("token-subscribe-failed",{errorInfo:null==e?void 0:e.toString()})}if(n.error){let e=n.error.message;throw eu.create("token-subscribe-failed",{errorInfo:e})}if(!n.token)throw eu.create("token-subscribe-no-token");return n.token}async function ed(e,t){let n;let r={method:"PATCH",headers:await eg(e),body:JSON.stringify(ew(t.subscriptionOptions))};try{let a=await fetch(`${ep(e.appConfig)}/${t.token}`,r);n=await a.json()}catch(e){throw eu.create("token-update-failed",{errorInfo:null==e?void 0:e.toString()})}if(n.error){let e=n.error.message;throw eu.create("token-update-failed",{errorInfo:e})}if(!n.token)throw eu.create("token-update-no-token");return n.token}async function ef(e,t){let n=await eg(e);try{let r=await fetch(`${ep(e.appConfig)}/${t}`,{method:"DELETE",headers:n}),a=await r.json();if(a.error){let e=a.error.message;throw eu.create("token-unsubscribe-failed",{errorInfo:e})}}catch(e){throw eu.create("token-unsubscribe-failed",{errorInfo:null==e?void 0:e.toString()})}}function ep({projectId:e}){return`https://fcmregistrations.googleapis.com/v1/projects/${e}/registrations`}async function eg({appConfig:e,installations:t}){let n=await t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function ew({p256dh:e,auth:t,endpoint:n,vapidKey:r}){let a={web:{endpoint:n,auth:t,p256dh:e}};return r!==Z&&(a.web.applicationPubKey=r),a}async function em(e){let t=await eb(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:ee(t.getKey("auth")),p256dh:ee(t.getKey("p256dh"))},r=await es(e.firebaseDependencies);if(!r)return ev(e.firebaseDependencies,n);if(function(e,t){let n=t.vapidKey===e.vapidKey,r=t.endpoint===e.endpoint,a=t.auth===e.auth,i=t.p256dh===e.p256dh;return n&&r&&a&&i}(r.subscriptionOptions,n))return Date.now()>=r.createTime+6048e5?eh(e,{token:r.token,createTime:Date.now(),subscriptionOptions:n}):r.token;try{await ef(e.firebaseDependencies,r.token)}catch(e){console.warn(e)}return ev(e.firebaseDependencies,n)}async function eh(e,t){try{let n=await ed(e.firebaseDependencies,t),r=Object.assign(Object.assign({},t),{token:n,createTime:Date.now()});return await el(e.firebaseDependencies,r),n}catch(e){throw e}}async function ev(e,t){let n={token:await ec(e,t),createTime:Date.now(),subscriptionOptions:t};return await el(e,n),n.token}async function eb(e,t){return await e.pushManager.getSubscription()||e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:function(e){let t="=".repeat((4-e.length%4)%4),n=atob((e+t).replace(/\-/g,"+").replace(/_/g,"/")),r=new Uint8Array(n.length);for(let e=0;e<n.length;++e)r[e]=n.charCodeAt(e);return r}(t)})}/**
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
 */function ey(e){let t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return function(e,t){if(!t.notification)return;e.notification={};let n=t.notification.title;n&&(e.notification.title=n);let r=t.notification.body;r&&(e.notification.body=r);let a=t.notification.image;a&&(e.notification.image=a);let i=t.notification.icon;i&&(e.notification.icon=i)}(t,e),e.data&&(t.data=e.data),function(e,t){var n,r,a,i,o;if(!t.fcmOptions&&!(null===(n=t.notification)||void 0===n?void 0:n.click_action))return;e.fcmOptions={};let s=null!==(a=null===(r=t.fcmOptions)||void 0===r?void 0:r.link)&&void 0!==a?a:null===(i=t.notification)||void 0===i?void 0:i.click_action;s&&(e.fcmOptions.link=s);let l=null===(o=t.fcmOptions)||void 0===o?void 0:o.analytics_label;l&&(e.fcmOptions.analyticsLabel=l)}(t,e),t}function eI(e){return eu.create("missing-app-config-values",{valueName:e})}!/**
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
 */function(e,t){let n=[];for(let r=0;r<e.length;r++)n.push(e.charAt(r)),r<t.length&&n.push(t.charAt(r));n.join("")}("AzSCbw63g1R0nCw85jG8","Iaya3yLKwmgvh7cF0q4");/**
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
 */class ek{constructor(e,t,n){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;let r=/**
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
 */function(e){if(!e||!e.options)throw eI("App Configuration Object");if(!e.name)throw eI("App Name");let{options:t}=e;for(let e of["projectId","apiKey","appId","messagingSenderId"])if(!t[e])throw eI(e);return{appName:e.name,projectId:t.projectId,apiKey:t.apiKey,appId:t.appId,senderId:t.messagingSenderId}}(e);this.firebaseDependencies={app:e,appConfig:r,installations:t,analyticsProvider:n}}_delete(){return Promise.resolve()}}/**
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
 */async function eC(e){try{e.swRegistration=await navigator.serviceWorker.register("/firebase-messaging-sw.js",{scope:"/firebase-cloud-messaging-push-scope"}),e.swRegistration.update().catch(()=>{})}catch(e){throw eu.create("failed-service-worker-registration",{browserErrorMessage:null==e?void 0:e.message})}}/**
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
 */async function eT(e,t){if(t||e.swRegistration||await eC(e),t||!e.swRegistration){if(!(t instanceof ServiceWorkerRegistration))throw eu.create("invalid-sw-registration");e.swRegistration=t}}/**
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
 */async function ej(e,t){t?e.vapidKey=t:e.vapidKey||(e.vapidKey=Z)}/**
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
 */async function eS(e,t){if(!navigator)throw eu.create("only-available-in-window");if("default"===Notification.permission&&await Notification.requestPermission(),"granted"!==Notification.permission)throw eu.create("permission-blocked");return await ej(e,null==t?void 0:t.vapidKey),await eT(e,null==t?void 0:t.serviceWorkerRegistration),em(e)}/**
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
 */async function eD(e,t,n){let r=function(e){switch(e){case o.NOTIFICATION_CLICKED:return"notification_open";case o.PUSH_RECEIVED:return"notification_foreground";default:throw Error()}}(t);(await e.firebaseDependencies.analyticsProvider.get()).logEvent(r,{message_id:n[Q],message_name:n["google.c.a.c_l"],message_time:n["google.c.a.ts"],message_device_time:Math.floor(Date.now()/1e3)})}/**
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
 */async function ex(e,t){let n=t.data;if(!n.isFirebaseMessaging)return;e.onMessageHandler&&n.messageType===o.PUSH_RECEIVED&&("function"==typeof e.onMessageHandler?e.onMessageHandler(ey(n)):e.onMessageHandler.next(ey(n)));let r=n.data;"object"==typeof r&&r&&Q in r&&"1"===r["google.c.a.e"]&&await eD(e,n.messageType,r)}let eA="@firebase/messaging",eR="0.12.12";(0,s.Xd)(new l.wA("messaging",e=>{let t=new ek(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",e=>ex(t,e)),t},"PUBLIC")),(0,s.Xd)(new l.wA("messaging-internal",e=>{let t=e.getProvider("messaging").getImmediate();return{getToken:e=>eS(t,e)}},"PRIVATE")),(0,s.KN)(eA,eR),(0,s.KN)(eA,eR,"esm2017")}}]);