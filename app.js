!function(){var e,t,n,a,o,r,l,c,s,u;t={load:function(){"serviceWorker"in navigator&&navigator.serviceWorker.register("service-worker.js")}},a=function(e,t){var n,a=function(){for(var e=window.location.hash,t={},n=("#"===e[0]?e.substring(1):e).split("&"),a=0;a<n.length;a++){var o=n[a].split("=");t[decodeURIComponent(o[0])]=decodeURIComponent(o[1]||"")}return t},o={read:function(){var e=a();for(field in n)void 0!==e[field]&&""!==e[field]&&(n[field].value=e[field]);for(field in n)void 0!==e[field]&&""!==e[field]&&n[field].dispatchEvent(new Event("change",{bubbles:!0}));void 0!==e.title&&void 0!==e.notation&&void 0!==e.stage&&document.querySelector("#selectMethod .next_button button").dispatchEvent(new Event("click",{bubbles:!0}))},update:function(e){var t,o=a();for(field in n)n[field].id!==e.target.id&&void 0===o[field]||(o[field]=n[field].value);var r=Object.entries(o).filter((function(e){return e[1]}));t=Object.keys(Object.fromEntries(r)).map((function(e){return e+"="+encodeURIComponent(o[e])})).join("&"),history.replaceState(void 0,void 0,"#"+t)}};return e((function(){t("change","select, input",o.update),window.addEventListener("hashchange",o.read),n={title:document.getElementById("practice_chooser_name"),stage:document.getElementById("practice_chooser_stage"),notation:document.getElementById("practice_chooser_notation"),ruleoffs:document.getElementById("practice_chooser_ruleOffs"),allowMethodSelection:document.getElementById("practice_chooser_allowMethodSelection")}})),o}(e=function(e){"loading"!=document.readyState?e():document.addEventListener("DOMContentLoaded",e)},n=function(e,t,n){document.addEventListener(e,(function(e){for(var a=e.target;a&&a!=this;a=a.parentNode)if(a.matches(t)){n.call(a,e);break}}),!1)}),function(e){e((function(){var e=document.createElement("div");e.id="overlay",e.className="hide";var t=document.getElementById("about");document.body.insertBefore(e,t);var n=function(){e.className="hide",t.className="hide"};document.getElementById("aboutButton").addEventListener("click",(function(){e.className="active",t.className="active"})),e.addEventListener("click",n),t.addEventListener("click",n),document.body.addEventListener("keydown",(function(e){"Escape"===e.key&&n()}))}))}(e),function(e,t){e((function(){t("click",".prev_button button",(function(e){this.parentNode.parentNode.classList.remove("active"),this.parentNode.parentNode.classList.remove("up"),this.parentNode.parentNode.classList.add("down"),this.parentNode.parentNode.previousElementSibling.classList.add("active"),this.parentNode.parentNode.previousElementSibling.classList.remove("up"),this.parentNode.parentNode.previousElementSibling.classList.remove("down")})),t("click",".next_button button",(function(e){this.parentNode.parentNode.classList.remove("active"),this.parentNode.parentNode.classList.add("up"),this.parentNode.parentNode.classList.remove("down"),this.parentNode.parentNode.nextElementSibling.classList.add("active"),this.parentNode.parentNode.nextElementSibling.classList.remove("up"),this.parentNode.parentNode.nextElementSibling.classList.remove("down")}))}))}(e,n),function(e){e((function(){var e=document.querySelectorAll("ul.tab_group input[type=radio]");for(i=0;i<e.length;i++)e[i].addEventListener("click",(function(e){for(var t=e.target.parentElement.parentElement.firstChild;t&&1===t.nodeType;t=t.nextElementSibling||t.nextSibling)t.classList.remove("active");e.target.parentElement.classList.add("active")}));var t=document.getElementById("practice_chooser_bell");document.getElementById("practice_chooser_stage").addEventListener("change",(function(e){var n=parseInt(e.target.value,10),a=parseInt(t.querySelector("li.active input").value,10);if(t.className="tab_group _"+n,n<a){var o=new MouseEvent("click",{view:window,bubbles:!0,cancelable:!0});t.querySelector("input#practice_chooser_bell_"+n).dispatchEvent(o)}}));var n=document.querySelector("#chooseOptions h3");document.getElementById("practice_chooser_name").addEventListener("change",(function(e){n.innerText=e.target.value}))}))}(e),function(e,t){e((function(){var e=document.getElementById("practice_chooser_name"),n=document.getElementById("practice_chooser_stage"),a=document.getElementById("practice_chooser_notation"),o=document.getElementById("practice_chooser_ruleOffs"),r=document.getElementById("practice_chooser_allowMethodSelection"),i=document.getElementById("practice_chooser_help"),l=document.getElementById("searchResults");r.addEventListener("change",(function(){if(!("false"!==r.value)){var t=document.querySelector("#chooseOptions .prev_button");t.style.pointerEvents="none",t.style.opacity=0,document.querySelector("#chooseOptions h3").style.display="none",document.querySelector("#head h1").innerHTML=""!==e.value?'<span style="font-weight:normal">Method Tutor &raquo;</span> '+e.value:"Method Tutor"}}));var c=0;activeSearchCount=-1,e.addEventListener("input",(function(e){if(""!==e.target.value){var t=c;c++,fetch("https://rsw.me.uk/blueline/methods/search.json?q="+encodeURIComponent(e.target.value)).then((function(e){if(t<activeSearchCount)throw new Error("Ignored result received out of sync");return activeSearchCount=t,e.json()})).then((function(e){for(var t="",n=0;n<4&&void 0!==e.results[n];n++)t+='<li class="result" data-stage="'+e.results[n].stage+'" data-notation="'+e.results[n].notation+'" data-ruleOffs="{&quot;from&quot;:'+e.results[n].ruleOffs.from+",&quot;every&quot;:"+e.results[n].ruleOffs.every+'}">'+e.results[n].title+"</li>";t+='<li class="close">Close Search Results ✖</li>',l.innerHTML=t,l.style.marginBottom=-33*n+"px",l.style.display="block"})).catch((function(e){console.log(e)}))}else l.style.display="none"}));var s=document.querySelector("#selectMethod .next_button"),u=function(e){""===a.value?(s.style.pointerEvents="none",s.style.opacity=0):(s.style.pointerEvents="auto",s.style.opacity=1)};a.addEventListener("change",u),a.addEventListener("input",u);var d=document.querySelector("#selectMethod .prev_button"),h=function(t){""===e.value?(d.style.pointerEvents="none",d.style.opacity=0,i.classList.add("pulse")):(d.style.pointerEvents="auto",d.style.opacity=1,i.classList.remove("pulse"))};e.addEventListener("change",h),e.addEventListener("input",h),document.querySelector('#selectMethod input[type="reset"]').addEventListener("click",(function(t){e.value="",a.value="",n.value="",o.value="",e.dispatchEvent(new Event("change",{bubbles:!0})),a.dispatchEvent(new Event("change",{bubbles:!0})),n.dispatchEvent(new Event("change",{bubbles:!0})),o.dispatchEvent(new Event("change",{bubbles:!0})),e.focus()})),t("click","#searchResults li.result",(function(t){e.value=t.target.innerText,a.value=t.target.dataset.notation,n.value=t.target.dataset.stage,o.value=t.target.dataset.ruleoffs,e.dispatchEvent(new Event("change",{bubbles:!0})),a.dispatchEvent(new Event("change",{bubbles:!0})),n.dispatchEvent(new Event("change",{bubbles:!0})),o.dispatchEvent(new Event("change",{bubbles:!0})),l.style.display="none"})),t("click","#searchResults li.close",(function(e){l.style.display="none"}))}))}(e,n),o=s={bellToCharMap:["1","2","3","4","5","6","7","8","9","0","E","T","A","B","C","D","F","G","H","J","K","L","M","N","P","Q","R","S","U","V","W","Y","Z"],bellToChar:function(e){return s.bellToCharMap[parseInt(e,10)]},charToBell:function(e){var t=parseInt(e,10);if(isNaN(t)||0===t){if(-1===(t=s.bellToCharMap.indexOf(e)))return null}else--t;return t},expand:function(e,t){var n,a,o;if(n=e.toUpperCase().replace(/X/g,"x").replace(/[{<].*[}>]/,"").replace(/ FCH.*$/,"").replace(/\.?x\.?/g,"x").trim(),void 0===t&&(t=Math.max.apply(Math,e.replace(/( HL |LH|LE)/g,"").split("").map(s.charToBell))+1),o=s.bellToChar(t-1),null!==(a=n.match(/^([^-]+)-([^-\.,x]+)$/))&&(n=s.expandHalf(a[1])+a[2]),-1!==(n=n.replace(/-/g,"x")).indexOf(" HL ")&&(n=n.replace(" HL ",".")),null!==(a=n.match(/^&?(.*)(LH|LE)/))&&(n=n.replace(a[0],s.expandHalf(a[1]))),-1!==n.indexOf(",")){var r=n.split(",").map((function(e){return e.trim()}));r.reduce((function(e,t){return e&&("&"==t.charAt(0)||"+"==t.charAt(0))}),!0)&&(n=r.reduce((function(e,t){return e+"."+("&"==t.charAt(0)?s.expandHalf(t):t.replace("+",""))}),""))}return null!==(a=n.match(/^\s*&?\s*(.*),(.*)/))&&(n=(s.expandHalf(a[1])+"."+s.expandHalf(a[2])).replace(/\.?x\.?/g,"x")),null!==(a=(n=n.replace(/\+/g," ")).match(/^([A-S]{1}[1-9]?)\s+(.*)$/))&&(t%2==0?/^[A-F]{1}/.test(a[1])?n=a[2]+" 12":/^[G-M]{1}/.test(a[1])?n=a[2]+" 1"+o:/^[P-Q]{1}/.test(a[1])&&(n=0===a[2].indexOf("3")?a[2]:"3"+o+" "+a[2]):n=/^[A-F]{1}/.test(a[1])?0===a[2].indexOf("3")?a[2]:"3 "+a[2]:/^[G-M]{1}/.test(a[1])?0===a[2].indexOf(o)?a[2]:o+" "+a[2]:/^[P-Q]{1}/.test(a[1])?a[2]+" 12"+o:a[2]+" 1"),null!==(a=n.match(/^(.*)Z\s+(.*)$/))&&(n=a[2]+" "+a[1]),null!==(a=n.match(/^&(.*)\s+([^x.]+)$/))&&(n=s.expandHalf(a[1])+" "+a[2]),n=n.replace(/\s+/g,".").replace(/(^\.+|\.+$)/g,"").replace(/\.+/g,".").replace(/\.?x\.?/g,"x"),n=s.explode(n).map((function(e){if("x"===e)return t%2==0?"x":o;if(null===e.match(/[A-Z\d]+/g))return"";var n=e.match(/[A-Z\d]+/g).join("").split("").map(s.charToBell).sort((function(e,t){return e-t}));return(n[0]+1)%2==0&&(e="1"+e),(t%2==0?(n[n.length-1]+1)%2!=0:(n[n.length-1]+1)%2==0)&&(e+=o),e=[].concat.apply([],e.replace(/\(/g,"~(").replace(/\)/g,")~").replace(/\[/g,"~[").replace(/\]/g,"]~").split("~").filter((function(e){return""!==e})).map((function(e){return"("==e.charAt(0)||"["==e.charAt(0)?{sort:Math.max.apply(Math,e.split("").map(s.charToBell)),value:e}:e.split("").map((function(e){return{sort:s.charToBell(e),value:e}}))}))).sort((function(e,t){return e.sort-t.sort})).map((function(e){return e.value})).join("")})).join(".").replace(/\.?x\.?/g,"x")},expandHalf:function(e){var t,n=(e=e.replace(/^&/,"")).split("").reverse().join("").replace(/\)(.+?)\(/g,(function(e,t){return"("+t+")"})).replace(/\](.+?)\[/g,(function(e,t){return"["+t.split("").reverse().join("")+"]"})),a=-1===n.indexOf(".")?9999:n.indexOf("."),o=-1===n.indexOf("x")?9999:n.indexOf("x");return a<0&&o<0?e:(t=a<0||o<a?0===o?1:o:a,(e+n.substring(t)).replace(/\.?(x|-)\.?/g,"x").trim())},parse:function(e,t){var n,a,o,r,i=[],l=this.explode(e),c=new Array(t);for(n=0;n<t;n+=2)c[n]=n+1,c[n+1]=n;for(n-1===t&&(c[n-1]=n-1),n=0;n<l.length;n++)if("x"===l[n])i.push(c);else{var s=new Array(t),u=l[n].split("");for(a=0;a<u.length;a++)if("("===u[a]){var d=this.charToBell(u[a+1]),h=this.charToBell(u[a+2]);if(s[h]=d,d<h)for(o=d;o<h;o++)s[o]=o+1;else for(o=d;o>h;o--)s[o]=o-1;a+=3}else if("["===u[a]){++a,o=u.indexOf("]",a),r=0;for(var f=Math.min.apply(Math,u.slice(a,o).map(this.charToBell));a<o;)s[f+r]=this.charToBell(u[a]),++a,++r}else{var p=this.charToBell(u[a]);s[p]=p}for(a=0;a<t;a++)void 0===s[a]&&(void 0===s[a+1]&&a+1<t?(s[a]=a+1,s[a+1]=a,a++):s[a]=a);i.push(s)}return i},implode:function(e){return"function"==typeof e.join?e.join(".").replace(/\.?x\.?/g,"x"):e},explode:function(e){return"string"==typeof e?e.replace(/x/gi,".x.").split(".").filter((function(e){return""!==e})):e},rounds:function(e){for(var t=new Array(e),n=e;n--;)t[n]=n;return t},backRounds:function(e){return s.rounds(e).reverse()},queens:function(e){if(e<4)throw null;if(e%2==1)return s.queens(e+1).slice(1).map((function(e){return--e}));for(var t=new Array(e),n=e,a=Math.ceil(e/2);n-- >a;)t[n]=1+2*(n-a);do{t[n]=2*n}while(n--);return t},kings:function(e){var t=Math.floor(e/2),n=s.queens(e);return n.slice(0,t).reverse().concat(n.slice(t))},tittums:function(e){if(e%2==1)return s.tittums(e+1).slice(1).map((function(e){return--e}));for(var t=new Array(e),n=e,a=Math.floor(e/2);n--;)t[n]=Math.ceil(n/2)+(n%2==0?0:a);return t},whittingtons:function(e){if(e<6)throw null;if(e%2==1)return s.whittingtons(e+1).slice(1).map((function(e){return--e}));for(var t=new Array(e),n=e,a=Math.floor(e/2);n-- >e-3;)t[n]=1+2*(n-a);for(t[n]=t[n+1]-1,t[--n]=t[n+1]+2,n&&(t[--n]=t[n+1]+2);n--;)t[n]=n;return t},rowsEqual:function(e,t){var n=e.length;if(n!==t.length)return!1;for(;n--;)if(e[n]!==t[n])return!1;return!0},allRows:function(e,t){for(var n=[t],a=0,o=e.length;a<o;)n.push(this.apply(e[a],n[a])),++a;return n},apply:function(e,t){var n;if("function"==typeof e[0].forEach)return n=t,e.forEach((function(e){n=this.apply(e,n)}),this),n;var a=e.length,o=t.length;for(n=new Array(o);o-- >a;)n[o]=t[o];do{n[o]=t[e[o]]}while(o--);return n},cycles:function(e){for(var t,n,a=[],o=e.length,r=this.rounds(o);o--;)if(-1!==r[o]){for(t=[r[o]],n=e;n[o]!==r[o];n=this.apply(e,n))t.push(n[o]),r[n[o]]=-1;r[o]=-1,a.push(t)}return a},huntBells:function(e,t){for(var n=this.rounds(t),a=this.apply(e,n),o=[],r=0;r<t;++r)n[r]===a[r]&&o.push(r);return o}},(u=function(e){var t=location.href.replace(/^.*?(\?|$)/,""),n="number"==typeof e.scale?e.scale:-1!==t.indexOf("scale=")?parseInt(t.replace(/^.*scale=(.*?)(&.*$|$)/,"$1")):"number"==typeof window.devicePixelRatio?window.devicePixelRatio:1,a=document.createElement("canvas");return a.setAttribute("id",e.id),a.setAttribute("width",e.width*n),a.setAttribute("height",e.height*n),a.style.width=e.width+"px",a.style.height=e.height+"px",this.width=e.width,this.height=e.height,this.element=a,this.context=a.getContext("2d"),this.scale=n,1!==n&&this.context.scale(n,n),this.context.setLineDash||(this.context.setLineDash=function(){}),this.context.fillText||(this.context.fillText=function(){}),this}).prototype={type:"canvas"},l=function(e,t){return function(n,a,o){void 0===o&&(o="0");var r=t.getCache("Offset."+a+o);if(null===r){var i=new e({id:"metric"+Math.floor(100*Math.random()+1),width:3*n,height:3*n,scale:"number"==typeof window.devicePixelRatio?Math.round(8*window.devicePixelRatio):8});if(!1!==i)try{var l=i.context;l.font=a,l.textAlign="center",l.textBaseline="middle",l.fillStyle="#F00",l.fillText(o,1.5*n,1.5*n);var c,s,u=3*n*i.scale,d=l.getImageData(0,0,u,u),h=!1,f=!1,p=!1,m=!1;for(c=0;!1===f&&c<u;++c)for(s=0;s<u;++s)if(d.data[c*(4*u)+4*s]>0){f=c;break}for(c=u;!1===h&&c>0;--c)for(s=0;s<u;++s)if(d.data[c*(4*u)+4*s]>0){h=c+1;break}for(s=0;!1===p&&s<u;++s)for(c=0;c<u;++c)if(d.data[c*(4*u)+4*s]>0){p=s;break}for(s=u;!1===m&&s>0;--s)for(c=0;c<u;++c)if(d.data[c*(4*u)+4*s]>0){m=s+1;break}r={x:Math.round(1e3*(u-m-p)/(2*i.scale))/1e3,y:Math.round(1e3*(u-h-f)/(2*i.scale))/1e3},t.setCache("Offset."+a+o,r)}catch(e){r.x=r.y=0}i=null}return r}}(r=u,function(){var e="mt_",t=document.getElementsByTagName("html")[0].getAttribute("data-age"),n={age:parseInt(t),getItem:function(t){return JSON.parse(localStorage.getItem(e+t))},setItem:function(t,n){localStorage.setItem(e+t,JSON.stringify(n))},removeItem:function(t){localStorage.removeItem(e+t)},clear:function(){localStorage.clear()},getCache:function(e){return n.getItem("cache_"+e)},setCache:function(e,t){n.setItem("cache_"+e,t)},removeCache:function(e){n.removeItem("cache_"+e)}},a=new RegExp("(^mt_cache_.*|^mt_Offset.*|^mt_Width.*)");n.clearCache=function(){for(var e,t=[],n=0;n<localStorage.length;++n)null!==(e=localStorage.key(n)).match(a)&&t.push(e);t.forEach((function(e){localStorage.removeItem(e)}))},n.getSetting=function(e,t){var a=n.getItem("setting_"+e);return null===a?t:a},n.setSetting=function(e,t){n.setItem("setting_"+e,t)},n.removeSetting=function(e){n.removeItem("setting_"+e)};var o=new RegExp("^mt_setting_.*");n.clearSettings=function(){for(var e,t=[],n=0;n<localStorage.length;++n)null!==(e=localStorage.key(n)).match(o)&&t.push(e);t.forEach((function(e){localStorage.removeItem(e)}))};var r=n.getItem("cacheAge");return null===r&&(r=0),r<n.age&&(n.clearCache(),n.setItem("cacheAge",n.age)),n}()),c=function(e,t,n){return function(a){var o="string"==typeof a.container?document.getElementById(a.container):a.container,r=parseInt(a.stage),i="string"==typeof a.notation?e.parse(e.expand(a.notation,r),r):a.notation,l="string"==typeof a.startRow?a.startRow.split("").map(e.charToBell):"object"==typeof a.startRow?a.startRow.slice(0):e.rounds(r),c="string"==typeof a.finishRow?a.finishRow.split("").map(e.charToBell):"object"==typeof a.finishRow?a.finishRow.slice(0):"number"==typeof a.finishRow?Math.floor(a.finishRow):e.rounds(r),s=a.following;"boolean"!=typeof a.score&&(a.score=!1),"boolean"!=typeof a.introduction&&(a.introduction=!1),"boolean"!=typeof a.autostart&&(a.autostart=!1),"[object Array]"!==Object.prototype.toString.call(a.buttons)&&(a.buttons=[]),"boolean"!=typeof a.thatsAll&&"string"!=typeof a.thatsAll&&(a.thatsAll=!1),"boolean"==typeof a.hbIndicator&&(a.hbIndicator=0|a.hbIndicator),1!==a.hbIndicator&&-1!==a.hbIndicator&&(a.hbIndicator=0);var u="number"==typeof a.width?a.width:o.offsetWidth,d=("number"==typeof a.height?a.height:o.offsetHeight)-30,h=Math.min(20,(u-40)/r),f=h,p=(u-(r-1)*h)/2,m=Math.floor(Math.max(0,p-h/3)),v=Math.floor(Math.min((r-1)*h+2*h/3+4,u-m));o.innerHTML="";var g=new t({id:"practice_canvas",width:u,height:d});o.appendChild(g.element);var b,y,x,w=function(){var e=document.createElement("div");e.className="practice_scoreboard",o.appendChild(e);var t=0,n=0;return{element:e,show:function(){a.score&&(e.className="practice_scoreboard visible")},hide:function(){e.className="practice_scoreboard"},reset:function(){t=n=0,e.innerHTML="Changes: "+t+"<br/>Errors: "+n},score:function(){return Math.max(0,Math.round(100-100*n/t))+"%"},correct:function(){t++,e.innerHTML="Changes: "+t+"<br/>Errors: "+n},error:function(){n++,e.innerHTML="Changes: "+t+"<br/>Errors: "+n}}}(),E=(b={},["left","down","right"].forEach((function(e){b[e]=document.createElement("div"),b[e].className="practice_errorFlash_"+e,o.appendChild(b[e])})),function(e){b[e].className="practice_errorFlash_"+e,setTimeout((function(){b[e].className="error practice_errorFlash_"+e}),50)}),M=function(){var e=document.createElement("div");e.className="practice_pause",o.appendChild(e);var t=function(){X=!1,Z=!0,_.show(),M.hide(),w.hide(),I.deactivate()};return e.addEventListener("click",t),"boolean"==typeof document.hidden&&document.addEventListener("visibilitychange",(function(){!0===document.hidden&&X&&t()}),!1),{element:e,show:function(){e.className="practice_pause visible"},hide:function(){e.className="practice_pause"}}}(),_=function(){var e=document.createElement("div");if(e.className="practice_buttons visible",o.appendChild(e),"string"==typeof a.title&&""!==a.title){var t=document.createElement("h1");t.appendChild(document.createTextNode(a.title)),e.appendChild(t)}else e.style.height="50px";var n=function(){X||(X=!0,Z=!1,_.hide(),M.show(),I.activate(),w.show(),g.element.className="visible",ee())};a.buttons.unshift({text:"Start",callback:function(){Q(),n()}}),a.buttons.unshift({text:"Resume",callback:n});var r=a.buttons.map((function(t){var n=document.createElement("input");return n.value=t.text,n.type="button",n.className="string"==typeof t.className?t.className:"",e.appendChild(n),n.addEventListener("click",t.callback),n}));return{element:e,show:function(){D>0&&(r[1].value="Restart",r[0].style.display="inline-block"),(0===D||G)&&(r[0].style.display="none"),e.className="practice_buttons visible"},hide:function(){r.forEach((function(e){e.blur()})),e.className="practice_buttons"}}}(),I=((y=document.createElement("div")).className="practice_controls",o.appendChild(y),{element:y,deactivate:function(){y.className="practice_controls"},activate:function(){y.className="practice_controls active"}}),S=(x={},["left","down","right"].forEach((function(e){x[e]=document.createElement("div"),x[e].className="practice_controls_"+e,I.element.appendChild(x[e])})),function(e,t){x[e].className="practice_controls_"+e,setTimeout((function(){x[e].className=t+" practice_controls_"+e}),50)});if(a.hbIndicator)var T=function(e){var a=new t({id:"cc"+e,width:16,height:16}),o=a.context,r=n(16,"12px Roboto, sans-serif",e);return o.fillStyle="#999",o.textAlign="center",o.textBaseline="middle",o.font="12px Roboto, sans-serif",o.fillText(e,8+r.x,8+r.y),p-h-8<m&&(v=Math.floor(v+m-(p-h-8)),m=Math.floor(Math.max(0,p-h-8))),a},k=T("H"),N=T("B");if("object"==typeof a.placeStarts)var A=function(){var o,i=new t({id:"cc0",width:22*r,height:22}),l=i.context,c=n(16,"12px Roboto, sans-serif","0");l.strokeStyle=a.lines[s].color,l.fillStyle="#333",l.lineWidth=1.5,l.setLineDash([]),l.font="12px Roboto, sans-serif",l.textAlign="center",l.textBaseline="middle";for(var u=0;u<r;++u)o=22*(u+.5),11,l.fillText(e.bellToChar(u),o+c.x,11+c.y),l.beginPath(),l.arc(o,11,8,0,2*Math.PI,!0),l.closePath(),l.stroke();return v=Math.floor(Math.max(v,p+r*h+16-m)),i}();var L=function(){var n=new t({id:"cc1",width:u,height:22}),a=n.context;a.fillStyle="#999",a.textAlign="center",a.textBaseline="middle",a.font="12px Roboto, sans-serif";for(var o=0;o<r;++o)a.fillText(e.bellToChar(o),p+o*h,11);return n}();if(a.introduction)var R=function(){var e=new t({id:"cc2",width:u,height:90}),n=e.context;n.strokeStyle="rgba(255,255,255,0.8)",n.lineWidth=6,n.textAlign="center",n.textBaseline="middle","string"==typeof a.title&&(n.font="14px Roboto, sans-serif",n.fillStyle="#002856",n.strokeText(a.title.toUpperCase(),u/2,10),n.fillText(a.title.toUpperCase(),u/2,10)),n.font="13px Roboto, sans-serif",n.fillStyle="#333",n.strokeText("Use the arrow keys or tap the",u/2,40),n.strokeText("screen to navigate. Press 'Esc'",u/2,55),n.strokeText("or the 'X' above ↗ to pause.",u/2,70),n.fillText("Use the arrow keys or tap the",u/2,40),n.fillText("screen to navigate. Press 'Esc'",u/2,55),n.fillText("or the 'X' above ↗ to pause.",u/2,70);var o=n.measureText("screen to navigate. Press 'Esc'").width;return n.font="14px Roboto, sans-serif",o=Math.max(o,n.measureText(a.title.toUpperCase()).width),Math.floor((u-o)/2)<m&&(v=Math.max(o,v+m-Math.floor((u-o)/2)),m=Math.floor(Math.max(0,(u-o)/2))),v=Math.floor(Math.min(Math.max(v,u-m-(u-o)/2),u-m)),e}();if(a.thatsAll)var B=function(){var e=new t({id:"cc3",width:u,height:40}),n=e.context;n.font="bold 15px Roboto, sans-serif",n.strokeStyle="rgba(255,255,255,0.8)",n.lineWidth=4,n.fillStyle="#333",n.textAlign="center",n.textBaseline="top";var o="string"==typeof a.thatsAll?a.thatsAll:"That's all!";return n.strokeText(o,u/2,0),n.fillText(o,u/2,0),e}(),O=!a.score;var C=function(){var e,n={byRow:[],canvases:[]},o=0,r=/^(\d+)\-(\d+)$/;for(var i in a.messages){i.split(",").forEach((function(e){var t=e.match(r);if(null!==t)for(var a=parseInt(t[1]),i=parseInt(t[2]);a<=i;)n.byRow[a]=o,++a;else isNaN(parseInt(e))||(n.byRow[parseInt(e)]=o)})),n.canvases[o]=new t({id:"ccm"+o,width:u,height:40});var l=n.canvases[o].context;l.font="bold 12px Roboto, sans-serif",l.strokeStyle="rgba(255,255,255,0.8)",l.lineWidth=4,l.fillStyle="#333",l.textAlign="center",l.textBaseline="top",l.strokeText(a.messages[i],u/2,0),l.fillText(a.messages[i],u/2,0),++o,e=l.measureText(a.messages[i]).width,Math.floor((u-e)/2)<m&&(v=Math.max(e,v+m-Math.floor((u-e)/2)),m=Math.floor(Math.max(0,(u-e)/2))),v=Math.floor(Math.min(Math.max(v,u-m-(u-e)/2),u-m))}return n}(),q=function(){var e,n=[];for(var o in a.overlayMessages){n[o]=new t({id:"ccom"+o,width:u,height:f});var r=n[o].context;r.font="bold 12px Roboto, sans-serif",r.strokeStyle="rgba(255,255,255,0.8)",r.lineWidth=4,r.fillStyle="#333",r.textAlign="center",r.textBaseline="middle",r.strokeText(a.overlayMessages[o],u/2,f/2),r.fillText(a.overlayMessages[o],u/2,f/2),++o,e=r.measureText(a.overlayMessages[o]).width,Math.floor((u-e)/2)<m&&(v=Math.max(e,v+m-Math.floor((u-e)/2)),m=Math.floor(Math.max(0,(u-e)/2))),v=Math.floor(Math.min(Math.max(v,u-m-(u-e)/2),u-m))}return n}(),H=[l.slice(0)];if(H.push(e.apply(i[0],H[0])),"number"==typeof c)for(;H.length<=c;)H.push(e.apply(i[(H.length-1)%i.length],H[H.length-1]));else for(;H.length<1e4&&!e.rowsEqual(c,H[H.length-1]);)H.push(e.apply(i[(H.length-1)%i.length],H[H.length-1]));var j,P,D,W,U,$,F,J=g.context,X=!1,Z=!1,G=!1,Q=function(){j=H[0].indexOf(s),P=H[1].indexOf(s),D=0,W=0,U=d/2,$=null,F=0,w.reset(),O=!1,G=!1};Q();var z=function(e){X&&(j=P,W++,F=D,a.score&&w.correct(),S(e,"success"),W+2>H.length?(X=!1,G=!0,_.show(),M.hide(),w.hide(),I.deactivate()):P=H[W+1].indexOf(s))},Y=function(e){S(e,"error"),E(e),a.score&&w.error(),"object"==typeof Android&&Android.buzz()},K=250,V=function(e){var t=!1;if(null===$&&($=e,t=!0),!Z){if(D<W){var n=Math.min(W-D,($-e)/K*((e-$)/K-2)*(W-F));D=Math.min(W,D+n),U+=n*f,t=!0}U>d/2&&(U=Math.min(d-28-(C.byRow.length>0?20:0),Math.max(d/2,U-Math.max(.05,d/(10*K)*(e-$)*Math.pow((U-d/2)/(d/2),2)))),t=!0),t&&ee()}$=e,window.requestAnimationFrame(V)};window.requestAnimationFrame(V);var ee=function(){var e,t,n,o,i,l,c,g,b=Math.ceil(D),y=Math.floor(D);for(J.clearRect(m,0,v,d),J.strokeStyle="#BBB",J.lineWidth=.5,J.setLineDash([4,3]),J.lineCap="butt",J.beginPath(),e=0;e<r;++e)J.moveTo(p+e*h,(U-D*f)%7),J.lineTo(p+e*h,d-22);if(J.stroke(),J.drawImage(L.element,0,d-22,u,22),"object"==typeof a.ruleOffs)for(o=1,J.lineWidth=1,J.setLineDash([3,1]),e=X?y+1:y;o>0&&e>0;--e)o=U-(y-e+D%1+.5)*f,(e-a.ruleOffs.from)%a.ruleOffs.every==0&&(J.strokeStyle=e==y+1?"rgba(153,153,153,"+Math.round(D%1*10)/10+")":"#999",J.beginPath(),J.moveTo(p-h/3,o),J.lineTo(p+(r-1)*h+h/3,o),J.stroke());if("object"==typeof a.placeStarts)for(n=p+r*h+5,o=1,e=X?b:b-(a.thatsAll?1:0);o>0&&e>=0;--e)o=U-(y-e+D%1+.5)*f,(e-a.placeStarts.from)%a.placeStarts.every==0&&(e==y+1&&(J.globalAlpha=D%1),J.drawImage(A.element,Math.floor(22*H[e].indexOf(s)*A.scale),0,Math.floor(22*A.scale),Math.floor(22*A.scale),n-11,o-11,22,22),e==y+1&&(J.globalAlpha=1));(U-D*f>0&&a.introduction&&J.drawImage(R.element,0,U-D*f-120,u,90),G&&D>1&&a.thatsAll&&(!O&&a.score&&(B.context.clearRect(0," "===a.thatsAll?0:15,u,15),B.context.font="13px Roboto, sans-serif",B.context.fillText("Score: "+w.score(),u/2," "===a.thatsAll?5:20),O=!0),o=U+(1-(D%1==0?1:D%1))*f+20,J.globalAlpha=D%1==0?1:D%1,J.drawImage(B.element,0,o,u,40),J.globalAlpha=1),0!==a.hbIndicator)&&(y%2==0&&1===a.hbIndicator||y%2==1&&-1===a.hbIndicator?(c=k.element,g=N.element):(g=k.element,c=N.element),D%1==0?J.drawImage(g,p-h-8,U-8,16,16):D%1>.66?J.drawImage(c,p-h-8,U-8,16,16):(J.globalAlpha=D%1/.66,J.drawImage(c,p-h-8,U-8,16,16),J.globalAlpha=1-D%1/.66,J.drawImage(g,p-h-8,U-8,16,16),J.globalAlpha=1));if(D>0)for(J.setLineDash([]),J.lineCap="round",J.lineJoin="round",e=0;e<a.lines.length;++e)if(null!==a.lines[e]&&"string"==typeof a.lines[e].color){for(i=H[y].indexOf(e),l=H[b].indexOf(e),n=p+h*(D==b?l:i+D%1*(l-i)),o=U,J.strokeStyle=a.lines[e].color,J.lineWidth=a.lines[e].width,J.beginPath(),J.moveTo(n,o),n=p+h*(D==b?l:i),o-=(D-y)*f,J.lineTo(n,o),t=1;void 0!==H[y-t]&&o>0;t++)n=p+h*H[y-t].indexOf(e),o-=f,J.lineTo(n,o);J.stroke()}if(i=H[y].indexOf(s),l=H[b].indexOf(s),n=p+h*(D==b?l:i+D%1*(l-i)),o=U,J.fillStyle=a.lines[s].color,J.beginPath(),J.arc(n,o,4,0,2*Math.PI,!0),J.closePath(),J.fill(),C.byRow.length>0&&(void 0!==C.byRow[y]||void 0!==C.byRow[b])&&(C.byRow[b]===C.byRow[y]?J.drawImage(C.canvases[C.byRow[y]].element,0,U+15,u,40):(void 0!==C.byRow[b]&&(J.globalAlpha=D%1,J.drawImage(C.canvases[C.byRow[b]].element,0,U+15,u,40)),void 0!==C.byRow[y]&&(J.globalAlpha=1-D%1,J.drawImage(C.canvases[C.byRow[y]].element,0,U+15,u,40)),J.globalAlpha=1)),q.length>0){var x=Math.max(0,Math.floor((D*f-U)/f)),E=Math.ceil(Math.min(D+3,(d-U+D*f)/f));for(e=x;e<E;++e)void 0!==q[e]&&(e+1>=E&&D%1>0?(J.globalAlpha=D%1,J.drawImage(q[e].element,0,U-(1.5+D-e)*f,u,f),J.globalAlpha=1):J.drawImage(q[e].element,0,U-(1.5+D-e)*f,u,f))}},te=function(){X&&(P-j<=-1?z("left"):Y("left"))},ne=function(){X&&(P-j==0?z("down"):Y("down"))},ae=function(){X&&(P-j>=1?z("right"):Y("right"))};document.body.addEventListener("keydown",(function(e){if(X)switch(e.key){case"ArrowLeft":e.preventDefault(),te();break;case"ArrowDown":e.preventDefault(),ne();break;case"ArrowRight":e.preventDefault(),ae();break;case"Shift":K=2500;break;case"Escape":case" ":e.preventDefault(),M.element.dispatchEvent(new Event("click"))}})),document.body.addEventListener("keyup",(function(e){if(X&&"Shift"===e.key)K=250})),o.addEventListener("touchstart",(function(e){var t=e.touches[0],n=o.getBoundingClientRect(),a=(t.clientX-n.left)/n.width;X&&t.pageY-n.top>30&&(e.preventDefault(),a<=.33?te():a>=.66?ae():ne())})),o.addEventListener("click",(function(e){var t=e.target.className.split(/\s+/);-1!==t.indexOf("practice_controls_left")?te():-1!==t.indexOf("practice_controls_down")?ne():-1!==t.indexOf("practice_controls_right")&&ae()})),a.autostart&&!X&&(X=!0,Z=!1,Q(),_.hide(),M.show(),I.activate(),w.show(),g.element.className="visible",ee())}}(o,r,l),function(e,t,n){e((function(){document.getElementById("go").addEventListener("click",(function(e){var a,o=document.getElementById("practice_container");o.innerHTML="",o.replaceWith(o.cloneNode(!0));var r=document.getElementById("practice_chooser_name").value,i=document.querySelector("#practice_chooser_leadOrCourse li.active input").value,l=parseInt(document.getElementById("practice_chooser_stage").value,10),c=n.parse(n.expand(document.getElementById("practice_chooser_notation").value,l),l),s=parseInt(practice_chooser_bell.querySelector("li.active input").value,10)-1,u={};try{u=JSON.parse(document.getElementById("practice_chooser_ruleOffs").value)}catch(e){u={from:0,every:c.length}}var d=new Array(l),h=n.huntBells(c,l);for(a=0;a<l;++a)-1!==h.indexOf(a)?d[a]={color:"#D11",width:2}:d[a]=null;d[s]={color:-1!==h.indexOf(s)?"#D11":"#11D",width:4};new t({container:"practice_container",title:r,stage:l,notation:c,following:s,lines:d,ruleOffs:u,introduction:!0,score:!0,thatsAll:"course"===i?"That's all!":" ",finishRow:"course"!==i&&c.length,placeStarts:{from:0,every:c.length},autostart:!0,buttons:[{text:"↑ Exit",className:"plain",callback:function(){document.querySelector("#tutor .prev_button button").dispatchEvent(new Event("click",{bubbles:!0}))}}]})}))}))}(e,c,o),function(e,t,n){e((function(){t.load(),n.read()}))}(e,t,a)}();