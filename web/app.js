let language="en";
const languageKey="computer-siksha-language-v1";
try{const savedLanguage=localStorage.getItem(languageKey);if(savedLanguage&&UI_TEXT[savedLanguage])language=savedLanguage}catch{}
const labels=UI_TEXT;
const state={module:null,lesson:0,query:"",answers:{},score:null};
const progressKey="computer-siksha-progress-v2";
function getProgress(){try{const value=JSON.parse(localStorage.getItem(progressKey)||"[]");return Array.isArray(value)?value:[]}catch{return[]}}
function saveProgress(id){const p=getProgress();if(!p.includes(id))p.push(id);try{localStorage.setItem(progressKey,JSON.stringify(p))}catch{}render()}
function tr(obj){return obj[language]||obj.en}
function el(tag,cls,txt){const n=document.createElement(tag);if(cls)n.className=cls;if(txt!==undefined)n.textContent=txt;return n}
function render(){
 const t=labels[language]||labels.en;document.documentElement.lang=language;document.documentElement.dir=(language==="ar"||language==="ur")?"rtl":"ltr";
 ["eyebrow","heroTitle","heroText","pathLabel","moduleHeading"].forEach(id=>document.getElementById(id).textContent=t[id]);
 document.getElementById("source").textContent=t.source;
 document.getElementById("localeNote").textContent=t.localeNote;
 document.getElementById("search").placeholder=t.search;
 document.getElementById("language").value=language;
 document.getElementById("progressText").textContent=t.progress+": "+getProgress().length+" / 36";
 document.getElementById("progressBar").style.width=(getProgress().length/36*100)+"%";
 const host=document.getElementById("content");host.innerHTML="";
 if(state.module){renderLesson(host);return}
 const q=state.query.toLowerCase();
 COURSE.modules.filter(m=>{const translatedTitle=COURSE_LABELS[language]?.titles[Number(m.id.slice(1))-1]||"";return !q||translatedTitle.toLowerCase().includes(q)||JSON.stringify(m).toLowerCase().includes(q)||JSON.stringify(LESSONS.find(x=>x.module===m.id)).toLowerCase().includes(q)}).forEach(m=>{
 const item=LESSONS.find(x=>x.module===m.id);const card=el("article","module-card");
 const head=el("div","module-icon",m.id.slice(1));card.append(head);
 const translated=COURSE_LABELS[language];
 const moduleTitle=translated?translated.titles[Number(m.id.slice(1))-1]:tr(m.title);
 const moduleDescription=translated?translated.description:tr(m.description);
 card.append(el("h3","",moduleTitle),el("p","",moduleDescription));
 card.append(el("small","muted",getProgress().filter(x=>x.startsWith(m.id+"-")).length+" / 3 "+t.completed));
 const b=el("button","primary",t.start);b.onclick=()=>{state.module=m.id;state.lesson=0;state.answers={};state.score=null;render()};card.append(b);host.append(card)
 });
 if(!host.children.length)host.append(el("p","empty",language==="hi"?"कोई परिणाम नहीं मिला।":"No matching lessons found."));
}
function renderLesson(host){
 host.innerHTML="";
 const m=COURSE.modules.find(x=>x.id===state.module),data=LESSONS.find(x=>x.module===state.module),lesson=data.lessons[state.lesson],t=labels[language];
 const back=el("button","back", "← "+t.back);back.onclick=()=>{state.module=null;render()};host.append(back);
 host.append(el("p","eyebrow",m.id+" · "+t.lesson+" "+(state.lesson+1)+" / 3"),el("h2","lesson-title",tr(lesson.title)),el("p","lesson-intro",tr(lesson.intro)));
 const visual=el("div","diagram");visual.setAttribute("role","img");visual.setAttribute("aria-label",language==="hi"?"सीखने का मुख्य विचार":"Key learning concept");
 const diagrams={M01:"computer-cycle.svg",M02:"hardware-overview.svg",M06:"network-map.svg"};if(diagrams[state.module]){const img=el("img","lesson-diagram");img.src="assets/diagrams/"+diagrams[state.module];img.alt=language==="hi"?"कंप्यूटर का शैक्षिक डायग्राम":"Educational computer diagram";visual.append(img)}else{visual.innerHTML='<div class="flow-step">'+(language==="hi"?"समझें":"LEARN")+'</div><span>→</span><div class="flow-step">'+(language==="hi"?"अभ्यास करें":"PRACTISE")+'</div><span>→</span><div class="flow-step">'+(language==="hi"?"दोहराएँ":"REVIEW")+'</div>'}
 host.append(visual);
 const ul=el("ul","key-points");lesson.points.forEach(p=>ul.append(el("li","",typeof p==="object"?(p[language]||p.en):(language==="hi"?p[1]:p[0]))));host.append(ul);
 const quiz=QUIZZES[m.id];host.append(el("h3","quiz-heading",t.quiz));
 quiz.forEach((item,i)=>{const box=el("fieldset","question");box.append(el("legend","",tr(item.q)));item.o.forEach((opt,j)=>{const lab=el("label","choice");const radio=el("input");radio.type="radio";radio.name="q"+i;radio.value=j;radio.checked=state.answers[i]===j;radio.onchange=()=>{state.answers[i]=j;state.score=null};lab.append(radio,document.createTextNode(" "+tr(opt)));box.append(lab)});host.append(box)});
 const check=el("button","primary",t.check);check.onclick=()=>{state.score=quiz.reduce((s,q,i)=>s+(state.answers[i]===q.a?1:0),0);renderLesson(host)};host.append(check);
 if(state.score!==null){host.append(el("p",state.score===quiz.length?"result good":"result",t.correct+": "+state.score+" / "+quiz.length));quiz.forEach((q,i)=>{const detail=el("p","explanation",tr(q.why));host.append(detail)});if(state.score!==quiz.length)host.append(el("p","muted",t.tryAgain))}
 const done=el("button","secondary",t.done);done.onclick=()=>{saveProgress(m.id+"-"+state.lesson);if(state.lesson<2){state.lesson++;state.answers={};state.score=null;render()}else{state.module=null;render()}};host.append(done);
}
document.getElementById("language").addEventListener("change",e=>{language=e.target.value;try{localStorage.setItem(languageKey,language)}catch{}render()});
document.getElementById("search").addEventListener("input",e=>{state.query=e.target.value;render()});
document.getElementById("content").addEventListener("click",e=>{if(e.target.id==="unused")return});
render();
if("serviceWorker"in navigator)navigator.serviceWorker.register("sw.js").catch(()=>{});
