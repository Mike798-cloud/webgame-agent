import { GENRES } from './data.js';

export const STORAGE_KEY = 'narrative_agent_state_v2';
export const SETTINGS_KEY = 'narrative_agent_settings_v1';

export function normalizeText(input='') {
  return String(input).toLowerCase().replace(/[\s\p{P}\p{S}]+/gu,'');
}
export function grams(input='', n=2) {
  const text = normalizeText(input); const out = new Set();
  if (text.length < n) { if (text) out.add(text); return out; }
  for (let i=0;i<=text.length-n;i++) out.add(text.slice(i,i+n));
  return out;
}
export function jaccard(a,b) {
  const A=grams(a),B=grams(b); if(!A.size&&!B.size)return 1; let inter=0;
  for(const x of A) if(B.has(x)) inter++; const union=A.size+B.size-inter; return union?inter/union:0;
}
const CONCEPT_TERMS=['伪网站','网站','真实','章节','未解锁','入口','下一步','页面','论坛','后台','文案','人物','语言','口语','短句','排比','卡片','渐变','毛玻璃','简笔画','图片','构图','谜题','答案','提示','伏笔','结局','移动端','手机','回跳','信息','文书','聊天','部署','路径','联机','评分','回归','玩家','证据','引用','仓库'];
function conceptSimilarity(a,b){const A=new Set(CONCEPT_TERMS.filter(t=>String(a).includes(t))),B=new Set(CONCEPT_TERMS.filter(t=>String(b).includes(t)));if(!A.size||!B.size)return 0;let i=0;for(const x of A)if(B.has(x))i++;return i/Math.min(A.size,B.size);}

export function reviewExperience(text, experiences=[]) {
  const cleaned=String(text||'').trim(); if(!cleaned)return{worth:0,decision:'忽略',reason:'没有可评审内容',duplicate:null,scope:'临时'};
  let best=null; for(const item of experiences){const s=Math.max(jaccard(cleaned,item.title),jaccard(cleaned,item.body),conceptSimilarity(cleaned,item.title+' '+item.body));if(!best||s>best.score)best={item,score:s};}
  let worth=2; if(cleaned.length>=24)worth++; if(/(因为|否则|导致|避免|应该|不要|必须|适合|例外|前提)/.test(cleaned))worth++; if(/(所有作品|以后|长期|通用|任何项目)/.test(cleaned))worth++; if(/(这个页面|这张图|当前文件|第三页|第\d+页|这一次)/.test(cleaned))worth--; worth=Math.max(1,Math.min(5,worth));
  const duplicate=best&&best.score>=.46?best:null; let decision=worth>=4?'建议保存':worth===3?'建议作为项目经验':'建议仅临时使用'; if(duplicate&&duplicate.score>=.64)decision='建议合并已有经验';
  const scope=/(所有作品|以后|长期|通用)/.test(cleaned)?'全局':/(伪网站|本格|变格|密室|聊天|档案|T\+P|图形)/i.test(cleaned)?'类型':'项目';
  return{worth,decision,scope,duplicate,reason:duplicate?`与「${duplicate.item.title}」存在较高重合，优先补充而不是重复建规则。`:worth>=4?'内容可执行、可复用，适合进入长期经验库。':'更像当前项目的局部判断，先不要扩大成全局规则。'};
}

export function recommendGenres(concept='') {
  const text=normalizeText(concept); const scores=GENRES.map(g=>{let score=g.id==='hybrid'?8:0;for(const cue of g.cues)if(text.includes(normalizeText(cue)))score+=16;if(g.id==='fake-web'&&/(网站|论坛|后台|网页|公告|博客|oa)/i.test(concept))score+=18;if(g.id==='honkaku'&&/(谁|凶手|密室|不在场|时间线|证词|物证)/.test(concept))score+=18;if(g.id==='henkaku'&&/(怪异|诡异|梦|记忆|幻觉|不可靠)/.test(concept))score+=18;if(g.id==='tp'&&/(场景|拖拽|物件|拼图|机关|锈湖)/.test(concept))score+=18;return{...g,score:Math.min(96,score)};}).sort((a,b)=>b.score-a.score);
  const top=scores.filter(x=>x.score>0).slice(0,3); return top.length?top:[{...GENRES.find(g=>g.id==='hybrid'),score:36}];
}
export function buildGenreAdvice(genres=[]){return genres.map((g,i)=>({rank:i+1,name:g.name,score:g.score,core:g.core,style:g.style,avoid:g.avoid,modules:g.modules}));}

const PLACEHOLDER_RE=/^(无|暂无|待定|待完善|todo|tbd|none|测试|test|占位|xxx|n\/a)[\s。！!，,]*$/i;
export function meaningfulText(value='',min=80){
  const raw=String(value||'').trim(); if(!raw||PLACEHOLDER_RE.test(raw))return false;
  const compact=normalizeText(raw); if(compact.length<min)return false;
  const chars=[...compact]; const unique=new Set(chars).size; if(unique<Math.min(18,Math.ceil(chars.length*.06)))return false;
  const repetitive=/(.{1,6})\1{8,}/u.test(compact); return !repetitive;
}
const FIELD_RULES={concept:[40,8],bible:[420,18],architecture:[360,14],puzzles:[300,14],copyPack:[650,16],visual:[260,10],qa:[260,12],deploy:[180,8]};
export function evidenceProfile(project={}){
  const fields={}; let earned=0,total=0;
  for(const [key,[min,weight]] of Object.entries(FIELD_RULES)){const raw=String(project[key]||'');const ok=meaningfulText(raw,min);const partial=!ok&&meaningfulText(raw,Math.max(24,Math.round(min*.3)));fields[key]={ok,partial,length:normalizeText(raw).length,required:min,weight};total+=weight;earned+=ok?weight:partial?Math.round(weight*.35):0;}
  const portfolio=project.portfolioAudit?.repoCount>0; const review=Number(project.review?.score); const reviewAt=Number(project.review?.reviewedAt||0); const updatedAt=Number(project.updatedAt||project.createdAt||0); const freshReview=Number.isFinite(review)&&reviewAt>=updatedAt;
  return{fields,coverage:Math.min(100,Math.round(earned/total*100)),portfolio,hasIndependentReview:freshReview,reviewScore:freshReview?review:null,reviewStale:Number.isFinite(review)&&!freshReview};
}
export function projectCompleteness(project={}){return evidenceProfile(project).coverage;}
export function progressFor(project={},field){const f=evidenceProfile(project).fields[field];return f?f.ok?100:f.partial?35:0:0;}

export function localQa(project={}){
  const issues=[];const push=(severity,title,detail)=>issues.push({severity,title,detail}); const e=evidenceProfile(project);
  if(!e.fields.concept.ok)push('P0','项目核心概念证据不足','核心构想过短、占位或缺失，无法可靠判断类型与制作策略。');
  if(!e.fields.bible.ok)push('P1','故事圣经不足以验收','需要真实事实层、人物动机、知识边界、时间线、玩家认知层与核心谜底，而不是只填摘要。');
  if(!e.fields.architecture.ok)push('P1','页面/信息架构不足以验收','需要页面级进入原因、可见信息、主要出口、下一步依据与回访价值。');
  if(!e.fields.puzzles.ok)push('P1','谜题证据不足','需要前置、线索来源、推理步骤、答案、验证、分层提示与叙事回报。');
  if(!e.fields.copyPack.ok)push('P1','完整文案不足以验收','长篇项目应使用分段文案生产并覆盖主要页面、人物、交互、演出与终局。');
  const combined=[project.bible,project.copyPack,project.architecture].join('\n'); const clichés=['你不该来这里','有些事情最好不要知道','真相从未消失','有些秘密','你看到的未必是真的'];for(const x of clichés)if(combined.includes(x))push('P2','发现高频 AI 恐怖套话',`检测到“${x}”，建议按人物身份和具体情境重写。`);
  if((project.genres||[]).some(g=>g.id==='fake-web')&&/第[一二三四五六七八九十\d]+章|未解锁|完成上一关/.test(combined))push('P1','伪网站出现明显章节化语汇','会削弱真实网站感，优先改成世界内自然入口。');
  if(!(project.genres||[]).length)push('P2','尚未确定类型 DNA','页面、美术、文案和谜题容易各自走向不同风格。');
  if(project.siteAudit?.broken?.length)push('P0','部署巡检发现断链',`实际请求发现 ${project.siteAudit.broken.length} 个 4xx/5xx 或网络失败项，发布前必须修复。`);
  if(project.siteAudit?.outsideBase?.length)push('P1','GitHub Pages 仓库子路径风险',`发现 ${project.siteAudit.outsideBase.length} 个引用逃离仓库子路径，线上可能指向错误根目录。`);
  if(!project.portfolioAudit?.repoCount)push('P2','尚未执行账号作品复盘','如果要让 Agent 继承创作者方法论，应至少完成一次 GitHub 作品集扫描并保存总结。');
  if(!e.hasIndependentReview)push('P1',e.reviewStale?'独立质量评分已过期':'尚无独立质量评分',e.reviewStale?'项目内容在上次评审后发生变化，需要重新验收。':'本地仅能判断材料与硬性缺口；10 分制必须由独立评审基于最终证据生成。');
  return issues;
}

export function strictScore(project={}){
  const e=evidenceProfile(project); if(!e.hasIndependentReview)return null; return Math.max(0,Math.min(10,Number(e.reviewScore.toFixed(2))));
}
export function scoreLabel(project={}){const s=strictScore(project);return s===null?'未评分':`${s.toFixed(2)}`;}

export function escapeHtml(s=''){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
export function formatDate(ts){try{return new Intl.DateTimeFormat('zh-CN',{year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(ts));}catch{return'';}}
export function uid(prefix='id'){return`${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,7)}`;}
