(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[558],{7464:function(e,s,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/deals/[id]",function(){return a(5130)}])},5130:function(e,s,a){"use strict";a.r(s),a.d(s,{__N_SSG:function(){return y},default:function(){return b}});var l=a(5893),t=a(7294),i=a(1163),r=a(9889),n=a(529),c=a(2292),d=e=>{let{value:s,onChange:a,size:t="md"}=e,i={sm:"h-4 w-4",md:"h-6 w-6",lg:"h-8 w-8"};return(0,l.jsx)("div",{className:"flex items-center space-x-1",children:[1,2,3,4,5].map(e=>(0,l.jsx)("button",{type:"button",onClick:()=>a(e),className:"focus:outline-none",children:(0,l.jsx)(c.Z,{className:"".concat(i[t]," ").concat(e<=s?"fill-yellow-400 text-yellow-400":"fill-gray-200 text-gray-200"," transition-colors")})},e))})},x=a(354),o=a(7849);let u=t.forwardRef((e,s)=>{let{className:a,...t}=e;return(0,l.jsx)("textarea",{className:(0,o.cn)("flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",a),ref:s,...t})});u.displayName="Textarea";var h=a(8885),m=a(4960),j=e=>{let{dealId:s,onSuccess:a}=e,[i,n]=(0,t.useState)(0),[c,o]=(0,t.useState)(""),[j,v]=(0,t.useState)(!1),{user:f}=(0,h.a)(),g=async e=>{if(e.preventDefault(),f){v(!0);try{await m.W.addReview(f.uid,s,{rating:i,comment:c}),n(0),o(""),a&&a()}catch(e){console.error("Error submitting review:",e)}finally{v(!1)}}};return(0,l.jsxs)(r.Zb,{children:[(0,l.jsx)(r.Ol,{children:(0,l.jsx)(r.ll,{children:"Write a Review"})}),(0,l.jsxs)("form",{onSubmit:g,children:[(0,l.jsxs)(r.aY,{className:"space-y-4",children:[(0,l.jsxs)("div",{className:"space-y-2",children:[(0,l.jsx)("label",{className:"text-sm font-medium",children:"Rating"}),(0,l.jsx)(d,{value:i,onChange:n})]}),(0,l.jsxs)("div",{className:"space-y-2",children:[(0,l.jsx)("label",{className:"text-sm font-medium",children:"Review"}),(0,l.jsx)(u,{value:c,onChange:e=>o(e.target.value),placeholder:"Share your thoughts about this deal...",rows:4})]})]}),(0,l.jsx)(r.eW,{children:(0,l.jsx)(x.z,{type:"submit",disabled:j||!i,children:j?"Submitting...":"Submit Review"})})]})]})},v=a(3736),f=a(5333),g=a(2558),p=e=>{let{dealId:s}=e,[a,i]=(0,t.useState)([]),[n,c]=(0,t.useState)(!0);return((0,t.useEffect)(()=>{(async()=>{try{let e=await m.W.getReviews(s);i(e)}catch(e){console.error("Error loading reviews:",e)}finally{c(!1)}})()},[s]),n)?(0,l.jsx)("div",{children:"Loading reviews..."}):(0,l.jsx)(f.x,{className:"h-[400px]",children:(0,l.jsx)("div",{className:"space-y-4",children:0===a.length?(0,l.jsx)("p",{className:"text-center text-gray-500 py-4",children:"No reviews yet. Be the first to review this deal!"}):a.map(e=>(0,l.jsx)(r.Zb,{className:"p-4",children:(0,l.jsxs)("div",{className:"flex items-start space-x-4",children:[(0,l.jsxs)(v.qE,{children:[(0,l.jsx)(v.F$,{src:e.user.avatar}),(0,l.jsx)(v.Q5,{children:e.user.name[0]})]}),(0,l.jsxs)("div",{className:"flex-1",children:[(0,l.jsxs)("div",{className:"flex items-center justify-between",children:[(0,l.jsxs)("div",{children:[(0,l.jsx)("p",{className:"font-medium",children:e.user.name}),(0,l.jsx)(d,{value:e.rating,size:"sm"})]}),(0,l.jsx)("span",{className:"text-sm text-gray-500",children:(0,g.Q)(e.createdAt.toDate(),{addSuffix:!0})})]}),(0,l.jsx)("p",{className:"mt-2 text-gray-600",children:e.comment})]})]})},e.id))})})},N=e=>{let{dealId:s}=e,[a,i]=(0,t.useState)({average:0,total:0,distribution:{1:0,2:0,3:0,4:0,5:0}});return(0,t.useEffect)(()=>{(async()=>{let e=await m.W.getReviews(s),a=e.reduce((e,s)=>(e[s.rating]=(e[s.rating]||0)+1,e),{}),l=e.length;i({average:l>0?e.reduce((e,s)=>e+s.rating,0)/l:0,total:l,distribution:a})})()},[s]),(0,l.jsxs)("div",{className:"space-y-4",children:[(0,l.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,l.jsx)("div",{className:"text-4xl font-bold",children:a.average.toFixed(1)}),(0,l.jsxs)("div",{children:[(0,l.jsx)(d,{value:Math.round(a.average),size:"lg"}),(0,l.jsxs)("p",{className:"text-sm text-gray-500",children:[a.total," reviews"]})]})]}),(0,l.jsx)("div",{className:"space-y-2",children:[5,4,3,2,1].map(e=>(0,l.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,l.jsx)("span",{className:"w-4",children:e}),(0,l.jsx)(c.Z,{className:"h-4 w-4 text-yellow-400"}),(0,l.jsx)("div",{className:"flex-1 h-2 bg-gray-100 rounded-full overflow-hidden",children:(0,l.jsx)("div",{className:"h-full bg-yellow-400",style:{width:"".concat(a.distribution[e]/a.total*100||0,"%")}})}),(0,l.jsx)("span",{className:"text-sm text-gray-500",children:a.distribution[e]||0})]},e))})]})},w=a(3055),y=!0;function b(){let{id:e}=(0,i.useRouter)().query;return e?(0,l.jsx)("div",{className:"container mx-auto px-4 py-8",children:(0,l.jsx)("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-8",children:(0,l.jsxs)("div",{className:"lg:col-span-2",children:[(0,l.jsx)(w.Z,{id:e}),(0,l.jsx)(r.Zb,{className:"mt-8",children:(0,l.jsxs)(n.mQ,{defaultValue:"details",children:[(0,l.jsxs)(n.dr,{children:[(0,l.jsx)(n.SP,{value:"details",children:"Details"}),(0,l.jsx)(n.SP,{value:"reviews",children:"Reviews"})]}),(0,l.jsx)(n.nU,{value:"details",children:(0,l.jsx)(r.aY,{})}),(0,l.jsx)(n.nU,{value:"reviews",children:(0,l.jsxs)(r.aY,{className:"space-y-6",children:[(0,l.jsx)(N,{dealId:e}),(0,l.jsx)(j,{dealId:e}),(0,l.jsx)(p,{dealId:e})]})})]})})]})})}):null}}},function(e){e.O(0,[774,16,257,329,214,7,888,179],function(){return e(e.s=7464)}),_N_E=e.O()}]);