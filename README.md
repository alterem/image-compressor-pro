# 智能图片压缩专家 🖼️

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.0-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.11-38B2AC.svg)](https://tailwindcss.com/)

一款专业的在线图片压缩工具，采用先进的压缩算法，能够在保持图片质量的同时显著减小文件大小。支持多种图片格式，提供精确的文件大小控制，是您处理图片的最佳选择。

## 🚀 其它项目

- https://github.com/alterem/mark-pic
- https://github.com/alterem/tauri-react-template
- https://github.com/alterem/tauri-vue-template
- https://github.com/alterem/gemini-poise

## ✨ 核心功能

- 🚀 **极速压缩** - 采用多线程处理，压缩速度快
- 🔒 **隐私保护** - 本地处理，图片不上传服务器
- 🎯 **精确控制** - 可设置目标文件大小，智能调节压缩参数
- ✨ **智能算法** - 二分搜索算法，自动优化压缩参数
- 🌐 **无需安装** - 基于现代 Web 技术，浏览器直接使用
- 📱 **响应式设计** - 完美适配桌面端和移动端

## 🎨 支持格式

| 格式 | 输入 | 输出 | 特点 |
|------|------|------|------|
| JPEG | ✅ | ✅ | 最小文件，适合照片 |
| PNG | ✅ | ✅ | 支持透明，适合图标 |
| WebP | ✅ | ✅ | 新格式，更高压缩率 |

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- pnpm >= 7.0.0

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/alterem/image-compressor-pro.git
cd image-compressor-pro

# 安装依赖
pnpm install
```

### 开发模式

```bash
# 启动开发服务器
pnpm dev
```

访问 `http://localhost:5173` 查看应用。

### 构建生产版本

```bash
# 构建项目
pnpm build

# 预览构建结果
pnpm preview
```

## 🛠️ 技术栈

- **前端框架**: React 19.3.1
- **开发语言**: TypeScript 5.6.2
- **构建工具**: Vite 7.1.0
- **样式框架**: Tailwind CSS 4.1.11
- **图标库**: Lucide React
- **压缩引擎**: browser-image-compression
- **状态管理**: React Hooks
- **代码规范**: ESLint + TypeScript ESLint

## 📁 项目结构

```
image-compressor-pro/
├── public/                 # 静态资源
├── src/
│   ├── components/         # React 组件
│   │   ├── AboutModal.tsx     # 关于弹窗
│   │   ├── CompressionResult.tsx  # 压缩结果
│   │   ├── CompressionSettings.tsx # 压缩设置
│   │   ├── Header.tsx         # 页面头部
│   │   ├── ImageUploader.tsx  # 图片上传
│   │   └── ...
│   ├── utils/              # 工具函数
│   │   ├── imageCompression.ts # 图片压缩逻辑
│   │   └── formatters.ts      # 格式化工具
│   ├── App.tsx            # 主应用组件
│   ├── main.tsx           # 应用入口
│   └── index.css          # 全局样式
├── docs/                  # 文档资源
│   └── reward-code.jpg    # 赞赏码
├── README.md              # 项目说明
├── LICENSE                # 开源协议
└── package.json           # 项目配置
```

## 🔧 核心算法

### 智能压缩算法

项目采用二分搜索算法来精确控制文件大小：

1. **初始化参数**: 设置质量范围 [0.1, 1.0]
2. **二分搜索**: 根据当前文件大小调整质量参数
3. **容差控制**: 允许 10% 的文件大小容差
4. **最优选择**: 在满足条件的结果中选择最佳质量

```typescript
// 核心压缩逻辑示例
const compressToTargetSize = async (
  file: File,
  targetSizeBytes: number,
  config: CompressionConfig
) => {
  let minQuality = 0.1;
  let maxQuality = 1.0;
  let currentQuality = config.quality;
  
  while (attempts < maxAttempts) {
    const compressedFile = await imageCompression(file, {
      initialQuality: currentQuality,
      // ... 其他配置
    });
    
    if (compressedFile.size <= targetSizeBytes + tolerance) {
      // 找到合适的结果
      return compressedFile;
    }
    
    // 二分搜索调整质量
    if (compressedFile.size > targetSizeBytes) {
      maxQuality = currentQuality;
      currentQuality = (minQuality + currentQuality) / 2;
    } else {
      minQuality = currentQuality;
      currentQuality = (currentQuality + maxQuality) / 2;
    }
  }
};
```

## 🎯 使用指南

### 基本使用

1. **上传图片**: 点击上传区域或拖拽图片文件
2. **设置参数**: 
   - 目标文件大小（可选）
   - 图片质量（0-100%）
   - 输出格式（JPEG/PNG/WebP）
3. **开始压缩**: 点击"开始压缩"按钮
4. **下载结果**: 压缩完成后下载处理后的图片

### 高级功能

- **精确大小控制**: 输入目标文件大小（如 "1.5MB", "500KB"）
- **批量处理**: 支持多张图片依次处理
- **实时预览**: 压缩前后效果对比
- **压缩统计**: 显示压缩率和节省空间

## 🔒 隐私安全

- ✅ **本地处理**: 所有图片处理都在浏览器本地完成
- ✅ **无数据上传**: 图片文件不会上传到任何服务器
- ✅ **即时清理**: 处理完成后自动清理内存中的图片数据
- ✅ **开源透明**: 所有代码开源，可审查安全性

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 开发规范

- 使用 TypeScript 编写代码
- 遵循 ESLint 代码规范
- 组件使用函数式组件 + Hooks
- 提交信息使用约定式提交格式

## 📝 更新日志

### v1.0.0 (2025-08-11)

- ✨ 初始版本发布
- 🚀 支持 JPEG、PNG、WebP 格式压缩
- 🎯 精确文件大小控制
- 🔒 本地处理保护隐私
- 📱 响应式设计支持移动端

## 📄 开源协议

本项目基于 [MIT License](LICENSE) 开源协议。

## 💖 支持项目

如果这个项目对您有帮助，欢迎给个 ⭐️ Star！

您也可以通过以下方式支持项目发展：

<div align="center">
  <img src="docs/reward-code.jpg" alt="赞赏码" width="200">
  <p><em>扫码赞赏，支持开源 ❤️</em></p>
</div>

## 📞 联系方式

- 🐛 **问题反馈**: [GitHub Issues](https://github.com/alterem/image-compressor-pro/issues)
- 💡 **功能建议**: [GitHub Discussions](https://github.com/alterem/image-compressor-pro/discussions)

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/alterem">Alterem</a></p>
  <p>智能图片压缩专家 - 让图片处理更简单</p>
</div>
