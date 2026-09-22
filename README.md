# 叙事工房 Narrative Workshop Agent

面向网页叙事 / 解谜作品的制作总监 Agent。前端部署在 GitHub Pages，AI 后端部署在 Cloudflare Workers。

## 已内置

- 项目圣经：事实层、玩家认知层、人物动机、时间线、伏笔/回收。
- 类型 DNA：伪网站、本格、变格、密室、聊天室、档案、T+P、H+C+J 混合判断。
- 经验库：新增经验前先做重复度、价值、适用范围判断；支持继续积累。
- 页面架构：世界内存在理由、有效/误导/生活信息、主要出口、下一步依据。
- 谜题图：来源、依赖、提示、错误反馈、回报、循环依赖/无来源答案检查。
- 完整文案包：从开场到结尾与宣传，而不是只输出示例句。
- 视觉与图片：先定义素材在世界里的来源，再做构图与生成；可调用 Workers AI 图像模型。
- 虚拟玩家测试、AI 味专项审查、独立严格评分、本地硬规则 QA。
- GitHub 仓库复盘：Worker 可读取公开仓库的文件树与关键文件进行分析。
- Local-first：项目与经验默认保存在浏览器 localStorage，可导出/导入 JSON。

## 1. GitHub Pages

把本压缩包内容上传到一个 GitHub 仓库，进入 Settings → Pages，将 Source 设为 GitHub Actions。仓库已包含 `.github/workflows/pages.yml`，发布内容为 `site/`。

也可以直接使用任意静态托管，只需完整发布 `site/` 目录。

## 2. Cloudflare Worker

进入 `worker/`：

```bash
npm install
npx wrangler deploy
```

`wrangler.jsonc` 已配置 Workers AI binding：`AI`。

推荐设置：

```bash
npx wrangler secret put APP_SECRET
npx wrangler secret put GITHUB_TOKEN
```

- `APP_SECRET`：保护 AI 与 GitHub 读取接口。部署后在前端“设置”里手动输入同一个 Agent Key；不要写入公开仓库。
- `GITHUB_TOKEN`：可选，只用于 Worker 服务端访问 GitHub API，提高限额；不要放前端。
- `ALLOWED_ORIGINS`：建议改成你的 GitHub Pages 域名，例如 `https://mike798-cloud.github.io`。留空时会允许 GitHub Pages 和 localhost。
- `TEXT_MODEL` / `IMAGE_MODEL`：可以在 `wrangler.jsonc` 更换。默认文本模型为 `@cf/zai-org/glm-4.7-flash`，默认图像模型为 `@cf/black-forest-labs/flux-1-schnell`。如果你的 Cloudflare 账户已启用付费 Workers AI，可把文本模型改为 `@cf/zai-org/glm-5.2` 以获得更强的长上下文/推理能力。

部署成功后，把 Worker URL 填入 Agent 的“设置 → Cloudflare Worker URL”。

## 3. 使用顺序

1. 新建项目，写核心构想；系统先给本地类型 DNA。
2. 在“类型判断”里决定主/副类型，不把类型当视觉皮肤。
3. 依次完成：故事圣经 → 页面架构 → 谜题图 → 完整文案 → 视觉 → 图片 → 发布说明。
4. 任何时候想到新经验，进入“经验库”补充；先评审再保存。
5. 最后进入“独立 QA”，从零状态检查流程；再用 AI 深度评审。

## 4. 当前数据边界

本版本不把创作数据上传到 D1/R2，避免公共静态站一开始就引入账号和权限问题。AI 请求时只把当前任务所需的项目内容发送给 Worker。以后如果需要跨设备同步、多用户协作，再增加 Cloudflare Access + D1/R2 更合理。
