# Git 历史敏感信息清理指令

> 目的：彻底移除仓库历史提交中曾暴露的 `APP_TOKEN`（或其他潜在敏感值），并防止再次泄露。请在 **确定需要重写历史** 后再执行；该操作会更改所有历史 commit 的哈希，需团队协同。

---
## 0. 风险与注意事项
- 历史重写 (rewrite) 会使所有旧 commit 哈希失效；已 fork / 已拉取的协作者需要强制同步。
- 公共仓库执行后，旧引用仍可能被第三方缓存（建议同时吊销旧 token）。
- 如果仓库已经被大范围克隆，历史重写的实际“遗忘”作用有限，仍需 **立即替换生产凭证**。

---
## 1. 识别是否仍存在敏感值
```bash
# 目标 Token 规则 (示例)：AT_ + 32 位字母数字
regex='AT_[0-9A-Za-z]{32}'

git grep -nE "$regex" || echo "✅ 工作区当前未发现匹配"

git rev-list --all | while read c; do \
  if git grep -qE "$regex" $c; then echo "FOUND in commit $c"; fi; \
done | tee /tmp/secret_commits.txt

if [ -s /tmp/secret_commits.txt ]; then echo "⚠️ 历史仍含敏感值"; else echo "✅ 历史检测未发现"; fi
```

---
## 2. 首选方案：git-filter-repo
`git filter-repo` 是官方推荐替代 `filter-branch`/BFG 的工具。

### 2.1 安装
```bash
# Python 环境
pip install git-filter-repo  # 或参见 https://github.com/newren/git-filter-repo
```

### 2.2 准备临时仓库
```bash
git clone --mirror <YOUR_ORIGIN_URL> intelligent_assistant.git
cd intelligent_assistant.git
```

### 2.3 定义替换规则
创建文件 `replacements.txt`：
```
regex:AT_[0-9A-Za-z]{32}==>APP_TOKEN_REDACTED
```

### 2.4 执行历史重写
```bash
git filter-repo \
  --replace-text replacements.txt \
  --force
```
> 如只在特定文件暴露，可加 `--path src/global.ts` 限定；若多处出现请不要限制路径。

### 2.5 结果验证
```bash
# 重新搜索
regex='AT_[0-9A-Za-z]{32}'
if git grep -E "$regex"; then echo "❌ 替换失败"; else echo "✅ 已清理"; fi
```

### 2.6 推送覆盖远程
```bash
# 先备份远端（可选）
git push origin --mirror :backup_pre_rewrite

git push --force --mirror origin
```
> --mirror 会同步 refs/heads 与 refs/tags；若你只需主分支，可改用：`git push --force origin main`。

### 2.7 通知协作者同步
```bash
git fetch --all --prune
git reset --hard origin/main
```

---
## 3. 备用方案：BFG Repo-Cleaner
适合简单字符串替换（对正则支持较弱）。

### 3.1 安装 & 运行
```bash
java -jar bfg.jar --replace-text replacements.txt <repo.git>
(cd <repo.git> && git reflog expire --expire=now --all && git gc --prune=now --aggressive)
```
`replacements.txt` 同上。

### 3.2 推送同上。

---
## 4. 旧 Token 吊销与替换
1. 登录对应推送服务后台，吊销旧 `APP_TOKEN`。
2. 生成新 token，存放于：
   - Hamibot 环境变量：`APP_TOKEN`
   - 或运行时 `export APP_TOKEN=xxxx`（本地调试）
3. 不再写入源码；代码中 `global.ts` 已通过：
```ts
export const APP_TOKEN = (hamibot.env && (hamibot.env as any).APP_TOKEN) || "";
```
   若为空则推送逻辑自动跳过。

---
## 5. 预防策略
| 目的 | 措施 |
|------|------|
| 防止再次提交密钥 | 使用 `.gitignore` / 仅环境注入 |
| 本地扫描 | `pre-commit` 钩子 + `gitleaks` / `trufflehog` |
| 最小暴露 | 分级 token，使用可撤销子凭证 |
| 审计 | CI 中加入秘密扫描步骤 |

### 5.1 示例：gitleaks (可选)
```bash
brew install gitleaks
# 快速扫描
gitleaks detect --no-git --source .
```

### 5.2 示例：pre-commit 钩子片段
`.git/hooks/pre-commit`（自行 chmod +x）：
```bash
#!/usr/bin/env bash
regex='AT_[0-9A-Za-z]{32}'
if git diff --cached -U0 | grep -E "$regex"; then
  echo "❌ 检测到疑似 APP_TOKEN，已阻止提交"
  exit 1
fi
```

---
## 6. 回滚方案（如误操作）
如果已经强推且需回滚：
1. 在本地或备份找到未重写前的镜像。
2. 新建临时分支：`git branch recovery <OLD_COMMIT>` 并推送。
3. 与团队沟通后再决定是否重新基于旧历史进行 cherry-pick。

---
## 7. FAQ
**Q: 重写后仍看到旧值？**  
A: 本地 reflog / 远端缓存 / 第三方 fork 仍存有；此为正常现象，务必依赖“吊销旧 token”保证安全。

**Q: 只想覆盖 main 分支可以吗？**  
A: 可以，但若 tag 里也含敏感值未处理，仍可能被检索到，建议统一重写。

**Q: filter-repo 提示安装失败？**  
A: 确认 Python ≥3.7，或使用独立可执行脚本版本（见官方仓库）。

---
## 8. 最终校验清单
- [ ] 旧 token 已吊销
- [ ] 新 token 未写入任何源码 / commit
- [ ] `git grep` & 历史扫描无命中
- [ ] 协作者已同步强推后的主分支
- [ ] 添加了预防扫描策略

> 完成以上步骤后，即可认为“仓库自身”不再直接泄露旧 APP_TOKEN。

---
如需英文版或自动化脚本，可继续提出需求。
