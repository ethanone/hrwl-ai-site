# 更新日志 | Changelog

所有重要的项目变更都会记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

---

## [2.0.0] - 2025-01-27

### 🎨 重大设计更新 | Major Design Update

#### 设计风格重构
- **参考网站**: Supima.com 和 Foundry.co 的极简优雅风格
- **配色方案**: 从绿色系改为黑白灰专业配色
- **字体样式**: 使用 `font-light` 和 `font-normal`，更优雅的排版
- **留白优化**: 大幅增加 Section 间距（py-12 到 py-40）
- **容器宽度**: 从 `max-w-7xl` 调整为 `max-w-6xl`，更聚焦

#### 视觉优化
- 去除所有渐变背景，采用纯白背景
- 卡片设计更精致，淡灰色边框
- 按钮改为黑色背景 + 白色文字
- 更微妙的阴影和过渡效果

### 📱 移动端全面优化 | Mobile Optimization

#### 响应式设计
- **断点系统**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **网格布局**: 所有组件完全响应式
- **间距系统**: 移动端更紧凑，桌面端更宽松

#### 触摸优化
- **触摸目标**: 最小 44x44px (Apple HIG 标准)
- **按钮高度**: `min-h-[48px]`
- **移动端全宽**: 按钮在移动端全宽显示

#### 移动端菜单
- 背景遮罩点击关闭
- 流畅的动画效果
- 完整的 ARIA 支持
- 优化的触摸反馈

#### 安全区域支持
- iPhone X+ 设备支持
- `env(safe-area-inset-*)` 适配
- 导航栏和底部适配

### ♿ 无障碍性增强 | Accessibility

#### 键盘导航
- 所有交互元素都有焦点状态
- 清晰的 2px 黑色轮廓
- 完整的 Tab 键顺序

#### ARIA 支持
- 所有图标按钮都有 `aria-label`
- 菜单状态 `aria-expanded`
- 语义化 HTML 结构

#### 颜色对比度
- 符合 WCAG 2.1 AA 标准
- 高对比度焦点指示

### ⚡ 性能优化 | Performance

#### 动画优化
- 自定义缓动函数 `cubic-bezier(0.16, 1, 0.3, 1)`
- GPU 加速动画
- `will-change` 性能提示

#### 图片优化
- Next.js Image 组件
- 响应式尺寸 `sizes` 属性
- 优先级加载策略

#### 字体优化
- `display: swap` 策略
- DNS 预连接
- 字体预加载

### ✨ 微交互细节 | Micro-interactions

#### 导航链接
- 下划线动画效果
- 焦点状态支持

#### 按钮效果
- 涟漪效果
- 平滑的 hover 动画

#### 外部链接
- 自动识别外部链接
- ↗ 图标指示
- 悬停动画

### 📚 文档完善 | Documentation

#### 新增文档
- `DESIGN_UPDATE_SUMMARY.md` - 设计风格更新总结
- `ADVANCED_OPTIMIZATIONS.md` - 高级优化报告
- `FINAL_OPTIMIZATIONS.md` - 最终优化总结
- `MOBILE_OPTIMIZATION_REPORT.md` - 移动端优化报告
- `COMPREHENSIVE_REVIEW.md` - 全面检查复盘报告
- `PROJECT_SIZE_ANALYSIS.md` - 项目大小分析
- `GITHUB_UPLOAD_GUIDE.md` - GitHub 上传指南
- `CHANGELOG.md` - 更新日志（本文件）

### 🔧 技术改进 | Technical Improvements

#### CSS 优化
- 优化的滚动条样式
- 打印样式支持
- 加载状态动画
- 文本选择优化

#### React 优化
- 组件 memo 优化
- 动画配置优化
- 性能提示添加

### 🐛 修复 | Fixes

- 修复移动端菜单 z-index 问题
- 修复 iOS 自动缩放问题
- 优化移动端按钮宽度
- 修复焦点状态显示

---

## [1.0.0] - 2024-11-08

### 🎉 初始版本 | Initial Release

- 基础网站结构
- 中英文双语支持
- 响应式布局
- 基础组件库

---

## 版本说明 | Version Notes

### 版本号规则
- **主版本号** (2.0.0): 重大设计变更或架构调整
- **次版本号** (x.1.0): 新功能添加
- **修订号** (x.x.1): 问题修复和小优化

### 当前版本
**v2.0.0** - 全面设计重构和移动端优化版本

---

**维护者 | Maintainer:** New Shi Long Technology  
**项目 | Project:** scysx-ai-site  
**仓库 | Repository:** https://github.com/ethanone/scysx-ai-site

