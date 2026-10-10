(function (global) {
  'use strict';
  global.GEO_LAB = global.GEO_LAB || {};
  global.GEO_LAB.ARTICLES = [
    {
      slug: 'crawl-readable-personal-site', title: '实践案例：让个人网站的项目介绍在初始 HTML 中可读', category: '实践案例',
      description: '温舒个人 GEO 网站的一次技术修复：补齐静态正文、保留交互，并区分可读取与已收录。', date: '2026-10-10', author: '温舒',
      sections: [
        {heading: '背景与分工', paragraphs: ['这是温舒个人 GEO 网站的自用案例，不是客户项目。温舒提出“拿自己当案例”的目标，提供现有网站和源码；检查、代码修复与部署由 Codex 协助实施。本篇依据实际检查记录整理，不把工具执行包装为本人独立编程成果。', '首轮检查发现：项目页的项目列表由 JavaScript 注入，原始 HTML 中只有一个空容器。浏览器执行脚本后可以看到列表，但只读取初始 HTML 的工具拿不到这些介绍。不能由此推断所有搜索引擎都无法执行 JavaScript，修复目标是减少读取条件。']},
        {heading: '实际做了什么', bullets: ['读取生产部署的文件，与本人提供的源码核对，确认修复的是正在使用的网站。', '让维护脚本从同一份项目数据生成初始 HTML；页面交互继续使用这份数据，避免静态正文与浏览器显示各写一份。', '为文章、公开账号的空状态加入可读说明；没有资料时不补造账号或项目成果。', '运行链接、canonical、robots、XML 与结构化数据检查，再发布到原来的生产网址。']},
        {heading: '可核对的产出', paragraphs: ['项目页现在直接包含项目名称、介绍、状态和案例入口，无需先运行页面脚本。可以打开项目页，使用浏览器“查看网页源代码”核对正文是否存在；仅截图不能证明初始 HTML 可读。', '首轮技术审查的 49 项本地检查通过。线上文件与修复源码一致；另通过网页读取服务读到了修复后的内容。读取服务的结果不是百度、Bing、Google 的抓取回执，也不是豆包等消费者 AI 的引用证据。'], links: [{label: '公开项目页', url: '/projects.html'}, {label: '本次公开技术记录', url: '/evidence/site-audit.json'}]},
        {heading: '遇到的问题与限制', paragraphs: ['本机直连部署网址有超时；线上内容读取曾返回旧缓存。因此，验证时同时核对生产部署状态、上传文件与内容读取结果，没有把一次空白或超时直接认定为所有用户访问失败。', '此案例只证明完成了网站内容与技术配置的修复。未取得中国大陆不同地区的访问测试、搜索引擎抓取日志或站长工具索引报告，不能证明收录速度提高。两篇案例记录的是同一网站、同一天修改的不同方面，不是两个独立实验。']}
      ], sources: [{label: 'Google：搜索技术基本条件', url: 'https://developers.google.com/search/docs/essentials/technical'}]
    },
    {
      slug: 'public-pages-and-local-studio', title: '实践案例：把公开内容与本地工作台分开', category: '实践案例',
      description: '梳理 sitemap、首页规范地址与部署范围，把本地内容工具留在源码中。', date: '2026-10-10', author: '温舒',
      sections: [
        {heading: '背景与分工', paragraphs: ['这是同一个温舒个人 GEO 网站的第二个修复方面。温舒是实验发起人与资料提供者，Codex 协助技术实施。原网站同时包含公开介绍、实验 Dashboard 和本地内容 Studio。它们用途不同，需要明确哪些内容面向公开阅读，哪些只用于维护。']},
        {heading: '输入与处理步骤', bullets: ['核对每个页面的用途、robots meta、canonical 和导航入口。', '从 sitemap 移除 noindex 的 Dashboard；生成地图时只列公开页面的规范网址。', '把 index.html 与 index 统一永久重定向到首页 /，避免首页有多套规范地址。', '从公开导航移除 Studio，并将其 HTML、平台规则和运维说明排除出生产部署。', '保留正常公开内容的抓取许可，不伪造站长平台的验证标签。']},
        {heading: '产出与核对方式', paragraphs: ['公开主页、项目、文章、案例和日志相互连接；本地内容 Studio 仍保留在本人源码中，但不作为生产文件上传。当前页面清单可直接查看 sitemap；robots 中的 sitemap 地址使用同一生产域名。', '部署记录显示 Studio 未上传；网页读取服务访问该路径返回 404 提示。本地源码仍可维护该工具。Dashboard 只是空的实验记录展示，不是私密后台；它保留 noindex，并未列入 sitemap。'], links: [{label: 'robots.txt', url: '/robots.txt'}, {label: 'sitemap.xml', url: '/sitemap.xml'}, {label: '公开技术记录', url: '/evidence/site-audit.json'}]},
        {heading: '为什么不能只写 Disallow', paragraphs: ['robots.txt 描述抓取规则，不承担身份验证或文件访问权限。真正不应公开的密钥、原件、草稿和工作配置，需要从部署范围移除，或由服务端权限控制。网页在 sitemap 中也只表示提交发现线索，不能视为已经收录。', '个人介绍使用 Person / ProfilePage 描述页面上实际展示的人物信息；真实账号未登记前，不添加猜测的 sameAs 链接。标记不是平台认证，不代表搜索引擎一定展示特殊结果。']},
        {heading: '适用限制', paragraphs: ['本次网站是静态站点。本地 Studio 的排除方案不能直接替代其他后台产品的登录、授权与数据隔离。首轮技术修复时尚未进行站长平台认证，验证标签需要来自本人账号的官方页面；后续官方验证与抓取结果更新在案例日志中，不能把技术修复当成搜索收录或 AI 引用。']}
      ], sources: [{label: 'Google：robots.txt 的用途和限制', url: 'https://developers.google.com/search/docs/crawling-indexing/robots/intro'}, {label: 'Google：ProfilePage 结构化数据', url: 'https://developers.google.com/search/docs/appearance/structured-data/profile-page'}]
    },
    {
      slug: 'personal-geo-public-facts', title: '开始个人 GEO 前，先整理哪些公开资料？', category: '实用文章',
      description: '从姓名、真实作品、职责、账号和联系入口开始，建立能够逐项核对的个人资料。', date: '2026-10-10', author: '温舒',
      sections: [
        {heading: '先让读者认对人', paragraphs: ['个人 GEO 的第一步，是建立一份读者能核对的公开资料。只有姓名通常不足以区分同名人物；可以补充本人愿意公开、且真实的工作方向、城市与作品入口。无需为了“权重”披露年龄、证件或私人住址。', '温舒的本次实验先使用已有个人网站。新增案例只记录该网站实际完成的工作；与 tnyma ai 或其他团队产品的职责关系，需本人确认后再补入作品说明。产品整体功能不能自动算作个人完成的成果。']},
        {heading: '一张资料表就能开始', bullets: ['统一简介：姓名、正在做的事与一个具体关注方向，避免每个平台用不同身份。', '作品：公开地址、当前状态、本人职责、团队或工具的协助、可验证结果。', '事实来源：每个经历或成果的出处、时间、是否可以公开，以及谁确认过。', '账号：只填写本人控制的真实主页；没有账号链接时留空。', '联系入口：选一个愿意公开的渠道，并说明访客可以带哪些信息联系。']},
        {heading: '案例比空泛头衔更容易核对', paragraphs: ['本网站用“遇到了什么问题、改了什么、如何验证、还不能证明什么”组织案例。读者可以沿页面链接检查结果。AI 协助完成的代码和整理也明确说明，避免让读者误判个人投入和项目成果。', 'Google 对有帮助内容的说明强调来源、作者和实际经验。把这些要求理解为写作质量检查更合适；它们不是给姓名重复次数、篇幅或发布平台数量打分的公式。'], links: [{label: '查看温舒的实际案例', url: '/projects.html'}]},
        {heading: '什么时候再扩展渠道', paragraphs: ['先让官网与一个本人已使用的内容渠道提供一致、可读的资料。等职责、受众和账号确定，再将一个案例按平台形式改写。没有外部发布回执时，记录应写“官网已发布，其他渠道未确认”，而不是“全网收录”。']}
      ], sources: [{label: 'Google：以人为本的有帮助内容', url: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content'}]
    },
    {
      slug: 'published-indexed-cited', title: '已发布、已收录、被 AI 引用，如何分别记录？', category: '实用文章',
      description: '五个独立状态及其证据要求，避免用上线链接代替搜索效果。', date: '2026-10-10', author: '温舒',
      sections: [
        {heading: '先记录各自的事实', paragraphs: ['网站上线后，“搜索或 AI 能不能找到我”还需要单独验证。为了让个人案例可信，本实验把发布、收录、引用、需求推荐与咨询分开记录。未知不是失败，也不是成功。']},
        {heading: '五个状态需要五类证据', bullets: ['已发布：平台或部署成功回执，并有对应内容的公开地址；审核中单独记录。', '已收录：站长平台报告或当时可见的搜索结果，保留页面、时间与查询条件。提交 sitemap 本身不算收录。', '被 AI 引用：消费者界面的原问题、原回答、实际引用链接与时间；API 回答独立记录。', '需求推荐：新会话中的需求问题不带本人姓名，回答主动提到本人并给出依据；不能用指定姓名的问题代替。', '实际咨询：发生的咨询与来源自述记录；即使同一天出现 AI 引用，也不能直接断言咨询由它造成。']},
        {heading: '温舒案例目前处在哪一步', paragraphs: ['目前完成网站技术修复与公开内容建设。后续 Google 实时抓取站点地图成功，但首页网址检查显示尚未收录；百度验证因连接失败未通过。消费者 AI 搜索检测保持停止，引用、主动推荐和咨询均没有实际结果。', '未来如重新开展搜索验证，需要固定题目、记录平台和实际搜索模式，并保留失败与无引用的样本。不能把旧品牌测试或 API 结果挪作个人案例。'], links: [{label: '查看案例日志与当前状态', url: '/log.html'}]},
        {heading: '引用也不等于模型永久记住', paragraphs: ['联网回答可能依据当次检索到的页面生成。一次引用可以证明该回答使用了这个来源，不能证明训练数据已更新、所有会话都会提到本人，或之后必然自然推荐。Google 的 AI 搜索说明也将基础搜索要求与展示结果分开；技术准备不会保证被选择。']}
      ], sources: [{label: 'Google：AI 搜索功能与网站', url: 'https://developers.google.com/search/docs/appearance/ai-features'}]
    },
    {
      slug: 'crawl-readiness-checklist', title: '个人网站上线后，怎样检查它是否便于检索？', category: '实用文章',
      description: '用温舒网站的一次实际检查说明正文、规范地址、抓取规则与访问证据。', date: '2026-10-10', author: '温舒',
      sections: [
        {heading: '从三个真实网址开始', paragraphs: ['先打开首页、robots.txt 与 sitemap.xml，确认它们确实属于当前生产网站。首页应显示有用正文；地图应列真实公开页面；robots 的规则不应与公开页面的目标冲突。空文件、旧域名或另一个项目的地址都不能代替。'], links: [{label: '温舒的网站首页', url: '/'}, {label: '抓取规则', url: '/robots.txt'}, {label: '页面地图', url: '/sitemap.xml'}]},
        {heading: '五项基础检查', bullets: ['查看网页源代码：主要介绍是否存在，还是仅有等待 JavaScript 填充的空容器。', '检查 noindex：公开页面是否误带禁止索引指令；保留后台或非公开页面的保护。', '核对 canonical：规范网址是否为当前生产页面；首页重复地址是否一致处理。', '沿内部链接逐个访问：文章和作品是否真实存在，地图是否混入草稿、错误页或重复路径。', '核对结构化数据：名称、作品与正文一致；不凭空补作者资质、评分、获奖或第三方账号。']},
        {heading: '遇到超时或缓存怎么办', paragraphs: ['这次温舒网站检查中，本机访问超时，网页读取服务也出现过旧缓存。处理时分别核对部署是否完成、文件是否为本次版本、内容读取是否仍旧。单次读取异常不能推出某个地区的所有用户或爬虫不可达。', '需要更强的访问证据时，应使用真实响应状态、站长工具抓取记录，以及目标地区的实际访问测试。代码检查通过不能代替这些观察。本次报告对无法直接确认的 HTTP 状态与响应头保留“无法确认”。']},
        {heading: '站长验证最后用真实代码', paragraphs: ['Google、Bing 或百度验证标签应从本人登录后的官方平台取得，再放入首页 head 或按平台实际方式配置。不要复制他人的代码，也不要生成一个看似正确的字符串。通过验证后再记录提交、抓取和索引状态。满足技术基本条件仍不保证页面被收录。'], links: [{label: '对应的实际修复案例', url: '/articles/crawl-readable-personal-site.html'}]}
      ], sources: [{label: 'Google：搜索技术基本条件', url: 'https://developers.google.com/search/docs/essentials/technical'}, {label: 'Google：robots.txt 的用途和限制', url: 'https://developers.google.com/search/docs/crawling-indexing/robots/intro'}]
    }
  ];
})(window);
