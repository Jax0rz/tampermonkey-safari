Registry.require(["promise","helper","convert"],function(){var f=Registry.get("promise"),p=Registry.get("helper"),h=Registry.get("convert"),k=function(){var c=f();Registry.vendor(["vendor/zip_js/zip","vendor/zip_js/inflate","vendor/zip_js/deflate"],function(){k=f.Pledge;zip.workerScriptsPath=rea.extension.getURL("/vendor/zip_js/");c.resolve()});return c.promise()},l=function(){var c,d=!1,g,b=function(){var a=f();return g=a};return{write:function(){var a=f();d=!1;zip.createWriter(new zip.BlobWriter,
function(b){c=b;a.resolve(b)},a.reject);return a.promise()},open:function(a){var q=b();d=!0;zip.createReader(new zip.BlobReader(a),function(a){c=a;q.resolve(a)},function(a){g&&g.reject(a)});return q.promise()},entries:function(){var a=b();c.getEntries(function(b){a.resolve(b)});return a.promise()},get:function(a){var c=b(),e=new zip.TextWriter;a.getData(e,c.resolve);return c.promise()},put:function(a,d,e){var g=b();try{c.add(a,new zip.TextReader(d),g.resolve,function(){},{lastModDate:e?new Date(e):
void 0})}catch(f){g.reject(f)}return g.promise()},end:function(){var a=b();d?(c.close(),a.resolve()):c.close(a.resolve);return a.promise()}}}();Registry.register("porter","5349",{zip:{create:function(c,d){var g=f(),b=0;k().then(function(){return l.write()}).then(function(a){var d=f(),e={},m=function(a,b){var c=[a,b].join(".");if(e[c]){var d;do d=a+" ("+e[c]+")",c=[d,b].join("."),e[c]++;while(e[c]);return m(d,b)}e[c]=1;return c},r=c.length,v=function(){if(!c.length)return d.resolve();
var a=c.shift(),e=a.meta.name.replace(/[\\\/$*?|]/g,"-"),t=m(e,"user.js"),u=m(e,"options.json"),h=m(e,"storage.json"),k=JSON.stringify({options:a.options,settings:a.settings,meta:a.meta}),n=a.storage?JSON.stringify(a.storage):null;b+=a.source.length;console.log("porter: add to zip",t,b);g.notify("Zip: "+Math.floor((r-c.length)/r*100)+"%");l.put(t,a.source,a.meta.modified).then(function(){b+=k.length;console.log("porter: add to zip",u,b);return l.put(u,k)}).then(function(){if(!n)return f.Pledge();
b+=n.length;console.log("porter: add to zip",h,b);return l.put(h,n)}).fail(function(a){console.log("porter: add to zip failed",a)}).always(function(){console.log("porter: add to zip -> next round");window.setTimeout(v,5)})};v();return d.promise()}).then(function(){console.log("porter: add global props");return d?l.put("Tampermonkey.global.json",JSON.stringify(d)):f.Pledge()}).then(function(){return l.end()}).done(function(a){g.resolve(a)}).fail(function(){g.reject()});return g.promise()},read:function(c){var d=
f(),g;k().then(function(){return l.open(c)}).then(function(b){return l.entries()}).then(function(b){var a=f(),c={},e=b.length,h=function(){if(b.length){var f=b.shift();console.log("porter: read from zip",f.filename);l.get(f).done(function(a){var b=f.filename.match(/(.*)\.(storage\.json|options\.json|global\.json|user\.js)$/);if(b&&!(3>b.length))try{var d=b[1],e=b[2];c[d]=c[d]||{};"global.json"==e?g=JSON.parse(a):"user.js"==e?c[d].source=a:"options.json"==e?c[d].options=JSON.parse(a):"storage.json"==
e&&(c[d].storage=JSON.parse(a))}catch(h){console.warn("porter: read from zip failed",h)}}).always(function(){d.notify("Zip: "+Math.floor((e-b.length)/e*100)+"%");window.setTimeout(h,5)})}else{var k=[];p.each(c,function(a,b){var c=a.options||{};c.source=a.source;c.storage=a.storage;k.push(c)});a.resolve({scripts:k,global_settings:g})}};h();return a.promise()}).done(function(b){d.resolve(b)}).fail(function(){d.reject()});return d.promise()}},json:{create:function(c,d){var g=f(),b={created_by:"Tampermonkey",
version:"1",scripts:[],settings:d};c.forEach(function(a){a={name:a.meta.name,options:a.options,storage:a.storage,enabled:a.settings.enabled,position:a.settings.position,file_url:a.meta.file_url,uuid:a.meta.uuid,source:h.Base64.encode(h.UTF8.encode(a.source))};b.scripts.push(a)});g.resolve(JSON.stringify(b));return g.promise()},read:function(c){var d=f(),g=function(b){if(b.trim()){var a=null;try{return a=JSON.parse(b),a.scripts=p.map(a.scripts,function(a){a.source=h.UTF8.decode(h.Base64.decode(a.source));
return a}),d.resolve({scripts:a.scripts,global_settings:a.settings})}catch(c){if(-1!=b.search("<body>")){var a=b.indexOf("<body>"),f=b.lastIndexOf("</body>");if(-1!=a&&-1!=f)return b=b.substr(a+6,f-(a+6)),g(b)}}}d.reject()};g(c);return d.promise()}}})});
