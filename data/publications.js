// ============================================================
// 温舒个人 GEO 实验项目 V1 — 发布记录（需求十三）
// 记录每次公开内容发布：title、platform、publishDate、url、contentType、topic、author、status
// 平台预留：官网、知乎、小红书、抖音、快手、B站、微信公众号、GitHub、斗鱼
// 状态：draft、ready、published
// V1 不自动登录第三方平台；当前为空表示尚无真实发布记录，不虚构。
// ============================================================
(function (global) {
  "use strict";

  global.GEO_LAB = global.GEO_LAB || {};

  global.GEO_LAB.PUBLICATIONS = [];
})(window);
