export const GENRES = [
  {
    id: 'fake-web', name: '伪网站 / 网络调查', weight: 0,
    cues: ['网站','论坛','后台','公告','帖子','网页','社交','博客','档案','校园','物业','医院','官网','旧站','调查'],
    core: '真实性、信息关系、自然暴露入口。玩家应该像在浏览真实存在的网站，而不是章节菜单。',
    style: '按世界内载体分别设计：官网、旧论坛、OA、博客、聊天、档案必须长得不一样；允许“土”，禁止统一 SaaS 卡片皮肤。',
    avoid: ['大面积“未解锁”入口','所有页面同一模板','无理由 glitch','为了游戏感而存在的进度锁'],
    modules: ['信息架构','页面真实性','跨页线索','账号/权限逻辑','虚拟玩家路线'],
    palette: '年代/机构导向，而不是预设恐怖配色'
  },
  {
    id: 'honkaku', name: '本格推理', weight: 0,
    cues: ['密室','不可能犯罪','凶手','时间线','证词','物证','尸体','案发','推理','不在场证明','诡计'],
    core: '公平线索、可验证因果、空间与时间闭环。最终解答应能由此前信息推出。',
    style: '克制、清晰、证据优先；图示和平面图要能辅助推理，异常效果不能遮蔽事实。',
    avoid: ['靠结局补设定','关键事实只在作者脑中','谜底依赖冷知识','超自然万能解释'],
    modules: ['案件真相表','证据链','嫌疑人知识边界','时间线','反证检查'],
    palette: '纸档案、调查板、机构记录、场景图示'
  },
  {
    id: 'henkaku', name: '变格 / 心理异常', weight: 0,
    cues: ['梦','记忆','精神','幻觉','怪谈','诡异','不可靠','失真','循环','意识','异象'],
    core: '认知不可靠与异常体验，但作品内部仍要有规则；异常必须服务主题与人物。',
    style: '允许错位、重复、非稳定文本和象征画面，但可读性与线索锚点优先。',
    avoid: ['“因为疯了所以都能解释”','全程故障字','纯随机惊吓','用晦涩替代深度'],
    modules: ['认知层','现实/异常对照','象征规则','情绪曲线','解释边界'],
    palette: '受人物心理与载体影响，可局部非现实化'
  },
  {
    id: 'closed-room', name: '密室 / 空间诡计', weight: 0,
    cues: ['房间','密室','门窗','监控','平面图','楼层','走廊','时间差','机关','路径'],
    core: '空间理解、行动可行性、时间窗口与物理规则。',
    style: '图面信息必须清楚，交互适合测量、比对、切换视角，不用装饰掩盖几何关系。',
    avoid: ['平面图不可信','机关无前置','关键尺度缺失','只有作者知道的视角信息'],
    modules: ['空间图','动作序列','可行性验证','监控/门禁时间轴','替代解排除'],
    palette: '技术图、建筑资料、现场记录'
  },
  {
    id: 'chat-social', name: '聊天室 / 社交叙事', weight: 0,
    cues: ['聊天','群聊','私信','同学','朋友','社交','留言','群','对话'],
    core: '人物声线、关系距离、情绪变化和信息泄露方式。',
    style: '界面服从年代和平台；头像、昵称、在线状态、时间戳承担叙事，不靠旁白解释。',
    avoid: ['所有人同一种冷静腔','一句一句机械短句','聊天里写小说旁白','每条消息都承担线索'],
    modules: ['人物语言指纹','关系图','聊天节奏','情绪状态','无关生活信息'],
    palette: '依据年代聊天工具，不默认现代 IM'
  },
  {
    id: 'archive', name: '档案调查 / 文书叙事', weight: 0,
    cues: ['档案','卷宗','报告','记录','维修','病历','工作单','登记','日志','文件'],
    core: '文书真实性与“不同机构留下不同视角”的拼接感。',
    style: '排版、字段、措辞、盖章/编号逻辑要像真正业务文书；文学性放在缝隙，不直接写成小说。',
    avoid: ['维修单写得像散文','所有文书同一格式','编号无规律','为伏笔而硬写异常句'],
    modules: ['文书模板库','编号规则','机构措辞','版本/涂改','跨文书冲突'],
    palette: '纸张、打印、扫描、表格、机构色'
  },
  {
    id: 'tp', name: 'T+P 场景交互 / 图形解谜', weight: 0,
    cues: ['拖拽','物品','场景','点击','机关','收纳','拼图','锈湖','单画面','图形','物件'],
    core: '所见即所得、空间反馈、物件因果和视觉可读性。',
    style: '减少网页组件感，使用完整场景、物件层级、动作反馈和局部演出。',
    avoid: ['按钮化一切','点击后只弹白框','简笔画占位','互动和剧情互不相关'],
    modules: ['场景状态机','物件热区','拖拽反馈','演出帧','可逆/不可逆操作'],
    palette: '由场景美术统一，而不是 UI 主题色'
  },
  {
    id: 'hybrid', name: 'H+C+J 混合叙事解谜', weight: 0,
    cues: ['剧情','线索','网页','解谜','调查','多页面','论坛','故事'],
    core: '网页探索(H)、线索推理(C)、剧情阅读(J)互相推动，而不是各做各的。',
    style: '多载体但统一世界观；每个页面既有生活信息，也有明确推进价值。',
    avoid: ['阅读量巨大但不产生决策','密码谜题堆积','每页一个孤立小游戏','线索无回报'],
    modules: ['玩家认知层','信息释放表','谜题图','页面树','节奏曲线'],
    palette: '按载体差异化，统一在细节而不是统一模板'
  }
];

export const EXPERIENCE_SEED = [
  {id:'g01',scope:'全局',category:'结构',title:'单阶段只暴露一个主要新出口',body:'页面内部可以有大量信息，但新的推进方向尽量唯一。出口要由内容关系自然指向，而不是靠“下一章”按钮。',genres:['fake-web','hybrid'],priority:5},
  {id:'g02',scope:'全局',category:'结构',title:'网站先像网站，再像游戏',body:'伪网站首先要自洽为现实中的信息载体。不要用大面积未解锁入口、章节锁、任务面板破坏真实性。',genres:['fake-web'],priority:5},
  {id:'g03',scope:'全局',category:'文案',title:'禁止统一 AI 恐怖腔',body:'避免“你不该来这里”“有些事最好不知道”等高频套话、故弄玄虚排比、机械短句和所有角色同声线。',genres:['fake-web','henkaku','chat-social','hybrid'],priority:5},
  {id:'g04',scope:'全局',category:'人物',title:'角色必须有语言指纹',body:'为角色定义句长、口头禅、标点、错别字、表情、文化程度、关系距离和当前情绪；熟人与陌生人的表达不能一样。',genres:['chat-social','hybrid','fake-web'],priority:5},
  {id:'g05',scope:'全局',category:'美术',title:'禁止无意义的 AI 建站卡片感',body:'圆角卡片、紫蓝渐变、玻璃拟态和统一组件不是“精致”的同义词。只有世界内产品确实需要时才使用。',genres:['fake-web','archive','hybrid'],priority:5},
  {id:'g06',scope:'全局',category:'美术',title:'禁止简笔画充当关键美术',body:'重要人物、场景、证物、桌面图标和演出画面不能用廉价占位线稿破坏沉浸。',genres:['tp','hybrid','fake-web'],priority:5},
  {id:'g07',scope:'全局',category:'页面',title:'不同站点必须有不同设计来源',body:'学校官网、地方论坛、私人博客、OA、聊天软件、维修后台不应共享同一视觉模板；差异来自时代、机构和使用目的。',genres:['fake-web','hybrid'],priority:5},
  {id:'g08',scope:'全局',category:'流程',title:'每页都回答“玩家凭什么知道下一步”',body:'作者知道入口不等于玩家知道。QA 必须从玩家已知信息推导下一步；若只能靠遍历点击，则判定为流程风险。',genres:['fake-web','hybrid','honkaku'],priority:5},
  {id:'g09',scope:'全局',category:'谜题',title:'答案必须有来源',body:'任何密码、账号、顺序、日期、坐标都要有可追溯来源，并且来源在玩家可获得范围内。',genres:['honkaku','fake-web','closed-room','hybrid'],priority:5},
  {id:'g10',scope:'全局',category:'谜题',title:'防止伪谜题',body:'单纯找到四位数字再输入不自动等于谜题。应包含观察、关联、推理、验证中的至少两个步骤。',genres:['honkaku','fake-web','hybrid'],priority:4},
  {id:'g11',scope:'全局',category:'流程',title:'提示不能直接剧透答案',body:'提示分层：先提醒观察对象，再提醒关系，最后才接近操作；提示应该恢复推理路径，而不是代替推理。',genres:['honkaku','fake-web','tp','hybrid'],priority:4},
  {id:'g12',scope:'全局',category:'剧情',title:'玩家认知层与真实事实层分离',body:'同时维护“真实发生了什么”和“此刻玩家相信什么”。防止页面提前泄露真相，也防止角色知道不该知道的信息。',genres:['honkaku','henkaku','fake-web','hybrid'],priority:5},
  {id:'g13',scope:'全局',category:'剧情',title:'伏笔必须有回收',body:'重要异常、名字、时间、物件、照片细节若被强调，应在后续得到解释、反转或情绪回报；不要只留下“神秘感”。',genres:['honkaku','henkaku','hybrid'],priority:5},
  {id:'g14',scope:'全局',category:'剧情',title:'结局不靠硬悬念逃避解释',body:'可以保留余味，但核心人物关系、关键事件因果和玩家一路追查的问题需要交代。',genres:['honkaku','hybrid','fake-web'],priority:5},
  {id:'g15',scope:'全局',category:'节奏',title:'信息丰富不等于信息同权堆积',body:'论坛帖子、回复、档案数量增加时，使用标题、时间、用户关系、回复量、视觉层级建立阅读优先级。',genres:['fake-web','archive','hybrid'],priority:4},
  {id:'g16',scope:'全局',category:'节奏',title:'生活化无关信息用于建立真实感',body:'不是所有文本都承担线索。适量真正无关的生活信息可以让载体可信，但要控制密度，避免淹没有效信息。',genres:['fake-web','chat-social','archive'],priority:4},
  {id:'g17',scope:'全局',category:'文案',title:'文书按身份写，不按文学腔写',body:'公告、维修单、病历、警方记录、学生聊天分别遵守其业务措辞。文学性应来自事实之间的落差，而不是所有文件都写成散文。',genres:['archive','fake-web','honkaku'],priority:5},
  {id:'g18',scope:'全局',category:'情绪',title:'恐怖之后的情绪落点要靠人物关系累积',body:'想要后段遗憾或感动，必须在前中段留下具体生活细节、关系动作和未完成之事，而不是结局突然煽情。',genres:['hybrid','henkaku','fake-web'],priority:5},
  {id:'g19',scope:'全局',category:'恐怖',title:'恐怖不等于降亮度和 glitch',body:'异常来自信息不一致、缺席、时间错位、熟悉事物中的不对劲。低亮度、噪点、故障字只做局部强化。',genres:['henkaku','fake-web','hybrid'],priority:5},
  {id:'g20',scope:'全局',category:'美术',title:'图片先定义世界内来源',body:'生成图片前先写明“谁拍的、何时拍、为什么存在、后来如何被保存”。构图、器材、压缩和缺陷都从来源推导。',genres:['fake-web','archive','hybrid'],priority:5},
  {id:'g21',scope:'全局',category:'美术',title:'避免过分完整的 AI 构图',body:'纪实图允许遮挡、偏构图、曝光差、主体不看镜头、局部裁切；不要每张都像宣传海报或电影剧照。',genres:['fake-web','archive','hybrid'],priority:4},
  {id:'g22',scope:'全局',category:'素材',title:'实际引用文件才进入发布包',body:'发布与评分只考虑真实被引用的文件；清理旧版残留、重复图片、无引用脚本和失效资源，避免误判与体积膨胀。',genres:['fake-web','tp','hybrid'],priority:5},
  {id:'g23',scope:'全局',category:'素材',title:'关键图片不得重复表达同一信息',body:'不同页面若使用图片，应承担不同叙事功能。重复素材会让多站点看起来像同一模板换皮。',genres:['fake-web','hybrid'],priority:4},
  {id:'g24',scope:'全局',category:'移动端',title:'移动端不是缩小版 PC',body:'检查触控热区、字体、横向溢出、固定栏遮挡、谜题操作区域和弹窗高度；必要时改变布局而不是只缩放。',genres:['fake-web','tp','hybrid'],priority:5},
  {id:'g25',scope:'全局',category:'交互',title:'所有可点击元素必须有明确反馈',body:'按钮、热点、拖拽、提交和加载都要有 hover/focus/pressed/success/error 状态，不能出现“点了像没点”的情况。',genres:['tp','fake-web','hybrid'],priority:5},
  {id:'g26',scope:'全局',category:'交互',title:'关键操作不要只靠颜色区分',body:'线索状态、成功失败、已读未读需同时通过文字、图形或结构表达，兼顾可访问性与低质量屏幕。',genres:['fake-web','tp','hybrid'],priority:3},
  {id:'g27',scope:'全局',category:'流程',title:'回跳必须有叙事或操作理由',body:'不要为了延长时长让玩家频繁返回旧页面。若需要回看，应有新获得的信息让旧内容产生新意义。',genres:['fake-web','honkaku','hybrid'],priority:5},
  {id:'g28',scope:'全局',category:'演出',title:'不依赖 BGM/视频也能完成节奏',body:'优先使用遮罩、字幕、逐字、滚动、局部帧动画、页面切换和停顿构成演出，保证静音和低带宽环境仍完整。',genres:['fake-web','tp','hybrid','henkaku'],priority:4},
  {id:'g29',scope:'全局',category:'演出',title:'逐帧动画要服务关键节点',body:'伪纪录片、梦核或恐怖段落可用低帧率轮播制造“录像感”，但不要在普通页面滥用造成等待。',genres:['henkaku','tp','hybrid'],priority:3},
  {id:'g30',scope:'全局',category:'付款',title:'付费提示只自动弹一次且不破坏流程',body:'自动弹出一次，关闭后不重复打断；位置与提示系统协调，移动端不遮挡关键交互。',genres:['fake-web','tp','hybrid'],priority:4},
  {id:'g31',scope:'全局',category:'QA',title:'修改后必须从零回归完整流程',body:'不能只验证被改页面。清空本地状态，从入口走到结局，至少复测一次正常路线和一次错误/返回路线。',genres:['fake-web','tp','honkaku','hybrid'],priority:5},
  {id:'g32',scope:'全局',category:'QA',title:'制作 Agent 与评分 Agent 分离',body:'评分时只看最终产物，不读取“这次改了多少”。避免修改者给自己虚高评分。',genres:['fake-web','tp','honkaku','hybrid'],priority:5},
  {id:'g33',scope:'全局',category:'QA',title:'虚拟玩家只能看到当前可见信息',body:'模拟玩家测试时禁止读取完整真相和未来页面，否则会产生虚假的“引导很清楚”。',genres:['fake-web','honkaku','hybrid'],priority:5},
  {id:'g34',scope:'全局',category:'部署',title:'GitHub Pages 路径必须按仓库子路径测试',body:'不要默认站点运行在域名根目录。资源使用相对路径或正确 base，测试 404、大小写和本地/线上差异。',genres:['fake-web','tp','hybrid'],priority:5},
  {id:'g35',scope:'全局',category:'部署',title:'第三方联机服务要考虑中国大陆可达性',body:'海外正常不代表大陆稳定。多人功能需要超时、重连、降级和替代部署方案，不把核心单人流程绑死在联机上。',genres:['hybrid'],priority:4},
  {id:'g36',scope:'全局',category:'评分',title:'目标分数是验收线，不是生成结果',body:'9.5 代表剧情、流程、视觉、交互、移动端和完成度都接近发行级；Agent 不因“完成了修改”自动抬分。',genres:['fake-web','tp','honkaku','hybrid'],priority:5},
  {id:'g37',scope:'全局',category:'评分',title:'完整度与质量评分必须分离',body:'字段被填满只能证明材料可进入验收，不能证明质量高。正式 10 分制必须逐项给出证据；证据不足允许不评分。',genres:['fake-web','tp','honkaku','hybrid'],priority:5},
  {id:'g38',scope:'全局',category:'素材',title:'仓库复盘从入口追踪实际引用链',body:'评价与发布清理从真实入口开始追踪页面、脚本、样式和资源依赖。未被入口可达的文件只能标记为疑似残留，不能拿来评价当前成品。',genres:['fake-web','tp','hybrid'],priority:5},
  {id:'g39',scope:'全局',category:'文案',title:'长篇完整文案采用矩阵后分段生成',body:'50分钟以上作品不要试图一次提示生成全部正文。先固定信息边界和文案矩阵，再逐页面/人物生成，最后做全局一致性与重复检查。',genres:['fake-web','chat-social','archive','hybrid'],priority:5},
  {id:'g40',scope:'全局',category:'QA',title:'作品集经验必须经过跨项目去重',body:'从历史作品总结方法论时，要区分稳定优势、重复缺陷和单项目特殊需求；出现次数多不等于应该升级为全局规则。',genres:['fake-web','tp','honkaku','hybrid'],priority:4},
  {id:'g41',scope:'全局',category:'资产',title:'GitHub 仓库不等于作品',body:'主游戏、攻略、旧版、测试、服务端可能属于同一部作品。作品管理和跨项目统计必须先归组，再评价，避免把一个项目重复算成多部作品。',genres:['fake-web','tp','honkaku','hybrid'],priority:5},
  {id:'g42',scope:'全局',category:'资产',title:'自动分类必须允许人工锁定',body:'仓库分类与归组可以由规则和 AI 初判，但人工校正后不得被下一次同步覆盖；不确定时应标记待确认，而不是强行猜测。',genres:['fake-web','tp','honkaku','hybrid'],priority:4},
  {id:'g43',scope:'全局',category:'评分',title:'辅助仓库不能重复充当作品质量证据',body:'攻略、旧版和测试仓可以解释设计演变或玩家反馈，但不能与主游戏一起重复计入作品数量、优势频次或最终质量评分。',genres:['fake-web','tp','honkaku','hybrid'],priority:5},
  {id:'g44',scope:'全局',category:'QA',title:'盲复盘必须隔离事后评价',body:'评估 Agent 自己能发现什么时，只允许读取当时版本的主游戏实际引用文件与通用规则；屏蔽后来玩家反馈、作者复盘、旧评分、聊天记录和项目专属经验。',genres:['fake-web','tp','honkaku','hybrid'],priority:5},
  {id:'g45',scope:'全局',category:'QA',title:'问题必须带可定位证据',body:'QA 结论优先给出文件、页面、具体文本、交互节点或可验证信号，再说明影响与修改建议；只有“节奏略拖”“AI感较强”这类抽象判断不算有效问题。',genres:['fake-web','tp','honkaku','hybrid'],priority:5},
  {id:'g46',scope:'全局',category:'QA',title:'同源问题先聚类再报告',body:'同一种导航、文案声线或路径问题出现在多个页面时，作为一个系统问题报告并列举实例，避免靠重复条目制造严重感。',genres:['fake-web','tp','honkaku','hybrid'],priority:4},
  {id:'g47',scope:'全局',category:'创作',title:'允许明确建议不要修改',body:'特殊、粗糙、冗余或困难不一定是缺陷。若它服务作品身份、世界真实性或公平挑战，Agent 应给出“保留”结论，避免所有作品被优化成同一模板。',genres:['fake-web','tp','honkaku','henkaku','hybrid'],priority:5},
  {id:'g48',scope:'全局',category:'QA',title:'复盘结果必须记录模型与规则版本',body:'同一作品以后再次复测时，应保存模型、规则版本、仓库修订标识与证据覆盖，避免把模型变化误认为作品质量变化。',genres:['fake-web','tp','honkaku','hybrid'],priority:4}
];

export const COPY_PACK_SECTIONS = [
  '作品名与副标题','一句话核心钩子','玩家身份与开场提示','真实事件时间线','玩家认知时间线','人物档案与语言指纹','页面级完整文案','论坛/聊天/公告/档案','谜题线索与分层提示','交互反馈文案','中场与终局演出','结局与感谢页','宣传文案与 GitHub 简介'
];

export const QA_DIMENSIONS = [
  ['剧情闭环',10],['人物与动机',10],['文案自然度',10],['信息架构',10],['谜题公平性',10],['引导与流程',10],['页面真实性',10],['视觉与素材',10],['交互反馈',10],['移动端',10],['技术稳定性',10],['结局完成度',10],['AI 感控制',10]
];

export const INITIAL_PROJECT = {
  id: 'demo-project',
  title: '未命名调查项目',
  concept: '一个看似正常的地方网站里，旧记录逐步暴露一段被大家默契跳过的往事。',
  duration: '50–70 分钟',
  genres: [{id:'fake-web',score:72},{id:'hybrid',score:64},{id:'honkaku',score:31}],
  stage: '立项',
  createdAt: Date.now(),
  bible: '', architecture: '', puzzles: '', copyPack: '', visual: '', imagePrompt: '', qa: '', deploy: '',
  notes: []
};
