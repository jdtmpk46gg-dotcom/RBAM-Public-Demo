"use strict";
const scenarios={
  normal:{v:[100,98,5000,4800],score:32,classification:"NO SUPPORTED IMBALANCE",pattern:"Stable",history:"No concern pattern",quality:"Complete",confidence:"Low concern",response:"Continue observation. No simulated escalation is indicated."},
  watch:{v:[100,88,5000,4800],score:58,classification:"WATCH",pattern:"Moderate deviation",history:"Similar temporary deviation seen before",quality:"Complete",confidence:"Watch",response:"Advisory: review trend and continue observation."},
  imbalance:{v:[100,80,5000,4300],score:92,classification:"POSSIBLE LINE IMBALANCE",pattern:"Flow and pressure deviation",history:"Comparable concern pattern available",quality:"Complete",confidence:"Strong concern signal",response:"Advisory: operator review recommended. No physical action is authorized by this demo."},
  missing:{v:[100,"—",5000,4300],score:45,classification:"INSUFFICIENT DATA",pattern:"Missing outlet-flow signal",history:"History cannot replace missing current evidence",quality:"Incomplete",confidence:"Uncertain",response:"Advisory: verify the missing signal before stronger attribution."}
};
let runs=0,concerns=0,missing=0;
const $=id=>document.getElementById(id);
document.querySelectorAll(".gridnav button").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".gridnav button").forEach(b=>b.classList.remove("active"));btn.classList.add("active");document.querySelectorAll(".panel").forEach(p=>p.classList.remove("show"));$(btn.dataset.target).classList.add("show");}));
function runScenario(name){const s=scenarios[name];["inFlow","outFlow","inPressure","outPressure"].forEach((id,i)=>$(id).textContent=s.v[i]);$("score").textContent=s.score+"%";$("classBadge").textContent=s.classification;$("pattern").textContent=s.pattern;$("historyContext").textContent=s.history;$("quality").textContent=s.quality;$("confidenceText").textContent=s.confidence;$("responseText").textContent=s.response;runs++;if(name==="watch"||name==="imbalance")concerns++;if(name==="missing")missing++;$("runCount").textContent=runs;$("concernCount").textContent=concerns;$("missingCount").textContent=missing;const tr=document.createElement("tr");tr.innerHTML=`<td>${name.replace(/^./,c=>c.toUpperCase())} scenario</td><td>${s.pattern}</td><td>${s.classification}</td><td>Simulation recorded</td>`;$("historyRows").prepend(tr);document.querySelector('[data-target="appraise"]').click();}
function ack(msg){$("commandStatus").textContent=`${msg} · simulated operator acknowledgement recorded locally.`;}
window.runScenario=runScenario;window.ack=ack;
