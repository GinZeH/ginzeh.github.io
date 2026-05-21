import type { SponsorConfig } from "../types/config";
import sponsorSettings from "../content/sponsor-settings/sponsor.json";

export const sponsorConfig: SponsorConfig = {
	title: sponsorSettings.title || "",
	description: sponsorSettings.description || "",
	usage: sponsorSettings.usage || "您的赞助将用于服务器维护、内容创作和功能开发，帮助我持续提供优质内容。",
	showSponsorsList: sponsorSettings.showSponsorsList ?? true,
	showComment: true,
	showButtonInPost: sponsorSettings.showButtonInPost ?? true,
	methods: sponsorSettings.methods || [
		{
			name: "支付宝",
			icon: "fa7-brands:alipay",
			qrCode: "/assets/images/sponsor/alipay.png",
			link: "",
			description: "使用 支付宝 扫码赞助",
			enabled: true,
		},
		{
			name: "微信",
			icon: "fa7-brands:weixin",
			qrCode: "/assets/images/sponsor/wechat.png",
			link: "",
			description: "使用 微信 扫码赞助",
			enabled: true,
		},
	],
	sponsors: [
		{
			name: "夏叶",
			amount: "¥50",
			date: "2025-10-01",
		},
		{
			name: "匿名用户",
			amount: "¥20",
			date: "2025-10-01",
		},
	],
};