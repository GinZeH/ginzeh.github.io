import type { SiteConfig } from "@/types/config";
import { fontConfig } from "./fontConfig";
import siteSettings from "../content/site-settings/settings.json";
import licenseSettings from "../content/license-config/license.json";
import footerSettings from "../content/footer-config/footer.json";
import fontSettings from "../content/font-config/font.json";
import pioSettings from "../content/pio-config/pio.json";
import adSettings from "../content/ad-config/ad.json";
import coverImageSettings from "../content/cover-image-config/coverImage.json";
import plantumlSettings from "../content/plantuml-config/plantuml.json";
import expressiveCodeSettings from "../content/expressive-code-config/expressiveCode.json";

export const siteConfig: SiteConfig = {
	title: siteSettings.title,
	subtitle: siteSettings.subtitle,
	site_url: siteSettings.site_url,
	description: siteSettings.description,
	keywords: siteSettings.keywords || [],
	themeColor: {
		hue: siteSettings.themeHue,
		fixed: siteSettings.themeFixed ?? false,
		defaultMode: (siteSettings.defaultMode as "light" | "dark" | "system") ?? "system",
	},
	pageWidth: siteSettings.pageWidth || 100,
	card: {
		border: siteSettings.cardBorder ?? false,
		followTheme: siteSettings.cardFollowTheme ?? false,
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
	siteStartDate: siteSettings.siteStartDate || "2025-01-01",
	timezone: siteSettings.timezone || "Asia/Shanghai",
	rehypeCallouts: {
		theme: (siteSettings.rehypeCalloutsTheme as "github" | "obsidian" | "vitepress") ?? "github",
	},
	showLastModified: siteSettings.showLastModified ?? true,
	outdatedThreshold: siteSettings.outdatedThreshold || 30,
	sharePoster: siteSettings.sharePoster !== false,
	generateOgImages: siteSettings.generateOgImages ?? false,
	bangumi: {
		userId: siteSettings.bangumiSubjectId || "",
		categoryOrder: ["anime", "book", "music", "game"],
	},
	pages: {
		friends: siteSettings.pageFriends ?? true,
		sponsor: siteSettings.pageSponsor ?? true,
		guestbook: siteSettings.pageGuestbook ?? true,
		bangumi: siteSettings.pageBangumi ?? true,
		gallery: siteSettings.pageGallery ?? true,
	},
	categoryBar: siteSettings.categoryBar ?? true,
	postListLayout: {
		defaultMode: (siteSettings.postListDefaultMode as "list" | "grid") ?? "list",
		mobileDefaultMode: "list",
		showTags: true,
		descriptionLines: siteSettings.descriptionLines || 2,
		allowSwitch: siteSettings.showLayoutSwitchInNavbar ?? true,
		grid: {
			masonry: siteSettings.gridMasonry ?? false,
			columnWidth: siteSettings.gridColumnWidth || 320,
		},
	},
	displaySettings: {
		showWallpaperMode: siteSettings.showWallpaperModeInDisplaySettings ?? true,
		showWallpaperSettings: siteSettings.showWallpaperSettingsInDisplaySettings ?? true,
		showIconInNavbar: siteSettings.showDisplaySettingsIconInNavbar ?? true,
	},
	pagination: {
		postsPerPage: siteSettings.paginationPostsPerPage || 10,
	},
	analytics: {
		googleAnalyticsId: siteSettings.googleAnalyticsId || "",
		microsoftClarityId: siteSettings.microsoftClarityId || "",
		umamiAnalytics: {
			websiteId: siteSettings.umamiWebsiteId || "",
			scriptUrl: siteSettings.umamiScriptUrl || "https://cloud.umami.is/script.js",
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
		formats: (siteSettings.imageOptimizationFormats as "avif" | "webp" | "both") ?? "webp",
		quality: siteSettings.imageOptimizationQuality || 85,
		noReferrerDomains: siteSettings.imageOptimizationNoReferrerDomains || [],
	},
	font: fontConfig,
	lang: (siteSettings.siteLang as "zh_CN" | "zh_TW" | "en" | "ja" | "ru") ?? "zh_CN",
};

export const getLicenseConfig = () => licenseSettings;
export const getFooterConfig = () => footerSettings;
export const getFontConfig = () => fontSettings;
export const getPioConfig = () => pioSettings;
export const getAdConfig = () => adSettings;
export const getCoverImageConfig = () => coverImageSettings;
export const getPlantumlConfig = () => plantumlSettings;
export const getExpressiveCodeConfig = () => expressiveCodeSettings;