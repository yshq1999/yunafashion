const CACHE='yuna-v1';
self.addEventListener('install',e=>{ self.skipWaiting(); });
self.addEventListener('activate',e=>{ e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET'){ return; }
  const url=new URL(req.url);
  if(url.origin!==location.origin){ return; } // let cross-origin (Supabase, fonts) go straight to network
  e.respondWith(
    fetch(req).then(res=>{
      const copy=res.clone();
      caches.open(CACHE).then(c=>c.put(req,copy)).catch(()=>{});
      return res;
    }).catch(()=>caches.match(req).then(r=>r||caches.match('index.html')))
  );
});
