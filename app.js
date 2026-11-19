(()=>{'use strict';
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav-links');
if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'✕ إغلاق القائمة':'☰ القائمة'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰ القائمة'}))}
const track=document.getElementById('news-track'),prev=document.getElementById('news-prev'),next=document.getElementById('news-next'),dots=document.getElementById('news-dots');
if(track){const cards=[...track.querySelectorAll('.news-photo-card')];const step=()=>Math.max(250,Math.min(360,track.clientWidth*.72));if(prev)prev.addEventListener('click',()=>track.scrollBy({left:step(),behavior:'smooth'}));if(next)next.addEventListener('click',()=>track.scrollBy({left:-step(),behavior:'smooth'}));if(dots){cards.forEach((c,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label','عرض الخبر '+(i+1));if(i===0)b.classList.add('active');b.addEventListener('click',()=>c.scrollIntoView({behavior:'smooth',block:'nearest',inline:'start'}));dots.appendChild(b)});const buttons=[...dots.children];const update=()=>{let best=0,delta=Infinity;cards.forEach((c,i)=>{const d=Math.abs(c.getBoundingClientRect().right-track.getBoundingClientRect().right);if(d<delta){delta=d;best=i}});buttons.forEach((b,i)=>b.classList.toggle('active',i===best))};track.addEventListener('scroll',()=>requestAnimationFrame(update),{passive:true});}}
document.querySelectorAll('[data-year]').forEach(x=>x.textContent=new Date().getFullYear());
const top=document.querySelector('.back-top');if(top){const f=()=>top.classList.toggle('show',window.scrollY>400);window.addEventListener('scroll',f,{passive:true});f();top.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}))}
})();

/* Preserve original design. Add grouped navigation and embedded legal PDF readers. */
(()=>{
const nav=document.querySelector('.nav-links');
if(nav){
nav.innerHTML=[
'<a href="index.html#home">الرئيسية</a>',
'<details class="nav-group"><summary>المجلس</summary><div class="nav-submenu"><a href="about.html">عن المجلس</a><a href="index.html#competencies">اختصاصات المجلس</a><a href="leadership.html">القيادات والتشكيل</a></div></details>',
'<details class="nav-group"><summary>الأخبار والأنشطة</summary><div class="nav-submenu"><a href="news.html">الأخبار والفعاليات</a><a href="achievements.html">الإنجازات والمشاركات</a></div></details>',
'<details class="nav-group"><summary>القوانين واللوائح</summary><div class="nav-submenu"><a href="library.html">مكتبة القوانين واللوائح</a><a href="library.html#law-71-2009">قانون 71 لسنة 2009</a><a href="library.html#amendment-210-2020">تعديل 210 لسنة 2020</a><a href="library.html#executive-regulations">اللائحة التنفيذية 128 لسنة 2010</a></div></details>',
'<a href="rights.html">حقوق المرضى</a>','<a href="contact.html">الشكاوى والتواصل</a>'
].join('');
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
nav.querySelectorAll('.nav-group').forEach(d=>d.open=false);
if(nav.classList.contains('open')){nav.classList.remove('open');const b=document.querySelector('.menu-toggle');if(b){b.setAttribute('aria-expanded','false');b.textContent='☰ القائمة';}}
}));
nav.querySelectorAll('.nav-group').forEach(d=>d.querySelector('summary').addEventListener('click',()=>{
nav.querySelectorAll('.nav-group').forEach(x=>{if(x!==d)x.open=false;});
}));
}
const css=document.createElement('style');
css.textContent=[
'.nav-links{overflow:visible}',
'.nav-group{position:relative;flex:none;color:#fff}',
'.nav-group>summary{list-style:none;cursor:pointer;padding:13px 17px;white-space:nowrap;font-size:12px;color:#fff;border-left:1px solid #ffffff18}',
'.nav-group>summary::-webkit-details-marker{display:none}',
'.nav-group>summary:after{content:"⌄";margin-right:7px;font-size:12px}',
'.nav-group>summary:hover,.nav-group[open]>summary{background:#ffffff19}',
'.nav-submenu{display:none;position:absolute;top:100%;right:0;min-width:225px;flex-direction:column;background:#404040;border-top:3px solid #e00020;box-shadow:0 8px 18px #0003;z-index:80}',
'.nav-group[open]>.nav-submenu{display:flex}',
'.nav-submenu a{display:block;padding:9px 14px;font-size:11px;white-space:normal;border-bottom:1px solid #ffffff18}',
'.nav-submenu a:hover{background:#ffffff19}',
'.doc-viewer{margin:16px 0 10px;background:#eef2f4;border:1px solid #d4dce1;padding:10px}',
'.doc-viewer p{font-size:11px;color:#53636d;margin:0 0 8px}',
'.doc-viewer iframe{display:block;width:100%;height:560px;border:1px solid #cbd5db;background:#fff}',
'.doc-open{display:flex;gap:9px;flex-wrap:wrap;margin-top:9px}',
'.doc-open a{display:inline-block;padding:7px 11px;background:#f7f9fa;border:1px solid #b8c4cc;color:#0070b0;font-size:11px;font-weight:800}',
'@media(max-width:900px){.nav-group>summary{padding:13px 11px}.nav-submenu{min-width:205px}}',
'@media(max-width:650px){.nav-links{flex-direction:column;align-items:stretch;overflow:visible}.nav-group{width:100%}.nav-group>summary{display:block;padding:10px 12px;border-left:0;border-bottom:1px solid #ffffff20}.nav-submenu{position:static;min-width:0;box-shadow:none;border:0;background:#353535}.nav-submenu a{padding:9px 23px}.doc-viewer iframe{height:460px}}'
].join('');
document.head.appendChild(css);
if((location.pathname.split('/').pop()||'').toLowerCase()==='library.html'){
const docs=[
['law-71-2009','قانون رعاية المريض النفسي رقم 71 لسنة 2009','https://manshurat.org/sites/default/files/docs/pdf/016167.pdf','https://manshurat.org/node/14473'],
['amendment-210-2020','القانون رقم 210 لسنة 2020','https://manshurat.org/sites/default/files/48%20%D9%85%D9%83%D8%B1%D8%B1%20%D8%AC%20%D9%85%D8%A4%D9%85%D9%86_1.pdf','https://manshurat.org/node/68934'],
['executive-regulations','اللائحة التنفيذية — قرار 128 لسنة 2010','https://manshurat.org/sites/default/files/128-2010.pdf','https://manshurat.org/node/71205'],
['amendment-210-2011','قرار تعديل اللائحة رقم 210 لسنة 2011','https://manshurat.org/sites/default/files/docs/pdf/008675.pdf','https://manshurat.org/node/10587'],
['decision-55-2021','قرار وزير الصحة رقم 55 لسنة 2021','https://manshurat.org/sites/default/files/37-%D9%82%D8%B1%D8%A7%D8%B1%20%D9%88%D8%B2%D9%8A%D8%B1%20%D8%A7%D9%84%D8%B5%D8%AD%D8%A9%20%D9%88%D8%A7%D9%84%D8%B3%D9%83%D8%A7%D9%86%20%D8%B1%D9%82%D9%85%2055%20%D9%84%D8%B3%D9%86%D8%A9%202021.pdf','https://manshurat.org/node/74232']
];
docs.forEach(([id,name,pdf,source])=>{
const content=document.getElementById(id)?.querySelector('.law-content');
if(!content||content.querySelector('.doc-viewer'))return;
const box=document.createElement('div');box.className='doc-viewer';
const label=document.createElement('p');label.textContent='عرض الوثيقة داخل الموقع — '+name;
const frame=document.createElement('iframe');frame.loading='lazy';frame.title=name+' PDF';
frame.src='https://docs.google.com/gview?embedded=true&url='+encodeURIComponent(pdf);
const actions=document.createElement('div');actions.className='doc-open';
const a=document.createElement('a');a.href=pdf;a.target='_blank';a.rel='noopener';a.textContent='فتح / تحميل ملف PDF';
const b=document.createElement('a');b.href=source;b.target='_blank';b.rel='noopener';b.textContent='صفحة الوثيقة وبيانات النشر';
actions.append(a,b);box.append(label,frame,actions);
const end=content.querySelector('.page-source');if(end)end.before(box);else content.append(box);
});
}
})();

/* Final navigation/footer additions: same original visual system, no homepage redesign. */
(()=>{
'use strict';
const nav=document.querySelector('.nav-links');
const links=[
 ['index.html#home','الرئيسية'],
 ['about.html','عن المجلس'],
 ['leadership.html','القيادات'],
 ['achievements.html','الإنجازات والأنشطة'],
 ['news.html','الأخبار والفعاليات'],
 ['library.html','التشريعات واللوائح'],
 ['rights.html','حقوق المرضى']
];
if(nav){
 nav.innerHTML=links.map(([href,label])=>'<a href="'+href+'">'+label+'</a>').join('');
 const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
 nav.querySelectorAll('a').forEach(a=>{
  const destination=(a.getAttribute('href')||'').split('#')[0].toLowerCase();
  if(destination===current){a.classList.add('active');a.setAttribute('aria-current','page');}
 });
}
const officialLogo='https://m.gomhuriaonline.com/Upload/News/13-2-2023_12_25_26_GomhuriaOnline_331676283926.jpg';
document.querySelectorAll('.ministry-box img,.ministry-logo').forEach(img=>{
 img.alt='الشعار الرسمي لوزارة الصحة والسكان المصرية';
 img.referrerPolicy='no-referrer';
 img.loading='eager';
 img.decoding='async';
 if(!img.src||img.src!==officialLogo)img.src=officialLogo;
 img.addEventListener('error',()=>{
  if(img.dataset.logoFallback!=='used'){
   img.dataset.logoFallback='used';
   img.src='https://www.logodalil.com.eg/images/Gov_Logos/mohp.jpg';
  }else{
   img.alt='وزارة الصحة والسكان المصرية';
   img.title='وزارة الصحة والسكان المصرية';
  }
 },{once:false});
});
const footer=document.querySelector('footer .footer-inner');
if(footer){
 const oldLinks=footer.querySelector('.footer-links');
 const address='١ شارع صلاح سالم، مدينة نصر، الدور الثالث، مبنى الهيئات التابعة لوزارة الصحة والسكان، القاهرة، مصر';
 const addressQuery='مبنى الهيئات التابعة لوزارة الصحة والسكان، 1 شارع صلاح سالم، الدور الثالث، مدينة نصر، القاهرة، مصر';
 const mapsUrl='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(addressQuery);
 const embedUrl='https://www.google.com/maps?q='+encodeURIComponent(addressQuery)+'&output=embed';
 if(oldLinks)oldLinks.remove();
 let details=footer.querySelector('.footer-details');
 if(!details){
  details=document.createElement('div');
  details.className='footer-details';
  details.innerHTML=
   '<section class="footer-contact" aria-label="الأرقام والروابط"><h3>الأرقام والروابط</h3>'+
   '<a href="tel:01207474740">خط شكاوى المجلس: 01207474740</a>'+
   '<a href="https://wa.me/201207474740" target="_blank" rel="noopener">واتساب المجلس</a>'+
   '<a href="tel:16528">منظومة الشكاوى الحكومية: 16528</a>'+
   '<a href="https://www.shakwa.eg/GCP/Default.aspx" target="_blank" rel="noopener">تقديم شكوى حكومية</a>'+
   '<a href="https://www.mohp.gov.eg/" target="_blank" rel="noopener">وزارة الصحة والسكان</a></section>'+
   '<section class="footer-location" aria-label="موقع مقر المجلس"><h3>مقر المجلس</h3>'+
   '<p>'+address+'</p>'+
   '<iframe class="footer-map" title="خريطة مقر المجلس القومي للصحة النفسية — 1 شارع صلاح سالم، مدينة نصر" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="'+embedUrl+'"></iframe>'+
   '<a class="footer-directions" href="'+mapsUrl+'" target="_blank" rel="noopener">فتح الموقع والاتجاهات على خرائط Google ←</a>'+
   '</section>';
  const copyright=footer.querySelector('.copyright');
  if(copyright)footer.insertBefore(details,copyright);else footer.appendChild(details);
 }
}
const style=document.createElement('style');
style.textContent=[
'.nav-links a.active{background:#ffffff19;box-shadow:inset 0 -3px #e00020}',
'.nav-links a{flex-shrink:0}',
'.footer-inner{grid-template-columns:1fr auto}',
'.footer-details{grid-column:1/-1;display:grid;grid-template-columns:minmax(230px,.8fr) minmax(300px,1.2fr);gap:18px;align-items:stretch}',
'.footer-contact,.footer-location{background:#ffffff0b;border:1px solid #ffffff20;padding:15px 17px;min-width:0}',
'.footer-contact h3,.footer-location h3{color:#fff;font-size:13px;margin:0 0 9px}',
'.footer-contact a{display:block;color:#e0e5e8;font-size:11px;margin:7px 0;text-decoration:none}',
'.footer-contact a:hover,.footer-directions:hover{color:#fff;text-decoration:underline}',
'.footer-location p{color:#e0e5e8;font-size:11px;margin:0 0 10px}',
'.footer-map{display:block;width:100%;height:190px;border:1px solid #ffffff42;background:#eef2f4}',
'.footer-directions{display:inline-block;color:#fff;font-size:10px;font-weight:800;margin-top:9px}',
'@media(max-width:650px){.footer-details{grid-template-columns:1fr}.footer-map{height:180px}.footer-contact,.footer-location{padding:13px}.footer-inner{grid-template-columns:1fr}.footer-brand{grid-column:1/-1}.footer-links{grid-column:1/-1}}'
].join('');
document.head.appendChild(style);
})();