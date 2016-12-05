'use strict';Registry.require(["promise","helper","xmlhttprequest","uri","convert"],function(){var g=rea.FEATURES,h=Registry.get("promise"),q=Registry.get("xmlhttprequest").run,k=Registry.get("uri"),n=Registry.get("helper"),p=Registry.get("convert"),l=function(d){var c,a=[],b=null,e={extend:function(a){a=a(e);Object.keys(e).forEach(function(b){var c=Object.getOwnPropertyDescriptor(e,b);c.get?(a.__defineGetter__(b,c.get),c.set&&a.__defineSetter__(b,c.set)):a[b]=a[b]||e[b]});return e=a},config:{},oauth:function(){var a,
b={run:function(){var f=h();a=n.createUUID();var m=rea.extension.connect("tabWatch");m.onMessage.addListener(function(a){if(a=b.onUrl(a.tab.url))e.credentials=a,m.disconnect(),c=null,f.resolve()});m.onDisconnect.addListener(function(){c=null;f.reject("auth_failed")});m.postMessage({method:"tabWatch",type:d,url:b.getAuthUrl()});return f.promise()},getAuthUrl:function(){return e.config.request_uri+"?"+k.hash2params({response_type:e.config.response_type,client_id:e.config.client_id,redirect_uri:e.config.redirect_uri,
state:a,scope:e.config.scope})},onUrl:function(b){var c,d;if(b&&0===b.indexOf(e.config.redirect_uri)&&(d=k.parse(b))&&(c=k.params2hash(d))&&c.access_token&&c.state===a)return{uid:c.uid,access_token:c.access_token}}};return b}(),request:function(a){var b=h(),c=function(a){console.log("cloud: request failed",a);b.reject(a)};q(a,{onload:function(a){-1==[200,201,204].indexOf(a.status)?c(a):b.resolve(a.response)},onerror:c,ontimeout:c,onprogress:b.notify});return b.promise()},wait:function(b){return function(){if(e.credentials.access_token)return b.apply(this,
arguments);var d=arguments,f=h();a.push(function(){f.consume(b.apply(this,d))});c||e.oauth.run().done(function(){a.forEach(function(a){a()});a=[]}).fail(function(a){f.reject(a)});return f.promise()}}};e.__defineGetter__("credentials",function(){if(null===b){if(g.HTML5.LOCALSTORAGE)try{var a=JSON.parse(g.HTML5.LOCALSTORAGE.getItem(e.config.storage_key));b={uid:a.uid,access_token:a.access_token}}catch(c){}b=b||{}}return b});e.__defineSetter__("credentials",function(a){if(g.HTML5.LOCALSTORAGE)try{g.HTML5.LOCALSTORAGE.setItem(e.config.storage_key,
JSON.stringify({uid:a.uid,access_token:a.access_token}))}catch(c){}b=a});return e},l={drive:(new l("drive")).extend(function(d){var c={config:{redirect_uri:"https://tampermonkey.net/oauth.php",request_uri:"https://accounts.google.com/o/oauth2/v2/auth",client_id:"408438522028-3cgn3t3jas3fak7isbnfod1q4h15g2fv.apps.googleusercontent.com",storage_key:"gd_config",scope:"https://www.googleapis.com/auth/drive.appdata",response_type:"token"},request:function(a){a.headers=a.headers||{};a.headers.Authorization=
"Bearer "+c.credentials.access_token;return d.request.apply(this,arguments).then(function(a){return a},function(b){if(-1!=[400,401].indexOf(b.status)){if(console.warn("Google Drive: authentication error",b),c.credentials={},!a.retry_auth)return a.retry_auth=!0,c.oauth.run().then(function(){return c.request(a)})}else if(404==b.status)return h().resolve(null);return h().reject(b.statusText||b.responseText)})},list:d.wait(function(){return c.request({method:"GET",url:"https://www.googleapis.com/drive/v3/files?"+
k.hash2params({spaces:"appDataFolder",orderBy:"quotaBytesUsed",fields:"files(id, size, name, modifiedTime)"}),headers:{"Content-Type":"application/json"}}).then(function(a){return(a?JSON.parse(a):{files:[]}).files.map(function(a){return{name:a.name,size:a.size||0,id:a.id,modified:a.modifiedTime?new Date(a.modifiedTime):new Date}})})}),get:d.wait(function(a){return c.request({method:"GET",url:"https://www.googleapis.com/drive/v3/files/"+(a.id||a)+"?"+k.hash2params({spaces:"appDataFolder",alt:"media"}),
responseType:"arraybuffer"}).then(function(a){return new Blob([a])})}),put:d.wait(function(a,b){var d=h(),l=a.name||a,g=n.createUUID(),f=new FileReader;f.onload=function(){b=p.arrbuf2str(f.result);var a=[];a.push("--"+g);a.push("Content-Type: application/json");a.push("");a.push(JSON.stringify({name:l,parents:["appDataFolder"]}));a.push("--"+g);a.push("Content-Type: application/octet-stream");a.push("Content-Transfer-Encoding: base64");a.push("");a.push(p.Base64.encode(b));a.push("--"+g+"--");a.push("");
d.consume(c.request({method:"POST",url:"https://www.googleapis.com/upload/drive/v3/files?"+k.hash2params({uploadType:"multipart"}),headers:{"Content-Type":"multipart/related; boundary="+g},data:a.join("\r\n")}))};f.readAsArrayBuffer(b);return d.promise()}),delete:d.wait(function(a){return c.request({method:"DELETE",url:"https://www.googleapis.com/drive/v3/files/"+(a.id||a)+"?"+k.hash2params({spaces:"appDataFolder"}),headers:{"Content-Type":" application/json"}})})};return c}),dropbox:(new l("dropbox")).extend(function(d){var c=
{config:{redirect_uri:"https://tampermonkey.net/oauth.php",request_uri:"https://www.dropbox.com/1/oauth2/authorize",client_id:"gq3auc9yym0e21y",storage_key:"db_config",response_type:"token"},request:function(a){a.headers=a.headers||{};a.headers.Authorization="Bearer "+c.credentials.access_token;return d.request.apply(this,arguments).then(function(a){return a},function(b){return-1==[400,401].indexOf(b.status)||(console.warn("Dropbox: authentication error",b),c.credentials={},a.retry_auth)?h().reject(b.statusText||
b.responseText):(a.retry_auth=!0,c.oauth.run().then(function(){return c.request(a)}))})},list:d.wait(function(){return c.request({method:"POST",url:"https://api.dropboxapi.com/2/files/list_folder",headers:{"Content-Type":" application/json"},data:{path:""}}).then(function(a){return JSON.parse(a).entries.map(function(a){return{name:a.name,size:a.size,modified:new Date(a.server_modified)}})})}),get:d.wait(function(a){return c.request({method:"POST",url:"https://content.dropboxapi.com/2/files/download",
headers:{"Dropbox-API-Arg":JSON.stringify({path:"/"+(a.name||a)})},responseType:"arraybuffer"}).then(function(a){return new Blob([a])})}),put:d.wait(function(a,b){return c.request({method:"POST",url:"https://content.dropboxapi.com/2/files/upload",headers:{"Dropbox-API-Arg":JSON.stringify({path:"/"+(a.name||a),mode:"overwrite"}),"Content-Type":"application/octet-stream"},data_type:"typified",data:{type:"raw",value:b}})}),delete:d.wait(function(a){return c.request({method:"POST",url:"https://api.dropboxapi.com/2/files/delete",
headers:{"Content-Type":" application/json"},data:{path:"/"+(a.name||a)}})})};return c}),onedrive:(new l("onedrive")).extend(function(d){var c={config:{redirect_uri:"https://tampermonkey.net/oauth.php",request_uri:"https://login.live.com/oauth20_authorize.srf",client_id:"000000004C1A3122",storage_key:"od_config",response_type:"token",scope:"onedrive.appfolder"},request:function(a){a.headers=a.headers||{};a.headers.Authorization="Bearer "+c.credentials.access_token;return d.request.apply(this,arguments).then(function(a){return a},
function(b){return-1==[401].indexOf(b.status)||(console.warn("OneDrive: authentication error",b),c.credentials={},a.retry_auth)?h().reject(b.statusText||b.responseText):(a.retry_auth=!0,c.oauth.run().then(function(){return c.request(a)}))})},list:d.wait(function(){return c.request({method:"GET",url:"https://api.onedrive.com/v1.0/drive/special/approot/children",headers:{"Content-Type":" application/json"}}).then(function(a){return JSON.parse(a).value.map(function(a){return{name:a.name,size:a.size,
modified:new Date(a.lastModifiedDateTime)}})})}),get:d.wait(function(a){return c.request({method:"GET",url:"https://api.onedrive.com/v1.0/drive/special/approot:/"+encodeURIComponent(a.name||a)+":/content",responseType:"arraybuffer"}).then(function(a){return new Blob([a])})}),put:d.wait(function(a,b){return c.request({method:"PUT",url:"https://api.onedrive.com/v1.0/drive/special/approot:/"+encodeURIComponent((a.name||a).replace(/[#%<>:"|\?\*\/\\]/g,"-"))+":/content",headers:{"Content-Type":"application/octet-stream"},
data_type:"typified",data:{type:"raw",value:b}})}),delete:d.wait(function(a){return c.request({method:"DELETE",url:"https://api.onedrive.com/v1.0/drive/special/approot:/"+encodeURIComponent(a.name||a)})})};return c})};Registry.register("cloud","5349",l)});
