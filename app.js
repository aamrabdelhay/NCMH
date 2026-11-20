(()=>{'use strict';
/* The seven page links are written in each HTML page; this script only highlights the active page. */
const nav=document.querySelector('.nav-links'),menu=document.querySelector('.menu-toggle');
if(nav){
 const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
 nav.querySelectorAll('a').forEach(a=>{
  const target=(a.getAttribute('href')||'').split('#')[0].toLowerCase();
  if(target===current||(current==='legal.html'&&target==='library.html')){a.classList.add('active');a.setAttribute('aria-current','page');}
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
   nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰ القائمة';
  }
 });
}
/* The exact Ministry of Health emblem supplied for this site is stored locally. */
document.querySelectorAll('.ministry-box img').forEach(img=>{
 img.src='/assets/ministry-logo.png';
 img.alt='الشعار الرسمي لوزارة الصحة والسكان المصرية';
 img.width=80;img.height=98;img.loading='eager';img.decoding='async';img.fetchPriority='high';
 img.onerror=()=>{img.style.display='none';img.classList.add('logo-unavailable');};
});
/* The Council emblem is served locally from the site's own SVG file. */
document.querySelectorAll('img.council-logo,.footer-brand img').forEach(img=>{
 img.src='/assets/council-logo.svg';img.alt='شعار المجلس القومي للصحة النفسية';
 img.width=86;img.height=86;img.loading='eager';img.decoding='async';img.fetchPriority='high';
 img.onerror=()=>{img.style.display='none';img.classList.add('logo-unavailable');};
});
/* Avoid broken-image icons in the news rail if an article publisher changes its photo URL. */
document.querySelectorAll('.news-image img,.article-photo img').forEach(img=>{
 img.referrerPolicy='no-referrer';img.decoding='async';
 img.addEventListener('error',()=>{
  if(!img.dataset.photoFallback){
   img.dataset.photoFallback='1';
   img.src='/assets/news-placeholder.svg';
   img.alt='صورة توضيحية للأخبار والأنشطة';
  }else{
   img.style.visibility='hidden';
  }
 });
});
/* Home page: native horizontal touch swipe + autoplay. All scripted movement is horizontal only.
   This deliberately avoids scrollIntoView(), which can scroll the whole document vertically. */
const track=document.getElementById('news-track');
if(track){
 document.querySelector('.slider-controls')?.remove();
 document.getElementById('news-dots')?.remove();
 const cards=[...track.querySelectorAll('.news-photo-card')];
 let active=0,paused=false,dragging=false,startX=0,startScroll=0,dragMoved=false,resumeTimer=null;
 track.setAttribute('aria-label','آخر المستجدات والأخبار والإنجازات — اسحب يمينًا ويسارًا للتنقل');
 const rtl=()=>getComputedStyle(track).direction==='rtl';
 const nearest=()=>{
  const rect=track.getBoundingClientRect(),edge=rtl()?rect.right:rect.left;
  let best=0,distance=Infinity;
  cards.forEach((card,i)=>{
   const r=card.getBoundingClientRect(),point=rtl()?r.right:r.left,d=Math.abs(point-edge);
   if(d<distance){distance=d;best=i;}
  });
  return best;
 };
 track.addEventListener('scroll',()=>{active=nearest();},{passive:true});
 const moveTo=(index)=>{
  if(!cards.length)return;
  const current=cards[nearest()],target=cards[index];
  const currentRect=current.getBoundingClientRect(),targetRect=target.getBoundingClientRect();
  const delta=rtl()?targetRect.right-currentRect.right:targetRect.left-currentRect.left;
  /* scrollBy is scoped to the carousel: top is always zero, so the page never jumps. */
  track.scrollBy({left:delta,top:0,behavior:'smooth'});
  active=index;
 };
 const advance=()=>{
  if(paused||document.hidden||cards.length<2)return;
  moveTo((nearest()+1)%cards.length);
 };
 const autoTimer=window.setInterval(advance,5200);
 track.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')paused=true;});
 track.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse')paused=false;});
 track.addEventListener('focusin',()=>{paused=true;});
 track.addEventListener('focusout',e=>{if(!track.contains(e.relatedTarget))paused=false;});
 track.addEventListener('touchstart',()=>{
  paused=true;clearTimeout(resumeTimer);
 },{passive:true});
 track.addEventListener('touchend',()=>{
  clearTimeout(resumeTimer);resumeTimer=setTimeout(()=>{paused=false;},1700);
 },{passive:true});
 track.addEventListener('pointerdown',e=>{
  if(e.pointerType!=='mouse'||e.button!==0)return;
  dragging=true;dragMoved=false;paused=true;startX=e.clientX;startScroll=track.scrollLeft;
  track.classList.add('is-dragging');track.setPointerCapture?.(e.pointerId);
 });
 track.addEventListener('pointermove',e=>{
  if(!dragging)return;
  if(Math.abs(e.clientX-startX)>5)dragMoved=true;
  track.scrollLeft=startScroll+(startX-e.clientX);
 });
 track.addEventListener('click',e=>{
  if(dragMoved){e.preventDefault();e.stopPropagation();dragMoved=false;}
 },true);
 const stopDrag=()=>{
  if(!dragging)return;
  dragging=false;track.classList.remove('is-dragging');
  clearTimeout(resumeTimer);resumeTimer=setTimeout(()=>{paused=false;},1400);
 };
 track.addEventListener('pointerup',stopDrag);track.addEventListener('pointercancel',stopDrag);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)active=nearest();});
 if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)clearInterval(autoTimer);
}
/* Footer: Council hotline, social accounts and the exact user-supplied map pin. */
const footer=document.querySelector('footer .footer-inner');
if(footer){
 footer.querySelector('.footer-links')?.remove();
 footer.querySelector('.footer-details')?.remove();
 const address='١ شارع صلاح سالم، مدينة نصر، الدور الثالث، مبنى الهيئات التابعة لوزارة الصحة والسكان، القاهرة، مصر';
 const exactMap='https://maps.app.goo.gl/3aX59tvc3VanL9a1A?g_st=ac';
 const query='المجلس القومي للصحة النفسية، 1 شارع صلاح سالم، بجوار أرض المعارض، مدينة نصر، القاهرة، مصر';
 /* Short maps.app.goo.gl links are redirect/share links, not embeddable map documents.
    Use Google's embeddable search URL for the visible map; retain the exact shared pin for directions. */
 const embed='https://www.google.com/maps?q='+encodeURIComponent(query)+'&output=embed';
 const details=document.createElement('div');details.className='footer-details';
 details.innerHTML=
  '<section class="footer-contact" aria-label="تواصل معنا"><h3>تواصل معنا</h3>'+
  '<a class="footer-phone" href="tel:01207474740">الخط الساخن: 01207474740</a>'+
  '<div class="footer-socials" aria-label="الصفحات الرسمية للمجلس">'+
  '<a href="https://www.facebook.com/share/1FR47XmJQ4/" target="_blank" rel="noopener"><img src="https://cdn.simpleicons.org/facebook/1877F2" alt="" width="20" height="20" loading="lazy"> <span>Facebook</span></a>'+
  '<a href="https://www.instagram.com/ncfmh?dmpr=MXJoNGhwZTV3d3dwNA==" target="_blank" rel="noopener"><img src="https://cdn.simpleicons.org/instagram/E4405F" alt="" width="20" height="20" loading="lazy"> <span>Instagram</span></a>'+
  '<a href="https://wa.me/201207474740" target="_blank" rel="noopener"><img src="https://cdn.simpleicons.org/whatsapp/25D366" alt="" width="20" height="20" loading="lazy"> <span>WhatsApp</span></a>'+
  '</div><a class="footer-ministry" href="https://www.mohp.gov.eg/" target="_blank" rel="noopener">وزارة الصحة والسكان</a></section>'+
  '<section class="footer-location" aria-label="موقع مقر المجلس"><h3>مقر المجلس</h3><p>'+address+'</p>'+
  '<iframe class="footer-map" title="خريطة مقر المجلس القومي للصحة النفسية — شارع صلاح سالم، مدينة نصر" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="'+embed+'" referrerpolicy="no-referrer-when-downgrade"></iframe>'+
  '</section>';
 const copyright=footer.querySelector('.copyright');if(copyright)footer.insertBefore(details,copyright);else footer.appendChild(details);
}
/* Lightweight reveal on scroll in either direction; no scroll listeners or layout reads. */
const reduceMotion=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const revealTargets=document.querySelectorAll(
 '.intro-content,.content-section .section-title,.main-copy,.side-panel,.official-grid article,'+
 '.achievement-row:not(.heading-row),.rights-list>div,.rights-note,.contact-box,.source-group,.news-photo-card'
);
if(!reduceMotion&&'IntersectionObserver' in window){
 const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
   entry.target.classList.toggle('is-visible',entry.isIntersecting);
  });
 },{threshold:.12,rootMargin:'0px 0px -5% 0px'});
 revealTargets.forEach(el=>{el.classList.add('motion-reveal');revealObserver.observe(el);});
}else{
 revealTargets.forEach(el=>el.classList.add('is-visible'));
}
const stickyNav=document.querySelector('.main-nav');
if(stickyNav){
 const updateNav=()=>stickyNav.classList.toggle('is-scrolled',window.scrollY>12);
 window.addEventListener('scroll',updateNav,{passive:true});updateNav();
}
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
const back=document.querySelector('.back-top');
if(back){const update=()=>back.classList.toggle('show',window.scrollY>400);window.addEventListener('scroll',update,{passive:true});update();back.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));}
})();