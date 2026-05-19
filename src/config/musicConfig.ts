import type { MusicPlayerConfig } from "../types/config";
import musicSettings from "../content/music-settings/music.json";

export const musicPlayerConfig: MusicPlayerConfig = {
	showInNavbar: musicSettings.showInNavbar ?? true,
	mode: (musicSettings.mode as "local" | "meting") || "meting",
	volume: musicSettings.volume ?? 0.7,
	playMode: (musicSettings.playMode as "list" | "random" | "one") || "list",
	showLyrics: musicSettings.showLyrics ?? true,
	meting: {
		api: musicSettings.metingApi || "https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&r=:r",
		server: (musicSettings.metingServer as "netease" | "tencent" | "kugou" | "xiami" | "baidu") || "netease",
		type: (musicSettings.metingType as "search" | "playlist" | "song" | "album" | "artist") || "playlist",
		id: musicSettings.metingId || "10046455237",
		auth: musicSettings.metingAuth || "",
		fallbackApis: [
			"https://api.injahow.cn/meting/?server=:server&type=:type&id=:id",
			"https://api.moeyao.cn/meting/?server=:server&type=:type&id=:id",
		],
	},
	local: {
		playlist: [
			{
				name: "使一颗心免于哀伤",
				artist: "知更鸟 / HOYO-MiX / Chevy",
				url: "/assets/music/使一颗心免于哀伤-哼唱.mp3",
				cover: "/assets/music/cover/109951169585655912.webp",
				lrc: "",
			},
		],
	},
};