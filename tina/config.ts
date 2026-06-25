import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "fake-client-id",
  token: process.env.TINA_TOKEN || "fake-token",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
    accept: [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/avif",
      "image/svg+xml",
    ],
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "文章",
        path: "src/content/posts",
        format: "md",
        ui: {
          router: ({ document }) => {
            return `/posts/${document._sys.filename.replace(/\.(md|mdx)$/, "")}`;
          },
          filename: {
            slugify: (values) => {
              const title = values?.title?.trim();
              if (!title || title === "untitled") {
                const timestamp = Date.now().toString(36);
                return `untitled-${timestamp}`;
              }
              const slug = title.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-").replace(/^-|-$/g, "");
              return slug || `untitled-${Date.now().toString(36)}`;
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "标题",
            isTitle: true,
            required: true,
            defaultValue: "untitled",
          },
          {
            type: "datetime",
            name: "published",
            label: "发布日期",
            required: true,
            ui: {
              dateFormat: "YYYY-MM-DD",
              timeFormat: false,
            },
            defaultValue: "1970-01-01",
          },
          {
            type: "datetime",
            name: "updated",
            label: "更新日期",
            ui: {
              dateFormat: "YYYY-MM-DD",
              timeFormat: false,
            },
          },
          {
            type: "boolean",
            name: "draft",
            label: "草稿",
            defaultValue: false,
          },
          {
            type: "boolean",
            name: "pinned",
            label: "置顶",
            defaultValue: false,
          },
          {
            type: "string",
            name: "description",
            label: "描述",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "image",
            label: "封面图片",
          },
          {
            type: "string",
            name: "category",
            label: "分类",
          },
          {
            type: "string",
            name: "lang",
            label: "语言",
            options: [
              { label: "中文", value: "zh_CN" },
              { label: "英文", value: "en" },
              { label: "日文", value: "ja" },
              { label: "俄语", value: "ru" },
              { label: "繁体中文", value: "zh_TW" },
            ],
          },
          {
            type: "string",
            name: "author",
            label: "作者",
          },
          {
            type: "string",
            name: "sourceLink",
            label: "原文链接",
          },
          {
            type: "string",
            name: "licenseName",
            label: "许可证名称",
          },
          {
            type: "string",
            name: "licenseUrl",
            label: "许可证链接",
          },
          {
            type: "boolean",
            name: "comment",
            label: "允许评论",
            default: true,
          },
          {
            type: "string",
            name: "password",
            label: "密码保护",
          },
          {
            type: "string",
            name: "passwordHint",
            label: "密码提示",
          },
          {
            type: "string",
            name: "tags",
            label: "标签",
            list: true,
            ui: {
              component: "tags",
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "正文",
            isBody: true,
            ui: {
              visualSelector: true,
            },
          },
        ],
      },
      {
        name: "postMdx",
        label: "文章 (MDX)",
        path: "src/content/posts",
        match: "**/*.mdx",
        format: "mdx",
        ui: {
          router: ({ document }) => {
            return `/posts/${document._sys.filename.replace(/\.(md|mdx)$/, "")}`;
          },
          filename: {
            slugify: (values) => {
              const title = values?.title?.trim();
              if (!title || title === "untitled") {
                const timestamp = Date.now().toString(36);
                return `untitled-${timestamp}`;
              }
              const slug = title.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-").replace(/^-|-$/g, "");
              return slug || `untitled-${Date.now().toString(36)}`;
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "标题",
            isTitle: true,
            required: true,
            defaultValue: "untitled",
          },
          {
            type: "datetime",
            name: "published",
            label: "发布日期",
            required: true,
            ui: {
              dateFormat: "YYYY-MM-DD",
              timeFormat: false,
            },
            defaultValue: "1970-01-01",
          },
          {
            type: "datetime",
            name: "updated",
            label: "更新日期",
            ui: {
              dateFormat: "YYYY-MM-DD",
              timeFormat: false,
            },
          },
          {
            type: "boolean",
            name: "draft",
            label: "草稿",
            defaultValue: false,
          },
          {
            type: "boolean",
            name: "pinned",
            label: "置顶",
            defaultValue: false,
          },
          {
            type: "string",
            name: "description",
            label: "描述",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "image",
            label: "封面图片",
          },
          {
            type: "string",
            name: "category",
            label: "分类",
          },
          {
            type: "string",
            name: "tags",
            label: "标签",
            list: true,
            ui: {
              component: "tags",
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "正文",
            isBody: true,
            ui: {
              visualSelector: true,
            },
          },
        ],
      },
      {
        name: "spec",
        label: "特殊页面",
        path: "src/content/spec",
        format: "md",
        ui: {
          router: ({ document }) => {
            const filename = document._sys.filename.replace(/\.(md|mdx)$/, "");
            if (filename === "about") return "/about";
            if (filename === "guestbook") return "/guestbook";
            return `/${filename}`;
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "标题",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "描述",
          },
          {
            type: "rich-text",
            name: "body",
            label: "内容",
            isBody: true,
          },
        ],
      },
      {
        name: "specMdx",
        label: "特殊页面 (MDX)",
        path: "src/content/spec",
        match: "**/*.mdx",
        format: "mdx",
        ui: {
          router: ({ document }) => {
            const filename = document._sys.filename.replace(/\.(md|mdx)$/, "");
            if (filename === "friends") return "/friends";
            return `/${filename}`;
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "标题",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "描述",
          },
          {
            type: "rich-text",
            name: "body",
            label: "内容",
            isBody: true,
          },
        ],
      },
      {
        name: "siteSettings",
        label: "站点设置",
        path: "src/content/site-settings",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "站点标题",
            required: true,
          },
          {
            type: "string",
            name: "subtitle",
            label: "站点副标题",
          },
          {
            type: "string",
            name: "site_url",
            label: "站点 URL",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "站点描述",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "keywords",
            label: "关键词",
            list: true,
          },
          {
            type: "string",
            name: "themeColor",
            label: "主题颜色",
            ui: {
              component: "color",
            },
            default: "#00d4aa",
          },
          {
            type: "number",
            name: "themeHue",
            label: "主题色相",
            min: 0,
            max: 360,
            default: 165,
            ui: {
              description: "0-360，与主题颜色同步",
            },
          },
          {
            type: "boolean",
            name: "themeFixed",
            label: "固定主题色",
            default: false,
          },
          {
            type: "string",
            name: "defaultMode",
            label: "默认模式",
            options: [
              { label: "亮色", value: "light" },
              { label: "暗色", value: "dark" },
              { label: "跟随系统", value: "system" },
            ],
            default: "system",
          },
          {
            type: "number",
            name: "pageWidth",
            label: "页面宽度(rem)",
            min: 80,
            max: 140,
            default: 100,
          },
          {
            type: "boolean",
            name: "cardBorder",
            label: "卡片边框",
            default: true,
          },
          {
            type: "boolean",
            name: "cardFollowTheme",
            label: "卡片跟随主题",
            default: false,
          },
          {
            type: "boolean",
            name: "showLastModified",
            label: "显示上次编辑时间",
            default: true,
          },
          {
            type: "boolean",
            name: "categoryBar",
            label: "分类导航栏",
            default: true,
          },
          {
            type: "string",
            name: "postListDefaultMode",
            label: "文章列表默认布局",
            options: [
              { label: "列表", value: "list" },
              { label: "网格", value: "grid" },
            ],
            default: "list",
          },
          {
            type: "string",
            label: "文章设置",
            name: "postSettingsSection",
            ui: {
              component: "label",
            },
          },
          {
            type: "number",
            name: "descriptionLines",
            label: "文章列表描述行数",
            min: 0,
            max: 10,
            default: 2,
            ui: {
              description: "设置文章摘要在列表中显示的行数，设为0则禁用截断",
            },
          },
          {
            type: "boolean",
            name: "gridMasonry",
            label: "启用瀑布流布局",
            default: false,
          },
          {
            type: "number",
            name: "gridColumnWidth",
            label: "网格列宽(px)",
            min: 200,
            max: 500,
            default: 320,
          },
          {
            type: "string",
            name: "rehypeCalloutsTheme",
            label: "提示块主题",
            options: [
              { label: "GitHub", value: "github" },
              { label: "Obsidian", value: "obsidian" },
              { label: "VitePress", value: "vitepress" },
            ],
            default: "github",
          },
          {
            type: "number",
            name: "outdatedThreshold",
            label: "文章过期天数阈值",
            min: 1,
            max: 365,
            default: 30,
          },
          {
            type: "boolean",
            name: "sharePoster",
            label: "启用分享海报",
            default: true,
          },
          {
            type: "boolean",
            name: "generateOgImages",
            label: "生成OpenGraph图片",
            default: false,
            ui: {
              description: "启用会增加构建时间",
            },
          },
          {
            type: "number",
            name: "paginationPostsPerPage",
            label: "每页文章数",
            default: 10,
          },
          {
            type: "boolean",
            name: "pageFriends",
            label: "友链页面",
            default: true,
          },
          {
            type: "boolean",
            name: "pageGuestbook",
            label: "留言板页面",
            default: true,
          },
          {
            type: "boolean",
            name: "pageBangumi",
            label: "番组计划页面",
            default: true,
          },
          {
            type: "string",
            name: "bangumiSubjectId",
            label: "Bangumi Subject ID",
            ui: {
              description: "Bangumi番组计划的Subject ID",
            },
          },
          {
            type: "string",
            name: "bangumiApi",
            label: "Bangumi API地址",
            default: "https://api.bgm.tv",
          },
          {
            type: "string",
            label: "站点基础设置",
            name: "siteBasicSection",
            ui: {
              component: "label",
            },
          },
          {
            type: "string",
            name: "siteLang",
            label: "网站语言",
            options: [
              { label: "简体中文", value: "zh_CN" },
              { label: "繁体中文", value: "zh_TW" },
              { label: "英文", value: "en" },
              { label: "日文", value: "ja" },
              { label: "俄文", value: "ru" },
            ],
            default: "zh_CN",
          },
          {
            type: "string",
            name: "siteStartDate",
            label: "建站日期",
            default: "2025-01-01",
            ui: {
              description: "格式：YYYY-MM-DD",
            },
          },
          {
            type: "string",
            name: "timezone",
            label: "时区",
            default: "Asia/Shanghai",
          },
          {
            type: "string",
            label: "页面开关",
            name: "pageSection",
            ui: {
              component: "label",
            },
          },
          {
            type: "boolean",
            name: "pageGallery",
            label: "相册页面",
            default: true,
          },
          {
            type: "boolean",
            name: "pageSponsor",
            label: "赞助页面",
            default: true,
          },
          {
            type: "string",
            label: "统计分析",
            name: "analyticsSection",
            ui: {
              component: "label",
            },
          },
          {
            type: "string",
            name: "googleAnalyticsId",
            label: "Google Analytics ID",
            ui: {
              description: "UA-XXXXXXXXX-X 或 G-XXXXXXXXXX 格式",
            },
          },
          {
            type: "string",
            name: "microsoftClarityId",
            label: "Microsoft Clarity ID",
          },
          {
            type: "string",
            name: "umamiWebsiteId",
            label: "Umami Website ID",
          },
          {
            type: "string",
            name: "umamiScriptUrl",
            label: "Umami 脚本地址",
            default: "https://cloud.umami.is/script.js",
          },
          {
            type: "displayOnly",
            label: "图片优化",
            name: "imageOptimizationSection",
          },
          {
            type: "string",
            name: "imageOptimizationFormats",
            label: "图片输出格式",
            options: [
              { label: "WebP", value: "webp" },
              { label: "AVIF", value: "avif" },
              { label: "两者都生成", value: "both" },
            ],
            default: "webp",
          },
          {
            type: "number",
            name: "imageOptimizationQuality",
            label: "图片压缩质量",
            min: 1,
            max: 100,
            default: 85,
            ui: {
              description: "推荐值：70-85",
            },
          },
          {
            type: "string",
            name: "imageOptimizationNoReferrerDomains",
            label: "防盗链域名",
            list: true,
            ui: {
              description: "需要防盗链处理的域名，支持通配符*，如：i0.hdslb.com, *.bilibili.com",
            },
          },
        ],
      },
      {
        name: "navBarConfig",
        label: "导航栏设置",
        path: "src/content/nav-bar-config",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "导航栏标题",
          },
          {
            type: "object",
            name: "customLinks",
            label: "自定义链接",
            list: true,
            ui: {
              description: "添加自定义导航链接",
            },
            fields: [
              {
                type: "string",
                name: "name",
                label: "名称",
                required: true,
              },
              {
                type: "string",
                name: "url",
                label: "链接地址",
                required: true,
              },
              {
                type: "string",
                name: "icon",
                label: "图标",
                ui: {
                  description: "图标名称或URL",
                },
              },
              {
                type: "boolean",
                name: "external",
                label: "外部链接",
                default: false,
              },
              {
                type: "number",
                name: "order",
                label: "排序",
                default: 0,
              },
            ],
          },
        ],
      },
      {
        name: "profileSettings",
        label: "个人资料",
        path: "src/content/profile-settings",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "image",
            name: "avatar",
            label: "头像",
          },
          {
            type: "string",
            name: "name",
            label: "名字",
            required: true,
          },
          {
            type: "string",
            name: "bio",
            label: "个人签名",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "object",
            name: "links",
            label: "社交链接",
            list: true,
            fields: [
              {
                type: "string",
                name: "name",
                label: "名称",
                required: true,
              },
              {
                type: "string",
                name: "icon",
                label: "图标",
                required: true,
              },
              {
                type: "string",
                name: "url",
                label: "链接",
                required: true,
              },
            ],
          },
        ],
      },
      {
        name: "friendsData",
        label: "友链设置",
        path: "src/content/friends-settings",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "页面标题",
          },
          {
            type: "string",
            name: "description",
            label: "页面描述",
          },
          {
            type: "object",
            name: "friends",
            label: "友链列表",
            list: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "标题",
                required: true,
              },
              {
                type: "image",
                name: "imgurl",
                label: "头像",
              },
              {
                type: "string",
                name: "desc",
                label: "描述",
              },
              {
                type: "string",
                name: "siteurl",
                label: "链接",
                required: true,
              },
              {
                type: "string",
                name: "tags",
                label: "标签",
                list: true,
              },
              {
                type: "number",
                name: "weight",
                label: "权重",
                default: 1,
              },
              {
                type: "boolean",
                name: "enabled",
                label: "启用",
                default: true,
              },
            ],
          },
        ],
      },
      {
        name: "bannerSettings",
        label: "主页横幅",
        path: "src/content/banner-settings",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "主标题",
            required: true,
          },
          {
            type: "string",
            name: "titleSize",
            label: "主标题字体大小",
            default: "3.8rem",
          },
          {
            type: "string",
            name: "subtitle",
            label: "副标题列表",
            list: true,
            required: true,
          },
          {
            type: "string",
            name: "subtitleSize",
            label: "副标题字体大小",
            default: "1.5rem",
          },
          {
            type: "boolean",
            name: "typewriterEnable",
            label: "启用打字机效果",
            default: true,
          },
          {
            type: "number",
            name: "typewriterSpeed",
            label: "打字速度(毫秒)",
            default: 100,
            min: 10,
            max: 500,
          },
          {
            type: "number",
            name: "typewriterDeleteSpeed",
            label: "删除速度(毫秒)",
            default: 50,
            min: 10,
            max: 300,
          },
          {
            type: "number",
            name: "typewriterPauseTime",
            label: "暂停时间(毫秒)",
            default: 2000,
            min: 500,
            max: 10000,
          },
          {
            type: "image",
            name: "customBackground",
            label: "自定义背景图片",
            ui: {
              description: "上传自定义背景图片，会覆盖默认壁纸",
            },
          },
        ],
      },
      {
        name: "announcementSettings",
        label: "公告设置",
        path: "src/content/announcement-settings",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "公告标题",
            required: true,
          },
          {
            type: "string",
            name: "content",
            label: "公告内容",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "boolean",
            name: "closable",
            label: "允许关闭",
            default: true,
          },
          {
            type: "boolean",
            name: "linkEnable",
            label: "启用链接",
            default: true,
          },
          {
            type: "string",
            name: "linkText",
            label: "链接文本",
          },
          {
            type: "string",
            name: "linkUrl",
            label: "链接地址",
          },
          {
            type: "boolean",
            name: "linkExternal",
            label: "外部链接",
            default: false,
          },
        ],
      },
      {
        name: "musicSettings",
        label: "音乐播放器",
        path: "src/content/music-settings",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "boolean",
            name: "showInNavbar",
            label: "显示在导航栏",
            default: true,
          },
          {
            type: "string",
            name: "mode",
            label: "使用方式",
            options: [
              { label: "Meting API", value: "meting" },
              { label: "本地音乐", value: "local" },
            ],
            default: "meting",
          },
          {
            type: "number",
            name: "volume",
            label: "默认音量",
            min: 0,
            max: 1,
            step: 0.1,
            default: 0.7,
          },
          {
            type: "string",
            name: "playMode",
            label: "播放模式",
            options: [
              { label: "列表循环", value: "list" },
              { label: "单曲循环", value: "one" },
              { label: "随机播放", value: "random" },
            ],
            default: "list",
          },
          {
            type: "boolean",
            name: "showLyrics",
            label: "显示歌词",
            default: true,
          },
          {
            type: "string",
            name: "metingApi",
            label: "Meting API 地址",
            default: "https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&r=:r",
          },
          {
            type: "string",
            name: "metingServer",
            label: "音乐平台",
            options: [
              { label: "网易云音乐", value: "netease" },
              { label: "QQ音乐", value: "tencent" },
              { label: "酷狗音乐", value: "kugou" },
              { label: "虾米音乐", value: "xiami" },
              { label: "百度音乐", value: "baidu" },
            ],
            default: "netease",
          },
          {
            type: "string",
            name: "metingType",
            label: "类型",
            options: [
              { label: "单曲", value: "song" },
              { label: "歌单", value: "playlist" },
              { label: "专辑", value: "album" },
              { label: "搜索", value: "search" },
              { label: "艺术家", value: "artist" },
            ],
            default: "playlist",
          },
          {
            type: "string",
            name: "metingId",
            label: "ID/关键词",
            required: true,
          },
          {
            type: "string",
            name: "metingAuth",
            label: "认证 Token",
          },
        ],
      },
      {
        name: "gallerySettings",
        label: "相册设置",
        path: "src/content/gallery-settings",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "number",
            name: "columnWidth",
            label: "列宽度(px)",
            default: 240,
            min: 150,
            max: 400,
          },
          {
            type: "object",
            name: "albums",
            label: "相册列表",
            list: true,
            fields: [
              {
                type: "string",
                name: "id",
                label: "相册ID",
                required: true,
                ui: {
                  description: "用于URL路径，只能包含小写字母、数字和连字符",
                },
              },
              {
                type: "string",
                name: "name",
                label: "相册名称",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "相册描述",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "location",
                label: "拍摄地点",
              },
              {
                type: "datetime",
                name: "date",
                label: "日期",
                ui: {
                  dateFormat: "YYYY-MM-DD",
                  timeFormat: false,
                },
              },
              {
                type: "string",
                name: "tags",
                label: "标签",
                list: true,
              },
              {
                type: "image",
                name: "cover",
                label: "封面图片",
              },
              {
                type: "string",
                name: "password",
                label: "访问密码",
                ui: {
                  description: "留空则不加密",
                },
              },
              {
                type: "string",
                name: "passwordHint",
                label: "密码提示",
              },
              {
                type: "string",
                name: "photos",
                label: "图片URL列表",
                list: true,
                ui: {
                  description: "每行一个图片URL，支持 jpg/png/webp/avif/gif 格式",
                },
              },
            ],
          },
        ],
      },
      {
        name: "wallpaperSettings",
        label: "壁纸设置",
        path: "src/content/wallpaper-settings",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "mode",
            label: "壁纸模式",
            options: [
              { label: "Banner模式", value: "banner" },
              { label: "全屏模式", value: "fullscreen" },
              { label: "覆盖模式", value: "overlay" },
              { label: "无壁纸", value: "none" },
            ],
            default: "banner",
          },
          {
            type: "boolean",
            name: "switchable",
            label: "允许切换壁纸",
            default: true,
          },
          {
            type: "number",
            name: "opacity",
            label: "覆盖层透明度",
            min: 0,
            max: 1,
            step: 0.1,
            default: 0.8,
          },
          {
            type: "number",
            name: "blur",
            label: "模糊程度(px)",
            min: 0,
            max: 50,
            default: 10,
          },
          {
            type: "number",
            name: "cardOpacity",
            label: "卡片透明度",
            min: 0,
            max: 1,
            step: 0.1,
            default: 0.5,
          },
          {
            type: "number",
            name: "dimOpacity",
            label: "全局暗度",
            min: 0,
            max: 1,
            step: 0.1,
            default: 0.2,
          },
          {
            type: "boolean",
            name: "wavesDesktop",
            label: "桌面端波浪效果",
            default: true,
          },
          {
            type: "boolean",
            name: "wavesMobile",
            label: "移动端波浪效果",
            default: true,
          },
          {
            type: "boolean",
            name: "wavesSwitchable",
            label: "波浪效果可切换",
            default: true,
          },
          {
            type: "boolean",
            name: "gradientDesktop",
            label: "桌面端渐变效果",
            default: true,
          },
          {
            type: "boolean",
            name: "gradientMobile",
            label: "移动端渐变效果",
            default: true,
          },
          {
            type: "string",
            name: "gradientHeight",
            label: "渐变高度",
            default: "15vh",
          },
          {
            type: "boolean",
            name: "gradientSwitchable",
            label: "渐变效果可切换",
            default: true,
          },
          {
            type: "boolean",
            name: "carouselEnable",
            label: "启用轮播",
            default: false,
          },
          {
            type: "number",
            name: "carouselInterval",
            label: "轮播间隔(毫秒)",
            min: 2000,
            max: 30000,
            step: 1000,
            default: 5000,
          },
          {
            type: "boolean",
            name: "carouselSwitchable",
            label: "轮播可切换",
            default: false,
          },
          {
            type: "string",
            label: "壁纸列表",
            name: "wallpaperListSection",
            ui: {
              component: "label",
            },
          },
          {
            type: "image",
            name: "desktopWallpapers",
            label: "桌面端壁纸列表",
            list: true,
            ui: {
              description: "添加或删除桌面端壁纸图片，建议尺寸 1920×800",
            },
          },
          {
            type: "image",
            name: "mobileWallpapers",
            label: "移动端壁纸列表",
            list: true,
            ui: {
              description: "添加或删除移动端壁纸图片，建议尺寸 750×1334",
            },
          },
          {
            type: "string",
            label: "用户权限设置",
            name: "userPermissionsSection",
            ui: {
              component: "label",
            },
          },
          {
            type: "boolean",
            name: "allowUserChangeTheme",
            label: "允许用户修改主题色",
            default: true,
          },
          {
            type: "boolean",
            name: "allowUserChangeWallpaper",
            label: "允许用户切换壁纸",
            default: true,
          },
          {
            type: "boolean",
            name: "allowUserChangeMode",
            label: "允许用户切换明暗模式",
            default: true,
          },
          {
            type: "boolean",
            name: "allowUserChangeLayout",
            label: "允许用户切换布局",
            default: true,
          },
          {
            type: "boolean",
            name: "allowUserChangeEffects",
            label: "允许用户切换特效",
            default: true,
          },
        ],
      },
      {
        name: "navLinksSettings",
        label: "导航链接",
        path: "src/content/nav-links-settings",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "页面标题",
            default: "导航链接",
          },
          {
            type: "object",
            name: "links",
            label: "链接列表",
            list: true,
            fields: [
              {
                type: "string",
                name: "name",
                label: "名称",
                required: true,
              },
              {
                type: "string",
                name: "url",
                label: "链接地址",
                required: true,
              },
              {
                type: "string",
                name: "icon",
                label: "图标",
                ui: {
                  description: "图标名称或URL",
                },
              },
              {
                type: "boolean",
                name: "newTab",
                label: "新窗口打开",
                default: true,
              },
              {
                type: "number",
                name: "order",
                label: "排序",
                default: 0,
              },
            ],
          },
        ],
      },
      {
        name: "licenseConfig",
        label: "许可证设置",
        path: "src/content/license-config",
        format: "json",
        isSingleton: true,
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "boolean",
            name: "enable",
            label: "启用许可证",
            default: true,
          },
          {
            type: "string",
            name: "name",
            label: "许可证名称",
            default: "CC BY-NC-SA 4.0",
          },
          {
            type: "string",
            name: "url",
            label: "许可证链接",
            default: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
          },
        ],
      },
      {
        name: "footerConfig",
        label: "页脚设置",
        path: "src/content/footer-config",
        format: "json",
        isSingleton: true,
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "boolean",
            name: "enable",
            label: "启用页脚HTML注入",
            default: false,
          },
          {
            type: "string",
            name: "footerContent",
            label: "页脚HTML内容",
            ui: {
              component: "textarea",
              description: "直接输入HTML内容，如备案号等",
            },
          },
        ],
      },
      {
        name: "fontConfig",
        label: "字体设置",
        path: "src/content/font-config",
        format: "json",
        isSingleton: true,
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "boolean",
            name: "enable",
            label: "启用自定义字体",
            default: false,
          },
          {
            type: "boolean",
            name: "preload",
            label: "预加载字体",
            default: true,
          },
          {
            type: "string",
            name: "selectedFont",
            label: "选择字体",
            options: [
              { label: "系统字体", value: "system" },
              { label: "Zen Maru Gothic", value: "zen-maru-gothic" },
              { label: "Inter", value: "inter" },
              { label: "MiSans Normal", value: "misans-normal" },
              { label: "MiSans Regular", value: "misans-regular" },
              { label: "MiSans Semibold", value: "misans-semibold" },
            ],
            default: "misans-regular",
          },
        ],
      },
      {
        name: "pioConfig",
        label: "看板娘设置",
        path: "src/content/pio-settings",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            label: "Spine 看板娘配置",
            name: "spineSection",
            ui: {
              component: "label",
            },
          },
          {
            type: "boolean",
            name: "spineEnable",
            label: "启用 Spine 看板娘",
            default: false,
          },
          {
            type: "string",
            name: "spineModelPath",
            label: "Spine 模型路径",
            ui: {
              description: "例如: /pio/models/spine/firefly/1310.json",
            },
          },
          {
            type: "number",
            name: "spineScale",
            label: "Spine 缩放比例",
            min: 0.5,
            max: 2,
            step: 0.1,
            default: 1,
          },
          {
            type: "string",
            name: "spinePositionCorner",
            label: "Spine 位置",
            options: [
              { label: "左下", value: "bottom-left" },
              { label: "右下", value: "bottom-right" },
              { label: "左上", value: "top-left" },
              { label: "右上", value: "top-right" },
            ],
            default: "bottom-left",
          },
          {
            type: "number",
            name: "spineSizeWidth",
            label: "Spine 宽度",
            default: 200,
          },
          {
            type: "number",
            name: "spineSizeHeight",
            label: "Spine 高度",
            default: 300,
          },
          {
            type: "boolean",
            name: "spineResponsiveHideOnMobile",
            label: "移动端隐藏 Spine",
            default: true,
          },
          {
            type: "string",
            label: "Live2D 看板娘配置",
            name: "live2dSection",
            ui: {
              component: "label",
            },
          },
          {
            type: "boolean",
            name: "live2dEnable",
            label: "启用 Live2D 看板娘",
            default: false,
          },
          {
            type: "string",
            name: "live2dModelPath",
            label: "Live2D 模型路径",
            ui: {
              description: "例如: /pio/models/live2d/snow_miku/model.json",
            },
          },
          {
            type: "string",
            name: "live2dPosition",
            label: "Live2D 位置",
            options: [
              { label: "左下", value: "bottom-left" },
              { label: "右下", value: "bottom-right" },
            ],
            default: "bottom-left",
          },
          {
            type: "number",
            name: "live2dSize",
            label: "Live2D 尺寸",
            default: 200,
          },
          {
            type: "string",
            name: "live2dPrimaryColor",
            label: "主题色",
            ui: {
              description: "菜单、状态条等 UI 元素的背景色",
            },
            default: "#00d4aa",
          },
          {
            type: "number",
            name: "live2dTransitionDuration",
            label: "动画时长 (ms)",
            default: 300,
          },
          {
            type: "string",
            name: "live2dTransitionType",
            label: "动画类型",
            options: [
              { label: "滑动", value: "slide" },
              { label: "淡入淡出", value: "fade" },
            ],
            default: "fade",
          },
          {
            type: "boolean",
            name: "live2dTipsEnable",
            label: "启用提示消息",
            default: true,
          },
          {
            type: "string",
            name: "live2dTipsWelcomeMessage",
            label: "欢迎消息",
          },
          {
            type: "string",
            name: "live2dGithubLink",
            label: "GitHub 链接",
            ui: {
              description: "点击 GitHub 菜单按钮跳转的链接",
            },
            default: "https://github.com/GinZeH",
          },
          {
            type: "boolean",
            name: "live2dResponsiveHideOnMobile",
            label: "移动端隐藏 Live2D",
            default: true,
          },
        ],
      },
      {
        name: "adConfig",
        label: "广告设置",
        path: "src/content/ad-config",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "boolean",
            name: "enable",
            label: "启用广告",
            default: false,
          },
          {
            type: "string",
            name: "adImage",
            label: "广告图片",
            ui: {
              description: "广告图片路径",
            },
          },
          {
            type: "string",
            name: "adLink",
            label: "广告链接",
            ui: {
              description: "点击广告跳转的链接",
            },
          },
          {
            type: "boolean",
            name: "adLinkExternal",
            label: "外部链接",
            default: true,
          },
          {
            type: "boolean",
            name: "adClosable",
            label: "允许关闭",
            default: true,
          },
          {
            type: "number",
            name: "adDisplayCount",
            label: "显示次数限制",
            ui: {
              description: "-1为无限制",
            },
            default: -1,
          },
          {
            type: "string",
            name: "adCode",
            label: "广告代码",
            ui: {
              component: "textarea",
              description: "广告代码（如Google AdSense）",
            },
          },
          {
            type: "string",
            name: "adPosition",
            label: "广告位置",
            options: [
              { label: "文章顶部", value: "top" },
              { label: "文章底部", value: "bottom" },
              { label: "侧边栏", value: "sidebar" },
            ],
            default: "top",
          },
        ],
      },
      {
        name: "coverImageConfig",
        label: "文章封面图设置",
        path: "src/content/cover-image-config",
        format: "json",
        isSingleton: true,
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "boolean",
            name: "enableRandomCover",
            label: "启用随机封面图",
            default: false,
          },
          {
            type: "string",
            name: "randomCoverApi",
            label: "随机封面图API",
            ui: {
              description: "API地址，返回随机图片",
            },
          },
          {
            type: "string",
            name: "defaultCover",
            label: "默认封面图",
            ui: {
              description: "默认封面图路径或URL",
            },
          },
        ],
      },
      {
        name: "plantumlConfig",
        label: "PlantUML设置",
        path: "src/content/plantuml-config",
        format: "json",
        isSingleton: true,
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "boolean",
            name: "enable",
            label: "启用PlantUML",
            default: true,
          },
          {
            type: "string",
            name: "serverUrl",
            label: "PlantUML服务器",
            default: "https://www.plantuml.com/plantuml",
          },
          {
            type: "string",
            name: "outputFormat",
            label: "输出格式",
            options: [
              { label: "PNG", value: "png" },
              { label: "SVG", value: "svg" },
            ],
            default: "svg",
          },
        ],
      },
      {
        name: "expressiveCodeConfig",
        label: "代码高亮设置",
        path: "src/content/expressive-code-config",
        format: "json",
        isSingleton: true,
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "darkTheme",
            label: "暗色模式主题",
            options: [
              { label: "One Dark Pro", value: "one-dark-pro" },
              { label: "Dracula", value: "dracula" },
              { label: "GitHub Dark", value: "github-dark" },
              { label: "Monokai", value: "monokai" },
              { label: "Nord", value: "nord" },
            ],
            default: "one-dark-pro",
          },
          {
            type: "string",
            name: "lightTheme",
            label: "亮色模式主题",
            options: [
              { label: "One Light", value: "one-light" },
              { label: "GitHub Light", value: "github-light" },
              { label: "Nord Light", value: "nord-light" },
            ],
            default: "one-light",
          },
          {
            type: "boolean",
            name: "showLineNumbers",
            label: "显示行号",
            default: true,
          },
          {
            type: "boolean",
            name: "enableCopy",
            label: "启用复制按钮",
            default: true,
          },
          {
            type: "boolean",
            name: "enableWordWrap",
            label: "启用换行",
            default: true,
          },
          {
            type: "displayOnly",
            label: "代码折叠配置",
            name: "codeCollapseSection",
          },
          {
            type: "boolean",
            name: "pluginCollapsibleEnable",
            label: "启用代码折叠",
            default: true,
          },
          {
            type: "number",
            name: "pluginCollapsibleLineThreshold",
            label: "折叠阈值（行数）",
            min: 1,
            max: 100,
            default: 15,
          },
          {
            type: "number",
            name: "pluginCollapsiblePreviewLines",
            label: "预览行数",
            min: 1,
            max: 20,
            default: 8,
          },
          {
            type: "boolean",
            name: "pluginCollapsibleDefaultCollapsed",
            label: "默认折叠",
            default: true,
          },
          {
            type: "displayOnly",
            label: "语言徽章",
            name: "languageBadgeSection",
          },
          {
            type: "boolean",
            name: "pluginLanguageBadgeEnable",
            label: "启用语言徽章",
            default: false,
          },
        ],
      },
      {
        name: "effectsConfig",
        label: "特效设置",
        path: "src/content/effects-config",
        format: "json",
        isSingleton: true,
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "displayOnly",
            label: "樱花特效",
            name: "sakuraSection",
          },
          {
            type: "boolean",
            name: "sakuraEnable",
            label: "启用樱花特效",
            default: false,
          },
          {
            type: "boolean",
            name: "sakuraSwitchable",
            label: "允许用户切换",
            default: true,
          },
          {
            type: "number",
            name: "sakuraNum",
            label: "樱花数量",
            min: 1,
            max: 100,
            default: 21,
          },
          {
            type: "number",
            name: "sakuraLimitTimes",
            label: "越界限制次数（-1为无限）",
            min: -1,
            max: 100,
            default: -1,
          },
        ],
      },
      {
        name: "announcementConfig",
        label: "公告设置",
        path: "src/content/announcement-config",
        format: "json",
        isSingleton: true,
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "公告标题",
            default: "公告",
          },
          {
            type: "string",
            name: "content",
            label: "公告内容",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "icon",
            label: "公告图标",
          },
          {
            type: "string",
            name: "type",
            label: "公告类型",
            options: [
              { label: "信息", value: "info" },
              { label: "警告", value: "warning" },
              { label: "成功", value: "success" },
              { label: "错误", value: "error" },
            ],
            default: "info",
          },
          {
            type: "boolean",
            name: "closable",
            label: "允许关闭",
            default: true,
          },
        ],
      },
      {
        name: "commentConfig",
        label: "评论系统设置",
        path: "src/content/comment-config",
        format: "json",
        isSingleton: true,
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "type",
            label: "评论系统类型",
            options: [
              { label: "无", value: "none" },
              { label: "Twikoo", value: "twikoo" },
              { label: "Waline", value: "waline" },
              { label: "Giscus", value: "giscus" },
              { label: "Disqus", value: "disqus" },
              { label: "Artalk", value: "artalk" },
            ],
            default: "none",
          },
          {
            type: "displayOnly",
            label: "Twikoo 配置",
            name: "twikooSection",
          },
          {
            type: "string",
            name: "twikooEnvId",
            label: "Twikoo 环境ID",
          },
          {
            type: "string",
            name: "twikooLang",
            label: "Twikoo 语言",
            default: "zh-CN",
          },
          {
            type: "boolean",
            name: "twikooVisitorCount",
            label: "Twikoo 访问量统计",
            default: true,
          },
          {
            type: "displayOnly",
            label: "Waline 配置",
            name: "walineSection",
          },
          {
            type: "string",
            name: "walineServerURL",
            label: "Waline 服务地址",
          },
          {
            type: "string",
            name: "walineLang",
            label: "Waline 语言",
            default: "zh-CN",
          },
          {
            type: "string",
            name: "walineLogin",
            label: "Waline 登录模式",
            options: [
              { label: "启用", value: "enable" },
              { label: "强制", value: "force" },
              { label: "禁用", value: "disable" },
            ],
            default: "enable",
          },
          {
            type: "displayOnly",
            label: "Giscus 配置",
            name: "giscusSection",
          },
          {
            type: "string",
            name: "giscusRepo",
            label: "Giscus 仓库",
            ui: {
              description: "格式：owner/repo",
            },
          },
          {
            type: "string",
            name: "giscusRepoId",
            label: "Giscus 仓库ID",
          },
          {
            type: "string",
            name: "giscusCategory",
            label: "Giscus 分类",
          },
          {
            type: "string",
            name: "giscusCategoryId",
            label: "Giscus 分类ID",
          },
          {
            type: "displayOnly",
            label: "Disqus 配置",
            name: "disqusSection",
          },
          {
            type: "string",
            name: "disqusShortname",
            label: "Disqus Shortname",
          },
          {
            type: "displayOnly",
            label: "Artalk 配置",
            name: "artalkSection",
          },
          {
            type: "string",
            name: "artalkServer",
            label: "Artalk 服务地址",
          },
          {
            type: "string",
            name: "artalkLocale",
            label: "Artalk 语言",
            default: "zh-CN",
          },
        ],
      },
      {
        name: "musicConfig",
        label: "音乐播放器设置",
        path: "src/content/music-config",
        format: "json",
        isSingleton: true,
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "boolean",
            name: "showInNavbar",
            label: "在导航栏显示",
            default: true,
          },
          {
            type: "string",
            name: "mode",
            label: "使用方式",
            options: [
              { label: "Meting API", value: "meting" },
              { label: "本地音乐", value: "local" },
            ],
            default: "meting",
          },
          {
            type: "number",
            name: "volume",
            label: "默认音量",
            min: 0,
            max: 1,
            step: 0.1,
            default: 0.7,
          },
          {
            type: "string",
            name: "playMode",
            label: "播放模式",
            options: [
              { label: "列表循环", value: "list" },
              { label: "单曲循环", value: "one" },
              { label: "随机播放", value: "random" },
            ],
            default: "list",
          },
          {
            type: "boolean",
            name: "showLyrics",
            label: "显示歌词",
            default: true,
          },
          {
            type: "displayOnly",
            label: "Meting API 配置",
            name: "metingSection",
          },
          {
            type: "string",
            name: "metingServer",
            label: "音乐平台",
            options: [
              { label: "网易云音乐", value: "netease" },
              { label: "QQ音乐", value: "tencent" },
              { label: "酷狗音乐", value: "kugou" },
              { label: "虾米音乐", value: "xiami" },
              { label: "百度音乐", value: "baidu" },
            ],
            default: "netease",
          },
          {
            type: "string",
            name: "metingType",
            label: "类型",
            options: [
              { label: "单曲", value: "song" },
              { label: "歌单", value: "playlist" },
              { label: "专辑", value: "album" },
              { label: "搜索", value: "search" },
              { label: "歌手", value: "artist" },
            ],
            default: "playlist",
          },
          {
            type: "string",
            name: "metingId",
            label: "ID 或关键词",
            ui: {
              description: "歌单/专辑/单曲ID或搜索关键词",
            },
          },
          {
            type: "displayOnly",
            label: "本地音乐",
            name: "localSection",
          },
          {
            type: "object",
            name: "localMusic",
            label: "本地音乐列表",
            list: true,
            ui: {
              itemProps: (item: { name?: string }) => ({ label: item.name || "音乐" }),
            },
            fields: [
              {
                type: "string",
                name: "name",
                label: "歌曲名称",
              },
              {
                type: "string",
                name: "artist",
                label: "歌手",
              },
              {
                type: "string",
                name: "url",
                label: "音频文件路径",
              },
              {
                type: "string",
                name: "cover",
                label: "封面图片路径",
              },
              {
                type: "string",
                name: "lrc",
                label: "歌词文件路径",
              },
            ],
          },
        ],
      },
      {
        name: "sidebarConfig",
        label: "侧边栏设置",
        path: "src/content/sidebar-config",
        format: "json",
        isSingleton: true,
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "boolean",
            name: "enable",
            label: "启用侧边栏",
            default: true,
          },
          {
            type: "string",
            name: "position",
            label: "位置",
            options: [
              { label: "左侧", value: "left" },
              { label: "右侧", value: "right" },
              { label: "双侧", value: "both" },
            ],
            default: "left",
          },
          {
            type: "boolean",
            name: "tabletSidebar",
            label: "平板端显示",
            default: true,
          },
          {
            type: "boolean",
            name: "showBothSidebarsOnPostPage",
            label: "文章页显示双侧边栏",
            default: false,
          },
          {
            type: "displayOnly",
            label: "左侧边栏组件",
            name: "leftSidebarSection",
          },
          {
            type: "object",
            name: "leftSidebar",
            label: "左侧边栏组件列表",
            list: true,
            ui: {
              itemProps: (item: { component?: string }) => ({ label: item.component || "组件" }),
            },
            fields: [
              {
                type: "string",
                name: "component",
                label: "组件类型",
                options: [
                  { label: "用户资料", value: "profile" },
                  { label: "公告栏", value: "announcement" },
                  { label: "音乐播放器", value: "music" },
                  { label: "文章分类", value: "categories" },
                  { label: "标签云", value: "tags" },
                  { label: "站点统计", value: "stats" },
                  { label: "站点信息", value: "siteInfo" },
                  { label: "文章日历", value: "calendar" },
                  { label: "广告栏", value: "advertisement" },
                ],
              },
              {
                type: "number",
                name: "order",
                label: "排序",
                default: 0,
              },
            ],
          },
          {
            type: "displayOnly",
            label: "右侧边栏组件",
            name: "rightSidebarSection",
          },
          {
            type: "object",
            name: "rightSidebar",
            label: "右侧边栏组件列表",
            list: true,
            ui: {
              itemProps: (item: { component?: string }) => ({ label: item.component || "组件" }),
            },
            fields: [
              {
                type: "string",
                name: "component",
                label: "组件类型",
                options: [
                  { label: "用户资料", value: "profile" },
                  { label: "公告栏", value: "announcement" },
                  { label: "音乐播放器", value: "music" },
                  { label: "文章分类", value: "categories" },
                  { label: "标签云", value: "tags" },
                  { label: "站点统计", value: "stats" },
                  { label: "站点信息", value: "siteInfo" },
                  { label: "文章日历", value: "calendar" },
                  { label: "文章目录", value: "sidebarToc" },
                  { label: "广告栏", value: "advertisement" },
                ],
              },
              {
                type: "number",
                name: "order",
                label: "排序",
                default: 0,
              },
            ],
          },
        ],
      },
      {
        name: "sponsorConfig",
        label: "打赏设置",
        path: "src/content/sponsor-config",
        format: "json",
        isSingleton: true,
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "页面标题",
            default: "打赏",
          },
          {
            type: "string",
            name: "description",
            label: "页面描述",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "usage",
            label: "打赏用途",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "boolean",
            name: "showSponsorsList",
            label: "显示打赏者列表",
            default: true,
          },
          {
            type: "boolean",
            name: "showComment",
            label: "显示评论区",
            default: true,
          },
          {
            type: "boolean",
            name: "showButtonInPost",
            label: "文章底部显示打赏按钮",
            default: true,
          },
          {
            type: "object",
            name: "sponsorMethods",
            label: "打赏方式列表",
            list: true,
            ui: {
              itemProps: (item: { name?: string }) => ({ label: item.name || "打赏方式" }),
            },
            fields: [
              {
                type: "string",
                name: "name",
                label: "打赏方式名称",
              },
              {
                type: "string",
                name: "icon",
                label: "图标",
              },
              {
                type: "image",
                name: "qrCode",
                label: "收款码",
              },
              {
                type: "string",
                name: "link",
                label: "打赏链接",
              },
              {
                type: "string",
                name: "description",
                label: "描述",
              },
              {
                type: "boolean",
                name: "enabled",
                label: "启用",
                default: true,
              },
            ],
          },
        ],
      },
      {
        name: "galleryConfig",
        label: "相册设置",
        path: "src/content/gallery-config",
        format: "json",
        isSingleton: true,
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "number",
            name: "columnWidth",
            label: "瀑布流最小列宽（px）",
            min: 200,
            max: 400,
            default: 240,
          },
        ],
      },
    ],
  },
});
