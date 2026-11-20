(()=> {
  'use strict';
  const docs=window.LEGAL_DOCUMENTS||{};
  const params=new URLSearchParams(location.search);
  const id=params.get('id')||'';
  const doc=docs[id];
  const byId=(x)=>document.getElementById(x);
  const title=byId('legal-title');
  if(!doc){
    title.textContent='التشريع غير موجود';
    byId('legal-subtitle').textContent='لم يتم العثور على هذه الصفحة في مكتبة التشريعات.';
    byId('legal-status').textContent='ارجع إلى مكتبة القوانين واللوائح واختر التشريع المطلوب.';
    byId('legal-content').innerHTML='<p><a href="library.html">العودة إلى مكتبة التشريعات</a></p>';
    return;
  }
  document.title=doc.title+' | المجلس القومي للصحة النفسية';
  title.textContent=doc.title;
  byId('legal-breadcrumb-title').textContent=doc.title;
  byId('legal-subtitle').textContent=doc.subtitle||'';
  const meta=[
    ['جهة الإصدار',doc.authority],['تاريخ الإصدار',doc.issued],['تاريخ النشر',doc.published],
    ['تاريخ العمل',doc.effective],['النسخة المعروضة',doc.version]
  ];
  byId('legal-meta').innerHTML=meta.map(([k,v])=>v?'<div><b>'+k+'</b><span>'+v+'</span></div>':'').join('');
  const isComplete=doc.completeness==='complete';
  const status=byId('legal-status');
  status.className='legal-status '+(isComplete?'is-complete':'is-partial');
  status.innerHTML='<strong>'+(isComplete?'حالة النص: تم تفريغ القرار':'حالة النص: تفريغ جزئي موثق')+'</strong><p>'+doc.status+'</p>';
  const toc=byId('legal-toc'),content=byId('legal-content');
  const escapeHtml=(s)=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  doc.blocks.forEach((block,i)=>{
    const bid='article-'+(i+1);
    const a=document.createElement('a');a.href='#'+bid;a.textContent=block.heading;toc.appendChild(a);
    const section=document.createElement('section');section.className='legal-article';section.id=bid;
    const h=document.createElement('h2');h.textContent=block.heading;
    const p=document.createElement('p');p.textContent=block.text;
    section.append(h,p);content.appendChild(section);
  });
  byId('legal-source-description').textContent=doc.sourceDescription||'';
  const source=byId('legal-source-link');source.href=doc.source;source.textContent='الرجوع إلى صفحة المصدر';
  const search=byId('legal-search'),count=byId('legal-search-count');
  search.addEventListener('input',()=>{
    const q=search.value.trim().toLocaleLowerCase('ar');
    let shown=0;
    content.querySelectorAll('.legal-article').forEach(section=>{
      const match=!q||section.textContent.toLocaleLowerCase('ar').includes(q);
      section.hidden=!match;if(match)shown++;
    });
    count.textContent=q?'المواد المطابقة: '+shown:'';
  });
})();