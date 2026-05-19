import type { SiteConfig } from "@/types/config";
import { fontConfig } from "./fontConfig";
import siteSettings from "../content/site-settings/settings.json";

export const siteConfig: SiteConfig = {
	title: siteSettings.title,
	subtitle: siteSettings.subtitle,
	site_url: siteSettings.site_url,
	description: siteSettings.description,
	keywords: siteSettings.keywords || [],
	themeColor: {
		hue: siteSettings.themeHue,
		fixed: siteSettings.themeFixed || false,
		defaultMode: (siteSettings.defaultMode as "light" | "dark" | "system") || "system",
	},
	pageWidth: siteSettings.pageWidth || 100,
	card: {
		border: siteSettings.cardBorder || true,
		followTheme: false,
	},
	favicon: [
		{
			src: "/favicon/favicon.ico",
		},
	],
	navbar: {
		logo: {
			type: "image",
			value: "assets/images/firefly.png",
			alt: "🍀",
		},
		title: siteSettings.title,
		widthFull: false,
		menuAlign: "center",
		followTheme: false,
		stickyNavbar: true,
	},
	siteStartDate: "2025-01-01",
	timezone: "Asia/Shanghai",
	rehypeCallouts: {
		theme: "github",
	},
	showLastModified: siteSettings.showLastModified || true,
	outdatedThreshold: 30,
	sharePoster: true,
	generateOgImages: false,
	bangumi: {
		userId: "1143164",
		categoryOrder: ["anime", "book", "music", "game"],
	},
	pages: {
		friends: siteSettings.pageFriends || true,
		sponsor: true,
		guestbook: siteSettings.pageGuestbook || true,
		bangumi: true,
		gallery: true,
	},
	categoryBar: siteSettings.categoryBar || true,
	postListLayout: {
		defaultMode: (siteSettings.postListDefaultMode as "list" | "grid") || "list",
		mobileDefaultMode: "list",
		showTags: true,
		descriptionLines: 2,
		allowSwitch: true,
		grid: {
			masonry: false,
			columnWidth: 320,
		},
	},
	pagination: {
		postsPerPage: siteSettings.paginationPostsPerPage || 10,
	},
	analytics: {
		googleAnalyticsId: "",
		microsoftClarityId: "",
		umamiAnalytics: {
			websiteId: "",
			scriptUrl: "https://cloud.umami.is/script.js",
			trackOutboundLinks: true,
			collectWebVitals: false,
			relpays: {
				enabled: false,
				sampleRate: 0.15,
				maskLevel: "moderate",
				maxDuration: 300000,
				blockSelector: "",
			},
		},
		la51Analytics: {
			Id: "",
			sdkUrl: "",
			ck: "",
			autoTrack: false,
			hashMode: false,
			screenRecord: true,
		},
	},
	imageOptimization: {
		formats: "webp",
		quality: 85,
		noReferrerDomains: [],
	},
	font: fontConfig,
	lang: "zh_CN",
};
