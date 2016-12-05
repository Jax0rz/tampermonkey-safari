Registry.require(["crcrc","helper","layout/default/layout_helper"],function(){var l=Registry.get("crcrc").cr,h=Registry.get("crcrc").crc,q=Registry.get("helper"),u=Registry.get("layout/default/layout_helper").images,n=function(b,a,d){var c=(a.uuid?a.uuid:"")+a.id,e=l("div",a.name,c,"input");e.key=a.id;var f=l("input",a.name,c,"input",!0);b=b.split("##");f.name=a.name;f.uuid=a.uuid;f.key=a.id;f.oldvalue=a.value;f.value=void 0!=a.value?a.value:"";f.type="text";f.setAttribute("spellcheck","false");d&&
!f.inserted&&f.addEventListener("change",d);d=h("span","optiondesc",a.name,c,"s1");c=l("span",a.name,c,"s2");d.textContent=b[0]+":";1<b.length&&(c.textContent=b[1]);e.appendChild(d);e.appendChild(f);e.appendChild(c);a.enabledBy&&e.setAttribute("name","enabled_by_"+a.enabledBy);return{elem:e,input:f}},v=function(b,a,d){b=null;b=h("input","button",a.name,(a.uuid?a.uuid:"")+a.id,"bu",!0);b.name=a.name;b.uuid=a.uuid;b.key=a.id;b.type="button";b.value=a.name;b.data=a.data;b.reload=a.reload;b.ignore=a.ignore||
a.reload;b.warning=a.warning;a.enabledBy&&b.setAttribute("name","enabled_by_"+a.enabledBy);!b.inserted&&d&&b.addEventListener("click",d);return b},w=function(b,a,d,c){var e=null,e=h("input","button",b,a,"bu",!0);e.name=b;e.key=a;e.type="button";e.value=d;!e.inserted&&c&&e.addEventListener("click",c);return e},r=function(b,a){var d=(b.uuid?b.uuid:"")+b.id,c,e;if(e=b.after||b.validation)c=b.validation?"validation":"help",c=h("span",c,b.name,d,c,!0),e.imageURL&&(d=['background-image: url("'+e.imageURL+
'")'],e.opacity&&d.push("opacity: "+e.opacity),c.setAttribute("style",d.join(";"))),c&&(a&&c.addEventListener("click",a),e.msg&&c.setAttribute("title",e.msg));return c},x=function(b){return{"&":"&amp;","<":"&lt;",">":"&gt;"}[b]||b},p=function(b,a,d,c){var e=(c.uuid?c.uuid:"")+c.id;a.title=b;(b=r({after:{imageURL:u.get("help")},name:c.name,id:e}))&&d.appendChild(b)};Registry.register("layout/default/htmlutil","5349",{getInfoFromUrl:function(b){if(-1!=b.search(/\/\^?(http(s|s\?|\.\+)?|\.\*):\/\/(\.\*)*\$?\/?$/)||
-1!=b.search(/htt(ps|p):\/\/(\*\/\*|\*)*$/)||-1!=b.search(/\*:\/\/(\*\/\*|\*)*$/)||"*"==b)return{dom:"*",tld:"*"};0==b.search(/\//)&&(b=b.replace(/\([^\)]*\)[\?|\+|\*|\{[^\}]*]*/g,""),b=b.replace(/\[[^\]]*\][\?|\+|\*|\{[^\}]*]*/g,""),b=b.replace(/^\/|\/$|\^|\$|\\\?.*|#.*|\?|\(|\)|\+|\\|\.\*|/g,""));b=b.replace(/^\*:\/\//,"http://");0!=b.search("http")&&(b="http://"+b);b=b.split("/");if(3>b.length)return null;b=b[2].split(".");if(2>b.length)return null;var a=b[b.length-1],d=b[b.length-2];"*"!==d&&
(d=d.replace(/\*/g,""));for(var c=[],e=b.length-3;0<=e&&-1==b[e].search("\\*");e--)c.push(b[e]);return{tld:a,dom:d,subdom:c.reverse()}},getValue:function(b){var a=b.value;if("native"===b.valtype)if("undefined"===a)a=void 0;else if("null"===a)a=null;else try{a=JSON.parse(a)}catch(d){}return a},safeTagsReplace:function(b){return b.replace(/[&<>]/g,x)},addClass:function(b,a){var d=b.getAttribute("class")||"";-1==d.search(new RegExp("[ \t]*"+a+"[ \t]*"))&&(d=(d?d+" ":"")+a);b.setAttribute("class",d)},
toggleClass:function(b,a){var d=b.getAttribute("class")||"",c=new RegExp("[ \t]*"+a+"[ \t]*"),d=-1!=d.search(c)?d.replace(c,""):(d?d+" ":"")+a;b.setAttribute("class",d)},setHelp:p,createAfterIcon:r,createEnabler:function(b,a,d,c,e){var f=c.disabled,k=c.title,g=c.on||"ON",l=c.off||"OFF",m=h("div","slider-frame enabler "+b,a,d+"slider-frame",c.append,"wrap",!0);b=h("div","slider-button",a,d+"slider-button");c=h("div","on",a,d+"slider-button-enabled");var t=h("div","off",a,d+"slider-button-disbled");
c.textContent=g;t.textContent=l;m.appendChild(b);b.appendChild([c,t]);k&&(m.title=k);m.key=d;m.uuid=a;f||m.addEventListener("click",function(){$(m).hasClass("enabler_enabled")?$(m).removeClass("enabler_enabled"):$(m).addClass("enabler_enabled");e&&window.setTimeout(function(){e.call(m)},100)});return m},createImage:function(b,a,d,c,e,f){c=h("img","icon16",a,d,c,!0);c.setAttribute("src",b);f&&(b=c.getAttribute("class")||"",c.setAttribute("class",b+" clickable"));e&&(c.title=e);c.key=d;c.name=a;c.alt=
" ?";f&&(c.addEventListener("click",f),c.href="#");return c},createFavicon:function(b,a,d,c){var e=h("img","icon16",a,d,q.filter(c,/[a-zA-Z0-9]/g));if(e.inserted)return e;"Array"!==q.toType(b)&&(b=[b]);a=function(){if(0!=b.length){var a=b.shift();e.setAttribute("src",a)}};e.addEventListener("error",a);a();c&&(e.title=c);e.alt=" ?";return e},createFileInput:function(b,a,d){b=h("input","import","file",null,null,!0);b.inserted||(b.type="file",d&&b.addEventListener("change",d));return b},createNamedSettings:function(b,
a,d){var c=(a.uuid?a.uuid:"")+a.id,e=h("div","settingsta",a.name,c,"named_wrapper"),f=h("div","named",a.name,c,"named_settings"),k=[],g=l("span",a.name,c,"s1");b&&(g.textContent=b+":");a.desc&&p(a.desc,g,g,a);e.appendChild(g);e.appendChild(f);e.key=a.id;a.value.forEach(function(b){var e=h("div","",a.name+b.name,c,"named",!0),g=h("div","",a.name+b.name,c,"named_label",!0);g.textContent=b.name;e.appendChild(g);g=l("textarea",a.name+b.name,c,"textarea",!0);g.setAttribute("spellcheck","false");g.name=
a.name;g.key=a.id;g.named_name=b.name;g.uuid=a.uuid;g.named=!0;g.oldvalue=b.value||"";g.value=b.value||"";d&&!g.inserted&&g.addEventListener("change",d);e.appendChild(g);f.appendChild(e);k.push(g)});return{elem:e,textareas:k,label:g}},createTextarea:function(b,a,d){var c=(a.uuid?a.uuid:"")+a.id,e=l("div",a.name,c,"textarea");e.key=a.id;var f=h("textarea","settingsta",a.name,c,"textarea",!0);f.setAttribute("spellcheck","false");f.name=a.name;f.key=a.id;f.uuid=a.uuid;f.array=a.array;f.oldvalue=a.value;
f.value=void 0!=a.value?a.array?a.value.join("\n"):a.value:"";d&&!f.inserted&&f.addEventListener("change",d);d=l("span",a.name,c,"s1");b&&(d.textContent=b+":");a.desc&&p(a.desc,d,d,a);e.appendChild(d);e.appendChild(f);return{elem:e,textarea:f,label:d}},createFileSelect:function(b,a,d){var c=(a.uuid?a.uuid:"")+a.id,e=l("input",a.name,c,"file"),f=function(a){d(a.target.files)};e.inserted||(e.type="file",e.addEventListener("change",f,!1));return b?(f=l("div",a.name,c,"input"),a=l("span",a.name,c,"s1"),
a.textContent=b+":",f.appendChild(a),f.appendChild(e),{elem:f,input:e}):{elem:e}},createInput:n,createColorChooser:function(b,a,d){var c=(a.uuid?a.uuid:"")+a.id;b=n(b,a,d);var e=function(){d&&d.apply(this,arguments);var a=(this.value.match(/[a-fA-F0-9]+/)||"")[0];a&&-1!=[3,6].indexOf(a.length)&&f.setAttribute("style","background-color: #"+a+";")};b.input.inserted||b.input.addEventListener("keyup",e);var f=h("span","color_choosed",a.name,c,"col");b.col=f;b.elem.appendChild(b.col);e.call(b.input);return b},
createPassword:function(b,a,d){b=n(b,a,d);b.input.setAttribute("type","password");return b},createCheckbox:function(b,a,d){var c=(a.uuid?a.uuid:"")+a.id,e=h("div","checkbox",a.name,c,"cb1");e.key=a.id;var f=l("input",a.name,c,"cb",!0);f.title=a.desc?a.desc:"";f.name=a.name;f.uuid=a.uuid;f.key=a.id;f.reload=a.reload;f.warning=a.warning;f.oldvalue=a.enabled;f.checked=a.enabled;f.type="checkbox";f.valtype="boolean";d&&!f.inserted&&f.addEventListener("click",d);d=h("span","checkbox_desc",a.name,c,"cb2");
d.textContent=b;a.desc&&p(a.desc,e,d,a);e.appendChild(f);e.appendChild(d);return{elem:e,input:f}},createDropDown:function(b,a,d,c,e){var f=(a.uuid?a.uuid:"")+a.id,k=l("div",a.name,f,"outer_dd");k.key=a.id;var g=l("select",a.name,f,"dd",!0),n=!1;d&&Object.keys(d).forEach(function(b){var c=l("option",a.name,d[b].name,"dd"+f,!0);c.textContent=q.decodeHtml(d[b].name);c.value=d[b].value;c.warning=d[b].warning;n|=!!d[b].warning;d[b].enabledBy&&c.setAttribute("name","enabled_by_"+d[b].enabledBy);a.enabler&&
d[b].enable&&c.setAttribute("enables",JSON.stringify(d[b].enable));d[b].value==a.value&&(c.selected=!0);g.appendChild(c)});g.key=a.id;g.name=a.name;g.uuid=a.uuid;g.reload=a.reload;g.warning=a.warning;g.oldvalue=a.value;g.valtype="native";g.inserted||(c&&g.addEventListener("change",c),n&&e&&g.addEventListener("change",e));null!==b&&(c=h("span","optiondesc",a.name,f,"inner_dd"),c.textContent=b+": ",k.appendChild(c));k.appendChild(g);a.desc&&p(a.desc,k,k,a);a.enabledBy&&k.setAttribute("name","enabled_by_"+
a.enabledBy);return{elem:k,select:g}},createImageButton:function(b,a,d,c,e){var f=null,k=null,g=null,f=h("button","imgbutton button",b,a,"bu",!0),k=h("div","imgbutton_container",b,a,"bu_container");k.appendChild(f);f.uuid=b;f.key=a;g=h("img","imgbutton_image",b,a,"bu_img",!0);g.src=c;f.appendChild(g);f.setAttribute("title",d);g.setAttribute("title",d);!f.inserted&&e&&f.addEventListener("click",e);return k},createButton:function(b,a,d,c){return"Object"===q.toType(a)?v.apply(this,arguments):w.apply(this,
arguments)},createPosition:function(b,a,d){for(var c=(a.uuid?a.uuid:"")+a.id,e=l("div",a.name,c,"pos1"),f=l("select",a.name,c,"pos",!0),k=1;k<=a.posof;k++){var g=l("option",a.name,c,"opt"+k);g.textContent=k;k==a.pos&&(g.selected=!0);f.appendChild(g)}f.key=a.id;f.uuid=a.uuid;f.name=a.name;d&&!f.inserted&&f.addEventListener("change",d);a=h("span","optiondesc",a.name,c,"pos2");a.textContent=b;e.appendChild(a);e.appendChild(f);return e},createSearchBox:function(b){var a=h("div","searchbox","search_inner"),
d=h("div","searchbox_mv","search_inner_mv"),c=h("input","searchbox_input","search_input"),e=h("input","searchbox_button","search_button");c.type="text";c.setAttribute("spellcheck","false");c.value=b;e.type="button";e.value="Go";var f=function(){window.location=window.location.origin+window.location.pathname+"?url="+encodeURIComponent(c.value)};e.addEventListener("click",f);c.addEventListener("keyup",function(a){a&&13==a.keyCode&&f()});d.appendChild(c);d.appendChild(e);a.appendChild(d);return a},isScrolledIntoView:function(b,
a){var d=$(b),c=$(window),e=a&&a.padding||0,f=c.scrollTop(),c=f+c.height(),h=d.offset().top;return h+d.height()<=c-e&&h>=f+e}})});
