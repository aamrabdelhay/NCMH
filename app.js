(()=>{'use strict';
const nav=document.querySelector('.nav-links'),menu=document.querySelector('.menu-toggle');
if(nav){
 const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
 nav.querySelectorAll('a').forEach(a=>{
  const target=(a.getAttribute('href')||'').split('#')[0].toLowerCase();
  if(target===current){a.classList.add('active');a.setAttribute('aria-current','page');}
 });
}
if(menu&&nav){
 menu.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menu.setAttribute('aria-expanded',String(open));
  menu.textContent=open?'✕ إغلاق القائمة':'☰ القائمة';
 });
 nav.addEventListener('click',e=>{
  if(e.target.closest('a')){
   nav.classList.remove('open');
   menu.setAttribute('aria-expanded','false');
   menu.textContent='☰ القائمة';
  }
 });
}
/* Local, same-origin assets eliminate remote hotlink and loading failures. */
document.querySelectorAll('.ministry-box img').forEach(img=>{
 img.src='/assets/ministry-logo.svg';
 img.alt='شعار وزارة الصحة والسكان المصرية';
 img.width=84;img.height=84;img.loading='eager';img.decoding='async';
 img.onerror=()=>{img.style.display='none';};
});
document.querySelectorAll('img.council-logo,.footer-brand img').forEach(img=>{
 img.src='/assets/council-logo.svg';
 img.alt='شعار المجلس القومي للصحة النفسية';
 img.width=86;img.height=86;img.loading='eager';img.decoding='async';
 img.onerror=()=>{img.style.display='none';};
});
/* Protect news cards from broken remote photo links. */
document.querySelectorAll('.news-image img').forEach(img=>{
 const fallback='/assets/news-placeholder.svg';
 const onError=()=>{
  if(!img.src.endsWith('news-placeholder.svg')){
   img.src=fallback;
   img.alt='صورة توضيحية لأخبار المجلس';
  }else{
   img.style.visibility='hidden';
  }
 };
 img.addEventListener('error',onError);
 if(img.complete&&img.naturalWidth===0)onError();
});
/* Latest updates: autoplay plus natural touch swipe and mouse drag; no arrow controls. */
const track=document.getElementById('news-track');
if(track){
 document.querySelector('.slider-controls')?.remove();
 document.getElementById('news-dots')?.remove();
 const cards=[...track.querySelectorAll('.news-photo-card')];
 let active=0,paused=false,dragging=false,startX=0,startScroll=0,resumeTimer=null;
 const nearest=()=>{
  const rect=track.getBoundingClientRect();
  const rtl=getComputedStyle(track).direction==='rtl';
  const edge=rtl?rect.right:rect.left;
  let best=0,distance=Infinity;
  cards.forEach((card,i)=>{
   const r=card.getBoundingClientRect();
   const point=rtl?r.right:r.left;
   const d=Math.abs(point-edge);
   if(d<distance){distance=d;best=i;}
  });
  return best;
 };
 track.addEventListener('scroll',()=>{active=nearest();},{passive:true});
 const next=()=>{
  if(paused||document.hidden||!cards.length)return;
  active=(active+1)%cards.length;
  cards[active].scrollIntoView({behavior:'smooth',block:'nearest',inline:'start'});
 };
 const timer=window.setInterval(next,5200);
 track.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')paused=true;});
 track.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse')paused=false;});
 track.addEventListener('focusin',()=>{paused=true;});
 track.addEventListener('focusout',e=>{if(!track.contains(e.relatedTarget))paused=false;});
 track.addEventListener('touchstart',()=>{paused=true;clearTimeout(resumeTimer);},{passive:true});
 track.addEventListener('touchend',()=>{
  clearTimeout(resumeTimer);
  resumeTimer=setTimeout(()=>{paused=false;},1500);
 },{passive:true});
 track.addEventListener('pointerdown',e=>{
  if(e.pointerType!=='mouse'||e.button!==0)return;
  dragging=true;paused=true;startX=e.clientX;startScroll=track.scrollLeft;
  track.classList.add('is-dragging');
  track.setPointerCapture?.(e.pointerId);
 });
 track.addEventListener('pointermove',e=>{
  if(dragging)track.scrollLeft=startScroll+(startX-e.clientX);
 });
 const stopDrag=()=>{
  if(!dragging)return;
  dragging=false;track.classList.remove('is-dragging');
  clearTimeout(resumeTimer);
  resumeTimer=setTimeout(()=>{paused=false;},1200);
 };
 track.addEventListener('pointerup',stopDrag);
 track.addEventListener('pointercancel',stopDrag);
 if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)clearInterval(timer);
}
/* Legal documents open in the page, with direct PDF and publication-source fallbacks. */
if((location.pathname.split('/').pop()||'').toLowerCase()==='library.html'){
 const docs=[
  ['law-71-2009','قانون رعاية المريض النفسي رقم 71 لسنة 2009','https://manshurat.org/sites/default/files/docs/pdf/016167.pdf','https://manshurat.org/node/14473'],
  ['amendment-210-2020','القانون رقم 210 لسنة 2020','https://manshurat.org/sites/default/files/48%20%D9%85%D9%83%D8%B1%D8%B1%20%D8%AC%20%D9%85%D8%A4%D9%85%D9%86_1.pdf','https://manshurat.org/node/68934'],
  ['executive-regulations','اللائحة التنفيذية — قرار 128 لسنة 2010','https://manshurat.org/file/82930/download?token=pzwFaWTj','https://manshurat.org/node/71205'],
  ['amendment-210-2011','قرار تعديل اللائحة رقم 210 لسنة 2011','https://manshurat.org/file/19753/download?token=0a3ocYN1','https://manshurat.org/node/10587'],
  ['decision-55-2021','قرار وزير الصحة رقم 55 لسنة 2021','https://manshurat.org/file/86707/download?token=mThphVBo','https://manshurat.org/node/74232']
 ];
 docs.forEach(([id,name,pdf,source])=>{
  const content=document.getElementById(id)?.querySelector('.law-content');
  if(!content||content.querySelector('.doc-viewer'))return;
  const box=document.createElement('div');box.className='doc-viewer';
  const label=document.createElement('p');label.textContent='عرض الوثيقة داخل الموقع — '+name;
  const frame=document.createElement('iframe');frame.loading='lazy';frame.title=name+' PDF';
  frame.src='https://docs.google.com/gview?embedded=true&url='+encodeURIComponent(pdf);
  const actions=document.createElement('div');actions.className='doc-open';
  const pdfLink=document.createElement('a');pdfLink.href=pdf;pdfLink.target='_blank';pdfLink.rel='noopener';pdfLink.textContent='فتح / تحميل ملف PDF';
  const sourceLink=document.createElement('a');sourceLink.href=source;sourceLink.target='_blank';sourceLink.rel='noopener';sourceLink.textContent='صفحة الوثيقة وبيانات النشر';
  actions.append(pdfLink,sourceLink);box.append(label,frame,actions);
  const end=content.querySelector('.page-source');
  if(end)end.before(box);else content.append(box);
 });
}
/* Footer: direct Council contact only, plus the requested address and interactive map. */
const footer=document.querySelector('footer .footer-inner');
if(footer){
 footer.querySelector('.footer-links')?.remove();
 footer.querySelector('.footer-details')?.remove();
 const address='١ شارع صلاح سالم، مدينة نصر، الدور الثالث، مبنى الهيئات التابعة لوزارة الصحة والسكان، القاهرة، مصر';
 const query='مبنى الهيئات التابعة لوزارة الصحة والسكان، 1 شارع صلاح سالم، الدور الثالث، مدينة نصر، القاهرة، مصر';
 const mapUrl='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(query);
 const embed='https://www.google.com/maps?q='+encodeURIComponent(query)+'&output=embed';
 const details=document.createElement('div');details.className='footer-details';
 details.innerHTML=
  '<section class="footer-contact" aria-label="أرقام التواصل"><h3>التواصل مع المجلس</h3>'+
  '<a href="tel:01207474740">خط شكاوى المجلس: 01207474740</a>'+
  '<a href="https://wa.me/201207474740" target="_blank" rel="noopener">واتساب المجلس</a>'+
  '<a href="https://www.mohp.gov.eg/" target="_blank" rel="noopener">وزارة الصحة والسكان</a></section>'+
  '<section class="footer-location" aria-label="موقع مقر المجلس"><h3>مقر المجلس</h3><p>'+address+'</p>'+
  '<iframe class="footer-map" title="خريطة مقر المجلس القومي للصحة النفسية" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="'+embed+'"></iframe>'+
  '<a class="footer-directions" href="'+mapUrl+'" target="_blank" rel="noopener">فتح الموقع والاتجاهات على خرائط Google ←</a></section>';
 const copyright=footer.querySelector('.copyright');
 if(copyright)footer.insertBefore(details,copyright);else footer.appendChild(details);
}
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
const back=document.querySelector('.back-top');
if(back){
 const update=()=>back.classList.toggle('show',window.scrollY>400);
 window.addEventListener('scroll',update,{passive:true});update();
 back.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
}
})();