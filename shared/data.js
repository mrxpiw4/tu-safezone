// Same-origin, same-browser demo store. NOT a server or an emergency dispatch service.
(function () {
  'use strict';
  const KEY = 'tu-safezone-pilot-reports-v1';
  const listeners = new Set();
  const channel = ('BroadcastChannel' in window) ? new BroadcastChannel('tu-safezone-pilot') : null;
  function read() { try { const a = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(a) ? a : []; } catch { return []; } }
  function notify() { listeners.forEach(fn => { try { fn(read()); } catch(e) { console.error(e); } }); }
  function write(reports) { localStorage.setItem(KEY, JSON.stringify(reports)); notify(); if (channel) channel.postMessage('changed'); }
  if (channel) channel.onmessage = notify;
  window.addEventListener('storage', e => { if (e.key === KEY) notify(); });
  window.SafeZoneStore = {
    read,
    add(input) {
      const record = { id: 'TU-'+Date.now().toString(36).toUpperCase()+'-'+Math.random().toString(36).slice(2,6).toUpperCase(),
        category: String(input.category || '').slice(0,90), details: String(input.details || '').slice(0,1500),
        lat: Number(input.lat), lng: Number(input.lng), locationLabel: String(input.locationLabel || 'Selected location').slice(0,150),
        createdAt: new Date().toISOString(), status: 'Submitted', priority: 'Normal' };
      if (!Number.isFinite(record.lat) || !Number.isFinite(record.lng)) throw new Error('Invalid map location');
      write([record, ...read()]); return record;
    },
    changeStatus(id,status) {
      if (!['Submitted','Acknowledged','Responding','Resolved'].includes(status)) throw new Error('Invalid status');
      const arr = read(); const item = arr.find(x=>x.id===id); if (!item) return false;
      item.status=status; item.updatedAt=new Date().toISOString(); write(arr); return true;
    },
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    exportJSON() { return JSON.stringify(read(), null, 2); }
  };
})();
