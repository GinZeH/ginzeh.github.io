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
          },
        ],
      },
      {
        name: "spec",
        label: "特殊页面",
        path: "src/content/spec",
        ui: {
          router: ({ document }) => {
            const filename = document._sys.filename.replace(/\.(md|mdx)$/, "");
            if (filename === "about") return "/about";
            if (filename === "guestbook") return "/guestbook";
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
            type: "number",
            name: "themeHue",
            label: "主题色相",
            min: 0,
            max: 360,
            default: 165,
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
    ],
  },
});
