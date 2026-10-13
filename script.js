/* ============================================================
   温舒个人 GEO 实验项目 V1 — 全局脚本
   纯静态数据驱动：data/ 下的数据文件挂载到 window.GEO_LAB，
   各页面按 data-page 渲染对应内容。
   无构建工具、无框架依赖。
   ============================================================ */
(function () {
  "use strict";

  var LAB = window.GEO_LAB || {};
  var page = document.body ? document.body.getAttribute("data-page") : "";

  /* ---------- 工具 ---------- */
  function el(id) {
    return document.getElementById(id);
  }

  function esc(s) {
    if (s === null || s === undefined) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ---------- 导航高亮 ---------- */
  (function highlightNav() {
    var current = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach(function (link) {
      var href = link.getAttribute("href");
      if (href === current) {
        link.classList.add("active");
      }
    });
  })();

  /* ---------- 通用渲染 ---------- */
  function renderProfileFields() {
    document.querySelectorAll("[data-profile-field]").forEach(function (node) {
      var key = node.getAttribute("data-profile-field");
      if (LAB.PROFILE && LAB.PROFILE[key] !== undefined) {
        if (Array.isArray(LAB.PROFILE[key])) {
          node.textContent = LAB.PROFILE[key].join("、");
        } else {
          node.textContent = LAB.PROFILE[key];
        }
      }
    });
  }

  function renderProjects() {
    var box = el("projects-list");
    if (!box) return;
    if (!LAB.PROJECTS || LAB.PROJECTS.length === 0) {
      box.innerHTML = '<div class="empty-state">暂无项目数据，待登记。</div>';
      return;
    }
    box.innerHTML = LAB.PROJECTS.map(function (p) {
      var tech = (p.technologies || []).map(function (t) { return esc(t); }).join(" · ");
      var links = (p.links || []).map(function (l) {
        return ' <a href="' + esc(l.url) + '">' + esc(l.label) + "</a>";
      }).join(" ");
      return (
        '<li><span class="status">' + esc(p.status) + "</span>" +
        "<h3>" + esc(p.name) + "</h3>" +
        "<p>" + esc(p.description) + "</p>" +
        "<p><strong>角色：</strong>" + esc(p.role) + "</p>" +
        (p.startDate ? "<p><strong>开始：</strong>" + esc(p.startDate) + "</p>" : "") +
        (tech ? "<p><strong>技术：</strong>" + tech + "</p>" : "") +
        (links ? "<p>" + links + "</p>" : "") +
        "</li>"
      );
    }).join("");
  }

  function renderArticles() {
    var box = el("articles-list");
    if (!box) return;
    if (!LAB.ARTICLES || LAB.ARTICLES.length === 0) {
      box.innerHTML = '<div class="empty-state">还没有发布文章。第一阶段文章将围绕真实项目、真实体验与真实测试产出，当前不虚构内容。</div>';
      return;
    }
    box.innerHTML = LAB.ARTICLES.map(function (a) {
      return (
        '<li><h3><a href="/articles/' + esc(a.slug) + '.html">' + esc(a.title) + "</a></h3>" +
        "<p>" + esc(a.description) + "</p>" +
        "<p class=\"muted\">" + esc(a.date) + " · " + esc(a.category) + "</p></li>"
      );
    }).join("");
  }

  function renderSocial() {
    var box = el("social-list");
    if (!box) return;
    if (!LAB.SOCIAL_LINKS) return;
    var names = {
      zhihu: "知乎",
      xiaohongshu: "小红书",
      douyin: "抖音",
      kuaishou: "快手",
      bilibili: "B站",
      wechat: "微信公众号",
      github: "GitHub",
      toutiao: "头条号（洒脱河流iF9xXG）",
      douyu: "斗鱼"
    };
    var html = Object.keys(names)
      .filter(function (k) { return LAB.SOCIAL_LINKS[k] !== null && LAB.SOCIAL_LINKS[k] !== undefined; })
      .map(function (k) {
        return '<li><strong>' + names[k] + "</strong>：<a href=\"" + esc(LAB.SOCIAL_LINKS[k]) + '" target="_blank" rel="noopener">' + esc(LAB.SOCIAL_LINKS[k]) + "</a></li>";
      })
      .join("");
    if (!html) {
      html = '<div class="empty-state">暂未登记本人公开账号链接。登记后会在这里更新。</div>';
    }
    box.innerHTML = html;
  }

  function renderQueries() {
    var box = el("queries-list");
    if (!box) return;
    var queries = (LAB.GEO_QUERIES || []);
    box.innerHTML = queries.map(function (q) { return "<li>" + esc(q) + "</li>"; }).join("");
  }

  function renderAiTests() {
    var box = el("ai-tests-list");
    if (!box) return;
    var tests = LAB.AI_TESTS || [];
    if (tests.length === 0) {
      box.innerHTML = '<div class="empty-state">尚无 AI 搜索测试记录。消费者 AI 搜索检测保持停止。尚未取得的结果保持未知。</div>';
      return;
    }
    box.innerHTML =
      '<div class="table-wrap"><table><thead><tr><th>日期</th><th>平台</th><th>查询词</th><th>是否出现</th><th>身份是否准确</th><th>说明</th><th>来源链接</th><th>状态</th></tr></thead><tbody>' +
      tests.map(function (t) {
        return (
          "<tr><td>" + esc(t.date) + "</td><td>" + esc(t.platform) + "</td><td>" + esc(t.query) + "</td><td>" +
          (t.appeared === true ? "是" : t.appeared === false ? "否" : "未测") + "</td><td>" +
          (t.accurateIdentity === true ? "是" : t.accurateIdentity === false ? "否" : "未测") + "</td><td>" + esc(t.description || "") + "</td><td>" +
          (t.sourceUrls && t.sourceUrls.length ? esc(t.sourceUrls.join(", ")) : "") + "</td><td>" + esc(t.status || "") + "</td></tr>"
        );
      }).join("") +
      "</tbody></table></div>";
  }

  function renderPublications() {
    var box = el("publications-list");
    if (!box) return;
    var pubs = LAB.PUBLICATIONS || [];
    if (pubs.length === 0) {
      box.innerHTML = '<div class="empty-state">还没有真实发布记录。V1 不自动发布到第三方平台，待您注册并授权后逐条登记。</div>';
      return;
    }
    box.innerHTML =
      '<div class="table-wrap"><table><thead><tr><th>标题</th><th>平台</th><th>发布时间</th><th>类型</th><th>主题</th><th>作者</th><th>状态</th><th>链接</th></tr></thead><tbody>' +
      pubs.map(function (p) {
        return (
          "<tr><td>" + esc(p.title) + "</td><td>" + esc(p.platform) + "</td><td>" + esc(p.publishDate || "") + "</td><td>" + esc(p.contentType || "") + "</td><td>" + esc(p.topic || "") + "</td><td>" + esc(p.author || "") + "</td><td>" + esc(p.status || "") + "</td><td>" +
          (p.url ? '<a href="' + esc(p.url) + '" target="_blank" rel="noopener">链接</a>' : "") + "</td></tr>"
        );
      }).join("") +
      "</tbody></table></div>";
  }

  function renderPlatformRules() {
    var box = el("platform-rules-list");
    if (!box) return;
    var rules = LAB.PLATFORM_RULES || {};
    var names = { zhihu: "知乎", wechat: "公众号", xiaohongshu: "小红书", douyin: "抖音", kuaishou: "快手", bilibili: "B站", github: "GitHub" };
    var html = Object.keys(names).map(function (k) {
      var r = rules[k];
      if (!r) return "";
      return (
        "<li><h3>" + names[k] + "</h3>" +
        "<p><strong>内容类型：</strong>" + esc(r.contentType) + "</p>" +
        "<p><strong>建议篇幅：</strong>" + esc(r.recommendedLength) + "</p>" +
        "<p><strong>语气：</strong>" + esc(r.tone) + "</p>" +
        "<p><strong>标题风格：</strong>" + esc(r.titleStyle) + "</p>" +
        "<p><strong>身份露出：</strong>" + esc(r.requiredIdentity) + "</p>" +
        "<p><strong>行动引导：</strong>" + esc(r.ctaStyle) + "</p></li>"
      );
    }).join("");
    box.innerHTML = html;
  }

  function renderTimeline() {
    var box = el("timeline-list");
    if (!box) return;
    var tl = LAB.TIMELINE || [];
    box.innerHTML =
      '<div class="table-wrap"><table><thead><tr><th>阶段</th><th>日期</th><th>网站状态</th><th>平台状态</th><th>文章数</th><th>AI 测试数</th><th>搜索变化</th><th>备注</th></tr></thead><tbody>' +
      tl.map(function (t) {
        return (
          "<tr><td><strong>" + esc(t.day) + "</strong></td><td>" + esc(t.date || "待定") + "</td><td>" + esc(t.website) + "</td><td>" + esc(t.platforms) + "</td><td>" + t.articles + "</td><td>" + t.aiTests + "</td><td>" + esc(t.searchChanges) + "</td><td>" + esc(t.notes) + "</td></tr>"
        );
      }).join("") +
      "</tbody></table></div>";
  }

  function renderDashboardStats() {
    var box = el("dashboard-stats");
    if (!box) return;
    var pubs = LAB.PUBLICATIONS || [];
    var tests = LAB.AI_TESTS || [];
    var pages = 14;
    var stats = [
      { label: "网站公开页面数", value: pages },
      { label: "文章数量", value: (LAB.ARTICLES || []).length },
      { label: "已发布内容数量", value: pubs.filter(function (p) { return p.status === "published"; }).length },
      { label: "已登记平台数量", value: Object.keys(LAB.SOCIAL_LINKS || {}).filter(function (k) { return LAB.SOCIAL_LINKS[k] !== null; }).length },
      { label: "AI 测试次数", value: tests.length },
      { label: "固定查询词数量", value: (LAB.GEO_QUERIES || []).length }
    ];
    var idCount = tests.filter(function (t) { return t.accurateIdentity === true; }).length;
    var misCount = tests.filter(function (t) { return t.accurateIdentity === false; }).length;
    var unknownCount = tests.length - idCount - misCount;
    box.innerHTML =
      '<div class="card-grid">' +
      stats.map(function (s) {
        return '<div class="card"><h3>' + s.value + "</h3><p>" + esc(s.label) + "</p></div>";
      }).join("") +
      "</div>" +
      "<h3>当前「温舒」识别结果</h3>" +
      '<ul class="tag-list"><li class="badge badge-ok">已识别 ' + idCount + "</li><li class=\"badge badge-empty\">未识别 " + misCount + "</li><li class=\"badge badge-pending\">无法判断 " + unknownCount + "</li></ul>" +
      '<p class="muted">识别结果仅来自真实测试记录；测试全部完成前不创造任何评分。</p>';
  }

  /* ---------- Studio：内容生产后台（需求十六） ---------- */
  function initStudio() {
    var form = el("studio-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var topic = el("studio-topic").value.trim();
      var out = el("studio-output");
      if (!topic) {
        out.innerHTML = '<div class="empty-state">请先输入内容主题。</div>';
        return;
      }
      var brief = {
        topic: topic,
        createdAt: new Date().toISOString().slice(0, 10),
        status: "brief",
        versions: []
      };
      var saved = [];
      try {
        saved = JSON.parse(localStorage.getItem("geo-lab-studio-tasks") || "[]");
      } catch (err) {
        saved = [];
      }
      saved.push(brief);
      localStorage.setItem("geo-lab-studio-tasks", JSON.stringify(saved));
      renderStudioTasks(saved);
      el("studio-topic").value = "";
    });
    var saved = [];
    try {
      saved = JSON.parse(localStorage.getItem("geo-lab-studio-tasks") || "[]");
    } catch (err) {
      saved = [];
    }
    renderStudioTasks(saved);
  }

  function renderStudioTasks(tasks) {
    var box = el("studio-tasks");
    if (!box) return;
    if (!tasks.length) {
      box.innerHTML = '<div class="empty-state">还没有内容任务。输入主题即可生成内容简报（V1 仅数据结构与 UI，不自动调用大模型）。</div>';
      return;
    }
    box.innerHTML =
      '<div class="table-wrap"><table><thead><tr><th>主题</th><th>创建日期</th><th>状态</th><th>平台版本</th></tr></thead><tbody>' +
      tasks.map(function (t) {
        var platformNames = { zhihu: "知乎", wechat: "公众号", xiaohongshu: "小红书", douyin: "抖音", kuaishou: "快手", bilibili: "B站", github: "GitHub" };
        var versions = (t.versions || []).map(function (v) { return esc(platformNames[v.platform] || v.platform); }).join("、") || "待生成";
        return "<tr><td>" + esc(t.topic) + "</td><td>" + esc(t.createdAt) + "</td><td>" + esc(t.status) + "</td><td>" + versions + "</td></tr>";
      }).join("") +
      "</tbody></table></div>";
  }

  /* ---------- 按页面分发渲染 ---------- */
  var renderers = {
    home: function () { renderProfileFields(); },
    about: function () { renderProfileFields(); },
    projects: function () { renderProjects(); },
    articles: function () { renderArticles(); },
    "ai-search": function () { renderQueries(); renderAiTests(); },
    dashboard: function () { renderDashboardStats(); renderTimeline(); renderPublications(); },
    social: function () { renderSocial(); },
    studio: function () { initStudio(); renderPlatformRules(); },
    geo: function () { renderQueries(); }
  };

  if (renderers[page]) {
    renderers[page]();
  }

  /* ---------- 当前年份 ---------- */
  document.querySelectorAll("[data-year]").forEach(function (node) {
    node.textContent = new Date().getFullYear();
  });
})();
