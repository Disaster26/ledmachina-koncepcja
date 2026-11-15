(function(){
var d=document;
var y=d.getElementById('y');if(y)y.textContent=new Date().getFullYear();
var b=d.getElementById('burger'),m=d.getElementById('mnav');
function tog(o){m.classList.toggle('open',o);b.setAttribute('aria-expanded',o);d.body.style.overflow=o?'hidden':''}
b.addEventListener('click',function(){tog(!m.classList.contains('open'))});
m.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){tog(false)})});
// aktywna pozycja menu
var links=d.querySelectorAll('.nav a,.mnav a[href^="#"]'),secs=['top','oferta','realizacje','piksel','firma','kontakt'].map(function(i){return d.getElementById(i)});
function act(){var p=scrollY+120,cur='top';secs.forEach(function(s){if(s&&s.id!=='top'&&s.offsetTop<=p)cur=s.id});links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+cur)})}
// pasek mobilny po przewinieciu
var mob=d.getElementById('mob');
function sc(){act();mob.classList.toggle('on',scrollY>innerHeight*.7)}
addEventListener('scroll',sc,{passive:true});sc();
// karuzela
var t=d.getElementById('track');
d.querySelectorAll('.arr button').forEach(function(x){x.addEventListener('click',function(){var w=t.querySelector('button').offsetWidth+16;t.scrollBy({left:w*x.dataset.dir,behavior:'smooth'})})});
var down=false,sx=0,sl=0,moved=0;
t.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=0;sx=e.clientX;sl=t.scrollLeft});
addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>4){t.classList.add('drag');moved=1}t.scrollLeft=sl-dx});
addEventListener('pointerup',function(){if(!down)return;down=false;t.classList.remove('drag')});
t.addEventListener('dragstart',function(e){e.preventDefault()});
// lightbox
var items=[].slice.call(t.querySelectorAll('button')),lb=d.getElementById('lb'),li=lb.querySelector('img'),lp=lb.querySelector('p'),cur=0;
function show(i){cur=(i+items.length)%items.length;var it=items[cur];li.src=it.dataset.full;li.alt=it.querySelector('img').alt;lp.textContent=it.querySelector('span').textContent;lb.hidden=false}
items.forEach(function(it,i){it.addEventListener('click',function(e){if(moved){e.preventDefault();moved=0;return}show(i)})});
lb.querySelector('.x').onclick=function(){lb.hidden=true};
lb.querySelector('.pv').onclick=function(){show(cur-1)};
lb.querySelector('.nx').onclick=function(){show(cur+1)};
lb.addEventListener('click',function(e){if(e.target===lb)lb.hidden=true});
addEventListener('keydown',function(e){if(lb.hidden)return;if(e.key==='Escape')lb.hidden=true;if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1)});
// formularz pokazowy
d.getElementById('form').addEventListener('submit',function(e){e.preventDefault();d.getElementById('fmsg').textContent='To jest podgląd - w gotowej stronie zapytanie trafi na biuro@ledmachina.pl.'});
// cookies + mapa
var ck=d.getElementById('cookies');
ck.querySelectorAll('button').forEach(function(x){x.addEventListener('click',function(){try{localStorage.setItem('lm-c',x.dataset.c)}catch(e){}ck.hidden=true})});
var mp=d.getElementById('map');
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(en){if(en[0].isIntersecting){mp.innerHTML='<iframe title="Mapa dojazdu - LEDmachina, Złotoryjska 7, Wrocław" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="'+mp.dataset.src+'"></iframe>';io.disconnect()}},{rootMargin:'200px'});io.observe(mp)}
})();
