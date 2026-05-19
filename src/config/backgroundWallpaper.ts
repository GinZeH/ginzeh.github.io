import type { BackgroundWallpaperConfig } from "@/types/config";
import bannerSettings from "../content/banner-settings/banner.json";

export const backgroundWallpaper: BackgroundWallpaperConfig = {
	mode: "banner",
	switchable: true,
	src: {
		desktop: [
			"assets/images/DesktopWallpaper/d1.avif",
			"assets/images/DesktopWallpaper/d2.avif",
			"assets/images/DesktopWallpaper/d3.avif",
			"assets/images/DesktopWallpaper/d4.avif",
			"assets/images/DesktopWallpaper/d5.avif",
			"assets/images/DesktopWallpaper/d6.avif",
		],
		mobile: [
			"assets/images/MobileWallpaper/m1.avif",
			"assets/images/MobileWallpaper/m2.avif",
			"assets/images/MobileWallpaper/m3.avif",
			"assets/images/MobileWallpaper/m4.avif",
			"assets/images/MobileWallpaper/m5.avif",
			"assets/images/MobileWallpaper/m6.avif",
		],
	},
	common: {
		dimOpacity: 0.2,
		homeText: {
			enable: true,
			switchable: true,
			title: bannerSettings.title || "Lovely firefly!",
			titleSize: bannerSettings.titleSize || "3.8rem",
			subtitle: bannerSettings.subtitle || [
				"In Reddened Chrysalis, I Once Rest",
				"From Shattered Sky, I Free Fall",
				"Amidst Silenced Stars, I Deep Sleep",
				"Upon Lighted Fyrefly, I Soon Gaze",
				"From Undreamt Night, I Thence Shine",
				"In Finalized Morrow, I Full Bloom",
			],
			subtitleSize: bannerSettings.subtitleSize || "1.5rem",
			typewriter: {
				enable: bannerSettings.typewriterEnable ?? true,
				speed: bannerSettings.typewriterSpeed ?? 100,
				deleteSpeed: bannerSettings.typewriterDeleteSpeed ?? 50,
				pauseTime: bannerSettings.typewriterPauseTime ?? 2000,
			},
		},
		navbar: {
			transparentMode: "semi",
			enableBlur: true,
			blur: 5,
		},
		waves: {
			enable: {
				desktop: true,
				mobile: true,
			},
			switchable: true,
		},
		gradient: {
			enable: {
				desktop: true,
				mobile: true,
			},
			height: "15vh",
			switchable: true,
		},
	},
	banner: {
		position: "0% 20%",
		carousel: {
			enable: false,
			interval: 5000,
			switchable: false,
		},
	},
	overlay: {
		switchable: {
			opacity: true,
			blur: true,
			cardOpacity: true,
		},
		zIndex: -1,
		opacity: 0.8,
		blur: 10,
		cardOpacity: 0.5,
	},
	fullscreen: {
		position: "center",
	},
};