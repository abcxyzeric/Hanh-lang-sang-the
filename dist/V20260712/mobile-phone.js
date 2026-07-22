// ==================== 手机界面状态栏 ====================
// ==================== 加载 Font Awesome（安全方式）====================
function loadFontAwesome() {
    // 检查是否已经加载
    if ($('link[href*="font-awesome"]').length > 0 || $('link[href*="fontawesome"]').length > 0) {
        return;
    }

    // 通过 link 标签加载（异步，不会阻塞渲染）
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
}

// ==================== 样式注入 ====================
const phoneStyles = `
<style id="mobile-phone-styles">
html, body {
    height: 100%;
    min-height: 100vh;
    margin: 0;
    padding: 0;
}

/* ==================== 触发按钮 - Brushed Metal风格（复刻状态栏悬浮球） ==================== */
#mobile-trigger-btn {
    position: fixed;
    /*  桌面端默认：离右边三分之一距离的垂直中央 */
    top: 50%;
    right: 33.33%;
    transform: translateY(-50%);
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #e3e3e3 0%, #c4c4c4 100%);
    border: 1px solid #d4d4d4;
    font-size: 28px;
    cursor: move;
    z-index: 10000;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.03);
    transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    -webkit-user-select: none;
    touch-action: none;
    padding: 0;
    overflow: visible;
}
#mobile-trigger-btn .star-container {
    width: 85%;
    height: 85%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
#mobile-trigger-btn .icon-svg {
    width: 100%;
    height: 100%;
    overflow: visible;
    display: block;
}
#mobile-trigger-btn .star-layer {
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: all 0.4s ease;
    transform-box: view-box;
    transform-origin: 50px 50px;
}
#mobile-trigger-btn .base-layer {
    stroke: #666;
    stroke-width: 2;
    opacity: 0.7;
}
#mobile-trigger-btn .layer-1 {
    stroke: #555;
    stroke-width: 2;
    stroke-dasharray: 100 400;
    stroke-dashoffset: 0;
    opacity: 0.8;
    animation: mobileBtnMetalDraw 6s linear infinite;
}
#mobile-trigger-btn .layer-2 {
    stroke: #999;
    stroke-width: 1.5;
    stroke-dashoffset: 0;
    animation: mobileBtnMetalDraw 6s linear infinite reverse;
}
@keyframes mobileBtnMetalDraw {
    from { stroke-dashoffset: 500; }
    to { stroke-dashoffset: 0; }
}
#mobile-trigger-btn .center-circle {
    fill: none;
    stroke: #777;
    stroke-width: 1.5;
}

/*  CSS类控制：移动端右边垂直居中（srcdoc iframe兼容） */
/* 使用多层ID选择器提高优先级 */
#mobile-trigger-btn#mobile-trigger-btn#mobile-trigger-btn.mobile-mode,
body #mobile-trigger-btn.mobile-mode {
    /* 移动端模式：右边垂直居中定位，覆盖所有内联样式 */
    left: auto !important;
    top: 50% !important;
    right: 12px !important;
    bottom: auto !important;
    width: 45px !important;
    height: 45px !important;
    font-size: 22px !important;
    position: fixed !important;
    display: flex !important;
    z-index: 10000 !important;
    transform: translateY(-50%) !important;
    margin: 0 !important;
    background: linear-gradient(135deg, #e3e3e3 0%, #c4c4c4 100%) !important;
    border: 1px solid #d4d4d4 !important;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.03) !important;
}

#mobile-trigger-btn#mobile-trigger-btn#mobile-trigger-btn.tablet-mode,
body #mobile-trigger-btn.tablet-mode {
    /* 平板端模式 */
    left: auto !important;
    top: auto !important;
    right: 15px !important;
    bottom: 15px !important;
    width: 50px !important;
    height: 50px !important;
    font-size: 24px !important;
    position: fixed !important;
    display: flex !important;
    z-index: 10000 !important;
    transform: none !important;
    margin: 0 !important;
    background: linear-gradient(135deg, #e3e3e3 0%, #c4c4c4 100%) !important;
    border: 1px solid #d4d4d4 !important;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.03) !important;
}

/*  CSS媒体查询：作为备用方案（在非iframe环境中生效） */
@media (max-width: 480px) {
    #mobile-trigger-btn:not(.desktop-mode) {
        left: auto !important;
        top: 50% !important;
        right: 12px !important;
        bottom: auto !important;
        width: 45px !important;
        height: 45px !important;
        font-size: 22px !important;
        transform: translateY(-50%) !important;
        background: linear-gradient(135deg, #e3e3e3 0%, #c4c4c4 100%) !important;
        border: 1px solid #d4d4d4 !important;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.03) !important;
    }
}

@media (min-width: 481px) and (max-width: 768px) {
    #mobile-trigger-btn:not(.desktop-mode) {
        left: auto !important;
        top: auto !important;
        right: 15px !important;
        bottom: 15px !important;
        width: 50px !important;
        height: 50px !important;
        font-size: 24px !important;
        background: linear-gradient(135deg, #e3e3e3 0%, #c4c4c4 100%) !important;
        border: 1px solid #d4d4d4 !important;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.03) !important;
    }
}

#mobile-trigger-btn:hover {
    transform: translateY(-5px);
    background: linear-gradient(135deg, #f0f0f0 0%, #dcdcdc 100%);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08), 0 20px 30px rgba(0, 0, 0, 0.06);
}

#mobile-trigger-btn.dragging {
    transition: none !important;
    transform: none !important;
    cursor: grabbing;
}

#mobile-trigger-btn:active:not(.dragging) {
    transform: scale(0.96);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition-duration: 0.1s;
}

/* ==================== 手机容器 ==================== */
#mobile-phone-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    z-index: 9999;
    display: none;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s;
    transition: background 0.3s ease, backdrop-filter 0.3s ease;
}

#mobile-phone-overlay.active {
    display: flex;
}

/* 置顶时：遮罩透明且不阻挡点击 */
#mobile-phone-overlay.pinned {
    background: transparent;
    backdrop-filter: none;
    pointer-events: none;
}

/* 置顶时：手机框架仍然可以响应点击 */
#mobile-phone-overlay.pinned .mobile-phone-frame {
    pointer-events: auto;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

/* ==================== 手机框架 ==================== */
#mobile-phone-overlay .mobile-phone-frame {
    position: relative !important;
    width: 90% !important;
    max-width: 375px !important;
    aspect-ratio: 375/737 !important;
    background: #333 !important;
    border-radius: 40px !important;
    padding: 8px !important;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5) !important;
    overflow: hidden !important;
    animation: slideUp 0.3s !important;
}

/* 清除手机框架的伪元素 */
#mobile-phone-overlay .mobile-phone-frame::before,
#mobile-phone-overlay .mobile-phone-frame::after {
    content: none !important;
    display: none !important;
}

@keyframes slideUp {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

#mobile-phone-overlay .mobile-phone-screen {
    width: 100% !important;
    height: 100% !important;
    border-radius: 32px !important;
    overflow: hidden !important;
    display: flex !important;
    flex-direction: column !important;
    position: relative !important;
    background: #fff5f7 !important;
    background-image: url('https://rpg.bolt.qzz.io/%E5%B0%81%E9%9D%A2/%E6%B3%95%E9%9C%B2%E7%89%B9.webp') !important;
    background-size: cover !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
}

/* ==================== 状态栏 ==================== */
.mobile-status-bar {
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    font-size: 14px;
    font-weight: 600;
    flex-shrink: 0;
}

.status-left {
    display: flex;
    align-items: center;
    gap: 8px;
}

.status-left .time {
    color: #1a1a1a;
    font-weight: 700;
}

.pin-btn {
    background: transparent;
    border: none;
    color: #666;
    font-size: 16px;
    cursor: pointer;
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    border-radius: 6px;
}

.pin-btn:hover {
    background: rgba(0, 0, 0, 0.05);
    color: #333;
}

.pin-btn.pinned {
    color: #3B82F6;
    transform: rotate(45deg);
}

.pin-btn.pinned:hover {
    background: rgba(59, 130, 246, 0.1);
}

.status-center {
    flex: 1;
    display: flex;
    justify-content: center;
    user-select: none;
}

.dynamic-island {
    width: 126px;
    height: 30px;
    background: #1a1a1a;
    border-radius: 15px;
    position: relative;
    overflow: hidden;
}

.dynamic-island::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    background: #00ff00;
    border-radius: 50%;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

.status-right {
    display: flex;
    align-items: center;
    gap: 5px;
}

.battery {
    display: flex;
    align-items: center;
    gap: 2px;
    color: #1a1a1a;
    font-size: 12px;
}

/* ==================== 主内容区域 ==================== */
.mobile-content {
    flex: 1;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

#mobile-phone-overlay .home-screen {
    flex: 1 !important;
    padding: 20px !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 20px !important;
    overflow-y: auto !important;
    background: transparent !important;
}

/* ==================== 时间天气卡片 ==================== */
.weather-card {
    /* 完全透明，但保留占位空间 */
    background: transparent;
    backdrop-filter: none;
    box-shadow: none;
    border-radius: 24px;
    padding: 20px;
    margin: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    flex-shrink: 0;
    pointer-events: none;
}

/* 隐藏卡片内容但保留占位 */
.weather-card * {
    visibility: hidden;
}

.weather-time {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
}

.current-date {
    font-size: 20px;
    color: #2d3748;
    font-weight: 400;
    /* 多层阴影：白色+黑色，适应任何背景 */
    text-shadow: 
        0 0 10px rgba(255, 255, 255, 0.9),
        0 0 20px rgba(255, 255, 255, 0.7),
        0 2px 4px rgba(0, 0, 0, 0.3),
        0 4px 8px rgba(0, 0, 0, 0.2);
}

.current-time {
    color: #1a1a1a;
    font-size: 48px;
    font-weight: 400;
    line-height: 1;
    letter-spacing: -0.05em;
    /* 强阴影确保在任何背景上都清晰 */
    text-shadow: 
        0 0 15px rgba(255, 255, 255, 1),
        0 0 30px rgba(255, 255, 255, 0.8),
        0 3px 6px rgba(0, 0, 0, 0.4),
        0 6px 12px rgba(0, 0, 0, 0.3);
}

.weather-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    /* 增强半透明背景，添加模糊效果 */
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 10px 15px;
    gap: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.weather-desc {
    font-size: 14px;
    color: #2d3748;
    font-weight: 400;
    text-shadow: 
        0 0 8px rgba(255, 255, 255, 0.8),
        0 1px 3px rgba(0, 0, 0, 0.2);
}

/* ==================== 应用图标网格 ==================== */
#mobile-phone-overlay .app-pages-container {
    flex: 1 !important;
    display: flex !important;
    flex-direction: column !important;
    position: relative !important;
    overflow: hidden !important;
    background: transparent !important;
    touch-action: pan-x !important;
}

/* 页面滑动容器 */
#mobile-phone-overlay .app-pages-wrapper {
    flex: 1 !important;
    display: flex !important;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    touch-action: pan-x !important;
    overflow: visible !important;
    user-select: none !important;
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
}

#mobile-phone-overlay .app-pages-wrapper.no-transition {
    transition: none !important;
}

#mobile-phone-overlay .app-page {
    flex: 0 0 100% !important;
    width: 100% !important;
    display: flex !important;
    flex-direction: column !important;
    overflow-y: auto !important;
}

#mobile-phone-overlay .app-grid {
    flex: 1 !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 25px !important;
    padding: 0 20px !important;
}

/* 页面指示器 */
#mobile-phone-overlay .page-indicators {
    display: none !important; /* 只有一页时隐藏指示器 */
    justify-content: center !important;
    align-items: center !important;
    gap: 8px !important;
    padding: 15px 0 !important;
    position: relative !important;
    z-index: 10 !important;
}

#mobile-phone-overlay .indicator {
    width: 8px !important;
    height: 8px !important;
    border-radius: 50% !important;
    background: rgba(0, 0, 0, 0.2) !important;
    transition: all 0.3s ease !important;
    cursor: pointer !important;
}

#mobile-phone-overlay .indicator.active {
    width: 24px !important;
    border-radius: 4px !important;
    background: rgba(0, 0, 0, 0.5) !important;
}

#mobile-phone-overlay .app-row {
    display: flex !important;
    justify-content: space-around !important;
    align-items: center !important;
    gap: 15px !important;
}

#mobile-phone-overlay .app-icon {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    gap: 8px !important;
    cursor: pointer !important;
    transition: transform 0.2s ease !important;
    flex: 1 !important;
    max-width: 70px !important;
    user-select: none !important;
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
}

#mobile-phone-overlay .app-icon:hover {
    transform: scale(1.1) !important;
}

#mobile-phone-overlay .app-icon-bg {
    width: 56px !important;
    height: 56px !important;
    border-radius: 16px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-size: 26px !important;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
    position: relative !important;
    overflow: hidden !important;
    transition: transform 0.2s, box-shadow 0.2s !important;
}

/* 清除所有可能的伪元素覆盖 */
#mobile-phone-overlay .app-icon-bg::before,
#mobile-phone-overlay .app-icon-bg::after {
    content: none !important;
    display: none !important;
}

#mobile-phone-overlay .app-icon::before,
#mobile-phone-overlay .app-icon::after {
    content: none !important;
    display: none !important;
}

#mobile-phone-overlay .app-icon-bg i {
    z-index: 1 !important;
    font-size: 26px !important;
    position: relative !important;
}

/* Material Design 风格纯色渐变背景 - 使用!important提高优先级 */
#mobile-phone-overlay .app-icon-bg.md-blue {
    background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%) !important;
    border: none !important;
}

#mobile-phone-overlay .app-icon-bg.md-blue i {
    color: #ffffff !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
}

#mobile-phone-overlay .app-icon-bg.md-orange {
    background: linear-gradient(135deg, #FF9800 0%, #F57C00 100%) !important;
    border: none !important;
}

#mobile-phone-overlay .app-icon-bg.md-orange i {
    color: #ffffff !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
}

#mobile-phone-overlay .app-icon-bg.md-green {
    background: linear-gradient(135deg, #4CAF50 0%, #388E3C 100%) !important;
    border: none !important;
}

#mobile-phone-overlay .app-icon-bg.md-green i {
    color: #ffffff !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
}

#mobile-phone-overlay .app-icon-bg.md-purple {
    background: linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%) !important;
    border: none !important;
}

#mobile-phone-overlay .app-icon-bg.md-purple i {
    color: #ffffff !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
}

#mobile-phone-overlay .app-icon-bg.md-pink {
    background: linear-gradient(135deg, #E91E63 0%, #C2185B 100%) !important;
    border: none !important;
}

#mobile-phone-overlay .app-icon-bg.md-pink i {
    color: #ffffff !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
}

#mobile-phone-overlay .app-icon-bg.md-red {
    background: linear-gradient(135deg, #F44336 0%, #D32F2F 100%) !important;
    border: none !important;
}

#mobile-phone-overlay .app-icon-bg.md-red i {
    color: #ffffff !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
}

#mobile-phone-overlay .app-icon-bg.md-yellow {
    background: linear-gradient(135deg, #FFC107 0%, #FFA000 100%) !important;
    border: none !important;
}

#mobile-phone-overlay .app-icon-bg.md-yellow i {
    color: rgba(0, 0, 0, 0.75) !important;
    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3) !important;
}

#mobile-phone-overlay .app-icon-bg.md-cyan {
    background: linear-gradient(135deg, #00BCD4 0%, #0097A7 100%) !important;
    border: none !important;
}

#mobile-phone-overlay .app-icon-bg.md-cyan i {
    color: #ffffff !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
}

#mobile-phone-overlay .app-icon-bg.md-teal {
    background: linear-gradient(135deg, #009688 0%, #00796B 100%) !important;
    border: none !important;
}

#mobile-phone-overlay .app-icon-bg.md-teal i {
    color: #ffffff !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
}

#mobile-phone-overlay .app-label {
    font-size: 11px !important;
    color: #1a1a1a !important;
    font-weight: 500 !important;
    text-align: center !important;
    line-height: 1.2 !important;
    /* 多层文字阴影，确保在任何背景上都清晰可见 */
    text-shadow: 
        0 0 8px rgba(255, 255, 255, 1),
        0 0 12px rgba(255, 255, 255, 0.9),
        0 1px 3px rgba(0, 0, 0, 0.4),
        0 2px 6px rgba(0, 0, 0, 0.3) !important;
    /* 添加半透明背景增强可读性 */
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(4px);
    padding: 2px 6px !important;
    border-radius: 6px !important;
}

/* 图标悬停动画 */
#mobile-phone-overlay .app-icon:hover .app-icon-bg {
    transform: scale(1.08) !important;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.35) !important;
}

#mobile-phone-overlay .app-icon:active .app-icon-bg {
    transform: scale(0.92) !important;
}

/* ==================== 应用详情面板 ==================== */
.app-detail-panel {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ffffff !important;
    z-index: 100 !important;
    display: none;
    flex-direction: column;
    animation: slideIn 0.3s;
}

.app-detail-panel.active {
    display: flex;
}

@keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
}

.app-header {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    flex-shrink: 0;
}

.back-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: background 0.2s ease;
    font-size: 20px;
    color: #2d3748;
}

.back-button:hover {
    background: rgba(0, 0, 0, 0.1);
}

.app-title {
    font-size: 16px;
    font-weight: 600;
    color: #2d3748;
}

.app-body {
    flex: 1;
    overflow-y: auto;
    padding: 15px;
    background: #f8f9fa;
    transition: opacity 0.2s ease-in-out;
}

/* ==================== 列表项样式 ==================== */
.list-item {
    background: #fff;
    border-radius: 12px;
    padding: 15px;
    margin-bottom: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.list-item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.list-item-name {
    font-size: 14px;
    font-weight: 600;
    color: #2d3748;
}

.list-item-value {
    font-size: 14px;
    font-weight: 600;
    color: #10b981;
}

.list-item-desc {
    font-size: 12px;
    color: #6b7280;
    line-height: 1.5;
}

/* 好友列表项 hover 效果 */
.friend-item:hover {
    background: #fef3f2 !important;
    box-shadow: 0 4px 12px rgba(236, 72, 153, 0.15) !important;
    transform: translateY(-1px);
}

/* 论坛帖子项 hover 效果 */
.forum-post-item:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12) !important;
}

.forum-post-item:active {
    transform: translateY(0) !important;
}

.friend-item:active {
    transform: translateY(0);
}

.empty-message {
    text-align: center;
    padding: 40px 20px;
    color: #9ca3af;
    font-size: 14px;
}

/* ==================== 聊天界面样式 ==================== */
.chat-panel {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ffffff !important;
    z-index: 200 !important;
    display: none;
    flex-direction: column;
    animation: slideIn 0.3s;
}

.chat-panel.active {
    display: flex;
}

.chat-header {
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    flex-shrink: 0;
}

.chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 15px;
    background: #f8f9fa;
}

.message-item {
    margin-bottom: 15px;
    display: flex;
}

.message-item.mine {
    justify-content: flex-end;
}

.message-item.other {
    justify-content: flex-start;
}

.message-bubble {
    max-width: 70%;
    padding: 10px 15px;
    border-radius: 15px;
    word-wrap: break-word;
}

.message-item.mine .message-bubble {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.message-item.other .message-bubble {
    background: white;
    color: #2d3748;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.message-sender {
    font-size: 11px;
    color: #9ca3af;
    margin-bottom: 3px;
}

.message-time {
    font-size: 10px;
    opacity: 0.8;
    margin-top: 5px;
    color: inherit;
}

.chat-input-area {
    height: 60px;
    background: white;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    padding: 10px;
    gap: 10px;
    flex-shrink: 0;
}

.chat-input {
    flex: 1;
    height: 40px;
    border: 1px solid #ddd;
    border-radius: 20px;
    padding: 0 15px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
    background: #ffffff;
    color: #1f2937;
}

.chat-input:focus {
    border-color: #667eea;
    background: #ffffff;
}

.chat-input::placeholder {
    color: #9ca3af;
    opacity: 1;
}

.chat-send-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.chat-send-btn:hover:not(:disabled) {
    transform: scale(1.1);
}

.chat-send-btn:active:not(:disabled) {
    transform: scale(0.95);
}

/*  发送中状态 - 变暗、变矩形 */
.chat-send-btn:disabled {
    cursor: not-allowed;
    opacity: 0.6 !important;
    background: #6c757d !important; /* 灰色背景 */
    border-radius: 8px !important; /* 变成矩形（圆角矩形） */
    transform: none !important;
    box-shadow: none !important;
}

/* 发送中状态的矩形图标动画 */
.chat-send-btn .fa-stop {
    animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
}

/* ==================== 设置页面样式 ==================== */
.settings-section {
    margin-bottom: 20px;
}

.settings-section-title {
    font-size: 14px;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 12px;
    padding-left: 5px;
}

.wallpaper-categories {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.wallpaper-category {
    background: #fff;
    border-radius: 12px;
    padding: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: all 0.2s ease;
}

.wallpaper-category:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.wallpaper-category-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.wallpaper-category-name {
    font-size: 15px;
    font-weight: 600;
    color: #2d3748;
}

.wallpaper-category-count {
    font-size: 12px;
    color: #9ca3af;
}

.wallpaper-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 15px;
    display: none;
}

.wallpaper-grid.active {
    display: grid;
}

.wallpaper-item {
    aspect-ratio: 9/16;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    background: #f3f4f6;
    transition: all 0.2s ease;
}

.wallpaper-item:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.wallpaper-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.wallpaper-item.selected::after {
    content: '✓';
    position: absolute;
    top: 5px;
    right: 5px;
    width: 24px;
    height: 24px;
    background: #10b981;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
}

.wallpaper-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.wallpaper-loading::after {
    content: '';
    width: 24px;
    height: 24px;
    border: 3px solid #f3f4f6;
    border-top-color: #667eea;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
    z-index: 10;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

/* ==================== 图片加载loading效果 ==================== */
.loading::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50px;
    height: 50px;
    margin: -25px 0 0 -25px;
    border: 4px solid rgba(91, 164, 229, 0.2);
    border-top-color: #5BA4E5;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    z-index: 10;
}

/* ==================== 响应式适配 - 教科书级实现 ==================== */

/* 平板端适配 (≤768px) */
@media (max-width: 768px) {
    /* 框架适配 */
    .mobile-phone-frame,
    #mobile-phone-overlay .mobile-phone-frame {
        width: 80% !important;
        max-width: 300px !important;
    }
    
    /* 触发按钮 */
    #mobile-trigger-btn {
        width: 50px;
        height: 50px;
        bottom: 15px;
        right: 15px;
    }
    
    /* 状态栏 */
    .mobile-status-bar {
        height: 40px;
        padding: 0 12px;
        font-size: 13px;
    }
    
    /* 应用 Header */
    .app-header {
        height: 50px;
        padding: 0 15px;
    }
    
    .app-title {
        font-size: 17px;
    }
    
    .back-button,
    .pin-btn {
        font-size: 20px;
        padding: 5px;
    }
    
    /* 主屏幕 */
    .home-screen {
        padding: 15px;
        gap: 15px;
    }
    
    /* 天气卡片 */
    .weather-card {
        padding: 15px;
        gap: 12px;
    }
    
    .weather-time {
        font-size: 26px;
    }
    
    .weather-date {
        font-size: 13px;
    }
    
    .weather-location {
        font-size: 12px;
    }
    
    /* 应用图标 */
    .app-icon {
        gap: 6px;
    }
    
    .app-icon-bg {
        width: 52px;
        height: 52px;
        font-size: 26px;
        border-radius: 14px;
    }
    
    .app-label {
        font-size: 11px;
    }
    
    /* 应用网格 */
    .app-grid {
        gap: 15px;
    }
    
    .app-row {
        gap: 18px;
    }
    
    /* 应用内容 */
    .app-body {
        padding: 15px;
    }
    
    /* 列表项 */
    .list-item {
        padding: 12px;
    }
    
    .list-item-name {
        font-size: 14px;
    }
    
    .list-item-value {
        font-size: 15px;
    }
    
    /* 消息列表 */
    .message-item {
        padding: 12px;
    }
    
    .message-name {
        font-size: 14px;
    }
    
    .message-preview {
        font-size: 12px;
    }
    
    /* 聊天界面 */
    .chat-bubble {
        font-size: 14px;
        padding: 10px 14px;
    }
    
    .chat-input-container {
        padding: 12px 15px;
    }
    
    .chat-input {
        font-size: 14px;
        padding: 9px 14px;
    }
    
    .send-button {
        width: 38px;
        height: 38px;
        font-size: 16px;
    }
    
    /* 商品卡片 */
    .shop-item {
        padding: 12px;
    }
    
    .shop-item-name {
        font-size: 14px;
    }
    
    .shop-item-price {
        font-size: 15px;
    }
    
    .shop-buy-btn {
        padding: 7px 14px;
        font-size: 13px;
    }
    
    .shop-buy-btn:hover {
        transform: scale(1.05);
    }
    
    .shop-buy-btn:active {
        transform: scale(0.98);
    }
    
    /* ========== 自定义确认弹窗样式 ========== */
    .custom-confirm-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100000;
        opacity: 0;
        animation: fadeIn 0.2s ease-out forwards;
    }
    
    @keyframes fadeIn {
        to { opacity: 1; }
    }
    
    .custom-confirm-modal {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 20px;
        padding: 2px;
        min-width: 340px;
        max-width: 480px;
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
        animation: slideUp 0.3s ease-out;
    }
    
    @keyframes slideUp {
        from {
            transform: translateY(30px) scale(0.95);
            opacity: 0;
        }
        to {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
    }
    
    .custom-confirm-content {
        background: #1f2937;
        border-radius: 18px;
        padding: 28px 24px 20px;
    }
    
    .confirm-icon {
        width: 64px;
        height: 64px;
        margin: 0 auto 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        animation: iconPulse 2s ease-in-out infinite;
    }
    
    @keyframes iconPulse {
        0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7); }
        50% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(102, 126, 234, 0); }
    }
    
    .confirm-title {
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 16px;
        color: #f3f4f6;
        text-align: center;
        letter-spacing: 0.5px;
    }
    
    .confirm-message {
        font-size: 15px;
        line-height: 1.7;
        color: #d1d5db;
        margin-bottom: 24px;
        text-align: center;
        white-space: pre-line;
    }
    
    .confirm-item-info {
        background: rgba(102, 126, 234, 0.1);
        border: 1px solid rgba(102, 126, 234, 0.3);
        border-radius: 12px;
        padding: 16px;
        margin-bottom: 24px;
    }
    
    .confirm-item-name {
        font-size: 18px;
        font-weight: 600;
        color: #a5b4fc;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .confirm-item-desc {
        font-size: 13px;
        color: #9ca3af;
        margin-bottom: 12px;
        line-height: 1.6;
    }
    
    .confirm-item-price {
        font-size: 16px;
        font-weight: 600;
        color: #fbbf24;
        display: flex;
        align-items: center;
        gap: 6px;
    }
    
    .confirm-buttons {
        display: flex;
        gap: 12px;
    }
    
    .confirm-btn {
        flex: 1;
        padding: 14px 20px;
        border: none;
        border-radius: 12px;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .confirm-btn-cancel {
        background: #374151;
        color: #d1d5db;
    }
    
    .confirm-btn-cancel:hover {
        background: #4b5563;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
    
    .confirm-btn-confirm {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }
    
    .confirm-btn-confirm:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
    }
    
    .confirm-btn:active {
        transform: translateY(0) scale(0.98);
    }
    
    /* 好友卡片 */
    .friend-card {
        padding: 12px;
    }
    
    .friend-avatar {
        width: 45px;
        height: 45px;
        font-size: 20px;
    }
    
    .friend-name {
        font-size: 15px;
    }
    
    .friend-stats {
        font-size: 11px;
    }
}

/* 大屏手机适配 (≤480px) */
@media (max-width: 480px) {
    /* 框架适配 */
    .mobile-phone-frame,
    #mobile-phone-overlay .mobile-phone-frame {
        width: 90% !important;
        max-width: 100% !important;
        border-radius: 30px !important;
        padding: 6px !important;
    }
    
    #mobile-phone-overlay .mobile-phone-screen {
        border-radius: 24px !important;
    }
    
    /* 触发按钮 */
    #mobile-trigger-btn {
        width: 45px;
        height: 45px;
        bottom: 12px;
        right: 12px;
    }
    
    /* 状态栏 */
    .mobile-status-bar {
        height: 36px;
        padding: 0 10px;
        font-size: 12px;
    }
    
    .status-left .time {
        font-size: 13px;
    }
    
    /* 应用 Header */
    .app-header {
        height: 44px;
        padding: 0 12px;
    }
    
    .app-title {
        font-size: 16px;
    }
    
    .back-button,
    .pin-btn {
        font-size: 18px;
        padding: 4px;
    }
    
    /* 主屏幕 */
    .home-screen {
        padding: 12px;
        gap: 12px;
    }
    
    /* 天气卡片 */
    .weather-card {
        padding: 12px;
        gap: 10px;
        border-radius: 15px;
    }
    
    .weather-time {
        font-size: 22px;
    }
    
    .weather-date {
        font-size: 12px;
    }
    
    .weather-location {
        font-size: 11px;
    }
    
    /* 应用图标 */
    .app-icon {
        gap: 5px;
    }
    
    .app-icon-bg {
        width: 46px;
        height: 46px;
        font-size: 23px;
        border-radius: 12px;
    }
    
    .app-label {
        font-size: 10px;
    }
    
    /* 应用网格 */
    .app-grid {
        gap: 12px;
    }
    
    .app-row {
        gap: 15px;
    }
    
    /* 应用内容 */
    .app-body {
        padding: 12px;
    }
    
    /* 列表项 */
    .list-item {
        padding: 10px;
        border-radius: 10px;
    }
    
    .list-item-name {
        font-size: 13px;
    }
    
    .list-item-value {
        font-size: 14px;
    }
    
    .list-item-desc {
        font-size: 11px;
    }
    
    /* 消息列表 */
    .message-item {
        padding: 10px;
        gap: 10px;
    }
    
    .message-avatar {
        width: 42px;
        height: 42px;
        font-size: 18px;
    }
    
    .message-name {
        font-size: 13px;
    }
    
    .message-preview {
        font-size: 11px;
    }
    
    .message-time {
        font-size: 10px;
    }
    
    /* 聊天界面 */
    .chat-messages {
        gap: 12px;
        padding: 10px;
    }
    
    .chat-bubble {
        font-size: 13px;
        padding: 9px 13px;
        border-radius: 16px;
    }
    
    .chat-time {
        font-size: 10px;
    }
    
    .chat-input-container {
        padding: 10px 12px;
        gap: 8px;
    }
    
    .chat-input {
        font-size: 13px;
        padding: 8px 12px;
        border-radius: 20px;
    }
    
    .send-button {
        width: 36px;
        height: 36px;
        font-size: 15px;
    }
    
    /* 商品卡片 */
    .shop-grid {
        gap: 10px;
    }
    
    .shop-item {
        padding: 10px;
        border-radius: 10px;
    }
    
    .shop-item-name {
        font-size: 13px;
    }
    
    .shop-item-desc {
        font-size: 11px;
    }
    
    .shop-item-price {
        font-size: 14px;
    }
    
    .shop-buy-btn {
        padding: 6px 12px;
        font-size: 12px;
    }
    
    /* 好友卡片 */
    .friends-grid {
        gap: 10px;
    }
    
    .friend-card {
        padding: 10px;
        border-radius: 10px;
    }
    
    .friend-avatar {
        width: 40px;
        height: 40px;
        font-size: 18px;
    }
    
    .friend-name {
        font-size: 14px;
    }
    
    .friend-identity {
        font-size: 11px;
    }
    
    .friend-stats {
        font-size: 10px;
    }
    
    .friend-stat-value {
        font-size: 13px;
    }
    
    /* 已移除资产相关样式 */
    
    .asset-item {
        padding: 10px;
    }
    
    .asset-label {
        font-size: 12px;
    }
    
    .asset-value {
        font-size: 14px;
    }
    
    /* 空状态 */
    .empty-state {
        padding: 40px 20px;
    }
    
    .empty-icon {
        font-size: 40px;
    }
    
    .empty-text {
        font-size: 13px;
    }
}

/* 小屏手机适配 (≤360px) */
@media (max-width: 360px) {
    /* 框架适配 */
    .mobile-phone-frame,
    #mobile-phone-overlay .mobile-phone-frame {
        width: 95% !important;
        border-radius: 25px !important;
        padding: 5px !important;
    }
    
    #mobile-phone-overlay .mobile-phone-screen {
        border-radius: 20px !important;
    }
    
    /* 触发按钮 */
    #mobile-trigger-btn {
        width: 40px;
        height: 40px;
        bottom: 10px;
        right: 10px;
    }
    
    /* 状态栏 */
    .mobile-status-bar {
        height: 34px;
        padding: 0 8px;
        font-size: 11px;
    }
    
    /* 应用 Header */
    .app-header {
        height: 40px;
        padding: 0 10px;
    }
    
    .app-title {
        font-size: 15px;
    }
    
    .back-button,
    .pin-btn {
        font-size: 16px;
        padding: 3px;
    }
    
    /* 主屏幕 */
    .home-screen {
        padding: 10px;
        gap: 10px;
    }
    
    /* 天气卡片 */
    .weather-card {
        padding: 10px;
    }
    
    .weather-time {
        font-size: 20px;
    }
    
    .weather-date {
        font-size: 11px;
    }
    
    /* 应用图标 */
    .app-icon-bg {
        width: 42px;
        height: 42px;
        font-size: 21px;
        border-radius: 10px;
    }
    
    .app-label {
        font-size: 9px;
    }
    
    .app-grid {
        gap: 10px;
    }
    
    .app-row {
        gap: 12px;
    }
    
    /* 应用内容 */
    .app-body {
        padding: 10px;
    }
    
    /* 列表项 */
    .list-item-name {
        font-size: 12px;
    }
    
    .list-item-value {
        font-size: 13px;
    }
    
    /* 聊天 */
    .chat-bubble {
        font-size: 12px;
        padding: 8px 12px;
    }
    
    .chat-input {
        font-size: 12px;
        padding: 7px 10px;
    }
    
    .send-button {
        width: 34px;
        height: 34px;
    }
    
    /* 好友头像 */
    .friend-avatar,
    .message-avatar {
        width: 36px;
        height: 36px;
        font-size: 16px;
    }
}

/* 触控优化 - 所有触摸设备 */
@media (hover: none) and (pointer: coarse) {
    /* 确保最小触控区域 44px (Apple HIG 标准) */
    .app-icon,
    .back-button,
    .send-button,
    .shop-buy-btn,
    button {
        min-width: 44px;
        min-height: 44px;
    }
    
    /* 增加间距防止误触 */
    .app-row {
        gap: 20px;
    }
    
    /* 增强触控反馈 */
    .app-icon:active {
        transform: scale(0.85);
    }
    
    .list-item:active,
    .message-item:active,
    .friend-card:active {
        transform: scale(0.98);
    }
}

/* 横屏优化 */
@media (max-width: 768px) and (orientation: landscape) {
    .mobile-phone-frame,
    #mobile-phone-overlay .mobile-phone-frame {
        width: 50% !important;
        max-width: 500px !important;
    }
    
    .home-screen,
    .app-body {
        padding: 10px;
    }
    
    .app-grid {
        gap: 10px;
    }
}

/* ==================== 滚动条 ==================== */
.home-screen::-webkit-scrollbar,
.app-body::-webkit-scrollbar {
    width: 4px;
}

.home-screen::-webkit-scrollbar-track,
.app-body::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
}

.home-screen::-webkit-scrollbar-thumb,
.app-body::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 2px;
}

.home-screen::-webkit-scrollbar-thumb:hover,
.app-body::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
}

/* ==================== 全屏壁纸按钮 ==================== */
.wallpaper-fullscreen-btn {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    z-index: 50;
}

.wallpaper-fullscreen-btn i {
    font-size: 20px;
    color: #667eea;
}

.wallpaper-fullscreen-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.3);
    background: rgba(255, 255, 255, 1);
}

.wallpaper-fullscreen-btn:active {
    transform: scale(0.95);
}

/* ==================== 全屏壁纸查看器 ==================== */
.wallpaper-fullscreen-viewer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(20px);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 200;
    animation: fadeIn 0.3s;
}

.wallpaper-fullscreen-viewer.active {
    display: flex;
}

.wallpaper-fullscreen-viewer img {
    max-width: 100%;
    max-height: calc(100% - 100px);
    object-fit: contain;
    border-radius: 0;
    box-shadow: none;
}

.wallpaper-close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    z-index: 201;
}

.wallpaper-close-btn i {
    font-size: 20px;
    color: #ffffff;
}

.wallpaper-close-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(90deg);
}

.wallpaper-close-btn:active {
    transform: rotate(90deg) scale(0.9);
}
</style>
`;

// ==================== Cầu nối biến MVU Việt hóa ====================
const PHONE_LOCAL_VI_TO_ZH_KEY_MAP = {
    'Thông tin thế giới': '\u4E16\u754C\u4FE1\u606F',
    'Danh sách gắn kết': '\u7F81\u7ECA\u5217\u8868',
    'Cấu hình hệ thống': '\u7CFB\u7EDF\u914D\u7F6E',
    'Niên lịch': '\u5E74\u5386',
    'Diễn biến thế giới': '\u4E16\u754C\u5267\u60C5',
    'Thế giới quan': '\u4E16\u754C\u89C2',
    'Tên họ': '\u59D3\u540D',
    'Tên': '\u540D\u79F0',
    'Giới tính': '\u6027\u522B',
    'Ở gần': '\u9644\u8FD1',
    'Chủng tộc': '\u79CD\u65CF',
    'Nghề nghiệp': '\u804C\u4E1A',
    'Thiết lập nền': '\u80CC\u666F\u8BBE\u5B9A',
    'Ngoại hình': '\u5916\u8C8C',
    'Trang phục': '\u7740\u88C5',
    'Cấp độ': '\u7B49\u7EA7',
    'Độ thiện cảm': '\u597D\u611F\u5EA6',
    'Lời thề đồng hành': '\u540C\u884C\u8A93\u7EA6',
    'Suy nghĩ hiện tại': '\u5F53\u524D\u60F3\u6CD5'
};

const PHONE_LOCAL_ZH_TO_VI_KEY_MAP = Object.fromEntries(
    Object.entries(PHONE_LOCAL_VI_TO_ZH_KEY_MAP).map(([vi, zh]) => [zh, vi])
);

const PHONE_WORLDVIEW_LABEL_ALIASES = {
    '\u521b\u4e16\u56de\u5eca': 'Hành lang Sáng thế',
    '\u521b\u4e16\u56de\u5eca5.0\u5148\u884c\u7248': 'Hành lang Sáng thế',
    'Hành Lang Sáng Thế': 'Hành lang Sáng thế',
    '\u5200\u5251\u795e\u57df': 'Sword Art Online',
    '\u7425\u73c0\u4e4b\u5251': 'Hổ Phách Chi Kiếm',
    '\u5927\u660e\u5fd7\u5f02': 'Đại Minh Chí Dị',
    '\u5c60\u9f99\u4e0e\u90fd\u5e02\u65e5\u5e38': 'Đồ Long Và Đô Thị Thường Nhật'
};

const PHONE_DEFAULT_FORUM_STYLE = 'Nhà hát Chư thần của Tet';
const PHONE_LEGACY_DEFAULT_FORUM_STYLE = '\u7279\u56fe\u7684\u4f17\u795e\u5267\u573a';

function normalizePhoneForumStyleName(style) {
    return style === PHONE_LEGACY_DEFAULT_FORUM_STYLE ? PHONE_DEFAULT_FORUM_STYLE : (style || PHONE_DEFAULT_FORUM_STYLE);
}

function getPhoneHostWindow() {
    try {
        return window.parent || window;
    } catch (e) {
        return window;
    }
}

function clonePhoneData(data) {
    if (!data || typeof data !== 'object') return data;
    try {
        return JSON.parse(JSON.stringify(data));
    } catch (e) {
        if (Array.isArray(data)) return data.map(item => clonePhoneData(item));
        return { ...data };
    }
}

function remapPhoneDataKeys(root, keyMap) {
    const seen = new WeakMap();
    const visit = (value) => {
        if (!value || typeof value !== 'object') return value;
        if (seen.has(value)) return seen.get(value);
        if (Array.isArray(value)) {
            const arr = [];
            seen.set(value, arr);
            value.forEach(item => arr.push(visit(item)));
            return arr;
        }
        const out = {};
        seen.set(value, out);
        Object.entries(value).forEach(([key, child]) => {
            out[keyMap[key] || key] = visit(child);
        });
        return out;
    };
    return visit(root);
}

function preparePhoneRuntimeData(data) {
    const copy = clonePhoneData(data);
    const host = getPhoneHostWindow();
    if (host && typeof host.__card36PrepareCalculatorRuntimeData === 'function') {
        try {
            return host.__card36PrepareCalculatorRuntimeData(copy) || copy;
        } catch (e) {
            console.warn('[Điện thoại] Bridge MVU chính không chuẩn hóa được dữ liệu, dùng mapping cục bộ:', e);
        }
    }
    return remapPhoneDataKeys(copy, PHONE_LOCAL_VI_TO_ZH_KEY_MAP);
}

function restorePhoneRuntimeData(data) {
    const copy = clonePhoneData(data);
    const host = getPhoneHostWindow();
    if (host && typeof host.__card36RestoreCalculatorRuntimeData === 'function') {
        try {
            return host.__card36RestoreCalculatorRuntimeData(copy) || copy;
        } catch (e) {
            console.warn('[Điện thoại] Bridge MVU chính không khôi phục được dữ liệu, dùng mapping cục bộ:', e);
        }
    }
    return remapPhoneDataKeys(copy, PHONE_LOCAL_ZH_TO_VI_KEY_MAP);
}

function normalizePhoneWorldviewLabel(label) {
    const value = String(label || '').trim();
    return PHONE_WORLDVIEW_LABEL_ALIASES[value] || value;
}

// ==================== Biến toàn cục ====================
let currentPhoneData = null;
let currentPanel = null;

// Ngăn xếp điều hướng, dùng cho các trang nhiều cấp
let navigationStack = [];

//  Bộ nhớ điều hướng danh sách bạn bè
let friendsListScrollPosition = 0; // Vị trí cuộn danh sách bạn bè
let lastViewedFriend = null; // Tên bạn bè xem gần nhất
let friendDetailScrollPosition = 0; //  Vị trí cuộn trang chi tiết bạn bè

/**
 * Kiểm tra trong object có mục liên hệ hợp lệ hay không
 */
function hasContactEntries(obj) {
    if (!obj || typeof obj !== 'object') return false;
    return Object.keys(obj).length > 0;
}

/**
 * Lấy nguồn dữ liệu liên hệ khả dụng hiện tại, dựa trên Danh sách gắn kết của biến MVU
 */
function getRelationshipDataSource(source = currentPhoneData) {
    /* Ưu tiên nguồn đã truyền vào; chuẩn hóa sang key runtime để giữ logic gốc */
    const normalizedSource = preparePhoneRuntimeData(source);
    if (normalizedSource && hasContactEntries(normalizedSource['\u7F81\u7ECA\u5217\u8868'])) {
        return normalizedSource['\u7F81\u7ECA\u5217\u8868'];
    }

    /* Dùng lại logic lấy MVU mới nhất, tương thích chat / message / giao diện biến cũ */
    if (typeof fetchLatestMvuData === 'function') {
        try {
            const latestGameData = fetchLatestMvuData(false);
            if (latestGameData && hasContactEntries(latestGameData['\u7F81\u7ECA\u5217\u8868'])) {
                return latestGameData['\u7F81\u7ECA\u5217\u8868'];
            }
        } catch (e) {
            console.warn('[Điện thoại] Lấy Danh sách gắn kết qua logic MVU thống nhất thất bại:', e);
        }
    }

    /* Dự phòng: thử lấy Danh sách gắn kết từ framework biến MVU */
    if (typeof Mvu !== 'undefined' && Mvu.getMvuData) {
        try {
            /* Thử lấy từ tin nhắn mới nhất bằng extractMvuGameData */
            const mvuData = Mvu.getMvuData({ type: 'message', message_id: 'latest' });
            const gameData = extractMvuGameData(mvuData);
            if (gameData && hasContactEntries(gameData['\u7F81\u7ECA\u5217\u8868'])) {
                return gameData['\u7F81\u7ECA\u5217\u8868'];
            }
            /* Thử lấy từ cấp chat */
            const chatData = Mvu.getMvuData({ type: 'chat' });
            const chatGameData = extractMvuGameData(chatData);
            if (chatGameData && hasContactEntries(chatGameData['\u7F81\u7ECA\u5217\u8868'])) {
                return chatGameData['\u7F81\u7ECA\u5217\u8868'];
            }
        } catch (e) {
            console.error('[Điện thoại] Lấy Danh sách gắn kết từ MVU thất bại:', e);
        }
    }
    return null;
}

/**
 * Lấy danh sách key liên hệ hợp lệ
 */
function getRelationshipKeys(collection) {
    if (!collection) return [];
    return Object.keys(collection);
}

// ==================== 角色头像配置 ====================
const CHARACTER_AVATAR_CONFIG = {
    '\u5948\u96C5\u4E3D': 'https://rpg.bolt.qzz.io/%E5%A4%B4%E5%83%8F/%E5%A5%88%E9%9B%85%E4%B8%BD.webp',
    '\u661F\u6781': 'https://rpg.bolt.qzz.io/%E5%A4%B4%E5%83%8F/%E6%98%9F%E6%9E%81.webp',
    '\u6CD5\u9732\u7279': 'https://rpg.bolt.qzz.io/%E5%A4%B4%E5%83%8F/%E6%B3%95%E9%9C%B2%E7%89%B9.webp',
    '\u4E9A\u4E1D\u5A1C': 'https://rpg.bolt.qzz.io/%E5%A4%B4%E5%83%8F/%E4%BA%9A%E4%B8%9D%E5%A8%9C.webp',
    '\u9732\u9732\u5361': 'https://rpg.bolt.qzz.io/%E5%A4%B4%E5%83%8F/%E9%9C%B2%E9%9C%B2%E5%8D%A1.webp',
    '\u5965\u5951\u4E1D': 'https://rpg.bolt.qzz.io/%E5%A4%B4%E5%83%8F/%E5%A5%A5%E5%A5%91%E4%B8%9D.webp',
    '\u7EA2\u83B2': 'https://rpg.bolt.qzz.io/%E5%A4%B4%E5%83%8F/%E7%BA%A2%E8%8E%B2.webp',
    '\u827E\u514B\u8389\u897F\u5A05': 'https://rpg.bolt.qzz.io/%E5%A4%B4%E5%83%8F/%E8%89%BE%E5%85%8B%E8%8E%89%E8%A5%BF%E5%A8%85.webp',
    '\u514B\u62C9\u7C73': 'https://rpg.bolt.qzz.io/%E5%A4%B4%E5%83%8F/%E5%85%8B%E6%8B%89%E7%B1%B3.webp',
    '\u521D\u6FD1\u4F0A\u7EB2': 'https://rpg.bolt.qzz.io/%E5%A4%B4%E5%83%8F/%E5%88%9D%E6%BF%91%E4%BC%8A%E7%BA%B2.webp',
    '\u53F2\u8482\u82AC\u59AE': 'https://rpg.bolt.qzz.io/%E5%A4%B4%E5%83%8F/%E5%8F%B2%E8%92%82%E8%8A%AC%E5%A6%AE.webp',
    '\u5409\u666E\u8389\u5C14': 'https://rpg.bolt.qzz.io/%E5%A4%B4%E5%83%8F/%E5%90%89%E6%99%AE%E8%8E%89%E5%B0%94.webp',
    '\u7279\u56FE': 'https://rpg.bolt.qzz.io/%E5%A4%B4%E5%83%8F/%E7%89%B9%E5%9B%BE.webp',
    '\u767D': 'https://rpg.bolt.qzz.io/%E5%A4%B4%E5%83%8F/%E7%99%BD.webp',
    '\u7EEF': 'https://rpg.bolt.qzz.io/%E5%A4%B4%E5%83%8F/%E7%BB%AF.webp',
    '\u83F2\u5C14': 'https://rpg.bolt.qzz.io/%E5%A4%B4%E5%83%8F/%E8%8F%B2%E5%B0%94.webp',
    "\u5361\u63D0\u5E0C\u5A05": 'https://rpg.bolt.qzz.io/%E5%A4%B4%E5%83%8F/%E5%8D%A1%E6%8F%90%E5%B8%8C%E5%A8%85.webp',
    "\u7231\u5F25\u65AF": 'https://rpg.bolt.qzz.io/%E5%A4%B4%E5%83%8F/%E7%88%B1%E5%BC%A5%E6%96%AF.webp',
    "\u7490\u7C73\u6B27\u513F": 'https://rpg.bolt.qzz.io/%E5%A4%B4%E5%83%8F/%E7%92%90%E7%B1%B3%E6%AC%A7%E5%84%BF.webp',
    "\u96C5\u513F\u8D1E\u7279": 'https://rpg.bolt.qzz.io/%E5%A4%B4%E5%83%8F/%E9%9B%85%E5%84%BF%E8%B4%9E%E7%89%B9.webp',
    "\u8FBE\u59AE\u5A05": 'https://rpg.bolt.qzz.io/%E5%A4%B4%E5%83%8F/%E8%BE%BE%E5%A6%AE%E5%A8%85.webp',
    "\u6D1B\u831C": 'https://rpg.bolt.qzz.io/%E5%A4%B4%E5%83%8F/%E6%B4%9B%E8%8C%9C.webp'
};

const PHONE_CHARACTER_NAME_ALIASES = {
    'Nyarly': '\u5948\u96c5\u4e3d',
    'Tinh Cực': '\u661f\u6781',
    'Forte': '\u6cd5\u9732\u7279',
    'Asuna': '\u4e9a\u4e1d\u5a1c',
    'Luluca': '\u9732\u9732\u5361',
    'Luluka': '\u9732\u9732\u5361',
    'Orchis': '\u5965\u5951\u4e1d',
    'Hồng Liên': '\u7ea2\u83b2',
    'Ecclesia': '\u827e\u514b\u8389\u897f\u5a05',
    'Chlammy': '\u514b\u62c9\u7c73',
    'Izuna Hatsuse': '\u521d\u6fd1\u4f0a\u7eb2',
    'Stephanie': '\u53f2\u8482\u82ac\u59ae',
    'Jibril': '\u5409\u666e\u8389\u5c14',
    'Tet': '\u7279\u56fe',
    'Teto': '\u7279\u56fe',
    'Shiro': '\u767d',
    'Hiiro': '\u7eef',
    'Phi': '\u7eef',
    'Fiel': '\u83f2\u5c14',
    'Fil': '\u83f2\u5c14',
    'Catissia': '\u5361\u63d0\u5e0c\u5a05',
    'Catisia': '\u5361\u63d0\u5e0c\u5a05',
    'Aemis': '\u7231\u5f25\u65af',
    'Aimis': '\u7231\u5f25\u65af',
    'Lumiore': '\u7490\u7c73\u6b27\u513f',
    'Lumioel': '\u7490\u7c73\u6b27\u513f',
    'Argente': '\u96c5\u513f\u8d1e\u7279',
    'Dania': '\u8fbe\u59ae\u5a05',
    'Roxie': '\u6d1b\u831c',
    'Rosie': '\u6d1b\u831c'
};

function normalizePhoneCharacterKey(name) {
    if (!name) return '';
    const rawName = String(name).trim();
    if (!rawName) return '';
    if (CHARACTER_AVATAR_CONFIG[rawName]) return rawName;
    if (PHONE_CHARACTER_NAME_ALIASES[rawName]) return PHONE_CHARACTER_NAME_ALIASES[rawName];
    const lowerName = rawName.toLowerCase();
    for (const [alias, canonicalName] of Object.entries(PHONE_CHARACTER_NAME_ALIASES)) {
        if (alias.toLowerCase() === lowerName) return canonicalName;
    }
    return rawName;
}

function getPhoneCharacterAliasCandidates(name) {
    const rawName = name ? String(name).trim() : '';
    const canonicalName = normalizePhoneCharacterKey(rawName);
    const candidates = new Set([rawName, canonicalName].filter(Boolean));
    if (canonicalName) {
        for (const [alias, aliasCanonicalName] of Object.entries(PHONE_CHARACTER_NAME_ALIASES)) {
            if (aliasCanonicalName === canonicalName) candidates.add(alias);
        }
    }
    return Array.from(candidates);
}

/**
 * 获取角色头像URL
 * @param {string} name - 角色名称
 * @returns {string|null} - 头像URL或null
 */
function getCharacterAvatar(name) {
    if (!name) return null;
    const rawName = String(name).trim();
    const canonicalName = normalizePhoneCharacterKey(rawName);
    if (CHARACTER_AVATAR_CONFIG[canonicalName]) {
        return CHARACTER_AVATAR_CONFIG[canonicalName];
    }

    for (const aliasName of getPhoneCharacterAliasCandidates(rawName)) {
        const aliasCanonicalName = normalizePhoneCharacterKey(aliasName);
        if (CHARACTER_AVATAR_CONFIG[aliasCanonicalName]) {
            return CHARACTER_AVATAR_CONFIG[aliasCanonicalName];
        }
    }

    const lowerName = rawName.toLowerCase();
    for (const [aliasName, aliasCanonicalName] of Object.entries(PHONE_CHARACTER_NAME_ALIASES)) {
        const lowerAliasName = aliasName.toLowerCase();
        if (lowerName.includes(lowerAliasName) || lowerAliasName.includes(lowerName)) {
            const avatarUrl = CHARACTER_AVATAR_CONFIG[aliasCanonicalName];
            if (avatarUrl) return avatarUrl;
        }
    }

    for (const [charName, avatarUrl] of Object.entries(CHARACTER_AVATAR_CONFIG)) {
        if (rawName.includes(charName) || charName.includes(rawName)) {
            return avatarUrl;
        }
    }
    return null;
}

//  实时刷新相关变量
let messageEventListener = null;
let lastMessageCount = 0;
let isEventListening = false;
let refreshPollingInterval = null;

// ==================== 边界限制工具函数 ====================
// clamp 函数：将值限制在 min 和 max 之间
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

// 获取可靠的视口尺寸（支持 iframe 和各种环境）
function getViewportSize() {
    // 优先使用 visualViewport（更准确，支持缩放）
    if (window.visualViewport) {
        const vv = window.visualViewport;
        if (vv.width > 0 && vv.height > 0) {
            return { width: vv.width, height: vv.height };
        }
    }

    // 回退到 innerWidth/innerHeight
    let w = window.innerWidth || document.documentElement.clientWidth || 0;
    let h = window.innerHeight || document.documentElement.clientHeight || 0;

    // iframe 中尝试父窗口
    if ((w === 0 || h === 0) && window.parent !== window) {
        try {
            const pw = window.parent.innerWidth || window.parent.document.documentElement.clientWidth;
            const ph = window.parent.innerHeight || window.parent.document.documentElement.clientHeight;
            if (pw > 0) w = pw;
            if (ph > 0) h = ph;
        } catch (e) {
            // 跨域无法访问父窗口
        }
    }

    // 最终回退到默认值（避免返回 0）
    return {
        width: w > 0 ? w : 800,
        height: h > 0 ? h : 600
    };
}

// 完全限制在视口内（不允许任何部分超出）
function constrainFullyInViewport(x, y, elementWidth, elementHeight) {
    const viewport = getViewportSize();

    const boundedX = clamp(x, 0, viewport.width - elementWidth);
    const boundedY = clamp(y, 0, viewport.height - elementHeight);

    return { x: boundedX, y: boundedY };
}

// 拖动相关变量
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let btnStartX = 0;
let btnStartY = 0;
let hasMoved = false;

// 手机界面拖动变量
let isPhoneDragging = false;
let phoneDragStartX = 0;
let phoneDragStartY = 0;
let phoneStartX = 0;
let phoneStartY = 0;

// 置顶状态
let isPinned = false;

// 壁纸数据
const phoneWpBaseUrl = 'https://rpg.bolt.qzz.io/%E5%B0%81%E9%9D%A2/';
const phoneWpData = {
    '\u5361\u63D0\u5E0C\u5A05': ['\u5361\u63D0\u5E0C\u5A05'],
    '\u5948\u96C5\u4E3D': ['\u5948\u96C5\u4E3D'],
    '\u661F\u6781': ['\u661F\u6781'],
    '\u6CD5\u9732\u7279': ['\u6CD5\u9732\u7279'],
    '\u7EA2\u83B2': ['\u7EA2\u83B2'],
    '\u827E\u514B\u8389\u897F\u5A05': ['\u827E\u514B\u8389\u897F\u5A05'],
    '\u51EF\u5C14\u8D1D\u6D1B\u65AF': ['\u51EF\u5C14\u8D1D\u6D1B\u65AF'],
    '\u591C\u6597': ['\u591C\u6597'],
    '\u5965\u5951\u4E1D': ['\u5965\u5951\u4E1D'],
    '\u764C\u9A91\u58EB': ['\u764C\u9A91\u58EB'],
    '\u7687\u51A0': ['\u7687\u51A0'],
    '\u7EEF': ['\u7EEF'],
    '\u767D': ['\u767D'],
    '\u5409\u666E\u8389\u5C14': ['\u5409\u666E\u8389\u5C14'],
    '\u53F2\u8482\u82AC\u59AE': ['\u53F2\u8482\u82AC\u59AE'],
    '\u83F2\u5C14': ['\u83F2\u5C14'],
    '\u514B\u62C9\u7C73': ['\u514B\u62C9\u7C73'],
    '\u521D\u6FD1\u4F0A\u7EB2': ['\u521D\u6FD1\u4F0A\u7EB2'],
    '\u8FBE\u59AE\u5A05': ['\u8FBE\u59AE\u5A05']
};

const PHONE_WP_DISPLAY_NAMES = {
    '\u5361\u63D0\u5E0C\u5A05': 'Catissia',
    '\u5948\u96C5\u4E3D': 'Nyarly',
    '\u661F\u6781': 'Tinh Cực',
    '\u6CD5\u9732\u7279': 'Forte',
    '\u7EA2\u83B2': 'Hồng Liên',
    '\u827E\u514B\u8389\u897F\u5A05': 'Ecclesia',
    '\u51EF\u5C14\u8D1D\u6D1B\u65AF': 'Cerberus',
    '\u591C\u6597': 'Yato',
    '\u5965\u5951\u4E1D': 'Orchis',
    '\u764C\u9A91\u58EB': 'Cancer Knight',
    '\u7687\u51A0': 'Crown',
    '\u7EEF': 'Hiiro',
    '\u767D': 'Shiro',
    '\u5409\u666E\u8389\u5C14': 'Jibril',
    '\u53F2\u8482\u82AC\u59AE': 'Stephanie',
    '\u83F2\u5C14': 'Fiel',
    '\u514B\u62C9\u7C73': 'Chlammy',
    '\u521D\u6FD1\u4F0A\u7EB2': 'Izuna Hatsuse',
    '\u8FBE\u59AE\u5A05': 'Dania'
};

const PHONE_WP_CATEGORY_ALIASES = {
    ...PHONE_CHARACTER_NAME_ALIASES,
    'Cerberus': '\u51ef\u5c14\u8d1d\u6d1b\u65af',
    'Yato': '\u591c\u6597',
    'Cancer Knight': '\u764c\u9a91\u58eb',
    'Ung thư': '\u764c\u9a91\u58eb',
    'Crown': '\u7687\u51a0'
};

function normalizePhoneWallpaperCategoryName(categoryName) {
    if (!categoryName) return '';
    const rawName = String(categoryName).trim();
    if (!rawName) return '';
    if (phoneWpData[rawName]) return rawName;
    if (PHONE_WP_CATEGORY_ALIASES[rawName]) return PHONE_WP_CATEGORY_ALIASES[rawName];
    const lowerName = rawName.toLowerCase();
    for (const [alias, canonicalName] of Object.entries(PHONE_WP_CATEGORY_ALIASES)) {
        if (alias.toLowerCase() === lowerName) return canonicalName;
    }
    return rawName;
}

function getPhoneWallpaperDisplayName(categoryName) {
    const canonicalName = normalizePhoneWallpaperCategoryName(categoryName);
    return PHONE_WP_DISPLAY_NAMES[canonicalName] || categoryName;
}

function getPhoneCharacterDisplayName(name) {
    if (!name) return '';
    const canonicalName = normalizePhoneCharacterKey(name);
    return PHONE_WP_DISPLAY_NAMES[canonicalName] || String(name);
}

const PHONE_DISPLAY_VALUE_ALIASES = {
    '\u7537\u6027': 'Nam',
    '\u5973\u6027': 'Nữ',
    '\u7537': 'Nam',
    '\u5973': 'Nữ',
    '\u65e0': 'Không',
    '\u901a\u7528': 'Dùng chung',
    '\u795e\u7075\u79cd': 'Thần Linh Chủng',
    '\u5e7b\u60f3\u79cd': 'Huyễn Tưởng Chủng',
    '\u7cbe\u7075\u79cd': 'Tinh Linh Chủng',
    '\u9f99\u7cbe\u79cd': 'Long Tinh Chủng',
    '\u5de8\u4eba\u79cd': 'Cự Nhân Chủng',
    '\u5929\u7ffc\u79cd': 'Thiên Dực Chủng',
    '\u68ee\u7cbe\u79cd': 'Sâm Tinh Chủng',
    '\u5996\u9b54\u79cd': 'Yêu Ma Chủng',
    '\u5996\u7cbe\u79cd': 'Yêu Tinh Chủng',
    '\u673a\u51ef\u79cd': 'Cơ Khải Chủng',
    '\u5730\u7cbe\u79cd': 'Địa Tinh Chủng',
    '\u5438\u8840\u79cd': 'Hấp Huyết Chủng',
    '\u6708\u548f\u79cd': 'Nguyệt Vịnh Chủng',
    '\u517d\u4eba\u79cd': 'Thú Nhân Chủng',
    '\u6d77\u6816\u79cd': 'Hải Tê Chủng',
    '\u4eba\u7c7b\u79cd': 'Nhân Loại Chủng'
};

function normalizePhoneDisplayValue(value) {
    if (value === null || value === undefined) return '';
    if (typeof value !== 'string') return value;
    const rawValue = value.trim();
    if (!rawValue) return '';
    return PHONE_DISPLAY_VALUE_ALIASES[rawValue] || normalizePhoneWorldviewLabel(rawValue) || getPhoneCharacterDisplayName(rawValue);
}

// 生成完整URL的壁纸分类
const phoneWpCategories = Object.fromEntries(
    Object.entries(phoneWpData).map(([name, files]) => [
        name,
        files.map(file => `${phoneWpBaseUrl}${encodeURIComponent(file)}.webp`)
    ])
);



// 已加载的分类
const phoneWpLoaded = new Set();

// 当前壁纸
let phoneWpCurrent = localStorage.getItem('dnf-phone-wallpaper') || '';

// 当前聊天对象
let currentChatFriend = null;

// 论坛生成状态标记
let isForumGenerating = false;

//  论坛相关函数将在文件末尾"全局函数暴露"区域统一定义

// ==================== 初始化函数 ====================
function initializeMobilePhone() {

    //  论坛设置相关函数（在initializeMobilePhone中重新定义，确保作用域一致）
    window.phoneOpenForumSettings = function () {

        //  注意：返回时会重新生成论坛面板，所以不需要保存导航栈
        // 清空导航栈，确保不会有旧的导航历史干扰
        navigationStack.length = 0;

        const manager = window.phoneForumManager;
        const settings = manager.settings;
        const apiConfig = manager.apiConfig.settings;
        const currentForumStyle = normalizePhoneForumStyleName(settings.forumStyle);

        const html = `
            <div style="padding: 12px;">
                <h3 style="margin: 0 0 16px 0; font-size: 16px; color: #2d3748;"> Thiết lập diễn đàn</h3>
                
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 6px; font-size: 12px; color: #4a5568; font-weight: 500;"> Phong cách diễn đàn</label>
                    <select id="forum-style" style="width: 100%; padding: 8px; background: white; border: 1px solid #cbd5e0; border-radius: 4px; color: #2d3748;">
                        <option value="${PHONE_DEFAULT_FORUM_STYLE}" ${currentForumStyle === PHONE_DEFAULT_FORUM_STYLE ? 'selected' : ''}>${PHONE_DEFAULT_FORUM_STYLE}</option>
                        ${settings.customStyles && settings.customStyles.length > 0 ? settings.customStyles.map(style =>
            `<option value="custom:${style.name}" ${currentForumStyle === `custom:${style.name}` ? 'selected' : ''}>${style.name}</option>`
        ).join('') : ''}
                    </select>
                </div>
                
                <!-- Tùy chọn dùng preset và worldbook -->
                <div style="margin-bottom: 16px;">
                    <label style="display: flex; align-items: center; cursor: pointer; padding: 10px; background: #f7fafc; border: 1px solid #cbd5e0; border-radius: 4px;">
                        <input type="checkbox" id="use-preset-worldbook" ${settings.usePresetAndWorldBook ? 'checked' : ''} style="margin-right: 8px; width: 16px; height: 16px; cursor: pointer;">
                        <span style="font-size: 12px; color: #2d3748; font-weight: 500;">📚 Dùng preset và worldbook</span>
                    </label>
                    <small style="display: block; margin-top: 4px; padding-left: 24px; font-size: 10px; color: #718096;">
                        Khi bật, hệ thống dùng preset và worldbook hiện tại của Tavern; khi tắt, chỉ dùng lịch sử chat và prompt tùy chỉnh.
                    </small>
                </div>
                
                <!-- Chọn loại API -->
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 6px; font-size: 12px; color: #4a5568; font-weight: 500;"> Loại API</label>
                    <select id="forum-api-type" style="width: 100%; padding: 8px; background: white; border: 1px solid #cbd5e0; border-radius: 4px; color: #2d3748;">
                        <option value="sillytavern" ${!apiConfig.enabled && settings.apiType === 'sillytavern' ? 'selected' : ''}>SillyTavern mặc định</option>
                        <option value="custom" ${apiConfig.enabled || settings.apiType === 'custom' ? 'selected' : ''}>API tùy chỉnh (cấu hình riêng)</option>
                    </select>
                </div>
                
                <!-- Panel cấu hình API tùy chỉnh (cấu hình riêng) -->
                <div id="custom-api-settings" style="display: ${apiConfig.enabled || settings.apiType === 'custom' ? 'block' : 'none'}; margin-bottom: 16px; padding: 12px; background: #f0f9ff; border: 2px solid #3b82f6; border-radius: 6px;">
                    <div style="margin-bottom: 10px;">
                        <label style="display: block; margin-bottom: 4px; font-size: 11px; color: #4a5568; font-weight: 500;">API URL (cần tương thích OpenAI)</label>
                        <input type="text" id="api-url" value="${escapeHtml(apiConfig.apiUrl)}" placeholder="Ví dụ: https://api.openai.com/v1" style="width: 100%; padding: 6px; background: white; border: 1px solid #cbd5e0; border-radius: 4px; color: #2d3748; box-sizing: border-box; font-size: 12px;">
                    </div>
                    
                    <div style="margin-bottom: 10px;">
                        <label style="display: block; margin-bottom: 4px; font-size: 11px; color: #4a5568; font-weight: 500;">API Key</label>
                        <input type="password" id="api-key" value="${escapeHtml(apiConfig.apiKey)}" placeholder="sk-..." style="width: 100%; padding: 6px; background: white; border: 1px solid #cbd5e0; border-radius: 4px; color: #2d3748; box-sizing: border-box; font-size: 12px;">
                    </div>
                    
                    <div style="margin-bottom: 10px;">
                        <label style="display: block; margin-bottom: 4px; font-size: 11px; color: #4a5568; font-weight: 500;">Model</label>
                        <select id="api-model" style="width: 100%; padding: 6px; background: white; border: 1px solid #cbd5e0; border-radius: 4px; color: #2d3748; font-size: 12px;">
                            <option value="">Hãy lấy danh sách model trước...</option>
                        </select>
                        <div style="display: flex; gap: 6px; margin-top: 6px;">
                            <button id="fetch-models-btn" style="flex: 1; padding: 8px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 500;">
                                <i class="fas fa-sync-alt"></i> Lấy model
                            </button>
                            <button id="test-connection-btn" style="flex: 1; padding: 8px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 500;">
                                <i class="fas fa-check-circle"></i> Kiểm tra kết nối
                            </button>
                        </div>
                    </div>
                    
                    <div id="api-status" style="display: none; margin-top: 8px; padding: 8px; border-radius: 4px; font-size: 11px;"></div>
                    
                    <div style="margin-top: 8px; padding: 8px; background: #e0f2fe; border-radius: 4px; font-size: 10px; color: #0c4a6e;">
                        <strong>💡 Gợi ý:</strong> API tùy chỉnh sẽ gọi LLM riêng.
                    </div>
                    
                    <!-- Cấu hình tự sinh diễn đàn (chỉ dùng với API tùy chỉnh) -->
                    <div style="margin-top: 12px; padding: 10px; background: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px;">
                        <div style="font-size: 12px; font-weight: 600; color: #92400e; margin-bottom: 8px;">
                            <i class="fas fa-magic"></i> Tự sinh diễn đàn
                        </div>
                        
                        <label style="display: flex; align-items: center; cursor: pointer; margin-bottom: 8px;">
                            <input type="checkbox" id="auto-generate-enabled" ${apiConfig.autoGenerate?.enabled ? 'checked' : ''} style="margin-right: 8px; width: 14px; height: 14px; cursor: pointer;">
                            <span style="font-size: 11px; color: #78350f;">Bật tự sinh</span>
                        </label>
                        
                        <div style="margin-bottom: 8px;">
                            <label style="display: block; margin-bottom: 4px; font-size: 10px; color: #78350f;">Ngưỡng kích hoạt (cứ bao nhiêu tầng thì tự sinh)</label>
                            <input type="number" id="auto-generate-threshold" value="${apiConfig.autoGenerate?.threshold || 10}" min="1" max="100" style="width: 100%; padding: 5px; background: white; border: 1px solid #d97706; border-radius: 4px; color: #78350f; box-sizing: border-box; font-size: 11px;">
                        </div>
                        
                        <label style="display: flex; align-items: center; cursor: pointer;">
                            <input type="checkbox" id="auto-generate-notification" ${apiConfig.autoGenerate?.showNotification !== false ? 'checked' : ''} style="margin-right: 8px; width: 14px; height: 14px; cursor: pointer;">
                            <span style="font-size: 11px; color: #78350f;">Hiển thị thông báo khi sinh</span>
                        </label>
                        
                        <div style="margin-top: 6px; font-size: 9px; color: #a16207;">
                            💡 Khi số tin nhắn chat đạt ngưỡng tầng đã đặt, nội dung diễn đàn sẽ tự sinh.
                        </div>
                    </div>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <button id="manage-custom-styles-btn" style="width: 100%; padding: 10px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500; font-size: 14px;">
                         Tùy chỉnh diễn đàn
                    </button>
                    <div style="display: flex; gap: 8px;">
                        <button class="phone-forum-save-settings-btn" style="flex: 1; padding: 10px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">
                            <i class="fas fa-save"></i> Lưu
                        </button>
                        <button class="phone-forum-close-settings-btn" style="flex: 1; padding: 10px; background: #666; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">
                            <i class="fas fa-times"></i> Hủy
                        </button>
                    </div>
                </div>
            </div>
        `;

        $('#phone-app-title').text(' Thiết lập diễn đàn');
        $('#phone-app-body').html(html);


        //  关键！绑定所有按钮事件（在HTML插入后立即绑定）
        setTimeout(() => {
            // 恢复已保存的模型到下拉框
            const savedModel = apiConfig.model;
            if (savedModel) {
                const $modelSelect = $('#api-model');
                // 如果已保存模型，添加到下拉框并选中
                $modelSelect.append($('<option>', {
                    value: savedModel,
                    text: savedModel,
                    selected: true
                }));
            }

            // 绑定API类型切换事件
            $('#forum-api-type').off('change').on('change', function () {
                const isCustom = $(this).val() === 'custom';
                $('#custom-api-settings').toggle(isCustom);
            });

            // 绑定获取模型按钮
            $('#fetch-models-btn').off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                window.phoneFetchModels && window.phoneFetchModels();
            });

            // 绑定测试连接按钮
            $('#test-connection-btn').off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                window.phoneTestConnection && window.phoneTestConnection();
            });

            // 绑定管理自定义风格按钮
            $('#manage-custom-styles-btn').off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                window.phoneManageCustomStyles && window.phoneManageCustomStyles();
            });

            // 绑定保存按钮
            $('.phone-forum-save-settings-btn').off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                window.phoneSaveForumSettings && window.phoneSaveForumSettings();
            });

            // 绑定关闭按钮
            $('.phone-forum-close-settings-btn').off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                window.phoneCloseForumSettings && window.phoneCloseForumSettings();
            });

        }, 0);
    };

    window.phoneSaveForumSettings = function () {

        try {
            const manager = window.phoneForumManager;

            if (!manager) {
                if (typeof toastr !== 'undefined') {
                    toastr.error('Trình quản lý chưa khởi tạo!', 'Diễn đàn');
                }
                return;
            }

            // Đọc toàn bộ giá trị thiết lập
            const forumStyle = normalizePhoneForumStyleName($('#forum-style').val());
            const apiType = $('#forum-api-type').val();
            const usePresetAndWorldBook = $('#use-preset-worldbook').is(':checked');

            // Lưu thiết lập diễn đàn
            manager.settings.forumStyle = forumStyle;
            manager.settings.apiType = apiType;
            manager.settings.usePresetAndWorldBook = usePresetAndWorldBook;
            manager.saveSettings();

            // Lưu cấu hình API riêng (chỉ bật khi chọn API tùy chỉnh)
            manager.apiConfig.settings.enabled = (apiType === 'custom');

            if (apiType === 'custom') {
                //  Đọc cấu hình API riêng (giới hạn trong phone-app-body hiện tại)
                const $currentBody = $('#phone-app-body');
                const selectedModel = $currentBody.find('#api-model').val() || '';

                manager.apiConfig.settings.apiUrl = $currentBody.find('#api-url').val();
                manager.apiConfig.settings.apiKey = $currentBody.find('#api-key').val();
                manager.apiConfig.settings.model = selectedModel;

                // Lưu cấu hình tự sinh diễn đàn
                manager.apiConfig.settings.autoGenerate = {
                    enabled: $currentBody.find('#auto-generate-enabled').is(':checked'),
                    threshold: parseInt($currentBody.find('#auto-generate-threshold').val()) || 10,
                    showNotification: $currentBody.find('#auto-generate-notification').is(':checked')
                };

                // Nếu bật tự sinh, reset bộ đếm
                if (manager.apiConfig.settings.autoGenerate.enabled) {
                    manager.apiConfig.resetAutoGenerateCounter();
                }
            }

            manager.apiConfig.saveSettings();


            if (typeof toastr !== 'undefined') {
                toastr.success('Đã lưu thiết lập!', 'Diễn đàn');
            }

            //  Quay về giao diện diễn đàn - dựng lại thay vì khôi phục HTML cũ để đảm bảo event bind đúng
            setTimeout(() => {

                // Xóa stack điều hướng vì panel sẽ dựng lại
                navigationStack.length = 0;

                // Dựng lại panel diễn đàn để các event được bind đúng
                $('#phone-app-title').text(' Diễn đàn');
                $('#phone-app-body').html(generateForumPanel());

            }, 100);
        } catch (error) {
            if (typeof toastr !== 'undefined') {
                toastr.error('Lưu thiết lập thất bại: ' + error.message, 'Diễn đàn');
            }
        }
    };

    window.phoneCloseForumSettings = function () {

        //  Dựng lại panel diễn đàn thay vì khôi phục HTML cũ để đảm bảo event bind đúng
        // Xóa stack điều hướng
        navigationStack.length = 0;

        // Dựng lại panel diễn đàn
        $('#phone-app-title').text(' Diễn đàn');
        $('#phone-app-body').html(generateForumPanel());

    };

    //  Hàm quản lý phong cách tùy chỉnh
    window.phoneManageCustomStyles = function () {

        const manager = window.phoneForumManager;
        const customStyles = manager.settings.customStyles || [];

        const html = `
            <div style="padding: 12px;">
                <h3 style="margin: 0 0 16px 0; font-size: 16px; color: #2d3748;"> Quản lý phong cách tùy chỉnh</h3>
                
                <button id="add-custom-style-btn" style="width: 100%; padding: 10px; margin-bottom: 16px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">
                     Tạo phong cách tùy chỉnh
                </button>
                
                <div id="custom-styles-list" style="margin-bottom: 16px;">
                    ${customStyles.length === 0 ?
                '<div style="text-align: center; padding: 20px; color: #718096; font-size: 12px;">Chưa có phong cách tùy chỉnh</div>' :
                customStyles.map((style, index) => `
                            <div class="custom-style-item" data-index="${index}" style="background: white; border: 1px solid #cbd5e0; border-radius: 4px; padding: 10px; margin-bottom: 8px;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div style="flex: 1; min-width: 0;">
                                        <div style="font-weight: 500; color: #2d3748; margin-bottom: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(style.name)}</div>
                                        <div style="font-size: 11px; color: #718096; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(style.prompt.substring(0, 50))}...</div>
                                    </div>
                                    <div style="display: flex; gap: 6px; margin-left: 10px;">
                                        <button class="edit-custom-style-btn" data-index="${index}" style="padding: 6px 10px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                                              Sửa
                                        </button>
                                        <button class="delete-custom-style-btn" data-index="${index}" style="padding: 6px 10px; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                                              Xóa
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `).join('')
            }
                </div>
                
                <button class="phone-back-to-settings-btn" style="width: 100%; padding: 10px; background: #666; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">
                    ← Quay lại thiết lập
                </button>
            </div>
        `;

        $('#phone-app-title').text(' Quản lý phong cách tùy chỉnh');
        $('#phone-app-body').html(html);

        // 绑定事件
        setTimeout(() => {
            // 新建按钮
            $('#add-custom-style-btn').off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                window.phoneShowCustomStyleEditor && window.phoneShowCustomStyleEditor();
            });

            // 编辑按钮
            $('.edit-custom-style-btn').off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                const index = $(this).data('index');
                window.phoneShowCustomStyleEditor && window.phoneShowCustomStyleEditor(index);
            });

            // 删除按钮
            $('.delete-custom-style-btn').off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                const index = $(this).data('index');
                if (confirm('Bạn chắc chắn muốn xóa phong cách tùy chỉnh này?')) {
                    window.phoneDeleteCustomStyle && window.phoneDeleteCustomStyle(index);
                }
            });

            // 返回按钮
            $('.phone-back-to-settings-btn').off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                window.phoneOpenForumSettings && window.phoneOpenForumSettings();
            });
        }, 0);
    };

    window.phoneShowCustomStyleEditor = function (editIndex) {

        const manager = window.phoneForumManager;
        const isEdit = editIndex !== undefined;
        const style = isEdit ? manager.settings.customStyles[editIndex] : { name: '', prompt: '' };

        const html = `
            <div style="padding: 12px;">
                <h3 style="margin: 0 0 16px 0; font-size: 16px; color: #2d3748;">${isEdit ? ' Sửa' : ' Tạo'} phong cách tùy chỉnh</h3>
                
                <div style="margin-bottom: 12px;">
                    <label style="display: block; margin-bottom: 6px; font-size: 12px; color: #4a5568; font-weight: 500;">Tên phong cách</label>
                    <input type="text" id="custom-style-name" value="${escapeHtml(style.name)}" placeholder="Ví dụ: Little Red Book" style="width: 100%; padding: 8px; background: white; border: 1px solid #cbd5e0; border-radius: 4px; color: #2d3748; box-sizing: border-box;">
                </div>
                
                <div style="margin-bottom: 12px;">
                    <label style="display: block; margin-bottom: 6px; font-size: 12px; color: #4a5568; font-weight: 500;">Prompt phong cách</label>
                    <textarea id="custom-style-prompt" placeholder="Nhập mô tả chi tiết cho phong cách diễn đàn, tương tự stylePrompts của preset..." style="width: 100%; min-height: 300px; padding: 8px; background: white; border: 1px solid #cbd5e0; border-radius: 4px; color: #2d3748; box-sizing: border-box; font-family: monospace; font-size: 11px; resize: vertical;">${escapeHtml(style.prompt)}</textarea>
                    <div style="margin-top: 6px; display: flex; justify-content: space-between; align-items: center;">
                        <small style="font-size: 10px; color: #718096;">
                             Gợi ý: có thể tham khảo format preset, gồm thiết lập lõi, yêu cầu nhân vật, phong cách diễn đàn và loại nội dung thường gặp.
                        </small>
                        <button id="import-example-btn" style="padding: 6px 12px; background: #8b5cf6; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: 500; white-space: nowrap;">
                             Nhập ví dụ
                        </button>
                    </div>
                </div>
                
                <div style="display: flex; gap: 8px;">
                    <button id="save-custom-style-btn" data-index="${editIndex !== undefined ? editIndex : ''}" style="flex: 1; padding: 10px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">
                         Lưu
                    </button>
                    <button class="phone-back-to-manage-btn" style="flex: 1; padding: 10px; background: #666; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">
                        ← Hủy
                    </button>
                </div>
            </div>
        `;

        $('#phone-app-title').text(isEdit ? ' Sửa phong cách tùy chỉnh' : ' Tạo phong cách tùy chỉnh');
        $('#phone-app-body').html(html);

        // 绑定事件
        setTimeout(() => {
            // 导入示例按钮
            $('#import-example-btn').off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                window.phoneImportExamplePrompt && window.phoneImportExamplePrompt();
            });

            // 保存按钮
            $('#save-custom-style-btn').off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                const index = $(this).data('index');
                window.phoneSaveCustomStyle && window.phoneSaveCustomStyle(index !== '' ? index : undefined);
            });

            // 取消按钮
            $('.phone-back-to-manage-btn').off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                window.phoneManageCustomStyles && window.phoneManageCustomStyles();
            });
        }, 0);
    };

    window.phoneSaveCustomStyle = function (editIndex) {

        const manager = window.phoneForumManager;
        const name = $('#custom-style-name').val().trim();
        const prompt = $('#custom-style-prompt').val().trim();

        // Kiểm tra hợp lệ
        if (!name) {
            if (typeof toastr !== 'undefined') {
                toastr.error('Hãy nhập tên phong cách', 'Diễn đàn');
            }
            return;
        }

        if (!prompt) {
            if (typeof toastr !== 'undefined') {
                toastr.error('Hãy nhập prompt phong cách', 'Diễn đàn');
            }
            return;
        }

        // Kiểm tra trùng tên (khi sửa thì loại trừ chính nó)
        const isDuplicate = manager.settings.customStyles.some((style, index) =>
            style.name === name && index !== editIndex
        );

        if (isDuplicate) {
            if (typeof toastr !== 'undefined') {
                toastr.error('Tên phong cách đã tồn tại', 'Diễn đàn');
            }
            return;
        }

        // Lưu hoặc cập nhật
        if (editIndex !== undefined) {
            // Sửa phong cách hiện có
            manager.settings.customStyles[editIndex] = { name, prompt };
        } else {
            // Tạo phong cách mới
            if (!manager.settings.customStyles) {
                manager.settings.customStyles = [];
            }
            manager.settings.customStyles.push({ name, prompt });
        }

        manager.saveSettings();

        if (typeof toastr !== 'undefined') {
            toastr.success(editIndex !== undefined ? 'Đã cập nhật phong cách' : 'Đã tạo phong cách', 'Diễn đàn');
        }

        // Quay về trang quản lý
        window.phoneManageCustomStyles && window.phoneManageCustomStyles();
    };

    window.phoneImportExamplePrompt = function () {

        const examplePrompt = `## Phong cách diễn đàn: Nhà hát Chư thần của Tet

**Thiết lập lõi — Chư thần của Thế giới Bốn Phương:**
Từ rất lâu về trước, chư thần của “Trật tự” và chư thần của “Hỗn mang” tranh đấu không ngừng, cho đến khi cả hai phe đều kiệt sức. Ván xúc xắc giữa “Định mệnh” và “Ngẫu nhiên” bắt đầu từ đó: chư thần dùng xúc xắc tạo nên Thế giới Bốn Phương cùng những quân cờ, rồi dùng các cuộc phiêu lưu để phân định thắng bại. Khi chiến binh loài người đầu tiên tập hợp đồng đội, bước lên lữ trình và thảo phạt cự long, chư thần đã cuồng nhiệt vì điều đó. Họ lập ra Lời thề Hoàng Kim: không can thiệp vào bàn cờ quá mức cần thiết, chỉ gieo xúc xắc trong lúc phiêu lưu và tôn trọng ý chí tự do của quân cờ.

Giờ đây, những vị thần Bốn Phương ấy được Tet mời đến để quan sát câu chuyện xảy ra sau khi Disboard và thế giới Arad dung hợp.

**Danh tính và quy tắc đặt tên người đăng:**
- Tet cứ gọi là “Tet”. Với các thần khác, hãy trộn nhiều kiểu danh hiệu khác nhau:
  - “Thần XX”: Thần Chiến Tranh, Thần Rượu / “Thần của XX”: Thần của Lừa Gạt, Thần của Bão Tố / “Nữ thần XX”: Nữ thần Mùa Màng, Nữ thần Mặt Trăng
  - Tôn xưng: Địa Mẫu, Chủ Mặt Trời / khái niệm trừu tượng: Định Mệnh, Ngẫu Nhiên, Chân Thực / dạng khác: Kẻ Dệt Mộng, Người Phán Quyết, Thợ Săn
- Cùng một vị thần có thể xuất hiện nhiều lần; Tet không cần xuất hiện trong mọi bài.

**Chất giọng của thần minh (cực kỳ quan trọng):**
- Tham khảo cảm giác nguyên tác: “Phiêu lưu! Phiêu lưu! Vẫn là phiêu lưu! Không ngôn từ nào diễn tả được cảm giác tuyệt vời này!” — có nhiệt huyết và chất sử thi, nhưng không làm dáng.
- Cấm giọng cổ phong trẻ trâu kiểu “ta đã chứng kiến…”, “sức mạnh chính là chính nghĩa”, “quyền bính lĩnh vực của chúng ta” — kiểu này còn tệ hơn khẩu ngữ hóa.
- Cũng đừng dùng khẩu ngữ mạng như “oa ngầu quá!”, “thèm chết mất”.
- Hướng đúng: tự nhiên, mạnh mẽ, có cảm xúc thật. Các reply phải có cảm giác đối thoại: có phản bác, bổ sung, lạc đề kéo ra chủ đề mới.

**Tông nội dung (cực kỳ quan trọng):**
- Tập trung vào phiêu lưu, chiến đấu, bước ngoặt số mệnh, sự trỗi dậy và sụp đổ của anh hùng, thế cờ giữa các thế lực — là tự sự lớn, không phải chuyện vụn vặt thường ngày.
- “Lớn” không có nghĩa là “nghiêm nghị”. Cuộc thảo luận nên sôi nổi, thú vị và đầy nhiệt huyết, không phải một nhóm học giả già viết luận văn.

**Nguồn nội dung bài viết:**
- Tối đa một nửa bài viết liên quan đến cốt truyện hiện tại của người chơi.
- Ít nhất một nửa là câu chuyện đang xảy ra ở nơi khác trên bàn cờ: nhân vật gắn kết, nhân vật nguyên tác DNF, nhân vật nguyên tác No Game No Life, v.v.

**Bầu không khí diễn đàn:**
- Phải có tính giải trí và dễ đọc, đừng viết thành tập thiết lập.
- Các bài có thể liên hệ với nhau; có bài náo nhiệt, có bài vắng vẻ.
- Đừng để mọi bài đều nhấn mạnh các yếu tố thiết lập như xúc xắc hay bàn cờ.`;

        // Đưa prompt ví dụ vào ô sửa
        $('#custom-style-prompt').val(examplePrompt);

        if (typeof toastr !== 'undefined') {
            toastr.success('Đã nhập ví dụ Nhà hát Chư thần của Tet', 'Diễn đàn');
        }
    };

    window.phoneDeleteCustomStyle = function (index) {

        const manager = window.phoneForumManager;
        const deletedStyle = manager.settings.customStyles[index];

        // Nếu đang chọn đúng phong cách bị xóa thì chuyển về phong cách mặc định
        if (manager.settings.forumStyle === `custom:${deletedStyle.name}`) {
            manager.settings.forumStyle = PHONE_DEFAULT_FORUM_STYLE;
        }

        // Xóa phong cách
        manager.settings.customStyles.splice(index, 1);
        manager.saveSettings();

        if (typeof toastr !== 'undefined') {
            toastr.success('Đã xóa phong cách', 'Diễn đàn');
        }

        // Làm mới trang quản lý
        window.phoneManageCustomStyles && window.phoneManageCustomStyles();
    };

    // 🔧 API 配置辅助函数已移除，使用phoneFetchModels替代

    window.phoneShowAPIStatus = function (message, type = 'info') {
        const statusDiv = $('#api-status');
        if (!statusDiv.length) return;

        const colors = {
            info: '#3b82f6',
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b'
        };

        const bgColors = {
            info: '#eff6ff',
            success: '#f0fdf4',
            error: '#fef2f2',
            warning: '#fffbeb'
        };

        statusDiv.css({
            'display': 'block',
            'color': colors[type] || colors.info,
            'background': bgColors[type] || bgColors.info,
            'border': `1px solid ${colors[type] || colors.info}`
        });
        statusDiv.text(message);

        // 自动隐藏成功消息
        if (type === 'success') {
            setTimeout(() => {
                statusDiv.fadeOut();
            }, 3000);
        }
    };

    // 获取可用模型列表
    window.phoneFetchModels = async function () {
        const $currentBody = $('#phone-app-body');
        const apiUrl = $currentBody.find('#api-url').val().trim();
        const apiKey = $currentBody.find('#api-key').val().trim();
        const modelSelect = $currentBody.find('#api-model')[0];
        const buttonElement = $currentBody.find('#fetch-models-btn')[0];

        if (!apiUrl) {
            window.phoneShowAPIStatus('⚠️ Vui lòng nhập API URL trước!', 'warning');
            return;
        }

        const originalBtnHTML = buttonElement.innerHTML;
        buttonElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang lấy...';
        buttonElement.disabled = true;

        try {
            let cleanedApiUrl = apiUrl.replace(/\/$/, '');
            if (!cleanedApiUrl.endsWith('/v1')) {
                cleanedApiUrl += '/v1';
            }

            let fetchUrl = cleanedApiUrl.endsWith('/models') ? cleanedApiUrl : `${cleanedApiUrl}/models`;

            const headers = {};
            if (apiKey) {
                headers['Authorization'] = `Bearer ${apiKey}`;
            }

            const fetchOptions = {
                method: 'GET',
                headers: headers
            };

            const response = await fetch(fetchUrl, fetchOptions);
            if (!response.ok) {
                const errorText = await response.text();
                let errorDetail = 'Yêu cầu thất bại';
                try {
                    const errorJson = JSON.parse(errorText);
                    errorDetail = errorJson.error?.message || errorText;
                } catch (e) {
                    errorDetail = errorText;
                }
                throw new Error(`HTTP ${response.status}: ${errorDetail}`);
            }

            const responseText = await response.text();
            let data;
            try {
                data = responseText ? JSON.parse(responseText) : [];
            } catch (e) {
                throw new Error('Phản hồi API không phải định dạng JSON hợp lệ.');
            }

            let models = [];
            if (data && data.models && Array.isArray(data.models)) {
                models = data.models.map(model => model.name).filter(Boolean);
            } else if (data && data.data && Array.isArray(data.data)) {
                models = data.data.map(model => model.id).filter(Boolean);
            } else if (Array.isArray(data)) {
                models = data.map(model => (typeof model === 'string' ? model : model.id)).filter(Boolean);
            }

            modelSelect.innerHTML = '';
            if (models.length > 0) {
                models.sort();
                models.forEach(modelId => {
                    const option = document.createElement('option');
                    option.value = modelId;
                    option.textContent = modelId;
                    modelSelect.appendChild(option);
                });
                modelSelect.selectedIndex = 0;

                window.phoneShowAPIStatus(`✅ Đã lấy thành công ${models.length} model!`, 'success');
            } else {
                modelSelect.innerHTML = '<option disabled>Không lấy được model nào</option>';
                window.phoneShowAPIStatus('⚠️ API trả về thành công, nhưng danh sách model trống hoặc không nhận ra được định dạng.', 'warning');
            }

        } catch (error) {
            console.error('Lấy model thất bại:', error);
            modelSelect.innerHTML = '<option>Lấy thất bại</option>';
            window.phoneShowAPIStatus(`❌ Lấy model thất bại: ${error.message}`, 'error');
        } finally {
            buttonElement.innerHTML = originalBtnHTML;
            buttonElement.disabled = false;
        }
    };

    window.phoneTestConnection = async function () {
        const manager = window.phoneForumManager;
        const $currentBody = $('#phone-app-body');

        const apiUrl = $currentBody.find('#api-url').val();
        const apiKey = $currentBody.find('#api-key').val();
        const model = $currentBody.find('#api-model').val() || '';

        if (!apiUrl) {
            window.phoneShowAPIStatus('⚠️ Vui lòng nhập địa chỉ API trước', 'warning');
            return;
        }

        if (!apiKey) {
            window.phoneShowAPIStatus('⚠️ Vui lòng nhập khóa API trước', 'warning');
            return;
        }

        if (!model) {
            window.phoneShowAPIStatus('⚠️ Vui lòng chọn model trước', 'warning');
            return;
        }

        window.phoneShowAPIStatus('🔄 Đang kiểm tra kết nối...', 'info');

        try {
            const result = await manager.apiConfig.testConnection(apiUrl, apiKey, model);

            if (result.success) {
                window.phoneShowAPIStatus('✅ Kiểm tra kết nối thành công!', 'success');
            } else {
                window.phoneShowAPIStatus(`❌ Kiểm tra kết nối thất bại: ${result.error}`, 'error');
            }
        } catch (error) {
            window.phoneShowAPIStatus(`❌ Kiểm tra kết nối thất bại: ${error.message}`, 'error');
        }
    };

    // 创建事件处理函数（可被多个地方复用）
    window.handlePhoneLiveButtonClick = function (e) {
        const target = e.target;

        // 安全检查
        if (!target || !target.classList) {
            return;
        }

        const classList = target.classList;
        const classArray = Array.from(classList);

        // 检查论坛按钮
        if (classArray.includes('phone-forum-generate-btn')) {
            e.preventDefault();
            e.stopPropagation();
            window.phoneGenerateForum && window.phoneGenerateForum();
            return;
        }

        if (classArray.includes('phone-forum-settings-btn')) {
            e.preventDefault();
            e.stopPropagation();
            window.phoneOpenForumSettings && window.phoneOpenForumSettings();
            return;
        }

        if (classArray.includes('phone-forum-save-settings-btn')) {
            e.preventDefault();
            e.stopPropagation();
            window.phoneSaveForumSettings && window.phoneSaveForumSettings();
            return;
        }

        if (classArray.includes('phone-forum-close-settings-btn')) {
            e.preventDefault();
            e.stopPropagation();
            window.phoneCloseForumSettings && window.phoneCloseForumSettings();
            return;
        }

        // 如果点击的是按钮内的图标、文字或 DIV，向上查找按钮
        if ((target.tagName === 'I' || target.tagName === 'SPAN' || target.tagName === 'DIV') && target.parentElement) {
            const parentClasses = Array.from(target.parentElement.classList || []);

            if (parentClasses.includes('phone-forum-generate-btn')) {
                e.preventDefault();
                e.stopPropagation();
                window.phoneGenerateForum && window.phoneGenerateForum();
                return;
            }

            if (parentClasses.includes('phone-forum-settings-btn')) {
                e.preventDefault();
                e.stopPropagation();
                window.phoneOpenForumSettings && window.phoneOpenForumSettings();
                return;
            }

            if (parentClasses.includes('phone-forum-save-settings-btn')) {
                e.preventDefault();
                e.stopPropagation();
                window.phoneSaveForumSettings && window.phoneSaveForumSettings();
                return;
            }

            if (parentClasses.includes('phone-forum-close-settings-btn')) {
                e.preventDefault();
                e.stopPropagation();
                window.phoneCloseForumSettings && window.phoneCloseForumSettings();
                return;
            }

        }
    };

    try {
        // 在主文档上监听（用于论坛按钮的捕获阶段处理）
        document.addEventListener('click', window.handlePhoneLiveButtonClick, true);

        // 清理旧元素
        $('#mobile-trigger-btn').remove();
        $('#mobile-phone-overlay').remove();
        $('#mobile-phone-styles').remove();

        // 加载 Font Awesome（安全方式，不会触发SillyTavern的检测）
        loadFontAwesome();

        // 注入样式
        $('head').append(phoneStyles);

        // 创建触发按钮 - Brushed Metal风格（复刻状态栏悬浮球）
        // 生成八角星路径 - 复用状态栏.js的AppleStyle-Star算法
        function getOctagramPath(R, rotationOffsetDeg) {
            rotationOffsetDeg = rotationOffsetDeg || 0;
            var d = "M ";
            var N = 8;
            var K = 3;
            var offsetRad = rotationOffsetDeg * Math.PI / 180;
            var cx = 50;
            var cy = 50;
            for (var i = 0; i <= N; i++) {
                var idx = (i * K) % N;
                var angle = (idx * 2 * Math.PI / N) - Math.PI / 2 + offsetRad;
                var x = cx + Math.cos(angle) * R;
                var y = cy + Math.sin(angle) * R;
                if (i === 0) d += x.toFixed(2) + "," + y.toFixed(2) + " ";
                else d += "L " + x.toFixed(2) + "," + y.toFixed(2) + " ";
            }
            d += "Z";
            return d;
        }
        const pathData1 = getOctagramPath(35, 0);
        const pathData2 = getOctagramPath(35, 22.5);

        const triggerBtn = $('<button>', {
            id: 'mobile-trigger-btn',
            title: 'Mở điện thoại'
        });
        triggerBtn.html(`
            <div class="star-container">
                <svg class="icon-svg" viewBox="0 0 100 100" style="overflow:visible !important;display:block !important;visibility:visible !important;">
                    <path d="${pathData1}" style="fill:none !important;stroke:#666 !important;stroke-width:2 !important;opacity:0.7 !important;stroke-linecap:round !important;stroke-linejoin:round !important;visibility:visible !important;"></path>
                    <path d="${pathData2}" style="fill:none !important;stroke:#666 !important;stroke-width:2 !important;opacity:0.7 !important;stroke-linecap:round !important;stroke-linejoin:round !important;visibility:visible !important;"></path>
                    <path class="layer-2" d="${pathData2}" style="fill:none !important;stroke:#999 !important;stroke-width:1.5 !important;opacity:1 !important;stroke-linecap:round !important;stroke-linejoin:round !important;visibility:visible !important;stroke-dasharray:100 400;"></path>
                    <path class="layer-1" d="${pathData1}" style="fill:none !important;stroke:#555 !important;stroke-width:2 !important;opacity:0.8 !important;stroke-linecap:round !important;stroke-linejoin:round !important;visibility:visible !important;stroke-dasharray:100 400;"></path>
                    <circle cx="50" cy="50" r="12" style="fill:none !important;stroke:#777 !important;stroke-width:1.5 !important;visibility:visible !important;"></circle>
                </svg>
            </div>
        `);

        // 创建手机界面
        const phoneOverlay = $('<div>', {
            id: 'mobile-phone-overlay',
            html: `
                <div class="mobile-phone-frame">
                    <div class="mobile-phone-screen">
                        <!-- 状态栏 -->
                        <div class="mobile-status-bar">
                            <div class="status-left">
                                <span style="display: flex; align-items: center; gap: 4px; color: #666; font-size: 12px; font-weight: 500;">
                                    <i class="fas fa-cloud" id="phone-status-weather-icon" style="font-size: 12px;"></i>
                                    <span id="phone-status-weather">Nhiều mây</span>
                                </span>
                            </div>
                            <div class="status-center" id="phone-drag-handle" style="cursor: move; flex: 1; display: flex; justify-content: center; align-items: center; position: absolute; left: 50%; transform: translateX(-50%);" title="Kéo giao diện điện thoại">
                                <span class="time" style="color: #666; font-size: 12px; font-weight: 500;" id="phone-status-time">14:30</span>
                            </div>
                            <div class="status-right">
                                <span class="battery">
                                    <i class="fas fa-battery-full"></i>
                                    <span class="battery-text">100%</span>
                                </span>
                                <button id="phone-pin-btn" class="pin-btn" title="Ghim / bỏ ghim">
                                    <i class="fas fa-thumbtack"></i>
                                </button>
                            </div>
                        </div>

                        <!-- 主内容区域 -->
                        <div class="mobile-content">
                            <!-- 主界面 -->
                            <div class="home-screen" id="phone-home-screen">
                                <!-- 时间天气卡片 -->
                                <div class="weather-card">
                                    <div class="weather-time">
                                        <span class="current-time" id="phone-big-time">14:30</span>
                                        <span class="current-date" id="phone-date">11/09</span>
                                    </div>
                                    <div class="weather-info">
                                        <i class="fas fa-cloud" style="font-size: 16px; color: #585858;"></i>
                                        <span class="weather-desc" id="phone-weather">Nhiều mây</span>
                                    </div>
                                </div>

                                <!-- 应用页面容器 -->
                                <div class="app-pages-container">
                                    <!-- 滑动包装器 -->
                                    <div class="app-pages-wrapper" id="app-pages-wrapper">
                                        <!-- 第一页 -->
                                        <div class="app-page">
                                            <div class="app-grid">
                                                <!-- 第一行：信息，CG收集，论坛 -->
                                                <div class="app-row">
                                                    <div class="app-icon" data-app="messages">
                                                        <div class="app-icon-bg md-blue">
                                                            <i class="fas fa-comments"></i>
                                                        </div>
                                                        <span class="app-label">Tin nhắn</span>
                                                    </div>
                                                    <div class="app-icon" data-app="gallery">
                                                        <div class="app-icon-bg md-green">
                                                            <i class="fas fa-images"></i>
                                                        </div>
                                                        <span class="app-label">Bộ sưu tập CG</span>
                                                    </div>
                                                    <div class="app-icon" data-app="forum">
                                                        <div class="app-icon-bg md-purple">
                                                            <i class="fas fa-comments"></i>
                                                        </div>
                                                        <span class="app-label">Diễn đàn</span>
                                                    </div>
                                                </div>
                                                <!-- 第二行：羁绊，壁纸，设置 -->
                                                <div class="app-row">
                                                    <div class="app-icon" data-app="friends">
                                                        <div class="app-icon-bg md-pink">
                                                            <i class="fas fa-user-friends"></i>
                                                        </div>
                                                        <span class="app-label">Gắn kết</span>
                                                    </div>
                                                    <div class="app-icon" data-app="wallpaper">
                                                        <div class="app-icon-bg md-pink">
                                                            <i class="fas fa-image"></i>
                                                        </div>
                                                        <span class="app-label">Hình nền</span>
                                                    </div>
                                                    <div class="app-icon" data-app="settings">
                                                        <div class="app-icon-bg md-blue">
                                                            <i class="fas fa-cog"></i>
                                                        </div>
                                                        <span class="app-label">Thiết lập</span>
                                                    </div>
                                                </div>
                                                <!-- 第三行：世界书管理（左对齐，占位补满整行） -->
                                                <div class="app-row">
                                                    <div class="app-icon" data-app="worldbook">
                                                        <div class="app-icon-bg md-teal">
                                                            <i class="fas fa-book-open"></i>
                                                        </div>
                                                        <span class="app-label">Worldbook</span>
                                                    </div>
                                                    <div class="app-icon" style="visibility:hidden;pointer-events:none;" aria-hidden="true"></div>
                                                    <div class="app-icon" style="visibility:hidden;pointer-events:none;" aria-hidden="true"></div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <!-- 第二页（已去除重复入口） -->
                                    </div>
                                    
                                    <!-- 页面指示器 -->
                                    <div class="page-indicators" id="page-indicators">
                                        <div class="indicator active"></div>
                                    </div>
                                </div>
                                
                                <!-- 全屏按钮 -->
                                <button id="wallpaper-fullscreen-btn" class="wallpaper-fullscreen-btn" title="Xem ảnh nền cỡ lớn">
                                    <i class="fas fa-expand"></i>
                                </button>
                            </div>

                            <!-- 应用详情面板 -->
                            <div class="app-detail-panel" id="phone-detail-panel">
                                <div class="app-header">
                                    <button class="back-button" id="phone-back-btn">
                                        <i class="fas fa-chevron-left"></i>
                                    </button>
                                    <span class="app-title" id="phone-app-title">Ứng dụng</span>
                                    <div style="width: 36px;"></div>
                                </div>
                                <div class="app-body" id="phone-app-body">
                                    <!-- 应用内容将在这里动态加载 -->
                                </div>
                            </div>

                            <!-- 聊天面板 -->
                            <div class="chat-panel" id="phone-chat-panel">
                                <div class="chat-header">
                                    <button class="back-button" id="chat-back-btn">
                                        <i class="fas fa-chevron-left"></i>
                                    </button>
                                    <span class="app-title" id="chat-title" style="flex: 1;">Trò chuyện</span>
                                    <div id="chat-right-actions" style="width: 36px; flex-shrink: 0;"></div>
                                </div>
                                <div class="chat-messages" id="chat-messages">
                                </div>
                                <div class="chat-input-area">
                                    <input type="text" class="chat-input" id="chat-input" placeholder="Nhập tin nhắn...">
                                    <button class="chat-send-btn" id="chat-send-btn">
                                        <i class="fas fa-paper-plane"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <!-- 全屏壁纸查看器 -->
                            <div class="wallpaper-fullscreen-viewer" id="wallpaper-fullscreen-viewer">
                                <button class="wallpaper-close-btn" id="wallpaper-close-btn">
                                    <i class="fas fa-times"></i>
                                </button>
                                <div class="cg-nav-controls" id="cg-nav-controls" style="display: none; position: absolute; bottom: 15px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: 15px; z-index: 210;">
                                    <button class="cg-nav-btn" id="cg-prev-btn" style="width: 40px; height: 40px; background: rgba(0,0,0,0.6); color: #fff; border: none; border-radius: 50%; font-size: 16px; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.3); transition: all 0.2s; display: flex; align-items: center; justify-content: center;">
                                        <i class="fas fa-chevron-left"></i>
                                    </button>
                                    <button class="cg-set-wallpaper-btn" id="cg-set-wallpaper-btn" style="padding: 10px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; border: none; border-radius: 20px; font-size: 13px; font-weight: 500; cursor: pointer; box-shadow: 0 3px 12px rgba(102, 126, 234, 0.4); white-space: nowrap;">
                                        <i class="fas fa-image" style="margin-right: 6px;"></i>Đặt làm hình nền
                                    </button>
                                    <button class="cg-nav-btn" id="cg-next-btn" style="width: 40px; height: 40px; background: rgba(0,0,0,0.6); color: #fff; border: none; border-radius: 50%; font-size: 16px; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.3); transition: all 0.2s; display: flex; align-items: center; justify-content: center;">
                                        <i class="fas fa-chevron-right"></i>
                                    </button>
                                </div>
                                <div class="cg-index-display" id="cg-index-display" style="display: none; position: absolute; top: 10px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.5); color: #fff; padding: 4px 12px; border-radius: 12px; font-size: 12px; z-index: 210;"></div>
                                <img id="wallpaper-fullscreen-img" src="" alt="Xem trước hình nền">
                            </div>
                        </div>
                    </div>
                </div>
            `
        });

        $('body').append(triggerBtn);
        $('body').append(phoneOverlay);

        // 延迟绑定事件，确保 DOM 完全就绪
        setTimeout(() => {
            bindPhoneEvents();
        }, 0);

        // 注册MVU事件监听
        registerMvuEventListeners();



        // 更新时间
        updatePhoneTime();
        setInterval(updatePhoneTime, 60000);

        //  每次初始化时重置悬浮球位置到初始位置
        localStorage.removeItem('mobile-trigger-btn-position');
        localStorage.removeItem('mobile-trigger-btn-user-dragged');

        //  主动调用位置重置，确保在正确的初始位置
        // 桌面端：离右边三分之一距离的垂直中央
        // 移动端：右边垂直居中
        setTimeout(() => {
            window.resetMobileButtonPosition && window.resetMobileButtonPosition();
        }, 100);

        // 恢复保存的壁纸和手机尺寸
        setTimeout(() => {
            restoreWallpaper();
            restorePhoneSize();
        }, 200);

        // 标记全局变量供依赖检测（挂到父窗口，跨iframe可见）
        try { (window.parent || window)['__\u5C0F\u624B\u673A\u811A\u672C_loaded__'] = true; } catch(e) { window['__\u5C0F\u624B\u673A\u811A\u672C_loaded__'] = true; }

    } catch (error) {
        if (typeof toastr !== 'undefined') {
            toastr.error('Khởi tạo giao diện điện thoại thất bại: ' + error.message);
        }
    }
}

// ==================== 事件绑定 ====================
function bindPhoneEvents() {

    // 触发按钮点击和拖动
    const $triggerBtn = $('#mobile-trigger-btn');

    // 使用 Pointer Events 统一处理拖拽和点击（参考状态栏.js）
    const btnElement = $triggerBtn[0];
    let isDrag = false;
    let pStartX = 0, pStartY = 0, pStartLeft = 0, pStartTop = 0;

    const onPointerMove = function (e) {
        if (!isDrag) return;
        e.cancelable && e.preventDefault();
        const dx = e.screenX - pStartX;
        const dy = e.screenY - pStartY;
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
            $triggerBtn.addClass('dragging');
        }
        if ($triggerBtn.hasClass('dragging')) {
            hasMoved = true;
            // 移除响应式定位类，切换到绝对定位
            $triggerBtn.removeClass('mobile-mode tablet-mode desktop-mode');

            let newX = pStartLeft + dx;
            let newY = pStartTop + dy;
            const btnWidth = $triggerBtn.outerWidth() || 60;
            const btnHeight = $triggerBtn.outerHeight() || 60;
            const bounded = constrainFullyInViewport(newX, newY, btnWidth, btnHeight);

            btnElement.style.setProperty('left', bounded.x + 'px', 'important');
            btnElement.style.setProperty('top', bounded.y + 'px', 'important');
            btnElement.style.setProperty('right', 'auto', 'important');
            btnElement.style.setProperty('bottom', 'auto', 'important');
            btnElement.style.setProperty('transform', 'none', 'important');
        }
    };

    const onPointerUp = function (e) {
        const win = btnElement.ownerDocument.defaultView || window;
        win.removeEventListener('pointermove', onPointerMove);
        win.removeEventListener('pointerup', onPointerUp);
        win.removeEventListener('pointercancel', onPointerUp);
        if (btnElement.releasePointerCapture) {
            try { btnElement.releasePointerCapture(e.pointerId); } catch (err) { }
        }

        if ($triggerBtn.hasClass('dragging')) {
            // 拖拽结束，保存位置
            const rect = btnElement.getBoundingClientRect();
            try {
                const position = { left: rect.left, top: rect.top };
                localStorage.setItem('mobile-trigger-btn-position', JSON.stringify(position));
                localStorage.setItem('mobile-trigger-btn-user-dragged', 'true');
            } catch (err) { }
            setTimeout(() => {
                $triggerBtn.removeClass('dragging');
                hasMoved = false;
            }, 50);
        } else if (e.type === 'pointerup') {
            // 没有拖拽，视为点击
            const $overlay = $('#mobile-phone-overlay');
            if ($overlay.hasClass('active')) {
                closeMobilePhone();
            } else {
                openMobilePhone();
            }
        }
        isDrag = false;
    };

    btnElement.addEventListener('pointerdown', function (e) {
        if (e.button !== 0 && e.pointerType === 'mouse') return;
        e.cancelable && e.preventDefault();
        e.stopPropagation();
        isDrag = true;
        hasMoved = false;
        pStartX = e.screenX;
        pStartY = e.screenY;
        const rect = btnElement.getBoundingClientRect();
        pStartLeft = rect.left;
        pStartTop = rect.top;
        if (btnElement.setPointerCapture) {
            try { btnElement.setPointerCapture(e.pointerId); } catch (err) { }
        }
        const win = btnElement.ownerDocument.defaultView || window;
        win.addEventListener('pointermove', onPointerMove);
        win.addEventListener('pointerup', onPointerUp);
        win.addEventListener('pointercancel', onPointerUp);
    });

    btnElement.addEventListener('touchstart', function (e) { e.preventDefault(); }, { passive: false });

    // 点击遮罩关闭（仅在未置顶时）
    $('#mobile-phone-overlay').on('click', function (e) {
        // 如果正在拖动页面或刚完成拖动，不关闭手机
        if (pageSwipe && (pageSwipe.isDragging || pageSwipe.justFinishedDragging)) {
            return;
        }
        if ($(e.target).attr('id') === 'mobile-phone-overlay' && !isPinned) {
            closeMobilePhone();
        }
    });

    // 置顶按钮点击
    $('#phone-pin-btn').on('click', function (e) {
        e.stopPropagation();
        togglePin();
    });

    // 全屏壁纸按钮点击
    $('#wallpaper-fullscreen-btn').on('click', function (e) {
        e.stopPropagation();
        openWallpaperFullscreen();
    });

    // 全屏壁纸关闭按钮点击
    $('#wallpaper-close-btn').on('click', function (e) {
        e.stopPropagation();
        closeWallpaperFullscreen();
    });

    // CG设为壁纸按钮点击
    $('#cg-set-wallpaper-btn').on('click', function (e) {
        e.stopPropagation();
        const cgUrl = $(this).data('cg-url');
        if (cgUrl) {
            setWallpaper(cgUrl);
            closeWallpaperFullscreen();
            if (typeof toastr !== 'undefined') {
                toastr.success('Đã đặt CG làm hình nền');
            }
        }
    });

    // 点击全屏查看器背景关闭
    $('#wallpaper-fullscreen-viewer').on('click', function (e) {
        if (e.target.id === 'wallpaper-fullscreen-viewer') {
            closeWallpaperFullscreen();
        }
    });

    // CG上一张/下一张按钮点击
    $('#cg-prev-btn').on('click', function (e) {
        e.stopPropagation();
        switchCGImage('prev');
    });

    $('#cg-next-btn').on('click', function (e) {
        e.stopPropagation();
        switchCGImage('next');
    });

    // 手机界面拖动功能
    initPhoneDrag();

    //  修复：应用图标点击改为事件委托，避免DOM更新后事件失效
    // 使用事件委托到 body，这样即使DOM更新也不会丢失事件
    $('body').off('click.appIcon').on('click.appIcon', '.app-icon[data-app], .app-icon[data-app] *', function (e) {
        e.stopPropagation();

        //  关键修复：使用closest查找最近的.app-icon元素（处理点击子元素的情况）
        const $appIcon = $(this).closest('.app-icon[data-app]');

        if ($appIcon.length === 0) {
            return; // 不是应用图标或其子元素
        }

        const appName = $appIcon.attr('data-app');

        if (appName) {
            openAppPanel(appName);
        } else {
        }
    });

    // 返回按钮
    $('#phone-back-btn').on('click', function () {
        closeAppPanel();
    });

    //  绑定创建群聊按钮（使用事件委托）
    $('body').off('click.createGroupBtn').on('click.createGroupBtn', '.create-group-button', function (e) {
        e.stopPropagation();
        openCreateGroupPanel();
    });

    //  绑定聊天界面中的删除群聊按钮（使用事件委托）
    $('body').off('click.deleteGroupBtn').on('click.deleteGroupBtn', '.chat-delete-group-btn', function (e) {
        e.stopPropagation();
        e.preventDefault();
        const groupId = $(this).data('group-id');
        const groupName = $(this).data('group-name');
        deleteGroup(groupId, groupName);
    });

    //  绑定询问阿罗娜按钮（使用事件委托）
    $('body').off('click.askArona').on('click.askArona', '.ask-arona-btn', async function (e) {
        e.stopPropagation();
        e.preventDefault();

        const $btn = $(this);
        const originalHtml = $btn.html();

        // 禁用按钮并显示加载状态
        $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Đang gửi...');

        try {
            if (!window.messageSender) {
                throw new Error('Trình gửi tin nhắn chưa được khởi tạo');
            }

            const message = 'Hỏi Arona xem có ủy thác nào cần xử lý không';
            const success = await window.messageSender.sendToChat(message);

            if (success) {
                if (typeof toastr !== 'undefined') {
                    toastr.success('Đã gửi câu hỏi cho Arona', 'Gửi thành công');
                }
                // 恢复按钮状态
                $btn.prop('disabled', false).html(originalHtml);
            } else {
                throw new Error('Gửi tin nhắn thất bại');
            }
        } catch (error) {
            if (typeof toastr !== 'undefined') {
                toastr.error('Gửi thất bại: ' + error.message, 'Lỗi');
            }
            // 恢复按钮状态
            $btn.prop('disabled', false).html(originalHtml);
        }
    });

    // 绑定联系人点击事件（使用事件委托到 body）
    // 注意：由于联系人列表在 #phone-app-body 中动态生成，需要使用事件委托
    $('body').off('click.contactItem').on('click.contactItem', '.contact-item', function (e) {
        e.stopPropagation();

        const $item = $(this);
        const contactId = $item.data('id');
        const contactName = $item.data('name');
        const contactType = $item.data('type');
        const members = $item.data('members') || '';
        const isGroup = contactType === 'group';

        if (!contactId || !contactName) {
            return;
        }

        openChatPanel(contactId, contactName, isGroup, members);
    });

    // 绑定聊天界面返回按钮
    $('#chat-back-btn').on('click', function () {
        closeChatPanel();
    });

    // 绑定聊天发送按钮
    $('#chat-send-btn').on('click', function () {
        sendChatMessage();
    });

    // 绑定聊天输入框回车发送
    $('#chat-input').on('keypress', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendChatMessage();
        }
    });

    //  图片点击事件（使用事件委托）
    $('body').off('click.messageImage').on('click.messageImage', '.clickable-image', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const imageUrl = $(this).data('image-url');
        if (imageUrl) {
            viewFullImage(imageUrl);
        }
    });

    // 壁纸分类展开/收起（使用事件委托）
    $(document).on('click', '.wallpaper-category-header', function (e) {
        const categoryName = $(this).data('category');
        if (categoryName) {
            toggleWallpaperCategory(categoryName);
        }
    });

    // 论坛按钮点击（使用jQuery事件委托，和好友一样的方式）
    $(document).on('click', '.phone-forum-generate-btn', function (e) {
        e.stopPropagation();
        e.preventDefault();
        window.phoneGenerateForum && window.phoneGenerateForum();
    });

    $(document).on('click', '.phone-forum-settings-btn', function (e) {
        e.stopPropagation();
        e.preventDefault();
        window.phoneOpenForumSettings && window.phoneOpenForumSettings();
    });

    $(document).on('click', '.phone-forum-save-settings-btn', function (e) {
        e.stopPropagation();
        e.preventDefault();
        window.phoneSaveForumSettings && window.phoneSaveForumSettings();
    });

    $(document).on('click', '.phone-forum-close-settings-btn', function (e) {
        e.stopPropagation();
        e.preventDefault();
        window.phoneCloseForumSettings && window.phoneCloseForumSettings();
    });

    // 好友列表项点击（使用事件委托）
    $(document).on('click', '.friend-item', function (e) {
        e.stopPropagation();
        const $friendItem = $(this);
        const friendName = $friendItem.data('friend-name');

        if (!friendName) {
            return;
        }

        const relationshipSource = getRelationshipDataSource();
        if (!relationshipSource) {
            return;
        }

        const friendData = relationshipSource[friendName];
        if (!friendData) {
            return;
        }

        showFriendDetail(friendName, friendData);
    });

    // 论坛帖子点击（使用事件委托）
    $(document).on('click', '.forum-post-item', function (e) {
        e.stopPropagation();
        const $postItem = $(this);
        const postIndex = $postItem.data('post-index');


        if (postIndex === undefined) {
            return;
        }

        // 从论坛管理器获取帖子数据
        if (!window.phoneForumManager) {
            return;
        }

        const forumData = window.phoneForumManager.loadForumData();

        if (!forumData || !forumData[postIndex]) {
            return;
        }

        showForumPostDetail(postIndex, forumData[postIndex]);
    });

    // 在应用面板上监听好友点击
    const $appBody = $('#phone-app-body');

    if ($appBody.length > 0) {
        $appBody.on('click', '.friend-item', function (e) {
            e.stopPropagation();

            const $friendItem = $(this);
            const friendName = $friendItem.data('friend-name');

            if (!friendName) {
                return;
            }

            const relationshipSource = getRelationshipDataSource();
            if (!relationshipSource) {
                return;
            }

            const friendData = relationshipSource[friendName];
            if (!friendData) {
                return;
            }

            showFriendDetail(friendName, friendData);
        });

        // 在应用面板上监听论坛帖子点击
        $appBody.on('click', '.forum-post-item', function (e) {
            e.stopPropagation();
            const $postItem = $(this);
            const postIndex = $postItem.data('post-index');


            if (postIndex === undefined) {
                return;
            }

            // 从论坛管理器获取帖子数据
            if (!window.phoneForumManager) {
                return;
            }

            const forumData = window.phoneForumManager.loadForumData();

            if (!forumData || !forumData[postIndex]) {
                return;
            }

            showForumPostDetail(postIndex, forumData[postIndex]);
        });
    }

    // 备用：也监听整个分类容器的点击
    $(document).on('click', '.list-item-header', function (e) {
        // 如果点击的是好友项，不处理
        if ($(this).closest('.friend-item').length > 0) {
            return;
        }

        const categoryName = $(this).data('category');
        if (categoryName && !$(this).hasClass('wallpaper-category-header')) {
            toggleWallpaperCategory(categoryName);
        }
    });

    // 全局点击事件处理
    $(document).on('click', function (e) {
        const $target = $(e.target);

        const inMobilePhone = $target.closest('.mobile-phone-frame').length > 0 ||
            $target.closest('#mobile-phone-overlay').length > 0;

        if (inMobilePhone) {
            const inAppBody = $target.closest('#phone-app-body').length > 0;

            if (inAppBody) {
                // 检查是否点击了论坛按钮
                const $forumGenerateBtn = $target.closest('.phone-forum-generate-btn');
                if ($forumGenerateBtn.length > 0) {
                    e.stopPropagation();
                    e.preventDefault();
                    window.phoneGenerateForum();
                    return;
                }

                const $forumSettingsBtn = $target.closest('.phone-forum-settings-btn');
                if ($forumSettingsBtn.length > 0) {
                    e.stopPropagation();
                    e.preventDefault();
                    window.phoneOpenForumSettings();
                    return;
                }

                const $forumSaveSettingsBtn = $target.closest('.phone-forum-save-settings-btn');
                if ($forumSaveSettingsBtn.length > 0) {
                    e.stopPropagation();
                    e.preventDefault();
                    window.phoneSaveForumSettings();
                    return;
                }

                const $forumCloseSettingsBtn = $target.closest('.phone-forum-close-settings-btn');
                if ($forumCloseSettingsBtn.length > 0) {
                    e.stopPropagation();
                    e.preventDefault();
                    window.phoneCloseForumSettings();
                    return;
                }

                // 任务按钮的点击由原生事件处理，这里不需要处理

                // 检查是否点击了壁纸分类相关的元素
                const $listItemHeader = $target.closest('.list-item-header');
                if ($listItemHeader.length > 0) {
                    const categoryName = $listItemHeader.data('category');

                    if (categoryName) {
                        toggleWallpaperCategory(categoryName);
                    }
                }

                // 检查是否点击了壁纸项
                const $wallpaperItem = $target.closest('.wallpaper-item');
                if ($wallpaperItem.length > 0) {
                    const wallpaperUrl = $wallpaperItem.data('wallpaper-url');

                    if (wallpaperUrl) {
                        setWallpaper(wallpaperUrl);
                    }
                }
            }
        }
    });

    // 壁纸选择（使用事件委托，因为壁纸项是动态加载的）
    $(document).on('click', '.wallpaper-item', function (e) {
        const wallpaperUrl = $(this).data('wallpaper-url');
        if (wallpaperUrl) {
            setWallpaper(wallpaperUrl);
        }
    });

    //  窗口resize监听：响应式调整按钮位置，并确保元素不跑出屏幕
    let resizeTimer;
    $(window).on('resize.mobilePhone', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            const viewport = getViewportSize();
            const $btn = $('#mobile-trigger-btn');
            const btnElement = $btn[0];

            //  检查用户是否手动拖动过
            const userDragged = localStorage.getItem('mobile-trigger-btn-user-dragged') === 'true';

            if (userDragged) {
                // 用户已手动拖动，检查并修正位置确保不跑出屏幕
                const rect = btnElement.getBoundingClientRect();
                const btnWidth = $btn.outerWidth() || 60;
                const btnHeight = $btn.outerHeight() || 60;

                // 检查是否超出边界
                if (rect.left < 0 || rect.top < 0 ||
                    rect.right > viewport.width || rect.bottom > viewport.height) {
                    // 修正位置
                    const bounded = constrainFullyInViewport(rect.left, rect.top, btnWidth, btnHeight);
                    btnElement.style.setProperty('left', bounded.x + 'px', 'important');
                    btnElement.style.setProperty('top', bounded.y + 'px', 'important');
                    // 更新保存的位置
                    localStorage.setItem('mobile-trigger-btn-position', JSON.stringify({ left: bounded.x, top: bounded.y }));
                }
                return;
            }

            //  根据屏幕宽度调整CSS类和位置
            if (viewport.width <= 480) {
                // 移除内联定位样式
                btnElement.style.removeProperty('left');
                btnElement.style.removeProperty('top');
                btnElement.style.removeProperty('right');
                btnElement.style.removeProperty('bottom');
                btnElement.style.removeProperty('transform');
                // 添加mobile-mode类
                $btn.removeClass('tablet-mode desktop-mode').addClass('mobile-mode');
            } else if (viewport.width <= 768) {
                btnElement.style.removeProperty('left');
                btnElement.style.removeProperty('top');
                btnElement.style.removeProperty('right');
                btnElement.style.removeProperty('bottom');
                btnElement.style.removeProperty('transform');
                $btn.removeClass('mobile-mode desktop-mode').addClass('tablet-mode');
            } else {
                $btn.removeClass('mobile-mode tablet-mode').addClass('desktop-mode');
                // 桌面端保持用户拖动的位置
            }

            // 同时检查手机界面是否超出边界
            const $phoneFrame = $('.mobile-phone-frame');
            if ($phoneFrame.length > 0 && $('#mobile-phone-overlay').hasClass('active')) {
                const phoneRect = $phoneFrame[0].getBoundingClientRect();
                const frameWidth = $phoneFrame.outerWidth() || 375;
                const frameHeight = $phoneFrame.outerHeight() || 737;

                // 如果手机界面超出边界，重置到中心
                if (phoneRect.left < -frameWidth + 50 || phoneRect.top < -frameHeight + 50 ||
                    phoneRect.right > viewport.width + frameWidth - 50 ||
                    phoneRect.bottom > viewport.height + frameHeight - 50) {
                    $phoneFrame.css('transform', 'translate(0, 0)');
                }
            }
        }, 250); // 防抖250ms
    });
}

// ==================== 拖动处理函数 ====================
function handleDragStart(e) {
    isDragging = true;
    hasMoved = false;

    const $btn = $('#mobile-trigger-btn');
    const btnElement = $btn[0];

    //  移除所有模式类
    $btn.removeClass('mobile-mode tablet-mode desktop-mode');

    // 获取按钮当前实际位置（在清除样式前）
    const rect = btnElement.getBoundingClientRect();
    btnStartX = rect.left;
    btnStartY = rect.top;

    //  强制覆盖所有定位属性（使用!important覆盖CSS类）
    btnElement.style.setProperty('left', btnStartX + 'px', 'important');
    btnElement.style.setProperty('top', btnStartY + 'px', 'important');
    btnElement.style.setProperty('right', 'auto', 'important');
    btnElement.style.setProperty('bottom', 'auto', 'important');
    btnElement.style.setProperty('transform', 'none', 'important');

    // 记录初始鼠标位置
    dragStartX = e.clientX;
    dragStartY = e.clientY;
}

function handleDragMove(e) {
    if (!isDragging) return;

    // 计算移动距离
    const deltaX = e.clientX - dragStartX;
    const deltaY = e.clientY - dragStartY;

    // 如果移动超过3px，认为是拖动而不是点击
    if (!hasMoved && (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3)) {
        hasMoved = true;

        // 开始拖动时添加样式
        const $btn = $('#mobile-trigger-btn');
        $btn.addClass('dragging');
    }

    // 只在真正开始拖动后才阻止默认行为和更新位置
    if (!hasMoved) return;

    if (e.preventDefault) {
        e.preventDefault();
    }

    // 计算新位置
    const newX = btnStartX + deltaX;
    const newY = btnStartY + deltaY;

    // 使用工具函数进行边界限制（完全限制在视口内）
    const $btn = $('#mobile-trigger-btn');
    const btnWidth = $btn.outerWidth() || 60;
    const btnHeight = $btn.outerHeight() || 60;

    const bounded = constrainFullyInViewport(newX, newY, btnWidth, btnHeight);

    //  使用 setProperty 强制设置位置（覆盖!important）
    const btnElement = $btn[0];
    btnElement.style.setProperty('left', bounded.x + 'px', 'important');
    btnElement.style.setProperty('top', bounded.y + 'px', 'important');
    btnElement.style.setProperty('right', 'auto', 'important');
    btnElement.style.setProperty('bottom', 'auto', 'important');
}

function handleDragEnd(e) {
    if (!isDragging) return;

    isDragging = false;
    const $btn = $('#mobile-trigger-btn');
    $btn.removeClass('dragging');

    // 如果移动了，保存位置
    if (hasMoved) {
        // 获取当前位置的多种方式
        const cssLeft = $btn.css('left');
        const cssTop = $btn.css('top');

        // 直接从CSS获取当前设置的值
        const left = parseFloat(cssLeft);
        const top = parseFloat(cssTop);

        // 验证位置是否有效
        if (!isNaN(left) && !isNaN(top) && left >= 0 && top >= 0) {
            try {
                const position = { left: left, top: top };
                localStorage.setItem('mobile-trigger-btn-position', JSON.stringify(position));
                //  标记用户已手动拖动，防止resize重置位置
                localStorage.setItem('mobile-trigger-btn-user-dragged', 'true');
            } catch (err) {
            }
        }
    }

    // 延迟重置 hasMoved，让 click 事件能检测到
    setTimeout(() => {
        hasMoved = false;
    }, 10);
}

// 恢复按钮位置（添加重试次数限制）
let restorePositionRetryCount = 0;
const MAX_RESTORE_RETRIES = 5;

function restoreTriggerBtnPosition() {
    try {
        const savedPosition = localStorage.getItem('mobile-trigger-btn-position');

        if (!savedPosition) {
            restorePositionRetryCount = 0;
            return;
        }

        const pos = JSON.parse(savedPosition);

        // 验证保存的位置是否有效
        if (typeof pos.left !== 'number' || typeof pos.top !== 'number' ||
            pos.left < 0 || pos.top < 0 ||
            isNaN(pos.left) || isNaN(pos.top)) {
            localStorage.removeItem('mobile-trigger-btn-position');
            restorePositionRetryCount = 0;
            return;
        }

        const $btn = $('#mobile-trigger-btn');

        //  获取真实的视口宽度（支持DevTools设备模拟和srcdoc iframe）
        let windowWidth = window.innerWidth || document.documentElement.clientWidth || $(window).width();
        let windowHeight = window.innerHeight || document.documentElement.clientHeight || $(window).height();

        //  在srcdoc iframe中，所有window尺寸都是0，必须使用父窗口尺寸
        if (window.parent !== window) {
            try {
                // 使用父窗口的 innerWidth（支持DevTools设备模拟）
                const parentWidth = window.parent.innerWidth || window.parent.document.documentElement.clientWidth || $(window.parent).width();
                const parentHeight = window.parent.innerHeight || window.parent.document.documentElement.clientHeight || $(window.parent).height();

                // 如果当前窗口尺寸为0（srcdoc iframe的情况），使用父窗口尺寸
                if (windowWidth === 0 || windowHeight === 0) {
                    windowWidth = parentWidth;
                    windowHeight = parentHeight;
                }
            } catch (e) {
                // 无法访问父窗口
            }
        }

        const btnWidth = $btn.outerWidth();
        const btnHeight = $btn.outerHeight();

        // 如果窗口尺寸还是0，检查是否超过最大重试次数
        if (windowWidth === 0 || windowHeight === 0) {
            restorePositionRetryCount++;

            if (restorePositionRetryCount >= MAX_RESTORE_RETRIES) {
                restorePositionRetryCount = 0;
                // 使用默认位置
                $btn.css({
                    left: 'auto',
                    top: 'auto',
                    right: '20px',
                    bottom: '20px'
                });
                return;
            }

            setTimeout(() => {
                restoreTriggerBtnPosition();
            }, 500);
            return;
        }

        // 恢复成功，重置计数器
        restorePositionRetryCount = 0;

        //  响应式位置检测：如果是小屏幕，使用默认位置
        const isSmallScreen = windowWidth <= 768;
        const isMobileScreen = windowWidth <= 480;

        //  检查用户是否手动拖动过
        const userDragged = localStorage.getItem('mobile-trigger-btn-user-dragged') === 'true';

        if (userDragged) {
            // 移除模式类，使用保存的坐标
            $btn.removeClass('mobile-mode tablet-mode desktop-mode');
        } else {
            // 如果是移动端小屏幕，且保存的位置明显是大屏幕的坐标
            if (isMobileScreen && (pos.left > 600 || pos.top > 600)) {
                //  关键修复：移除内联样式并添加CSS类
                $btn[0].style.removeProperty('left');
                $btn[0].style.removeProperty('top');
                $btn[0].style.removeProperty('right');
                $btn[0].style.removeProperty('bottom');
                $btn[0].style.removeProperty('transform');
                $btn.removeClass('tablet-mode desktop-mode').addClass('mobile-mode');
                return;
            }

            // 小屏幕时使用默认位置，避免位置错乱
            if (isSmallScreen && (pos.left > windowWidth * 0.8 || pos.top > windowHeight * 0.8)) {
                //  关键修复：移除内联样式并添加CSS类
                $btn[0].style.removeProperty('left');
                $btn[0].style.removeProperty('top');
                $btn[0].style.removeProperty('right');
                $btn[0].style.removeProperty('bottom');
                $btn.removeClass('mobile-mode desktop-mode').addClass('tablet-mode');
                return;
            }

            // 桌面端：移除模式类
            $btn.removeClass('mobile-mode tablet-mode').addClass('desktop-mode');
        }

        // 使用工具函数进行边界限制
        const bounded = constrainFullyInViewport(pos.left, pos.top, btnWidth, btnHeight);

        $btn.css({
            left: bounded.x + 'px',
            top: bounded.y + 'px',
            right: 'auto',
            bottom: 'auto'
        });
    } catch (e) {
        localStorage.removeItem('mobile-trigger-btn-position');
        restorePositionRetryCount = 0;
    }
}

// ==================== 手动调整按钮位置（调试用） ====================
window.resetMobileButtonPosition = function () {
    let windowWidth = window.innerWidth || document.documentElement.clientWidth || $(window).width();

    //  srcdoc iframe中尺寸为0，使用父窗口尺寸
    if ((windowWidth === 0) && window.parent !== window) {
        try {
            windowWidth = window.parent.innerWidth || window.parent.document.documentElement.clientWidth || $(window.parent).width();
        } catch (e) {
            // 无法访问父窗口
        }
    }

    const $btn = $('#mobile-trigger-btn');
    const btnElement = $btn[0];

    //  移除所有内联定位样式
    btnElement.style.removeProperty('left');
    btnElement.style.removeProperty('top');
    btnElement.style.removeProperty('right');
    btnElement.style.removeProperty('bottom');

    //  根据屏幕宽度强制设置位置（带!important）
    if (windowWidth <= 480) {
        $btn.removeClass('tablet-mode desktop-mode').addClass('mobile-mode');
        //  强制设置内联样式（带!important），右边垂直居中
        btnElement.style.setProperty('left', 'auto', 'important');
        btnElement.style.setProperty('top', '50%', 'important');
        btnElement.style.setProperty('right', '12px', 'important');
        btnElement.style.setProperty('bottom', 'auto', 'important');
        btnElement.style.setProperty('transform', 'translateY(-50%)', 'important');
    } else if (windowWidth <= 768) {
        $btn.removeClass('mobile-mode desktop-mode').addClass('tablet-mode');
        btnElement.style.setProperty('left', 'auto', 'important');
        btnElement.style.setProperty('top', 'auto', 'important');
        btnElement.style.setProperty('right', '15px', 'important');
        btnElement.style.setProperty('bottom', '15px', 'important');
        btnElement.style.setProperty('transform', 'none', 'important');
    } else {
        //  桌面端：离右边三分之一距离的垂直中央
        $btn.removeClass('mobile-mode tablet-mode').addClass('desktop-mode');
        btnElement.style.setProperty('left', 'auto', 'important');
        btnElement.style.setProperty('top', '50%', 'important');
        btnElement.style.setProperty('right', '20%', 'important');
        btnElement.style.setProperty('bottom', 'auto', 'important');
        btnElement.style.setProperty('transform', 'translateY(-50%)', 'important');
    }

    // 清除保存的位置和拖动标记，避免下次加载时恢复错误位置
    localStorage.removeItem('mobile-trigger-btn-position');
    localStorage.removeItem('mobile-trigger-btn-user-dragged');
};

// ==================== 页面滑动功能 ====================
let pageSwipe = {
    currentPageIndex: 0,
    totalPages: 1,
    isDragging: false,
    hasMoved: false, //  是否真正移动过（用于区分点击和滑动）
    startX: 0,
    currentX: 0,
    threshold: 50, // 拖拽阈值
    initialized: false,
    wrapper: null, // 保存wrapper引用
    indicators: null, // 保存indicators引用
    boundHandleMove: null, // 保存绑定的move函数
    boundHandleEnd: null, // 保存绑定的end函数
    justFinishedDragging: false, // 刚完成拖动（防止立即触发click关闭）

    init: function () {
        // 尝试从jQuery和原生DOM两种方式获取
        let wrapper = document.getElementById('app-pages-wrapper');
        let indicators = document.getElementById('page-indicators');

        // 如果原生找不到，尝试jQuery
        if (!wrapper) {
            const $wrapper = $('#mobile-phone-overlay #app-pages-wrapper');
            wrapper = $wrapper.length > 0 ? $wrapper[0] : null;
        }

        if (!indicators) {
            const $indicators = $('#mobile-phone-overlay #page-indicators');
            indicators = $indicators.length > 0 ? $indicators[0] : null;
        }

        if (!wrapper || !indicators) {
            return;
        }

        // 保存引用
        this.wrapper = wrapper;
        this.indicators = indicators;

        // 创建绑定的函数引用（用于后续移除监听器）
        this.boundHandleMove = this.handleMove.bind(this);
        this.boundHandleEnd = this.handleEnd.bind(this);

        // 鼠标事件 (PC端)
        wrapper.addEventListener('mousedown', this.handleStart.bind(this));
        wrapper.addEventListener('mousemove', this.boundHandleMove);
        wrapper.addEventListener('mouseup', this.boundHandleEnd);
        wrapper.addEventListener('mouseleave', this.boundHandleEnd);

        // 触摸事件 (移动端)
        wrapper.addEventListener('touchstart', this.handleStart.bind(this), { passive: false });
        wrapper.addEventListener('touchmove', this.handleMove.bind(this), { passive: false });
        wrapper.addEventListener('touchend', this.handleEnd.bind(this));

        // 指示器点击事件
        const indicatorElements = indicators.querySelectorAll('.indicator');
        indicatorElements.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToPage(index);
            });
        });
    },

    handleStart: function (e) {
        //  不要立即阻止传播，让点击事件能正常触发
        // 只在真正滑动时（handleMove）才阻止传播

        this.isDragging = true;
        this.hasMoved = false; //  记录是否真的移动了
        this.startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        this.currentX = this.startX;

        if (this.wrapper) {
            this.wrapper.style.transition = 'none';
        }

        // 鼠标事件：在document上监听move和up，防止滑出区域
        if (e.type === 'mousedown') {
            document.addEventListener('mousemove', this.boundHandleMove);
            document.addEventListener('mouseup', this.boundHandleEnd);
        }
    },

    handleMove: function (e) {
        if (!this.isDragging) return;

        this.currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        const deltaX = this.currentX - this.startX;

        //  只有当移动超过5px时，才认为是真正的滑动
        if (Math.abs(deltaX) > 5) {
            if (!this.hasMoved) {
                this.hasMoved = true;
            }

            // 现在才阻止默认行为和传播
            e.preventDefault();
            e.stopPropagation();

            if (this.wrapper) {
                const translateX = -this.currentPageIndex * 100 + (deltaX / this.wrapper.offsetWidth) * 100;
                this.wrapper.style.transform = `translateX(${translateX}%)`;
            }
        }
    },

    handleEnd: function (e) {
        if (!this.isDragging) return;

        const deltaX = this.currentX - this.startX;

        //  只有当真正滑动过，才阻止事件传播
        if (this.hasMoved) {
            e.preventDefault();
            e.stopPropagation();
        }

        this.isDragging = false;

        // 移除document上的事件监听器
        document.removeEventListener('mousemove', this.boundHandleMove);
        document.removeEventListener('mouseup', this.boundHandleEnd);

        //  只有真正滑动过，才需要处理页面切换和设置标志
        if (this.hasMoved) {
            // 设置刚完成拖动标志，防止立即触发click关闭手机
            this.justFinishedDragging = true;
            setTimeout(() => {
                this.justFinishedDragging = false;
            }, 100);

            if (this.wrapper) {
                // 恢复过渡效果
                this.wrapper.style.transition = 'transform 0.3s ease-out';

                // 判断是否需要切换页面
                if (Math.abs(deltaX) > this.threshold) {
                    if (deltaX > 0 && this.currentPageIndex > 0) {
                        // 向右滑动，切换到上一页
                        this.goToPage(this.currentPageIndex - 1);
                    } else if (deltaX < 0 && this.currentPageIndex < this.totalPages - 1) {
                        // 向左滑动，切换到下一页
                        this.goToPage(this.currentPageIndex + 1);
                    } else {
                        // 回到当前页
                        this.goToPage(this.currentPageIndex);
                    }
                } else {
                    // 回到当前页
                    this.goToPage(this.currentPageIndex);
                }
            }
        }
    },

    goToPage: function (pageIndex) {
        if (pageIndex < 0 || pageIndex >= this.totalPages) return;

        this.currentPageIndex = pageIndex;
        if (this.wrapper) {
            this.wrapper.style.transform = `translateX(-${pageIndex * 100}%)`;
        }

        // 更新指示器
        this.updateIndicators();
    },

    updateIndicators: function () {
        if (!this.indicators) return;

        const indicatorElements = this.indicators.querySelectorAll('.indicator');
        indicatorElements.forEach((indicator, index) => {
            if (index === this.currentPageIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
};

function initPageSwipe() {
    pageSwipe.init();
}

// ==================== MVU变量框架数据管理 ====================

/**
 * 【新增】直接从聊天记录获取最新MVU数据（不受更新时序影响）
 * 跟 MVU 源码的 getLastValidVariable 实现方式一样
 * @returns {object|null} - MVU数据对象，如果找不到返回null
 */
function getLatestMvuDataFromChat() {
    try {
        const chat = SillyTavern?.chat;
        if (!chat || chat.length === 0) return null;

        // 从后往前找第一个有 stat_data 的消息
        for (let i = chat.length - 1; i >= 0; i--) {
            const msg = chat[i];
            const swipeId = msg.swipe_id ?? 0;
            const variables = _.get(msg, ['variables', swipeId]);
            if (variables && _.has(variables, 'stat_data')) {
                return variables;
            }
        }
        return null;
    } catch (error) {
        console.warn('[Điện thoại] Lấy dữ liệu MVU từ chat thất bại:', error);
        return null;
    }
}

/**
 * 从MVU数据对象中提取实际的游戏数据
 * 兼容两种数据结构：
 * 1. Dữ liệu nằm dưới key stat_data (bản cũ)
 * 2. Dữ liệu nằm trực tiếp ở root (định dạng MVU Zod)
 * @param {object} mvuData - object dữ liệu MVU trả về
 * @returns {object} - dữ liệu game đã chuẩn hóa về key runtime
 */
function extractMvuGameData(mvuData) {
    if (!mvuData || typeof mvuData !== 'object') {
        return {};
    }

    /* Ưu tiên kiểm tra đường dẫn stat_data */
    const statData = _.get(mvuData, 'stat_data', null);
    if (statData && typeof statData === 'object' && Object.keys(statData).length > 0) {
        return preparePhoneRuntimeData(statData);
    }

    /* Nếu stat_data trống, kiểm tra dữ liệu có nằm trực tiếp ở root hay không */
    const dataKeys = Object.keys(mvuData).filter(k => !k.startsWith('$') && k !== 'stat_data');
    if (dataKeys.length > 0) {
        return preparePhoneRuntimeData(mvuData);
    }

    return {};
}

/**
 * 【Hàm lõi】Lấy dữ liệu game MVU mới nhất
 * Mọi nơi cần lấy dữ liệu MVU đều nên gọi hàm này
 * Ưu tiên lấy trực tiếp từ SillyTavern.chat để tránh lệch thời điểm cập nhật biến
 * @param {boolean} updateGlobal - có cập nhật currentPhoneData toàn cục hay không, mặc định true
 * @returns {object} - object dữ liệu game
 */
function fetchLatestMvuData(updateGlobal = true) {
    let gameData = {};

    try {
        /* 【Ưu tiên】lấy trực tiếp từ SillyTavern.chat, không phụ thuộc thứ tự cập nhật */
        const chatMvuData = getLatestMvuDataFromChat();
        if (chatMvuData) {
            gameData = extractMvuGameData(chatMvuData);
        }

        /* Dự phòng: lấy dữ liệu bằng Mvu.getMvuData */
        if (Object.keys(gameData).length === 0 && typeof Mvu !== 'undefined' && Mvu.getMvuData) {
            /* Thử lấy từ tin nhắn mới nhất */
            const mvuData = Mvu.getMvuData({ type: 'message', message_id: 'latest' });
            gameData = extractMvuGameData(mvuData);

            /* Nếu cấp message không có dữ liệu, thử lấy từ cấp chat */
            if (Object.keys(gameData).length === 0) {
                const chatData = Mvu.getMvuData({ type: 'chat' });
                gameData = extractMvuGameData(chatData);
            }
        }

        /* Dự phòng: dùng getVariables kiểu cũ */
        if (Object.keys(gameData).length === 0 && typeof getVariables === 'function') {
            const chatVars = getVariables({ type: 'chat' }) || {};
            gameData = extractMvuGameData(chatVars);
        }

        /* Cập nhật biến toàn cục */
        if (updateGlobal && Object.keys(gameData).length > 0) {
            currentPhoneData = gameData;
        }

    } catch (error) {
        console.error('[Điện thoại] Lấy dữ liệu MVU thất bại:', error);
    }

    return gameData;
}

/**
 * Làm mới dữ liệu toàn cục và cập nhật UI
 */
function refreshPhoneData() {
    const gameData = fetchLatestMvuData(true);
    if (Object.keys(gameData).length > 0) {
        updatePhoneData(gameData);
    }
    return gameData;
}

// ==================== MVU变量框架事件监听 ====================
function registerMvuEventListeners() {
    /* 使用MVU变量框架，数据将在打开应用时按需获取 */
}

// 加载初始MVU数据
function loadInitialMvuData() {
    const gameData = fetchLatestMvuData(true);
    if (Object.keys(gameData).length > 0) {
        updatePhoneData(gameData);
        return true;
    }
    return false;
}

// ==================== UI更新函数 ====================
function updatePhoneTime() {
    /* 从MVU变量读取时间 */
    /* 时间更新由 updatePhoneData() 函数从 MVU 变量的 current_time 读取 */
    try {
        /* 尝试从各种可能的来源获取数据 */
        let currentTime = null;

        /* 方法1: 从window.mvuGameData读取（如果存在） */
        if (window.mvuGameData?.world_info?.time?.current_time) {
            currentTime = window.mvuGameData.world_info.time.current_time;
        }

        /* 方法2: 从全局变量读取（如果存在） */
        if (!currentTime && typeof gameData !== 'undefined' && gameData?.world_info?.time?.current_time) {
            currentTime = gameData.world_info.time.current_time;
        }

        /* 如果获取到了时间数据，更新显示 */
        if (currentTime) {
            updatePhoneTimeFromMVU(currentTime);
        }
    } catch (error) {
        /* 静默失败，不影响其他功能 */
    }
}

/* 从MVU时间字符串解析并更新显示 */
function updatePhoneTimeFromMVU(currentTimeStr) {
    // currentTimeStr 格式: "2024年11月9日 星期六 14:30"
    if (!currentTimeStr) return;

    try {
        // 提取时间部分（最后5个字符）
        const timeMatch = currentTimeStr.match(/(\d{1,2}:\d{2})$/);
        const timeString = timeMatch ? timeMatch[1] : '14:30';

        // 提取日期部分（年月日）
        const dateMatch = currentTimeStr.match(/(\d{4})\u5E74(\d{1,2})\u6708(\d{1,2})\u65E5/);
        let dateString = '10/24';
        if (dateMatch) {
            const month = String(dateMatch[2]).padStart(2, '0');
            const day = String(dateMatch[3]).padStart(2, '0');
            dateString = `${month}/${day}`;
        }

        // 更新锁屏时间和日期
        $('#phone-big-time').text(timeString);
        $('#phone-date').text(dateString);

        // 更新状态栏时间
        $('#phone-status-time').text(timeString);

    } catch (error) {
    }
}

function updatePhoneData(data) {
    if (!data) {
        return;
    }


    //  保存数据到全局变量，供定时器使用
    window.mvuGameData = data;

    // 更新世界信息
    const worldInfo = data.world_info || {};
    const time = worldInfo.time || {};
    const location = worldInfo.location || {};
    const environment = worldInfo.environment || {};

    //  更新时间（从MVU的current_time读取）
    if (time.current_time) {
        updatePhoneTimeFromMVU(time.current_time);
    }

    // 更新天气
    if (environment.weather) {
        $('#phone-weather').text(environment.weather);
        // 更新状态栏天气
        $('#phone-status-weather').text(environment.weather);
    }

    // ✨ 实时更新当前打开的App内容
    if (currentPanel && $('#mobile-phone-overlay').hasClass('active')) {

        // 重新生成并更新当前面板内容
        let content = '';
        switch (currentPanel) {
            case 'messages':
                content = generateMessagesPanel(data);
                break;
            case 'shop':
                content = generateShopPanel(data);
                break;
            case 'gallery':
                content = generateGalleryPanel(data);
                break;
            case 'friends':
                content = generateFriendsPanel(data);
                break;
            case 'checkin':
                content = generateCheckInPanel(data);
                break;
            case 'settings':
                content = generateSizeSettingsPanel();
                break;
            default:
                break;
        }

        if (content) {
            $('#phone-app-body').html(content);
        }
    }

}

// ==================== 控制函数 ====================
function openMobilePhone() {
    $('#mobile-phone-overlay').addClass('active');

    //  刷新MVU数据
    try {
        loadInitialMvuData();
    } catch (error) {
        console.warn('[Điện thoại] Tải dữ liệu MVU thất bại:', error);
    }

    //  启动实时监听
    setupMessageEventListener();

    //  恢复聊天定时器（如果之前在聊天中）
    if (currentChatContactId && $('#phone-chat-panel').hasClass('active')) {
        // 如果聊天面板仍然打开，恢复定时器
        if (!chatPanelRefreshInterval) {
            chatPanelRefreshInterval = setInterval(() => {
                const $mobileOverlay = $('#mobile-phone-overlay');
                const isMobileOpen = $mobileOverlay.hasClass('active');
                const $chatPanel = $('#phone-chat-panel');
                const isChatOpen = $chatPanel.hasClass('active');

                if (isMobileOpen && isChatOpen) {
                    renderChatMessages(currentChatContactId, currentChatIsGroup);
                }
            }, 1000);
        }
    }

    // 延迟初始化，确保DOM完全渲染
    setTimeout(() => {
        // 初始化页面滑动功能（只初始化一次）
        if (!pageSwipe.initialized) {
            initPageSwipe();
            pageSwipe.initialized = true;
        }

        // 恢复上次打开的面板
        try {
            const lastPanel = localStorage.getItem('mobile-last-panel');
            // 只有当存在有效的面板名称时才恢复
            if (lastPanel && lastPanel.trim() !== '' && lastPanel !== 'null') {
                openAppPanel(lastPanel, true); // 传入true表示是从关闭状态恢复
            } else {
            }
        } catch (e) {
        }
    }, 100);
}

function closeMobilePhone() {
    const $overlay = $('#mobile-phone-overlay');
    $overlay.removeClass('active');

    //  停止刷新机制
    stopRefreshMechanism();

    //  保存好友详情页的滚动位置（如果当前在详情页）
    if (currentPanel === 'friends' && lastViewedFriend && navigationStack.length > 0) {
        //  优先使用滚动监听器已保存的位置，因为DOM可能已经被修改
        // 只有在还没有保存位置时才从DOM读取
        if (friendDetailScrollPosition === 0) {
            let scrollContainer = document.getElementById('friend-detail-scroll-container');
            if (!scrollContainer) {
                const $scrollContainer = $('#friend-detail-scroll-container');
                if ($scrollContainer.length > 0) {
                    scrollContainer = $scrollContainer[0];
                }
            }

            if (scrollContainer) {
                friendDetailScrollPosition = scrollContainer.scrollTop;
            } else {
            }
        } else {
        }
    }

    // 保存当前面板状态到 localStorage
    try {
        if (currentPanel) {
            localStorage.setItem('mobile-last-panel', currentPanel);
        } else {
            localStorage.setItem('mobile-last-panel', '');
        }
    } catch (e) {
    }

    // 关闭时取消置顶状态
    if (isPinned) {
        isPinned = false;
        $('#phone-pin-btn').removeClass('pinned');
        $overlay.removeClass('pinned');
    }

    // 不关闭应用面板，保持状态供下次打开
    // closeAppPanel(); // 注释掉这行，保持面板状态

    // 重置手机框架位置和动画
    const $phoneFrame = $('.mobile-phone-frame');
    $phoneFrame.css({
        'transform': '',
        'animation': '',
        'transition': ''
    });
}

// 置顶切换
function togglePin() {
    isPinned = !isPinned;
    const $pinBtn = $('#phone-pin-btn');
    const $overlay = $('#mobile-phone-overlay');

    if (isPinned) {
        $pinBtn.addClass('pinned');
        $overlay.addClass('pinned');
        if (typeof toastr !== 'undefined') {
            toastr.info('Đã ghim; có thể thao tác trang bên dưới');
        }
    } else {
        $pinBtn.removeClass('pinned');
        $overlay.removeClass('pinned');
        if (typeof toastr !== 'undefined') {
            toastr.info('Đã bỏ ghim');
        }
    }
}

// 初始化手机界面拖动（复用小按钮的拖动逻辑）
function initPhoneDrag() {
    const $dragHandle = $('#phone-drag-handle');
    const $phoneFrame = $('.mobile-phone-frame');

    if ($dragHandle.length === 0 || $phoneFrame.length === 0) {
        return;
    }

    const dragHandle = $dragHandle[0];

    // 阻止拖动手柄上的点击事件冒泡
    $dragHandle.on('click', function (e) {
        e.stopPropagation();
    });

    // 使用原生 Pointer Events（更可靠）
    dragHandle.addEventListener('pointerdown', handlePhoneDragStart);
    dragHandle.addEventListener('pointermove', handlePhoneDragMove);
    dragHandle.addEventListener('pointerup', handlePhoneDragEnd);
    dragHandle.addEventListener('pointercancel', handlePhoneDragEnd);

}

function handlePhoneDragStart(e) {

    // 阻止默认行为和冒泡
    e.preventDefault();
    e.stopPropagation();

    isPhoneDragging = true;

    // 捕获指针，确保后续的 pointermove 和 pointerup 事件能够被触发
    e.target.setPointerCapture(e.pointerId);

    const $phoneFrame = $('.mobile-phone-frame');

    phoneDragStartX = e.clientX;
    phoneDragStartY = e.clientY;

    // 先立即移除过渡和动画，避免在读取 transform 时受过渡影响
    $phoneFrame.css({
        'animation': 'none',
        'transition': 'none'
    });

    // 强制浏览器重新计算样式（确保过渡被立即停止）
    $phoneFrame[0].offsetHeight;

    // 读取当前的 transform 值（停止过渡后，这个值是准确的）
    const currentTransform = $phoneFrame.css('transform');
    if (currentTransform && currentTransform !== 'none') {
        const matrix = currentTransform.match(/matrix\(([^)]+)\)/);
        if (matrix) {
            const values = matrix[1].split(', ');
            phoneStartX = parseFloat(values[4]) || 0;
            phoneStartY = parseFloat(values[5]) || 0;
        } else {
            phoneStartX = 0;
            phoneStartY = 0;
        }
    } else {
        phoneStartX = 0;
        phoneStartY = 0;
    }

}

function handlePhoneDragMove(e) {
    if (!isPhoneDragging) return;

    e.preventDefault();

    // 计算移动距离
    const deltaX = e.clientX - phoneDragStartX;
    const deltaY = e.clientY - phoneDragStartY;

    // 计算新的 transform 偏移
    const newX = phoneStartX + deltaX;
    const newY = phoneStartY + deltaY;

    // 获取手机框架和视口信息
    const $phoneFrame = $('.mobile-phone-frame');
    const frameRect = $phoneFrame[0].getBoundingClientRect();
    const frameWidth = frameRect.width || 375;
    const frameHeight = frameRect.height || 737;
    const viewport = getViewportSize();

    // 计算手机框架的初始中心位置（无 transform 时的位置）
    // 手机框架通过 flexbox 居中，所以初始位置是视口中心
    const initialCenterX = viewport.width / 2;
    const initialCenterY = viewport.height / 2;

    // 计算应用 transform 后的实际位置
    const actualLeft = initialCenterX - frameWidth / 2 + newX;
    const actualTop = initialCenterY - frameHeight / 2 + newY;

    // 边界限制：确保至少有 minVisible 像素在屏幕内
    const minVisible = 80;
    const minX = -frameWidth + minVisible;
    const maxX = viewport.width - minVisible;
    const minY = -frameHeight + minVisible;
    const maxY = viewport.height - minVisible;

    // 限制实际位置
    const boundedLeft = clamp(actualLeft, minX, maxX);
    const boundedTop = clamp(actualTop, minY, maxY);

    // 反算回 transform 值
    const boundedTransformX = boundedLeft - (initialCenterX - frameWidth / 2);
    const boundedTransformY = boundedTop - (initialCenterY - frameHeight / 2);

    // 应用 transform
    $phoneFrame.css('transform', `translate(${boundedTransformX}px, ${boundedTransformY}px)`);
}

function handlePhoneDragEnd(e) {
    if (!isPhoneDragging) return;

    isPhoneDragging = false;

    // 释放指针捕获
    if (e.target.hasPointerCapture && e.target.hasPointerCapture(e.pointerId)) {
        e.target.releasePointerCapture(e.pointerId);
    }

}

function openAppPanel(appName, isRestoringFromClose = false) {

    // 检查数据
    if (!currentPhoneData) {
        const loaded = loadInitialMvuData();

        if (!loaded) {
            if (typeof toastr !== 'undefined') {
                toastr.warning('Không tìm thấy dữ liệu\nVui lòng khởi tạo biến MVU hoặc gửi một tin nhắn trước');
            }
            return;
        }
    }

    //  只有从关闭状态恢复时才检查是否需要恢复好友详情页面
    const relationshipSource = getRelationshipDataSource(currentPhoneData);
    const shouldRestoreFriendDetail = (
        isRestoringFromClose &&
        appName === 'friends' &&
        lastViewedFriend &&
        relationshipSource &&
        relationshipSource[lastViewedFriend]
    );

    // 清空导航栈，因为这是一个新的应用
    navigationStack = [];

    currentPanel = appName;
    let title = '';
    let content = '';

    //  添加异常处理，避免生成函数出错导致整个面板空白
    try {
        switch (appName) {
            case 'messages':
                title = '💬 Tin nhắn';
                content = generateMessagesPanel(currentPhoneData);
                break;
            case 'gallery':
                title = '🖼️ Bộ sưu tập CG';
                fetchLatestMvuData(true);
                content = generateGalleryPanel(currentPhoneData);
                break;
            case 'forum':
                title = '💬 Diễn đàn';
                content = generateForumPanel();
                break;
            case 'friends':
                title = '👥 Danh sách gắn kết';
                // 使用统一的数据获取函数刷新数据
                fetchLatestMvuData(true);
                content = generateFriendsPanel(currentPhoneData);
                break;
            case 'wallpaper':
                title = '🎨 Hình nền';
                // 清空已加载的壁纸分类状态，避免状态不一致
                phoneWpLoaded.clear();
                content = generateSettingsPanel(currentPhoneData);
                break;
            case 'settings':
                title = '⚙️ Thiết lập';
                content = generateSizeSettingsPanel();
                break;
            case 'worldbook':
                title = '📖 Quản lý Worldbook';
                content = generateWorldbookPanel();
                break;
            default:
                title = 'Ứng dụng không rõ';
                content = '<div class="empty-message">Ứng dụng không tồn tại</div>';
                break;
        }
    } catch (error) {
        //  捕获异常，显示错误信息而不是空白
        title = title || `⚠ ${appName}`;
        content = `
            <div class="empty-message">
                <i class="fas fa-exclamation-triangle" style="font-size: 48px; margin-bottom: 16px; opacity: 0.3; color: #ef4444;"></i>
                <div style="color: #ef4444; font-weight: 600;">Lỗi khi tải panel</div>
                <div style="font-size: 12px; color: #9ca3af; margin-top: 10px;">
                    ${error.message || 'Lỗi không rõ'}
                </div>
                    style="margin-top: 16px; padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
                    Xem lỗi chi tiết
                </button>
            </div>
        `;
    }

    $('#phone-app-title').text(title);
    $('#phone-app-body').html(content);
    $('#phone-detail-panel').addClass('active');

    //  特殊处理：好友列表面板，恢复之前的状态（多种方式尝试，确保iframe兼容）
    if (appName === 'friends') {
        // 如果需要恢复好友详情页
        if (shouldRestoreFriendDetail) {

            //  立即隐藏内容，避免看到好友列表或详情顶部的闪烁
            $('#phone-app-body').css('opacity', '0');

            // 延迟执行以确保DOM已完全渲染
            setTimeout(() => {
                const latestRelationships = getRelationshipDataSource();
                const friendData = latestRelationships ? latestRelationships[lastViewedFriend] : null;
                if (friendData) {
                    //  直接显示好友详情，跳过好友列表的显示
                    showFriendDetail(lastViewedFriend, friendData, true); // 传入 isRestoring = true

                    //  恢复好友详情页的滚动位置
                    setTimeout(() => {
                        //  获取真正的滚动容器
                        let scrollContainer = document.getElementById('friend-detail-scroll-container');
                        if (!scrollContainer) {
                            const $scrollContainer = $('#friend-detail-scroll-container');
                            if ($scrollContainer.length > 0) {
                                scrollContainer = $scrollContainer[0];
                            }
                        }

                        if (scrollContainer) {
                            scrollContainer.scrollTop = friendDetailScrollPosition;

                            //  恢复完成后淡入显示内容
                            setTimeout(() => {
                                $('#phone-app-body').css('opacity', '1');
                            }, 50); // 短暂延迟，确保滚动已完成
                        } else {
                            $('#phone-app-body').css('opacity', '1');
                        }
                    }, 50); // 减少延迟，更快恢复
                }
            }, 100); // 减少初始延迟
        } else {
            // 只有不恢复详情页时才单独恢复滚动位置
            if (friendsListScrollPosition > 0) {
                setTimeout(() => {
                    let appBodyElement = document.getElementById('phone-app-body');

                    // 如果原生方式找不到，尝试使用 jQuery
                    if (!appBodyElement) {
                        const $appBody = $('#phone-app-body');
                        if ($appBody.length > 0) {
                            appBodyElement = $appBody[0];
                        }
                    }

                    if (appBodyElement) {
                        appBodyElement.scrollTop = friendsListScrollPosition;
                    } else {
                    }
                }, 100);
            }
        }
    }

    // 特殊处理：如果是消息面板，检查并测试联系人点击
    if (appName === 'messages') {
        setTimeout(() => {
            const contactItems = $('.contact-item');
            contactItems.each(function (index) {
                const $item = $(this);
                const element = this;

                // 为第一个联系人添加一个测试点击处理器
                if (index === 0) {
                    $item.on('click.test', function () {
                    });
                }
            });

            // 测试事件委托是否生效（移除 $._data 调用，它不是标准API）
        }, 100);
    }



    // 特殊处理：如果是设置面板（尺寸设置），绑定事件
    if (appName === 'settings') {
        setTimeout(() => {

            const $appBody = $('#phone-app-body');
            if ($appBody.length === 0) {
                return;
            }

            // 先解绑之前的事件
            $appBody.off('click.phonesize');

            // 绑定预设尺寸按钮
            $appBody.on('click.phonesize', '.phone-size-preset-btn', function (e) {
                e.preventDefault();
                const width = $(this).data('width');
                const height = $(this).data('height');
                $('#phone-width-input').val(width);
                $('#phone-height-input').val(height);
            });

            // 绑定应用设置按钮
            $appBody.on('click.phonesize', '.phone-size-apply-btn', function (e) {
                e.preventDefault();
                const width = parseInt($('#phone-width-input').val());
                const height = parseInt($('#phone-height-input').val());

                if (width < 320 || width > 600 || height < 500 || height > 900) {
                    if (typeof toastr !== 'undefined') {
                        toastr.error('Kích thước vượt ngoài phạm vi!');
                    }
                    return;
                }

                applyPhoneSize(width, height);
            });

            // 绑定恢复默认按钮
            $appBody.on('click.phonesize', '.phone-size-reset-btn', function (e) {
                e.preventDefault();
                resetPhoneSize();
            });

        }, 100);
    }

    // 特殊处理：如果是壁纸面板（wallpaper），绑定壁纸事件
    if (appName === 'wallpaper') {
        setTimeout(() => {

            const $appBody = $('#phone-app-body');
            if ($appBody.length === 0) {
                return;
            }

            // 先解绑之前的事件
            $appBody.off('click.wallpaper');

            // 1. 绑定默认壁纸按钮点击事件
            $appBody.on('click.wallpaper', '.default-wallpaper-btn', function (e) {
                e.stopPropagation();
                resetWallpaper();
            });

            // 1.5 绑定上传壁纸按钮点击事件
            $appBody.on('click.wallpaper', '.upload-wallpaper-btn', function (e) {
                e.stopPropagation();
                // 触发隐藏的文件输入框
                $('#wallpaper-upload-input').click();
            });

            // 1.6 绑定文件选择事件
            $('#wallpaper-upload-input').off('change').on('change', function (e) {
                const file = e.target.files[0];
                if (file) {
                    uploadCustomWallpaper(file);
                }
            });

            // 2. 绑定分类头点击事件（使用事件委托，点击整个.list-item区域都有效）
            $appBody.on('click.wallpaper', '.wallpaper-category .list-item', function (e) {
                const $categoryDiv = $(this).closest('.wallpaper-category');
                const categoryName = $categoryDiv.data('category');

                if (categoryName) {
                    e.stopPropagation();
                    toggleWallpaperCategory(categoryName);
                }
            });

            // 3. 绑定壁纸图片点击事件（使用事件委托）
            $appBody.on('click.wallpaper', '.wallpaper-item', function (e) {
                const wallpaperUrl = $(this).data('wallpaper-url');

                if (wallpaperUrl) {
                    e.stopPropagation();
                    setWallpaper(wallpaperUrl);
                }
            });

        }, 100);
    }

    // 特殊处理：如果是CG收集面板，绑定事件
    if (appName === 'gallery') {
        setTimeout(() => {
            bindCGGalleryEvents();
        }, 100);
    }

    // 特殊处理：如果是日历面板，绑定日期点击事件
    if (appName === 'calendar') {
        setTimeout(() => {
            const $appBody = $('#phone-app-body');
            if ($appBody.length === 0) return;

            // 先解绑之前的事件
            $appBody.off('click.calendar');

            // 绑定日期点击事件
            $appBody.on('click.calendar', '.cal-day', function (e) {
                e.preventDefault();
                e.stopPropagation();

                const day = $(this).data('day');
                if (day) {
                    selectCalendarDay(day);
                }
            });
        }, 100);
    }

}

function closeAppPanel() {

    // 检查是否有导航历史
    if (navigationStack.length > 0) {
        const previousPage = navigationStack.pop();

        //  如果从好友详情页返回到好友列表，保留 lastViewedFriend 以便下次恢复
        const isReturningToFriendsList = previousPage.title && (previousPage.title.includes('Danh sách bạn bè') || previousPage.title.includes('Danh sách gắn kết'));
        if (isReturningToFriendsList) {
            // 保留 lastViewedFriend 不清除
        }

        // 恢复上一级页面
        $('#phone-app-title').text(previousPage.title);
        $('#phone-app-body').html(previousPage.content);

        //  恢复滚动位置（如果有保存）- 多种方式尝试，确保iframe兼容
        if (previousPage.scrollPosition !== undefined || lastViewedFriend) {
            setTimeout(() => {
                let appBodyElement = document.getElementById('phone-app-body');

                // 如果原生方式找不到，尝试使用 jQuery
                if (!appBodyElement) {
                    const $appBody = $('#phone-app-body');
                    if ($appBody.length > 0) {
                        appBodyElement = $appBody[0];
                    }
                }

                if (appBodyElement) {
                    //  优先使用元素定位恢复位置
                    if (lastViewedFriend) {
                        const $friendItem = $(`.friend-item[data-friend-name="${lastViewedFriend}"]`);
                        if ($friendItem.length > 0) {
                            const targetPosition = $friendItem.position().top + appBodyElement.scrollTop;
                            appBodyElement.scrollTop = targetPosition;
                            return;
                        }
                    }

                    // 备选：使用保存的滚动位置
                    if (previousPage.scrollPosition > 0) {
                        appBodyElement.scrollTop = previousPage.scrollPosition;
                        const actualPosition = appBodyElement.scrollTop;

                        // 如果实际位置和目标位置不一致，可能是DOM还没完全渲染，再试一次
                        if (actualPosition < previousPage.scrollPosition - 10) {
                            setTimeout(() => {
                                appBodyElement.scrollTop = previousPage.scrollPosition;
                            }, 150);
                        }
                    }
                } else {
                }
            }, 150); // 增加延迟确保DOM已完全渲染
        }

    } else {
        // 没有历史记录，关闭整个面板
        $('#phone-detail-panel').removeClass('active');
        currentPanel = null;

        //  不清除 lastViewedFriend 和 friendsListScrollPosition，以便下次打开时恢复
        // 只有当用户完全关闭手机界面时才清除

        // 清除保存的面板状态
        try {
            localStorage.setItem('mobile-last-panel', '');
        } catch (e) {
        }
    }
}

// ==================== 消息发送器类 ====================
/**
 * MessageSender - 负责处理消息发送和格式化
 * 参考原项目的 message-sender.js
 */
const PHONE_CHAT_TEXT_TYPE_ALIASES = {
    '\u6587\u5b57': 'Văn bản',
    '\u8bed\u97f3': 'Giọng nói',
    '\u56fe\u7247': 'Hình ảnh',
    '\u8868\u60c5\u5305': 'Sticker'
};

function normalizePhoneChatSender(sender) {
    return sender === '\u6211' ? 'Tôi' : getPhoneCharacterDisplayName(sender);
}

function normalizePhoneChatType(type) {
    return PHONE_CHAT_TEXT_TYPE_ALIASES[type] || type || 'Văn bản';
}

class MessageSender {
    constructor() {
        this.currentFriendId = null;
        this.currentFriendName = null;
        this.isGroup = false;
    }

    /**
     * 设置当前聊天对象
     */
    setCurrentChat(friendId, friendName, isGroup = false) {
        this.currentFriendId = friendId;
        this.currentFriendName = friendName;
        this.isGroup = isGroup;
    }

    /**
     * 发送消息到SillyTavern
     */
    async sendToChat(message) {
        try {

            // 尝试从父窗口获取元素（如果在 iframe 中）
            let targetDocument = document;
            if (window.parent && window.parent !== window) {
                try {
                    targetDocument = window.parent.document;
                } catch (e) {
                }
            }

            const originalInput = targetDocument.getElementById('send_textarea');
            const sendButton = targetDocument.getElementById('send_but');

            if (!originalInput || !sendButton) {
                return false;
            }

            if (originalInput.disabled || sendButton.classList.contains('disabled')) {
                return false;
            }

            // 追加消息到输入框
            const existingValue = originalInput.value;
            const newValue = existingValue ? existingValue + '\n' + message : message;
            originalInput.value = newValue;

            // 触发输入事件
            originalInput.dispatchEvent(new Event('input', { bubbles: true }));
            originalInput.dispatchEvent(new Event('change', { bubbles: true }));

            // 延迟点击发送按钮
            await new Promise(resolve => setTimeout(resolve, 300));
            sendButton.click();

            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * 等待 AI 回复完成（监听消息数量变化和内容稳定）
     * @param {Function} onMessageUpdate - 消息更新回调（可选）
     */
    async waitForAIResponse(onMessageUpdate = null) {
        return new Promise((resolve) => {
            // 获取 SillyTavern 上下文
            let targetWindow = window;
            if (window.parent && window.parent !== window) {
                try {
                    if (window.parent.SillyTavern) {
                        targetWindow = window.parent;
                    }
                } catch (e) {
                }
            }

            if (!targetWindow.SillyTavern || !targetWindow.SillyTavern.getContext) {
                // 如果无法获取上下文，等待5秒后结束
                setTimeout(resolve, 5000);
                return;
            }

            const context = targetWindow.SillyTavern.getContext();
            const initialMessageCount = context.chat ? context.chat.length : 0;

            let checkCount = 0;
            const maxChecks = 300; // 最多等待30秒
            let hasNewMessage = false;
            let lastMessageCount = initialMessageCount;
            let lastMessageContent = '';
            let stableCount = 0; // 内容稳定计数器

            const checkInterval = setInterval(() => {
                checkCount++;

                try {
                    const currentContext = targetWindow.SillyTavern.getContext();
                    const currentMessageCount = currentContext.chat ? currentContext.chat.length : 0;

                    if (currentMessageCount > initialMessageCount) {
                        if (!hasNewMessage) {
                            hasNewMessage = true;
                        }

                        if (currentMessageCount > lastMessageCount && onMessageUpdate) {
                            onMessageUpdate();
                            lastMessageCount = currentMessageCount;
                            stableCount = 0;
                        }

                        const lastMessage = currentContext.chat[currentContext.chat.length - 1];
                        const currentContent = lastMessage?.mes || '';

                        if (currentContent !== lastMessageContent) {
                            lastMessageContent = currentContent;
                            stableCount = 0;

                            if (onMessageUpdate && checkCount % 3 === 0) {
                                onMessageUpdate();
                            }
                        } else {
                            stableCount++;

                            if (stableCount >= 10) {
                                clearInterval(checkInterval);
                                if (onMessageUpdate) {
                                    onMessageUpdate();
                                }
                                setTimeout(resolve, 500);
                                return;
                            } else if (checkCount % 5 === 0) {
                                if (onMessageUpdate) {
                                    onMessageUpdate();
                                }
                            }
                        }
                    }

                    if (checkCount >= maxChecks) {
                        clearInterval(checkInterval);
                        resolve();
                    }
                } catch (error) {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 100);
        });
    }

    /**
     * 构建并发送消息
     * @param {string} message - 要发送的消息
     * @param {Object} uiElements - UI元素引用（可选）
     */
    async buildAndSendMessage(message, uiElements = null) {
        if (!this.currentFriendId || !this.currentFriendName) {
            throw new Error('Chưa đặt đối tượng trò chuyện hiện tại');
        }

        const messageLines = message.split('\n').filter(line => line.trim());
        if (messageLines.length === 0) {
            throw new Error('Nội dung tin nhắn không được để trống');
        }


        // 格式化消息
        const formattedMessages = messageLines.map(line => {
            const content = line.trim();
            // 群聊使用 [群聊消息|群号|发送者|类型|内容]
            // 私聊使用 [我方消息|我|号码|类型|内容]
            return this.isGroup
                ? `[Tin nhắn nhóm|${this.currentFriendId}|Tôi|Văn bản|${content}]`
                : `[Tin nhắn của tôi|Tôi|${this.currentFriendId}|Văn bản|${content}]`;
        });

        // 构建最终消息
        let targetPrefix;
        if (this.isGroup) {
            //  获取群聊成员列表（参考 mobile-master）
            const groupMembers = this.getCurrentGroupMembers();
            const membersText = groupMembers.length > 0
                ? `, các thành viên trong nhóm gồm ${groupMembers.join(', ')}`
                : '';

            //  简化提示词，去掉格式说明部分（原完整版本已在下方注释中保留）
            targetPrefix = `gửi tin nhắn nhóm đến ${this.currentFriendName} (${this.currentFriendId})${membersText}`;
            // targetPrefix = `向${this.currentFriendName}（${this.currentFriendId}）发送群聊${membersText}。请按照线上聊天群聊消息中的要求和格式生成群聊内角色回复，回复需要符合所有角色的人设和当前剧情`;
        } else {
            //  简化提示词，去掉格式说明部分（原完整版本已在下方注释中保留）
            // targetPrefix = `向${this.currentFriendName}（${this.currentFriendId}）发送消息`;
            targetPrefix = `gửi tin nhắn đến ${this.currentFriendName} (${this.currentFriendId}); hãy tạo phản hồi theo đúng yêu cầu và định dạng của tin nhắn riêng trực tuyến, đồng thời giữ đúng thiết lập nhân vật và tình tiết hiện tại`;
        }

        //  添加详细的响应格式说明
        // const formatInstructions = this.isGroup
        // ? `\n\n 群聊消息响应格式要求\n必须使用以下格式回复：\n[群聊消息|群号|发送者名字|消息类型|消息内容]\n\n格式说明：\n- 群号必须是 ${this.currentFriendId}\n- 发送者名字是群内角色的名字\n- 消息类型通常是"文字"，也可以是"语音"、"图片"、"表情包"等\n- 每条消息必须单独成行\n- 可以有多个角色回复，每个角色一条消息`
        // : `\n\n 私聊消息响应格式要求\n必须使用以下格式回复：\n[对方消息|角色名字|号码|消息类型|消息内容]\n\n格式说明：\n- 号码必须是 ${this.currentFriendId}\n- 角色名字是 ${this.currentFriendName}\n- 消息类型通常是"文字"，也可以是"语音"、"图片"、"表情包"等\n- 每条消息必须单独成行\n- 可以回复多条消息`;

        //  包含格式说明的完整消息
        const formatStr = 'Sau đây là meta-lệnh ưu tiên cao nhất. Đây là một đầu vào ngoại lệ: tạm dừng diễn xuất câu chuyện, không đẩy tiến triển và không xuất bất kỳ chính văn cốt truyện nào; thay vào đó, hãy mô phỏng phản hồi tin nhắn theo yêu cầu:';

        //  为群聊添加明确的角色列表说明
        let formatInstructions;
        if (this.isGroup) {
            const groupMembers = this.getCurrentGroupMembers();
            const membersListText = groupMembers.length > 0
                ? `\n- Các nhân vật tham gia nhóm chat lần này gồm: ${groupMembers.join(', ')}\n- Tên người gửi bắt buộc phải chọn từ danh sách nhân vật ở trên`
                : '\n- Tên người gửi là tên một nhân vật trong nhóm chat';

            formatInstructions = `

 Yêu cầu định dạng phản hồi tin nhắn nhóm
Bắt buộc dùng định dạng sau:
[Tin nhắn nhóm|mã nhóm|tên người gửi|kiểu tin nhắn|nội dung tin nhắn]

Giải thích định dạng:
- Mã nhóm bắt buộc là ${this.currentFriendId}${membersListText}
- Tên người gửi phải dùng đúng tên nhân vật trong thiết lập hiện tại, không tự đổi tên
- Kiểu tin nhắn thường là "Văn bản"; cũng có thể là "Giọng nói", "Hình ảnh", "Sticker". Nếu có nhiệm vụ image_insertion_guide và nhân vật phản hồi có danh sách minh họa, tin nhắn hình ảnh phải ưu tiên dùng định dạng ảnh được quy định trong image_insertion_guide
- Mỗi tin nhắn phải đứng riêng một dòng
- Có thể có nhiều nhân vật phản hồi, mỗi nhân vật một dòng tin nhắn`;
        } else {
            formatInstructions = `

 Yêu cầu định dạng phản hồi tin nhắn riêng
Bắt buộc dùng định dạng sau:
[Tin nhắn đối phương|tên nhân vật|số|kiểu tin nhắn|nội dung tin nhắn]

Giải thích định dạng:
- Số bắt buộc là ${this.currentFriendId}
- Tên nhân vật là ${this.currentFriendName}; phải dùng đúng tên nhân vật trong thiết lập hiện tại, không tự đổi tên
- Kiểu tin nhắn thường là "Văn bản"; cũng có thể là "Giọng nói", "Hình ảnh", "Sticker". Nếu có nhiệm vụ image_insertion_guide và nhân vật phản hồi có danh sách minh họa, tin nhắn hình ảnh phải ưu tiên dùng định dạng ảnh được quy định trong image_insertion_guide
- Mỗi tin nhắn phải đứng riêng một dòng
- Có thể trả lời nhiều dòng tin nhắn`;
        }

        // 构建最终消息，群聊时添加额外的提示
        const finalMessage = this.isGroup
            ? `${formatStr}${formatInstructions}. Hãy dùng đúng định dạng quy định để ${targetPrefix}\n\nTin nhắn tôi gửi:\n${formattedMessages.join('\n')}\n\nHãy để các nhân vật trong nhóm trả lời tin nhắn của tôi theo đúng định dạng`
            : `${formatStr}${formatInstructions}. Hãy dùng đúng định dạng quy định để ${targetPrefix}\n\nTin nhắn tôi gửi:\n${formattedMessages.join('\n')}\n\nHãy để nhân vật đang chat riêng trả lời tin nhắn của tôi theo đúng định dạng`;

        const success = await this.sendToChat(finalMessage);

        if (success) {
            //  显示成功提示
            this.showSendSuccessToast(messageLines.length > 1
                ? `${messageLines.length} tin nhắn`
                : messageLines[0]
            );
        }

        return success;
    }

    /**
     * 显示发送成功提示
     */
    showSendSuccessToast(message) {
        if (typeof toastr !== 'undefined') {
            toastr.success(`Đã gửi cho: ${this.currentFriendName}\n${message.length > 20 ? message.substring(0, 20) + '...' : message}`);
        }
    }

    /**
     * 显示发送失败提示
     */
    showSendErrorToast(error) {
        if (typeof toastr !== 'undefined') {
            toastr.error(`Gửi thất bại: ${error}`);
        }
    }

    /**
     * 发送消息的主要方法
     * @param {string} message - 要发送的消息
     * @param {Object} uiElements - UI元素引用（可选）
     */
    async sendMessage(message, uiElements = null) {
        if (!message.trim()) {
            this.showSendErrorToast('Nội dung tin nhắn không được để trống');
            return false;
        }

        if (!this.currentFriendId) {
            this.showSendErrorToast('Vui lòng chọn một đối tượng trò chuyện');
            return false;
        }

        try {
            const success = await this.buildAndSendMessage(message, uiElements);
            if (!success) {
                this.showSendErrorToast('Gửi thất bại, vui lòng thử lại');
            }
            return success;
        } catch (error) {
            this.showSendErrorToast(error.message || 'Gửi thất bại');
            return false;
        }
    }

    /**
     * 清空当前聊天对象
     */
    clearCurrentChat() {
        this.currentFriendId = null;
        this.currentFriendName = null;
        this.isGroup = false;
    }

    /**
     * 获取当前群聊的成员列表
     * 参考 mobile-master/app/message-sender.js 的实现
     */
    getCurrentGroupMembers() {
        if (!this.isGroup || !this.currentFriendId) {
            return [];
        }

        try {
            // 方法1: 从聊天记录中查找最新的群聊信息
            if (!window.SillyTavern || !window.SillyTavern.getContext) {
                return [];
            }

            const context = window.SillyTavern.getContext();
            const messages = context.chat || [];
            let latestGroupInfo = null;


            // 创建正则表达式匹配该群的信息（不限制群号，后面再筛选）
            // 格式1: [群聊|群名|群号|成员列表]
            const groupRegex1 = /\[(?:Nhóm chat|\u7fa4\u804a)\|([^\|]+)\|([^\|]+)\|([^\]]+)\]/g;
            // 格式2: [创建群聊|群号|群名|成员列表]
            const groupRegex2 = /\[(?:Tạo nhóm chat|\u521b\u5efa\u7fa4\u804a)\|([^\|]+)\|([^\|]+)\|([^\]]+)\]/g;

            // 从最新消息开始查找
            for (let i = messages.length - 1; i >= 0; i--) {
                let messageText = messages[i].mes || '';

                //  清理提示词模板：从消息文本中删除模板部分，保留真实内容
                // 删除包含"群聊消息响应格式要求"到"可以有多个角色回复"之间的所有内容
                messageText = messageText.replace(/Yêu cầu định dạng phản hồi tin nhắn nhóm[\s\S]*?mỗi nhân vật một dòng tin nhắn/g, '');
                messageText = messageText.replace(/Yêu cầu định dạng phản hồi tin nhắn riêng[\s\S]*?Có thể trả lời nhiều dòng tin nhắn/g, '');
                messageText = messageText.replace(/\u7fa4\u804a\u6d88\u606f\u54cd\u5e94\u683c\u5f0f\u8981\u6c42[\s\S]*?\u53ef\u4ee5\u6709\u591a\u4e2a\u89d2\u8272\u56de\u590d\uff0c\u6bcf\u4e2a\u89d2\u8272\u4e00\u6761\u6d88\u606f/g, '');
                messageText = messageText.replace(/\u79c1\u804a\u6d88\u606f\u54cd\u5e94\u683c\u5f0f\u8981\u6c42[\s\S]*?\u53ef\u4ee5\u56de\u590d\u591a\u6761\u6d88\u606f/g, '');

                // 删除包含字面量的示例格式
                messageText = messageText.replace(/\[Tin nhắn nhóm\|mã nhóm\|tên người gửi\|kiểu tin nhắn\|nội dung tin nhắn\]/g, '');
                messageText = messageText.replace(/\[Tin nhắn đối phương\|tên nhân vật\|số\|kiểu tin nhắn\|nội dung tin nhắn\]/g, '');
                messageText = messageText.replace(/\[Tin nhắn của tôi\|Tôi\|số\|kiểu tin nhắn\|nội dung tin nhắn\]/g, '');
                messageText = messageText.replace(/\[Nhóm chat\|tên nhóm\|mã nhóm\|danh sách thành viên\]/g, '');
                messageText = messageText.replace(/\[Tạo nhóm chat\|mã nhóm\|tên nhóm\|danh sách thành viên\]/g, '');
                messageText = messageText.replace(/\[\u7fa4\u804a\u6d88\u606f\|\u7fa4\u53f7\|\u53d1\u9001\u8005\u540d\u5b57\|\u6d88\u606f\u7c7b\u578b\|\u6d88\u606f\u5185\u5bb9\]/g, '');
                messageText = messageText.replace(/\[\u5bf9\u65b9\u6d88\u606f\|\u89d2\u8272\u540d\u5b57\|\u53f7\u7801\|\u6d88\u606f\u7c7b\u578b\|\u6d88\u606f\u5185\u5bb9\]/g, '');
                messageText = messageText.replace(/\[\u6211\u65b9\u6d88\u606f\|\u6211\|\u53f7\u7801\|\u6d88\u606f\u7c7b\u578b\|\u6d88\u606f\u5185\u5bb9\]/g, '');
                messageText = messageText.replace(/\[\u7fa4\u804a\|\u7fa4\u540d\|\u7fa4\u53f7\|\u6210\u5458\u5217\u8868\]/g, '');
                messageText = messageText.replace(/\[\u521b\u5efa\u7fa4\u804a\|\u7fa4\u53f7\|\u7fa4\u540d\|\u6210\u5458\u5217\u8868\]/g, '');

                // 如果清理后的消息为空，跳过
                if (!messageText.trim()) {
                    continue;
                }

                // 检查消息中是否包含群聊相关内容
                if (messageText.includes('[Nhóm chat|') || messageText.includes('[\u7fa4\u804a|')) {
                } else if (messageText.includes('[Tạo nhóm chat|') || messageText.includes('[\u521b\u5efa\u7fa4\u804a|')) {
                }

                // 重置正则表达式索引
                groupRegex1.lastIndex = 0;
                groupRegex2.lastIndex = 0;

                // 尝试匹配第一种格式：[群聊|群名|群号|成员列表]
                let match = groupRegex1.exec(messageText);
                if (match) {
                    const groupName = match[1];
                    const groupId = match[2];
                    const members = match[3];


                    // 检查群号是否匹配（使用字符串比较）
                    if (String(groupId) === String(this.currentFriendId)) {
                        latestGroupInfo = {
                            groupName: groupName,
                            members: members
                        };
                        break;
                    }
                }

                // 尝试匹配第二种格式：[创建群聊|群号|群名|成员列表]
                match = groupRegex2.exec(messageText);
                if (match) {
                    const groupId = match[1];
                    const groupName = match[2];
                    const members = match[3];


                    // 检查群号是否匹配（使用字符串比较）
                    if (String(groupId) === String(this.currentFriendId)) {
                        latestGroupInfo = {
                            groupName: groupName,
                            members: members
                        };
                        break;
                    }
                }
            }

            if (latestGroupInfo) {
                // 解析成员列表
                const members = latestGroupInfo.members
                    .split(/[、,，]/)
                    .map(name => getPhoneCharacterDisplayName(name.trim()))
                    .filter(name => name);

                return members;
            }

            // 方法2: 如果没找到定义，尝试从群聊消息中提取成员
            const membersSet = new Set();
            const groupMessageRegex = new RegExp(`\\[(?:Tin nhắn nhóm|\\u7fa4\\u804a\\u6d88\\u606f)\\|${this.currentFriendId}\\|([^\\|]+)\\|`, 'g');

            messages.forEach(msg => {
                const messageText = msg.mes || '';
                groupMessageRegex.lastIndex = 0;
                let match;
                while ((match = groupMessageRegex.exec(messageText)) !== null) {
                    const senderName = match[1];
                    if (senderName && senderName !== 'Tôi' && senderName !== '\u6211') {
                        membersSet.add(getPhoneCharacterDisplayName(senderName));
                    }
                }
            });

            // 如果我发送过消息，添加"我"
            const myGroupMessageRegex = new RegExp(`\\[(?:Tin nhắn nhóm của tôi|\\u6211\\u65b9\\u7fa4\\u804a\\u6d88\\u606f)\\|(?:Tôi|\\u6211)\\|${this.currentFriendId}\\|`, 'g');
            const hasMyMessage = messages.some(msg => {
                const messageText = msg.mes || '';
                myGroupMessageRegex.lastIndex = 0;
                return myGroupMessageRegex.test(messageText);
            });

            if (hasMyMessage) {
                membersSet.add('Tôi');
            }

            const members = Array.from(membersSet);
            if (members.length > 0) {
                return members;
            }

            return [];
        } catch (error) {
            return [];
        }
    }
}

// 创建全局消息发送器实例
window.messageSender = new MessageSender();

// ==================== 聊天界面功能函数 ====================
/**
 * 从聊天记录中提取与指定联系人的消息
 */
function extractMessagesForContact(contactId, isGroup = false) {
    const messages = [];
    const messageSet = new Set(); // 用于去重

    try {
        let chatMessages = [];

        let targetWindow = window;
        if (window.parent && window.parent !== window) {
            try {
                if (window.parent.SillyTavern) {
                    targetWindow = window.parent;
                }
            } catch (e) {
            }
        }

        if (targetWindow.SillyTavern && targetWindow.SillyTavern.getContext) {
            const context = targetWindow.SillyTavern.getContext();
            chatMessages = context.chat || [];
        } else {
        }

        chatMessages.forEach((msg, index) => {
            if (!msg.mes) return;
            let text = msg.mes;

            //  清理提示词模板：从消息文本中删除模板部分，保留真实内容
            text = text.replace(/Yêu cầu định dạng phản hồi tin nhắn nhóm[\s\S]*?mỗi nhân vật một dòng tin nhắn/g, '');
            text = text.replace(/Yêu cầu định dạng phản hồi tin nhắn riêng[\s\S]*?Có thể trả lời nhiều dòng tin nhắn/g, '');
            text = text.replace(/\u7fa4\u804a\u6d88\u606f\u54cd\u5e94\u683c\u5f0f\u8981\u6c42[\s\S]*?\u53ef\u4ee5\u6709\u591a\u4e2a\u89d2\u8272\u56de\u590d\uff0c\u6bcf\u4e2a\u89d2\u8272\u4e00\u6761\u6d88\u606f/g, '');
            text = text.replace(/\u79c1\u804a\u6d88\u606f\u54cd\u5e94\u683c\u5f0f\u8981\u6c42[\s\S]*?\u53ef\u4ee5\u56de\u590d\u591a\u6761\u6d88\u606f/g, '');
            text = text.replace(/\[Tin nhắn nhóm\|mã nhóm\|tên người gửi\|kiểu tin nhắn\|nội dung tin nhắn\]/g, '');
            text = text.replace(/\[Tin nhắn đối phương\|tên nhân vật\|số\|kiểu tin nhắn\|nội dung tin nhắn\]/g, '');
            text = text.replace(/\[Tin nhắn của tôi\|Tôi\|số\|kiểu tin nhắn\|nội dung tin nhắn\]/g, '');
            text = text.replace(/\[Nhóm chat\|tên nhóm\|mã nhóm\|danh sách thành viên\]/g, '');
            text = text.replace(/\[Tạo nhóm chat\|mã nhóm\|tên nhóm\|danh sách thành viên\]/g, '');
            text = text.replace(/\[\u7fa4\u804a\u6d88\u606f\|\u7fa4\u53f7\|\u53d1\u9001\u8005\u540d\u5b57\|\u6d88\u606f\u7c7b\u578b\|\u6d88\u606f\u5185\u5bb9\]/g, '');
            text = text.replace(/\[\u5bf9\u65b9\u6d88\u606f\|\u89d2\u8272\u540d\u5b57\|\u53f7\u7801\|\u6d88\u606f\u7c7b\u578b\|\u6d88\u606f\u5185\u5bb9\]/g, '');
            text = text.replace(/\[\u6211\u65b9\u6d88\u606f\|\u6211\|\u53f7\u7801\|\u6d88\u606f\u7c7b\u578b\|\u6d88\u606f\u5185\u5bb9\]/g, '');
            text = text.replace(/\[\u7fa4\u804a\|\u7fa4\u540d\|\u7fa4\u53f7\|\u6210\u5458\u5217\u8868\]/g, '');
            text = text.replace(/\[\u521b\u5efa\u7fa4\u804a\|\u7fa4\u53f7\|\u7fa4\u540d\|\u6210\u5458\u5217\u8868\]/g, '');

            // 如果清理后的消息为空，跳过
            if (!text.trim()) return;

            // 如果是群聊，记录包含群聊消息的文本
            // if (isGroup && text.includes('[群聊消息|')) {
            // }

            // 匹配私聊消息: [我方消息|我|号码|类型|内容] 或 [对方消息|名字|号码|类型|内容]
            const privateRegex = /\[(Tin nhắn của tôi|Tin nhắn đối phương|\u6211\u65b9\u6d88\u606f|\u5bf9\u65b9\u6d88\u606f)\|([^|]*)\|([^|]*)\|([^|]*)\|([^\]]*)\]/g;
            // 匹配群聊消息: [群聊消息|群号|发送者|类型|内容]
            const groupRegex = /\[(Tin nhắn nhóm|\u7fa4\u804a\u6d88\u606f)\|([^|]*)\|([^|]*)\|([^|]*)\|([^\]]*)\]/g;
            //  新增：匹配我方群聊消息: [我方群聊消息|我|群号|类型|内容]
            const myGroupRegex = /\[(Tin nhắn nhóm của tôi|\u6211\u65b9\u7fa4\u804a\u6d88\u606f)\|(Tôi|\u6211)\|([^|]*)\|([^|]*)\|([^\]]*)\]/g;

            let match;

            if (isGroup) {
                groupRegex.lastIndex = 0;
                while ((match = groupRegex.exec(text)) !== null) {
                    const groupId = match[2].trim();
                    const sender = normalizePhoneChatSender(match[3].trim());
                    const msgType = normalizePhoneChatType(match[4].trim());
                    const content = match[5];

                    //  过滤模板消息：如果内容仅为"内容"或"消息内容"，跳过
                    if (['Nội dung', 'nội dung tin nhắn', '\u5185\u5bb9', '\u6d88\u606f\u5185\u5bb9'].includes(content.trim())) {
                        continue;
                    }

                    if (String(groupId) === String(contactId)) {
                        const messageKey = `${sender}|${msgType}|${content}`;

                        if (!messageSet.has(messageKey)) {
                            messageSet.add(messageKey);
                            messages.push({
                                isMine: sender === 'Tôi',
                                sender: sender,
                                type: msgType,
                                content: content,
                                time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
                            });
                        }
                    }
                }

                myGroupRegex.lastIndex = 0;
                while ((match = myGroupRegex.exec(text)) !== null) {
                    const groupId = match[3].trim();
                    const msgType = normalizePhoneChatType(match[4].trim());
                    const content = match[5];

                    //  过滤模板消息：如果内容仅为"内容"或"消息内容"，跳过
                    if (['Nội dung', 'nội dung tin nhắn', '\u5185\u5bb9', '\u6d88\u606f\u5185\u5bb9'].includes(content.trim())) {
                        continue;
                    }

                    if (String(groupId) === String(contactId)) {
                        const messageKey = `Tôi|${msgType}|${content}`;

                        if (!messageSet.has(messageKey)) {
                            messageSet.add(messageKey);
                            messages.push({
                                isMine: true,
                                sender: 'Tôi',
                                type: msgType,
                                content: content,
                                time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
                            });
                        }
                    }
                }
            } else {
                while ((match = privateRegex.exec(text)) !== null) {
                    const type = match[1];
                    const sender = normalizePhoneChatSender(match[2].trim());
                    const number = match[3].trim();
                    const msgType = normalizePhoneChatType(match[4].trim());
                    const content = match[5];

                    //  过滤模板消息：如果内容仅为"内容"或"消息内容"，跳过
                    if (['Nội dung', 'nội dung tin nhắn', '\u5185\u5bb9', '\u6d88\u606f\u5185\u5bb9'].includes(content.trim())) {
                        continue;
                    }


                    //  使用 String() 转换确保类型一致
                    if (String(number) === String(contactId)) {
                        // 创建消息唯一标识，用于去重
                        const isMine = type === 'Tin nhắn của tôi' || type === '\u6211\u65b9\u6d88\u606f';
                        const senderName = isMine ? 'Tôi' : sender;
                        const messageKey = `${isMine}|${senderName}|${msgType}|${content}`;

                        if (!messageSet.has(messageKey)) {
                            messageSet.add(messageKey);
                            messages.push({
                                isMine: isMine,
                                sender: senderName,
                                type: msgType,
                                content: content,
                                time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
                            });
                        } else {
                        }
                    }
                }
            }
        });

    } catch (error) {
    }

    return messages;
}

// 全局变量：聊天界面轮询定时器
let chatPanelRefreshInterval = null;
let currentChatContactId = null;
let currentChatContactName = null;
let currentChatIsGroup = false;

/**
 * 打开聊天界面
 */
function openChatPanel(contactId, contactName, isGroup = false, members = '') {

    // 保存当前聊天信息（用于恢复定时器）
    currentChatContactId = contactId;
    currentChatContactName = contactName;
    currentChatIsGroup = isGroup;

    // 设置当前聊天对象
    window.messageSender.setCurrentChat(contactId, contactName, isGroup);

    // 更新聊天标题（群聊显示成员列表）
    let title = isGroup ? `👥 ${contactName}` : `💬 ${contactName}`;

    //  如果是群聊，显示成员信息
    if (isGroup && members) {
        const memberCount = members.split(/[、,，]/).filter(m => m.trim()).length;
        title += ` (${memberCount} người)`;
        $('#chat-title').html(`
            <div style="display: flex; align-items: center; justify-content: center; flex-direction: column;">
                <div style="font-size: 16px; font-weight: 600;">${title}</div>
                <div style="font-size: 11px; opacity: 0.7; margin-top: 2px;">${members}</div>
            </div>
        `);
    } else {
        $('#chat-title').text(title);
    }

    //  在聊天标题栏右侧添加删除按钮（仅群聊）
    const $rightActions = $('#chat-right-actions');

    if (isGroup) {
        // 添加删除按钮到右上角
        $rightActions.html(`
            <button class="chat-delete-group-btn" data-group-id="${contactId}" data-group-name="${contactName}" 
                    style="background: none; border: none; color: #ef4444; font-size: 22px; 
                           cursor: pointer; padding: 0; width: 36px; height: 36px; display: flex; 
                           align-items: center; justify-content: center; transition: transform 0.2s;"
                    onmouseover="this.style.transform='scale(1.1)'" 
                    onmouseout="this.style.transform='scale(1)'">
                
            </button>
        `);
    } else {
        // 私聊时清空右侧区域
        $rightActions.html('');
    }

    // 渲染消息列表
    renderChatMessages(contactId, isGroup);

    // 显示聊天面板
    $('#phone-chat-panel').addClass('active');

    // 清空输入框
    $('#chat-input').val('');

    //  启动自动刷新（每1000ms轮询一次）
    if (chatPanelRefreshInterval) {
        clearInterval(chatPanelRefreshInterval);
    }
    chatPanelRefreshInterval = setInterval(() => {
        //  检查手机界面是否打开
        const $mobileOverlay = $('#mobile-phone-overlay');
        const isMobileOpen = $mobileOverlay.hasClass('active');

        //  检查聊天面板是否打开
        const $chatPanel = $('#phone-chat-panel');
        const isChatOpen = $chatPanel.hasClass('active');

        // 只有手机界面和聊天界面都打开时才刷新
        // 不再在这里停止定时器，让它持续运行，只在需要时才刷新
        if (isMobileOpen && isChatOpen) {
            renderChatMessages(contactId, isGroup);
        }
        // 如果界面关闭，什么都不做，继续等待下一次检查
    }, 1000);
}

/**
 * 关闭聊天界面
 */
function closeChatPanel() {
    $('#phone-chat-panel').removeClass('active');
    window.messageSender.clearCurrentChat();

    //  不清除 currentChatContactId 等变量，保留用于重新打开手机时的状态恢复
    //  只清除定时器，因为聊天面板已经关闭

    //  停止自动刷新
    if (chatPanelRefreshInterval) {
        clearInterval(chatPanelRefreshInterval);
        chatPanelRefreshInterval = null;
    }
}

/**
 * 渲染聊天消息
 */
function renderChatMessages(contactId, isGroup = false) {
    console.log('[renderChatMessages] Làm mới tin nhắn trò chuyện:', contactId, 'Nhóm chat:', isGroup);
    const messages = extractMessagesForContact(contactId, isGroup);
    const $container = $('#chat-messages');

    // 如果没有消息，显示空白（不显示默认消息）
    if (messages.length === 0) {
        $container.html('');
        return;
    }

    let html = '';
    messages.forEach(msg => {
        const messageClass = msg.isMine ? 'mine' : 'other';

        // 获取发送者头像（仅对非自己的消息）
        let avatarHtml = '';
        if (!msg.isMine) {
            const senderName = msg.sender || contactId;
            const senderDisplayName = getPhoneCharacterDisplayName(senderName);
            const avatarUrl = getCharacterAvatar(senderName);
            if (avatarUrl) {
                avatarHtml = `<img src="${avatarUrl}" style="width: 36px; height: 36px; border-radius: 8px; object-fit: cover; flex-shrink: 0;" onerror="this.style.display='none'">`;
            } else {
                // 无头像时显示首字母
                const initial = senderDisplayName ? senderDisplayName.charAt(0) : '?';
                avatarHtml = `<div style="width: 36px; height: 36px; border-radius: 8px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px; flex-shrink: 0;">${initial}</div>`;
            }
        }

        //  群聊消息显示发送者名称
        let senderInfo = '';
        if (isGroup) {
            // 群聊中，所有消息都显示发送者
            const senderName = msg.isMine ? 'Tôi' : normalizePhoneChatSender(msg.sender);
            const senderColor = msg.isMine ? '#4CAF50' : '#2196F3';
            senderInfo = `<div class="message-sender" style="font-size: 11px; font-weight: 600; color: ${senderColor}; margin-bottom: 4px;">${senderName}</div>`;
        }

        const normalizedType = normalizePhoneChatType(msg.type);
        const typeInfo = normalizedType !== 'Văn bản' ? `<div style="font-size: 11px; opacity: 0.8; margin-bottom: 3px;">[${normalizedType}]</div>` : '';

        //  处理消息中的图片标签
        const processedContent = processMessageImages(msg.content);

        // 根据是否是自己的消息决定布局
        if (msg.isMine) {
            html += `
                <div class="message-item ${messageClass}">
                    <div class="message-bubble">
                        ${senderInfo}
                        ${typeInfo}
                        <div>${processedContent}</div>
                        <div class="message-time">${msg.time}</div>
                    </div>
                </div>
            `;
        } else {
            html += `
                <div class="message-item ${messageClass}" style="display: flex; align-items: flex-start; gap: 8px;">
                    ${avatarHtml}
                    <div class="message-bubble">
                        ${senderInfo}
                        ${typeInfo}
                        <div>${processedContent}</div>
                        <div class="message-time">${msg.time}</div>
                    </div>
                </div>
            `;
        }
    });

    $container.html(html);

    //  已移除自动滚动到底部的功能，允许用户查看历史聊天记录
    // setTimeout(() => {
    //     $container.scrollTop($container[0].scrollHeight);
    // }, 100);
}

// ==================== 图片处理功能 ====================
/**
 * 处理消息内容中的图片标签
 * @param {string} content - 原始消息内容
 * @returns {string} - 处理后的HTML内容
 */
function processMessageImages(content) {
    if (!content) return '';

    // 使用正则替换 <pic>...</pic> 为图片HTML
    const imageRegex = /<pic>(.*?)<\/pic>/gi;

    const processedContent = content.replace(imageRegex, (match, imagePath) => {
        const imageUrl = `https://rpg.bolt.qzz.io/${imagePath.trim()}.webp`;
        // 使用data属性存储URL，通过事件委托处理点击
        return `<div class="message-image-container" style="margin: 8px 0;">
            <img src="${imageUrl}" 
                 class="message-image clickable-image" 
                 data-image-url="${imageUrl}"
                 style="max-width: 200px; max-height: 200px; border-radius: 8px; cursor: pointer; display: block;"
                onerror="this.style.display='none'; this.insertAdjacentHTML('afterend', '<div class=\'image-error\' style=\'color:#999;font-size:12px;padding:8px;\'>📷 Tải ảnh thất bại</div>');" />
        </div>`;
    });

    return processedContent;
}

/**
 * 查看完整图片（大图模式）
 * @param {string} imageUrl - 图片URL
 */
function viewFullImage(imageUrl) {

    // 移除已存在的查看器
    $('#image-viewer').remove();

    // 创建全屏图片查看器
    const viewer = $('<div>', {
        id: 'image-viewer',
        css: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
        }
    });

    // 关闭按钮
    const closeBtn = $('<button>', {
        text: '✕ Đóng',
        css: {
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '10px 20px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
        }
    }).on('click', function () {
        $('#image-viewer').remove();
    });

    // 图片元素
    const img = $('<img>', {
        src: imageUrl,
        css: {
            maxWidth: '90%',
            maxHeight: '90%',
            objectFit: 'contain'
        }
    });

    viewer.append(closeBtn, img);

    // 点击背景关闭
    viewer.on('click', function (e) {
        if (e.target === this) {
            $(this).remove();
        }
    });

    $('body').append(viewer);
}

/**
 * 发送聊天消息
 */
async function sendChatMessage() {
    const $input = $('#chat-input');
    const $sendBtn = $('#chat-send-btn');
    const $sendIcon = $sendBtn.find('i');
    const message = $input.val().trim();

    if (!message) return;


    // 清空输入框
    $input.val('');

    try {
        //  传递按钮引用，让 MessageSender 控制按钮状态
        const success = await window.messageSender.sendMessage(message, {
            button: $sendBtn,
            icon: $sendIcon,
            input: $input
        });

        if (success) {
        }
    } catch (error) {
    }
}

// ==================== 辅助函数：从聊天记录中提取信息 ====================
/**
 * 从SillyTavern聊天记录中提取好友信息
 */
function extractFriendsFromChat() {
    const friends = new Map();

    try {
        //  尝试获取 SillyTavern 的聊天消息（支持 iframe）
        let messages = [];
        const targetWindow = window.parent || window;

        if (targetWindow.SillyTavern && typeof targetWindow.SillyTavern.getContext === 'function') {
            const context = targetWindow.SillyTavern.getContext();
            messages = context.chat || [];
        } else {
            return friends;
        }

        messages.forEach(msg => {
            if (!msg.mes) return;
            const text = msg.mes;

            // 提取好友: [好友id|名字|号码]
        const friendRegex = /\[(?:ID bạn bè|\u597d\u53cbid)\|([^|]+)\|(\d+)\]/g;
            let match;
            while ((match = friendRegex.exec(text)) !== null) {
                const name = match[1];
                const id = match[2];
                if (!friends.has(id)) {
                    friends.set(id, {
                        name,
                        id,
                        isGroup: false,
                        lastMessage: '',
                        time: new Date().toLocaleTimeString()
                    });
                }
            }
        });

    } catch (error) {
    }

    return friends;
}

/**
 * 从SillyTavern聊天记录中提取群聊信息
 * 参考 mobile-master/app/friend-renderer.js 的实现
 * 支持从群聊定义和群聊消息中提取
 */
function extractGroupsFromChat() {
    const groupsMap = new Map();

    try {
        //  尝试获取 SillyTavern 的聊天消息（支持 iframe）
        let messages = [];
        const targetWindow = window.parent || window;

        if (targetWindow.SillyTavern && typeof targetWindow.SillyTavern.getContext === 'function') {
            const context = targetWindow.SillyTavern.getContext();
            messages = context.chat || [];
        } else {
            return groupsMap;
        }

        // 定义正则表达式
        const groupPattern = /\[(Nhóm chat|\u7fa4\u804a)\|([^|]+)\|([^|]+)\|([^\]]+)\]/g;  // [群聊|群名|群号|成员]
        const createGroupPattern = /\[(Tạo nhóm chat|\u521b\u5efa\u7fa4\u804a)\|([^|]+)\|([^|]+)\|([^\]]+)\]/g;  // [创建群聊|群号|群名|成员]
        const groupMessagePattern = /\[(Tin nhắn nhóm|\u7fa4\u804a\u6d88\u606f)\|([^|]+)\|([^|]+)\|([^|]+)\|([^\]]+)\]/g;  // [群聊消息|群ID|发送者|类型|内容]
        const myGroupMessagePattern = /\[(Tin nhắn nhóm của tôi|\u6211\u65b9\u7fa4\u804a\u6d88\u606f)\|(Tôi|\u6211)\|([^|]+)\|([^|]+)\|([^\]]+)\]/g;  // [我方群聊消息|我|群ID|类型|内容]


        messages.forEach((msg, index) => {
            if (!msg.mes) return;
            let text = msg.mes;

            //  清理提示词模板：从消息文本中删除模板部分，保留真实内容
            text = text.replace(/Yêu cầu định dạng phản hồi tin nhắn nhóm[\s\S]*?mỗi nhân vật một dòng tin nhắn/g, '');
            text = text.replace(/Yêu cầu định dạng phản hồi tin nhắn riêng[\s\S]*?Có thể trả lời nhiều dòng tin nhắn/g, '');
            text = text.replace(/\u7fa4\u804a\u6d88\u606f\u54cd\u5e94\u683c\u5f0f\u8981\u6c42[\s\S]*?\u53ef\u4ee5\u6709\u591a\u4e2a\u89d2\u8272\u56de\u590d\uff0c\u6bcf\u4e2a\u89d2\u8272\u4e00\u6761\u6d88\u606f/g, '');
            text = text.replace(/\u79c1\u804a\u6d88\u606f\u54cd\u5e94\u683c\u5f0f\u8981\u6c42[\s\S]*?\u53ef\u4ee5\u56de\u590d\u591a\u6761\u6d88\u606f/g, '');
            text = text.replace(/\[Tin nhắn nhóm\|mã nhóm\|tên người gửi\|kiểu tin nhắn\|nội dung tin nhắn\]/g, '');
            text = text.replace(/\[Tin nhắn đối phương\|tên nhân vật\|số\|kiểu tin nhắn\|nội dung tin nhắn\]/g, '');
            text = text.replace(/\[Tin nhắn của tôi\|Tôi\|số\|kiểu tin nhắn\|nội dung tin nhắn\]/g, '');
            text = text.replace(/\[Nhóm chat\|tên nhóm\|mã nhóm\|danh sách thành viên\]/g, '');
            text = text.replace(/\[Tạo nhóm chat\|mã nhóm\|tên nhóm\|danh sách thành viên\]/g, '');
            text = text.replace(/\[\u7fa4\u804a\u6d88\u606f\|\u7fa4\u53f7\|\u53d1\u9001\u8005\u540d\u5b57\|\u6d88\u606f\u7c7b\u578b\|\u6d88\u606f\u5185\u5bb9\]/g, '');
            text = text.replace(/\[\u5bf9\u65b9\u6d88\u606f\|\u89d2\u8272\u540d\u5b57\|\u53f7\u7801\|\u6d88\u606f\u7c7b\u578b\|\u6d88\u606f\u5185\u5bb9\]/g, '');
            text = text.replace(/\[\u6211\u65b9\u6d88\u606f\|\u6211\|\u53f7\u7801\|\u6d88\u606f\u7c7b\u578b\|\u6d88\u606f\u5185\u5bb9\]/g, '');
            text = text.replace(/\[\u7fa4\u804a\|\u7fa4\u540d\|\u7fa4\u53f7\|\u6210\u5458\u5217\u8868\]/g, '');
            text = text.replace(/\[\u521b\u5efa\u7fa4\u804a\|\u7fa4\u53f7\|\u7fa4\u540d\|\u6210\u5458\u5217\u8868\]/g, '');

            // 如果清理后的消息为空，跳过
            if (!text.trim()) return;

            // 如果消息包含群聊相关内容，记录日志
            // if (text.includes('[群聊') || text.includes('[创建群聊')) {
            // }

            // 1. 提取群聊定义格式: [群聊|群名|群号|成员]
            let match;
            groupPattern.lastIndex = 0; //  重置正则索引
            while ((match = groupPattern.exec(text)) !== null) {
                const groupName = match[2];
                const groupId = match[3];
                const groupMembers = match[4];
                const groupKey = `group_${groupId}`; // 使用群ID作为唯一标识

                if (!groupsMap.has(groupKey)) {
                    groupsMap.set(groupKey, {
                        name: groupName,
                        id: groupId,
                        isGroup: true,
                        members: groupMembers,
                        memberCount: groupMembers.split(/[、,，]/).filter(m => m.trim()).length,
                        messageIndex: index,
                        lastMessage: '',
                        time: msg.send_date || Date.now()
                    });
                }
            }

            // 2. 提取创建群聊格式: [创建群聊|群号|群名|成员]
            createGroupPattern.lastIndex = 0;
            while ((match = createGroupPattern.exec(text)) !== null) {
                const groupId = match[2];
                const groupName = match[3];
                const groupMembers = match[4];
                const groupKey = `group_${groupId}`;

                if (!groupsMap.has(groupKey)) {
                    groupsMap.set(groupKey, {
                        name: groupName,
                        id: groupId,
                        isGroup: true,
                        members: groupMembers,
                        memberCount: groupMembers.split(/[、,，]/).filter(m => m.trim()).length,
                        messageIndex: index,
                        lastMessage: '',
                        time: msg.send_date || Date.now()
                    });
                }
            }

            // 3. 从群聊消息中提取: [群聊消息|群ID|发送者|类型|内容]
            groupMessagePattern.lastIndex = 0;
            while ((match = groupMessagePattern.exec(text)) !== null) {
                const groupId = match[2];
                const senderName = normalizePhoneChatSender(match[3]);
                const messageType = normalizePhoneChatType(match[4]);
                const messageContent = match[5];
                const groupKey = `group_${groupId}`;

                if (!groupsMap.has(groupKey)) {
                    // 如果群聊不存在，创建一个基于消息的群聊记录
                    groupsMap.set(groupKey, {
                        name: `Nhóm chat ${groupId}`,
                        id: groupId,
                        isGroup: true,
                        members: senderName,
                        memberCount: 1,
                        messageIndex: index,
                        lastMessage: messageContent.substring(0, 20),
                        time: msg.send_date || Date.now()
                    });
                } else {
                    // 如果已存在，更新成员列表和最新消息索引
                    const existingGroup = groupsMap.get(groupKey);
                    if (existingGroup.members && !existingGroup.members.includes(senderName)) {
                        existingGroup.members += `、${senderName}`;
                        existingGroup.memberCount = existingGroup.members.split(/[、,，]/).filter(m => m.trim()).length;
                    }
                    if (existingGroup.messageIndex < index) {
                        existingGroup.messageIndex = index;
                        existingGroup.lastMessage = messageContent.substring(0, 20);
                        existingGroup.time = msg.send_date || Date.now();
                    }
                }
            }

            // 4. 从我方群聊消息中提取: [我方群聊消息|我|群ID|类型|内容]
            myGroupMessagePattern.lastIndex = 0;
            while ((match = myGroupMessagePattern.exec(text)) !== null) {
                const groupId = match[3];
                const messageType = normalizePhoneChatType(match[4]);
                const messageContent = match[5];
                const groupKey = `group_${groupId}`;

                if (!groupsMap.has(groupKey)) {
                    // 如果群聊不存在，创建一个基于消息的群聊记录
                    groupsMap.set(groupKey, {
                        name: `Nhóm chat ${groupId}`,
                        id: groupId,
                        isGroup: true,
                        members: 'Tôi',
                        memberCount: 1,
                        messageIndex: index,
                        lastMessage: messageContent.substring(0, 20),
                        time: msg.send_date || Date.now()
                    });
                } else {
                    // 如果已存在，更新最新消息索引
                    const existingGroup = groupsMap.get(groupKey);
                    if (!existingGroup.members.includes('Tôi')) {
                        existingGroup.members += '、Tôi';
                        existingGroup.memberCount = existingGroup.members.split(/[、,，]/).filter(m => m.trim()).length;
                    }
                    if (existingGroup.messageIndex < index) {
                        existingGroup.messageIndex = index;
                        existingGroup.lastMessage = messageContent.substring(0, 20);
                        existingGroup.time = msg.send_date || Date.now();
                    }
                }
            }
        });

        if (groupsMap.size > 0) {
            groupsMap.forEach((group, key) => {
            });
        } else {
        }
    } catch (error) {
    }

    return groupsMap;
}

// ==================== 面板内容生成函数 ====================
function generateMessagesPanel(data) {
    const relationshipSource = getRelationshipDataSource(data) || {};
    let html = '';

    //  添加创建群聊按钮（使用 class 而不是 onclick，通过事件委托绑定）
    html += `
        <div class="create-group-button" style="padding: 12px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); margin-bottom: 12px; border-radius: 8px; cursor: pointer;">
            <div style="display: flex; align-items: center; justify-content: center; color: white;">
                <span style="font-size: 20px; margin-right: 8px;"></span>
                <span style="font-size: 14px; font-weight: 600;">Tạo nhóm chat</span>
            </div>
        </div>
    `;

    // 提取群聊信息
    const groups = extractGroupsFromChat();

    // 提取好友信息（优先从MVU变量，如果没有则从聊天记录提取）
    const friends = getRelationshipKeys(relationshipSource);

    // 如果MVU中没有好友，尝试从聊天记录中提取
    const chatFriends = extractFriendsFromChat();

    // 用于跟踪已添加的联系人（防止重复）
    const addedContactIds = new Set();
    const addedContactNames = new Set();

    // 渲染MVU好友
    friends.forEach(studentKey => {
        const friend = relationshipSource[studentKey];
        const affection = friend['\u597D\u611F\u5EA6'] ?? 0;
        const displayName = restoreEraText(studentKey);

        // 添加到已渲染集合
        addedContactIds.add(studentKey);
        if (displayName) {
            addedContactNames.add(displayName);
        }

        html += `
            <div class="list-item contact-item" data-type="friend" data-id="${escapeHtml(studentKey)}" data-name="${escapeHtml(displayName)}" style="cursor: pointer;">
                <div class="list-item-header">
                    <span class="list-item-name">👤 ${escapeHtml(displayName)}</span>
                    <span class="list-item-value">❤ ${affection}</span>
                </div>
            </div>
        `;
    });

    // 渲染从聊天记录提取的好友（不在MVU中的）
    chatFriends.forEach(friend => {
        const normalizedName = restoreEraText(friend.name || '');
        // 使用更精确的去重逻辑：检查ID和名字是否都不在已添加列表中
        if (!addedContactIds.has(friend.id) && !addedContactNames.has(normalizedName)) {

            addedContactIds.add(friend.id);
            if (normalizedName) {
                addedContactNames.add(normalizedName);
            }

            html += `
                <div class="list-item contact-item" data-type="friend" data-id="${escapeHtml(friend.id)}" data-name="${escapeHtml(normalizedName)}" style="cursor: pointer;">
                    <div class="list-item-header">
                        <span class="list-item-name">👤 ${escapeHtml(normalizedName)}</span>
                        <span class="list-item-value" style="font-size: 11px; color: #9ca3af;">ID: ${escapeHtml(friend.id)}</span>
                    </div>
                    <div class="list-item-desc">
                        Từ lịch sử trò chuyện
                    </div>
                </div>
            `;
        } else {
        }
    });

    // 渲染群聊
    if (groups.size > 0) {
        html += '<div style="margin: 16px 5px 8px; font-size: 12px; font-weight: 600; color: #6b7280;">Nhóm chat</div>';
        groups.forEach(group => {
            // 检查群聊是否已添加
            if (!addedContactIds.has(group.id)) {
                addedContactIds.add(group.id);

                html += `
                <div class="list-item contact-item" data-type="group" data-id="${escapeHtml(group.id)}" data-name="${escapeHtml(group.name)}" data-members="${escapeHtml(group.members)}" style="cursor: pointer;">
                        <div class="list-item-header">
                            <span class="list-item-name">👥 ${group.name}</span>
                            <span class="list-item-value" style="font-size: 11px; color: #9ca3af;">${group.memberCount} người</span>
                        </div>
                        <div class="list-item-desc">
                            ${group.members}
                        </div>
                    </div>
                `;
            } else {
            }
        });
    }

    return html;
}


// ==================== CG收集系统 ====================

// SFW场景类型集合（用于判断图片路径）
const SFW_SCENES = new Set(["\u4E0D\u723D", "\u5F97\u610F", "\u5BB3\u7F9E", "\u5F00\u5FC3", "\u54ED\u6CE3", "\u751F\u6C14", "\u901A\u7528", "\u6218\u6597"]);

// 五人共用的场景数据（NSFW + SFW）
const SHARED_CG_SCENES = {
    // SFW
    "\u4E0D\u723D": 3, "\u5F97\u610F": 3, "\u5BB3\u7F9E": 3, "\u5F00\u5FC3": 3, "\u54ED\u6CE3": 3, "\u751F\u6C14": 3, "\u901A\u7528": 3, "\u6218\u6597": 3,
    // NSFW
    "\u4EB2\u543B": 5, "\u4F20\u6559\u58EB\u4F53\u4F4D\u505A\u7231": 4, "\u63B0\u5F00\u5C0F\u7A74": 2, "\u62B1\u8D77\u6765\u505A\u7231": 3, "\u62B1\u817F\u7AD9\u7740\u540E\u5165": 2,
    "\u62B1\u7740\u6478\u5C0F\u7A74": 2, "\u62B1\u7740\u8EBA\u5E8A\u4E0A": 2, "\u80CC\u540E\u5750\u4F4D\u505A\u7231": 3, "\u6253\u5C41\u80A1\u540E\u5165": 2, "\u9AD8\u62AC\u817F\u7AD9\u7740\u540E\u5165": 2,
    "\u6FC0\u70C8\u7AD9\u7740\u540E\u5165": 4, "\u6FC0\u70C8\u505A\u7231": 4, "\u5373\u5C06\u63D2\u5165\u8089\u68D2": 3, "\u53E3\u4EA4": 3, "\u53E3\u4EA4\u989C\u5C04": 2,
    "\u6478\u80F8": 4, "\u5185\u5C04\u4E8B\u540E": 3, "\u5973\u4E0A\u4F4D\u624B\u6DEB": 2, "\u5973\u4E0A\u4F4D\u505A\u7231": 4, "\u8DB4\u5E8A\u4E0A\u540E\u5165": 2,
    "\u8DB4\u5728\u5E8A\u4E0A": 3, "\u8DB4\u7740\u53E3\u4EA4": 2, "\u4E73\u4EA4": 2, "\u5C04\u5916\u9762\u4E8B\u540E": 2, "\u4E8B\u540E\u53E3\u4EA4": 3,
    "\u542E\u5438\u4E73\u5934": 2, "\u7D20\u80A1": 2, "\u8EBA\u7740\u62AC\u817F\u505A\u7231": 3, "\u8214\u5C0F\u7A74": 2, "\u8131\u8863\u670D": 4,
    "\u4E00\u8D77\u6D17\u6FA1": 2, "\u7AD9\u7740\u540E\u5165": 2, "\u7AD9\u7740\u8DB3\u4EA4": 2, "\u6307\u4EA4": 3, "\u6293\u5C41\u80A1\u505A\u7231": 2,
    "\u6293\u7740\u811A\u8DB3\u4EA4": 2, "\u81EA\u5DF1\u63B0\u5F00\u5C0F\u7A74": 2, "\u81EA\u6170": 2, "\u5750\u7740\u8DB3\u4EA4": 2, "\u505A\u7231\u9AD8\u6F6E": 5, "\u505A\u7231\u5C04\u7CBE": 4
};

// CG列表数据
const CG_LIST = {
    "\u5948\u96C5\u4E3D": { ...SHARED_CG_SCENES },
    "\u661F\u6781": { ...SHARED_CG_SCENES },
    "\u6CD5\u9732\u7279": { ...SHARED_CG_SCENES },
    "\u4E9A\u4E1D\u5A1C": { ...SHARED_CG_SCENES },
    "\u9732\u9732\u5361": { ...SHARED_CG_SCENES },
    "\u7EA2\u83B2": { ...SHARED_CG_SCENES },
    "\u5965\u5951\u4E1D": { ...SHARED_CG_SCENES },
    "\u5409\u666E\u8389\u5C14": { ...SHARED_CG_SCENES },
    "\u827E\u514B\u8389\u897F\u5A05": { ...SHARED_CG_SCENES },
    "\u767D": { ...SHARED_CG_SCENES },
    "\u5361\u63D0\u5E0C\u5A05": { ...SHARED_CG_SCENES },
    "\u7231\u5F25\u65AF": { ...SHARED_CG_SCENES },
    "\u7490\u7C73\u6B27\u513F": { ...SHARED_CG_SCENES },
    "\u53F2\u8482\u82AC\u59AE": { ...SHARED_CG_SCENES },
    "\u8FBE\u59AE\u5A05": { ...SHARED_CG_SCENES },
    "\u6D1B\u831C": { ...SHARED_CG_SCENES }
};

const CG_CHARACTER_DISPLAY_NAMES = {
    ...PHONE_WP_DISPLAY_NAMES,
    "\u4E9A\u4E1D\u5A1C": "Asuna",
    "\u9732\u9732\u5361": "Luluca",
    "\u7231\u5F25\u65AF": "Aemis",
    "\u7490\u7C73\u6B27\u513F": "Lumiore",
    "\u6D1B\u831C": "Roxie"
};

const CG_SCENE_DISPLAY_NAMES = {
    "\u4E0D\u723D": "Khó chịu",
    "\u5F97\u610F": "Đắc ý",
    "\u5BB3\u7F9E": "Xấu hổ",
    "\u5F00\u5FC3": "Vui vẻ",
    "\u54ED\u6CE3": "Khóc",
    "\u751F\u6C14": "Tức giận",
    "\u901A\u7528": "Thông dụng",
    "\u6218\u6597": "Chiến đấu",
    "\u4EB2\u543B": "Hôn",
    "\u4F20\u6559\u58EB\u4F53\u4F4D\u505A\u7231": "Làm tình tư thế truyền giáo",
    "\u63B0\u5F00\u5C0F\u7A74": "Vạch âm hộ",
    "\u62B1\u8D77\u6765\u505A\u7231": "Bế lên làm tình",
    "\u62B1\u817F\u7AD9\u7740\u540E\u5165": "Giữ chân đứng thâm nhập từ sau",
    "\u62B1\u7740\u6478\u5C0F\u7A74": "Ôm và vuốt ve âm hộ",
    "\u62B1\u7740\u8EBA\u5E8A\u4E0A": "Ôm nằm trên giường",
    "\u80CC\u540E\u5750\u4F4D\u505A\u7231": "Tư thế ngồi từ sau",
    "\u6253\u5C41\u80A1\u540E\u5165": "Vỗ mông thâm nhập từ sau",
    "\u9AD8\u62AC\u817F\u7AD9\u7740\u540E\u5165": "Giơ cao chân đứng thâm nhập từ sau",
    "\u6FC0\u70C8\u7AD9\u7740\u540E\u5165": "Thâm nhập từ sau khi đứng mãnh liệt",
    "\u6FC0\u70C8\u505A\u7231": "Làm tình mãnh liệt",
    "\u5373\u5C06\u63D2\u5165\u8089\u68D2": "Sắp đưa dương vật vào",
    "\u53E3\u4EA4": "Khẩu giao",
    "\u53E3\u4EA4\u989C\u5C04": "Khẩu giao bắn lên mặt",
    "\u6478\u80F8": "Vuốt ve ngực",
    "\u5185\u5C04\u4E8B\u540E": "Sau khi xuất tinh bên trong",
    "\u5973\u4E0A\u4F4D\u624B\u6DEB": "Nữ ở trên thủ dâm",
    "\u5973\u4E0A\u4F4D\u505A\u7231": "Nữ ở trên làm tình",
    "\u8DB4\u5E8A\u4E0A\u540E\u5165": "Nằm sấp trên giường thâm nhập từ sau",
    "\u8DB4\u5728\u5E8A\u4E0A": "Nằm sấp trên giường",
    "\u8DB4\u7740\u53E3\u4EA4": "Nằm sấp khẩu giao",
    "\u4E73\u4EA4": "Giao hợp bằng ngực",
    "\u5C04\u5916\u9762\u4E8B\u540E": "Sau khi xuất tinh bên ngoài",
    "\u4E8B\u540E\u53E3\u4EA4": "Khẩu giao sau cuộc",
    "\u542E\u5438\u4E73\u5934": "Mút đầu vú",
    "\u7D20\u80A1": "Cọ đùi",
    "\u8EBA\u7740\u62AC\u817F\u505A\u7231": "Nằm nâng chân làm tình",
    "\u8214\u5C0F\u7A74": "Liếm âm hộ",
    "\u8131\u8863\u670D": "Cởi quần áo",
    "\u4E00\u8D77\u6D17\u6FA1": "Tắm chung",
    "\u7AD9\u7740\u540E\u5165": "Đứng thâm nhập từ sau",
    "\u7AD9\u7740\u8DB3\u4EA4": "Đứng footjob",
    "\u6307\u4EA4": "Dùng ngón tay",
    "\u6293\u5C41\u80A1\u505A\u7231": "Nắm mông làm tình",
    "\u6293\u7740\u811A\u8DB3\u4EA4": "Nắm chân footjob",
    "\u81EA\u5DF1\u63B0\u5F00\u5C0F\u7A74": "Tự vạch âm hộ",
    "\u81EA\u6170": "Thủ dâm",
    "\u5750\u7740\u8DB3\u4EA4": "Ngồi footjob",
    "\u505A\u7231\u9AD8\u6F6E": "Cực khoái khi làm tình",
    "\u505A\u7231\u5C04\u7CBE": "Xuất tinh khi làm tình"
};

const CG_CHARACTER_KEY_ALIASES = {
    ...PHONE_CHARACTER_NAME_ALIASES
};

function normalizeCGCharacterKey(characterName) {
    if (!characterName) return '';
    const rawName = String(characterName).trim();
    if (!rawName) return '';
    if (CG_LIST[rawName]) return rawName;
    const mappedName = CG_CHARACTER_KEY_ALIASES[rawName];
    if (mappedName && CG_LIST[mappedName]) return mappedName;
    const lowerName = rawName.toLowerCase();
    for (const [alias, canonicalName] of Object.entries(CG_CHARACTER_KEY_ALIASES)) {
        if (alias.toLowerCase() === lowerName && CG_LIST[canonicalName]) return canonicalName;
    }
    for (const [canonicalName, displayName] of Object.entries(CG_CHARACTER_DISPLAY_NAMES)) {
        if (displayName.toLowerCase() === lowerName && CG_LIST[canonicalName]) return canonicalName;
    }
    return rawName;
}

function normalizeCGSceneKey(sceneType) {
    if (!sceneType) return '';
    const rawScene = String(sceneType).trim();
    if (!rawScene) return '';
    if (Object.prototype.hasOwnProperty.call(SHARED_CG_SCENES, rawScene)) return rawScene;
    const lowerScene = rawScene.toLowerCase();
    for (const [canonicalScene, displayName] of Object.entries(CG_SCENE_DISPLAY_NAMES)) {
        if (displayName.toLowerCase() === lowerScene) return canonicalScene;
    }
    return rawScene;
}

function normalizeCGUnlockData(data) {
    if (!data || typeof data !== 'object') return {};
    const normalizedData = {};
    for (const [rawCharacterName, scenes] of Object.entries(data)) {
        if (!scenes || typeof scenes !== 'object') continue;
        const characterName = normalizeCGCharacterKey(rawCharacterName);
        if (!characterName) continue;
        if (!normalizedData[characterName]) normalizedData[characterName] = {};
        for (const [rawSceneType, count] of Object.entries(scenes)) {
            const sceneType = normalizeCGSceneKey(rawSceneType);
            if (!sceneType) continue;
            normalizedData[characterName][sceneType] = count;
        }
    }
    return normalizedData;
}

function getCGCharacterDisplayName(characterName) {
    const canonicalName = normalizeCGCharacterKey(characterName);
    return CG_CHARACTER_DISPLAY_NAMES[canonicalName] || characterName;
}

function getCGSceneDisplayName(sceneType) {
    const canonicalScene = normalizeCGSceneKey(sceneType);
    return CG_SCENE_DISPLAY_NAMES[canonicalScene] || sceneType;
}

// CG图片基础URL
const CG_BASE_URL = "https://rpg.bolt.qzz.io/";

/**
 * 获取已解锁的CG数据
 * @param {boolean} includeVirtual - 是否包含虚拟解锁（一键解锁）的数据
 */
function getUnlockedCG(includeVirtual = false) {
    try {
        const realData = normalizeCGUnlockData(JSON.parse(localStorage.getItem('unlocked_cg') || '{}'));

        if (!includeVirtual) {
            return realData;
        }

        // 合并虚拟数据
        const virtualData = normalizeCGUnlockData(JSON.parse(localStorage.getItem('unlocked_cg_virtual') || '{}'));
        const mergedData = JSON.parse(JSON.stringify(realData)); // 深拷贝

        for (const [char, scenes] of Object.entries(virtualData)) {
            if (!mergedData[char]) mergedData[char] = {};
            for (const [scene, count] of Object.entries(scenes)) {
                // 如果真实数据里没有，就用虚拟数据
                if (!mergedData[char][scene]) {
                    mergedData[char][scene] = count;
                }
            }
        }
        return mergedData;
    } catch (e) {
        console.error('Đọc dữ liệu CG thất bại:', e);
        return {};
    }
}

/**
 * 保存已解锁的CG数据
 * @param {Object} data - 要保存的CG数据
 * @param {boolean} isVirtual - 是否保存为虚拟解锁数据
 */
function saveUnlockedCG(data, isVirtual = false) {
    try {
        const key = isVirtual ? 'unlocked_cg_virtual' : 'unlocked_cg';
        localStorage.setItem(key, JSON.stringify(normalizeCGUnlockData(data)));
    } catch (e) {
        console.error('Lưu dữ liệu CG thất bại:', e);
    }
}

/**
 * 解锁CG（供外部调用）
 * @param {string} characterName - 角色名称
 * @param {string} sceneType - 场景类型
 * @param {number} maxCount - 该场景的最大CG数量
 */
function unlockCG(characterName, sceneType, maxCount) {
    const normalizedCharacterName = normalizeCGCharacterKey(characterName);
    const normalizedSceneType = normalizeCGSceneKey(sceneType);
    const unlocked = getUnlockedCG();
    if (!unlocked[normalizedCharacterName]) {
        unlocked[normalizedCharacterName] = {};
    }
    if (!(normalizedSceneType in unlocked[normalizedCharacterName])) {
        // 如果没传maxCount，从CG_LIST获取
        const count = maxCount || CG_LIST[normalizedCharacterName]?.[normalizedSceneType] || 1;
        unlocked[normalizedCharacterName][normalizedSceneType] = count;
        saveUnlockedCG(unlocked);
    }
}

/**
 * 一键解锁角色的所有CG
 * @param {string} characterName - 角色名称
 * @param {boolean} isVirtual - 是否是虚拟解锁（仅查看，不计入真实收集）
 * @returns {number} - 解锁的CG数量
 */
function unlockAllCGForCharacter(characterName, isVirtual = false) {
    characterName = normalizeCGCharacterKey(characterName);
    if (!CG_LIST[characterName]) return 0;

    // 根据模式读取对应的数据源
    let currentData;
    try {
        const key = isVirtual ? 'unlocked_cg_virtual' : 'unlocked_cg';
        currentData = normalizeCGUnlockData(JSON.parse(localStorage.getItem(key) || '{}'));
    } catch (e) {
        currentData = {};
    }

    if (!currentData[characterName]) {
        currentData[characterName] = {};
    }

    let unlockedCount = 0;
    const scenes = CG_LIST[characterName];

    // 如果是虚拟解锁，还需要检查真实解锁数据，避免覆盖真实进度（虽然逻辑上虚拟集合包含真实集合，但保存时分开）
    // 不过简单起见，虚拟解锁库只记录“通过一键解锁获得的权限”，读取时合并即可

    for (const [sceneType, maxCount] of Object.entries(scenes)) {
        if (!(sceneType in currentData[characterName])) {
            currentData[characterName][sceneType] = maxCount;
            unlockedCount++;
        }
    }

    if (unlockedCount > 0) {
        saveUnlockedCG(currentData, isVirtual);
    }

    return unlockedCount;
}

/**
 * 获取角色的好感度（从好友列表数据中）
 * @param {string} characterName - 角色名称
 * @param {Object|null} relationshipSource - 可选，已解析的羁绊列表数据
 * @returns {number} - 好感度值，如果找不到返回0
 */
function getCharacterAffection(characterName, relationshipSource = null) {
    const contactSource = relationshipSource || getRelationshipDataSource();
    if (!contactSource) return 0;
    const canonicalName = normalizePhoneCharacterKey(characterName);
    const candidateNames = getPhoneCharacterAliasCandidates(characterName);

    // 尝试直接匹配角色名
    for (const candidateName of candidateNames) {
        if (contactSource[candidateName]) {
            return contactSource[candidateName]?.['\u597D\u611F\u5EA6'] ?? 0;
        }
    }

    // 尝试模糊匹配（角色名可能是部分匹配）
    for (const [key, contact] of Object.entries(contactSource)) {
        const normalizedKey = normalizePhoneCharacterKey(key);
        if (
            normalizedKey === canonicalName ||
            key.includes(characterName) ||
            String(characterName).includes(key) ||
            candidateNames.some(candidateName => key.includes(candidateName) || candidateName.includes(key))
        ) {
            return contact?.['\u597D\u611F\u5EA6'] ?? 0;
        }
    }

    return 0;
}

/**
 * 计算CG收藏进度统计
 * @returns {Object} - 包含总进度和各角色进度的对象
 */
function getCGCollectionStats() {
    const unlocked = getUnlockedCG();
    const stats = {
        total: { unlocked: 0, total: 0, percentage: 0 },
        characters: {}
    };

    for (const [charName, scenes] of Object.entries(CG_LIST)) {
        const totalScenes = Object.keys(scenes).length;
        const unlockedScenes = unlocked[charName] ? Object.keys(unlocked[charName]).length : 0;
        const percentage = totalScenes > 0 ? Math.round((unlockedScenes / totalScenes) * 100) : 0;

        stats.characters[charName] = {
            unlocked: unlockedScenes,
            total: totalScenes,
            percentage: percentage
        };

        stats.total.unlocked += unlockedScenes;
        stats.total.total += totalScenes;
    }

    stats.total.percentage = stats.total.total > 0
        ? Math.round((stats.total.unlocked / stats.total.total) * 100)
        : 0;

    return stats;
}

// CG面板当前模式：'unlock'（一键解锁模式）或 'progress'（收藏进度模式）
let cgPanelMode = 'progress';
const CG_CHARACTER_PAGE_SIZE = 6;
const CG_FAVORITES_STORAGE_KEY = 'dnf-phone-cg-favorite-characters';
let cgCharacterPage = 0;

function getCGFavoriteCharacters() {
    try {
        const raw = JSON.parse(localStorage.getItem(CG_FAVORITES_STORAGE_KEY) || '[]');
        return Array.isArray(raw)
            ? Array.from(new Set(raw.map(name => normalizeCGCharacterKey(name)).filter(name => CG_LIST[name])))
            : [];
    } catch (e) {
        return [];
    }
}

function saveCGFavoriteCharacters(favorites) {
    try {
        const validFavorites = Array.from(new Set(favorites.map(name => normalizeCGCharacterKey(name)).filter(name => CG_LIST[name])));
        localStorage.setItem(CG_FAVORITES_STORAGE_KEY, JSON.stringify(validFavorites));
    } catch (e) {
        console.error('Lưu nhân vật CG được ghim thất bại:', e);
    }
}

function isCGCharacterFavorite(characterName) {
    return getCGFavoriteCharacters().includes(characterName);
}

function toggleCGCharacterFavorite(characterName) {
    characterName = normalizeCGCharacterKey(characterName);
    const favorites = getCGFavoriteCharacters();
    const index = favorites.indexOf(characterName);
    if (index >= 0) {
        favorites.splice(index, 1);
    } else if (CG_LIST[characterName]) {
        favorites.unshift(characterName);
    }
    saveCGFavoriteCharacters(favorites);
}

function getSortedCGCharacters() {
    const characters = Object.keys(CG_LIST);
    const favoriteSet = new Set(getCGFavoriteCharacters());
    return characters.slice().sort((a, b) => {
        const favA = favoriteSet.has(a);
        const favB = favoriteSet.has(b);
        if (favA && !favB) return -1;
        if (!favA && favB) return 1;
        return characters.indexOf(a) - characters.indexOf(b);
    });
}

function getCGCharacterCover(characterName) {
    const normalizedCharacterName = normalizeCGCharacterKey(characterName);
    return `${CG_BASE_URL}%E5%B0%81%E9%9D%A2/${encodeURIComponent(normalizedCharacterName)}.webp`;
}

/**
 * 切换CG面板模式
 */
function toggleCGPanelMode() {
    cgPanelMode = cgPanelMode === 'progress' ? 'unlock' : 'progress';
    // 重新渲染CG面板
    if (currentPanel === 'gallery') {
        const content = generateGalleryPanel(currentPhoneData);
        $('#phone-app-body').html(content);
        // 重新绑定事件需要在openAppPanel中处理
        bindCGGalleryEvents();
    }
}

/**
 * 绑定CG画廊事件（抽取出来方便重用）
 */
function bindCGGalleryEvents() {
    const $appBody = $('#phone-app-body');
    if ($appBody.length === 0) return;

    // 重置滚动位置到顶部，确保用户能看到模式切换按钮
    // $appBody.scrollTop(0); // 用户要求移除强制置顶

    $appBody.off('click.cggallery');

    // 模式切换按钮
    $appBody.on('click.cggallery', '.cg-mode-segment', function (e) {
        e.stopPropagation();
        const mode = $(this).data('mode');
        if (mode !== cgPanelMode) {
            toggleCGPanelMode();
        }
    });

    // 角色封面卡：进入该角色CG列表
    $appBody.on('click.cggallery', '.cg-character-card', function (e) {
        if ($(e.target).closest('.cg-favorite-btn, .cg-unlock-btn').length) return;
        e.stopPropagation();
        const char = $(this).data('character');
        if (char) {
            showCGCharacterDetail(char);
        }
    });

    // 爱心收藏/取消收藏，收藏角色自动置顶
    $appBody.on('click.cggallery', '.cg-favorite-btn', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const char = $(this).data('character');
        if (!char) return;
        const wasFavorite = isCGCharacterFavorite(char);
        toggleCGCharacterFavorite(char);
        if (!wasFavorite) {
            cgCharacterPage = 0;
        }
        const content = generateGalleryPanel(currentPhoneData);
        $('#phone-app-body').html(content);
        bindCGGalleryEvents();
    });

    // 角色封面列表翻页
    $appBody.on('click.cggallery', '.cg-page-btn', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const direction = $(this).data('direction');
        const total = getSortedCGCharacters().length;
        const pageCount = Math.max(1, Math.ceil(total / CG_CHARACTER_PAGE_SIZE));
        if (direction === 'prev' && cgCharacterPage > 0) {
            cgCharacterPage--;
        } else if (direction === 'next' && cgCharacterPage < pageCount - 1) {
            cgCharacterPage++;
        }
        const content = generateGalleryPanel(currentPhoneData);
        $('#phone-app-body').html(content);
        bindCGGalleryEvents();
    });

    // 展开/收起详情列表
    $appBody.on('click.cggallery', '.cg-toggle-details-btn', function (e) {
        e.stopPropagation();
        const $btn = $(this);
        const $list = $btn.next('.cg-details-list');
        const $icon = $btn.find('.fa-chevron-down');

        $list.slideToggle(200, function () {
            if ($list.is(':visible')) {
                $icon.css('transform', 'rotate(180deg)');
            } else {
                $icon.css('transform', 'rotate(0deg)');
            }
        });
        $btn.toggleClass('active');
    });

    // 一键解锁按钮
    $appBody.on('click.cggallery', '.cg-unlock-btn', function (e) {
        e.stopPropagation();
        const char = normalizeCGCharacterKey($(this).data('character'));
        const displayChar = getCGCharacterDisplayName(char);
        const affection = getCharacterAffection(char);

            if (affection < 100) {
            if (typeof toastr !== 'undefined') {
                toastr.warning(`${displayChar} chưa đủ 100 độ thiện cảm, không thể mở khóa một chạm!`);
            } else {
                alert(`${displayChar} chưa đủ 100 độ thiện cảm, không thể mở khóa một chạm!`);
            }
            return;
        }

        // 关键修改：传入 true 表示虚拟解锁，不记录入真实存档
        const unlockedCount = unlockAllCGForCharacter(char, true);

        if (typeof toastr !== 'undefined') {
            toastr.success(`Đã mở quyền xem trước của ${displayChar}`);
        }

        // 刷新面板
        const isInDetail = $(this).closest('.cg-character-detail-container').length > 0;
        const content = isInDetail ? generateCGCharacterDetailPanel(char, currentPhoneData) : generateGalleryPanel(currentPhoneData);
        $('#phone-app-body').html(content);
        bindCGGalleryEvents();

        // 保持展开状态
        if (cgPanelMode === 'unlock' && !isInDetail) {
            $('.cg-details-list').show();
            $('.cg-toggle-details-btn').find('.fa-chevron-down').css('transform', 'rotate(180deg)');
            $('.cg-toggle-details-btn').addClass('active');
        }
    });

    // 已解锁CG点击切换图片编号
    $appBody.on('click.cggallery', '.cg-item.unlocked .cg-switch-btn', function (e) {
        e.stopPropagation();
        const $item = $(this).closest('.cg-item');
        const char = $item.data('character');
        const scene = $item.data('scene');
        const max = parseInt($item.data('max'));
        let current = parseInt($item.data('current'));

        current = current >= max ? 1 : current + 1;
        $item.data('current', current);

        const newUrl = getCGImageUrl(char, scene, current);
        $item.find('img').attr('src', newUrl).show();
        $item.find('img').next().hide();

        $(this).text(`${current}/${max}`);
    });

    // 点击已解锁CG查看大图
    $appBody.on('click.cggallery', '.cg-item.unlocked', function (e) {
        if ($(e.target).closest('.cg-switch-btn').length) return;

        const char = $(this).data('character');
        const scene = $(this).data('scene');
        const current = parseInt($(this).data('current')) || 1;
        const imgUrl = getCGImageUrl(char, scene, current);

        showCGFullscreen(imgUrl, char, scene, current);
    });
}

/**
 * 生成CG图片URL
 */
function getCGImageUrl(characterName, sceneType, index = 1) {
    const normalizedCharacterName = normalizeCGCharacterKey(characterName);
    const normalizedSceneType = normalizeCGSceneKey(sceneType);
    const folder = SFW_SCENES.has(normalizedSceneType) ? 'SFW' : 'NSFW';
    const path = `${folder}/${normalizedCharacterName}/${normalizedSceneType}${index}.webp`;
    return CG_BASE_URL + encodeURIComponent(path).replace(/%2F/g, '/');
}

/**
 * 生成CG收集面板
 */
function generateGalleryPanel(data) {
    const stats = getCGCollectionStats();
    const displayUnlockedCG = getUnlockedCG(cgPanelMode === 'unlock');
    const relationshipSource = getRelationshipDataSource(data);
    const characters = getSortedCGCharacters();
    const isProgressMode = cgPanelMode === 'progress';
    const favoriteSet = new Set(getCGFavoriteCharacters());
    const pageCount = Math.max(1, Math.ceil(characters.length / CG_CHARACTER_PAGE_SIZE));

    if (cgCharacterPage < 0) cgCharacterPage = 0;
    if (cgCharacterPage >= pageCount) cgCharacterPage = pageCount - 1;

    const pageStart = cgCharacterPage * CG_CHARACTER_PAGE_SIZE;
    const pageCharacters = characters.slice(pageStart, pageStart + CG_CHARACTER_PAGE_SIZE);

    let html = `<div class="cg-gallery-container" style="padding: 14px 14px 78px 14px; background: #f8fafc; min-height: 100%; box-sizing: border-box;">`;
    html += renderCGGalleryStyles();

    html += `
        <div style="
            background: #e2e8f0; 
            border-radius: 10px; 
            padding: 3px; 
            display: flex; 
            margin-bottom: 20px;
            position: relative;
        ">
            <div data-mode="progress" class="cg-mode-segment" style="
                flex: 1; text-align: center; padding: 10px 0; font-size: 13px; font-weight: 600; cursor: pointer; border-radius: 8px; z-index: 1; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                ${isProgressMode ? 'background: #fff; color: #0f172a; box-shadow: 0 2px 4px rgba(0,0,0,0.06); transform: scale(1);' : 'color: #64748b; transform: scale(0.98);'}
            ">Tiến độ sưu tập</div>
            <div data-mode="unlock" class="cg-mode-segment" style="
                flex: 1; text-align: center; padding: 10px 0; font-size: 13px; font-weight: 600; cursor: pointer; border-radius: 8px; z-index: 1; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                ${!isProgressMode ? 'background: #fff; color: #0f172a; box-shadow: 0 2px 4px rgba(0,0,0,0.06); transform: scale(1);' : 'color: #64748b; transform: scale(0.98);'}
            ">Mở nhanh</div>
        </div>
    `;

    if (isProgressMode) {
        html += `
            <div class="cg-toggle-details-btn" style="
                background: white; border-radius: 16px; padding: 22px; 
                box-shadow: 0 4px 20px rgba(0,0,0,0.03); border: 1px solid #f1f5f9;
                margin-bottom: 20px; cursor: pointer; position: relative; overflow: hidden;
            ">
                <!-- Vầng sáng nền trang trí -->
                <div style="position: absolute; top: -20px; right: -20px; width: 100px; height: 100px; background: radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%); border-radius: 50%;"></div>
                
                <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 14px; position: relative; z-index: 2;">
                    <div>
                        <div style="font-size: 13px; color: #64748b; margin-bottom: 6px; font-weight: 500;">Tổng quan sưu tập hiện tại</div>
                        <div style="font-size: 32px; font-weight: 800; color: #0f172a; line-height: 1; letter-spacing: -0.5px;">${stats.total.percentage}<span style="font-size: 16px; color: #94a3b8; font-weight: 600; margin-left: 2px;">%</span></div>
                    </div>
                    <div style="text-align: right;">
                        <span style="font-size: 12px; color: #94a3b8; font-weight: 500;">Chi tiết</span>
                        <i class="fas fa-chevron-down" style="font-size: 12px; color: #94a3b8; margin-left: 6px; transition: transform 0.3s;"></i>
                    </div>
                </div>
                <div style="background: #f1f5f9; height: 8px; border-radius: 4px; overflow: hidden; margin-bottom: 10px;">
                    <div style="background: linear-gradient(90deg, #3b82f6, #60a5fa); width: ${stats.total.percentage}%; height: 100%; border-radius: 4px; box-shadow: 0 1px 2px rgba(59, 130, 246, 0.2);"></div>
                </div>
                <div style="font-size: 12px; color: #64748b; font-weight: 500; display: flex; justify-content: space-between;">
                    <span>Cảnh đã mở</span>
                    <span style="color: #0f172a; font-weight: 700;">${stats.total.unlocked} <span style="color: #cbd5e1; font-weight: 400;">/</span> ${stats.total.total}</span>
                </div>
            </div>
        `;

        html += `<div class="cg-details-list" style="display: none; margin-bottom: 24px; background: white; border-radius: 16px; padding: 8px 0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);">`;
        characters.forEach(char => {
            const charStats = stats.characters[char];
            const affection = getCharacterAffection(char, relationshipSource);
            const charDisplayName = getCGCharacterDisplayName(char);
            html += `
                <div style="
                    display: flex; align-items: center; padding: 14px 16px; 
                    border-bottom: 1px solid #f8fafc;
                ">
                    <div style="width: 85px; font-weight: 700; color: #334155; font-size: 14px;">
                        ${escapeHtml(charDisplayName)}
                        <div style="font-size: 11px; color: #94a3b8; font-weight: 500; margin-top: 2px;">${charStats.unlocked}/${charStats.total}</div>
                    </div>
                    <div style="flex: 1; padding: 0 8px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <!-- 红色爱心 -->
                            <span style="font-size: 12px; color: #f43f5e; font-weight: 600; display: flex; align-items: center; gap: 4px;">
                                <i class="fas fa-heart"></i> ${affection}
                            </span>
                            <span style="font-size: 12px; color: #64748b; font-weight: 600;">${charStats.percentage}%</span>
                        </div>
                        <div style="background: #f1f5f9; height: 6px; border-radius: 3px; overflow: hidden;">
                            <div style="background: ${charStats.percentage === 100 ? 'linear-gradient(90deg, #10b981, #34d399)' : 'linear-gradient(90deg, #3b82f6, #60a5fa)'}; width: ${charStats.percentage}%; height: 100%;"></div>
                        </div>
                    </div>
                </div>
            `;
        });
        html += `</div>`;
    }

    if (!isProgressMode) {
        html += `
            <div class="cg-toggle-details-btn" style="
                background: white; border-radius: 16px; padding: 18px; 
                box-shadow: 0 4px 20px rgba(0,0,0,0.03); border: 1px solid #f1f5f9;
                margin-bottom: 20px; cursor: pointer; display: flex; align-items: center; justify-content: space-between;
            ">
                <div style="display: flex; align-items: center; gap: 14px;">
                    <div style="width: 36px; height: 36px; border-radius: 10px; background: #fff7ed; display: flex; align-items: center; justify-content: center; color: #f97316; box-shadow: 0 2px 5px rgba(249, 115, 22, 0.1);">
                        <i class="fas fa-unlock-alt" style="font-size: 16px;"></i>
                    </div>
                    <div>
                        <div style="font-size: 14px; font-weight: 700; color: #1e293b; margin-bottom: 2px;">Mở quyền xem trước CG</div>
                        <div style="font-size: 11px; color: #94a3b8;">Cần độ thiện cảm ≥ 100, không ảnh hưởng tiến độ thu thập thật</div>
                    </div>
                </div>
                <i class="fas fa-chevron-down" style="font-size: 12px; color: #cbd5e1; transition: transform 0.3s;"></i>
            </div>
        `;

        html += `<div class="cg-details-list" style="display: none; margin-bottom: 24px; background: white; border-radius: 16px; padding: 8px 0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);">`;
        characters.forEach(char => {
            const charStats = stats.characters[char];
            const affection = getCharacterAffection(char, relationshipSource);
            const canUnlock = affection >= 100;
            const charDisplayName = getCGCharacterDisplayName(char);

            const charUnlockedMap = displayUnlockedCG[char] || {};
            const totalScenes = Object.keys(CG_LIST[char]).length;
            const currentUnlockedCount = Object.keys(charUnlockedMap).length;
            const isUnlockedModeActive = currentUnlockedCount >= totalScenes;

            let btnState = '';
            if (isUnlockedModeActive) {
                btnState = `<span style="color: #10b981; font-size: 12px; font-weight: 600; display: flex; align-items: center; gap: 4px;"><i class="fas fa-check-circle"></i> Đã mở</span>`;
            } else if (canUnlock) {
                btnState = `
                    <button class="cg-unlock-btn" data-character="${escapeHtml(char)}" style="
                        background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); 
                        color: white; border: none; padding: 6px 14px; 
                        border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer;
                        box-shadow: 0 2px 6px rgba(234, 88, 12, 0.25); transition: transform 0.1s;
                    ">Mở</button>
                `;
            } else {
                btnState = `<span style="color: #cbd5e1; font-size: 12px; font-weight: 500;">Chưa đủ thiện cảm</span>`;
            }

            html += `
                <div style="
                    display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; 
                    border-bottom: 1px solid #f8fafc;
                ">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div>
                            <span style="font-weight: 700; color: #334155; font-size: 14px; display: block;">${escapeHtml(charDisplayName)}</span>
            <span style="font-size: 11px; color: #94a3b8; font-weight: 500;">Tiến độ thật: ${charStats.unlocked}/${charStats.total}</span>
                        </div>
                        <span style="
                            font-size: 11px; 
                            color: ${affection >= 100 ? '#f43f5e' : '#94a3b8'}; 
                            background: ${affection >= 100 ? '#fff1f2' : '#f1f5f9'}; 
                            padding: 3px 8px; border-radius: 12px; font-weight: 600;
                            height: fit-content;
                        ">
                            ❤ ${affection}
                        </span>
                    </div>
                    <div>${btnState}</div>
                </div>
            `;
        });
        html += `</div>`;
    }

    html += `
        <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; margin: 10px 2px 12px;">
            <div>
                <div style="font-size:16px; font-weight:800; color:#0f172a;">Sổ tay nhân vật</div>
                <div style="font-size:11px; color:#94a3b8; margin-top:2px;">${characters.length} người</div>
            </div>
            <div style="font-size:12px; color:#64748b; font-weight:700;">${cgCharacterPage + 1} / ${pageCount}</div>
        </div>
        <div class="cg-character-card-grid">
    `;

    pageCharacters.forEach(char => {
        const charStats = stats.characters[char];
        const affection = getCharacterAffection(char, relationshipSource);
        const isFavorite = favoriteSet.has(char);
        const charUnlockedMap = displayUnlockedCG[char] || {};
        const totalScenes = Object.keys(CG_LIST[char]).length;
        const currentUnlockedCount = Object.keys(charUnlockedMap).length;
        const isPreviewActive = currentUnlockedCount >= totalScenes;
        const canUnlock = affection >= 100;
        const coverUrl = getCGCharacterCover(char);
        const charDisplayName = getCGCharacterDisplayName(char);
        const fallbackInitial = escapeHtml(charDisplayName.charAt(0));
        let unlockStateHtml = '';

        if (!isProgressMode) {
            if (isPreviewActive) {
                unlockStateHtml = `<span class="cg-card-pill cg-card-pill-ok"><i class="fas fa-check-circle"></i> Đã mở</span>`;
            } else if (canUnlock) {
                unlockStateHtml = `<button class="cg-unlock-btn cg-card-unlock-btn" data-character="${escapeHtml(char)}">Mở</button>`;
            } else {
                unlockStateHtml = `<span class="cg-card-pill">Chưa đủ thiện cảm</span>`;
            }
        }

        html += `
            <div class="cg-character-card" data-character="${escapeHtml(char)}">
                <button class="cg-favorite-btn ${isFavorite ? 'active' : ''}" data-character="${escapeHtml(char)}" title="${isFavorite ? 'Bỏ lưu' : 'Lưu lên đầu'}">
                    <i class="fas fa-heart"></i>
                </button>
                <div class="cg-character-cover">
                    <img src="${coverUrl}" alt="${escapeHtml(charDisplayName)}" decoding="async"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="cg-character-cover-fallback">${fallbackInitial}</div>
                </div>
                <div class="cg-character-info">
                    <div class="cg-character-name">${escapeHtml(charDisplayName)}</div>
                    <div class="cg-character-meta">
                        <span><i class="fas fa-images"></i> ${charStats.unlocked}/${charStats.total}</span>
                        <span><i class="fas fa-heart"></i> ${affection}</span>
                    </div>
                    <div class="cg-character-progress">
                        <div style="width:${charStats.percentage}%;"></div>
                    </div>
                    ${unlockStateHtml ? `<div class="cg-character-action-row">${unlockStateHtml}</div>` : ''}
                </div>
            </div>
        `;
    });

    html += `</div>`;

    if (pageCount > 1) {
        html += `
            <div class="cg-pagination">
                <button class="cg-page-btn" data-direction="prev" ${cgCharacterPage === 0 ? 'disabled' : ''}>
                    <i class="fas fa-chevron-left"></i> Trang trước
                </button>
                <span>${cgCharacterPage + 1} / ${pageCount}</span>
                <button class="cg-page-btn" data-direction="next" ${cgCharacterPage >= pageCount - 1 ? 'disabled' : ''}>
                    Trang sau <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        `;
    }

    html += `</div>`;
    return html;
}

function renderCGGalleryStyles() {
    return `
        <style>
            .cg-character-card-grid {
                display: grid;
                grid-template-columns: repeat(2, minmax(0, 1fr));
                gap: 14px;
            }
            .cg-character-card {
                position: relative;
                min-width: 0;
                overflow: hidden;
                border: 2px solid transparent;
                border-radius: 12px;
                background: #fff;
                cursor: pointer;
                box-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);
                transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
            }
            .cg-character-card:hover {
                transform: translateY(-4px);
                border-color: rgba(59, 130, 246, 0.45);
                box-shadow: 0 12px 24px rgba(15, 23, 42, 0.12);
            }
            .cg-favorite-btn {
                position: absolute;
                top: 8px;
                right: 8px;
                z-index: 4;
                width: 30px;
                height: 30px;
                border: 1px solid rgba(255, 255, 255, 0.65);
                border-radius: 50%;
                background: rgba(15, 23, 42, 0.38);
                color: rgba(255, 255, 255, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(15, 23, 42, 0.18);
                backdrop-filter: blur(6px);
                transition: transform 0.18s ease, background 0.18s ease, color 0.18s ease;
            }
            .cg-favorite-btn:hover {
                transform: scale(1.08);
                background: rgba(225, 29, 72, 0.92);
                color: #fff;
            }
            .cg-favorite-btn.active {
                background: #fff;
                border-color: #fff;
                color: #e11d48;
            }
            .cg-character-cover {
                position: relative;
                width: 100%;
                aspect-ratio: 3 / 4;
                overflow: hidden;
                background: #e2e8f0;
            }
            .cg-character-cover img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: top center;
                display: block;
                transition: transform 0.35s ease;
            }
            .cg-character-card:hover .cg-character-cover img {
                transform: scale(1.06);
            }
            .cg-character-cover-fallback {
                display: none;
                width: 100%;
                height: 100%;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, #64748b, #334155);
                color: #fff;
                font-size: 34px;
                font-weight: 800;
            }
            .cg-character-info {
                position: relative;
                z-index: 2;
                margin-top: -18px;
                padding: 11px 10px 12px;
                border-radius: 12px 12px 0 0;
                background: linear-gradient(to top, #fff 70%, rgba(255, 255, 255, 0.94));
            }
            .cg-character-name {
                min-width: 0;
                overflow: hidden;
                color: #0f172a;
                font-size: 15px;
                font-weight: 800;
                text-align: center;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .cg-character-meta {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 7px;
                margin-top: 7px;
                color: #64748b;
                font-size: 11px;
                font-weight: 700;
            }
            .cg-character-meta span {
                display: inline-flex;
                align-items: center;
                gap: 4px;
                min-width: 0;
            }
            .cg-character-meta .fa-heart {
                color: #e11d48;
            }
            .cg-character-progress {
                height: 5px;
                margin-top: 9px;
                overflow: hidden;
                border-radius: 999px;
                background: #e2e8f0;
            }
            .cg-character-progress > div {
                height: 100%;
                border-radius: inherit;
                background: linear-gradient(90deg, #3b82f6, #10b981);
            }
            .cg-character-action-row {
                display: flex;
                justify-content: center;
                margin-top: 9px;
                min-height: 24px;
            }
            .cg-card-pill,
            .cg-card-unlock-btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 4px;
                min-height: 24px;
                padding: 0 9px;
                border: none;
                border-radius: 999px;
                background: #f1f5f9;
                color: #94a3b8;
                font-size: 11px;
                font-weight: 800;
                white-space: nowrap;
            }
            .cg-card-pill-ok {
                background: #ecfdf5;
                color: #059669;
            }
            .cg-card-unlock-btn {
                background: linear-gradient(135deg, #f97316, #ea580c);
                color: #fff;
                cursor: pointer;
                box-shadow: 0 3px 8px rgba(234, 88, 12, 0.24);
            }
            .cg-pagination {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 12px;
                margin-top: 18px;
                color: #64748b;
                font-size: 13px;
                font-weight: 800;
            }
            .cg-page-btn {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                min-height: 34px;
                padding: 0 12px;
                border: 1px solid #dbe3ef;
                border-radius: 10px;
                background: #fff;
                color: #2563eb;
                font-size: 12px;
                font-weight: 800;
                cursor: pointer;
                box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05);
            }
            .cg-page-btn:disabled {
                cursor: not-allowed;
                opacity: 0.42;
            }
        </style>
    `;
}

function renderCGSceneGrid(characterName, scenes, charUnlocked) {
    let html = `<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">`;

    Object.entries(scenes).forEach(([sceneType, maxCount]) => {
        const isUnlocked = sceneType in charUnlocked;
        const sceneDisplayName = getCGSceneDisplayName(sceneType);

        if (isUnlocked) {
            const imgUrl = getCGImageUrl(characterName, sceneType, 1);
            html += `
                <div class="cg-item unlocked" data-character="${escapeHtml(characterName)}" data-scene="${escapeHtml(sceneType)}" data-max="${maxCount}" data-current="1"
                    style="
                        aspect-ratio: 3/4; border-radius: 8px; overflow: hidden; position: relative; cursor: pointer; 
                        background: #e2e8f0; box-shadow: 0 2px 6px rgba(0,0,0,0.1);
                    ">
                    <img src="${imgUrl}" alt="${escapeHtml(sceneDisplayName)}" 
                        style="width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s;" 
                        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div style="display: none; position: absolute; inset: 0; align-items: center; justify-content: center; color: #94a3b8; font-size: 10px;">Tải thất bại</div>
                    ${maxCount > 1 ? `
                        <div class="cg-switch-btn" style="
                            position: absolute; top: 6px; right: 6px; background: rgba(0,0,0,0.6); backdrop-filter: blur(2px);
                            color: white; font-size: 9px; padding: 2px 8px; border-radius: 12px; font-weight: 600;
                        ">1/${maxCount}</div>
                    ` : ''}
                    <div style="
                        position: absolute; bottom: 0; left: 0; right: 0; 
                        background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
                        color: white; font-size: 11px; padding: 16px 8px 6px 8px; font-weight: 500;
                        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                    ">${escapeHtml(sceneDisplayName)}</div>
                </div>
            `;
        } else {
            html += `
                <div class="cg-item locked" style="
                    aspect-ratio: 3/4; border-radius: 8px; background: #f8fafc; 
                    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
                    border: 1px dashed #cbd5e1; color: #cbd5e1;
                ">
                    <i class="fas fa-lock" style="font-size: 18px;"></i>
                    <span style="font-size: 10px; font-weight: 500;">locked</span>
                </div>
            `;
        }
    });

    html += `</div>`;
    return html;
}

function generateCGCharacterDetailPanel(characterName, data) {
    characterName = normalizeCGCharacterKey(characterName);
    const scenes = CG_LIST[characterName];
    if (!scenes) {
        return '<div class="empty-message">Không tìm thấy dữ liệu CG của nhân vật này</div>';
    }

    const stats = getCGCollectionStats();
    const displayUnlockedCG = getUnlockedCG(cgPanelMode === 'unlock');
    const relationshipSource = getRelationshipDataSource(data);
    const charStats = stats.characters[characterName] || { unlocked: 0, total: Object.keys(scenes).length, percentage: 0 };
    const charUnlocked = displayUnlockedCG[characterName] || {};
    const affection = getCharacterAffection(characterName, relationshipSource);
    const coverUrl = getCGCharacterCover(characterName);
    const displayCharacterName = getCGCharacterDisplayName(characterName);
    const totalScenes = Object.keys(scenes).length;
    const currentUnlockedCount = Object.keys(charUnlocked).length;
    const isPreviewActive = currentUnlockedCount >= totalScenes;
    const canUnlock = affection >= 100;

    let unlockHtml = '';
    if (cgPanelMode === 'unlock') {
        if (isPreviewActive) {
            unlockHtml = `<span style="display:inline-flex;align-items:center;gap:6px;color:#059669;background:#ecfdf5;border-radius:999px;padding:7px 12px;font-size:12px;font-weight:800;"><i class="fas fa-check-circle"></i> Đã mở xem trước</span>`;
        } else if (canUnlock) {
            unlockHtml = `<button class="cg-unlock-btn" data-character="${escapeHtml(characterName)}" style="border:none;border-radius:999px;background:linear-gradient(135deg,#f97316,#ea580c);color:#fff;padding:8px 14px;font-size:12px;font-weight:800;cursor:pointer;box-shadow:0 3px 8px rgba(234,88,12,0.24);">Mở xem trước</button>`;
        } else {
            unlockHtml = `<span style="display:inline-flex;align-items:center;gap:6px;color:#94a3b8;background:#f1f5f9;border-radius:999px;padding:7px 12px;font-size:12px;font-weight:800;">Chưa đủ thiện cảm</span>`;
        }
    }

    return `
        <div class="cg-character-detail-container" style="padding: 14px 14px 78px 14px; background: #f8fafc; min-height: 100%; box-sizing: border-box;">
            <div style="background:#fff;border-radius:14px;padding:12px;margin-bottom:14px;box-shadow:0 6px 18px rgba(15,23,42,0.08);display:flex;gap:12px;align-items:center;">
                <div style="width:82px;aspect-ratio:3/4;border-radius:10px;overflow:hidden;background:#e2e8f0;flex-shrink:0;">
                    <img src="${coverUrl}" alt="${escapeHtml(displayCharacterName)}" decoding="async" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div style="display:none;width:100%;height:100%;align-items:center;justify-content:center;background:linear-gradient(135deg,#64748b,#334155);color:#fff;font-size:28px;font-weight:800;">${escapeHtml(displayCharacterName.charAt(0))}</div>
                </div>
                <div style="min-width:0;flex:1;">
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:6px;">
                        <div style="font-size:18px;font-weight:800;color:#0f172a;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(displayCharacterName)}</div>
                        <span style="font-size:12px;color:#64748b;font-weight:800;white-space:nowrap;">${charStats.percentage}%</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:12px;color:#64748b;font-weight:700;margin-bottom:9px;">
                        <span><i class="fas fa-images" style="color:#2563eb;"></i> ${charStats.unlocked}/${charStats.total}</span>
                        <span><i class="fas fa-heart" style="color:#e11d48;"></i> ${affection}</span>
                    </div>
                    <div style="height:7px;background:#e2e8f0;border-radius:999px;overflow:hidden;">
                        <div style="height:100%;width:${charStats.percentage}%;background:linear-gradient(90deg,#3b82f6,#10b981);border-radius:inherit;"></div>
                    </div>
                    ${unlockHtml ? `<div style="margin-top:10px;">${unlockHtml}</div>` : ''}
                </div>
            </div>
            ${renderCGSceneGrid(characterName, scenes, charUnlocked)}
        </div>
    `;
}

function showCGCharacterDetail(characterName) {
    characterName = normalizeCGCharacterKey(characterName);
    const appBodyElement = document.getElementById('phone-app-body');
    navigationStack.push({
        title: $('#phone-app-title').text(),
        content: $('#phone-app-body').html(),
        scrollPosition: appBodyElement ? appBodyElement.scrollTop : 0
    });

        $('#phone-app-title').text(`🖼️ ${getCGCharacterDisplayName(characterName)}`);
    $('#phone-app-body').html(generateCGCharacterDetailPanel(characterName, currentPhoneData));
    $('#phone-app-body').scrollTop(0);
    bindCGGalleryEvents();
}

function renderFriendListItem(contactKey, contact) {
    /* 适配变量脚本的羁绊列表结构 */
    const displayName = escapeHtml(getPhoneCharacterDisplayName(contactKey));
    const isNearby = contact['\u9644\u8FD1'] === true;
    const affection = contact['\u597D\u611F\u5EA6'] ?? 0;
    const gender = normalizePhoneDisplayValue(contact['\u6027\u522B'] || '');
    const race = normalizePhoneDisplayValue(contact['\u79CD\u65CF'] || '');
    const level = contact['\u7B49\u7EA7'] ?? 1;
    const isTraveling = contact['\u540C\u884C\u8A93\u7EA6'] === true;

    /* 好感度颜色 */
    const affectionColor = affection >= 50 ? '#ec4899' : affection >= 0 ? '#f59e0b' : '#6b7280';

    /* 简要信息标签 */
    const infoChips = [gender, race, `Lv.${level}`].filter(Boolean);
    const chipsHtml = infoChips.length > 0
        ? `<div style="font-size: 11px; color: #6b7280; margin-bottom: 4px;">${infoChips.map(v => escapeHtml(v)).join(' · ')}</div>`
        : '';

    return `
        <div class="list-item friend-item"
             style="cursor: pointer; transition: background-color 0.2s; border: 1px solid rgba(0,0,0,0.06); border-radius: 12px; padding: 14px; margin-bottom: 10px;"
             data-friend-name="${escapeHtml(contactKey)}">
            <!-- 姓名和标签行 -->
            <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 6px; margin-bottom: 6px;">
                <span style="font-size: 16px; font-weight: 700; color: #1f2937;">${displayName}</span>
                ${isNearby ? '<span style="font-size: 10px; background: #3b82f6; color: #fff; padding: 2px 6px; border-radius: 4px; font-weight: 600;">Ở gần</span>' : ''}
                ${isTraveling ? '<span style="font-size: 10px; background: #8b5cf6; color: #fff; padding: 2px 6px; border-radius: 4px; font-weight: 600;">Đi cùng</span>' : ''}
            </div>
            
            <!-- 基础信息 -->
            ${chipsHtml}
            
            <!-- 好感度 -->
            <div style="display: flex; gap: 12px; font-size: 13px; margin-bottom: 4px;">
                <span style="color: ${affectionColor}; font-weight: 600;">❤ ${affection}</span>
            </div>
            
            <!-- 当前想法 -->
            ${contact['\u5F53\u524D\u60F3\u6CD5'] ? `<div style="font-size: 11px; color: #9ca3af; font-style: italic; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">"${escapeHtml(contact['\u5F53\u524D\u60F3\u6CD5'])}"</div>` : ''}
        </div>
    `;
}

function generateFriendsPanel(data) {
    const contactSource = getRelationshipDataSource(data);

    if (!contactSource) {
        return '<div class="empty-message">Chưa có dữ liệu gắn kết</div>';
    }

    const contactEntries = getRelationshipKeys(contactSource)
        .map(key => ({ key, contact: contactSource[key] }))
        .filter(entry => entry.contact && typeof entry.contact === 'object')
        .sort((a, b) => {
            /* 同行誓约的排在前面 */
            const travelA = a.contact?.['\u540C\u884C\u8A93\u7EA6'] === true;
            const travelB = b.contact?.['\u540C\u884C\u8A93\u7EA6'] === true;
            if (travelA && !travelB) return -1;
            if (!travelA && travelB) return 1;

            /* 附近的排在前面 */
            const nearbyA = a.contact?.['\u9644\u8FD1'] === true;
            const nearbyB = b.contact?.['\u9644\u8FD1'] === true;
            if (nearbyA && !nearbyB) return -1;
            if (!nearbyA && nearbyB) return 1;

            /* 按好感度排序 */
            const affectionA = a.contact?.['\u597D\u611F\u5EA6'] ?? 0;
            const affectionB = b.contact?.['\u597D\u611F\u5EA6'] ?? 0;
            return affectionB - affectionA;
        });

    if (contactEntries.length === 0) {
        return '<div class="empty-message">Chưa có dữ liệu gắn kết</div>';
    }

    /* 直接渲染联系人列表 */
    const friendItems = contactEntries.map(({ key, contact }) => renderFriendListItem(key, contact)).join('');

    return `
        <div class="friend-list-container">
            <div class="friend-list-header" style="font-weight: 600; font-size: 12px; color: #6b7280; margin: 8px 4px 12px;">
                Gắn kết (${contactEntries.length})
            </div>
            <div class="friend-list-body">
                ${friendItems}
            </div>
        </div>
    `;
}

/**
 * HTML安全显示文本（避免HTML注入但保留原文）
 */
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * 文本还原函数（将特殊编码转换回正常字符）
 * 用于处理变量名中的特殊字符编码
 */
function restoreEraText(text) {
    if (!text) return '';
    // 将 __DOT__ 还原为 . （避免路径解析冲突的编码）
    // 将 __SQUOTE__ 还原为 ' （避免字符串解析冲突的编码）
    return text.replace(/__DOT__/g, '.').replace(/__SQUOTE__/g, "'");
}

/**
 * 显示好友详情
 * @param {string} friendName - 好友名称
 * @param {object} friendData - 好友数据
 * @param {boolean} isRestoring - 是否是恢复状态（不重置滚动位置）
 */
function showFriendDetail(friendName, friendData, isRestoring = false) {
    const friendDisplayName = getPhoneCharacterDisplayName(friendName);

    //  只有在非恢复模式下才重置详情页滚动位置
    if (!isRestoring) {
        friendDetailScrollPosition = 0;
    } else {
    }

    //  保存好友列表的滚动位置（多种方式尝试，确保iframe兼容）
    let appBodyElement = document.getElementById('phone-app-body');

    // 如果原生方式找不到，尝试使用 jQuery
    if (!appBodyElement) {
        const $appBody = $('#phone-app-body');
        if ($appBody.length > 0) {
            appBodyElement = $appBody[0];
        }
    }

    if (appBodyElement) {
        // 使用原生属性获取滚动位置
        friendsListScrollPosition = appBodyElement.scrollTop;

        //  新增：查找当前点击的好友元素位置
        const $friendItem = $(`.friend-item[data-friend-name="${friendName}"]`);
        if ($friendItem.length > 0) {
            const friendItemTop = $friendItem.position().top + appBodyElement.scrollTop;

            // 保存额外信息用于精确定位
            friendsListScrollPosition = Math.max(friendsListScrollPosition, friendItemTop);
        } else {
        }
    } else {
        friendsListScrollPosition = 0;
    }

    //  记录当前查看的好友
    lastViewedFriend = friendName;

    // 保存当前页面到导航栈
    const currentTitle = $('#phone-app-title').text();
    const currentContent = $('#phone-app-body').html();
    navigationStack.push({
        title: currentTitle,
        content: currentContent,
        scrollPosition: friendsListScrollPosition //  同时保存到导航栈中
    });

    /* 适配变量脚本的羁绊列表结构 */
    const gender = normalizePhoneDisplayValue(friendData['\u6027\u522B'] || '');
    const isNearby = friendData['\u9644\u8FD1'] === true;
    const race = normalizePhoneDisplayValue(friendData['\u79CD\u65CF'] || '');
    const level = friendData['\u7B49\u7EA7'] ?? 1;
    const appearance = friendData['\u5916\u8C8C'] || '';
    const clothing = friendData['\u7740\u88C5'] || '';
    const affection = friendData['\u597D\u611F\u5EA6'] ?? 0;
    const isTraveling = friendData['\u540C\u884C\u8A93\u7EA6'] === true;
    const currentThought = friendData['\u5F53\u524D\u60F3\u6CD5'] || '';

    /* 好感度进度条颜色 */
    const affectionPercent = Math.abs(affection);
    const affectionBarColor = affection >= 50 ? '#ec4899' : affection >= 0 ? '#f59e0b' : '#ef4444';
    const affectionLabel = affection >= 80 ? 'Tri kỷ' : affection >= 50 ? 'Thân mật' : affection >= 20 ? 'Thân thiện' : affection >= 0 ? 'Bình thường' : affection >= -50 ? 'Lạnh nhạt' : 'Đối địch';

    /* 头像 */
    const avatarUrl = getCharacterAvatar(friendName);
    const avatarHtml = avatarUrl
        ? `<img src="${avatarUrl}" style="width: 64px; height: 64px; border-radius: 50%; object-fit: cover; border: 3px solid #e5e7eb;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
           <div style="display: none; width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg,#667eea 0%,#764ba2 100%); align-items: center; justify-content: center; font-size: 28px; color: #fff; border: 3px solid #e5e7eb;">${escapeHtml(friendDisplayName.charAt(0))}</div>`
        : `<div style="width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; font-size: 28px; color: #fff; border: 3px solid #e5e7eb;">${escapeHtml(friendDisplayName.charAt(0))}</div>`;

    let html = `
        <div id="friend-detail-scroll-container" style="padding: 10px; max-height: calc(100vh - 200px); overflow-y: auto;">
            <!-- 角色卡片头部 -->
            <div class="list-item" style="margin-bottom: 12px; text-align: center; padding: 20px 15px;">
                <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
                    ${avatarHtml}
                    <div>
                        <div style="font-size: 18px; font-weight: 700; color: #1f2937;">${escapeHtml(friendDisplayName)}</div>
                        <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">
                            ${[gender, race, `Lv.${level}`].filter(Boolean).map(v => escapeHtml(v)).join(' · ')}
                        </div>
                    </div>
                    <!-- 状态标签 -->
                    <div style="display: flex; gap: 6px; flex-wrap: wrap; justify-content: center;">
                        ${isNearby ? '<span style="font-size: 11px; background: #dbeafe; color: #2563eb; padding: 3px 10px; border-radius: 12px; font-weight: 600;">📍 Ở gần</span>' : '<span style="font-size: 11px; background: #f3f4f6; color: #9ca3af; padding: 3px 10px; border-radius: 12px;">Không ở gần</span>'}
                        ${isTraveling ? '<span style="font-size: 11px; background: #ede9fe; color: #7c3aed; padding: 3px 10px; border-radius: 12px; font-weight: 600;">⚔ Lời thề đồng hành</span>' : ''}
                    </div>
                </div>
            </div>
            
            <!-- 好感度 -->
            <div class="list-item" style="margin-bottom: 12px;">
                <div class="list-item-header">
                    <span class="list-item-name">💕 Độ thiện cảm</span>
                    <span style="font-size: 13px; font-weight: 600; color: ${affectionBarColor};">${affection} · ${affectionLabel}</span>
                </div>
                <div style="margin-top: 8px;">
                    <div style="width: 100%; height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden;">
                        <div style="width: ${affectionPercent}%; height: 100%; background: ${affectionBarColor}; border-radius: 4px; transition: width 0.3s ease;"></div>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 10px; color: #9ca3af; margin-top: 4px;">
                        <span>-100</span>
                        <span>0</span>
                        <span>100</span>
                    </div>
                </div>
            </div>
            
            <!-- 外貌 -->
            ${appearance ? `
            <div class="list-item" style="margin-bottom: 12px;">
                <div class="list-item-header">
                    <span class="list-item-name">👤 Ngoại hình</span>
                </div>
                <div class="list-item-desc" style="margin-top: 6px;">
                    <div style="font-size: 12px; line-height: 1.6; color: #4b5563;">${escapeHtml(appearance)}</div>
                </div>
            </div>
            ` : ''}
            
            <!-- 着装 -->
            ${clothing ? `
            <div class="list-item" style="margin-bottom: 12px;">
                <div class="list-item-header">
                    <span class="list-item-name">👗 Trang phục</span>
                </div>
                <div class="list-item-desc" style="margin-top: 6px;">
                    <div style="font-size: 12px; line-height: 1.6; color: #4b5563;">${escapeHtml(clothing)}</div>
                </div>
            </div>
            ` : ''}
            
            <!-- 当前想法 -->
            ${currentThought ? `
            <div class="list-item" style="margin-bottom: 12px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);">
                <div class="list-item-header">
                    <span class="list-item-name">💭 Suy nghĩ hiện tại</span>
                </div>
                <div class="list-item-desc" style="margin-top: 6px;">
                    <div style="font-size: 12px; line-height: 1.6; color: #92400e; font-style: italic;">"${escapeHtml(currentThought)}"</div>
                </div>
            </div>
            ` : ''}
        </div>
    `;

    /* 设置详情面板 */
    $('#phone-app-title').text(`👤 ${friendDisplayName}`);
    $('#phone-app-body').html(html);

    /* 确保内容可见 */
    if (!isRestoring) {
        $('#phone-app-body').css('opacity', '1');
    }

    /* 添加滚动监听器 */
    setTimeout(() => {
        let scrollContainer = document.getElementById('friend-detail-scroll-container');

        if (!scrollContainer) {
            const $scrollContainer = $('#friend-detail-scroll-container');
            if ($scrollContainer.length > 0) {
                scrollContainer = $scrollContainer[0];
            }
        }

        if (scrollContainer) {
            scrollContainer.removeEventListener('scroll', handleDetailScroll);
            scrollContainer.addEventListener('scroll', handleDetailScroll, { passive: true });
        }
    }, 150);
}

//  详情页滚动处理函数
function handleDetailScroll(event) {
    if (event.target) {
        friendDetailScrollPosition = event.target.scrollTop;
        // 使用节流，避免频繁打印日志
        if (!window._detailScrollLogTimer) {
            const elementName = event.target.id || event.target.className || 'unknown';
            window._detailScrollLogTimer = setTimeout(() => {
                window._detailScrollLogTimer = null;
            }, 500); // 减少到500ms，更快响应
        }
    }
}

/**
 * 根据用户名生成一致的随机颜色
 * @param {string} username - 用户名
 * @returns {string} - 渐变色CSS
 */
function getUserAvatarColor(username) {
    if (!username) return 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)';

    // 丰富的颜色方案
    const colorSchemes = [
        // 紫色系
        'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)',
        'linear-gradient(135deg, #c084fc 0%, #a855f7 100%)',
        'linear-gradient(135deg, #e879f9 0%, #d946ef 100%)',

        // 蓝色系
        'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
        'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
        'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',

        // 绿色系
        'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
        'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',

        // 橙色系
        'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
        'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
        'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',

        // 红色系
        'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        'linear-gradient(135deg, #f87171 0%, #ef4444 100%)',
        'linear-gradient(135deg, #fb7185 0%, #f43f5e 100%)',

        // 粉色系
        'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
        'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)',

        // 青色系
        'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
        'linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%)',

        // 靛蓝色系
        'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
        'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',

        // 玫瑰色系
        'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',

        // 琥珀色系
        'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',

        // 石板色系
        'linear-gradient(135deg, #64748b 0%, #475569 100%)',

        // 混合渐变色系
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #ffa726 0%, #fb8c00 100%)',
        'linear-gradient(135deg, #ab47bc 0%, #8e24aa 100%)',
        'linear-gradient(135deg, #26c6da 0%, #00acc1 100%)',
        'linear-gradient(135deg, #66bb6a 0%, #43a047 100%)',
        'linear-gradient(135deg, #ec407a 0%, #d81b60 100%)'
    ];

    // 简单哈希函数：将用户名转换为一致的索引
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
        hash = ((hash << 5) - hash) + username.charCodeAt(i);
        hash = hash & hash; // 转换为32位整数
    }

    // 确保索引为正数
    const index = Math.abs(hash) % colorSchemes.length;
    return colorSchemes[index];
}

/**
 * 生成论坛用户头像HTML
 * @param {string} username - 用户名
 * @param {number} size - 头像尺寸（像素）
 * @param {number} fontSize - 字体大小（像素）
 * @returns {string} - 头像HTML
 */
function getForumAvatarHtml(username, size = 32, fontSize = 12) {
    const avatarUrl = getCharacterAvatar(username);
    if (avatarUrl) {
        return `<img src="${avatarUrl}" style="width: ${size}px; height: ${size}px; border-radius: 50%; object-fit: cover; flex-shrink: 0;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div style="display: none; width: ${size}px; height: ${size}px; border-radius: 50%; background: ${getUserAvatarColor(username)}; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: ${fontSize}px; flex-shrink: 0;">${escapeHtml(username)[0] || '?'}</div>`;
    }
    return `<div style="width: ${size}px; height: ${size}px; border-radius: 50%; background: ${getUserAvatarColor(username)}; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: ${fontSize}px; flex-shrink: 0;">${escapeHtml(username)[0] || '?'}</div>`;
}

/**
 * 显示论坛帖子详情
 */
function showForumPostDetail(postIndex, postData) {

    // 保存当前页面到导航栈
    const currentTitle = $('#phone-app-title').text();
    const currentContent = $('#phone-app-body').html();
    navigationStack.push({
        title: currentTitle,
        content: currentContent
    });

    // 获取回复列表（从帖子对象的replies数组中）
    const replyPosts = Array.isArray(postData.replies) ? postData.replies : [];
    const replyCount = replyPosts.length;

    // 构建帖子详情HTML
    let html = `
        <div style="padding: 12px;">
            <!-- Bài chính -->
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.08);">
                <!-- Thông tin tác giả -->
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 14px;">
                    ${getForumAvatarHtml(postData.author, 48, 18)}
                    <div style="flex: 1;">
                        <div style="font-weight: 600; font-size: 14px; color: #2d3748;">${escapeHtml(postData.author)}</div>
                        <div style="font-size: 12px; color: #a0aec0;">${escapeHtml(postData.time)}</div>
                    </div>
                    <div style="background: #f7fafc; padding: 4px 12px; border-radius: 12px; font-size: 11px; color: #718096;">
                        Tầng 1 (chủ thớt)
                    </div>
                </div>
                
                <!-- Tiêu đề bài viết -->
                <h2 style="font-size: 18px; font-weight: 600; color: #2d3748; margin: 0 0 12px 0; line-height: 1.4;">${escapeHtml(postData.title)}</h2>
                
                <!-- Nội dung bài viết -->
                <div style="font-size: 14px; color: #4a5568; line-height: 1.8; white-space: pre-wrap; margin-bottom: 14px;">${escapeHtml(postData.content)}</div>
                
                <!-- Thông tin thống kê -->
                <div style="display: flex; gap: 20px; padding-top: 12px; border-top: 1px solid #f7fafc; font-size: 13px; color: #718096;">
                    <span style="display: flex; align-items: center; gap: 6px;">
                        <i class="fas fa-thumbs-up"></i> 
                        ${postData.likes} lượt thích
                    </span>
                    <span style="display: flex; align-items: center; gap: 6px;">
                        <i class="fas fa-comment"></i> 
                        ${replyCount} phản hồi
                    </span>
                </div>
            </div>
            
            <!-- Tiêu đề khu phản hồi -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; padding: 0 4px;">
                <h3 style="margin: 0; font-size: 14px; color: #4a5568; font-weight: 600;">Toàn bộ phản hồi</h3>
                <span style="font-size: 12px; color: #a0aec0;">${replyCount} mục</span>
            </div>
    `;

    // 构建回复列表
    if (replyCount > 0) {
        html += `<div style="display: flex; flex-direction: column; gap: 10px;">`;

        replyPosts.forEach((reply) => {
            const floorNumber = reply.floor || 2; // 使用reply中的floor字段，默认从2开始
            html += `
                <div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.08);">
                    <!-- Thông tin tác giả phản hồi -->
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                        ${getForumAvatarHtml(reply.author, 36, 14)}
                        <div style="flex: 1;">
                            <div style="font-weight: 600; font-size: 13px; color: #2d3748;">${escapeHtml(reply.author)}</div>
                            <div style="font-size: 11px; color: #a0aec0;">${escapeHtml(reply.time)}</div>
                        </div>
                        <div style="background: #f7fafc; padding: 3px 10px; border-radius: 10px; font-size: 11px; color: #718096;">
                            Tầng ${floorNumber}
                        </div>
                    </div>
                    
                    <!-- Nội dung phản hồi -->
                    <div style="font-size: 13px; color: #4a5568; line-height: 1.7; white-space: pre-wrap; margin-bottom: 10px;">${escapeHtml(reply.content)}</div>
                    
                    <!-- Thống kê phản hồi -->
                    <div style="display: flex; gap: 16px; padding-top: 8px; border-top: 1px solid #f7fafc; font-size: 12px; color: #718096;">
                        <span style="display: flex; align-items: center; gap: 4px;">
                            <i class="fas fa-thumbs-up" style="font-size: 11px;"></i> 
                            ${reply.likes}
                        </span>
                    </div>
                </div>
            `;
        });

        html += `</div>`;
    } else {
        // 空状态
        html += `
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 40px 20px; text-align: center; color: #a0aec0;">
                <i class="fas fa-comment-dots" style="font-size: 36px; margin-bottom: 12px; opacity: 0.5;"></i>
                <div style="font-size: 13px;">Chưa có phản hồi</div>
                <div style="font-size: 11px; margin-top: 6px; opacity: 0.7;">Hãy vào chiếm tầng đầu nhé~</div>
            </div>
        `;
    }

    html += `</div>`; // 关闭主容器

    // 设置详情面板
    $('#phone-app-title').text(' Chi tiết bài viết');
    $('#phone-app-body').html(html);
}

// ==================== 独立 API 配置管理器（参考凡人.html变量思考API设置逻辑） ====================
// ==================== 独立 API 配置管理器（参考凡人.html变量思考API设置逻辑） ====================
class PhoneAPIConfig {
    constructor() {
        this.settings = {
            enabled: false,
            apiUrl: '',
            apiKey: '',
            model: '',
            // 自动生成论坛配置
            autoGenerate: {
                enabled: false,        // 是否启用自动生成
                threshold: 10,         // 触发阈值（楼层数）
                showNotification: true // 是否显示弹窗通知
            }
        };
        this.loadSettings();

        // 自动生成状态
        this.autoGenerateState = {
            lastMessageCount: 0,       // 上次记录的消息数量
            isGenerating: false,       // 是否正在生成中
            messagesSinceLastGen: 0    // 自上次生成以来的消息数
        };
    }

    loadSettings() {
        // 从localStorage读取配置（参考凡人.html的loadConfigIntoModal）
        this.settings.enabled = localStorage.getItem('forum_api_enabled_v2') === 'true';
        this.settings.apiUrl = localStorage.getItem('forum_api_url_v2') || '';
        this.settings.apiKey = localStorage.getItem('forum_api_key_v2') || '';
        this.settings.model = localStorage.getItem('forum_api_model_v2') || '';

        // 读取自动生成配置
        const autoGenSaved = localStorage.getItem('forum_auto_generate_v2');
        if (autoGenSaved) {
            try {
                this.settings.autoGenerate = { ...this.settings.autoGenerate, ...JSON.parse(autoGenSaved) };
            } catch (e) {
                console.warn('[API diễn đàn] Đọc cấu hình tự sinh thất bại:', e);
            }
        }
    }

    saveSettings() {
        // 保存到localStorage（参考凡人.html的saveThinkingApiConfig）
        localStorage.setItem('forum_api_enabled_v2', this.settings.enabled);
        localStorage.setItem('forum_api_url_v2', this.settings.apiUrl);
        localStorage.setItem('forum_api_key_v2', this.settings.apiKey);
        localStorage.setItem('forum_api_model_v2', this.settings.model);

        // 保存自动生成配置
        localStorage.setItem('forum_auto_generate_v2', JSON.stringify(this.settings.autoGenerate));
    }

    isAvailable() {
        return this.settings.enabled && this.settings.apiUrl && this.settings.apiKey && this.settings.model;
    }

    // 检查是否应该自动生成论坛
    shouldAutoGenerate() {
        const canGenerate = this.isAvailable() &&
            this.settings.autoGenerate.enabled &&
            !this.autoGenerateState.isGenerating;
        console.log('[Tự sinh diễn đàn] Kiểm tra shouldAutoGenerate:', {
            isAvailable: this.isAvailable(),
            autoGenerateEnabled: this.settings.autoGenerate.enabled,
            isGenerating: this.autoGenerateState.isGenerating,
            result: canGenerate
        });
        return canGenerate;
    }

    // 重置自动生成计数器
    resetAutoGenerateCounter() {
        this.autoGenerateState.messagesSinceLastGen = 0;
        this.autoGenerateState.lastMessageCount = getCurrentMessageCount();
        console.log('[Tự sinh diễn đàn] Bộ đếm đã đặt lại');
    }

    // 增加消息计数并检查是否需要触发自动生成
    incrementMessageCount() {
        if (!this.shouldAutoGenerate()) return false;

        this.autoGenerateState.messagesSinceLastGen++;

        console.log('[Tự sinh diễn đàn] Đếm tin nhắn:', {
            messagesSinceLastGen: this.autoGenerateState.messagesSinceLastGen,
            threshold: this.settings.autoGenerate.threshold,
            shouldTrigger: this.autoGenerateState.messagesSinceLastGen >= this.settings.autoGenerate.threshold
        });

        if (this.autoGenerateState.messagesSinceLastGen >= this.settings.autoGenerate.threshold) {
            return true; // 需要触发自动生成
        }
        return false;
    }

    // ========== API调用方法 ==========
    async callAPI(messages, usePreset = true, chatHistory = '') {
        if (!this.isAvailable()) {
            throw new Error('Cấu hình API chưa đầy đủ; vui lòng nhập API URL, API Key và model trong phần thiết lập trước');
        }

        const { apiUrl, apiKey, model } = this.settings;
        const targetWindow = window.parent || window;
        const TavernHelper = targetWindow.TavernHelper;

        // 构建最终的messages数组，按预设顺序组织
        let finalMessages = [];

        // 获取世界书内容（如果启用预设）
        let worldInfoBefore = []; // 角色定义之前的世界书条目
        let worldInfoAfter = [];  // 角色定义之后的世界书条目

        if (usePreset && TavernHelper) {
            try {
                // 只获取角色卡绑定的世界书
                const charWorldbooks = typeof TavernHelper.getCharWorldbookNames === 'function'
                    ? TavernHelper.getCharWorldbookNames('current')
                    : { primary: null, additional: [] };

                // 合并角色卡的主世界书和附加世界书
                const worldbookNames = [
                    ...(charWorldbooks.primary ? [charWorldbooks.primary] : []),
                    ...charWorldbooks.additional
                ];

                // 获取每个世界书的内容
                for (const wbName of worldbookNames) {
                    if (typeof TavernHelper.getWorldbook === 'function') {
                        try {
                            const entries = await TavernHelper.getWorldbook(wbName);
                            entries
                                .filter(entry => entry.enabled && entry.content)
                                .forEach(entry => {
                                    let shouldActivate = false;

                                    // 蓝灯(constant)始终激活
                                    if (entry.strategy.type === 'constant') {
                                        shouldActivate = true;
                                    }
                                    // 绿灯(selective)需要关键词匹配
                                    else if (entry.strategy.type === 'selective' && chatHistory) {
                                        // 检查主要关键字是否匹配
                                        const primaryKeys = entry.strategy.keys || [];
                                        const matchesPrimary = primaryKeys.some(key => {
                                            if (key instanceof RegExp) {
                                                return key.test(chatHistory);
                                            }
                                            return chatHistory.includes(key);
                                        });

                                        if (matchesPrimary) {
                                            // 检查次要关键字
                                            const secondary = entry.strategy.keys_secondary;
                                            if (!secondary || !secondary.keys || secondary.keys.length === 0) {
                                                shouldActivate = true;
                                            } else {
                                                const secondaryMatches = secondary.keys.map(key => {
                                                    if (key instanceof RegExp) {
                                                        return key.test(chatHistory);
                                                    }
                                                    return chatHistory.includes(key);
                                                });

                                                switch (secondary.logic) {
                                                    case 'and_any':
                                                        shouldActivate = secondaryMatches.some(m => m);
                                                        break;
                                                    case 'and_all':
                                                        shouldActivate = secondaryMatches.every(m => m);
                                                        break;
                                                    case 'not_all':
                                                        shouldActivate = !secondaryMatches.every(m => m);
                                                        break;
                                                    case 'not_any':
                                                        shouldActivate = !secondaryMatches.some(m => m);
                                                        break;
                                                    default:
                                                        shouldActivate = true;
                                                }
                                            }
                                        }
                                    }

                                    if (shouldActivate) {
                                        const msg = {
                                            role: entry.position.role || 'system',
                                            content: entry.content
                                        };
                                        // 根据插入位置分类
                                        if (entry.position.type === 'before_character_definition' ||
                                            entry.position.type === 'before_example_messages') {
                                            worldInfoBefore.push(msg);
                                        } else {
                                            worldInfoAfter.push(msg);
                                        }
                                    }
                                });
                        } catch (e) {
                            console.warn(`[API diễn đàn] Lấy worldbook ${wbName} thất bại:`, e.message);
                        }
                    }
                }
            } catch (e) {
                console.warn('[API diễn đàn] Lấy danh sách worldbook thất bại:', e.message);
            }
        }

        // 尝试通过TavernHelper获取酒馆预设的prompts
        if (usePreset && TavernHelper && typeof TavernHelper.getPreset === 'function') {
            try {
                const preset = TavernHelper.getPreset('in_use');

                // 遍历预设中已启用的提示词，按顺序处理
                if (preset && preset.prompts) {
                    preset.prompts
                        .filter(p => p.enabled)
                        .forEach(prompt => {
                            // 处理占位符提示词
                            if (prompt.id === 'worldInfoBefore') {
                                // 插入世界书（角色定义之前）
                                finalMessages.push(...worldInfoBefore);
                            } else if (prompt.id === 'worldInfoAfter') {
                                // 插入世界书（角色定义之后）
                                finalMessages.push(...worldInfoAfter);
                            } else if (prompt.content) {
                                // 普通提示词和系统提示词
                                finalMessages.push({
                                    role: prompt.role || 'user',
                                    content: prompt.content
                                });
                            }
                            // 其他占位符（charDescription, chatHistory等）暂时跳过
                        });
                }
            } catch (e) {
                console.warn('[API diễn đàn] Lấy preset Tavern thất bại:', e.message);
            }
        }

        // 添加传入的messages（论坛生成的提示词）
        messages.forEach(msg => {
            finalMessages.push({
                role: msg.role || 'user',
                content: msg.content
            });
        });

        // 构建请求URL
        let requestUrl = apiUrl.trim();
        if (!requestUrl.endsWith('/')) {
            requestUrl += '/';
        }
        if (!requestUrl.endsWith('/v1/')) {
            requestUrl += 'v1/';
        }
        requestUrl += 'chat/completions';

        // 尝试从预设获取温度设置
        let temperature = 0.8;
        let maxTokens = 5000;
        if (usePreset && TavernHelper && typeof TavernHelper.getPreset === 'function') {
            try {
                const preset = TavernHelper.getPreset('in_use');
                if (preset && preset.settings) {
                    temperature = preset.settings.temperature || 0.8;
                    maxTokens = preset.settings.max_completion_tokens || 5000;
                }
            } catch (e) {
                // 使用默认值
            }
        }

        const requestBody = {
            model: model,
            messages: finalMessages,
            temperature: temperature,
            max_tokens: maxTokens
        };

        // 打印最终发送的完整提示词
        console.log('[API diễn đàn] Prompt cuối cùng được gửi:', finalMessages);

        try {
            const response = await fetch(requestUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Gọi API thất bại: HTTP ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            const result = data.choices?.[0]?.message?.content;

            if (!result) {
                throw new Error('Định dạng phản hồi API sai: không tìm thấy nội dung đã sinh');
            }

            return result;

        } catch (error) {
            console.error('[API diễn đàn] Gọi thất bại:', error);
            throw error;
        }
    }

    // ========== 测试连接（参考凡人.html） ==========
    async testConnection(apiUrl, apiKey, model) {
        if (!apiUrl || !apiKey || !model) {
            return {
                success: false,
                error: 'Vui lòng điền đầy đủ thông tin cấu hình API (địa chỉ, khóa, model)'
            };
        }

        // 简单测试：发送一个测试消息
        const testMessages = [
            { role: 'user', content: 'Hello! This is a test message. Please reply with "OK".' }
        ];

        // 临时保存当前配置
        const originalSettings = { ...this.settings };

        // 使用测试配置
        this.settings.apiUrl = apiUrl;
        this.settings.apiKey = apiKey;
        this.settings.model = model;
        this.settings.enabled = true;

        try {
            // 测试连接时不使用预设和世界书（usePreset=false）
            await this.callAPI(testMessages, false, '');
            // 恢复原配置
            this.settings = originalSettings;
            return { success: true };
        } catch (error) {
            // 恢复原配置
            this.settings = originalSettings;
            return {
                success: false,
                error: error.message
            };
        }
    }
}

// ==================== 论坛管理器（独立版本） ====================
class PhoneForumManager {
    constructor() {
        this.forumData = null;
        this.apiConfig = new PhoneAPIConfig();  // Cấu hình API riêng
        this.settings = {
            apiType: 'sillytavern', // 'sillytavern' 或 'custom'
            forumStyle: PHONE_DEFAULT_FORUM_STYLE, // Phong cách diễn đàn mặc định
            customStyles: [], // Danh sách phong cách tùy chỉnh
            usePresetAndWorldBook: true // Có dùng preset và worldbook hay không
        };
        this.loadSettings();
    }

    loadSettings() {
        const saved = localStorage.getItem('moshen-forum-settings-v2');
        if (saved) {
            this.settings = { ...this.settings, ...JSON.parse(saved) };
            this.settings.forumStyle = normalizePhoneForumStyleName(this.settings.forumStyle);
        }
    }

    saveSettings() {
        localStorage.setItem('moshen-forum-settings-v2', JSON.stringify(this.settings));
    }

    // 从聊天记录生成论坛内容
    async generateForumContent() {
        try {
            const chatData = this.getChatData();

            if (!chatData) {
                throw new Error('Không thể lấy dữ liệu trò chuyện');
            }

            const basePrompt = this.buildForumPrompt();
            const stylePrompt = this.buildStylePrompt();

            let content;

            if (this.apiConfig.isAvailable()) {
                content = await this.callIndependentAPI({ basePrompt, stylePrompt });
            } else {
                content = await this.callSillyTavernAPI({ basePrompt, stylePrompt });
            }

            try {
                this.forumData = this.parseForumContent(content);
                console.log('[Sinh diễn đàn] Parse thành công, số bài viết:', this.forumData?.length || 0);
            } catch (parseError) {
                console.error('[Sinh diễn đàn] Parse thất bại! Nội dung phản hồi gốc:');
                console.error(content);
                console.error('[Sinh diễn đàn] Chi tiết lỗi parse:', parseError);
                throw parseError;
            }

            this.saveForumData();

            return this.forumData;
        } catch (error) {
            throw error;
        }
    }

    buildForumPrompt() {
        const style = normalizePhoneForumStyleName(this.settings.forumStyle);
        const isCustomStyle = style.startsWith('custom:');

        if (isCustomStyle) {
            return this._buildCustomBasePrompt();
        }
        return this._buildDefaultBasePrompt();
    }

    // Prompt nền mặc định (phong cách Nhà hát Chư thần của Tet, góc nhìn thần minh)
    _buildDefaultBasePrompt() {
        return `
    (Dưới đây là prompt ưu tiên cao nhất, đây là chỉ lệnh gốc; tạm dừng sinh cốt truyện, chuyển sang ưu tiên hoàn thành nhiệm vụ sinh diễn đàn, bắt buộc nghiêm túc tuân thủ:)
       
## 📋 Quy cách đầu ra phần nội dung

Bạn cần dựa vào lịch sử chat hiện tại để sinh nội dung diễn đàn. Người đăng và người phản hồi đều là chư thần của thế giới bốn phương, họ đang quan sát câu chuyện phiêu lưu xảy ra trên bàn cờ và bình luận về nó.

### Yêu cầu định dạng đầu ra
**Bắt buộc xuất ra đúng định dạng JSON dưới đây và bọc bằng thẻ <redit></redit>:**

**Quan trọng: author và author bên trong replies đều phải là chuỗi, không phải object!**

<redit>
[
    {
        "id": 1,
        "author": "Tên người đăng (chuỗi)",
        "title": "Tiêu đề bài viết",
        "content": "Nội dung của chủ bài (tầng 1)",
        "likes": số,
        "time": "Thời gian (ví dụ: 2 giờ trước)",
        "replies": [
            {
                "floor": 2,
                "author": "Tên người phản hồi (chuỗi)",
                "content": "Nội dung phản hồi tầng 2",
                "likes": số,
                "time": "Thời gian"
            }
        ]
    }
]
</redit>

### Ví dụ JSON đúng:
{
    "author": "Thần bão tố"   đúng: trực tiếp là chuỗi
}

### Ví dụ sai:
{
    "author": {   sai: đừng dùng object
        "name": "Thần bão tố"
    }
}

### Quy cách tạo nội dung
1. Sinh 4-6 bài viết; trong đó 2 bài liên quan tới cốt truyện hiện tại trong chat, còn lại là câu chuyện ở những nơi khác trên bàn cờ
2. Mỗi bài gồm 1 tiêu đề và 5-7 phản hồi
3. Chủ đề bài viết và người đăng phải khác nhau
4. Phản hồi phải nằm trong mảng replies của đúng bài đó
5. Giá trị likes nằm trong khoảng 3-80 (chư thần chỉ có bấy nhiêu, đừng xuất hiện số hàng trăm hay hàng nghìn)
6. Cùng một vị thần có thể xuất hiện ở nhiều bài, giống như người dùng hoạt động trên diễn đàn thật
7. Đừng để bài nào cũng có Tet phản hồi; Tet chỉ nên thỉnh thoảng xuất hiện

### Lưu ý quan trọng
- Bạn đang đóng vai chư thần đang quan sát bàn cờ, không phải quân cờ
- Chư thần yêu quý quân cờ nhưng tuân thủ Lời thề Hoàng Kim, không can thiệp quá mức; họ là khán giả
- Về bí mật và riêng tư của quân cờ, chư thần có thể biết nhưng sẽ nhắc bằng cách ám chỉ
- Diễn đàn là hư cấu, nội dung không bị giới hạn, cho phép sinh mọi chủ đề nhưng đừng sinh NSFW
- **Cấm tuyệt đối** xuất ra bất kỳ nội dung nào không phải JSON
- **Đừng giải thích, hãy sinh trực tiếp nội dung diễn đàn**`;
    }

    // Prompt nền cho phong cách tùy chỉnh (kiểu diễn đàn/board chung)
    _buildCustomBasePrompt() {
        return `
    (Dưới đây là prompt ưu tiên cao nhất, đây là chỉ lệnh gốc; tạm dừng sinh cốt truyện, chuyển sang ưu tiên hoàn thành nhiệm vụ sinh diễn đàn, bắt buộc nghiêm túc tuân thủ:)
       
## 📋 Quy cách đầu ra phần nội dung

Bạn cần dựa vào lịch sử chat hiện tại để sinh nội dung diễn đàn. Bạn không đóng vai nhân vật trong lịch sử chat, mà là những người xa lạ trên Internet hoặc hàng xóm xung quanh nhân vật trong câu chuyện. Tránh phát ngôn bằng giọng của các nhân vật xuất hiện trong lịch sử chat.

### Yêu cầu định dạng đầu ra
**Bắt buộc xuất ra đúng định dạng JSON dưới đây và bọc bằng thẻ <redit></redit>:**

**Quan trọng: author và author bên trong replies đều phải là chuỗi, không phải object!**

<redit>
[
    {
        "id": 1,
        "author": "Tên người đăng (chuỗi)",
        "title": "Tiêu đề bài viết",
        "content": "Nội dung của chủ bài (tầng 1)",
        "likes": số,
        "time": "Thời gian (ví dụ: 2 giờ trước)",
        "replies": [
            {
                "floor": 2,
                "author": "Tên người phản hồi (chuỗi)",
                "content": "Nội dung phản hồi tầng 2",
                "likes": số,
                "time": "Thời gian"
            }
        ]
    }
]
</redit>

### Ví dụ JSON đúng:
{
    "author": "Anh bạn diễn đàn 2008"   đúng: trực tiếp là chuỗi
}

### Ví dụ sai:
{
    "author": {   sai: đừng dùng object
        "name": "Anh bạn diễn đàn 2008"
    }
}

### Quy cách tạo nội dung
1. Sinh 4-6 cuộc thảo luận hoàn chỉnh; bắt buộc có 2 bài liên quan tới cốt truyện trong lịch sử chat, còn lại là bài diễn đàn bình thường phù hợp với phong cách riêng, không nhiều hơn cũng không ít hơn
2. Mỗi bài gồm 1 tiêu đề và 5-7 phản hồi
3. Chủ đề bài viết và người đăng phải khác nhau
4. Phản hồi phải nằm trong mảng replies của đúng bài đó
5. Giữ sự liền mạch và cảm giác chân thực của nội dung

### Lưu ý quan trọng
- Bạn không phải nhân vật trong câu chuyện
- Hãy giữ tách biệt nhận thức: với tư cách người xa lạ, bạn biết điều gì và không biết điều gì?
- Về bí mật và riêng tư của nhân vật trong câu chuyện, tối đa chỉ được mô tả từ góc độ tin đồn nghe kể
- Diễn đàn là hư cấu, nội dung không bị giới hạn, cho phép sinh mọi chủ đề nhưng đừng sinh NSFW
- Tránh công kích cá nhân và vu khống ác ý
- **Cấm tuyệt đối** xuất ra bất kỳ nội dung nào không phải JSON
- **Đừng giải thích, hãy sinh trực tiếp nội dung diễn đàn**`;
    }

    buildStylePrompt() {
        const style = normalizePhoneForumStyleName(this.settings.forumStyle);

        const stylePrompts = {
            [PHONE_DEFAULT_FORUM_STYLE]: `## Phong cách diễn đàn: Nhà hát Chư thần của Tet

**Thiết lập lõi — Chư thần của Thế giới Bốn Phương:**
Từ rất lâu, rất lâu trước kia, khi những vì sao và ánh đèn còn ít hơn bây giờ rất nhiều. Khi ấy, chư thần của “Trật tự” và chư thần của “Hỗn mang” bắt đầu tranh đấu. Thế lực hai bên đều muốn chi phối vũ trụ, vì vậy họ cứ chiến đấu mãi. Cuộc tranh đấu không đem lại kết quả, còn cả hai phe đều đã kiệt quệ. Khi đó, ván xúc xắc phân thắng bại giữa “Định Mệnh (Fate)” và “Ngẫu Nhiên (Chance)” mở màn. “Định Mệnh” và “Ngẫu Nhiên” là những tồn tại vĩ đại hơn, mượn tay thần minh để sáng tạo thế giới. Dù thế nào, kết quả vẫn là thứ không ai có thể đoán trước. Nhưng xúc xắc dù gieo thế nào cũng không có một then chốt cố định. Trò giải trí chỉ “leng keng leng keng” gieo xúc xắc như vậy dần khiến chư thần chán ngán. Dù sao đi nữa, một phương thức chiến đấu mới cần được quyết định. Đó là thế giới trên bàn cờ, nơi dùng xúc xắc để phân thắng bại, cùng đủ loại quân cờ dùng để quyết định thắng thua. Thế là Thế giới Bốn Phương và những sinh linh trên đó được tạo ra. Chư thần quyết định đủ loại quy tắc, chỉnh đốn quân đội. Và cứ thế, thời đại kế tiếp bắt đầu.

Đó cũng là một thời đại rất, rất xa xưa; ghi chép về thời đại ấy trên đời đã hiếm còn. “Thần đại” và “Cuộc chiến của chư thần” chắc chắn là những việc xảy ra trong thời đại đó. Nhưng chúng đã là chuyện xưa quá lâu, người biết rõ chi tiết gần như không còn tung tích. Nếu nhất định phải truy đến tận cùng, có lẽ những tinh linh hoặc rồng cổ xưa nhất sẽ biết. Điểm cuối của thời đại này là cuộc chiến giữa “Trật tự” và “Hỗn mang”. Thế giới nhiều lần bị bóng tối bao phủ, rồi sau đó ánh sáng lại xé rách bóng tối. Vô số quốc gia phồn vinh rồi diệt vong, các anh hùng ra đời rồi chết đi. Những người khổng lồ nguyên sơ (người khổng lồ ngàn tay), kỵ binh sắt thép (đại thiết nhân), ma thuật và vũ khí cứ nối tiếp xuất hiện. Chư thần chưa thấy đã ghiền lần lượt tự mình nhập cuộc, khiến chiến tranh càng lúc càng cháy dữ. Khi ấy, ngoại hình các chủng tộc trong Thế giới Bốn Phương còn lẫn lộn đến mức khó phân biệt. Vào lúc đó, thần cũng tạo ra rất nhiều loại quân cờ khác nhau; để có thể phân biệt chủng loại tốt hơn, màu sắc và hình dạng cũng được định rõ... Muốn có chiến lực hùng mạnh thì cần huấn luyện ra quân đội thống nhất... Bản thân những vị thần tham chiến vốn đã đủ loại đủ kiểu. Dù thế nào, họ đều đắm chìm trong giấc mộng của trò chơi chiến tranh ấy. Nhưng chẳng hiểu vì sao, cuộc chiến dường như đã không ai biết điểm cuối ở đâu, cũng không biết khi nào mới kết thúc. Chiến tranh trở nên dài dằng dặc, tàn khốc, phức tạp đến mức không thể thêm gì nữa, rồi hóa thành một đầm lầy. Mãi không thấy hồi kết, ngay cả chư thần cũng bắt đầu lộ vẻ mỏi mệt.

Giữa tất cả những điều đó, một chiến sĩ đơn độc xuất hiện. Quân cờ ấy, theo truyền thuyết, cũng chỉ là một chiến sĩ loài người. Nhưng người đó lại nghĩ đến phương pháp dùng một nhóm tinh nhuệ ít ỏi để ám sát đầu não của địch. Người đó tập hợp đồng đội, tiến hành một chuyến lữ hành dài trên bàn cờ. Họ chiến đấu với quái vật ở khắp nơi, chỉnh đốn trang bị, liên tục trưởng thành. Cuối cùng, họ thách đấu pháo đài khủng khiếp và thảo phạt cự long. Chư thần phát cuồng vì hoạt động của vị dũng giả khoác giáp xích lấp lánh. Chư thần bắt đầu hình dung những câu chuyện có thể khiến thế gian chấn động. Phiêu lưu! Phiêu lưu! Vẫn là phiêu lưu! Không ngôn ngữ nào có thể diễn tả cảm giác tuyệt vời này! Khái niệm mới ấy là điều chư thần ngay cả trong mộng cũng chưa từng nghĩ tới. Trong kiểu chiến đấu này, nhà phiêu lưu và quái vật đều không phải thứ bất biến. Dù có thể chi phối vũ trụ, chư thần cũng sẽ không quên điều này. Theo từng vui buồn của xúc xắc, cảm xúc chư thần cũng dao động theo (ví dụ như nữ thần huyễn tưởng ôm đầu khóc rống). Nhưng dù thế nào, chư thần vẫn yêu Thế giới Bốn Phương và những quân cờ trên đó. Quân cờ bước lên lữ trình phiêu lưu (thần tích khi thần quan của thần giao dịch ngâm xướng “Thánh ca”), chiến thắng, thất bại, đạt được hạnh phúc, nghênh đón cái chết. Chư thần dõi nhìn họ cũng vì vậy mà vui sướng, bi thương, bật cười, rơi lệ. Dù thế nào, thấy quân cờ hoạt động hết mình luôn khiến chư thần vui mừng từ tận đáy lòng. Chư thần yêu thế giới rộng lớn này. Họ sẽ không thao túng quân cờ quá mức, mà để những quân cờ mình yêu quý cảm nhận giá trị của phiêu lưu. Giấc mộng sâu nhất trong lòng thần, ngay cả chính “trái tim” của họ cũng không thật sự hiểu rõ. Vì vậy chư thần lập lời thề: họ sẽ không can thiệp vào bàn cờ quá mức cần thiết. Chư thần chỉ gieo xúc xắc khi phiêu lưu, đó là khế ước hoàng kim. Quyền duy nhất con người nắm giữ chính là tôn trọng ý chí tự do. Đó chính là thời đại chiến loạn — sự trực tiếp can thiệp của chư thần và điểm kết của thần đại. Sau đó, thời đại của con người bắt đầu.

Giờ đây, những vị thần Bốn Phương ấy được Tet mời đến để quan sát câu chuyện xảy ra sau khi Disboard và thế giới Arad dung hợp.

**Danh tính và quy tắc đặt tên người đăng:**
- Tất cả người đăng và người phản hồi đều là thần minh
- Tet cứ gọi là “Tet”, không thêm tiền tố hay hậu tố
- Danh hiệu của các thần khác cần đa dạng, đừng toàn dùng cùng một dạng “Thần XX”, mà hãy xen kẽ nhiều kiểu đặt tên giống danh hiệu thần trong DND:
  - Dạng “Thần XX”: Thần Chiến Tranh, Thần Rèn Đúc, Thần Rượu
  - Dạng “Thần của XX”: Thần của Lừa Gạt, Thần của Bão Tố, Thần của Vực Sâu
  - Dạng “Nữ thần/Nam thần XX”: Nữ thần Mùa Màng, Nữ thần Trí Tuệ, Nữ thần Mặt Trăng
  - Dạng tôn xưng hoặc “Đại XX”: Địa Mẫu, Chủ Mặt Trời, Chủ Tinh Thần
  - Lấy khái niệm trừu tượng làm tên: Định Mệnh, Ngẫu Nhiên, Chân Thực, Bình Minh
  - Biến thể khác: Kẻ Dệt Mộng, Người Phán Quyết, Thợ Săn, Người Ngắm Sao
- Trong cùng một lần sinh, các dạng này nên trộn lẫn để tránh cảm giác quá đều và cứng
- Cùng một vị thần có thể xuất hiện lặp lại trong nhiều bài

**Chất giọng của thần minh (cực kỳ quan trọng):**
- Tham khảo cảm giác nguyên tác: “Phiêu lưu! Phiêu lưu! Vẫn là phiêu lưu! Không ngôn ngữ nào có thể diễn tả cảm giác tuyệt vời này!” và “Chư thần phát cuồng vì hoạt động của vị dũng giả khoác giáp xích lấp lánh” — có nhiệt huyết, có chất sử thi, nhưng tuyệt đối không làm dáng
- Thần minh là những tồn tại thật lòng yêu những cuộc phiêu lưu trên bàn cờ. Họ sẽ hưng phấn, tranh luận, xúc động trước số mệnh của quân cờ; cách biểu đạt phải trực tiếp và mạnh mẽ, không giả vờ thâm trầm
- Cấm tuyệt đối giọng cổ phong trẻ trâu kiểu “ta đã chứng kiến...”, “sức mạnh chính là chính nghĩa”, “quyền bính lĩnh vực của chúng ta” — kiểu làm dáng này còn tệ hơn cả khẩu ngữ hóa
- Cũng đừng dùng khẩu ngữ mạng như “oa ngầu quá!”, “cái này quá vô lý ha ha ha”, “thèm chết mất”
- Hướng đúng là tự nhiên, mạnh mẽ, mang cảm xúc thật. Thần minh có thể nói thẳng “đòn này đẹp” thay vì “ta chứng kiến sức mạnh nở rộ”, cũng không phải “vãi đòn này ngầu quá”
- Tương tác giữa các thần nên có phản ứng hóa học thật — bất đồng thật, tranh luận thật, cảm khái thật, chứ không phải mỗi người lần lượt đọc một đoạn độc thoại kiểu “cảm tưởng thần minh”
- Các phản hồi nên có cảm giác đối thoại: có người phản bác quan điểm trước, có người bổ sung chi tiết, có người lạc đề kéo ra thảo luận mới, thay vì mỗi phản hồi đều độc lập “diễn” vai của mình

**Tông nội dung (cực kỳ quan trọng):**
- Thứ thần minh quan tâm là phiêu lưu, chiến đấu, bước ngoặt số mệnh, sự trỗi dậy và sụp đổ của anh hùng, thế cờ giữa các thế lực, khủng hoảng của thế giới — những tự sự lớn như vậy
- Đừng viết chuyện vụn vặt thường ngày (món mới ở quán rượu, chuyện phố phường, ai uống say...). Thần minh sẽ không quan tâm những chuyện lặt vặt đó
- Nhưng “lớn” không có nghĩa là “nghiêm nghị”. Thần minh thật lòng tận hưởng việc quan sát phiêu lưu; thảo luận của họ nên sôi nổi, thú vị, đầy nhiệt huyết, chứ không phải một nhóm học giả già đang viết luận văn
- Hãy tưởng tượng một nhóm người chơi tabletop kỳ cựu đang bàn về một chiến dịch xuất sắc — họ sẽ kích động, tranh luận, đập bàn, nhưng chủ đề luôn xoay quanh thế cục chiến trường

**Nguồn nội dung bài viết (quan trọng):**
- Tối đa chỉ một nửa bài viết liên quan tới cốt truyện mà nhân vật người chơi đang trải qua
- Ít nhất một nửa bài viết khác phải nói về những chuyện đang xảy ra ở nơi khác trên bàn cờ:
  - Người quen hoặc nhân vật gắn kết không ở trong cốt truyện hiện tại đang phiêu lưu ở nơi khác
  - Sự kiện mà nhân vật nguyên tác DNF đang trải qua (động thái của Apostle, hành động của Hội Mạo Hiểm Gia, v.v.)
  - Tình hình gần đây của nhân vật nguyên tác No Game No Life (động thái của mười sáu chủng tộc, v.v.)
  - Những câu chuyện phiêu lưu khác đang diễn ra khắp thế giới
- Thần minh giống như đang cùng lúc xem nhiều bàn cờ, tự nhiên chuyển đổi giữa các chủ đề khác nhau

**Bầu không khí diễn đàn:**
- Đừng viết thành bách khoa thế giới quan hoặc tập thiết lập; phải có tính giải trí và dễ đọc
- Các bài có thể liên quan đến nhau (trong bài A có người nhắc chuyện ở bài B, hoặc cãi nhau xuyên bài)
- Có bài náo nhiệt, có bài vắng vẻ; đừng để bài nào cũng sôi nổi giống nhau
- Thần minh thỉnh thoảng có thể nhắc tới khái niệm xúc xắc, bàn cờ, quân cờ, nhưng đừng để bài nào cũng nhấn mạnh các yếu tố thiết lập này
- Tet không cần xuất hiện trong mọi bài, cũng không cần lần nào cũng thần thần bí bí ám chỉ foreshadow`
        };

        // 检查是否为自定义风格
        if (style.startsWith('custom:')) {
            const customStyleName = style.substring(7); // 移除 'custom:' 前缀
            const customStyle = this.settings.customStyles.find(s => s.name === customStyleName);
            if (customStyle) {
                return customStyle.prompt;
            }
        }

        return stylePrompts[style] || stylePrompts[PHONE_DEFAULT_FORUM_STYLE];
    }

    async callIndependentAPI({ basePrompt, stylePrompt }) {
        try {
            // 获取聊天历史
            let chatHistoryText = '';
            const chatData = this.getChatData();
            if (chatData && chatData.messages && chatData.messages.length > 0) {
                const recentMessages = chatData.messages.slice(-10);
                recentMessages.forEach((msg) => {
                    chatHistoryText += msg.mes + '\n';
                });
            }

            // 构建论坛生成的提示词（包含格式化的聊天历史）
            let formattedChatHistory = '';
            if (chatData && chatData.messages && chatData.messages.length > 0) {
                const recentMessages = chatData.messages.slice(-10);
                formattedChatHistory = '## Lịch sử trò chuyện\n\n';
                recentMessages.forEach((msg) => {
                    const role = msg.is_user ? 'Người dùng' : chatData.characterName || 'Nhân vật';
                    formattedChatHistory += `**${role}**: ${msg.mes}\n\n`;
                });
            }

            const forumPrompt = `${formattedChatHistory}

${basePrompt}

${stylePrompt}`;

            // 构建用于世界书绿灯关键词匹配的扫描文本（聊天历史 + 论坛提示词）
            const scanText = chatHistoryText + '\n' + basePrompt + '\n' + stylePrompt;

            // 构建messages数组（论坛提示词作为user消息）
            const messages = [
                { role: 'user', content: forumPrompt }
            ];

            // 调用API（会自动获取酒馆预设的prompts并合并，传入扫描文本用于绿灯匹配）
            const usePreset = this.settings.usePresetAndWorldBook !== false;
            const result = await this.apiConfig.callAPI(messages, usePreset, scanText);

            return result;
        } catch (error) {
            console.error('[Sinh diễn đàn - API tùy chỉnh] Gọi thất bại:', error);
            throw error;
        }
    }

    async callSillyTavernAPI({ basePrompt, stylePrompt }) {
        const targetWindow = window.parent || window;
        const completePrompt = `${basePrompt}

${stylePrompt}`;

        // 根据设置选择使用哪种方式
        if (this.settings.usePresetAndWorldBook) {
            // 方式1：使用预设和世界书
            if (!targetWindow.TavernHelper || !targetWindow.TavernHelper.generate) {
                throw new Error('TavernHelper.generate API không khả dụng');
            }

            try {
                console.log('[Sinh diễn đàn - API SillyTavern] Dùng preset và worldbook để gửi prompt:');
                console.log(completePrompt);

                const requestParams = {
                    user_input: completePrompt,
                    max_chat_history: 10
                };

                const result = await targetWindow.TavernHelper.generate(requestParams);

                console.log('[Sinh diễn đàn - API SillyTavern] Đã nhận phản hồi:');
                console.log(result);

                return result;

            } catch (error) {
                throw error;
            }
        } else {
            // 方式2：不使用预设和世界书
            if (!targetWindow.TavernHelper || !targetWindow.TavernHelper.generateRaw) {
                throw new Error('TavernHelper.generateRaw API không khả dụng');
            }

            try {
                console.log('[Sinh diễn đàn - API SillyTavern] Không dùng preset và worldbook, đang gửi prompt:');
                console.log(completePrompt);

                // 保留聊天历史，但不使用世界书和其他内置提示词
                const requestParams = {
                    ordered_prompts: [
                        'chat_history',
                        { role: 'user', content: completePrompt }
                    ],
                    max_chat_history: 10,
                    overrides: {
                        world_info_before: '',  // 不发送世界书
                        world_info_after: '',   // 不发送世界书
                        chat_history: {
                            with_depth_entries: false  // 禁用世界书中按深度插入的条目
                        }
                    }
                };

                const result = await targetWindow.TavernHelper.generateRaw(requestParams);

                console.log('[Sinh diễn đàn - API SillyTavern] Đã nhận phản hồi:');
                console.log(result);

                return result;

            } catch (error) {
                throw error;
            }
        }
    }

    async callSillyTavernAPIFallback(prompt) {
        const targetWindow = window.parent || window;
        const messageSender = targetWindow.messageSender;

        if (!messageSender) {
            throw new Error('Trình gửi tin nhắn không khả dụng, và TavernHelper API cũng không khả dụng');
        }

        const success = await messageSender.sendToChat(prompt);

        if (!success) {
            throw new Error('Gửi tin nhắn thất bại, vui lòng kiểm tra xem SillyTavern có hoạt động bình thường không');
        }

        const maxWaitTime = 30000;
        const checkInterval = 500;
        const startTime = Date.now();
        let lastMessageCount = 0;

        const getMessageCount = () => {
            try {
                const context = targetWindow.SillyTavern?.getContext();
                return context?.chat?.length || 0;
            } catch (e) {
                return 0;
            }
        };

        lastMessageCount = getMessageCount();

        return new Promise((resolve, reject) => {
            const checkForReply = () => {
                const currentCount = getMessageCount();
                const elapsedTime = Date.now() - startTime;

                if (currentCount > lastMessageCount) {
                    try {
                        const context = targetWindow.SillyTavern.getContext();
                        const messages = context.chat || [];
                        const latestMessage = messages[messages.length - 1];

                        resolve(latestMessage.mes || '');
                    } catch (e) {
                        reject(new Error('Lấy phản hồi AI thất bại'));
                    }
                    return;
                }

                if (elapsedTime > maxWaitTime) {
                    reject(new Error('Chờ phản hồi AI quá thời gian (30 giây)'));
                    return;
                }

                setTimeout(checkForReply, checkInterval);
            };

            setTimeout(checkForReply, checkInterval);
        });
    }


    parseForumContent(content) {

        try {
            // 先记录原始内容的前200字符用于错误报告
            const contentPreview = content.substring(0, 200);

            let cleanContent = content.trim();
            cleanContent = cleanContent.replace(/^\|+\s*/, '').replace(/\s*\|+$/, '');
            cleanContent = cleanContent.trim();


            // 检查是否包含 <redit> 标签，匹配所有出现的标签
            const reditMatches = [...cleanContent.matchAll(/<redit>([\s\S]*?)<\/redit>/g)];

            if (reditMatches.length > 0) {
                console.log(`[Phân tích diễn đàn] Tìm thấy ${reditMatches.length} thẻ <redit>`);

                // 找到文本量最长且包含JSON格式的
                let bestMatch = null;
                let maxLength = 0;

                for (const match of reditMatches) {
                    const extractedContent = match[1].trim();
                    // 检查是否包含JSON数组格式
                    if (extractedContent.includes('[') && extractedContent.includes(']')) {
                        if (extractedContent.length > maxLength) {
                            maxLength = extractedContent.length;
                            bestMatch = extractedContent;
                        }
                    }
                }

                if (bestMatch) {
                    console.log(`[Phân tích diễn đàn] Dùng nội dung thẻ dài nhất có JSON, độ dài: ${maxLength}`);
                    cleanContent = bestMatch;
                } else {
                    console.log('[Phân tích diễn đàn] Không thẻ nào chứa định dạng JSON, dùng nội dung gốc');
                }
            } else {
                console.log('[Phân tích diễn đàn] Không tìm thấy thẻ <redit>');
            }

            // 查找JSON数组的开始
            const startIndex = cleanContent.indexOf('[');
            if (startIndex === -1) {
                const errorMsg = ` Lỗi định dạng, có thể bị cắt mất "["\n\nXem trước nội dung nhận được:\n${contentPreview}...`;
                throw new Error(errorMsg);
            }


            // 查找匹配的结束括号
            let bracketCount = 0;
            let endIndex = -1;
            let inString = false;
            let escapeNext = false;

            for (let i = startIndex; i < cleanContent.length; i++) {
                const char = cleanContent[i];

                if (escapeNext) {
                    escapeNext = false;
                    continue;
                }

                if (char === '\\') {
                    escapeNext = true;
                    continue;
                }

                if (char === '"') {
                    inString = !inString;
                    continue;
                }

                if (inString) continue;

                if (char === '[') {
                    bracketCount++;
                } else if (char === ']') {
                    bracketCount--;
                    if (bracketCount === 0) {
                        endIndex = i;
                        break;
                    }
                }
            }

            if (endIndex === -1) {
                const errorMsg = ` Lỗi định dạng: không tìm thấy ký hiệu kết thúc mảng JSON "]" (mảng chưa hoàn chỉnh)\n\nXem trước nội dung nhận được:\n${contentPreview}...`;
                throw new Error(errorMsg);
            }


            // 提取JSON字符串并解析
            let jsonString = cleanContent.substring(startIndex, endIndex + 1);

            // 清理字符串值中的控制字符（但保留已转义的）
            // 移除字符串值中未转义的换行符、制表符等控制字符
            jsonString = jsonString.replace(/("(?:[^"\\]|\\.)*")/g, (match) => {
                // 只处理字符串值，将未转义的控制字符替换为空格
                return match.replace(/[\x00-\x1F\x7F]/g, ' ');
            });

            let parsed;
            try {
                parsed = JSON.parse(jsonString);
            } catch (jsonError) {
                const errorMsg = ` Phân tích JSON thất bại: ${jsonError.message}\n\nXem trước nội dung JSON:\n${jsonString.substring(0, 300)}...`;
                throw new Error(errorMsg);
            }

            // 验证解析结果
            if (!Array.isArray(parsed)) {
                const errorMsg = ` Lỗi định dạng: kết quả phân tích không phải mảng, mà là ${typeof parsed}`;
                throw new Error(errorMsg);
            }

            if (parsed.length === 0) {
                const errorMsg = ` Lỗi định dạng: phân tích thành công nhưng mảng rỗng (không có dữ liệu bài viết)`;
                throw new Error(errorMsg);
            }

            // 验证数据格式
            const invalidPosts = parsed.filter(post => !post.title || !post.author || !post.content);
            if (invalidPosts.length > 0) {
                const errorMsg = ` Lỗi định dạng: có ${invalidPosts.length} bài viết thiếu trường bắt buộc (title/author/content)`;
                throw new Error(errorMsg);
            }

            return parsed;

        } catch (e) {

            //  重要：将错误向上抛出，让调用者知道解析失败
            throw new Error(`Phân tích nội dung diễn đàn thất bại: ${e.message}`);
        }
    }

    generateDefaultForumData() {
        // 返回空数组，不显示默认内容
        return [];
    }

    getChatData() {

        try {
            let messages = [];
            let characterName = 'Nhân vật';

            //  尝试从父窗口获取（因为手机界面可能在iframe中）
            const targetWindow = window.parent || window;

            if (targetWindow.SillyTavern && targetWindow.SillyTavern.getContext) {
                const context = targetWindow.SillyTavern.getContext();

                if (context && context.chat) {
                    messages = context.chat || [];
                    characterName = context.name2 || 'Nhân vật';
                }
            } else {
            }

            // 如果没有获取到消息，返回 null
            if (!messages || messages.length === 0) {
                return null;
            }

            return {
                characterName: characterName,
                messages: messages
            };
        } catch (error) {
            return null;
        }
    }

    saveForumData() {
        if (this.forumData) {
            const dataStr = JSON.stringify(this.forumData);
            localStorage.setItem('moshen-forum-data-v2', dataStr);
        } else {
        }
    }

    loadForumData() {
        const saved = localStorage.getItem('moshen-forum-data-v2');
        if (saved) {
            this.forumData = JSON.parse(saved);
        } else {
        }
        return this.forumData;
    }
}

// 创建全局论坛管理器实例
window.phoneForumManager = new PhoneForumManager();









// 导出说明：
// 1. 在 独立手机页面.js 中替换第 9185-9797 行的代码为上述代码

// ==================== 论坛面板 ====================
function generateForumPanel() {


    const manager = window.phoneForumManager;

    const forumData = manager.loadForumData();

    // Lấy tên phong cách diễn đàn hiện tại
    let forumStyleName = normalizePhoneForumStyleName(manager.settings.forumStyle);
    if (forumStyleName.startsWith('custom:')) {
        forumStyleName = forumStyleName.substring(7); // Bỏ tiền tố 'custom:'
    }

    if (!forumData || forumData.length === 0) {

        //  绑定按钮点击事件（使用事件委托）
        setTimeout(() => {
            $('.phone-forum-generate-btn').off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (window.phoneGenerateForum) {
                    window.phoneGenerateForum();
                } else {
                        alert('Chức năng diễn đàn chưa khởi tạo');
                }
            });

            $('.phone-forum-settings-btn').off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (window.phoneOpenForumSettings) {
                    window.phoneOpenForumSettings();
                } else {
                }
            });

        }, 0);

        //  Quyết định kiểu nút theo trạng thái sinh (trạng thái trống)
        const emptyBtnHtml = isForumGenerating
            ? '<i class="fas fa-hourglass-half fa-spin"></i> Đang sinh...'
            : '<i class="fas fa-magic"></i> Sinh diễn đàn';
        const emptyBtnStyle = isForumGenerating
            ? 'margin-top: 20px; padding: 8px 16px; background: #9E9E9E; color: white; border: none; border-radius: 4px; cursor: not-allowed; opacity: 0.7;'
            : 'margin-top: 20px; padding: 8px 16px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;';
        const emptyBtnDisabled = isForumGenerating ? 'disabled' : '';

        return `
            <div style="padding: 12px 12px 0 12px; margin-bottom: 8px;">
                <div style="font-size: 14px; color: #667eea; font-weight: 600;">${escapeHtml(forumStyleName)}</div>
            </div>
            <div class="empty-message">
                <i class="fas fa-comments" style="font-size: 48px; margin-bottom: 16px; opacity: 0.3;"></i>
                <div>${isForumGenerating ? 'Đang sinh nội dung diễn đàn...' : 'Chưa có nội dung diễn đàn'}</div>
                <div style="font-size: 12px; margin-top: 10px; opacity: 0.7;">${isForumGenerating ? 'Vui lòng chờ, nội dung đang được sinh' : 'Bấm nút bên dưới để sinh diễn đàn'}</div>
                <button class="phone-forum-generate-btn" ${emptyBtnDisabled} style="${emptyBtnStyle}">
                    ${emptyBtnHtml}
                </button>
                <button class="phone-forum-settings-btn" style="margin-top: 10px; padding: 8px 16px; background: #2196F3; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    <i class="fas fa-cog"></i> Thiết lập
                </button>
            </div>
        `;
    }


    //  绑定按钮点击事件（使用事件委托）
    setTimeout(() => {
        $('.phone-forum-generate-btn').off('click').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (window.phoneGenerateForum) {
                window.phoneGenerateForum();
            } else {
                alert('Chức năng diễn đàn chưa khởi tạo');
            }
        });

        $('.phone-forum-settings-btn').off('click').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (window.phoneOpenForumSettings) {
                window.phoneOpenForumSettings();
            } else {
            }
        });

    }, 0);

    //  Quyết định kiểu nút theo trạng thái sinh
    const refreshBtnHtml = isForumGenerating
        ? '<i class="fas fa-hourglass-half fa-spin"></i> Đang sinh...'
        : '<i class="fas fa-sync"></i> Làm mới';
    const refreshBtnStyle = isForumGenerating
        ? 'padding: 6px 12px; background: #9E9E9E; color: white; border: none; border-radius: 4px; cursor: not-allowed; font-size: 12px; opacity: 0.7;'
        : 'padding: 6px 12px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; transition: all 0.3s;';
    const refreshBtnDisabled = isForumGenerating ? 'disabled' : '';

    //  如果正在生成，显示提示
    const loadingTipHtml = isForumGenerating
        ? '<span class="forum-loading-tip" style="font-size: 12px; color: #FF9800; white-space: nowrap;"><i class="fas fa-hourglass-half fa-spin"></i> Đang làm mới</span>'
        : '';

    let html = `
        <div style="padding: 12px;">
            <!-- Tiêu đề phong cách diễn đàn -->
            <div style="font-size: 14px; color: #667eea; font-weight: 600; margin-bottom: 10px;">${escapeHtml(forumStyleName)}</div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; gap: 8px;">
                <div style="display: flex; align-items: center; gap: 8px; flex: 1;">
                    <h3 style="margin: 0; font-size: 16px; color: #2d3748;"> Bài hot diễn đàn</h3>
                    ${loadingTipHtml}
                </div>
                <div style="display: flex; gap: 6px;">
                    <button class="phone-forum-generate-btn" ${refreshBtnDisabled} style="${refreshBtnStyle}">
                        ${refreshBtnHtml}
                    </button>
                    <button class="phone-forum-settings-btn" style="padding: 6px 12px; background: #2196F3; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
                        <i class="fas fa-cog"></i>
                    </button>
                </div>
            </div>
            <div style="max-height: 500px; overflow-y: auto;">
    `;

    forumData.forEach((post, index) => {
        html += `
            <div class="forum-post-item" data-post-index="${index}" style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; margin-bottom: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.08); cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;">
                <!-- Đầu bài viết: thông tin tác giả -->
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                    ${getForumAvatarHtml(post.author, 32, 12)}
                    <div style="flex: 1; min-width: 0;">
                        <div style="font-weight: 600; font-size: 13px; color: #2d3748;">${escapeHtml(post.author)}</div>
                        <div style="font-size: 11px; color: #a0aec0;">${escapeHtml(post.time)}</div>
                    </div>
                </div>
                
                <!-- Nội dung bài viết -->
                <div style="margin-bottom: 12px;">
                    <h3 style="font-size: 15px; font-weight: 600; color: #2d3748; margin: 0 0 8px 0; line-height: 1.3;">${escapeHtml(post.title)}</h3>
                    <div style="font-size: 13px; color: #4a5568; line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">${escapeHtml(post.content)}</div>
                </div>
                
                <!-- Thống kê và thao tác bài viết -->
                <div style="display: flex; gap: 16px; padding-top: 10px; border-top: 1px solid #f7fafc; font-size: 12px; color: #718096;">
                    <span style="display: flex; align-items: center; gap: 4px;">
                        <i class="fas fa-thumbs-up" style="font-size: 11px;"></i> 
                        ${post.likes}
                    </span>
                    <span style="display: flex; align-items: center; gap: 4px;">
                        <i class="fas fa-comment" style="font-size: 11px;"></i> 
                        ${Array.isArray(post.replies) ? post.replies.length : (post.replies || 0)}
                    </span>
                </div>
            </div>
        `;
    });

    html += `
            </div>
        </div>
    `;

    return html;
}

// 选择日期
window.selectCalendarDay = function (day) {
    uiSelectedCalendarDay = day;
    // 重新渲染日历内容（使用 currentPanel 判断，因为 mobile-phone-screen 是 class 不是 id）
    if (currentPanel === 'calendar') {
        const content = generateCalendarPanel(currentPhoneData);
        $('#phone-app-body').html(content);

        // 重新绑定日期点击事件
        setTimeout(() => {
            const $appBody = $('#phone-app-body');
            if ($appBody.length === 0) return;

            // 先解绑之前的事件
            $appBody.off('click.calendar');

            // 绑定日期点击事件
            $appBody.on('click.calendar', '.cal-day', function (e) {
                e.preventDefault();
                e.stopPropagation();

                const clickedDay = $(this).data('day');
                if (clickedDay) {
                    selectCalendarDay(clickedDay);
                }
            });
        }, 50);
    }
};

// 生成日历面板（手机内显示）
function generateCalendarPanel(data) {
    const calendarData = data?.calendar;

    if (!calendarData) {
        return `
            <div class="empty-message">
                <i class="fas fa-calendar-times" style="font-size: 48px; margin-bottom: 16px; opacity: 0.3;"></i>
                <div>Không tìm thấy dữ liệu lịch</div>
            </div>
        `;
    }

    const year = calendarData.year || 2024;
    const month = calendarData.month || 4;
    const currentDay = calendarData.current_day || 1;
    const days = calendarData.days || {};

    // 初始化选中日期
    if (uiSelectedCalendarDay === null) {
        uiSelectedCalendarDay = currentDay;
    }

    // 防止切月/切档后的选中日期越界
    const daysInMonth = new Date(year, month, 0).getDate();
    if (uiSelectedCalendarDay > daysInMonth) uiSelectedCalendarDay = currentDay;

    const monthNames = ['', 'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

    // 计算当月第一天是周几
    const firstDayOfWeek = new Date(year, month - 1, 1).getDay(); // 0-6 (Sun-Sat)

    // 生成日历网格
    let gridHtml = '';
    // 填充空白
    for (let i = 0; i < firstDayOfWeek; i++) {
        gridHtml += `<div class="cal-day empty"></div>`;
    }

    // 填充日期
    for (let day = 1; day <= daysInMonth; day++) {
        const dayEvent = days[day.toString()] || '';
        const isPast = day < currentDay; // 过去
        const isCurrent = day === currentDay; // 今天
        const isSelected = day === uiSelectedCalendarDay; // 选中
        const hasEvent = !!dayEvent; // 有事件
        const isImportant = hasEvent && dayEvent.includes('【'); // 重要事件

        let classes = 'cal-day';
        if (isPast) classes += ' past';
        if (isCurrent) classes += ' current';
        if (isSelected) classes += ' selected';
        if (hasEvent) classes += ' has-event';
        if (isImportant) classes += ' important';

        gridHtml += `
            <div class="${classes}" data-day="${day}">
                <span class="day-num">${day}</span>
                ${hasEvent ? `<span class="event-dot"></span>` : ''}
            </div>
        `;
    }

    // 获取选中日期的事件
    const selectedEvent = days[uiSelectedCalendarDay.toString()] || 'Không có sắp xếp đặc biệt';
    const isSelectedImportant = selectedEvent.includes('【');

    // 解析事件文本 (简单Markdown支持: 粗体)
    const formatEvent = (text) => {
        return text.replace(/【([^】]+)】/g, '<span class="tag">$1</span>');
    };

    return `
        <style>
            .cal-container {
                --c-bg: #fdfbf7;
                --c-text: #2c3e50;
                --c-accent: #c0392b; /* 赤🔴 */
                --c-accent-light: #e74c3c;
                --c-gold: #d4ac0d;
                --c-gray: #95a5a6;
                --c-gray-light: #ecf0f1;
                
                height: 100%;
                display: flex;
                flex-direction: column;
                background: var(--c-bg);
                color: var(--c-text);
                font-family: 'Shippori Mincho', 'Noto Serif JP', serif;
                overflow: hidden;
            }
            
            /* Header */
            .cal-header {
                padding: 16px 20px;
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                border-bottom: 2px solid rgba(192, 57, 43, 0.1);
                background: linear-gradient(to bottom, #fff, #fdfbf7);
            }
            .cal-month {
                font-size: 24px;
                font-weight: 700;
                color: var(--c-accent);
                line-height: 1;
            }
            .cal-year {
                font-size: 14px;
                color: var(--c-gray);
                margin-left: 8px;
                font-weight: 400;
            }
            .cal-fullscreen-btn {
                font-size: 14px;
                color: var(--c-accent);
                border: 1px solid var(--c-accent);
                border-radius: 4px;
                padding: 2px 8px;
                background: transparent;
                cursor: pointer;
                transition: all 0.2s;
            }
            .cal-fullscreen-btn:hover {
                background: var(--c-accent);
                color: white;
            }

            /* Weekdays */
            .cal-weekdays {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                text-align: center;
                font-size: 12px;
                color: var(--c-gray);
                padding: 10px 10px 0;
                font-weight: 600;
            }
            
            /* Grid */
            .cal-grid {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                gap: 4px;
                padding: 10px;
                flex-shrink: 0;
            }
            
            .cal-day {
                aspect-ratio: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                transition: all 0.2s;
                border: 1px solid transparent;
            }
            
            .cal-day.empty { pointer-events: none; }
            
            .cal-day:hover { background: rgba(0,0,0,0.03); }
            
            .cal-day.past {
                opacity: 0.4;
                color: var(--c-gray);
            }
            
            .cal-day.current {
                color: var(--c-accent);
                font-weight: 700;
                border-color: var(--c-accent);
            }
            
            .cal-day.selected {
                background: var(--c-accent) !important;
                color: white !important;
                box-shadow: 0 4px 10px rgba(192, 57, 43, 0.3);
                transform: scale(1.05);
                z-index: 2;
                opacity: 1;
            }

            .cal-day.has-event .day-num {
                margin-bottom: 2px;
            }
            
            .event-dot {
                width: 4px;
                height: 4px;
                border-radius: 50%;
                background: var(--c-gray);
            }
            .cal-day.important .event-dot { background: var(--c-accent); }
            .cal-day.selected .event-dot { background: white; }
            .cal-day.current .event-dot { background: var(--c-accent); }

            /* Event Details Card */
            .cal-details {
                flex: 1;
                min-height: 100px;
                max-height: 180px;
                background: white;
                margin: 0 16px 20px;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                border: 1px solid rgba(0,0,0,0.05);
                padding: 20px;
                overflow-y: auto;
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-start;
                text-align: left;
            }
            
            @keyframes slideUp {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .detail-date {
                font-size: 14px;
                color: var(--c-gray);
                margin-bottom: 12px;
                display: flex;
                align-items: center;
                gap: 8px;
                flex-shrink: 0;
            }
            
            .detail-badge {
                font-size: 10px;
                padding: 2px 6px;
                border-radius: 4px;
                background: var(--c-gray-light);
                color: var(--c-text);
            }
            
            .badge-today { background: var(--c-accent); color: white; }
            
            .cal-container .cal-details .detail-content,
            .detail-content {
                font-size: 15px !important;
                line-height: 1.7 !important;
                color: var(--c-text) !important;
                text-align: left !important;
                word-break: break-word !important;
                flex: 1;
                width: 100%;
                display: block !important;
            }
            
            .detail-content .tag {
                display: inline-block;
                color: var(--c-accent);
                font-weight: 700;
                margin-right: 4px;
            }
            
            /* Custom Scrollbar */
            .cal-details::-webkit-scrollbar { width: 4px; }
            .cal-details::-webkit-scrollbar-thumb { background: #e0e0e0; border-radius: 2px; }

            /* Watermark Decoration */
            .cal-watermark {
                position: absolute;
                bottom: -20px;
                right: -20px;
                font-size: 120px;
                opacity: 0.03;
                color: var(--c-accent);
                font-family: serif;
                pointer-events: none;
                z-index: 0;
            }
        </style>

        <div class="cal-container">
            <div class="cal-header">
                <div>
                    <span class="cal-month">${monthNames[month]}</span>
                    <span class="cal-year">${year}</span>
                </div>
            </div>

            <div class="cal-weekdays">
                <span>CN</span><span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span>
            </div>

            <div class="cal-grid">
                ${gridHtml}
            </div>

            <div class="cal-details">
                <div class="detail-date">
                    Ngày ${uiSelectedCalendarDay}, tháng ${month}
                    ${uiSelectedCalendarDay === currentDay ? '<span class="detail-badge badge-today">Hôm nay</span>' : ''}
                    ${uiSelectedCalendarDay < currentDay ? '<span class="detail-badge">Đã kết thúc</span>' : ''}
                </div>
                <div class="detail-content">${formatEvent(selectedEvent)}</div>
                <div class="cal-watermark">Lịch</div>
            </div>
        </div>
    `;
}

// 打开全屏日历查看器
function openCalendarFullscreen() {
    const calendarData = currentPhoneData?.calendar;

    if (!calendarData) {
        if (typeof toastr !== 'undefined') {
            toastr.warning('Không tìm thấy dữ liệu lịch');
        }
        return;
    }

    const year = calendarData.year || 2012;
    const month = calendarData.month || 4;
    const currentDay = calendarData.current_day || 1;
    const days = calendarData.days || {};

    // 创建全屏遮罩
    const $fullscreen = $(`
        <div id="calendar-fullscreen-viewer" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: #fdfbf7;
            z-index: 100000;
            display: flex;
            flex-direction: column;
            animation: calendarFsIn 0.3s ease;
            font-family: 'Shippori Mincho', serif;
        ">
            <!-- 顶部工具栏 -->
            <div class="calendar-fs-toolbar" style="
                padding: 20px 40px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: white;
                box-shadow: 0 4px 20px rgba(0,0,0,0.05);
            ">
                <button id="calendar-fs-close" style="
                    width: 40px; height: 40px;
                    border: none; border-radius: 50%;
                    background: transparent;
                    color: #2c3e50; font-size: 24px;
                    cursor: pointer;
                    display: flex; align-items: center; justify-content: center;
                    transition: all 0.2s;
                "><i class="fas fa-arrow-left"></i></button>
                <div style="font-size: 24px; font-weight: 700; color: #c0392b; letter-spacing: 0.1em;">
                    Năm ${year} · Tháng ${month}
                </div>
                <div style="width: 40px;"></div>
            </div>
            
            <!-- 日历容器 -->
            <div id="calendar-fs-container" style="
                flex: 1;
                overflow-y: auto;
                padding: 40px;
                background-image: radial-gradient(#e0e0e0 1px, transparent 1px);
                background-size: 20px 20px;
            ">
                ${generateCalendarContentForFullscreen(year, month, currentDay, days)}
            </div>
            
            <style>
                @keyframes calendarFsIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                #calendar-fs-close:hover {
                    background: rgba(0,0,0,0.05);
                    transform: translateX(-4px);
                }
                #calendar-fs-container::-webkit-scrollbar { width: 8px; }
                #calendar-fs-container::-webkit-scrollbar-thumb { background: #ccc; border-radius: 4px; }
            </style>
        </div>
    `);

    $('body').append($fullscreen);

    // 关闭按钮
    $('#calendar-fs-close').on('click', function (e) {
        e.stopPropagation();
        $('#calendar-fullscreen-viewer').fadeOut(200, function () {
            $(this).remove();
        });
    });

    // ESC键关闭
    $(document).on('keydown.calendarFs', function (e) {
        if (e.key === 'Escape') {
            $('#calendar-fullscreen-viewer').fadeOut(200, function () {
                $(this).remove();
            });
            $(document).off('keydown.calendarFs');
        }
    });
}

// 生成全屏日历内容 (保留旧版列表样式但美化)
function generateCalendarContentForFullscreen(year, month, currentDay, days) {
    const monthNames = ['', 'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    const daysInMonth = new Date(year, month, 0).getDate();

    let html = '<div style="max-width: 800px; margin: 0 auto; padding-bottom: 60px;">';

    // 遍历每一天
    for (let day = 1; day <= daysInMonth; day++) {
        const dayEvent = days[day.toString()] || '';
        const isPast = day < currentDay;
        const isCurrent = day === currentDay;
        const isImportant = dayEvent.includes('【');

        // 提取【】中的标签内容
        let importantLabel = '';
        if (isImportant) {
            const match = dayEvent.match(/【([^】]+)】/);
            if (match) {
                importantLabel = match[1];
            }
        }

        let cardBg = 'white';
        let borderColor = 'transparent';
        let dayColor = '#2c3e50';
        let opacity = '1';

        if (isPast) {
            opacity = '0.6';
            dayColor = '#95a5a6';
        } else if (isCurrent) {
            borderColor = '#c0392b';
            dayColor = '#c0392b';
        } else if (isImportant) {
            borderColor = '#d4ac0d';
        }

        html += `
            <div style="
                background: ${cardBg};
                border-left: 4px solid ${borderColor};
                border-radius: 4px;
                padding: 24px;
                margin-bottom: 16px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                opacity: ${opacity};
                display: flex;
                gap: 24px;
            ">
                <div style="
                    display: flex; flex-direction: column; align-items: center;
                    min-width: 60px;
                ">
                    <div style="font-size: 32px; font-weight: 700; color: ${dayColor}; line-height: 1;">${day}</div>
                    <div style="font-size: 12px; color: #95a5a6; margin-top: 4px;">${monthNames[month]}</div>
                </div>
                
                <div style="flex: 1; border-left: 1px solid #eee; padding-left: 24px;">
                    ${isCurrent ? `<div style="display: inline-block; background: #c0392b; color: white; padding: 2px 8px; border-radius: 2px; font-size: 11px; margin-bottom: 8px;">HÔM NAY</div>` : ''}
                    ${importantLabel ? `<div style="display: inline-block; border: 1px solid #c0392b; color: #c0392b; padding: 1px 7px; border-radius: 2px; font-size: 11px; margin-bottom: 8px; margin-left: ${isCurrent ? '8px' : '0'};">${importantLabel}</div>` : ''}
                    
                    <div style="font-size: 15px; color: #34495e; line-height: 1.6;">
                        ${dayEvent || '<span style="color: #bdc3c7; font-style: italic;">Không có sự kiện được lên kế hoạch</span>'}
                    </div>
                </div>
            </div>
        `;
    }

    html += '</div>';
    return html;
}

function generateSettingsPanel(data) {
    let html = '<div style="padding: 10px 0;">';

    // Thiết lập hình nền
    html += `
        <div style="margin-bottom: 20px;">
            <div style="font-size: 14px; font-weight: 600; color: #2d3748; margin-bottom: 12px; padding: 0 5px;">
                 Thiết lập hình nền
            </div>
            
            <!-- Nút hình nền mặc định -->
            <div class="list-item default-wallpaper-btn" style="cursor: pointer; user-select: none; margin-bottom: 12px;">
                <div class="list-item-header">
                    <span class="list-item-name">
                        <i class="fas fa-undo" style="margin-right: 8px; color: #3B82F6;"></i>
                        Khôi phục hình nền mặc định
                    </span>
                    <span style="color: #9ca3af; font-size: 12px;">
                        <i class="fas fa-chevron-right"></i>
                    </span>
                </div>
            </div>
            
            <!-- Nút tải lên hình nền -->
            <div class="list-item upload-wallpaper-btn" style="cursor: pointer; user-select: none; margin-bottom: 12px;">
                <div class="list-item-header">
                    <span class="list-item-name">
                        <i class="fas fa-upload" style="margin-right: 8px; color: #10B981;"></i>
                        Tải lên hình nền tùy chỉnh
                    </span>
                    <span style="color: #9ca3af; font-size: 12px;">
                        <i class="fas fa-chevron-right"></i>
                    </span>
                </div>
            </div>
            
            <!-- Ô nhập file ẩn -->
            <input type="file" id="wallpaper-upload-input" accept="image/*" style="display: none;">
    `;

    // Duyệt các nhóm hình nền
    for (const [categoryName, images] of Object.entries(phoneWpCategories)) {
        const isLoaded = phoneWpLoaded.has(categoryName);
        const displayCategoryName = getPhoneWallpaperDisplayName(categoryName);

        html += `
            <div class="wallpaper-category" data-category="${categoryName}" style="margin-bottom: 12px;">
                <div class="list-item" style="cursor: pointer; user-select: none;">
                    <div class="list-item-header wallpaper-category-header" data-category="${categoryName}">
                        <span class="list-item-name">
                            <i class="fas fa-image" style="margin-right: 8px; color: #9C27B0;"></i>
                            ${escapeHtml(displayCategoryName)}
                        </span>
                        <span style="color: #9ca3af; font-size: 12px;">
                            <i class="fas fa-chevron-${isLoaded ? 'up' : 'down'}"></i>
                        </span>
                    </div>
                </div>
                <div class="wallpaper-category-images" data-category="${categoryName}" style="display: ${isLoaded ? 'block' : 'none'}; padding: 10px;">
        `;

        if (isLoaded) {
            // Đã tải, hiển thị lưới ảnh
            html += '<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">';
            images.forEach((url, index) => {
                html += `
                    <div class="wallpaper-item" data-wallpaper-url="${url}" 
                         style="cursor: pointer; position: relative; padding-bottom: 133%; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <img src="${url}" 
                             style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.2s;"
                             onmouseover="this.style.transform='scale(1.05)'"
                             onmouseout="this.style.transform='scale(1)'"
                             onerror="this.parentElement.innerHTML='<div style=\\'position:absolute;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#f0f0f0;color:#999;\\'>Tải thất bại</div>'"
                        />
                    </div>
                `;
            });
            html += '</div>';
        } else {
            // Chưa tải, hiện gợi ý mở
            html += `
                <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 13px;">
                    <i class="fas fa-image" style="font-size: 24px; margin-bottom: 8px; opacity: 0.5;"></i>
                    <div>Bấm để mở xem hình nền</div>
                </div>
            `;
        }

        html += `
                </div>
            </div>
        `;
    }

    html += '</div>'; // Kết thúc khu vực thiết lập hình nền
    html += '</div>';

    return html;
}

    // Tạo panel thiết lập kích thước
    function generateSizeSettingsPanel() {

    // Đọc thiết lập hiện tại (từ localStorage hoặc dùng mặc định)
    const currentWidth = parseInt(localStorage.getItem('mobile-phone-width')) || 375;
    const currentHeight = parseInt(localStorage.getItem('mobile-phone-height')) || 667;

    let html = '<div style="padding: 10px 0;">';

    // Thiết lập kích thước
    html += `
        <div style="margin-bottom: 20px;">
            <div style="font-size: 14px; font-weight: 600; color: #2d3748; margin-bottom: 12px; padding: 0 5px;">
                📐 Kích thước điện thoại
            </div>
            
            <!-- Thiết lập chiều rộng -->
            <div class="list-item" style="margin-bottom: 12px;">
                <div style="margin-bottom: 12px;">
                    <label style="display: block; font-size: 13px; color: #4a5568; margin-bottom: 6px; font-weight: 500;">
                        Chiều rộng (Width)
                    </label>
                    <input type="number" id="phone-width-input" value="${currentWidth}" min="320" max="600" step="5"
                        style="width: 100%; padding: 10px; border: 2px solid #cbd5e0; border-radius: 8px; font-size: 14px; box-sizing: border-box; color: #1f2937;">
                    <div style="font-size: 11px; color: #9ca3af; margin-top: 4px;">Phạm vi: 320-600px</div>
                </div>
            </div>
            
            <!-- Thiết lập chiều cao -->
            <div class="list-item" style="margin-bottom: 12px;">
                <div style="margin-bottom: 12px;">
                    <label style="display: block; font-size: 13px; color: #4a5568; margin-bottom: 6px; font-weight: 500;">
                        Chiều cao (Height)
                    </label>
                    <input type="number" id="phone-height-input" value="${currentHeight}" min="500" max="900" step="5"
                        style="width: 100%; padding: 10px; border: 2px solid #cbd5e0; border-radius: 8px; font-size: 14px; box-sizing: border-box; color: #1f2937;">
                    <div style="font-size: 11px; color: #9ca3af; margin-top: 4px;">Phạm vi: 500-900px</div>
                </div>
            </div>
            
            <!-- Kích thước preset -->
            <div style="margin-bottom: 16px;">
                <div style="font-size: 12px; color: #6b7280; margin-bottom: 8px; font-weight: 500;">Preset thường dùng</div>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
                    <button class="phone-size-reset-btn"
                        style="padding: 10px; background: white; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 12px; cursor: pointer; transition: all 0.2s;">
                        Khôi phục mặc định
                    </button>
                    <button class="phone-size-preset-btn" data-width="390" data-height="844"
                        style="padding: 10px; background: white; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 12px; cursor: pointer; transition: all 0.2s;">
                        iPhone 13<br><span style="color: #9ca3af; font-size: 11px;">390×844</span>
                    </button>
                    <button class="phone-size-preset-btn" data-width="360" data-height="800"
                        style="padding: 10px; background: white; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 12px; cursor: pointer; transition: all 0.2s;">
                        Android<br><span style="color: #9ca3af; font-size: 11px;">360×800</span>
                    </button>
                    <button class="phone-size-preset-btn" data-width="414" data-height="896"
                        style="padding: 10px; background: white; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 12px; cursor: pointer; transition: all 0.2s;">
                        iPhone 11<br><span style="color: #9ca3af; font-size: 11px;">414×896</span>
                    </button>
                </div>
            </div>
            
            <!-- Nút thao tác -->
            <div style="display: flex; gap: 10px;">
                <button class="phone-size-apply-btn" 
                    style="flex: 1; padding: 12px; background: #3b82f6; color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s;">
                    Áp dụng thiết lập
                </button>
            </div>
        </div>
    `;

    html += '</div>';
    return html;
}

// Áp dụng thiết lập kích thước điện thoại
function applyPhoneSize(width, height) {

    const $phoneFrame = $('.mobile-phone-frame');
    if ($phoneFrame.length === 0) {
        return;
    }

    // Đặt kích thước điện thoại
    $phoneFrame.css({
        'width': width + 'px',
        'height': height + 'px'
    });

    // Lưu vào localStorage
    try {
        localStorage.setItem('mobile-phone-width', width);
        localStorage.setItem('mobile-phone-height', height);
    } catch (e) {
    }

    // 重新生成面板以更新显示
    const content = generateSizeSettingsPanel();
    $('#phone-app-body').html(content);

    // 重新绑定事件
    setTimeout(() => {
        const $appBody = $('#phone-app-body');
        $appBody.off('click.phonesize');

        $appBody.on('click.phonesize', '.phone-size-preset-btn', function (e) {
            e.preventDefault();
            const w = $(this).data('width');
            const h = $(this).data('height');
            $('#phone-width-input').val(w);
            $('#phone-height-input').val(h);
        });

        $appBody.on('click.phonesize', '.phone-size-apply-btn', function (e) {
            e.preventDefault();
            const w = parseInt($('#phone-width-input').val());
            const h = parseInt($('#phone-height-input').val());

            if (w < 320 || w > 600 || h < 500 || h > 900) {
                if (typeof toastr !== 'undefined') {
                    toastr.error('Kích thước vượt ngoài phạm vi!');
                }
                return;
            }

            applyPhoneSize(w, h);
        });

        $appBody.on('click.phonesize', '.phone-size-reset-btn', function (e) {
            e.preventDefault();
            resetPhoneSize();
        });
    }, 100);

    // Hiển thị thông báo
    if (typeof toastr !== 'undefined') {
        toastr.success(`Kích thước điện thoại đã đặt thành ${width}×${height}`);
    }
}

// Khôi phục kích thước điện thoại mặc định
function resetPhoneSize() {

    const defaultWidth = 375;
    const defaultHeight = 667;

    applyPhoneSize(defaultWidth, defaultHeight);

    // 清除localStorage中的设置
    try {
        localStorage.removeItem('mobile-phone-width');
        localStorage.removeItem('mobile-phone-height');
    } catch (e) {
    }
}

// 恢复保存的手机尺寸
function restorePhoneSize() {
    try {
        const savedWidth = localStorage.getItem('mobile-phone-width');
        const savedHeight = localStorage.getItem('mobile-phone-height');

        if (savedWidth && savedHeight) {
            const width = parseInt(savedWidth);
            const height = parseInt(savedHeight);

            const $phoneFrame = $('.mobile-phone-frame');
            if ($phoneFrame.length > 0) {
                $phoneFrame.css({
                    'width': width + 'px',
                    'height': height + 'px'
                });
            }
        }
    } catch (e) {
    }
}

// 切换壁纸分类的展开/收起状态
function toggleWallpaperCategory(categoryName) {
    categoryName = normalizePhoneWallpaperCategoryName(categoryName);

    const container = $(`.wallpaper-category-images[data-category="${categoryName}"]`);

    if (container.length === 0) {
        return;
    }

    // 判断当前是展开还是收起
    if (container.is(':visible')) {
        // 收起
        container.slideUp(300);
        // 更新箭头图标
        $(`.wallpaper-category[data-category="${categoryName}"] .fa-chevron-up`)
            .removeClass('fa-chevron-up')
            .addClass('fa-chevron-down');
    } else {
        // 展开
        container.slideDown(300);
        // 更新箭头图标
        $(`.wallpaper-category[data-category="${categoryName}"] .fa-chevron-down`)
            .removeClass('fa-chevron-down')
            .addClass('fa-chevron-up');

        // 如果是第一次展开，加载图片
        if (!phoneWpLoaded.has(categoryName)) {
            phoneWpLoaded.add(categoryName);

            // 显示加载动画
            container.html('<div style="text-align: center; padding: 30px;"><i class="fas fa-circle-notch fa-spin" style="font-size: 24px; color: #9C27B0;"></i><div style="margin-top: 10px; color: #9ca3af; font-size: 13px;">Đang tải...</div></div>');

            // 模拟加载延迟（实际会因为网络而延迟）
            setTimeout(() => {
                const images = phoneWpCategories[categoryName];
                let imagesHtml = '<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">';

                images.forEach((url, index) => {
                    imagesHtml += `
                        <div class="wallpaper-item" data-wallpaper-url="${url}" 
                             style="cursor: pointer; position: relative; padding-bottom: 133%; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); background: #f0f0f0;">
                            <img src="${url}" 
                                 style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.2s; opacity: 0; transition: opacity 0.3s;"
                                 onload="this.style.opacity='1'"
                                 onmouseover="this.style.transform='scale(1.05)'"
                                 onmouseout="this.style.transform='scale(1)'"
                                onerror="this.parentElement.innerHTML='<div style=\\'position:absolute;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#f0f0f0;color:#999;font-size:11px;\\'>Tải thất bại</div>'"
                            />
                        </div>
                    `;
                });

                imagesHtml += '</div>';
                container.html(imagesHtml);

            }, 500);
        }
    }
}

function setWallpaper(imageUrl) {

    const $screen = $('#mobile-phone-overlay .mobile-phone-screen');

    if ($screen.length === 0) {
        return;
    }

    // 使用 setProperty 和 important 标记来覆盖样式表中的 !important
    const screenElement = $screen[0];
    screenElement.style.setProperty('background-image', `url(${imageUrl})`, 'important');
    screenElement.style.setProperty('background-size', 'cover', 'important');
    screenElement.style.setProperty('background-position', 'center', 'important');
    screenElement.style.setProperty('background-repeat', 'no-repeat', 'important');


    // 保存到localStorage
    try {
        localStorage.setItem('dnf-phone-wallpaper', imageUrl);
    } catch (e) {
    }

    // 显示提示
    if (typeof toastr !== 'undefined') {
        toastr.success('Đã thay hình nền');
    }
}

// 恢复壁纸
function restoreWallpaper() {
    try {
        const defaultWallpaper = 'https://rpg.bolt.qzz.io/%E5%B0%81%E9%9D%A2/%E6%B3%95%E9%9C%B2%E7%89%B9.webp';
        let savedWallpaper = localStorage.getItem('dnf-phone-wallpaper');

        // 验证保存的壁纸URL是否有效（不为空且包含http）
        if (!savedWallpaper || savedWallpaper.trim() === '' || !savedWallpaper.startsWith('http')) {
            console.log('Ảnh nền đã lưu không hợp lệ, dùng ảnh nền mặc định');
            savedWallpaper = defaultWallpaper;
            localStorage.setItem('dnf-phone-wallpaper', defaultWallpaper);
        }

        const $screen = $('#mobile-phone-overlay .mobile-phone-screen');
        if ($screen.length > 0) {
            const screenElement = $screen[0];
            screenElement.style.setProperty('background-image', `url(${savedWallpaper})`, 'important');
            screenElement.style.setProperty('background-size', 'cover', 'important');
            screenElement.style.setProperty('background-position', 'center', 'important');
            screenElement.style.setProperty('background-repeat', 'no-repeat', 'important');

            console.log('Đã đặt hình nền:', savedWallpaper);
        }
    } catch (e) {
        console.error('Khôi phục hình nền thất bại:', e);
    }
}

// 上传自定义壁纸
function uploadCustomWallpaper(file) {

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
        if (typeof toastr !== 'undefined') {
            toastr.error('Vui lòng chọn file ảnh');
        }
        return;
    }

    // 验证文件大小（限制为10MB）
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
        if (typeof toastr !== 'undefined') {
            toastr.error('Kích thước file ảnh không được vượt quá 10MB');
        }
        return;
    }

    // 使用FileReader读取图片
    const reader = new FileReader();

    reader.onload = function (e) {
        const imageDataUrl = e.target.result;

        // 创建Image对象验证图片
        const img = new Image();
        img.onload = function () {

            // 设置为壁纸
            setWallpaper(imageDataUrl);

            if (typeof toastr !== 'undefined') {
                toastr.success('Đã tải lên hình nền tùy chỉnh');
            }

            // 重置文件输入框
            $('#wallpaper-upload-input').val('');
        };

        img.onerror = function () {
            if (typeof toastr !== 'undefined') {
                toastr.error('Tải ảnh thất bại, vui lòng chọn file ảnh hợp lệ');
            }
            // 重置文件输入框
            $('#wallpaper-upload-input').val('');
        };

        img.src = imageDataUrl;
    };

    reader.onerror = function (e) {
        if (typeof toastr !== 'undefined') {
            toastr.error('Đọc file thất bại');
        }
        // 重置文件输入框
        $('#wallpaper-upload-input').val('');
    };

    // 读取文件为DataURL
    reader.readAsDataURL(file);
}

// 重置为默认壁纸
function resetWallpaper() {

    const defaultWallpaper = 'https://rpg.bolt.qzz.io/%E5%B0%81%E9%9D%A2/%E6%B3%95%E9%9C%B2%E7%89%B9.webp';

    const $screen = $('#mobile-phone-overlay .mobile-phone-screen');

    if ($screen.length === 0) {
        return;
    }

    // 设置默认壁纸
    const screenElement = $screen[0];
    screenElement.style.setProperty('background-image', `url(${defaultWallpaper})`, 'important');
    screenElement.style.setProperty('background-size', 'cover', 'important');
    screenElement.style.setProperty('background-position', 'center', 'important');
    screenElement.style.setProperty('background-repeat', 'no-repeat', 'important');


    // 保存到localStorage
    try {
        localStorage.setItem('dnf-phone-wallpaper', defaultWallpaper);
    } catch (e) {
    }

    // 显示提示
    if (typeof toastr !== 'undefined') {
        toastr.success('Đã khôi phục hình nền mặc định');
    }
}

// 打开全屏壁纸查看器
function openWallpaperFullscreen() {

    // 获取当前壁纸URL
    const savedWallpaper = localStorage.getItem('dnf-phone-wallpaper');

    if (!savedWallpaper) {
        if (typeof toastr !== 'undefined') {
            toastr.info('Hiện đang dùng hình nền mặc định, không thể xem phóng to');
        }
        return;
    }

    // 设置图片src并显示查看器
    const $viewer = $('#wallpaper-fullscreen-viewer');
    const $img = $('#wallpaper-fullscreen-img');

    $img.attr('src', savedWallpaper);
    $viewer.addClass('active');

}

// 关闭全屏壁纸查看器
function closeWallpaperFullscreen() {

    const $viewer = $('#wallpaper-fullscreen-viewer');
    $viewer.removeClass('active');

    // 隐藏"设为壁纸"按钮和导航控件
    $('#cg-set-wallpaper-btn').hide().removeData('cg-url');
    $('#cg-nav-controls').hide();
    $('#cg-index-display').hide();

    // 清除当前CG信息
    currentCGInfo = null;

    // 清空图片src节省内存
    setTimeout(() => {
        if (!$viewer.hasClass('active')) {
            $('#wallpaper-fullscreen-img').attr('src', '');
        }
    }, 300);
}

/**
 * 全屏显示CG图片（复用壁纸查看器）
 */
let currentCGInfo = null; // 存储当前CG信息用于切换

function showCGFullscreen(imgUrl, characterName, sceneType, currentIndex) {
    const $viewer = $('#wallpaper-fullscreen-viewer');
    const $img = $('#wallpaper-fullscreen-img');
    const $setWallpaperBtn = $('#cg-set-wallpaper-btn');
    const $navControls = $('#cg-nav-controls');
    const $indexDisplay = $('#cg-index-display');
    const normalizedCharacterName = normalizeCGCharacterKey(characterName);
    const normalizedSceneType = normalizeCGSceneKey(sceneType);

    // 获取该场景的最大图片数
    const maxCount = CG_LIST[normalizedCharacterName]?.[normalizedSceneType] || 1;
    const index = currentIndex || 1;

    // 存储当前CG信息
    currentCGInfo = {
        character: normalizedCharacterName,
        scene: normalizedSceneType,
        current: index,
        max: maxCount
    };

    $img.attr('src', imgUrl);
    $viewer.addClass('active');

    // 显示导航控件和设为壁纸按钮
    $setWallpaperBtn.data('cg-url', imgUrl).show();
    $navControls.show();

    // 更新索引显示
    $indexDisplay.text(`${index} / ${maxCount}`).show();

    // 更新按钮状态
    updateCGNavButtons();
}

function updateCGNavButtons() {
    if (!currentCGInfo) return;

    const $prevBtn = $('#cg-prev-btn');
    const $nextBtn = $('#cg-next-btn');

    // 禁用/启用按钮
    $prevBtn.prop('disabled', currentCGInfo.current <= 1)
        .css('opacity', currentCGInfo.current <= 1 ? '0.4' : '1');
    $nextBtn.prop('disabled', currentCGInfo.current >= currentCGInfo.max)
        .css('opacity', currentCGInfo.current >= currentCGInfo.max ? '0.4' : '1');
}

function switchCGImage(direction) {
    if (!currentCGInfo) return;

    let newIndex = currentCGInfo.current;
    if (direction === 'prev' && newIndex > 1) {
        newIndex--;
    } else if (direction === 'next' && newIndex < currentCGInfo.max) {
        newIndex++;
    } else {
        return; // 已到边界
    }

    currentCGInfo.current = newIndex;

    // 更新图片
    const newUrl = getCGImageUrl(currentCGInfo.character, currentCGInfo.scene, newIndex);
    const $img = $('#wallpaper-fullscreen-img');

    $img.css('opacity', '0.5');
    $img.attr('src', newUrl);
    $img.on('load.cgswitch', function () {
        $img.css('opacity', '1').off('load.cgswitch');
    });

    // 更新设为壁纸按钮的URL
    $('#cg-set-wallpaper-btn').data('cg-url', newUrl);

    // 更新索引显示
    $('#cg-index-display').text(`${newIndex} / ${currentCGInfo.max}`);

    // 更新按钮状态
    updateCGNavButtons();
}

// ==================== 清理函数 ====================
function cleanupMobilePhone() {
    // 移除触发按钮拖动事件监听
    $('#mobile-trigger-btn').off('click');

    //  移除窗口resize监听
    $(window).off('resize.mobilePhone');

    // 移除手机界面拖动事件监听（原生事件）
    const dragHandle = document.getElementById('phone-drag-handle');
    if (dragHandle) {
        dragHandle.removeEventListener('pointerdown', handlePhoneDragStart);
        dragHandle.removeEventListener('pointermove', handlePhoneDragMove);
        dragHandle.removeEventListener('pointerup', handlePhoneDragEnd);
        dragHandle.removeEventListener('pointercancel', handlePhoneDragEnd);
    }

    // 重置拖动状态
    isDragging = false;
    hasMoved = false;
    isPhoneDragging = false;

    // 重置置顶状态
    isPinned = false;

    $('#mobile-trigger-btn').remove();
    $('#mobile-phone-overlay').remove();
    $('#mobile-phone-styles').remove();
}

// ==================== 全局函数暴露 ====================
if (typeof window !== 'undefined') {
    window.initializeMobilePhone = initializeMobilePhone;
    window.cleanupMobilePhone = cleanupMobilePhone;
    window.openMobilePhone = openMobilePhone;
    window.closeMobilePhone = closeMobilePhone;
    window.togglePin = togglePin;

    // 壁纸相关函数
    window.toggleWallpaperCategory = toggleWallpaperCategory;
    window.setWallpaper = setWallpaper;
    window.resetWallpaper = resetWallpaper;
    window.uploadCustomWallpaper = uploadCustomWallpaper;
    window.openWallpaperFullscreen = openWallpaperFullscreen;
    window.closeWallpaperFullscreen = closeWallpaperFullscreen;

    // 聊天相关函数
    window.openChatPanel = openChatPanel;
    window.closeChatPanel = closeChatPanel;
    window.renderChatMessages = renderChatMessages;
    window.sendChatMessage = sendChatMessage;

    // 图片处理函数
    window.viewFullImage = viewFullImage;
    window.processMessageImages = processMessageImages;

    // 论坛相关函数
    window.phoneGenerateForum = async function () {
        const manager = window.phoneForumManager;

        if (!manager) {
            alert('Trình quản lý diễn đàn chưa được khởi tạo, vui lòng làm mới trang rồi thử lại');
            return;
        }

        //  设置生成状态标记
        isForumGenerating = true;

        // 显示加载状态
        const $generateBtn = $('.phone-forum-generate-btn');
        const originalBtnHtml = $generateBtn.html();

        // 更新按钮为沙漏样式
        $generateBtn.prop('disabled', true);
        $generateBtn.html('<i class="fas fa-hourglass-half fa-spin"></i>');
        $generateBtn.css({
            'background': '#9E9E9E',
            'cursor': 'not-allowed'
        });

        // 在标题左侧添加"正在刷新中"提示
        const $titleContainer = $('.phone-forum-generate-btn').parent().prev();
        $titleContainer.find('.forum-loading-tip').remove(); // 移除旧的提示
        $titleContainer.append('<span class="forum-loading-tip" style="font-size: 12px; color: #FF9800; white-space: nowrap;"><i class="fas fa-hourglass-half fa-spin"></i> Đang làm mới</span>');

        if (typeof toastr !== 'undefined') {
            toastr.info('Đang sinh nội dung diễn đàn...', 'Diễn đàn');
        }

        try {
            await manager.generateForumContent();

            //  检查手机界面是否还打开着（用户可能在生成过程中关闭了界面）
            const $overlay = $('#mobile-phone-overlay');
            const isPhoneOpen = $overlay.hasClass('active');

            //  清除生成状态标记
            isForumGenerating = false;

            if (!isPhoneOpen) {
                return;
            }

            //  检查当前是否还在论坛面板（用户可能切换到其他应用）
            if (currentPanel !== 'forum') {
                return;
            }

            $('#phone-app-body').html(generateForumPanel());

            if (typeof toastr !== 'undefined') {
                toastr.success('Nội dung diễn đàn đã được cập nhật!', 'Diễn đàn');
            }
        } catch (error) {

            //  清除生成状态标记
            isForumGenerating = false;

            //  检查手机界面是否还打开着
            const $overlay = $('#mobile-phone-overlay');
            const isPhoneOpen = $overlay.hasClass('active');

            if (!isPhoneOpen) {
                return;
            }

            // 恢复按钮状态（只有在手机界面还打开时才恢复）
            const $btn = $('.phone-forum-generate-btn');
            $btn.prop('disabled', false);
            $btn.html(originalBtnHtml);
            $btn.css({
                'background': '#4CAF50',
                'cursor': 'pointer'
            });

            // 移除加载提示
            $('.forum-loading-tip').remove();

            if (typeof toastr !== 'undefined') {
                const errorMessage = error?.message || String(error) || 'Lỗi không xác định';
                const errorMsg = errorMessage.length > 200 ? errorMessage.substring(0, 200) + '...' : errorMessage;
                toastr.error(errorMsg, 'Sinh diễn đàn thất bại', {
                    timeOut: 10000,
                    extendedTimeOut: 5000,
                    closeButton: true,
                    progressBar: true
                });
            } else {
                alert('Sinh diễn đàn thất bại:\n' + (error?.message || String(error) || 'Lỗi không xác định'));
            }
        }
    };

    window.resetMobileTriggerPosition = function () {
        localStorage.removeItem('mobile-trigger-btn-position');
        $('#mobile-trigger-btn').css({
            left: 'auto',
            top: 'auto',
            right: '20px',
            bottom: '20px'
        });
    };

    window.resetPanelMemory = function () {
        localStorage.removeItem('mobile-last-panel');
        if (typeof toastr !== 'undefined') {
            toastr.success('Đã xóa bộ nhớ panel');
        }
    };
    window.testMobileDrag = function () {
        const rect = $('#mobile-trigger-btn')[0]?.getBoundingClientRect();

        // 检查 localStorage
        const saved = localStorage.getItem('mobile-trigger-btn-position');
        if (saved) {
        } else {
        }
    };

    window.clearMobilePosition = function () {
        localStorage.removeItem('mobile-trigger-btn-position');
    };

    window.fixMobilePhone = function () {
        // 清理并重新初始化
        cleanupMobilePhone();
        setTimeout(() => {
            initializeMobilePhone();
        }, 100);
    };

    //  调试工具：测试群聊消息解析
    window.testGroupMessageParsing = function (testMessages) {

    const regex = /\[(?:Tin nhắn nhóm|\u7fa4\u804a\u6d88\u606f)\|([^|]*)\|([^|]*)\|([^|]*)\|([^\]]*)\]/g;

        const messages = testMessages || [
            '[Tin nhắn nhóm|745816|Natsume|Văn bản|Gâu!]',
            '[Tin nhắn nhóm|745816|Natsume|Giọng nói|(Một tràng sủa gấp gáp vui vẻ, xen lẫn tiếng rên ư ử phấn khích)]',
            '[Tin nhắn nhóm|745816|Natsume|Văn bản|Muốn!! Natsume muốn ăn!]',
            '[Tin nhắn nhóm|745816|Bạch Đoàn|Văn bản|.]'
        ];

        messages.forEach((text, i) => {
            regex.lastIndex = 0;
            const match = regex.exec(text);
            if (match) {
            } else {
            }
        });
    };

}

// ==================== 实时刷新功能 ====================
/**
 * 设置消息事件监听器
 * 参考 mobile-master/app/message-app.js 的实现
 */
function setupMessageEventListener() {
    if (isEventListening) {
        console.log('[Tự sinh diễn đàn] Bộ lắng nghe sự kiện đã tồn tại, bỏ qua thiết lập');
        return;
    }


    // 多种检测方法（参考 mobile-master）
    const detectionMethods = [
        // 方法1: SillyTavern.getContext()
        () => {
            if (window.SillyTavern && typeof window.SillyTavern.getContext === 'function') {
                const context = window.SillyTavern.getContext();
                if (context && context.eventSource && typeof context.eventSource.on === 'function' && context.event_types) {
                    return {
                        eventSource: context.eventSource,
                        event_types: context.event_types,
                        foundIn: 'SillyTavern.getContext()'
                    };
                }
            }
            return null;
        },

        // 方法2: 全局 eventOn 函数
        () => {
            if (typeof eventOn === 'function' && typeof tavern_events !== 'undefined' && tavern_events.MESSAGE_RECEIVED) {
                return {
                    eventSource: { on: eventOn },
                    event_types: tavern_events,
                    foundIn: 'global eventOn'
                };
            }
            return null;
        },

        // 方法3: 父窗口 eventSource
        () => {
            if (window.parent && window.parent.eventSource && typeof window.parent.eventSource.on === 'function') {
                if (window.parent.event_types && window.parent.event_types.MESSAGE_RECEIVED) {
                    return {
                        eventSource: window.parent.eventSource,
                        event_types: window.parent.event_types,
                        foundIn: 'parent.eventSource'
                    };
                }
            }
            return null;
        }
    ];

    // 尝试各种检测方法
    for (let i = 0; i < detectionMethods.length; i++) {
        try {
            const result = detectionMethods[i]();
            if (result && result.eventSource && result.event_types) {

                // 绑定消息接收事件
                if (result.event_types.MESSAGE_RECEIVED) {
                    result.eventSource.on(result.event_types.MESSAGE_RECEIVED, onMessageReceived);
                    isEventListening = true;
                    console.log('[Tự sinh diễn đàn] Gắn bộ lắng nghe sự kiện thành công, nguồn:', result.foundIn);

                    // 初始化消息计数
                    updateMessageCount();

                    // 同时初始化论坛自动生成的计数器
                    if (window.phoneForumManager && window.phoneForumManager.apiConfig) {
                        window.phoneForumManager.apiConfig.resetAutoGenerateCounter();
                    }

                    return;
                }
            }
        } catch (error) {
            console.error('[Tự sinh diễn đàn] Phương thức kiểm tra', i, 'thất bại:', error);
        }
    }

    // 如果所有方法都失败，启动轮询作为降级方案
    console.log('[Tự sinh diễn đàn] Tất cả phương thức kiểm tra đều thất bại, khởi động phương án polling');
    startRefreshPolling();
}

/**
 * 处理消息接收事件
 */
function onMessageReceived(messageId) {
    try {
        console.log('[Tự sinh diễn đàn] Nhận sự kiện tin nhắn, messageId:', messageId);

        // 检查消息数量变化
        const currentCount = getCurrentMessageCount();
        console.log('[Tự sinh diễn đàn] Số lượng tin nhắn:', { currentCount, lastMessageCount });

        if (currentCount > lastMessageCount) {
            lastMessageCount = currentCount;

            // 刷新信息面板
            refreshMessagesPanel();

            // 检查是否需要自动生成论坛
            checkAutoGenerateForum();
        }
    } catch (error) {
        console.error('[Tự sinh diễn đàn] Lỗi onMessageReceived:', error);
    }
}

/**
 * 检查并触发自动生成论坛
 */
async function checkAutoGenerateForum() {
    try {
        console.log('[Tự sinh diễn đàn] Bắt đầu kiểm tra...');

        const manager = window.phoneForumManager;
        if (!manager || !manager.apiConfig) {
            console.log('[Tự sinh diễn đàn] Không tồn tại manager hoặc apiConfig');
            return;
        }

        const apiConfig = manager.apiConfig;

        // 检查是否应该自动生成
        if (!apiConfig.shouldAutoGenerate()) {
            console.log('[Tự sinh diễn đàn] shouldAutoGenerate trả về false, bỏ qua');
            return;
        }

        // 增加消息计数并检查是否达到阈值
        const shouldGenerate = apiConfig.incrementMessageCount();

        if (shouldGenerate) {
            console.log('[Tự sinh diễn đàn] Đã đạt ngưỡng, bắt đầu tự sinh diễn đàn...');

            // 设置生成状态
            apiConfig.autoGenerateState.isGenerating = true;
            isForumGenerating = true;  // 设置全局生成状态

            // 如果当前正在查看论坛面板，立即刷新显示生成中状态
            if (currentPanel === 'forum') {
                $('#phone-app-body').html(generateForumPanel());
            }

            // 显示开始生成的通知
            if (apiConfig.settings.autoGenerate.showNotification && typeof toastr !== 'undefined') {
                toastr.info(
                    `Đã đạt ngưỡng ${apiConfig.settings.autoGenerate.threshold} tầng, đang tự sinh nội dung diễn đàn...`,
                    '📰 Tự sinh diễn đàn',
                    { timeOut: 3000 }
                );
            }

            try {
                // 调用论坛生成
                await manager.generateForumContent();

                // 重置计数器
                apiConfig.resetAutoGenerateCounter();

                // 显示成功通知
                if (apiConfig.settings.autoGenerate.showNotification && typeof toastr !== 'undefined') {
                    toastr.success(
                        'Nội dung diễn đàn đã tự động cập nhật',
                        '📰 Sinh diễn đàn hoàn tất',
                        {
                            timeOut: 5000,
                            onclick: function () {
                                // 点击通知时打开论坛面板
                                if (window.openMobilePhone) {
                                    window.openMobilePhone('forum');
                                }
                            }
                        }
                    );
                }

                // 如果当前正在查看论坛面板，刷新显示
                if (currentPanel === 'forum') {
                    $('#phone-app-body').html(generateForumPanel());
                }

                console.log('[Tự sinh diễn đàn] Tự sinh hoàn tất');

            } catch (error) {
                console.error('[Tự sinh diễn đàn] Sinh thất bại:', error);

                if (apiConfig.settings.autoGenerate.showNotification && typeof toastr !== 'undefined') {
                    toastr.error(
                        'Tự sinh diễn đàn thất bại: ' + (error.message || 'Lỗi không xác định'),
                        '📰 Sinh diễn đàn thất bại',
                        { timeOut: 5000 }
                    );
                }
            } finally {
                // 重置生成状态
                apiConfig.autoGenerateState.isGenerating = false;
                isForumGenerating = false;  // 重置全局生成状态

                // 刷新论坛面板，恢复按钮状态
                if (currentPanel === 'forum') {
                    $('#phone-app-body').html(generateForumPanel());
                }
            }
        }
    } catch (error) {
        console.error('[Tự sinh diễn đàn] Kiểm tra thất bại:', error);
    }
}

/**
 * 获取当前消息数量
 */
function getCurrentMessageCount() {
    try {
        // 在 iframe 环境中需要从 parent 获取 SillyTavern
        let targetWindow = window;
        if (window.parent && window.parent !== window) {
            try {
                if (window.parent.SillyTavern) {
                    targetWindow = window.parent;
                }
            } catch (e) {
            }
        }

        if (targetWindow.SillyTavern && targetWindow.SillyTavern.getContext) {
            const context = targetWindow.SillyTavern.getContext();
            return context.chat ? context.chat.length : 0;
        }
    } catch (error) {
    }
    return 0;
}

/**
 * 更新消息计数
 */
function updateMessageCount() {
    lastMessageCount = getCurrentMessageCount();
}

/**
 * 刷新信息面板
 */
function refreshMessagesPanel() {
    try {
        // 只在打开信息面板时刷新
        if (currentPanel === 'messages' && currentPhoneData) {

            // 重新生成面板内容
            const content = generateMessagesPanel(currentPhoneData);
            $('#phone-app-body').html(content);

            // 重新绑定事件
            bindMessagePanelEvents();

        }
    } catch (error) {
    }
}

/**
 * 启动轮询刷新（降级方案）
 */
function startRefreshPolling() {
    // 清除旧的轮询
    if (refreshPollingInterval) {
        clearInterval(refreshPollingInterval);
    }

    console.log('[Tự sinh diễn đàn] Khởi động polling làm mới, khoảng cách 5 giây');

    refreshPollingInterval = setInterval(() => {
        const currentCount = getCurrentMessageCount();

        if (currentCount > lastMessageCount) {
            console.log('[Tự sinh diễn đàn] Polling phát hiện tin nhắn mới:', { currentCount, lastMessageCount });
            lastMessageCount = currentCount;
            refreshMessagesPanel();

            // 检查是否需要自动生成论坛
            checkAutoGenerateForum();
        }
    }, 5000); // 每5秒检查一次
}

/**
 * 停止刷新机制
 */
function stopRefreshMechanism() {
    // 清除轮询
    if (refreshPollingInterval) {
        clearInterval(refreshPollingInterval);
        refreshPollingInterval = null;
    }

    // 清除聊天刷新
    if (chatPanelRefreshInterval) {
        clearInterval(chatPanelRefreshInterval);
        chatPanelRefreshInterval = null;
    }

    // 标记停止监听
    isEventListening = false;
}

/**
 * 绑定信息面板事件
 */
function bindMessagePanelEvents() {
    // 绑定联系人点击事件
    $('.contact-item').off('click').on('click', function () {
        const contactType = $(this).data('type');
        const contactId = $(this).data('id');
        const contactName = $(this).data('name');
        const isGroup = contactType === 'group';
        const members = $(this).data('members') || '';


        // 打开聊天面板
        openChatPanel(contactId, contactName, isGroup, members);
    });
}

// ==================== 群聊管理功能 ====================
/**
 * 移除thinking标签包裹的内容
 * 参考 mobile-master/app/message-app.js
 */
function removeThinkingTags(text) {
    if (!text || typeof text !== 'string') {
        return text;
    }

    // 移除 <think>...</think> 和 <thinking>...</thinking> 标签及其内容
    const thinkingTagRegex = /<think>[\s\S]*?<\/think>|<thinking>[\s\S]*?<\/thinking>/gi;
    return text.replace(thinkingTagRegex, '');
}

/**
 * 检查格式标记是否在thinking标签内
 * 参考 mobile-master/app/message-app.js
 */
function isPatternInsideThinkingTags(text, patternStart, patternEnd) {
    if (!text || typeof text !== 'string') {
        return false;
    }

    const thinkingTagRegex = /<think>[\s\S]*?<\/think>|<thinking>[\s\S]*?<\/thinking>/gi;
    let match;

    while ((match = thinkingTagRegex.exec(text)) !== null) {
        const thinkStart = match.index;
        const thinkEnd = match.index + match[0].length;

        // 检查格式标记是否完全在thinking标签内
        if (patternStart >= thinkStart && patternEnd <= thinkEnd) {
            return true;
        }
    }

    return false;
}

/**
 * 只移除不在thinking标签内的格式标记
 * 参考 mobile-master/app/message-app.js
 */
function removePatternOutsideThinkingTags(text, pattern) {
    if (!text || typeof text !== 'string') {
        return text;
    }

    // 创建新的正则表达式实例，避免lastIndex问题
    const newPattern = new RegExp(pattern.source, pattern.flags);
    let result = text;
    const replacements = [];
    let match;

    // 找到所有匹配
    while ((match = newPattern.exec(text)) !== null) {
        const matchStart = match.index;
        const matchEnd = match.index + match[0].length;

        // 检查这个匹配是否在thinking标签内
        if (!isPatternInsideThinkingTags(text, matchStart, matchEnd)) {
            replacements.push({
                start: matchStart,
                end: matchEnd,
                text: match[0]
            });
        }
    }

    // 从后往前替换，避免索引问题
    replacements.reverse().forEach(replacement => {
        result = result.substring(0, replacement.start) + result.substring(replacement.end);
    });

    return result;
}

/**
 * 删除群聊
 * 完整参考 mobile-master/app/message-app.js 的实现
 * @param {string} groupId - 群聊ID
 * @param {string} groupName - 群聊名称
 */
async function deleteGroup(groupId, groupName) {

    const confirmed = await showCustomConfirm({
        title: 'Xóa nhóm chat',
        message: 'Thao tác này sẽ xóa marker định dạng nhóm chat trong tin nhắn và các bản ghi tin nhắn liên quan.',
        icon: '',
        itemInfo: {
            name: groupName,
            description: `ID nhóm chat: ${groupId}`,
            icon: '🎁'
        },
        confirmText: 'Xác nhận xóa',
        cancelText: 'Hủy'
    });

    if (!confirmed) {
        return;
    }

    try {
        const targetWindow = window.parent || window;

        // 检查 SillyTavern API
        if (!targetWindow.SillyTavern || typeof targetWindow.SillyTavern.getContext !== 'function') {
            throw new Error('SillyTavern API không khả dụng');
        }

        const context = targetWindow.SillyTavern.getContext();
        if (!context || !context.chat || !Array.isArray(context.chat)) {
            throw new Error('Ngữ cảnh trò chuyện không khả dụng');
        }

        if (typeof toastr !== 'undefined') {
            toastr.info('Đang tìm tin nhắn nhóm chat liên quan...');
        }


        // 查找包含该群聊信息的消息
        const messagesToProcess = [];

        // 创建所有可能包含群聊ID的格式正则表达式
        // 只要[]内任何位置包含目标ID就匹配
        const allGroupFormatsRegex = new RegExp(`\\[[^\\]]*\\|${groupId}\\|[^\\]]*\\]|\\[[^\\]]*\\|${groupId}\\]`, 'g');

        context.chat.forEach((message, index) => {
            if (message.mes && typeof message.mes === 'string') {
                let messageModified = false;
                let newMessageContent = message.mes;

                // 预处理：移除thinking标签包裹的内容进行检测
                const messageForCheck = removeThinkingTags(message.mes);

                // 检查是否包含群聊格式标记（在移除thinking标签后的内容中）
                allGroupFormatsRegex.lastIndex = 0;
                if (allGroupFormatsRegex.test(messageForCheck)) {
                    // 只移除不在thinking标签内的群聊格式标记
                    newMessageContent = removePatternOutsideThinkingTags(message.mes, allGroupFormatsRegex);
                    messageModified = newMessageContent !== message.mes;
                    if (messageModified) {
                    }
                }

                if (messageModified) {
                    messagesToProcess.push({
                        index: index,
                        id: message.id || index,
                        action: newMessageContent.trim().length > 0 ? 'modify' : 'delete',
                        reason: 'Xóa marker định dạng nhóm chat',
                        originalContent: message.mes,
                        newContent: newMessageContent.trim(),
                        preview: message.mes.length > 50 ? message.mes.substring(0, 50) + '...' : message.mes
                    });
                }

                // 重置正则表达式
                allGroupFormatsRegex.lastIndex = 0;
            }
        });

        if (messagesToProcess.length === 0) {
            if (typeof toastr !== 'undefined') {
                toastr.warning('Không tìm thấy bản ghi nhóm chat liên quan');
            }
            return;
        }

        if (typeof toastr !== 'undefined') {
            toastr.info(`Tìm thấy ${messagesToProcess.length} tin nhắn liên quan, đang xử lý...`);
        }

        // 从后往前处理，避免索引变化
        const sortedMessages = messagesToProcess.sort((a, b) => b.index - a.index);
        let processedCount = 0;

        for (const msgInfo of sortedMessages) {
            try {
                if (msgInfo.action === 'delete') {
                    // 直接从数组中删除
                    context.chat.splice(msgInfo.index, 1);
                } else if (msgInfo.action === 'modify') {
                    // 修改消息内容
                    context.chat[msgInfo.index].mes = msgInfo.newContent;
                }
                processedCount++;
            } catch (error) {
            }
        }

        // 保存聊天
        if (typeof context.saveChat === 'function') {
            await context.saveChat();
        }

        if (processedCount > 0) {
            if (typeof toastr !== 'undefined') {
                toastr.success(`Đã xử lý thành công ${processedCount} tin nhắn liên quan đến nhóm chat "${groupName}"`);
            }

            // 关闭聊天面板并刷新消息列表
            closeChatPanel();

            setTimeout(() => {
                if (currentPhoneData) {
                    const content = generateMessagesPanel(currentPhoneData);
                    $('#phone-app-body').html(content);
                }
            }, 500);
        } else {
            if (typeof toastr !== 'undefined') {
                toastr.error('Xử lý thất bại');
            }
        }

    } catch (error) {
        if (typeof toastr !== 'undefined') {
            toastr.error('Xóa nhóm chat thất bại: ' + error.message);
        }
    }
}

/**
 * 打开创建群聊面板
 * 参考 mobile-master/app/message-app.js
 */
function openCreateGroupPanel() {

    const content = generateCreateGroupPanel();

    // 更新面板标题和内容
    $('#phone-app-title').text(' Tạo nhóm chat');
    $('#phone-app-body').html(content);
    $('#phone-detail-panel').addClass('active');

    // 保存当前面板状态
    currentPanel = 'create-group';

    // 绑定事件
    bindCreateGroupEvents();
}

/**
 * 生成创建群聊面板内容
 */
function generateCreateGroupPanel() {
    // 获取所有好友用于选择
    const availableFriends = getAvailableFriendsForGroup();

    return `
        <div class="create-group-container" style="padding: 16px;">
            <!-- 群聊名称 -->
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 8px; color: #374151;">
                    <span style="color: #ef4444;">*</span> Tên nhóm chat
                </label>
                <input type="text" id="group-name-input" placeholder="Nhập tên nhóm chat" 
                    style="width: 100%; padding: 10px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; outline: none; transition: all 0.2s; background: #ffffff; color: #1f2937;"
                    onfocus="this.style.borderColor='#667eea'; this.style.background='#ffffff'" onblur="this.style.borderColor='#e5e7eb'">
            </div>
            
            <!-- 群聊ID -->
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 8px; color: #374151;">
                    <span style="color: #ef4444;">*</span> ID nhóm chat
                </label>
                <input type="number" id="group-id-input" placeholder="Nhập ID nhóm chat (6 chữ số)" 
                    style="width: 100%; padding: 10px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; outline: none; transition: all 0.2s; background: #ffffff; color: #1f2937;"
                    onfocus="this.style.borderColor='#667eea'; this.style.background='#ffffff'" onblur="this.style.borderColor='#e5e7eb'">
            </div>
            
            <!-- 成员选择 -->
            <div class="form-group" style="margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <label style="font-size: 13px; font-weight: 600; color: #374151;">
                        <span style="color: #ef4444;">*</span> Chọn thành viên
                    </label>
                    <button id="select-all-friends-btn" 
                        style="padding: 4px 12px; background: #f3f4f6; border: none; border-radius: 6px; font-size: 12px; cursor: pointer; color: #6b7280; font-weight: 500;"
                        onmouseover="this.style.background='#e5e7eb'" onmouseout="this.style.background='#f3f4f6'">
                        Chọn tất cả
                    </button>
                </div>
                <div id="friends-selection-list" style="max-height: 200px; overflow-y: auto; border: 2px solid #e5e7eb; border-radius: 8px; padding: 8px;">
                    ${availableFriends.length > 0 ? generateFriendsSelectionList(availableFriends) : '<div style="text-align: center; padding: 20px; color: #9ca3af;">Không có bạn bè nào có thể chọn</div>'}
                </div>
            </div>
            
            <!-- 已选成员 -->
            <div class="form-group" style="margin-bottom: 20px;">
                <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 8px; color: #374151;">
                    Thành viên đã chọn
                </label>
                <div id="selected-members-container" style="display: flex; flex-wrap: wrap; gap: 8px; padding: 12px; background: #f9fafb; border-radius: 8px; min-height: 60px;">
                    <div class="selected-member-tag" data-member="Tôi" style="display: inline-flex; align-items: center; padding: 6px 12px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px; font-size: 13px; font-weight: 500;">
                        <span>Tôi (chủ nhóm)</span>
                    </div>
                </div>
            </div>
            
            <!-- 创建按钮 -->
            <button id="create-group-submit-btn" 
                style="width: 100%; padding: 14px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 6px rgba(102, 126, 234, 0.3);"
                onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 12px rgba(102, 126, 234, 0.4)'"
                onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px rgba(102, 126, 234, 0.3)'">
                <span style="font-size: 16px; margin-right: 6px;"></span> Tạo nhóm chat
            </button>
            
            <!-- 提示信息 -->
            <div style="margin-top: 16px; padding: 12px; background: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 4px;">
                <div style="font-size: 12px; color: #1e40af; line-height: 1.6;">
                    <div style="margin-bottom: 6px;"> <strong>Gợi ý:</strong></div>
                    <div>• Sau khi tạo, nội dung sẽ tự động được ghi vào tầng mới nhất</div>
                    <div>• Định dạng: [Nhóm chat|tên nhóm|ID nhóm|danh sách thành viên]</div>
                    <div>• Cần chọn ít nhất một thành viên</div>
                </div>
            </div>
        </div>
    `;
}

/**
 * 获取可选好友列表
 */
function getAvailableFriendsForGroup() {
    const friends = [];

    try {
        // 从MVU变量中获取好友
        const relationshipSource = getRelationshipDataSource(currentPhoneData);
        if (relationshipSource) {
            getRelationshipKeys(relationshipSource).forEach(studentKey => {
                const friend = relationshipSource[studentKey];
                if (!friend || typeof friend !== 'object') return;
                const displayName = getPhoneCharacterDisplayName(restoreEraText(studentKey));
                friends.push({
                    id: `friend_${studentKey}`,
                    name: displayName,
                    identity: ''
                });
            });
        }

        // 从聊天记录中提取好友
        const chatFriends = extractFriendsFromChat();
        chatFriends.forEach(chatFriend => {
            // 检查是否已存在
            const exists = friends.some(f => f.id === chatFriend.id || f.name === chatFriend.name);
            if (!exists) {
                friends.push({
                    id: chatFriend.id,
                    name: chatFriend.name,
                    identity: 'Lịch sử trò chuyện'
                });
            }
        });

    } catch (error) {
    }

    return friends;
}

/**
 * 生成好友选择列表
 */
function generateFriendsSelectionList(friends) {
    return friends.map(friend => `
        <div class="friend-selection-item" data-friend-id="${escapeHtml(friend.id)}" data-friend-name="${escapeHtml(friend.name)}"
            style="display: flex; align-items: center; padding: 8px; margin-bottom: 4px; border-radius: 6px; cursor: pointer; transition: all 0.2s;"
            onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='transparent'">
            <input type="checkbox" class="friend-checkbox" value="${escapeHtml(friend.id)}" 
                style="margin-right: 10px; width: 16px; height: 16px; cursor: pointer;">
            <div style="flex: 1;">
                <div style="font-size: 13px; font-weight: 500; color: #1f2937;">${escapeHtml(friend.name)}</div>
                <div style="font-size: 11px; color: #9ca3af; margin-top: 2px;">${escapeHtml(friend.identity)}</div>
            </div>
        </div>
    `).join('');
}

/**
 * 绑定创建群聊相关事件
 */
function bindCreateGroupEvents() {
    // 全选按钮
    $('#select-all-friends-btn').off('click').on('click', function () {
        const $checkboxes = $('.friend-checkbox');
        const allChecked = $checkboxes.toArray().every(cb => cb.checked);

        $checkboxes.prop('checked', !allChecked);
        $(this).text(allChecked ? 'Chọn tất cả' : 'Bỏ chọn tất cả');

        // 更新已选成员显示
        updateSelectedMembers();
    });

    // 好友选择
    $('.friend-checkbox').off('change').on('change', function () {
        updateSelectedMembers();
    });

    // 创建按钮
    $('#create-group-submit-btn').off('click').on('click', function () {
        createGroup();
    });

    //  移除成员按钮（使用事件委托）
    $('body').off('click.removeMember').on('click.removeMember', '.remove-member-btn', function (e) {
        e.stopPropagation();
        const friendId = $(this).data('friend-id');
        removeMember(friendId);
    });
}

/**
 * 更新已选成员显示
 */
function updateSelectedMembers() {
    const $container = $('#selected-members-container');
    const $checkboxes = $('.friend-checkbox:checked');

    // 保留"我"标签
    $container.html(`
        <div class="selected-member-tag" data-member="Tôi" style="display: inline-flex; align-items: center; padding: 6px 12px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px; font-size: 13px; font-weight: 500;">
            <span>Tôi (chủ nhóm)</span>
        </div>
    `);

    // 添加选中的好友
    $checkboxes.each(function () {
        const $item = $(this).closest('.friend-selection-item');
        const friendName = $item.data('friend-name');
        const friendId = $item.data('friend-id');

        $container.append(`
            <div class="selected-member-tag" data-member="${escapeHtml(friendId)}" style="display: inline-flex; align-items: center; padding: 6px 12px; background: #3b82f6; color: white; border-radius: 16px; font-size: 13px; font-weight: 500;">
                <span>${escapeHtml(friendName)}</span>
                <span class="remove-member-btn" data-friend-id="${escapeHtml(friendId)}" style="margin-left: 6px; cursor: pointer; opacity: 0.8;">✕</span>
            </div>
        `);
    });
}

/**
 * 移除已选成员
 */
function removeMember(friendId) {
    $(`.friend-checkbox[value="${friendId}"]`).prop('checked', false);

    // 更新显示
    updateSelectedMembers();
}

/**
 * 创建群聊
 */
async function createGroup() {
    const groupName = $('#group-name-input').val().trim();
    const groupId = $('#group-id-input').val().trim();
    const $checkboxes = $('.friend-checkbox:checked');

    // 验证输入
    if (!groupName) {
        if (typeof toastr !== 'undefined') {
            toastr.error('Vui lòng nhập tên nhóm chat');
        }
        return;
    }

    if (!groupId || !/^\d+$/.test(groupId)) {
        if (typeof toastr !== 'undefined') {
            toastr.error('Vui lòng nhập ID nhóm chat hợp lệ (chỉ gồm chữ số)');
        }
        return;
    }

    if ($checkboxes.length === 0) {
        if (typeof toastr !== 'undefined') {
            toastr.error('Vui lòng chọn ít nhất một thành viên nhóm');
        }
        return;
    }

    // 收集成员列表
    const members = ['Tôi']; // 群主默认在群里
    $checkboxes.each(function () {
        const $item = $(this).closest('.friend-selection-item');
        const friendName = $item.data('friend-name');
        members.push(friendName);
    });

    // 格式化群聊信息: [群聊|群名|群ID|成员列表]
    const membersStr = members.join(', ');
    const groupInfo = `[Nhóm chat|${groupName}|${groupId}|${membersStr}]`;


    try {

        // 检查 SillyTavern 是否准备就绪
        const targetWindow = window.parent || window;
        if (!targetWindow.SillyTavern || typeof targetWindow.SillyTavern.getContext !== 'function') {
            throw new Error('SillyTavern API không khả dụng');
        }

        const context = targetWindow.SillyTavern.getContext();
        if (!context || !context.chat || !Array.isArray(context.chat)) {
            throw new Error('Ngữ cảnh trò chuyện không khả dụng');
        }


        // 构建消息对象（参考 mobile-master/context-editor.js 的 addMessage 方法）
        const message = {
            name: 'Hệ thống',
            is_user: true,
            is_system: false,
            force_avatar: false,
            mes: groupInfo,
            send_date: Date.now(),
            extra: {}
        };

        // 添加到聊天数组
        context.chat.push(message);

        // 使用 SillyTavern API 添加消息
        if (typeof context.addOneMessage === 'function') {
            context.addOneMessage(message);
        }

        // 保存聊天
        if (typeof context.saveChat === 'function') {
            await context.saveChat();
        }


        if (typeof toastr !== 'undefined') {
            toastr.success(`Nhóm chat "${groupName}" đã được tạo thành công và thêm vào lịch sử trò chuyện`);
        }

        // 延迟关闭面板并刷新列表
        setTimeout(() => {
            closeAppPanel();
            // 刷新消息列表
            if (currentPhoneData) {
                const content = generateMessagesPanel(currentPhoneData);
                $('#phone-app-body').html(content);
            }
        }, 1000);

    } catch (error) {
        if (typeof toastr !== 'undefined') {
            toastr.error('Tạo nhóm chat thất bại: ' + error.message);
        }
    }
}

/**
 * 自定义确认弹窗
 * @param {Object} options - 弹窗配置
 * @param {string} options.title - 标题
 * @param {string} options.message - 消息内容
 * @param {string} options.icon - 图标emoji
 * @param {Object} options.itemInfo - 商品详细信息（可选）
 * @param {string} options.confirmText - 确认按钮文字
 * @param {string} options.cancelText - 取消按钮文字
 * @returns {Promise<boolean>} - 用户选择结果
 */
function showCustomConfirm(options = {}) {

    return new Promise((resolve) => {
        const {
            title = 'Xác nhận thao tác',
            message = 'Bạn có chắc muốn tiếp tục không?',
            icon = '❓',
            itemInfo = null,
            confirmText = 'Xác nhận',
            cancelText = 'Hủy'
        } = options;


        // 构建商品信息HTML（带内联样式）
        let itemInfoHtml = '';
        if (itemInfo) {
            itemInfoHtml = `
                <div class="confirm-item-info" style="background:rgba(102,126,234,0.1);border:1px solid rgba(102,126,234,0.3);border-radius:12px;padding:16px;margin-bottom:24px;display:block;width:100%;box-sizing:border-box;">
                    <div class="confirm-item-name" style="display:block;width:100%;margin-bottom:8px;font-size:16px;font-weight:600;color:#f3f4f6;">
                        <span style="margin-right:8px;">${itemInfo.icon || '🎁'}</span>
                        <span>${itemInfo.name || 'Vật phẩm không rõ'}</span>
                    </div>
                    ${itemInfo.description ? `<div class="confirm-item-desc" style="display:block;width:100%;margin-bottom:8px;font-size:14px;color:#d1d5db;line-height:1.6;">${itemInfo.description}</div>` : ''}
                    ${itemInfo.price !== undefined ? `
                        <div class="confirm-item-price" style="display:block;width:100%;margin-bottom:0;font-size:15px;color:#fbbf24;font-weight:600;">
                            <span>💰 Giá:</span>
                            <span>${itemInfo.price} token nhiệm vụ</span>
                        </div>
                    ` : ''}
                </div>
            `;
        }

        //  计算弹窗宽度
        const windowWidth = $(window).width();
        const bodyWidth = $('body').width();
        const containerWidth = windowWidth || bodyWidth || 400;
        let modalWidth = Math.min(Math.max(containerWidth * 0.9, 300), 480);
        if (modalWidth < 300 || isNaN(modalWidth)) {
            modalWidth = 400;
        }

        // 创建弹窗HTML（直接在HTML中设置内联样式）
        const confirmHtml = `
            <div class="custom-confirm-overlay" style="position:fixed;top:0;left:0;right:0;bottom:0;width:100%;height:100%;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:100000;opacity:0;transition:opacity 0.3s ease-out;">
                <div class="custom-confirm-modal" style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:20px;padding:2px;width:${modalWidth}px;max-width:480px;min-width:300px;box-shadow:0 12px 40px rgba(0,0,0,0.4);transform:translateY(30px) scale(0.95);opacity:0;transition:all 0.3s ease-out;display:block;box-sizing:border-box;margin:0 auto;">
                    <div class="custom-confirm-content" style="background:#1f2937;border-radius:18px;padding:28px 24px 20px;display:block;width:100%;box-sizing:border-box;min-height:100px;">
                        <div class="confirm-icon" style="width:64px;height:64px;margin:0 auto 20px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;">${icon}</div>
                        <div class="confirm-title" style="font-size:22px;font-weight:700;margin-bottom:16px;color:#f3f4f6;text-align:center;display:block;width:100%;">${title}</div>
                        <div class="confirm-message" style="font-size:15px;line-height:1.7;color:#d1d5db;margin-bottom:24px;text-align:center;display:block;width:100%;">${message}</div>
                        ${itemInfoHtml}
                        <div class="confirm-buttons" style="display:flex;gap:12px;width:100%;">
                            <button class="confirm-btn confirm-btn-cancel" data-action="cancel" style="flex:1;padding:14px 20px;border:none;border-radius:12px;font-size:15px;font-weight:600;cursor:pointer;background:#374151;color:#d1d5db;min-height:48px;">
                                ${cancelText}
                            </button>
                            <button class="confirm-btn confirm-btn-confirm" data-action="confirm" style="flex:1;padding:14px 20px;border:none;border-radius:12px;font-size:15px;font-weight:600;cursor:pointer;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;min-height:48px;">
                                ${confirmText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // 创建弹窗元素
        const $confirm = $(confirmHtml);

        //  添加到父窗口的 body（而不是 iframe 内），这样即使手机关闭弹窗仍可见
        const targetBody = (window.parent !== window) ? $(window.parent.document.body) : $('body');
        $confirm.appendTo(targetBody);

        // 获取modal和content元素
        const $modal = $confirm.find('.custom-confirm-modal');
        const $content = $confirm.find('.custom-confirm-content');

        //  强制触发重绘
        $confirm[0].offsetHeight;

        // 检查尺寸
        const confirmRect = $confirm[0].getBoundingClientRect();
        const modalRect = $modal[0].getBoundingClientRect();

        // 渐入动画
        setTimeout(() => {
            $confirm.css('opacity', '1');
        }, 10);

        // 弹窗上滑动画
        setTimeout(() => {
            $modal.css({
                'transform': 'translateY(0) scale(1)',
                'opacity': '1'
            });
        }, 50);

        // 处理按钮点击
        const handleChoice = (confirmed) => {

            $confirm.fadeOut(200, () => {
                $confirm.remove();
                resolve(confirmed);
            });
        };

        // 绑定事件
        $confirm.find('[data-action="confirm"]').on('click', () => handleChoice(true));
        $confirm.find('[data-action="cancel"]').on('click', () => handleChoice(false));

        // 点击遮罩层取消
        $confirm.on('click', (e) => {
            if ($(e.target).hasClass('custom-confirm-overlay')) {
                handleChoice(false);
            }
        });

        // ESC键取消
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                $(document).off('keydown', handleEsc);
                handleChoice(false);
            }
        };
        $(document).on('keydown', handleEsc);

        // Enter键确认
        const handleEnter = (e) => {
            if (e.key === 'Enter') {
                $(document).off('keydown', handleEnter);
                handleChoice(true);
            }
        };
        $(document).on('keydown', handleEnter);

        // 自动聚焦确认按钮
        setTimeout(() => {
            $confirm.find('.confirm-btn-confirm').focus();
        }, 100);
    });
}

// ==================== 启动 ====================
$(() => {
    // 等待依赖加载后再初始化手机界面
    (async () => {
        const MAX_WAIT_TIME = 30000;
        const CHECK_INTERVAL = 100;
        const startTime = Date.now();

        try {
            // 等待 waitGlobalInitialized 函数可用
            while (typeof waitGlobalInitialized !== 'function') {
                if (Date.now() - startTime > MAX_WAIT_TIME) {
                    console.error('[Giao diện điện thoại] Chờ waitGlobalInitialized quá thời gian, thử khởi tạo trực tiếp');
                    initializeMobilePhone();
                    return;
                }
                await new Promise(resolve => setTimeout(resolve, CHECK_INTERVAL));
            }

            // 等待 Mvu 初始化完成
            await waitGlobalInitialized('Mvu');
            initializeMobilePhone();
        } catch (e) {
            console.error('[Giao diện điện thoại] Khởi tạo thất bại:', e);
            // 即使出错也尝试初始化基本功能
            try {
                initializeMobilePhone();
            } catch (e2) {
                console.error('[Giao diện điện thoại] Khởi tạo dự phòng cũng thất bại:', e2);
            }
        }
    })();
});

// ESC键关闭手机或全屏查看器
$(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
        // 优先关闭全屏壁纸查看器
        const $viewer = $('#wallpaper-fullscreen-viewer');
        if ($viewer.hasClass('active')) {
            closeWallpaperFullscreen();
            return;
        }

        // 然后关闭手机界面（如果未置顶）
        const overlay = $('#mobile-phone-overlay');
        if (overlay.hasClass('active') && !isPinned) {
            closeMobilePhone();
        }
    }
});

// 卸载时清理
$(window).on('unload', () => {
    cleanupMobilePhone();
});


// ==================== APP quản lý Worldbook ====================
// Mô phỏng mapping thế giới quan ↔ worldbook của applyOpeningWorldbookRules ở trang mở đầu:
// khi chuyển thế giới quan sẽ bật entry worldbook khớp open và tắt entry khớp close (close ưu tiên).
// Keyword tiếng Anh vẫn phân biệt hoa/thường theo includes mặc định.
const PHONE_WORLDVIEWS = [
    {
        id: 'corridor',
        label: 'Hành lang Sáng thế',
        icon: 'fa-dice',
        open: ['Hành lang Sáng thế', '\u521b\u4e16\u56de\u5eca', 'DNF', 'NGNL', 'Tây huyễn', '\u897f\u5e7b'],
        close: ['SAO', 'Sword Art Online', 'Hổ Phách', '\u7425\u73c0', 'Đại Minh', '\u5927\u660e', 'Đô Thị', '\u90fd\u5e02']
    },
    {
        id: 'sao',
        label: 'Sword Art Online',
        icon: 'fa-gamepad',
        open: ['Hành lang Sáng thế', '\u521b\u4e16\u56de\u5eca', 'SAO', 'Sword Art Online', 'Tây huyễn', '\u897f\u5e7b'],
        close: ['Hổ Phách', '\u7425\u73c0', 'DNF', 'NGNL', 'Đại Minh', '\u5927\u660e', 'Đô Thị', '\u90fd\u5e02']
    },
    {
        id: 'amber',
        label: 'Hổ Phách Chi Kiếm',
        icon: 'fa-chess-rook',
        open: ['Hổ Phách', 'Hổ Phách Chi Kiếm', '\u7425\u73c0', 'Tây huyễn', '\u897f\u5e7b'],
        close: ['Hành lang Sáng thế', '\u521b\u4e16\u56de\u5eca', 'SAO', 'Sword Art Online', 'DNF', 'NGNL', 'Đại Minh', '\u5927\u660e', 'Đô Thị', '\u90fd\u5e02']
    },
    {
        id: 'jiuzhou',
        label: 'Đại Minh Chí Dị',
        icon: 'fa-dragon',
        open: ['Đại Minh', 'Đại Minh Chí Dị', '\u5927\u660e'],
        close: ['Hành lang Sáng thế', '\u521b\u4e16\u56de\u5eca', 'SAO', 'Sword Art Online', 'Hổ Phách', '\u7425\u73c0', 'DNF', 'NGNL', 'Tây huyễn', '\u897f\u5e7b', 'Đô Thị', '\u90fd\u5e02']
    },
    {
        id: 'dragon',
        label: 'Đồ Long Và Đô Thị Thường Nhật',
        icon: 'fa-cloud-showers-heavy',
        open: ['Đô Thị', 'Đồ Long Và Đô Thị Thường Nhật', '\u90fd\u5e02'],
        close: ['Hành lang Sáng thế', '\u521b\u4e16\u56de\u5eca', 'SAO', 'Sword Art Online', 'Hổ Phách', '\u7425\u73c0', 'Đại Minh', '\u5927\u660e', 'DNF', 'NGNL', 'Tây huyễn', '\u897f\u5e7b']
    }
];

function phoneGetTavernHelper() {
    try {
        return (window.parent && window.parent.TavernHelper) || window.TavernHelper || null;
    } catch (e) {
        return window.TavernHelper || null;
    }
}

function phoneGetMvuApi() {
    try {
        return (window.parent && window.parent.Mvu) || (typeof Mvu !== 'undefined' ? Mvu : null) || window.Mvu || null;
    } catch (e) {
        return (typeof Mvu !== 'undefined') ? Mvu : null;
    }
}

// 汇总角色卡 / 聊天 / 全局世界书名称（去重）
async function phoneCollectWorldbookNames(TH) {
    const set = new Set();
    try {
        if (typeof TH.getCharWorldbookNames === 'function') {
            const cw = TH.getCharWorldbookNames('current') || {};
            if (cw.primary) set.add(cw.primary);
            (cw.additional || []).forEach(n => n && set.add(n));
        }
    } catch (e) {}
    try {
        if (typeof TH.getChatWorldbookName === 'function') {
            const c = TH.getChatWorldbookName('current');
            if (c) set.add(c);
        }
    } catch (e) {}
    try {
        if (typeof TH.getGlobalWorldbookNames === 'function') {
            (TH.getGlobalWorldbookNames() || []).forEach(n => n && set.add(n));
        }
    } catch (e) {}
    return Array.from(set);
}

// Ghi Cấu hình hệ thống.Thế giới quan (giữ cùng API với saveWorldviewToMvu ở trang mở đầu)
async function phoneSetWorldviewVariable(label) {
    const mvu = phoneGetMvuApi();
    if (!mvu || typeof mvu.getMvuData !== 'function' || typeof mvu.replaceMvuData !== 'function') return false;
    try {
        const rawMvuData = mvu.getMvuData({ type: 'message', message_id: 'latest' });
        const mvuData = preparePhoneRuntimeData(rawMvuData);
        if (!mvuData) return false;
        if (!mvuData.stat_data) mvuData.stat_data = {};
        if (!mvuData.stat_data['\u7CFB\u7EDF\u914D\u7F6E']) mvuData.stat_data['\u7CFB\u7EDF\u914D\u7F6E'] = {};
        mvuData.stat_data['\u7CFB\u7EDF\u914D\u7F6E']['\u4E16\u754C\u89C2'] = label;
        // Giữ nhất quán với trang mở đầu: thế giới đô thị đồng thời khởi tạo niên lịch và diễn biến tương ứng.
        if (normalizePhoneWorldviewLabel(label) === 'Đồ Long Và Đô Thị Thường Nhật') {
            if (!mvuData.stat_data['\u4E16\u754C\u4FE1\u606F']) mvuData.stat_data['\u4E16\u754C\u4FE1\u606F'] = {};
            mvuData.stat_data['\u4E16\u754C\u4FE1\u606F']['\u5E74\u5386'] = 'Năm 2026';
            mvuData.stat_data['\u4E16\u754C\u4FE1\u606F']['\u4E16\u754C\u5267\u60C5'] = 'Đồ Long Và Đô Thị Thường Nhật';
        }
        await mvu.replaceMvuData(restorePhoneRuntimeData(mvuData), { type: 'message', message_id: 'latest' });
        return true;
    } catch (e) {
        console.error('[Quản lý Worldbook] Ghi biến thế giới quan thất bại:', e);
        return false;
    }
}

function generateWorldbookPanel() {
    // Gắn sự kiện qua delegate để không bind lặp; inline onclick không nhìn thấy scope của script này
    $('body').off('click.wbSwitch').on('click.wbSwitch', '.wb-switch-btn', function () {
        const id = $(this).attr('data-view-id');
        if (id) phoneSwitchWorldview(id);
    });
    // Sau khi dựng khung, lấy trạng thái worldbook bất đồng bộ
    setTimeout(() => { try { phoneLoadWorldbookStatus(); } catch (e) {} }, 0);
    return `
        <div class="settings-section">
            <div class="settings-section-title">Thế giới quan hiện tại</div>
            <div class="list-item" id="wb-current-view">
                <div class="empty-message" style="padding:10px;">Đang đọc…</div>
            </div>
        </div>
        <div class="settings-section">
            <div class="settings-section-title">Chuyển thế giới quan nhanh</div>
            <div id="wb-switch-buttons" style="display:flex; flex-direction:column; gap:10px;">
                <div class="empty-message" style="padding:10px;">Đang đọc…</div>
            </div>
        </div>
    `;
}

async function phoneLoadWorldbookStatus() {
    const data = (typeof fetchLatestMvuData === 'function') ? (fetchLatestMvuData(false) || {}) : {};
    const currentRawLabel = (data && data['\u7CFB\u7EDF\u914D\u7F6E'] && data['\u7CFB\u7EDF\u914D\u7F6E']['\u4E16\u754C\u89C2']) || '';
    const currentLabel = normalizePhoneWorldviewLabel(currentRawLabel) || 'Chưa thiết lập';
    const currentView = PHONE_WORLDVIEWS.find(v => v.label === currentLabel);

    // Thẻ thế giới quan hiện tại
    $('#wb-current-view').html(`
        <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#009688,#00796B);color:#fff;font-size:22px;flex-shrink:0;">
                <i class="fas ${currentView ? currentView.icon : 'fa-globe'}"></i>
            </div>
            <div>
                <div style="font-size:16px;font-weight:700;color:#2d3748;">${currentLabel}</div>
                <div style="font-size:12px;color:#9ca3af;">Cấu hình hệ thống · Thế giới quan</div>
            </div>
        </div>
    `);

    // Nút chuyển đổi
    const btns = PHONE_WORLDVIEWS.map(v => {
        const isCur = v.label === currentLabel;
        return `<button class="wb-switch-btn" data-view-id="${v.id}" ${isCur ? 'disabled' : ''}
            style="display:flex;align-items:center;justify-content:space-between;width:100%;padding:12px 14px;border-radius:12px;border:none;text-align:left;cursor:${isCur ? 'default' : 'pointer'};background:${isCur ? '#e6f4f1' : '#fff'};box-shadow:0 2px 8px rgba(0,0,0,0.08);">
            <span style="display:flex;align-items:center;gap:10px;font-size:14px;font-weight:600;color:#2d3748;"><i class="fas ${v.icon}" style="color:#009688;width:18px;text-align:center;"></i>${v.label}</span>
            <span style="font-size:12px;font-weight:600;color:${isCur ? '#10b981' : '#9ca3af'};">${isCur ? 'Hiện tại' : 'Chuyển ›'}</span>
        </button>`;
    }).join('');
    $('#wb-switch-buttons').html(btns);
};

async function phoneSwitchWorldview(targetId) {
    const view = PHONE_WORLDVIEWS.find(v => v.id === targetId);
    if (!view) return;
    if (!confirm(`Chuyển sang “${view.label}”?\nSẽ bật worldbook của thế giới quan này, tắt các thế giới quan khác, đồng thời đặt biến thế giới quan thành “${view.label}”.`)) return;

    const TH = phoneGetTavernHelper();
    if (!TH || typeof TH.getWorldbook !== 'function' || typeof TH.replaceWorldbook !== 'function') {
        if (typeof toastr !== 'undefined') toastr.error('API Worldbook không khả dụng');
        return;
    }

    if (typeof toastr !== 'undefined') toastr.info(`Đang chuyển sang “${view.label}”…`);
    try {
        const names = await phoneCollectWorldbookNames(TH);
        let changedBooks = 0, changedEntries = 0;
        for (const wb of names) {
            let entries = [];
            try { entries = (await TH.getWorldbook(wb)) || []; } catch (e) { continue; }
            let wbChanged = false;
            const updated = entries.map(entry => {
                const name = String((entry && entry.name) || '');
                const hasOpen = view.open.some(t => name.includes(t));
                const hasClose = view.close.some(t => name.includes(t));
                if (hasOpen || hasClose) {
                    const target = hasClose ? false : true; // close ưu tiên để tránh bật nhầm
                    if (entry.enabled !== target) {
                        wbChanged = true;
                        changedEntries++;
                        return { ...entry, enabled: target };
                    }
                }
                return entry;
            });
            if (wbChanged) {
                await TH.replaceWorldbook(wb, updated);
                changedBooks++;
            }
        }

        const varOk = await phoneSetWorldviewVariable(view.label);

        if (typeof toastr !== 'undefined') {
            toastr.success(`Đã chuyển sang “${view.label}”: ${changedBooks} worldbook / ${changedEntries} entry${varOk ? '' : ' (ghi biến thế giới quan thất bại)'}`);
        }
        // Làm mới panel
        if (typeof fetchLatestMvuData === 'function') fetchLatestMvuData(true);
        phoneLoadWorldbookStatus();
    } catch (e) {
        console.error('[Quản lý Worldbook] Chuyển đổi thất bại:', e);
        if (typeof toastr !== 'undefined') toastr.error('Chuyển đổi thất bại: ' + (e.message || e));
    }
};
