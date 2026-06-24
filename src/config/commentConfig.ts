import type { CommentConfig } from "../types/config";
import commentSettings from "../content/comment-settings/comment.json";

export const commentConfig: CommentConfig = {
	type: (commentSettings.type as "none" | "twikoo" | "waline" | "giscus" | "disqus" | "artalk") ?? "none",
	twikoo: {
		envId: commentSettings.twikooEnvId ?? "https://twikoo.vercel.app",
		lang: "zh-CN",
		visitorCount: commentSettings.visitorCount ?? true,
	},
	waline: {
		serverURL: commentSettings.walineServerURL ?? "https://waline.vercel.app",
		lang: "zh-CN",
		emoji: [
			"https://unpkg.com/@waline/emojis@1.4.0/weibo",
			"https://unpkg.com/@waline/emojis@1.4.0/bilibili",
			"https://unpkg.com/@waline/emojis@1.4.0/bmoji",
		],
		login: "enable",
		visitorCount: commentSettings.visitorCount ?? true,
	},
	artalk: {
		server: "https://artalk.example.com/",
		locale: "zh-CN",
		visitorCount: commentSettings.visitorCount ?? true,
	},
	giscus: {
		repo: commentSettings.giscusRepo ?? "CuteLeaf/Firefly",
		repoId: commentSettings.giscusRepoId ?? "",
		category: commentSettings.giscusCategory ?? "General",
		categoryId: commentSettings.giscusCategoryId ?? "",
		mapping: "title",
		strict: "0",
		reactionsEnabled: "1",
		emitMetadata: "1",
		inputPosition: "top",
		lang: "zh-CN",
		loading: "lazy",
	},
	disqus: {
		shortname: "firefly",
	},
};