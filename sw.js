const CACHE='yuna-v3';
self.addEventListener('install',e=>{ self.skipWaiting(); });
self.addEventListener('activate',e=>{ e.waitUntil((async()=>{ const keys=await caches.keys(); await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))); await self.clients.claim(); })()); });
self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET'){ return; }
  const url=new URL(req.url);
  if(url.origin!==location.origin){ return; }
  // Always fetch fresh for navigations / HTML so updates show immediately
  if(req.mode==='navigate' || (req.headers.get('accept')||'').includes('text/html')){
    e.respondWith(fetch(req,{cache:'reload'}).then(res=>{ const c=res.clone(); caches.open(CACHE).then(x=>x.put(req,c)).catch(()=>{}); return res; }).catch(()=>caches.match(req).then(r=>r||caches.match('index.html'))));
    return;
  }
  e.respondWith(fetch(req).then(res=>{ const c=res.clone(); caches.open(CACHE).then(x=>x.put(req,c)).catch(()=>{}); return res; }).catch(()=>caches.match(req)));
});
