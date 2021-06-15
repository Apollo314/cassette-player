(function(e){function t(t){for(var r,c,i=t[0],u=t[1],l=t[2],d=0,p=[];d<i.length;d++)c=i[d],Object.prototype.hasOwnProperty.call(a,c)&&a[c]&&p.push(a[c][0]),a[c]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);s&&s(t);while(p.length)p.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,i=1;i<n.length;i++){var u=n[i];0!==a[u]&&(r=!1)}r&&(o.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},a={app:0},o=[];function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/cassette-player/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],u=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var s=u;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"4a2f":function(e,t,n){e.exports=n.p+"img/cassette_case_lowres.505e4566.png"},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23");function a(e,t){var n=Object(r["v"])("router-view");return Object(r["q"])(),Object(r["e"])(n)}n("f159");const o={};o.render=a;var c=o,i=n("6c02"),u={class:"home"};function l(e,t,n,a,o,c){var i=Object(r["v"])("Casette");return Object(r["q"])(),Object(r["e"])("div",u,[Object(r["h"])("div",null,[Object(r["h"])(i)])])}n("b0c0");var s=n("f753"),d=n.n(s),p=n("4a2f"),f=n.n(p),h={style:{display:"flex","justify-content":"center"}},b={style:{"border-radius":"5px","max-width":"500px",width:"100%","min-height":"80px",background:"#999",padding:"5px 0px"}},j={style:{padding:"0 10px",display:"flex","justify-content":"space-between"}},O={style:{"flex-grow":"1","text-align":"left","z-index":"99"}},v={style:{margin:"4px 0"}},y={style:{margin:"4px 0","z-index":"99"}},m={key:0},g=Object(r["h"])("p",null,"Drop audio files here or click to add them.",-1),x=Object(r["h"])("p",null,"They won't be uploaded anywhere.",-1),w={style:{padding:"0 10px"}},_=Object(r["h"])("div",{style:{"border-radius":"10px",overflow:"hidden"}},null,-1),k={key:0,style:{position:"absolute",display:"flex",color:"#fff","z-index":"999","align-items":"center",height:"100%"}},P={id:"leftSpoolContainer"},S=Object(r["h"])("img",{class:"cassette",src:d.a},null,-1),M={id:"rightSpoolContainer"},C=Object(r["h"])("img",{src:d.a},null,-1),I=Object(r["h"])("div",{id:"cassetteCase"},[Object(r["h"])("img",{src:f.a})],-1);function T(e,t,n,a,o,c){return Object(r["q"])(),Object(r["e"])(r["a"],null,[Object(r["h"])("div",h,[Object(r["h"])("div",b,[(Object(r["q"])(!0),Object(r["e"])(r["a"],null,Object(r["u"])(a.audioFiles,(function(e,t){return Object(r["q"])(),Object(r["e"])("div",{onClick:function(e){return a.handlePlay(t)},style:[{color:"#000",cursor:"pointer",position:"relative"},t==a.selectedIndex?{background:"#27272f",color:"#fff"}:{}],class:"music-row"},[a.selectedIndex==t?(Object(r["q"])(),Object(r["e"])("div",{key:0,style:[{position:"absolute",height:"100%",background:"#0d5240"},{width:"".concat(a.currentTime/e.duration*100,"%")}]},null,4)):Object(r["f"])("",!0),Object(r["h"])("div",j,[Object(r["h"])("div",O,[Object(r["h"])("p",v,Object(r["x"])(parseInt(t)+1)+" - "+Object(r["x"])(e.name),1)]),Object(r["h"])("p",y,[t==a.selectedIndex?(Object(r["q"])(),Object(r["e"])("span",m,Object(r["x"])(a.formatTime(a.currentTime))+" / ",1)):Object(r["f"])("",!0),Object(r["g"])(Object(r["x"])(a.formatTime(e.duration)),1)])])],12,["onClick"])})),256)),Object(r["h"])("input",{ref:"audioInput",onChange:t[1]||(t[1]=function(){return a.onFileChange&&a.onFileChange.apply(a,arguments)}),type:"file",name:"files",style:{display:"none"},accept:"audio/*",multiple:""},null,544),Object(r["h"])("div",{class:"drop-zone",onDrop:t[2]||(t[2]=Object(r["D"])((function(){return a.dropHandler&&a.dropHandler.apply(a,arguments)}),["prevent"])),onDragenter:t[3]||(t[3]=Object(r["D"])((function(){}),["prevent"])),onDragover:t[4]||(t[4]=Object(r["D"])((function(){}),["prevent"])),onClick:t[5]||(t[5]=function(t){return e.$refs.audioInput.click()})},[g,x],32),Object(r["C"])(Object(r["h"])("div",w,[Object(r["h"])("audio",{onTimeupdate:t[6]||(t[6]=function(e){return a.currentTime=Math.min(e.target.currentTime,a.audioFiles[a.selectedIndex].duration)}),onEnded:t[7]||(t[7]=function(){return a.playNext&&a.playNext.apply(a,arguments)}),onCanplay:t[8]||(t[8]=function(){return a.canPlay&&a.canPlay.apply(a,arguments)}),ref:"audioPlayer",controls:"",style:{width:"100%"}},null,544)],512),[[r["z"],a.showControls]])]),_]),Object(r["h"])("div",{style:[{position:"relative",display:"flex","justify-content":"center"},{height:"".concat(a.cassetteHeight,"px")}]},[Object(r["h"])(r["b"],{name:"fade"},{default:Object(r["B"])((function(){return[a.showPlayButton?(Object(r["q"])(),Object(r["e"])("div",k,[Object(r["h"])("div",{class:"playButton",onClick:t[9]||(t[9]=function(e){return a.handlePlay(0)})},"▶")])):Object(r["f"])("",!0)]})),_:1}),Object(r["h"])("div",{id:"cassette",style:[{width:"0",height:"0","margin-top":"10px"},a.cassetteStyle]},[Object(r["h"])("div",P,[Object(r["h"])("div",{id:"leftSpool",style:a.leftSpoolStyle},[S],4)]),Object(r["h"])("div",M,[Object(r["h"])("div",{id:"rightSpool",style:a.rightSpoolStyle},[C],4)]),I],4)],4)],64)}var D=n("2909"),R=n("1da1"),q=n("d4ec"),H=n("bee2"),z=(n("96cf"),n("99af"),n("07ac"),n("159b"),n("d3b7"),n("3ca3"),n("ddb0"),n("2b3d"),47.6),E=10.95,F=128552.95350887459,W=.0112,B=1169,L=E+B*W,N=function(){function e(t){Object(q["a"])(this,e),this.time=t}return Object(H["a"])(e,[{key:"left_spool_radius",get:function(){return e.root([Math.PI,0,-Math.PI*Math.pow(L,2)+this.time*z*W])}},{key:"right_spool_radius",get:function(){return e.root([Math.PI,0,-Math.PI*Math.pow(E,2)-this.time*z*W])}},{key:"left_spool_rotation",get:function(){return(L-this.left_spool_radius)/W}},{key:"right_spool_rotation",get:function(){return(this.right_spool_radius-E)/W}}],[{key:"root",value:function(e){return(-e[1]+Math.sqrt(Math.pow(e[1],2)-4*e[0]*e[2]))/2/e[0]}}]),e}(),J={casetteWidth:787,casetteHeight:500,leftSpoolPos:[227,222],rightSpoolPos:[555,222],spoolRadius:366},U={setup:function(e){var t=Object(r["t"])(null),n=Object(r["t"])({}),a=(Object(r["t"])(),Object(r["t"])(null)),o=Object(r["t"])(null),c=Object(r["t"])(!1),i=Object(r["t"])(0),u=Object(r["s"])({scale:Math.min(document.documentElement.clientWidth-40,560)/J.casetteWidth}),l=Object(r["c"])((function(){return{transform:"scale(".concat(u.scale,") translateX(").concat(-J.casetteWidth/2,"px)")}})),s=Object(r["s"])({radius:L,rotation:0}),d=Object(r["c"])((function(){return{width:"".concat(s.radius*J.spoolRadius/L,"px"),height:"".concat(s.radius*J.spoolRadius/L,"px"),transform:"rotate(".concat(s.rotation,"rad)")}})),p=Object(r["s"])({radius:E,rotation:0}),f=Object(r["c"])((function(){return{width:"".concat(p.radius*J.spoolRadius/L,"px"),height:"".concat(p.radius*J.spoolRadius/L,"px"),transform:"rotate(".concat(p.rotation,"rad)")}}));window.addEventListener("resize",(function(){u.scale=Math.min(document.documentElement.clientWidth-40,560)/J.casetteWidth}));var h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;a.value=e,o.value.src=n.value[e].url,o.value.play(),c.value=!0,S.value=!1},b=function(){var e=Object(R["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t=0;case 1:if(!(t<20)){e.next=8;break}return player.value.seekTo(player.value.getCurrentTime()+10),e.next=5,v(16);case 5:t++,e.next=1;break;case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),j=function(e){var t=Object.values(n.value).length;e.forEach((function(e,r){var a=URL.createObjectURL(e),o=document.createElement("audio");o.src=a,o.addEventListener("loadedmetadata",(function(c){var i={url:a,duration:o.duration,name:e.name,accumulatedDuration:null,size:e.size};n.value[t+r]=i}))})),0==t&&(S.value=!0)},O=function(e){j(t.value.files)};function v(e){return new Promise((function(t){return setTimeout(t,e)}))}var y=!1,m=function(){y||(g(),y=!0)};function g(){return x.apply(this,arguments)}function x(){return x=Object(R["a"])(regeneratorRuntime.mark((function e(){var t,r,c,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t=n.value[a.value],null==t.accumulatedDuration)for(t.accumulatedDuration=0,r=0;r<a.value;r++)t.accumulatedDuration+=n.value[r].duration;c=t.accumulatedDuration+o.value.currentTime||0,c=c%2700*(Math.floor(c/45/60)%2==0)+(2700-c%2700)*!(Math.floor(c/45/60)%2==0),e.prev=5,c=Math.min(c,F/z),i=new N(c),s.radius=i.left_spool_radius,s.rotation=2*i.left_spool_rotation*Math.PI,p.radius=i.right_spool_radius,p.rotation=2*i.right_spool_rotation*Math.PI,e.next=17;break;case 14:e.prev=14,e.t0=e["catch"](5),console.log(e.t0);case 17:return e.prev=17,e.next=20,v(20);case 20:return e.finish(17);case 21:e.next=0;break;case 23:case"end":return e.stop()}}),e,null,[[5,14,17,21]])}))),x.apply(this,arguments)}var w=function(e){var t;return(t=new Date(1e3*e).toISOString()).substr.apply(t,Object(D["a"])(e>=3600?[11,8]:[14,5]))},_=function(){h((parseInt(a.value)+1)%Object.values(n.value).length)},k=function(e){j(e.dataTransfer.files)},P=Object(r["c"])((function(){return J.casetteHeight*u.scale})),S=Object(r["t"])(!1);return{audioPlayer:o,handlePlay:h,selectedIndex:a,onFileChange:O,audioInput:t,audioFiles:n,fastForward:b,cassetteHeight:P,cassetteStyle:l,leftSpoolStyle:d,rightSpoolStyle:f,formatTime:w,showControls:c,currentTime:i,canPlay:m,playNext:_,dropHandler:k,showPlayButton:S}}};n("6357");U.render=T;var X=U,$={name:"Home",components:{Casette:X}};$.render=l;var A=$,G=[{path:"/",name:"Home",component:A}],K=Object(i["a"])({history:Object(i["b"])("/cassette-player/"),routes:G}),Q=K,V=Object(r["d"])(c);V.use(Q),V.mount("#app")},6357:function(e,t,n){"use strict";n("db3c")},d875:function(e,t,n){},db3c:function(e,t,n){},f159:function(e,t,n){"use strict";n("d875")},f753:function(e,t,n){e.exports=n.p+"img/spool_tape_lowres.10d0d68e.png"}});
//# sourceMappingURL=app.a1dbb3ce.js.map