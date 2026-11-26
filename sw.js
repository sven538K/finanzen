const C='finanzen-v17';
const FILES=["./", "./index.html", "./neu.html", "./manifest.json", "./manifest-neu.json", "./icon-192.png", "./icon-512.png", "./icon-neu-192.png", "./icon-neu-512.png", "./apple-touch-icon.png", "./apple-touch-icon-neu.png"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(u.origin!==location.origin||e.request.method!=='GET')return;
 e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})))});
self.addEventListener('push',e=>{let d={};try{d=e.data.json()}catch(x){d={title:'Finanzen',body:e.data?e.data.text():''}}
 e.waitUntil(self.registration.showNotification(d.title||'Finanzen',{body:d.body||'',icon:'icon-192.png',badge:'icon-192.png',tag:d.tag}))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l)if('focus'in c)return c.focus();return clients.openWindow('./')}))});
