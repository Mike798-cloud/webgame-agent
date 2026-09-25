export const EXPERIENCE_SCHEMA = 'webgame-agent-experience';
export const EXPERIENCE_SCHEMA_VERSION = 4;

export const DEFAULT_EXPERIENCE_CATEGORIES = [
  ['structure','结构','结构、信息架构与整体组织方式'],
  ['copy','文案','角色语言、业务文书与文本自然度'],
  ['character','人物','人物塑造、关系与语言指纹'],
  ['visual','美术','视觉风格、图片与世界内美术来源'],
  ['page','页面','站点、页面与界面结构'],
  ['flow','流程','玩家目标、出口、提示与推进链'],
  ['puzzle','谜题','谜题机制、线索、推理与公平性'],
  ['story','剧情','故事因果、伏笔、反转与结局'],
  ['pace','节奏','信息密度、阅读层级与游玩节奏'],
  ['emotion','情绪','情绪累积、关系动作与情感回报'],
  ['horror','恐怖','恐怖感、异常设计与氛围控制'],
  ['asset','素材','素材引用、清理与资源管理'],
  ['mobile','移动端','手机、平板、触控与响应式'],
  ['interaction','交互','反馈、输入、拖拽与可访问性'],
  ['performance','演出','遮罩、字幕、逐帧与页面演出'],
  ['payment','付款','付款提示与不打断流程的付费交互'],
  ['qa','QA','回归、虚拟玩家、证据与测试方法'],
  ['deploy','部署','GitHub Pages、Worker、路径与网络'],
  ['review','评分','验收、证据制评分与评审隔离'],
  ['repository','资产','仓库、作品归组与历史版本管理'],
  ['creation','创作','创作方法、保留个性与方法论'],
  ['supplemental','补充经验','尚未归入稳定分类的补充经验'],
  ['uncategorized','未分类','导入旧数据或暂时无法判断的经验']
].map(([id,name,description],order)=>({id,name,description,order,builtIn:id==='uncategorized'}));

const LEGACY_CATEGORY_IDS = new Map(DEFAULT_EXPERIENCE_CATEGORIES.map(x=>[x.name,x.id]));
const PROJECT_FIELD_KEYS = new Set([
  'project','projectId','projectIds','projectTitle','projectName','sourceProject','sourceProjectId','sourceProjectTitle',
  'repo','repoUrl','repository','sourceRepo','sourceRepoUrl','githubRepo','githubRepos','githubWorkKey','workKey','deployUrl','homepage',
  'projectSnapshot','projectContext','projectMeta','projectNotes','sourceFile','sourcePath'
]);

const clone=x=>JSON.parse(JSON.stringify(x));
const normalizeSpace=s=>String(s??'').replace(/\s+/g,' ').trim();
const normalizeKey=s=>normalizeSpace(s).toLowerCase().replace(/[\s\p{P}\p{S}]+/gu,'');
const uniq=a=>[...new Set((a||[]).map(x=>String(x).trim()).filter(Boolean))];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,Number(v)||a));

export function makeExperienceId(prefix='exp'){
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;
}

export function defaultExperienceCategories(){return clone(DEFAULT_EXPERIENCE_CATEGORIES);}

function categoryIdFromName(name,categories){
  const n=normalizeSpace(name);if(!n)return'uncategorized';
  const hit=(categories||[]).find(x=>normalizeKey(x.name)===normalizeKey(n));
  if(hit)return hit.id;
  return LEGACY_CATEGORY_IDS.get(n)||'';
}

function uniqueCategoryId(base,categories){
  const raw=String(base||'cat').toLowerCase().replace(/[^a-z0-9_-]+/g,'-').replace(/^-+|-+$/g,'').slice(0,42)||'cat';
  let id=raw,i=2;const used=new Set((categories||[]).map(x=>x.id));while(used.has(id))id=`${raw}-${i++}`;return id;
}

export function ensureExperienceCategory(categories,name,description=''){
  const clean=normalizeSpace(name);if(!clean)return null;
  const existing=(categories||[]).find(x=>normalizeKey(x.name)===normalizeKey(clean));if(existing)return existing;
  const legacy=LEGACY_CATEGORY_IDS.get(clean),id=legacy&&!categories.some(x=>x.id===legacy)?legacy:uniqueCategoryId(`cat-${clean.replace(/[^a-zA-Z0-9]+/g,'')||Date.now().toString(36)}`,categories);
  const item={id,name:clean,description:normalizeSpace(description),order:categories.length,builtIn:false};categories.push(item);return item;
}

export function normalizeExperienceState(state,seedExperiences=[]){
  if(!state||typeof state!=='object')state={};
  state.experiences=Array.isArray(state.experiences)?state.experiences:[];
  const known=new Set(state.experiences.map(x=>x?.id).filter(Boolean));
  for(const seed of seedExperiences||[])if(seed?.id&&!known.has(seed.id))state.experiences.push(clone(seed));

  let categories=Array.isArray(state.experienceCategories)?state.experienceCategories.map((x,i)=>({
    id:normalizeSpace(x?.id)||`cat-${i+1}`,
    name:normalizeSpace(x?.name)||'未分类',
    description:normalizeSpace(x?.description||''),
    order:Number.isFinite(Number(x?.order))?Number(x.order):i,
    builtIn:!!x?.builtIn
  })):[];
  const byId=new Map(categories.map(x=>[x.id,x]));
  for(const d of DEFAULT_EXPERIENCE_CATEGORIES){if(!byId.has(d.id)){categories.push(clone(d));byId.set(d.id,categories[categories.length-1]);}}
  categories.sort((a,b)=>(a.order??999)-(b.order??999)||a.name.localeCompare(b.name,'zh-CN'));
  categories.forEach((x,i)=>x.order=i);

  const legacyNames=new Set(state.experiences.map(x=>normalizeSpace(x?.category)).filter(Boolean));
  for(const name of legacyNames)if(!categoryIdFromName(name,categories))ensureExperienceCategory(categories,name,'由旧版经验分类迁移');

  state.experiences=state.experiences.filter(Boolean).map((raw,index)=>normalizeExperienceRecord(raw,categories,index));
  state.experienceCategories=categories;
  state.experienceLibraryVersion=EXPERIENCE_SCHEMA_VERSION;
  return state;
}

export function normalizeExperienceRecord(raw,categories,index=0){
  const x={...(raw||{})};
  let categoryId=normalizeSpace(x.categoryId);
  if(!categoryId||!(categories||[]).some(c=>c.id===categoryId))categoryId=categoryIdFromName(x.category,categories)||'uncategorized';
  if(!(categories||[]).some(c=>c.id===categoryId))categoryId='uncategorized';
  const out={
    id:normalizeSpace(x.id)||makeExperienceId('exp'),
    scope:['全局','类型','项目','临时'].includes(x.scope)?x.scope:'全局',
    categoryId,
    title:String(x.title||'').trim()||`未命名经验 ${index+1}`,
    body:String(x.body||x.content||'').trim(),
    genres:uniq(x.genres),
    tags:uniq(x.tags),
    priority:clamp(x.priority||3,1,5),
    createdAt:Number(x.createdAt)||undefined,
    updatedAt:Number(x.updatedAt)||undefined,
    needsReview:!!x.needsReview
  };
  for(const [k,v] of Object.entries(x)){
    if(PROJECT_FIELD_KEYS.has(k)||k==='category'||k==='content'||k in out)continue;
    if(['revision','previousHash','importedAt','importedFromId'].includes(k))out[k]=v;
  }
  return out;
}

export function experienceCategoryName(exp,categories){return(categories||[]).find(x=>x.id===exp?.categoryId)?.name||'未分类';}

export function categoryCounts(experiences,categories){
  const out=Object.fromEntries((categories||[]).map(x=>[x.id,0]));
  for(const e of experiences||[])out[e.categoryId]=(out[e.categoryId]||0)+1;
  return out;
}

function collectProjectIdentifiers(projects=[]){
  const ids=[];for(const p of projects||[]){
    const add=v=>{const s=normalizeSpace(v);if(s&&s.length>=3)ids.push(s);};
    add(p?.title);add(p?.githubWorkKey);add(p?.deployUrl);
    const repos=p?.githubRepos||{};add(repos.main);for(const k of ['guides','old','tests'])for(const r of repos[k]||[])add(r);
  }
  return [...new Set(ids)].sort((a,b)=>b.length-a.length);
}

export function findExperienceLeaks(text,projects=[]){
  const raw=String(text||''),hits=[];
  for(const id of collectProjectIdentifiers(projects))if(id&&raw.includes(id))hits.push(id);
  const urls=raw.match(/https?:\/\/[^\s)\]}>"']+/gi)||[];for(const u of urls)hits.push(u);
  const gh=raw.match(/(?:github\.com\/)?[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+/g)||[];for(const g of gh)if(/github\.com|Mike798-cloud|github\.io/i.test(g))hits.push(g);
  return [...new Set(hits)].slice(0,12);
}

export function deprojectizeText(text,projects=[]){
  let out=String(text||'');
  for(const id of collectProjectIdentifiers(projects))if(id)out=out.split(id).join(id.startsWith('http')?'部署地址':'作品');
  out=out.replace(/https?:\/\/[^\s)\]}>"']+/gi,'[项目链接]')
    .replace(/(?:当前|这个|本)(?:项目|作品|页面|关卡)/g,(m)=>m.includes('页面')?'页面':'作品')
    .replace(/这(?:个|一)次(?:修改|反馈|测试)/g,'一次修改或测试')
    .replace(/第\s*\d+\s*(?:页|章|关)/g,'某个阶段');
  return out.trim();
}

export function sanitizeExperienceForStorage(raw,projects=[],categories=[]){
  const base=normalizeExperienceRecord(raw,categories);
  base.title=deprojectizeText(base.title,projects);
  base.body=deprojectizeText(base.body,projects);
  const leaks=findExperienceLeaks(`${base.title}\n${base.body}`,projects);
  base.needsReview=base.needsReview||leaks.length>0;
  return{record:base,leaks};
}

export function experienceFingerprint(exp){return normalizeKey(`${exp?.title||''}\n${exp?.body||''}`);}

export function buildExperienceExport(state){
  const projects=state?.projects||[];
  const categories=(state?.experienceCategories||[]).map((x,i)=>({
    id:x.id,
    name:deprojectizeText(x.name,projects)||'未分类',
    description:deprojectizeText(x.description||'',projects),
    order:i
  }));
  const exported=[],sanitized=[];
  for(const e of state?.experiences||[]){
    const {record,leaks}=sanitizeExperienceForStorage(e,projects,categories);
    const clean={id:record.id,scope:record.scope,categoryId:record.categoryId,title:record.title,body:record.body,genres:record.genres,tags:record.tags,priority:record.priority};
    if(record.createdAt)clean.createdAt=record.createdAt;
    if(record.updatedAt)clean.updatedAt=record.updatedAt;
    if(record.needsReview)clean.needsReview=true;
    exported.push(clean);
    if(leaks.length||record.needsReview)sanitized.push({id:record.id,reason:leaks.length?'export_sanitized':'needs_review'});
  }
  return{
    payload:{
      schema:EXPERIENCE_SCHEMA,
      version:EXPERIENCE_SCHEMA_VERSION,
      exportedAt:new Date().toISOString(),
      categories,
      experiences:exported,
      stats:{sourceTotal:(state?.experiences||[]).length,exported:exported.length,sanitized:sanitized.length,excluded:0}
    },
    excluded:[],
    sanitized
  };
}

function sourceExperiencePayload(obj){
  if(obj?.schema===EXPERIENCE_SCHEMA&&Array.isArray(obj.experiences))return{categories:obj.categories||[],experiences:obj.experiences,projects:[]};
  if(Array.isArray(obj?.experiences))return{categories:obj.categories||obj.experienceCategories||[],experiences:obj.experiences,projects:[]};
  if(Array.isArray(obj?.state?.experiences))return{categories:obj.state.experienceCategories||[],experiences:obj.state.experiences,projects:Array.isArray(obj.state.projects)?obj.state.projects:[]};
  throw new Error('文件中没有可识别的经验库数据');
}

export function prepareExperienceImport(obj,state){
  const source=sourceExperiencePayload(obj),incomingCategories=[];
  for(const c of source.categories||[]){const name=normalizeSpace(c?.name||c?.category);if(!name)continue;incomingCategories.push({id:normalizeSpace(c?.id),name,description:normalizeSpace(c?.description),order:Number(c?.order)||incomingCategories.length});}
  for(const e of source.experiences||[]){const name=normalizeSpace(e?.category);if(name&&!incomingCategories.some(c=>normalizeKey(c.name)===normalizeKey(name)))incomingCategories.push({id:'',name,description:'由旧版经验导入',order:incomingCategories.length});}

  const tempCategories=clone(state.experienceCategories||[]),categoryIdMap=new Map();
  for(const c of incomingCategories){
    let target=tempCategories.find(x=>normalizeKey(x.name)===normalizeKey(c.name));
    if(!target)target=ensureExperienceCategory(tempCategories,c.name,c.description);
    if(c.id)categoryIdMap.set(c.id,target.id);
  }
  const localFingerprints=new Map((state.experiences||[]).map(e=>[experienceFingerprint(e),e]));
  const localById=new Map((state.experiences||[]).map(e=>[e.id,e]));
  const newItems=[],conflicts=[],duplicates=[],blocked=[];
  const projectContext=[...(state.projects||[]),...(source.projects||[])];
  for(const raw of source.experiences||[]){
    const sourceCategoryId=normalizeSpace(raw?.categoryId),legacyName=normalizeSpace(raw?.category);
    let mapped=categoryIdMap.get(sourceCategoryId)||categoryIdFromName(legacyName,tempCategories)||sourceCategoryId;
    if(!tempCategories.some(c=>c.id===mapped))mapped='uncategorized';
    const {record,leaks}=sanitizeExperienceForStorage({...raw,categoryId:mapped},projectContext,tempCategories);
    if(leaks.length){blocked.push({record,leaks});continue;}
    const fp=experienceFingerprint(record);if(localFingerprints.has(fp)){duplicates.push({record,existing:localFingerprints.get(fp)});continue;}
    const sameId=localById.get(record.id);if(sameId){conflicts.push({record,existing:sameId});continue;}
    newItems.push(record);localFingerprints.set(fp,record);
  }
  const addedCategories=tempCategories.filter(c=>!(state.experienceCategories||[]).some(x=>x.id===c.id));
  return{sourceKind:obj?.schema===EXPERIENCE_SCHEMA?'experience':'legacy',categories:tempCategories,addedCategories,newItems,conflicts,duplicates,blocked,total:(source.experiences||[]).length};
}

export function applyExperienceImportPlan(state,plan,{conflictStrategy='keep-local'}={}){
  state.experienceCategories=clone(plan.categories||state.experienceCategories||[]);
  const byId=new Map((state.experiences||[]).map(x=>[x.id,x]));
  let added=0,replaced=0,keptBoth=0;
  for(const item of plan.newItems||[]){state.experiences.push({...clone(item),importedAt:Date.now()});added++;}
  for(const c of plan.conflicts||[]){
    if(conflictStrategy==='use-import'){
      const idx=state.experiences.findIndex(x=>x.id===c.existing.id);if(idx>=0){state.experiences[idx]={...clone(c.record),importedAt:Date.now()};replaced++;}
    }else if(conflictStrategy==='keep-both'){
      state.experiences.push({...clone(c.record),id:makeExperienceId('exp'),importedFromId:c.record.id,importedAt:Date.now()});keptBoth++;
    }
  }
  return{added,replaced,keptBoth,duplicates:(plan.duplicates||[]).length,blocked:(plan.blocked||[]).length};
}

export function filterExperienceItems(experiences,categories,{query='',categoryId='all'}={}){
  const q=normalizeKey(query);return(experiences||[]).filter(e=>{
    if(categoryId&&categoryId!=='all'&&e.categoryId!==categoryId)return false;
    if(!q)return true;const cat=experienceCategoryName(e,categories),hay=normalizeKey([e.title,e.body,e.scope,cat,...(e.tags||[]),...(e.genres||[])].join(' '));return hay.includes(q);
  });
}
