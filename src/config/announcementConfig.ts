import type { AnnouncementConfig } from "../types/config";
import announcementSettings from "../content/announcement-settings/announcement.json";

export const announcementConfig: AnnouncementConfig = {
	title: announcementSettings.title ?? "公告",
	content: announcementSettings.content ?? "欢迎来到我的博客！这是一则示例公告。",
	closable: announcementSettings.closable ?? true,
	link: {
		enable: announcementSettings.linkEnable ?? true,
		text: announcementSettings.linkText ?? "了解更多",
		url: announcementSettings.linkUrl ?? "/about/",
		external: announcementSettings.linkExternal ?? false,
	},
};