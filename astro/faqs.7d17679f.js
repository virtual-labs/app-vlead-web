import{c as ut,g as lt,r as U}from"./index.8365acb2.js";import{R as nt,r as ot,a as at,b as rt,c as it,d as st}from"./index.921e6a26.js";import{L as dt}from"./loader.c16b27e6.js";/* empty css                             */import{j as _}from"./jsx-runtime.7d759e48.js";import"./index.fafcc216.js";/* empty css                             */var ct={exports:{}};(function(X,tt){(function(w,c){X.exports=c()})(ut,function(){return function(w){function c(n){if(a[n])return a[n].exports;var u=a[n]={exports:{},id:n,loaded:!1};return w[n].call(u.exports,u,u.exports,c),u.loaded=!0,u.exports}var a={};return c.m=w,c.c=a,c.p="dist/",c(0)}([function(w,c,a){function n(i){return i&&i.__esModule?i:{default:i}}var u=Object.assign||function(i){for(var q=1;q<arguments.length;q++){var P=arguments[q];for(var W in P)Object.prototype.hasOwnProperty.call(P,W)&&(i[W]=P[W])}return i},v=a(1),g=(n(v),a(6)),r=n(g),l=a(7),o=n(l),s=a(8),d=n(s),b=a(9),O=n(b),S=a(10),Y=n(S),K=a(11),D=n(K),B=a(14),H=n(B),h=[],N=!1,m={offset:120,delay:0,easing:"ease",duration:400,disable:!1,once:!1,startEvent:"DOMContentLoaded",throttleDelay:99,debounceDelay:50,disableMutationObserver:!1},k=function(){var i=arguments.length>0&&arguments[0]!==void 0&&arguments[0];if(i&&(N=!0),N)return h=(0,D.default)(h,m),(0,Y.default)(h,m.once),h},M=function(){h=(0,H.default)(),k()},e=function(){h.forEach(function(i,q){i.node.removeAttribute("data-aos"),i.node.removeAttribute("data-aos-easing"),i.node.removeAttribute("data-aos-duration"),i.node.removeAttribute("data-aos-delay")})},t=function(i){return i===!0||i==="mobile"&&O.default.mobile()||i==="phone"&&O.default.phone()||i==="tablet"&&O.default.tablet()||typeof i=="function"&&i()===!0},f=function(i){m=u(m,i),h=(0,H.default)();var q=document.all&&!window.atob;return t(m.disable)||q?e():(m.disableMutationObserver||d.default.isSupported()||(console.info(`
      aos: MutationObserver is not supported on this browser,
      code mutations observing has been disabled.
      You may have to call "refreshHard()" by yourself.
    `),m.disableMutationObserver=!0),document.querySelector("body").setAttribute("data-aos-easing",m.easing),document.querySelector("body").setAttribute("data-aos-duration",m.duration),document.querySelector("body").setAttribute("data-aos-delay",m.delay),m.startEvent==="DOMContentLoaded"&&["complete","interactive"].indexOf(document.readyState)>-1?k(!0):m.startEvent==="load"?window.addEventListener(m.startEvent,function(){k(!0)}):document.addEventListener(m.startEvent,function(){k(!0)}),window.addEventListener("resize",(0,o.default)(k,m.debounceDelay,!0)),window.addEventListener("orientationchange",(0,o.default)(k,m.debounceDelay,!0)),window.addEventListener("scroll",(0,r.default)(function(){(0,Y.default)(h,m.once)},m.throttleDelay)),m.disableMutationObserver||d.default.ready("[data-aos]",M),h)};w.exports={init:f,refresh:k,refreshHard:M}},function(w,c){},,,,,function(w,c){(function(a){function n(t,f,i){function q(p){var E=A,Q=L;return A=L=void 0,C=p,j=t.apply(Q,E)}function P(p){return C=p,x=setTimeout(G,f),R?q(p):j}function W(p){var E=p-z,Q=p-C,et=f-E;return $?M(et,T-Q):et}function I(p){var E=p-z,Q=p-C;return z===void 0||E>=f||E<0||$&&Q>=T}function G(){var p=e();return I(p)?V(p):void(x=setTimeout(G,W(p)))}function V(p){return x=void 0,y&&A?q(p):(A=L=void 0,j)}function Z(){x!==void 0&&clearTimeout(x),C=0,A=z=L=x=void 0}function J(){return x===void 0?j:V(e())}function F(){var p=e(),E=I(p);if(A=arguments,L=this,z=p,E){if(x===void 0)return P(z);if($)return x=setTimeout(G,f),q(z)}return x===void 0&&(x=setTimeout(G,f)),j}var A,L,T,j,x,z,C=0,R=!1,$=!1,y=!0;if(typeof t!="function")throw new TypeError(s);return f=l(f)||0,v(i)&&(R=!!i.leading,$="maxWait"in i,T=$?k(l(i.maxWait)||0,f):T,y="trailing"in i?!!i.trailing:y),F.cancel=Z,F.flush=J,F}function u(t,f,i){var q=!0,P=!0;if(typeof t!="function")throw new TypeError(s);return v(i)&&(q="leading"in i?!!i.leading:q,P="trailing"in i?!!i.trailing:P),n(t,f,{leading:q,maxWait:f,trailing:P})}function v(t){var f=typeof t>"u"?"undefined":o(t);return!!t&&(f=="object"||f=="function")}function g(t){return!!t&&(typeof t>"u"?"undefined":o(t))=="object"}function r(t){return(typeof t>"u"?"undefined":o(t))=="symbol"||g(t)&&m.call(t)==b}function l(t){if(typeof t=="number")return t;if(r(t))return d;if(v(t)){var f=typeof t.valueOf=="function"?t.valueOf():t;t=v(f)?f+"":f}if(typeof t!="string")return t===0?t:+t;t=t.replace(O,"");var i=Y.test(t);return i||K.test(t)?D(t.slice(2),i?2:8):S.test(t)?d:+t}var o=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s="Expected a function",d=NaN,b="[object Symbol]",O=/^\s+|\s+$/g,S=/^[-+]0x[0-9a-f]+$/i,Y=/^0b[01]+$/i,K=/^0o[0-7]+$/i,D=parseInt,B=(typeof a>"u"?"undefined":o(a))=="object"&&a&&a.Object===Object&&a,H=(typeof self>"u"?"undefined":o(self))=="object"&&self&&self.Object===Object&&self,h=B||H||Function("return this")(),N=Object.prototype,m=N.toString,k=Math.max,M=Math.min,e=function(){return h.Date.now()};w.exports=u}).call(c,function(){return this}())},function(w,c){(function(a){function n(e,t,f){function i(y){var p=F,E=A;return F=A=void 0,z=y,T=e.apply(E,p)}function q(y){return z=y,j=setTimeout(I,t),C?i(y):T}function P(y){var p=y-x,E=y-z,Q=t-p;return R?k(Q,L-E):Q}function W(y){var p=y-x,E=y-z;return x===void 0||p>=t||p<0||R&&E>=L}function I(){var y=M();return W(y)?G(y):void(j=setTimeout(I,P(y)))}function G(y){return j=void 0,$&&F?i(y):(F=A=void 0,T)}function V(){j!==void 0&&clearTimeout(j),z=0,F=x=A=j=void 0}function Z(){return j===void 0?T:G(M())}function J(){var y=M(),p=W(y);if(F=arguments,A=this,x=y,p){if(j===void 0)return q(x);if(R)return j=setTimeout(I,t),i(x)}return j===void 0&&(j=setTimeout(I,t)),T}var F,A,L,T,j,x,z=0,C=!1,R=!1,$=!0;if(typeof e!="function")throw new TypeError(o);return t=r(t)||0,u(f)&&(C=!!f.leading,R="maxWait"in f,L=R?m(r(f.maxWait)||0,t):L,$="trailing"in f?!!f.trailing:$),J.cancel=V,J.flush=Z,J}function u(e){var t=typeof e>"u"?"undefined":l(e);return!!e&&(t=="object"||t=="function")}function v(e){return!!e&&(typeof e>"u"?"undefined":l(e))=="object"}function g(e){return(typeof e>"u"?"undefined":l(e))=="symbol"||v(e)&&N.call(e)==d}function r(e){if(typeof e=="number")return e;if(g(e))return s;if(u(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=u(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=e.replace(b,"");var f=S.test(e);return f||Y.test(e)?K(e.slice(2),f?2:8):O.test(e)?s:+e}var l=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o="Expected a function",s=NaN,d="[object Symbol]",b=/^\s+|\s+$/g,O=/^[-+]0x[0-9a-f]+$/i,S=/^0b[01]+$/i,Y=/^0o[0-7]+$/i,K=parseInt,D=(typeof a>"u"?"undefined":l(a))=="object"&&a&&a.Object===Object&&a,B=(typeof self>"u"?"undefined":l(self))=="object"&&self&&self.Object===Object&&self,H=D||B||Function("return this")(),h=Object.prototype,N=h.toString,m=Math.max,k=Math.min,M=function(){return H.Date.now()};w.exports=n}).call(c,function(){return this}())},function(w,c){function a(l){var o=void 0,s=void 0;for(o=0;o<l.length;o+=1)if(s=l[o],s.dataset&&s.dataset.aos||s.children&&a(s.children))return!0;return!1}function n(){return window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver}function u(){return!!n()}function v(l,o){var s=window.document,d=n(),b=new d(g);r=o,b.observe(s.documentElement,{childList:!0,subtree:!0,removedNodes:!0})}function g(l){l&&l.forEach(function(o){var s=Array.prototype.slice.call(o.addedNodes),d=Array.prototype.slice.call(o.removedNodes),b=s.concat(d);if(a(b))return r()})}Object.defineProperty(c,"__esModule",{value:!0});var r=function(){};c.default={isSupported:u,ready:v}},function(w,c){function a(s,d){if(!(s instanceof d))throw new TypeError("Cannot call a class as a function")}function n(){return navigator.userAgent||navigator.vendor||window.opera||""}Object.defineProperty(c,"__esModule",{value:!0});var u=function(){function s(d,b){for(var O=0;O<b.length;O++){var S=b[O];S.enumerable=S.enumerable||!1,S.configurable=!0,"value"in S&&(S.writable=!0),Object.defineProperty(d,S.key,S)}}return function(d,b,O){return b&&s(d.prototype,b),O&&s(d,O),d}}(),v=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,g=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,r=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,l=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,o=function(){function s(){a(this,s)}return u(s,[{key:"phone",value:function(){var d=n();return!(!v.test(d)&&!g.test(d.substr(0,4)))}},{key:"mobile",value:function(){var d=n();return!(!r.test(d)&&!l.test(d.substr(0,4)))}},{key:"tablet",value:function(){return this.mobile()&&!this.phone()}}]),s}();c.default=new o},function(w,c){Object.defineProperty(c,"__esModule",{value:!0});var a=function(u,v,g){var r=u.node.getAttribute("data-aos-once");v>u.position?u.node.classList.add("aos-animate"):typeof r<"u"&&(r==="false"||!g&&r!=="true")&&u.node.classList.remove("aos-animate")},n=function(u,v){var g=window.pageYOffset,r=window.innerHeight;u.forEach(function(l,o){a(l,r+g,v)})};c.default=n},function(w,c,a){function n(r){return r&&r.__esModule?r:{default:r}}Object.defineProperty(c,"__esModule",{value:!0});var u=a(12),v=n(u),g=function(r,l){return r.forEach(function(o,s){o.node.classList.add("aos-init"),o.position=(0,v.default)(o.node,l.offset)}),r};c.default=g},function(w,c,a){function n(r){return r&&r.__esModule?r:{default:r}}Object.defineProperty(c,"__esModule",{value:!0});var u=a(13),v=n(u),g=function(r,l){var o=0,s=0,d=window.innerHeight,b={offset:r.getAttribute("data-aos-offset"),anchor:r.getAttribute("data-aos-anchor"),anchorPlacement:r.getAttribute("data-aos-anchor-placement")};switch(b.offset&&!isNaN(b.offset)&&(s=parseInt(b.offset)),b.anchor&&document.querySelectorAll(b.anchor)&&(r=document.querySelectorAll(b.anchor)[0]),o=(0,v.default)(r).top,b.anchorPlacement){case"top-bottom":break;case"center-bottom":o+=r.offsetHeight/2;break;case"bottom-bottom":o+=r.offsetHeight;break;case"top-center":o+=d/2;break;case"bottom-center":o+=d/2+r.offsetHeight;break;case"center-center":o+=d/2+r.offsetHeight/2;break;case"top-top":o+=d;break;case"bottom-top":o+=r.offsetHeight+d;break;case"center-top":o+=r.offsetHeight/2+d}return b.anchorPlacement||b.offset||isNaN(l)||(s=l),o+s};c.default=g},function(w,c){Object.defineProperty(c,"__esModule",{value:!0});var a=function(n){for(var u=0,v=0;n&&!isNaN(n.offsetLeft)&&!isNaN(n.offsetTop);)u+=n.offsetLeft-(n.tagName!="BODY"?n.scrollLeft:0),v+=n.offsetTop-(n.tagName!="BODY"?n.scrollTop:0),n=n.offsetParent;return{top:v,left:u}};c.default=a},function(w,c){Object.defineProperty(c,"__esModule",{value:!0});var a=function(n){return n=n||document.querySelectorAll("[data-aos]"),Array.prototype.map.call(n,function(u){return{node:u}})};c.default=a}])})})(ct);var ft=ct.exports;const mt=lt(ft);function xt(X){const[tt,w]=U.useState(!1),[c,a]=U.useState(!0),[n,u]=U.useState("initial");U.useEffect(()=>{mt.init(),X.type==="outreach"?u(""):u("-virtual-labs")},[]);const[v,g]=U.useState([]);U.useEffect(()=>{n!=="initial"&&(async()=>{try{const o="virtual-labs",s="outreach-web-pages-iiith",d="faq"+n,b="main",O=`https://api.github.com/repos/${o}/${s}/git/trees/main?recursive=1`,S=await fetch(O);if(!S.ok)throw a(!1),new Error("Failed to fetch folders");const D=(await S.json()).tree.filter(h=>h.path.endsWith(".mdx")).filter(h=>h.path.startsWith(d+"/")&&h.path.endsWith(".mdx"));D.sort((h,N)=>{const m=h.path,k=N.path,[,M]=m.match(/Q(\d+)/),[,e]=k.match(/Q(\d+)/);return Number(M)-Number(e)});const B=async h=>{const N=await fetch(h);if(!N.ok)throw a(!1),new Error("Failed to fetch file content");const m=await N.text(),k=/^---\s*title:\s*(.*?)\s*(?:excerpt:\s*(.*?))?\s*---\s*(.*)$/s,M=m.match(k),e=M[1].trim(),t=M[2]?M[2].trim():"",f=M[3].trim();return{title:e,content:f}},H=await Promise.all(D.map(async h=>{const N=`https://raw.githubusercontent.com/${o}/${s}/${b}/${h.path}`,{title:m,content:k}=await B(N);return{title:m,content:k}}));g(H.flat()),w(!0)}catch(o){a(!1),console.error(o)}})()},[n]);const r=l=>{g(o=>{const s=[...o];return s[l].collapsed=!s[l].collapsed,s})};return tt?_.jsx(_.Fragment,{children:_.jsxs("div",{className:"faq-workshops_faq mt-6 mx-auto",children:[_.jsx("p",{class:"title has-text-black has-text-centered is-size-2 my-0 py-5",children:"Frequently Asked Questions"}),_.jsx("div",{className:"faq-container theme py-0 px-6 mb-6 content",children:v.map((l,o)=>_.jsxs("div",{children:[_.jsx("button",{"data-aos":"fade-up",style:{color:"white"},className:"box question is-size-5 mb-0 mt-2 has-text-weight-semibold",onClick:()=>r(o),children:_.jsx(nt,{children:l.title,rehypePlugins:[ot],remarkPlugins:[at,rt,it,st]})}),l.collapsed&&_.jsx("div",{className:"box answer",children:_.jsx(nt,{children:l.content,rehypePlugins:[ot],remarkPlugins:[at,rt,it,st]})})]},o))})]})}):c?_.jsx("div",{className:"faq-container ",style:{height:"100vh"},children:_.jsx(dt,{})}):_.jsx("div",{className:"is-size-1 is-flex is-align-items-center  px-5",style:{height:"100vh"},children:_.jsxs("p",{className:"theme",children:["Oops! Page could not be displayed :/ You can still find the FAQs documented here:",_.jsx("a",{href:"https://github.com/virtual-labs/outreach-web-pages-iiith/tree/main/faq-virtual-labs",target:"blank",children:"FAQs"})]})})}export{xt as default};
