import{r as a,R as x}from"./index.8365acb2.js";/* empty css                             */import{R as v,r as f,a as g,b as j,c as N,d as w}from"./index.921e6a26.js";import{T as y}from"./toc.47971879.js";import{L as T}from"./loader.c16b27e6.js";import{j as e}from"./jsx-runtime.7d759e48.js";import"./index.fafcc216.js";/* empty css                             *//* empty css                             */function _(m){const c=[],l=m.url;let n=0;const o=r=>{const s=r.children[0],t=Number(r.node.tagName.match(/h(\d)/)?.slice(1));if(t&&s&&typeof s[0]=="string"){const i=s.toLowerCase().replace(/[^a-z0-9]+/g,"-")+n;return n++,c.push({level:t,id:i,title:s}),x.createElement(r.node.tagName,{id:i},s)}},[h,d]=a.useState(""),[p,u]=a.useState(!1);return a.useEffect(()=>{(async()=>{const t=await(await fetch(l)).text();d(t),u(!0)})()},[l]),p?e.jsxs("div",{className:"columns is-centered",children:[e.jsx("div",{className:"readme-box column is-8",style:{overflowY:"scroll",height:"93vh",scrollBehavior:"smooth",scrollMarginTop:"100px"},children:e.jsx("div",{className:"content",children:e.jsx(v,{children:h,rehypePlugins:[f],remarkPlugins:[g,j,N,w],components:{h2:o,h3:o,h4:o,h5:o,h6:o}})})}),e.jsx("div",{className:"column is-narrow"}),e.jsx("div",{className:"readme-box column is-3 ",style:{overflowY:"scroll",height:"93vh",scrollBehavior:"smooth",scrollMarginTop:"100px"},children:e.jsx(y,{toc:c})})]}):e.jsx("div",{className:"columns",children:e.jsx("div",{className:"readme-box column is-8 ",style:{overflowY:"scroll",height:"97vh",scrollBehavior:"smooth",scrollMarginTop:"100px"},children:e.jsx(T,{})})})}export{_ as Devcontent};
