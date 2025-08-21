# 智能助手 Intelligent Assistant

> ⚠️ 声明：项目已于 2024 年初停止功能迭代，现以 “学习 / 研究自动化脚本设计思路” 为目的开源。使用产生的任何风险（账号异常 / 封禁 / 资产损失等）由使用者自行承担。请严格遵守各平台 & 法律法规；勿用于商业牟利或违规操作。

## 1. 项目简介
基于 Hamibot / AutoJS 生态的多应用收益任务编排与执行框架。通过 UI 识别 (OCR + 坐标策略)、行为函数抽象、收益权重采样与动态调度，实现对 30+ 阅读 / 视频 / 听书 / 短剧 App 的批量自动化操作与收益统计推送。

核心目标：
1. 用 DSL（配置文件中的中文指令 + 循环语法）描述任务流程，降低脚本调整成本。
2. 通过权重 / 收益速率估算在运行期动态调整执行顺序，减少低收益浪费。
3. 提供可扩展脚本基类，统一：签到 / 看广告 / 阅读 / 听书 / 刷视频 / 奖励领取 等通用模式。
4. 提供运行期收益消息推送（可选，不填 token 即禁用）。

## 2. 当前特性一览
- 30+ App 任务脚本（可按需启用 / 禁用）。
- 统一任务抽象：高效模式 / 低效模式分层（highEff / lowEff1..3）。
- 收益采集与加权：实时存储金币 / 经验等变化，估算单位时间价值。
- 动态调度：基于权重 + 配置顺序 + 任务状态（是否执行 / 冷却）排序。
- OCR 辅助匹配：字符容错映射（`characterMapping`）。
- 体积化行为组合：循环、等待、广告轮询、任务恢复。
- 可选微信推送 (WxPusher / pushplus 兼容逻辑接口保留)；安全注入 token。
- 音量键快捷控制：音量+ 推送当前收益；音量- 终止脚本。

## 3. 目录结构概览
```
src/
	common/        公共操作：点击、OCR、搜索、工具、收益推送
	lib/           基础库：装饰器、日志、初始化、异常
	scripts/       各具体 App 实现及抽象基类 (abstract/)
	main/first     第一版调度入口（保留参考）
	main/second    第二版（基于 DSL 的流程化配置）
	global.ts      全局常量、环境读取、实例注册、事件监听
types/           AutoJS / Hamibot 类型声明
buildConfig/     webpack 构建配置
```

## 4. 快速开始
### 4.1 环境要求
- Android 设备（Hamibot 运行环境）
- Node.js 16+ (本地开发 / 构建)
- Hamibot 账户（可选：用于部署与运行）

### 4.2 本地构建
```bash
npm install
npm run build       # 开发调试构建（webpack.dev）
npm run out         # 产出发布包（webpack.prod）
```
生成的 bundle 可上传至 Hamibot 作为脚本执行入口。

### 4.3 在 Hamibot 中配置
1. 新建脚本并上传构建产物（或直接粘贴 `dist` 中 JS）。
2. 在脚本“参数配置”中导入对应 `config.json`（选择 first 或 second 版本）。
3. （可选）添加环境变量：
	 - `_TOKEN`：收益消息接收 UID（WxPusher）
	 - `APP_TOKEN`：应用级发送 token（留空=禁用推送）
4. 运行脚本，使用音量键进行控制。

### 4.4 第二版流程 DSL 说明
示例（节选）：
```
签到
开宝箱
循环(6){
	阅读(32)
	领取阅读奖励
	开宝箱
}
```
支持指令（映射见 `global.ts` 的 `funcNameMap`）：签到 / 开宝箱 / 看广告 / 阅读(x) / 听书 / 刷视频(x) / 看短剧(x) / 领取XX奖励 / 循环(n){...} / 等待(ms) 等。

## 5. 配置与环境变量
| 变量 | 说明 | 是否必须 | 默认 |
|------|------|----------|------|
| `_TOKEN` | 接收收益推送的 UID | 否 | 空（不推送） |
| `APP_TOKEN` | 微信推送应用 token | 否 | 空（禁用） |
| `ORDER` | 手动指定执行顺序 | 否 | 代码内默认序列 |
| `RESET` | 是否重置存储 | 否 | false |

注意：`APP_TOKEN` 已从源码移除真实值，需通过运行环境注入。

## 6. 扩展一个新应用脚本
1. 在 `scripts/` 下创建新文件，继承某个抽象基类（如 `AbstractFreeNovel`、`AbstractBaidu`、`Base`）。
2. 实现：`signIn / openTreasure / watchAds / readBook / swipeVideo / reward` 等必要方法（或只覆写需要差异化的行为）。
3. 在 `global.ts` 中注册：
	 ```ts
	 import { NewApp } from "./scripts/NewApp";
	 export const newApp = new NewApp();
	 list.push(newApp);
	 ```
4. （可选）在 `config.json` 中添加可视化配置项。

## 7. 日志与调试
- 运行期输出通过 `Record`（`lib/logger.ts`）封装，支持等级过滤。
- `APP_ENV=development` 时会增加调试信息。
- 推送逻辑：如果 `_TOKEN` 与 `APP_TOKEN` 同时有效，则在音量+ 触发或自然结束时汇总收益并推送。

## 8. 安全与敏感信息清理
本仓库已移除硬编码 `APP_TOKEN`。若你 Fork 前版本含真实 token，请执行下述历史重写并强制推送：

### 8.1 使用 git filter-repo（推荐）
```bash
pip install git-filter-repo  # 或参考官方安装方式
git clone <your-fork-url>
cd <repo>
git filter-repo --replace-text <(echo 'AT_[0-9A-Za-z]*==>APP_TOKEN_REDACTED') --path src/global.ts
git push --force origin main
```

### 8.2 使用 BFG Repo-Cleaner（可选）
```bash
java -jar bfg.jar --replace-text replacements.txt <repo.git>
```
`replacements.txt` 内容示例：
```
regex:AT_[0-9A-Za-z]+==>APP_TOKEN_REDACTED
```

### 8.3 清理缓存与失效
1. 修改后的 token 立即在后台管理失效旧值。
2. 通知所有协作者重新拉取：
```bash
git fetch --all
git reset --hard origin/main
```

### 8.4 运行期注入建议
- Hamibot：在“环境变量”或配置项中填写；不要写入源码。
- 本地开发：使用 `.env.local`（不提交）+ 运行脚本前注入：
```bash
export APP_TOKEN=xxxxx
export _TOKEN=yyyyy
```

## 9. 常见问题 (FAQ)
Q: 运行一段时间后某些应用收益为 0？
A: 很可能 UI 结构变更或广告冷却策略变化，需要更新对应脚本逻辑。

Q: 为什么有些应用经常“黑屏 / 卡死”？
A: 典型是应用内部反自动化策略或广告组件未加载，脚本里有限次重试后放弃。

Q: 可以只跑其中几个应用吗？
A: 可以，在 second 配置模式中关闭对应 `xxxFlag` 复选框；或在 first 模式调整 `ORDER`。

Q: 推送不起作用？
A: 检查：1）是否注入 `_TOKEN` 和 `APP_TOKEN`；2）网络；3）token 是否被官方吊销。

## 10. 贡献指南
欢迎提交：
- Bug 修复 / 兼容性更新
- 新应用适配脚本
- 稳定性与 OCR 识别优化

流程：Fork -> 新分支 -> 修改 & 自测 -> PR（描述变更与验证方式）。

## 11. 许可证
保留原模板许可证 MPL-2.0（见 `LICENSE`）。新增代码默认继承；提交 PR 即视为同意兼容授权。

## 12. 免责声明
本项目提供的脚本仅供技术学习交流。任何由于使用脚本造成的账号风险、数据丢失、经济损失、法律责任，均与原作者与贡献者无关。

---
如果本项目的架构 / 思路对你有启发，欢迎 Star 支持；也欢迎基于该模式重构你自己的自动化框架。  
（不再维护业务更新，后续仅做安全 / 文档微调 PR 合并。）

祝学习顺利。
