const w=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerpolicy&&(s.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?s.credentials="include":o.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=t(o);fetch(o.href,s)}};w();const y=r=>{const{path:e}=r,t=[...e.matchAll(/\${(\w+)}/g)],i=t.map(s=>s[1]),o=A(e,t);return{parameterNames:i,matchablePath:o,...r}},A=(r,e)=>{if(!e||!e.length)return`${r}$`;const t=new RegExp(e.map(i=>`\\${i[0]}`).join("|"));return`${r.replace(t,"(\\w+)")}$`},I=r=>{const{matchablePath:e,parameterNames:t}=r,{pathname:i}=window.location;if(!t.length)return[i.match(e)!==null,null];const o=new RegExp(e,"g"),s=[...i.matchAll(o)],a=s.reduce((u,c,l)=>(u[t[l]]=c[1],u),{});return[s.length>0,a]},_=r=>{for(const e of r){const[t,i]=I(e);if(t)return[e.name,i]}return null},L=r=>(e,t)=>{const i=r.map(y),o=a=>{if(!a){t&&t();return}const[d,u]=a;e&&e(d,u)};return window.addEventListener("load",()=>{const a=_(i);o(a)}),window.addEventListener("popstate",()=>{const a=_(i);o(a)}),a=>{if(!window.history)return;window.history.pushState({},"",a);const d=_(i);o(d)}},k="modulepreload",b={},x="/zikra/",n=function(e,t){return!t||t.length===0?e():Promise.all(t.map(i=>{if(i=`${x}${i}`,i in b)return;b[i]=!0;const o=i.endsWith(".css"),s=o?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${i}"]${s}`))return;const a=document.createElement("link");if(a.rel=o?"stylesheet":k,o||(a.as="script",a.crossOrigin=""),a.href=i,document.head.appendChild(a),o)return new Promise((d,u)=>{a.addEventListener("load",d),a.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${i}`)))})})).then(()=>e())},O=["49409540403","49409545333","49410016506","49410221802","49410222672","49621541561","51940403207","51940403222","51941393761","51941424951","51941425296","51941475903","51941506933","51942008675","51942040265","52135942217","52135942282","52136967181"];function R(r){switch(r){case"../img/49409540403/medium.jpg":return n(()=>import("./medium.22159df1.js"),[]);case"../img/49409545333/medium.jpg":return n(()=>import("./medium.7999d0b4.js"),[]);case"../img/49410016506/medium.jpg":return n(()=>import("./medium.7b4f330f.js"),[]);case"../img/49410221802/medium.jpg":return n(()=>import("./medium.1bdd8c96.js"),[]);case"../img/49410222672/medium.jpg":return n(()=>import("./medium.7b95568c.js"),[]);case"../img/49621541561/medium.jpg":return n(()=>import("./medium.681dc204.js"),[]);case"../img/51940403207/medium.jpg":return n(()=>import("./medium.71b8f561.js"),[]);case"../img/51940403222/medium.jpg":return n(()=>import("./medium.cd5e2ba8.js"),[]);case"../img/51941393761/medium.jpg":return n(()=>import("./medium.0e046fdc.js"),[]);case"../img/51941424951/medium.jpg":return n(()=>import("./medium.f4e22a53.js"),[]);case"../img/51941425296/medium.jpg":return n(()=>import("./medium.2a6bc9de.js"),[]);case"../img/51941475903/medium.jpg":return n(()=>import("./medium.8d727664.js"),[]);case"../img/51941506933/medium.jpg":return n(()=>import("./medium.be73b9b8.js"),[]);case"../img/51942008675/medium.jpg":return n(()=>import("./medium.e606bd37.js"),[]);case"../img/51942040265/medium.jpg":return n(()=>import("./medium.0a1bb7f2.js"),[]);case"../img/52135942217/medium.jpg":return n(()=>import("./medium.7f98be9a.js"),[]);case"../img/52135942282/medium.jpg":return n(()=>import("./medium.68984d7b.js"),[]);case"../img/52136967181/medium.jpg":return n(()=>import("./medium.fd475f4f.js"),[]);default:return new Promise(function(e,t){(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(t.bind(null,new Error("Unknown variable dynamic import: "+r)))})}}class T extends HTMLElement{onImageSelected(e){const{target:t}=e,i=t.closest("button");if(!i)return;const o=i.dataset.imageId,s=new CustomEvent("image-selected",{detail:o});this.dispatchEvent(s)}connectedCallback(){O.forEach(e=>{const t=document.createElement("button");t.dataset.imageId=e;const i=document.createElement("img");R(`../img/${e}/medium.jpg`).then(o=>{i.src=o.default}),t.appendChild(i),this.appendChild(t)}),this.addEventListener("click",this.onImageSelected)}}window.customElements.define("image-selector",T);const j=()=>{const r=document.querySelector(".container"),e=document.createElement("image-selector");return e.classList.add("image-selector"),r.appendChild(e),e},D=()=>{const r=document.querySelector("image-selector");!r||r.remove()},S=r=>{for(let e=r.length-1;e>0;e--){const t=Math.floor(Math.random()*(e+1));[r[e],r[t]]=[r[t],r[e]]}return r},V=r=>r.height?r.width/r.height:0,$=(r,e)=>t=>{const i=V(t);!i||(r<t.width&&(t.width=r,t.height=t.width/i),e<t.height&&(t.height=e,t.width=t.height*i))},P=(r,e)=>Number.parseInt(r.getAttribute(e)),m=(r,e)=>Number.parseFloat(r.getAttribute(e));class C extends HTMLElement{resetXY(){this.positionX=this.finalPositionX,this.positionY=this.finalPositionY}move(e,t){const i=this.animate([{transform:`translate3d(${this.positionX}px, ${this.positionY}px, 0)`},{transform:`translate3d(${this.finalPositionX}px, ${this.finalPositionY}px, 0)`}],{duration:e,delay:t,iterations:1,fill:"forwards"});return i.addEventListener("finish",()=>this.resetXY()),i}switchPosition(e){const{positionX:t,positionY:i,currentOrder:o}=this,{positionX:s,positionY:a,currentOrder:d}=e;this.finalPositionX=s,this.finalPositionY=a,this.currentOrder=d,e.finalPositionX=t,e.finalPositionY=i,e.currentOrder=o}isInCorrectOrder(){return this.order===this.currentOrder}connectedCallback(){this.width=m(this,"width"),this.height=m(this,"height"),this.order=P(this,"order"),this.currentOrder=P(this,"current-order"),this.positionX=m(this,"position-x"),this.positionY=m(this,"position-y"),this.finalPositionX=m(this,"final-position-x"),this.finalPositionY=m(this,"final-position-y"),this.backgroundImage=this.getAttribute("background-image"),this.backgroundWidth=this.getAttribute("background-width"),this.backgroundHeight=this.getAttribute("background-height"),this.style.setProperty("--width",`${this.width}px`),this.style.setProperty("--height",`${this.height}px`),this.style.setProperty("--position-x",`${this.positionX}`),this.style.setProperty("--position-y",`${this.positionY}`);const e=document.createElement("button");e.style.setProperty("--width",`${this.width}px`),e.style.setProperty("--height",`${this.height}px`),e.style.setProperty("--background-width",`${this.backgroundWidth}px`),e.style.setProperty("--background-height",`${this.backgroundHeight}px`),e.style.setProperty("background-image",`url(${this.backgroundImage})`),e.style.setProperty("--image-position-x",`${-1*this.positionX}px`),e.style.setProperty("--image-position-y",`${-1*this.positionY}px`),this.appendChild(e)}}window.customElements.define("image-piece",C);const Y=r=>{const e=M(r);return({width:t,height:i,backgroundWidth:o,backgroundHeight:s,backgroundImage:a,index:d,randomIndex:u})=>{const c=document.createElement("image-piece"),[l,g]=e(t,i,d),[h,p]=e(t,i,u);return c.setAttribute("width",t),c.setAttribute("height",i),c.setAttribute("background-width",o),c.setAttribute("background-height",s),c.setAttribute("background-image",a),c.setAttribute("position-x",l),c.setAttribute("position-y",g),c.setAttribute("final-position-x",h),c.setAttribute("final-position-y",p),c.setAttribute("order",d),c.setAttribute("current-order",u),c}},X=r=>(e,t)=>[e/r,t/r],M=r=>(e,t,i)=>{const o=e*(i-Math.floor(i/r)*r),s=t*Math.floor(i/r);return[o,s]};function q(r){switch(r){case"../img/49409540403/large.jpg":return n(()=>import("./large.b23a9241.js"),[]);case"../img/49409545333/large.jpg":return n(()=>import("./large.fd4df93b.js"),[]);case"../img/49410016506/large.jpg":return n(()=>import("./large.2b4f6e37.js"),[]);case"../img/49410221802/large.jpg":return n(()=>import("./large.56a4e394.js"),[]);case"../img/49410222672/large.jpg":return n(()=>import("./large.25a728b8.js"),[]);case"../img/49621541561/large.jpg":return n(()=>import("./large.77d4ab8e.js"),[]);case"../img/51940403207/large.jpg":return n(()=>import("./large.e93b0e5a.js"),[]);case"../img/51940403222/large.jpg":return n(()=>import("./large.ef8063b6.js"),[]);case"../img/51941393761/large.jpg":return n(()=>import("./large.f015c61a.js"),[]);case"../img/51941424951/large.jpg":return n(()=>import("./large.b3cf778b.js"),[]);case"../img/51941425296/large.jpg":return n(()=>import("./large.fb27376a.js"),[]);case"../img/51941475903/large.jpg":return n(()=>import("./large.58d7be89.js"),[]);case"../img/51941506933/large.jpg":return n(()=>import("./large.ac4866c7.js"),[]);case"../img/51942008675/large.jpg":return n(()=>import("./large.177adb54.js"),[]);case"../img/51942040265/large.jpg":return n(()=>import("./large.0e4e75b9.js"),[]);case"../img/52135942217/large.jpg":return n(()=>import("./large.e42a5f31.js"),[]);case"../img/52135942282/large.jpg":return n(()=>import("./large.6a42bc04.js"),[]);case"../img/52136967181/large.jpg":return n(()=>import("./large.4ee346df.js"),[]);default:return new Promise(function(e,t){(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(t.bind(null,new Error("Unknown variable dynamic import: "+r)))})}}class F extends HTMLElement{constructor(){super(),this.firstSelectedPiece=null,this.secondSelectedPiece=null}onClicked(e){const{target:t}=e,i=t.closest("image-piece");if(!!i){if(!this.firstSelectedPiece){this.firstSelectedPiece=i,this.firstSelectedPiece.setAttribute("selected",!0);return}if(this.firstSelectedPiece.removeAttribute("selected"),this.firstSelectedPiece===i){this.firstSelectedPiece=null;return}this.secondSelectedPiece=i,this.firstSelectedPiece.switchPosition(this.secondSelectedPiece),this.firstSelectedPiece.move(300,0),this.secondSelectedPiece.move(300,0),this.firstSelectedPiece=null,this.checkGameStatus()}}checkGameStatus(){const e=this.querySelectorAll("image-piece");for(const t of e)if(!t.isInCorrectOrder())return;alert("You won")}connectedCallback(){const e=new Image;e.onload=()=>{const i=Number.parseFloat(this.getAttribute("max-width")),o=Number.parseFloat(this.getAttribute("max-height"));$(i,o)(e),this.style.setProperty("--width",`${e.width}px`),this.style.setProperty("--height",`${e.height}px`),this.addEventListener("click",this.onClicked);const s=X(4),[a,d]=s(e.width,e.height),{width:u,height:c,src:l}=e,g=[...Array(16).keys()],h=S([...g]),p=Y(4);for(let f in g){const v=h[f],E=p({width:a,height:d,backgroundWidth:u,backgroundHeight:c,backgroundImage:l,index:f,randomIndex:v});this.appendChild(E),E.move(300,1e3)}};const t=this.getAttribute("image-id");q(`../img/${t}/large.jpg`).then(i=>{e.src=i.default})}}window.customElements.define("image-container",F);const N=({imageId:r})=>{const e=document.querySelector(".container"),{width:t,height:i}=e.getBoundingClientRect(),o=document.createElement("image-container");return o.classList.add("image-container"),o.setAttribute("image-id",r),o.setAttribute("max-width",t),o.setAttribute("max-height",i),e.appendChild(o),o},H=[{name:"home",path:"/"},{name:"image",path:"/image/${imageId}"}],W=L(H)((r,e)=>{if(r==="home")j().addEventListener("image-selected",i=>{const{detail:o}=i;W(`/image/${o}`)});else if(r==="image"){D();const{imageId:t}=e;N({imageId:t})}},()=>{});window.addEventListener("DOMContentLoaded",()=>{});
