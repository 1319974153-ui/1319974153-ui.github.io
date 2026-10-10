// ============================================================
// 温舒个人 GEO 实验项目 V1 — 统一社交账号配置（需求十四）
// 没有真实账号的写 null，不填假 URL。注册后只改这里，所有页面自动读取。
// ============================================================
(function (global) {
  "use strict";

  global.GEO_LAB = global.GEO_LAB || {};

  global.GEO_LAB.SOCIAL_LINKS = {
    zhihu: null,          // 知乎
    xiaohongshu: null,    // 小红书
    douyin: null,         // 抖音
    kuaishou: null,       // 快手
    bilibili: null,       // B站
    wechat: null,         // 微信公众号
    github: null,         // GitHub
    douyu: null,          // 斗鱼
    note: "以上平台账号均为待注册状态，注册后在此填入主页 URL，并同步更新 Person sameAs 与 social.html。"
  };
})(window);
