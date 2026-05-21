import type { SidebarLayoutConfig } from "../types/config";
import sidebarSettings from "../content/sidebar-settings/sidebar.json";

export const sidebarLayoutConfig: SidebarLayoutConfig = {
	enable: sidebarSettings.enable ?? true,
	position: (sidebarSettings.position as "left" | "right" | "both") ?? "both",
	tabletSidebar: (sidebarSettings.tabletSidebar as "left" | "right") ?? "left",
	showBothSidebarsOnPostPage: true,
	leftComponents: [
		{
			type: "profile",
			enable: sidebarSettings.showProfile ?? true,
			position: "top",
			showOnPostPage: true,
		},
		{
			type: "announcement",
			enable: sidebarSettings.showAnnouncement ?? true,
			position: "top",
			showOnPostPage: true,
		},
		{
			type: "music",
			enable: sidebarSettings.showMusic ?? true,
			position: "sticky",
			showOnPostPage: true,
		},
		{
			type: "categories",
			enable: sidebarSettings.showCategories ?? true,
			position: "sticky",
			showOnPostPage: true,
			responsive: {
				collapseThreshold: 5,
			},
		},
		{
			type: "tags",
			enable: sidebarSettings.showTags ?? true,
			position: "sticky",
			showOnPostPage: true,
			responsive: {
				collapseThreshold: 10,
			},
		},
		{
			type: "advertisement",
			enable: false,
			position: "sticky",
			showOnPostPage: true,
			configId: "ad1",
		},
	],
	rightComponents: [
		{
			type: "stats",
			enable: sidebarSettings.showStats ?? true,
			position: "top",
			showOnPostPage: true,
		},
		{
			type: "calendar",
			enable: sidebarSettings.showCalendar ?? true,
			position: "sticky",
			showOnPostPage: false,
		},
		{
			type: "sidebarToc",
			enable: sidebarSettings.showToc ?? true,
			position: "sticky",
			showOnPostPage: true,
			showOnNonPostPage: false,
		},
		{
			type: "advertisement",
			enable: false,
			position: "sticky",
			showOnPostPage: true,
			configId: "ad2",
		},
	],
	mobileBottomComponents: [
		{
			type: "profile",
			enable: sidebarSettings.showProfile ?? true,
			showOnPostPage: true,
		},
		{
			type: "announcement",
			enable: sidebarSettings.showAnnouncement ?? true,
			showOnPostPage: true,
		},
		{
			type: "music",
			enable: sidebarSettings.showMusic ?? true,
			showOnPostPage: true,
		},
		{
			type: "categories",
			enable: sidebarSettings.showCategories ?? true,
			showOnPostPage: true,
			responsive: {
				collapseThreshold: 5,
			},
		},
		{
			type: "tags",
			enable: sidebarSettings.showTags ?? true,
			showOnPostPage: true,
			responsive: {
				collapseThreshold: 20,
			},
		},
		{
			type: "stats",
			enable: sidebarSettings.showStats ?? true,
			showOnPostPage: true,
		},
	],
};