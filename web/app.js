let language="en";
const labels={
en:{eyebrow:"FREE DIGITAL EDUCATION",heroTitle:"Computer knowledge for everyone.",heroText:"Learn step by step with short lessons, practical tips and quick quizzes.",pathLabel:"YOUR LEARNING PATH",moduleHeading:"Explore computer topics",search:"Search lessons or topics…",progress:"Your progress",continue:"Continue learning",start:"Open module",lesson:"Lesson",quiz:"Quick quiz",check:"Check answers",next:"Next lesson",back:"Back to modules",done:"Mark lesson complete",completed:"Completed",of:"of",correct:"Correct",tryAgain:"Review and try again",allDone:"You completed all lessons!",source:"Learning is free. Your progress is saved on this device."},
hi:{eyebrow:"मुफ्त डिजिटल शिक्षा",heroTitle:"हर किसी के लिए कंप्यूटर की शिक्षा।",heroText:"छोटे पाठ, उपयोगी सुझाव और क्विज के साथ कदम-दर-कदम सीखें।",pathLabel:"आपकी सीखने की यात्रा",moduleHeading:"कंप्यूटर के विषय जानें",search:"पाठ या विषय खोजें…",progress:"आपकी प्रगति",continue:"सीखना जारी रखें",start:"मॉड्यूल खोलें",lesson:"पाठ",quiz:"छोटा क्विज",check:"उत्तर जाँचें",next:"अगला पाठ",back:"मॉड्यूल पर वापस",done:"पाठ पूरा करें",completed:"पूरा हुआ",of:"में से",correct:"सही",tryAgain:"दोबारा पढ़ें और प्रयास करें",allDone:"आपने सभी पाठ पूरे कर लिए!",source:"शिक्षा मुफ्त है। आपकी प्रगति इसी डिवाइस पर सेव होती है।"}
};
const state={module:null,lesson:0,query:"",answers:{},score:null};
const progressKey="computer-siksha-progress-v2";
function getProgress(){try{return JSON.parse(localStorage.getItem(progressKey)||"[]")}catch{return[]}}
function saveProgress(id){const p=getProgress();if(!p.includes(id))p.push(id);localStorage.setItem(progressKey,JSON.stringify(p));render()}
function tr(obj){return obj[language]||obj.en}
function el(tag,cls,txt){const n=document.createElement(tag);if(cls)n.className=cls;if(txt!==undefined)n.textContent=txt;return n}
function render(){
 const t=labels[language];document.documentElement.lang=language;
 ["eyebrow","heroTitle","heroText","pathLabel","moduleHeading"].forEach(id=>document.getElementById(id).textContent=t[id]);
 document.getElementById("source").textContent=t.source;
 document.getElementById("search").placeholder=t.search;
 document.getElementById("language").value=language;
 document.getElementById("progressText").textContent=t.progress+": "+getProgress().length+" / 36";
 document.getElementById("progressBar").style.width=(getProgress().length/36*100)+"%";
 const host=document.getElementById("content");host.innerHTML="";
 if(state.module){renderLesson(host);return}
 const q=state.query.toLowerCase();
 COURSE.modules.filter(m=>!q||JSON.stringify(m).toLowerCase().includes(q)||JSON.stringify(LESSONS.find(x=>x.module===m.id)).toLowerCase().includes(q)).forEach(m=>{
 const item=LESSONS.find(x=>x.module===m.id);const card=el("article","module-card");
 const head=el("div","module-icon",m.id.slice(1));card.append(head);
 card.append(el("h3","",tr(m.title)),el("p","",tr(m.description)));
 card.append(el("small","muted",getProgress().filter(x=>x.startsWith(m.id+"-")).length+" / 3 "+t.completed));
 const b=el("button","primary",t.start);b.onclick=()=>{state.module=m.id;state.lesson=0;state.answers={};state.score=null;render()};card.append(b);host.append(card)
 });
 if(!host.children.length)host.append(el("p","empty",language==="hi"?"कोई परिणाम नहीं मिला।":"No matching lessons found."));
}
function renderLesson(host){
 host.innerHTML="";
 const m=COURSE.modules.find(x=>x.id===state.module),data=LESSONS.find(x=>x.module===state.module),lesson=data.lessons[state.lesson],t=labels[language];
 const back=el("button","back", "← "+t.back);back.onclick=()=>{state.module=null;render()};host.append(back);
 host.append(el("p","eyebrow",m.id+" · "+t.lesson+" "+(state.lesson+1)+" / 3),el("h2","lesson-title",tr(lesson.title)),el("p","lesson-intro",tr(lesson.intro)));
 const visual=el("div","diagram");visual.setAttribute("role","img");visual.setAttribute("aria-label",language==="hi"?"सीखने का मुख्य विचार":"Key learning concept");
 const diagrams={M01:"computer-cycle.svg",M02:"hardware-overview.svg",M06:"network-map.svg"};if(diagrams[state.module]){const img=el("img","lesson-diagram");img.src="assets/diagrams/"+diagrams[state.module];img.alt=language==="hi"?"कंप्यूटर का शैक्षिक डायग्राम":"Educational computer diagram";visual.append(img)}else{visual.innerHTML='<div class="flow-step">'+(language==="hi"?"समझें":"LEARN")+'</div><span>→</span><div class="flow-step">'+(language==="hi"?"अभ्यास करें":"PRACTISE")+'</div><span>→</span><div class="flow-step">'+(language==="hi"?"दोहराएँ":"REVIEW")+'</div>'}
 host.append(visual);
 const ul=el("ul","key-points");lesson.points.forEach(p=>ul.append(el("li","",p[language])));host.append(ul);
 const quiz=QUIZZES[m.id];host.append(el("h3","quiz-heading",t.quiz));
 quiz.forEach((item,i)=>{const box=el("fieldset","question");box.append(el("legend","",tr(item.q)));item.o.forEach((opt,j)=>{const lab=el("label","choice");const radio=el("input");radio.type="radio";radio.name="q"+i;radio.value=j;radio.checked=state.answers[i]===j;radio.onchange=()=>{state.answers[i]=j;state.score=null};lab.append(radio,document.createTextNode(" "+tr(opt)));box.append(lab)});host.append(box)});
 const check=el("button","primary",t.check);check.onclick=()=>{state.score=quiz.reduce((s,q,i)=>s+(state.answers[i]===q.a?1:0),0);renderLesson(host)};host.append(check);
 if(state.score!==null){host.append(el("p",state.score===quiz.length?"result good":"result",t.correct+": "+state.score+" / "+quiz.length));quiz.forEach((q,i)=>{const detail=el("p","explanation",tr(q.why));host.append(detail)});if(state.score!==quiz.length)host.append(el("p","muted",t.tryAgain))}
 const done=el("button","secondary",t.done);done.onclick=()=>{saveProgress(m.id+"-"+state.lesson);if(state.lesson<2){state.lesson++;state.answers={};state.score=null;render()}else{state.module=null;render()}};host.append(done);
}
document.getElementById("language").addEventListener("change",e=>{language=e.target.value;render()});
document.getElementById("search").addEventListener("input",e=>{state.query=e.target.value;render()});
document.getElementById("content").addEventListener("click",e=>{if(e.target.id==="unused")return});
render();
if("serviceWorker"in navigator)navigator.serviceWorker.register("sw.js").catch(()=>{});
