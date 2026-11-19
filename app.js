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