var alertist=function(){"use strict";let t;const e={close:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAAElBMVEX///9HcEz///////////////84chYNAAAABnRSTlP9ABWejzIjLOoFAAAAlUlEQVQoz3VSWRbEIAwi2/2vPG5tg8nohz6JBBFIhDRjnEIB0xtQB2LMik1kADIXZ8xXOUTtuqcbEXzbB3lK8RIQ29zgLdz9EgWYJJODRElui9zcSRBIGEkFPyc/EOwBXCq0L3WEW3Ur4xxa8hrkKHkNMqMa9dfe7lN8fcqFfPQQr+E4AWhjYziJasJmK1ERWhOqI6I/koMDV9q/Is8AAAAASUVORK5CYII="},r=()=>{t&&t.querySelectorAll("dialog:not([open])").forEach((t=>t.remove()))},l=(l,a,s)=>{if(!(()=>{if("object"!=typeof document||"function"!=typeof DOMParser)return!1;let e=document.querySelector(".alertist-bucket");return e||(e=document.createElement("span"),e.classList.add("alertist-bucket"),document.querySelector("body").append(e)),t=e,e})())return console.warn("alertist: init - Not in a browser environment."),!1;let i={target:null,title:"",text:"",type:"",button:"OK",cancel:"Cancel",okCallback:()=>{},cancelCallback:()=>{},check:()=>!0,titleClass:""};if(!a[0]||"object"!=typeof a[0]||Array.isArray(a[0]))return console.warn("alertist: init - We are only accepting object as input."),!1;i={...i,...a[0]};const{title:n,text:o,type:c,button:d,cancel:u,okCallback:b,cancelCallback:f,check:y,target:A,submit:m,titleClass:v}=i;let g=(new DOMParser).parseFromString(s,"text/html").querySelector("dialog");if(g.querySelector(".alertist-title").textContent=n,v.length){v.split(" ").forEach((t=>{g.querySelector(".alertist-title").classList.add(t)}))}if("error"===c&&(g.querySelector(".alertist-title").classList.add("alertist-title_error"),g.querySelector(".alertist-title_close").classList.add("alertist-title_error_close")),g.querySelector(".alertist-title_close img").setAttribute("src",e.close),"alert"!==l&&"confirm"!==l||(g.querySelector(".alertist-body").innerHTML=o,g.querySelector(".alertist-footer_button").textContent=d,g.querySelector(".alertist-footer_button").addEventListener("click",(t=>{const e=y(g),l=e instanceof Promise;Promise.resolve(e).then((t=>{(!l&&!0===t||l)&&(g.close(),b(),r())})).catch((()=>{}))}))),"form"===l){const t=document.querySelector(A);if(!t)return console.warn("alertist: form - Target not found in DOM."),!1;g.querySelector(".alertist-container").append(t),t.classList.add("alertist-body"),t.setAttribute("data-check","false"),t.addEventListener("submit",(e=>{if("false"===t.getAttribute("data-check")){e.preventDefault();const l=y(g),a=l instanceof Promise;Promise.resolve(l).then((e=>{(!a&&!0===e||a)&&(g.close(),b(g),m&&(t.setAttribute("data-check","true"),t.submit()),r())})).catch((()=>{}))}}))}const p=()=>{g.close(),f(),r()};"confirm"===l&&(g.querySelector(".alertist-footer_cancelbutton").textContent=u,g.querySelector(".alertist-footer_cancelbutton").addEventListener("click",p)),g.querySelector(".alertist-title_close").addEventListener("click",p),g.addEventListener("click",(t=>{"DIALOG"===t.target.tagName&&p()}));let q={x:0,y:0};g.querySelector(".alertist-title").addEventListener("dragstart",(t=>{q.x||=t.clientX,q.y||=t.clientY})),g.querySelector(".alertist-title").addEventListener("dragend",(t=>{}));let S=1;return g.querySelector(".alertist-title").addEventListener("drag",(t=>{t.preventDefault(),t.screenX&&S&&(S=0,(t=>{g.setAttribute("style",`transform: translate(${-q.x+t.clientX}px, ${-q.y+t.clientY}px)`)})(t),setTimeout((()=>{S=1}),16))})),t.append(g),g.showModal(),g.querySelector(".alertist-title_close").blur(),{parameters:i,element:g}},a='\n\t<dialog class="alertist alertist-alert" style="transform: translate(0px, 0px)">\n\t\t<div class="alertist-container">\n\t\t\t<div class="alertist-header">\n\t\t\t\t<div class="alertist-title" draggable="true"></div>\n\t\t\t\t<button class="alertist-title_close"><img></button>\n\t\t\t</div>\n\t\t\t<div class="alertist-body alertist-wordbreak"></div>\n\t\t\t<div class="alertist-footer">\n\t\t\t\t<button class="alertist-footer_button"></button>\n\t\t\t</div>\n\t\t</div>\n\t</dialog>',s='\n\t<dialog class="alertist alertist-confirm" style="transform: translate(0px, 0px)">\n\t\t<div class="alertist-container">\n\t\t\t<div class="alertist-header">\n\t\t\t\t<div class="alertist-title" draggable="true"></div>\n\t\t\t\t<button class="alertist-title_close"><img></button>\n\t\t\t</div>\n\t\t\t<div class="alertist-body alertist-wordbreak"></div>\n\t\t\t<div class="alertist-footer">\n\t\t\t\t<button class="alertist-footer_button"></button>\n\t\t\t\t<button class="alertist-footer_cancelbutton"></button>\n\t\t\t</div>\n\t\t</div>\n\t</dialog>',i='\n\t<dialog class="alertist alertist-form" style="transform: translate(0px, 0px)">\n\t\t<div class="alertist-container">\n\t\t\t<div class="alertist-header">\n\t\t\t\t<div class="alertist-title" draggable="true"></div>\n\t\t\t\t<button class="alertist-title_close"><img></button>\n\t\t\t</div>\n\t\t\t\x3c!-- .alertist-body --\x3e\n\t\t</div>\n\t</dialog>';return{alert:(...t)=>l("alert",t,a),confirm:(...t)=>l("confirm",t,s),form:(...t)=>l("form",t,i),custom:{buttons:e,alertbody:a,confirmbody:s,formbody:i}}}();